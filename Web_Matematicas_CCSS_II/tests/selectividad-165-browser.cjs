const assert = require('node:assert/strict');
const fs = require('node:fs');
const path = require('node:path');
const { chromium } = require('playwright');

// P08 · Banco de Selectividad: fórmulas sin errores en todas las páginas, filtros y enlaces directos, soluciones
// ocultas hasta que el docente las activa (también con la configuración de respaldo), «Así cae en Selectividad»
// en las lecciones, móvil al 200 % y sin JavaScript.
const config = JSON.parse(fs.readFileSync(path.join(__dirname, '..', 'config', 'selectividad.json'), 'utf8'));
const visibility = JSON.parse(fs.readFileSync(path.join(__dirname, '..', 'config', 'visibility.json'), 'utf8'));

(async () => {
  const base = 'http://127.0.0.1:4173/';
  const browser = await chromium.launch({ headless: true, executablePath: process.env.CHROME_PATH });
  const pageFor = async (context = browser) => {
    const page = await context.newPage({ viewport: { width: 1200, height: 900 } });
    const errors = [];
    page.on('pageerror', error => errors.push(error.message));
    page.on('response', response => { if (response.status() >= 400 && !response.url().endsWith('favicon.ico')) errors.push(response.status() + ' ' + response.url()); });
    return { page, errors };
  };
  const ready = page => page.waitForFunction(() => document.querySelector('[data-sel-status]')?.textContent
    && document.documentElement.dataset.contentState === 'available');
  const mathDone = page => page.waitForFunction(() => !document.querySelector('.mc-sel__statement')
    || document.querySelectorAll('.mc-sel__statement mjx-container').length > 0, null, { timeout: 120000 });
  try {
    const { page, errors } = await pageFor();
    const requested = [];
    page.on('request', request => requested.push(request.url()));

    // Todas las páginas: cada fórmula convertida se presenta sin errores de MathJax y sin soluciones.
    for (const topic of config.topics) {
      await page.goto(base + topic.path);
      await ready(page);
      await mathDone(page);
      await page.waitForFunction(() => !document.querySelector('.math-status:not([hidden])') || document.querySelector('.math-status').textContent === '', null, { timeout: 120000 });
      assert.equal(await page.locator('[data-mml-node="merror"]').count(), 0, topic.path);
      assert.equal(await page.locator('[data-sel-card]').count(), topic.exercises, topic.path);
      assert.equal(await page.locator('[data-sel-solution]:visible').count(), 0, topic.path);
    }
    assert.ok(!requested.some(url => url.includes('soluciones.json')), 'Las soluciones ocultas no se descargan');

    // Filtros: inferencia oculta de partida el contraste de hipótesis; búsqueda sin tildes; epígrafe por URL.
    await page.goto(base + 'selectividad/09-inferencia-estadistica.html');
    await ready(page);
    const total = await page.locator('[data-sel-card]').count();
    const outside = await page.locator('[data-sel-card][data-fuera-temario]').count();
    assert.ok(outside > 0);
    assert.equal(await page.locator('[data-sel-status]').textContent(), `${total - outside} de ${total} ejercicios.`);
    await page.locator('[data-sel-outside]').check();
    assert.equal(await page.locator('[data-sel-status]').textContent(), `${total} ejercicios.`);
    await page.locator('[data-sel-search]').fill('tamano muestral');
    assert.ok(await page.locator('[data-sel-card]:visible').count() > 0);
    await page.locator('[data-sel-search]').fill('zzzz');
    assert.match(await page.locator('[data-sel-status]').textContent(), /Ningún ejercicio coincide/);
    assert.equal(await page.locator('[data-sel-group]:visible').count(), 0);

    await page.goto(base + 'selectividad/07-probabilidad.html?epigrafe=T07.10');
    await ready(page);
    const bayes = await page.locator('[data-sel-card][data-epigrafes~="T07.10"]').count();
    assert.equal(await page.locator('[data-sel-card]:visible').count(), bayes);
    // Un enlace directo a un ejercicio filtrado lo muestra.
    const other = await page.locator('[data-sel-card]:not([data-epigrafes~="T07.10"]) article').first().getAttribute('id');
    await page.evaluate(id => { location.hash = id; }, other);
    await page.waitForFunction(id => !document.getElementById(id).closest('[data-sel-card]').classList.contains('is-filtered'), other);
    // Las lecciones de cada tarjeta enlazan con el libro.
    const lesson = await page.locator('.mc-sel__epigraphs a').first().getAttribute('href');
    assert.equal((await page.request.get(new URL(lesson, page.url()).href)).status(), 200);

    // Soluciones: el docente activa el grupo de programación lineal; aparecen plegadas y con fórmulas.
    const solutions = config.solutions.filter(solution => solution.topicId === 't06');
    assert.ok(solutions.length > 0);
    const published = structuredClone(visibility);
    published.entries['group:selectividad-soluciones-t06'] = { visibility: 'visible' };
    published.entries['solution:' + solutions[0].id] = { visibility: 'hidden' };
    await page.route('**/config/visibility.json', route => route.fulfill({ json: published }));
    await page.goto(base + 'selectividad/06-programacion-lineal.html');
    await ready(page);
    await page.waitForFunction(() => document.querySelector('[data-sel-solution]:not([hidden])'));
    assert.equal(await page.locator('[data-sel-solution]:visible').count(), solutions.length - 1);
    assert.equal(await page.locator(`[data-sel-solution="${solutions[0].id}"]:visible`).count(), 0);
    const details = page.locator('.mc-sel__details').first();
    await details.locator('summary').click();
    await page.waitForFunction(() => document.querySelector('.mc-sel__details[open] mjx-container'));
    assert.equal(await page.locator('[data-mml-node="merror"]').count(), 0);
    await page.locator('[data-sel-solved]').check();
    assert.equal(await page.locator('[data-sel-card]:visible').count(), solutions.length - 1);
    // Con figuras: imagen con texto alternativo y cargada.
    if (await page.locator('.mc-sel__figure img').count()) {
      const image = page.locator('.mc-sel__figure img').first();
      await image.scrollIntoViewIfNeeded();
      assert.match(await image.getAttribute('alt'), /descrita en el texto/);
      assert.ok(await image.evaluate(img => img.complete && img.naturalWidth > 0));
    }

    // Respaldo: si no se puede leer la configuración publicada, ninguna solución se muestra.
    await page.unroute('**/config/visibility.json');
    await page.route('**/config/visibility.json', route => route.fulfill({ status: 503, body: '' }));
    await page.goto(base + 'selectividad/06-programacion-lineal.html');
    await page.waitForFunction(() => document.querySelector('[data-sel-status]')?.textContent);
    await page.waitForTimeout(500);
    assert.equal(await page.locator('[data-sel-solution]:visible').count(), 0);
    await page.unroute('**/config/visibility.json');
    errors.splice(0, errors.length, ...errors.filter(error => !error.startsWith('503 ')));

    // «Así cae en Selectividad» al final de las lecciones con ejercicios en el banco.
    await page.goto(base + 'libro/temas/07-probabilidad/10-teorema-de-bayes.html');
    const aside = page.locator('.mc-sel-link');
    await aside.waitFor();
    assert.match(await aside.textContent(), new RegExp(`${bayes} ejercicios`));
    const href = await aside.locator('a').getAttribute('href');
    assert.match(href, /selectividad\/07-probabilidad\.html\?epigrafe=T07\.10$/);
    await page.goto(base + 'libro/temas/08-distribuciones-de-probabilidad/03-distribucion-normal.html').catch(() => {});
    if (config.epigraphs['T08.3']?.length > 1 && (await page.locator('body[data-page-id="t08-e03"]').count())) {
      await page.locator('.mc-sel-link').waitFor();
      assert.equal(await page.locator('.mc-sel-link a').count(), config.epigraphs['T08.3'].length);
    }
    // Índice del banco y entrada en Recursos.
    await page.goto(base + 'recursos/index.html');
    await page.getByRole('link', { name: /Selectividad/ }).click();
    await page.waitForURL(/selectividad\/index\.html$/);
    assert.equal(await page.locator('main a[href$=".html"]').filter({ hasText: /^\d\./ }).count(), config.topics.length);

    // Móvil al 200 %: matrices y sistemas sin desplazamiento horizontal de la página.
    await page.setViewportSize({ width: 320, height: 844 });
    for (const topic of config.topics.filter(item => ['t04', 't01'].includes(item.topicId))) {
      await page.goto(base + topic.path);
      await ready(page);
      await mathDone(page);
      await page.evaluate(() => document.documentElement.style.fontSize = '200%');
      assert.equal(await page.evaluate(() => document.documentElement.scrollWidth > innerWidth), false, topic.path);
    }
    assert.deepEqual(errors, []);

    // Sin JavaScript: enunciados legibles, sin filtros ni soluciones.
    const nojs = await browser.newContext({ javaScriptEnabled: false });
    const offline = await nojs.newPage();
    await offline.goto(base + config.topics[0].path);
    assert.equal(await offline.locator('[data-sel-card]').count(), config.topics[0].exercises);
    assert.equal(await offline.locator('[data-sel-filters]').isVisible(), false);
    assert.equal(await offline.locator('.mc-sel__details').count(), 0);
    await nojs.close();
    console.log(`PASS: ${config.topics.length} páginas sin errores de fórmulas, filtros, enlaces directos, soluciones ocultas y activables (${config.solutions.length}), respaldo seguro, lecciones enlazadas, móvil 200 % y sin JS.`);
  } finally { await browser.close(); }
})().catch(error => { console.error(error); process.exitCode = 1; });

const assert = require('node:assert/strict');
const { chromium } = require('playwright');

// Cabecera rediseñada: «Aa» abre las opciones de lectura en una franja que ocupa su sitio; Temario (por bloques) y
// Páginas relacionadas (anterior, tema, siguiente) son paneles flotantes que se cierran con Esc o al pulsar fuera.
(async () => {
  const url = 'http://127.0.0.1:4173/libro/temas/03-integrales/05-integral-definida.html';
  const browser = await chromium.launch({ headless: true, executablePath: process.env.CHROME_PATH });
  try {
    const page = await browser.newPage({ viewport: { width: 1280, height: 800 } });
    const errors = [];
    page.on('pageerror', error => errors.push(error.message));
    await page.goto(url);
    await page.locator('[data-reading-controls] > summary').waitFor();
    // Medir con la página asentada: fórmulas dibujadas y sin avisos de carga encima del título.
    await page.locator('main mjx-container').first().waitFor();
    await page.waitForLoadState('networkidle');
    const top = () => page.locator('main h1').evaluate(el => el.getBoundingClientRect().top + scrollY);
    const isOpen = selector => page.locator(selector).evaluate(details => details.open);

    // «Aa»: nombre accesible completo y franja en el flujo (el contenido baja, nada queda tapado).
    const aa = page.locator('[data-reading-controls] > summary');
    assert.equal(await aa.getAttribute('aria-controls'), 'opciones-de-lectura');
    assert.match(await aa.innerText(), /Aa/);
    assert.ok((await aa.textContent()).includes('Opciones de lectura'));
    const before = await top();
    await aa.click();
    await page.locator('[data-reading-tray]:not([hidden]) [data-text-size]').waitFor();
    assert.ok(await top() > before + 40, 'la franja desplaza el contenido');
    await page.locator('[data-text-size]').selectOption('125');
    assert.equal(await page.evaluate(() => getComputedStyle(document.documentElement).fontSize), '20px');
    await page.locator('[data-contrast-control]').check();
    assert.equal(await page.evaluate(() => document.documentElement.dataset.contrast), 'true');
    await page.locator('[data-reset-reading]').click();
    // Esc fuera de la franja no la cierra; dentro, sí.
    await page.locator('main h1').click();
    await page.keyboard.press('Escape');
    assert.equal(await isOpen('[data-reading-controls]'), true);
    await page.locator('[data-text-size]').focus();
    await page.keyboard.press('Escape');
    assert.equal(await isOpen('[data-reading-controls]'), false);
    assert.equal(await page.locator('[data-reading-tray]').isHidden(), true);

    // Temario: tres bloques, tema actual abierto y lección actual marcada; flota sobre el contenido.
    await page.locator('.course-menu > summary').click();
    const syllabus = page.locator('[data-course-navigation]');
    await syllabus.locator('.mc-syllabus__block').first().waitFor();
    assert.deepEqual(await syllabus.locator('.mc-syllabus__block').evaluateAll(blocks => blocks.map(b => b.dataset.block)), ['analisis', 'algebra', 'azar']);
    assert.equal(await syllabus.locator('details[open]').count(), 1);
    const current = syllabus.locator('a[aria-current="page"]');
    assert.equal(await current.count(), 1);
    assert.match(await current.textContent(), /3\.5.*Integral definida/);
    assert.equal(await page.locator('.mc-popover--course').evaluate(el => getComputedStyle(el).position), 'absolute');
    assert.equal(await top(), before);
    // Solo un panel a la vez; Esc cierra y devuelve el foco; pulsar fuera cierra.
    await page.locator('[data-context-group] > summary').click();
    assert.equal(await isOpen('.course-menu'), false);
    const related = page.locator('[data-context-navigation] .mc-related__item');
    assert.deepEqual(await related.evaluateAll(items => items.map(i => i.dataset.role)), ['previous', 'parent', 'next']);
    assert.match(await related.nth(0).innerText(), /Anterior[\s\S]*3\.4/i);
    assert.match(await related.nth(2).innerText(), /Siguiente[\s\S]*3\.6/i);
    await page.keyboard.press('Escape');
    assert.equal(await isOpen('[data-context-group]'), false);
    assert.equal(await page.evaluate(() => document.activeElement.closest('[data-context-group]') !== null), true);
    await page.locator('.course-menu > summary').click();
    await page.mouse.click(30, 780);
    assert.equal(await isOpen('.course-menu'), false);

    // Pie: autoría, licencia CC BY-NC y enlace al centro.
    const credits = page.locator('footer [data-footer-credits]');
    assert.match(await credits.innerText(), /Juan María Gámez Ortiz[\s\S]*Claude[\s\S]*Codex/);
    assert.equal(await credits.locator('a[rel~="license"]').getAttribute('href'), 'https://creativecommons.org/licenses/by-nc/4.0/deed.es');
    assert.equal(await page.locator('footer .mc-footer__centre a').getAttribute('href'), 'https://iesalandalus.org/joomla/');

    // Primera lección de un tema (sin «Anterior»): índice y siguiente ocupan todo el ancho del panel.
    await page.goto('http://127.0.0.1:4173/libro/temas/06-programacion-lineal/01-inecuaciones-lineales-con-dos-incognitas.html');
    await page.locator('[data-context-group] > summary').click();
    const firstLesson = page.locator('[data-context-navigation] .mc-related__item');
    assert.deepEqual(await firstLesson.evaluateAll(items => items.map(i => i.dataset.role)), ['parent', 'next']);
    const panelWidth = await page.locator('[data-context-navigation] .mc-related').evaluate(el => el.clientWidth);
    for (const width of await firstLesson.evaluateAll(items => items.map(i => i.getBoundingClientRect().width))) {
      assert.ok(width >= panelWidth - 1, `tarjeta de ${width}px en un panel de ${panelWidth}px`);
    }
    await page.keyboard.press('Escape');
    // Las fórmulas que caben (≤, <, una letra) no muestran barra: el MathML oculto no cuenta para el desplazamiento.
    await page.locator('mjx-container svg').first().waitFor();
    const falseScroll = await page.locator('main mjx-container').evaluateAll(all => all
      .filter(c => c.scrollWidth > c.clientWidth + 1 && c.querySelector(':scope > svg').getBoundingClientRect().width <= c.clientWidth + 1)
      .map(c => c.querySelector('mjx-assistive-mml')?.textContent));
    assert.deepEqual(falseScroll, []);

    // Móvil con texto al 200 %: el panel cabe en la vista, sobre la barra inferior, y la página no se ensancha.
    await page.setViewportSize({ width: 320, height: 700 });
    await page.evaluate(() => document.documentElement.style.fontSize = '200%');
    await page.locator('.course-menu > summary').click();
    const box = await page.locator('.mc-popover--course').boundingBox();
    const tabbar = await page.locator('.mc-tabbar').boundingBox();
    assert.ok(box.y >= 0 && box.y + box.height <= tabbar.y + 1, JSON.stringify({ box, tabbar }));
    assert.equal(await page.evaluate(() => document.documentElement.scrollWidth > innerWidth), false);
    assert.deepEqual(errors, []);
    console.log('PASS: «Aa» con franja en el flujo, Temario por bloques, Páginas relacionadas con papeles, Esc, clic fuera y 200 % en 320 px.');
  } finally { await browser.close(); }
})().catch(error => { console.error(error); process.exitCode = 1; });

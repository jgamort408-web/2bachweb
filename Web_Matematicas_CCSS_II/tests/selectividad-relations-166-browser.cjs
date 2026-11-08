const assert = require('node:assert/strict');
const fs = require('node:fs');
const path = require('node:path');
const { chromium } = require('playwright');

// P09 · Generador de relaciones: criterios, selección reproducible por enlace, hoja imprimible, descargas .tex y .zip,
// soluciones solo publicadas (también con respaldo seguro), móvil al 200 % y aviso sin JavaScript.
const visibility = JSON.parse(fs.readFileSync(path.join(__dirname, '..', 'config', 'visibility.json'), 'utf8'));
const config = JSON.parse(fs.readFileSync(path.join(__dirname, '..', 'config', 'selectividad.json'), 'utf8'));

(async () => {
  const base = 'http://127.0.0.1:4173/';
  const route = base + 'selectividad/relaciones.html';
  const browser = await chromium.launch({ headless: true, executablePath: process.env.CHROME_PATH });
  try {
    const context = await browser.newContext({ viewport: { width: 1200, height: 900 }, acceptDownloads: true });
    const page = await context.newPage();
    const errors = [];
    page.on('pageerror', error => errors.push(error.message));
    page.on('response', response => { if (response.status() >= 400 && !response.url().endsWith('favicon.ico')) errors.push(response.status() + ' ' + response.url()); });
    const ready = () => page.waitForFunction(() => document.querySelector('[data-rel-status]')?.textContent);
    const ids = () => page.locator('.mc-rel__origin').evaluateAll(nodes => nodes.map(node => node.textContent.split(' · ').at(-1)));

    await page.goto(route);
    await ready();
    assert.match(await page.locator('[data-rel-status]').textContent(), /ejercicios cumplen los criterios; se elegirán 6\./);
    // Sin soluciones publicadas no se ofrecen las opciones de soluciones.
    assert.equal(await page.locator('[data-rel-solutions-field]').isVisible(), false);
    await page.locator('[name="tema"][value="t07"]').check();
    await page.locator('[data-rel-tag-search]').fill('bayes');
    assert.equal(await page.locator('[data-rel-tags] label:visible').count(), 1);
    await page.locator('[data-rel-tags] label:visible input').check();
    await page.locator('[name="n"]').fill('4');
    await page.locator('[name="semilla"]').fill('48213');
    await page.getByRole('button', { name: 'Generar relación' }).click();
    await page.waitForSelector('[data-rel-output]:not([hidden])');
    assert.equal(await page.locator('.mc-rel__exercise').count(), 4);
    assert.ok(await page.evaluate(() => document.activeElement?.id === 'relacion-titulo'));
    const first = await ids();
    assert.match(page.url(), /temas=t07&etiquetas=bayes&n=4&semilla=48213$/);
    // Algunos enunciados de probabilidad no tienen fórmulas: solo se espera a MathJax si hay TeX en la hoja.
    await page.waitForFunction(() => document.querySelectorAll('.mc-rel__sheet mjx-container').length > 0
      || !document.querySelector('.mc-rel__sheet').textContent.includes('\\('));
    assert.equal(await page.locator('[data-mml-node="merror"]').count(), 0);
    // El enlace reproduce la misma relación; otra selección cambia la semilla y los ejercicios.
    await page.goto(page.url());
    await page.waitForSelector('[data-rel-output]:not([hidden])');
    assert.deepEqual(await ids(), first);
    await page.getByRole('button', { name: 'Otra selección' }).click();
    await page.waitForFunction(() => !location.search.includes('semilla=48213'), null, { timeout: 5000 })
      .catch(async error => { console.error('URL', page.url(), await page.locator('[data-rel-status]').textContent()); throw error; });
    assert.notDeepEqual(await ids(), first);
    await page.goto(route + '?temas=t07&etiquetas=bayes&n=4&semilla=48213');
    await page.waitForSelector('[data-rel-output]:not([hidden])');

    // Descargas: LaTeX autónomo y proyecto para Overleaf.
    const [tex] = await Promise.all([page.waitForEvent('download'), page.getByRole('button', { name: /Descargar LaTeX/ }).click()]);
    assert.equal(tex.suggestedFilename(), 'relacion-selectividad-48213.tex');
    const texContent = fs.readFileSync(await tex.path(), 'utf8');
    assert.match(texContent, /\\documentclass/);
    for (const id of first) assert.ok(texContent.includes('Referencia: ' + id), id);
    const [zip] = await Promise.all([page.waitForEvent('download'), page.getByRole('button', { name: /Overleaf/ }).click()]);
    const zipBytes = fs.readFileSync(await zip.path());
    assert.equal(zipBytes.toString('latin1', 0, 2), 'PK');
    for (const name of ['main.tex', 'catalogo/registro.tex', 'selecciones/relacion.tex', ...first.map(id => `enunciados/${id}.tex`)]) {
      assert.ok(zipBytes.includes(Buffer.from(name)), name);
    }
    // registro.tex nombra siempre las rutas de soluciones; lo que no debe viajar es el contenido de ninguna.
    assert.ok(!zipBytes.includes(Buffer.from('% ESTADO: validada')));

    // Impresión: solo la hoja, con el primer ejercicio en la primera página.
    await page.emulateMedia({ media: 'print' });
    assert.equal(await page.locator('[data-rel-form]').isVisible(), false);
    assert.equal(await page.locator('#site-header').isVisible(), false);
    assert.ok(await page.locator('.mc-rel__exercise').first().isVisible());
    const pdf = await page.pdf({ format: 'A4' });
    assert.ok(pdf.length > 10000);
    await page.emulateMedia({ media: 'screen' });

    // Soluciones publicadas por el docente: opciones visibles, sección de soluciones y archivos en el .zip.
    const topic = config.solutions[0].topicId;
    const published = structuredClone(visibility);
    published.entries['group:selectividad-soluciones-' + topic] = { visibility: 'visible' };
    await page.route('**/config/visibility.json', request => request.fulfill({ json: published }));
    await page.goto(route + `?temas=${topic}&n=3&semilla=7&resueltos=1&soluciones=1`);
    await page.waitForSelector('[data-rel-output]:not([hidden])');
    assert.equal(await page.locator('[data-rel-solutions-field]').isVisible(), true);
    assert.equal(await page.locator('.mc-rel__solutions h3').count(), 3);
    assert.equal(await page.locator('.mc-rel__solutions').getByText('Solución no disponible todavía.').count(), 0);
    const solved = await ids();
    const [solvedZip] = await Promise.all([page.waitForEvent('download'), page.getByRole('button', { name: /Overleaf/ }).click()]);
    const solvedBytes = fs.readFileSync(await solvedZip.path());
    for (const id of solved) assert.ok(solvedBytes.includes(Buffer.from(`soluciones/${id}.tex`)), id);
    assert.ok(solvedBytes.includes(Buffer.from('enunciados-y-soluciones')));
    // Con la configuración de respaldo no se ofrecen soluciones.
    await page.unroute('**/config/visibility.json');
    await page.route('**/config/visibility.json', request => request.fulfill({ status: 503, body: '' }));
    await page.goto(route + `?temas=${topic}&n=3&semilla=7&soluciones=1`);
    await page.waitForSelector('[data-rel-output]:not([hidden])');
    assert.equal(await page.locator('.mc-rel__solutions').count(), 0);
    await page.unroute('**/config/visibility.json');
    errors.splice(0, errors.length, ...errors.filter(error => !error.startsWith('503 ')));

    // Índice del banco enlaza el generador; móvil al 200 % sin desplazamiento horizontal.
    await page.goto(base + 'selectividad/index.html');
    await page.getByRole('link', { name: 'generador de relaciones' }).click();
    await page.waitForURL(/relaciones\.html$/);
    await page.setViewportSize({ width: 320, height: 844 });
    await page.goto(route + '?temas=t04&n=3&semilla=5');
    await page.waitForSelector('[data-rel-output]:not([hidden])');
    await page.waitForFunction(() => document.querySelectorAll('.mc-rel__sheet mjx-container').length > 0);
    await page.evaluate(() => document.documentElement.style.fontSize = '200%');
    assert.equal(await page.evaluate(() => document.documentElement.scrollWidth > innerWidth), false);
    assert.deepEqual(errors, []);

    const nojs = await browser.newContext({ javaScriptEnabled: false });
    const offline = await nojs.newPage();
    await offline.goto(route);
    assert.match(await offline.locator('.mc-rel__notice').innerText(), /El generador necesita JavaScript/);
    assert.ok(await offline.locator('.mc-rel__notice').isVisible());
    assert.equal(await offline.locator('[data-rel-form]').isVisible(), false);
    await nojs.close();
    console.log('PASS: criterios, enlace reproducible, otra selección, .tex y .zip, impresión, soluciones publicadas y respaldo, móvil 200 % y sin JS.');
  } finally { await browser.close(); }
})().catch(error => { console.error(error); process.exitCode = 1; });

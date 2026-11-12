const assert = require('node:assert/strict');
const fs = require('node:fs');
const path = require('node:path');
const { chromium } = require('playwright');

// P10 · Generador de exámenes con formato PAU: examen completo al cargar, enlace reproducible, huecos guiados (tema,
// contenido, referencia, otro ejercicio), opcionalidad y aviso del 40–50 %, tabla oficial, soluciones publicadas y
// respaldo seguro, descargas .tex y .zip, impresión, móvil al 200 % y aviso sin JavaScript.
const official = JSON.parse(fs.readFileSync(path.join(__dirname, '..', 'content', 'selectividad', 'tabla-normal.json'), 'utf8'));
const visibility = JSON.parse(fs.readFileSync(path.join(__dirname, '..', 'config', 'visibility.json'), 'utf8'));

(async () => {
  const base = 'http://127.0.0.1:4173/';
  const route = base + 'selectividad/examenes.html';
  const browser = await chromium.launch({ headless: true, executablePath: process.env.CHROME_PATH });
  try {
    const context = await browser.newContext({ viewport: { width: 1200, height: 900 }, acceptDownloads: true });
    const page = await context.newPage();
    const errors = [];
    page.on('pageerror', error => errors.push(error.message));
    page.on('response', response => { if (response.status() >= 400 && !response.url().endsWith('favicon.ico')) errors.push(response.status() + ' ' + response.url()); });
    const ready = () => page.waitForSelector('[data-exam-output]:not([hidden])');
    const refs = () => page.locator('.mc-exam-option .mc-rel__origin').evaluateAll(nodes => nodes.map(node => node.textContent.split(' · ').at(-1)));

    await page.goto(route + '?semilla=48213');
    await ready();
    // Cuatro ejercicios: 1 y 2 con opción A y B; 3 y 4 obligatorios; sin avisos.
    assert.equal(await page.locator('.mc-exam-exercise').count(), 4);
    assert.equal(await page.locator('.mc-exam-option h4').count(), 4);
    assert.match(await page.locator('.mc-exam-exercise h3').first().textContent(), /Ejercicio 1 \(3 puntos\)/);
    assert.match(await page.locator('.mc-exam-exercise h3').nth(2).textContent(), /Ejercicio 3 \(2 puntos\)/);
    assert.equal(await page.locator('.mc-exam-instructions li').count(), 7);
    assert.equal(await page.locator('[data-exam-warnings] li').count(), 0);
    const first = await refs();
    assert.equal(new Set(first).size, 6);
    // Puntuaciones adaptadas: en cada opción suman los puntos del ejercicio.
    const sums = await page.locator('.mc-exam-option').evaluateAll(blocks => blocks.map(block => [...block.querySelectorAll('.mc-sel__statement strong')]
      .map(node => /^\((\d+(?:\.\d+)?) puntos?\)$/.exec(node.textContent)?.[1]).filter(Boolean).reduce((sum, value) => sum + Number(value), 0)));
    assert.deepEqual(sums.map(sum => sum === 0 ? null : sum), [3, 3, 3, 3, 2, 2].map((value, index) => sums[index] === 0 ? null : value));
    // Tabla oficial, idéntica a la del documento.
    assert.equal(await page.locator('.mc-exam-table tbody tr').count(), 41);
    assert.equal(await page.locator('.mc-exam-table tbody tr').nth(6).locator('td').first().textContent(), official.filas[6].valores[0]);
    await page.waitForFunction(() => document.querySelectorAll('.mc-exam-sheet mjx-container').length > 0);
    assert.equal(await page.locator('[data-mml-node="merror"]').count(), 0);
    // El enlace reproduce el examen.
    await page.goto(page.url());
    await ready();
    assert.deepEqual(await refs(), first);

    // Huecos guiados: «Otro ejercicio» solo cambia ese hueco y los anteriores se mantienen.
    await page.locator('[data-slot="3"] button').click();
    await page.waitForFunction(() => location.search.includes('otro3=1'));
    const rerolled = await refs();
    assert.notEqual(rerolled[4], first[4]);
    assert.deepEqual(rerolled.slice(0, 4), first.slice(0, 4));
    // Tema y contenido: opción A del ejercicio 1 de programación lineal; ejercicio 2B sobre asíntotas.
    await page.locator('[name="tema-1a"]').selectOption('t06');
    await page.waitForFunction(() => location.search.includes('tema1a=t06'));
    await page.locator('[name="contenido-2b"]').selectOption('asintotas');
    await page.waitForFunction(() => location.search.includes('contenido2b=asintotas'));
    // Referencia concreta.
    await page.locator('[name="ref-4"]').fill('SEL-D0001-OA-E04');
    await page.locator('[name="ref-4"]').press('Enter');
    await page.waitForFunction(() => location.search.includes('ref4=SEL-D0001-OA-E04'));
    assert.equal((await refs()).at(-1), 'SEL-D0001-OA-E04');
    // Una referencia inexistente avisa y se sustituye.
    await page.locator('[name="ref-3"]').fill('SEL-D9999-OA-E01');
    await page.locator('[name="ref-3"]').press('Tab');
    await page.waitForSelector('[data-exam-warnings] li');
    assert.match(await page.locator('[data-exam-warnings]').textContent(), /SEL-D9999-OA-E01 no existe/);
    // Sin opcionalidad en el ejercicio 1: un solo hueco y aviso de la parte obligatoria (70 %).
    await page.locator('[name="op1"]').uncheck();
    await page.waitForFunction(() => location.search.includes('op1=0'));
    assert.equal(await page.locator('[data-slot]').count(), 5);
    assert.match(await page.locator('[data-exam-warnings]').textContent(), /70 %/);
    assert.equal(await page.locator('.mc-exam-instructions li').count(), 7);
    await page.locator('[name="op2"]').uncheck();
    assert.equal(await page.locator('.mc-exam-instructions li').count(), 6);

    // Descargas con soluciones: .tex autónomo y proyecto .zip.
    await page.goto(route + '?semilla=7&soluciones=1');
    await ready();
    assert.ok(await page.locator('[data-exam-solutions-field]').isVisible());
    assert.equal(await page.locator('.mc-rel__solutions h4').count(), 6);
    const [tex] = await Promise.all([page.waitForEvent('download'), page.getByRole('button', { name: /Descargar LaTeX/ }).click()]);
    assert.equal(tex.suggestedFilename(), 'examen-pau-7.tex');
    const texContent = fs.readFileSync(await tex.path(), 'utf8');
    assert.match(texContent, /\\section\*\{EJERCICIO 4 \\normalfont\(2 puntos\)\}/);
    assert.match(texContent, /\\section\*\{Soluciones\}/);
    assert.match(texContent, /0\.6 & 0\.7258/);
    const [zip] = await Promise.all([page.waitForEvent('download'), page.getByRole('button', { name: /Overleaf/ }).click()]);
    const zipBytes = fs.readFileSync(await zip.path());
    assert.equal(zipBytes.toString('latin1', 0, 2), 'PK');
    assert.ok(zipBytes.includes(Buffer.from('examen.tex')));
    // Impresión: solo la hoja.
    await page.emulateMedia({ media: 'print' });
    assert.equal(await page.locator('[data-exam-form]').isVisible(), false);
    assert.ok(await page.locator('.mc-exam-exercise').first().isVisible());
    assert.ok((await page.pdf({ format: 'A4' })).length > 10000);
    await page.emulateMedia({ media: 'screen' });

    // Con los grupos de soluciones ocultos o con la configuración de respaldo no se ofrecen soluciones.
    const hidden = structuredClone(visibility);
    for (const key of Object.keys(hidden.entries)) hidden.entries[key] = { visibility: 'hidden' };
    await page.route('**/config/visibility.json', request => request.fulfill({ json: hidden }));
    await page.goto(route + '?semilla=7&soluciones=1');
    await ready();
    assert.equal(await page.locator('[data-exam-solutions-field]').isVisible(), false);
    assert.equal(await page.locator('.mc-rel__solutions').count(), 0);
    await page.unroute('**/config/visibility.json');
    await page.route('**/config/visibility.json', request => request.fulfill({ status: 503, body: '' }));
    await page.goto(route + '?semilla=7&soluciones=1');
    await ready();
    assert.equal(await page.locator('.mc-rel__solutions').count(), 0);
    await page.unroute('**/config/visibility.json');
    errors.splice(0, errors.length, ...errors.filter(error => !error.startsWith('503 ')));

    // Enlace desde el índice del banco; móvil al 200 % sin desplazamiento horizontal.
    await page.goto(base + 'selectividad/index.html');
    await page.getByRole('link', { name: 'generador de exámenes' }).click();
    await page.waitForURL(/examenes\.html/);
    await page.setViewportSize({ width: 320, height: 844 });
    await page.goto(route + '?semilla=5');
    await ready();
    await page.waitForFunction(() => document.querySelectorAll('.mc-exam-sheet mjx-container').length > 0);
    await page.evaluate(() => document.documentElement.style.fontSize = '200%');
    assert.equal(await page.evaluate(() => document.documentElement.scrollWidth > innerWidth), false);
    assert.deepEqual(errors, []);

    const nojs = await browser.newContext({ javaScriptEnabled: false });
    const offline = await nojs.newPage();
    await offline.goto(route);
    assert.match(await offline.locator('.mc-rel__notice').innerText(), /El generador necesita JavaScript/);
    assert.equal(await offline.locator('[data-exam-form]').isVisible(), false);
    await nojs.close();
    console.log('PASS: examen PAU reproducible, huecos guiados, opcionalidad y aviso, tabla oficial, soluciones y respaldo, .tex y .zip, impresión, móvil 200 % y sin JS.');
  } finally { await browser.close(); }
})().catch(error => { console.error(error); process.exitCode = 1; });

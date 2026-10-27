const assert = require('node:assert/strict');
const { chromium } = require('playwright');
const base = process.env.TEST_URL || 'http://127.0.0.1:4173/';
const lesson = 'libro/temas/02-representacion-de-funciones/01-esquema-general-para-representar-una-funcion.html';
(async () => {
  const browser = await chromium.launch({ headless: true, ...(process.env.CHROME_PATH ? { executablePath: process.env.CHROME_PATH } : {}) });
  const errors = [];
  try {
    const page = await browser.newPage({ viewport: { width: 390, height: 844 } });
    page.on('pageerror', e => errors.push(e.message));
    page.on('response', r => { if (r.status() >= 400 && !r.url().endsWith('favicon.ico')) errors.push(r.status() + ' ' + r.url()); });
    const ready = async (mathRequired = true) => {
      if (mathRequired) await page.waitForFunction(() => document.querySelector('.math-status')?.hidden === true);
      else await page.locator('[data-content-role="flashcard-front"]').waitFor();
      assert.equal(await page.locator('[data-mml-node="merror"]').count(), 0);
      assert.equal(await page.evaluate(() => document.documentElement.scrollWidth <= innerWidth), true, page.url());
    };
    const complete = async (scope, wrongFirst = false) => {
      const bank = await page.evaluate(async ({ base, scope }) => (await import(base + 'content/activities/catalog.js')).questionsForScope(scope), { base, scope });
      for (let i = 0; i < bank.length; i++) {
        if (i === 0 && wrongFirst) {
          await page.getByRole('button', { name: 'Comprobar', exact: true }).click();
          await page.locator('.feedback').filter({ hasText: 'Selecciona' }).waitFor();
          await page.locator('input[value="' + bank[i].options.find(o => o.id !== bank[i].correct).id + '"]').check();
          await page.getByRole('button', { name: 'Comprobar', exact: true }).click();
          await page.locator('.feedback').filter({ hasText: 'Revisa' }).waitFor();
          await page.getByRole('button', { name: 'Ver pista', exact: true }).click();
          await page.locator('.feedback').filter({ hasText: 'Pista:' }).waitFor();
        }
        await page.locator('input[value="' + bank[i].correct + '"]').check();
        await page.getByRole('button', { name: 'Comprobar', exact: true }).click();
        await page.getByRole('button', { name: /Siguiente pregunta|Ver resumen/ }).waitFor(); await ready();
        await page.getByRole('button', { name: /Siguiente pregunta|Ver resumen/ }).click();
      }
      await page.getByText((bank.length - Number(wrongFirst)) + ' de ' + bank.length + ' respuestas correctas', { exact: false }).waitFor();
    };
    await page.goto(base + lesson); await ready();
    assert.equal(await page.locator('[data-roots] circle').count(), 3);
    assert.equal(await page.locator('[data-extrema] rect').count(), 2);
    assert.equal(await page.locator('[data-curve]').isVisible(), false);
    await page.locator('[data-layer="extrema"]').focus(); await page.keyboard.press('Space');
    await page.locator('[data-layer="curve"]').check();
    assert.equal(await page.locator('[data-curve]').isVisible(), true);
    await page.locator('[data-layer-status]').filter({ hasText: 'curva completa' }).waitFor();
    await page.getByText('Ver estudio completo', { exact: true }).click(); await ready();
    await complete('t02-e01', true);
    for (let i = 1; i <= 6; i++) {
      await page.getByText('Tarjeta ' + i + ' de 6', { exact: true }).waitFor();
      await page.getByRole('button', { name: 'Mostrar respuesta', exact: true }).click(); await ready();
      if (i < 6) await page.getByRole('button', { name: 'Siguiente', exact: true }).click();
    }
    await page.locator('[data-reading-controls] > summary').click();
    await page.locator('[data-text-size]').selectOption('200');
    await page.locator('[data-contrast-control]').check(); await page.locator('[data-highlight-control]').check();
    await page.setViewportSize({ width: 320, height: 844 }); await ready();
    if (process.env.SCREENSHOT_DIR) await page.locator('#explorador').screenshot({ path: process.env.SCREENSHOT_DIR + '/representacion-200-movil.png' });
    await page.setViewportSize({ width: 1280, height: 900 });
    await page.locator('[data-reset-reading]').click(); await ready();
    if (process.env.SCREENSHOT_DIR) await page.locator('#explorador').screenshot({ path: process.env.SCREENSHOT_DIR + '/representacion-capas.png' });
    await page.goto(base + 'test/index.html?tema=t02'); await ready(); await complete('t02');
    await page.goto(base + 'test/index.html?tema=t01'); await ready();
    assert.match(await page.locator('[data-content-role="activity-progress"]').innerText(), /1 de 60/);
    await page.goto(base + 'test/index.html?tema=inventado'); await ready();
    assert.match(await page.locator('[data-content-role="activity-progress"]').innerText(), new RegExp('1 de '+(await import('./helpers/catalog-expectations.mjs')).expectedCatalog.questions));
    for (const [topic, count] of [['t01', 61], ['t02', 54], ['inventado', (await import('./helpers/catalog-expectations.mjs')).expectedCatalog.cards]]) {
      await page.goto(base + 'tarjetas/index.html?tema=' + topic); await ready(topic !== 't02');
      await page.getByText('Tarjeta 1 de ' + count, { exact: true }).waitFor();
    }
    await page.goto(base + 'libro/temas/02-representacion-de-funciones/index.html');
    await page.waitForFunction(() => document.querySelectorAll('[data-topic-index] li').length === 9);
    const index = await page.locator('[data-topic-index]').innerText();
    assert.equal(index.match(/Disponible/g).length, 9); assert.equal((index.match(/En preparación/g) || []).length, 0);
    const prefix = new URL('prueba-subcarpeta/', base).href;
    await page.route(prefix + '**', async route => { const response = await route.fetch({ url: route.request().url().replace(prefix, base) }); await route.fulfill({ response }); });
    await page.goto(prefix + lesson); await ready();
    await page.locator('[data-layer="curve"]').check(); assert.equal(await page.locator('[data-curve]').isVisible(), true);
    await page.goto(prefix + 'tarjetas/index.html?tema=t02'); await ready(false); await page.getByText('Tarjeta 1 de 54', { exact: true }).waitFor();
    assert.deepEqual(errors, []);
    console.log('Aprobado: lección 2.1, capas con teclado, 5/6 con pista y reintento, seis tarjetas, texto 200 % a 320 px, test del tema 2 completo, bancos por tema y general, índice actualizado, subcarpeta y LaTeX sin errores.');
  } finally { await browser.close(); }
})().catch(error => { console.error(error); process.exitCode = 1; });

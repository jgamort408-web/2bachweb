const assert = require('node:assert/strict');
const { chromium } = require('playwright');

// P06 · Formulario: 87 fórmulas por tema con MathJax, búsqueda, filtro por tema, ?tema=, enlace a la lección,
// raíz y subcarpeta, móvil al 200 % y sin JS.
(async () => {
  const base = 'http://127.0.0.1:4173/';
  const route = 'herramientas/formulario.html';
  const browser = await chromium.launch({ headless: true, executablePath: process.env.CHROME_PATH });
  try {
    const page = await browser.newPage({ viewport: { width: 1200, height: 900 } });
    const errors = [];
    page.on('pageerror', e => errors.push(e.message));
    page.on('response', r => { if (r.status() >= 400 && !r.url().endsWith('favicon.ico')) errors.push(r.status() + ' ' + r.url()); });
    for (const prefix of [base, base + 'prueba-subcarpeta/']) {
      if (prefix !== base) await page.route(prefix + '**', async route => {
        const response = await route.fetch({ url: route.request().url().replace(prefix, base) });
        await route.fulfill({ response });
      });
      await page.goto(prefix + route);
      const status = page.locator('[data-formula-status]');
      await page.waitForFunction(() => document.querySelector('[data-formula-status]')?.textContent);
      assert.equal(await status.textContent(), '87 fórmulas.');
      // Todas las fórmulas se componen sin errores de TeX.
      await page.waitForFunction(() => document.querySelectorAll('.mc-formula mjx-container').length === 87, null, { timeout: 30000 });
      assert.equal(await page.locator('[data-mml-node="merror"]').count(), 0);
      // Búsqueda sin tildes.
      await page.locator('[data-formula-search]').fill('bayes');
      assert.equal(await status.textContent(), '1 de 87 fórmulas.');
      assert.equal(await page.locator('[data-formula-group]:visible').count(), 1);
      await page.locator('[data-formula-search]').fill('regresion');
      assert.equal(await page.locator('[data-formula-entry]:visible').count(), 1);
      await page.locator('[data-formula-search]').fill('');
      // Filtro por tema: los demás temas y sus enlaces del índice desaparecen.
      await page.locator('[data-formula-topic]').selectOption('t05');
      assert.equal(await page.locator('[data-formula-group]:visible').count(), 1);
      assert.equal(await page.locator('.mc-formulas__topics a:visible').count(), 1);
      await page.locator('[data-formula-search]').fill('zzz');
      assert.match(await status.textContent(), /Ninguna fórmula coincide/);
      await page.locator('[data-formula-search]').fill('');
      await page.locator('[data-formula-topic]').selectOption('');
      // De la fórmula a su lección.
      await page.locator('#formulas-t07 .mc-formula').filter({ hasText: 'Teorema de Bayes' }).getByRole('link', { name: '7.10. Teorema de Bayes' }).click();
      await page.waitForURL(/10-teorema-de-bayes\.html$/);
    }
    await page.goto(base + route + '?tema=t09');
    await page.waitForFunction(() => document.querySelector('[data-formula-status]')?.textContent);
    assert.equal(await page.locator('[data-formula-group]:visible').count(), 1);
    assert.equal(await page.locator('[data-formula-topic]').inputValue(), 't09');
    await page.goto(base + route);
    await page.waitForFunction(() => document.querySelectorAll('.mc-formula mjx-container').length === 87, null, { timeout: 30000 });
    await page.setViewportSize({ width: 320, height: 844 });
    await page.evaluate(() => document.documentElement.style.fontSize = '200%');
    assert.equal(await page.evaluate(() => document.documentElement.scrollWidth > innerWidth), false);
    const nojs = await browser.newContext({ javaScriptEnabled: false });
    const offline = await nojs.newPage();
    await offline.goto(base + route);
    assert.equal(await offline.locator('[data-formula-entry]').count(), 87);
    assert.equal(await offline.locator('[data-formula-filters]').isVisible(), false);
    await nojs.close();
    assert.deepEqual(errors, []);
    console.log('PASS: 87 fórmulas con MathJax, búsqueda, filtro por tema, ?tema, fórmula → lección, raíz/subcarpeta, móvil 200 % y sin JS.');
  } finally { await browser.close(); }
})().catch(e => { console.error(e); process.exitCode = 1; });

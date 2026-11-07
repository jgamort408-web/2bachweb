const assert = require('node:assert/strict');
const { chromium } = require('playwright');

// P06 · Glosario: 42 términos con fórmulas, búsqueda, enlace a la lección y vuelta desde la lección al término.
(async () => {
  const base = 'http://127.0.0.1:4173/';
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
      await page.goto(prefix + 'herramientas/glosario.html');
      const status = page.locator('[data-glossary-status]');
      await page.waitForFunction(() => document.querySelector('[data-glossary-status]')?.textContent);
      assert.equal(await status.textContent(), '42 términos.');
      await page.waitForFunction(() => document.querySelectorAll('#termino-derivada-en-un-punto mjx-container').length > 0);
      assert.equal(await page.locator('[data-mml-node="merror"]').count(), 0);
      await page.locator('[data-glossary-search]').fill('regresion');
      assert.equal(await status.textContent(), '1 de 42 términos.');
      assert.equal(await page.locator('[data-glossary-entry]:visible').count(), 1);
      // Las letras sin resultados desaparecen del índice.
      assert.equal(await page.locator('.mc-glossary__letters a:visible').count(), 1);
      await page.locator('[data-glossary-search]').fill('');
      // Del término a su lección.
      await page.locator('#termino-rango-de-una-matriz').getByRole('link', { name: '4.10. Rango de una matriz' }).click();
      await page.waitForURL(/10-rango-de-una-matriz\.html$/);
      // Y de la lección al término, por la franja «En el glosario».
      const links = page.getByRole('navigation', { name: 'En el glosario' });
      await links.getByRole('link', { name: 'Rango de una matriz (glosario)' }).click();
      await page.waitForURL(/glosario\.html#termino-rango-de-una-matriz$/);
      // La franja va entre el contenido y anterior/siguiente.
      await page.goto(prefix + 'libro/apoyos/estadistica-bidimensional.html');
      await page.getByRole('navigation', { name: 'En el glosario' }).waitFor();
      assert.equal(await page.getByRole('navigation', { name: 'En el glosario' }).getByRole('link').count(), 9);
      assert.equal(await page.evaluate(() => document.querySelector('main').nextElementSibling.className), 'mc-glossary-links');
    }
    await page.goto(base + 'herramientas/glosario.html');
    await page.setViewportSize({ width: 320, height: 844 });
    await page.evaluate(() => document.documentElement.style.fontSize = '200%');
    assert.equal(await page.evaluate(() => document.documentElement.scrollWidth > innerWidth), false);
    const nojs = await browser.newContext({ javaScriptEnabled: false });
    const offline = await nojs.newPage();
    await offline.goto(base + 'herramientas/glosario.html');
    assert.equal(await offline.locator('[data-glossary-entry]').count(), 42);
    assert.equal(await offline.locator('[data-glossary-filters]').isVisible(), false);
    await nojs.close();
    assert.deepEqual(errors, []);
    console.log('PASS: 42 términos con fórmulas, búsqueda, término → lección → término, raíz/subcarpeta, móvil 200 % y sin JS.');
  } finally { await browser.close(); }
})().catch(e => { console.error(e); process.exitCode = 1; });

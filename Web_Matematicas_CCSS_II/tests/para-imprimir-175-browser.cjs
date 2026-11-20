const assert = require('node:assert/strict');
const { chromium } = require('playwright');

// Para imprimir: hojas resumen y relación guiada en PDF, accesibles desde Recursos, descargables y en móvil.
(async () => {
  const base = process.env.TEST_URL || 'http://127.0.0.1:4173/';
  const browser = await chromium.launch({ headless: true, executablePath: process.env.CHROME_PATH });
  try {
    const page = await browser.newPage({ viewport: { width: 1280, height: 900 } });
    const errors = [];
    page.on('pageerror', e => errors.push(e.message));
    await page.goto(base + 'recursos/index.html');
    await page.getByRole('link', { name: /Para imprimir/ }).click();
    await page.waitForURL(/materiales\/index\.html$/);
    const cards = page.locator('main [data-content-id^="resource:"]');
    await cards.first().waitFor();
    assert.equal(await cards.count(), 11);
    assert.equal(await page.locator('main [data-content-id^="resource:"]:visible').count(), 11);
    for (const href of await page.locator('main a[download]').evaluateAll(links => links.map(a => a.href))) {
      const response = await page.request.get(href);
      assert.equal(response.status(), 200, href);
      assert.match(response.headers()['content-type'] || '', /pdf/, href);
      assert.ok((await response.body()).subarray(0, 5).toString() === '%PDF-', href);
    }
    assert.match(await page.locator('main').innerText(), /doble cara/);
    assert.equal(await page.locator('main a[href*="soluciones"]').count(), 0);
    await page.setViewportSize({ width: 320, height: 800 });
    assert.equal(await page.evaluate(() => document.documentElement.scrollWidth > innerWidth), false);
    assert.deepEqual(errors, []);
    console.log('PASS: Para imprimir desde Recursos, 11 PDF descargables, sin soluciones y en 320 px.');
  } finally { await browser.close(); }
})().catch(error => { console.error(error); process.exitCode = 1; });

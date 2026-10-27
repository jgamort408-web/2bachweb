const assert = require('node:assert/strict');
const fs = require('node:fs');
const crypto = require('node:crypto');
const { chromium } = require('playwright');

(async () => {
  const original = fs.readFileSync('../Página web existente/5. Inferencia Estadística/0. Presentación.txt');
  assert.equal(crypto.createHash('sha256').update(original).digest('hex'), '2e61d377d29827b2e92c94e1ae4609fcfdeca28720e8db74db99e0131c08e75e');
  assert.equal(JSON.parse(fs.readFileSync('config/editorial.json')).pages.t09, 'partial');
  const base = 'http://127.0.0.1:4173/';
  const route = 'libro/temas/09-inferencia-estadistica/index.html';
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
      await page.goto(prefix + route + '#poblacion-muestra');
      await page.waitForFunction(() => document.querySelector('[data-topic-index] li')?.textContent.includes('Contenido parcial'));
      assert.equal(await page.locator('#muestreo dt').count(), 4);
      assert.equal(await page.locator('#ficha dt').count(), 5);
      assert.equal(await page.locator('[data-topic-index] li').count(), 10);
      assert.equal(await page.locator('[data-topic-index] a[href*="ejercicios-resueltos.html"]').count(), 1);
      assert.equal(await page.locator('[data-topic-index] a').evaluateAll(links => links.filter(link => /\/0[1-9]-[^/]+\.html$/.test(new URL(link.href).pathname)).length), 9);
      assert.equal(await page.locator('#poblacion-muestra svg title').count(), 1);
      assert.equal(await page.locator('#poblacion-muestra svg desc').count(), 1);
      await page.waitForFunction(() => !document.querySelector('main').innerText.includes('\\('));
      assert.equal(await page.locator('[data-mml-node="merror"]').count(), 0);
      assert.equal(await page.evaluate(() => document.documentElement.scrollWidth > innerWidth), false);
      await page.locator('a[href="#ficha"]').click();
      assert.equal(new URL(page.url()).hash, '#ficha');
    }
    await page.setViewportSize({ width: 390, height: 844 });
    await page.evaluate(() => document.documentElement.style.fontSize = '200%');
    assert.equal(await page.evaluate(() => document.documentElement.scrollWidth > innerWidth), false);
    const nojs = await browser.newContext({ javaScriptEnabled: false });
    const offline = await nojs.newPage();
    await offline.goto(base + route);
    assert.equal(await offline.locator('[data-topic-index] li').count(), 9);
    assert.equal(await offline.locator('#ficha').isVisible(), true);
    await nojs.close();
    assert.deepEqual(errors, []);
    console.log('PASS: fuente, tres bloques, ficha, MathJax, índice, raíz/subcarpeta, móvil 200 % y sin JS.');
  } finally { await browser.close(); }
})().catch(e => { console.error(e); process.exitCode = 1; });

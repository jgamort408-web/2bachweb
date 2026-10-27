const assert = require('node:assert/strict');
const fs = require('node:fs');
const crypto = require('node:crypto');
const { chromium } = require('playwright');

(async () => {
  const source = fs.readFileSync('../Página web existente/5. Inferencia Estadística/2. Estimación.txt');
  assert.equal(crypto.createHash('sha256').update(source).digest('hex'), '07f961b5d205d738ce1465a5ac25a04f1b0ade3dcf3d08ccac56034e58ac02b4');
  assert.equal(JSON.parse(fs.readFileSync('config/editorial.json')).pages['t09-e05'], 'partial');
  const base = 'http://127.0.0.1:4173/';
  const lesson = 'libro/temas/09-inferencia-estadistica/05-estimacion-puntual-y-estimacion-por-intervalos.html';
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
      await page.goto(prefix + lesson + '#confianza');
      await page.waitForFunction(() => !document.querySelector('main').innerText.includes('\\(') && !document.querySelector('main').innerText.includes('\\['));
      assert.equal(await page.locator('[data-mml-node="merror"]').count(), 0);
      assert.equal(await page.locator('#direccion dt').count(), 2);
      assert.equal(await page.locator('#criticos tbody tr').count(), 3);
      assert.deepEqual(await page.locator('#criticos tbody tr td:last-child').allTextContents(), ['1,645', '1,960', '2,576']);
      assert.equal(await page.locator('#confianza svg title').count(), 1);
      assert.equal(await page.locator('#confianza svg desc').count(), 1);
      assert.match(await page.locator('#confianza').innerText(), /aproximadamente el 95 %/);
      assert.match(await page.locator('#media').innerText(), /desconocida/);
      assert.equal(await page.evaluate(() => document.documentElement.scrollWidth > innerWidth), false);
      await page.locator('a[href="#media"]').click();
      assert.equal(new URL(page.url()).hash, '#media');
      await page.goto(prefix + 'libro/temas/09-inferencia-estadistica/index.html#recorrido');
      await page.waitForFunction(() => document.querySelector('[data-topic-index] li')?.textContent);
      assert.equal(await page.locator('[data-topic-index] li').count(), 10);
      assert.equal(await page.locator('[data-topic-index] li').filter({ hasText: 'Contenido parcial' }).count(), 9);
    }
    await page.goto(base + lesson);
    await page.setViewportSize({ width: 390, height: 844 });
    await page.evaluate(() => document.documentElement.style.fontSize = '200%');
    assert.equal(await page.evaluate(() => document.documentElement.scrollWidth > innerWidth), false);
    const nojs = await browser.newContext({ javaScriptEnabled: false });
    const offline = await nojs.newPage();
    await offline.goto(base + lesson);
    assert.equal(await offline.locator('#criticos tbody tr').count(), 3);
    await nojs.close();
    assert.deepEqual(errors, []);
    console.log('PASS: fuente, distinción de intervalos, tres valores críticos, MathJax, índice, rutas, móvil y sin JS.');
  } finally { await browser.close(); }
})().catch(e => { console.error(e); process.exitCode = 1; });

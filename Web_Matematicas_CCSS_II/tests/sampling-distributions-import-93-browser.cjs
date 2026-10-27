const assert = require('node:assert/strict');
const fs = require('node:fs');
const crypto = require('node:crypto');
const { chromium } = require('playwright');

(async () => {
  const original = fs.readFileSync('../Página web existente/5. Inferencia Estadística/1. Distribuciones muestrales.txt');
  assert.equal(crypto.createHash('sha256').update(original).digest('hex'), '019af2bc0e8f7f5f388715c2bba19df312bf437c8d2ee7f3f092506b5b387b8c');
  assert.equal(JSON.parse(fs.readFileSync('config/editorial.json')).pages['t09-e04'], 'partial');
  const base = 'http://127.0.0.1:4173/';
  const lesson = 'libro/temas/09-inferencia-estadistica/04-distribucion-muestral-teorema-central-del-limite.html';
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
      await page.goto(prefix + lesson + '#medias');
      await page.waitForFunction(() => !document.querySelector('main').innerText.includes('\\(') && !document.querySelector('main').innerText.includes('\\['));
      assert.equal(await page.locator('[data-mml-node="merror"]').count(), 0);
      assert.equal(await page.locator('#resumen tbody tr').count(), 4);
      assert.equal(await page.locator('#medias svg title').count(), 1);
      assert.equal(await page.locator('#medias svg desc').count(), 1);
      assert.match(await page.locator('#medias').innerText(), /no una garantía universal/);
      assert.match(await page.locator('#proporciones').innerText(), /orientación/);
      assert.equal(await page.evaluate(() => document.documentElement.scrollWidth > innerWidth), false);
      await page.locator('a[href="#resumen"]').click();
      assert.equal(new URL(page.url()).hash, '#resumen');
      await page.goto(prefix + 'libro/temas/09-inferencia-estadistica/index.html#recorrido');
      await page.waitForFunction(() => document.querySelector('[data-topic-index] li')?.textContent);
      assert.equal(await page.locator('[data-topic-index] li').count(), 9);
      assert.match(await page.locator('[data-topic-index]').innerText(), /Contenido parcial/);
    }
    await page.goto(base + lesson);
    await page.setViewportSize({ width: 390, height: 844 });
    await page.evaluate(() => document.documentElement.style.fontSize = '200%');
    assert.equal(await page.evaluate(() => document.documentElement.scrollWidth > innerWidth), false);
    const nojs = await browser.newContext({ javaScriptEnabled: false });
    const offline = await nojs.newPage();
    await offline.goto(base + lesson);
    assert.equal(await offline.locator('#resumen tbody tr').count(), 4);
    await nojs.close();
    assert.deepEqual(errors, []);
    console.log('PASS: fuente, medias/proporciones/sumas, tabla, MathJax, índice, rutas, móvil y sin JS.');
  } finally { await browser.close(); }
})().catch(e => { console.error(e); process.exitCode = 1; });

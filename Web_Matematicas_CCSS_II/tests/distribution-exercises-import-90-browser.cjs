const assert = require('node:assert/strict');
const fs = require('node:fs');
const crypto = require('node:crypto');
const { chromium } = require('playwright');

const base = 'http://127.0.0.1:4173/';
const lesson = 'libro/temas/08-distribuciones-de-probabilidad/index.html#ejercicios';

(async () => {
  const source = fs.readFileSync('../Página web existente/4. Distribuciones/5. Ejercicios Resueltos.txt');
  assert.equal(crypto.createHash('sha256').update(source).digest('hex'), '2e133ff691c234d27ef6ad80b5000bc6a91d20412879939e71c567724a610d54');
  const lessonSource = fs.readFileSync(lesson.split('#')[0], 'utf8');
  for (const value of ['0{,}1316', '0{,}3233', '0{,}8405', '0{,}0402', '0{,}1138', '0{,}9333']) assert.ok(lessonSource.includes(value), value);
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
      await page.goto(prefix + lesson);
      await page.locator('[data-exercise-controls]:not([hidden])').waitFor();
      assert.equal(await page.locator('[data-exercise]').count(), 21);
      assert.equal(await page.locator('[data-exercise-select] option').count(), 22);
      assert.equal(await page.locator('[data-exercise]:visible').count(), 1);
      await page.locator('[data-exercise-select]').selectOption('all');
      assert.equal(await page.locator('[data-exercise]:visible').count(), 21);
      for (const details of await page.locator('details[data-solution]').all()) await details.evaluate(e => e.open = true);
      await page.waitForFunction(() => !document.querySelector('main').innerText.includes('\\['));
      assert.equal(await page.locator('[data-mml-node="merror"]').count(), 0);
      await page.locator('[data-exercise-select]').selectOption('19');
      assert.equal(await page.locator('[data-exercise]:visible').count(), 1);
      assert.equal(await page.locator('#ejercicio-19').isVisible(), true);
      await page.goto(prefix + 'libro/temas/08-distribuciones-de-probabilidad/index.html#ejercicio-3');
      await page.locator('[data-exercise-controls]:not([hidden])').waitFor();
      assert.equal(await page.locator('#ejercicio-3').isVisible(), true);
      assert.equal(await page.locator('[data-exercise]:visible').count(), 1);
      assert.equal(await page.evaluate(() => document.documentElement.scrollWidth > innerWidth), false);
    }
    await page.setViewportSize({ width: 390, height: 844 });
    await page.evaluate(() => document.documentElement.style.fontSize = '200%');
    await page.locator('[data-exercise-select]').selectOption('all');
    assert.equal(await page.evaluate(() => document.documentElement.scrollWidth > innerWidth), false);
    const nojs = await browser.newContext({ javaScriptEnabled: false });
    const offline = await nojs.newPage();
    await offline.goto(base + lesson);
    assert.equal(await offline.locator('[data-exercise]').count(), 21);
    assert.equal(await offline.locator('[data-exercise]').first().isVisible(), true);
    await nojs.close();
    assert.deepEqual(errors, []);
    console.log('PASS: 21 ejercicios, correcciones, MathJax, filtro, anclas, raíz/subcarpeta, móvil y sin JS.');
  } finally { await browser.close(); }
})().catch(e => { console.error(e); process.exitCode = 1; });


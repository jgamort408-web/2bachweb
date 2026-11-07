const assert = require('node:assert/strict');
const { chromium } = require('playwright');

// P01 · Biblioteca de exámenes: búsqueda y filtros, enlaces a los PDF, raíz y subcarpeta, móvil al 200 % y sin JS.
(async () => {
  const base = 'http://127.0.0.1:4173/';
  const route = 'examenes/index.html';
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
      const status = page.locator('[data-exam-status]');
      await page.waitForFunction(() => document.querySelector('[data-exam-status]')?.textContent);
      assert.equal(await status.textContent(), '24 exámenes con sus soluciones.');
      assert.equal(await page.locator('[data-exam-card]:visible').count(), 24);
      // Búsqueda sin tildes: «tamano» encuentra «Tamaño muestral».
      await page.locator('[data-exam-search]').fill('tamano muestral');
      assert.equal(await status.textContent(), '4 de 24 exámenes.');
      await page.locator('[data-exam-search]').fill('Bayes');
      assert.equal(await page.locator('[data-exam-card]:visible').count(), 2);
      await page.locator('[data-exam-search]').fill('');
      await page.locator('[data-exam-topic]').selectOption('t09');
      await page.locator('[data-exam-type]').selectOption('recuperacion');
      assert.equal(await status.textContent(), '1 de 24 exámenes.');
      // Los bloques sin resultados desaparecen.
      assert.equal(await page.locator('[data-exam-group]:visible').count(), 1);
      await page.locator('[data-exam-search]').fill('zzz');
      assert.match(await status.textContent(), /Ningún examen coincide/);
      await page.locator('[data-exam-type]').selectOption('');
      await page.locator('[data-exam-topic]').selectOption('');
      await page.locator('[data-exam-search]').fill('');
      // Examen y soluciones son dos acciones separadas y sus PDF existen.
      const card = page.locator('[data-exam-card]').filter({ hasText: 'Probabilidad I' }).first();
      for (const name of [/^Examen/, /^Soluciones/]) {
        const href = await card.getByRole('link', { name }).getAttribute('href');
        const response = await page.request.get(new URL(href, page.url()).href.replace(prefix, base));
        assert.equal(response.status(), 200);
        assert.equal(response.headers()['content-type'], 'application/pdf');
      }
    }
    await page.goto(base + route + '?tema=t07');
    await page.waitForFunction(() => document.querySelector('[data-exam-status]')?.textContent);
    assert.equal(await page.locator('[data-exam-card]:visible').count(), 2);
    await page.setViewportSize({ width: 320, height: 844 });
    await page.evaluate(() => document.documentElement.style.fontSize = '200%');
    assert.equal(await page.evaluate(() => document.documentElement.scrollWidth > innerWidth), false);
    const nojs = await browser.newContext({ javaScriptEnabled: false });
    const offline = await nojs.newPage();
    await offline.goto(base + route);
    assert.equal(await offline.locator('[data-exam-card]').count(), 24);
    assert.equal(await offline.locator('[data-exam-filters]').isVisible(), false);
    await nojs.close();
    assert.deepEqual(errors, []);
    console.log('PASS: 24 exámenes, búsqueda sin tildes, filtros por tema y tipo, PDF separados, raíz/subcarpeta, ?tema, móvil 200 % y sin JS.');
  } finally { await browser.close(); }
})().catch(e => { console.error(e); process.exitCode = 1; });

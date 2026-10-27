const assert = require('node:assert/strict');
const fs = require('node:fs');
const crypto = require('node:crypto');
const { chromium } = require('playwright');

(async () => {
  const source = fs.readFileSync('../Página web existente/4. Distribuciones/6. Flashcards.txt');
  assert.equal(crypto.createHash('sha256').update(source).digest('hex'), 'e67fbb789f3e5c8afd199a71e542d275cbcaa5a3b76d9b9ad7f08b3fc4d11a2a');
  const { distributionCards } = await import('../content/activities/distribution-cards.js');
  const { flashcards, questions } = await import('../content/activities/catalog.js');
  assert.equal(distributionCards.length, 19);
  assert.deepEqual(Object.fromEntries([...new Set(distributionCards.map(c => c.category))].map(name => [name, distributionCards.filter(c => c.category === name).length])), { Conceptos: 3, Binomial: 4, Normal: 3, Tipificación: 5, Aproximación: 4 });
  assert.equal(flashcards.length,(await import('./helpers/catalog-expectations.mjs')).expectedCatalog.cards);
  assert.equal(questions.length,(await import('./helpers/catalog-expectations.mjs')).expectedCatalog.questions);
  assert.equal(new Set(flashcards.map(c => c.id)).size, 405);
  assert.ok(distributionCards.every(c => c.topicId === 't08' && c.front && c.back));
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
      for (const route of ['libro/temas/08-distribuciones-de-probabilidad/index.html#tarjetas', 'tarjetas/index.html?tema=t08']) {
        await page.goto(prefix + route);
        await page.waitForFunction(() => document.querySelector('[data-flashcards] [data-content-role="activity-progress"]')?.textContent.includes('de 19'));
        assert.equal(await page.locator('[data-card-category] option').count(), 6);
        await page.locator('[data-flashcards] button').nth(1).click();
        await page.waitForFunction(() => document.querySelector('[data-flashcards] [data-content-role="flashcard-back"]'));
        assert.equal(await page.locator('[data-mml-node="merror"]').count(), 0);
        await page.locator('[data-card-category]').selectOption('Aproximación');
        await page.waitForFunction(() => document.querySelector('[data-flashcards] [data-content-role="activity-progress"]')?.textContent.includes('de 4'));
        await page.locator('[data-flashcards] button').last().focus();
        await page.keyboard.press('Enter');
        await page.waitForFunction(() => document.querySelector('[data-flashcards] [data-content-role="activity-progress"]')?.textContent.includes('Tarjeta 2 de 4'));
        assert.equal(await page.evaluate(() => document.documentElement.scrollWidth > innerWidth), false);
      }
    }
    await page.goto(base + 'tarjetas/index.html?tema=t08');
    await page.waitForFunction(() => document.querySelector('[data-flashcards] [data-content-role="activity-progress"]')?.textContent.includes('de 19'));
    for (let index = 1; index <= 19; index++) {
      await page.locator('[data-flashcards] button').nth(1).click();
      await page.waitForFunction(index => document.querySelector('[data-flashcards] [data-content-role="activity-progress"]')?.textContent.includes('Tarjeta ' + index + ' de 19') && !!document.querySelector('[data-flashcards] [data-content-role="flashcard-back"]'), index);
      assert.equal(await page.locator('[data-mml-node="merror"]').count(), 0);
      if (index < 19) await page.locator('[data-flashcards] button').last().click();
    }
    await page.setViewportSize({ width: 390, height: 844 });
    await page.evaluate(() => document.documentElement.style.fontSize = '200%');
    assert.equal(await page.evaluate(() => document.documentElement.scrollWidth > innerWidth), false);
    await page.reload();
    await page.waitForFunction(() => document.querySelector('[data-flashcards] [data-content-role="activity-progress"]')?.textContent.includes('de 19'));
    assert.equal(await page.locator('[data-card-category]').inputValue(), '');
    assert.deepEqual(errors, []);
    console.log('PASS: fuente, 19 tarjetas, cinco categorías, 405 totales, MathJax, filtros, teclado, raíz/subcarpeta, móvil y recarga.');
  } finally { await browser.close(); }
})().catch(e => { console.error(e); process.exitCode = 1; });



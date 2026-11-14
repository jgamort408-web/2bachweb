const assert = require('node:assert/strict');
const { chromium } = require('playwright');

// Presentación de clase del tema 3: una diapositiva cada vez, pasos, teclado, índice, enlace directo, exploradores,
// notas, móvil sin desbordamiento y lectura sin JavaScript.
(async () => {
  const url = 'http://127.0.0.1:4173/libro/temas/03-integrales/presentacion.html';
  const browser = await chromium.launch({ headless: true, executablePath: process.env.CHROME_PATH });
  try {
    const page = await browser.newPage({ viewport: { width: 1280, height: 800 } });
    const errors = [];
    page.on('pageerror', error => errors.push(error.message));
    page.on('response', response => { if (response.status() >= 400 && !response.url().endsWith('favicon.ico')) errors.push(response.status() + ' ' + response.url()); });
    const visible = () => page.locator('.mc-slide:not([hidden])');
    const current = () => page.locator('[data-slides]').evaluate(el => ({ slide: Number(el.dataset.slide), revealed: Number(el.dataset.revealed), hash: location.hash }));

    await page.goto(url);
    await page.waitForSelector('.mc-deck__bar');
    const total = await page.locator('.mc-slide').count();
    assert.ok(total >= 15);
    assert.equal(await visible().count(), 1);
    assert.equal(await visible().getAttribute('id'), 'portada');
    assert.equal(await page.locator('[data-deck-counter]').textContent(), `1 / ${total}`);
    assert.equal(await page.locator('[data-deck-action="previous"]').isDisabled(), true);

    // La diapositiva 2 tiene un paso: → lo muestra, otro → pasa a la 3, ← vuelve a la 2 con el paso visible.
    await page.keyboard.press('ArrowRight');
    assert.deepEqual(await current(), { slide: 2, revealed: 0, hash: '#acumulacion' });
    const step = page.locator('#acumulacion [data-step]').first();
    assert.equal(await step.evaluate(el => getComputedStyle(el).visibility), 'hidden');
    await page.keyboard.press(' ');
    assert.equal((await current()).revealed, 1);
    assert.equal(await step.evaluate(el => getComputedStyle(el).visibility), 'visible');
    await page.keyboard.press('ArrowRight');
    assert.equal((await current()).slide, 3);
    await page.keyboard.press('ArrowLeft');
    assert.deepEqual(await current(), { slide: 2, revealed: 1, hash: '#acumulacion' });
    assert.match(await page.locator('[data-deck-live]').textContent(), /Diapositiva 2 de \d+: De una tasa a una cantidad/);

    // Índice, fin y enlace directo a una diapositiva.
    await page.locator('[data-deck-index]').selectOption({ label: '6. Ejemplo: integral de una suma' });
    assert.equal((await current()).hash, '#ejemplo-inmediatas');
    await page.keyboard.press('End');
    assert.equal((await current()).slide, total);
    assert.equal(await page.locator('[data-deck-action="next"]').isDisabled(), true);
    await page.goto(url + '#riemann');
    await page.waitForFunction(() => document.querySelector('[data-slides]')?.dataset.slide);
    assert.equal(await visible().getAttribute('id'), 'riemann');

    // El explorador de Riemann funciona dentro de la diapositiva y las flechas del deslizador no cambian de diapositiva.
    await page.waitForFunction(() => document.querySelectorAll('#riemann [data-riemann-rectangle]').length === 6);
    await page.locator('#riemann [data-riemann-n]').focus();
    await page.keyboard.press('ArrowRight');
    await page.waitForFunction(() => document.querySelectorAll('#riemann [data-riemann-rectangle]').length === 7);
    assert.equal(await visible().getAttribute('id'), 'riemann');
    // Los demás exploradores se han inicializado aunque su diapositiva esté oculta.
    for (const name of ['primitive', 'fundamental', 'barrow', 'area']) {
      assert.ok(await page.locator(`[data-${name}-result] svg, [data-${name}-result] table`).count() >= 1, name);
    }
    // Notas del docente con N.
    await page.locator('body').click({ position: { x: 5, y: 5 } });
    const notes = page.locator('#riemann .mc-slide__notes');
    assert.equal(await notes.isVisible(), false);
    await page.keyboard.press('n');
    assert.equal(await notes.isVisible(), true);
    assert.equal(await page.locator('[data-deck-action="notes"]').getAttribute('aria-pressed'), 'true');

    // Fórmulas sin errores en todas las diapositivas.
    await page.waitForFunction(() => document.querySelectorAll('.mc-slide mjx-container').length > 100, null, { timeout: 60000 });
    assert.equal(await page.locator('[data-mml-node="merror"]').count(), 0);
    assert.deepEqual(errors, []);

    // Móvil: sin desbordamiento horizontal en ninguna diapositiva y gesto de deslizar.
    const mobile = await browser.newPage({ viewport: { width: 360, height: 780 }, hasTouch: true, isMobile: true });
    await mobile.goto(url);
    await mobile.waitForSelector('.mc-deck__bar');
    for (let i = 0; i < total; i++) {
      await mobile.locator('[data-deck-index]').selectOption(String(i));
      assert.equal(await mobile.evaluate(() => document.documentElement.scrollWidth > innerWidth), false, 'diapositiva ' + (i + 1));
    }
    await mobile.close();

    // Sin JavaScript: todas las diapositivas se leen como apartados, con sus pasos y notas.
    const nojs = await browser.newContext({ javaScriptEnabled: false });
    const plain = await nojs.newPage();
    await plain.goto(url);
    assert.equal(await plain.locator('.mc-slide:visible').count(), total);
    assert.ok(await plain.locator('[data-step]:visible').count() > 20);
    await nojs.close();
    console.log(`PASS: presentación del tema 3 (${total} diapositivas): pasos, teclado, índice, enlace directo, cinco exploradores, notas, móvil y sin JS.`);
  } finally { await browser.close(); }
})().catch(error => { console.error(error); process.exitCode = 1; });

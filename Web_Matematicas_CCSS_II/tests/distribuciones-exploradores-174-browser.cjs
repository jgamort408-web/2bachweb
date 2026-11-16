const assert = require('node:assert/strict');
const { chromium } = require('playwright');

// Tema 8: exploradores de distribución discreta (8.1) y binomial (8.2); práctica y tarjetas en 8.1–8.4.
(async () => {
  const base = (process.env.TEST_URL || 'http://127.0.0.1:4173/') + 'libro/temas/08-distribuciones-de-probabilidad/';
  const browser = await chromium.launch({ headless: true, executablePath: process.env.CHROME_PATH });
  try {
    const page = await browser.newPage({ viewport: { width: 1280, height: 960 } });
    const errors = [];
    page.on('pageerror', e => errors.push(e.message));
    page.on('response', r => { if (r.status() >= 400 && !r.url().endsWith('favicon.ico')) errors.push(r.status() + ' ' + r.url()); });
    const math = async () => {
      await page.waitForFunction(() => document.querySelector('.math-status')?.hidden && !/\\[\[(]/.test(document.querySelector('main').innerText));
      assert.equal(await page.locator('[data-mml-node="merror"]').count(), 0);
      assert.equal(await page.evaluate(() => document.documentElement.scrollWidth > innerWidth), false);
    };
    const data = selector => page.locator(selector).evaluate(el => ({ ...el.dataset }));
    const fill = async (selector, value) => { const input = page.locator(selector); await input.fill(value); await input.press('Tab'); };

    // 8.1 · Distribución discreta
    await page.goto(base + '01-variable-aleatoria.html#explorador-propio');
    await page.locator('[data-discrete-output] mjx-container').first().waitFor(); await math();
    assert.deepEqual(await data('[data-discrete-output]'), { discreteOutput: '', valid: 'true', problems: '', mean: '7/2', variance: '35/12' });
    assert.equal(await page.locator('[data-discrete-explorer] [data-bar]').count(), 6);
    await page.locator('[data-discrete-preset]').selectOption('raffle'); await math();
    assert.equal((await data('[data-discrete-output]')).mean, '−9/20');
    await page.locator('[data-discrete-preset]').selectOption('invalid'); await math();
    assert.deepEqual(await data('[data-discrete-output]'), { discreteOutput: '', valid: 'false', problems: 'sum', mean: '', variance: '' });
    assert.match(await page.locator('[data-discrete-output]').innerText(), /no suman 1/);
    // Distribución propia: 0, 1, 2 con 1/4, 1/2, 1/4.
    await fill('[data-discrete-probability="0"]', '1/4'); await fill('[data-discrete-value="2"]', '2'); await fill('[data-discrete-probability="2"]', '1/4');
    await fill('[data-discrete-probability="1"]', '0,5'); await math();
    assert.equal(await page.locator('[data-discrete-preset]').inputValue(), 'custom');
    assert.deepEqual(await data('[data-discrete-output]'), { discreteOutput: '', valid: 'true', problems: '', mean: '1', variance: '1/2' });
    await fill('[data-discrete-value="3"]', 'abc'); await fill('[data-discrete-probability="3"]', '0');
    assert.equal(await page.locator('[data-discrete-value="3"]').getAttribute('aria-invalid'), 'true');
    assert.match(await page.locator('[data-discrete-status]').innerText(), /formato no válido/);

    // 8.2 · Binomial
    await page.goto(base + '02-distribucion-binomial.html#explorador-propio');
    await page.locator('[data-binomial-output] mjx-container').first().waitFor(); await math();
    assert.deepEqual(await data('[data-binomial-output]'), { binomialOutput: '', probability: '0,20480', count: '1', mean: '4' });
    for (const [key, probability, count] of [['atMostTwo', '0,05792', '3'], ['atLeastThree', '0,94208', '3'], ['between', '0,66560', '3'], ['coins', '0,05469', '3']]) {
      await page.locator('[data-binomial-preset]').selectOption(key); await math();
      const d = await data('[data-binomial-output]'); assert.equal(d.probability, probability, key); assert.equal(d.count, count, key);
      assert.equal(await page.locator('[data-binomial-explorer] [data-included]').count(), Number(count), key);
    }
    // Valores propios: B(20; 1/3), al menos 1 → 1 − (2/3)^20.
    await fill('[data-binomial-field="n"]', '20'); await fill('[data-binomial-field="p"]', '1/3');
    await page.locator('[data-binomial-event]').selectOption('ge'); await fill('[data-binomial-field="k"]', '1'); await math();
    assert.equal((await data('[data-binomial-output]')).probability, '0,99970');
    assert.match(await page.locator('[data-binomial-output]').innerText(), /fracciones exactas/);
    await fill('[data-binomial-field="p"]', '1,2');
    assert.equal(await page.locator('[data-binomial-field="p"]').getAttribute('aria-invalid'), 'true');
    assert.match(await page.locator('[data-binomial-status]').innerText(), /p entre 0 y 1/);

    // Las cuatro lecciones: práctica y tarjetas; 320 px sin desbordamiento.
    await page.setViewportSize({ width: 320, height: 800 });
    for (const [file, quiz, cards] of [['01-variable-aleatoria.html', 't08-e01', 5], ['02-distribucion-binomial.html', 't08-e02', 4], ['03-distribucion-normal.html', 't08-e03', 9], ['04-aproximacion-de-la-distribucion-binomial-a-la-distribucion-normal.html', 't08-e04', 4]]) {
      await page.goto(base + file); await page.locator(`[data-quiz="${quiz}"] input[type="radio"]`).first().waitFor(); await math();
      assert.match(await page.locator('[data-flashcards]').innerText(), new RegExp(`de ${cards}\\b`), file);
      assert.equal(await page.locator('#pendiente').count(), 0, file);
    }
    assert.deepEqual(errors, []);
    console.log('PASS: distribución discreta y binomial con los ejemplos de la lección, distribución propia, entradas inválidas; práctica y tarjetas en 8.1–8.4; 320 px.');
  } finally { await browser.close(); }
})().catch(error => { console.error(error); process.exitCode = 1; });

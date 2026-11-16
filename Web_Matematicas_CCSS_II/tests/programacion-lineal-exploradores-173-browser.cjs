const assert = require('node:assert/strict');
const { chromium } = require('playwright');

// Tema 6: exploradores de semiplano (6.1), región factible (6.2) y función objetivo (6.4), práctica y tarjetas.
(async () => {
  const base = (process.env.TEST_URL || 'http://127.0.0.1:4173/') + 'libro/temas/06-programacion-lineal/';
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

    // 6.1 · Semiplano
    await page.goto(base + '01-inecuaciones-lineales-con-dos-incognitas.html#explorador');
    await page.locator('[data-half-plane-output] mjx-container').first().waitFor(); await math();
    assert.deepEqual(await data('[data-half-plane-output]'), { halfPlaneOutput: '', kind: 'oblique', boundary: 'included', holds: 'true', point: 'true' });
    await page.locator('[data-half-plane-preset]').selectOption('horizontal'); await math();
    assert.equal((await data('[data-half-plane-output]')).boundary, 'excluded');
    assert.equal(await page.locator('[data-half-plane-boundary="excluded"]').getAttribute('stroke-dasharray'), '10 7');
    await fill('[data-half-plane-point="x"]', '2'); await fill('[data-half-plane-point="y"]', '-2'); await math();
    assert.equal((await data('[data-half-plane-output]')).point, 'false');
    assert.match(await page.locator('[data-half-plane-check]').innerText(), /frontera, que no se incluye/);
    await page.locator('[data-half-plane-preset]').selectOption('origin'); await math();
    assert.match(await page.locator('[data-half-plane-output]').innerText(), /El origen está en la frontera/);
    assert.equal(await page.locator('[data-half-plane-explorer] [data-test-point]').count(), 1);
    // Inecuación propia: 3x − y ≥ 6, el origen no cumple y se sombrea el otro lado.
    await fill('[data-coefficient="a"]', '3'); await fill('[data-coefficient="b"]', '−1'); await fill('[data-coefficient="c"]', '6');
    await page.locator('[data-operator]').selectOption('>='); await math();
    assert.equal(await page.locator('[data-half-plane-preset]').inputValue(), 'custom');
    assert.deepEqual(await data('[data-half-plane-output]'), { halfPlaneOutput: '', kind: 'oblique', boundary: 'included', holds: 'false', point: 'true' }); // (2,−2): 3·2+2=8≥6
    await fill('[data-coefficient="a"]', '0'); await fill('[data-coefficient="b"]', '0');
    assert.equal(await page.locator('[data-coefficient="b"]').getAttribute('aria-invalid'), 'true');
    assert.match(await page.locator('[data-half-plane-status]').innerText(), /no pueden ser ambos 0/);
    assert.equal(await page.locator('[data-quiz="t06-e01"] input[type="radio"]').count() >= 4, true);

    // 6.2 · Región factible
    await page.goto(base + '02-sistemas-de-inecuaciones-lineales-con-dos-incognitas.html#explorador');
    await page.locator('[data-region-output] mjx-container').first().waitFor(); await math();
    assert.equal((await data('[data-region-output]')).kind, 'polygon');
    assert.deepEqual(await page.locator('[data-region-explorer] [data-vertex]').evaluateAll(n => n.map(v => v.dataset.vertex)), ['A', 'B', 'C', 'D']);
    await page.locator('[data-region-constraint="1"]').uncheck(); await math();
    assert.deepEqual(await data('[data-region-output]'), { regionOutput: '', kind: 'polygon', vertices: '3', point: 'true' });
    await page.locator('[data-region-constraint="1"]').check(); await math();
    for (const [key, kind, vertices] of [['empty', 'empty', '0'], ['segment', 'segment', '2'], ['point', 'point', '1'], ['unbounded', 'unbounded', '2']]) {
      await page.locator('[data-region-preset]').selectOption(key); await math();
      const d = await data('[data-region-output]'); assert.equal(d.kind, kind, key); assert.equal(d.vertices, vertices, key);
    }
    assert.equal(await page.locator('[data-feasible-region]').count(), 1);
    await page.locator('[data-region-preset]').selectOption('segment'); await math();
    assert.equal(await page.locator('[data-feasible-segment]').count(), 1);
    await fill('[data-region-point="x"]', '1'); await fill('[data-region-point="y"]', '3'); await math();
    assert.equal((await data('[data-region-output]')).point, 'true');
    await fill('[data-region-point="x"]', '1/2'); await fill('[data-region-point="y"]', '3'); await math();
    assert.equal((await data('[data-region-output]')).point, 'false');

    // 6.4 · Función objetivo
    await page.goto(base + '04-solucion-de-un-problema-de-programacion-lineal.html#explorador');
    await page.locator('[data-objective-output] mjx-container').first().waitFor(); await math();
    assert.deepEqual(await data('[data-objective-output]'), { objectiveOutput: '', kind: 'unique', best: '450', optimal: '1' });
    assert.equal(await page.locator('[data-objective-output] tr[data-optimal]').count(), 1);
    assert.equal(await page.locator('[data-level-line]').count(), 1);
    await fill('[data-objective-coefficient="p"]', '50'); await math();
    assert.deepEqual(await data('[data-objective-output]'), { objectiveOutput: '', kind: 'multiple', best: '450', optimal: '2' });
    await page.locator('[data-objective-preset]').selectOption('unbounded'); await math();
    assert.equal((await data('[data-objective-output]')).kind, 'unbounded');
    await page.locator('[data-objective-sense]').selectOption('min'); await math();
    assert.deepEqual(await data('[data-objective-output]'), { objectiveOutput: '', kind: 'multiple', best: '2', optimal: '2' });
    await page.locator('[data-objective-preset]').selectOption('empty'); await math();
    assert.equal((await data('[data-objective-output]')).kind, 'empty');
    assert.equal(await page.locator('[data-level-line]').count(), 0);
    await fill('[data-objective-coefficient="q"]', '1,5');
    assert.equal(await page.locator('[data-objective-coefficient="q"]').getAttribute('aria-invalid'), 'true');

    // Las cinco lecciones: práctica y tarjetas; 320 px sin desbordamiento.
    await page.setViewportSize({ width: 320, height: 800 });
    for (const [file, quiz, cards] of [['01-inecuaciones-lineales-con-dos-incognitas.html', 't06-e01', 2], ['02-sistemas-de-inecuaciones-lineales-con-dos-incognitas.html', 't06-e02', 2], ['03-programacion-lineal.html', 't06-e03', 8], ['04-solucion-de-un-problema-de-programacion-lineal.html', 't06-e04', 7], ['05-problemas-de-programacion-lineal.html', 't06-e05', 19]]) {
      await page.goto(base + file); await page.locator(`[data-quiz="${quiz}"] input[type="radio"]`).first().waitFor(); await math();
      assert.match(await page.locator('[data-flashcards]').innerText(), new RegExp(`de ${cards}\\b`));
      assert.equal(await page.locator('#pendiente').count(), 0);
    }
    assert.deepEqual(errors, []);
    console.log('PASS: semiplano, región factible y función objetivo con casos de la lección, entradas inválidas, restricciones activables; práctica y tarjetas en las cinco lecciones; 320 px.');
  } finally { await browser.close(); }
})().catch(error => { console.error(error); process.exitCode = 1; });

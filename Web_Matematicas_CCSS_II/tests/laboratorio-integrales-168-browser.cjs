const assert = require('node:assert/strict');
const { chromium } = require('playwright');

// Laboratorio de integrales (A Incluir): sumas de Riemann con una curva en 3.5 y ejemplos añadidos en 3.3, 3.4 y 3.7.
(async () => {
  const base = 'http://127.0.0.1:4173/libro/temas/03-integrales/';
  const browser = await chromium.launch({ headless: true, executablePath: process.env.CHROME_PATH });
  try {
    const page = await browser.newPage({ viewport: { width: 1200, height: 900 } });
    const errors = [];
    page.on('pageerror', error => errors.push(error.message));
    page.on('response', response => { if (response.status() >= 400 && !response.url().endsWith('favicon.ico')) errors.push(response.status() + ' ' + response.url()); });
    const mathReady = () => page.waitForFunction(() => document.querySelector('.math-status')?.hidden !== false || document.querySelector('.math-status').textContent === '', null, { timeout: 60000 });
    const state = async expected => {
      await page.waitForFunction(value => document.querySelector('[data-riemann-result]')?.dataset.selection === value, expected);
      await page.waitForFunction(() => document.querySelector('[data-riemann-result] mjx-container'));
      return page.locator('[data-riemann-result]').evaluate(el => ({ ...el.dataset }));
    };

    await page.goto(base + '05-integral-definida.html');
    let data = await state('increasing:left:6');
    assert.equal(data.direction, 'por defecto');
    assert.equal(await page.locator('[data-riemann-rectangle]').count(), 6);
    assert.match(await page.locator('[data-riemann-status]').textContent(), /6 rectángulos, extremo izquierdo/);
    // Extremo derecho: por exceso; función decreciente: al revés.
    await page.locator('[data-riemann-rule]').selectOption('right');
    assert.equal((await state('increasing:right:6')).direction, 'por exceso');
    await page.locator('[data-riemann-family]').selectOption('decreasing');
    assert.equal((await state('decreasing:right:6')).direction, 'por defecto');
    // El deslizador cambia el número de rectángulos y la suma se acerca al valor exacto.
    await page.locator('[data-riemann-n]').fill('100');
    data = await state('decreasing:right:100');
    assert.ok(Math.abs(Number(data.sum) - 16 / 3) < 0.05);
    assert.equal(await page.locator('[data-riemann-rectangle]').count(), 100);
    assert.equal(await page.locator('[data-riemann-n-value]').textContent(), '100');
    // El índice de la lección enlaza la sección nueva y la numeración sigue en orden.
    assert.ok(await page.locator('nav a[href="#riemann"]').count() >= 1);
    const headings = await page.locator('main h2').allTextContents();
    const numbers = headings.map(text => Number.parseInt(text, 10)).filter(Number.isFinite);
    assert.deepEqual(numbers, numbers.map((_, i) => i + 1));
    // El explorador anterior de la lección sigue funcionando.
    assert.ok(await page.locator('.definite-figure > svg').count() === 1);

    // Ejemplos añadidos: presentes y sin errores de fórmulas.
    for (const [file, heading] of [['03-integrales-casi-inmediatas.html', 'Una función interior cuadrática'],
      ['07-regla-de-barrow.html', 'Una primitiva casi inmediata y los límites'],
      ['04-metodos-de-integracion.html', null], ['05-integral-definida.html', 'Sumas de Riemann con una curva']]) {
      await page.goto(base + file);
      await page.waitForFunction(() => document.querySelectorAll('main mjx-container').length > 5, null, { timeout: 60000 });
      await mathReady();
      if (heading) assert.equal(await page.getByRole('heading', { name: heading }).count(), 1, file);
      assert.equal(await page.locator('[data-mml-node="merror"]').count(), 0, file);
    }
    await page.goto(base + '04-metodos-de-integracion.html');
    assert.match(await page.locator('details').filter({ hasText: 'Integración por partes' }).first().textContent(), /Un factor 1 implícito/);

    // Móvil al 200 % y lectura sin JavaScript (la tabla estática conserva los valores).
    await page.setViewportSize({ width: 320, height: 844 });
    await page.goto(base + '05-integral-definida.html');
    await state('increasing:left:6');
    await page.evaluate(() => document.documentElement.style.fontSize = '200%');
    assert.equal(await page.evaluate(() => document.documentElement.scrollWidth > innerWidth), false);
    assert.deepEqual(errors, []);
    const nojs = await browser.newContext({ javaScriptEnabled: false });
    const offline = await nojs.newPage();
    await offline.goto(base + '05-integral-definida.html');
    assert.match(await offline.locator('#riemann table').textContent(), /2,6666/);
    await nojs.close();
    console.log('PASS: sumas de Riemann (tres reglas, dos funciones, 1–100 rectángulos), ejemplos de 3.3, 3.4 y 3.7, móvil 200 % y sin JS.');
  } finally { await browser.close(); }
})().catch(error => { console.error(error); process.exitCode = 1; });

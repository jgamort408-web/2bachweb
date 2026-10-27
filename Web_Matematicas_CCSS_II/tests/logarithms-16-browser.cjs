const assert = require('node:assert/strict');
const { chromium } = require('playwright');
const base = process.env.TEST_URL || 'http://127.0.0.1:4173/';
const lesson = 'libro/temas/02-representacion-de-funciones/05-funciones-logaritmicas.html';
(async () => {
  const browser = await chromium.launch({ headless: true, ...(process.env.CHROME_PATH ? { executablePath: process.env.CHROME_PATH } : {}) });
  const errors = [];
  try {
    const page = await browser.newPage({ viewport: { width: 390, height: 844 } });
    page.on('pageerror', e => errors.push(e.message));
    page.on('response', r => { if (r.status() >= 400 && !r.url().endsWith('favicon.ico')) errors.push(r.status() + ' ' + r.url()); });
    const ready = async () => {
      await page.waitForFunction(() => document.querySelector('.math-status')?.hidden === true);
      assert.equal(await page.locator('[data-mml-node="merror"]').count(), 0);
      assert.equal(await page.evaluate(() => document.documentElement.scrollWidth <= innerWidth), true, page.url());
    };
    const selectionReady = async selection => {
      await page.waitForFunction(selection => {
        const result = document.querySelector('[data-logarithmic-result]');
        return result?.dataset.selection === selection && result.querySelector('mjx-container') && !/\\\[|\\\(/.test(result.textContent);
      }, selection);
      await ready();
    };
    await page.goto(base + lesson); await ready();
    const quiz = page.locator('[data-quiz]');
    await quiz.locator('input[value="right"]').check();
    for (const a of [2, 0.5]) for (const c of [1, -1]) for (const h of [-1, 0, 1]) for (const k of [0, -1]) {
      await page.locator('[data-log-base]').selectOption(String(a));
      await page.locator('[data-log-coefficient]').selectOption(String(c));
      await page.locator('[data-log-horizontal]').selectOption(String(h));
      await page.locator('[data-log-vertical]').selectOption(String(k));
      await selectionReady([a, c, h, k].join(':'));
      const rows = await page.locator('[data-logarithmic-result] tbody tr').all();
      for (let i = 0; i < 5; i++) {
        const values = (await rows[i].locator('td').allTextContents()).map(s => Number(s.replace(',', '.')));
        assert.equal(values[0], 2 ** (i - 2)); assert.equal(values[1], h + values[0]);
        assert.ok(Math.abs(values[2] - (c * (i - 2) * (a === 2 ? 1 : -1) + k)) < 1e-8);
      }
      assert.match(await page.locator('[data-logarithmic-status]').innerText(), (c / Math.log(a) > 0) ? /creciente/ : /decreciente/);
      const curve = await page.locator('[data-log-curve]').getAttribute('d');
      assert.equal(curve.match(/M/g).length, 1); assert.equal(curve.includes('NaN'), false);
      // Todo punto de la curva debe quedar a la derecha de la frontera excluida.
      for (const point of curve.split(/[ML]/).filter(Boolean)) assert.ok(Number(point.split(' ')[0]) > 130 + 50 * h);
      assert.equal(Number(await page.locator('.logarithmic-figure circle').getAttribute('cx')), 130 + 50 * (h + 1));
    }
    assert.equal(await quiz.locator('input[value="right"]').isChecked(), true);
    await page.evaluate(() => {
      const control = document.querySelector('[data-log-base]');
      for (const value of ['2', '0.5', '2', '0.5', '2']) { control.value = value; control.dispatchEvent(new Event('change', { bubbles: true })); }
    });
    await selectionReady('2:-1:1:-1');
    await page.locator('[data-log-base]').focus(); await page.keyboard.press('Home'); await page.keyboard.press('ArrowDown');
    await selectionReady('0.5:-1:1:-1');
    await page.locator('[data-log-base]').selectOption('2'); await page.locator('[data-log-coefficient]').selectOption('1');
    await selectionReady('2:1:1:-1');
    const complete = async (scope, failFirst) => {
      const bank = await page.evaluate(async ({ base, scope }) => (await import(base + 'content/activities/catalog.js')).questionsForScope(scope), { base, scope });
      const root = page.locator('[data-quiz]');
      for (let i = 0; i < bank.length; i++) {
        if (i === 0 && failFirst) {
          await root.locator('input[value="wrong-1"]').check();
          await root.getByRole('button', { name: 'Comprobar', exact: true }).click();
          await root.locator('.feedback').filter({ hasText: 'Revisa' }).waitFor();
          await root.getByRole('button', { name: 'Ver pista', exact: true }).click();
          await root.locator('.feedback').filter({ hasText: 'Pista:' }).waitFor();
        }
        await root.locator('input[value="' + bank[i].correct + '"]').check();
        await root.getByRole('button', { name: 'Comprobar', exact: true }).click();
        await root.getByRole('button', { name: /Siguiente pregunta|Ver resumen/ }).waitFor(); await ready();
        await root.getByRole('button', { name: /Siguiente pregunta|Ver resumen/ }).click();
      }
      await root.getByText((bank.length - Number(failFirst)) + ' de ' + bank.length + ' respuestas correctas', { exact: false }).waitFor();
    };
    await complete('t02-e05', true);
    const cards = page.locator('[data-flashcards]');
    for (let i = 1; i <= 6; i++) {
      await cards.getByText('Tarjeta ' + i + ' de 6', { exact: true }).waitFor();
      await cards.getByRole('button', { name: 'Mostrar respuesta', exact: true }).click(); await ready();
      if (i < 6) await cards.getByRole('button', { name: 'Siguiente', exact: true }).click();
    }
    await page.getByText('Ver solución razonada', { exact: true }).click();
    await page.locator('[data-reading-controls] > summary').click();
    await page.locator('[data-text-size]').selectOption('200');
    await page.locator('[data-contrast-control]').check(); await page.locator('[data-highlight-control]').check();
    await page.setViewportSize({ width: 320, height: 844 }); await ready();
    if (process.env.SCREENSHOT_DIR) await page.locator('#explorador').screenshot({ path: process.env.SCREENSHOT_DIR + '/logaritmos-explorador-movil.png' });
    await page.setViewportSize({ width: 1280, height: 900 }); await page.locator('[data-reset-reading]').click(); await ready();
    if (process.env.SCREENSHOT_DIR) {
      await page.locator('#explorador').screenshot({ path: process.env.SCREENSHOT_DIR + '/logaritmos-explorador.png' });
    }
    await page.goto(base + 'test/index.html?tema=t02'); await ready(); await complete('t02', false);
    const prefix = new URL('prueba-subcarpeta/', base).href;
    await page.route(prefix + '**', async route => { const response = await route.fetch({ url: route.request().url().replace(prefix, base) }); await route.fulfill({ response }); });
    await page.goto(prefix + lesson); await selectionReady('2:1:0:0');
    await page.locator('[data-log-base]').selectOption('0.5'); await selectionReady('0.5:1:0:0');
    assert.deepEqual(errors, []);
    console.log('Aprobado: 24 configuraciones con dominio, tabla y gráfica, cambios rápidos, respuesta conservada, teclado, test 5/6 con pista, seis tarjetas, test t02 completo, móvil 320/390 y 200 %, subcarpeta y LaTeX.');
  } finally { await browser.close(); }
})().catch(error => { console.error(error); process.exitCode = 1; });

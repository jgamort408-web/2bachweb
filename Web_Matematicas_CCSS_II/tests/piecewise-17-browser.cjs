const assert = require('node:assert/strict');
const { chromium } = require('playwright');
const base = process.env.TEST_URL || 'http://127.0.0.1:4173/';
const lesson = 'libro/temas/02-representacion-de-funciones/06-funciones-a-trozos-valor-absoluto.html';
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
        const result = document.querySelector('[data-piecewise-result]');
        return result?.dataset.selection === selection && result.querySelector('mjx-container') && !/\\\[|\\\(/.test(result.textContent);
      }, selection);
      await ready();
    };
    await page.goto(base + lesson); await ready();
    const quiz = page.locator('[data-quiz]');
    await quiz.locator('input[value="right"]').check();
    for (const kind of ['smooth', 'corner', 'jump', 'isolated', 'hole']) for (const a of [-1, 0, 1]) {
      await page.locator('[data-joining-case]').selectOption(kind);
      await page.locator('[data-joining-point]').selectOption(String(a));
      await selectionReady(kind + ':' + a);
      const rows = await page.locator('[data-piecewise-result] tbody tr').all();
      for (let i = 0; i < 3; i++) {
        const d = [0.5, 0.1, 0.01][i];
        const values = (await rows[i].locator('td').allTextContents()).map(s => Number(s.replace(',', '.')));
        assert.ok(Math.abs(values[1] - (a - d)) < 1e-8 && Math.abs(values[3] - (a + d)) < 1e-8);
        const left = kind === 'corner' ? d - 1 : kind === 'jump' ? 1 - d : (1 - d) ** 2;
        const right = kind === 'corner' ? d - 1 : kind === 'jump' ? d + 3 : 2 * d + 1;
        assert.ok(Math.abs(values[2] - left) < 1e-8 && Math.abs(values[4] - right) < 1e-8);
      }
      assert.equal(await page.locator('[data-piece-curve]').count(), 2);
      for (const side of ['left', 'right']) {
        const curve = await page.locator('[data-piece-curve="' + side + '"]').getAttribute('d');
        assert.equal(curve.match(/M/g).length, 1); assert.equal(curve.includes('NaN'), false);
        for (const point of curve.split(/[ML]/).filter(Boolean)) {
          const x = Number(point.split(' ')[0]); assert.ok(side === 'left' ? x <= 280 : x >= 280);
        }
      }
      assert.equal(await page.locator('[data-piece-open]').count(), kind === 'jump' ? 2 : 1);
      assert.equal(await page.locator('[data-piece-value]').count(), kind === 'hole' ? 0 : 1);
      if (kind !== 'hole') assert.equal(Number(await page.locator('[data-piece-value]').getAttribute('cy')), 260 - 28 * (kind === 'corner' ? -1 : ['jump', 'isolated'].includes(kind) ? 3 : 1));
      const status = await page.locator('[data-piecewise-status]').innerText();
      assert.match(status, {smooth:/Continua y derivable/,corner:/no es derivable/,jump:/salto/,isolated:/evitable/,hole:/fuera del dominio/}[kind]);
    }
    assert.equal(await quiz.locator('input[value="right"]').isChecked(), true);
    await page.evaluate(() => {
      const control = document.querySelector('[data-joining-case]');
      for (const value of ['corner', 'jump', 'hole', 'isolated', 'smooth']) { control.value = value; control.dispatchEvent(new Event('change', { bubbles: true })); }
    });
    await selectionReady('smooth:1');
    await page.locator('[data-joining-case]').focus(); await page.keyboard.press('Home'); await page.keyboard.press('ArrowDown');
    await selectionReady('corner:1');
    await page.locator('[data-joining-case]').selectOption('isolated'); await selectionReady('isolated:1');
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
    await complete('t02-e06', true);
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
    const tableRegion = page.locator('[data-piecewise-result] .table-scroll');
    await tableRegion.focus(); await page.keyboard.press('ArrowRight');
    await page.waitForFunction(() => document.querySelector('[data-piecewise-result] .table-scroll').scrollLeft > 0);
    await tableRegion.evaluate(el => el.scrollLeft = 0);
    if (process.env.SCREENSHOT_DIR) await page.locator('#explorador').screenshot({ path: process.env.SCREENSHOT_DIR + '/tramos-explorador-movil.png' });
    await page.setViewportSize({ width: 1280, height: 900 }); await page.locator('[data-reset-reading]').click(); await ready();
    if (process.env.SCREENSHOT_DIR) {
      await page.locator('#explorador').screenshot({ path: process.env.SCREENSHOT_DIR + '/tramos-explorador.png' });
    }
    await page.goto(base + 'test/index.html?tema=t02'); await ready(); await complete('t02', false);
    const prefix = new URL('prueba-subcarpeta/', base).href;
    await page.route(prefix + '**', async route => { const response = await route.fetch({ url: route.request().url().replace(prefix, base) }); await route.fulfill({ response }); });
    await page.goto(prefix + lesson); await selectionReady('smooth:1');
    await page.locator('[data-joining-case]').selectOption('hole'); await selectionReady('hole:1');
    assert.deepEqual(errors, []);
    console.log('Aprobado: 15 configuraciones con ramas separadas y extremos abiertos/cerrados, cambios rápidos, respuesta conservada, teclado, test 5/6 con pista, seis tarjetas, test t02 completo, móvil 320/390 y 200 %, subcarpeta y LaTeX.');
  } finally { await browser.close(); }
})().catch(error => { console.error(error); process.exitCode = 1; });

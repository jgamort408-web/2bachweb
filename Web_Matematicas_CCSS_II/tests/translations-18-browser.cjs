const assert = require('node:assert/strict');
const { chromium } = require('playwright');
const base = process.env.TEST_URL || 'http://127.0.0.1:4173/';
const lesson = 'libro/temas/02-representacion-de-funciones/07-traslaciones.html';
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
        const result = document.querySelector('[data-translation-result]');
        return result?.dataset.selection === selection && result.querySelector('mjx-container') && !/\\\[|\\\(/.test(result.textContent);
      }, selection);
      await ready();
    };
    await page.goto(base + lesson); await ready();
    const quiz = page.locator('[data-quiz]');
    await quiz.locator('input[value="right"]').check();
    for (const kind of ['square', 'absolute', 'reciprocal', 'logarithm']) for (const a of [-2, 0, 2]) for (const k of [-2, 0, 2]) {
      await page.locator('[data-shift-family]').selectOption(kind);
      await page.locator('[data-shift-horizontal]').selectOption(String(a));
      await page.locator('[data-shift-vertical]').selectOption(String(k));
      await selectionReady([kind,a,k,1].join(':'));
      const original = x => kind==='square'?x*x:kind==='absolute'?Math.abs(x):kind==='reciprocal'?1/x:Math.log(x);
      for (const row of await page.locator('[data-translation-result] tbody tr').all()) {
        const values = (await row.locator('td').allTextContents()).map(s => Number(s.replace(',', '.')));
        assert.ok(Math.abs(values[1]-original(values[0]))<0.000051);
        assert.equal(values[2],values[0]+a); assert.ok(Math.abs(values[3]-(original(values[0])+k))<0.000051);
      }
      assert.equal(await page.locator('[data-shift-curve]').count(),2);
      for (const role of ['original','translated']) {
        const curve = await page.locator('[data-shift-curve="'+role+'"]').getAttribute('d');
        assert.equal(curve.match(/M/g).length,kind==='reciprocal'?2:1);assert.equal(curve.includes('NaN'),false);
        if(kind==='logarithm')for(const point of curve.split(/[ML]/).filter(Boolean))assert.ok(Number(point.split(' ')[0])>280+40*(role==='original'?0:a));
      }
      const marker=page.locator('[data-shift-point]');
      assert.equal(Number(await marker.getAttribute('x'))+4,280+40*(1+a));
      assert.equal(Number(await marker.getAttribute('y'))+4,180-24*(original(1)+k));
      assert.equal(await page.locator('[data-shift-asymptote="vertical"]').count(),['reciprocal','logarithm'].includes(kind)?1:0);
      assert.equal(await page.locator('[data-shift-asymptote="horizontal"]').count(),kind==='reciprocal'?1:0);
    }
    assert.equal(await quiz.locator('input[value="right"]').isChecked(),true);
    await page.locator('[data-show-original]').uncheck(); await selectionReady('logarithm:2:2:0');
    assert.equal(await page.locator('[data-shift-curve="original"]').count(),0);
    assert.equal(await page.locator('[data-shift-original-point]').count(),0);
    await page.locator('[data-show-original]').focus(); await page.keyboard.press('Space'); await selectionReady('logarithm:2:2:1');
    await page.evaluate(() => {
      const control=document.querySelector('[data-shift-family]');
      for(const value of ['absolute','reciprocal','logarithm','square']) {control.value=value;control.dispatchEvent(new Event('change',{bubbles:true}));}
    });
    await selectionReady('square:2:2:1');
    await page.locator('[data-shift-family]').focus(); await page.keyboard.press('Home'); await page.keyboard.press('ArrowDown');
    await selectionReady('absolute:2:2:1');
    await page.locator('[data-shift-family]').selectOption('reciprocal'); await page.locator('[data-shift-vertical]').selectOption('-2');
    await selectionReady('reciprocal:2:-2:1');
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
    await complete('t02-e07', true);
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
    const tableRegion = page.locator('[data-translation-result] .table-scroll');
    await tableRegion.focus(); await page.keyboard.press('ArrowRight');
    await page.waitForFunction(() => document.querySelector('[data-translation-result] .table-scroll').scrollLeft > 0);
    await tableRegion.evaluate(el => el.scrollLeft = 0);
    if (process.env.SCREENSHOT_DIR) await page.locator('#explorador').screenshot({ path: process.env.SCREENSHOT_DIR + '/traslaciones-explorador-movil.png' });
    await page.setViewportSize({ width: 1280, height: 900 }); await page.locator('[data-reset-reading]').click(); await ready();
    if (process.env.SCREENSHOT_DIR) {
      await page.locator('#explorador').screenshot({ path: process.env.SCREENSHOT_DIR + '/traslaciones-explorador.png' });
    }
    await page.goto(base + 'test/index.html?tema=t02'); await ready(); await complete('t02', false);
    const prefix = new URL('prueba-subcarpeta/', base).href;
    await page.route(prefix + '**', async route => { const response = await route.fetch({ url: route.request().url().replace(prefix, base) }); await route.fulfill({ response }); });
    await page.goto(prefix + lesson); await selectionReady('square:0:0:1');
    await page.locator('[data-shift-family]').selectOption('logarithm'); await selectionReady('logarithm:0:0:1');
    assert.deepEqual(errors, []);
    console.log('Aprobado: 36 traslaciones con puntos, curvas, asíntotas y alternancia de original, cambios rápidos, respuesta conservada, teclado, test 5/6 con pista, seis tarjetas, test t02 completo, móvil 320/390 y 200 %, subcarpeta y LaTeX.');
  } finally { await browser.close(); }
})().catch(error => { console.error(error); process.exitCode = 1; });

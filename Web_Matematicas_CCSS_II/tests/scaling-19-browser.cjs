const assert = require('node:assert/strict');
const { chromium } = require('playwright');
const base = process.env.TEST_URL || 'http://127.0.0.1:4173/';
const lesson = 'libro/temas/02-representacion-de-funciones/08-expansion-y-contraccion.html';
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
        const result = document.querySelector('[data-scaling-result]');
        return result?.dataset.selection === selection && result.querySelector('mjx-container') && !/\\\[|\\\(/.test(result.textContent);
      }, selection);
      await ready();
    };
    await page.goto(base + lesson); await ready();
    const quiz = page.locator('[data-quiz]');
    await quiz.locator('input[value="right"]').check();
    for(const kind of ['parabola','reciprocal','logarithm'])for(const a of [-2,0.5,1,2])for(const b of [-2,0.5,1,2]) {
      await page.locator('[data-scale-family]').selectOption(kind);
      await page.locator('[data-scale-vertical]').selectOption(String(a));
      await page.locator('[data-scale-horizontal]').selectOption(String(b));
      await selectionReady([kind,a,b,1].join(':'));
      const f=x=>kind==='parabola'?(x-1)**2:kind==='reciprocal'?1/(x-1):Math.log(x);
      for(const row of await page.locator('[data-scaling-result] tbody tr').all()){
        const v=(await row.locator('td').allTextContents()).map(s=>Number(s.replace(',','.')));
        assert.ok(Math.abs(v[1]-f(v[0]))<0.000051);assert.ok(Math.abs(v[2]-v[0]/b)<1e-8);assert.ok(Math.abs(v[3]-a*f(v[0]))<0.000051);
      }
      assert.equal(await page.locator('[data-scale-curve]').count(),2);
      for(const role of ['original','transformed']){
        const curve=await page.locator('[data-scale-curve="'+role+'"]').getAttribute('d');
        assert.equal(curve.match(/M/g).length,kind==='reciprocal'?2:1);assert.equal(curve.includes('NaN'),false);
        if(kind==='logarithm')for(const point of curve.split(/[ML]/).filter(Boolean)){
          const x=Number(point.split(' ')[0]);assert.ok((x-280)*(role==='original'?1:b)>0);
        }
      }
      const marker=page.locator('[data-scale-point]');
      assert.ok(Math.abs(Number(await marker.getAttribute('x'))+4-(280+40*(2/b)))<1e-8);
      assert.ok(Math.abs(Number(await marker.getAttribute('y'))+4-(180-24*a*f(2)))<1e-8);
      assert.equal(await page.locator('[data-scale-asymptote="vertical"]').count(),kind==='parabola'?0:1);
      assert.equal(await page.locator('[data-scale-asymptote="horizontal"]').count(),kind==='reciprocal'?1:0);
    }
    assert.equal(await quiz.locator('input[value="right"]').isChecked(),true);
    await page.locator('[data-scale-original]').uncheck();await selectionReady('logarithm:2:2:0');
    assert.equal(await page.locator('[data-scale-curve="original"]').count(),0);
    await page.locator('[data-scale-original]').focus();await page.keyboard.press('Space');await selectionReady('logarithm:2:2:1');
    await page.evaluate(()=>{const c=document.querySelector('[data-scale-family]');for(const v of ['parabola','reciprocal','logarithm','parabola']){c.value=v;c.dispatchEvent(new Event('change',{bubbles:true}));}});
    await selectionReady('parabola:2:2:1');
    await page.locator('[data-scale-family]').focus();await page.keyboard.press('Home');await page.keyboard.press('ArrowDown');
    await selectionReady('reciprocal:2:2:1');
    await page.locator('[data-scale-family]').selectOption('parabola');await page.locator('[data-scale-vertical]').selectOption('-2');await selectionReady('parabola:-2:2:1');
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
    await complete('t02-e08', true);
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
    const tableRegion = page.locator('[data-scaling-result] .table-scroll');
    await tableRegion.focus(); await page.keyboard.press('ArrowRight');
    await page.waitForFunction(() => document.querySelector('[data-scaling-result] .table-scroll').scrollLeft > 0);
    await tableRegion.evaluate(el => el.scrollLeft = 0);
    if (process.env.SCREENSHOT_DIR) await page.locator('#explorador').screenshot({ path: process.env.SCREENSHOT_DIR + '/escalas-explorador-movil.png' });
    await page.setViewportSize({ width: 1280, height: 900 }); await page.locator('[data-reset-reading]').click(); await ready();
    if (process.env.SCREENSHOT_DIR) {
      await page.locator('#explorador').screenshot({ path: process.env.SCREENSHOT_DIR + '/escalas-explorador.png' });
    }
    await page.goto(base + 'test/index.html?tema=t02'); await ready(); await complete('t02', false);
    const prefix = new URL('prueba-subcarpeta/', base).href;
    await page.route(prefix + '**', async route => { const response = await route.fetch({ url: route.request().url().replace(prefix, base) }); await route.fulfill({ response }); });
    await page.goto(prefix + lesson); await selectionReady('parabola:1:1:1');
    await page.locator('[data-scale-family]').selectOption('logarithm');await page.locator('[data-scale-horizontal]').selectOption('-2');await selectionReady('logarithm:1:-2:1');
    assert.deepEqual(errors, []);
    console.log('Aprobado: 48 escalas con puntos, dominio, curvas, asíntotas, reflexiones y alternancia de original, cambios rápidos, respuesta conservada, teclado, test 5/6 con pista, seis tarjetas, test t02 completo, móvil 320/390 y 200 %, subcarpeta y LaTeX.');
  } finally { await browser.close(); }
})().catch(error => { console.error(error); process.exitCode = 1; });

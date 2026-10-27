const assert = require('node:assert/strict');
const { chromium } = require('playwright');
const base = process.env.TEST_URL || 'http://127.0.0.1:4173/';
const lesson = 'libro/temas/02-representacion-de-funciones/09-optimizacion-de-funciones.html';
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
        const result = document.querySelector('[data-optimization-result]');
        return result?.dataset.selection === selection && result.querySelector('mjx-container') && !/\\\[|\\\(/.test(result.textContent);
      }, selection);
      await ready();
    };
    await page.goto(base + lesson); await ready();
    const quiz = page.locator('[data-quiz]');
    await quiz.locator('input[value="right"]').check();
    for(const price of [35,50])for(const fixed of [100,500])for(const cap of [8,16,24])for(const mode of ['continuous','integer']){
      await page.locator('[data-opt-price]').selectOption(String(price));await page.locator('[data-opt-fixed]').selectOption(String(fixed));
      await page.locator('[data-opt-capacity]').selectOption(String(cap));await page.locator('[data-opt-mode]').selectOption(mode);
      await selectionReady([price,fixed,cap,mode].join(':'));
      const B=q=>q*(price-q)-(10*q+fixed),stationary=(price-10)/2;
      const values=mode==='integer'?Array.from({length:cap+1},(_,q)=>q):[0,cap,Math.min(stationary,cap)];
      const bestValue=Math.max(...values.map(B));const best=[...new Set(values.filter(q=>B(q)===bestValue))].sort((a,b)=>a-b);
      const markers=await page.locator('[data-opt-best]').evaluateAll(els=>els.map(el=>Number(el.dataset.optBest)));
      assert.deepEqual(markers,best);
      for(const row of await page.locator('[data-optimization-result] tbody tr').all()){
        const cells=await row.locator('td').allTextContents();const q=Number(cells[0].replace(',','.'));
        assert.ok(q>=0&&q<=cap);if(mode==='integer')assert.ok(Number.isInteger(q));
        assert.equal(Number(cells[1].replace(',','.')),B(q));assert.equal(cells[2].includes('Máximo'),best.includes(q));
      }
      assert.equal(await page.locator('[data-opt-integer]').count(),mode==='integer'?cap+1:0);
      const curve=await page.locator('[data-opt-curve="feasible"]').getAttribute('d');
      for(const point of curve.split(/[ML]/).filter(Boolean)){const x=Number(point.split(' ')[0]);assert.ok(x>=50&&x<=50+16*cap);}
      assert.equal(await page.locator('[data-opt-quantity]').getAttribute('max'),String(cap));
      assert.equal(await page.locator('[data-opt-quantity]').getAttribute('step'),mode==='integer'?'1':'0.5');
      assert.equal((await page.locator('[data-opt-summary]').innerText()).includes('pérdida'),bestValue<0);
    }
    assert.equal(await quiz.locator('input[value="right"]').isChecked(),true);
    await page.evaluate(()=>{const c=document.querySelector('[data-opt-price]');for(const v of ['35','50','35']){c.value=v;c.dispatchEvent(new Event('change',{bubbles:true}));}});
    await selectionReady('35:500:24:integer');
    await page.locator('[data-opt-fixed]').selectOption('100');await page.locator('[data-opt-capacity]').selectOption('16');await selectionReady('35:100:16:integer');
    assert.deepEqual(await page.locator('[data-opt-best]').evaluateAll(els=>els.map(el=>Number(el.dataset.optBest))),[12,13]);
    await page.locator('[data-opt-quantity]').focus();await page.keyboard.press('Home');await page.keyboard.press('ArrowRight');
    await page.waitForFunction(()=>document.querySelector('[data-optimization-result]').dataset.quantity==='1');await ready();
    assert.match(await page.locator('[data-opt-choice]').innerText(),/beneficio -76 €/);
    await page.locator('[data-opt-mode]').selectOption('continuous');await page.locator('[data-opt-quantity]').fill('12.5');
    await page.waitForFunction(()=>document.querySelector('[data-optimization-result]').dataset.quantity==='12.5');await ready();
    await page.locator('[data-opt-mode]').selectOption('integer');await selectionReady('35:100:16:integer');
    assert.ok(Number.isInteger(Number(await page.locator('[data-opt-quantity]').inputValue())));
    await page.locator('[data-opt-capacity]').selectOption('8');await selectionReady('35:100:8:integer');
    assert.ok(Number(await page.locator('[data-opt-quantity]').inputValue())<=8);
    await page.locator('[data-opt-capacity]').selectOption('16');await selectionReady('35:100:16:integer');
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
    await complete('t02-e09', true);
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
    const tableRegion = page.locator('[data-optimization-result] .table-scroll');
    await tableRegion.focus(); await page.keyboard.press('ArrowRight');
    await page.waitForFunction(() => document.querySelector('[data-optimization-result] .table-scroll').scrollLeft > 0);
    await tableRegion.evaluate(el => el.scrollLeft = 0);
    if (process.env.SCREENSHOT_DIR) await page.locator('#explorador').screenshot({ path: process.env.SCREENSHOT_DIR + '/optimizacion-explorador-movil.png' });
    await page.setViewportSize({ width: 1280, height: 900 }); await page.locator('[data-reset-reading]').click(); await ready();
    if (process.env.SCREENSHOT_DIR) {
      await page.locator('#explorador').screenshot({ path: process.env.SCREENSHOT_DIR + '/optimizacion-explorador.png' });
    }
    await page.goto(base + 'test/index.html?tema=t02'); await ready(); await complete('t02', false);
    const prefix = new URL('prueba-subcarpeta/', base).href;
    await page.route(prefix + '**', async route => { const response = await route.fetch({ url: route.request().url().replace(prefix, base) }); await route.fulfill({ response }); });
    await page.goto(prefix + lesson);await selectionReady('50:100:24:continuous');
    await page.locator('[data-opt-mode]').selectOption('integer');await selectionReady('50:100:24:integer');
    assert.deepEqual(errors, []);
    console.log('Aprobado: 24 escenarios de optimización con candidatos, fronteras, pérdidas, empate entero y control de cantidad, cambios rápidos, respuesta conservada, teclado, test 5/6 con pista, seis tarjetas, test t02 completo, móvil 320/390 y 200 %, subcarpeta y LaTeX.');
  } finally { await browser.close(); }
})().catch(error => { console.error(error); process.exitCode = 1; });

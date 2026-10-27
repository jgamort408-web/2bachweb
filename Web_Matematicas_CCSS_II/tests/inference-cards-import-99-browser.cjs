const assert = require('node:assert/strict');
const fs = require('node:fs');
const crypto = require('node:crypto');
const { chromium } = require('playwright');

(async () => {
  const source = fs.readFileSync('../Página web existente/5. Inferencia Estadística/5. Flashcards.txt');
  assert.equal(crypto.createHash('sha256').update(source).digest('hex'), 'af1fb16725425a5807fb838002a54821e28bad8843aee42de6d206365125b246');
  const { inferenceCards } = await import('../content/activities/inference-cards.js');
  const { flashcards, questions } = await import('../content/activities/catalog.js');
  assert.equal(inferenceCards.length, 30);
  assert.deepEqual(Object.fromEntries([...new Set(inferenceCards.map(c => c.category))].map(name => [name, inferenceCards.filter(c => c.category === name).length])), {'Conceptos Básicos':3, Notación:1, Muestreo:3, 'Teorema Central Límite':4, 'Intervalos de Confianza':6, Fórmulas:5, 'Trucos y Propiedades':4, Relaciones:4});
  assert.deepEqual(inferenceCards.map(c => c.sourceIndex), Array.from({length:30},(_,i)=>i+1));
  assert.ok(inferenceCards.every(c => c.topicId === 't09' && c.front && c.back));
  assert.equal(flashcards.length,405);
  assert.equal(new Set(flashcards.map(c=>c.id)).size,405);
  assert.equal(questions.length,347);
  const base='http://127.0.0.1:4173/';
  const browser=await chromium.launch({headless:true,executablePath:process.env.CHROME_PATH});
  try {
    const page=await browser.newPage({viewport:{width:1200,height:900}}), errors=[];
    page.on('pageerror',e=>errors.push(e.message));
    page.on('response',r=>{if(r.status()>=400&&!r.url().endsWith('favicon.ico'))errors.push(r.status()+' '+r.url());});
    for(const prefix of [base,base+'prueba-subcarpeta/']) {
      if(prefix!==base) await page.route(prefix+'**',async route=>{const response=await route.fetch({url:route.request().url().replace(prefix,base)});await route.fulfill({response});});
      await page.goto(prefix+'libro/temas/09-inferencia-estadistica/index.html#tarjetas');
      assert.equal(await page.locator('#tarjetas a[href*="tema=t09"]').count(),1);
      await page.goto(prefix+'tarjetas/index.html?tema=t09');
      await page.waitForFunction(()=>document.querySelector('[data-flashcards] [data-content-role="activity-progress"]')?.textContent.includes('de 30'));
      assert.equal(await page.locator('[data-card-category] option').count(),9);
      await page.locator('[data-card-category]').selectOption('Muestreo');
      await page.waitForFunction(()=>document.querySelector('[data-flashcards] [data-content-role="activity-progress"]')?.textContent.includes('de 3'));
      await page.locator('[data-flashcards] button').last().focus(); await page.keyboard.press('Enter');
      await page.waitForFunction(()=>document.querySelector('[data-flashcards] [data-content-role="activity-progress"]')?.textContent.includes('Tarjeta 2 de 3'));
      await page.locator('[data-card-category]').selectOption('');
    }
    await page.goto(base+'tarjetas/index.html?tema=t09');
    await page.waitForFunction(()=>document.querySelector('[data-flashcards] [data-content-role="activity-progress"]')?.textContent.includes('de 30'));
    for(let index=1;index<=30;index++){
      await page.locator('[data-flashcards] button').nth(1).click();
      await page.waitForFunction(index=>document.querySelector('[data-flashcards] [data-content-role="activity-progress"]')?.textContent.includes('Tarjeta '+index+' de 30')&&!!document.querySelector('[data-flashcards] [data-content-role="flashcard-back"]'),index);
      assert.equal(await page.locator('[data-mml-node="merror"]').count(),0);
      if(index<30) await page.locator('[data-flashcards] button').last().click();
    }
    await page.setViewportSize({width:390,height:844}); await page.evaluate(()=>document.documentElement.style.fontSize='200%');
    assert.equal(await page.evaluate(()=>document.documentElement.scrollWidth>innerWidth),false);
    await page.reload(); await page.waitForFunction(()=>document.querySelector('[data-flashcards] [data-content-role="activity-progress"]')?.textContent.includes('de 30'));
    assert.equal(await page.locator('[data-card-category]').inputValue(),'');
    assert.deepEqual(errors,[]);
    console.log('PASS: fuente, 30 tarjetas, ocho categorías, 405 totales, MathJax, filtros, teclado, raíz/subcarpeta, móvil y recarga.');
  } finally {await browser.close();}
})().catch(e=>{console.error(e);process.exitCode=1;});



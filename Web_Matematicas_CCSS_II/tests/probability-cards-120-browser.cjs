const assert=require('node:assert/strict');
const fs=require('node:fs');
const crypto=require('node:crypto');
const {chromium}=require('playwright');

(async()=>{
 const source=fs.readFileSync('../Página web existente/3. Probabilidad/7. Flashcards.txt');
 assert.equal(crypto.createHash('sha256').update(source).digest('hex'),'11da874cb550b883fbd32165e4ae2f7a36e504d3ef77e654890e450ba1c7a47b');
 const {probabilityCards}=await import('../content/activities/probability-cards.js');
 const {flashcards,questions,cardsForScope}=await import('../content/activities/catalog.js');
 assert.equal(probabilityCards.length,16);
 assert.deepEqual(Object.fromEntries([...new Set(probabilityCards.map(c=>c.category))].map(name=>[name,probabilityCards.filter(c=>c.category===name).length])),{'Conceptos básicos':4,Operaciones:4,Condicionada:2,'Teoremas clave':2,'Trucos de lenguaje':4});
 assert.deepEqual(probabilityCards.map(c=>c.sourceIndex),Array.from({length:16},(_,i)=>i+1));
 assert.ok(probabilityCards.every(c=>c.topicId==='t07'&&c.front&&c.back));
 assert.equal(cardsForScope('t07').length,16);
 assert.equal(flashcards.length,(await import('./helpers/catalog-expectations.mjs')).expectedCatalog.cards);
 assert.equal(new Set(flashcards.map(c=>c.id)).size,(await import('./helpers/catalog-expectations.mjs')).expectedCatalog.cards);
 assert.equal(questions.length,(await import('./helpers/catalog-expectations.mjs')).expectedCatalog.questions);
 const base='http://127.0.0.1:4173/';
 const browser=await chromium.launch({headless:true,executablePath:process.env.CHROME_PATH});
 try{
  const page=await browser.newPage({viewport:{width:1200,height:900}}),errors=[];
  page.on('pageerror',e=>errors.push(e.message));
  page.on('response',r=>{if(r.status()>=400&&!r.url().endsWith('favicon.ico'))errors.push(r.status()+' '+r.url());});
  for(const prefix of [base,base+'prueba-subcarpeta/']){
   if(prefix!==base)await page.route(prefix+'**',async route=>{const response=await route.fetch({url:route.request().url().replace(prefix,base)});await route.fulfill({response});});
   await page.goto(prefix+'libro/temas/07-probabilidad/index.html#tarjetas');
   assert.equal(await page.locator('#tarjetas a[href*="tema=t07"]').count(),1);
   await page.goto(prefix+'tarjetas/index.html?tema=t07');
   await page.waitForFunction(()=>document.querySelector('[data-flashcards] [data-content-role="activity-progress"]')?.textContent.includes('de 16'));
   assert.equal(await page.locator('[data-card-category] option').count(),6);
   assert.equal(await page.locator('[data-study-topics] a[aria-current="page"]').count(),1);
   await page.locator('[data-card-category]').selectOption('Operaciones');
   await page.waitForFunction(()=>document.querySelector('[data-flashcards] [data-content-role="activity-progress"]')?.textContent.includes('de 4'));
   await page.locator('[data-flashcards] button').last().focus();await page.keyboard.press('Enter');
   await page.waitForFunction(()=>document.querySelector('[data-flashcards] [data-content-role="activity-progress"]')?.textContent.includes('Tarjeta 2 de 4'));
  }
  await page.goto(base+'tarjetas/index.html?tema=t07');
  await page.waitForFunction(()=>document.querySelector('[data-flashcards] [data-content-role="activity-progress"]')?.textContent.includes('de 16'));
  for(let index=1;index<=16;index++){
   await page.locator('[data-flashcards] button').nth(1).click();
   await page.waitForFunction(index=>document.querySelector('[data-flashcards] [data-content-role="activity-progress"]')?.textContent.includes('Tarjeta '+index+' de 16')&&!!document.querySelector('[data-flashcards] [data-content-role="flashcard-back"]'),index);
   await page.waitForFunction(()=>document.querySelectorAll('[data-flashcards] mjx-container').length>0);
   assert.equal(await page.locator('[data-mml-node="merror"]').count(),0);
   if(index<16)await page.locator('[data-flashcards] button').last().click();
  }
  await page.setViewportSize({width:390,height:844});
  await page.evaluate(()=>document.documentElement.style.fontSize='200%');
  assert.equal(await page.evaluate(()=>document.documentElement.scrollWidth>innerWidth),false);
  await page.reload();
  await page.waitForFunction(()=>document.querySelector('[data-flashcards] [data-content-role="activity-progress"]')?.textContent.includes('de 16'));
  assert.equal(await page.locator('[data-card-category]').inputValue(),'');
  assert.deepEqual(errors,[]);
  console.log('PASS: fuente, 16 tarjetas, cinco categorías, 405 totales, MathJax, filtros, teclado, raíz/subcarpeta, móvil y recarga.');
 }finally{await browser.close();}
})().catch(e=>{console.error(e);process.exitCode=1;});


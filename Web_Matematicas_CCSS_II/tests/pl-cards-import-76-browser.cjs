const assert=require('node:assert/strict'),{chromium}=require('playwright'),fs=require('node:fs'),path=require('node:path'),{createHash}=require('node:crypto'),vm=require('node:vm');
const base=process.env.TEST_URL||'http://127.0.0.1:4173/';
(async()=>{
 const originals=path.resolve(__dirname,'../../Página web existente');
 const hashes={
  'Inicio.txt':'985c96051b3ff0eaa86c4732e123850542b1ed277d4fe63d9d36aacc8cad70cb',
  '1. Programación Lineal/0. Presentación.txt':'985c96051b3ff0eaa86c4732e123850542b1ed277d4fe63d9d36aacc8cad70cb',
  '1. Programación Lineal/1. Inecuaciones.txt':'eb272271f4b5ca059ec703d287425b5c419ef59ecb0cabd2e2f900b7ccda50cc',
  '1. Programación Lineal/2. Sistemas de inecuaciones.txt':'5d963b48bb98ab92aef7222307925ffe9088d55139fd63ce11b2fcb17899a588',
  '1. Programación Lineal/3. Programación Lineal.txt':'82d9466ebbe563c0d8a3724c1eeb031f312c7a7082b360bda11d55bf7502f03b',
  '1. Programación Lineal/4. El método gráfico.txt':'455c45b45dea0bd4641009e6af0d179d92eb41d741a1ce5708052ba7d248709c',
 '1. Programación Lineal/5. Ejercicios Resueltos.txt':'cf12fac3410b388d7a9588987dead55b0237a5d8b41865a9975c2a98a6efb24d',
 '1. Programación Lineal/6. Flashcards.txt':'58ae420a2140ec783ba86c07793a14ff187b23eef6d996581f98348cb2b5d87a'
 };
 for(const [name,hash] of Object.entries(hashes))assert.equal(createHash('sha256').update(fs.readFileSync(path.join(originals,name))).digest('hex'),hash);


 const original=fs.readFileSync(path.join(originals,'1. Programación Lineal/6. Flashcards.txt'),'utf8');
 const literal=original.match(/const cardsData = (\[[\s\S]*?\n        \]);/)[1];
 const source=vm.runInNewContext(literal,{}, {timeout:1000});
 const {flashcards,questions,cardsForScope}=await import('../content/activities/catalog.js');
 const cards=cardsForScope('t06');
 assert.equal(source.length,19);assert.equal(cards.length,19);assert.equal(flashcards.length,(await import('./helpers/catalog-expectations.mjs')).expectedCatalog.cards);assert.equal(questions.length,(await import('./helpers/catalog-expectations.mjs')).expectedCatalog.questions);
 assert.equal(new Set(flashcards.map(c=>c.id)).size,(await import('./helpers/catalog-expectations.mjs')).expectedCatalog.cards);
 cards.forEach((c,i)=>{assert.equal(c.sourceIndex,i+1);assert.equal(c.category,source[i].category);assert.ok(c.front&&c.back);});
 const categories=[['Definiciones',3],['Planteamiento',5],['Región Factible',4],['Teoremas y Métodos',3],['Casos Especiales',4]];
 for(const [topic,size] of [['t01',61],['t02',54],['t03',48],['t04',72],['t05',66]])assert.equal(cardsForScope(topic).length,size);
 const browser=await chromium.launch({headless:true,executablePath:process.env.CHROME_PATH});
 try{
 const page=await browser.newPage({viewport:{width:1280,height:960}}),errors=[],external=[];
 page.on('pageerror',e=>errors.push(e.message));
 page.on('response',r=>{if(r.status()>=400&&!r.url().endsWith('favicon.ico'))errors.push(r.status()+' '+r.url());});
 page.on('request',r=>{if(/^https?:/.test(r.url())&&!r.url().startsWith(base))external.push(r.url());});
 const deck=page.locator('[data-flashcards]');
 const ready=async()=>{
 await page.locator('[data-content-role="flashcard-front"]').waitFor();
 await page.waitForFunction(()=>(!document.querySelector('.math-status')||document.querySelector('.math-status').hidden)&&!/\\[\[(]/.test(document.querySelector('[data-flashcards]').innerText));
 assert.equal(await page.locator('[data-mml-node="merror"]').count(),0);
 assert.equal(await page.evaluate(()=>document.documentElement.scrollWidth>innerWidth),false);
 };
 for(const sub of [false,true]){
 const prefix=sub?new URL('prueba-subcarpeta/',base).href:base;
 if(sub)await page.route(prefix+'**',async route=>{const response=await route.fetch({url:route.request().url().replace(prefix,base)});await route.fulfill({response});});
 await page.goto(prefix+'tarjetas/index.html?tema=t06');await page.getByText('Tarjeta 1 de 19',{exact:true}).waitFor();await ready();
 assert.equal(await deck.getByRole('button',{name:'Anterior',exact:true}).isDisabled(),true);
 assert.equal(await page.locator('[data-card-category] option').count(),6);
 for(let i=0;i<19;i++){
  await page.getByText('Tarjeta '+(i+1)+' de 19',{exact:true}).waitFor();
  await deck.getByRole('button',{name:'Mostrar respuesta',exact:true}).press('Enter');
  await page.locator('[data-content-role="flashcard-back"]').waitFor();await ready();
  assert.equal(await page.locator('[data-content-role="flashcard-front"]').innerText(),cards[i].front);
  assert.equal(await page.locator('[data-content-role="flashcard-category"]').innerText(),cards[i].category);
  assert.equal(await deck.getByRole('button',{name:'Ocultar respuesta',exact:true}).getAttribute('aria-expanded'),'true');
  if(cards[i].back.includes('\\('))assert.ok(await deck.locator('mjx-container').count()>0);
  if(i===5)assert.match(await page.locator('[data-content-role="flashcard-back"]').innerText(),/exactamente 20/);
  if(i===15)assert.match(await page.locator('[data-content-role="flashcard-back"]').innerText(),/no significa/);
  if(i===18)assert.match(await page.locator('[data-content-role="flashcard-back"]').innerText(),/no garantiza el óptimo/);
  if(i<18)await deck.getByRole('button',{name:'Siguiente',exact:true}).click();
 }
 assert.ok(await deck.getByRole('button',{name:'Siguiente',exact:true}).isDisabled());
 for(const [category,size] of categories){
  await page.locator('[data-card-category]').selectOption(category);await ready();
  assert.match(await deck.locator('[data-content-role="activity-progress"]').innerText(),new RegExp('1 de '+size+'$'));
  await page.waitForFunction(()=>!document.querySelector('[data-content-role="flashcard-back"]'));
  await deck.getByRole('button',{name:'Mostrar respuesta',exact:true}).click();await page.locator('[data-content-role="flashcard-back"]').waitFor();await ready();
 }
 // Rapid filtering and repeated reveal actions must settle on the final state.
 for(const [category] of categories)await page.locator('[data-card-category]').selectOption(category);
 await page.locator('[data-card-category]').selectOption('Planteamiento');await ready();
 await deck.getByRole('button',{name:'Siguiente',exact:true}).click();await deck.getByRole('button',{name:'Siguiente',exact:true}).click();
 await deck.getByRole('button',{name:'Mostrar respuesta',exact:true}).click();await page.locator('[data-content-role="flashcard-back"]').waitFor();await ready();
 if(!sub&&process.env.SCREENSHOT_DIR)await deck.screenshot({path:process.env.SCREENSHOT_DIR+'/pl-tarjetas-escritorio.png'});
 await page.locator('[data-reading-controls]>summary').click();await page.locator('[data-text-size]').selectOption('200');await page.locator('[data-contrast-control]').check();await page.locator('[data-highlight-control]').check();await page.setViewportSize({width:320,height:844});await ready();
 assert.match(await deck.locator('[data-content-role="activity-progress"]').innerText(),/3 de 5/);
 assert.match(await page.locator('[data-content-role="flashcard-back"]').innerText(),/exactamente 20/);
 if(!sub&&process.env.SCREENSHOT_DIR)await deck.screenshot({path:process.env.SCREENSHOT_DIR+'/pl-tarjetas-movil.png'});
 await deck.getByRole('button',{name:'Ocultar respuesta',exact:true}).press('Enter');await ready();
 await page.reload();await page.getByText('Tarjeta 1 de 19',{exact:true}).waitFor();await ready();
 assert.equal(await page.locator('[data-card-category]').inputValue(),'');assert.equal(await page.locator('[data-content-role="flashcard-back"]').count(),0);
 assert.equal(await page.locator('[data-text-size]').inputValue(),'200');
 await page.locator('[data-reading-controls]>summary').click();await page.locator('[data-reset-reading]').click();await page.setViewportSize({width:1280,height:960});
 await page.goto(prefix+'libro/temas/06-programacion-lineal/index.html#tarjetas');
 await page.getByRole('link',{name:'Abrir las 19 tarjetas y filtrar por categoría',exact:true}).click();await page.getByText('Tarjeta 1 de 19',{exact:true}).waitFor();
 }
 // Shared renderer regression: every older theme plus the global and lesson scopes.
 for(const [topic,size] of [['t01',61],['t02',54],['t03',48],['t04',72],['t05',66],['',(await import('./helpers/catalog-expectations.mjs')).expectedCatalog.cards]]){
 await page.goto(base+'tarjetas/index.html'+(topic?'?tema='+topic:''));await page.getByText('Tarjeta 1 de '+size,{exact:true}).waitFor();
 assert.equal(await page.locator('[data-card-category]').count(),0);
 await deck.getByRole('button',{name:'Mostrar respuesta',exact:true}).click();await page.locator('[data-content-role="flashcard-back"]').waitFor();await ready();
 await deck.getByRole('button',{name:'Siguiente',exact:true}).click();await page.getByText('Tarjeta 2 de '+size,{exact:true}).waitFor();await ready();
 await deck.getByRole('button',{name:'Anterior',exact:true}).click();await page.getByText('Tarjeta 1 de '+size,{exact:true}).waitFor();await ready();
 }
 await page.goto(base+'libro/temas/05-sistemas-de-ecuaciones/11-discusion-de-sistemas-con-parametros.html');
 await deck.waitFor();await deck.getByText('Tarjeta 1 de 6',{exact:true}).waitFor();await deck.getByRole('button',{name:'Mostrar respuesta',exact:true}).click();await ready();
 assert.ok(await page.locator('[data-quiz] input').count()>0);
 assert.deepEqual(errors,[]);assert.deepEqual(external,[]);
 console.log('PASS: eight hashes, 19 original cards/5 categories, 320 total, 318 questions unchanged; every PL answer in root/subfolder, LaTeX, keyboard, mobile/preferences, memory reset and shared deck regression in five themes/global/lesson.');
 }finally{for(const context of browser.contexts())for(const page of context.pages())await page.unrouteAll({behavior:'ignoreErrors'});await browser.close();}
})().catch(e=>{console.error(e);process.exitCode=1;});



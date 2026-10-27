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
 '1. Programación Lineal/6. Flashcards.txt':'58ae420a2140ec783ba86c07793a14ff187b23eef6d996581f98348cb2b5d87a',
 '2. Estadística Bidimensional/0. Presentación.txt':'7d6818dc9467b37270ccda847eda6c8dc524f1d090ddb4e234725b3f746d4e60',
 '2. Estadística Bidimensional/1. La variable bidimensional.txt':'1242fb2bade4d2f2ac2dab5b9a13e8b9fbfb8a9e92b87f496614688de2bf22a8',
 '2. Estadística Bidimensional/2. La nube de puntos.txt':'816d95d026460386678994fe697880ed854cb97c5eadc26455d440c1a924c297',
 '2. Estadística Bidimensional/3. La covarianza.txt':'8e2bd30f30ef99f7b56718b0869c2852d9316718fb7c34988cd861c5d5727060',
 '2. Estadística Bidimensional/4. Coeficiente de correlación de Pearson.txt':'32a067a690bdf962ecc4c334f7c6b056b0b2eff0310115ac3c7797ffa34dba3c',
 '2. Estadística Bidimensional/5. Regresión lineal.txt':'b872ad7f7e613b39a512e10d29e1999b83f3cd1d467b59f0b844139584ecab7f',
 '2. Estadística Bidimensional/6. Ejercicios resueltos.txt':'63e41c51a6936bb2dab6efc44957627af0bcdea0865f8307b52ff7ab7007fa3c',
 '2. Estadística Bidimensional/7. Flashcards.txt':'334150ec27c53e9143dba3f4fcc2bfeebfb7ede2d6537578c87a2721048f2a73'
 };
 for(const [name,hash] of Object.entries(hashes))assert.equal(createHash('sha256').update(fs.readFileSync(path.join(originals,name))).digest('hex'),hash);


 const original=fs.readFileSync(path.join(originals,'2. Estadística Bidimensional/7. Flashcards.txt'),'utf8');
 const literal=original.match(/const cardsData = (\[[\s\S]*?\n        \]);/)[1];
 const source=vm.runInNewContext(literal,{}, {timeout:1000});
 const {flashcards,questions,cardsForScope}=await import('../content/activities/catalog.js');
 const cards=cardsForScope('bivariate');
 assert.equal(source.length,20);assert.equal(cards.length,20);assert.equal(flashcards.length,(await import('./helpers/catalog-expectations.mjs')).expectedCatalog.cards);assert.equal(questions.length,(await import('./helpers/catalog-expectations.mjs')).expectedCatalog.questions);
 assert.equal(new Set(flashcards.map(c=>c.id)).size,(await import('./helpers/catalog-expectations.mjs')).expectedCatalog.cards);
 cards.forEach((c,i)=>{assert.equal(c.sourceIndex,i+1);assert.equal(c.category,source[i].category);assert.ok(c.front&&c.back);});
 const categories=[['Conceptos',4],['Covarianza',5],['Correlación',5],['Regresión',6]];
 for(const [topic,size] of [['t01',61],['t02',54],['t03',48],['t04',72],['t05',66],['t06',19]])assert.equal(cardsForScope(topic).length,size);

 const mean=xs=>xs.reduce((a,b)=>a+b,0)/xs.length;
 const moments=p=>{
  const x=p.map(a=>a[0]),y=p.map(a=>a[1]),mx=mean(x),my=mean(y);
  const vx=mean(x.map(a=>(a-mx)**2)),vy=mean(y.map(a=>(a-my)**2));
  const cov=mean(p.map(a=>(a[0]-mx)*(a[1]-my)));
  return {mx,my,vx,vy,cov,r:cov/Math.sqrt(vx*vy)};
 };
 const near=(a,b)=>assert.ok(Math.abs(a-b)<1e-10);
 const p=[[3,4],[5,6],[6,5],[8,9],[9,8]],m=moments(p);
 near((m.cov/m.vx)*(m.cov/m.vy),m.r*m.r);
 const slope=m.cov/m.vx,intercept=m.my-slope*m.mx;
 near(mean(p.map(([x,y])=>y-(slope*x+intercept))),0);
 const sse=p.reduce((s,[x,y])=>s+(y-slope*x-intercept)**2,0);
 near(1-sse/(p.length*m.vy),m.r*m.r);
 near(moments([[0,0],[1,.000002]]).r,1); // Tiny covariance can accompany exact linearity.
 near(moments([[-1,1],[0,0],[1,1]]).r,0); // Nonlinear dependence with zero covariance.
 assert.ok(Number.isNaN(moments([[1,2],[1,3]]).r));
 near(.9**2,.81);
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
 await page.goto(prefix+'tarjetas/index.html?tema=bivariate');await page.getByText('Tarjeta 1 de 20',{exact:true}).waitFor();await ready();
 assert.equal(await deck.getByRole('button',{name:'Anterior',exact:true}).isDisabled(),true);
 assert.equal(await page.locator('[data-card-category] option').count(),5);
 for(let i=0;i<20;i++){
  await page.getByText('Tarjeta '+(i+1)+' de 20',{exact:true}).waitFor();
  await deck.getByRole('button',{name:'Mostrar respuesta',exact:true}).press('Enter');
  await page.locator('[data-content-role="flashcard-back"]').waitFor();await ready();
  for(const [role,expected] of [['flashcard-front',cards[i].front],['flashcard-back',cards[i].back]]){
   const actual=await page.locator('[data-content-role="'+role+'"]').evaluate(el=>({
     text:el.innerText,
     tex:MathJax.startup.document.getMathItemsWithin([el]).map(item=>item.math)
   }));
   const tex=[...expected.matchAll(/\\\(([\s\S]*?)\\\)|\\\[([\s\S]*?)\\\]/g)].map(m=>m[1]??m[2]);
   assert.deepEqual(actual.tex,tex,'Formula mismatch at card '+(i+1)+' '+role);
   for(const part of expected.split(/\\\([\s\S]*?\\\)|\\\[[\s\S]*?\\\]/g).map(t=>t.trim()).filter(Boolean))assert.ok(actual.text.includes(part),'Text mismatch at card '+(i+1)+' '+role);
  }
  assert.equal(await page.locator('[data-content-role="flashcard-category"]').innerText(),cards[i].category);
  assert.equal(await deck.getByRole('button',{name:'Ocultar respuesta',exact:true}).getAttribute('aria-expanded'),'true');
  if(cards[i].back.includes('\\('))assert.ok(await deck.locator('mjx-container').count()>0);
  if(i<19)await deck.getByRole('button',{name:'Siguiente',exact:true}).click();
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
 await page.locator('[data-card-category]').selectOption('Regresión');await ready();
 await deck.getByRole('button',{name:'Siguiente',exact:true}).click();await deck.getByRole('button',{name:'Siguiente',exact:true}).click();
 await deck.getByRole('button',{name:'Mostrar respuesta',exact:true}).click();await page.locator('[data-content-role="flashcard-back"]').waitFor();await ready();
 if(!sub&&process.env.SCREENSHOT_DIR)await deck.screenshot({path:process.env.SCREENSHOT_DIR+'/bidimensional-tarjetas-escritorio.png'});
 await page.locator('[data-reading-controls]>summary').click();await page.locator('[data-text-size]').selectOption('200');await page.locator('[data-contrast-control]').check();await page.locator('[data-highlight-control]').check();await page.setViewportSize({width:340,height:844});await ready();
 assert.match(await deck.locator('[data-content-role="activity-progress"]').innerText(),/3 de 6/);
 assert.match(await page.locator('[data-content-role="flashcard-back"]').innerText(),/diferencias con signo/);
 if(!sub&&process.env.SCREENSHOT_DIR)await deck.screenshot({path:process.env.SCREENSHOT_DIR+'/bidimensional-tarjetas-movil.png'});
 await page.locator('[data-card-category]').selectOption('Covarianza');
 await deck.getByRole('button',{name:'Siguiente',exact:true}).click();
 await deck.getByRole('button',{name:'Mostrar respuesta',exact:true}).click();await page.locator('[data-content-role="flashcard-back"]').waitFor();await ready();
 if(!sub&&process.env.SCREENSHOT_DIR)await deck.screenshot({path:process.env.SCREENSHOT_DIR+'/bidimensional-tarjetas-formula-movil.png'});

 await deck.getByRole('button',{name:'Ocultar respuesta',exact:true}).press('Enter');await ready();
 await page.reload();await page.getByText('Tarjeta 1 de 20',{exact:true}).waitFor();await ready();
 assert.equal(await page.locator('[data-card-category]').inputValue(),'');assert.equal(await page.locator('[data-content-role="flashcard-back"]').count(),0);
 assert.equal(await page.locator('[data-text-size]').inputValue(),'200');
 await page.locator('[data-reading-controls]>summary').click();await page.locator('[data-reset-reading]').click();await page.setViewportSize({width:1280,height:960});
 await page.goto(prefix+'libro/apoyos/estadistica-bidimensional.html#tarjetas');
 await page.getByRole('link',{name:'Abrir las 20 tarjetas y filtrar por categoría',exact:true}).click();await page.getByText('Tarjeta 1 de 20',{exact:true}).waitFor();
 }
 // Shared renderer regression: every older theme plus the global and lesson scopes.
 for(const [topic,size] of [['t01',61],['t02',54],['t03',48],['t04',72],['t05',66],['',(await import('./helpers/catalog-expectations.mjs')).expectedCatalog.cards]]){
 await page.goto(base+'tarjetas/index.html'+(topic?'?tema='+topic:''));await page.getByText('Tarjeta 1 de '+size,{exact:true}).waitFor();
 assert.equal(await page.locator('[data-card-category]').count(),0);
 await deck.getByRole('button',{name:'Mostrar respuesta',exact:true}).click();await page.locator('[data-content-role="flashcard-back"]').waitFor();await ready();
 await deck.getByRole('button',{name:'Siguiente',exact:true}).click();await page.getByText('Tarjeta 2 de '+size,{exact:true}).waitFor();await ready();
 await deck.getByRole('button',{name:'Anterior',exact:true}).click();await page.getByText('Tarjeta 1 de '+size,{exact:true}).waitFor();await ready();
 }

 await page.goto(base+'tarjetas/index.html?tema=t06');await page.getByText('Tarjeta 1 de 19',{exact:true}).waitFor();await ready();
 assert.equal(await page.locator('[data-card-category] option').count(),6);
 await page.locator('[data-card-category]').selectOption('Planteamiento');await ready();
 assert.match(await deck.innerText(),/1 de 5/);
 await deck.getByRole('button',{name:'Mostrar respuesta',exact:true}).click();await page.locator('[data-content-role="flashcard-back"]').waitFor();await ready();
 await page.goto(base+'libro/temas/05-sistemas-de-ecuaciones/11-discusion-de-sistemas-con-parametros.html');
 await deck.waitFor();await deck.getByText('Tarjeta 1 de 6',{exact:true}).waitFor();await deck.getByRole('button',{name:'Mostrar respuesta',exact:true}).click();await ready();
 assert.ok(await page.locator('[data-quiz] input').count()>0);
 assert.deepEqual(errors,[]);assert.deepEqual(external,[]);
 console.log('PASS: 16 original hashes; 20 cards and four categories; 340 cards / 318 questions; all formulas and answers in root/subfolder; keyboard, mobile 200%, filters, reload, six older themes and lesson regression.');
 }finally{for(const context of browser.contexts())for(const page of context.pages())await page.unrouteAll({behavior:'ignoreErrors'});await browser.close();}
})().catch(e=>{console.error(e);process.exitCode=1;});



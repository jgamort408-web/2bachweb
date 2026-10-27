const assert=require('node:assert/strict');
const fs=require('node:fs');
const crypto=require('node:crypto');
const {chromium}=require('playwright');

(async()=>{
 const sources=[
  ['1. Introducción a la probabilidad.txt','7805666e16e1f0b602632fa8d6dd2a8480f4453ff00a7b4b397e104166120d96'],
  ['2. Tipos de probabilidad.txt','ba5abc4e5c9086450b3c7441fdd80420b7b3454647c723117d27bf8142cb2454'],
  ['3. Axiomática de Kolmogorov.txt','ea186d2415662bd9fcc2ee8841f75f3c15625aa4edbc69a97d6e7f2bf3ac6e04'],
  ['4. Tablas de contingencia y diagramas de árboles.txt','b014c0d54663b92251debe0accd1b423c4249c78d92db368d1c1a5597fdb14b8'],
  ['5. Probabilidad total y Teorema de Bayes.txt','87ec5c86cd1ece3d8d9461ca5a17bbcb079e2b95f37ebd8f75e95acbdabe57e2']
 ];
 for(const [name,hash] of sources)assert.equal(crypto.createHash('sha256').update(fs.readFileSync('../Página web existente/3. Probabilidad/'+name)).digest('hex'),hash);
 const {probabilityQuestions}=await import('../content/activities/probability-test.js');
 const {questions,questionsForScope,flashcards}=await import('../content/activities/catalog.js');
 assert.equal(probabilityQuestions.length,60);assert.equal(questionsForScope('t07').length,60);
 assert.equal(questions.length,(await import('./helpers/catalog-expectations.mjs')).expectedCatalog.questions);assert.equal(flashcards.length,(await import('./helpers/catalog-expectations.mjs')).expectedCatalog.cards);
 assert.equal(new Set(questions.map(q=>q.id)).size,(await import('./helpers/catalog-expectations.mjs')).expectedCatalog.questions);
 probabilityQuestions.slice(0,9).forEach((q,i)=>{assert.equal(q.sourceIndex,i+1);assert.equal(q.correct,'abc'[i%3]);assert.equal(q.options.length,4);assert.ok(q.prompt&&q.hint&&q.explanation);});
 probabilityQuestions.slice(9).forEach((q,i)=>{assert.equal(q.origin,'ampliacion');assert.equal(q.correct,'abc'[i%3]);assert.equal(q.options.length,4);assert.ok(q.lessonId&&q.sourceFile&&q.prompt&&q.hint&&q.explanation);});
 assert.deepEqual(probabilityQuestions.slice(15,21).map(q=>q.lessonId),['t07-e03','t07-e03','t07-e03','t07-e04','t07-e04','t07-e04']);
 assert.deepEqual(probabilityQuestions.slice(21,27).map(q=>q.lessonId),['t07-e05','t07-e05','t07-e05','t07-e06','t07-e06','t07-e06']);
 assert.deepEqual(probabilityQuestions.slice(27,33).map(q=>q.lessonId),['t07-e07','t07-e07','t07-e07','t07-e08','t07-e08','t07-e08']);
 assert.deepEqual(probabilityQuestions.slice(33,39).map(q=>q.lessonId),['t07-e09','t07-e09','t07-e09','t07-e10','t07-e10','t07-e10']);
 assert.deepEqual(probabilityQuestions.slice(39,45).map(q=>q.lessonId),['t07-e04','t07-e03','t07-e08','t07-e10','t07-e02','t07-e06']);
 assert.deepEqual(probabilityQuestions.slice(45).map(q=>q.lessonId),['t07-e01','t07-e01','t07-e02','t07-e08','t07-e06','t07-e01','t07-e08','t07-e07','t07-e07','t07-e07','t07-e08','t07-e09','t07-e10','t07-e10','t07-e10']);
 assert.deepEqual(probabilityQuestions.slice(15).map(q=>q.id),Array.from({length:45},(_,i)=>'q-t07-base-'+(i+16)));
 assert.equal(0.35+0.25+0.15,0.75);
 assert.equal(0.35/0.60,7/12);
 assert.notEqual(0.35,0.60*0.50);
 assert.equal(850/10000,0.085);
 assert.equal((2+3)/10,0.5);
 assert.equal(4/20,0.2);
 assert.equal(-0.1+0.4+0.7,1);
 assert.equal(1-0.2-0.3,0.5);
 assert.equal(1-0.72,0.28);
 assert.ok(0.68>0.55);
 assert.ok(Math.abs((0.55+0.42-0.17)-0.80)<1e-12);
 assert.ok(Math.abs((0.4*0.6+0.6*0.4)-0.48)<1e-12);
 assert.equal((2/3)*(2/3),4/9);
 assert.equal(1-0,1);
 assert.ok(Math.abs((0.18/0.30)-0.60)<1e-12);
 assert.ok(Math.abs((0.40*0.30)-0.12)<1e-12);
 assert.ok(Math.abs((0.70*0.02+0.30*0.05)-0.029)<1e-12);
 assert.ok(Math.abs((1-(0.3*0.8+0.7*0.2))-0.62)<1e-12);
 assert.ok(Math.abs((0.30*0.05/0.029)-(15/29))<1e-12);
 assert.ok(Math.abs((0.05*0.80/(0.05*0.80+0.95*0.10))-(8/27))<1e-12);
 assert.ok(Math.abs((0.03/(0.06+0.03+0.01))-0.30)<1e-12);
 assert.equal(90+30,120);assert.equal(40+40,80);assert.equal(90+40,130);assert.equal(30+40,70);
 assert.ok(Math.abs((130/200)-0.65)<1e-12);
 assert.ok(Math.abs((30/200)-0.15)<1e-12);
 assert.ok(Math.abs((40/80)-0.50)<1e-12);
 assert.ok(Math.abs((40/130)-(4/13))<1e-12);
 assert.ok(Math.abs(((120+130-90)/200)-0.80)<1e-12);
 assert.notEqual(90/200,(120/200)*(130/200));
 assert.equal(6*6,36);assert.equal(6/36,1/6);assert.equal(3/36,1/12);assert.equal((3/36)/(6/36),1/2);assert.equal(3/36,(6/36)*(18/36));
 assert.equal(3/5,0.6);assert.equal(2/4,1/2);assert.equal((3/5)*(2/4),3/10);assert.ok(Math.abs(((3/5)*(2/4)+(2/5)*(3/4))-3/5)<1e-12);assert.equal(1-(2/5)*(1/4),9/10);
 assert.ok(Math.abs(0.60*0.10-0.06)<1e-12);assert.ok(Math.abs(0.60*0.10+0.40*0.30-0.18)<1e-12);assert.ok(Math.abs((0.40*0.30)/0.18-2/3)<1e-12);assert.ok(Math.abs((0.60*0.10)/0.18-1/3)<1e-12);
 probabilityQuestions.slice(55).forEach(q=>{assert.equal(q.table?.headers.length,3);assert.equal(q.table?.rows.length,2);});
 const browser=await chromium.launch({headless:true,executablePath:process.env.CHROME_PATH});
 const base='http://127.0.0.1:4173/';
 try{
  const page=await browser.newPage({viewport:{width:1200,height:900}}),errors=[];
  page.on('pageerror',e=>errors.push(e.message));
  page.on('response',r=>{if(r.status()>=400&&!r.url().endsWith('favicon.ico'))errors.push(r.status()+' '+r.url());});
  for(const prefix of [base,base+'prueba-subcarpeta/']){
   if(prefix!==base)await page.route(prefix+'**',async route=>{const response=await route.fetch({url:route.request().url().replace(prefix,base)});await route.fulfill({response});});
   await page.goto(prefix+'libro/temas/07-probabilidad/index.html#test');
   assert.equal(await page.locator('#test a[href*="tema=t07"]').count(),1);
   await page.goto(prefix+'test/index.html?tema=t07');
   await page.waitForFunction(()=>document.querySelector('[data-quiz] [data-content-role="activity-progress"]')?.textContent.includes('Pregunta 1 de 60'));
   assert.match(await page.locator('[data-scope-label]').innerText(),/60 preguntas/);
   assert.equal(await page.locator('[data-quiz] input[type="radio"]').count(),4);
   assert.equal(await page.locator('[data-mml-node="merror"]').count(),0);
  }
  await page.unrouteAll({behavior:'wait'});
  await page.goto(base+'test/index.html?tema=t07');
  await page.waitForFunction(()=>document.querySelector('[data-quiz] [data-content-role="activity-progress"]')?.textContent.includes('Pregunta 1 de 60'));
  await page.waitForFunction(()=>!document.querySelector('[data-quiz] button')?.disabled);
  await page.locator('[data-quiz] button').nth(0).click();
  assert.match(await page.locator('[data-quiz] [data-content-role="feedback"]').innerText(),/Selecciona una respuesta/);
  await page.locator('[data-quiz] button').nth(1).click();
  assert.match(await page.locator('[data-quiz] [data-content-role="feedback"]').innerText(),/Pista:/);
  for(let i=0;i<60;i++){
   await page.waitForFunction(()=>!document.querySelector('[data-quiz] button')?.disabled);
   assert.equal(await page.locator('[data-quiz] input[type="radio"]').count(),4);
   if(i===0){
    await page.locator('[data-quiz] input[value="d"]').check();
    await page.locator('[data-quiz] button').nth(0).click();
    await page.waitForFunction(()=>document.querySelector('[data-quiz] [data-content-role="feedback"]')?.textContent.includes('Revisa tu respuesta.'));
    assert.match(await page.locator('[data-quiz] [data-content-role="feedback"]').innerText(),/La unión solo/);
   }
   await page.locator('[data-quiz] input[value="'+probabilityQuestions[i].correct+'"]').check();
   await page.locator('[data-quiz] button').nth(0).click();
   await page.waitForFunction(()=>document.querySelector('[data-quiz] [data-content-role="feedback"]')?.textContent.includes('Correcta.'));
   assert.equal(await page.locator('[data-mml-node="merror"]').count(),0);
   if(i===15||i===19||(i>=39&&i<45)||i>=55)assert.equal(await page.locator('[data-quiz] table caption').count(),1);
   if(i===0)await page.locator('[data-quiz] button').nth(2).press('Enter');
   else await page.locator('[data-quiz] button').nth(2).click();
  }
  await page.waitForFunction(()=>document.querySelector('[data-quiz] [data-content-role="activity-progress"]')?.textContent.includes('Sesión terminada'));
  assert.match(await page.locator('[data-quiz]').innerText(),/59 de 60 respuestas correctas/);
  await page.setViewportSize({width:390,height:844});await page.evaluate(()=>document.documentElement.style.fontSize='200%');
  assert.equal(await page.evaluate(()=>document.documentElement.scrollWidth>innerWidth),false);
  await page.reload();
  await page.waitForFunction(()=>document.querySelector('[data-quiz] [data-content-role="activity-progress"]')?.textContent.includes('Pregunta 1 de 60'));
  const reading=await browser.newPage({javaScriptEnabled:false,viewport:{width:390,height:844}});
  await reading.goto(base+'test/probabilidad-preguntas.html');
  assert.equal(await reading.locator('details').count(),60);
  assert.equal(await reading.locator('table caption').count(),4);
  assert.equal(await reading.locator('#repaso-integrado table th[scope="col"]').count(),4);
  assert.equal(await reading.locator('#repaso-integrado table th[scope="row"]').count(),3);
  assert.equal(await reading.locator('#dos-canales table th[scope="col"]').count(),3);
  assert.equal(await reading.locator('#dos-canales table th[scope="row"]').count(),2);
  await reading.evaluate(()=>document.documentElement.style.fontSize='200%');
  assert.equal(await reading.evaluate(()=>document.documentElement.scrollWidth>innerWidth),false);
  await reading.locator('details').first().locator('summary').click();
  assert.match(await reading.locator('details').first().innerText(),/P\(A\\cup B\)/);
  await reading.close();
  assert.deepEqual(errors,[]);
  console.log('PASS: nueve autoevaluaciones y cincuenta y una ampliaciones, preguntas globales del catálogo, MathJax, tablas, corrección, pista, teclado, raíz/subcarpeta, móvil y lectura sin JS.');
 }finally{await browser.close();}
})().catch(e=>{console.error(e);process.exitCode=1;});

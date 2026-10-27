const assert=require('node:assert/strict');
const fs=require('node:fs');
const crypto=require('node:crypto');
const vm=require('node:vm');
const {chromium}=require('playwright');
(async()=>{
 const source=fs.readFileSync('../Página web existente/5. Inferencia Estadística/7. Tipo test.txt');
 assert.equal(crypto.createHash('sha256').update(source).digest('hex'),'24f01ad2e6cd85f317f791ca963cd49ae69f2350a706025a8b4f00da25fbba21');
 const original=vm.runInNewContext(source.toString('utf8').match(/const questions = (\[[\s\S]*?\n        \]);/)[1],{}, {timeout:1000});
 const {inferenceQuestions}=await import('../content/activities/inference-test.js');
 const {questions,questionsForScope,flashcards}=await import('../content/activities/catalog.js');
 assert.equal(original.length,20);assert.equal(inferenceQuestions.length,20);
 assert.equal(questionsForScope('t09').length,20);assert.equal(questions.length,347);assert.equal(flashcards.length,405);
 assert.equal(new Set(questions.map(q=>q.id)).size,347);
 inferenceQuestions.forEach((q,i)=>{assert.equal(q.sourceIndex,i+1);assert.equal(q.correct,String.fromCharCode(97+original[i].correct));assert.equal(q.options.length,4);assert.ok(q.prompt&&q.hint&&q.explanation);});
 const base='http://127.0.0.1:4173/';
 const browser=await chromium.launch({headless:true,executablePath:process.env.CHROME_PATH});
 try{
  const page=await browser.newPage({viewport:{width:1200,height:900}}),errors=[];
  page.on('pageerror',e=>errors.push(e.message));page.on('response',r=>{if(r.status()>=400&&!r.url().endsWith('favicon.ico'))errors.push(r.status()+' '+r.url());});
  for(const prefix of [base,base+'prueba-subcarpeta/']){
   if(prefix!==base)await page.route(prefix+'**',async route=>{const response=await route.fetch({url:route.request().url().replace(prefix,base)});await route.fulfill({response});});
   await page.goto(prefix+'libro/temas/09-inferencia-estadistica/index.html#test');assert.equal(await page.locator('#test a[href*="tema=t09"]').count(),1);
   await page.goto(prefix+'test/index.html?tema=t09');
   await page.waitForFunction(()=>document.querySelector('[data-quiz] [data-content-role="activity-progress"]')?.textContent.includes('Pregunta 1 de 20'));
   assert.match(await page.locator('[data-scope-label]').innerText(),/20 preguntas/);
   assert.equal(await page.locator('[data-mml-node="merror"]').count(),0);
   await page.locator('[data-quiz] button').nth(0).click();
   assert.match(await page.locator('[data-quiz] [data-content-role="feedback"]').innerText(),/Selecciona una respuesta/);
   await page.locator('[data-quiz] button').nth(1).click();
   assert.match(await page.locator('[data-quiz] [data-content-role="feedback"]').innerText(),/Pista:/);
   await page.locator('[data-quiz] input[value="b"]').check();await page.locator('[data-quiz] button').nth(0).click();
   await page.waitForFunction(()=>document.querySelector('[data-quiz] [data-content-role="feedback"]')?.textContent.includes('Correcta.'));
   await page.locator('[data-quiz] button').nth(2).press('Enter');
   await page.waitForFunction(()=>document.querySelector('[data-quiz] [data-content-role="activity-progress"]')?.textContent.includes('Pregunta 2 de 20'));
  }
  await page.goto(base+'test/index.html?tema=t09');await page.waitForFunction(()=>document.querySelector('[data-quiz] [data-content-role="activity-progress"]')?.textContent.includes('Pregunta 1 de 20'));
  for(let i=0;i<20;i++){
   await page.locator('[data-quiz] input[value="'+inferenceQuestions[i].correct+'"]').check();await page.locator('[data-quiz] button').nth(0).click();
   await page.waitForFunction(()=>document.querySelector('[data-quiz] [data-content-role="feedback"]')?.textContent.includes('Correcta.'));
   assert.equal(await page.locator('[data-mml-node="merror"]').count(),0);
   await page.locator('[data-quiz] button').nth(2).click();
  }
  await page.waitForFunction(()=>document.querySelector('[data-quiz] [data-content-role="activity-progress"]')?.textContent.includes('Sesión terminada'));
  assert.match(await page.locator('[data-quiz]').innerText(),/20 de 20 respuestas correctas/);
  await page.setViewportSize({width:390,height:844});await page.evaluate(()=>document.documentElement.style.fontSize='200%');
  assert.equal(await page.evaluate(()=>document.documentElement.scrollWidth>innerWidth),false);
  await page.reload();await page.waitForFunction(()=>document.querySelector('[data-quiz] [data-content-role="activity-progress"]')?.textContent.includes('Pregunta 1 de 20'));
  const reading=await browser.newPage({javaScriptEnabled:false,viewport:{width:390,height:844}});
  await reading.goto(base+'test/inferencia-preguntas.html');
  assert.equal(await reading.locator('details').count(),20);
  await reading.locator('details').first().locator('summary').click();
  assert.match(await reading.locator('details').first().innerText(),/Respuesta: B/);
  await reading.close();
  assert.deepEqual(errors,[]);
  console.log('PASS: 20 originales, 347 preguntas, corrección, pistas, sesión, teclado, MathJax, raíz/subcarpeta, móvil, recarga y lectura sin JS.');
 }finally{await browser.close();}
})().catch(e=>{console.error(e);process.exitCode=1;});


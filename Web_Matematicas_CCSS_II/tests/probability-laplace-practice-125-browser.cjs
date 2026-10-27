const assert=require('node:assert/strict');
const fs=require('node:fs');
const crypto=require('node:crypto');
const {chromium}=require('playwright');
(async()=>{
 for(const [name,hash] of [
  ['1. Introducción a la probabilidad.txt','7805666e16e1f0b602632fa8d6dd2a8480f4453ff00a7b4b397e104166120d96'],
  ['2. Tipos de probabilidad.txt','ba5abc4e5c9086450b3c7441fdd80420b7b3454647c723117d27bf8142cb2454']
 ])assert.equal(crypto.createHash('sha256').update(fs.readFileSync('../Página web existente/3. Probabilidad/'+name)).digest('hex'),hash);
 const {generateLaplaceQuestions}=await import('../content/models/probability-laplace-practice.js');
 for(let seed=0;seed<2000;seed++){
  const questions=generateLaplaceQuestions(seed);assert.equal(questions.length,6);
  assert.deepEqual(questions.map(q=>q.kind),['die','urn','deck','die','urn','deck']);
  for(const q of questions){
   assert.ok(q.favorable>0&&q.favorable<q.total);
   assert.equal(q.options.length,4);assert.equal(new Set(q.options.map(o=>o.text)).size,4);
   const values=q.options.map(o=>{const [,a,b]=o.text.match(/frac\{(\d+)\}\{(\d+)\}/);return Number(a)/Number(b);});
   assert.equal(new Set(values).size,4);assert.equal(values[0],q.favorable/q.total);
   assert.ok(q.prompt&&q.hint&&q.explanation);
  }
 }
 const browser=await chromium.launch({headless:true,executablePath:process.env.CHROME_PATH});
 const base='http://127.0.0.1:4173/';
 try{
  const page=await browser.newPage({viewport:{width:1200,height:900}}),errors=[];
  page.on('pageerror',e=>errors.push(e.message));page.on('response',r=>{if(r.status()>=400&&!r.url().endsWith('favicon.ico'))errors.push(r.status()+' '+r.url());});
  for(const prefix of [base,base+'prueba-subcarpeta/']){
   if(prefix!==base)await page.route(prefix+'**',async route=>{const response=await route.fetch({url:route.request().url().replace(prefix,base)});await route.fulfill({response});});
   await page.goto(prefix+'libro/temas/07-probabilidad/01-sucesos-regla-de-laplace.html#practica');
   await page.waitForFunction(()=>document.querySelector('[data-laplace-practice] [data-content-role="activity-progress"]')?.textContent.includes('Pregunta 1 de 6'));
   assert.equal(await page.locator('[data-laplace-practice] input').count(),4);
   assert.equal(await page.locator('[data-mml-node="merror"]').count(),0);
  }
  await page.unrouteAll({behavior:'wait'});
  await page.goto(base+'libro/temas/07-probabilidad/01-sucesos-regla-de-laplace.html#practica');
  const root=page.locator('[data-laplace-practice]');
  await page.waitForFunction(()=>document.querySelector('[data-laplace-practice] [data-content-role="activity-progress"]')?.textContent.includes('Pregunta 1 de 6'));
  await root.locator('button').nth(0).click();assert.match(await root.locator('[data-content-role="feedback"]').innerText(),/Selecciona/);
  await root.locator('button').nth(1).click();assert.match(await root.locator('[data-content-role="feedback"]').innerText(),/Pista/);
  await root.locator('input[value="b"]').check();await root.locator('button').nth(0).click();assert.match(await root.locator('[data-content-role="feedback"]').innerText(),/Revisa/);
  await root.locator('input[value="a"]').check();await root.locator('button').nth(0).click();assert.match(await root.locator('[data-content-role="feedback"]').innerText(),/Correcta/);
  await root.locator('button').nth(2).press('Enter');
  for(let i=1;i<6;i++){
   await root.locator('input[value="a"]').check();await root.locator('button').nth(0).click();
   assert.match(await root.locator('[data-content-role="feedback"]').innerText(),/Correcta/);
   await root.locator('button').nth(2).click();
  }
  assert.match(await root.innerText(),/5 de 6 respuestas correctas al primer intento/);
  const firstSeed=await root.getAttribute('data-seed');await root.locator('button').nth(2).click();
  await page.waitForFunction(()=>document.querySelector('[data-laplace-practice] [data-content-role="activity-progress"]')?.textContent.includes('Pregunta 1 de 6'));
  assert.ok(await root.getAttribute('data-seed'));assert.equal(await page.locator('[data-mml-node="merror"]').count(),0);
  await page.setViewportSize({width:390,height:844});await page.evaluate(()=>document.documentElement.style.fontSize='200%');
  assert.equal(await page.evaluate(()=>document.documentElement.scrollWidth>innerWidth),false);
  const reading=await browser.newPage({javaScriptEnabled:false});await reading.goto(base+'libro/temas/07-probabilidad/01-sucesos-regla-de-laplace.html#practica');
  assert.equal(await reading.locator('#ejemplos details').count(),4);assert.equal(await reading.locator('#cuando-no details').count(),1);assert.equal(await reading.locator('#practica noscript a').count(),1);await reading.close();
  assert.deepEqual(errors,[]);
  console.log('PASS: 2000 semillas, seis preguntas, fracciones, MathJax, corrección, pista, teclado, subcarpeta, móvil y fallback sin JS.');
 }finally{await browser.close();}
})().catch(e=>{console.error(e);process.exitCode=1;});

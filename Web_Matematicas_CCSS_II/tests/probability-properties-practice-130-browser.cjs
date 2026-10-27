const assert=require('node:assert/strict');
const fs=require('node:fs');
const crypto=require('node:crypto');
const {chromium}=require('playwright');
(async()=>{
 const source=fs.readFileSync('../Página web existente/3. Probabilidad/3. Axiomática de Kolmogorov.txt');
 assert.equal(crypto.createHash('sha256').update(source).digest('hex'),'ea186d2415662bd9fcc2ee8841f75f3c15625aa4edbc69a97d6e7f2bf3ac6e04');
 const {generatePropertiesPractice}=await import('../content/models/probability-properties-practice.js');
 for(let seed=0;seed<2000;seed++){
  const questions=generatePropertiesPractice(seed);assert.equal(questions.length,6);
  assert.deepEqual(questions.map(q=>q.kind),['complement','union','intersection','neither','monotonicity','incompatible']);
  for(const q of questions){assert.equal(q.options.length,4);assert.equal(new Set(q.options.map(o=>o.text)).size,4);assert.ok(q.prompt&&q.hint&&q.explanation);assert.equal(q.correct,'a');}
  for(const q of questions.slice(0,4)){
   const r=q.regions;assert.equal(r.intersection+r.onlyA+r.onlyB+r.neither,20);
   assert.equal(r.a,r.intersection+r.onlyA);assert.equal(r.b,r.intersection+r.onlyB);
   assert.equal(r.union,r.a+r.b-r.intersection);assert.ok(r.union<=20);
   assert.equal(Number(q.options[0].text.match(/frac\{(\d+)\}\{20\}/)[1]),q.expected);
  }
  assert.ok(questions[4].lower<questions[4].upper);
  assert.ok(questions[5].disjointA>0&&questions[5].disjointB>0&&questions[5].disjointA+questions[5].disjointB<=10);
 }
 const browser=await chromium.launch({headless:true,executablePath:process.env.CHROME_PATH});
 const base='http://127.0.0.1:4173/';
 try{
  const page=await browser.newPage({viewport:{width:1200,height:900}}),errors=[];
  page.on('pageerror',e=>errors.push(e.message));page.on('response',r=>{if(r.status()>=400&&!r.url().endsWith('favicon.ico'))errors.push(r.status()+' '+r.url());});
  for(const prefix of [base,base+'prueba-subcarpeta/']){
   if(prefix!==base)await page.route(prefix+'**',async route=>{const response=await route.fetch({url:route.request().url().replace(prefix,base)});await route.fulfill({response});});
   await page.goto(prefix+'libro/temas/07-probabilidad/06-propiedades-de-la-probabilidad.html#practica');
   await page.waitForFunction(()=>document.querySelector('[data-properties-practice] [data-content-role="activity-progress"]')?.textContent.includes('Pregunta 1 de 6'));
   assert.equal(await page.locator('[data-properties-practice] input').count(),4);
   assert.equal(await page.locator('[data-mml-node="merror"]').count(),0);
  }
  await page.unrouteAll({behavior:'wait'});
  await page.goto(base+'libro/temas/07-probabilidad/06-propiedades-de-la-probabilidad.html#practica');
  const root=page.locator('[data-properties-practice]');
  await page.waitForFunction(()=>document.querySelector('[data-properties-practice] [data-content-role="activity-progress"]')?.textContent.includes('Pregunta 1 de 6'));
  await root.locator('button').nth(0).click();assert.match(await root.locator('[data-content-role="feedback"]').innerText(),/Selecciona/);
  await root.locator('button').nth(1).click();assert.match(await root.locator('[data-content-role="feedback"]').innerText(),/Pista/);
  await root.locator('input[value="b"]').check();await root.locator('button').nth(0).click();assert.match(await root.locator('[data-content-role="feedback"]').innerText(),/Revisa/);
  await root.locator('input[value="a"]').check();await root.locator('button').nth(0).click();assert.match(await root.locator('[data-content-role="feedback"]').innerText(),/Correcta/);
  await root.locator('button').nth(2).press('Enter');
  for(let i=1;i<6;i++){
   await root.locator('input[value="a"]').check();await root.locator('button').nth(0).click();assert.match(await root.locator('[data-content-role="feedback"]').innerText(),/Correcta/);
   assert.equal(await page.locator('[data-mml-node="merror"]').count(),0);
   await root.locator('button').nth(2).click();
  }
  assert.match(await root.innerText(),/5 de 6 respuestas correctas al primer intento/);
  await root.locator('button').nth(2).click();await page.waitForFunction(()=>document.querySelector('[data-properties-practice] [data-content-role="activity-progress"]')?.textContent.includes('Pregunta 1 de 6'));
  await page.setViewportSize({width:390,height:844});await page.evaluate(()=>document.documentElement.style.fontSize='200%');
  assert.equal(await page.evaluate(()=>document.documentElement.scrollWidth>innerWidth),false);
  const reading=await browser.newPage({javaScriptEnabled:false});await reading.goto(base+'libro/temas/07-probabilidad/06-propiedades-de-la-probabilidad.html#practica');
  assert.equal(await reading.locator('#ejemplos details').count(),2);assert.equal(await reading.locator('#practica noscript a').count(),1);await reading.close();
  assert.deepEqual(errors,[]);
  console.log('PASS: 2000 variantes, seis propiedades, regiones coherentes, MathJax, corrección, teclado, subcarpeta, móvil y fallback sin JS.');
 }finally{await browser.close();}
})().catch(e=>{console.error(e);process.exitCode=1;});

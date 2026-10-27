const assert=require('node:assert/strict');
const fs=require('node:fs');
const crypto=require('node:crypto');
const {chromium}=require('playwright');
(async()=>{
 const source=fs.readFileSync('../Página web existente/3. Probabilidad/3. Axiomática de Kolmogorov.txt');
 assert.equal(crypto.createHash('sha256').update(source).digest('hex'),'ea186d2415662bd9fcc2ee8841f75f3c15625aa4edbc69a97d6e7f2bf3ac6e04');
 const {generateAxiomsPractice}=await import('../content/models/probability-axioms-practice.js');
 for(let seed=0;seed<2000;seed++){
  const questions=generateAxiomsPractice(seed);assert.equal(questions.length,6);
  assert.deepEqual(questions.map(q=>q.kind),['nonnegative','normalization','additivity','impossible','complement','twoOutcomes']);
  for(const q of questions){assert.equal(q.options.length,4);assert.equal(new Set(q.options.map(o=>o.text)).size,4);assert.ok(q.prompt&&q.hint&&q.explanation);assert.equal(q.correct,'a');}
  const read=q=>Number(q.options[0].text.match(/frac\{(\d+)\}\{10\}/)?.[1]);
  assert.equal(read(questions[1]),questions[1].expected);
  assert.equal(read(questions[2]),questions[2].expected);
  assert.equal(read(questions[4]),questions[4].expected);
  assert.equal(read(questions[5]),questions[5].expected);
  assert.match(questions[3].options[0].text,/\\varnothing/);
  assert.ok(!questions.some(q=>/\u000b/.test(q.explanation)));
 }
 const browser=await chromium.launch({headless:true,executablePath:process.env.CHROME_PATH});
 const base='http://127.0.0.1:4173/';
 try{
  const page=await browser.newPage({viewport:{width:1200,height:900}}),errors=[];
  page.on('pageerror',e=>errors.push(e.message));page.on('response',r=>{if(r.status()>=400&&!r.url().endsWith('favicon.ico'))errors.push(r.status()+' '+r.url());});
  for(const prefix of [base,base+'prueba-subcarpeta/']){
   if(prefix!==base)await page.route(prefix+'**',async route=>{const response=await route.fetch({url:route.request().url().replace(prefix,base)});await route.fulfill({response});});
   await page.goto(prefix+'libro/temas/07-probabilidad/05-axiomatica-de-kolmogorov.html#practica');
   await page.waitForFunction(()=>document.querySelector('[data-axioms-practice] [data-content-role="activity-progress"]')?.textContent.includes('Pregunta 1 de 6'));
   assert.equal(await page.locator('[data-axioms-practice] input').count(),4);
   assert.equal(await page.locator('[data-mml-node="merror"]').count(),0);
  }
  await page.unrouteAll({behavior:'wait'});
  await page.goto(base+'libro/temas/07-probabilidad/05-axiomatica-de-kolmogorov.html#practica');
  const root=page.locator('[data-axioms-practice]');
  await page.waitForFunction(()=>document.querySelector('[data-axioms-practice] [data-content-role="activity-progress"]')?.textContent.includes('Pregunta 1 de 6'));
  await root.locator('button').nth(0).click();assert.match(await root.locator('[data-content-role="feedback"]').innerText(),/Selecciona/);
  await root.locator('button').nth(1).click();assert.match(await root.locator('[data-content-role="feedback"]').innerText(),/Pista/);
  await root.locator('input[value="b"]').check();await root.locator('button').nth(0).click();assert.match(await root.locator('[data-content-role="feedback"]').innerText(),/Revisa/);
  await root.locator('input[value="a"]').check();await root.locator('button').nth(0).click();assert.match(await root.locator('[data-content-role="feedback"]').innerText(),/Correcta/);
  await root.locator('button').nth(2).press('Enter');
  for(let i=1;i<6;i++){
   await root.locator('input[value="a"]').check();await root.locator('button').nth(0).click();
   assert.match(await root.locator('[data-content-role="feedback"]').innerText(),/Correcta/);
   assert.equal(await page.locator('[data-mml-node="merror"]').count(),0);
   await root.locator('button').nth(2).click();
  }
  assert.match(await root.innerText(),/5 de 6 respuestas correctas al primer intento/);
  await root.locator('button').nth(2).click();await page.waitForFunction(()=>document.querySelector('[data-axioms-practice] [data-content-role="activity-progress"]')?.textContent.includes('Pregunta 1 de 6'));
  await page.setViewportSize({width:390,height:844});await page.evaluate(()=>document.documentElement.style.fontSize='200%');
  assert.equal(await page.evaluate(()=>document.documentElement.scrollWidth>innerWidth),false);
  const reading=await browser.newPage({javaScriptEnabled:false});await reading.goto(base+'libro/temas/07-probabilidad/05-axiomatica-de-kolmogorov.html#practica');
  assert.equal(await reading.locator('#ejemplo details').count(),2);assert.equal(await reading.locator('#asignaciones details').count(),1);assert.equal(await reading.locator('#practica noscript a').count(),1);await reading.close();
  assert.deepEqual(errors,[]);
  console.log('PASS: 2000 variantes, seis axiomas y consecuencias, MathJax, corrección, teclado, subcarpeta, móvil y fallback sin JS.');
 }finally{await browser.close();}
})().catch(e=>{console.error(e);process.exitCode=1;});

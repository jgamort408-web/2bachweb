const assert=require('node:assert/strict');
const fs=require('node:fs');
const crypto=require('node:crypto');
const {chromium}=require('playwright');
(async()=>{
 const original=fs.readFileSync('../Página web existente/3. Probabilidad/5. Probabilidad total y Teorema de Bayes.txt');
 assert.equal(crypto.createHash('sha256').update(original).digest('hex'),'87ec5c86cd1ece3d8d9461ca5a17bbcb079e2b95f37ebd8f75e95acbdabe57e2');
 const {generateBayesPractice}=await import('../content/models/probability-bayes-practice.js');
 const kinds=['two-total','first-posterior','second-posterior','three-total','middle-posterior','third-posterior'];
 for(let seed=0;seed<2000;seed++){
  const qs=generateBayesPractice(seed);assert.deepEqual(qs.map(q=>q.kind),kinds);
  assert.deepEqual(qs[0].weights,qs[1].weights);assert.deepEqual(qs[1].weights,qs[2].weights);
  assert.deepEqual(qs[3].weights,qs[4].weights);assert.deepEqual(qs[4].weights,qs[5].weights);
  assert.equal(qs[1].numerator+qs[2].numerator,qs[0].numerator);
  assert.equal(qs[1].denominator,qs[0].numerator);assert.equal(qs[2].denominator,qs[0].numerator);
  assert.equal(qs[4].denominator,qs[3].numerator);assert.equal(qs[5].denominator,qs[3].numerator);
  for(const q of qs){
   assert.equal(q.weights.reduce((a,b)=>a+b),10);assert.ok(q.weights.every(x=>x>0));
   assert.deepEqual(q.contributions,q.weights.map((w,i)=>w*q.rates[i]));
   assert.equal(q.table.rows.length,q.weights.length);assert.ok(q.numerator>0&&q.numerator<q.denominator);
   assert.ok(q.prompt&&q.hint&&q.explanation);assert.equal(q.correct,'a');
   const choices=q.options.map(o=>o.text.match(/frac\{(\d+)\}\{(\d+)\}/).slice(1).map(Number));
   assert.equal(new Set(choices.map(([n,d])=>(n/d).toFixed(12))).size,4);
   assert.equal(choices[0][0]*q.denominator,q.numerator*choices[0][1]);
  }
  assert.equal(qs[0].numerator,qs[0].contributions.reduce((a,b)=>a+b));
  assert.equal(qs[3].numerator,qs[3].contributions.reduce((a,b)=>a+b));
  assert.equal(qs[3].contributions[0]+qs[4].numerator+qs[5].numerator,qs[3].numerator);
 }
 const browser=await chromium.launch({headless:true,executablePath:process.env.CHROME_PATH});
 const base='http://127.0.0.1:4173/';
 try{
  const page=await browser.newPage({viewport:{width:1200,height:900}}),errors=[];
  page.on('pageerror',e=>errors.push(e.message));page.on('response',r=>{if(r.status()>=400&&!r.url().endsWith('favicon.ico'))errors.push(r.status()+' '+r.url());});
  for(const prefix of [base,base+'prueba-subcarpeta/']){
   if(prefix!==base)await page.route(prefix+'**',async route=>{const response=await route.fetch({url:route.request().url().replace(prefix,base)});await route.fulfill({response});});
   await page.goto(prefix+'libro/temas/07-probabilidad/10-teorema-de-bayes.html#practica');
   await page.waitForFunction(()=>document.querySelector('[data-bayes-practice] [data-content-role="activity-progress"]')?.textContent.includes('Pregunta 1 de 6'));
   assert.equal(await page.locator('[data-bayes-practice] input').count(),4);assert.equal(await page.locator('[data-bayes-practice] table').count(),1);
   assert.equal(await page.locator('[data-mml-node="merror"]').count(),0);
  }
  await page.unrouteAll({behavior:'wait'});
  await page.goto(base+'libro/temas/07-probabilidad/10-teorema-de-bayes.html#practica');
  const root=page.locator('[data-bayes-practice]');await page.waitForFunction(()=>document.querySelector('[data-bayes-practice] [data-content-role="activity-progress"]')?.textContent.includes('Pregunta 1 de 6'));
  await root.locator('button').nth(0).click();assert.match(await root.locator('[data-content-role="feedback"]').innerText(),/Selecciona/);
  await root.locator('button').nth(1).click();assert.match(await root.locator('[data-content-role="feedback"]').innerText(),/Pista/);
  await root.locator('input[value="b"]').check();await root.locator('button').nth(0).click();assert.match(await root.locator('[data-content-role="feedback"]').innerText(),/Revisa/);
  await root.locator('input[value="a"]').check();await root.locator('button').nth(0).click();assert.match(await root.locator('[data-content-role="feedback"]').innerText(),/Correcta/);
  await root.locator('button').nth(2).press('Enter');
  for(let i=1;i<6;i++){
   await root.locator('input[value="a"]').check();await root.locator('button').nth(0).click();assert.match(await root.locator('[data-content-role="feedback"]').innerText(),/Correcta/);
   assert.equal(await page.locator('[data-mml-node="merror"]').count(),0);await root.locator('button').nth(2).click();
  }
  assert.match(await root.innerText(),/5 de 6 respuestas correctas al primer intento/);
  await root.locator('button').nth(2).click();await page.waitForFunction(()=>document.querySelector('[data-bayes-practice] [data-content-role="activity-progress"]')?.textContent.includes('Pregunta 1 de 6'));
  await page.setViewportSize({width:390,height:844});await page.evaluate(()=>document.documentElement.style.fontSize='200%');
  assert.equal(await page.evaluate(()=>document.documentElement.scrollWidth>innerWidth),false);
  const reading=await browser.newPage({javaScriptEnabled:false});await reading.goto(base+'libro/temas/07-probabilidad/10-teorema-de-bayes.html#practica');
  assert.equal(await reading.locator('#prueba details').count(),1);assert.equal(await reading.locator('#practica noscript a').count(),1);await reading.close();
  assert.deepEqual(errors,[]);
  console.log('PASS: 2000 variantes, posteriores coherentes, MathJax, corrección, teclado, subcarpeta, móvil y respaldo sin JS.');
 }finally{await browser.close();}
})().catch(e=>{console.error(e);process.exitCode=1;});

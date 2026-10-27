const assert=require('node:assert/strict');
const fs=require('node:fs');
const crypto=require('node:crypto');
const {chromium}=require('playwright');
(async()=>{
 const original=fs.readFileSync('../Página web existente/3. Probabilidad/5. Probabilidad total y Teorema de Bayes.txt');
 assert.equal(crypto.createHash('sha256').update(original).digest('hex'),'87ec5c86cd1ece3d8d9461ca5a17bbcb079e2b95f37ebd8f75e95acbdabe57e2');
 const {generateTotalPractice}=await import('../content/models/probability-total-practice.js');
 const kinds=['first-path','second-path','two-total','third-path','three-total','complement'];
 for(let seed=0;seed<2000;seed++){
  const qs=generateTotalPractice(seed);assert.deepEqual(qs.map(q=>q.kind),kinds);
  assert.deepEqual(qs[0].weights,qs[1].weights);assert.deepEqual(qs[1].weights,qs[2].weights);
  assert.deepEqual(qs[3].weights,qs[4].weights);assert.deepEqual(qs[4].weights,qs[5].weights);
  assert.equal(qs[2].numerator,qs[0].numerator+qs[1].numerator);
  assert.equal(qs[5].numerator,1000-qs[4].numerator);
  for(const q of qs){
   assert.equal(q.weights.reduce((a,b)=>a+b),10);assert.ok(q.weights.every(x=>x>0));
   assert.equal(q.table.rows.length,q.weights.length);assert.ok(q.rates.every(x=>x>0&&x<100));
   assert.ok(q.numerator>0&&q.numerator<1000);
   assert.ok(q.prompt&&q.hint&&q.explanation);assert.equal(q.correct,'a');
   assert.equal(q.options.length,4);assert.equal(new Set(q.options.map(o=>o.text)).size,4);
   assert.equal(Number(q.options[0].text.match(/frac\{(\d+)\}\{1000\}/)[1]),q.numerator);
  }
  const weighted2=qs[2].weights.reduce((sum,w,i)=>sum+w*qs[2].rates[i],0);
  const weighted3=qs[4].weights.reduce((sum,w,i)=>sum+w*qs[4].rates[i],0);
  assert.equal(qs[2].numerator,weighted2);assert.equal(qs[4].numerator,weighted3);
  assert.ok(weighted2/10>=Math.min(...qs[2].rates)&&weighted2/10<=Math.max(...qs[2].rates));
  assert.ok(weighted3/10>=Math.min(...qs[4].rates)&&weighted3/10<=Math.max(...qs[4].rates));
 }
 const browser=await chromium.launch({headless:true,executablePath:process.env.CHROME_PATH});
 const base='http://127.0.0.1:4173/';
 try{
  const page=await browser.newPage({viewport:{width:1200,height:900}}),errors=[];
  page.on('pageerror',e=>errors.push(e.message));page.on('response',r=>{if(r.status()>=400&&!r.url().endsWith('favicon.ico'))errors.push(r.status()+' '+r.url());});
  for(const prefix of [base,base+'prueba-subcarpeta/']){
   if(prefix!==base)await page.route(prefix+'**',async route=>{const response=await route.fetch({url:route.request().url().replace(prefix,base)});await route.fulfill({response});});
   await page.goto(prefix+'libro/temas/07-probabilidad/09-probabilidad-total.html#practica');
   await page.waitForFunction(()=>document.querySelector('[data-total-practice] [data-content-role="activity-progress"]')?.textContent.includes('Pregunta 1 de 6'));
   assert.equal(await page.locator('[data-total-practice] input').count(),4);assert.equal(await page.locator('[data-total-practice] table').count(),1);
   assert.equal(await page.locator('[data-mml-node="merror"]').count(),0);
  }
  await page.unrouteAll({behavior:'wait'});
  await page.goto(base+'libro/temas/07-probabilidad/09-probabilidad-total.html#practica');
  const root=page.locator('[data-total-practice]');await page.waitForFunction(()=>document.querySelector('[data-total-practice] [data-content-role="activity-progress"]')?.textContent.includes('Pregunta 1 de 6'));
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
  await root.locator('button').nth(2).click();await page.waitForFunction(()=>document.querySelector('[data-total-practice] [data-content-role="activity-progress"]')?.textContent.includes('Pregunta 1 de 6'));
  await page.setViewportSize({width:390,height:844});await page.evaluate(()=>document.documentElement.style.fontSize='200%');
  assert.equal(await page.evaluate(()=>document.documentElement.scrollWidth>innerWidth),false);
  const reading=await browser.newPage({javaScriptEnabled:false});await reading.goto(base+'libro/temas/07-probabilidad/09-probabilidad-total.html#practica');
  assert.equal(await reading.locator('#maquinas details').count(),1);assert.equal(await reading.locator('#practica noscript a').count(),1);await reading.close();
  assert.deepEqual(errors,[]);
  console.log('PASS: 2000 variantes, particiones y sumas coherentes, MathJax, corrección, teclado, subcarpeta, móvil y respaldo sin JS.');
 }finally{await browser.close();}
})().catch(e=>{console.error(e);process.exitCode=1;});

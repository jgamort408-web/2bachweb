const assert=require('node:assert/strict');
const fs=require('node:fs');
const crypto=require('node:crypto');
const {chromium}=require('playwright');
(async()=>{
 const source=fs.readFileSync('../Página web existente/3. Probabilidad/2. Tipos de probabilidad.txt');
 assert.equal(crypto.createHash('sha256').update(source).digest('hex'),'ba5abc4e5c9086450b3c7441fdd80420b7b3454647c723117d27bf8142cb2454');
 assert.equal(2+3+5,10);assert.equal((2+3)/10,0.5);assert.equal(3/10,0.3);
 assert.equal(4/20,0.2);assert.equal(1/6,0.16666666666666666);
 const {frequencyValues,generateFrequencyPractice}=await import('../content/models/probability-frequency-practice.js');
 assert.deepEqual(frequencyValues([3,5,7,5],2),{total:20,absolute:7,relative:0.35,percent:35,cumulative:15,cumulativeRelative:0.75});
 for(let seed=0;seed<2000;seed++){
  const questions=generateFrequencyPractice(seed);assert.equal(questions.length,6);
  assert.deepEqual(questions.map(q=>q.kind),['absolute','relative','percent','cumulative','cumulativeRelative','interpretation']);
  for(const q of questions){
   const v=frequencyValues(q.counts,q.category);
   assert.equal(q.counts.length,4);assert.ok(q.counts.every(x=>x>=2));assert.equal(v.total,q.total);
   assert.equal(q.table.rows[4][1],q.total);assert.equal(q.table.rows.slice(0,4).reduce((s,r)=>s+r[1],0),q.total);
   assert.equal(q.options.length,4);assert.equal(new Set(q.options.map(o=>o.text)).size,4);
   if(q.kind==='absolute')assert.equal(q.value,v.absolute);
   if(q.kind==='relative')assert.equal(q.value,v.absolute);
   if(q.kind==='percent')assert.equal(q.value,v.percent);
   if(q.kind==='cumulative'||q.kind==='cumulativeRelative')assert.equal(q.value,v.cumulative);
   if(q.kind==='interpretation')assert.match(q.options[0].text,/no demuestra/);
  }
 }
 const browser=await chromium.launch({headless:true,executablePath:process.env.CHROME_PATH});
 const base='http://127.0.0.1:4173/';
 try{
  const page=await browser.newPage({viewport:{width:1200,height:900}}),errors=[];
  page.on('pageerror',e=>errors.push(e.message));page.on('response',r=>{if(r.status()>=400&&!r.url().endsWith('favicon.ico'))errors.push(r.status()+' '+r.url());});
  for(const prefix of [base,base+'prueba-subcarpeta/']){
   if(prefix!==base)await page.route(prefix+'**',async route=>{const response=await route.fetch({url:route.request().url().replace(prefix,base)});await route.fulfill({response});});
   await page.goto(prefix+'libro/temas/07-probabilidad/04-frecuencias.html#practica');
   await page.waitForFunction(()=>document.querySelector('[data-frequency-practice] [data-content-role="activity-progress"]')?.textContent.includes('Pregunta 1 de 6'));
   assert.equal(await page.locator('[data-content-role="objectives"]').count(),1);
   assert.equal(await page.locator('#registro-ordenado table caption').count(),1);
   assert.equal(await page.locator('#registro-ordenado table thead th[scope="col"]').count(),4);
   assert.equal(await page.locator('#registro-ordenado table tbody th[scope="row"]').count(),3);
   assert.equal(await page.locator('#dado-observado details').count(),1);
   assert.equal(await page.locator('[data-frequency-practice] table caption').count(),1);
   assert.equal(await page.locator('[data-frequency-practice] table thead th[scope="col"]').count(),2);
   assert.equal(await page.locator('[data-frequency-practice] table tbody th[scope="row"]').count(),5);
   assert.equal(await page.locator('[data-mml-node="merror"]').count(),0);
  }
  await page.unrouteAll({behavior:'wait'});
  await page.goto(base+'libro/temas/07-probabilidad/04-frecuencias.html#practica');
  const root=page.locator('[data-frequency-practice]');
  await page.waitForFunction(()=>document.querySelector('[data-frequency-practice] [data-content-role="activity-progress"]')?.textContent.includes('Pregunta 1 de 6'));
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
  await root.locator('button').nth(2).click();await page.waitForFunction(()=>document.querySelector('[data-frequency-practice] [data-content-role="activity-progress"]')?.textContent.includes('Pregunta 1 de 6'));
  await page.setViewportSize({width:390,height:844});await page.evaluate(()=>document.documentElement.style.fontSize='200%');
  assert.equal(await page.evaluate(()=>document.documentElement.scrollWidth>innerWidth),false);
  const reading=await browser.newPage({javaScriptEnabled:false});await reading.goto(base+'libro/temas/07-probabilidad/04-frecuencias.html#practica');
  assert.equal(await reading.locator('#casos details').count(),1);assert.equal(await reading.locator('#registro-ordenado details').count(),1);assert.equal(await reading.locator('#dado-observado details').count(),1);assert.equal(await reading.locator('#practica noscript a').count(),1);await reading.close();
  assert.deepEqual(errors,[]);
  console.log('PASS: 2000 registros, seis lecturas de frecuencia, tabla semántica, MathJax, teclado, subcarpeta, móvil y fallback sin JS.');
 }finally{await browser.close();}
})().catch(e=>{console.error(e);process.exitCode=1;});

const assert=require('node:assert/strict');
const fs=require('node:fs');
const crypto=require('node:crypto');
const {chromium}=require('playwright');
(async()=>{
 const source=fs.readFileSync('../Página web existente/3. Probabilidad/5. Probabilidad total y Teorema de Bayes.txt');
 assert.equal(crypto.createHash('sha256').update(source).digest('hex'),'87ec5c86cd1ece3d8d9461ca5a17bbcb079e2b95f37ebd8f75e95acbdabe57e2');
 const {bayesValues,generateSession}=await import('../widgets/games/t07-c-detective-bayes/generator.js');
 assert.deepEqual(bayesValues(5,80,10),{causePath:4,otherPath:9.5,total:13.5,posterior:29.6});
 assert.deepEqual(bayesValues(1,95,3),{causePath:0.95,otherPath:2.97,total:3.92,posterior:24.2});
 for(let i=0;i<2000;i++){
  const cases=generateSession();assert.equal(cases.length,6);
  for(const c of cases){const v=bayesValues(c.prior,c.likelihood,c.alternative);assert.equal(v.total,v.causePath+v.otherPath);assert.ok(v.total>0&&v.total<100);assert.ok(v.posterior>0&&v.posterior<100);assert.equal(c.total,v.total);assert.equal(c.posterior,v.posterior);}
 }
 const browser=await chromium.launch({headless:true,executablePath:process.env.CHROME_PATH});
 const base='http://127.0.0.1:4173/';
 try{
  const page=await browser.newPage({viewport:{width:1200,height:900}}),errors=[];
  page.on('pageerror',e=>errors.push(e.message));page.on('response',r=>{if(r.status()>=400&&!r.url().endsWith('favicon.ico'))errors.push(r.status()+' '+r.url());});
  for(const prefix of [base,base+'prueba-subcarpeta/']){
   if(prefix!==base)await page.route(prefix+'**',async route=>{const response=await route.fetch({url:route.request().url().replace(prefix,base)});await route.fulfill({response});});
   await page.goto(prefix+'laboratorios/juegos/t07-c-detective-bayes.html');
   const frame=page.frameLocator('iframe[title="Detective Bayes"]');
   await frame.locator('[data-progress]').waitFor();
   assert.match(await frame.locator('[data-progress]').innerText(),/Caso 1 de 6/);
   await frame.locator('mjx-container').first().waitFor();
   assert.equal(await frame.locator('[data-mml-node="merror"]').count(),0);
   await frame.locator('[data-check]').click();assert.match(await frame.locator('[data-feedback]').innerText(),/Escribe un porcentaje/);
   await frame.locator('[data-hint]').click();assert.match(await frame.locator('[data-feedback]').innerText(),/Pista/);
  }
  await page.unrouteAll({behavior:'wait'});
  await page.goto(base+'widgets/games/t07-c-detective-bayes/index.html');
  for(let i=0;i<6;i++){
   const lines=await page.locator('[data-case]').innerText();
   const numbers=[...lines.matchAll(/(\d+) %/g)].map(m=>Number(m[1]));
   assert.equal(numbers.length,3);
   const [prior,likelihood,alternative]=numbers,v=bayesValues(prior,likelihood,alternative);
   await page.locator('[data-answer]').fill(String(v.total));await page.locator('[data-answer]').press('Enter');
   assert.match(await page.locator('[data-feedback]').innerText(),/Correcto/);
   await page.locator('[data-next]').press('Enter');
   assert.match(await page.locator('[data-question]').innerText(),/Paso 2/);
   await page.locator('[data-answer]').fill(String(v.posterior).replace('.',','));await page.locator('[data-answer]').press('Enter');
   assert.match(await page.locator('[data-feedback]').innerText(),/Correcto/);
   await page.locator('[data-next]').press('Enter');
  }
  assert.match(await page.locator('[data-case]').innerText(),/1200 de 1200/);
  await page.locator('[data-restart]').click();assert.match(await page.locator('[data-progress]').innerText(),/Caso 1 de 6/);
  await page.locator('[data-answer]').fill('101');await page.locator('[data-check]').click();assert.match(await page.locator('[data-feedback]').innerText(),/entre 0 y 100/);
  const caseText=await page.locator('[data-case]').innerText(),numbers=[...caseText.matchAll(/(\d+) %/g)].map(m=>Number(m[1]));
  const wrong=(bayesValues(...numbers).total+1)%101;
  await page.locator('[data-answer]').fill(String(wrong));await page.locator('[data-check]').click();assert.match(await page.locator('[data-feedback]').innerText(),/Aún no/);
  await page.locator('[data-check]').click();assert.match(await page.locator('[data-feedback]').innerText(),/Dos intentos agotados/);
  await page.setViewportSize({width:390,height:844});await page.evaluate(()=>document.documentElement.style.fontSize='200%');
  assert.equal(await page.evaluate(()=>document.documentElement.scrollWidth>innerWidth),false);
  assert.deepEqual(errors,[]);
  console.log('PASS: 2000 sesiones, casos originales de Bayes, doce cálculos, coma decimal, widget, teclado, pista, dos intentos y móvil.');
 }finally{await browser.close();}
})().catch(e=>{console.error(e);process.exitCode=1;});

const assert=require('node:assert/strict');
const fs=require('node:fs');
const crypto=require('node:crypto');
const {chromium}=require('playwright');
(async()=>{
 const source=fs.readFileSync('../Página web existente/3. Probabilidad/4. Tablas de contingencia y diagramas de árboles.txt');
 assert.equal(crypto.createHash('sha256').update(source).digest('hex'),'b014c0d54663b92251debe0accd1b423c4249c78d92db368d1c1a5597fdb14b8');
 const {generateCompoundPractice}=await import('../content/models/probability-compound-practice.js');
 for(let seed=0;seed<2000;seed++){
  const q=generateCompoundPractice(seed);
  assert.deepEqual(q.map(x=>x.kind),['with-rr','with-at-least-one-red','without-rr','without-ra','second-red-with','second-red-without']);
  for(const x of q){
   const r=x.red,b=x.blue,t=r+b,n=x.numerator,d=x.denominator;
   assert.ok(n>0&&n<d);assert.equal(x.steps.length,3);assert.equal(x.options.length,4);
   assert.ok(x.prompt&&x.hint&&x.explanation);assert.equal(x.correct,'a');
   const fractions=x.options.map(o=>o.text.match(/frac\{(\d+)\}\{(\d+)\}/).slice(1).map(Number));
   assert.equal(new Set(fractions.map(([a,c])=>(a/c).toFixed(12))).size,4);
   assert.equal(fractions[0][0]*d,n*fractions[0][1]);
   const expected={
    'with-rr':[r*r,t*t],
    'with-at-least-one-red':[t*t-b*b,t*t],
    'without-rr':[r*(r-1),t*(t-1)],
    'without-ra':[r*b,t*(t-1)],
    'second-red-with':[r,t],
    'second-red-without':[r-1,t-1]
   }[x.kind];
   assert.deepEqual([n,d],expected);
   const next=t-(x.replace?0:1);
   assert.equal(r+b,t);assert.equal(r-(x.replace?0:1)+b,next);
   assert.equal(r+b-(x.replace?0:1),next);
  }
 }
 const browser=await chromium.launch({headless:true,executablePath:process.env.CHROME_PATH});
 const base='http://127.0.0.1:4173/';
 try{
  const page=await browser.newPage({viewport:{width:1200,height:900}}),errors=[];
  page.on('pageerror',e=>errors.push(e.message));
  page.on('response',r=>{if(r.status()>=400&&!r.url().endsWith('favicon.ico'))errors.push(r.status()+' '+r.url());});
  for(const prefix of [base,base+'prueba-subcarpeta/']){
   if(prefix!==base)await page.route(prefix+'**',async route=>{const response=await route.fetch({url:route.request().url().replace(prefix,base)});await route.fulfill({response});});
   await page.goto(prefix+'libro/temas/07-probabilidad/07-experimentos-compuestos.html#practica');
   await page.waitForFunction(()=>document.querySelector('[data-compound-practice] [data-content-role="activity-progress"]')?.textContent.includes('Pregunta 1 de 6'));
   assert.equal(await page.locator('[data-compound-practice] input').count(),4);
   assert.equal(await page.locator('[data-mml-node="merror"]').count(),0);
  }
  await page.unrouteAll({behavior:'wait'});
  await page.goto(base+'libro/temas/07-probabilidad/07-experimentos-compuestos.html#practica');
  const root=page.locator('[data-compound-practice]');
  await page.waitForFunction(()=>document.querySelector('[data-compound-practice] [data-content-role="activity-progress"]')?.textContent.includes('Pregunta 1 de 6'));
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
  await page.setViewportSize({width:390,height:844});await page.evaluate(()=>document.documentElement.style.fontSize='200%');
  assert.equal(await page.evaluate(()=>document.documentElement.scrollWidth>innerWidth),false);
  const reading=await browser.newPage({javaScriptEnabled:false});await reading.goto(base+'libro/temas/07-probabilidad/07-experimentos-compuestos.html#practica');
  assert.equal(await reading.locator('#incendios details').count(),1);assert.equal(await reading.locator('#practica noscript a').count(),1);await reading.close();
  assert.deepEqual(errors,[]);
  console.log('PASS: 2000 variantes, seis caminos, ramas y opciones coherentes, MathJax, corrección, teclado, subcarpeta, móvil y respaldo sin JS.');
 }finally{await browser.close();}
})().catch(e=>{console.error(e);process.exitCode=1;});

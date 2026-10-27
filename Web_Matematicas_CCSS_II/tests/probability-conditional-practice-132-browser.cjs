const assert=require('node:assert/strict');
const fs=require('node:fs');
const crypto=require('node:crypto');
const {chromium}=require('playwright');
(async()=>{
 const source=fs.readFileSync('../Página web existente/3. Probabilidad/4. Tablas de contingencia y diagramas de árboles.txt');
 assert.equal(crypto.createHash('sha256').update(source).digest('hex'),'b014c0d54663b92251debe0accd1b423c4249c78d92db368d1c1a5597fdb14b8');
 const {generateConditionalPractice}=await import('../content/models/probability-conditional-practice.js');
 const kinds=['a-given-b','b-given-a','not-a-given-b','not-b-given-a','a-given-not-b','joint-product'];
 for(let seed=0;seed<2000;seed++){
  const qs=generateConditionalPractice(seed);assert.deepEqual(qs.map(q=>q.kind),kinds);
  assert.deepEqual(qs[0].counts,qs[1].counts);assert.notEqual(qs[0].denominator,qs[1].denominator);
  for(const q of qs){
   const [ab,aOnly,bOnly,none]=q.counts,total=ab+aOnly+bOnly+none;
   assert.ok(q.counts.every(Number.isInteger)&&q.counts.every(x=>x>0));
   assert.deepEqual(q.table.rows.map(row=>row.slice(1)),[[ab,aOnly,ab+aOnly],[bOnly,none,bOnly+none],[ab+bOnly,aOnly+none,total]]);
   assert.deepEqual([q.numerator,q.denominator],{
    'a-given-b':[ab,ab+bOnly],
    'b-given-a':[ab,ab+aOnly],
    'not-a-given-b':[bOnly,ab+bOnly],
    'not-b-given-a':[aOnly,ab+aOnly],
    'a-given-not-b':[aOnly,aOnly+none],
    'joint-product':[ab,total]
   }[q.kind]);
   assert.ok(q.prompt&&q.hint&&q.explanation);assert.equal(q.correct,'a');
   const choices=q.options.map(o=>o.text.match(/frac\{(\d+)\}\{(\d+)\}/).slice(1).map(Number));
   assert.equal(new Set(choices.map(([n,d])=>(n/d).toFixed(12))).size,4);
   assert.equal(choices[0][0]*q.denominator,q.numerator*choices[0][1]);
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
   await page.goto(prefix+'libro/temas/07-probabilidad/08-probabilidad-condicionada.html#practica');
   await page.waitForFunction(()=>document.querySelector('[data-conditional-practice] [data-content-role="activity-progress"]')?.textContent.includes('Pregunta 1 de 6'));
   assert.equal(await page.locator('[data-conditional-practice] input').count(),4);
   assert.equal(await page.locator('[data-conditional-practice] table').count(),1);
   assert.equal(await page.locator('[data-mml-node="merror"]').count(),0);
  }
  await page.unrouteAll({behavior:'wait'});
  await page.goto(base+'libro/temas/07-probabilidad/08-probabilidad-condicionada.html#practica');
  const root=page.locator('[data-conditional-practice]');
  await page.waitForFunction(()=>document.querySelector('[data-conditional-practice] [data-content-role="activity-progress"]')?.textContent.includes('Pregunta 1 de 6'));
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
  await root.locator('button').nth(2).click();await page.waitForFunction(()=>document.querySelector('[data-conditional-practice] [data-content-role="activity-progress"]')?.textContent.includes('Pregunta 1 de 6'));
  await page.setViewportSize({width:390,height:844});await page.evaluate(()=>document.documentElement.style.fontSize='200%');
  assert.equal(await page.evaluate(()=>document.documentElement.scrollWidth>innerWidth),false);
  const reading=await browser.newPage({javaScriptEnabled:false});await reading.goto(base+'libro/temas/07-probabilidad/08-probabilidad-condicionada.html#practica');
  assert.equal(await reading.locator('#tabla details').count(),2);assert.equal(await reading.locator('#practica noscript a').count(),1);await reading.close();
  assert.deepEqual(errors,[]);
  console.log('PASS: 2000 variantes, tablas y condicionadas coherentes, MathJax, corrección, teclado, subcarpeta, móvil y respaldo sin JS.');
 }finally{await browser.close();}
})().catch(e=>{console.error(e);process.exitCode=1;});

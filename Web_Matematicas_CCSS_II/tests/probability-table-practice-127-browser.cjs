const assert=require('node:assert/strict');
const fs=require('node:fs');
const crypto=require('node:crypto');
const {chromium}=require('playwright');
(async()=>{
 const source=fs.readFileSync('../Página web existente/3. Probabilidad/4. Tablas de contingencia y diagramas de árboles.txt');
 assert.equal(crypto.createHash('sha256').update(source).digest('hex'),'b014c0d54663b92251debe0accd1b423c4249c78d92db368d1c1a5597fdb14b8');
 const {tableAnswer,generateTablePractice}=await import('../content/models/probability-table-practice.js');
 const example=[35,25,15,25];
 assert.deepEqual(['joint','row','column','givenB','givenA','neither'].map(x=>tableAnswer(example,x)),[[35,100],[60,100],[50,100],[35,50],[35,60],[25,100]]);
 for(let seed=0;seed<2000;seed++){
  const questions=generateTablePractice(seed);assert.equal(questions.length,6);
  assert.deepEqual(questions.map(q=>q.operation),['joint','row','column','givenB','givenA','neither']);
  for(const q of questions){
   const [ab,anb,nab,none]=q.counts,n=ab+anb+nab+none;
   assert.deepEqual([q.numerator,q.denominator],tableAnswer(q.counts,q.operation));
   assert.equal(q.table.rows[0][1]+q.table.rows[0][2],q.table.rows[0][3]);
   assert.equal(q.table.rows[1][1]+q.table.rows[1][2],q.table.rows[1][3]);
   assert.equal(q.table.rows[0][1]+q.table.rows[1][1],q.table.rows[2][1]);
   assert.equal(q.table.rows[0][2]+q.table.rows[1][2],q.table.rows[2][2]);
   assert.equal(q.table.rows[2][3],n);assert.ok(q.numerator>0&&q.numerator<q.denominator);
   const values=q.options.map(o=>{const [,a,b]=o.text.match(/frac\{(\d+)\}\{(\d+)\}/);return Number(a)/Number(b);});
   assert.equal(new Set(values).size,4);assert.equal(values[0],q.numerator/q.denominator);
  }
 }
 const browser=await chromium.launch({headless:true,executablePath:process.env.CHROME_PATH});
 const base='http://127.0.0.1:4173/';
 try{
  const page=await browser.newPage({viewport:{width:1200,height:900}}),errors=[];
  page.on('pageerror',e=>errors.push(e.message));page.on('response',r=>{if(r.status()>=400&&!r.url().endsWith('favicon.ico'))errors.push(r.status()+' '+r.url());});
  for(const prefix of [base,base+'prueba-subcarpeta/']){
   if(prefix!==base)await page.route(prefix+'**',async route=>{const response=await route.fetch({url:route.request().url().replace(prefix,base)});await route.fulfill({response});});
   await page.goto(prefix+'libro/temas/07-probabilidad/03-tablas-de-contingencia.html#practica');
   await page.waitForFunction(()=>document.querySelector('[data-table-practice] [data-content-role="activity-progress"]')?.textContent.includes('Pregunta 1 de 6'));
   assert.equal(await page.locator('[data-table-practice] table caption').count(),1);
   assert.equal(await page.locator('[data-table-practice] table thead th[scope="col"]').count(),4);
   assert.equal(await page.locator('[data-table-practice] table tbody th[scope="row"]').count(),3);
   assert.equal(await page.locator('[data-mml-node="merror"]').count(),0);
  }
  await page.unrouteAll({behavior:'wait'});
  await page.goto(base+'libro/temas/07-probabilidad/03-tablas-de-contingencia.html#practica');
  const root=page.locator('[data-table-practice]');
  await page.waitForFunction(()=>document.querySelector('[data-table-practice] [data-content-role="activity-progress"]')?.textContent.includes('Pregunta 1 de 6'));
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
  await root.locator('button').nth(2).click();await page.waitForFunction(()=>document.querySelector('[data-table-practice] [data-content-role="activity-progress"]')?.textContent.includes('Pregunta 1 de 6'));
  await page.setViewportSize({width:390,height:844});await page.evaluate(()=>document.documentElement.style.fontSize='200%');
  assert.equal(await page.evaluate(()=>document.documentElement.scrollWidth>innerWidth),false);
  const reading=await browser.newPage({javaScriptEnabled:false});await reading.goto(base+'libro/temas/07-probabilidad/03-tablas-de-contingencia.html#practica');
  assert.equal(await reading.locator('#ejemplo details').count(),1);assert.equal(await reading.locator('#lectura-integrada details').count(),1);assert.equal(await reading.locator('#practica noscript a').count(),1);await reading.close();
  assert.deepEqual(errors,[]);
  console.log('PASS: 2000 semillas, seis lecturas de tabla, denominadores, tabla semántica, MathJax, teclado, subcarpeta, móvil y fallback sin JS.');
 }finally{await browser.close();}
})().catch(e=>{console.error(e);process.exitCode=1;});

const assert=require('node:assert/strict');
const fs=require('node:fs');
const crypto=require('node:crypto');
const {chromium}=require('playwright');
(async()=>{
 const original=fs.readFileSync('../Página web existente/3. Probabilidad/4. Tablas de contingencia y diagramas de árboles.txt');
 assert.equal(crypto.createHash('sha256').update(original).digest('hex'),'b014c0d54663b92251debe0accd1b423c4249c78d92db368d1c1a5597fdb14b8');
 const p=2/10000,q=1-p,paths=[p*p,p*q,q*p,q*q];
 assert.deepEqual(paths.map(x=>Math.round(x*1e8)),[4,19996,19996,99960004]);
 assert.equal(paths.reduce((a,b)=>a+b),1);
 assert.equal(Math.round((1-q*q)*1e8),39996);
 const browser=await chromium.launch({headless:true,executablePath:process.env.CHROME_PATH});
 try{
  const page=await browser.newPage({viewport:{width:1200,height:900}}),errors=[];
  page.on('pageerror',e=>errors.push(e.message));page.on('response',r=>{if(r.status()>=400&&!r.url().endsWith('favicon.ico'))errors.push(r.status()+' '+r.url());});
  for(const prefix of ['http://127.0.0.1:4173/','http://127.0.0.1:4173/prueba-subcarpeta/']){
   if(prefix.includes('prueba-subcarpeta'))await page.route(prefix+'**',async route=>{const response=await route.fetch({url:route.request().url().replace(prefix,'http://127.0.0.1:4173/')});await route.fulfill({response});});
   await page.goto(prefix+'libro/temas/07-probabilidad/07-experimentos-compuestos.html#fallos');
   await page.waitForFunction(()=>document.querySelector('[data-compound-practice] [data-content-role="activity-progress"]')?.textContent.includes('Pregunta 1 de 6'));
   assert.equal(await page.locator('#fallos table caption').count(),1);
   assert.equal(await page.locator('#fallos tbody tr').count(),4);
   assert.deepEqual(await page.locator('#fallos tbody tr td:last-child').allTextContents(),['0,00000004','0,00019996','0,00019996','0,99960004']);
   assert.equal(await page.locator('#fallos details').count(),1);
   assert.equal(await page.locator('[data-mml-node="merror"]').count(),0);
   assert.equal(await page.locator('nav a[href="#fallos"]').count(),1);
  }
  await page.unrouteAll({behavior:'wait'});
  await page.setViewportSize({width:390,height:844});await page.evaluate(()=>document.documentElement.style.fontSize='200%');
  assert.equal(await page.evaluate(()=>document.documentElement.scrollWidth>innerWidth),false);
  const reading=await browser.newPage({javaScriptEnabled:false});await reading.goto('http://127.0.0.1:4173/libro/temas/07-probabilidad/07-experimentos-compuestos.html#fallos');
  assert.equal(await reading.locator('#fallos table').count(),1);assert.equal(await reading.locator('#fallos details').count(),1);await reading.close();
  assert.deepEqual(errors,[]);
  console.log('PASS: cuatro caminos exactos, suma 1, redondeo final, MathJax, subcarpeta, móvil y lectura sin JS.');
 }finally{await browser.close();}
})().catch(e=>{console.error(e);process.exitCode=1;});

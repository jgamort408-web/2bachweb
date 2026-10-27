const assert=require('node:assert/strict');
const fs=require('node:fs');
const crypto=require('node:crypto');
const {chromium}=require('playwright');

(async()=>{
 const source='../Página web existente/3. Probabilidad/4. Tablas de contingencia y diagramas de árboles.txt';
 assert.equal(crypto.createHash('sha256').update(fs.readFileSync(source)).digest('hex'),'b014c0d54663b92251debe0accd1b423c4249c78d92db368d1c1a5597fdb14b8');
 assert.ok(Math.abs((0.60+0.50-0.35)-0.75)<1e-12);
 assert.ok(Math.abs((1-0.75)-0.25)<1e-12);
 assert.ok(Math.abs((0.15/0.50)-0.30)<1e-12);
 assert.notEqual(0.35,0.60*0.50);
 const base='http://127.0.0.1:4173/';
 const browser=await chromium.launch({headless:true,executablePath:process.env.CHROME_PATH});
 try{
  const page=await browser.newPage({viewport:{width:1200,height:850}}),errors=[];
  page.on('pageerror',e=>errors.push(e.message));
  page.on('response',r=>{if(r.status()>=400&&!r.url().endsWith('favicon.ico'))errors.push(r.status()+' '+r.url());});
  for(const prefix of [base,base+'prueba-subcarpeta/']){
   if(prefix!==base)await page.route(prefix+'**',async route=>{const response=await route.fetch({url:route.request().url().replace(prefix,base)});await route.fulfill({response});});
   await page.goto(prefix+'libro/temas/07-probabilidad/03-tablas-de-contingencia.html');
   await page.waitForFunction(()=>!!document.querySelector('#site-header a')&&document.querySelectorAll('mjx-container').length>15);
   assert.equal(await page.locator('main section').count(),9);
   assert.equal(await page.locator('#estructura table, #ejemplo table').count(),2);
   assert.equal(await page.locator('#estructura table tbody tr').count(),3);
   assert.equal(await page.locator('#ejemplo table tbody tr').count(),3);
   assert.equal(await page.locator('[data-mml-node="merror"]').count(),0);
   assert.equal(await page.locator('[data-content-role="objectives"]').count(),1);
   assert.match(await page.locator('#ejemplo table').innerText(),/0,35/);
   await page.locator('#ejemplo summary').click();
   assert.match((await page.locator('#ejemplo details').innerText()).replace(/\s/g,''),/0,25/);
   await page.locator('#lectura-integrada summary').click();
   assert.match(await page.locator('#lectura-integrada details').innerText(),/independientes/);
   await page.goto(prefix+'libro/temas/07-probabilidad/index.html');
   await page.waitForFunction(()=>!!document.querySelector('#site-header a'));
   assert.equal(await page.locator('[data-topic-index] li').filter({hasText:'Contenido parcial'}).count(),10);
  }
  await page.goto(base+'libro/temas/07-probabilidad/03-tablas-de-contingencia.html');
  await page.setViewportSize({width:390,height:844});
  await page.evaluate(()=>document.documentElement.style.fontSize='200%');
  assert.equal(await page.evaluate(()=>document.documentElement.scrollWidth>innerWidth),false);
  const nojs=await browser.newPage({javaScriptEnabled:false});
  await nojs.goto(base+'libro/temas/07-probabilidad/03-tablas-de-contingencia.html');
  assert.equal(await nojs.locator('main table').count(),2);assert.equal(await nojs.locator('#lectura-integrada details').count(),1);await nojs.close();
  assert.deepEqual(errors,[]);
  console.log('PASS: fuente, tablas, fórmulas, índice, raíz/subcarpeta, móvil y sin JS.');
 }finally{await browser.close();}
})().catch(e=>{console.error(e);process.exitCode=1;});








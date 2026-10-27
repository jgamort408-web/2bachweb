const assert=require('node:assert/strict');
const fs=require('node:fs');
const crypto=require('node:crypto');
const {chromium}=require('playwright');

(async()=>{
 const source='../Página web existente/3. Probabilidad/3. Axiomática de Kolmogorov.txt';
 assert.equal(crypto.createHash('sha256').update(fs.readFileSync(source)).digest('hex'),'ea186d2415662bd9fcc2ee8841f75f3c15625aa4edbc69a97d6e7f2bf3ac6e04');
 assert.equal(3*4/40,3/10);
 assert.equal(0.2+0.3+0.5,1);
 assert.equal(-0.1+0.4+0.7,1);
 assert.ok(-0.1<0);
 assert.ok(Math.abs((0.2+0.3+0.4)-0.9)<1e-12);
 const base='http://127.0.0.1:4173/';
 const browser=await chromium.launch({headless:true,executablePath:process.env.CHROME_PATH});
 try{
  const page=await browser.newPage({viewport:{width:1200,height:850}}),errors=[];
  page.on('pageerror',e=>errors.push(e.message));
  page.on('response',r=>{if(r.status()>=400&&!r.url().endsWith('favicon.ico'))errors.push(r.status()+' '+r.url());});
  for(const prefix of [base,base+'prueba-subcarpeta/']){
   if(prefix!==base)await page.route(prefix+'**',async route=>{const response=await route.fetch({url:route.request().url().replace(prefix,base)});await route.fulfill({response});});
   await page.goto(prefix+'libro/temas/07-probabilidad/05-axiomatica-de-kolmogorov.html');
   await page.waitForFunction(()=>!!document.querySelector('#site-header a')&&document.querySelectorAll('mjx-container').length>=12);
   assert.equal(await page.locator('main section:not([data-content-availability])').count(),9);
   assert.equal(await page.locator('[data-content-role="objectives"]').count(),1);
   assert.equal(await page.locator('#ejemplo details').count(),2);
   assert.equal(await page.locator('#asignaciones details').count(),1);
   assert.equal(await page.locator('[data-mml-node="merror"]').count(),0);
   assert.match(await page.locator('#axiomas').innerText(),/No negatividad/);
   await page.locator('#ejemplo summary').first().click();
   assert.match(await page.locator('#ejemplo details').first().innerText(),/Ambas partes suman 1/);
   await page.locator('#asignaciones summary').click();
   assert.match(await page.locator('#asignaciones details').innerText(),/Modelo III/);
   await page.goto(prefix+'libro/temas/07-probabilidad/index.html');
   await page.waitForFunction(()=>!!document.querySelector('#site-header a'));
   assert.equal(await page.locator('[data-topic-index] li').filter({hasText:'Contenido parcial'}).count(),10);
  }
  await page.goto(base+'libro/temas/07-probabilidad/05-axiomatica-de-kolmogorov.html');
  await page.setViewportSize({width:390,height:844});
  await page.evaluate(()=>document.documentElement.style.fontSize='200%');
  assert.equal(await page.evaluate(()=>document.documentElement.scrollWidth>innerWidth),false);
  const nojs=await browser.newPage({javaScriptEnabled:false});
  await nojs.goto(base+'libro/temas/07-probabilidad/05-axiomatica-de-kolmogorov.html');
  assert.equal(await nojs.locator('main section:not([data-content-availability])').count(),9);assert.equal(await nojs.locator('#ejemplo details').count(),2);assert.equal(await nojs.locator('#asignaciones details').count(),1);await nojs.close();
  assert.deepEqual(errors,[]);
  console.log('PASS: fuente, axiomas, fórmulas, índice, raíz/subcarpeta, móvil y sin JS.');
 }finally{await browser.close();}
})().catch(e=>{console.error(e);process.exitCode=1;});








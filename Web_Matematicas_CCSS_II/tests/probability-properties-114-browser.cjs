const assert=require('node:assert/strict');
const fs=require('node:fs');
const crypto=require('node:crypto');
const {chromium}=require('playwright');

(async()=>{
 const source='../Página web existente/3. Probabilidad/3. Axiomática de Kolmogorov.txt';
 assert.equal(crypto.createHash('sha256').update(fs.readFileSync(source)).digest('hex'),'ea186d2415662bd9fcc2ee8841f75f3c15625aa4edbc69a97d6e7f2bf3ac6e04');
 const base='http://127.0.0.1:4173/';
 const browser=await chromium.launch({headless:true,executablePath:process.env.CHROME_PATH});
 try{
  const page=await browser.newPage({viewport:{width:1200,height:850}}),errors=[];
  page.on('pageerror',e=>errors.push(e.message));
  page.on('response',r=>{if(r.status()>=400&&!r.url().endsWith('favicon.ico'))errors.push(r.status()+' '+r.url());});
  for(const prefix of [base,base+'prueba-subcarpeta/']){
   if(prefix!==base)await page.route(prefix+'**',async route=>{const response=await route.fetch({url:route.request().url().replace(prefix,base)});await route.fulfill({response});});
   await page.goto(prefix+'libro/temas/07-probabilidad/06-propiedades-de-la-probabilidad.html');
   await page.waitForFunction(()=>!!document.querySelector('#site-header a')&&document.querySelectorAll('mjx-container').length>=20);
   assert.equal(await page.locator('main section:not([data-content-availability])').count(),9);
   assert.equal(await page.locator('[data-mml-node="merror"]').count(),0);
   assert.equal(await page.locator('#basicas tbody tr').count(),4);
   await page.locator('#ejemplos summary').first().click();
   assert.match(await page.locator('#ejemplos details').first().innerText(),/independencia/);
   assert.equal(await page.locator('[data-content-role="objectives"]').count(),1);
   assert.equal(await page.locator('#tres-vias details ol li').count(),3);
   await page.locator('#tres-vias summary').click();
   assert.match((await page.locator('#tres-vias details').innerText()).replace(/\s+/g,''),/11\/36/);
   assert.match(await page.locator('#tres-vias').innerText(),/ampliación didáctica/);
   assert.equal(await page.locator('#errores li').count(),4);
   assert.equal(await page.locator('nav[aria-label="Apartados de la lección"] a').count(),8);
   await page.goto(prefix+'libro/temas/07-probabilidad/index.html');
   await page.waitForFunction(()=>!!document.querySelector('#site-header a'));
   assert.equal(await page.locator('[data-topic-index] li').filter({hasText:'Contenido parcial'}).count(),10);
  }
  await page.goto(base+'libro/temas/07-probabilidad/06-propiedades-de-la-probabilidad.html');
  await page.setViewportSize({width:390,height:844});
  await page.evaluate(()=>document.documentElement.style.fontSize='200%');
  assert.equal(await page.evaluate(()=>document.documentElement.scrollWidth>innerWidth),false);
  const nojs=await browser.newPage({javaScriptEnabled:false});
  await nojs.goto(base+'libro/temas/07-probabilidad/06-propiedades-de-la-probabilidad.html');
  assert.equal(await nojs.locator('main section:not([data-content-availability])').count(),9);
  assert.equal(await nojs.locator('#tres-vias details ol li').count(),3);await nojs.close();
  assert.deepEqual(errors,[]);
  console.log('PASS: fuente, propiedades, fórmulas, índice, raíz/subcarpeta, móvil y sin JS.');
 }finally{await browser.close();}
})().catch(e=>{console.error(e);process.exitCode=1;});








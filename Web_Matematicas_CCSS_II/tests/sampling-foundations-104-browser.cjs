const assert=require('node:assert/strict');
const fs=require('node:fs');
const crypto=require('node:crypto');
const {chromium}=require('playwright');
(async()=>{
 const sources=[['0. Presentación.txt','2e61d377d29827b2e92c94e1ae4609fcfdeca28720e8db74db99e0131c08e75e'],['6. Tipos de muestreo.txt','ec539ccf8d74d7e1a826119ea19b588e4ad1c5bdc4618753a0f0f90c111ae443'],['7. Tipo test.txt','24f01ad2e6cd85f317f791ca963cd49ae69f2350a706025a8b4f00da25fbba21']];
 for(const [name,hash] of sources)assert.equal(crypto.createHash('sha256').update(fs.readFileSync('../Página web existente/5. Inferencia Estadística/'+name)).digest('hex'),hash);
 const base='http://127.0.0.1:4173/';const browser=await chromium.launch({headless:true,executablePath:process.env.CHROME_PATH});
 try{
  const page=await browser.newPage({viewport:{width:1200,height:900}}),errors=[];
  page.on('pageerror',e=>errors.push(e.message));page.on('response',r=>{if(r.status()>=400&&!r.url().endsWith('favicon.ico'))errors.push(r.status()+' '+r.url());});
  for(const prefix of [base,base+'prueba-subcarpeta/']){
   if(prefix!==base)await page.route(prefix+'**',async route=>{const response=await route.fetch({url:route.request().url().replace(prefix,base)});await route.fulfill({response});});
   await page.goto(prefix+'libro/temas/09-inferencia-estadistica/02-muestreo.html');
   await page.waitForFunction(()=>!!document.querySelector('#site-header a'));
   assert.equal(await page.locator('main section').count(),5);
   assert.equal(await page.locator('#cadena table tbody tr').count(),4);
   assert.equal(await page.locator('#decisiones li').count(),5);
   assert.match(await page.locator('#ejemplo').innerText(),/2500/);
   assert.match(await page.locator('#continuar').innerText(),/parcial/i);
   assert.equal(await page.locator('[data-mml-node="merror"]').count(),0);
   await page.locator('a[href="#errores"]').click();assert.equal(new URL(page.url()).hash,'#errores');
   await page.goto(prefix+'libro/temas/09-inferencia-estadistica/index.html');
   await page.waitForFunction(()=>document.querySelector('[data-topic-index]')?.textContent.includes('9.2. Muestreo'));
   assert.match(await page.locator('[data-topic-index]').innerText(),/9\.2\. Muestreo · Contenido parcial/);
  }
  await page.goto(base+'libro/temas/09-inferencia-estadistica/02-muestreo.html');await page.setViewportSize({width:390,height:844});await page.evaluate(()=>document.documentElement.style.fontSize='200%');
  assert.equal(await page.evaluate(()=>document.documentElement.scrollWidth>innerWidth),false);
  const nojs=await browser.newPage({javaScriptEnabled:false});await nojs.goto(base+'libro/temas/09-inferencia-estadistica/02-muestreo.html');assert.equal(await nojs.locator('#cadena table tbody tr').count(),4);await nojs.close();
  assert.deepEqual(errors,[]);console.log('PASS: fuentes, contenido, MathJax, índice, enlaces, raíz/subcarpeta, móvil y sin JS.');
 }finally{await browser.close();}
})().catch(e=>{console.error(e);process.exitCode=1;});

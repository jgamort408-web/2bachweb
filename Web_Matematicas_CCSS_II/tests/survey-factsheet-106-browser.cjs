const assert=require('node:assert/strict');
const fs=require('node:fs');
const crypto=require('node:crypto');
const {chromium}=require('playwright');
(async()=>{
 const sources=[['../Página web existente/5. Inferencia Estadística/0. Presentación.txt','2e61d377d29827b2e92c94e1ae4609fcfdeca28720e8db74db99e0131c08e75e'],['../Temario completo/Guion_Temario_Matematicas_CC_Sociales_II_2Bach.md','445be4c4aef0014184d2521b336913ee5360426527afe76b0d7af2ca165025f4']];
 for(const [path,hash] of sources)assert.equal(crypto.createHash('sha256').update(fs.readFileSync(path)).digest('hex'),hash);
 const base='http://127.0.0.1:4173/',browser=await chromium.launch({headless:true,executablePath:process.env.CHROME_PATH});
 try{
  const page=await browser.newPage({viewport:{width:1200,height:900}}),errors=[];
  page.on('pageerror',e=>errors.push(e.message));page.on('response',r=>{if(r.status()>=400&&!r.url().endsWith('favicon.ico'))errors.push(r.status()+' '+r.url());});
  for(const prefix of [base,base+'prueba-subcarpeta/']){
   if(prefix!==base)await page.route(prefix+'**',async route=>{const response=await route.fetch({url:route.request().url().replace(prefix,base)});await route.fulfill({response});});
   await page.goto(prefix+'libro/temas/09-inferencia-estadistica/09-ficha-tecnica-de-encuestas.html');
   await page.waitForFunction(()=>!!document.querySelector('#site-header a')&&document.querySelectorAll('mjx-container').length>4);
   assert.equal(await page.locator('main section').count(),5);
   assert.equal(await page.locator('#campos tbody tr').count(),6);
   assert.equal(await page.locator('#original tbody tr').count(),5);
   assert.equal(await page.locator('#comprobar li').count(),4);
   assert.equal(await page.locator('[data-mml-node="merror"]').count(),0);
   assert.match(await page.locator('#limites').innerText(),/parcial/i);
   await page.locator('a[href="#margen"]').click();assert.equal(new URL(page.url()).hash,'#margen');
   await page.goto(prefix+'libro/temas/09-inferencia-estadistica/index.html');
   await page.waitForFunction(()=>!!document.querySelector('#site-header a'));
   assert.match(await page.locator('[data-topic-index]').innerText(),/9\.9\..*Contenido parcial/s);
  }
  await page.goto(base+'libro/temas/09-inferencia-estadistica/09-ficha-tecnica-de-encuestas.html');
  await page.setViewportSize({width:390,height:844});await page.evaluate(()=>document.documentElement.style.fontSize='200%');
  assert.equal(await page.evaluate(()=>document.documentElement.scrollWidth>innerWidth),false);
  const nojs=await browser.newPage({javaScriptEnabled:false});await nojs.goto(base+'libro/temas/09-inferencia-estadistica/09-ficha-tecnica-de-encuestas.html');assert.equal(await nojs.locator('#original tbody tr').count(),5);await nojs.close();
  assert.deepEqual(errors,[]);console.log('PASS: fuentes, ficha, fórmula, índice, raíz/subcarpeta, móvil y sin JS.');
 }finally{await browser.close();}
})().catch(e=>{console.error(e);process.exitCode=1;});

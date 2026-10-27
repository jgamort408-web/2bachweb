const assert=require('node:assert/strict');
const fs=require('node:fs');
const crypto=require('node:crypto');
const {chromium}=require('playwright');
(async()=>{
 const sources=[['../Temario completo/Guion_Temario_Matematicas_CC_Sociales_II_2Bach.md','445be4c4aef0014184d2521b336913ee5360426527afe76b0d7af2ca165025f4'],['../Página web existente/5. Inferencia Estadística/2. Estimación.txt','07f961b5d205d738ce1465a5ac25a04f1b0ade3dcf3d08ccac56034e58ac02b4']];
 for(const [path,hash] of sources)assert.equal(crypto.createHash('sha256').update(fs.readFileSync(path)).digest('hex'),hash);
 const base='http://127.0.0.1:4173/',browser=await chromium.launch({headless:true,executablePath:process.env.CHROME_PATH});
 try{
  const page=await browser.newPage({viewport:{width:1200,height:900}}),errors=[];
  page.on('pageerror',e=>errors.push(e.message));page.on('response',r=>{if(r.status()>=400&&!r.url().endsWith('favicon.ico'))errors.push(r.status()+' '+r.url());});
  for(const prefix of [base,base+'prueba-subcarpeta/']){
   if(prefix!==base)await page.route(prefix+'**',async route=>{const response=await route.fetch({url:route.request().url().replace(prefix,base)});await route.fulfill({response});});
   await page.goto(prefix+'libro/temas/09-inferencia-estadistica/06-intervalos-de-probabilidad-o-intervalos-caracteristicos.html');
   await page.waitForFunction(()=>!!document.querySelector('#site-header a'));
   await page.waitForFunction(()=>document.querySelectorAll('mjx-container').length>10);
   assert.equal(await page.locator('main section').count(),5);
   assert.equal(await page.locator('#central tbody tr').count(),3);
   assert.equal(await page.locator('#comparar tbody tr').count(),4);
   assert.equal(await page.locator('[data-mml-node="merror"]').count(),0);
   assert.ok(await page.locator('mjx-container').count()>10);
   assert.match(await page.locator('#ejemplo').innerText(),/169\s*,\s*06/);
   await page.locator('a[href="#comparar"]').click();assert.equal(new URL(page.url()).hash,'#comparar');
   await page.goto(prefix+'libro/temas/09-inferencia-estadistica/index.html');
   await page.waitForFunction(()=>!!document.querySelector('#site-header a'));
   assert.match(await page.locator('[data-topic-index]').innerText(),/9\.6\..*Contenido parcial/s);
  }
  await page.goto(base+'libro/temas/09-inferencia-estadistica/06-intervalos-de-probabilidad-o-intervalos-caracteristicos.html');
  await page.setViewportSize({width:390,height:844});await page.evaluate(()=>document.documentElement.style.fontSize='200%');
  assert.equal(await page.evaluate(()=>document.documentElement.scrollWidth>innerWidth),false);
  const nojs=await browser.newPage({javaScriptEnabled:false});await nojs.goto(base+'libro/temas/09-inferencia-estadistica/06-intervalos-de-probabilidad-o-intervalos-caracteristicos.html');assert.equal(await nojs.locator('#ejemplo li').count(),3);await nojs.close();
  assert.deepEqual(errors,[]);console.log('PASS: fuentes, fórmulas, intervalos, índice, raíz/subcarpeta, móvil y sin JS.');
 }finally{await browser.close();}
})().catch(e=>{console.error(e);process.exitCode=1;});

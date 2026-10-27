const assert=require('node:assert/strict');
const fs=require('node:fs');
const crypto=require('node:crypto');
const {chromium}=require('playwright');

(async()=>{
 const source='../Página web existente/3. Probabilidad/4. Tablas de contingencia y diagramas de árboles.txt';
 const original=fs.readFileSync(source);
 assert.equal(crypto.createHash('sha256').update(original).digest('hex'),'b014c0d54663b92251debe0accd1b423c4249c78d92db368d1c1a5597fdb14b8');
 assert.ok(original.toString().includes('P(A)=0{,}3'));
 const dependentPaths=[0.3*0.8,0.3*0.2,0.7*0.2,0.7*0.8];
 assert.deepEqual(dependentPaths.map(value=>Math.round(value*100)),[24,6,14,56]);
 assert.equal(dependentPaths.reduce((sum,value)=>sum+Math.round(value*100),0),100);
 const base='http://127.0.0.1:4173/';
 const browser=await chromium.launch({headless:true,executablePath:process.env.CHROME_PATH});
 try{
  const page=await browser.newPage({viewport:{width:1200,height:850}}),errors=[];
  page.on('pageerror',e=>errors.push(e.message));
  page.on('response',r=>{if(r.status()>=400&&!r.url().endsWith('favicon.ico'))errors.push(r.status()+' '+r.url());});
  for(const prefix of [base,base+'prueba-subcarpeta/']){
   if(prefix!==base)await page.route(prefix+'**',async route=>{const response=await route.fetch({url:route.request().url().replace(prefix,base)});await route.fulfill({response});});
   await page.goto(prefix+'libro/temas/07-probabilidad/07-experimentos-compuestos.html');
   await page.waitForFunction(()=>!!document.querySelector('#site-header a')&&document.querySelectorAll('mjx-container').length>=8);
   assert.equal(await page.locator('main section').count(),10);
   assert.equal(await page.locator('[data-mml-node="merror"]').count(),0);
   assert.equal(await page.locator('#incendios tbody tr').count(),4);
   assert.equal(await page.locator('#dependencia tbody tr').count(),4);
   assert.deepEqual(await page.locator('#dependencia tbody tr td:last-child').allTextContents(),['0,24','0,06','0,14','0,56']);
   assert.equal(await page.locator('[data-content-role="objectives"]').count(),1);
   assert.equal(await page.locator('nav[aria-label="Apartados de la lección"] a').count(),10);
   assert.equal(await page.locator('#errores li').count(),5);
   await page.locator('#incendios summary').click();
   assert.match((await page.locator('#incendios details').innerText()).replace(/\s/g,''),/0,64/);
   await page.locator('#dependencia summary').click();
   assert.match((await page.locator('#dependencia details').innerText()).replace(/\s/g,''),/0,38/);
   await page.goto(prefix+'libro/temas/07-probabilidad/index.html');
   await page.waitForFunction(()=>!!document.querySelector('#site-header a'));
   assert.equal(await page.locator('[data-topic-index] li').filter({hasText:'Contenido parcial'}).count(),10);
  }
  await page.goto(base+'libro/temas/07-probabilidad/07-experimentos-compuestos.html');
  await page.setViewportSize({width:390,height:844});
  await page.evaluate(()=>document.documentElement.style.fontSize='200%');
  assert.equal(await page.evaluate(()=>document.documentElement.scrollWidth>innerWidth),false);
  const nojs=await browser.newPage({javaScriptEnabled:false});
  await nojs.goto(base+'libro/temas/07-probabilidad/07-experimentos-compuestos.html');
  assert.equal(await nojs.locator('main section').count(),10);
  assert.equal(await nojs.locator('#dependencia tbody tr').count(),4);await nojs.close();
  assert.deepEqual(errors,[]);
  console.log('PASS: fuente, árboles, fórmulas, índice, raíz/subcarpeta, móvil y sin JS.');
 }finally{await browser.close();}
})().catch(e=>{console.error(e);process.exitCode=1;});










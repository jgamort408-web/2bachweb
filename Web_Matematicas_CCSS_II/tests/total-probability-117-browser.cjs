const assert=require('node:assert/strict');
const fs=require('node:fs');
const crypto=require('node:crypto');
const {chromium}=require('playwright');

(async()=>{
 const source='../Página web existente/3. Probabilidad/5. Probabilidad total y Teorema de Bayes.txt';
 assert.equal(crypto.createHash('sha256').update(fs.readFileSync(source)).digest('hex'),'87ec5c86cd1ece3d8d9461ca5a17bbcb079e2b95f37ebd8f75e95acbdabe57e2');
 const trees='../Página web existente/3. Probabilidad/4. Tablas de contingencia y diagramas de árboles.txt';
 assert.equal(crypto.createHash('sha256').update(fs.readFileSync(trees)).digest('hex'),'b014c0d54663b92251debe0accd1b423c4249c78d92db368d1c1a5597fdb14b8');
 assert.equal(Math.round((0.7*0.98+0.3*0.95)*1000),971);
 assert.equal(Math.round((0.7*0.02+0.3*0.05)*1000),29);
 const base='http://127.0.0.1:4173/';
 const browser=await chromium.launch({headless:true,executablePath:process.env.CHROME_PATH});
 try{
  const page=await browser.newPage({viewport:{width:1200,height:850}}),errors=[];
  page.on('pageerror',e=>errors.push(e.message));
  page.on('response',r=>{if(r.status()>=400&&!r.url().endsWith('favicon.ico'))errors.push(r.status()+' '+r.url());});
  for(const prefix of [base,base+'prueba-subcarpeta/']){
   if(prefix!==base)await page.route(prefix+'**',async route=>{const response=await route.fetch({url:route.request().url().replace(prefix,base)});await route.fulfill({response});});
   await page.goto(prefix+'libro/temas/07-probabilidad/09-probabilidad-total.html');
   await page.waitForFunction(()=>!!document.querySelector('#site-header a')&&document.querySelectorAll('mjx-container').length>=15);
   assert.equal(await page.locator('main section:not([data-content-availability])').count(),9);
   assert.equal(await page.locator('[data-mml-node="merror"]').count(),0);
   assert.equal(await page.locator('#maquinas tbody tr').count(),2);
   assert.equal(await page.locator('[data-content-role="objectives"]').count(),1);
   assert.equal(await page.locator('nav[aria-label="Apartados de la lección"] a').count(),9);
   assert.equal(await page.locator('#comprobacion details li').count(),3);
   assert.equal(await page.locator('#errores li').count(),5);
   assert.match(await page.locator('#dos-ramas').innerText(),/4\. Tablas de contingencia y diagramas de árboles\.txt/);
   assert.equal(await page.locator('#dos-ramas a[href="07-experimentos-compuestos.html#dependencia"]').count(),1);
   await page.locator('#maquinas summary').click();
   assert.match((await page.locator('#maquinas details').innerText()).replace(/\s/g,''),/0,029/);
   await page.locator('#comprobacion summary').click();
   assert.match((await page.locator('#comprobacion details').innerText()).replace(/\s/g,''),/0,971/);
   await page.goto(prefix+'libro/temas/07-probabilidad/index.html');
   await page.waitForFunction(()=>!!document.querySelector('#site-header a'));
   assert.equal(await page.locator('[data-topic-index] li').filter({hasText:'Contenido parcial'}).count(),10);
  }
  await page.goto(base+'libro/temas/07-probabilidad/09-probabilidad-total.html');
  await page.setViewportSize({width:390,height:844});
  await page.evaluate(()=>document.documentElement.style.fontSize='200%');
  assert.equal(await page.evaluate(()=>document.documentElement.scrollWidth>innerWidth),false);
  const nojs=await browser.newPage({javaScriptEnabled:false});
  await nojs.goto(base+'libro/temas/07-probabilidad/09-probabilidad-total.html');
  assert.equal(await nojs.locator('main section:not([data-content-availability])').count(),9);
  assert.equal(await nojs.locator('#comprobacion details li').count(),3);await nojs.close();
  assert.deepEqual(errors,[]);
  console.log('PASS: fuente, probabilidad total, fórmulas, índice, raíz/subcarpeta, móvil y sin JS.');
 }finally{await browser.close();}
})().catch(e=>{console.error(e);process.exitCode=1;});










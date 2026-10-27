const assert=require('node:assert/strict');
const fs=require('node:fs');
const crypto=require('node:crypto');
const {chromium}=require('playwright');

(async()=>{
 const source='../Página web existente/3. Probabilidad/5. Probabilidad total y Teorema de Bayes.txt';
 assert.equal(crypto.createHash('sha256').update(fs.readFileSync(source)).digest('hex'),'87ec5c86cd1ece3d8d9461ca5a17bbcb079e2b95f37ebd8f75e95acbdabe57e2');
 assert.equal(95+297,392);
 assert.equal(8+19,27);
 const base='http://127.0.0.1:4173/';
 const browser=await chromium.launch({headless:true,executablePath:process.env.CHROME_PATH});
 try{
  const page=await browser.newPage({viewport:{width:1200,height:850}}),errors=[];
  page.on('pageerror',e=>errors.push(e.message));
  page.on('response',r=>{if(r.status()>=400&&!r.url().endsWith('favicon.ico'))errors.push(r.status()+' '+r.url());});
  for(const prefix of [base,base+'prueba-subcarpeta/']){
   if(prefix!==base)await page.route(prefix+'**',async route=>{const response=await route.fetch({url:route.request().url().replace(prefix,base)});await route.fulfill({response});});
   await page.goto(prefix+'libro/temas/07-probabilidad/10-teorema-de-bayes.html');
   await page.waitForFunction(()=>!!document.querySelector('#site-header a')&&document.querySelectorAll('mjx-container').length>=15);
   assert.equal(await page.locator('main section:not([data-content-availability])').count(),9);
   assert.equal(await page.locator('[data-mml-node="merror"]').count(),0);
   assert.equal(await page.locator('#prueba tbody tr').count(),2);
   assert.equal(await page.locator('[data-content-role="objectives"]').count(),1);
   assert.equal(await page.locator('nav[aria-label="Apartados de la lección"] a').count(),9);
   assert.equal(await page.locator('#comprobacion details').count(),2);
   assert.equal(await page.locator('#errores li').count(),5);
   await page.locator('#prueba summary').click();
   assert.match((await page.locator('#prueba details').innerText()).replace(/\s/g,''),/0,24235/);
   await page.locator('#comprobacion summary').first().click();
   assert.match((await page.locator('#comprobacion details').first().innerText()).replace(/\s/g,''),/297\/392/);
   await page.locator('#comprobacion summary').last().click();
   assert.match((await page.locator('#comprobacion details').last().innerText()).replace(/\s/g,''),/19\/27/);
   await page.goto(prefix+'libro/temas/07-probabilidad/index.html');
   await page.waitForFunction(()=>!!document.querySelector('#site-header a'));
   assert.equal(await page.locator('[data-topic-index] li').filter({hasText:'Contenido parcial'}).count(),10);
  }
  await page.goto(base+'libro/temas/07-probabilidad/10-teorema-de-bayes.html');
  await page.setViewportSize({width:390,height:844});
  await page.evaluate(()=>document.documentElement.style.fontSize='200%');
  assert.equal(await page.evaluate(()=>document.documentElement.scrollWidth>innerWidth),false);
  const nojs=await browser.newPage({javaScriptEnabled:false});
  await nojs.goto(base+'libro/temas/07-probabilidad/10-teorema-de-bayes.html');
  assert.equal(await nojs.locator('main section:not([data-content-availability])').count(),9);
  assert.equal(await nojs.locator('#comprobacion details').count(),2);await nojs.close();
  assert.deepEqual(errors,[]);
  console.log('PASS: fuente, Bayes, fórmulas, índice, raíz/subcarpeta, móvil y sin JS.');
 }finally{await browser.close();}
})().catch(e=>{console.error(e);process.exitCode=1;});










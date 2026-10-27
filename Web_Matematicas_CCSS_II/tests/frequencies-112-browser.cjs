const assert=require('node:assert/strict');
const fs=require('node:fs');
const crypto=require('node:crypto');
const {chromium}=require('playwright');

(async()=>{
 const source='../Página web existente/3. Probabilidad/2. Tipos de probabilidad.txt';
 assert.equal(crypto.createHash('sha256').update(fs.readFileSync(source)).digest('hex'),'ba5abc4e5c9086450b3c7441fdd80420b7b3454647c723117d27bf8142cb2454');
 const base='http://127.0.0.1:4173/';
 const browser=await chromium.launch({headless:true,executablePath:process.env.CHROME_PATH});
 try{
  const page=await browser.newPage({viewport:{width:1200,height:850}}),errors=[];
  page.on('pageerror',e=>errors.push(e.message));
  page.on('response',r=>{if(r.status()>=400&&!r.url().endsWith('favicon.ico'))errors.push(r.status()+' '+r.url());});
  for(const prefix of [base,base+'prueba-subcarpeta/']){
   if(prefix!==base)await page.route(prefix+'**',async route=>{const response=await route.fetch({url:route.request().url().replace(prefix,base)});await route.fulfill({response});});
   await page.goto(prefix+'libro/temas/07-probabilidad/04-frecuencias.html');
   await page.waitForFunction(()=>!!document.querySelector('#site-header a')&&document.querySelectorAll('mjx-container').length>=10);
   assert.equal(await page.locator('main section').count(),5);
   assert.equal(await page.locator('[data-mml-node="merror"]').count(),0);
   assert.match((await page.locator('#casos').innerText()).replace(/\s/g,''),/8,5%/);
   await page.locator('#casos summary').click();
   assert.match((await page.locator('#casos details').innerText()).replace(/\s/g,''),/12%/);
   await page.goto(prefix+'libro/temas/07-probabilidad/index.html');
   await page.waitForFunction(()=>!!document.querySelector('#site-header a'));
   assert.equal(await page.locator('[data-topic-index] li').filter({hasText:'Contenido parcial'}).count(),10);
  }
  await page.goto(base+'libro/temas/07-probabilidad/04-frecuencias.html');
  await page.setViewportSize({width:390,height:844});
  await page.evaluate(()=>document.documentElement.style.fontSize='200%');
  assert.equal(await page.evaluate(()=>document.documentElement.scrollWidth>innerWidth),false);
  const nojs=await browser.newPage({javaScriptEnabled:false});
  await nojs.goto(base+'libro/temas/07-probabilidad/04-frecuencias.html');
  assert.equal(await nojs.locator('main section').count(),5);await nojs.close();
  assert.deepEqual(errors,[]);
  console.log('PASS: fuente, frecuencias, fórmulas, índice, raíz/subcarpeta, móvil y sin JS.');
 }finally{await browser.close();}
})().catch(e=>{console.error(e);process.exitCode=1;});







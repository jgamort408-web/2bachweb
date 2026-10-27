const assert=require('node:assert/strict');
const fs=require('node:fs');
const crypto=require('node:crypto');
const {chromium}=require('playwright');

(async()=>{
 const source='../Página web existente/3. Probabilidad/6. Ejercicios resueltos.txt';
 assert.equal(crypto.createHash('sha256').update(fs.readFileSync(source)).digest('hex'),'4e6dd0e04f480d856b4eb094c8ecbe77ee0be630665f8f03621d641eb3ba9d37');
 const pages=JSON.parse(fs.readFileSync('config/pages.json','utf8'));
 assert.equal(pages.filter(p=>p.parentId==='t07'&&p.kind==='lesson').length,10);
 assert.equal(pages.find(p=>p.id==='t07-exercises').kind,'section');
 const base='http://127.0.0.1:4173/';
 const browser=await chromium.launch({headless:true,executablePath:process.env.CHROME_PATH});
 try{
  const page=await browser.newPage({viewport:{width:1200,height:850}}),errors=[];
  page.on('pageerror',e=>errors.push(e.message));
  page.on('response',r=>{if(r.status()>=400&&!r.url().endsWith('favicon.ico'))errors.push(r.status()+' '+r.url());});
  for(const prefix of [base,base+'prueba-subcarpeta/']){
   if(prefix!==base)await page.route(prefix+'**',async route=>{const response=await route.fetch({url:route.request().url().replace(prefix,base)});await route.fulfill({response});});
   await page.goto(prefix+'libro/temas/07-probabilidad/ejercicios-resueltos.html');
   await page.waitForFunction(()=>!!document.querySelector('#site-header a')&&document.querySelectorAll('mjx-container').length>30);
   assert.equal(await page.locator('main article[data-content-role="worked-example"]').count(),12);
   assert.equal(await page.locator('#total article, #bayes article').count(),8);
   assert.equal(await page.locator('#ampliaciones article').count(),4);
   assert.equal(await page.locator('main article details').count(),12);
   assert.equal(await page.locator('[data-mml-node="merror"]').count(),0);
   await page.locator('#ejercicio-52 summary').click();
   assert.match((await page.locator('#ejercicio-52 details').innerText()).replace(/\s/g,''),/56\/131/);
   await page.goto(prefix+'libro/temas/07-probabilidad/index.html');
   await page.waitForFunction(()=>!!document.querySelector('#site-header a'));
   assert.equal(await page.locator('[data-topic-index] li').count(),10);
   assert.equal(await page.locator('[data-topic-index] li').filter({hasText:'Contenido parcial'}).count(),10);
   assert.equal(await page.locator('#problemas a').count(),1);
  }
  await page.goto(base+'libro/temas/07-probabilidad/ejercicios-resueltos.html');
  await page.setViewportSize({width:390,height:844});
  await page.evaluate(()=>document.documentElement.style.fontSize='200%');
  assert.equal(await page.evaluate(()=>document.documentElement.scrollWidth>innerWidth),false);
  const nojs=await browser.newPage({javaScriptEnabled:false});
  await nojs.goto(base+'libro/temas/07-probabilidad/ejercicios-resueltos.html');
  assert.equal(await nojs.locator('main article details').count(),12);await nojs.close();
  assert.deepEqual(errors,[]);
  console.log('PASS: ocho ejercicios originales y cuatro ampliaciones, fórmulas, índice, raíz/subcarpeta, móvil y sin JS.');
 }finally{await browser.close();}
})().catch(e=>{console.error(e);process.exitCode=1;});

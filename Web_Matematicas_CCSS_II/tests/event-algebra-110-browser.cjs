const assert=require('node:assert/strict');
const fs=require('node:fs');
const crypto=require('node:crypto');
const {chromium}=require('playwright');
(async()=>{
 const sources=[['1. Introducción a la probabilidad.txt','7805666e16e1f0b602632fa8d6dd2a8480f4453ff00a7b4b397e104166120d96'],['2. Tipos de probabilidad.txt','ba5abc4e5c9086450b3c7441fdd80420b7b3454647c723117d27bf8142cb2454']];
 for(const [name,hash] of sources)assert.equal(crypto.createHash('sha256').update(fs.readFileSync('../Página web existente/3. Probabilidad/'+name)).digest('hex'),hash);
 const omega=[1,2,3,4,5,6],a=[2,4,6],b=[4,5,6];
 const both=omega.filter(x=>a.includes(x)&&b.includes(x));
 assert.deepEqual(both,[4,6]);
 assert.deepEqual(omega.filter(x=>a.includes(x)||b.includes(x)),[2,4,5,6]);
 assert.deepEqual(omega.filter(x=>a.includes(x)!==b.includes(x)),[2,5]);
 assert.deepEqual(omega.filter(x=>!a.includes(x)&&!b.includes(x)),[1,3]);
 assert.deepEqual(omega.filter(x=>!both.includes(x)),[1,2,3,5]);
 const base='http://127.0.0.1:4173/',browser=await chromium.launch({headless:true,executablePath:process.env.CHROME_PATH});
 try{
  const page=await browser.newPage({viewport:{width:1200,height:850}}),errors=[];
  page.on('pageerror',e=>errors.push(e.message));page.on('response',r=>{if(r.status()>=400&&!r.url().endsWith('favicon.ico'))errors.push(r.status()+' '+r.url());});
  for(const prefix of [base,base+'prueba-subcarpeta/']){
   if(prefix!==base)await page.route(prefix+'**',async route=>{const response=await route.fetch({url:route.request().url().replace(prefix,base)});await route.fulfill({response});});
   await page.goto(prefix+'libro/temas/07-probabilidad/02-algebra-de-sucesos.html');
   await page.waitForFunction(()=>!!document.querySelector('#site-header a')&&document.querySelectorAll('mjx-container').length>15);
   assert.equal(await page.locator('main section').count(),10);
   assert.equal(await page.locator('#operaciones tbody tr').count(),4);
   assert.equal(await page.locator('#lenguaje tbody tr').count(),5);
   assert.equal(await page.locator('[data-content-role="objectives"]').count(),1);
   assert.equal(await page.locator('#diagrama svg title').count(),1);
   assert.equal(await page.locator('#diagrama svg desc').count(),1);
   assert.equal(await page.locator('[data-mml-node="merror"]').count(),0);
   await page.locator('#comparacion summary').click();
   assert.match(await page.locator('#comparacion details').innerText(),/Estas cuatro probabilidades|No ambos:/);
   await page.locator('#ejemplo summary').click();
   assert.match((await page.locator('#ejemplo details').innerText()).replace(/\s/g,''),/4\+10[−-]1=13/);
   await page.goto(prefix+'libro/temas/07-probabilidad/index.html');
   await page.waitForFunction(()=>!!document.querySelector('#site-header a'));
   assert.equal(await page.locator('[data-topic-index] li').filter({hasText:'Contenido parcial'}).count(),10);
  }
  await page.goto(base+'libro/temas/07-probabilidad/02-algebra-de-sucesos.html');
  await page.setViewportSize({width:390,height:844});await page.evaluate(()=>document.documentElement.style.fontSize='200%');
  assert.equal(await page.evaluate(()=>document.documentElement.scrollWidth>innerWidth),false);
  const nojs=await browser.newPage({javaScriptEnabled:false});await nojs.goto(base+'libro/temas/07-probabilidad/02-algebra-de-sucesos.html');assert.equal(await nojs.locator('#ejemplo details').count(),1);assert.equal(await nojs.locator('#comparacion details').count(),1);await nojs.close();
  assert.deepEqual(errors,[]);console.log('PASS: fuentes, sucesos, Venn, fórmulas, índice, móvil y sin JS.');
 }finally{await browser.close();}
})().catch(e=>{console.error(e);process.exitCode=1;});









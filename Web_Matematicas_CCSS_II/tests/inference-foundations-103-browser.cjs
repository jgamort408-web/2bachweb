const assert=require('node:assert/strict');
const fs=require('node:fs');
const crypto=require('node:crypto');
const {chromium}=require('playwright');
(async()=>{
 const source=fs.readFileSync('../Página web existente/5. Inferencia Estadística/0. Presentación.txt');
 assert.equal(crypto.createHash('sha256').update(source).digest('hex'),'2e61d377d29827b2e92c94e1ae4609fcfdeca28720e8db74db99e0131c08e75e');
 const {questions,flashcards}=await import('../content/activities/catalog.js');assert.equal(questions.length,347);assert.equal(flashcards.length,405);
 const base='http://127.0.0.1:4173/',browser=await chromium.launch({headless:true,executablePath:process.env.CHROME_PATH});
 try{
  const page=await browser.newPage({viewport:{width:1200,height:900}}),errors=[];
  page.on('pageerror',e=>errors.push(e.message));page.on('response',r=>{if(r.status()>=400&&!r.url().endsWith('favicon.ico'))errors.push(r.status()+' '+r.url());});
  for(const prefix of [base,base+'prueba-subcarpeta/']){
   if(prefix!==base)await page.route(prefix+'**',async route=>{const response=await route.fetch({url:route.request().url().replace(prefix,base)});await route.fulfill({response});});
   await page.goto(prefix+'libro/temas/09-inferencia-estadistica/01-estadistica-inferencial.html');
   await page.waitForFunction(()=>!!document.querySelector('#site-header a'));
   assert.equal(await page.locator('main section').count(),6);
   assert.equal(await page.locator('#lenguaje table tbody tr').count(),4);
   assert.match(await page.locator('#ficha').innerText(),/2500|2\.500/);
   assert.match(await page.locator('#ficha').innerText(),/no se conoce/i);
   assert.equal(await page.locator('[data-mml-node="merror"]').count(),0);
   await page.locator('a[href="#ficha"]').click();assert.equal(new URL(page.url()).hash,'#ficha');
   await page.goto(prefix+'libro/temas/09-inferencia-estadistica/index.html');
   await page.waitForFunction(()=>document.querySelector('[data-topic-index]')?.textContent.includes('9.1. Estadística inferencial'));
   assert.match(await page.locator('[data-topic-index]').innerText(),/9\.1\. Estadística inferencial · Contenido parcial/);
  }
  await page.goto(base+'libro/temas/09-inferencia-estadistica/01-estadistica-inferencial.html');
  await page.setViewportSize({width:390,height:844});await page.evaluate(()=>document.documentElement.style.fontSize='200%');
  assert.equal(await page.evaluate(()=>document.documentElement.scrollWidth>innerWidth),false);
  const nojs=await browser.newPage({javaScriptEnabled:false});await nojs.goto(base+'libro/temas/09-inferencia-estadistica/01-estadistica-inferencial.html');
  assert.equal(await nojs.locator('#lenguaje table tbody tr').count(),4);assert.match(await nojs.locator('#limites').innerText(),/no se inventan/i);await nojs.close();
  assert.deepEqual(errors,[]);
  console.log('PASS: presentación intacta, cuatro conceptos, ficha, MathJax, índice, enlaces, raíz/subcarpeta, móvil y sin JS.');
 }finally{await browser.close();}
})().catch(e=>{console.error(e);process.exitCode=1;});


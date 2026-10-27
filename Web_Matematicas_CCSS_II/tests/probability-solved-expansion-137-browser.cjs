const assert=require('node:assert/strict');
const fs=require('node:fs');
const crypto=require('node:crypto');
const {chromium}=require('playwright');
(async()=>{
 const original=fs.readFileSync('../Página web existente/3. Probabilidad/6. Ejercicios resueltos.txt');
 assert.equal(crypto.createHash('sha256').update(original).digest('hex'),'4e6dd0e04f480d856b4eb094c8ecbe77ee0be630665f8f03621d641eb3ba9d37');
 const domain=Array.from({length:8},(_,i)=>i+1),A=domain.filter(x=>x%2===0),B=domain.filter(x=>x>=6);
 assert.equal(A.filter(x=>B.includes(x)).length/8,1/4);
 assert.equal(new Set([...A,...B]).size/8,5/8);
 assert.equal(domain.filter(x=>A.includes(x)!==B.includes(x)).length/8,3/8);
 assert.equal(4/7*3/6+3/7*4/6,4/7);
 assert.equal(12/18,2/3);assert.equal(12/20,3/5);assert.notEqual(12/40,(20/40)*(18/40));
 assert.equal(3+4+3,10);assert.equal(10/60,1/6);assert.equal(6/15,2/5);
 const browser=await chromium.launch({headless:true,executablePath:process.env.CHROME_PATH});
 try{
  const page=await browser.newPage({viewport:{width:1200,height:900}}),errors=[];
  page.on('pageerror',e=>errors.push(e.message));page.on('response',r=>{if(r.status()>=400&&!r.url().endsWith('favicon.ico'))errors.push(r.status()+' '+r.url());});
  for(const prefix of ['http://127.0.0.1:4173/','http://127.0.0.1:4173/prueba-subcarpeta/']){
   if(prefix.includes('prueba-subcarpeta'))await page.route(prefix+'**',async route=>{const response=await route.fetch({url:route.request().url().replace(prefix,'http://127.0.0.1:4173/')});await route.fulfill({response});});
   await page.goto(prefix+'libro/temas/07-probabilidad/ejercicios-resueltos.html#ampliaciones');
   await page.waitForFunction(()=>!!window.MathJax?.startup?.promise);
   assert.equal(await page.locator('article[data-content-role="worked-example"]').count(),12);
   assert.equal(await page.locator('#ampliaciones article').count(),4);
   assert.equal(await page.locator('#ampliaciones details').count(),4);
   assert.equal(await page.locator('#ampliacion-c table caption').count(),1);
   assert.deepEqual(await page.locator('#ampliacion-c tbody td').allTextContents(),['12','8','20','6','14','20','18','22','40']);
   assert.equal(await page.locator('[data-mml-node="merror"]').count(),0);
   assert.equal(await page.locator('nav a[href="#ampliaciones"]').count(),1);
  }
  await page.unrouteAll({behavior:'wait'});
  await page.setViewportSize({width:390,height:844});await page.evaluate(()=>document.documentElement.style.fontSize='200%');
  assert.equal(await page.evaluate(()=>document.documentElement.scrollWidth>innerWidth),false);
  const reading=await browser.newPage({javaScriptEnabled:false});await reading.goto('http://127.0.0.1:4173/libro/temas/07-probabilidad/ejercicios-resueltos.html#ampliaciones');
  assert.equal(await reading.locator('#ampliaciones details').count(),4);await reading.close();
  assert.deepEqual(errors,[]);
  console.log('PASS: 8 originales y 4 ampliaciones, cálculos, MathJax, subcarpeta, móvil y soluciones sin JS.');
 }finally{await browser.close();}
})().catch(e=>{console.error(e);process.exitCode=1;});

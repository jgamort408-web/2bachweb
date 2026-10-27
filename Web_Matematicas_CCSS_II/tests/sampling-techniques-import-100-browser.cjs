const assert=require('node:assert/strict');
const fs=require('node:fs');
const crypto=require('node:crypto');
const {chromium}=require('playwright');
(async()=>{
 const source=fs.readFileSync('../Página web existente/5. Inferencia Estadística/6. Tipos de muestreo.txt');
 assert.equal(crypto.createHash('sha256').update(source).digest('hex'),'ec539ccf8d74d7e1a826119ea19b588e4ad1c5bdc4618753a0f0f90c111ae443');
 const base='http://127.0.0.1:4173/';
 const browser=await chromium.launch({headless:true,executablePath:process.env.CHROME_PATH});
 try{
  const page=await browser.newPage({viewport:{width:1200,height:900}}), errors=[];
  page.on('pageerror',e=>errors.push(e.message));
  page.on('response',r=>{if(r.status()>=400&&!r.url().endsWith('favicon.ico'))errors.push(r.status()+' '+r.url());});
  for(const prefix of [base,base+'prueba-subcarpeta/']){
   if(prefix!==base)await page.route(prefix+'**',async route=>{const response=await route.fetch({url:route.request().url().replace(prefix,base)});await route.fulfill({response});});
   await page.goto(prefix+'libro/temas/09-inferencia-estadistica/03-tecnicas-de-muestreo.html');
   await page.waitForFunction(()=>!!document.querySelector('#site-header a'));
   assert.equal(await page.locator('#probabilisticas article').count(),4);
   assert.equal(await page.locator('#no-probabilisticas article').count(),4);
   assert.equal(await page.locator('[data-mml-node="merror"]').count(),0);
   assert.match(await page.locator('#sistematico').innerText(),/958/);
   assert.match(await page.locator('#cuotas').innerText(),/35, 38 y 27/);
   await page.locator('a[href="#no-probabilisticas"]').click();
   assert.equal(new URL(page.url()).hash,'#no-probabilisticas');
   assert.equal(await page.evaluate(()=>document.documentElement.scrollWidth>innerWidth),false);
   await page.goto(prefix+'libro/temas/09-inferencia-estadistica/index.html');
   assert.equal(await page.locator('a[href="03-tecnicas-de-muestreo.html"]').count()>0,true);
   await page.waitForFunction(()=>document.querySelector('[data-topic-index]')?.textContent.includes('9.3. Técnicas de muestreo'));
   assert.match(await page.locator('[data-topic-index]').innerText(),/9\.3\. Técnicas de muestreo · Contenido parcial/);
  }
  await page.goto(base+'libro/temas/09-inferencia-estadistica/03-tecnicas-de-muestreo.html');
  await page.setViewportSize({width:390,height:844});await page.evaluate(()=>document.documentElement.style.fontSize='200%');
  assert.equal(await page.evaluate(()=>document.documentElement.scrollWidth>innerWidth),false);
  assert.deepEqual(errors,[]);
  console.log('PASS: fuente, ocho técnicas, ejemplos, MathJax, enlaces, índice, raíz/subcarpeta y móvil al 200 %.');
 }finally{await browser.close();}
})().catch(e=>{console.error(e);process.exitCode=1;});

const assert=require('node:assert/strict');
const {readFileSync}=require('node:fs');
const {createHash}=require('node:crypto');
const path=require('node:path');
const {chromium}=require('playwright');
const original=path.resolve(__dirname,'../../Página web existente/5. Inferencia Estadística/2.2. Distribución de la proporción muestral.txt');
assert.equal(createHash('sha256').update(readFileSync(original)).digest('hex'),'fb5a079092df86f284b0ec31e61b1793695089919cd6dde66d7fff9c67b32ac3');
const base='http://127.0.0.1:4173/';
const lesson='libro/temas/09-inferencia-estadistica/04-distribucion-muestral-teorema-central-del-limite.html';
(async()=>{
 const browser=await chromium.launch({headless:true,executablePath:process.env.CHROME_PATH});
 try{
  for(const subfolder of [false,true]){
   const context=await browser.newContext({viewport:{width:390,height:844}});
   const page=await context.newPage(),errors=[];
   page.on('pageerror',error=>errors.push(error.message));
   page.on('response',response=>{if(response.status()>=400)errors.push(response.status()+' '+response.url());});
   if(subfolder){const prefix=base+'prueba-subcarpeta/';await page.route(prefix+'**',async route=>{const response=await route.fetch({url:route.request().url().replace(prefix,base)});await route.fulfill({response});});}
   await page.goto(base+(subfolder?'prueba-subcarpeta/':'')+lesson,{waitUntil:'networkidle'});
   await page.waitForFunction(()=>document.querySelectorAll('mjx-container').length>10);
   assert.equal(await page.locator('#ejemplo-comercio details').count(),1);
   assert.equal(await page.locator('[data-proportion-adventure] [data-stage]').count(),4);
   assert.equal(await page.locator('[data-proportion-adventure] [data-stage]:visible').count(),1);
   await page.locator('[data-proportion-adventure] [data-stage="1"] [data-answer="wrong"]').first().click();
   assert.match(await page.locator('[data-proportion-adventure] [data-stage="1"] [data-feedback]').innerText(),/varianza/);
   assert.equal(await page.locator('[data-proportion-adventure] [data-stage="1"] [data-next]:visible').count(),0);
   await page.locator('[data-proportion-adventure] [data-stage="1"] [data-answer="correct"]').focus();
   await page.keyboard.press('Enter');
   await page.locator('[data-proportion-adventure] [data-stage="1"] [data-next]').click();
   await page.locator('[data-proportion-adventure] [data-stage="2"] [data-answer="correct"]').click();
   await page.locator('[data-proportion-adventure] [data-stage="2"] [data-next]').click();
   await page.locator('[data-proportion-adventure] [data-stage="3"] [data-answer="correct"]').click();
   await page.locator('[data-proportion-adventure] [data-stage="3"] [data-next]').click();
   assert.match(await page.locator('[data-proportion-adventure] [data-stage="4"]').innerText(),/6,63 %/);
   await page.locator('[data-proportion-adventure] [data-restart]').click();
   assert.equal(await page.locator('[data-proportion-adventure] [data-stage="1"]:visible').count(),1);
   assert.equal(await page.locator('[data-proportion-adventure] [data-stage="1"] [data-answer="correct"]').isEnabled(),true);
   assert.equal(await page.locator('mjx-merror').count(),0);
   await page.evaluate(()=>document.documentElement.style.fontSize='200%');
   assert.equal(await page.evaluate(()=>document.documentElement.scrollWidth<=innerWidth),true,'desbordamiento horizontal');
   assert.deepEqual(errors,[]);
   await context.close();
  }
  const context=await browser.newContext({javaScriptEnabled:false});
  const page=await context.newPage();await page.goto(base+lesson);
  assert.equal(await page.locator('[data-proportion-adventure] [data-stage]:visible').count(),4);
  assert.equal(await page.locator('[data-proportion-adventure] [data-adventure-fallback]:visible').count(),3);
  await context.close();
  console.log('Entrega 96: raíz, subcarpeta, MathJax, respuestas, teclado, reinicio, móvil y sin JS correctos.');
 }finally{await browser.close();}
})().catch(error=>{console.error(error);process.exitCode=1;});

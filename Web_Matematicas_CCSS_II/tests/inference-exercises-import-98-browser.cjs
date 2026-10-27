const assert=require('node:assert/strict');
const {readFileSync}=require('node:fs');
const {createHash}=require('node:crypto');
const path=require('node:path');
const {chromium}=require('playwright');

const original=path.resolve(__dirname,'../../Página web existente/5. Inferencia Estadística/4. Ejercicios resueltos.txt');
const raw=readFileSync(original,'utf8');
assert.equal(createHash('sha256').update(readFileSync(original)).digest('hex'),'223af63b58a08064f4176cc90db6ab236af324fb271dd55b9afcbb71af89f067');
const begin=raw.indexOf('[',raw.indexOf('const ejercicios ='));
const source=JSON.parse(raw.slice(begin,raw.indexOf('];',begin)+1));
assert.equal(source.length,27);
const base='http://127.0.0.1:4173/';
const lesson='libro/temas/09-inferencia-estadistica/ejercicios-resueltos.html';

(async()=>{
 const browser=await chromium.launch({headless:true,executablePath:process.env.CHROME_PATH});
 try{
  for(const subfolder of [false,true]){
   const context=await browser.newContext({viewport:{width:390,height:844}}),page=await context.newPage(),errors=[];
   page.on('pageerror',error=>errors.push(error.message));
   page.on('response',response=>{if(response.status()>=400)errors.push(response.status()+' '+response.url());});
   if(subfolder){const prefix=base+'prueba-subcarpeta/';await page.route(prefix+'**',async route=>{const response=await route.fetch({url:route.request().url().replace(prefix,base)});await route.fulfill({response});});}
   await page.goto(base+(subfolder?'prueba-subcarpeta/':'')+lesson,{waitUntil:'networkidle'});
   await page.waitForFunction(()=>document.querySelectorAll('mjx-container').length>100,{timeout:30000});
   assert.ok((await page.locator('#site-header').innerText()).length>0);
   assert.ok((await page.locator('#site-footer').innerText()).length>0);
   const ids=await page.locator('[data-inference-exercise]').evaluateAll(nodes=>nodes.map(node=>node.dataset.originalId));
   assert.deepEqual(ids,source.map(item=>item.id));
   assert.equal(await page.locator('[data-inference-exercise]:visible').count(),1);
   assert.equal(await page.locator('[data-inference-exercise-select] option').count(),28);
   await page.locator('[data-inference-exercise="1"] summary').click();
   assert.match(await page.locator('[data-inference-exercise="1"] [data-content-role="key-idea"]').innerText(),/2,28 %/);
   await page.locator('[data-inference-exercise-select]').selectOption('17');
   assert.equal(await page.locator('[data-inference-exercise="17"]:visible').count(),1);
   assert.equal(new URL(page.url()).hash,'#ejercicio-17');
   await page.locator('[data-inference-exercise="17"] summary').focus();
   await page.keyboard.press('Enter');
   assert.match(await page.locator('[data-inference-exercise="17"] [data-content-role="key-idea"]').innerText(),/81,94 %/);
   await page.locator('[data-inference-exercise-select]').selectOption('all');
   assert.equal(await page.locator('[data-inference-exercise]:visible').count(),27);
   assert.equal(new URL(page.url()).hash,'#ejercicios');
   await page.evaluate(()=>{location.hash='#ejercicio-27';});
   await page.waitForFunction(()=>document.querySelector('[data-inference-exercise="27"]')?.hidden===false);
   assert.equal(await page.locator('[data-inference-exercise]:visible').count(),1);
   assert.equal(await page.locator('mjx-merror').count(),0);
   await page.evaluate(()=>document.documentElement.style.fontSize='200%');
   assert.equal(await page.evaluate(()=>document.documentElement.scrollWidth<=innerWidth),true,'desbordamiento horizontal al 200 %');
   assert.deepEqual(errors,[]);
   await context.close();
  }
  const context=await browser.newContext({javaScriptEnabled:false}),page=await context.newPage();
  await page.goto(base+lesson);
  assert.equal(await page.locator('[data-inference-exercise]:visible').count(),27);
  assert.equal(await page.locator('[data-inference-exercise-controls]:visible').count(),0);
  assert.equal(await page.locator('[data-solution]').count(),27);
  await page.locator('[data-inference-exercise="27"] summary').click();
  assert.match(await page.locator('[data-inference-exercise="27"] [data-content-role="key-idea"]').innerText(),/95 %/);
  await context.close();
  console.log('Entrega 98: 27/27 originales, MathJax, filtro, teclado, raíz/subcarpeta, móvil y sin JS correctos.');
 }finally{await browser.close();}
})().catch(error=>{console.error(error);process.exitCode=1;});

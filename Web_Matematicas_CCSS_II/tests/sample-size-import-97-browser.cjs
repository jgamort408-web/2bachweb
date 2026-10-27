const assert=require('node:assert/strict');
const {readFileSync}=require('node:fs');
const {createHash}=require('node:crypto');
const path=require('node:path');
const {chromium}=require('playwright');
const original=path.resolve(__dirname,'../../Página web existente/5. Inferencia Estadística/3. Error y tamaño muestral.txt');
assert.equal(createHash('sha256').update(readFileSync(original)).digest('hex'),'214e94920068be91a48f175564dc3a3973d1dbbb3ca116cfe5b12de864f1469a');
const base='http://127.0.0.1:4173/';
const lesson='libro/temas/09-inferencia-estadistica/08-tamano-de-la-muestra-error-cometido.html';
(async()=>{
 const browser=await chromium.launch({headless:true,executablePath:process.env.CHROME_PATH});
 try{
  for(const subfolder of [false,true]){
   const context=await browser.newContext({viewport:{width:390,height:844}}),page=await context.newPage(),errors=[];
   page.on('pageerror',error=>errors.push(error.message));
   page.on('response',response=>{if(response.status()>=400)errors.push(response.status()+' '+response.url());});
   if(subfolder){const prefix=base+'prueba-subcarpeta/';await page.route(prefix+'**',async route=>{const response=await route.fetch({url:route.request().url().replace(prefix,base)});await route.fulfill({response});});}
   await page.goto(base+(subfolder?'prueba-subcarpeta/':'')+lesson,{waitUntil:'networkidle'});
   await page.waitForFunction(()=>document.querySelectorAll('mjx-container').length>=5);
   assert.equal(await page.locator('mjx-merror').count(),0);
   assert.equal(await page.locator('[data-sample-size-form]:visible').count(),1);
   assert.equal(await page.locator('figure svg[role="img"]').count(),1);
   await page.locator('#size-sigma').fill('10');
   await page.locator('#size-target').fill('2');
   await page.locator('[data-sample-size-form] button').focus();
   await page.keyboard.press('Enter');
   assert.match(await page.locator('[data-sample-size-output]').innerText(),/Muestra mínima: 97/);
   await page.locator('#size-confidence').selectOption('99');
   await page.locator('[data-sample-size-form] button').click();
   assert.match(await page.locator('[data-sample-size-output]').innerText(),/Muestra mínima: 166/);
   await page.evaluate(()=>document.documentElement.style.fontSize='200%');
   const overflow=await page.evaluate(()=>({width:innerWidth,scroll:document.documentElement.scrollWidth,offenders:[...document.querySelectorAll('body *')].filter(el=>el.getBoundingClientRect().right>innerWidth+1&&!el.closest('mjx-container')).map(el=>({tag:el.tagName,id:el.id,right:Math.round(el.getBoundingClientRect().right),html:el.outerHTML.slice(0,90)})).slice(0,12),math:[...document.querySelectorAll('.math-scroll')].map(el=>({width:el.clientWidth,scroll:el.scrollWidth,right:el.getBoundingClientRect().right}))}));
   assert.equal(overflow.scroll<=overflow.width,true,'desbordamiento horizontal: '+JSON.stringify(overflow));
   assert.deepEqual(errors,[]);
   await context.close();
  }
  const context=await browser.newContext({javaScriptEnabled:false}),page=await context.newPage();
  await page.goto(base+lesson);
  assert.equal(await page.locator('[data-sample-size-form]:visible').count(),0);
  assert.match(await page.locator('#tamano').innerText(),/34,02/);
  assert.match(await page.locator('#planificador').innerText(),/Sin JavaScript/);
  await context.close();
  console.log('Entrega 97: raíz, subcarpeta, MathJax, cálculo, teclado, móvil y sin JS correctos.');
 }finally{await browser.close();}
})().catch(error=>{console.error(error);process.exitCode=1;});

const assert=require('node:assert/strict'),fs=require('node:fs'),path=require('node:path');
const {chromium}=require('playwright');const {fixture}=require('./helpers/local-site.cjs');
(async()=>{
 const browser=await chromium.launch({headless:true,executablePath:process.env.CHROME_PATH||'C:/Program Files/Google/Chrome/Application/chrome.exe'});
 const out=path.resolve(__dirname,'../../tmp/selectividad-sync');fs.mkdirSync(out,{recursive:true});
 try {
  const context=await browser.newContext({serviceWorkers:'block',viewport:{width:1280,height:900}});await fixture(context);const page=await context.newPage(),errors=[];page.on('pageerror',e=>errors.push(e.message));
  for(const [file,id,labels] of [['04-matrices-y-determinantes.html','SEL-D0084-OA-E01',['a)','b)','c)']],['07-probabilidad.html','SEL-D0075-OB-E03',['a)','b)','a)','b)']]]){
   await page.goto('http://libro.test/selectividad/'+file+'#'+id);
   await page.waitForFunction(()=>window.MathJax?.startup?.document);
   await page.evaluate(async id=>{const m=await import('/assets/js/core/math.js');await m.renderMath(document.getElementById(id));},id);
   const article=page.locator('#'+id);assert.deepEqual(await article.locator('li[data-label]').evaluateAll(nodes=>nodes.map(e=>e.dataset.label)),labels);
   assert.ok(await article.locator('mjx-container').count()>0);assert.equal(await article.locator('[data-mml-node="merror"]').count(),0);
   if(id==='SEL-D0084-OA-E01')assert.ok(!(await article.locator('mjx-assistive-mml').allTextContents()).join('').includes('$'),'La matriz no debe mostrar dólares de delimitación');
   await article.scrollIntoViewIfNeeded();await page.screenshot({path:path.join(out,id+'.png')});
   assert.ok(await article.locator('a[href*="libro/temas/"]').count()>0);
  }
  assert.deepEqual(errors,[]);console.log('Matrices y probabilidad: enunciados completos, letras de apartados, fórmulas y enlaces verificados.');
 }finally{await browser.close();}
})().catch(e=>{console.error(e);process.exitCode=1;});

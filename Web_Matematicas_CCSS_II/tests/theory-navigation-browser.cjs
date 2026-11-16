const fs=require('node:fs'),path=require('node:path'),assert=require('node:assert/strict');
const {chromium}=require('playwright');
const {cases,fixture,typeset}=require('./helpers/local-site.cjs');
const out=path.resolve(__dirname,'../../tmp/teoria-25');
(async()=>{
 fs.mkdirSync(out,{recursive:true});
 const browser=await chromium.launch({headless:true,executablePath:process.env.CHROME_PATH||'C:/Program Files/Google/Chrome/Application/chrome.exe'});
 const results=[];
 try {
  const context=await browser.newContext({serviceWorkers:'block'});await fixture(context);
  for(const [index,item] of cases.entries()){
   const page=await context.newPage();const errors=[];page.on('pageerror',e=>errors.push(e.message));
   await page.setViewportSize({width:360,height:800});
   await page.goto('http://libro.test/'+item.file+'#'+item.anchor);await page.waitForFunction(()=>window.MathJax?.startup?.document);await page.evaluate(async()=>{const m=await import('/assets/js/core/math.js');await m.renderMath(document.querySelector('main'));});await page.waitForTimeout(150);
   const nav=page.locator('.mc-toc'),details=nav.locator('details'),summary=details.locator('summary');
   const target=page.locator('#'+item.anchor);
   const clear=async()=>{
    const geometry=await target.evaluate(e=>{const nav=document.querySelector('.mc-toc').getBoundingClientRect(),target=e.getBoundingClientRect();return {top:target.top,bottom:nav.bottom};});
    assert.ok(geometry.top>=geometry.bottom-2,JSON.stringify({file:item.file,...geometry}));
   };
   assert.ok(!await details.evaluate(e=>e.open));await clear();
   await summary.focus();await page.keyboard.press('Enter');assert.ok(await details.evaluate(e=>e.open));
   await page.keyboard.press('Escape');assert.ok(!await details.evaluate(e=>e.open));assert.ok(await summary.evaluate(e=>e===document.activeElement));
   await page.keyboard.press('Enter');
   const link=nav.locator('a[href="#'+item.anchor+'"]');await link.focus();await page.keyboard.press('Enter');
   assert.ok(!await details.evaluate(e=>e.open));assert.ok(await target.evaluate(e=>e===document.activeElement));await clear();
   assert.equal(new URL(page.url()).hash,'#'+item.anchor);
   // El foco sale del índice al recorrer sus enlaces: no queda un panel abierto encima de la lectura.
   await summary.focus();await page.keyboard.press('Enter');const last=nav.locator('a').last();await last.focus();await page.keyboard.press('Tab');await page.waitForTimeout(100);assert.ok(!await details.evaluate(e=>e.open));
   await page.setViewportSize({width:1280,height:800});await page.waitForTimeout(100);assert.ok(await details.evaluate(e=>e.open));
   await page.setViewportSize({width:360,height:800});await page.evaluate(()=>document.documentElement.style.fontSize='200%');await page.waitForTimeout(150);
   await summary.focus();await page.keyboard.press('Enter');await link.focus();await page.keyboard.press('Enter');await clear();
   assert.ok(await target.evaluate(e=>e===document.activeElement));
   await page.evaluate(()=>document.documentElement.style.fontSize='100%');await page.waitForTimeout(100);await target.evaluate(e=>e.scrollIntoView({block:'start'}));
   if([3,11,15].includes(index))await page.screenshot({path:path.join(out,'navigation-'+(index+1)+'.png')});
   assert.deepEqual(errors,[]);results.push({file:item.file,anchor:item.anchor,keyboard:true,escape:true,focusExit:true,desktop:true,enlargedText:true});await page.close();
   console.log('Navegación verificada: '+(index+1));
  }
 } finally {fs.writeFileSync(path.join(out,'navigation.json'),JSON.stringify(results,null,2));await browser.close();}
 assert.equal(results.length,16);console.log('16 páginas: navegación por teclado, foco y anclas verificadas.');
})().catch(e=>{console.error(e);process.exitCode=1;});

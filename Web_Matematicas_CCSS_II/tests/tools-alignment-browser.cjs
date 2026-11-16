const assert=require('node:assert/strict');
const fs=require('node:fs'),path=require('node:path');
const expected=JSON.parse(fs.readFileSync(path.resolve(__dirname,'../config/formulas.json'),'utf8')).formulas.length;
const {chromium}=require('playwright');
const {fixture,typeset}=require('./helpers/local-site.cjs');
(async()=>{
 const browser=await chromium.launch({headless:true,executablePath:process.env.CHROME_PATH||'C:/Program Files/Google/Chrome/Application/chrome.exe'});
 try {
  const context=await browser.newContext({serviceWorkers:'block',viewport:{width:360,height:800}});await fixture(context);const page=await context.newPage();const errors=[];page.on('pageerror',e=>errors.push(e.message));
  await page.goto('http://libro.test/herramientas/formulario.html');await typeset(page);
  assert.equal(await page.locator('[data-formula-entry]').count(),expected);
  assert.equal(await page.locator('[data-mml-node="merror"]').count(),0);
  assert.equal(await page.locator('main mjx-container').count(),expected);
  assert.equal(await page.locator('main mjx-assistive-mml').count(),expected);
  assert.ok(await page.evaluate(()=>document.documentElement.scrollWidth<=innerWidth+2));
  const input=page.locator('[data-formula-search]');
  const evidence=path.resolve(__dirname,'../../tmp/teoria-26');fs.mkdirSync(evidence,{recursive:true});
  let shot=0;
  for(const query of ['Medias marginales ponderadas','Combinaciones con repetición','Acumulada binomial']){
   await input.fill(query);
   await page.waitForFunction(()=>[...document.querySelectorAll('[data-formula-entry]')].filter(e=>!e.hidden&&!e.classList.contains('is-filtered')).length===1);
   const card=page.locator('[data-formula-entry]:visible');
   if(query.startsWith('Combinaciones'))assert.match(await card.innerText(),/Ampliación opcional/);
   await card.scrollIntoViewIfNeeded();await page.screenshot({path:path.join(evidence,'formulario-'+(++shot)+'.png')});
   await card.locator('a').getAttribute('href').then(href=>assert.ok(href));
  }
  await page.locator('[data-formula-topic]').selectOption('bivariate');await input.fill('');
  assert.equal(await page.locator('[data-formula-entry]:visible').count(),10);
  await page.locator('[data-formula-topic]').selectOption('');
  await input.fill('Afijación proporcional');
  await page.waitForFunction(()=>[...document.querySelectorAll('[data-formula-entry]')].filter(e=>!e.hidden&&!e.classList.contains('is-filtered')).length===1);
  const entry=page.locator('[data-formula-entry]:visible');assert.match(await entry.innerText(),/Asignaciones ideales/);
  await entry.locator('a').click();assert.match(page.url(),/03-tecnicas-de-muestreo/);
  assert.deepEqual(errors,[]);
  console.log(expected+' fórmulas y MathML auxiliar; búsquedas, filtro bidimensional, ampliación opcional y enlace verificados en móvil.');
 }finally{await browser.close();}
})().catch(e=>{console.error(e);process.exitCode=1;});

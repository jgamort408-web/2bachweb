
const assert=require('node:assert/strict'),fs=require('node:fs'),path=require('node:path'),{createHash}=require('node:crypto'),{pathToFileURL}=require('node:url'),{chromium}=require('playwright');
const root=path.resolve(__dirname,'..'),base=process.env.TEST_URL||'http://127.0.0.1:4173/',folder='libro/temas/08-distribuciones-de-probabilidad/',lesson=folder+'03-distribucion-normal.html';
(async()=>{
 const original=fs.readFileSync(path.resolve(root,'../Página web existente/4. Distribuciones/3. Distribución Normal.txt'));
 assert.equal(createHash('sha256').update(original).digest('hex'),'0ca90f4cdd30b81ffcf053cfd31e21ad4904bde9c656f48acb225e00afa8d1f0');
 const source=[...original.toString().matchAll(/<input id="([^"]+)" type="range" min="([^"]+)" max="([^"]+)" step="([^"]+)" value="([^"]+)"/g)].map(m=>m.slice(1));
 assert.equal(source.length,5);assert.equal((original.toString().match(/<svg id=/g)||[]).length,4);
 const {normalReadings}=await import(pathToFileURL(path.join(root,'content/models/normal-distribution.js')));
 const {questions,flashcards}=await import(pathToFileURL(path.join(root,'content/activities/catalog.js')));
 assert.equal(questions.length,(await import('./helpers/catalog-expectations.mjs')).expectedCatalog.questions);assert.equal(flashcards.length,(await import('./helpers/catalog-expectations.mjs')).expectedCatalog.cards);
 const editorial=JSON.parse(fs.readFileSync(path.join(root,'config/editorial.json')));
 assert.equal(editorial.pages['t08-e03'],'partial');assert.ok(['pending','partial','reviewed'].includes(editorial.pages['t08-e04']||editorial.defaultStatus));
 const browser=await chromium.launch({headless:true,executablePath:process.env.CHROME_PATH});
 try{
 const page=await browser.newPage({viewport:{width:1280,height:960}}),errors=[],external=[];
 page.on('pageerror',e=>errors.push(e.message));
 page.on('response',r=>{if(r.status()>=400&&!r.url().endsWith('favicon.ico'))errors.push(r.status()+' '+r.url());});
 page.on('request',r=>{if(/^https?:/.test(r.url())&&!r.url().startsWith(base))external.push(r.url());});
 const values=async()=>page.locator('[data-normal-controls] input').evaluateAll(els=>Object.fromEntries(els.map(e=>[e.name,Number(e.value)])));
 async function ready(){
  await page.locator('[data-normal-controls]:not([hidden])').waitFor();
  const expected=normalReadings(await values());
  await page.waitForFunction(e=>{const d=document.querySelector('[data-normal-readouts]').dataset;return ['zk','za','zb','Fk','interval'].every(k=>d[k.toLowerCase()]!==undefined&&Math.abs(Number(d[k.toLowerCase()])-e[k])<1e-12)},expected);
  await page.waitForFunction(()=>(!document.querySelector('.math-status')||document.querySelector('.math-status').hidden)&&!/\\[\[(]/.test(document.querySelector('main').innerText));
  assert.equal(await page.locator('[data-mml-node="merror"]').count(),0);
  assert.equal(await page.evaluate(()=>document.documentElement.scrollWidth>innerWidth),false);
  assert.equal(await page.locator('.normal-plot-scroll > div > svg').count(),4);
  for(const svg of await page.locator('.normal-plot-scroll > div > svg').all()){
   assert.equal(await svg.getAttribute('viewBox'),'0 0 680 320');
   assert.ok((await svg.locator('title').textContent()).length>0);assert.ok((await svg.locator('desc').textContent()).length>0);
   for(const d of await svg.locator('[data-normal-curve],[data-normal-area]').evaluateAll(els=>els.map(el=>el.getAttribute('d')))){
    assert.ok(!/NaN|Infinity/.test(d));const ns=d.match(/-?\d+(?:\.\d+)?/g)?.map(Number)||[];
    for(let i=0;i<ns.length;i++)assert.ok(ns[i]>=0&&ns[i]<=(i%2?320:680),d);
   }
  }
 }
 async function set(obj){await page.evaluate(obj=>{for(const [key,value]of Object.entries(obj)){const el=document.querySelector('#normal-'+key);el.value=value;el.dispatchEvent(new Event('input',{bubbles:true}));}},obj);await ready();}
 for(const sub of [false,true]){
  const prefix=sub?base+'prueba-subcarpeta/':base;
  if(sub)await page.route(prefix+'**',async route=>{const response=await route.fetch({url:route.request().url().replace(prefix,base)});await route.fulfill({response});});
  await page.goto(prefix+lesson);await ready();
  for(const [name,min,max,step,value]of source){
   const input=page.locator('#normal-'+name);
   for(const [key,v]of Object.entries({min,max,step}))assert.equal(await input.getAttribute(key),v);
   assert.equal(Number(await input.inputValue()),Number(value));assert.ok(await input.evaluate(el=>el.labels.length===1));
  }
  assert.ok(Math.abs(Number(await page.locator('[data-normal-readouts]').getAttribute('data-interval'))-.682689492137)<2e-7);
  const curve=await page.locator('#normal-pdf [data-normal-curve]').getAttribute('d');
  await set({sigma:2.5});assert.notEqual(await page.locator('#normal-pdf [data-normal-curve]').getAttribute('d'),curve);
  await set({mu:2,sigma:.5,a:4,b:-4,k:-4});
  assert.match(await page.locator('[data-normal-summary]').innerText(),/a supera a b/);
  assert.equal(await page.locator('#normal-k').inputValue(),'-4');assert.equal(await page.locator('[data-value="k"]').innerText(),'-4,0');
  assert.ok(Number(await page.locator('[data-normal-readouts]').getAttribute('data-fk'))<1e-30);
  await set({a:1,b:1});assert.equal(Number(await page.locator('[data-normal-readouts]').getAttribute('data-interval')),0);
  await page.evaluate(()=>{for(let i=0;i<30;i++){const e=document.querySelector('#normal-mu');e.value=-2+i%41/10;e.dispatchEvent(new Event('input',{bubbles:true}));}});
  await set({mu:0,sigma:1,a:-1,b:1,k:.8});
  await page.locator('#normal-k').focus();await page.keyboard.press('ArrowRight');await ready();assert.equal(Number(await page.locator('#normal-k').inputValue()),.9);
  await set({k:.8});
  assert.equal(await page.locator('#normal-cdf [data-normal-area]').count(),0);assert.equal(await page.locator('#normal-pdf [data-normal-area]').count(),1);
  if(!sub&&process.env.SCREENSHOT_DIR)for(const [id,file]of [['normal-pdf','normal-densidad'],['normal-cdf','normal-acumulada']])await page.locator('#'+id).screenshot({path:process.env.SCREENSHOT_DIR+'/'+file+'.png'});
  if(!sub&&process.env.SCREENSHOT_DIR)await page.locator('[data-normal-readouts]').screenshot({path:process.env.SCREENSHOT_DIR+'/normal-lecturas.png'});
  await page.locator('[data-reading-controls]>summary').click();await page.locator('[data-text-size]').selectOption('200');await page.locator('[data-contrast-control]').check();await page.locator('[data-highlight-control]').check();
  await page.setViewportSize({width:320,height:844});await ready();
  const frame=page.locator('.normal-plot-scroll').last();await frame.focus();await page.keyboard.press('ArrowRight');await page.waitForTimeout(200);assert.ok(await frame.evaluate(el=>el.scrollLeft>0));
  if(!sub&&process.env.SCREENSHOT_DIR)await page.locator('[data-normal-controls]').screenshot({path:process.env.SCREENSHOT_DIR+'/normal-controles-movil.png'});
  await set({mu:2});await page.reload();await ready();assert.equal(Number(await page.locator('#normal-mu').inputValue()),0);assert.equal(await page.locator('[data-text-size]').inputValue(),'200');
  await page.locator('[data-reading-controls]>summary').click();await page.locator('[data-reset-reading]').click();await page.setViewportSize({width:1280,height:960});
  await page.getByRole('link',{name:'Volver al tema 8',exact:true}).click();assert.match(await page.locator('[data-source-section="4.3"]').innerText(),/Contenido parcial disponible/);
 }
 const context=await browser.newContext({javaScriptEnabled:false}),fallback=await context.newPage();
 await fallback.goto(base+lesson);assert.equal(await fallback.locator('[data-normal-controls]').isVisible(),false);
 assert.match(await fallback.locator('#funciones').innerText(),/distribución/);assert.match(await fallback.locator('#explorador').innerText(),/necesita JavaScript/);await context.close();
 assert.deepEqual(errors,[]);assert.deepEqual(external,[]);
 console.log('PASS: original source, five controls and four plots; calculations/rapid updates; reversed/equal/extreme bounds; LaTeX, keyboard, mobile 200%, root/subfolder, preferences, no-JS and current catalog.');
 }finally{await browser.close();}
})().catch(e=>{console.error(e);process.exitCode=1});



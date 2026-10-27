const assert=require('node:assert/strict'),{chromium}=require('playwright'),fs=require('node:fs'),path=require('node:path'),{createHash}=require('node:crypto');
const base=process.env.TEST_URL||'http://127.0.0.1:4173/',lesson='libro/apoyos/estadistica-bidimensional.html';
(async()=>{
 const originals=path.resolve(__dirname,'../../Página web existente');
 const hashes={
  'Inicio.txt':'985c96051b3ff0eaa86c4732e123850542b1ed277d4fe63d9d36aacc8cad70cb',
  '1. Programación Lineal/0. Presentación.txt':'985c96051b3ff0eaa86c4732e123850542b1ed277d4fe63d9d36aacc8cad70cb',
  '1. Programación Lineal/1. Inecuaciones.txt':'eb272271f4b5ca059ec703d287425b5c419ef59ecb0cabd2e2f900b7ccda50cc',
  '1. Programación Lineal/2. Sistemas de inecuaciones.txt':'5d963b48bb98ab92aef7222307925ffe9088d55139fd63ce11b2fcb17899a588',
  '1. Programación Lineal/3. Programación Lineal.txt':'82d9466ebbe563c0d8a3724c1eeb031f312c7a7082b360bda11d55bf7502f03b',
  '1. Programación Lineal/4. El método gráfico.txt':'455c45b45dea0bd4641009e6af0d179d92eb41d741a1ce5708052ba7d248709c',
 '1. Programación Lineal/5. Ejercicios Resueltos.txt':'cf12fac3410b388d7a9588987dead55b0237a5d8b41865a9975c2a98a6efb24d',
 '1. Programación Lineal/6. Flashcards.txt':'58ae420a2140ec783ba86c07793a14ff187b23eef6d996581f98348cb2b5d87a',
 '2. Estadística Bidimensional/0. Presentación.txt':'7d6818dc9467b37270ccda847eda6c8dc524f1d090ddb4e234725b3f746d4e60'
 };
 for(const [name,hash] of Object.entries(hashes))assert.equal(createHash('sha256').update(fs.readFileSync(path.join(originals,name))).digest('hex'),hash);



 const {flashcards,questions}=await import('../content/activities/catalog.js');
 assert.equal(flashcards.length,(await import('./helpers/catalog-expectations.mjs')).expectedCatalog.cards);assert.equal(questions.length,(await import('./helpers/catalog-expectations.mjs')).expectedCatalog.questions);
 const editorial=JSON.parse(fs.readFileSync(path.resolve(__dirname,'../config/editorial.json'),'utf8'));
 assert.equal(editorial.pages.bivariate,'partial');
 const browser=await chromium.launch({headless:true,executablePath:process.env.CHROME_PATH});
 try{
 const page=await browser.newPage({viewport:{width:1280,height:960}}),errors=[],external=[];
 page.on('pageerror',e=>errors.push(e.message));
 page.on('response',r=>{if(r.status()>=400&&!r.url().endsWith('favicon.ico'))errors.push(r.status()+' '+r.url());});
 page.on('request',r=>{if(/^https?:/.test(r.url())&&!r.url().startsWith(base))external.push(r.url());});
 const math=async()=>{
 await page.waitForFunction(()=>document.querySelector('.math-status')?.hidden&&!/\\[\[(]/.test(document.querySelector('main').innerText));
 assert.equal(await page.locator('[data-mml-node="merror"]').count(),0);
 assert.equal(await page.evaluate(()=>document.documentElement.scrollWidth>innerWidth),false);
 };
 for(const sub of [false,true]){
 const prefix=sub?new URL('prueba-subcarpeta/',base).href:base;
 if(sub)await page.route(prefix+'**',async route=>{const response=await route.fetch({url:route.request().url().replace(prefix,base)});await route.fulfill({response});});
 await page.goto(prefix+lesson);await math();
 await page.locator('#site-header a').first().waitFor();assert.ok(await page.locator('#site-footer').innerText());
 assert.equal(await page.locator('#tabla .table-scroll').evaluate(el=>el.scrollWidth>el.clientWidth),false);
 const table=await page.locator('[data-frequency-table]').evaluate(el=>({
 rows:[...el.querySelectorAll('[data-data-row]')].map(r=>[...r.querySelectorAll('[data-frequency]')].map(c=>Number(c.textContent))),
 rowTotals:[...el.querySelectorAll('[data-row-total]')].map(c=>Number(c.textContent)),
 colTotals:[...el.querySelectorAll('[data-column-total]')].map(c=>Number(c.textContent)),
 total:el.querySelector('[data-grand-total]').textContent,
 headers:[...el.querySelectorAll('td')].every(c=>c.headers.split(' ').every(id=>document.getElementById(id)?.tagName==='TH'))
 }));
 assert.deepEqual(table.rows,[[8,4,1,0],[3,10,5,0],[0,2,6,4]]);
 assert.deepEqual(table.rowTotals,table.rows.map(r=>r.reduce((a,b)=>a+b,0)));
 assert.deepEqual(table.colTotals,table.rows[0].map((_,j)=>table.rows.reduce((a,r)=>a+r[j],0)));
 assert.equal(table.rowTotals.reduce((a,b)=>a+b,0),43);assert.equal(table.colTotals.reduce((a,b)=>a+b,0),43);
 assert.equal(table.total,'N = 43');assert.equal(table.headers,true);
 assert.equal(table.rowTotals.slice(1).reduce((a,b)=>a+b,0),30);
 assert.equal(table.colTotals.slice(1).reduce((a,b)=>a+b,0),32);
 assert.equal(table.rows.slice(1).flatMap(r=>r.slice(1)).reduce((a,b)=>a+b,0),27);
 const graph=page.locator('[data-dimension-diagram]');
 assert.ok(await graph.locator('title').textContent());assert.ok(await graph.locator('desc').textContent());
 for(const name of ['one','two']){
  const geometry=await graph.locator('[data-dimension="'+name+'"]').evaluate(g=>{
   const p=[...g.querySelectorAll('[data-point]')].map(n=>({x:Number(n.getAttribute('cx')),y:Number(n.getAttribute('cy'))}));
   const mean=g.querySelector('[data-mean]');
   return {p,x:Number(mean.getAttribute(mean.tagName==='line'?'x1':'cx')),y:Number(mean.getAttribute('cy'))};
  });
  assert.equal(geometry.p.length,4);assert.equal(geometry.x,geometry.p.reduce((a,p)=>a+p.x,0)/4);
  if(name==='two')assert.equal(geometry.y,geometry.p.reduce((a,p)=>a+p.y,0)/4);
 }
 assert.match(await page.locator('#dimensiones figcaption').innerText(),/no representan las notas/);
 assert.match(await page.locator('#tabla').innerText(),/No equivale aquí/);
 assert.match(await page.locator('#pendiente').innerText(),/notas decimales/);
 assert.equal(await page.locator('[data-quiz],[data-explorer],[data-flashcards]').count(),0);
 await page.getByText('Comprobar los totales y el significado de Aprobado',{exact:true}).press('Enter');await math();
 assert.ok(await page.locator('#lectura details').getAttribute('open')!==null);
 assert.match(await page.locator('#lectura details').innerText(),/superan ambas/);
 if(!sub&&process.env.SCREENSHOT_DIR){await page.locator('#tabla').screenshot({path:process.env.SCREENSHOT_DIR+'/bidimensional-tabla.png'});await page.locator('#dimensiones').screenshot({path:process.env.SCREENSHOT_DIR+'/bidimensional-dimensiones.png'});}
 await page.locator('[data-reading-controls]>summary').click();await page.locator('[data-text-size]').selectOption('200');await page.locator('[data-contrast-control]').check();await page.locator('[data-highlight-control]').check();await page.setViewportSize({width:320,height:844});await math();
 const scroll=page.locator('#tabla .table-scroll');await scroll.focus();await page.keyboard.press('ArrowRight');
 await page.waitForFunction(()=>document.querySelector('#tabla .table-scroll').scrollLeft>0);
 if(!sub&&process.env.SCREENSHOT_DIR)await page.locator('#lectura').screenshot({path:process.env.SCREENSHOT_DIR+'/bidimensional-lectura-movil.png'});
 await page.reload();await math();assert.equal(await page.locator('[data-text-size]').inputValue(),'200');assert.ok(await page.locator('[data-contrast-control]').isChecked());
 await page.getByRole('link',{name:'Volver al libro',exact:true}).click();
 await page.locator('[data-course-index] article').first().waitFor();assert.equal(await page.locator('[data-course-index] article').count(),9);
 assert.match(await page.locator('[data-course-index] article').nth(5).innerText(),/0 de 5.*Contenido parcial en 5/);
 await page.getByRole('link',{name:'Estadística bidimensional',exact:true}).click();await math();
 await page.getByRole('link',{name:'Conexiones con programación lineal',exact:true}).click();
 await page.waitForFunction(()=>location.hash==='#itinerario-original'&&!document.documentElement.classList.contains('content-pending'));if(await page.locator('#itinerario-original').getAttribute('open')===null) await page.locator('#itinerario-original summary').press('Enter');
 await page.locator('#itinerario-original').getByRole('link',{name:'Estadística bidimensional',exact:true}).click();await math();
 await page.locator('[data-reading-controls]>summary').click();await page.locator('[data-reset-reading]').click();await page.setViewportSize({width:1280,height:960});
 }
 assert.deepEqual(errors,[]);assert.deepEqual(external,[]);
 console.log('PASS: nine original hashes, 12 frequencies, row/column marginals and 43 total, 30/32/27 pass counts, SVG means, LaTeX, keyboard table, 320px/200%, preferences, root/subfolder and navigation; banks unchanged.');
 }finally{for(const context of browser.contexts())for(const page of context.pages())await page.unrouteAll({behavior:'ignoreErrors'});await browser.close();}
})().catch(e=>{console.error(e);process.exitCode=1;});



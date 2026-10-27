const assert=require('node:assert/strict'),{chromium}=require('playwright'),fs=require('node:fs'),path=require('node:path'),{createHash}=require('node:crypto');
const base=process.env.TEST_URL||'http://127.0.0.1:4173/',topic='libro/temas/06-programacion-lineal/',lesson=topic+'03-programacion-lineal.html';
(async()=>{
 const originals=path.resolve(__dirname,'../../Página web existente');
 const hashes={
  'Inicio.txt':'985c96051b3ff0eaa86c4732e123850542b1ed277d4fe63d9d36aacc8cad70cb',
  '1. Programación Lineal/0. Presentación.txt':'985c96051b3ff0eaa86c4732e123850542b1ed277d4fe63d9d36aacc8cad70cb',
  '1. Programación Lineal/1. Inecuaciones.txt':'eb272271f4b5ca059ec703d287425b5c419ef59ecb0cabd2e2f900b7ccda50cc',
  '1. Programación Lineal/2. Sistemas de inecuaciones.txt':'5d963b48bb98ab92aef7222307925ffe9088d55139fd63ce11b2fcb17899a588',
  '1. Programación Lineal/3. Programación Lineal.txt':'82d9466ebbe563c0d8a3724c1eeb031f312c7a7082b360bda11d55bf7502f03b'
 };
 for(const [name,hash] of Object.entries(hashes))assert.equal(createHash('sha256').update(fs.readFileSync(path.join(originals,name))).digest('hex'),hash);
 const browser=await chromium.launch({headless:true,executablePath:process.env.CHROME_PATH});
 try{
  const page=await browser.newPage({viewport:{width:1280,height:960}}),errors=[],external=[];
  page.on('pageerror',e=>errors.push(e.message));page.on('response',r=>{if(r.status()>=400&&!r.url().endsWith('favicon.ico'))errors.push(r.status()+' '+r.url());});
  page.on('request',r=>{if(/^https?:/.test(r.url())&&!r.url().startsWith(base))external.push(r.url());});
  const math=async()=>{
   await page.waitForFunction(()=>document.querySelector('.math-status')?.hidden&&!/\\[\[(]/.test(document.querySelector('main').innerText));
   const d=await page.evaluate(()=>({text:document.querySelector('main').innerText,errors:document.querySelectorAll('[data-mml-node="merror"]').length,overflow:document.documentElement.scrollWidth>innerWidth}));
   assert.equal(d.errors,0);assert.doesNotMatch(d.text,/\\[\[(]/);assert.equal(d.overflow,false);
  };
  for(const sub of [false,true]){
   const prefix=sub?new URL('prueba-subcarpeta/',base).href:base;
   if(sub)await page.route(prefix+'**',async route=>{const response=await route.fetch({url:route.request().url().replace(prefix,base)});await route.fulfill({response});});
   await page.goto(prefix+topic+'index.html');await page.locator('[data-topic-index] li').first().waitFor();
   const items=await page.locator('[data-topic-index] li').allTextContents();assert.equal(items.length,5);assert.match(items[0],/Contenido parcial/);assert.match(items[1],/Contenido parcial/);assert.match(items[2],/Contenido parcial/);assert.equal(items.filter(t=>t.includes('En preparación')).length,0);
   await page.getByText('Conexiones con estadística y probabilidad',{exact:true}).press('Enter');
   assert.ok(await page.locator('#itinerario-original').getAttribute('open')!==null);
   const links=await page.locator('#itinerario-original a').evaluateAll(nodes=>nodes.map(n=>n.href));
   for(const url of links){const response=await page.request.get(url.replace(prefix,base));assert.equal(response.status(),200);}
   await page.locator('[data-topic-index] a').nth(2).press('Enter');assert.equal(page.url(),prefix+lesson);await math();
   await page.locator('#site-header a').first().waitFor();assert.ok(await page.locator('#site-footer').innerText());
   assert.match(await page.locator('#variables').innerText(),/sillas/);assert.match(await page.locator('#variables').innerText(),/mesas/);
   assert.match(await page.locator('#objetivo').innerText(),/maximizar o minimizar/);
   assert.match(await page.locator('#restricciones').innerText(),/no es un sistema numérico/);
   assert.match(await page.locator('#no-negatividad').innerText(),/No es una regla universal/);
   assert.match(await page.locator('#no-negatividad').innerText(),/incluidos los ejes/);
   assert.doesNotMatch(await page.locator('#no-negatividad').innerText(),/Siempre debes añadir/);
   assert.match(await page.locator('#pendiente').innerText(),/no proporciona un problema numérico completo/i);
   assert.equal(await page.locator('[data-quiz], [data-explorer]').count(),0);
   const graph=page.locator('[data-source-diagram]');assert.equal(await graph.getAttribute('role'),'img');assert.ok(await graph.locator('title').textContent());assert.ok(await graph.locator('desc').textContent());
   assert.deepEqual(await graph.locator('[data-flow-node]').evaluateAll(nodes=>nodes.map(n=>n.dataset.flowNode)),['variables','restricciones','objetivo']);
   assert.equal(await graph.locator('[data-flow-arrow]').count(),2);
   const boxes=await graph.locator('[data-flow-node]').evaluateAll(nodes=>nodes.map(n=>({y:n.getBBox().y,height:n.getBBox().height})));
   assert.ok(boxes[0].y+boxes[0].height<boxes[1].y&&boxes[1].y+boxes[1].height<boxes[2].y);
   assert.ok(await page.locator('#objetivo mjx-container').count()>0);

   if(!sub&&process.env.SCREENSHOT_DIR)await page.locator('#flujo').screenshot({path:process.env.SCREENSHOT_DIR+'/programacion-lineal-modelo-escritorio.png'});
   await page.locator('[data-reading-controls]>summary').click();await page.locator('[data-text-size]').selectOption('200');await page.locator('[data-contrast-control]').check();await page.locator('[data-highlight-control]').check();await page.setViewportSize({width:320,height:844});await math();
   await page.getByRole('link',{name:'No negatividad',exact:true}).press('Enter');assert.match(page.url(),/#no-negatividad$/);await math();
   if(!sub&&process.env.SCREENSHOT_DIR)await page.locator('#no-negatividad').screenshot({path:process.env.SCREENSHOT_DIR+'/programacion-lineal-modelo-movil.png'});
   await page.getByRole('link',{name:'Anterior: sistemas de inecuaciones',exact:true}).click();await math();await page.getByRole('link',{name:'Siguiente: programación lineal (contenido parcial)',exact:true}).click();await math();
   await page.getByRole('link',{name:'Volver al tema 6',exact:true}).click();assert.equal(page.url(),prefix+topic+'index.html');await page.locator('[data-topic-index] li').first().waitFor();
   await page.goto(prefix+'libro/index.html');await page.locator('[data-course-index] article').first().waitFor();
   const cards=page.locator('[data-course-index] article');assert.equal(await cards.count(),9);assert.match(await cards.nth(5).innerText(),/0 de 5.*Contenido parcial en 5/);assert.match(await cards.nth(4).innerText(),/11 de 11/);
   await page.locator('[data-reading-controls]>summary').click();await page.locator('[data-reset-reading]').click();await page.setViewportSize({width:1280,height:960});
  }
  assert.deepEqual(errors,[]);assert.deepEqual(external,[]);
  console.log('Aprobado: cinco fuentes intactas, tres piezas y diagrama conservados, no negatividad contextual, LaTeX local, cinco lecciones parciales, navegación anterior/siguiente, teclado, móvil 320/200 %, contraste y subcarpeta.');
 }finally{for(const context of browser.contexts())for(const page of context.pages())await page.unrouteAll({behavior:'wait'});await browser.close();}
})().catch(e=>{console.error(e);process.exitCode=1;});

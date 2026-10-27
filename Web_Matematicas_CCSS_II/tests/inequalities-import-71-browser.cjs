const assert=require('node:assert/strict'),{chromium}=require('playwright'),fs=require('node:fs'),path=require('node:path'),{createHash}=require('node:crypto');
const base=process.env.TEST_URL||'http://127.0.0.1:4173/',topic='libro/temas/06-programacion-lineal/',lesson=topic+'01-inecuaciones-lineales-con-dos-incognitas.html';
(async()=>{
 const originals=path.resolve(__dirname,'../../Página web existente');
 const hashes={
  'Inicio.txt':'985c96051b3ff0eaa86c4732e123850542b1ed277d4fe63d9d36aacc8cad70cb',
  '1. Programación Lineal/0. Presentación.txt':'985c96051b3ff0eaa86c4732e123850542b1ed277d4fe63d9d36aacc8cad70cb',
  '1. Programación Lineal/1. Inecuaciones.txt':'eb272271f4b5ca059ec703d287425b5c419ef59ecb0cabd2e2f900b7ccda50cc'
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
   const items=await page.locator('[data-topic-index] li').allTextContents();assert.equal(items.length,5);assert.match(items[0],/Contenido parcial/);assert.equal(items.filter(t=>t.includes('En preparación')).length,0);
   await page.getByText('Conexiones con estadística y probabilidad',{exact:true}).press('Enter');
   assert.ok(await page.locator('#itinerario-original').getAttribute('open')!==null);
   const links=await page.locator('#itinerario-original a').evaluateAll(nodes=>nodes.map(n=>n.href));
   for(const url of links){const response=await page.request.get(url.replace(prefix,base));assert.equal(response.status(),200);}
   await page.locator('[data-topic-index] a').first().press('Enter');assert.equal(page.url(),prefix+lesson);await math();
   await page.locator('#site-header a').first().waitFor();assert.ok(await page.locator('#site-footer').innerText());
   assert.match(await page.locator('#metodo').innerText(),/no esté en la recta frontera/);
   assert.match(await page.locator('#pendiente').innerText(),/pendientes/);
   assert.equal(await page.locator('[data-quiz], [data-explorer]').count(),0);
   const graph=page.locator('[data-source-diagram]');assert.equal(await graph.getAttribute('role'),'img');assert.ok(await graph.locator('title').textContent());assert.ok(await graph.locator('desc').textContent());
   const geom=await graph.evaluate(svg=>({boundary:svg.querySelector('[data-boundary]').getAttribute('d'),region:svg.querySelector('[data-region]').getAttribute('d'),points:[...svg.querySelectorAll('circle')].map(p=>[+p.getAttribute('cx'),+p.getAttribute('cy')])}));
   const coordinates=d=>Array.from(d.matchAll(/(-?\d+(?:\.\d+)?)\s+(-?\d+(?:\.\d+)?)/g),m=>[Number(m[1]),Number(m[2])]);
   const world=([px,py])=>[(px-40)/20,(200-py)/20],lhs=([x,y])=>x+2*y;
   const boundary=coordinates(geom.boundary),region=coordinates(geom.region);assert.equal(boundary.length,2);assert.equal(region.length,3);
   for(const p of boundary)assert.equal(lhs(world(p)),10);
   for(let i=0;i<=10;i++)for(let j=0;j<=10-i;j++){const a=i/10,b=j/10,c=1-a-b,p=region[0].map((_,k)=>a*region[0][k]+b*region[1][k]+c*region[2][k]);assert.ok(lhs(world(p))<=10+1e-12);}
   assert.deepEqual(geom.points.map(world),[[0,5],[10,0],[0,0]]);
   if(!sub&&process.env.SCREENSHOT_DIR)await page.locator('#ejemplo-grafico').screenshot({path:process.env.SCREENSHOT_DIR+'/inecuaciones-fuente-escritorio.png'});
   await page.locator('[data-reading-controls]>summary').click();await page.locator('[data-text-size]').selectOption('200');await page.locator('[data-contrast-control]').check();await page.locator('[data-highlight-control]').check();await page.setViewportSize({width:320,height:844});await math();
   await page.getByRole('link',{name:'Método de representación',exact:true}).press('Enter');assert.match(page.url(),/#metodo$/);await math();
   if(!sub&&process.env.SCREENSHOT_DIR)await page.locator('#metodo').screenshot({path:process.env.SCREENSHOT_DIR+'/inecuaciones-fuente-movil.png'});
   await page.getByRole('link',{name:'Volver al tema 6',exact:true}).click();assert.equal(page.url(),prefix+topic+'index.html');await page.locator('[data-topic-index] li').first().waitFor();
   await page.goto(prefix+'libro/index.html');await page.locator('[data-course-index] article').first().waitFor();
   const cards=page.locator('[data-course-index] article');assert.equal(await cards.count(),9);assert.match(await cards.nth(5).innerText(),/0 de 5.*Contenido parcial en 5/);assert.match(await cards.nth(4).innerText(),/11 de 11/);
   await page.locator('[data-reading-controls]>summary').click();await page.locator('[data-reset-reading]').click();await page.setViewportSize({width:1280,height:960});
  }
  assert.deepEqual(errors,[]);assert.deepEqual(external,[]);
  console.log('Aprobado: fuentes intactas, gráfico coherente, hipótesis y frontera, LaTeX local, estados parciales, once lecciones de sistemas conservadas en índice, teclado, móvil 320/200 %, contraste, enlaces y subcarpeta.');
 }finally{for(const context of browser.contexts())for(const page of context.pages())await page.unrouteAll({behavior:'wait'});await browser.close();}
})().catch(e=>{console.error(e);process.exitCode=1;});

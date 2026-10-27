const assert=require('node:assert/strict'),{chromium}=require('playwright'),fs=require('node:fs'),path=require('node:path'),{createHash}=require('node:crypto');
const base=process.env.TEST_URL||'http://127.0.0.1:4173/',topic='libro/temas/06-programacion-lineal/',lesson=topic+'02-sistemas-de-inecuaciones-lineales-con-dos-incognitas.html';
(async()=>{
 const originals=path.resolve(__dirname,'../../Página web existente');
 const hashes={
  'Inicio.txt':'985c96051b3ff0eaa86c4732e123850542b1ed277d4fe63d9d36aacc8cad70cb',
  '1. Programación Lineal/0. Presentación.txt':'985c96051b3ff0eaa86c4732e123850542b1ed277d4fe63d9d36aacc8cad70cb',
  '1. Programación Lineal/1. Inecuaciones.txt':'eb272271f4b5ca059ec703d287425b5c419ef59ecb0cabd2e2f900b7ccda50cc',
  '1. Programación Lineal/2. Sistemas de inecuaciones.txt':'5d963b48bb98ab92aef7222307925ffe9088d55139fd63ce11b2fcb17899a588'
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
   const items=await page.locator('[data-topic-index] li').allTextContents();assert.equal(items.length,5);assert.match(items[0],/Contenido parcial/);assert.match(items[1],/Contenido parcial/);assert.equal(items.filter(t=>t.includes('En preparación')).length,0);
   await page.getByText('Conexiones con estadística y probabilidad',{exact:true}).press('Enter');
   assert.ok(await page.locator('#itinerario-original').getAttribute('open')!==null);
   const links=await page.locator('#itinerario-original a').evaluateAll(nodes=>nodes.map(n=>n.href));
   for(const url of links){const response=await page.request.get(url.replace(prefix,base));assert.equal(response.status(),200);}
   await page.locator('[data-topic-index] a').nth(1).press('Enter');assert.equal(page.url(),prefix+lesson);await math();
   await page.locator('#site-header a').first().waitFor();assert.ok(await page.locator('#site-footer').innerText());
   assert.match(await page.locator('#vertices').innerText(),/no vacío, cerrado y acotado/);assert.match(await page.locator('#tipos').innerText(),/vacía/);
   assert.match(await page.locator('#pendiente').innerText(),/pendientes/);
   assert.equal(await page.locator('[data-quiz], [data-explorer]').count(),0);
   const graph=page.locator('[data-source-diagram]');assert.equal(await graph.getAttribute('role'),'img');assert.ok(await graph.locator('title').textContent());assert.ok(await graph.locator('desc').textContent());
   const geom=await graph.evaluate(svg=>({r1:svg.querySelector('[data-region-one]').getAttribute('d'),r2:svg.querySelector('[data-region-two]').getAttribute('d'),boundary:svg.querySelector('[data-boundary-one]').getAttribute('d'),vertical:svg.querySelector('[data-boundary-two]').getAttribute('d'),region:svg.querySelector('[data-feasible]').getAttribute('d'),points:[...svg.querySelectorAll('[data-vertex]')].map(p=>[+p.getAttribute('cx'),+p.getAttribute('cy')])}));
   const coordinates=d=>Array.from(d.matchAll(/(-?\d+(?:\.\d+)?)\s+(-?\d+(?:\.\d+)?)/g),m=>[Number(m[1]),Number(m[2])]);
   const world=([px,py])=>[(px-40)/4,(280-py)/4],valid=([x,y])=>x>=-1e-9&&y>=-1e-9&&x<=40+1e-9&&x+y<=60+1e-9;
   const boundary=coordinates(geom.boundary).map(world),region=coordinates(geom.region).map(world);
   assert.equal(boundary.length,2);for(const [x,y] of boundary)assert.equal(x+y,60);
   assert.equal(geom.vertical,'M200 20V280');assert.deepEqual(geom.points.map(world),[[0,0],[40,0],[40,20],[0,60]]);
   assert.deepEqual(region,geom.points.map(world));
   const constraints=[[1,1,60],[1,0,40],[-1,0,0],[0,-1,0]],vertices=[];
   for(let i=0;i<4;i++)for(let j=i+1;j<4;j++){
    const [a,b,c]=constraints[i],[d,e,f]=constraints[j],det=a*e-b*d;if(!det)continue;
    const point=[(c*e-b*f)/det||0,(a*f-c*d)/det||0];
    if(valid(point))vertices.push(point);
   }
   const normalized=list=>list.map(p=>p.join(',')).sort();assert.deepEqual(normalized(vertices),normalized(region));
   let samples=0;
   for(let i=0;i<=10;i++)for(let j=0;j<=10-i;j++)for(let k=0;k<=10-i-j;k++){
    const weights=[i,j,k,10-i-j-k].map(v=>v/10),point=[0,1].map(axis=>weights.reduce((n,w,index)=>n+w*region[index][axis],0));
    assert.ok(valid(point));samples++;
   }
   assert.equal(samples,286);
   const area=Math.abs(region.reduce((sum,p,i)=>sum+p[0]*region[(i+1)%4][1]-p[1]*region[(i+1)%4][0],0))/2;assert.equal(area,1600);
   for(const [x,y] of coordinates(geom.r1).map(world))assert.ok(x>=0&&y>=0&&x+y<=60);
   for(const [x,y] of coordinates(geom.r2).map(world))assert.ok(x>=0&&x<=40&&y>=0);
   assert.equal(valid([60,0]),false);
   await page.getByText('Comprobar las esquinas del ejemplo',{exact:true}).press('Enter');await math();assert.ok(await page.locator('#vertices details').getAttribute('open')!==null);

   if(!sub&&process.env.SCREENSHOT_DIR)await page.locator('#interseccion').screenshot({path:process.env.SCREENSHOT_DIR+'/sistemas-inecuaciones-escritorio.png'});
   await page.locator('[data-reading-controls]>summary').click();await page.locator('[data-text-size]').selectOption('200');await page.locator('[data-contrast-control]').check();await page.locator('[data-highlight-control]').check();await page.setViewportSize({width:320,height:844});await math();
   await page.getByRole('link',{name:'Tipos de región',exact:true}).press('Enter');assert.match(page.url(),/#tipos$/);await math();
   if(!sub&&process.env.SCREENSHOT_DIR)await page.locator('#tipos').screenshot({path:process.env.SCREENSHOT_DIR+'/sistemas-inecuaciones-movil.png'});
   await page.getByRole('link',{name:'Volver al tema 6',exact:true}).click();assert.equal(page.url(),prefix+topic+'index.html');await page.locator('[data-topic-index] li').first().waitFor();
   await page.goto(prefix+'libro/index.html');await page.locator('[data-course-index] article').first().waitFor();
   const cards=page.locator('[data-course-index] article');assert.equal(await cards.count(),9);assert.match(await cards.nth(5).innerText(),/0 de 5.*Contenido parcial en 5/);assert.match(await cards.nth(4).innerText(),/11 de 11/);
   await page.locator('[data-reading-controls]>summary').click();await page.locator('[data-reset-reading]').click();await page.setViewportSize({width:1280,height:960});
  }
  assert.deepEqual(errors,[]);assert.deepEqual(external,[]);
  console.log('Aprobado: fuentes intactas, intersección y cuatro vértices independientes, 286 puntos factibles, hipótesis de extremos, LaTeX local, estados parciales, once lecciones de sistemas conservadas en índice, teclado, móvil 320/200 %, contraste, enlaces y subcarpeta.');
 }finally{for(const context of browser.contexts())for(const page of context.pages())await page.unrouteAll({behavior:'ignoreErrors'});await browser.close();}
})().catch(e=>{console.error(e);process.exitCode=1;});

const assert=require('node:assert/strict'),{chromium}=require('playwright'),fs=require('node:fs'),path=require('node:path'),{createHash}=require('node:crypto');
const base=process.env.TEST_URL||'http://127.0.0.1:4173/',topic='libro/temas/06-programacion-lineal/',lesson=topic+'04-solucion-de-un-problema-de-programacion-lineal.html';
(async()=>{
 const originals=path.resolve(__dirname,'../../Página web existente');
 const hashes={
  'Inicio.txt':'985c96051b3ff0eaa86c4732e123850542b1ed277d4fe63d9d36aacc8cad70cb',
  '1. Programación Lineal/0. Presentación.txt':'985c96051b3ff0eaa86c4732e123850542b1ed277d4fe63d9d36aacc8cad70cb',
  '1. Programación Lineal/1. Inecuaciones.txt':'eb272271f4b5ca059ec703d287425b5c419ef59ecb0cabd2e2f900b7ccda50cc',
  '1. Programación Lineal/2. Sistemas de inecuaciones.txt':'5d963b48bb98ab92aef7222307925ffe9088d55139fd63ce11b2fcb17899a588',
  '1. Programación Lineal/3. Programación Lineal.txt':'82d9466ebbe563c0d8a3724c1eeb031f312c7a7082b360bda11d55bf7502f03b',
  '1. Programación Lineal/4. El método gráfico.txt':'455c45b45dea0bd4641009e6af0d179d92eb41d741a1ce5708052ba7d248709c'
 };
 for(const [name,hash] of Object.entries(hashes))assert.equal(createHash('sha256').update(fs.readFileSync(path.join(originals,name))).digest('hex'),hash);
 // Intersections computed independently from the constraints, including both axes.
 const constraints=[[2,2,18],[1,3,42],[-1,0,0],[0,-1,0]];
 const feasible=([x,y])=>constraints.every(([a,b,c])=>a*x+b*y<=c+1e-10);
 const vertices=[];
 for(let i=0;i<constraints.length;i++)for(let j=i+1;j<constraints.length;j++){
  const [a,b,c]=constraints[i],[d,e,f]=constraints[j],det=a*e-b*d;
  if(det){const v=[(c*e-b*f)/det,(a*f-c*d)/det].map(n=>n===0?0:n);
   if(feasible(v)&&!vertices.some(p=>p[0]===v[0]&&p[1]===v[1]))vertices.push(v);}
 }
 vertices.sort((a,b)=>a[0]-b[0]||a[1]-b[1]);
 assert.deepEqual(vertices,[[0,0],[0,9],[9,0]]);
 assert.equal(feasible([3,12]),false);assert.equal(feasible([0,14]),false);assert.equal(feasible([-7.5,16.5]),false);
 for(const a of [30,40]){
  const points=[];for(let x=0;x<=9;x++)for(let y=0;y<=9;y++)if(feasible([x,y]))points.push({x,y,z:a*x+50*y});
  assert.equal(points.length,55);assert.deepEqual(points.filter(p=>p.z===Math.max(...points.map(p=>p.z))),[{x:0,y:9,z:450}]);
  // Dense fractional lattice and the exact upper-bound identity.
  for(let i=0;i<=90;i++)for(let j=0;j<=90-i;j++){
   const x=i/10,y=j/10;assert.ok(feasible([x,y]));assert.ok(a*x+50*y<=450+1e-10);
   assert.ok(Math.abs((a*x+50*y)-(50*(x+y)-(50-a)*x))<1e-10);
  }
 }
 assert.equal(2*0+2*9,18);assert.equal(42-(0+3*9),15);
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
   const items=await page.locator('[data-topic-index] li').allTextContents();assert.equal(items.length,5);assert.match(items[0],/Contenido parcial/);assert.match(items[1],/Contenido parcial/);assert.match(items[2],/Contenido parcial/);assert.match(items[3],/Contenido parcial/);assert.equal(items.filter(t=>t.includes('En preparación')).length,0);
   await page.getByText('Conexiones con estadística y probabilidad',{exact:true}).press('Enter');
   assert.ok(await page.locator('#itinerario-original').getAttribute('open')!==null);
   const links=await page.locator('#itinerario-original a').evaluateAll(nodes=>nodes.map(n=>n.href));
   for(const url of links){const response=await page.request.get(url.replace(prefix,base));assert.equal(response.status(),200);}
   await page.locator('[data-topic-index] a').nth(3).press('Enter');assert.equal(page.url(),prefix+lesson);await math();
   await page.locator('#site-header a').first().waitFor();assert.ok(await page.locator('#site-footer').innerText());
   assert.equal(await page.locator('#metodo li').count(),5);
   assert.match(await page.locator('#principio').innerText(),/cerrado, acotado y no vacío/);
   assert.match(await page.locator('#region').innerText(),/redundante/);
   assert.match(await page.locator('#evaluacion').innerText(),/0 sillas y 9 mesas.*450 €/);
   assert.match(await page.locator('#variante').innerText(),/segundo supuesto/);
   assert.match(await page.locator('#pendiente').innerText(),/no contiene práctica autocorregible/);
   assert.equal(await page.locator('[data-quiz], [data-explorer]').count(),0);
   const table=await page.locator('[data-resource-table] tbody tr').evaluateAll(rows=>rows.map(r=>[...r.querySelectorAll('td')].map(c=>c.textContent)));
   assert.deepEqual(table,[['2','2','18 h'],['1','3','42 h'],['30','50','Maximizar']]);
   for(const a of [30,40]){
    const rows=await page.locator('[data-objective="'+a+'"] tbody tr').evaluateAll(rows=>rows.map(r=>({point:r.dataset.point.split(',').map(Number),value:Number(r.dataset.value),text:r.textContent})));
    assert.deepEqual(rows.map(r=>r.point).sort((a,b)=>a[0]-b[0]||a[1]-b[1]),vertices);
    for(const row of rows){assert.equal(row.value,a*row.point[0]+50*row.point[1]);assert.ok(row.text.includes(row.value+' €'));}
    assert.equal(rows.filter(r=>r.text.includes('máximo')).length,1);assert.equal(rows.find(r=>r.text.includes('máximo')).value,450);
   }
   const graph=page.locator('[data-source-diagram]');assert.equal(await graph.getAttribute('role'),'img');assert.ok(await graph.locator('title').textContent());assert.ok(await graph.locator('desc').textContent());
   const plotted=await graph.locator('[data-vertex]').evaluateAll(nodes=>nodes.map(n=>[(Number(n.getAttribute('cx'))-50)/20,(330-Number(n.getAttribute('cy')))/20]));
   assert.deepEqual(plotted.sort((a,b)=>a[0]-b[0]||a[1]-b[1]),vertices);
   assert.equal(await graph.locator('[data-feasible-region]').getAttribute('d'),'M50 330L230 330L50 150Z');
   for(const [name,coeff] of [['corte',[2,2,18]],['montaje',[1,3,42]]]){
    const points=(await graph.locator('[data-boundary="'+name+'"]').getAttribute('d')).match(/-?\d+/g).map(Number);
    for(let i=0;i<points.length;i+=2)assert.equal(coeff[0]*(points[i]-50)/20+coeff[1]*(330-points[i+1])/20,coeff[2]);
   }
   await page.getByText('Comprobar las intersecciones descartadas',{exact:true}).press('Enter');
   assert.ok(await page.locator('#vertices details').getAttribute('open')!==null);await math();
   assert.match(await page.locator('#vertices details').innerText(),/30\s+horas de corte/);
   assert.ok(await page.locator('#modelo mjx-container').count()>0);
   if(!sub&&process.env.SCREENSHOT_DIR)await page.locator('#region').screenshot({path:process.env.SCREENSHOT_DIR+'/metodo-grafico-escritorio.png'});
   await page.locator('[data-reading-controls]>summary').click();await page.locator('[data-text-size]').selectOption('200');await page.locator('[data-contrast-control]').check();await page.locator('[data-highlight-control]').check();await page.setViewportSize({width:320,height:844});await math();
   await page.getByRole('link',{name:'Evaluación',exact:true}).press('Enter');assert.match(page.url(),/#evaluacion$/);
   const scroll=page.locator('#evaluacion .table-scroll');await scroll.focus();await page.keyboard.press('ArrowRight');await page.waitForFunction(()=>document.querySelector('#evaluacion .table-scroll').scrollLeft>0);await math();
   await scroll.evaluate(el=>{el.scrollLeft=0;});
   if(!sub&&process.env.SCREENSHOT_DIR)await page.locator('#evaluacion').screenshot({path:process.env.SCREENSHOT_DIR+'/metodo-grafico-movil.png'});
   await page.reload();await math();assert.equal(await page.locator('[data-text-size]').inputValue(),'200');assert.ok(await page.locator('[data-contrast-control]').isChecked());assert.ok(await page.locator('[data-highlight-control]').isChecked());
   await page.getByRole('link',{name:'Anterior: programación lineal',exact:true}).click();await math();await page.getByRole('link',{name:'Siguiente: método gráfico (contenido parcial)',exact:true}).click();await math();

   await page.getByRole('link',{name:'Volver al tema 6',exact:true}).click();assert.equal(page.url(),prefix+topic+'index.html');await page.locator('[data-topic-index] li').first().waitFor();
   await page.goto(prefix+'libro/index.html');await page.locator('[data-course-index] article').first().waitFor();
   const cards=page.locator('[data-course-index] article');assert.equal(await cards.count(),9);assert.match(await cards.nth(5).innerText(),/0 de 5.*Contenido parcial en 5/);assert.match(await cards.nth(4).innerText(),/11 de 11/);
   await page.locator('[data-reading-controls]>summary').click();await page.locator('[data-reset-reading]').click();await page.setViewportSize({width:1280,height:960});
  }
  assert.deepEqual(errors,[]);assert.deepEqual(external,[]);
  console.log('Aprobado: seis originales intactos, intersecciones independientes, 55 combinaciones enteras y 4186 fraccionarias por objetivo, dos máximos correctos, SVG, tablas, LaTeX local, recarga, teclado, móvil 320/200 %, cinco lecciones parciales y subcarpeta.');
 }finally{for(const context of browser.contexts())for(const page of context.pages())await page.unrouteAll({behavior:'ignoreErrors'});await browser.close();}
})().catch(e=>{console.error(e);process.exitCode=1;});

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
 '2. Estadística Bidimensional/0. Presentación.txt':'7d6818dc9467b37270ccda847eda6c8dc524f1d090ddb4e234725b3f746d4e60',
 '2. Estadística Bidimensional/1. La variable bidimensional.txt':'1242fb2bade4d2f2ac2dab5b9a13e8b9fbfb8a9e92b87f496614688de2bf22a8'
 };
 for(const [name,hash] of Object.entries(hashes))assert.equal(createHash('sha256').update(fs.readFileSync(path.join(originals,name))).digest('hex'),hash);




 const scatterSource='2. Estadística Bidimensional/2. La nube de puntos.txt';
 const originalScatter=fs.readFileSync(path.join(originals,scatterSource),'utf8');
 assert.equal(createHash('sha256').update(fs.readFileSync(path.join(originals,scatterSource))).digest('hex'),'816d95d026460386678994fe697880ed854cb97c5eadc26455d440c1a924c297');
 const sourcePoints=[...originalScatter.matchAll(/<svg\b[\s\S]*?<\/svg>/g)].map(m=>[...m[0].matchAll(/<circle cx="([^"]+)" cy="([^"]+)" r="3"/g)].map(c=>[Number(c[1]),Number(c[2])]));
 assert.deepEqual(sourcePoints.map(p=>p.length),[9,8,9,7,6]);

 const covarianceSource='2. Estadística Bidimensional/3. La covarianza.txt';
 assert.equal(createHash('sha256').update(fs.readFileSync(path.join(originals,covarianceSource))).digest('hex'),'8e2bd30f30ef99f7b56718b0869c2852d9316718fb7c34988cd861c5d5727060');
 // Independent arithmetic checks for the definition, shortcut, sign and corrected unit conversion.
 const mean=values=>values.reduce((a,b)=>a+b,0)/values.length;
 const covariance=points=>{
   const mx=mean(points.map(p=>p[0])),my=mean(points.map(p=>p[1]));
   return mean(points.map(p=>(p[0]-mx)*(p[1]-my)));
 };
 const shortcut=points=>mean(points.map(p=>p[0]*p[1]))-mean(points.map(p=>p[0]))*mean(points.map(p=>p[1]));
 const close=(actual,expected)=>assert.ok(Math.abs(actual-expected)<1e-10,actual+' != '+expected);
 const cases=[[[5,6],[7,5],[6,8],[4,4],[9,8]],[[0,0],[1,.6]],[[-1,1],[0,0],[1,1]],[[1,2],[1,4],[1,6]]];
 for(const points of cases)close(covariance(points),shortcut(points));
 close(covariance(cases[0]),1.76);close(covariance(cases[1]),.15);
 close(covariance(cases[1].map(([x,y])=>[100*x,y])),15);
 close(covariance(cases[1].map(([x,y])=>[100*x,100*y])),1500);
 close(covariance(cases[2]),0);close(covariance(cases[3]),0);
 assert.ok(covariance(cases[0].map(([x,y])=>[x,-y]))<0);
 const tiny=[[0,0],[1e-9,1e-9],[2e-9,2e-9]];
 assert.ok(covariance(tiny)>0&&covariance(tiny)<1e-15); // Perfect linear relation, tiny covariance.
 const html=fs.readFileSync(path.resolve(__dirname,'../'+lesson),'utf8');
 for(const formula of [String.raw`\frac{1}{N}\sum_{i=1}^{N}(x_i-\bar{x})(y_i-\bar{y})`,String.raw`\frac{\sum_{i=1}^{N}x_i y_i}{N}-\bar{x}\,\bar{y}`,String.raw`S_{100X,Y}=100\,S_{X,Y}`,String.raw`0{,}15\cdot100=15`])assert.ok(html.includes(formula),formula);

 const pearsonSource='2. Estadística Bidimensional/4. Coeficiente de correlación de Pearson.txt';
 assert.equal(createHash('sha256').update(fs.readFileSync(path.join(originals,pearsonSource))).digest('hex'),'32a067a690bdf962ecc4c334f7c6b056b0b2eff0310115ac3c7797ffa34dba3c');
 const pearson=points=>{
   const sx=Math.sqrt(covariance(points.map(p=>[p[0],p[0]])));
   const sy=Math.sqrt(covariance(points.map(p=>[p[1],p[1]])));
   return sx>0&&sy>0?covariance(points)/(sx*sy):null;
 };
 close(pearson([[1,3],[2,5],[3,7]]),1);
 close(pearson([[1,7],[2,5],[3,3]]),-1);
 close(pearson(cases[2]),0); // Nonlinear relation with positive variances.
 assert.equal(pearson(cases[3]),null);
 assert.equal(pearson([[1,2],[3,2]]),null);
 assert.equal(pearson([[1,2]]),null);
 const baseR=pearson(cases[0]);
 close(baseR,1.76/Math.sqrt(2.96*2.56));
 close(pearson(cases[0].map(([x,y])=>[100*x,y])),baseR);
 close(pearson(cases[0].map(([x,y])=>[x+10,y-7])),baseR);
 close(pearson(cases[0].map(([x,y])=>[-x,y])),-baseR);
 close(pearson(tiny),1);
 for(const points of cases){const r=pearson(points);if(r!==null)assert.ok(Math.abs(r)<=1+1e-12);}
 for(const formula of [String.raw`r=\frac{S_{xy}}{S_x\cdot S_y}`,String.raw`-1\leq r\leq1`])assert.ok(html.includes(formula));
 const {flashcards,questions}=await import('../content/activities/catalog.js');
 assert.equal(flashcards.length,405);assert.equal(questions.length,347);
 const editorial=JSON.parse(fs.readFileSync(path.resolve(__dirname,'../config/editorial.json'),'utf8'));
 assert.equal(editorial.pages.bivariate,'partial');
 console.log('Source and catalog checks passed. Launching browser.');
 const browser=await chromium.launch({headless:true,executablePath:process.env.CHROME_PATH});
 try{
 console.log('Browser ready.');
 const page=await browser.newPage({viewport:{width:1280,height:960}}),errors=[],external=[];
 page.setDefaultTimeout(10000);
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
 console.log('Loading '+prefix+lesson);
 await page.goto(prefix+lesson);console.log('Page loaded. Waiting for formulas.');await math();console.log('Formulas ready.');



 await page.getByRole('link',{name:'Pearson',exact:true}).click();await math();
 assert.ok(page.url().endsWith('#pearson'));
 assert.equal(await page.locator('[data-pearson-formula]').count(),2);
 for(const formula of await page.locator('[data-pearson-formula]').all())assert.equal(await formula.locator('mjx-container').count(),1);
 assert.match(await page.locator('#pearson').innerText(),/ambas desviaciones típicas deben ser positivas/);
 const pearsonScale=page.locator('[data-pearson-scale] > svg');
 assert.equal(await pearsonScale.getAttribute('role'),'img');
 assert.ok((await pearsonScale.locator('title').textContent()).length>10);
 assert.ok((await pearsonScale.locator('desc').textContent()).includes('no lineales'));
 const marks=await pearsonScale.locator('[data-pearson-mark]').evaluateAll(nodes=>nodes.map(el=>({value:Number(el.dataset.pearsonMark),x:Number(el.getAttribute('x'))})));
 assert.deepEqual(marks,[{value:-1,x:30},{value:0,x:180},{value:1,x:330}]);
 assert.equal(await page.locator('[data-pearson-endpoints] dt').count(),3);
 assert.deepEqual(await page.locator('[data-pearson-example]').evaluateAll(nodes=>nodes.map(el=>Number(el.dataset.pearsonExample))),[-.95,.12,.85]);
 assert.match(await page.locator('[data-pearson-examples]').innerText(),/No equivale a «sin relación»/);
 assert.match(await page.locator('#correlacion-causalidad').innerText(),/ejemplo hipotético/);
 assert.doesNotMatch(await page.locator('#correlacion-causalidad').innerText(),/0[,.]9/);
 assert.equal(await page.locator('[data-pearson-causal-context] li').count(),2);
 if(!sub&&process.env.SCREENSHOT_DIR){
   await page.locator('#pearson').screenshot({path:process.env.SCREENSHOT_DIR+'/bidimensional-pearson.png'});
   await page.locator('#interpretacion-pearson').screenshot({path:process.env.SCREENSHOT_DIR+'/bidimensional-pearson-escala.png'});
   await page.locator('#correlacion-causalidad').screenshot({path:process.env.SCREENSHOT_DIR+'/bidimensional-pearson-causalidad.png'});
 }
 await page.getByRole('link',{name:'Covarianza',exact:true}).click();await math();
 assert.ok(page.url().endsWith('#covarianza'));
 assert.equal(await page.locator('[data-cov-formula]').count(),4);
 for(const formula of await page.locator('[data-cov-formula]').all())assert.equal(await formula.locator('mjx-container').count(),1);
 assert.match((await page.locator('[data-cov-formula="units-example"]').innerText()).replace(/\s/g,''),/0,15.*100=15/);
 const signDiagram=page.locator('[data-covariance-signs] > svg');
 assert.equal(await signDiagram.getAttribute('role'),'img');
 assert.ok((await signDiagram.textContent()).includes('Media de Y'));
 assert.ok((await signDiagram.locator('title').textContent()).length>15);
 assert.ok((await signDiagram.locator('desc').textContent()).length>50);
 const signs=await signDiagram.locator('[data-cov-sign]').evaluateAll(nodes=>nodes.map(n=>({key:n.dataset.covSign,x:Number(n.getAttribute('x')),y:Number(n.getAttribute('y')),sign:n.textContent})));
 assert.equal(signs.length,4);
 for(const point of signs){
   const product=(point.x-120)*(120-point.y);
   assert.equal(point.sign,product>0?'+':'−');
   assert.equal(point.key,(point.x>120?'+':'-')+(point.y<120?'+':'-'));
 }
 assert.equal(await page.locator('[data-cov-sign-list] li').count(),4);
 assert.equal(await page.locator('[data-cov-interpretation] dt').count(),3);
 assert.match(await page.locator('[data-cov-units-result]').innerText(),/0,15 a 15/);
 assert.match(await page.locator('#interpretacion-covarianza').innerText(),/Pearson no está definido/);
 assert.match(await page.locator('#interpretacion-covarianza').innerText(),/un valor pequeño por sí solo no permite/);
 if(!sub&&process.env.SCREENSHOT_DIR){
   await page.locator('#covarianza').screenshot({path:process.env.SCREENSHOT_DIR+'/bidimensional-covarianza.png'});
   await page.locator('#signos-covarianza').screenshot({path:process.env.SCREENSHOT_DIR+'/bidimensional-signos-covarianza.png'});
   await page.locator('#unidades-covarianza').screenshot({path:process.env.SCREENSHOT_DIR+'/bidimensional-unidades-covarianza.png'});
 }
 console.log('Checking diagrams.');
 const graphs=page.locator('[data-scatter] > svg, [data-scatter-centre] > svg');
 assert.equal(await graphs.count(),5);
 for(let i=0;i<5;i++){
   console.log('Diagram '+i);
   const graph=graphs.nth(i);
   assert.equal(await graph.getAttribute('role'),'img');
   assert.ok((await graph.locator('title').textContent()).length>10);
   assert.ok((await graph.locator('desc').textContent()).length>50);
   assert.deepEqual(await graph.locator('[data-scatter-point]').evaluateAll(nodes=>nodes.map(n=>[Number(n.getAttribute('cx')),Number(n.getAttribute('cy'))])),sourcePoints[i]);
   for(const id of (await graph.getAttribute('aria-labelledby')).split(' '))assert.equal(await page.locator('[id="'+id+'"]').count(),1);
 }
 const guide=(await page.locator('[data-functional-guide]').getAttribute('points')).split(' ').map(p=>p.split(',').map(Number));
 assert.deepEqual(guide,sourcePoints[3]);
 const centre=await page.locator('[data-scatter-mean]').evaluate(n=>[Number(n.getAttribute('cx')),Number(n.getAttribute('cy'))]);
 assert.deepEqual(centre,[0,1].map(j=>sourcePoints[4].reduce((a,p)=>a+p[j],0)/6));
 assert.deepEqual(centre,[100,90]);
 // SVG ordinate grows downward; recover signs in a Cartesian system.
 const products=sourcePoints.map(points=>{
   const mx=points.reduce((a,p)=>a+p[0],0)/points.length,my=points.reduce((a,p)=>a-p[1],0)/points.length;
   return points.reduce((a,p)=>a+(p[0]-mx)*(-p[1]-my),0);
 });
 assert.ok(products[0]>0);assert.ok(products[1]<0);assert.notEqual(products[2],0);assert.ok(products[4]>0);
 assert.match(await page.locator('[data-scatter="2"]').innerText(),/no demuestra que la correlación sea exactamente cero/);
 assert.match(await page.locator('#centro-gravedad').innerText(),/No basta con contar los puntos/);
 assert.match(await page.locator('#nube').innerText(),/Correlación no implica causalidad/);
 assert.ok(await page.locator('[data-centre-formula] mjx-container').count());
 console.log('Geometry passed. Capturing diagrams.');
 if(!sub&&process.env.SCREENSHOT_DIR){
   await page.locator('#nube').screenshot({path:process.env.SCREENSHOT_DIR+'/bidimensional-nube.png'});
   await page.locator('#centro-gravedad').screenshot({path:process.env.SCREENSHOT_DIR+'/bidimensional-centro.png'});
 }
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

 assert.equal(await page.locator('#familias .table-scroll').evaluate(el=>el.scrollWidth>el.clientWidth),false);
 assert.equal((await page.locator('[data-simple-series]').innerText()).replace(/\s/g,''),'(5,6),(7,5),(6,8),(4,4),(9,8).');
 assert.match(await page.locator('#organizacion').innerText(),/No es un límite matemático obligatorio/);
 const families=await page.locator('[data-families-table]').evaluate(el=>({
 rows:[...el.querySelectorAll('[data-family-row]')].map(r=>[...r.querySelectorAll('[data-frequency]')].map(c=>Number(c.textContent))),
 rowTotals:[...el.querySelectorAll('[data-row-total]')].map(c=>Number(c.textContent)),
 colTotals:[...el.querySelectorAll('[data-column-total]')].map(c=>Number(c.textContent)),
 total:el.querySelector('[data-grand-total]').textContent,
 headers:[...el.querySelectorAll('td')].every(c=>c.headers.split(' ').every(id=>document.getElementById(id)?.tagName==='TH'))
 }));
 assert.deepEqual(families.rows,[[5,7,3],[2,12,6],[1,4,10]]);
 assert.deepEqual(families.rowTotals,families.rows.map(r=>r.reduce((a,b)=>a+b,0)));
 assert.deepEqual(families.colTotals,families.rows[0].map((_,j)=>families.rows.reduce((a,r)=>a+r[j],0)));
 assert.equal(families.rowTotals.reduce((a,b)=>a+b,0),50);assert.equal(families.colTotals.reduce((a,b)=>a+b,0),50);
 assert.equal(families.total,'N = 50');assert.equal(families.headers,true);
 // Reconstruct the 50 observations independently to check the two weighted means.
 const observations=[];
 families.rows.forEach((row,i)=>row.forEach((n,j)=>{for(let k=0;k<n;k++)observations.push([i+1,j]);}));
 assert.equal(observations.length,50);assert.equal(observations.reduce((sum,p)=>sum+p[0],0),100);assert.equal(observations.reduce((sum,p)=>sum+p[1],0),61);
 for(const [axis,values,freq,totalMean] of [['x',[1,2,3],families.rowTotals,2],['y',[0,1,2],families.colTotals,1.22]]){
 const marginal=await page.locator('[data-marginal="'+axis+'"]').evaluate(el=>({
 values:[...el.querySelectorAll('tbody th')].map(c=>Number(c.textContent)),
 freq:[...el.querySelectorAll('tbody td')].map(c=>Number(c.textContent)),total:Number(el.querySelector('tfoot td').textContent)
 }));
 assert.deepEqual(marginal.values,values);assert.deepEqual(marginal.freq,freq);assert.equal(marginal.total,50);
 assert.equal(marginal.values.reduce((sum,v,i)=>sum+v*marginal.freq[i],0)/marginal.total,totalMean);
 const formula=(await page.locator('[data-mean-formula="'+axis+'"]').innerText()).replace(/\s/g,'');
 assert.ok(formula.endsWith(axis==='x'?'=2.':'=1,22.'),formula);
 }
 assert.match(await page.locator('[data-mean-result="x"]').innerText(),/2 hijos por familia/);
 assert.match(await page.locator('[data-mean-result="y"]').innerText(),/1,22 días/);
 await page.getByText('Comprobar las sumas del ejemplo de familias',{exact:true}).press('Enter');await math();
 assert.ok(await page.locator('#marginales details').getAttribute('open')!==null);
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
 if(!sub&&process.env.SCREENSHOT_DIR){await page.locator('#familias').screenshot({path:process.env.SCREENSHOT_DIR+'/bidimensional-familias.png'});await page.locator('#marginales').screenshot({path:process.env.SCREENSHOT_DIR+'/bidimensional-marginales.png'});}
 await page.locator('[data-reading-controls]>summary').click();await page.locator('[data-text-size]').selectOption('200');await page.locator('[data-contrast-control]').check();await page.locator('[data-highlight-control]').check();await page.setViewportSize({width:320,height:844});await math();

 assert.equal(await page.locator('.bivariate-scatter-grid').evaluate(el=>getComputedStyle(el).gridTemplateColumns.split(' ').length),1);
 for(let i=0;i<5;i++)assert.ok(await graphs.nth(i).evaluate(el=>el.getBoundingClientRect().width<=document.documentElement.clientWidth));
 if(!sub&&process.env.SCREENSHOT_DIR)await page.locator('[data-scatter="2"]').screenshot({path:process.env.SCREENSHOT_DIR+'/bidimensional-nube-movil.png'});

 assert.ok(await signDiagram.evaluate(el=>el.getBoundingClientRect().width<=innerWidth));
 if(!sub&&process.env.SCREENSHOT_DIR)await page.locator('#unidades-covarianza').screenshot({path:process.env.SCREENSHOT_DIR+'/bidimensional-covarianza-movil.png'});

 assert.ok(await pearsonScale.evaluate(el=>el.getBoundingClientRect().width<=innerWidth));
 if(!sub&&process.env.SCREENSHOT_DIR)await page.locator('#pearson').screenshot({path:process.env.SCREENSHOT_DIR+'/bidimensional-pearson-movil.png'});
 const scroll=page.locator('#tabla .table-scroll');await scroll.focus();await page.keyboard.press('ArrowRight');
 await page.waitForFunction(()=>document.querySelector('#tabla .table-scroll').scrollLeft>0);
 const familyScroll=page.locator('#familias .table-scroll');await familyScroll.focus();await page.keyboard.press('ArrowRight');
 await page.waitForFunction(()=>document.querySelector('#familias .table-scroll').scrollLeft>0);
 if(!sub&&process.env.SCREENSHOT_DIR)await page.locator('#marginal-deporte').screenshot({path:process.env.SCREENSHOT_DIR+'/bidimensional-marginal-movil.png'});
 await page.reload();await math();assert.equal(await page.locator('[data-text-size]').inputValue(),'200');assert.ok(await page.locator('[data-contrast-control]').isChecked());
 await page.getByRole('link',{name:'Volver al libro',exact:true}).click();
 await page.locator('[data-course-index] article').first().waitFor();assert.equal(await page.locator('[data-course-index] article').count(),9);
 assert.match(await page.locator('[data-course-index] article').nth(5).innerText(),/0 de 5.*Contenido parcial en 5/);
 await page.getByRole('link',{name:'Estadística bidimensional',exact:true}).click();await math();
 await page.getByRole('link',{name:'Conexiones con programación lineal',exact:true}).click();
 await page.waitForLoadState('load');
 const connections=page.locator('#itinerario-original');
 await connections.locator('summary').focus();
 await page.evaluate(()=>new Promise(resolve=>requestAnimationFrame(()=>requestAnimationFrame(resolve))));
 if(!await connections.evaluate(el=>el.open))await page.keyboard.press('Enter');
 await page.waitForFunction(()=>document.querySelector('#itinerario-original')?.open);
 await page.locator('#itinerario-original').getByRole('link',{name:'Estadística bidimensional',exact:true}).click();await math();
 await page.locator('[data-reading-controls]>summary').click();await page.locator('[data-reset-reading]').click();await page.setViewportSize({width:1280,height:960});
 }
 assert.deepEqual(errors,[]);assert.deepEqual(external,[]);
 console.log('PASS: thirteen original hashes, Pearson bounds/extremes/undefined/scaling cases, original three examples, scale marks, causal limitations and LaTeX; covariance identities and scaling 0.15->15 verified, zero/constant/nonlinear cases, four rendered formulas and quadrant signs; five scatter diagrams and original point coordinates, functional guide through all seven points, exact centre (100,90), trend signs, accessible descriptions; five original pairs, nine family frequencies, 50 observations, two marginal tables and exact means 2/1.22; full presentation regression, LaTeX, desktop/mobile, keyboard, preferences, root/subfolder and unchanged banks.');
 }catch(error){console.error(error);throw error;}finally{for(const context of browser.contexts())for(const page of context.pages())await page.unrouteAll({behavior:'wait'});await browser.close();}
})().catch(e=>{console.error(e);process.exitCode=1;});



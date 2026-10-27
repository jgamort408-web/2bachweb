const assert=require('node:assert/strict'),{chromium}=require('playwright'),fs=require('node:fs'),path=require('node:path'),{createHash}=require('node:crypto');
const base=process.env.TEST_URL||'http://127.0.0.1:4173/',topic='libro/temas/06-programacion-lineal/',lesson=topic+'05-problemas-de-programacion-lineal.html';
(async()=>{
 const originals=path.resolve(__dirname,'../../Página web existente');
 const hashes={
  'Inicio.txt':'985c96051b3ff0eaa86c4732e123850542b1ed277d4fe63d9d36aacc8cad70cb',
  '1. Programación Lineal/0. Presentación.txt':'985c96051b3ff0eaa86c4732e123850542b1ed277d4fe63d9d36aacc8cad70cb',
  '1. Programación Lineal/1. Inecuaciones.txt':'eb272271f4b5ca059ec703d287425b5c419ef59ecb0cabd2e2f900b7ccda50cc',
  '1. Programación Lineal/2. Sistemas de inecuaciones.txt':'5d963b48bb98ab92aef7222307925ffe9088d55139fd63ce11b2fcb17899a588',
  '1. Programación Lineal/3. Programación Lineal.txt':'82d9466ebbe563c0d8a3724c1eeb031f312c7a7082b360bda11d55bf7502f03b',
  '1. Programación Lineal/4. El método gráfico.txt':'455c45b45dea0bd4641009e6af0d179d92eb41d741a1ce5708052ba7d248709c',
 '1. Programación Lineal/5. Ejercicios Resueltos.txt':'cf12fac3410b388d7a9588987dead55b0237a5d8b41865a9975c2a98a6efb24d'
 };
 for(const [name,hash] of Object.entries(hashes))assert.equal(createHash('sha256').update(fs.readFileSync(path.join(originals,name))).digest('hex'),hash);

 const browser=await chromium.launch({headless:true,executablePath:process.env.CHROME_PATH});
 try{
 const page=await browser.newPage({viewport:{width:1280,height:960}}),errors=[],external=[];
 page.on('pageerror',e=>errors.push(e.message));
 page.on('request',r=>{if(/^https?:/.test(r.url())&&!r.url().startsWith(base))external.push(r.url());});
 const math=async()=>{
 await page.waitForFunction(()=>document.querySelector('.math-status')?.hidden&&!/\\[\[(]/.test(document.querySelector('main').innerText));
 assert.equal(await page.locator('[data-mml-node="merror"]').count(),0);
 assert.equal(await page.evaluate(()=>document.documentElement.scrollWidth>innerWidth),false);
 };
 const results=['240 €','12 €','4.000 €','41.250 €','3.200 €','1.600 €'];
 const steps=[5,5,3,4,3,3];
 for(const sub of [false,true]){
 const prefix=sub?new URL('prueba-subcarpeta/',base).href:base;
 if(sub)await page.route(prefix+'**',async route=>{const response=await route.fetch({url:route.request().url().replace(prefix,base)});await route.fulfill({response});});
 await page.goto(prefix+lesson);await page.locator('[data-exercise-controls]:visible').waitFor();await math();
 assert.equal(await page.locator('[data-exercise]').count(),6);
 assert.equal(await page.locator('[data-exercise]:visible').count(),1);
 assert.equal(await page.locator('[data-geogebra-container] iframe').count(),0);
 for(let i=1;i<=6;i++){
  await page.locator('[data-exercise-select]').selectOption(String(i));
  const article=page.locator('#ejercicio-'+i);
  await article.locator('summary').press('Enter');await math();
  assert.equal(await article.locator('[data-content-role="worked-step"]').count(),steps[i-1]);
  assert.ok((await article.locator('[data-content-role="key-idea"]').innerText()).includes(results[i-1]));
  assert.ok(await article.locator('mjx-container').count()>5);
 }
 assert.match(await page.locator('#ejercicio-6').innerText(),/cuadrilátero/);
 assert.doesNotMatch(await page.locator('#ejercicio-6').innerText(),/pentágono|5 lados|33\.33/);
 await page.locator('[data-exercise-select]').selectOption('4');await math();
 assert.doesNotMatch(await page.locator('#ejercicio-4').innerText(),/266\.6/);
 if(!sub&&process.env.SCREENSHOT_DIR)await page.locator('#ejercicio-4').screenshot({path:process.env.SCREENSHOT_DIR+'/problemas-pl-drones.png'});
 // Rapid changes must not duplicate rendered mathematics.
 const count=await page.locator('mjx-container').count();
 for(const i of ['1','6','2','5','3','4','all'])await page.locator('[data-exercise-select]').selectOption(i);
 await math();assert.equal(await page.locator('[data-exercise]:visible').count(),6);assert.equal(await page.locator('mjx-container').count(),count);
 await page.goto(prefix+lesson+'#ejercicio-5');await math();assert.equal(await page.locator('[data-exercise-select]').inputValue(),'5');
 if(await page.locator('#ejercicio-5 details').getAttribute('open')===null) await page.locator('#ejercicio-5 summary').press('Enter');await math();
 await page.locator('[data-reading-controls]>summary').click();await page.locator('[data-text-size]').selectOption('200');await page.locator('[data-contrast-control]').check();await page.locator('[data-highlight-control]').check();await page.setViewportSize({width:320,height:844});await math();
 const scroll=page.locator('#ejercicio-5 .table-scroll');await scroll.focus();await page.keyboard.press('ArrowRight');
 await page.waitForFunction(()=>document.querySelector('#ejercicio-5 .table-scroll').scrollLeft>0);
 if(!sub&&process.env.SCREENSHOT_DIR)await page.locator('#ejercicio-5 [data-content-role="key-idea"]').screenshot({path:process.env.SCREENSHOT_DIR+'/problemas-pl-movil.png'});
 await page.reload();await math();assert.equal(await page.locator('[data-text-size]').inputValue(),'200');
 await page.getByRole('link',{name:'Anterior: método gráfico',exact:true}).click();await math();
 await page.getByRole('link',{name:'Siguiente: problemas de programación lineal (contenido parcial)',exact:true}).click();await math();
 await page.getByRole('link',{name:'Volver al tema 6',exact:true}).click();
 await page.locator('[data-topic-index] li').first().waitFor();
 assert.equal((await page.locator('[data-topic-index] li').allTextContents()).filter(t=>t.includes('Contenido parcial')).length,5);
 await page.goto(prefix+'libro/index.html');await page.locator('[data-course-index] article').first().waitFor();
 assert.match(await page.locator('[data-course-index] article').nth(5).innerText(),/0 de 5.*Contenido parcial en 5/);
 await page.locator('[data-reading-controls]>summary').click();await page.locator('[data-reset-reading]').click();await page.setViewportSize({width:1280,height:960});
 }
 assert.deepEqual(external,[]);assert.deepEqual(errors,[]);
 // Controlled provider failure and retry; it must not touch lesson math.
 await page.goto(base+lesson);await math();
 let attempts=0;
 await page.route('https://www.geogebra.org/apps/deployggb.js',async route=>{
  attempts++;
  await route.fulfill({contentType:'application/javascript',body:attempts===1?'/* provider unavailable */':"window.GGBApplet=class{constructor(p){this.p=p;} inject(id){document.getElementById(id).textContent='Calculadora de prueba';this.p.appletOnLoad({});}};"});
 });
 await page.locator('[data-geogebra-start]').click();
 await page.getByRole('button',{name:'Reintentar GeoGebra',exact:true}).waitFor();
 assert.equal(await page.locator('[data-geogebra-container] iframe').count(),0);
 await page.getByRole('button',{name:'Reintentar GeoGebra',exact:true}).click();
 await page.waitForFunction(()=>document.querySelector('[data-geogebra-status]').textContent.startsWith('GeoGebra listo'));
 assert.equal(attempts,2);assert.equal(await page.locator('[data-geogebra-container] iframe').count(),1);await math();
 await page.locator('[data-geogebra-stop]').click();assert.equal(await page.locator('[data-geogebra-container] iframe').count(),0);
 // Stalled provider: bounded wait, then a fresh browsing context on retry.
 await page.unroute('https://www.geogebra.org/apps/deployggb.js');
 await page.route('https://www.geogebra.org/apps/deployggb.js',route=>route.fulfill({contentType:'application/javascript',body:'window.GGBApplet=class{inject(){}};'}));
 await page.clock.install();await page.locator('[data-geogebra-start]').click();
 await page.clock.fastForward(36000);
 assert.match(await page.locator('[data-geogebra-status]').innerText(),/No se ha podido cargar/);
 assert.equal(await page.locator('[data-geogebra-container] iframe').count(),0);
 assert.deepEqual(errors,[]);
 console.log('PASS: seven original hashes, six problems / 23 steps, LaTeX, rapid selection, deep links, mobile 320/200%, keyboard, root/subfolder and controlled GeoGebra failure/retry/timeout.');
 }finally{for(const context of browser.contexts())for(const page of context.pages())await page.unrouteAll({behavior:'ignoreErrors'});await browser.close();}
})().catch(e=>{console.error(e);process.exitCode=1;});

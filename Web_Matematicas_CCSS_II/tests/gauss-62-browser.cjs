const assert=require('node:assert/strict'),{chromium}=require('playwright');
const base=process.env.TEST_URL||'http://127.0.0.1:4173/',topic='libro/temas/05-sistemas-de-ecuaciones/',lesson=topic+'08-resolucion-de-sistemas-metodo-de-gauss.html';
(async()=>{
 const browser=await chromium.launch({headless:true,executablePath:process.env.CHROME_PATH});
 try{
  const page=await browser.newPage({viewport:{width:1280,height:960}}),errors=[];
  page.on('pageerror',e=>errors.push(e.message));page.on('response',r=>{if(r.status()>=400&&!r.url().endsWith('favicon.ico'))errors.push(r.status()+' '+r.url());});
  const math=async()=>{await page.waitForFunction(()=>{const s=document.querySelector('.math-status');return s?.hidden===true&&!(/\\[\[(]/.test(document.querySelector('main')?.innerText||''));});assert.equal(await page.locator('[data-mml-node="merror"]').count(),0);assert.ok(await page.evaluate(()=>document.documentElement.scrollWidth<=innerWidth));};
  const output=page.locator('[data-gauss-output]'),root=page.locator('[data-gauss-explorer]');
  const field=(i,j)=>root.locator('[data-gauss-entry][data-row="'+i+'"][data-col="'+j+'"]');
  const edit=async(i,j,value)=>{await field(i,j).fill(value);await field(i,j).press('Tab');await math();};
  const preset=async name=>{await page.locator('[data-gauss-preset]').selectOption(name);await math();};
  const snapshot=async()=>JSON.parse(await output.getAttribute('data-snapshot'));
  const finish=async()=>{if(await page.locator('[data-gauss-last]').isEnabled())await page.locator('[data-gauss-last]').click();await math();};
  await page.goto(base+lesson+'#explorador');await output.locator('mjx-container').first().waitFor();await math();
  assert.equal(await output.getAttribute('data-step'),'0');
  await page.locator('[data-gauss-next]').press('Enter');await math();assert.equal(await output.getAttribute('data-step'),'1');
  await page.locator('[data-gauss-previous]').click();await math();assert.equal(await output.getAttribute('data-step'),'0');
  for(const [name,kind]of [['unique','SCD'],['swap','SCD'],['fractional','SCD'],['infinite','SCI'],['impossible','SI'],['wide','SCI'],['skipped','SCI'],['zero','SCI']]){
   await preset(name);await finish();assert.equal(await output.getAttribute('data-kind'),kind);
   if(kind==='SI'){assert.match(await output.innerText(),/No hay solución/);assert.doesNotMatch(await output.innerText(),/Conjunto solución/);}
   else assert.match(await output.innerText(),/Conjunto solución/);
   await output.locator('details>summary').click();await math();
  }
  await preset('infinite');await finish();await edit(1,2,'7');assert.equal(await output.getAttribute('data-step'),'0');await finish();
  assert.equal(await output.getAttribute('data-kind'),'SI');assert.doesNotMatch(await output.innerText(),/Conjunto solución/);
  await edit(1,1,'1');await finish();assert.equal(await output.getAttribute('data-kind'),'SCD');assert.doesNotMatch(await output.innerText(),/No hay solución/);
  const valid=await snapshot();
  for(const bad of ['','0.5','10','-10']){await edit(0,2,bad);assert.equal(await field(0,2).getAttribute('aria-invalid'),'true');assert.deepEqual(await snapshot(),valid);}
  await edit(0,2,'3');assert.equal(await field(0,2).getAttribute('aria-invalid'),null);
  await preset('swap');await page.locator('[data-gauss-cols]').selectOption('3');await math();
  assert.deepEqual(await snapshot(),[[0,2,0,4],[1,1,0,3]]);
  await page.locator('[data-gauss-rows]').selectOption('3');await math();assert.deepEqual((await snapshot())[2],[0,0,0,0]);
  await page.locator('[data-gauss-cols]').selectOption('2');await math();assert.deepEqual(await snapshot(),[[0,2,4],[1,1,3],[0,0,0]]);
  for(const rows of [2,3])for(const cols of [2,3]){
   await page.locator('[data-gauss-rows]').selectOption(String(rows));await page.locator('[data-gauss-cols]').selectOption(String(cols));await page.locator('[data-gauss-generate]').press('Enter');await math();
   const expected=await page.evaluate(async({base,rows,cols})=>(await import(base+'content/models/gauss.js')).generatedGauss(Number(document.querySelector('[data-gauss-explorer]').dataset.seed),rows,cols),{base,rows,cols});
   assert.deepEqual(await snapshot(),expected);await finish();
  }
  await preset('impossible');await preset('unique');await preset('fractional');await finish();
  if(process.env.SCREENSHOT_DIR)await output.screenshot({path:process.env.SCREENSHOT_DIR+'/gauss-escritorio.png'});
  const quiz=page.locator('[data-quiz="t05-e08"]');await quiz.locator('input[value="correct"]').check();
  const saved=await snapshot();
  await page.locator('[data-reading-controls]>summary').click();await page.locator('[data-text-size]').selectOption('200');await page.locator('[data-contrast-control]').check();await page.locator('[data-highlight-control]').check();await page.setViewportSize({width:320,height:844});await math();
  assert.ok(await quiz.locator('input[value="correct"]').isChecked());assert.deepEqual(await snapshot(),saved);
  await output.locator('details>summary').click();await math();
  if(process.env.SCREENSHOT_DIR)await output.screenshot({path:process.env.SCREENSHOT_DIR+'/gauss-movil.png'});
  for(let i=0;i<6;i++){
   await quiz.getByText('Pregunta '+(i+1)+' de 6 · Sin límite de tiempo',{exact:true}).waitFor();
   if(i===0){await quiz.locator('input[value="wrong-1"]').check();await quiz.getByRole('button',{name:'Comprobar',exact:true}).click();await quiz.getByRole('button',{name:'Ver pista'}).click();await quiz.locator('.feedback').filter({hasText:'Pista:'}).waitFor();}
   await quiz.locator('input[value="correct"]').check();await quiz.getByRole('button',{name:'Comprobar',exact:true}).press('Enter');await quiz.getByRole('button',{name:/Siguiente pregunta|Ver resumen/}).waitFor();await math();await quiz.getByRole('button',{name:/Siguiente pregunta|Ver resumen/}).click();
  }
  await quiz.getByText('5 de 6 respuestas correctas',{exact:false}).waitFor();
  const deck=page.locator('[data-flashcards]');for(let i=1;i<=6;i++){await deck.getByText('Tarjeta '+i+' de 6',{exact:true}).waitFor();await deck.getByRole('button',{name:'Mostrar respuesta',exact:true}).click();await math();if(i<6)await deck.getByRole('button',{name:'Siguiente',exact:true}).click();}
  await page.locator('[data-reset-reading]').click();await page.reload();await output.locator('mjx-container').first().waitFor();await math();assert.equal(await output.getAttribute('data-kind'),'SCD');assert.deepEqual(await snapshot(),[[1,1,1,6],[2,-1,0,0],[0,1,-1,-1]]);assert.equal(await quiz.locator('input:checked').count(),0);
  await page.getByRole('link',{name:'Índice de sistemas de ecuaciones',exact:true}).click();await page.waitForFunction(()=>document.querySelectorAll('[data-topic-index] li').length===11);
  const text=await page.locator('[data-topic-index]').innerText();assert.equal((text.match(/Disponible/g)||[]).length,11);assert.equal((text.match(/En preparación/g)||[]).length,0);
  await page.getByRole('link',{name:'Test disponible de sistemas',exact:true}).click();await page.locator('[data-quiz] input').first().waitFor();await math();assert.match(await page.locator('[data-content-role="activity-progress"]').innerText(),/1 de 66/);assert.match(await page.locator('[data-scope-label]').innerText(),/Tema 5/);
  assert.equal(await page.locator('[data-study-topics] [aria-current="page"]').innerText(),'Tema 5');
  await page.goto(base+'tarjetas/index.html?tema=t05');await page.getByText('Tarjeta 1 de 66',{exact:true}).waitFor();await page.getByRole('button',{name:'Mostrar respuesta',exact:true}).click();await math();

  const prefix=new URL('prueba-subcarpeta/',base).href;
  await page.route(prefix+'**',async route=>{const response=await route.fetch({url:route.request().url().replace(prefix,base)});await route.fulfill({response});});
  await page.goto(prefix+lesson+'#explorador');await output.locator('mjx-container').first().waitFor();await preset('skipped');await finish();
  assert.equal(await output.getAttribute('data-kind'),'SCI');assert.match(await output.innerText(),/parámetros reales independientes/);
  assert.ok(await page.locator('#site-header a').count()>0);assert.ok(await page.locator('#site-footer').innerText());assert.deepEqual(errors,[]);
  console.log('Aprobado: ocho casos, navegación por pasos, familias y contradicciones, edición y recuperación, cuatro dimensiones, variantes, test 5/6, seis tarjetas, teclado, móvil 320/200 %, preferencias, recarga, t05 66/66, índice 11/11 y subcarpeta.');
 }finally{for(const context of browser.contexts())for(const page of context.pages())await page.unrouteAll({behavior:'ignoreErrors'});await browser.close();}
})().catch(e=>{console.error(e);process.exitCode=1;});

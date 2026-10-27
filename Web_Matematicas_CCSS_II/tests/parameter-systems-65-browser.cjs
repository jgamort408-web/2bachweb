const assert=require('node:assert/strict'),{chromium}=require('playwright');
const base=process.env.TEST_URL||'http://127.0.0.1:4173/',topic='libro/temas/05-sistemas-de-ecuaciones/',lesson=topic+'11-discusion-de-sistemas-con-parametros.html';
(async()=>{
 const browser=await chromium.launch({headless:true,executablePath:process.env.CHROME_PATH});
 try{
  const page=await browser.newPage({viewport:{width:1280,height:960}}),errors=[];
  page.on('pageerror',e=>errors.push(e.message));page.on('response',r=>{if(r.status()>=400&&!r.url().endsWith('favicon.ico'))errors.push(r.status()+' '+r.url());});
  const math=async()=>{await page.waitForFunction(()=>{const s=document.querySelector('.math-status');return s?.hidden===true&&!(/\\[\[(]/.test(document.querySelector('main')?.innerText||''));});assert.equal(await page.locator('[data-mml-node="merror"]').count(),0);assert.ok(await page.evaluate(()=>document.documentElement.scrollWidth<=innerWidth));};
  const output=page.locator('[data-parameter-system-output]'),root=page.locator('[data-parameter-system-explorer]');
  const family=async id=>{await page.locator('[data-parameter-system-family]').selectOption(id);await page.waitForFunction(id=>{const d=document.querySelector('[data-parameter-system-output]')?.dataset;return d?.family===id&&d.twice==='0';},id);await math();};
  const value=async twice=>{await page.locator('[data-parameter-system-value]').selectOption({value:String(twice)});await page.waitForFunction(t=>document.querySelector('[data-parameter-system-output]')?.dataset.twice===String(t),twice);await math();};
  const snapshot=async()=>JSON.parse(await output.getAttribute('data-snapshot'));
  await page.goto(base+lesson+'#explorador');await output.locator('mjx-container').first().waitFor();await math();
  for(const id of ['symmetric','cancellation','contradiction','homogeneous','rectangular','three']){
   await family(id);assert.equal(await output.getAttribute('data-twice'),'0');
   for(let twice=-6;twice<=6;twice++){
    try{await value(twice);}catch(e){console.error({id,twice,errors,actual:await output.getAttribute('data-twice'),html:(await output.innerText()).slice(-600)});throw e;}
    const expected=await page.evaluate(async({base,id,twice})=>(await import(base+'content/models/parameter-systems.js')).parameterSystemDetails(id,twice),{base,id,twice});
    assert.equal(await output.getAttribute('data-kind'),expected.gauss.kind);
    assert.equal(await output.getAttribute('data-free'),expected.gauss.kind==='SI'?'none':String(expected.gauss.free.length));
    assert.deepEqual(await snapshot(),JSON.parse(JSON.stringify(expected.rows)));
    assert.equal(await output.locator('[data-parameter-case][aria-current="true"]').count(),1);
    assert.equal(await output.locator('[aria-current="true"]').getAttribute('data-parameter-case'),String(expected.caseIndex));
    assert.equal(await output.getByRole('heading',{name:'4. Resuelve y comprueba',exact:true}).count(),expected.gauss.kind==='SI'?0:1);
    if(twice%2)assert.match(await output.innerText(),/multiplicamos todas las ecuaciones por 2/);
   }
   for(const button of await root.locator('[data-parameter-critical]').all()){const t=await button.getAttribute('data-parameter-critical');await button.press('Enter');await page.waitForFunction(t=>document.querySelector('[data-parameter-system-output]')?.dataset.twice===t,t);await math();assert.equal(await output.getAttribute('data-twice'),t);}
   await root.locator('[data-parameter-system-generate]').press('Enter');await math();
   const expected=await page.evaluate(async({base,id})=>(await import(base+'content/models/parameter-systems.js')).generatedParameterSample(Number(document.querySelector('[data-parameter-system-explorer]').dataset.seed),id),{base,id});
   await page.waitForFunction(rows=>document.querySelector('[data-parameter-system-output]')?.dataset.snapshot===JSON.stringify(rows),expected.rows);await math();assert.deepEqual(await snapshot(),JSON.parse(JSON.stringify(expected.rows)));assert.match(await output.innerText(),/Variante equivalente:/);
   await output.locator('details>summary').click();await math();
  }
  await family('rectangular');await value(2);
  if(process.env.SCREENSHOT_DIR)await root.screenshot({path:process.env.SCREENSHOT_DIR+'/parametros-escritorio.png'});
  const quiz=page.locator('[data-quiz="t05-e11"]');await quiz.locator('input[value="correct"]').check();
  const saved=await snapshot();
  await page.locator('[data-reading-controls]>summary').click();await page.locator('[data-text-size]').selectOption('200');await page.locator('[data-contrast-control]').check();await page.locator('[data-highlight-control]').check();await page.setViewportSize({width:320,height:844});await math();
  assert.ok(await quiz.locator('input[value="correct"]').isChecked());assert.deepEqual(await snapshot(),saved);
  await output.locator('details>summary').click();await math();
  if(process.env.SCREENSHOT_DIR){
   await root.screenshot({path:process.env.SCREENSHOT_DIR+'/parametros-movil.png'});
   await output.locator('.table-scroll').screenshot({path:process.env.SCREENSHOT_DIR+'/parametros-tabla-movil.png'});
  }
  const region=output.locator('.table-scroll');await region.focus();await region.press('End');await region.press('ArrowRight');assert.equal(await region.evaluate(el=>document.activeElement===el),true);
  assert.equal(await output.locator('th').first().evaluate(el=>getComputedStyle(el).whiteSpace),'nowrap');
  for(let i=0;i<6;i++){
   await quiz.getByText('Pregunta '+(i+1)+' de 6 · Sin límite de tiempo',{exact:true}).waitFor();
   if(i===0){await quiz.locator('input[value="wrong-1"]').check();await quiz.getByRole('button',{name:'Comprobar',exact:true}).click();await quiz.getByRole('button',{name:'Ver pista'}).click();await quiz.locator('.feedback').filter({hasText:'Pista:'}).waitFor();}
   await quiz.locator('input[value="correct"]').check();await quiz.getByRole('button',{name:'Comprobar',exact:true}).press('Enter');await quiz.getByRole('button',{name:/Siguiente pregunta|Ver resumen/}).waitFor();await math();await quiz.getByRole('button',{name:/Siguiente pregunta|Ver resumen/}).click();
  }
  await quiz.getByText('5 de 6 respuestas correctas',{exact:false}).waitFor();
  const deck=page.locator('[data-flashcards]');for(let i=1;i<=6;i++){await deck.getByText('Tarjeta '+i+' de 6',{exact:true}).waitFor();await deck.getByRole('button',{name:'Mostrar respuesta',exact:true}).click();await math();if(i<6)await deck.getByRole('button',{name:'Siguiente',exact:true}).click();}
  await page.locator('[data-reset-reading]').click();await page.reload();await output.locator('mjx-container').first().waitFor();await math();assert.equal(await output.getAttribute('data-kind'),'SCD');assert.deepEqual(await snapshot(),[[0,1,2],[1,0,2]]);assert.equal(await quiz.locator('input:checked').count(),0);
  await page.getByRole('link',{name:'Índice de sistemas de ecuaciones',exact:true}).click();await page.waitForFunction(()=>document.querySelectorAll('[data-topic-index] li').length===11);
  const text=await page.locator('[data-topic-index]').innerText();assert.equal((text.match(/Disponible/g)||[]).length,11);assert.equal((text.match(/En preparación/g)||[]).length,0);
  await page.getByRole('link',{name:'Test disponible de sistemas',exact:true}).click();await page.locator('[data-quiz] input').first().waitFor();await math();assert.match(await page.locator('[data-content-role="activity-progress"]').innerText(),/1 de 66/);assert.match(await page.locator('[data-scope-label]').innerText(),/Tema 5/);
  assert.equal(await page.locator('[data-study-topics] [aria-current="page"]').innerText(),'Tema 5');
  await page.goto(base+'tarjetas/index.html?tema=t05');await page.getByText('Tarjeta 1 de 66',{exact:true}).waitFor();await page.getByRole('button',{name:'Mostrar respuesta',exact:true}).click();await math();


  const prefix=new URL('prueba-subcarpeta/',base).href;
  await page.route(prefix+'**',async route=>{const response=await route.fetch({url:route.request().url().replace(prefix,base)});await route.fulfill({response});});
  await page.goto(prefix+lesson+'#explorador');await output.locator('mjx-container').first().waitFor();await family('symmetric');await value(-2);
  assert.equal(await output.getAttribute('data-kind'),'SI');await value(2);assert.equal(await output.getAttribute('data-kind'),'SCI');await value(0);assert.equal(await output.getAttribute('data-kind'),'SCD');
  assert.ok(await page.locator('#site-header a').count()>0);assert.ok(await page.locator('#site-footer').innerText());assert.deepEqual(errors,[]);
  console.log('Aprobado: seis familias y 78 muestras, valores críticos, variantes, transiciones SCD/SCI/SI, tablas completas, Gauss, test 5/6, seis tarjetas, teclado, móvil 320/200 %, preferencias, recarga, t05 66/66, índice 11/11 y subcarpeta.');
 }finally{for(const context of browser.contexts())for(const page of context.pages())await page.unrouteAll({behavior:'ignoreErrors'});await browser.close();}
})().catch(e=>{console.error(e);process.exitCode=1;});

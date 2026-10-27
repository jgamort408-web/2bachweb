const assert=require('node:assert/strict'),{chromium}=require('playwright');
const base=process.env.TEST_URL||'http://127.0.0.1:4173/',topic='libro/temas/05-sistemas-de-ecuaciones/',lesson=topic+'05-sistemas-equivalentes.html';
(async()=>{
 const browser=await chromium.launch({headless:true,executablePath:process.env.CHROME_PATH});
 try{
  const page=await browser.newPage({viewport:{width:1280,height:960}}),errors=[];
  page.on('pageerror',e=>errors.push(e.message));page.on('response',r=>{if(r.status()>=400&&!r.url().endsWith('favicon.ico'))errors.push(r.status()+' '+r.url());});
  const math=async()=>{await page.waitForFunction(()=>{const s=document.querySelector('.math-status');return s?.hidden===true&&!(/\\[\[(]/.test(document.querySelector('main')?.innerText||''));});assert.equal(await page.locator('[data-mml-node="merror"]').count(),0);assert.ok(await page.evaluate(()=>document.documentElement.scrollWidth<=innerWidth));};


  const output=page.locator('[data-equivalence-output]'),root=page.locator('[data-equivalence-explorer]');
  const snapshot=async()=>JSON.parse(await output.getAttribute('data-snapshot'));
  const preset=async name=>{await page.locator('[data-equivalence-preset]').selectOption(name);await math();};
  const select=async(key,value)=>page.locator('[data-equivalence-'+key+']').selectOption(value);
  const apply=async()=>{await page.locator('[data-equivalence-apply]').press('Enter');await math();};
  const reset=async()=>{await page.locator('[data-equivalence-reset]').click();await math();};
  await page.goto(base+lesson+'#explorador');await output.locator('mjx-container').first().waitFor();await math();
  const initial=await snapshot();await apply();assert.equal(await output.getAttribute('data-steps'),'1');assert.deepEqual((await snapshot())[1],[{numerator:0,denominator:1},{numerator:-3,denominator:1},{numerator:-6,denominator:1}]);
  await page.locator('[data-equivalence-undo]').click();await math();assert.deepEqual(await snapshot(),initial);assert.ok(await page.locator('[data-equivalence-undo]').isDisabled());
  for(const [name,last]of [['infinite',0],['none',1]]){
   await preset(name);await apply();assert.equal((await snapshot())[1][2].numerator,last);assert.match(await output.innerText(),last?/contradicción/:/no impone restricciones/);
  }
  await preset('fractional');await select('kind','scale');assert.ok(await page.locator('[data-equivalence-source]').isDisabled());await select('target','0');await select('scalar','1/2');await apply();
  assert.deepEqual((await snapshot())[0],[{numerator:1,denominator:1},{numerator:-1,denominator:2},{numerator:-5,denominator:2}]);
  const valid=await snapshot();await select('scalar','0');await apply();assert.deepEqual(await snapshot(),valid);assert.match(await page.locator('[data-equivalence-status]').innerText(),/Multiplicar por cero/);assert.equal(await output.getAttribute('data-steps'),'1');
  await select('kind','add');await select('source','0');await select('target','0');await apply();assert.match(await page.locator('[data-equivalence-status]').innerText(),/filas distintas/);assert.deepEqual(await snapshot(),valid);
  await select('kind','swap');assert.ok(await page.locator('[data-equivalence-scalar]').isDisabled());await select('target','1');await apply();assert.deepEqual(await snapshot(),[valid[1],valid[0]]);
  await reset();assert.equal(await output.getAttribute('data-steps'),'0');
  for(const name of ['unique','infinite','none','fractional','wide','three']){
   await preset(name);const before=await snapshot();await select('kind','add');await select('scalar','-2');await apply();await page.locator('[data-equivalence-undo]').click();await math();assert.deepEqual(await snapshot(),before);
  }
  await page.locator('[data-equivalence-generate]').click();await math();
  const generated=await page.evaluate(async base=>(await import(base+'content/models/equivalent-systems.js')).generatedEquivalentRows(Number(document.querySelector('[data-equivalence-explorer]').dataset.seed),3,3),base);
  assert.deepEqual(await snapshot(),generated);
  // El límite numérico rechaza el paso y conserva el historial válido.
  await preset('unique');await select('kind','scale');await select('target','0');await select('scalar','3');
  for(let i=0;i<12;i++)await apply();
  const limited=await snapshot(),steps=await output.getAttribute('data-steps');await apply();assert.deepEqual(await snapshot(),limited);assert.equal(await output.getAttribute('data-steps'),steps);assert.match(await page.locator('[data-equivalence-status]').innerText(),/Límite de cálculo exacto/);
  // Treinta pasos neutros: límite de sesión y recuperación al deshacer.
  await reset();await select('kind','add');await select('target','1');await select('source','0');await select('scalar','0');
  for(let i=0;i<30;i++)await apply();
  assert.ok(await page.locator('[data-equivalence-apply]').isDisabled());assert.equal(await output.getAttribute('data-steps'),'30');
  await page.locator('[data-equivalence-undo]').click();await math();assert.ok(await page.locator('[data-equivalence-apply]').isEnabled());assert.equal(await output.getAttribute('data-steps'),'29');
  await preset('fractional');await select('kind','scale');await select('target','0');await select('scalar','1/2');await apply();
  if(process.env.SCREENSHOT_DIR)await output.screenshot({path:process.env.SCREENSHOT_DIR+'/sistemas-equivalentes-escritorio.png'});
  const quiz=page.locator('[data-quiz="t05-e05"]');await quiz.locator('input[value="correct"]').check();
  const saved=await snapshot();
  await page.locator('[data-reading-controls]>summary').click();await page.locator('[data-text-size]').selectOption('200');await page.locator('[data-contrast-control]').check();await page.locator('[data-highlight-control]').check();await page.setViewportSize({width:320,height:844});await math();
  assert.ok(await quiz.locator('input[value="correct"]').isChecked());assert.deepEqual(await snapshot(),saved);
  if(process.env.SCREENSHOT_DIR)await output.screenshot({path:process.env.SCREENSHOT_DIR+'/sistemas-equivalentes-movil.png'});
  for(let i=0;i<6;i++){
   await quiz.getByText('Pregunta '+(i+1)+' de 6 · Sin límite de tiempo',{exact:true}).waitFor();
   if(i===0){await quiz.locator('input[value="wrong-1"]').check();await quiz.getByRole('button',{name:'Comprobar',exact:true}).click();await quiz.getByRole('button',{name:'Ver pista'}).click();await quiz.locator('.feedback').filter({hasText:'Pista:'}).waitFor();}
   await quiz.locator('input[value="correct"]').check();await quiz.getByRole('button',{name:'Comprobar',exact:true}).press('Enter');await quiz.getByRole('button',{name:/Siguiente pregunta|Ver resumen/}).waitFor();await math();await quiz.getByRole('button',{name:/Siguiente pregunta|Ver resumen/}).click();
  }
  await quiz.getByText('5 de 6 respuestas correctas',{exact:false}).waitFor();
  const deck=page.locator('[data-flashcards]');for(let i=1;i<=6;i++){await deck.getByText('Tarjeta '+i+' de 6',{exact:true}).waitFor();await deck.getByRole('button',{name:'Mostrar respuesta',exact:true}).click();await math();if(i<6)await deck.getByRole('button',{name:'Siguiente',exact:true}).click();}
  await page.locator('[data-reset-reading]').click();await page.reload();await output.locator('mjx-container').first().waitFor();await math();assert.equal(await output.getAttribute('data-steps'),'0');assert.deepEqual(await snapshot(),initial);assert.equal(await quiz.locator('input:checked').count(),0);
  await page.getByRole('link',{name:'Índice de sistemas de ecuaciones',exact:true}).click();await page.waitForFunction(()=>document.querySelectorAll('[data-topic-index] li').length===11);
  const text=await page.locator('[data-topic-index]').innerText();assert.equal((text.match(/Disponible/g)||[]).length,11);assert.equal((text.match(/En preparación/g)||[]).length,0);
  await page.getByRole('link',{name:'Test disponible de sistemas',exact:true}).click();await page.locator('[data-quiz] input').first().waitFor();await math();assert.match(await page.locator('[data-content-role="activity-progress"]').innerText(),/1 de 66/);assert.match(await page.locator('[data-scope-label]').innerText(),/Tema 5/);
  assert.equal(await page.locator('[data-study-topics] [aria-current="page"]').innerText(),'Tema 5');
  await page.goto(base+'tarjetas/index.html?tema=t05');await page.getByText('Tarjeta 1 de 66',{exact:true}).waitFor();await page.getByRole('button',{name:'Mostrar respuesta',exact:true}).click();await math();
  const prefix=new URL('prueba-subcarpeta/',base).href;
  await page.route(prefix+'**',async route=>{const response=await route.fetch({url:route.request().url().replace(prefix,base)});await route.fulfill({response});});
  await page.goto(prefix+lesson+'#explorador');await output.locator('mjx-container').first().waitFor();await preset('infinite');await apply();assert.equal(await output.getAttribute('data-steps'),'1');
  assert.ok(await page.locator('#site-header a').count()>0);assert.ok(await page.locator('#site-footer').innerText());assert.deepEqual(errors,[]);
  console.log('Aprobado: seis casos, operaciones exactas, rechazos, límites, historial, deshacer, reinicio, generación, test 5/6, seis tarjetas, teclado, móvil 320/200 %, preferencias, recarga, t05 66/66, índice 11/11 y subcarpeta.');
 }finally{for(const context of browser.contexts())for(const page of context.pages())await page.unrouteAll({behavior:'wait'});await browser.close();}
})().catch(e=>{console.error(e);process.exitCode=1;});

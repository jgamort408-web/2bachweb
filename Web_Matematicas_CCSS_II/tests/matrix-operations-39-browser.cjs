const assert=require('node:assert/strict'),{chromium}=require('playwright');
const base=process.env.TEST_URL||'http://127.0.0.1:4173/',topic='libro/temas/04-matrices-y-determinantes/',lesson=topic+'02-operaciones-con-matrices.html';
(async()=>{
 const browser=await chromium.launch({headless:true,executablePath:process.env.CHROME_PATH});
 try{
  const page=await browser.newPage({viewport:{width:1280,height:960}}),errors=[];
  page.on('pageerror',e=>errors.push(e.message));page.on('response',r=>{if(r.status()>=400&&!r.url().endsWith('favicon.ico'))errors.push(r.status()+' '+r.url());});
  const math=async()=>{await page.waitForFunction(()=>document.querySelector('.math-status')?.hidden===true);assert.equal(await page.locator('[data-mml-node="merror"]').count(),0);assert.doesNotMatch(await page.locator('main').innerText(),/\\[\[(]/);assert.ok(await page.evaluate(()=>document.documentElement.scrollWidth<=innerWidth));};
  const output=page.locator('[data-operations-output]'),editor=page.locator('[data-matrix-operations]');
  const setOp=async mode=>{await page.locator('[data-operation]').selectOption(mode);await math();};
  const edit=async(selector,value)=>{await page.locator(selector).fill(value);await page.locator(selector).press('Tab');await math();};
  const dim=async(id,kind,value)=>{await page.locator('[data-matrix="'+id+'"][data-dimension="'+kind+'"]').selectOption(String(value));await math();};
  const showSteps=async()=>{await page.locator('[data-operations-steps] summary').click();await math();};
  const stepTexts=async()=>page.locator('[data-operations-steps] li').evaluateAll(nodes=>nodes.map(n=>n.textContent.replace(/\s/g,'').replaceAll('−','-')));
  await page.goto(base+lesson+'#explorador');await output.locator('mjx-container').first().waitFor();await math();assert.ok(await page.locator('main mjx-container').count()>25);
  assert.equal(await output.getAttribute('data-compatible'),'true');await showSteps();assert.equal(await page.locator('[data-operations-steps] li').count(),4);assert.ok((await stepTexts())[0].includes('=6'));
  await setOp('subtract');await showSteps();assert.ok((await stepTexts())[2].includes('=2'));
  await setOp('scale');assert.ok(await page.locator('[data-editor="b"]').isHidden());await edit('[data-alpha]','-2');await showSteps();assert.ok((await stepTexts())[0].includes('=-4'));
  await edit('[data-alpha]','0');await showSteps();assert.ok((await stepTexts()).every(text=>text.includes('=0')));
  await setOp('combine');await edit('[data-alpha]','2');await edit('[data-beta]','-3');await showSteps();assert.ok((await stepTexts())[0].includes('=-8'));assert.ok((await stepTexts())[2].includes('=6'));
  if(process.env.SCREENSHOT_DIR)await editor.screenshot({path:process.env.SCREENSHOT_DIR+'/operaciones-matrices-escritorio.png'});
  await dim('b','cols',3);assert.equal(await output.getAttribute('data-compatible'),'false');assert.match(await output.innerText(),/2×2.*2×3/);assert.equal(await page.locator('[data-operations-steps]').count(),0);
  await setOp('scale');assert.equal(await output.getAttribute('data-compatible'),'true');assert.equal(await page.locator('[data-cell="a"]').count(),4);
  await setOp('add');assert.equal(await output.getAttribute('data-compatible'),'false');await dim('a','cols',3);assert.equal(await output.getAttribute('data-compatible'),'true');await dim('a','rows',3);assert.equal(await output.getAttribute('data-compatible'),'false');await dim('b','rows',3);assert.equal(await output.getAttribute('data-compatible'),'true');assert.equal(await page.locator('[data-cell="a"]').count(),9);
  for(const invalid of ['','.5','21']){await edit('[data-cell="a"][data-row="0"][data-col="0"]',invalid);assert.equal(await page.locator('[data-cell="a"][data-row="0"][data-col="0"]').getAttribute('aria-invalid'),'true');assert.match(await page.locator('[data-operations-status]').innerText(),/último valor válido/);}
  await edit('[data-cell="a"][data-row="0"][data-col="0"]','-4');assert.equal(await page.locator('[aria-invalid="true"]').count(),0);
  await setOp('combine');await edit('[data-alpha]','6');assert.equal(await page.locator('[data-alpha]').getAttribute('aria-invalid'),'true');await edit('[data-alpha]','-1');await edit('[data-beta]','0');
  await page.locator('[data-generate-operations]').click();await math();const generated=await page.evaluate(async base=>(await import(base+'content/models/matrix-operations.js')).operationSession(Number(document.querySelector('[data-matrix-operations]').dataset.seed),3,3,3,3),base);
  for(const id of ['a','b'])assert.deepEqual(await page.locator('[data-cell="'+id+'"]').evaluateAll(nodes=>nodes.map(n=>n.valueAsNumber)),generated[id].flat());
  const quiz=page.locator('[data-quiz="t04-e02"]');await quiz.locator('input[value="correct"]').check();await page.locator('[data-reading-controls]>summary').click();await page.locator('[data-text-size]').selectOption('200');await page.locator('[data-contrast-control]').check();await page.locator('[data-highlight-control]').check();await page.setViewportSize({width:320,height:844});await math();assert.ok(await quiz.locator('input[value="correct"]').isChecked());assert.equal(await page.locator('[data-alpha]').inputValue(),'-1');
  await showSteps();if(process.env.SCREENSHOT_DIR)await editor.screenshot({path:process.env.SCREENSHOT_DIR+'/operaciones-matrices-movil.png'});
  for(let i=0;i<6;i++){
   await quiz.getByText('Pregunta '+(i+1)+' de 6 · Sin límite de tiempo',{exact:true}).waitFor();
   if(i===0){await quiz.locator('input[value="wrong-1"]').check();await quiz.getByRole('button',{name:'Comprobar',exact:true}).click();await quiz.getByRole('button',{name:'Ver pista'}).click();await quiz.locator('.feedback').filter({hasText:'Pista:'}).waitFor();}
   await quiz.locator('input[value="correct"]').check();await quiz.getByRole('button',{name:'Comprobar',exact:true}).press('Enter');await quiz.getByRole('button',{name:/Siguiente pregunta|Ver resumen/}).waitFor();await math();await quiz.getByRole('button',{name:/Siguiente pregunta|Ver resumen/}).click();
  }
  await quiz.getByText('5 de 6 respuestas correctas',{exact:false}).waitFor();const deck=page.locator('[data-flashcards]');for(let i=1;i<=6;i++){await deck.getByText('Tarjeta '+i+' de 6',{exact:true}).waitFor();await deck.getByRole('button',{name:'Mostrar respuesta',exact:true}).click();await math();if(i<6)await deck.getByRole('button',{name:'Siguiente',exact:true}).click();}
  await page.locator('[data-reset-reading]').click();await page.reload();await output.locator('mjx-container').first().waitFor();await math();assert.equal(await page.locator('[data-operation]').inputValue(),'add');assert.equal(await page.locator('[data-cell="a"]').count(),4);assert.equal(await quiz.locator('input:checked').count(),0);
  await page.getByRole('link',{name:'Índice de matrices y determinantes',exact:true}).click();await page.waitForFunction(()=>document.querySelectorAll('[data-topic-index] li').length===12);const index=await page.locator('[data-topic-index]').innerText();assert.equal((index.match(/Disponible/g)||[]).length,12);assert.equal((index.match(/En preparación/g)||[]).length,0);
  await page.getByRole('link',{name:'Test disponible de matrices',exact:true}).click();await page.locator('[data-quiz] input').first().waitFor();await math();assert.match(await page.locator('[data-content-role="activity-progress"]').innerText(),/1 de 72/);
  await page.goto(base+'tarjetas/index.html?tema=t04');await page.getByText('Tarjeta 1 de 72',{exact:true}).waitFor();
  const prefix=new URL('prueba-subcarpeta/',base).href;await page.route(prefix+'**',async route=>{const response=await route.fetch({url:route.request().url().replace(prefix,base)});await route.fulfill({response});});await page.goto(prefix+lesson+'#explorador');await output.locator('mjx-container').first().waitFor();await setOp('subtract');await showSteps();assert.ok((await stepTexts())[2].includes('=2'));assert.ok(await page.locator('#site-header a').count()>0);assert.ok(await page.locator('#site-footer').innerText());assert.deepEqual(errors,[]);
  console.log('Aprobado: cuatro operaciones y pasos, escalares negativos/cero, órdenes incompatibles, edición y validación, 3×3, variantes, test 5/6 y seis tarjetas, móvil 320/200 %, preferencias, recarga, tema 4 con 72/72 e índice 12/12, subcarpeta.');
 }finally{await browser.close();}
})().catch(e=>{console.error(e);process.exitCode=1;});

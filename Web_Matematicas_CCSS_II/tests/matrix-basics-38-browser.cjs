const assert=require('node:assert/strict'),{chromium}=require('playwright');
const base=process.env.TEST_URL||'http://127.0.0.1:4173/',topic='libro/temas/04-matrices-y-determinantes/',lesson=topic+'01-matrices-definicion-caracteristicas-y-tipos.html';
(async()=>{
 const browser=await chromium.launch({headless:true,executablePath:process.env.CHROME_PATH});
 try{
  const page=await browser.newPage({viewport:{width:1280,height:960}}),errors=[];
  page.on('pageerror',e=>errors.push(e.message));page.on('response',r=>{if(r.status()>=400&&!r.url().endsWith('favicon.ico'))errors.push(r.status()+' '+r.url());});
  const math=async()=>{await page.waitForFunction(()=>document.querySelector('.math-status')?.hidden===true);assert.equal(await page.locator('[data-mml-node="merror"]').count(),0);assert.doesNotMatch(await page.locator('main').innerText(),/\\[\[(]/);assert.ok(await page.evaluate(()=>document.documentElement.scrollWidth<=innerWidth));};
  const types=async()=>{await math();return page.locator('[data-matrix-type]').evaluateAll(nodes=>nodes.map(n=>n.dataset.matrixType));};
  const preset=async name=>{await page.locator('[data-matrix-preset]').selectOption(name);await math();};
  const cell=(i,j)=>page.locator('[data-matrix-grid] input[data-row="'+i+'"][data-col="'+j+'"]');
  const edit=async(i,j,value)=>{await cell(i,j).fill(value);await cell(i,j).press('Tab');await math();};
  await page.goto(base+lesson+'#explorador');await page.locator('[data-matrix-output] mjx-container').first().waitFor();await math();assert.ok(await page.locator('main mjx-container').count()>30);
  const expectations={data:['rectangular'],row:['row','rectangular'],column:['column','rectangular'],square:['square'],zero:['rectangular','zero'],diagonal:['square','diagonal'],scalar:['square','diagonal','scalar'],identity:['square','diagonal','scalar','identity']};
  for(const [name,expected]of Object.entries(expectations)){await preset(name);assert.deepEqual(await types(),expected);}
  await edit(0,1,'2');assert.deepEqual(await types(),['square']);assert.equal(await page.locator('[data-matrix-preset]').inputValue(),'custom');
  await preset('zero');await page.locator('[data-matrix-cols]').selectOption('2');assert.deepEqual(await types(),['square','zero','diagonal','scalar']);
  await page.locator('[data-matrix-rows]').selectOption('1');await page.locator('[data-matrix-cols]').selectOption('1');await edit(0,0,'-2');assert.deepEqual(await types(),['row','column','square','diagonal','scalar']);await edit(0,0,'1');assert.ok((await types()).includes('identity'));
  for(const invalid of ['','.5','100']){await edit(0,0,invalid);assert.equal(await cell(0,0).getAttribute('aria-invalid'),'true');assert.match(await page.locator('[data-matrix-status]').innerText(),/último valor válido/);assert.ok((await types()).includes('identity'));}
  await edit(0,0,'0');assert.equal(await cell(0,0).getAttribute('aria-invalid'),null);assert.ok((await types()).includes('zero'));
  await page.locator('[data-matrix-rows]').selectOption('4');await page.locator('[data-matrix-cols]').selectOption('4');await math();assert.equal(await page.locator('[data-matrix-grid] input').count(),16);assert.match(await page.locator('[data-matrix-output]').innerText(),/16 elementos/);
  await page.locator('[data-matrix-generate]').click();await math();const generated=await page.evaluate(async base=>{const m=await import(base+'content/models/matrix-basics.js');return m.generatedMatrix(4,4,Number(document.querySelector('[data-matrix-explorer]').dataset.seed)).flat();},base);assert.deepEqual(await page.locator('[data-matrix-grid] input').evaluateAll(nodes=>nodes.map(n=>n.valueAsNumber)),generated);
  await preset('identity');if(process.env.SCREENSHOT_DIR)await page.locator('[data-matrix-explorer]').screenshot({path:process.env.SCREENSHOT_DIR+'/matrices-basicas-escritorio.png'});
  await preset('data');await cell(1,2).focus();await math();assert.match(await page.locator('[data-matrix-output]').innerText(),/fila 2, columna 3/);
  const quiz=page.locator('[data-quiz="t04-e01"]');await quiz.locator('input[value="correct"]').check();await page.locator('[data-reading-controls]>summary').click();await page.locator('[data-text-size]').selectOption('200');await page.locator('[data-contrast-control]').check();await page.locator('[data-highlight-control]').check();await page.setViewportSize({width:320,height:844});await math();assert.ok(await quiz.locator('input[value="correct"]').isChecked());assert.equal(await cell(1,2).inputValue(),'18');
  if(process.env.SCREENSHOT_DIR)await page.locator('[data-matrix-explorer]').screenshot({path:process.env.SCREENSHOT_DIR+'/matrices-basicas-movil.png'});
  for(let i=0;i<6;i++){
   await quiz.getByText('Pregunta '+(i+1)+' de 6 · Sin límite de tiempo',{exact:true}).waitFor();
   if(i===0){await quiz.locator('input[value="wrong-1"]').check();await quiz.getByRole('button',{name:'Comprobar',exact:true}).click();await quiz.getByRole('button',{name:'Ver pista'}).click();await quiz.locator('.feedback').filter({hasText:'Pista:'}).waitFor();}
   await quiz.locator('input[value="correct"]').check();await quiz.getByRole('button',{name:'Comprobar',exact:true}).press('Enter');await quiz.getByRole('button',{name:/Siguiente pregunta|Ver resumen/}).waitFor();await math();await quiz.getByRole('button',{name:/Siguiente pregunta|Ver resumen/}).click();
  }
  await quiz.getByText('5 de 6 respuestas correctas',{exact:false}).waitFor();
  const deck=page.locator('[data-flashcards]');for(let i=1;i<=6;i++){await deck.getByText('Tarjeta '+i+' de 6',{exact:true}).waitFor();await deck.getByRole('button',{name:'Mostrar respuesta',exact:true}).click();await math();if(i<6)await deck.getByRole('button',{name:'Siguiente',exact:true}).click();}
  await page.locator('[data-reset-reading]').click();await edit(1,2,'99');await page.reload();await page.locator('[data-matrix-grid] input').first().waitFor();await math();assert.equal(await cell(1,2).inputValue(),'18');assert.equal(await quiz.locator('input:checked').count(),0);
  await page.getByRole('link',{name:'Índice de matrices y determinantes',exact:true}).click();await page.waitForFunction(()=>document.querySelectorAll('[data-topic-index] li').length===12);const index=await page.locator('[data-topic-index]').innerText();assert.equal((index.match(/Disponible/g)||[]).length,12);assert.equal((index.match(/En preparación/g)||[]).length,0);
  await page.getByRole('link',{name:'Test disponible de matrices',exact:true}).click();await page.locator('[data-quiz] input').first().waitFor();await math();assert.match(await page.locator('[data-content-role="activity-progress"]').innerText(),/1 de 72/);assert.match(await page.locator('[data-scope-label]').innerText(),/Tema 4/);
  await page.goto(base+'tarjetas/index.html?tema=t04');await page.getByText('Tarjeta 1 de 72',{exact:true}).waitFor();await page.getByRole('button',{name:'Mostrar respuesta',exact:true}).click();await math();
  const prefix=new URL('prueba-subcarpeta/',base).href;await page.route(prefix+'**',async route=>{const response=await route.fetch({url:route.request().url().replace(prefix,base)});await route.fulfill({response});});await page.goto(prefix+lesson+'#explorador');await page.locator('[data-matrix-grid] input').first().waitFor();await preset('identity');assert.ok((await types()).includes('identity'));assert.ok(await page.locator('#site-header a').count()>0);assert.ok(await page.locator('#site-footer').innerText());assert.deepEqual(errors,[]);
  console.log('Aprobado: 4.1, ocho ejemplos del editor, igualdad/clasificación, 1×1, edición y validación, dimensiones y variantes, test 5/6, seis tarjetas, móvil 320/200 %, preferencias, recarga, t04 aislado, índice 12/12 y subcarpeta.');
 }finally{await browser.close();}
})().catch(e=>{console.error(e);process.exitCode=1;});

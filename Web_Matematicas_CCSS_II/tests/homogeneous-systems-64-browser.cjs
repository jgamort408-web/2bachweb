const assert=require('node:assert/strict'),{chromium}=require('playwright');
const base=process.env.TEST_URL||'http://127.0.0.1:4173/',topic='libro/temas/05-sistemas-de-ecuaciones/',lesson=topic+'10-sistemas-homogeneos.html';
(async()=>{
 const browser=await chromium.launch({headless:true,executablePath:process.env.CHROME_PATH});
 try{
  const page=await browser.newPage({viewport:{width:1280,height:960}}),errors=[];
  page.on('pageerror',e=>errors.push(e.message));page.on('response',r=>{if(r.status()>=400&&!r.url().endsWith('favicon.ico'))errors.push(r.status()+' '+r.url());});
  const math=async()=>{await page.waitForFunction(()=>{const s=document.querySelector('.math-status');return s?.hidden===true&&!(/\\[\[(]/.test(document.querySelector('main')?.innerText||''));});assert.equal(await page.locator('[data-mml-node="merror"]').count(),0);assert.ok(await page.evaluate(()=>document.documentElement.scrollWidth<=innerWidth));};
  const output=page.locator('[data-homogeneous-output]'),sample=page.locator('[data-homogeneous-sample]'),root=page.locator('[data-homogeneous-explorer]');
  const field=(i,j)=>root.locator('[data-homogeneous-entry][data-row="'+i+'"][data-col="'+j+'"]');
  const edit=async(i,j,value)=>{await field(i,j).fill(value);await field(i,j).press('Tab');await math();};
  const param=i=>root.locator('[data-homogeneous-parameter="'+i+'"]');
  const change=async(i,v)=>{await param(i).fill(v);await param(i).press('Tab');await math();};
  const preset=async name=>{await page.locator('[data-homogeneous-preset]').selectOption(name);await math();};
  const snapshot=async()=>JSON.parse(await output.getAttribute('data-snapshot'));
  const solution=async()=>JSON.parse(await sample.getAttribute('data-solution'));
  await page.goto(base+lesson+'#explorador');await output.locator('mjx-container').first().waitFor();await math();
  for(const [name,k]of [['unique',0],['dependent',1],['fractional',1],['plane',2],['tall',0],['zero',3],['three',0],['skipped',2]]){
   await preset(name);assert.equal(await output.getAttribute('data-kind'),k?'SCI':'SCD');assert.equal(await output.getAttribute('data-free'),String(k));
   assert.equal(await root.locator('[data-homogeneous-parameter]').count(),k);assert.equal(await sample.getAttribute('data-trivial'),'true');
   assert.equal(await page.locator('[data-homogeneous-nonzero]').isDisabled(),k===0);
   const matrix=await snapshot();assert.equal(await root.locator('[data-homogeneous-entry]').count(),matrix.length*matrix[0].length);
   for(const td of await root.locator('tbody tr td:last-child').all())assert.equal(await td.innerText(),'0');
   await output.locator('details>summary').click();await math();
   if(k){await page.locator('[data-homogeneous-nonzero]').press('Enter');await math();assert.equal(await sample.getAttribute('data-trivial'),'false');await page.locator('[data-homogeneous-zero]').click();await math();assert.equal(await sample.getAttribute('data-trivial'),'true');}
  }
  await preset('fractional');await change(0,'1');assert.deepEqual(await solution(),[{numerator:-1,denominator:2},{numerator:1,denominator:1},{numerator:1,denominator:1}]);
  const validSolution=await solution();
  for(const bad of ['','0.5','6','-6']){await change(0,bad);assert.equal(await param(0).getAttribute('aria-invalid'),'true');assert.deepEqual(await solution(),validSolution);}
  await change(0,'-5');assert.equal(await param(0).getAttribute('aria-invalid'),null);assert.equal(await sample.getAttribute('data-trivial'),'false');
  await preset('plane');await change(0,'2');await change(1,'-3');assert.deepEqual(await solution(),[1,2,-3].map(numerator=>({numerator,denominator:1})));
  await preset('dependent');await page.locator('[data-homogeneous-nonzero]').click();await edit(1,1,'1');assert.equal(await output.getAttribute('data-kind'),'SCD');assert.equal(await sample.getAttribute('data-trivial'),'true');assert.equal(await root.locator('[data-homogeneous-parameter]').count(),0);
  await edit(1,1,'2');assert.equal(await output.getAttribute('data-kind'),'SCI');assert.equal(await sample.getAttribute('data-trivial'),'true');
  const valid=await snapshot();
  for(const bad of ['','0.5','10','-10']){await edit(0,0,bad);assert.equal(await field(0,0).getAttribute('aria-invalid'),'true');assert.deepEqual(await snapshot(),valid);}
  await edit(0,0,'1');assert.equal(await field(0,0).getAttribute('aria-invalid'),null);
  await preset('unique');await page.locator('[data-homogeneous-cols]').selectOption('3');await math();assert.deepEqual(await snapshot(),[[2,1,0],[1,2,0]]);assert.equal(await output.getAttribute('data-kind'),'SCI');
  await page.locator('[data-homogeneous-rows]').selectOption('3');await math();assert.deepEqual((await snapshot())[2],[0,0,0]);
  await page.locator('[data-homogeneous-cols]').selectOption('2');await math();assert.deepEqual(await snapshot(),[[2,1],[1,2],[0,0]]);assert.equal(await output.getAttribute('data-kind'),'SCD');
  for(const rows of [2,3])for(const cols of [2,3]){
   await page.locator('[data-homogeneous-rows]').selectOption(String(rows));await page.locator('[data-homogeneous-cols]').selectOption(String(cols));await page.locator('[data-homogeneous-generate]').press('Enter');await math();
   const expected=await page.evaluate(async({base,rows,cols})=>(await import(base+'content/models/homogeneous-systems.js')).generatedHomogeneous(Number(document.querySelector('[data-homogeneous-explorer]').dataset.seed),rows,cols),{base,rows,cols});
   assert.deepEqual(await snapshot(),expected);assert.notEqual(await output.getAttribute('data-kind'),'SI');
  }
  await preset('zero');await preset('unique');await preset('fractional');await change(0,'1');
  if(process.env.SCREENSHOT_DIR)await root.screenshot({path:process.env.SCREENSHOT_DIR+'/homogeneos-escritorio.png'});
  const quiz=page.locator('[data-quiz="t05-e10"]');await quiz.locator('input[value="correct"]').check();
  const saved=await snapshot(),savedSolution=await solution();
  await page.locator('[data-reading-controls]>summary').click();await page.locator('[data-text-size]').selectOption('200');await page.locator('[data-contrast-control]').check();await page.locator('[data-highlight-control]').check();await page.setViewportSize({width:320,height:844});await math();
  assert.ok(await quiz.locator('input[value="correct"]').isChecked());assert.deepEqual(await snapshot(),saved);assert.deepEqual(await solution(),savedSolution);
  await output.locator('details>summary').click();await math();
  if(process.env.SCREENSHOT_DIR)await root.screenshot({path:process.env.SCREENSHOT_DIR+'/homogeneos-movil.png'});
  for(let i=0;i<6;i++){
   await quiz.getByText('Pregunta '+(i+1)+' de 6 · Sin límite de tiempo',{exact:true}).waitFor();
   if(i===0){await quiz.locator('input[value="wrong-1"]').check();await quiz.getByRole('button',{name:'Comprobar',exact:true}).click();await quiz.getByRole('button',{name:'Ver pista'}).click();await quiz.locator('.feedback').filter({hasText:'Pista:'}).waitFor();}
   await quiz.locator('input[value="correct"]').check();await quiz.getByRole('button',{name:'Comprobar',exact:true}).press('Enter');await quiz.getByRole('button',{name:/Siguiente pregunta|Ver resumen/}).waitFor();await math();await quiz.getByRole('button',{name:/Siguiente pregunta|Ver resumen/}).click();
  }
  await quiz.getByText('5 de 6 respuestas correctas',{exact:false}).waitFor();
  const deck=page.locator('[data-flashcards]');for(let i=1;i<=6;i++){await deck.getByText('Tarjeta '+i+' de 6',{exact:true}).waitFor();await deck.getByRole('button',{name:'Mostrar respuesta',exact:true}).click();await math();if(i<6)await deck.getByRole('button',{name:'Siguiente',exact:true}).click();}
  await page.locator('[data-reset-reading]').click();await page.reload();await output.locator('mjx-container').first().waitFor();await math();assert.equal(await output.getAttribute('data-kind'),'SCD');assert.deepEqual(await snapshot(),[[2,1],[1,2]]);assert.equal(await quiz.locator('input:checked').count(),0);
  await page.getByRole('link',{name:'Índice de sistemas de ecuaciones',exact:true}).click();await page.waitForFunction(()=>document.querySelectorAll('[data-topic-index] li').length===11);
  const text=await page.locator('[data-topic-index]').innerText();assert.equal((text.match(/Disponible/g)||[]).length,11);assert.equal((text.match(/En preparación/g)||[]).length,0);
  await page.getByRole('link',{name:'Test disponible de sistemas',exact:true}).click();await page.locator('[data-quiz] input').first().waitFor();await math();assert.match(await page.locator('[data-content-role="activity-progress"]').innerText(),/1 de 66/);assert.match(await page.locator('[data-scope-label]').innerText(),/Tema 5/);
  assert.equal(await page.locator('[data-study-topics] [aria-current="page"]').innerText(),'Tema 5');
  await page.goto(base+'tarjetas/index.html?tema=t05');await page.getByText('Tarjeta 1 de 66',{exact:true}).waitFor();await page.getByRole('button',{name:'Mostrar respuesta',exact:true}).click();await math();


  const prefix=new URL('prueba-subcarpeta/',base).href;
  await page.route(prefix+'**',async route=>{const response=await route.fetch({url:route.request().url().replace(prefix,base)});await route.fulfill({response});});
  await page.goto(prefix+lesson+'#explorador');await output.locator('mjx-container').first().waitFor();await preset('skipped');
  await page.locator('[data-homogeneous-nonzero]').click();await math();assert.equal(await output.getAttribute('data-kind'),'SCI');assert.equal(await sample.getAttribute('data-trivial'),'false');
  assert.deepEqual(await solution(),[1,0,0].map(numerator=>({numerator,denominator:1})));
  assert.ok(await page.locator('#site-header a').count()>0);assert.ok(await page.locator('#site-footer').innerText());assert.deepEqual(errors,[]);
  console.log('Aprobado: ocho casos, B fijo, parámetros y soluciones exactas, transiciones SCD/SCI, validación, cuatro dimensiones, variantes, test 5/6, seis tarjetas, teclado, móvil 320/200 %, preferencias, recarga, t05 66/66, índice 11/11 y subcarpeta.');
 }finally{for(const context of browser.contexts())for(const page of context.pages())await page.unrouteAll({behavior:'ignoreErrors'});await browser.close();}
})().catch(e=>{console.error(e);process.exitCode=1;});

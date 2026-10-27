const assert=require('node:assert/strict'),{chromium}=require('playwright');
const base=process.env.TEST_URL||'http://127.0.0.1:4173/',topic='libro/temas/05-sistemas-de-ecuaciones/',lesson=topic+'07-resolucion-de-sistemas-matriz-inversa.html';
(async()=>{
 const browser=await chromium.launch({headless:true,executablePath:process.env.CHROME_PATH});
 try{
  const page=await browser.newPage({viewport:{width:1280,height:960}}),errors=[];
  page.on('pageerror',e=>errors.push(e.message));page.on('response',r=>{if(r.status()>=400&&!r.url().endsWith('favicon.ico'))errors.push(r.status()+' '+r.url());});
  const math=async()=>{await page.waitForFunction(()=>{const s=document.querySelector('.math-status');return s?.hidden===true&&!(/\\[\[(]/.test(document.querySelector('main')?.innerText||''));});assert.equal(await page.locator('[data-mml-node="merror"]').count(),0);assert.ok(await page.evaluate(()=>document.documentElement.scrollWidth<=innerWidth));};



  const output=page.locator('[data-inverse-system-output]'),root=page.locator('[data-inverse-system-explorer]');
  const field=(i,j)=>root.locator('[data-inverse-system-entry][data-row="'+i+'"][data-col="'+j+'"]');
  const edit=async(i,j,value)=>{await field(i,j).fill(value);await field(i,j).press('Tab');await math();};
  const preset=async name=>{await page.locator('[data-inverse-system-preset]').selectOption(name);await math();};
  const snapshot=async()=>JSON.parse(await output.getAttribute('data-snapshot'));
  const solution=async()=>JSON.parse(await output.getAttribute('data-solution'));
  await page.goto(base+lesson+'#explorador');await output.locator('mjx-container').first().waitFor();await math();
  for(const [name,kind]of [['integer','SCD'],['fractional','SCD'],['three','SCD'],['homogeneous','SCD'],['dependent','SCI'],['impossible','SI']]){
   await preset(name);assert.equal(await output.getAttribute('data-kind'),kind);
   if(kind==='SCD'){assert.ok(await solution());await output.locator('details>summary').click();await math();assert.match(await output.innerText(),/Todas las igualdades se cumplen exactamente/);}
   else{assert.equal(await solution(),null);assert.equal(await output.locator('details').count(),0);assert.match(await output.innerText(),/A no tiene inversa/);assert.doesNotMatch(await output.innerText(),/Todas las igualdades se cumplen exactamente/);}
  }
  await preset('integer');await edit(0,2,'6');await edit(1,2,'3');assert.deepEqual(await solution(),[{numerator:3,denominator:1},{numerator:3,denominator:1}]);
  for(const bad of ['','0.5','10','-10']){await edit(0,2,bad);assert.equal(await field(0,2).getAttribute('aria-invalid'),'true');assert.equal((await snapshot()).b[0],6);assert.match(await page.locator('[data-inverse-system-status]').innerText(),/último valor válido/);}
  await edit(0,2,'3');assert.equal(await field(0,2).getAttribute('aria-invalid'),null);
  await preset('dependent');await edit(1,2,'7');assert.equal(await output.getAttribute('data-kind'),'SI');assert.equal(await solution(),null);
  await edit(1,1,'1');assert.equal(await output.getAttribute('data-kind'),'SCD');assert.ok(await solution());assert.doesNotMatch(await output.innerText(),/A no tiene inversa/);
  // Ampliar conserva A y B; la nueva fila/columna cero impide invertir hasta editar.
  await preset('integer');await page.locator('[data-inverse-system-size]').selectOption('3');await math();
  assert.deepEqual(await snapshot(),{a:[[1,1,0],[2,-1,0],[0,0,0]],b:[3,0,0]});assert.equal(await solution(),null);
  await edit(2,2,'1');assert.equal(await output.getAttribute('data-kind'),'SCD');
  await page.locator('[data-inverse-system-size]').selectOption('2');await math();assert.deepEqual((await snapshot()).b,[3,0]);
  for(const size of [2,3])for(const kind of ['SCD','SCI','SI']){
   await page.locator('[data-inverse-system-size]').selectOption(String(size));await page.locator('[data-inverse-system-kind]').selectOption(kind);await page.locator('[data-inverse-system-generate]').press('Enter');await math();
   const expected=await page.evaluate(async({base,size,kind})=>(await import(base+'content/models/inverse-systems.js')).generatedInverseSystem(Number(document.querySelector('[data-inverse-system-explorer]').dataset.seed),size,kind),{base,size,kind});
   assert.deepEqual(await snapshot(),expected);assert.equal(await output.getAttribute('data-kind'),kind);
  }
  await page.locator('[data-inverse-system-preset]').selectOption('impossible');await page.locator('[data-inverse-system-preset]').selectOption('three');await preset('fractional');
  assert.deepEqual(await solution(),[{numerator:2,denominator:3},{numerator:-1,denominator:3}]);
  if(process.env.SCREENSHOT_DIR)await output.screenshot({path:process.env.SCREENSHOT_DIR+'/sistemas-inversa-escritorio.png'});
  const quiz=page.locator('[data-quiz="t05-e07"]');await quiz.locator('input[value="correct"]').check();
  const saved=await snapshot();
  await page.locator('[data-reading-controls]>summary').click();await page.locator('[data-text-size]').selectOption('200');await page.locator('[data-contrast-control]').check();await page.locator('[data-highlight-control]').check();await page.setViewportSize({width:320,height:844});await math();
  assert.ok(await quiz.locator('input[value="correct"]').isChecked());assert.deepEqual(await snapshot(),saved);
  await output.locator('details>summary').click();await math();
  if(process.env.SCREENSHOT_DIR)await output.screenshot({path:process.env.SCREENSHOT_DIR+'/sistemas-inversa-movil.png'});
  for(let i=0;i<6;i++){
   await quiz.getByText('Pregunta '+(i+1)+' de 6 · Sin límite de tiempo',{exact:true}).waitFor();
   if(i===0){await quiz.locator('input[value="wrong-1"]').check();await quiz.getByRole('button',{name:'Comprobar',exact:true}).click();await quiz.getByRole('button',{name:'Ver pista'}).click();await quiz.locator('.feedback').filter({hasText:'Pista:'}).waitFor();}
   await quiz.locator('input[value="correct"]').check();await quiz.getByRole('button',{name:'Comprobar',exact:true}).press('Enter');await quiz.getByRole('button',{name:/Siguiente pregunta|Ver resumen/}).waitFor();await math();await quiz.getByRole('button',{name:/Siguiente pregunta|Ver resumen/}).click();
  }
  await quiz.getByText('5 de 6 respuestas correctas',{exact:false}).waitFor();
  const deck=page.locator('[data-flashcards]');for(let i=1;i<=6;i++){await deck.getByText('Tarjeta '+i+' de 6',{exact:true}).waitFor();await deck.getByRole('button',{name:'Mostrar respuesta',exact:true}).click();await math();if(i<6)await deck.getByRole('button',{name:'Siguiente',exact:true}).click();}
  await page.locator('[data-reset-reading]').click();await page.reload();await output.locator('mjx-container').first().waitFor();await math();assert.equal(await output.getAttribute('data-kind'),'SCD');assert.deepEqual(await snapshot(),{a:[[1,1],[2,-1]],b:[3,0]});assert.equal(await quiz.locator('input:checked').count(),0);
  await page.getByRole('link',{name:'Índice de sistemas de ecuaciones',exact:true}).click();await page.waitForFunction(()=>document.querySelectorAll('[data-topic-index] li').length===11);
  const text=await page.locator('[data-topic-index]').innerText();assert.equal((text.match(/Disponible/g)||[]).length,11);assert.equal((text.match(/En preparación/g)||[]).length,0);
  await page.getByRole('link',{name:'Test disponible de sistemas',exact:true}).click();await page.locator('[data-quiz] input').first().waitFor();await math();assert.match(await page.locator('[data-content-role="activity-progress"]').innerText(),/1 de 66/);assert.match(await page.locator('[data-scope-label]').innerText(),/Tema 5/);
  assert.equal(await page.locator('[data-study-topics] [aria-current="page"]').innerText(),'Tema 5');
  await page.goto(base+'tarjetas/index.html?tema=t05');await page.getByText('Tarjeta 1 de 66',{exact:true}).waitFor();await page.getByRole('button',{name:'Mostrar respuesta',exact:true}).click();await math();
  const prefix=new URL('prueba-subcarpeta/',base).href;
  await page.route(prefix+'**',async route=>{const response=await route.fetch({url:route.request().url().replace(prefix,base)});await route.fulfill({response});});
  await page.goto(prefix+lesson+'#explorador');await output.locator('mjx-container').first().waitFor();await preset('three');assert.equal(await output.getAttribute('data-kind'),'SCD');assert.deepEqual(await solution(),[{numerator:1,denominator:1},{numerator:2,denominator:1},{numerator:3,denominator:1}]);
  assert.ok(await page.locator('#site-header a').count()>0);assert.ok(await page.locator('#site-footer').innerText());assert.deepEqual(errors,[]);
  console.log('Aprobado: seis casos, inversa y fracciones exactas, bloqueo singular sin salida obsoleta, edición y recuperación, órdenes 2/3, variantes, test 5/6, seis tarjetas, teclado, móvil 320/200 %, preferencias, recarga, t05 66/66, índice 11/11 y subcarpeta.');
 }finally{for(const context of browser.contexts())for(const page of context.pages())await page.unrouteAll({behavior:'ignoreErrors'});await browser.close();}
})().catch(e=>{console.error(e);process.exitCode=1;});

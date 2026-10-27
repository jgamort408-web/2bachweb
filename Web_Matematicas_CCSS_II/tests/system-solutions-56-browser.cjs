const assert=require('node:assert/strict'),{chromium}=require('playwright');
const base=process.env.TEST_URL||'http://127.0.0.1:4173/',topic='libro/temas/05-sistemas-de-ecuaciones/',lesson=topic+'02-solucion-de-un-sistema-de-ecuaciones.html';
(async()=>{
 const browser=await chromium.launch({headless:true,executablePath:process.env.CHROME_PATH});
 try{
  const page=await browser.newPage({viewport:{width:1280,height:960}}),errors=[];
  page.on('pageerror',e=>errors.push(e.message));page.on('response',r=>{if(r.status()>=400&&!r.url().endsWith('favicon.ico'))errors.push(r.status()+' '+r.url());});
  const math=async()=>{await page.waitForFunction(()=>{const s=document.querySelector('.math-status');return s?.hidden===true&&!(/\\[\[(]/.test(document.querySelector('main')?.innerText||''));});assert.equal(await page.locator('[data-mml-node="merror"]').count(),0);assert.ok(await page.evaluate(()=>document.documentElement.scrollWidth<=innerWidth));};
  const root=page.locator('[data-solution-explorer]'),output=page.locator('[data-solution-output]');
  const preset=async name=>{await page.locator('[data-solution-preset]').selectOption(name);await math();};
  const edit=async(name,value)=>{const input=page.locator('[data-coordinate="'+name+'"]');await input.fill(value);await input.press('Tab');await math();};
  await page.goto(base+lesson+'#explorador');await output.locator('mjx-container').first().waitFor();await math();
  for(const [key,kind]of [['crossing','unique'],['parallel','none'],['coincident','infinite'],['vertical','unique'],['fractional','unique'],['outside','unique']]){
   await preset(key);assert.equal(await output.getAttribute('data-kind'),kind);
   if(kind==='none'){assert.ok(await page.locator('[data-solution-use]').isDisabled());assert.ok(await page.locator('[data-solution-parameter]').isDisabled());}
   else{await page.locator('[data-solution-use]').press('Enter');await math();assert.equal(await output.getAttribute('data-count'),'2');}
  }
  // El cruce existe aunque no aparezca en la ventana inicial.
  assert.equal(await page.locator('[data-intersection]').count(),0);assert.match(await output.innerText(),/fuera de esta ventana/);
  await page.locator('[data-solution-window]').selectOption('24');await math();assert.equal(await page.locator('[data-intersection]').count(),1);
  await page.locator('[data-solution-window]').selectOption('6');await preset('coincident');await page.locator('[data-solution-parameter]').focus();await page.locator('[data-solution-parameter]').press('ArrowRight');await math();
  assert.equal(await page.locator('[data-coordinate="x"]').inputValue(),'1');assert.equal(await output.getAttribute('data-count'),'2');assert.equal(await page.locator('[data-solution-line]').count(),2);assert.equal(await page.locator('[data-solution-line="2"]').getAttribute('stroke-dasharray'),'10 6');
  await preset('fractional');await edit('x','0,333');await edit('y','0.333');assert.equal(await output.getAttribute('data-count'),'1');
  await edit('x','2/6');await edit('y','-1/-3');assert.equal(await output.getAttribute('data-count'),'2');
  for(const bad of ['','1/0','100','1/1001']){await edit('x',bad);assert.equal(await page.locator('[data-coordinate="x"]').getAttribute('aria-invalid'),'true');assert.equal(await output.getAttribute('data-count'),'2');assert.match(await page.locator('[data-solution-status]').innerText(),/último punto válido/);}
  await edit('x','1/3');assert.equal(await page.locator('[data-coordinate="x"]').getAttribute('aria-invalid'),null);
  for(const [key,kind]of [['crossing','unique'],['parallel','none'],['coincident','infinite']]){
   await preset(key);await page.locator('[data-solution-generate]').click();await math();
   const expected=await page.evaluate(async({base,kind})=>(await import(base+'content/models/system-solutions.js')).generatedLines(Number(document.querySelector('[data-solution-explorer]').dataset.seed),kind),{base,kind});
   assert.equal(await output.getAttribute('data-kind'),kind);assert.deepEqual(JSON.parse(await output.getAttribute('data-snapshot')).lines,expected);
  }
  await page.locator('[data-solution-preset]').selectOption('parallel');await page.locator('[data-solution-preset]').selectOption('outside');await preset('fractional');await page.locator('[data-solution-use]').click();await math();
  assert.equal(await output.getAttribute('data-count'),'2');
  if(process.env.SCREENSHOT_DIR)await root.screenshot({path:process.env.SCREENSHOT_DIR+'/soluciones-sistemas-escritorio.png'});
  const quiz=page.locator('[data-quiz="t05-e02"]');await quiz.locator('input[value="correct"]').check();
  await page.locator('[data-reading-controls]>summary').click();await page.locator('[data-text-size]').selectOption('200');await page.locator('[data-contrast-control]').check();await page.locator('[data-highlight-control]').check();await page.setViewportSize({width:320,height:844});await math();
  assert.ok(await quiz.locator('input[value="correct"]').isChecked());assert.equal(await page.locator('[data-coordinate="x"]').inputValue(),'1/3');
  if(process.env.SCREENSHOT_DIR)await root.screenshot({path:process.env.SCREENSHOT_DIR+'/soluciones-sistemas-movil.png'});
  for(let i=0;i<6;i++){
   await quiz.getByText('Pregunta '+(i+1)+' de 6 · Sin límite de tiempo',{exact:true}).waitFor();
   if(i===0){await quiz.locator('input[value="wrong-1"]').check();await quiz.getByRole('button',{name:'Comprobar',exact:true}).click();await quiz.getByRole('button',{name:'Ver pista'}).click();await quiz.locator('.feedback').filter({hasText:'Pista:'}).waitFor();}
   await quiz.locator('input[value="correct"]').check();await quiz.getByRole('button',{name:'Comprobar',exact:true}).press('Enter');await quiz.getByRole('button',{name:/Siguiente pregunta|Ver resumen/}).waitFor();await math();await quiz.getByRole('button',{name:/Siguiente pregunta|Ver resumen/}).click();
  }
  await quiz.getByText('5 de 6 respuestas correctas',{exact:false}).waitFor();
  const deck=page.locator('[data-flashcards]');for(let i=1;i<=6;i++){await deck.getByText('Tarjeta '+i+' de 6',{exact:true}).waitFor();await deck.getByRole('button',{name:'Mostrar respuesta',exact:true}).click();await math();if(i<6)await deck.getByRole('button',{name:'Siguiente',exact:true}).click();}
  await page.locator('[data-reset-reading]').click();await page.reload();await output.locator('mjx-container').first().waitFor();await math();assert.equal(await page.locator('[data-coordinate="x"]').inputValue(),'0');assert.equal(await quiz.locator('input:checked').count(),0);
  await page.getByRole('link',{name:'Índice de sistemas de ecuaciones',exact:true}).click();await page.waitForFunction(()=>document.querySelectorAll('[data-topic-index] li').length===11);
  const text=await page.locator('[data-topic-index]').innerText();assert.equal((text.match(/Disponible/g)||[]).length,11);assert.equal((text.match(/En preparación/g)||[]).length,0);
  await page.getByRole('link',{name:'Test disponible de sistemas',exact:true}).click();await page.locator('[data-quiz] input').first().waitFor();await math();assert.match(await page.locator('[data-content-role="activity-progress"]').innerText(),/1 de 66/);assert.match(await page.locator('[data-scope-label]').innerText(),/Tema 5/);
  assert.equal(await page.locator('[data-study-topics] [aria-current="page"]').innerText(),'Tema 5');
  await page.goto(base+'tarjetas/index.html?tema=t05');await page.getByText('Tarjeta 1 de 66',{exact:true}).waitFor();await page.getByRole('button',{name:'Mostrar respuesta',exact:true}).click();await math();

  const prefix=new URL('prueba-subcarpeta/',base).href;
  await page.route(prefix+'**',async route=>{const response=await route.fetch({url:route.request().url().replace(prefix,base)});await route.fulfill({response});});
  await page.goto(prefix+lesson+'#explorador');await output.locator('mjx-container').first().waitFor();await preset('vertical');await page.locator('[data-solution-use]').click();await math();assert.equal(await output.getAttribute('data-count'),'2');
  assert.ok(await page.locator('#site-header a').count()>0);assert.ok(await page.locator('#site-footer').innerText());assert.deepEqual(errors,[]);
  console.log('Aprobado: seis casos, fracciones exactas frente a decimales, ventana e intersección, parámetro, validación y generación; test 5/6, seis tarjetas, teclado, móvil 320/200 %, preferencias, recarga, t05 66/66, índice 11/11 y subcarpeta.');
 }finally{for(const context of browser.contexts())for(const page of context.pages())await page.unrouteAll({behavior:'wait'});await browser.close();}
})().catch(e=>{console.error(e);process.exitCode=1;});

const assert=require('node:assert/strict'),{chromium}=require('playwright');
const base=process.env.TEST_URL||'http://127.0.0.1:4173/',topic='libro/temas/05-sistemas-de-ecuaciones/',lesson=topic+'03-clasificacion-de-sistemas-de-ecuaciones-segun-sus-soluciones.html';
(async()=>{
 const browser=await chromium.launch({headless:true,executablePath:process.env.CHROME_PATH});
 try{
  const page=await browser.newPage({viewport:{width:1280,height:960}}),errors=[];
  page.on('pageerror',e=>errors.push(e.message));page.on('response',r=>{if(r.status()>=400&&!r.url().endsWith('favicon.ico'))errors.push(r.status()+' '+r.url());});
  const math=async()=>{await page.waitForFunction(()=>{const s=document.querySelector('.math-status');return s?.hidden===true&&!(/\\[\[(]/.test(document.querySelector('main')?.innerText||''));});assert.equal(await page.locator('[data-mml-node="merror"]').count(),0);assert.ok(await page.evaluate(()=>document.documentElement.scrollWidth<=innerWidth));};
  const practice=page.locator('[data-classification-practice]'),quiz=page.locator('[data-quiz="t05-e03"]');
  await page.goto(base+lesson+'#explorador');await practice.locator('input').first().waitFor();await math();
  await practice.getByRole('button',{name:'Comprobar',exact:true}).click();await practice.getByText('Selecciona una respuesta antes de comprobar.',{exact:true}).waitFor();
  const run=async(root,answers,wrongFirst=false)=>{
   for(let i=0;i<answers.length;i++){
    await root.getByText('Pregunta '+(i+1)+' de 6 · Sin límite de tiempo',{exact:true}).waitFor();
    if(i===0&&wrongFirst){
     await root.locator('input:not([value="'+answers[i]+'"])').first().check();
     await root.getByRole('button',{name:'Comprobar',exact:true}).click();
     await root.locator('.feedback').filter({hasText:'Revisa tu respuesta.'}).waitFor();
     await root.getByRole('button',{name:'Ver pista',exact:true}).click();await root.locator('.feedback').filter({hasText:'Pista:'}).waitFor();await math();
    }
    await root.locator('input[value="'+answers[i]+'"]').check();await root.getByRole('button',{name:'Comprobar',exact:true}).press('Enter');
    await root.getByRole('button',{name:/Siguiente pregunta|Ver resumen/}).waitFor();await math();
    await root.getByRole('button',{name:/Siguiente pregunta|Ver resumen/}).click();
   }
   await root.getByText((wrongFirst?'5':'6')+' de 6 respuestas correctas',{exact:false}).waitFor();
  };
  const answers=['SCD','SCI','SI','SCD','SCI','SI'];
  await run(practice,answers,true);
  const seed=await practice.getAttribute('data-seed');
  await practice.getByRole('button',{name:'Empezar otra sesión'}).click();await practice.locator('input').first().waitFor();await math();
  assert.notEqual(await practice.getAttribute('data-seed'),seed);
  // Dos fallos muestran la solución y permiten continuar; las sesiones son independientes.
  await practice.locator('input[value="SI"]').check();
  for(let i=0;i<2;i++){await practice.getByRole('button',{name:'Comprobar',exact:true}).click();await practice.locator('.feedback').filter({hasText:'Revisa tu respuesta.'}).waitFor();await math();}
  await practice.getByRole('button',{name:'Siguiente pregunta'}).waitFor();assert.match(await practice.locator('.feedback').innerText(),/Solución:/);
  assert.ok(await practice.locator('fieldset').evaluate(el=>el.disabled));
  await quiz.locator('input[value="correct"]').check();
  if(process.env.SCREENSHOT_DIR)await page.locator('#explorador').screenshot({path:process.env.SCREENSHOT_DIR+'/clasificacion-sistemas-escritorio.png'});
  await page.locator('[data-reading-controls]>summary').click();await page.locator('[data-text-size]').selectOption('200');await page.locator('[data-contrast-control]').check();await page.locator('[data-highlight-control]').check();await page.setViewportSize({width:320,height:844});await math();
  assert.ok(await quiz.locator('input[value="correct"]').isChecked());assert.ok(await practice.locator('fieldset').evaluate(el=>el.disabled));
  if(process.env.SCREENSHOT_DIR)await page.locator('#explorador').screenshot({path:process.env.SCREENSHOT_DIR+'/clasificacion-sistemas-movil.png'});
  await run(quiz,Array(6).fill('correct'),true);
  const deck=page.locator('[data-flashcards]');for(let i=1;i<=6;i++){await deck.getByText('Tarjeta '+i+' de 6',{exact:true}).waitFor();await deck.getByRole('button',{name:'Mostrar respuesta',exact:true}).click();await math();if(i<6)await deck.getByRole('button',{name:'Siguiente',exact:true}).click();}
  await page.locator('[data-reset-reading]').click();await page.reload();await practice.locator('input').first().waitFor();await math();
  assert.equal(await practice.locator('input:checked').count(),0);assert.equal(await quiz.locator('input:checked').count(),0);
  await page.getByRole('link',{name:'Índice de sistemas de ecuaciones',exact:true}).click();await page.waitForFunction(()=>document.querySelectorAll('[data-topic-index] li').length===11);
  const text=await page.locator('[data-topic-index]').innerText();assert.equal((text.match(/Disponible/g)||[]).length,11);assert.equal((text.match(/En preparación/g)||[]).length,0);
  await page.getByRole('link',{name:'Test disponible de sistemas',exact:true}).click();await page.locator('[data-quiz] input').first().waitFor();await math();assert.match(await page.locator('[data-content-role="activity-progress"]').innerText(),/1 de 66/);
  assert.equal(await page.locator('[data-study-topics] [aria-current="page"]').innerText(),'Tema 5');
  await page.goto(base+'tarjetas/index.html?tema=t05');await page.getByText('Tarjeta 1 de 66',{exact:true}).waitFor();await page.getByRole('button',{name:'Mostrar respuesta',exact:true}).click();await math();
  const prefix=new URL('prueba-subcarpeta/',base).href;
  await page.route(prefix+'**',async route=>{const response=await route.fetch({url:route.request().url().replace(prefix,base)});await route.fulfill({response});});
  await page.goto(prefix+lesson+'#explorador');await practice.locator('input').first().waitFor();await math();await run(practice,answers);
  assert.ok(await page.locator('#site-header a').count()>0);assert.ok(await page.locator('#site-footer').innerText());assert.deepEqual(errors,[]);
  console.log('Aprobado: seis familias, dos sesiones, pista, dos fallos, resumen 5/6 y 6/6, test independiente, seis tarjetas, teclado, móvil 320/200 %, preferencias, recarga, índice 11/11, t05 66/66, LaTeX y subcarpeta.');
 }finally{for(const context of browser.contexts())for(const page of context.pages())await page.unrouteAll({behavior:'ignoreErrors'});await browser.close();}
})().catch(e=>{console.error(e);process.exitCode=1;});

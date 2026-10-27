const assert=require('node:assert/strict');
const {chromium}=require('playwright');
const base=process.env.TEST_URL||'http://127.0.0.1:4173/';
const lesson='libro/temas/03-integrales/03-integrales-casi-inmediatas.html';
(async()=>{
 const browser=await chromium.launch({headless:true,executablePath:process.env.CHROME_PATH});
 try{
  const page=await browser.newPage({viewport:{width:1280,height:960}}),errors=[];
  page.on('pageerror',e=>errors.push(e.message));page.on('response',r=>{if(r.status()>=400&&!r.url().endsWith('favicon.ico'))errors.push(r.status()+' '+r.url());});
  const ready=async()=>{await page.waitForFunction(()=>document.querySelector('.math-status')?.hidden===true);assert.equal(await page.locator('[data-mml-node="merror"]').count(),0);assert.doesNotMatch(await page.locator('main').innerText(),/\\[\[(]/);assert.ok(await page.evaluate(()=>document.documentElement.scrollWidth<=innerWidth));};
  await page.goto(base+lesson);await page.locator('[data-near-immediate-practice] input').first().waitFor();await ready();
  assert.ok(await page.locator('#tabla mjx-container').count()>=12);
  const fixed=page.locator('[data-quiz]'),practice=page.locator('[data-near-immediate-practice]');
  await fixed.locator('input[value="correct"]').check();
  const initial=await practice.locator('legend').innerText();
  const run=async(root,withMistake)=>{
   for(let i=0;i<6;i++){
    await root.getByRole('button',{name:'Comprobar',exact:true}).waitFor();await ready();
    assert.ok(await root.locator('fieldset mjx-container').count()>= (root===practice?7:0));
    if(withMistake&&i===0){
     await root.getByRole('button',{name:'Comprobar',exact:true}).click();await root.locator('.feedback').filter({hasText:'Selecciona'}).waitFor();
     await root.locator('input:not([value="correct"])').first().check();await root.getByRole('button',{name:'Comprobar',exact:true}).click();await root.locator('.feedback').filter({hasText:'Revisa'}).waitFor();
     await root.getByRole('button',{name:'Ver pista'}).click();await root.locator('.feedback').filter({hasText:'Pista:'}).waitFor();
    }
    await root.locator('input[value="correct"]').check();await root.getByRole('button',{name:'Comprobar',exact:true}).click();await root.getByRole('button',{name:/Siguiente pregunta|Ver resumen/}).waitFor();await ready();
    if(root===practice)assert.ok(await root.locator('.feedback mjx-container').count()>=2);
    assert.ok(await root.locator('fieldset input').first().isDisabled());await root.getByRole('button',{name:/Siguiente pregunta|Ver resumen/}).click();
   }
   await root.getByText((withMistake?'5':'6')+' de 6 respuestas correctas',{exact:false}).waitFor();
  };
  await run(practice,true);assert.ok(await fixed.locator('input[value="correct"]').isChecked());
  await practice.getByRole('button',{name:'Empezar otra sesión'}).click();await practice.locator('input').first().waitFor();await ready();
  // Una sesión puede repetir un primer integrando por azar; se comprueba reinicio y otra sesión completa.
  await run(practice,false);
  await run(fixed,false);
  await page.getByText('Ver solución razonada',{exact:true}).click();await ready();
  const cards=page.locator('[data-flashcards]');for(let i=1;i<=6;i++){await cards.getByText('Tarjeta '+i+' de 6',{exact:true}).waitFor();await cards.getByRole('button',{name:'Mostrar respuesta'}).click();await ready();assert.ok(await cards.locator('mjx-container').count()>0);if(i<6)await cards.getByRole('button',{name:'Siguiente',exact:true}).click();}
  if(process.env.SCREENSHOT_DIR)await page.locator('#tabla').screenshot({path:process.env.SCREENSHOT_DIR+'/integrales-casi-inmediatas-tabla.png'});
  await practice.getByRole('button',{name:'Empezar otra sesión'}).click();await practice.locator('input[value="correct"]').check();
  await page.locator('[data-reading-controls]>summary').click();await page.locator('[data-text-size]').selectOption('200');await page.locator('[data-contrast-control]').check();await page.locator('[data-highlight-control]').check();await page.setViewportSize({width:320,height:844});await ready();
  assert.ok(await practice.locator('input[value="correct"]').isChecked());
  await page.locator('#tabla .table-scroll').focus();await page.keyboard.press('ArrowRight');await page.waitForFunction(()=>document.querySelector('#tabla .table-scroll').scrollLeft>0);
  await practice.getByRole('button',{name:'Comprobar',exact:true}).focus();await page.keyboard.press('Enter');await practice.locator('.feedback').filter({hasText:'Correcta'}).waitFor();await ready();
  if(process.env.SCREENSHOT_DIR)await page.locator('#explorador').screenshot({path:process.env.SCREENSHOT_DIR+'/integrales-casi-inmediatas-movil.png'});
  await page.locator('[data-reset-reading]').click();await page.reload();await ready();assert.equal(await page.locator('main input:checked').count(),0);assert.match(await practice.innerText(),/Pregunta 1 de 6/);
  await page.goto(base+'test/index.html?tema=t03');await ready();assert.match(await page.locator('[data-content-role="activity-progress"]').innerText(),/1 de 60/);
  await page.goto(base+'tarjetas/index.html?tema=t03');await page.getByText('Tarjeta 1 de 48',{exact:true}).waitFor();
  await page.goto(base+'libro/temas/03-integrales/index.html');await page.waitForFunction(()=>document.querySelectorAll('[data-topic-index] li').length===8);const index=await page.locator('[data-topic-index]').innerText();assert.equal(index.match(/Disponible/g).length,8);
  const prefix=new URL('prueba-subcarpeta/',base).href;await page.route(prefix+'**',async route=>{const response=await route.fetch({url:route.request().url().replace(prefix,base)});await route.fulfill({response});});
  await page.goto(prefix+lesson);await page.locator('[data-near-immediate-practice] input').first().waitFor();await ready();await practice.locator('input[value="correct"]').check();await practice.getByRole('button',{name:'Comprobar',exact:true}).click();await practice.locator('.feedback').filter({hasText:'Correcta'}).waitFor();await ready();
  assert.ok(await page.locator('#site-header a').count()>0);assert.ok(await page.locator('#site-footer').innerText());assert.deepEqual(errors,[]);
  console.log('Aprobado: 18 respuestas, pista/reintento, reinicio, seis tarjetas, fórmulas, tabla con teclado, móvil 320 px/200 %, preferencias, sin historial, bancos t03 36/36, índice 6/8 y subcarpeta.');
 }finally{await browser.close();}
})().catch(e=>{console.error(e);process.exitCode=1;});

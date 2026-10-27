const assert=require('node:assert/strict');
const {chromium}=require('playwright');
const base=process.env.TEST_URL||'http://127.0.0.1:4173/';
const path='libro/temas/02-representacion-de-funciones/index.html';
(async()=>{
 const browser=await chromium.launch({headless:true,...(process.env.CHROME_PATH?{executablePath:process.env.CHROME_PATH}:{})});
 try{
  const page=await browser.newPage({viewport:{width:1280,height:900}});const errors=[];
  page.on('pageerror',e=>errors.push(e.message));page.on('response',r=>{if(r.status()>=400&&!r.url().endsWith('favicon.ico'))errors.push(r.status()+' '+r.url());});
  const ready=async()=>{await page.waitForFunction(()=>document.querySelector('.math-status')?.hidden===true);assert.equal(await page.locator('[data-mml-node="merror"]').count(),0);assert.doesNotMatch(await page.locator('main').innerText(), /\\[\[(]/);assert.ok(await page.evaluate(()=>document.documentElement.scrollWidth<=innerWidth));};
  await page.goto(base+path+'#repaso');await ready();
  for(let n=1;n<=3;n++){const s=page.getByText('Solución del problema '+n,{exact:true});await s.focus();await page.keyboard.press('Enter');assert.equal(await s.evaluate(el=>el.parentElement.open),true);await ready();}
  assert.equal(await page.locator('[data-topic-index] li').count(),9);
  const quiz=page.locator('[data-quiz="review-t02"]');
  await quiz.getByRole('button',{name:'Comprobar',exact:true}).click();await quiz.locator('.feedback').filter({hasText:'Selecciona'}).waitFor();
  for(let i=0;i<6;i++){
   if(i===0){await quiz.locator('input[value="wrong-1"]').check();await quiz.getByRole('button',{name:'Comprobar',exact:true}).click();await quiz.locator('.feedback').filter({hasText:'Revisa'}).waitFor();await quiz.getByRole('button',{name:'Ver pista'}).click();await quiz.locator('.feedback').filter({hasText:'Pista:'}).waitFor();}
   await quiz.locator('input[value="right"]').check();await quiz.getByRole('button',{name:'Comprobar',exact:true}).click();await quiz.getByRole('button',{name:/Siguiente pregunta|Ver resumen/}).waitFor();await ready();await quiz.getByRole('button',{name:/Siguiente pregunta|Ver resumen/}).click();
  }
  await quiz.getByText('5 de 6 respuestas correctas',{exact:false}).waitFor();
  await quiz.getByRole('button',{name:'Empezar otra sesión'}).click();await quiz.locator('input[value="right"]').check();
  await page.locator('[data-reading-controls] > summary').click();await page.locator('[data-text-size]').selectOption('200');await page.locator('[data-contrast-control]').check();await page.locator('[data-highlight-control]').check();
  await page.setViewportSize({width:320,height:844});await ready();assert.ok(await quiz.locator('input[value="right"]').isChecked());
  if(process.env.SCREENSHOT_DIR)await page.locator('#repaso-logaritmo').screenshot({path:process.env.SCREENSHOT_DIR+'/repaso-t02-movil.png'});
  await page.locator('[data-reset-reading]').click();await page.setViewportSize({width:1280,height:900});await ready();
  if(process.env.SCREENSHOT_DIR)await page.locator('#repaso-tramos').screenshot({path:process.env.SCREENSHOT_DIR+'/repaso-t02-tramos.png'});
  await page.reload();await ready();assert.equal(await quiz.locator('input:checked').count(),0);
  const prefix=new URL('prueba-subcarpeta/',base).href;
  await page.route(prefix+'**',async route=>{const response=await route.fetch({url:route.request().url().replace(prefix,base)});await route.fulfill({response});});
  await page.goto(prefix+path+'#test-repaso');await ready();await quiz.locator('input[value="right"]').check();await quiz.getByRole('button',{name:'Comprobar',exact:true}).click();await quiz.getByRole('button',{name:'Siguiente pregunta'}).waitFor();await ready();
  assert.deepEqual(errors,[]);console.log('Aprobado: tres soluciones con teclado, repaso 5/6, pista, reinicio sin historial, texto 200 % a 320 px, preferencias conservan respuesta, subcarpeta y LaTeX.');
 }finally{await browser.close();}
})().catch(e=>{console.error(e);process.exitCode=1;});

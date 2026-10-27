const assert=require('node:assert/strict'),{chromium}=require('playwright');
const base=process.env.TEST_URL||'http://127.0.0.1:4173/',topic='libro/temas/05-sistemas-de-ecuaciones/index.html';
(async()=>{
 const browser=await chromium.launch({headless:true,executablePath:process.env.CHROME_PATH});
 try{
  const page=await browser.newPage({viewport:{width:1280,height:960}}),errors=[];
  page.on('pageerror',e=>errors.push(e.message));page.on('response',r=>{if(r.status()>=400&&!r.url().endsWith('favicon.ico'))errors.push(r.status()+' '+r.url());});
  const ready=async()=>{
   await page.waitForFunction(()=>document.querySelector('.math-status')?.hidden===true);assert.equal(await page.locator('[data-mml-node="merror"]').count(),0);
   assert.doesNotMatch(await page.locator('main').innerText(),/\\[\[(]/);assert.ok(await page.evaluate(()=>document.documentElement.scrollWidth<=innerWidth));
  };
  await page.goto(base+topic+'#repaso');await ready();
  await page.waitForFunction(()=>document.querySelectorAll('[data-topic-index] li').length===11);
  const index=await page.locator('[data-topic-index]').innerText();assert.equal(index.match(/Disponible/g).length,11);assert.equal((index.match(/En preparación/g)||[]).length,0);
  for(let i=1;i<=4;i++){
   await page.getByText('Pista del bloque '+i,{exact:true}).click();
   await page.getByText('Solución del bloque '+i,{exact:true}).focus();await page.keyboard.press('Enter');await ready();
  }
  assert.ok(await page.locator('#repaso mjx-container').count()>20);
  if(process.env.SCREENSHOT_DIR)await page.locator('#repaso-parametro').screenshot({path:process.env.SCREENSHOT_DIR+'/repaso-sistemas-escritorio.png'});
  const quiz=page.locator('[data-quiz="review-t05"]');
  for(let i=0;i<11;i++){
   await quiz.getByText('Pregunta '+(i+1)+' de 11 · Sin límite de tiempo',{exact:true}).waitFor();await ready();
   if(i===0){await quiz.getByRole('button',{name:'Comprobar',exact:true}).click();await quiz.getByText('Selecciona una respuesta antes de comprobar.',{exact:true}).waitFor();
    await quiz.locator('input[value="wrong-1"]').check();await quiz.getByRole('button',{name:'Comprobar',exact:true}).click();await quiz.locator('.feedback').filter({hasText:'Revisa'}).waitFor();await quiz.getByRole('button',{name:'Ver pista'}).click();await quiz.locator('.feedback').filter({hasText:'Pista:'}).waitFor();}
   await quiz.locator('input[value="correct"]').check();await quiz.getByRole('button',{name:'Comprobar',exact:true}).focus();await page.keyboard.press('Enter');await quiz.getByRole('button',{name:/Siguiente pregunta|Ver resumen/}).waitFor();await ready();
   await quiz.getByRole('button',{name:/Siguiente pregunta|Ver resumen/}).click();
  }
  await quiz.getByText('10 de 11 respuestas correctas',{exact:false}).waitFor();await quiz.getByRole('button',{name:'Empezar otra sesión'}).click();await quiz.locator('input[value="correct"]').check();
  await page.locator('[data-reading-controls]>summary').click();await page.locator('[data-text-size]').selectOption('200');await page.locator('[data-contrast-control]').check();await page.locator('[data-highlight-control]').check();await page.setViewportSize({width:320,height:844});await ready();assert.ok(await quiz.locator('input[value="correct"]').isChecked());
  for(const id of ['repaso-modelo','repaso-familia','repaso-parametro','repaso-homogeneo']){await page.locator('#'+id).scrollIntoViewIfNeeded();await ready();}
  if(process.env.SCREENSHOT_DIR)await page.locator('#test-repaso').screenshot({path:process.env.SCREENSHOT_DIR+'/repaso-sistemas-movil.png'});
  await page.locator('[data-reset-reading]').click();await page.reload();await ready();assert.equal(await quiz.locator('input:checked').count(),0);
  const urls=await page.locator('[data-topic-index] a').evaluateAll(items=>items.map(a=>a.href));
  assert.equal(urls.length,11);
  for(const url of urls){await page.goto(url);await ready();await page.locator('[data-quiz] input').first().waitFor();assert.match(await page.locator('[data-quiz] [data-content-role="activity-progress"]').innerText(),/1 de 6/);assert.ok(await page.locator('main mjx-container').count()>5);}
  await page.locator('a[href="index.html#repaso"]').click();await ready();assert.match(page.url(),/#repaso$/);assert.match(await quiz.innerText(),/1 de 11/);
  await page.goto(base+'test/index.html?tema=t05');await ready();assert.match(await page.locator('[data-content-role="activity-progress"]').innerText(),/1 de 66/);
  await page.goto(base+'tarjetas/index.html?tema=t05');await page.getByText('Tarjeta 1 de 66',{exact:true}).waitFor();
  const prefix=new URL('prueba-subcarpeta/',base).href;await page.route(prefix+'**',async route=>{const response=await route.fetch({url:route.request().url().replace(prefix,base)});await route.fulfill({response});});
  await page.goto(prefix+topic+'#repaso');await ready();await quiz.locator('input[value="correct"]').check();await quiz.getByRole('button',{name:'Comprobar',exact:true}).click();await quiz.locator('.feedback').filter({hasText:'Correcta'}).waitFor();await ready();
  assert.ok(await page.locator('#site-header a').count()>0);assert.ok(await page.locator('#site-footer').innerText());assert.deepEqual(errors,[]);
  console.log('Aprobado: cuatro bloques, test 10/11 con pista/reintento y reinicio, LaTeX, móvil 320/200 %, preferencias sin perder respuesta, once lecciones y retorno, bancos 66/66 y subcarpeta.');
 }finally{for(const context of browser.contexts())for(const page of context.pages())await page.unrouteAll({behavior:'ignoreErrors'});await browser.close();}
})().catch(e=>{console.error(e);process.exitCode=1;});

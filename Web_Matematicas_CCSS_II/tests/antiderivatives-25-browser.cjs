const assert=require('node:assert/strict');
const {chromium}=require('playwright');
const base=process.env.TEST_URL||'http://127.0.0.1:4173/';
const lesson='libro/temas/03-integrales/01-integral-indefinida.html';
(async()=>{
 const browser=await chromium.launch({headless:true,...(process.env.CHROME_PATH?{executablePath:process.env.CHROME_PATH}:{})});
 try{
  const page=await browser.newPage({viewport:{width:1280,height:960}}),errors=[];
  page.on('pageerror',e=>errors.push(e.message));page.on('response',r=>{if(r.status()>=400&&!r.url().endsWith('favicon.ico'))errors.push(r.status()+' '+r.url());});
  const ready=async()=>{await page.waitForFunction(()=>document.querySelector('.math-status')?.hidden===true);assert.equal(await page.locator('[data-mml-node="merror"]').count(),0);assert.doesNotMatch(await page.locator('main').innerText(),/\\[\[(]/);assert.ok(await page.evaluate(()=>document.documentElement.scrollWidth<=innerWidth));};
  await page.goto(base+lesson);await page.locator('.primitive-figure > svg').waitFor();await ready();
  const quiz=page.locator('[data-quiz]');await quiz.locator('input[value="correct"]').check();
  const waitState=async(kind,c,a,b,others=true)=>{await page.waitForFunction(expected=>document.querySelector('[data-primitive-result]')?.dataset.selection===expected,[kind,c,a,b,others].join(':'));await ready();assert.ok(await page.locator('[data-primitive-result] mjx-container').count()>=3);};
  const baseValue=(kind,x)=>kind==='linear'?x*x:kind==='quadratic'?2*x*x*x:3*x;
  const derivative=(kind,x)=>kind==='linear'?2*x:kind==='quadratic'?6*x*x:3;
  for(const kind of ['linear','quadratic','constant'])for(const a of [-1,0,1])for(const b of [-2,0,2]){
   const c=3*a+b;
   await page.locator('[data-primitive-family]').selectOption(kind);await page.locator('[data-primitive-a]').selectOption(String(a));await page.locator('[data-primitive-b]').selectOption(String(b));await page.locator('[data-primitive-c]').fill(String(c));await waitState(kind,c,a,b);
   const y=baseValue(kind,a)+c;assert.equal(Number(await page.locator('[data-primitive-point]').getAttribute('cy')),200-16*y);assert.equal(Number(await page.locator('[data-primitive-target]').getAttribute('y')),200-16*b-6);
   assert.match(await page.locator('[data-primitive-status]').innerText(),new RegExp('Pendiente en '+a+': '+derivative(kind,a)));
   await page.locator('[data-primitive-fit]').click();await waitState(kind,b-baseValue(kind,a),a,b);assert.match(await page.locator('[data-primitive-status]').innerText(),/Condición cumplida/);
   const rows=await page.locator('[data-primitive-result] tbody tr').allTextContents();assert.equal(rows.length,3);
  }
  assert.ok(await quiz.locator('input[value="correct"]').isChecked());
  await page.locator('[data-primitive-others]').uncheck();await waitState('constant',-1,1,2,false);assert.equal(await page.locator('[data-primitive-curve="reference"]').count(),0);
  await page.locator('[data-primitive-c]').focus();await page.keyboard.press('Home');await waitState('constant',-6,1,2,false);await page.keyboard.press('End');await waitState('constant',6,1,2,false);
  await page.locator('[data-primitive-family]').selectOption('linear');await page.locator('[data-primitive-others]').check();await page.locator('[data-primitive-fit]').click();await waitState('linear',1,1,2);
  await page.getByText('Ampliación: por qué decimos «en un intervalo»',{exact:true}).click();await page.getByText('Ver solución razonada',{exact:true}).click();await ready();
  for(let i=0;i<6;i++){
   if(i===0){await quiz.locator('input[value="wrong-1"]').check();await quiz.getByRole('button',{name:'Comprobar',exact:true}).click();await quiz.locator('.feedback').filter({hasText:'Revisa'}).waitFor();await quiz.getByRole('button',{name:'Ver pista'}).click();await quiz.locator('.feedback').filter({hasText:'Pista:'}).waitFor();}
   await quiz.locator('input[value="correct"]').check();await quiz.getByRole('button',{name:'Comprobar',exact:true}).click();await quiz.getByRole('button',{name:/Siguiente pregunta|Ver resumen/}).waitFor();await ready();await quiz.getByRole('button',{name:/Siguiente pregunta|Ver resumen/}).click();
  }
  await quiz.getByText('5 de 6 respuestas correctas',{exact:false}).waitFor();
  const cards=page.locator('[data-flashcards]');for(let i=1;i<=6;i++){await cards.getByText('Tarjeta '+i+' de 6',{exact:true}).waitFor();await cards.getByRole('button',{name:'Mostrar respuesta'}).click();await ready();if(i<6)await cards.getByRole('button',{name:'Siguiente',exact:true}).click();}
  if(process.env.SCREENSHOT_DIR)await page.locator('#explorador').screenshot({path:process.env.SCREENSHOT_DIR+'/integral-indefinida-explorador.png'});
  await page.locator('[data-reading-controls]>summary').click();await page.locator('[data-text-size]').selectOption('200');await page.locator('[data-contrast-control]').check();await page.locator('[data-highlight-control]').check();await page.setViewportSize({width:320,height:844});await ready();
  const table=page.locator('[data-primitive-result] .table-scroll');await table.focus();await page.keyboard.press('ArrowRight');await page.waitForFunction(()=>document.querySelector('[data-primitive-result] .table-scroll').scrollLeft>0);
  if(process.env.SCREENSHOT_DIR)await page.locator('#explorador').screenshot({path:process.env.SCREENSHOT_DIR+'/integral-indefinida-movil.png'});
  await page.locator('[data-reset-reading]').click();await page.goto(base+'test/index.html?tema=t03');await ready();assert.match(await page.locator('[data-content-role="activity-progress"]').innerText(),/1 de 60/);assert.match(await page.locator('[data-scope-label]').innerText(),/Tema 3/);
  await page.goto(base+'tarjetas/index.html?tema=t03');await page.getByText('Tarjeta 1 de 48',{exact:true}).waitFor();await page.getByRole('button',{name:'Mostrar respuesta'}).click();await ready();
  await page.goto(base+'libro/temas/03-integrales/index.html');await page.waitForFunction(()=>document.querySelectorAll('[data-topic-index] li').length===8);const index=await page.locator('[data-topic-index]').innerText();assert.equal(index.match(/Disponible/g).length,8);assert.equal((index.match(/En preparación/g)||[]).length,0);
  const prefix=new URL('prueba-subcarpeta/',base).href;await page.route(prefix+'**',async route=>{const response=await route.fetch({url:route.request().url().replace(prefix,base)});await route.fulfill({response});});
  await page.goto(prefix+lesson);await page.locator('.primitive-figure > svg').waitFor();await ready();await page.locator('[data-primitive-fit]').click();await waitState('linear',1,1,2);
  await page.goto(prefix+'test/index.html?tema=t03');await ready();assert.match(await page.locator('[data-content-role="activity-progress"]').innerText(),/1 de 60/);
  assert.deepEqual(errors,[]);console.log('Aprobado: 27 ajustes iniciales, valores/pendientes, teclado y extremos C, respuesta conservada, test 5/6, seis tarjetas, móvil 200 %, tabla desplazable, filtros t03, índice 6/8, subcarpeta y LaTeX.');
 }finally{await browser.close();}
})().catch(e=>{console.error(e);process.exitCode=1;});

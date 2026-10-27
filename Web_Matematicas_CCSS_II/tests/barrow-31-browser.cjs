const assert=require('node:assert/strict');
const {chromium}=require('playwright');
const base=process.env.TEST_URL||'http://127.0.0.1:4173/';
const lesson='libro/temas/03-integrales/07-regla-de-barrow.html';
(async()=>{
 const browser=await chromium.launch({headless:true,executablePath:process.env.CHROME_PATH});
 try{
  const page=await browser.newPage({viewport:{width:1280,height:960}}),errors=[];
  page.on('pageerror',e=>errors.push(e.message));page.on('response',r=>{if(r.status()>=400&&!r.url().endsWith('favicon.ico'))errors.push(r.status()+' '+r.url());});
  const ready=async()=>{
   await page.waitForFunction(()=>document.querySelector('.math-status')?.hidden===true);
   assert.equal(await page.locator('[data-mml-node="merror"]').count(),0);
   assert.doesNotMatch(await page.locator('main').innerText(),/\\[\[(]/);
   assert.ok(await page.evaluate(()=>document.documentElement.scrollWidth<=innerWidth),'Desbordamiento de página');
  };
  const F={linear:x=>x*x+x,quadratic:x=>x**3/3-x,reciprocal:x=>Math.log(Math.abs(x))};
  const waitState=async(kind,a,b,c=0)=>{
   await page.waitForFunction(expected=>document.querySelector('[data-barrow-result]')?.dataset.selection===expected,[kind,a,b,c].join(':'));await ready();
   const result=page.locator('[data-barrow-result]'),data=await result.evaluate(el=>({...el.dataset}));
   const valid=kind!=='reciprocal'||a*b>0;
   assert.equal(data.valid,String(valid));
   if(valid){assert.ok(Math.abs(Number(data.value)-(F[kind](b)-F[kind](a)))<1e-9);assert.equal(await result.locator('tbody tr').count(),2);assert.ok(await result.locator('mjx-container').count()>=5);}
   else {assert.equal(data.value,undefined);assert.equal(await result.locator('table').count(),0);assert.match(await page.locator('[data-barrow-status]').innerText(),/No se calcula/);}
  };
  await page.goto(base+lesson);await waitState('linear',-1,2);
  const quiz=page.locator('[data-quiz]'),practice=page.locator('[data-barrow-practice]');
  await quiz.locator('input[value="correct"]').check();
  for(const kind of ['linear','quadratic','reciprocal'])for(const a of [-2,-1,0,1,2])for(const b of [-2,-1,0,1,2]){
   await page.locator('[data-barrow-family]').selectOption(kind);await page.locator('[data-barrow-a]').selectOption(String(a));await page.locator('[data-barrow-b]').selectOption(String(b));await waitState(kind,a,b);
  }
  assert.ok(await quiz.locator('input[value="correct"]').isChecked());
  await page.locator('[data-barrow-family]').selectOption('quadratic');await page.locator('[data-barrow-a]').selectOption('-1');await page.locator('[data-barrow-b]').selectOption('2');
  for(const c of [-3,0,3]){await page.locator('[data-barrow-c]').selectOption(String(c));await waitState('quadratic',-1,2,c);}
  await page.locator('[data-barrow-swap]').focus();await page.keyboard.press('Enter');await waitState('quadratic',2,-1,3);
  await page.locator('[data-barrow-swap]').click();await waitState('quadratic',-1,2,3);
  await page.locator('[data-barrow-a]').focus();await page.keyboard.press('Home');await page.keyboard.press('Enter');await waitState('quadratic',-2,2,3);
  for(const c of ['-3','0','3'])await page.locator('[data-barrow-c]').selectOption(c);await waitState('quadratic',-2,2,3);
  if(process.env.SCREENSHOT_DIR)await page.locator('#explorador').screenshot({path:process.env.SCREENSHOT_DIR+'/barrow-explorador.png'});
  await page.getByText('Ver solución razonada',{exact:true}).click();await page.getByText('Ampliación: por qué la compensación simétrica no basta',{exact:true}).click();await ready();
  const complete=async(root,wrong=false)=>{
   for(let i=0;i<6;i++){
    await root.getByRole('button',{name:'Comprobar',exact:true}).waitFor();await ready();
    if(i===0&&wrong){await root.locator('input[value="wrong-1"]').check();await root.getByRole('button',{name:'Comprobar',exact:true}).click();await root.locator('.feedback').filter({hasText:'Revisa'}).waitFor();await root.getByRole('button',{name:'Ver pista'}).click();await root.locator('.feedback').filter({hasText:'Pista:'}).waitFor();}
    await root.locator('input[value="correct"]').check();await root.getByRole('button',{name:'Comprobar',exact:true}).focus();await page.keyboard.press('Enter');await root.getByRole('button',{name:/Siguiente pregunta|Ver resumen/}).waitFor();await ready();
    assert.ok(await root.locator('mjx-container').count()>0);await root.getByRole('button',{name:/Siguiente pregunta|Ver resumen/}).click();
   }
   await root.getByText((wrong?'5':'6')+' de 6 respuestas correctas',{exact:false}).waitFor();
  };
  await complete(practice,true);await practice.getByRole('button',{name:'Empezar otra sesión'}).click();await complete(practice);await practice.getByRole('button',{name:'Empezar otra sesión'}).click();
  await complete(quiz,true);await quiz.getByRole('button',{name:'Empezar otra sesión'}).click();await quiz.locator('input[value="correct"]').check();
  const cards=page.locator('[data-flashcards]');
  for(let i=1;i<=6;i++){await cards.getByText('Tarjeta '+i+' de 6',{exact:true}).waitFor();await cards.getByRole('button',{name:'Mostrar respuesta'}).click();await ready();if(i!==5)assert.ok(await cards.locator('mjx-container').count()>0);if(i<6)await cards.getByRole('button',{name:'Siguiente',exact:true}).click();}
  await page.locator('[data-reading-controls]>summary').click();await page.locator('[data-text-size]').selectOption('200');await page.locator('[data-contrast-control]').check();await page.locator('[data-highlight-control]').check();
  await page.setViewportSize({width:320,height:844});await ready();assert.ok(await quiz.locator('input[value="correct"]').isChecked());
  assert.ok(await page.locator('[data-barrow-result] table').evaluate(el=>el.getBoundingClientRect().width>=32*parseFloat(getComputedStyle(document.documentElement).fontSize)));
  const table=page.locator('[data-barrow-result] .table-scroll');await table.focus();await page.keyboard.press('ArrowRight');await page.waitForFunction(()=>document.querySelector('[data-barrow-result] .table-scroll').scrollLeft>0);
  if(process.env.SCREENSHOT_DIR)await page.locator('#explorador').screenshot({path:process.env.SCREENSHOT_DIR+'/barrow-movil.png'});
  await page.locator('[data-barrow-family]').selectOption('reciprocal');await waitState('reciprocal',-2,2,3);await page.locator('[data-barrow-b]').selectOption('-1');await waitState('reciprocal',-2,-1,3);
  await page.locator('[data-reset-reading]').click();await page.reload();await waitState('linear',-1,2);assert.equal(await quiz.locator('input:checked').count(),0);assert.equal(await practice.locator('input:checked').count(),0);
  await page.goto(base+'test/index.html?tema=t03');await ready();assert.match(await page.locator('[data-content-role="activity-progress"]').innerText(),/1 de 60/);
  await page.goto(base+'tarjetas/index.html?tema=t03');await page.getByText('Tarjeta 1 de 48',{exact:true}).waitFor();
  await page.goto(base+'libro/temas/03-integrales/index.html');await page.waitForFunction(()=>document.querySelectorAll('[data-topic-index] li').length===8);
  const index=await page.locator('[data-topic-index]').innerText();assert.equal(index.match(/Disponible/g).length,8);assert.equal((index.match(/En preparación/g)||[]).length,0);
  const prefix=new URL('prueba-subcarpeta/',base).href;
  await page.route(prefix+'**',async route=>{const response=await route.fetch({url:route.request().url().replace(prefix,base)});await route.fulfill({response});});
  await page.goto(prefix+lesson);await waitState('linear',-1,2);await page.locator('[data-barrow-swap]').click();await waitState('linear',2,-1);
  assert.ok(await page.locator('#site-header a').count()>0);assert.ok(await page.locator('#site-footer').innerText());assert.deepEqual(errors,[]);
  console.log('Aprobado: 75 configuraciones, tres C, dominio inválido y recuperación, orientación, teclado, respuestas conservadas, dos sesiones procedurales, seis conceptos y tarjetas, móvil 320/200 %, t03 42/42, índice 7/8 y subcarpeta.');
 }finally{await browser.close();}
})().catch(e=>{console.error(e);process.exitCode=1;});

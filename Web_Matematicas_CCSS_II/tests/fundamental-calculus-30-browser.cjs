const assert=require('node:assert/strict');
const {chromium}=require('playwright');
const base=process.env.TEST_URL||'http://127.0.0.1:4173/';
const lesson='libro/temas/03-integrales/06-teorema-fundamental-del-calculo.html';
const close=(a,b)=>assert.ok(Math.abs(a-b)<1e-8,`${a} frente a ${b}`);
(async()=>{
 const browser=await chromium.launch({headless:true,executablePath:process.env.CHROME_PATH});
 try{
  const page=await browser.newPage({viewport:{width:1280,height:960}}),errors=[];
  page.on('pageerror',e=>errors.push(e.message));page.on('response',r=>{if(r.status()>=400&&!r.url().endsWith('favicon.ico'))errors.push(r.status()+' '+r.url());});
  const ready=async()=>{await page.waitForFunction(()=>document.querySelector('.math-status')?.hidden===true);assert.equal(await page.locator('[data-mml-node="merror"]').count(),0);assert.doesNotMatch(await page.locator('main').innerText(),/\\[\[(]/);assert.ok(await page.evaluate(()=>document.documentElement.scrollWidth<=innerWidth));};
  const P={line:t=>t*t/2-t,quadratic:t=>t*t*t/3-t,absolute:t=>t*Math.abs(t)/2,jump:t=>Math.abs(t)};
  const f={line:t=>t-1,quadratic:t=>t*t-1,absolute:t=>Math.abs(t),jump:t=>t<0?-1:1};
  const waitState=async(kind,a,x,h=.5,secants=true)=>{
   await page.waitForFunction(expected=>document.querySelector('[data-fundamental-result]')?.dataset.selection===expected,[kind,a,x,h,secants].join(':'));await ready();
   const data=await page.locator('[data-fundamental-result]').evaluate(el=>({...el.dataset}));
   close(Number(data.y),P[kind](x)-P[kind](a));close(Number(data.integrand),f[kind](x));close(Number(data.leftSlope),(P[kind](x)-P[kind](x-h))/h);close(Number(data.rightSlope),(P[kind](x+h)-P[kind](x))/h);
   if(kind==='jump'&&x===0){assert.equal(data.slope,'undefined');assert.equal(await page.locator('[data-fundamental-tangent]').count(),0);assert.match(await page.locator('[data-fundamental-status]').innerText(),/no existe/);}
   else {close(Number(data.slope),f[kind](x));assert.equal(await page.locator('[data-fundamental-tangent]').count(),1);}
   assert.equal(await page.locator('.fundamental-figure>svg').count(),2);assert.equal(await page.locator('[data-fundamental-secant]').count(),secants?2:0);assert.equal(await page.locator('[data-fundamental-hole]').count(),kind==='jump'?1:0);
   assert.ok(await page.locator('[data-fundamental-result] mjx-container').count()>=5);assert.equal(await page.locator('[data-fundamental-result] tbody tr').count(),3);
   close(Number(await page.locator('[data-fundamental-point="integrand"]').getAttribute('cy')),280-25*f[kind](x));close(Number(await page.locator('[data-fundamental-point="accumulation"]').getAttribute('cy')),215-20*(P[kind](x)-P[kind](a)));
  };
  await page.goto(base+lesson);await page.locator('.fundamental-figure>svg').first().waitFor();await waitState('line',0,2);
  const quiz=page.locator('[data-quiz]');await quiz.locator('input[value="correct"]').check();
  for(const kind of ['line','quadratic','absolute','jump'])for(const a of [-1,0,1])for(const x of [-1,0,1]){
   await page.locator('[data-fundamental-family]').selectOption(kind);await page.locator('[data-fundamental-a]').selectOption(String(a));await page.locator('[data-fundamental-x]').fill(String(x));await waitState(kind,a,x);assert.ok(await quiz.locator('input[value="correct"]').isChecked());
  }
  await page.locator('[data-fundamental-a]').selectOption('0');await page.locator('[data-fundamental-x]').fill('0');
  for(const kind of ['absolute','jump'])for(const h of [.5,.1,.01]){await page.locator('[data-fundamental-family]').selectOption(kind);await page.locator('[data-fundamental-h]').selectOption(String(h));await waitState(kind,0,0,h);}
  await page.locator('[data-fundamental-secants]').uncheck();await waitState('jump',0,0,.01,false);await page.locator('[data-fundamental-secants]').check();await waitState('jump',0,0,.01);
  await page.locator('[data-fundamental-x]').focus();await page.keyboard.press('Home');await waitState('jump',0,-2,.01);await page.keyboard.press('End');await waitState('jump',0,2,.01);
  // Último estado después de cambios rápidos y vuelta a un ejemplo continuo.
  for(const value of ['-1','1','0'])await page.locator('[data-fundamental-a]').selectOption(value);
  await page.locator('[data-fundamental-family]').selectOption('quadratic');await page.locator('[data-fundamental-x]').fill('1');await page.locator('[data-fundamental-h]').selectOption('0.5');await waitState('quadratic',0,1);
  if(process.env.SCREENSHOT_DIR)await page.locator('#explorador').screenshot({path:process.env.SCREENSHOT_DIR+'/teorema-fundamental-explorador.png'});
  for(const label of ['Una justificación mediante una cota','Una discontinuidad no siempre impide que A sea derivable','Ver solución razonada'])await page.getByText(label,{exact:true}).click();await ready();
  for(let i=0;i<6;i++){
   if(i===0){await quiz.locator('input[value="wrong-1"]').check();await quiz.getByRole('button',{name:'Comprobar',exact:true}).click();await quiz.locator('.feedback').filter({hasText:'Revisa'}).waitFor();await quiz.getByRole('button',{name:'Ver pista'}).click();await quiz.locator('.feedback').filter({hasText:'Pista:'}).waitFor();}
   await quiz.locator('input[value="correct"]').check();await quiz.getByRole('button',{name:'Comprobar',exact:true}).click();await quiz.getByRole('button',{name:/Siguiente pregunta|Ver resumen/}).waitFor();await ready();await quiz.getByRole('button',{name:/Siguiente pregunta|Ver resumen/}).click();
  }
  await quiz.getByText('5 de 6 respuestas correctas',{exact:false}).waitFor();await quiz.getByRole('button',{name:'Empezar otra sesión'}).click();await quiz.locator('input[value="correct"]').check();
  const cards=page.locator('[data-flashcards]');for(let i=1;i<=6;i++){await cards.getByText('Tarjeta '+i+' de 6',{exact:true}).waitFor();await cards.getByRole('button',{name:'Mostrar respuesta'}).click();await ready();assert.ok(await cards.locator('mjx-container').count()>0);if(i<6)await cards.getByRole('button',{name:'Siguiente',exact:true}).click();}
  await page.locator('[data-reading-controls]>summary').click();await page.locator('[data-text-size]').selectOption('200');await page.locator('[data-contrast-control]').check();await page.locator('[data-highlight-control]').check();await page.setViewportSize({width:320,height:844});await ready();assert.ok(await quiz.locator('input[value="correct"]').isChecked());
  await page.locator('[data-fundamental-result] .table-scroll').focus();await page.keyboard.press('ArrowRight');await page.waitForFunction(()=>document.querySelector('[data-fundamental-result] .table-scroll').scrollLeft>0);
  await page.locator('[data-fundamental-family]').selectOption('jump');await page.locator('[data-fundamental-x]').fill('0');await waitState('jump',0,0);
  if(process.env.SCREENSHOT_DIR)await page.locator('#explorador').screenshot({path:process.env.SCREENSHOT_DIR+'/teorema-fundamental-movil.png'});
  await page.locator('[data-reset-reading]').click();await page.reload();await waitState('line',0,2);assert.equal(await quiz.locator('input:checked').count(),0);
  await page.goto(base+'test/index.html?tema=t03');await ready();assert.match(await page.locator('[data-content-role="activity-progress"]').innerText(),/1 de 60/);
  await page.goto(base+'tarjetas/index.html?tema=t03');await page.getByText('Tarjeta 1 de 48',{exact:true}).waitFor();
  await page.goto(base+'libro/temas/03-integrales/index.html');await page.waitForFunction(()=>document.querySelectorAll('[data-topic-index] li').length===8);const index=await page.locator('[data-topic-index]').innerText();assert.equal(index.match(/Disponible/g).length,8);assert.equal((index.match(/En preparación/g)||[]).length,0);
  const prefix=new URL('prueba-subcarpeta/',base).href;await page.route(prefix+'**',async route=>{const response=await route.fetch({url:route.request().url().replace(prefix,base)});await route.fulfill({response});});
  await page.goto(prefix+lesson);await page.locator('.fundamental-figure>svg').first().waitFor();await waitState('line',0,2);await page.locator('[data-fundamental-a]').selectOption('1');await waitState('line',1,2);
  assert.ok(await page.locator('#site-header a').count()>0);assert.ok(await page.locator('#site-footer').innerText());assert.deepEqual(errors,[]);
  console.log('Aprobado: 36 estados, salto y continuidad, tres h, secantes/tangente y puntos, respuesta conservada, teclado, test 5/6 y reinicio, seis tarjetas, móvil 200 %, filtros t03 36/36, índice 6/8 y subcarpeta.');
 }finally{await browser.close();}
})().catch(e=>{console.error(e);process.exitCode=1;});

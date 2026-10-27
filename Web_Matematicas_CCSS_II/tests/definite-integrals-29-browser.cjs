const assert=require('node:assert/strict');
const {chromium}=require('playwright');
const base=process.env.TEST_URL||'http://127.0.0.1:4173/';
const lesson='libro/temas/03-integrales/05-integral-definida.html';
(async()=>{
 const browser=await chromium.launch({headless:true,executablePath:process.env.CHROME_PATH});
 try{
  const page=await browser.newPage({viewport:{width:1280,height:960}}),errors=[];
  page.on('pageerror',e=>errors.push(e.message));page.on('response',r=>{if(r.status()>=400&&!r.url().endsWith('favicon.ico'))errors.push(r.status()+' '+r.url());});
  const ready=async()=>{await page.waitForFunction(()=>document.querySelector('.math-status')?.hidden===true);assert.equal(await page.locator('[data-mml-node="merror"]').count(),0);assert.doesNotMatch(await page.locator('main').innerText(),/\\[\[(]/);assert.ok(await page.evaluate(()=>document.documentElement.scrollWidth<=innerWidth));};
  const F={constant:x=>2*x,line:x=>x*x/2-x,valley:x=>x*Math.abs(x)/2-x};
  const A={constant:x=>2*x,line:x=>(x-1)*Math.abs(x-1)/2,valley:x=>{const r=Math.abs(x);return Math.sign(x)*(r<=1?r-r*r/2:r*r/2-r+1);}};
  const waitState=async(kind,a,b,n=4,show=false)=>{
   await page.waitForFunction(expected=>document.querySelector('[data-definite-result]')?.dataset.selection===expected,[kind,a,b,n,show].join(':'));await ready();
   const data=await page.locator('[data-definite-result]').evaluate(el=>({...el.dataset}));
   assert.equal(Number(data.integral),F[kind](b)-F[kind](a));assert.equal(Number(data.area),A[kind](Math.max(a,b))-A[kind](Math.min(a,b)));assert.ok(Number(data.positive)>=0&&Number(data.negative)>=0);
   assert.ok(await page.locator('[data-definite-result] mjx-container').count()>=3);
   assert.equal(await page.locator('[data-definite-rectangle]').count(),show&&a!==b?n:0);
   assert.match(await page.locator('[data-definite-status]').innerText(),/Integral/);
   if(a===b){assert.equal(await page.locator('[data-definite-result] table').count(),0);assert.equal(await page.locator('[data-definite-region]').count(),0);}
   else assert.equal(Number(await page.locator('[data-definite-direction]').getAttribute('data-definite-direction')),Math.sign(b-a));
  };
  await page.goto(base+lesson);await page.locator('.definite-figure>svg').waitFor();await waitState('line',0,3);
  const quiz=page.locator('[data-quiz]');await quiz.locator('input[value="correct"]').check();
  for(const kind of ['constant','line','valley'])for(const a of [-3,0,3])for(const b of [-3,0,3]){
   await page.locator('[data-definite-family]').selectOption(kind);await page.locator('[data-definite-a]').selectOption(String(a));await page.locator('[data-definite-b]').selectOption(String(b));await waitState(kind,a,b);
   assert.ok(await quiz.locator('input[value="correct"]').isChecked());
  }
  await page.locator('[data-definite-a]').selectOption('-2');await page.locator('[data-definite-b]').selectOption('3');await page.locator('[data-definite-rectangles]').check();
  let previous=Infinity;
  for(const n of [4,8,16,32]){await page.locator('[data-definite-n]').selectOption(String(n));await waitState('valley',-2,3,n,true);const error=Number(await page.locator('[data-definite-result]').getAttribute('data-error'));assert.ok(error<=previous);previous=error;}
  assert.ok(Number(await page.locator('[data-definite-result]').getAttribute('data-error'))>0);
  await page.locator('[data-definite-swap]').focus();await page.keyboard.press('Enter');await waitState('valley',3,-2,32,true);assert.ok(await quiz.locator('input[value="correct"]').isChecked());
  // Cambios consecutivos: debe quedar procesado el último estado, con la respuesta conservada.
  for(const n of ['4','8','16','4'])await page.locator('[data-definite-n]').selectOption(n);
  await page.locator('[data-definite-swap]').click();await waitState('valley',-2,3,4,true);
  assert.equal(await page.locator('[data-definite-region="positive"]').count(),2);assert.equal(await page.locator('[data-definite-region="negative"]').count(),2);assert.equal(await page.locator('[data-definite-result] tbody tr').count(),4);
  await page.locator('[data-definite-rectangles]').uncheck();await waitState('valley',-2,3,4,false);await page.locator('[data-definite-rectangles]').check();await waitState('valley',-2,3,4,true);
  if(process.env.SCREENSHOT_DIR)await page.locator('#explorador').screenshot({path:process.env.SCREENSHOT_DIR+'/integral-definida-explorador.png'});
  await page.getByText('Ver solución razonada',{exact:true}).click();await ready();
  for(let i=0;i<6;i++){
   if(i===0){await quiz.locator('input[value="wrong-1"]').check();await quiz.getByRole('button',{name:'Comprobar',exact:true}).click();await quiz.locator('.feedback').filter({hasText:'Revisa'}).waitFor();await quiz.getByRole('button',{name:'Ver pista'}).click();await quiz.locator('.feedback').filter({hasText:'Pista:'}).waitFor();}
   await quiz.locator('input[value="correct"]').check();await quiz.getByRole('button',{name:'Comprobar',exact:true}).click();await quiz.getByRole('button',{name:/Siguiente pregunta|Ver resumen/}).waitFor();await ready();await quiz.getByRole('button',{name:/Siguiente pregunta|Ver resumen/}).click();
  }
  await quiz.getByText('5 de 6 respuestas correctas',{exact:false}).waitFor();await quiz.getByRole('button',{name:'Empezar otra sesión'}).click();await quiz.locator('input[value="correct"]').check();
  const cards=page.locator('[data-flashcards]');for(let i=1;i<=6;i++){await cards.getByText('Tarjeta '+i+' de 6',{exact:true}).waitFor();await cards.getByRole('button',{name:'Mostrar respuesta'}).click();await ready();assert.ok(await cards.locator('mjx-container').count()>0);if(i<6)await cards.getByRole('button',{name:'Siguiente',exact:true}).click();}
  await page.locator('[data-reading-controls]>summary').click();await page.locator('[data-text-size]').selectOption('200');await page.locator('[data-contrast-control]').check();await page.locator('[data-highlight-control]').check();await page.setViewportSize({width:320,height:844});await ready();assert.ok(await quiz.locator('input[value="correct"]').isChecked());
  await page.locator('[data-definite-result] .table-scroll').focus();await page.keyboard.press('ArrowRight');await page.waitForFunction(()=>document.querySelector('[data-definite-result] .table-scroll').scrollLeft>0);
  if(process.env.SCREENSHOT_DIR)await page.locator('#explorador').screenshot({path:process.env.SCREENSHOT_DIR+'/integral-definida-movil.png'});
  await page.locator('[data-reset-reading]').click();await page.reload();await waitState('line',0,3);assert.equal(await page.locator('main input:checked').count(),0);
  await page.goto(base+'test/index.html?tema=t03');await ready();assert.match(await page.locator('[data-content-role="activity-progress"]').innerText(),/1 de 60/);
  await page.goto(base+'tarjetas/index.html?tema=t03');await page.getByText('Tarjeta 1 de 48',{exact:true}).waitFor();
  await page.goto(base+'libro/temas/03-integrales/index.html');await page.waitForFunction(()=>document.querySelectorAll('[data-topic-index] li').length===8);const index=await page.locator('[data-topic-index]').innerText();assert.equal(index.match(/Disponible/g).length,8);assert.equal((index.match(/En preparación/g)||[]).length,0);
  const prefix=new URL('prueba-subcarpeta/',base).href;await page.route(prefix+'**',async route=>{const response=await route.fetch({url:route.request().url().replace(prefix,base)});await route.fulfill({response});});
  await page.goto(prefix+lesson);await page.locator('.definite-figure>svg').waitFor();await waitState('line',0,3);await page.locator('[data-definite-swap]').click();await waitState('line',3,0);
  assert.ok(await page.locator('#site-header a').count()>0);assert.ok(await page.locator('#site-footer').innerText());assert.deepEqual(errors,[]);
  console.log('Aprobado: 27 estados, orientación y extremos iguales, rectángulos 4/8/16/32, cambios rápidos, tabla/regiones, test 5/6 y reinicio, seis tarjetas, móvil 200 %, teclado, sin historial, filtros t03 36/36, índice 6/8 y subcarpeta.');
 }finally{await browser.close();}
})().catch(e=>{console.error(e);process.exitCode=1;});

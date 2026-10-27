const assert=require('node:assert/strict');
const {chromium}=require('playwright');
const base=process.env.TEST_URL||'http://127.0.0.1:4173/',lesson='libro/temas/03-integrales/08-aplicaciones-de-la-integral.html';
(async()=>{
 const browser=await chromium.launch({headless:true,executablePath:process.env.CHROME_PATH});
 try{
  const page=await browser.newPage({viewport:{width:1280,height:960}}),errors=[];
  page.on('pageerror',e=>errors.push(e.message));page.on('response',r=>{if(r.status()>=400&&!r.url().endsWith('favicon.ico'))errors.push(r.status()+' '+r.url());});
  const ready=async()=>{
   await page.waitForFunction(()=>document.querySelector('.math-status')?.hidden===true);assert.equal(await page.locator('[data-mml-node="merror"]').count(),0);
   assert.doesNotMatch(await page.locator('main').innerText(),/\\[\[(]/);assert.ok(await page.evaluate(()=>document.documentElement.scrollWidth<=innerWidth),'Desbordamiento global');
  };
  const funcs={cap:[x=>1-x*x,x=>0,[-1,1]],crossing:[x=>x*x,x=>x,[0,1]],below:[x=>x*x-2,x=>-1,[-1,1]],parallel:[x=>x+1,x=>x-1,[]]};
  const gauss=(f,a,b)=>{const m=(a+b)/2,h=(b-a)/2;return h*(f(m-h/Math.sqrt(3))+f(m+h/Math.sqrt(3)));};
  const waitState=async(kind,a,b,k=1,swap=false,show=true)=>{
   await page.waitForFunction(expected=>document.querySelector('[data-area-result]')?.dataset.selection===expected,[kind,a,b,k,swap,show].join(':'));await ready();
   const [f,g,roots]=funcs[kind],lo=Math.min(a,b),hi=Math.max(a,b),cuts=[lo,...roots.filter(x=>x>lo&&x<hi),hi],segments=lo===hi?0:cuts.length-1;
   let area=0;for(let i=0;i<segments;i++)area+=Math.abs(gauss(x=>k*(f(x)-g(x)),cuts[i],cuts[i+1]));
   const data=await page.locator('[data-area-result]').evaluate(el=>({...el.dataset}));
   assert.ok(Math.abs(Number(data.area)-area)<1e-8);assert.ok(Math.abs(Number(data.integral)-(swap?-1:1)*k*gauss(x=>f(x)-g(x),a,b))<1e-8);
   assert.equal(await page.locator('[data-area-region]').count(),show?segments:0);assert.equal(await page.locator('[data-area-result] tbody tr').count(),segments);
   assert.equal(await page.locator('[data-area-curve]').count(),2);assert.equal(await page.locator('.area-figure>svg').count(),1);
   assert.equal(await page.locator('[data-area-intersection]').count(),roots.filter(x=>x>=lo&&x<=hi).length);
   for(const el of await page.locator('[data-area-intersection]').all()){const x=Number(await el.getAttribute('data-area-intersection'));assert.equal(Number(await el.getAttribute('cx')),300+110*x);}
   assert.ok(await page.locator('[data-area-result] mjx-container').count()>=3);
   assert.doesNotMatch(await page.locator('.area-figure>svg').getAttribute('viewBox'),/NaN|Infinity/);
  };
  await page.goto(base+lesson);await waitState('crossing',-1,2);
  const quiz=page.locator('[data-quiz]'),practice=page.locator('[data-area-practice]');
  await quiz.locator('input[value="correct"]').check();
  for(const kind of Object.keys(funcs))for(const a of [-2,-1,0,1,2])for(const b of [-2,-1,0,1,2]){
   await page.locator('[data-area-family]').selectOption(kind);await page.locator('[data-area-a]').selectOption(String(a));await page.locator('[data-area-b]').selectOption(String(b));await waitState(kind,a,b);
  }
  await page.locator('[data-area-a]').selectOption('-1');await page.locator('[data-area-b]').selectOption('2');
  for(const kind of Object.keys(funcs))for(const k of [1,2,3])for(const swap of [false,true]){
   await page.locator('[data-area-family]').selectOption(kind);await page.locator('[data-area-k]').selectOption(String(k));await page.locator('[data-area-swap]').setChecked(swap);await waitState(kind,-1,2,k,swap);
  }
  await page.locator('[data-area-family]').selectOption('crossing');await page.locator('[data-area-k]').selectOption('1');await page.locator('[data-area-swap]').uncheck();await waitState('crossing',-1,2);
  await page.locator('[data-area-shading]').uncheck();await waitState('crossing',-1,2,1,false,false);await page.locator('[data-area-shading]').check();
  await page.locator('[data-area-reverse]').focus();await page.keyboard.press('Enter');await waitState('crossing',2,-1);await page.keyboard.press('Enter');await waitState('crossing',-1,2);
  await page.locator('[data-area-a]').focus();await page.keyboard.press('Home');await page.keyboard.press('Enter');await waitState('crossing',-2,2);
  for(const v of ['1','0','-1'])await page.locator('[data-area-a]').selectOption(v);await waitState('crossing',-1,2);
  assert.ok(await quiz.locator('input[value="correct"]').isChecked());
  if(process.env.SCREENSHOT_DIR)await page.locator('#explorador').screenshot({path:process.env.SCREENSHOT_DIR+'/areas-explorador.png'});
  await page.getByText('Ver solución razonada',{exact:true}).click();await ready();
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
  const cards=page.locator('[data-flashcards]');for(let i=1;i<=6;i++){await cards.getByText('Tarjeta '+i+' de 6',{exact:true}).waitFor();await cards.getByRole('button',{name:'Mostrar respuesta'}).click();await ready();assert.ok(await cards.locator('mjx-container').count()>0);if(i<6)await cards.getByRole('button',{name:'Siguiente',exact:true}).click();}
  await page.locator('[data-reading-controls]>summary').click();await page.locator('[data-text-size]').selectOption('200');await page.locator('[data-contrast-control]').check();await page.locator('[data-highlight-control]').check();await page.setViewportSize({width:320,height:844});await ready();
  assert.ok(await quiz.locator('input[value="correct"]').isChecked());assert.ok(await page.locator('[data-area-result] table').evaluate(el=>el.getBoundingClientRect().width>=32*parseFloat(getComputedStyle(document.documentElement).fontSize)));
  await page.locator('[data-area-result] .table-scroll').focus();await page.keyboard.press('ArrowRight');await page.waitForFunction(()=>document.querySelector('[data-area-result] .table-scroll').scrollLeft>0);
  if(process.env.SCREENSHOT_DIR)await page.locator('#explorador').screenshot({path:process.env.SCREENSHOT_DIR+'/areas-movil.png'});
  await page.locator('[data-reset-reading]').click();await page.reload();await waitState('crossing',-1,2);assert.equal(await quiz.locator('input:checked').count(),0);assert.equal(await practice.locator('input:checked').count(),0);
  await page.goto(base+'test/index.html?tema=t03');await ready();assert.match(await page.locator('[data-content-role="activity-progress"]').innerText(),/1 de 60/);
  await page.goto(base+'tarjetas/index.html?tema=t03');await page.getByText('Tarjeta 1 de 48',{exact:true}).waitFor();
  await page.goto(base+'libro/temas/03-integrales/index.html');await page.waitForFunction(()=>document.querySelectorAll('[data-topic-index] li').length===8);const index=await page.locator('[data-topic-index]').innerText();assert.equal(index.match(/Disponible/g).length,8);assert.equal((index.match(/En preparación/g)||[]).length,0);
  const prefix=new URL('prueba-subcarpeta/',base).href;
  await page.route(prefix+'**',async route=>{const response=await route.fetch({url:route.request().url().replace(prefix,base)});await route.fulfill({response});});
  await page.goto(prefix+lesson);await waitState('crossing',-1,2);await page.locator('[data-area-swap]').check();await waitState('crossing',-1,2,1,true);
  assert.ok(await page.locator('#site-header a').count()>0);assert.ok(await page.locator('#site-footer').innerText());assert.deepEqual(errors,[]);
  console.log('Aprobado: 100 configuraciones y 24 variantes de escala/orden, áreas, tramos, cortes, sombreado, inversión, teclado, dos sesiones procedurales, test 5/6, seis tarjetas, móvil 320/200 %, bancos 48/48, índice 8/8 y subcarpeta.');
 }finally{await browser.close();}
})().catch(e=>{console.error(e);process.exitCode=1;});

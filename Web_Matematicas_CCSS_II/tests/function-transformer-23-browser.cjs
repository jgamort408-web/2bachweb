const assert=require('node:assert/strict');
const {chromium}=require('playwright');
const base=process.env.TEST_URL||'http://127.0.0.1:4173/';
const widget='widgets/games/t02-b-transforma-la-funcion/';
const host='laboratorios/juegos/t02-b-transforma-la-funcion.html';
(async()=>{
 const browser=await chromium.launch({headless:true,...(process.env.CHROME_PATH?{executablePath:process.env.CHROME_PATH}:{})});
 try{
  const page=await browser.newPage({viewport:{width:1280,height:960}}),errors=[];
  page.on('pageerror',e=>errors.push(e.message));page.on('response',r=>{if(r.status()>=400&&!r.url().endsWith('favicon.ico'))errors.push(r.status()+' '+r.url());});
  const ready=async(frame=page)=>{await frame.locator('[data-check]:not(:disabled),[data-next]:visible').first().waitFor();await frame.waitForFunction(()=>document.querySelector('.math-status')?.hidden===true);assert.equal(await frame.locator('[data-mml-node="merror"]').count(),0);assert.ok(await frame.locator('[data-target] mjx-container').count()>=2);assert.equal(await frame.locator('[data-current] mjx-container').count(),1);assert.doesNotMatch(await frame.locator('main').innerText(),/\\[\[(]/);assert.ok(await frame.evaluate(()=>document.documentElement.scrollWidth<=innerWidth));};
  const state=async()=>JSON.parse(await page.locator('[data-game]').getAttribute('data-state'));
  const move=async(key,frame=page)=>{await frame.locator('[data-action="'+key+'"]:not(:disabled)').click();await ready(frame);};
  await page.goto(base+widget+'index.html');await ready();
  const seed=Number(await page.locator('[data-game]').getAttribute('data-seed'));
  const bank=await page.evaluate(async({base,widget,seed})=>(await import(base+widget+'model.js')).generateTransformSession(seed),{base,widget,seed});
  let total=0;
  for(let i=0;i<6;i++){
   await page.waitForFunction(i=>Number(document.querySelector('[data-game]').dataset.round)===i,i);await ready();
   if(i===0){
    await page.locator('[data-check]').click();await page.getByText('Todavía no coincide.',{exact:false}).waitFor();await ready();
    await page.locator('[data-hint]').click();await page.getByText('Pista:',{exact:false}).waitFor();await ready();
    await move('up');await move('vDouble');assert.equal((await state()).k,2);
    await page.locator('[data-reset]').click();await ready();assert.equal(await page.locator('[data-game]').getAttribute('data-moves'),'3');
    // f(-x-1)=f(x) para esta base: una ruta extra equivalente debe ser aceptada.
    await move('flipY');await move('left');
   }
   if(i===1){await page.locator('[data-solution]').click();await page.locator('[data-next]:visible').waitFor();await ready();assert.match(await page.locator('[data-feedback]').innerText(),/0 puntos/);}
   else{
    for(const action of bank[i].route){await page.locator('[data-action="'+action+'"]:not(:disabled)').focus();await page.keyboard.press('Enter');await ready();}
    if(i===0){assert.notDeepEqual(await state(),bank[i].target);}
    await page.locator('[data-original]').check();assert.ok(await page.locator('[data-curve="original"]').count()>0);
    if(i===2&&process.env.SCREENSHOT_DIR)await page.locator('[data-game]').screenshot({path:process.env.SCREENSHOT_DIR+'/transforma-funcion-escritorio.png'});
    await page.locator('[data-check]').click();await page.locator('[data-next]:visible').waitFor();await ready();await page.getByText('Correcto: las funciones coinciden',{exact:false}).waitFor();
    total+=Math.max(10,100-5*(bank[i].route.length+(i===0?5:0)));
   }
   assert.ok(await page.locator('[data-action="up"]').isDisabled());
   await page.locator('[data-check]').dispatchEvent('click');await page.locator('[data-next]').click();
  }
  await page.locator('[data-game][data-phase="summary"]').waitFor();await ready();assert.match(await page.locator('[data-feedback]').innerText(),new RegExp(total+' puntos\\. 5 de 6'));
  await page.locator('[data-next]').click();await ready();assert.notEqual(Number(await page.locator('[data-game]').getAttribute('data-seed')),seed);
  await move('vDouble');await move('vDouble');await move('vDouble');assert.equal((await state()).a,4);assert.equal(await page.locator('[data-game]').getAttribute('data-moves'),'2');await page.getByText('supera los límites',{exact:false}).waitFor();
  await page.getByText('Descripción textual y punto de referencia',{exact:true}).click();
  await page.locator('[data-reading-controls]>summary').click();await page.locator('[data-text-size]').selectOption('200');await page.locator('[data-contrast-control]').check();await page.locator('[data-highlight-control]').check();await page.setViewportSize({width:320,height:844});await ready();assert.equal((await state()).a,4);
  if(process.env.SCREENSHOT_DIR)await page.locator('[data-figure]').screenshot({path:process.env.SCREENSHOT_DIR+'/transforma-funcion-movil.png'});
  await page.locator('[data-reset-reading]').click();await page.goto(base+host);await page.locator('iframe').scrollIntoViewIfNeeded();await page.waitForFunction(()=>document.querySelector('iframe')?.contentDocument?.querySelector('[data-action]'));
  let frame=page.frames().find(f=>f.url().includes(widget));assert.ok(frame);await ready(frame);await move('up',frame);
  await page.locator('[data-reading-controls]>summary').click();await page.locator('[data-text-size]').selectOption('200');await page.locator('[data-contrast-control]').check();await frame.waitForFunction(()=>document.documentElement.dataset.largeText==='true'&&document.documentElement.dataset.contrast==='true');await ready(frame);assert.equal(JSON.parse(await frame.locator('[data-game]').getAttribute('data-state')).k,1);assert.ok(await page.evaluate(()=>document.documentElement.scrollWidth<=innerWidth));
  await page.locator('[data-reset-reading]').click();const prefix=new URL('prueba-subcarpeta/',base).href;
  await page.route(prefix+'**',async route=>{const response=await route.fetch({url:route.request().url().replace(prefix,base)});await route.fulfill({response});});
  await page.goto(prefix+host);await page.locator('iframe').scrollIntoViewIfNeeded();await page.waitForFunction(()=>document.querySelector('iframe')?.contentDocument?.querySelector('[data-action]'));
  frame=page.frames().find(f=>f.url().startsWith(prefix+widget));assert.ok(frame);await ready(frame);await move('hDouble',frame);await frame.locator('[data-solution]').click();await frame.locator('[data-next]:visible').waitFor();await ready(frame);
  assert.deepEqual(errors,[]);console.log('Aprobado: seis retos, composición real, ruta equivalente con parámetros distintos, solución a cero, puntuación exacta y bloqueo, reinicio, límites, teclado, original, móvil 320 px al 200 %, preferencias en iframe, subcarpeta y LaTeX.');
 }finally{await browser.close();}
})().catch(e=>{console.error(e);process.exitCode=1;});

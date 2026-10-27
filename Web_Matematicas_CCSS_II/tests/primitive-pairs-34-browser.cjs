const assert=require('node:assert/strict'),{chromium}=require('playwright');
const base=process.env.TEST_URL||'http://127.0.0.1:4173/',widget='widgets/games/t03-a-parejas-de-primitivas/',host='laboratorios/juegos/t03-a-parejas-de-primitivas.html';
(async()=>{
 const browser=await chromium.launch({headless:true,executablePath:process.env.CHROME_PATH});
 try{
  const page=await browser.newPage({viewport:{width:1280,height:960}}),errors=[];
  page.on('pageerror',e=>errors.push(e.message));page.on('response',r=>{if(r.status()>=400&&!r.url().endsWith('favicon.ico'))errors.push(r.status()+' '+r.url());});
  const ready=async(frame=page)=>{await frame.locator('[data-check]:not(:disabled)').waitFor();await frame.waitForFunction(()=>document.querySelector('.math-status')?.hidden===true);assert.equal(await frame.locator('[data-mml-node="merror"]').count(),0);assert.doesNotMatch(await frame.locator('main').innerText(),/\\[\[(]/);assert.ok(await frame.evaluate(()=>document.documentElement.scrollWidth<=innerWidth));};
  const choose=async(frame,t,o)=>{await frame.locator('[name="target"][value="'+t+'"]').check();await ready(frame);await frame.locator('[name="primitive"][value="'+o+'"]').check();await ready(frame);};
  const submit=async(frame)=>{await frame.locator('[data-check]').focus();await frame.locator('[data-check]').press('Enter');};
  await page.goto(base+widget+'index.html');await ready();
  assert.equal(await page.locator('[name="target"]').count(),5);assert.equal(await page.locator('[name="primitive"]').count(),7);assert.ok(await page.locator('[data-board] mjx-container').count()===12);
  if(process.env.SCREENSHOT_DIR)await page.locator('[data-game]').screenshot({path:process.env.SCREENSHOT_DIR+'/parejas-primitivas-escritorio.png'});
  let previousSeed;
  for(let run=0;run<2;run++){
   const seed=await page.locator('[data-game]').getAttribute('data-seed');assert.notEqual(seed,previousSeed);previousSeed=seed;
   if(run===0){
    await page.locator('[data-hint]').click();await page.locator('[data-feedback]').filter({hasText:'Selecciona primero'}).waitFor();
    await page.locator('[data-check]').click();await page.locator('[data-feedback]').filter({hasText:'Selecciona un integrando y una opción'}).waitFor();
   }
   for(let b=0;b<2;b++){
    await page.waitForFunction(b=>Number(document.querySelector('[data-game]').dataset.board)===b,b);await ready();
    for(let t=0;t<5;t++){
     const id='b'+b+'-t'+t;
     if(run===0&&b===0&&t===0){
      await choose(page,id,'b0-particular');await page.locator('[data-hint]').click();await page.locator('[data-feedback]').filter({hasText:'Pista:'}).waitFor();await page.locator('[data-hint]').click();await ready();
      await submit(page);await page.locator('[data-feedback]').filter({hasText:'primitiva particular'}).waitFor();await ready();assert.equal(await page.locator('[data-game]').getAttribute('data-score'),'0');
     }
     if(run===0&&b===0&&t===1){
      await choose(page,id,'b0-factor');await submit(page);await page.locator('[data-feedback]').filter({hasText:'Puedes volver'}).waitFor();await ready();await submit(page);
     }else {await choose(page,id,id+'-family');await submit(page);}
     await page.waitForFunction(id=>document.querySelector('[name="target"][value="'+id+'"]')?.disabled,id);
     // Espere al final del render, no solo a que se haya creado el radio deshabilitado.
     await page.waitForFunction(()=>[...document.querySelectorAll('[data-board] fieldset')].every(f=>!f.disabled));
     assert.ok(await page.locator('[name="primitive"][value="'+id+'-family"]').isDisabled());
     const score=await page.locator('[data-game]').getAttribute('data-score');await page.locator('[data-check]').dispatchEvent('click');assert.equal(await page.locator('[data-game]').getAttribute('data-score'),score);
    }
    await page.locator('[data-next]:visible').click();
   }
   await page.locator('[data-game][data-phase="summary"]').waitFor();await page.waitForFunction(()=>document.querySelector('.math-status')?.hidden===true);
   assert.match(await page.locator('[data-feedback]').innerText(),run===0?/950 de 1200 puntos\. 8 de 10/:/1200 de 1200 puntos\. 10 de 10/);
   assert.match(await page.locator('[data-feedback]').innerText(),run===0?/Pistas utilizadas en 1 pareja/:/Pistas utilizadas en 0 parejas/);
   assert.equal(await page.locator('[data-feedback] li').count(),10);assert.equal(await page.locator('[data-feedback] mjx-container').count(),10);
   await page.locator('[data-next]').click();await ready();
  }
  await choose(page,'b0-t0','b0-t0-family');await page.locator('[data-reading-controls]>summary').click();await page.locator('[data-text-size]').selectOption('200');await page.locator('[data-contrast-control]').check();await page.locator('[data-highlight-control]').check();await page.setViewportSize({width:320,height:844});await ready();
  assert.ok(await page.locator('[name="target"][value="b0-t0"]').isChecked());assert.ok(await page.locator('[name="primitive"][value="b0-t0-family"]').isChecked());
  if(process.env.SCREENSHOT_DIR)await page.locator('[data-board] fieldset').first().screenshot({path:process.env.SCREENSHOT_DIR+'/parejas-primitivas-movil.png'});
  await page.locator('[data-reset-reading]').click();await page.reload();await ready();assert.equal(await page.locator('[data-game]').getAttribute('data-score'),'0');assert.equal(await page.locator('input:checked').count(),0);
  await page.goto(base+host);await page.locator('iframe').scrollIntoViewIfNeeded();await page.waitForFunction(()=>document.querySelector('iframe')?.contentDocument?.querySelector('[name="target"]'));
  let frame=page.frames().find(f=>f.url().includes(widget));assert.ok(frame);await ready(frame);await choose(frame,'b0-t0','b0-t0-family');
  await page.locator('[data-reading-controls]>summary').click();await page.locator('[data-text-size]').selectOption('200');await page.locator('[data-contrast-control]').check();await frame.waitForFunction(()=>document.documentElement.dataset.largeText==='true'&&document.documentElement.dataset.contrast==='true');await ready(frame);
  assert.ok(await frame.locator('[name="primitive"][value="b0-t0-family"]').isChecked());await submit(frame);await frame.waitForFunction(()=>document.querySelector('[data-game]').dataset.score==='100');
  await page.locator('[data-reset-reading]').click();
  const prefix=new URL('prueba-subcarpeta/',base).href;await page.route(prefix+'**',async route=>{const response=await route.fetch({url:route.request().url().replace(prefix,base)});await route.fulfill({response});});
  await page.goto(prefix+host);await page.locator('iframe').scrollIntoViewIfNeeded();await page.waitForFunction(()=>document.querySelector('iframe')?.contentDocument?.querySelector('[name="target"]'));
  frame=page.frames().find(f=>f.url().startsWith(prefix+widget));assert.ok(frame);await ready(frame);await choose(frame,'b0-t0','b0-t0-family');await submit(frame);await frame.waitForFunction(()=>document.querySelector('[data-game]').dataset.score==='100');
  await page.goto(base+'libro/temas/03-integrales/index.html#ruta-juegos');await page.locator('#ruta-juegos a[href$="t03-a-parejas-de-primitivas.html"]').click();assert.equal(page.url(),base+host);
  assert.deepEqual(errors,[]);
  console.log('Aprobado: dos sesiones de diez parejas, particular sin C, pistas, reintento, dos errores, 950/1200 y 1200/1200, bloqueo, resumen de diez soluciones, teclado, móvil 320/200 %, preferencias, recarga, iframe, subcarpeta y ruta del tema.');
 }finally{await browser.close();}
})().catch(e=>{console.error(e);process.exitCode=1;});

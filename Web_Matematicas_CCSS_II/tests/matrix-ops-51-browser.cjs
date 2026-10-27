
const assert=require('node:assert/strict'),{chromium}=require('playwright');
const base=process.env.TEST_URL||'http://127.0.0.1:4173/',widget='widgets/games/t04-a-matrix-ops/',host='laboratorios/juegos/t04-a-matrix-ops.html';
(async()=>{
 const browser=await chromium.launch({headless:true,executablePath:process.env.CHROME_PATH});
 try{
 const page=await browser.newPage({viewport:{width:1280,height:960}}),errors=[];
 page.on('pageerror',e=>errors.push(e.message));page.on('response',r=>{if(r.status()>=400&&!r.url().endsWith('favicon.ico'))errors.push(r.status()+' '+r.url());});
 const math=async(f=page)=>{await f.waitForFunction(()=>document.querySelector('.math-status')?.hidden===true);assert.equal(await f.locator('[data-mml-node="merror"]').count(),0);assert.doesNotMatch(await f.locator('main').innerText(),/\\[\[(]/);assert.ok(await f.evaluate(()=>document.documentElement.scrollWidth<=innerWidth));};
 const ready=async(f=page)=>{await f.locator('[data-check]:not(:disabled)').waitFor();await math(f);};
 const choose=async(id,f=page)=>{await f.locator('[name="answer"][value="'+id+'"]').focus();await f.locator('[name="answer"][value="'+id+'"]').press('Space');await f.locator('[data-check]').press('Enter');};
 const done=async(f=page)=>{await f.locator('[data-game][data-phase="resolved"]').waitFor();await f.locator('[data-next]:not(:disabled)').waitFor();await math(f);assert.ok(await f.locator('[data-check]').isDisabled());};
 await page.goto(base+widget+'index.html');await ready();
 await page.locator('[data-check]').click();await page.locator('[data-feedback]').filter({hasText:'Selecciona una opción'}).waitFor();
 let oldSeed,shot=false;
 for(let run=0;run<2;run++){
  const seed=await page.locator('[data-game]').getAttribute('data-seed');assert.notEqual(seed,oldSeed);oldSeed=seed;
  for(let i=0;i<8;i++)for(let stage=0;stage<2;stage++){
   await ready();assert.equal(await page.locator('[data-game]').getAttribute('data-index'),String(i));assert.equal(await page.locator('[data-game]').getAttribute('data-stage'),String(stage));assert.equal(await page.locator('[name="answer"]').count(),4);
   if(!shot&&stage===1&&await page.locator('[data-choices] mjx-container').count()===4){if(process.env.SCREENSHOT_DIR)await page.locator('[data-game]').screenshot({path:process.env.SCREENSHOT_DIR+'/matrix-ops-escritorio.png'});shot=true;}
   if(run===0&&i===0&&stage===0){await page.locator('[data-hint]').click();await ready();await page.locator('[data-hint]').click();await ready();await choose('wrong-1');await ready();}
   if(run===0&&i===0&&stage===1){await choose('wrong-1');await ready();await choose('wrong-2');}
   else {if(run===0&&i===1&&stage===0){await choose('wrong-1');await ready();}await choose('correct');}
   await done();assert.match(await page.locator('[data-feedback]').innerText(),/Solución:/);
   const score=await page.locator('[data-game]').getAttribute('data-score');await page.locator('[data-check]').dispatchEvent('click');assert.equal(await page.locator('[data-game]').getAttribute('data-score'),score);
   await page.locator('[data-next]').click();
  }
  await page.locator('[data-game][data-phase="summary"]').waitFor();await page.locator('[data-next]:not(:disabled)').waitFor();await math();
  assert.match(await page.locator('[data-feedback]').innerText(),run===0?/1400 de 1600 puntos. 13 de 16/:/1600 de 1600 puntos. 16 de 16/);
  assert.match(await page.locator('[data-feedback]').innerText(),run===0?/Pistas utilizadas: 1/:/Pistas utilizadas: 0/);
  assert.equal(await page.locator('[data-meter]').getAttribute('max'),'16');assert.equal(await page.locator('[data-meter]').evaluate(e=>e.value),16);
  for(const details of await page.locator('[data-feedback] details').all()){await details.locator('summary').click();await math();}
  assert.equal(await page.locator('[data-feedback] details').count(),8);
  await page.locator('[data-next]').click();await ready();
 }
 // Texto ampliado conserva respuesta; revisar al menos una fase con matrices.
 await choose('correct');await done();await page.locator('[data-next]').click();await ready();
 await page.locator('[name="answer"][value="correct"]').check();
 await page.locator('[data-reading-controls]>summary').click();await page.locator('[data-text-size]').selectOption('200');await page.locator('[data-contrast-control]').check();await page.locator('[data-highlight-control]').check();await page.setViewportSize({width:320,height:844});await ready();assert.ok(await page.locator('[name="answer"][value="correct"]').isChecked());
 if(process.env.SCREENSHOT_DIR)await page.locator('[data-game]').screenshot({path:process.env.SCREENSHOT_DIR+'/matrix-ops-movil.png'});
 await page.reload();await ready();assert.equal(await page.locator('[data-game]').getAttribute('data-score'),'0');assert.equal(await page.locator('[name="answer"]:checked').count(),0);await page.locator('[data-reading-controls]>summary').click();await page.locator('[data-reset-reading]').click();
 for(const subfolder of [false,true]){
  const prefix=subfolder?new URL('prueba-subcarpeta/',base).href:base;
  if(subfolder)await page.route(prefix+'**',async route=>{const response=await route.fetch({url:route.request().url().replace(prefix,base)});await route.fulfill({response});});
  await page.goto(prefix+host);await page.locator('iframe').scrollIntoViewIfNeeded();await page.waitForFunction(()=>document.querySelector('iframe')?.contentDocument?.querySelector('[name="answer"]'));
  const frame=page.frames().find(f=>f.url().startsWith(prefix+widget));assert.ok(frame);await ready(frame);
  await frame.locator('[name="answer"][value="correct"]').check();await page.locator('[data-reading-controls]>summary').click();await page.locator('[data-text-size]').selectOption('200');await page.locator('[data-contrast-control]').check();
  await frame.waitForFunction(()=>document.documentElement.dataset.largeText==='true'&&document.documentElement.dataset.contrast==='true');
  assert.ok(await frame.locator('[name="answer"][value="correct"]').isChecked());await choose('correct',frame);await done(frame);await frame.locator('[data-next]').click();await ready(frame);await choose('correct',frame);await done(frame);assert.equal(await frame.locator('[data-game]').getAttribute('data-score'),'200');
  await page.waitForFunction(()=>parseFloat(document.querySelector('iframe').style.height)>120);await page.locator('[data-reset-reading]').click();
  assert.ok(await page.locator('#site-header a').count()>0);assert.ok(await page.locator('#site-footer').innerText());
 }
 await page.goto(base+'libro/temas/04-matrices-y-determinantes/index.html');await page.getByRole('link',{name:'Matrix Ops',exact:true}).click();assert.equal(page.url(),base+host);
 await page.goto(base+'laboratorios/index.html');await page.getByRole('link',{name:'Matrix Ops',exact:true}).click();assert.equal(page.url(),base+host);assert.deepEqual(errors,[]);
 console.log('Aprobado: dos sesiones/32 decisiones, 1400 y 1600 puntos, pistas, bloqueo de doble puntuación, ocho soluciones, teclado, fórmulas, móvil 320/200 %, recarga, iframe, preferencias, subcarpeta y navegación.');
 }finally{await browser.close();}
})().catch(e=>{console.error(e);process.exitCode=1;});

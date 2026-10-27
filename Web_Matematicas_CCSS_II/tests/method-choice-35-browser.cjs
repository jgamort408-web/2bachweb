const assert=require('node:assert/strict'),{chromium}=require('playwright');
const base=process.env.TEST_URL||'http://127.0.0.1:4173/',widget='widgets/games/t03-b-metodo-correcto/',host='laboratorios/juegos/t03-b-metodo-correcto.html';
(async()=>{
 const browser=await chromium.launch({headless:true,executablePath:process.env.CHROME_PATH});
 try{
  const page=await browser.newPage({viewport:{width:1280,height:960}}),errors=[];
  page.on('pageerror',e=>errors.push(e.message));page.on('response',r=>{if(r.status()>=400&&!r.url().endsWith('favicon.ico'))errors.push(r.status()+' '+r.url());});
  const math=async(f=page)=>{await f.waitForFunction(()=>document.querySelector('.math-status')?.hidden===true);assert.equal(await f.locator('[data-mml-node="merror"]').count(),0);assert.doesNotMatch(await f.locator('main').innerText(),/\\[\[(]/);assert.ok(await f.evaluate(()=>document.documentElement.scrollWidth<=innerWidth));};
  const ready=async(f=page)=>{await f.locator('[data-check]:not(:disabled)').waitFor();await math(f);};
  const choose=async(id,f=page)=>{await f.locator('[name="answer"][value="'+id+'"]').focus();await f.locator('[name="answer"][value="'+id+'"]').press('Space');await f.locator('[data-check]').press('Enter');};
  const done=async(phase,f=page)=>{await f.locator('[data-game][data-phase="'+phase+'-done"]').waitFor();await f.locator('[data-next]:not(:disabled)').waitFor();await math(f);assert.ok(await f.locator('[data-check]').isDisabled());};
  const rows=async(f=page)=>f.evaluate(async()=>{const m=await import('./generator.js');return m.generateMethods(Number(document.querySelector('[data-game]').dataset.seed)).map(r=>({id:r.id,method:r.method}));});
  await page.goto(base+widget+'index.html');await ready();
  assert.equal(await page.locator('[name="answer"]').count(),4);assert.equal(await page.locator('[data-choices] mjx-container').count(),0);
  await page.locator('[data-check]').click();await page.locator('[data-feedback]').filter({hasText:'Selecciona una opción'}).waitFor();
  if(process.env.SCREENSHOT_DIR)await page.locator('[data-game]').screenshot({path:process.env.SCREENSHOT_DIR+'/metodo-correcto-estrategia.png'});
  let oldSeed;
  for(let run=0;run<2;run++){
   const seed=await page.locator('[data-game]').getAttribute('data-seed');assert.notEqual(seed,oldSeed);oldSeed=seed;
   const challenges=await rows();
   for(let i=0;i<8;i++){
    await ready();assert.equal(await page.locator('[data-game]').getAttribute('data-index'),String(i));
    if(run===0&&i===0){
     await page.locator('[data-hint]').click();await ready();await page.locator('[data-hint]').click();await ready();
     await choose(['immediate','chain','simplify','parts'].find(m=>m!==challenges[i].method));await ready();assert.match(await page.locator('[data-feedback]').innerText(),/otros procedimientos válidos/);
    }
    await choose(challenges[i].method);await done('method');
    const score=await page.locator('[data-game]').getAttribute('data-score');await page.locator('[data-check]').dispatchEvent('click');assert.equal(await page.locator('[data-game]').getAttribute('data-score'),score);
    await page.locator('[data-next]').click();await ready();assert.equal(await page.locator('[data-game]').getAttribute('data-phase'),'primitive');assert.equal(await page.locator('[data-choices] mjx-container').count(),4);
    if(run===0&&i===0){
     if(process.env.SCREENSHOT_DIR)await page.locator('[data-game]').screenshot({path:process.env.SCREENSHOT_DIR+'/metodo-correcto-primitiva.png'});
     await choose('double');await ready();assert.match(await page.locator('[data-feedback]').innerText(),/2f\(x\)/);await choose('negative');
    }else{
     if(run===0&&i===1){await choose('particular');await ready();assert.match(await page.locator('[data-feedback]').innerText(),/primitiva particular válida/);}
     await choose('family');
    }
    await done('primitive');assert.match(await page.locator('[data-feedback]').innerText(),/Comprobación/);await page.locator('[data-next]').click();
   }
   await page.locator('[data-game][data-phase="summary"]').waitFor();await page.locator('[data-next]:not(:disabled)').waitFor();await math();
   assert.match(await page.locator('[data-feedback]').innerText(),run===0?/1400 de 1600 puntos\. 13 de 16/:/1600 de 1600 puntos\. 16 de 16/);
   assert.match(await page.locator('[data-feedback]').innerText(),run===0?/Pistas utilizadas: 1/:/Pistas utilizadas: 0/);assert.equal(await page.locator('[data-feedback] li').count(),8);
   await page.locator('[data-next]').click();await ready();
  }
  await page.locator('[name="answer"][value="chain"]').check();await page.locator('[data-reading-controls]>summary').click();await page.locator('[data-text-size]').selectOption('200');await page.locator('[data-contrast-control]').check();await page.locator('[data-highlight-control]').check();await page.setViewportSize({width:320,height:844});await ready();assert.ok(await page.locator('[name="answer"][value="chain"]').isChecked());
  if(process.env.SCREENSHOT_DIR)await page.locator('[data-game]').screenshot({path:process.env.SCREENSHOT_DIR+'/metodo-correcto-movil.png'});
  await page.reload();await ready();assert.equal(await page.locator('[data-game]').getAttribute('data-score'),'0');assert.equal(await page.locator('[name="answer"]:checked').count(),0);await page.locator('[data-reading-controls]>summary').click();await page.locator('[data-reset-reading]').click();
  for(const subfolder of [false,true]){
   const prefix=subfolder?new URL('prueba-subcarpeta/',base).href:base;
   if(subfolder)await page.route(prefix+'**',async route=>{const response=await route.fetch({url:route.request().url().replace(prefix,base)});await route.fulfill({response});});
   await page.goto(prefix+host);await page.locator('iframe').scrollIntoViewIfNeeded();await page.waitForFunction(()=>document.querySelector('iframe')?.contentDocument?.querySelector('[name="answer"]'));
   const frame=page.frames().find(f=>f.url().startsWith(prefix+widget));assert.ok(frame);await ready(frame);
   const answer=(await rows(frame))[0].method;await frame.locator('[name="answer"][value="'+answer+'"]').check();
   await page.locator('[data-reading-controls]>summary').click();await page.locator('[data-text-size]').selectOption('200');await page.locator('[data-contrast-control]').check();await frame.waitForFunction(()=>document.documentElement.dataset.largeText==='true'&&document.documentElement.dataset.contrast==='true');assert.ok(await frame.locator('[name="answer"][value="'+answer+'"]').isChecked());
   await choose(answer,frame);await done('method',frame);assert.equal(await frame.locator('[data-game]').getAttribute('data-score'),'100');await frame.locator('[data-next]').click();await ready(frame);await choose('family',frame);await done('primitive',frame);assert.equal(await frame.locator('[data-game]').getAttribute('data-score'),'200');await page.locator('[data-reset-reading]').click();
  }
  await page.goto(base+'libro/temas/03-integrales/index.html#ruta-juegos');await page.locator('#ruta-juegos a[href$="t03-b-metodo-correcto.html"]').click();assert.equal(page.url(),base+host);assert.deepEqual(errors,[]);
  console.log('Aprobado: 2 sesiones, 32 decisiones, bloqueo entre fases, 1400/1600 y 1600/1600, pistas, soluciones, teclado, móvil 320/200 %, recarga, iframe, subcarpeta y navegación.');
 }finally{await browser.close();}
})().catch(e=>{console.error(e);process.exitCode=1;});

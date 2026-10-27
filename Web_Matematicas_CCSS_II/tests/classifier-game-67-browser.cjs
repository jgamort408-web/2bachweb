const assert=require('node:assert/strict'),{chromium}=require('playwright');
const base=process.env.TEST_URL||'http://127.0.0.1:4173/',widget='widgets/games/t05-a-clasificador-de-sistemas/',host='laboratorios/juegos/t05-a-clasificador-de-sistemas.html';
(async()=>{
 const browser=await chromium.launch({headless:true,executablePath:process.env.CHROME_PATH});
 try{
 const page=await browser.newPage({viewport:{width:1280,height:960}}),errors=[];
 page.on('pageerror',e=>errors.push(e.message));page.on('response',r=>{if(r.status()>=400&&!r.url().endsWith('favicon.ico'))errors.push(r.status()+' '+r.url());});
 const math=async(f=page)=>{await f.waitForFunction(()=>document.querySelector('.math-status')?.hidden===true);assert.equal(await f.locator('[data-mml-node="merror"]').count(),0);assert.doesNotMatch(await f.locator('main').innerText(),/\\[\[(]/);assert.ok(await f.evaluate(()=>document.documentElement.scrollWidth<=innerWidth));};
 const ready=async(f=page)=>{await f.locator('[data-check]:not(:disabled)').waitFor();await math(f);};
 const challenge=async(f=page)=>f.evaluate(async()=>{const d=document.querySelector('[data-game]').dataset;return (await import(new URL('generator.js',location.href))).generateClassifier(Number(d.seed))[Number(d.index)];});
 const choose=async(id,f=page)=>{await f.locator('[name="answer"][value="'+id+'"]').focus();await f.locator('[name="answer"][value="'+id+'"]').press('Space');await f.locator('[data-check]').press('Enter');};
 const done=async(f=page)=>{await f.locator('[data-game][data-phase="resolved"]').waitFor();await f.locator('[data-next]:not(:disabled)').waitFor();await math(f);assert.ok(await f.locator('[data-check]').isDisabled());};
 await page.goto(base+widget+'index.html');await ready();
 await page.locator('[data-check]').click();await page.locator('[data-feedback]').filter({hasText:'Selecciona una clasificación'}).waitFor();
 let oldSeed;
 for(let run=0;run<2;run++){
  const seed=await page.locator('[data-game]').getAttribute('data-seed');assert.notEqual(seed,oldSeed);oldSeed=seed;
  const seen=new Set();
  for(let i=0;i<12;i++){
   await ready();const c=await challenge();assert.equal(c.index,i);seen.add(c.mode);assert.equal(await page.locator('[name="answer"]').count(),3);
   if(c.mode==='graph'){assert.equal(await page.locator('[data-graph-line]').count(),2);assert.ok(await page.locator('svg[role="img"] desc').textContent());if(run===0&&c.kind==='SCI'&&process.env.SCREENSHOT_DIR)await page.locator('[data-game]').screenshot({path:process.env.SCREENSHOT_DIR+'/clasificador-escritorio.png'});}
   const wrong=c.options.filter(o=>o.id!==c.kind);
   if(run===0&&i===0){await page.locator('[data-hint]').click();await ready();await page.locator('[data-hint]').click();await ready();await choose(wrong[0].id);await ready();}
   if(run===0&&i===1){await choose(wrong[0].id);await ready();await choose(wrong[1].id);}else await choose(c.kind);
   await done();assert.match(await page.locator('[data-feedback]').innerText(),/Solución:/);
   await page.getByText('Ver comprobación algebraica',{exact:true}).click();await math();
   if(c.mode==='ranks')assert.match(await page.locator('[data-feedback]').innerText(),/Un sistema concreto/);
   const score=await page.locator('[data-game]').getAttribute('data-score');await page.locator('[data-check]').dispatchEvent('click');assert.equal(await page.locator('[data-game]').getAttribute('data-score'),score);
   await page.locator('[data-next]').click();
  }
  assert.equal(seen.size,4);await page.locator('[data-game][data-phase="summary"]').waitFor();await page.locator('[data-next]:not(:disabled)').waitFor();await math();
  assert.match(await page.locator('[data-feedback]').innerText(),run===0?/1050 de 1200 puntos. 10 de 12/:/1200 de 1200 puntos. 12 de 12/);
  assert.match(await page.locator('[data-feedback]').innerText(),run===0?/Pistas utilizadas: 1/:/Pistas utilizadas: 0/);
  assert.equal(await page.locator('[data-meter]').evaluate(e=>e.value),12);assert.equal(await page.locator('[data-feedback] details').count(),12);
  for(const details of await page.locator('[data-feedback] details').all()){await details.locator('summary').click();await math();}
  await page.locator('[data-next]').click();await ready();
 }
 const c=await challenge();await page.locator('[name="answer"][value="'+c.kind+'"]').check();
 await page.locator('[data-reading-controls]>summary').click();await page.locator('[data-text-size]').selectOption('200');await page.locator('[data-contrast-control]').check();await page.locator('[data-highlight-control]').check();await page.setViewportSize({width:320,height:844});await ready();assert.ok(await page.locator('[name="answer"][value="'+c.kind+'"]').isChecked());
 const mobileModes=new Set();
 while(mobileModes.size<4){
  await ready();const item=await challenge();mobileModes.add(item.mode);
  if(item.mode==='graph'&&process.env.SCREENSHOT_DIR)await page.locator('[data-game]').screenshot({path:process.env.SCREENSHOT_DIR+'/clasificador-movil.png'});
  await choose(item.kind);await done();await page.getByText('Ver comprobación algebraica',{exact:true}).click();await math();await page.locator('[data-next]').click();
 }
 await page.reload();await ready();assert.equal(await page.locator('[data-game]').getAttribute('data-score'),'0');assert.equal(await page.locator('[name="answer"]:checked').count(),0);await page.locator('[data-reading-controls]>summary').click();await page.locator('[data-reset-reading]').click();
 for(const subfolder of [false,true]){
  const prefix=subfolder?new URL('prueba-subcarpeta/',base).href:base;
  if(subfolder)await page.route(prefix+'**',async route=>{const response=await route.fetch({url:route.request().url().replace(prefix,base)});await route.fulfill({response});});
  await page.goto(prefix+host);await page.locator('iframe').scrollIntoViewIfNeeded();await page.waitForFunction(()=>document.querySelector('iframe')?.contentDocument?.querySelector('[name="answer"]'));
  const frame=page.frames().find(f=>f.url().startsWith(prefix+widget));assert.ok(frame);await ready(frame);
  const item=await challenge(frame);await frame.locator('[name="answer"][value="'+item.kind+'"]').check();
  await page.locator('[data-reading-controls]>summary').click();await page.locator('[data-text-size]').selectOption('200');await page.locator('[data-contrast-control]').check();
  await frame.waitForFunction(()=>document.documentElement.dataset.largeText==='true'&&document.documentElement.dataset.contrast==='true');
  assert.ok(await frame.locator('[name="answer"][value="'+item.kind+'"]').isChecked());await choose(item.kind,frame);await done(frame);assert.equal(await frame.locator('[data-game]').getAttribute('data-score'),'100');
  await page.waitForFunction(()=>parseFloat(document.querySelector('iframe').style.height)>120);await page.locator('[data-reset-reading]').click();
  assert.ok(await page.locator('#site-header a').count()>0);assert.ok(await page.locator('#site-footer').innerText());await math(frame);
 }
 await page.goto(base+'libro/temas/05-sistemas-de-ecuaciones/index.html');await page.getByRole('link',{name:'Clasificador de sistemas',exact:true}).click();assert.equal(page.url(),base+host);
 await page.getByRole('link',{name:'Volver al repaso del tema 5',exact:true}).click();assert.match(page.url(),/#repaso$/);
 await page.goto(base+'laboratorios/index.html');await page.getByRole('link',{name:'Clasificador de sistemas',exact:true}).click();assert.equal(page.url(),base+host);assert.deepEqual(errors,[]);
 console.log('Aprobado: sesiones de 1050 y 1200 puntos, cuatro representaciones, doce explicaciones, errores/pistas, bloqueo, teclado, LaTeX, cuatro modos en móvil 320/200 %, recarga, iframe, preferencias, subcarpeta y navegación.');
 }finally{for(const context of browser.contexts())for(const page of context.pages())await page.unrouteAll({behavior:'ignoreErrors'});await browser.close();}
})().catch(e=>{console.error(e);process.exitCode=1;});

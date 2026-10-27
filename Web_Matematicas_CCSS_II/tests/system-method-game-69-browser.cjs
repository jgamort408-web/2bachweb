const assert=require('node:assert/strict'),{chromium}=require('playwright');
const base=process.env.TEST_URL||'http://127.0.0.1:4173/',widget='widgets/games/t05-c-elige-el-metodo/',host='laboratorios/juegos/t05-c-elige-el-metodo.html';
(async()=>{
 const browser=await chromium.launch({headless:true,executablePath:process.env.CHROME_PATH});
 try{
  const page=await browser.newPage({viewport:{width:1280,height:960}}),errors=[];
  page.on('pageerror',e=>errors.push(e.message));page.on('response',r=>{if(r.status()>=400&&!r.url().endsWith('favicon.ico'))errors.push(r.status()+' '+r.url());});
  const math=async(f=page)=>{await f.waitForFunction(()=>document.querySelector('.math-status')?.hidden===true);assert.equal(await f.locator('[data-mml-node="merror"]').count(),0);assert.doesNotMatch(await f.locator('main').innerText(),/\\[\[(]/);assert.ok(await f.evaluate(()=>document.documentElement.scrollWidth<=innerWidth));};
  const ready=async(f=page)=>{await f.locator('[data-check]:not(:disabled)').waitFor();await math(f);};
  const current=async(f=page)=>f.evaluate(async()=>{const m=await import(new URL('model.js',location.href)),d=document.querySelector('[data-game]').dataset;return m.generateMethods(Number(d.seed))[Number(d.index)];});
  const choose=async(id,f=page)=>{const radio=f.locator('[name="answer"][value="'+id+'"]');await radio.focus();await radio.press('Space');await f.locator('[data-check]').press('Enter');};
  const done=async(f=page)=>{await f.locator('[data-game][data-phase="resolved"]').waitFor();await f.locator('[data-next]:not(:disabled)').waitFor();await math(f);};
  await page.goto(base+widget+'index.html');await ready();
  await page.locator('[data-check]').click();await page.locator('[data-feedback]').filter({hasText:'Selecciona una estrategia'}).waitFor();
  assert.equal(await page.locator('[data-game]').getAttribute('data-score'),'0');
  let lastSeed;
  for(let run=0;run<2;run++){
   const seed=await page.locator('[data-game]').getAttribute('data-seed');assert.notEqual(seed,lastSeed);lastSeed=seed;
   for(let i=0;i<6;i++){
    await ready();const c=await current();assert.equal(c.index,i);
    const good=c.options.find(o=>o.valid&&(run===0?!o.recommended:o.recommended))||c.options.find(o=>o.valid),bad=c.options.filter(o=>!o.valid);
    if(i===0){await page.locator('[data-hint]').click();await ready();assert.match(await page.locator('[data-feedback]').innerText(),/Pista:/);}
    if(run===0&&i<2){await choose(bad[0].id);await ready();assert.match(await page.locator('[data-feedback]').innerText(),/Te queda un intento/);}
    await choose(run===0&&i===1?bad[1].id:good.id);await done();
    await page.getByText('Ver comprobación algebraica',{exact:true}).click();await math();
    const score=await page.locator('[data-game]').getAttribute('data-score');await page.locator('[data-check]').dispatchEvent('click');assert.equal(await page.locator('[data-game]').getAttribute('data-score'),score);
    if(run===1&&i===1&&process.env.SCREENSHOT_DIR)await page.locator('[data-game]').screenshot({path:process.env.SCREENSHOT_DIR+'/elige-metodo-escritorio.png'});
    await page.locator('[data-next]').click();
   }
   await page.locator('[data-game][data-phase="summary"]').waitFor();await page.locator('[data-next]:not(:disabled)').waitFor();await math();
   assert.match(await page.locator('[data-feedback]').innerText(),run===0?/450 de 600 puntos/:/600 de 600 puntos/);
   assert.equal(await page.locator('[data-feedback]>ol>li>details').count(),6);
   for(const details of await page.locator('[data-feedback]>ol>li>details').all()){await details.locator(':scope>summary').click();await details.getByText('Ver comprobación algebraica',{exact:true}).click();await math();}
   await page.locator('[data-next]').click();await ready();
  }
  const c=await current(),id=c.options[0].id;await page.locator('[name="answer"][value="'+id+'"]').check();
  await page.locator('[data-reading-controls]>summary').click();await page.locator('[data-text-size]').selectOption('200');await page.locator('[data-contrast-control]').check();await page.locator('[data-highlight-control]').check();await page.setViewportSize({width:320,height:844});await ready();
  assert.ok(await page.locator('[name="answer"][value="'+id+'"]').isChecked());
  for(let i=0;i<6;i++){
   await ready();const c=await current();await choose(c.options.find(o=>o.valid).id);await done();await page.getByText('Ver comprobación algebraica',{exact:true}).click();await math();
   if(i===4&&process.env.SCREENSHOT_DIR)await page.locator('[data-game]').screenshot({path:process.env.SCREENSHOT_DIR+'/elige-metodo-movil.png'});
   await page.locator('[data-next]').click();
  }
  await page.reload();await ready();assert.equal(await page.locator('[data-game]').getAttribute('data-score'),'0');assert.equal(await page.locator('[name="answer"]:checked').count(),0);
  await page.locator('[data-reading-controls]>summary').click();await page.locator('[data-reset-reading]').click();
  for(const subfolder of [false,true]){
   const prefix=subfolder?new URL('prueba-subcarpeta/',base).href:base;
   if(subfolder)await page.route(prefix+'**',async route=>{const response=await route.fetch({url:route.request().url().replace(prefix,base)});await route.fulfill({response});});
   await page.goto(prefix+host);await page.locator('iframe').scrollIntoViewIfNeeded();await page.waitForFunction(()=>document.querySelector('iframe')?.contentDocument?.querySelector('[data-check]'));
   const f=page.frames().find(f=>f.url().startsWith(prefix+widget));assert.ok(f);await ready(f);
   const c=await current(f);await f.locator('[name="answer"][value="'+c.options.find(o=>o.valid).id+'"]').check();
   await page.locator('[data-reading-controls]>summary').click();await page.locator('[data-text-size]').selectOption('200');await page.locator('[data-contrast-control]').check();
   await f.waitForFunction(()=>document.documentElement.dataset.largeText==='true'&&document.documentElement.dataset.contrast==='true');assert.equal(await f.locator('[name="answer"]:checked').count(),1);
   await f.locator('[data-check]').click();await done(f);assert.equal(await f.locator('[data-game]').getAttribute('data-score'),'100');
   await page.waitForFunction(()=>parseFloat(document.querySelector('iframe').style.height)>120);await page.locator('[data-reset-reading]').click();assert.ok(await page.locator('#site-footer').innerText());
  }
  await page.goto(base+'libro/temas/05-sistemas-de-ecuaciones/index.html');await page.getByRole('link',{name:'Elige el método',exact:true}).click();assert.equal(page.url(),base+host);
  await page.getByRole('link',{name:'Volver al repaso del tema 5',exact:true}).click();assert.match(page.url(),/#repaso$/);
  assert.deepEqual(errors,[]);console.log('Aprobado: estrategias alternativas, errores, 450/600 puntos, pistas, seis comprobaciones, teclado, móvil 320/200 %, preferencias, recarga, iframe y subcarpeta.');
 }finally{for(const context of browser.contexts())for(const page of context.pages())await page.unrouteAll({behavior:'wait'});await browser.close();}
})().catch(e=>{console.error(e);process.exitCode=1;});

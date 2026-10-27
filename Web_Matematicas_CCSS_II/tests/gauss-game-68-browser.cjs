const assert=require('node:assert/strict'),{chromium}=require('playwright');
const base=process.env.TEST_URL||'http://127.0.0.1:4173/',widget='widgets/games/t05-b-gauss-paso-a-paso/',host='laboratorios/juegos/t05-b-gauss-paso-a-paso.html';
(async()=>{
 const browser=await chromium.launch({headless:true,executablePath:process.env.CHROME_PATH});
 try{
  const page=await browser.newPage({viewport:{width:1280,height:960}}),errors=[];
  page.on('pageerror',e=>errors.push(e.message));page.on('response',r=>{if(r.status()>=400&&!r.url().endsWith('favicon.ico'))errors.push(r.status()+' '+r.url());});
  const math=async(f=page)=>{await f.waitForFunction(()=>document.querySelector('.math-status')?.hidden===true);assert.equal(await f.locator('[data-mml-node="merror"]').count(),0);assert.doesNotMatch(await f.locator('main').innerText(),/\\[\[(]/);assert.ok(await f.evaluate(()=>document.documentElement.scrollWidth<=innerWidth));};
  const ready=async(f=page)=>{await f.locator('[data-check]:not(:disabled)').waitFor();await math(f);};
  const data=async(f=page)=>f.evaluate(async()=>{const m=await import(new URL('model.js',location.href)),d=document.querySelector('[data-game]').dataset,matrix=JSON.parse(d.snapshot);return {c:m.generateGaussGame(Number(d.seed))[Number(d.index)],matrix,echelon:m.isEchelon(matrix),suggestion:m.suggestOperation(matrix)};});
  const apply=async(op,f=page)=>{
   await f.locator('[data-operation]').selectOption({value:op.kind});await f.locator('[data-target]').selectOption({value:String(op.target)});
   if(op.kind!=='scale')await f.locator('[data-source]').selectOption({value:String(op.source)});
   if(op.scalar)await f.locator('[data-factor]').fill(op.scalar.numerator+'/'+op.scalar.denominator);
   await f.locator('[data-apply]').press('Enter');await ready(f);
  };
  const solve=async(f=page)=>{let count=0;while(!(await data(f)).echelon){const d=await data(f);assert.ok(d.suggestion);await apply(d.suggestion,f);assert.ok(++count<15);}};
  const choose=async(kind,f=page)=>{await f.locator('[name="kind"][value="'+kind+'"]').focus();await f.locator('[name="kind"][value="'+kind+'"]').press('Space');await f.locator('[data-check]').press('Enter');};
  const done=async(f=page)=>{await f.locator('[data-game][data-phase="resolved"]').waitFor();await f.locator('[data-next]:not(:disabled)').waitFor();await math(f);};
  await page.goto(base+widget+'index.html');await ready();
  await page.locator('[data-check]').click();await page.locator('[data-feedback]').filter({hasText:'aún no está escalonada'}).waitFor();
  const initial=(await data()).matrix;
  await page.locator('[data-operation]').selectOption('scale');
  for(const bad of ['0','1/0','','0.5','10']){await page.locator('[data-factor]').fill(bad);await page.locator('[data-apply]').click();await ready();assert.deepEqual((await data()).matrix,initial);assert.ok(await page.locator('[data-status]').innerText());}
  await apply({kind:'add',target:0,source:0,scalar:{numerator:1,denominator:1}});assert.deepEqual((await data()).matrix,initial);
  await apply({kind:'scale',target:0,scalar:{numerator:2,denominator:1}});assert.notDeepEqual((await data()).matrix,initial);
  await page.locator('[data-undo]').click();await ready();assert.deepEqual((await data()).matrix,initial);
  await apply({kind:'swap',target:0,source:1});await page.locator('[data-reset]').click();await ready();assert.deepEqual((await data()).matrix,initial);
  let oldSeed;
  for(let run=0;run<2;run++){
   const seed=await page.locator('[data-game]').getAttribute('data-seed');assert.notEqual(seed,oldSeed);oldSeed=seed;
   for(let i=0;i<6;i++){
    await ready();const {c}=await data();assert.equal(c.index,i);
    if(run===0&&i===0){await page.locator('[data-hint]').click();await ready();assert.match(await page.locator('[data-status]').innerText(),/Una posibilidad/);await page.locator('[data-apply]').click();await ready();}
    if(run===0&&i===2){await page.locator('[data-reveal]').click();await ready();assert.equal((await data()).echelon,true);await page.locator('[data-reset]').click();await ready();assert.equal(await page.locator('[data-game]').getAttribute('data-assisted'),'true');assert.equal(await page.locator('[data-reveal]').isDisabled(),false);}
    await solve();
    await apply({kind:'scale',target:0,scalar:{numerator:-2,denominator:1}});assert.equal((await data()).echelon,true);
    if(run===0&&i===4&&process.env.SCREENSHOT_DIR)await page.locator('[data-game]').screenshot({path:process.env.SCREENSHOT_DIR+'/gauss-juego-escritorio.png'});
    const wrong=['SCD','SCI','SI'].filter(k=>k!==c.details.kind);
    if(run===0&&i<2){await choose(wrong[0]);await ready();}
    await choose(run===0&&i===1?wrong[1]:c.details.kind);await done();
    if(c.details.kind!=='SI'){await page.getByText('Comprobar en el sistema original',{exact:true}).click();await math();}
    const score=await page.locator('[data-game]').getAttribute('data-score');await page.locator('[data-check]').dispatchEvent('click');assert.equal(await page.locator('[data-game]').getAttribute('data-score'),score);
    await page.locator('[data-next]').click();
   }
   await page.locator('[data-game][data-phase="summary"]').waitFor();await page.locator('[data-next]:not(:disabled)').waitFor();await math();
   assert.match(await page.locator('[data-feedback]').innerText(),run===0?/350 de 600 puntos/:/600 de 600 puntos/);
   assert.equal(await page.locator('[data-feedback]>ol>li>details').count(),6);
   for(const details of await page.locator('[data-feedback]>ol>li>details').all()){await details.locator(':scope>summary').click();await math();}
   await page.locator('[data-next]').click();await ready();
  }
  const before=(await data()).matrix;await page.locator('[name="kind"][value="SCD"]').check();await page.locator('[data-factor]').fill('1/2');
  await page.locator('[data-reading-controls]>summary').click();await page.locator('[data-text-size]').selectOption('200');await page.locator('[data-contrast-control]').check();await page.locator('[data-highlight-control]').check();await page.setViewportSize({width:320,height:844});await ready();
  assert.deepEqual((await data()).matrix,before);assert.ok(await page.locator('[name="kind"][value="SCD"]').isChecked());assert.equal(await page.locator('[data-factor]').inputValue(),'1/2');
  for(let i=0;i<6;i++){
   await ready();const {c}=await data();await page.locator('[data-reveal]').click();await ready();
   await page.getByText('Ver historial de operaciones',{exact:true}).click();await math();
   if(i===4&&process.env.SCREENSHOT_DIR)await page.locator('[data-game]').screenshot({path:process.env.SCREENSHOT_DIR+'/gauss-juego-movil.png'});
   await choose(c.details.kind);await done();await page.locator('[data-next]').click();
  }
  await page.reload();await ready();assert.equal(await page.locator('[data-game]').getAttribute('data-score'),'0');assert.equal(await page.locator('[name="kind"]:checked').count(),0);
  await page.locator('[data-reading-controls]>summary').click();await page.locator('[data-reset-reading]').click();
  for(const subfolder of [false,true]){
   const prefix=subfolder?new URL('prueba-subcarpeta/',base).href:base;
   if(subfolder)await page.route(prefix+'**',async route=>{const response=await route.fetch({url:route.request().url().replace(prefix,base)});await route.fulfill({response});});
   await page.goto(prefix+host);await page.locator('iframe').scrollIntoViewIfNeeded();await page.waitForFunction(()=>document.querySelector('iframe')?.contentDocument?.querySelector('[data-apply]'));
   const f=page.frames().find(f=>f.url().startsWith(prefix+widget));assert.ok(f);await ready(f);
   const matrix=(await data(f)).matrix;await page.locator('[data-reading-controls]>summary').click();await page.locator('[data-text-size]').selectOption('200');await page.locator('[data-contrast-control]').check();
   await f.waitForFunction(()=>document.documentElement.dataset.largeText==='true'&&document.documentElement.dataset.contrast==='true');assert.deepEqual((await data(f)).matrix,matrix);
   await solve(f);const {c}=await data(f);await choose(c.details.kind,f);await done(f);assert.equal(await f.locator('[data-game]').getAttribute('data-score'),'100');
   await page.waitForFunction(()=>parseFloat(document.querySelector('iframe').style.height)>120);await page.locator('[data-reset-reading]').click();assert.ok(await page.locator('#site-footer').innerText());
  }
  await page.goto(base+'libro/temas/05-sistemas-de-ecuaciones/index.html');await page.getByRole('link',{name:'Gauss paso a paso',exact:true}).click();assert.equal(page.url(),base+host);
  await page.getByRole('link',{name:'Volver al repaso del tema 5',exact:true}).click();assert.match(page.url(),/#repaso$/);
  assert.deepEqual(errors,[]);console.log('Aprobado: rutas alternativas, errores de entrada, deshacer/reiniciar, pistas, asistencia persistente, 350/600 puntos, seis resúmenes, seis casos móviles 320/200 %, preferencias, recarga, iframe y subcarpeta.');
 }finally{for(const context of browser.contexts())for(const page of context.pages())await page.unrouteAll({behavior:'ignoreErrors'});await browser.close();}
})().catch(e=>{console.error(e);process.exitCode=1;});

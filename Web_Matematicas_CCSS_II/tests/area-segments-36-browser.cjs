const assert=require('node:assert/strict'),{chromium}=require('playwright');
const base=process.env.TEST_URL||'http://127.0.0.1:4173/',widget='widgets/games/t03-c-area-por-tramos/',host='laboratorios/juegos/t03-c-area-por-tramos.html';
(async()=>{
 const browser=await chromium.launch({headless:true,executablePath:process.env.CHROME_PATH});
 try{
  const page=await browser.newPage({viewport:{width:1280,height:1000}}),errors=[];
  page.on('pageerror',e=>errors.push(e.message));page.on('response',r=>{if(r.status()>=400&&!r.url().endsWith('favicon.ico'))errors.push(r.status()+' '+r.url());});
  const math=async(f=page)=>{await f.waitForFunction(()=>document.querySelector('.math-status')?.hidden===true);assert.equal(await f.locator('[data-mml-node="merror"]').count(),0);assert.doesNotMatch(await f.locator('main').innerText(),/\\[\[(]/);assert.ok(await f.evaluate(()=>document.documentElement.scrollWidth<=innerWidth));};
  const ready=async(f=page)=>{await f.locator('[data-check]:not(:disabled)').waitFor();await math(f);};
  const submit=async(f=page)=>{await f.locator('[data-check]').focus();await f.locator('[data-check]').press('Enter');};
  const done=async(phase,f=page)=>{await f.locator('[data-game][data-phase="'+phase+'-done"]').waitFor();await f.locator('[data-next]:not(:disabled)').waitFor();await math(f);assert.ok(await f.locator('[data-fields]').evaluate(el=>el.disabled));assert.ok(await f.locator('[data-check]').isDisabled());};
  const rows=async(f=page)=>f.evaluate(async()=>{const m=await import('./generator.js');return m.generateAreas(Number(document.querySelector('[data-game]').dataset.seed)).map(r=>({...r,segments:r.segments.map(t=>({...t,text:m.fractionText(t.integral)})),totalText:m.fractionText(r.integral),areaText:m.fractionText(r.area)}));});
  const fill=async(values,f=page)=>{for(let i=0;i<values.length;i++)await f.locator('[data-answer="'+i+'"]').fill(values[i]);};
  await page.goto(base+widget+'index.html');await ready();let oldSeed;
  for(let run=0;run<2;run++){
   const seed=await page.locator('[data-game]').getAttribute('data-seed');assert.notEqual(seed,oldSeed);oldSeed=seed;const challenges=await rows();
   for(let i=0;i<6;i++){
    await ready();const r=challenges[i];assert.equal(await page.locator('[data-game]').getAttribute('data-index'),String(i));
    assert.ok(!(await page.locator('[data-graph]').innerHTML()).match(/NaN|Infinity/));
    if(run===0&&i===0){await page.locator('[data-hint]').click();await ready();await page.locator('[data-hint]').click();await ready();await submit();await ready();assert.match(await page.locator('[data-feedback]').innerText(),/partición mínima/);}
    for(const x of r.cuts){
     const point=page.locator('[data-graph] [data-cut="'+x+'"]');await point.click();assert.ok(await page.locator('[data-cut-input][value="'+x+'"]').isChecked());
     await page.locator('[data-cut-input][value="'+x+'"]').uncheck();assert.equal(await point.getAttribute('aria-pressed'),'false');await point.focus();await point.press('Space');assert.ok(await page.locator('[data-cut-input][value="'+x+'"]').isChecked());
    }
    if(r.kind==='contact'||r.kind==='constant-sign')assert.equal(await page.locator('[data-cut-input]:checked').count(),0);
    await submit();await done('cuts');assert.equal(await page.locator('[data-region]').count(),r.segments.length);
    const score=await page.locator('[data-game]').getAttribute('data-score');await page.locator('[data-check]').dispatchEvent('click');assert.equal(await page.locator('[data-game]').getAttribute('data-score'),score);
    await page.locator('[data-next]').click();await ready();assert.equal(await page.locator('[data-answer]').count(),r.segments.length);assert.match(await page.locator('[data-signs]').innerText(),/Tramo 1/);
    if(run===0&&i===1&&process.env.SCREENSHOT_DIR)await page.locator('[data-game]').screenshot({path:process.env.SCREENSHOT_DIR+'/area-tramos-escritorio.png'});
    if(run===0&&i===0){
     await submit();await ready();assert.match(await page.locator('[data-feedback]').innerText(),/No se ha gastado/);
     await page.locator('[data-hint]').click();await ready();assert.ok(await page.locator('[data-feedback] mjx-container').count()>0);
     await fill(r.segments.map(()=> '999'));await submit();await ready();await submit();
    }else{await fill(r.segments.map(t=>run===0?(t.integral.n/t.integral.d).toFixed(2).replace('.',','):t.text));await submit();}
    await done('integrals');assert.match(await page.locator('[data-feedback]').innerText(),/Una primitiva/);await page.locator('[data-next]').click();await ready();
    if(run===0&&i===0){await page.locator('[data-hint]').click();await ready();await fill(['999','999']);await submit();await ready();}
    await fill([r.totalText,r.areaText]);await submit();await done('totals');assert.match(await page.locator('[data-feedback]').innerText(),/unidades cuadradas/);await page.locator('[data-next]').click();
   }
   await page.locator('[data-game][data-phase="summary"]').waitFor();await page.locator('[data-next]:not(:disabled)').waitFor();await math();
   assert.match(await page.locator('[data-feedback]').innerText(),run===0?/1600 de 1800 puntos\. 15 de 18/:/1800 de 1800 puntos\. 18 de 18/);assert.match(await page.locator('[data-feedback]').innerText(),run===0?/Pistas utilizadas: 3/:/Pistas utilizadas: 0/);assert.equal(await page.locator('[data-feedback] li').count(),6);
   await page.locator('[data-next]').click();await ready();
  }
  const x=(await rows())[0].cuts[0];await page.locator('[data-cut-input][value="'+x+'"]').check();await page.locator('[data-reading-controls]>summary').click();await page.locator('[data-text-size]').selectOption('200');await page.locator('[data-contrast-control]').check();await page.locator('[data-highlight-control]').check();await page.setViewportSize({width:320,height:844});await ready();assert.ok(await page.locator('[data-cut-input][value="'+x+'"]').isChecked());
  await page.locator('summary').filter({hasText:'Tabla de valores'}).click();assert.ok(await page.locator('[data-table] table').isVisible());
  if(process.env.SCREENSHOT_DIR)await page.locator('[data-game]').screenshot({path:process.env.SCREENSHOT_DIR+'/area-tramos-movil.png'});
  await submit();await done('cuts');await page.locator('[data-next]').click();await ready();await page.locator('[data-answer="0"]').fill('1/2');await page.locator('[data-contrast-control]').uncheck();assert.equal(await page.locator('[data-answer="0"]').inputValue(),'1/2');await math();
  await page.reload();await ready();assert.equal(await page.locator('[data-game]').getAttribute('data-score'),'0');assert.equal(await page.locator('[data-cut-input]:checked').count(),0);await page.locator('[data-reading-controls]>summary').click();await page.locator('[data-reset-reading]').click();
  for(const subfolder of [false,true]){
   const prefix=subfolder?new URL('prueba-subcarpeta/',base).href:base;
   if(subfolder)await page.route(prefix+'**',async route=>{const response=await route.fetch({url:route.request().url().replace(prefix,base)});await route.fulfill({response});});
   await page.goto(prefix+host);await page.locator('iframe').scrollIntoViewIfNeeded();await page.waitForFunction(()=>document.querySelector('iframe')?.contentDocument?.querySelector('[data-cut-input]'));
   const frame=page.frames().find(f=>f.url().startsWith(prefix+widget));assert.ok(frame);await ready(frame);const r=(await rows(frame))[0];await frame.locator('[data-cut-input][value="'+r.cuts[0]+'"]').check();
   await page.locator('[data-reading-controls]>summary').click();await page.locator('[data-text-size]').selectOption('200');await page.locator('[data-contrast-control]').check();await frame.waitForFunction(()=>document.documentElement.dataset.largeText==='true'&&document.documentElement.dataset.contrast==='true');assert.ok(await frame.locator('[data-cut-input][value="'+r.cuts[0]+'"]').isChecked());await submit(frame);await done('cuts',frame);assert.equal(await frame.locator('[data-game]').getAttribute('data-score'),'100');await page.locator('[data-reset-reading]').click();
  }
  await page.goto(base+'libro/temas/03-integrales/index.html#ruta-juegos');assert.equal(await page.locator('#ruta-juegos a').count(),3);await page.locator('#ruta-juegos a[href$="t03-c-area-por-tramos.html"]').click();assert.equal(page.url(),base+host);assert.deepEqual(errors,[]);
  console.log('Aprobado: 2 sesiones, 36 pasos, cortes por ratón/teclado/casillas, contacto y extremos, fracciones/decimales, 1600/1800 y 1800/1800, soluciones, móvil 320/200 %, preferencias, recarga, iframe, subcarpeta y ruta.');
 }finally{await browser.close();}
})().catch(e=>{console.error(e);process.exitCode=1;});

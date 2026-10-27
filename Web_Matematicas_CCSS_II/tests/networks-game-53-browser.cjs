const assert=require('node:assert/strict'),{chromium}=require('playwright');
const base=process.env.TEST_URL||'http://127.0.0.1:4173/',widget='widgets/games/t04-c-redes-y-adyacencia/',host='laboratorios/juegos/t04-c-redes-y-adyacencia.html';
(async()=>{
 const browser=await chromium.launch({headless:true,executablePath:process.env.CHROME_PATH});
 try{
 const page=await browser.newPage({viewport:{width:1280,height:960}}),errors=[];
 page.on('pageerror',e=>errors.push(e.message));page.on('response',r=>{if(r.status()>=400&&!r.url().endsWith('favicon.ico'))errors.push(r.status()+' '+r.url());});
 const math=async(f=page)=>{await f.waitForFunction(()=>!document.querySelector('.math-status')||document.querySelector('.math-status').hidden===true);assert.equal(await f.locator('[data-mml-node="merror"]').count(),0);assert.doesNotMatch(await f.locator('main').innerText(),/\\[\[(]/);assert.ok(await f.evaluate(()=>document.documentElement.scrollWidth<=innerWidth));};
 const ready=async(f=page)=>{await f.locator('[data-check]:not(:disabled)').waitFor();await math(f);};
 const done=async(f=page)=>{await f.locator('[data-game][data-phase="resolved"]').waitFor();await f.locator('[data-next]:not(:disabled)').waitFor();await math(f);assert.ok(await f.locator('[data-check]').isDisabled());};
 const bank=async(f=page)=>f.evaluate(async()=>{const {generateNetworks}=await import('./generator.js');return generateNetworks(Number(document.querySelector('[data-game]').dataset.seed));});
 const fill=async(r,a=r.matrix,f=page)=>{
  for(let i=0;i<a.length;i++)for(let j=0;j<a.length;j++)if(i!==j){
   const input=f.locator('[data-cell][data-row="'+i+'"][data-col="'+j+'"]');
   if(r.mode==='matrix')await input.selectOption(String(a[i][j]));
   else if(r.directed||i<j)await input.setChecked(Boolean(a[i][j]));
  }
 };
 const wrong=r=>{const a=structuredClone(r.matrix);a[0][1]=1-a[0][1];if(!r.directed)a[1][0]=a[0][1];return a;};
 const submit=async(f=page)=>f.locator('[data-check]').press('Enter');
 await page.goto(base+widget+'index.html');await ready();
 let oldSeed;
 for(let run=0;run<2;run++){
  const seed=await page.locator('[data-game]').getAttribute('data-seed');assert.notEqual(seed,oldSeed);oldSeed=seed;
  const rounds=await bank();
  for(const r of rounds){
   await ready();assert.equal(await page.locator('[data-game]').getAttribute('data-index'),String(r.index));
   assert.equal(await page.locator('[data-cell]').count(),r.matrix.length*(r.matrix.length-1));
   // Teclado y arrastre solo cambian posiciones. Clic/teclado conectan en el modo grafo.
   const node=page.locator('[data-node="0"]'),before=await node.getAttribute('transform');
   await node.focus();await node.press('ArrowRight');assert.notEqual(await node.getAttribute('transform'),before);
   if(r.mode==='graph'){
    await node.press('Enter');await page.locator('[data-node="1"]').press('Space');
    assert.ok(await page.locator('[data-cell][data-row="0"][data-col="1"]').isChecked());
    assert.equal(await page.locator('[data-cell][data-row="1"][data-col="0"]').isChecked(),!r.directed);
    await node.press('Enter');await node.press('Escape');assert.equal(await node.getAttribute('aria-pressed'),'false');
    const box=await node.boundingBox(),beforeDrag=await node.getAttribute('transform');
    await page.mouse.move(box.x+box.width/2,box.y+box.height/2);await page.mouse.down();await page.mouse.move(box.x+box.width/2+25,box.y+box.height/2+15,{steps:5});await page.mouse.up();
    assert.notEqual(await node.getAttribute('transform'),beforeDrag);assert.ok(await page.locator('[data-cell][data-row="0"][data-col="1"]').isChecked());
    await node.click();await page.locator('[data-node="1"]').click();assert.ok(!await page.locator('[data-cell][data-row="0"][data-col="1"]').isChecked());
    await node.dispatchEvent('click');await page.locator('[data-node="1"]').dispatchEvent('click');assert.ok(await page.locator('[data-cell][data-row="0"][data-col="1"]').isChecked());
   }
   if(run===0&&r.index===0){
    await page.locator('[data-hint]').click();await ready();await page.locator('[data-hint]').click();await ready();
    await fill(r,wrong(r));await submit();await ready();await submit();
   }else{
    if(run===0&&r.index===1){await fill(r,wrong(r));await submit();await ready();}
    await fill(r);await submit();
   }
   await done();assert.match(await page.locator('[data-feedback]').innerText(),/Solución:/);assert.ok(await page.locator('[data-feedback] mjx-container').count()>0);
   if(run===0&&r.index===3&&process.env.SCREENSHOT_DIR)await page.locator('[data-game]').screenshot({path:process.env.SCREENSHOT_DIR+'/redes-adyacencia-escritorio.png'});
   const score=await page.locator('[data-game]').getAttribute('data-score');await page.locator('[data-check]').dispatchEvent('click');assert.equal(await page.locator('[data-game]').getAttribute('data-score'),score);
   await page.locator('[data-next]').click();
  }
  await page.locator('[data-game][data-phase="summary"]').waitFor();await page.locator('[data-next]:not(:disabled)').waitFor();await math();
  assert.match(await page.locator('[data-feedback]').innerText(),run===0?/450 de 600 puntos. 4 de 6/:/600 de 600 puntos. 6 de 6/);
  assert.match(await page.locator('[data-feedback]').innerText(),run===0?/Pistas utilizadas: 1/:/Pistas utilizadas: 0/);
  assert.equal(await page.locator('[data-meter]').evaluate(e=>e.value),6);
  for(const details of await page.locator('[data-feedback] details').all()){await details.locator('summary').click();await math();}
  assert.equal(await page.locator('[data-feedback] details').count(),6);
  await page.locator('[data-next]').click();await ready();
 }
 const rounds=await bank();await fill(rounds[0]);await submit();await done();await page.locator('[data-next]').click();await ready();
 await fill(rounds[1]);const selected=await page.locator('[data-cell]').evaluateAll(inputs=>inputs.map(i=>i.checked));
 await page.locator('[data-reading-controls]>summary').click();await page.locator('[data-text-size]').selectOption('200');await page.locator('[data-contrast-control]').check();await page.locator('[data-highlight-control]').check();await page.setViewportSize({width:320,height:844});await ready();
 assert.deepEqual(await page.locator('[data-cell]').evaluateAll(inputs=>inputs.map(i=>i.checked)),selected);
 // Texto del SVG y superficie deben seguir siendo legibles en alto contraste.
 assert.notEqual(await page.locator('[data-node="0"] circle').evaluate(e=>getComputedStyle(e).fill),await page.locator('[data-node="0"] text').evaluate(e=>getComputedStyle(e).fill));
 if(process.env.SCREENSHOT_DIR)await page.locator('[data-game]').screenshot({path:process.env.SCREENSHOT_DIR+'/redes-adyacencia-movil.png'});
 await page.reload();await ready();assert.equal(await page.locator('[data-game]').getAttribute('data-score'),'0');assert.ok((await page.locator('[data-cell]').evaluateAll(inputs=>inputs.map(i=>i.value))).every(v=>v==='0'));
 await page.locator('[data-reading-controls]>summary').click();await page.locator('[data-reset-reading]').click();
 for(const subfolder of [false,true]){
  const prefix=subfolder?new URL('prueba-subcarpeta/',base).href:base;
  if(subfolder)await page.route(prefix+'**',async route=>{const response=await route.fetch({url:route.request().url().replace(prefix,base)});await route.fulfill({response});});
  await page.goto(prefix+host);await page.locator('iframe').scrollIntoViewIfNeeded();await page.waitForFunction(()=>document.querySelector('iframe')?.contentDocument?.querySelector('[data-cell]'));
  const frame=page.frames().find(f=>f.url().startsWith(prefix+widget));assert.ok(frame);await ready(frame);const rs=await bank(frame);
  await fill(rs[0],rs[0].matrix,frame);
  await page.locator('[data-reading-controls]>summary').click();await page.locator('[data-text-size]').selectOption('200');await page.locator('[data-contrast-control]').check();
  await frame.waitForFunction(()=>document.documentElement.dataset.largeText==='true'&&document.documentElement.dataset.contrast==='true');
  await submit(frame);await done(frame);await frame.locator('[data-next]').click();await ready(frame);await fill(rs[1],rs[1].matrix,frame);await submit(frame);await done(frame);assert.equal(await frame.locator('[data-game]').getAttribute('data-score'),'200');
  await page.waitForFunction(()=>parseFloat(document.querySelector('iframe').style.height)>120);await page.locator('[data-reset-reading]').click();
  assert.ok(await page.locator('#site-header a').count()>0);assert.ok(await page.locator('#site-footer').innerText());
 }
 await page.goto(base+'libro/temas/04-matrices-y-determinantes/index.html');await page.getByRole('link',{name:'Redes y adyacencia',exact:true}).click();assert.equal(page.url(),base+host);
 await page.goto(base+'laboratorios/index.html');await page.getByRole('link',{name:'Redes y adyacencia',exact:true}).click();assert.equal(page.url(),base+host);assert.deepEqual(errors,[]);
 console.log('Aprobado: dos partidas/12 redes, 450 y 600 puntos, pistas y soluciones, ambos modos, flechas, simetría, nodos por clic y teclado, arrastre sin cambios de conexiones, móvil 320/200 %, contraste, fórmulas, recarga, iframe, preferencias, subcarpeta y navegación.');
 }finally{await browser.close();}
})().catch(e=>{console.error(e);process.exitCode=1;});

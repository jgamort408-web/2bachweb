const assert=require('node:assert/strict');
const {chromium}=require('playwright');
const base=process.env.TEST_URL||'http://127.0.0.1:4173/';
const widget='widgets/games/t02-a-construye-la-grafica/';
const host='laboratorios/juegos/t02-a-construye-la-grafica.html';
(async()=>{
 const browser=await chromium.launch({headless:true,...(process.env.CHROME_PATH?{executablePath:process.env.CHROME_PATH}:{})});
 try{
  const page=await browser.newPage({viewport:{width:1280,height:900}}),errors=[];
  page.on('pageerror',e=>errors.push(e.message));page.on('response',r=>{if(r.status()>=400&&!r.url().endsWith('favicon.ico'))errors.push(r.status()+' '+r.url());});
  const ready=async(frame=page)=>{await frame.waitForFunction(()=>!document.querySelector('.math-status')||document.querySelector('.math-status').hidden);assert.equal(await frame.locator('[data-mml-node="merror"]').count(),0);assert.doesNotMatch(await frame.locator('[data-feedback]').innerText(),/\\[\[(]/);assert.ok(await frame.evaluate(()=>document.documentElement.scrollWidth<=innerWidth),'desbordamiento '+frame.url());};
  await page.goto(base+widget+'index.html');await page.locator('[data-choices] input').first().waitFor();
  let previousSeed;
  for(let run=0;run<2;run++){
   const seed=Number(await page.locator('[data-game]').getAttribute('data-seed'));assert.notEqual(seed,previousSeed);previousSeed=seed;
   const bank=await page.evaluate(async ({base,widget,seed})=>(await import(base+widget+'generator.js')).generateGraphSession(seed),{base,widget,seed});
   for(let i=0;i<6;i++){
    const q=bank[i];await page.waitForFunction(i=>Number(document.querySelector('[data-game]').dataset.round)===i,i);
    await page.locator('[data-check]:not(:disabled)').waitFor();assert.equal(await page.locator('.graph-choice svg').count(),4);
    for(const svg of await page.locator('.graph-choice svg').all()){assert.equal(await svg.locator('title').count(),1);assert.equal(await svg.locator('desc').count(),1);assert.equal(await svg.locator('.function-curve').count(),q.target.family==='rational'?2:1);}
    await page.locator('.graph-choice summary').first().focus();await page.keyboard.press('Enter');assert.equal(await page.locator('.graph-choice details').first().evaluate(d=>d.open),true);
    if(run===0&&i===0){
     if(process.env.SCREENSHOT_DIR)await page.locator('[data-game]').screenshot({path:process.env.SCREENSHOT_DIR+'/construye-grafica-escritorio.png'});
     await page.locator('[data-check]').click();await page.getByText('Selecciona una gráfica',{exact:false}).waitFor();
     await page.locator('input[value="g1"]').check();await page.locator('[data-check]').click();await page.locator('[data-feedback]').filter({hasText:'Dato incompatible'}).waitFor();assert.equal(await page.locator('[data-incompatible]').count(),1);
     await page.locator('[data-hint]').click();await page.locator('[data-feedback]').filter({hasText:'Pista:'}).waitFor();
    }
    if(run===0&&i===1){
     await page.locator('input[value="g2"]').check();await page.locator('[data-check]').click();await page.locator('[data-feedback]').filter({hasText:'Puedes volver'}).waitFor();await page.locator('[data-check]').click();
    }else{
     await page.locator('input[value="g0"]').focus();await page.keyboard.press('Space');await page.locator('[data-check]').focus();await page.keyboard.press('Enter');
    }
    await page.locator('[data-next]:visible').waitFor();await ready();assert.equal(await page.locator('[data-feedback] mjx-container').count(),1);assert.equal(await page.locator('[data-choices] input').first().isDisabled(),true);
    // Un evento posterior no puede volver a sumar puntos.
    await page.locator('[data-check]').dispatchEvent('click');await page.locator('[data-next]').click();
   }
   await page.locator('[data-game][data-phase="summary"]').waitFor();await ready();
   assert.match(await page.locator('[data-feedback]').innerText(),run===0?/450 de 600 puntos\. 4 de 6/:/600 de 600 puntos\. 6 de 6/);
   if(run===0)assert.match(await page.locator('[data-feedback]').innerText(),/Pistas utilizadas en 1 reto/);
   await page.locator('[data-next]').click();await page.locator('[data-check]:not(:disabled)').waitFor();
  }
  await page.locator('input[value="g0"]').check();await page.locator('[data-reading-controls]>summary').click();await page.locator('[data-text-size]').selectOption('200');await page.locator('[data-contrast-control]').check();await page.locator('[data-highlight-control]').check();await page.setViewportSize({width:320,height:844});await ready();assert.ok(await page.locator('input[value="g0"]').isChecked());
  if(process.env.SCREENSHOT_DIR)await page.locator('.graph-choice').first().screenshot({path:process.env.SCREENSHOT_DIR+'/construye-grafica-movil.png'});
  await page.locator('[data-reset-reading]').click();
  await page.goto(base+host);await page.locator('iframe').scrollIntoViewIfNeeded();await page.waitForFunction(()=>document.querySelector('iframe')?.contentDocument?.querySelector('[data-choices] input'));
  let frame=page.frames().find(f=>f.url().includes(widget));assert.ok(frame);await ready(frame);
  await frame.locator('input[value="g0"]').check();await page.locator('[data-reading-controls]>summary').click();await page.locator('[data-text-size]').selectOption('200');await page.locator('[data-contrast-control]').check();
  await frame.waitForFunction(()=>document.documentElement.dataset.contrast==='true'&&document.documentElement.dataset.largeText==='true');assert.ok(await frame.locator('input[value="g0"]').isChecked());await ready(frame);assert.ok(await page.evaluate(()=>document.documentElement.scrollWidth<=innerWidth));
  await frame.locator('[data-check]').click();await frame.locator('[data-next]:visible').waitFor();await ready(frame);
  await page.locator('[data-reset-reading]').click();
  const prefix=new URL('prueba-subcarpeta/',base).href;await page.route(prefix+'**',async route=>{const response=await route.fetch({url:route.request().url().replace(prefix,base)});await route.fulfill({response});});
  await page.goto(prefix+host);await page.locator('iframe').scrollIntoViewIfNeeded();await page.waitForFunction(()=>document.querySelector('iframe')?.contentDocument?.querySelector('[data-choices] input'));
  frame=page.frames().find(f=>f.url().startsWith(prefix+widget));assert.ok(frame);await frame.locator('input[value="g0"]').check();await frame.locator('[data-check]').click();await frame.locator('[data-next]:visible').waitFor();await ready(frame);
  assert.deepEqual(errors,[]);console.log('Aprobado: 12 retos / 48 gráficas, teclado, descripciones, pista, reintento, dos errores, puntuaciones 450/600 y 600/600, bloqueo, reinicio, 320 px al 200 %, preferencias del anfitrión, subcarpeta y LaTeX.');
 }finally{await browser.close();}
})().catch(e=>{console.error(e);process.exitCode=1;});

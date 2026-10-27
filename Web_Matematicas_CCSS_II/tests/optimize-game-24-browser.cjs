const assert=require('node:assert/strict');
const {chromium}=require('playwright');
const base=process.env.TEST_URL||'http://127.0.0.1:4173/';
const widget='widgets/games/t02-c-optimiza/';
const host='laboratorios/juegos/t02-c-optimiza.html';
(async()=>{
 const browser=await chromium.launch({headless:true,...(process.env.CHROME_PATH?{executablePath:process.env.CHROME_PATH}:{})});
 try{
  const page=await browser.newPage({viewport:{width:1100,height:900}}),errors=[];
  page.on('pageerror',e=>errors.push(e.message));page.on('response',r=>{if(r.status()>=400&&!r.url().endsWith('favicon.ico'))errors.push(r.status()+' '+r.url());});
  const ready=async(frame=page)=>{await frame.waitForFunction(()=>document.querySelector('.math-status')?.hidden===true);assert.equal(await frame.locator('[data-mml-node="merror"]').count(),0);assert.doesNotMatch(await frame.locator('main').innerText(),/\\[\[(]/);assert.ok(await frame.evaluate(()=>document.documentElement.scrollWidth<=innerWidth));};
  await page.goto(base+widget+'index.html');await page.locator('input[value="correct"]').waitFor();await ready();
  let oldSeed;
  for(let run=0;run<2;run++){
   const seed=Number(await page.locator('[data-game]').getAttribute('data-seed'));assert.notEqual(seed,oldSeed);oldSeed=seed;
   const bank=await page.evaluate(async({base,widget,seed})=>(await import(base+widget+'generator.js')).generateOptimizeSession(seed),{base,widget,seed});
   for(let i=0;i<20;i++){
    const q=bank[i];await page.locator('[data-content-role="activity-progress"]').filter({hasText:'Pregunta '+(i+1)+' de 20'}).waitFor();
    const check=page.getByRole('button',{name:'Comprobar',exact:true});await page.waitForFunction(()=>[...document.querySelectorAll('button')].some(b=>b.textContent==='Comprobar'&&!b.disabled));await ready();
    const expected=[q.prompt,...q.options.map(o=>o.text)].reduce((n,s)=>n+(s.match(/\\\(/g)||[]).length,0);
    assert.equal(await page.locator('fieldset mjx-container').count(),expected);
    if(run===0&&i===0){await check.click();await page.locator('.feedback').filter({hasText:'Selecciona'}).waitFor();await page.locator('input[value="wrong-1"]').check();await check.click();await page.locator('.feedback').filter({hasText:'Revisa'}).waitFor();await page.getByRole('button',{name:'Ver pista',exact:true}).click();await page.locator('.feedback').filter({hasText:'Pista:'}).waitFor();}
    if(run===0&&i===5){await page.locator('input[value="wrong-1"]').check();await check.click();await page.locator('.feedback').filter({hasText:'Puedes intentarlo'}).waitFor();await check.click();}
    else{await page.locator('input[value="correct"]').focus();await page.keyboard.press('Space');await check.focus();await page.keyboard.press('Enter');}
    const next=page.getByRole('button',{name:/Siguiente pregunta|Ver resumen/});await next.waitFor();await ready();assert.ok(await page.locator('fieldset input').first().isDisabled());
    const expectedFeedback=(q.options[run===0&&i===5?1:0].feedback+q.options[0].text+q.explanation).match(/\\\(/g)||[];
    assert.equal(await page.locator('.feedback mjx-container').count(),expectedFeedback.length);
    if(run===0&&i===5&&process.env.SCREENSHOT_DIR)await page.locator('[data-game]').screenshot({path:process.env.SCREENSHOT_DIR+'/optimiza-coste-medio.png'});
    await next.click();
   }
   await page.getByText((run===0?'18':'20')+' de 20 respuestas correctas al primer intento',{exact:false}).waitFor();await ready();
   await page.getByRole('button',{name:'Empezar otra sesión',exact:true}).click();await page.locator('input[value="correct"]').waitFor();await ready();
  }
  await page.locator('input[value="correct"]').check();await page.locator('[data-reading-controls]>summary').click();await page.locator('[data-text-size]').selectOption('200');await page.locator('[data-contrast-control]').check();await page.locator('[data-highlight-control]').check();await page.setViewportSize({width:320,height:844});await ready();assert.ok(await page.locator('input[value="correct"]').isChecked());
  if(process.env.SCREENSHOT_DIR)await page.locator('[data-game]').screenshot({path:process.env.SCREENSHOT_DIR+'/optimiza-movil.png'});
  await page.reload();await page.locator('input[value="correct"]').waitFor();await ready();assert.equal(await page.locator('input[name^="answer-"]:checked').count(),0);
  await page.locator('[data-reading-controls]>summary').click();await page.locator('[data-reset-reading]').click();
  await page.goto(base+host);await page.locator('iframe').scrollIntoViewIfNeeded();await page.waitForFunction(()=>document.querySelector('iframe')?.contentDocument?.querySelector('input[value="correct"]'));
  let frame=page.frames().find(f=>f.url().includes(widget));assert.ok(frame);await ready(frame);await frame.locator('input[value="correct"]').check();
  await page.locator('[data-reading-controls]>summary').click();await page.locator('[data-text-size]').selectOption('200');await page.locator('[data-contrast-control]').check();await frame.waitForFunction(()=>document.documentElement.dataset.largeText==='true'&&document.documentElement.dataset.contrast==='true');await ready(frame);assert.ok(await frame.locator('input[value="correct"]').isChecked());assert.ok(await page.evaluate(()=>document.documentElement.scrollWidth<=innerWidth));
  await frame.getByRole('button',{name:'Comprobar',exact:true}).click();await frame.getByRole('button',{name:'Siguiente pregunta',exact:true}).waitFor();await ready(frame);assert.ok(await frame.locator('.feedback mjx-container').count()>0);
  await page.locator('[data-reset-reading]').click();const prefix=new URL('prueba-subcarpeta/',base).href;
  await page.route(prefix+'**',async route=>{const response=await route.fetch({url:route.request().url().replace(prefix,base)});await route.fulfill({response});});
  await page.goto(prefix+host);await page.locator('iframe').scrollIntoViewIfNeeded();await page.waitForFunction(()=>document.querySelector('iframe')?.contentDocument?.querySelector('input[value="correct"]'));
  frame=page.frames().find(f=>f.url().startsWith(prefix+widget));assert.ok(frame);await ready(frame);await frame.locator('input[value="correct"]').check();await frame.getByRole('button',{name:'Comprobar',exact:true}).click();await frame.getByRole('button',{name:'Siguiente pregunta',exact:true}).waitFor();await ready(frame);
  assert.deepEqual(errors,[]);console.log('Aprobado: 40 decisiones, cuatro historias y cinco pasos, pista/reintento/dos fallos, 18/20 y 20/20, fórmulas contadas, reinicio sin historial, teclado, móvil 320 px al 200 %, iframe con preferencias y subcarpeta.');
 }finally{await browser.close();}
})().catch(e=>{console.error(e);process.exitCode=1;});

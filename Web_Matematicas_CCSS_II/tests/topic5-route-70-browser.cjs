const assert=require('node:assert/strict'),{chromium}=require('playwright');
const base=process.env.TEST_URL||'http://127.0.0.1:4173/',topic='libro/temas/05-sistemas-de-ecuaciones/index.html';
const ids=['t05-a-clasificador-de-sistemas','t05-b-gauss-paso-a-paso','t05-c-elige-el-metodo'];
(async()=>{
 const browser=await chromium.launch({headless:true,executablePath:process.env.CHROME_PATH});
 try{
  const page=await browser.newPage({viewport:{width:390,height:844}}),errors=[];
  page.on('pageerror',e=>errors.push(e.message));page.on('response',r=>{if(r.status()>=400&&!r.url().endsWith('favicon.ico'))errors.push(r.status()+' '+r.url());});
  const math=async(f=page)=>{
   let snapshot;
   for(let attempt=0;attempt<5;attempt++){
    await f.waitForFunction(()=>{
     const status=document.querySelector('.math-status'),game=document.querySelector('[data-game]'),text=document.querySelector('main')?.innerText||'';
     const pending=game&&(!game.dataset.phase||(['answer','working'].includes(game.dataset.phase)&&document.querySelector('[data-check]')?.disabled));
     return status?.hidden&&!/\\[\[(]/.test(text)&&!pending;
    });
    snapshot=await f.evaluate(()=>({text:document.querySelector('main')?.innerText||'',pending:!document.querySelector('.math-status')?.hidden,errors:document.querySelectorAll('[data-mml-node="merror"]').length,overflow:document.documentElement.scrollWidth>innerWidth}));
    if(!snapshot.pending&&!/\\[\[(]/.test(snapshot.text))break;
   }
   assert.equal(snapshot.pending,false);assert.equal(snapshot.errors,0);assert.doesNotMatch(snapshot.text,/\\[\[(]/);assert.equal(snapshot.overflow,false,f.url());
  };
  const preferences=async()=>{await page.locator('[data-reading-controls]>summary').click();await page.locator('[data-text-size]').selectOption('200');await page.locator('[data-contrast-control]').check();await page.locator('[data-highlight-control]').check();await page.setViewportSize({width:320,height:844});};
  const reset=async()=>{await page.locator('[data-reset-reading]').click();await page.setViewportSize({width:390,height:844});};
  const shell=async()=>{await page.locator('#site-header a').first().waitFor();assert.ok(await page.locator('#site-footer').innerText());};
  await page.goto(base+topic);await page.waitForFunction(()=>document.querySelectorAll('[data-topic-index] li').length===11);await math();
  assert.equal((await page.locator('[data-topic-index]').innerText()).match(/Disponible/g).length,11);
  const urls=await page.locator('[data-topic-index] a').evaluateAll(links=>links.map(a=>a.href));
  for(let i=0;i<urls.length;i++){
   await page.goto(urls[i]);const quiz=page.locator('[data-quiz]');await quiz.locator('input').first().waitFor();await math();await shell();
   const correct=await quiz.getAttribute('data-quiz').then(scope=>page.evaluate(async({base,scope})=>(await import(base+'content/activities/catalog.js')).questionsForScope(scope)[0].correct,{base,scope}));
   await quiz.locator('input[value="'+correct+'"]').check();await preferences();await math();assert.ok(await quiz.locator('input[value="'+correct+'"]').isChecked());
   await quiz.getByRole('button',{name:'Comprobar',exact:true}).press('Enter');await quiz.locator('.feedback').filter({hasText:'Correcta'}).waitFor();await math();
   if([5,7,10].includes(i)){const link=page.locator('#juego-recomendado a').first();await link.waitFor();assert.ok((await link.getAttribute('href')).includes(ids[[5,7,10].indexOf(i)]));}
   await reset();await page.locator('a[href="index.html"]').last().click();assert.equal(page.url(),base+topic);
  }
  await page.locator('a[href="../../../test/index.html?tema=t05"]').first().click();await page.locator('[data-quiz] input').first().waitFor();
  const answers=await page.evaluate(async(base)=>(await import(base+'content/activities/catalog.js')).questionsForScope('t05').map(q=>q.correct),base);assert.equal(answers.length,66);
  for(let i=0;i<answers.length;i++){
   await page.locator('[data-quiz] input[value="'+answers[i]+'"]').check();await page.getByRole('button',{name:'Comprobar',exact:true}).click();await page.getByRole('button',{name:/Siguiente pregunta|Ver resumen/}).waitFor();await math();await page.getByRole('button',{name:/Siguiente pregunta|Ver resumen/}).click();
  }
  await page.getByText('66 de 66 respuestas correctas',{exact:false}).waitFor();
  await page.goto(base+topic);await page.getByRole('link',{name:'Tarjetas de sistemas',exact:true}).click();
  for(let i=1;i<=66;i++){
   await page.getByText('Tarjeta '+i+' de 66',{exact:true}).waitFor();await page.getByRole('button',{name:'Mostrar respuesta',exact:true}).click();await math();if(i<66)await page.getByRole('button',{name:'Siguiente',exact:true}).click();
  }
  assert.ok(await page.getByRole('button',{name:'Siguiente',exact:true}).isDisabled());
  for(let i=0;i<3;i++){
   await page.goto(base+topic+'#ruta-juegos');const link=page.locator('#ruta-juegos a[href$="'+ids[i]+'.html"]');await link.focus();await link.press('Enter');await shell();await page.locator('iframe').scrollIntoViewIfNeeded();
   await page.waitForFunction(()=>document.querySelector('iframe')?.contentDocument?.querySelector('[data-check]:not(:disabled)'));
   const frame=page.frames().find(f=>f.url().includes('/'+ids[i]+'/'));assert.ok(frame);await math(frame);
   let chosen;
   if(i===0){
    const c=await frame.evaluate(async()=>{const d=document.querySelector('[data-game]').dataset;return (await import('./generator.js')).generateClassifier(Number(d.seed))[0];});
    chosen=frame.locator('[name="answer"][value="'+c.kind+'"]');await chosen.check();
   }else if(i===1){
    let finished=false,steps=0;
    while(!finished){
     const d=await frame.evaluate(async()=>{const m=await import('./model.js'),matrix=JSON.parse(document.querySelector('[data-game]').dataset.snapshot);return {done:m.isEchelon(matrix),op:m.suggestOperation(matrix)};});
     finished=d.done;if(finished)break;assert.ok(d.op);assert.ok(++steps<15);
     await frame.locator('[data-operation]').selectOption(d.op.kind);await frame.locator('[data-target]').selectOption(String(d.op.target));
     if(d.op.source!==undefined)await frame.locator('[data-source]').selectOption(String(d.op.source));
     if(d.op.scalar)await frame.locator('[data-factor]').fill(d.op.scalar.numerator+'/'+d.op.scalar.denominator);
     await frame.locator('[data-apply]').press('Enter');await frame.locator('[data-check]:not(:disabled)').waitFor();
    }
    const c=await frame.evaluate(async()=>{const m=await import('./model.js'),d=document.querySelector('[data-game]').dataset;return m.generateGaussGame(Number(d.seed))[0];});
    chosen=frame.locator('[name="kind"][value="'+c.details.kind+'"]');await chosen.check();
   }else{
    const c=await frame.evaluate(async()=>{const m=await import('./model.js'),d=document.querySelector('[data-game]').dataset;return m.generateMethods(Number(d.seed))[0];});
    chosen=frame.locator('[name="answer"][value="'+c.options.find(o=>o.valid).id+'"]');await chosen.check();
   }
   const snapshot=await frame.locator('[data-game]').getAttribute('data-snapshot');
   await preferences();await frame.waitForFunction(()=>document.documentElement.dataset.largeText==='true'&&document.documentElement.dataset.contrast==='true'&&document.documentElement.dataset.highlight==='true');
   assert.ok(await chosen.isChecked());assert.equal(await frame.locator('[data-game]').getAttribute('data-snapshot'),snapshot);
   await math(frame);await frame.locator('[data-check]:not(:disabled)').press('Enter');await frame.waitForFunction(()=>document.querySelector('[data-game]').dataset.score==='100');await math(frame);
   if(i===2&&process.env.SCREENSHOT_DIR)await frame.locator('[data-game]').screenshot({path:process.env.SCREENSHOT_DIR+'/sistemas-ruta-juego.png'});
   await reset();await page.getByRole('link',{name:'Recorrido del tema 5',exact:true}).click();assert.equal(page.url(),base+topic+'#ruta-juegos');
   await page.goto(base+'widgets/games/'+ids[i]+'/index.html');await page.locator('[data-check]:not(:disabled)').waitFor();await math();assert.equal(await page.locator('[data-game]').getAttribute('data-score'),'0');await page.getByRole('link',{name:'Recorrido del tema 5',exact:true}).click();assert.ok(page.url().startsWith(base+topic));
  }
  console.log('Verificados: once lecciones, test 66/66, 66 tarjetas y tres widgets. Comprobando subcarpeta.');
  const prefix=new URL('prueba-subcarpeta/',base).href;await page.route(prefix+'**',async route=>{const response=await route.fetch({url:route.request().url().replace(prefix,base)});await route.fulfill({response});});
  await page.goto(prefix+topic+'#ruta-juegos');await page.locator('#ruta-juegos a').first().click();
  for(let i=0;i<3;i++){
   assert.equal(page.url(),prefix+'laboratorios/juegos/'+ids[i]+'.html');await page.locator('iframe').scrollIntoViewIfNeeded();await page.waitForFunction(()=>document.querySelector('iframe')?.contentDocument?.querySelector('[data-check]:not(:disabled)'));const f=page.frames().find(f=>f.url().startsWith(prefix+'widgets/games/'+ids[i]+'/'));assert.ok(f);await math(f);
   const nav=page.getByRole('navigation',{name:'Recorrido entre juegos de sistemas'});
   if(i>0){
    const previous=nav.getByRole('link',{name:/Juego anterior:/});
    assert.equal(await previous.getAttribute('href'),ids[i-1]+'.html');
    await previous.click();assert.equal(page.url(),prefix+'laboratorios/juegos/'+ids[i-1]+'.html');await page.getByRole('navigation',{name:'Recorrido entre juegos de sistemas'}).getByRole('link',{name:/Siguiente juego:/}).click();assert.equal(page.url(),prefix+'laboratorios/juegos/'+ids[i]+'.html');
   }
   if(i<2)await nav.getByRole('link',{name:/Siguiente juego:/}).click();else await nav.getByRole('link',{name:'Volver al repaso de sistemas',exact:true}).click();
  }
  assert.equal(page.url(),prefix+topic+'#repaso');await math();
  const statuses=await page.evaluate(async base=>(await(await fetch(base+'config/editorial.json')).json()).pages,base);assert.equal(statuses.t05,'partial');for(const id of ids)assert.equal(statuses['game-'+id],'reviewed');
  await page.goto(base+topic+'#ruta-juegos');await preferences();await math();if(process.env.SCREENSHOT_DIR)await page.locator('#ruta-juegos').screenshot({path:process.env.SCREENSHOT_DIR+'/sistemas-ruta-movil.png'});await reset();assert.deepEqual(errors,[]);
  console.log('Aprobado: once lecciones y respuestas conservadas al 200 %, test 66/66, 66 tarjetas, tres juegos insertados e independientes, ajustes y puntuación, retornos, cadena de juegos en subcarpeta, estados editoriales y LaTeX.');
 }finally{for(const context of browser.contexts())for(const page of context.pages())await page.unrouteAll({behavior:'wait'});await browser.close();}
})().catch(e=>{console.error(e);process.exitCode=1;});

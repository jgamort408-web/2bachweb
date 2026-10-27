const assert=require('node:assert/strict'),{chromium}=require('playwright');
const base=process.env.TEST_URL||'http://127.0.0.1:4173/',topic='libro/temas/04-matrices-y-determinantes/',lesson=topic+'11-ecuaciones-matriciales.html';
(async()=>{
 const browser=await chromium.launch({headless:true,executablePath:process.env.CHROME_PATH});
 try{
 const page=await browser.newPage({viewport:{width:1280,height:960}}),errors=[];
 page.on('pageerror',e=>errors.push(e.message));page.on('response',r=>{if(r.status()>=400&&!r.url().endsWith('favicon.ico'))errors.push(r.status()+' '+r.url());});
 const output=page.locator('[data-eq-output]'),editor=page.locator('[data-matrix-equations]');
 const math=async()=>{await page.waitForFunction(()=>document.querySelector('.math-status')?.hidden===true&&!/\\[\[(]/.test(document.querySelector('main').innerText));assert.equal(await page.locator('[data-mml-node="merror"]').count(),0);assert.ok(await page.evaluate(()=>document.documentElement.scrollWidth<=innerWidth),'desbordamiento');};
 const choose=async(key,v)=>{await page.locator('[data-eq-'+key+']').selectOption({value:String(v)});};
 const edit=async(selector,v)=>{await page.locator(selector).fill(String(v));await page.locator(selector).press('Tab');};
 const result=async(det)=>{
  const expected=await page.evaluate(()=>{const read=name=>{const m=[];document.querySelectorAll('[data-eq-entry="'+name+'"]').forEach(e=>{const i=Number(e.dataset.row),j=Number(e.dataset.col);m[i]??=[];m[i][j]=e.valueAsNumber;});return m;};return JSON.stringify({a:read('A'),b:read('B'),k:document.querySelector('[data-eq-scalar]').valueAsNumber,side:document.querySelector('[data-eq-side]').value});});
  await page.waitForFunction(({det,expected})=>{const d=document.querySelector('[data-eq-output]').dataset;return d.det===String(det)&&d.snapshot===expected;},{det,expected});await math();assert.equal(await output.getAttribute('data-status'),det===0?'singular':'unique');assert.equal(await page.locator('[data-eq-solution]').count(),det===0?0:1);
 };
 await page.goto(base+lesson+'#explorador');await output.locator('mjx-container').first().waitFor();await result(3);assert.ok(await page.locator('[data-eq-solution] [data-mml-node="mfrac"]').count()>0);
 await page.locator('[data-eq-check] summary').click();await math();assert.match(await page.locator('[data-eq-check]').innerText(),/todas las entradas/);
 if(process.env.SCREENSHOT_DIR)await editor.screenshot({path:process.env.SCREENSHOT_DIR+'/ecuaciones-matriciales-escritorio.png'});
 for(const [key,det]of [['left',3],['right',3],['rectangular',3],['shifted',0],['three',3]]){await choose('preset',key);await result(det);if(det===0)assert.match(await output.innerText(),/hay que estudiar/);else{await page.locator('[data-eq-check] summary').click();await math();}}
 await choose('preset','left');
 for(const side of ['left','right']){await choose('side',side);for(let k=-3;k<=3;k++){await edit('[data-eq-scalar]',k);await result((k+2)**2-1);}}
 await edit('[data-eq-scalar]',4);assert.equal(await page.locator('[data-eq-scalar]').getAttribute('aria-invalid'),'true');await edit('[data-eq-scalar]',0);await result(3);
 const entry='[data-eq-entry="A"][data-row="0"][data-col="0"]';
 const saved=await output.getAttribute('data-snapshot');
 for(const value of ['','.5','7']){await edit(entry,value);assert.equal(await page.locator(entry).getAttribute('aria-invalid'),'true');assert.equal(await output.getAttribute('data-snapshot'),saved);}
 await edit(entry,3);await result(5);
 const rhs='[data-eq-entry="B"][data-row="0"][data-col="0"]';await edit(rhs,10);assert.equal(await page.locator(rhs).getAttribute('aria-invalid'),'true');await edit(rhs,-9);await result(5);assert.equal(await page.locator('[aria-invalid]').count(),0);
 await choose('preset','rectangular');await result(3);await choose('side','right');await result(3);assert.deepEqual(await page.locator('[data-eq-entry="B"]').evaluateAll(nodes=>nodes.map(n=>n.valueAsNumber)),[1,0,0,3,3,6]);
 await choose('width',1);await result(3);assert.equal(await page.locator('[data-eq-entry="B"]').count(),2);await choose('side','left');await result(3);
 await choose('size',3);await result(0);assert.equal(await page.locator('[data-eq-entry="A"]').count(),9);assert.equal(await page.locator('[data-eq-entry="B"]').count(),3);
 await edit('[data-eq-entry="A"][data-row="2"][data-col="2"]',1);await result(3);
 await page.locator('[data-eq-generate]').click();
 const generated=await page.evaluate(async base=>{const m=await import(base+'content/models/matrix-equations.js');const pair=m.generatedEquation(Number(document.querySelector('[data-matrix-equations]').dataset.seed),3,1,'left');return {...pair,det:m.solveMatrixEquation(pair.a,pair.b).det};},base);
 await result(generated.det);for(const name of ['A','B'])assert.deepEqual(await page.locator('[data-eq-entry="'+name+'"]').evaluateAll(nodes=>nodes.map(n=>n.valueAsNumber)),generated[name.toLowerCase()].flat());
 await choose('preset','three');await result(3);
  const quiz=page.locator('[data-quiz="t04-e11"]');await quiz.locator('input[value="correct"]').check();await page.locator('[data-reading-controls]>summary').click();await page.locator('[data-text-size]').selectOption('200');await page.locator('[data-contrast-control]').check();await page.locator('[data-highlight-control]').check();await page.setViewportSize({width:320,height:844});await math();assert.ok(await quiz.locator('input[value="correct"]').isChecked());assert.equal(await page.locator('[data-eq-size]').inputValue(),'3');
  if(process.env.SCREENSHOT_DIR)await editor.screenshot({path:process.env.SCREENSHOT_DIR+'/ecuaciones-matriciales-movil.png'});
  for(let i=0;i<6;i++){
   await quiz.getByText('Pregunta '+(i+1)+' de 6 · Sin límite de tiempo',{exact:true}).waitFor();
   if(i===0){await quiz.locator('input[value="wrong-1"]').check();await quiz.getByRole('button',{name:'Comprobar',exact:true}).click();await quiz.getByRole('button',{name:'Ver pista'}).click();await quiz.locator('.feedback').filter({hasText:'Pista:'}).waitFor();}
   await quiz.locator('input[value="correct"]').check();await quiz.getByRole('button',{name:'Comprobar',exact:true}).press('Enter');await quiz.getByRole('button',{name:/Siguiente pregunta|Ver resumen/}).waitFor();await math();await quiz.getByRole('button',{name:/Siguiente pregunta|Ver resumen/}).click();
  }
  await quiz.getByText('5 de 6 respuestas correctas',{exact:false}).waitFor();const deck=page.locator('[data-flashcards]');for(let i=1;i<=6;i++){await deck.getByText('Tarjeta '+i+' de 6',{exact:true}).waitFor();await deck.getByRole('button',{name:'Mostrar respuesta',exact:true}).click();await math();if(i<6)await deck.getByRole('button',{name:'Siguiente',exact:true}).click();}




 await page.locator('[data-reset-reading]').click();await page.reload();await output.locator('mjx-container').first().waitFor();await result(3);assert.equal(await page.locator('[data-eq-preset]').inputValue(),'left');assert.equal(await quiz.locator('input:checked').count(),0);
 await page.getByRole('link',{name:'Índice de matrices y determinantes',exact:true}).click();await page.waitForFunction(()=>document.querySelectorAll('[data-topic-index] li').length===12);const index=await page.locator('[data-topic-index]').innerText();assert.equal((index.match(/Disponible/g)||[]).length,12);assert.equal((index.match(/En preparación/g)||[]).length,0);
 await page.getByRole('link',{name:'Test disponible de matrices',exact:true}).click();await page.locator('[data-quiz] input').first().waitFor();await math();assert.match(await page.locator('[data-content-role="activity-progress"]').innerText(),/1 de 72/);
 await page.goto(base+'tarjetas/index.html?tema=t04');await page.getByText('Tarjeta 1 de 72',{exact:true}).waitFor();
 const prefix=new URL('prueba-subcarpeta/',base).href;await page.route(prefix+'**',async route=>{const response=await route.fetch({url:route.request().url().replace(prefix,base)});await route.fulfill({response});});await page.goto(prefix+lesson+'#explorador');await output.locator('mjx-container').first().waitFor();await result(3);await choose('preset','shifted');await result(0);assert.ok(await page.locator('#site-header a').count()>0);assert.ok(await page.locator('#site-footer').innerText());assert.deepEqual(errors,[]);
 console.log('Aprobado: cinco bases, ambos lados, k de −3 a 3, dimensiones, fracciones, comprobación original, singularidad, validación y variantes; test 5/6 y seis tarjetas; móvil 320/200 %, fórmulas, recarga, t04 72/72, índice 12/12 y subcarpeta.');
 }finally{await browser.close();}
})().catch(e=>{console.error(e);process.exitCode=1;});

const assert=require('node:assert/strict'),{chromium}=require('playwright');
const base=process.env.TEST_URL||'http://127.0.0.1:4173/',topic='libro/temas/04-matrices-y-determinantes/',lesson=topic+'03-producto-de-matrices.html';
(async()=>{
 const browser=await chromium.launch({headless:true,executablePath:process.env.CHROME_PATH});
 try{
 const page=await browser.newPage({viewport:{width:1280,height:960}}),errors=[];
 page.on('pageerror',e=>errors.push(e.message));page.on('response',r=>{if(r.status()>=400&&!r.url().endsWith('favicon.ico'))errors.push(r.status()+' '+r.url());});
 const math=async()=>{await page.waitForFunction(()=>document.querySelector('.math-status')?.hidden===true);assert.equal(await page.locator('[data-mml-node="merror"]').count(),0);assert.doesNotMatch(await page.locator('main').innerText(),/\\[\[(]/);assert.ok(await page.evaluate(()=>document.documentElement.scrollWidth<=innerWidth),'desbordamiento');};
 const output=page.locator('[data-product-output]'),editor=page.locator('[data-matrix-product]');
 const choose=async(selector,value)=>{await page.locator(selector).selectOption(String(value));await math();};
 const edit=async(selector,value)=>{await page.locator(selector).fill(value);await page.locator(selector).press('Tab');await math();};
 const detail=async()=>page.locator('[data-product-detail]').textContent();
 const steps=async()=>{await page.locator('[data-product-steps] summary').click();await math();return page.locator('[data-product-steps] li').evaluateAll(nodes=>nodes.map(n=>n.textContent.replace(/\s/g,'').replaceAll('−','-')));};
 const dim=async(id,kind,value)=>choose('[data-matrix="'+id+'"][data-dimension="'+kind+'"]',value);
 await page.goto(base+lesson+'#explorador');await output.locator('mjx-container').first().waitFor();await math();assert.ok(await page.locator('main mjx-container').count()>25);
 assert.equal(await output.getAttribute('data-compatible'),'true');assert.equal(await page.locator('[data-product-cell] option').count(),4);
 assert.ok((await steps())[0].endsWith('=-3.'));await choose('[data-product-cell]','2,1');assert.match(await detail(),/fila 2 de A y columna 1 de B/);assert.equal(await page.locator('.product-selected').count(),6);
 if(process.env.SCREENSHOT_DIR)await editor.screenshot({path:process.env.SCREENSHOT_DIR+'/producto-matrices-escritorio.png'});
 await choose('[data-product-order]','ba');assert.equal(await page.locator('[data-product-cell] option').count(),9);await choose('[data-product-cell]','3,2');assert.match(await detail(),/fila 3 de B y columna 2 de A/);assert.ok((await steps())[7].endsWith('=18.'));
 await choose('[data-product-preset]','order');assert.ok((await steps())[0].endsWith('=2.'));await choose('[data-product-order]','ba');assert.ok((await steps())[0].endsWith('=1.'));
 await choose('[data-product-preset]','zero');assert.ok((await steps()).every(t=>t.endsWith('=0.')));
 await choose('[data-product-preset]','sales');assert.ok((await steps())[1].endsWith('=98.'));await choose('[data-product-order]','ba');assert.equal(await output.getAttribute('data-compatible'),'false');assert.equal(await page.locator('[data-product-steps]').count(),0);assert.ok(await page.locator('[data-product-cell]').isHidden());assert.equal(await page.locator('.product-selected').count(),0);
 await choose('[data-product-preset]','rectangular');
 const target='[data-cell="a"][data-row="0"][data-col="0"]';
 for(const invalid of ['','.5','21']){await edit(target,invalid);assert.equal(await page.locator(target).getAttribute('aria-invalid'),'true');assert.match(await page.locator('[data-product-status]').innerText(),/último valor válido/);}
 await edit(target,'-4');assert.equal(await page.locator('[aria-invalid="true"]').count(),0);assert.equal(await page.locator('[data-product-preset]').inputValue(),'custom');
 await dim('a','cols',2);assert.equal(await output.getAttribute('data-compatible'),'false');await dim('b','rows',2);assert.equal(await output.getAttribute('data-compatible'),'true');
 for(const id of ['a','b'])for(const kind of ['rows','cols'])await dim(id,kind,1);
 assert.equal(await page.locator('[data-cell="a"]').count(),1);await edit(target,'-2');await edit('[data-cell="b"][data-row="0"][data-col="0"]','3');assert.ok((await steps())[0].endsWith('=-6.'));
 for(const id of ['a','b'])for(const kind of ['rows','cols'])await dim(id,kind,3);
 await page.locator('[data-generate-product]').click();await math();
 const generated=await page.evaluate(async base=>(await import(base+'content/models/matrix-product.js')).productSession(Number(document.querySelector('[data-matrix-product]').dataset.seed),3,3,3),base);
 for(const id of ['a','b'])assert.deepEqual(await page.locator('[data-cell="'+id+'"]').evaluateAll(nodes=>nodes.map(n=>n.valueAsNumber)),generated[id].flat());
  const quiz=page.locator('[data-quiz="t04-e03"]');await quiz.locator('input[value="correct"]').check();await page.locator('[data-reading-controls]>summary').click();await page.locator('[data-text-size]').selectOption('200');await page.locator('[data-contrast-control]').check();await page.locator('[data-highlight-control]').check();await page.setViewportSize({width:320,height:844});await math();assert.ok(await quiz.locator('input[value="correct"]').isChecked());assert.equal(await page.locator('[data-product-order]').inputValue(),'ab');
  await page.locator('[data-product-steps] summary').click();if(process.env.SCREENSHOT_DIR)await editor.screenshot({path:process.env.SCREENSHOT_DIR+'/producto-matrices-movil.png'});
  for(let i=0;i<6;i++){
   await quiz.getByText('Pregunta '+(i+1)+' de 6 · Sin límite de tiempo',{exact:true}).waitFor();
   if(i===0){await quiz.locator('input[value="wrong-1"]').check();await quiz.getByRole('button',{name:'Comprobar',exact:true}).click();await quiz.getByRole('button',{name:'Ver pista'}).click();await quiz.locator('.feedback').filter({hasText:'Pista:'}).waitFor();}
   await quiz.locator('input[value="correct"]').check();await quiz.getByRole('button',{name:'Comprobar',exact:true}).press('Enter');await quiz.getByRole('button',{name:/Siguiente pregunta|Ver resumen/}).waitFor();await math();await quiz.getByRole('button',{name:/Siguiente pregunta|Ver resumen/}).click();
  }
  await quiz.getByText('5 de 6 respuestas correctas',{exact:false}).waitFor();const deck=page.locator('[data-flashcards]');for(let i=1;i<=6;i++){await deck.getByText('Tarjeta '+i+' de 6',{exact:true}).waitFor();await deck.getByRole('button',{name:'Mostrar respuesta',exact:true}).click();await math();if(i<6)await deck.getByRole('button',{name:'Siguiente',exact:true}).click();}

 await page.locator('[data-reset-reading]').click();await page.reload();await output.locator('mjx-container').first().waitFor();await math();assert.equal(await page.locator('[data-product-preset]').inputValue(),'rectangular');assert.equal(await page.locator('[data-cell="a"]').count(),6);assert.equal(await quiz.locator('input:checked').count(),0);
 await page.getByRole('link',{name:'Índice de matrices y determinantes',exact:true}).click();await page.waitForFunction(()=>document.querySelectorAll('[data-topic-index] li').length===12);const index=await page.locator('[data-topic-index]').innerText();assert.equal((index.match(/Disponible/g)||[]).length,12);assert.equal((index.match(/En preparación/g)||[]).length,0);
 await page.getByRole('link',{name:'Test disponible de matrices',exact:true}).click();await page.locator('[data-quiz] input').first().waitFor();await math();assert.match(await page.locator('[data-content-role="activity-progress"]').innerText(),/1 de 72/);
 await page.goto(base+'tarjetas/index.html?tema=t04');await page.getByText('Tarjeta 1 de 72',{exact:true}).waitFor();
 const prefix=new URL('prueba-subcarpeta/',base).href;await page.route(prefix+'**',async route=>{const response=await route.fetch({url:route.request().url().replace(prefix,base)});await route.fulfill({response});});await page.goto(prefix+lesson+'#explorador');await output.locator('mjx-container').first().waitFor();await math();await choose('[data-product-order]','ba');assert.equal(await page.locator('[data-product-cell] option').count(),9);assert.ok(await page.locator('#site-header a').count()>0);assert.ok(await page.locator('#site-footer').innerText());assert.deepEqual(errors,[]);
 console.log('Aprobado: AB/BA, cuatro ejemplos, casillas y pasos, incompatibles, 1×1 y 3×3, edición y variantes, test 5/6 y seis tarjetas, móvil 320/200 %, preferencias, recarga, t04 72/72, índice 12/12 y subcarpeta.');
 }finally{await browser.close();}
})().catch(e=>{console.error(e);process.exitCode=1;});

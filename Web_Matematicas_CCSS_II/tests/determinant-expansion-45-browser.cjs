const assert=require('node:assert/strict'),{chromium}=require('playwright');
const base=process.env.TEST_URL||'http://127.0.0.1:4173/',topic='libro/temas/04-matrices-y-determinantes/',lesson=topic+'08-desarrollo-de-un-determinante.html';
(async()=>{
 const browser=await chromium.launch({headless:true,executablePath:process.env.CHROME_PATH});
 try{
 const page=await browser.newPage({viewport:{width:1280,height:960}}),errors=[];
 page.on('pageerror',e=>errors.push(e.message));page.on('response',r=>{if(r.status()>=400&&!r.url().endsWith('favicon.ico'))errors.push(r.status()+' '+r.url());});
 const output=page.locator('[data-exp-output]'),editor=page.locator('[data-det-expansion]');
 const math=async()=>{await page.waitForFunction(()=>document.querySelector('.math-status')?.hidden===true&&!/\\[\[(]/.test(document.querySelector('main').innerText));assert.equal(await page.locator('[data-mml-node="merror"]').count(),0);assert.ok(await page.evaluate(()=>document.documentElement.scrollWidth<=innerWidth),'desbordamiento');};
 const choose=async(key,v)=>{await page.locator('[data-exp-'+key+']').selectOption({value:String(v)});};
 const result=async(value,axis='rows',index=0,term=0)=>{await page.waitForFunction(({value,axis,index,term})=>{const d=document.querySelector('[data-exp-output]').dataset;return d.value===String(value)&&d.axis===axis&&d.index===String(index)&&d.term===String(term);},{value,axis,index,term});await math();};
 await page.goto(base+lesson+'#explorador');await output.locator('mjx-container').first().waitFor();await result(18);
 await choose('term',1);await result(18,'rows',0,1);assert.match(await page.locator('[data-exp-detail]').innerText(),/16/);assert.equal(await page.locator('.exp-retained').count(),4);
 if(process.env.SCREENSHOT_DIR)await editor.screenshot({path:process.env.SCREENSHOT_DIR+'/desarrollo-determinante-escritorio.png'});
 for(const [preset,n,value]of [['three',3,18],['two',2,11],['four',4,-36],['singular',3,0]]){
  await choose('preset',preset);
  for(const axis of ['rows','cols'])for(let index=0;index<n;index++){
   await choose('axis',axis);await choose('index',index);
   for(let term=0;term<n;term++){await choose('term',term);await result(value,axis,index,term);assert.equal(await page.locator('.exp-retained').count(),(n-1)**2);assert.match(await page.locator('[data-exp-detail]').innerText(),/Se elimina la fila/);}
  }
 }
 await choose('preset','four');await choose('axis','rows');await choose('index',0);await choose('term',0);await result(-36);assert.match(await output.innerText(),/El coeficiente es cero/);
 await choose('term',1);await result(-36,'rows',0,1);assert.match(await output.innerText(),/menor 3×3/);
 const entry='[data-exp-entry][data-row="0"][data-col="1"]';
 for(const value of ['','.5','10']){await page.locator(entry).fill(value);await page.locator(entry).press('Tab');assert.equal(await page.locator(entry).getAttribute('aria-invalid'),'true');await result(-36,'rows',0,1);}
 await page.locator(entry).fill('-2');await page.locator(entry).press('Tab');await result(36,'rows',0,1);assert.equal(await page.locator('[aria-invalid]').count(),0);
 await choose('size',2);await result(2,'rows',0,1);assert.equal(await page.locator('[data-exp-entry]').count(),4);
 await choose('size',3);await result(0,'rows',0,1);assert.equal(await page.locator('[data-exp-entry]').count(),9);
 await page.locator('[data-exp-generate]').click();await math();
 const generated=await page.evaluate(async base=>(await import(base+'content/models/determinant-expansion.js')).generatedExpansionMatrix(Number(document.querySelector('[data-det-expansion]').dataset.seed),3),base);
 assert.deepEqual(await page.locator('[data-exp-entry]').evaluateAll(nodes=>nodes.map(n=>n.valueAsNumber)),generated.flat());
  const quiz=page.locator('[data-quiz="t04-e08"]');await quiz.locator('input[value="correct"]').check();await page.locator('[data-reading-controls]>summary').click();await page.locator('[data-text-size]').selectOption('200');await page.locator('[data-contrast-control]').check();await page.locator('[data-highlight-control]').check();await page.setViewportSize({width:320,height:844});await math();assert.ok(await quiz.locator('input[value="correct"]').isChecked());assert.equal(await page.locator('[data-exp-size]').inputValue(),'3');
  if(process.env.SCREENSHOT_DIR)await editor.screenshot({path:process.env.SCREENSHOT_DIR+'/desarrollo-determinante-movil.png'});
  for(let i=0;i<6;i++){
   await quiz.getByText('Pregunta '+(i+1)+' de 6 · Sin límite de tiempo',{exact:true}).waitFor();
   if(i===0){await quiz.locator('input[value="wrong-1"]').check();await quiz.getByRole('button',{name:'Comprobar',exact:true}).click();await quiz.getByRole('button',{name:'Ver pista'}).click();await quiz.locator('.feedback').filter({hasText:'Pista:'}).waitFor();}
   await quiz.locator('input[value="correct"]').check();await quiz.getByRole('button',{name:'Comprobar',exact:true}).press('Enter');await quiz.getByRole('button',{name:/Siguiente pregunta|Ver resumen/}).waitFor();await math();await quiz.getByRole('button',{name:/Siguiente pregunta|Ver resumen/}).click();
  }
  await quiz.getByText('5 de 6 respuestas correctas',{exact:false}).waitFor();const deck=page.locator('[data-flashcards]');for(let i=1;i<=6;i++){await deck.getByText('Tarjeta '+i+' de 6',{exact:true}).waitFor();await deck.getByRole('button',{name:'Mostrar respuesta',exact:true}).click();await math();if(i<6)await deck.getByRole('button',{name:'Siguiente',exact:true}).click();}


 await page.locator('[data-reset-reading]').click();await page.reload();await output.locator('mjx-container').first().waitFor();await result(18);assert.equal(await page.locator('[data-exp-preset]').inputValue(),'three');assert.equal(await quiz.locator('input:checked').count(),0);
 await page.getByRole('link',{name:'Índice de matrices y determinantes',exact:true}).click();await page.waitForFunction(()=>document.querySelectorAll('[data-topic-index] li').length===12);const index=await page.locator('[data-topic-index]').innerText();assert.equal((index.match(/Disponible/g)||[]).length,12);assert.equal((index.match(/En preparación/g)||[]).length,0);
 await page.getByRole('link',{name:'Test disponible de matrices',exact:true}).click();await page.locator('[data-quiz] input').first().waitFor();await math();assert.match(await page.locator('[data-content-role="activity-progress"]').innerText(),/1 de 72/);
 await page.goto(base+'tarjetas/index.html?tema=t04');await page.getByText('Tarjeta 1 de 72',{exact:true}).waitFor();
 const prefix=new URL('prueba-subcarpeta/',base).href;await page.route(prefix+'**',async route=>{const response=await route.fetch({url:route.request().url().replace(prefix,base)});await route.fulfill({response});});await page.goto(prefix+lesson+'#explorador');await output.locator('mjx-container').first().waitFor();await result(18);await choose('preset','four');await result(-36);assert.ok(await page.locator('#site-header a').count()>0);assert.ok(await page.locator('#site-footer').innerText());assert.deepEqual(errors,[]);
 console.log('Aprobado: cuatro bases; cada fila, columna y término; ceros, orden 4, edición inválida, tamaño, variantes; test 5/6 y seis tarjetas; móvil 320/200 %, fórmulas, recarga, t04 72/72, índice 12/12 y subcarpeta.');
 }finally{await browser.close();}
})().catch(e=>{console.error(e);process.exitCode=1;});

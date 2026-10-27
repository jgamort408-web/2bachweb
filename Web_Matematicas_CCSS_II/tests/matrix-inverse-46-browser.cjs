const assert=require('node:assert/strict'),{chromium}=require('playwright');
const base=process.env.TEST_URL||'http://127.0.0.1:4173/',topic='libro/temas/04-matrices-y-determinantes/',lesson=topic+'09-matriz-inversa-y-matriz-adjunta.html';
(async()=>{
 const browser=await chromium.launch({headless:true,executablePath:process.env.CHROME_PATH});
 try{
 const page=await browser.newPage({viewport:{width:1280,height:960}}),errors=[];
 page.on('pageerror',e=>errors.push(e.message));page.on('response',r=>{if(r.status()>=400&&!r.url().endsWith('favicon.ico'))errors.push(r.status()+' '+r.url());});
 const output=page.locator('[data-inv-output]'),editor=page.locator('[data-matrix-inverse]');
 const math=async()=>{await page.waitForFunction(()=>document.querySelector('.math-status')?.hidden===true&&!/\\[\[(]/.test(document.querySelector('main').innerText));assert.equal(await page.locator('[data-mml-node="merror"]').count(),0);assert.ok(await page.evaluate(()=>document.documentElement.scrollWidth<=innerWidth),'desbordamiento');};
 const choose=async(key,v)=>{await page.locator('[data-inv-'+key+']').selectOption({value:String(v)});};
 const result=async(det,row=0,col=0)=>{await page.waitForFunction(({det,row,col})=>{const d=document.querySelector('[data-inv-output]').dataset;return d.det===String(det)&&d.row===String(row)&&d.col===String(col);},{det,row,col});await math();assert.equal(await output.getAttribute('data-invertible'),String(det!==0));assert.equal(await page.locator('[data-inv-result]').count(),det===0?0:1);};
 await page.goto(base+lesson+'#explorador');await output.locator('mjx-container').first().waitFor();await result(3);
 assert.ok(await page.locator('[data-inv-result] [data-mml-node="mfrac"]').count()>0);
 for(const [preset,n,det]of [['two',2,3],['three',3,3],['singular',2,0],['negative',2,-2]]){
  await choose('preset',preset);
  await page.waitForFunction(n=>document.querySelectorAll('[data-inv-entry]').length===n*n,n);
  for(let row=0;row<n;row++)for(let col=0;col<n;col++){
   await choose('row',row);await choose('col',col);await result(det,row,col);
   assert.equal(await page.locator('.inv-retained').count(),(n-1)**2);
   assert.match(await page.locator('[data-inv-detail]').innerText(),new RegExp('posición \\('+String(col+1)+', '+String(row+1)+'\\)'));
  }
  await page.locator('[data-inv-checks] summary').click();await math();
  if(det===0)assert.match(await page.locator('[data-inv-checks]').innerText(),/No podemos dividir/);
  else assert.match(await page.locator('[data-inv-checks]').innerText(),/Al dividir los productos/);
 }
 await choose('preset','three');await choose('row',0);await choose('col',1);await result(3,0,1);
 await page.locator('[data-inv-checks] summary').click();
 if(process.env.SCREENSHOT_DIR)await editor.screenshot({path:process.env.SCREENSHOT_DIR+'/matriz-inversa-escritorio.png'});
 const entry='[data-inv-entry][data-row="0"][data-col="0"]';
 for(const value of ['','.5','10']){await page.locator(entry).fill(value);await page.locator(entry).press('Tab');assert.equal(await page.locator(entry).getAttribute('aria-invalid'),'true');await result(3,0,1);}
 await page.locator(entry).fill('2');await page.locator(entry).press('Tab');await result(4,0,1);assert.equal(await page.locator('[aria-invalid]').count(),0);
 await choose('size',2);await result(2,0,1);assert.equal(await page.locator('[data-inv-entry]').count(),4);
 await choose('size',3);await result(0,0,1);assert.equal(await page.locator('[data-inv-entry]').count(),9);
 // Recuperar la inversa al introducir un pivote en la fila nueva.
 await page.locator('[data-inv-entry][data-row="2"][data-col="2"]').fill('1');await page.locator('[data-inv-entry][data-row="2"][data-col="2"]').press('Tab');await result(2,0,1);
 await page.locator('[data-inv-generate]').click();await math();
 const generated=await page.evaluate(async base=>(await import(base+'content/models/matrix-inverse.js')).generatedInverseMatrix(Number(document.querySelector('[data-matrix-inverse]').dataset.seed),3),base);
 assert.deepEqual(await page.locator('[data-inv-entry]').evaluateAll(nodes=>nodes.map(n=>n.valueAsNumber)),generated.flat());
 await page.waitForFunction(a=>document.querySelector('[data-inv-output]').dataset.matrix===JSON.stringify(a),generated);await math();
 await choose('preset','three');await result(3,0,1);
  const quiz=page.locator('[data-quiz="t04-e09"]');await quiz.locator('input[value="correct"]').check();await page.locator('[data-reading-controls]>summary').click();await page.locator('[data-text-size]').selectOption('200');await page.locator('[data-contrast-control]').check();await page.locator('[data-highlight-control]').check();await page.setViewportSize({width:320,height:844});await math();assert.ok(await quiz.locator('input[value="correct"]').isChecked());assert.equal(await page.locator('[data-inv-size]').inputValue(),'3');
  if(process.env.SCREENSHOT_DIR)await editor.screenshot({path:process.env.SCREENSHOT_DIR+'/matriz-inversa-movil.png'});
  for(let i=0;i<6;i++){
   await quiz.getByText('Pregunta '+(i+1)+' de 6 · Sin límite de tiempo',{exact:true}).waitFor();
   if(i===0){await quiz.locator('input[value="wrong-1"]').check();await quiz.getByRole('button',{name:'Comprobar',exact:true}).click();await quiz.getByRole('button',{name:'Ver pista'}).click();await quiz.locator('.feedback').filter({hasText:'Pista:'}).waitFor();}
   await quiz.locator('input[value="correct"]').check();await quiz.getByRole('button',{name:'Comprobar',exact:true}).press('Enter');await quiz.getByRole('button',{name:/Siguiente pregunta|Ver resumen/}).waitFor();await math();await quiz.getByRole('button',{name:/Siguiente pregunta|Ver resumen/}).click();
  }
  await quiz.getByText('5 de 6 respuestas correctas',{exact:false}).waitFor();const deck=page.locator('[data-flashcards]');for(let i=1;i<=6;i++){await deck.getByText('Tarjeta '+i+' de 6',{exact:true}).waitFor();await deck.getByRole('button',{name:'Mostrar respuesta',exact:true}).click();await math();if(i<6)await deck.getByRole('button',{name:'Siguiente',exact:true}).click();}



 await page.locator('[data-reset-reading]').click();await page.reload();await output.locator('mjx-container').first().waitFor();await result(3);assert.equal(await page.locator('[data-inv-preset]').inputValue(),'two');assert.equal(await quiz.locator('input:checked').count(),0);
 await page.getByRole('link',{name:'Índice de matrices y determinantes',exact:true}).click();await page.waitForFunction(()=>document.querySelectorAll('[data-topic-index] li').length===12);const index=await page.locator('[data-topic-index]').innerText();assert.equal((index.match(/Disponible/g)||[]).length,12);assert.equal((index.match(/En preparación/g)||[]).length,0);
 await page.getByRole('link',{name:'Test disponible de matrices',exact:true}).click();await page.locator('[data-quiz] input').first().waitFor();await math();assert.match(await page.locator('[data-content-role="activity-progress"]').innerText(),/1 de 72/);
 await page.goto(base+'tarjetas/index.html?tema=t04');await page.getByText('Tarjeta 1 de 72',{exact:true}).waitFor();
 const prefix=new URL('prueba-subcarpeta/',base).href;await page.route(prefix+'**',async route=>{const response=await route.fetch({url:route.request().url().replace(prefix,base)});await route.fulfill({response});});await page.goto(prefix+lesson+'#explorador');await output.locator('mjx-container').first().waitFor();await result(3);await choose('preset','singular');await result(0);assert.ok(await page.locator('#site-header a').count()>0);assert.ok(await page.locator('#site-footer').innerText());assert.deepEqual(errors,[]);
 console.log('Aprobado: cuatro bases, cada cofactor, trasposición, fracciones, productos en ambos órdenes, singularidad y recuperación, edición y variantes; test 5/6 y seis tarjetas; móvil 320/200 %, fórmulas, recarga, t04 72/72, índice 12/12 y subcarpeta.');
 }finally{await browser.close();}
})().catch(e=>{console.error(e);process.exitCode=1;});

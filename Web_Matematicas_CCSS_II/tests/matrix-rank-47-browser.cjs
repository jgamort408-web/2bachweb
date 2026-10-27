const assert=require('node:assert/strict'),{chromium}=require('playwright');
const base=process.env.TEST_URL||'http://127.0.0.1:4173/',topic='libro/temas/04-matrices-y-determinantes/',lesson=topic+'10-rango-de-una-matriz.html';
(async()=>{
 const browser=await chromium.launch({headless:true,executablePath:process.env.CHROME_PATH});
 try{
 const page=await browser.newPage({viewport:{width:1280,height:960}}),errors=[];
 page.on('pageerror',e=>errors.push(e.message));page.on('response',r=>{if(r.status()>=400&&!r.url().endsWith('favicon.ico'))errors.push(r.status()+' '+r.url());});
 const output=page.locator('[data-rank-output]'),editor=page.locator('[data-matrix-rank]');
 const math=async()=>{await page.waitForFunction(()=>document.querySelector('.math-status')?.hidden===true&&!/\\[\[(]/.test(document.querySelector('main').innerText));assert.equal(await page.locator('[data-mml-node="merror"]').count(),0);assert.ok(await page.evaluate(()=>document.documentElement.scrollWidth<=innerWidth),'desbordamiento');};
 const choose=async(key,v)=>{await page.locator('[data-rank-'+key+']').selectOption({value:String(v)});};
 const result=async(rank)=>{const order=await page.locator('[data-rank-order]').inputValue(),minor=await page.locator('[data-rank-minor]').inputValue();await page.waitForFunction(({rank,order,minor})=>{const d=document.querySelector('[data-rank-output]').dataset;return d.rank===String(rank)&&d.order===order&&d.minor===minor;},{rank,order,minor});await math();};
 await page.goto(base+lesson+'#explorador');await output.locator('mjx-container').first().waitFor();await result(2);
 assert.equal(await page.locator('[data-rank-order]').inputValue(),'2');assert.equal(await page.locator('[data-rank-minor]').inputValue(),'3');assert.equal(await page.locator('.rank-selected').count(),4);
 const presets=await page.evaluate(async base=>(await import(base+'content/models/matrix-rank.js')).rankPresets,base);
 for(const [key,expected]of [['dependent',2],['rectangular',1],['full',3],['zero',0],['augmented',2]]){
  await choose('preset',key);await page.waitForFunction(a=>document.querySelector('[data-rank-output]').dataset.matrix===JSON.stringify(a),presets[key].matrix);
  const limit=Math.min(presets[key].matrix.length,presets[key].matrix[0].length);
  for(let order=1;order<=limit;order++){
   await choose('order',order);const count=await page.locator('[data-rank-minor] option').count();
   for(let minor=0;minor<count;minor++){await choose('minor',minor);await result(expected);assert.equal(await page.locator('.rank-selected').count(),order**2);}
  }
  await page.locator('[data-rank-reduction] summary').click();await math();assert.match(await page.locator('[data-rank-reduction]').innerText(),new RegExp('Número de filas no nulas: '+expected));
  if(expected===0)assert.match(await page.locator('[data-rank-proof]').innerText(),/todas las entradas son cero/);
 }
 await choose('preset','dependent');await choose('order',2);await choose('minor',0);await result(2);assert.match(await page.locator('[data-rank-detail]').innerText(),/no basta/);
 await choose('minor',3);await result(2);assert.match(await page.locator('[data-rank-proof]').innerText(),/Todos son cero/);
 await page.locator('[data-rank-reduction] summary').click();
 if(process.env.SCREENSHOT_DIR)await editor.screenshot({path:process.env.SCREENSHOT_DIR+'/rango-matriz-escritorio.png'});
 await choose('preset','augmented');await result(2);
 const entry='[data-rank-entry][data-row="0"][data-col="0"]';
 for(const value of ['','.5','10']){await page.locator(entry).fill(value);await page.locator(entry).press('Tab');assert.equal(await page.locator(entry).getAttribute('aria-invalid'),'true');await result(2);}
 await page.locator(entry).fill('2');await page.locator(entry).press('Tab');await result(3);assert.equal(await page.locator('[aria-invalid]').count(),0);
 await choose('rows',1);await result(1);await choose('cols',1);await result(1);assert.equal(await page.locator('[data-rank-entry]').count(),1);
 await page.locator(entry).fill('0');await page.locator(entry).press('Tab');await result(0);
 await choose('rows',3);await choose('cols',4);await result(0);assert.equal(await page.locator('[data-rank-entry]').count(),12);
 const last='[data-rank-entry][data-row="2"][data-col="3"]';await page.locator(last).fill('1');await page.locator(last).press('Tab');await result(1);
 await page.locator('[data-rank-generate]').click();
 const generated=await page.evaluate(async base=>(await import(base+'content/models/matrix-rank.js')).generatedRankMatrix(Number(document.querySelector('[data-matrix-rank]').dataset.seed),3,4),base);
 await page.waitForFunction(a=>document.querySelector('[data-rank-output]').dataset.matrix===JSON.stringify(a),generated);await math();assert.deepEqual(await page.locator('[data-rank-entry]').evaluateAll(nodes=>nodes.map(n=>n.valueAsNumber)),generated.flat());
 await choose('preset','dependent');await result(2);
  const quiz=page.locator('[data-quiz="t04-e10"]');await quiz.locator('input[value="correct"]').check();await page.locator('[data-reading-controls]>summary').click();await page.locator('[data-text-size]').selectOption('200');await page.locator('[data-contrast-control]').check();await page.locator('[data-highlight-control]').check();await page.setViewportSize({width:320,height:844});await math();assert.ok(await quiz.locator('input[value="correct"]').isChecked());assert.equal(await page.locator('[data-rank-rows]').inputValue(),'3');
  if(process.env.SCREENSHOT_DIR)await editor.screenshot({path:process.env.SCREENSHOT_DIR+'/rango-matriz-movil.png'});
  for(let i=0;i<6;i++){
   await quiz.getByText('Pregunta '+(i+1)+' de 6 · Sin límite de tiempo',{exact:true}).waitFor();
   if(i===0){await quiz.locator('input[value="wrong-1"]').check();await quiz.getByRole('button',{name:'Comprobar',exact:true}).click();await quiz.getByRole('button',{name:'Ver pista'}).click();await quiz.locator('.feedback').filter({hasText:'Pista:'}).waitFor();}
   await quiz.locator('input[value="correct"]').check();await quiz.getByRole('button',{name:'Comprobar',exact:true}).press('Enter');await quiz.getByRole('button',{name:/Siguiente pregunta|Ver resumen/}).waitFor();await math();await quiz.getByRole('button',{name:/Siguiente pregunta|Ver resumen/}).click();
  }
  await quiz.getByText('5 de 6 respuestas correctas',{exact:false}).waitFor();const deck=page.locator('[data-flashcards]');for(let i=1;i<=6;i++){await deck.getByText('Tarjeta '+i+' de 6',{exact:true}).waitFor();await deck.getByRole('button',{name:'Mostrar respuesta',exact:true}).click();await math();if(i<6)await deck.getByRole('button',{name:'Siguiente',exact:true}).click();}




 await page.locator('[data-reset-reading]').click();await page.reload();await output.locator('mjx-container').first().waitFor();await result(2);assert.equal(await page.locator('[data-rank-preset]').inputValue(),'dependent');assert.equal(await quiz.locator('input:checked').count(),0);
 await page.getByRole('link',{name:'Índice de matrices y determinantes',exact:true}).click();await page.waitForFunction(()=>document.querySelectorAll('[data-topic-index] li').length===12);const index=await page.locator('[data-topic-index]').innerText();assert.equal((index.match(/Disponible/g)||[]).length,12);assert.equal((index.match(/En preparación/g)||[]).length,0);
 await page.getByRole('link',{name:'Test disponible de matrices',exact:true}).click();await page.locator('[data-quiz] input').first().waitFor();await math();assert.match(await page.locator('[data-content-role="activity-progress"]').innerText(),/1 de 72/);
 await page.goto(base+'tarjetas/index.html?tema=t04');await page.getByText('Tarjeta 1 de 72',{exact:true}).waitFor();
 const prefix=new URL('prueba-subcarpeta/',base).href;await page.route(prefix+'**',async route=>{const response=await route.fetch({url:route.request().url().replace(prefix,base)});await route.fulfill({response});});await page.goto(prefix+lesson+'#explorador');await output.locator('mjx-container').first().waitFor();await result(2);await choose('preset','zero');await result(0);assert.ok(await page.locator('#site-header a').count()>0);assert.ok(await page.locator('#site-footer').innerText());assert.deepEqual(errors,[]);
 console.log('Aprobado: cinco bases, todos los menores, rangos 0–3, reducción, selección y justificación, edición y variantes, 1×1 y 3×4; test 5/6 y seis tarjetas; móvil 320/200 %, fórmulas, recarga, t04 72/72, índice 12/12 y subcarpeta.');
 }finally{await browser.close();}
})().catch(e=>{console.error(e);process.exitCode=1;});

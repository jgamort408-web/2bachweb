
const assert=require('node:assert/strict'),{chromium}=require('playwright');
const base=process.env.TEST_URL||'http://127.0.0.1:4173/',topic='libro/temas/04-matrices-y-determinantes/',lesson=topic+'12-grafos-y-matriz-de-adyacencia-asociada.html';
(async()=>{
 const browser=await chromium.launch({headless:true,executablePath:process.env.CHROME_PATH});
 try{
 const page=await browser.newPage({viewport:{width:1280,height:960}}),errors=[];
 page.on('pageerror',e=>errors.push(e.message));page.on('response',r=>{if(r.status()>=400&&!r.url().endsWith('favicon.ico'))errors.push(r.status()+' '+r.url());});
 const output=page.locator('[data-graph-output]'),editor=page.locator('[data-graph-explorer]');
 const math=async()=>{await page.waitForFunction(()=>document.querySelector('.math-status')?.hidden===true&&!/\\[\[(]/.test(document.querySelector('main').innerText));assert.equal(await page.locator('[data-mml-node="merror"]').count(),0);assert.ok(await page.evaluate(()=>document.documentElement.scrollWidth<=innerWidth),'desbordamiento');};
 const choose=async(key,v)=>{await page.locator('[data-graph-'+key+']').selectOption({value:String(v)});};
 const result=async(count)=>{
  const expected=await page.evaluate(()=>{const read=k=>document.querySelector('[data-graph-'+k+']').value;const a=Array.from({length:Number(read('size'))},()=>Array(Number(read('size'))).fill(0));document.querySelectorAll('[data-graph-edge]').forEach(e=>a[Number(e.dataset.row)][Number(e.dataset.col)]=Number(e.checked));return JSON.stringify({a,directed:read('direction')==='directed',n:Number(read('length')),origin:Number(read('from')),target:Number(read('to'))});});
  await page.waitForFunction(({count,expected})=>{const d=document.querySelector('[data-graph-output]').dataset;return (count===undefined||d.count===String(count))&&d.snapshot===expected;},{count,expected});await math();
 };
 await page.goto(base+lesson+'#explorador');await output.locator('mjx-container').first().waitFor();await result(1);
 assert.equal(await page.locator('[data-graph-edge]').count(),12);
 if(process.env.SCREENSHOT_DIR)await editor.screenshot({path:process.env.SCREENSHOT_DIR+'/grafos-escritorio.png'});
 for(const [preset,count] of [['path',1],['cycle',2],['isolated',1],['directed',1],['empty',0]]){await choose('preset',preset);await result(count);assert.equal(await page.locator('[data-graph-walk]').isDisabled(),count===0);}
 await choose('preset','cycle');await result(2);await choose('walk',1);await page.waitForFunction(()=>document.querySelector('[data-graph-output]').dataset.walk==='1');await math();
 assert.match(await output.innerText(),/A → D → C/);assert.match(await page.locator('#graph-description').textContent(),/A → D → C/);assert.equal(await page.locator('[data-graph-figure] path[stroke-dasharray]').count(),2);
 for(let length=0;length<=4;length++)for(let from=0;from<4;from++)for(let to=0;to<4;to++){
  await choose('length',length);await choose('from',from);await choose('to',to);
  // Anillo bipartito: 2^(k-1) por destino de paridad adecuada si k>0.
  const count=length===0?Number(from===to):((from+to+length)%2===0?2**(length-1):0);await result(count);
 }
 await choose('preset','directed');await choose('length',3);await choose('from',0);await choose('to',0);await result(1);
 assert.equal(await page.locator('[data-graph-figure] path[marker-end]').count(),3);
 const edge='[data-graph-edge][data-row="0"][data-col="1"]',reverse='[data-graph-edge][data-row="1"][data-col="0"]';
 await page.locator(edge).focus();await page.locator(edge).press('Space');await result(0);assert.equal(await page.locator(reverse).isChecked(),false);
 await choose('preset','path');await choose('length',2);await choose('to',2);await result(1);
 await page.locator(edge).focus();await page.locator(edge).press('Space');await result(0);assert.equal(await page.locator(reverse).isChecked(),false);assert.equal(await page.locator(edge).evaluate(e=>e===document.activeElement),true);
 await choose('direction','directed');await page.locator(reverse).check();await result(0);assert.equal(await page.locator(edge).isChecked(),false);
 await choose('direction','undirected');await result(1);assert.equal(await page.locator(edge).isChecked(),true);
 await choose('size',2);await result(0);assert.equal(await page.locator('[data-graph-edge]').count(),2);
 await choose('size',4);await choose('to',2);await result(0);assert.equal(await page.locator('[data-graph-edge]').count(),12);
 await page.locator('[data-graph-generate]').click();await result();
 const generated=await page.evaluate(async base=>{const {generatedGraph}=await import(base+'content/models/graphs.js');return generatedGraph(Number(document.querySelector('[data-graph-explorer]').dataset.seed),4,false);},base);
 assert.deepEqual(JSON.parse(await output.getAttribute('data-snapshot')).a,generated);
 // Ráfaga de cambios mientras se serializa el renderizado matemático.
 await page.evaluate(()=>{const s=document.querySelector('[data-graph-length]');for(const v of [0,4,2,3,1]){s.value=v;s.dispatchEvent(new Event('change',{bubbles:true}));}});await result();
 await choose('preset','directed');await choose('length',3);await choose('from',0);await choose('to',0);await result(1);
  const quiz=page.locator('[data-quiz="t04-e12"]');await quiz.locator('input[value="correct"]').check();await page.locator('[data-reading-controls]>summary').click();await page.locator('[data-text-size]').selectOption('200');await page.locator('[data-contrast-control]').check();await page.locator('[data-highlight-control]').check();await page.setViewportSize({width:320,height:844});await math();assert.ok(await quiz.locator('input[value="correct"]').isChecked());assert.equal(await page.locator('[data-graph-size]').inputValue(),'4');
  if(process.env.SCREENSHOT_DIR)await editor.screenshot({path:process.env.SCREENSHOT_DIR+'/grafos-movil.png'});
  for(let i=0;i<6;i++){
   await quiz.getByText('Pregunta '+(i+1)+' de 6 · Sin límite de tiempo',{exact:true}).waitFor();
   if(i===0){await quiz.locator('input[value="wrong-1"]').check();await quiz.getByRole('button',{name:'Comprobar',exact:true}).click();await quiz.getByRole('button',{name:'Ver pista'}).click();await quiz.locator('.feedback').filter({hasText:'Pista:'}).waitFor();}
   await quiz.locator('input[value="correct"]').check();await quiz.getByRole('button',{name:'Comprobar',exact:true}).press('Enter');await quiz.getByRole('button',{name:/Siguiente pregunta|Ver resumen/}).waitFor();await math();await quiz.getByRole('button',{name:/Siguiente pregunta|Ver resumen/}).click();
  }
  await quiz.getByText('5 de 6 respuestas correctas',{exact:false}).waitFor();const deck=page.locator('[data-flashcards]');for(let i=1;i<=6;i++){await deck.getByText('Tarjeta '+i+' de 6',{exact:true}).waitFor();await deck.getByRole('button',{name:'Mostrar respuesta',exact:true}).click();await math();if(i<6)await deck.getByRole('button',{name:'Siguiente',exact:true}).click();}





 assert.ok(await page.locator('[data-graph-figure] circle').evaluateAll(nodes=>nodes.every(n=>getComputedStyle(n).fill===getComputedStyle(document.body).backgroundColor)));
 await page.locator('[data-reset-reading]').click();await page.reload();await output.locator('mjx-container').first().waitFor();await result(1);assert.equal(await page.locator('[data-graph-preset]').inputValue(),'path');assert.equal(await quiz.locator('input:checked').count(),0);
 await page.getByRole('link',{name:'Índice de matrices y determinantes',exact:true}).click();await page.waitForFunction(()=>document.querySelectorAll('[data-topic-index] li').length===12);const index=await page.locator('[data-topic-index]').innerText();assert.equal((index.match(/Disponible/g)||[]).length,12);assert.equal((index.match(/En preparación/g)||[]).length,0);
 await page.getByRole('link',{name:'Test disponible de matrices',exact:true}).click();await page.locator('[data-quiz] input').first().waitFor();await math();assert.match(await page.locator('[data-content-role="activity-progress"]').innerText(),/1 de 72/);
 await page.goto(base+'tarjetas/index.html?tema=t04');await page.getByText('Tarjeta 1 de 72',{exact:true}).waitFor();
 const prefix=new URL('prueba-subcarpeta/',base).href;await page.route(prefix+'**',async route=>{const response=await route.fetch({url:route.request().url().replace(prefix,base)});await route.fulfill({response});});await page.goto(prefix+lesson+'#explorador');await output.locator('mjx-container').first().waitFor();await result(1);await choose('preset','cycle');await result(2);assert.ok(await page.locator('#site-header a').count()>0);assert.ok(await page.locator('#site-footer').innerText());assert.deepEqual(errors,[]);
 console.log('Aprobado: cinco redes, 80 combinaciones de longitud/origen/destino en anillo, recorridos destacados, teclado, orientación y unión, tamaño, generación y cambios rápidos; test 5/6, seis tarjetas, móvil 320/200 %, contraste, fórmulas, recarga, t04 72/72, índice 12/12 y subcarpeta.');
 }finally{await browser.close();}
})().catch(e=>{console.error(e);process.exitCode=1;});

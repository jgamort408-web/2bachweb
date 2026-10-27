const assert=require('node:assert/strict'),{chromium}=require('playwright');
const base=process.env.TEST_URL||'http://127.0.0.1:4173/',topic='libro/temas/04-matrices-y-determinantes/',lesson=topic+'05-comparacion-de-matrices-matriz-simetrica-y-matriz-antisimetrica.html';
(async()=>{
 const browser=await chromium.launch({headless:true,executablePath:process.env.CHROME_PATH});
 try{
 const page=await browser.newPage({viewport:{width:1280,height:960}}),errors=[];
 page.on('pageerror',e=>errors.push(e.message));page.on('response',r=>{if(r.status()>=400&&!r.url().endsWith('favicon.ico'))errors.push(r.status()+' '+r.url());});
 const math=async()=>{await page.waitForFunction(()=>document.querySelector('.math-status')?.hidden===true);assert.equal(await page.locator('[data-mml-node="merror"]').count(),0);assert.doesNotMatch(await page.locator('main').innerText(),/\\[\[(]/);assert.ok(await page.evaluate(()=>document.documentElement.scrollWidth<=innerWidth),'desbordamiento');};
 const output=page.locator('[data-symmetry-output]'),editor=page.locator('[data-matrix-symmetry]');
 const choose=async(selector,value)=>{await page.locator(selector).selectOption(String(value));await math();};
 const edit=async(selector,value)=>{await page.locator(selector).fill(value);await page.locator(selector).press('Tab');await math();};
 const flags=async(square,symmetric,skew)=>{for(const [key,value]of Object.entries({square,symmetric,skew}))assert.equal(await output.getAttribute('data-'+key),String(value));};
 await page.goto(base+lesson+'#explorador');await output.locator('mjx-container').first().waitFor();await math();assert.ok(await page.locator('main mjx-container').count()>20);
 await flags(true,true,false);await choose('[data-symmetry-position]','2,3');assert.match(await page.locator('[data-symmetry-mapping]').innerText(),/fila 3, columna 2/);assert.equal(await page.locator('.symmetry-selected').count(),1);
 await page.locator('[data-symmetry-pairs] summary').click();assert.equal(await page.locator('[data-symmetry-pairs] li').count(),6);
 if(process.env.SCREENSHOT_DIR)await editor.screenshot({path:process.env.SCREENSHOT_DIR+'/simetria-matrices-escritorio.png'});
 await edit('[data-symmetry-entry][data-row="0"][data-col="1"]','-2');await flags(true,false,false);assert.match(await output.innerText(),/Simetría: falla/);
 await edit('[data-symmetry-entry][data-row="1"][data-col="0"]','-2');await flags(true,true,false);
 await choose('[data-symmetry-preset]','skew');await flags(true,false,true);await edit('[data-symmetry-entry][data-row="0"][data-col="0"]','1');await flags(true,false,false);
 for(const [preset,symmetric,skew]of [['zeroDiagonal',true,false],['diagonal',true,false],['zero',true,true],['single',true,false]]){
  await choose('[data-symmetry-preset]',preset);await flags(true,symmetric,skew);
 }
 const target='[data-symmetry-entry][data-row="0"][data-col="0"]';await edit(target,'0');await flags(true,true,true);
 await choose('[data-symmetry-cols]',2);await flags(false,false,false);assert.equal(await page.locator('[data-symmetry-pairs]').count(),0);
 await choose('[data-symmetry-preset]','rectangular');await flags(false,false,false);await choose('[data-symmetry-position]','2,3');assert.match(await page.locator('[data-symmetry-mapping]').innerText(),/fila 3, columna 2/);assert.match(await output.innerText(),/Sí tiene traspuesta/);
 for(const invalid of ['','.5','10']){await edit(target,invalid);assert.equal(await page.locator(target).getAttribute('aria-invalid'),'true');assert.match(await page.locator('[data-symmetry-status]').innerText(),/último valor válido/);}
 await edit(target,'-9');assert.equal(await page.locator('[aria-invalid="true"]').count(),0);assert.equal(await page.locator('[data-symmetry-preset]').inputValue(),'custom');
 await choose('[data-symmetry-rows]',3);assert.equal(await page.locator('[data-symmetry-entry]').count(),9);
 await page.locator('[data-generate-symmetry]').click();await math();
 const generated=await page.evaluate(async base=>(await import(base+'content/models/matrix-symmetry.js')).generatedSymmetryMatrix(Number(document.querySelector('[data-matrix-symmetry]').dataset.seed),3,3),base);
 assert.deepEqual(await page.locator('[data-symmetry-entry]').evaluateAll(nodes=>nodes.map(n=>n.valueAsNumber)),generated.flat());
  const quiz=page.locator('[data-quiz="t04-e05"]');await quiz.locator('input[value="correct"]').check();await page.locator('[data-reading-controls]>summary').click();await page.locator('[data-text-size]').selectOption('200');await page.locator('[data-contrast-control]').check();await page.locator('[data-highlight-control]').check();await page.setViewportSize({width:320,height:844});await math();assert.ok(await quiz.locator('input[value="correct"]').isChecked());assert.equal(await page.locator('[data-symmetry-rows]').inputValue(),'3');
  await page.locator('[data-symmetry-pairs] summary').click();if(process.env.SCREENSHOT_DIR)await editor.screenshot({path:process.env.SCREENSHOT_DIR+'/simetria-matrices-movil.png'});
  for(let i=0;i<6;i++){
   await quiz.getByText('Pregunta '+(i+1)+' de 6 · Sin límite de tiempo',{exact:true}).waitFor();
   if(i===0){await quiz.locator('input[value="wrong-1"]').check();await quiz.getByRole('button',{name:'Comprobar',exact:true}).click();await quiz.getByRole('button',{name:'Ver pista'}).click();await quiz.locator('.feedback').filter({hasText:'Pista:'}).waitFor();}
   await quiz.locator('input[value="correct"]').check();await quiz.getByRole('button',{name:'Comprobar',exact:true}).press('Enter');await quiz.getByRole('button',{name:/Siguiente pregunta|Ver resumen/}).waitFor();await math();await quiz.getByRole('button',{name:/Siguiente pregunta|Ver resumen/}).click();
  }
  await quiz.getByText('5 de 6 respuestas correctas',{exact:false}).waitFor();const deck=page.locator('[data-flashcards]');for(let i=1;i<=6;i++){await deck.getByText('Tarjeta '+i+' de 6',{exact:true}).waitFor();await deck.getByRole('button',{name:'Mostrar respuesta',exact:true}).click();await math();if(i<6)await deck.getByRole('button',{name:'Siguiente',exact:true}).click();}

 await page.locator('[data-reset-reading]').click();await page.reload();await output.locator('mjx-container').first().waitFor();await math();assert.equal(await page.locator('[data-symmetry-preset]').inputValue(),'symmetric');assert.equal(await page.locator('[data-symmetry-rows]').inputValue(),'3');assert.equal(await quiz.locator('input:checked').count(),0);
 await page.getByRole('link',{name:'Índice de matrices y determinantes',exact:true}).click();await page.waitForFunction(()=>document.querySelectorAll('[data-topic-index] li').length===12);const index=await page.locator('[data-topic-index]').innerText();assert.equal((index.match(/Disponible/g)||[]).length,12);assert.equal((index.match(/En preparación/g)||[]).length,0);
 await page.getByRole('link',{name:'Test disponible de matrices',exact:true}).click();await page.locator('[data-quiz] input').first().waitFor();await math();assert.match(await page.locator('[data-content-role="activity-progress"]').innerText(),/1 de 72/);
 await page.goto(base+'tarjetas/index.html?tema=t04');await page.getByText('Tarjeta 1 de 72',{exact:true}).waitFor();
 const prefix=new URL('prueba-subcarpeta/',base).href;await page.route(prefix+'**',async route=>{const response=await route.fetch({url:route.request().url().replace(prefix,base)});await route.fulfill({response});});await page.goto(prefix+lesson+'#explorador');await output.locator('mjx-container').first().waitFor();await math();await choose('[data-symmetry-preset]','rectangular');assert.equal(await output.getAttribute('data-square'),'false');assert.ok(await page.locator('#site-header a').count()>0);assert.ok(await page.locator('#site-footer').innerText());assert.deepEqual(errors,[]);
 console.log('Aprobado: siete ejemplos, traspuesta y posiciones, pares y testigos, rectangular, 1×1, edición y variantes, test 5/6 y seis tarjetas, móvil 320/200 %, preferencias, recarga, t04 72/72, índice 12/12 y subcarpeta.');
 }finally{await browser.close();}
})().catch(e=>{console.error(e);process.exitCode=1;});

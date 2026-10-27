const assert=require('node:assert/strict'),{chromium}=require('playwright');
const base=process.env.TEST_URL||'http://127.0.0.1:4173/',topic='libro/temas/04-matrices-y-determinantes/',lesson=topic+'04-potencia-de-una-matriz.html';
(async()=>{
 const browser=await chromium.launch({headless:true,executablePath:process.env.CHROME_PATH});
 try{
 const page=await browser.newPage({viewport:{width:1280,height:960}}),errors=[];
 page.on('pageerror',e=>errors.push(e.message));page.on('response',r=>{if(r.status()>=400&&!r.url().endsWith('favicon.ico'))errors.push(r.status()+' '+r.url());});
 const math=async()=>{await page.waitForFunction(()=>document.querySelector('.math-status')?.hidden===true);assert.equal(await page.locator('[data-mml-node="merror"]').count(),0);assert.doesNotMatch(await page.locator('main').innerText(),/\\[\[(]/);assert.ok(await page.evaluate(()=>document.documentElement.scrollWidth<=innerWidth),'desbordamiento');};
 const output=page.locator('[data-power-output]'),editor=page.locator('[data-matrix-power]');
 const choose=async(selector,value)=>{await page.locator(selector).selectOption(String(value));await math();};
 const edit=async(selector,value)=>{await page.locator(selector).fill(value);await page.locator(selector).press('Tab');await math();};
 const steps=async()=>{await page.locator('[data-power-steps] summary').click();await math();return page.locator('[data-power-steps] li').evaluateAll(nodes=>nodes.map(n=>n.textContent.replace(/\s/g,'').replaceAll('−','-')));};
 await page.goto(base+lesson+'#explorador');await output.locator('mjx-container').first().waitFor();await math();assert.ok(await page.locator('main mjx-container').count()>25);
 assert.equal(await output.getAttribute('data-exponent'),'3');assert.ok((await steps())[1].endsWith('=3.'));
 await choose('[data-power-exponent]',5);assert.match(await page.locator('[data-power-state]').innerText(),/25 unidades/);assert.ok((await steps())[1].endsWith('=5.'));
 await page.locator('[data-power-history] summary').click();assert.equal(await page.locator('[data-power-history] li').count(),6);
 if(process.env.SCREENSHOT_DIR)await editor.screenshot({path:process.env.SCREENSHOT_DIR+'/potencia-matrices-escritorio.png'});
 for(const [preset,n,expected]of [['diagonal',3,[8,0,0,-1]],['swap',4,[1,0,0,1]],['swap',5,[0,1,1,0]],['nilpotent',2,[0,0,0,0]],['projection',6,[1,0,0,0]],['identity',6,[1,0,0,1]],['zero',1,[0,0,0,0]]]){
  await choose('[data-power-preset]',preset);await choose('[data-power-exponent]',n);const texts=await steps();expected.forEach((v,i)=>assert.ok(texts[i].endsWith('='+v+'.'),preset+texts[i]));
 }
 await choose('[data-power-exponent]',0);assert.equal(await page.locator('[data-power-steps]').count(),0);assert.match(await output.innerText(),/incluso si A es nula/);await page.locator('[data-power-history] summary').click();assert.equal(await page.locator('[data-power-history] li').count(),1);
 await choose('[data-power-preset]','accumulation');await choose('[data-power-exponent]',6);
 const target='[data-power-entry][data-row="0"][data-col="0"]';
 for(const invalid of ['','.5','4']){await edit(target,invalid);assert.equal(await page.locator(target).getAttribute('aria-invalid'),'true');assert.match(await page.locator('[data-power-status]').innerText(),/último valor válido/);}
 await edit(target,'-2');assert.equal(await page.locator('[aria-invalid="true"]').count(),0);assert.equal(await page.locator('[data-power-preset]').inputValue(),'custom');
 await page.locator('[data-generate-power]').click();await math();
 const generated=await page.evaluate(async base=>(await import(base+'content/models/matrix-power.js')).generatedPowerMatrix(Number(document.querySelector('[data-matrix-power]').dataset.seed)),base);
 assert.deepEqual(await page.locator('[data-power-entry]').evaluateAll(nodes=>nodes.map(n=>n.valueAsNumber)),generated.flat());
  const quiz=page.locator('[data-quiz="t04-e04"]');await quiz.locator('input[value="correct"]').check();await page.locator('[data-reading-controls]>summary').click();await page.locator('[data-text-size]').selectOption('200');await page.locator('[data-contrast-control]').check();await page.locator('[data-highlight-control]').check();await page.setViewportSize({width:320,height:844});await math();assert.ok(await quiz.locator('input[value="correct"]').isChecked());assert.equal(await page.locator('[data-power-exponent]').inputValue(),'6');
  await page.locator('[data-power-history] summary').click();await page.locator('[data-power-steps] summary').click();if(process.env.SCREENSHOT_DIR)await editor.screenshot({path:process.env.SCREENSHOT_DIR+'/potencia-matrices-movil.png'});
  for(let i=0;i<6;i++){
   await quiz.getByText('Pregunta '+(i+1)+' de 6 · Sin límite de tiempo',{exact:true}).waitFor();
   if(i===0){await quiz.locator('input[value="wrong-1"]').check();await quiz.getByRole('button',{name:'Comprobar',exact:true}).click();await quiz.getByRole('button',{name:'Ver pista'}).click();await quiz.locator('.feedback').filter({hasText:'Pista:'}).waitFor();}
   await quiz.locator('input[value="correct"]').check();await quiz.getByRole('button',{name:'Comprobar',exact:true}).press('Enter');await quiz.getByRole('button',{name:/Siguiente pregunta|Ver resumen/}).waitFor();await math();await quiz.getByRole('button',{name:/Siguiente pregunta|Ver resumen/}).click();
  }
  await quiz.getByText('5 de 6 respuestas correctas',{exact:false}).waitFor();const deck=page.locator('[data-flashcards]');for(let i=1;i<=6;i++){await deck.getByText('Tarjeta '+i+' de 6',{exact:true}).waitFor();await deck.getByRole('button',{name:'Mostrar respuesta',exact:true}).click();await math();if(i<6)await deck.getByRole('button',{name:'Siguiente',exact:true}).click();}

 await page.locator('[data-reset-reading]').click();await page.reload();await output.locator('mjx-container').first().waitFor();await math();assert.equal(await page.locator('[data-power-preset]').inputValue(),'accumulation');assert.equal(await page.locator('[data-power-exponent]').inputValue(),'3');assert.equal(await quiz.locator('input:checked').count(),0);
 await page.getByRole('link',{name:'Índice de matrices y determinantes',exact:true}).click();await page.waitForFunction(()=>document.querySelectorAll('[data-topic-index] li').length===12);const index=await page.locator('[data-topic-index]').innerText();assert.equal((index.match(/Disponible/g)||[]).length,12);assert.equal((index.match(/En preparación/g)||[]).length,0);
 await page.getByRole('link',{name:'Test disponible de matrices',exact:true}).click();await page.locator('[data-quiz] input').first().waitFor();await math();assert.match(await page.locator('[data-content-role="activity-progress"]').innerText(),/1 de 72/);
 await page.goto(base+'tarjetas/index.html?tema=t04');await page.getByText('Tarjeta 1 de 72',{exact:true}).waitFor();
 const prefix=new URL('prueba-subcarpeta/',base).href;await page.route(prefix+'**',async route=>{const response=await route.fetch({url:route.request().url().replace(prefix,base)});await route.fulfill({response});});await page.goto(prefix+lesson+'#explorador');await output.locator('mjx-container').first().waitFor();await math();await choose('[data-power-exponent]','0');assert.equal(await page.locator('[data-power-steps]').count(),0);assert.ok(await page.locator('#site-header a').count()>0);assert.ok(await page.locator('#site-footer').innerText());assert.deepEqual(errors,[]);
 console.log('Aprobado: siete ejemplos, exponentes 0–6, historial y pasos, estados iterados, edición y variantes, test 5/6 y seis tarjetas, móvil 320/200 %, preferencias, recarga, t04 72/72, índice 12/12 y subcarpeta.');
 }finally{await browser.close();}
})().catch(e=>{console.error(e);process.exitCode=1;});

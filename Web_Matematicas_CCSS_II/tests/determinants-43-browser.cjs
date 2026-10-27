const assert=require('node:assert/strict'),{chromium}=require('playwright');
const base=process.env.TEST_URL||'http://127.0.0.1:4173/',topic='libro/temas/04-matrices-y-determinantes/',lesson=topic+'06-determinante-de-una-matriz.html';
(async()=>{
 const browser=await chromium.launch({headless:true,executablePath:process.env.CHROME_PATH});
 try{
 const page=await browser.newPage({viewport:{width:1280,height:960}}),errors=[];
 page.on('pageerror',e=>errors.push(e.message));page.on('response',r=>{if(r.status()>=400&&!r.url().endsWith('favicon.ico'))errors.push(r.status()+' '+r.url());});
 const math=async()=>{await page.waitForFunction(()=>document.querySelector('.math-status')?.hidden===true);assert.equal(await page.locator('[data-mml-node="merror"]').count(),0);assert.doesNotMatch(await page.locator('main').innerText(),/\\[\[(]/);assert.ok(await page.evaluate(()=>document.documentElement.scrollWidth<=innerWidth),'desbordamiento');};
 const output=page.locator('[data-det-output]'),editor=page.locator('[data-determinants]');
 const choose=async(selector,value)=>{await page.locator(selector).selectOption(String(value));await math();};
 const edit=async(selector,value)=>{await page.locator(selector).fill(value);await page.locator(selector).press('Tab');await math();};
 const value=async n=>{assert.equal(await output.getAttribute('data-value'),String(n));assert.equal(await output.getAttribute('data-invertible'),String(n!==0));};
 await page.goto(base+lesson+'#explorador');await output.locator('mjx-container').first().waitFor();await math();assert.ok(await page.locator('main mjx-container').count()>20);
 await value(11);await choose('[data-det-term]',1);assert.equal(await page.locator('.det-selected').count(),2);assert.match(await page.locator('[data-det-detail]').innerText(),/grupo que se resta/);
 await choose('[data-det-preset]','three');await value(18);await choose('[data-det-term]',3);assert.equal(await page.locator('.det-selected').count(),3);
 assert.match(await page.locator('[data-det-detail]').innerText(),/\(1, 3\).*\(2, 2\).*\(3, 1\)/);
 await page.locator('[data-det-steps] summary').click();assert.equal(await page.locator('[data-det-steps] li').count(),6);assert.match((await page.locator('[data-det-steps]').textContent()).replaceAll('−','-').replace(/\s/g,''),/Q=-2/);
 if(process.env.SCREENSHOT_DIR)await editor.screenshot({path:process.env.SCREENSHOT_DIR+'/determinantes-escritorio.png'});
 for(const [preset,n]of [['negative',-2],['singular',0],['zero',0],['single',-3]]){await choose('[data-det-preset]',preset);await value(n);}
 await page.locator('[data-det-steps] summary').click();assert.equal(await page.locator('[data-det-steps] li').count(),1);
 const target='[data-det-entry][data-row="0"][data-col="0"]';await edit(target,'0');await value(0);
 await choose('[data-det-cols]',2);assert.equal(await output.getAttribute('data-defined'),'false');assert.equal(await page.locator('[data-det-steps]').count(),0);assert.equal(await page.locator('.det-selected').count(),0);assert.ok(await page.locator('[data-det-term]').isHidden());
 await choose('[data-det-preset]','rectangular');assert.equal(await output.getAttribute('data-defined'),'false');assert.match(await output.innerText(),/No se le asigna el valor cero/);
 await choose('[data-det-preset]','two');for(const invalid of ['','.5','10']){await edit(target,invalid);assert.equal(await page.locator(target).getAttribute('aria-invalid'),'true');assert.match(await page.locator('[data-det-status]').innerText(),/último valor válido/);await value(11);}
 await edit(target,'-9');assert.equal(await page.locator('[aria-invalid="true"]').count(),0);await value(-1);
 await choose('[data-det-rows]',3);assert.equal(await output.getAttribute('data-defined'),'false');await choose('[data-det-cols]',3);await value(0);
 await page.locator('[data-generate-det]').click();await math();
 const generated=await page.evaluate(async base=>(await import(base+'content/models/determinants.js')).generatedDeterminantMatrix(Number(document.querySelector('[data-determinants]').dataset.seed),3,3),base);
 assert.deepEqual(await page.locator('[data-det-entry]').evaluateAll(nodes=>nodes.map(n=>n.valueAsNumber)),generated.flat());
  const quiz=page.locator('[data-quiz="t04-e06"]');await quiz.locator('input[value="correct"]').check();await page.locator('[data-reading-controls]>summary').click();await page.locator('[data-text-size]').selectOption('200');await page.locator('[data-contrast-control]').check();await page.locator('[data-highlight-control]').check();await page.setViewportSize({width:320,height:844});await math();assert.ok(await quiz.locator('input[value="correct"]').isChecked());assert.equal(await page.locator('[data-det-rows]').inputValue(),'3');
  await page.locator('[data-det-steps] summary').click();if(process.env.SCREENSHOT_DIR)await editor.screenshot({path:process.env.SCREENSHOT_DIR+'/determinantes-movil.png'});
  for(let i=0;i<6;i++){
   await quiz.getByText('Pregunta '+(i+1)+' de 6 · Sin límite de tiempo',{exact:true}).waitFor();
   if(i===0){await quiz.locator('input[value="wrong-1"]').check();await quiz.getByRole('button',{name:'Comprobar',exact:true}).click();await quiz.getByRole('button',{name:'Ver pista'}).click();await quiz.locator('.feedback').filter({hasText:'Pista:'}).waitFor();}
   await quiz.locator('input[value="correct"]').check();await quiz.getByRole('button',{name:'Comprobar',exact:true}).press('Enter');await quiz.getByRole('button',{name:/Siguiente pregunta|Ver resumen/}).waitFor();await math();await quiz.getByRole('button',{name:/Siguiente pregunta|Ver resumen/}).click();
  }
  await quiz.getByText('5 de 6 respuestas correctas',{exact:false}).waitFor();const deck=page.locator('[data-flashcards]');for(let i=1;i<=6;i++){await deck.getByText('Tarjeta '+i+' de 6',{exact:true}).waitFor();await deck.getByRole('button',{name:'Mostrar respuesta',exact:true}).click();await math();if(i<6)await deck.getByRole('button',{name:'Siguiente',exact:true}).click();}

 await page.locator('[data-reset-reading]').click();await page.reload();await output.locator('mjx-container').first().waitFor();await math();assert.equal(await page.locator('[data-det-preset]').inputValue(),'two');assert.equal(await page.locator('[data-det-rows]').inputValue(),'2');assert.equal(await quiz.locator('input:checked').count(),0);
 await page.getByRole('link',{name:'Índice de matrices y determinantes',exact:true}).click();await page.waitForFunction(()=>document.querySelectorAll('[data-topic-index] li').length===12);const index=await page.locator('[data-topic-index]').innerText();assert.equal((index.match(/Disponible/g)||[]).length,12);assert.equal((index.match(/En preparación/g)||[]).length,0);
 await page.getByRole('link',{name:'Test disponible de matrices',exact:true}).click();await page.locator('[data-quiz] input').first().waitFor();await math();assert.match(await page.locator('[data-content-role="activity-progress"]').innerText(),/1 de 72/);
 await page.goto(base+'tarjetas/index.html?tema=t04');await page.getByText('Tarjeta 1 de 72',{exact:true}).waitFor();
 const prefix=new URL('prueba-subcarpeta/',base).href;await page.route(prefix+'**',async route=>{const response=await route.fetch({url:route.request().url().replace(prefix,base)});await route.fulfill({response});});await page.goto(prefix+lesson+'#explorador');await output.locator('mjx-container').first().waitFor();await math();await choose('[data-det-preset]','rectangular');assert.equal(await output.getAttribute('data-defined'),'false');assert.ok(await page.locator('#site-header a').count()>0);assert.ok(await page.locator('#site-footer').innerText());assert.deepEqual(errors,[]);
 console.log('Aprobado: siete ejemplos, Sarrus, signos, productos y posiciones, rectangular, 1×1, edición y variantes, test 5/6 y seis tarjetas, móvil 320/200 %, preferencias, recarga, t04 72/72, índice 12/12 y subcarpeta.');
 }finally{await browser.close();}
})().catch(e=>{console.error(e);process.exitCode=1;});

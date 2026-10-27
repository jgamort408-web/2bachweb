const assert=require('node:assert/strict'),{chromium}=require('playwright');
const base=process.env.TEST_URL||'http://127.0.0.1:4173/',topic='libro/temas/04-matrices-y-determinantes/',lesson=topic+'07-propiedades-de-los-determinantes.html';
(async()=>{
 const browser=await chromium.launch({headless:true,executablePath:process.env.CHROME_PATH});
 try{
 const page=await browser.newPage({viewport:{width:1280,height:960}}),errors=[];
 page.on('pageerror',e=>errors.push(e.message));page.on('response',r=>{if(r.status()>=400&&!r.url().endsWith('favicon.ico'))errors.push(r.status()+' '+r.url());});
 const math=async()=>{await page.waitForFunction(()=>document.querySelector('.math-status')?.hidden===true);assert.equal(await page.locator('[data-mml-node="merror"]').count(),0);assert.doesNotMatch(await page.locator('main').innerText(),/\\[\[(]/);assert.ok(await page.evaluate(()=>document.documentElement.scrollWidth<=innerWidth),'desbordamiento');};
 const output=page.locator('[data-property-output]'),editor=page.locator('[data-det-properties]');
 const choose=async(selector,value)=>{await page.locator(selector).selectOption({value:String(value)});await math();};
 const edit=async(selector,value)=>{await page.locator(selector).fill(value);await page.locator(selector).press('Tab');await math();};
 const result=async(before,after)=>{await page.waitForFunction(({before,after})=>{const d=document.querySelector('[data-property-output]').dataset;return d.valid==='true'&&d.before===String(before)&&d.after===String(after);},{before,after});await math();assert.equal(await output.getAttribute('data-valid'),'true');assert.equal(await output.getAttribute('data-before'),String(before));assert.equal(await output.getAttribute('data-after'),String(after));};
 await page.goto(base+lesson+'#explorador');await output.locator('mjx-container').first().waitFor();await math();assert.ok(await page.locator('main mjx-container').count()>20);
 await result(3,3);await page.locator('[data-property-changes] summary').click();assert.equal(await page.locator('[data-property-changes] li').count(),3);
 if(process.env.SCREENSHOT_DIR)await editor.screenshot({path:process.env.SCREENSHOT_DIR+'/propiedades-determinantes-escritorio.png'});
 for(const [mode,value]of [['swap',-3],['scale',-6],['scaleAll',-24],['transpose',3]]){await choose('[data-property-operation]',mode);await result(3,value);}
 assert.deepEqual(await page.locator('[data-property-entry]').evaluateAll(nodes=>nodes.map(n=>n.valueAsNumber)),[1,2,1,2,5,3,1,0,2]);
 await choose('[data-property-operation]','scaleAll');await edit('[data-property-factor]','0');await result(3,0);
 await choose('[data-property-preset]','two');await edit('[data-property-factor]','-2');await result(11,44);
 await choose('[data-property-operation]','add');await choose('[data-property-axis]','cols');await result(11,11);
 await choose('[data-property-operation]','swap');await result(11,-11);await choose('[data-property-operation]','scale');await result(11,-22);
 await choose('[data-property-operation]','add');await choose('[data-property-source]',1);await page.waitForFunction(()=>document.querySelector('[data-property-output]').dataset.valid==='false');assert.equal(await output.getAttribute('data-valid'),'false');assert.match(await output.innerText(),/distintas/);assert.equal(await page.locator('[data-property-changes]').count(),0);await choose('[data-property-source]',0);await result(11,11);
 await choose('[data-property-preset]','triangular');await result(-10,-10);await choose('[data-property-preset]','singular');await result(0,0);assert.match(await output.innerText(),/sin dividir/);
 const target='[data-property-entry][data-row="0"][data-col="0"]';
 for(const invalid of ['','.5','10']){await edit(target,invalid);assert.equal(await page.locator(target).getAttribute('aria-invalid'),'true');assert.match(await page.locator('[data-property-status]').innerText(),/último valor válido/);}
 await edit(target,'-9');assert.equal(await page.locator('[aria-invalid="true"]').count(),0);
 await edit('[data-property-factor]','4');assert.equal(await page.locator('[data-property-factor]').getAttribute('aria-invalid'),'true');await edit('[data-property-factor]','-3');
 await choose('[data-property-size]',2);assert.equal(await page.locator('[data-property-entry]').count(),4);await choose('[data-property-size]',3);
 await page.locator('[data-generate-property]').click();await math();
 const generated=await page.evaluate(async base=>(await import(base+'content/models/determinant-properties.js')).generatedPropertyMatrix(Number(document.querySelector('[data-det-properties]').dataset.seed),3),base);
 assert.deepEqual(await page.locator('[data-property-entry]').evaluateAll(nodes=>nodes.map(n=>n.valueAsNumber)),generated.flat());
  const quiz=page.locator('[data-quiz="t04-e07"]');await quiz.locator('input[value="correct"]').check();await page.locator('[data-reading-controls]>summary').click();await page.locator('[data-text-size]').selectOption('200');await page.locator('[data-contrast-control]').check();await page.locator('[data-highlight-control]').check();await page.setViewportSize({width:320,height:844});await math();assert.ok(await quiz.locator('input[value="correct"]').isChecked());assert.equal(await page.locator('[data-property-size]').inputValue(),'3');
  await page.locator('[data-property-changes] summary').click();if(process.env.SCREENSHOT_DIR)await editor.screenshot({path:process.env.SCREENSHOT_DIR+'/propiedades-determinantes-movil.png'});
  for(let i=0;i<6;i++){
   await quiz.getByText('Pregunta '+(i+1)+' de 6 · Sin límite de tiempo',{exact:true}).waitFor();
   if(i===0){await quiz.locator('input[value="wrong-1"]').check();await quiz.getByRole('button',{name:'Comprobar',exact:true}).click();await quiz.getByRole('button',{name:'Ver pista'}).click();await quiz.locator('.feedback').filter({hasText:'Pista:'}).waitFor();}
   await quiz.locator('input[value="correct"]').check();await quiz.getByRole('button',{name:'Comprobar',exact:true}).press('Enter');await quiz.getByRole('button',{name:/Siguiente pregunta|Ver resumen/}).waitFor();await math();await quiz.getByRole('button',{name:/Siguiente pregunta|Ver resumen/}).click();
  }
  await quiz.getByText('5 de 6 respuestas correctas',{exact:false}).waitFor();const deck=page.locator('[data-flashcards]');for(let i=1;i<=6;i++){await deck.getByText('Tarjeta '+i+' de 6',{exact:true}).waitFor();await deck.getByRole('button',{name:'Mostrar respuesta',exact:true}).click();await math();if(i<6)await deck.getByRole('button',{name:'Siguiente',exact:true}).click();}

 await page.locator('[data-reset-reading]').click();await page.reload();await output.locator('mjx-container').first().waitFor();await math();assert.equal(await page.locator('[data-property-preset]').inputValue(),'elimination');assert.equal(await page.locator('[data-property-size]').inputValue(),'3');assert.equal(await quiz.locator('input:checked').count(),0);
 await page.getByRole('link',{name:'Índice de matrices y determinantes',exact:true}).click();await page.waitForFunction(()=>document.querySelectorAll('[data-topic-index] li').length===12);const index=await page.locator('[data-topic-index]').innerText();assert.equal((index.match(/Disponible/g)||[]).length,12);assert.equal((index.match(/En preparación/g)||[]).length,0);
 await page.getByRole('link',{name:'Test disponible de matrices',exact:true}).click();await page.locator('[data-quiz] input').first().waitFor();await math();assert.match(await page.locator('[data-content-role="activity-progress"]').innerText(),/1 de 72/);
 await page.goto(base+'tarjetas/index.html?tema=t04');await page.getByText('Tarjeta 1 de 72',{exact:true}).waitFor();
 const prefix=new URL('prueba-subcarpeta/',base).href;await page.route(prefix+'**',async route=>{const response=await route.fetch({url:route.request().url().replace(prefix,base)});await route.fulfill({response});});await page.goto(prefix+lesson+'#explorador');await output.locator('mjx-container').first().waitFor();await math();await choose('[data-property-operation]','swap');assert.equal(await output.getAttribute('data-after'),'-3');assert.ok(await page.locator('#site-header a').count()>0);assert.ok(await page.locator('#site-footer').innerText());assert.deepEqual(errors,[]);
 console.log('Aprobado: cinco operaciones, filas/columnas, índices distintos, factores negativos/cero, cuatro bases, edición y variantes, test 5/6 y seis tarjetas, móvil 320/200 %, preferencias, recarga, t04 72/72, índice 12/12 y subcarpeta.');
 }finally{await browser.close();}
})().catch(e=>{console.error(e);process.exitCode=1;});

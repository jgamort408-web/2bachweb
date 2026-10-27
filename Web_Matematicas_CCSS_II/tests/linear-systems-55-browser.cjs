const assert=require('node:assert/strict'),{chromium}=require('playwright');
const base=process.env.TEST_URL||'http://127.0.0.1:4173/',topic='libro/temas/05-sistemas-de-ecuaciones/',lesson=topic+'01-sistemas-de-ecuaciones-lineales.html';
(async()=>{
 const browser=await chromium.launch({headless:true,executablePath:process.env.CHROME_PATH});
 try{
  const page=await browser.newPage({viewport:{width:1280,height:960}}),errors=[];
  page.on('pageerror',e=>errors.push(e.message));page.on('response',r=>{if(r.status()>=400&&!r.url().endsWith('favicon.ico'))errors.push(r.status()+' '+r.url());});
  const math=async()=>{await page.waitForFunction(()=>{const s=document.querySelector('.math-status');return s?.hidden===true&&!(/\\[\[(]/.test(document.querySelector('main')?.innerText||''));});assert.equal(await page.locator('[data-mml-node="merror"]').count(),0);assert.ok(await page.evaluate(()=>document.documentElement.scrollWidth<=innerWidth));};
  const output=page.locator('[data-system-output]'),root=page.locator('[data-system-explorer]');
  const field=(key,i,j)=>root.locator('[data-system-input="'+key+'"][data-row="'+i+'"]'+(j===undefined?'':'[data-col="'+j+'"]'));
  const edit=async(key,i,value,j)=>{const f=field(key,i,j);await f.fill(value);await f.press('Tab');await math();};
  const preset=async name=>{await page.locator('[data-system-preset]').selectOption(name);await math();};
  await page.goto(base+lesson+'#explorador');await output.locator('mjx-container').first().waitFor();await math();assert.ok(await page.locator('main mjx-container').count()>25);
  for(const [name,count,valid]of [['tickets','1','false'],['signed','2','true'],['three','2','true'],['identity','2','true'],['contradiction','1','false']]){
   await preset(name);assert.equal(await output.getAttribute('data-count'),count);assert.equal(await output.getAttribute('data-satisfied'),valid);
  }
  await preset('tickets');await edit('values',0,'5');await edit('values',1,'5');assert.equal(await output.getAttribute('data-satisfied'),'true');
  await edit('b',1,'66');assert.equal(await output.getAttribute('data-satisfied'),'false');assert.equal(await page.locator('[data-system-preset]').inputValue(),'custom');
  for(const invalid of ['','0.5','100']){await edit('b',1,invalid);assert.equal(await field('b',1).getAttribute('aria-invalid'),'true');assert.equal(JSON.parse(await output.getAttribute('data-snapshot')).b[1],66);assert.match(await page.locator('[data-system-status]').innerText(),/último valor válido/);}
  await edit('b',1,'65');assert.equal(await field('b',1).getAttribute('aria-invalid'),null);assert.equal(await output.getAttribute('data-satisfied'),'true');
  await edit('a',0,'2',0);assert.equal(await output.getAttribute('data-satisfied'),'false');
  await page.locator('[data-system-cols]').selectOption('3');await page.locator('[data-system-rows]').selectOption('3');await math();assert.equal(await root.locator('[data-system-input="a"]').count(),9);
  assert.equal(await field('a',0,0).inputValue(),'2');assert.equal(await field('a',2,2).inputValue(),'0');
  await page.locator('[data-system-generate]').click();await math();
  const generated=await page.evaluate(async base=>{const m=await import(base+'content/models/linear-systems.js');return m.generateSystem(Number(document.querySelector('[data-system-explorer]').dataset.seed),3,3);},base);
  assert.deepEqual(JSON.parse(await output.getAttribute('data-snapshot')),{a:generated.a,b:generated.b,values:generated.values});
  for(let j=0;j<3;j++)await edit('values',j,String(generated.solution[j]));assert.equal(await output.getAttribute('data-satisfied'),'true');
  // Cambios seguidos: el resultado final conserva la última selección.
  await page.locator('[data-system-preset]').selectOption('signed');await page.locator('[data-system-preset]').selectOption('contradiction');await page.locator('[data-system-preset]').selectOption('three');await math();assert.equal(JSON.parse(await output.getAttribute('data-snapshot')).values.length,3);
  if(process.env.SCREENSHOT_DIR)await root.screenshot({path:process.env.SCREENSHOT_DIR+'/sistemas-lineales-escritorio.png'});
  const quiz=page.locator('[data-quiz="t05-e01"]');await quiz.locator('input[value="correct"]').check();
  await page.locator('[data-reading-controls]>summary').click();await page.locator('[data-text-size]').selectOption('200');await page.locator('[data-contrast-control]').check();await page.locator('[data-highlight-control]').check();await page.setViewportSize({width:320,height:844});await math();
  assert.ok(await quiz.locator('input[value="correct"]').isChecked());assert.equal(await field('values',2).inputValue(),'2');
  if(process.env.SCREENSHOT_DIR)await root.screenshot({path:process.env.SCREENSHOT_DIR+'/sistemas-lineales-movil.png'});
  for(let i=0;i<6;i++){
   await quiz.getByText('Pregunta '+(i+1)+' de 6 · Sin límite de tiempo',{exact:true}).waitFor();
   if(i===0){await quiz.locator('input[value="wrong-1"]').check();await quiz.getByRole('button',{name:'Comprobar',exact:true}).click();await quiz.getByRole('button',{name:'Ver pista'}).click();await quiz.locator('.feedback').filter({hasText:'Pista:'}).waitFor();}
   await quiz.locator('input[value="correct"]').check();await quiz.getByRole('button',{name:'Comprobar',exact:true}).press('Enter');await quiz.getByRole('button',{name:/Siguiente pregunta|Ver resumen/}).waitFor();await math();await quiz.getByRole('button',{name:/Siguiente pregunta|Ver resumen/}).click();
  }
  await quiz.getByText('5 de 6 respuestas correctas',{exact:false}).waitFor();
  const deck=page.locator('[data-flashcards]');for(let i=1;i<=6;i++){await deck.getByText('Tarjeta '+i+' de 6',{exact:true}).waitFor();await deck.getByRole('button',{name:'Mostrar respuesta',exact:true}).click();await math();if(i<6)await deck.getByRole('button',{name:'Siguiente',exact:true}).click();}
  await page.locator('[data-reset-reading]').click();await page.reload();await output.locator('mjx-container').first().waitFor();await math();assert.equal(await field('values',0).inputValue(),'6');assert.equal(await quiz.locator('input:checked').count(),0);
  await page.getByRole('link',{name:'Índice de sistemas de ecuaciones',exact:true}).click();await page.waitForFunction(()=>document.querySelectorAll('[data-topic-index] li').length===11);
  const text=await page.locator('[data-topic-index]').innerText();assert.equal((text.match(/Disponible/g)||[]).length,11);assert.equal((text.match(/En preparación/g)||[]).length,0);
  await page.getByRole('link',{name:'Test disponible de sistemas',exact:true}).click();await page.locator('[data-quiz] input').first().waitFor();await math();assert.match(await page.locator('[data-content-role="activity-progress"]').innerText(),/1 de 66/);assert.match(await page.locator('[data-scope-label]').innerText(),/Tema 5/);
  assert.equal(await page.locator('[data-study-topics] [aria-current="page"]').innerText(),'Tema 5');
  await page.goto(base+'tarjetas/index.html?tema=t05');await page.getByText('Tarjeta 1 de 66',{exact:true}).waitFor();await page.getByRole('button',{name:'Mostrar respuesta',exact:true}).click();await math();
  const prefix=new URL('prueba-subcarpeta/',base).href;
  await page.route(prefix+'**',async route=>{const response=await route.fetch({url:route.request().url().replace(prefix,base)});await route.fulfill({response});});
  await page.goto(prefix+lesson+'#explorador');await output.locator('mjx-container').first().waitFor();await preset('signed');assert.equal(await output.getAttribute('data-satisfied'),'true');
  assert.ok(await page.locator('#site-header a').count()>0);assert.ok(await page.locator('#site-footer').innerText());assert.deepEqual(errors,[]);
  console.log('Aprobado: cinco ejemplos, sustitución simultánea, edición y validación, dimensiones 2–3, generación, cambios rápidos, test 5/6, seis tarjetas, móvil 320/200 %, preferencias, recarga, filtro t05, índice 11/11 y subcarpeta.');
 }finally{for(const context of browser.contexts())for(const page of context.pages())await page.unrouteAll({behavior:'ignoreErrors'});await browser.close();}
})().catch(e=>{console.error(e);process.exitCode=1;});

const assert=require('node:assert/strict'),fs=require('node:fs'),path=require('node:path');
const {chromium}=require('playwright');const {fixture,typeset}=require('./helpers/local-site.cjs');
(async()=>{
 const browser=await chromium.launch({headless:true,executablePath:process.env.CHROME_PATH||'C:/Program Files/Google/Chrome/Application/chrome.exe'});
 const out=path.resolve(__dirname,'../../tmp/teoria-26');fs.mkdirSync(out,{recursive:true});
 try {
  const context=await browser.newContext({serviceWorkers:'block',viewport:{width:360,height:800}});await fixture(context);const page=await context.newPage(),errors=[];page.on('pageerror',e=>errors.push(e.message));
  for(const prefix of ['', '/prueba-subcarpeta']){
   await page.goto('http://libro.test'+prefix+'/herramientas/glosario.html');await typeset(page,prefix);
   assert.equal(await page.locator('[data-glossary-entry]').count(),69);assert.equal(await page.locator('[data-mml-node="merror"]').count(),0);
   await page.locator('[data-glossary-search]').fill('Wald');assert.equal(await page.locator('[data-glossary-entry]:visible').count(),1);
   assert.match(await page.locator('[data-glossary-entry]:visible').innerText(),/aproximado/);
   await page.locator('[data-glossary-entry]:visible').scrollIntoViewIfNeeded();
   if(!prefix)await page.screenshot({path:path.join(out,'glosario-wald.png')});
   await page.locator('[data-glossary-entry]:visible a').click();await page.getByRole('navigation',{name:'En el glosario'}).getByRole('link',{name:'Intervalo de Wald para una proporción (glosario)',exact:true}).click();assert.match(page.url(),/#termino-intervalo-de-wald-para-una-proporcion$/);
  }
  let checked=0;
  for(const [topic,count] of [['t08',3],['t09',7],['bivariate',3],['combinatorics',2]]){
   await page.goto('http://libro.test/tarjetas/index.html?tema='+topic);
   await page.locator('[data-card-category]').waitFor();
   if(topic!=='combinatorics')await page.locator('[data-card-category]').selectOption('Conceptos de la teoría');
   const deck=page.locator('[data-flashcards]');await page.waitForFunction(n=>document.querySelector('[data-flashcards] [data-content-role="activity-progress"]')?.textContent.includes('1 de '+n),count);
   for(let i=0;i<count;i++){
    await deck.locator('[data-action="reveal"]').click();await deck.locator('[data-content-role="flashcard-back"]').waitFor();await page.evaluate(async()=>{const m=await import('/assets/js/core/math.js');await m.renderMath(document.querySelector('main'));});
    assert.equal(await page.locator('[data-mml-node="merror"]').count(),0);checked++;
    if(topic==='combinatorics'&&i===1){assert.match(await deck.innerText(),/Ampliación opcional/);await deck.locator('[data-content-role="flashcard-back"]').scrollIntoViewIfNeeded();await page.screenshot({path:path.join(out,'tarjeta-opcional.png')});}
    if(i<count-1)await deck.locator('[data-action="next-card"]').click();
   }
  }
  assert.equal(checked,15);
  const plain=await browser.newContext({javaScriptEnabled:false,serviceWorkers:'block'});await fixture(plain);const q=await plain.newPage();await q.goto('http://libro.test/herramientas/glosario.html');assert.equal(await q.locator('[data-glossary-entry]').count(),69);assert.ok(await q.locator('#termino-estimador').isVisible());await plain.close();
  assert.deepEqual(errors,[]);console.log('69 términos, raíz/subcarpeta, búsqueda, ida/vuelta a lección, 15 tarjetas y lectura estática verificados.');
 }finally{await browser.close();}
})().catch(e=>{console.error(e);process.exitCode=1;});

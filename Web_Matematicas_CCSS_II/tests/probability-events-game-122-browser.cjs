const assert=require('node:assert/strict');
const fs=require('node:fs');
const crypto=require('node:crypto');
const {chromium}=require('playwright');
(async()=>{
 const source=fs.readFileSync('../Página web existente/3. Probabilidad/1. Introducción a la probabilidad.txt');
 assert.equal(crypto.createHash('sha256').update(source).digest('hex'),'7805666e16e1f0b602632fa8d6dd2a8480f4453ff00a7b4b397e104166120d96');
 const {answerFor,generateSession,sameSet}=await import('../widgets/games/t07-a-algebra-de-sucesos/generator.js');
 assert.deepEqual(answerFor([1,2,3,4],[1,2],[2,3],'union'),[1,2,3]);
 assert.deepEqual(answerFor([1,2,3,4],[1,2],[2,3],'intersection'),[2]);
 assert.deepEqual(answerFor([1,2,3,4],[1,2],[2,3],'difference'),[1]);
 assert.deepEqual(answerFor([1,2,3,4],[1,2],[2,3],'complement'),[3,4]);
 assert.ok(sameSet([2,1],[1,2]));assert.ok(!sameSet([1,2],[1,2,3]));
 for(let i=0;i<1000;i++){
  const rounds=generateSession();assert.equal(rounds.length,8);
  for(const op of ['union','intersection','difference','complement'])assert.equal(rounds.filter(r=>r.operation===op).length,2);
  for(const r of rounds){assert.deepEqual(r.answer,answerFor(r.universe,r.a,r.b,r.operation));assert.ok(r.answer.length>0&&r.answer.length<6);}
 }
 const browser=await chromium.launch({headless:true,executablePath:process.env.CHROME_PATH});
 const base='http://127.0.0.1:4173/';
 try{
  const page=await browser.newPage({viewport:{width:1200,height:900}}),errors=[];
  page.on('pageerror',e=>errors.push(e.message));page.on('response',r=>{if(r.status()>=400&&!r.url().endsWith('favicon.ico'))errors.push(r.status()+' '+r.url());});
  for(const prefix of [base,base+'prueba-subcarpeta/']){
   if(prefix!==base)await page.route(prefix+'**',async route=>{const response=await route.fetch({url:route.request().url().replace(prefix,base)});await route.fulfill({response});});
   await page.goto(prefix+'laboratorios/juegos/t07-a-algebra-de-sucesos.html');
   const frame=page.frameLocator('iframe[title="Álgebra de sucesos"]');
   await frame.locator('[data-progress]').waitFor();
   assert.match(await frame.locator('[data-progress]').innerText(),/Reto 1 de 8/);
   assert.equal(await frame.locator('[data-choices] input').count(),6);
   await frame.locator('[data-check]').click();assert.match(await frame.locator('[data-feedback]').innerText(),/Selecciona/);
   await frame.locator('[data-hint]').click();assert.match(await frame.locator('[data-feedback]').innerText(),/Pista/);
  }
  await page.unrouteAll({behavior:'wait'});
  await page.goto(base+'widgets/games/t07-a-algebra-de-sucesos/index.html');
  // El widget dibuja tras un await de inicialización: esperar antes de leer el DOM.
  await page.locator('[data-question] h2').waitFor();
  for(let i=0;i<8;i++){
   const state=await page.evaluate(()=>({heading:document.querySelector('[data-question] h2').textContent,info:document.querySelector('[data-question] p').textContent}));
   const sets=[...state.info.matchAll(/\{([^}]*)\}/g)].map(m=>m[1].split(', ').map(Number));
   const op=state.heading.includes('∪')?'union':state.heading.includes('∩')?'intersection':state.heading.includes('\\')?'difference':'complement';
   for(const n of answerFor(sets[0],sets[1],sets[2],op))await page.locator('[data-choices] input[value="'+n+'"]').check();
   await page.locator('[data-check]').click();assert.match(await page.locator('[data-feedback]').innerText(),/Correcto/);
   await page.locator('[data-next]').press('Enter');
  }
  assert.match(await page.locator('[data-question]').innerText(),/800 de 800/);
  await page.locator('[data-restart]').click();assert.match(await page.locator('[data-progress]').innerText(),/Reto 1 de 8/);
  const info=await page.locator('[data-question] p').innerText();
  const sets=[...info.matchAll(/\{([^}]*)\}/g)].map(m=>m[1].split(', ').map(Number));
  const heading=await page.locator('[data-question] h2').innerText();
  const op=heading.includes('∪')?'union':heading.includes('∩')?'intersection':heading.includes('\\')?'difference':'complement';
  const answer=answerFor(sets[0],sets[1],sets[2],op);
  const wrong=sets[0].find(n=>!answer.includes(n));
  await page.locator('[data-choices] input[value="'+wrong+'"]').check();
  await page.locator('[data-check]').click();assert.match(await page.locator('[data-feedback]').innerText(),/Aún no/);
  await page.locator('[data-check]').click();assert.match(await page.locator('[data-feedback]').innerText(),/Dos intentos agotados/);
  assert.equal(await page.locator('[data-next]').isVisible(),true);
  await page.setViewportSize({width:390,height:844});await page.evaluate(()=>document.documentElement.style.fontSize='200%');
  assert.equal(await page.evaluate(()=>document.documentElement.scrollWidth>innerWidth),false);
  assert.deepEqual(errors,[]);
  console.log('PASS: 1000 partidas, cuatro operaciones, ocho rondas, corrección, pista, teclado, raíz/subcarpeta y móvil.');
 }finally{await browser.close();}
})().catch(e=>{console.error(e);process.exitCode=1;});

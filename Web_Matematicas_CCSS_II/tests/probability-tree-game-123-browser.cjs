const assert=require('node:assert/strict');
const fs=require('node:fs');
const crypto=require('node:crypto');
const {chromium}=require('playwright');
(async()=>{
 const source=fs.readFileSync('../Página web existente/3. Probabilidad/4. Tablas de contingencia y diagramas de árboles.txt');
 assert.equal(crypto.createHash('sha256').update(source).digest('hex'),'b014c0d54663b92251debe0accd1b423c4249c78d92db368d1c1a5597fdb14b8');
 const {valuesFor,generateSession,tasks}=await import('../widgets/games/t07-b-arbol-de-probabilidad/generator.js');
 assert.deepEqual(valuesFor(30,80,20),{ab:24,anb:6,nab:14,none:56,total:38,union:44});
 assert.deepEqual(valuesFor(40,40,40),{ab:16,anb:24,nab:24,none:36,total:40,union:64});
 for(let i=0;i<2000;i++){
  const rounds=generateSession();assert.equal(rounds.length,6);
  for(const task of tasks)assert.equal(rounds.filter(r=>r.task===task.id).length,1);
  for(const r of rounds){const v=valuesFor(r.p,r.q,r.r);assert.equal(r.answer,v[r.task]);assert.equal(v.ab+v.anb+v.nab+v.none,100);assert.ok(r.answer>=0&&r.answer<=100);}
 }
 const browser=await chromium.launch({headless:true,executablePath:process.env.CHROME_PATH});
 const base='http://127.0.0.1:4173/';
 try{
  const page=await browser.newPage({viewport:{width:1200,height:900}}),errors=[];
  page.on('pageerror',e=>errors.push(e.message));page.on('response',r=>{if(r.status()>=400&&!r.url().endsWith('favicon.ico'))errors.push(r.status()+' '+r.url());});
  for(const prefix of [base,base+'prueba-subcarpeta/']){
   if(prefix!==base)await page.route(prefix+'**',async route=>{const response=await route.fetch({url:route.request().url().replace(prefix,base)});await route.fulfill({response});});
   await page.goto(prefix+'laboratorios/juegos/t07-b-arbol-de-probabilidad.html');
   const frame=page.frameLocator('iframe[title="Árbol de probabilidad"]');
   await frame.locator('[data-progress]').waitFor();
   assert.match(await frame.locator('[data-progress]').innerText(),/Reto 1 de 6/);
   assert.equal(await frame.locator('[data-tree] li').count(),6);
   await frame.locator('[data-check]').click();assert.match(await frame.locator('[data-feedback]').innerText(),/Escribe un porcentaje/);
   await frame.locator('[data-hint]').click();assert.match(await frame.locator('[data-feedback]').innerText(),/Pista/);
  }
  await page.unrouteAll({behavior:'wait'});
  await page.goto(base+'widgets/games/t07-b-arbol-de-probabilidad/index.html');
  // El widget dibuja tras un await de inicialización: esperar antes de leer el DOM.
  await page.locator('[data-tree] li').first().waitFor();
  for(let i=0;i<6;i++){
   const state=await page.evaluate(()=>({text:document.querySelector('[data-tree]').textContent,question:document.querySelector('[data-question]').textContent}));
   const numbers=[...state.text.matchAll(/\((\d+) %\)/g)].map(m=>Number(m[1]));
   assert.equal(numbers.length,6);
   const [p,q,,pc,r]=numbers;assert.equal(pc,100-p);
   const task=tasks.find(t=>t.question===state.question);assert.ok(task);
   await page.locator('[data-answer]').fill(String(valuesFor(p,q,r)[task.id]));
   await page.locator('[data-answer]').press('Enter');
   assert.match(await page.locator('[data-feedback]').innerText(),/Correcto/);
   await page.locator('[data-next]').press('Enter');
  }
  assert.match(await page.locator('[data-tree]').innerText(),/600 de 600/);
  await page.locator('[data-restart]').click();assert.match(await page.locator('[data-progress]').innerText(),/Reto 1 de 6/);
  await page.locator('[data-answer]').fill('101');await page.locator('[data-check]').click();assert.match(await page.locator('[data-feedback]').innerText(),/Escribe un porcentaje/);
  const tree=await page.locator('[data-tree]').innerText();const n=[...tree.matchAll(/\((\d+) %\)/g)].map(m=>Number(m[1]));const question=await page.locator('[data-question]').innerText();const task=tasks.find(t=>t.question===question);
  const wrong=(valuesFor(n[0],n[1],n[4])[task.id]+1)%101;
  await page.locator('[data-answer]').fill(String(wrong));await page.locator('[data-check]').click();assert.match(await page.locator('[data-feedback]').innerText(),/Aún no/);
  await page.locator('[data-check]').click();assert.match(await page.locator('[data-feedback]').innerText(),/Dos intentos agotados/);
  await page.setViewportSize({width:390,height:844});await page.evaluate(()=>document.documentElement.style.fontSize='200%');
  assert.equal(await page.evaluate(()=>document.documentElement.scrollWidth>innerWidth),false);
  assert.deepEqual(errors,[]);
  console.log('PASS: 2000 árboles, seis tipos, rutas y totales, widget, pista, teclado, dos intentos, subcarpeta y móvil.');
 }finally{await browser.close();}
})().catch(e=>{console.error(e);process.exitCode=1;});

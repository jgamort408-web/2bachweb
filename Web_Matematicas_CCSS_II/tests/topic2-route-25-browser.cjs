const assert=require('node:assert/strict');const {chromium}=require('playwright');
const base=process.env.TEST_URL||'http://127.0.0.1:4173/';const topic='libro/temas/02-representacion-de-funciones/index.html';
(async()=>{const browser=await chromium.launch({headless:true,...(process.env.CHROME_PATH?{executablePath:process.env.CHROME_PATH}:{})});try{
 const page=await browser.newPage({viewport:{width:390,height:844}});const errors=[];page.on('pageerror',e=>errors.push(e.message));page.on('response',r=>{if(r.status()>=400&&!r.url().endsWith('favicon.ico'))errors.push(r.url());});
 await page.goto(base+topic);await page.waitForFunction(()=>document.querySelectorAll('[data-topic-index] li').length===9);assert.equal((await page.locator('[data-topic-index]').innerText()).match(/Disponible/g).length,9);
 for(const [name,id]of [['Practicar jugando: Construye la gráfica','t02-a-construye-la-grafica'],['Transforma la función','t02-b-transforma-la-funcion'],['Optimiza','t02-c-optimiza']]){
  await page.getByRole('link',{name,exact:true}).focus();await page.keyboard.press('Enter');await page.locator('iframe').scrollIntoViewIfNeeded();await page.waitForFunction(()=>document.querySelector('iframe')?.contentDocument?.querySelector('[data-game]'));
  assert.ok(page.url().endsWith('/'+id+'.html'));const frame=page.frames().find(f=>f.url().includes('/'+id+'/'));assert.ok(frame);assert.equal(await page.locator('iframe').getAttribute('title'),id==='t02-a-construye-la-grafica'?'Construye la gráfica':name);
  await page.getByRole('link',{name:'Recorrido del tema 2',exact:true}).click();assert.equal(page.url(),base+topic+'#ruta-juegos');
 }
 await page.getByRole('link',{name:'Test de representación',exact:true}).click();await page.locator('[data-quiz] input').first().waitFor();assert.match(await page.locator('[data-content-role="activity-progress"]').innerText(),/1 de 60/);
 await page.goBack();await page.getByRole('link',{name:'Tarjetas del tema 2',exact:true}).click();await page.getByText('Tarjeta 1 de 54',{exact:true}).waitFor();
 const statuses=await page.evaluate(async base=>(await(await fetch(base+'config/editorial.json')).json()).pages,base);assert.equal(statuses.t02,'partial');for(const id of ['t02-a-construye-la-grafica','t02-b-transforma-la-funcion','t02-c-optimiza'])assert.equal(statuses['game-'+id],'reviewed');
 assert.deepEqual(errors,[]);console.log('Aprobado: recorrido t02 con teclado, tres juegos insertados y retorno, test 60, tarjetas 54 y estados editoriales coherentes.');
}finally{await browser.close();}})().catch(e=>{console.error(e);process.exitCode=1;});

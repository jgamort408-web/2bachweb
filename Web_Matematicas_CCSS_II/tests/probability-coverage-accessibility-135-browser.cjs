const assert=require('node:assert/strict');
const fs=require('node:fs');
const path=require('node:path');
const {chromium}=require('playwright');
const lessons=[
 '01-sucesos-regla-de-laplace','02-algebra-de-sucesos','03-tablas-de-contingencia','04-frecuencias',
 '05-axiomatica-de-kolmogorov','06-propiedades-de-la-probabilidad','07-experimentos-compuestos',
 '08-probabilidad-condicionada','09-probabilidad-total','10-teorema-de-bayes'
];
(async()=>{
 const base='http://127.0.0.1:4173/';
 const browser=await chromium.launch({headless:true,executablePath:process.env.CHROME_PATH});
 const errors=[];
 try{
  const page=await browser.newPage({viewport:{width:1200,height:900}});
  page.on('pageerror',e=>errors.push(e.message));
  page.on('response',r=>{if(r.status()>=400&&!r.url().endsWith('favicon.ico'))errors.push(r.status()+' '+r.url());});
  for(const name of lessons){
   const url=base+`libro/temas/07-probabilidad/${name}.html#practica`;
   await page.goto(url);
   await page.waitForFunction(()=>document.querySelector('#practica .activity [data-content-role="activity-progress"]')?.textContent.includes('Pregunta 1 de 6'));
   assert.equal(await page.locator('[data-content-role="source"]').count(),1,name+': fuente');
   for(const role of ['objectives','prerequisites','common-errors','summary','warning']){
    assert.equal(await page.locator('[data-content-role="'+role+'"]').count(),1,name+': '+role);
   }
   const sectionTargets=await page.locator('main nav a[href^="#"]').evaluateAll(links=>links.map(link=>link.getAttribute('href').slice(1)));
   assert.equal(sectionTargets.length>0,true,name+': apartados');
   for(const target of sectionTargets){
    assert.equal(await page.locator('[id="'+target+'"]').count(),1,name+': apartado #'+target);
   }
   assert.equal(await page.locator('main details').evaluateAll(items=>items.every(item=>item.querySelector('summary')?.textContent.trim())),true,name+': desplegables');
   assert.equal(await page.locator('main h1').count(),1,`${name}: título`);
   assert.equal(await page.locator('a.skip-link[href="#main-content"]').count(),1,`${name}: salto`);
   assert.equal(await page.locator('main nav[aria-label]').count(),1,`${name}: navegación`);
   assert.match(fs.readFileSync(path.join(process.cwd(),'libro/temas/07-probabilidad',name+'.html'),'utf8'),/<noscript>[\s\S]*?<a href=/,`${name}: respaldo`);
   assert.equal(await page.locator('#practica fieldset legend').count(),1,`${name}: pregunta`);
   assert.equal(await page.locator('#practica input[type="radio"]').count(),4,`${name}: opciones`);
   assert.equal(await page.locator('#practica [role="status"]').count(),1,`${name}: estado`);
   assert.equal(await page.locator('[data-mml-node="merror"]').count(),0,`${name}: LaTeX`);
   assert.equal(await page.evaluate(()=>{const ids=[...document.querySelectorAll('[id]')].map(x=>x.id);return ids.length===new Set(ids).size;}),true,`${name}: ID únicos`);
   assert.equal(await page.locator('#practica table').evaluateAll(tables=>tables.every(table=>table.querySelector('caption')&&[...table.querySelectorAll('thead th')].every(th=>th.scope==='col')&&[...table.querySelectorAll('tbody th')].every(th=>th.scope==='row'))),true,`${name}: tablas`);
   const hrefs=await page.locator('main a[href]').evaluateAll(links=>links.map(a=>a.getAttribute('href')));
   assert.equal(await page.locator('main table').evaluateAll(tables=>tables.every(table=>table.querySelector('caption')&&table.querySelectorAll('thead th').length>0&&[...table.querySelectorAll('thead th')].every(th=>th.scope==='col')&&[...table.querySelectorAll('tbody th')].every(th=>th.scope==='row'))),true,name+': todas las tablas');
   for(const href of hrefs){
    if(!href||/^(?:https?:|mailto:|tel:)/i.test(href))continue;
    const target=new URL(href,url),file=path.join(process.cwd(),decodeURIComponent(target.pathname).replace(/^\//,''));
    assert.equal(fs.existsSync(file),true,`${name}: enlace ${href}`);
   }
   for(const href of hrefs.filter(value=>value&&value.includes('#')&&!/^(?:https?:|mailto:|tel:)/i.test(value))){
    const target=new URL(href,url),file=path.join(process.cwd(),decodeURIComponent(target.pathname).replace(/^\//,''));
    if(!target.hash||!file.endsWith('.html'))continue;
    const fragment=decodeURIComponent(target.hash.slice(1)),html=fs.readFileSync(file,'utf8');
    assert.ok(html.includes('id="'+fragment+'"')||html.includes("id='"+fragment+"'"),name+': destino #'+fragment+' de '+href);
   }
   const root=page.locator('#practica .activity');
   await root.locator('input[value="a"]').check();await root.locator('button').nth(0).click();
   await page.waitForFunction(()=>document.querySelector('#practica .activity [data-content-role="feedback"]')?.textContent.includes('Correcta.'));
   assert.match(await root.locator('[data-content-role="feedback"]').innerText(),/Correcta/,`${name}: respuesta`);
   assert.equal(await root.locator('button').nth(2).evaluate(button=>document.activeElement===button),true,`${name}: foco tras corregir`);
   await root.locator('button').nth(2).press('Enter');
   assert.equal(await root.locator('input').first().evaluate(input=>document.activeElement===input),true,`${name}: foco en nueva pregunta`);
  }
  await page.goto(base+'libro/temas/07-probabilidad/index.html#practica-por-leccion');
  assert.equal(await page.locator('#practica-por-leccion a[href$="#practica"]').count(),10);
  assert.equal(await page.locator('#ruta-juegos a').count(),3);
  assert.deepEqual(errors,[]);
  console.log('PASS: diez lecciones con práctica, enlaces, MathJax, semántica básica, foco por teclado y tres juegos accesibles desde el índice.');
 }finally{await browser.close();}
})().catch(e=>{console.error(e);process.exitCode=1;});

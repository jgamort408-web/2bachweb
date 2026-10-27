const assert=require('node:assert/strict');
const fs=require('node:fs');
const crypto=require('node:crypto');
const {chromium}=require('playwright');
(async()=>{
 const source=fs.readFileSync('../Página web existente/5. Inferencia Estadística/8. Intervalos de confianza.txt');
 assert.equal(crypto.createHash('sha256').update(source).digest('hex'),'d916f6fd7c3b455c38d5752158748af848af4b7b470a2c2989ae9a6b88c7c737');
 const base='http://127.0.0.1:4173/',browser=await chromium.launch({headless:true,executablePath:process.env.CHROME_PATH});
 try{
  const page=await browser.newPage({viewport:{width:1200,height:900}}),errors=[];
  page.on('pageerror',e=>errors.push(e.message));page.on('response',r=>{if(r.status()>=400&&!r.url().endsWith('favicon.ico'))errors.push(r.status()+' '+r.url());});
  for(const prefix of [base,base+'prueba-subcarpeta/']){
   if(prefix!==base)await page.route(prefix+'**',async route=>{const response=await route.fetch({url:route.request().url().replace(prefix,base)});await route.fulfill({response});});
   await page.goto(prefix+'libro/temas/09-inferencia-estadistica/07-intervalos-de-confianza.html#laboratorio');
   await page.waitForFunction(()=>document.querySelector('[data-ci-lab]')?.hidden===false);
   assert.equal(await page.locator('[data-ci-margin]').innerText(),'5,37');
   assert.equal(await page.locator('[data-ci-interval]').innerText(),'[94,63; 105,37]');
   assert.equal(await page.locator('[data-ci-width]').innerText(),'10,74');
   assert.equal(await page.locator('[data-mml-node="merror"]').count(),0);
   await page.locator('[name="n"]').fill('120');assert.equal(await page.locator('[data-ci-margin]').innerText(),'2,68');
   await page.locator('[name="confidence"]').selectOption('99');assert.equal(await page.locator('[data-ci-margin]').innerText(),'3,53');
   const coordinates=await page.evaluate(()=>({lower:Number(document.querySelector('[data-ci-band]').getAttribute('x')),upper:Number(document.querySelector('[data-ci-right]').getAttribute('x1')),center:Number(document.querySelector('[data-ci-point]').getAttribute('cx'))}));
   assert.ok(Math.abs(coordinates.center-100)<1e-12&&coordinates.lower<100&&coordinates.upper>100);
   await page.locator('[name="mean"]').focus();await page.keyboard.press('ArrowRight');assert.equal(await page.locator('[data-ci-value="mean"]').innerText(),'101');
   await page.goto(prefix+'libro/temas/09-inferencia-estadistica/index.html');await page.waitForFunction(()=>document.querySelector('[data-topic-index]')?.textContent.includes('9.7. Intervalos de confianza'));
   assert.match(await page.locator('[data-topic-index]').innerText(),/9\.7\. Intervalos de confianza · Contenido parcial/);
  }
  await page.goto(base+'libro/temas/09-inferencia-estadistica/07-intervalos-de-confianza.html');await page.setViewportSize({width:390,height:844});await page.evaluate(()=>document.documentElement.style.fontSize='200%');
  assert.equal(await page.evaluate(()=>document.documentElement.scrollWidth>innerWidth),false);
  const nojs=await browser.newPage({javaScriptEnabled:false});await nojs.goto(base+'libro/temas/09-inferencia-estadistica/07-intervalos-de-confianza.html');
  assert.equal(await nojs.locator('[data-ci-lab]').isVisible(),false);assert.match(await nojs.locator('#laboratorio').innerText(),/Sin JavaScript/);await nojs.close();
  assert.deepEqual(errors,[]);
  console.log('PASS: original, controles, intervalos, figura, MathJax, índice, teclado, raíz/subcarpeta, móvil y lectura sin JS.');
 }finally{await browser.close();}
})().catch(e=>{console.error(e);process.exitCode=1;});

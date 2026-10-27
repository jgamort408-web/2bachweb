const assert=require('node:assert/strict'),{chromium}=require('playwright'),fs=require('node:fs'),path=require('node:path'),{createHash}=require('node:crypto');
const base='http://127.0.0.1:4173/',lesson='libro/temas/08-distribuciones-de-probabilidad/04-aproximacion-de-la-distribucion-binomial-a-la-distribucion-normal.html';
(async()=>{
const source=fs.readFileSync('../Página web existente/4. Distribuciones/4. Aproximación de la Binomial por la Normal.txt');
assert.equal(createHash('sha256').update(source).digest('hex'),'04858d820bc36c49cbda3a3eb057d0bfdf84ab3a0ff5751899b5202a17eb6779');
const browser=await chromium.launch({headless:true,executablePath:process.env.CHROME_PATH});
try{
const page=await browser.newPage({viewport:{width:1200,height:900}}),errors=[];
page.on('pageerror',e=>errors.push(e.message));
page.on('response',r=>{if(r.status()>=400&&!r.url().endsWith('favicon.ico'))errors.push(r.status()+' '+r.url())});
const {approximationReadings}=await import('../content/models/binomial-normal-approximation.js');
async function ready(){
 await page.locator('[data-approx-controls]:not([hidden])').waitFor();
 const vals=await page.locator('[data-approx-controls] input').evaluateAll(es=>Object.fromEntries(es.map(e=>[e.name,Number(e.value)])));
 const m=approximationReadings(vals);
 await page.waitForFunction(m=>{const d=document.querySelector('[data-approx-results]').dataset;return Math.abs(Number(d.exact)-m.exact)<1e-12&&Math.abs(Number(d.approximate)-m.approximate)<1e-12},m);
 await page.waitForFunction(()=>!/\\[[(]/.test(document.querySelector('main').innerText));
 assert.equal(await page.locator('[data-mml-node="merror"]').count(),0);
 assert.equal(await page.locator('.normal-plot-scroll > div > svg').count(),4);
 assert.equal(await page.evaluate(()=>document.documentElement.scrollWidth>innerWidth),false);
 for(const p of await page.locator('[data-approx-curve]').all())assert.ok(!/NaN|Infinity/.test(await p.getAttribute('d')));
}
async function set(vals){await page.evaluate(vals=>{for(const [k,v]of Object.entries(vals)){const e=document.querySelector('#approx-'+k);e.value=v;e.dispatchEvent(new Event('input',{bubbles:true}))}},vals);await ready();}
for(const prefix of [base,base+'prueba-subcarpeta/']){
 if(prefix!==base)await page.route(prefix+'**',async route=>{const response=await route.fetch({url:route.request().url().replace(prefix,base)});await route.fulfill({response})});
 await page.goto(prefix+lesson);await ready();
 assert.equal(await page.locator('[data-approx-controls] input').count(),6);
 await set({mode:1,A:25,B:25});assert.match(await page.locator('[data-approx-status]').innerText(),/ancho uno/);
 await set({A:40,B:20});assert.match(await page.locator('[data-approx-status]').innerText(),/ordenado/);
 await set({n:10,p:.05});assert.equal(await page.locator('#approx-A').inputValue(),'10');
 await set({n:200,p:.95,K:200,A:0,B:200});await set({mode:0});
 await page.locator('#approx-K').focus();await page.keyboard.press('ArrowLeft');await ready();assert.equal(await page.locator('#approx-K').inputValue(),'199');
 await set({n:50,p:.5,K:30,mode:1,A:20,B:40});
}
await page.locator('#approx-mass').screenshot({path:path.resolve('../tmp/aproximacion-masa.png')});
await page.locator('#approx-cdf').screenshot({path:path.resolve('../tmp/aproximacion-acumulada.png')});
await page.setViewportSize({width:390,height:844});await page.evaluate(()=>document.documentElement.style.fontSize='200%');await ready();
await page.locator('[data-approx-controls]').screenshot({path:path.resolve('../tmp/aproximacion-controles.png')});
await page.reload();await ready();assert.equal(await page.locator('#approx-mode').inputValue(),'0');
const context=await browser.newContext({javaScriptEnabled:false});const nojs=await context.newPage();await nojs.goto(base+lesson);assert.equal(await nojs.locator('[data-approx-controls]').isVisible(),false);assert.ok(await nojs.locator('#continuidad').isVisible());await context.close();
assert.deepEqual(errors,[]);console.log('PASS: fuente, seis controles, cuatro gráficos, probabilidades, fórmulas, extremos, teclado, subcarpeta, móvil y sin JS.');
}finally{await browser.close()}
})().catch(e=>{console.error(e);process.exitCode=1});

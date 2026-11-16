const assert=require('node:assert/strict'),fs=require('node:fs'),path=require('node:path');
const {chromium}=require('playwright');const {fixture}=require('./helpers/local-site.cjs');
const cases=require('./fixtures/math-reading-cases.json');
(async()=>{
 const browser=await chromium.launch({headless:true,executablePath:process.env.CHROME_PATH||'C:/Program Files/Google/Chrome/Application/chrome.exe'});
 const out=path.resolve(__dirname,'../../tmp/teoria-25e');fs.mkdirSync(out,{recursive:true});
 try{
  const context=await browser.newContext({serviceWorkers:'block'});await fixture(context);const page=await context.newPage();const errors=[];page.on('pageerror',e=>errors.push(e.message));
  // Documento de prueba servido sólo dentro del navegador de pruebas.
  await page.route('http://libro.test/__math-reading-check',route=>route.fulfill({contentType:'text/html',body:'<!doctype html><html lang="es"><meta charset="utf-8"><title>Comprobación matemática</title><link rel="stylesheet" href="/assets/css/main.css"><main></main></html>'}));
  await page.goto('http://libro.test/__math-reading-check');
  await page.evaluate(async cases=>{const main=document.querySelector('main');for(const item of cases){const section=document.createElement('section'),h=document.createElement('h2'),p=document.createElement('p');section.id=item.id;h.textContent=item.title;p.textContent='\\['+item.tex+'\\]';section.append(h,p);main.append(section);}const m=await import('/assets/js/core/math.js');await m.renderMath(main);},cases);
  assert.equal(await page.locator('mjx-container').count(),cases.length);assert.equal(await page.locator('[data-mml-node="merror"]').count(),0);
  assert.equal(await page.locator('mjx-container > svg').count(),cases.length);
  assert.equal(await page.locator('mjx-container > svg:not([aria-hidden="true"])').count(),0);
  const client=await context.newCDPSession(page);const {nodes}=await client.send('Accessibility.getFullAXTree');const byId=new Map(nodes.map(n=>[n.nodeId,n]));
  assert.equal(nodes.filter(n=>!n.ignored&&n.role?.value==='MathMLMath').length,cases.length,'Una única raíz matemática expuesta por fórmula');
  const doc=await client.send('DOM.getDocument'),results=[];
  for(const item of cases){
   const {nodeId}=await client.send('DOM.querySelector',{nodeId:doc.root.nodeId,selector:'#'+item.id+' mjx-assistive-mml math'});assert.ok(nodeId);
   const {node}=await client.send('DOM.describeNode',{nodeId});const ax=nodes.find(n=>n.backendDOMNodeId===node.backendNodeId&&!n.ignored);assert.equal(ax?.role?.value,'MathMLMath',item.id);
   const roles=new Set(),pending=[ax.nodeId],seen=new Set();while(pending.length){const id=pending.pop();if(seen.has(id))continue;seen.add(id);const n=byId.get(id);if(!n)continue;if(!n.ignored)roles.add(n.role?.value);pending.push(...(n.childIds||[]));}
   for(const role of item.roles)assert.ok(roles.has(role),item.id+': falta '+role+'; presentes '+[...roles].join(', '));
   if(item.id==='matriz'){assert.equal(await page.locator('#matriz mjx-assistive-mml mtr').count(),2);assert.equal(await page.locator('#matriz mjx-assistive-mml mtd').count(),6);}
   results.push({id:item.id,roles:[...roles].sort(),exposed:true,svgHidden:true,pronunciation:'Pendiente de escucha real'});
  }
  assert.deepEqual(errors,[]);const report={browser:browser.version(),platform:process.platform,language:await page.locator('html').getAttribute('lang'),results,scope:'Estructura accesible en Chrome; no prueba pronunciación ni compatibilidad con un lector concreto.'};assert.equal(report.language,'es');fs.writeFileSync(path.join(out,'estructura-accesible.json'),JSON.stringify(report,null,2));
  console.log(JSON.stringify(report,null,2));
 }finally{await browser.close();}
})().catch(e=>{console.error(e);process.exitCode=1;});

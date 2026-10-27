const assert=require('node:assert/strict');
const fs=require('node:fs');
const path=require('node:path');
const {chromium}=require('playwright');
(async()=>{
 const pages=JSON.parse(fs.readFileSync('config/pages.json','utf8')).filter(p=>p.id==='t09'||p.parentId==='t09');
 const editorial=JSON.parse(fs.readFileSync('config/editorial.json','utf8'));
 assert.equal(pages.length,11);
 assert.equal(pages.filter(p=>p.kind==='lesson').length,9);
 for(const p of pages)assert.equal(editorial.pages[p.id],'partial',p.id);
 const browser=await chromium.launch({headless:true,executablePath:process.env.CHROME_PATH}),base='http://127.0.0.1:4173/',errors=[];
 try{
  const page=await browser.newPage({viewport:{width:1200,height:850}});
  page.on('pageerror',e=>errors.push(e.message));page.on('response',r=>{if(r.status()>=400&&!r.url().endsWith('favicon.ico'))errors.push(r.status()+' '+r.url());});
  for(const entry of pages){
   await page.goto(base+entry.path);
   await page.waitForFunction(()=>!!document.querySelector('#site-header a')&&!!document.querySelector('#site-footer'));
   const source=fs.readFileSync(entry.path,'utf8');
   if(source.includes('\\(')||source.includes('\\['))await page.waitForFunction(()=>document.querySelectorAll('mjx-container').length>0);
   assert.equal(await page.locator('main h1').count(),1,entry.id);
   assert.equal(await page.locator('main').count(),1,entry.id);
   assert.equal(await page.locator('[data-mml-node="merror"]').count(),0,entry.id);
   const links=await page.locator('main a[href]').evaluateAll(nodes=>nodes.map(a=>({href:a.getAttribute('href'),target:a.href})));
   for(const link of links){
    const url=new URL(link.target);
    if(url.origin!==base.slice(0,-1))continue;
    const rel=decodeURIComponent(url.pathname.slice(1));
    const file=path.resolve(rel);
    assert.ok(fs.existsSync(file),entry.id+' broken link '+link.href);
    if(url.hash&&file.endsWith('.html')){
     const target=decodeURIComponent(url.hash.slice(1));
     const destination=await browser.newPage({javaScriptEnabled:false});
     await destination.goto(base+rel);
     assert.equal(await destination.locator('[id="'+target.replaceAll('"','\\"')+'"]').count()>0,true,entry.id+' missing anchor '+link.href);
     await destination.close();
    }
   }
  }
  await page.goto(base+'libro/temas/09-inferencia-estadistica/index.html');
  await page.waitForFunction(()=>document.querySelector('[data-topic-index] li')?.textContent.includes('Contenido parcial'));
  assert.equal(await page.locator('[data-topic-index] li').count(),9);
  assert.equal(await page.locator('[data-topic-index] li').filter({hasText:'Contenido parcial'}).count(),9);
  assert.deepEqual(errors,[]);
  console.log('PASS: 11 rutas del tema 9, 9 epígrafes parciales, enlaces/fragmentos, MathJax y estructura común.');
 }finally{await browser.close();}
})().catch(e=>{console.error(e);process.exitCode=1;});


const assert=require('node:assert/strict');
const fs=require('node:fs');
const {chromium}=require('playwright');
(async()=>{
 const pages=JSON.parse(fs.readFileSync('config/pages.json','utf8')).filter(p=>p.parentId==='t09'&&p.kind==='lesson');
 assert.equal(pages.length,9);
 const browser=await chromium.launch({headless:true,executablePath:process.env.CHROME_PATH}),base='http://127.0.0.1:4173/',errors=[];
 try{
  const page=await browser.newPage({viewport:{width:1200,height:850}});
  page.on('pageerror',e=>errors.push(e.message));
  for(const entry of pages){
   await page.goto(base+entry.path);
   await page.waitForFunction(()=>!!document.querySelector('#site-header a'));
   const source=fs.readFileSync(entry.path,'utf8');
   if(source.includes('\\(')||source.includes('\\['))await page.waitForFunction(()=>document.querySelectorAll('mjx-container').length>0);
   const audit=await page.evaluate(()=>{
    const containers=[...document.querySelectorAll('main mjx-container')];
    const missingMathML=containers.filter(c=>!c.querySelector('mjx-assistive-mml math')).length;
    const tables=[...document.querySelectorAll('main table')];
    const figures=[...document.querySelectorAll('main figure svg[role="img"]')].filter(f=>!f.closest('mjx-container'));
    return {formulae:containers.length,missingMathML,badTables:tables.filter(t=>!t.querySelector('caption')||[...t.querySelectorAll('th')].some(h=>!h.hasAttribute('scope'))).length,badFigures:figures.filter(f=>{const refs=(f.getAttribute('aria-labelledby')||'').split(/\s+/);return refs.length<2||refs.some(id=>!document.getElementById(id));}).length,mathErrors:document.querySelectorAll('[data-mml-node="merror"]').length};
   });
   assert.equal(audit.missingMathML,0,entry.id+' missing assistive MathML');
   assert.equal(audit.badTables,0,entry.id+' table semantics');
   assert.equal(audit.badFigures,0,entry.id+' figure semantics');
   assert.equal(audit.mathErrors,0,entry.id+' invalid formula');
   if(['t09-e06','t09-e07','t09-e09'].includes(entry.id))
    assert.ok((await page.locator('main').innerText()).includes('En palabras:'),entry.id+' missing verbal explanation');
   console.log(entry.id+': '+audit.formulae+' fórmulas');
  }
  assert.deepEqual(errors,[]);
  console.log('PASS: MathML de apoyo, tablas, figuras y fórmulas en los nueve epígrafes.');
 }finally{await browser.close();}
})().catch(e=>{console.error(e);process.exitCode=1;});

const fs=require('node:fs'),path=require('node:path'),assert=require('node:assert/strict'),{chromium}=require('playwright');
const root=path.resolve(__dirname,'..'),out=path.resolve(root,'../tmp/teoria-25');
const {cases,fixture,typeset}=require('./helpers/local-site.cjs');
(async()=>{fs.mkdirSync(out,{recursive:true});const b=await chromium.launch({headless:true,executablePath:process.env.CHROME_PATH||'C:/Program Files/Google/Chrome/Application/chrome.exe'}),results=[];try{const c=await b.newContext({serviceWorkers:'block'}),plain=await b.newContext({serviceWorkers:'block',javaScriptEnabled:false});await fixture(c);await fixture(plain);
for(let i=0;i<cases.length;i++){const item=cases[i],p=await c.newPage(),r={...item,errors:[],views:[]};p.on('pageerror',e=>r.errors.push(e.message));try{await p.goto('http://libro.test/'+item.file);await typeset(p);r.math=await p.locator('main mjx-container').count();r.mathErrors=await p.locator('[data-mml-node="merror"],mjx-merror').count();r.assistive=await p.locator('main mjx-assistive-mml').count();
for(const [width,font]of [[1280,'100%'],[360,'100%'],[1280,'200%']]){await p.setViewportSize({width,height:800});await p.evaluate(v=>document.documentElement.style.fontSize=v,font);await p.waitForTimeout(100);r.views.push({width,font,scroll:await p.evaluate(()=>document.documentElement.scrollWidth)});r.formulaScroll??=[];
const wide=await p.locator('main mjx-container').evaluateAll(nodes=>nodes.map((e,i)=>({i,width:e.clientWidth,scroll:e.scrollWidth})).filter(e=>e.width>0&&e.scroll>e.width+2));
for(const item of wide){
 const formula=p.locator('main mjx-container').nth(item.i);await formula.scrollIntoViewIfNeeded();await formula.focus();
 const before=await formula.evaluate(e=>({left:e.scrollLeft,tabindex:e.tabIndex}));
 await p.keyboard.press('ArrowRight');await p.waitForTimeout(80);
 const right=await formula.evaluate(e=>e.scrollLeft);
 await formula.evaluate(e=>e.scrollLeft=e.scrollWidth);
 const end=await formula.evaluate(e=>{const box=e.getBoundingClientRect(),svg=e.querySelector('svg').getBoundingClientRect();return {left:e.scrollLeft,rightVisible:svg.right<=box.right+2,startReachable:svg.left>=box.left-2};});
 await p.keyboard.press('ArrowLeft');await p.waitForTimeout(80);const back=await formula.evaluate(e=>e.scrollLeft);
 assert.ok(before.tabindex>=0&&right>before.left&&back<end.left,'Fórmula larga desplazable con teclado en ambos sentidos: '+JSON.stringify({before,right,end,back,width,font,index:item.i}));assert.ok(end.rightVisible,'Extremo derecho de fórmula alcanzable');
 await formula.evaluate(e=>e.scrollLeft=0);const startVisible=await formula.evaluate(e=>e.querySelector('svg').getBoundingClientRect().left>=e.getBoundingClientRect().left-2);assert.ok(startVisible,'Inicio de fórmula alcanzable');
 r.formulaScroll.push({width,font,index:item.i,keyboard:true,startVisible,endVisible:end.rightVisible});
}
}
await p.setViewportSize({width:360,height:800});await p.evaluate(()=>document.documentElement.style.fontSize='100%');r.tables=[];
for(const region of await p.locator('.table-readable').all()){
 await region.scrollIntoViewIfNeeded();await region.focus();
 const before=await region.evaluate(e=>({width:e.clientWidth,scrollWidth:e.scrollWidth,left:e.scrollLeft,label:e.getAttribute('aria-label'),tabindex:e.tabIndex,role:e.getAttribute('role'),cellWrap:getComputedStyle(e.querySelector('th')).overflowWrap}));
 await p.keyboard.press('ArrowRight');await p.waitForTimeout(250);
 const after=await region.evaluate(e=>e.scrollLeft);
 assert.ok(before.scrollWidth>before.width,'La tabla debe conservar un ancho legible en móvil');
 assert.ok(before.label&&before.role==='region'&&before.tabindex===0,'Región nombrada accesible por teclado');
 assert.equal(before.cellWrap,'normal');assert.ok(after>before.left,'La flecha derecha debe desplazar la tabla enfocada');
 await region.evaluate(e=>e.scrollLeft=0);r.tables.push({...before,keyboardScroll:after});
}
await p.locator('#'+item.anchor).scrollIntoViewIfNeeded();await p.screenshot({path:path.join(out,`mobile-${String(i+1).padStart(2,'0')}.png`)});
if([4,11,15].includes(i)){await p.setViewportSize({width:1280,height:800});await p.locator('#'+item.anchor).scrollIntoViewIfNeeded();await p.screenshot({path:path.join(out,`desktop-${i+1}.png`)});}
let q=await plain.newPage();await q.goto('http://libro.test/'+item.file);r.staticVisible=await q.locator('#'+item.anchor).isVisible();r.staticTex=/\\[\[(]/.test(await q.locator('#'+item.anchor).innerText());await q.close();
if([11,15].includes(i)){await p.goto('http://libro.test/prueba-subcarpeta/'+item.file);await typeset(p,'/prueba-subcarpeta');r.subfolderMath=await p.locator('main mjx-container').count();}
}catch(e){r.failure=e.message;}finally{await p.close();results.push(r);fs.writeFileSync(path.join(out,'resultados.json'),JSON.stringify(results,null,2));console.log(JSON.stringify({page:i+1,math:r.math,mathErrors:r.mathErrors,overflow:r.views.filter(v=>v.scroll>v.width+2),errors:r.errors,failure:r.failure,static:r.staticVisible}));}}
}finally{await b.close();}let failures=results.filter(r=>r.failure||!r.math||r.assistive!==r.math||r.mathErrors||r.errors.length||!r.staticVisible||r.views.some(v=>v.scroll>v.width+2));assert.equal(failures.length,0,JSON.stringify(failures,null,2));console.log('16 páginas verificadas con recursos locales interceptados, sin red real.');})().catch(e=>{console.error(e);process.exitCode=1;});

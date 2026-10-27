const assert = require('node:assert/strict');
const { chromium } = require('playwright');
const base = process.env.TEST_URL || 'http://127.0.0.1:4173/';
const widget = 'widgets/games/t01-b-continuidad-repara-la-funcion/';
(async () => {
  const browser = await chromium.launch({headless:true,...(process.env.CHROME_PATH?{executablePath:process.env.CHROME_PATH}:{})});
  const errors=[];
  try {
    const page=await browser.newPage({viewport:{width:390,height:844}});
    page.on('pageerror',error=>errors.push(error.message));
    page.on('response',response=>{if(response.status()>=400&&!response.url().endsWith('favicon.ico'))errors.push(response.status()+' '+response.url());});
    const checkMath=async(target=page)=>{
      await target.waitForFunction(()=>document.querySelector('.math-status')?.hidden===true);
      assert.equal(await target.locator('[data-mml-node="merror"]').count(),0);
      assert.equal(await target.evaluate(()=>document.documentElement.scrollWidth<=innerWidth),true,'Desbordamiento horizontal: '+target.url());
    };
    await page.goto(base+'practicar/index.html');
    for (const detail of await page.locator('#resueltos details').all()) {
      await detail.locator('summary').click();
      await checkMath();
    }
    const answers=await page.evaluate(async base=>{
      const {questionsForScope}=await import(base+'content/activities/catalog.js');
      return questionsForScope('review-t01').map(q=>({right:q.correct,wrong:q.options.find(o=>o.id!==q.correct).id}));
    },base);
    assert.equal(answers.length,6);
    for(let i=0;i<answers.length;i++){
      if(i===0){
        await page.getByRole('button',{name:'Comprobar',exact:true}).click();
        await page.getByText('Selecciona una respuesta',{exact:false}).waitFor();
        await page.locator('input[value="'+answers[i].wrong+'"]').check();
        await page.getByRole('button',{name:'Comprobar',exact:true}).click();
        await page.getByText('Revisa tu respuesta',{exact:false}).waitFor();
        await page.getByRole('button',{name:'Ver pista',exact:true}).click();
      }
      await page.locator('input[value="'+answers[i].right+'"]').check();
      await page.getByRole('button',{name:'Comprobar',exact:true}).click();
      await checkMath();
      await page.getByRole('button',{name:/Siguiente pregunta|Ver resumen/}).click();
    }
    await page.getByText('5 de 6 respuestas correctas al primer intento',{exact:false}).waitFor();
    // Semilla controlada solo en la prueba; el producto usa crypto.
    await page.addInitScript(()=>{crypto.getRandomValues=(array)=>{array.fill(42);return array;};});
    await page.goto(base+widget+'index.html');
    const rounds=await page.evaluate(async url=>(await import(url+'generator.js')).generateRepairSession(42),base+widget);
    await checkMath();
    assert.equal(await page.locator('[data-repair-adjust]').isVisible(),false);
    for (let i=0;i<rounds.length;i++) {
      const q=rounds[i], left=q.m*q.a+q.b, right=q.a*q.a+q.c;
      const diagnosis=left!==right?'jump':left===q.pointValue?'continuous':'removable';
      if(i===0){
        await page.getByRole('button',{name:'Comprobar análisis',exact:true}).click();
        await page.locator('[data-repair-analysis-feedback]').filter({hasText:'Completa'}).waitFor();
        await page.locator('#repair-left-answer').fill(String(left+1));
        await page.locator('#repair-right-answer').fill(String(right));
        await page.locator('#repair-diagnosis').selectOption(diagnosis);
        for(let retry=0;retry<2;retry++)await page.getByRole('button',{name:'Comprobar análisis',exact:true}).click();
        assert.match(await page.locator('[data-repair-progress]').innerText(),/150 puntos/);
        await page.locator('[data-repair-hint]').click();
      }
      await page.locator('#repair-left-answer').fill(String(left));
      await page.locator('#repair-right-answer').fill(String(right));
      await page.locator('#repair-diagnosis').selectOption(diagnosis);
      await page.locator('#repair-right-answer').press('Enter');
      assert.equal(await page.locator('#repair-b').evaluate(el=>document.activeElement===el),true);
      if(i===0){
        const path=await page.locator('[data-repair-left-curve]').getAttribute('d');
        for(const invalid of ['', '31', 'hola']){
          await page.locator('#repair-b').fill(invalid);
          await page.getByRole('button',{name:'Comprobar reparación',exact:true}).click();
          assert.equal(await page.locator('[data-repair-left-curve]').getAttribute('d'),path);
          assert.equal(await page.locator('[data-repair-next]').isVisible(),false);
        }
        await page.locator('#repair-b').fill(String(q.targetB+1));
        await page.locator('#repair-value').fill(String(q.targetValue));
        await page.getByRole('button',{name:'Comprobar reparación',exact:true}).click();
        await page.locator('[data-repair-adjust-feedback]').filter({hasText:'Aún no es continua'}).waitFor();
        await page.locator('#repair-b').fill('0,5');
        await checkMath();
        assert.match(await page.locator('#repair-graph-description').textContent(),/0,5|altura/);
      }
      await page.locator('#repair-b').fill(String(q.targetB));
      await page.locator('#repair-value').fill(String(q.targetValue));
      await page.locator('#repair-value').press('Enter');
      await page.locator('[data-repair-adjust-feedback]').filter({hasText:'Reparación correcta'}).waitFor();
      await checkMath();
      assert.equal(await page.locator('[data-repair-formula] mjx-container').count(),1);
      const progress=await page.locator('[data-repair-progress]').innerText();
      await page.locator('[data-repair-adjust]').dispatchEvent('submit');
      assert.equal(await page.locator('[data-repair-progress]').innerText(),progress);
      const leftY=await page.locator('[data-repair-left-hole]').getAttribute('cy');
      assert.equal(leftY,await page.locator('[data-repair-right-hole]').getAttribute('cy'));
      assert.equal(leftY,await page.locator('[data-repair-dot]').getAttribute('cy'));
      if(i===0&&process.env.SCREENSHOT_DIR){
        await page.screenshot({path:process.env.SCREENSHOT_DIR+'/continuidad-reparada-movil.png',fullPage:true});
      }
      await page.locator('[data-repair-next]').click();
    }
    assert.match(await page.locator('[data-repair-total]').innerText(),/6 funciones completadas · 2600 de 2700/);
    await page.locator('[data-repair-restart]').click();
    assert.match(await page.locator('[data-repair-progress]').innerText(),/Reto 1 de 6 · 0 puntos/);
    await page.setViewportSize({width:320,height:700});await checkMath();
    await page.setViewportSize({width:1280,height:900});
    if(process.env.SCREENSHOT_DIR)await page.screenshot({path:process.env.SCREENSHOT_DIR+'/continuidad-inicial-escritorio.png',fullPage:true});
    await page.addStyleTag({content:'html {font-size:200% !important}'});await checkMath();
    await page.goto(base+'laboratorios/juegos/t01-b-continuidad-repara-la-funcion.html');
    await page.locator('iframe').waitFor();
    await page.waitForFunction(()=>document.querySelector('iframe')?.contentDocument?.querySelector('[data-repair-formula] mjx-container'));
    const frame=page.frames().find(f=>f.url().includes(widget));
    assert.ok(frame);
    await checkMath(frame);
    await page.setViewportSize({width:390,height:844});
    const first=rounds[0], left=first.m*first.a+first.b, right=first.a*first.a+first.c;
    await frame.locator('#repair-left-answer').fill(String(left));
    await frame.locator('#repair-right-answer').fill(String(right));
    await frame.locator('#repair-diagnosis').selectOption(left!==right?'jump':left===first.pointValue?'continuous':'removable');
    await frame.getByRole('button',{name:'Comprobar análisis',exact:true}).click();
    await checkMath(frame);
    await page.waitForFunction(()=>{const f=document.querySelector('iframe');return f.getBoundingClientRect().height>=f.contentDocument.documentElement.scrollHeight-3;});
    // GitHub Pages publica a menudo en una subcarpeta: simular ese prefijo.
    const prefix=new URL('prueba-subcarpeta/',base).href;
    await page.route(prefix+'**',async route=>{
      const response=await route.fetch({url:route.request().url().replace(prefix,base)});
      await route.fulfill({response});
    });
    await page.goto(prefix+'laboratorios/juegos/t01-b-continuidad-repara-la-funcion.html');
    await page.locator('iframe').waitFor();
    await page.waitForFunction(()=>document.querySelector('iframe')?.contentDocument?.querySelector('[data-repair-formula] mjx-container'));
    const subframe=page.frames().find(f=>f.url().startsWith(prefix+widget));
    assert.ok(subframe);await checkMath(subframe);
    await page.goto(base+'laboratorios/juegos/t01-a-limite-express.html');
    await page.frameLocator('iframe').getByRole('button',{name:'Practicar sin reloj',exact:true}).click();
    await page.waitForFunction(()=>document.querySelector('iframe')?.contentDocument?.querySelector('input[type="radio"]'));
    const older=page.frames().find(f=>f.url().includes('widgets/games/t01-a-limite-express/'));
    await checkMath(older);
    assert.deepEqual(errors,[]);
    console.log('Aprobado: repaso 5/6, 6 reparaciones, reintentos sin duplicar puntos, pista y resumen 2600/2700, reinicio, coma decimal, teclado, fórmulas, móvil 320/390, texto 200%, widget insertado y subcarpeta.');
  } finally {await browser.close();}
})().catch(error=>{console.error(error);process.exitCode=1;});

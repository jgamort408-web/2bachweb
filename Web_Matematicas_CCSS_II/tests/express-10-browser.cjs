const assert=require('node:assert/strict');
const {chromium}=require('playwright');
const base=process.env.TEST_URL||'http://127.0.0.1:4173/';
const widget='widgets/games/t01-a-limite-express/';
(async()=>{
  const browser=await chromium.launch({headless:true,...(process.env.CHROME_PATH?{executablePath:process.env.CHROME_PATH}:{})});
  const errors=[];
  try{
    const page=await browser.newPage({viewport:{width:390,height:844}});
    page.on('pageerror',e=>errors.push(e.message));
    page.on('response',r=>{if(r.status()>=400&&!r.url().endsWith('favicon.ico'))errors.push(r.status()+' '+r.url());});
    await page.addInitScript(()=>{crypto.getRandomValues=array=>{array.fill(42);return array;};});
    const enabled=async target=>target.waitForFunction(()=>!document.querySelector('[data-answer] fieldset').disabled);
    const math=async target=>{
      await target.waitForFunction(()=>document.querySelector('.math-status')?.hidden===true);
      assert.equal(await target.locator('[data-mml-node="merror"]').count(),0);
      assert.equal(await target.evaluate(()=>document.documentElement.scrollWidth<=innerWidth),true,'Desbordamiento: '+target.url());
    };
    await page.goto(base+widget+'index.html');
    await page.getByRole('button',{name:'Practicar sin reloj',exact:true}).click();
    for(let i=0;i<10;i++){
      await enabled(page);
      assert.match(await page.locator('[data-progress]').innerText(),new RegExp('Nivel '+(i<3?1:i<6?2:i<8?3:4)));
      assert.equal((await page.locator('[data-progress]').innerText()).includes('Ronda especial'),[3,6,9].includes(i));
      if(i===0){
        await page.locator('[data-check]').click();
        await page.locator('[data-feedback]').filter({hasText:'Selecciona'}).waitFor();
        await page.locator('[data-hint]').click();
      }
      if(i===1){
        await page.locator('input[value="answer-1"]').check();await page.locator('[data-check]').click();
        await page.locator('[data-feedback]').filter({hasText:'Revisa'}).waitFor();await enabled(page);
      }
      if(await page.locator('[data-graph]').isVisible()){
        const before=await page.locator('[data-distance]').innerText();
        await page.locator('[data-step]').focus();await page.keyboard.press('Enter');
        assert.notEqual(await page.locator('[data-distance]').innerText(),before);
        await page.locator('[data-animate]').click();
        await page.waitForFunction(()=>document.querySelector('[data-distance]').textContent.includes('0,25'));
        await page.locator('[data-animate]').click();
        await page.emulateMedia({reducedMotion:'reduce'});
        await page.waitForFunction(()=>document.querySelector('[data-animate]').disabled);
        assert.equal(await page.locator('[data-animate]').isDisabled(),true);
        await page.locator('[data-step]').click();
        if(process.env.SCREENSHOT_DIR)await page.screenshot({path:process.env.SCREENSHOT_DIR+'/limite-grafica-movil.png',fullPage:true});
      }
      await page.locator('input[value="answer-0"]').check();
      await page.locator('[data-check]').focus();await page.keyboard.press('Enter');
      await page.locator('[data-next]').waitFor();await math(page);
      const score=await page.locator('[data-score]').innerText();
      await page.locator('[data-answer]').dispatchEvent('submit');
      assert.equal(await page.locator('[data-score]').innerText(),score);
      if(i===9){
        await page.setViewportSize({width:320,height:800});await math(page);
        await page.setViewportSize({width:1280,height:900});
        if(process.env.SCREENSHOT_DIR)await page.screenshot({path:process.env.SCREENSHOT_DIR+'/limite-metodo-escritorio.png',fullPage:true});
        await page.addStyleTag({content:'html {font-size:200% !important}'});await math(page);
      }
      await page.locator('[data-next]').click();
    }
    await page.locator('[data-total]').filter({hasText:'10 de 10 respuestas correctas · 9 al primer intento · 910 de 1000'}).waitFor();
    assert.equal(await page.locator('[data-levels] li').count(),4);
    await page.locator('[data-restart]').click();await page.locator('[data-start="practice"]').waitFor();

    // El modo libre no caduca aunque transcurra más de un minuto.
    const clock=await browser.newPage();clock.on('pageerror',e=>errors.push(e.message));
    await clock.clock.install();await clock.goto(base+widget+'index.html');
    await clock.locator('[data-start="practice"]').click();await enabled(clock);
    await clock.clock.fastForward(65000);
    await clock.locator('input[value="answer-0"]').check();await clock.locator('[data-check]').click();
    await clock.locator('[data-feedback]').filter({hasText:'Correcta.'}).waitFor();
    await clock.goto(base+widget+'index.html');await clock.locator('[data-start="challenge"]').click();await enabled(clock);
    await clock.locator('[data-pause]').click();
    const paused=await clock.locator('[data-time]').innerText();
    await clock.clock.fastForward(60000);assert.equal(await clock.locator('[data-time]').innerText(),paused);
    assert.equal(await clock.locator('[data-check]').isDisabled(),true);
    await clock.locator('[data-pause]').click();
    for(let i=0;i<10;i++){
      await clock.clock.fastForward(21000);
      await clock.locator('[data-next]').waitFor();
      await clock.locator('[data-feedback]').filter({hasText:'Tiempo agotado'}).waitFor();
      await clock.locator('[data-next]').click();if(i<9)await enabled(clock);
    }
    await clock.locator('[data-total]').filter({hasText:'0 de 10 respuestas correctas · 0 al primer intento · 0 de 1000'}).waitFor();
    await clock.close();

    const failed=await browser.newPage();let blocked=true;
    await failed.route('**/assets/vendor/mathjax-3.2.2/es5/tex-svg-full.js',route=>blocked?route.abort('failed'):route.continue());
    await failed.goto(base+widget+'index.html');await failed.locator('[data-start="challenge"]').click();
    await failed.getByRole('button',{name:'Reintentar fórmulas',exact:true}).waitFor();
    assert.equal(await failed.locator('[data-time]').innerText(),'20 segundos');
    assert.equal(await failed.locator('[data-check]').isDisabled(),true);
    // Dejar acabar ambos ámbitos (enunciado y opciones) antes de recuperar.
    await failed.locator('[data-options] input').first().waitFor();
    blocked=false;await failed.getByRole('button',{name:'Reintentar fórmulas',exact:true}).click();
    await enabled(failed);await math(failed);await failed.close();

    await page.goto(base+'laboratorios/juegos/t01-a-limite-express.html');
    await page.frameLocator('iframe').locator('[data-start="practice"]').click();
    const frame=page.frames().find(f=>f.url().includes(widget));assert.ok(frame);await enabled(frame);await math(frame);
    const prefix=new URL('prueba-subcarpeta/',base).href;
    await page.route(prefix+'**',async route=>{const response=await route.fetch({url:route.request().url().replace(prefix,base)});await route.fulfill({response});});
    await page.goto(prefix+'laboratorios/juegos/t01-a-limite-express.html');
    await page.frameLocator('iframe').locator('[data-start="practice"]').click();
    const subframe=page.frames().find(f=>f.url().startsWith(prefix+widget));assert.ok(subframe);await enabled(subframe);await math(subframe);
    assert.deepEqual(errors,[]);
    console.log('Aprobado: 10 rondas, cuatro niveles, especiales 4/7/10, 910 puntos, gráfica y tabla, movimiento reducido, teclado, móvil, pausa y diez caducidades, recuperación LaTeX, anfitrión y subcarpeta.');
  }finally{await browser.close();}
})().catch(e=>{console.error(e);process.exitCode=1;});

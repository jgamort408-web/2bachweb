const assert=require('node:assert/strict');
const {chromium}=require('playwright');
const base=process.env.TEST_URL||'http://127.0.0.1:4173/';
const widget='widgets/games/t01-d-tangente-sprint/';
(async()=>{
  const browser=await chromium.launch({headless:true,...(process.env.CHROME_PATH?{executablePath:process.env.CHROME_PATH}:{})});
  const errors=[];
  try{
    const page=await browser.newPage({viewport:{width:390,height:844}});
    page.on('pageerror',e=>errors.push(e.message));
    page.on('response',r=>{if(r.status()>=400&&!r.url().endsWith('favicon.ico'))errors.push(r.status()+' '+r.url());});
    await page.addInitScript(()=>{crypto.getRandomValues=array=>{array.fill(42);return array;};});
    const ready=async(target=page)=>{
      await target.waitForFunction(()=>document.querySelector('.math-status')?.hidden===true);
      assert.equal(await target.locator('[data-mml-node="merror"]').count(),0);
      assert.equal(await target.evaluate(()=>document.documentElement.scrollWidth<=innerWidth),true,'Desbordamiento: '+target.url());
    };
    const enabled=async(target=page)=>target.waitForFunction(()=>!document.querySelector('#sprint-value').disabled&&!document.querySelector('[data-calculate] fieldset').disabled);
    const setRange=async(selector,value)=>page.locator(selector).evaluate((el,value)=>{
      el.value=String(value);el.dispatchEvent(new Event('input',{bubbles:true}));
    },value);
    await page.goto(base+widget+'index.html');
    await page.getByRole('button',{name:'Practicar sin reloj',exact:true}).click();
    await enabled();
    const rounds=await page.evaluate(async url=>(await import(url+'generator.js')).generateTangentSession(42),base+widget);
    for(let index=0;index<rounds.length;index++){
      const q=rounds[index];
      await enabled();
      const check=page.getByRole('button',{name:'Comprobar punto y pendiente',exact:true});
      if(index===0){
        await check.click();await page.locator('[data-calculate-feedback]').filter({hasText:'Completa'}).waitFor();
        await page.locator('#sprint-value').fill(String(q.y));
        await page.locator('#sprint-slope').fill(String(q.slope+1));
        await check.click();await check.click();
        assert.match(await page.locator('[data-progress]').innerText(),/100 puntos/);
        await page.locator('[data-hint]').click();
      }
      await page.locator('#sprint-value').fill(String(q.y));
      await page.locator('#sprint-slope').fill(String(q.slope));
      await page.locator('#sprint-slope').press('Enter');
      assert.equal(await page.locator('#sprint-type').evaluate(el=>document.activeElement===el),true);
      if(index===0){
        await page.locator('#sprint-m').fill('1/0');
        await page.locator('#sprint-b').fill('0');
        await page.getByRole('button',{name:'Comprobar ecuación',exact:true}).click();
        assert.equal(await page.locator('[data-graph]').isVisible(),false);
      }
      const vertical=q.line.type==='vertical';
      await page.locator('#sprint-type').selectOption(q.line.type);
      if(vertical)await page.locator('#sprint-x').fill(String(q.line.x));
      else{
        await page.locator('#sprint-m').fill(q.line.m===.5?'2/4':q.line.m===-.5?'-2/4':String(q.line.m));
        await page.locator('#sprint-b').fill(String(q.line.b).replace('.',','));
      }
      await page.getByRole('button',{name:'Comprobar ecuación',exact:true}).click();
      await page.locator('[data-graph]').waitFor();
      await page.locator('[data-check-graph]').click();
      await page.locator('[data-graph-feedback]').filter({hasText:'Aún no coincide'}).waitFor();
      if(index===0){
        const svg=page.locator('[data-graph] figure > svg');
        await svg.scrollIntoViewIfNeeded();
        const box=await svg.boundingBox();
        const screen=(x,y)=>({x:box.x+x/480*box.width,y:box.y+y/350*box.height});
        const drag=async(selector,x,y)=>{
          const handle=await page.locator(selector).boundingBox();
          await page.mouse.move(handle.x+handle.width/2,handle.y+handle.height/2);
          await page.mouse.down();const point=screen(x,y);
          await page.mouse.move(point.x,point.y,{steps:5});await page.mouse.up();
        };
        await drag('[data-handle="position"]',240,165);
        await drag('[data-handle="slope"]',280,165-40*q.line.m);
        assert.equal(Number(await page.locator('#graph-m').inputValue()),q.line.m);
        assert.equal(Number(await page.locator('#graph-b').inputValue()),q.line.b);
      }else if(vertical){
        await page.locator('#graph-x').focus();await page.keyboard.press('ArrowLeft');
        assert.equal(Number(await page.locator('#graph-x').inputValue()),q.a+.5);
        await page.keyboard.press('ArrowLeft');
      }else{
        await setRange('#graph-m',q.line.m);await setRange('#graph-b',q.line.b);
      }
      await page.locator('[data-check-graph]').click();
      await page.locator('[data-next]').waitFor();
      const progress=await page.locator('[data-progress]').innerText();
      await page.locator('[data-check-graph]').dispatchEvent('click');
      assert.equal(await page.locator('[data-progress]').innerText(),progress);
      await page.locator('[data-solution] summary').click();await ready();
      assert.equal(await page.locator('[data-line-formula] mjx-container').count(),1);
      if(index===0&&process.env.SCREENSHOT_DIR)await page.screenshot({path:process.env.SCREENSHOT_DIR+'/tangente-ajustada-movil.png',fullPage:true});
      if(index===5){
        await page.setViewportSize({width:320,height:800});await ready();
        await page.setViewportSize({width:1280,height:900});await ready();
        if(process.env.SCREENSHOT_DIR)await page.screenshot({path:process.env.SCREENSHOT_DIR+'/normal-vertical-escritorio.png',fullPage:true});
        await page.addStyleTag({content:'html {font-size:200% !important}'});await ready();
      }
      await page.locator('[data-next]').click();
    }
    await page.locator('[data-total]').filter({hasText:'6 de 6 retos completados · 3500 de 3600'}).waitFor();
    await page.locator('[data-restart]').click();
    await page.getByRole('button',{name:'Practicar sin reloj',exact:true}).waitFor();

    // Reloj controlado: pausa, bloqueo de controles, caducidad y nuevo reto.
    const clock=await browser.newPage();
    clock.on('pageerror',e=>errors.push(e.message));
    await clock.clock.install();
    await clock.goto(base+widget+'index.html');
    await clock.getByRole('button',{name:'Sprint: 45 segundos',exact:true}).click();await enabled(clock);
    await clock.locator('#sprint-value').fill('123');
    await clock.locator('[data-pause]').click();
    const pausedTime=await clock.locator('[data-time]').innerText();
    await clock.clock.fastForward(60000);
    assert.equal(await clock.locator('[data-time]').innerText(),pausedTime);
    assert.equal(await clock.locator('#sprint-value').isDisabled(),true);
    await clock.locator('[data-pause]').click();
    await clock.clock.fastForward(46000);
    await clock.locator('[data-time-notice]').filter({hasText:'Tiempo agotado'}).waitFor();
    assert.equal(await clock.locator('#sprint-value').inputValue(),'123');
    assert.equal(await clock.locator('[data-solution]').getAttribute('open'),'');
    await clock.locator('[data-next]').click();await enabled(clock);
    assert.match(await clock.locator('[data-progress]').innerText(),/Reto 2 de 6/);
    for(let round=1;round<6;round++){
      await clock.clock.fastForward(46000);
      await clock.locator('[data-next]').waitFor();
      await clock.locator('[data-next]').click();
      if(round<5)await enabled(clock);
    }
    await clock.locator('[data-total]').filter({hasText:'0 de 6 retos completados · 0 de 3600'}).waitFor();
    await clock.close();

    // Una descarga fallida no consume el tiempo ni habilita cálculos prematuros.
    const failure=await browser.newPage();
    let blocked=true;
    await failure.route('**/assets/vendor/mathjax-3.2.2/es5/tex-svg-full.js',route=>blocked?route.abort('failed'):route.continue());
    await failure.goto(base+widget+'index.html');
    await failure.getByRole('button',{name:'Sprint: 45 segundos',exact:true}).click();
    await failure.getByRole('button',{name:'Reintentar fórmulas',exact:true}).waitFor();
    assert.equal(await failure.locator('[data-time]').innerText(),'45 segundos');
    assert.equal(await failure.locator('#sprint-value').isDisabled(),true);
    blocked=false;await failure.getByRole('button',{name:'Reintentar fórmulas',exact:true}).click();
    await enabled(failure);await ready(failure);await failure.close();

    await page.goto(base+'laboratorios/juegos/t01-d-tangente-sprint.html');
    await page.waitForFunction(()=>document.querySelector('iframe')?.contentDocument?.querySelector('[data-start]'));
    const frame=page.frames().find(f=>f.url().includes(widget));assert.ok(frame);
    await frame.getByRole('button',{name:'Practicar sin reloj',exact:true}).click();await enabled(frame);await ready(frame);
    await page.setViewportSize({width:390,height:844});
    await frame.locator('#sprint-value').fill(String(rounds[0].y));
    await frame.locator('#sprint-slope').fill(String(rounds[0].slope));
    await frame.getByRole('button',{name:'Comprobar punto y pendiente',exact:true}).click();
    await frame.locator('#sprint-m').fill(String(rounds[0].line.m));
    await frame.locator('#sprint-b').fill(String(rounds[0].line.b));
    await frame.getByRole('button',{name:'Comprobar ecuación',exact:true}).click();await ready(frame);
    await page.waitForFunction(()=>{const frame=document.querySelector('iframe');return frame.getBoundingClientRect().height>=frame.contentDocument.documentElement.scrollHeight-3;});
    const prefix=new URL('prueba-subcarpeta/',base).href;
    await page.route(prefix+'**',async route=>{const response=await route.fetch({url:route.request().url().replace(prefix,base)});await route.fulfill({response});});
    await page.goto(prefix+'laboratorios/juegos/t01-d-tangente-sprint.html');
    await page.waitForFunction(()=>document.querySelector('iframe')?.contentDocument?.querySelector('[data-start]'));
    const subframe=page.frames().find(f=>f.url().startsWith(prefix+widget));assert.ok(subframe);
    await subframe.getByRole('button',{name:'Practicar sin reloj',exact:true}).click();await enabled(subframe);await ready(subframe);
    assert.deepEqual(errors,[]);
    console.log('Aprobado: seis retos, arrastre, teclado, fracciones, normal vertical, 3500/3600, reinicio, pausa y caducidad, recuperación LaTeX sin gastar tiempo, móvil, texto 200%, inserción y subcarpeta.');
  }finally{await browser.close();}
})().catch(e=>{console.error(e);process.exitCode=1;});

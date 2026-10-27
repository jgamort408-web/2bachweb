const assert=require('node:assert/strict');
const {chromium}=require('playwright');
const base=process.env.TEST_URL||'http://127.0.0.1:4173/';
const widget='widgets/games/t01-c-derivada-detective/';
(async()=>{
  const browser=await chromium.launch({headless:true,...(process.env.CHROME_PATH?{executablePath:process.env.CHROME_PATH}:{})});
  const errors=[];
  try{
    const page=await browser.newPage({viewport:{width:390,height:844}});
    page.on('pageerror',e=>errors.push(e.message));
    page.on('response',r=>{if(r.status()>=400&&!r.url().endsWith('favicon.ico'))errors.push(r.status()+' '+r.url());});
    await page.addInitScript(()=>{let seed=40;crypto.getRandomValues=array=>{array.fill(seed++);return array;};});
    const math=async(target=page)=>{
      await target.waitForFunction(()=>document.querySelector('.math-status')?.hidden===true);
      assert.equal(await target.locator('[data-mml-node="merror"]').count(),0);
      assert.equal(await target.evaluate(()=>document.documentElement.scrollWidth<=innerWidth),true,'Desbordamiento en '+target.url());
    };
    await page.goto(base+widget+'index.html');
    for(let session=0;session<4;session++){
      const questions=await page.evaluate(async({url,seed})=>(await import(url+'generator.js')).generateDetectiveSession(seed),{url:base+widget,seed:40+session});
      for(let index=0;index<questions.length;index++){
        const q=questions[index];
        await page.getByText('Pregunta '+(index+1)+' de 13',{exact:false}).waitFor();
        const check=page.getByRole('button',{name:'Comprobar',exact:true});
        await check.waitFor();
        if(index===0&&session===0){
          await check.click();
          await page.getByText('Selecciona una respuesta',{exact:false}).waitFor();
          await page.locator('input[value="'+q.options.find(o=>o.id!==q.correct).id+'"]').check();
          await check.click();
          await page.getByText('Revisa tu respuesta',{exact:false}).waitFor();
          await page.getByRole('button',{name:'Ver pista',exact:true}).click();
        }
        if(q.stage==='error'){
          assert.equal(await page.locator('fieldset ol li').count(),4);
          await math();
          if(session===0&&q.family==='quotient'&&process.env.SCREENSHOT_DIR){
            await page.screenshot({path:process.env.SCREENSHOT_DIR+'/detective-error-movil.png',fullPage:true});
          }
        }
        // En un caso se agotan los dos intentos: debe aparecer la solución.
        if(index===2&&session===0){
          await page.locator('input[value="'+q.options.find(o=>o.id!==q.correct).id+'"]').check();
          await check.click();await check.click();
        }else{
          await page.locator('input[value="'+q.correct+'"]').check();
          await check.focus();await page.keyboard.press('Enter');
        }
        const next=page.getByRole('button',{name:/Siguiente pregunta|Ver resumen/});
        await next.waitFor();
        await page.locator('.feedback').filter({hasText:'Solución:'}).waitFor();
        await math();
        await next.click();
      }
      await page.getByText((session===0?'11':'13')+' de 13 respuestas correctas al primer intento',{exact:false}).waitFor();
      if(session<3)await page.getByRole('button',{name:'Empezar otra sesión',exact:true}).click();
    }
    await page.getByRole('button',{name:'Empezar otra sesión',exact:true}).click();
    await page.setViewportSize({width:320,height:700});await math();
    await page.setViewportSize({width:1280,height:900});
    if(process.env.SCREENSHOT_DIR)await page.screenshot({path:process.env.SCREENSHOT_DIR+'/detective-escritorio.png',fullPage:true});
    await page.addStyleTag({content:'html {font-size:200% !important}'});await math();
    await page.goto(base+'laboratorios/juegos/t01-c-derivada-detective.html');
    await page.waitForFunction(()=>document.querySelector('iframe')?.contentDocument?.querySelector('input[type="radio"]'));
    const frame=page.frames().find(f=>f.url().includes(widget));assert.ok(frame);await math(frame);
    await page.setViewportSize({width:390,height:844});await math(frame);
    const prefix=new URL('prueba-subcarpeta/',base).href;
    await page.route(prefix+'**',async route=>{const response=await route.fetch({url:route.request().url().replace(prefix,base)});await route.fulfill({response});});
    await page.goto(prefix+'laboratorios/juegos/t01-c-derivada-detective.html');
    await page.waitForFunction(()=>document.querySelector('iframe')?.contentDocument?.querySelector('input[type="radio"]'));
    const subframe=page.frames().find(f=>f.url().startsWith(prefix+widget));assert.ok(subframe);await math(subframe);
    assert.deepEqual(errors,[]);
    console.log('Aprobado: cuatro sesiones / 52 decisiones; 12 desarrollos erróneos, blanco, pista, reintento, dos fallos, teclado, reinicio, fórmulas, móvil 320/390, texto 200%, anfitrión y subcarpeta.');
  }finally{await browser.close();}
})().catch(e=>{console.error(e);process.exitCode=1;});

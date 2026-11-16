const {fixture}=require('./helpers/local-site.cjs');
const fs=require('node:fs'),path=require('node:path');
const assert = require('node:assert/strict');
const { chromium } = require('playwright');

// P02 · Apoyo de Combinatoria migrado: MathJax sin errores, demostración de V(5,3), calculadora exacta,
// seis ejercicios con selector, test de diez preguntas en el visor común, índice de apoyos, móvil 200 %, sin JS y 40 retroalimentaciones.
(async () => {
  const base = 'http://libro.test/';
  const route = 'libro/apoyos/combinatoria.html';
  const browser = await chromium.launch({ headless: true, executablePath: process.env.CHROME_PATH||'C:/Program Files/Google/Chrome/Application/chrome.exe' });
  try {
    const page = await browser.newPage({ serviceWorkers: 'block', viewport: { width: 1200, height: 900 } });
    await fixture(page.context());
    const errors = [];
    page.on('pageerror', e => errors.push(e.message));
    page.on('response', r => { if (r.status() >= 400 && !r.url().endsWith('favicon.ico')) errors.push(r.status() + ' ' + r.url()); });
    await page.goto(base + route);
    await page.waitForFunction(() => document.querySelectorAll('#tecnicas mjx-container').length >= 10, null, { timeout: 30000 });
    assert.equal(await page.locator('[data-mml-node="merror"]').count(), 0);

    // Demostración: tres letras sin repetir.
    const demo = page.locator('[data-variation-demo]');
    assert.equal(await demo.isVisible(), true);
    const status = demo.locator('[data-demo-status]');
    assert.match(await status.textContent(), /5 opciones/);
    await demo.getByRole('button', { name: 'C', exact: true }).click();
    assert.equal(await demo.getByRole('button', { name: 'C', exact: true }).isDisabled(), true);
    await demo.getByRole('button', { name: 'A', exact: true }).click();
    await demo.getByRole('button', { name: 'E', exact: true }).click();
    await page.waitForFunction(() => document.querySelector('[data-demo-status]').textContent.includes('Ordenación completa CAE'));
    assert.deepEqual(await demo.locator('[data-slot]').allTextContents(), ['C', 'A', 'E']);
    assert.equal(await demo.getByRole('button', { name: 'B', exact: true }).isDisabled(), true);
    await demo.getByRole('button', { name: 'Vaciar las posiciones' }).click();
    assert.deepEqual(await demo.locator('[data-slot]').allTextContents(), ['?', '?', '?']);

    // Calculadora: valores exactos, campos según la técnica y errores explicados.
    const form = page.locator('[data-combinatorics-calculator]');
    const output = form.locator('[data-calculator-output]');
    await form.getByRole('button', { name: 'Calcular' }).click();
    await page.waitForFunction(() => document.querySelector('[data-calculator-output] mjx-container'));
    assert.equal(await output.locator('.mc-calculator__value').textContent(), 'Resultado: 336');
    await form.locator('select[name="type"]').selectOption('permutationsWithRepetition');
    assert.equal(await form.locator('[data-field="r"]').isVisible(), false);
    await form.locator('input[name="n"]').fill('10');
    await form.locator('input[name="repeats"]').fill('3, 2, 2');
    await form.getByRole('button', { name: 'Calcular' }).click();
    await page.waitForFunction(() => document.querySelector('.mc-calculator__value')?.textContent.includes('151'));
    assert.equal(await output.locator('.mc-calculator__value').textContent(), 'Resultado: 151 200');
    await form.locator('select[name="type"]').selectOption('variationsWithRepetition');
    await form.locator('input[name="n"]').fill('19');
    await form.locator('input[name="r"]').fill('19');
    await form.getByRole('button', { name: 'Calcular' }).click();
    await page.waitForFunction(() => document.querySelector('.mc-calculator__value')?.textContent.includes('978'));
    assert.equal(await output.locator('.mc-calculator__value').textContent(), 'Resultado: 1 978 419 655 660 313 589 123 979');
    await form.locator('select[name="type"]').selectOption('combinations');
    await form.locator('input[name="n"]').fill('5');
    await form.locator('input[name="r"]').fill('7');
    await form.getByRole('button', { name: 'Calcular' }).click();
    await page.waitForFunction(() => document.querySelector('[data-calculator-output]').dataset.state === 'error');
    assert.match(await output.textContent(), /Revisa los datos\. r debe ser un número entero entre 1 y 5/);
    assert.equal(await page.locator('[data-mml-node="merror"]').count(), 0);

    // Ejercicios: selector y soluciones desplegables.
    const exercises = page.locator('[data-worked-problems]');
    assert.equal(await exercises.locator('[data-exercise]:visible').count(), 1);
    await exercises.locator('[data-exercise-select]').selectOption('all');
    assert.equal(await exercises.locator('[data-exercise]:visible').count(), 6);
    await page.locator('#ejercicio-6 summary').click();
    await page.waitForFunction(() => document.querySelector('#ejercicio-6 details mjx-container'));
    assert.match(await page.locator('#ejercicio-6 [data-content-role="solution"]').textContent(), /44,2/);

    // Test del juego original en el visor común.
    const quiz = page.locator('[data-quiz="combinatorics"]');
    await quiz.getByText('Pregunta 1 de 10 · Sin límite de tiempo').waitFor();
    assert.equal(await quiz.locator('input[type="radio"]').count(), 4);

    // Cada alternativa debe mostrar la explicación que le corresponde.
    const {combinatoricsQuestions}=await import('../content/activities/combinatorics-test.js');
    let feedbackChecked=0;
    for(const choice of ['a','b','c','d']){
      await page.goto(base+route);
      for(const q of combinatoricsQuestions){
        await quiz.locator('input[name="answer-'+q.id+'"][value="'+choice+'"]').check();
        await quiz.locator('[data-action="check"]').click();
        const expected=q.options.find(o=>o.id===choice).feedback;
        await page.waitForFunction(text=>document.querySelector('[data-quiz="combinatorics"] [data-content-role="feedback"]')?.textContent.includes(text),expected);feedbackChecked++;
        if(q.sourceIndex===5&&choice==='d'){
          const out=path.resolve(__dirname,'../../tmp/p03');fs.mkdirSync(out,{recursive:true});
          await quiz.locator('[data-content-role="feedback"]').screenshot({path:path.join(out,'combinatoria-monedas-feedback.png')});
        }
        if(choice!==q.correct){
          await quiz.locator('input[value="'+q.correct+'"]').check();await quiz.locator('[data-action="check"]').click();
          await page.waitForFunction(()=>document.querySelector('[data-quiz="combinatorics"] [data-content-role="feedback"]')?.dataset.state==='correct');
        }
        await quiz.locator('[data-action="next"]').click();
      }
    }
    assert.equal(feedbackChecked,40);

    // Índice de apoyos: estado parcial.
    await page.goto(base + 'libro/apoyos/index.html');
    await page.locator('[data-topic-index="supports"]').getByText(/Combinatoria/).first().waitFor();
    assert.match(await page.locator('[data-topic-index="supports"]').textContent(), /Combinatoria[^]*Contenido parcial/);

    // Móvil al 200 %.
    await page.goto(base + route);
    await page.waitForFunction(() => document.querySelectorAll('#tecnicas mjx-container').length >= 10, null, { timeout: 30000 });
    await page.setViewportSize({ width: 320, height: 844 });
    await page.evaluate(() => document.documentElement.style.fontSize = '200%');
    assert.equal(await page.evaluate(() => document.documentElement.scrollWidth > innerWidth), false);

    // Sin JavaScript: fórmulas, listas y ejercicios siguen ahí; los controles interactivos no aparecen.
    const nojs = await browser.newContext({ javaScriptEnabled: false, serviceWorkers: 'block' });
    await fixture(nojs);
    const offline = await nojs.newPage();
    await offline.goto(base + route);
    assert.equal(await offline.locator('[data-exercise]').count(), 6);
    assert.equal(await offline.locator('[data-pascal] li').count(), 7);
    assert.equal(await offline.locator('[data-variation-demo]').isVisible(), false);
    assert.equal(await offline.locator('[data-combinatorics-calculator]').isVisible(), false);
    await nojs.close();
    assert.deepEqual(errors, []);
    console.log('PASS: combinatoria con MathJax, demostración V(5,3), calculadora exacta, seis ejercicios, test de diez preguntas, índice parcial, móvil 200 %, sin JS y 40 retroalimentaciones.');
  } finally { await browser.close(); }
})().catch(e => { console.error(e); process.exitCode = 1; });

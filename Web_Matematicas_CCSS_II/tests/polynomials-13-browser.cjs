const assert = require('node:assert/strict');
const { chromium } = require('playwright');
const base = process.env.TEST_URL || 'http://127.0.0.1:4173/';
const lesson = 'libro/temas/02-representacion-de-funciones/02-funciones-polinomicas.html';
(async () => {
  const browser = await chromium.launch({ headless: true, ...(process.env.CHROME_PATH ? { executablePath: process.env.CHROME_PATH } : {}) });
  const errors = [];
  try {
    const page = await browser.newPage({ viewport: { width: 390, height: 844 } });
    page.on('pageerror', e => errors.push(e.message));
    page.on('response', r => { if (r.status() >= 400 && !r.url().endsWith('favicon.ico')) errors.push(r.status() + ' ' + r.url()); });
    await page.addInitScript(() => { let seed = 42; crypto.getRandomValues = array => { array.fill(seed++); return array; }; });
    const ready = async () => {
      await page.waitForFunction(() => document.querySelector('.math-status')?.hidden === true);
      assert.equal(await page.locator('[data-mml-node="merror"]').count(), 0);
      assert.equal(await page.evaluate(() => document.documentElement.scrollWidth <= innerWidth), true, page.url());
    };
    await page.goto(base + lesson); await ready();
    const generated = await page.evaluate(async base => (await import(base + 'content/models/polynomials.js')).generatePolynomialEnds(42), base);
    const fixed = await page.evaluate(async base => (await import(base + 'content/activities/catalog.js')).questionsForScope('t02-e02'), base);
    assert.ok((await page.locator('[data-polynomial-curve]').getAttribute('d')).startsWith('M35.000'));
    const drill = page.locator('[data-polynomial-practice]'), quiz = page.locator('[data-quiz="t02-e02"]');
    const firstPrompt = await drill.locator('legend').innerText();
    await quiz.locator('input[value="right"]').check();
    const complete = async (root, questions, wrongFirst) => {
      for (let i = 0; i < questions.length; i++) {
        if (i === 0 && wrongFirst) {
          await root.getByRole('button', { name: 'Comprobar', exact: true }).click();
          await root.locator('.feedback').filter({ hasText: 'Selecciona' }).waitFor();
          await root.locator('input[value="' + questions[i].options.find(o => o.id !== questions[i].correct).id + '"]').check();
          await root.getByRole('button', { name: 'Comprobar', exact: true }).click();
          await root.locator('.feedback').filter({ hasText: 'Revisa' }).waitFor();
          await root.getByRole('button', { name: 'Ver pista', exact: true }).click();
          await root.locator('.feedback').filter({ hasText: 'Pista:' }).waitFor();
        }
        await root.locator('input[value="' + questions[i].correct + '"]').check();
        await root.getByRole('button', { name: 'Comprobar', exact: true }).focus(); await page.keyboard.press('Enter');
        await root.getByRole('button', { name: /Siguiente pregunta|Ver resumen/ }).waitFor(); await ready();
        await root.getByRole('button', { name: /Siguiente pregunta|Ver resumen/ }).click();
      }
      await root.getByText((questions.length - Number(wrongFirst)) + ' de ' + questions.length + ' respuestas correctas', { exact: false }).waitFor();
    };
    await complete(drill, generated, true);
    assert.equal(await quiz.locator('input[value="right"]').isChecked(), true, 'Los dos test son independientes');
    await complete(quiz, fixed, false);
    await drill.getByRole('button', { name: 'Empezar otra sesión', exact: true }).click(); await ready();
    assert.notEqual(await drill.locator('legend').innerText(), firstPrompt);
    await quiz.getByText('6 de 6 respuestas correctas', { exact: false }).waitFor();
    const cards = page.locator('[data-flashcards]');
    for (let i = 1; i <= 6; i++) {
      await cards.getByText('Tarjeta ' + i + ' de 6', { exact: true }).waitFor();
      await cards.getByRole('button', { name: 'Mostrar respuesta', exact: true }).click(); await ready();
      if (i < 6) await cards.getByRole('button', { name: 'Siguiente', exact: true }).click();
    }
    await page.getByText('Ahora cambia la capacidad: solo se pueden producir hasta 4 toneladas', { exact: true }).click();
    await page.getByText('Ver solución', { exact: true }).click(); await ready();
    await page.locator('[data-reading-controls] > summary').click();
    await page.locator('[data-text-size]').selectOption('200');
    await page.locator('[data-highlight-control]').check(); await page.locator('[data-contrast-control]').check();
    await page.setViewportSize({ width: 320, height: 844 }); await ready();
    if (process.env.SCREENSHOT_DIR) await page.locator('#taller').screenshot({ path: process.env.SCREENSHOT_DIR + '/polinomios-taller-movil.png' });
    await page.setViewportSize({ width: 1280, height: 900 }); await page.locator('[data-reset-reading]').click(); await ready();
    if (process.env.SCREENSHOT_DIR) await page.locator('.polynomial-figure').screenshot({ path: process.env.SCREENSHOT_DIR + '/polinomio-raiz-doble.png' });
    await page.goto(base + 'test/index.html?tema=t02'); await ready();
    const topic = await page.evaluate(async base => (await import(base + 'content/activities/catalog.js')).questionsForScope('t02'), base);
    assert.equal(topic.length, 60); await complete(page.locator('[data-quiz]'), topic, false);
    const prefix = new URL('prueba-subcarpeta/', base).href;
    await page.route(prefix + '**', async route => { const response = await route.fetch({ url: route.request().url().replace(prefix, base) }); await route.fulfill({ response }); });
    await page.goto(prefix + lesson); await ready();
    assert.equal(await page.locator('[data-polynomial-practice] input[type="radio"]').count(), 4);
    assert.equal(await page.locator('[data-quiz] input[type="radio"]').count(), 4);
    assert.deepEqual(errors, []);
    console.log('Aprobado: seis retos procedurales 5/6, seis preguntas 6/6, independencia de sesiones, reinicio con datos nuevos, seis tarjetas, capacidad restringida, teclado, 320/390 y 200 %, test t02 completo, subcarpeta y fórmulas.');
  } finally { await browser.close(); }
})().catch(error => { console.error(error); process.exitCode = 1; });

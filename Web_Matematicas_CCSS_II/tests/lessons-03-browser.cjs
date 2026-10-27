const assert = require('node:assert/strict');
const { chromium } = require('playwright');
const base = process.env.TEST_URL || 'http://127.0.0.1:4173/';
const paths = ['07-operaciones-con-limites-de-funciones.html', '08-calculo-de-limites-sencillos.html', '09-indeterminaciones.html'];
(async () => {
  const browser = await chromium.launch({
    headless: true, ...(process.env.CHROME_PATH ? { executablePath: process.env.CHROME_PATH } : {}),
  });
  const errors = [];
  try {
    const page = await browser.newPage({ viewport: { width: 390, height: 844 } });
    page.on('pageerror', (error) => errors.push(error.message));
    page.on('response', (response) => {
      if (response.status() >= 400 && !response.url().endsWith('favicon.ico')) errors.push(response.status() + ' ' + response.url());
    });
    for (const path of paths) {
      await page.goto(base + 'libro/temas/01-limites-y-derivadas/' + path);
      await page.waitForFunction(() => document.querySelector('.math-status')?.hidden === true);
      assert.ok(await page.locator('mjx-container').count() > 30);
      assert.equal(await page.locator('[data-mml-node="merror"]').count(), 0);
      assert.equal(await page.evaluate(() => document.documentElement.scrollWidth <= innerWidth), true, path);
      const scope = await page.locator('[data-quiz]').getAttribute('data-quiz');
      const answers = await page.evaluate(async ({ base, scope }) => {
        const { questionsForScope } = await import(base + 'content/activities/catalog.js');
        return questionsForScope(scope).map((q) => ({ right: q.correct, wrong: q.options.find((o) => o.id !== q.correct).id }));
      }, { base, scope });
      for (let i = 0; i < answers.length; i++) {
        if (i === 0) {
          await page.getByRole('button', { name: 'Comprobar', exact: true }).click();
          await page.locator('.feedback').filter({ hasText: 'Selecciona una respuesta' }).waitFor();
          await page.locator('input[value="' + answers[i].wrong + '"]').check();
          await page.getByRole('button', { name: 'Comprobar', exact: true }).click();
          await page.locator('.feedback').filter({ hasText: 'Revisa tu respuesta' }).waitFor();
          await page.getByRole('button', { name: 'Ver pista', exact: true }).click();
          await page.locator('.feedback').filter({ hasText: 'Pista:' }).waitFor();
        }
        await page.locator('input[value="' + answers[i].right + '"]').check();
        await page.getByRole('button', { name: 'Comprobar', exact: true }).click();
        await page.getByRole('button', { name: /Siguiente pregunta|Ver resumen/ }).waitFor();
        assert.equal(await page.locator('[data-mml-node="merror"]').count(), 0);
        assert.equal(await page.evaluate(() => document.documentElement.scrollWidth <= innerWidth), true, path + ' pregunta ' + i);
        await page.getByRole('button', { name: /Siguiente pregunta|Ver resumen/ }).click();
      }
      await page.getByText('2 de 3 respuestas correctas al primer intento', { exact: false }).waitFor();
      if (path.startsWith('08-')) {
        await page.locator('#root-k').selectOption('5');
        await page.locator('#root-distance').fill('4');
        await page.locator('[data-root-summary]').filter({ hasText: '1/10' }).waitFor();
        assert.equal(await page.locator('[data-root-left-x]').innerText(), '24,9999');
        assert.equal(await page.locator('[data-root-right-x]').innerText(), '25,0001');
        assert.equal(await page.locator('[data-root-left-y]').innerText(), '0,1');
        await page.locator('#root-k').selectOption('1');
        await page.locator('[data-root-summary]').filter({ hasText: '1/2' }).waitFor();
        const left = Number((await page.locator('[data-root-left-y]').innerText()).replace(',', '.'));
        const right = Number((await page.locator('[data-root-right-y]').innerText()).replace(',', '.'));
        assert.ok(left > 0.5 && right < 0.5);
      }
    }
    await page.goto(base + 'widgets/games/t01-a-limite-express/index.html');
    await page.getByRole('button', { name: 'Practicar sin reloj', exact: true }).click();
    await page.setViewportSize({ width: 350, height: 844 });
    for (let i = 0; i < 10; i++) {
      await page.locator('input[value="answer-0"]').check();
      await page.getByRole('button', { name: 'Comprobar', exact: true }).click();
      await page.getByRole('button', { name: /Siguiente pregunta|Ver resumen/ }).waitFor();
      assert.equal(await page.locator('[data-mml-node="merror"]').count(), 0);
      assert.equal(await page.evaluate(() => document.documentElement.scrollWidth <= innerWidth), true, 'Widget ronda ' + i);
      await page.getByRole('button', { name: /Siguiente pregunta|Ver resumen/ }).click();
    }
    await page.getByText('10 de 10 respuestas correctas', { exact: false }).waitFor();
    assert.deepEqual(errors, []);
    console.log('Aprobado: tres lecciones, nueve preguntas, explorador del conjugado y sesión actual de Límite Express; móvil sin desbordamientos.');
  } finally { await browser.close(); }
})().catch((error) => { console.error(error); process.exitCode = 1; });

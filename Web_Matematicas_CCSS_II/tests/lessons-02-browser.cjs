const assert = require('node:assert/strict');
const { chromium } = require('playwright');
const base = process.env.TEST_URL || 'http://127.0.0.1:4173/';
const paths = [
  '03-operaciones-con-el-infinito.html',
  '04-limites-infinitos-en-un-punto-finito.html',
  '05-limites-finitos-en-el-infinito.html',
  '06-limites-infinitos-en-el-infinito.html',
];
(async () => {
  const browser = await chromium.launch({
    headless: true, ...(process.env.CHROME_PATH ? { executablePath: process.env.CHROME_PATH } : {}),
  });
  const errors = [];
  try {
    const page = await browser.newPage();
    page.on('pageerror', (error) => errors.push(error.message));
    page.on('response', (response) => {
      if (response.status() >= 400 && !response.url().endsWith('favicon.ico')) errors.push(response.url() + ': ' + response.status());
    });
    for (const file of paths) {
      await page.goto(base + 'libro/temas/01-limites-y-derivadas/' + file);
      await page.waitForSelector('mjx-container');
      await page.waitForFunction(() => document.querySelector('.math-status')?.hidden === true);
      assert.equal(await page.locator('[data-mml-node="merror"]').count(), 0);
      assert.equal(await page.locator('h1[data-content-role="lesson-title"]').count(), 1);
      assert.equal(await page.locator('[data-content-role="self-check"] input').count(), 4);
      assert.ok(await page.locator('[data-content-role="solution"]').count() >= 1);
      await page.setViewportSize({ width: 390, height: 844 });
      assert.equal(await page.evaluate(() => document.documentElement.scrollWidth <= innerWidth), true, file);
      if (file.startsWith('04-')) {
        await page.locator('#point-function').selectOption('even-negative');
        await page.locator('#point-distance').fill('4');
        await page.locator('[data-point-summary]').filter({ hasText: 'bilateral es −∞' }).waitFor();
        assert.equal(await page.locator('[data-point-left-y]').innerText(), '-300.000.000');
        assert.equal(await page.locator('[data-point-right-y]').innerText(), '-300.000.000');
        await page.waitForFunction(() => document.querySelector('[data-point-formula] mjx-container'));
        await page.locator('#point-function').selectOption('odd-negative');
        await page.locator('[data-point-summary]').filter({ hasText: 'izquierdo: +∞; derecho: −∞' }).waitFor();
        await page.locator('#point-function').selectOption('odd-positive');
        await page.locator('[data-point-summary]').filter({ hasText: 'izquierdo: −∞; derecho: +∞' }).waitFor();
      }
      if (file.startsWith('05-')) {
        await page.locator('#saturation-level').fill('2000');
        assert.equal(await page.locator('[data-saturation-value="4"]').innerText(), '1000');
        assert.equal(await page.locator('[data-saturation-gap="396"]').innerText(), '20');
        await page.locator('[data-saturation-summary]').filter({ hasText: '2000' }).waitFor();
      }
      // Verificar además el camino de error, pista y segundo intento.
      const scope = await page.locator('[data-quiz]').getAttribute('data-quiz');
      const answer = await page.evaluate(async ({ base, scope }) => {
        const { questionsForScope } = await import(base + 'content/activities/catalog.js');
        const question = questionsForScope(scope)[0];
        return { right: question.correct, wrong: question.options.find((o) => o.id !== question.correct).id };
      }, { base, scope });
      await page.locator('[data-quiz] input[value="' + answer.wrong + '"]').check();
      await page.getByRole('button', { name: 'Comprobar', exact: true }).click();
      await page.locator('.feedback').filter({ hasText: 'Revisa tu respuesta' }).waitFor();
      await page.getByRole('button', { name: 'Ver pista', exact: true }).click();
      await page.locator('.feedback').filter({ hasText: 'Pista:' }).waitFor();
      await page.locator('[data-quiz] input[value="' + answer.right + '"]').check();
      await page.getByRole('button', { name: 'Comprobar', exact: true }).click();
      await page.getByRole('button', { name: 'Siguiente pregunta', exact: true }).waitFor();
      assert.equal(await page.locator('[data-mml-node="merror"]').count(), 0);
      await page.setViewportSize({ width: 1280, height: 800 });
    }
    // Todas las familias procedurales deben renderizar en un widget estrecho.
    await page.goto(base + 'widgets/games/t01-a-limite-express/index.html');
    await page.getByRole('button', { name: 'Practicar sin reloj', exact: true }).click();
    await page.setViewportSize({ width: 350, height: 844 });
    await page.waitForSelector('mjx-container');
    for (let round = 0; round < 10; round++) {
      await page.locator('input[value="answer-0"]').check();
      await page.getByRole('button', { name: 'Comprobar', exact: true }).click();
      await page.getByRole('button', { name: /Siguiente pregunta|Ver resumen/ }).waitFor();
      assert.equal(await page.locator('[data-mml-node="merror"]').count(), 0);
      assert.equal(await page.evaluate(() => document.documentElement.scrollWidth <= innerWidth), true, 'Ronda ' + round);
      await page.getByRole('button', { name: /Siguiente pregunta|Ver resumen/ }).click();
    }
    await page.getByText('10 de 10 respuestas correctas', { exact: false }).waitFor();
    assert.deepEqual(errors, []);
    console.log('Aprobado: 4 lecciones, 2 exploradores, error/pista/reintento y las familias actuales del widget en móvil.');
  } finally {
    await browser.close();
  }
})().catch((error) => { console.error(error); process.exitCode = 1; });

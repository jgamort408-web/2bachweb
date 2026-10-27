const assert = require('node:assert/strict');
const { chromium } = require('playwright');
const base = process.env.TEST_URL || 'http://127.0.0.1:4173/';
const paths = ['13-ecuaciones-de-las-rectas-tangente-y-normal.html', '14-tabla-de-derivadas.html', '15-reglas-de-derivacion.html'];
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
    const checkMath = async () => {
      await page.waitForFunction(() => document.querySelector('.math-status')?.hidden === true);
      assert.equal(await page.locator('[data-mml-node="merror"]').count(), 0);
      const overflow = await page.evaluate(() => document.documentElement.scrollWidth <= innerWidth ? [] :
        [...document.querySelectorAll('main *')].filter((el) => el.getBoundingClientRect().right > innerWidth)
          .slice(0, 6).map((el) => ({ tag: el.tagName, text: (el.closest('p, .feedback, legend') || el).textContent.slice(0, 280) })));
      assert.deepEqual(overflow, [], page.url() + ': desbordamiento horizontal');
    };
    const completeQuiz = async (answers, firstWrong = false) => {
      for (let i = 0; i < answers.length; i++) {
        if (i === 0 && firstWrong) {
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
        await checkMath();
        await page.getByRole('button', { name: /Siguiente pregunta|Ver resumen/ }).click();
      }
    };
    const answersFor = (scope) => page.evaluate(async ({ base, scope }) => {
      const { questionsForScope } = await import(base + 'content/activities/catalog.js');
      return questionsForScope(scope).map((q) => ({ right: q.correct, wrong: q.options.find((o) => o.id !== q.correct).id }));
    }, { base, scope });

    for (const path of paths) {
      await page.goto(base + 'libro/temas/01-limites-y-derivadas/' + path);
      await checkMath();
      assert.ok(await page.locator('mjx-container').count() > 20);
      await completeQuiz(await answersFor(await page.locator('[data-quiz]').getAttribute('data-quiz')), true);
      await page.getByText('2 de 3 respuestas correctas al primer intento', { exact: false }).waitFor();
      if (path.startsWith('13-')) {
        for (const a of ['-2', '-1', '0', '1', '2']) {
          await page.locator('#tangent-point').selectOption(a);
          await checkMath();
          assert.equal(await page.locator('[data-tangent-slope]').innerText(), String(2 * Number(a)));
          const normal = await page.locator('[data-normal-slope]').innerText();
          if (a === '0') {
            assert.equal(normal, 'No definida');
            await page.locator('[data-tangent-summary]').filter({ hasText: 'normal es vertical' }).waitFor();
            const path = await page.locator('[data-normal-line]').getAttribute('d');
            assert.match(path, /^M240 /);
            assert.ok(path.includes('L240 '));
          } else {
            assert.equal(normal, (Number(a)>0 ? '−' : '') + '1/' + Math.abs(2*Number(a)));
          }
          assert.equal(await page.locator('[data-tangent-formula] mjx-container').count(), 1);
          const size = await page.locator('[data-tangent-formula] mjx-container').evaluate(el => ({scroll:el.scrollWidth, client:el.clientWidth}));
          assert.ok(size.scroll <= size.client + 1);
        }
        await page.locator('#tangent-point').focus();
        await page.keyboard.press('Home');
        await page.keyboard.press('Enter');
        assert.equal(await page.locator('#tangent-point').inputValue(), '-2');
        await page.setViewportSize({ width: 1280, height: 900 });
        await page.addStyleTag({ content: 'html { font-size: 200% !important; }' });
        await checkMath();
      }
      await page.setViewportSize({ width: 390, height: 844 });
    }
    await page.goto(base + 'test/index.html');
    const all = await answersFor('all-course');
    assert.ok(all.length >= 45);
    await completeQuiz(all);
    await page.getByText(all.length + ' de ' + all.length + ' respuestas correctas', { exact: false }).waitFor();
    await page.goto(base + 'tarjetas/index.html');
    const cardCount = await page.evaluate(async (base) => (await import(base + 'content/activities/catalog.js')).flashcards.length, base);
    for (let i = 1; i <= cardCount; i++) {
      await page.getByText('Tarjeta ' + i + ' de ' + cardCount, { exact: true }).waitFor();
      await page.getByRole('button', { name: 'Mostrar respuesta', exact: true }).click();
      await checkMath();
      if (i < cardCount) await page.getByRole('button', { name: 'Siguiente', exact: true }).click();
    }
    assert.equal(await page.getByRole('button', { name: 'Siguiente', exact: true }).isDisabled(), true);
    assert.deepEqual(errors, []);
    console.log('Aprobado: 3 lecciones, tangente y normal en cinco puntos, fórmulas dinámicas, texto ampliado, test y tarjetas del catálogo actual; móvil sin desbordamientos.');
  } finally { await browser.close(); }
})().catch((error) => { console.error(error); process.exitCode = 1; });

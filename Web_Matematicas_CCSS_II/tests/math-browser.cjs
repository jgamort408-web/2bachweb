/* Requiere Playwright, Chrome y el servidor local. No hace peticiones externas. */
const assert = require('node:assert/strict');
const { chromium } = require('playwright');
const base = process.env.TEST_URL || 'http://127.0.0.1:4173/';
const lesson = 'libro/temas/01-limites-y-derivadas/01-limite-de-una-funcion.html';
const enginePattern = '**/assets/vendor/mathjax-3.2.2/es5/tex-svg-full.js';
const launched = { headless: true };
if (process.env.CHROME_PATH) launched.executablePath = process.env.CHROME_PATH;

(async () => {
  const browser = await chromium.launch(launched);
  const results = [];
  const errors = [];
  const context = await browser.newContext();
  context.on('page', (page) => page.on('pageerror', (error) => errors.push(error.message)));
  const ready = async (page) => {
    await page.waitForSelector('mjx-container');
    await page.waitForFunction(() => document.querySelector('.math-status')?.hidden === true);
    assert.equal(await page.locator('[data-mml-node="merror"]').count(), 0);
  };
  try {
    const page = await context.newPage();
    let loads = 0;
    await page.route(enginePattern, async (route) => {
      loads++;
      if (loads <= 2) await route.abort('failed');
      else await route.continue();
    });
    await page.goto(base + lesson);
    await ready(page);
    assert.equal(loads, 3);
    results.push('Recuperación automática tras dos fallos de descarga');

    const stats = await page.evaluate(async (base) => {
      const { renderMath, updateMath } = await import(base + 'assets/js/core/math.js');
      let active = 0, maximum = 0, calls = 0;
      const original = MathJax.typesetPromise.bind(MathJax);
      MathJax.typesetPromise = async (...args) => {
        calls++; active++; maximum = Math.max(maximum, active);
        try { return await original(...args); } finally { active--; }
      };
      const root = document.createElement('section');
      root.innerHTML = '<p>\\(\\frac{1}{2}+\\sqrt{9}\\)</p>';
      document.querySelector('main').append(root);
      await Promise.all(Array.from({ length: 60 }, () => renderMath(root)));
      await updateMath(root, () => { root.textContent = '\\[\\begin{pmatrix}1&2\\\\3&4\\end{pmatrix}\\quad\\int_0^1 x\\,dx=\\frac12\\]'; });
      await updateMath(root, () => { root.textContent = '\\(\\sen(x)\\) y $x^2$ y $$\\sum_{k=1}^n k$$'; });
      return { maximum, calls, nested: root.querySelectorAll('mjx-container mjx-container').length };
    }, base);
    assert.equal(stats.maximum, 1);
    assert.equal(stats.nested, 0);
    assert.ok(stats.calls < 10);
    results.push('60 solicitudes concurrentes agrupadas; una sola conversión activa');

    const failed = await context.newPage();
    let blocked = true, attempts = 0;
    await failed.route(enginePattern, async (route) => {
      attempts++;
      if (blocked) await route.abort('failed'); else await route.continue();
    });
    await failed.goto(base + lesson);
    await failed.getByRole('button', { name: 'Reintentar fórmulas' }).waitFor();
    assert.equal(attempts, 3);
    await failed.locator('input[value="four"]').check();
    blocked = false;
    await failed.getByRole('button', { name: 'Reintentar fórmulas' }).click();
    await ready(failed);
    assert.equal(await failed.locator('input[value="four"]').isChecked(), true);
    assert.equal(attempts, 4);
    results.push('Fallo persistente: tres intentos; recuperación manual conserva la respuesta');

    const auxiliary = await context.newPage();
    let auxiliaryAttempts = 0;
    await auxiliary.route('**/ui/safe.js', async (route) => {
      auxiliaryAttempts++;
      if (auxiliaryAttempts <= 2) await route.abort('failed'); else await route.continue();
    });
    await auxiliary.goto(base + lesson);
    await auxiliary.bringToFront();
    await ready(auxiliary);
    await auxiliary.evaluate(() => MathJax.loader.load('ui/safe'));
    assert.equal(auxiliaryAttempts, 3);
    assert.ok(await auxiliary.locator('mjx-assistive-mml').count() > 0);
    results.push('Reintentos de componente opcional y MathML de asistencia presente');

    const parallel = await Promise.all(Array.from({ length: 8 }, () => context.newPage()));
    await Promise.all(parallel.map(async (page) => { await page.goto(base + lesson); await ready(page); }));
    await Promise.all(parallel.map((page) => page.close()));
    results.push('Ocho páginas cargadas simultáneamente');

    // Volver a la página que interactúa: Chrome puede ralentizar sus temporizadores
    // si permanece detrás de las páginas usadas para probar cargas paralelas.
    await page.bringToFront();
    await page.goto(base + 'test/index.html');
    await ready(page);
    const correctAnswers = await page.evaluate(async (base) => {
      const { questions } = await import(base + 'content/activities/catalog.js');
      return questions.map((question) => question.correct);
    }, base);
    for (const value of correctAnswers) {
      await page.locator('input[value="' + value + '"]').check();
      await page.getByRole('button', { name: 'Comprobar', exact: true }).click();
      await page.getByRole('button', { name: /Siguiente pregunta|Ver resumen/ }).click();
    }
    await page.getByText(correctAnswers.length + ' de ' + correctAnswers.length + ' respuestas correctas', { exact: false }).waitFor();
    results.push('Test completo con fórmulas dinámicas y resumen correcto');
    await page.goto(base + 'tarjetas/index.html');
    await ready(page);
    await page.getByRole('button', { name: 'Mostrar respuesta' }).click();
    assert.ok(await page.locator('[data-flashcards]').innerText());
    await page.goto(base + 'laboratorios/juegos/t01-a-limite-express.html');
    const iframe = page.frameLocator('iframe');
    await iframe.getByRole('button', { name: 'Practicar sin reloj', exact: true }).click();
    await iframe.locator('mjx-container').first().waitFor();
    await iframe.getByRole('button', { name: 'Comprobar', exact: true }).waitFor();
    await page.waitForFunction(() => parseFloat(document.querySelector('iframe').style.height) > 120);
    results.push('Widget embebido: fórmulas y ajuste de altura');
    await page.goto(base + 'widgets/games/t01-a-limite-express/index.html');
    await page.getByRole('button', { name: 'Practicar sin reloj', exact: true }).click();
    await ready(page);
    results.push('Widget independiente');
    await page.setViewportSize({ width: 390, height: 844 });
    await page.goto(base + lesson);
    await ready(page);
    assert.equal(await page.evaluate(() => document.documentElement.scrollWidth <= innerWidth), true);
    assert.deepEqual(errors, []);
    results.push('Móvil sin desbordamiento y sin errores JavaScript');
    console.log(JSON.stringify({ checks: results }, null, 2));
  } finally {
    await browser.close();
  }
})().catch((error) => { console.error(error); process.exitCode = 1; });

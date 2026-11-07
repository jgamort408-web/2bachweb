const assert = require('node:assert/strict');
const { chromium } = require('playwright');

// P06 · Tarjetas en modo estudio: búsqueda, apartado (lección, categoría o repaso), autoevaluación,
// reaprendizaje de la sesión y resumen; las lecciones conservan el mazo sencillo.
(async () => {
  const base = 'http://127.0.0.1:4173/';
  const browser = await chromium.launch({ headless: true, executablePath: process.env.CHROME_PATH });
  try {
    const page = await browser.newPage({ viewport: { width: 1200, height: 900 } });
    const errors = [];
    page.on('pageerror', e => errors.push(e.message));
    page.on('response', r => { if (r.status() >= 400 && !r.url().endsWith('favicon.ico')) errors.push(r.status() + ' ' + r.url()); });
    const deck = page.locator('[data-flashcards]');
    const counter = () => deck.locator('[data-content-role="activity-progress"]').textContent();

    await page.goto(base + 'tarjetas/index.html?tema=t01');
    await deck.getByText('Tarjeta 1 de 61', { exact: true }).waitFor();
    // Apartados del tema 1: 18 lecciones y el repaso del tema, más «Todos».
    const section = page.getByLabel('Apartado');
    assert.equal(await section.locator('option').count(), 20);
    await section.selectOption('t01-e11');
    await deck.getByText('Tarjeta 1 de 3', { exact: true }).waitFor();
    assert.match(await deck.locator('[data-content-role="flashcard-category"]').textContent(), /1\.11\. Función derivada/);
    await section.selectOption('');
    // Búsqueda sin tildes en anverso y reverso.
    await page.getByLabel('Buscar en las tarjetas').fill('hopital');
    await page.waitForFunction(() => /^Tarjeta 1 de [1-9]$/.test(document.querySelector('[data-flashcards] [data-content-role="activity-progress"]').textContent));
    await page.getByLabel('Buscar en las tarjetas').fill('');
    await deck.getByText('Tarjeta 1 de 61', { exact: true }).waitFor();

    // Autoevaluación: solo tras ver la respuesta.
    await section.selectOption('t01-e13');
    await deck.getByText('Tarjeta 1 de 3', { exact: true }).waitFor();
    const know = deck.getByRole('button', { name: 'La sabía' }), again = deck.getByRole('button', { name: 'Repasar más tarde' });
    assert.equal(await know.isVisible(), false);
    const first = await deck.locator('[data-content-role="flashcard-front"]').textContent();
    await deck.getByRole('button', { name: 'Mostrar respuesta' }).click();
    await again.click();
    // La tarjeta marcada vuelve al final de este mazo corto y el foco queda en «Mostrar respuesta».
    assert.equal(await counter(), 'Tarjeta 2 de 4');
    assert.equal(await page.evaluate(() => document.activeElement.dataset.action), 'reveal');
    assert.equal(await deck.locator('[data-card-session]').textContent(), 'La sabías: 0 · Para repasar: 1');
    for (let i = 0; i < 2; i++) { await deck.getByRole('button', { name: 'Mostrar respuesta' }).click(); await know.click(); }
    assert.equal(await counter(), 'Tarjeta 4 de 4');
    assert.equal(await deck.locator('[data-content-role="flashcard-front"]').textContent(), first);
    assert.match(await deck.locator('[data-content-role="flashcard-category"]').textContent(), /Vuelve para repasar/);
    await deck.getByRole('button', { name: 'Mostrar respuesta' }).click(); await again.click();
    // Resumen: 2 sabidas y 1 por repasar; repasar solo esa.
    assert.equal(await counter(), 'Sesión terminada.');
    assert.equal(await deck.locator('[data-card-summary] p').textContent(), 'La sabías: 2 de 3. Para repasar: 1.');
    assert.equal(await page.evaluate(() => document.activeElement.textContent), 'Sesión terminada');
    await deck.getByRole('button', { name: 'Repasar la tarjeta marcada' }).click();
    assert.equal(await counter(), 'Tarjeta 1 de 1');
    assert.equal(await deck.locator('[data-content-role="flashcard-front"]').textContent(), first);
    await deck.getByRole('button', { name: 'Mostrar respuesta' }).click(); await know.click();
    assert.equal(await deck.locator('[data-card-summary] p').textContent(), 'La sabías: 1 de 1. Para repasar: 0.');
    await deck.getByRole('button', { name: 'Empezar de nuevo' }).click();
    assert.equal(await counter(), 'Tarjeta 1 de 3');

    // Temas con categorías de la fuente: el apartado es la categoría.
    await page.goto(base + 'tarjetas/index.html?tema=t07');
    await deck.getByText('Tarjeta 1 de 16', { exact: true }).waitFor();
    assert.equal(await section.locator('option').count(), 6);
    // Todo el curso: los apartados se agrupan por tema.
    await page.goto(base + 'tarjetas/index.html');
    await deck.getByText(/^Tarjeta 1 de \d+$/).waitFor();
    assert.equal(await section.locator('optgroup').count(), 10);
    // Las lecciones mantienen el mazo sencillo, sin filtros ni autoevaluación.
    await page.goto(base + 'libro/temas/02-representacion-de-funciones/03-funciones-racionales.html');
    await deck.getByText(/^Tarjeta 1 de \d+$/).waitFor();
    assert.equal(await deck.locator('[data-card-filters], [data-card-assess]').count(), 0);
    // Móvil al 200 %.
    await page.goto(base + 'tarjetas/index.html?tema=t04');
    await deck.getByText(/^Tarjeta 1 de \d+$/).waitFor();
    await page.setViewportSize({ width: 320, height: 844 });
    await page.evaluate(() => document.documentElement.style.fontSize = '200%');
    await deck.getByRole('button', { name: 'Mostrar respuesta' }).click();
    assert.equal(await page.evaluate(() => document.documentElement.scrollWidth > innerWidth), false);
    assert.deepEqual(errors, []);
    console.log('PASS: apartados por lección, categoría o repaso, búsqueda, autoevaluación, vuelta de las marcadas, resumen y repaso de pendientes; lecciones sin cambios; móvil 200 %.');
  } finally { await browser.close(); }
})().catch(e => { console.error(e); process.exitCode = 1; });

const assert = require('node:assert/strict');
const { chromium } = require('playwright');
const fs = require('node:fs');
const path = require('node:path');
const base = 'http://127.0.0.1:4173/';
const initial = () => ({ schemaVersion: 1, version: 0, defaultVisibility: 'visible', entries: {} });
async function routes(page, prefix, state) {
  await page.route(prefix + '**', async route => {
    const url = route.request().url();
    if (url.endsWith('/config/visibility.json')) {
      if (state.offline) return route.abort('failed');
      return route.fulfill({ status: 200, contentType: 'application/json', body: JSON.stringify(state.config) });
    }
    if (state.badCatalog && url.endsWith('/config/widgets.json')) return route.fulfill({ status: 503, body: 'Unavailable' });
    if (prefix !== base) {
      const response = await route.fetch({ url: url.replace(prefix, base) });
      return route.fulfill({ response });
    }
    await route.continue();
  });
}
async function ready(page, state = 'available') {
  await page.waitForFunction(value => document.documentElement.dataset.contentState === value, state);
}
async function refresh(page, prefix) {
  await page.evaluate(async prefix => {
    const { getContentContext } = await import(prefix + 'assets/js/content/runtime.js');
    await (await getContentContext()).refresh();
  }, prefix);
}

(async () => {
  const browser = await chromium.launch({ headless: true, executablePath: process.env.CHROME_PATH });
  const { questions, flashcards } = await import('../content/activities/catalog.js');
  const firstQuestion = questions.find(q => q.lessonId === 't01-e01');
  const firstCard = flashcards.find(q => q.topicId === 't01');
  const errors = [];
  try {
    for (const prefix of [base, base + 'prueba-subcarpeta/']) {
      const page = await browser.newPage({ viewport: { width: 1200, height: 900 } });
      page.on('pageerror', error => errors.push(error.message));
      const state = { config: initial() };
      await routes(page, prefix, state);
      state.config.entries['page:t01'] = { visibility: 'hidden' };
      await page.goto(prefix + 'index.html'); await ready(page);
      await page.waitForSelector('[data-primary-navigation] a');
      const focusedLink = await page.locator('[data-primary-navigation] a').first().elementHandle();
      await focusedLink.focus();
      await refresh(page, prefix);
      assert.equal(await focusedLink.evaluate(link => link.isConnected && document.activeElement === link), true);
      assert.equal(await page.locator('main a[href*="01-limites-y-derivadas"]:visible').count(), 0);
      assert.ok(await page.locator('main a[href*="02-representacion-de-funciones"]:visible').count() > 0);
      await page.goto(prefix + 'libro/index.html'); await ready(page);
      assert.equal(await page.locator('[data-course-index] .course-card').count(), 8);
      await page.goto(prefix + 'libro/temas/01-limites-y-derivadas/01-limite-de-una-funcion.html');
      await ready(page, 'unavailable');
      assert.equal(await page.locator('main h1:visible').count(), 0);
      assert.equal(await page.locator('main > section:not([data-content-availability]):visible').count(), 0);
      await page.goto(prefix + 'laboratorios/juegos/t01-a-limite-express.html'); await ready(page, 'unavailable');
      assert.equal(await page.locator('iframe').count(), 0);
      await page.goto(prefix + 'widgets/games/t01-a-limite-express/index.html'); await ready(page, 'unavailable');
      assert.equal(await page.locator('[data-start]:visible').count(), 0);
      await page.goto(prefix + 'test/index.html?tema=t01'); await ready(page);
      await page.waitForFunction(() => document.querySelector('[data-quiz]')?.textContent.includes('Todavía no hay'));
      assert.equal(await page.locator('[data-quiz] input').count(), 0);
      assert.equal(await page.locator('[data-study-topics] a[href*="tema=t01"]:visible').count(), 0);
      state.config = initial();
      state.config.entries['question:' + firstQuestion.id] = { visibility: 'hidden' };
      state.config.entries['card:' + firstCard.id] = { visibility: 'hidden' };
      await page.goto(prefix + 'test/index.html?tema=t01'); await ready(page);
      await page.waitForFunction(() => document.querySelector('[data-quiz]')?.textContent.includes('Pregunta 1 de 59'));
      assert.match(await page.locator('[data-visible-question-count]').innerText(), /59 preguntas/);
      await page.goto(prefix + 'tarjetas/index.html?tema=t01'); await ready(page);
      await page.waitForFunction(() => document.querySelector('[data-flashcards]')?.textContent.includes('Tarjeta 1 de 60'));
      assert.match(await page.locator('[data-visible-card-count]').innerText(), /60 tarjetas/);
      for (const [topicId, readingPath] of [
        ['t07', 'test/probabilidad-preguntas.html'], ['t09', 'test/inferencia-preguntas.html']
      ]) {
        const bank = questions.filter(question => question.topicId === topicId);
        state.config = initial();
        state.config.entries['page:' + topicId] = { visibility: 'hidden' };
        await page.goto(prefix + readingPath); await ready(page, 'unavailable');
        assert.equal(await page.locator('main [data-content-id]:visible').count(), 0);
        state.config = initial();
        state.config.entries['question:' + bank[0].id] = { visibility: 'hidden' };
        await page.goto(prefix + readingPath); await ready(page);
        assert.equal(await page.locator('main [data-content-id]:visible').count(), bank.length - 1);
      }
      state.config = initial();
      state.config.entries['page:t01'] = { visibility: 'hidden' };
      await page.goto(prefix + 'index.html'); await ready(page);
      state.offline = true; await refresh(page, prefix);
      assert.equal(await page.locator('main a[href*="01-limites-y-derivadas"]:visible').count(), 0);
      assert.match(await page.locator('[data-content-availability]').innerText(), /copia anterior/);
      state.offline = false;
      state.config = initial();
      await page.goto(prefix + 'admin/index.html'); await ready(page);
      assert.match(await page.locator('[data-admin-service]').innerText(), /sin configurar/);
      assert.equal(await page.locator('[data-admin-panel]:visible').count(), 0);
      await page.locator('[data-admin-development]').focus();
      await page.locator('[data-admin-development]').press('Enter');
      const search = page.locator('[data-admin-search]');
      await search.fill('page:t01');
      const topic = page.locator('[data-content-id="page:t01"] select').first();
      await topic.focus(); await topic.press('End'); await topic.press('Enter');
      assert.equal(await topic.inputValue(), 'hidden');
      assert.match(await page.locator('[data-content-id="page:t01-e01"] .admin-state').first().innerText(), /Oculto por/);
      await page.locator('[data-admin-preview-open]').click();
      const preview = await page.locator('[data-admin-preview]').elementHandle().then(handle => handle.contentFrame());
      await ready(preview);
      assert.equal(await preview.locator('main a[href*="01-limites-y-derivadas"]:visible').count(), 0);
      await preview.locator('main a[href*="02-representacion-de-funciones/01-"]').click();
      await preview.waitForURL(/02-representacion-de-funciones\/01-/);
      await ready(preview);
      assert.match(preview.url(), /vista-previa=/);
      assert.match(await preview.locator('h1').innerText(), /2\.1/);
      const outside = await browser.newPage();
      await routes(outside, prefix, state);
      await outside.goto(prefix + 'index.html'); await ready(outside);
      assert.ok(await outside.locator('main a[href*="01-limites-y-derivadas"]:visible').count() > 0);
      await outside.close();
      await page.locator('[data-admin-discard]').click();
      assert.equal(await topic.inputValue(), 'inherit');
      assert.equal(await page.locator('[data-admin-save]').isDisabled(), true);
      await topic.selectOption('hidden');
      await page.locator('[data-admin-save]').click();
      await page.waitForFunction(() => document.querySelector('[data-admin-status]')?.textContent.includes('solo en memoria'));
      assert.match(await page.locator('[data-admin-summary]').innerText(), /0 cambios en el borrador/);
      await search.fill('page:home');
      assert.equal(await page.locator('[data-content-id="page:home"] select').isDisabled(), true);
      await page.setViewportSize({ width: 390, height: 844 });
      await page.evaluate(() => document.documentElement.style.fontSize = '200%');
      assert.equal(await page.evaluate(() => document.documentElement.scrollWidth > innerWidth), false);
      assert.equal(await page.locator('[data-mml-node="merror"]').count(), 0);
      await page.close();
      console.log('Panel, rutas y actividades verificadas: ' + prefix);
    }

    const live = await browser.newPage();
    live.on('pageerror', error => errors.push(error.message));
    await live.addInitScript(() => { crypto.getRandomValues = values => { values.fill(159); return values; }; });
    const liveState = { config: initial() };
    await routes(live, base, liveState);
    await live.goto(base + 'laboratorios/juegos/t01-c-derivada-detective.html'); await ready(live);
    const game = await live.locator('iframe').elementHandle().then(handle => handle.contentFrame());
    await game.waitForFunction(() => document.querySelector('[data-game] input'));
    await live.waitForFunction(() => document.documentElement.dataset.gameSession === 'active');
    liveState.config.entries['page:game-t01-c-derivada-detective'] = { visibility: 'hidden' };
    await refresh(live, base); await refresh(game, base);
    assert.equal(await live.locator('iframe:visible').count(), 1);
    assert.match(await live.locator('[data-content-availability]').innerText(), /terminar esta partida/);
    const { generateDetectiveSession } = await import('../widgets/games/t01-c-derivada-detective/generator.js');
    const session = generateDetectiveSession(159);
    for (const question of session) {
      await game.waitForFunction(() => !document.querySelector('[data-game] button')?.disabled);
      await game.locator('[data-game] input[value="' + question.correct + '"]').check();
      await game.locator('[data-game] button').nth(0).click();
      await game.locator('[data-game] button').nth(2).waitFor({ state: 'visible' });
      await game.locator('[data-game] button').nth(2).click();
    }
    assert.match(await game.locator('[data-game]').innerText(), /Sesión terminada/);
    await game.locator('[data-game] button').nth(2).click();
    await ready(live, 'unavailable');
    assert.equal(await live.locator('iframe:visible').count(), 0);
    await live.close();
    console.log('Partida iniciada finalizada; nueva partida bloqueada.');

    const smoke = await browser.newPage();
    smoke.on('pageerror', error => errors.push(error.message));
    const widgets = JSON.parse(fs.readFileSync(path.join(__dirname, '..', 'config', 'widgets.json'), 'utf8'));
    for (const widget of widgets) {
      await smoke.goto(base + widget.path); await ready(smoke);
      await smoke.waitForFunction(() => document.querySelector('.math-status')?.hidden !== false);
      assert.equal(await smoke.locator('body').getAttribute('data-widget-id'), widget.id);
      assert.equal(await smoke.locator('[data-mml-node="merror"]').count(), 0, widget.id);
    }
    await smoke.close();
    console.log('Carga independiente de los 28 widgets sin errores de página ni fórmulas.');

    const remote = await browser.newPage();
    remote.on('pageerror', error => errors.push(error.message));
    const remotePrefix = 'http://example.test/';
    await routes(remote, remotePrefix, { config: initial() });
    await remote.goto(remotePrefix + 'admin/index.html'); await ready(remote);
    assert.equal(await remote.locator('[data-admin-development]:visible').count(), 0);
    assert.equal(await remote.locator('[data-admin-panel]:visible').count(), 0);
    await remote.close();

    const failed = await browser.newPage();
    await routes(failed, base, { config: initial(), badCatalog: true });
    await failed.goto(base + 'index.html'); await ready(failed, 'error');
    assert.match(await failed.locator('[data-content-availability]').innerText(), /No se ha podido comprobar/);
    assert.equal(await failed.locator('main .course-grid:visible').count(), 0);
    await failed.close();

    const nojsContext = await browser.newContext({ javaScriptEnabled: false });
    const nojs = await nojsContext.newPage();
    await nojs.goto(base + 'libro/temas/01-limites-y-derivadas/01-limite-de-una-funcion.html');
    assert.equal(await nojs.locator('main h1:visible').count(), 1);
    await nojsContext.close();
    assert.deepEqual(errors, []);
    console.log('Sin permisos administrativos en despliegue; error de catálogo y lectura sin JS comprobados.');
  } finally { await browser.close(); }
})().catch(error => { console.error(error); process.exitCode = 1; });

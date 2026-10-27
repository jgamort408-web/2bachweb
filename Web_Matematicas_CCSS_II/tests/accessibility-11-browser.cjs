const assert = require('node:assert/strict');
const fs = require('node:fs');
const path = require('node:path');
const { chromium } = require('playwright');
const base = process.env.TEST_URL || 'http://127.0.0.1:4173/';
const pages = JSON.parse(fs.readFileSync('config/pages.json', 'utf8'));
const widgets = JSON.parse(fs.readFileSync('config/widgets.json', 'utf8')).filter(w => w.topicId === 't01');
const lessons = pages.filter(p => p.parentId === 't01');
const root = path.resolve('.');
const htmlFiles = [];
function collect(dir) {
  for (const item of fs.readdirSync(dir, { withFileTypes: true })) {
    if (['node_modules', '.git'].includes(item.name)) continue;
    const file = path.join(dir, item.name);
    if (item.isDirectory()) collect(file);
    else if (file.endsWith('.html')) htmlFiles.push({ path: path.relative(root, file).replaceAll('\\', '/'), html: fs.readFileSync(file, 'utf8') });
  }
}
collect(root);
(async () => {
  const browser = await chromium.launch({ headless: true, ...(process.env.CHROME_PATH ? { executablePath: process.env.CHROME_PATH } : {}) });
  const errors = [];
  try {
    const context = await browser.newContext({ viewport: { width: 390, height: 844 } });
    const page = await context.newPage();
    page.on('pageerror', e => errors.push(e.message));
    page.on('response', r => { if (r.status() >= 400 && !r.url().endsWith('favicon.ico')) errors.push(r.status() + ' ' + r.url()); });
    await page.goto(base + lessons[0].path);
    const audit = await page.evaluate(files => files.map(file => {
      const doc = new DOMParser().parseFromString(file.html, 'text/html');
      const ids = [...doc.querySelectorAll('[id]')].map(el => el.id);
      return { path: file.path, ids, links: [...doc.querySelectorAll('[href], [src]')].flatMap(el => ['href', 'src'].filter(a => el.hasAttribute(a)).map(a => el.getAttribute(a))) };
    }), htmlFiles);
    const byPath = new Map(audit.map(file => [file.path, file]));
    for (const file of audit) {
      assert.equal(new Set(file.ids).size, file.ids.length, 'IDs duplicados: ' + file.path);
      for (const link of file.links) {
        if (!link || /^(?:[a-z]+:|\/\/)/i.test(link)) continue;
        const url = new URL(link, 'https://audit.local/' + file.path);
        let relative = decodeURIComponent(url.pathname).slice(1);
        if (relative.endsWith('/')) relative += 'index.html';
        assert.ok(fs.existsSync(path.join(root, relative)), file.path + ' → ' + link);
        if (url.hash && byPath.has(relative)) assert.ok(byPath.get(relative).ids.includes(decodeURIComponent(url.hash.slice(1))), 'Ancla: ' + file.path + ' → ' + link);
      }
    }
    assert.equal(lessons.length, 18);
    for (let i = 0; i < lessons.length; i++) {
      await page.goto(base + lessons[i].path);
      await page.locator('[data-reading-controls]').waitFor();
      const related = await page.locator('[data-context-navigation] a').evaluateAll(links => links.map(a => a.href));
      for (const target of [lessons[i - 1], pages.find(p => p.id === 't01'), lessons[i + 1]].filter(Boolean)) assert.ok(related.includes(new URL(target.path, base).href), lessons[i].id + ' sin ' + target.id);
      assert.equal(await page.locator('h1').count(), 1);
    }
    await page.goto(base + lessons[0].path);
    const openControls = async p => { await p.locator('[data-reading-controls] > summary').click(); };
    await openControls(page);
    await page.locator('[data-text-size]').selectOption('200');
    await page.locator('[data-contrast-control]').check();
    await page.locator('[data-highlight-control]').check();
    const checkSettings = async (p, size = 32) => {
      await p.waitForFunction(expected => getComputedStyle(document.documentElement).fontSize === expected + 'px', size);
      assert.equal(await p.locator('html').getAttribute('data-contrast'), 'true');
      assert.equal(await p.locator('html').getAttribute('data-highlight'), 'true');
      assert.equal(await p.evaluate(() => document.documentElement.scrollWidth <= innerWidth), true, 'Desbordamiento: ' + p.url());
    };
    await checkSettings(page);
    assert.equal(await page.locator('.definition').first().evaluate(el => getComputedStyle(el).backgroundColor), 'rgb(255, 242, 168)');
    assert.equal(await page.locator('body').evaluate(el => getComputedStyle(el).color), 'rgb(0, 0, 0)');
    await page.locator('[data-text-size]').focus();
    assert.notEqual(await page.locator('[data-text-size]').evaluate(el => getComputedStyle(el).outlineStyle), 'none');
    await page.setViewportSize({ width: 320, height: 844 });
    for (const lesson of lessons) {
      await page.goto(base + lesson.path);
      await page.waitForFunction(() => document.querySelector('.math-status')?.hidden === true);
      await checkSettings(page);
      assert.equal(await page.locator('[data-mml-node="merror"]').count(), 0, lesson.id);
    }
    await page.setViewportSize({ width: 390, height: 844 });
    await page.goto(base + lessons[0].path); await openControls(page);
    const second = await context.newPage();
    await second.goto(base + 'accesibilidad/index.html'); await checkSettings(second);
    await page.locator('[data-text-size]').selectOption('150'); await checkSettings(second, 24);
    await page.locator('[data-text-size]').selectOption('200'); await second.close();

    for (const widget of widgets) {
      await page.goto(base + pages.find(p => p.id === widget.hostPageId).path);
      await page.locator('iframe').waitFor();
      // loading=lazy: desplazar antes de buscar el documento interior.
      await page.locator('iframe').scrollIntoViewIfNeeded();
      const frame = await page.locator('iframe').elementHandle().then(el => el.contentFrame());
      await frame.waitForFunction(() => document.documentElement.hasAttribute('data-reading-preferences'));
      if (await frame.locator('[data-start="practice"]').count()) await frame.locator('[data-start="practice"]').click();
      await frame.waitForFunction(() => document.querySelector('.math-status')?.hidden === true);
      await checkSettings(frame);
      assert.equal(await frame.locator('[data-reading-controls]').count(), 0, 'El iframe hereda los controles del anfitrión');
      const answer = frame.locator('main input:not([type="range"])').first();
      const radio = await answer.getAttribute('type') === 'radio';
      if (radio) await answer.check(); else await answer.fill('7');
      await frame.locator('mjx-container').first().evaluate(el => { el.dataset.auditPreserved = 'true'; });
      await openControls(page);
      await page.locator('[data-text-size]').selectOption('125'); await checkSettings(frame, 20);
      await page.locator('[data-text-size]').selectOption('200'); await checkSettings(frame);
      assert.equal(radio ? await answer.isChecked() : await answer.inputValue(), radio ? true : '7');
      assert.equal(await frame.locator('mjx-container[data-audit-preserved]').count(), 1, 'Las fórmulas no se reconstruyen al cambiar ajustes');
      assert.equal(await frame.locator('[data-mml-node="merror"]').count(), 0);
      assert.equal(await frame.locator('main button').first().evaluate(el => getComputedStyle(el).fontSize), '32px', 'Los botones también amplían el texto');
      await page.setViewportSize({ width: 320, height: 844 }); await checkSettings(frame);
      await page.waitForFunction(() => {
        const f = document.querySelector('iframe');
        return f.getBoundingClientRect().height >= f.contentDocument.body.getBoundingClientRect().height;
      });
      if (process.env.SCREENSHOT_DIR && widget.id.includes('detective')) await frame.locator('body').screenshot({ path: process.env.SCREENSHOT_DIR + '/lectura-detective-200.png' });
      // Mismo origen pero emisor equivocado: no debe poder alterar los ajustes.
      await frame.evaluate(id => window.dispatchEvent(new MessageEvent('message', { origin: location.origin, source: window, data: { channel: 'math-widget', type: 'preferences', widgetId: id, preferences: { textSize: 100 } } })), widget.id);
      await checkSettings(frame);
      await page.setViewportSize({ width: 390, height: 844 });
      await page.goto(base + widget.path); await checkSettings(page);
      await page.locator('[data-reading-controls]').waitFor();
      await openControls(page);
      assert.equal(await page.locator('[data-text-size]').inputValue(), '200');
      await page.locator('[data-reset-reading]').click();
      assert.equal(await page.locator('html').getAttribute('data-contrast'), 'false');
      await page.locator('[data-text-size]').selectOption('200');
      await page.locator('[data-contrast-control]').check(); await page.locator('[data-highlight-control]').check();
    }
    // Restauración desde caché de navegación: pausa y reanudación del reloj.
    const lifecycle = await browser.newPage();
    await lifecycle.clock.install();
    await lifecycle.goto(base + widgets[3].path);
    await lifecycle.locator('[data-start="sprint"]').click();
    await lifecycle.waitForFunction(() => !document.querySelector('#sprint-value').matches(':disabled'));
    await lifecycle.evaluate(() => window.dispatchEvent(new PageTransitionEvent('pagehide', { persisted: true })));
    const pausedTime = await lifecycle.locator('[data-time]').innerText();
    await lifecycle.clock.fastForward(60000);
    await lifecycle.evaluate(() => window.dispatchEvent(new PageTransitionEvent('pageshow', { persisted: true })));
    assert.equal(await lifecycle.locator('[data-time]').innerText(), pausedTime);
    assert.equal(await lifecycle.locator('#sprint-value').isDisabled(), true);
    await lifecycle.getByRole('button', { name: 'Reanudar', exact: true }).click();
    await lifecycle.clock.fastForward(46000);
    await lifecycle.locator('[data-time-notice]').filter({ hasText: 'Tiempo agotado' }).waitFor();
    await lifecycle.close();
    // Subcarpetas independientes: un repositorio no impone ajustes a otro.
    const prefix = new URL('prueba-subcarpeta/', base).href;
    await page.route(prefix + '**', async route => { const response = await route.fetch({ url: route.request().url().replace(prefix, base) }); await route.fulfill({ response }); });
    await page.goto(prefix + pages.find(p => p.id === widgets[0].hostPageId).path);
    await openControls(page);
    assert.equal(await page.locator('[data-text-size]').inputValue(), '100');
    await page.locator('[data-text-size]').selectOption('200'); await page.locator('[data-contrast-control]').check(); await page.locator('[data-highlight-control]').check();
    await page.locator('iframe').scrollIntoViewIfNeeded();
    const subframe = await page.locator('iframe').elementHandle().then(el => el.contentFrame()); await checkSettings(subframe);
    const stored = await page.evaluate(() => Object.fromEntries(Object.keys(localStorage).map(key => [key, JSON.parse(localStorage.getItem(key))])));
    assert.equal(Object.keys(stored).length, 2);
    for (const item of Object.values(stored)) assert.deepEqual(Object.keys(item).sort(), ['contrast', 'highlight', 'textSize']);
    // Almacenamiento denegado: la página y el iframe siguen operativos.
    const blocked = await browser.newContext({ viewport: { width: 390, height: 844 } });
    await blocked.addInitScript(() => {
      Object.defineProperty(window, 'localStorage', { get() { throw new DOMException('Bloqueado', 'SecurityError'); } });
    });
    const noStore = await blocked.newPage(); noStore.on('pageerror', e => errors.push(e.message));
    await noStore.goto(base + pages.find(p => p.id === widgets[0].hostPageId).path);
    await openControls(noStore); await noStore.locator('[data-text-size]').selectOption('200');
    await noStore.locator('[data-contrast-control]').check(); await noStore.locator('[data-highlight-control]').check();
    await noStore.locator('[data-reading-status]').filter({ hasText: 'no permite recordarlos' }).waitFor();
    await noStore.locator('iframe').scrollIntoViewIfNeeded();
    const noStoreFrame = await noStore.locator('iframe').elementHandle().then(el => el.contentFrame()); await checkSettings(noStoreFrame);
    await blocked.close();
    assert.deepEqual(errors, []);
    console.log('Aprobado: ' + audit.length + ' HTML, navegación de 18 lecciones, preferencias en cuatro juegos y vistas independientes, respuestas y SVG conservados, 200 %, móvil 320/390, altura, foco, pestañas, subcarpeta, mensajes ajenos y almacenamiento denegado.');
  } finally { await browser.close(); }
})().catch(error => { console.error(error); process.exitCode = 1; });

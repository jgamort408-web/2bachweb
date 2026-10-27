const assert = require('node:assert/strict');
const { chromium } = require('playwright');

(async () => {
  const browser = await chromium.launch({ headless: true, executablePath: process.env.CHROME_PATH });
  const base = 'http://127.0.0.1:4173/';
  try {
    const page = await browser.newPage();
    const errors = [];
    page.on('pageerror', error => errors.push(error.message));
    for (const prefix of [base, base + 'prueba-subcarpeta/']) {
      if (prefix !== base) {
        await page.route(prefix + '**', async route => {
          const response = await route.fetch({ url: route.request().url().replace(prefix, base) });
          await route.fulfill({ response });
        });
      }
      await page.goto(prefix + 'libro/temas/01-limites-y-derivadas/01-limite-de-una-funcion.html');
      await page.waitForFunction(() => document.querySelector('#site-header [data-primary-navigation] a'));
      await page.waitForFunction(() => document.querySelector('mjx-container'));
      const before = await page.locator('h1').innerText();
      const result = await page.evaluate(async prefix => {
        const { loadProjectCatalog } = await import(prefix + 'assets/js/content/project-catalog.js');
        const { createVisibilityModel, DEFAULT_VISIBILITY_CONFIG } = await import(prefix + 'assets/js/content/visibility.js');
        const { createContentRepository } = await import(prefix + 'assets/js/content/repository.js');
        const { createStaticVisibilityRepository, createMemoryVisibilityRepository } = await import(prefix + 'assets/js/admin/visibility-repository.js');
        const { projectUrl } = await import(prefix + 'assets/js/core/paths.js');
        const storageBefore = JSON.stringify([Object.entries(localStorage), Object.entries(sessionStorage)]);
        const catalog = await loadProjectCatalog();
        const content = createContentRepository(catalog);
        const published = createStaticVisibilityRepository({ catalog, url: projectUrl('config/visibility.json') });
        const loaded = await published.readPublicConfig();
        const dev = createMemoryVisibilityRepository({ catalog, initialConfig: loaded.config });
        const draft = { ...loaded.config, entries: { 'page:t01': { visibility: 'hidden' } } };
        const saved = await dev.save(draft, loaded.config.version);
        const model = createVisibilityModel(catalog, saved.config);
        const offline = createStaticVisibilityRepository({ catalog, url: projectUrl('config/visibility.json'),
          fetcher: async () => { throw new TypeError('offline simulation'); } });
        const malformed = createStaticVisibilityRepository({ catalog, url: projectUrl('config/visibility.json'),
          fetcher: async () => new Response('{"schemaVersion":99}', { status: 200 }) });
        return {
          count: catalog.entities.length, url: projectUrl('config/visibility.json'), origin: loaded.origin,
          gameId: content.entityIdFor('widget', 't01-a-limite-express'),
          gameVisible: model.isVisible('page:game-t01-a-limite-express'),
          otherTopicVisible: model.isVisible('page:t02'), version: saved.config.version,
          offline: await offline.readPublicConfig(), malformed: await malformed.readPublicConfig(),
          expectedFallback: DEFAULT_VISIBILITY_CONFIG,
          noStorageChanges: storageBefore === JSON.stringify([Object.entries(localStorage), Object.entries(sessionStorage)])
        };
      }, prefix);
      assert.equal(result.count, 996);
      assert.equal(result.url, prefix + 'config/visibility.json');
      assert.equal(result.origin, 'static');
      assert.equal(result.gameId, 'page:game-t01-a-limite-express');
      assert.equal(result.gameVisible, false);
      assert.equal(result.otherTopicVisible, true);
      assert.equal(result.version, 1);
      assert.equal(result.offline.origin, 'fallback');
      assert.deepEqual(result.offline.config, result.expectedFallback);
      assert.equal(result.malformed.warning.code, 'invalid-data');
      assert.equal(result.noStorageChanges, true);
      assert.equal(await page.locator('h1').innerText(), before);
      assert.equal(await page.locator('[data-mml-node="merror"]').count(), 0);
      const pdfs = await page.evaluate(async prefix => {
        const config = await (await fetch(prefix + 'config/resources.json')).json();
        return Promise.all(config.resources.map(async resource => {
          const response = await fetch(prefix + resource.path);
          const bytes = new Uint8Array(await response.arrayBuffer());
          return { id: resource.id, status: response.status, type: response.headers.get('content-type'),
            signature: String.fromCharCode(...bytes.slice(0, 5)) };
        }));
      }, prefix);
      assert.equal(pdfs.length, 48);
      for (const pdf of pdfs) {
        assert.equal(pdf.status, 200, pdf.id);
        assert.match(pdf.type, /application\/pdf/, pdf.id);
        assert.equal(pdf.signature, '%PDF-', pdf.id);
      }
      console.log('Contratos de catálogo/visibilidad verificados: ' + prefix);
    }
    assert.deepEqual(errors, []);
  } finally {
    await browser.close();
  }
})().catch(error => { console.error(error); process.exitCode = 1; });

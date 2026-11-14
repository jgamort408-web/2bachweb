const assert = require('node:assert/strict');
const { chromium } = require('playwright');

// Aplicación instalable (Q01): manifiesto e iconos en cualquier página, service worker y uso sin conexión.
(async () => {
  const base = 'http://127.0.0.1:4173/';
  const browser = await chromium.launch({ headless: true, executablePath: process.env.CHROME_PATH });
  try {
    const context = await browser.newContext({ viewport: { width: 390, height: 844 } });
    // Playwright marca navigator.webdriver y la web no registra el service worker en las pruebas salvo que se pida.
    await context.addInitScript(() => sessionStorage.setItem('mc:sw', 'on'));
    const page = await context.newPage();
    const errors = [];
    page.on('pageerror', error => errors.push(error.message));
    page.on('requestfailed', request => { if (!request.url().startsWith('blob:')) errors.push('fallida ' + request.url()); });
    page.on('response', response => { if (response.status() >= 400 && !response.url().endsWith('favicon.ico')) errors.push(response.status() + ' ' + response.url()); });

    // Una lección sin etiquetas propias recibe manifiesto, icono de iOS y color de barra desde content-gate.js.
    const lesson = base + 'libro/temas/03-integrales/02-integrales-inmediatas.html';
    await page.goto(lesson);
    const head = await page.evaluate(() => ({
      manifest: document.querySelector('link[rel="manifest"]')?.href,
      apple: document.querySelector('link[rel="apple-touch-icon"]')?.href,
      theme: document.querySelector('meta[name="theme-color"]')?.content,
      title: document.querySelector('meta[name="apple-mobile-web-app-title"]')?.content
    }));
    assert.equal(head.manifest, base + 'manifest.webmanifest');
    assert.equal(head.apple, base + 'assets/icons/app/apple-touch-icon.png');
    assert.equal(head.theme, '#172033');
    assert.equal(head.title, 'Mates CCSS II');
    const manifest = await (await page.request.get(head.manifest)).json();
    assert.equal(manifest.short_name, 'Mates CCSS II');
    for (const icon of manifest.icons) assert.equal((await page.request.get(new URL(icon.src, head.manifest).href)).status(), 200, icon.src);

    // El service worker se instala con ámbito en la raíz y controla la página tras recargar.
    const scope = await page.evaluate(async () => (await navigator.serviceWorker.ready).scope);
    assert.equal(scope, base);
    await page.reload();
    assert.equal(await page.evaluate(() => Boolean(navigator.serviceWorker.controller)), true);
    await page.waitForFunction(() => document.querySelectorAll('main mjx-container').length > 3, null, { timeout: 60000 });

    // Sin conexión: la lección visitada se abre desde la copia y una página no visitada muestra offline.html.
    await context.setOffline(true);
    await page.reload();
    assert.match(await page.locator('h1').first().textContent(), /Integrales inmediatas|3\.2/);
    await page.waitForFunction(() => document.querySelectorAll('main mjx-container').length > 3, null, { timeout: 60000 });
    await page.goto(base + 'libro/temas/05-sistemas-de-ecuaciones/index.html');
    assert.equal(await page.locator('h1').first().textContent(), 'Sin conexión');
    // Se sirve en la URL pedida: sus estilos, cabecera y pie cargan desde la raíz gracias a <base>.
    await page.waitForSelector('.mc-header');
    assert.equal(await page.evaluate(() => getComputedStyle(document.body).fontFamily.includes('Plus Jakarta Sans')), true);
    assert.equal(await page.evaluate(() => location.pathname), '/libro/temas/05-sistemas-de-ecuaciones/index.html');
    await page.goto(base);
    assert.equal(await page.locator('body').getAttribute('data-page-id'), 'home');
    await context.setOffline(false);

    // Página de instalación: estado legible y botón oculto mientras el navegador no ofrezca instalar.
    await page.goto(base + 'instalar.html');
    await page.waitForFunction(() => document.querySelector('[data-install-state]')?.dataset.installState);
    assert.ok(await page.locator('[data-install-state]').textContent());
    assert.equal(await page.locator('main [data-install-button]').isHidden(), true);
    // Si el navegador avisa, aparece el botón en la página y en el pie.
    await page.evaluate(() => { window.mcInstallPrompt = { prompt() { window.prompted = true; }, userChoice: Promise.resolve({ outcome: 'accepted' }) }; dispatchEvent(new CustomEvent('mc:installable')); });
    assert.equal(await page.locator('main [data-install-button]').isVisible(), true);
    assert.equal(await page.locator('footer [data-install-button]').count(), 1);
    await page.locator('main [data-install-button]').click();
    assert.equal(await page.evaluate(() => window.prompted), true);
    await page.waitForFunction(() => document.querySelector('main [data-install-button]').hidden);
    assert.ok(await page.locator('footer a[href$="instalar.html"]').count() >= 1);
    assert.deepEqual(errors, []);

    // Las demás pruebas (navigator.webdriver sin la marca) no registran el service worker.
    const plain = await browser.newContext();
    const other = await plain.newPage();
    await other.goto(lesson);
    await other.waitForTimeout(500);
    assert.equal(await other.evaluate(async () => (await navigator.serviceWorker.getRegistrations()).length), 0);
    await plain.close();
    console.log('PASS: manifiesto e iconos en todas las páginas, service worker en la raíz, lección visitada sin conexión, offline.html e instalación.');
  } finally { await browser.close(); }
})().catch(error => { console.error(error); process.exitCode = 1; });

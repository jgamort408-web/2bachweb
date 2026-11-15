const assert = require('node:assert/strict');
const { chromium } = require('playwright');

// Enlaces del contenido: en el texto toman el tono del bloque con subrayado fino; los grupos que son solo
// enlaces (« · ») pasan a fichas y las listas de un enlace por elemento, a filas. El texto de la página no cambia.
(async () => {
  const base = 'http://127.0.0.1:4173/';
  const browser = await chromium.launch({ headless: true, executablePath: process.env.CHROME_PATH });
  try {
    const page = await browser.newPage({ viewport: { width: 1280, height: 800 } });
    const errors = [];
    page.on('pageerror', error => errors.push(error.message));
    const accent = () => page.evaluate(() => {
      const probe = document.createElement('span');
      probe.style.color = 'var(--mc-accent-dark)';
      document.querySelector('main').append(probe);
      const color = getComputedStyle(probe).color; probe.remove(); return color;
    });

    // Tema 1 (análisis): grupo con separadores → fichas; requisito → enlace de texto.
    await page.goto(base + 'libro/temas/01-limites-y-derivadas/02-limites-laterales.html');
    const group = page.locator('main p:has(> a[href*="test/index.html"])').first();
    await page.locator('main p.mc-linkset').first().waitFor();
    assert.equal(await group.evaluate(el => el.classList.contains('mc-linkset')), true);
    assert.match(await group.textContent(), /Comprobar con el test inicial · Repasar con tarjetas/);
    const chip = await group.locator('a').first().evaluate(a => ({ display: getComputedStyle(a).display, deco: getComputedStyle(a).textDecorationLine, border: getComputedStyle(a).borderTopWidth }));
    assert.deepEqual(chip, { display: 'flex', deco: 'none', border: '1px' }); // inline-flex dentro del contenedor flex
    assert.equal(await group.locator('.mc-linkset__sep').first().getAttribute('aria-hidden'), 'true');
    const prose = page.locator('main [data-content-role="prerequisites"] a').first();
    const style = await prose.evaluate(a => ({ color: getComputedStyle(a).color, deco: getComputedStyle(a).textDecorationLine, weight: getComputedStyle(a).fontWeight }));
    assert.deepEqual(style, { color: await accent(), deco: 'underline', weight: '600' });

    // Tema 7 (azar): el enlace de texto toma el tono del bloque, no el azul genérico.
    await page.goto(base + 'libro/temas/07-probabilidad/01-sucesos-regla-de-laplace.html');
    await page.locator('main [data-content-role="source"] a').first().waitFor();
    assert.equal(await page.locator('main [data-content-role="source"] a').first().evaluate(a => getComputedStyle(a).color), await accent());
    assert.notEqual(await accent(), 'rgb(29, 78, 216)');

    // «Así cae en Selectividad»: lista de filas con flecha.
    await page.goto(base + 'libro/temas/01-limites-y-derivadas/04-limites-infinitos-en-un-punto-finito.html');
    const rows = page.locator('.mc-sel-link ul.mc-linklist a');
    await rows.first().waitFor();
    assert.equal(await rows.first().evaluate(a => getComputedStyle(a).display), 'flex');
    assert.match(await rows.first().evaluate(a => getComputedStyle(a, '::after').content), /→/);
    // «Continuar» lleva flecha; «Practicar», no.
    const next = page.locator('main p.mc-linkset a[data-link-direction="next"]').first();
    assert.match(await next.textContent(), /^Continuar/);

    // Los índices de apartados, la ruta del tema y los botones no se tocan.
    await page.goto(base + 'libro/temas/01-limites-y-derivadas/index.html');
    await page.locator('.mc-route__link').first().waitFor();
    assert.equal(await page.locator('[data-topic-index] .mc-linkset, .mc-route .mc-linkset').count(), 0);
    assert.equal(await page.locator('main a.mc-btn.mc-linkset, main .mc-btn [data-link-direction]').count(), 0);
    assert.equal(await page.evaluate(() => document.documentElement.scrollWidth > innerWidth), false);
    assert.deepEqual(errors, []);
    console.log('PASS: enlaces de texto con el tono del bloque, grupos en fichas, listas en filas y navegación intacta.');
  } finally { await browser.close(); }
})().catch(error => { console.error(error); process.exitCode = 1; });

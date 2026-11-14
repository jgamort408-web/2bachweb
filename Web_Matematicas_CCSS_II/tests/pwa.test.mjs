import test from 'node:test';
import assert from 'node:assert/strict';
import fs from 'node:fs';

const read = path => fs.readFileSync(new URL('../' + path, import.meta.url));
const exists = path => fs.existsSync(new URL('../' + path, import.meta.url));
/** Ancho y alto de un PNG (cabecera IHDR). */
const pngSize = path => { const data = read(path); return [data.readUInt32BE(16), data.readUInt32BE(20)]; };

test('aplicación instalable: manifiesto con rutas relativas, iconos del tamaño declarado y maskable', () => {
  const manifest = JSON.parse(read('manifest.webmanifest'));
  assert.equal(manifest.short_name, 'Mates CCSS II');
  assert.ok(manifest.short_name.length <= 15);
  assert.equal(manifest.display, 'standalone');
  assert.equal(manifest.lang, 'es');
  // Sin rutas absolutas: el sitio vive en una subcarpeta de GitHub Pages.
  for (const url of [manifest.start_url, manifest.scope, manifest.id, ...manifest.shortcuts.map(s => s.url)]) assert.match(url, /^\.\//, url);
  assert.ok(exists(manifest.start_url.slice(2)));
  for (const shortcut of manifest.shortcuts) assert.ok(exists(shortcut.url.slice(2)), shortcut.url);
  for (const icon of [...manifest.icons, ...manifest.shortcuts.flatMap(s => s.icons)]) {
    assert.ok(!icon.src.startsWith('/'), icon.src);
    assert.ok(exists(icon.src), icon.src);
    if (icon.type === 'image/png') assert.deepEqual(pngSize(icon.src), icon.sizes.split('x').map(Number), icon.src);
  }
  for (const size of ['192x192', '512x512']) {
    for (const purpose of ['any', 'maskable']) assert.ok(manifest.icons.some(i => i.sizes === size && i.purpose === purpose), size + purpose);
  }
  assert.deepEqual(pngSize('assets/icons/app/apple-touch-icon.png'), [180, 180]);
  assert.deepEqual(pngSize('assets/icons/app/favicon-32.png'), [32, 32]);
  assert.match(manifest.theme_color, /^#[0-9A-F]{6}$/i);
});

test('aplicación instalable: el service worker guarda archivos que existen y respeta el ámbito', () => {
  const source = read('sw.js').toString();
  const list = JSON.parse(source.match(/const PRECACHE = (\[[\s\S]*?\]);/)[1].replace(/'/g, '"'));
  assert.ok(list.includes('offline.html') && list.includes('index.html'));
  for (const path of list) if (path !== './') assert.ok(exists(path), path);
  // Todas las hojas que importa main.css están en la lista: la portada se pinta sin conexión.
  for (const [, css] of read('assets/css/main.css').toString().matchAll(/@import url\('\.\/([^']+)'\)/g)) assert.ok(list.includes('assets/css/' + css), css);
  for (const font of fs.readdirSync(new URL('../assets/fonts/', import.meta.url)).filter(name => name.endsWith('.woff2'))) assert.ok(list.includes('assets/fonts/' + font), font);
  assert.match(source, /startsWith\(self\.registration\.scope\)/);
  assert.match(source, /response\.status === 200/);
  // Registro y etiquetas desde el script que cargan todas las páginas, con rutas calculadas desde su ubicación.
  const gate = read('assets/js/core/content-gate.js').toString();
  for (const needle of ["'manifest.webmanifest'", "'sw.js'", 'apple-touch-icon', 'apple-mobile-web-app-title', 'theme-color', 'beforeinstallprompt']) assert.ok(gate.includes(needle), needle);
  assert.equal(JSON.parse(read('config/pages.json')).filter(page => ['instalar.html', 'offline.html'].includes(page.path)).length, 2);
});

/**
 * Service worker de la aplicación instalable (Q01). Vive en la raíz del sitio para que su ámbito cubra toda la web,
 * también dentro de la subcarpeta de GitHub Pages.
 *
 * - Al instalarse guarda la base: portada, página sin conexión, estilos, tipografías, manifiesto e iconos.
 * - Páginas, datos y código: primero la red (siempre la versión publicada) y, sin conexión, la copia guardada.
 * - MathJax, tipografías e iconos no cambian entre publicaciones: primero la copia guardada.
 * - Sin conexión y sin copia de una página: offline.html.
 * Cambiar VERSION al modificar la lista PRECACHE; las cachés antiguas se borran al activarse la nueva.
 */
const VERSION = 'v1';
const CACHE = 'mates-ccss-ii-' + VERSION;
const PRECACHE = [
  './', 'index.html', 'offline.html', 'manifest.webmanifest',
  'assets/css/main.css', 'assets/css/tokens.css', 'assets/css/fonts.css', 'assets/css/components.css',
  'assets/css/layout.css', 'assets/css/templates.css', 'assets/css/math.css', 'assets/css/learning.css',
  'assets/css/preferences.css', 'assets/css/visibility.css',
  'assets/fonts/outfit-latin-600-normal.woff2', 'assets/fonts/outfit-latin-700-normal.woff2',
  'assets/fonts/plus-jakarta-sans-latin-400-normal.woff2', 'assets/fonts/plus-jakarta-sans-latin-400-italic.woff2',
  'assets/fonts/plus-jakarta-sans-latin-600-normal.woff2', 'assets/fonts/plus-jakarta-sans-latin-700-normal.woff2',
  'assets/icons/sprite.svg', 'assets/icons/app/icon-192.png', 'assets/icons/app/icon-512.png',
  'assets/icons/app/apple-touch-icon.png', 'assets/icons/app/favicon.svg', 'assets/icons/app/favicon-32.png',
  'assets/js/core/content-gate.js'
];
const STABLE = /\/assets\/(vendor|fonts|icons)\//;

self.addEventListener('install', event => {
  event.waitUntil(caches.open(CACHE).then(cache => cache.addAll(PRECACHE)).then(() => self.skipWaiting()));
});

self.addEventListener('activate', event => {
  event.waitUntil(caches.keys()
    .then(keys => Promise.all(keys.filter(key => key.startsWith('mates-ccss-ii-') && key !== CACHE).map(key => caches.delete(key))))
    .then(() => self.clients.claim()));
});

const storable = response => response && response.status === 200 && response.type === 'basic';

async function remember(request, response) {
  if (!storable(response)) return;
  try { await (await caches.open(CACHE)).put(request, response); } catch { /* Cuota llena: se sigue sin guardar. */ }
}

async function cacheFirst(request) {
  const cached = await caches.match(request);
  if (cached) return cached;
  const response = await fetch(request);
  await remember(request, response.clone());
  return response;
}

async function networkFirst(request, navigation) {
  try {
    const response = await fetch(request);
    await remember(request, response.clone());
    return response;
  } catch (error) {
    // Las páginas con ?tema=… o #… comparten copia con la página sin parámetros.
    const cached = await caches.match(request) || (navigation && await caches.match(request, { ignoreSearch: true }));
    if (cached) return cached;
    if (navigation) return offlinePage();
    throw error;
  }
}

/** offline.html se sirve en la URL pedida (p. ej. libro/temas/…): <base> hace que sus rutas relativas apunten a la raíz. */
async function offlinePage() {
  const cached = await caches.match('offline.html');
  if (!cached) return Response.error();
  const html = (await cached.text()).replace('<head>', `<head>\n  <base href="${self.registration.scope}">`);
  return new Response(html, { headers: { 'Content-Type': 'text/html; charset=utf-8' } });
}

self.addEventListener('fetch', event => {
  const { request } = event;
  if (request.method !== 'GET' || request.headers.has('range')) return;
  const url = new URL(request.url);
  if (url.origin !== self.location.origin || !url.href.startsWith(self.registration.scope)) return;
  const navigation = request.mode === 'navigate';
  event.respondWith(STABLE.test(url.pathname) ? cacheFirst(request) : networkFirst(request, navigation));
});

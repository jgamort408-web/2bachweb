// Runs before the body is painted. With JavaScript disabled, the source HTML remains readable.
document.documentElement.classList.add('content-pending');
// Tema elegido a mano (assets/js/core/theme.js): se aplica antes de pintar para evitar un destello.
try {
  const theme = localStorage.getItem('math-ccss:theme:v1');
  if (theme === 'light' || theme === 'dark') document.documentElement.dataset.theme = theme;
} catch { /* Sin almacenamiento: se sigue la preferencia del sistema. */ }
setTimeout(() => {
  if (!document.documentElement.classList.contains('content-pending')) return;
  const main = document.querySelector('main');
  if (!main) return;
  for (const child of main.children) child.hidden = true;
  const message = document.createElement('p'), retry = document.createElement('button');
  message.textContent = 'No se ha podido abrir el contenido. Vuelve a cargar la página.';
  message.setAttribute('role', 'status');
  retry.type = 'button'; retry.textContent = 'Volver a cargar';
  retry.addEventListener('click', () => location.reload());
  main.append(message, retry);
  document.documentElement.classList.remove('content-pending');
  document.documentElement.dataset.contentState = 'error';
}, 25000);

// Aplicación instalable (Q01): manifiesto, iconos y color de la barra en todas las páginas sin tocar cada HTML, y
// registro del service worker de la raíz. La raíz se deduce de la ruta de este script (sirve en la subcarpeta de Pages).
(() => {
  const script = document.currentScript;
  if (!script || !script.src) return;
  const root = new URL('../../../', script.src);
  const head = document.head || document.documentElement;
  const add = (tag, attributes, selector) => {
    if (selector && document.querySelector(selector)) return;
    const element = document.createElement(tag);
    for (const [key, value] of Object.entries(attributes)) element.setAttribute(key, value);
    head.append(element);
  };
  add('link', { rel: 'manifest', href: new URL('manifest.webmanifest', root).href }, 'link[rel="manifest"]');
  add('meta', { name: 'theme-color', content: '#172033' }, 'meta[name="theme-color"]');
  add('link', { rel: 'icon', type: 'image/svg+xml', href: new URL('assets/icons/app/favicon.svg', root).href }, 'link[rel="icon"]');
  add('link', { rel: 'icon', type: 'image/png', sizes: '32x32', href: new URL('assets/icons/app/favicon-32.png', root).href }, 'link[rel="icon"][sizes]');
  add('link', { rel: 'apple-touch-icon', href: new URL('assets/icons/app/apple-touch-icon.png', root).href }, 'link[rel="apple-touch-icon"]');
  add('meta', { name: 'mobile-web-app-capable', content: 'yes' }, 'meta[name="mobile-web-app-capable"]');
  add('meta', { name: 'apple-mobile-web-app-capable', content: 'yes' }, 'meta[name="apple-mobile-web-app-capable"]');
  add('meta', { name: 'apple-mobile-web-app-title', content: 'Mates CCSS II' }, 'meta[name="apple-mobile-web-app-title"]');
  add('meta', { name: 'apple-mobile-web-app-status-bar-style', content: 'default' }, 'meta[name="apple-mobile-web-app-status-bar-style"]');
  // El aviso de instalación de Chrome y Edge llega una sola vez: se guarda para el botón «Instalar» (core/install.js).
  addEventListener('beforeinstallprompt', event => {
    window.mcInstallPrompt = event;
    dispatchEvent(new CustomEvent('mc:installable'));
  });
  addEventListener('appinstalled', () => { window.mcInstallPrompt = null; dispatchEvent(new CustomEvent('mc:installable')); });
  // Playwright marca navigator.webdriver: las pruebas que interceptan peticiones no deben pasar por el service worker;
  // la prueba de la aplicación instalable lo activa con sessionStorage «mc:sw» = «on».
  let forced = false;
  try { forced = sessionStorage.getItem('mc:sw') === 'on'; } catch { /* Sin almacenamiento. */ }
  if (!('serviceWorker' in navigator) || !window.isSecureContext || (navigator.webdriver && !forced)) return;
  addEventListener('load', () => {
    navigator.serviceWorker.register(new URL('sw.js', root).href, { scope: root.href }).catch(error => console.warn('[Aplicación sin conexión]', error));
  });
})();

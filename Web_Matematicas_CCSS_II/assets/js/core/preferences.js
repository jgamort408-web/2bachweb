import { projectRoot } from './paths.js';

// Solo preferencias de presentación. Nunca respuestas, puntuaciones ni identidades.
export const preferenceKey = 'math-ccss:appearance:v1:' + projectRoot.pathname;
const defaults = Object.freeze({ textSize: 100, contrast: false, highlight: false });
const sizes = [100, 125, 150, 175, 200];
export function normalizePreferences(value) {
  return {
    textSize: sizes.includes(value?.textSize) ? value.textSize : 100,
    contrast: value?.contrast === true,
    highlight: value?.highlight === true,
  };
}
function readPreferences() {
  try { return normalizePreferences(JSON.parse(localStorage.getItem(preferenceKey))); }
  catch { return { ...defaults }; }
}
let current = readPreferences();
let initialized = false;
export const getPreferences = () => ({ ...current });

export function setPreferences(value, { persist = true } = {}) {
  current = normalizePreferences(value);
  const root = document.documentElement;
  root.style.setProperty('--reading-scale', current.textSize + '%');
  root.dataset.readingPreferences = '';
  root.dataset.largeText = String(current.textSize > 100);
  root.dataset.contrast = String(current.contrast);
  root.dataset.highlight = String(current.highlight);
  let saved = true;
  if (persist) {
    try { localStorage.setItem(preferenceKey, JSON.stringify(current)); }
    catch { saved = false; }
  }
  window.dispatchEvent(new CustomEvent('reading:changed', { detail: getPreferences() }));
  return saved;
}

export function initializePreferences() {
  if (initialized) return;
  initialized = true;
  setPreferences(current, { persist: false });
  window.addEventListener('storage', (event) => {
    if (event.key !== preferenceKey && event.key !== null) return;
    setPreferences(readPreferences(), { persist: false });
  });
  // Al restaurar una página, otra pestaña puede haber cambiado los ajustes.
  window.addEventListener('pageshow', (event) => {
    if (event.persisted) setPreferences(readPreferences(), { persist: false });
  });
}

/**
 * El mismo control se usa en la cabecera y al abrir un widget por separado.
 * Con { tray }, el botón es «Aa» (prototipo de lección aprobado en D04) y el panel se muestra en esa franja de la
 * cabecera, debajo de la barra, ocupando su sitio: nunca tapa el contenido, ni con el texto al 200 %.
 */
export function mountPreferenceControls(container, { tray = null } = {}) {
  if (!container || container.querySelector('[data-reading-controls]')) return;
  initializePreferences();
  const panel = document.createElement('details');
  panel.className = 'reading-controls';
  panel.dataset.readingControls = '';
  const options = '<div class="reading-options"><label class="reading-field"><span>Tamaño del texto</span> <select data-text-size>' +
    sizes.map(size => '<option value="' + size + '">' + size + ' %</option>').join('') +
    '</select></label><label class="reading-switch"><input type="checkbox" data-contrast-control> <span>Aumentar contraste</span></label>' +
    '<label class="reading-switch"><input type="checkbox" data-highlight-control> <span>Resaltar ideas importantes</span></label>' +
    '<button type="button" data-reset-reading>Restablecer lectura</button></div>' +
    '<p class="reading-note">Se recuerdan solo estos ajustes en este navegador. No se guardan respuestas ni resultados.</p>' +
    '<p role="status" data-reading-status></p>';
  let body = panel;
  if (tray) {
    panel.innerHTML = '<summary title="Opciones de lectura" aria-controls="opciones-de-lectura"><span class="reading-aa" aria-hidden="true">Aa</span><span class="mc-visually-hidden">Opciones de lectura</span></summary>';
    body = document.createElement('section');
    body.className = 'reading-panel';
    body.id = 'opciones-de-lectura';
    body.setAttribute('aria-label', 'Opciones de lectura');
    body.innerHTML = '<div class="reading-panel__head"><p class="reading-panel__title">Opciones de lectura</p>' +
      '<button type="button" class="mc-btn mc-btn--icon reading-panel__close" data-reading-close aria-label="Cerrar opciones de lectura">×</button></div>' + options;
    tray.replaceChildren(body);
    const show = () => { tray.hidden = !panel.open; };
    panel.addEventListener('toggle', show);
    body.querySelector('[data-reading-close]').addEventListener('click', () => { panel.open = false; panel.querySelector('summary').focus(); });
    show();
  } else {
    panel.innerHTML = '<summary>Opciones de lectura</summary>' + options;
  }
  const size = body.querySelector('[data-text-size]');
  const contrast = body.querySelector('[data-contrast-control]');
  const highlight = body.querySelector('[data-highlight-control]');
  const sync = () => {
    size.value = String(current.textSize);
    contrast.checked = current.contrast;
    highlight.checked = current.highlight;
  };
  const change = (next) => {
    const saved = setPreferences(next);
    body.querySelector('[data-reading-status]').textContent = saved
      ? 'Opciones de lectura actualizadas.'
      : 'Ajustes aplicados. Este navegador no permite recordarlos al cambiar de página.';
  };
  body.addEventListener('change', () => change({ textSize: Number(size.value), contrast: contrast.checked, highlight: highlight.checked }));
  body.querySelector('[data-reset-reading]').addEventListener('click', () => change(defaults));
  window.addEventListener('reading:changed', sync);
  sync();
  container.append(panel);
  return () => { window.removeEventListener('reading:changed', sync); panel.remove(); if (tray) { tray.replaceChildren(); tray.hidden = true; } };
}

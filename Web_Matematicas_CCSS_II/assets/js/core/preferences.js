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

/** El mismo control se usa en la cabecera y al abrir un widget por separado. */
export function mountPreferenceControls(container) {
  if (!container || container.querySelector('[data-reading-controls]')) return;
  initializePreferences();
  const panel = document.createElement('details');
  panel.className = 'reading-controls';
  panel.dataset.readingControls = '';
  panel.innerHTML = '<summary>Opciones de lectura</summary>' +
    '<div class="reading-options"><label>Tamaño del texto <select data-text-size>' +
    sizes.map(size => '<option value="' + size + '">' + size + ' %</option>').join('') +
    '</select></label><label><input type="checkbox" data-contrast-control> Aumentar contraste</label>' +
    '<label><input type="checkbox" data-highlight-control> Resaltar ideas importantes</label>' +
    '<button type="button" data-reset-reading>Restablecer lectura</button></div>' +
    '<p>Se recuerdan solo estos ajustes en este navegador. No se guardan respuestas ni resultados.</p>' +
    '<p role="status" data-reading-status></p>';
  const size = panel.querySelector('[data-text-size]');
  const contrast = panel.querySelector('[data-contrast-control]');
  const highlight = panel.querySelector('[data-highlight-control]');
  const sync = () => {
    size.value = String(current.textSize);
    contrast.checked = current.contrast;
    highlight.checked = current.highlight;
  };
  const change = (next) => {
    const saved = setPreferences(next);
    panel.querySelector('[data-reading-status]').textContent = saved
      ? 'Opciones de lectura actualizadas.'
      : 'Ajustes aplicados. Este navegador no permite recordarlos al cambiar de página.';
  };
  panel.addEventListener('change', () => change({ textSize: Number(size.value), contrast: contrast.checked, highlight: highlight.checked }));
  panel.querySelector('[data-reset-reading]').addEventListener('click', () => change(defaults));
  window.addEventListener('reading:changed', sync);
  sync();
  container.append(panel);
  return () => { window.removeEventListener('reading:changed', sync); panel.remove(); };
}

// Modo claro u oscuro (ronda 1: automático según el sistema y con selector manual).
// Solo actúa en páginas migradas al nuevo diseño (<html data-skin="mc">); content-gate.js aplica
// la elección guardada antes de pintar. Es una preferencia de presentación, no un dato personal.
export const themeKey = 'math-ccss:theme:v1';

const root = document.documentElement;
const systemDark = () => window.matchMedia?.('(prefers-color-scheme: dark)').matches === true;

export function effectiveTheme() {
  return root.dataset.theme === 'dark' || root.dataset.theme === 'light' ? root.dataset.theme : systemDark() ? 'dark' : 'light';
}

export function setTheme(theme) {
  if (theme === 'dark' || theme === 'light') root.dataset.theme = theme;
  else delete root.dataset.theme;
  try {
    if (root.dataset.theme) localStorage.setItem(themeKey, root.dataset.theme);
    else localStorage.removeItem(themeKey);
  } catch { /* Se aplica igualmente en esta página. */ }
  window.dispatchEvent(new CustomEvent('theme:changed', { detail: effectiveTheme() }));
}

/** Muestra y enlaza el botón [data-theme-toggle] de la cabecera. */
export function mountThemeToggle(button) {
  if (!button || root.dataset.skin !== 'mc') return;
  const label = () => {
    const dark = effectiveTheme() === 'dark';
    button.setAttribute('aria-label', dark ? 'Cambiar a modo claro' : 'Cambiar a modo oscuro');
    button.setAttribute('aria-pressed', String(dark));
  };
  button.hidden = false;
  label();
  button.addEventListener('click', () => { setTheme(effectiveTheme() === 'dark' ? 'light' : 'dark'); label(); });
  window.matchMedia?.('(prefers-color-scheme: dark)').addEventListener?.('change', label);
  window.addEventListener('storage', event => {
    if (event.key !== themeKey) return;
    if (event.newValue === 'light' || event.newValue === 'dark') root.dataset.theme = event.newValue;
    else delete root.dataset.theme;
    label();
  });
}

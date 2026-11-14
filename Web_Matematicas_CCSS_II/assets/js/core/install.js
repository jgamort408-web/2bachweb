// Botón «Instalar la aplicación» (Q01). Chrome y Edge avisan con beforeinstallprompt, que content-gate.js guarda en
// window.mcInstallPrompt; Safari en iPhone y iPad no tiene ese aviso y se instala con Compartir → «Añadir a pantalla
// de inicio», como explica instalar.html. Los botones [data-install-button] solo se muestran cuando el aviso existe.
export const isStandalone = () => matchMedia('(display-mode: standalone)').matches || navigator.standalone === true;
export const isAppleMobile = () => /iPhone|iPad|iPod/.test(navigator.userAgent) || (navigator.platform === 'MacIntel' && navigator.maxTouchPoints > 1);

function describe() {
  if (isStandalone()) return { state: 'installed', text: 'Estás usando la aplicación instalada.' };
  if (window.mcInstallPrompt) return { state: 'available', text: 'Este navegador puede instalar la aplicación con un toque.' };
  if (isAppleMobile()) return { state: 'ios', text: 'En iPhone y iPad: pulsa Compartir y elige «Añadir a pantalla de inicio».' };
  return { state: 'manual', text: 'Si no ves el botón, usa el menú del navegador: «Instalar aplicación» o «Añadir a pantalla de inicio».' };
}

export function mountInstallControls(root = document) {
  const update = () => {
    const { state, text } = describe();
    for (const button of root.querySelectorAll('[data-install-button]')) button.hidden = state !== 'available';
    for (const status of root.querySelectorAll('[data-install-state]')) {
      status.dataset.installState = state;
      status.textContent = text;
    }
  };
  for (const button of root.querySelectorAll('[data-install-button]')) {
    if (button.dataset.installReady) continue;
    button.dataset.installReady = 'true';
    button.addEventListener('click', async () => {
      const prompt = window.mcInstallPrompt;
      if (!prompt) return update();
      prompt.prompt();
      try { await prompt.userChoice; } catch { /* El navegador cerró el aviso. */ }
      window.mcInstallPrompt = null; // Cada aviso solo se puede usar una vez.
      update();
    });
  }
  addEventListener('mc:installable', update);
  update();
}

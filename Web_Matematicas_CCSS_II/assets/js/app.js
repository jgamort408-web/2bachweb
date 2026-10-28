import { projectUrl } from './core/paths.js';
import { loadComponent } from './shared/components.js';
import { renderNavigation } from './shared/navigation.js';
import { observeMath } from './core/math.js';
import { initializePreferences, mountPreferenceControls } from './core/preferences.js';
import { mountThemeToggle } from './core/theme.js';
import { getContentContext, pageRecords } from './content/runtime.js';
import { observeDocumentAvailability, showPageAvailability } from './content/document.js';

async function loadJson(path) {
  const response = await fetch(projectUrl(path));
  if (!response.ok) throw new Error(`No se pudo cargar ${path}: ${response.status}`);
  return response.json();
}

async function initializeLayout() {
  const contentPromise = getContentContext().then(context => {
    const activeGame = () => document.querySelector('iframe')?.contentWindow
      && document.documentElement.dataset.gameSession === 'active';
    observeDocumentAvailability(context, { activeGame });
    return context;
  }).catch(error => {
    showPageAvailability(null, { failed: true, initial: true });
    throw error;
  });
  const tasks = await Promise.allSettled([
    loadComponent('site-header', 'components/header.html'),
    loadComponent('site-footer', 'components/footer.html'),
    contentPromise,
    loadJson('config/navigation.json'),
  ]);

  for (const task of tasks) {
    if (task.status === 'rejected') console.error('[Estructura del sitio]', task.reason);
  }

  const [header, footer, content, navigation] = tasks;
  if (content.status === 'fulfilled') {
    const context = content.value;
    if (navigation.status === 'fulfilled') {
      let previousConfig;
      const render = () => {
        const config = JSON.stringify(context.snapshot.config);
        if (config === previousConfig) return;
        previousConfig = config;
        renderNavigation(pageRecords(context), navigation.value, document.body.dataset.pageId, context.model);
      };
      render(); context.subscribe(render);
    }
  } else {
    showPageAvailability(null, { failed: true, initial: true });
  }

  // El título de cada HTML permanece accesible incluso si falla un fragmento.
  for (const [result, id] of [[header, 'site-header'], [footer, 'site-footer']]) {
    if (result.status === 'rejected') {
      const container = document.getElementById(id);
      const link = document.createElement('a');
      link.href = projectUrl('index.html');
      link.textContent = 'Inicio';
      container?.replaceChildren(link);
    }
  }
  mountPreferenceControls(document.querySelector('[data-reading-options]') || document.getElementById('site-header'));
  mountThemeToggle(document.querySelector('[data-theme-toggle]'));
}

initializePreferences();
initializeLayout().catch((error) => {
  showPageAvailability(null, { failed: true, initial: true });
  console.warn('[Estructura del sitio]', error.message);
});
observeMath();

// Página presentacion.html de cada tema: motor de diapositivas y exploradores que la presentación declara en
// data-explorers. Cada explorador es el mismo módulo (y modelo probado) que usa la lección correspondiente.
import { initializeSlides } from './slides.js';

const explorers = {
  primitive: () => import('./primitive-explorer.js').then(m => m.initializePrimitiveExplorer()),
  riemann: () => import('./riemann-explorer.js').then(m => m.initializeRiemannExplorer()),
  definite: () => import('./definite-explorer.js').then(m => m.initializeDefiniteExplorer()),
  fundamental: () => import('./fundamental-explorer.js').then(m => m.initializeFundamentalExplorer()),
  barrow: () => import('./barrow-explorer.js').then(m => m.initializeBarrowExplorer()),
  area: () => import('./area-explorer.js').then(m => m.initializeAreaExplorer())
};

const root = document.querySelector('[data-slides]');
initializeSlides(root);
for (const name of (root?.dataset.explorers ?? '').split(/\s+/).filter(Boolean)) {
  if (!Object.hasOwn(explorers, name)) { console.warn('[Presentación] Explorador desconocido:', name); continue; }
  explorers[name]().catch(error => console.warn('[Presentación]', name, error));
}

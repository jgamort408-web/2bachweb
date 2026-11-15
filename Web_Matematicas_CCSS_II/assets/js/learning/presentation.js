// Página presentacion.html de cada tema: motor de diapositivas y exploradores que la presentación declara en
// data-explorers. Cada explorador es el mismo módulo (y modelo probado) que usa la lección correspondiente, con
// el mismo marcado. [módulo, función que lo inicia]; sin función, el módulo se inicia solo al importarse.
import { initializeSlides } from './slides.js';

const explorers = {
  // Tema 1
  continuity: ['./continuity-explorer.js', 'initializeContinuityExplorer'],
  derivative: ['./derivative-explorer.js', 'initializeDerivativeExplorer'],
  tangent: ['./tangent-explorer.js', 'initializeTangentExplorer'],
  // Tema 2
  rational: ['./rational-explorer.js', 'initializeRationalExplorer'],
  exponential: ['./exponential-explorer.js', 'initializeExponentialExplorer'],
  piecewise: ['./piecewise-explorer.js', 'initializePiecewiseExplorer'],
  translation: ['./translation-explorer.js', 'initializeTranslationExplorer'],
  optimization: ['./optimization-explorer.js', 'initializeOptimizationExplorer'],
  // Tema 3
  primitive: ['./primitive-explorer.js', 'initializePrimitiveExplorer'],
  riemann: ['./riemann-explorer.js', 'initializeRiemannExplorer'],
  definite: ['./definite-explorer.js', 'initializeDefiniteExplorer'],
  fundamental: ['./fundamental-explorer.js', 'initializeFundamentalExplorer'],
  barrow: ['./barrow-explorer.js', 'initializeBarrowExplorer'],
  area: ['./area-explorer.js', 'initializeAreaExplorer'],
  // Tema 4
  'matrix-product': ['./matrix-product-explorer.js', 'initializeMatrixProductExplorer'],
  determinants: ['./determinants-explorer.js', 'initializeDeterminantsExplorer'],
  'matrix-inverse': ['./matrix-inverse-explorer.js', 'initializeMatrixInverseExplorer'],
  'matrix-rank': ['./matrix-rank-explorer.js', 'initializeMatrixRankExplorer'],
  graph: ['./graph-explorer.js', 'initializeGraphExplorer'],
  // Tema 5
  'system-solutions': ['./system-solutions-explorer.js', 'initializeSystemSolutionsExplorer'],
  rouche: ['./rouche-frobenius-explorer.js', 'initializeRoucheExplorer'],
  gauss: ['./gauss-explorer.js', 'initializeGaussExplorer'],
  cramer: ['./cramer-explorer.js', 'initializeCramerExplorer'],
  'parameter-systems': ['./parameter-systems-explorer.js', 'initializeParameterSystemsExplorer'],
  // Temas 8 y 9 (se inician al importarse)
  normal: ['./normal-explorer.js'],
  'binomial-normal': ['./binomial-normal-explorer.js'],
  'confidence-interval': ['./confidence-interval-lab.js'],
  'sample-size': ['./sample-size-planner.js']
};

const root = document.querySelector('[data-slides]');
initializeSlides(root);
for (const name of (root?.dataset.explorers ?? '').split(/\s+/).filter(Boolean)) {
  if (!Object.hasOwn(explorers, name)) { console.warn('[Presentación] Explorador desconocido:', name); continue; }
  const [module, start] = explorers[name];
  import(module).then(loaded => start && loaded[start]()).catch(error => console.warn('[Presentación]', name, error));
}

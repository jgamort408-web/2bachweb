import {initializeParameterSystemsExplorer} from './parameter-systems-explorer.js';
import {initializeHomogeneousExplorer} from './homogeneous-systems-explorer.js';
import {initializeCramerExplorer} from './cramer-explorer.js';
import {initializeGaussExplorer} from './gauss-explorer.js';
import { initializeInverseSystemsExplorer } from './inverse-systems-explorer.js';
import { initializeRoucheExplorer } from './rouche-frobenius-explorer.js';
import { initializeEquivalentSystemsExplorer } from './equivalent-systems-explorer.js';
import { initializeSystemNotationExplorer } from './system-notation-explorer.js';
import { initializeSystemClassificationPractice } from './system-classification-practice.js';
import { initializeSystemSolutionsExplorer } from './system-solutions-explorer.js';
import { initializeLinearSystemsExplorer } from './linear-systems-explorer.js';
import { initializeGraphExplorer } from './graph-explorer.js';
import { initializeMatrixEquationsExplorer } from './matrix-equations-explorer.js';
import { initializeMatrixRankExplorer } from './matrix-rank-explorer.js';
import { initializeMatrixInverseExplorer } from './matrix-inverse-explorer.js';
import { initializeDeterminantExpansionExplorer } from './determinant-expansion-explorer.js';
import { initializeDeterminantPropertiesExplorer } from './determinant-properties-explorer.js';
import { initializeDeterminantsExplorer } from './determinants-explorer.js';
import { initializeMatrixSymmetryExplorer } from './matrix-symmetry-explorer.js';
import { initializeMatrixPowerExplorer } from './matrix-power-explorer.js';
import { initializeMatrixProductExplorer } from './matrix-product-explorer.js';
import { initializeMatrixOperationsExplorer } from './matrix-operations-explorer.js';
import { initializeMatrixBasicsExplorer } from './matrix-basics-explorer.js';
import { initializeAreaExplorer } from './area-explorer.js';
import { initializeBarrowExplorer } from './barrow-explorer.js';
import { initializeFundamentalExplorer } from './fundamental-explorer.js';
import { initializeDefiniteExplorer } from './definite-explorer.js';
import { initializeIntegrationMethodsPractice } from './integration-methods-practice.js';
import { initializeNearImmediatePractice } from './near-immediate-practice.js';
import { initializeImmediatePractice } from './immediate-practice.js';
import { initializePrimitiveExplorer } from './primitive-explorer.js';
import { questionsForScope, cardsForScope } from '../../../content/activities/catalog.js';
import { mountQuiz } from './quiz.js';
import { mountFlashcards } from './flashcards.js';
import { getContentContext, canUseCurrentPage, visibleActivities } from '../content/runtime.js';
import { initializeInfinityExplorers } from './infinity-explorers.js';
import { initializeRationalizationExplorer } from './rationalization-explorer.js';
import { initializeDerivativeExplorer } from './derivative-explorer.js';
import { initializeTangentExplorer } from './tangent-explorer.js';
import { initializeContinuityExplorer } from './continuity-explorer.js';
import { initializeFunctionStudyExplorer } from './function-study-explorer.js';
import { initializePolynomialPractice } from './polynomial-practice.js';
import { initializeRationalExplorer } from './rational-explorer.js';

import { initializeExponentialExplorer } from './exponential-explorer.js';

import { initializeLogarithmicExplorer } from './logarithmic-explorer.js';

import { initializePiecewiseExplorer } from './piecewise-explorer.js';

import { initializeTranslationExplorer } from './translation-explorer.js';

import { initializeScalingExplorer } from './scaling-explorer.js';

import { initializeOptimizationExplorer } from './optimization-explorer.js';

// Solo los índices globales usan el parámetro; una lección conserva su banco.
async function initializeLesson() {
const context = await getContentContext();
if (!canUseCurrentPage(context)) return;
const requestedTopic = new URLSearchParams(location.search).get('tema');
const selectedScope = ['t01', 't02', 't03', 't04', 't05', ...(document.querySelector('[data-quiz]') ? ['t07', 't09'] : []), ...(document.querySelector('[data-flashcards]') ? ['t06', 't07', 't08', 't09', 'bivariate'] : [])].includes(requestedTopic) ? requestedTopic : 'all-course';
const scopeLabels = { bivariate: 'Apoyo: estadística bidimensional · 20 tarjetas originales revisadas', t09: 'Tema 9: inferencia · 30 tarjetas originales revisadas', t08: 'Tema 8: distribuciones · 19 tarjetas originales revisadas', t07: 'Tema 7: probabilidad · 16 tarjetas originales revisadas', t06: 'Tema 6: programación lineal · 19 tarjetas originales revisadas', t05: 'Tema 5: sistemas (lecciones 5.1–5.11)', t04: 'Tema 4: matrices (lecciones 4.1–4.12)', 'all-course': 'Todos los contenidos disponibles', t03: 'Tema 3: integrales (contenido disponible)', t01: 'Tema 1: límites y derivadas', t02: 'Tema 2: representación de funciones (lecciones 2.1–2.9)' };
if (document.querySelector('[data-quiz]')) scopeLabels.t09 = 'Tema 9: inferencia · 20 preguntas originales revisadas';
if (document.querySelector('[data-quiz]')) scopeLabels.t07 = 'Tema 7: probabilidad · 60 preguntas base (9 originales adaptadas y 51 ampliaciones)';
for (const label of document.querySelectorAll('[data-scope-label]')) label.textContent = scopeLabels[selectedScope];
function updateAvailableCounts() {
  const topicAllowed = selectedScope === 'all-course' || context.model.isVisible('page:' + selectedScope);
  for (const label of document.querySelectorAll('[data-scope-label]')) {
    label.textContent = topicAllowed ? scopeLabels[selectedScope] : 'Este tema todavía no está disponible.';
  }
  for (const count of document.querySelectorAll('[data-visible-question-count]')) {
    count.textContent = visibleActivities(context, 'question', questionsForScope(selectedScope)).length + ' preguntas disponibles en esta selección.';
  }
  for (const count of document.querySelectorAll('[data-visible-card-count]')) {
    count.textContent = visibleActivities(context, 'card', cardsForScope(selectedScope)).length + ' tarjetas disponibles en esta selección.';
  }
}
updateAvailableCounts(); context.subscribe(updateAvailableCounts);
for (const link of document.querySelectorAll('[data-study-topics] a')) {
  const topic = new URL(link.href).searchParams.get('tema') || 'all-course';
  if (topic === selectedScope) link.setAttribute('aria-current', 'page');
}

for (const root of document.querySelectorAll('[data-quiz]')) {
  mountQuiz(root, questionsForScope(root.dataset.quiz === 'all-course' ? selectedScope : root.dataset.quiz));
}
initializeInfinityExplorers();
initializeRationalizationExplorer();
initializeDerivativeExplorer();
initializeTangentExplorer();
initializeContinuityExplorer();
initializeFunctionStudyExplorer();
initializePolynomialPractice();
initializeRationalExplorer();
initializeExponentialExplorer();
initializeLogarithmicExplorer();
initializePiecewiseExplorer();
initializeTranslationExplorer();
initializeScalingExplorer();
initializeOptimizationExplorer();
initializePrimitiveExplorer();
initializeImmediatePractice();
initializeNearImmediatePractice();
initializeIntegrationMethodsPractice();
initializeDefiniteExplorer();
initializeFundamentalExplorer();
initializeBarrowExplorer();
initializeAreaExplorer();
initializeMatrixBasicsExplorer();
initializeMatrixOperationsExplorer();
initializeMatrixProductExplorer();
initializeMatrixPowerExplorer();
initializeMatrixSymmetryExplorer();
initializeDeterminantsExplorer();
initializeDeterminantPropertiesExplorer();
initializeDeterminantExpansionExplorer();
initializeMatrixInverseExplorer();
initializeMatrixRankExplorer();
initializeMatrixEquationsExplorer();
initializeGraphExplorer();
initializeLinearSystemsExplorer();
initializeSystemSolutionsExplorer();
initializeSystemClassificationPractice();
initializeSystemNotationExplorer();
initializeEquivalentSystemsExplorer();
initializeRoucheExplorer();
initializeInverseSystemsExplorer();
initializeGaussExplorer();
initializeCramerExplorer();
initializeHomogeneousExplorer();
initializeParameterSystemsExplorer();
const explorer = document.querySelector('[data-limit-explorer]');
if (explorer) {
  const control = explorer.querySelector('input');
  const format = (value) => value.toLocaleString('es-ES', { maximumFractionDigits: 3 });
  const update = () => {
    const delta = 10 ** -Number(control.value), left = 2 - delta, right = 2 + delta;
    for (const [selector, value] of [['left-x', left], ['right-x', right], ['left-y', left + 2], ['right-y', right + 2]]) {
      explorer.querySelector('[data-' + selector + ']').textContent = format(value);
    }
    for (const [side, x] of [['left', left], ['right', right]]) {
      const point = explorer.querySelector('[data-' + side + '-point]');
      point.setAttribute('cx', 50 + 100 * x); point.setAttribute('cy', 280 - 26 * (x + 2));
    }
    explorer.querySelector('[data-explorer-summary]').textContent = 'Distancia a 2: ' + format(delta) + '. Los valores son ' + format(left + 2) + ' y ' + format(right + 2) + '; ambos se acercan a 4. El valor h(2) sigue siendo 9.';
  };
  control.addEventListener('input', update); update();
}
for (const deck of document.querySelectorAll('[data-flashcards]')) {
  const scope = deck.dataset.flashcards || selectedScope;
  mountFlashcards(deck, cardsForScope(scope), { categories: ['t06', 't07', 't08', 't09', 'bivariate'].includes(scope) });
}
}
initializeLesson().catch(() => {});

import { bivariateCards } from './bivariate-cards.js';
import { distributionCards } from './distribution-cards.js';
import { inferenceCards } from './inference-cards.js';
import { probabilityCards } from './probability-cards.js';
import { probabilityQuestions } from './probability-test.js';
import { inferenceQuestions } from './inference-test.js';
import { linearProgrammingCards } from './linear-programming-cards.js';
import {systemReviewIds} from './review-t05.js';
import {parameterSystemQuestions,parameterSystemCards} from './parameter-systems.js';
import {homogeneousQuestions,homogeneousCards} from './homogeneous-systems.js';
import {cramerQuestions,cramerCards} from './cramer.js';
import {gaussQuestions,gaussCards} from './gauss.js';
import { inverseSystemQuestions, inverseSystemCards } from './inverse-systems.js';
import { roucheQuestions, roucheCards } from './rouche-frobenius.js';
import { equivalenceQuestions, equivalenceCards } from './equivalent-systems.js';
import { notationQuestions, notationCards } from './system-notation.js';
import { classificationQuestions, classificationCards } from './system-classification.js';
import { solutionQuestions, solutionCards } from './system-solutions.js';
import { systemQuestions, systemCards } from './linear-systems.js';
import { matrixReviewIds } from './review-t04.js';
import { graphQuestions, graphCards } from './graphs.js';
import { equationQuestions, equationCards } from './matrix-equations.js';
import { rankQuestions, rankCards } from './matrix-rank.js';
import { inverseQuestions, inverseCards } from './matrix-inverse.js';
import { expansionQuestions, expansionCards } from './determinant-expansion.js';
import { determinantPropertyQuestions, determinantPropertyCards } from './determinant-properties.js';
import { determinantQuestions, determinantCards } from './determinants.js';
import { matrixSymmetryQuestions, matrixSymmetryCards } from './matrix-symmetry.js';
import { matrixPowerQuestions, matrixPowerCards } from './matrix-power.js';
import { matrixProductQuestions, matrixProductCards } from './matrix-product.js';
import { matrixOperationQuestions, matrixOperationCards } from './matrix-operations.js';
import { matrixQuestions, matrixCards } from './matrix-basics.js';
import { integralReviewQuestions } from './review-t03.js';
import { areaQuestions, areaCards } from './integral-applications.js';
import { barrowQuestions, barrowCards } from './barrow.js';
import { fundamentalQuestions, fundamentalCards } from './fundamental-calculus.js';
import { definiteQuestions, definiteCards } from './definite-integrals.js';
import { integrationMethodQuestions, integrationMethodCards } from './integration-methods.js';
import { nearImmediateQuestions, nearImmediateCards } from './near-immediate-integrals.js';
import { immediateQuestions, immediateCards } from './immediate-integrals.js';
import { primitiveQuestions, primitiveCards } from './antiderivatives.js';
import { representationReviewQuestions } from './review-t02.js';
import { limitQuestions, decks } from './limits.js';
import { infinityQuestions, infinityCards } from './infinity.js';
import { techniqueQuestions, techniqueCards } from './limit-techniques.js';
import { continuityQuestions, continuityCards } from './continuity-derivatives.js';
import { ruleQuestions, ruleCards } from './derivative-rules.js';
import { advancedQuestions, advancedCards } from './chain-hopital.js';
import { reviewQuestions, reviewCards } from './review-t01.js';
import { studyQuestions, studyCards } from './function-study.js';
import { polynomialQuestions, polynomialCards } from './polynomials.js';
import { rationalQuestions, rationalCards } from './rational-functions.js';

import { exponentialQuestions, exponentialCards } from './exponentials.js';

import { logarithmicQuestions, logarithmicCards } from './logarithms.js';

import { piecewiseQuestions, piecewiseCards } from './piecewise.js';

import { translationQuestions, translationCards } from './translations.js';

import { scalingQuestions, scalingCards } from './scaling.js';

import { optimizationQuestions, optimizationCards } from './optimization.js';

export const questions = [...limitQuestions, ...infinityQuestions, ...techniqueQuestions, ...continuityQuestions, ...ruleQuestions, ...advancedQuestions, ...reviewQuestions].map(item => ({ ...item, topicId: 't01' })).concat(studyQuestions, polynomialQuestions, rationalQuestions, exponentialQuestions, logarithmicQuestions, piecewiseQuestions, translationQuestions, scalingQuestions, optimizationQuestions, representationReviewQuestions, primitiveQuestions, immediateQuestions, nearImmediateQuestions, integrationMethodQuestions, definiteQuestions, fundamentalQuestions, barrowQuestions, areaQuestions, integralReviewQuestions, matrixQuestions, matrixOperationQuestions, matrixProductQuestions, matrixPowerQuestions, matrixSymmetryQuestions, determinantQuestions, determinantPropertyQuestions, expansionQuestions, inverseQuestions, rankQuestions, equationQuestions, graphQuestions, systemQuestions, solutionQuestions, classificationQuestions, notationQuestions, equivalenceQuestions, roucheQuestions, inverseSystemQuestions, gaussQuestions, cramerQuestions, homogeneousQuestions, parameterSystemQuestions, probabilityQuestions, inferenceQuestions);
export const flashcards = [...decks, ...infinityCards, ...techniqueCards, ...continuityCards, ...ruleCards, ...advancedCards, ...reviewCards].map(item => ({ ...item, topicId: 't01' })).concat(studyCards, polynomialCards, rationalCards, exponentialCards, logarithmicCards, piecewiseCards, translationCards, scalingCards, optimizationCards, primitiveCards, immediateCards, nearImmediateCards, integrationMethodCards, definiteCards, fundamentalCards, barrowCards, areaCards, matrixCards, matrixOperationCards, matrixProductCards, matrixPowerCards, matrixSymmetryCards, determinantCards, determinantPropertyCards, expansionCards, inverseCards, rankCards, equationCards, graphCards, systemCards, solutionCards, classificationCards, notationCards, equivalenceCards, roucheCards, inverseSystemCards, gaussCards, cramerCards, homogeneousCards, parameterSystemCards, linearProgrammingCards, probabilityCards, bivariateCards, distributionCards, inferenceCards);

export function questionsForScope(scope) {
  if (scope === 'review-t05') return systemReviewIds.map(id => questions.find(q => q.id === id));
  if (scope === 'review-t04') return matrixReviewIds.map(id => questions.find(q => q.id === id));
  if (scope === 'review-t03') return integralReviewQuestions;
  if (scope === 'review-t02') return representationReviewQuestions;
  if (scope === 'review-t01') return reviewQuestions;
  if (scope === 'all-course') return questions;
  if (scope === 'all-limits' || scope === 't01') return questions.filter(item => item.topicId === 't01');
  if (scope === 't05') return questions.filter(item => item.topicId === 't05');
  if (scope === 't09') return questions.filter(item => item.topicId === 't09');
  if (scope === 't07') return questions.filter(item => item.topicId === 't07');
  if (scope === 't04') return questions.filter(item => item.topicId === 't04');
  if (scope === 't03') return questions.filter(item => item.topicId === 't03');
  if (scope === 't02') return questions.filter(item => item.topicId === 't02');
  const lesson = { 'limit-basics': 't01-e01', 'lateral-basics': 't01-e02' }[scope] || scope;
  return questions.filter((item) => item.lessonId === lesson);
}

export function cardsForScope(scope = 'all-course') {
  if (scope === 'all-course') return flashcards;
  return flashcards.filter(item => item.topicId === scope || item.lessonId === scope);
}

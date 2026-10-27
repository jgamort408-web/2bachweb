import { expectedCatalog } from "./helpers/catalog-expectations.mjs";
import { test } from 'node:test';
import assert from 'node:assert/strict';
import { cubicStudy as f } from '../content/models/function-study.js';
import { questionsForScope, cardsForScope, questions, flashcards } from '../content/activities/catalog.js';

test('estudio cúbico: raíces, derivadas, simetría, signos y extremos', () => {
  for (const x of f.roots) assert.ok(Math.abs(f.value(x)) < 1e-12);
  for (let n = -100; n <= 100; n++) {
    const x = n / 20, h = 1e-4;
    const difference = (f.value(x + h) - f.value(x - h)) / (2 * h);
    assert.ok(Math.abs(difference - f.derivative(x)) < 1e-7);
    assert.ok(Math.abs((f.derivative(x + h) - f.derivative(x - h)) / (2 * h) - f.secondDerivative(x)) < 1e-7);
    assert.ok(Math.abs(f.value(-x) + f.value(x)) < 1e-12);
  }
  for (const { x, y, kind } of f.extrema) {
    assert.equal(f.value(x), y); assert.equal(f.derivative(x), 0);
    const neighbours = [x - 0.1, x + 0.1].map(f.value);
    assert.ok(neighbours.every(value => kind === 'maximum' ? value < y : value > y));
  }
  assert.deepEqual([-2, -1, 0, 1, 2].map(f.value), [-2, 2, 0, -2, 2]);
  assert.deepEqual([-2, -1, 1, 2].map(x => Math.sign(f.value(x))), [-1, 1, -1, 1]);
  assert.deepEqual([-2, 0, 2].map(x => Math.sign(f.derivative(x))), [1, -1, 1]);
  assert.ok(f.value(3) > 2 && f.value(-3) < -2, 'Los extremos locales no son absolutos');
});

test('práctica: parábola, hueco y contraejemplo de extremo estacionario', () => {
  const g = x => x * x - 4 * x + 3;
  for (let n = -50; n <= 50; n++) {
    const x = n / 10;
    assert.ok(Math.abs(g(x) - ((x - 2) ** 2 - 1)) < 1e-12);
    assert.ok(g(x) >= -1);
    if (x !== 1) assert.ok(Math.abs((x * x - 1) / (x - 1) - (x + 1)) < 1e-12);
  }
  assert.deepEqual([g(0), g(1), g(2), g(3)], [3, 0, -1, 0]);
  assert.ok((-0.1) ** 3 < 0 && 0.1 ** 3 > 0);
});

test('bancos por tema: separación y conservación del tema 1', () => {
  assert.equal(questions.length,expectedCatalog.questions); assert.equal(flashcards.length,expectedCatalog.cards);
  assert.equal(questionsForScope('all-limits').length, 60);
  assert.equal(questionsForScope('t01').length, 60);
  assert.equal(questionsForScope('t02').length, 60);
  assert.equal(questionsForScope('t02-e01').length, 6);
  assert.equal(cardsForScope('t01').length, 61);
  assert.equal(cardsForScope('t02-e01').length, 6);
  assert.equal(cardsForScope('unknown').length, 0);
  for (const item of questionsForScope('t02')) {
    assert.equal(item.options.length, 4);
    assert.equal(item.options.filter(o => o.id === item.correct).length, 1);
    assert.ok(item.hint && item.explanation && item.source);
  }
});



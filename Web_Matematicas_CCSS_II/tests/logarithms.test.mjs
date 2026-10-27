import { expectedCatalog } from "./helpers/catalog-expectations.mjs";
import test from 'node:test';
import assert from 'node:assert/strict';
import { logarithmicModel, periodsToFactor, reachModel } from '../content/models/logarithms.js';
import { questionsForScope, cardsForScope } from '../content/activities/catalog.js';

test('24 logaritmos: dominio estricto, derivadas numéricas, monotonía y asíntota', () => {
  let count = 0;
  for (const a of [2, 0.5]) for (const c of [1, -1]) for (const h of [-1, 0, 1]) for (const k of [0, -1]) {
    const m = logarithmicModel(a, c, h, k); count++;
    for (const x of [h - 1, h]) { assert.ok(Number.isNaN(m.value(x))); assert.ok(Number.isNaN(m.derivative(x))); }
    assert.equal(m.value(h + 1), k); assert.ok(Math.abs(m.value(m.zero)) < 1e-12);
    assert.equal(m.increasing, m.value(h + 2) > m.value(h + 0.5));
    for (const u of [0.25, 0.5, 1, 2, 4]) {
      const x = h + u, d = 1e-5;
      const derivative = (m.value(x + d) - m.value(x - d)) / (2 * d);
      const second = (m.derivative(x + d) - m.derivative(x - d)) / (2 * d);
      assert.ok(Math.abs(derivative - m.derivative(x)) < 1e-6);
      assert.ok(Math.abs(second - m.secondDerivative(x)) < 1e-6);
    }
    assert.equal(Math.sign(m.value(h + 2 ** -30)), Math.sign(m.atBoundary));
    assert.equal(Math.sign(m.value(h + 2 ** 30)), Math.sign(m.atInfinity));
  }
  assert.equal(count, 24);
  for (const args of [[0, 1, 0, 0], [1, 1, 0, 0], [-2, 1, 0, 0], [2, 0, 0, 0], [2, 1, NaN, 0]]) assert.throws(() => logarithmicModel(...args), RangeError);
});
test('inversa, propiedades con dominio y ecuaciones resueltas', () => {
  for (const a of [0.5, 2, 10, Math.E]) {
    const f = logarithmicModel(a, 1, 0, 0);
    for (const y of [-3, -1, 0, 1, 3]) assert.ok(Math.abs(f.value(a ** y) - y) < 1e-10);
    assert.ok(Math.abs(f.value(12) - f.value(3) - f.value(4)) < 1e-10);
  }
  const g = logarithmicModel(2, 1, 1, -1);
  assert.deepEqual([1.5, 2, 3, 5].map(g.value), [-2, -1, 0, 1]);
  const p = logarithmicModel(Math.E, -1, -1, 0);
  assert.ok(Math.abs(p.value(0)) < 1e-12); assert.equal(p.increasing, false);
  const f = logarithmicModel(2, 1, 0, 0);
  assert.equal(f.value(5 - 1) + f.value(5 - 3), 3);
  assert.ok(Number.isNaN(f.value(-1 - 1)) && Number.isNaN(f.value(-1 - 3)));
  assert.equal(Math.log(3.5 - 2), Math.log(5 - 3.5));
  assert.ok(Math.abs(Math.log((-2) ** 2) - 2 * Math.log(Math.abs(-2))) < 1e-12);
});
test('modelos: umbral anual, escala multiplicativa y rendimiento decreciente', () => {
  const t = periodsToFactor(0.05, 2);
  assert.ok(t > 14 && t < 15); assert.ok(Math.abs(1.05 ** t - 2) < 1e-12);
  assert.ok(1.05 ** Math.floor(t) < 2); assert.ok(1.05 ** Math.ceil(t) >= 2);
  for (const q of [0, 1, 2, 3, 10]) {
    assert.ok(reachModel.value(q + 1) > reachModel.value(q));
    assert.ok(reachModel.derivative(q + 1) < reachModel.derivative(q));
    const gain = reachModel.value(q + 1) - reachModel.value(q);
    const nextGain = reachModel.value(q + 2) - reachModel.value(q + 1);
    assert.ok(gain > nextGain && nextGain > 0);
  }
  assert.equal(reachModel.value(1).toFixed(2), '69.31'); assert.equal(reachModel.value(3).toFixed(2), '138.63');
  assert.ok(Number.isNaN(reachModel.value(-0.5)));
  for (const n of [0.2, 1, 10, 100]) assert.ok(Math.abs(Math.log10(10 * n / 2) - Math.log10(n / 2) - 1) < 1e-12);
  assert.throws(() => periodsToFactor(0, 2), RangeError);
});
test('banco logarítmico y separación de temas: 318 preguntas y 301 tarjetas', () => {
  assert.equal(questionsForScope('t02-e05').length, 6); assert.equal(cardsForScope('t02-e05').length, 6);
  assert.equal(questionsForScope('t02').length, 60); assert.equal(cardsForScope('t02').length, 54);
  assert.equal(questionsForScope('t01').length, 60); assert.equal(cardsForScope('t01').length, 61);
  assert.equal(questionsForScope('all-course').length, expectedCatalog.questions); assert.equal(cardsForScope().length, expectedCatalog.cards);
  for (const q of questionsForScope('t02-e05')) {
    assert.equal(q.options.filter(option => option.id === q.correct).length, 1);
    assert.ok(q.hint && q.explanation && q.options.every(option => option.feedback));
  }
});



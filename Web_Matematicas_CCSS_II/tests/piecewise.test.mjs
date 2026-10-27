import { expectedCatalog } from "./helpers/catalog-expectations.mjs";
import test from 'node:test';
import assert from 'node:assert/strict';
import { joiningModel, joiningCases, progressiveTariff, absoluteStudy } from '../content/models/piecewise.js';
import { questionsForScope, cardsForScope } from '../content/activities/catalog.js';

test('15 uniones: valores, límites y cocientes con el valor real del punto', () => {
  let count = 0;
  for (const kind of Object.keys(joiningCases)) for (const a of [-1, 0, 1]) {
    const m = joiningModel(kind, a), d = 1e-7; count++;
    assert.ok(Math.abs(m.value(a - d) - m.leftLimit) < 3e-7);
    assert.ok(Math.abs(m.value(a + d) - m.rightLimit) < 3e-7);
    if (kind === 'hole') { assert.ok(Number.isNaN(m.value(a))); assert.equal(m.continuous, false); continue; }
    assert.equal(m.value(a), m.point);
    const left = (m.value(a - d) - m.value(a)) / -d;
    const right = (m.value(a + d) - m.value(a)) / d;
    if (m.continuous) {
      assert.ok(Math.abs(left - m.leftSlope) < 2e-6);
      assert.ok(Math.abs(right - m.rightSlope) < 2e-6);
      assert.equal(m.differentiable, Math.abs(left - right) < 1e-5);
    } else {
      assert.equal(m.differentiable, false);
      assert.ok(left > 1e7);
      if (kind === 'isolated') assert.ok(right < -1e7);
      if (kind === 'jump') assert.ok(Math.abs(right - 1) < 1e-7);
    }
  }
  assert.equal(count, 15); assert.throws(() => joiningModel('invalid', 0), RangeError);
  assert.throws(() => joiningModel('smooth', 4), RangeError);
});
test('estudios resueltos: unión suave, mínimo y valores absolutos por intervalos', () => {
  const f = joiningModel('smooth', 1);
  for (const x of [-3, -1, 0, 0.5, 1, 2, 4]) assert.equal(f.value(x), x < 1 ? x * x : 2 * x - 1);
  assert.equal(f.value(0), 0); assert.equal(f.differentiable, true);
  assert.equal(absoluteStudy.value(1), -2); assert.equal(absoluteStudy.value(0), -1);
  for (const x of [-1, 3]) assert.equal(absoluteStudy.value(x), 0);
  for (const x of [-4, -2, -1, 0, 1, 2, 3, 5]) {
    assert.equal(absoluteStudy.value(x), x < 1 ? -x - 1 : x - 3);
    assert.ok(absoluteStudy.value(x) >= -2);
    assert.equal(Math.abs(x * x - 4), x < -2 || x > 2 ? x * x - 4 : 4 - x * x);
    assert.equal(Math.abs(2 * x - 4), x < 2 ? 4 - 2 * x : 2 * x - 4);
  }
  assert.ok(Number.isNaN(absoluteStudy.derivative(1)));
  assert.equal(absoluteStudy.derivative(0), -1); assert.equal(absoluteStudy.derivative(2), 1);
});
test('tarifa progresiva: acumulación, continuidad y cambio de precio marginal', () => {
  const T = progressiveTariff.value;
  assert.ok(Number.isNaN(T(-1))); assert.equal(T(0), 0); assert.equal(T(8), 16);
  assert.equal(T(10), 20); assert.equal(T(12), 26); assert.equal(T(15), 35);
  let accumulated = 0;
  for (let q = 1; q <= 30; q++) { accumulated += q <= 10 ? 2 : 3; assert.equal(T(q), accumulated); }
  const d = 1e-6;
  assert.ok(Math.abs(T(10 - d) - 20) < 4e-6 && Math.abs(T(10 + d) - 20) < 4e-6);
  assert.ok(Math.abs((T(10) - T(10 - d)) / d - 2) < 1e-8);
  assert.ok(Math.abs((T(10 + d) - T(10)) / d - 3) < 1e-8);
});
test('banco de tramos: seis preguntas y seis tarjetas; total 318/301', () => {
  assert.equal(questionsForScope('t02-e06').length, 6); assert.equal(cardsForScope('t02-e06').length, 6);
  assert.equal(questionsForScope('t02').length, 60); assert.equal(cardsForScope('t02').length, 54);
  assert.equal(questionsForScope('t01').length, 60); assert.equal(cardsForScope('t01').length, 61);
  assert.equal(questionsForScope('all-course').length, expectedCatalog.questions); assert.equal(cardsForScope().length, expectedCatalog.cards);
  for (const q of questionsForScope('t02-e06')) {
    assert.equal(q.options.filter(option => option.id === q.correct).length, 1);
    assert.ok(q.hint && q.explanation && q.options.every(option => option.feedback));
  }
});



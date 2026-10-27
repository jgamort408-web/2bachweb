import { expectedCatalog } from "./helpers/catalog-expectations.mjs";
import test from 'node:test';
import assert from 'node:assert/strict';
import { exponentialModel, periodicValue } from '../content/models/exponentials.js';
import { questionsForScope, cardsForScope } from '../content/activities/catalog.js';

test('24 exponenciales: valores, derivada numérica, monotonía, recorrido y límites', () => {
  let count = 0;
  for (const a of [0.5, 2]) for (const c of [1, 2, -1, -4]) for (const k of [0, 2, -2]) {
    const m = exponentialModel(a, c, k); count++;
    assert.equal(m.value(0), c + k);
    assert.equal(m.atZero, m.value(0));
    assert.equal(m.increasing, m.value(1) > m.value(-1));
    for (const x of [-4, -2, 0, 1, 3]) {
      const finiteDifference = (m.value(x + 1e-5) - m.value(x - 1e-5)) / 2e-5;
      assert.ok(Math.abs(finiteDifference - m.derivative(x)) < 1e-6);
      assert.equal(Math.sign(m.value(x) - k), Math.sign(c));
      assert.ok(m.value(x) > m.lower && m.value(x) < m.upper);
    }
    const nearAsymptote = a > 1 ? -40 : 40;
    assert.ok(Math.abs(m.value(nearAsymptote) - k) < 1e-10);
    assert.equal(a > 1 ? m.left : m.right, k);
    assert.equal(a > 1 ? m.right : m.left, Math.sign(c) * Infinity);
    if (m.zero !== null) assert.ok(Math.abs(m.value(m.zero)) < 1e-10);
    else assert.ok(m.value(-4) * m.value(4) > 0);
  }
  assert.equal(count, 24);
  for (const params of [[0, 1, 0], [-2, 1, 0], [1, 1, 0], [2, 0, 0], [NaN, 1, 0], [2, 1, Infinity]]) assert.throws(() => exponentialModel(...params), RangeError);
});
test('ejemplo transformado, reflexión y práctica resuelta', () => {
  const h = exponentialModel(0.5, -4, 2);
  assert.deepEqual([-1, 0, 1, 2].map(h.value), [-6, -2, 0, 1]);
  assert.equal(h.zero, 1); assert.equal(h.increasing, true);
  assert.equal(h.upper, 2); assert.equal(h.left, -Infinity); assert.equal(h.right, 2);
  const p = exponentialModel(2, 3, -3);
  assert.equal(p.value(0), 0); assert.equal(p.lower, -3); assert.equal(p.increasing, true);
  for (const x of [-3.5, -1, 0, 1.5, 4]) {
    assert.equal(exponentialModel(0.5, 1, 0).value(x), exponentialModel(2, 1, 0).value(-x));
    assert.equal(2 ** (x - 1), exponentialModel(2, 0.5, 0).value(x));
  }
});
test('modelos porcentuales: iteración independiente, unidades y redondeo final', () => {
  for (const [initial, rate] of [[1000, 0.05], [12000, -0.2], [500, -0.1]]) {
    let previous = initial;
    for (let t = 0; t <= 20; t++) {
      assert.ok(Math.abs(periodicValue(initial, rate, t) - previous) < 1e-8);
      previous += previous * rate;
    }
  }
  assert.equal(periodicValue(1000, 0.05, 3).toFixed(2), '1157.63');
  assert.ok(Math.abs(periodicValue(12000, -0.2, 3) - 6144) < 1e-8);
  assert.ok(Math.abs(periodicValue(500, -0.1, 4) - 328.05) < 1e-8);
  assert.equal(periodicValue(500, 0, 4), 500);
  for (const args of [[500, -1, 3], [0, 0.1, 3], [500, 0.1, -1], [500, NaN, 3]]) assert.throws(() => periodicValue(...args), RangeError);
});
test('seis preguntas y tarjetas exponenciales integradas sin alterar el banco t01', () => {
  assert.equal(questionsForScope('t02-e04').length, 6); assert.equal(cardsForScope('t02-e04').length, 6);
  assert.equal(questionsForScope('t02').length, 60); assert.equal(cardsForScope('t02').length, 54);
  assert.equal(questionsForScope('t01').length, 60); assert.equal(cardsForScope('t01').length, 61);
  assert.equal(questionsForScope('all-course').length, expectedCatalog.questions); assert.equal(cardsForScope().length, expectedCatalog.cards);
  for (const q of questionsForScope('t02-e04')) {
    assert.equal(q.options.filter(option => option.id === q.correct).length, 1);
    assert.ok(q.hint && q.explanation && q.options.every(option => option.feedback));
  }
});



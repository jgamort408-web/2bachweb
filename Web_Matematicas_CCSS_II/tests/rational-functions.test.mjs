import { expectedCatalog } from "./helpers/catalog-expectations.mjs";
import { test } from 'node:test';
import assert from 'node:assert/strict';
import { holeAndPole as f, obliqueRational as g, cancellationModel, cancellationCases } from '../content/models/rational-functions.js';
import { questionsForScope, cardsForScope } from '../content/activities/catalog.js';

test('racional con hueco: dominio original, cancelación, derivada y límites', () => {
  for (const x of [-1, 2]) { assert.ok(Number.isNaN(f.value(x))); assert.ok(Number.isNaN(f.derivative(x))); }
  for (let i = -150; i <= 150; i++) {
    const x = i / 10, h = 1e-5;
    if ([-1, 2].includes(x)) continue;
    assert.ok(Math.abs(f.value(x) - f.reduced(x)) < 1e-10);
    assert.ok(Math.abs((f.value(x + h) - f.value(x - h)) / (2 * h) - f.derivative(x)) < 2e-6);
    assert.ok(f.derivative(x) < 0);
  }
  assert.equal(Math.abs(f.value(1)), 0); assert.equal(f.value(0), 0.5);
  for (const d of [-1e-5, 1e-5]) assert.ok(Math.abs(f.value(-1 + d) - 2 / 3) < 2e-6);
  assert.ok(f.value(1.999) < -900 && f.value(2.001) > 900);
  for (const x of [-1e6, 1e6]) assert.ok(Math.abs(f.value(x) - 1) < 2e-6);
});
test('racional oblicua: división, derivada, extremos y recorrido de las ramas', () => {
  assert.ok(Number.isNaN(g.value(1))); assert.ok(Number.isNaN(g.derivative(1)));
  for (let i = -100; i <= 100; i++) {
    const x = i / 10, h = 1e-5; if (x === 1) continue;
    assert.ok(Math.abs(g.value(x) - (x + 1 + 1 / (x - 1))) < 1e-10);
    assert.ok(Math.abs((g.value(x + h) - g.value(x - h)) / (2 * h) - g.derivative(x)) < 2e-6);
    assert.ok(x < 1 ? g.value(x) <= 0 : g.value(x) >= 4);
  }
  assert.equal(Math.abs(g.value(0)), 0); assert.equal(g.value(2), 4);
  assert.ok(g.value(-0.01) < 0 && g.value(0.01) < 0);
  assert.ok(g.value(1.99) > 4 && g.value(2.01) > 4);
  for (const x of [-1e6, 1e6]) assert.ok(Math.abs(g.value(x) - g.line(x)) < 2e-6);
  // Práctica: u=(x−3)/(x+2), ambos signos laterales e incremento.
  const u = x => (x - 3) / (x + 2);
  assert.equal(u(3), 0); assert.equal(u(0), -1.5);
  assert.ok(u(-2.001) > 4000 && u(-1.999) < -4000);
  assert.ok(u(-4) < u(-3) && u(0) < u(1));
});
test('18 configuraciones del explorador: punto ausente y cancelación de multiplicidades', () => {
  let count = 0;
  for (const kind of Object.keys(cancellationCases)) for (const a of [-1, 1, 2]) for (const k of [-2, 2]) {
    const model = cancellationModel(kind, a, k); count++;
    assert.ok(Number.isNaN(model.value(a)));
    for (const d of [-0.5, -0.1, -0.01, 0.01, 0.1, 0.5]) {
      const value = model.value(a + d);
      const expected = kind === 'equal' ? k : kind === 'zero' ? k * d : k / d;
      assert.ok(Math.abs(value - expected) < 1e-10);
    }
    if (kind === 'pole') {
      assert.equal(Math.sign(model.value(a - 0.01)), Math.sign(model.left));
      assert.equal(Math.sign(model.value(a + 0.01)), Math.sign(model.right));
    } else assert.ok(Math.abs(model.value(a + 1e-7) - model.limit) < 1e-6);
  }
  assert.equal(count, 18); assert.throws(() => cancellationModel('invalid', 1, 2), RangeError);
});
test('banco de racionales: seis preguntas y seis tarjetas, total 318/301', () => {
  assert.equal(questionsForScope('t02-e03').length, 6); assert.equal(cardsForScope('t02-e03').length, 6);
  assert.equal(questionsForScope('t02').length, 60); assert.equal(cardsForScope('t02').length, 54);
  assert.equal(questionsForScope('all-course').length, expectedCatalog.questions); assert.equal(cardsForScope().length, expectedCatalog.cards);
  assert.equal(questionsForScope('t01').length, 60); assert.equal(cardsForScope('t01').length, 61);
});



import { expectedCatalog } from "./helpers/catalog-expectations.mjs";
import { test } from 'node:test';
import assert from 'node:assert/strict';
import { repeatedRootPolynomial as p, benefitModel as b, generatePolynomialEnds } from '../content/models/polynomials.js';
import { questionsForScope, cardsForScope } from '../content/activities/catalog.js';

test('cúbica con raíz doble: identidad, signo, derivada y extremos', () => {
  for (let i = -100; i <= 100; i++) {
    const x = i / 20, h = 1e-4;
    assert.ok(Math.abs(p.value(x) - (x + 1) ** 2 * (x - 2)) < 1e-12);
    assert.ok(Math.abs((p.value(x + h) - p.value(x - h)) / (2 * h) - p.derivative(x)) < 1e-7);
  }
  assert.deepEqual(p.roots.map(p.value), [0, 0]);
  for (const { x, y } of p.extrema) { assert.equal(p.value(x), y); assert.equal(p.derivative(x), 0); }
  assert.ok(p.value(-1.01) < 0 && p.value(-0.99) < 0);
  assert.ok(p.value(1.99) < 0 && p.value(2.01) > 0);
  assert.ok(p.value(-1.01) < p.value(-1) && p.value(-0.99) < p.value(-1));
  assert.ok(p.value(0.99) > p.value(1) && p.value(1.01) > p.value(1));
});
test('beneficio: candidatos, unidades y restricción de capacidad', () => {
  assert.deepEqual([0, 2, 6, 10].map(b.value), [-40, 0, 32, 0]);
  for (let i = 0; i <= 1000; i++) {
    const q = i / 100, h = 1e-4;
    assert.ok(b.value(q) <= 32 && b.value(q) >= -40);
    assert.ok(Math.abs(b.value(q) - (-2 * (q - 2) * (q - 10))) < 1e-10);
    assert.ok(Math.abs((b.value(q + h) - b.value(q - h)) / (2 * h) - b.derivative(q)) < 1e-7);
    if (q <= 4) assert.ok(b.value(q) <= 24 && b.derivative(q) > 0);
  }
  assert.equal(b.value(6) * 100, 3200); assert.equal(b.value(4) * 100, 2400);
});
test('6000 polinomios: grado real, cuatro patrones, límites y reproducibilidad', () => {
  const value = (coefficients, x) => coefficients.reduceRight((sum, c) => sum * x + c, 0);
  for (let seed = 0; seed < 1000; seed++) {
    const session = generatePolynomialEnds(seed);
    assert.deepEqual(session, generatePolynomialEnds(seed));
    assert.equal(new Set(session.map(q => q.correct)).size, 4);
    for (const item of session) {
      const { degree, leading, coefficients, left, right } = item.parameters;
      assert.equal(coefficients.length - 1, degree); assert.equal(coefficients.at(-1), leading); assert.notEqual(leading, 0);
      assert.equal(item.options.filter(o => o.id === item.correct).length, 1);
      const pairs = [[1, 1], [-1, -1], [-1, 1], [1, -1]];
      assert.deepEqual(pairs[Number(item.correct.split('-')[1])], [left, right]);
      for (const x of [-1000, 1000]) {
        assert.equal(Math.sign(value(coefficients, x)), x < 0 ? left : right);
        assert.ok(Math.abs(value(coefficients, x) / (leading * x ** degree) - 1) < 0.006);
      }
    }
  }
  assert.notDeepEqual(generatePolynomialEnds(42), generatePolynomialEnds(43));
});
test('banco fijo de polinomios y separación de las variantes', () => {
  assert.equal(questionsForScope('t02-e02').length, 6); assert.equal(cardsForScope('t02-e02').length, 6);
  assert.equal(questionsForScope('t02').length, 60); assert.equal(cardsForScope('t02').length, 54);
  assert.equal(questionsForScope('t01').length, 60); assert.equal(cardsForScope('t01').length, 61);
  assert.equal(questionsForScope('all-course').length, expectedCatalog.questions); assert.equal(cardsForScope().length, expectedCatalog.cards);
});



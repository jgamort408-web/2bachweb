import { test } from 'node:test';
import assert from 'node:assert/strict';
import { secantSlope, derivativeAt } from '../assets/js/learning/derivative-explorer.js';

test('secantes: contraste con cocientes originales a ambos lados y cruzando una esquina', () => {
  for (const kind of ['square', 'absolute']) {
    const f = kind === 'square' ? (x) => x * x : Math.abs;
    for (const a of [-2, -1, -0.01, 0, 0.01, 1, 2]) {
      for (const h of [-0.1, -0.01, -0.0001, 0.0001, 0.01, 0.1]) {
        const direct = (f(a + h) - f(a)) / h;
        assert.ok(Math.abs(secantSlope(kind, a, h) - direct) < 1e-10, JSON.stringify({ kind, a, h }));
      }
    }
  }
  assert.throws(() => secantSlope('square', 2, 0), RangeError);
  assert.equal(derivativeAt('square', -2), -4);
  assert.equal(derivativeAt('absolute', -2), -1);
  assert.equal(derivativeAt('absolute', 2), 1);
  assert.equal(derivativeAt('absolute', 0), null);
});

test('examen 1(a): parámetros y cocientes calculados desde la función original', () => {
  const f = (x, a, b) => x <= 0 ? x * x + a * x + 2 : (x + b) / (x - 1);
  // La continuidad no impone a: valores a=-3,1,4 con b=-2.
  for (const a of [-3, 1, 4]) {
    for (const h of [-1e-6, 1e-6]) assert.ok(Math.abs(f(h, a, -2) - f(0, a, -2)) < 0.00001);
    const left = (f(-1e-5, a, -2) - f(0, a, -2)) / -1e-5;
    const right = (f(1e-5, a, -2) - f(0, a, -2)) / 1e-5;
    assert.ok(Math.abs(left - a) < 0.00002);
    assert.ok(Math.abs(right - 1) < 0.00002);
    assert.equal(Math.abs(left - right) < 0.0001, a === 1);
  }
  assert.ok(Math.abs(f(1e-6, 1, 2) - f(0, 1, 2)) > 3.99);
});

test('coste marginal: pendiente y coste adicional conservan unidades y diferencia', () => {
  const cost = (q) => 100 + 5 * q + 0.02 * q * q;
  assert.ok(Math.abs((cost(50.0001) - cost(50)) / 0.0001 - 7) < 0.00001);
  assert.ok(Math.abs(cost(51) - cost(50) - 7.02) < 1e-10);
});

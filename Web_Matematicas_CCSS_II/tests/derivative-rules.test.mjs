import { test } from 'node:test';
import assert from 'node:assert/strict';
import { tangentData } from '../assets/js/learning/tangent-explorer.js';

test('tangentes y normales: punto común, perpendicularidad y normal vertical', () => {
  for (const a of [-2, -1, 0, 1, 2]) {
    const data = tangentData(a);
    const h = 1e-5;
    const numerical = ((a + h) ** 2 - (a - h) ** 2) / (2 * h);
    assert.ok(Math.abs(data.slope - numerical) < 1e-8);
    assert.equal(data.y, a ** 2);
    const tangentDirection = [1, data.slope];
    const normalDirection = data.normalSlope === null ? [0, 1] : [1, data.normalSlope];
    assert.equal(tangentDirection[0] * normalDirection[0] + tangentDirection[1] * normalDirection[1], 0);
    assert.equal(data.normalSlope === null, a === 0);
  }
});

test('examen 1(b-c): pendiente desde la rama original con b fijado y libre', () => {
  for (const b of [-3, -2, -1, 0, 2]) {
    const f = (x) => (x + b) / (x - 1), h = 1e-5;
    const slope = (f(2 + h) - f(2 - h)) / (2 * h);
    assert.ok(Math.abs(slope + b + 1) < 1e-8);
    assert.equal(f(2), b + 2);
  }
});

test('reglas publicadas contrastadas con diferencias centrales de las funciones originales', () => {
  const cases = [
    { f: (x) => x * x * Math.exp(x), d: (x) => Math.exp(x) * (2 * x + x * x), xs: [-2, -0.5, 0, 1, 2] },
    { f: (x) => Math.log(x) / x, d: (x) => (1 - Math.log(x)) / (x * x), xs: [0.5, 1, 2, 3] },
    { f: (x) => (x ** 3 - 4) / (x * x + 4) ** 2, d: (x) => (-(x ** 4) + 12 * x * x + 16 * x) / (x * x + 4) ** 3, xs: [-2, -1, 0, 1, 2] },
    { f: (x) => (x * x + 1) ** 3, d: (x) => 6 * x * (x * x + 1) ** 2, xs: [-2, 0, 1, 2] },
    { f: (x) => (x * x + 1) * Math.exp(2 * x), d: (x) => (2 * x + 2 * (x * x + 1)) * Math.exp(2 * x), xs: [-1, 0, 1] },
    { f: (x) => (x * x + 1) / (x + 1), d: (x) => (x * x + 2 * x - 1) / (x + 1) ** 2, xs: [-2, 0, 1, 2] },
    { f: (x) => 3 ** x, d: (x) => 3 ** x * Math.log(3), xs: [-1, 0, 1, 2] },
    { f: (x) => Math.log(2 * x + 1), d: (x) => 2 / (2 * x + 1), xs: [0, 0.5, 1, 2] },
    { f: (x) => Math.sqrt(3 * x + 1), d: (x) => 3 / (2 * Math.sqrt(3 * x + 1)), xs: [0, 1, 2] },
  ];
  for (const { f, d, xs } of cases) for (const x of xs) {
    const h = 1e-5, central = (f(x + h) - f(x - h)) / (2 * h);
    assert.ok(Math.abs(central - d(x)) < 1e-5 * Math.max(1, Math.abs(d(x))), 'x=' + x);
  }
  const examDerivative = cases[2].d;
  assert.equal(examDerivative(1), 27 / 125);
});

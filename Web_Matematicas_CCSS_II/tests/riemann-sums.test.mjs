import test from 'node:test';
import assert from 'node:assert/strict';
import { riemannModel, riemannFamilies, riemannRules } from '../content/models/riemann-sums.js';

const close = (a, b, tolerance = 1e-12) => assert.ok(Math.abs(a - b) < tolerance, `${a} frente a ${b}`);

test('sumas de Riemann: fórmulas cerradas de x² y 4−x² en [0, 2] para las tres reglas', () => {
  // Σ i² = n(n+1)(2n+1)/6. Con h=2/n: izquierda h³Σ(i−1)², derecha h³Σi², punto medio h³Σ(i−½)².
  const squares = n => n * (n + 1) * (2 * n + 1) / 6;
  for (let n = 1; n <= 100; n++) {
    const h = 2 / n;
    const left = h ** 3 * squares(n - 1), right = h ** 3 * squares(n), mid = h ** 3 * (squares(n) - n * (n + 1) / 2 + n / 4);
    close(riemannModel('increasing', 'left', n).sum, left, 1e-9);
    close(riemannModel('increasing', 'right', n).sum, right, 1e-9);
    close(riemannModel('increasing', 'mid', n).sum, mid, 1e-9);
    // 4−x²: cada altura es 4 menos la de x², luego la suma es 8 menos la de x².
    for (const rule of Object.keys(riemannRules)) close(riemannModel('decreasing', rule, n).sum, 8 - riemannModel('increasing', rule, n).sum, 1e-9);
    assert.equal(riemannModel('increasing', 'left', n).rectangles.length, n);
  }
  close(riemannFamilies.increasing.exact, 8 / 3);
  close(riemannFamilies.decreasing.exact, 16 / 3);
});

test('sumas de Riemann: sentido del error según la monotonía, punto medio más preciso y convergencia', () => {
  for (let n = 1; n <= 100; n++) {
    assert.equal(riemannModel('increasing', 'left', n).direction, 'por defecto');
    assert.equal(riemannModel('increasing', 'right', n).direction, 'por exceso');
    assert.equal(riemannModel('decreasing', 'left', n).direction, 'por exceso');
    assert.equal(riemannModel('decreasing', 'right', n).direction, 'por defecto');
    // x² es convexa: el punto medio aproxima por defecto, con error exacto 2/(3n²) (fórmula del punto medio).
    close(riemannModel('increasing', 'mid', n).error, 2 / (3 * n * n), 1e-9);
    assert.ok(riemannModel('increasing', 'mid', n).error < riemannModel('increasing', 'left', n).error);
    // Izquierda y derecha: error 4/n ± 4/(3n²), es decir, del orden de 1/n.
    close(riemannModel('increasing', 'left', n).error, 4 / n - 4 / (3 * n * n), 1e-9);
  }
  // Valores de la tabla estática de la lección (n = 4, 10, 100).
  for (const [n, values] of [[4, [1.75, 2.625, 3.75]], [10, [2.28, 2.66, 3.08]], [100, [2.6268, 2.6666, 2.7068]]]) {
    ['left', 'mid', 'right'].forEach((rule, i) => close(riemannModel('increasing', rule, n).sum, values[i], 1e-9));
  }
  for (const args of [['otra', 'left', 4], ['increasing', 'otra', 4], ['increasing', 'left', 0], ['increasing', 'left', 101], ['increasing', 'left', 2.5], ['__proto__', 'left', 4]]) {
    assert.throws(() => riemannModel(...args), RangeError);
  }
});

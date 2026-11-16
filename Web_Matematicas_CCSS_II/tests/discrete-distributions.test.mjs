import test from 'node:test';
import assert from 'node:assert/strict';
import {
  rational, parseRational, decimal, discreteSummary, discretePresets, toNumber, binomialMass, binomialCdf, binomialEvent,
  binomialParameters, binomialCoefficient, binomialPresets, cmp, ONE,
} from '../content/models/discrete-distributions.js';

const R = (n, d = 1) => rational(BigInt(n), BigInt(d));
const pairsOf = key => discretePresets[key].pairs.map(([x, p]) => ({ x: parseRational(x), p: parseRational(p) }));

test('lectura de números: enteros, decimales con coma o punto, fracciones y rechazos', () => {
  assert.deepEqual(parseRational('1/6'), R(1, 6));
  assert.deepEqual(parseRational('0,125'), R(1, 8));
  assert.deepEqual(parseRational('−1,5'), R(-3, 2));
  assert.deepEqual(parseRational('.5'), R(1, 2));
  assert.deepEqual(parseRational('2/4'), R(1, 2));
  for (const bad of ['', '1/0', 'x', '1,23456', '2000', '1e3', '1/2/3', '--1']) assert.equal(parseRational(bad), null, bad);
  assert.equal(decimal(R(2048, 10000), 4), '0,2048');
  assert.equal(decimal(R(-9, 20), 2), '−0,45');
  assert.equal(decimal(R(1, 3), 5), '0,33333');
  assert.equal(decimal(R(2, 3), 4), '0,6667');
});

test('distribuciones de la lección 8.1: dado, monedas, premio, rifa y una lista inválida', () => {
  const die = discreteSummary(pairsOf('die'));
  assert.ok(die.valid); assert.deepEqual(die.mean, R(7, 2)); assert.deepEqual(die.squares, R(91, 6)); assert.deepEqual(die.variance, R(35, 12));
  assert.deepEqual(die.rows.map(r => r.F), [1, 2, 3, 4, 5, 6].map(k => R(k, 6)));
  const coins = discreteSummary(pairsOf('coins'));
  assert.deepEqual([coins.mean, coins.variance], [R(1), R(1, 2)]);
  const prize = discreteSummary(pairsOf('prize'));
  assert.deepEqual([prize.mean, prize.variance], [R(1), R(1, 4)]);
  const raffle = discreteSummary(pairsOf('raffle'));
  assert.deepEqual(raffle.mean, R(-9, 20)); assert.deepEqual(raffle.rows.map(r => toNumber(r.x)), [-1, 10]);
  assert.deepEqual(discreteSummary(pairsOf('invalid')).problems, ['sum']);
  assert.deepEqual(discreteSummary([{ x: R(1), p: R(-1, 2) }, { x: R(2), p: R(3, 2) }]).problems, ['range']);
  assert.deepEqual(discreteSummary([{ x: R(1), p: R(1, 2) }, { x: R(1), p: R(1, 2) }]).problems, ['repeated']);
  assert.deepEqual(discreteSummary([]).problems, ['empty', 'sum']);
});

test('500 distribuciones aleatorias: media y varianza contrastadas con coma flotante', () => {
  let seed = 3; const rnd = n => { seed = (seed * 1103515245 + 12345) % 2147483648; return Math.floor(seed / 65536) % n; };
  for (let t = 0; t < 500; t++) {
    const m = 1 + rnd(6), weights = Array.from({ length: m }, () => 1 + rnd(9)), total = weights.reduce((a, b) => a + b, 0);
    const xs = []; while (xs.length < m) { const x = rnd(21) - 10; if (!xs.includes(x)) xs.push(x); }
    const s = discreteSummary(xs.map((x, i) => ({ x: R(x), p: R(weights[i], total) })));
    assert.ok(s.valid);
    const mu = xs.reduce((a, x, i) => a + x * weights[i] / total, 0);
    const v = xs.reduce((a, x, i) => a + (x - mu) ** 2 * weights[i] / total, 0);
    assert.ok(Math.abs(toNumber(s.mean) - mu) < 1e-9); assert.ok(Math.abs(toNumber(s.variance) - v) < 1e-9);
    assert.equal(cmp(s.rows.at(-1).F, ONE), 0);
  }
});

test('binomial: ejemplos de 8.2 y casos extremos', () => {
  const p = parseRational('0,8');
  assert.equal(binomialCoefficient(5, 3), 10n); assert.equal(binomialCoefficient(100, 50), 100891344545564193334812497256n);
  assert.equal(decimal(binomialMass(5, p, 3), 4), '0,2048');
  assert.equal(decimal(binomialEvent(5, p, 'le', 2).probability, 5), '0,05792');
  assert.equal(decimal(binomialEvent(5, p, 'lt', 2).probability, 5), '0,00672');
  assert.equal(decimal(binomialEvent(5, p, 'ge', 3).probability, 5), '0,94208');
  assert.equal(decimal(binomialEvent(5, p, 'gt', 3).probability, 5), '0,73728');
  assert.equal(decimal(binomialEvent(5, p, 'between', 2, 4).probability, 5), '0,66560');
  assert.equal(decimal(binomialEvent(5, p, 'ge', 1).probability, 5), '0,99968');
  assert.deepEqual(binomialEvent(5, p, 'between', 2, 4).included, [2, 3, 4]);
  const q = binomialParameters(5, p); assert.deepEqual(q.mean, R(4)); assert.deepEqual(q.variance, R(4, 5));
  // p = 0 y p = 1: masas ciertas sin 0⁰.
  assert.deepEqual(binomialMass(4, R(0), 0), R(1)); assert.deepEqual(binomialMass(4, R(1), 4), R(1)); assert.deepEqual(binomialMass(4, R(1), 3), R(0));
  // Normal de 8.4: masa exacta de X = 50 en Bin(100; 0,5).
  assert.equal(decimal(binomialMass(100, R(1, 2), 50), 6), '0,079589');
  assert.equal(decimal(binomialCdf(100, R(1, 2), 55), 6), '0,864373');
  assert.throws(() => binomialMass(0, R(1, 2), 0)); assert.throws(() => binomialMass(5, R(3, 2), 1)); assert.throws(() => binomialEvent(5, p, 'other', 1));
  for (const preset of Object.values(binomialPresets)) assert.ok(binomialEvent(preset.n, parseRational(preset.p), preset.kind, preset.k, preset.b ?? preset.k).included.length > 0);
});

test('binomial frente a coma flotante independiente: n ≤ 30, 11 valores de p, todos los sucesos', () => {
  const fact = n => (n <= 1 ? 1 : n * fact(n - 1));
  for (let n = 1; n <= 30; n++) for (let t = 0; t <= 10; t++) {
    const p = R(t, 10), pf = t / 10;
    const mass = k => (pf === 0 ? (k === 0 ? 1 : 0) : pf === 1 ? (k === n ? 1 : 0) : fact(n) / (fact(k) * fact(n - k)) * pf ** k * (1 - pf) ** (n - k));
    let total = 0;
    for (let k = 0; k <= n; k++) { assert.ok(Math.abs(toNumber(binomialMass(n, p, k)) - mass(k)) < 1e-9); total += mass(k); }
    assert.ok(Math.abs(total - 1) < 1e-9);
    for (let k = 0; k <= n; k++) {
      const le = Array.from({ length: k + 1 }, (_, j) => mass(j)).reduce((a, b) => a + b, 0);
      assert.ok(Math.abs(toNumber(binomialEvent(n, p, 'le', k).probability) - le) < 1e-9);
      assert.ok(Math.abs(toNumber(binomialEvent(n, p, 'gt', k).probability) - (1 - le)) < 1e-9);
      assert.ok(Math.abs(toNumber(binomialEvent(n, p, 'ge', k).probability) + toNumber(binomialEvent(n, p, 'lt', k).probability) - 1) < 1e-12);
    }
  }
});

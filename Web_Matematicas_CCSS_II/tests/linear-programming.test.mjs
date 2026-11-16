import test from 'node:test';
import assert from 'node:assert/strict';
import {
  evaluate, testPoint, boundaryPoints, boundaryKind, inequalityTex, analyzeRegion, optimize, clipPolygon, windowPolygon,
  clipBoundary, parseInteger, halfPlanePresets, regionPresets, objectivePresets, checkInequality,
} from '../content/models/linear-programming.js';
import { fraction } from '../content/models/matrix-inverse.js';

const F = (n, d = 1) => fraction(n, d);
const num = f => f.numerator / f.denominator;
const OPS = ['<=', '>=', '<', '>'];
const holdsFloat = ({ a, b, c, op }, x, y) => { const v = a * x + b * y - c; return { '<=': v <= 0, '>=': v >= 0, '<': v < 0, '>': v > 0 }[op]; };

test('evaluación exacta de semiplanos contrastada con aritmética directa en 200 000 casos', () => {
  for (let a = -3; a <= 3; a++) for (let b = -3; b <= 3; b++) if (a || b) for (let c = -6; c <= 6; c += 3) for (const op of OPS) {
    const ineq = { a, b, c, op };
    for (let x = -4; x <= 4; x++) for (let y = -4; y <= 4; y += 2) {
      const r = evaluate(ineq, [F(x, 2), F(y)]);
      assert.equal(r.holds, holdsFloat(ineq, x / 2, y));
      assert.equal(r.onBoundary, a * x / 2 + b * y === c);
    }
  }
});

test('punto de prueba fuera de la frontera y dos puntos distintos sobre ella', () => {
  for (let a = -5; a <= 5; a++) for (let b = -5; b <= 5; b++) if (a || b) for (let c = -7; c <= 7; c++) {
    const ineq = { a, b, c, op: '<=' };
    assert.equal(evaluate(ineq, testPoint(ineq)).onBoundary, false);
    const [p, q] = boundaryPoints(ineq);
    assert.ok(evaluate(ineq, p).onBoundary && evaluate(ineq, q).onBoundary);
    assert.ok(num(p[0]) !== num(q[0]) || num(p[1]) !== num(q[1]));
  }
  assert.deepEqual(testPoint({ a: -2, b: 1, c: 0, op: '>=' }), [F(0), F(1)]);
  assert.deepEqual(testPoint({ a: 1, b: 0, c: 0, op: '<' }), [F(1), F(0)]);
  assert.equal(boundaryKind({ a: 1, b: 0 }), 'vertical');
  assert.equal(boundaryKind({ a: 0, b: -2 }), 'horizontal');
  assert.equal(inequalityTex({ a: -1, b: 2, c: 0, op: '<' }), '-x+2y<0');
  assert.equal(inequalityTex({ a: 0, b: -2, c: 4, op: '<=' }), String.raw`-2y\le4`);
  assert.throws(() => checkInequality({ a: 0, b: 0, c: 1, op: '<=' }));
  assert.throws(() => checkInequality({ a: 1, b: 1, c: 1, op: '=' }));
});

// Referencia independiente: recorte numérico de una ventana grande.
function reference(ineqs) {
  const L = 200;
  let poly = windowPolygon({ xMin: -L, xMax: L, yMin: -L, yMax: L });
  for (const i of ineqs) poly = clipPolygon(poly, i);
  const pts = [];
  for (const p of poly) if (!pts.some(q => Math.hypot(p[0] - q[0], p[1] - q[1]) < 1e-7)) pts.push(p);
  if (!pts.length) return { kind: 'empty' };
  if (pts.some(([x, y]) => Math.abs(Math.abs(x) - L) < 1e-6 || Math.abs(Math.abs(y) - L) < 1e-6)) return { kind: 'unbounded' };
  let area = 0; for (let i = 0; i < pts.length; i++) { const p = pts[i], q = pts[(i + 1) % pts.length]; area += p[0] * q[1] - q[0] * p[1]; }
  const kind = pts.length === 1 ? 'point' : Math.abs(area) < 1e-7 ? 'segment' : 'polygon';
  return { kind, pts };
}

test('regiones: 40 000 sistemas aleatorios clasificados igual que el recorte independiente', () => {
  let seed = 12345; const rnd = n => { seed = (seed * 1103515245 + 12345) % 2147483648; return Math.floor(seed / 65536) % n; };
  const seen = new Set();
  for (let k = 0; k < 40000; k++) {
    const m = 1 + rnd(4), ineqs = [];
    for (let j = 0; j < m; j++) { let a = rnd(7) - 3, b = rnd(7) - 3; if (!a && !b) a = 1; ineqs.push({ a, b, c: rnd(13) - 6, op: rnd(2) ? '<=' : '>=' }); }
    const got = analyzeRegion(ineqs), ref = reference(ineqs);
    assert.equal(got.kind, ref.kind, JSON.stringify(ineqs));
    seen.add(got.kind);
    if (ref.pts) {
      assert.equal(got.vertices.length, ref.kind === 'segment' ? 2 : ref.pts.length, JSON.stringify(ineqs));
      for (const v of got.vertices) assert.ok(ref.pts.some(p => Math.hypot(p[0] - num(v[0]), p[1] - num(v[1])) < 1e-6));
    }
  }
  assert.deepEqual([...seen].sort(), ['empty', 'point', 'polygon', 'segment', 'unbounded']);
});

test('casos de las lecciones 6.2 y 6.4', () => {
  const r = analyzeRegion(regionPresets.source.ineqs);
  assert.equal(r.kind, 'polygon');
  assert.deepEqual(r.vertices.map(v => v.map(num)).sort(), [[0, 0], [0, 60], [40, 0], [40, 20]]);
  assert.equal(analyzeRegion(regionPresets.empty.ineqs).kind, 'empty');
  const s = analyzeRegion(regionPresets.segment.ineqs);
  assert.equal(s.kind, 'segment'); assert.deepEqual(s.vertices.map(v => v.map(num)).sort(), [[0, 4], [4, 0]]);
  const p = analyzeRegion(regionPresets.point.ineqs);
  assert.equal(p.kind, 'point'); assert.deepEqual(p.vertices.map(v => v.map(num)), [[1, 2]]);
  assert.equal(analyzeRegion(regionPresets.unbounded.ineqs).kind, 'unbounded');
  // Sin vértices: semiplano, franja y recta; franja vacía.
  assert.equal(analyzeRegion([{ a: 1, b: 1, c: 60, op: '<=' }]).kind, 'unbounded');
  assert.equal(analyzeRegion([{ a: 1, b: 1, c: 4, op: '<=' }, { a: 2, b: 2, c: 8, op: '>=' }]).kind, 'unbounded');
  assert.equal(analyzeRegion([{ a: 1, b: 1, c: 2, op: '<=' }, { a: -1, b: -1, c: -5, op: '>=' }]).kind, 'unbounded');
  assert.equal(analyzeRegion([{ a: 1, b: 1, c: 2, op: '<=' }, { a: -1, b: -1, c: -5, op: '<=' }]).kind, 'empty');
  assert.throws(() => analyzeRegion([{ a: 1, b: 1, c: 2, op: '<' }]));

  const furniture = optimize(objectivePresets.furniture.ineqs, objectivePresets.furniture.objective, 'max');
  assert.equal(furniture.kind, 'unique'); assert.deepEqual(furniture.optimal.map(v => v.map(num)), [[0, 9]]); assert.equal(num(furniture.best), 450);
  assert.deepEqual(furniture.values.map(v => num(v.z)).sort((a, b) => a - b), [0, 270, 450]);
  const variant = optimize(objectivePresets.furniture.ineqs, [40, 50], 'max');
  assert.equal(num(variant.best), 450); assert.equal(variant.kind, 'unique');
  const multiple = optimize(objectivePresets.multiple.ineqs, [2, 2], 'max');
  assert.equal(multiple.kind, 'multiple'); assert.equal(num(multiple.best), 12); assert.equal(multiple.optimal.length, 2);
  assert.equal(optimize(objectivePresets.unbounded.ineqs, [1, 1], 'max').kind, 'unbounded');
  const min = optimize(objectivePresets.unbounded.ineqs, [1, 1], 'min');
  assert.equal(min.kind, 'multiple'); assert.equal(num(min.best), 2);
  assert.equal(optimize(objectivePresets.unbounded.ineqs, [1, 2], 'min').kind, 'unique');
  assert.equal(optimize(objectivePresets.empty.ineqs, [1, 1], 'max').kind, 'empty');
  // Rayo de nivel constante: mínimo de y en el primer cuadrante con x ≥ 1 se alcanza en toda una semirrecta.
  const flat = optimize([{ a: 1, b: 0, c: 1, op: '>=' }, { a: 0, b: 1, c: 0, op: '>=' }], [0, 1], 'min');
  assert.equal(flat.kind, 'multiple'); assert.equal(flat.ray, true);
});

test('optimización contrastada con muestreo denso de la región acotada', () => {
  let seed = 7; const rnd = n => { seed = (seed * 1103515245 + 12345) % 2147483648; return Math.floor(seed / 65536) % n; };
  let checked = 0;
  for (let k = 0; k < 3000; k++) {
    const ineqs = [{ a: 1, b: 0, c: 0, op: '>=' }, { a: 0, b: 1, c: 0, op: '>=' }, { a: 1 + rnd(3), b: 1 + rnd(3), c: 4 + rnd(8), op: '<=' }, { a: rnd(5) - 2, b: rnd(5) - 2 || 1, c: rnd(9), op: rnd(2) ? '<=' : '>=' }];
    const p = rnd(9) - 4, q = rnd(9) - 4, sense = rnd(2) ? 'max' : 'min';
    const r = optimize(ineqs, [p, q], sense);
    if (r.kind === 'empty') continue;
    // La región está en [0,12]²: el óptimo de los vértices no puede mejorar ningún punto de la rejilla factible.
    for (let x = 0; x <= 12; x += 0.25) for (let y = 0; y <= 12; y += 0.25) if (ineqs.every(i => holdsFloat(i, x, y))) {
      const z = p * x + q * y; assert.ok(sense === 'max' ? z <= num(r.best) + 1e-9 : z >= num(r.best) - 1e-9);
    }
    checked++;
  }
  assert.ok(checked > 2000);
});

test('recorte de fronteras, presets y enteros de los controles', () => {
  for (const { ineq } of Object.values(halfPlanePresets)) {
    const seg = clipBoundary(ineq, { xMin: -6, xMax: 12, yMin: -6, yMax: 12 });
    assert.equal(seg.length, 2);
    for (const [x, y] of seg) assert.ok(Math.abs(ineq.a * x + ineq.b * y - ineq.c) < 1e-9);
  }
  assert.deepEqual(clipBoundary({ a: 1, b: 0, c: 50, op: '<=' }, { xMin: 0, xMax: 10, yMin: 0, yMax: 10 }), []);
  assert.equal(parseInteger('−7'), -7); assert.equal(parseInteger(' 12 '), 12);
  for (const bad of ['', '1.5', '100', 'x', '--1']) assert.equal(parseInteger(bad), null);
});

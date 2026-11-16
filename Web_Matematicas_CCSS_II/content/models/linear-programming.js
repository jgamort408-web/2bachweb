// Modelo del tema 6 (programación lineal): semiplanos, regiones factibles y función objetivo.
// Cálculo exacto con fracciones de enteros; el recorte en coma flotante solo sirve para dibujar.
// Una inecuación es { a, b, c, op } y significa a·x + b·y op c, con a, b, c enteros y (a, b) ≠ (0, 0).
import { fraction, fractionTex } from './matrix-inverse.js';

const tex = String.raw;
export const OPERATORS = Object.freeze({ '<=': tex`\le`, '>=': tex`\ge`, '<': '<', '>': '>' });
export const OPERATOR_TEXT = Object.freeze({ '<=': '≤', '>=': '≥', '<': '<', '>': '>' });
const LIMIT = 99;

export function checkInequality(ineq) {
  const { a, b, c, op } = ineq ?? {};
  if (![a, b, c].every(Number.isSafeInteger)) throw new TypeError('Coeficientes enteros requeridos.');
  if (![a, b, c].every(v => Math.abs(v) <= LIMIT)) throw new RangeError('Coeficientes entre −99 y 99.');
  if (a === 0 && b === 0) throw new RangeError('a y b no pueden ser ambos nulos: no habría recta frontera.');
  if (!Object.hasOwn(OPERATORS, op)) throw new RangeError('Operador no admitido: ' + op);
  return ineq;
}
export const isStrict = ({ op }) => op === '<' || op === '>';
export const boundaryKind = ({ a, b }) => (b === 0 ? 'vertical' : a === 0 ? 'horizontal' : 'oblique');
export const throughOrigin = ({ c }) => c === 0;

// a·x + b·y − c en un punto racional: devuelve numerador con denominador positivo para comparar signos.
function slack({ a, b, c }, [x, y]) {
  const den = x.denominator * y.denominator;
  return fraction(a * x.numerator * y.denominator + b * y.numerator * x.denominator - c * den, den);
}
export function evaluate(ineq, point) {
  checkInequality(ineq);
  const [x, y] = point;
  const left = fraction(ineq.a * x.numerator * y.denominator + ineq.b * y.numerator * x.denominator, x.denominator * y.denominator);
  const s = Math.sign(slack(ineq, point).numerator);
  const holds = { '<=': s <= 0, '>=': s >= 0, '<': s < 0, '>': s > 0 }[ineq.op];
  return { left, onBoundary: s === 0, holds };
}

/** Punto de prueba: el origen si no está en la frontera; si lo está, (0,1) o (1,0). */
export function testPoint(ineq) {
  checkInequality(ineq);
  if (ineq.c !== 0) return [fraction(0), fraction(0)];
  return ineq.b !== 0 ? [fraction(0), fraction(1)] : [fraction(1), fraction(0)];
}

/** Dos puntos de la frontera para dibujarla a mano: cortes con los ejes si son distintos. */
export function boundaryPoints(ineq) {
  checkInequality(ineq);
  const { a, b, c } = ineq;
  if (b === 0) return [[fraction(c, a), fraction(0)], [fraction(c, a), fraction(1)]];
  if (a === 0) return [[fraction(0), fraction(c, b)], [fraction(1), fraction(c, b)]];
  if (c === 0) return [[fraction(0), fraction(0)], [fraction(b), fraction(-a)]];
  return [[fraction(0), fraction(c, b)], [fraction(c, a), fraction(0)]];
}

const term = (k, name, first) => {
  if (k === 0) return '';
  const sign = k < 0 ? '-' : first ? '' : '+';
  const value = Math.abs(k) === 1 ? '' : String(Math.abs(k));
  return sign + value + name;
};
export function expressionTex(a, b) { return (term(a, 'x', true) + term(b, 'y', a === 0)) || '0'; }
export function inequalityTex(ineq) { checkInequality(ineq); return expressionTex(ineq.a, ineq.b) + OPERATORS[ineq.op] + ineq.c; }
export function boundaryTex(ineq) { checkInequality(ineq); return expressionTex(ineq.a, ineq.b) + '=' + ineq.c; }
export const pointTex = ([x, y]) => `(${fractionTex(x)},${fractionTex(y)})`;
export const pointText = ([x, y]) => `(${[x, y].map(f => (f.denominator === 1 ? String(f.numerator) : f.numerator + '/' + f.denominator).replace('-', '−')).join(', ')})`;

/** Recorta un polígono convexo (puntos en coma flotante) con el semiplano cerrado a·x+b·y op c. */
export function clipPolygon(polygon, { a, b, c, op }) {
  const sign = op === '<=' || op === '<' ? 1 : -1;
  const value = ([x, y]) => sign * (a * x + b * y - c);
  const out = [];
  for (let i = 0; i < polygon.length; i++) {
    const p = polygon[i], q = polygon[(i + 1) % polygon.length], vp = value(p), vq = value(q);
    if (vp <= 1e-12) out.push(p);
    if ((vp < -1e-12 && vq > 1e-12) || (vp > 1e-12 && vq < -1e-12)) {
      const t = vp / (vp - vq);
      out.push([p[0] + t * (q[0] - p[0]), p[1] + t * (q[1] - p[1])]);
    }
  }
  return out;
}
export const windowPolygon = ({ xMin, xMax, yMin, yMax }) => [[xMin, yMin], [xMax, yMin], [xMax, yMax], [xMin, yMax]];

/** Segmento de la frontera dentro de la ventana (para dibujar). */
export function clipBoundary({ a, b, c }, view) {
  const points = [];
  const add = (x, y) => { if (x >= view.xMin - 1e-9 && x <= view.xMax + 1e-9 && y >= view.yMin - 1e-9 && y <= view.yMax + 1e-9 && !points.some(p => Math.abs(p[0] - x) + Math.abs(p[1] - y) < 1e-9)) points.push([x, y]); };
  if (b !== 0) for (const x of [view.xMin, view.xMax]) add(x, (c - a * x) / b);
  if (a !== 0) for (const y of [view.yMin, view.yMax]) add((c - b * y) / a, y);
  return points.length >= 2 ? points.slice(0, 2) : [];
}

function intersection(p, q) {
  const det = p.a * q.b - q.a * p.b;
  if (det === 0) return null;
  return [fraction(p.c * q.b - q.c * p.b, det), fraction(p.a * q.c - q.a * p.c, det)];
}
const samePoint = (p, q) => p[0].numerator === q[0].numerator && p[0].denominator === q[0].denominator && p[1].numerator === q[1].numerator && p[1].denominator === q[1].denominator;
const value = f => f.numerator / f.denominator;
// Forma n·d ≤ 0 de la restricción para el cono de recesión.
const normal = ({ a, b, op }) => (op === '<=' || op === '<' ? [a, b] : [-a, -b]);
const recession = (ineqs, d) => ineqs.every(i => { const [p, q] = normal(i); return p * d[0] + q * d[1] <= 0; });
function rays(ineqs) {
  const found = [];
  for (const { a, b } of ineqs) for (const d of [[b, -a], [-b, a]]) {
    if (recession(ineqs, d) && !found.some(r => r[0] * d[1] - r[1] * d[0] === 0 && r[0] * d[0] + r[1] * d[1] > 0)) found.push(d);
  }
  return found;
}
function orderVertices(points) {
  if (points.length < 3) return points;
  const cx = points.reduce((s, p) => s + value(p[0]), 0) / points.length, cy = points.reduce((s, p) => s + value(p[1]), 0) / points.length;
  return [...points].sort((p, q) => Math.atan2(value(p[1]) - cy, value(p[0]) - cx) - Math.atan2(value(q[1]) - cy, value(q[0]) - cx));
}

/**
 * Región factible de un sistema con desigualdades no estrictas.
 * kind: 'empty' | 'point' | 'segment' | 'polygon' | 'unbounded'; vertices: puntos exactos ordenados.
 */
export function analyzeRegion(ineqs) {
  ineqs.forEach(checkInequality);
  if (ineqs.some(isStrict)) throw new RangeError('El análisis de regiones admite solo ≤ y ≥.');
  const feasible = p => ineqs.every(i => evaluate(i, p).holds);
  const vertices = [];
  for (let i = 0; i < ineqs.length; i++) for (let j = i + 1; j < ineqs.length; j++) {
    const p = intersection(ineqs[i], ineqs[j]);
    if (p && feasible(p) && !vertices.some(v => samePoint(v, p))) vertices.push(p);
  }
  if (!vertices.length) {
    // Sin vértices: o es vacía, o contiene una recta (todas las fronteras paralelas).
    if (!ineqs.length) return { kind: 'unbounded', vertices, rays: [], lineal: true };
    const [a0, b0] = [ineqs[0].a, ineqs[0].b];
    if (!ineqs.every(i => i.a * b0 - i.b * a0 === 0)) return { kind: 'empty', vertices, rays: [] };
    // Cada restricción es k·t op c, con t = a0·x + b0·y: intersección de intervalos de t.
    let low = -Infinity, high = Infinity;
    for (const i of ineqs) {
      const k = a0 !== 0 ? i.a / a0 : i.b / b0, bound = i.c / k;
      const upper = (i.op === '<=') === k > 0;
      if (upper) high = Math.min(high, bound); else low = Math.max(low, bound);
    }
    return low > high + 1e-12 ? { kind: 'empty', vertices, rays: [] } : { kind: 'unbounded', vertices, rays: [], lineal: true };
  }
  const found = rays(ineqs);
  if (found.length) return { kind: 'unbounded', vertices: orderVertices(vertices), rays: found };
  const kind = vertices.length === 1 ? 'point' : vertices.length === 2 ? 'segment' : 'polygon';
  return { kind, vertices: orderVertices(vertices), rays: [] };
}

/** Optimiza Z = p·x + q·y (enteros) sobre la región. */
export function optimize(ineqs, [p, q], sense = 'max') {
  if (![p, q].every(Number.isSafeInteger)) throw new TypeError('Coeficientes enteros del objetivo.');
  if (!['max', 'min'].includes(sense)) throw new RangeError('Sentido max o min.');
  const region = analyzeRegion(ineqs);
  const z = ([x, y]) => fraction(p * x.numerator * y.denominator + q * y.numerator * x.denominator, x.denominator * y.denominator);
  const values = region.vertices.map(v => ({ point: v, z: z(v) }));
  if (region.kind === 'empty') return { region, values, kind: 'empty' };
  if (region.lineal) throw new RangeError('La comparación de vértices requiere una región con vértices.');
  const s = sense === 'max' ? 1 : -1;
  if (region.rays.some(d => s * (p * d[0] + q * d[1]) > 0)) return { region, values, kind: 'unbounded' };
  const best = values.reduce((m, v) => (s * value(v.z) > s * value(m.z) ? v : m)).z;
  const optimal = values.filter(v => v.z.numerator === best.numerator && v.z.denominator === best.denominator).map(v => v.point);
  const flatRay = region.rays.some(d => p * d[0] + q * d[1] === 0);
  return { region, values, best, optimal, kind: optimal.length > 1 || flatRay ? 'multiple' : 'unique', ray: flatRay };
}

/** Parámetros admitidos por los controles: enteros entre −99 y 99. */
export function parseInteger(text) {
  const clean = String(text).trim().replace('−', '-');
  if (!/^-?\d{1,2}$/.test(clean)) return null;
  return Number(clean);
}

// Casos de las lecciones 6.1, 6.2 y 6.4.
export const halfPlanePresets = Object.freeze({
  source: { label: 'Fuente: x + 2y ≤ 10', ineq: { a: 1, b: 2, c: 10, op: '<=' } },
  vertical: { label: 'Vertical: x ≤ 3', ineq: { a: 1, b: 0, c: 3, op: '<=' } },
  horizontal: { label: 'Horizontal: y > −2', ineq: { a: 0, b: 1, c: -2, op: '>' } },
  origin: { label: 'Por el origen: y ≥ 2x', ineq: { a: -2, b: 1, c: 0, op: '>=' } },
  negative: { label: 'Coeficiente negativo: −2y ≤ 4', ineq: { a: 0, b: -2, c: 4, op: '<=' } },
  practice: { label: 'Tu turno: −x + 2y < 0', ineq: { a: -1, b: 2, c: 0, op: '<' } },
});
const nonNegative = [{ a: 1, b: 0, c: 0, op: '>=' }, { a: 0, b: 1, c: 0, op: '>=' }];
export const regionPresets = Object.freeze({
  source: { label: 'Fuente: x + y ≤ 60, x ≤ 40', view: { xMin: -5, xMax: 70, yMin: -5, yMax: 70 }, ineqs: [{ a: 1, b: 1, c: 60, op: '<=' }, { a: 1, b: 0, c: 40, op: '<=' }, ...nonNegative] },
  empty: { label: 'Vacía: x + y ≤ 2 y x + y ≥ 5', view: { xMin: -1, xMax: 7, yMin: -1, yMax: 7 }, ineqs: [...nonNegative, { a: 1, b: 1, c: 2, op: '<=' }, { a: 1, b: 1, c: 5, op: '>=' }] },
  segment: { label: 'Segmento: x + y ≤ 4 y x + y ≥ 4', view: { xMin: -1, xMax: 6, yMin: -1, yMax: 6 }, ineqs: [...nonNegative, { a: 1, b: 1, c: 4, op: '<=' }, { a: 1, b: 1, c: 4, op: '>=' }] },
  point: { label: 'Punto: x ≥ 1, y ≥ 2, x + y ≤ 3', view: { xMin: -1, xMax: 5, yMin: -1, yMax: 5 }, ineqs: [{ a: 1, b: 0, c: 1, op: '>=' }, { a: 0, b: 1, c: 2, op: '>=' }, { a: 1, b: 1, c: 3, op: '<=' }] },
  unbounded: { label: 'No acotada: x + y ≥ 2 en el primer cuadrante', view: { xMin: -1, xMax: 7, yMin: -1, yMax: 7 }, ineqs: [...nonNegative, { a: 1, b: 1, c: 2, op: '>=' }] },
});
export const objectivePresets = Object.freeze({
  furniture: { label: 'Sillas y mesas (6.4)', view: { xMin: -1, xMax: 16, yMin: -1, yMax: 16 }, ineqs: [{ a: 2, b: 2, c: 18, op: '<=' }, { a: 1, b: 3, c: 42, op: '<=' }, ...nonNegative], objective: [30, 50], sense: 'max', names: ['sillas', 'mesas'] },
  multiple: { label: 'Óptimo múltiple: x + y ≤ 6', view: { xMin: -1, xMax: 8, yMin: -1, yMax: 8 }, ineqs: [...nonNegative, { a: 1, b: 1, c: 6, op: '<=' }], objective: [2, 2], sense: 'max' },
  unbounded: { label: 'Región no acotada: x + y ≥ 2', view: { xMin: -1, xMax: 8, yMin: -1, yMax: 8 }, ineqs: [...nonNegative, { a: 1, b: 1, c: 2, op: '>=' }], objective: [1, 1], sense: 'max' },
  empty: { label: 'Región vacía: x + y ≤ 1 y x + y ≥ 3', view: { xMin: -1, xMax: 5, yMin: -1, yMax: 5 }, ineqs: [...nonNegative, { a: 1, b: 1, c: 1, op: '<=' }, { a: 1, b: 1, c: 3, op: '>=' }], objective: [1, 1], sense: 'max' },
});

// Modelo del tema 8 (lecciones 8.1 y 8.2): distribuciones discretas finitas y binomial.
// Aritmética racional exacta con BigInt; los decimales solo se calculan para mostrar resultados.

const B = v => BigInt(v);
const babs = v => (v < 0n ? -v : v);
function bgcd(a, b) { a = babs(a); b = babs(b); while (b) [a, b] = [b, a % b]; return a; }
/** Fracción exacta {n, d} con d > 0 y irreducible. */
export function rational(n, d = 1n) {
  n = B(n); d = B(d);
  if (d === 0n) throw new RangeError('Denominador nulo.');
  if (d < 0n) { n = -n; d = -d; }
  const g = bgcd(n, d) || 1n;
  return { n: n / g, d: d / g };
}
export const add = (a, b) => rational(a.n * b.d + b.n * a.d, a.d * b.d);
export const sub = (a, b) => rational(a.n * b.d - b.n * a.d, a.d * b.d);
export const mul = (a, b) => rational(a.n * b.n, a.d * b.d);
export const cmp = (a, b) => { const v = a.n * b.d - b.n * a.d; return v < 0n ? -1 : v > 0n ? 1 : 0; };
export const ZERO = rational(0), ONE = rational(1);
export const toNumber = r => Number(r.n) / Number(r.d);

/** Decimal redondeado (mitad hacia arriba) con coma: 0,20480. */
export function decimal(r, places = 4) {
  const scale = 10n ** B(places), neg = r.n < 0n, n = babs(r.n);
  const q = (n * scale * 2n + r.d) / (2n * r.d);
  const s = q.toString().padStart(places + 1, '0');
  const text = places ? s.slice(0, -places) + ',' + s.slice(-places) : s;
  return (neg && q !== 0n ? '−' : '') + text;
}
export const rationalTex = r => (r.d === 1n ? String(r.n) : String.raw`${r.n < 0n ? '-' : ''}\frac{${babs(r.n)}}{${r.d}}`);
export const rationalText = r => (r.d === 1n ? String(r.n) : `${r.n}/${r.d}`).replace('-', '−');

/** Lee 3, −1,5, 0.25, 1/6 o 0,125 como fracción exacta (hasta 4 decimales, |valor| ≤ 1000, denominador ≤ 10 000). */
export function parseRational(text) {
  const clean = String(text).trim().replace(/−/g, '-').replace(',', '.');
  let m = /^(-?)(\d{1,4})\/(\d{1,5})$/.exec(clean);
  if (m) { if (B(m[3]) === 0n) return null; const r = rational(B(m[2]) * (m[1] ? -1n : 1n), B(m[3])); return Math.abs(toNumber(r)) <= 1000 ? r : null; }
  m = /^(-?)(\d{0,4})(?:\.(\d{1,4}))?$/.exec(clean);
  if (!m || (m[2] === '' && !m[3])) return null;
  const decimals = m[3] ?? '', r = rational(B((m[2] || '0') + decimals) * (m[1] ? -1n : 1n), 10n ** B(decimals.length));
  return Math.abs(toNumber(r)) <= 1000 ? r : null;
}

/**
 * Distribución discreta finita a partir de pares (valor, probabilidad).
 * Devuelve los problemas detectados y, si es válida, μ, E(X²), σ², σ y la acumulada.
 */
export function discreteSummary(pairs) {
  const problems = [];
  const values = pairs.map(p => p.x), probs = pairs.map(p => p.p);
  if (!pairs.length) problems.push('empty');
  if (new Set(values.map(rationalText)).size !== values.length) problems.push('repeated');
  if (probs.some(p => cmp(p, ZERO) < 0 || cmp(p, ONE) > 0)) problems.push('range');
  const total = probs.reduce(add, ZERO);
  if (cmp(total, ONE) !== 0) problems.push('sum');
  if (problems.length) return { valid: false, problems, total };
  const sorted = [...pairs].sort((a, b) => cmp(a.x, b.x));
  const mean = sorted.reduce((s, { x, p }) => add(s, mul(x, p)), ZERO);
  const squares = sorted.reduce((s, { x, p }) => add(s, mul(mul(x, x), p)), ZERO);
  const variance = sub(squares, mul(mean, mean));
  let acc = ZERO;
  const rows = sorted.map(({ x, p }) => { acc = add(acc, p); return { x, p, xp: mul(x, p), x2p: mul(mul(x, x), p), F: acc }; });
  return { valid: true, problems, total, mean, squares, variance, deviation: Math.sqrt(toNumber(variance)), rows };
}

export const discretePresets = Object.freeze({
  die: { label: 'Dado equilibrado', pairs: [1, 2, 3, 4, 5, 6].map(x => [String(x), '1/6']) },
  coins: { label: 'Caras en dos monedas', pairs: [['0', '1/4'], ['1', '2/4'], ['2', '1/4']] },
  prize: { label: 'Premio de 0,50 € o 1,50 €', pairs: [['0,5', '1/2'], ['1,5', '1/2']] },
  raffle: { label: 'Rifa: ganar 10 € o perder 1 €', pairs: [['10', '0,05'], ['-1', '0,95']] },
  invalid: { label: 'No es una distribución', pairs: [['0', '0,5'], ['1', '0,6']] },
});

/* ---------- Binomial ---------- */
export function binomialCoefficient(n, k) {
  if (k < 0 || k > n) return 0n;
  k = Math.min(k, n - k); let r = 1n;
  for (let i = 1; i <= k; i++) r = (r * B(n - k + i)) / B(i);
  return r;
}
function power(r, e) { let out = ONE; for (let i = 0; i < e; i++) out = mul(out, r); return out; }
export function checkBinomial(n, p) {
  if (!Number.isInteger(n) || n < 1 || n > 100) throw new RangeError('n entero entre 1 y 100.');
  if (cmp(p, ZERO) < 0 || cmp(p, ONE) > 0) throw new RangeError('p entre 0 y 1.');
}
/** P(X=k) exacta para X ~ B(n,p); sin evaluar 0⁰ en los casos p=0 o p=1. */
export function binomialMass(n, p, k) {
  checkBinomial(n, p);
  if (!Number.isInteger(k) || k < 0 || k > n) return ZERO;
  if (cmp(p, ZERO) === 0) return k === 0 ? ONE : ZERO;
  if (cmp(p, ONE) === 0) return k === n ? ONE : ZERO;
  return mul(rational(binomialCoefficient(n, k)), mul(power(p, k), power(sub(ONE, p), n - k)));
}
export function binomialCdf(n, p, k) {
  if (k < 0) return ZERO;
  let s = ZERO; for (let j = 0; j <= Math.min(k, n); j++) s = add(s, binomialMass(n, p, j));
  return s;
}
/** Suceso como intervalo de enteros [low, high] y su expresión con la acumulada (tabla de 8.2). */
export const EVENTS = Object.freeze({
  eq: { label: 'Exactamente k', range: (k) => [k, k], cdf: k => `F(${k})-F(${k - 1})` },
  le: { label: 'Como máximo k', range: (k, n) => [0, k], cdf: k => `F(${k})` },
  lt: { label: 'Menos de k', range: (k) => [0, k - 1], cdf: k => `F(${k - 1})` },
  ge: { label: 'Al menos k', range: (k, n) => [k, n], cdf: k => `1-F(${k - 1})` },
  gt: { label: 'Más de k', range: (k, n) => [k + 1, n], cdf: k => `1-F(${k})` },
  between: { label: 'Entre a y b, ambos incluidos', range: (a, n, b) => [a, b], cdf: (a, b) => `F(${b})-F(${a - 1})` },
});
export const EVENT_TEX = Object.freeze({ eq: k => `X=${k}`, le: k => String.raw`X\le ${k}`, lt: k => `X<${k}`, ge: k => String.raw`X\ge ${k}`, gt: k => `X>${k}`, between: (a, b) => String.raw`${a}\le X\le ${b}` });

export function binomialEvent(n, p, kind, k, b = k) {
  checkBinomial(n, p);
  if (!Object.hasOwn(EVENTS, kind)) throw new RangeError('Suceso no admitido.');
  if (![k, b].every(Number.isInteger)) throw new RangeError('Umbrales enteros.');
  const [low, high] = EVENTS[kind].range(k, n, b);
  const from = Math.max(0, low), to = Math.min(n, high);
  let probability = ZERO; const included = [];
  for (let j = from; j <= to; j++) { probability = add(probability, binomialMass(n, p, j)); included.push(j); }
  return { probability, included, low, high };
}
export function binomialParameters(n, p) {
  checkBinomial(n, p);
  const mean = mul(rational(n), p), variance = mul(mean, sub(ONE, p));
  return { mean, variance, deviation: Math.sqrt(toNumber(variance)) };
}
export const binomialPresets = Object.freeze({
  basketball: { label: 'Baloncesto: B(5; 0,8)', n: 5, p: '0,8', kind: 'eq', k: 3 },
  atMostTwo: { label: 'Como máximo dos aciertos', n: 5, p: '0,8', kind: 'le', k: 2 },
  atLeastThree: { label: 'Al menos tres aciertos', n: 5, p: '0,8', kind: 'ge', k: 3 },
  between: { label: 'Entre dos y cuatro aciertos', n: 5, p: '0,8', kind: 'between', k: 2, b: 4 },
  coins: { label: 'Diez monedas: B(10; 0,5)', n: 10, p: '0,5', kind: 'ge', k: 8 },
});

// Basado en la aproximación erf y PDF del original de Distribución Normal.
// Se conserva la cola pequeña directamente, evitando restar números próximos a uno.
function validate(mu, sigma) {
  if (!Number.isFinite(mu) || !Number.isFinite(sigma) || sigma <= 0) throw new RangeError('La media debe ser finita y la desviación positiva.');
}
function tail(z) {
  const x = Math.abs(z) / Math.SQRT2, t = 1 / (1 + 0.3275911 * x);
  return 0.5 * (((((1.061405429 * t - 1.453152027) * t + 1.421413741) * t - 0.284496736) * t + 0.254829592) * t) * Math.exp(-x * x);
}
export function normalPDF(x, mu = 0, sigma = 1) {
  validate(mu, sigma);
  if (typeof x !== 'number' || Number.isNaN(x)) throw new RangeError('Valor no válido.');
  const z = (x - mu) / sigma;
  return Math.exp(-0.5 * z * z) / (sigma * Math.sqrt(2 * Math.PI));
}
export function normalCDF(x, mu = 0, sigma = 1) {
  validate(mu, sigma);
  if (typeof x !== 'number' || Number.isNaN(x)) throw new RangeError('Valor no válido.');
  const z = (x - mu) / sigma;
  if (z === 0) return 0.5;
  return z < 0 ? tail(z) : 1 - tail(z);
}
// Probabilidad entre los extremos ordenados: la interfaz informa si se invierten.
export function normalInterval(a, b, mu = 0, sigma = 1) {
  validate(mu, sigma);
  if (!Number.isFinite(a) || !Number.isFinite(b)) throw new RangeError('Extremos finitos requeridos.');
  const lo = Math.min(a, b), hi = Math.max(a, b);
  if (lo === hi) return 0;
  const za = (lo - mu) / sigma, zb = (hi - mu) / sigma;
  const value = za >= 0 ? tail(za) - tail(zb) : normalCDF(hi, mu, sigma) - normalCDF(lo, mu, sigma);
  return Math.max(0, Math.min(1, value));
}
export function normalReadings({ mu, sigma, a, b, k }) {
  if (![a,b,k].every(Number.isFinite)) throw new RangeError('Valores finitos requeridos.');
  const lo = Math.min(a,b), hi = Math.max(a,b);
  return { mu, sigma, a, b, k, lo, hi, reversed: a > b,
    Fk: normalCDF(k,mu,sigma), Fa: normalCDF(lo,mu,sigma), Fb: normalCDF(hi,mu,sigma),
    interval: normalInterval(a,b,mu,sigma), za: (lo-mu)/sigma, zb:(hi-mu)/sigma, zk:(k-mu)/sigma };
}

export function logarithmicModel(a, c, h, k) {
  if (![a, c, h, k].every(Number.isFinite) || a <= 0 || a === 1 || c === 0) throw new RangeError('Base positiva distinta de 1 y coeficiente no nulo');
  const increasing = c / Math.log(a) > 0;
  return {
    a, c, h, k, increasing,
    value: x => x > h ? c * Math.log(x - h) / Math.log(a) + k : NaN,
    derivative: x => x > h ? c / ((x - h) * Math.log(a)) : NaN,
    secondDerivative: x => x > h ? -c / ((x - h) ** 2 * Math.log(a)) : NaN,
    zero: h + a ** (-k / c),
    atBoundary: increasing ? -Infinity : Infinity,
    atInfinity: increasing ? Infinity : -Infinity,
  };
}

export function periodsToFactor(rate, factor) {
  if (!Number.isFinite(rate) || rate <= 0 || !Number.isFinite(factor) || factor <= 1) throw new RangeError('Crecimiento positivo y factor mayor que 1');
  return Math.log(factor) / Math.log1p(rate);
}

// q: inversión en miles de euros; resultado: puntos de un índice hipotético.
export const reachModel = {
  value: q => q >= 0 ? 100 * Math.log1p(q) : NaN,
  derivative: q => q >= 0 ? 100 / (1 + q) : NaN,
};

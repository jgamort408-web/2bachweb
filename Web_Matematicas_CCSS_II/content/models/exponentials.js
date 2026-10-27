// Modelo compartido por la gráfica, la tabla y las comprobaciones matemáticas.
export function exponentialModel(a, c, k) {
  if (![a, c, k].every(Number.isFinite) || a <= 0 || a === 1 || c === 0) throw new RangeError('Se requiere a>0, a≠1 y C≠0, con parámetros finitos');
  const increasing = c * Math.log(a) > 0;
  return {
    a, c, k, increasing,
    value: x => c * a ** x + k,
    derivative: x => c * a ** x * Math.log(a),
    atZero: c + k,
    lower: c > 0 ? k : -Infinity,
    upper: c > 0 ? Infinity : k,
    left: a > 1 ? k : Math.sign(c) * Infinity,
    right: a > 1 ? Math.sign(c) * Infinity : k,
    zero: -k / c > 0 ? Math.log(-k / c) / Math.log(a) : null,
  };
}

export function periodicValue(initial, rate, periods) {
  if (![initial, rate, periods].every(Number.isFinite) || initial <= 0 || rate <= -1 || periods < 0) throw new RangeError('Modelo positivo: valor inicial>0, tasa>−1 y tiempo≥0');
  return initial * (1 + rate) ** periods;
}

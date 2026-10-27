export const holeAndPole = {
  excluded: [-1, 2],
  value: x => x === -1 || x === 2 ? NaN : (x * x - 1) / (x * x - x - 2),
  reduced: x => (x - 1) / (x - 2),
  derivative: x => x === -1 || x === 2 ? NaN : -1 / ((x - 2) ** 2),
};
export const obliqueRational = {
  value: x => x === 1 ? NaN : x * x / (x - 1),
  derivative: x => x === 1 ? NaN : x * (x - 2) / ((x - 1) ** 2),
  line: x => x + 1,
};
export const cancellationCases = {
  equal: { numeratorPower: 1, denominatorPower: 1 },
  zero: { numeratorPower: 2, denominatorPower: 1 },
  pole: { numeratorPower: 1, denominatorPower: 2 },
};
export function cancellationModel(kind, a, k) {
  if (!Object.hasOwn(cancellationCases, kind) || ![-1, 1, 2].includes(a) || ![-2, 2].includes(k)) throw new RangeError('Parámetros fuera del explorador');
  const { numeratorPower: m, denominatorPower: n } = cancellationCases[kind];
  return {
    kind, a, k, m, n,
    value: x => x === a ? NaN : k * (x - a) ** m / (x - a) ** n,
    limit: m >= n ? m === n ? k : 0 : null,
    left: m < n ? -Math.sign(k) * Infinity : m === n ? k : 0,
    right: m < n ? Math.sign(k) * Infinity : m === n ? k : 0,
  };
}

export const joiningCases = {
  smooth: { label: 'Unión suave', left: t => (t + 1) ** 2, right: t => 2 * t + 1, leftLimit: 1, rightLimit: 1, point: 1, leftSlope: 2, rightSlope: 2 },
  corner: { label: 'Esquina', left: t => -t - 1, right: t => t - 1, leftLimit: -1, rightLimit: -1, point: -1, leftSlope: -1, rightSlope: 1 },
  jump: { label: 'Salto', left: t => t + 1, right: t => t + 3, leftLimit: 1, rightLimit: 3, point: 3, leftSlope: 1, rightSlope: 1 },
  isolated: { label: 'Valor aislado', left: t => (t + 1) ** 2, right: t => 2 * t + 1, leftLimit: 1, rightLimit: 1, point: 3, leftSlope: 2, rightSlope: 2 },
  hole: { label: 'Punto sin definir', left: t => (t + 1) ** 2, right: t => 2 * t + 1, leftLimit: 1, rightLimit: 1, point: null, leftSlope: 2, rightSlope: 2 },
};
export function joiningModel(kind, a) {
  if (!Object.hasOwn(joiningCases, kind) || ![-1, 0, 1].includes(a)) throw new RangeError('Caso o punto no admitido');
  const spec = joiningCases[kind];
  const continuous = spec.point !== null && spec.leftLimit === spec.rightLimit && spec.point === spec.leftLimit;
  return { ...spec, kind, a, continuous, differentiable: continuous && spec.leftSlope === spec.rightSlope,
    value: x => x < a ? spec.left(x - a) : x > a ? spec.right(x - a) : spec.point === null ? NaN : spec.point,
  };
}
export const progressiveTariff = {
  value: q => q < 0 ? NaN : q <= 10 ? 2 * q : 20 + 3 * (q - 10),
};
export const absoluteStudy = {
  value: x => Math.abs(x - 1) - 2,
  derivative: x => x < 1 ? -1 : x > 1 ? 1 : NaN,
};

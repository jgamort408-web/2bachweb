// Modelo del ejemplo de 2.1, compartido por la gráfica y las comprobaciones.
export const cubicStudy = {
  value: x => x ** 3 - 3 * x,
  derivative: x => 3 * x * x - 3,
  secondDerivative: x => 6 * x,
  roots: [-Math.sqrt(3), 0, Math.sqrt(3)],
  extrema: [{ x: -1, y: 2, kind: 'maximum' }, { x: 1, y: -2, kind: 'minimum' }],
};

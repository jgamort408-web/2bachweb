// Cuantiles bilaterales de la normal estándar, sin redondeo previo.
export const criticalValues = Object.freeze({90:1.6448536269514722,95:1.959963984540054,99:2.5758293035489004});

export function meanConfidenceInterval({mean,sigma,n,confidence}) {
  if (!Number.isFinite(mean) || !Number.isFinite(sigma) || sigma <= 0 || !Number.isInteger(n) || n < 1 || !Object.hasOwn(criticalValues,confidence)) throw new RangeError('Datos del intervalo fuera del dominio admitido.');
  const z=criticalValues[confidence], standardError=sigma/Math.sqrt(n), margin=z*standardError;
  return {mean,sigma,n,confidence,z,standardError,margin,lower:mean-margin,upper:mean+margin,width:2*margin};
}

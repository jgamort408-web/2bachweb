import {normalCDF} from './normal-distribution.js';

// Los ejemplos originales indican una población normal y muestras independientes.
export function samplingMeanReadings({mu,sigma,n,threshold}) {
  if(![mu,sigma,threshold].every(Number.isFinite)||sigma<=0||!Number.isInteger(n)||n<1) throw new RangeError('Parámetros de muestra no válidos');
  const standardError=sigma/Math.sqrt(n);
  return {
    mu,sigma,n,threshold,standardError,
    zIndividual:(threshold-mu)/sigma,
    zMean:(threshold-mu)/standardError,
    pIndividual:normalCDF(threshold,mu,sigma),
    pMean:normalCDF(threshold,mu,standardError)
  };
}

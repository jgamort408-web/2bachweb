import {binomialPMF} from './binomial-normal-approximation.js';
import {normalCDF} from './normal-distribution.js';

// Suceso estricto: proporción de éxitos mayor que threshold.
export function samplingProportionReadings({n,p,threshold}){
  if(!Number.isInteger(n)||n<1||n>200||!Number.isFinite(p)||p<=0||p>=1||!Number.isFinite(threshold)||threshold<0||threshold>=1)throw new RangeError('Parámetros de proporción no válidos');
  const q=1-p,standardError=Math.sqrt(p*q/n),minimumCount=Math.floor(n*threshold)+1;
  const exact=binomialPMF(n,p).slice(minimumCount).reduce((sum,value)=>sum+value,0);
  const correctedBoundary=(minimumCount-.5)/n;
  return {n,p,q,threshold,standardError,minimumCount,exact,
    normalApprox:1-normalCDF(threshold,p,standardError),
    correctedApprox:1-normalCDF(correctedBoundary,p,standardError),
    z:(threshold-p)/standardError,
    correctedZ:(correctedBoundary-p)/standardError,
    adequate:n*p>=5&&n*q>=5};
}

import {normalCDF,normalInterval} from './normal-distribution.js';

// Recurrencia del original; se inicia en el extremo de mayor estabilidad.
export function binomialPMF(n,p){
  if(!Number.isInteger(n)||n<1||n>200||!Number.isFinite(p)||p<=0||p>=1)throw new RangeError('n entero entre 1 y 200; 0 < p < 1');
  const reverse=p>.5,q=reverse?1-p:p, values=[(1-q)**n];
  for(let k=0;k<n;k++)values.push(values[k]*(n-k)/(k+1)*q/(1-q));
  return reverse?values.reverse():values;
}
export function approximationReadings({n,p,K,A,B,mode}){
  const pmf=binomialPMF(n,p);
  if(![K,A,B].every(x=>Number.isInteger(x)&&x>=0&&x<=n)||![0,1].includes(mode))throw new RangeError('Límites enteros dentro de 0..n y modo 0 o 1');
  const mu=n*p,sigma=Math.sqrt(n*p*(1-p)),lo=mode?Math.min(A,B):0,hi=mode?Math.max(A,B):K;
  const exact=Math.min(1,pmf.slice(lo,hi+1).reduce((a,b)=>a+b,0));
  const lower=mode?lo-.5:-Infinity,upper=hi+.5;
  const approximate=mode?normalInterval(lower,upper,mu,sigma):normalCDF(upper,mu,sigma);
  return {n,p,K,A,B,mode,pmf,mu,sigma,lo,hi,lower,upper,exact,approximate,error:Math.abs(exact-approximate),adequate:mu>=5&&n*(1-p)>=5,zlo:(lower-mu)/sigma,zhi:(upper-mu)/sigma};
}

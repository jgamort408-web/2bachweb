export const CRITICAL_Z={90:1.6448536269514722,95:1.959963984540054,99:2.5758293035489004};

export function marginForMean({confidence,sigma,n}){
  const z=CRITICAL_Z[confidence];
  if(!z||!Number.isFinite(sigma)||sigma<=0||!Number.isSafeInteger(n)||n<1)throw new RangeError('Confianza, desviación o tamaño no válidos');
  return z*sigma/Math.sqrt(n);
}

export function planSampleForMean({confidence,sigma,targetMargin}){
  const z=CRITICAL_Z[confidence];
  if(!z||!Number.isFinite(sigma)||sigma<=0||!Number.isFinite(targetMargin)||targetMargin<=0)throw new RangeError('Confianza, desviación u objetivo no válidos');
  const raw=(z*sigma/targetMargin)**2;
  if(!Number.isFinite(raw)||raw>Number.MAX_SAFE_INTEGER)throw new RangeError('El tamaño requerido supera el rango calculable');
  const n=Math.max(1,Math.ceil(raw));
  return {confidence,sigma,targetMargin,z,raw,n,achievedMargin:marginForMean({confidence,sigma,n})};
}

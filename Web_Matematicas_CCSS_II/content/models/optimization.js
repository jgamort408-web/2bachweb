// Modelo didáctico: precio por tonelada p(q)=p0−q; coste 10q+F.
export function profitModel(price, fixed, capacity, mode='continuous') {
  if (![35,50].includes(price) || ![100,500].includes(fixed) || ![8,16,24].includes(capacity) || !['continuous','integer'].includes(mode)) throw new RangeError('Escenario no admitido');
  const margin=price-10, stationary=margin/2;
  const value=q=>-q*q+margin*q-fixed;
  const admissible=q=>Number.isFinite(q)&&q>=0&&q<=capacity&&(mode==='continuous'||Number.isInteger(q));
  const proposals=mode==='continuous'?[0,capacity,stationary]:[0,capacity,Math.floor(stationary),Math.ceil(stationary)];
  const candidates=[...new Set(proposals.filter(admissible))].sort((a,b)=>a-b).map(q=>({q,value:value(q)}));
  const bestValue=Math.max(...candidates.map(p=>p.value));
  const best=candidates.filter(p=>Math.abs(p.value-bestValue)<1e-9).map(p=>p.q);
  return {price,fixed,capacity,mode,margin,stationary,value,admissible,candidates,best,bestValue,
    revenue:q=>q*(price-q),cost:q=>10*q+fixed,derivative:q=>margin-2*q};
}
export const fenceModel={
  area:x=>x>0&&x<30?x*(60-2*x):NaN,
  length:x=>60-2*x,
  derivative:x=>60-4*x,
};
export const averageCostModel={
  value:q=>q>0?q+100/q:NaN,
  derivative:q=>q>0?1-100/(q*q):NaN,
};

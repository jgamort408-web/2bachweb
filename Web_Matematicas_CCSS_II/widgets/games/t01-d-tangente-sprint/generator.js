/** Polinomios con punto y pendiente controlados; ninguna respuesta usa eval. */
export function generateTangentSession(seed) {
  let state=seed>>>0;
  const integer=(min,max)=>{
    state=(Math.imul(1664525,state)+1013904223)>>>0;
    return min+Math.floor(state/4294967296*(max-min+1));
  };
  return Array.from({length:6},(_,index)=>{
    const a=integer(-2,2), y=integer(-2,2), k=integer(0,1)?1:-1;
    const slope=[1,5].includes(index)?0:integer(1,2)*(integer(0,1)?1:-1);
    const degree=index===2||index===4?3:2;
    // f(x) = k(x-a)^degree + slope(x-a) + y.
    const coefficients=degree===2
      ? [k*a*a-slope*a+y,slope-2*k*a,k,0]
      : [-k*a**3-slope*a+y,3*k*a*a+slope,-3*k*a,k];
    const kind=index>=4?'normal':'tangent';
    const vertical=kind==='normal'&&slope===0;
    const lineSlope=vertical?null:kind==='normal'?-1/slope:slope;
    return {id:'tangent-'+index,a,y,slope,k,degree,coefficients,kind,
      line:vertical?{type:'vertical',x:a}:{type:'ordinary',m:lineSlope,b:y-lineSlope*a}};
  });
}
export function polynomialValue(coefficients,x) {
  return coefficients.reduceRight((sum,coefficient)=>sum*x+coefficient,0);
}
export function polynomialTex(coefficients) {
  const terms=[];
  for(let degree=coefficients.length-1;degree>=0;degree--){
    const coefficient=coefficients[degree];if(!coefficient)continue;
    const magnitude=Math.abs(coefficient);
    const term=(degree&&magnitude===1?'':magnitude)+(degree?'x'+(degree===1?'':'^{'+degree+'}'):'');
    terms.push((coefficient<0?'-':terms.length?'+':'')+term);
  }
  return terms.join('')||'0';
}
export function parseNumber(input) {
  const text=String(input).trim().replaceAll(',','.');
  const decimal='[+-]?(?:\\d+(?:\\.\\d*)?|\\.\\d+)';
  if(!new RegExp('^'+decimal+'(?:\\s*/\\s*'+decimal+')?$').test(text))return null;
  const parts=text.split('/').map(Number);
  if(parts.length===2&&parts[1]===0)return null;
  const value=parts.length===2?parts[0]/parts[1]:parts[0];
  return Number.isFinite(value)?value:null;
}
export function sameNumber(a,b) {
  return Number.isFinite(a)&&Number.isFinite(b)&&Math.abs(a-b)<1e-8;
}
export function sameLine(candidate,answer) {
  if(candidate.type!==answer.type)return false;
  return answer.type==='vertical'?sameNumber(candidate.x,answer.x):
    sameNumber(candidate.m,answer.m)&&sameNumber(candidate.b,answer.b);
}

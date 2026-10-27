/** Reparación única: se fijan pendiente izquierda, rama derecha y punto de unión. */
export function generateRepairSession(seed) {
  let state = seed >>> 0;
  const integer = (min,max) => {
    state=(Math.imul(1664525,state)+1013904223)>>>0;
    return min+Math.floor(state/4294967296*(max-min+1));
  };
  const kinds=['continuous','removable','jump','both'];
  return Array.from({length:6},(_,i)=>{
    const a=integer(-2,2), m=integer(1,3)*(integer(0,1)?1:-1), c=integer(-3,3);
    const targetValue=a*a+c, targetB=targetValue-m*a;
    const kind=kinds[(i+(seed>>>0)%4)%4];
    const offset=integer(1,3)*(integer(0,1)?1:-1);
    const b=targetB+(['jump','both'].includes(kind)?offset:0);
    const pointValue=targetValue+(['removable','both'].includes(kind)?integer(1,3):0);
    return {id:'repair-'+i,a,m,c,b,pointValue,targetB,targetValue,kind};
  });
}
export function analyzeRepair(question, b=question.b, pointValue=question.pointValue) {
  const left=question.m*question.a+b, right=question.a**2+question.c;
  return {left,right,pointValue,diagnosis:left!==right?'jump':left===pointValue?'continuous':'removable'};
}
export function parseAnswer(value) {
  const text=String(value).trim();
  if (!/^[+-]?(?:\d+(?:[.,]\d*)?|[.,]\d+)$/.test(text)) return null;
  const result=Number(text.replace(',','.'));
  return Number.isFinite(result)?result:null;
}

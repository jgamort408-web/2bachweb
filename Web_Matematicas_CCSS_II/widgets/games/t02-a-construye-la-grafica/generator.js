/** Modelo puro: seis retos, datos reproducibles y distractores de una sola transformación. */
export const format = value => (value===0?0:value).toLocaleString('es-ES',{maximumFractionDigits:3});
export function valueAt(m,x) {
  if(m.family==='quadratic')return m.a*(x-m.h)**2+m.k;
  if(m.family==='rational')return x===m.h?NaN:m.a/(x-m.h)+m.k;
  return m.a*2**(x-m.h)+m.k;
}
export function derivativeAt(m,x) {
  if(m.family==='quadratic')return 2*m.a*(x-m.h);
  if(m.family==='rational')return x===m.h?NaN:-m.a/(x-m.h)**2;
  return m.a*Math.LN2*2**(x-m.h);
}
export function roots(m) {
  if(m.family==='quadratic')return m.k===0?[m.h]:-m.k/m.a<0?[]:[m.h-Math.sqrt(-m.k/m.a),m.h+Math.sqrt(-m.k/m.a)];
  if(m.family==='rational')return m.k===0?[]:[m.h-m.a/m.k];
  return -m.k/m.a>0?[m.h+Math.log2(-m.k/m.a)]:[];
}
export function facts(m) {
  const zeros=roots(m), y=valueAt(m,0), h=format(m.h), k=format(m.k);
  return {
    domain:m.family==='rational'?'Todos los reales salvo x='+h+'.':'Todos los números reales.',
    cuts:(zeros.length?'Cortes con X (abscisas aproximadas): '+zeros.map(format).join('; ')+'.':'No corta el eje X.')+' '+(Number.isFinite(y)?'Corte con Y: (0; '+format(y)+').':'No corta Y: x=0 está excluido.'),
    asymptotes:m.family==='quadratic'?'No tiene asíntotas.':m.family==='rational'?'Vertical x='+h+' y horizontal y='+k+'.':'Horizontal y='+k+' cuando x tiende a −∞; no tiene verticales.',
    monotonic:m.family==='quadratic'?(m.a>0?'f′<0 antes de '+h+' y f′>0 después: decrece y luego crece.':'f′>0 antes de '+h+' y f′<0 después: crece y luego decrece.'):m.family==='rational'?(m.a>0?'f′<0: decrece en cada intervalo separado por '+h+'.':'f′>0: crece en cada intervalo separado por '+h+'.'):(m.a>0?'f′>0: creciente en todo ℝ.':'f′<0: decreciente en todo ℝ.'),
    extrema:m.family==='quadratic'?(m.a>0?'Mínimo':'Máximo')+' absoluto en ('+h+'; '+k+').':'No tiene máximos ni mínimos.'
  };
}
export const factLabels={domain:'Dominio',cuts:'Cortes',asymptotes:'Asíntotas',monotonic:'Crecimiento',extrema:'Extremos'};
export function formula(m) {
  const x=m.h===0?'x':`(x${m.h>0?'-':'+'}${Math.abs(m.h)})`;
  const term=m.family==='quadratic'?`${m.a===1?'':'-'}${x}^2`:m.family==='rational'?`\\frac{${m.a}}{${x}}`:`${m.a===1?'':'-'}2^{${x}}`;
  return `f(x)=${term}${m.k===0?'':(m.k>0?'+':'')+m.k}`;
}
export function mismatch(target, candidate) {
  const expected=facts(target),actual=facts(candidate);
  const key=Object.keys(expected).find(key=>expected[key]!==actual[key]);
  return key?{key,expected:expected[key],actual:actual[key]}:null;
}
export function generateGraphSession(seed) {
  let state=seed>>>0;
  const random=()=>{state=(Math.imul(1664525,state)+1013904223)>>>0;return state/4294967296;};
  const pick=arr=>arr[Math.floor(random()*arr.length)];
  const shuffle=arr=>{for(let i=arr.length-1;i>0;i--){const j=Math.floor(random()*(i+1));[arr[i],arr[j]]=[arr[j],arr[i]];}return arr;};
  const seen=new Set();
  return ['quadratic','rational','exponential','quadratic','rational','exponential'].map((family,index)=>{
    let target;
    do{target={family,a:pick([-1,1]),h:pick([-2,-1,0,1,2]),k:pick([-2,-1,1,2])};}while(seen.has(JSON.stringify(target)));
    seen.add(JSON.stringify(target));
    const candidates=[target,{...target,h:target.h+1},{...target,k:target.k+1},{...target,a:-target.a}];
    // k+1 puede ser cero: roots/facts deben contemplar esos distractores.
    const options=shuffle(candidates.map((model,i)=>({id:'g'+i,model})));
    return {id:'graph-'+index,target,options,correct:'g0'};
  });
}
/** Transición independiente de la interfaz: no puntúa dos veces un reto. */
export function initialRound(){return {attempts:0,done:false,points:0,hinted:false,firstTry:false};}
export function answerRound(state,correct){
  if(state.done)return state;
  const attempts=state.attempts+1,done=correct||attempts===2;
  return {...state,attempts,done,points:correct?(attempts===1?100:50):0,firstTry:correct&&attempts===1};
}

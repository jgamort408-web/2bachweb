const tex=String.raw;
const gcd=(a,b)=>b?gcd(b,a%b):Math.abs(a);
export function fraction(n,d=12){const g=gcd(n,d);return {n:n/g,d:d/g};}
export const valueOf=q=>q.n/q.d;
export const fractionText=q=>q.d===1?String(q.n):q.n+'/'+q.d;
export const fractionTex=q=>q.d===1?String(q.n):tex`${q.n<0?'-':''}\frac{${Math.abs(q.n)}}{${q.d}}`;
export function parseAnswer(raw){
 const s=String(raw??'').trim().replaceAll(',','.').replaceAll('−','-');
 if(!/^[+-]?(?:\d+(?:\.\d*)?|\.\d+)(?:\s*\/\s*[+-]?(?:\d+(?:\.\d*)?|\.\d+))?$/.test(s))return null;
 const [n,d='1']=s.split('/').map(Number),v=n/d;
 return d!==0&&Number.isFinite(v)&&Math.abs(v)<=1e9?v:null;
}
export function generateAreas(seed=1){
 let random=Number(seed)>>>0;
 const pick=a=>{random=(Math.imul(random,1664525)+1013904223)>>>0;return a[Math.floor(random/4294967296*a.length)];};
 return ['line','quadratic','cubic','contact','endpoint','constant-sign'].map((kind,index)=>{
  const h=pick([-2,-1,0,1,2]),k=pick([-3,-2,-1,1,2,3]),u=h===0?'x':tex`(x${h<0?'+':'-'}${Math.abs(h)})`;
  let a=h-2,b=h+2,cuts=[],roots=[],f,F,value,F12;
  if(kind==='line'){b=h+3;cuts=roots=[h];f=tex`${k}${u}`;F=tex`\frac{${k}}{2}${u}^2`;value=x=>k*(x-h);F12=x=>6*k*(x-h)**2;}
  else if(kind==='quadratic'||kind==='endpoint'){if(kind==='endpoint')a=h-1;cuts=kind==='endpoint'?[h+1]:[h-1,h+1];roots=[h-1,h+1];f=tex`${k}\left[${u}^2-1\right]`;F=tex`${k}\left[\frac{${u}^3}{3}-${u}\right]`;value=x=>k*((x-h)**2-1);F12=x=>k*(4*(x-h)**3-12*(x-h));}
  else if(kind==='cubic'){cuts=roots=[h-1,h,h+1];f=tex`${k}\left[${u}^3-${u}\right]`;F=tex`${k}\left[\frac{${u}^4}{4}-\frac{${u}^2}{2}\right]`;value=x=>k*((x-h)**3-(x-h));F12=x=>k*(3*(x-h)**4-6*(x-h)**2);}
  else {const extra=kind==='constant-sign';roots=extra?[]:[h];f=extra?tex`${k}\left[${u}^2+1\right]`:tex`${k}${u}^2`;F=extra?tex`${k}\left[\frac{${u}^3}{3}+${u}\right]`:tex`\frac{${k}}3${u}^3`;value=x=>k*((x-h)**2+Number(extra));F12=x=>k*(4*(x-h)**3+Number(extra)*12*(x-h));}
  const bounds=[a,...cuts,b],segments=bounds.slice(0,-1).map((left,i)=>{const right=bounds[i+1],raw=F12(right)-F12(left);return {a:left,b:right,integral:fraction(raw),sign:Math.sign(raw)};});
  const sum=segments.reduce((s,t)=>s+12*valueOf(t.integral),0),area=segments.reduce((s,t)=>s+12*Math.abs(valueOf(t.integral)),0);
  const explanation=kind==='contact'?'La raíz interior es un contacto: no cambia el signo. Dividir ahí sería válido, pero no necesario; pedimos la partición mínima.':kind==='endpoint'?'Una raíz coincide con el extremo izquierdo: ya es frontera. Solo se añade la raíz interior que cambia el signo.':cuts.length?'Separa los ceros interiores donde cambia el signo. Los extremos ya delimitan el intervalo.':'La función no se anula y conserva el signo: no hace falta ningún corte interior.';
  return {id:'area-'+index,kind,k,h,a,b,f,F,value,primitive:x=>F12(x)/12,cuts,roots,segments,integral:fraction(Math.round(sum)),area:fraction(Math.round(area)),candidates:Array.from({length:b-a-1},(_,i)=>a+i+1),explanation};
 });
}
export const createAreaState=()=>({index:0,phase:'cuts',attempts:0,score:0,hints:[],results:[]});
export function assessArea(state,r,input){
 if(!['cuts','integrals','totals'].includes(state.phase))return {state,ignored:true};
 let correct;
 if(state.phase==='cuts'){
  if(!Array.isArray(input)||input.some(x=>!r.candidates.includes(x))||new Set(input).size!==input.length)return {state,invalid:true};
  correct=input.length===r.cuts.length&&r.cuts.every(x=>input.includes(x));
 }else{
  const expected=state.phase==='integrals'?r.segments.map(t=>valueOf(t.integral)):[valueOf(r.integral),valueOf(r.area)];
  if(!Array.isArray(input)||input.length!==expected.length)return {state,invalid:true};
  const values=input.map(parseAnswer);
  if(values.some(v=>v===null))return {state,invalid:true};
  correct=values.every((v,i)=>Math.abs(v-expected[i])<=.005000001);
 }
 const attempts=state.attempts+1,done=correct||attempts===2,points=correct?(attempts===1?100:50):0;
 return {correct,done,points,state:{...state,attempts,score:state.score+points,phase:done?state.phase+'-done':state.phase,results:done?[...state.results,{id:r.id,stage:state.phase,correct,attempts,points}]:state.results}};
}
export function advanceArea(state,total=6){
 if(state.phase==='cuts-done')return {...state,phase:'integrals',attempts:0};
 if(state.phase==='integrals-done')return {...state,phase:'totals',attempts:0};
 if(state.phase==='totals-done')return {...state,index:state.index+1,phase:state.index+1===total?'summary':'cuts',attempts:0};
 return state;
}
export function hintArea(state){
 const key=state.index+'-'+state.phase;
 return !['cuts','integrals','totals'].includes(state.phase)||state.hints.includes(key)?state:{...state,hints:[...state.hints,key]};
}

/** g(x)=a f(b(x-h))+k. Las acciones transforman la gráfica actual. */
export const identity=()=>({a:1,b:1,h:0,k:0});
export const actions={left:'Izquierda 1',right:'Derecha 1',up:'Arriba 1',down:'Abajo 1',vDouble:'Alturas ×2',vHalf:'Alturas ÷2',flipX:'Reflejar en X',hDouble:'Anchuras ×2',hHalf:'Anchuras ÷2',flipY:'Reflejar en Y'};
export const families={quadratic:{title:'Polinomio',tex:'x^2+x'},absolute:{title:'Valor absoluto',tex:'|x-1|'},rational:{title:'Racional',tex:'\\frac1{x-1}'}};
export function baseValue(family,u){return family==='quadratic'?u*u+u:family==='absolute'?Math.abs(u-1):u===1?NaN:1/(u-1);}
export function valueAt(family,s,x){return s.a*baseValue(family,s.b*(x-s.h))+s.k;}
export function applyAction(s,action){
 const n={...s};
 switch(action){
  case 'left':n.h--;break;case 'right':n.h++;break;case 'up':n.k++;break;case 'down':n.k--;break;
  case 'vDouble':n.a*=2;n.k*=2;break;case 'vHalf':n.a/=2;n.k/=2;break;case 'flipX':n.a=-n.a;n.k=-n.k;break;
  case 'hDouble':n.b/=2;n.h*=2;break;case 'hHalf':n.b*=2;n.h/=2;break;case 'flipY':n.b=-n.b;n.h=-n.h;break;
  default:throw new RangeError('Acción desconocida');
 }
 if(Math.abs(n.a)<.25||Math.abs(n.a)>4||Math.abs(n.b)<.25||Math.abs(n.b)>4||Math.abs(n.h)>6||Math.abs(n.k)>6)return null;
 for(const key of Object.keys(n))if(n[key]===0)n[key]=0;
 return n;
}
export function invariants(family,s){
 const {a,b,h,k}=s;
 if(family==='quadratic')return [a*b*b,a*b-2*a*b*b*h,a*(b*b*h*h-b*h)+k];
 if(family==='absolute')return [a*Math.abs(b),h+1/b,k];
 return [a/b,h+1/b,k];
}
export function sameGraph(family,s,t){return invariants(family,s).every((v,i)=>Math.abs(v-invariants(family,t)[i])<1e-9);}
export function mappedPoint(s,u,v){return {x:s.h+u/s.b,y:s.a*v+s.k};}
export const fmt=v=>(v===0?0:v).toLocaleString('es-ES',{maximumFractionDigits:4});
const texNum=v=>String(v===0?0:v);
export function expression(s){
 const inner=s.h===0?'x':`(x${s.h>0?'-':'+'}${texNum(Math.abs(s.h))})`;
 const arg=s.b===1?inner:s.b===-1?'-'+inner:texNum(s.b)+inner;
 return `${s.a===1?'':s.a===-1?'-':texNum(s.a)}f\\left(${arg}\\right)${s.k===0?'':s.k>0?'+'+texNum(s.k):texNum(s.k)}`;
}
export function description(family,s){
 const v=invariants(family,s);
 if(family==='rational')return `Dominio: reales salvo ${fmt(v[1])}. Asíntotas x=${fmt(v[1])} e y=${fmt(v[2])}. Coeficiente de la fracción: ${fmt(v[0])}.`;
 if(family==='absolute')return `Vértice (${fmt(v[1])}; ${fmt(v[2])}), ${v[0]>0?'mínimo':'máximo'} absoluto. Factor de la V: ${fmt(v[0])}. Dominio: todos los reales.`;
 const x=-v[1]/(2*v[0]),y=valueAt(family,s,x);
 return `Vértice (${fmt(x)}; ${fmt(y)}), ${v[0]>0?'mínimo':'máximo'} absoluto. Coeficiente de x²: ${fmt(v[0])}. Dominio: todos los reales.`;
}
export function score(moves,shown=false){return shown?0:Math.max(10,100-5*moves);}
export function generateTransformSession(seed){
 let state=seed>>>0;const rand=()=>{state=(Math.imul(1664525,state)+1013904223)>>>0;return state/4294967296;};
 const pick=arr=>arr[Math.floor(rand()*arr.length)];
 const seen=new Set();
 return ['quadratic','absolute','rational','quadratic','absolute','rational'].map((family,i)=>{
  let route,target,key;
  do {
  route=[];
  if(i>=2)route.push(pick(['hDouble','hHalf']));
  if(i>=3)route.push('flipY');
  route.push(pick(['vDouble','vHalf']));
  if(i===1||i>=4)route.push('flipX');
  const h=pick([-2,-1,1,2]),k=pick([-2,-1,1,2]);
  route.push(...Array(Math.abs(h)).fill(h>0?'right':'left'),...Array(Math.abs(k)).fill(k>0?'up':'down'));
  target=route.reduce((s,action)=>applyAction(s,action),identity());
  key=family+JSON.stringify(invariants(family,target));
  } while(seen.has(key));
  seen.add(key);
  return {family,target,route};
 });
}

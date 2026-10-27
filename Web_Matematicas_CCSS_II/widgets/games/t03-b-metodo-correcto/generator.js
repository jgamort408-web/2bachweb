const tex=String.raw;
export const methods=[
 {id:'immediate',label:'Inmediata: tabla y factor constante'},
 {id:'chain',label:'Cadena al revés: reconocer la derivada interior'},
 {id:'simplify',label:'Simplificar primero: dividir o desarrollar'},
 {id:'parts',label:'Otro método: integración por partes (ampliación)'}
];
/** Ocho retos: dos por estrategia. Los métodos son rutas didácticas, no exclusivas. */
export function generateMethods(seed=1){
 let random=Number(seed)>>>0;
 const pick=a=>{random=(Math.imul(random,1664525)+1013904223)>>>0;return a[Math.floor(random/4294967296*a.length)];};
 const shuffle=items=>{const a=[...items];for(let i=a.length-1;i>0;i--){const j=pick(Array.from({length:i+1},(_,n)=>n));[a[i],a[j]]=[a[j],a[i]];}return a;};
 const k=pick([2,3,4,5]),n=pick([2,3,4]),a=pick([2,3,4]),b=pick([1,2,3]);
 const rows=[
  {id:'power',method:'immediate',f:tex`${k*n}x^{${n-1}}`,F:tex`${k}x^{${n}}`,domain:'ℝ',value:x=>k*n*x**(n-1),primitive:x=>k*x**n,hint:'Busca una potencia de x y un factor constante.',steps:tex`Usamos \(\int x^m dx=x^{m+1}/(m+1)+C\). Subir el exponente y dividir por ${n} da \(${k}x^{${n}}+C\).`},
  {id:'exponential',method:'immediate',f:tex`${k}e^x`,F:tex`${k}e^x`,domain:'ℝ',value:x=>k*Math.exp(x),primitive:x=>k*Math.exp(x),hint:'La derivada de e elevado a x conserva su forma.',steps:tex`Sacamos el factor ${k} y usamos \(\int e^x dx=e^x+C\).`},
  {id:'log-chain',method:'chain',f:tex`\frac{${2*k}x}{x^2+${b}}`,F:tex`${k}\ln(x^2+${b})`,domain:'ℝ',value:x=>2*k*x/(x*x+b),primitive:x=>k*Math.log(x*x+b),hint:'Compara el numerador con la derivada del denominador.',steps:tex`Tomamos \(u=x^2+${b}\), \(du=2x\,dx\). Queda \(${k}\int du/u=${k}\ln u+C\). El argumento es positivo para todo x.`},
  {id:'exp-chain',method:'chain',f:tex`${a*k}e^{${a}x+${b}}`,F:tex`${k}e^{${a}x+${b}}`,domain:'ℝ',value:x=>a*k*Math.exp(a*x+b),primitive:x=>k*Math.exp(a*x+b),hint:'Al derivar el exponente aparece un factor distinto de uno.',steps:tex`Con \(u=${a}x+${b}\), \(du=${a}\,dx\), queda \(${k}\int e^u du\). Hay que compensar el factor interior ${a}.`},
  {id:'quotient',method:'simplify',f:tex`\frac{${2*k}x^2+${b}x}{x}`,F:tex`${k}x^2+${b}x`,domain:'x>0',value:x=>(2*k*x*x+b*x)/x,primitive:x=>k*x*x+b*x,hint:'Divide cada término del numerador entre x, en el intervalo indicado.',steps:tex`En x>0, \((${2*k}x^2+${b}x)/x=${2*k}x+${b}\). Integramos término a término. La simplificación no añade x=0 al dominio original.`},
  {id:'square',method:'simplify',f:tex`(x+${b})^2-x^2`,F:tex`${b}x^2+${b*b}x`,domain:'ℝ',value:x=>(x+b)**2-x*x,primitive:x=>b*x*x+b*b*x,hint:'Desarrolla el cuadrado completo: el término cruzado no desaparece.',steps:tex`\((x+${b})^2-x^2=${2*b}x+${b*b}\). La cancelación reduce el cálculo a dos integrales inmediatas.`},
  {id:'parts-exp',method:'parts',f:tex`${k}xe^x`,F:tex`${k}(x-1)e^x`,domain:'ℝ',value:x=>k*x*Math.exp(x),primitive:x=>k*(x-1)*Math.exp(x),hint:'Derivar x simplifica el producto; integrar e elevado a x es inmediato.',steps:tex`Ampliación: \(\int u\,dv=uv-\int v\,du\). Sacamos ${k}; con u=x y dv=eˣdx, du=dx y v=eˣ. Resulta \(${k}(xe^x-e^x)+C\). No se integran los factores por separado.`},
  {id:'parts-log',method:'parts',f:tex`${k}\ln x`,F:tex`${k}(x\ln x-x)`,domain:'x>0',value:x=>k*Math.log(x),primitive:x=>k*(x*Math.log(x)-x),hint:'Escribe ln x como un producto por 1; su derivada es más sencilla.',steps:tex`Ampliación: sacamos ${k} y elegimos u=ln x, dv=dx. Entonces du=dx/x y v=x. Así \(${k}\int\ln x\,dx=${k}(x\ln x-\int 1\,dx)\). Se necesita x>0.`}
 ];
 return shuffle(rows).map(r=>({...r,options:shuffle([
  {id:'family',formula:tex`${r.F}+C`,primitive:r.primitive,complete:true},
  {id:'particular',formula:r.F,primitive:r.primitive,complete:false},
  {id:'double',formula:tex`2\left(${r.F}\right)+C`,primitive:x=>2*r.primitive(x),complete:true},
  {id:'negative',formula:tex`-\left(${r.F}\right)+C`,primitive:x=>-r.primitive(x),complete:true}
 ])}));
}
export const createMethodState=()=>({index:0,phase:'method',attempts:0,score:0,hints:[],results:[]});
export function answerMethod(state,challenge,id){
 const valid=state.phase==='method'?methods.some(m=>m.id===id):state.phase==='primitive'&&challenge.options.some(o=>o.id===id);
 if(!valid)return {state,ignored:true};
 const correct=id===(state.phase==='method'?challenge.method:'family'),attempts=state.attempts+1,done=correct||attempts===2,points=correct?(attempts===1?100:50):0;
 return {correct,done,points,ignored:false,state:{...state,attempts,score:state.score+points,phase:done?(state.phase==='method'?'method-done':'primitive-done'):state.phase,results:done?[...state.results,{id:challenge.id,stage:state.phase,correct,attempts,points}]:state.results}};
}
export function advanceMethod(state,total){
 if(state.phase==='method-done')return {...state,phase:'primitive',attempts:0};
 if(state.phase==='primitive-done')return {...state,index:state.index+1,phase:state.index+1===total?'summary':'method',attempts:0};
 return state;
}
export function hintMethod(state){
 const key=state.index+'-'+state.phase;
 return !['method','primitive'].includes(state.phase)||state.hints.includes(key)?state:{...state,hints:[...state.hints,key]};
}

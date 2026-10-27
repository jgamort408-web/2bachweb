import { linearTex } from './linear-systems.js';
const tex=String.raw;
export const classificationLabels={SCD:'SCD: compatible determinado; una solución',SCI:'SCI: compatible indeterminado; infinitas soluciones',SI:'SI: incompatible; ninguna solución'};
/** Familias controladas; rows contiene coeficientes y término independiente.
 * No es un clasificador general: cada caso tiene una justificación conocida. */
export function generateClassificationModels(seed=1){
 let state=Number(seed)>>>0;
 const pick=items=>{state=(Math.imul(state,1664525)+1013904223)>>>0;return items[Math.floor(state/4294967296*items.length)];};
 const n=()=>pick([-4,-3,-2,-1,0,1,2,3,4]),u=n(),v=n(),c=n(),k=pick([-3,-2,2,3]),d=pick([-3,-1,1,3]);
 const sum=u+v;
 return [
 {kind:'SCD',rows:[[1,1,sum],[1,-1,u-v]],point:[u,v],explanation:tex`Sumar las ecuaciones da \(2x=${2*u}\). Así \(x=${u}\) y \(y=${v}\); ambas quedan fijadas y la pareja cumple las dos ecuaciones.`,hint:'Suma las dos ecuaciones y sustituye después.'},
 {kind:'SCI',rows:[[1,1,c],[k,k,k*c]],point:[0,c],direction:[1,-1],explanation:tex`La segunda ecuación es ${k} veces la primera, incluido el término independiente. Queda \(x+y=${c}\), con familia \((t,${c}-t)\), para todo real t.`,hint:'Compara la ecuación completa, incluido su término independiente.'},
 {kind:'SI',rows:[[1,1,c],[k,k,k*c+d]],explanation:tex`Restar ${k} veces la primera ecuación a la segunda produce \(0=${d}\). Esta contradicción impide cualquier solución.`,hint:'Resta un múltiplo de la primera ecuación a la segunda.'},
 {kind:'SCD',rows:[[1,0,u],[0,1,v],[0,0,0]],point:[u,v],explanation:tex`Las dos primeras ecuaciones fijan \(x=${u}\), \(y=${v}\). La identidad \(0=0\) no añade restricciones ni borra las anteriores; sigue habiendo una solución.`,hint:'Lee todas las ecuaciones, no solo la identidad final.'},
 {kind:'SCI',rows:[[1,0,1,u],[0,1,-1,v]],point:[u,v,0],direction:[-1,1,1],explanation:tex`Tomando \(z=t\), se obtiene \(x=${u}-t\), \(y=${v}+t\). Cualquier real t produce una solución distinta: \((${u}-t,${v}+t,t)\).`,hint:'Elige z libre y despeja las otras dos incógnitas.'},
 {kind:'SI',rows:[[1,1,1,c],[k,k,k,k*c+d]],explanation:tex`La segunda ecuación menos ${k} veces la primera da \(0=${d}\). Tener menos ecuaciones que incógnitas no evita la contradicción.`,hint:'Comprueba la compatibilidad antes de buscar variables libres.'}
 ].map((m,i)=>({...m,id:'classification-generated-'+i,formula:tex`\begin{cases}${m.rows.map(row=>linearTex(row.slice(0,-1))+'='+row.at(-1)).join(tex`\\`)}\end{cases}`}));
}
export function generateClassificationQuestions(seed){
 return generateClassificationModels(seed).map(m=>({
 id:m.id,topicId:'t05',lessonId:'t05-e03',prompt:tex`Clasifica el sistema sobre los números reales: \(${m.formula}\).`,correct:m.kind,
 options:Object.entries(classificationLabels).map(([id,text])=>({id,text,feedback:id===m.kind?'La clasificación coincide con todas las condiciones del sistema.':'Ese número de soluciones no corresponde al sistema completo.'})),
 explanation:m.explanation,hint:m.hint,source:'Elaboración procedural propia; guion 5.3'
 }));
}

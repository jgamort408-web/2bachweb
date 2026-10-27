import {gaussDetails} from './gauss.js';
import {fraction} from './matrix-inverse.js';
import {determinantByExpansion} from './determinant-expansion.js';
const tex=String.raw;
export const parameterFamilies={
 symmetric:{label:'Dos valores críticos: SCD, SCI y SI',critical:[-1,1],
  system:tex`\begin{cases}\lambda x+y=2\\x+\lambda y=2\end{cases}`,
  reason:tex`\(\det(A)=\lambda^2-1=(\lambda-1)(\lambda+1)\). Si \(\lambda\ne\pm1\), restar ecuaciones da \(x=y\). En \(\lambda=1\) se repite \(x+y=2\); en \(\lambda=-1\), sumarlas da \(0=4\).`,
  rows:l=>[[l,1,2],[1,l,2]],cases:[
   {condition:tex`\(\lambda\ne-1,\ \lambda\ne1\)`,kind:'SCD',r:2,s:2,free:0,solution:tex`\(x=y=\frac{2}{\lambda+1}\)`,when:l=>l!==-1&&l!==1},
   {condition:tex`\(\lambda=1\)`,kind:'SCI',r:1,s:1,free:1,solution:tex`\((x,y)=(2-t,t),\ t\in\mathbb R\)`,when:l=>l===1},
   {condition:tex`\(\lambda=-1\)`,kind:'SI',r:1,s:2,free:null,solution:'Sin solución: 0=4.',when:l=>l===-1}]},
 cancellation:{label:'Un factor que no se puede cancelar siempre',critical:[1],
  system:tex`\begin{cases}x+y=1\\x+\lambda y=\lambda\end{cases}`,
  reason:tex`\(F_2-F_1\) da \((\lambda-1)y=\lambda-1\). Solo si \(\lambda\ne1\) se cancela el factor y se obtiene \(y=1\). En \(\lambda=1\), queda \(0=0\).`,
  rows:l=>[[1,1,1],[1,l,l]],cases:[
   {condition:tex`\(\lambda\ne1\)`,kind:'SCD',r:2,s:2,free:0,solution:tex`\((x,y)=(0,1)\)`,when:l=>l!==1},
   {condition:tex`\(\lambda=1\)`,kind:'SCI',r:1,s:1,free:1,solution:tex`\((x,y)=(1-t,t),\ t\in\mathbb R\)`,when:l=>l===1}]},
 contradiction:{label:'Un valor crítico incompatible',critical:[1],
  system:tex`\begin{cases}x+y=1\\x+\lambda y=2\end{cases}`,
  reason:tex`\(F_2-F_1\) da \((\lambda-1)y=1\). En \(\lambda=1\), esto es \(0=1\); para el resto de valores se puede despejar y sustituir. No basta con afirmar «determinante cero».`,
  rows:l=>[[1,1,1],[1,l,2]],cases:[
   {condition:tex`\(\lambda\ne1\)`,kind:'SCD',r:2,s:2,free:0,solution:tex`\(x=\frac{\lambda-2}{\lambda-1},\ y=\frac1{\lambda-1}\)`,when:l=>l!==1},
   {condition:tex`\(\lambda=1\)`,kind:'SI',r:1,s:2,free:null,solution:'Sin solución: 0=1.',when:l=>l===1}]},
 homogeneous:{label:'Homogéneo: nunca incompatible',critical:[-1,1],
  system:tex`\begin{cases}x+\lambda y=0\\\lambda x+y=0\end{cases}`,
  reason:tex`\(\det(A)=1-\lambda^2\). Fuera de \(\{-1,1\}\), solo existe la solución trivial. En cada valor crítico queda una ecuación; B nulo garantiza compatibilidad. Los parámetros libres t no son el parámetro \(\lambda\) del sistema.`,
  rows:l=>[[1,l,0],[l,1,0]],cases:[
   {condition:tex`\(\lambda\ne-1,\ \lambda\ne1\)`,kind:'SCD',r:2,s:2,free:0,solution:tex`\((x,y)=(0,0)\)`,when:l=>l!==-1&&l!==1},
   {condition:tex`\(\lambda=1\)`,kind:'SCI',r:1,s:1,free:1,solution:tex`\((x,y)=(-t,t),\ t\in\mathbb R\)`,when:l=>l===1},
   {condition:tex`\(\lambda=-1\)`,kind:'SCI',r:1,s:1,free:1,solution:tex`\((x,y)=(t,t),\ t\in\mathbb R\)`,when:l=>l===-1}]},
 rectangular:{label:'Rectangular: cambia el número de variables libres',critical:[1],
  system:tex`\begin{cases}x+y+z=1\\2x+2y+(\lambda+1)z=2\end{cases}`,
  reason:tex`\(F_2-2F_1\) da \((\lambda-1)z=0\). Si \(\lambda\ne1\), z=0 y queda una variable libre. Si \(\lambda=1\), queda una sola ecuación con tres incógnitas. A es rectangular: no tiene determinante ordinario.`,
  rows:l=>[[1,1,1,1],[2,2,l+1,2]],cases:[
   {condition:tex`\(\lambda\ne1\)`,kind:'SCI',r:2,s:2,free:1,solution:tex`\((x,y,z)=(1-t,t,0),\ t\in\mathbb R\)`,when:l=>l!==1},
   {condition:tex`\(\lambda=1\)`,kind:'SCI',r:1,s:1,free:2,solution:tex`\((x,y,z)=(1-s-t,s,t),\ s,t\in\mathbb R\)`,when:l=>l===1}]},
 three:{label:'Tres incógnitas y una raíz doble',critical:[1],
  system:tex`\begin{cases}x+y+z=1\\x+\lambda y+z=1\\x+y+\lambda z=\lambda\end{cases}`,
  reason:tex`Restar la primera fila a las otras da \((\lambda-1)y=0\) y \((\lambda-1)z=\lambda-1\). El determinante es \((\lambda-1)^2\). En \(\lambda=1\), las tres ecuaciones coinciden; la raíz doble se estudia como un único valor crítico.`,
  rows:l=>[[1,1,1,1],[1,l,1,1],[1,1,l,l]],cases:[
   {condition:tex`\(\lambda\ne1\)`,kind:'SCD',r:3,s:3,free:0,solution:tex`\((x,y,z)=(0,0,1)\)`,when:l=>l!==1},
   {condition:tex`\(\lambda=1\)`,kind:'SCI',r:1,s:1,free:2,solution:tex`\((x,y,z)=(1-s-t,s,t),\ s,t\in\mathbb R\)`,when:l=>l===1}]}
};
function family(id){if(!Object.hasOwn(parameterFamilies,id))throw new RangeError('Familia de sistemas desconocida.');return parameterFamilies[id];}
function random(seed){
 if(!Number.isInteger(seed)||seed<0||seed>4294967295)throw new RangeError('Semilla entera de 32 bits.');
 let state=seed>>>0;return max=>{state=(Math.imul(state,1664525)+1013904223)>>>0;return Math.floor(state/4294967296*max);};
}
export function parameterSystemDetails(id,twice=0,seed=null){
 const f=family(id);
 if(!Number.isInteger(twice)||twice < -6||twice>6)throw new RangeError('Muestras de λ entre −3 y 3, en pasos de 1/2.');
 const value=twice/2,scale=twice%2===0?1:2,original=f.rows(value),scaled=original.map(row=>row.map(v=>v*scale));
 let order=original.map((_,i)=>i),signs=original.map(()=>1);
 if(seed!==null){const pick=random(seed);for(let i=order.length-1;i>0;i--){const j=pick(i+1);[order[i],order[j]]=[order[j],order[i]];}signs=order.map(()=>pick(2)?1:-1);}
 const rows=order.map((source,i)=>scaled[source].map(v=>v*signs[i])),gauss=gaussDetails(rows),n=gauss.n;
 const caseIndex=f.cases.findIndex(c=>c.when(value));
 const det=gauss.m===n?fraction(determinantByExpansion(scaled.map(row=>row.slice(0,-1))),scale**n):null;
 return {id,twice,value,scale,original,scaled,rows,order,signs,gauss,caseIndex,det,seed};
}
export function generatedParameterSample(seed=1,id='symmetric'){
 family(id);const pick=random(seed),twice=pick(13)-6;
 return parameterSystemDetails(id,twice,seed);
}

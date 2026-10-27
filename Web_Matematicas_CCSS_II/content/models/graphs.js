import {dimensions} from './matrix-basics.js';
import {matrixPower} from './matrix-power.js';
export const graphPresets={
 path:{label:'Cuatro paradas en línea',matrix:[[0,1,0,0],[1,0,1,0],[0,1,0,1],[0,0,1,0]],directed:false},
 cycle:{label:'Anillo de cuatro paradas',matrix:[[0,1,0,1],[1,0,1,0],[0,1,0,1],[1,0,1,0]],directed:false},
 isolated:{label:'Triángulo y vértice aislado',matrix:[[0,1,1,0],[1,0,1,0],[1,1,0,0],[0,0,0,0]],directed:false},
 directed:{label:'Circuito con sentido único',matrix:[[0,1,0,0],[0,0,1,0],[1,0,0,0],[0,0,0,0]],directed:true},
 empty:{label:'Sin conexiones',matrix:[[0,0,0,0],[0,0,0,0],[0,0,0,0],[0,0,0,0]],directed:false}
};
export function validateGraph(a,directed=false){
 const {rows:n,cols}=dimensions(a);if(n!==cols||n<2||n>4)throw new RangeError('De 2 a 4 vértices.');
 if(typeof directed!=='boolean')throw new TypeError('La orientación debe ser booleana.');
 if(a.some((r,i)=>r.some((v,j)=>![0,1].includes(v)||(i===j&&v!==0)||(!directed&&v!==a[j][i]))))throw new RangeError('Adyacencia binaria, sin lazos y simétrica si no está dirigida.');
 return n;
}
export function convertGraph(a,directed){validateGraph(a,true);if(typeof directed!=='boolean')throw new TypeError('Orientación booleana.');return a.map((r,i)=>r.map((v,j)=>directed?v:Math.max(v,a[j][i])));}
export function toggleEdge(a,i,j,directed=false){
 const n=validateGraph(a,directed);if(!Number.isInteger(i)||!Number.isInteger(j)||i<0||j<0||i>=n||j>=n||i===j)throw new RangeError('Dos vértices distintos válidos.');
 const b=a.map(r=>[...r]);b[i][j]=1-b[i][j];if(!directed)b[j][i]=b[i][j];return b;
}
export function graphDetails(a,{directed=false,length=2,from=0,to=0}={}){
 const n=validateGraph(a,directed);
 if(!Number.isInteger(length)||length<0||length>4)throw new RangeError('Longitud de 0 a 4.');
 if(![from,to].every(v=>Number.isInteger(v)&&v>=0&&v<n))throw new RangeError('Vértices fuera de rango.');
 const power=matrixPower(a,length).result,walks=[];
 function visit(path){if(path.length===length+1){if(path.at(-1)===to)walks.push(path);return;}a[path.at(-1)].forEach((edge,j)=>{if(edge)visit([...path,j]);});}
 visit([from]);
 const out=a.map(r=>r.reduce((s,v)=>s+v,0)),incoming=a[0].map((_,j)=>a.reduce((s,r)=>s+r[j],0));
 return {power,count:power[from][to],walks,out,incoming,edges:out.reduce((s,v)=>s+v,0)/(directed?1:2)};
}
export function generatedGraph(seed=1,size=4,directed=false){
 if(!Number.isInteger(size)||size<2||size>4||typeof directed!=='boolean')throw new RangeError('Dimensiones u orientación inválidas.');
 let state=Number(seed)>>>0;const a=Array.from({length:size},()=>Array(size).fill(0));
 for(let i=0;i<size;i++)for(let j=directed?0:i+1;j<size;j++)if(i!==j){state=(Math.imul(state,1664525)+1013904223)>>>0;a[i][j]=state>>>31;if(!directed)a[j][i]=a[i][j];}
 return a;
}

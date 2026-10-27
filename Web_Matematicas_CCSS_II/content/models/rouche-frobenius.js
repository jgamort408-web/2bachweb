import {rankDetails} from './matrix-rank.js';
export const rouchePresets={
 unique:{label:'SCD: dos incógnitas',rows:[[1,1,3],[2,-1,0]]},
 infinite:{label:'SCI: información repetida',rows:[[1,1,4],[2,2,8]]},
 none:{label:'SI: término incompatible',rows:[[1,1,4],[2,2,9]]},
 wide:{label:'SCI: tres incógnitas',rows:[[1,0,1,2],[0,1,-1,1]]},
 tall:{label:'SCD: tres ecuaciones',rows:[[1,1,3],[2,-1,0],[3,0,3]]},
 zero:{label:'Rangos cero',rows:[[0,0,0],[0,0,0]]}
};
export function roucheDetails(rows){
 if(!Array.isArray(rows)||![2,3].includes(rows.length)||!Array.isArray(rows[0])||![3,4].includes(rows[0].length))throw new RangeError('Dos o tres ecuaciones e incógnitas.');
 const width=rows[0].length;
 if(rows.some(r=>!Array.isArray(r)||r.length!==width||r.some(v=>!Number.isInteger(v)||Math.abs(v)>9)))throw new RangeError('Filas coherentes con enteros entre −9 y 9.');
 const augmented=rows.map(r=>[...r]),a=rows.map(r=>r.slice(0,-1)),b=rows.map(r=>r.at(-1)),n=width-1;
 const coefficients=rankDetails(a),complete=rankDetails(augmented),r=coefficients.rank,s=complete.rank;
 return {a,b,augmented,n,m:rows.length,coefficients,complete,r,s,kind:r!==s?'SI':r===n?'SCD':'SCI',free:r===s?n-r:null};
}
export function parameterRows(value){
 if(!Number.isInteger(value)||value < -3||value>3)throw new RangeError('Muestras enteras del parámetro entre −3 y 3.');
 return [[value,1,2],[1,value,2]];
}
/** Dos ecuaciones y dos incógnitas, tipo garantizado; entradas dentro de ±9. */
export function generatedRoucheRows(seed=1,kind='SCD'){
 if(!['SCD','SCI','SI'].includes(kind))throw new RangeError('Tipo desconocido.');
 let state=Number(seed)>>>0;
 const pick=items=>{state=(Math.imul(state,1664525)+1013904223)>>>0;return items[Math.floor(state/4294967296*items.length)];};
 const c=pick([-2,-1,0,1,2]),k=pick([-3,-2,-1,1,2,3]),q=pick([-2,-1,1,2]),delta=pick([-1,1]);
 const first=[1,q,c];
 const second=kind==='SCD'?[0,k,pick([-3,-2,-1,0,1,2,3])]:[k,k*q,k*c+(kind==='SI'?delta:0)];
 return pick([false,true])?[first,second]:[second,first];
}

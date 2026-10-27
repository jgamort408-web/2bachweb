import {inverseDetails,fraction} from './matrix-inverse.js';
import {roucheDetails} from './rouche-frobenius.js';
export const inverseSystemPresets={
 integer:{label:'Solución entera; determinante negativo',a:[[1,1],[2,-1]],b:[3,0]},
 fractional:{label:'Solución con fracciones',a:[[2,1],[1,2]],b:[1,0]},
 three:{label:'Tres incógnitas',a:[[1,1,0],[0,1,1],[0,0,2]],b:[3,5,6]},
 homogeneous:{label:'Términos independientes nulos',a:[[2,1],[1,2]],b:[0,0]},
 dependent:{label:'Sin inversa: compatible',a:[[1,1],[2,2]],b:[3,6]},
 impossible:{label:'Sin inversa: incompatible',a:[[1,1],[2,2]],b:[3,7]}
};
const add=(x,y)=>fraction(x.numerator*y.denominator+y.numerator*x.denominator,x.denominator*y.denominator);
const multiply=(x,y)=>fraction(x.numerator*y.numerator,x.denominator*y.denominator);
export function inverseSystemDetails(a,b){
 const details=inverseDetails(a),n=a.length;
 if(!Array.isArray(b)||b.length!==n||b.some(v=>!Number.isInteger(v)||Math.abs(v)>9))throw new RangeError('B debe tener una entrada entera entre −9 y 9 por ecuación.');
 const ranks=roucheDetails(a.map((row,i)=>[...row,b[i]]));
 if(!details.invertible)return {a:a.map(r=>[...r]),b:[...b],n,details,ranks,solution:null,product:null,terms:null};
 const terms=details.inverse.map(row=>row.map((v,j)=>multiply(v,fraction(b[j]))));
 const solution=terms.map(row=>row.reduce(add,fraction(0)));
 const product=a.map(row=>row.map((v,j)=>multiply(fraction(v),solution[j])).reduce(add,fraction(0)));
 return {a:a.map(r=>[...r]),b:[...b],n,details,ranks,terms,solution,product};
}
export function generatedInverseSystem(seed=1,size=2,kind='SCD'){
 if(![2,3].includes(size)||!['SCD','SCI','SI'].includes(kind))throw new RangeError('Orden 2 o 3 y tipo SCD, SCI o SI.');
 let state=Number(seed)>>>0;
 const pick=items=>{state=(Math.imul(state,1664525)+1013904223)>>>0;return items[Math.floor(state/4294967296*items.length)];};
 const a=Array.from({length:size},(_,i)=>Array.from({length:size},(_,j)=>j<i?0:j===i?pick([-3,-2,-1,1,2,3]):pick([-2,-1,0,1,2])));
 const b=Array.from({length:size},()=>pick([-3,-2,-1,0,1,2,3]));
 if(kind!=='SCD'){a[size-1]=a[0].map(v=>2*v);b[size-1]=2*b[0]+(kind==='SI'?pick([-1,1]):0);}
 if(pick([false,true])){a.reverse();b.reverse();}
 if(pick([false,true]))a.forEach(row=>row.reverse());
 return {a,b};
}

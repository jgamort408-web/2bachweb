import {gaussDetails} from './gauss.js';
import {generatedMatrix} from './matrix-basics.js';
import {determinantByExpansion} from './determinant-expansion.js';
import {fraction} from './matrix-inverse.js';
export const homogeneousPresets={
 unique:{label:'Solo la solución trivial',a:[[2,1],[1,2]]},
 dependent:{label:'Una variable libre',a:[[1,1],[2,2]]},
 fractional:{label:'Familia con fracciones',a:[[2,1,0],[0,1,-1]]},
 plane:{label:'Dos variables libres',a:[[1,1,1],[2,2,2],[-1,-1,-1]]},
 tall:{label:'Tres ecuaciones, dos incógnitas',a:[[1,0],[0,1],[1,1]]},
 zero:{label:'Matriz nula: todas las variables libres',a:[[0,0,0],[0,0,0]]},
 three:{label:'Tres incógnitas, solo el origen',a:[[1,1,0],[0,1,1],[0,0,2]]},
 skipped:{label:'Primera columna sin pivote',a:[[0,1,1],[0,2,2]]}
};
const add=(a,b)=>fraction(a.numerator*b.denominator+b.numerator*a.denominator,a.denominator*b.denominator);
const mul=(a,b)=>fraction(a.numerator*b.numerator,a.denominator*b.denominator);
export function homogeneousDetails(a,parameters){
 if(!Array.isArray(a)||a.some(row=>!Array.isArray(row)))throw new TypeError('Se requiere una matriz de coeficientes.');
 const gauss=gaussDetails(a.map(row=>[...row,0])),k=gauss.free.length;
 const values=parameters===undefined?Array(k).fill(0):parameters;
 if(!Array.isArray(values)||values.length!==k||values.some(v=>!Number.isInteger(v)||Math.abs(v)>5))throw new RangeError('Un entero entre −5 y 5 por variable libre.');
 const solution=gauss.expressions.map(e=>e.slice(1).reduce((sum,v,j)=>add(sum,mul(v,fraction(values[j]))),fraction(0)));
 const product=a.map(row=>row.reduce((sum,v,j)=>add(sum,mul(fraction(v),solution[j])),fraction(0)));
 return {a:a.map(row=>[...row]),gauss,det:gauss.m===gauss.n?determinantByExpansion(a):null,
  parameters:[...values],solution,product,trivial:solution.every(v=>v.numerator===0),
  directions:Array.from({length:k},(_,j)=>gauss.expressions.map(e=>({...e[j+1]})))};
}
export function generatedHomogeneous(seed=1,rows=2,cols=2){
 if(![2,3].includes(rows)||![2,3].includes(cols))throw new RangeError('Dos o tres ecuaciones e incógnitas.');
 return generatedMatrix(rows,cols,seed);
}

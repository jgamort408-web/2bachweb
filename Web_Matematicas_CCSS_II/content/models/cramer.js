import {dimensions} from './matrix-basics.js';
import {expandDeterminant} from './determinant-expansion.js';
import {fraction} from './matrix-inverse.js';
import {roucheDetails} from './rouche-frobenius.js';
import {generatedInverseSystem} from './inverse-systems.js';
export const cramerPresets={
 integer:{label:'Solución entera; determinante negativo',a:[[1,1],[2,-1]],b:[3,0]},
 fractional:{label:'Solución fraccionaria',a:[[2,1],[1,2]],b:[1,0]},
 three:{label:'Tres incógnitas',a:[[1,1,0],[0,1,1],[0,0,2]],b:[3,5,6]},
 zeroCoordinate:{label:'Un numerador cero',a:[[1,1],[2,-1]],b:[2,-2]},
 homogeneous:{label:'Todos los numeradores cero; solución única',a:[[2,1],[1,2]],b:[0,0]},
 dependent:{label:'Determinante cero: compatible',a:[[1,1],[2,2]],b:[3,6]},
 impossible:{label:'Determinante cero: incompatible',a:[[1,1],[2,2]],b:[3,7]},
 allZeroSI:{label:'Todos los determinantes cero; incompatible',a:[[1,0,0],[0,0,0],[0,0,0]],b:[0,1,0]}
};
const multiply=(a,b)=>fraction(a.numerator*b.numerator,a.denominator*b.denominator);
const add=(a,b)=>fraction(a.numerator*b.denominator+b.numerator*a.denominator,a.denominator*b.denominator);
export function cramerDetails(a,b){
 const {rows:n,cols}=dimensions(a);
 if(n!==cols||![2,3].includes(n)||a.flat().some(v=>!Number.isInteger(v)||Math.abs(v)>9))throw new RangeError('A debe ser cuadrada de orden 2 o 3, con enteros entre −9 y 9.');
 if(!Array.isArray(b)||b.length!==n||b.some(v=>!Number.isInteger(v)||Math.abs(v)>9))throw new RangeError('B debe contener un entero entre −9 y 9 por ecuación.');
 const original=expandDeterminant(a),det=original.value;
 // Each replacement starts from the original A, never the previous replacement.
 const replacements=Array.from({length:n},(_,col)=>{
  const matrix=a.map((row,i)=>row.map((v,j)=>j===col?b[i]:v));
  return {col,matrix,expansion:expandDeterminant(matrix)};
 });
 const applicable=det!==0,ranks=roucheDetails(a.map((row,i)=>[...row,b[i]]));
 const solution=applicable?replacements.map(r=>fraction(r.expansion.value,det)):null;
 const product=solution?a.map(row=>row.map((v,j)=>multiply(fraction(v),solution[j])).reduce(add,fraction(0))):null;
 return {a:a.map(row=>[...row]),b:[...b],n,original,det,replacements,applicable,ranks,solution,product};
}
export function generatedCramer(seed=1,size=2,kind='SCD'){return generatedInverseSystem(seed,size,kind);}

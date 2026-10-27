import {dimensions,generatedMatrix} from './matrix-basics.js';
import {expandDeterminant} from './determinant-expansion.js';
import {transpose} from './matrix-symmetry.js';
import {multiplyMatrices} from './matrix-product.js';
export const inversePresets={
 two:{label:'Orden 2: fracciones',matrix:[[2,1],[1,2]]},
 three:{label:'Orden 3: trasponer adjuntos',matrix:[[1,2,0],[0,1,1],[1,0,1]]},
 singular:{label:'Singular: filas proporcionales',matrix:[[1,2],[2,4]]},
 negative:{label:'Determinante negativo',matrix:[[1,2],[3,4]]}
};
export function fraction(numerator,denominator=1){
 if(!Number.isSafeInteger(numerator)||!Number.isSafeInteger(denominator))throw new TypeError('Numerador y denominador enteros seguros requeridos.');
 if(denominator===0)throw new RangeError('No se divide entre cero.');
 let a=Math.abs(numerator),b=Math.abs(denominator);while(b){[a,b]=[b,a%b];}
 const sign=denominator<0?-1:1;
 return {numerator:numerator===0?0:sign*numerator/a,denominator:Math.abs(denominator)/a};
}
export function fractionTex(f){return f.denominator===1?String(f.numerator):String.raw`${f.numerator<0?'-':''}\frac{${Math.abs(f.numerator)}}{${f.denominator}}`;}
export function rationalMatrixTex(a){return String.raw`\begin{pmatrix}${a.map(row=>row.map(fractionTex).join('&')).join(String.raw`\\`)}\end{pmatrix}`;}
export function inverseDetails(a){
 const {rows:n,cols}=dimensions(a);
 if(n!==cols||![2,3].includes(n))throw new RangeError('Matriz cuadrada de orden 2 o 3 requerida.');
 if(a.flat().some(v=>!Number.isInteger(v)||Math.abs(v)>9))throw new RangeError('Entradas enteras entre −9 y 9 para cálculo exacto.');
 const rows=a.map((_,i)=>expandDeterminant(a,'rows',i)),det=rows[0].value;
 const cofactors=rows.map(r=>r.terms.map(t=>t.cofactor)),adjugate=transpose(cofactors);
 const left=multiplyMatrices(a,adjugate).result,right=multiplyMatrices(adjugate,a).result;
 return {det,invertible:det!==0,cofactors,adjugate,terms:rows.map(r=>r.terms),
 inverse:det===0?null:adjugate.map(row=>row.map(v=>fraction(v,det))),left,right,
 leftIdentity:det===0?null:left.map(row=>row.map(v=>fraction(v,det))),
 rightIdentity:det===0?null:right.map(row=>row.map(v=>fraction(v,det)))};
}
export function generatedInverseMatrix(seed=1,size=2){if(![2,3].includes(size))throw new RangeError('Orden 2 o 3.');return generatedMatrix(size,size,seed);}

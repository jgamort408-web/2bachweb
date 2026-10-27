import {dimensions,generatedMatrix} from './matrix-basics.js';
import {inverseDetails,fraction} from './matrix-inverse.js';
import {multiplyMatrices} from './matrix-product.js';
export const equationPresets={
 left:{label:'AX=B: fracciones',a:[[2,1],[1,2]],b:[[1,0],[0,3]],side:'left',k:0},
 right:{label:'XA=B: cambia el lado',a:[[2,1],[1,2]],b:[[1,0],[0,3]],side:'right',k:0},
 rectangular:{label:'AX=B con tres columnas',a:[[2,1],[1,2]],b:[[1,0,3],[0,3,6]],side:'left',k:0},
 shifted:{label:'AX−X=B: coeficiente singular',a:[[2,1],[1,2]],b:[[1,0],[0,3]],side:'left',k:-1},
 three:{label:'Orden 3 con vector columna',a:[[1,2,0],[0,1,1],[1,0,1]],b:[[3],[2],[2]],side:'left',k:0}
};
const product=(a,b)=>multiplyMatrices(a,b).result;
export function solveMatrixEquation(a,b,{side='left',k=0}={}){
 const da=dimensions(a),db=dimensions(b),n=da.rows;
 if(da.cols!==n||![2,3].includes(n))throw new RangeError('A debe ser cuadrada de orden 2 o 3.');
 if(!['left','right'].includes(side))throw new RangeError('Lado desconocido.');
 if(!Number.isInteger(k)||Math.abs(k)>3||a.flat().some(v=>!Number.isInteger(v)||Math.abs(v)>6)||b.flat().some(v=>!Number.isInteger(v)||Math.abs(v)>9))throw new RangeError('A: enteros −6..6; B: −9..9; k: −3..3.');
 if(db.rows>3||db.cols>3)throw new RangeError('B admite hasta 3 filas y columnas.');
 if(side==='left'?db.rows!==n:db.cols!==n)return {status:'incompatible',reason:side==='left'?'En AX+kX=B, B debe tener tantas filas como A.':'En XA+kX=B, B debe tener tantas columnas como A.'};
 const coefficient=a.map((r,i)=>r.map((v,j)=>v+(i===j?k:0))),inverse=inverseDetails(coefficient);
 if(!inverse.invertible)return {status:'singular',coefficient,det:0,reason:'A+kI es singular. El método de la inversa no se aplica; hay que estudiar el sistema de las entradas para decidir si hay soluciones.'};
 const numerator=side==='left'?product(inverse.adjugate,b):product(b,inverse.adjugate);
 const original=side==='left'?product(a,numerator):product(numerator,a);
 const checkNumerator=original.map((r,i)=>r.map((v,j)=>v+k*numerator[i][j]));
 const solution=numerator.map(r=>r.map(v=>fraction(v,inverse.det))),check=checkNumerator.map(r=>r.map(v=>fraction(v,inverse.det)));
 return {status:'unique',coefficient,det:inverse.det,inverse:inverse.inverse,numerator,solution,check,
 verified:check.every((r,i)=>r.every((v,j)=>v.denominator===1&&v.numerator===b[i][j]))};
}
export function generatedEquation(seed=1,size=2,width=2,side='left'){
 if(![2,3].includes(size)||![1,2,3].includes(width)||!['left','right'].includes(side))throw new RangeError('Dimensiones o lado fuera de rango.');
 return {a:generatedMatrix(size,size,seed),b:generatedMatrix(side==='left'?size:width,side==='left'?width:size,(Number(seed)+2654435761)>>>0)};
}

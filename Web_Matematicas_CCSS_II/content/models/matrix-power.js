import {dimensions,generatedMatrix} from './matrix-basics.js';
import {multiplyMatrices} from './matrix-product.js';
export const powerPresets={
 accumulation:{label:'Acumulación constante',matrix:[[1,1],[0,1]]},
 diagonal:{label:'Diagonal: crecimiento y alternancia',matrix:[[2,0],[0,-1]]},
 swap:{label:'Intercambio de dos componentes',matrix:[[0,1],[1,0]]},
 nilpotent:{label:'Se anula al cuadrado',matrix:[[0,1],[0,0]]},
 projection:{label:'Se repite desde la primera potencia',matrix:[[1,0],[0,0]]},
 identity:{label:'Matriz identidad',matrix:[[1,0],[0,1]]},
 zero:{label:'Matriz nula',matrix:[[0,0],[0,0]]}
};
export function identityMatrix(size){
 if(!Number.isInteger(size)||size<1||size>4)throw new RangeError('Orden entre 1 y 4.');
 return Array.from({length:size},(_,i)=>Array.from({length:size},(_,j)=>i===j?1:0));
}
/** Potencias no negativas; cada etapa conserva una copia y su producto explicado. */
export function matrixPower(a,n){
 const d=dimensions(a);
 if(d.rows!==d.cols)throw new RangeError('La base debe ser cuadrada.');
 if(!Number.isInteger(n)||n<0||n>12)throw new RangeError('Exponente entero entre 0 y 12.');
 let result=identityMatrix(d.rows);const stages=[{exponent:0,result,steps:[]}];
 for(let k=1;k<=n;k++){const m=multiplyMatrices(result,a);result=m.result;stages.push({exponent:k,result,steps:m.steps});}
 return {exponent:n,result,stages};
}
export function generatedPowerMatrix(seed=1){return generatedMatrix(2,2,seed);}

import {dimensions,generatedMatrix} from './matrix-basics.js';
export const determinantPresets={
 two:{label:'Orden 2 con signos',matrix:[[3,-2],[4,1]]},
 three:{label:'Sarrus con productos negativos',matrix:[[1,2,3],[0,-1,4],[2,1,0]]},
 negative:{label:'Determinante negativo',matrix:[[1,2],[3,4]]},
 singular:{label:'No nula con determinante cero',matrix:[[1,2],[2,4]]},
 zero:{label:'Matriz nula',matrix:[[0,0],[0,0]]},
 single:{label:'Orden 1',matrix:[[-3]]},
 rectangular:{label:'Rectangular 2×3',matrix:[[1,2,3],[4,5,6]]}
};
/** Fórmulas exactas para las entradas enteras acotadas del editor. */
export function determinantDetails(a){
 const {rows,cols}=dimensions(a);
 if(rows!==cols)return {defined:false,rows,cols,value:null,invertible:null,terms:[],reason:'No es cuadrada: su determinante no está definido. No se le asigna el valor cero.'};
 if(rows>3)throw new RangeError('Este modelo calcula órdenes 1, 2 y 3. Sarrus solo se aplica al orden 3.');
 const positive=rows===1?[[0]]:rows===2?[[0,1]]:[[0,1,2],[1,2,0],[2,0,1]];
 const negative=rows===1?[]:rows===2?[[1,0]]:[[2,1,0],[0,2,1],[1,0,2]];
 const terms=[];
 for(const [sign,permutations]of [[1,positive],[-1,negative]])for(const permutation of permutations){
  const positions=permutation.map((col,row)=>({row:row+1,col:col+1})),factors=permutation.map((col,row)=>a[row][col]);
  const product=factors.reduce((v,f)=>v*f,1);if(!Number.isFinite(product))throw new RangeError('Producto fuera del rango numérico.');
  terms.push({sign,positions,factors,product:product===0?0:product});
 }
 const sum=sign=>terms.filter(t=>t.sign===sign).reduce((s,t)=>s+t.product,0);
 const positiveSum=sum(1),negativeSum=sum(-1),value=positiveSum-negativeSum;
 if(!Number.isFinite(positiveSum)||!Number.isFinite(negativeSum)||!Number.isFinite(value))throw new RangeError('Resultado fuera del rango numérico.');
 return {defined:true,rows,cols,terms,positiveSum,negativeSum,value:value===0?0:value,invertible:value!==0};
}
export function generatedDeterminantMatrix(seed=1,rows=3,cols=3){return generatedMatrix(rows,cols,seed);}

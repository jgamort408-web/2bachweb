import {dimensions,generatedMatrix} from './matrix-basics.js';
import {transpose} from './matrix-symmetry.js';
import {determinantDetails} from './determinants.js';
export const propertyPresets={
 elimination:{label:'Crear ceros en orden 3',matrix:[[1,2,1],[2,5,3],[1,0,2]]},
 two:{label:'Orden 2',matrix:[[3,-2],[4,1]]},
 triangular:{label:'Triangular',matrix:[[2,3,1],[0,-1,4],[0,0,5]]},
 singular:{label:'Filas proporcionales',matrix:[[1,2,3],[2,4,6],[0,1,1]]}
};
export function transformDeterminant(a,{operation='add',axis='rows',target=1,source=0,scalar=-2}={}){
 const {rows:n,cols}=dimensions(a);
 if(n!==cols||n<2||n>3)throw new RangeError('Base cuadrada de orden 2 o 3.');
 if(!['swap','scale','add','scaleAll','transpose'].includes(operation))throw new RangeError('Operación desconocida.');
 if(!['rows','cols'].includes(axis))throw new RangeError('Eje desconocido.');
 if(!Number.isInteger(target)||!Number.isInteger(source)||target<0||source<0||target>=n||source>=n)throw new RangeError('Índice fuera de rango.');
 if(!Number.isFinite(scalar))throw new TypeError('Escalar finito requerido.');
 if((operation==='swap'||operation==='add')&&target===source)return {valid:false,reason:'Elige dos filas o columnas distintas. La propiedad seleccionada exige posiciones diferentes.'};
 let b=a.map(row=>[...row]),factor=1;
 if(operation==='transpose')b=transpose(a);
 else if(operation==='scaleAll'){b=a.map(row=>row.map(v=>scalar*v));factor=scalar**n;}
 else {
  let work=axis==='cols'?transpose(a):a.map(row=>[...row]);
  if(operation==='swap'){[work[target],work[source]]=[work[source],work[target]];factor=-1;}
  if(operation==='scale'){work[target]=work[target].map(v=>scalar*v);factor=scalar;}
  if(operation==='add')work[target]=work[target].map((v,j)=>v+scalar*work[source][j]);
  b=axis==='cols'?transpose(work):work;
 }
 if(b.some(row=>row.some(v=>!Number.isFinite(v))))throw new RangeError('Resultado fuera del rango numérico.');
 b=b.map(row=>row.map(v=>v===0?0:v));
 const before=determinantDetails(a).value,after=determinantDetails(b).value,expected=factor*before;
 if(!Number.isFinite(expected)||!Number.isFinite(factor))throw new RangeError('Factor fuera del rango numérico.');
 return {valid:true,result:b,before,after,factor:factor===0?0:factor,expected:expected===0?0:expected};
}
export function generatedPropertyMatrix(seed=1,size=3){if(size!==2&&size!==3)throw new RangeError('Orden 2 o 3.');return generatedMatrix(size,size,seed);}

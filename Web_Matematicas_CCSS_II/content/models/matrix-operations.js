import {dimensions,generatedMatrix} from './matrix-basics.js';
export const operationLabels={add:'A + B',subtract:'A − B',scale:'αA',combine:'αA + βB'};
/** Operaciones elemento a elemento. Un orden incompatible nunca se rellena ni se recorta. */
export function matrixOperation(a,b,operation='add',alpha=1,beta=1){
 if(!Object.hasOwn(operationLabels,operation))throw new RangeError('Operación desconocida.');
 if(!Number.isFinite(alpha)||!Number.isFinite(beta))throw new TypeError('Los escalares deben ser finitos.');
 const da=dimensions(a),db=operation==='scale'?null:dimensions(b);
 if(db&&(da.rows!==db.rows||da.cols!==db.cols))return {compatible:false,orderA:da,orderB:db,result:null,steps:[],reason:`A tiene orden ${da.rows}×${da.cols} y B tiene orden ${db.rows}×${db.cols}. Para sumar o restar deben coincidir filas y columnas. No se completan casillas ni se descartan datos.`};
 const x=operation==='add'||operation==='subtract'?1:alpha,y=operation==='scale'?0:operation==='subtract'?-1:operation==='add'?1:beta;
 const steps=[],result=a.map((row,i)=>row.map((entry,j)=>{
  const other=operation==='scale'?null:b[i][j],value=x*entry+(other===null?0:y*other);
  if(!Number.isFinite(value))throw new RangeError('Resultado fuera del rango numérico.');
  steps.push({row:i+1,col:j+1,a:entry,b:other,alpha:x,beta:y,value:Object.is(value,-0)?0:value});
  return Object.is(value,-0)?0:value;
 }));
 return {compatible:true,orderA:da,orderB:db,rows:da.rows,cols:da.cols,result,steps};
}
export function operationSession(seed=1,rowsA=2,colsA=2,rowsB=2,colsB=2){
 return {a:generatedMatrix(rowsA,colsA,seed),b:generatedMatrix(rowsB,colsB,(Number(seed)+2654435761)>>>0)};
}
export function parseMatrixInteger(text,min=-20,max=20){
 const raw=String(text??'').trim();if(!/^[+-]?\d+$/.test(raw))return null;
 const n=Number(raw);return Number.isSafeInteger(n)&&n>=min&&n<=max?n:null;
}

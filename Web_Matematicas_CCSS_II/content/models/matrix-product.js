import {dimensions,generatedMatrix} from './matrix-basics.js';
export const productPresets={
 rectangular:{label:'Rectangulares: 2×3 y 3×2',a:[[1,2,-1],[0,3,2]],b:[[2,1],[-1,0],[3,4]]},
 order:{label:'Comparar AB y BA',a:[[1,1],[0,1]],b:[[1,0],[1,1]]},
 zero:{label:'Producto nulo sin factores nulos',a:[[1,0],[0,0]],b:[[0,0],[0,1]]},
 sales:{label:'Ventas y precios',a:[[24,15,8],[10,20,18]],b:[[2],[3],[1]]}
};
/** Cada entrada es una suma de productos fila por columna, nunca casilla por casilla. */
export function multiplyMatrices(a,b){
 const da=dimensions(a),db=dimensions(b);
 if(da.cols!==db.rows)return {compatible:false,orderA:da,orderB:db,result:null,steps:[],reason:`El primer factor tiene ${da.cols} columnas y el segundo ${db.rows} filas. El producto no está definido: esas dimensiones deben coincidir.`};
 const steps=[],result=Array.from({length:da.rows},(_,i)=>Array.from({length:db.cols},(_,j)=>{
  const terms=a[i].map((left,k)=>({left,right:b[k][j],product:left*b[k][j]}));
  const value=terms.reduce((sum,t)=>sum+t.product,0);
  if(terms.some(t=>!Number.isFinite(t.product))||!Number.isFinite(value))throw new RangeError('Resultado fuera del rango numérico.');
  const normalized=Object.is(value,-0)?0:value;
  steps.push({row:i+1,col:j+1,terms,value:normalized});return normalized;
 }));
 return {compatible:true,orderA:da,orderB:db,rows:da.rows,cols:db.cols,result,steps};
}
export function productSession(seed=1,rows=2,inner=3,cols=2){
 return {a:generatedMatrix(rows,inner,seed),b:generatedMatrix(inner,cols,(Number(seed)+2654435761)>>>0)};
}

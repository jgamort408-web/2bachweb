import {dimensions,generatedMatrix} from './matrix-basics.js';
export const expansionPresets={
 three:{label:'Orden 3 con un cero',matrix:[[1,2,3],[0,-1,4],[2,1,0]]},
 two:{label:'Orden 2',matrix:[[3,-2],[4,1]]},
 four:{label:'Orden 4 con ceros',matrix:[[0,2,0,0],[1,0,3,0],[0,0,4,1],[0,0,2,5]]},
 singular:{label:'Filas proporcionales',matrix:[[1,2,3],[2,4,6],[0,1,1]]}
};
function square(a){const {rows,cols}=dimensions(a);if(rows!==cols||rows>4)throw new RangeError('Matriz cuadrada de orden 1 a 4 requerida.');return rows;}
function submatrix(a,row,col){return a.filter((_,i)=>i!==row).map(r=>r.filter((_,j)=>j!==col));}
export function determinantByExpansion(a){
 const n=square(a);if(n===1)return a[0][0];
 const value=a[0].reduce((sum,v,j)=>sum+v*(j%2?-1:1)*determinantByExpansion(submatrix(a,0,j)),0);
 if(!Number.isFinite(value))throw new RangeError('Resultado fuera del rango numérico.');
 return value===0?0:value;
}
export function expandDeterminant(a,axis='rows',index=0){
 const n=square(a);if(n<2)throw new RangeError('El desarrollo mostrado requiere orden 2 a 4.');
 if(!['rows','cols'].includes(axis))throw new RangeError('Eje desconocido.');
 if(!Number.isInteger(index)||index<0||index>=n)throw new RangeError('Posición fuera de rango.');
 const terms=Array.from({length:n},(_,k)=>{
  const row=axis==='rows'?index:k,col=axis==='rows'?k:index,minorMatrix=submatrix(a,row,col);
  const minor=determinantByExpansion(minorMatrix),sign=(row+col)%2?-1:1,cofactor=sign*minor,entry=a[row][col],product=entry*cofactor;
  if(!Number.isFinite(product))throw new RangeError('Producto fuera del rango numérico.');
  return {row:row+1,col:col+1,minorMatrix,minor,sign,cofactor:cofactor===0?0:cofactor,entry,product:product===0?0:product};
 });
 const value=terms.reduce((s,t)=>s+t.product,0);if(!Number.isFinite(value))throw new RangeError('Resultado fuera del rango numérico.');
 return {terms,value:value===0?0:value,nonzero:terms.filter(t=>t.entry!==0).length};
}
export function generatedExpansionMatrix(seed=1,size=3){if(![2,3,4].includes(size))throw new RangeError('Orden 2 a 4.');return generatedMatrix(size,size,seed);}

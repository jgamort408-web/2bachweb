import {validateSystem,variables} from './linear-systems.js';
const tex=String.raw;
export const notationPresets={
 square:{label:'Dos ecuaciones: signos y ceros',a:[[2,-1],[0,3]],b:[-5,3],values:[-2,1]},
 wide:{label:'Dos ecuaciones, tres incógnitas',a:[[1,0,-2],[0,3,1]],b:[4,5],values:[2,2,-1]},
 tall:{label:'Tres ecuaciones, dos incógnitas',a:[[1,1],[2,-1],[3,0]],b:[3,0,3],values:[1,2]},
 three:{label:'Tres ecuaciones y tres incógnitas',a:[[1,1,1],[2,-1,0],[0,1,-1]],b:[6,0,-1],values:[1,2,3]},
 homogeneous:{label:'Términos independientes nulos',a:[[1,-1],[2,-2]],b:[0,0],values:[2,2]},
 impossible:{label:'Fila de coeficientes nulos',a:[[0,0],[1,-1]],b:[1,0],values:[2,2]}
};
export function matrixTex(rows,augmented=false){
 return augmented?tex`\left(\begin{array}{${'c'.repeat(rows[0].length-1)}|c}${rows.map(r=>r.join('&')).join(tex`\\`)}\end{array}\right)`:
 tex`\begin{pmatrix}${rows.map(r=>r.join('&')).join(tex`\\`)}\end{pmatrix}`;
}
/** Ordena conjuntamente columnas, nombres y coordenadas; nunca permuta B. */
export function notationModel(system,order){
 const {rows,cols}=validateSystem(system);
 if(order===undefined)order=Array.from({length:cols},(_,i)=>i);
 if(!Array.isArray(order)||order.length!==cols||new Set(order).size!==cols||order.some(j=>!Number.isInteger(j)||j<0||j>=cols))throw new RangeError('El orden debe ser una permutación de las incógnitas.');
 const a=system.a.map(row=>order.map(j=>row[j])),names=order.map(j=>variables[j]),values=order.map(j=>system.values[j]),b=[...system.b];
 const augmented=a.map((row,i)=>[...row,b[i]]);
 const product=a.map(row=>row.reduce((sum,v,j)=>sum+v*values[j],0));
 const residual=product.map((v,i)=>v-b[i]);
 return {rows,cols,order:[...order],a,names,values,b,augmented,product,residual,satisfied:residual.every(v=>v===0),
  aTex:matrixTex(a),xTex:matrixTex(names.map(v=>[v])),bTex:matrixTex(b.map(v=>[v])),augmentedTex:matrixTex(augmented,true),
  symbolicProductTex:matrixTex(a.map(row=>[row.map((v,j)=>tex`(${v})${names[j]}`).join('+')])),
  valueTex:matrixTex(values.map(v=>[v])),productTex:matrixTex(product.map(v=>[v]))
 };
}

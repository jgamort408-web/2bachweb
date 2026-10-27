import {dimensions,generatedMatrix} from './matrix-basics.js';
export const symmetryPresets={
 symmetric:{label:'Simétrica 3×3',matrix:[[2,-1,3],[-1,0,4],[3,4,5]]},
 skew:{label:'Antisimétrica 3×3',matrix:[[0,2,-3],[-2,0,4],[3,-4,0]]},
 zeroDiagonal:{label:'Diagonal nula, sin antisimetría',matrix:[[0,2],[2,0]]},
 diagonal:{label:'Diagonal con valores distintos',matrix:[[2,0],[0,-1]]},
 zero:{label:'Nula cuadrada',matrix:[[0,0],[0,0]]},
 rectangular:{label:'Rectangular 2×3',matrix:[[1,2,3],[4,5,6]]},
 single:{label:'Una sola entrada',matrix:[[4]]}
};
export function transpose(a){
 const {rows,cols}=dimensions(a);
 return Array.from({length:cols},(_,j)=>Array.from({length:rows},(_,i)=>a[i][j]));
}
export function inspectSymmetry(a){
 const {rows,cols}=dimensions(a),square=rows===cols,transposed=transpose(a),opposite=a.map(row=>row.map(v=>v===0?0:-v)),pairs=[];
 if(square)for(let i=0;i<rows;i++)for(let j=i;j<cols;j++)pairs.push({row:i+1,col:j+1,a:a[i][j],b:a[j][i],symmetric:a[i][j]===a[j][i],skew:a[i][j]===-a[j][i]});
 return {rows,cols,square,transposed,opposite,pairs,
 symmetric:square&&pairs.every(p=>p.symmetric),skew:square&&pairs.every(p=>p.skew),
 symmetryWitness:pairs.find(p=>!p.symmetric)??null,skewWitness:pairs.find(p=>!p.skew)??null};
}
export function generatedSymmetryMatrix(seed=1,rows=3,cols=3){return generatedMatrix(rows,cols,seed);}

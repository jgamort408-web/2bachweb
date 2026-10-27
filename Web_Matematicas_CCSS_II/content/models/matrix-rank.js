import {dimensions,generatedMatrix} from './matrix-basics.js';
import {determinantByExpansion} from './determinant-expansion.js';
import {fraction} from './matrix-inverse.js';
export const rankPresets={
 dependent:{label:'Orden 3: rango 2',matrix:[[1,2,3],[2,4,6],[0,1,1]]},
 rectangular:{label:'Rectangular: rango 1',matrix:[[1,2,3],[2,4,6]]},
 full:{label:'Orden 3: rango 3',matrix:[[1,2,0],[0,1,1],[1,0,1]]},
 zero:{label:'Matriz nula 2×3',matrix:[[0,0,0],[0,0,0]]},
 augmented:{label:'Rectangular 3×4: rango 2',matrix:[[1,0,2,1],[2,0,4,2],[0,1,1,0]]}
};
function validate(a){const d=dimensions(a);if(d.rows>3||d.cols>4)throw new RangeError('De 1 a 3 filas y de 1 a 4 columnas.');if(a.flat().some(v=>!Number.isInteger(v)||Math.abs(v)>9))throw new RangeError('Entradas enteras entre −9 y 9.');return d;}
function combinations(n,k,start=0,prefix=[]){if(!k)return [prefix];const out=[];for(let i=start;i<=n-k;i++)out.push(...combinations(n,k-1,i+1,[...prefix,i]));return out;}
const multiply=(a,b)=>fraction(a.numerator*b.numerator,a.denominator*b.denominator);
const subtract=(a,b)=>fraction(a.numerator*b.denominator-b.numerator*a.denominator,a.denominator*b.denominator);
/** Eliminación exacta, con pivotes normalizados; nunca se divide por cero. */
export function rowEchelon(a){
 const {rows,cols}=validate(a),work=a.map(r=>r.map(v=>fraction(v))),steps=[],pivots=[];
 const save=operation=>steps.push({...operation,matrix:work.map(r=>r.map(v=>({...v})))});
 let row=0;
 for(let col=0;col<cols&&row<rows;col++){
  const pivot=work.findIndex((r,i)=>i>=row&&r[col].numerator!==0);if(pivot<0)continue;
  if(pivot!==row){[work[pivot],work[row]]=[work[row],work[pivot]];save({type:'swap',target:row+1,source:pivot+1});}
  const p=work[row][col];
  if(p.numerator!==p.denominator){const factor=fraction(p.denominator,p.numerator);work[row]=work[row].map(v=>multiply(v,factor));save({type:'scale',target:row+1,factor});}
  for(let i=row+1;i<rows;i++){const f=work[i][col];if(!f.numerator)continue;work[i]=work[i].map((v,j)=>subtract(v,multiply(f,work[row][j])));save({type:'add',target:i+1,source:row+1,factor:fraction(-f.numerator,f.denominator)});}
  pivots.push({row:row+1,col:col+1});row++;
 }
 return {rank:pivots.length,matrix:work,pivots,steps};
}
export function rankDetails(a){
 const {rows,cols}=validate(a),limit=Math.min(rows,cols),levels=[];
 for(let order=1;order<=limit;order++){
  const minors=[];
  for(const r of combinations(rows,order))for(const c of combinations(cols,order)){const matrix=r.map(i=>c.map(j=>a[i][j]));minors.push({rows:r.map(i=>i+1),cols:c.map(j=>j+1),matrix,value:determinantByExpansion(matrix)});}
  levels.push({order,minors,nonzero:minors.filter(m=>m.value!==0).length});
 }
 const rank=levels.reduce((r,l)=>l.nonzero?l.order:r,0),witness=rank?levels[rank-1].minors.find(m=>m.value!==0):null;
 return {rows,cols,limit,rank,levels,witness,echelon:rowEchelon(a)};
}
export function generatedRankMatrix(seed=1,rows=3,cols=3){if(!Number.isInteger(rows)||!Number.isInteger(cols)||rows<1||rows>3||cols<1||cols>4)throw new RangeError('Dimensiones del editor fuera de rango.');return generatedMatrix(rows,cols,seed);}

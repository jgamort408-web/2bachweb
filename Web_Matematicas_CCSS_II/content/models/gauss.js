import {rowEchelon} from './matrix-rank.js';
import {generatedMatrix,dimensions} from './matrix-basics.js';
import {fraction,fractionTex} from './matrix-inverse.js';
const tex=String.raw;
export const gaussPresets={
 unique:{label:'Tres incógnitas: solución única',rows:[[1,1,1,6],[2,-1,0,0],[0,1,-1,-1]]},
 swap:{label:'Pivote inicial cero: intercambiar',rows:[[0,2,4],[1,1,3]]},
 fractional:{label:'Solución fraccionaria',rows:[[2,1,1],[1,2,0]]},
 infinite:{label:'Una variable libre',rows:[[1,1,3],[2,2,6]]},
 impossible:{label:'Una contradicción',rows:[[1,1,3],[2,2,7]]},
 wide:{label:'Dos ecuaciones, tres incógnitas',rows:[[1,0,1,2],[0,1,-1,1]]},
 skipped:{label:'Primera columna sin pivote',rows:[[0,1,1,2],[0,2,2,4]]},
 zero:{label:'Todas las variables libres',rows:[[0,0,0],[0,0,0]]}
};
const mul=(a,b)=>fraction(a.numerator*b.numerator,a.denominator*b.denominator);
const sub=(a,b)=>fraction(a.numerator*b.denominator-b.numerator*a.denominator,a.denominator*b.denominator);
export function gaussDetails(rows){
 const {rows:m,cols}=dimensions(rows),n=cols-1;
 if(![2,3].includes(m)||![2,3].includes(n))throw new RangeError('Dos o tres ecuaciones e incógnitas.');
 const echelon=rowEchelon(rows),pivots=echelon.pivots.filter(p=>p.col<=n),r=pivots.length,s=echelon.rank;
 const free=Array.from({length:n},(_,j)=>j).filter(j=>!pivots.some(p=>p.col===j+1));
 const kind=r<s?'SI':r===n?'SCD':'SCI';
 const result={rows:rows.map(row=>[...row]),m,n,echelon,r,s,kind,free,expressions:null,backSteps:[],checks:null};
 if(kind==='SI')return result;
 // Each affine expression is [constant, coefficient of t_1, ...].
 const expressions=Array.from({length:n},()=>Array.from({length:free.length+1},()=>fraction(0)));
 free.forEach((col,k)=>{expressions[col][k+1]=fraction(1);});
 for(const p of [...pivots].reverse()){
  const i=p.row-1,j=p.col-1,row=echelon.matrix[i];
  let value=[row[n],...free.map(()=>fraction(0))];
  for(let k=j+1;k<n;k++)value=value.map((v,t)=>sub(v,mul(row[k],expressions[k][t])));
  const reciprocal=fraction(row[j].denominator,row[j].numerator);
  expressions[j]=value.map(v=>mul(v,reciprocal));
  result.backSteps.push({row:i,variable:j,expression:expressions[j]});
 }
 result.expressions=expressions;
 result.checks=rows.map(row=>Array.from({length:free.length+1},(_,k)=>{
  let total=fraction(0);
  for(let j=0;j<n;j++)total=sub(total,mul(fraction(-row[j]),expressions[j][k]));
  return total;
 }));
 return result;
}
export function affineTex(expression){
 const parts=[];
 expression.forEach((f,k)=>{
  if(!f.numerator)return;
  const sign=f.numerator<0?'-':parts.length?'+':'';
  const absolute=fraction(Math.abs(f.numerator),f.denominator);
  parts.push(sign+(k?(absolute.numerator===absolute.denominator?'':fractionTex(absolute))+tex`t_{${k}}`:fractionTex(absolute)));
 });
 return parts.join('')||'0';
}
export function generatedGauss(seed=1,rows=3,unknowns=3){
 if(![2,3].includes(rows)||![2,3].includes(unknowns))throw new RangeError('Dos o tres ecuaciones e incógnitas.');
 return generatedMatrix(rows,unknowns+1,seed);
}

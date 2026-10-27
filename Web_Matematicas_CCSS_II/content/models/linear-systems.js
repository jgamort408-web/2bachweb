const tex=String.raw;
export const variables=['x','y','z'];
export const systemPresets={
 tickets:{label:'Entradas: cumplir solo una ecuación',a:[[1,1],[8,5]],b:[10,65],values:[6,4]},
 signed:{label:'Signos y coeficiente cero',a:[[2,-1],[0,3]],b:[-5,3],values:[-2,1]},
 three:{label:'Dos ecuaciones, tres incógnitas',a:[[1,1,1],[2,1,0]],b:[6,5],values:[1,3,2]},
 identity:{label:'Una igualdad que no impone restricción',a:[[0,0],[1,-1]],b:[0,0],values:[2,2]},
 contradiction:{label:'Una igualdad imposible',a:[[0,0],[1,-1]],b:[1,0],values:[2,2]}
};
const valid=v=>Number.isInteger(v)&&v>=-99&&v<=99;
export function validateSystem({a,b,values}){
 if(!Array.isArray(a)||![2,3].includes(a.length)||!Array.isArray(a[0])||![2,3].includes(a[0].length))throw new RangeError('De 2 a 3 ecuaciones e incógnitas.');
 const n=a[0].length;
 if(a.some(row=>!Array.isArray(row)||row.length!==n||!row.every(valid))||!Array.isArray(b)||b.length!==a.length||!b.every(valid)||!Array.isArray(values)||values.length!==n||!values.every(valid))throw new RangeError('Dimensiones coherentes y enteros entre −99 y 99.');
 return {rows:a.length,cols:n};
}
export function evaluateSystem(system){
 const {a,b,values}=system;const dimensions=validateSystem(system);
 const rows=a.map((row,i)=>{const products=row.map((v,j)=>v*values[j]),left=products.reduce((sum,v)=>sum+v,0);return {products,left,right:b[i],residual:left-b[i],satisfied:left===b[i]};});
 return {...dimensions,checks:rows,satisfied:rows.every(r=>r.satisfied),count:rows.filter(r=>r.satisfied).length};
}
export function linearTex(coefficients){
 const terms=[];
 coefficients.forEach((c,i)=>{if(c===0)return;const sign=c<0?'-':terms.length?'+':'';terms.push(sign+(Math.abs(c)===1?'':Math.abs(c))+variables[i]);});
 return terms.join('')||'0';
}
export function systemTex(system){
 validateSystem(system);
 return tex`\begin{cases}${system.a.map((row,i)=>linearTex(row)+'='+system.b[i]).join(tex`\\`)}\end{cases}`;
}
export function resizeSystem(system,rows,cols){
 validateSystem(system);if(![2,3].includes(rows)||![2,3].includes(cols))throw new RangeError('De 2 a 3 ecuaciones e incógnitas.');
 return {a:Array.from({length:rows},(_,i)=>Array.from({length:cols},(_,j)=>system.a[i]?.[j]??0)),b:Array.from({length:rows},(_,i)=>system.b[i]??0),values:Array.from({length:cols},(_,j)=>system.values[j]??0)};
}
export function generateSystem(seed=1,rows=2,cols=2){
 if(![2,3].includes(rows)||![2,3].includes(cols))throw new RangeError('De 2 a 3 ecuaciones e incógnitas.');
 let state=Number(seed)>>>0;
 const next=()=>{state=(Math.imul(state,1664525)+1013904223)>>>0;return (state>>>16)%9-4;};
 const solution=Array.from({length:cols},next);
 const a=Array.from({length:rows},()=>{const row=Array.from({length:cols},next);if(row.every(v=>v===0))row[0]=1;return row;});
 const b=a.map(row=>row.reduce((sum,c,j)=>sum+c*solution[j],0));
 return {a,b,values:Array(cols).fill(0),solution};
}

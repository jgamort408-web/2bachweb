import {fraction,fractionTex} from './matrix-inverse.js';
import {matrixTex} from './system-notation.js';
import {generateSystem} from './linear-systems.js';
const tex=String.raw;
export const equivalentPresets={
 unique:{label:'Una solución',rows:[[1,1,3],[2,-1,0]]},
 infinite:{label:'Ecuaciones dependientes',rows:[[1,1,4],[2,2,8]]},
 none:{label:'Condiciones incompatibles',rows:[[1,1,4],[2,2,9]]},
 fractional:{label:'Normalizar con fracciones',rows:[[2,-1,-5],[0,3,3]]},
 wide:{label:'Dos ecuaciones, tres incógnitas',rows:[[1,0,1,2],[0,1,-1,1]]},
 three:{label:'Tres ecuaciones',rows:[[1,1,1,6],[2,-1,0,0],[0,1,-1,-1]]}
};
const add=(a,b)=>fraction(a.numerator*b.denominator+b.numerator*a.denominator,a.denominator*b.denominator);
const multiply=(a,b)=>fraction(a.numerator*b.numerator,a.denominator*b.denominator);
function checked(f){
 if(!f||!Number.isSafeInteger(f.numerator)||!Number.isSafeInteger(f.denominator)||f.denominator===0)throw new RangeError('Fracción no válida.');
 const v=fraction(f.numerator,f.denominator);
 if(Math.abs(v.numerator)>1000000||v.denominator>1000000)throw new RangeError('Límite de cálculo exacto alcanzado. Deshaz un paso o reinicia.');
 return v;
}
export function validateAugmented(matrix){
 if(!Array.isArray(matrix)||![2,3].includes(matrix.length)||!Array.isArray(matrix[0])||![3,4].includes(matrix[0].length))throw new RangeError('Se requieren dos o tres ecuaciones e incógnitas.');
 const width=matrix[0].length;
 return matrix.map(row=>{if(!Array.isArray(row)||row.length!==width)throw new RangeError('Filas de distinta longitud.');return row.map(checked);});
}
export function fromIntegerRows(rows){return validateAugmented(rows.map(row=>row.map(v=>fraction(v))));}
export function applyRowOperation(matrix,op){
 const result=validateAugmented(matrix),n=result.length;
 if(!op||!['swap','scale','add'].includes(op.kind)||!Number.isInteger(op.target)||op.target<0||op.target>=n)throw new RangeError('Elige una operación y una fila de destino válidas.');
 const {kind,target,source}=op;
 if(kind!=='scale'&&(!Number.isInteger(source)||source<0||source>=n||source===target))throw new RangeError('Origen y destino deben ser filas distintas.');
 if(kind==='swap'){[result[target],result[source]]=[result[source],result[target]];return result;}
 const scalar=checked(op.scalar);
 if(Math.abs(scalar.numerator)>9||scalar.denominator>9)throw new RangeError('Usa un factor con numerador entre −9 y 9 y denominador entre 1 y 9.');
 if(kind==='scale'&&scalar.numerator===0)throw new RangeError('Multiplicar por cero puede borrar una condición. Usa un factor no nulo.');
 result[target]=result[target].map((v,j)=>kind==='scale'?multiply(v,scalar):add(v,multiply(result[source][j],scalar)));
 return validateAugmented(result);
}
export function inverseOperation(op){
 if(op.kind==='swap')return {...op};
 if(op.kind==='scale')return {...op,scalar:fraction(op.scalar.denominator,op.scalar.numerator)};
 if(op.kind==='add')return {...op,scalar:fraction(-op.scalar.numerator,op.scalar.denominator)};
 throw new RangeError('Operación desconocida.');
}
export function operationTex(op){
 const a=op.target+1,b=op.source+1;
 if(op.kind==='swap')return tex`F_${a}\leftrightarrow F_${b}`;
 const k=fractionTex(op.scalar);
 return op.kind==='scale'?tex`F_${a}\leftarrow\left(${k}\right)F_${a}`:tex`F_${a}\leftarrow F_${a}+\left(${k}\right)F_${b}`;
}
export function augmentedTex(matrix){return matrixTex(validateAugmented(matrix).map(row=>row.map(fractionTex)),true);}
export function equivalentSystemTex(matrix){
 const a=validateAugmented(matrix),names=['x','y','z'];
 const linear=row=>{
  const parts=[];
  row.slice(0,-1).forEach((v,j)=>{
   if(v.numerator===0)return;
   const sign=v.numerator<0?'-':parts.length?'+':'';
   const abs=fraction(Math.abs(v.numerator),v.denominator);
   parts.push(sign+(abs.numerator===abs.denominator?'':fractionTex(abs))+names[j]);
  });
  return (parts.join('')||'0')+'='+fractionTex(row.at(-1));
 };
 return tex`\begin{cases}${a.map(linear).join(tex`\\`)}\end{cases}`;
}
export function generatedEquivalentRows(seed,rows=2,cols=2){
 const s=generateSystem(seed,rows,cols);
 return fromIntegerRows(s.a.map((row,i)=>[...row,s.b[i]]));
}

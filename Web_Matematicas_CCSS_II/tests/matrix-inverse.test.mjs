import { expectedCatalog } from "./helpers/catalog-expectations.mjs";
import test from 'node:test';
import assert from 'node:assert/strict';
import {inverseDetails,inversePresets,generatedInverseMatrix,fraction,fractionTex,rationalMatrixTex} from '../content/models/matrix-inverse.js';
import {multiplyMatrices} from '../content/models/matrix-product.js';
import {questionsForScope,cardsForScope} from '../content/activities/catalog.js';
const value=f=>f.numerator/f.denominator;
const numeric=m=>m.map(r=>r.map(value));
const product=(a,b)=>multiplyMatrices(a,b).result;
const eye=(n,k=1)=>Array.from({length:n},(_,i)=>Array.from({length:n},(_,j)=>i===j?k:0));
const close=(a,b)=>{assert.equal(a.length,b.length);a.forEach((r,i)=>r.forEach((v,j)=>assert.ok(Math.abs(v-b[i][j])<1e-9)));};
// Referencia independiente por Gauss-Jordan, sin cofactores ni la fórmula de la adjunta.
function gaussian(a){
 const n=a.length,m=a.map((row,i)=>[...row,...eye(n)[i]]);
 for(let k=0;k<n;k++){
  let pivot=k;for(let i=k+1;i<n;i++)if(Math.abs(m[i][k])>Math.abs(m[pivot][k]))pivot=i;
  if(Math.abs(m[pivot][k])<1e-10)return null;
  [m[k],m[pivot]]=[m[pivot],m[k]];const d=m[k][k];m[k]=m[k].map(x=>x/d);
  for(let i=0;i<n;i++)if(i!==k){const f=m[i][k];m[i]=m[i].map((x,j)=>x-f*m[k][j]);}
 }
 return m.map(r=>r.slice(n));
}
test('1625 matrices: inversa contrastada con Gauss-Jordan, ambos productos e identidades exactas',()=>{
 const matrices=[];
 for(let a=-2;a<=2;a++)for(let b=-2;b<=2;b++)for(let c=-2;c<=2;c++)for(let d=-2;d<=2;d++)matrices.push([[a,b],[c,d]]);
 for(let seed=0;seed<1000;seed++)matrices.push(generatedInverseMatrix(seed,3));
 for(const a of matrices){
  const copy=structuredClone(a),m=inverseDetails(a),ref=gaussian(a),n=a.length;
  assert.equal(m.invertible,ref!==null);assert.deepEqual(m.left,eye(n,m.det));assert.deepEqual(m.right,eye(n,m.det));
  for(let i=0;i<n;i++)for(let j=0;j<n;j++)assert.equal(m.adjugate[j][i],m.cofactors[i][j]);
  if(ref){close(numeric(m.inverse),ref);close(product(a,numeric(m.inverse)),eye(n));close(product(numeric(m.inverse),a),eye(n));
   assert.deepEqual(numeric(m.leftIdentity),eye(n));assert.deepEqual(numeric(m.rightIdentity),eye(n));
   assert.ok(m.inverse.flat().every(f=>Number.isInteger(f.numerator)&&Number.isInteger(f.denominator)&&f.denominator>0));
  }else{assert.equal(m.inverse,null);assert.equal(m.leftIdentity,null);assert.equal(m.rightIdentity,null);}
  assert.deepEqual(a,copy);
 }
});
test('cinco ejemplos, ecuaciones por ambos lados, sistema, parámetro y práctica',()=>{
 const a=inversePresets.two.matrix,inv=numeric(inverseDetails(a).inverse);
 assert.deepEqual(inverseDetails(a).adjugate,[[2,-1],[-1,2]]);
 const b=inverseDetails(inversePresets.three.matrix);
 assert.deepEqual(b.cofactors,[[1,1,-1],[-2,1,2],[2,-1,1]]);
 assert.deepEqual(b.adjugate,[[1,-2,2],[1,1,-1],[-1,2,1]]);assert.equal(b.det,3);
 const s=inverseDetails(inversePresets.singular.matrix);assert.equal(s.invertible,false);assert.deepEqual(s.adjugate,[[4,-2],[-2,1]]);
 const D=[[1,0],[0,3]],left=product(inv,D),right=product(D,inv);
 close(left,[[2/3,-1],[-1/3,2]]);close(right,[[2/3,-1/3],[-1,2]]);close(product(a,left),D);close(product(right,a),D);assert.notDeepEqual(left,right);
 close(product(inv,[[8],[7]]),[[3],[2]]);
 const q=[[1,2],[0,2]],qi=numeric(inverseDetails(q).inverse);close(qi,[[1,-1],[0,.5]]);close(product(qi,[[5],[4]]),[[1],[2]]);close(product(q,[[1],[2]]),[[5],[4]]);
 for(const t of [-3,-1,0,1,3]){const p=[[t,1],[2,t]],m=inverseDetails(p);assert.equal(m.det,t*t-2);close(numeric(m.inverse),[[t/(t*t-2),-1/(t*t-2)],[-2/(t*t-2),t/(t*t-2)]]);}
 for(const t of [-Math.sqrt(2),Math.sqrt(2)])assert.ok(Math.abs(t*t-2)<1e-12);
 const B=[[1,1],[0,1]],AB=product(a,B);close(numeric(inverseDetails(AB).inverse),product(numeric(inverseDetails(B).inverse),inv));
});
test('fracciones exactas: reducción, cero, signo, TeX y validación',()=>{
 assert.deepEqual(fraction(6,-9),{numerator:-2,denominator:3});assert.deepEqual(fraction(-6,-9),{numerator:2,denominator:3});assert.deepEqual(fraction(0,-3),{numerator:0,denominator:1});
 assert.equal(fractionTex(fraction(-1,2)),String.raw`-\frac{1}{2}`);assert.equal(fractionTex(fraction(4,2)),'2');assert.equal(fractionTex(fraction(0,3)),'0');
 assert.equal(rationalMatrixTex([[fraction(1,2),fraction(-1,3)]]),String.raw`\begin{pmatrix}\frac{1}{2}&-\frac{1}{3}\end{pmatrix}`);
 assert.throws(()=>fraction(1,0),RangeError);for(const n of [.5,NaN,Infinity,Number.MAX_SAFE_INTEGER+1])assert.throws(()=>fraction(n),TypeError);
});
test('editor acotado, órdenes válidos y variantes reproducibles',()=>{
 for(const a of [[],[[NaN]],[[1],[2,3]]])assert.throws(()=>inverseDetails(a),TypeError);
 for(const a of [[[1]],[[1,2,3],[4,5,6]],eye(4),[[10,0],[0,1]],[[.5,0],[0,1]]])assert.throws(()=>inverseDetails(a),RangeError);
 for(const n of [0,1,4,2.5])assert.throws(()=>generatedInverseMatrix(1,n),RangeError);
 for(let seed=0;seed<100;seed++)for(const n of [2,3]){const a=generatedInverseMatrix(seed,n);assert.deepEqual(a,generatedInverseMatrix(seed,n));assert.ok(a.flat().every(v=>Number.isInteger(v)&&Math.abs(v)<=3));}
 for(const preset of Object.values(inversePresets))assert.doesNotThrow(()=>inverseDetails(preset.matrix));
});
test('seis preguntas y tarjetas; t04 72/72 y curso 318/301',()=>{
 const bank=questionsForScope('t04-e09');assert.equal(bank.length,6);assert.equal(cardsForScope('t04-e09').length,6);
 for(const q of bank){assert.equal(q.options.length,4);assert.equal(new Set(q.options.map(o=>o.text)).size,4);assert.ok(q.hint&&q.explanation&&q.options.some(o=>o.id===q.correct));}
 assert.equal(questionsForScope('t04').length,72);assert.equal(cardsForScope('t04').length,72);assert.equal(questionsForScope('all-course').length,expectedCatalog.questions);assert.equal(cardsForScope().length,expectedCatalog.cards);
 assert.equal(new Set(questionsForScope('all-course').map(q=>q.id)).size,expectedCatalog.questions);assert.equal(new Set(cardsForScope().map(q=>q.id)).size,expectedCatalog.cards);
});



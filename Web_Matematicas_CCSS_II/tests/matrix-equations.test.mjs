import { expectedCatalog } from "./helpers/catalog-expectations.mjs";
import test from 'node:test';
import assert from 'node:assert/strict';
import {solveMatrixEquation,generatedEquation,equationPresets} from '../content/models/matrix-equations.js';
import {multiplyMatrices} from '../content/models/matrix-product.js';
import {questionsForScope,cardsForScope} from '../content/activities/catalog.js';
const mul=(a,b)=>multiplyMatrices(a,b).result,transpose=a=>a[0].map((_,j)=>a.map(r=>r[j]));
const numeric=a=>a.map(r=>r.map(f=>f.numerator/f.denominator));
const close=(a,b)=>{assert.equal(a.length,b.length);a.forEach((r,i)=>{assert.equal(r.length,b[i].length);r.forEach((v,j)=>assert.ok(Math.abs(v-b[i][j])<1e-8));});};
// Resuelve por Gauss-Jordan con varios términos independientes, sin cofactores.
function reference(a,b){
 const n=a.length,m=a.map((r,i)=>[...r,...b[i]]);
 for(let j=0;j<n;j++){
  let p=j;for(let i=j+1;i<n;i++)if(Math.abs(m[i][j])>Math.abs(m[p][j]))p=i;
  if(Math.abs(m[p][j])<1e-9)return null;[m[p],m[j]]=[m[j],m[p]];
  const d=m[j][j];m[j]=m[j].map(v=>v/d);
  for(let i=0;i<n;i++)if(i!==j){const f=m[i][j];m[i]=m[i].map((v,k)=>v-f*m[j][k]);}
 }
 return m.map(r=>r.slice(n));
}
test('8400 ecuaciones: lados, dimensiones y escalares frente a Gauss-Jordan',()=>{
 for(const n of [2,3])for(const width of [1,2,3])for(const side of ['left','right'])for(let k=-3;k<=3;k++)for(let seed=0;seed<100;seed++){
  const {a,b}=generatedEquation(seed,n,width,side),copy=structuredClone({a,b}),m=solveMatrixEquation(a,b,{side,k});
  const coefficient=a.map((r,i)=>r.map((v,j)=>v+(i===j?k:0)));
  const ref=side==='left'?reference(coefficient,b):reference(transpose(coefficient),transpose(b));
  assert.equal(m.status,ref?'unique':'singular');
  if(ref){
   const x=numeric(m.solution);close(x,side==='left'?ref:transpose(ref));assert.equal(m.verified,true);close(numeric(m.check),b);
   const product=side==='left'?mul(a,x):mul(x,a);close(product.map((r,i)=>r.map((v,j)=>v+k*x[i][j])),b);
   assert.ok(m.solution.flat().every(f=>f.denominator>0&&Number.isInteger(f.denominator)&&Number.isInteger(f.numerator)));
  }else{assert.equal(m.det,0);assert.equal(m.solution,undefined);assert.match(m.reason,/hay que estudiar/);}
  assert.deepEqual({a,b},copy);
 }
});
test('cinco ejemplos, dos lados, dos factores, singularidad y práctica',()=>{
 const A=[[2,1],[1,2]],B=[[1,0],[0,3]];
 close(numeric(solveMatrixEquation(A,B).solution),[[2/3,-1],[-1/3,2]]);
 close(numeric(solveMatrixEquation(A,B,{side:'right'}).solution),[[2/3,-1/3],[-1,2]]);
 close(numeric(solveMatrixEquation(A,[[1,0,3],[0,3,6]]).solution),[[2/3,-1,0],[-1/3,2,3]]);
 const shifted=solveMatrixEquation([[3,1],[1,3]],[[3,0],[0,3]],{k:-1});close(numeric(shifted.solution),[[2,-1],[-1,2]]);assert.equal(shifted.verified,true);
 assert.equal(solveMatrixEquation(A,B,{k:-1}).status,'singular');
 const a=[[1,1],[0,1]],d=[[2,0],[0,1]],b=[[2,3],[0,1]],x=[[1,2],[0,1]];assert.deepEqual(mul(mul(a,x),d),b);
 const first=solveMatrixEquation(a,b),second=solveMatrixEquation(d,numeric(first.solution),{side:'right'});close(numeric(second.solution),x);
 for(let s=-3;s<=3;s++)for(let t=-3;t<=3;t++)assert.deepEqual(mul([[1,2],[2,4]],[[3-2*s,1-2*t],[s,t]]),[[3,1],[6,2]]);
 // La primera columna incompatible implica 2*3 != 7.
 assert.notEqual(2*3,7);
 const pa=[[1,2],[0,1]],pb=[[3,1],[1,2]];close(numeric(solveMatrixEquation(pa,pb).solution),[[1,-3],[1,2]]);close(numeric(solveMatrixEquation(pa,pb,{side:'right'}).solution),[[3,-5],[1,0]]);
 close(numeric(solveMatrixEquation(equationPresets.three.a,equationPresets.three.b).solution),[[1],[1],[1]]);
});
test('dimensiones incompatibles y separación de estados',()=>{
 const a=[[1,0],[0,1]];
 assert.equal(solveMatrixEquation(a,[[1],[2],[3]]).status,'incompatible');
 assert.equal(solveMatrixEquation(a,[[1,2,3]],{side:'right'}).status,'incompatible');
 assert.equal(solveMatrixEquation(a,[[1,2,3],[4,5,6]]).status,'unique');
 assert.equal(solveMatrixEquation(a,[[1,2],[3,4],[5,6]],{side:'right'}).status,'unique');
 assert.equal(solveMatrixEquation([[1,2],[2,4]],[[3],[6]]).status,'singular');
 assert.equal(solveMatrixEquation([[1,2],[2,4]],[[3],[7]]).status,'singular');
});
test('validación, límites y generación reproducible',()=>{
 for(const a of [[],[[NaN]],[[1],[2,3]]])assert.throws(()=>solveMatrixEquation(a,[[1],[2]]),TypeError);
 for(const a of [[[1]],[[1,2,3],[4,5,6]],[[7,0],[0,1]],[[.5,0],[0,1]]])assert.throws(()=>solveMatrixEquation(a,[[1],[2]]),RangeError);
 const a=[[1,0],[0,1]];
 for(const b of [[[10],[0]],[[.5],[0]],[[1,2,3,4],[0,0,0,0]]])assert.throws(()=>solveMatrixEquation(a,b),RangeError);
 for(const k of [-4,4,.5])assert.throws(()=>solveMatrixEquation(a,a,{k}),RangeError);
 assert.throws(()=>solveMatrixEquation(a,a,{side:'other'}),RangeError);
 assert.throws(()=>generatedEquation(1,4),RangeError);assert.throws(()=>generatedEquation(1,2,4),RangeError);
 for(let seed=0;seed<100;seed++){const p=generatedEquation(seed,3,2,'right');assert.deepEqual(p,generatedEquation(seed,3,2,'right'));assert.equal(p.b.length,2);assert.equal(p.b[0].length,3);}
});
test('seis preguntas y tarjetas; t04 72/72 y curso 318/301',()=>{
 const bank=questionsForScope('t04-e11');assert.equal(bank.length,6);assert.equal(cardsForScope('t04-e11').length,6);
 for(const q of bank){assert.equal(q.options.length,4);assert.equal(new Set(q.options.map(o=>o.text)).size,4);assert.ok(q.hint&&q.explanation&&q.options.some(o=>o.id===q.correct));}
 assert.equal(questionsForScope('t04').length,72);assert.equal(cardsForScope('t04').length,72);assert.equal(questionsForScope('all-course').length,expectedCatalog.questions);assert.equal(cardsForScope().length,expectedCatalog.cards);
 assert.equal(new Set(questionsForScope('all-course').map(q=>q.id)).size,expectedCatalog.questions);assert.equal(new Set(cardsForScope().map(q=>q.id)).size,expectedCatalog.cards);
});



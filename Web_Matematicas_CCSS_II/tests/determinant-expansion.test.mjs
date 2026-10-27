import { expectedCatalog } from "./helpers/catalog-expectations.mjs";
import test from 'node:test';
import assert from 'node:assert/strict';
import {expandDeterminant,determinantByExpansion,generatedExpansionMatrix,expansionPresets} from '../content/models/determinant-expansion.js';
import {questionsForScope,cardsForScope} from '../content/activities/catalog.js';
// Leibniz por permutaciones: referencia independiente del desarrollo por menores.
function reference(a){
 const n=a.length;let sum=0;
 function visit(p){if(p.length===n){let inversions=0;for(let i=0;i<n;i++)for(let j=i+1;j<n;j++)if(p[i]>p[j])inversions++;sum+=(inversions%2?-1:1)*p.reduce((v,j,i)=>v*a[i][j],1);return;}
 for(let j=0;j<n;j++)if(!p.includes(j))visit([...p,j]);}
 visit([]);return sum===0?0:sum;
}
test('900 matrices, 5400 desarrollos y cada menor contrastados con Leibniz',()=>{
 for(const n of [2,3,4])for(let seed=0;seed<300;seed++){
  const a=generatedExpansionMatrix(seed,n),copy=structuredClone(a),expected=reference(a);
  assert.equal(determinantByExpansion(a),expected);
  for(const axis of ['rows','cols'])for(let index=0;index<n;index++){
   const m=expandDeterminant(a,axis,index);assert.equal(m.value,expected);
   for(const t of m.terms){const sub=a.filter((_,i)=>i!==t.row-1).map(r=>r.filter((_,j)=>j!==t.col-1));assert.deepEqual(t.minorMatrix,sub);assert.equal(t.minor,reference(sub));assert.equal(t.sign,(t.row+t.col)%2?-1:1);assert.equal(t.cofactor,t.sign*t.minor||0);assert.equal(t.product,t.entry*t.cofactor||0);}
  }
  assert.deepEqual(a,copy);assert.deepEqual(a,generatedExpansionMatrix(seed,n));
 }
});
test('ejemplos, ceros, parámetro y práctica',()=>{
 const a=expansionPresets.three.matrix;
 const t=expandDeterminant(a).terms[1];assert.deepEqual([t.minor,t.cofactor,t.product],[-8,8,16]);
 assert.equal(expandDeterminant(a).value,18);assert.deepEqual(expandDeterminant(a,'rows',1).terms.map(t=>t.product),[0,6,12]);
 assert.equal(expandDeterminant(expansionPresets.two.matrix,'cols',1).value,11);
 const four=expandDeterminant(expansionPresets.four.matrix);assert.equal(four.value,-36);assert.equal(four.nonzero,1);assert.equal(four.terms[1].minor,18);
 assert.equal(expandDeterminant(expansionPresets.singular.matrix).value,0);
 for(let t=-10;t<=10;t++)assert.equal(determinantByExpansion([[t,1,0],[2,0,1],[0,3,1]]),-3*t-2);
 assert.ok(Math.abs(determinantByExpansion([[-2/3,1,0],[2,0,1],[0,3,1]]))<1e-12);
 const q=[[2,0,1],[1,3,0],[0,-1,2]];assert.equal(expandDeterminant(q).value,11);assert.deepEqual(expandDeterminant(q,'cols',1).terms.map(t=>t.product),[0,12,-1]);
 const zero=expandDeterminant([[0,2],[3,4]]).terms[0];assert.equal(zero.minor,4);assert.equal(zero.product,0);
});
test('validación de orden, ejes, índices, entradas y límites',()=>{
 for(const a of [[],[[1],[2,3]],[[Infinity]],[[NaN]]])assert.throws(()=>determinantByExpansion(a),TypeError);
 assert.equal(determinantByExpansion([[-3]]),-3);assert.throws(()=>expandDeterminant([[1]]),RangeError);
 assert.throws(()=>expandDeterminant([[1,2,3],[4,5,6]]),RangeError);
 for(const size of [0,1,5,2.5])assert.throws(()=>generatedExpansionMatrix(1,size),RangeError);
 for(const i of [-1,2,.5])assert.throws(()=>expandDeterminant([[1,2],[3,4]],'rows',i),RangeError);
 assert.throws(()=>expandDeterminant([[1,2],[3,4]],'invalid'),RangeError);
 assert.throws(()=>determinantByExpansion([[Number.MAX_VALUE,0],[0,2]]),RangeError);
});
test('seis preguntas y tarjetas; t04 72/72 y curso 318/301',()=>{
 const bank=questionsForScope('t04-e08');assert.equal(bank.length,6);assert.equal(cardsForScope('t04-e08').length,6);
 for(const q of bank){assert.equal(q.options.length,4);assert.equal(new Set(q.options.map(o=>o.text)).size,4);assert.ok(q.hint&&q.explanation&&q.options.some(o=>o.id===q.correct));}
 assert.equal(questionsForScope('t04').length,72);assert.equal(cardsForScope('t04').length,72);
 assert.equal(questionsForScope('all-course').length,expectedCatalog.questions);assert.equal(cardsForScope().length,expectedCatalog.cards);
 assert.equal(new Set(questionsForScope('all-course').map(q=>q.id)).size,expectedCatalog.questions);assert.equal(new Set(cardsForScope().map(q=>q.id)).size,expectedCatalog.cards);
});



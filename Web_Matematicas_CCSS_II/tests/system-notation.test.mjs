import { expectedCatalog } from "./helpers/catalog-expectations.mjs";
import test from 'node:test';
import assert from 'node:assert/strict';
import {notationModel,notationPresets,matrixTex} from '../content/models/system-notation.js';
import {generateSystem} from '../content/models/linear-systems.js';
import {questionsForScope,cardsForScope} from '../content/activities/catalog.js';
function permutations(a){return a.length===1?[a]:a.flatMap((v,i)=>permutations(a.filter((_,j)=>i!==j)).map(t=>[v,...t]));}
test('8000 permutaciones: dimensiones, soluciones e invariancia del producto',()=>{
 for(const rows of [2,3])for(const cols of [2,3])for(let seed=0;seed<500;seed++){
  const system=generateSystem(seed,rows,cols);system.values=system.solution;
  const before=structuredClone(system);
  for(const order of permutations(Array.from({length:cols},(_,i)=>i))){
   const m=notationModel(system,order);
   assert.deepEqual(m.product,system.b);assert.ok(m.satisfied);
   assert.equal(m.a.length,rows);assert.ok(m.a.every(r=>r.length===cols));assert.ok(m.augmented.every(r=>r.length===cols+1));
   const recovered=m.a.map(row=>Array.from({length:cols},(_,j)=>row[order.indexOf(j)]));
   assert.deepEqual(recovered,system.a);assert.deepEqual(m.augmented.map(r=>r.at(-1)),system.b);
   const perturbed=structuredClone(system);perturbed.b[0]+=1;
   // Los datos generados tienen |b|<=48; la perturbación sigue dentro del editor.
   assert.equal(notationModel(perturbed,order).satisfied,false);
  }
  assert.deepEqual(system,before);
 }
});
test('presets: filas nulas, rectangulares y productos conocidos',()=>{
 const expected={square:[-5,3],wide:[4,5],tall:[3,0,3],three:[6,0,-1],homogeneous:[0,0],impossible:[0,0]};
 for(const [key,s]of Object.entries(notationPresets)){
  const m=notationModel(s);assert.deepEqual(m.product,expected[key]);assert.equal(m.satisfied,key!=='impossible');
  assert.deepEqual(m.augmented.map(r=>r.slice(0,-1)),s.a);assert.deepEqual(m.b,s.b);
 }
 assert.notDeepEqual(notationModel(notationPresets.homogeneous).a,[[0,0],[0,0]]);
 const m=notationModel(notationPresets.wide,[2,1,0]);assert.deepEqual(m.names,['z','y','x']);assert.deepEqual(m.a,[[ -2,0,1],[1,3,0]]);
 assert.equal(matrixTex([[1,0,4],[0,-1,5]],true),String.raw`\left(\begin{array}{cc|c}1&0&4\\0&-1&5\end{array}\right)`);
});
test('ejemplos y contexto: orden de miembros, columnas, filas y unidades',()=>{
 const reordered={a:[[2,-1],[1,1]],b:[-3,4],values:[1,3]};
 assert.deepEqual(notationModel(reordered).product,[-1,4]);
 // Comprobación exacta con denominador común para (1/3,11/3).
 assert.equal(2*1-11,-3*3);assert.equal(1+11,4*3);
 const s={a:[[1,2],[3,-1]],b:[5,1],values:[1,2]};
 assert.ok(notationModel(s).satisfied);assert.ok(notationModel(s,[1,0]).satisfied);
 const wrong={...s,values:[2,1]};assert.equal(notationModel(wrong).satisfied,false);
 const swapped={a:[s.a[1],s.a[0]],b:[1,5],values:s.values};assert.ok(notationModel(swapped).satisfied);
 assert.deepEqual(notationModel({a:[[1,1],[2,3]],b:[10,26],values:[4,6]}).product,[10,26]);
});
test('validación de permutaciones y datos: rechazo sin mutar',()=>{
 const s=structuredClone(notationPresets.square),before=structuredClone(s);
 for(const order of [[0,0],[0],[0,2],[0,1.5],[],null,'01'])assert.throws(()=>notationModel(s,order));
 for(const value of [NaN,0.5,100,-100])assert.throws(()=>notationModel({...s,b:[value,3]}));
 assert.throws(()=>notationModel({...s,a:[[2,-1],[3]]}));assert.deepEqual(s,before);
});
test('seis preguntas/tarjetas; tema 5 66/66; catálogo 318/301 sin duplicados',()=>{
 const q=questionsForScope('t05-e04');assert.equal(q.length,6);assert.equal(cardsForScope('t05-e04').length,6);
 for(const item of q){assert.equal(item.options.filter(o=>o.id===item.correct).length,1);assert.equal(new Set(item.options.map(o=>o.text)).size,4);}
 assert.equal(questionsForScope('t05').length,66);assert.equal(cardsForScope('t05').length,66);
 assert.equal(questionsForScope('all-course').length,expectedCatalog.questions);assert.equal(cardsForScope().length,expectedCatalog.cards);
 assert.equal(new Set(questionsForScope('all-course').map(q=>q.id)).size,expectedCatalog.questions);assert.equal(new Set(cardsForScope().map(c=>c.id)).size, expectedCatalog.cards);
});




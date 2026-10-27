import { expectedCatalog } from "./helpers/catalog-expectations.mjs";
import test from 'node:test';
import assert from 'node:assert/strict';
import {systemPresets,evaluateSystem,generateSystem,resizeSystem,linearTex,systemTex} from '../content/models/linear-systems.js';
import {questionsForScope,cardsForScope} from '../content/activities/catalog.js';
test('1000 semillas por dimensión: 4000 sistemas y sustitución simultánea contrastada',()=>{
 for(const rows of [2,3])for(const cols of [2,3])for(let seed=0;seed<1000;seed++){
  const s=generateSystem(seed,rows,cols);assert.deepEqual(s,generateSystem(seed,rows,cols));
  assert.ok(s.a.every(row=>row.some(v=>v!==0)));const copy=structuredClone(s);
  const solved={a:s.a,b:s.b,values:s.solution},m=evaluateSystem(solved);
  assert.equal(m.count,rows);assert.equal(m.satisfied,true);
  for(let i=0;i<rows;i++){
   let total=0;for(let j=0;j<cols;j++)total+=s.a[i][j]*s.solution[j];
   assert.equal(s.b[i],total);assert.equal(m.checks[i].left,total);assert.equal(m.checks[i].residual,0);
  }
  const changed={...solved,b:s.b.map((v,i)=>v+(i===0?1:0))};
  const failed=evaluateSystem(changed);assert.equal(failed.count,rows-1);assert.equal(failed.satisfied,false);assert.equal(failed.checks[0].residual,-1);
  assert.deepEqual(s,copy);
 }
});
test('ejemplos del libro y práctica: todas las igualdades, orden y signos',()=>{
 assert.deepEqual(evaluateSystem(systemPresets.tickets).checks.map(r=>r.left),[10,68]);assert.equal(evaluateSystem(systemPresets.tickets).count,1);
 assert.equal(evaluateSystem({...systemPresets.tickets,values:[5,5]}).satisfied,true);
 assert.equal(evaluateSystem(systemPresets.signed).satisfied,true);
 assert.equal(evaluateSystem(systemPresets.three).satisfied,true);assert.equal(evaluateSystem({...systemPresets.three,values:[2,1,3]}).satisfied,true);
 const practice={a:[[1,1],[2,5]],b:[7,23],values:[4,3]};assert.equal(evaluateSystem(practice).satisfied,true);
 assert.deepEqual(evaluateSystem({...practice,values:[3,4]}).checks.map(r=>r.left),[7,26]);
 // Reordenaciones algebraicas contrastadas con las expresiones originales.
 for(let x=-9;x<=9;x++)for(let y=-9;y<=9;y++){
  assert.equal(2*y-3===5-x,x+2*y===8);
  assert.equal(3*x+2===7-y,3*x+y===5);
 }
});
test('filas degeneradas: 0=0 no restringe; 0=1 siempre impide la solución',()=>{
 for(let x=-9;x<=9;x++)for(let y=-9;y<=9;y++){
  const identity=evaluateSystem({...systemPresets.identity,values:[x,y]}),impossible=evaluateSystem({...systemPresets.contradiction,values:[x,y]});
  assert.equal(identity.checks[0].satisfied,true);assert.equal(identity.satisfied,x===y);
  assert.equal(impossible.checks[0].satisfied,false);assert.equal(impossible.satisfied,false);
 }
});
test('dimensiones, datos inválidos, conservación y representación algebraica',()=>{
 const original=structuredClone(systemPresets.tickets),expanded=resizeSystem(original,3,3);
 assert.deepEqual(expanded.a,[[1,1,0],[8,5,0],[0,0,0]]);assert.deepEqual(expanded.b,[10,65,0]);assert.deepEqual(expanded.values,[6,4,0]);assert.deepEqual(resizeSystem(expanded,2,2),{a:original.a,b:original.b,values:original.values});assert.deepEqual(original,systemPresets.tickets);
 for(const invalid of [null,{a:[],b:[],values:[]},{...original,values:[1]},{...original,b:[NaN,1]},{...original,a:[[1,2],[3]]},{...original,values:[100,1]},{...original,b:[0.5,2]}])assert.throws(()=>evaluateSystem(invalid));
 assert.throws(()=>resizeSystem(original,4,2));assert.throws(()=>generateSystem(1,2,1));
 assert.equal(linearTex([0,-1,2]),'-y+2z');assert.equal(linearTex([0,0]),'0');assert.equal(linearTex([1,-2]),'x-2y');
 assert.equal(systemTex(systemPresets.signed),String.raw`\begin{cases}2x-y=-5\\3y=3\end{cases}`);
});
test('seis preguntas/tarjetas, filtro t05 y catálogo 318/301 sin duplicados',()=>{
 const q=questionsForScope('t05-e01'),c=cardsForScope('t05-e01');assert.equal(questionsForScope('t05').length,66);assert.equal(cardsForScope('t05').length,66);assert.equal(q.length,6);assert.equal(c.length,6);assert.deepEqual(q,questionsForScope('t05-e01'));
 for(const item of q){assert.equal(item.options.length,4);assert.equal(item.options.filter(o=>o.id===item.correct).length,1);assert.equal(new Set(item.options.map(o=>o.text)).size,4);}
 assert.equal(questionsForScope('t04').length,72);assert.equal(cardsForScope('t04').length,72);
 assert.equal(questionsForScope('all-course').length,expectedCatalog.questions);assert.equal(cardsForScope().length,expectedCatalog.cards);
 assert.equal(new Set(questionsForScope('all-course').map(q=>q.id)).size,expectedCatalog.questions);assert.equal(new Set(cardsForScope().map(q=>q.id)).size,expectedCatalog.cards);
});



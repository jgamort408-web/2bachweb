import { expectedCatalog } from "./helpers/catalog-expectations.mjs";
import test from 'node:test';
import assert from 'node:assert/strict';
import {fraction} from '../content/models/matrix-inverse.js';
import {equivalentPresets,fromIntegerRows,applyRowOperation,inverseOperation,generatedEquivalentRows,equivalentSystemTex,validateAugmented} from '../content/models/equivalent-systems.js';
import {questionsForScope,cardsForScope} from '../content/activities/catalog.js';
function rank(matrix){
 const a=structuredClone(matrix);let row=0;
 for(let col=0;col<a[0].length&&row<a.length;col++){
  let p=row;while(p<a.length&&Math.abs(a[p][col])<1e-10)p++;
  if(p===a.length)continue;[a[p],a[row]]=[a[row],a[p]];
  const pivot=a[row][col];for(let j=col;j<a[0].length;j++)a[row][j]/=pivot;
  for(let i=row+1;i<a.length;i++){const factor=a[i][col];for(let j=col;j<a[0].length;j++)a[i][j]-=factor*a[row][j];}row++;
 }return row;
}
const numbers=m=>m.map(r=>r.map(v=>v.numerator/v.denominator));
const type=m=>{const a=numbers(m),r=rank(a.map(row=>row.slice(0,-1)));return r!==rank(a)?'SI':r===a[0].length-1?'SCD':'SCI';};
const ops=[
 {kind:'swap',target:0,source:1},
 {kind:'scale',target:0,scalar:fraction(-2)},
 {kind:'scale',target:1,scalar:fraction(1,2)},
 {kind:'add',target:1,source:0,scalar:fraction(-3)},
 {kind:'add',target:1,source:0,scalar:fraction(0)}
];
test('10000 transformaciones: inversas exactas, rangos y datos originales conservados',()=>{
 for(const rows of [2,3])for(const cols of [2,3])for(let seed=0;seed<500;seed++){
  const a=generatedEquivalentRows(seed,rows,cols),before=structuredClone(a);
  assert.deepEqual(a,generatedEquivalentRows(seed,rows,cols));
  for(const op of ops){const b=applyRowOperation(a,op);assert.deepEqual(applyRowOperation(b,inverseOperation(op)),a);assert.equal(type(a),type(b));}
  assert.deepEqual(a,before);
 }
});
test('seis presets y tuplas: misma pertenencia antes y después, incluso SI y SCI',()=>{
 const satisfies=(m,x)=>numbers(m).every(r=>Math.abs(r.slice(0,-1).reduce((s,v,j)=>s+v*x[j],0)-r.at(-1))<1e-10);
 for(const p of Object.values(equivalentPresets)){
  const a=fromIntegerRows(p.rows),n=a[0].length-1;
  for(const op of ops){const b=applyRowOperation(a,op);for(let x=-3;x<=3;x++)for(let y=-3;y<=3;y++)for(const z of n===3?[-1,0,1]:[0]){
   const point=[x,y,z].slice(0,n);assert.equal(satisfies(a,point),satisfies(b,point));
  }}
 }
});
test('ejemplos, fracciones, pasos consecutivos y contraejemplos de pérdida de información',()=>{
 const op={kind:'add',target:1,source:0,scalar:fraction(-2)};
 assert.deepEqual(numbers(applyRowOperation(fromIntegerRows(equivalentPresets.unique.rows),op)),[[1,1,3],[0,-3,-6]]);
 assert.deepEqual(numbers(applyRowOperation(fromIntegerRows(equivalentPresets.infinite.rows),op)),[[1,1,4],[0,0,0]]);
 assert.deepEqual(numbers(applyRowOperation(fromIntegerRows(equivalentPresets.none.rows),op)),[[1,1,4],[0,0,1]]);
 const scaled=applyRowOperation(fromIntegerRows(equivalentPresets.fractional.rows),{kind:'scale',target:0,scalar:fraction(1,2)});
 assert.deepEqual(scaled[0],[fraction(1),fraction(-1,2),fraction(-5,2)]);
 assert.match(equivalentSystemTex(scaled),/frac/);
 const practice=fromIntegerRows([[2,1,7],[4,3,17]]);assert.deepEqual(numbers(applyRowOperation(practice,op)),[[2,1,7],[0,1,3]]);
 let a=fromIntegerRows(equivalentPresets.unique.rows);const original=structuredClone(a);
 for(const op of ops)a=applyRowOperation(a,op);
 for(const op of [...ops].reverse())a=applyRowOperation(a,inverseOperation(op));
 assert.deepEqual(a,original);
 assert.equal(type(fromIntegerRows([[1,0,1],[0,1,2]])),'SCD');
 assert.equal(type(fromIntegerRows([[0,0,0],[0,1,2]])),'SCI');
 assert.equal(type(fromIntegerRows([[1,1,3],[2,2,6]])),'SCI');
});
test('operaciones inválidas y límite exacto: rechazo sin modificar el estado',()=>{
 const a=fromIntegerRows(equivalentPresets.unique.rows),before=structuredClone(a);
 for(const op of [null,{kind:'other',target:0},{kind:'swap',target:0,source:0},{kind:'swap',target:3,source:1},{kind:'add',target:0,source:0,scalar:fraction(2)},{kind:'scale',target:0,scalar:fraction(0)},{kind:'scale',target:0,scalar:fraction(10)},{kind:'scale',target:0,scalar:{numerator:1,denominator:0}}])assert.throws(()=>applyRowOperation(a,op));
 assert.deepEqual(a,before);
 const big=fromIntegerRows([[1000000,0,0],[0,1,0]]);assert.throws(()=>applyRowOperation(big,{kind:'scale',target:0,scalar:fraction(2)}));assert.equal(big[0][0].numerator,1000000);
 assert.throws(()=>validateAugmented([[fraction(1)]]));assert.throws(()=>validateAugmented([[fraction(1),fraction(0),fraction(1)],[fraction(1)]]));
});
test('bancos 6/6, tema 5 66/66 y catálogo 318/301',()=>{
 const q=questionsForScope('t05-e05');assert.equal(q.length,6);assert.equal(cardsForScope('t05-e05').length,6);
 q.forEach(item=>{assert.equal(new Set(item.options.map(o=>o.text)).size,4);assert.equal(item.options.filter(o=>o.id===item.correct).length,1);});
 assert.equal(questionsForScope('t05').length,66);assert.equal(cardsForScope('t05').length,66);
 assert.equal(questionsForScope('all-course').length,expectedCatalog.questions);assert.equal(cardsForScope().length,expectedCatalog.cards);
 assert.equal(new Set(questionsForScope('all-course').map(q=>q.id)).size,expectedCatalog.questions);assert.equal(new Set(cardsForScope().map(c=>c.id)).size, expectedCatalog.cards);
});




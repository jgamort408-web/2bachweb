import { expectedCatalog } from "./helpers/catalog-expectations.mjs";
import test from 'node:test';
import assert from 'node:assert/strict';
import {transformDeterminant as transform,propertyPresets,generatedPropertyMatrix} from '../content/models/determinant-properties.js';
import {determinantDetails} from '../content/models/determinants.js';
import {multiplyMatrices} from '../content/models/matrix-product.js';
import {transpose} from '../content/models/matrix-symmetry.js';
import {questionsForScope,cardsForScope} from '../content/activities/catalog.js';
const det=a=>determinantDetails(a).value;
function independent(a){if(a.length===1)return a[0][0];return a[0].reduce((s,v,j)=>s+(j%2?-1:1)*v*independent(a.slice(1).map(row=>row.filter((_,k)=>k!==j))),0);}
test('54600 configuraciones: filas/columnas, signos, escalares y posiciones distintas',()=>{
 let count=0;
 for(const size of [2,3])for(let seed=0;seed<100;seed++)for(const axis of ['rows','cols'])for(let target=0;target<size;target++)for(let source=0;source<size;source++)for(let scalar=-3;scalar<=3;scalar++)for(const operation of ['swap','scale','add']){
  count++;const a=generatedPropertyMatrix(seed,size),copy=JSON.stringify(a),m=transform(a,{operation,axis,target,source,scalar});
  if(target===source&&operation!=='scale'){assert.equal(m.valid,false);assert.ok(m.reason);continue;}
  assert.equal(m.valid,true);assert.equal(m.before,independent(a)||0);assert.equal(m.after,independent(m.result)||0);assert.equal(m.after,m.expected);
  assert.equal(m.factor,operation==='swap'?-1:operation==='scale'?scalar:1);assert.equal(JSON.stringify(a),copy);
  for(let i=0;i<size;i++)for(let j=0;j<size;j++){
   const pos=axis==='rows'?i:j,at=index=>axis==='rows'?a[index][j]:a[i][index];
   const expected=operation==='swap'?(pos===target?at(source):pos===source?at(target):a[i][j]):pos!==target?a[i][j]:operation==='scale'?scalar*a[i][j]:a[i][j]+scalar*at(source);
   assert.equal(m.result[i][j],expected||0);
  }
 }
 assert.equal(count,54600);
});
test('escala global y traspuesta, incluyendo cero y base singular',()=>{
 for(const size of [2,3])for(let seed=0;seed<100;seed++)for(let scalar=-3;scalar<=3;scalar++){
  const a=generatedPropertyMatrix(seed,size);
  for(const operation of ['scaleAll','transpose']){const m=transform(a,{operation,scalar});assert.equal(m.after,independent(m.result)||0);assert.equal(m.after,m.expected);assert.equal(m.factor,operation==='scaleAll'?(scalar**size||0):1);}
 }
 const zero=transform(propertyPresets.singular.matrix,{operation:'scale',scalar:0});assert.equal(zero.before,0);assert.equal(zero.after,0);assert.ok(Number.isFinite(zero.expected));
});
test('ejemplos: cadena, factores, triangularización, producto y práctica',()=>{
 let a=[[1,2],[2,10]];assert.equal(det(a),6);a=transform(a,{operation:'swap'}).result;assert.deepEqual(a,[[2,10],[1,2]]);a=transform(a,{operation:'scale',scalar:3}).result;assert.equal(det(a),-18);a=transform(a,{operation:'add',target:0,source:1,scalar:2}).result;assert.deepEqual(a,[[8,22],[3,6]]);assert.equal(det(a),-18);
 assert.equal(det([[2,4,6],[3,0,3],[1,2,0]]),36);assert.equal(det([[1,2,3],[1,0,1],[1,2,0]]),6);
 let t=propertyPresets.elimination.matrix;t=transform(t,{operation:'add',target:1,source:0,scalar:-2}).result;t=transform(t,{operation:'add',target:2,source:0,scalar:-1}).result;t=transform(t,{operation:'add',target:2,source:1,scalar:2}).result;assert.deepEqual(t,[[1,2,1],[0,1,1],[0,0,3]]);assert.equal(det(t),3);
 assert.equal(det(propertyPresets.triangular.matrix),-10);assert.equal(det(propertyPresets.singular.matrix),0);
 const A=[[2,0,0],[0,1,0],[0,0,1]],B=[[-3,0,0],[0,1,0],[0,0,1]],product=multiplyMatrices(A,B).result;assert.equal(det(transpose(product).map(row=>row.map(v=>2*v))),-48);
 let p=[[-4,0,0],[0,1,0],[0,0,1]];p=transform(p,{operation:'swap',axis:'cols',target:0,source:2}).result;p=transform(p,{operation:'scale',target:1,scalar:-2}).result;p=transform(p,{operation:'add',target:2,source:0,scalar:5}).result;assert.equal(det(p),-8);
 assert.equal(det([[8,0,0],[0,-2,0],[0,0,-2]]),32);assert.equal(det([[3,1,0],[0,2,4],[0,0,-1]]),-6);
 assert.equal(det([[4,3],[0,2]]),det([[1,2],[0,2]])+det([[3,1],[0,2]]));assert.notEqual(det([[2,0],[0,2]]),2*det([[1,0],[0,1]]));
});
test('validación, variantes reproducibles y parámetros fraccionarios del modelo',()=>{
 const a=[[1,2],[3,4]];
 for(const operation of ['swap','add'])assert.equal(transform(a,{operation,target:0,source:0}).valid,false);
 assert.throws(()=>transform([[1,2,3],[4,5,6]]),RangeError);assert.throws(()=>transform(a,{operation:'other'}),RangeError);assert.throws(()=>transform(a,{axis:'other'}),RangeError);assert.throws(()=>transform(a,{target:3}),RangeError);assert.throws(()=>transform(a,{scalar:Infinity}),TypeError);
 assert.throws(()=>transform([[Number.MAX_VALUE,0],[0,1]],{operation:'scale',target:0,scalar:2}),RangeError);
 assert.equal(transform(a,{operation:'scale',scalar:.5}).after,-1);
 for(let seed=0;seed<100;seed++)for(const size of [2,3]){const m=generatedPropertyMatrix(seed,size);assert.deepEqual(m,generatedPropertyMatrix(seed,size));assert.ok(m.flat().every(n=>Number.isInteger(n)&&Math.abs(n)<=3));}
});
test('bancos: seis preguntas/tarjetas; t04 72/72; catálogo 318/301',()=>{
 const bank=questionsForScope('t04-e07');assert.equal(bank.length,6);assert.equal(cardsForScope('t04-e07').length,6);
 for(const q of bank){assert.equal(q.options.length,4);assert.equal(new Set(q.options.map(o=>o.text)).size,4);assert.ok(q.hint&&q.explanation&&q.options.some(o=>o.id===q.correct));}
 assert.equal(questionsForScope('t04').length,72);assert.equal(cardsForScope('t04').length,72);assert.equal(questionsForScope('all-course').length,expectedCatalog.questions);assert.equal(cardsForScope().length,expectedCatalog.cards);
 assert.equal(new Set(questionsForScope('all-course').map(q=>q.id)).size,expectedCatalog.questions);assert.equal(new Set(cardsForScope().map(c=>c.id)).size, expectedCatalog.cards);
 for(const topic of ['t01','t02','t03'])assert.equal(questionsForScope(topic).length,60);
});




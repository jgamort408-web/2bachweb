import { expectedCatalog } from "./helpers/catalog-expectations.mjs";
import test from 'node:test';
import assert from 'node:assert/strict';
import {transpose,inspectSymmetry,symmetryPresets,generatedSymmetryMatrix} from '../content/models/matrix-symmetry.js';
import {generatedMatrix,equalMatrices} from '../content/models/matrix-basics.js';
import {multiplyMatrices} from '../content/models/matrix-product.js';
import {matrixOperation} from '../content/models/matrix-operations.js';
import {questionsForScope,cardsForScope} from '../content/activities/catalog.js';
const mul=(a,b)=>multiplyMatrices(a,b).result;
const add=(a,b)=>matrixOperation(a,b,'add').result;
test('81 matrices 2×2 exhaustivas: clasificación, diagonal y testigos',()=>{
 for(const a of [-1,0,1])for(const b of [-1,0,1])for(const c of [-1,0,1])for(const d of [-1,0,1]){
  const m=inspectSymmetry([[a,b],[c,d]]);assert.equal(m.symmetric,b===c);assert.equal(m.skew,a===0&&d===0&&b===-c);
  assert.equal(m.symmetric&&m.skew,[a,b,c,d].every(v=>v===0));
  assert.equal(m.symmetryWitness===null,m.symmetric);assert.equal(m.skewWitness===null,m.skew);
  if(m.symmetryWitness)assert.notEqual(m.symmetryWitness.a,m.symmetryWitness.b);
  if(m.skewWitness)assert.notEqual(m.skewWitness.a,-m.skewWitness.b);
  assert.equal(m.pairs.length,3);
 }
});
test('1600 matrices rectangulares: traspuesta, índices, doble traspuesta y copias',()=>{
 for(let rows=1;rows<=4;rows++)for(let cols=1;cols<=4;cols++)for(let seed=0;seed<100;seed++){
  const a=generatedSymmetryMatrix(seed,rows,cols),copy=JSON.stringify(a),m=inspectSymmetry(a),t=transpose(a);
  assert.equal(t.length,cols);assert.equal(t[0].length,rows);a.forEach((row,i)=>row.forEach((v,j)=>assert.equal(t[j][i],v)));
  assert.deepEqual(transpose(t),a);assert.equal(m.square,rows===cols);assert.equal(JSON.stringify(a),copy);
  if(rows!==cols){assert.equal(m.symmetric,false);assert.equal(m.skew,false);assert.deepEqual(m.pairs,[]);}
  t[0][0]=99;assert.equal(JSON.stringify(a),copy);assert.deepEqual(generatedSymmetryMatrix(seed,rows,cols),a);
 }
});
test('100 casos: linealidad, inversión de factores y construcciones simétricas/antisimétricas',()=>{
 for(let seed=0;seed<100;seed++){
  const a=generatedMatrix(2,3,seed),b=generatedMatrix(3,4,seed+1),c=generatedMatrix(2,3,seed+2),f=generatedMatrix(3,3,seed);
  assert.deepEqual(transpose(mul(a,b)),mul(transpose(b),transpose(a)));
  assert.deepEqual(transpose(add(a,c)),add(transpose(a),transpose(c)));
  assert.deepEqual(transpose(matrixOperation(a,null,'scale',-2).result),matrixOperation(transpose(a),null,'scale',-2).result);
  assert.ok(inspectSymmetry(add(f,transpose(f))).symmetric);assert.ok(inspectSymmetry(matrixOperation(f,transpose(f),'subtract').result).skew);
 }
});
test('ejemplos, parámetros, práctica, 1×1 y nula rectangular',()=>{
 const v=[[24,15,8],[10,20,18]];assert.deepEqual(transpose(v),[[24,10],[15,20],[8,18]]);
 assert.ok(equalMatrices([[3+1,2],[3,6-1]],[[4,2],[3,5]]));assert.equal(equalMatrices([[4,2],[3,5]],[[4,2],[7,5]]),false);
 assert.ok(inspectSymmetry([[0,5,7],[5,0,4],[7,4,0]]).symmetric);
 const f=[[0,7,2],[3,0,5],[6,1,0]],k=matrixOperation(f,transpose(f),'subtract').result;assert.deepEqual(k,[[0,4,-4],[-4,0,4],[4,-4,0]]);assert.ok(inspectSymmetry(k).skew);
 assert.ok(inspectSymmetry([[0,2,3],[-2,0,-4],[-3,4,0]]).skew);
 for(const q of [-3,0,4.5]){const c=[[1,3,-2],[3,q,5],[-2,5,0]];assert.ok(inspectSymmetry(c).symmetric);assert.equal(inspectSymmetry(c).skew,false);}
 assert.equal(inspectSymmetry([[0,2],[1,0]]).symmetric,false);assert.equal(inspectSymmetry([[0,2],[1,0]]).skew,false);
 assert.ok(inspectSymmetry([[4]]).symmetric);assert.equal(inspectSymmetry([[4]]).skew,false);assert.ok(inspectSymmetry([[0]]).skew);assert.equal(inspectSymmetry([[0,0]]).skew,false);
 assert.equal(inspectSymmetry(symmetryPresets.zeroDiagonal.matrix).skew,false);assert.throws(()=>transpose([[1],[2,3]]),TypeError);assert.throws(()=>inspectSymmetry([[NaN]]),TypeError);
});
test('bancos: seis preguntas/tarjetas nuevas; t04 con 72/72; catálogo 318/301',()=>{
 const bank=questionsForScope('t04-e05');assert.equal(bank.length,6);assert.equal(cardsForScope('t04-e05').length,6);
 for(const q of bank){assert.equal(q.options.length,4);assert.equal(new Set(q.options.map(o=>o.text)).size,4);assert.ok(q.explanation&&q.hint&&q.options.some(o=>o.id===q.correct));}
 assert.equal(questionsForScope('t04').length,72);assert.equal(cardsForScope('t04').length,72);assert.equal(questionsForScope('all-course').length,expectedCatalog.questions);assert.equal(cardsForScope().length,expectedCatalog.cards);
 assert.equal(new Set(questionsForScope('all-course').map(q=>q.id)).size,expectedCatalog.questions);assert.equal(new Set(cardsForScope().map(c=>c.id)).size, expectedCatalog.cards);
 for(const topic of ['t01','t02','t03'])assert.equal(questionsForScope(topic).length,60);
});




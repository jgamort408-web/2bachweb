import { expectedCatalog } from "./helpers/catalog-expectations.mjs";
import test from 'node:test';
import assert from 'node:assert/strict';
import {presets,dimensions,classifyMatrix,equalMatrices,resizeMatrix,generatedMatrix,matrixTex} from '../content/models/matrix-basics.js';
import {questionsForScope,cardsForScope} from '../content/activities/catalog.js';
test('clasificación exhaustiva de matrices 2×2 con valores −1, 0 y 1',()=>{
 for(const a of [-1,0,1])for(const b of [-1,0,1])for(const c of [-1,0,1])for(const d of [-1,0,1]){
  const m=classifyMatrix([[a,b],[c,d]]);assert.equal(m.square,true);assert.equal(m.rectangular,false);
  assert.equal(m.diagonal,b===0&&c===0);assert.equal(m.scalar,b===0&&c===0&&a===d);assert.equal(m.identity,a===1&&d===1&&b===0&&c===0);assert.equal(m.zero,[a,b,c,d].every(x=>x===0));
 }
 for(const x of [-2,0,1]){const m=classifyMatrix([[x]]);for(const key of ['row','column','square','diagonal','scalar'])assert.ok(m[key]);assert.equal(m.identity,x===1);assert.equal(m.zero,x===0);}
 const zero=classifyMatrix(presets.zero);assert.ok(zero.zero&&zero.rectangular);assert.ok(!zero.diagonal&&!zero.scalar&&!zero.identity);
});
test('1600 variantes: orden, rango de valores, invariantes y reproducibilidad',()=>{
 const seen=new Set();for(let rows=1;rows<=4;rows++)for(let cols=1;cols<=4;cols++)for(let seed=0;seed<100;seed++){
  const a=generatedMatrix(rows,cols,seed),m=classifyMatrix(a);assert.deepEqual(dimensions(a),{rows,cols});assert.equal(m.count,rows*cols);assert.equal(m.row,rows===1);assert.equal(m.column,cols===1);assert.equal(m.square,rows===cols);
  assert.ok(a.flat().every(x=>Number.isInteger(x)&&x>=-3&&x<=3));if(m.identity)assert.ok(m.scalar&&m.diagonal&&m.square);if(!m.square)assert.ok(!m.diagonal&&!m.scalar);
  seen.add(JSON.stringify(a));assert.deepEqual(a,generatedMatrix(rows,cols,seed));
 }assert.ok(seen.size>500);
});
test('igualdad, parámetros, conservación al redimensionar y validación de matrices',()=>{
 assert.ok(equalMatrices([[5,2],[3,-2+1]],[[5,2],[3,-1]]));assert.ok(!equalMatrices([[5,2],[3,4]],[[5,7],[3,4]]));assert.ok(!equalMatrices([[1,2]],[[1],[2]]));assert.ok(!equalMatrices([[1,2]],[[2,1]]));
 const original=[[1,2],[3,4]],resized=resizeMatrix(original,3,4);assert.deepEqual(resized,[[1,2,0,0],[3,4,0,0],[0,0,0,0]]);resized[0][0]=9;assert.equal(original[0][0],1);assert.equal(resized[1][0],3);assert.deepEqual(resizeMatrix(original,1,1),[[1]]);
 for(const a of [[],[[]],[[1],[1,2]],[[Infinity]],[[NaN]],[[undefined]],null])assert.throws(()=>dimensions(a),TypeError);
 for(const [r,c]of [[0,1],[1,0],[5,1],[1,5],[1.5,2]])assert.throws(()=>resizeMatrix(original,r,c),RangeError);
 assert.equal(matrixTex([[1,2],[3,4]]),String.raw`\begin{pmatrix}1&2\\3&4\end{pmatrix}`);
});
test('ejemplos: datos, diagonal con cero, práctica con parámetro y bancos aislados',()=>{
 assert.equal(presets.data[1][2],18);assert.equal(presets.data[1][0],10);assert.deepEqual(dimensions(presets.data),{rows:2,cols:3});assert.ok(classifyMatrix(presets.diagonal).diagonal);assert.ok(!classifyMatrix(presets.diagonal).scalar);
 for(const t of [-2,0,1,2,3]){const m=classifyMatrix([[2,0],[0,t]]);assert.ok(m.diagonal);assert.equal(m.scalar,t===2);assert.ok(!m.identity&&!m.zero);}
 const qs=questionsForScope('t04-e01'),cs=cardsForScope('t04-e01');assert.equal(qs.length,6);assert.equal(cs.length,6);assert.deepEqual(questionsForScope('t04-e01'),qs);
 for(const q of qs){assert.equal(q.options.length,4);assert.equal(new Set(q.options.map(o=>o.text)).size,4);assert.ok(q.options.some(o=>o.id===q.correct));assert.ok(q.explanation&&q.hint);}
 assert.equal(questionsForScope('all-course').length,expectedCatalog.questions);assert.equal(cardsForScope().length,expectedCatalog.cards);assert.equal(new Set(questionsForScope('all-course').map(q=>q.id)).size,expectedCatalog.questions);assert.equal(new Set(cardsForScope().map(c=>c.id)).size, expectedCatalog.cards);
 for(const topic of ['t01','t02','t03'])assert.equal(questionsForScope(topic).length,60);
 assert.deepEqual(['t01','t02','t03'].map(t=>cardsForScope(t).length),[61,54,48]);
});




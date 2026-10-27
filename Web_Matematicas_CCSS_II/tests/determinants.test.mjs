import { expectedCatalog } from "./helpers/catalog-expectations.mjs";
import test from 'node:test';
import assert from 'node:assert/strict';
import {determinantDetails as detail,determinantPresets,generatedDeterminantMatrix} from '../content/models/determinants.js';
import {transpose} from '../content/models/matrix-symmetry.js';
import {multiplyMatrices} from '../content/models/matrix-product.js';
import {questionsForScope,cardsForScope} from '../content/activities/catalog.js';
const det=a=>detail(a).value;
// Referencia independiente: expansión por menores de la primera fila.
function laplace(a){if(a.length===1)return a[0][0];return a[0].reduce((sum,v,j)=>sum+(j%2?-1:1)*v*laplace(a.slice(1).map(row=>row.filter((_,k)=>k!==j))),0);}
test('19764 matrices exhaustivas de órdenes 2 y 3 frente a expansión por menores',()=>{
 for(const size of [2,3])for(let code=0;code<3**(size*size);code++){
  let digits=code;const a=Array.from({length:size},()=>Array.from({length:size},()=>{const v=digits%3-1;digits=Math.floor(digits/3);return v;})),m=detail(a);
  assert.equal(m.value,laplace(a)||0);assert.equal(m.invertible,m.value!==0);assert.equal(m.terms.length,size===2?2:6);
  for(const t of m.terms){assert.equal(new Set(t.positions.map(p=>p.row)).size,size);assert.equal(new Set(t.positions.map(p=>p.col)).size,size);assert.deepEqual(t.factors,t.positions.map(p=>a[p.row-1][p.col-1]));}
 }
});
test('1500 variantes: grupos, signos, traspuesta, copia y reproducibilidad',()=>{
 for(let size=1;size<=3;size++)for(let seed=0;seed<500;seed++){
  const a=generatedDeterminantMatrix(seed,size,size),copy=JSON.stringify(a),m=detail(a);
  assert.equal(m.value,laplace(a)||0);assert.equal(m.value,det(transpose(a)));assert.equal(m.value,m.positiveSum-m.negativeSum);
  assert.equal(JSON.stringify(a),copy);assert.deepEqual(generatedDeterminantMatrix(seed,size,size),a);
  assert.ok(a.flat().every(x=>Number.isInteger(x)&&Math.abs(x)<=3));
 }
 for(let seed=0;seed<100;seed++){const a=generatedDeterminantMatrix(seed,3,3),b=generatedDeterminantMatrix(seed+1,3,3);assert.equal(det(multiplyMatrices(a,b).result),det(a)*det(b)||0);}
});
test('ejemplos, parámetro, práctica y sistemas compatibles/incompatibles',()=>{
 assert.equal(det(determinantPresets.two.matrix),11);const s=detail(determinantPresets.three.matrix);assert.equal(s.positiveSum,16);assert.equal(s.negativeSum,-2);assert.equal(s.value,18);
 assert.equal(det(determinantPresets.negative.matrix),-2);assert.equal(det(determinantPresets.singular.matrix),0);assert.equal(det([[0,1],[1,0]]),-1);
 for(let k=-10;k<=10;k++)assert.equal(det([[k,2],[3,k-1]]),(k-3)*(k+2)||0);
 assert.equal(det([[2,1,0],[0,3,-1],[1,0,2]]),11);assert.equal(det([[1,2],[3,6]]),0);
 for(let t=-5;t<=5;t++){const x=3-2*t;assert.equal(x+2*t,3);assert.equal(2*x+4*t,6);assert.notEqual(2*x+4*t,7);}
});
test('rectangulares no equivalen a cero; orden 1, invalidación y rango numérico',()=>{
 for(let rows=1;rows<=3;rows++)for(let cols=1;cols<=3;cols++)if(rows!==cols){const m=detail(generatedDeterminantMatrix(1,rows,cols));assert.equal(m.defined,false);assert.equal(m.value,null);assert.equal(m.invertible,null);assert.deepEqual(m.terms,[]);}
 assert.equal(det([[0]]),0);assert.equal(det([[-3]]),-3);assert.equal(det([[.5,0],[0,2]]),1);
 assert.throws(()=>detail([[1,2],[3]]),TypeError);assert.throws(()=>detail([[Infinity]]),TypeError);assert.throws(()=>detail(Array.from({length:4},()=>[0,0,0,0])),RangeError);
 assert.throws(()=>detail([[Number.MAX_VALUE,0],[0,2]]),RangeError);
});
test('bancos: seis preguntas/tarjetas, t04 con 72/72, catálogo 318/301',()=>{
 const bank=questionsForScope('t04-e06');assert.equal(bank.length,6);assert.equal(cardsForScope('t04-e06').length,6);
 for(const q of bank){assert.equal(q.options.length,4);assert.equal(new Set(q.options.map(o=>o.text)).size,4);assert.ok(q.hint&&q.explanation&&q.options.some(o=>o.id===q.correct));}
 assert.equal(questionsForScope('t04').length,72);assert.equal(cardsForScope('t04').length,72);assert.equal(questionsForScope('all-course').length,expectedCatalog.questions);assert.equal(cardsForScope().length,expectedCatalog.cards);
 assert.equal(new Set(questionsForScope('all-course').map(q=>q.id)).size,expectedCatalog.questions);assert.equal(new Set(cardsForScope().map(c=>c.id)).size, expectedCatalog.cards);
 for(const topic of ['t01','t02','t03'])assert.equal(questionsForScope(topic).length,60);
});




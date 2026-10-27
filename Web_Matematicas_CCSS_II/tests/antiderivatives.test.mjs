import { expectedCatalog } from "./helpers/catalog-expectations.mjs";
import test from 'node:test';
import assert from 'node:assert/strict';
import {primitiveFamilies,primitiveModel} from '../content/models/antiderivatives.js';
import {questionsForScope,cardsForScope} from '../content/activities/catalog.js';

test('351 estados: misma derivada para toda C y ajuste correcto al dato',()=>{
 let count=0;
 for(const kind of Object.keys(primitiveFamilies))for(let c=-6;c<=6;c++)for(const a of [-1,0,1])for(const b of [-2,0,2]){
  const m=primitiveModel(kind,c,a,b);count++;
  for(const x of [-2,-1,.25,1,2]){const e=1e-5,numeric=(m.value(x+e)-m.value(x-e))/(2*e);assert.ok(Math.abs(numeric-m.family.derivative(x))<1e-7);}
  assert.equal(m.value(a),m.pointValue);assert.equal(m.matches,m.pointValue===b);
  const fitted=primitiveModel(kind,m.requiredC,a,b);assert.equal(fitted.value(a),b);assert.equal(fitted.matches,true);assert.equal(fitted.slope,m.slope);
 }
 assert.equal(count,351);assert.throws(()=>primitiveModel('linear',7,0,0),RangeError);
});
test('familia, condición inicial, coste marginal y práctica: verificación por derivadas',()=>{
 const cases=[{F:x=>2*x**3+3,f:x=>6*x*x},{F:x=>x**3-2*x*x+2*x+4,f:x=>3*x*x-4*x+2},{F:x=>x*x+5*x+40,f:x=>2*x+5},{F:x=>2*x*x-3*x-1,f:x=>4*x-3}];
 for(const {F,f}of cases)for(const x of [-2,-1,0,.5,1,3]){const e=1e-5;assert.ok(Math.abs((F(x+e)-F(x-e))/(2*e)-f(x))<1e-7);}
 assert.equal(cases[1].F(1),5);assert.equal(cases[2].F(0),40);assert.equal(cases[2].F(3),64);assert.equal(cases[3].F(2),1);
 const wrong=x=>2*x*x-3;assert.notEqual((wrong(1.001)-wrong(.999))/.002,1);
});
test('dominio separado: constantes independientes sin modificar 1/x',()=>{
 const F=x=>Math.log(Math.abs(x))+(x<0?7:-4);
 for(const x of [-3,-1,-.5,.5,1,3]){const e=1e-6;assert.ok(Math.abs((F(x+e)-F(x-e))/(2*e)-1/x)<1e-8);}
 assert.equal(F(-1)-Math.log(1),7);assert.equal(F(1)-Math.log(1),-4);
});
test('tres temas separados, seis preguntas/tarjetas y total 318/301',()=>{
 assert.deepEqual(['t01','t02','t03'].map(t=>questionsForScope(t).length),[60,60,60]);
 assert.deepEqual(['t01','t02','t03'].map(t=>cardsForScope(t).length),[61,54,48]);
 assert.equal(questionsForScope('all-course').length,expectedCatalog.questions);assert.equal(cardsForScope().length,expectedCatalog.cards);
 assert.equal(questionsForScope('t03-e01').length,6);assert.equal(new Set(questionsForScope('all-course').map(q=>q.id)).size,expectedCatalog.questions);
 for(const q of questionsForScope('t03')){assert.equal(q.options.filter(o=>o.id===q.correct).length,1);assert.equal(new Set(q.options.map(o=>o.text)).size,4);assert.ok(q.hint&&q.explanation);}
});



import { expectedCatalog } from "./helpers/catalog-expectations.mjs";
import test from 'node:test';
import assert from 'node:assert/strict';
import {generateIntegrationMethodModels,generateIntegrationMethodQuestions} from '../content/models/integration-methods.js';
import {questionsForScope,cardsForScope} from '../content/activities/catalog.js';
const derivative=(f,x)=>(f(x+1e-5)-f(x-1e-5))/2e-5;
const close=(a,b)=>Math.abs(a-b)<3e-6*Math.max(1,Math.abs(b));
test('1000 semillas: 6000 transformaciones, 24000 opciones e integrandos recuperados en x',()=>{
 const seen=new Set(),kinds=new Set(),signs=new Set();
 for(let seed=0;seed<1000;seed++){
  const models=generateIntegrationMethodModels(seed);assert.equal(models.length,6);seen.add(models.map(m=>m.f).join('|'));
  for(const m of models){kinds.add(m.kind);if(m.kind==='sub-exp')signs.add(Math.sign(m.integrand(.5)));
   for(const x of m.points){assert.ok(Number.isFinite(m.integrand(x)));assert.ok(close(derivative(m.value,x),m.integrand(x)),m.kind);}
   const valid=m.options.filter(o=>m.points.every(x=>close(o.recovered(x),m.integrand(x))));assert.deepEqual(valid.map(o=>o.id),['correct']);assert.equal(new Set(m.options.map(o=>o.expression)).size,4);
   if(m.excluded!==undefined){assert.ok(!Number.isFinite(m.integrand(m.excluded)));assert.ok(m.points.some(x=>x<m.excluded));assert.ok(m.points.some(x=>x>m.excluded));}
   if(m.kind==='cancel'){assert.ok(Number.isFinite(m.value(m.excluded)));assert.ok(Number.isNaN(m.integrand(m.excluded)));}
  }
 }
 assert.ok(seen.size>=110,seen.size);assert.equal(kinds.size,6);assert.equal(signs.size,2);
 assert.deepEqual(generateIntegrationMethodQuestions(42),generateIntegrationMethodQuestions(42));
});
test('ejemplos, ampliaciones y práctica: derivadas y condición inicial',()=>{
 const cases=[
 {F:x=>x**3/3+1.5*x*x,f:x=>x*(x+3)},
 {F:x=>x*x/2-x+2*Math.log(Math.abs(x+1)),f:x=>(x*x+1)/(x+1)},
 {F:x=>x*x/2+x,f:x=>(x*x-1)/(x-1)},
 {F:x=>(x*x+4)**1.5/3,f:x=>x*Math.sqrt(x*x+4)},
 {F:x=>x**3/3+Math.exp(2*x)/2+Math.log(Math.abs(1-x)),f:x=>x*x+Math.exp(2*x)-1/(1-x)},
 {F:x=>Math.log(Math.abs(x))-Math.log(Math.abs(x+1)),f:x=>1/(x*(x+1))},
 {F:x=>(x-1)*Math.exp(x),f:x=>x*Math.exp(x)}];
 for(const m of cases)for(const x of [-3,-.5,.2,2])assert.ok(close(derivative(m.F,x),m.f(x)));
 const F=x=>x*x/2+5*Math.log(x+2)-5*Math.log(2);assert.equal(F(0),0);
 for(const x of [-1.5,0,.7,2])assert.ok(close(derivative(F,x),(x*x+2*x+5)/(x+2)));
 // Sustitución en el punto crítico: no se divide entre x=0.
 assert.ok(close(derivative(cases[3].F,0),0));
});
test('regresión M13 de F029: signo logarítmico y dominio a ambos lados de 1',()=>{
 const primitive=x=>-Math.log(Math.abs(1-x));
 for(const x of [-2,0,.5,1.5,3])assert.ok(close(derivative(primitive,x),1/(1-x)));
 assert.ok(!close(derivative(x=>x,2),1/(1-2)));
 assert.ok(Number.isNaN(Math.log(1-2)));assert.ok(Number.isFinite(Math.log(Math.abs(1-2))));
});
test('bancos 318/301: seis preguntas/tarjetas, tema 3 de 60 preguntas y 48 tarjetas, IDs únicos y fórmulas',()=>{
 assert.equal(questionsForScope('t03-e04').length,6);assert.equal(cardsForScope('t03-e04').length,6);assert.equal(questionsForScope('t03').length,60);assert.equal(cardsForScope('t03').length,48);
 assert.equal(questionsForScope('all-course').length,expectedCatalog.questions);assert.equal(cardsForScope().length,expectedCatalog.cards);
 for(const bank of [questionsForScope('all-course'),cardsForScope()])assert.equal(new Set(bank.map(q=>q.id)).size,bank.length);
 for(const q of [...questionsForScope('t03-e04'),...generateIntegrationMethodQuestions(9)]){assert.equal(q.options.filter(o=>o.id===q.correct).length,1);assert.equal(new Set(q.options.map(o=>o.text)).size,4);assert.ok(q.explanation&&q.hint);}
 for(const q of generateIntegrationMethodQuestions(9)){assert.ok(q.prompt.includes('\\('));assert.ok(q.explanation.includes('\\('));for(const o of q.options)assert.ok(o.text.startsWith('\\('));}
});



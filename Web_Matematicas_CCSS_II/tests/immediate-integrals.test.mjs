import { expectedCatalog } from "./helpers/catalog-expectations.mjs";
import test from 'node:test';
import assert from 'node:assert/strict';
import {generateImmediateModels,generateImmediateQuestions} from '../content/models/immediate-integrals.js';
import {questionsForScope,cardsForScope} from '../content/activities/catalog.js';
const derivative=(f,x)=>(f(x+1e-5)-f(x-1e-5))/2e-5;
const close=(a,b)=>Math.abs(a-b)<2e-6*Math.max(1,Math.abs(b));
test('1000 semillas: 6000 integrales, derivadas y única opción válida en todo el intervalo',()=>{
 const seen=new Set();
 for(let seed=0;seed<1000;seed++){
  const models=generateImmediateModels(seed);assert.equal(models.length,6);seen.add(models.map(m=>m.f).join('|'));
  for(const m of models){
   for(const x of [.4,.8,1.3,2.1])assert.ok(close(derivative(m.value,x),m.integrand(x)),m.kind);
   const valid=m.options.filter(o=>[.4,.8,1.3,2.1].every(x=>close(derivative(o.value,x),m.integrand(x))));
   assert.deepEqual(valid.map(o=>o.id),['correct']);assert.equal(new Set(m.options.map(o=>o.formula)).size,4);
  }
 }
 assert.ok(seen.size>100);
 assert.deepEqual(generateImmediateQuestions(25),generateImmediateQuestions(25));
 assert.notDeepEqual(generateImmediateQuestions(25),generateImmediateQuestions(26));
});
test('ejemplos del texto: derivadas, intervalos negativos y condición inicial',()=>{
 const cases=[{F:x=>2*x**3-2*x*x+5*x,f:x=>6*x*x-4*x+5},{F:x=>-3/x+2*Math.log(Math.abs(x)),f:x=>3/x**2+2/x,negative:true},{F:x=>2*x**1.5-4*Math.sqrt(x),f:x=>3*Math.sqrt(x)-2/Math.sqrt(x)},{F:x=>2*Math.exp(x)+3*2**x/Math.log(2),f:x=>2*Math.exp(x)+3*2**x},{F:x=>2*Math.sin(x)+3*Math.cos(x),f:x=>2*Math.cos(x)-3*Math.sin(x)},{F:x=>x**4-6*Math.log(x)+2*Math.exp(x)-1-2*Math.E,f:x=>4*x**3-6/x+2*Math.exp(x)}];
 for(const m of cases)for(const x of (m.negative?[-3,-.5,.4,1.7]:[.4,.9,1.7]))assert.ok(close(derivative(m.F,x),m.f(x)));
 assert.ok(Math.abs(cases.at(-1).F(1))<1e-12);
});
test('tabla: potencias fraccionarias, constantes, bases menores que uno y trigonometría',()=>{
 for(const n of [-3,-2,-.5,0,.5,3])for(const x of [.5,1.5,2.3])assert.ok(close(derivative(t=>t**(n+1)/(n+1),x),x**n));
 for(const a of [.5,2,Math.E])for(const x of [-1,.5,2])assert.ok(close(derivative(t=>a**t/Math.log(a),x),a**x));
 for(const x of [-2,.7,1.3]){assert.ok(close(derivative(Math.sin,x),Math.cos(x)));assert.ok(close(derivative(t=>-Math.cos(t),x),Math.sin(x)));}
});
test('bancos: seis conceptos nuevos, 60 preguntas en tema 3, identificadores únicos y fórmulas delimitadas',()=>{
 assert.equal(questionsForScope('t03-e02').length,6);assert.equal(cardsForScope('t03-e02').length,6);
 assert.equal(questionsForScope('t03').length,60);assert.equal(cardsForScope('t03').length,48);
 assert.equal(questionsForScope('all-course').length,expectedCatalog.questions);assert.equal(cardsForScope().length,expectedCatalog.cards);
 for(const bank of [questionsForScope('all-course'),cardsForScope()])assert.equal(new Set(bank.map(q=>q.id)).size,bank.length);
 for(const q of [...questionsForScope('t03-e02'),...generateImmediateQuestions(9)]){
  assert.equal(q.options.filter(o=>o.id===q.correct).length,1);assert.equal(new Set(q.options.map(o=>o.text)).size,4);assert.ok(q.explanation&&q.hint);
 }
 for(const q of generateImmediateQuestions(9)){assert.ok(q.prompt.includes('\\('));assert.ok(q.explanation.includes('\\('));for(const o of q.options)assert.ok(o.text.startsWith('\\('));}
});



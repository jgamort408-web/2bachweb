import { expectedCatalog } from "./helpers/catalog-expectations.mjs";
import test from 'node:test';
import assert from 'node:assert/strict';
import {generateNearImmediateModels,generateNearImmediateQuestions,fraction} from '../content/models/near-immediate-integrals.js';
import {questionsForScope,cardsForScope} from '../content/activities/catalog.js';
const derivative=(f,x)=>(f(x+1e-5)-f(x-1e-5))/2e-5;
const close=(a,b)=>Math.abs(a-b)<3e-6*Math.max(1,Math.abs(b));
test('1000 semillas: 6000 composiciones, ajuste, cadena y una única primitiva válida',()=>{
 const seen=new Set(),kinds=new Set(),powerSigns=new Set(),factorSigns=new Set();
 for(let seed=0;seed<1000;seed++){
  const models=generateNearImmediateModels(seed);assert.equal(models.length,6);seen.add(models.map(m=>m.f).join('|'));
  for(const m of models){kinds.add(m.kind);factorSigns.add(Math.sign(m.factor));if(m.kind==='quadratic-power')powerSigns.add(m.f.includes('^{-')?'negative':'positive');
   for(const x of m.points){assert.ok(close(derivative(m.inner,x),m.innerDerivative(x)),m.kind);assert.ok(close(m.factor*m.innerDerivative(x)*m.outer(m.inner(x)),m.integrand(x)));assert.ok(close(derivative(m.value,x),m.integrand(x)),m.kind);}
   const valid=m.options.filter(o=>m.points.every(x=>close(derivative(o.value,x),m.integrand(x))));assert.deepEqual(valid.map(o=>o.id),['correct']);assert.equal(new Set(m.options.map(o=>o.formula)).size,4);
   if(m.kind==='linear-log'){assert.equal(m.inner(m.excluded),0);assert.ok(m.points.some(x=>m.inner(x)<0));assert.ok(m.points.some(x=>m.inner(x)>0));}
  }
 }
 assert.ok(seen.size>200);assert.equal(kinds.size,6);assert.equal(factorSigns.size,2);assert.equal(powerSigns.size,2);
 assert.deepEqual(generateNearImmediateQuestions(82),generateNearImmediateQuestions(82));assert.notDeepEqual(generateNearImmediateQuestions(82),generateNearImmediateQuestions(83));
});
test('ejemplos y práctica: derivadas independientes, signos y condición inicial',()=>{
 const cases=[
 {F:x=>(3*x-2)**5/15,f:x=>(3*x-2)**4},
 {F:x=>(x*x+4)**3/2,f:x=>3*x*(x*x+4)**2},
 {F:x=>2.5*Math.log(x*x+4),f:x=>5*x/(x*x+4)},
 {F:x=>2/3*Math.log(Math.abs(3*x-1)),f:x=>2/(3*x-1)},
 {F:x=>-Math.exp(2-3*x)/3,f:x=>Math.exp(2-3*x)},
 {F:x=>2*Math.exp(x*x+1),f:x=>4*x*Math.exp(x*x+1)},
 {F:x=>2**(3*x+1)/(3*Math.log(2)),f:x=>2**(3*x+1)},
 {F:x=>Math.sqrt(x*x+4),f:x=>x/Math.sqrt(x*x+4)},
 {F:x=>3*Math.log(x*x+1)+Math.exp(2*x)+3,f:x=>6*x/(x*x+1)+2*Math.exp(2*x)}];
 for(const m of cases)for(const x of [-1.2,-.3,0,.7,1.2])assert.ok(close(derivative(m.F,x),m.f(x)));
 assert.equal(cases.at(-1).F(0),4);
 // Los contraejemplos no recuperan el integrando en todo el intervalo.
 assert.ok(!close(derivative(x=>Math.log(x*x+1),1),1/2));
 assert.ok(!close(derivative(x=>Math.exp(x*x)/(2*x),1),Math.E));
 // Los patrones trigonométricos de la tabla también incluyen la cadena.
 for(const x of [-.6,.2,.9]){assert.ok(close(derivative(t=>Math.sin(t*t+1),x),2*x*Math.cos(x*x+1)));assert.ok(close(derivative(t=>-Math.cos(t*t+1),x),2*x*Math.sin(x*x+1)));}
});
test('fracciones del ajuste: signos, reducción y entradas imposibles',()=>{
 assert.equal(fraction(6,-4),String.raw`-\frac{3}{2}`);assert.equal(fraction(-6,-3),'2');assert.equal(fraction(0,-3),'0');assert.equal(fraction(5,2),String.raw`\frac{5}{2}`);
 assert.throws(()=>fraction(1,0),RangeError);assert.throws(()=>fraction(1.5,2),RangeError);
});
test('bancos 318/301: seis conceptos nuevos, 60 preguntas en t03, opciones y LaTeX',()=>{
 assert.equal(questionsForScope('t03-e03').length,6);assert.equal(cardsForScope('t03-e03').length,6);assert.equal(questionsForScope('t03').length,60);assert.equal(cardsForScope('t03').length,48);
 assert.equal(questionsForScope('all-course').length,expectedCatalog.questions);assert.equal(cardsForScope().length,expectedCatalog.cards);
 for(const bank of [questionsForScope('all-course'),cardsForScope()])assert.equal(new Set(bank.map(q=>q.id)).size,bank.length);
 for(const q of [...questionsForScope('t03-e03'),...generateNearImmediateQuestions(9)]){assert.equal(q.options.filter(o=>o.id===q.correct).length,1);assert.equal(new Set(q.options.map(o=>o.text)).size,4);assert.ok(q.explanation&&q.hint);}
 for(const q of generateNearImmediateQuestions(9)){assert.equal(q.steps.length,2);assert.ok(q.prompt.includes('\\('));assert.ok(q.explanation.includes('\\('));for(const o of q.options)assert.ok(o.text.startsWith('\\('));}
});



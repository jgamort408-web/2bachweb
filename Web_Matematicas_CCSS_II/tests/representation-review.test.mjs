import { expectedCatalog } from "./helpers/catalog-expectations.mjs";
import test from 'node:test';
import assert from 'node:assert/strict';
import { questionsForScope, cardsForScope } from '../content/activities/catalog.js';

test('repaso: seis ítems distintos, cobertura transversal y mínimo de 60', () => {
  const bank=questionsForScope('t02'), review=questionsForScope('review-t02');
  assert.equal(bank.length,60); assert.equal(review.length,6);
  assert.equal(new Set(bank.map(q=>q.id)).size,60);
  assert.equal(new Set(bank.map(q=>q.prompt)).size,60);
  assert.equal(new Set(review.flatMap(q=>q.lessonIds)).size,9);
  for(const q of review){assert.ok(bank.includes(q));assert.equal(q.options.filter(o=>o.id===q.correct).length,1);assert.equal(new Set(q.options.map(o=>o.text)).size,4);assert.ok(q.explanation&&q.hint&&q.options.every(o=>o.feedback));}
  for(let n=1;n<=9;n++){assert.equal(questionsForScope('t02-e0'+n).length,6);assert.equal(cardsForScope('t02-e0'+n).length,6);}
  assert.equal(questionsForScope('t01').length,60);assert.equal(questionsForScope('all-course').length,expectedCatalog.questions);
});
test('composición racional: identidad desde la fracción original y hueco excluido',()=>{
  const F=u=>(u*u-1)/(u-1);
  assert.ok(Number.isNaN(F(1)));
  for(const x of [-4,-1,0,1,1.99,2.01,3,8])assert.ok(Math.abs(-2*F(3-x)+4-(2*x-4))<1e-10);
  assert.equal(-2*F(3)+4,-4);
  assert.equal(-2*2+4,0); // Imagen de la altura del hueco original, no un valor de F(1).
});
test('logaritmos, umbral exponencial y contraejemplos de monotonía y multiplicidad',()=>{
  const h=x=>Math.log(4-x)-Math.log(x);
  assert.equal(h(2),0);
  for(let x=.1;x<3.9;x+=.1){assert.ok(h(x)>h(x+.01));assert.ok(Math.abs(h(4-x)+h(x))<1e-12);}
  assert.ok(h(1e-8)>19);assert.ok(h(4-1e-8)<-19);
  const A=t=>2-8*(.5**t);assert.equal(A(3),1);assert.ok(A(2.999)<1&&A(3.001)>1);
  const r=x=>1/(x-1);assert.ok(r(0)<r(2));
  const g=x=>-((x+1)**2)*(x-2);assert.equal(Math.abs(g(-1)),0);assert.ok(g(-1.01)>0&&g(-.99)>0);assert.ok(g(1.99)>0&&g(2.01)<0);
});
test('beneficio por tramos: máximo continuo y empate entero con fórmulas originales',()=>{
  const B=q=>q<=3?-q*q+8*q:-2*q*q+14*q-9;
  assert.equal(-3*3+8*3,-2*3*3+14*3-9);
  assert.equal(B(3.5),15.5);assert.equal(B(4),15);
  for(let i=0;i<=6000;i++){const v=B(i/1000);assert.ok(v>=0&&v<=15.5+1e-10);}
  const values=Array.from({length:7},(_,q)=>B(q));assert.deepEqual(values,[0,7,12,15,15,11,3]);
  assert.deepEqual(values.flatMap((v,q)=>v===Math.max(...values)?[q]:[]),[3,4]);
});


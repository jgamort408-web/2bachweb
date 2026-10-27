import { expectedCatalog } from "./helpers/catalog-expectations.mjs";
import test from 'node:test';
import assert from 'node:assert/strict';
import {profitModel,fenceModel,averageCostModel} from '../content/models/optimization.js';
import {questionsForScope,cardsForScope} from '../content/activities/catalog.js';

test('12 escenarios continuos: restricciones, identidad R−C y máximo contrastado',()=>{
  let count=0;
  for(const price of [35,50])for(const fixed of [100,500])for(const cap of [8,16,24]){
    const m=profitModel(price,fixed,cap);count++;
    assert.equal(m.best[0],Math.min((price-10)/2,cap));
    assert.equal(m.admissible(-1),false);assert.equal(m.admissible(cap+1),false);
    for(let i=0;i<=2400;i++){
      const q=cap*i/2400;assert.ok(m.value(q)<=m.bestValue+1e-8);
      assert.ok(Math.abs(m.value(q)-(m.revenue(q)-m.cost(q)))<1e-8);
      assert.ok(price-q>=0);
    }
    for(const {q,value}of m.candidates){assert.equal(m.admissible(q),true);assert.equal(value,m.value(q));}
  }
  assert.equal(count,12);
  assert.deepEqual(profitModel(50,100,24).best,[20]);assert.equal(profitModel(50,100,24).bestValue,300);
  assert.equal(profitModel(50,100,8).bestValue,156);assert.equal(profitModel(50,500,24).bestValue,-100);
  assert.throws(()=>profitModel(50,100,30),RangeError);
});
test('12 escenarios enteros: comparación exhaustiva, empates y candidato excluido',()=>{
  for(const price of [35,50])for(const fixed of [100,500])for(const cap of [8,16,24]){
    const m=profitModel(price,fixed,cap,'integer');const values=Array.from({length:cap+1},(_,q)=>({q,value:q*(price-q)-(10*q+fixed)}));
    const best=Math.max(...values.map(p=>p.value));assert.equal(m.bestValue,best);
    assert.deepEqual(m.best,values.filter(p=>p.value===best).map(p=>p.q));assert.equal(m.admissible(0.5),false);
  }
  const tie=profitModel(35,100,16,'integer');assert.deepEqual(tie.best,[12,13]);assert.equal(tie.bestValue,56);
  assert.equal(profitModel(35,100,16).bestValue,56.25);
  assert.equal(profitModel(50,100,8,'integer').candidates.some(p=>p.q===20),false);
});
test('coste medio, valla y práctica de ingreso: óptimos y restricciones',()=>{
  assert.equal(averageCostModel.value(10),20);assert.equal(averageCostModel.derivative(10),0);assert.ok(Number.isNaN(averageCostModel.value(0)));
  for(const q of [0.1,1,5,9,11,20,100]){assert.ok(averageCostModel.value(q)>20);assert.equal(Math.sign(averageCostModel.derivative(q)),q<10?-1:1);}
  assert.equal(fenceModel.area(15),450);assert.equal(fenceModel.length(15),30);assert.equal(fenceModel.derivative(15),0);
  assert.ok(Number.isNaN(fenceModel.area(0))&&Number.isNaN(fenceModel.area(30)));
  for(let x=0.25;x<30;x+=0.25){assert.ok(fenceModel.area(x)<=450);assert.equal(2*x+fenceModel.length(x),60);}
  const R=q=>q*(30-2*q);assert.equal(R(7.5),112.5);assert.equal(R(12),72);
  const integers=Array.from({length:13},(_,q)=>q);assert.deepEqual(integers.filter(q=>R(q)===Math.max(...integers.map(R))),[7,8]);
});
test('banco de optimización y nueve lecciones de t02: total 318/301',()=>{
  assert.equal(questionsForScope('t02-e09').length,6);assert.equal(cardsForScope('t02-e09').length,6);
  assert.equal(questionsForScope('t02').length,60);assert.equal(cardsForScope('t02').length,54);
  assert.equal(questionsForScope('t01').length,60);assert.equal(cardsForScope('t01').length,61);
  assert.equal(questionsForScope('all-course').length,expectedCatalog.questions);assert.equal(cardsForScope().length,expectedCatalog.cards);
  assert.equal(new Set(questionsForScope('t02').filter(q=>q.lessonId !== 't02-review').map(q=>q.lessonId)).size,9);
  for(const q of questionsForScope('t02-e09')){assert.equal(q.options.filter(o=>o.id===q.correct).length,1);assert.ok(q.hint&&q.explanation&&q.options.every(o=>o.feedback));}
});



import { expectedCatalog } from "./helpers/catalog-expectations.mjs";
import test from 'node:test';
import assert from 'node:assert/strict';
import {scalingModel,scalingFamilies,scaleInterval} from '../content/models/scaling.js';
import {questionsForScope,cardsForScope} from '../content/activities/catalog.js';

test('48 escalas: puntos, dominio, pendientes y extremos con factores de ambos signos',()=>{
  let count=0;
  for(const kind of Object.keys(scalingFamilies))for(const a of [-2,0.5,1,2])for(const b of [-2,0.5,1,2]){
    const m=scalingModel(kind,a,b),f=scalingFamilies[kind];count++;
    for(const u of f.samples){
      const [x,y]=m.point(u);assert.equal(x,u/b);assert.equal(y,a*f.value(u));assert.ok(Math.abs(m.value(x)-y)<1e-12);assert.equal(m.inDomain(x),true);
      const d=1e-6,derivative=(m.value(x+d)-m.value(x-d))/(2*d);
      assert.ok(Math.abs(derivative-m.derivative(x))<1e-5);
    }
    if(kind==='parabola'){assert.equal(Math.abs(m.value(1/b)),0);assert.equal(m.extremum.type,a>0?'mínimo':'máximo');}
    if(kind==='reciprocal'){assert.equal(m.inDomain(1/b),false);assert.ok(Number.isNaN(m.value(1/b)));assert.equal(m.verticalAsymptote,1/b);}
    if(kind==='logarithm'){assert.equal(m.inDomain(0),false);assert.equal(m.inDomain(Math.sign(b)),true);assert.equal(m.inDomain(-Math.sign(b)),false);}
  }
  assert.equal(count,48);
  for(const args of [['parabola',0,1],['parabola',1,0],['invalid',1,1],['parabola',NaN,1]])assert.throws(()=>scalingModel(...args),RangeError);
});
test('intervalos: inversión de orden y conservación de extremos incluidos',()=>{
  assert.deepEqual(scaleInterval(1,5,true,false,-0.5),{lower:-2.5,upper:-0.5,lowerClosed:false,upperClosed:true});
  assert.deepEqual(scaleInterval(-1,4,true,false,-2),{lower:-8,upper:2,lowerClosed:false,upperClosed:true});
  assert.deepEqual(scaleInterval(-2,4,false,true,2),{lower:-4,upper:8,lowerClosed:false,upperClosed:true});
  assert.deepEqual(scaleInterval(-1,3,true,false,-2),{lower:-6,upper:2,lowerClosed:false,upperClosed:true});
  assert.throws(()=>scaleInterval(1,5,true,false,0),RangeError);
});
test('ejemplos, reflexión, práctica de valor absoluto y coste repartido',()=>{
  const g=scalingModel('parabola',-2,2);assert.deepEqual(g.extremum,{x:0.5,y:0,type:'máximo'});assert.equal(g.value(0),-2);assert.equal(g.value(1),-2);
  for(const x of [-2,-1,0,1,2])assert.equal(g.derivative(x),-8*(2*x-1));
  const r=scalingModel('reciprocal',3,-2);assert.equal(r.value(0),-3);assert.equal(r.verticalAsymptote,-0.5);
  assert.ok(r.value(-0.500001)>1e6);assert.ok(r.value(-0.499999)<-1e6);
  const s=scalingModel('logarithm',1,-2);assert.equal(s.value(-0.5),0);
  for(const x of [-4,-1,-0.1])assert.equal(s.derivative(x),1/x);
  for(const x of [-3,-1,-0.5,0,1,3])assert.equal(-0.5*Math.abs(-2*x-1),-Math.abs(x+0.5));
  const C=q=>q*q+1;assert.equal(2*C(4/2),10);
  for(const q of [0,1,2,4,8])assert.equal(2*C(q/2),q*q/2+2);
  assert.deepEqual([4/(-0.5),-2*(-3)],[-8,6]);
});
test('seis preguntas y seis tarjetas de escalas; total 318/301',()=>{
  assert.equal(questionsForScope('t02-e08').length,6);assert.equal(cardsForScope('t02-e08').length,6);
  assert.equal(questionsForScope('t02').length,60);assert.equal(cardsForScope('t02').length,54);
  assert.equal(questionsForScope('t01').length,60);assert.equal(cardsForScope('t01').length,61);
  assert.equal(questionsForScope('all-course').length,expectedCatalog.questions);assert.equal(cardsForScope().length,expectedCatalog.cards);
  for(const q of questionsForScope('t02-e08')){assert.equal(q.options.filter(o=>o.id===q.correct).length,1);assert.ok(q.hint&&q.explanation&&q.options.every(o=>o.feedback));}
});



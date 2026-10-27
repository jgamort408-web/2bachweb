import test from 'node:test';
import assert from 'node:assert/strict';
import {criticalValues,meanConfidenceInterval} from '../content/models/confidence-interval.js';

test('valores críticos y ejemplo inicial del original',()=>{
 assert.ok(Math.abs(criticalValues[90]-1.64485362695)<1e-10);
 assert.ok(Math.abs(criticalValues[95]-1.95996398454)<1e-10);
 assert.ok(Math.abs(criticalValues[99]-2.57582930355)<1e-10);
 const r=meanConfidenceInterval({mean:100,sigma:15,n:30,confidence:95});
 assert.ok(Math.abs(r.margin-5.36758243115)<1e-10);
 assert.ok(Math.abs(r.lower-94.63241756885)<1e-10);
 assert.ok(Math.abs(r.upper-105.36758243115)<1e-10);
 assert.ok(Math.abs(r.width-2*r.margin)<1e-12);
});
test('relaciones del laboratorio y extremos de los controles',()=>{
 const base={mean:100,sigma:15,n:30,confidence:95};
 const a=meanConfidenceInterval(base),shift=meanConfidenceInterval({...base,mean:130}),large=meanConfidenceInterval({...base,n:120}),wide=meanConfidenceInterval({...base,sigma:30}),high=meanConfidenceInterval({...base,confidence:99});
 assert.equal(shift.margin,a.margin);assert.equal(shift.lower-a.lower,30);
 assert.ok(Math.abs(large.margin-a.margin/2)<1e-12);
 assert.ok(Math.abs(wide.margin-2*a.margin)<1e-12);
 assert.ok(high.margin>a.margin);
 for(const mean of [50,150])for(const sigma of [1,40])for(const n of [5,300])for(const confidence of [90,95,99]){
  const r=meanConfidenceInterval({mean,sigma,n,confidence});
  assert.ok(r.lower>=0&&r.upper<=200);
  assert.ok(r.lower<r.mean&&r.mean<r.upper);
 }
});
test('dominio del modelo',()=>{
 for(const sigma of [0,-1,NaN])assert.throws(()=>meanConfidenceInterval({mean:100,sigma,n:30,confidence:95}),RangeError);
 for(const n of [0,2.5,NaN])assert.throws(()=>meanConfidenceInterval({mean:100,sigma:15,n,confidence:95}),RangeError);
 assert.throws(()=>meanConfidenceInterval({mean:100,sigma:15,n:30,confidence:92}),RangeError);
});

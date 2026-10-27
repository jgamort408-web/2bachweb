import test from 'node:test';
import assert from 'node:assert/strict';
import {samplingProportionReadings} from '../content/models/sampling-proportion.js';

test('comercio: más del 25 % significa al menos 13 de 50',()=>{
 const result=samplingProportionReadings({n:50,p:.2,threshold:.25});
 assert.equal(result.minimumCount,13);
 assert.ok(Math.abs(result.standardError-Math.sqrt(.0032))<1e-12);
 assert.ok(Math.abs(result.normalApprox-.1883795589057911)<1e-6);
 assert.ok(Math.abs(result.exact-.18605699346261917)<1e-12);
 assert.equal(result.adequate,true);
});

test('premium: más del 20 % significa al menos 21 de 100',()=>{
 const result=samplingProportionReadings({n:100,p:.15,threshold:.2});
 assert.equal(result.minimumCount,21);
 assert.ok(Math.abs(result.standardError-Math.sqrt(.001275))<1e-12);
 assert.ok(Math.abs(result.normalApprox-.08071473118354158)<1e-6);
 assert.ok(Math.abs(result.correctedApprox-.061742636072274544)<1e-6);
 assert.ok(Math.abs(result.exact-.06631976581888141)<1e-12);
 assert.equal(result.adequate,true);
});

test('rechaza parámetros fuera del modelo',()=>{
 assert.throws(()=>samplingProportionReadings({n:0,p:.2,threshold:.3}),RangeError);
 assert.throws(()=>samplingProportionReadings({n:50,p:1,threshold:.3}),RangeError);
 assert.throws(()=>samplingProportionReadings({n:50,p:.2,threshold:1}),RangeError);
});

import test from 'node:test';
import assert from 'node:assert/strict';
import {CRITICAL_Z,marginForMean,planSampleForMean} from '../content/models/sample-size.js';

test('redondea el mínimo hacia arriba y verifica el margen alcanzado',()=>{
 const result=planSampleForMean({confidence:95,sigma:10,targetMargin:2});
 assert.ok(result.raw>96&&result.raw<97);
 assert.equal(result.n,97);
 assert.ok(result.achievedMargin<=2);
 assert.ok(marginForMean({confidence:95,sigma:10,n:96})>2);
});

test('conserva el ejemplo simbólico de 34,02 y la relación cuadrática',()=>{
 const sigma=1,confidence=95;
 const targetMargin=CRITICAL_Z[confidence]/Math.sqrt(34.02);
 const result=planSampleForMean({confidence,sigma,targetMargin});
 assert.equal(result.n,35);
 const half=planSampleForMean({confidence,sigma,targetMargin:targetMargin/2});
 assert.ok(Math.abs(half.raw/result.raw-4)<1e-12);
});

test('más confianza exige más muestra y rechaza datos inválidos',()=>{
 const small=planSampleForMean({confidence:90,sigma:8,targetMargin:2});
 const large=planSampleForMean({confidence:99,sigma:8,targetMargin:2});
 assert.ok(large.n>small.n);
 assert.throws(()=>planSampleForMean({confidence:95,sigma:0,targetMargin:1}),RangeError);
 assert.throws(()=>planSampleForMean({confidence:95,sigma:1,targetMargin:0}),RangeError);
 assert.throws(()=>marginForMean({confidence:95,sigma:1,n:0}),RangeError);
});

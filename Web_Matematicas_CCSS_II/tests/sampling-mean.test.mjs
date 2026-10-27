import test from 'node:test';
import assert from 'node:assert/strict';
import {samplingMeanReadings} from '../content/models/sampling-mean.js';

test('café: distingue bolsa y media sin redondeo intermedio',()=>{
  const result=samplingMeanReadings({mu:500,sigma:15,n:25,threshold:495});
  assert.equal(result.standardError,3);
  assert.equal(result.zIndividual,-1/3);
  assert.equal(result.zMean,-5/3);
  assert.ok(Math.abs(result.pIndividual-0.36944134018176367)<1e-6);
  assert.ok(Math.abs(result.pMean-0.047790352272814696)<1e-6);
});

test('bombillas: error estándar y cola izquierda',()=>{
  const result=samplingMeanReadings({mu:1200,sigma:80,n:64,threshold:1180});
  assert.equal(result.standardError,10);
  assert.equal(result.zMean,-2);
  assert.ok(Math.abs(result.pMean-0.022750131948179153)<1e-6);
});

test('rechaza tamaños y dispersiones imposibles',()=>{
  assert.throws(()=>samplingMeanReadings({mu:0,sigma:0,n:25,threshold:1}),RangeError);
  assert.throws(()=>samplingMeanReadings({mu:0,sigma:1,n:0,threshold:1}),RangeError);
  assert.throws(()=>samplingMeanReadings({mu:0,sigma:1,n:2.5,threshold:1}),RangeError);
});

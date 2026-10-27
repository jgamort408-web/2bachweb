import test from 'node:test';
import assert from 'node:assert/strict';
import {identity,actions,applyAction,generateTransformSession,sameGraph,invariants,valueAt,baseValue,mappedPoint,score} from '../widgets/games/t02-b-transforma-la-funcion/model.js';
import {segments} from '../widgets/games/t02-b-transforma-la-funcion/graph.js';
const close=(a,b)=>assert.ok(Math.abs(a-b)<1e-7,`${a} != ${b}`);
test('1000 sesiones: rutas válidas, seis objetivos distintos y reproducibles',()=>{
 for(let seed=0;seed<1000;seed++){
  const qs=generateTransformSession(seed);assert.deepEqual(qs,generateTransformSession(seed));assert.equal(qs.length,6);
  assert.equal(new Set(qs.map(q=>q.family+JSON.stringify(invariants(q.family,q.target)))).size,6);
  for(const q of qs){let s=identity();for(const action of q.route){s=applyAction(s,action);assert.ok(s);}assert.ok(sameGraph(q.family,s,q.target));assert.equal(sameGraph(q.family,identity(),q.target),false);}
 }
});
test('acciones sobre la función actual: composición y orden no conmutativo',()=>{
 const operations={left:(f,x)=>f(x+1),right:(f,x)=>f(x-1),up:(f,x)=>f(x)+1,down:(f,x)=>f(x)-1,vDouble:(f,x)=>2*f(x),vHalf:(f,x)=>f(x)/2,flipX:(f,x)=>-f(x),hDouble:(f,x)=>f(x/2),hHalf:(f,x)=>f(2*x),flipY:(f,x)=>f(-x)};
 for(const family of ['quadratic','absolute','rational'])for(const a of [-1,.5,2])for(const b of [-1,.5,2]){
  const s={a,b,h:1,k:-1};for(const action of Object.keys(actions)){const t=applyAction(s,action);assert.ok(t);for(const x of [-4.3,-.7,.3,2.3,5.3]){const expected=operations[action](x=>valueAt(family,s,x),x);if(Number.isFinite(expected))close(valueAt(family,t,x),expected);}}
 }
 const upThenScale=applyAction(applyAction(identity(),'up'),'vDouble');const scaleThenUp=applyAction(applyAction(identity(),'vDouble'),'up');assert.equal(upThenScale.k,2);assert.equal(scaleThenUp.k,1);
 const rightThenScale=applyAction(applyAction(identity(),'right'),'hDouble');const scaleThenRight=applyAction(applyAction(identity(),'hDouble'),'right');assert.equal(rightThenScale.h,2);assert.equal(scaleThenRight.h,1);
});
test('equivalencia matemática, dominio racional y correspondencia de puntos',()=>{
 assert.ok(sameGraph('absolute',identity(),{a:.5,b:2,h:.5,k:0}));
 assert.ok(sameGraph('rational',identity(),{a:2,b:2,h:.5,k:0}));
 assert.ok(sameGraph('quadratic',identity(),{a:1,b:-1,h:-1,k:0}));
 assert.equal(sameGraph('rational',identity(),{a:2,b:2,h:0,k:0}),false);
 for(const q of generateTransformSession(357)){
  for(const u of [-2,0,2]){const v=baseValue(q.family,u),p=mappedPoint(q.target,u,v);close(valueAt(q.family,q.target,p.x),p.y);}
  if(q.family==='rational'){const pole=invariants(q.family,q.target)[1];assert.ok(Number.isNaN(valueAt(q.family,q.target,pole)));}
 }
});
test('límites, puntos, muestras de gráfica y puntuación',()=>{
 assert.equal(applyAction({a:4,b:1,h:0,k:0},'vDouble'),null);assert.equal(applyAction({a:1,b:.25,h:0,k:0},'hDouble'),null);assert.equal(applyAction({a:1,b:1,h:6,k:0},'right'),null);
 assert.equal(score(4),80);assert.equal(score(30),10);assert.equal(score(4,true),0);assert.ok(score(6)<score(4));
 for(let seed=0;seed<20;seed++)for(const q of generateTransformSession(seed)){
  const bs=segments(q.family,q.target);for(const b of bs)for(const [x,y]of b){assert.ok(Number.isFinite(y));close(y,valueAt(q.family,q.target,x));}
  if(q.family==='rational'){const pole=invariants(q.family,q.target)[1];for(const b of bs)assert.ok(b.every(([x])=>x<pole)||b.every(([x])=>x>pole));}
 }
});

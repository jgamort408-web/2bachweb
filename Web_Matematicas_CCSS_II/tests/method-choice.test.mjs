import test from 'node:test';
import assert from 'node:assert/strict';
import {methods,generateMethods,createMethodState,answerMethod,advanceMethod,hintMethod} from '../widgets/games/t03-b-metodo-correcto/generator.js';
const derivative=(fn,x)=>(fn(x+1e-5)-fn(x-1e-5))/2e-5;
const near=(a,b)=>Math.abs(a-b)<1e-6*(1+Math.abs(b));
test('1000 semillas: 8000 integrandos, cuatro estrategias y una sola familia completa',()=>{
 const signatures=new Set();
 for(let seed=0;seed<1000;seed++){
  const rows=generateMethods(seed);assert.equal(rows.length,8);assert.equal(new Set(rows.map(r=>r.id)).size,8);
  signatures.add(rows.map(r=>r.f).join('|'));
  for(const m of methods)assert.equal(rows.filter(r=>r.method===m.id).length,2);
  for(const r of rows){
   const xs=r.domain==='ℝ'?[-1.3,-.4,.23,.71,1.6]:[.17,.43,.91,1.37,2.13];
   for(const x of xs)assert.ok(near(derivative(r.primitive,x),r.value(x)),r.id);
   assert.equal(new Set(r.options.map(o=>o.formula)).size,4);
   const valid=r.options.filter(o=>o.complete&&xs.every(x=>near(derivative(o.primitive,x),r.value(x))));
   assert.deepEqual(valid.map(o=>o.id),['family']);
   assert.ok(xs.every(x=>near(derivative(r.options.find(o=>o.id==='particular').primitive,x),r.value(x))));
  }
 }
 assert.ok(signatures.size>500);
 assert.deepEqual(generateMethods(19).map(r=>r.f),generateMethods(19).map(r=>r.f));
});
test('16 decisiones perfectas: 1600 puntos, avance bloqueado y sin doble puntuación',()=>{
 const rows=generateMethods(7);let state=createMethodState();
 for(const r of rows){
  assert.equal(advanceMethod(state,8),state);
  for(const id of [r.method,'family']){
   const before=state,result=answerMethod(state,r,id);assert.ok(result.correct&&result.done);assert.equal(before.attempts,0);state=result.state;
   assert.ok(answerMethod(state,r,id).ignored);assert.equal(answerMethod(state,r,id).state,state);state=advanceMethod(state,8);
  }
 }
 assert.equal(state.phase,'summary');assert.equal(state.index,8);assert.equal(state.score,1600);assert.equal(state.results.length,16);assert.equal(advanceMethod(state,8),state);
});
test('pistas únicas, errores, segundo intento y solución tras dos fallos: 1400 puntos',()=>{
 const rows=generateMethods(25);let state=createMethodState();
 for(const [i,r] of rows.entries()){
  state=hintMethod(state);assert.equal(hintMethod(state),state);
  if(i===0){state=answerMethod(state,r,methods.find(m=>m.id!==r.method).id).state;assert.equal(state.phase,'method');}
  state=answerMethod(state,r,r.method).state;assert.equal(hintMethod(state),state);state=advanceMethod(state,8);
  if(i===0){state=answerMethod(state,r,'double').state;state=answerMethod(state,r,'negative').state;assert.equal(state.phase,'primitive-done');}
  else {if(i===1)state=answerMethod(state,r,'particular').state;state=answerMethod(state,r,'family').state;}
  state=advanceMethod(state,8);
 }
 assert.equal(state.score,1400);assert.equal(state.hints.length,8);assert.equal(state.results.filter(r=>r.correct&&r.attempts===1).length,13);
 assert.equal(state.results.filter(r=>!r.correct).length,1);
});
test('opciones desconocidas o de otra fase no alteran la partida',()=>{
 const r=generateMethods(8)[0],state=createMethodState();
 for(const id of ['family','unknown',undefined])assert.equal(answerMethod(state,r,id).state,state);
 const resolved=answerMethod(state,r,r.method).state,primitive=advanceMethod(resolved,8);
 assert.equal(answerMethod(primitive,r,r.method).state,primitive);
});

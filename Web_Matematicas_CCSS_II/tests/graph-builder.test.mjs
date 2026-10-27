import test from 'node:test';
import assert from 'node:assert/strict';
import {generateGraphSession,valueAt,derivativeAt,roots,facts,mismatch,initialRound,answerRound} from '../widgets/games/t02-a-construye-la-grafica/generator.js';
import {graphSegments} from '../widgets/games/t02-a-construye-la-grafica/graph.js';

test('1000 semillas: 6000 fichas, opciones distintas y una sola coincidencia',()=>{
 const positions=new Set();
 for(let seed=0;seed<1000;seed++){
  const session=generateGraphSession(seed);assert.deepEqual(session,generateGraphSession(seed));
  assert.equal(session.length,6);assert.equal(new Set(session.map(q=>JSON.stringify(q.target))).size,6);
  assert.deepEqual(session.map(q=>q.target.family),['quadratic','rational','exponential','quadratic','rational','exponential']);
  for(const q of session){
   assert.equal(q.options.length,4);assert.equal(q.options.filter(o=>!mismatch(q.target,o.model)).length,1);
   positions.add(q.options.findIndex(o=>o.id===q.correct));
   for(const o of q.options){
    const text=JSON.stringify(facts(o.model));assert.doesNotMatch(text,/NaN|Infinity|undefined/);
    for(const root of roots(o.model)){assert.ok(Number.isFinite(root));assert.ok(Math.abs(valueAt(o.model,root))<1e-10);}
    for(const other of q.options.filter(p=>p.id!==o.id))assert.ok([-4.1,-.3,1.3,4.2].some(x=>Math.abs(valueAt(o.model,x)-valueAt(other.model,x))>.001));
    assert.equal(Boolean(mismatch(q.target,o.model)),o.id!==q.correct);
   }
  }
 }
 assert.equal(positions.size,4);
});
test('derivadas, extremos y asíntotas contrastados con las funciones originales',()=>{
 for(const family of ['quadratic','rational','exponential'])for(const a of [-1,1])for(const h of [-2,-1,0,1,2])for(const k of [-2,-1,0,1,2,3]){
  const m={family,a,h,k};
  for(const x of [-4.2,-.4,.4,4.2]){const eps=1e-5;const numeric=(valueAt(m,x+eps)-valueAt(m,x-eps))/(2*eps);assert.ok(Math.abs(numeric-derivativeAt(m,x))<1e-4);}
  if(family==='quadratic'){assert.equal(valueAt(m,h),k);assert.equal(Math.abs(derivativeAt(m,h)),0);assert.equal(Math.sign(valueAt(m,h+1)-k),a);}
  if(family==='rational'){assert.ok(Number.isNaN(valueAt(m,h)));assert.equal(Math.sign(valueAt(m,h+1e-5)-k),a);assert.equal(Math.sign(valueAt(m,h-1e-5)-k),-a);assert.ok(Math.abs(valueAt(m,1e8)-k)<2e-8);}
  if(family==='exponential'){assert.ok(Math.abs(valueAt(m,-50)-k)<1e-12);assert.equal(Math.sign(derivativeAt(m,0)),a);}
 }
});
test('SVG: ramas racionales separadas por la vertical y muestras finitas',()=>{
 for(let seed=0;seed<20;seed++)for(const q of generateGraphSession(seed))for(const o of q.options){
  const branches=graphSegments(o.model);assert.equal(branches.length,o.model.family==='rational'?2:1);
  for(const b of branches)for(const [x,y]of b){assert.ok(Number.isFinite(x)&&Number.isFinite(y));assert.equal(y,valueAt(o.model,x));}
  if(o.model.family==='rational'){assert.ok(branches[0].every(([x])=>x<o.model.h));assert.ok(branches[1].every(([x])=>x>o.model.h));}
 }
});
test('sesión: acierto, reintento, dos errores, pistas y bloqueo de doble puntuación',()=>{
 const first=answerRound(initialRound(),true);assert.equal(first.points,100);assert.equal(first.firstTry,true);assert.equal(answerRound(first,true),first);
 const failed=answerRound(initialRound(),false);assert.equal(failed.done,false);assert.equal(failed.points,0);
 const second=answerRound({...failed,hinted:true},true);assert.equal(second.points,50);assert.equal(second.firstTry,false);assert.equal(second.hinted,true);
 const end=answerRound(failed,false);assert.equal(end.done,true);assert.equal(end.points,0);assert.equal(answerRound(end,true),end);
 assert.equal(answerRound({...initialRound(),hinted:true},true).points,100);
});

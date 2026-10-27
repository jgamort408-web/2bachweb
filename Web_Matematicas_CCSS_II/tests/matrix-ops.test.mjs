import { expectedCatalog } from "./helpers/catalog-expectations.mjs";

import test from 'node:test';
import assert from 'node:assert/strict';
import {generateMatrixOps,createMatrixOpsState,answerMatrixOps,advanceMatrixOps,hintMatrixOps} from '../widgets/games/t04-a-matrix-ops/generator.js';
import {questionsForScope,cardsForScope} from '../content/activities/catalog.js';
const same=(a,b)=>JSON.stringify(a)===JSON.stringify(b);
function product(a,b){const c=Array.from({length:a.length},()=>Array(b[0].length).fill(0));for(let i=0;i<a.length;i++)for(let j=0;j<b[0].length;j++)for(let k=0;k<b.length;k++)c[i][j]+=a[i][k]*b[k][j];return c;}
test('1000 sesiones, 8000 retos: operaciones independientes, cobertura y una respuesta válida',()=>{
 const signatures=new Set(),types=new Set();
 for(let seed=0;seed<1000;seed++){
  const rows=generateMatrixOps(seed);assert.equal(rows.length,8);assert.equal(new Set(rows.map(r=>r.kind)).size,8);
  signatures.add(rows.map(r=>r.statement).join('|'));
  for(const [index,r]of rows.entries()){
   assert.equal(r.index,index);assert.equal(r.stages.length,2);
   for(const s of r.stages){assert.equal(s.options.length,4);assert.equal(new Set(s.options.map(o=>o.text)).size,4);assert.equal(s.options.filter(o=>o.id===s.correct).length,1);assert.ok(s.hint&&s.explanation&&s.options.every(o=>o.feedback));}
   let expected;
   if(['type','scale'].includes(r.kind))expected=r.a.map(row=>row.map(v=>r.k*v));
   if(r.kind==='type'){
    types.add(r.type);
    if(r.type==='diagonal'){assert.notEqual(r.a[0][0],r.a[1][1]);assert.equal(r.a[0][1],0);assert.equal(r.a[1][0],0);}
    if(r.type==='identity')assert.deepEqual(r.a,[[1,0],[0,1]]);
    if(r.type==='zero')assert.ok(r.a.flat().every(v=>v===0));
    if(r.type==='rectangular'){assert.equal(r.a.length,2);assert.equal(r.a[0].length,3);}
   }
   if(['sum','difference'].includes(r.kind))expected=r.a.map((row,i)=>row.map((v,j)=>v+(r.kind==='sum'?1:-1)*r.b[i][j]));
   if(r.kind==='product')expected=product(r.a,r.b);
   if(r.kind==='reverse')expected=product(r.b,r.a);
   if(r.kind==='power'){expected=[[1,0],[0,1]];for(let i=0;i<r.n;i++)expected=product(expected,r.a);assert.ok([2,3].includes(r.n));}
   if(r.kind==='incompatible'){assert.notEqual(r.a[0].length,r.b.length);assert.match(r.stages[1].explanation,/No hay una matriz resultado/);}
   else{
    const valid=r.stages[1].options.filter(o=>same(o.value,expected));assert.equal(valid.length,1);assert.equal(valid[0].id,'correct');
    if(r.kind!=='type')assert.match(r.stages[0].options.find(o=>o.id==='correct').text,new RegExp(expected.length+'×'+expected[0].length));
   }
   assert.doesNotMatch(JSON.stringify(r),/NaN|Infinity|undefined/);
  }
 }
 assert.equal(types.size,4);assert.ok(signatures.size>900);assert.deepEqual(generateMatrixOps(25),generateMatrixOps(25));
});
test('sesión perfecta: 16 decisiones, 1600 puntos, avance y doble puntuación bloqueados',()=>{
 const rows=generateMatrixOps(7);let state=createMatrixOpsState();
 for(const r of rows)for(let stage=0;stage<2;stage++){
  assert.equal(state.stage,stage);assert.equal(advanceMatrixOps(state),state);
  const before=structuredClone(state),answer=answerMatrixOps(state,r,'correct');assert.deepEqual(state,before);assert.ok(answer.correct&&answer.done);state=answer.state;
  assert.equal(answerMatrixOps(state,r,'correct').state,state);state=advanceMatrixOps(state);
 }
 assert.equal(state.phase,'summary');assert.equal(state.score,1600);assert.equal(state.results.length,16);assert.equal(advanceMatrixOps(state),state);
});
test('reintentos, dos errores, pistas únicas y 1400 puntos',()=>{
 let state=createMatrixOpsState();const rows=generateMatrixOps(19);
 for(const [i,r]of rows.entries())for(let stage=0;stage<2;stage++){
  if(i===0&&stage===0){state=hintMatrixOps(state);assert.equal(hintMatrixOps(state),state);state=answerMatrixOps(state,r,'wrong-1').state;}
  if(i===0&&stage===1){state=answerMatrixOps(state,r,'wrong-1').state;state=answerMatrixOps(state,r,'wrong-2').state;}
  else{if(i===1&&stage===0)state=answerMatrixOps(state,r,'wrong-1').state;state=answerMatrixOps(state,r,'correct').state;}
  assert.equal(hintMatrixOps(state),state);state=advanceMatrixOps(state);
 }
 assert.equal(state.score,1400);assert.equal(state.hints.length,1);assert.equal(state.results.filter(r=>r.correct&&r.attempts===1).length,13);assert.equal(state.results.filter(r=>!r.correct).length,1);
});
test('opciones desconocidas, retos ajenos y resumen no alteran la sesión',()=>{
 const rows=generateMatrixOps(8),state=createMatrixOpsState();
 for(const id of ['missing',undefined,null])assert.equal(answerMatrixOps(state,rows[0],id).state,state);
 assert.equal(answerMatrixOps(state,rows[1],'correct').state,state);assert.equal(answerMatrixOps(state,undefined,'correct').state,state);
 assert.equal(answerMatrixOps({...state,phase:'summary'},rows[0],'correct').ignored,true);
});
test('variantes del juego no modifican el banco fijo ni las tarjetas',()=>{
 assert.equal(questionsForScope('t04').length,72);assert.equal(cardsForScope('t04').length,72);
 assert.equal(questionsForScope('all-course').length,expectedCatalog.questions);assert.equal(cardsForScope().length,expectedCatalog.cards);
});



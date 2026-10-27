import { expectedCatalog } from "./helpers/catalog-expectations.mjs";

import test from 'node:test';
import assert from 'node:assert/strict';
import {generateChamber,createChamberState,answerChamber,advanceChamber,hintChamber} from '../widgets/games/t04-b-la-camara-del-determinante/generator.js';
import {questionsForScope,cardsForScope} from '../content/activities/catalog.js';
// Determinante por permutaciones; independiente de las fórmulas de los generadores.
function det(a){let total=0;function visit(p){if(p.length===a.length){let inversions=0;for(let i=0;i<p.length;i++)for(let j=i+1;j<p.length;j++)if(p[i]>p[j])inversions++;total+=(-1)**inversions*p.reduce((v,col,row)=>v*a[row][col],1);return;}for(let j=0;j<a.length;j++)if(!p.includes(j))visit([...p,j]);}visit([]);return total===0?0:total;}
function reduce(a){const n=a.length,m=a.map(r=>[...r]);let row=0;for(let j=0;j<m[0].length&&row<n;j++){const pivot=m.findIndex((r,i)=>i>=row&&Math.abs(r[j])>1e-10);if(pivot<0)continue;[m[pivot],m[row]]=[m[row],m[pivot]];const d=m[row][j];m[row]=m[row].map(v=>v/d);for(let i=0;i<n;i++)if(i!==row){const f=m[i][j];m[i]=m[i].map((v,k)=>v-f*m[row][k]);}row++;}return {rank:row,m};}
const answer=(r,stage)=>r.stages[stage].options.find(o=>o.id==='correct').value;
const close=(a,b)=>assert.ok(Math.abs(a-b)<1e-9,a+' frente a '+b);
test('1000 sesiones, 6000 salas: determinantes, propiedades, rango, parámetro e inversa independientes',()=>{
 const signatures=new Set(),signs=new Set();
 for(let seed=0;seed<1000;seed++){
  const rooms=generateChamber(seed);assert.equal(rooms.length,6);assert.equal(new Set(rooms.map(r=>r.id)).size,6);signatures.add(rooms.map(r=>r.statement).join('|'));
  for(const [index,r]of rooms.entries()){
   assert.equal(r.index,index);assert.equal(r.stages.length,3);
   for(const s of r.stages){assert.equal(s.options.length,4);assert.equal(new Set(s.options.map(o=>o.text)).size,4);assert.equal(s.options.filter(o=>o.id===s.correct).length,1);assert.ok(s.hint&&s.explanation&&s.options.every(o=>o.feedback));}
   assert.doesNotMatch(JSON.stringify(r),/NaN|Infinity|undefined/);
   if(r.id==='entry'){const d=det(r.a);assert.equal(answer(r,0),d);assert.notEqual(d,0);assert.equal(answer(r,1),true);assert.equal(answer(r,2),reduce(r.a).rank);signs.add(Math.sign(d));}
   if(r.id==='triangular'){const swapped=[r.a[1],r.a[0],r.a[2]];assert.equal(answer(r,0),det(r.a));assert.equal(answer(r,1),det(swapped));assert.equal(answer(r,2),det(r.a.map(row=>row.map(v=>r.k*v))));}
   if(r.id==='dependent'){assert.equal(answer(r,0),det(r.a));assert.equal(answer(r,0),0);assert.equal(answer(r,1),false);assert.equal(answer(r,2),reduce(r.a).rank);assert.equal(answer(r,2),2);}
   if(r.id==='operations'){const a=[[r.det,0,0],[0,1,0],[0,0,1]];[a[0],a[1]]=[a[1],a[0]];assert.equal(answer(r,0),det(a));a[1]=a[1].map(v=>v*r.factor);assert.equal(answer(r,1),det(a));a[2]=a[2].map((v,j)=>v+r.multiple*a[0][j]);assert.equal(answer(r,2),det(a));}
   if(r.id==='parameter'){
    const correct=answer(r,0);assert.equal(answer(r,1),r.r);
    for(let t=-5;t<=5;t++){const a=[[1,1,0],[0,t-r.r,0],[0,0,r.h]];assert.equal(correct.slope*t+correct.intercept,det(a));assert.equal(det(a)===0,t===r.r);assert.equal(reduce(a).rank,t===r.r?answer(r,2):3);}
    const matches=r.stages[0].options.filter(o=>[-1,0,1].every(t=>o.value.slope*t+o.value.intercept===r.h*(t-r.r)));assert.equal(matches.length,1);
   }
   if(r.id==='boss'){
    assert.equal(answer(r,0),det(r.a));assert.equal(answer(r,1),true);
    const aug=r.a.map((row,i)=>[...row,...Array.from({length:3},(_,j)=>Number(i===j))]),inv=reduce(aug).m.map(row=>row.slice(3)),f=answer(r,2);
    close(f.numerator/f.denominator,inv[0][1]);assert.ok(f.denominator>1);assert.notEqual(f.numerator,0);
    const values=r.stages[2].options.map(o=>o.value.numerator/o.value.denominator);assert.equal(new Set(values).size,4);assert.equal(values.filter(v=>Math.abs(v-inv[0][1])<1e-9).length,1);
    assert.equal(inv[1][0],0);assert.notEqual(inv[0][1],inv[1][0]);
   }
  }
 }
 assert.equal(signs.size,2);assert.ok(signatures.size>900);assert.deepEqual(generateChamber(31),generateChamber(31));
});
test('18 cerraduras perfectas, 1800 puntos, tres pasos por sala y bloqueo de doble puntuación',()=>{
 let state=createChamberState();const rooms=generateChamber(4);
 for(const room of rooms)for(let stage=0;stage<3;stage++){
  assert.equal(state.stage,stage);assert.equal(advanceChamber(state),state);const before=structuredClone(state),result=answerChamber(state,room,'correct');
  assert.deepEqual(state,before);assert.ok(result.correct&&result.done);state=result.state;assert.equal(answerChamber(state,room,'correct').state,state);state=advanceChamber(state);
 }
 assert.equal(state.phase,'summary');assert.equal(state.score,1800);assert.equal(state.results.length,18);assert.equal(advanceChamber(state),state);
});
test('asistencia tras dos errores, pistas únicas y puntuación 1600',()=>{
 let state=createChamberState();const rooms=generateChamber(17);
 for(const [i,room]of rooms.entries())for(let stage=0;stage<3;stage++){
  if(i===0&&stage===0){state=hintChamber(state);assert.equal(hintChamber(state),state);state=answerChamber(state,room,'wrong-1').state;}
  if(i===0&&stage===1){state=answerChamber(state,room,'wrong-1').state;state=answerChamber(state,room,'wrong-2').state;}
  else{if(i===1&&stage===0)state=answerChamber(state,room,'wrong-1').state;state=answerChamber(state,room,'correct').state;}
  assert.equal(hintChamber(state),state);state=advanceChamber(state);
 }
 assert.equal(state.score,1600);assert.equal(state.hints.length,1);assert.equal(state.results.filter(r=>r.correct&&r.attempts===1).length,15);assert.equal(state.results.filter(r=>!r.correct).length,1);
});
test('opciones inválidas, otra sala y fin de sesión no modifican el estado',()=>{
 const state=createChamberState(),rooms=generateChamber(9);
 for(const id of ['missing',undefined,null])assert.equal(answerChamber(state,rooms[0],id).state,state);
 assert.equal(answerChamber(state,rooms[1],'correct').state,state);assert.equal(answerChamber(state,undefined,'correct').state,state);
 const summary={...state,phase:'summary'};assert.equal(answerChamber(summary,rooms[0],'correct').state,summary);assert.equal(hintChamber(summary),summary);
});
test('variantes de la cámara separadas del banco de preguntas',()=>{
 assert.equal(questionsForScope('t04').length,72);assert.equal(cardsForScope('t04').length,72);assert.equal(questionsForScope('all-course').length,expectedCatalog.questions);assert.equal(cardsForScope().length,expectedCatalog.cards);
});



import { expectedCatalog } from "./helpers/catalog-expectations.mjs";
import test from 'node:test';
import assert from 'node:assert/strict';
import {generateNetworks,blankMatrix,connections,createNetworkState,answerNetwork,advanceNetwork,hintNetwork,validateRound} from '../widgets/games/t04-c-redes-y-adyacencia/generator.js';
import {questionsForScope,cardsForScope} from '../content/activities/catalog.js';
const wrong=r=>{const a=structuredClone(r.matrix);a[0][1]=1-a[0][1];return a;};
test('1000 sesiones: 6000 redes, orientación, aislamiento y lista de conexiones contrastada',()=>{
 let empty=0;const signatures=new Set(),isolated=new Set();
 for(let seed=0;seed<1000;seed++){
  const session=generateNetworks(seed);assert.deepEqual(session,generateNetworks(seed));assert.equal(session.length,6);
  signatures.add(JSON.stringify(session.map(r=>r.matrix)));
  session.forEach((r,index)=>{
   const n=index<2?3:4;assert.equal(validateRound(r),n);assert.equal(r.mode,index%2?'graph':'matrix');
   const list=connections(r.matrix,r.directed),reconstructed=blankMatrix(n);
   for(const link of list){
    const [from,to]=link.split(r.directed?' → ':' — ').map(s=>s.charCodeAt(0)-65);
    reconstructed[from][to]=1;if(!r.directed)reconstructed[to][from]=1;
   }
   assert.deepEqual(reconstructed,r.matrix);assert.equal(new Set(list).size,list.length);
   if(r.directed){assert.equal(r.matrix[0][1],1);assert.equal(r.matrix[1][0],0);}
   if(index>=4){assert.ok(r.matrix[r.isolated].every(v=>v===0));assert.ok(r.matrix.every(row=>row[r.isolated]===0));isolated.add(r.isolated);}
   if(!list.length)empty++;
  });
 }
 assert.ok(signatures.size>900);assert.ok(empty>0);assert.equal(isolated.size,4);
});
test('partida perfecta: seis resultados, 600 puntos, avance controlado y sin doble puntuación',()=>{
 const session=generateNetworks(24);let state=createNetworkState();
 for(const r of session){
  assert.equal(advanceNetwork(state),state);
  const copy=structuredClone(state),result=answerNetwork(state,r,r.matrix);assert.deepEqual(state,copy);
  assert.equal(result.correct,true);assert.equal(result.points,100);state=result.state;
  assert.equal(answerNetwork(state,r,r.matrix).state,state);state=advanceNetwork(state);
 }
 assert.equal(state.phase,'summary');assert.equal(state.score,600);assert.equal(state.results.length,6);assert.equal(hintNetwork(state),state);
});
test('pistas, reintento y revelación: 450 puntos y copia independiente de las respuestas',()=>{
 const session=generateNetworks(83);let state=createNetworkState();
 for(const r of session){
  if(r.index===0){state=hintNetwork(state);assert.equal(hintNetwork(state),state);state=answerNetwork(state,r,wrong(r)).state;const res=answerNetwork(state,r,wrong(r));assert.equal(res.done,true);assert.equal(res.correct,false);assert.equal(res.points,0);state=res.state;}
  else{if(r.index===1){const res=answerNetwork(state,r,wrong(r));assert.equal(res.done,false);assert.equal(res.differences.length,1);state=res.state;}const answer=structuredClone(r.matrix);state=answerNetwork(state,r,answer).state;answer[0][1]=9;assert.notEqual(state.results.at(-1).answer[0][1],9);}
  state=advanceNetwork(state);
 }
 assert.equal(state.score,450);assert.equal(state.hints.length,1);assert.equal(state.results.filter(r=>r.correct&&r.attempts===1).length,4);
});
test('entradas inválidas, simetría incorrecta, red nula y flecha invertida',()=>{
 const r=generateNetworks(2)[0],state=createNetworkState();
 for(const value of [null,[],[[0]],[[0,1,0],[0,0,0],[1,0,2]],[[0,NaN,0],[0,0,0],[0,0,0]]])assert.equal(answerNetwork(state,r,value).state,state);
 assert.equal(answerNetwork(state,null,r.matrix).state,state);assert.equal(answerNetwork(state,generateNetworks(2)[1],r.matrix).state,state);
 const a=structuredClone(r.matrix);a[0][1]=1-a[1][0];assert.equal(answerNetwork(state,r,a).correct,false);
 const empty={...r,matrix:blankMatrix(3)};assert.equal(answerNetwork(state,empty,blankMatrix(3)).correct,true);
 const directed=generateNetworks(2)[2],transposed=directed.matrix[0].map((_,i)=>directed.matrix.map(row=>row[i]));
 const result=answerNetwork({...state,index:2},directed,transposed);assert.equal(result.correct,false);assert.ok(result.differences.length>=2);
});
test('variantes de redes separadas del banco fijo 72/72 y 318/301',()=>{
 assert.equal(questionsForScope('t04').length,72);assert.equal(cardsForScope('t04').length,72);assert.equal(questionsForScope('all-course').length,expectedCatalog.questions);assert.equal(cardsForScope().length,expectedCatalog.cards);
});



import test from 'node:test';
import assert from 'node:assert/strict';
import {generatePrimitivePairs,createPairState,answerPair,usePairHint,boardComplete,advancePairBoard} from '../widgets/games/t03-a-parejas-de-primitivas/generator.js';
const close=(a,b)=>assert.ok(Math.abs(a-b)<1e-6*(1+Math.abs(b)));
test('1000 sesiones: 10000 integrandos y familias inequívocas, con +C como requisito de familia',()=>{
 const seen=new Set(),samples=[.17,.43,.91,1.37,2.13];
 for(let seed=0;seed<1000;seed++){
  const boards=generatePrimitivePairs(seed);assert.equal(boards.length,2);
  seen.add(boards.map(b=>b.targets.map(t=>t.f).join('|')).join(';'));
  for(const board of boards){
   assert.equal(board.targets.length,5);assert.equal(board.options.length,7);assert.equal(new Set(board.options.map(o=>o.F)).size,7);
   for(const t of board.targets){
    for(const x of samples)close((t.primitive(x+1e-5)-t.primitive(x-1e-5))/2e-5,t.value(x));
    const valid=board.options.filter(o=>o.complete&&samples.every(x=>Math.abs((o.primitive(x+1e-5)-o.primitive(x-1e-5))/2e-5-t.value(x))<1e-6*(1+Math.abs(t.value(x)))));
    assert.equal(valid.length,1);assert.equal(valid[0].owner,t.id);assert.equal(valid[0].factor,1);
   }
   for(const o of board.options)for(const x of samples)close((o.primitive(x+1e-5)-o.primitive(x-1e-5))/2e-5,o.value(x));
   const particular=board.options.find(o=>!o.complete),target=board.targets.find(t=>t.id===particular.owner);
   for(const x of samples)close(particular.value(x),target.value(x));
  }
 }
 assert.ok(seen.size>500);
 const signature=seed=>generatePrimitivePairs(seed).map(b=>({targets:b.targets.map(t=>t.f),options:b.options.map(o=>o.F)}));
 assert.deepEqual(signature(123),signature(123));
});
test('sesión perfecta: 1200 puntos y dos combos, incluyendo continuidad entre tableros',()=>{
 const boards=generatePrimitivePairs(10);let state=createPairState(boards);
 assert.equal(advancePairBoard(state,boards),state);
 for(const board of boards){
  for(const t of board.targets){
   const before=state,result=answerPair(state,board,t.id,t.id+'-family');assert.ok(result.correct&&result.done);assert.equal(before.pairs[t.id].attempts,0);state=result.state;
   assert.equal(answerPair(state,board,t.id,t.id+'-family').state,state);
  }
  assert.ok(boardComplete(state,board));state=advancePairBoard(state,boards);
 }
 assert.equal(state.board,2);assert.equal(state.score,1200);assert.equal(state.firstTry,10);assert.equal(state.combos,2);assert.equal(state.bestStreak,10);
 assert.equal(advancePairBoard(state,boards),state);
});
test('pista, primitiva particular, reintento y revelación sin repetir puntuación',()=>{
 const boards=generatePrimitivePairs(1);let state=createPairState(boards),board=boards[0];
 state=usePairHint(state,board,'b0-t0');assert.equal(usePairHint(state,board,'b0-t0'),state);assert.equal(state.hints,1);
 let result=answerPair(state,board,'b0-t0','b0-particular');assert.ok(result.missingConstant&&!result.done&&!result.correct);state=result.state;
 result=answerPair(state,board,'b0-t0','b0-t0-family');assert.equal(result.points,50);state=result.state;
 const before=state;assert.equal(answerPair(state,board,'b0-t1','b0-t0-family').state,before);
 for(let i=0;i<2;i++)state=answerPair(state,board,'b0-t1','b0-factor').state;
 assert.ok(state.pairs['b0-t1'].done&&!state.pairs['b0-t1'].correct);
 for(const t of board.targets.filter(t=>!state.pairs[t.id].done))state=answerPair(state,board,t.id,t.id+'-family').state;
 state=advancePairBoard(state,boards);
 for(const t of boards[1].targets)state=answerPair(state,boards[1],t.id,t.id+'-family').state;
 assert.equal(state.score,950);assert.equal(state.firstTry,8);assert.equal(state.combos,1);assert.equal(state.bestStreak,8);
 assert.equal(answerPair(state,boards[0],'b0-t0','b0-t0-family').state,state);
});
test('entradas desconocidas, tablero equivocado y pistas de parejas terminadas se ignoran',()=>{
 const boards=generatePrimitivePairs(9),state=createPairState(boards);
 for(const [b,t,o]of [[boards[1],'b1-t0','b1-t0-family'],[boards[0],'unknown','b0-factor'],[boards[0],'b0-t0','unknown']])assert.equal(answerPair(state,b,t,o).state,state);
 assert.equal(usePairHint(state,boards[0],'unknown'),state);
 const solved=answerPair(state,boards[0],'b0-t0','b0-t0-family').state;assert.equal(usePairHint(solved,boards[0],'b0-t0'),solved);
});

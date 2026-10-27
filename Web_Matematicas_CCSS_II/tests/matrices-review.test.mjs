import { expectedCatalog } from "./helpers/catalog-expectations.mjs";

import test from 'node:test';
import assert from 'node:assert/strict';
import {questionsForScope,cardsForScope} from '../content/activities/catalog.js';
import {matrixReviewIds} from '../content/activities/review-t04.js';
import {determinantDetails} from '../content/models/determinants.js';
import {inverseDetails} from '../content/models/matrix-inverse.js';
import {rankDetails} from '../content/models/matrix-rank.js';
import {graphDetails} from '../content/models/graphs.js';
const mul=(a,b)=>a.map(r=>b[0].map((_,j)=>r.reduce((s,v,k)=>s+v*b[k][j],0)));
const sub=(a,b)=>a.map((r,i)=>r.map((v,j)=>v-b[i][j]));
const transpose=a=>a[0].map((_,j)=>a.map(r=>r[j]));
const identity=n=>Array.from({length:n},(_,i)=>Array.from({length:n},(_,j)=>Number(i===j)));
const close=(a,b)=>a.forEach((r,i)=>r.forEach((v,j)=>assert.ok(Math.abs(v-b[i][j])<1e-9)));
test('repaso: doce preguntas existentes, una de cada lección; bancos sin duplicación',()=>{
 const bank=questionsForScope('t04'),review=questionsForScope('review-t04');
 assert.equal(review.length,12);assert.equal(new Set(matrixReviewIds).size,12);
 assert.equal(bank.length,72);assert.equal(new Set(bank.map(q=>q.prompt)).size,72);
 assert.equal(cardsForScope('t04').length,72);assert.equal(questionsForScope('all-course').length,expectedCatalog.questions);assert.equal(cardsForScope().length,expectedCatalog.cards);
 review.forEach((q,i)=>{assert.ok(q&&bank.includes(q));assert.equal(q.lessonId,'t04-e'+String(i+1).padStart(2,'0'));assert.ok(q.hint&&q.explanation);assert.equal(q.options.filter(o=>o.id===q.correct).length,1);assert.equal(new Set(q.options.map(o=>o.text)).size,4);});
 for(let i=1;i<=12;i++){const id='t04-e'+String(i).padStart(2,'0');assert.equal(questionsForScope(id).length,6);assert.equal(cardsForScope(id).length,6);}
});
test('ventas: dimensiones, categorías, distributiva, traspuesta y margen',()=>{
 const Q=[[10,4,6],[5,8,2]],p=[[3],[5],[2]],c=[[2],[3],[1]];
 assert.equal(Q[1][2],2);assert.deepEqual(mul(Q,p),[[62],[59]]);assert.deepEqual(mul(Q,c),[[38],[36]]);
 assert.deepEqual(mul(Q,sub(p,c)),[[24],[23]]);assert.deepEqual(sub(mul(Q,p),mul(Q,c)),mul(Q,sub(p,c)));
 assert.deepEqual(mul(transpose(p),transpose(Q)),[[62,59]]);assert.equal(transpose(Q)[0].length,2);assert.equal(p.length,3);
 assert.equal(mul(Q,sub(p,c)).flat().reduce((s,v)=>s+v,0),47);
});
test('parámetro: adjunta, inversa condicionada, rangos y familias verificadas por sustitución',()=>{
 for(let t=-8;t<=8;t++){
  const M=[[1,1,0],[0,t-1,0],[0,0,t+1]],det=t*t-1;
  const adj=[[det,-(t+1),0],[0,t+1,0],[0,0,t-1]];
  const m=inverseDetails(M);assert.equal(determinantDetails(M).value,det);assert.deepEqual(m.adjugate,adj.map(r=>r.map(v=>v===0?0:v)));
  assert.equal(rankDetails(M).rank,Math.abs(t)===1?2:3);
  const target=identity(3).map(r=>r.map(v=>v*det));close(mul(M,adj),target);close(mul(adj,M),target);
  const b=[[2],[t-1],[2*(t+1)]];assert.deepEqual(mul(M,[[1],[1],[2]]),b);
  if(det){const inv=[[1,-1/(t-1),0],[0,1/(t-1),0],[0,0,1/(t+1)]];close(mul(M,inv),identity(3));close(mul(inv,b),[[1],[1],[2]]);}
  else{
   assert.equal(m.inverse,null);
   for(let k=-20;k<=20;k++){const s=k/2,x=t===1?[[2-s],[s],[2]]:[[1],[1],[s]];close(mul(M,x),b);}
  }
 }
 const M1=[[1,1,0],[0,0,0],[0,0,2]],bad=M1.map((r,i)=>[...r,[2,1,0][i]]);
 assert.equal(rankDetails(M1).rank,2);assert.equal(rankDetails(bad).rank,3);
});
test('patrón de potencias e inversa: repetición independiente y lados de la ecuación',()=>{
 const N=[[0,1],[0,0]],P=[[1,2],[0,1]],Pinv=[[1,-2],[0,1]],B=[[3,5],[1,2]];
 assert.deepEqual(mul(N,N),[[0,0],[0,0]]);let power=identity(2);
 for(let n=0;n<=30;n++){assert.deepEqual(power,[[1,2*n],[0,1]]);power=mul(power,P);}
 assert.deepEqual(mul(P,Pinv),identity(2));assert.deepEqual(mul(Pinv,P),identity(2));
 const left=mul(Pinv,B),right=mul(B,Pinv);
 assert.deepEqual(left,[[1,1],[1,2]]);assert.deepEqual(right,[[3,-1],[1,0]]);
 assert.deepEqual(mul(P,left),B);assert.deepEqual(mul(right,P),B);assert.notDeepEqual(mul(P,right),B);
});
test('redes: recorrido, singularidad sin desconexión y saldos antisimétricos',()=>{
 const G=[[0,1,1],[1,0,1],[1,1,0]],H=[[0,1,1],[1,0,0],[1,0,0]];
 assert.deepEqual(mul(G,G),[[2,1,1],[1,2,1],[1,1,2]]);assert.deepEqual(mul(H,H),[[2,0,0],[0,1,1],[0,1,1]]);
 assert.deepEqual(graphDetails(G,{from:0,to:0}).walks,[[0,1,0],[0,2,0]]);
 assert.deepEqual(graphDetails(G,{from:1,to:2}).walks,[[1,0,2]]);assert.equal(graphDetails(G).edges,3);
 assert.equal(rankDetails(H).rank,2);assert.equal(determinantDetails(H).value,0);
 for(let from=0;from<3;from++)for(let to=0;to<3;to++)assert.ok([0,1,2].some(length=>graphDetails(H,{from,to,length}).count>0));
 assert.equal(graphDetails(H,{from:0,to:1,length:2}).count,0);assert.equal(graphDetails(H,{from:0,to:1,length:1}).count,1);
 const F=[[0,3,1],[1,0,2],[4,0,0]],K=sub(F,transpose(F));assert.deepEqual(K,[[0,2,-3],[-2,0,2],[3,-2,0]]);
 assert.deepEqual(transpose(K),K.map(r=>r.map(v=>v===0?0:-v)));
});



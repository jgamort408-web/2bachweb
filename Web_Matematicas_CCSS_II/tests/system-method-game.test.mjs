import test from 'node:test';
import assert from 'node:assert/strict';
import {generateMethods,createMethodState,answerMethod,hintMethod,advanceMethod,matrixTex} from '../widgets/games/t05-c-elige-el-metodo/model.js';
const det=a=>a.length===1?a[0][0]:a[0].reduce((s,v,j)=>s+(-1)**j*v*det(a.slice(1).map(row=>row.filter((_,k)=>j!==k))),0);
const product=(a,x)=>a.map(row=>row.reduce((s,v,j)=>s+v*x[j],0));
const rank=a=>{a=a.map(r=>r.slice());let r=0;for(let j=0;j<a[0].length&&r<a.length;j++){const p=a.findIndex((row,i)=>i>=r&&Math.abs(row[j])>1e-9);if(p<0)continue;[a[r],a[p]]=[a[p],a[r]];for(let i=r+1;i<a.length;i++){const factor=a[i][j]/a[r][j];for(let k=j;k<a[0].length;k++)a[i][k]-=factor*a[r][k];}r++;}return r;};
test('6000 situaciones: determinantes, soluciones, familias y casos críticos independientes',()=>{
 let sci=0,si=0;
 for(let seed=0;seed<1000;seed++){
  const bank=generateMethods(seed);assert.equal(bank.length,6);
  for(const c of bank){
   assert.equal(c.options.length,4);assert.equal(new Set(c.options.map(o=>o.id)).size,4);
   assert.equal(c.options.filter(o=>o.recommended).length,1);
   assert.ok(c.options.find(o=>o.recommended).valid);
   assert.ok(c.options.some(o=>!o.valid));
   if(c.det!==undefined)assert.equal(det(c.a),c.det);
   if(c.solution)assert.deepEqual(product(c.a,c.solution),c.b);
   if(c.inverse)for(let j=0;j<2;j++)assert.deepEqual(product(c.a,c.inverse.map(row=>row[j])),[0,1].map(i=>Number(i===j)));
   if(c.family){
    assert.equal(rank(c.a),c.rank);
    assert.equal(rank(c.a.map((row,i)=>[...row,c.b[i]])),c.rank);
    assert.equal(c.family[0].length-1,c.a[0].length-c.rank);
    for(let j=0;j<c.family[0].length;j++)assert.deepEqual(product(c.a,c.family.map(row=>row[j])),j?c.b.map(()=>0):c.b);
   }
   if(c.parameter){
    const {critical,u,d}=c.parameter;
    for(const delta of [-3,-1,1,2]){
     const a=[[1,1],[1,1+delta]];
     // Scaled solution checks avoid rounding or relying on the generator's proof.
     assert.deepEqual(product(a,[u*delta-d,d]),c.b.map(v=>v*delta||0));
     assert.equal(det(a),delta);
    }
    assert.equal(det(c.a),0);
    const r=rank(c.a),s=rank(c.a.map((row,i)=>[...row,c.b[i]]));
    assert.equal(r,1);assert.equal(s,d===0?1:2);
    if(d===0)sci++;else si++;
    assert.ok(c.statement.includes(String(critical)));
   }
   for(const text of [c.statement,c.proof,c.extra||''])assert.doesNotMatch(text,/[\u0000-\u001f]/);
  }
 }
 assert.ok(si&&sci);
});
test('Las alternativas matemáticamente válidas reciben la misma puntuación',()=>{
 for(const c of generateMethods(94)){
  for(const o of c.options.filter(o=>o.valid)){
   const s={...createMethodState(),index:c.index},r=answerMethod(s,c,o.id);
   assert.equal(r.points,100);assert.equal(r.state.score,100);assert.equal(r.state.phase,'resolved');
  }
 }
 assert.equal(generateMethods(94).slice(0,3).every(c=>c.options.filter(o=>o.valid).length===2),true);
});
test('Reintentos, entradas ausentes, dobles pulsaciones y transiciones',()=>{
 const bank=generateMethods(54);let s=createMethodState();
 assert.equal(advanceMethod(s),s);
 assert.equal(answerMethod(s,bank[1],'gauss').ignored,true);
 assert.equal(answerMethod(s,bank[0],'missing').state,s);
 for(const c of bank){
  const wrong=c.options.filter(o=>!o.valid),good=c.options.find(o=>o.valid);
  const first=answerMethod(s,c,wrong[0].id);assert.equal(first.done,false);assert.equal(first.points,0);s=first.state;
  const result=answerMethod(s,c,c.index===0?wrong[1].id:good.id);s=result.state;
  assert.equal(s.attempts,2);assert.equal(result.points,c.index===0?0:50);
  assert.equal(answerMethod(s,c,good.id).state,s);
  s=advanceMethod(s);
 }
 assert.equal(s.score,250);assert.equal(s.phase,'summary');assert.equal(s.results.length,6);assert.equal(advanceMethod(s),s);
 assert.equal(createMethodState().score,0);
});
test('Las pistas no consumen intentos ni se cuentan dos veces',()=>{
 const s=createMethodState(),h=hintMethod(s);assert.equal(s.hints.length,0);assert.deepEqual(h.hints,[0]);assert.equal(hintMethod(h),h);assert.equal(h.attempts,0);
 const c=generateMethods(1)[0],r=answerMethod(h,c,c.options.find(o=>o.valid).id).state;
 assert.equal(r.score,100);assert.equal(hintMethod(r),r);
});
test('Reproducibilidad, variación, mezcla de opciones y semillas inválidas',()=>{
 assert.deepEqual(generateMethods(10),generateMethods(10));assert.notDeepEqual(generateMethods(10),generateMethods(11));
 const positions=new Set(Array.from({length:100},(_,s)=>generateMethods(s)[0].options.findIndex(o=>o.recommended)));assert.equal(positions.size,4);
 for(const seed of [-1,2**32,NaN,Infinity,1.5,'4'])assert.throws(()=>generateMethods(seed),RangeError);
 assert.equal(generateMethods(0xffffffff).length,6);
 assert.equal(matrixTex([[1,2],[3,4]]),String.raw`\begin{pmatrix}1&2\\3&4\end{pmatrix}`);
});
test('La reducción del caso 4x4 produce la triangular indicada sin cambiar B',()=>{
 for(let seed=0;seed<100;seed++){
  const c=generateMethods(seed)[1],rows=c.a.map((r,i)=>[...r,c.b[i]]);
  for(const [target,source] of [[3,0],[1,0],[2,1],[3,2]])rows[target]=rows[target].map((v,j)=>v-rows[source][j]);
  assert.deepEqual(rows.map(r=>r.slice(0,-1)),c.upper);
  assert.deepEqual(rows.map(r=>r.at(-1)),product(c.upper,c.solution));
 }
});

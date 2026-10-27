import { expectedCatalog } from "./helpers/catalog-expectations.mjs";
import test from 'node:test';
import assert from 'node:assert/strict';
import {questionsForScope,cardsForScope} from '../content/activities/catalog.js';
import {systemReviewIds} from '../content/activities/review-t05.js';
const gcd=(a,b)=>b?gcd(b,a%b):a<0n?-a:a;
const rat=(n,d=1n)=>{n=BigInt(n);d=BigInt(d);if(d<0n){n=-n;d=-d;}const g=gcd(n,d);return [n/g,d/g];};
const add=(a,b)=>rat(a[0]*b[1]+b[0]*a[1],a[1]*b[1]);
const mul=(a,b)=>rat(a[0]*b[0],a[1]*b[1]);
const from=f=>rat(f.numerator,f.denominator);
const det=a=>a.length===1?a[0][0]:a[0].reduce((sum,v,j)=>sum+(-1)**j*v*det(a.slice(1).map(r=>r.filter((_,k)=>k!==j))),0);
const combinations=(n,k)=>Array.from({length:1<<n},(_,mask)=>Array.from({length:n},(_,i)=>i).filter(i=>mask&(1<<i))).filter(a=>a.length===k);
function rank(a){for(let k=Math.min(a.length,a[0].length);k>0;k--)for(const r of combinations(a.length,k))for(const c of combinations(a[0].length,k))if(det(r.map(i=>c.map(j=>a[i][j])))!==0)return k;return 0;}



const dot=(row,x)=>row.reduce((s,v,j)=>add(s,mul(rat(v),x[j])),rat(0));
const sub=(a,b)=>add(a,[-b[0],b[1]]);
const div=(a,b)=>rat(a[0]*b[1],a[1]*b[0]);
const eq=(a,n)=>a[0]===BigInt(n)*a[1];
function product(a,x,b){a.forEach((row,i)=>assert.deepEqual(dot(row,x),b[i]));}
test('repaso sistemas: once referencias, cobertura 11/11 y bancos sin duplicación',()=>{
 const bank=questionsForScope('t05'),review=questionsForScope('review-t05');
 assert.equal(review.length,11);assert.equal(new Set(systemReviewIds).size,11);
 assert.equal(bank.length,66);assert.equal(new Set(bank.map(q=>q.prompt)).size,66);assert.equal(cardsForScope('t05').length,66);
 assert.equal(questionsForScope('all-course').length,expectedCatalog.questions);assert.equal(cardsForScope().length,expectedCatalog.cards);
 review.forEach((q,i)=>{assert.ok(q&&bank.includes(q));assert.equal(q.lessonId,'t05-e'+String(i+1).padStart(2,'0'));assert.ok(q.hint&&q.explanation&&q.source);assert.equal(q.options.filter(o=>o.id===q.correct).length,1);});
 for(let i=1;i<=11;i++){const id='t05-e'+String(i).padStart(2,'0');assert.equal(questionsForScope(id).length,6);assert.equal(cardsForScope(id).length,6);}
});
test('repaso sistemas: entradas, tres métodos, igualdad exacta e imposibilidad entera',()=>{
 const A=[[1,1],[8,5]],adj=[[5,-1],[-8,1]],B=[90,600];
 assert.equal(det(A),-3);assert.equal(rank(A),2);assert.equal(rank(A.map((r,i)=>[...r,B[i]])),2);
 for(let i=0;i<2;i++)for(let j=0;j<2;j++)assert.equal(A[i].reduce((s,v,k)=>s+v*adj[k][j],0),i===j?-3:0);
 assert.deepEqual(B.map((b,i)=>i===0?b:b-8*B[0]),[90,-120]);
 const deltas=[det([[90,1],[600,5]]),det([[1,90],[8,600]])];assert.deepEqual(deltas,[-150,-120]);
 product(A,[rat(50),rat(40)],B.map(x=>rat(x)));
 for(const total of [600,601]){
  const b=[90,total],x=adj.map(row=>rat(row.reduce((s,v,j)=>s+v*b[j],0),-3));
  product(A,x,b.map(v=>rat(v)));assert.equal(x.every(v=>v[1]===1n),total===600);
  if(total===601)assert.deepEqual(x,[rat(151,3),rat(119,3)]);
 }
});
test('repaso sistemas: familia rectangular completa, seis inventarios y fila incompatible',()=>{
 const a=[[1,1,1],[2,1,3]],b=[12,22],direction=[-2,1,1],base=[10,2,0];
 assert.equal(rank(a),2);product(a,base.map(v=>rat(v)),b.map(v=>rat(v)));product(a,direction.map(v=>rat(v)),[rat(0),rat(0)]);
 assert.equal(direction[2],1); // One independent direction and n-r=1 spans every solution.
 const feasible=[];
 for(let t=-30;t<=30;t++){const x=base.map((v,j)=>v+t*direction[j]);product(a,x.map(v=>rat(v)),b.map(v=>rat(v)));if(x.every(v=>v>=0))feasible.push(x);}
 assert.deepEqual(feasible,[[10,2,0],[8,3,1],[6,4,2],[4,5,3],[2,6,4],[0,7,5]]);
 // Independent enumeration in the context rules out missed integer solutions.
 const enumerated=[];for(let x=0;x<=12;x++)for(let y=0;y<=12;y++)for(let z=0;z<=12;z++)if(x+y+z===12&&2*x+y+3*z===22)enumerated.push([x,y,z]);
 assert.deepEqual(enumerated.reverse(),feasible);
 const a3=[...a,[3,2,4]];assert.equal(rank(a3),2);
 for(const last of [34,35])assert.equal(rank(a3.map((r,i)=>[...r,[12,22,last][i]])),last===34?2:3);
});
test('repaso sistemas: dos discusiones, 287 parámetros racionales y fórmulas verificadas',()=>{
 for(let p=-20;p<=20;p++)for(let q=1;q<=7;q++){
  const l=rat(p,q),a=[[q,q,q],[q,p,q],[q,q,p]],b=[3*q,p+2*q,4*q],b2=[3*q,p+2*q,p+2*q];
  assert.equal(det(a),q*(p-q)**2);
  if(!eq(l,1)){
   assert.equal(rank(a),3);const u=div(rat(1),sub(l,rat(1)));
   product(a,[sub(rat(2),u),rat(1),u],b.map(v=>rat(v)));
   product(a,[rat(1),rat(1),rat(1)],b2.map(v=>rat(v)));
  }else{
   assert.equal(rank(a),1);assert.equal(rank(a.map((r,i)=>[...r,b[i]])),2);assert.equal(rank(a.map((r,i)=>[...r,b2[i]])),1);
   for(let s=-3;s<=3;s++)for(let t=-3;t<=3;t++)product(a,[rat(3-s-t),rat(s),rat(t)],b2.map(v=>rat(v)));
  }
 }
});
test('repaso sistemas: cambios homogéneos, indicador y restricciones finales',()=>{
 const a=[[1,1,1],[2,-1,1]],d=[-2,-1,3];assert.equal(rank(a),2);product(a,d.map(v=>rat(v)),[rat(0),rat(0)]);
 for(let k=-40;k<=80;k++){
  const s=rat(k,5),changes=d.map(v=>mul(rat(v),s)),final=[12,9,6].map((v,i)=>add(rat(v),changes[i]));
  product(a,changes,[rat(0),rat(0)]);product(a,final,[rat(27),rat(21)]);
  assert.equal(final.every(v=>v[0]>=0n),k>=-10&&k<=30);assert.equal(final.every(v=>v[1]===1n),k%5===0);
 }
 assert.deepEqual([12,9,6].map((v,i)=>v+2*d[i]),[8,7,12]);
});



import { expectedCatalog } from "./helpers/catalog-expectations.mjs";
import test from 'node:test';
import assert from 'node:assert/strict';
import {parameterFamilies,parameterSystemDetails,generatedParameterSample} from '../content/models/parameter-systems.js';
import {questionsForScope,cardsForScope} from '../content/activities/catalog.js';
const gcd=(a,b)=>b?gcd(b,a%b):a<0n?-a:a;
const rat=(n,d=1n)=>{n=BigInt(n);d=BigInt(d);if(d<0n){n=-n;d=-d;}const g=gcd(n,d);return [n/g,d/g];};
const add=(a,b)=>rat(a[0]*b[1]+b[0]*a[1],a[1]*b[1]);
const mul=(a,b)=>rat(a[0]*b[0],a[1]*b[1]);
const from=f=>rat(f.numerator,f.denominator);
const det=a=>a.length===1?a[0][0]:a[0].reduce((sum,v,j)=>sum+(-1)**j*v*det(a.slice(1).map(r=>r.filter((_,k)=>k!==j))),0);
const combinations=(n,k)=>Array.from({length:1<<n},(_,mask)=>Array.from({length:n},(_,i)=>i).filter(i=>mask&(1<<i))).filter(a=>a.length===k);
function rank(a){for(let k=Math.min(a.length,a[0].length);k>0;k--)for(const r of combinations(a.length,k))for(const c of combinations(a[0].length,k))if(det(r.map(i=>c.map(j=>a[i][j])))!==0)return k;return 0;}


const sub=(a,b)=>add(a,[-b[0],b[1]]), div=(a,b)=>rat(a[0]*b[1],a[1]*b[0]);
const eq=(a,n)=>a[0]===BigInt(n)*a[1];
function reference(id,l,t=rat(0),s=rat(0)){
 const one=rat(1),zero=rat(0);
 switch(id){
 case 'symmetric':return eq(l,-1)?null:eq(l,1)?[sub(rat(2),t),t]:[div(rat(2),add(l,one)),div(rat(2),add(l,one))];
 case 'cancellation':return eq(l,1)?[sub(one,t),t]:[zero,one];
 case 'contradiction':return eq(l,1)?null:[div(sub(l,rat(2)),sub(l,one)),div(one,sub(l,one))];
 case 'homogeneous':return eq(l,1)?[mul(rat(-1),t),t]:eq(l,-1)?[t,t]:[zero,zero];
 case 'rectangular':return eq(l,1)?[sub(sub(one,t),s),t,s]:[sub(one,t),t,zero];
 case 'three':return eq(l,1)?[sub(sub(one,t),s),t,s]:[zero,zero,one];
 }
}
function product(rows,x){for(const row of rows){let sum=rat(0);x.forEach((v,j)=>sum=add(sum,mul(rat(row[j]),v)));assert.deepEqual(sum,rat(row.at(-1)));}}
function verify(m){
 const f=parameterFamilies[m.id],g=m.gauss,a=m.scaled.map(row=>row.slice(0,-1)),r=rank(a),s=rank(m.scaled),matches=f.cases.filter(c=>c.when(m.value));
 assert.equal(matches.length,1);const c=matches[0];
 assert.deepEqual([g.r,g.s,g.kind],[r,s,r!==s?'SI':r===g.n?'SCD':'SCI']);
 assert.deepEqual([c.r,c.s,c.kind],[r,s,g.kind]);assert.equal(f.cases[m.caseIndex],c);
 assert.deepEqual(m.rows,m.order.map((j,i)=>m.scaled[j].map(v=>v*m.signs[i])));
 assert.equal(new Set(m.order).size,m.rows.length);assert.ok(m.signs.every(s=>s===1||s===-1));
 if(a.length===g.n)assert.deepEqual(from(m.det),rat(det(a),m.scale**g.n));else assert.equal(m.det,null);
 if(g.kind==='SI'){assert.equal(g.expressions,null);assert.equal(c.free,null);assert.deepEqual(g.backSteps,[]);return;}
 assert.equal(g.free.length,g.n-r);assert.equal(c.free,g.free.length);
 // Identity on free coordinates and n-r directions establishes a complete family.
 for(let k=0;k<=g.free.length;k++){
  const coeffs=g.expressions.map(e=>from(e[k]));
  for(const row of m.scaled){let sum=rat(0);coeffs.forEach((v,j)=>sum=add(sum,mul(rat(row[j]),v)));assert.deepEqual(sum,rat(k===0?row.at(-1):0));}
  g.free.forEach((j,i)=>assert.deepEqual(coeffs[j],rat(k===i+1?1:0)));
 }
 for(const v of [-3,0,2]){
  const params=[rat(v),rat(1-v)];
  const x=g.expressions.map(e=>e.reduce((sum,f,k)=>add(sum,mul(from(f),k?params[k-1]:rat(1))),rat(0)));
  product(m.scaled,x);assert.deepEqual(x,reference(m.id,rat(m.twice,2),...params));
 }
}
test('parámetros: 78 muestras exactas y 6000 variantes equivalentes reproducibles',()=>{
 for(const id of Object.keys(parameterFamilies)){
  for(let twice=-6;twice<=6;twice++)verify(parameterSystemDetails(id,twice));
  const seen=new Set();
  for(let i=0;i<1000;i++){const seed=Math.imul(i,2654435761)>>>0,m=generatedParameterSample(seed,id);seen.add(m.twice);verify(m);assert.deepEqual(m,generatedParameterSample(seed,id));}
  assert.equal(seen.size,13);
 }
});
test('parámetros: 1722 valores racionales externos, particiones y fórmulas independientes',()=>{
 for(const [id,f]of Object.entries(parameterFamilies))for(let p=-20;p<=20;p++)for(let q=1;q<=7;q++){
  const l=rat(p,q),rows=f.rows(p/q).map(row=>row.map(v=>Math.round(v*q))),n=rows[0].length-1,r=rank(rows.map(row=>row.slice(0,-1))),s=rank(rows),matches=f.cases.filter(c=>c.when(p/q));
  assert.equal(matches.length,1);const c=matches[0];assert.deepEqual([c.r,c.s,c.kind],[r,s,r!==s?'SI':r===n?'SCD':'SCI']);
  for(const t of [-2,0,3]){const x=reference(id,l,rat(t),rat(2-t));if(x)product(rows,x);else assert.equal(r<s,true);}
  if(r===s)assert.equal(c.free,n-r);
 }
});
test('parámetros: restricciones contextuales de la mezcla y soluciones algebraicas',()=>{
 for(let p=-20;p<=40;p++)for(let q=1;q<=5;q++){
  const l=rat(p,q);if(eq(l,1))continue;
  const y=div(rat(2),sub(l,rat(1))),x=sub(rat(4),y);
  assert.deepEqual(add(x,y),rat(4));assert.deepEqual(add(x,mul(l,y)),rat(6));
  assert.equal(x[0]>=0n&&y[0]>=0n,p/q>=1.5);
  assert.equal(x[0]>0n&&y[0]>0n,p/q>1.5);
 }
 assert.equal(rank([[1,1,4],[1,1,6]]),2);assert.equal(rank([[1,1],[1,1]]),1);
});
test('parámetros: entradas acotadas y matrices independientes',()=>{
 for(const id of ['absent','__proto__','toString',null])assert.throws(()=>parameterSystemDetails(id));
 for(const twice of [-7,7,.5,NaN,Infinity,'2',null])assert.throws(()=>parameterSystemDetails('symmetric',twice));
 for(const seed of [-1,4294967296,.5,NaN,'1',null])assert.throws(()=>generatedParameterSample(seed));
 const m=parameterSystemDetails('symmetric',1,0),original=structuredClone(m.original),scaled=structuredClone(m.scaled);
 m.rows[0][0]=999;assert.deepEqual(m.original,original);assert.deepEqual(m.scaled,scaled);
 m.original[0][0]=123;assert.deepEqual(parameterFamilies.symmetric.rows(.5),original);
 verify(generatedParameterSample(4294967295,'three'));
});
test('parámetros: seis preguntas y tarjetas, tema5 66/66 y catálogo 318/301',()=>{
 const q=questionsForScope('t05-e11');assert.equal(q.length,6);assert.equal(cardsForScope('t05-e11').length,6);
 for(const item of q){assert.equal(new Set(item.options.map(o=>o.text)).size,4);assert.equal(item.options.filter(o=>o.id===item.correct).length,1);assert.ok(item.hint&&item.explanation&&item.source);}
 assert.equal(questionsForScope('t05').length,66);assert.equal(cardsForScope('t05').length,66);
 assert.equal(questionsForScope('all-course').length,expectedCatalog.questions);assert.equal(cardsForScope().length,expectedCatalog.cards);
 assert.equal(new Set(questionsForScope('all-course').map(q=>q.id)).size,expectedCatalog.questions);assert.equal(new Set(cardsForScope().map(c=>c.id)).size, expectedCatalog.cards);
});




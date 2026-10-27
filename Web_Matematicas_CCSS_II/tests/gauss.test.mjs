import { expectedCatalog } from "./helpers/catalog-expectations.mjs";
import test from 'node:test';
import assert from 'node:assert/strict';
import {gaussDetails,gaussPresets,generatedGauss,affineTex} from '../content/models/gauss.js';
import {questionsForScope,cardsForScope} from '../content/activities/catalog.js';
const gcd=(a,b)=>b?gcd(b,a%b):a<0n?-a:a;
const rat=(n,d=1n)=>{n=BigInt(n);d=BigInt(d);if(d<0n){n=-n;d=-d;}const g=gcd(n,d);return [n/g,d/g];};
const add=(a,b)=>rat(a[0]*b[1]+b[0]*a[1],a[1]*b[1]);
const mul=(a,b)=>rat(a[0]*b[0],a[1]*b[1]);
const from=f=>rat(f.numerator,f.denominator);
const det=a=>a.length===1?a[0][0]:a[0].reduce((sum,v,j)=>sum+(-1)**j*v*det(a.slice(1).map(r=>r.filter((_,k)=>k!==j))),0);
const combinations=(n,k)=>Array.from({length:1<<n},(_,mask)=>Array.from({length:n},(_,i)=>i).filter(i=>mask&(1<<i))).filter(a=>a.length===k);
function rank(a){for(let k=Math.min(a.length,a[0].length);k>0;k--)for(const r of combinations(a.length,k))for(const c of combinations(a[0].length,k))if(det(r.map(i=>c.map(j=>a[i][j])))!==0)return k;return 0;}
function verify(rows){
 const copy=structuredClone(rows),m=gaussDetails(rows),r=rank(rows.map(a=>a.slice(0,-1))),s=rank(rows);
 assert.deepEqual(rows,copy);assert.equal(m.r,r);assert.equal(m.s,s);assert.equal(m.kind,r<s?'SI':r===m.n?'SCD':'SCI');
 let previous=rows.map(row=>row.map(v=>rat(v)));
 for(const step of m.echelon.steps){
  const next=structuredClone(previous),i=step.target-1,j=step.source-1;
  if(step.type==='swap')[next[i],next[j]]=[next[j],next[i]];
  else if(step.type==='scale'){assert.notEqual(step.factor.numerator,0);next[i]=next[i].map(v=>mul(v,from(step.factor)));}
  else next[i]=next[i].map((v,k)=>add(v,mul(from(step.factor),previous[j][k])));
  assert.deepEqual(step.matrix.map(row=>row.map(from)),next);previous=next;
 }
 assert.deepEqual(m.echelon.matrix.map(row=>row.map(from)),previous);
 let last=-1;
 for(const row of previous){
  const pivot=row.findIndex(v=>v[0]!==0n);
  if(pivot<0){last=rows[0].length;continue;}
  assert.ok(pivot>last);last=pivot;assert.deepEqual(row[pivot],rat(1));
 }
 if(m.kind==='SI'){assert.equal(m.expressions,null);assert.equal(m.checks,null);assert.equal(m.backSteps.length,0);return m;}
 assert.equal(m.free.length,m.n-r);assert.equal(m.backSteps.length,r);
 for(let i=0;i<rows.length;i++)for(let k=0;k<=m.free.length;k++){
  let total=rat(0);
  for(let j=0;j<m.n;j++)total=add(total,mul(rat(rows[i][j]),from(m.expressions[j][k])));
  assert.deepEqual(total,rat(k===0?rows[i].at(-1):0));
  assert.deepEqual(from(m.checks[i][k]),total);
 }
 for(let k=0;k<m.free.length;k++)assert.deepEqual(m.expressions[m.free[k]].map(from),Array.from({length:m.free.length+1},(_,j)=>rat(j===k+1?1:0)));
 return m;
}
test('Gauss: 729 sistemas exhaustivos con rangos independientes, pasos y soluciones exactas',()=>{
 for(let code=0;code<729;code++){let value=code;const a=Array.from({length:2},()=>Array.from({length:3},()=>{const v=value%3-1;value=Math.floor(value/3);return v;}));verify(a);}
});
test('Gauss: 4.000 variantes rectangulares reproducibles y comprobación afín exacta',()=>{
 const kinds=new Set();
 for(const rows of [2,3])for(const cols of [2,3])for(let seed=0;seed<1000;seed++){
  const a=generatedGauss(seed,rows,cols);assert.deepEqual(a,generatedGauss(seed,rows,cols));assert.ok(a.flat().every(v=>Number.isInteger(v)&&Math.abs(v)<=9));kinds.add(verify(a).kind);
 }
 assert.deepEqual([...kinds].sort(),['SCD','SCI','SI']);
});
test('Gauss: pivotes cero, columna libre inicial, nula, fracciones y ejemplos',()=>{
 for(const p of Object.values(gaussPresets))verify(p.rows);
 assert.deepEqual(gaussDetails(gaussPresets.unique.rows).expressions.map(e=>affineTex(e)),['1','2','3']);
 assert.deepEqual(gaussDetails(gaussPresets.fractional.rows).expressions.map(e=>affineTex(e)),['\\frac{2}{3}','-\\frac{1}{3}']);
 assert.equal(gaussDetails(gaussPresets.swap.rows).echelon.steps[0].type,'swap');
 assert.deepEqual(gaussDetails(gaussPresets.skipped.rows).expressions.map(affineTex),['t_{1}','2-t_{2}','t_{2}']);
 assert.deepEqual(gaussDetails(gaussPresets.zero.rows).expressions.map(affineTex),['t_{1}','t_{2}']);
 assert.deepEqual(gaussDetails(gaussPresets.wide.rows).expressions.map(affineTex),['2-t_{1}','1+t_{1}','t_{1}']);
 assert.equal(verify([[1,0,1],[0,1,2],[0,0,0]]).kind,'SCD');
 assert.equal(verify([[0,0,2],[0,0,0]]).kind,'SI');
 assert.equal(verify([[0,0,0,0],[0,0,0,0],[0,0,0,0]]).free.length,3);
 // Context example: row subtraction produces [0,1,5]; original B=23 is outside editor bounds.
 assert.deepEqual([2,3,23].map((v,j)=>v-2*[1,1,9][j]),[0,1,5]);
 assert.equal(4+5,9);assert.equal(2*4+3*5,23);
});
test('Gauss: rechazos, copias independientes y límite de entrada',()=>{
 for(const a of [[],[[1,2]],[[1,2,3],[1,2]],[[1,2,10],[1,2,3]],[[1,2,0.5],[1,2,3]],[[1,2,NaN],[1,2,3]],[[1,2,3,4,5],[1,2,3,4,5]]])assert.throws(()=>gaussDetails(a));
 for(const size of [0,1,4,2.5]){assert.throws(()=>generatedGauss(1,size,2));assert.throws(()=>generatedGauss(1,2,size));}
 const a=structuredClone(gaussPresets.unique.rows),m=gaussDetails(a);m.rows[0][0]=9;assert.equal(a[0][0],1);
 for(const v of [-9,9])verify([[v,1,v],[0,v,1]]);
});
test('Gauss: seis preguntas y tarjetas, tema5 66/66 y catálogo 318/301',()=>{
 const q=questionsForScope('t05-e08'),c=cardsForScope('t05-e08');assert.equal(q.length,6);assert.equal(c.length,6);
 for(const question of q){assert.equal(question.options.length,4);assert.equal(new Set(question.options.map(o=>o.text)).size,4);assert.ok(question.options.some(o=>o.id===question.correct));assert.ok(question.explanation&&question.hint&&question.source);}
 assert.equal(questionsForScope('t05').length,66);assert.equal(cardsForScope('t05').length,66);
 assert.equal(questionsForScope('all-course').length,expectedCatalog.questions);assert.equal(cardsForScope().length,expectedCatalog.cards);
 assert.equal(new Set(questionsForScope('all-course').map(q=>q.id)).size,expectedCatalog.questions);assert.equal(new Set(cardsForScope().map(c=>c.id)).size, expectedCatalog.cards);
});




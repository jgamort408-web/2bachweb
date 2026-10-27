import { expectedCatalog } from "./helpers/catalog-expectations.mjs";
import test from 'node:test';
import assert from 'node:assert/strict';
import {homogeneousPresets,homogeneousDetails,generatedHomogeneous} from '../content/models/homogeneous-systems.js';
import {fraction} from '../content/models/matrix-inverse.js';
import {questionsForScope,cardsForScope} from '../content/activities/catalog.js';
const gcd=(a,b)=>b?gcd(b,a%b):a<0n?-a:a;
const rat=(n,d=1n)=>{n=BigInt(n);d=BigInt(d);if(d<0n){n=-n;d=-d;}const g=gcd(n,d);return [n/g,d/g];};
const add=(a,b)=>rat(a[0]*b[1]+b[0]*a[1],a[1]*b[1]);
const mul=(a,b)=>rat(a[0]*b[0],a[1]*b[1]);
const from=f=>rat(f.numerator,f.denominator);
const det=a=>a.length===1?a[0][0]:a[0].reduce((sum,v,j)=>sum+(-1)**j*v*det(a.slice(1).map(r=>r.filter((_,k)=>k!==j))),0);
const combinations=(n,k)=>Array.from({length:1<<n},(_,mask)=>Array.from({length:n},(_,i)=>i).filter(i=>mask&(1<<i))).filter(a=>a.length===k);
function rank(a){for(let k=Math.min(a.length,a[0].length);k>0;k--)for(const r of combinations(a.length,k))for(const c of combinations(a[0].length,k))if(det(r.map(i=>c.map(j=>a[i][j])))!==0)return k;return 0;}

function zeroProduct(a,x){for(const row of a){let total=rat(0);row.forEach((v,j)=>{total=add(total,mul(rat(v),from(x[j])));});assert.deepEqual(total,rat(0));}}
function verify(a){
 const before=structuredClone(a),m=homogeneousDetails(a),n=a[0].length,r=rank(a),k=n-r;
 assert.deepEqual(a,before);assert.equal(m.gauss.r,r);assert.equal(m.gauss.s,r);
 assert.equal(m.gauss.kind,k?'SCI':'SCD');assert.equal(m.gauss.free.length,k);assert.equal(m.trivial,true);
 assert.deepEqual(m.solution,Array.from({length:n},()=>fraction(0)));assert.ok(m.gauss.expressions.every(e=>e[0].numerator===0));
 assert.equal(m.det,a.length===n?det(a):null);
 for(const step of m.gauss.echelon.steps)assert.ok(step.matrix.every(row=>row.at(-1).numerator===0));
 assert.equal(m.directions.length,k);
 m.directions.forEach((v,j)=>{zeroProduct(a,v);m.gauss.free.forEach((index,t)=>assert.deepEqual(v[index],fraction(t===j?1:0)));});
 // Independent identity on free coordinates plus k=n-r proves the directions span the kernel.
 for(const base of [-5,-1,0,1,5]){
  const params=Array.from({length:k},(_,j)=>j%2?-base:base),v=homogeneousDetails(a,params);
  assert.deepEqual(v.parameters,params);assert.equal(v.trivial,params.every(t=>t===0));zeroProduct(a,v.solution);
  assert.deepEqual(v.product,Array.from({length:a.length},()=>fraction(0)));
  for(let i=0;i<n;i++){let sum=rat(0);for(let j=0;j<k;j++)sum=add(sum,mul(rat(params[j]),from(m.directions[j][i])));assert.deepEqual(from(v.solution[i]),sum);}
 }
 return m;
}
test('homogéneos: 1539 matrices exhaustivas, rangos, direcciones y familias completas',()=>{
 for(const [rows,cols]of [[2,2],[2,3],[3,2]])for(let code=0;code<3**(rows*cols);code++){
  let v=code;const a=Array.from({length:rows},()=>Array.from({length:cols},()=>{const x=v%3-1;v=Math.floor(v/3);return x;}));verify(a);
 }
});
test('homogéneos: 4000 variantes reproducibles en cuatro dimensiones y parámetros exactos',()=>{
 const kinds=new Set();let fractions=0;
 for(const rows of [2,3])for(const cols of [2,3])for(let seed=0;seed<1000;seed++){
  const a=generatedHomogeneous(seed,rows,cols);assert.deepEqual(a,generatedHomogeneous(seed,rows,cols));assert.ok(a.flat().every(x=>Number.isInteger(x)&&Math.abs(x)<=9));
  const m=verify(a);kinds.add(m.gauss.kind);if(m.directions.flat().some(f=>f.denominator>1))fractions++;
 }
 assert.deepEqual([...kinds].sort(),['SCD','SCI']);assert.ok(fractions>0);
});
test('homogéneos: ocho casos, solución no trivial con ceros y práctica presupuestaria',()=>{
 const free={unique:0,dependent:1,fractional:1,plane:2,tall:0,zero:3,three:0,skipped:2};
 for(const [key,p]of Object.entries(homogeneousPresets))assert.equal(verify(p.a).gauss.free.length,free[key]);
 assert.deepEqual(homogeneousDetails(homogeneousPresets.fractional.a,[1]).solution,[fraction(-1,2),fraction(1),fraction(1)]);
 assert.deepEqual(homogeneousDetails(homogeneousPresets.plane.a,[2,-3]).solution,[-(-1),2,-3].map(v=>fraction(v)));
 const z=homogeneousDetails(homogeneousPresets.zero.a,[0,0,1]);assert.equal(z.trivial,false);assert.deepEqual(z.solution,[fraction(0),fraction(0),fraction(1)]);
 for(let t=-30;t<=10;t++){
  const changes=[t,t,-2*t],final=[30+t,20+t,10-2*t];
  assert.equal(changes.reduce((a,b)=>a+b,0),0);assert.equal(changes[0]-changes[1],0);assert.equal(final.reduce((a,b)=>a+b,0),60);
  assert.equal(final.every(v=>v>=0),t>=-20&&t<=5);
 }assert.deepEqual([30+2,20+2,10-4],[32,22,6]);
});
test('homogéneos: límites de matriz/parámetros y copias independientes',()=>{
 for(const a of [null,[],[[1]],[[1,2],[3]],[[1,10],[0,1]],[[1,NaN],[0,1]],[[1,.5],[0,1]],[[1,2,3,4],[0,1,2,3]]])assert.throws(()=>homogeneousDetails(a));
 for(const p of [null,[],[1,2],[6],[-6],[.5],[NaN]])assert.throws(()=>homogeneousDetails(homogeneousPresets.dependent.a,p));
 assert.throws(()=>homogeneousDetails(homogeneousPresets.unique.a,[1]));
 for(const size of [0,1,4,2.5]){assert.throws(()=>generatedHomogeneous(1,size,2));assert.throws(()=>generatedHomogeneous(1,2,size));}
 const original=homogeneousPresets.dependent.a,params=[2],m=homogeneousDetails(original,params);m.a[0][0]=9;m.parameters[0]=5;m.directions[0][0].numerator=99;
 assert.equal(original[0][0],1);assert.equal(params[0],2);assert.notEqual(m.gauss.expressions[0][1].numerator,99);
 for(const edge of [-9,9])verify([[edge,1],[0,edge]]);
});
test('homogéneos: seis preguntas y tarjetas, tema5 66/66 y catálogo 318/301',()=>{
 const q=questionsForScope('t05-e10');assert.equal(q.length,6);assert.equal(cardsForScope('t05-e10').length,6);
 for(const item of q){assert.equal(new Set(item.options.map(o=>o.text)).size,4);assert.equal(item.options.filter(o=>o.id===item.correct).length,1);assert.ok(item.hint&&item.explanation&&item.source);}
 assert.equal(questionsForScope('t05').length,66);assert.equal(cardsForScope('t05').length,66);
 assert.equal(questionsForScope('all-course').length,expectedCatalog.questions);assert.equal(cardsForScope().length,expectedCatalog.cards);
 assert.equal(new Set(questionsForScope('all-course').map(q=>q.id)).size,expectedCatalog.questions);assert.equal(new Set(cardsForScope().map(c=>c.id)).size, expectedCatalog.cards);
});




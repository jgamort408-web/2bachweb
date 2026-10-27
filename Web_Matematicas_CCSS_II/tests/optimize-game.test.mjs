import test from 'node:test';
import assert from 'node:assert/strict';
import {generateStories,generateOptimizeSession,valueAt,admissible} from '../widgets/games/t02-c-optimiza/generator.js';

test('1000 sesiones: beneficio con frontera, óptimo interior y pérdidas',()=>{
 const situations=new Set();
 for(let seed=0;seed<1000;seed++){
  const [s]=generateStories(seed),p=s.params;
  assert.deepEqual(generateStories(seed),generateStories(seed));
  const vertex=(p.price-p.unitCost)/2,optimal=Math.min(vertex,p.capacity);
  assert.deepEqual(s.optimum,[optimal]);assert.equal(s.best,optimal*(p.price-optimal)-(p.unitCost*optimal+p.fixed));
  assert.ok(p.price-p.capacity>0);assert.equal(admissible(s,-1),false);assert.equal(admissible(s,p.capacity+.1),false);
  for(let i=0;i<=100;i++){const q=p.capacity*i/100;assert.ok(valueAt(s,q)<=s.best+1e-9);}
  assert.equal(valueAt(s,0),-p.fixed);for(const q of s.candidates)assert.ok(admissible(s,q));
  situations.add((vertex>p.capacity?'boundary':'interior')+':'+(s.best<0?'loss':'profit'));
 }
 assert.equal(situations.size,4);
});
test('1000 sesiones: coste medio y recinto con extremos excluidos',()=>{
 for(let seed=0;seed<1000;seed++){
  const [,avg,fence]=generateStories(seed),F=avg.params.fixed,L=fence.params.length;
  const q=Math.sqrt(F);assert.equal(avg.optimum[0],q);assert.equal(avg.best,2*q);
  for(const factor of [.01,.25,.75,1,1.5,5,100]){const x=q*factor;const total=x*x+F;assert.equal(valueAt(avg,x),total/x);assert.ok(valueAt(avg,x)>=avg.best-1e-9);}
  assert.ok(!admissible(avg,0)&&!admissible(avg,-q));assert.ok(Number.isNaN(valueAt(avg,0)));
  const x=L/4,y=L-2*x;assert.equal(fence.best,x*y);assert.equal(2*x+y,L);
  for(let i=1;i<100;i++){const side=L/2*i/100;assert.ok(admissible(fence,side));assert.ok(valueAt(fence,side)<=fence.best+1e-9);}
  assert.ok(!admissible(fence,0)&&!admissible(fence,L/2));assert.equal(valueAt(fence,0),0); // Extensión algebraica, no recinto admisible.
 }
});
test('1000 sesiones: ingreso discreto contrastado con todos los enteros',()=>{
 for(let seed=0;seed<1000;seed++){
  const s=generateStories(seed)[3],p=s.params;
  const values=Array.from({length:p.capacity+1},(_,q)=>q*(p.price-2*q));
  const best=Math.max(...values),opts=values.flatMap((v,q)=>v===best?[q]:[]);
  assert.equal(s.best,best);assert.deepEqual(s.optimum,opts);assert.equal(opts.length,2);
  const vertex=p.price/4;assert.equal(admissible(s,vertex),false);assert.equal(valueAt(s,vertex),best+.5);
  assert.ok(p.price-2*p.capacity>0);for(const q of s.candidates)assert.ok(admissible(s,q));
 }
});
test('200 bancos: 4000 decisiones, cinco pasos por historia y fórmulas conservadas',()=>{
 for(let seed=0;seed<200;seed++){
  const bank=generateOptimizeSession(seed);assert.equal(bank.length,20);assert.equal(new Set(bank.map(q=>q.id)).size,20);
  for(let i=0;i<4;i++)assert.deepEqual(bank.slice(5*i,5*i+5).map(q=>q.stage),[1,2,3,4,5]);
  for(const q of bank){assert.equal(q.options.length,4);assert.equal(new Set(q.options.map(o=>o.text)).size,4);assert.equal(q.options.filter(o=>o.id===q.correct).length,1);assert.ok(q.hint&&q.explanation&&q.options.every(o=>o.feedback));assert.doesNotMatch(JSON.stringify(q),/NaN|Infinity|undefined/);}
  assert.ok(bank[1].options[0].text.includes(String.raw`\le`));assert.ok(bank[5].options[0].text.includes(String.raw`\frac`));assert.ok(bank[16].options[0].text.includes(String.raw`\ldots`));
 }
});

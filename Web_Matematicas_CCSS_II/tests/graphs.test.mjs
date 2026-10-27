import { expectedCatalog } from "./helpers/catalog-expectations.mjs";

import test from 'node:test';
import assert from 'node:assert/strict';
import {graphPresets,graphDetails,toggleEdge,convertGraph,generatedGraph,validateGraph} from '../content/models/graphs.js';
import {questionsForScope,cardsForScope} from '../content/activities/catalog.js';
// Conteo independiente: distribución de llegadas tras cada paso; no usa potencias ni DFS.
function arrivals(a,start,k){let counts=a.map((_,i)=>Number(i===start));for(let step=0;step<k;step++){const next=a.map(()=>0);for(let i=0;i<a.length;i++)for(let j=0;j<a.length;j++)if(a[i][j])next[j]+=counts[i];counts=next;}return counts;}
function check(a,directed){
 const copy=structuredClone(a),n=a.length;
 for(let length=0;length<=4;length++)for(let from=0;from<n;from++){
  const ref=arrivals(a,from,length);
  for(let to=0;to<n;to++){
   const m=graphDetails(a,{directed,length,from,to});
   assert.deepEqual(m.power[from],ref);assert.equal(m.count,ref[to]);assert.equal(m.walks.length,m.count);
   assert.equal(new Set(m.walks.map(w=>w.join(','))).size,m.count);
   for(const w of m.walks){assert.equal(w.length,length+1);assert.equal(w[0],from);assert.equal(w.at(-1),to);for(let j=1;j<w.length;j++)assert.equal(a[w[j-1]][w[j]],1);}
   assert.equal(m.out.reduce((s,v)=>s+v,0),m.edges*(directed?1:2));
   assert.equal(m.incoming.reduce((s,v)=>s+v,0),m.out.reduce((s,v)=>s+v,0));
   if(!directed&&length===2)assert.equal(m.power[from][from],m.out[from]);
  }
 }
 assert.deepEqual(a,copy);
}
test('74 grafos no dirigidos exhaustivos, 64 dirigidos de orden 3 y 200 generados: recorridos frente a conteo independiente',()=>{
 for(const n of [2,3,4]){
  const pairs=[];for(let i=0;i<n;i++)for(let j=i+1;j<n;j++)pairs.push([i,j]);
  for(let mask=0;mask<2**pairs.length;mask++){const a=Array.from({length:n},()=>Array(n).fill(0));pairs.forEach(([i,j],bit)=>{a[i][j]=a[j][i]=(mask>>bit)&1;});check(a,false);}
 }
 for(let mask=0;mask<64;mask++){const a=Array.from({length:3},()=>Array(3).fill(0));let bit=0;for(let i=0;i<3;i++)for(let j=0;j<3;j++)if(i!==j)a[i][j]=(mask>>bit++)&1;check(a,true);}
 for(let seed=0;seed<200;seed++)check(generatedGraph(seed,4,true),true);
});
test('ejemplos, repeticiones, cero pasos, aislados y cero que no significa desconexión',()=>{
 const path=graphPresets.path.matrix,cycle=graphPresets.cycle.matrix,directed=graphPresets.directed.matrix;
 assert.deepEqual(graphDetails(path).power,[[1,0,1,0],[0,2,0,1],[1,0,2,0],[0,1,0,1]]);
 assert.deepEqual(graphDetails(path,{from:1,to:1}).walks,[[1,0,1],[1,2,1]]);
 assert.deepEqual(graphDetails(cycle,{from:0,to:2}).walks,[[0,1,2],[0,3,2]]);
 assert.equal(graphDetails(path,{to:3,length:2}).count,0);assert.equal(graphDetails(path,{to:3,length:3}).count,1);
 const isolated=graphPresets.isolated.matrix;
 for(let length=0;length<=4;length++)assert.equal(graphDetails(isolated,{from:3,to:3,length}).count,Number(length===0));
 assert.equal(graphDetails(directed,{directed:true,length:2}).count,0);assert.equal(graphDetails(directed,{directed:true,length:3}).count,1);
 assert.equal(graphDetails(directed,{directed:true,length:2}).out[0],1);
 assert.deepEqual(graphDetails(cycle).power,[[2,0,2,0],[0,2,0,2],[2,0,2,0],[0,2,0,2]]);
});
test('edición sin mutación, orientación, unión de arcos y generación reproducible',()=>{
 for(const directed of [false,true])for(const n of [2,3,4])for(let seed=0;seed<100;seed++){
  const a=generatedGraph(seed,n,directed),copy=structuredClone(a);assert.deepEqual(a,generatedGraph(seed,n,directed));assert.equal(validateGraph(a,directed),n);
  for(let i=0;i<n;i++)for(let j=0;j<n;j++)if(i!==j){const b=toggleEdge(a,i,j,directed);assert.equal(b[i][j],1-a[i][j]);assert.equal(b[j][i],directed?a[j][i]:b[i][j]);assert.deepEqual(toggleEdge(b,i,j,directed),a);}
  const undirected=convertGraph(a,false);undirected.forEach((r,i)=>r.forEach((v,j)=>assert.equal(v,Math.max(a[i][j],a[j][i]))));assert.deepEqual(convertGraph(a,true),a);assert.deepEqual(a,copy);
 }
});
test('rechazo de lazos, pesos, matrices inválidas, vértices y longitudes fuera de rango',()=>{
 for(const a of [[],[[0],[0,1]],[[NaN,0],[0,0]]])assert.throws(()=>validateGraph(a),TypeError);
 for(const a of [[[0]],[[0,1,0],[1,0,0]],[[1,0],[0,0]],[[0,2],[2,0]],[[0,1],[0,0]]])assert.throws(()=>validateGraph(a),RangeError);
 const a=[[0,1],[1,0]];
 for(const length of [-1,5,1.5,NaN])assert.throws(()=>graphDetails(a,{length}),RangeError);
 for(const from of [-1,2,.5])assert.throws(()=>graphDetails(a,{from}),RangeError);
 for(const to of [-1,2,.5])assert.throws(()=>graphDetails(a,{to}),RangeError);
 assert.throws(()=>toggleEdge(a,0,0),RangeError);assert.throws(()=>toggleEdge(a,0,2),RangeError);
 assert.throws(()=>validateGraph(a,'yes'),TypeError);assert.throws(()=>convertGraph(a,'yes'),TypeError);
 assert.throws(()=>generatedGraph(1,5),RangeError);assert.throws(()=>generatedGraph(1,3,1),RangeError);
});
test('seis preguntas y tarjetas; tema 4 con 72/72 y catálogo 318/301 sin IDs duplicados',()=>{
 const bank=questionsForScope('t04-e12');assert.equal(bank.length,6);assert.equal(cardsForScope('t04-e12').length,6);
 for(const q of bank){assert.equal(q.options.length,4);assert.equal(new Set(q.options.map(o=>o.text)).size,4);assert.equal(q.options.filter(o=>o.id===q.correct).length,1);assert.ok(q.hint&&q.explanation&&q.options.every(o=>o.feedback));}
 assert.equal(questionsForScope('t04').length,72);assert.equal(cardsForScope('t04').length,72);
 assert.equal(questionsForScope('all-course').length,expectedCatalog.questions);assert.equal(cardsForScope().length,expectedCatalog.cards);
 assert.equal(new Set(questionsForScope('all-course').map(q=>q.id)).size,expectedCatalog.questions);assert.equal(new Set(cardsForScope().map(q=>q.id)).size,expectedCatalog.cards);
});



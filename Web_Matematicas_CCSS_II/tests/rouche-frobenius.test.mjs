import { expectedCatalog } from "./helpers/catalog-expectations.mjs";
import test from 'node:test';
import assert from 'node:assert/strict';
import {rouchePresets,roucheDetails,parameterRows,generatedRoucheRows} from '../content/models/rouche-frobenius.js';
import {questionsForScope,cardsForScope} from '../content/activities/catalog.js';
function rank(matrix){
 const a=structuredClone(matrix);let row=0;
 for(let col=0;col<a[0].length&&row<a.length;col++){
  let p=row;while(p<a.length&&Math.abs(a[p][col])<1e-10)p++;
  if(p===a.length)continue;[a[p],a[row]]=[a[row],a[p]];
  const pivot=a[row][col];for(let j=col;j<a[0].length;j++)a[row][j]/=pivot;
  for(let i=row+1;i<a.length;i++){const factor=a[i][col];for(let j=col;j<a[0].length;j++)a[i][j]-=factor*a[row][j];}row++;
 }return row;
}
function verify(rows){
 const copy=structuredClone(rows),m=roucheDetails(rows),r=rank(rows.map(row=>row.slice(0,-1))),s=rank(rows);
 assert.equal(m.r,r);assert.equal(m.s,s);assert.equal(m.kind,r!==s?'SI':r===m.n?'SCD':'SCI');assert.equal(m.free,r!==s?null:m.n-r);
 assert.ok(m.r<=m.s&&m.s<=m.r+1);assert.deepEqual(rows,copy);
}
test('729 sistemas exhaustivos 2×2 y 2000 rectangulares/cuadrados frente a eliminación independiente',()=>{
 for(let code=0;code<729;code++){let n=code;const values=Array.from({length:6},()=>{const v=n%3-1;n=Math.floor(n/3);return v;});verify([values.slice(0,3),values.slice(3)]);}
 let state=42;const next=()=>{state=(Math.imul(state,1664525)+1013904223)>>>0;return (state>>>16)%19-9;};
 for(const rows of [2,3])for(const cols of [2,3])for(let i=0;i<500;i++)verify(Array.from({length:rows},()=>Array.from({length:cols+1},next)));
});
test('3000 variantes: tipo garantizado, límites, signos y reproducibilidad',()=>{
 for(const kind of ['SCD','SCI','SI'])for(let seed=0;seed<1000;seed++){
  const rows=generatedRoucheRows(seed,kind);assert.deepEqual(rows,generatedRoucheRows(seed,kind));assert.ok(rows.flat().every(v=>Math.abs(v)<=9));verify(rows);assert.equal(roucheDetails(rows).kind,kind);
 }
});
test('ejemplos, rangos cero, parámetro y práctica con dos libertades',()=>{
 const expected={unique:[2,2,'SCD',0],infinite:[1,1,'SCI',1],none:[1,2,'SI',null],wide:[2,2,'SCI',1],tall:[2,2,'SCD',0],zero:[0,0,'SCI',2]};
 for(const [key,p]of Object.entries(rouchePresets)){const m=roucheDetails(p.rows);assert.deepEqual([m.r,m.s,m.kind,m.free],expected[key]);}
 const impossible=roucheDetails([[0,0,1],[0,0,0]]);assert.deepEqual([impossible.r,impossible.s,impossible.kind,impossible.free],[0,1,'SI',null]);
 assert.equal(roucheDetails([[0,0,0,0],[0,0,0,0]]).free,3);
 for(let value=-3;value<=3;value++)assert.equal(roucheDetails(parameterRows(value)).kind,value===1?'SCI':value===-1?'SI':'SCD');
 for(const value of [-4,-2.5,-.5,0,.5,1.5,2,4]){const x=2/(value+1);assert.ok(Math.abs(value*x+x-2)<1e-12);}
 for(const c of [-9,0,5,6,7,9]){const m=roucheDetails([[1,1,1,3],[2,2,2,c]]);assert.equal(m.kind,c===6?'SCI':'SI');assert.equal(m.free,c===6?2:null);}
});
test('menores certificados y rechazo de datos inválidos',()=>{
 for(const p of Object.values(rouchePresets))for(const d of [roucheDetails(p.rows).coefficients,roucheDetails(p.rows).complete]){
  if(d.rank){assert.notEqual(d.witness.value,0);assert.equal(d.witness.rows.length,d.rank);}
  for(const l of d.levels.filter(l=>l.order>d.rank))assert.equal(l.nonzero,0);
  assert.equal(d.rank,d.echelon.rank);
 }
 for(const rows of [null,[],[[1,2]],[[1,1,0],[1,0]],[[1,1,10],[1,0,0]],[[1,1,0.5],[1,0,0]],[[1,1,NaN],[1,0,0]]])assert.throws(()=>roucheDetails(rows));
 for(const v of [-4,4,.5,NaN])assert.throws(()=>parameterRows(v));assert.throws(()=>generatedRoucheRows(1,'other'));
});
test('seis preguntas/tarjetas; t05 66/66 y catálogo 318/301 sin duplicados',()=>{
 const q=questionsForScope('t05-e06');assert.equal(q.length,6);assert.equal(cardsForScope('t05-e06').length,6);
 for(const item of q){assert.equal(new Set(item.options.map(o=>o.text)).size,4);assert.equal(item.options.filter(o=>o.id===item.correct).length,1);}
 assert.equal(questionsForScope('t05').length,66);assert.equal(cardsForScope('t05').length,66);
 assert.equal(questionsForScope('all-course').length,expectedCatalog.questions);assert.equal(cardsForScope().length,expectedCatalog.cards);
 assert.equal(new Set(questionsForScope('all-course').map(q=>q.id)).size,expectedCatalog.questions);assert.equal(new Set(cardsForScope().map(c=>c.id)).size, expectedCatalog.cards);
});




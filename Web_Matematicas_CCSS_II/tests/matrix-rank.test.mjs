import { expectedCatalog } from "./helpers/catalog-expectations.mjs";
import test from 'node:test';
import assert from 'node:assert/strict';
import {rankDetails,rowEchelon,rankPresets,generatedRankMatrix} from '../content/models/matrix-rank.js';
import {questionsForScope,cardsForScope} from '../content/activities/catalog.js';
const numeric=m=>m.map(r=>r.map(v=>v.numerator/v.denominator));
function gaussian(a){
 const m=a.map(r=>[...r]);let rank=0;
 for(let j=0;j<m[0].length&&rank<m.length;j++){
  let p=rank;for(let i=rank+1;i<m.length;i++)if(Math.abs(m[i][j])>Math.abs(m[p][j]))p=i;
  if(Math.abs(m[p][j])<1e-9)continue;[m[p],m[rank]]=[m[rank],m[p]];
  for(let i=rank+1;i<m.length;i++){const f=m[i][j]/m[rank][j];for(let k=j;k<m[0].length;k++)m[i][k]-=f*m[rank][k];}
  rank++;
 }
 return rank;
}
function det(a){
 let sum=0;const n=a.length;
 function visit(p){if(p.length===n){let inversions=0;for(let i=0;i<n;i++)for(let j=i+1;j<n;j++)if(p[i]>p[j])inversions++;sum+=(inversions%2?-1:1)*p.reduce((v,j,i)=>v*a[i][j],1);return;}for(let j=0;j<n;j++)if(!p.includes(j))visit([...p,j]);}
 visit([]);return sum===0?0:sum;
}
function verify(a){
 const original=structuredClone(a),m=rankDetails(a),expected=gaussian(a);
 assert.equal(m.rank,expected);assert.equal(m.echelon.rank,expected);
 for(const l of m.levels)for(const minor of l.minors){
  const selected=minor.rows.map(i=>minor.cols.map(j=>a[i-1][j-1]));assert.deepEqual(minor.matrix,selected);assert.equal(minor.value,det(selected));
  if(minor.value!==0)assert.ok(l.order<=m.rank);
 }
 assert.equal(m.witness!==null,m.rank>0);
 if(m.witness){assert.equal(m.witness.rows.length,m.rank);assert.notEqual(m.witness.value,0);}
 let before=a;
 for(const step of m.echelon.steps){
  const after=numeric(step.matrix),calculated=before.map(r=>[...r]),i=step.target-1,j=step.source-1;
  if(step.type==='swap')[calculated[i],calculated[j]]=[calculated[j],calculated[i]];
  else{const f=step.factor.numerator/step.factor.denominator;
   if(step.type==='scale'){assert.notEqual(f,0);calculated[i]=calculated[i].map(v=>v*f);}
   else calculated[i]=calculated[i].map((v,k)=>v+f*calculated[j][k]);
  }
  after.forEach((r,i)=>r.forEach((v,j)=>assert.ok(Math.abs(v-calculated[i][j])<1e-9)));assert.equal(gaussian(after),expected);before=after;
 }
 const end=numeric(m.echelon.matrix);assert.equal(end.filter(r=>r.some(v=>v!==0)).length,expected);
 m.echelon.pivots.forEach((p,i)=>{assert.equal(end[p.row-1][p.col-1],1);if(i)assert.ok(p.col>m.echelon.pivots[i-1].col);for(let r=p.row;r<end.length;r++)assert.equal(end[r][p.col-1],0);});
 assert.deepEqual(a,original);
}
test('2481 matrices: menores por Leibniz, rango por Gauss y cada paso exacto',()=>{
 for(let rows=1;rows<=3;rows++)for(let cols=1;cols<=4;cols++)for(let seed=0;seed<200;seed++)verify(generatedRankMatrix(seed,rows,cols));
 for(let a=-1;a<=1;a++)for(let b=-1;b<=1;b++)for(let c=-1;c<=1;c++)for(let d=-1;d<=1;d++)verify([[a,b],[c,d]]);
});
test('ejemplos, parámetro, práctica y compatibilidad por rangos',()=>{
 assert.equal(rankDetails([[0,0,0],[0,0,0]]).rank,0);assert.equal(rankDetails([[1,2],[3,4]]).rank,2);
 assert.equal(rankDetails(rankPresets.rectangular.matrix).rank,1);
 const d=rankDetails(rankPresets.dependent.matrix);assert.equal(d.rank,2);assert.deepEqual(d.witness.rows,[1,3]);assert.deepEqual(d.witness.cols,[1,2]);assert.equal(d.witness.value,1);
 assert.deepEqual(numeric(d.echelon.matrix),[[1,2,3],[0,1,1],[0,0,0]]);
 for(let t=-9;t<=9;t++){const p=[[1,1,1],[1,t,1],[1,1,t]];assert.equal(det(p),(t-1)**2);assert.equal(rankDetails(p).rank,t===1?1:3);}
 assert.equal(rankDetails([[1,2],[2,4]]).rank,1);assert.equal(rankDetails([[1,2,3],[2,4,6]]).rank,1);assert.equal(rankDetails([[1,2,3],[2,4,7]]).rank,2);
 assert.equal(rankDetails([[1,2],[0,1]]).rank,2);
 const q=rankDetails(rankPresets.augmented.matrix);assert.equal(q.rank,2);assert.equal(q.levels[2].minors.length,4);assert.equal(q.levels[2].nonzero,0);
});
test('casos de pivote desplazado, fracciones y menores no consecutivos',()=>{
 for(const a of [[[0,0,0,2]],[[0],[0],[-3]],[[0,1,0],[0,0,1],[0,0,0]],[[2,1],[1,1]]])verify(a);
 const m=rankDetails([[0,0,1],[0,0,0],[2,0,0]]);assert.equal(m.rank,2);assert.deepEqual(m.witness.rows,[1,3]);assert.deepEqual(m.witness.cols,[1,3]);assert.equal(m.witness.value,-2);
 const e=rowEchelon([[2,1],[1,1]]);assert.ok(e.steps.some(s=>s.matrix.flat().some(f=>f.denominator===2)));
 const a=[[1,2,3],[2,4,6]],at=a[0].map((_,j)=>a.map(r=>r[j]));assert.equal(rankDetails(a).rank,rankDetails(at).rank);
});
test('validación, límites, dimensiones y semillas',()=>{
 for(const a of [[],[[NaN]],[[1],[2,3]]])assert.throws(()=>rankDetails(a),TypeError);
 for(const a of [[[1],[2],[3],[4]],[[1,2,3,4,5]],[[.5]],[[10]]])assert.throws(()=>rankDetails(a),RangeError);
 for(const [r,c]of [[0,2],[4,2],[2,0],[2,5],[2.5,1]])assert.throws(()=>generatedRankMatrix(1,r,c),RangeError);
 for(const p of Object.values(rankPresets))assert.doesNotThrow(()=>rankDetails(p.matrix));
 for(let seed=0;seed<100;seed++){const a=generatedRankMatrix(seed,3,4);assert.deepEqual(a,generatedRankMatrix(seed,3,4));assert.ok(a.flat().every(v=>Number.isInteger(v)&&Math.abs(v)<=3));}
});
test('seis preguntas/tarjetas; t04 72/72, curso 318/301 e IDs únicos',()=>{
 const bank=questionsForScope('t04-e10');assert.equal(bank.length,6);assert.equal(cardsForScope('t04-e10').length,6);
 for(const q of bank){assert.equal(q.options.length,4);assert.equal(new Set(q.options.map(o=>o.text)).size,4);assert.ok(q.hint&&q.explanation&&q.options.some(o=>o.id===q.correct));}
 assert.equal(questionsForScope('t04').length,72);assert.equal(cardsForScope('t04').length,72);assert.equal(questionsForScope('all-course').length,expectedCatalog.questions);assert.equal(cardsForScope().length,expectedCatalog.cards);
 assert.equal(new Set(questionsForScope('all-course').map(q=>q.id)).size,expectedCatalog.questions);assert.equal(new Set(cardsForScope().map(q=>q.id)).size,expectedCatalog.cards);
});



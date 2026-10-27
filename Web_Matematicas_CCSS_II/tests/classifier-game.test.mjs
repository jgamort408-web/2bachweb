import { expectedCatalog } from "./helpers/catalog-expectations.mjs";
import test from 'node:test';
import assert from 'node:assert/strict';
import {generateClassifier,createClassifierState,answerClassifier,hintClassifier,advanceClassifier} from '../widgets/games/t05-a-clasificador-de-sistemas/generator.js';
import {lineSegment,classifierGraph} from '../widgets/games/t05-a-clasificador-de-sistemas/graph.js';
import {questionsForScope,cardsForScope} from '../content/activities/catalog.js';
const gcd=(a,b)=>b?gcd(b,a%b):a<0n?-a:a;
const rat=(n,d=1n)=>{n=BigInt(n);d=BigInt(d);if(d<0n){n=-n;d=-d;}const g=gcd(n,d);return [n/g,d/g];};
const add=(a,b)=>rat(a[0]*b[1]+b[0]*a[1],a[1]*b[1]);
const mul=(a,b)=>rat(a[0]*b[0],a[1]*b[1]);
const from=f=>rat(f.numerator,f.denominator);
const det=a=>a.length===1?a[0][0]:a[0].reduce((sum,v,j)=>sum+(-1)**j*v*det(a.slice(1).map(r=>r.filter((_,k)=>k!==j))),0);
const combinations=(n,k)=>Array.from({length:1<<n},(_,mask)=>Array.from({length:n},(_,i)=>i).filter(i=>mask&(1<<i))).filter(a=>a.length===k);
function rank(a){for(let k=Math.min(a.length,a[0].length);k>0;k--)for(const r of combinations(a.length,k))for(const c of combinations(a[0].length,k))if(det(r.map(i=>c.map(j=>a[i][j])))!==0)return k;return 0;}



test('clasificador: 1000 sesiones, 12000 retos y rangos mediante menores independientes',()=>{
 const varieties=new Set(),ranks=new Set();let verticals=0;
 for(let seed=0;seed<1000;seed++){
  const session=generateClassifier(seed);assert.deepEqual(session,generateClassifier(seed));assert.equal(session.length,12);assert.equal(new Set(session.map(r=>r.id)).size,12);
  for(const c of session){
   const r=rank(c.rows.map(row=>row.slice(0,-1))),s=rank(c.rows),n=c.rows[0].length-1;
   assert.deepEqual([c.r,c.s,c.n,c.kind],[r,s,n,r!==s?'SI':r===n?'SCD':'SCI']);
   assert.equal(new Set(c.options.map(o=>o.id)).size,3);assert.equal(c.options.filter(o=>o.id===c.kind).length,1);
   assert.ok(c.rows.flat().every(x=>Number.isInteger(x)&&Math.abs(x)<=9));assert.ok(c.explanation&&c.hint&&c.proof);assert.doesNotMatch(c.proof,/undefined|NaN/);
   varieties.add(c.mode+'-'+c.kind);ranks.add(r+'/'+s+'/'+n);
   if(c.mode==='echelon'){let pivot=-1;for(const row of c.rows){const next=row.findIndex(x=>x!==0);if(next!==-1){assert.ok(next>pivot);pivot=next;}}}
   if(c.mode==='graph'){
    if(c.rows.some(row=>row[1]===0))verticals++;
    for(const row of c.rows){const segment=lineSegment(row);assert.equal(segment.length,2);for(const [x,y] of segment){assert.ok(Math.abs(row[0]*x+row[1]*y-row[2])<1e-8);assert.ok(Math.abs(x)<=6+1e-8&&Math.abs(y)<=6+1e-8);}}
    const svg=classifierGraph(c.rows);assert.doesNotMatch(svg,/NaN|Infinity/);assert.equal((svg.match(/data-graph-line=/g)||[]).length,2);assert.match(svg,/role="img"/);
   }
  }
 }
 assert.equal(varieties.size,12);assert.ok(ranks.has('0/0/3')&&ranks.has('0/1/3')&&ranks.has('2/2/2'));assert.ok(verticals>0);
});
test('clasificador: geometría de verticales, horizontales, coincidencia y secantes',()=>{
 assert.deepEqual(lineSegment([1,0,2]),[[2,-6],[2,6]]);
 assert.deepEqual(lineSegment([0,1,-1]),[[-6,-1],[6,-1]]);
 assert.deepEqual(lineSegment([1,0,7]),[]);
 for(let seed=0;seed<200;seed++)for(const c of generateClassifier(seed).filter(c=>c.mode==='graph')){
  const [a,b]=c.rows,delta=a[0]*b[1]-a[1]*b[0];
  if(c.kind==='SCD'){assert.notEqual(delta,0);const x=(a[2]*b[1]-a[1]*b[2])/delta,y=(a[0]*b[2]-a[2]*b[0])/delta;assert.ok(Math.abs(x)<=2&&Math.abs(y)<=2);}
  else{assert.equal(delta,0);const augmentedMinors=[a[0]*b[2]-a[2]*b[0],a[1]*b[2]-a[2]*b[1]];assert.equal(augmentedMinors.every(v=>v===0),c.kind==='SCI');}
 }
});
test('clasificador: sesión perfecta, bloqueo de doble puntuación y resumen',()=>{
 const session=generateClassifier(11);let s=createClassifierState();
 for(const c of session){assert.equal(advanceClassifier(s),s);const result=answerClassifier(s,c,c.kind);assert.equal(result.correct,true);s=result.state;assert.equal(answerClassifier(s,c,c.kind).ignored,true);s=advanceClassifier(s);}
 assert.equal(s.phase,'summary');assert.equal(s.score,1200);assert.equal(s.results.length,12);assert.equal(advanceClassifier(s),s);
});
test('clasificador: pistas únicas, dos errores, reintento, entradas inválidas y sesión 1050',()=>{
 const session=generateClassifier(12);let s=createClassifierState();
 s=hintClassifier(s);assert.equal(hintClassifier(s),s);assert.equal(s.hints.length,1);
 assert.equal(answerClassifier(s,session[0],'absent').state,s);assert.equal(answerClassifier(s,session[1],session[1].kind).ignored,true);
 for(const c of session){
  const wrong=c.options.filter(o=>o.id!==c.kind);
  if(c.index<2){s=answerClassifier(s,c,wrong[0].id).state;assert.equal(s.score,c.index===0?0:50);assert.equal(s.phase,'answer');}
  const result=answerClassifier(s,c,c.index===1?wrong[1].id:c.kind);s=result.state;
  assert.equal(result.done,true);assert.equal(hintClassifier(s),s);s=advanceClassifier(s);
 }
 assert.equal(s.score,1050);assert.equal(s.results.filter(r=>r.correct&&r.attempts===1).length,10);assert.equal(s.results[1].correct,false);
 for(const seed of [null,-1,4294967296,.5,NaN,'1'])assert.throws(()=>generateClassifier(seed));
 assert.equal(createClassifierState().score,0);
});
test('clasificador: variantes separadas de los bancos de estudio',()=>{
 assert.equal(questionsForScope('t05').length,66);assert.equal(cardsForScope('t05').length,66);
 assert.equal(questionsForScope('all-course').length,expectedCatalog.questions);assert.equal(cardsForScope().length,expectedCatalog.cards);
});



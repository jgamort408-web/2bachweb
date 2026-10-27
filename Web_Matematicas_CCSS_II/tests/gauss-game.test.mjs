import { expectedCatalog } from "./helpers/catalog-expectations.mjs";
import test from 'node:test';
import assert from 'node:assert/strict';
import {generateGaussGame,createGaussState,isEchelon,suggestOperation,parseFactor,applyGaussStep,undoGaussStep,resetGaussChallenge,revealGaussRoute,checkGaussChallenge} from '../widgets/games/t05-b-gauss-paso-a-paso/model.js';
import {applyRowOperation,inverseOperation,fromIntegerRows} from '../content/models/equivalent-systems.js';
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



const integers=matrix=>matrix.map(row=>{const common=row.reduce((d,f)=>d*BigInt(f.denominator)/gcd(d,BigInt(f.denominator)),1n);return row.map(f=>Number(BigInt(f.numerator)*(common/BigInt(f.denominator))));});
function ranks(matrix){const rows=integers(matrix);return [rank(rows.map(r=>r.slice(0,-1))),rank(rows)];}
test('Gauss juego: 1000 sesiones/6000 sistemas, rangos y rutas exactas independientes',()=>{
 for(let seed=0;seed<1000;seed++){
  const list=generateGaussGame(seed);assert.deepEqual(list,generateGaussGame(seed));assert.equal(list.length,6);
  for(const c of list){
   const r=rank(c.rows.map(r=>r.slice(0,-1))),s=rank(c.rows),n=c.rows[0].length-1;
   assert.equal(c.details.kind,r!==s?'SI':r===n?'SCD':'SCI');assert.equal(isEchelon(c.initial),false);
   let m=c.initial;
   for(const op of c.route){const before=structuredClone(m);m=applyRowOperation(m,op);assert.deepEqual(ranks(m),[r,s]);assert.deepEqual(applyRowOperation(m,inverseOperation(op)),before);}
   assert.equal(isEchelon(m),true);assert.deepEqual(m,c.details.echelon.matrix);
   if(c.details.expressions)for(let k=0;k<c.details.expressions[0].length;k++)for(const row of c.rows){
    let total=rat(0);row.slice(0,-1).forEach((v,j)=>total=add(total,mul(rat(v),from(c.details.expressions[j][k]))));assert.deepEqual(total,rat(k===0?row.at(-1):0));
   }
  }
 }
});
test('Gauss juego: rutas alternativas y pivotes no normalizados sin penalización',()=>{
 for(let seed=0;seed<80;seed++)for(const c of generateGaussGame(seed)){
  let s=createGaussState(c);
  for(const op of [{kind:'swap',target:0,source:1},{kind:'swap',target:0,source:1},{kind:'scale',target:0,scalar:fraction(2)},{kind:'scale',target:0,scalar:fraction(1,2)},...c.route,{kind:'scale',target:0,scalar:fraction(-2)}])s=applyGaussStep(s,op);
  assert.equal(isEchelon(s.matrix),true);const result=checkGaussChallenge(s,c,c.details.kind);assert.equal(result.points,100);assert.equal(result.done,true);
  assert.equal(applyGaussStep(result.state,c.route[0]),result.state);assert.equal(checkGaussChallenge(result.state,c,c.details.kind).ignored,true);
 }
 assert.equal(isEchelon(fromIntegerRows([[0,0,0],[1,0,1]])),false);
 assert.equal(isEchelon(fromIntegerRows([[0,2,1],[1,0,0]])),false);
 assert.equal(isEchelon(fromIntegerRows([[2,1,3],[0,-3,4]])),true);
});
test('Gauss juego: pistas operables, rutas guiadas y cero pasos sugeridos al terminar',()=>{
 for(let seed=0;seed<100;seed++)for(const c of generateGaussGame(seed)){
  let s=createGaussState(c),count=0;
  while(!isEchelon(s.matrix)){const op=suggestOperation(s.matrix);assert.ok(op);s=applyGaussStep(s,op);assert.ok(++count<15);}
  assert.equal(suggestOperation(s.matrix),null);assert.equal(checkGaussChallenge(s,c,c.details.kind).points,100);
 }
});
test('Gauss juego: límites, rechazo sin mutación, identidad y deshacer',()=>{
 const c=generateGaussGame(10)[0],s=createGaussState(c),before=structuredClone(s);
 for(const op of [{kind:'scale',target:0,scalar:fraction(0)},{kind:'swap',target:0,source:0},{kind:'add',target:0,source:0,scalar:fraction(1)},{kind:'scale',target:0,scalar:fraction(1)}])assert.throws(()=>applyGaussStep(s,op));
 assert.deepEqual(s,before);assert.deepEqual(parseFactor('−2/4'),fraction(-1,2));assert.deepEqual(parseFactor('18/2'),fraction(9));
 for(const value of ['', '0.5','1/0','1/10','10','2x','1/2/3'])assert.throws(()=>parseFactor(value));
 let route=s;for(let i=0;i<30;i++)route=applyGaussStep(route,{kind:'scale',target:0,scalar:fraction(-1)});
 assert.throws(()=>applyGaussStep(route,{kind:'scale',target:0,scalar:fraction(-1)}));assert.equal(undoGaussStep(route).history.length,29);
 const step=applyGaussStep(s,c.route[0]);assert.deepEqual(undoGaussStep(step).matrix,s.matrix);assert.deepEqual(resetGaussChallenge(step,c).matrix,c.initial);
 let limited=s;while(Math.max(...limited.matrix[0].map(f=>Math.abs(f.numerator)))*9<=1000000)limited=applyGaussStep(limited,{kind:'scale',target:0,scalar:fraction(9)});
 assert.throws(()=>applyGaussStep(limited,{kind:'scale',target:0,scalar:fraction(9)}));
 for(const seed of [null,-1,.5,NaN,'1',4294967296])assert.throws(()=>generateGaussGame(seed));
});
test('Gauss juego: clasificación, asistencia irreversible, intentos y puntuación',()=>{
 const c=generateGaussGame(0)[0];let s=createGaussState(c);
 assert.equal(checkGaussChallenge(s,c,c.details.kind).state,s);
 for(const op of c.route)s=applyGaussStep(s,op);
 assert.equal(checkGaussChallenge(s,c,'').state,s);
 s=checkGaussChallenge(s,c,'SI').state;assert.equal(s.attempts,1);assert.equal(s.phase,'working');
 s=resetGaussChallenge(s,c);assert.equal(s.attempts,1);
 for(const op of c.route)s=applyGaussStep(s,op);
 assert.equal(checkGaussChallenge(s,c,c.details.kind).points,50);
 const bad=checkGaussChallenge(s,c,'SI');assert.equal(bad.points,0);assert.equal(bad.state.phase,'resolved');
 let assisted=revealGaussRoute(createGaussState(c),c);assert.equal(assisted.assisted,true);assert.equal(isEchelon(assisted.matrix),true);
 assisted=resetGaussChallenge(assisted,c);assert.equal(assisted.assisted,true);assert.equal(isEchelon(revealGaussRoute(assisted,c).matrix),true);
 for(const op of c.route)assisted=applyGaussStep(assisted,op);
 assert.equal(checkGaussChallenge(assisted,c,c.details.kind).points,0);
});
test('Gauss juego: bancos de estudio conservados',()=>{
 assert.equal(questionsForScope('t05').length,66);assert.equal(cardsForScope('t05').length,66);assert.equal(questionsForScope('all-course').length,expectedCatalog.questions);assert.equal(cardsForScope().length,expectedCatalog.cards);
});



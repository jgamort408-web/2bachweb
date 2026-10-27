import { expectedCatalog } from "./helpers/catalog-expectations.mjs";
import test from 'node:test';
import assert from 'node:assert/strict';
import {matrixPower,identityMatrix,powerPresets,generatedPowerMatrix} from '../content/models/matrix-power.js';
import {generatedMatrix} from '../content/models/matrix-basics.js';
import {multiplyMatrices} from '../content/models/matrix-product.js';
import {questionsForScope,cardsForScope} from '../content/activities/catalog.js';
const pow=(a,n)=>matrixPower(a,n).result;
const mul=(a,b)=>multiplyMatrices(a,b).result;
// Referencia independiente: exponenciación binaria y multiplicación explícita.
function reference(a,n){
 const dim=a.length;let r=Array.from({length:dim},(_,i)=>Array.from({length:dim},(_,j)=>+(i===j))),b=a.map(row=>[...row]);
 const product=(x,y)=>x.map(row=>y[0].map((_,j)=>row.reduce((s,v,k)=>s+v*y[k][j],0)));
 while(n){if(n%2)r=product(r,b);n=Math.floor(n/2);if(n)b=product(b,b);}return r;
}
test('2100 potencias: tres órdenes y exponentes 0–6 contra referencia binaria',()=>{
 for(let size=1;size<=3;size++)for(let seed=0;seed<100;seed++)for(let n=0;n<=6;n++){
  const a=generatedMatrix(size,size,seed),copy=JSON.stringify(a),m=matrixPower(a,n);assert.deepEqual(m.result,reference(a,n));assert.equal(m.stages.length,n+1);assert.equal(JSON.stringify(a),copy);
  for(const [k,stage]of m.stages.entries()){assert.equal(stage.exponent,k);assert.deepEqual(stage.result,reference(a,k));assert.equal(stage.steps.length,k?size*size:0);}
 }
});
test('patrones para exponentes 0–12, leyes de la misma base y estados iterados',()=>{
 const {accumulation:t,diagonal:d,swap:s,nilpotent:z,projection:e}=powerPresets;
 for(let n=0;n<=12;n++){
  assert.deepEqual(pow(t.matrix,n),[[1,n],[0,1]]);assert.deepEqual(pow(d.matrix,n),[[2**n,0],[0,(-1)**n]]);
  assert.deepEqual(pow(s.matrix,n),n%2?s.matrix:identityMatrix(2));assert.deepEqual(pow(z.matrix,n),n===0?identityMatrix(2):n===1?z.matrix:[[0,0],[0,0]]);assert.deepEqual(pow(e.matrix,n),n===0?identityMatrix(2):e.matrix);
  let state=[10,3];for(let k=0;k<n;k++)state=[state[0]+state[1],state[1]];
  assert.deepEqual(mul(pow(t.matrix,n),[[10],[3]]),state.map(v=>[v]));
 }
 for(let seed=0;seed<100;seed++){const a=generatedPowerMatrix(seed);assert.deepEqual(mul(pow(a,2),pow(a,3)),pow(a,5));assert.deepEqual(pow(pow(a,2),3),pow(a,6));}
});
test('ejemplos, práctica, contraejemplo de bases distintas y matriz nula',()=>{
 const a=[[1,2],[3,0]],p=[[1,1],[0,1]],q=[[1,0],[1,1]],b=[[1,2],[0,1]];
 assert.deepEqual(pow(a,2),[[7,2],[3,6]]);assert.deepEqual(pow(a,3),[[13,14],[21,6]]);
 assert.deepEqual(pow(mul(p,q),2),[[5,3],[3,2]]);assert.deepEqual(mul(pow(p,2),pow(q,2)),[[5,2],[2,1]]);
 assert.deepEqual(pow(b,2),[[1,4],[0,1]]);assert.deepEqual(pow(b,3),[[1,6],[0,1]]);assert.deepEqual(pow(b,5),[[1,10],[0,1]]);assert.deepEqual(mul(pow(b,5),[[4],[1]]),[[14],[1]]);
 assert.deepEqual(pow([[0,0],[0,0]],0),identityMatrix(2));assert.deepEqual(pow([[0,0],[0,0]],1),[[0,0],[0,0]]);
 assert.deepEqual(pow([[.5]],3),[[.125]]);
});
test('validación: rectangular, exponentes inválidos, límites, copias y variantes',()=>{
 assert.throws(()=>matrixPower([[1,2]],2),RangeError);
 for(const n of [-1,.5,13,Infinity,NaN])assert.throws(()=>matrixPower([[1]],n),RangeError);
 assert.throws(()=>matrixPower([[Infinity]],1),TypeError);assert.throws(()=>matrixPower([[Number.MAX_VALUE]],2),RangeError);assert.throws(()=>identityMatrix(0),RangeError);
 const a=[[1,2],[0,1]],m=matrixPower(a,3);m.stages[0].result[0][0]=99;assert.deepEqual(a,[[1,2],[0,1]]);assert.deepEqual(m.result,[[1,6],[0,1]]);
 for(let seed=0;seed<100;seed++){const a=generatedPowerMatrix(seed);assert.deepEqual(a,generatedPowerMatrix(seed));assert.ok(a.flat().every(n=>Number.isInteger(n)&&Math.abs(n)<=3));}
});
test('bancos: seis preguntas/tarjetas nuevas; tema 4 con 72/72; catálogo 318/301',()=>{
 const bank=questionsForScope('t04-e04');assert.equal(bank.length,6);assert.equal(cardsForScope('t04-e04').length,6);
 for(const q of bank){assert.equal(q.options.length,4);assert.equal(new Set(q.options.map(o=>o.text)).size,4);assert.ok(q.explanation&&q.hint&&q.options.some(o=>o.id===q.correct));}
 assert.equal(questionsForScope('t04').length,72);assert.equal(cardsForScope('t04').length,72);assert.equal(questionsForScope('all-course').length,expectedCatalog.questions);assert.equal(cardsForScope().length,expectedCatalog.cards);
 assert.equal(new Set(questionsForScope('all-course').map(q=>q.id)).size,expectedCatalog.questions);assert.equal(new Set(cardsForScope().map(c=>c.id)).size, expectedCatalog.cards);
 for(const topic of ['t01','t02','t03'])assert.equal(questionsForScope(topic).length,60);
});




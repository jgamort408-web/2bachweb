import { expectedCatalog } from "./helpers/catalog-expectations.mjs";
import test from 'node:test';
import assert from 'node:assert/strict';
import {matrixOperation as op,operationSession,parseMatrixInteger} from '../content/models/matrix-operations.js';
import {generatedMatrix} from '../content/models/matrix-basics.js';
import {questionsForScope,cardsForScope} from '../content/activities/catalog.js';
const result=(a,b,mode,x=1,y=1)=>op(a,b,mode,x,y).result;
test('800 variantes de 16 órdenes: suma, resta, escala, combinación y propiedades',()=>{
 for(let rows=1;rows<=4;rows++)for(let cols=1;cols<=4;cols++)for(let seed=0;seed<50;seed++){
  const {a,b}=operationSession(seed,rows,cols,rows,cols),c=generatedMatrix(rows,cols,seed+3),x=seed%7-3,y=seed%5-2,zero=a.map(r=>r.map(()=>0));
  const sum=result(a,b,'add'),diff=result(a,b,'subtract'),scaled=result(a,null,'scale',x),combined=op(a,b,'combine',x,y);
  a.forEach((r,i)=>r.forEach((v,j)=>{assert.equal(sum[i][j],v+b[i][j]);assert.equal(diff[i][j],v-b[i][j]);assert.equal(scaled[i][j],x*v===0?0:x*v);assert.equal(combined.result[i][j],x*v+y*b[i][j]===0?0:x*v+y*b[i][j]);}));
  assert.equal(combined.steps.length,rows*cols);assert.deepEqual(result(a,b,'add'),result(b,a,'add'));
  assert.deepEqual(result(result(a,b,'add'),c,'add'),result(a,result(b,c,'add'),'add'));
  assert.deepEqual(result(a,zero,'add'),a);assert.deepEqual(result(a,a,'subtract'),zero);
  assert.deepEqual(result(sum,null,'scale',x),result(result(a,null,'scale',x),result(b,null,'scale',x),'add'));
  assert.deepEqual(result(a,null,'scale',x+y),result(result(a,null,'scale',x),result(a,null,'scale',y),'add'));
  assert.deepEqual(result(result(a,null,'scale',y),null,'scale',x),result(a,null,'scale',x*y));
 }
});
test('81 parejas de órdenes: compatibilidad, sin recortes ni relleno; escala independiente de B',()=>{
 for(let ar=1;ar<=3;ar++)for(let ac=1;ac<=3;ac++)for(let br=1;br<=3;br++)for(let bc=1;bc<=3;bc++){
  const {a,b}=operationSession(1,ar,ac,br,bc);
  for(const mode of ['add','subtract','combine']){const m=op(a,b,mode,0,0);assert.equal(m.compatible,ar===br&&ac===bc);if(!m.compatible){assert.equal(m.result,null);assert.equal(m.steps.length,0);assert.ok(m.reason);}}
  assert.ok(op(a,null,'scale',2).compatible);
 }
});
test('ejemplos, práctica, igualdad despejada, variación y contraejemplos',()=>{
 const a=[[2,-1],[0,3]],b=[[4,2],[-2,1]],copy=JSON.stringify([a,b]);
 assert.deepEqual(result(a,b,'add'),[[6,1],[-2,4]]);assert.deepEqual(result(a,b,'subtract'),[[-2,-3],[2,2]]);assert.deepEqual(result(a,null,'scale',-2),[[-4,2],[0,-6]]);assert.deepEqual(result(a,null,'scale',.5),[[1,-.5],[0,1.5]]);
 assert.deepEqual(result(a,b,'combine',2,-3),[[-8,-8],[6,3]]);
 const x=result(result(b,a,'subtract'),null,'scale',.5);assert.deepEqual(x,[[1,1.5],[-1,-1]]);assert.deepEqual(result(result(x,null,'scale',2),a,'add'),b);assert.equal(JSON.stringify([a,b]),copy);
 const p=[[1,-2],[3,0]],q=[[-1,4],[2,5]];assert.deepEqual(result(p,q,'add'),[[0,2],[5,5]]);assert.deepEqual(result(p,q,'subtract'),[[2,-6],[1,-5]]);assert.deepEqual(result(p,q,'combine',-2,1),[[-3,8],[-4,5]]);
 const v1=[[24,15,8],[10,20,18]],v2=[[20,18,11],[14,17,18]];assert.deepEqual(result(v1,v2,'add'),[[44,33,19],[24,37,36]]);assert.deepEqual(result(v2,v1,'subtract'),[[-4,3,3],[4,-3,0]]);
 assert.notDeepEqual(result(a,b,'subtract'),result(b,a,'subtract'));assert.notDeepEqual(result(result([[5]],[[2]],'subtract'),[[1]],'subtract'),result([[5]],result([[2]],[[1]],'subtract'),'subtract'));
});
test('entrada entera, validación y protección frente a resultados no finitos',()=>{
 for(const [s,n]of [['0',0],[' -20 ',-20],['+5',5],['20',20]])assert.equal(parseMatrixInteger(s),n);
 for(const s of ['',null,'1.5','21','-21','1e1','1/2','NaN'])assert.equal(parseMatrixInteger(s),null);
 assert.equal(parseMatrixInteger('6',-5,5),null);assert.throws(()=>op([[1]],[[2]],'unknown'),RangeError);assert.throws(()=>op([[1]],[[2]],'scale',Infinity),TypeError);assert.throws(()=>op([[Number.MAX_VALUE]],null,'scale',2),RangeError);assert.throws(()=>op([[1],[2,3]],[[1]],'add'),TypeError);
});
test('bancos: 4.2 con seis preguntas/tarjetas, t04 de 66 y catálogo 318/301',()=>{
 const bank=questionsForScope('t04-e02');assert.equal(bank.length,6);assert.equal(cardsForScope('t04-e02').length,6);assert.equal(questionsForScope('t04').length,72);assert.equal(cardsForScope('t04').length,72);assert.equal(questionsForScope('t04-e01').length,6);
 for(const q of bank){assert.equal(q.options.length,4);assert.equal(new Set(q.options.map(o=>o.text)).size,4);assert.ok(q.hint&&q.explanation&&q.options.some(o=>o.id===q.correct));}
 assert.equal(questionsForScope('all-course').length,expectedCatalog.questions);assert.equal(cardsForScope().length,expectedCatalog.cards);assert.equal(new Set(questionsForScope('all-course').map(q=>q.id)).size,expectedCatalog.questions);assert.equal(new Set(cardsForScope().map(q=>q.id)).size,expectedCatalog.cards);for(const topic of ['t01','t02','t03'])assert.equal(questionsForScope(topic).length,60);
});



import { expectedCatalog } from "./helpers/catalog-expectations.mjs";
import test from 'node:test';
import assert from 'node:assert/strict';
import {multiplyMatrices as mul,productPresets,productSession} from '../content/models/matrix-product.js';
import {generatedMatrix} from '../content/models/matrix-basics.js';
import {matrixOperation as op} from '../content/models/matrix-operations.js';
import {questionsForScope,cardsForScope} from '../content/activities/catalog.js';
const product=(a,b)=>mul(a,b).result;
const identity=n=>Array.from({length:n},(_,i)=>Array.from({length:n},(_,j)=>i===j?1:0));
test('810 productos rectangulares: acumulación por contribuciones y pasos por casilla',()=>{
 for(let rows=1;rows<=3;rows++)for(let inner=1;inner<=3;inner++)for(let cols=1;cols<=3;cols++)for(let seed=0;seed<30;seed++){
  const {a,b}=productSession(seed,rows,inner,cols),copy=JSON.stringify([a,b]),m=mul(a,b),expected=Array.from({length:rows},()=>Array(cols).fill(0));
  for(let k=0;k<inner;k++)for(let i=0;i<rows;i++)for(let j=0;j<cols;j++)expected[i][j]+=a[i][k]*b[k][j];
  assert.deepEqual(m.result,expected);assert.equal(m.rows,rows);assert.equal(m.cols,cols);assert.equal(m.steps.length,rows*cols);
  for(const s of m.steps){assert.equal(s.terms.length,inner);assert.equal(s.value,expected[s.row-1][s.col-1]);s.terms.forEach((t,k)=>{assert.equal(t.left,a[s.row-1][k]);assert.equal(t.right,b[k][s.col-1]);});}
  assert.equal(JSON.stringify([a,b]),copy);assert.deepEqual(productSession(seed,rows,inner,cols),{a,b});
 }
});
test('81 parejas de órdenes: compatibilidad sin relleno, 1×1 y datos inválidos',()=>{
 for(let ar=1;ar<=3;ar++)for(let ac=1;ac<=3;ac++)for(let br=1;br<=3;br++)for(let bc=1;bc<=3;bc++){
  const m=mul(generatedMatrix(ar,ac,1),generatedMatrix(br,bc,2));assert.equal(m.compatible,ac===br);
  if(ac!==br){assert.equal(m.result,null);assert.deepEqual(m.steps,[]);assert.ok(m.reason);}
 }
 assert.deepEqual(product([[.5]],[[-2]]),[[-1]]);
 assert.throws(()=>mul([[1],[2,3]],[[1]]),TypeError);assert.throws(()=>mul([[Infinity]],[[1]]),TypeError);assert.throws(()=>mul([[Number.MAX_VALUE]],[[2]]),RangeError);
});
test('100 casos: identidad rectangular, asociatividad, distributividad y escalares',()=>{
 for(let seed=0;seed<100;seed++){
  const a=generatedMatrix(2,3,seed),b=generatedMatrix(3,2,seed+1),c=generatedMatrix(2,1,seed+2),d=generatedMatrix(3,2,seed+3),e=generatedMatrix(2,3,seed+4);
  assert.deepEqual(product(identity(2),a),a);assert.deepEqual(product(a,identity(3)),a);
  assert.deepEqual(product(product(a,b),c),product(a,product(b,c)));
  assert.deepEqual(product(a,op(b,d,'add').result),op(product(a,b),product(a,d),'add').result);
  assert.deepEqual(product(op(a,e,'add').result,b),op(product(a,b),product(e,b),'add').result);
  assert.deepEqual(product(op(a,null,'scale',-2).result,b),op(product(a,b),null,'scale',-2).result);
 }
});
test('cinco ejemplos, práctica, no conmutatividad y producto nulo',()=>{
 const {rectangular:r,order:o,zero:z,sales:s}=productPresets;
 assert.deepEqual(product(r.a,r.b),[[-3,-3],[3,8]]);assert.deepEqual(product(r.b,r.a),[[2,7,0],[-1,-2,1],[3,18,5]]);
 assert.deepEqual(product(o.a,o.b),[[2,1],[1,1]]);assert.deepEqual(product(o.b,o.a),[[1,1],[1,2]]);
 assert.deepEqual(product(z.a,z.b),[[0,0],[0,0]]);assert.ok(z.a.flat().some(Boolean)&&z.b.flat().some(Boolean));
 assert.deepEqual(product(s.a,s.b),[[101],[98]]);assert.equal(mul(s.b,s.a).compatible,false);
 const R=[[0,-1],[1,0]],S=[[2,0],[0,1]],v=[[1],[1]];
 assert.deepEqual(product(R,S),[[0,-1],[2,0]]);assert.deepEqual(product(R,product(S,v)),[[-1],[2]]);assert.deepEqual(product(S,product(R,v)),[[-2],[1]]);
 const U=[[2,-1],[1,3]],w=[[4],[2]];assert.deepEqual(product(U,w),[[6],[10]]);assert.equal(mul(w,U).compatible,false);assert.deepEqual(product(w,[[1,-1]]),[[4,-4],[2,-2]]);
});
test('bancos: seis preguntas y tarjetas nuevas, t04 con 72/72, total 318/301',()=>{
 const q=questionsForScope('t04-e03');assert.equal(q.length,6);assert.equal(cardsForScope('t04-e03').length,6);
 for(const question of q){assert.equal(question.options.length,4);assert.equal(new Set(question.options.map(o=>o.text)).size,4);assert.ok(question.hint&&question.explanation);assert.equal(question.options.filter(o=>o.id===question.correct).length,1);}
 assert.equal(questionsForScope('t04').length,72);assert.equal(cardsForScope('t04').length,72);assert.equal(questionsForScope('all-course').length,expectedCatalog.questions);assert.equal(cardsForScope().length,expectedCatalog.cards);
 assert.equal(new Set(questionsForScope('all-course').map(q=>q.id)).size,expectedCatalog.questions);assert.equal(new Set(cardsForScope().map(c=>c.id)).size, expectedCatalog.cards);
 for(const t of ['t01','t02','t03'])assert.equal(questionsForScope(t).length,60);
});




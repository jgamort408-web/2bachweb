import { expectedCatalog } from "./helpers/catalog-expectations.mjs";
import test from 'node:test';
import assert from 'node:assert/strict';
import {generateClassificationModels,generateClassificationQuestions} from '../content/models/system-classification.js';
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
test('6000 variantes contrastadas con eliminación independiente y sustitución',()=>{
 for(let seed=0;seed<1000;seed++){
  const models=generateClassificationModels(seed);assert.deepEqual(models,generateClassificationModels(seed));
  for(const m of models){
   const a=m.rows.map(r=>r.slice(0,-1)),r=rank(a),rr=rank(m.rows);
   assert.equal(m.kind,r!==rr?'SI':r===a[0].length?'SCD':'SCI');
   if(m.point)for(const t of [-2.5,0,1/3,4]){
    const point=m.point.map((v,j)=>v+t*(m.direction?.[j]||0));
    for(const row of m.rows)assert.ok(Math.abs(row.slice(0,-1).reduce((sum,v,j)=>sum+v*point[j],0)-row.at(-1))<1e-9);
   }
   if(m.direction)assert.ok(m.direction.some(v=>v!==0));
  }
 }
});
test('identidad no implica SCI; menos ecuaciones no asegura compatibilidad',()=>{
 for(let seed=0;seed<100;seed++){
  const m=generateClassificationModels(seed);
  assert.deepEqual(m[3].rows[2],[0,0,0]);assert.equal(m[3].kind,'SCD');
  assert.equal(m[4].kind,'SCI');assert.equal(m[5].kind,'SI');
  assert.equal(m[4].rows.length,2);assert.equal(m[5].rows[0].length-1,3);
 }
});
test('variedad numérica y distractores únicos en las seis familias',()=>{
 const seen=Array.from({length:6},()=>new Set());
 for(let seed=0;seed<1000;seed++){
  const m=generateClassificationModels(seed),q=generateClassificationQuestions(seed);
  q.forEach((item,i)=>{seen[i].add(m[i].formula);assert.equal(item.correct,m[i].kind);assert.equal(new Set(item.options.map(o=>o.text)).size,3);assert.equal(item.options.filter(o=>o.id===item.correct).length,1);assert.ok(item.explanation&&item.hint);});
 }
 seen.forEach(s=>assert.ok(s.size>20));
});
test('ejemplos resueltos y práctica: familias completas y restricciones enteras',()=>{
 const cases=[
 [[[1,1,3],[1,-1,1]],'SCD'],[[[1,1,4],[3,3,12]],'SCI'],[[[1,1,4],[3,3,13]],'SI'],
 [[[1,0,2],[0,1,-1],[0,0,0]],'SCD'],[[[1,0,1,2],[0,1,-1,1]],'SCI'],[[[1,1,1,1],[2,2,2,3]],'SI'],
 [[[1,1,20],[2,2,45]],'SI'],[[[1,1,20],[2,2,40]],'SCI']
 ];
 for(const [rows,kind]of cases){const a=rows.map(r=>r.slice(0,-1)),r=rank(a);assert.equal(r!==rank(rows)?'SI':r===a[0].length?'SCD':'SCI',kind);}
 let count=0;for(let x=0;x<=20;x++)for(let y=0;y<=20;y++)if(x+y===20&&2*x+2*y===40)count++;assert.equal(count,21);
});
test('lección seis preguntas/tarjetas; t05 66/66; catálogo 318/301',()=>{
 const q=questionsForScope('t05-e03');assert.equal(q.length,6);assert.equal(cardsForScope('t05-e03').length,6);
 q.forEach(item=>{assert.equal(new Set(item.options.map(o=>o.text)).size,4);assert.equal(item.options.filter(o=>o.id===item.correct).length,1);});
 assert.equal(questionsForScope('t05').length,66);assert.equal(cardsForScope('t05').length,66);
 assert.equal(questionsForScope('all-course').length,expectedCatalog.questions);assert.equal(cardsForScope().length,expectedCatalog.cards);
 assert.equal(new Set(questionsForScope('all-course').map(q=>q.id)).size,expectedCatalog.questions);assert.equal(new Set(cardsForScope().map(q=>q.id)).size,expectedCatalog.cards);
});



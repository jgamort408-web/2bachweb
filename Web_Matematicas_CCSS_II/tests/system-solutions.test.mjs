import { expectedCatalog } from "./helpers/catalog-expectations.mjs";
import test from 'node:test';
import assert from 'node:assert/strict';
import {solutionPresets,classifyLines,parseCoordinate,checkPoint,solutionPoint,solutionTex,generatedLines,clipLine} from '../content/models/system-solutions.js';
import {fraction} from '../content/models/matrix-inverse.js';
import {questionsForScope,cardsForScope} from '../content/activities/catalog.js';
// Referencia independiente: eliminación por filas en coeficientes y ampliada.
function rank(matrix){
 const a=structuredClone(matrix);let row=0;
 for(let col=0;col<a[0].length&&row<a.length;col++){
  let p=row;while(p<a.length&&Math.abs(a[p][col])<1e-10)p++;
  if(p===a.length)continue;[a[p],a[row]]=[a[row],a[p]];
  const pivot=a[row][col];for(let j=col;j<a[0].length;j++)a[row][j]/=pivot;
  for(let i=row+1;i<a.length;i++){const factor=a[i][col];for(let j=col;j<a[0].length;j++)a[i][j]-=factor*a[row][j];}row++;
 }return row;
}
test('14400 pares de rectas: soluciones contrastadas con eliminación independiente',()=>{
 const bank=[];for(let a=-2;a<=2;a++)for(let b=-2;b<=2;b++)if(a||b)for(let c=-2;c<=2;c++)bank.push([a,b,c]);
 for(const one of bank)for(const two of bank){
  const lines=[one,two],m=classifyLines(lines),r=rank(lines.map(row=>row.slice(0,2))),augmented=rank(lines);
  assert.equal(m.kind,r!==augmented?'none':r===2?'unique':'infinite');
  if(m.kind==='unique')assert.ok(checkPoint(lines,m.point).every(r=>r.satisfied));
  if(m.kind==='infinite')for(const t of [-3,0,3])assert.ok(checkPoint(lines,solutionPoint(lines,t)).every(r=>r.satisfied));
 }
});
test('3000 variantes reproducibles: conservan tipo y puntos exactos; signos y verticales',()=>{
 let vertical=0,negative=0,oblique=0;
 for(const kind of ['unique','infinite','none'])for(let seed=0;seed<1000;seed++){
  const lines=generatedLines(seed,kind);assert.deepEqual(lines,generatedLines(seed,kind));assert.equal(classifyLines(lines).kind,kind);
  if(kind==='unique'&&lines[0][0]*lines[1][0]+lines[0][1]*lines[1][1]!==0)oblique++;
  if(lines[0][1]===0)vertical++;if(lines[1][0]<0||lines[1][1]<0)negative++;
  if(kind!=='none')for(const t of [-9,0,9])assert.ok(checkPoint(lines,solutionPoint(lines,t)).every(r=>r.satisfied));
 }
 assert.ok(vertical>0&&negative>0&&oblique>0);
 assert.deepEqual(solutionPoint([[1,0,2],[-2,0,-4]],3),[fraction(2),fraction(3)]);
});
test('ejemplos, decimales aproximados y práctica contextual',()=>{
 for(const [key,kind,coords]of [['crossing','unique',[3,2]],['parallel','none',null],['coincident','infinite',null],['vertical','unique',[2,-1]],['outside','unique',[-18,-18]]]){
  const m=classifyLines(solutionPresets[key].lines);assert.equal(m.kind,kind);if(coords)assert.deepEqual(m.point,coords.map(v=>fraction(v)));
 }
 const a=solutionPresets.fractional.lines;assert.deepEqual(classifyLines(a).point,[fraction(1,3),fraction(1,3)]);
 assert.equal(checkPoint(a,[parseCoordinate('0,333'),parseCoordinate('0.333')])[0].satisfied,false);
 assert.ok(checkPoint(a,[parseCoordinate('2/6'),parseCoordinate('-1/-3')]).every(r=>r.satisfied));
 assert.deepEqual(classifyLines([[2,-1,-4],[1,-1,-10]]).point,[fraction(6),fraction(16)]);
 assert.equal(solutionTex(solutionPresets.parallel.lines),String.raw`S=\varnothing`);
});
test('recorte de rectas y coordenadas: verticales, ventana, fracciones y datos inválidos',()=>{
 for(const range of [6,12,24])for(let a=-2;a<=2;a++)for(let b=-2;b<=2;b++)if(a||b)for(let c=-20;c<=20;c++){
  const points=clipLine([a,b,c],range);assert.ok(points.length<=2);
  for(const [x,y]of points){assert.ok(Number.isFinite(x+y));assert.ok(Math.abs(a*x+b*y-c)<1e-8);assert.ok(Math.abs(x)<=range&&Math.abs(y)<=range);assert.ok(Math.abs(x)===range||Math.abs(y)===range);}
 }
 assert.deepEqual(clipLine([1,0,2],6),[[2,-6],[2,6]]);
 assert.deepEqual(clipLine([1,0,18],6),[]);assert.equal(clipLine([1,1,12],6).length,1);
 assert.deepEqual(parseCoordinate('−1,5'),fraction(-3,2));assert.deepEqual(parseCoordinate('.5'),fraction(1,2));
 for(const input of ['', '1/0','100','1/1001','1.2345','x','1+2','1e2'])assert.equal(parseCoordinate(input),null);
 assert.throws(()=>classifyLines([[0,0,1],[1,1,0]]));assert.throws(()=>classifyLines([[1,2],[1,0,3]]));assert.throws(()=>generatedLines(1,'other'));assert.throws(()=>solutionPoint(solutionPresets.coincident.lines,10));
});
test('lección 5.2 con seis preguntas/tarjetas, tema 5 66/66 y catálogo 318/301',()=>{
 const q=questionsForScope('t05-e02');assert.equal(q.length,6);assert.equal(cardsForScope('t05-e02').length,6);
 for(const item of q){assert.equal(item.options.length,4);assert.equal(new Set(item.options.map(o=>o.text)).size,4);assert.equal(item.options.filter(o=>o.id===item.correct).length,1);}
 assert.equal(questionsForScope('t05').length,66);assert.equal(cardsForScope('t05').length,66);
 assert.equal(questionsForScope('all-course').length,expectedCatalog.questions);assert.equal(cardsForScope().length,expectedCatalog.cards);assert.equal(new Set(questionsForScope('all-course').map(q=>q.id)).size,expectedCatalog.questions);assert.equal(new Set(cardsForScope().map(q=>q.id)).size,expectedCatalog.cards);
});



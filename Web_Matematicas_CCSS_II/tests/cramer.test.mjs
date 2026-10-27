import { expectedCatalog } from "./helpers/catalog-expectations.mjs";
import test from 'node:test';
import assert from 'node:assert/strict';
import {cramerPresets,cramerDetails,generatedCramer} from '../content/models/cramer.js';
import {fraction} from '../content/models/matrix-inverse.js';
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
// Sustitución independiente con enteros grandes, sin operaciones del modelo.
function verifyExact(a,b,x){
 const den=x.reduce((p,v)=>p*BigInt(v.denominator),1n);
 a.forEach((row,i)=>{const sum=row.reduce((p,v,j)=>p+BigInt(v)*BigInt(x[j].numerator)*(den/BigInt(x[j].denominator)),0n);assert.equal(sum,BigInt(b[i])*den);});
}

// Leibniz by permutations: independent of the model's cofactor expansion.
function determinant(a){
 let total=0;
 function visit(p,used){
  if(p.length===a.length){
   let inversions=0,product=1;
   for(let i=0;i<p.length;i++){product*=a[i][p[i]];for(let j=i+1;j<p.length;j++)if(p[i]>p[j])inversions++;}
   total+=(inversions%2?-1:1)*product;return;
  }
  for(let j=0;j<a.length;j++)if(!used.has(j)){used.add(j);visit([...p,j],used);used.delete(j);}
 }visit([],new Set());return total===0?0:total;
}
function verify(a,b){
 const before=structuredClone({a,b}),m=cramerDetails(a,b),r=rank(a),s=rank(a.map((row,i)=>[...row,b[i]]));
 assert.equal(m.det,determinant(a));assert.equal(m.applicable,m.det!==0);
 assert.equal(m.ranks.kind,r!==s?'SI':r===a.length?'SCD':'SCI');
 for(let j=0;j<a.length;j++){
  const expected=a.map((row,i)=>row.map((v,k)=>k===j?b[i]:v)),aux=m.replacements[j];
  assert.deepEqual(aux.matrix,expected);assert.equal(aux.expansion.value,determinant(expected));
  for(const t of aux.expansion.terms){const minor=expected.filter((_,i)=>i!==t.row-1).map(row=>row.filter((_,k)=>k!==t.col-1));assert.equal(t.minor,determinant(minor));assert.equal(t.cofactor,((-1)**(t.row+t.col)*t.minor)||0);}
 }
 if(m.applicable){verifyExact(a,b,m.solution);assert.deepEqual(m.product,b.map(v=>fraction(v)));m.solution.forEach((v,j)=>assert.equal(BigInt(v.numerator)*BigInt(m.det),BigInt(m.replacements[j].expansion.value)*BigInt(v.denominator)));}
 else {assert.equal(m.solution,null);assert.equal(m.product,null);}
 assert.deepEqual({a,b},before);return m;
}
test('Cramer: 729 sistemas exhaustivos, determinantes independientes y sustitución exacta',()=>{
 for(let code=0;code<729;code++){let n=code;const v=Array.from({length:6},()=>{const x=n%3-1;n=Math.floor(n/3);return x;});verify([v.slice(0,2),v.slice(2,4)],v.slice(4));}
});
test('Cramer: 6000 variantes, reemplazos de columnas, tipos y fracciones exactas',()=>{
 let fractions=0,negative=0;
 for(const n of [2,3])for(const kind of ['SCD','SCI','SI'])for(let seed=0;seed<1000;seed++){
  const s=generatedCramer(seed,n,kind);assert.deepEqual(s,generatedCramer(seed,n,kind));assert.ok([...s.a.flat(),...s.b].every(v=>Number.isInteger(v)&&Math.abs(v)<=9));
  const m=verify(s.a,s.b);assert.equal(m.ranks.kind,kind);if(m.det<0)negative++;if(m.solution?.some(v=>v.denominator>1))fractions++;
 }assert.ok(fractions>0&&negative>0);
});
test('Cramer: ocho ejemplos, numeradores nulos, singularidad y comparación de métodos',()=>{
 const expected={integer:[1,2],fractional:[fraction(2,3),fraction(-1,3)],three:[1,2,3],zeroCoordinate:[0,2],homogeneous:[0,0],dependent:null,impossible:null,allZeroSI:null};
 for(const [key,s]of Object.entries(cramerPresets)){
  const m=verify(s.a,s.b);assert.deepEqual(m.solution,expected[key]?.map(v=>typeof v==='number'?fraction(v):v)??null);
 }
 const zero=cramerPresets.allZeroSI,m=verify(zero.a,zero.b);
 assert.equal(m.det,0);assert.deepEqual(m.replacements.map(r=>r.expansion.value),[0,0,0]);assert.equal(m.ranks.kind,'SI');
 assert.equal(verify(zero.a,[0,0,0]).ranks.kind,'SCI');
 const changed=verify(cramerPresets.integer.a,[6,3]);assert.equal(changed.det,-3);assert.deepEqual(changed.solution,[fraction(3),fraction(3)]);
 // Context exercise exceeds B's editor limit; check its determinants and exact substitution separately.
 const a=[[1,1],[2,3]],b=[9,23];assert.equal(determinant(a),1);assert.equal(determinant([[9,1],[23,3]]),4);assert.equal(determinant([[1,9],[2,23]]),5);verifyExact(a,b,[fraction(4),fraction(5)]);
});
test('Cramer: invalidación y copias sin compartir columnas sustituidas',()=>{
 const s=cramerPresets.integer;
 for(const b of [null,[],[1],[1,2,3],[10,0],[1,.5],[1,NaN]])assert.throws(()=>cramerDetails(s.a,b));
 for(const a of [[],[[1]],[[1,0,0],[0,1,0]],[[1,10],[0,1]],[[1,0],[0,NaN]],[[1,0],[1]]])assert.throws(()=>cramerDetails(a,[0,0]));
 for(const [n,kind]of [[1,'SCD'],[4,'SCI'],[2,'other']])assert.throws(()=>generatedCramer(1,n,kind));
 const copy=cramerDetails(s.a,s.b);copy.replacements[0].matrix[0][1]=9;assert.equal(copy.replacements[1].matrix[0][1],3);assert.equal(copy.a[0][1],1);assert.equal(s.a[0][1],1);
 for(const n of [-9,9])verify([[n,1],[0,n]],[n,1]);
});
test('Cramer: seis preguntas/tarjetas, tema5 66/66 y catálogo 318/301',()=>{
 const q=questionsForScope('t05-e09');assert.equal(q.length,6);assert.equal(cardsForScope('t05-e09').length,6);
 for(const item of q){assert.equal(new Set(item.options.map(o=>o.text)).size,4);assert.equal(item.options.filter(o=>o.id===item.correct).length,1);assert.ok(item.hint&&item.explanation&&item.source);}
 assert.equal(questionsForScope('t05').length,66);assert.equal(cardsForScope('t05').length,66);
 assert.equal(questionsForScope('all-course').length,expectedCatalog.questions);assert.equal(cardsForScope().length,expectedCatalog.cards);
 assert.equal(new Set(questionsForScope('all-course').map(q=>q.id)).size,expectedCatalog.questions);assert.equal(new Set(cardsForScope().map(c=>c.id)).size, expectedCatalog.cards);
});




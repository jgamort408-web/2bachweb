import { expectedCatalog } from "./helpers/catalog-expectations.mjs";
import test from 'node:test';
import assert from 'node:assert/strict';
import {inverseSystemPresets,inverseSystemDetails,generatedInverseSystem} from '../content/models/inverse-systems.js';
import {inverseDetails,fraction} from '../content/models/matrix-inverse.js';
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
function verify(a,b){
 const before=structuredClone({a,b}),m=inverseSystemDetails(a,b),r=rank(a),s=rank(a.map((row,i)=>[...row,b[i]]));
 assert.equal(m.ranks.kind,r!==s?'SI':r===a.length?'SCD':'SCI');
 if(r===a.length){assert.ok(m.solution);verifyExact(a,b,m.solution);assert.deepEqual(m.product,b.map(v=>fraction(v)));
  for(let j=0;j<a.length;j++)verifyExact(a,Array.from({length:a.length},(_,i)=>i===j?1:0),m.details.inverse.map(row=>row[j]));
 }else{assert.equal(m.solution,null);assert.equal(m.product,null);assert.equal(m.details.inverse,null);}
 assert.deepEqual({a,b},before);
 return m;
}
test('729 sistemas exhaustivos 2×2: rangos independientes y sustitución exacta',()=>{
 for(let code=0;code<729;code++){let n=code;const v=Array.from({length:6},()=>{const x=n%3-1;n=Math.floor(n/3);return x;});verify([v.slice(0,2),v.slice(2,4)],v.slice(4));}
});
test('6000 variantes de orden 2 y 3: tipos, inversas, exactitud y reproducibilidad',()=>{
 let fractions=0,negative=0;
 for(const n of [2,3])for(const kind of ['SCD','SCI','SI'])for(let seed=0;seed<1000;seed++){
  const s=generatedInverseSystem(seed,n,kind);assert.deepEqual(s,generatedInverseSystem(seed,n,kind));assert.ok([...s.a.flat(),...s.b].every(v=>Math.abs(v)<=9));
  const m=verify(s.a,s.b);assert.equal(m.ranks.kind,kind);if(m.details.det<0)negative++;if(m.solution?.some(v=>v.denominator>1))fractions++;
 }assert.ok(fractions>0&&negative>0);
});
test('ejemplos, B nulo/cambiante y práctica de ventas',()=>{
 const expected={integer:[fraction(1),fraction(2)],fractional:[fraction(2,3),fraction(-1,3)],three:[fraction(1),fraction(2),fraction(3)],homogeneous:[fraction(0),fraction(0)],dependent:null,impossible:null};
 for(const [key,s]of Object.entries(inverseSystemPresets))assert.deepEqual(verify(s.a,s.b).solution,expected[key]);
 const s=inverseSystemPresets.integer,m=inverseSystemDetails(s.a,[6,3]);assert.deepEqual(m.solution,[fraction(3),fraction(3)]);assert.deepEqual(m.details.inverse,inverseSystemDetails(s.a,s.b).details.inverse);
 // La práctica usa B fuera de los límites del editor; comprobar el cálculo didáctico por separado.
 const a=[[1,1],[2,3]],inv=inverseDetails(a).inverse;assert.deepEqual(inv,[[fraction(3),fraction(-1)],[fraction(-2),fraction(1)]]);
 verifyExact(a,[9,23],[fraction(4),fraction(5)]);assert.equal(3*9-23,4);assert.equal(-2*9+23,5);
 assert.notEqual(2*.67-.33,1);assert.notEqual(.67+2*(-.33),0);
});
test('validación de dimensiones, entradas y singularidad sin resultados obsoletos',()=>{
 const s=inverseSystemPresets.integer;
 for(const b of [null,[],[1],[1,2,3],[10,0],[1,.5],[1,NaN]])assert.throws(()=>inverseSystemDetails(s.a,b));
 for(const a of [[[1,0,0],[0,1,0]],[[1]],[[1,10],[0,1]],[[1,0],[0,NaN]],[[1,0],[1]]])assert.throws(()=>inverseSystemDetails(a,[0,0]));
 for(const [size,kind]of [[1,'SCD'],[4,'SCI'],[2,'other']])assert.throws(()=>generatedInverseSystem(1,size,kind));
 const singular=inverseSystemDetails([[0,0],[0,0]],[1,0]);assert.equal(singular.ranks.kind,'SI');assert.equal(singular.terms,null);
 const copy=inverseSystemDetails(s.a,s.b);copy.a[0][0]=9;assert.equal(s.a[0][0],1);
});
test('seis preguntas/tarjetas; t05 66/66 y catálogo 318/301 sin duplicados',()=>{
 const q=questionsForScope('t05-e07');assert.equal(q.length,6);assert.equal(cardsForScope('t05-e07').length,6);
 for(const item of q){assert.equal(new Set(item.options.map(o=>o.text)).size,4);assert.equal(item.options.filter(o=>o.id===item.correct).length,1);}
 assert.equal(questionsForScope('t05').length,66);assert.equal(cardsForScope('t05').length,66);
 assert.equal(questionsForScope('all-course').length,expectedCatalog.questions);assert.equal(cardsForScope().length,expectedCatalog.cards);
 assert.equal(new Set(questionsForScope('all-course').map(q=>q.id)).size,expectedCatalog.questions);assert.equal(new Set(cardsForScope().map(c=>c.id)).size, expectedCatalog.cards);
});




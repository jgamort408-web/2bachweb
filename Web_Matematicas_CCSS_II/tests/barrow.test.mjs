import { expectedCatalog } from "./helpers/catalog-expectations.mjs";
import test from 'node:test';
import assert from 'node:assert/strict';
import {barrowModel,barrowFamilies,rationalTex,generateBarrowModels,generateBarrowQuestions} from '../content/models/barrow.js';
import {questionsForScope,cardsForScope} from '../content/activities/catalog.js';
const close=(a,b,tol=1e-7)=>assert.ok(Math.abs(a-b)<tol,`${a} frente a ${b}`);
// Cuadratura independiente con nodos interiores; separa antes los saltos.
function integrate(f,a,b,n=80){
 const h=(b-a)/n;let sum=0;
 for(let i=0;i<n;i++){const m=a+(i+.5)*h,d=h/(2*Math.sqrt(3));sum+=h/2*(f(m-d)+f(m+d));}return sum;
}
test('225 configuraciones: dominio, orientación, constantes y extremos',()=>{
 let valid=0,invalid=0;
 for(const kind of Object.keys(barrowFamilies))for(const a of [-2,-1,0,1,2])for(const b of [-2,-1,0,1,2])for(const c of [-3,0,3]){
  const m=barrowModel(kind,a,b,c);
  if(kind==='reciprocal'&&(a*b<=0)){assert.equal(m.valid,false);assert.equal(m.value,undefined);invalid++;continue;}
  valid++;assert.equal(m.valid,true);close(m.value,integrate(m.family.value,a,b));
  close(m.fb-m.fa,m.value);close(m.value,barrowModel(kind,a,b,0).value);close(m.value,-barrowModel(kind,b,a,c).value);
 }
 assert.equal(valid,174);assert.equal(invalid,51);
 for(const args of [['__proto__',0,1],['linear',3,1],['linear','0',1],['linear',0,1,2]])assert.throws(()=>barrowModel(...args),RangeError);
 assert.equal(rationalTex(0,3),'0');assert.equal(rationalTex(-6,4),String.raw`-\frac{3}{2}`);assert.equal(rationalTex(6,-3),'-2');
});
test('6000 retos: cuadratura independiente, primitivas y cuatro respuestas distintas',()=>{
 const seen=new Set();
 for(let seed=0;seed<1000;seed++){
  const models=generateBarrowModels(seed);assert.equal(models.length,6);
  seen.add(models.map(m=>[m.f,m.a,m.b].join(':')).join('|'));
  for(const m of models){
   const expected=m.cut===undefined?integrate(m.integrand,m.a,m.b):integrate(m.integrand,m.a,m.cut)+integrate(m.integrand,m.cut,m.b);
   close(m.value,expected,1e-6);assert.equal(m.options.length,4);assert.equal(new Set(m.options.map(o=>o.text)).size,4);
   for(const o of m.options)assert.equal(Math.abs(o.value-expected)<1e-6,o.id==='correct');
   for(const x of [m.a+(m.b-m.a)*.23,m.a+(m.b-m.a)*.71]){
    if(Math.abs(x)<1e-5)continue;close((m.primitive(x+1e-5)-m.primitive(x-1e-5))/2e-5,m.integrand(x),1e-5);
   }
  }
 }
 assert.ok(seen.size>200,seen.size+' bancos diferentes');
 assert.deepEqual(generateBarrowQuestions(123),generateBarrowQuestions(123));
 for(const q of generateBarrowQuestions(1))assert.ok(q.prompt.includes('\\(')&&q.hint&&q.explanation.includes('\\('));
});
test('ejemplos de la lección: exactitud, áreas, orientación y coste marginal',()=>{
 close(integrate(x=>3*x*x-2*x+1,-1,2),9);
 close(integrate(x=>-2*x,1,3),-8);close(integrate(x=>-2*x,3,1),8);
 close(integrate(x=>1/(x+3),2,4),Math.log(7/5));
 close(integrate(x=>2*Math.exp(2*x),0,1),Math.exp(2)-1);
 close(integrate(x=>2*x+10,2,5),51);
 close(integrate(x=>x+1,0,1)+integrate(()=>3,1,2),4.5);
 close(integrate(x=>x-1,0,3),1.5);close(-integrate(x=>x-1,0,1)+integrate(x=>x-1,1,3),2.5);
 close(integrate(x=>2*x+3,-2,1),6);close(-integrate(x=>2*x+3,-2,-1.5)+integrate(x=>2*x+3,-1.5,1),6.5);
});
test('catálogo 318/301, tema 3 60/48, seis conceptos de Barrow y opciones únicas',()=>{
 assert.equal(questionsForScope('all-course').length,expectedCatalog.questions);assert.equal(cardsForScope().length,expectedCatalog.cards);
 assert.equal(questionsForScope('t03').length,60);assert.equal(cardsForScope('t03').length,48);
 assert.equal(questionsForScope('t03-e07').length,6);assert.equal(cardsForScope('t03-e07').length,6);
 for(const bank of [questionsForScope('all-course'),cardsForScope()])assert.equal(new Set(bank.map(q=>q.id)).size,bank.length);
 for(const q of questionsForScope('t03-e07')){assert.equal(q.options.filter(o=>o.id===q.correct).length,1);assert.equal(new Set(q.options.map(o=>o.text)).size,4);}
});



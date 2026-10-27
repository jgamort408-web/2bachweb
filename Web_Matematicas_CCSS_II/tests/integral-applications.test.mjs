import { expectedCatalog } from "./helpers/catalog-expectations.mjs";
import test from 'node:test';
import assert from 'node:assert/strict';
import {areaFamilies,areaModel,generateAreaQuestions,areaTex} from '../content/models/integral-applications.js';
import {questionsForScope,cardsForScope} from '../content/activities/catalog.js';
const close=(a,b,tol=1e-8)=>assert.ok(Math.abs(a-b)<tol,`${a} frente a ${b}`);
// Cuadratura exacta para polinomios de grado ≤3, independiente de las primitivas.
const gauss=(f,a,b)=>{const m=(a+b)/2,h=(b-a)/2;return h*(f(m-h/Math.sqrt(3))+f(m+h/Math.sqrt(3)));};
test('600 estados: tramos, áreas, orientación, escala y nombres intercambiados',()=>{
 let count=0;
 for(const kind of Object.keys(areaFamilies))for(const a of [-2,-1,0,1,2])for(const b of [-2,-1,0,1,2])for(const k of [1,2,3])for(const swap of [false,true]){
  const m=areaModel(kind,a,b,k,swap);count++;
  close(m.integral,gauss(x=>m.f(x)-m.g(x),a,b));
  let total=0;
  for(const t of m.segments){
   const mid=(t.left+t.right)/2;assert.equal(t.top,m.f(mid)>m.g(mid)?'f':'g');
   const contribution=gauss(x=>m.f(x)-m.g(x),t.left,t.right);
   close(t.contribution,contribution);close(t.area,Math.abs(contribution));total+=Math.abs(contribution);
   for(const weight of [.1,.5,.9]){const x=t.left+weight*(t.right-t.left);assert.ok((t.top==='f'?1:-1)*(m.f(x)-m.g(x))>=-1e-9);}
  }
  close(m.area,total);assert.ok(m.area>=0);close(m.area,areaModel(kind,b,a,k,swap).area);close(m.area,areaModel(kind,a,b,k,!swap).area);
  close(m.area,k*areaModel(kind,a,b,1,swap).area);
  for(const x of m.roots){assert.ok(x>=m.low&&x<=m.high);close(m.f(x),m.g(x));}
 }
 assert.equal(count,600);
 for(const args of [['__proto__',0,1],['cap',-3,1],['cap',0,'1'],['cap',0,1,0],['cap',0,1,1,1]])assert.throws(()=>areaModel(...args),RangeError);
 close(areaModel('crossing',-1,2).area,11/6);close(areaModel('crossing',-1,2).integral,1.5);
 assert.equal(areaTex(11/6),String.raw`\frac{11}{6}`);
});
test('6000 retos: única área correcta y fracciones sin redondeo en opciones',()=>{
 const seen=new Set();
 for(let seed=0;seed<1000;seed++){
  const qs=generateAreaQuestions(seed);assert.equal(qs.length,6);seen.add(qs.map(q=>q.prompt).join('|'));
  for(const q of qs){
   const m=q.model;let area=0;
   // Las raíces provienen de las igualdades de las familias; se contrastan f y g en cada tramo.
   for(const t of m.segments)area+=Math.abs(gauss(x=>m.f(x)-m.g(x),t.left,t.right));
   close(area,m.area);assert.equal(new Set(q.options.map(o=>o.value)).size,4);
   for(const o of q.options){
    assert.equal(Math.abs(o.value-area)<1e-8,o.id===q.correct);
    const raw=o.text.slice(2,-2),fraction=raw.match(/^(-?)\\frac\{(\d+)\}\{(\d+)\}$/);
    const parsed=fraction?(fraction[1]?-1:1)*Number(fraction[2])/Number(fraction[3]):Number(raw);
    close(parsed,o.value);
   }
   assert.ok(q.hint&&q.explanation.includes('\\('));
  }
 }
 assert.ok(seen.size>200);assert.deepEqual(generateAreaQuestions(3).map(q=>q.prompt),generateAreaQuestions(3).map(q=>q.prompt));
});
test('ejemplos locales y propios: áreas, datos iniciales y unidades coherentes',()=>{
 close(gauss(x=>-x*x+2*x+3,-1,3),32/3);
 close(gauss(x=>-x*x+2*x+1,0,1),5/3);
 close(areaModel('below',-2,2).area,4);close(areaModel('below',-2,2).integral,4/3);
 close(areaModel('crossing',0,1).area,1/6);close(areaModel('below',-1,1).area,4/3);
 close(gauss(x=>2-x*x-x,-2,1),4.5);
 close(20+gauss(t=>60-10*t,0,4),180);
 close(500+gauss(t=>20-10*t,0,4),500);close(500+gauss(t=>20-10*t,0,2),520);
 close(gauss(t=>20-10*t,0,2)-gauss(t=>20-10*t,2,4),40);
 // Cortes fuera del intervalo y extremos coincidentes no añaden regiones.
 assert.equal(areaModel('crossing',-2,-1).roots.length,0);assert.equal(areaModel('cap',1,1).segments.length,0);
});
test('catálogo 318/301, tema 3 60/48, seis preguntas y tarjetas de aplicaciones',()=>{
 assert.equal(questionsForScope('all-course').length,expectedCatalog.questions);assert.equal(cardsForScope().length,expectedCatalog.cards);
 assert.equal(questionsForScope('t03').length,60);assert.equal(cardsForScope('t03').length,48);
 assert.equal(questionsForScope('t03-e08').length,6);assert.equal(cardsForScope('t03-e08').length,6);
 for(const bank of [questionsForScope('all-course'),cardsForScope()])assert.equal(new Set(bank.map(q=>q.id)).size,bank.length);
 for(const q of questionsForScope('t03-e08')){assert.equal(new Set(q.options.map(o=>o.text)).size,4);assert.equal(q.options.filter(o=>o.id===q.correct).length,1);}
});



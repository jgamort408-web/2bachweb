import { expectedCatalog } from "./helpers/catalog-expectations.mjs";
import test from 'node:test';
import assert from 'node:assert/strict';
import {accumulationModel,accumulationFamilies} from '../content/models/fundamental-calculus.js';
import {questionsForScope,cardsForScope} from '../content/activities/catalog.js';
const close=(a,b,tol=1e-8)=>assert.ok(Math.abs(a-b)<tol,`${a} frente a ${b}`);
// Cuadratura independiente: dos nodos interiores por tramo, exacta para los polinomios de grado ≤2.
function integral(f,a,b){
 if(a===b)return 0;const l=Math.min(a,b),r=Math.max(a,b),cuts=l<0&&r>0?[l,0,r]:[l,r];let sum=0;
 for(let i=0;i<cuts.length-1;i++){const mid=(cuts[i]+cuts[i+1])/2,half=(cuts[i+1]-cuts[i])/2;sum+=half*(f(mid-half/Math.sqrt(3))+f(mid+half/Math.sqrt(3)));}return Math.sign(b-a)*sum;
}
const derivative=(f,x)=>(f(x+1e-6)-f(x-1e-6))/2e-6;
test('324 estados: acumulación por cuadratura independiente, pendientes y dato inicial',()=>{
 let count=0;
 for(const kind of Object.keys(accumulationFamilies))for(const a of [-1,0,1])for(let i=-4;i<=4;i++)for(const h of [.5,.1,.01]){
  const x=i/2,m=accumulationModel(kind,a,x,h);count++;close(m.y,integral(m.family.value,a,x));close(m.accumulation(a),0);
  close(m.left,integral(m.family.value,a,x-h));close(m.right,integral(m.family.value,a,x+h));close(m.leftSlope,integral(m.family.value,x-h,x)/h);close(m.rightSlope,integral(m.family.value,x,x+h)/h);
  if(kind==='jump'&&x===0){assert.equal(m.slope,null);close(m.leftSlope,-1);close(m.rightSlope,1);}
  else {close(m.slope,m.family.value(x));close(derivative(m.accumulation,x),m.slope,1e-6);}
 }
 assert.equal(count,324);
 for(const args of [['bad',0,0,.1],['__proto__',0,0,.1],['line',2,0,.1],['line',0,2.5,.1],['line',0,.2,.1],['line',0,'1',.1],['line',0,0,0]])assert.throws(()=>accumulationModel(...args),RangeError);
});
test('secantes: convergencia, origen que no altera pendientes y contraejemplo simétrico',()=>{
 for(const kind of Object.keys(accumulationFamilies))for(let i=-4;i<=4;i++){
  const x=i/2;let previous=Infinity;
  for(const h of [.5,.1,.01]){
   const m=accumulationModel(kind,0,x,h);
   for(const a of [-1,1]){const shifted=accumulationModel(kind,a,x,h);close(shifted.leftSlope,m.leftSlope);close(shifted.rightSlope,m.rightSlope);close(shifted.y-m.y,-accumulationFamilies[kind].base(a));}
   if(m.slope!==null){const error=Math.max(Math.abs(m.leftSlope-m.slope),Math.abs(m.rightSlope-m.slope));assert.ok(error<=previous+1e-10);previous=error;}
   else {close((m.right-m.left)/(2*h),0);assert.notEqual(m.leftSlope,m.rightSlope);}
  }
 }
 close(accumulationModel('absolute',0,0,.01).slope,0);close(accumulationModel('absolute',0,0,.01).leftSlope,.005);
});
test('ejemplos, extremos, condición inicial, cadena y límite inferior',()=>{
 const A=x=>x*x+3*x-4,B=x=>x**3/3-x,V=t=>10+t*t-4*t,P=x=>x*x/2-3*x+4;
 for(const x of [-2,-.5,0,.5,2]){close(derivative(A,x),2*x+3);close(derivative(B,x),x*x-1);close(derivative(P,x),x-3);close(derivative(t=>Math.sin(t*t),x),2*x*Math.cos(x*x));close(derivative(t=>Math.sin(1)-Math.sin(t),x),-Math.cos(x));}
 close(A(1),0);close(B(-1),2/3);close(B(1),-2/3);close(P(2),0);close(P(3),-.5);
 for(let t=0;t<=4;t+=.1)assert.ok(V(t)>=6-1e-9);close(V(0),10);close(V(2),6);close(V(4),10);close(derivative(V,1),-2);
 // e^(-t²): calcular su acumulación por Simpson, no a partir de una primitiva precargada.
 const G=x=>{const n=200,h=x/n;let s=1+Math.exp(-x*x);for(let i=1;i<n;i++)s+=(i%2?4:2)*Math.exp(-((i*h)**2));return s*h/3;};
 for(const x of [-1,0,.7])close(derivative(G,x),Math.exp(-x*x),1e-7);
 // Cambiar un valor aislado conserva A=x; la igualdad con f(0)=7 falla.
 const removable=t=>t===0?7:1;close(integral(removable,-1,1),2);close(derivative(x=>x,0),1);assert.notEqual(1,removable(0));
});
test('bancos 318/301: seis preguntas y tarjetas, tema 3 de 60 preguntas y 48 tarjetas e IDs únicos',()=>{
 assert.equal(questionsForScope('t03-e06').length,6);assert.equal(cardsForScope('t03-e06').length,6);assert.equal(questionsForScope('t03').length,60);assert.equal(cardsForScope('t03').length,48);assert.equal(questionsForScope('all-course').length,expectedCatalog.questions);assert.equal(cardsForScope().length,expectedCatalog.cards);
 for(const bank of [questionsForScope('all-course'),cardsForScope()])assert.equal(new Set(bank.map(q=>q.id)).size,bank.length);
 for(const q of questionsForScope('t03-e06')){assert.equal(q.options.filter(o=>o.id===q.correct).length,1);assert.equal(new Set(q.options.map(o=>o.text)).size,4);assert.ok(q.hint&&q.explanation);}
});



import { expectedCatalog } from "./helpers/catalog-expectations.mjs";
import test from 'node:test';
import assert from 'node:assert/strict';
import {questionsForScope,cardsForScope} from '../content/activities/catalog.js';
const close=(a,b,tol=1e-7)=>assert.ok(Math.abs(a-b)<tol,`${a} frente a ${b}`);
const derivative=(f,x)=>(f(x+1e-5)-f(x-1e-5))/2e-5;
const simpson=(f,a,b)=>{const n=200,h=(b-a)/n;let sum=f(a)+f(b);for(let i=1;i<n;i++)sum+=(i%2?4:2)*f(a+i*h);return sum*h/3;};
test('repaso de integrales: 12 ítems, 8 epígrafes, 60 preguntas distintas y 48 tarjetas',()=>{
 const all=questionsForScope('all-course'),bank=questionsForScope('t03'),review=questionsForScope('review-t03');
 assert.equal(all.length,expectedCatalog.questions);assert.equal(cardsForScope().length,expectedCatalog.cards);assert.equal(bank.length,60);assert.equal(cardsForScope('t03').length,48);assert.equal(review.length,12);
 assert.equal(new Set(bank.map(q=>q.id)).size,60);assert.equal(new Set(bank.map(q=>q.prompt)).size,60);assert.equal(new Set(review.flatMap(q=>q.lessonIds)).size,8);
 for(const q of review){assert.ok(bank.includes(q));assert.equal(new Set(q.options.map(o=>o.text)).size,4);assert.equal(q.options.filter(o=>o.id===q.correct).length,1);assert.ok(q.hint&&q.explanation&&q.options.every(o=>o.feedback));}
 for(let i=1;i<=8;i++){assert.equal(questionsForScope('t03-e0'+i).length,6);assert.equal(cardsForScope('t03-e0'+i).length,6);}
 assert.equal(questionsForScope('t01').length,60);assert.equal(questionsForScope('t02').length,60);
});
test('compatibilidad, logaritmos equivalentes, cambio de límites y producto completo',()=>{
 const F=x=>x*x+1;close(F(0),1);close(F(1),2);close(simpson(x=>2*x,0,1),1);assert.notEqual(F(1)-F(0),3-1);
 const P=x=>2*Math.log(x*x+1),Q=x=>Math.log((x*x+1)**2);
 for(const x of [-3,-1,-.2,0,.5,2]){close(P(x),Q(x));close(derivative(P,x),4*x/(x*x+1));close(derivative(Q,x),4*x/(x*x+1));}
 close(simpson(x=>2*x/(1+x*x),0,1),Math.log(2));close(simpson(u=>1/u,1,2),Math.log(2));
 close(simpson(x=>(x+1)*Math.exp(x),0,1),Math.E);
 for(const x of [-1,0,.5,1])close(derivative(t=>t*Math.exp(t),x),(x+1)*Math.exp(x));
 // Una función concreta continua que cumple las dos integrales suministradas.
 const f=x=>-11*x/15+67/30;close(simpson(f,0,2),3);close(simpson(f,2,5),-1);close(simpson(x=>2*f(x)-1,5,0),1);
});
test('almacén por tramos: continuidad, acumulación, máximo y variación total',()=>{
 const r=t=>t<=3?4-2*t:-2,Q=t=>t<=3?20+4*t-t*t:29-2*t;
 close(Q(0),20);close(Q(3),23);close(29-2*3,23);close(Q(5),19);close(Q(2),24);
 close(simpson(r,0,3)+simpson(r,3,5),-1);
 close(simpson(r,0,2)-simpson(r,2,3)-simpson(r,3,5),9);
 for(let i=0;i<=500;i++){const t=i/100;assert.ok(Q(t)>=19-1e-9&&Q(t)<=24+1e-9);if(Math.abs(t-3)>.01)close(derivative(Q,t),r(t));}
 close((Q(3)-Q(3-1e-5))/1e-5,-2,2e-5);close((Q(3+1e-5)-Q(3))/1e-5,-2,2e-5);
});
test('áreas: función común, contacto sin cruce, parámetro y no negatividad',()=>{
 const f=x=>x*x+2,g=x=>2*x+2,p=x=>x**3-7;
 close(simpson(x=>g(x)-f(x),0,2),4/3);close(simpson(x=>(g(x)+p(x))-(f(x)+p(x)),0,2),4/3);
 for(const x of [0,.5,1,1.5,2])close((g(x)+p(x))-(f(x)+p(x)),g(x)-f(x));
 close(simpson(x=>(x-1)**2,0,2),2/3);assert.ok((.9-1)**2>0&&(1.1-1)**2>0);
 const k=1;close(simpson(x=>x-k,0,2),0);close(-simpson(x=>x-k,0,1)+simpson(x=>x-k,1,2),1);
 // El criterio continuo no negativo se demuestra en el texto, no por muestreo.
 // Dos contraejemplos muestran por qué no se pueden omitir sus hipótesis.
 close(simpson(x=>x-.5,0,1),0);
 const isolated=x=>x===.5?1:0;assert.equal(isolated(.5),1);assert.equal(isolated(.5+1e-8),0);
});



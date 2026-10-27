import { expectedCatalog } from "./helpers/catalog-expectations.mjs";
import test from 'node:test';
import assert from 'node:assert/strict';
import {definiteModel,definiteFamilies} from '../content/models/definite-integrals.js';
import {questionsForScope,cardsForScope} from '../content/activities/catalog.js';
const close=(a,b)=>assert.ok(Math.abs(a-b)<1e-9,`${a} frente a ${b}`);
const primitive={constant:x=>2*x,line:x=>x*x/2-x,valley:x=>x*Math.abs(x)/2-x};
const absolutePrimitive={constant:x=>2*x,line:x=>(x-1)*Math.abs(x-1)/2,valley:x=>{const r=Math.abs(x);return Math.sign(x)*(r<=1?r-r*r/2:r*r/2-r+1);}};
test('588 estados: geometría exacta contrastada con primitivas independientes y orientación',()=>{
 let count=0;
 for(const kind of Object.keys(definiteFamilies))for(let a=-3;a<=3;a++)for(let b=-3;b<=3;b++)for(const n of [4,8,16,32]){
  const m=definiteModel(kind,a,b,n);count++;
  const integral=primitive[kind](b)-primitive[kind](a),area=absolutePrimitive[kind](m.high)-absolutePrimitive[kind](m.low);
  close(m.integral,integral);close(m.area,area);close(m.positive+m.negative,area);close(m.positive-m.negative,primitive[kind](m.high)-primitive[kind](m.low));
  close(definiteModel(kind,b,a,n).integral,-m.integral);close(definiteModel(kind,b,a,n).area,m.area);
  assert.ok(m.area>=Math.abs(m.integral));
  for(const s of m.segments){assert.ok(s.right>s.left);assert.ok(s.yLeft*s.yRight>=0);close(s.area,Math.abs(s.contribution));assert.ok(!(s.left<0&&s.right>0&&kind==='valley'));}
  if(a===b){assert.equal(m.integral,0);assert.equal(m.area,0);assert.deepEqual(m.rectangles,[]);assert.deepEqual(m.segments,[]);}
 }
 assert.equal(count,588);for(const args of [['missing',0,1,4],['__proto__',0,1,4],['line',.5,1,4],['line',0,4,4],['line',0,1,7]])assert.throws(()=>definiteModel(...args),RangeError);
});
test('rectángulos: puntos medios, error y convergencia; exactitud de rectas no generalizable',()=>{
 for(const kind of Object.keys(definiteFamilies))for(let a=-3;a<=3;a++)for(let b=-3;b<=3;b++){
  let previousError=Infinity;
  for(const n of [4,8,16,32]){
   const m=definiteModel(kind,a,b,n),h=(m.high-m.low)/n;
   const independent=a===b?0:Math.sign(b-a)*Array.from({length:n},(_,i)=>definiteFamilies[kind].value(m.low+(i+.5)*h)*h).reduce((x,y)=>x+y,0);
   close(m.approximation,independent);close(m.error,Math.abs(m.approximation-m.integral));assert.ok(m.error<=previousError+1e-10);previousError=m.error;
   if(kind!=='valley')close(m.error,0);
   else assert.ok(m.error<=h*h/4+1e-10);
   if(a!==b)assert.equal(m.rectangles.length,n);
  }
 }
 assert.ok(definiteModel('valley',-2,3,4).error>0);assert.ok(definiteModel('valley',-2,3,32).error<definiteModel('valley',-2,3,4).error);
});
test('propiedades y ejemplos geométricos: aditividad, linealidad, signo, compensación y unidades',()=>{
 for(const kind of Object.keys(definiteFamilies))for(let a=-3;a<=3;a++)for(let b=-3;b<=3;b++)for(let c=-3;c<=3;c++)close(definiteModel(kind,a,b).integral,definiteModel(kind,a,c).integral+definiteModel(kind,c,b).integral);
 const m=definiteModel('line',0,3);close(m.positive,2);close(m.negative,.5);close(m.integral,1.5);close(m.area,2.5);
 close(definiteModel('line',3,0).integral,-1.5);close(definiteModel('valley',-2,2).integral,0);close(definiteModel('valley',-2,2).area,2);
 // Rectángulos y triángulos de los ejemplos y de la práctica.
 close(3*(4-1),9);close(-2*(3-0),-6);close(.5*2*2-.5*2*2,0);close(.5*2*2+.5*2*2,4);
 close(-2*2+3*2,2);close(20+(-2*2+3*2),22);close(2*2+3*2,10);close(2+(-1),1);close(2*3-(-2),8);
 // Verificación de linealidad mediante cuadratura independiente para 2f−g.
 const steps=10000,a=-2,b=3,h=(b-a)/steps;
 let sum=0;for(let i=0;i<steps;i++){const x=a+(i+.5)*h;sum+=(2*definiteFamilies.line.value(x)-definiteFamilies.valley.value(x))*h;}
 close(sum,2*definiteModel('line',a,b).integral-definiteModel('valley',a,b).integral);
});
test('bancos 318/301: seis preguntas y tarjetas, tema 3 de 60 preguntas y 48 tarjetas e identificadores únicos',()=>{
 assert.equal(questionsForScope('t03-e05').length,6);assert.equal(cardsForScope('t03-e05').length,6);assert.equal(questionsForScope('t03').length,60);assert.equal(cardsForScope('t03').length,48);assert.equal(questionsForScope('all-course').length,expectedCatalog.questions);assert.equal(cardsForScope().length,expectedCatalog.cards);
 for(const bank of [questionsForScope('all-course'),cardsForScope()])assert.equal(new Set(bank.map(q=>q.id)).size,bank.length);
 for(const q of questionsForScope('t03-e05')){assert.equal(q.options.filter(o=>o.id===q.correct).length,1);assert.equal(new Set(q.options.map(o=>o.text)).size,4);assert.ok(q.hint&&q.explanation);}
});



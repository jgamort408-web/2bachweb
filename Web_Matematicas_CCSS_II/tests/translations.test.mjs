import { expectedCatalog } from "./helpers/catalog-expectations.mjs";
import test from 'node:test';
import assert from 'node:assert/strict';
import { translationModel, translationFamilies, translatedLine } from '../content/models/translations.js';
import { questionsForScope, cardsForScope } from '../content/activities/catalog.js';

test('36 traslaciones: puntos correspondientes, dominio, pendientes y forma', () => {
  let count = 0;
  for (const kind of Object.keys(translationFamilies)) for (const a of [-2, 0, 2]) for (const k of [-2, 0, 2]) {
    const m = translationModel(kind, a, k), f = translationFamilies[kind].value; count++;
    for (const u of translationFamilies[kind].samples) {
      const [x,y] = m.point(u);
      assert.equal(x, u+a); assert.equal(y, f(u)+k); assert.ok(Math.abs(m.value(x)-y)<1e-12); assert.equal(m.inDomain(x),true);
      const d=1e-5;
      const before=(f(u+d)-f(u-d))/(2*d), after=(m.value(x+d)-m.value(x-d))/(2*d);
      assert.ok(Math.abs(before-after)<1e-7);
    }
    if (['reciprocal','logarithm'].includes(kind)) {
      assert.equal(m.vertical,a); assert.equal(m.inDomain(a),false); assert.ok(Number.isNaN(m.value(a)));
      assert.equal(m.inDomain(a-1),kind==='reciprocal');
    } else {assert.deepEqual(m.minimum,[a,k]); assert.equal(m.value(a),k);}
    if (kind==='reciprocal') {assert.equal(m.horizontal,k); assert.ok(Math.abs(m.value(1e8)-k)<2e-8);}
  }
  assert.equal(count,36); assert.throws(()=>translationModel('invalid',0,0),RangeError);
  assert.throws(()=>translationModel('square',NaN,0),RangeError);
});
test('estudios y práctica: cortes, vértices y traslación de intervalos', () => {
  const g=translationModel('square',2,-3); assert.equal(g.value(0),1); assert.deepEqual(g.minimum,[2,-3]);
  for(const x of [2-Math.sqrt(3),2+Math.sqrt(3)]) assert.ok(Math.abs(g.value(x))<1e-12);
  const r=translationModel('reciprocal',-2,1); assert.equal(r.value(-3),0); assert.equal(r.value(0),1.5);
  const s=translationModel('logarithm',2,1); assert.ok(Math.abs(s.value(2+Math.exp(-1)))<1e-12); assert.equal(s.inDomain(0),false);
  const v=translationModel('absolute',-1,-2); assert.equal(v.value(-3),0); assert.equal(v.value(1),0); assert.equal(v.value(0),-1);
  for(const x of [1.99,2,4,6.99,7]) assert.equal(x-3>=-1 && x-3<4,x>=2 && x<7);
  for(const y of [-0.01,0,0.01,7,7.01]) assert.equal(y-2>-2 && y-2<=5,y>0 && y<=7);
});
test('composición de traslaciones y asíntota oblicua', () => {
  const f=x=>x+1+1/x;
  const line=translatedLine(1,1,2,-3); assert.deepEqual(line,{slope:1,intercept:-4});
  for(const x of [-1e6,1e6]) assert.ok(Math.abs((f(x-2)-3)-(line.slope*x+line.intercept))<2e-6);
  for(const kind of Object.keys(translationFamilies)) {
    const f=translationFamilies[kind].value, combined=translationModel(kind,1,-1);
    for(const u of translationFamilies[kind].samples) {
      const x=u+1;
      // Primero (2,3), después (−1,−4): suma (1,−1).
      assert.ok(Math.abs((f((x+1)-2)+3-4)-combined.value(x))<1e-12);
    }
  }
});
test('banco de traslaciones: seis preguntas y tarjetas, total 318/301', () => {
  assert.equal(questionsForScope('t02-e07').length,6); assert.equal(cardsForScope('t02-e07').length,6);
  assert.equal(questionsForScope('t02').length,60); assert.equal(cardsForScope('t02').length,54);
  assert.equal(questionsForScope('t01').length,60); assert.equal(cardsForScope('t01').length,61);
  assert.equal(questionsForScope('all-course').length,expectedCatalog.questions); assert.equal(cardsForScope().length,expectedCatalog.cards);
  for(const q of questionsForScope('t02-e07')) {assert.equal(q.options.filter(o=>o.id===q.correct).length,1);assert.ok(q.hint&&q.explanation&&q.options.every(o=>o.feedback));}
});



import { test } from 'node:test';
import assert from 'node:assert/strict';
import { generateRepairSession, analyzeRepair, parseAnswer } from '../widgets/games/t01-b-continuidad-repara-la-funcion/generator.js';

test('6000 funciones: laterales, diagnóstico, reparación única y variedad', () => {
  const diagnoses = new Set();
  for (let seed=0; seed<1000; seed++) {
    const rounds=generateRepairSession(seed);
    assert.equal(rounds.length,6);
    assert.deepEqual(rounds,generateRepairSession(seed));
    assert.equal(new Set(rounds.map(q=>q.kind)).size,4);
    for (const q of rounds) {
      const value=q.a*q.a+q.c, b=value-q.m*q.a;
      assert.ok(q.m!==0 && Math.abs(b)<=30 && Math.abs(value)<=30);
      const initial=analyzeRepair(q);
      const expected=['jump','both'].includes(q.kind)?'jump':q.kind==='removable'?'removable':'continuous';
      assert.equal(initial.diagnosis,expected);
      diagnoses.add(initial.diagnosis);
      // Evaluación independiente de las ramas originales a ambos lados.
      for (const h of [1e-4,1e-6]) {
        assert.ok(Math.abs(q.m*(q.a-h)+q.b-initial.left)<=3.01*h);
        assert.ok(Math.abs((q.a+h)**2+q.c-initial.right)<=4.01*h);
      }
      assert.equal(analyzeRepair(q,b,value).diagnosis,'continuous');
      assert.equal(analyzeRepair(q,b+1,value).diagnosis,'jump');
      assert.equal(analyzeRepair(q,b,value-1).diagnosis,'removable');
      assert.equal(q.targetB,b);
      assert.equal(q.targetValue,value);
    }
  }
  assert.equal(diagnoses.size,3);
});
test('entradas numéricas: coma, negativos, blanco e inválidos', () => {
  for (const [text,value] of [['0',0],[' -2 ',-2],['+3',3],['1,5',1.5],['.5',.5],['-0,5',-.5],['2.',2]]) {
    assert.equal(parseAnswer(text),value);
  }
  for (const text of ['', ' ', 'NaN','Infinity','1e3','1/2','2+3','--2','1,2.3','0x10']) assert.equal(parseAnswer(text),null);
});
test('problemas integrados: parámetros, tangente y distancia', () => {
  // Diferencias incrementales desde las funciones, sin usar sus fórmulas derivadas.
  const subida=(x)=>x<0?1/(x-1):x*x-x-1;
  const recuperacion=(x)=>x<=1?10*x-3*x*x:2*x*x+5;
  for (const h of [-1e-6,1e-6]) {
    assert.ok(Math.abs((subida(h)-subida(0))/h+1)<2e-6);
    assert.ok(Math.abs((recuperacion(1+h)-recuperacion(1))/h-4)<4e-6);
  }
  const f=x=>2*x*x-2, tangent=x=>8*x-10;
  assert.equal(f(2),tangent(2));
  for (const h of [-.01,.01]) assert.ok(Math.abs(f(2+h)-tangent(2+h)-2*h*h)<1e-12);
  const distance=t=>100/(t*t+1);
  assert.equal(distance(0),100);
  assert.equal(distance(2),20);
  assert.ok(distance(1e6)>0 && distance(1e6)<1e-9);
});

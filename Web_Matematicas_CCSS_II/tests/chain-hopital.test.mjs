import { test } from 'node:test';
import assert from 'node:assert/strict';
import { continuityValue, continuitySlope } from '../assets/js/learning/continuity-explorer.js';

test('comparador: cocientes calculados con el valor real en el punto', () => {
  for (const kind of ['smooth', 'corner', 'jump', 'isolated']) {
    for (const h of [-0.1, -0.01, -0.001, -0.0001, 0.0001, 0.001, 0.01, 0.1]) {
      const direct = (continuityValue(kind, h) - continuityValue(kind, 0)) / h;
      assert.ok(Math.abs(direct - continuitySlope(kind, h)) < 1e-9);
    }
  }
  assert.equal(continuityValue('isolated', 0), 1);
  assert.equal(continuityValue('isolated', 0.0001), 1e-8);
  assert.equal(continuitySlope('corner', -0.0001), -1);
  assert.equal(continuitySlope('corner', 0.0001), 1);
  assert.ok(continuitySlope('jump', -0.0001) > 10000);
  assert.throws(() => continuitySlope('smooth', 0), RangeError);
});

test('cadena: cinco derivadas del examen y una composición adicional', () => {
  const cases = [
    { f: (x) => ((3*x*x-5)/(2*x+3))**3, d: (x) => 3*(3*x*x-5)**2*(6*x*x+18*x+10)/(2*x+3)**4, xs: [-2,-1,0,0.4,1] },
    { f: (x) => Math.sin(x)**2, d: (x) => 2*Math.sin(x)*Math.cos(x), xs: [-1,0,0.4,1] },
    { f: (x) => Math.exp(3*x*x-x+2), d: (x) => (6*x-1)*Math.exp(3*x*x-x+2), xs: [-1,0,0.4,1] },
    { f: (x) => Math.cos(x*x+2*x), d: (x) => -(2*x+2)*Math.sin(x*x+2*x), xs: [-1,0,0.4,1] },
    { f: (x) => x*x/Math.sqrt(1+2*Math.log(x)), d: (x) => x*(1+4*Math.log(x))/(1+2*Math.log(x))**1.5, xs: [0.7,1,2,3] },
    { f: (x) => Math.log1p(Math.exp(x*x)), d: (x) => 2*x*Math.exp(x*x)/(1+Math.exp(x*x)), xs: [-1,0,0.4,1] },
  ];
  for (const { f, d, xs } of cases) for (const x of xs) {
    const h=1e-6, central=(f(x+h)-f(x-h))/(2*h);
    assert.ok(Math.abs(central-d(x)) < 1e-6*Math.max(1,Math.abs(d(x))), 'x='+x);
  }
});

test('límites: potencia del examen, repetición y producto transformado', () => {
  let previous = Infinity;
  for (const x of [10,100,1000,10000]) {
    // log1p conserva precisión cerca de 1 sin alterar la expresión matemática.
    const logarithm = x*Math.log1p(-1/(x*x)), original=Math.exp(logarithm);
    assert.ok(logarithm<0 && original<1);
    assert.ok(1-original<previous);
    previous=1-original;
  }
  assert.ok(previous<0.000101);
  for (const h of [-0.001,-0.0001,0.0001,0.001]) {
    assert.ok(Math.abs((Math.expm1(h)-h)/(h*h)-0.5)<0.0002);
    // Identidad del ángulo mitad, evitando cancelación de 1-cos(h).
    assert.ok(Math.abs(2*Math.sin(h/2)**2/(h*h)-0.5)<1e-6);
  }
  assert.ok(Math.abs(1e-8*Math.log(1e-8))<2e-7);
});

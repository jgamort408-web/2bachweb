import {test} from 'node:test';
import assert from 'node:assert/strict';
import {generateTangentSession,polynomialValue,parseNumber,sameLine,polynomialTex} from '../widgets/games/t01-d-tangente-sprint/generator.js';

test('6000 retos: valores, pendientes, rectas y casos horizontales/verticales',()=>{
  for(let seed=0;seed<1000;seed++){
    const rounds=generateTangentSession(seed);
    assert.deepEqual(rounds,generateTangentSession(seed));
    assert.equal(rounds.length,6);
    assert.equal(rounds.filter(q=>q.line.type==='vertical').length,1);
    assert.equal(rounds.filter(q=>q.kind==='tangent'&&q.slope===0).length,1);
    for(const q of rounds){
      const f=x=>polynomialValue(q.coefficients,x);
      assert.equal(f(q.a),q.y);
      for(const h of [1e-4,1e-5]){
        const derivative=(f(q.a+h)-f(q.a-h))/(2*h);
        assert.ok(Math.abs(derivative-q.slope)<2e-7);
      }
      if(q.line.type==='vertical'){
        assert.equal(q.slope,0);assert.equal(q.line.x,q.a);
        assert.equal(sameLine({type:'ordinary',m:0,b:q.y},q.line),false);
      }else{
        assert.equal(q.line.m*q.a+q.line.b,q.y);
        if(q.kind==='normal')assert.equal(q.slope*q.line.m,-1);
        else assert.equal(q.line.m,q.slope);
        assert.ok(Math.abs(q.line.m)<=4&&Math.abs(q.line.b)<=10);
        assert.equal(q.line.m*2,Math.round(q.line.m*2));
        assert.equal(q.line.b*2,Math.round(q.line.b*2));
        assert.equal(sameLine({...q.line,b:q.line.b+.5},q.line),false);
      }
      assert.equal(sameLine({...q.line},q.line),true);
    }
  }
});
test('fracciones equivalentes, coma decimal y rechazo de expresiones inválidas',()=>{
  for(const [text,value] of [['2/4',.5],['-1/2',-.5],['1/-2',-.5],[' 1,5 / 3 ',.5],['+2',2],['.5',.5],['-0',-0]])
    assert.equal(parseNumber(text),value);
  for(const text of ['', ' ', '1/0', '0/0', '1e3','2+3','NaN','Infinity','1/2/3','--1'])assert.equal(parseNumber(text),null);
  assert.equal(sameLine({type:'ordinary',m:parseNumber('2/4'),b:parseNumber('1,5')},{type:'ordinary',m:.5,b:1.5}),true);
  assert.equal(polynomialTex([0,-1,0,1]),'x^{3}-x');
  assert.equal(polynomialTex([0,0]),'0');
});

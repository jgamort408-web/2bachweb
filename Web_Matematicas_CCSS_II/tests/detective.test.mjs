import { test } from 'node:test';
import assert from 'node:assert/strict';
import { generateDetectiveSession } from '../widgets/games/t01-c-derivada-detective/generator.js';

function value(model,x) {
  if(model.type==='monomial')return model.coefficient*x**model.exponent;
  if(model.type==='exp-linear')return (model.slope*x+model.intercept)*Math.exp(model.k*x);
  if(model.type==='composed-power')return model.coefficient*(model.m*x+model.b)**model.exponent;
  if(model.type==='rational'){
    const [a,b,c]=model.coefficients;
    return (a*x*x+b*x+c)/(x-model.b)**model.denominatorPower;
  }
  throw new Error('Modelo desconocido');
}
function original(question,x) {
  const p=question.parameters;
  if(question.family==='power')return p.a*x**p.n;
  if(question.family==='product')return (x+p.a)*Math.exp(p.k*x);
  if(question.family==='quotient')return (x*x+p.c)/(x-p.b);
  if(question.family==='chain')return (p.m*x+p.b)**p.n;
  return p.k*Math.abs(x-p.a);
}
test('1000 sesiones: 8000 casos, 13000 decisiones y alternativas inequívocas',()=>{
  const firstErrors=new Set();
  for(let seed=0;seed<1000;seed++){
    const questions=generateDetectiveSession(seed);
    assert.deepEqual(questions,generateDetectiveSession(seed));
    assert.equal(questions.length,13);
    assert.equal(new Set(questions.map(q=>q.caseNumber)).size,8);
    assert.equal(new Set(questions.map(q=>q.id)).size,13);
    for(const q of questions){
      assert.equal(q.options.length,4);
      assert.equal(new Set(q.options.map(o=>o.text)).size,4);
      assert.equal(q.options.filter(o=>o.id===q.correct).length,1);
      assert.ok(q.explanation && q.hint && q.options.every(o=>o.feedback));
      if(q.stage==='error'){
        assert.equal(q.steps.length,4);
        assert.equal(q.options.findIndex(o=>o.id===q.correct)+1,q.parameters.errorStep);
        firstErrors.add(q.family+q.parameters.errorStep);
      }
      if(q.stage!=='derivative'||q.family==='lateral')continue;
      // Comparación con diferencias centrales de la función original;
      // los distractores deben fallar como funciones, no solo como cadenas.
      const matches=q.options.filter(option=>[-2.3,-.4,.6,1.7,3.2].every(x=>{
        const h=1e-5, numeric=(original(q,x+h)-original(q,x-h))/(2*h);
        return Math.abs(value(option.model,x)-numeric)<2e-5*(1+Math.abs(numeric));
      }));
      assert.deepEqual(matches.map(o=>o.id),[q.correct],q.id+' semilla '+seed);
    }
  }
  assert.equal(firstErrors.size,12,'Tres familias con primer error en cualquiera de los cuatro pasos');
});
test('esquina: continuidad y derivadas laterales desde cocientes incrementales',()=>{
  for(let seed=0;seed<100;seed++){
    const q=generateDetectiveSession(seed).find(q=>q.family==='lateral'&&q.stage==='derivative');
    const {a,k}=q.parameters;
    assert.equal(original(q,a),0);
    for(const h of [-1e-4,1e-4]){
      const difference=(original(q,a+h)-original(q,a))/h;
      assert.ok(Math.abs(difference-Math.sign(h)*k)<1e-8);
      assert.ok(original(q,a+h)<.001);
    }
  }
});

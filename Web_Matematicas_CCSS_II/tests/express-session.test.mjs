import {test} from 'node:test';
import assert from 'node:assert/strict';
import {makeRound,ExpressSession} from '../widgets/games/t01-a-limite-express/session.js';

test('1000 semillas: 20.000 rondas normales/especiales, alternativas y gráficas',()=>{
  const families=new Set(),sides=new Set();
  for(let seed=0;seed<1000;seed++)for(let index=0;index<10;index++)for(const boss of [false,true]){
    const q=makeRound(seed,index,boss);
    assert.deepEqual(q,makeRound(seed,index,boss));
    assert.equal(q.options.length,4);
    assert.equal(new Set(q.options.map(o=>o.text)).size,4);
    assert.equal(q.options.filter(o=>o.id===q.correct).length,1);
    assert.ok(q.hint&&q.explanation);
    families.add(q.family);
    if(q.family==='polynomial'){
      const p=q.parameters;
      assert.equal(p.coefficients.reduceRight((sum,c)=>sum*p.a+c,0),q.answer);
    }else if(q.graph){
      const p=q.graph;sides.add(p.side);
      const expected=p.side==='left'?p.left:p.side==='right'?p.right:p.left===p.right?p.left:'No existe';
      assert.equal(q.answer,expected);assert.notEqual(p.point,p.left);assert.notEqual(p.point,p.right);
      for(const h of [1e-4,1e-6]){
        assert.ok(Math.abs(p.left-p.leftSlope*h-p.left)<=1.01*h);
        assert.ok(Math.abs(p.right+p.rightSlope*h-p.right)<=1.01*h);
      }
    }else if(q.family==='method'){
      assert.ok([2,4,7,8].includes(q.sourceFamily));
      assert.equal(q.answer,q.options.find(o=>o.id===q.correct).value);
    }
    if(boss)assert.ok([2,7,8,'method'].includes(q.family));
  }
  for(const family of [1,2,3,4,5,6,7,8,'polynomial','graph','method'])assert.ok(families.has(family));
  assert.equal(sides.size,3);
});
test('puntuación, reintentos, pistas, rachas y disparador de rondas especiales',()=>{
  const s=new ExpressSession(42);
  assert.equal(s.answer(undefined).status,'blank');assert.equal(s.attempts,0);
  s.hint();s.answer('answer-0');assert.equal(s.score,50);
  s.answer('answer-0');s.expire();assert.equal(s.score,50);
  s.next();s.answer('answer-1');s.answer('answer-0');assert.equal(s.score,110);
  s.next();s.answer('answer-0');s.next();
  assert.equal(s.question.boss,true);
  s.answer('answer-1');s.answer('answer-2');assert.equal(s.streak,0);
  s.next();assert.equal(s.question.boss,false);
  s.expire();assert.equal(s.correct,3);
  while(s.next())s.answer('answer-0');
  assert.equal(s.completed,true);assert.equal(s.correct,8);assert.equal(s.score,710);
  assert.equal(s.levels.reduce((sum,l)=>sum+l.total,0),10);
  assert.equal(s.levels.reduce((sum,l)=>sum+l.correct,0),8);
});
test('sesión perfecta: cuatro niveles, al menos una gráfica y especiales tras cada tres aciertos',()=>{
  for(let seed=0;seed<200;seed++){
    const s=new ExpressSession(seed),bosses=[],levels=new Set();let graphs=0;
    do{
      if(s.question.boss)bosses.push(s.question.round);
      if(s.question.graph)graphs++;
      levels.add(s.question.level);s.answer('answer-0');
    }while(s.next());
    assert.deepEqual(bosses,[4,7,10]);assert.ok(graphs>=1);
    assert.equal(levels.size,4);assert.equal(s.score,1000);assert.equal(s.bestStreak,10);
  }
});

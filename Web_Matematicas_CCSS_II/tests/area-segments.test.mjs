import test from 'node:test';
import assert from 'node:assert/strict';
import {generateAreas,parseAnswer,valueOf,fractionText,createAreaState,assessArea,advanceArea,hintArea} from '../widgets/games/t03-c-area-por-tramos/generator.js';
const near=(a,b)=>assert.ok(Math.abs(a-b)<1e-6*(1+Math.abs(b)),`${a} != ${b}`);
const simpson=(f,a,b)=>{let sum=f(a)+f(b);const n=120,h=(b-a)/n;for(let i=1;i<n;i++)sum+=(i%2?4:2)*f(a+i*h);return sum*h/3;};
const answer=(r,phase)=>phase==='cuts'?r.cuts:phase==='integrals'?r.segments.map(t=>fractionText(t.integral)):[fractionText(r.integral),fractionText(r.area)];
test('1000 semillas, 6000 curvas: primitivas, tramos, área y cambios de signo',()=>{
 const signatures=new Set();
 for(let seed=0;seed<1000;seed++){
  const rows=generateAreas(seed);assert.equal(rows.length,6);signatures.add(rows.map(r=>r.f+r.a+r.b).join('|'));
  for(const r of rows){
   assert.ok(r.a<r.b);assert.equal(r.segments.length,r.cuts.length+1);
   for(const x of r.cuts){assert.ok(x>r.a&&x<r.b);near(r.value(x),0);assert.ok(r.value(x-.01)*r.value(x+.01)<0);}
   for(const x of r.roots.filter(x=>!r.cuts.includes(x)&&x>r.a&&x<r.b))assert.ok(r.value(x-.01)*r.value(x+.01)>0);
   let integral=0,area=0;
   for(const t of r.segments){
    const exact=valueOf(t.integral);near(simpson(r.value,t.a,t.b),exact);integral+=exact;area+=Math.abs(exact);
    for(let i=1;i<20;i++){const x=t.a+(t.b-t.a)*i/20,y=r.value(x);assert.ok(y*t.sign>=-1e-9);near((r.primitive(x+1e-5)-r.primitive(x-1e-5))/2e-5,y);}
   }
   near(integral,valueOf(r.integral));near(area,valueOf(r.area));assert.ok(area>=Math.abs(integral)-1e-9);
   if(r.kind==='cubic'){near(integral,0);assert.ok(area>0);}
   if(r.kind==='contact'||r.kind==='constant-sign')assert.deepEqual(r.cuts,[]);
   if(r.kind==='endpoint'){assert.ok(r.roots.includes(r.a));assert.ok(!r.cuts.includes(r.a));}
  }
 }
 assert.ok(signatures.size>500);
 assert.deepEqual(generateAreas(12).map(r=>r.f),generateAreas(12).map(r=>r.f));
});
test('entrada: coma, signo menos tipográfico, fracciones equivalentes y errores',()=>{
 for(const [text,value]of [['1,25',1.25],[' −4/3 ',-4/3],['2/-3',-2/3],['.5',.5],['6/3',2],['0',0]])near(parseAnswer(text),value);
 for(const text of ['',null,'1/0','NaN','Infinity','2+3','1/2/3','2 m²','1e3','1,2,3','99999999999'])assert.equal(parseAnswer(text),null);
});
test('sesión perfecta: 18 pasos, 1800 puntos y bloqueo de doble puntuación',()=>{
 let state=createAreaState();for(const r of generateAreas(42))for(const phase of ['cuts','integrals','totals']){
  assert.equal(state.phase,phase);assert.equal(advanceArea(state),state);const before=state;
  const result=assessArea(state,r,answer(r,phase));assert.ok(result.correct&&result.done);assert.equal(before.attempts,0);state=result.state;
  assert.equal(assessArea(state,r,answer(r,phase)).state,state);state=advanceArea(state);
 }
 assert.equal(state.phase,'summary');assert.equal(state.score,1800);assert.equal(state.results.length,18);assert.equal(advanceArea(state),state);
});
test('errores, pistas, formato inválido y solución tras dos fallos: 1600 puntos',()=>{
 let state=createAreaState();for(const [i,r] of generateAreas(9).entries())for(const phase of ['cuts','integrals','totals']){
  if(i===0){
   state=hintArea(state);assert.equal(hintArea(state),state);
   const wrong=phase==='cuts'?[]:answer(r,phase).map(()=> '999');
   if(phase!=='cuts'){const invalid=assessArea(state,r,answer(r,phase).map(()=>''));assert.ok(invalid.invalid);assert.equal(invalid.state,state);}
   state=assessArea(state,r,wrong).state;
   if(phase==='integrals')state=assessArea(state,r,wrong).state;
   else state=assessArea(state,r,answer(r,phase)).state;
  }else state=assessArea(state,r,answer(r,phase)).state;
  state=advanceArea(state);
 }
 assert.equal(state.score,1600);assert.equal(state.hints.length,3);assert.equal(state.results.filter(r=>r.correct&&r.attempts===1).length,15);
});
test('partición mínima, entradas inválidas y tolerancia de redondeo a dos decimales',()=>{
 const rows=generateAreas(3),state=createAreaState(),contact=rows[3];
 assert.ok(!assessArea(state,contact,[contact.h]).correct);assert.ok(assessArea(state,contact,[]).correct);
 for(const input of [[rows[0].a],[NaN],[rows[0].h,rows[0].h],null])assert.ok(assessArea(state,rows[0],input).invalid);
 for(const r of rows){const s={...state,phase:'integrals'};assert.ok(assessArea(s,r,r.segments.map(t=>valueOf(t.integral).toFixed(2))).correct);assert.ok(!assessArea(s,r,r.segments.map(t=>(valueOf(t.integral)+.01).toFixed(2))).correct);}
});

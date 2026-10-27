import { initializeWidget, canStartWidgetSession } from '../../shared/widget-runtime.js';
import { updateMath } from '../../../assets/js/core/math.js';
import { generateRepairSession, analyzeRepair, parseAnswer } from './generator.js';

const widgetAccess = await initializeWidget(document.body.dataset.widgetId);
if (widgetAccess) {

const $=(selector)=>document.querySelector(selector);
const initialForm=$('[data-repair-analysis]'), adjustForm=$('[data-repair-adjust]');
const formula=$('[data-repair-formula]');
let questions, index, score, completed, usedHint, awarded, phase;
const names={continuous:'continua',removable:'discontinuidad evitable',jump:'discontinuidad de salto'};
const texNumber=(value)=>value.toLocaleString('en-US',{maximumFractionDigits:12,useGrouping:false});
const signed=(value)=>value<0?'-'+texNumber(Math.abs(value)):'+'+texNumber(value);
const fmt=(value)=>value.toLocaleString('es-ES',{maximumFractionDigits:12,useGrouping:false});
function progress() {
  $('[data-repair-progress]').textContent='Reto '+(index+1)+' de 6 · '+score+' puntos';
}
function draw(b,pointValue) {
  const q=questions[index], values=analyzeRepair(q,b,pointValue);
  const left=Array.from({length:41},(_,i)=>{const x=q.a-2+i/20;return [x,q.m*x+b];});
  const right=Array.from({length:41},(_,i)=>{const x=q.a+i/20;return [x,x*x+q.c];});
  const ys=[pointValue,...left.map(p=>p[1]),...right.map(p=>p[1])];
  const min=Math.min(0,...ys)-1, max=Math.max(0,...ys)+1;
  const px=(x)=>220+80*(x-q.a), py=(y)=>275-(y-min)*250/(max-min);
  const path=(points)=>points.map(([x,y],i)=>(i?'L':'M')+px(x)+' '+py(y)).join(' ');
  $('[data-repair-left-curve]').setAttribute('d',path(left));
  $('[data-repair-right-curve]').setAttribute('d',path(right));
  $('[data-repair-axes]').setAttribute('d','M30 '+py(0)+'H410 M220 15V280');
  $('[data-repair-axis-label]').textContent='Unión: x='+q.a;
  $('[data-repair-left-hole]').setAttribute('cy',py(values.left));
  $('[data-repair-right-hole]').setAttribute('cy',py(values.right));
  $('[data-repair-dot]').setAttribute('cy',py(pointValue));
  $('#repair-graph-description').textContent='En x='+q.a+', los extremos de las ramas están a altura '+fmt(values.left)+' y '+fmt(values.right)+'. El valor puntual es '+fmt(pointValue)+'.';
  const text='\\[f(x)=\\begin{cases}'+q.m+'x'+signed(b)+',&x<'+q.a+',\\\\'+texNumber(pointValue)+
    ',&x='+q.a+',\\\\x^2'+signed(q.c)+',&x>'+q.a+'.\\end{cases}\\]';
  updateMath(formula,()=>{formula.textContent=text;});
}
function startRound() {
  phase='analysis'; usedHint=false; awarded=new Set();
  initialForm.reset(); adjustForm.reset();
  initialForm.querySelector('fieldset').disabled=false;
  adjustForm.querySelector('fieldset').disabled=false;
  adjustForm.hidden=true;
  $('[data-repair-next]').hidden=true;
  $('[data-repair-hint]').disabled=false;
  for(const selector of ['[data-repair-analysis-feedback]','[data-repair-adjust-feedback]','[data-repair-hint-text]']) $(selector).textContent='';
  const q=questions[index];
  $('#repair-b').value=q.b; $('#repair-value').value=q.pointValue;
  $('[data-repair-context]').textContent='Analiza esta función en x='+q.a+'. Después podrás cambiar b y el valor puntual; la pendiente '+q.m+' y la rama derecha se mantendrán.';
  draw(q.b,q.pointValue); progress();
}
function addPoints(key,amount) {
  if(!awarded.has(key)){score+=amount;awarded.add(key);}
}
initialForm.addEventListener('submit',(event)=>{
  event.preventDefault(); if(phase!=='analysis')return;
  const left=parseAnswer($('#repair-left-answer').value), right=parseAnswer($('#repair-right-answer').value), diagnosis=$('#repair-diagnosis').value;
  const feedback=$('[data-repair-analysis-feedback]');
  if(left===null || right===null || !diagnosis){feedback.textContent='Completa los dos límites con números y elige un diagnóstico.';return;}
  const answer=analyzeRepair(questions[index]);
  const correct=[left===answer.left,right===answer.right,diagnosis===answer.diagnosis];
  ['left','right','diagnosis'].forEach((key,i)=>{if(correct[i])addPoints(key,i===2?100:50);});
  progress();
  if(correct.every(Boolean)){
    phase='repair'; initialForm.querySelector('fieldset').disabled=true; adjustForm.hidden=false;
    feedback.textContent='Análisis correcto: límites '+answer.left+' y '+answer.right+'; '+names[answer.diagnosis]+'. Ahora ajusta b y el valor puntual.';
    $('[data-repair-context]').textContent='La gráfica muestra tu propuesta. Los límites que respondiste arriba corresponden a la función inicial.';
    $('#repair-b').focus();
  } else {
    feedback.textContent='Revisa: '+[!correct[0]?'el límite izquierdo':null,!correct[1]?'el límite derecho':null,!correct[2]?'el diagnóstico':null].filter(Boolean).join(', ')+'. Compara también con el valor del punto relleno.';
  }
});
function repairValues() {
  const b=parseAnswer($('#repair-b').value), pointValue=parseAnswer($('#repair-value').value);
  return b===null||pointValue===null||Math.abs(b)>30||Math.abs(pointValue)>30?null:{b,pointValue};
}
adjustForm.addEventListener('input',()=>{
  if(phase!=='repair')return;
  const values=repairValues();
  $('[data-repair-adjust-feedback]').textContent=values?'':'Escribe dos números entre −30 y 30. La gráfica conserva la última propuesta válida.';
  if(values)draw(values.b,values.pointValue);
});
adjustForm.addEventListener('submit',(event)=>{
  event.preventDefault(); if(phase!=='repair')return;
  const values=repairValues(), feedback=$('[data-repair-adjust-feedback]');
  if(!values){feedback.textContent='Escribe dos números entre −30 y 30.';return;}
  const q=questions[index], result=analyzeRepair(q,values.b,values.pointValue);
  draw(values.b,values.pointValue);
  if(result.diagnosis!=='continuous'){
    feedback.textContent='Aún no es continua. El valor puntual existe y vale '+fmt(result.pointValue)+'. Los límites laterales son '+fmt(result.left)+' y '+fmt(result.right)+'. '+(result.left!==result.right?'El límite bilateral no existe.':'El límite bilateral existe, pero no coincide con el valor puntual.')+' Deben coincidir los tres.';
    return;
  }
  addPoints('repair',150); if(!usedHint)addPoints('bonus',100);
  phase='done'; completed++; progress();
  adjustForm.querySelector('fieldset').disabled=true;
  $('[data-repair-hint]').disabled=true;
  feedback.textContent='Reparación correcta: b='+q.targetB+' y f('+q.a+')='+q.targetValue+'. Existe el valor puntual, existe el límite bilateral y ambos coinciden.'+(usedHint?'':' Bonus sin pista: 100 puntos.');
  $('[data-repair-next]').textContent=index===questions.length-1?'Ver resumen':'Siguiente reto';
  $('[data-repair-next]').hidden=false;
});
$('[data-repair-hint]').addEventListener('click',()=>{
  if(phase==='done')return;
  usedHint=true; const q=questions[index];
  $('[data-repair-hint-text]').textContent=phase==='analysis'
    ? 'Sustituye '+q.a+' en cada rama, por separado. Después compara los dos resultados con el valor puntual. Si los laterales difieren hay salto; si coinciden pero no con el punto, es evitable.'
    : 'La rama derecha fija la altura: ('+q.a+')²+('+q.c+'). Elige b para que '+q.m+'·('+q.a+')+b dé esa altura, y asigna la misma al valor puntual.';
});
$('[data-repair-next]').addEventListener('click',()=>{
  if(phase!=='done')return;
  if(index===questions.length-1){
    phase='summary'; $('[data-repair-round]').hidden=true; $('[data-repair-summary]').hidden=false;
    $('[data-repair-total]').textContent=completed+' funciones completadas · '+score+' de 2700 puntos posibles. Resultado de esta sesión; no se guarda un historial.';
    $('[data-repair-restart]').focus();
  }else{index++;startRound();$('#repair-left-answer').focus();}
});
function restart(){
 if (!canStartWidgetSession()) return;
  questions=generateRepairSession(crypto.getRandomValues(new Uint32Array(1))[0]);
  index=0;score=0;completed=0;
  $('[data-repair-round]').hidden=false;$('[data-repair-summary]').hidden=true;startRound();
}
$('[data-repair-restart]').addEventListener('click',()=>{restart();$('#repair-left-answer').focus();});
restart();
}

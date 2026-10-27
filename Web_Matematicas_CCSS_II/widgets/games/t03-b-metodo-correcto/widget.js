import { initializeWidget, canStartWidgetSession } from '../../shared/widget-runtime.js';
import {updateMath} from '../../../assets/js/core/math.js';
import {methods,generateMethods,createMethodState,answerMethod,advanceMethod,hintMethod} from './generator.js';
const widgetAccess = await initializeWidget(document.body.dataset.widgetId);
if (widgetAccess) {
const $=s=>document.querySelector(s),root=$('[data-game]'),question=$('[data-question]'),choices=$('[data-choices]'),options=$('[data-options]'),feedback=$('[data-feedback]'),check=$('[data-check]'),hint=$('[data-hint]'),next=$('[data-next]'),tex=String.raw;
const el=(tag,text)=>{const n=document.createElement(tag);if(text!==undefined)n.textContent=text;return n;};
let session,state,seed,busy=false;
const active=()=>['method','primitive'].includes(state?.phase);
function lock(value){busy=value;options.disabled=check.disabled=hint.disabled=value||!active();next.disabled=value;}
function progress(){
 root.dataset.seed=seed;root.dataset.index=state.index;root.dataset.phase=state.phase;root.dataset.score=state.score;
 $('[data-progress]').textContent=state.phase==='summary'?'Sesión terminada':`Reto ${state.index+1} de 8 · ${state.phase.startsWith('method')?'Paso 1: estrategia':'Paso 2: primitiva'} · ${state.score} de 1600 puntos`;
}
async function render(){
 lock(true);progress();check.hidden=hint.hidden=false;next.hidden=true;options.hidden=false;
 const r=session[state.index],isMethod=state.phase==='method';
 await updateMath(question,()=>{question.replaceChildren(el('h2',isMethod?'Reconoce el patrón':'Elige la familia completa'),el('p',tex`\[\int ${r.f}\,dx\]`),el('p','Intervalo: '+r.domain));if(r.method==='parts')question.append(el('p','Reto de ampliación de la lección 3.4.'))});
 $('[data-legend]').textContent=isMethod?'¿Qué estrategia aprovecha mejor la forma presentada?':'¿Qué familia cumple F′ = f en el intervalo indicado?';
 await updateMath(choices,()=>{
  choices.replaceChildren();
  for(const o of isMethod?methods:r.options){const label=el('label'),input=el('input');label.className='method-option';input.type='radio';input.name='answer';input.value=o.id;label.append(input,el('span',isMethod?o.label:tex`\(${o.formula}\)`));choices.append(label);}
 });
 await updateMath(feedback,()=>feedback.replaceChildren());
 check.textContent=isMethod?'Comprobar estrategia':'Comprobar primitiva';lock(false);
}
hint.addEventListener('click',async()=>{
 if(busy||!active())return;lock(true);state=hintMethod(state);
 const r=session[state.index];
 await updateMath(feedback,()=>{feedback.textContent='Pista: '+(state.phase==='method'?r.hint:'Deriva cada propuesta y comprueba el factor y el signo. Buscamos toda la familia: incluye +C.');});lock(false);
});
check.addEventListener('click',async()=>{
 if(busy||!active())return;lock(true);
 const selected=choices.querySelector('input:checked'),r=session[state.index],stage=state.phase;
 if(!selected){await updateMath(feedback,()=>{feedback.textContent='Selecciona una opción antes de comprobar.';});lock(false);return;}
 const answer=answerMethod(state,r,selected.value);if(answer.ignored){lock(false);return;}state=answer.state;
 let message=answer.correct?'Correcto. ':'';
 if(stage==='method'){
  if(!answer.correct)message+='Esa no es la ruta que mejor aprovecha el patrón destacado en este reto. Puede haber otros procedimientos válidos. ';
  message+=r.hint;
  if(answer.done)message+=' Ruta propuesta: '+methods.find(m=>m.id===r.method).label+'.';
 }else {
  if(!answer.correct)message+=selected.value==='particular'?'Es una primitiva particular válida, pero falta +C para representar la familia completa. ':selected.value==='double'?'Al derivar esta opción obtienes 2f(x), no f(x) en todo el intervalo. ':'Al derivar esta opción obtienes −f(x), no f(x) en todo el intervalo. ';
  if(answer.done)message+=tex`${r.steps} Familia: \(F(x)=${r.F}+C\). Comprobación: \(F'(x)=${r.f}\).`;
 }
 message+=answer.done?` ${answer.points} puntos en este paso.`:' Te queda un intento.';
 await updateMath(feedback,()=>{feedback.textContent=message;});progress();lock(false);
 if(answer.done){next.hidden=false;next.textContent=stage==='method'?'Pasar a la resolución':state.index===7?'Ver resumen':'Siguiente reto';next.focus();}
});
next.addEventListener('click',async()=>{
 if(busy)return;
 if(state.phase==='summary'){await start();choices.querySelector('input')?.focus();return;}
 if(active())return;
 lock(true);state=advanceMethod(state,session.length);
 if(state.phase!=='summary'){await render();choices.querySelector('input')?.focus();return;}
 progress();options.hidden=true;check.hidden=hint.hidden=true;
 await updateMath(question,()=>question.replaceChildren(el('h2','Resumen de la sesión')));
 await updateMath(feedback,()=>{
  const first=state.results.filter(r=>r.correct&&r.attempts===1).length;
  feedback.replaceChildren(el('p',`${state.score} de 1600 puntos. ${first} de 16 pasos al primer intento. Pistas utilizadas: ${state.hints.length}. Este resumen no se guarda.`));
  const list=el('ol');
  for(const r of session){const item=el('li');item.append(el('p',tex`\(\int ${r.f}\,dx=${r.F}+C\), en ${r.domain}.`),el('p','Ruta: '+methods.find(m=>m.id===r.method).label),el('p',r.steps));list.append(item);}
  feedback.append(list);
 });next.hidden=false;next.textContent='Nueva sesión';lock(false);next.focus();
});
async function start(){
 if (!canStartWidgetSession()) return;
 lock(true);let nextSeed=crypto.getRandomValues(new Uint32Array(1))[0];if(nextSeed===seed)nextSeed=(nextSeed+1)>>>0;seed=nextSeed;session=generateMethods(seed);state=createMethodState();await render();
}
start();
}

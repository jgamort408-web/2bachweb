
import { initializeWidget, canStartWidgetSession } from '../../shared/widget-runtime.js';
import {updateMath} from '../../../assets/js/core/math.js';
import {generateChamber,createChamberState,answerChamber,advanceChamber,hintChamber} from './generator.js';
const widgetAccess = await initializeWidget(document.body.dataset.widgetId);
if (widgetAccess) {
const $=s=>document.querySelector(s),root=$('[data-game]'),question=$('[data-question]'),choices=$('[data-choices]'),options=$('[data-options]'),feedback=$('[data-feedback]'),check=$('[data-check]'),hint=$('[data-hint]'),next=$('[data-next]'),tex=String.raw;
const el=(tag,text)=>{const n=document.createElement(tag);if(text!==undefined)n.textContent=text;return n;};
let session,state,seed,busy=false;
function lock(value){busy=value;options.disabled=check.disabled=hint.disabled=value||state?.phase!=='answer';next.disabled=value;}
function progress(){
 Object.assign(root.dataset,{seed,index:state.index,phase:state.phase,stage:state.stage,score:state.score});
 $('[data-progress]').textContent=state.phase==='summary'?'Sesión terminada':`Sala ${state.index+1} de 6 · Cerradura ${state.stage+1} de 3 · ${state.score} de 1800 puntos`;
 
 $('[data-meter]').value=state.results.length;
 const map=$('[data-room-map]');map.replaceChildren();
 session.forEach((r,i)=>{
  const complete=i<state.index||(i===state.index&&state.stage===2&&state.phase==='resolved');
  const assisted=state.results.some(v=>v.id===r.id&&!v.correct);
  const label=complete?(assisted?'Abierta con solución explicada':'Abierta'):i===state.index?'En curso':'Pendiente';
  const item=el('li',r.title+' · '+label);item.dataset.room=i;item.dataset.status=complete?'open':i===state.index?'current':'locked';
  if(i===state.index)item.setAttribute('aria-current','step');map.append(item);
 });

}
async function render(){
 lock(true);progress();check.hidden=hint.hidden=false;next.hidden=true;options.hidden=false;
 const r=session[state.index],step=r.stages[state.stage];
 await updateMath(question,()=>question.replaceChildren(el('h2',r.title),el('p',tex`\[${r.statement}\]`)));
 $('[data-legend]').textContent=step.prompt;
 await updateMath(choices,()=>{
  choices.replaceChildren();
  for(const o of step.options){const label=el('label'),input=el('input');label.className='chamber-option';input.type='radio';input.name='answer';input.value=o.id;label.append(input,el('span',o.text));choices.append(label);}
 });
 await updateMath(feedback,()=>feedback.replaceChildren());
 check.textContent='Probar la llave';lock(false);
}
hint.addEventListener('click',async()=>{
 if(busy||state.phase!=='answer')return;lock(true);state=hintChamber(state);
 await updateMath(feedback,()=>feedback.textContent='Pista: '+session[state.index].stages[state.stage].hint);lock(false);
});
check.addEventListener('click',async()=>{
 if(busy||state.phase!=='answer')return;lock(true);
 const selected=choices.querySelector('input:checked'),r=session[state.index],step=r.stages[state.stage];
 if(!selected){await updateMath(feedback,()=>feedback.textContent='Selecciona una opción antes de comprobar.');lock(false);return;}
 const answer=answerChamber(state,r,selected.value);if(answer.ignored){lock(false);return;}state=answer.state;
 const option=step.options.find(o=>o.id===selected.value);
 await updateMath(feedback,()=>{
  feedback.replaceChildren(el('p',(answer.correct?'Correcto. ':'Revisa tu respuesta. ')+option.feedback));
  if(answer.done){feedback.append(el('p','Solución: '+step.options.find(o=>o.id===step.correct).text),el('p',step.explanation),el('p',(answer.correct?'Cerradura abierta. ':'Cerradura abierta con la solución explicada. ')+answer.points+' puntos en este paso.'));}
  else feedback.append(el('p','Te queda un intento. Puedes consultar la pista.'));
 });
 progress();lock(false);
 if(answer.done){next.hidden=false;next.textContent=state.stage<2?'Siguiente cerradura':state.index===5?'Ver resumen':'Entrar en la siguiente sala';next.focus();}
});
next.addEventListener('click',async()=>{
 if(busy)return;
 if(state.phase==='summary'){await start();choices.querySelector('input')?.focus();return;}
 if(state.phase!=='resolved')return;lock(true);state=advanceChamber(state,session.length);
 if(state.phase!=='summary'){await render();choices.querySelector('input')?.focus();return;}
 progress();options.hidden=true;check.hidden=hint.hidden=true;
 await updateMath(question,()=>question.replaceChildren(el('h2','La cámara está abierta')));
 await updateMath(feedback,()=>{
  const first=state.results.filter(r=>r.correct&&r.attempts===1).length;
  feedback.replaceChildren(el('p',`${state.score} de 1800 puntos. ${first} de 18 cerraduras al primer intento. Pistas utilizadas: ${state.hints.length}. Este resumen no se guarda.`));
  const list=el('ol');
  for(const r of session){
   const item=el('li'),details=el('details');details.append(el('summary',r.title),el('p',tex`\[${r.statement}\]`));
   for(const [i,step]of r.stages.entries()){
    const result=state.results.find(v=>v.id===r.id&&v.stage===i);
    details.append(el('p',`Paso ${i+1}: ${result.points} puntos. `+step.explanation));
   }
   item.append(details);list.append(item);
  }
  feedback.append(list);
 });next.hidden=false;next.textContent='Nueva sesión';lock(false);next.focus();
});
async function start(){
 if (!canStartWidgetSession()) return;
 lock(true);let nextSeed=crypto.getRandomValues(new Uint32Array(1))[0];if(nextSeed===seed)nextSeed=(nextSeed+1)>>>0;seed=nextSeed;session=generateChamber(seed);state=createChamberState();await render();
}
start();
}

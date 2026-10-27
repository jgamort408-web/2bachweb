
import { initializeWidget, canStartWidgetSession } from '../../shared/widget-runtime.js';
import {updateMath} from '../../../assets/js/core/math.js';
import {generateMatrixOps,createMatrixOpsState,answerMatrixOps,advanceMatrixOps,hintMatrixOps} from './generator.js';
const widgetAccess = await initializeWidget(document.body.dataset.widgetId);
if (widgetAccess) {
const $=s=>document.querySelector(s),root=$('[data-game]'),question=$('[data-question]'),choices=$('[data-choices]'),options=$('[data-options]'),feedback=$('[data-feedback]'),check=$('[data-check]'),hint=$('[data-hint]'),next=$('[data-next]'),tex=String.raw;
const el=(tag,text)=>{const n=document.createElement(tag);if(text!==undefined)n.textContent=text;return n;};
let session,state,seed,busy=false;
function lock(value){busy=value;options.disabled=check.disabled=hint.disabled=value||state?.phase!=='answer';next.disabled=value;}
function progress(){
 Object.assign(root.dataset,{seed,index:state.index,phase:state.phase,stage:state.stage,score:state.score});
 $('[data-progress]').textContent=state.phase==='summary'?'Sesión terminada':`Reto ${state.index+1} de 8 · Paso ${state.stage+1} de 2 · ${state.score} de 1600 puntos`;
 $('[data-meter]').value=state.results.length;
}
async function render(){
 lock(true);progress();check.hidden=hint.hidden=false;next.hidden=true;options.hidden=false;
 const r=session[state.index],step=r.stages[state.stage];
 await updateMath(question,()=>question.replaceChildren(el('h2',r.title),el('p',tex`\[${r.statement}\]`)));
 $('[data-legend]').textContent=step.prompt;
 await updateMath(choices,()=>{
  choices.replaceChildren();
  for(const o of step.options){const label=el('label'),input=el('input');label.className='matrix-option';input.type='radio';input.name='answer';input.value=o.id;label.append(input,el('span',o.text));choices.append(label);}
 });
 await updateMath(feedback,()=>feedback.replaceChildren());
 check.textContent=state.stage===0?'Comprobar decisión':'Comprobar respuesta';lock(false);
}
hint.addEventListener('click',async()=>{
 if(busy||state.phase!=='answer')return;lock(true);state=hintMatrixOps(state);
 await updateMath(feedback,()=>feedback.textContent='Pista: '+session[state.index].stages[state.stage].hint);lock(false);
});
check.addEventListener('click',async()=>{
 if(busy||state.phase!=='answer')return;lock(true);
 const selected=choices.querySelector('input:checked'),r=session[state.index],step=r.stages[state.stage];
 if(!selected){await updateMath(feedback,()=>feedback.textContent='Selecciona una opción antes de comprobar.');lock(false);return;}
 const answer=answerMatrixOps(state,r,selected.value);if(answer.ignored){lock(false);return;}state=answer.state;
 const option=step.options.find(o=>o.id===selected.value);
 await updateMath(feedback,()=>{
  feedback.replaceChildren(el('p',(answer.correct?'Correcto. ':'Revisa tu respuesta. ')+option.feedback));
  if(answer.done){feedback.append(el('p','Solución: '+step.options.find(o=>o.id===step.correct).text),el('p',step.explanation),el('p',answer.points+' puntos en este paso.'));}
  else feedback.append(el('p','Te queda un intento. Puedes consultar la pista.'));
 });
 progress();lock(false);
 if(answer.done){next.hidden=false;next.textContent=state.stage===0?'Pasar al segundo paso':state.index===7?'Ver resumen':'Siguiente reto';next.focus();}
});
next.addEventListener('click',async()=>{
 if(busy)return;
 if(state.phase==='summary'){await start();choices.querySelector('input')?.focus();return;}
 if(state.phase!=='resolved')return;lock(true);state=advanceMatrixOps(state,session.length);
 if(state.phase!=='summary'){await render();choices.querySelector('input')?.focus();return;}
 progress();options.hidden=true;check.hidden=hint.hidden=true;
 await updateMath(question,()=>question.replaceChildren(el('h2','Resumen de la sesión')));
 await updateMath(feedback,()=>{
  const first=state.results.filter(r=>r.correct&&r.attempts===1).length;
  feedback.replaceChildren(el('p',`${state.score} de 1600 puntos. ${first} de 16 pasos al primer intento. Pistas utilizadas: ${state.hints.length}. Este resumen no se guarda.`));
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
 lock(true);let nextSeed=crypto.getRandomValues(new Uint32Array(1))[0];if(nextSeed===seed)nextSeed=(nextSeed+1)>>>0;seed=nextSeed;session=generateMatrixOps(seed);state=createMatrixOpsState();await render();
}
start();
}

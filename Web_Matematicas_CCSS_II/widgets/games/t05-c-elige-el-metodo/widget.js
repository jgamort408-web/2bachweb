import { initializeWidget, canStartWidgetSession } from '../../shared/widget-runtime.js';
import {updateMath} from '../../../assets/js/core/math.js';
import {generateMethods,createMethodState,answerMethod,hintMethod,advanceMethod} from './model.js';
const widgetAccess = await initializeWidget(document.body.dataset.widgetId);
if (widgetAccess) {
const $=s=>document.querySelector(s),root=$('[data-game]'),question=$('[data-question]'),choices=$('[data-choices]'),options=$('[data-options]'),feedback=$('[data-feedback]'),check=$('[data-check]'),hint=$('[data-hint]'),next=$('[data-next]'),tex=String.raw;
const el=(tag,text)=>{const n=document.createElement(tag);if(text!==undefined)n.textContent=text;return n;};
let session,state,seed,busy=false;
function lock(value){busy=value;options.disabled=check.disabled=hint.disabled=value||state?.phase!=='answer';next.disabled=value;}
function progress(){
 Object.assign(root.dataset,{seed,index:state.index,phase:state.phase,score:state.score});
 $('[data-progress]').textContent=state.phase==='summary'?'Sesión terminada':`Reto ${state.index+1} de 6 · ${state.score} de 600 puntos`;
 $('[data-meter]').value=state.results.length;
}

function explain(r){
 const fragment=document.createDocumentFragment(),list=el('ul');
 fragment.append(el('p',r.explanation));
 for(const o of r.options.filter(o=>o.valid))list.append(el('li',(o.recommended?'Opción recomendada: ':'Alternativa válida: ')+o.text));
 fragment.append(list);
 const details=el('details');details.append(el('summary','Ver comprobación algebraica'),el('p',r.proof));fragment.append(details);
 return fragment;
}

async function render(){
 lock(true);progress();check.hidden=hint.hidden=false;next.hidden=true;options.hidden=false;
 const r=session[state.index];root.dataset.mode=r.id;
 await updateMath(question,()=>{
  question.replaceChildren(el('h2',r.title));
  question.append(el('p',tex`\[${r.statement}\]`));
  if(r.extra)question.append(el('p',r.extra));
  question.append(el('p','Elige una estrategia justificada para estudiar o resolver este sistema. Puede haber más de una válida.'));
 });
 choices.replaceChildren();
 for(const o of r.options){const label=el('label'),input=el('input');label.className='classifier-option';input.type='radio';input.name='answer';input.value=o.id;label.append(input,el('span',o.text));choices.append(label);}
 await updateMath(feedback,()=>feedback.replaceChildren());lock(false);
}
hint.addEventListener('click',async()=>{
 if(busy||state.phase!=='answer')return;lock(true);state=hintMethod(state);
 await updateMath(feedback,()=>feedback.textContent='Pista: '+session[state.index].hint);lock(false);
});
check.addEventListener('click',async()=>{
 if(busy||state.phase!=='answer')return;lock(true);
 const selected=choices.querySelector('input:checked'),r=session[state.index];
 if(!selected){await updateMath(feedback,()=>feedback.textContent='Selecciona una estrategia antes de comprobar.');lock(false);return;}
 const result=answerMethod(state,r,selected.value);if(result.ignored){lock(false);return;}state=result.state;
 await updateMath(feedback,()=>{
  feedback.replaceChildren(el('p',result.correct?'Estrategia válida.':'Revisa la estrategia.'),el('p',result.feedback));
  if(result.done){
   feedback.append(explain(r),el('p',result.points+' puntos en este reto.'));
  }else feedback.append(el('p','Te queda un intento. Revisa las condiciones del método y lo que pide el reto. Puedes consultar la pista.'));
 });
 progress();lock(false);
 if(result.done){next.hidden=false;next.textContent=state.index===5?'Ver resumen':'Siguiente reto';next.focus();}
});
next.addEventListener('click',async()=>{
 if(busy)return;
 if(state.phase==='summary'){await start();choices.querySelector('input')?.focus();return;}
 if(state.phase!=='resolved')return;lock(true);state=advanceMethod(state);
 if(state.phase!=='summary'){await render();choices.querySelector('input')?.focus();return;}
 progress();options.hidden=true;check.hidden=hint.hidden=true;
 await updateMath(question,()=>question.replaceChildren(el('h2','Resumen de la sesión')));
 await updateMath(feedback,()=>{
  const first=state.results.filter(r=>r.correct&&r.attempts===1).length;
  feedback.replaceChildren(el('p',`${state.score} de 600 puntos. ${first} de 6 retos al primer intento. Pistas utilizadas: ${state.hints.length}. Este resumen no se guarda.`));
  const list=el('ol');
  for(const r of session){
   const result=state.results.find(v=>v.id===r.id),li=el('li'),details=el('details');
   details.append(el('summary',r.title+' · '+result.points+' puntos'),el('p',tex`\[${r.statement}\]`),explain(r));
   li.append(details);list.append(li);
  }feedback.append(list);
 });
 next.hidden=false;next.textContent='Nueva sesión';lock(false);next.focus();
});
async function start(){
 if (!canStartWidgetSession()) return;
 lock(true);let candidate=crypto.getRandomValues(new Uint32Array(1))[0];if(candidate===seed)candidate=(candidate+1)>>>0;
 seed=candidate;session=generateMethods(seed);state=createMethodState();await render();
}
start();
}

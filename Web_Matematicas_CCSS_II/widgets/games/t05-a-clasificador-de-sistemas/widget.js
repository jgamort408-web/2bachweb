import { initializeWidget, canStartWidgetSession } from '../../shared/widget-runtime.js';
import {updateMath} from '../../../assets/js/core/math.js';
import {generateClassifier,createClassifierState,answerClassifier,hintClassifier,advanceClassifier,labels} from './generator.js';
import {classifierGraph} from './graph.js';
const widgetAccess = await initializeWidget(document.body.dataset.widgetId);
if (widgetAccess) {
const $=s=>document.querySelector(s),root=$('[data-game]'),question=$('[data-question]'),choices=$('[data-choices]'),options=$('[data-options]'),feedback=$('[data-feedback]'),check=$('[data-check]'),hint=$('[data-hint]'),next=$('[data-next]'),tex=String.raw;
const el=(tag,text)=>{const n=document.createElement(tag);if(text!==undefined)n.textContent=text;return n;};
let session,state,seed,busy=false;
function lock(value){busy=value;options.disabled=check.disabled=hint.disabled=value||state?.phase!=='answer';next.disabled=value;}
function progress(){
 Object.assign(root.dataset,{seed,index:state.index,phase:state.phase,score:state.score});
 $('[data-progress]').textContent=state.phase==='summary'?'Sesión terminada':`Reto ${state.index+1} de 12 · ${state.score} de 1200 puntos`;
 $('[data-meter]').value=state.results.length;
}
async function render(){
 lock(true);progress();check.hidden=hint.hidden=false;next.hidden=true;options.hidden=false;
 const r=session[state.index];root.dataset.mode=r.mode;
 await updateMath(question,()=>{
  question.replaceChildren(el('h2',r.title));
  if(r.mode==='graph'){const figure=el('figure');figure.className='classifier-graph';figure.innerHTML=classifierGraph(r.rows);figure.append(el('figcaption',r.description));question.append(figure);}
  question.append(el('p',tex`\[${r.statement}\]`));
  if(r.mode==='ranks')question.append(el('p','m es el número de ecuaciones y n el de incógnitas.'));
  if(r.mode==='echelon')question.append(el('p','La barra vertical separa A y B. Clasifica el sistema completo.'));
 });
 choices.replaceChildren();
 for(const o of r.options){const label=el('label'),input=el('input');label.className='classifier-option';input.type='radio';input.name='answer';input.value=o.id;label.append(input,el('span',o.text));choices.append(label);}
 await updateMath(feedback,()=>feedback.replaceChildren());lock(false);
}
hint.addEventListener('click',async()=>{
 if(busy||state.phase!=='answer')return;lock(true);state=hintClassifier(state);
 await updateMath(feedback,()=>feedback.textContent='Pista: '+session[state.index].hint);lock(false);
});
check.addEventListener('click',async()=>{
 if(busy||state.phase!=='answer')return;lock(true);
 const selected=choices.querySelector('input:checked'),r=session[state.index];
 if(!selected){await updateMath(feedback,()=>feedback.textContent='Selecciona una clasificación antes de comprobar.');lock(false);return;}
 const result=answerClassifier(state,r,selected.value);if(result.ignored){lock(false);return;}state=result.state;
 await updateMath(feedback,()=>{
  feedback.replaceChildren(el('p',result.correct?'Correcto.':'Revisa tu respuesta.'));
  if(result.done){
   feedback.append(el('p','Solución: '+labels[r.kind]),el('p',r.explanation),el('p',result.points+' puntos en este reto.'));
   const details=el('details');details.append(el('summary','Ver comprobación algebraica'));
   if(r.mode==='ranks')details.append(el('p','Un sistema concreto que cumple estos datos es:'),el('p',tex`\[${r.system}\]`));
   details.append(el('p',r.proof));feedback.append(details);
  }else feedback.append(el('p','Te queda un intento. Compara ambos rangos y, si coinciden, compáralos con el número de incógnitas. Puedes consultar la pista.'));
 });
 progress();lock(false);
 if(result.done){next.hidden=false;next.textContent=state.index===11?'Ver resumen':'Siguiente reto';next.focus();}
});
next.addEventListener('click',async()=>{
 if(busy)return;
 if(state.phase==='summary'){await start();choices.querySelector('input')?.focus();return;}
 if(state.phase!=='resolved')return;lock(true);state=advanceClassifier(state);
 if(state.phase!=='summary'){await render();choices.querySelector('input')?.focus();return;}
 progress();options.hidden=true;check.hidden=hint.hidden=true;
 await updateMath(question,()=>question.replaceChildren(el('h2','Resumen de la sesión')));
 await updateMath(feedback,()=>{
  const first=state.results.filter(r=>r.correct&&r.attempts===1).length;
  feedback.replaceChildren(el('p',`${state.score} de 1200 puntos. ${first} de 12 retos al primer intento. Pistas utilizadas: ${state.hints.length}. Este resumen no se guarda.`));
  const list=el('ol');
  for(const r of session){
   const result=state.results.find(v=>v.id===r.id),li=el('li'),details=el('details');
   details.append(el('summary',r.title+' · '+result.points+' puntos'),el('p',tex`\[${r.statement}\]`),el('p',labels[r.kind]+'. '+r.explanation));
   li.append(details);list.append(li);
  }feedback.append(list);
 });
 next.hidden=false;next.textContent='Nueva sesión';lock(false);next.focus();
});
async function start(){
 if (!canStartWidgetSession()) return;
 lock(true);let candidate=crypto.getRandomValues(new Uint32Array(1))[0];if(candidate===seed)candidate=(candidate+1)>>>0;
 seed=candidate;session=generateClassifier(seed);state=createClassifierState();await render();
}
start();
}

import { initializeWidget, canStartWidgetSession } from '../../shared/widget-runtime.js';
import {generateSession,valuesFor,tasks} from './generator.js';
const widgetAccess = await initializeWidget(document.body.dataset.widgetId);
if (widgetAccess) {
const $=s=>document.querySelector(s);
const state={rounds:[],index:0,score:0,attempts:0,done:false};
function tree(round){
 const root=$('[data-tree]');root.replaceChildren();
 const title=document.createElement('p');title.textContent='Árbol de dos etapas. Las probabilidades de la segunda etapa son condicionales a la primera.';root.append(title);
 const list=document.createElement('ul');
 for(const [name,first,second] of [['A',round.p,round.q],['Aᶜ',100-round.p,round.r]]){
  const branch=document.createElement('li');branch.textContent=`Primera etapa: ${name} (${first} %) `;
  const children=document.createElement('ul');
  for(const [label,pct] of [['B',second],['Bᶜ',100-second]]){const item=document.createElement('li');item.textContent=`Después de ${name}: ${label} (${pct} %)`;children.append(item);}
  branch.append(children);list.append(branch);
 }
 root.append(list);
}
function render(){
 const r=state.rounds[state.index];tree(r);
 $('[data-progress]').textContent=`Reto ${state.index+1} de 6 · ${state.score} de 600 puntos`;$('[data-meter]').value=state.index;
 $('[data-question]').textContent=tasks.find(t=>t.id===r.task).question;
 $('[data-answer]').value='';$('[data-answer]').disabled=false;$('[data-answer-label]').hidden=false;
 $('[data-feedback]').textContent='';$('[data-check]').hidden=false;$('[data-hint]').hidden=false;$('[data-next]').hidden=true;$('[data-restart]').hidden=true;
 state.attempts=0;state.done=false;
}
function explanation(r){
 const {ab,anb,nab,none,total,union}=valuesFor(r.p,r.q,r.r);
 const expressions={ab:`${r.p} % × ${r.q} % = ${ab} %`,anb:`${r.p} % × ${100-r.q} % = ${anb} %`,nab:`${100-r.p} % × ${r.r} % = ${nab} %`,total:`${ab} % + ${nab} % = ${total} %`,union:`${ab} % + ${anb} % + ${nab} % = ${union} %`,none:`${100-r.p} % × ${100-r.r} % = ${none} %`};
 return expressions[r.task];
}
function finish(correct){
 const r=state.rounds[state.index];state.done=true;
 if(correct)state.score+=state.attempts===1?100:50;
 $('[data-answer]').disabled=true;$('[data-check]').hidden=true;$('[data-hint]').hidden=true;$('[data-next]').hidden=false;
 $('[data-feedback]').textContent=`${correct?'Correcto.':'Dos intentos agotados.'} ${explanation(r)}. En cada camino se multiplican ramas; los caminos incompatibles se suman.`;
 $('[data-progress]').textContent=`Reto ${state.index+1} de 6 · ${state.score} de 600 puntos`;
}
$('[data-check]').addEventListener('click',()=>{
 if(state.done)return;
 const input=$('[data-answer]'),raw=input.value.trim(),value=Number(raw);
 if(raw===''||!Number.isInteger(value)||value<0||value>100){$('[data-feedback]').textContent='Escribe un porcentaje entero entre 0 y 100.';return;}
 state.attempts++;
 if(value===state.rounds[state.index].answer){finish(true);return;}
 if(state.attempts===2){finish(false);return;}
 $('[data-feedback]').textContent='Aún no. Revisa qué caminos forman el suceso y cómo se combinan. Te queda un intento.';
});
$('[data-answer]').addEventListener('keydown',e=>{if(e.key==='Enter'){e.preventDefault();$('[data-check]').click();}});
$('[data-hint]').addEventListener('click',()=>{if(!state.done)$('[data-feedback]').textContent='Pista: '+tasks.find(t=>t.id===state.rounds[state.index].task).hint;});
$('[data-next]').addEventListener('click',()=>{
 if(!state.done)return;state.index++;
 if(state.index<6){render();return;}
 $('[data-meter]').value=6;$('[data-progress]').textContent='Sesión terminada';$('[data-tree]').textContent=`Has conseguido ${state.score} de 600 puntos.`;
 $('[data-question]').textContent='Puedes empezar una nueva partida con otro árbol.';$('[data-answer-label]').hidden=true;$('[data-feedback]').textContent='';$('[data-next]').hidden=true;$('[data-restart]').hidden=false;
});
$('[data-restart]').addEventListener('click',start);
function start(){
 if (!canStartWidgetSession()) return;Object.assign(state,{rounds:generateSession(),index:0,score:0,attempts:0,done:false});render();}
start();
}

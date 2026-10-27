import { initializeWidget, canStartWidgetSession } from '../../shared/widget-runtime.js';
import {generateSession,sameSet,operations} from './generator.js';
const widgetAccess = await initializeWidget(document.body.dataset.widgetId);
if (widgetAccess) {
const $=s=>document.querySelector(s);
const session={rounds:[],index:0,score:0,attempts:0,done:false};
const labelSet=items=>'{'+items.join(', ')+'}';
function render(){
 const r=session.rounds[session.index],op=operations.find(o=>o.id===r.operation);
 $('[data-progress]').textContent=`Reto ${session.index+1} de 8 · ${session.score} de 800 puntos`;
 $('[data-meter]').value=session.index;
 $('[data-question]').replaceChildren();
 const heading=document.createElement('h2');heading.textContent=`Construye ${op.label}`;
 const info=document.createElement('p');info.textContent=`Espacio muestral E = ${labelSet(r.universe)} · A = ${labelSet(r.a)} · B = ${labelSet(r.b)}`;
 $('[data-question]').append(heading,info);
 $('[data-choices]').replaceChildren();
 for(const n of r.universe){const label=document.createElement('label'),input=document.createElement('input'),span=document.createElement('span');label.className='choice';input.type='checkbox';input.value=String(n);span.textContent=String(n);label.append(input,span);$('[data-choices]').append(label);}
 $('[data-options]').disabled=false;$('[data-options]').hidden=false;
 $('[data-feedback]').textContent='';$('[data-check]').hidden=false;$('[data-hint]').hidden=false;$('[data-next]').hidden=true;$('[data-restart]').hidden=true;
 session.attempts=0;session.done=false;
}
function finishRound(correct){
 const r=session.rounds[session.index],op=operations.find(o=>o.id===r.operation);
 session.done=true;$('[data-options]').disabled=true;$('[data-check]').hidden=true;$('[data-hint]').hidden=true;$('[data-next]').hidden=false;
 if(correct)session.score+=session.attempts===1?100:50;
 $('[data-feedback]').textContent=`${correct?'Correcto.':'Dos intentos agotados.'} ${op.label} = ${labelSet(r.answer)}. ${op.hint}`;
 $('[data-progress]').textContent=`Reto ${session.index+1} de 8 · ${session.score} de 800 puntos`;
}
$('[data-check]').addEventListener('click',()=>{
 if(session.done)return;
 const selected=[...document.querySelectorAll('[data-choices] input:checked')].map(x=>Number(x.value));
 if(!selected.length){$('[data-feedback]').textContent='Selecciona al menos un resultado antes de comprobar.';return;}
 session.attempts++;
 if(sameSet(selected,session.rounds[session.index].answer)){finishRound(true);return;}
 if(session.attempts===2){finishRound(false);return;}
 const missing=session.rounds[session.index].answer.filter(x=>!selected.includes(x)).length;
 const extra=selected.filter(x=>!session.rounds[session.index].answer.includes(x)).length;
 $('[data-feedback]').textContent=`Aún no. Faltan ${missing} resultados y sobran ${extra}. Puedes corregir la selección e intentarlo otra vez.`;
});
$('[data-hint]').addEventListener('click',()=>{if(!session.done)$('[data-feedback]').textContent='Pista: '+operations.find(o=>o.id===session.rounds[session.index].operation).hint;});
$('[data-next]').addEventListener('click',()=>{
 if(!session.done)return;
 session.index++;
 if(session.index<8){render();return;}
 $('[data-meter]').value=8;$('[data-progress]').textContent='Sesión terminada';
 $('[data-question]').textContent=`Has conseguido ${session.score} de 800 puntos. Puedes iniciar otra partida con conjuntos nuevos.`;
 $('[data-options]').hidden=true;$('[data-feedback]').textContent='';$('[data-next]').hidden=true;$('[data-restart]').hidden=false;
});
$('[data-restart]').addEventListener('click',start);
function start(){
 if (!canStartWidgetSession()) return;Object.assign(session,{rounds:generateSession(),index:0,score:0,attempts:0,done:false});render();}
start();
}

import { initializeWidget, canStartWidgetSession } from '../../shared/widget-runtime.js';
import {generateSession} from './generator.js';
const widgetAccess = await initializeWidget(document.body.dataset.widgetId);
if (widgetAccess) {
const $=s=>document.querySelector(s);
const state={cases:[],index:0,step:0,score:0,attempts:0,done:false};
const format=value=>new Intl.NumberFormat('es-ES',{maximumFractionDigits:1}).format(value);
function render(){
 const c=state.cases[state.index],root=$('[data-case]');root.replaceChildren();
 const title=document.createElement('h2');title.textContent=c.name;
 const intro=document.createElement('p');intro.textContent=`Un caso elegido al azar ${c.cause} con probabilidad ${c.prior} %. El resultado observado es: ${c.result}.`;
 const list=document.createElement('ul');
 for(const line of [`Si la causa es A, el resultado aparece en el ${c.likelihood} % de los casos.`,`Si la causa no es A, el resultado aparece en el ${c.alternative} % de los casos.`]){const li=document.createElement('li');li.textContent=line;list.append(li);}
 root.append(title,intro,list);
 $('[data-question]').textContent=state.step===0?'Paso 1. ¿Cuál es la probabilidad total del resultado observado?':'Paso 2. Sabiendo que se observó el resultado, ¿cuál es la probabilidad de la causa A?';
 $('[data-progress]').textContent=`Caso ${state.index+1} de 6 · Paso ${state.step+1} de 2 · ${state.score} de 1200 puntos`;
 $('[data-meter]').value=state.index*2+state.step;
 $('[data-answer]').value='';$('[data-answer]').disabled=false;$('[data-answer-label]').hidden=false;
 $('[data-feedback]').textContent='';$('[data-check]').hidden=false;$('[data-hint]').hidden=false;$('[data-next]').hidden=true;$('[data-restart]').hidden=true;
 state.attempts=0;state.done=false;
}
function explanation(c){
 const paths=`Camino de A: ${c.prior} % × ${c.likelihood} % = ${format(c.causePath)} %. Camino de no A: ${100-c.prior} % × ${c.alternative} % = ${format(c.otherPath)} %.`;
 return state.step===0?`${paths} Total: ${format(c.causePath)} % + ${format(c.otherPath)} % = ${format(c.total)} %.`:`${paths} Entre los resultados observados, ${format(c.causePath)} / ${format(c.total)} = ${format(c.posterior)} % procede de A.`;
}
function finish(correct){
 const c=state.cases[state.index];state.done=true;
 if(correct)state.score+=state.attempts===1?100:50;
 $('[data-answer]').disabled=true;$('[data-check]').hidden=true;$('[data-hint]').hidden=true;$('[data-next]').hidden=false;
 $('[data-feedback]').textContent=`${correct?'Correcto.':'Dos intentos agotados.'} ${explanation(c)}`;
 $('[data-progress]').textContent=`Caso ${state.index+1} de 6 · Paso ${state.step+1} de 2 · ${state.score} de 1200 puntos`;
}
$('[data-check]').addEventListener('click',()=>{
 if(state.done)return;
 const raw=$('[data-answer]').value.trim();
 if(!/^\d+(?:[,.]\d)?$/.test(raw)){ $('[data-feedback]').textContent='Escribe un porcentaje entre 0 y 100, con una décima como máximo.';return; }
 const value=Number(raw.replace(',','.'));
 if(value<0||value>100){$('[data-feedback]').textContent='El porcentaje debe estar entre 0 y 100.';return;}
 if(state.step===0&&!Number.isInteger(value)){$('[data-feedback]').textContent='En el primer paso, el resultado es un porcentaje entero.';return;}
 state.attempts++;
 const expected=state.step===0?state.cases[state.index].total:state.cases[state.index].posterior;
 if(Math.abs(value-expected)<0.001){finish(true);return;}
 if(state.attempts===2){finish(false);return;}
 $('[data-feedback]').textContent='Aún no. Comprueba la dirección de la condición y los dos caminos que llegan al resultado. Te queda un intento.';
});
$('[data-answer]').addEventListener('keydown',e=>{if(e.key==='Enter'){e.preventDefault();$('[data-check]').click();}});
$('[data-hint]').addEventListener('click',()=>{if(state.done)return;$('[data-feedback]').textContent=state.step===0?'Pista: multiplica cada probabilidad previa por su rama condicional y suma ambos caminos.':'Pista: divide el camino de A entre la probabilidad total del resultado calculada en el paso anterior.';});
$('[data-next]').addEventListener('click',()=>{
 if(!state.done)return;
 if(state.step===0){state.step=1;render();return;}
 state.step=0;state.index++;
 if(state.index<6){render();return;}
 $('[data-meter]').value=12;$('[data-progress]').textContent='Sesión terminada';$('[data-case]').textContent=`Has conseguido ${state.score} de 1200 puntos.`;
 $('[data-question]').textContent='Puedes iniciar otra partida con datos nuevos.';$('[data-answer-label]').hidden=true;$('[data-feedback]').textContent='';$('[data-next]').hidden=true;$('[data-restart]').hidden=false;
});
$('[data-restart]').addEventListener('click',start);
function start(){
 if (!canStartWidgetSession()) return;Object.assign(state,{cases:generateSession(),index:0,step:0,score:0,attempts:0,done:false});render();}
start();
}

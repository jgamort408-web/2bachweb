import { initializeWidget, canStartWidgetSession } from '../../shared/widget-runtime.js';
import {updateMath} from '../../../assets/js/core/math.js';
import {identity,actions,families,applyAction,generateTransformSession,sameGraph,description,expression,mappedPoint,baseValue,fmt,score} from './model.js';
import {draw} from './graph.js';
const widgetAccess = await initializeWidget(document.body.dataset.widgetId);
if (widgetAccess) {
const $=s=>document.querySelector(s),root=$('[data-game]');
let seed,session,index,state,moves,total,solved,shown,busy=false,done=false,finished=false;
const el=(tag,text)=>{const n=document.createElement(tag);if(text!==undefined)n.textContent=text;return n;};
for(const[key,label]of Object.entries(actions)){const b=el('button',label);b.type='button';b.dataset.action=key;b.addEventListener('click',()=>move(key));$('[data-controls]').append(b);}
function lock(value){busy=value;for(const b of document.querySelectorAll('[data-controls] button,[data-reset],[data-check],[data-hint],[data-solution]'))b.disabled=value||done;}
function updateGraph(){const q=session[index];$('[data-graph]').replaceChildren(draw(q.family,state,q.target,$('[data-original]').checked));
 const u=q.family==='absolute'?1:0,v=baseValue(q.family,u),p=mappedPoint(state,u,v);
 $('[data-description]').replaceChildren(el('p','Actual: '+description(q.family,state)),el('p','Objetivo: '+description(q.family,q.target)),el('p',`El punto original (${u}; ${v}) pasa a (${fmt(p.x)}; ${fmt(p.y)}) con tu transformación. Distintas transformaciones equivalentes pueden llevar ese punto a lugares distintos de la misma curva.`));
}
async function render(){
 root.dataset.state=JSON.stringify(state);root.dataset.moves=moves;root.dataset.round=index;
 $('[data-progress]').textContent=`Reto ${index+1} de 6 · ${moves} movimientos · ${total} puntos acumulados`;
 updateGraph();await updateMath($('[data-current]'),()=>{$('[data-current]').textContent=String.raw`Tu función actual: \[y=${expression(state)}.\]`;});
}
async function startRound(){
 done=false;lock(true);state=identity();moves=0;shown=false;finished=false;root.dataset.phase='playing';$('[data-next]').hidden=true;$('[data-history]').replaceChildren();
 await updateMath($('[data-feedback]'),()=>{$('[data-feedback]').replaceChildren();});
 const q=session[index];await updateMath($('[data-target]'),()=>{$('[data-target]').textContent=String.raw`${families[q.family].title}. Partimos de \(f(x)=${families[q.family].tex}\). Objetivo: \[g(x)=${expression(q.target)}.\]`;});
 await render();lock(false);if(index>0)$('[data-controls] button').focus();
}
function start(){
 if (!canStartWidgetSession()) return;let nextSeed=crypto.getRandomValues(new Uint32Array(1))[0];if(nextSeed===seed)nextSeed=(nextSeed+1)>>>0;seed=nextSeed;root.dataset.seed=seed;session=generateTransformSession(seed);index=0;total=0;solved=0;startRound();}
async function move(action){
 if(busy||done)return;lock(true);const next=action==='reset'?identity():applyAction(state,action);
 if(!next){$('[data-feedback]').textContent='Este movimiento supera los límites indicados. No cuenta; puedes elegir otro o volver a la original.';lock(false);return;}
 state=next;moves++;$('[data-history]').append(el('li',action==='reset'?'Volver a la original':actions[action]));
 await updateMath($('[data-feedback]'),()=>{$('[data-feedback]').textContent='Movimiento aplicado: '+(action==='reset'?'volver a la original':actions[action])+'.';});await render();lock(false);
}
$('[data-reset]').addEventListener('click',()=>move('reset'));
$('[data-original]').addEventListener('change',()=>{if(session)updateGraph();});
$('[data-hint]').addEventListener('click',async()=>{
 if(busy||done)return;lock(true);await updateMath($('[data-feedback]'),()=>{$('[data-feedback]').textContent='Pista: puedes volver a la original, aplicar escalas y reflexiones primero y dejar las traslaciones para el final. Revisa el vértice o las asíntotas en la descripción textual. Cada botón transforma la gráfica entera, incluidos sus desplazamientos.';});lock(false);
});
async function finish(showSolution){
 if(busy||done)return;lock(true);const q=session[index];
 if(!showSolution&&!sameGraph(q.family,state,q.target)){
  await updateMath($('[data-feedback]'),()=>{$('[data-feedback]').textContent='Todavía no coincide. Actual: '+description(q.family,state)+' Objetivo: '+description(q.family,q.target)+' Puedes seguir moviendo la gráfica sin límite de intentos.';});lock(false);return;
 }
 shown=showSolution;done=true;const earned=score(moves,shown);total+=earned;if(!shown)solved++;
 if(shown){state={...q.target};await render();}
 root.dataset.phase='answered';await updateMath($('[data-feedback]'),()=>{
  $('[data-feedback]').replaceChildren(el('p',shown?'Solución mostrada: 0 puntos en este reto.':'Correcto: las funciones coinciden en todo su dominio. '+earned+' puntos en este reto.'),el('p','Una ruta desde la original es: '+q.route.map(a=>actions[a]).join(' → ')+'. Es una ruta de referencia, no necesariamente la más corta.'),el('p',String.raw`El resultado es \(g(x)=${expression(q.target)}\).`));
 });lock(false);$('[data-next]').hidden=false;$('[data-next]').textContent=index===5?'Ver resumen':'Siguiente reto';
}
$('[data-check]').addEventListener('click',()=>finish(false));$('[data-solution]').addEventListener('click',()=>finish(true));
$('[data-next]').addEventListener('click',async()=>{
 if(busy)return;if(finished){start();return;}if(!done)return;
 if(index<5){index++;await startRound();return;}
 lock(true);finished=true;root.dataset.phase='summary';$('[data-progress]').textContent='Sesión terminada';await updateMath($('[data-feedback]'),()=>{$('[data-feedback]').textContent=`${total} puntos. ${solved} de 6 retos resueltos con tus movimientos. Las soluciones mostradas puntúan 0. No se guarda historial.`;});$('[data-next]').textContent='Nueva sesión';$('[data-next]').focus();lock(false);
});
start();
}

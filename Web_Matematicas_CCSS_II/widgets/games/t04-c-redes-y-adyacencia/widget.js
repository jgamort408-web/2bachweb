import { initializeWidget, canStartWidgetSession } from '../../shared/widget-runtime.js';
import {updateMath} from '../../../assets/js/core/math.js';
import {matrixTex} from '../../../content/models/matrix-basics.js';
import {toggleEdge} from '../../../content/models/graphs.js';
import {generateNetworks,blankMatrix,connections,letter,createNetworkState,answerNetwork,advanceNetwork,hintNetwork} from './generator.js';
import {createNetworkGraph} from './graph.js';
const widgetAccess = await initializeWidget(document.body.dataset.widgetId);
if (widgetAccess) {
const $=s=>document.querySelector(s),el=(tag,text)=>{const n=document.createElement(tag);if(text!==undefined)n.textContent=text;return n;},tex=String.raw;
const root=$('[data-game]'),question=$('[data-question]'),options=$('[data-options]'),grid=$('[data-grid]'),feedback=$('[data-feedback]'),check=$('[data-check]'),hint=$('[data-hint]'),next=$('[data-next]');
let session,state,seed,answer,graph,busy=false;
function lock(value){busy=value;options.disabled=check.disabled=hint.disabled=value||state?.phase!=='answer';next.disabled=value;graph?.lock(value||state?.phase!=='answer');}
function progress(){
 Object.assign(root.dataset,{seed,index:state.index,phase:state.phase,score:state.score});
 $('[data-progress]').textContent=state.phase==='summary'?'Sesión terminada':`Reto ${state.index+1} de 6 · ${state.score} de 600 puntos`;
 $('[data-meter]').value=state.results.length;
}
function redraw(){
 const r=session[state.index];
 grid.querySelectorAll('[data-cell]').forEach(input=>{const v=answer[Number(input.dataset.row)][Number(input.dataset.col)];if(input.type==='checkbox')input.checked=Boolean(v);else input.value=v;});
 graph.update(r.mode==='matrix'?r.matrix:answer);
 const a=r.mode==='matrix'?r.matrix:answer,links=connections(a,r.directed);
 $('[data-connections]').textContent=(r.mode==='matrix'?'Conexiones de referencia: ':'Conexiones de tu red: ')+(links.join('; ')||'ninguna')+'.';
}
function editConnection(i,j){
 if(busy||state.phase!=='answer')return;
 const r=session[state.index];answer=toggleEdge(answer,i,j,r.directed);redraw();
 $('[data-editor-status]').textContent=`Conexión de ${letter(i)} a ${letter(j)} ${answer[i][j]?'añadida':'retirada'}${r.directed?'.':' en ambos sentidos.'}`;
}
function buildGrid(r){
 const table=el('table'),head=el('thead'),body=el('tbody'),row=el('tr');
 row.append(el('th','De / a'));
 r.matrix.forEach((_,j)=>{const th=el('th',letter(j));th.scope='col';row.append(th);});head.append(row);
 r.matrix.forEach((values,i)=>{
  const tr=el('tr'),th=el('th',letter(i));th.scope='row';tr.append(th);
  values.forEach((_,j)=>{
   const td=el('td');
   if(i===j)td.textContent='0';
   else if(r.mode==='matrix'){
    const select=el('select');select.dataset.cell='';select.dataset.row=i;select.dataset.col=j;
    select.setAttribute('aria-label',`Fila ${letter(i)}, columna ${letter(j)}`);
    for(const v of [0,1]){const option=el('option',String(v));option.value=v;select.append(option);}
    select.addEventListener('change',()=>{if(busy||state.phase!=='answer')return;answer[i][j]=Number(select.value);});
    td.append(select);
   }else{
    const box=el('input');box.type='checkbox';box.dataset.cell='';box.dataset.row=i;box.dataset.col=j;
    box.setAttribute('aria-label',`Conexión de ${letter(i)} a ${letter(j)}`);box.addEventListener('change',()=>editConnection(i,j));td.append(box);
   }
   tr.append(td);
  });body.append(tr);
 });
 table.append(el('caption',r.mode==='matrix'?(r.directed?'Tu matriz: elige 0 o 1. Cada sentido se indica por separado.':'Tu matriz: elige 0 o 1. Completa también las posiciones simétricas.'):'Tu red: activa conexiones. En una red no dirigida se sincronizan ambos sentidos.'),head,body);grid.replaceChildren(table);
}
async function render(){
 lock(true);progress();options.hidden=false;$('[data-network]').hidden=false;check.hidden=hint.hidden=false;next.hidden=true;
 const r=session[state.index];answer=blankMatrix(r.matrix.length);
 await updateMath(question,()=>{question.replaceChildren(el('h2',r.title),el('p',`Red ${r.directed?'dirigida (las flechas indican el sentido)':'no dirigida (cada conexión permite ambos sentidos)'}. Orden de vértices: ${r.matrix.map((_,i)=>letter(i)).join(', ')}. Sin lazos ni conexiones múltiples.`));if(r.mode==='graph')question.append(el('p',tex`Reconstruye esta matriz en el grafo: \[A=${matrixTex(r.matrix)}.\]`));});
 $('[data-legend]').textContent=r.mode==='matrix'?'Construye la matriz de la red de referencia':'Construye la red de la matriz dada';
 $('[data-editor-help]').textContent=r.mode==='matrix'?'Observa el mapa o la lista de conexiones y completa la tabla. Puedes mover los nodos arrastrándolos o usando las flechas del teclado. Su posición no cambia la matriz.':'Conecta dos nodos: activa primero el origen y después el destino con clic o Enter/Espacio. Repite la pareja para retirar la conexión. Escape cancela. También puedes usar las casillas de la tabla. Arrastra nodos o muévelos con las flechas del teclado.';
 $('[data-editor-status]').textContent='';
 buildGrid(r);
 graph=createNetworkGraph($('[data-figure]'),{size:r.matrix.length,directed:r.directed,interactive:r.mode==='graph',onConnect:editConnection,onSelect:text=>$('[data-editor-status]').textContent=text});
 redraw();await updateMath(feedback,()=>feedback.replaceChildren());lock(false);
}
hint.addEventListener('click',async()=>{
 if(busy||state.phase!=='answer')return;lock(true);state=hintNetwork(state);await updateMath(feedback,()=>feedback.textContent='Pista: '+session[state.index].hint);lock(false);
});
check.addEventListener('click',async()=>{
 if(busy||state.phase!=='answer')return;lock(true);
 const r=session[state.index],result=answerNetwork(state,r,answer);state=result.state;
 await updateMath(feedback,()=>{
  feedback.replaceChildren(el('p',result.correct?'Correcto: coinciden todas las conexiones.':`Hay ${result.differences.length} entradas distintas de la matriz de referencia. Revisa origen, destino y simetría.`));
  if(result.done)feedback.append(el('p','Solución: '+r.explanation),el('p',result.correct?`Reto completado: ${result.points} puntos.`:'Reto terminado con la solución explicada: 0 puntos.'));
  else feedback.append(el('p','Te queda un intento. La diagonal permanece en cero; mover los nodos no cambia las conexiones.'));
 });
 progress();lock(false);
 if(result.done){next.hidden=false;next.textContent=state.index===5?'Ver resumen':'Siguiente red';next.focus();}
});
next.addEventListener('click',async()=>{
 if(busy)return;
 if(state.phase==='summary'){await start();grid.querySelector('select,input')?.focus();return;}
 if(state.phase!=='resolved')return;
 lock(true);state=advanceNetwork(state,session.length);
 if(state.phase!=='summary'){await render();grid.querySelector('select,input')?.focus();return;}
 progress();options.hidden=true;$('[data-network]').hidden=true;check.hidden=hint.hidden=true;
 await updateMath(question,()=>question.replaceChildren(el('h2','Redes revisadas')));
 await updateMath(feedback,()=>{
  feedback.replaceChildren(el('p',`${state.score} de 600 puntos. ${state.results.filter(v=>v.correct&&v.attempts===1).length} de 6 retos al primer intento. Pistas utilizadas: ${state.hints.length}. Este resumen no se guarda.`));
  const list=el('ol');
  for(const r of session){const item=el('li'),details=el('details'),result=state.results[r.index];details.append(el('summary',`${r.title} · ${result.points} puntos${result.correct?'':' · Solución consultada'}`),el('p',r.explanation));item.append(details);list.append(item);}feedback.append(list);
 });next.hidden=false;next.textContent='Nueva sesión';lock(false);next.focus();
});
async function start(){
 if (!canStartWidgetSession()) return;
 lock(true);let newSeed=crypto.getRandomValues(new Uint32Array(1))[0];if(newSeed===seed)newSeed=(newSeed+1)>>>0;seed=newSeed;session=generateNetworks(seed);state=createNetworkState();await render();
}
start();
}

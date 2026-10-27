import { initializeWidget, canStartWidgetSession } from '../../shared/widget-runtime.js';
import {updateMath} from '../../../assets/js/core/math.js';
import {augmentedTex,equivalentSystemTex,operationTex} from '../../../content/models/equivalent-systems.js';
import {affineTex} from '../../../content/models/gauss.js';
import {generateGaussGame,createGaussState,applyGaussStep,undoGaussStep,resetGaussChallenge,revealGaussRoute,checkGaussChallenge,suggestOperation,isEchelon,parseFactor} from './model.js';
const widgetAccess = await initializeWidget(document.body.dataset.widgetId);
if (widgetAccess) {
const $=s=>document.querySelector(s),root=$('[data-game]'),board=$('[data-board]'),status=$('[data-status]'),feedback=$('[data-feedback]'),next=$('[data-next]'),tex=String.raw;
const el=(tag,text)=>{const e=document.createElement(tag);if(text!==undefined)e.textContent=text;return e;};
let session,state,seed,results=[],busy=false,summary=false;
const challenge=()=>session[state.index],score=()=>results.reduce((n,r)=>n+r.result.points,0);
function lock(value){
 busy=value;const disabled=value||summary||state?.phase!=='working';
 $('[data-row-controls]').disabled=$('[data-classification]').disabled=$('[data-check]').disabled=disabled;
 $('[data-undo]').disabled=disabled||!state.history.length;
 $('[data-reveal]').disabled=disabled;
 next.disabled=value;
 $('[data-source]').disabled=$('[data-operation]').value==='scale';
 $('[data-factor]').disabled=$('[data-operation]').value==='swap';
}
function progress(){
 Object.assign(root.dataset,{seed,index:state.index,phase:summary?'summary':state.phase,score:score(),assisted:state.assisted,steps:state.history.length,snapshot:JSON.stringify(state.matrix)});
 $('[data-meter]').value=results.length;
 $('[data-progress]').textContent=summary?'Sesión terminada':`Reto ${state.index+1} de 6 · ${score()} de 600 puntos`;
}
function solution(c){
 const g=c.details,fragment=document.createDocumentFragment();
 fragment.append(el('p',tex`\(\operatorname{rg}(A)=${g.r},\quad\operatorname{rg}(A|B)=${g.s},\quad n=${g.n}\). Sistema ${g.kind}.`));
 if(g.kind==='SI'){fragment.append(el('p','La ampliada tiene una fila incompatible. No hay solución.'));return fragment;}
 fragment.append(el('p',tex`\[${['x','y','z'].slice(0,g.n).map((v,j)=>v+'='+affineTex(g.expressions[j])).join(',\\qquad ')}.\]`));
 if(g.free.length)fragment.append(el('p',tex`Hay \(${g.free.length}\) parámetros reales independientes. La forma de escribir la familia puede cambiar con la ruta; describe el mismo conjunto solución.`));
 const verify=el('details');verify.append(el('summary','Comprobar en el sistema original'));
 c.rows.forEach((row,i)=>verify.append(el('p',tex`Ecuación ${i+1}: \(${row.slice(0,-1).map((v,j)=>tex`(${v})\left(${affineTex(g.expressions[j])}\right)`).join('+')}=${row.at(-1)}\).`)));
 fragment.append(verify);return fragment;
}
async function renderBoard(){
 progress();const c=challenge();
 await updateMath(board,()=>{
  board.replaceChildren(el('h2',c.title),el('p',tex`Sistema inicial: \[${equivalentSystemTex(c.initial)}\]`),el('h3','Matriz ampliada actual'),el('p',tex`\[${augmentedTex(state.matrix)}\]`),
   el('p',isEchelon(state.matrix)?'La matriz está escalonada. Ya puedes clasificar el sistema.':'Continúa eliminando coeficientes debajo de los pivotes.'),
   el('p',state.history.length+' pasos en la ruta actual. Operaciones válidas aplicadas por ti: '+state.operations+'.'+(state.assisted?' Asistencia activa: este reto vale 0 puntos.':'')));
  if(state.history.length){
   const details=el('details'),list=el('ol');details.append(el('summary','Ver historial de operaciones'));
   for(const h of state.history)list.append(el('li',tex`\(${operationTex(h.operation)}\)`));details.append(list);board.append(details);
  }
 });
}
async function renderChallenge(){
 lock(true);summary=false;
 for(const key of ['target','source']){
  const select=$('[data-'+key+']');select.replaceChildren();
  state.matrix.forEach((_,i)=>{const o=el('option','Fila '+(i+1));o.value=i;select.append(o);});
 }
 $('[data-target]').value='1';$('[data-source]').value='0';
 for(const input of document.querySelectorAll('[name="kind"]'))input.checked=false;
 $('[data-row-controls]').hidden=$('[data-classification]').hidden=$('[data-check]').hidden=false;next.hidden=true;
 await updateMath(status,()=>status.replaceChildren());await updateMath(feedback,()=>feedback.replaceChildren());await renderBoard();lock(false);
}
$('[data-operation]').addEventListener('change',()=>lock(busy));
async function transform(work,message){
 if(busy||state.phase!=='working')return;lock(true);
 try{state=work();await renderBoard();await updateMath(status,()=>status.textContent=message);}
 catch(error){await updateMath(status,()=>status.textContent=error.message);}
 lock(false);
}
$('[data-apply]').addEventListener('click',()=>transform(()=>{
 const kind=$('[data-operation]').value,op={kind,target:Number($('[data-target]').value),source:Number($('[data-source]').value)};
 if(kind!=='swap')op.scalar=parseFactor($('[data-factor]').value);
 return applyGaussStep(state,op);
},'Operación aplicada a toda la fila, incluido B. Conserva las soluciones.'));
$('[data-undo]').addEventListener('click',()=>transform(()=>undoGaussStep(state),'Último paso deshecho.'));
$('[data-reset]').addEventListener('click',()=>transform(()=>resetGaussChallenge(state,challenge()),'Matriz inicial restaurada; se conservan intentos y asistencia.'));
$('[data-reveal]').addEventListener('click',()=>transform(()=>revealGaussRoute(state,challenge()),'Se muestra una ruta posible desde el inicio. Consulta el historial y clasifica el sistema; este reto no dará puntos.'));
$('[data-hint]').addEventListener('click',async()=>{
 if(busy||state.phase!=='working')return;lock(true);state={...state,hinted:true};
 const op=suggestOperation(state.matrix);
 if(op){
  $('[data-operation]').value=op.kind;$('[data-target]').value=op.target;
  if(op.source!==undefined)$('[data-source]').value=op.source;
  if(op.scalar)$('[data-factor]').value=op.scalar.numerator+'/'+op.scalar.denominator;
  await updateMath(status,()=>status.textContent=tex`Una posibilidad es \(${operationTex(op)}\). Los controles están preparados; aplica el paso si lo consideras adecuado.`);
 }else await updateMath(status,()=>status.textContent=isEchelon(state.matrix)?'La matriz ya está escalonada. Compara rangos y número de incógnitas.':'Esta ruta necesita factores fuera de la ayuda simple. Puedes deshacer, reiniciar o consultar la ruta resuelta.');
 lock(false);
});
$('[data-check]').addEventListener('click',async()=>{
 if(busy||state.phase!=='working')return;lock(true);
 const c=challenge(),result=checkGaussChallenge(state,c,document.querySelector('[name="kind"]:checked')?.value);
 if(result.ignored){await updateMath(feedback,()=>feedback.textContent=result.message||'');lock(false);return;}
 state=result.state;
 await updateMath(feedback,()=>{
  feedback.replaceChildren(el('p',result.correct?'Clasificación correcta.':'Revisa la clasificación.'));
  if(result.done){feedback.append(solution(c),el('p',result.points+' puntos en este reto.'));results.push({challenge:c,result:state.result});}
  else feedback.append(el('p','Te queda un intento. Compara los rangos de A y de la ampliada; si coinciden, compáralos con el número de incógnitas.'));
 });
 progress();lock(false);
 if(result.done){next.hidden=false;next.textContent=state.index===5?'Ver resumen':'Siguiente reto';next.focus();}
});
next.addEventListener('click',async()=>{
 if(busy)return;
 if(summary){await start();$('[data-operation]').focus();return;}
 if(state.phase!=='resolved')return;lock(true);
 if(state.index<5){state=createGaussState(session[state.index+1]);await renderChallenge();$('[data-operation]').focus();return;}
 summary=true;progress();$('[data-row-controls]').hidden=$('[data-classification]').hidden=$('[data-check]').hidden=true;
 await updateMath(status,()=>status.replaceChildren());await updateMath(board,()=>board.replaceChildren(el('h2','Resumen de la sesión')));
 await updateMath(feedback,()=>{
  feedback.replaceChildren(el('p',`${score()} de 600 puntos. Retos con ruta resuelta: ${results.filter(r=>r.result.assisted).length}. Retos con pista: ${results.filter(r=>r.result.hinted).length}. Este resumen no se guarda.`));
  const list=el('ol');
  for(const {challenge:c,result:r} of results){const li=el('li'),details=el('details');details.append(el('summary',c.title+' · '+r.points+' puntos'),el('p',tex`\[${equivalentSystemTex(c.initial)}\]`),solution(c),el('p','Operaciones válidas aplicadas por ti: '+r.operations+'.'));li.append(details);list.append(li);}
  feedback.append(list);
 });next.textContent='Nueva sesión';next.hidden=false;lock(false);next.focus();
});
async function start(){
 if (!canStartWidgetSession()) return;
 busy=true;let candidate=crypto.getRandomValues(new Uint32Array(1))[0];if(candidate===seed)candidate=(candidate+1)>>>0;
 seed=candidate;session=generateGaussGame(seed);results=[];summary=false;state=createGaussState(session[0]);await renderChallenge();
}
start();
}

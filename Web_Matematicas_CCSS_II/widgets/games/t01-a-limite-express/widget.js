import { initializeWidget, canStartWidgetSession } from '../../shared/widget-runtime.js';
import { updateMath } from '../../../assets/js/core/math.js';
import { ExpressSession } from './session.js';
import { mountLimitGraph } from './graph.js';

const widgetAccess = await initializeWidget(document.body.dataset.widgetId);
if (widgetAccess) {
const $=selector=>document.querySelector(selector);
const titles=['Sustitución','Laterales y racionales','Indeterminaciones','Elección del método'];
let session,phase='mode',timed=false,paused=false,remaining=20000,lastTick=0,clock,graph;
const mathText=(root,text)=>updateMath(root,()=>{root.textContent=text;});
function counters() {
  const q=session.question;
  $('[data-progress]').textContent='Pregunta '+(session.index+1)+' de 10 · Nivel '+q.level+': '+titles[q.level-1]+(q.boss?' · Ronda especial':'');
  $('[data-score]').textContent=session.score+' puntos · Racha '+session.streak+' · Mejor racha '+session.bestStreak;
}
function lock() {
  $('[data-answer] fieldset').disabled=phase!=='answer'||paused;
  $('[data-hint]').disabled=phase!=='answer'||paused;
  $('[data-pause]').disabled=phase!=='answer';
}
function stopClock(){clearInterval(clock);clock=undefined;}
function showTime(){
  $('[data-time]').textContent=(paused?'En pausa · ':'')+Math.ceil(remaining/1000)+' segundos';
  $('[data-ring]').setAttribute('stroke-dashoffset',100*(1-remaining/20000));
}
function tick(){
  const now=performance.now();
  if(timed&&!paused&&phase==='answer')remaining=Math.max(0,remaining-(now-lastTick));
  lastTick=now;showTime();
  if(remaining===0&&phase==='answer'){
    session.expire();finish('Tiempo agotado. ');
  }
}
function pause(reason='Reloj en pausa. Pulsa Reanudar para continuar.'){
  if(!timed||phase!=='answer')return;
  if(!paused){tick();if(phase!=='answer')return;}
  paused=!paused;lastTick=performance.now();graph?.stop();
  $('[data-pause]').textContent=paused?'Reanudar':'Pausar';
  $('[data-clock-notice]').textContent=paused?reason:'Continúa la pregunta.';
  showTime();lock();
}
function activate(){
  if(!['loading','waiting-math'].includes(phase))return;
  phase='answer';lock();$('[data-clock-notice]').textContent='';
  if(timed){lastTick=performance.now();clock=setInterval(tick,100);}
  $('[data-options] input')?.focus();
}
async function render(){
  stopClock();graph?.destroy();graph=undefined;
  phase='loading';paused=false;remaining=20000;lock();counters();showTime();
  $('[data-next]').hidden=true;$('[data-pause]').textContent='Pausar';
  $('[data-clock-notice]').textContent='Preparando fórmulas; el reloj aún no corre.';
  await mathText($('[data-feedback]'),'');
  const q=session.question;
  const ok=await mathText($('[data-question]'),q.prompt);
  const options=[...q.options];
  for(let i=options.length-1;i>0;i--){const j=Math.floor(Math.random()*(i+1));[options[i],options[j]]=[options[j],options[i]];}
  const optionsOK=await updateMath($('[data-options]'),()=>{
    $('[data-options]').replaceChildren();
    for(const option of options){
      const label=document.createElement('label'),input=document.createElement('input'),text=document.createElement('span');
      label.className='answer-option';input.type='radio';input.name=q.id;input.value=option.id;
      text.textContent=option.text;text.dataset.contentRole='answer-option';
      label.append(input,text);$('[data-options]').append(label);
    }
  });
  $('[data-graph]').hidden=!q.graph;
  if(q.graph)graph=mountLimitGraph($('[data-graph]'),q.graph);
  if(ok&&optionsOK)activate();else phase='waiting-math';
}
document.addEventListener('math:rendered',()=>{
  // Esperar a la recuperación de todos los ámbitos de la pregunta.
  if(phase==='waiting-math')queueMicrotask(()=>{
    if($('.math-status')?.hidden===true)activate();
  });
});
async function finish(prefix) {
  phase='done';stopClock();graph?.stop();lock();counters();
  const q=session.question,correct=q.options.find(o=>o.id===q.correct);
  await mathText($('[data-feedback]'),prefix+'Solución: '+correct.text+'. '+q.explanation);
  $('[data-next]').textContent=session.index===9?'Ver resumen':'Siguiente pregunta';
  $('[data-next]').hidden=false;
}
$('[data-answer]').addEventListener('submit',async event=>{
  event.preventDefault();if(phase!=='answer'||paused)return;
  tick();if(phase!=='answer')return;
  const result=session.answer($('[data-options] input:checked')?.value);
  if(result.status==='blank'){await mathText($('[data-feedback]'),'Selecciona una respuesta antes de comprobar.');return;}
  if(result.status==='done'){await finish((result.correct?'Correcta. ':'Revisa tu respuesta. ')+result.option.feedback+' ');return;}
  // Bloquear envíos mientras se representa la explicación del primer intento.
  phase='feedback';lock();
  await mathText($('[data-feedback]'),'Revisa tu respuesta. '+result.option.feedback+' Puedes intentarlo una vez más o consultar la pista.');
  phase='answer';lastTick=performance.now();lock();
});
$('[data-hint]').addEventListener('click',()=>{
  if(phase!=='answer'||paused)return;
  session.hint();mathText($('[data-feedback]'),'Pista: '+session.question.hint);
});
$('[data-pause]').addEventListener('click',()=>pause());
document.addEventListener('visibilitychange',()=>{
  graph?.stop();if(document.hidden&&!paused)pause('Reloj en pausa al ocultar la página. Pulsa Reanudar al volver.');
});
$('[data-next]').addEventListener('click',()=>{
  if(phase!=='done')return;
  if(session.next()){render();return;}
  phase='summary';graph?.destroy();graph=undefined;
  $('[data-game]').hidden=true;$('[data-summary]').hidden=false;
  $('[data-total]').textContent=session.correct+' de 10 respuestas correctas · '+session.firstTry+' al primer intento · '+session.score+' de 1000 puntos · Mejor racha '+session.bestStreak+'. Resultado de esta sesión; no se guarda un historial.';
  const list=document.createElement('ul');
  session.levels.forEach((level,i)=>{const li=document.createElement('li');li.textContent='Nivel '+(i+1)+' · '+titles[i]+': '+level.correct+' de '+level.total;list.append(li);});
  $('[data-levels]').replaceChildren(list);$('[data-restart]').focus();
});
for(const button of document.querySelectorAll('[data-start]'))button.addEventListener('click',()=>{
  if (!canStartWidgetSession()) return;
  if(phase!=='mode')return;
  session=new ExpressSession(crypto.getRandomValues(new Uint32Array(1))[0]);
  timed=button.dataset.start==='challenge';
  $('[data-mode]').hidden=true;$('[data-game]').hidden=false;$('[data-clock]').hidden=!timed;render();
});
$('[data-restart]').addEventListener('click',()=>{
  if (!canStartWidgetSession()) return;
  phase='mode';$('[data-summary]').hidden=true;$('[data-mode]').hidden=false;$('[data-start]').focus();
});
window.addEventListener('pagehide',()=>{
  if(timed&&phase==='answer'&&!paused)pause('Reloj en pausa. Pulsa Reanudar para continuar.');
  stopClock();graph?.stop();
});
window.addEventListener('pageshow',event=>{
  if(event.persisted&&timed&&phase==='answer'){lastTick=performance.now();clock=setInterval(tick,100);}
});
}

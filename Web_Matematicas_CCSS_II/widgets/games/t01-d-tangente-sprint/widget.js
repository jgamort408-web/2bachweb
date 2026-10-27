import { initializeWidget, canStartWidgetSession } from '../../shared/widget-runtime.js';
import { updateMath } from '../../../assets/js/core/math.js';
import { generateTangentSession, polynomialValue, polynomialTex, parseNumber, sameNumber, sameLine } from './generator.js';

const widgetAccess = await initializeWidget(document.body.dataset.widgetId);
if (widgetAccess) {

const $=selector=>document.querySelector(selector);
const calculate=$('[data-calculate]'), equation=$('[data-equation]');
const graph=$('[data-graph]'), svg=graph.querySelector('svg');
let questions, index=0, score=0, completed=0, timed=false, phase='mode';
let awarded, usedHint, proposal, paused=false, remaining=45000, lastTick=0, interval;
const current=()=>questions[index];
const active=()=>['calculate','equation','graph'].includes(phase);
const fmt=value=>value.toLocaleString('es-ES',{maximumFractionDigits:8});
const lineTex=line=>line.type==='vertical'?'x='+line.x:'y='+polynomialTex([line.b,line.m]);
const mathText=(root,text)=>updateMath(root,()=>{root.textContent=text;});
const px=x=>240+(x-current().a)*40, py=y=>165-(y-current().y)*40;
const snap=value=>Math.round(value*2)/2;
const clamp=(value,min,max)=>Math.max(min,Math.min(max,value));

function progress() {
  $('[data-progress]').textContent='Reto '+(index+1)+' de 6 · '+(current().kind==='normal'?'Normal':'Tangente')+' · '+score+' puntos';
}
function award(key,points) {
  if(!awarded.has(key)){awarded.add(key);score+=points;progress();}
}
function lockControls() {
  calculate.querySelector('fieldset').disabled=phase!=='calculate'||paused;
  equation.querySelector('fieldset').disabled=phase!=='equation'||paused;
  $('[data-graph-controls]').disabled=phase!=='graph'||paused;
  graph.dataset.disabled=String(phase!=='graph'||paused);
  $('[data-hint]').disabled=!active()||paused;
  $('[data-pause]').disabled=!active();
}
function stopClock() { clearInterval(interval); interval=undefined; }
function displayTime() { $('[data-time]').textContent=(paused?'En pausa · ':'')+Math.ceil(remaining/1000)+' segundos'; }
function tick() {
  const now=performance.now();
  if(!paused&&active())remaining=Math.max(0,remaining-(now-lastTick));
  lastTick=now;displayTime();
  if(remaining===0&&active())finish(false);
}
function pause(reason='Reloj en pausa. Pulsa Reanudar para continuar.') {
  if(!timed||!active())return;
  if(!paused){tick();if(!active())return;}
  paused=!paused;lastTick=performance.now();
  $('[data-pause]').textContent=paused?'Reanudar':'Pausar';
  $('[data-time-notice]').textContent=paused?reason:'Continúa el reto.';
  displayTime();lockControls();
}
function activateRound() {
  if(!['loading','waiting-math'].includes(phase))return;
  phase='calculate';lockControls();
  $('[data-time-notice]').textContent='';
  if(timed){lastTick=performance.now();interval=setInterval(tick,100);}
  $('#sprint-value').focus();
}
async function startRound() {
  stopClock();phase='loading';paused=false;remaining=45000;usedHint=false;awarded=new Set();
  calculate.reset();equation.reset();
  equation.hidden=true;graph.hidden=true;$('[data-ordinary]').hidden=false;$('[data-vertical]').hidden=true;
  $('[data-next]').hidden=true;$('[data-solution]').hidden=true;$('[data-solution]').open=false;
  for(const selector of ['[data-calculate-feedback]','[data-equation-feedback]','[data-graph-feedback]','[data-hint-text]'])$(selector).textContent='';
  $('[data-pause]').textContent='Pausar';$('[data-time-notice]').textContent='Preparando las fórmulas; el reloj aún no corre.';
  const q=current();
  proposal=q.line.type==='vertical'?{type:'vertical',x:q.a+1}:{type:'ordinary',m:0,b:q.y+1};
  progress();displayTime();lockControls();
  const ok=await mathText($('[data-problem]'),'Construye la '+(q.kind==='normal'?'normal':'tangente')+' a \\(f(x)='+polynomialTex(q.coefficients)+'\\) en \\(a='+q.a+'\\).');
  if(ok)activateRound();else phase='waiting-math';
}
document.addEventListener('math:rendered',()=>{
  if(phase==='waiting-math'&&$('[data-problem] mjx-container'))activateRound();
});

calculate.addEventListener('submit',event=>{
  event.preventDefault();if(phase!=='calculate'||paused)return;
  const y=parseNumber($('#sprint-value').value), slope=parseNumber($('#sprint-slope').value);
  const feedback=$('[data-calculate-feedback]'),q=current();
  if(y===null||slope===null){feedback.textContent='Completa ambos valores con números o fracciones de denominador no nulo.';return;}
  const valueOK=sameNumber(y,q.y), slopeOK=sameNumber(slope,q.slope);
  if(valueOK)award('value',100);if(slopeOK)award('slope',100);
  if(!valueOK||!slopeOK){feedback.textContent='Revisa '+[!valueOK?'el valor de la función':null,!slopeOK?'la derivada en el punto':null].filter(Boolean).join(' y ')+'.';return;}
  feedback.textContent='Correcto: punto ('+q.a+', '+q.y+') y pendiente de la tangente '+q.slope+'.';
  phase='equation';equation.hidden=false;lockControls();$('#sprint-type').focus();
});
$('#sprint-type').addEventListener('change',()=>{
  const vertical=$('#sprint-type').value==='vertical';
  $('[data-ordinary]').hidden=vertical;$('[data-vertical]').hidden=!vertical;
});
equation.addEventListener('submit',event=>{
  event.preventDefault();if(phase!=='equation'||paused)return;
  const vertical=$('#sprint-type').value==='vertical',feedback=$('[data-equation-feedback]');
  const answer=vertical?{type:'vertical',x:parseNumber($('#sprint-x').value)}:
    {type:'ordinary',m:parseNumber($('#sprint-m').value),b:parseNumber($('#sprint-b').value)};
  if(Object.values(answer).includes(null)){feedback.textContent='Completa los coeficientes de la recta elegida con números válidos.';return;}
  if(!sameLine(answer,current().line)){
    feedback.textContent=current().kind==='normal'?'La normal pasa por el punto y es perpendicular a la tangente. Si la tangente es horizontal, la normal es vertical.':'Comprueba la pendiente y que tu recta pasa por el punto. La ordenada b no tiene por qué ser f(a).';
    return;
  }
  award('equation',150);feedback.textContent='Ecuación correcta. Ahora coloca esa recta en la gráfica.';
  phase='graph';graph.hidden=false;draw();lockControls();
  $(vertical?'#graph-x':'#graph-m').focus();
});

function draw() {
  const q=current(), vertical=proposal.type==='vertical';
  const curve=Array.from({length:221},(_,i)=>{
    const x=q.a-5.5+i/20;
    return (i?'L':'M')+px(x)+' '+py(polynomialValue(q.coefficients,x));
  }).join(' ');
  $('[data-curve]').setAttribute('d',curve);
  $('[data-axes]').setAttribute('d','M20 '+py(0)+'H460 M'+px(0)+' 25V305');
  const line=vertical?'M'+px(proposal.x)+' 25V305':
    'M20 '+py(proposal.m*(q.a-5.5)+proposal.b)+'L460 '+py(proposal.m*(q.a+5.5)+proposal.b);
  $('[data-line]').setAttribute('d',line);
  const position=$('[data-handle="position"]'),slope=$('[data-handle="slope"]');
  position.setAttribute('cx',vertical?px(proposal.x):px(q.a));
  position.setAttribute('cy',vertical?py(q.y):py(proposal.m*q.a+proposal.b));
  slope.hidden=vertical;slope.style.display=vertical?'none':'';
  if(!vertical){slope.setAttribute('x',px(q.a+1)-9);slope.setAttribute('y',py(proposal.m*(q.a+1)+proposal.b)-9);}
  $('[data-graph-ordinary]').hidden=vertical;$('[data-graph-vertical]').hidden=!vertical;
  for(const key of vertical?['x']:['m','b']){
    $('#graph-'+key).value=proposal[key];$('[data-'+key+'-output]').textContent=fmt(proposal[key]);
  }
  const ticks=$('[data-ticks]');ticks.replaceChildren();
  for(const [x,y,label] of [
    ...[-4,-2,0,2,4].map(offset=>[px(q.a+offset),325,String(q.a+offset)]),
    ...[-2,0,2].map(offset=>[10,py(q.y+offset),String(q.y+offset)]),
  ]){
    const text=document.createElementNS('http://www.w3.org/2000/svg','text');
    text.setAttribute('x',x);text.setAttribute('y',y);text.setAttribute('text-anchor','middle');text.textContent=label;ticks.append(text);
  }
  $('#sprint-graph-desc').textContent='Punto de la curva: ('+q.a+', '+q.y+'). Tu propuesta: '+(vertical?'vertical en x='+fmt(proposal.x):'pendiente '+fmt(proposal.m)+' y ordenada '+fmt(proposal.b))+'. Los controles permiten cambiar estos mismos valores.';
  mathText($('[data-line-formula]'),'Tu propuesta: \\('+lineTex(proposal)+'\\).');
}
for(const key of ['m','b','x'])$('#graph-'+key).addEventListener('input',()=>{
  if(phase!=='graph'||paused)return;
  proposal[key]=Number($('#graph-'+key).value);$('[data-graph-feedback]').textContent='';draw();
});
// El SVG y los rangos comparten el mismo estado y pasos de media unidad.
for(const handle of graph.querySelectorAll('[data-handle]')){
  let pointer=null;
  handle.addEventListener('pointerdown',event=>{
    if(phase!=='graph'||paused)return;
    event.preventDefault();pointer=event.pointerId;handle.setPointerCapture(pointer);
  });
  handle.addEventListener('pointermove',event=>{
    if(pointer!==event.pointerId||phase!=='graph'||paused)return;
    const point=new DOMPoint(event.clientX,event.clientY).matrixTransform(svg.getScreenCTM().inverse());
    const q=current(),x=q.a+(point.x-240)/40,y=q.y+(165-point.y)/40;
    if(proposal.type==='vertical')proposal.x=clamp(snap(x),-5,5);
    else if(handle.dataset.handle==='position')proposal.b=clamp(snap(y-proposal.m*q.a),-10,10);
    else {
      const pivot=proposal.m*q.a+proposal.b;
      proposal.m=clamp(snap(y-pivot),-4,4);
      proposal.b=clamp(pivot-proposal.m*q.a,-10,10);
    }
    $('[data-graph-feedback]').textContent='';draw();
  });
  const release=()=>{pointer=null;};
  handle.addEventListener('pointerup',release);handle.addEventListener('pointercancel',release);handle.addEventListener('lostpointercapture',release);
}
$('[data-check-graph]').addEventListener('click',()=>{
  if(phase!=='graph'||paused)return;
  if(!sameLine(proposal,current().line)){
    $('[data-graph-feedback]').textContent='Aún no coincide. Compara la ecuación de tu propuesta con la que acabas de calcular; no basta con que ambas pasen por el punto.';
    return;
  }
  award('graph',150);if(!usedHint)award('bonus',100);
  completed++;finish(true);
});
function finish(success) {
  stopClock();phase='done';paused=false;lockControls();
  const q=current();
  $('[data-time-notice]').textContent=success?'Reto completado.':'Tiempo agotado. Conservas los puntos obtenidos y puedes estudiar la solución antes de continuar.';
  if(!success){proposal={...q.line};graph.hidden=false;draw();}
  $('[data-graph-feedback]').textContent=success?'Ajuste correcto: la recta coincide en pendiente y posición.':'La gráfica muestra ahora la solución. Tus cálculos escritos se conservan.';
  const derivative=q.coefficients.slice(1).map((value,i)=>value*(i+1));
  const reason=q.kind==='tangent'?'La pendiente pedida es la derivada.':
    q.slope===0?'La tangente es horizontal, por lo que la normal es vertical.':'La pendiente normal es el opuesto del inverso de la pendiente tangente.';
  mathText($('[data-solution-text]'),"\\[f'(x)="+polynomialTex(derivative)+"\\]\\[P=("+q.a+','+q.y+"),\\quad f'("+q.a+')='+q.slope+'\\] '+reason+' La recta pedida es \\('+lineTex(q.line)+'\\).');
  $('[data-solution]').hidden=false;$('[data-solution]').open=!success;
  $('[data-next]').hidden=false;$('[data-next]').textContent=index===5?'Ver resumen':'Siguiente reto';
}
$('[data-hint]').addEventListener('click',()=>{
  if(!active()||paused)return;usedHint=true;
  const q=current();
  mathText($('[data-hint-text]'),phase==='calculate'?'Sustituye a en f. Después deriva el polinomio y sustituye a en la derivada.':
    phase==='equation'?(q.kind==='normal'?'Usa \\(m_n=-1/f\\prime(a)\\) si la derivada no es cero; si es cero, la normal es \\(x=a\\).':
      'La tangente cumple \\(y-f(a)=f\\prime(a)(x-a)\\). Despeja la ordenada: \\(b=f(a)-ma\\).'):
    'El círculo desplaza la recta. El cuadrado cambia la inclinación manteniendo un punto de referencia. También puedes usar los rangos; lee la ecuación de tu propuesta.');
});
$('[data-pause]').addEventListener('click',()=>pause());
document.addEventListener('visibilitychange',()=>{
  if(document.hidden&&!paused)pause('Reloj en pausa al ocultar la página. Pulsa Reanudar cuando vuelvas.');
});
$('[data-next]').addEventListener('click',()=>{
  if(phase!=='done')return;
  if(index<5){index++;startRound();}
  else{
    phase='summary';$('[data-session]').hidden=true;$('[data-summary]').hidden=false;
    $('[data-total]').textContent=completed+' de 6 retos completados · '+score+' de 3600 puntos. Resultado de esta sesión; no se guarda un historial.';
    $('[data-restart]').focus();
  }
});
for(const button of document.querySelectorAll('[data-start]'))button.addEventListener('click',()=>{
  if (!canStartWidgetSession()) return;
  if(phase!=='mode')return;
  timed=button.dataset.start==='sprint';questions=generateTangentSession(crypto.getRandomValues(new Uint32Array(1))[0]);
  index=0;score=0;completed=0;
  $('[data-mode]').hidden=true;$('[data-session]').hidden=false;$('[data-clock]').hidden=!timed;startRound();
});
$('[data-restart]').addEventListener('click',()=>{
  if (!canStartWidgetSession()) return;
  stopClock();phase='mode';$('[data-summary]').hidden=true;$('[data-mode]').hidden=false;$('[data-start]').focus();
});
window.addEventListener('pagehide',()=>{
  if(timed&&active()&&!paused)pause();
  stopClock();
});
window.addEventListener('pageshow',event=>{
  if(event.persisted&&timed&&active()){
    stopClock();lastTick=performance.now();interval=setInterval(tick,100);
  }
});
}

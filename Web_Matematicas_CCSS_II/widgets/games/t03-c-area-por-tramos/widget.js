import { initializeWidget, canStartWidgetSession } from '../../shared/widget-runtime.js';
import {updateMath} from '../../../assets/js/core/math.js';
import {generateAreas,createAreaState,assessArea,advanceArea,hintArea,fractionTex as ft} from './generator.js';
import {drawAreaGraph} from './graph.js';
const widgetAccess = await initializeWidget(document.body.dataset.widgetId);
if (widgetAccess) {
const $=s=>document.querySelector(s),root=$('[data-game]'),question=$('[data-question]'),graph=$('[data-graph]'),fields=$('[data-fields]'),inputs=$('[data-inputs]'),feedback=$('[data-feedback]'),check=$('[data-check]'),hint=$('[data-hint]'),next=$('[data-next]'),tex=String.raw;
const el=(tag,text)=>{const node=document.createElement(tag);if(text!==undefined)node.textContent=text;return node;};
let session,state,seed,busy=false,selected=[];
const active=()=>['cuts','integrals','totals'].includes(state?.phase);
function lock(value){busy=value;fields.disabled=check.disabled=hint.disabled=value||!active();next.disabled=value;for(const g of graph.querySelectorAll('[data-cut]')){const off=value||state.phase!=='cuts';g.setAttribute('aria-disabled',off);g.setAttribute('tabindex',off?-1:0);}}
function progress(){
 root.dataset.seed=seed;root.dataset.phase=state.phase;root.dataset.index=state.index;root.dataset.score=state.score;
 const names={cuts:'Cortes',integrals:'Integrales por tramos',totals:'Integral y área'};
 $('[data-progress]').textContent=state.phase==='summary'?'Sesión terminada':`Reto ${state.index+1} de 6 · ${names[state.phase.replace('-done','')]} · ${state.score} de 1800 puntos`;
}
function draw(){
 const reveal=state.phase!=='cuts';
 drawAreaGraph(graph,session[state.index],{selected,reveal,disabled:state.phase!=='cuts',onToggle:x=>{
  if(busy||state.phase!=='cuts')return;
  const focused=graph.contains(document.activeElement);
  selected=selected.includes(x)?selected.filter(v=>v!==x):[...selected,x];
  for(const input of inputs.querySelectorAll('[data-cut-input]'))input.checked=selected.includes(Number(input.value));
  draw();if(focused)graph.querySelector('[data-cut="'+x+'"]')?.focus();
 }});
}
function buildTable(r){
 const table=el('table'),caption=el('caption','Valores exactos en puntos enteros; no sustituyen el estudio de signo.'),head=el('thead'),tr=el('tr');
 for(const label of ['x','f(x)']){const th=el('th',label);th.scope='col';tr.append(th);}head.append(tr);const body=el('tbody');
 for(let x=r.a;x<=r.b;x++){const row=el('tr'),th=el('th',String(x));th.scope='row';row.append(th,el('td',String(r.value(x))));body.append(row);}
 table.append(caption,head,body);$('[data-table]').replaceChildren(table);
}
function solution(r,stage){
 if(stage==='cuts')return r.explanation+' Cortes interiores necesarios: '+(r.cuts.length?r.cuts.join(', '):'ninguno')+'.';
 if(stage==='integrals')return tex`Una primitiva es \(F(x)=${r.F}\). `+r.segments.map(t=>tex`\(\int_{${t.a}}^{${t.b}} f(x)\,dx=F(${t.b})-F(${t.a})=${ft(t.integral)}\).`).join(' ');
 return tex`Integral con signo: \(I=${r.segments.map(t=>'('+ft(t.integral)+')').join('+')}=${ft(r.integral)}\). Área: \(A=${r.segments.map(t=>'|'+ft(t.integral)+'|').join('+')}=${ft(r.area)}\) unidades cuadradas. Se suman valores absolutos de tramos sin cambios de signo; no se toma el valor absoluto de la suma.`;
}
async function render(){
 lock(true);progress();fields.hidden=false;$('[data-visual]').hidden=false;check.hidden=hint.hidden=false;next.hidden=true;
 const r=session[state.index],stage=state.phase;
 await updateMath(question,()=>question.replaceChildren(el('h2',{cuts:'Elige la partición mínima',integrals:'Calcula las integrales con su signo',totals:'Compara integral y área'}[stage]),el('p',tex`\(f(x)=${r.f}\), en \([${r.a},${r.b}]\).`)));
 draw();buildTable(r);
 $('[data-signs]').textContent=stage==='cuts'?'':r.segments.map((t,i)=>`Tramo ${i+1}: [${t.a}, ${t.b}], función ${t.sign>0?'no negativa':'no positiva'} (puede anularse en puntos aislados).`).join(' ')+' Las regiones aparecen rayadas; el texto indica el signo.';
 $('[data-legend]').textContent={cuts:'Marca solo los cortes interiores necesarios',integrals:'Introduce una integral por tramo',totals:'Introduce los dos resultados'}[stage];
 await updateMath(inputs,()=>{
  inputs.replaceChildren();
  if(stage==='cuts'){
   for(const x of r.candidates){const label=el('label'),input=el('input');label.className='area-input';input.type='checkbox';input.value=x;input.dataset.cutInput='';input.checked=selected.includes(x);label.append(input,el('span','Corte en x='+x));inputs.append(label);}
  }else{
   const prompts=stage==='integrals'?r.segments.map(t=>tex`\(\int_{${t.a}}^{${t.b}} f(x)\,dx\)`):[tex`Integral con signo \(\int_{${r.a}}^{${r.b}} f(x)\,dx\)`,tex`Área geométrica \(\int_{${r.a}}^{${r.b}} |f(x)|\,dx\)`];
   prompts.forEach((text,i)=>{const label=el('label'),input=el('input');label.className='area-input';input.type='text';input.autocomplete='off';input.spellcheck=false;input.dataset.answer=i;label.append(el('span',text),input);inputs.append(label);});
  }
 });
 await updateMath(feedback,()=>{feedback.textContent=stage==='totals'?solution(r,'integrals'):'';});
 check.textContent={cuts:'Comprobar cortes',integrals:'Comprobar tramos',totals:'Comprobar resultados'}[stage];lock(false);
}
inputs.addEventListener('change',event=>{
 if(busy||state.phase!=='cuts'||!event.target.matches('[data-cut-input]'))return;
 selected=[...inputs.querySelectorAll('[data-cut-input]:checked')].map(n=>Number(n.value));draw();
});
hint.addEventListener('click',async()=>{
 if(busy||!active())return;lock(true);state=hintArea(state);const r=session[state.index];
 const text=state.phase==='cuts'?'Busca los ceros interiores y comprueba si el signo cambia a sus lados. Un contacto no exige partir y los extremos ya son fronteras.':state.phase==='integrals'?tex`Puedes usar \(F(x)=${r.F}\). Evalúa F(extremo derecho) − F(extremo izquierdo); conserva el signo.`:'Para la integral suma los resultados con signo. Para el área suma sus valores absolutos, tramo a tramo.';
 await updateMath(feedback,()=>{feedback.textContent='Pista: '+text;});lock(false);
});
check.addEventListener('click',async()=>{
 if(busy||!active())return;lock(true);const r=session[state.index],stage=state.phase;
 const values=stage==='cuts'?selected:[...inputs.querySelectorAll('[data-answer]')].map(n=>n.value);
 const result=assessArea(state,r,values);
 if(result.invalid){await updateMath(feedback,()=>{feedback.textContent='Completa todas las casillas con un número o una fracción válida (denominador distinto de cero). No se ha gastado ningún intento.';});lock(false);return;}
 if(result.ignored){lock(false);return;}state=result.state;
 let message=result.correct?'Correcto. ':'Revisa la respuesta. ';
 if(!result.correct&&stage==='cuts')message+='Pedimos solo los cortes necesarios por cambio de signo; partir en otros puntos puede ser válido, pero no da la partición mínima solicitada. ';
 if(!result.correct&&stage==='integrals')message+='Comprueba F(derecha) − F(izquierda) y conserva el signo en cada tramo. ';
 if(!result.correct&&stage==='totals')message+='La integral conserva los signos; el área suma las aportaciones positivas de cada tramo. ';
 message+=result.done?solution(r,stage)+` ${result.points} puntos en este paso.`:'Te queda un intento.';
 await updateMath(feedback,()=>{feedback.textContent=message;});
 if(result.done&&stage==='cuts'){selected=[...r.cuts];for(const input of inputs.querySelectorAll('[data-cut-input]'))input.checked=selected.includes(Number(input.value));draw();}
 progress();lock(false);
 if(result.done){next.hidden=false;next.textContent=stage==='cuts'?'Calcular los tramos':stage==='integrals'?'Comparar integral y área':state.index===5?'Ver resumen':'Siguiente reto';next.focus();}
});
next.addEventListener('click',async()=>{
 if(busy)return;
 if(state.phase==='summary'){await start();inputs.querySelector('input')?.focus();return;}
 if(active())return;lock(true);state=advanceArea(state);
 if(state.phase!=='summary'){if(state.phase==='cuts')selected=[];await render();inputs.querySelector('input')?.focus();return;}
 progress();fields.hidden=true;$('[data-visual]').hidden=true;check.hidden=hint.hidden=true;
 await updateMath(question,()=>question.replaceChildren(el('h2','Resumen de la sesión')));
 await updateMath(feedback,()=>{
  feedback.replaceChildren(el('p',`${state.score} de 1800 puntos. ${state.results.filter(r=>r.correct&&r.attempts===1).length} de 18 pasos al primer intento. Pistas utilizadas: ${state.hints.length}. Este resumen no se guarda.`));
  const list=el('ol');for(const r of session){const item=el('li');item.append(el('p',tex`\(f(x)=${r.f}\), en \([${r.a},${r.b}]\).`),el('p',solution(r,'cuts')),el('p',solution(r,'integrals')),el('p',solution(r,'totals')));list.append(item);}feedback.append(list);
 });next.textContent='Nueva sesión';next.hidden=false;lock(false);next.focus();
});
async function start(){
 if (!canStartWidgetSession()) return;lock(true);let s=crypto.getRandomValues(new Uint32Array(1))[0];if(s===seed)s=(s+1)>>>0;seed=s;session=generateAreas(seed);state=createAreaState();selected=[];await render();}
start();
}

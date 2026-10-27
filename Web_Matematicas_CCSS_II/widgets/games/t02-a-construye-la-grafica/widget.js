import { initializeWidget, canStartWidgetSession } from '../../shared/widget-runtime.js';
import { updateMath } from '../../../assets/js/core/math.js';
import { generateGraphSession, facts, factLabels, mismatch, formula, initialRound, answerRound } from './generator.js';
import { drawGraph } from './graph.js';
const widgetAccess = await initializeWidget(document.body.dataset.widgetId);
if (widgetAccess) {
const $=s=>document.querySelector(s),root=$('[data-game]'),choices=$('[data-choices]'),feedback=$('[data-feedback]'),check=$('[data-check]'),hint=$('[data-hint]'),next=$('[data-next]');
let seed,session,index,round,points,firstTry,hints,busy=false,finished=false;
const el=(tag,text)=>{const n=document.createElement(tag);if(text!==undefined)n.textContent=text;return n;};
function start(){
 if (!canStartWidgetSession()) return;
 let newSeed=crypto.getRandomValues(new Uint32Array(1))[0];if(newSeed===seed)newSeed=(newSeed+1)>>>0;
 seed=newSeed;root.dataset.seed=seed;session=generateGraphSession(seed);index=0;points=0;firstTry=0;hints=0;finished=false;show();
}
async function show(){
 busy=true;round=initialRound();check.hidden=hint.hidden=false;next.hidden=true;check.disabled=hint.disabled=true;$('[data-options]').disabled=false;$('[data-options]').hidden=false;$('[data-facts]').parentElement.hidden=false;
 root.dataset.round=index;root.dataset.phase='question';$('[data-progress]').textContent=`Reto ${index+1} de 6 · ${points} puntos · Sin límite de tiempo`;
 await updateMath(feedback,()=>feedback.replaceChildren());
 const list=$('[data-facts]');list.replaceChildren();for(const[key,text]of Object.entries(facts(session[index].target))){const li=el('li');li.dataset.fact=key;li.append(el('strong',factLabels[key]+': '),text);list.append(li);}
 choices.replaceChildren();session[index].options.forEach((option,i)=>{
  const letter='ABCD'[i],card=el('div'),label=el('label'),input=el('input');card.className='graph-choice';input.type='radio';input.name='graph';input.value=option.id;input.setAttribute('aria-label','Gráfica '+letter);
  label.append(input,el('strong','Gráfica '+letter),drawGraph(option.model,`round-${index}-${letter}`,'Gráfica '+letter));
  const details=el('details');details.append(el('summary','Descripción textual de '+letter),el('p',Object.values(facts(option.model)).join(' ')));card.append(label,details);choices.append(card);
 });check.disabled=hint.disabled=false;busy=false;if(index>0)choices.querySelector('input').focus();
}
hint.addEventListener('click',async()=>{
 if(busy||round.done)return;busy=true;if(!round.hinted){hints++;round.hinted=true;}
 const family=session[index].target.family;
 await updateMath(feedback,()=>{feedback.textContent='Pista: '+(family==='quadratic'?'Localiza el vértice y comprueba si es máximo o mínimo. Revisa después los cortes.':family==='rational'?'Busca primero la vertical excluida del dominio, después la horizontal y el sentido de cada rama.':'Busca la horizontal de la izquierda, el sentido de crecimiento y el corte con Y.');});busy=false;
});
check.addEventListener('click',async()=>{
 if(busy||round.done)return;busy=true;
 const selected=choices.querySelector('input:checked');
 if(!selected){await updateMath(feedback,()=>{feedback.textContent='Selecciona una gráfica antes de comprobar.';});busy=false;return;}
 const item=session[index],correct=selected.value===item.correct,option=item.options.find(o=>o.id===selected.value);
 round=answerRound(round,correct);document.querySelectorAll('[data-incompatible]').forEach(n=>n.removeAttribute('data-incompatible'));
 let message;
 if(correct)message='Correcta: la gráfica cumple toda la ficha. ';
 else{const conflict=mismatch(item.target,option.model);$(`[data-fact="${conflict.key}"]`).setAttribute('data-incompatible','');message=`Dato incompatible — ${factLabels[conflict.key]}. La opción elegida indica: ${conflict.actual} La ficha exige: ${conflict.expected} `;}
 if(round.done){points+=round.points;firstTry+=Number(round.firstTry);const letter='ABCD'[item.options.findIndex(o=>o.id===item.correct)];message+=String.raw`Solución: gráfica ${letter}. Una expresión que cumple la ficha es \(${formula(item.target)}\). ${round.points} puntos en este reto.`;$('[data-options]').disabled=true;check.disabled=hint.disabled=true;root.dataset.phase='answered';}
 else message+='Puedes volver a intentarlo o consultar la pista.';
 await updateMath(feedback,()=>{feedback.textContent=message;});
 if(round.done){next.hidden=false;next.textContent=index===5?'Ver resumen':'Siguiente reto';}
 busy=false;
});
next.addEventListener('click',async()=>{
 if(busy)return;
 if(finished){start();return;}
 if(!round.done)return;
 if(index<5){index++;await show();return;}
 busy=true;finished=true;root.dataset.phase='summary';$('[data-progress]').textContent='Sesión terminada';$('[data-options]').hidden=true;$('[data-facts]').parentElement.hidden=true;check.hidden=hint.hidden=true;
 await updateMath(feedback,()=>{feedback.textContent=`${points} de 600 puntos. ${firstTry} de 6 retos resueltos al primer intento. Pistas utilizadas en ${hints} ${hints===1?'reto':'retos'}. Este resumen solo pertenece a esta sesión; no se guarda un historial.`;});next.textContent='Nueva sesión';next.focus();busy=false;
});
start();
}

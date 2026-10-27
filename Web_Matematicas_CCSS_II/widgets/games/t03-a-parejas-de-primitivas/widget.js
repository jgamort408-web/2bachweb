import { initializeWidget, canStartWidgetSession } from '../../shared/widget-runtime.js';
import {updateMath} from '../../../assets/js/core/math.js';
import {generatePrimitivePairs,createPairState,usePairHint,answerPair,boardComplete,advancePairBoard} from './generator.js';
const widgetAccess = await initializeWidget(document.body.dataset.widgetId);
if (widgetAccess) {
const $=s=>document.querySelector(s),root=$('[data-game]'),boardRoot=$('[data-board]'),feedback=$('[data-feedback]'),check=$('[data-check]'),hint=$('[data-hint]'),next=$('[data-next]'),tex=String.raw;
const el=(tag,text)=>{const n=document.createElement(tag);if(text!==undefined)n.textContent=text;return n;};
let boards,state,seed,busy=false,selectedTarget='',selectedOption='';
function lock(value){busy=value;check.disabled=hint.disabled=value;for(const f of boardRoot.querySelectorAll('fieldset'))f.disabled=value;}
function progress(){
 const done=Object.values(state.pairs).filter(p=>p.done).length;
 root.dataset.score=state.score;root.dataset.board=state.board;root.dataset.completed=done;
 $('[data-progress]').textContent=`Tablero ${Math.min(state.board+1,2)} de 2 · ${done} de 10 parejas terminadas · ${state.score} de 1200 puntos · Racha ${state.streak}`;
}
async function renderBoard(){
 const board=boards[state.board];lock(true);root.dataset.phase='board';boardRoot.hidden=false;progress();
 await updateMath(boardRoot,()=>{
  boardRoot.replaceChildren();
  const left=el('fieldset'),right=el('fieldset');left.append(el('legend','1. Elige un integrando'));right.append(el('legend','2. Elige su familia completa'));
  for(const [i,t]of board.targets.entries()){
   const pair=state.pairs[t.id],label=el('label'),input=el('input');label.className='pair-card';input.type='radio';input.name='target';input.value=t.id;input.disabled=pair.done;input.checked=selectedTarget===t.id;
   label.append(input,el('strong','Integrando '+(i+1)),el('span',tex`\(f(x)=${t.f}\)`),el('small','Intervalo: '+t.domain));
   if(pair.done){const letter='ABCDEFG'[board.options.findIndex(o=>o.id===t.id+'-family')];label.append(el('strong',(pair.correct?'Pareja resuelta':'Solución mostrada')+' · Opción '+letter));}
   left.append(label);
  }
  for(const [i,o]of board.options.entries()){
   const used=o.complete&&o.factor===1&&state.pairs[o.owner].done,label=el('label'),input=el('input');label.className='pair-card';input.type='radio';input.name='primitive';input.value=o.id;input.disabled=used;input.checked=selectedOption===o.id;
   label.append(input,el('strong','Opción '+'ABCDEFG'[i]),el('span',tex`\(${o.F}\)`));if(used)label.append(el('small','Asignada al integrando '+(board.targets.findIndex(t=>t.id===o.owner)+1)));right.append(label);
  }boardRoot.append(left,right);
 });
 lock(false);
 const complete=boardComplete(state,board);check.disabled=hint.disabled=complete;next.hidden=!complete;next.textContent=state.board===0?'Siguiente tablero':'Ver resumen';
}
boardRoot.addEventListener('change',async event=>{
 if(busy)return;
 if(event.target.name==='target'){selectedTarget=event.target.value;selectedOption='';for(const radio of boardRoot.querySelectorAll('[name="primitive"]'))radio.checked=false;}
 else if(event.target.name==='primitive')selectedOption=event.target.value;
 else return;
 // Una selección nueva conserva intentos y puntuación, pero elimina mensajes de otra pareja.
 lock(true);await updateMath(feedback,()=>feedback.replaceChildren());lock(false);
});
hint.addEventListener('click',async()=>{
 if(busy)return;const board=boards[state.board],target=board?.targets.find(t=>t.id===selectedTarget);
 lock(true);
 if(!target||state.pairs[target.id].done){await updateMath(feedback,()=>{feedback.textContent='Selecciona primero un integrando pendiente para ver su pista.';});lock(false);return;}
 state=usePairHint(state,board,target.id);
 await updateMath(feedback,()=>{feedback.textContent='Pista: '+target.hint+' Buscamos todas las primitivas en el intervalo indicado: incluye +C.';});lock(false);
});
check.addEventListener('click',async()=>{
 if(busy||state.board>=2||boardComplete(state,boards[state.board]))return;lock(true);
 const board=boards[state.board],target=board.targets.find(t=>t.id===selectedTarget),option=board.options.find(o=>o.id===selectedOption);
 if(!target||!option){await updateMath(feedback,()=>{feedback.textContent='Selecciona un integrando y una opción antes de comprobar.';});lock(false);return;}
 const result=answerPair(state,board,target.id,option.id);
 if(result.ignored){lock(false);return;}state=result.state;
 let message=result.correct?'Pareja correcta. ':result.missingConstant?'Esa expresión sí es una primitiva particular, pero falta +C para representar toda la familia. ':'Revisa la pareja: ';
 if(!result.correct&&!result.missingConstant)message+=tex`La derivada de la opción es \(${option.derivative}\), no \(${target.f}\) en todo el intervalo. `;
 if(result.done){message+=tex`Familia: \(F(x)=${target.F}+C\). Comprobación: \(F'(x)=${target.f}\). ${result.points} puntos. `;
  if(result.bonus)message+='¡Cinco aciertos seguidos al primer intento! Bonus: 100 puntos. ';
 }else message+='Puedes volver a intentarlo o consultar la pista. ';
 await updateMath(feedback,()=>{feedback.textContent=message;});
 if(result.done){selectedTarget=selectedOption='';await renderBoard();const first=boardRoot.querySelector('[name="target"]:not(:disabled)');if(first)first.focus();else next.focus();}
 else {progress();lock(false);}
});
next.addEventListener('click',async()=>{
 if(busy)return;
 if(state.board===2){await start();return;}
 if(!boardComplete(state,boards[state.board]))return;
 lock(true);
 state=advancePairBoard(state,boards);selectedTarget=selectedOption='';
 if(state.board<2){await updateMath(feedback,()=>feedback.replaceChildren());await renderBoard();boardRoot.querySelector('input')?.focus();return;}
 lock(true);root.dataset.phase='summary';progress();boardRoot.hidden=true;check.hidden=hint.hidden=true;
 $('[data-progress]').textContent='Sesión terminada';
 await updateMath(feedback,()=>{
  feedback.replaceChildren(el('p',`${state.score} de 1200 puntos. ${state.firstTry} de 10 parejas al primer intento. ${state.combos} bonus. Racha máxima: ${state.bestStreak}. Pistas utilizadas en ${state.hints} ${state.hints===1?'pareja':'parejas'}. Este resumen no se guarda.`));
  const list=el('ol');for(const b of boards)for(const t of b.targets){const p=state.pairs[t.id];list.append(el('li',tex`\(\int ${t.f}\,dx=${t.F}+C\), en ${t.domain}. ${p.correct?'Resuelta.':'Solución mostrada tras dos errores.'}`));}feedback.append(list);
 });next.textContent='Nueva sesión';next.hidden=false;next.focus();busy=false;
});
async function start(){
 if (!canStartWidgetSession()) return;
 lock(true);
 let newSeed=crypto.getRandomValues(new Uint32Array(1))[0];if(seed===newSeed)newSeed=(newSeed+1)>>>0;seed=newSeed;
 root.dataset.seed=seed;boards=generatePrimitivePairs(seed);state=createPairState(boards);selectedTarget=selectedOption='';check.hidden=hint.hidden=false;
 await updateMath(feedback,()=>feedback.replaceChildren());await renderBoard();
}
start();
}

const tex=String.raw;
/** Dos tableros, diez familias; los dominios se indican en cada integrando. */
export function generatePrimitivePairs(seed=1){
 let state=Number(seed)>>>0;
 const pick=items=>{state=(Math.imul(state,1664525)+1013904223)>>>0;return items[Math.floor(state/4294967296*items.length)];};
 const shuffle=items=>{const a=[...items];for(let i=a.length-1;i>0;i--){const j=pick(Array.from({length:i+1},(_,n)=>n));[a[i],a[j]]=[a[j],a[i]];}return a;};
 const k=pick([2,3,4,5]),n=pick([2,3,4]),a=pick([2,3,4]),b=pick([1,2,3]),h=pick([2,3,4,5]);
 const definitions=[
  {kind:'power',f:tex`${k*n}x^{${n-1}}`,F:tex`${k}x^${n}`,domain:'ℝ',value:x=>k*n*x**(n-1),primitive:x=>k*x**n,hint:'Sube el exponente en uno y divide por el nuevo exponente.'},
  {kind:'constant',f:String(h),F:tex`${h}x`,domain:'ℝ',value:x=>h,primitive:x=>h*x,hint:'La derivada de una función lineal es constante.'},
  {kind:'exp',f:tex`${k}e^x`,F:tex`${k}e^x`,domain:'ℝ',value:x=>k*Math.exp(x),primitive:x=>k*Math.exp(x),hint:'e elevado a x conserva su forma al derivar.'},
  {kind:'reciprocal',f:tex`\frac{${h}}x`,F:tex`${h}\ln x`,domain:'x>0',value:x=>h/x,primitive:x=>h*Math.log(x),hint:'En el intervalo positivo puedes usar ln x. No cruces cero.'},
  {kind:'cosine',f:tex`${k}\cos x`,F:tex`${k}\sin x`,domain:'ℝ (ángulos en radianes)',value:x=>k*Math.cos(x),primitive:x=>k*Math.sin(x),hint:'La derivada de sen x es cos x.'},
  {kind:'composed-power',f:tex`${3*a*k}(${a}x+${b})^2`,F:tex`${k}(${a}x+${b})^3`,domain:'ℝ',value:x=>3*a*k*(a*x+b)**2,primitive:x=>k*(a*x+b)**3,hint:'Al derivar la potencia aparecen el exponente 3 y la derivada interior.'},
  {kind:'composed-log',f:tex`\frac{${a*h}}{${a}x+${b}}`,F:tex`${h}\ln(${a}x+${b})`,domain:'x>0',value:x=>a*h/(a*x+b),primitive:x=>h*Math.log(a*x+b),hint:'En x>0 el argumento del logaritmo es positivo. Comprueba el numerador mediante la cadena.'},
  {kind:'composed-exp',f:tex`-${a*k}e^{-${a}x}`,F:tex`${k}e^{-${a}x}`,domain:'ℝ',value:x=>-a*k*Math.exp(-a*x),primitive:x=>k*Math.exp(-a*x),hint:'La derivada interior es negativa; ese signo debe aparecer al derivar.'},
  {kind:'sine',f:tex`-${h}\sin x`,F:tex`${h}\cos x`,domain:'ℝ (ángulos en radianes)',value:x=>-h*Math.sin(x),primitive:x=>h*Math.cos(x),hint:'La derivada de cos x es −sen x.'},
  {kind:'root',f:tex`\frac{${k}}{2\sqrt{x}}`,F:tex`${k}\sqrt{x}`,domain:'x>0',value:x=>k/(2*Math.sqrt(x)),primitive:x=>k*Math.sqrt(x),hint:'Recuerda la derivada de la raíz cuadrada y el dominio x>0.'}
 ];
 return [0,1].map(boardIndex=>{
  const targets=definitions.slice(boardIndex*5,boardIndex*5+5).map((m,i)=>({...m,id:'b'+boardIndex+'-t'+i}));
  const options=targets.map(t=>({id:t.id+'-family',owner:t.id,complete:true,factor:1,F:tex`${t.F}+C`,derivative:t.f,primitive:t.primitive,value:t.value}));
  const first=targets[0],second=targets[1];
  options.push({id:'b'+boardIndex+'-particular',owner:first.id,complete:false,factor:1,F:first.F,derivative:first.f,primitive:first.primitive,value:first.value});
  options.push({id:'b'+boardIndex+'-factor',owner:second.id,complete:true,factor:2,F:tex`2\left(${second.F}\right)+C`,derivative:tex`2\left(${second.f}\right)`,primitive:x=>2*second.primitive(x),value:x=>2*second.value(x)});
  return {id:'b'+boardIndex,targets:shuffle(targets),options:shuffle(options)};
 });
}
export function createPairState(boards){
 return {board:0,score:0,streak:0,bestStreak:0,combos:0,hints:0,firstTry:0,pairs:Object.fromEntries(boards.flatMap(b=>b.targets.map(t=>[t.id,{attempts:0,done:false,correct:false,hinted:false}])) )};
}
export function usePairHint(state,board,targetId){
 if(board.id!=='b'+state.board||!board.targets.some(t=>t.id===targetId)||!state.pairs[targetId]||state.pairs[targetId].done||state.pairs[targetId].hinted)return state;
 return {...state,hints:state.hints+1,pairs:{...state.pairs,[targetId]:{...state.pairs[targetId],hinted:true}}};
}
/** Transición pura: una pareja terminada nunca vuelve a puntuar. */
export function answerPair(state,board,targetId,optionId){
 const target=board.targets.find(t=>t.id===targetId),option=board.options.find(o=>o.id===optionId),previous=state.pairs[targetId];
 const used=option&&option.complete&&option.factor===1&&state.pairs[option.owner]?.done;
 if(board.id!=='b'+state.board||!target||!option||!previous||previous.done||used)return {state,ignored:true};
 const correct=option.owner===target.id&&option.complete&&option.factor===1,attempts=previous.attempts+1,done=correct||attempts>=2;
 const streak=correct&&attempts===1?state.streak+1:0,bonus=correct&&attempts===1&&streak%5===0?100:0;
 const points=correct?(attempts===1?100:50):0;
 const next={...state,score:state.score+points+bonus,streak,bestStreak:Math.max(state.bestStreak,streak),combos:state.combos+Number(bonus>0),firstTry:state.firstTry+Number(correct&&attempts===1),pairs:{...state.pairs,[targetId]:{...previous,attempts,done,correct}}};
 return {state:next,correct,done,bonus,points,ignored:false,missingConstant:option.owner===target.id&&option.factor===1&&!option.complete};
}
export const boardComplete=(state,board)=>board.targets.every(t=>state.pairs[t.id].done);
export function advancePairBoard(state,boards){
 if(state.board>=boards.length||!boardComplete(state,boards[state.board]))return state;
 return {...state,board:state.board+1};
}


import {matrixTex} from '../../../content/models/matrix-basics.js';
import {multiplyMatrices} from '../../../content/models/matrix-product.js';
const tex=String.raw;
const mul=(a,b)=>multiplyMatrices(a,b).result;
export function generateMatrixOps(seed=1){
 let random=Number(seed)>>>0;
 const pick=a=>{random=(Math.imul(random,1664525)+1013904223)>>>0;return a[Math.floor(random/4294967296*a.length)];};
 const shuffle=items=>{const a=[...items];for(let i=a.length-1;i>0;i--){const j=pick(Array.from({length:i+1},(_,n)=>n));[a[i],a[j]]=[a[j],a[i]];}return a;};
 const matrix=(rows,cols)=>Array.from({length:rows},()=>Array.from({length:cols},()=>pick([-3,-2,-1,0,1,2,3])));
 const choice=(prompt,correct,wrong,hint,explanation)=>({prompt,correct:'correct',hint,explanation,options:shuffle([{id:'correct',text:correct,feedback:'Esa es la conclusión correcta.'},...wrong.map(([text,feedback],i)=>({id:'wrong-'+(i+1),text,feedback}))])});
 function calculation(answer,hint,explanation){
  const values=[answer];const row=pick(answer.map((_,i)=>i)),col=pick(answer[0].map((_,i)=>i));
  for(const delta of [1,-1,2])values.push(answer.map((r,i)=>r.map((v,j)=>v+(i===row&&j===col?delta:0))));
  return {prompt:'¿Cuál es la matriz resultado?',correct:'correct',hint,explanation,options:shuffle(values.map((value,i)=>({id:i?'wrong-'+i:'correct',value,text:tex`\(${matrixTex(value)}\)`,feedback:i?`Revisa la entrada (${row+1},${col+1}); en esa posición no se obtiene ${value[row][col]}.`:'Todas las entradas coinciden.'})))};
 }
 function dimension(rows,cols,hint){
  const correct=`Está definida y el resultado es ${rows}×${cols}.`;
  const others=['No está definida.','Está definida y el resultado es 2×2.','Está definida y el resultado es 2×3.','Está definida y el resultado es 3×2.','Está definida y el resultado es 3×3.'].filter(s=>s!==correct).slice(0,3);
  return choice('Antes de calcular, ¿está definida la operación y qué tamaño tendrá?',correct,others.map(s=>[s,'Comprueba la condición de la operación y las dimensiones del resultado.']),hint,hint+' '+correct);
 }
 const rows=[];
 const a=pick([1,2,3]),b=pick([-3,-2,-1]),scalar=pick([-3,-2,2,3]),type=pick(['diagonal','identity','zero','rectangular']);
 const D=type==='identity'?[[1,0],[0,1]]:type==='zero'?[[0,0],[0,0]]:type==='rectangular'?matrix(2,3):[[a,0],[0,b]],scaled=D.map(r=>r.map(v=>scalar*v));
 const types={
  diagonal:['Es diagonal, pero no escalar.','Es cuadrada y tiene ceros fuera de la diagonal; sus dos entradas diagonales son distintas.'],
  identity:['Es la identidad; también es diagonal y escalar.','Tiene unos en la diagonal y ceros fuera. Las etiquetas compatibles se pueden cumplir a la vez.'],
  zero:['Es la matriz nula; también es diagonal y escalar.','Todas sus entradas son cero. En este reto es cuadrada, así que también es diagonal y escalar.'],
  rectangular:['Es rectangular no cuadrada.','Tiene dos filas y tres columnas. No es cuadrada ni diagonal.']
 };
 rows.push({id:'type',kind:'type',type,a:D,k:scalar,title:'Clasifica y transforma',statement:tex`D=${matrixTex(D)},\qquad ${scalar}D`,stages:[
  choice('¿Qué descripción de D es correcta?',types[type][0],Object.entries(types).filter(([key])=>key!==type).map(([key,v])=>[v[0],key==='identity'?'La identidad necesita ser cuadrada, con unos en la diagonal y ceros fuera.':key==='zero'?'La matriz nula requiere que todas sus entradas sean cero.':key==='diagonal'?'Ser diagonal exige ser cuadrada y tener ceros fuera de la diagonal; aquí esa descripción completa no se cumple.':'Una rectangular no cuadrada tiene diferente número de filas y columnas.']),'Comprueba el tamaño, la diagonal y los ceros. Una matriz puede tener varias etiquetas compatibles.',types[type][1]),
  calculation(scaled,'Multiplica cada entrada por el escalar, incluidos los signos.',tex`Cada entrada se multiplica por ${scalar}: \[${scalar}D=${matrixTex(scaled)}.\]`)]});
 for(const kind of ['sum','difference','scale']){
  const A=matrix(2,kind==='difference'?2:3),B=matrix(A.length,A[0].length),k=pick([-3,-2,2,3]);
  const answer=A.map((r,i)=>r.map((v,j)=>kind==='sum'?v+B[i][j]:kind==='difference'?v-B[i][j]:k*v));
  const op=kind==='sum'?'A+B':kind==='difference'?'A-B':`${k}A`;
  const hint=kind==='scale'?'Un escalar no cambia el tamaño de la matriz.':'Para sumar o restar se necesitan las mismas filas y columnas; el resultado conserva ese tamaño.';
  rows.push({id:kind,kind,a:A,b:B,k,title:kind==='sum'?'Suma por posiciones':kind==='difference'?'Resta con signos':'Escala la matriz',statement:tex`A=${matrixTex(A)}${kind==='scale'?'':tex`,\quad B=${matrixTex(B)}`},\qquad ${op}`,stages:[
   dimension(A.length,A[0].length,hint),
   calculation(answer,kind==='scale'?'Multiplica todos los elementos, sin alterar sus posiciones.':'Opera casillas correspondientes. Restar un negativo equivale a sumar su opuesto.',tex`\[${op}=${matrixTex(answer)}.\] Entrada (1,1): \(${A[0][0]}${kind==='sum'?'+':kind==='difference'?'-':tex`\cdot`}(${kind==='scale'?k:B[0][0]})=${answer[0][0]}\).`)
  ]});
 }
 for(const kind of ['product','reverse']){
  const A=matrix(2,3),B=matrix(3,2),left=kind==='product'?A:B,right=kind==='product'?B:A,op=kind==='product'?'AB':'BA',answer=mul(left,right);
  const hint=`${left.length}×${left[0].length} por ${right.length}×${right[0].length}: coinciden las dimensiones interiores; quedan las exteriores.`;
  const terms=left[0].map((v,j)=>tex`(${v})(${right[j][0]})`).join('+');
  rows.push({id:kind,kind,a:A,b:B,title:kind==='product'?'Producto AB':'Invierte el orden: BA',statement:tex`A=${matrixTex(A)},\qquad B=${matrixTex(B)},\qquad ${op}`,stages:[
   dimension(answer.length,answer[0].length,hint),
   calculation(answer,'Combina cada fila del primer factor con cada columna del segundo; no multipliques por posiciones.',tex`\[${op}=${matrixTex(answer)}.\] Entrada (1,1): \(${terms}=${answer[0][0]}\).`)
  ]});
 }
 const A=matrix(2,3),B=matrix(2,2);
 rows.push({id:'incompatible',kind:'incompatible',a:A,b:B,title:'Detecta el producto imposible',statement:tex`A=${matrixTex(A)},\qquad B=${matrixTex(B)},\qquad AB`,stages:[
  choice('Antes de calcular, ¿qué ocurre con AB?','No está definido.',[['Es una matriz 2×2.','Las dimensiones exteriores solo dan el tamaño si coinciden las interiores.'],['Es una matriz 2×3.','No conserva sin más el tamaño de A.'],['Es la matriz nula.','No definido no significa resultado cero.']],'Compara las columnas de A con las filas de B.','A tiene tres columnas y B dos filas. Como 3≠2, AB no está definido.'),
  choice('¿Qué justificación permite detener el cálculo?','Las tres columnas de A no coinciden con las dos filas de B.',[['A y B tendrían que ser del mismo tamaño.','Esa condición corresponde a suma y resta.'],['Toda matriz rectangular impide cualquier producto.','Una 2×3 sí se puede multiplicar por una 3×2.'],['Se puede añadir una fila de ceros a B sin cambiar el problema.','Añadir datos modifica la matriz y plantea otra operación.']],'No recortes ni rellenes matrices para forzar una operación.','No hay una matriz resultado para este AB. Hay que corregir el planteamiento, no inventar entradas.')
 ]});
 const P=matrix(2,2);P[0][1]=pick([-3,-2,1,2,3]);const n=pick([2,3]);let power=[[1,0],[0,1]];for(let i=0;i<n;i++)power=mul(power,P);
 rows.push({id:'power',kind:'power',a:P,n,title:'Potencias de una matriz',statement:tex`P=${matrixTex(P)},\qquad P^{${n}}`,stages:[
  dimension(2,2,'P es cuadrada: se puede multiplicar por sí misma. Sus potencias conservan orden 2×2.'),
  calculation(power,'Calcula P² como PP; para P³, multiplica P² por P. No eleves cada casilla por separado.',tex`\[P^2=${matrixTex(mul(P,P))}${n===3?tex`,\quad P^3=${matrixTex(power)}`:''}.\]`)
 ]});
 return shuffle(rows).map((r,index)=>({...r,index}));
}
export const createMatrixOpsState=()=>({index:0,stage:0,phase:'answer',attempts:0,score:0,hints:[],results:[]});
export function answerMatrixOps(state,challenge,id){
 const step=challenge?.stages?.[state.stage];
 if(state.phase!=='answer'||challenge?.index!==state.index||!step?.options.some(o=>o.id===id))return {state,ignored:true};
 const correct=id===step.correct,attempts=state.attempts+1,done=correct||attempts===2,points=correct?(attempts===1?100:50):0;
 return {correct,done,points,ignored:false,state:{...state,attempts,score:state.score+(done?points:0),phase:done?'resolved':'answer',results:done?[...state.results,{id:challenge.id,stage:state.stage,correct,attempts,points}]:state.results}};
}
export function advanceMatrixOps(state,total=8){
 if(state.phase!=='resolved')return state;
 if(state.stage===0)return {...state,stage:1,phase:'answer',attempts:0};
 const index=state.index+1;return {...state,index,stage:0,phase:index===total?'summary':'answer',attempts:0};
}
export function hintMatrixOps(state){
 const key=state.index+'-'+state.stage;return state.phase!=='answer'||state.hints.includes(key)?state:{...state,hints:[...state.hints,key]};
}

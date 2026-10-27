
import {matrixTex} from '../../../content/models/matrix-basics.js';
import {fraction,fractionTex} from '../../../content/models/matrix-inverse.js';
const tex=String.raw;
export function generateChamber(seed=1){
 let random=Number(seed)>>>0;
 const pick=a=>{random=(Math.imul(random,1664525)+1013904223)>>>0;return a[Math.floor(random/4294967296*a.length)];};
 const shuffle=items=>{const a=[...items];for(let i=a.length-1;i>0;i--){const j=pick(Array.from({length:i+1},(_,k)=>k));[a[i],a[j]]=[a[j],a[i]];}return a;};
 const choose=(prompt,items,hint,explanation)=>({prompt,correct:'correct',hint,explanation,options:shuffle(items.map((o,i)=>({...o,id:i?'wrong-'+i:'correct'})))});
 function number(prompt,value,hint,explanation,candidates=[]){
  const values=[value];
  for(const n of [...candidates,-value,0,value+1,value-1,value+2])if(!values.includes(n)&&values.length<4)values.push(n);
  return choose(prompt,values.map((v,i)=>({value:v,text:tex`\(${v}\)`,feedback:i?'Ese valor no respeta el cálculo o la propiedad de esta cerradura.':'El valor coincide con el cálculo.'})),hint,explanation);
 }
 const rank=(value,explanation)=>choose('¿Cuál es el rango de la matriz?',[
  {value,text:'Rango '+value,feedback:'Se cumplen la cota superior y la inferior.'},
  ...[0,1,2,3].filter(v=>v!==value).slice(0,3).map(v=>({value:v,text:'Rango '+v,feedback:'Comprueba el determinante y busca un menor no nulo del orden adecuado.'}))
 ],'El rango no es el valor del determinante. Un menor no nulo da una cota inferior.',explanation);
 const invertible=(yes,explanation)=>choose('¿Tiene inversa esta matriz cuadrada?',[
  {value:yes,text:yes?'Sí, porque su determinante es distinto de cero.':'No, porque su determinante es cero.',feedback:'La condición depende de que el determinante sea no nulo.'},
  {value:'sign',text:yes?'Solo si el determinante es positivo.':'Sí, porque todas las matrices cuadradas tienen inversa.',feedback:yes?'Un determinante negativo también puede ser no nulo.':'Ser cuadrada es necesario, pero no suficiente.'},
  {value:'opposite',text:yes?'No, porque no es la identidad.':'Sí, porque tiene alguna entrada no nula.',feedback:yes?'La identidad no es la única matriz invertible.':'Una entrada no nula no garantiza un determinante no nulo.'},
  {value:'division',text:yes?'No: toda matriz con elementos fuera de la diagonal es singular.':'Se obtiene dividiendo entre el determinante cero.',feedback:yes?'Las matrices no diagonales también pueden tener inversa; decide por el determinante.':'No se puede dividir entre cero.'}
 ],'Para una matriz cuadrada, inversa existente equivale a determinante distinto de cero.',explanation);
 const rooms=[];
 const a=pick([1,2,3]),b=pick([-3,-2,-1,1,2,3]),c=pick([-3,-2,-1,1,2,3]),d=pick([-3,-2,-1,1,2,3]);
 let A=[[a,b],[c,d]];if(a*d===b*c)A[1][1]+=1;
 const det=A[0][0]*A[1][1]-A[0][1]*A[1][0];
 rooms.push({id:'entry',title:'El umbral de los signos',a:A,statement:tex`A=${matrixTex(A)}`,stages:[
  number('Abre el primer candado: ¿cuánto vale det(A)?',det,'En orden 2: producto de la diagonal principal menos el de la secundaria.',tex`\(\det(A)=${a}(${A[1][1]})-(${b})(${c})=${det}\). Hay que restar el segundo producto completo.`,[a*A[1][1]+b*c]),
  invertible(true,tex`Como \(\det(A)=${det}\ne0\), A tiene inversa, con independencia del signo.`),
  rank(2,'Un determinante de orden 2 no nulo prueba rango 2; la matriz solo tiene dos filas y dos columnas.')
 ]});
 const x=pick([-3,-2,2,3]),y=pick([-3,-2,2,3]),z=pick([-3,-2,2,3]),k=pick([-2,2,3]);
 const T=[[x,pick([-2,-1,1,2]),pick([-2,0,2])],[0,y,pick([-2,0,2])],[0,0,z]],td=x*y*z;
 rooms.push({id:'triangular',title:'La sala triangular',a:T,k,statement:tex`T=${matrixTex(T)}`,stages:[
  number('Sin desarrollar por Sarrus, ¿cuánto vale det(T)?',td,'En una triangular, el determinante es el producto de su diagonal.',tex`\(\det(T)=(${x})(${y})(${z})=${td}\). La regla se aplica porque hay ceros debajo de la diagonal.`),
  number('U se obtiene de T intercambiando sus dos primeras filas. ¿Cuánto vale det(U)?',-td,'Un intercambio de dos filas cambia el signo, aunque la matriz resultante deje de ser triangular.',tex`\(\det(U)=-\det(T)=- (${td})=${-td}\).`),
  number(`V=${k}T: se multiplica toda T por ${k}. ¿Cuánto vale det(V)?`,k**3*td,'T tiene orden 3. Multiplicar toda la matriz por k introduce k³.',tex`\(\det(${k}T)=(${k})^3\det(T)=${k**3*td}\). Se parte de T, no de U.`,[k*td,k*k*td])
 ]});
 const p=pick([1,2,3]),q=pick([-3,-2,1,2]),m=pick([2,3]),s=pick([-3,-2,2,3]);
 const D=[[p,q,0],[m*p,m*q,0],[0,0,s]];
 rooms.push({id:'dependent',title:'La galería de filas dependientes',a:D,m,statement:tex`D=${matrixTex(D)}`,stages:[
  number('¿Cuál es det(D)?',0,'Compara las dos primeras filas antes de multiplicar.',tex`\(F_2=${m}F_1\). Restar ${m} veces la primera a la segunda deja una fila nula, conservando el determinante: \(\det(D)=0\).`),
  invertible(false,'D es singular. Ser no nula no basta para tener inversa.'),
  rank(2,tex`El determinante de orden 3 es cero. El menor de filas 1 y 3 y columnas 1 y 3 vale \(\begin{vmatrix}${p}&0\\0&${s}\end{vmatrix}=${p*s}\ne0\). Por tanto, el rango es exactamente 2.`)
 ]});
 const initial=pick([-7,-5,-3,2,4,6]),factor=pick([-3,-2,2,3]),multiple=pick([-3,-1,2,4]);
 rooms.push({id:'operations',title:'La cadena de tres llaves',det:initial,factor,multiple,statement:tex`A\text{ de orden }3,\qquad \det(A)=${initial}`,stages:[
  number('B se obtiene de A intercambiando F₁ y F₂. ¿Cuánto vale det(B)?',-initial,'Un intercambio cambia el signo.',tex`\(\det(B)=-\det(A)=${-initial}\).`),
  number(`Ahora C se obtiene de B multiplicando solo F₂ por ${factor}. ¿Cuánto vale det(C)?`,-initial*factor,'Se multiplica una sola fila: el factor sale una vez, no al cubo.',tex`\(\det(C)=(${factor})\det(B)=(${factor})(${-initial})=${-initial*factor}\).`,[initial*factor,-initial*factor**3]),
  number(`Finalmente, E se obtiene de C con F₃ ← F₃ + (${multiple})F₁. F₁ se conserva. ¿Cuánto vale det(E)?`,-initial*factor,'Sumar un múltiplo de otra fila, manteniéndola, no cambia el determinante.',tex`\(\det(E)=\det(C)=${-initial*factor}\). Las tres operaciones son sucesivas.`,[initial,-initial*factor*multiple])
 ]});
 const r=pick([-3,-2,1,2,3]),h=pick([2,3,4]);
 const parameter=tex`M(t)=\begin{pmatrix}1&1&0\\0&t-(${r})&0\\0&0&${h}\end{pmatrix}`;
 rooms.push({id:'parameter',title:'La puerta del parámetro',r,h,statement:parameter,stages:[
  choose('¿Qué expresión representa det(M(t))?',[
   {value:{slope:h,intercept:-h*r},text:tex`\(${h}(t-(${r}))\)`,feedback:'Es el producto de las tres entradas diagonales.'},
   {value:{slope:h,intercept:h*r},text:tex`\(${h}(t+(${r}))\)`,feedback:'Se ha cambiado el signo del parámetro fijo.'},
   {value:{slope:1,intercept:-r},text:tex`\(t-(${r})\)`,feedback:'Falta el factor de la tercera entrada diagonal.'},
   {value:{slope:0,intercept:0},text:'0 para cualquier t.',feedback:'La matriz triangular no tiene por qué tener determinante cero.'}
  ],'Multiplica la diagonal y conserva el factor constante.',tex`\(\det(M(t))=1\,(t-(${r}))\,${h}=${h}(t-(${r}))\).`),
  number('¿Para qué único valor de t deja de existir la inversa?',r,'Resuelve det(M(t))=0; el factor constante no es cero.',tex`Como ${h} es no nulo, el determinante se anula exactamente en \(t=${r}\). Para los demás valores reales hay inversa.`),
  rank(2,tex`En \(t=${r}\), la segunda fila es cero. El menor de filas 1 y 3 y columnas 1 y 3 es ${h}, no nulo: rango 2, no cero.`)
 ]});
 // La pregunta de rango necesita fijar el parámetro explícitamente.
 rooms.at(-1).stages[2].prompt=`Al fijar t=${r}, ¿cuál es el rango de M(t)?`;
 const u=pick([2,3]),v=pick([2,3]),w=pick([-3,-2,2,3]),b2=pick([-3,-1,1,3]),d2=pick([-2,-1,1,2]);
 const B=[[u,b2,0],[0,v,d2],[0,0,w]],bd=u*v*w,cofactor=-b2*w,f=fraction(cofactor,bd);
 const values=[f,fraction(-cofactor,bd),fraction(0),fraction(f.numerator+2*f.denominator,f.denominator)];
 rooms.push({id:'boss',title:'La cámara final: la llave de la inversa',a:B,row:0,col:1,statement:tex`A=${matrixTex(B)}`,stages:[
  number('Primera llave final: calcula det(A).',bd,'A es triangular: multiplica su diagonal.',tex`\(\det(A)=${u}\cdot${v}\cdot(${w})=${bd}\).`),
  invertible(true,tex`El determinante ${bd} es no nulo. Podemos usar \(A^{-1}=\operatorname{Adj}(A)/\det(A)\).`),
  choose('Última llave: ¿cuál es la entrada de fila 1 y columna 2 de A⁻¹?',values.map((value,i)=>({value,text:tex`\(${fractionTex(value)}\)`,feedback:i===0?'La fracción incluye la trasposición del cofactor y el determinante.':i===1?'Se ha cambiado el signo del cofactor.':i===2?'C₁₂ es cero, pero para la entrada (1,2) de la inversa se necesita C₂₁.':'Esa fracción no coincide con el cofactor dividido entre el determinante.'})),
   'La adjunta traspone los cofactores: (A⁻¹)₁₂=C₂₁/det(A). Elimina la fila 2 y la columna 1.',
   tex`\(M_{21}=\begin{vmatrix}${b2}&0\\0&${w}\end{vmatrix}=${b2*w}\), por tanto \(C_{21}=(-1)^3 M_{21}=${cofactor}\). Al trasponer, pasa a (1,2) de la adjunta. Así \((A^{-1})_{12}=\frac{${cofactor}}{${bd}}=${fractionTex(f)}\). En cambio, \(C_{12}=0\); confundir ambas posiciones cambia el resultado.`)
 ]});
 return rooms.map((room,index)=>({...room,index}));
}
export const createChamberState=()=>({index:0,stage:0,phase:'answer',attempts:0,score:0,hints:[],results:[]});
export function answerChamber(state,room,id){
 const step=room?.stages?.[state.stage];
 if(state.phase!=='answer'||room?.index!==state.index||!step?.options.some(o=>o.id===id))return {state,ignored:true};
 const correct=id===step.correct,attempts=state.attempts+1,done=correct||attempts===2,points=correct?(attempts===1?100:50):0;
 return {correct,done,points,ignored:false,state:{...state,attempts,score:state.score+points,phase:done?'resolved':'answer',results:done?[...state.results,{id:room.id,stage:state.stage,correct,attempts,points}]:state.results}};
}
export function advanceChamber(state,total=6){
 if(state.phase!=='resolved')return state;
 if(state.stage<2)return {...state,stage:state.stage+1,phase:'answer',attempts:0};
 const index=state.index+1;return {...state,index,stage:0,phase:index===total?'summary':'answer',attempts:0};
}
export function hintChamber(state){
 const key=state.index+'-'+state.stage;
 return state.phase!=='answer'||state.hints.includes(key)?state:{...state,hints:[...state.hints,key]};
}

const tex=String.raw;
const tasks=[
 {id:'union',label:tex`\(A\cup B\)`,words:'A o B, incluyendo cuando ocurren ambos'},
 {id:'intersection',label:tex`\(A\cap B\)`,words:'A y B a la vez'},
 {id:'difference',label:tex`\(A\setminus B\)`,words:'solo A'},
 {id:'neither',label:tex`\((A\cup B)^c\)`,words:'ni A ni B'},
 {id:'exclusive',label:tex`\((A\setminus B)\cup(B\setminus A)\)`,words:'exactamente uno de los dos'},
 {id:'notBoth',label:tex`\((A\cap B)^c\)`,words:'no ocurren ambos a la vez'}
];
const rng=seed=>{let state=seed>>>0;return()=>{state=(Math.imul(1664525,state)+1013904223)>>>0;return state/4294967296;};};
const sorted=items=>items.sort((a,b)=>a-b);
export function eventFor(universe,a,b,task){
 const A=new Set(a),B=new Set(b);
 return universe.filter(x=>{
  const inA=A.has(x),inB=B.has(x);
  return task==='union'?(inA||inB):task==='intersection'?(inA&&inB):task==='difference'?(inA&&!inB):task==='neither'?(!inA&&!inB):task==='exclusive'?(inA!==inB):!(inA&&inB);
 });
}
export function generateEventsPractice(seed=1){
 const random=rng(seed);
 return tasks.map((task,index)=>{
  const n=6+Math.floor(random()*5),universe=Array.from({length:n},(_,i)=>i+1),order=[...universe];
  for(let i=n-1;i>0;i--){const j=Math.floor(random()*(i+1));[order[i],order[j]]=[order[j],order[i]];}
  const regions=new Map(order.map((x,i)=>[x,i<4?i:Math.floor(random()*4)]));
  const a=sorted(universe.filter(x=>[0,1].includes(regions.get(x)))),b=sorted(universe.filter(x=>[0,2].includes(regions.get(x))));
  const event=eventFor(universe,a,b,task.id),k=event.length;
  const values=[[k,n],[k-1,n],[k+1,n],[k,n+1]];
  const options=values.map(([numerator,denominator],i)=>({id:'abcd'[i],text:tex`\(\frac{${numerator}}{${denominator}}\)`,feedback:i===0?'Has elegido la región correcta y contado cada resultado una vez.':i===1?'Falta un resultado de la región pedida.':i===2?'Has incluido un resultado que no cumple la condición.':'El denominador debe ser el tamaño del espacio muestral.'}));
  return {id:`events-generated-${index+1}`,topicId:'t07',lessonId:'t07-e02',operation:task.id,universe,a,b,event,favorable:k,total:n,prompt:tex`Se extrae una ficha numerada del 1 al ${n}; todas son igual de probables. \(A=\{${a.join(',')}\}\) y \(B=\{${b.join(',')}\}\). ¿Cuál es la probabilidad de ${task.words}, es decir, ${task.label}?`,options,correct:'a',hint:'Marca primero qué números cumplen la frase y evita contar dos veces la intersección.',explanation:tex`La región pedida es \(\{${event.join(',')}\}\), con ${k} resultados de ${n} posibles. Por Laplace, \(P(${task.label.slice(2,-2)})=\frac{${k}}{${n}}\).`,source:'Ampliación procedural de 7.2; no forma parte del banco base'};
 });
}

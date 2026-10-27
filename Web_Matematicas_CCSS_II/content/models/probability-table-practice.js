const tex=String.raw;
const tasks=[
 {id:'joint',label:tex`\(P(A\cap B)\)`,words:'A y B a la vez'},
 {id:'row',label:tex`\(P(A)\)`,words:'A, sin fijar B'},
 {id:'column',label:tex`\(P(B)\)`,words:'B, sin fijar A'},
 {id:'givenB',label:tex`\(P(A\mid B)\)`,words:'A entre las tarjetas con B'},
 {id:'givenA',label:tex`\(P(B\mid A)\)`,words:'B entre las tarjetas con A'},
 {id:'neither',label:tex`\(P(A^c\cap B^c)\)`,words:'ni A ni B'}
];
const rng=seed=>{let state=seed>>>0;return()=>{state=(Math.imul(1664525,state)+1013904223)>>>0;return state/4294967296;};};
export function tableAnswer([ab,anb,nab,none],task){
 const total=ab+anb+nab+none,row=ab+anb,column=ab+nab;
 if(task==='joint')return [ab,total];
 if(task==='row')return [row,total];
 if(task==='column')return [column,total];
 if(task==='givenB')return [ab,column];
 if(task==='givenA')return [ab,row];
 if(task==='neither')return [none,total];
 throw new RangeError('Pregunta desconocida');
}
export function generateTablePractice(seed=1){
 const random=rng(seed),pick=()=>2+Math.floor(random()*15);
 return tasks.map((task,index)=>{
  const counts=[pick(),pick(),pick(),pick()], [ab,anb,nab,none]=counts;
  const total=counts.reduce((sum,x)=>sum+x,0),row=ab+anb,column=ab+nab;
  const [numerator,denominator]=tableAnswer(counts,task.id);
  const options=[[numerator,denominator],[numerator-1,denominator],[numerator+1,denominator],[numerator,denominator+1]].map(([a,b],i)=>({id:'abcd'[i],text:tex`\(\frac{${a}}{${b}}\)`,feedback:i===0?'Has leído la casilla o el margen adecuado y elegido el total correcto.':i===1?'Falta una tarjeta del grupo pedido.':i===2?'Has añadido una tarjeta que no cumple la condición.':'El denominador debe ser el conjunto de referencia indicado en la pregunta.'}));
  return {id:`table-generated-${index+1}`,topicId:'t07',lessonId:'t07-e03',operation:task.id,counts,numerator,denominator,prompt:tex`Se elige una de las ${total} tarjetas con la misma probabilidad. A y B son dos marcas posibles. Según la tabla, ¿cuál es la probabilidad de ${task.words}, es decir, ${task.label}?`,table:{caption:'Recuento de tarjetas por marcas A y B',headers:['Marca',tex`\(B\)`,tex`\(B^c\)`,'Total'],rows:[[tex`\(A\)`,ab,anb,row],[tex`\(A^c\)`,nab,none,nab+none],['Total',column,anb+none,total]]},options,correct:'a',hint:task.id.startsWith('given')?'En una condicionada, el denominador es el total del grupo situado después de «dado».':'Las casillas interiores son conjuntas; los totales de fila o columna son marginales.',explanation:tex`Hay ${numerator} tarjetas favorables entre ${denominator} tarjetas del grupo de referencia. Por tanto, \(${task.label.slice(2,-2)}=\frac{${numerator}}{${denominator}}\). ${task.id.startsWith('given')?'El denominador no es el total general, sino el de la condición.':'El denominador es el total de tarjetas porque se elige una entre todas.'}`,source:'Ampliación procedural de 7.3; no forma parte del banco base'};
 });
}

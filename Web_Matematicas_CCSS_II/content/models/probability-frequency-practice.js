const tex=String.raw;
const tasks=['absolute','relative','percent','cumulative','cumulativeRelative','interpretation'];
const rng=seed=>{let state=seed>>>0;return()=>{state=(Math.imul(1664525,state)+1013904223)>>>0;return state/4294967296;};};
const texNumber=value=>String(value).replace('.', '{,}');
export function frequencyValues(counts,category){
 const total=counts.reduce((sum,x)=>sum+x,0),absolute=counts[category],cumulative=counts.slice(0,category+1).reduce((sum,x)=>sum+x,0);
 return {total,absolute,relative:absolute/total,percent:100*absolute/total,cumulative,cumulativeRelative:cumulative/total};
}
function numericOptions(value,type,total){
 const isFraction=type==='relative'||type==='cumulativeRelative';
 const delta=type==='percent'?100/total:1;
 const values=isFraction?[[value-1,total],[value+1,total],[value,total+1]]:[value-delta,value+delta,value+2*delta];
 const format=x=>type==='percent'?tex`\(${texNumber(x)}\%\)`:isFraction?tex`\(\frac{${x[0]}}{${x[1]}}\)`:`${x}`;
 const correct=isFraction?[value,total]:value;
 return [correct,...values].map((x,i)=>({id:'abcd'[i],text:format(x),feedback:i===0?'Has usado la frecuencia y el total adecuados.':i===1?'Has dejado fuera una observación.':i===2?'Has añadido una observación de más.':'Revisa si debes contar, dividir o acumular.'}));
}
export function generateFrequencyPractice(seed=1){
 const random=rng(seed);
 return tasks.map((task,index)=>{
  const total=random()<0.5?20:40,counts=[2,2,2,2];
  for(let i=8;i<total;i++)counts[Math.floor(random()*4)]++;
  const category=task.startsWith('cumulative')?1+Math.floor(random()*2):Math.floor(random()*4);
  const values=frequencyValues(counts,category),c=values.absolute,cum=values.cumulative;
  const table={caption:`Registro didáctico de ${total} observaciones; categorías ordenadas`,headers:['Número de tareas completadas','Frecuencia absoluta'],rows:[[0,counts[0]],[1,counts[1]],[2,counts[2]],[3,counts[3]],['Total',total]]};
  const common={id:`frequency-generated-${index+1}`,topicId:'t07',lessonId:'t07-e04',kind:task,counts,total,category,table,correct:'a',source:'Ampliación procedural de 7.4; no forma parte del banco base'};
  if(task==='interpretation')return {...common,prompt:`En el registro didáctico de ${total} observaciones, ¿qué significa una frecuencia relativa?`,options:[
   {id:'a',text:'Describe la proporción observada en este registro; por sí sola no demuestra una probabilidad poblacional exacta.',feedback:'Correcto: describe lo contado y, con cautela, puede ayudar a estimar.'},
   {id:'b',text:'Es necesariamente la probabilidad exacta de toda la población.',feedback:'El registro no acredita por sí solo cómo se eligió una población.'},
   {id:'c',text:'Obliga a que las siguientes observaciones compensen las anteriores.',feedback:'No existe una compensación forzosa en las siguientes observaciones.'},
   {id:'d',text:'Es siempre igual al número de observaciones de la categoría.',feedback:'Eso es la frecuencia absoluta, no la relativa.'}
  ],hint:'Distingue el registro observado de una afirmación sobre toda una población.',explanation:'La frecuencia relativa es un cociente descriptivo de este registro. Una estimación poblacional requiere examinar la selección y el procedimiento.'};
  if(task==='absolute')return {...common,value:c,prompt:`¿Cuál es la frecuencia absoluta de exactamente ${category} tareas completadas?`,options:numericOptions(c,task,total),hint:'Lee la casilla de la categoría indicada, sin sumar otras filas.',explanation:`Exactamente ${category} tareas aparece ${c} veces: esa es la frecuencia absoluta.`};
  if(task==='relative')return {...common,value:c,prompt:`¿Cuál es la frecuencia relativa de exactamente ${category} tareas completadas?`,options:numericOptions(c,task,total),hint:'Divide el recuento de esa categoría entre el total observado.',explanation:tex`La categoría aparece ${c} veces entre ${total}. Su frecuencia relativa es \(\frac{${c}}{${total}}\).`};
  if(task==='percent')return {...common,value:values.percent,prompt:`¿Qué porcentaje observado corresponde a exactamente ${category} tareas completadas?`,options:numericOptions(values.percent,task,total),hint:'Multiplica la frecuencia relativa por 100.',explanation:tex`La categoría aparece ${c} veces entre ${total}; \(100\cdot\frac{${c}}{${total}}=${texNumber(values.percent)}\%\).`};
  if(task==='cumulative')return {...common,value:cum,prompt:`¿Cuál es la frecuencia absoluta acumulada de como máximo ${category} tareas completadas?`,options:numericOptions(cum,task,total),hint:'Suma desde la categoría 0 hasta la indicada, inclusive.',explanation:tex`Como máximo ${category} reúne las categorías 0 a ${category}: ${counts.slice(0,category+1).join(' + ')} = ${cum} observaciones.`};
  return {...common,value:cum,prompt:`¿Cuál es la frecuencia relativa acumulada de como máximo ${category} tareas completadas?`,options:numericOptions(cum,task,total),hint:'Acumula los recuentos hasta la categoría indicada y divide entre el total.',explanation:tex`El acumulado es ${cum} de ${total} observaciones: \(F_{${category}}=\frac{${cum}}{${total}}\).`};
 });
}

const tex=String.raw;
const rng=seed=>{let state=seed>>>0;return()=>{state=(Math.imul(1664525,state)+1013904223)>>>0;return state/4294967296;};};
const fraction=n=>tex`\(\frac{${n}}{10}\)`;
const choose=(items,random)=>items[Math.floor(random()*items.length)];
const four=(values,feedback)=>values.map((n,i)=>({id:'abcd'[i],text:fraction(n),feedback:i===0?feedback:'Ese valor no cumple la condición del enunciado.'}));
export function generateAxiomsPractice(seed=1){
 const random=rng(seed),negative=1+Math.floor(random()*4),first=1+Math.floor(random()*4),second=1+Math.floor(random()*4),missing=10-first-second;
 const a=1+Math.floor(random()*3),b=1+Math.floor(random()*3),sum=a+b,prior=2+Math.floor(random()*6),complement=10-prior;
 const biased=choose([2,3,4,6,7,8],random),other=10-biased;
 return [
  {id:'axioms-generated-1',kind:'nonnegative',prompt:tex`Un modelo propone \(P(A)=-\frac{${negative}}{10}\). ¿Qué regla incumple?`,options:[
   {id:'a',text:'No negatividad: ninguna probabilidad puede ser menor que 0.',feedback:'Correcto: el valor propuesto es negativo.'},
   {id:'b',text:'Solo la regla de Laplace.',feedback:'El problema es anterior a cualquier hipótesis de equiprobabilidad.'},
   {id:'c',text:'La definición de frecuencia acumulada.',feedback:'La frecuencia acumulada no es un axioma de probabilidad.'},
   {id:'d',text:'Ninguna regla: las probabilidades negativas son válidas.',feedback:'Los axiomas excluyen probabilidades negativas.'}
  ],correct:'a',hint:'El primer axioma establece un límite inferior para cualquier suceso.',explanation:tex`La no negatividad exige \(P(A)\geq0\). Un valor negativo no define un modelo de probabilidad válido.`},
  {id:'axioms-generated-2',kind:'normalization',expected:missing,prompt:tex`Tres resultados elementales incompatibles agotan el espacio. Dos tienen probabilidades \(\frac{${first}}{10}\) y \(\frac{${second}}{10}\). ¿Cuál corresponde al tercero?`,options:four([missing,missing-1,missing+1,missing+2],'Correcto: los tres resultados deben sumar 1.'),correct:'a',hint:'Resta de 1 la suma de los otros dos resultados.',explanation:tex`Al cubrir todo el espacio, \(P(E)=1\). La probabilidad faltante es \(1-\frac{${first}}{10}-\frac{${second}}{10}=\frac{${missing}}{10}\).`},
  {id:'axioms-generated-3',kind:'additivity',expected:sum,prompt:tex`A y B son incompatibles, con \(P(A)=\frac{${a}}{10}\) y \(P(B)=\frac{${b}}{10}\). ¿Cuánto vale \(P(A\cup B)\)?`,options:four([sum,sum-1,sum+1,sum+2],'Correcto: no hay intersección que descontar.'),correct:'a',hint:'La palabra «incompatibles» activa la aditividad.',explanation:tex`Como \(A\cap B=\varnothing\), la aditividad da \(P(A\cup B)=\frac{${a}}{10}+\frac{${b}}{10}=\frac{${sum}}{10}\). Sin esa condición habría que revisar el solape.`},
  {id:'axioms-generated-4',kind:'impossible',prompt:'¿Qué probabilidad tiene el suceso imposible en cualquier modelo que cumpla los axiomas?',options:[
   {id:'a',text:tex`\(P(\varnothing)=0\).`,feedback:'Correcto: se deduce de la aditividad con el suceso seguro.'},
   {id:'b',text:tex`\(P(\varnothing)=1\).`,feedback:'El valor 1 corresponde al suceso seguro.'},
   {id:'c',text:tex`\(P(\varnothing)=\frac{1}{2}\).`,feedback:'No hay resultados en el suceso imposible.'},
   {id:'d',text:'No se puede determinar con los axiomas.',feedback:tex`Sí se deduce usando \(E\cup\varnothing=E\).`}
  ],correct:'a',hint:'Suma el suceso imposible al seguro: la unión sigue siendo el seguro.',explanation:tex`Como \(E\) y \(\varnothing\) son incompatibles, \(P(E)=P(E)+P(\varnothing)\); por tanto, \(P(\varnothing)=0\). Es una consecuencia, no un axioma adicional.`},
  {id:'axioms-generated-5',kind:'complement',expected:complement,prompt:tex`Si \(P(A)=\frac{${prior}}{10}\), ¿cuánto vale \(P(A^c)\)?`,options:four([complement,complement-1,complement+1,complement+2],'Correcto: A y su contrario forman el suceso seguro.'),correct:'a',hint:'A y su contrario son incompatibles y completan el espacio.',explanation:tex`De la normalización y la aditividad, \(P(A)+P(A^c)=1\); así, \(P(A^c)=1-\frac{${prior}}{10}=\frac{${complement}}{10}\).`},
  {id:'axioms-generated-6',kind:'twoOutcomes',expected:other,prompt:tex`Un experimento solo tiene «sí» y «no». Si \(P(\text{sí})=\frac{${biased}}{10}\), ¿cuánto vale \(P(\text{no})\)?`,options:four([other,biased,5,10+biased],'Correcto: las dos opciones suman 1, aunque no sean equiprobables.'),correct:'a',hint:'Dos resultados posibles no obligan a que cada uno valga 1/2.',explanation:tex`«Sí» y «no» forman una partición, por lo que \(P(\text{no})=1-\frac{${biased}}{10}=\frac{${other}}{10}\). La igualdad de probabilidades requeriría otra hipótesis.`}
 ].map(q=>({topicId:'t07',lessonId:'t07-e05',source:'Ampliación procedural de 7.5; no forma parte del banco base',...q}));
}

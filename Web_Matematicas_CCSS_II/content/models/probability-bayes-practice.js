const tex=String.raw;
const rng=seed=>{let state=seed>>>0;return()=>{state=(Math.imul(1664525,state)+1013904223)>>>0;return state/4294967296;};};
function task(id,kind,weights,rates,n,d,prompt,hint,explanation){
 const contributions=weights.map((weight,i)=>weight*rates[i]);
 return {id:`bayes-generated-${id}`,topicId:'t07',lessonId:'t07-e10',kind,weights,rates,contributions,numerator:n,denominator:d,source:'Ampliación procedural de 7.10; fuera del banco base',prompt:tex`En un modelo hipotético de producción, \(A_i\) indica la línea que fabricó una pieza y \(B\) indica que la pieza presenta una marca. Los pesos de las líneas y las tasas de la marca aparecen en la tabla. ${prompt}`,table:{caption:'Producción hipotética de piezas según línea y presencia de la marca B',headers:['Línea',tex`\(P(A_i)\)`,tex`\(P(B\mid A_i)\)`],rows:weights.map((weight,i)=>[tex`\(A_${i+1}\)`,tex`\(\frac{${weight}}{10}\)`,tex`\(\frac{${rates[i]}}{100}\)`])},options:[[n,d],[n-1,d],[n+1,d],[n,d+1]].map(([a,b],i)=>({id:'abcd'[i],text:tex`\(\frac{${a}}{${b}}\)`,feedback:i===0?'Correcto: has usado todos los caminos hacia B en el denominador.':'Revisa la suma de los caminos hacia B y el camino de la línea preguntada.'})),correct:'a',hint,explanation};
}
export function generateBayesPractice(seed=1){
 const random=rng(seed),pick=(min,max)=>min+Math.floor(random()*(max-min+1));
 const w=pick(2,8),r1=pick(2,20),rawR2=pick(2,20),r2=rawR2===r1?(rawR2===20?2:rawR2+1):rawR2;
 const twoWeights=[w,10-w],twoRates=[r1,r2],c1=w*r1,c2=(10-w)*r2,sum2=c1+c2;
 const v1=pick(2,5),v2=pick(2,8-v1),v3=10-v1-v2,threeWeights=[v1,v2,v3],threeRates=[pick(2,20),pick(2,20),pick(2,20)];
 const [d1,d2,d3]=threeWeights.map((weight,i)=>weight*threeRates[i]),sum3=d1+d2+d3;
 return [
  task(1,'two-total',twoWeights,twoRates,sum2,1000,tex`Si se observa \(B\), ¿cuál era su probabilidad total \(P(B)\)?`,'Multiplica el peso de cada línea por su tasa y suma ambos caminos.',tex`\(P(B)=\frac{${w}}{10}\cdot\frac{${r1}}{100}+\frac{${10-w}}{10}\cdot\frac{${r2}}{100}=\frac{${c1}+${c2}}{1000}=\frac{${sum2}}{1000}\).`),
  task(2,'first-posterior',twoWeights,twoRates,c1,sum2,tex`Se observa \(B\). ¿Cuál es \(P(A_1\mid B)\)?`,'El numerador es el camino A₁ y B; el denominador, todos los caminos que producen B.',tex`\(P(A_1\mid B)=\frac{P(A_1)P(B\mid A_1)}{P(B)}=\frac{\frac{${c1}}{1000}}{\frac{${sum2}}{1000}}=\frac{${c1}}{${sum2}}\). No se sustituye por la tasa \(P(B\mid A_1)\).`),
  task(3,'second-posterior',twoWeights,twoRates,c2,sum2,tex`Con la misma observación \(B\), ¿cuál es \(P(A_2\mid B)\)?`,'Conserva el mismo denominador; cambia al camino que empieza en A₂.',tex`\(P(A_2\mid B)=\frac{${c2}}{${sum2}}\). Las posteriores de las dos líneas suman \(\frac{${c1+c2}}{${sum2}}=1\).`),
  task(4,'three-total',threeWeights,threeRates,sum3,1000,tex`Ahora hay tres líneas. ¿Cuál es \(P(B)\)?`,'Suma los tres productos; no hagas la media simple de las tasas.',tex`\(P(B)=\frac{${d1}+${d2}+${d3}}{1000}=\frac{${sum3}}{1000}\). Cada término multiplica el peso de una línea por su tasa.`),
  task(5,'middle-posterior',threeWeights,threeRates,d2,sum3,tex`Se observa \(B\). ¿Cuál es \(P(A_2\mid B)\)?`,'Usa la contribución de A₂ como numerador y la suma de las tres contribuciones como denominador.',tex`\(P(A_2\mid B)=\frac{P(A_2)P(B\mid A_2)}{P(B)}=\frac{${d2}}{${sum3}}\).`),
  task(6,'third-posterior',threeWeights,threeRates,d3,sum3,tex`Con la misma observación \(B\), ¿cuál es \(P(A_3\mid B)\)?`,'La condición observada sigue siendo B; selecciona el camino A₃ y B.',tex`\(P(A_3\mid B)=\frac{${d3}}{${sum3}}\). Junto con \(P(A_1\mid B)=\frac{${d1}}{${sum3}}\) y \(P(A_2\mid B)=\frac{${d2}}{${sum3}}\), las tres posteriores suman 1.`)
 ];
}

const tex=String.raw;
const rng=seed=>{let state=seed>>>0;return()=>{state=(Math.imul(1664525,state)+1013904223)>>>0;return state/4294967296;};};
const frac=n=>tex`\(\frac{${n}}{1000}\)`;
function task(id,kind,weights,rates,n,prompt,hint,explanation){
 const table={caption:'Caminos hacia el resultado B en un modelo hipotético',headers:['Grupo','Peso del grupo',tex`\(P(B\mid\text{grupo})\)`],rows:weights.map((w,i)=>[tex`\(A_${i+1}\)`,tex`\(\frac{${w}}{10}\)`,tex`\(\frac{${rates[i]}}{100}\)`])};
 return {id:`total-generated-${id}`,topicId:'t07',lessonId:'t07-e09',kind,weights,rates,numerator:n,denominator:1000,source:'Ampliación procedural de 7.9; fuera del banco base',prompt:tex`Los grupos de la tabla forman una partición. Se elige un caso al azar según sus pesos. ${prompt}`,table,options:[n,n-1,n+1,n+2].map((value,i)=>({id:'abcd'[i],text:frac(value),feedback:i===0?'Correcto: has multiplicado dentro de cada camino y sumado los caminos adecuados.':'Revisa los pesos de los grupos y qué caminos llegan al resultado pedido.'})),correct:'a',hint,explanation};
}
export function generateTotalPractice(seed=1){
 const random=rng(seed),pick=(min,max)=>min+Math.floor(random()*(max-min+1));
 const w=pick(2,8),r1=pick(2,12),r2=pick(2,12),twoWeights=[w,10-w],twoRates=[r1,r2];
 const c1=w*r1,c2=(10-w)*r2,sum2=c1+c2;
 const v1=pick(2,5),v2=pick(2,8-v1),v3=10-v1-v2,threeWeights=[v1,v2,v3],threeRates=[pick(2,12),pick(2,12),pick(2,12)];
 const [d1,d2,d3]=threeWeights.map((weight,i)=>weight*threeRates[i]),sum3=d1+d2+d3;
 return [
  task(1,'first-path',twoWeights,twoRates,c1,tex`¿Qué aporta el camino \(A_1\cap B\) a \(P(B)\)?`,'Multiplica el peso de A₁ por la probabilidad de B dentro de A₁.',tex`\(P(A_1\cap B)=P(A_1)P(B\mid A_1)=\frac{${w}}{10}\cdot\frac{${r1}}{100}=\frac{${c1}}{1000}\).`),
  task(2,'second-path',twoWeights,twoRates,c2,tex`¿Qué aporta el camino \(A_2\cap B\) a \(P(B)\)?`,'Multiplica el peso de A₂ por la probabilidad de B dentro de A₂.',tex`\(P(A_2\cap B)=P(A_2)P(B\mid A_2)=\frac{${10-w}}{10}\cdot\frac{${r2}}{100}=\frac{${c2}}{1000}\).`),
  task(3,'two-total',twoWeights,twoRates,sum2,tex`Sin conocer el grupo, ¿cuánto vale \(P(B)\)?`,'Suma los dos productos, porque los grupos son incompatibles y cubren todos los casos.',tex`\(P(B)=\frac{${w}}{10}\cdot\frac{${r1}}{100}+\frac{${10-w}}{10}\cdot\frac{${r2}}{100}=\frac{${c1}+${c2}}{1000}=\frac{${sum2}}{1000}\).`),
  task(4,'third-path',threeWeights,threeRates,d3,tex`Ahora hay tres grupos. ¿Qué aporta el camino \(A_3\cap B\)?`,'Multiplica el peso de A₃ por la probabilidad de B dentro de A₃.',tex`\(P(A_3\cap B)=\frac{${v3}}{10}\cdot\frac{${threeRates[2]}}{100}=\frac{${d3}}{1000}\).`),
  task(5,'three-total',threeWeights,threeRates,sum3,tex`Sumando los tres caminos, ¿cuánto vale \(P(B)\)?`,'Multiplica cada peso por su tasa y suma las tres contribuciones.',tex`\(P(B)=\frac{${d1}}{1000}+\frac{${d2}}{1000}+\frac{${d3}}{1000}=\frac{${sum3}}{1000}\).`),
  task(6,'complement',threeWeights,threeRates,1000-sum3,tex`Con los mismos tres grupos, ¿cuánto vale \(P(B^c)\)?`,'Primero calcula P(B) con los tres caminos y después resta de 1.',tex`\(P(B^c)=1-P(B)=1-\frac{${sum3}}{1000}=\frac{${1000-sum3}}{1000}\).`)
 ];
}

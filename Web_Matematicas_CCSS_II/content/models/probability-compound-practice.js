const tex=String.raw;
const rng=seed=>{let state=seed>>>0;return()=>{state=(Math.imul(1664525,state)+1013904223)>>>0;return state/4294967296;};};
const frac=(n,d)=>tex`\(\frac{${n}}{${d}}\)`;
function options(n,d){
 const values=[[n,d],[n-1,d],[n+1,d],[n,d+1]];
 return values.map(([a,b],i)=>({id:'abcd'[i],text:frac(a,b),feedback:i===0?'Correcto: has seguido el camino y usado el total adecuado en cada etapa.':'Revisa el total de bolas después de la primera extracción y multiplica las ramas del camino.'}));
}
function branches(r,b,replace){
 const t=r+b, next=t-(replace?0:1), redAfterRed=r-(replace?0:1), blueAfterBlue=b-(replace?0:1);
 return [
  tex`Primera extracción: \(P(R_1)=\frac{${r}}{${t}}\), \(P(A_1)=\frac{${b}}{${t}}\).`,
  tex`Tras roja: \(P(R_2\mid R_1)=\frac{${redAfterRed}}{${next}}\), \(P(A_2\mid R_1)=\frac{${b}}{${next}}\).`,
  tex`Tras azul: \(P(R_2\mid A_1)=\frac{${r}}{${next}}\), \(P(A_2\mid A_1)=\frac{${blueAfterBlue}}{${next}}\).`
 ];
}
function task(id,kind,r,b,replace,n,d,prompt,hint,explanation){
 const t=r+b;
 return {id:`compound-generated-${id}`,topicId:'t07',lessonId:'t07-e07',kind,red:r,blue:b,replace,numerator:n,denominator:d,source:'Ampliación procedural de 7.7; fuera del banco base',prompt:tex`Una urna contiene ${r} bolas rojas y ${b} azules, todas equiprobables. Se extraen dos bolas ${replace?'con':'sin'} reemplazamiento. ${prompt}`,steps:branches(r,b,replace),options:options(n,d),correct:'a',hint,explanation};
}
export function generateCompoundPractice(seed=1){
 const random=rng(seed), pick=()=>2+Math.floor(random()*5);
 const [r1,b1,r2,b2,r3,b3,r4,b4,r5,b5,r6,b6]=Array.from({length:12},pick);
 const t1=r1+b1,t2=r2+b2,t3=r3+b3,t4=r4+b4,t5=r5+b5,t6=r6+b6;
 return [
  task(1,'with-rr',r1,b1,true,r1*r1,t1*t1,'¿Cuál es la probabilidad de roja y roja?','Multiplica las dos ramas rojas; al devolver la primera bola, la composición no cambia.',tex`\(P(R_1\cap R_2)=\frac{${r1}}{${t1}}\cdot\frac{${r1}}{${t1}}=\frac{${r1*r1}}{${t1*t1}}\).`),
  task(2,'with-at-least-one-red',r2,b2,true,t2*t2-b2*b2,t2*t2,'¿Cuál es la probabilidad de al menos una roja?','El único camino contrario es azul y azul.',tex`\(P(\text{al menos una roja})=1-P(A_1\cap A_2)=1-\frac{${b2}}{${t2}}\cdot\frac{${b2}}{${t2}}=\frac{${t2*t2-b2*b2}}{${t2*t2}}\). Equivale a sumar los caminos roja-roja, roja-azul y azul-roja.`),
  task(3,'without-rr',r3,b3,false,r3*(r3-1),t3*(t3-1),'¿Cuál es la probabilidad de roja y roja?','Tras sacar una roja sin devolverla, hay una roja y una bola menos.',tex`\(P(R_1\cap R_2)=\frac{${r3}}{${t3}}\cdot\frac{${r3-1}}{${t3-1}}=\frac{${r3*(r3-1)}}{${t3*(t3-1)}}\).`),
  task(4,'without-ra',r4,b4,false,r4*b4,t4*(t4-1),'¿Cuál es la probabilidad de roja y después azul?','Sigue el camino roja-azul; tras la roja quedan las mismas bolas azules y una bola menos en total.',tex`\(P(R_1\cap A_2)=\frac{${r4}}{${t4}}\cdot\frac{${b4}}{${t4-1}}=\frac{${r4*b4}}{${t4*(t4-1)}}\).`),
  task(5,'second-red-with',r5,b5,true,r5,t5,'Si la primera ha sido roja, ¿cuánto vale la rama hacia una segunda roja?','Se devolvió la primera bola: mira la composición inicial.',tex`\(P(R_2\mid R_1)=\frac{${r5}}{${t5}}\): al devolver la roja, la urna recupera su composición.`),
  task(6,'second-red-without',r6,b6,false,r6-1,t6-1,'Si la primera ha sido roja, ¿cuánto vale la rama hacia una segunda roja?','No se devolvió la roja: resta una roja y una bola del total.',tex`\(P(R_2\mid R_1)=\frac{${r6-1}}{${t6-1}}\): queda una roja menos entre una bola menos.`)
 ];
}

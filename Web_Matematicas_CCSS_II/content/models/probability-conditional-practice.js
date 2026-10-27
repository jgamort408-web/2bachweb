const tex=String.raw;
const rng=seed=>{let state=seed>>>0;return()=>{state=(Math.imul(1664525,state)+1013904223)>>>0;return state/4294967296;};};
const frac=(n,d)=>tex`\(\frac{${n}}{${d}}\)`;
function makeCounts(random){
 const pick=()=>2+Math.floor(random()*13);
 const ab=pick(),aOnly=pick(),bOnly=pick(),none=pick();
 return [ab,aOnly,bOnly===aOnly?(bOnly===14?2:bOnly+1):bOnly,none];
}
function task(id,kind,counts,n,d,prompt,hint,explanation){
 const [ab,aOnly,bOnly,none]=counts,a=ab+aOnly,b=ab+bOnly,total=a+bOnly+none;
 const values=[[n,d],[n-1,d],[n+1,d],[n,d+1]];
 return {id:`conditional-generated-${id}`,topicId:'t07',lessonId:'t07-e08',kind,counts,numerator:n,denominator:d,source:'Ampliación procedural de 7.8; fuera del banco base',prompt:tex`Se elige al azar una de las ${total} tarjetas, todas equiprobables. A y B son dos marcas. ${prompt}`,table:{caption:'Tarjetas clasificadas por las marcas A y B',headers:['Marca',tex`\(B\)`,tex`\(B^c\)`,'Total'],rows:[[tex`\(A\)`,ab,aOnly,a],[tex`\(A^c\)`,bOnly,none,bOnly+none],['Total',b,aOnly+none,total]]},options:values.map(([x,y],i)=>({id:'abcd'[i],text:frac(x,y),feedback:i===0?'Correcto: has elegido el grupo de referencia adecuado.':'Revisa qué grupo se conoce y qué parte de él cumple el suceso pedido.'})),correct:'a',hint,explanation};
}
export function generateConditionalPractice(seed=1){
 const random=rng(seed),c1=makeCounts(random),c2=makeCounts(random),c3=makeCounts(random);
 const [x,y,z,w]=c1,[u,v,h,j]=c2,[m,p,k,l]=c3;
 const t3=m+p+k+l;
 return [
  task(1,'a-given-b',c1,x,x+z,tex`Entre las tarjetas con \(B\), ¿qué probabilidad hay de \(A\), es decir, \(P(A\mid B)\)?`,'El denominador es el total de la columna B.',tex`\(P(A\mid B)=\frac{|A\cap B|}{|B|}=\frac{${x}}{${x+z}}\).`),
  task(2,'b-given-a',c1,x,x+y,tex`Entre las tarjetas con \(A\), ¿qué probabilidad hay de \(B\), es decir, \(P(B\mid A)\)?`,'Ahora el denominador es el total de la fila A.',tex`\(P(B\mid A)=\frac{|A\cap B|}{|A|}=\frac{${x}}{${x+y}}\). El numerador coincide con la pregunta anterior, pero el denominador cambia.`),
  task(3,'not-a-given-b',c2,h,u+h,tex`Entre las tarjetas con \(B\), ¿qué probabilidad hay de que no se dé \(A\), es decir, \(P(A^c\mid B)\)?`,'Dentro de B, busca la casilla de A complementario.',tex`\(P(A^c\mid B)=\frac{|A^c\cap B|}{|B|}=\frac{${h}}{${u+h}}\).`),
  task(4,'not-b-given-a',c2,v,u+v,tex`Entre las tarjetas con \(A\), ¿qué probabilidad hay de que no se dé \(B\), es decir, \(P(B^c\mid A)\)?`,'Dentro de A, busca la casilla de B complementario.',tex`\(P(B^c\mid A)=\frac{|A\cap B^c|}{|A|}=\frac{${v}}{${u+v}}\).`),
  task(5,'a-given-not-b',c3,p,p+l,tex`Entre las tarjetas sin \(B\), ¿qué probabilidad hay de \(A\), es decir, \(P(A\mid B^c)\)?`,'El grupo conocido es la columna B complementario.',tex`\(P(A\mid B^c)=\frac{|A\cap B^c|}{|B^c|}=\frac{${p}}{${p+l}}\).`),
  task(6,'joint-product',c3,m,t3,tex`Usando \(P(A)P(B\mid A)\), ¿cuál es la probabilidad conjunta \(P(A\cap B)\)?`,'Multiplica el total de A sobre el total general por la parte de B dentro de A.',tex`\(P(A\cap B)=P(A)P(B\mid A)=\frac{${m+p}}{${t3}}\cdot\frac{${m}}{${m+p}}=\frac{${m}}{${t3}}\).`)
 ];
}

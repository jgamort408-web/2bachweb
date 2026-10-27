const tex=String.raw;
const types=['die','urn','deck','die','urn','deck'];
const gcd=(a,b)=>b?gcd(b,a%b):a;
const pick=(items,random)=>items[Math.floor(random()*items.length)];
function choices(k,n){
 const values=[[k,n],[k-1,n],[k+1,n],[k,n+1]];
 return values.map(([a,b],i)=>({id:'abcd'[i],text:tex`\(\frac{${a}}{${b}}\)`,feedback:i===0?'Has contado los casos favorables y todos los posibles.':i===1?'Falta un caso favorable.':i===2?'Has añadido un caso que no cumple la condición.':'El denominador no es el número total de resultados elementales.'}));
}
export function seededRandom(seed){
 let state=seed>>>0;
 return ()=>{state=(Math.imul(1664525,state)+1013904223)>>>0;return state/4294967296;};
}
export function generateLaplaceQuestions(seed=1){
 const random=seededRandom(seed);
 return types.map((type,index)=>{
  let n,k,statement,listing;
  if(type==='die'){
   n=pick([6,8,10,12],random);
   const threshold=pick([2,3,4,5],random);
   k=n-threshold;
   statement=`Se lanza un dado equilibrado de ${n} caras numeradas del 1 al ${n}. ¿Cuál es la probabilidad de obtener un número mayor que ${threshold}?`;
   listing=`${Array.from({length:k},(_,i)=>threshold+i+1).join(', ')}`;
  }else if(type==='urn'){
   n=pick([5,6,7,8,9],random);k=1+Math.floor(random()*(n-1));
   statement=`Una urna tiene ${k} bolas rojas y ${n-k} azules, indistinguibles al tacto. Se extrae una bola al azar. ¿Cuál es la probabilidad de que sea roja?`;
   listing=`${k} bolas rojas`;
  }else{
   n=40;const suits=['oros','copas','espadas','bastos'];
   const suit=pick(suits,random),rank=pick(['caballo','rey','sota'],random);
   if(index===2){k=10;statement=`De una baraja española de 40 cartas se extrae una carta al azar. ¿Cuál es la probabilidad de que sea de ${suit}?`;listing=`10 cartas de ${suit}`;}
   else{k=4;statement=`De una baraja española de 40 cartas se extrae una carta al azar. ¿Cuál es la probabilidad de sacar un ${rank}?`;listing=`4 cartas de valor ${rank}`;}
  }
  const divisor=gcd(k,n),reduced=divisor>1?tex` = \frac{${k/divisor}}{${n/divisor}}`:'';
  return {id:`laplace-generated-${index+1}`,topicId:'t07',lessonId:'t07-e01',kind:type,favorable:k,total:n,prompt:statement,options:choices(k,n),correct:'a',hint:'Comprueba la equiprobabilidad; después cuenta casos favorables y casos posibles.',explanation:tex`Los resultados elementales son equiprobables. Favorables: ${listing}; posibles: ${n}. Por Laplace, \(P(A)=\frac{${k}}{${n}}${reduced}\).`,source:'Ampliación procedural de 7.1; no forma parte del banco base'};
 });
}

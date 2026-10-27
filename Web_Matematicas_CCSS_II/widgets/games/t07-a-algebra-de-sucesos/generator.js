export const operations=[
 {id:'union',label:'A ∪ B',hint:'Incluye los resultados que estén en A o en B, también los que compartan.'},
 {id:'intersection',label:'A ∩ B',hint:'Conserva solo los resultados que estén en ambos sucesos.'},
 {id:'difference',label:'A \\ B',hint:'Empieza con A y quita los resultados que también estén en B.'},
 {id:'complement',label:'Aᶜ',hint:'Incluye los resultados del espacio muestral que no estén en A.'}
];
const sample=(items,random)=>items[Math.floor(random()*items.length)];
export function answerFor(universe,a,b,operation){
 const A=new Set(a),B=new Set(b);
 return universe.filter(x=>operation==='union'?(A.has(x)||B.has(x)):operation==='intersection'?(A.has(x)&&B.has(x)):operation==='difference'?(A.has(x)&&!B.has(x)):!A.has(x));
}
export function generateRound(random=Math.random,operation=sample(operations,random).id){
 if(!operations.some(o=>o.id===operation))throw new RangeError('Operación desconocida');
 const universe=[1,2,3,4,5,6];
 let a,b,answer;
 do{
  a=universe.filter(()=>random()<0.5);b=universe.filter(()=>random()<0.5);
  answer=answerFor(universe,a,b,operation);
 }while(!a.length||!b.length||a.length===6||b.length===6||!answer.length||answer.length===6);
 return {universe,a,b,operation,answer};
}
export function generateSession(random=Math.random){
 const sequence=[...operations,...operations];
 for(let i=sequence.length-1;i>0;i--){const j=Math.floor(random()*(i+1));[sequence[i],sequence[j]]=[sequence[j],sequence[i]];}
 return sequence.map(o=>generateRound(random,o.id));
}
export function sameSet(selected,answer){
 const a=new Set(selected),b=new Set(answer);
 return a.size===b.size&&[...a].every(x=>b.has(x));
}

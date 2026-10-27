export const tasks=[
 {id:'ab',question:'¿Cuál es P(A ∩ B)?',hint:'Multiplica la rama A por la rama B que sale de A.'},
 {id:'anb',question:'¿Cuál es P(A ∩ Bᶜ)?',hint:'Multiplica A por la rama Bᶜ que sale de A.'},
 {id:'nab',question:'¿Cuál es P(Aᶜ ∩ B)?',hint:'Multiplica Aᶜ por la rama B que sale de Aᶜ.'},
 {id:'total',question:'¿Cuál es P(B)?',hint:'Suma los dos caminos que terminan en B.'},
 {id:'union',question:'¿Cuál es P(A ∪ B)?',hint:'Suma los caminos A ∩ B, A ∩ Bᶜ y Aᶜ ∩ B.'},
 {id:'none',question:'¿Cuál es P(Aᶜ ∩ Bᶜ)?',hint:'Multiplica la rama Aᶜ por la rama Bᶜ que sale de Aᶜ.'}
];
export function valuesFor(p,q,r){
 if(![p,q,r].every(x=>Number.isInteger(x)&&x>=10&&x<=90&&x%10===0))throw new RangeError('Las ramas deben ser porcentajes de 10 a 90');
 const ab=p*q/100,anb=p*(100-q)/100,nab=(100-p)*r/100,none=(100-p)*(100-r)/100;
 return {ab,anb,nab,none,total:ab+nab,union:ab+anb+nab};
}
export function generateSession(random=Math.random){
 const pick=()=>10+Math.floor(random()*9)*10;
 const sequence=[...tasks];
 for(let i=sequence.length-1;i>0;i--){const j=Math.floor(random()*(i+1));[sequence[i],sequence[j]]=[sequence[j],sequence[i]];}
 return sequence.map(task=>{const p=pick(),q=pick(),r=pick();return {p,q,r,task:task.id,answer:valuesFor(p,q,r)[task.id]};});
}

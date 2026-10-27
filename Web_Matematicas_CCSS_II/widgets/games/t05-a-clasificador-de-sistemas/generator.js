import {gaussDetails} from '../../../content/models/gauss.js';
import {fraction} from '../../../content/models/matrix-inverse.js';
import {augmentedTex,equivalentSystemTex} from '../../../content/models/equivalent-systems.js';
const tex=String.raw;
export const modes={equations:'Ecuaciones',echelon:'Matriz escalonada',graph:'Pares de rectas',ranks:'Datos de rango'};
export const labels={SCD:'SCD · Una solución',SCI:'SCI · Infinitas soluciones',SI:'SI · Ninguna solución'};
export function generateClassifier(seed=1){
 if(!Number.isInteger(seed)||seed<0||seed>4294967295)throw new RangeError('Semilla entera de 32 bits.');
 let state=seed>>>0;
 const pick=a=>{state=(Math.imul(state,1664525)+1013904223)>>>0;return a[Math.floor(state/4294967296*a.length)];};
 const shuffle=items=>{const a=[...items];for(let i=a.length-1;i>0;i--){const j=pick(Array.from({length:i+1},(_,k)=>k));[a[i],a[j]]=[a[j],a[i]];}return a;};
 const n=()=>pick([-3,-2,-1,0,1,2,3]),nonzero=()=>pick([-2,-1,1,2]),challenges=[];
 for(const mode of Object.keys(modes))for(const type of Object.keys(labels)){
  const u=n(),v=n(),a=nonzero();let rows,description='';
  if(mode==='graph'){
   const x=pick([-2,-1,0,1,2]),y=pick([-2,-1,0,1,2]),slope=pick([-2,-1,0,1,2]);
   const first=pick([true,false])?[1,0,x]:[-slope,1,y-slope*x];
   if(type==='SCI')rows=[first,first.map(v=>-v)];
   else if(type==='SI')rows=[first,[...first.slice(0,2),first[2]+nonzero()]];
   else{
    const second=first[1]===0?[-slope,1,y-slope*x]:pick([true,false])?[1,0,x]:[-pick([-2,-1,0,1,2].filter(m=>m!==slope)),1,0];
    if(second[1]!==0)second[2]=second[0]*x+y;
    rows=[first,second];
   }
   description='Recta 1: trazo continuo grueso. Recta 2: trazo discontinuo fino. Si se superponen, ambos trazos representan la misma recta. Las ecuaciones exactas aparecen debajo; una imagen aislada no prueba la clasificación.';
  }else if(mode==='equations'){
   rows=type==='SCD'?[[1,1,u+v],[1,-1,u-v]]:
    type==='SCI'?[[1,0,1,u],[0,1,-1,v]]:
    [[1,1,1,u],[2,2,2,2*u+pick([-1,1])]];
   rows=shuffle(rows).map(r=>{const sign=pick([-1,1]);return r.map(v=>v*sign);});
  }else if(mode==='echelon'){
   rows=type==='SCD'?[[1,a,u],[0,1,v],[0,0,0]]:
    type==='SCI'?[[1,a,nonzero(),u],[0,0,1,v],[0,0,0,0]]:
    [[1,a,u],[0,0,nonzero()]];
  }else{
   rows=type==='SCD'?[[1,0,0,u],[0,1,0,v],[0,0,1,n()]]:
    type==='SCI'?pick([[[0,0,0,0],[0,0,0,0]],[[1,a,1,u],[0,0,0,0]],[[1,0,1,u],[0,1,-1,v]]]):
    pick([[[0,0,0,nonzero()],[0,0,0,0]],[[1,a,u],[0,0,nonzero()]],[[1,0,1,u],[0,1,1,v],[0,0,0,nonzero()]]]);
  }
  const g=gaussDetails(rows),kind=g.kind;
  if(kind!==type)throw new Error('La familia generada no coincide con su clasificación.');
  const system=equivalentSystemTex(rows.map(r=>r.map(v=>fraction(v))));
  const statement=mode==='ranks'?tex`m=${g.m},\quad n=${g.n},\quad\operatorname{rg}(A)=${g.r},\quad\operatorname{rg}(A|B)=${g.s}`:
   mode==='echelon'?augmentedTex(rows.map(r=>r.map(v=>fraction(v)))):system;
  const criterion=kind==='SI'?tex`\(\operatorname{rg}(A)=${g.r}\ne${g.s}=\operatorname{rg}(A|B)\)`:
   tex`\(\operatorname{rg}(A)=\operatorname{rg}(A|B)=${g.r}${kind==='SCD'?'=':'<'}${g.n}=n\)`;
  let explanation=criterion+'. '+(kind==='SCD'?'Los rangos coinciden con el número de incógnitas: hay una única solución.':kind==='SCI'?tex`El sistema es compatible y quedan \(n-r=${g.n-g.r}\) variables libres: hay infinitas soluciones reales.`:'Los rangos son distintos: la ampliada contiene una contradicción y no existe solución.');
  if(mode==='echelon')explanation+=' La barra separa los coeficientes de B. Una fila 0=0 no impone restricciones; una fila 0=c con c distinto de cero impide resolver el sistema.';
  if(mode==='graph')explanation+=' '+(kind==='SCD'?'Las rectas son secantes.':kind==='SCI'?'Las rectas son coincidentes, aunque sus ecuaciones puedan tener signos distintos.':'Las rectas son paralelas distintas.');
  if(mode==='ranks')explanation+=' m cuenta ecuaciones y n incógnitas. Para decidir SCD o SCI se compara con n.';
  const proof=tex`Una reducción por operaciones elementales da \[${augmentedTex(g.echelon.matrix)}.\]`;
  challenges.push({id:mode+'-'+type,mode,title:modes[mode],rows,m:g.m,n:g.n,r:g.r,s:g.s,kind,statement,system,description,explanation,proof,
   hint:mode==='graph'?'Usa también las ecuaciones: compara coeficientes y términos independientes; identifica si coinciden o si se cortan.':
    mode==='echelon'?'Cuenta pivotes de A y de la ampliada. La última columna no representa una incógnita.':
    mode==='ranks'?'Primero compara ambos rangos. Si son iguales, compáralos con n, no con m.':'Opera sobre ecuaciones completas, incluido el término independiente, y compara los rangos antes de contar variables libres.',
   options:shuffle(Object.entries(labels).map(([id,text])=>({id,text})))});
 }
 return shuffle(challenges).map((c,index)=>({...c,index}));
}
export const createClassifierState=()=>({index:0,phase:'answer',attempts:0,score:0,hints:[],results:[]});
export function answerClassifier(state,challenge,id){
 if(state.phase!=='answer'||challenge?.index!==state.index||!challenge.options.some(o=>o.id===id))return {state,ignored:true};
 const correct=id===challenge.kind,attempts=state.attempts+1,done=correct||attempts===2,points=correct?(attempts===1?100:50):0;
 return {correct,done,points,ignored:false,state:{...state,attempts,phase:done?'resolved':'answer',score:state.score+(done?points:0),results:done?[...state.results,{id:challenge.id,correct,attempts,points}]:state.results}};
}
export function hintClassifier(state){return state.phase!=='answer'||state.hints.includes(state.index)?state:{...state,hints:[...state.hints,state.index]};}
export function advanceClassifier(state){
 if(state.phase!=='resolved')return state;
 const index=state.index+1;return {...state,index,phase:index===12?'summary':'answer',attempts:0};
}

import { generateQuestion, seededRandom } from './generator.js';

const math=text=>'\\('+text+'\\)';
const integer=(random,min,max)=>min+Math.floor(random()*(max-min+1));
function choices(values,feedback) {
  return values.map((value,i)=>({id:'answer-'+i,value,text:typeof value==='number'?math(String(value)):value,
    feedback:i===0?'Correcto.':feedback}));
}
function direct(random,index) {
  const degree=index+1, a=integer(random,-2,2), k=random()<.5?-1:1, value=integer(random,-3,3);
  const coefficients=degree===1?[value-k*a,k]:degree===2?[k*a*a+value,-2*k*a,k]:[value-k*a**3,3*k*a*a,-3*k*a,k];
  const terms=[];
  for(let d=degree;d>=0;d--){
    const c=coefficients[d];if(!c)continue;
    terms.push((c<0?'-':terms.length?'+':'')+(d&&Math.abs(c)===1?'':Math.abs(c))+(d?'x'+(d>1?'^{'+d+'}':''):''));
  }
  return {family:'polynomial',parameters:{a,degree,k,value,coefficients},answer:value,
    prompt:'Calcula '+math('\\lim_{x\\to'+a+'}('+terms.join('')+')')+'.',
    options:choices([value,value+1,value-1,'No existe'],'Un polinomio es continuo. Sustituye el punto conservando signos y potencias.'),
    explanation:'Por continuidad se sustituye '+math('x='+a)+'. El polinomio equivale a '+math(k+'(x-('+a+'))^{'+degree+'}+('+value+')')+', y el límite es '+math(String(value))+'.',
    hint:'Sustituye el punto y calcula primero las potencias.',correct:'answer-0'};
}
function graphQuestion(random) {
  const a=integer(random,-2,2), left=integer(random,-2,2);
  const right=random()<.5?left:left+(random()<.5?-1:1);
  let point=left+3;if(point===right)point=left-3;
  const side=['left','right','both'][integer(random,0,2)];
  const answer=side==='left'?left:side==='right'?right:left===right?left:'No existe';
  const candidates=[answer,point,left,right,'No existe',left+1,left-1];
  const values=[...new Set(candidates)].slice(0,4);
  const graph={a,left,right,point,side,leftSlope:random()<.5?-1:1,rightSlope:random()<.5?-1:1};
  return {family:'graph',parameters:graph,graph,answer,
    prompt:'Lee en la gráfica '+math('\\lim_{x\\to'+a+(side==='left'?'^-':side==='right'?'^+':'')+'}f(x)')+'. El punto relleno indica el valor de la función.',
    correct:'answer-0',options:choices(values,'No confundas el punto relleno con la altura de aproximación. Comprueba el lado indicado; si se piden ambos, deben coincidir.'),
    explanation:'Las ramas se acercan a '+left+' por la izquierda y a '+right+' por la derecha. El valor puntual es '+point+'. '+
      (side==='both'?(left===right?'Los laterales coinciden.':'Los laterales difieren: no se promedian.'):'Solo se pide el lateral '+(side==='left'?'izquierdo.':'derecho.')),
    hint:'Sigue la rama hacia el círculo vacío por el lado solicitado. Puedes acercar los puntos o consultar la tabla.'};
}
function algebra(random,family) {
  const q=generateQuestion(random,family);
  if(family===2){
    q.options[3]={id:'answer-3',value:'0/0',text:math('0/0'),feedback:'0/0 es una forma indeterminada, no el resultado del límite.'};
  }
  return q;
}
function method(random) {
  const families=[2,4,7,8], family=families[integer(random,0,3)];
  const q=algebra(random,family);
  const labels=['Factorizar la diferencia de cuadrados','Dividir numerador y denominador por x²','Multiplicar por el conjugado','Reunir las fracciones en un solo cociente'];
  const correct=labels[families.indexOf(family)];
  return {...q,family:'method',sourceFamily:family,
    prompt:q.prompt.replace(/^Calcula /,'Elige el método algebraico directo para calcular '),
    options:[correct,...labels.filter(label=>label!==correct)].map((text,i)=>({id:'answer-'+i,text,value:text,feedback:i===0?'Ese método transforma la indeterminación.':'Mira la estructura: diferencia de cuadrados, grados, raíz o resta de fracciones.'})),
    answer:correct,explanation:correct+'. '+q.explanation};
}
export function makeRound(seed,index,boss=false) {
  // Mezclar antes del LCG evita que semillas consecutivas elijan siempre
  // el mismo pequeño subconjunto de familias en la primera extracción.
  let mixed=(seed^Math.imul(index+1,2654435761)^(boss?1009:0))>>>0;
  mixed=Math.imul(mixed^(mixed>>>16),2246822507);
  mixed=Math.imul(mixed^(mixed>>>13),3266489909);
  const random=seededRandom((mixed^(mixed>>>16))>>>0);
  const level=index<3?1:index<6?2:index<8?3:4;
  let q;
  if(boss)q=level===4?method(random):algebra(random,[2,7,8][integer(random,0,2)]);
  else if(level===1)q=direct(random,index);
  else if(index===3||index===4)q=graphQuestion(random);
  else if(index===5)q=algebra(random,[1,3,4,5,6][integer(random,0,4)]);
  else if(level===3)q=algebra(random,[2,7,8][integer(random,0,2)]);
  else q=method(random);
  return {...q,id:'express-'+index,level,boss,round:index+1};
}

/** Estado puro de sesión: la UI no calcula puntuaciones ni decide rondas especiales. */
export class ExpressSession {
  constructor(seed) {
    this.seed=seed;this.index=0;this.score=0;this.correct=0;this.firstTry=0;
    this.streak=0;this.bestStreak=0;this.bossPending=false;this.completed=false;
    this.levels=Array.from({length:4},()=>({total:0,correct:0}));
    this.startRound();
  }
  startRound() {
    this.question=makeRound(this.seed,this.index,this.bossPending);
    this.bossPending=false;this.attempts=0;this.hintUsed=false;this.done=false;
  }
  hint() { if(!this.done)this.hintUsed=true; }
  answer(id) {
    if(this.done)return {status:'ignored'};
    const option=this.question.options.find(o=>o.id===id);
    if(!option)return {status:'blank'};
    this.attempts++;
    const correct=id===this.question.correct;
    if(correct||this.attempts===2){this.finish(correct);return {status:'done',correct,option};}
    return {status:'retry',correct:false,option};
  }
  finish(correct) {
    if(this.done)return;
    this.done=true;
    this.levels[this.question.level-1].total++;
    if(correct){
      this.levels[this.question.level-1].correct++;
      this.correct++;if(this.attempts===1)this.firstTry++;
      this.streak++;this.bestStreak=Math.max(this.streak,this.bestStreak);
      this.score+=this.hintUsed?50:this.attempts===1?100:60;
      if(this.correct%3===0&&this.index<9)this.bossPending=true;
    }else this.streak=0;
  }
  expire() { this.finish(false); }
  next() {
    if(!this.done||this.completed)return false;
    if(this.index===9){this.completed=true;return false;}
    this.index++;this.startRound();return true;
  }
}

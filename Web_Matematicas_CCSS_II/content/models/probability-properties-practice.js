const tex=String.raw;
const rng=seed=>{let state=seed>>>0;return()=>{state=(Math.imul(1664525,state)+1013904223)>>>0;return state/4294967296;};};
const fraction=n=>tex`\(\frac{${n}}{20}\)`;
const choices=(values,feedback)=>values.map((n,i)=>({id:'abcd'[i],text:fraction(n),feedback:i===0?feedback:'Ese resultado no respeta la propiedad o el recuento indicado.'}));
export function generateRegions(random){
 const pick=()=>2+Math.floor(random()*4);
 let intersection=pick(),onlyA=pick(),onlyB=pick();
 if(onlyA===onlyB)onlyB=onlyB===5?2:onlyB+1;
 const neither=20-intersection-onlyA-onlyB;
 return {intersection,onlyA,onlyB,neither,a:intersection+onlyA,b:intersection+onlyB,union:intersection+onlyA+onlyB};
}
export function generatePropertiesPractice(seed=1){
 const random=rng(seed);
 const complement=generateRegions(random),overlap=generateRegions(random),intersection=generateRegions(random),neither=generateRegions(random);
 const upper=5+Math.floor(random()*4),lower=1+Math.floor(random()*(upper-1));
 const disjointA=1+Math.floor(random()*4),disjointB=1+Math.floor(random()*4);
 const common={topicId:'t07',lessonId:'t07-e06',source:'Ampliación procedural de 7.6; no forma parte del banco base'};
 return [
  {...common,id:'properties-generated-1',kind:'complement',regions:complement,expected:20-complement.a,prompt:tex`En un espacio de 20 resultados equiprobables, \(P(A)=\frac{${complement.a}}{20}\). ¿Cuánto vale \(P(A^c)\)?`,options:choices([20-complement.a,19-complement.a,21-complement.a,22-complement.a],'Correcto: A y su complementario agotan el espacio.'),correct:'a',hint:'Resta P(A) de 1.',explanation:tex`\(P(A^c)=1-P(A)=1-\frac{${complement.a}}{20}=\frac{${20-complement.a}}{20}\).`},
  {...common,id:'properties-generated-2',kind:'union',regions:overlap,expected:overlap.union,prompt:tex`En 20 resultados equiprobables, \(P(A)=\frac{${overlap.a}}{20}\), \(P(B)=\frac{${overlap.b}}{20}\) y \(P(A\cap B)=\frac{${overlap.intersection}}{20}\). ¿Cuánto vale \(P(A\cup B)\)?`,options:[
   {id:'a',text:fraction(overlap.union),feedback:'Correcto: has restado el solape contado dos veces.'},
   {id:'b',text:fraction(overlap.a+overlap.b),feedback:'Has sumado la intersección dos veces.'},
   {id:'c',text:fraction(overlap.a),feedback:'Faltan los resultados exclusivos de B.'},
   {id:'d',text:fraction(overlap.b),feedback:'Faltan los resultados exclusivos de A.'}
  ],correct:'a',hint:'En una unión con solape, resta una vez la intersección.',explanation:tex`\(P(A\cup B)=\frac{${overlap.a}}{20}+\frac{${overlap.b}}{20}-\frac{${overlap.intersection}}{20}=\frac{${overlap.union}}{20}\).`},
  {...common,id:'properties-generated-3',kind:'intersection',regions:intersection,expected:intersection.intersection,prompt:tex`Sabes que \(P(A)=\frac{${intersection.a}}{20}\), \(P(B)=\frac{${intersection.b}}{20}\) y \(P(A\cup B)=\frac{${intersection.union}}{20}\). ¿Cuánto vale \(P(A\cap B)\)?`,options:choices([intersection.intersection,intersection.intersection-1,intersection.intersection+1,intersection.intersection+2],'Correcto: has despejado la intersección de la fórmula de la unión.'),correct:'a',hint:'Despeja P(A∩B) en la fórmula de la unión general.',explanation:tex`\(P(A\cap B)=P(A)+P(B)-P(A\cup B)=\frac{${intersection.a}+${intersection.b}-${intersection.union}}{20}=\frac{${intersection.intersection}}{20}\).`},
  {...common,id:'properties-generated-4',kind:'neither',regions:neither,expected:neither.neither,prompt:tex`Si \(P(A\cup B)=\frac{${neither.union}}{20}\), ¿cuánto vale la probabilidad de que no ocurra ni A ni B?`,options:choices([neither.neither,neither.neither-1,neither.neither+1,neither.neither+2],'Correcto: «ninguno» es el contrario de la unión.'),correct:'a',hint:'«Ni A ni B» es el complementario de «A o B».',explanation:tex`\(P((A\cup B)^c)=1-P(A\cup B)=1-\frac{${neither.union}}{20}=\frac{${neither.neither}}{20}\).`},
  {...common,id:'properties-generated-5',kind:'monotonicity',upper,lower,prompt:tex`Se sabe que \(A\subseteq B\) y \(P(B)=\frac{${upper}}{10}\). ¿Cuál de estas propuestas para \(P(A)\) es compatible con la inclusión?`,options:[
   {id:'a',text:tex`\(\frac{${lower}}{10}\)`,feedback:'Correcto: un suceso contenido puede tener una probabilidad menor.'},
   {id:'b',text:tex`\(\frac{${upper+1}}{10}\)`,feedback:'Un subconjunto no puede superar la probabilidad de B.'},
   {id:'c',text:tex`\(\frac{${upper+2}}{10}\)`,feedback:'También supera a P(B).'},
   {id:'d',text:tex`\(-\frac{1}{10}\)`,feedback:'La no negatividad descarta esa propuesta.'}
  ],correct:'a',hint:'Si A está dentro de B, ¿qué comparación debe cumplirse?',explanation:tex`De \(A\subseteq B\) se deduce \(P(A)\leq P(B)\). La propuesta \(\frac{${lower}}{10}\) es la única de la lista que cumple también la no negatividad.`},
  {...common,id:'properties-generated-6',kind:'incompatible',disjointA,disjointB,prompt:tex`A y B son incompatibles, con \(P(A)=\frac{${disjointA}}{10}>0\) y \(P(B)=\frac{${disjointB}}{10}>0\). ¿Son independientes?`,options:[
   {id:'a',text:'No: la intersección vale 0, pero el producto de sus probabilidades es positivo.',feedback:'Correcto: las dos condiciones no son equivalentes.'},
   {id:'b',text:'Sí: incompatibilidad e independencia significan lo mismo.',feedback:'Incompatibles no pueden coincidir; independientes no alteran su probabilidad condicional.'},
   {id:'c',text:'Sí: toda pareja con probabilidades positivas es independiente.',feedback:'Las probabilidades individuales no bastan para afirmar independencia.'},
   {id:'d',text:'No se puede decidir aunque se sabe que son incompatibles y tienen probabilidades positivas.',feedback:'Con esos datos se sabe que no cumplen la igualdad de independencia.'}
  ],correct:'a',hint:'Compara P(A∩B) con P(A)P(B).',explanation:tex`La incompatibilidad da \(P(A\cap B)=0\), mientras \(P(A)P(B)=\frac{${disjointA*disjointB}}{100}>0\). Por tanto, no son independientes.`}
 ];
}

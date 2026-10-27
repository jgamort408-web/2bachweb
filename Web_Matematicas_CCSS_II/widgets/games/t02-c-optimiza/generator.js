/** Cuatro modelos propios, cinco decisiones por historia. Sin ejecución de expresiones. */
const tex=String.raw;
const math=text=>String.raw`\(${text}\)`;
const fmt=n=>(n===0?0:n).toLocaleString('es-ES',{maximumFractionDigits:2});
export function valueAt(story,q){
 const p=story.params;
 if(story.kind==='profit')return q*(p.price-q)-(p.unitCost*q+p.fixed);
 if(story.kind==='average')return q>0?(q*q+p.fixed)/q:NaN;
 if(story.kind==='fence')return q*(p.length-2*q);
 return q*(p.price-2*q);
}
export function admissible(story,q){
 if(!Number.isFinite(q))return false;
 const p=story.params;
 if(story.kind==='average')return q>0;
 if(story.kind==='fence')return q>0&&q<p.length/2;
 return q>=0&&q<=p.capacity&&(story.kind!=='revenue'||Number.isInteger(q));
}
export function generateStories(seed){
 let state=seed>>>0;const integer=(lo,hi)=>{state=(Math.imul(1664525,state)+1013904223)>>>0;return lo+Math.floor(state/4294967296*(hi-lo+1));};
 const v=integer(6,12),c=integer(2,6),capacity=integer(0,1)?v+3:v-2,loss=integer(0,1)===1;
 const profit={kind:'profit',params:{v,price:2*v+c,unitCost:c,fixed:loss?v*v+integer(10,30):integer(10,20),capacity}};
 profit.candidates=[0,...(v<capacity?[v]:[]),capacity];profit.optimum=[Math.min(v,capacity)];profit.best=valueAt(profit,profit.optimum[0]);
 const s=integer(3,9);const average={kind:'average',params:{s,fixed:s*s},candidates:[s],optimum:[s],best:2*s};
 const r=integer(3,10);const fence={kind:'fence',params:{r,length:4*r},candidates:[r],optimum:[r],best:2*r*r};
 const n=integer(3,7);const revenue={kind:'revenue',params:{n,price:4*n+2,capacity:n+3},candidates:[0,n,n+1,n+3],optimum:[n,n+1],best:2*n*(n+1)};
 return [profit,average,fence,revenue];
}
function question(story,caseNumber,stage,context,prompt,choices,explanation,hint){
 return {id:`optimize-${caseNumber}-${stage}`,caseNumber,stage,kind:story.kind,story,
  prompt:`Historia ${caseNumber} de 4 · Paso ${stage} de 5. ${context} ${prompt}`,
  correct:'correct',options:choices.map(([text,feedback],i)=>({id:i?'wrong-'+i:'correct',text,feedback})),explanation,hint};
}
export function generateOptimizeSession(seed){
 const stories=generateStories(seed),questions=[];
 stories.forEach((s,i)=>{
  const p=s.params,number=i+1;
  const add=(stage,context,prompt,choices,explanation,hint)=>questions.push(question(s,number,stage,context,prompt,choices,explanation,hint));
  if(s.kind==='profit'){
   const B=math(tex`B(q)=-q^2+${2*p.v}q-${p.fixed}`),C=math(tex`C(q)=${p.unitCost}q+${p.fixed}`),R=math(tex`R(q)=q(${p.price}-q)`);
   const context=`Una empresa vende q toneladas divisibles a un precio ${math(tex`p(q)=${p.price}-q`)} €/t. Su coste es ${C} euros, pagado incluso si q=0, y la capacidad es ${p.capacity} t. Quiere maximizar el beneficio.`;
   const compare=s.candidates.map(q=>`B(${q})=${fmt(valueAt(s,q))} €`).join('; ');
   add(1,context,'¿Qué función objetivo corresponde?',[
    [B,'Beneficio es ingreso menos coste.'],[R,'Es ingreso; todavía debes restar el coste.'],[C,'Es coste total, no beneficio.'],[math(tex`M(q)=(${p.unitCost}q+${p.fixed})/q`),'Es coste medio, otra magnitud.']],
    `${R}; al restar ${C}, obtenemos ${B}.`, 'Construye ingreso multiplicando cantidad por precio y después resta costes.');
   add(2,context,'¿Cuál es el dominio factible?',[
    [math(tex`0\le q\le${p.capacity},\quad q\in\mathbb R`),'Se admiten cantidades divisibles dentro de la capacidad.'],[math(tex`q\ge0`),'Falta el límite de capacidad.'],[math(tex`0<q<${p.capacity}`),'Los extremos cero y capacidad sí se admiten.'],[math(tex`0\le q\le${p.capacity},\quad q\in\mathbb Z`),'Se permiten fracciones de tonelada.']],
    `El dominio es el intervalo cerrado [0,${p.capacity}]. El precio sigue siendo positivo en él. q=0 es admisible y da B(0)=−${p.fixed} €.`, 'Respeta la capacidad y distingue cantidades divisibles de enteras.');
   add(3,context,'¿Qué candidatos hay que comparar?',[
    [s.candidates.join(', ')+'.','Incluye la frontera y el estacionario solo si es admisible.'],[`${p.v}, sin comprobar la capacidad ni los extremos.`,'La raíz de B′ puede quedar fuera del dominio.'],['Solo 0.','Faltan otros candidatos admisibles.'],[`${p.price/2}, la raíz de la derivada del ingreso.`,'Estás derivando una función objetivo diferente.']],
    `${math(tex`B'(q)=${2*p.v}-2q`)} se anula en ${p.v}. ${p.v>p.capacity?'Se descarta por superar la capacidad.':'Se incluye porque pertenece al dominio.'} Comparamos ${s.candidates.join(', ')}.`, 'Deriva el beneficio, valida el punto crítico y añade los extremos incluidos.');
   add(4,context,'¿Qué decisión maximiza el beneficio?',[
    [`${s.optimum[0]} t, con ${fmt(s.best)} €.`,'Es el mayor valor entre los candidatos factibles.'],[`0 t, con −${p.fixed} €.`,'El beneficio aumenta al comenzar a producir.'],[`Producir hasta ${p.price} t porque ahí el precio es cero.`,'Supera la capacidad y precio cero no implica beneficio máximo.'],['No existe máximo porque la derivada puede no anularse dentro.','Una función continua en un intervalo cerrado sí alcanza su máximo.']],
    `${compare}. B es una parábola cóncava; el máximo factible es ${fmt(s.best)} € en ${s.optimum[0]} t.`, 'Compara valores, no solo abscisas ni el signo de la derivada.');
   add(5,context,'¿Cómo se interpreta el resultado?',[
    [s.best<0?`El mejor resultado es una pérdida de ${fmt(-s.best)} € en ${s.optimum[0]} t.`:`El beneficio máximo es ${fmt(s.best)} € vendiendo ${s.optimum[0]} t.`,'Cantidad y beneficio son magnitudes distintas, y se conservan sus unidades.'],[`El ingreso máximo es ${fmt(s.best)} €.`,'Se ha maximizado beneficio, no ingreso.'],[`La producción óptima es ${fmt(s.best)} toneladas.`,'Confundes el valor del beneficio con la cantidad.'],['La empresa puede evitar el coste fijo eligiendo q=0.','El enunciado dice que el coste se paga incluso en q=0.']],
    s.best<0?'Máximo significa el mayor beneficio entre las opciones admitidas, aunque todas den pérdidas. Decidir cerrar y evitar costes sería otro modelo.':'La conclusión debe dar producción y beneficio, con unidades. El modelo no justifica afirmar que todo ingreso sea beneficio.', 'Un máximo puede ser negativo. Lee qué costes se pagan en q=0.');
  }
  if(s.kind==='average'){
   const context=`Una producción divisible q>0 unidades tiene coste total ${math(tex`C(q)=q^2+${p.fixed}`)} euros. Se quiere minimizar el coste por unidad.`;
   const M=math(tex`M(q)=q+\frac{${p.fixed}}q`);
   add(1,context,'¿Cuál es la función objetivo?',[
    [M,'Divide el coste total entre la cantidad.'],[math(tex`C(q)=q^2+${p.fixed}`),'El coste total no es coste por unidad.'],[math(tex`C'(q)=2q`),'Es coste marginal, no coste medio.'],[math(tex`M(q)=${p.fixed}/q`),'Falta la parte q²/q.']],
    `${math(tex`M(q)=C(q)/q`)} da ${M}, en euros por unidad.`, 'Coste medio significa coste total dividido entre unidades producidas.');
   add(2,context,'¿Qué dominio tiene sentido?',[
    [math(tex`q>0`),'Se excluye cero para poder dividir y cantidades negativas.'],[math(tex`q\ge0`),'El coste medio no está definido en cero.'],[math(tex`q\ne0`),'También debes descartar producciones negativas.'],[math(tex`0<q\le${p.s}`),'El enunciado no establece esa capacidad.']],
    'El dominio es (0,+∞): no hay límite superior indicado y q=0 no permite calcular coste por unidad.', 'Une el contexto con la restricción del denominador.');
   add(3,context,'¿Qué candidato estacionario es admisible?',[
    [math(tex`q=${p.s}`),'La raíz positiva sí representa producción.'],[math(tex`q=-${p.s}`),'La raíz negativa no es admisible.'],[math(tex`q=\pm${p.s}`),'Solo una de las dos raíces pertenece al dominio.'],[math(tex`q=0`),'Está excluido y no anula la derivada.']],
    `${math(tex`M'(q)=1-\frac{${p.fixed}}{q^2}=0`)} da ${math(tex`q=\pm${p.s}`)}; se conserva únicamente q=${p.s}.`, 'Resolver una ecuación no basta: filtra las soluciones por el dominio.');
   add(4,context,'¿Qué justifica el mínimo absoluto?',[
    [`M decrece hasta ${p.s}, crece después y M(${p.s})=${s.best} €/unidad.`,'El cambio de signo de la derivada prueba el mínimo en todo el dominio.'],[`M crece hasta ${p.s} y decrece después.`,'Es el cambio de signo de un máximo, no el de este modelo.'],['El mínimo ocurre en cero porque el coste total es menor allí.','No puedes evaluar el coste medio en cero.'],['No hay mínimo porque el dominio es abierto.','Un dominio abierto no garantiza extremos, pero puede contenerlos.']],
    `M′<0 en (0,${p.s}) y M′>0 después. Además, M tiende a +∞ cuando q→0⁺ y q→+∞. Por tanto el mínimo se alcanza en ${p.s}.`, 'Estudia el signo de 1−F/q² antes y después de la raíz positiva.');
   add(5,context,'¿Cuál es la conclusión con unidades correctas?',[
    [`Producir ${p.s} unidades minimiza el coste medio a ${s.best} €/unidad; el total es ${2*p.fixed} €.`,'Son tres magnitudes: cantidad, coste por unidad y coste total.'],[`El coste total mínimo es ${s.best} €.`,'Ese número es coste medio, no total.'],[`Se deben producir ${s.best} unidades para pagar ${p.s} €.`,'Has intercambiado cantidad y coste medio.'],[`Cada unidad cuesta ${2*p.fixed} €.`,'Ese es el coste total de la producción óptima, no el unitario.']],
    `${math(tex`C(${p.s})=${2*p.fixed}`)} euros; al dividir por ${p.s} unidades se obtienen ${s.best} €/unidad.`, 'Multiplica coste por unidad por cantidad para recuperar el total.');
  }
  if(s.kind==='fence'){
   const context=`Dispones de ${p.length} m de valla para cerrar tres lados de un rectángulo junto a una pared. x mide cada lado perpendicular e y el lado paralelo vallado; ambos deben ser positivos. Se quiere maximizar el área.`;
   add(1,context,'¿Qué función de x hay que maximizar?',[
    [math(tex`A(x)=x(${p.length}-2x)`),'La restricción 2x+y=L da y=L−2x.'],[math(tex`A(x)=x(${p.length}-x)`),'Olvidas el segundo lado perpendicular.'],[math(tex`A(x)=2x+${p.length}`),'Una suma de longitudes no calcula el área.'],[math(tex`A(x)=${p.length}-2x`),'Es la longitud y, no el área.']],
    `${math(tex`2x+y=${p.length}`)} implica ${math(tex`y=${p.length}-2x`)}. Multiplicar x por y da la función objetivo.`, 'Primero elimina una variable con la longitud total disponible.');
   add(2,context,'¿Cuál es el dominio geométrico?',[
    [math(tex`0<x<${p.length/2}`),'Las dos dimensiones deben ser positivas.'],[math(tex`0\le x\le${p.length/2}`),'Los extremos producen rectángulos degenerados.'],[math(tex`0<x<${p.length}`),'Para x grande, y sería negativa.'],[math(tex`x>0`),'Falta exigir y>0.']],
    `x>0 y ${p.length}−2x>0 dan el intervalo (0,${p.length/2}). Los extremos no son recintos válidos.`, 'No basta con x>0; también debe ser positiva la otra dimensión.');
   add(3,context,'¿Qué punto crítico es admisible?',[
    [math(tex`x=${p.r}`),'Resuelve L−4x=0 y queda dentro del dominio.'],[math(tex`x=${p.length/2}`),'En ese extremo y=0, y no es un punto crítico admisible.'],[math(tex`x=${p.length}`),'Supera el límite geométrico.'],[math(tex`x=0`),'Está excluido y no anula la derivada.']],
    `${math(tex`A'(x)=${p.length}-4x=0`)} da x=${p.r}. Entonces y=${2*p.r}>0.`, 'Deriva el área después de sustituir la restricción.');
   add(4,context,'¿Qué valor máximo se alcanza?',[
    [`${s.best} m², para x=${p.r} m.`,'La parábola es cóncava y el vértice está dentro del dominio.'],[`0 m², para x=0.`,'No es un recinto válido ni el área máxima.'],['No hay máximo porque el intervalo es abierto.','El punto de máximo está dentro del intervalo.'],[`${p.length*p.length} m².`,'No cumple la restricción de los tres lados.']],
    `A′ cambia de positiva a negativa en ${p.r}. A(${p.r})=${s.best} m². Al acercarse a los extremos, el área tiende a 0 sin alcanzarlo.`, 'Distingue máximo interior de valores límite excluidos.');
   add(5,context,'¿Qué dimensiones y conclusión son correctas?',[
    [`Dos lados de ${p.r} m y uno de ${2*p.r} m; área máxima ${s.best} m². No hay área mínima positiva.`,'Se usa toda la valla y se distingue máximo de ínfimo no alcanzado.'],[`Cuatro lados de ${p.r} m, todos vallados.`,'La pared forma un lado y la restricción es de tres lados.'],[`Dos lados de ${2*p.r} m y uno de ${p.r} m.`,'Esa configuración requiere más valla de la disponible.'],['El mínimo es 0 m² y se alcanza en un rectángulo permitido.','Las dimensiones cero están excluidas.']],
    `${p.r}+${p.r}+${2*p.r}=${p.length} m y ${p.r}·${2*p.r}=${s.best} m². Las áreas positivas pueden acercarse a cero, pero no existe un recinto admisible de área cero.`, 'Verifica suma de los tres lados y producto de las dos dimensiones.');
  }
  if(s.kind==='revenue'){
   const context=`Un puesto vende q paquetes enteros, entre 0 y ${p.capacity}, todos al mismo precio ${math(tex`p(q)=${p.price}-2q`)} euros por paquete. Quiere maximizar el ingreso. No se conocen sus costes.`;
   const R=math(tex`R(q)=${p.price}q-2q^2`);
   add(1,context,'¿Qué objetivo puedes calcular?',[
    [R,'Ingreso es cantidad por precio.'],[math(tex`R(q)=${p.price}-2q`),'Es precio unitario, no ingreso total.'],[math(tex`B(q)=${p.price}q-2q^2`),'Sin datos de costes no puedes llamarlo beneficio.'],[math(tex`R(q)=${p.price}q`),'El precio varía con la cantidad.']],
    `${math(tex`R(q)=q\,p(q)`)} produce ${R}. Los costes no están dados, por lo que no se optimiza beneficio.`, 'Distingue precio, ingreso y beneficio.');
   add(2,context,'¿Qué cantidades son admisibles?',[
    [math(tex`q\in\{0,1,\ldots,${p.capacity}\}`),'Son paquetes enteros dentro de la capacidad.'],[math(tex`q\in[0,${p.capacity}]`),'Ese intervalo admite fracciones de paquete.'],[math(tex`q\in\mathbb Z`),'Faltan las restricciones de signo y capacidad.'],[math(tex`0<q<${p.capacity}`),'Elimina extremos admitidos y permite fracciones.']],
    `El dominio es discreto: enteros de 0 a ${p.capacity}. El precio mínimo es p(${p.capacity})=${p.price-2*p.capacity} €/paquete, positivo.`, 'La palabra «enteros» forma parte del dominio.');
   add(3,context,'¿Qué cantidades comparas para buscar el máximo entero?',[
    [`0, ${p.n}, ${p.n+1} y ${p.capacity}.`,'Incluye los enteros vecinos del vértice y la frontera.'],[`${p.n+.5}, sin más comprobaciones.`,'El vértice continuo no es una cantidad de paquetes permitida.'],[`Solo ${p.n+1}, redondeando siempre hacia arriba.`,'Debes comparar los dos vecinos; puede haber empate.'],[`Solo 0 y ${p.capacity}.`,'La cantidad óptima puede estar en el interior.']],
    `${math(tex`R'(q)=${p.price}-4q=0`)} da q=${fmt(p.n+.5)}. La parábola es cóncava: basta comparar los vecinos enteros admisibles ${p.n} y ${p.n+1}, además de las fronteras.`, 'Usa la derivada como guía de la extensión continua y vuelve al dominio entero.');
   add(4,context,'¿Qué máximo admite el problema?',[
    [`${s.best} €, tanto con ${p.n} como con ${p.n+1} paquetes.`,'Ambas cantidades enteras dan el mismo ingreso máximo.'],[`${fmt(s.best+.5)} €, con ${fmt(p.n+.5)} paquetes.`,'Es el máximo de la extensión continua, no del dominio entero.'],[`${valueAt(s,p.capacity)} €, con ${p.capacity} paquetes.`,'El ingreso ya ha descendido tras el vértice.'],['0 €, sin vender paquetes.','Es menor que el ingreso de las cantidades interiores.']],
    s.candidates.map(q=>`R(${q})=${valueAt(s,q)} €`).join('; ')+'. Los vecinos del vértice empatan.', 'Evalúa la función original en los dos enteros vecinos.');
   add(5,context,'¿Qué puedes afirmar sin añadir supuestos?',[
    [`${p.n} y ${p.n+1} paquetes son dos decisiones óptimas de ingreso; no se puede deducir el beneficio.`,'La respuesta respeta el empate y la información disponible.'],[`${p.n+1} paquetes es la única decisión óptima.`,'Hay otra cantidad con el mismo ingreso.'],[`El beneficio máximo es ${s.best} €.`,'Faltan los costes.'],[`Se deben vender ${fmt(p.n+.5)} paquetes.`,'El dominio exige cantidades enteras.']],
    `El ingreso óptimo es ${s.best} € en dos cantidades distintas. El precio por paquete cambia entre ellas y el enunciado no permite comparar sus beneficios sin conocer costes.`, 'No inventes costes ni elimines un empate real.');
  }
 });return questions;
}

const tex=String.raw;
export const matrixTex=a=>tex`\begin{pmatrix}${a.map(r=>r.join('&')).join('\\\\')}\end{pmatrix}`;
const system=(a,b)=>tex`A=${matrixTex(a)},\quad B=${matrixTex(b.map(x=>[x]))},\quad AX=B`;
const option=(id,text,valid,feedback,recommended=false)=>({id,text,valid,feedback,recommended});
/** Six bounded families; alternatives are judged for validity, not route matching. */
export function generateMethods(seed=1){
 if(!Number.isInteger(seed)||seed<0||seed>0xffffffff)throw new RangeError('Semilla entera de 32 bits.');
 let value=seed;const rnd=()=>{value=(Math.imul(value,1664525)+1013904223)>>>0;return value/2**32;};
 const integer=()=>Math.floor(rnd()*7)-3,nonzero=()=>{let n;do{n=integer();}while(!n);return n;};
 const k=nonzero(),u=integer(),v=integer(),w=integer(),z=integer(),c=integer(),d=integer();
 const records=[];
 function add(id,title,a,b,hint,options,explanation,proof,extra={}){
  for(let i=options.length-1;i>0;i--){const j=Math.floor(rnd()*(i+1));[options[i],options[j]]=[options[j],options[i]];}
  records.push({id,index:records.length,title,a,b,statement:system(a,b),hint,options,explanation,proof,...extra});
 }
 const gauss=()=>option('gauss','Gauss: operar sobre las filas de la ampliada y terminar por sustitución.',true,'Gauss es válido. Trabaja también con B y conserva el conjunto solución.');
 add('small','Un sistema 2 × 2',[[1,k],[1,k+1]],[u+k*v,u+(k+1)*v],
 'Comprueba si A es cuadrada y si su determinante es distinto de cero.',
 [option('cramer','Cramer: comprobar el determinante y sustituir cada columna por B.',true,'El determinante es 1; Cramer es directo en este orden.',true),gauss(),
 option('zero','Descartar Cramer: un coeficiente negativo hace singular la matriz.',false,'El signo de una entrada no decide la invertibilidad: se calcula el determinante.'),
 option('transpose','Usar la traspuesta de A como inversa sin comprobarla.',false,'La traspuesta no es, en general, la inversa. Habría que comprobar que su producto con A es la identidad.')],
 'Cramer resulta cómodo con determinantes de orden 2. Gauss también resuelve el sistema y recibe los mismos puntos.',
 tex`\(\det A=${k+1}- (${k})=1\). Restar la primera ecuación de la segunda da \(y=${v}\), y después \(x=${u}\).`,
 {solution:[u,v],det:1});
 const upper=[[1,k,0,1],[0,2,1,0],[0,0,1,k],[0,0,0,3]],lower=[[1,0,0,0],[1,1,0,0],[0,1,1,0],[1,0,1,1]];
 const a=lower.map(row=>upper[0].map((_,j)=>row.reduce((s,x,i)=>s+x*upper[i][j],0))),x=[u,v,w,z],b=a.map(row=>row.reduce((s,n,j)=>s+n*x[j],0));
 const g=gauss();g.recommended=true;
 add('large','Cuatro incógnitas',a,b,'Compara eliminar entradas con desarrollar cinco determinantes de orden 4.',
 [g,option('cramer','Cramer: es válido si el determinante no es cero, aunque requiere más cálculos.',true,'Es válido: el determinante vale 6. Para las cuatro incógnitas se calculan cuatro determinantes sustituidos y el de A.'),
 option('sarrus','Aplicar directamente la regla de Sarrus al determinante 4 × 4.',false,'La regla de Sarrus se aplica a determinantes de orden 3, no de orden 4.'),
 option('three','Gauss solo se puede usar hasta tres incógnitas.',false,'El método de Gauss no tiene ese límite matemático.')],
 'Gauss aprovecha operaciones sencillas y evita calcular cinco determinantes de orden 4. Cramer sigue siendo una alternativa válida.',
 tex`Aplicando \(F_4\leftarrow F_4-F_1\), \(F_2\leftarrow F_2-F_1\), \(F_3\leftarrow F_3-F_2\) y \(F_4\leftarrow F_4-F_3\), se obtiene \(U=${matrixTex(upper)}\). El determinante es \(1\cdot2\cdot1\cdot3=6\). Por sustitución: \(X=${matrixTex(x.map(t=>[t]))}\). Sustituir en las cuatro ecuaciones recupera B.`,
 {solution:x,det:6,upper});
 const inverse=[[1,-k],[0,1]];
 add('inverse','La inversa ya está dada',[[1,k],[0,1]],[u+k*v,v],'La inversa actúa multiplicando por la izquierda a AX=B.',
 [option('inverse','Usar X = A⁻¹B con la inversa proporcionada.',true,'Se aprovecha un cálculo que ya está hecho; basta multiplicar A⁻¹ por B.',true),gauss(),
 option('right','Usar X = BA⁻¹ cambiando el orden de los factores.',false,'B es una columna 2 × 1: el producto BA⁻¹ no está definido. El orden correcto es A⁻¹B.'),
 option('divide','Dividir cada entrada de B por la entrada correspondiente de A.',false,'La división casilla a casilla no resuelve AX=B; las incógnitas están combinadas en cada fila.')],
 'La inversa dada hace más corto el cálculo X=A⁻¹B. Gauss también es válido, aunque repite parte del trabajo.',
 tex`\(AA^{-1}=I\). Multiplicando: \(X=${matrixTex(inverse)}${matrixTex([[u+k*v],[v]])}=${matrixTex([[u],[v]])}\).`,
 {inverse,solution:[u,v],det:1,extra:tex`Se proporciona \[A^{-1}=${matrixTex(inverse)}.\]`});
 add('homogeneous','Homogéneo con filas dependientes',[[1,k,1],[2,2*k,2],[0,0,0]],[0,0,0],
 'El vector cero siempre resuelve un sistema homogéneo. Comprueba si es la única solución.',
 [option('gauss','Gauss: reducir las filas y expresar las variables libres con parámetros.',true,'Solo queda una ecuación independiente con tres incógnitas: hay dos parámetros libres.',true),
 option('cramer','Cramer: dividir entre el determinante cero para obtener la solución.',false,'No se puede dividir entre cero. La regla de Cramer requiere determinante distinto de cero.'),
 option('zero','Como B = 0, la solución cero es necesariamente la única.',false,'Siempre existe la solución cero, pero aquí el rango es menor que el número de incógnitas.'),
 option('none','Como A es singular, el sistema homogéneo no tiene solución.',false,'Todo sistema homogéneo tiene al menos la solución cero.')],
 'Gauss permite hallar toda la familia. La singularidad impide usar A⁻¹ y Cramer; no impide resolver el sistema.',
 tex`\(\operatorname{rg}A=\operatorname{rg}(A|B)=1<3\). SCI: \((x,y,z)=(- (${k})s-t,s,t)\), con \(s,t\in\mathbb R\). Ambas primeras ecuaciones se anulan para todos s y t; la tercera es \(0=0\).`,
 {family:[[0,-k,-1],[0,1,0],[0,0,1]],rank:1});
 add('parameter','Un parámetro que puede anular el pivote',[[1,1],[1,1]],[u,u+d],
 'Antes de dividir entre una expresión con parámetro, separa el caso en que vale cero.',
 [option('gauss','Gauss: restar filas y separar a = c de a ≠ c antes de dividir.',true,'La segunda fila queda (a−c)y=d; el caso a=c necesita estudiarse aparte.',true),
 option('always','Dividir siempre entre a−c sin separar ningún valor.',false,'Esa división pierde el caso a=c, precisamente donde cambia la clasificación.'),
 option('singular','Si a = c, afirmar SI solo porque el determinante vale cero.',false,'Determinante cero no distingue SCI de SI: hay que revisar también B.'),
 option('homogeneous','Tratar todo sistema con parámetro como si fuera homogéneo.',false,'Tener un parámetro en A no significa que todos los términos independientes sean cero.')],
 'Primero se discute el valor crítico. En el caso regular también se puede usar Cramer o inversa, una vez comprobada su condición.',
 tex`Al restar: \((a-(${c}))y=${d}\). Si \(a\ne ${c}\): SCD, \(y=\frac{${d}}{a-(${c})}\), \(x=${u}-y\). Si \(a=${c}\): ${d===0?tex`queda \(0=0\), SCI con \((x,y)=(${u}-t,t)\).`:tex`queda \(0=${d}\), SI. No hay soluciones.`}`,
 {parameter:{critical:c,u,d},statement:tex`\begin{cases}x+y=${u}\\x+\bigl(1+a-(${c})\bigr)y=${u+d}\end{cases}`,extra:tex`En las opciones, \(c=${c}\) y \(d=${d}\). Estudia todos los valores reales de a.`});
 add('rectangular','Dos ecuaciones y tres incógnitas',[[1,0,k],[0,1,1]],[u,v],
 'A tiene dos filas y tres columnas. Distingue inversa ordinaria, determinante y eliminación.',
 [option('gauss','Gauss: identificar pivotes y dejar una incógnita libre.',true,'Hay dos pivotes y tres incógnitas; el sistema es compatible con un parámetro libre.',true),
 option('inverse','Calcular la inversa ordinaria de esta A rectangular.',false,'La inversa ordinaria A⁻¹ requiere una matriz cuadrada invertible.'),
 option('cramer','Calcular el determinante de A y aplicar Cramer directamente.',false,'El determinante y la regla de Cramer ordinaria requieren una matriz cuadrada.'),
 option('none','Como faltan ecuaciones, afirmar que no existe solución.',false,'Menos ecuaciones que incógnitas no implica incompatibilidad. En este caso hay infinitas soluciones.')],
 'Gauss se aplica a matrices rectangulares. No hay que inventar una tercera ecuación.',
 tex`\(\operatorname{rg}A=\operatorname{rg}(A|B)=2<3\). SCI: \((x,y,z)=(${u}-(${k})t,${v}-t,t)\), \(t\in\mathbb R\). Al sustituir, las dos filas devuelven \(${u}\) y \(${v}\).`,
 {family:[[u,-k],[v,-1],[0,1]],rank:2});
 return records;
}
export const createMethodState=()=>({index:0,phase:'answer',attempts:0,score:0,results:[],hints:[]});
export function hintMethod(s){return s.phase!=='answer'||s.hints.includes(s.index)?s:{...s,hints:[...s.hints,s.index]};}
export function answerMethod(s,c,id){
 const o=c.options.find(o=>o.id===id);
 if(s.phase!=='answer'||c.index!==s.index||!o)return {ignored:true,state:s};
 const attempts=s.attempts+1,done=o.valid||attempts===2,points=done&&o.valid?(attempts===1?100:50):0;
 const result={id:c.id,selected:id,correct:o.valid,attempts,points};
 return {correct:o.valid,done,points,feedback:o.feedback,state:{...s,attempts,phase:done?'resolved':'answer',score:s.score+points,results:done?[...s.results,result]:s.results}};
}
export function advanceMethod(s){
 if(s.phase!=='resolved')return s;
 return {...s,index:s.index===5?5:s.index+1,attempts:0,phase:s.index===5?'summary':'answer'};
}

const tex=String.raw;
const q=(n,prompt,choices,explanation,hint,source='Elaboración propia; guion 5.2')=>({id:'system-solution-'+n,topicId:'t05',lessonId:'t05-e02',prompt,correct:'correct',options:choices.map(([text,feedback],i)=>({id:i?'wrong-'+i:'correct',text,feedback})),explanation,hint,source});
export const solutionQuestions=[
 q('01',tex`¿Cuál es el conjunto solución de \(\begin{cases}x+y=5\\x-y=1\end{cases}\)?`,[
 [tex`\(S=\{(3,2)\}\)`,'3+2=5 y 3−2=1. Al sumar las ecuaciones se fija x=3.'],
 [tex`\(S=\{(2,3)\}\)`,'La diferencia 2−3 no es 1.'],
 [tex`\(S=\{(0,5),(5,0)\}\)`,'Esos puntos pertenecen a la primera recta, pero no a la segunda.'],
 [tex`\(S=\varnothing\)`,'Hay un punto común: (3,2).']],
 'Sumando las ecuaciones, 2x=6. Por tanto x=3 y y=2. Las dos rectas se cortan únicamente en ese punto.','Una solución debe pertenecer a las dos rectas.'),
 q('02','Si dos ecuaciones representan la misma recta, ¿cuántas soluciones comunes tienen?',[
 ['Infinitas: todos los puntos de esa recta.','La coincidencia no se limita a los puntos que aparecen dibujados.'],
 ['Dos: una por cada ecuación.','Las ecuaciones no cuentan soluciones; imponen condiciones.'],
 ['Una: el origen necesariamente.','La recta ni siquiera tiene que pasar por el origen.'],
 ['Ninguna: no se cruzan en un punto aislado.','Coinciden en todos sus puntos.']],
 'Las rectas coincidentes comparten todos sus puntos. El conjunto solución es una recta completa, no todo el plano.','Piensa si un punto de una recta también pertenece a la otra.','Adaptación conceptual de T5.10 y tarjeta local 3; guion 5.2'),
 q('03',tex`En \(\begin{cases}x+y=5\\2x+2y=12\end{cases}\), ¿qué conclusión es correcta?`,[
 ['No hay solución: la segunda exige x+y=6.','No se puede tener la misma suma igual a 5 y a 6.'],
 ['Infinitas soluciones porque los coeficientes son proporcionales.','El término independiente no guarda la misma proporción.'],
 ['La solución es (5,6).','Esa pareja no cumple ninguna de las dos igualdades.'],
 ['Hay dos soluciones, una en cada recta.','Buscamos puntos comunes, no puntos separados.']],
 'Restar dos veces la primera ecuación a la segunda da 0=2, una contradicción. Son paralelas distintas.','Compara también los términos independientes.','Elaboración propia; conexión con T5.2 y guion 5.2'),
 q('04',tex`Para \(\begin{cases}2x+y=1\\x-y=0\end{cases}\), ¿es exactamente solución (0,333; 0,333)?`,[
 [tex`No; la solución exacta es \((1/3,1/3)\).`,'2·0,333+0,333=0,999, que no es 1.'],
 ['Sí, porque está suficientemente cerca en la gráfica.','La igualdad exacta no se comprueba por proximidad visual.'],
 ['Sí, porque cumple la segunda ecuación.','La primera también debe cumplirse.'],
 ['No existe solución porque aparece una fracción.','Las soluciones reales pueden ser fraccionarias.']],
 tex`De x=y resulta \(3x=1\), luego \(x=y=1/3\). La pareja redondeada es una aproximación, no la solución exacta.`,'Sustituye el decimal escrito en ambas ecuaciones.'),
 q('05','En la ventana visible no se aprecia ningún cruce. ¿Basta para afirmar que el sistema no tiene solución?',[
 ['No: el punto común puede estar fuera de la ventana.','Hay que ampliar o justificar algebraicamente.'],
 ['Sí: si no se ve, no existe.','La pantalla muestra solo una parte del plano.'],
 ['Sí, salvo cuando una recta es vertical.','También dos rectas oblicuas pueden cortarse fuera.'],
 ['No: siempre hay infinitas soluciones.','El número de soluciones depende de las ecuaciones.']],
 'El dibujo es una ayuda. En x−y=0 y 8x−9y=18, el punto común es (−18,−18), fuera de una ventana de −6 a 6.','Distingue el plano completo de la zona dibujada.'),
 q('06',tex`¿Cómo se describe todo el conjunto solución de \(\begin{cases}x=2\\3x=6\end{cases}\)?`,[
 [tex`\(S=\{(2,t):t\in\mathbb{R}\}\)`,'x queda fijada y y puede ser cualquier real.'],
 [tex`\(S=\{(t,2):t\in\mathbb{R}\}\)`,'Has intercambiado la coordenada fija y la libre.'],
 [tex`\(S=\{(2,0)\}\)`,'(2,0) es un ejemplo, no la familia completa.'],
 [tex`\(S=\mathbb{R}^2\)`,'Los puntos con x distinto de 2 no cumplen las ecuaciones.']],
 'Ambas ecuaciones describen la misma recta vertical x=2. La ausencia de y no obliga a y=0.','Prueba dos valores distintos de y manteniendo x=2.')
];
export const solutionCards=[
 {id:'fc-system-solution-01',front:'¿Cómo se interpreta una solución en el plano?',back:'Como un punto cuyas coordenadas satisfacen las dos ecuaciones: pertenece a ambas rectas. Resolver el sistema es encontrar todos los puntos comunes.'},
 {id:'fc-system-solution-02',front:'¿Qué significa que dos rectas sean secantes?',back:'Se cortan en un único punto. Sus coordenadas son la única solución del sistema.'},
 {id:'fc-system-solution-03',front:'¿Qué diferencia hay entre paralelas distintas y coincidentes?',back:'Las paralelas distintas no comparten puntos: no hay solución. Las coincidentes comparten toda una recta: infinitas soluciones. No basta comparar solo los coeficientes; cuentan los términos independientes.'},
 {id:'fc-system-solution-04',front:'¿Cómo se escribe una familia de soluciones?',back:tex`Con un parámetro real. Para \(x+y=5\), \(S=\{(t,5-t):t\in\mathbb{R}\}\). El parámetro no está limitado a enteros ni a los puntos de la pantalla.`},
 {id:'fc-system-solution-05',front:'¿Comprobar un punto equivale a resolver un sistema?',back:'No. Comprobar decide si ese punto es solución. Resolver exige describir todas las soluciones, o justificar que no existen.'},
 {id:'fc-system-solution-06',front:'¿Por qué una gráfica o un decimal aproximado no bastan?',back:'La intersección puede estar fuera de la ventana y el redondeo puede romper una igualdad exacta. Conserva fracciones cuando corresponda y verifica las ecuaciones originales.'}
].map(c=>({...c,topicId:'t05',lessonId:'t05-e02'}));

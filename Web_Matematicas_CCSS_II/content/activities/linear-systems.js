const tex=String.raw;
const q=(n,prompt,choices,explanation,hint)=>({id:'linear-system-'+n,topicId:'t05',lessonId:'t05-e01',prompt,correct:'correct',options:choices.map(([text,feedback],i)=>({id:i?'wrong-'+i:'correct',text,feedback})),explanation,hint,source:'Elaboración propia a partir del guion 5.1; tarjeta local de sistema lineal'});
export const systemQuestions=[
 q('01','¿Cuál de estas ecuaciones es lineal en x e y?',[
 [tex`\(2x-3y=5\)`,'Las incógnitas aparecen en primer grado, multiplicadas por constantes.'],
 [tex`\(xy=5\)`,'El producto de incógnitas no es un término lineal.'],
 [tex`\(x^2+y=5\)`,'x aparece elevada al cuadrado.'],
 [tex`\(\frac1x+y=5\)`,'Una incógnita aparece en el denominador.']],
 'Una ecuación lineal se puede escribir ax+by=c con coeficientes constantes. No contiene productos de incógnitas, potencias distintas de uno ni incógnitas en denominadores.','Revisa cómo aparece cada incógnita, no solo cuántas hay.'),
 q('02',tex`Al ordenar \(3x+2=7-y\) como \(ax+by=c\), ¿qué valores tienen a, b y c?`,[
 ['a=3, b=1, c=5.','Sumar y y restar 2 en ambos lados da 3x+y=5.'],
 ['a=3, b=−1, c=5.','Al llevar −y a la izquierda cambia de signo.'],
 ['a=3, b=1, c=9.','El 2 debe restarse en ambos lados.'],
 ['a=3, b=2, c=7.','El 2 es un término constante, no el coeficiente de y.']],
 tex`\(3x+2=7-y\Longleftrightarrow3x+y=5\). Se identifican los elementos después de ordenar.`,'Realiza la misma operación en ambos miembros de la igualdad.'),
 q('03',tex`En el orden x, y, z, ¿cuáles son los coeficientes de \(2x-z=4\)?`,[
 ['(2, 0, −1).','La y está ausente y delante de z hay un −1 implícito.'],
 ['(2, −1, 0).','Has cambiado el orden y, z.'],
 ['(2, 0, 1).','El signo negativo forma parte del coeficiente.'],
 ['(2, −1, 4).','El 4 es término independiente, no coeficiente de z.']],
 tex`La forma completa es \(2x+0y-z=4\). Sus coeficientes son 2, 0 y −1; el término independiente es 4.`,'Escribe también la incógnita que falta con coeficiente cero.'),
 q('04',tex`¿Es \((x,y)=(2,1)\) solución de \(\begin{cases}x+y=3\\2x-y=0\end{cases}\)?`,[
 ['No: cumple la primera, pero no la segunda.','2+1=3, mientras que 2·2−1=3≠0.'],
 ['Sí, porque cumple x+y=3.','Una solución debe cumplir todas las ecuaciones.'],
 ['Sí, porque hay dos valores y dos ecuaciones.','La cantidad de datos no comprueba las igualdades.'],
 ['No: no cumple ninguna.','La primera sí se cumple.']],
 'Sustituimos la misma pareja en ambas ecuaciones. La primera da 3=3 y la segunda 3=0, que es falsa. La pareja no es solución del sistema.','No cambies los valores de una ecuación a otra.'),
 q('05',tex`¿Cuántas ecuaciones e incógnitas tiene \(\begin{cases}x+y+z=6\\2x+y=5\end{cases}\)?`,[
 ['Dos ecuaciones y tres incógnitas.','Las incógnitas del sistema son x, y, z, aunque z no aparezca en la segunda ecuación.'],
 ['Tres ecuaciones y dos incógnitas.','Has intercambiado los recuentos.'],
 ['Dos ecuaciones y dos incógnitas.','z también pertenece al sistema.'],
 ['No es un sistema porque los números no coinciden.','Un sistema no tiene que ser cuadrado.']],
 'El número de ecuaciones y el de incógnitas pueden ser distintos. En esta lección solo se identifican y se comprueban valores; contar no basta para clasificar las soluciones.','Cuenta las igualdades y después las incógnitas distintas.'),
 q('06','Se venden 10 entradas: normales a 8 € y reducidas a 5 €, recaudando 65 €. Si x e y son sus cantidades respectivas, ¿qué sistema modeliza los datos?',[
 [tex`\(\begin{cases}x+y=10\\8x+5y=65\end{cases}\)`,'La primera igualdad cuenta entradas; la segunda, euros.'],
 [tex`\(\begin{cases}x+y=65\\8x+5y=10\end{cases}\)`,'Has intercambiado cantidades y euros.'],
 [tex`\(\begin{cases}x+y=10\\5x+8y=65\end{cases}\)`,'x representa entradas normales, cuyo precio es 8 €.'],
 [tex`\(\begin{cases}xy=10\\8x+5y=65\end{cases}\)`,'Las cantidades de entradas se suman; no se multiplican.']],
 'El modelo se completa con x e y enteros no negativos. (5,5) satisface ambas igualdades y esas condiciones: 5+5=10 y 40+25=65.','Conserva el significado y las unidades de cada incógnita.')
];
export const systemCards=[
 {id:'fc-linear-system-01',front:'¿Qué forma tiene una ecuación lineal?',back:tex`\(a_1x_1+\cdots+a_nx_n=b\), con coeficientes y término independiente constantes respecto de las incógnitas. No hay productos de incógnitas, cuadrados ni incógnitas en denominadores.`},
 {id:'fc-linear-system-02',front:'¿Qué distingue coeficiente, incógnita y término independiente?',back:tex`En \(3x-y=5\), x e y son incógnitas; 3 y −1 son coeficientes; 5 es el término independiente. El signo forma parte del coeficiente.`},
 {id:'fc-linear-system-03',front:'¿Cómo se representa una incógnita ausente?',back:tex`Con coeficiente cero, manteniendo el orden fijado. En el orden x,y,z, \(2x-z=4\) tiene coeficientes \((2,0,-1)\).`},
 {id:'fc-linear-system-04',front:'¿Qué es una solución de un sistema?',back:'Una tupla ordenada de valores que satisface simultáneamente todas las ecuaciones. Cumplir una sola ecuación no basta; se sustituyen los mismos valores en todas.'},
 {id:'fc-linear-system-05',front:'¿Deben coincidir el número de ecuaciones y de incógnitas?',back:'No. Un sistema puede tener m ecuaciones y n incógnitas con m distinto de n. Ese recuento, por sí solo, no decide cuántas soluciones hay.'},
 {id:'fc-linear-system-06',front:'¿Qué hay que indicar al modelizar un problema?',back:'Define las incógnitas con sus unidades, traduce cada relación en una ecuación y añade las restricciones del contexto. Una cantidad de entradas debe ser entera y no negativa; un precio se mide en euros.'}
].map(c=>({...c,topicId:'t05',lessonId:'t05-e01'}));

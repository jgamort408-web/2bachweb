const tex=String.raw;
const q=(n,prompt,choices,explanation,hint)=>({id:'gauss-'+n,topicId:'t05',lessonId:'t05-e08',prompt,correct:'correct',options:choices.map(([text,feedback],i)=>({id:i?'wrong-'+i:'correct',text,feedback})),explanation,hint,source:'Elaboración a partir del guion 5.8, T5.5 y tarjeta local 15 del tema 5'});
export const gaussQuestions=[
 q('01','¿Qué conserva las soluciones al escalonar una matriz ampliada?',[
 ['Aplicar operaciones elementales a las filas completas, incluida B.','Se transforman ambos miembros de cada ecuación.'],['Cambiar solo los coeficientes, dejando siempre B igual.','También hay que transformar los términos independientes.'],['Multiplicar una fila por cero.','Se puede borrar una condición.'],['Intercambiar coeficientes aislados.','Eso no es una operación elemental por filas.']],
 'Se permiten intercambios, multiplicación de una fila por un número no nulo y suma de un múltiplo de otra fila.','Recuerda las operaciones de sistemas equivalentes.'),
 q('02',tex`En \(\left(\begin{array}{cc|c}0&2&4\\1&1&3\end{array}\right)\), ¿qué primer paso permite usar la primera columna como pivote?`,[
 [tex`\(F_1\leftrightarrow F_2\).`,'Se coloca un coeficiente no nulo en la primera posición.'],['Dividir F₁ entre cero.','Dividir entre cero no está definido.'],['Declarar el sistema incompatible.','Un cero inicial no implica contradicción.'],['Borrar la primera ecuación.','La ecuación 2y=4 aporta información.']],
 'Tras intercambiar filas, x+y=3 y 2y=4 dan y=2, x=1.','Busca debajo de la posición inicial.'),
 q('03',tex`El sistema escalonado es \(x+y+z=6,\ y+z/3=4,\ z=3\). ¿Cuál es su solución?`,[
 [tex`\((x,y,z)=(0,3,3)\).`,'Primero z=3, luego y=4−1=3 y finalmente x=6−3−3=0.'],[tex`\((6,4,3)\).`,'Los términos independientes no son directamente las soluciones.'],[tex`\((1,2,3)\).`,'Esa terna no satisface y+z/3=4.'],['No tiene solución porque no está en forma reducida.','Basta la forma escalonada y la sustitución hacia atrás.']],
 'Se resuelve de abajo arriba y se sustituyen los valores ya obtenidos.','Empieza por la última ecuación.'),
 q('04',tex`Al escalonar aparece la fila \((0,\ 0,\ 0\mid 2)\). ¿Qué significa?`,[
 ['El sistema es incompatible.','Representa 0=2, imposible.'],['La variable z vale 2.','El coeficiente de z también es cero.'],['La fila se puede ignorar como 0=0.','El término independiente es no nulo.'],['Hay dos parámetros libres.','Antes de contar parámetros hay que comprobar compatibilidad.']],
 'Una fila de coeficientes nulos con término independiente distinto de cero impide cualquier solución.','Traduce la fila a una ecuación.'),
 q('05',tex`Para \(x+z=2,\ y-z=1\), ¿cuál es el conjunto solución?`,[
 [tex`\((x,y,z)=(2-t,1+t,t),\ t\in\mathbb R\).`,'z es libre y las otras variables dependen de ella.'],[tex`Solo \((2,1,0)\).`,'Es una solución particular, pero hay infinitas.'],[tex`\((2+t,1-t,t)\).`,'Se han cambiado los signos al despejar.'],['No tiene solución por tener menos ecuaciones que incógnitas.','Puede tener infinitas soluciones.']],
 'Tomamos z=t. De x+z=2 resulta x=2−t y de y−z=1 resulta y=1+t.','Da un parámetro a la columna sin pivote.'),
 q('06','¿Qué puede afirmarse si aparece una fila completamente nula al resolver un sistema?',[
 ['Esa fila no añade condiciones; hay que revisar las demás filas y contar pivotes.','Una fila nula por sí sola no clasifica el sistema.'],['Siempre es incompatible.','0=0 es una identidad.'],['Siempre hay infinitas soluciones.','Con más ecuaciones que incógnitas aún puede haber un pivote por incógnita.'],['Todas las incógnitas valen cero.','La fila nula no obliga a eso.']],
 'Por ejemplo, x=1, y=2 y 0=0 es SCD. En cambio, x+y=3 y 0=0 es SCI. Una contradicción en otra fila daría SI.','Distingue fila nula de columna sin pivote.')
];
export const gaussCards=[
 {id:'fc-gauss-01',front:'¿Qué hace el método de Gauss?',back:'Transforma la matriz ampliada en forma escalonada mediante operaciones elementales. Después clasifica el sistema y, si es compatible, resuelve de abajo arriba.'},
 {id:'fc-gauss-02',front:'¿Qué caracteriza la forma escalonada?',back:'Las filas nulas quedan abajo. El primer elemento no nulo de cada fila (pivote) está a la derecha del pivote anterior; debajo de cada pivote hay ceros. No es obligatorio que los pivotes valgan uno.'},
 {id:'fc-gauss-03',front:'¿Qué hacer si el candidato a pivote es cero?',back:'Buscar una fila inferior con entrada no nula e intercambiarlas. Si no existe, pasar a la siguiente columna sin dividir entre cero.'},
 {id:'fc-gauss-04',front:'¿Qué indica una contradicción?',back:tex`Una fila \((0,\ldots,0\mid c)\), con \(c\ne0\), representa \(0=c\). El sistema es SI; no se hace sustitución hacia atrás.`},
 {id:'fc-gauss-05',front:'¿Cómo se representan las variables libres?',back:tex`Si el sistema es compatible, cada columna de incógnita sin pivote recibe un parámetro real independiente. Hay \(n-\operatorname{rg}(A)\) parámetros. No se fijan todos a cero si se busca el conjunto completo.`},
 {id:'fc-gauss-06',front:'¿Gauss exige una matriz cuadrada o una inversa?',back:'No. Se aplica también a sistemas rectangulares y singulares. Se conserva B en todas las operaciones y se comprueba la solución o familia en las ecuaciones originales.'}
].map(c=>({...c,topicId:'t05',lessonId:'t05-e08'}));

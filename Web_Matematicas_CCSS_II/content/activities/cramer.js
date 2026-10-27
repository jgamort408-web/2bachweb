const tex=String.raw;
const q=(n,prompt,choices,explanation,hint)=>({id:'cramer-'+n,topicId:'t05',lessonId:'t05-e09',prompt,correct:'correct',options:choices.map(([text,feedback],i)=>({id:i?'wrong-'+i:'correct',text,feedback})),explanation,hint,source:'Adaptación del guion 5.9, T5.6 y tarjeta 16 del tema 5; ejemplos propios'});
export const cramerQuestions=[
 q('01','¿Cuándo se puede aplicar directamente la regla de Cramer a AX=B?',[
 ['Cuando A es cuadrada y det(A)≠0.','Hay una solución única y el denominador no es cero.'],['Siempre que B sea distinto de cero.','Eso no garantiza la invertibilidad de A.'],['Cuando det(A)=0.','No se puede dividir entre cero.'],['A cualquier sistema rectangular sin modificarlo.','La regla directa exige matriz de coeficientes cuadrada.']],
 'La regla calcula cada incógnita como un cociente de determinantes para sistemas cuadrados con determinante no nulo.','Revisa forma de A y denominador.'),
 q('02',tex`Si \(A=\begin{pmatrix}2&1\\1&2\end{pmatrix}\) y \(B=(1,0)^{\mathsf T}\), ¿cuál es \(A_y\)?`,[
 [tex`\(\begin{pmatrix}2&1\\1&0\end{pmatrix}\).`,'Se sustituye la segunda columna por B.'],[tex`\(\begin{pmatrix}1&1\\0&2\end{pmatrix}\).`,'Esta es Aₓ: sustituye la primera columna.'],[tex`\(\begin{pmatrix}1&0\\1&2\end{pmatrix}\).`,'Se ha sustituido una fila, no la columna de y.'],[tex`\(\begin{pmatrix}1&1\\0&0\end{pmatrix}\).`,'Cada matriz auxiliar parte de A; no se sustituyen ambas columnas.']],
 'La columna de x sigue siendo (2,1)ᵀ y la de y pasa a ser (1,0)ᵀ.','Asocia cada incógnita con su columna.'),
 q('03',tex`Se obtiene \(\Delta=-3,\ \Delta_x=-3,\ \Delta_y=-6\). ¿Cuál es la solución?`,[
 [tex`\((x,y)=(1,2)\).`,'Se divide cada determinante auxiliar entre Δ.'],[tex`\((x,y)=(-1,-2)\).`,'Un cociente de dos negativos es positivo.'],[tex`\((x,y)=(-3,-6)\).`,'Falta dividir entre el determinante de A.'],[tex`\((x,y)=(1,1/2)\).`,'Se ha invertido el cociente de y.']],
 'x=(−3)/(−3)=1, y=(−6)/(−3)=2. Un determinante negativo no impide aplicar Cramer.','El denominador es el mismo para todas las incógnitas.'),
 q('04',tex`Si \(\Delta=3,\ \Delta_x=2,\ \Delta_y=-1\), ¿qué solución exacta hay que comprobar?`,[
 [tex`\((2/3,-1/3)\).`,'Las fracciones conservan la igualdad exacta.'],[tex`\((3/2,-3)\).`,'Se han invertido ambos cocientes.'],[tex`\((2,-1)\).`,'Esos son los numeradores, no las coordenadas.'],['No existe solución porque no son números enteros.','Resolvemos sobre los números reales.']],
 'Cada coordenada es su determinante auxiliar dividido por 3. La comprobación debe hacerse en todas las ecuaciones originales.','Conserva las fracciones hasta terminar.'),
 q('05',tex`Si \(\Delta\ne0\) y \(\Delta_x=0\), ¿qué ocurre?`,[
 ['x=0 y el sistema sigue teniendo solución única.','Cero dividido por un número no nulo es cero.'],['Cramer no se puede aplicar.','El requisito afecta a Δ, no a todos los numeradores.'],['El sistema tiene infinitas soluciones.','Δ≠0 garantiza unicidad.'],['Es necesario calcular Δ/Δₓ.','La fórmula tiene Δ en el denominador.']],
 'No hay que exigir que todos los determinantes auxiliares sean no nulos. Si B=0 y Δ≠0, todos los numeradores son cero y la solución única es la trivial.','Distingue numerador y denominador.'),
 q('06','En un sistema 3×3, Δ y todos los determinantes auxiliares valen cero. ¿Qué conclusión es correcta?',[
 ['Cramer no se aplica; hay que estudiar rangos o usar Gauss.','Esos ceros por sí solos no distinguen SCI de SI.'],['Siempre es SCI.','x=0, 0=1, 0=0 es SI y todos esos determinantes son cero.'],['Siempre es SI.','También puede ser compatible con infinitas soluciones.'],['La solución única es (0,0,0).','0/0 no define coordenadas.']],
 'Con A=diag(1,0,0) y B=(0,1,0)ᵀ todos los determinantes son cero, pero aparece 0=1. Con la misma A y B=0 hay infinitas soluciones.','Un cociente 0/0 no sirve para resolver.')
];
export const cramerCards=[
 {id:'fc-cramer-01',front:'¿Qué condiciones exige Cramer?',back:'A cuadrada y Δ=det(A) distinto de cero. En ese caso el sistema tiene una única solución.'},
 {id:'fc-cramer-02',front:'¿Cómo se construye Aᵢ?',back:'Se parte de la matriz A original y se sustituye solo la columna de la incógnita i por B, respetando el orden de las ecuaciones. No se sustituyen filas.'},
 {id:'fc-cramer-03',front:'¿Cuál es la fórmula?',back:tex`\(x_i=\frac{\det(A_i)}{\det(A)}=\frac{\Delta_i}{\Delta}\). Todas las coordenadas comparten denominador; no se invierte el cociente.`},
 {id:'fc-cramer-04',front:'¿Qué significa un numerador cero cuando Δ≠0?',back:'La coordenada correspondiente vale cero. La solución sigue siendo única. Si B=0, todos los numeradores son cero y X=0.'},
 {id:'fc-cramer-05',front:'¿Qué hacer si Δ=0?',back:'Detener los cocientes. Usar Gauss o rangos: el sistema puede ser SCI o SI. Incluso si todos los determinantes auxiliares son cero, no se decide la compatibilidad solo con ese dato.'},
 {id:'fc-cramer-06',front:'¿Cuándo elegir Cramer y cómo comprobarlo?',back:'Es cómodo en sistemas pequeños o para una coordenada concreta si los determinantes son sencillos. Gauss es más general y suele ahorrar cálculos al aumentar el tamaño. Comprueba la solución en todas las ecuaciones originales.'}
].map(c=>({...c,topicId:'t05',lessonId:'t05-e09'}));

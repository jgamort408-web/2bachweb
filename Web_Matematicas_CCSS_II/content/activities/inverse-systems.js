const tex=String.raw;
const q=(n,prompt,choices,explanation,hint,source='Elaboración propia; guion 5.7')=>({id:'inverse-system-'+n,topicId:'t05',lessonId:'t05-e07',prompt,correct:'correct',options:choices.map(([text,feedback],i)=>({id:i?'wrong-'+i:'correct',text,feedback})),explanation,hint,source});
export const inverseSystemQuestions=[
 q('01','¿Qué condiciones permiten resolver directamente AX=B mediante X=A⁻¹B?',[
 ['A debe ser cuadrada y tener determinante distinto de cero.','Así existe la inversa ordinaria de A.'],['B debe tener todas sus entradas distintas de cero.','B puede ser la columna nula.'],['Basta que A sea cuadrada.','Una matriz cuadrada puede ser singular.'],['El determinante de A debe valer cero.','Si se anula, A no tiene inversa.']],
 'Para A cuadrada, det(A)≠0 equivale a invertibilidad y garantiza una solución única para cualquier columna B del tamaño adecuado.','Comprueba forma y determinante.','Adaptación de tarjetas locales 13–14 del tema 5'),
 q('02','¿Por qué se multiplica AX=B por A⁻¹ a la izquierda?',[
 ['Porque A⁻¹(AX)=(A⁻¹A)X=IX=X.','Se cancela A respetando el orden.'],['Porque cualquier orden del producto da el mismo resultado.','El producto de matrices no es conmutativo.'],['Porque X=BA⁻¹ por definición.','Con B columna, ese producto ni siquiera suele estar definido.'],['Porque la inversa se obtiene invirtiendo cada entrada.','La inversa no es el recíproco de cada elemento.']],
 tex`Por asociatividad, \(A^{-1}(AX)=A^{-1}B\) conduce a \(X=A^{-1}B\).`,'Conserva el orden de los factores.','Adaptación conceptual de T4.7'),
 q('03',tex`Si \(A^{-1}=\frac13\begin{pmatrix}2&-1\\-1&2\end{pmatrix}\) y \(B=\begin{pmatrix}1\\0\end{pmatrix}\), ¿cuál es X?`,[
 [tex`\(\begin{pmatrix}2/3\\-1/3\end{pmatrix}\)`,'Se multiplica cada fila de la inversa por la columna B.'],[tex`\(\begin{pmatrix}2\\-1\end{pmatrix}\)`,'Falta el factor 1/3.'],[tex`\(\begin{pmatrix}2/3\\1/3\end{pmatrix}\)`,'La segunda componente conserva el signo negativo.'],[tex`\(\begin{pmatrix}1\\0\end{pmatrix}\)`,'B es el término independiente, no necesariamente la solución.']],
 'La primera componente es (2·1−1·0)/3; la segunda, (−1·1+2·0)/3.','No olvides el factor exterior.'),
 q('04','Se obtiene det(A)=0 en un sistema cuadrado. ¿Qué puede afirmarse?',[
 ['No se puede aplicar la inversa; falta distinguir SCI de SI.','Los rangos permiten estudiar la compatibilidad.'],['El sistema no tiene solución.','Puede tener infinitas soluciones.'],['El sistema siempre tiene infinitas soluciones.','También puede ser incompatible.'],['Se sustituye A⁻¹ por la matriz nula.','Una inversa inexistente no puede reemplazarse por cero.']],
 'x+y=3 y 2x+2y=6 es SCI; si el segundo término independiente cambia a 7, es SI. En ambos casos la misma A es singular.','Distingue no poder usar un método de no existir solución.'),
 q('05',tex`Para \(2x+y=1,\ x+2y=0\), ¿cómo se comprueba la solución exacta \((2/3,-1/3)\)?`,[
 [tex`\(2(2/3)-1/3=1\) y \(2/3+2(-1/3)=0\).`,'Se satisfacen las dos ecuaciones originales.'],['Basta con que la primera ecuación se cumpla.','Todas deben cumplirse simultáneamente.'],['Basta con redondear a (0,67; −0,33) y observar el dibujo.','El redondeo no conserva necesariamente las igualdades exactas.'],['No es válida porque no tiene coordenadas enteras.','El sistema se resuelve sobre los reales.']],
 'Las fracciones exactas permiten verificar sin errores de redondeo: 4/3−1/3=1 y 2/3−2/3=0.','Sustituye ambas coordenadas en cada ecuación.'),
 q('06',tex`Se conserva \(A=\begin{pmatrix}1&1\\2&-1\end{pmatrix}\), pero B pasa a \((6,3)^{\mathsf T}\). ¿Qué se hace?`,[
 [tex`Reutilizar \(A^{-1}\) y obtener \(X=(3,3)^{\mathsf T}\).`,'A no cambia, pero hay que multiplicar por el nuevo B.'],['Conservar la solución anterior (1,2).','Esa pareja corresponde a B=(3,0)ᵀ.'],['Calcular la inversa de B.','B es una columna, no una matriz cuadrada invertible.'],['Declarar que A deja de ser invertible.','La invertibilidad depende de A, no de B.']],
 tex`\(A^{-1}=\frac13\begin{pmatrix}1&1\\2&-1\end{pmatrix}\). Al multiplicar por \((6,3)^{\mathsf T}\), resulta \((3,3)^{\mathsf T}\), y \(3+3=6,\ 6-3=3\).`,'Si A se mantiene, su inversa también.')
];
export const inverseSystemCards=[
 {id:'fc-inverse-system-01',front:'¿Cuándo se puede usar el método de la inversa?',back:'Cuando A es cuadrada e invertible, es decir, det(A)≠0. B debe ser una columna con tantas entradas como ecuaciones.'},
 {id:'fc-inverse-system-02',front:'¿Cómo se deduce X=A⁻¹B?',back:tex`Se multiplica a la izquierda: \(A^{-1}AX=A^{-1}B\). Como \(A^{-1}A=I\), queda \(X=A^{-1}B\). No se cambia el orden.`},
 {id:'fc-inverse-system-03',front:'¿Qué garantiza la invertibilidad sobre las soluciones?',back:'Para cualquier B del tamaño adecuado, el sistema tiene una única solución. Si B=0, esa solución es X=0.'},
 {id:'fc-inverse-system-04',front:'¿Cómo se calcula la inversa en orden 2?',back:tex`Para \(A=\begin{pmatrix}a&b\\c&d\end{pmatrix}\), si \(ad-bc\ne0\), \(A^{-1}=\frac1{ad-bc}\begin{pmatrix}d&-b\\-c&a\end{pmatrix}\).`},
 {id:'fc-inverse-system-05',front:'¿Qué hacer si det(A)=0?',back:'Detener el método de la inversa. Comparar rangos o usar operaciones por filas para distinguir SCI de SI. No se divide entre cero.'},
 {id:'fc-inverse-system-06',front:'¿Cómo se verifica y cuándo se reutiliza una inversa?',back:'Comprueba AX=B o sustituye la solución en todas las ecuaciones originales. Conserva fracciones exactas. Si A no cambia y solo cambia B, puede reutilizarse A⁻¹, pero hay que calcular el nuevo producto.'}
].map(c=>({...c,topicId:'t05',lessonId:'t05-e07'}));

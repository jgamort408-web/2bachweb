const tex=String.raw;
const q=(n,prompt,choices,explanation,hint)=>({id:'matrix-operations-'+n,topicId:'t04',lessonId:'t04-e02',prompt,correct:'correct',options:choices.map(([text,feedback],i)=>({id:i?'wrong-'+i:'correct',text,feedback})),explanation,hint,source:'Elaboración propia; guion 4.2 y tarjeta local 4 del tema 4'});
export const matrixOperationQuestions=[
 q('01',tex`A tiene orden \(2\times3\) y B orden \(3\times2\). ¿Se puede calcular A+B?`,[
 ['No: deben coincidir filas y columnas.','La suma exige el mismo orden.'],['Sí: ambas tienen seis elementos.','Contar elementos no basta para emparejar posiciones.'],['Sí: el resultado es 5×5.','No se suman las dimensiones para formar el orden.'],['Sí: se completan con ceros.','Eso cambiaría las matrices del problema.']],
 'Para sumar, cada elemento debe tener un correspondiente en la misma posición. Los órdenes 2×3 y 3×2 no coinciden.','La condición de suma es distinta de la del producto matricial.'),
 q('02',tex`Si \(A=\begin{pmatrix}2&-1\\0&3\end{pmatrix}\) y \(B=\begin{pmatrix}4&2\\-2&1\end{pmatrix}\), ¿cuánto vale \((A-B)_{21}\)?`,[
 ['2','0−(−2)=2.'],['−2','Ese es 0+(−2), no la resta.'],['0','Hay que restar el elemento de B.'],['−4','No se multiplica el elemento de B por 2.']],
 'Se usa fila 2, columna 1: a₂₁=0 y b₂₁=−2. Restar un negativo equivale a sumar su opuesto.','Escribe primero 0−(−2).'),
 q('03',tex`¿Cuál es \(-2\begin{pmatrix}1&-3\\0&2\end{pmatrix}\)?`,[
 [tex`\(\begin{pmatrix}-2&6\\0&-4\end{pmatrix}\)`,'El −2 multiplica cada elemento.'],[tex`\(\begin{pmatrix}-2&-3\\0&-4\end{pmatrix}\)`,'No basta multiplicar la diagonal.'],[tex`\(\begin{pmatrix}-2&-6\\0&-4\end{pmatrix}\)`,'El producto de dos negativos es positivo.'],[tex`\(\begin{pmatrix}-1&-5\\-2&0\end{pmatrix}\)`,'Eso resta 2 a cada entrada, no multiplica por −2.']],
 'Multiplica todas las casillas: −2·1=−2, (−2)(−3)=6, (−2)·0=0 y (−2)·2=−4. El orden se conserva.','No cambies el número de filas ni de columnas.'),
 q('04','Para matrices A y B del mismo orden, ¿qué identidad es siempre cierta?',[
 [tex`\(A-B=-(B-A)\)`,'La resta invierte su signo al intercambiar el orden.'],[tex`\(A-B=B-A\)`,'Solo ocurre en casos particulares; no es una propiedad general.'],[tex`\(2(A+B)=2A+B\)`,'El 2 debe multiplicar también a B.'],[tex`\(A+O=O\)`,'La matriz nula es neutra: A+O=A.']],
 'Elemento a elemento, a−b=−(b−a). La suma sí es conmutativa; la resta no lo es en general.','Prueba las propuestas con matrices 1×1 de valores distintos.'),
 q('05','E y S cuentan entradas y salidas de material, respectivamente. Sus filas, columnas, período y unidades coinciden. Si (E−S)₂₃=−4, ¿qué significa?',[
 ['En esa posición salieron cuatro unidades más de las que entraron.','Es una variación neta, que puede ser negativa.'],['La existencia final es necesariamente −4.','Falta conocer la existencia inicial.'],['Entraron cuatro unidades más de las que salieron.','Invierte el signo de la diferencia.'],['La resta no existe porque aparece un negativo.','Una matriz de variación puede contener valores negativos.']],
 'La diferencia mide entradas menos salidas. Una variación −4 reduce en cuatro unidades la cantidad inicial, pero no determina por sí sola la cantidad final.','Distingue cambio neto de cantidad disponible.'),
 q('06',tex`Si \(2X+A=B\), con todas las matrices del mismo orden, ¿cómo se despeja X?`,[
 [tex`\(X=\frac12(B-A)\)`,'Primero se resta A y después se multiplica por 1/2.'],[tex`\(X=B-\frac12A\)`,'También debe dividirse el término B entre 2.'],[tex`\(X=\frac12(A-B)\)`,'La diferencia está invertida.'],[tex`\(X=2(B-A)\)`,'Para deshacer el factor 2 se multiplica por 1/2.']],
 'Sumando −A en ambos lados, 2X=B−A. Multiplicar cada entrada por 1/2 da la solución. No se utiliza una inversa matricial.','Trata el 2 como un número que multiplica todas las entradas.')
];
export const matrixOperationCards=[
 {id:'fc-matrix-operations-01',front:'¿Cuándo se pueden sumar o restar dos matrices?',back:'Cuando tienen el mismo orden: igual número de filas y de columnas. En datos aplicados, verifica además que las posiciones describan categorías y unidades compatibles.'},
 {id:'fc-matrix-operations-02',front:tex`¿Cómo se calcula \((A-B)_{ij}\)?`,back:tex`Restando elementos correspondientes: \(a_{ij}-b_{ij}\). Restar un número negativo cambia el signo: \(0-(-2)=2\).`},
 {id:'fc-matrix-operations-03',front:'¿Qué hace el producto por un escalar α?',back:tex`Multiplica todas las entradas, sin cambiar el orden: \((\alpha A)_{ij}=\alpha a_{ij}\). No es el producto AB de dos matrices.`},
 {id:'fc-matrix-operations-04',front:'¿Qué propiedades tiene la suma?',back:tex`Con el mismo orden: \(A+B=B+A\), \((A+B)+C=A+(B+C)\), \(A+O=A\) y \(A+(-A)=O\). La resta no es conmutativa en general.`},
 {id:'fc-matrix-operations-05',front:'¿Cómo se distribuye un escalar?',back:tex`\(\alpha(A+B)=\alpha A+\alpha B\), \((\alpha+\beta)A=\alpha A+\beta A\) y \(\alpha(\beta A)=(\alpha\beta)A\). Además \(1A=A\) y \(0A=O\).`},
 {id:'fc-matrix-operations-06',front:'¿Cómo se interpreta una matriz de diferencias?',back:'Cada entrada compara la misma categoría en ambos datos. Un valor negativo expresa un descenso o saldo neto negativo; no implica que la cantidad final sea negativa. Conserva etiquetas y unidades.'}
].map(c=>({...c,topicId:'t04',lessonId:'t04-e02'}));

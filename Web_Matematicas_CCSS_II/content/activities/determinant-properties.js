const tex=String.raw;
const q=(n,prompt,choices,explanation,hint,source='Elaboración propia; guion 4.7')=>({id:'det-property-'+n,topicId:'t04',lessonId:'t04-e07',prompt,correct:'correct',options:choices.map(([text,feedback],i)=>({id:i?'wrong-'+i:'correct',text,feedback})),explanation,hint,source});
export const determinantPropertyQuestions=[
 q('01','Al intercambiar dos filas distintas de una matriz cuadrada, su determinante:',[
 ['Cambia de signo.','El nuevo determinante es el opuesto del anterior.'],['Siempre queda igual.','Solo coincide numéricamente si era cero.'],['Se duplica.','No se está multiplicando una fila por 2.'],['Siempre se anula.','Puede ser distinto de cero antes y después.']],
 'Si det(A)=d, después de un intercambio de filas distintas vale −d. Dos intercambios recuperan el signo inicial. La misma regla vale para columnas.','Un intercambio introduce un factor −1.','Adaptación de T4.10 del banco local'),
 q('02','Si det(A)=5 y se multiplica solo la segunda columna por −3, ¿cuál es el nuevo determinante?',[
 ['−15','El factor de una sola columna sale una vez: −3·5.'],['−135','No se multiplica toda una matriz de orden 3 por −3.'],['15','El signo del factor también cuenta.'],['5','Multiplicar una columna no es sumar un múltiplo de otra.']],
 'Multiplicar una sola fila o columna por k multiplica el determinante por k. No hace falta conocer el orden para aplicar esta regla.','Identifica cuántas columnas se han multiplicado.'),
 q('03',tex`Si \(\det(A)=7\), ¿qué ocurre al sustituir \(F_3\leftarrow F_3-2F_1\), sin cambiar F₁?`,[
 ['El determinante sigue siendo 7.','Sumar un múltiplo de otra fila al destino conserva el determinante.'],['Vale −14.','No se está multiplicando F₃ por −2.'],['Vale 5.','No se resta el número 2 al determinante.'],['No se puede saber sin conocer las entradas.','La propiedad determina el resultado con el dato inicial.']],
 'La fila de origen F₁ se conserva y es distinta del destino F₃. Solo se reemplaza la tercera fila por esa suma.','La operación es sumar un múltiplo, no escalar la fila destino.'),
 q('04','A tiene orden 3 y det(A)=2. ¿Cuánto vale det(2A)?',[
 ['16','El 2 multiplica tres filas: 2³·2=16.'],['4','Eso corresponde a duplicar una sola fila o columna.'],['8','Falta multiplicar 2³ por el determinante inicial.'],['6','El exponente no se sustituye por una multiplicación 2·3.']],
 'En orden n, det(kA)=kⁿdet(A). Aquí n=3, k=2 y det(A)=2.','Cuenta cuántas filas reciben el factor 2.'),
 q('05',tex`¿Cuánto vale \(\begin{vmatrix}2&3&1\\0&-1&4\\0&0&5\end{vmatrix}\)?`,[
 ['−10','Es triangular: 2·(−1)·5=−10.'],['6','No se suman las entradas diagonales.'],['0','Tener ceros bajo la diagonal no hace nulo el determinante.'],['10','Se conserva el signo negativo de la diagonal.']],
 'En una matriz triangular, todos los productos de la fórmula salvo el de la diagonal principal contienen algún cero. El resultado es el producto de esa diagonal.','Comprueba primero que todos los elementos bajo la diagonal son cero.'),
 q('06','A y B son cuadradas del mismo orden, det(A)=2 y det(B)=−3. ¿Cuánto vale det((AB)ᵀ)?',[
 ['−6','El producto multiplica determinantes y la traspuesta los conserva.'],['6','La traspuesta no cambia el signo.'],['−1','No se suman los determinantes en un producto.'],['No se puede calcular porque AB puede ser distinto de BA.','No conmutar como matrices no impide usar det(AB)=det(A)det(B).']],
 'det((AB)ᵀ)=det(AB)=det(A)det(B)=2·(−3)=−6. Se exige que A y B sean cuadradas del mismo orden.','Aplica primero la propiedad de la traspuesta y luego la del producto.')
];
export const determinantPropertyCards=[
 {id:'fc-det-property-01',front:'¿Qué hace intercambiar dos filas o columnas distintas?',back:'Multiplica el determinante por −1. Dos intercambios recuperan el signo inicial. Si el determinante era cero, su opuesto sigue siendo cero.'},
 {id:'fc-det-property-02',front:'¿Cómo se extrae un factor?',back:tex`Un factor k de una sola fila o columna sale una vez. Si afecta a toda A de orden n, \(\det(kA)=k^n\det(A)\). Si k=0, el determinante resultante es cero; no se puede dividir entre k.`},
 {id:'fc-det-property-03',front:'¿Qué operación conserva el determinante al crear ceros?',back:tex`\(F_i\leftarrow F_i+kF_j\), con i≠j y conservando Fⱼ. También vale para columnas. Escalar o intercambiar requiere llevar aparte su factor o signo.`},
 {id:'fc-det-property-04',front:'¿Cuándo se puede detectar un determinante cero?',back:'Si hay una fila o columna nula, dos iguales o proporcionales, o una es combinación lineal de las otras. Son criterios de dependencia; no hace falta que la matriz completa sea nula.'},
 {id:'fc-det-property-05',front:'¿Qué simplifica una matriz triangular?',back:'Su determinante es el producto de la diagonal principal. La regla vale para triangulares superiores, inferiores y diagonales. No se aplica a cualquier matriz sin comprobar los ceros.'},
 {id:'fc-det-property-06',front:'¿Qué ocurre con traspuestas, productos y sumas?',back:tex`\(\det(A^T)=\det(A)\) y \(\det(AB)=\det(A)\det(B)\) para bases cuadradas del mismo orden. En general \(\det(A+B)\ne\det(A)+\det(B)\); la linealidad se refiere a una sola fila o columna, manteniendo las demás fijas.`}
].map(c=>({...c,topicId:'t04',lessonId:'t04-e07'}));

const tex=String.raw;
const q=(n,prompt,choices,explanation,hint,source='Elaboración propia; guion 4.5')=>({id:'matrix-symmetry-'+n,topicId:'t04',lessonId:'t04-e05',prompt,correct:'correct',options:choices.map(([text,feedback],i)=>({id:i?'wrong-'+i:'correct',text,feedback})),explanation,hint,source});
export const matrixSymmetryQuestions=[
 q('01',tex`Si \(A=\begin{pmatrix}1&2&3\\4&5&6\end{pmatrix}\), ¿cuál es su traspuesta?`,[
 [tex`\(\begin{pmatrix}1&4\\2&5\\3&6\end{pmatrix}\)`,'Las filas de A se convierten en columnas.'],[tex`\(\begin{pmatrix}1&2&3\\4&5&6\end{pmatrix}\)`,'No se han intercambiado filas y columnas.'],[tex`\(\begin{pmatrix}-1&-4\\-2&-5\\-3&-6\end{pmatrix}\)`,'Trasponer no cambia los signos.'],['No existe porque A no es cuadrada.','Toda matriz rectangular tiene traspuesta.']],
 'La primera fila (1,2,3) pasa a ser la primera columna. El orden cambia de 2×3 a 3×2.','La entrada (i,j) pasa a (j,i).'),
 q('02','Una matriz real simétrica cumple:',[
 [tex`\(A=A^T\)`,'Coincide con su traspuesta y es cuadrada.'],[tex`\(A=-A\)`,'Esto exige A=O; no define a todas las simétricas.'],[tex`\(A^2=I\)`,'Es una condición distinta: la diagonal diag(2,3) es simétrica y no cumple A²=I.'],[tex`\(A^T=-A\)`,'Esta es la condición de antisimetría.']],
 'Simetría significa igualdad de los elementos reflejados respecto de la diagonal principal: aᵢⱼ=aⱼᵢ. La diagonal puede tener valores distintos de cero.','Recuerda que trasponer intercambia los índices.','Adaptación de T4.6 del banco local; distractores ajustados a los contenidos ya estudiados'),
 q('03','¿Qué afirmación sobre matrices reales antisimétricas es correcta?',[
 ['Deben tener diagonal nula, pero esa condición por sí sola no basta.','También deben ser cuadradas y cumplir aᵢⱼ=−aⱼᵢ en todas las posiciones.'],['Toda matriz con diagonal nula es antisimétrica.','Los pares fuera de la diagonal también deben ser opuestos.'],['No pueden tener ninguna entrada positiva.','Los pares no nulos tienen signos opuestos.'],['Nunca pueden ser simétricas.','La matriz nula cuadrada cumple ambas condiciones.']],
 'En la diagonal se exige aᵢᵢ=−aᵢᵢ, luego 2aᵢᵢ=0. Fuera de ella hay que comprobar los pares opuestos.','Prueba la matriz con filas (0,2) y (2,0).'),
 q('04',tex`¿Qué valores hacen antisimétrica a \(M=\begin{pmatrix}a&x\\-3&b\end{pmatrix}\)?`,[
 ['a=0, b=0, x=3','La diagonal es cero y las entradas opuestas tienen signos contrarios.'],['a=0, b=0, x=−3','Eso hace iguales las entradas fuera de la diagonal, no opuestas.'],['a=1, b=1, x=3','La diagonal de una antisimétrica debe ser cero.'],['a y b libres, x=3','La diagonal no queda libre en una antisimétrica.']],
 'Las condiciones son a=−a, b=−b y x=−(−3)=3. Por tanto a=b=0.','Revisa primero la diagonal y después el par (1,2)/(2,1).'),
 q('05','¿Qué matrices reales cuadradas son simétricas y antisimétricas a la vez?',[
 ['Solo las matrices nulas.','Aᵀ=A y Aᵀ=−A implican A=−A, luego A=O.'],['Todas las diagonales.','Son simétricas, pero solo la diagonal nula es antisimétrica.'],['Todas las identidades.','Sus unos diagonales incumplen la antisimetría.'],['Ninguna.','La matriz nula satisface ambas igualdades.']],
 'Si una entrada debe ser igual a su opuesta, tiene que ser cero. Esto ocurre en todas las posiciones; la matriz nula cuadrada verifica ambas condiciones.','Combina las dos igualdades de definición.'),
 q('06',tex`Sean \(A=\begin{pmatrix}x+1&2\\3&y-1\end{pmatrix}\), \(B=\begin{pmatrix}4&2\\3&5\end{pmatrix}\). ¿Cuándo son iguales?`,[
 ['x=3, y=6','Se resuelven x+1=4 e y−1=5 y se comprueban las otras dos entradas.'],['x=4, y=5','Las expresiones son x+1 e y−1, no x e y.'],['x=3, y=4','De y−1=5 se obtiene y=6.'],['Nunca, porque A tiene letras.','Las letras pueden tomar valores que satisfagan todas las igualdades.']],
 'La igualdad requiere el mismo orden y todas las entradas correspondientes iguales. Las posiciones fijas ya coinciden; las otras determinan x=3 e y=6.','No omitas las posiciones donde no aparece ninguna incógnita.')
];
export const matrixSymmetryCards=[
 {id:'fc-matrix-symmetry-01',front:'¿Cuándo son iguales dos matrices?',back:'Cuando tienen el mismo orden y todas sus entradas correspondientes son iguales. Con parámetros hay que comprobar también las posiciones sin incógnitas.'},
 {id:'fc-matrix-symmetry-02',front:'¿Qué hace la traspuesta?',back:tex`Intercambia filas y columnas: \((A^T)_{ij}=a_{ji}\). Si A es m×n, Aᵀ es n×m. Se conservan los valores y signos; también existe para matrices no cuadradas.`},
 {id:'fc-matrix-symmetry-03',front:'¿Cómo se reconoce una simétrica?',back:tex`Es cuadrada y \(A^T=A\), es decir, \(a_{ij}=a_{ji}\). La diagonal puede contener cualquier número real. Todas las diagonales cuadradas son simétricas.`},
 {id:'fc-matrix-symmetry-04',front:'¿Cómo se reconoce una antisimétrica?',back:tex`Es cuadrada y \(A^T=-A\), es decir, \(a_{ij}=-a_{ji}\). Su diagonal es nula, condición necesaria pero no suficiente: también se revisan los pares fuera de ella.`},
 {id:'fc-matrix-symmetry-05',front:'¿Qué ocurre con la nula y con matrices 1×1?',back:'La nula cuadrada es simétrica y antisimétrica, y es la única matriz real cuadrada con ambas propiedades. Toda matriz 1×1 es simétrica; solo (0) es antisimétrica. La nula rectangular no cuadrada no es ninguna de las dos.'},
 {id:'fc-matrix-symmetry-06',front:'¿Qué propiedades tiene la traspuesta?',back:tex`\((A^T)^T=A\), \((A+B)^T=A^T+B^T\), \((\alpha A)^T=\alpha A^T\). En un producto se invierte el orden: \((AB)^T=B^TA^T\), con dimensiones compatibles.`}
].map(c=>({...c,topicId:'t04',lessonId:'t04-e05'}));

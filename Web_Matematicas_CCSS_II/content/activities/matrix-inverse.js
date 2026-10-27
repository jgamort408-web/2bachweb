const tex=String.raw;
const q=(n,prompt,choices,explanation,hint,source='Elaboración propia a partir del guion 4.9')=>({id:'matrix-inverse-'+n,topicId:'t04',lessonId:'t04-e09',prompt,correct:'correct',options:choices.map(([text,feedback],i)=>({id:i?'wrong-'+i:'correct',text,feedback})),explanation,hint,source});
export const inverseQuestions=[
 q('01','¿Cuándo tiene inversa una matriz cuadrada A?',[
 ['Cuando det(A)≠0.','El determinante distinto de cero es la condición necesaria y suficiente.'],
 ['Solo cuando det(A)=1.','Un determinante distinto de 1 también permite invertir.'],
 ['Cuando todas sus entradas son distintas de cero.','Una matriz con todas las entradas iguales a 1 puede ser singular.'],
 ['Solo cuando det(A)>0.','Los determinantes negativos también son válidos.']],
 'A es invertible si y solo si det(A)≠0. Ser cuadrada es el contexto de esta condición.','Piensa en qué denominador usa la fórmula de la inversa.'),
 q('02','En la convención de esta web, C es la matriz de cofactores. ¿Cuál es Adj(A)?',[
 [tex`\(C^T\)`,'La adjunta es la traspuesta de C.'],['C, sin trasponer.','Aquí Adj(A) ya debe incorporar la trasposición.'],['−C','No se cambian todos los signos.'],[tex`\(A^{-1}\)`,'La adjunta se divide entre det(A) para obtener la inversa, si existe.']],
 'Cᵢⱼ pasa a la posición (j,i) de Adj(A). La fórmula es A⁻¹=Adj(A)/det(A).','Revisa qué ocurre con las posiciones al trasponer.'),
 q('03',tex`Si \(A=\begin{pmatrix}2&1\\1&2\end{pmatrix}\), ¿cuál es \(A^{-1}\)?`,[
 [tex`\(\frac13\begin{pmatrix}2&-1\\-1&2\end{pmatrix}\)`,'El determinante es 3 y se usa la adjunta.'],
 [tex`\(\begin{pmatrix}2&-1\\-1&2\end{pmatrix}\)`,'Falta dividir entre 3.'],
 [tex`\(\begin{pmatrix}\frac12&1\\1&\frac12\end{pmatrix}\)`,'No se invierte cada entrada por separado.'],
 [tex`\(-\begin{pmatrix}2&1\\1&2\end{pmatrix}\)`,'La opuesta no es la inversa.']],
 'det(A)=4−1=3. La fórmula de orden 2 cambia de posición la diagonal y de signo las otras entradas antes de dividir entre 3.','Comprueba el determinante y conserva las fracciones.'),
 q('04','Si AX=B y A es invertible, ¿cómo despejas X?',[
 [tex`\(X=A^{-1}B\)`,'Multiplica ambos miembros por A⁻¹ a la izquierda.'],
 [tex`\(X=BA^{-1}\)`,'Esa sería la solución de XA=B.'],
 ['X=B/A','No se emplea una división matricial para este despeje.'],
 [tex`\(X=AB^{-1}\)`,'No se pide ni se garantiza que B tenga inversa.']],
 'A⁻¹AX=A⁻¹B implica IX=A⁻¹B. La multiplicación no permite cambiar libremente el orden.','El factor A que quieres cancelar está a la izquierda de X.','Adaptación de T4.7 del banco local'),
 q('05','Si A y B son invertibles del mismo orden, ¿cuál es la inversa de AB?',[
 [tex`\(B^{-1}A^{-1}\)`,'Los factores se invierten y cambia su orden.'],
 [tex`\(A^{-1}B^{-1}\)`,'Ese orden no permite cancelar B con B⁻¹ en general.'],
 [tex`\(A^{-1}+B^{-1}\)`,'La inversa de un producto no es una suma.'],
 [tex`\((AB)^T\)`,'Traspuesta e inversa no son lo mismo.']],
 '(AB)(B⁻¹A⁻¹)=A(BB⁻¹)A⁻¹=I. La igualdad requiere que ambos factores sean invertibles.','Escribe el producto e intenta cancelar los factores contiguos.'),
 q('06','Si det(A)=0 en un sistema Ax=b, ¿qué puedes afirmar?',[
 ['No puedes aplicar x=A⁻¹b; hace falta estudiar también b.','El sistema puede ser incompatible o tener infinitas soluciones.'],
 ['El sistema no tiene solución siempre.','Las ecuaciones pueden ser dependientes y compatibles.'],
 ['El sistema siempre tiene infinitas soluciones.','Un término independiente puede introducir una contradicción.'],
 ['x=0 es siempre la solución única.','La singularidad impide una solución única para una matriz cuadrada.']],
 'Con filas (1,2) y (2,4), b=(3,6) hace equivalentes las ecuaciones, mientras b=(3,7) las hace contradictorias.','No confundas ausencia de inversa con ausencia de soluciones.')
];
export const inverseCards=[
 {id:'fc-inverse-01',front:'¿Cómo se define la inversa y cuándo existe?',back:tex`\(AA^{-1}=A^{-1}A=I\). Para A cuadrada, existe y es única si y solo si \(\det(A)\ne0\).`},
 {id:'fc-inverse-02',front:'¿Qué convención usamos para la adjunta?',back:tex`Si \(C=(C_{ij})\) contiene los cofactores, \(\operatorname{Adj}(A)=C^T\). Existe también cuando A es singular. Otros textos pueden llamar adjunta a C; revisa la fórmula que usan.`},
 {id:'fc-inverse-03',front:'¿Cómo se calcula la inversa con la adjunta?',back:tex`\(A^{-1}=\frac1{\det(A)}\operatorname{Adj}(A)\), solo si \(\det(A)\ne0\). Calcula cofactores, traspón y divide cada entrada.`},
 {id:'fc-inverse-04',front:'¿Cómo se comprueba la inversa?',back:'Multiplica por A. Los productos en ambos órdenes deben dar la identidad, no la matriz cero. Usa fracciones exactas para evitar redondeos.'},
 {id:'fc-inverse-05',front:'¿Qué diferencia hay entre AX=B y XA=B?',back:tex`Si A es invertible: \(AX=B\Rightarrow X=A^{-1}B\); \(XA=B\Rightarrow X=BA^{-1}\). Multiplica por el lado adecuado, sin conmutar factores.`},
 {id:'fc-inverse-06',front:'¿Cómo se invierte un producto?',back:tex`\((AB)^{-1}=B^{-1}A^{-1}\), con ambos factores invertibles del mismo orden. Invierte cada factor y cambia el orden.`}
].map(c=>({...c,topicId:'t04',lessonId:'t04-e09'}));

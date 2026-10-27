const tex=String.raw;
const q=(n,prompt,choices,explanation,hint)=>({id:'matrix-equation-'+n,topicId:'t04',lessonId:'t04-e11',prompt,correct:'correct',options:choices.map(([text,feedback],i)=>({id:i?'wrong-'+i:'correct',text,feedback})),explanation,hint,source:'Elaboración propia; guion 4.11'});
export const equationQuestions=[
 q('01','A es 2×2 y B es 2×3. En AX=B, ¿qué tamaño debe tener X?',[
 ['2×3','Las filas de X encajan con las columnas de A y el resultado conserva sus tres columnas.'],
 ['3×2','El producto de A por esa matriz no encaja.'],
 ['2×2','El resultado tendría dos columnas, no tres.'],
 ['3×3','A tiene dos columnas y X tendría tres filas.']],
 'El producto (2×2)(2×3) produce 2×3. La incógnita no tiene que ser cuadrada.','Usa las dimensiones interiores y exteriores del producto.'),
 q('02','¿Qué matriz debes comprobar e invertir para resolver AX−X=B por este método?',[
 ['A−I','X=IX permite agrupar (A−I)X=B.'],
 ['A, sin modificar','No recoge el término −X.'],
 ['A⁻¹−I','Eso no es el coeficiente original de X.'],
 ['A−1, restando 1 a cada entrada','El término escalar debe representarse mediante la identidad.']],
 'Si det(A−I)≠0, X=(A−I)⁻¹B. Que A sea invertible no garantiza que A−I lo sea.','Escribe X como IX.'),
 q('03','Si AXD=B, con A y D invertibles y dimensiones compatibles, ¿cuál es X?',[
 [tex`\(A^{-1}BD^{-1}\)`,'A se cancela por la izquierda y D por la derecha.'],
 [tex`\(D^{-1}BA^{-1}\)`,'Invierte indebidamente los lados de cancelación.'],
 [tex`\(A^{-1}D^{-1}B\)`,'D⁻¹ debe actuar por la derecha de B.'],
 [tex`\(BA^{-1}D^{-1}\)`,'A⁻¹ debe actuar por la izquierda de B.']],
 'Multiplica ambos miembros a la izquierda por A⁻¹ y a la derecha por D⁻¹.','Conserva la posición relativa de B entre las dos inversas.'),
 q('04','¿Qué factorización es válida en general, con dimensiones compatibles?',[
 [tex`\(AX+DX=(A+D)X\)`,'X está a la derecha en ambos sumandos.'],
 [tex`\(AX+XD=(A+D)X\)`,'XD no se cambia por DX libremente.'],
 [tex`\(AX+DX=X(A+D)\)`,'Se ha trasladado X al lado contrario.'],
 [tex`\(AX+DX=(AD)X\)`,'Una suma de productos no se convierte en ese producto.']],
 'La distributiva conserva el orden de los factores: busca un factor común en el mismo lado.','Observa dónde aparece X en cada sumando.'),
 q('05',tex`En \(AX=B\), \(A=\begin{pmatrix}1&2\\0&1\end{pmatrix}\) y \(B=\begin{pmatrix}3&1\\1&2\end{pmatrix}\). ¿Cuál es X?`,[
 [tex`\(\begin{pmatrix}1&-3\\1&2\end{pmatrix}\)`,'Es A⁻¹B y al multiplicar por A se recupera B.'],
 [tex`\(\begin{pmatrix}3&-5\\1&0\end{pmatrix}\)`,'Es BA⁻¹: resuelve XA=B.'],
 [tex`\(\begin{pmatrix}5&5\\1&2\end{pmatrix}\)`,'Se ha multiplicado por A en lugar de por su inversa.'],
 [tex`\(\begin{pmatrix}2&-1\\1&1\end{pmatrix}\)`,'Restar A de B no deshace un producto.']],
 'A⁻¹ tiene primera fila (1,−2). Su producto por B da (1,−3) en la primera fila y (1,2) en la segunda.','Comprueba AX usando cada propuesta.'),
 q('06','A es singular. ¿Qué debes hacer para estudiar AX=B?',[
 ['Comparar entradas o estudiar los sistemas de cada columna.','La ausencia de inversa no decide por sí sola la compatibilidad.'],
 ['Concluir que no existe X siempre.','Puede haber infinitas soluciones.'],
 ['Concluir que X=0 es la única solución.','X=0 solo sirve si B=0 y no sería única con A singular.'],
 ['Dividir cada entrada de B por la correspondiente de A.','No es una operación inversa del producto matricial.']],
 'Cada columna de X debe resolver un sistema con A y la columna correspondiente de B. Si alguno es incompatible, no existe X.','Vuelve a la igualdad entrada a entrada.')
];
export const equationCards=[
 {id:'fc-equation-01',front:'¿Qué tamaños tiene X en AX=B y XA=B?',back:'Con A n×n: en AX=B, si B es n×p, X es n×p; en XA=B, si B es p×n, X es p×n. X no necesita ser cuadrada.'},
 {id:'fc-equation-02',front:'¿Cómo despejas AX+C=B?',back:tex`Primero \(AX=B-C\). Si A es invertible, \(X=A^{-1}(B-C)\). Comprueba las dimensiones de B y C antes de restar.`},
 {id:'fc-equation-03',front:'¿Qué ocurre con AX+kX=B?',back:tex`Agrupa \((A+kI)X=B\). Debe ser invertible A+kI. Entonces \(X=(A+kI)^{-1}B\). Para XA+kX=B, la inversa multiplica por la derecha.`},
 {id:'fc-equation-04',front:'¿Cómo despejas AXD=B?',back:tex`Si A y D son invertibles, \(X=A^{-1}BD^{-1}\). Cancela A por la izquierda y D por la derecha.`},
 {id:'fc-equation-05',front:'¿Qué compruebas al terminar?',back:'Sustituye X en la ecuación original, conserva el orden y calcula todas las entradas. Debes recuperar B, incluido cualquier término que contenga k o una suma.'},
 {id:'fc-equation-06',front:'¿Qué haces si el factor de X es singular?',back:'No uses su inversa. Escribe las entradas de X como incógnitas y estudia el sistema resultante. Puede haber infinitas soluciones o ninguna.'}
].map(c=>({...c,topicId:'t04',lessonId:'t04-e11'}));

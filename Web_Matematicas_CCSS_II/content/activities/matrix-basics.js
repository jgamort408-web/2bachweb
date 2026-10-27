const tex=String.raw;
const question=(n,prompt,choices,explanation,hint)=>({id:'matrix-basics-'+n,topicId:'t04',lessonId:'t04-e01',prompt,correct:'correct',options:choices.map(([text,feedback],i)=>({id:i?'wrong-'+i:'correct',text,feedback})),explanation,hint,source:n==='01'?'Adaptación del test local T4.1; guion 4.1':'Elaboración propia; guion 4.1'});
export const matrixQuestions=[
 question('01','Una matriz tiene tres filas y dos columnas. ¿Cuál es su orden?',[
 [tex`\(3\times2\)`,'Se escriben primero las filas.'],[tex`\(2\times3\)`,'Has intercambiado filas y columnas.'],[tex`\(6\times1\)`,'Seis es el número de elementos, no el número de filas.'],[tex`\(3\times3\)`,'Solo hay dos columnas.']],
 'El orden es filas × columnas: 3×2. Contiene seis elementos, pero ese número no determina por sí solo el orden.','Cuenta las filas horizontales antes que las columnas verticales.'),
 question('02',tex`En \(A=\begin{pmatrix}4&-2&7\\0&5&9\end{pmatrix}\), ¿cuánto vale \(a_{23}\)?`,[
 ['9','Fila 2, columna 3.'],['7','Ese es a₁₃.'],['5','Ese es a₂₂.'],['No existe.','La segunda fila y la tercera columna sí existen.']],
 'El primer subíndice elige la fila y el segundo la columna. En la fila (0,5,9), el tercer elemento es 9.','No leas el subíndice como un número de dos cifras.'),
 question('03',tex`¿Puede algún x hacer iguales \(\begin{pmatrix}x&2\\3&4\end{pmatrix}\) y \(\begin{pmatrix}5&7\\3&4\end{pmatrix}\)?`,[
 ['No existe tal x.','Las entradas de la primera fila y segunda columna son distintas.'],['Sí, x=5.','Eso iguala una entrada, pero 2 sigue siendo distinto de 7.'],['Sí, x=10.','La igualdad exige cada posición, no compensar una diferencia en otra.'],['Sí, para cualquier x.','Incluso el elemento (1,1) tendría que ser 5.']],
 'La igualdad exige todas las correspondencias: x=5 y 2=7 serían necesarias a la vez. La segunda condición es imposible.','Compara también los elementos que no contienen incógnitas.'),
 question('04',tex`¿Qué clasificación completa corresponde a \(I_2=\begin{pmatrix}1&0\\0&1\end{pmatrix}\)?`,[
 ['Cuadrada, diagonal, escalar e identidad.','Los tipos se solapan.'],['Solo identidad; no puede pertenecer a otros tipos.','Identidad es un caso particular de escalar y diagonal.'],['Cuadrada y nula.','Sus elementos diagonales no son cero.'],['Diagonal, pero no escalar.','Los dos elementos diagonales son iguales.']],
 'Es cuadrada; fuera de la diagonal hay ceros; los elementos diagonales son todos iguales a 1. Cumple las cuatro definiciones.','Las etiquetas no son categorías excluyentes.'),
 question('05',tex`La matriz \(O=\begin{pmatrix}0&0&0\\0&0&0\end{pmatrix}\) es:`,[
 ['Nula y rectangular no cuadrada.','Todos sus elementos son cero y su orden es 2×3.'],['Identidad de orden 3.','No es cuadrada y carece de unos diagonales.'],['Escalar de orden 2.','En este curso las matrices escalares son cuadradas.'],['Diagonal de orden 2.','La definición de diagonal exige una matriz cuadrada.']],
 'Una matriz nula puede tener cualquier orden. Para ser diagonal, escalar o identidad se exige que sea cuadrada.','Antes de clasificar la diagonal, comprueba el orden.'),
 question('06',tex`En una tabla de ventas semanales, filas = tiendas Norte y Sur; columnas = cuadernos, carpetas y bolígrafos. \(V=\begin{pmatrix}24&15&8\\10&20&18\end{pmatrix}\). ¿Qué significa \(v_{21}=10\)?`,[
 ['La tienda Sur vendió 10 cuadernos esa semana.','Segunda tienda y primer producto; los datos son unidades vendidas.'],['La tienda Norte vendió 10 carpetas.','Invierte el papel de fila y columna.'],['La tienda Sur ingresó 10 euros.','La matriz contiene cantidades, no precios ni ingresos.'],['Entre ambas tiendas se vendieron 10 cuadernos.','Una entrada no suma las dos filas.']],
 'El significado depende de las etiquetas y unidades: fila 2 es Sur, columna 1 es cuadernos y cada entrada cuenta unidades semanales.','Recupera primero las etiquetas, después las unidades.')
];
export const matrixCards=[
 {id:'fc-matrix-basics-01',front:'¿Qué indica el orden de una matriz?',back:tex`\(m\times n\): m filas y n columnas; contiene mn elementos. Tres filas y dos columnas dan orden \(3\times2\), no \(2\times3\).`},
 {id:'fc-matrix-basics-02',front:tex`¿Cómo se lee \(a_{ij}\)?`,back:'Elemento de la fila i y la columna j. Los índices empiezan en 1. Las etiquetas de filas/columnas y las unidades dan significado a los datos.'},
 {id:'fc-matrix-basics-03',front:'¿Cuándo son iguales dos matrices?',back:'Cuando tienen el mismo orden y son iguales todos sus elementos en las mismas posiciones. No basta tener la misma suma ni los mismos números en distinto orden.'},
 {id:'fc-matrix-basics-04',front:'¿Cómo se relacionan diagonal, escalar e identidad?',back:'Todas son cuadradas. Diagonal: ceros fuera de la diagonal. Escalar: además todos los elementos diagonales iguales. Identidad: además esos elementos son 1. Identidad implica escalar y escalar implica diagonal.'},
 {id:'fc-matrix-basics-05',front:'¿Una matriz nula tiene que ser cuadrada?',back:'No: todos sus elementos son cero, cualquiera que sea su orden. Si es cuadrada, también es diagonal y escalar con valor diagonal 0. Nunca es identidad para un orden positivo.'},
 {id:'fc-matrix-basics-06',front:'¿Puede una matriz ser fila y columna a la vez?',back:tex`Sí, si su orden es \(1\times1\). También es cuadrada, diagonal y escalar. Es identidad solo si su único elemento es 1, y nula solo si es 0.`}
].map(c=>({...c,topicId:'t04',lessonId:'t04-e01'}));

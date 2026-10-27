const tex=String.raw;
const q=(n,prompt,choices,explanation,hint,source='Elaboración propia; guion 4.3')=>({id:'matrix-product-'+n,topicId:'t04',lessonId:'t04-e03',prompt,correct:'correct',options:choices.map(([text,feedback],i)=>({id:i?'wrong-'+i:'correct',text,feedback})),explanation,hint,source});
export const matrixProductQuestions=[
 q('01','¿Qué condición permite calcular AB?',[
 ['Columnas de A = filas de B.','Se emparejan los términos de cada fila de A con una columna de B.'],['A y B tienen el mismo orden.','No basta: dos matrices 2×3 no se pueden multiplicar en ese orden.'],['Las dos son cuadradas.','No es necesario ni suficiente si sus tamaños cuadrados son diferentes.'],['Filas de A = columnas de B.','Esa es la condición para BA.']],
 'Si A es m×n y B es n×p, cada fila de A y cada columna de B contienen n elementos.','Mira las dos dimensiones interiores.','Adaptación de T4.2 del banco local'),
 q('02',tex`Si A es \(2\times3\) y B es \(3\times4\), ¿cuál es el orden de AB?`,[
 ['2×4','Se conservan las filas de A y las columnas de B.'],['3×3','Las dimensiones interiores permiten operar, pero no forman el orden final.'],['2×3','El resultado no conserva siempre el orden de A.'],['4×2','Has invertido filas y columnas del resultado.']],
 'Las dimensiones interiores 3 y 3 coinciden. Las exteriores son 2 y 4. BA no existe, pues 4≠2.','Escribe (2×3)(3×4) y comprueba las dimensiones centrales.'),
 q('03',tex`Para \(A=\begin{pmatrix}1&2&-1\\0&3&2\end{pmatrix}\), \(B=\begin{pmatrix}2&1\\-1&0\\3&4\end{pmatrix}\), ¿cuánto vale \((AB)_{12}\)?`,[
 ['−3','1·1+2·0+(−1)·4=−3.'],['5','Ese valor pierde el signo negativo del último producto.'],['1','Falta sumar el resto de productos.'],['3','Ese valor corresponde a (AB)₂₁.']],
 'Se multiplica la fila 1 de A, (1,2,−1), por la columna 2 de B, (1,0,4), y se suman los tres productos.','El primer índice elige la fila del primer factor; el segundo, la columna del segundo.'),
 q('04','Si AB y BA existen y tienen el mismo orden, ¿cuál es la afirmación correcta?',[
 ['Pueden ser distintos; también pueden coincidir en casos particulares.','El producto no es conmutativo en general.'],['Siempre son iguales.','Cambiar el orden modifica qué filas y columnas se combinan.'],['Siempre son distintos.','Por ejemplo, AI=IA=A cuando I es la identidad del orden adecuado.'],['Al menos uno es nulo.','La existencia de ambos productos no impone que sean nulos.']],
 'No ser conmutativo significa que no podemos afirmar AB=BA para todas las matrices. No significa que AB y BA nunca coincidan.','Piensa en el contraejemplo de la lección y en la identidad.','Adaptación de T4.3 del banco local, precisando el significado de «en general»'),
 q('05',tex`V contiene unidades vendidas: \(V=\begin{pmatrix}24&15&8\\10&20&18\end{pmatrix}\), con filas Norte y Sur. Los precios por unidad, en el mismo orden de productos, son \(p=\begin{pmatrix}2\\3\\1\end{pmatrix}\). ¿Qué significa \((Vp)_{21}\)?`,[
 ['98 euros de ingresos en Sur.','10·2+20·3+18·1=98.'],['101 euros de ingresos en Sur.','101 corresponde a Norte.'],['48 unidades vendidas en Sur.','48 suma unidades, sin ponderar por precios.'],['98 euros de beneficio en Sur.','Para calcular beneficio faltan los costes.']],
 'La fila 2 corresponde a Sur; cada venta se multiplica por su precio. El resultado está en euros de ingresos, no de beneficio.','Comprueba fila, orden de los productos y unidades.'),
 q('06','Si AB es la matriz nula, ¿debe ser nulo alguno de los factores?',[
 ['No necesariamente: hay matrices no nulas cuyo producto es nulo.','El producto puede anularse sin que se anule un factor.'],['Sí, siempre A es nula.','El ejemplo diagonal de la lección tiene A≠O.'],['Sí, siempre B es nula.','El mismo ejemplo tiene B≠O.'],['Sí, ambos factores son nulos.','Es suficiente, pero no necesario.']],
 tex`Con \(A=\begin{pmatrix}1&0\\0&0\end{pmatrix}\) y \(B=\begin{pmatrix}0&0\\0&1\end{pmatrix}\), ambos factores son no nulos y \(AB=O\). No traslades automáticamente la regla del producto nulo de números reales a matrices.`,
 'Prueba dos matrices diagonales con sus unos en posiciones diferentes.')
];
export const matrixProductCards=[
 {id:'fc-matrix-product-01',front:'¿Cuándo existe AB y qué orden tiene?',back:tex`Si \(A:m\times n\) y \(B:n\times p\), entonces \(AB:m\times p\). Deben coincidir columnas del primer factor y filas del segundo.`},
 {id:'fc-matrix-product-02',front:'¿Cómo se calcula la entrada (i,j) de AB?',back:tex`Multiplica la fila i de A por la columna j de B y suma: \(c_{ij}=\sum_{k=1}^{n}a_{ik}b_{kj}\). No es un producto casilla a casilla.`},
 {id:'fc-matrix-product-03',front:'¿Podemos intercambiar el orden de factores?',back:'No en general. BA puede no existir, tener otro orden o tener valores distintos. En casos particulares sí puede ocurrir AB=BA.'},
 {id:'fc-matrix-product-04',front:'¿Qué reglas sí conserva el producto?',back:tex`Con dimensiones compatibles: \((AB)C=A(BC)\), \(A(B+C)=AB+AC\) y \((A+B)C=AC+BC\). Se mantiene el orden de factores.`},
 {id:'fc-matrix-product-05',front:'¿Cómo actúa la identidad? ¿Y el producto nulo?',back:tex`Para \(A:m\times n\), \(I_mA=A=AI_n\). Un factor nulo da producto nulo si está definido; el recíproco es falso: \(AB=O\) no obliga a \(A=O\) o \(B=O\).`},
 {id:'fc-matrix-product-06',front:'¿Qué revisas en un producto aplicado a datos?',back:'Las categorías que se emparejan deben seguir el mismo orden. Las filas del primer factor y columnas del segundo etiquetan el resultado. Unidades vendidas por euros/unidad producen euros de ingresos.'}
].map(c=>({...c,topicId:'t04',lessonId:'t04-e03'}));

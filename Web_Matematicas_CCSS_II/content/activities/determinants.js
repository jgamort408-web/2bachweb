const tex=String.raw;
const q=(n,prompt,choices,explanation,hint,source='Elaboración propia; guion 4.6')=>({id:'determinants-'+n,topicId:'t04',lessonId:'t04-e06',prompt,correct:'correct',options:choices.map(([text,feedback],i)=>({id:i?'wrong-'+i:'correct',text,feedback})),explanation,hint,source});
export const determinantQuestions=[
 q('01',tex`Para \(A=\begin{pmatrix}a&b\\c&d\end{pmatrix}\), ¿cuál es su determinante?`,[
 [tex`\(ad-bc\)`,'Producto de la diagonal principal menos el de la secundaria.'],[tex`\(ab-cd\)`,'Eso utiliza productos de filas.'],[tex`\(ac-bd\)`,'Eso utiliza productos de columnas.'],[tex`\(a+b+c+d\)`,'No se suman las cuatro entradas.']],
 'El determinante de orden 2 es ad−bc. El resultado es un número, no otra matriz.','Identifica las dos diagonales.','Adaptación de T4.4 del banco local'),
 q('02',tex`Calcula \(\begin{vmatrix}3&-2\\4&1\end{vmatrix}\).`,[
 ['11','3·1−(−2)·4=3−(−8)=11.'],['−5','Has sumado −8 en vez de restarlo.'],['5','No se resta el primer producto al segundo ni se toma valor absoluto.'],['−11','Has invertido el orden de la resta.']],
 'El producto de la diagonal secundaria es −8. Restarlo suma 8. Conserva los paréntesis.','Escribe primero 3−(−8).'),
 q('03',tex`Para \(A=\begin{pmatrix}1&2&3\\0&-1&4\\2&1&0\end{pmatrix}\), Sarrus da P=16 y Q=−2. ¿Cuánto vale det(A)?`,[
 ['18','P−Q=16−(−2)=18.'],['14','Se debe restar Q, no sumarlo.'],['−18','Se ha calculado Q−P.'],['−32','No se multiplican los grupos P y Q.']],
 'Los tres productos del primer grupo suman 16; los del segundo suman −2. Los nombres de los grupos indican si se suman o restan, no el signo de sus valores.','Resta la suma completa del segundo grupo.'),
 q('04','Si A es cuadrada y det(A)=0, ¿qué conclusión es segura?',[
 ['A no tiene inversa.','El determinante nulo impide la invertibilidad.'],['A tiene inversa.','Una matriz cuadrada tiene inversa si y solo si su determinante es no nulo.'],['A es necesariamente la matriz nula.','Hay matrices no nulas con filas proporcionales y determinante cero.'],['Todo sistema Av=b carece de solución.','Según b, puede haber infinitas soluciones o ninguna.']],
 'El determinante cero indica que A no es invertible. No determina por sí solo todos sus elementos ni la compatibilidad de Av=b.','Distingue la matriz de su determinante.','Adaptación de T4.5 del banco local'),
 q('05',tex`¿Para qué valores de k NO tiene inversa \(A(k)=\begin{pmatrix}k&2\\3&k-1\end{pmatrix}\)?`,[
 ['k=3 o k=−2','det(A)=k²−k−6=(k−3)(k+2).'],['Solo k=3','Falta la otra raíz del determinante.'],['k=−3 o k=2','Estos valores corresponden a una factorización con signos incorrectos.'],['Para todos los valores de k','Fuera de las dos raíces, el determinante es distinto de cero.']],
 'Se anula k(k−1)−6. Al factorizar, (k−3)(k+2)=0, luego k=3 o k=−2. Para cualquier otro valor real sí tiene inversa.','Busca cuándo el determinante vale cero.'),
 q('06','Una matriz A tiene orden 2×3. ¿Qué podemos decir de su determinante en este curso?',[
 ['No está definido porque A no es cuadrada.','El determinante se asigna a matrices cuadradas.'],['Vale cero.','No estar definido no equivale a valer cero.'],['Se calcula con Sarrus añadiendo una fila de ceros.','Eso crea una matriz diferente.'],['Es la suma de los seis elementos.','Esa suma no define un determinante.']],
 'La condición de orden cuadrado se comprueba antes de aplicar fórmulas. No se completa la matriz para asignarle un determinante.','Cuenta filas y columnas antes de operar.')
];
export const determinantCards=[
 {id:'fc-determinants-01',front:'¿Qué es el determinante y cómo se escribe?',back:tex`Es un número asociado a una matriz cuadrada: \(\det(A)\) o \(|A|\). En esta notación, las barras de una matriz significan determinante, no valor absoluto. Puede ser negativo.`},
 {id:'fc-determinants-02',front:'¿Cómo se calcula en orden 2?',back:tex`\(\begin{vmatrix}a&b\\c&d\end{vmatrix}=ad-bc\). Conserva los signos dentro de cada producto y resta el segundo completo.`},
 {id:'fc-determinants-03',front:'¿Qué calcula Sarrus?',back:tex`Solo el determinante de orden 3: para filas (a,b,c), (d,e,f), (g,h,i), \(aei+bfg+cdh-ceg-afh-bdi\). Se restan los tres últimos productos con sus signos.`},
 {id:'fc-determinants-04',front:'¿Cómo se relaciona con la inversa?',back:tex`Para A cuadrada, tiene inversa si y solo si \(\det(A)\ne0\). Un determinante negativo también permite inversa. Si vale cero, A puede ser no nula.`},
 {id:'fc-determinants-05',front:'¿Cómo se estudia una matriz con parámetro?',back:'Calcula el determinante como expresión del parámetro y resuelve cuándo se anula. Esos valores impiden la inversa; en los demás, la matriz cuadrada es invertible.'},
 {id:'fc-determinants-06',front:'¿Qué anticipa para rango y sistemas?',back:'En orden n, determinante no nulo implica rango n y una única solución de Av=b para cada b. Si es cero, el rango es menor que n; puede haber ninguna o infinitas soluciones según b. No decide cuál de esos dos casos ocurre.'}
].map(c=>({...c,topicId:'t04',lessonId:'t04-e06'}));

const tex=String.raw;
const q=(n,prompt,choices,explanation,hint)=>({id:'matrix-power-'+n,topicId:'t04',lessonId:'t04-e04',prompt,correct:'correct',options:choices.map(([text,feedback],i)=>({id:i?'wrong-'+i:'correct',text,feedback})),explanation,hint,source:'Elaboración propia; guion 4.4 y concepto 8 de tarjetas del tema 4'});
export const matrixPowerQuestions=[
 q('01','¿Para qué matrices está definida la sucesión A⁰, A¹, A²,… de esta lección?',[
 ['Para matrices cuadradas.','Las columnas de A deben coincidir con sus filas para poder calcular AA.'],['Para cualquier matriz rectangular.','Si no es cuadrada, AA no es compatible.'],['Solo para matrices diagonales.','Ser diagonal facilita el cálculo, pero no es necesario.'],['Solo para matrices invertibles.','Las potencias no negativas no requieren inversa.']],
 'La misma base se multiplica por sí misma. Para que AA exista, A debe ser cuadrada. Las potencias negativas necesitan otras condiciones y no se estudian aquí.','Comprueba las dimensiones interiores de AA.'),
 q('02',tex`Si \(A=\begin{pmatrix}1&2\\3&0\end{pmatrix}\), ¿cuál es A²?`,[
 [tex`\(\begin{pmatrix}7&2\\3&6\end{pmatrix}\)`,'Cada entrada es un producto fila por columna.'],[tex`\(\begin{pmatrix}1&4\\9&0\end{pmatrix}\)`,'Eso eleva las entradas al cuadrado; no calcula AA.'],[tex`\(\begin{pmatrix}2&4\\6&0\end{pmatrix}\)`,'Eso calcula 2A, no A².'],[tex`\(\begin{pmatrix}1&0\\0&1\end{pmatrix}\)`,'La identidad es A⁰, no necesariamente A².']],
 'AA tiene entradas 1·1+2·3=7, 1·2+2·0=2, 3·1+0·3=3 y 3·2+0·0=6.','Elevar una matriz al cuadrado es multiplicarla por sí misma.'),
 q('03',tex`Para \(S=\begin{pmatrix}0&1\\1&0\end{pmatrix}\), con \(S^2=I\), ¿cuánto vale \(S^{25}\)?`,[
 ['S','25=2·12+1: doce pares dan I y queda un factor S.'],['I','Eso ocurre con exponentes pares.'],['25S','La potencia no es un producto por el exponente.'],['O','Ninguna potencia de S se anula.']],
 'Las potencias alternan: S⁰=I, S¹=S, S²=I, S³=S. Por tanto S²⁵=S.','Agrupa los factores de dos en dos.'),
 q('04','Para A y B cuadradas del mismo orden, ¿qué expansión es siempre válida?',[
 [tex`\((A+B)^2=A^2+AB+BA+B^2\)`,'Se distribuye conservando el orden.'],[tex`\((A+B)^2=A^2+2AB+B^2\)`,'Requiere AB=BA para reunir los términos cruzados.'],[tex`\((A+B)^2=A^2+B^2\)`,'Faltan los términos cruzados.'],[tex`\((AB)^2=A^2B^2\)`,'ABAB no se puede reordenar libremente como AABB.']],
 'La distributividad da (A+B)(A+B)=AA+AB+BA+BB. En general AB y BA son distintos.','Expande sin intercambiar ningún factor.'),
 q('05',tex`Sea \(N=\begin{pmatrix}0&1\\0&0\end{pmatrix}\), con \(N^2=O\). ¿Qué pareja de valores es correcta?`,[
 [tex`\(N^0=I,\quad N^5=O\)`,'El exponente cero da identidad; a partir del segundo, todas las potencias son nulas.'],[tex`\(N^0=O,\quad N^5=O\)`,'La primera igualdad confunde exponente cero con matriz nula.'],[tex`\(N^0=I,\quad N^5=N\)`,'N²=O no produce alternancia con N.'],[tex`\(N^0=N,\quad N^5=5N\)`,'N¹=N; multiplicar por 5 no es elevar a la quinta.']],
 'N⁰ se define como I. Para n≥2, Nⁿ=N²Nⁿ⁻²=O. N es no nula pero sus potencias pueden anularse.','Separa los casos n=0, n=1 y n≥2.'),
 q('06',tex`Un modelo usa \(T=\begin{pmatrix}1&1\\0&1\end{pmatrix}\), \(v_0=\begin{pmatrix}10\\3\end{pmatrix}\) y \(v_{k+1}=Tv_k\). La primera componente es la cantidad y la segunda su incremento fijo por paso. ¿Cuál es \(v_5\)?`,[
 [tex`\(\begin{pmatrix}25\\3\end{pmatrix}\)`,'Se añaden 3 unidades cinco veces; el incremento sigue siendo 3.'],[tex`\(\begin{pmatrix}15\\3\end{pmatrix}\)`,'Se añaden 3 por paso, no 1.'],[tex`\(\begin{pmatrix}50\\15\end{pmatrix}\)`,'Eso es 5v₀; no aplica cinco veces T.'],[tex`\(\begin{pmatrix}25\\15\end{pmatrix}\)`,'La segunda componente representa el incremento constante y no se acumula.']],
 'T⁵ tiene primera fila (1,5) y segunda (0,1). Al multiplicar por v₀ se obtiene (10+5·3,3)ᵀ=(25,3)ᵀ. El modelo supone incremento constante.','Calcula primero v₁ y observa qué componente permanece fija.')
];
export const matrixPowerCards=[
 {id:'fc-matrix-power-01',front:'¿Qué significan A⁰, A¹ y Aⁿ?',back:tex`Para A cuadrada de orden r: \(A^0=I_r\), \(A^1=A\) y, si n≥1, \(A^n\) es el producto de n factores A. No se elevan las entradas por separado.`},
 {id:'fc-matrix-power-02',front:'¿Qué leyes se cumplen para una misma base?',back:tex`Para exponentes enteros no negativos, \(A^mA^n=A^{m+n}\) y \((A^m)^n=A^{mn}\). También \(A^{n+1}=A^nA\). No se exige que A tenga inversa.`},
 {id:'fc-matrix-power-03',front:'¿Cómo se eleva una diagonal?',back:tex`Si \(D=\operatorname{diag}(d_1,\ldots,d_r)\), para n≥1 se elevan sus entradas diagonales: \(D^n=\operatorname{diag}(d_1^n,\ldots,d_r^n)\). Para n=0 se toma I, incluso con ceros en la diagonal.`},
 {id:'fc-matrix-power-04',front:'¿Qué patrones producen A²=I, A²=A y A²=O?',back:'A²=I: potencias pares I e impares A. A²=A: todas las potencias positivas son A. A²=O: todas las potencias desde la segunda son O. En los tres casos A⁰=I.'},
 {id:'fc-matrix-power-05',front:'¿Se aplica sin cambios el cuadrado de una suma?',back:tex`\((A+B)^2=A^2+AB+BA+B^2\). Solo se reúnen los términos cruzados como 2AB cuando AB=BA. Tampoco \((AB)^n=A^nB^n\) es una regla general.`},
 {id:'fc-matrix-power-06',front:'¿Cómo se modela una transformación repetida?',back:tex`Si \(v_{k+1}=Av_k\) con la misma matriz en cada paso, entonces \(v_n=A^nv_0\). Para n=0 se recupera el estado inicial. Si la transformación cambia en cada paso, no se sustituye sin más por una potencia.`}
].map(c=>({...c,topicId:'t04',lessonId:'t04-e04'}));

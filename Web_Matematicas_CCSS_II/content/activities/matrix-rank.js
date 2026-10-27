const tex=String.raw;
const q=(n,prompt,choices,explanation,hint,source='Elaboración propia; guion 4.10')=>({id:'matrix-rank-'+n,topicId:'t04',lessonId:'t04-e10',prompt,correct:'correct',options:choices.map(([text,feedback],i)=>({id:i?'wrong-'+i:'correct',text,feedback})),explanation,hint,source});
export const rankQuestions=[
 q('01','¿Qué mide el rango de una matriz?',[
 ['El máximo número de filas linealmente independientes, que coincide con el máximo de columnas independientes.','Ambas definiciones dan el mismo número.'],
 ['El número de columnas siempre.','Algunas columnas pueden ser dependientes.'],
 ['Su determinante.','El rango es un entero no negativo y también existe para rectangulares.'],
 ['La suma de sus entradas.','Esa suma no mide independencia.']],
 'El rango mide independencia lineal. Para una matriz m×n está entre 0 y min(m,n).','Piensa en cuántas filas aportan información independiente.','Adaptación de T4.9 del banco local'),
 q('02','A tiene orden 3, det(A)=0 y un menor de orden 2 vale −5. ¿Cuál es su rango?',[
 ['2','El menor no nulo da rango al menos 2 y el determinante cero impide rango 3.'],
 ['3','El determinante de orden 3 es cero.'],
 ['1','Un menor de orden 2 no nulo descarta rango 1.'],
 ['−5','El valor del menor no es el rango.']],
 'Las dos cotas coinciden: 2≤rg(A)<3, luego rg(A)=2.','Combina el orden del menor no nulo con el determinante completo.'),
 q('03',tex`¿Cuál es el rango de \(\begin{pmatrix}1&2&3\\2&4&6\end{pmatrix}\)?`,[
 ['1','La segunda fila es el doble de la primera y esta no es nula.'],
 ['2','Las dos filas no son independientes.'],
 ['3','El rango no puede superar el número de filas.'],
 ['No está definido por ser rectangular.','El determinante completo no está definido, pero el rango sí.']],
 'Los tres menores 2×2 se anulan y hay entradas no nulas. Por reducción queda una única fila no nula.','Compara las dos filas antes de calcular.'),
 q('04',tex`Si \(P(t)=\begin{pmatrix}1&1&1\\1&t&1\\1&1&t\end{pmatrix}\), ¿qué rango tiene cuando t=1?`,[
 ['1','Quedan tres filas iguales y no nulas.'],['2','Un determinante 3×3 nulo no obliga a rango 2.'],['3','Las filas no son independientes cuando t=1.'],['0','Hay entradas iguales a 1.']],
 'Para t=1 todas las filas son (1,1,1), así que basta una. Para t≠1 el determinante (t−1)² es no nulo y el rango es 3.','Sustituye el parámetro en las filas originales.'),
 q('05','¿Qué operación puede cambiar el rango y no se admite como operación elemental reversible?',[
 ['Multiplicar una fila por cero.','Puede borrar una fila independiente.'],
 ['Intercambiar dos filas.','Se puede deshacer intercambiándolas de nuevo.'],
 ['Multiplicar una fila por −2.','El factor es no nulo y se puede deshacer.'],
 ['Sumar a una fila tres veces otra, conservando la de origen.','Se deshace restando ese múltiplo.']],
 'Multiplicar por cero puede perder información. Los factores de escala deben ser distintos de cero para conservar el rango.','Busca la operación que no se puede deshacer.'),
 q('06','Un sistema tiene 3 incógnitas y rg(A)=rg(A|b)=2. ¿Cómo se clasifica?',[
 ['Compatible indeterminado: infinitas soluciones.','Los rangos coinciden pero son menores que el número de incógnitas.'],
 ['Compatible determinado: solución única.','Para solución única los rangos deberían valer 3.'],
 ['Incompatible: ninguna solución.','La incompatibilidad requiere rangos distintos.'],
 ['No puede saberse sin conocer el número de ecuaciones.','Los rangos y el número de incógnitas ya permiten clasificarlo.']],
 'Rouché-Frobenius: rangos iguales garantizan compatibilidad. Si además son menores que el número de incógnitas, hay infinitas soluciones.','Compara primero los rangos y después compáralos con 3.')
];
export const rankCards=[
 {id:'fc-rank-01',front:'¿Qué es el rango y qué límites tiene?',back:tex`Máximo número de filas o columnas independientes. Para A de tamaño m×n, \(0\le\operatorname{rg}(A)\le\min(m,n)\). También existe para rectangulares.`},
 {id:'fc-rank-02',front:'¿Cómo se justifica el rango por menores?',back:'Encuentra un menor no nulo de orden r y descarta órdenes superiores. Las filas y columnas seleccionadas no necesitan ser consecutivas. Un solo menor nulo no basta.'},
 {id:'fc-rank-03',front:'¿Qué se cuenta al reducir por filas?',back:'Los pivotes o filas no nulas de una forma escalonada. Contar filas no nulas antes de escalonar puede contar dependencias como si fueran información nueva.'},
 {id:'fc-rank-04',front:'¿Qué operaciones conservan el rango?',back:'Intercambiar filas, escalar una por un número no nulo y sumar un múltiplo de otra conservando el origen. Con parámetros, separa los casos que anulan un divisor.'},
 {id:'fc-rank-05',front:'¿Qué dice det(A)=0 sobre el rango?',back:'Si A es cuadrada de orden n, su rango es menor que n; no necesariamente n−1. Si det(A)≠0, el rango es n y A tiene inversa. Rango 0 equivale a matriz nula.'},
 {id:'fc-rank-06',front:'¿Cómo se relacionan los rangos con un sistema de n incógnitas?',back:tex`Rangos distintos de A y (A|b): incompatible. Rangos iguales a n: solución única. Rangos iguales y menores que n: infinitas soluciones.`}
].map(c=>({...c,topicId:'t04',lessonId:'t04-e10'}));

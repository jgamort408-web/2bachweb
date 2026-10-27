const tex=String.raw;
const q=(n,prompt,choices,explanation,hint)=>({id:'det-exp-'+n,topicId:'t04',lessonId:'t04-e08',prompt,correct:'correct',options:choices.map(([text,feedback],i)=>({id:i?'wrong-'+i:'correct',text,feedback})),explanation,hint,source:'Elaboración propia a partir del guion local 4.8'});
export const expansionQuestions=[
 q('01','¿Qué es el menor complementario M₂₃?',[
 ['El determinante de la submatriz que queda al eliminar la fila 2 y la columna 3.','Se eliminan ambas y se calcula un número.'],
 ['El elemento situado en la fila 2 y columna 3.','Ese es a₂₃.'],
 ['La submatriz restante, sin calcular su determinante.','La submatriz es el paso previo; el menor es su determinante.'],
 ['El determinante de toda A cambiado de signo.','Debe calcularse un determinante de orden menor.']],
 'Mᵢⱼ es un número obtenido al eliminar la fila i y la columna j y calcular el determinante restante.','Distingue matriz y determinante.'),
 q('02','Si M₂₃=−3, ¿cuál es el adjunto C₂₃?',[
 ['3','El signo de posición es −: −(−3)=3.'],['−3','Falta el signo (−1)⁵.'],['−6','Los índices no multiplican al menor.'],['5','La suma de índices determina la paridad, no el valor del adjunto.']],
 'C₂₃=(−1)⁵M₂₃=−(−3)=3.','Comprueba si 2+3 es par o impar.'),
 q('03','Si a₁₂=2 y M₁₂=−8, ¿cuánto aporta esa posición al desarrollo por la primera fila?',[
 ['16','C₁₂=8 y 2·8=16.'],['8','Es el adjunto, pero falta multiplicar por a₁₂.'],['−16','Falta el signo de posición negativo.'],['−8','Ese es el menor, no la aportación.']],
 'La aportación es a₁₂C₁₂=2·(−1)³·(−8)=16.','Primero calcula el adjunto y después multiplica por el elemento.'),
 q('04','En una matriz de orden 4, la fila 1 es (0, 2, 0, 0) y M₁₂=18. ¿Cuánto vale su determinante?',[
 ['−36','Solo aporta 2·(−18).'],['36','La posición (1,2) tiene signo negativo.'],['18','Falta el elemento 2 y el signo.'],['0','Tres ceros simplifican el cálculo; no anulan necesariamente la fila completa.']],
 'El único término no nulo es a₁₂C₁₂=2·(−1)³·18=−36.','La posición no nula es (1,2).'),
 q('05','¿Qué afirmación sobre elegir una línea para desarrollar es correcta?',[
 ['Cualquier fila o columna sirve; muchos ceros suelen ahorrar trabajo.','Cada línea completa produce el mismo determinante.'],
 ['Solo sirve la primera fila.','Laplace se aplica a cualquier fila o columna.'],
 ['Se pueden mezclar elementos de distintas filas con cualquier adjunto.','Cada elemento debe ir con su propio adjunto y todos deben pertenecer a una línea.'],
 ['Sarrus se aplica directamente a cualquier orden.','Sarrus solo vale para orden 3.']],
 'Elegir otra línea cambia las operaciones intermedias, pero no el resultado. Un coeficiente cero aporta cero aunque su menor no lo sea.','Distingue validez del método y comodidad del cálculo.'),
 q('06',tex`Si \(\det(P(t))=-3t-2\), ¿para qué valor de t se anula?`,[
 [tex`\(-\frac23\)`,'Resolver −3t=2 da t=−2/3.'],[tex`\(\frac23\)`,'El signo de t debe ser negativo.'],['−2','Sustituir t=−2 da 4.'],['0','Sustituir t=0 da −2.']],
 'Un determinante con parámetro se anula al resolver la ecuación que iguala su expresión a cero.','Despeja t en −3t−2=0.')
];
export const expansionCards=[
 {id:'fc-det-exp-01',front:'¿Cómo se obtiene Mᵢⱼ?',back:'Elimina la fila i y la columna j conservando el orden de las restantes. El determinante de esa submatriz es el menor complementario.'},
 {id:'fc-det-exp-02',front:'¿Cómo se obtiene el adjunto Cᵢⱼ?',back:tex`\(C_{ij}=(-1)^{i+j}M_{ij}\). El signo de posición es + para suma par y − para suma impar. El menor puede ser negativo.`},
 {id:'fc-det-exp-03',front:'¿Cómo se desarrolla por la fila i?',back:tex`\(\det(A)=\sum_j a_{ij}C_{ij}\). Usa una fila completa y cada elemento con su propio adjunto.`},
 {id:'fc-det-exp-04',front:'¿Cómo se desarrolla por la columna j?',back:tex`\(\det(A)=\sum_i a_{ij}C_{ij}\). El resultado coincide con el desarrollo por cualquier otra columna o fila.`},
 {id:'fc-det-exp-05',front:'¿Qué aporta un elemento cero?',back:'Su producto por el adjunto es cero, aunque el menor no sea cero. Elegir una línea con muchos ceros reduce los menores que necesitas calcular.'},
 {id:'fc-det-exp-06',front:'¿Cómo bajas de orden 4 a orden 3?',back:'Desarrolla por una fila o columna. Cada menor tiene orden 3 y puede calcularse por Sarrus o por otro desarrollo. No apliques Sarrus directamente a orden 4.'}
].map(c=>({...c,topicId:'t04',lessonId:'t04-e08'}));

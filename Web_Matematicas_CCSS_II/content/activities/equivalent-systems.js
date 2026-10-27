const tex=String.raw;
const q=(n,prompt,choices,explanation,hint,source='Elaboración propia; guion 5.5')=>({id:'equivalence-'+n,topicId:'t05',lessonId:'t05-e05',prompt,correct:'correct',options:choices.map(([text,feedback],i)=>({id:i?'wrong-'+i:'correct',text,feedback})),explanation,hint,source});
export const equivalenceQuestions=[
 q('01','¿Cuándo son equivalentes dos sistemas con las mismas incógnitas y dominio?',[
 ['Cuando tienen exactamente el mismo conjunto solución.','La igualdad de conjuntos exige coincidencia en ambos sentidos.'],['Cuando tienen el mismo número de ecuaciones.','La forma no determina las soluciones.'],['Cuando ambos son SCD.','Pueden tener soluciones únicas distintas.'],['Cuando comparten al menos una solución.','Compartir una tupla no garantiza compartirlas todas.']],
 'Toda solución del primero debe serlo del segundo y viceversa.','Piensa en conjuntos, no en el aspecto de las ecuaciones.','Adaptación de tarjeta local 7; guion 5.5'),
 q('02',tex`En \(\begin{cases}x+y=3\\2x-y=0\end{cases}\), aplica \(F_2\leftarrow F_2-2F_1\). ¿Qué queda?`,[
 [tex`\(\begin{cases}x+y=3\\-3y=-6\end{cases}\)`,'También se calcula 0−2·3=−6 en el término independiente.'],[tex`\(\begin{cases}x+y=3\\-3y=0\end{cases}\)`,'Has transformado coeficientes, pero no el término independiente.'],[tex`\(\begin{cases}x+y=3\\3y=-6\end{cases}\)`,'El coeficiente de y es −1−2·1=−3.'],[tex`\(\begin{cases}x+y=3\\-3x=-6\end{cases}\)`,'La operación elimina x, no y.']],
 'La primera fila se conserva. La segunda es (2,−1|0)−2(1,1|3)=(0,−3|−6).','Opera con la fila ampliada completa.'),
 q('03','¿Qué transformación garantiza equivalencia sin condiciones adicionales?',[
 ['Multiplicar una ecuación completa por −2.','El factor es no nulo y se puede dividir por −2 para recuperarla.'],['Multiplicar una ecuación por cero.','Puede borrarse una condición.'],['Eliminar cualquier ecuación.','Puede perderse información necesaria.'],['Cambiar solo los coeficientes de una fila.','El término independiente también forma parte de la ecuación.']],
 'Intercambiar filas, escalar por un número no nulo y sumar a una fila un múltiplo de otra son reversibles.','Busca una operación que tenga inversa.','Adaptación conceptual de T5.5 y tarjeta local 8'),
 q('04',tex`Tras \(F_2\leftarrow F_2+3F_1\), con F₁ conservada, ¿qué operación recupera la segunda fila original?`,[
 [tex`\(F_2\leftarrow F_2-3F_1\).`,'Se resta el mismo múltiplo que se había sumado.'],[tex`\(F_1\leftarrow F_1-3F_2\).`,'Modifica la fila equivocada.'],[tex`\(F_2\leftarrow3F_2\).`,'Escalar no deshace esa suma.'],[tex`\(F_2\leftarrow F_2+3F_1\).`,'Repetir la suma añade otro múltiplo.']],
 'Conservar la fila de origen permite deshacer la operación sobre la fila de destino.','Mantén destino y origen; cambia el signo del factor.'),
 q('05',tex`Se sustituye \(x=1,\ y=2\) por \(x+y=3,\ 2x+2y=6\). ¿Son equivalentes?`,[
 ['No: se ha perdido una condición y aparecen soluciones nuevas.','(0,3) cumple el segundo sistema, pero no el primero.'],['Sí: (1,2) cumple ambos.','Ese punto común no demuestra igualdad de los conjuntos.'],['Sí: ambos tienen dos ecuaciones.','Las nuevas ecuaciones repiten la misma información.'],['No: el segundo sistema es incompatible.','Por ejemplo, (0,3) sí es solución del segundo.']],
 'No toda combinación simultánea de ecuaciones es reversible. El primero solo admite (1,2); el segundo admite (t,3−t).','Busca una pareja que cumpla solo uno de los sistemas.'),
 q('06',tex`¿Se puede dividir la ecuación \(ax+ay=a\) entre a para todo valor real del parámetro?`,[
 ['Solo si a≠0; el caso a=0 debe estudiarse aparte.','Con a=0 queda 0=0, no x+y=1.'],['Sí, porque a aparece en todos los términos.','Cancelar un factor que puede ser cero puede perder soluciones.'],['Nunca, ni siquiera si a=2.','Con factor no nulo la división es reversible.'],['Sí, y a=0 implica x=y=0.','La igualdad 0=0 no fija las incógnitas.']],
 'Para a≠0 la ecuación equivale a x+y=1. Para a=0 no impone restricciones. El tratamiento general de parámetros llegará en 5.11.','Comprueba qué ocurre al sustituir a=0.')
];
export const equivalenceCards=[
 {id:'fc-equivalence-01',front:'¿Qué significa que dos sistemas sean equivalentes?',back:'Que tienen el mismo conjunto de soluciones, con las mismas incógnitas y dominio. La implicación debe funcionar en los dos sentidos.'},
 {id:'fc-equivalence-02',front:'¿Por qué se pueden intercambiar ecuaciones?',back:'El orden no cambia que todas deban cumplirse a la vez. Repetir el mismo intercambio recupera el sistema inicial.'},
 {id:'fc-equivalence-03',front:'¿Qué condición exige multiplicar una ecuación?',back:'Multiplicar todos sus términos, incluido el independiente, por un escalar no nulo. La operación inversa divide entre ese mismo escalar.'},
 {id:'fc-equivalence-04',front:'¿Cómo se suma un múltiplo de otra ecuación?',back:tex`Se reemplaza \(F_i\) por \(F_i+kF_j\), con i≠j y conservando \(F_j\). La inversa resta \(kF_j\). k puede ser cero, aunque entonces la fila no cambia.`},
 {id:'fc-equivalence-05',front:'¿Por qué operar sobre la matriz ampliada?',back:'Porque los términos independientes deben sufrir las mismas operaciones que los coeficientes. Operar solo sobre A suele cambiar el sistema.'},
 {id:'fc-equivalence-06',front:'¿Tener el mismo tipo SCD, SCI o SI demuestra equivalencia?',back:'Ser SCD o SCI no basta: pueden tener soluciones distintas. Dos sistemas SI con las mismas incógnitas y dominio sí tienen el mismo conjunto vacío. Compartir solo una solución tampoco demuestra equivalencia.'}
].map(c=>({...c,topicId:'t05',lessonId:'t05-e05'}));

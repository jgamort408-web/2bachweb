const tex=String.raw;
const q=(id,prompt,choices,explanation,hint)=>({id:'opt-'+id,lessonId:'t02-e09',topicId:'t02',prompt,correct:'right',
  options:choices.map(([text,feedback],i)=>({id:i?'wrong-'+i:'right',text,feedback})),explanation,hint,source:'Guion 2.9, T2.6 y T2.9, con ejemplos propios'});
export const optimizationQuestions=[
  q('01',tex`Para una función continua en \([a,b]\) y derivable en \((a,b)\), ¿qué candidatos comparas para hallar extremos absolutos?`,[
    [tex`Los extremos a,b y todos los puntos interiores donde \(f\prime=0\).`,'Hay que comparar valores, incluidos los de la frontera.'],
    [tex`Solo los puntos donde \(f\prime=0\).`,'El mejor valor puede estar en un extremo del intervalo.'],
    ['Solo a y b.','Puede existir un extremo absoluto interior.'],
    [tex`Solo los puntos donde \(f\prime\prime=0\).`,'No es el criterio para obtener todos los candidatos.']],
    'La continuidad en el intervalo cerrado garantiza que se alcanzan máximo y mínimo. Un extremo interior derivable debe tener derivada cero; después se comparan todos los valores candidatos.', 'Distingue candidatos interiores y frontera del dominio.'),
  q('02',tex`Si q se mide en toneladas, \(R(q)=q(50-q)\) y \(C(q)=10q+100\) se miden en euros y \(0\le q\le24\), ¿qué producción maximiza el beneficio?`,[
    ['20 toneladas.',tex`El beneficio es \(-q^2+40q-100\) y su derivada se anula en 20.`],
    ['25 toneladas.','Maximizar el ingreso no equivale a maximizar el beneficio; además 25 excede la capacidad.'],
    ['24 toneladas.','El beneficio disminuye entre 20 y 24.'],
    ['0 toneladas.','El coste fijo da un beneficio de −100 en cero.']],
    tex`\(B\prime(q)=40-2q=0\) da \(q=20\). Los candidatos valen \(B(0)=-100\), \(B(20)=300\) y \(B(24)=284\); el máximo es 300 € en 20 t.`, 'Resta costes a ingresos antes de derivar.'),
  q('03',tex`Para \(B(q)=-q^2+40q-100\), en euros, con producción q en toneladas y dominio \(0\le q\le8\), ¿cuál es el máximo factible?`,[
    [tex`156 € en \(q=8\).`,tex`La función crece durante todo \([0,8]\).`],
    [tex`300 € en \(q=20\).`,'La producción 20 no pertenece al dominio factible.'],
    [tex`−100 € en \(q=0\).`,'Es menor que el beneficio en 8.'],
    [tex`No existe máximo porque \(B\prime\) no se anula en \([0,8]\).`,'Un máximo puede estar en el extremo del intervalo.']],
    tex`\(B\prime(q)=40-2q>0\) en \([0,8]\). El máximo está en la frontera: \(B(8)=-64+320-100=156\) €.`, 'Comprueba la restricción antes de aceptar el punto estacionario.'),
  q('04',tex`Si \(B(q)=-q^2+25q-100\) y solo se permiten toneladas enteras entre 0 y 16, ¿qué cantidades maximizan B?`,[
    ['12 y 13 toneladas, ambas con 56 €.','El máximo continuo está exactamente entre esos dos enteros.'],
    ['Solo 12,5 toneladas.','No es una cantidad admitida en el problema discreto.'],
    ['Solo 13 porque siempre se redondea hacia arriba.','Hay que comparar, y 12 da el mismo beneficio.'],
    ['16 toneladas.','El beneficio ya ha descendido tras el vértice.']],
    tex`El vértice continuo es 12,5. \(B(12)=56\) y \(B(13)=56\); por concavidad son los máximos enteros, y ambos son admisibles.`, 'Evalúa los dos enteros vecinos del vértice.'),
  q('05',tex`El coste total es \(C(q)=q^2+100\) para \(q>0\). ¿Qué q minimiza el coste medio \(\frac{C(q)}{q}\)?`,[
    [tex`\(q=10\), con coste medio 20 €/unidad.`,tex`La derivada de \(q+\frac{100}{q}\) cambia de negativa a positiva en 10.`],
    [tex`\(q=0\), con coste medio 100 €.`,'No se puede dividir entre cero, y el coste medio no es el total.'],
    [tex`\(q=100\), con coste medio 1 €/unidad.`,'El término q también forma parte del coste medio.'],
    ['No hay mínimo porque el coste total siempre crece.','El coste medio es otra función objetivo.']],
    tex`\(M(q)=q+\frac{100}{q}\) y \(M\prime(q)=1-\frac{100}{q^2}\). En \(q>0\) se anula solo en 10; \(M(10)=20\). Además, \(M(q)-20=\frac{(q-10)^2}{q}\ge0\) para todo \(q>0\), con igualdad sólo en 10: el mínimo es absoluto.`, 'Escribe primero qué magnitud se quiere minimizar.'),
  q('06',tex`Una ecuación de puntos críticos produce \(q=-3\), pero q representa una cantidad producida no negativa. ¿Qué haces?`,[
    ['Descartarlo como solución del problema y estudiar los candidatos admisibles.','La solución algebraica no cumple la restricción.'],
    ['Aceptarlo si la segunda derivada es negativa.','El tipo de extremo no corrige un dominio incompatible.'],
    [tex`Cambiarlo a \(q=3\) sin más.`,'Cambiar el signo no preserva la ecuación ni el óptimo.'],
    ['Concluir que el problema no tiene solución.','Todavía puede haber un óptimo en otros candidatos o en la frontera.']],
    'La optimización contextual exige comprobar el dominio. Un punto fuera de él no se acepta; hay que revisar los candidatos restantes y los extremos incluidos.', 'La interpretación de la variable es una restricción matemática.'),
];
export const optimizationCards=[
  {id:'fc-opt-01',front:'¿Qué defines antes de derivar en un problema de optimización?',back:'La variable con sus unidades, la función objetivo y el dominio factible. Usa las restricciones para expresar la función con una sola variable cuando sea posible.'},
  {id:'fc-opt-02',front:'¿Qué candidatos debes revisar en un intervalo cerrado?',back:'Si la función es continua, compara extremos del intervalo y puntos críticos interiores: derivada cero o no existente. Si hay tramos, revisa también las uniones que pertenezcan al dominio.'},
  {id:'fc-opt-03',front:tex`¿Basta con resolver \(f\prime=0\) para obtener el máximo?`,back:'No. Son candidatos, pueden quedar fuera del dominio, ser mínimos o no ser extremos. Justifica con monotonía, segunda derivada cuando proceda y comparación de valores, incluida la frontera.'},
  {id:'fc-opt-04',front:'¿Cómo distingues ingreso, beneficio y coste medio?',back:tex`Ingreso \(R(q)=q\,p(q)\), beneficio \(B(q)=R(q)-C(q)\), coste medio \(M(q)=\frac{C(q)}{q}\) para \(q>0\). Cada pregunta determina una función objetivo distinta.`},
  {id:'fc-opt-05',front:'¿Cómo pasas de un óptimo continuo a cantidades enteras?',back:'Comprueba los enteros admisibles y sus valores. Para una parábola estrictamente cóncava sobre los enteros de un intervalo factible, compara los vecinos del vértice que sean admisibles y las fronteras enteras; puede haber empate. No es una regla universal de redondeo para cualquier función.'},
  {id:'fc-opt-06',front:'¿Cómo debe terminar una solución de optimización?',back:'Indica la cantidad óptima, el valor de la función, sus unidades y por qué es factible y óptima. Un beneficio máximo puede ser negativo; un intervalo abierto no garantiza que se alcancen los extremos.'},
].map(card=>({...card,topicId:'t02',lessonId:'t02-e09'}));

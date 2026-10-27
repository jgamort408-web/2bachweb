const tex=String.raw;
const q=(n,prompt,choices,explanation,hint,source='Elaboración propia; guion 5.3')=>({id:'classification-'+n,topicId:'t05',lessonId:'t05-e03',prompt,correct:'correct',options:choices.map(([text,feedback],i)=>({id:i?'wrong-'+i:'correct',text,feedback})),explanation,hint,source});
export const classificationQuestions=[
 q('01','Un sistema lineal real tiene exactamente una solución. ¿Cómo se clasifica?',[
 ['SCD: compatible determinado.','Existe solución y es única.'],['SCI: compatible indeterminado.','SCI significa infinitas soluciones.'],['SI: incompatible.','SI significa ninguna solución.'],['No puede clasificarse sin saber cuántas ecuaciones tiene.','La clasificación depende del conjunto solución.']],
 'Compatible significa que existe al menos una solución; determinado añade que es única.','Distingue existencia de unicidad.','Adaptación conceptual del test local T5.1'),
 q('02',tex`¿Cómo se clasifica \(\begin{cases}x-y=2\\2x-2y=5\end{cases}\)?`,[
 ['SI, porque aparece 0=1.','La segunda menos el doble de la primera da una contradicción.'],['SCI, porque los coeficientes son proporcionales.','También debe compararse el término independiente.'],['SCD, porque hay dos ecuaciones y dos incógnitas.','El número de ecuaciones no garantiza unicidad.'],['SCI, porque no he encontrado todavía la solución.','No encontrarla por ensayo no prueba infinitud.']],
 'Si x−y=2, necesariamente 2x−2y=4, que no puede ser 5.','Duplica la primera igualdad.','Adaptación conceptual de T5.2; ejemplo propio'),
 q('03',tex`¿Cómo se clasifica un sistema cuyo conjunto solución es \(S=\{(t,4-t):t\in\mathbb R\}\)?`,[
 ['SCI.','Cada real t da una pareja distinta y válida.'],['SCD, porque hay una sola fórmula.','Una fórmula con parámetro puede representar infinitas parejas.'],['SI, porque t no tiene valor fijo.','La libertad del parámetro no es una contradicción.'],['Tiene exactamente dos soluciones.','t recorre todos los reales, no solo dos valores.']],
 'Hay infinitas soluciones, por ejemplo (0,4), (1,3) y (1/2,7/2). No se admite exactamente dos soluciones en un sistema lineal real.','Cuenta las parejas, no las fórmulas.','Adaptación conceptual de T5.10 y tarjetas SCD/SCI/SI'),
 q('04',tex`Clasifica \(\begin{cases}x=2\\y=-1\\0=0\end{cases}\).`,[
 ['SCD: la única solución es (2,−1).','La identidad no altera las condiciones x=2 e y=−1.'],['SCI: aparece 0=0.','Hay que examinar las ecuaciones restantes.'],['SI: hay más ecuaciones que incógnitas.','Una ecuación redundante no crea contradicciones.'],['SCD: la única solución es (0,0).','0=0 no obliga a anular las incógnitas.']],
 'Toda solución debe tener x=2 e y=−1, y esa pareja cumple también la identidad.','Revisa qué valores fijan las otras dos ecuaciones.'),
 q('05','Un sistema lineal real tiene dos ecuaciones y tres incógnitas. ¿Qué puede afirmarse solo con ese dato?',[
 ['Puede ser SCI o SI, pero no SCD.','Si es compatible, queda al menos una libertad; también puede haber contradicción.'],['Siempre es SCI.','Dos ecuaciones pueden contradecirse.'],['Siempre es SI.','Por ejemplo, x=0 e y=0 dejan z libre.'],['Siempre es SCD.','Dos condiciones lineales no pueden fijar tres incógnitas reales de forma única.']],
 'x=0 e y=0, con incógnitas x,y,z, es SCI. x+y+z=1 y x+y+z=2 es SI. La justificación general mediante rangos llegará en 5.6.','Compara un ejemplo compatible con otro contradictorio.'),
 q('06','Se han encontrado dos soluciones distintas de un sistema lineal sobre los reales. ¿Qué se deduce?',[
 ['Es SCI: tiene infinitas soluciones.','Todas las combinaciones sobre la recta que pasa por ambas siguen siendo solución.'],['Tiene exactamente dos soluciones.','La linealidad produce infinitas a partir de esas dos.'],['Es SCD, porque ya se ha resuelto.','Determinado significa solución única.'],['Es SI, porque aparecen dos resultados distintos.','Dos soluciones válidas demuestran compatibilidad.']],
 tex`Si P y Q son soluciones distintas, \(P+t(Q-P)\) también lo es para cualquier real t. Por eso hay infinitas.`,'Utiliza la linealidad, no una conclusión válida para cualquier ecuación no lineal.')
];
export const classificationCards=[
 {id:'fc-classification-01',front:'¿Qué significan SCD, SCI y SI?',back:'SCD: compatible determinado, una solución. SCI: compatible indeterminado, infinitas soluciones. SI: incompatible, ninguna. La clasificación se refiere a sistemas lineales sobre los reales.'},
 {id:'fc-classification-02',front:'¿Compatible equivale a solución única?',back:'No. Compatible significa al menos una solución. Incluye SCD y SCI. Para demostrar SCD hay que justificar también la unicidad.'},
 {id:'fc-classification-03',front:'¿Qué revela una contradicción 0=c con c distinto de cero?',back:'Si procede de operaciones equivalentes sobre el sistema, revela SI. Ninguna tupla puede satisfacer una igualdad imposible.'},
 {id:'fc-classification-04',front:'¿Una identidad 0=0 demuestra SCI?',back:'No por sí sola. Esa igualdad no añade restricciones: hay que estudiar las restantes. x=2, y=−1 y 0=0 es SCD.'},
 {id:'fc-classification-05',front:'¿Cómo se ve la clasificación con dos rectas verdaderas?',back:'Secantes: SCD. Coincidentes: SCI. Paralelas distintas: SI. Las igualdades 0=0 y 0=1 no representan rectas y quedan fuera de esta descripción.'},
 {id:'fc-classification-06',front:'¿Contar ecuaciones basta para clasificar?',back:'No. Pueden repetirse condiciones o contradecirse. Con menos ecuaciones que incógnitas, un sistema lineal real puede ser SCI o SI; con igual número también puede haber cualquiera de los tres casos.'}
].map(c=>({...c,topicId:'t05',lessonId:'t05-e03'}));

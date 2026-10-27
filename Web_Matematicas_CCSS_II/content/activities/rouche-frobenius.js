const tex=String.raw;
const q=(n,prompt,choices,explanation,hint,source='Elaboración propia; guion 5.6')=>({id:'rouche-'+n,topicId:'t05',lessonId:'t05-e06',prompt,correct:'correct',options:choices.map(([text,feedback],i)=>({id:i?'wrong-'+i:'correct',text,feedback})),explanation,hint,source});
export const roucheQuestions=[
 q('01','Según Rouché–Frobenius, ¿cuándo es compatible un sistema AX=B?',[
 [tex`Cuando \(\operatorname{rg}(A)=\operatorname{rg}(A|B)\).`,'La columna B no añade una condición incompatible.'],[tex`Cuando \(\operatorname{rg}(A)>\operatorname{rg}(A|B)\).`,'Añadir una columna no puede disminuir el rango.'],['Cuando A es cuadrada.','Ser cuadrada no garantiza compatibilidad.'],['Cuando el determinante de A vale cero.','Si existe y se anula, todavía hay que distinguir SCI de SI.']],
 'La igualdad de rangos es necesaria y suficiente para que exista al menos una solución.','Compara la matriz de coeficientes con la ampliada.','Adaptación conceptual de T5.3'),
 q('02','Un sistema tiene tres ecuaciones, dos incógnitas y ambos rangos iguales a 2. ¿Cómo se clasifica?',[
 ['SCD: los rangos coinciden con el número de incógnitas.','Se compara con n=2, no con las tres ecuaciones.'],['SCI: el rango es menor que el número de ecuaciones.','La referencia para la unicidad es el número de incógnitas.'],['SI: hay más ecuaciones que incógnitas.','Una ecuación puede repetir información sin contradecir.'],['No se puede saber sin calcular las soluciones.','El teorema ya determina cuántas hay.']],
 'r=s=n=2 implica solución única. Resolverla es otra tarea.','Identifica primero n.','Adaptación conceptual de T5.4; ejemplo rectangular propio'),
 q('03','Para tres incógnitas se obtiene rg(A)=1 y rg(A|B)=2. ¿Qué concluyes?',[
 ['SI: no hay solución.','La desigualdad de rangos demuestra incompatibilidad.'],['SCI con dos parámetros libres.','n−r solo cuenta parámetros si antes hay compatibilidad.'],['SCD porque el rango ampliado es mayor.','Aumentar el rango al añadir B señala incompatibilidad.'],['SCI con un parámetro libre.','No procede contar libertades de un conjunto vacío.']],
 'Primero se comparan los rangos. Como son distintos, se termina con SI.','No apliques n−r antes de comprobar r=s.'),
 q('04','Dos ecuaciones y tres incógnitas tienen ambos rangos iguales a 2. ¿Cuántos parámetros libres requiere una parametrización completa?',[
 ['Uno: n−r=3−2=1.','El sistema es compatible y tiene una libertad.'],['Ninguno: el rango coincide con el número de ecuaciones.','Aún hay tres incógnitas.'],['Dos: hay dos ecuaciones.','El número de ecuaciones no cuenta los parámetros.'],['Tres: toda incógnita es libre.','Dos condiciones independientes restringen los valores.']],
 'Es SCI: rangos iguales a 2, menores que n=3. No significa que haya una sola solución.','Calcula n−r después de verificar compatibilidad.'),
 q('05',tex`Para \(\lambda x+y=2,\ x+\lambda y=2\), ¿qué ocurre cuando \(\lambda=-1\)?`,[
 ['SI: rg(A)=1 y rg(A|B)=2.','Al sumar las ecuaciones queda 0=4.'],['SCI: det(A)=0 siempre implica infinitas soluciones.','También puede haber incompatibilidad.'],['SCD: hay dos ecuaciones y dos incógnitas.','Los coeficientes son dependientes en este valor.'],['SCI con x+y=2.','Eso ocurre para λ=1, no para λ=−1.']],
 'Con λ=−1 quedan −x+y=2 y x−y=2, incompatibles. El menor de columnas x y B vale −4.','Sustituye el valor crítico antes de decidir.'),
 q('06','A es la matriz nula de tamaño 2×3 y B es la columna nula. ¿Cómo se clasifica el sistema?',[
 ['SCI, con tres parámetros libres.','Ambos rangos son cero y cualquier terna real satisface 0=0.'],['SCD, con única solución (0,0,0).','La terna nula es solo una entre infinitas.'],['SI, porque no hay pivotes.','No hay contradicciones cuando B también es nulo.'],['SCI, con dos parámetros libres.','n=3, por lo que n−r=3.']],
 tex`Se obtiene \(\operatorname{rg}(A)=\operatorname{rg}(A|B)=0<3\). El conjunto solución es \(\mathbb R^3\).`,'Lee las ecuaciones representadas por las filas nulas.')
];
export const roucheCards=[
 {id:'fc-rouche-01',front:'¿Qué afirma Rouché–Frobenius sobre compatibilidad?',back:tex`\(AX=B\) es compatible si y solo si \(\operatorname{rg}(A)=\operatorname{rg}(A|B)\). Vale también para matrices rectangulares.`},
 {id:'fc-rouche-02',front:'¿Cuál es la condición de SCD?',back:tex`Los dos rangos son iguales al número n de incógnitas: \(\operatorname{rg}(A)=\operatorname{rg}(A|B)=n\). No se compara con el número de ecuaciones.`},
 {id:'fc-rouche-03',front:'¿Cuál es la condición de SCI y cuántos parámetros quedan?',back:tex`Los rangos coinciden y son menores que n. Una parametrización completa usa \(n-\operatorname{rg}(A)\) parámetros libres. Esta cuenta solo se aplica al sistema compatible.`},
 {id:'fc-rouche-04',front:'¿Cómo se reconoce un SI mediante rangos?',back:'Los rangos de A y (A|B) son distintos. Como B añade una sola columna, el rango ampliado supera al de A exactamente en uno.'},
 {id:'fc-rouche-05',front:'¿Un determinante cero decide SCI o SI?',back:'No. Si A es cuadrada y su determinante se anula, se debe calcular su rango y compararlo con el de la ampliada. Si el determinante no es cero, hay SCD.'},
 {id:'fc-rouche-06',front:'¿Cómo se estudian valores críticos de un parámetro?',back:'Detecta dónde pueden cambiar los rangos, separa esos valores y calcula los rangos en cada caso. No dividas por una expresión que pueda ser cero sin tratar ese caso aparte.'}
].map(c=>({...c,topicId:'t05',lessonId:'t05-e06'}));

// Cuarto distractor revisado en la tanda T01 (entrega 157); respuestas originales conservadas.
// Nueve ideas adaptadas de las autoevaluaciones originales y cincuenta y una ampliaciones base.
// Las afirmaciones con una sola opción se convierten en preguntas de elección real.
const tex=String.raw;
const originalTable={caption:'Ejemplo hipotético de aprobar A y entregar trabajos B',headers:['Suceso',tex`\(B\)`,tex`\(B^c\)`,'Total'],rows:[[tex`\(A\)`,'0,35','0,25','0,60'],[tex`\(A^c\)`,'0,15','0,25','0,40'],['Total','0,50','0,50','1']]};
const frequencyTable={caption:'Número de tareas completadas en diez registros ficticios',headers:['Tareas completadas','0','1','2','Total'],rows:[['Frecuencia absoluta','2','3','5','10']]};
const reviewTable={caption:'Doscientas fichas ficticias equiprobables: canal y resolución',headers:['Canal','Resuelta','No resuelta','Total'],rows:[['Web','90','30','120'],['Teléfono','40','40','80'],['Total','130','70','200']]};
const channelTable={caption:'Modelo ficticio: canal y etiqueta urgente',headers:['Canal','Peso del canal','Proporción urgente dentro del canal'],rows:[['A','0,60','0,10'],['B','0,40','0,30']]};
export const probabilityQuestions = [
  {id:'q-t07-original-01',topicId:'t07',sourceIndex:1,sourceFile:'3. Axiomática de Kolmogorov.txt',prompt:'Si A y B son incompatibles, ¿cómo se calcula la probabilidad de su unión?',options:[
    {id:'a',text:'\\(P(A\\cup B)=P(A)+P(B)\\).',feedback:'Correcto: la intersección es vacía y no hay solape.'},
    {id:'b',text:'\\(P(A\\cup B)=P(A)P(B)\\).',feedback:'El producto corresponde a otro tipo de cálculo; no expresa esta unión.'},
    {id:'c',text:'\\(P(A\\cup B)=P(A)-P(B)\\).',feedback:'La diferencia no reúne los dos sucesos.'},
    {"id":"d","text":"\\(P(A\\cup B)=1\\) en todos los casos.","feedback":"La unión solo tiene probabilidad 1 si esos sucesos cubren todo el espacio; la incompatibilidad no lo garantiza."}
  ],correct:'a',hint:'Incompatibles significa que no se cuentan resultados comunes.',explanation:'La aditividad permite sumar probabilidades de sucesos incompatibles.'},
  {id:'q-t07-original-02',topicId:'t07',sourceIndex:2,sourceFile:'3. Axiomática de Kolmogorov.txt',prompt:'¿Qué relación se cumple para el suceso contrario de A?',options:[
    {id:'a',text:'\\(P(A^c)=P(A)\\) siempre.',feedback:'A y su contrario solo tienen la misma probabilidad en algunos casos.'},
    {id:'b',text:'\\(P(A^c)=1-P(A)\\).',feedback:'Correcto: A y su contrario completan el suceso seguro.'},
    {id:'c',text:'\\(P(A^c)=1+P(A)\\).',feedback:'Una probabilidad no puede superar 1.'},
    {"id":"d","text":"\\(P(A^c)=1/P(A)\\).","feedback":"El recíproco no calcula el complementario y ni siquiera está definido cuando P(A)=0."}
  ],correct:'b',hint:'Las dos partes incompatibles forman todo el espacio muestral.',explanation:'\\(P(A)+P(A^c)=P(E)=1\\).'},
  {id:'q-t07-original-03',topicId:'t07',sourceIndex:3,sourceFile:'3. Axiomática de Kolmogorov.txt',prompt:'Un experimento tiene dos opciones, «sí» y «no». ¿Qué puedes concluir?',options:[
    {id:'a',text:'Cada opción tiene probabilidad 1/2 por existir solo dos.',feedback:'Dos opciones no implican que sean equiprobables.'},
    {id:'b',text:'La opción «sí» es siempre más probable.',feedback:'No hay información para comparar ambas opciones.'},
    {id:'c',text:'Sus probabilidades suman 1, pero no tienen por qué valer 1/2.',feedback:'Correcto: la igualdad exige equiprobabilidad.'},
    {"id":"d","text":"Las probabilidades de «sí» y «no» suman 1/2.","feedback":"Si son las dos únicas opciones y se excluyen mutuamente, forman todo el espacio y suman 1."}
  ],correct:'c',hint:'Piensa en dos opciones con probabilidades 0,9 y 0,1.',explanation:'Una partición en dos sucesos tiene suma 1; cada parte puede tener un peso diferente.'},
  {id:'q-t07-original-04',topicId:'t07',sourceIndex:4,sourceFile:'4. Tablas de contingencia y diagramas de árboles.txt',prompt:'En una tabla de contingencia, ¿qué representan los totales de filas y columnas?',options:[
    {id:'a',text:'Las frecuencias o probabilidades marginales, según el tipo de tabla.',feedback:'Correcto: resumen cada característica sin fijar la otra.'},
    {id:'b',text:'Solo las probabilidades condicionadas.',feedback:'Una condicionada exige dividir por el total del grupo conocido.'},
    {id:'c',text:'Únicamente las intersecciones.',feedback:'Las intersecciones están en las casillas interiores.'},
    {"id":"d","text":"El número de categorías de cada variable.","feedback":"El total de una fila o columna suma casos o probabilidades; no cuenta cuántas categorías tiene la variable."}
  ],correct:'a',hint:'Están en los márgenes de la tabla.',explanation:'Los totales de filas y columnas son marginales: frecuencias si la tabla cuenta casos, probabilidades si ya está normalizada.'},
  {id:'q-t07-original-05',topicId:'t07',sourceIndex:5,sourceFile:'4. Tablas de contingencia y diagramas de árboles.txt',prompt:'¿Cómo se calcula la probabilidad de un camino completo en un árbol?',options:[
    {id:'a',text:'Sumando todas las ramas del camino.',feedback:'La suma se usa entre caminos incompatibles, no a lo largo de uno.'},
    {id:'b',text:'Multiplicando las probabilidades de sus ramas.',feedback:'Correcto: cada rama posterior puede ser condicionada a las anteriores.'},
    {id:'c',text:'Restando la última rama de 1.',feedback:'Eso solo serviría en una pregunta específica de complemento.'},
    {"id":"d","text":"Promediando las probabilidades de sus ramas.","feedback":"Un promedio no calcula una intersección de etapas; se usa el producto de las ramas del recorrido."}
  ],correct:'b',hint:'Piensa en la regla del producto para una intersección.',explanation:'El producto de ramas da la probabilidad conjunta de ese camino.'},
  {id:'q-t07-original-06',topicId:'t07',sourceIndex:6,sourceFile:'4. Tablas de contingencia y diagramas de árboles.txt',prompt:'En un árbol completo, ¿cuánto suman las probabilidades de las ramas que salen de un nodo?',options:[
    {id:'a',text:'Siempre 0.',feedback:'Desde un nodo debe ocurrir alguna de las opciones representadas.'},
    {id:'b',text:'Pueden sumar cualquier número positivo.',feedback:'Si las ramas son completas y excluyentes, deben cubrir todas las opciones.'},
    {id:'c',text:'Suman 1.',feedback:'Correcto: las ramas reparten todos los casos posibles desde ese nodo.'},
    {"id":"d","text":"Suman la probabilidad de haber llegado al nodo.","feedback":"Las ramas condicionadas suman 1 dentro del nodo; la probabilidad de llegar a él se incorpora al multiplicar el camino."}
  ],correct:'c',hint:'Desde el nodo, las ramas forman una partición.',explanation:'La normalización exige que todas las ramas salientes completas sumen 1.'},
  {id:'q-t07-original-07',topicId:'t07',sourceIndex:7,sourceFile:'5. Probabilidad total y Teorema de Bayes.txt',prompt:'Quieres calcular P(B) combinando escenarios que forman una partición. ¿Qué herramienta corresponde?',options:[
    {id:'a',text:'Probabilidad total: sumar los caminos que terminan en B.',feedback:'Correcto: se pondera cada condicionada por su escenario.'},
    {id:'b',text:'Bayes: invertir B para buscar una causa.',feedback:'Bayes respondería una pregunta posterior sobre la causa.'},
    {id:'c',text:'Sumar las probabilidades condicionadas sin pesos.',feedback:'Faltan los pesos de cada escenario de la partición.'},
    {"id":"d","text":"Tomar la mayor de las probabilidades condicionadas.","feedback":"El total reúne las contribuciones de todos los grupos con sus pesos; no se limita a la tasa más alta."}
  ],correct:'a',hint:'La pregunta pide la probabilidad del efecto final.',explanation:'\\(P(B)=\\sum_iP(A_i)P(B\\mid A_i)\\) para una partición válida.'},
  {id:'q-t07-original-08',topicId:'t07',sourceIndex:8,sourceFile:'5. Probabilidad total y Teorema de Bayes.txt',prompt:'Ha ocurrido B. ¿Qué herramienta calcula la probabilidad de que la causa fuera A₂?',options:[
    {id:'a',text:'Solo la regla de Laplace, aunque no haya equiprobabilidad.',feedback:'Laplace necesita equiprobabilidad elemental y no invierte una condición por sí sola.'},
    {id:'b',text:'Bayes, dividiendo el camino de A₂ y B entre P(B).',feedback:'Correcto: se pregunta por una causa dado el efecto observado.'},
    {id:'c',text:'Restar P(B) de P(A₂).',feedback:'Esa resta no representa una probabilidad condicionada.'},
    {"id":"d","text":"Usar solo la probabilidad previa de A₂ y omitir B.","feedback":"Omitir el resultado observado no invierte la condición; la previa solo coincide con la posterior bajo condiciones adicionales."}
  ],correct:'b',hint:'La dirección es del efecto observado hacia una posible causa.',explanation:'\\(P(A_2\\mid B)=P(A_2)P(B\\mid A_2)/P(B)\\), con \\(P(B)>0\\).'},
  {id:'q-t07-original-09',topicId:'t07',sourceIndex:9,sourceFile:'5. Probabilidad total y Teorema de Bayes.txt',prompt:'Al aplicar Bayes para calcular P(A dado B), ¿qué paso no se puede omitir?',options:[
    {id:'a',text:'Multiplicar P(A) por P(B dado A) y detenerse.',feedback:'Eso da la probabilidad conjunta, no la condicionada inversa.'},
    {id:'b',text:'Dividir por P(A), aunque se haya observado B.',feedback:'La condición observada B determina el denominador.'},
    {id:'c',text:'Dividir la probabilidad conjunta entre P(B), si P(B)>0.',feedback:'Correcto: P(B) reúne todos los caminos que producen B.'},
    {"id":"d","text":"Sustituir P(A∩B) por P(A)+P(B).","feedback":"La suma de probabilidades marginales no es, en general, la probabilidad conjunta del numerador."}
  ],correct:'c',hint:'Recuerda qué suceso aparece después de «dado».',explanation:'\\(P(A\\mid B)=P(A\\cap B)/P(B)\\); puede calcularse P(B) con probabilidad total.'},
  {id:'q-t07-base-10',topicId:'t07',lessonId:'t07-e01',origin:'ampliacion',sourceFile:'1. Introducción a la probabilidad.txt',prompt:'Se lanza un dado equilibrado de seis caras. ¿Cuál es su espacio muestral si anotamos la cara superior?',options:[
    {id:'a',text:tex`\(E=\{1,2,3,4,5,6\}\).`,feedback:'Correcto: incluye todos los resultados elementales posibles.'},
    {id:'b',text:tex`\(E=\{1,2,3,4,5\}\).`,feedback:'Falta el resultado 6.'},
    {id:'c',text:tex`\(E=\{2,4,6\}\).`,feedback:'Eso es solo el suceso de obtener un número par.'},
    {"id":"d","text":"\\(E=\\{1,2,3,4,5,6,7\\}\\).","feedback":"El 7 no es un resultado posible del dado de seis caras."}
  ],correct:'a',hint:'El espacio muestral reúne todos los valores posibles de la cara superior.',explanation:'El dado puede mostrar cualquiera de los enteros del 1 al 6; «par» sería un suceso dentro de ese espacio.'},
  {id:'q-t07-base-11',topicId:'t07',lessonId:'t07-e01',origin:'ampliacion',sourceFile:'1. Introducción a la probabilidad.txt',prompt:'Al lanzar un dado habitual de seis caras, ¿cuál es la probabilidad de obtener un 7?',options:[
    {id:'a',text:tex`\(\frac{1}{6}\).`,feedback:'El 7 no es una cara posible.'},
    {id:'b',text:tex`\(0\).`,feedback:'Correcto: es un suceso imposible en este experimento.'},
    {id:'c',text:tex`\(1\).`,feedback:'Probabilidad 1 corresponde al suceso seguro.'},
    {"id":"d","text":"\\(\\frac17\\).","feedback":"Añadir el 7 al denominador no lo convierte en una cara posible; el suceso pedido es vacío."}
  ],correct:'b',hint:'Comprueba si 7 pertenece al espacio muestral.',explanation:tex`El suceso es vacío: \(P(\varnothing)=0\).`},
  {id:'q-t07-base-12',topicId:'t07',lessonId:'t07-e01',origin:'ampliacion',sourceFile:'2. Tipos de probabilidad.txt',prompt:'Una ruleta tiene cuatro sectores de tamaños diferentes. Sin conocer sus áreas ni sus probabilidades, ¿puedes aplicar directamente «casos favorables entre casos posibles» contando sectores?',options:[
    {id:'a',text:'Sí: cuatro sectores siempre tienen probabilidad 1/4 cada uno.',feedback:'El número de sectores no garantiza equiprobabilidad.'},
    {id:'b',text:'Sí, si el resultado buscado ocupa un solo sector.',feedback:'Un sector puede ocupar más o menos superficie que otro.'},
    {id:'c',text:'No: hace falta justificar que los resultados elementales sean equiprobables.',feedback:'Correcto: la regla de Laplace exige esa condición.'},
    {"id":"d","text":"Sí, si se repite la tirada muchas veces.","feedback":"Repetir el experimento no hace equiprobables sectores de distinta probabilidad."}
  ],correct:'c',hint:'La regla de Laplace necesita un supuesto sobre los resultados elementales.',explanation:'Los sectores desiguales no tienen por qué tener la misma probabilidad; contar sectores por sí solo no determina la respuesta.'},
  {id:'q-t07-base-13',topicId:'t07',lessonId:'t07-e02',origin:'ampliacion',sourceFile:'1. Introducción a la probabilidad.txt',prompt:'¿Qué suceso expresa «no ocurre A ni ocurre B»?',options:[
    {id:'a',text:tex`\(A^c\cap B^c=(A\cup B)^c\).`,feedback:'Correcto: ambos sucesos deben faltar.'},
    {id:'b',text:tex`\(A^c\cup B^c\).`,feedback:'Esa unión permite que ocurra uno de los sucesos.'},
    {id:'c',text:tex`\(A\cap B\).`,feedback:'Eso exige que ocurran ambos.'},
    {"id":"d","text":"\\(A^c\\).","feedback":"No A todavía permite que ocurra B; «ni A ni B» exige también no B."}
  ],correct:'a',hint:'«Ni A ni B» exige a la vez no A y no B.',explanation:tex`Por la ley de De Morgan, \((A\cup B)^c=A^c\cap B^c\).`},
  {id:'q-t07-base-14',topicId:'t07',lessonId:'t07-e02',origin:'ampliacion',sourceFile:'1. Introducción a la probabilidad.txt',prompt:'En un dado, A={2,4,6} y B={4,5,6}. ¿Qué resultados forman A sin B?',options:[
    {id:'a',text:tex`\(\{2,4,6\}\).`,feedback:'4 y 6 también pertenecen a B.'},
    {id:'b',text:tex`\(\{2\}\).`,feedback:'Correcto: 2 está en A y no en B.'},
    {id:'c',text:tex`\(\{2,5\}\).`,feedback:'5 pertenece a B, pero no a A.'},
    {"id":"d","text":"\\(\\{4,6\\}\\).","feedback":"Ese conjunto es la intersección A y B; la diferencia exige quitar esos elementos de A."}
  ],correct:'b',hint:'Elimina de A sus elementos comunes con B.',explanation:tex`\(A\setminus B=\{2\}\). La diferencia no incluye elementos exclusivos de B.`},
  {id:'q-t07-base-15',topicId:'t07',lessonId:'t07-e02',origin:'ampliacion',sourceFile:'2. Tipos de probabilidad.txt',prompt:'En una baraja española de 40 cartas, hay 4 reyes y 10 cartas de copas; el rey de copas está en ambos grupos. ¿Cuál es la probabilidad de sacar rey o copa?',options:[
    {id:'a',text:tex`\(\frac{14}{40}\).`,feedback:'Has contado dos veces el rey de copas.'},
    {id:'b',text:tex`\(\frac{1}{40}\).`,feedback:'Esa es la intersección, no la unión.'},
    {id:'c',text:tex`\(\frac{13}{40}\).`,feedback:'Correcto: 4+10−1=13 cartas favorables.'},
    {"id":"d","text":"\\(\\frac{10}{40}\\).","feedback":"Solo has contado las copas; faltan los tres reyes de los demás palos."}
  ],correct:'c',hint:'Suma reyes y copas, y resta la carta contada dos veces.',explanation:tex`\(P(R\cup C)=\frac{4+10-1}{40}=\frac{13}{40}\). La extracción de una carta de la baraja bien mezclada es equiprobable.`},
  {id:'q-t07-base-16',topicId:'t07',lessonId:'t07-e03',origin:'ampliacion',sourceFile:'4. Tablas de contingencia y diagramas de árboles.txt',prompt:'En la tabla de aprobar A y entregar B, ¿cuál es P(A o B)?',table:originalTable,options:[
    {id:'a',text:tex`\(0{,}75\).`,feedback:'Correcto: se suman las tres casillas que cumplen A o B.'},
    {id:'b',text:tex`\(0{,}35\).`,feedback:'Esa es solo la intersección A y B.'},
    {id:'c',text:tex`\(1{,}10\).`,feedback:'Has sumado los márgenes y contado dos veces la intersección.'},
    {"id":"d","text":"\\(0{,}25\\).","feedback":"Esa es la probabilidad de no aprobar ni entregar, el complementario de la unión."}
  ],correct:'a',hint:'Puedes sumar tres casillas favorables o restar de 1 la casilla «ni A ni B».',explanation:tex`\(P(A\cup B)=0{,}35+0{,}25+0{,}15=0{,}75=1-0{,}25\).`},
  {id:'q-t07-base-17',topicId:'t07',lessonId:'t07-e03',origin:'ampliacion',sourceFile:'4. Tablas de contingencia y diagramas de árboles.txt',prompt:'Entre quienes aprueban A, ¿qué proporción entrega B?',table:originalTable,options:[
    {id:'a',text:tex`\(0{,}70\).`,feedback:'Ese valor corresponde a A entre quienes entregan B: es la condición inversa.'},
    {id:'b',text:tex`\(\frac{7}{12}\).`,feedback:'Correcto: la intersección 0,35 se divide por el margen de A, 0,60.'},
    {id:'c',text:tex`\(0{,}35\).`,feedback:'Esa es la probabilidad conjunta, sin condicionar.'},
    {"id":"d","text":"\\(0{,}50\\).","feedback":"Es la probabilidad marginal de entregar; al condicionar a aprobar hay que dividir 0,35 entre 0,60."}
  ],correct:'b',hint:'El denominador es el total de la fila de quienes aprueban.',explanation:tex`\(P(B\mid A)=\frac{P(A\cap B)}{P(A)}=\frac{0{,}35}{0{,}60}=\frac{7}{12}\).`},
  {id:'q-t07-base-18',topicId:'t07',lessonId:'t07-e03',origin:'ampliacion',sourceFile:'4. Tablas de contingencia y diagramas de árboles.txt',prompt:'Según la misma tabla, ¿son independientes A y B?',table:originalTable,options:[
    {id:'a',text:'Sí, porque la tabla muestra una intersección.',feedback:'Tener intersección no prueba independencia.'},
    {id:'b',text:'No, porque son incompatibles.',feedback:'La intersección vale 0,35; por tanto, sí pueden ocurrir ambos.'},
    {id:'c',text:tex`No: \(P(A\cap B)=0{,}35\) y \(P(A)P(B)=0{,}30\).`,feedback:'Correcto: no se cumple el criterio del producto.'},
    {"id":"d","text":"Sí, porque P(A)+P(B) es mayor que 1.","feedback":"Que la suma de los márgenes supere 1 obliga a un solape, pero no demuestra independencia."}
  ],correct:'c',hint:'Compara la casilla conjunta con el producto de los dos márgenes.',explanation:tex`\(P(A)P(B)=0{,}60\cdot0{,}50=0{,}30\ne0{,}35=P(A\cap B)\). No son independientes.`},
  {id:'q-t07-base-19',topicId:'t07',lessonId:'t07-e04',origin:'ampliacion',sourceFile:'2. Tipos de probabilidad.txt',prompt:'En el ejemplo didáctico de 850 personas zurdas entre 10 000, ¿cuál es la frecuencia relativa observada?',options:[
    {id:'a',text:tex`\(0{,}085=8{,}5\%\).`,feedback:'Correcto: se divide el recuento por el total.'},
    {id:'b',text:tex`\(0{,}85=85\%\).`,feedback:'Has desplazado la coma un lugar de más.'},
    {id:'c',text:tex`\(0{,}0085=0{,}85\%\).`,feedback:'Has desplazado la coma un lugar de menos.'},
    {"id":"d","text":"\\(8{,}5\\).","feedback":"8,5 es el valor porcentual; como proporción debe dividirse por 100 y escribirse 0,085."}
  ],correct:'a',hint:'Divide 850 entre 10 000 y después multiplica por 100 para expresarlo en porcentaje.',explanation:tex`\(f=\frac{850}{10\,000}=0{,}085=8{,}5\%\). Es una frecuencia de ese registro hipotético, no una probabilidad poblacional demostrada.`},
  {id:'q-t07-base-20',topicId:'t07',lessonId:'t07-e04',origin:'ampliacion',sourceFile:'2. Tipos de probabilidad.txt',prompt:'En el registro ficticio de la tabla, ¿cuál es la frecuencia relativa acumulada de completar como máximo una tarea?',table:frequencyTable,options:[
    {id:'a',text:tex`\(\frac{3}{10}\).`,feedback:'Has contado solo la categoría «una tarea».'},
    {id:'b',text:tex`\(\frac{1}{2}\).`,feedback:'Correcto: las categorías 0 y 1 aportan 2+3 de los 10 registros.'},
    {id:'c',text:tex`\(\frac{8}{10}\).`,feedback:'Has incluido la categoría de dos tareas y omitido la de cero tareas.'},
    {"id":"d","text":"\\(\\frac{2}{10}\\).","feedback":"Solo has contado los registros con cero tareas; «como máximo una» incluye también los de una tarea."}
  ],correct:'b',hint:'«Como máximo una» incluye cero y una tarea.',explanation:tex`\(F(1)=\frac{2+3}{10}=\frac{5}{10}=\frac12\). La acumulación tiene sentido porque las categorías están ordenadas.`},
  {id:'q-t07-base-21',topicId:'t07',lessonId:'t07-e04',origin:'ampliacion',sourceFile:'2. Tipos de probabilidad.txt',prompt:'En 20 lanzamientos de un dado ideal equilibrado aparece el seis 4 veces. ¿Cómo comparas frecuencia observada y probabilidad teórica?',options:[
    {id:'a',text:tex`Ambas valen \(\frac15\) desde ahora.`,feedback:'La serie observada no cambia la probabilidad del dado ideal.'},
    {id:'b',text:tex`Ambas valen \(\frac16\) porque el dado es equilibrado.`,feedback:'La frecuencia de esta serie concreta fue 4/20, no 1/6.'},
    {id:'c',text:tex`La frecuencia es \(\frac15\); la probabilidad teórica sigue siendo \(\frac16\).`,feedback:'Correcto: una muestra finita puede diferir del modelo.'},
    {"id":"d","text":"La frecuencia es 1/6 y la probabilidad teórica es 1/5.","feedback":"Has intercambiado el valor observado 4/20 con la probabilidad del dado ideal."}
  ],correct:'c',hint:'Calcula 4/20 y distingue ese cociente de la probabilidad del modelo.',explanation:tex`\(f_{20}(\text{seis})=\frac{4}{20}=\frac15\), mientras \(P(\text{seis})=\frac16\) para el dado ideal equilibrado. Una racha no modifica la probabilidad teórica.`},
  {id:'q-t07-base-22',topicId:'t07',lessonId:'t07-e05',origin:'ampliacion',sourceFile:'3. Axiomática de Kolmogorov.txt',prompt:'Un modelo asigna a tres resultados incompatibles y exhaustivos las probabilidades −0,1; 0,4 y 0,7. Aunque suman 1, ¿es válido?',options:[
    {id:'a',text:'No: incumple la no negatividad.',feedback:'Correcto: ninguna probabilidad puede ser negativa.'},
    {id:'b',text:'Sí: basta con que la suma sea 1.',feedback:'La normalización no sustituye la no negatividad.'},
    {id:'c',text:'No: 0,7 es demasiado grande para un resultado.',feedback:'Una probabilidad de 0,7 es posible; el problema es −0,1.'},
    {"id":"d","text":"No, porque las tres probabilidades no suman 1.","feedback":"Sí suman 1: −0,1+0,4+0,7=1. El defecto del modelo es el peso negativo."}
  ],correct:'a',hint:'Comprueba cada probabilidad por separado, además de la suma.',explanation:tex`El axioma de no negatividad exige \(P(A)\geq0\) para todo suceso \(A\). Aquí una probabilidad es \(-0{,}1\), así que el modelo no es válido aunque el total sea 1.`},
  {id:'q-t07-base-23',topicId:'t07',lessonId:'t07-e05',origin:'ampliacion',sourceFile:'3. Axiomática de Kolmogorov.txt',prompt:'Tres resultados incompatibles y exhaustivos tienen probabilidades 0,2; 0,3 y x. ¿Qué valor debe tener x para respetar la normalización?',options:[
    {id:'a',text:tex`\(0{,}3\).`,feedback:'La suma sería 0,8, menor que la probabilidad del suceso seguro.'},
    {id:'b',text:tex`\(0{,}5\).`,feedback:'Correcto: el total debe ser 1.'},
    {id:'c',text:tex`\(1{,}5\).`,feedback:'La suma superaría 1 y la propia x no sería una probabilidad válida.'},
    {"id":"d","text":"\\(0{,}2\\).","feedback":"La suma sería 0,7; hay que completar 0,2+0,3 hasta 1."}
  ],correct:'b',hint:'La unión de los tres resultados es el suceso seguro.',explanation:tex`Por aditividad y normalización, \(0{,}2+0{,}3+x=P(E)=1\), de donde \(x=0{,}5\).`},
  {id:'q-t07-base-24',topicId:'t07',lessonId:'t07-e05',origin:'ampliacion',sourceFile:'3. Axiomática de Kolmogorov.txt',prompt:'¿Por qué la igualdad P(∅)=0 se deduce de los axiomas y no se añade como uno nuevo?',options:[
    {id:'a',text:'Porque todos los resultados elementales son equiprobables.',feedback:'La deducción no necesita equiprobabilidad.'},
    {id:'b',text:'Porque la no negatividad, por sí sola, obliga a que toda probabilidad pequeña sea cero.',feedback:'La no negatividad solo impide valores negativos.'},
    {id:'c',text:tex`Porque \(E\cup\varnothing=E\) y la aditividad da \(P(E)=P(E)+P(\varnothing)\).`,feedback:'Correcto: al restar P(E), queda P(∅)=0.'},
    {"id":"d","text":"Porque todo suceso con pocos resultados tiene probabilidad cero.","feedback":"Un suceso con pocos resultados puede tener probabilidad positiva; el vacío se trata mediante los axiomas."}
  ],correct:'c',hint:'El vacío no añade ningún resultado al suceso seguro.',explanation:tex`Como \(E\cap\varnothing=\varnothing\), la aditividad aplicada a \(E\cup\varnothing\) da \(P(E)=P(E)+P(\varnothing)\). Por tanto, \(P(\varnothing)=0\).`},
  {id:'q-t07-base-25',topicId:'t07',lessonId:'t07-e06',origin:'ampliacion',sourceFile:'3. Axiomática de Kolmogorov.txt',prompt:'Si la probabilidad de recibir una respuesta es 0,72, ¿cuál es la probabilidad de no recibirla en el mismo experimento?',options:[
    {id:'a',text:tex`\(0{,}28\).`,feedback:'Correcto: el suceso y su contrario completan el seguro.'},
    {id:'b',text:tex`\(0{,}72\).`,feedback:'El contrario no tiene necesariamente la misma probabilidad.'},
    {id:'c',text:tex`\(1{,}72\).`,feedback:'Una probabilidad no puede superar 1.'},
    {"id":"d","text":"\\(0{,}14\\).","feedback":"Has dividido el complementario entre dos; basta restar 0,72 a 1 una sola vez."}
  ],correct:'a',hint:'Suma la probabilidad del suceso y la de su contrario hasta 1.',explanation:tex`\(P(A^c)=1-P(A)=1-0{,}72=0{,}28\).`},
  {id:'q-t07-base-26',topicId:'t07',lessonId:'t07-e06',origin:'ampliacion',sourceFile:'3. Axiomática de Kolmogorov.txt',prompt:'Se afirma que A está contenido en B, pero se asignan P(A)=0,68 y P(B)=0,55. ¿Qué concluyes?',options:[
    {id:'a',text:'Es coherente: el suceso más restringido siempre es más probable.',feedback:'La inclusión implica justamente la desigualdad contraria.'},
    {id:'b',text:tex`Es incoherente: si \(A\subseteq B\), debe cumplirse \(P(A)\leq P(B)\).`,feedback:'Correcto: la parte no puede exceder al conjunto que la contiene.'},
    {id:'c',text:'Solo es incoherente si A y B son incompatibles.',feedback:'La monotonía se cumple para cualquier inclusión, no depende de incompatibilidad.'},
    {"id":"d","text":"Es coherente porque P(A)+P(B) supera 1.","feedback":"La suma de los márgenes no evita la contradicción: un suceso incluido no puede tener probabilidad mayor que el que lo contiene."}
  ],correct:'b',hint:'Imagina A como una parte de B; B añade casos y no puede tener menos probabilidad.',explanation:tex`\(B=A\cup(B\setminus A)\) es una unión incompatible. Así, \(P(B)=P(A)+P(B\setminus A)\geq P(A)\); 0,55 no puede ser menor que 0,68.`},
  {id:'q-t07-base-27',topicId:'t07',lessonId:'t07-e06',origin:'ampliacion',sourceFile:'3. Axiomática de Kolmogorov.txt',prompt:'En un modelo coherente, P(A)=0,55, P(B)=0,42 y P(A∩B)=0,17. ¿Cuánto vale P(A∪B)?',options:[
    {id:'a',text:tex`\(0{,}97\).`,feedback:'Has contado dos veces la intersección.'},
    {id:'b',text:tex`\(0{,}17\).`,feedback:'Ese valor corresponde solo a la intersección.'},
    {id:'c',text:tex`\(0{,}80\).`,feedback:'Correcto: resta una vez el solape de la suma.'},
    {"id":"d","text":"\\(0{,}63\\).","feedback":"Al restar dos veces la intersección cuentas exactamente uno de los sucesos; la unión también incluye la intersección."}
  ],correct:'c',hint:'Suma las dos probabilidades y resta lo que pertenece a ambas.',explanation:tex`\(P(A\cup B)=P(A)+P(B)-P(A\cap B)=0{,}55+0{,}42-0{,}17=0{,}80\).`},
  {id:'q-t07-base-28',topicId:'t07',lessonId:'t07-e07',origin:'ampliacion',sourceFile:'4. Tablas de contingencia y diagramas de árboles.txt',prompt:'En el ejemplo hipotético de dos incendios independientes, la probabilidad de negligencia en cada uno es 0,4. ¿Cuál es la probabilidad de que haya negligencia en exactamente uno?',options:[
    {id:'a',text:tex`\(0{,}48\).`,feedback:'Correcto: hay dos caminos, negligencia solo en el primero o solo en el segundo.'},
    {id:'b',text:tex`\(0{,}16\).`,feedback:'Ese es el camino de negligencia en ambos incendios.'},
    {id:'c',text:tex`\(0{,}64\).`,feedback:'Ese valor incluye también la negligencia en ambos: «al menos uno».'},
    {"id":"d","text":"\\(0{,}24\\).","feedback":"Solo cuenta un orden, negligencia y después no negligencia; falta el orden contrario."}
  ],correct:'a',hint:'Suma los dos caminos incompatibles: negligencia solo en el primero y solo en el segundo.',explanation:tex`Si \(N_i\) indica negligencia en el incendio \(i\), por independencia \(P(N_1\cap N_2^c)+P(N_1^c\cap N_2)=0{,}4\cdot0{,}6+0{,}6\cdot0{,}4=0{,}48\). El contexto es hipotético.`},
  {id:'q-t07-base-29',topicId:'t07',lessonId:'t07-e07',origin:'ampliacion',sourceFile:'4. Tablas de contingencia y diagramas de árboles.txt',prompt:'Una urna didáctica contiene 2 bolas rojas y 1 azul. Se extrae una bola, se devuelve y se extrae otra. ¿Cuál es la probabilidad de obtener roja en ambas extracciones?',options:[
    {id:'a',text:tex`\(\frac13\).`,feedback:'Eso corresponde al caso sin reemplazamiento.'},
    {id:'b',text:tex`\(\frac49\).`,feedback:'Correcto: tras devolver la primera bola, la segunda rama roja sigue valiendo 2/3.'},
    {id:'c',text:tex`\(\frac23\).`,feedback:'Esa es solo la probabilidad de roja en una extracción.'},
    {"id":"d","text":"\\(\\frac89\\).","feedback":"Ese valor corresponde a al menos una roja con reemplazamiento, no a dos rojas."}
  ],correct:'b',hint:'La devolución deja la urna con la composición inicial.',explanation:tex`Con reemplazamiento, \(P(RR)=\frac23\cdot\frac23=\frac49\). Se supone extracción equiprobable en cada etapa.`},
  {id:'q-t07-base-30',topicId:'t07',lessonId:'t07-e07',origin:'ampliacion',sourceFile:'4. Tablas de contingencia y diagramas de árboles.txt',prompt:'De la misma urna con 2 bolas rojas y 1 azul se extraen dos bolas sin devolver la primera. ¿Cuál es la probabilidad de obtener al menos una roja?',options:[
    {id:'a',text:tex`\(\frac49\).`,feedback:'Ese valor procede de dos rojas con reemplazamiento, que es otra pregunta.'},
    {id:'b',text:tex`\(\frac23\).`,feedback:'Eso solo considera la primera extracción; también sirve azul seguida de roja.'},
    {id:'c',text:tex`\(1\).`,feedback:'Correcto: solo hay una azul, así que en dos extracciones sin reemplazamiento aparece al menos una roja.'},
    {"id":"d","text":"\\(\\frac89\\).","feedback":"Ese resultado usaría reemplazamiento. Sin él, una única bola azul no permite obtener dos azules."}
  ],correct:'c',hint:'Prueba el complementario: ¿pueden salir dos azules sin devolver la primera?',explanation:tex`No pueden salir dos azules porque solo hay una. Así, \(P(\text{al menos una roja})=1-P(\text{dos azules})=1-0=1\).`},
  {id:'q-t07-base-31',topicId:'t07',lessonId:'t07-e08',origin:'ampliacion',sourceFile:'4. Tablas de contingencia y diagramas de árboles.txt',prompt:'En un modelo hipotético, P(A∩B)=0,18 y P(B)=0,30. ¿Cuánto vale P(A dado B)?',options:[
    {id:'a',text:tex`\(0{,}60\).`,feedback:'Correcto: el grupo de referencia es B, de probabilidad 0,30.'},
    {id:'b',text:tex`\(0{,}18\).`,feedback:'Eso es la intersección, sin condicionar.'},
    {id:'c',text:tex`\(\frac{0{,}30}{0{,}18}\).`,feedback:'Has invertido numerador y denominador; el resultado superaría 1.'},
    {"id":"d","text":"\\(0{,}054\\).","feedback":"Has multiplicado 0,18 por 0,30; la condicionada se obtiene dividiendo la intersección entre P(B)."}
  ],correct:'a',hint:'Divide la intersección entre la probabilidad de la condición B.',explanation:tex`Como \(P(B)>0\), \(P(A\mid B)=\frac{P(A\cap B)}{P(B)}=\frac{0{,}18}{0{,}30}=0{,}60\).`},
  {id:'q-t07-base-32',topicId:'t07',lessonId:'t07-e08',origin:'ampliacion',sourceFile:'4. Tablas de contingencia y diagramas de árboles.txt',prompt:'Si P(A)=0,40 y P(B dado A)=0,30, ¿cuánto vale P(A∩B)?',options:[
    {id:'a',text:tex`\(0{,}70\).`,feedback:'La suma no calcula la probabilidad conjunta de este camino.'},
    {id:'b',text:tex`\(0{,}12\).`,feedback:'Correcto: se multiplica la probabilidad de llegar a A por la de B desde A.'},
    {id:'c',text:tex`\(0{,}30\).`,feedback:'Es solo la probabilidad de B condicionada a A.'},
    {"id":"d","text":"\\(0{,}10\\).","feedback":"Restar 0,30 a 0,40 no calcula una intersección; la regla del producto da 0,40 por 0,30."}
  ],correct:'b',hint:'Despeja la intersección de la definición de probabilidad condicionada.',explanation:tex`\(P(A\cap B)=P(A)P(B\mid A)=0{,}40\cdot0{,}30=0{,}12\).`},
  {id:'q-t07-base-33',topicId:'t07',lessonId:'t07-e08',origin:'ampliacion',sourceFile:'4. Tablas de contingencia y diagramas de árboles.txt',prompt:'Si P(B)=0, ¿qué ocurre con P(A dado B) en la definición habitual de Bachillerato?',options:[
    {id:'a',text:tex`Vale \(0\), porque \(P(A\cap B)=0\).`,feedback:'El cociente 0/0 no está definido.'},
    {id:'b',text:tex`Vale \(1\), porque B ya se da por ocurrido.`,feedback:'No se puede condicionar mediante un cociente a un suceso de probabilidad cero.'},
    {id:'c',text:'No está definida por el cociente habitual: el denominador sería cero.',feedback:'Correcto: la fórmula requiere P(B)>0.'},
    {"id":"d","text":"Siempre coincide con P(A), sin ninguna hipótesis adicional.","feedback":"La definición por cociente no permite condicionar a un suceso de probabilidad cero."}
  ],correct:'c',hint:'Comprueba el denominador de la fórmula de P(A dado B).',explanation:tex`La definición \(P(A\mid B)=P(A\cap B)/P(B)\) exige \(P(B)>0\). Si \(P(B)=0\), el cociente no está definido.`},
  {id:'q-t07-base-34',topicId:'t07',lessonId:'t07-e09',origin:'ampliacion',sourceFile:'5. Probabilidad total y Teorema de Bayes.txt',prompt:'Para un dado de seis caras, ¿qué grupos forman una partición válida del espacio muestral?',options:[
    {id:'a',text:tex`\(\{1,2\},\{3,4\},\{5,6\}\).`,feedback:'Correcto: son disjuntos y cubren los seis resultados.'},
    {id:'b',text:tex`\(\{1,2,3\},\{3,4\},\{5,6\}\).`,feedback:'El resultado 3 pertenece a dos grupos: hay solape.'},
    {id:'c',text:tex`\(\{1,2\},\{3,4\},\{5\}\).`,feedback:'Falta el resultado 6: los grupos no cubren todo el espacio.'},
    {"id":"d","text":"\\(\\{1,2\\},\\{2,3\\},\\{4,5\\}\\).","feedback":"El 2 se repite en dos grupos y falta el 6: no son incompatibles ni cubren todo el espacio."}
  ],correct:'a',hint:'Una partición no solapa grupos y no deja resultados fuera.',explanation:tex`Los tres grupos \(\{1,2\},\{3,4\},\{5,6\}\) son incompatibles dos a dos y su unión es \(E=\{1,2,3,4,5,6\}\).`},
  {id:'q-t07-base-35',topicId:'t07',lessonId:'t07-e09',origin:'ampliacion',sourceFile:'5. Probabilidad total y Teorema de Bayes.txt',prompt:'En el ejemplo hipotético original, M₁ produce el 70 % y M₂ el 30 %; sus tasas de defectos son 2 % y 5 %. ¿Cuál es la probabilidad total de defecto?',options:[
    {id:'a',text:tex`\(0{,}035\).`,feedback:'Es la media simple de 2 % y 5 %; las máquinas no producen la misma cantidad.'},
    {id:'b',text:tex`\(0{,}029\).`,feedback:'Correcto: se suman las contribuciones ponderadas de ambas máquinas.'},
    {id:'c',text:tex`\(0{,}014\).`,feedback:'Es solo el camino de M₁ y defecto; falta M₂.'},
    {"id":"d","text":"\\(0{,}015\\).","feedback":"Solo has contado la contribución de M₂; el total incluye también la de M₁."}
  ],correct:'b',hint:'Multiplica el peso de cada máquina por su tasa de defecto y suma los dos caminos.',explanation:tex`\(P(D)=0{,}70\cdot0{,}02+0{,}30\cdot0{,}05=0{,}014+0{,}015=0{,}029\). Son datos didácticos, no observaciones de una fábrica real.`},
  {id:'q-t07-base-36',topicId:'t07',lessonId:'t07-e09',origin:'ampliacion',sourceFile:'4. Tablas de contingencia y diagramas de árboles.txt',prompt:'En otro ejemplo original, P(A)=0,3, P(B dado A)=0,8 y P(B dado A contrario)=0,2. ¿Cuánto vale P(no B)?',options:[
    {id:'a',text:tex`\(0{,}38\).`,feedback:'Esa es P(B), no su complementario.'},
    {id:'b',text:tex`\(0{,}80\).`,feedback:'Es solo P(B dado A), no la probabilidad global.'},
    {id:'c',text:tex`\(0{,}62\).`,feedback:'Correcto: primero se suman los caminos hacia B y luego se toma el contrario.'},
    {"id":"d","text":"\\(0{,}20\\).","feedback":"Es P(B dado A contrario), una sola tasa condicionada; no es el complementario global de B."}
  ],correct:'c',hint:'Calcula P(B) usando los dos grupos A y A contrario; después resta de 1.',explanation:tex`\(P(B)=0{,}3\cdot0{,}8+0{,}7\cdot0{,}2=0{,}38\). Por tanto, \(P(B^c)=1-0{,}38=0{,}62\).`},
  {id:'q-t07-base-37',topicId:'t07',lessonId:'t07-e10',origin:'ampliacion',sourceFile:'5. Probabilidad total y Teorema de Bayes.txt',prompt:'En el ejemplo hipotético, M₁ produce el 70 % con 2 % de defectos y M₂ el 30 % con 5 %. Una pieza ha resultado defectuosa. ¿Cuál es la probabilidad de que proceda de M₂?',options:[
    {id:'a',text:tex`\(\frac{15}{29}\).`,feedback:'Correcto: el camino de M₂ y defecto es 0,015, entre 0,029 de defectos totales.'},
    {id:'b',text:tex`\(0{,}05\).`,feedback:'Es la tasa de defecto dentro de M₂, no M₂ entre las piezas defectuosas.'},
    {id:'c',text:tex`\(0{,}30\).`,feedback:'Es la probabilidad previa de M₂, antes de observar el defecto.'},
    {"id":"d","text":"\\(\\frac{14}{29}\\).","feedback":"Es la posterior de M₁ entre las piezas defectuosas; la pregunta pide M₂."}
  ],correct:'a',hint:'El numerador es M₂ y defecto; el denominador reúne todos los defectos.',explanation:tex`\(P(M_2\mid D)=\frac{P(M_2)P(D\mid M_2)}{P(D)}=\frac{0{,}30\cdot0{,}05}{0{,}029}=\frac{15}{29}\approx0{,}5172\).`},
  {id:'q-t07-base-38',topicId:'t07',lessonId:'t07-e10',origin:'ampliacion',sourceFile:'5. Probabilidad total y Teorema de Bayes.txt',prompt:'En el ejemplo didáctico de correo, el 5 % es spam; la palabra W aparece en el 80 % del spam y en el 10 % del correo normal. Si aparece W, ¿cuál es la probabilidad de spam?',options:[
    {id:'a',text:tex`\(0{,}80\).`,feedback:'Eso es W dado spam, no spam dado W.'},
    {id:'b',text:tex`\(\frac{8}{27}\).`,feedback:'Correcto: se divide el camino spam y W entre todos los mensajes con W.'},
    {id:'c',text:tex`\(0{,}05\).`,feedback:'Es la proporción previa de spam antes de observar la palabra.'},
    {"id":"d","text":"\\(0{,}135\\).","feedback":"Es la probabilidad total de la palabra W; para obtener spam dado W falta dividir la contribución 0,04 entre ese total."}
  ],correct:'b',hint:'Suma los caminos spam-W y normal-W para hallar P(W).',explanation:tex`\(P(W)=0{,}05\cdot0{,}80+0{,}95\cdot0{,}10=0{,}135\). Así, \(P(S\mid W)=0{,}04/0{,}135=8/27\approx0{,}2963\).`},
  {id:'q-t07-base-39',topicId:'t07',lessonId:'t07-e10',origin:'ampliacion',sourceFile:'5. Probabilidad total y Teorema de Bayes.txt',prompt:'Tres causas A₁, A₂ y A₃ forman una partición. Sus caminos conjuntos hacia B tienen probabilidades 0,06; 0,03 y 0,01. Si se ha observado B, ¿cuál es P(A₂ dado B)?',options:[
    {id:'a',text:tex`\(0{,}03\).`,feedback:'Ese es el camino conjunto de A₂ y B, sin dividir por todos los casos de B.'},
    {id:'b',text:tex`\(0{,}10\).`,feedback:'Ese es P(B), el denominador, no la probabilidad posterior de A₂.'},
    {id:'c',text:tex`\(0{,}30\).`,feedback:'Correcto: 0,03 de los 0,10 casos de B pertenecen a A₂.'},
    {"id":"d","text":"\\(0{,}60\\).","feedback":"Corresponde a A₁ dado B; el numerador de A₂ es 0,03, no 0,06."}
  ],correct:'c',hint:'Suma los tres caminos hacia B antes de dividir el de A₂.',explanation:tex`\(P(B)=0{,}06+0{,}03+0{,}01=0{,}10\); luego \(P(A_2\mid B)=0{,}03/0{,}10=0{,}30\). Los datos son un modelo hipotético nuevo.`},
  {id:'q-t07-base-40',topicId:'t07',lessonId:'t07-e04',origin:'ampliacion',sourceFile:'2. Tipos de probabilidad.txt',prompt:'Se elige al azar una de las 200 fichas ficticias de la tabla, todas igualmente probables. ¿Cuál es la probabilidad de que figure como resuelta?',table:reviewTable,options:[
    {id:'a',text:tex`\(\frac{13}{20}=0{,}65\).`,feedback:'Correcto: 130 de las 200 fichas están resueltas.'},
    {id:'b',text:tex`\(\frac{9}{20}=0{,}45\).`,feedback:'Eso cuenta solo las fichas web resueltas.'},
    {id:'c',text:tex`\(\frac12=0{,}50\).`,feedback:'Es la proporción resuelta dentro de teléfono, no la de todas las fichas.'},
    {"id":"d","text":"\\(0{,}60\\).","feedback":"Es el peso del canal web, no el total de fichas resueltas."}
  ],correct:'a',hint:'Usa el total de la columna «Resuelta» y el total general.',explanation:tex`Al elegir uniformemente entre las 200 fichas, \(P(R)=\frac{130}{200}=\frac{13}{20}=0{,}65\). Es una probabilidad del conjunto ficticio, no una estimación poblacional.`},
  {id:'q-t07-base-41',topicId:'t07',lessonId:'t07-e03',origin:'ampliacion',sourceFile:'4. Tablas de contingencia y diagramas de árboles.txt',prompt:'Al elegir una ficha al azar de la tabla, ¿cuál es la probabilidad de que sea web y no resuelta?',table:reviewTable,options:[
    {id:'a',text:tex`\(\frac14=0{,}25\).`,feedback:'Eso es no resuelta dentro de web: 30 de 120.'},
    {id:'b',text:tex`\(\frac{3}{20}=0{,}15\).`,feedback:'Correcto: la casilla conjunta contiene 30 de las 200 fichas.'},
    {id:'c',text:tex`\(\frac{7}{20}=0{,}35\).`,feedback:'Eso incluye todas las fichas no resueltas, web y teléfono.'},
    {"id":"d","text":"\\(0{,}75\\).","feedback":"Es resuelta dentro de web, 90/120; aquí se pide la casilla web y no resuelta entre todas las fichas."}
  ],correct:'b',hint:'«Web y no resuelta» señala una única casilla; el sorteo usa las 200 fichas.',explanation:tex`\(P(W\cap R^c)=\frac{30}{200}=\frac{3}{20}=0{,}15\). El denominador sería 120 solo si se condicionara a web.`},
  {id:'q-t07-base-42',topicId:'t07',lessonId:'t07-e08',origin:'ampliacion',sourceFile:'4. Tablas de contingencia y diagramas de árboles.txt',prompt:'Entre las fichas del canal teléfono de la tabla, ¿qué proporción está resuelta?',table:reviewTable,options:[
    {id:'a',text:tex`\(\frac15=0{,}20\).`,feedback:'Es la probabilidad conjunta teléfono y resuelta entre las 200 fichas.'},
    {id:'b',text:tex`\(\frac4{13}\).`,feedback:'Es teléfono entre las fichas resueltas: la condición inversa.'},
    {id:'c',text:tex`\(\frac12=0{,}50\).`,feedback:'Correcto: 40 de las 80 fichas telefónicas están resueltas.'},
    {"id":"d","text":"\\(0{,}65\\).","feedback":"Es la proporción resuelta entre las 200 fichas; la condición teléfono reduce el grupo a 80."}
  ],correct:'c',hint:'La condición «teléfono» fija el denominador en 80.',explanation:tex`\(P(R\mid T)=\frac{40}{80}=\frac12=0{,}50\). Se restringe el universo a las fichas de teléfono.`},
  {id:'q-t07-base-43',topicId:'t07',lessonId:'t07-e10',origin:'ampliacion',sourceFile:'5. Probabilidad total y Teorema de Bayes.txt',prompt:'Entre las fichas resueltas de la tabla, ¿qué proporción procede del canal teléfono?',table:reviewTable,options:[
    {id:'a',text:tex`\(\frac4{13}\).`,feedback:'Correcto: el grupo conocido son las 130 fichas resueltas.'},
    {id:'b',text:tex`\(\frac12\).`,feedback:'Eso es resuelta dentro de teléfono, la condición inversa.'},
    {id:'c',text:tex`\(\frac15\).`,feedback:'Es la probabilidad conjunta teléfono y resuelta en las 200 fichas.'},
    {"id":"d","text":"\\(0{,}40\\).","feedback":"Es la proporción de teléfono en el conjunto completo; la condición resuelta reduce el total a 130."}
  ],correct:'a',hint:'La condición «resuelta» fija el denominador en 130.',explanation:tex`\(P(T\mid R)=\frac{P(T\cap R)}{P(R)}=\frac{40/200}{130/200}=\frac{40}{130}=\frac4{13}\). Cambiar la condición cambia el denominador.`},
  {id:'q-t07-base-44',topicId:'t07',lessonId:'t07-e02',origin:'ampliacion',sourceFile:'1. Introducción a la probabilidad.txt',prompt:'Al elegir una ficha al azar de la tabla, ¿cuál es la probabilidad de «web o resuelta»?',table:reviewTable,options:[
    {id:'a',text:tex`\(0{,}45\).`,feedback:'Eso es web y resuelta, solo la intersección.'},
    {id:'b',text:tex`\(0{,}80\).`,feedback:'Correcto: la unión incluye todas las web y las resueltas por teléfono.'},
    {id:'c',text:tex`\(1{,}25\).`,feedback:'Has sumado ambos márgenes y contado dos veces las 90 web resueltas.'},
    {"id":"d","text":"\\(0{,}35\\).","feedback":"Es la probabilidad de no resuelta, no la unión de web y resuelta."}
  ],correct:'b',hint:'Suma los dos márgenes y resta la casilla de solape.',explanation:tex`\(P(W\cup R)=\frac{120+130-90}{200}=\frac{160}{200}=0{,}80\). Equivale a restar de 1 las 40 fichas de teléfono no resueltas.`},
  {id:'q-t07-base-45',topicId:'t07',lessonId:'t07-e06',origin:'ampliacion',sourceFile:'3. Axiomática de Kolmogorov.txt',prompt:'En el modelo de fichas de la tabla, ¿son independientes «web» y «resuelta»?',table:reviewTable,options:[
    {id:'a',text:'Sí, porque ambas categorías aparecen en la tabla.',feedback:'La presencia de una intersección no demuestra independencia.'},
    {id:'b',text:'No, porque no pueden ocurrir a la vez.',feedback:'Sí pueden: hay 90 fichas web resueltas.'},
    {id:'c',text:tex`No: \(P(W\cap R)=0{,}45\) y \(P(W)P(R)=0{,}39\).`,feedback:'Correcto: la probabilidad conjunta no coincide con el producto de marginales.'},
    {"id":"d","text":"Sí, porque P(W)+P(R) es mayor que 1.","feedback":"La suma de los márgenes no comprueba independencia; hay que contrastar intersección y producto."}
  ],correct:'c',hint:'Compara la casilla web-resuelta con el producto de los dos totales marginales.',explanation:tex`\(P(W\cap R)=90/200=0{,}45\), mientras \(P(W)P(R)=(120/200)(130/200)=0{,}6\cdot0{,}65=0{,}39\). Por tanto, no son independientes.`},
  {id:'q-t07-base-46',topicId:'t07',lessonId:'t07-e01',origin:'ampliacion',sourceFile:'2. Tipos de probabilidad.txt',prompt:'Se lanzan dos dados equilibrados distinguibles de seis caras y se anota el resultado ordenado. ¿Cuántos resultados elementales equiprobables hay?',options:[
    {id:'a',text:'36',feedback:'Correcto: hay seis posibilidades para cada uno de los dos dados.'},
    {id:'b',text:'12',feedback:'Sumar las caras no cuenta los pares ordenados posibles.'},
    {id:'c',text:'6',feedback:'Ese es el número de resultados de un solo dado.'},
    {"id":"d","text":"21","feedback":"Ese recuento agrupa pares sin distinguir el orden; aquí los dos dados son distinguibles y se cuentan 36 pares ordenados."}
  ],correct:'a',hint:'Cada resultado del primer dado se combina con seis del segundo.',explanation:tex`El espacio muestral tiene \(6\cdot6=36\) pares ordenados equiprobables.`},
  {id:'q-t07-base-47',topicId:'t07',lessonId:'t07-e01',origin:'ampliacion',sourceFile:'2. Tipos de probabilidad.txt',prompt:'Al lanzar dos dados equilibrados distinguibles, ¿cuál es la probabilidad de que la suma sea 7?',options:[
    {id:'a',text:tex`\(\frac1{36}\).`,feedback:'Hay más de un par ordenado favorable.'},
    {id:'b',text:tex`\(\frac16\).`,feedback:'Correcto: seis de los 36 pares ordenados suman 7.'},
    {id:'c',text:tex`\(\frac12\).`,feedback:'No basta con contar las sumas posibles; no son equiprobables.'},
    {"id":"d","text":"\\(\\frac1{11}\\).","feedback":"Las once sumas de 2 a 12 no son equiprobables; hay que contar los pares ordenados que producen 7."}
  ],correct:'b',hint:'Enumera los pares (1,6), (2,5), …, (6,1).',explanation:tex`Los seis pares favorables son \((1,6),(2,5),(3,4),(4,3),(5,2),(6,1)\); así, \(P(S=7)=6/36=1/6\).`},
  {id:'q-t07-base-48',topicId:'t07',lessonId:'t07-e02',origin:'ampliacion',sourceFile:'1. Introducción a la probabilidad.txt',prompt:'Con dos dados equilibrados distinguibles, ¿cuál es la probabilidad de sumar 7 y obtener un número par en el primer dado?',options:[
    {id:'a',text:tex`\(\frac16\).`,feedback:'Eso cuenta todos los pares que suman 7, también los de primer dado impar.'},
    {id:'b',text:tex`\(\frac12\).`,feedback:'Esa es la probabilidad marginal de par en el primer dado.'},
    {id:'c',text:tex`\(\frac1{12}\).`,feedback:'Correcto: tres pares favorables entre 36.'},
    {"id":"d","text":"\\(\\frac1{36}\\).","feedback":"Solo cuenta un par; los favorables son (2,5), (4,3) y (6,1)."}
  ],correct:'c',hint:'De los seis pares que suman 7, selecciona los que empiezan por 2, 4 o 6.',explanation:tex`La intersección contiene \((2,5),(4,3),(6,1)\). Por Laplace, \(P(S=7\cap E)=3/36=1/12\).`},
  {id:'q-t07-base-49',topicId:'t07',lessonId:'t07-e08',origin:'ampliacion',sourceFile:'4. Tablas de contingencia y diagramas de árboles.txt',prompt:'Se sabe que dos dados equilibrados distinguibles han sumado 7. ¿Qué probabilidad hay de que el primer dado sea par?',options:[
    {id:'a',text:tex`\(\frac12\).`,feedback:'Correcto: tres de los seis pares que suman 7 empiezan por un número par.'},
    {id:'b',text:tex`\(\frac1{12}\).`,feedback:'Esa es la probabilidad conjunta, antes de condicionar a la suma 7.'},
    {id:'c',text:tex`\(\frac16\).`,feedback:'Esa es la probabilidad de sumar 7, no de par dada la suma.'},
    {"id":"d","text":"\\(\\frac23\\).","feedback":"De los seis pares cuya suma es 7, tres empiezan por un par; no hay cuatro casos favorables."}
  ],correct:'a',hint:'Tras conocer la suma, el universo se reduce a sus seis pares ordenados.',explanation:tex`\(P(E\mid S=7)=P(E\cap\{S=7\})/P(S=7)=(3/36)/(6/36)=3/6=1/2\).`},
  {id:'q-t07-base-50',topicId:'t07',lessonId:'t07-e06',origin:'ampliacion',sourceFile:'3. Axiomática de Kolmogorov.txt',prompt:'Al lanzar dos dados equilibrados distinguibles, ¿son independientes «la suma es 7» y «el primer dado es par»?',options:[
    {id:'a',text:'No: cualquier suceso sobre la suma depende del primer dado.',feedback:'Aquí debe comprobarse el producto, no inferirse dependencia por el nombre de los sucesos.'},
    {id:'b',text:tex`Sí: \(P(S=7\cap E)=1/12=P(S=7)P(E)\).`,feedback:'Correcto: la intersección coincide con el producto de las probabilidades marginales.'},
    {id:'c',text:'No: solo hay tres pares ordenados comunes.',feedback:'El número de casos comunes no decide por sí solo la independencia.'},
    {"id":"d","text":"No, porque ambos sucesos son incompatibles.","feedback":"Hay tres pares ordenados que cumplen ambos, así que son compatibles; además se cumple el criterio del producto."}
  ],correct:'b',hint:'Compara 3/36 con (6/36)(18/36).',explanation:tex`\(P(S=7\cap E)=3/36=1/12\) y \(P(S=7)P(E)=(1/6)(1/2)=1/12\). Por ello, estos sucesos son independientes.`},
  {id:'q-t07-base-51',topicId:'t07',lessonId:'t07-e01',origin:'ampliacion',sourceFile:'2. Tipos de probabilidad.txt',prompt:'Una urna didáctica contiene tres bolas rojas y dos azules. Se extraen dos sin reemplazamiento. ¿Qué probabilidad hay de que la primera sea roja?',options:[
    {id:'a',text:tex`\(\frac25\).`,feedback:'Esa es la proporción inicial de bolas azules.'},
    {id:'b',text:tex`\(\frac34\).`,feedback:'Después de una extracción puede haber cuatro bolas, pero aquí se pregunta por la primera.'},
    {id:'c',text:tex`\(\frac35\).`,feedback:'Correcto: al principio hay tres rojas entre cinco bolas.'},
    {"id":"d","text":"\\(\\frac12\\).","feedback":"Tener dos colores no los hace equiprobables: hay tres bolas rojas y dos azules."}
  ],correct:'c',hint:'Mira la composición de la urna antes de extraer nada.',explanation:tex`\(P(R_1)=3/5\). La ausencia de reemplazamiento afecta a la segunda extracción.`},
  {id:'q-t07-base-52',topicId:'t07',lessonId:'t07-e08',origin:'ampliacion',sourceFile:'4. Tablas de contingencia y diagramas de árboles.txt',prompt:'Una urna contiene tres bolas rojas y dos azules. Se extraen dos sin reemplazamiento. Si la primera fue roja, ¿qué probabilidad hay de que la segunda sea azul?',options:[
    {id:'a',text:tex`\(\frac12\).`,feedback:'Correcto: quedan dos azules entre cuatro bolas.'},
    {id:'b',text:tex`\(\frac25\).`,feedback:'Era la proporción de azules antes de la primera extracción.'},
    {id:'c',text:tex`\(\frac34\).`,feedback:'Tras sacar una roja quedan dos rojas, no tres.'},
    {"id":"d","text":"\\(\\frac14\\).","feedback":"Se ha retirado una roja; siguen quedando dos azules entre cuatro bolas, no una."}
  ],correct:'a',hint:'Actualiza la urna después de retirar una bola roja.',explanation:tex`Tras la primera roja quedan dos rojas y dos azules. Así, \(P(A_2\mid R_1)=2/4=1/2\).`},
  {id:'q-t07-base-53',topicId:'t07',lessonId:'t07-e07',origin:'ampliacion',sourceFile:'4. Tablas de contingencia y diagramas de árboles.txt',prompt:'Una urna contiene tres bolas rojas y dos azules. Se extraen dos sin reemplazamiento. ¿Qué probabilidad hay de sacar roja y después azul?',options:[
    {id:'a',text:tex`\(\frac6{25}\).`,feedback:'La segunda probabilidad no sigue siendo 2/5 sin reemplazamiento.'},
    {id:'b',text:tex`\(\frac3{10}\).`,feedback:'Correcto: multiplica 3/5 por 2/4.'},
    {id:'c',text:tex`\(\frac12\).`,feedback:'Esa es solo la probabilidad condicionada de azul tras roja.'},
    {"id":"d","text":"\\(\\frac35\\).","feedback":"Es solo la probabilidad de la primera roja; falta la segunda rama azul, de probabilidad 2/4."}
  ],correct:'b',hint:'Multiplica las probabilidades de las dos ramas del camino.',explanation:tex`\(P(R_1\cap A_2)=P(R_1)P(A_2\mid R_1)=(3/5)(2/4)=3/10\).`},
  {id:'q-t07-base-54',topicId:'t07',lessonId:'t07-e07',origin:'ampliacion',sourceFile:'4. Tablas de contingencia y diagramas de árboles.txt',prompt:'Una urna contiene tres bolas rojas y dos azules. Se extraen dos sin reemplazamiento. ¿Qué probabilidad hay de obtener exactamente una roja?',options:[
    {id:'a',text:tex`\(\frac3{10}\).`,feedback:'Eso cuenta solo el orden roja-azul; falta azul-roja.'},
    {id:'b',text:tex`\(\frac12\).`,feedback:'Hay que sumar los dos órdenes con sus probabilidades.'},
    {id:'c',text:tex`\(\frac35\).`,feedback:'Correcto: roja-azul y azul-roja aportan 3/10 cada una.'},
    {"id":"d","text":"\\(\\frac9{10}\\).","feedback":"Ese valor cuenta al menos una roja e incluye dos rojas; se pide exactamente una."}
  ],correct:'c',hint:'Considera por separado los caminos roja-azul y azul-roja.',explanation:tex`\(P(RA)+P(AR)=(3/5)(2/4)+(2/5)(3/4)=3/10+3/10=3/5\).`},
  {id:'q-t07-base-55',topicId:'t07',lessonId:'t07-e07',origin:'ampliacion',sourceFile:'4. Tablas de contingencia y diagramas de árboles.txt',prompt:'Una urna contiene tres bolas rojas y dos azules. Se extraen dos sin reemplazamiento. ¿Qué probabilidad hay de obtener al menos una roja?',options:[
    {id:'a',text:tex`\(\frac9{10}\).`,feedback:'Correcto: el único caso contrario es sacar dos azules, con probabilidad 1/10.'},
    {id:'b',text:tex`\(\frac35\).`,feedback:'Eso cuenta exactamente una roja; también pueden salir dos rojas.'},
    {id:'c',text:tex`\(\frac1{10}\).`,feedback:'Esa es la probabilidad contraria de dos azules.'},
    {"id":"d","text":"\\(\\frac7{10}\\).","feedback":"Es el complemento de dos rojas, es decir, al menos una azul. El contrario de al menos una roja es dos azules."}
  ],correct:'a',hint:'Calcula primero la probabilidad de dos azules y usa el complementario.',explanation:tex`\(P(\text{al menos una roja})=1-P(AA)=1-(2/5)(1/4)=9/10\).`},
  {id:'q-t07-base-56',topicId:'t07',lessonId:'t07-e08',origin:'ampliacion',sourceFile:'4. Tablas de contingencia y diagramas de árboles.txt',prompt:'En el modelo ficticio de la tabla, ¿cuál es la probabilidad conjunta de canal A y etiqueta urgente?',table:channelTable,options:[
    {id:'a',text:tex`\(0{,}10\).`,feedback:'Es la proporción urgente dentro de A, no el conjunto de los dos sucesos.'},
    {id:'b',text:tex`\(0{,}06\).`,feedback:'Correcto: se multiplica el peso de A por su tasa urgente.'},
    {id:'c',text:tex`\(0{,}60\).`,feedback:'Es el peso total del canal A.'},
    {"id":"d","text":"\\(0{,}04\\).","feedback":"Has combinado la tasa urgente de A con el peso 0,40 del canal B; cada tasa se multiplica por el peso de su propio canal."}
  ],correct:'b',hint:'Multiplica P(A) por P(urgente dado A).',explanation:tex`\(P(A\cap U)=P(A)P(U\mid A)=0{,}60\cdot0{,}10=0{,}06\). Los datos son inventados para practicar.`},
  {id:'q-t07-base-57',topicId:'t07',lessonId:'t07-e09',origin:'ampliacion',sourceFile:'5. Probabilidad total y Teorema de Bayes.txt',prompt:'En el modelo ficticio de los canales A y B de la tabla, ¿cuál es la probabilidad total de una etiqueta urgente?',table:channelTable,options:[
    {id:'a',text:tex`\(0{,}20\).`,feedback:'Es la media simple de 0,10 y 0,30; los canales tienen pesos diferentes.'},
    {id:'b',text:tex`\(0{,}12\).`,feedback:'Es solo el camino B y urgente; falta A.'},
    {id:'c',text:tex`\(0{,}18\).`,feedback:'Correcto: suma las dos contribuciones ponderadas.'},
    {"id":"d","text":"\\(0{,}40\\).","feedback":"Has sumado 0,10 y 0,30 sin ponderar por el tamaño de los canales."}
  ],correct:'c',hint:'Suma P(A)P(U dado A) y P(B)P(U dado B).',explanation:tex`\(P(U)=0{,}60\cdot0{,}10+0{,}40\cdot0{,}30=0{,}06+0{,}12=0{,}18\).`},
  {id:'q-t07-base-58',topicId:'t07',lessonId:'t07-e10',origin:'ampliacion',sourceFile:'5. Probabilidad total y Teorema de Bayes.txt',prompt:'En el modelo ficticio de la tabla, si una etiqueta es urgente, ¿cuál es la probabilidad de que proceda del canal B?',table:channelTable,options:[
    {id:'a',text:tex`\(\frac23\).`,feedback:'Correcto: B aporta 0,12 de los 0,18 casos urgentes.'},
    {id:'b',text:tex`\(0{,}30\).`,feedback:'Es urgente dado B, no B dado urgente.'},
    {id:'c',text:tex`\(0{,}40\).`,feedback:'Es la probabilidad previa de B antes de conocer la etiqueta.'},
    {"id":"d","text":"\\(0{,}12\\).","feedback":"Es la probabilidad conjunta de B y urgente; para condicionar hay que dividir entre el total urgente 0,18."}
  ],correct:'a',hint:'Divide la contribución B y urgente por el total urgente.',explanation:tex`\(P(B\mid U)=P(B\cap U)/P(U)=(0{,}40\cdot0{,}30)/0{,}18=0{,}12/0{,}18=2/3\).`},
  {id:'q-t07-base-59',topicId:'t07',lessonId:'t07-e10',origin:'ampliacion',sourceFile:'5. Probabilidad total y Teorema de Bayes.txt',prompt:'En el modelo ficticio de la tabla, si una etiqueta es urgente, ¿cuál es la probabilidad de que proceda del canal A?',table:channelTable,options:[
    {id:'a',text:tex`\(0{,}60\).`,feedback:'Es la probabilidad previa de A, antes de observar la etiqueta.'},
    {id:'b',text:tex`\(\frac13\).`,feedback:'Correcto: A aporta 0,06 de los 0,18 casos urgentes.'},
    {id:'c',text:tex`\(0{,}10\).`,feedback:'Es urgente dado A, no A dado urgente.'},
    {"id":"d","text":"\\(0{,}06\\).","feedback":"Es la probabilidad conjunta de A y urgente; falta dividir entre el total urgente 0,18."}
  ],correct:'b',hint:'Usa 0,06 como numerador y 0,18 como denominador.',explanation:tex`\(P(A\mid U)=P(A\cap U)/P(U)=0{,}06/0{,}18=1/3\). También es \(1-P(B\mid U)\).`},
  {id:'q-t07-base-60',topicId:'t07',lessonId:'t07-e10',origin:'ampliacion',sourceFile:'5. Probabilidad total y Teorema de Bayes.txt',prompt:'En el modelo ficticio de la tabla, ¿cómo cambia la probabilidad del canal B al saber que la etiqueta es urgente?',table:channelTable,options:[
    {id:'a',text:tex`Permanece en \(0{,}40\).`,feedback:'La etiqueta urgente es más frecuente en B que en A y sí cambia la probabilidad.'},
    {id:'b',text:tex`Baja a \(0{,}30\).`,feedback:'0,30 es la proporción urgente dentro de B, con la condición invertida.'},
    {id:'c',text:tex`Sube de \(0{,}40\) a \(2/3\).`,feedback:'Correcto: Bayes actualiza el peso de B tras observar la etiqueta.'},
    {"id":"d","text":"Sube de 0,40 a 1 porque la etiqueta es urgente.","feedback":"También hay etiquetas urgentes en A; observar la etiqueta no hace seguro que el canal sea B."}
  ],correct:'c',hint:'Compara P(B)=0,40 con P(B dado urgente)=0,12/0,18.',explanation:tex`La probabilidad previa es \(P(B)=0{,}40\); la posterior es \(P(B\mid U)=2/3\). Aumenta porque \(P(U\mid B)=0{,}30\) supera \(P(U\mid A)=0{,}10\).`}
];

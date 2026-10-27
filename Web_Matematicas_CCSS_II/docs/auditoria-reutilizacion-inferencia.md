# Reutilización de los HTML de Inferencia Estadística

Actualizado: 15 de octubre de 2026 · Entregas 92–106.

## Alcance

Se conservan los once HTML originales guardados como TXT en `Página web existente/5. Inferencia Estadística/`. Las entregas 92–106 integran la presentación en el [índice del tema 9](../libro/temas/09-inferencia-estadistica/index.html) y la reorganizan como [9.1](../libro/temas/09-inferencia-estadistica/01-estadistica-inferencial.html); las ocho técnicas aparecen en [9.3](../libro/temas/09-inferencia-estadistica/03-tecnicas-de-muestreo.html), distribuciones muestrales, media y proporción muestral en [9.4](../libro/temas/09-inferencia-estadistica/04-distribucion-muestral-teorema-central-del-limite.html), estimación en [9.5](../libro/temas/09-inferencia-estadistica/05-estimacion-puntual-y-estimacion-por-intervalos.html), el laboratorio de intervalos en [9.7](../libro/temas/09-inferencia-estadistica/07-intervalos-de-confianza.html), error y tamaño muestral en [9.8](../libro/temas/09-inferencia-estadistica/08-tamano-de-la-muestra-error-cometido.html), además de los [27 ejercicios resueltos](../libro/temas/09-inferencia-estadistica/ejercicios-resueltos.html), las [30 tarjetas](../tarjetas/index.html?tema=t09) y el [test original de 20 preguntas](../test/index.html?tema=t09). Los once archivos están revisados; esto no significa que el tema esté completo. El tema, 9.1–9.9 y la colección mantienen estado editorial parcial; ya no hay epígrafes vacíos en el tema 9.

| Fuente original | Destino previsto o estado |
|---|---|
| 0. Presentación.txt | Integrado en el índice y reorganizado como 9.1: población, muestra, parámetros, estadísticos, técnicas y ficha técnica ilustrativa. |
| 1. Distribuciones muestrales.txt | Integrado en 9.4: medias, proporciones, sumas y teorema central del límite, con supuestos y notación revisados. Estado parcial. |
| 2. Estimación.txt | Integrado en 9.5: estimación puntual, confianza, valores críticos y fórmula de intervalo de media con desviación poblacional conocida. Estado parcial. |
| 2.1. Distribución de la media muestral.txt | Integrado en 9.4: ejemplo del café y aventura «Operación Bombilla», con probabilidades y conclusión revisadas. Estado parcial. |
| 2.2. Distribución de la proporción muestral.txt | Integrado en 9.4: ejemplo del comercio y aventura «Lanzamiento Premium», comparando normal aproximada con binomial exacta. Estado parcial. |
| 3. Error y tamaño muestral.txt | Integrado en 9.8: margen, tamaño mínimo, esquema, redondeo y relaciones de diseño; calculadora con datos aportados por el estudiante. Estado parcial. |
| 4. Ejercicios resueltos.txt | Integrados 27/27 en colección propia, mismo orden e identificadores; enunciados conservados salvo dos reformulaciones conceptuales y soluciones revisadas. |
| 5. Flashcards.txt | Integradas 30 tarjetas originales revisadas en el visor común. |
| 6. Tipos de muestreo.txt | Integradas ocho técnicas y ejemplos en 9.3; 9.2 organiza ahora el proceso de selección con estado parcial. |
| 7. Tipo test.txt | Integradas 20 preguntas en el test común, con pistas y explicaciones revisadas. |
| 8. Intervalos de confianza.txt | Integrados explicación, fórmula y laboratorio de cuatro controles en 9.7; condiciones y valor crítico revisados. |

## Presentación: correspondencia y correcciones

Original intacto: SHA-256 `2e61d377d29827b2e92c94e1ae4609fcfdeca28720e8db74db99e0131c08e75e`.

| Original | Adaptación |
|---|---|
| «Medir una parte para comprender el todo» | Población, muestra, parámetros y estadísticos definidos con (N,n,mu,sigma,ar{x},s). La inferencia comunica incertidumbre; se retira «salto de fe». |
| Diagrama población/muestra | Esquema accesible con dos sentidos: selección de población a muestra e inferencia de muestra a población. |
| Muestreo aleatorio simple | Se precisan marco, muestras equiprobables de tamaño fijo y selección sin reemplazo en el ejemplo. |
| Muestreo sistemático | Inicio aleatorio y riesgo de periodicidad; (N/n) es una guía bajo condiciones, no una regla universal de enteros. |
| Estratificado | Asignación proporcional presentada como opción; selección aleatoria dentro de cada estrato. |
| Conglomerados | Se distingue estudiar todos los miembros del grupo elegido de un diseño por varias etapas. |
| Ficha con 2500 entrevistas, 95,5 % y ±2 puntos | Se conserva como ejemplo didáctico fechado en octubre de 2023, sin atribuirlo a una encuesta real. Se explicitan los supuestos del cálculo (2sqrt{0,5(1-0,5)/2500}=0,02): proporción cercana a 0,5, muestreo aleatorio simple, población suficientemente grande y ausencia de efecto de diseño. El estratificado citado no permite confirmar ese margen sin más información. |

Se usa el motor local compartido de MathJax, cabecera y pie comunes. La fuente original incluye fuentes externas, MathJax remoto y un pie remoto; la integración usa los componentes locales. Los elementos visuales del original se reducen a un esquema semántico con descripción textual. No se incluyen ejercicios ni bancos que no pertenecen a esta presentación.

La fuente siguiente de la entrega 92 fue `1. Distribuciones muestrales.txt`, integrada en la entrega 93.

## Distribuciones muestrales: entrega 93

Original intacto: SHA-256 `019af2bc0e8f7f5f388715c2bba19df312bf437c8d2ee7f3f092506b5b387b8c`.

| Original | Adaptación |
|---|---|
| «Todas las medias posibles» | Se aclara que la distribución corresponde al estadístico aleatorio \(\bar X\) al repetir el muestreo; no es la lista de observaciones de una muestra. |
| Media de \(\bar X\) y error estándar | \(E(\bar X)=\mu\) y \(\operatorname{DE}(\bar X)=\sigma/\sqrt n\) se presentan como identidades exactas para observaciones independientes e idénticamente distribuidas con varianza finita. |
| «Normal si n≥30» y «normal perfecta» | Se sustituye por la convergencia en distribución del TCL bajo sus supuestos. \(n\ge30\) queda como orientación; la asimetría, colas y dependencia importan. Si la población es normal, la media es normal exactamente. |
| Proporción muestral | Se distingue \(\hat P=X/n\) del valor observado \(\hat p\). Media y varianza exactas bajo ensayos Bernoulli independientes; forma normal aproximada, con \(np,nq\ge5\) como orientación. |
| Suma del grupo | Media, varianza y desviación típica exactas bajo independencia; normalidad exacta solo si las observaciones son normales, o aproximada cuando procede por TCL. |
| Tabla «para examen» | Conserva los tres casos originales y añade la observación individual para impedir elegir \(\sigma/\sqrt n\) cuando se pregunta por una persona. |

El original contiene dos SVG estáticos, sin controles, ejercicios ni bancos. La adaptación mantiene una figura ilustrativa descrita para lectores de pantalla. Los desarrollos de media y proporción muestral de los archivos 2.1 y 2.2 se revisarán aparte. No se añade persistencia ni recursos remotos.

La siguiente fuente de la entrega 93 fue `2. Estimación.txt`, integrada en la entrega 94.

## Estimación: entrega 94

Original intacto: SHA-256 `07f961b5d205d738ce1465a5ac25a04f1b0ade3dcf3d08ccac56034e58ac02b4`.

| Original | Adaptación |
|---|---|
| «Cruce de caminos» | Se distinguen intervalo para una futura media muestral con población conocida e intervalo de confianza para un parámetro fijo desconocido. Los ejemplos 170 y 172 permanecen como orientación, sin inventar límites cuando faltan \(n\) y dispersión. |
| Nivel de confianza y significación | \(z_{\alpha/2}\) definido por una cola superior de \(\alpha/2\). Se explica cobertura de intervalos repetidos, no probabilidad posterior del parámetro tras observar un intervalo. |
| Diagrama normal | Figura semántica con título y descripción; área central \(1-\alpha\) y dos colas \(\alpha/2\). |
| Tabla 90/95/99 % | Valores contrastados con cuantiles independientes: 1,644854; 1,959964; 2,575829. El 99 % se redondea a 2,576, frente a 2,575 truncado en la fuente. |
| Intervalo para media \(\bar x\pm z\sigma/\sqrt n\) | Se explicitan observaciones independientes, normalidad poblacional y \(\sigma\) conocida para cobertura exacta. En otros casos puede ser aproximado; \(\sigma\) desconocida y muestreo complejo requieren otro procedimiento. |
| «Error máximo admisible» | Se distingue margen calculado \(E\), mitad de la anchura, de un objetivo máximo fijado antes del estudio. |

El original no contiene un ejercicio numérico completo, test, tarjetas ni simulador. No se convierte 9.6 en lección disponible por una comparación conceptual; su desarrollo queda pendiente. El motor local de fórmulas y la cabecera/pie compartidos sustituyen los recursos remotos del original.

## Media muestral: entrega 95

Original intacto: SHA-256 `e01d6766bffd2645c5817aa16722218870e330f8263ecc987c08aff4b224295e`.

| Original | Adaptación |
|---|---|
| Fórmula de la media y referencia a \(n\ge30\) | Se enlaza con la teoría ya integrada en 9.4 y se distingue normalidad exacta cuando la población es normal de aproximación por TCL en otras poblaciones. El umbral 30 no se usa como garantía. |
| Bolsa de café, \(N(500,15)\), umbral 495 g | Se conserva el problema. Sin redondear \(z\) antes del cálculo: \(P(X<495)=\Phi(-1/3)\approx0{,}3694\) frente a 0,3707 del original. |
| Media de 25 bolsas | \(\bar X\sim N(500,3)\) exactamente bajo independencia. \(P(\bar X<495)=\Phi(-5/3)\approx0{,}0478\), frente a 0,0475 tras el redondeo intermedio original. |
| «Operación Bombilla», tres preguntas A/B/C | Componente insertable y autocorregible en 9.4. Conserva modelo \(N(1200,80)\), \(n=64\), error estándar 10, \(z=-2\) y cola aproximada 2,28 %. Permite pistas, avance por etapas, teclado y reinicio; sin JavaScript muestra las soluciones en desplegables. |
| Conclusión de que el lote es seguro y puede enviarse | Se retira: una probabilidad bajo el modelo no establece por sí sola una decisión sobre un lote concreto. Harían falta datos observados y una regla de aceptación. |

Los controles y las fórmulas usan los módulos locales compartidos, sin cargar scripts remotos ni guardar respuestas. Esta fuente no contiene un banco general de ejercicios, test o tarjetas. La lección 9.4 sigue parcial.

## Proporción muestral: entrega 96

Original intacto: SHA-256 `fb5a079092df86f284b0ec31e61b1793695089919cd6dde66d7fff9c67b32ac3`.

| Original | Adaptación |
|---|---|
| Éxito/fracaso, \(\hat p=x/n\) y aproximación normal | Se distingue el valor observado \(\hat p\) de la variable \(\hat P=X/n\); el modelo binomial requiere ensayos independientes con \(p\) constante. \(np,nq\ge5\) orienta, no garantiza precisión; \(n\ge30\) no es condición universal. |
| Comercio: \(n=50,p=0{,}20,\hat P>0{,}25\) | \(X\ge13\). Normal sin redondeo intermedio: 0,1884; binomial exacta: 0,1861. El 0,1894 original procede de redondear primero error estándar y \(z\). La frontera de continuidad 12,5/50 coincide con el umbral 0,25 en este caso. |
| «Lanzamiento Premium»: \(n=100,p=0{,}15,\hat P>0{,}20\) | Se conservan las tres decisiones y la tabla 8,08 % como aproximación normal sin corrección; sin redondeo, 8,07 %. El suceso discreto es \(X\ge21\): binomial exacta 6,63 % y normal con corrección de continuidad 6,17 %. |
| Conclusión sobre campaña agresiva y ventas | La probabilidad modelizada no determina por sí sola la estrategia de marketing; una intención declarada tampoco garantiza una compra. |

Las dos aventuras de 9.4 comparten un módulo insertable, permiten teclado, pistas, reinicio y soluciones visibles sin JavaScript. No persisten respuestas. La fuente no contiene un banco general de ejercicios, test o tarjetas. La lección sigue parcial.

## Error y tamaño muestral: entrega 97

Original intacto: SHA-256 `214e94920068be91a48f175564dc3a3973d1dbbb3ca116cfe5b12de864f1469a`.

| Original | Adaptación |
|---|---|
| \(E=z_{\alpha/2}\sigma/\sqrt n\) y figura | Se conserva la fórmula y se dibuja un esquema SVG con título y descripción: \(E\) es cada semianchura del intervalo. Se distingue margen calculado de objetivo máximo fijado antes del estudio. No es una cota determinista de la distancia a la media verdadera. |
| Despeje \(n=(z\sigma/E)^2\) | Se expresa como desigualdad \(n\ge(z\sigma/E_0)^2\) y mínimo entero por techo. La calculadora usa valores críticos precisos para 90/95/99 %, \(\sigma\) conocida y objetivo introducido por quien estudia. |
| Ejemplo aislado 34,02 → 35 | Se conserva como redondeo simbólico; no se inventan valores de desviación, confianza ni objetivo que no aparecen en la fuente. |
| Menor margen, mayor confianza, presupuesto | Se explica que, con lo demás fijo, reducir \(E\) a la mitad cuadruplica aproximadamente \(n\); más confianza ensancha el intervalo si \(n\) no cambia. Se separa la precisión del coste y de sesgos ajenos al muestreo. |

El original no contiene problema numérico completo, banco de test ni tarjetas. La página 9.8 cubre el caso de la media con desviación poblacional conocida e indica sus supuestos; proporciones y diseños complejos quedan pendientes. La calculadora no almacena entradas. Siguiente fuente: `4. Ejercicios resueltos.txt`.

## Ejercicios resueltos: entrega 98

Original intacto: SHA-256 `223af63b58a08064f4176cc90db6ab236af324fb271dd55b9afcbb71af89f067`. Los 27 registros del arreglo original se incorporan uno a uno en [ejercicios-resueltos.html](../libro/temas/09-inferencia-estadistica/ejercicios-resueltos.html), en su orden y con `data-original-id`. Se conservan los títulos y los datos de los enunciados. Los ejercicios 9 y 19 reformulan la pregunta para distinguir centro de proporción frente a media, y margen calculado frente a error real.

| Ejercicios originales | Corrección principal |
|---|---|
| 1, 14 y 16 | Se reparan conclusiones LaTeX; normalidad exacta de medias de población normal; 14 se calcula sin redondeo previo (0,9545) y 16 conserva la cola no nula de \(Z=4\) (0,00317 %). |
| 3, 13, 19 y 26 | El valor crítico bilateral del 99 % se redondea a 2,576; tamaños mínimos 166 y margen de 19 aproximadamente 6,31. Se explica que el margen no acota de forma determinista el error observado. |
| 4 y 23 | Confianza y tamaño reconstruidos de intervalos publicados con extremos redondeados: aproximadamente 95 % y aproximadamente 25, sin reclamar exactitud no justificada. |
| 6, 8, 9 y 12 | Error estándar no es intervalo de \(\pm\) una desviación; un intervalo no atrapa con certeza el parámetro; en intención de voto el centro es una proporción; excluir 330 ml es evidencia estadística bajo el modelo, no prueba absoluta. |
| 10, 11 y 18 | Se mantienen los resultados 2401/2017, 300 adicionales y 35; se precisan supuestos de diseño y el objetivo de margen. |
| 15 y 17 | Se traduce el umbral de proporción a recuentos enteros: \(X\le49\) y \(16\le X\le28\). Binomial exacta 0,0168 y 0,8194; se distinguen aproximaciones normales con/sin corrección. |
| 21, 22, 24 y 25 | Intervalos numéricos comprobados, cobertura interpretada como propiedad del procedimiento; los de proporciones se identifican como normales tipo Wald y aproximados. |

La colección presenta una ficha cada vez con JavaScript; sin él quedan los 27 enunciados y soluciones desplegables. Usa cabecera, pie y MathJax locales, no almacena respuestas y no añade ejercicios inventados. Los títulos «Selectividad» o «EBAU» se conservan de la fuente didáctica y no demuestran procedencia de exámenes oficiales. La revisión de pronunciación matemática y lectores de pantalla queda pendiente. Siguiente fuente: `5. Flashcards.txt`.

## Flashcards: entrega 99

Fuente original intacta: `5. Flashcards.txt`, SHA-256 `af1fb16725425a5807fb838002a54821e28bad8843aee42de6d206365125b246`. Sus 30 preguntas se conservan en el mismo orden con `sourceIndex` 1–30 y ocho categorías: Conceptos Básicos 3, Notación 1, Muestreo 3, Teorema Central Límite 4, Intervalos de Confianza 6, Fórmulas 5, Trucos y Propiedades 4 y Relaciones 4. Destino: [banco revisado](../content/activities/inference-cards.js), [visor](../tarjetas/index.html?tema=t09) y enlace desde el [tema 9](../libro/temas/09-inferencia-estadistica/index.html#tarjetas).

| Tarjetas originales | Precisión incorporada |
|---|---|
| 1–3, población, muestra y parámetros | Una muestra no es representativa por definición; los parámetros poblacionales no son necesariamente conocidos. |
| 5–7, muestreo | Se precisa igualdad entre muestras en el aleatorio simple sin reemplazo, asignación proporcional como opción y condiciones del salto sistemático. |
| 8–11, TCL y error estándar | Se separan media/desviación exactas de normalidad exacta o aproximada. Para proporciones se explicita la binomial escalada; `n≥30` no es garantía universal. |
| 12–17, confianza | Valores críticos bilaterales redondeados a 1,645; 1,960; 2,170 y 2,576. Confianza y significación se interpretan como tasas del procedimiento, no probabilidades posteriores del intervalo observado. |
| 18–22, intervalos y tamaños | Se explicitan desviación conocida, aproximación normal, proporción observada o supuesta para planificación y redondeo al entero superior. El margen no acota el error observado. |
| 23–30, reglas y relaciones | Centro y semianchura dependen del tipo de intervalo; 0,5 es caso conservador de planificación; relaciones 4 y 9 se condicionan a mantener lo demás fijo. |

El visor común muestra una tarjeta cada vez, filtra por categoría y usa la cola local de MathJax. No guarda respuestas ni progreso. La fuente incluye llamadas remotas a MathJax y a un pie externo; la integración emplea los componentes locales compartidos. Se han comprobado las 30 respuestas sin errores de renderizado. Quedan por integrar `6. Tipos de muestreo.txt`, `7. Tipo test.txt` y `8. Intervalos de confianza.txt`; el tema conserva estado parcial y la revisión con lector de pantalla y pronunciación matemática sigue pendiente.

## Tipos de muestreo: entrega 100

Original intacto: SHA-256 `ec539ccf8d74d7e1a826119ea19b588e4ad1c5bdc4618753a0f0f90c111ae443`. El archivo es un catálogo explicativo, sin test, controles ni simulación. Se integra en [9.3](../libro/temas/09-inferencia-estadistica/03-tecnicas-de-muestreo.html); 9.2 no se marca como completada por mera afinidad de título.

| Elemento original | Adaptación y revisión |
|---|---|
| Cuatro características probabilísticas | Se conserva aleatoriedad y probabilidad de inclusión conocida y positiva. Error muestral y generalización dependen también de diseño, cobertura, respuesta, medición y supuestos: no son garantías automáticas. |
| Aleatorio simple y urna | Se especifica extracción sin reemplazo de \(n\) números entre 1 y \(N\), equiprobabilidad de todas las muestras del mismo tamaño. |
| Sistemático, 1000/20 e inicio 8 | Salto 50 y secuencia \(8+50j\), \(j=0,\ldots,19\), desde 8 hasta 958. Se advierte de periodicidad de la lista. |
| Estratificado y conglomerados | Se conservan estratos excluyentes/exhaustivos y grupos naturales; homogeneidad interna y ahorro de costes se presentan como objetivos o posibilidades, no propiedades universales. Se distinguen una y varias etapas. |
| Cuatro técnicas no probabilísticas | Se conservan conveniencia en centro comercial, juicio para desempleados, cuotas de 35/38/27 y referidos entre universitarios inmigrantes. Se aclara que cuotas no implican sorteo dentro de cada grupo. |
| Nota sobre fiabilidad y coste | Se evita afirmar que todo muestreo probabilístico es más fiable o costoso en cualquier caso. Se especifica qué inferencia permite justificar el diseño y qué limitaciones persisten. |

El esquema integrado tiene título, descripción y texto equivalente; la tabla compara los dos diseños. Se usan cabecera, pie y MathJax locales. Se comprueban los ocho métodos y sus ejemplos, el índice, las fórmulas y la lectura ampliada. Quedan `7. Tipo test.txt` y `8. Intervalos de confianza.txt`. La revisión global de accesibilidad con lector de pantalla y pronunciación matemática sigue pendiente.

## Tipo test: entrega 101

Fuente intacta: SHA-256 `24f01ad2e6cd85f317f791ca963cd49ae69f2350a706025a8b4f00da25fbba21`. Se conservan las 20 situaciones, el orden, cuatro opciones por pregunta y la posición de la respuesta prevista (`sourceIndex` 1–20). El [generador](../scripts/build-inference-test.mjs) comprueba el hash y construye el [banco revisado](../content/activities/inference-test.js); el [visor](../test/index.html?tema=t09) utiliza el componente común con pistas, dos intentos y resumen de sesión.

| Preguntas | Revisión |
|---|---|
| 1–3, inferencia, muestra y encuesta | Se conserva la dirección muestra → población y la redacción imparcial; en 2 se explica que tamaño grande no elimina sesgos de selección. |
| 4–5, probabilidad y extrapolación | Se sustituye la promesa de extrapolación automática por probabilidades de inclusión conocidas y estimación de incertidumbre bajo supuestos. |
| 6–7, urna y salto | Se conserva el orden de la urna y el tercer elemento 108 de la secuencia 8, 58, 108. |
| 8–10, estratos y conglomerados | Homogeneidad se plantea como objetivo relativo a la variable; conglomerados son grupos naturales seleccionados primero, no necesariamente heterogéneos de forma perfecta; ahorro de desplazamientos es posible, no seguro. |
| 11–15, métodos no probabilísticos | Se mantienen centro comercial, juicio, cuotas y referidos. Las cuotas se distinguen del sorteo dentro de estratos. |
| 16, factibilidad | Se retira «mucho más fiables» y el coste siempre mayor como regla; se alude a falta de marco o dificultad de acceso. |
| 17–20, población, partición y sesgo | Se amplía población a unidades, no solo personas; se mantienen grupos excluyentes y exhaustivos, selección aleatoria dentro de estratos y el riesgo de una mala muestra. |

Las respuestas se comprueban automáticamente pero no se guardan. El generador también produce una [versión de lectura](../test/inferencia-preguntas.html) con las 20 soluciones desplegables, disponible sin JavaScript. La fuente original carga MathJax remoto; el visor común usa la cola local. Se han recorrido las 20 preguntas en Chrome y se ha comprobado la sesión completa. Queda `8. Intervalos de confianza.txt`; la revisión de lectores de pantalla y pronunciación matemática continúa pendiente.

## Intervalos de confianza: entrega 102

Original intacto: SHA-256 `d916f6fd7c3b455c38d5752158748af848af4b7b470a2c2989ae9a6b88c7c737`. El rótulo «5.9» del original se adapta al epígrafe 9.7 del proyecto. Se conservan la analogía de la red, la fórmula para la media, los cuatro controles con rangos 50–150, 1–40, 5–300 y niveles 90/95/99 %, la figura y las exploraciones de tamaño, confianza y dispersión. Se añade el desplazamiento del centro como consecuencia directa de la fórmula.

| Original | Revisión |
|---|---|
| «Un intervalo siempre es centro ± error» | Se acota a este intervalo bilateral simétrico para la media, con desviación poblacional conocida; no se presenta como estructura universal. |
| Analogía de la red de pesca | Se explica que la confianza es cobertura del procedimiento repetido, no probabilidad posterior de un intervalo ya observado. |
| \(z\) 1,645 / 1,960 / 2,575 | El 99 % se calcula con cuantil 2,575829… y se redondea a 2,576. Los cálculos internos usan cuantiles sin redondeo previo. |
| Laboratorio de cuatro controles | Modelo separado y probado: los extremos, margen, anchura, barra y descripción se actualizan juntos. Los valores iniciales son \(E\approx5{,}37\), intervalo \([94{,}63;105{,}37]\) y anchura \(10{,}74\). |
| Figura de «simulación» | Se describe como visualización determinista de un intervalo. No genera muestras repetidas ni demuestra empíricamente la cobertura. |
| Afirmación de más precisión con más \(n\) | Se condiciona a mantener los demás factores fijos; muestreo sesgado y supuestos incorrectos no se corrigen solo con tamaño. |

La lección incluye fórmula y cálculo inicial sin JavaScript; los controles requieren el módulo local. El SVG tiene título y descripción dinámica; el resultado numérico se anuncia como texto. No se añadió un test, un intervalo de proporción o una simulación aleatoria que no estén en el original. Los once archivos de Inferencia quedan revisados. Al cierre de la entrega 102 seguían pendientes 9.1, 9.2, 9.6 y 9.9 como lecciones propias, además de ampliaciones de las lecciones parciales y la validación global con tecnologías de apoyo.

## Fundamentos de inferencia: entrega 103

La [lección 9.1](../libro/temas/09-inferencia-estadistica/01-estadistica-inferencial.html) reutiliza `0. Presentación.txt`, intacto con SHA-256 `2e61d377d29827b2e92c94e1ae4609fcfdeca28720e8db74db99e0131c08e75e`. Es una reorganización de material ya incorporado a la portada, no la integración de un duodécimo original. El test original aporta las preguntas conceptuales sobre inferencia y tamaño de muestra, y las tarjetas conservan la notación; ninguno se duplica en un banco nuevo.

| Material de partida | Desarrollo en 9.1 |
|---|---|
| Población \(N\), muestra \(n\), parámetros \(\mu,\sigma\), estadísticos \(\bar x,s\) | Tabla que añade la proporción \(p\) y \(\hat p\) ya presente en las tarjetas originales. Se distingue un valor poblacional fijo de un estadístico que varía entre muestras. |
| «Medir una parte para comprender el todo» y esquema | Secuencia explícita población → selección → datos muestrales → inferencia con incertidumbre. Se retira la idea del «salto de fe» y de que tamaño grande asegure representatividad. |
| Ficha de \(n=2500\) entrevistas | Lectura guiada de datos conocidos y ausentes, sin inventar resultados observados ni presentar la ficha como encuesta real. El margen anunciado solo se obtiene bajo supuestos simplificados no documentados para el diseño estratificado descrito. |
| Cuatro técnicas de selección | Enlace a 9.3 para el detalle; no se repite el catálogo ni se da por completado 9.2. |

9.1 queda parcial: el original no ofrece respuestas de la muestra para un cálculo estadístico completo ni un contraste. Continúan pendientes 9.2, 9.6 y 9.9 como epígrafes propios y la revisión global con tecnologías de apoyo.

## Muestreo: entrega 104

La [lección 9.2](../libro/temas/09-inferencia-estadistica/02-muestreo.html) reorganiza tres originales ya conservados: presentación (SHA-256 2e61d377d29827b2e92c94e1ae4609fcfdeca28720e8db74db99e0131c08e75e), técnicas (ec539ccf8d74d7e1a826119ea19b588e4ad1c5bdc4618753a0f0f90c111ae443) y test (24f01ad2e6cd85f317f791ca963cd49ae69f2350a706025a8b4f00da25fbba21). La distinción de población objetivo, marco, muestra seleccionada y unidades observadas es una aclaración pedagógica del proceso, no un dato de la encuesta original. La pregunta del test sobre neutralidad aporta el control de medición. El catálogo detallado permanece en 9.3 y el test común conserva su banco sin duplicados.

La ficha de 2.500 entrevistas se usa solo para distinguir información presente y ausente: no se calculan resultados, respuesta efectiva ni margen validado. 9.2 queda parcial por falta de un estudio observado completo. 9.6 y 9.9 siguen vacíos; también falta la revisión global con tecnologías de apoyo.




## Intervalos característicos: entrega 105

La [lección 9.6](../libro/temas/09-inferencia-estadistica/06-intervalos-de-probabilidad-o-intervalos-caracteristicos.html) desarrolla los cinco puntos del guion del tema: área central, colas, valor crítico, tipificación y puente hacia intervalos de confianza. 2. Estimación.txt aporta la distinción conceptual entre conocer la población y observar una muestra. 4. Ejercicios resueltos.txt aporta los datos de estatura normal con media 172 cm, desviación 9 cm y muestra de 36. La pregunta original pide P(169 ≤ X̄ ≤ 175); el intervalo del 95 % [169,06;174,94] se ha calculado expresamente para esta lección y no se atribuye al enunciado de origen. Los valores 0,9545 y 0,9544 se distinguen por precisión de cálculo frente a tabla redondeada.

Supuestos explicitados: normalidad poblacional, independencia y desviación conocida. Se distingue probabilidad de la media futura en un intervalo fijo de cobertura de intervalos de confianza de 9.7. Estado parcial por falta de más casos y revisión con tecnologías de apoyo. 9.9 continúa vacío; bancos sin cambios.



## Ficha técnica de encuestas: entrega 106

La [lección 9.9](../libro/temas/09-inferencia-estadistica/09-ficha-tecnica-de-encuestas.html) usa la ficha de . Presentación.txt (SHA-256 2e61d377d29827b2e92c94e1ae4609fcfdeca28720e8db74db99e0131c08e75e) y los objetivos del guion del temario (SHA-256 445be4c4aef0014184d2521b336913ee5360426527afe76b0d7af2ca165025f4). Conserva universo, n=2500, estratificación por CCAA y hábitat, ±2 puntos al 95,5 % y fechas del 10 al 15 de octubre de 2023 como datos de un ejemplo didáctico. No atribuye ese ejemplo al CIS ni a una encuesta real.

La tabla identifica marco, selección dentro de estratos, respuesta, ponderación, cuestionario y resultados observados como datos ausentes. El cálculo simplificado 2·√(0,25/2500)=0,02 explica la coincidencia aritmética del anuncio, pero no valida su aplicación al diseño declarado. Se distingue el margen en puntos porcentuales de una garantía de acierto. Estado parcial por falta de una operación documentada y revisión global de accesibilidad; no se añaden preguntas ni tarjetas. Al cierre, 9.1–9.9 tienen contenido parcial y ninguno está vacío.


## Revisión transversal: entrega 107

Se recorrieron las once páginas del tema 9 (índice, nueve epígrafes y colección de ejercicios) y todos sus enlaces locales y fragmentos. Se detectaron y corrigieron referencias desactualizadas a 9.9 y a bancos supuestamente pendientes en 9.4, 9.8, portada y ejercicios. En 9.2, el símbolo del tamaño muestral aparecía como (n) en texto y se corrigió a LaTeX \(n\); también se actualizó el enlace a la ficha ya desarrollada. El índice dinámico muestra diez entradas parciales: nueve lecciones y la colección. MathJax produjo fórmulas sin nodos de error en las once rutas. No se reclasifica ninguna lección como completa; continúan pendientes las mejoras específicas y la revisión con lectores de pantalla/pronunciación matemática.


## Apoyo a la lectura matemática: entrega 108

El motor MathJax local ya cargaba 11y/assistive-mml. Una prueba en Chrome recorrió los nueve epígrafes y comprobó que todas las fórmulas renderizadas tenían MathML de apoyo, sin nodos de error, y que las tablas y figuras propias examinadas tenían rótulos y relaciones semánticas. Se añadieron cuatro explicaciones visibles en palabras junto a fórmulas centrales de 9.6, 9.7 y 9.9. Esas frases complementan la notación sin sustituir el MathML ni cambiar los cálculos. La prueba confirma la presencia técnica del contenido accesible; no comprueba cómo lo pronuncia un lector de pantalla concreto. Ese ensayo manual continúa pendiente.


# Reutilización de los HTML de Probabilidad

Actualizado: 18 de octubre de 2026 · Entregas 109–157.

Las entradas por entrega reflejan el estado de cada fecha y algunas mencionan pendientes que después se resolvieron. El estado vigente del tema se resume en la [auditoría de cobertura y accesibilidad](auditoria-cobertura-accesibilidad-probabilidad.md).

## Inventario y alcance

El bloque original contiene ocho HTML guardados como TXT en «Página web existente/3. Probabilidad». Se conservan intactos. Estas entregas reutilizan parte de los ocho archivos; el contenido restante de esos archivos queda por revisar e integrar.

| Fuente | Uso en esta entrega |
|---|---|
| 0. Presentación.txt | Propósito y recorrido de la portada. SHA-256 4933267d3cc9cfbcfdaaed40272006985fd82b8f3dac3b98331384da090a2659. |
| 1. Introducción a la probabilidad.txt | Concepto de probabilidad, sucesos y espacio muestral. Sus cuatro operaciones y diagramas se adaptan ahora en 7.2. SHA-256 7805666e16e1f0b602632fa8d6dd2a8480f4453ff00a7b4b397e104166120d96. |
| 2. Tipos de probabilidad.txt | Regla de Laplace y ejemplos de dado y baraja. La frecuencia relativa se reserva para 7.4; el ejercicio de unión «rey o copa» se integra en 7.2. SHA-256 ba5abc4e5c9086450b3c7441fdd80420b7b3454647c723117d27bf8142cb2454. |
| 3. Axiomática de Kolmogorov.txt | Tres axiomas, consecuencias y ejemplo de dado. En 7.5 se adaptan los axiomas y el ejemplo; en 7.6 las propiedades y dos problemas. SHA-256 ea186d2415662bd9fcc2ee8841f75f3c15625aa4edbc69a97d6e7f2bf3ac6e04. |
| 4. Tablas de contingencia y diagramas de árboles.txt | Tabla general y ejemplo de aprobar/entregar adaptados en 7.3. Los árboles de incendios y fallos de fábrica y el mini-ejemplo de ramas condicionadas se integran en 7.7; la fórmula dañada del segundo se ha corregido. SHA-256 b014c0d54663b92251debe0accd1b423c4249c78d92db368d1c1a5597fdb14b8. |
| 5. Probabilidad total y Teorema de Bayes.txt | Partición, fórmula y ejemplo de dos máquinas adaptados en 7.9. Bayes se adapta en 7.10. SHA-256 87ec5c86cd1ece3d8d9461ca5a17bbcb079e2b95f37ebd8f75e95acbdabe57e2. |
| 6. Ejercicios resueltos.txt | Ocho problemas con datos y resultados conservados, adaptados a una colección accesible de soluciones desplegables. SHA-256 4e6dd0e04f480d856b4eb094c8ecbe77ee0be630665f8f03621d641eb3ba9d37. |
| 7. Flashcards.txt | Dieciséis tarjetas conservadas en su orden y distribuidas en cinco categorías, con condiciones de aplicación precisadas. SHA-256 11da874cb550b883fbd32165e4ae2f7a36e504d3ef77e654890e450ba1c7a47b. |

## Decisiones didácticas

La [lección 7.1](../libro/temas/07-probabilidad/01-sucesos-regla-de-laplace.html) precisa que Laplace requiere resultados elementales equiprobables. Ordena experimento, espacio, suceso elemental, compuesto, seguro e imposible según el guion del tema. Los ejemplos originales conservados son: dado equilibrado, resultado 3 (1/6), par (3/6), mayor que 4 (2/6); baraja española de 40 cartas, copa (10/40) y caballo (4/40). Los ejemplos numéricos permanecen iguales; no se genera un banco nuevo.

La [portada](../libro/temas/07-probabilidad/index.html) enlaza los diez epígrafes y muestra su estado. Los diez epígrafes tienen contenido parcial. Falta ampliar la práctica, desarrollar los juegos y revisar la accesibilidad con tecnologías de apoyo.


## Álgebra de sucesos: entrega 110

La [lección 7.2](../libro/temas/07-probabilidad/02-algebra-de-sucesos.html) reúne unión, intersección, diferencia y complementario del original de introducción. El nuevo diagrama del dado coloca 2 en A solo, 4 y 6 en ambos, 5 en B solo y 1 y 3 fuera; incluye descripción textual. La tabla distingue «solo A» de «solo uno» y añade las leyes de De Morgan solicitadas por el guion. El ejercicio original «rey o copa» conserva 4+10−1=13 cartas y P=13/40, con la intersección identificada como rey de copas. No se crea banco ni juego. La lección permanece parcial por práctica y validación de accesibilidad pendientes.



## Tablas de contingencia: entrega 111

La [lección 7.3](../libro/temas/07-probabilidad/03-tablas-de-contingencia.html) conserva la tabla simbólica y el ejemplo hipotético del original: 0,35 y 0,25 en la fila de quienes aprueban; 0,15 y 0,25 en la otra fila. Los marginales son 0,60/0,40 y 0,50/0,50. También conserva P(A|B)=0,70. El paso de recuentos a frecuencias y la comparación P(B|A)=7/12 son ampliaciones didácticas derivadas de esos datos, sin atribuirlos a una encuesta observada. Árboles, ejercicios, test y tarjetas siguen pendientes. La lección permanece parcial.



## Frecuencias: entrega 112

La [lección 7.4](../libro/temas/07-probabilidad/04-frecuencias.html) adapta del original «2. Tipos de probabilidad.txt» la frecuencia relativa y sus dos ejemplos: 850/10 000 = 8,5 % y 24/200 = 12 %. Los trata como situaciones didácticas independientes y no como encuestas documentadas. La frecuencia acumulada se añade desde el guion solo para categorías ordenadas. Se matiza la ley de los grandes números: requiere repeticiones comparables e independientes con probabilidad estable y no implica compensación de rachas. La estimación empírica depende del muestreo. Pendientes práctica específica y validación de lectura matemática; estado parcial.


## Axiomática: entrega 113

La [lección 7.5](../libro/temas/07-probabilidad/05-axiomatica-de-kolmogorov.html) conserva los tres axiomas y el ejemplo de «menor que 4» con dado equilibrado. La explicación añade una deducción de P(∅)=0 y precisa que la formulación general del tercer axioma es numerable; las sumas finitas se trabajan en Bachillerato. La asignación 1/6 exige equiprobabilidad y no se deduce solo de los axiomas. Complementarios, unión general y otros ejemplos originales se reservan para 7.6 y siguientes. La autoevaluación original no se ha trasladado. Estado parcial.


## Propiedades: entrega 114

La [lección 7.6](../libro/temas/07-probabilidad/06-propiedades-de-la-probabilidad.html) reúne P(∅)=0, complementario, monotonía y unión general. Conserva del original los casos «al menos un seis» con dos dados y «rey o copas» con baraja española. Precisa que el producto 5/6·5/6 exige independencia y que la suma sin solape exige incompatibilidad. La demostración de monotonía desarrolla el guion. Los ejercicios y la autoevaluación originales siguen pendientes de incorporar a bancos; estado parcial.


## Experimentos compuestos: entrega 115

La [lección 7.7](../libro/temas/07-probabilidad/07-experimentos-compuestos.html) adapta el árbol original de dos incendios independientes: cuatro caminos 0,16, 0,24, 0,24 y 0,36; «al menos una negligencia» = 0,64. La tabla textual hace legibles las etapas y productos. Una urna de 2 rojas y 1 azul, marcada como ampliación didáctica, compara extracción con reemplazamiento (4/9) y sin él (1/3). El ejemplo original de fallos de fábrica se pospone: contiene LaTeX mal formado y redondeo que deben revisarse; el mini-ejemplo de probabilidad total se reserva para 7.9. Lección parcial.


## Probabilidad condicionada: entrega 116

La [lección 7.8](../libro/temas/07-probabilidad/08-probabilidad-condicionada.html) reutiliza la definición P(A|B)=P(A∩B)/P(B) con P(B)>0 y el ejemplo hipotético de aprobar/entregar: 0,35/0,50=0,70. La condición inversa 0,35/0,60=7/12 y la comprobación 0,35≠0,60·0,50 derivan de los mismos datos; no se atribuyen a una muestra observada. Se distingue independencia de incompatibilidad. El mini-ejemplo del original con ramas desde A y Aᶜ se reserva para 7.9. Lección parcial.


## Probabilidad total: entrega 117

La [lección 7.9](../libro/temas/07-probabilidad/09-probabilidad-total.html) conserva la partición y la fórmula del original «5. Probabilidad total y Teorema de Bayes.txt». Su ejemplo de dos máquinas mantiene 70 %/30 %, defectos 2 %/5 % y resultado 2,9 %. El segundo original «4. Tablas de contingencia y diagramas de árboles.txt» aporta el ejemplo de dos ramas 0,3, 0,8 y 0,2, con resultado 0,38. Ambos son escenarios didácticos, no datos observados. Bayes y la inversión de la pregunta se reservan para 7.10. Lección parcial.


## Teorema de Bayes: entrega 118

La [lección 7.10](../libro/temas/07-probabilidad/10-teorema-de-bayes.html) conserva la fórmula y los dos casos del original. En la prueba diagnóstica ficticia, P(+)=0,0392 y P(E|+)=95/392≈0,24235; en el filtro de correo, P(W)=0,135 y P(S|W)=8/27≈0,2963. Se distingue la condición observada de la causa preguntada y se mantienen cálculos exactos hasta el redondeo final. Ninguno de los ejemplos corresponde a una prueba médica o un sistema de correo reales. Los diez epígrafes del tema tienen contenido parcial; falta integrar la autoevaluación original como práctica y validar accesibilidad matemática.



## Ejercicios resueltos: entrega 119

La [colección](../libro/temas/07-probabilidad/ejercicios-resueltos.html) adapta los ocho problemas de «6. Ejercicios resueltos.txt»: 33, 36, 39, 42, 43, 47, 52 y 53. Conserva datos, preguntas y resultados, con notación LaTeX normalizada y resoluciones desplegables que no requieren JavaScript. Se comprobaron de forma independiente los once resultados o apartados mediante fracciones exactas. La numeración procede del archivo local; no acredita origen en una prueba oficial. Se registra la condición de partición del modelo en el problema 53. Los diez epígrafes siguen parciales y la colección también, pendiente de lectura con tecnologías de apoyo y conexión con práctica adicional.


## Tarjetas de Probabilidad: entrega 120

El [banco](../content/activities/probability-cards.js) conserva las 16 tarjetas de «7. Flashcards.txt» en el orden original: 4 conceptos básicos, 4 operaciones, 2 condicionadas, 2 teoremas y 4 trucos de lenguaje. Se han precisado equiprobabilidad para Laplace, P(B)>0 para una condicionada, partición para probabilidad total y Bayes, e incompatibilidad frente a independencia. La [vista común](../tarjetas/index.html?tema=t07) ofrece filtro por categoría, respuesta por botón y fórmulas MathJax; el mazo completo contiene ahora 405 tarjetas. Los ocho archivos originales de Probabilidad se han usado al menos parcialmente. Siguen pendientes otras prácticas, juegos y validación con lector de pantalla.

## Autoevaluaciones de Probabilidad: entrega 121

Las autoevaluaciones insertadas en «3. Axiomática de Kolmogorov.txt», «4. Tablas de contingencia y diagramas de árboles.txt» y «5. Probabilidad total y Teorema de Bayes.txt» aportan tres ideas cada una. El [banco adaptado](../content/activities/probability-test.js) conserva el orden de esas nueve ideas y añade alternativas, pistas y explicaciones: los originales incluían afirmaciones con una sola opción marcada y no ofrecían una elección real. El [test común](../test/index.html?tema=t07) corrige automáticamente; la [lectura de respaldo](../test/probabilidad-preguntas.html) muestra las nueve soluciones en desplegables sin JavaScript. Se precisa que los marginales de una tabla pueden ser frecuencias o probabilidades según su normalización. Total global: 347 preguntas; 405 tarjetas. Fuentes intactas, con las huellas SHA-256 del inventario anterior. Falta ampliar la práctica por lección, desarrollar juegos y validar con lector de pantalla.

## Álgebra de sucesos: entrega 122

El [widget](../widgets/games/t07-a-algebra-de-sucesos/index.html) se basa en las operaciones introducidas en «1. Introducción a la probabilidad.txt» y trabajadas en [7.2](../libro/temas/07-probabilidad/02-algebra-de-sucesos.html). Cada partida genera ocho pares de conjuntos finitos nuevos, dos retos por operación: unión, intersección, diferencia y complemento. Se construye el suceso marcando resultados, con corrección de conjunto exacta, pistas y dos intentos. Los conjuntos y la puntuación son una ampliación didáctica; no proceden del HTML original. La fuente permanece intacta (SHA-256 `7805666e16e1f0b602632fa8d6dd2a8480f4453ff00a7b4b397e104166120d96`). Pendientes los juegos de árboles y Bayes y una prueba con lector de pantalla.

## Árbol de probabilidad: entrega 123

El [widget](../widgets/games/t07-b-arbol-de-probabilidad/index.html) desarrolla la regla de multiplicar ramas y sumar caminos del original «4. Tablas de contingencia y diagramas de árboles.txt», ya tratada en [7.7](../libro/temas/07-probabilidad/07-experimentos-compuestos.html) y [7.9](../libro/temas/07-probabilidad/09-probabilidad-total.html). Cada partida genera seis árboles con porcentajes nuevos y plantea tres caminos, un total, una unión y un camino complementario. Los valores, preguntas y puntuación son ampliación didáctica; no se presentan como ejercicios textuales del original. Fuente intacta, SHA-256 `b014c0d54663b92251debe0accd1b423c4249c78d92db368d1c1a5597fdb14b8`. Pendientes Detective Bayes y prueba con lector de pantalla.

## Detective Bayes: entrega 124

El [widget](../widgets/games/t07-c-detective-bayes/index.html) aplica la fórmula y el orden de cálculo del original «5. Probabilidad total y Teorema de Bayes.txt». Cada caso pide primero la probabilidad total del resultado y después la probabilidad de la causa entre quienes presentan ese resultado. Los seis contextos y sus cifras generadas son ampliación didáctica, no datos observados. La respuesta posterior se redondea a una décima solo al final. La fórmula general se presenta en LaTeX; la explicación textual conserva los caminos. Fuente intacta, SHA-256 `87ec5c86cd1ece3d8d9461ca5a17bbcb079e2b95f37ebd8f75e95acbdabe57e2`. Los tres juegos planificados del tema están disponibles; queda la validación con lector de pantalla.

## Práctica de Laplace en 7.1: entrega 125

La [práctica](../libro/temas/07-probabilidad/01-sucesos-regla-de-laplace.html#practica) amplía la lección con seis preguntas variables de tres familias, basadas en los ejemplos sencillos de «1. Introducción a la probabilidad.txt» y «2. Tipos de probabilidad.txt»: dados equilibrados, extracción equiprobable de bolas y baraja española de 40 cartas. Cada variante mantiene explícita la condición de equiprobabilidad, muestra casos favorables y posibles y simplifica la fracción cuando procede. Las cifras nuevas y los distractores son elaboración didáctica, no preguntas originales. Los archivos fuente siguen intactos (SHA-256 del inventario). La práctica no aumenta las 347 preguntas base; 7.1 permanece parcial hasta ampliar y revisar con lector de pantalla.

## Práctica de sucesos en 7.2: entrega 126

La [práctica](../libro/temas/07-probabilidad/02-algebra-de-sucesos.html#practica) amplía las operaciones de los originales «1. Introducción a la probabilidad.txt» y «2. Tipos de probabilidad.txt». Genera seis conjuntos finitos nuevos por sesión y pide unión, intersección, diferencia, complemento de la unión, diferencia simétrica y complemento de la intersección. Cada caso contiene las cuatro regiones de Venn, para que ninguna respuesta dependa de una región vacía accidental. El modelo usa fichas equiprobables y explica el recuento antes de aplicar Laplace. Los contextos, conjuntos y distractores son ampliación didáctica; las fuentes permanecen intactas. No modifica el banco base de 347 preguntas. Pendiente validación con lector de pantalla.

## Práctica de tablas en 7.3: entrega 127

La [práctica](../libro/temas/07-probabilidad/03-tablas-de-contingencia.html#practica) retoma el esquema 2×2 del original «4. Tablas de contingencia y diagramas de árboles.txt» y genera recuentos sintéticos. Se extrae una tarjeta del conjunto mostrado con equiprobabilidad, así que la fracción es exacta para ese conjunto finito; no se presenta como estimación poblacional. Seis tareas cubren casilla conjunta, dos marginales, dos condicionadas inversas y casilla de ninguno. La tabla de cada pregunta tiene título, encabezados de columna y de fila. Los recuentos y distractores son ampliación didáctica; la fuente está intacta. El banco base sigue en 347 preguntas y queda pendiente la validación con lector de pantalla.

## Práctica de frecuencias en 7.4: entrega 128

La [práctica](../libro/temas/07-probabilidad/04-frecuencias.html#practica) retoma la distinción entre frecuencia absoluta, relativa y probabilidad del original «2. Tipos de probabilidad.txt». Genera registros ficticios de 20 o 40 observaciones repartidas entre categorías ordenadas 0–3 y plantea seis tareas: recuento exacto, frecuencia relativa, porcentaje, acumulado absoluto y relativo, e interpretación del límite inferencial. No se afirma que estos registros sean muestras reales ni que una proporción sea una probabilidad poblacional exacta. Las cifras y opciones son elaboración didáctica; la fuente permanece intacta. El banco base sigue en 347 preguntas y queda pendiente validación con lector de pantalla.

## Práctica de axiomas en 7.5: entrega 129

La [práctica](../libro/temas/07-probabilidad/05-axiomatica-de-kolmogorov.html#practica) amplía los tres axiomas de «3. Axiomática de Kolmogorov.txt» con seis variantes: detectar un valor negativo, completar una distribución, sumar incompatibles, deducir el imposible, hallar un complementario y evitar la falsa equiprobabilidad de dos resultados. El imposible y el complementario se presentan como consecuencias de los axiomas, no como nuevos axiomas. Las cifras y distractores son nuevos; las ideas sobre complementario y dos opciones también aparecen en la autoevaluación original ya integrada. La fuente permanece intacta y el banco base conserva 347 preguntas. Pendiente validación con lector de pantalla.

## Práctica de propiedades en 7.6: entrega 130

La [práctica](../libro/temas/07-probabilidad/06-propiedades-de-la-probabilidad.html#practica) desarrolla complementario, unión general y monotonía del original «3. Axiomática de Kolmogorov.txt». Genera cuatro regiones positivas de veinte resultados y deriva de ellas complementario, unión con solape, intersección y «ninguno»; así evita datos numéricos incoherentes. Dos preguntas adicionales comprueban la inclusión y distinguen incompatibilidad de independencia con probabilidades positivas. El ejemplo de dos dados y el de rey o copas permanecen en la lección. Las cifras y distractores son ampliaciones, la fuente no cambia y el banco base sigue en 347 preguntas. Pendiente validación con lector de pantalla.

## Práctica de experimentos compuestos en 7.7: entrega 131

La [práctica](../libro/temas/07-probabilidad/07-experimentos-compuestos.html#practica) amplía el árbol de dos etapas de «4. Tablas de contingencia y diagramas de árboles.txt». Presenta las ramas como una lista textual ordenada y genera seis tareas con bolas equiprobables: roja-roja y al menos una roja con reemplazamiento; roja-roja y roja-azul sin reemplazamiento; y la segunda rama roja en ambas modalidades. Las fórmulas muestran el producto y el cambio de denominador. Las cifras, urnas y opciones son ampliación didáctica; la fuente sigue intacta (SHA-256 `b014c0d54663b92251debe0accd1b423c4249c78d92db368d1c1a5597fdb14b8`). El banco base continúa en 347 preguntas. Pendiente validación con lector de pantalla.

## Práctica de probabilidad condicionada en 7.8: entrega 132

La [práctica](../libro/temas/07-probabilidad/08-probabilidad-condicionada.html#practica) amplía la tabla y la definición de «4. Tablas de contingencia y diagramas de árboles.txt». Genera tablas semánticas de tarjetas equiprobables y seis tareas: las condicionadas inversas comparten los mismos recuentos, por lo que se ve cambiar únicamente el denominador; siguen dos condiciones con complementario, una condición sobre el complementario y un producto para hallar la conjunta. Los recuentos y distractores son elaboración didáctica. La fuente permanece intacta (SHA-256 `b014c0d54663b92251debe0accd1b423c4249c78d92db368d1c1a5597fdb14b8`), el banco base sigue en 347 preguntas y falta validar la lectura con lector de pantalla.

## Práctica de probabilidad total en 7.9: entrega 133

La [práctica](../libro/temas/07-probabilidad/09-probabilidad-total.html#practica) amplía la partición y el ejemplo de máquinas de «5. Probabilidad total y Teorema de Bayes.txt». Genera dos escenarios hipotéticos por sesión: uno con dos grupos y otro con tres, ambos con pesos positivos que suman 1. Seis preguntas descomponen las contribuciones, las suman y hallan el complementario. Las tablas y cifras son elaboración didáctica; no se presentan como datos observados. La fuente permanece intacta (SHA-256 `87ec5c86cd1ece3d8d9461ca5a17bbcb079e2b95f37ebd8f75e95acbdabe57e2`), el banco base sigue en 347 preguntas y falta validar con lector de pantalla.

## Práctica de Bayes en 7.10: entrega 134

La [práctica](../libro/temas/07-probabilidad/10-teorema-de-bayes.html#practica) desarrolla la fórmula de «5. Probabilidad total y Teorema de Bayes.txt» con dos escenarios hipotéticos de producción, uno de dos líneas y otro de tres. Primero se pide la probabilidad total de observar una marca; después se divide cada contribución por ese total para invertir la condición. El modelo verifica que las posteriores de todas las causas sumen 1. Las cifras y opciones son nuevas y no representan datos reales. La fuente permanece intacta (SHA-256 `87ec5c86cd1ece3d8d9461ca5a17bbcb079e2b95f37ebd8f75e95acbdabe57e2`), el banco base sigue en 347 preguntas y falta validar con lector de pantalla.

## Auditoría transversal: entrega 135

La [auditoría vigente](auditoria-cobertura-accesibilidad-probabilidad.md) comprueba las diez lecciones, sus prácticas, enlaces, fórmulas y recorrido básico por teclado. Corrige el enlace a Muestreo en 7.4 y los textos de estado obsoletos de la portada y 7.10. El componente común de preguntas conserva el foco en el botón de avance después de corregir. Esta revisión no equivale a una prueba manual con lector de pantalla.

## Ejemplo de fallos de fábrica: entrega 136

La [lección 7.7](../libro/temas/07-probabilidad/07-experimentos-compuestos.html#fallos) incorpora el segundo árbol del original «4. Tablas de contingencia y diagramas de árboles.txt». Mantiene \(P(F)=0{,}0002\) y la hipótesis de independencia. Las cuatro probabilidades exactas son 0,00000004; 0,00019996; 0,00019996; y 0,99960004, que suman 1. El original mezclaba delimitadores LaTeX en la última fórmula y redondeaba \((0{,}9998)^2\) antes de restarlo. La adaptación repara el marcado y conserva el resultado exacto \(1-(0{,}9998)^2=0{,}00039996\), aproximadamente 0,0004. La fuente permanece intacta; el ejemplo no se cuenta como problema nuevo del banco.

## Cuatro problemas de ampliación: entrega 137

La [colección](../libro/temas/07-probabilidad/ejercicios-resueltos.html#ampliaciones) conserva sus ocho problemas originales y añade cuatro problemas nuevos identificados A–D. Aplican las operaciones de sucesos, el árbol sin reemplazamiento, las condicionadas inversas de una tabla y Bayes con tres lotes. Los datos de las ampliaciones son hipotéticos y no se atribuyen a los archivos originales. Se han comprobado los resultados con fracciones exactas. La colección alcanza doce problemas desarrollados; sigue pendiente su prueba manual con lector de pantalla.

## Seis preguntas base de sucesos: entrega 138

El [banco de Probabilidad](../content/activities/probability-test.js) conserva las nueve ideas de autoevaluación originales en las posiciones 1–9 y añade seis preguntas base estables para 7.1 y 7.2. Cubren espacio muestral, imposible, límite de Laplace, De Morgan, diferencia de sucesos y la unión «rey o copas» con solape. Se distinguen de las variantes procedurales de las lecciones mediante identificadores y origen de ampliación. La [lectura de respaldo](../test/probabilidad-preguntas.html) incluye las quince respuestas. El tema alcanza 15 preguntas base; el total global pasa de 347 a 353. Las nuevas formulaciones son didácticas y no se atribuyen a autoevaluaciones originales.

## Seis preguntas base de tablas y frecuencias: entrega 139

El [banco](../content/activities/probability-test.js) añade las preguntas 16–21 como ampliaciones estables para 7.3 y 7.4. La tabla hipotética permite calcular una unión, invertir la condición y contrastar independencia; el registro ficticio permite leer frecuencia relativa y acumulada. Una serie corta de lanzamientos distingue frecuencia observada de probabilidad del modelo. Son enunciados y cifras nuevos, basados en los conceptos de «4. Tablas de contingencia y diagramas de árboles.txt» y «2. Tipos de probabilidad.txt», sin atribuirlos a sus autoevaluaciones. La [lectura de respaldo](../test/probabilidad-preguntas.html) contiene las 21 soluciones y dos tablas semánticas. El tema pasa de 15 a 21 preguntas base y el curso de 353 a 359; las variantes procedurales no se cuentan.

## Seis preguntas base de axiomas y propiedades: entrega 140

El [banco](../content/activities/probability-test.js) incorpora las preguntas 22–27 como ampliaciones estables de 7.5 y 7.6. Los tres primeros ítems separan no negatividad, normalización y la deducción del imposible; los siguientes aplican complementario, monotonía y unión con solape. Se basan en «3. Axiomática de Kolmogorov.txt», pero los enunciados y cifras son nuevos y no se atribuyen a su autoevaluación. Las nueve ideas originales adaptadas permanecen en las posiciones 1–9. La [lectura de respaldo](../test/probabilidad-preguntas.html) ofrece 27 soluciones. El tema pasa de 21 a 27 preguntas base y el curso de 359 a 365; las prácticas variables siguen contándose por separado.

## Seis preguntas base de experimentos compuestos y condicionadas: entrega 141

El [banco](../content/activities/probability-test.js) incorpora las preguntas 28–33 como ampliaciones estables de 7.7 y 7.8. La primera deriva «exactamente uno» del árbol original hipotético de dos incendios independientes; dos preguntas usan la urna didáctica de la lección para distinguir reemplazamiento. Otras tres aplican la definición de condicionada, la regla del producto y la condición \(P(B)>0\). El árbol y las reglas proceden de «4. Tablas de contingencia y diagramas de árboles.txt»; las preguntas, la urna y los nuevos datos condicionados no son autoevaluaciones textuales del original. La [lectura de respaldo](../test/probabilidad-preguntas.html) contiene 33 soluciones. El tema pasa de 27 a 33 preguntas base y el curso de 365 a 371.

## Seis preguntas base de probabilidad total y Bayes: entrega 142

El [banco](../content/activities/probability-test.js) incorpora las preguntas 34–39 como ampliaciones estables de 7.9 y 7.10. Reconocer una partición y un caso de tres causas son formulaciones nuevas. Las máquinas y el correo retoman cifras hipotéticas de «5. Probabilidad total y Teorema de Bayes.txt»; la partición \(A,A^c\) con resultado 0,38 procede de «4. Tablas de contingencia y diagramas de árboles.txt». Esas cifras se convierten en preguntas con distractores y explicaciones, sin presentarse como autoevaluaciones textuales originales. Primero se suman caminos hacia el resultado y después se divide por ese total al preguntar por una causa. Las nueve ideas originales adaptadas permanecen en 1–9. La [lectura de respaldo](../test/probabilidad-preguntas.html) contiene 39 soluciones. El tema pasa de 33 a 39 preguntas base y el curso de 371 a 377.

## Repaso integrado con una tabla: entrega 143

El [banco](../content/activities/probability-test.js) añade las preguntas 40–45 como ampliaciones estables. Comparten una tabla 2×2 de 200 fichas ficticias equiprobables: 90 web resueltas, 30 web no resueltas, 40 telefónicas resueltas y 40 telefónicas no resueltas. Aplican frecuencia marginal, intersección, dos condiciones inversas, unión e independencia. El conjunto obliga a conservar los mismos datos mientras cambia el grupo de referencia; permite detectar la confusión entre \(P(R\mid T)=1/2\) y \(P(T\mid R)=4/13\). La estructura de tablas, frecuencias, álgebra de sucesos, condicionadas y Bayes procede de las fuentes 1, 2, 3, 4 y 5 del inventario, pero el contexto y los recuentos son elaboración didáctica propia, sin atribución a un registro observado. La [lectura de respaldo](../test/probabilidad-preguntas.html#repaso-integrado) contiene la tabla semántica y las 45 soluciones. El tema pasa de 39 a 45 preguntas base y el curso de 377 a 383.

## Tres repasos integrados: entrega 144

El [banco](../content/activities/probability-test.js) incorpora las preguntas 46–60 como quince ampliaciones estables, en tres escenarios de cinco: dos dados distinguibles (Laplace, intersección, condicionada e independencia), una urna de tres rojas y dos azules sin reemplazamiento (ramas, dos órdenes y complementario), y dos canales ficticios (conjunta, total y actualización de Bayes). Son elaboraciones didácticas basadas en los conceptos de los originales 1–5 del inventario, no preguntas copiadas de las autoevaluaciones. La tabla de canales representa probabilidades hipotéticas, no un conjunto de observaciones. La [lectura de respaldo](../test/probabilidad-preguntas.html#dos-dados) recoge las sesenta respuestas, con secciones [urna](../test/probabilidad-preguntas.html#urna-sin-reemplazamiento) y [canales](../test/probabilidad-preguntas.html#dos-canales). El tema alcanza 60 preguntas base y el curso 398; falta validar la experiencia con lector de pantalla.

## Revisión editorial de 7.1: entrega 145

La [lección 7.1](../libro/temas/07-probabilidad/01-sucesos-regla-de-laplace.html) explicita objetivos y requisitos, recupera del original «2. Tipos de probabilidad.txt» el caso elemental «obtener un 3» con probabilidad 1/6, y conserva los ejemplos previos de dado y baraja. La ruleta ideal de sectores 180°–90°–90° es una ampliación didáctica nueva: sus tres etiquetas no son equiprobables y las dos pequeñas ocupan juntas la mitad del círculo. Añade errores frecuentes y un resumen que conecta con 7.2 y el test, sin incrementar el banco base ni cambiar el diseño. La fuente original se conserva intacta. Continúa pendiente la revisión manual con lector de pantalla y la del tema completo.

## Revisión editorial de 7.2: entrega 146

La [lección 7.2](../libro/temas/07-probabilidad/02-algebra-de-sucesos.html) conserva las cuatro operaciones de Venn de «1. Introducción a la probabilidad.txt» y la resolución original «rey o copa» de «2. Tipos de probabilidad.txt». Añade objetivos y requisitos, explicita que \(A\setminus B=\{2\}\) y \(B\setminus A=\{5\}\) en el dado didáctico, y compara sobre ese mismo lanzamiento cuatro expresiones: unión \(4/6\), exactamente uno \(2/6\), ninguno \(2/6\) y no ambos \(4/6\). El contraste, los errores frecuentes y el resumen son elaboración editorial nueva, no ejercicios textuales del original. La práctica de seis operaciones y el banco fijo mantienen sus recuentos. Queda pendiente la validación manual con lector de pantalla.

## Revisión editorial de 7.3: entrega 147

La [lección 7.3](../libro/temas/07-probabilidad/03-tablas-de-contingencia.html) conserva la tabla simbólica y el ejemplo hipotético del original «4. Tablas de contingencia y diagramas de árboles.txt»: \(P(A)=0{,}60\), \(P(B)=0{,}50\), \(P(A\cap B)=0{,}35\), con casillas restantes 0,25, 0,15 y 0,25 y \(P(A\mid B)=0{,}70\). Añade objetivos, requisitos y cuatro deducciones didácticas nuevas de esa misma tabla: unión 0,75; ninguno 0,25; \(P(A^c\mid B)=0{,}30\); y no independencia, pues 0,35 difiere de \(0{,}60\cdot0{,}50=0{,}30\). Los errores frecuentes y el resumen refuerzan el cambio de denominador. No hay recuentos de estudiantes observados ni cambios en el banco base. Queda pendiente la validación manual con lector de pantalla.

## Revisión editorial de 7.4: entrega 148

La [lección 7.4](../libro/temas/07-probabilidad/04-frecuencias.html) mantiene del original «2. Tipos de probabilidad.txt» los ejemplos 850/10 000 = 8,5 % y 24/200 = 12 %, y la distinción entre probabilidad teórica y frecuencia empírica. Añade objetivos, una tabla ficticia de diez registros ordenados (frecuencias 2, 3 y 5; acumulados 2, 5 y 10), y un ejemplo ficticio de cuatro seises en veinte lanzamientos: frecuencia 1/5 frente a probabilidad teórica 1/6 para un dado ideal. Estas cifras añadidas son ampliaciones didácticas, no observaciones reales ni ejercicios textuales del original. Los errores frecuentes y el resumen precisan que un tamaño grande no repara por sí solo una selección sesgada. El banco base y la fuente permanecen intactos.

## Revisión editorial de 7.5: entrega 149

La [lección 7.5](../libro/temas/07-probabilidad/05-axiomatica-de-kolmogorov.html) conserva los tres axiomas y el ejemplo original del dado con número menor que 4. Recupera del mismo original «3. Axiomática de Kolmogorov.txt» el ejemplo de sacar una figura en una baraja española de 40 cartas: tres figuras por palo, doce cartas favorables y probabilidad 12/40 = 3/10 bajo extracción uniforme. Añade objetivos y una comparación didáctica de tres asignaciones finitas: (0,2; 0,3; 0,5) es válida; (−0,1; 0,4; 0,7) suma 1 pero viola no negatividad; (0,2; 0,3; 0,4) no está normalizada. Este contraste, los errores frecuentes y el resumen son ampliaciones nuevas. La fuente y el banco base permanecen intactos.

## Revisión editorial de 7.6: entrega 150

La [lección 7.6](../libro/temas/07-probabilidad/06-propiedades-de-la-probabilidad.html) conserva las propiedades del complementario, el imposible, la inclusión y la unión general, junto con los ejemplos originales «al menos un seis» (11/36) y «rey o copas» (13/40). Añade objetivos y un contraste didáctico con los mismos dos dados: el complementario de la unión da \(1-(5/6)^2=11/36\); sumar los sucesos «seis en el primero» y «seis en el segundo» exige restar \(1/36\) de solape; y las inclusiones comprueban \(1/36\leq1/6\leq11/36\). El contraste, los errores y el resumen son elaboración editorial nueva. No se atribuyen al ejercicio textual original ni alteran los 60 ítems base.

## Revisión editorial de 7.7: entrega 151

La [lección 7.7](../libro/temas/07-probabilidad/07-experimentos-compuestos.html#dependencia) reúne ahora tres ejemplos del HTML original «4. Tablas de contingencia y diagramas de árboles.txt»: los dos árboles independientes de incendios y fallos, y el mini-ejemplo condicionado con \(P(A)=0{,}3\), \(P(B\mid A)=0{,}8\) y \(P(B\mid A^c)=0{,}2\). La tabla completa de este último deriva cuatro caminos (0,24; 0,06; 0,14; 0,56), comprueba que suman 1 y que \(P(B)=0{,}38\). Esta tabla y el contraste de dependencia desarrollan las cifras originales; la urna con y sin reemplazamiento continúa marcada como ampliación propia. Se añaden objetivos, errores y resumen. En 7.9 se aclara la procedencia del mismo mini-ejemplo, que viene del archivo 4, mientras que el de máquinas viene del archivo 5. La fuente y el banco base permanecen intactos.

## Revisión editorial de 7.8: entrega 152

La [lección 7.8](../libro/temas/07-probabilidad/08-probabilidad-condicionada.html#tabla) presenta la tabla completa del ejemplo original de aprobar y entregar, derivada de \(P(A)=0{,}60\), \(P(B)=0{,}50\) y \(P(A\cap B)=0{,}35\). Así puede leerse la lección sin salir a 7.3. La nueva comparación calcula \(P(A\mid B)=0{,}70\), \(P(A\mid B^c)=0{,}50\) y \(P(A^c\mid B)=0{,}30\); son derivaciones didácticas de las mismas casillas, no observaciones ni una inferencia causal. Se añaden objetivos, errores frecuentes y resumen. La práctica de seis tablas variables y el banco base permanecen iguales; sigue pendiente la validación manual con lector de pantalla.

## Revisión editorial de 7.9: entrega 153

La [lección 7.9](../libro/temas/07-probabilidad/09-probabilidad-total.html#comprobacion) conserva la partición, la fórmula y el ejemplo de dos máquinas de «5. Probabilidad total y Teorema de Bayes.txt»; el ejemplo de dos ramas procede de «4. Tablas de contingencia y diagramas de árboles.txt». Con los datos originales 70 %/30 % y tasas 2 %/5 %, una ampliación deriva los caminos sin defecto: \(0{,}70\cdot0{,}98=0{,}686\) y \(0{,}30\cdot0{,}95=0{,}285\). Su suma, 0,971, coincide con \(1-0{,}029\). El promedio simple de tasas, 0,035, no representa este modelo de grupos desiguales. Se añaden objetivos, errores y resumen; no cambian las fuentes ni el banco base.

## Revisión editorial de 7.10: entrega 154

La [lección 7.10](../libro/temas/07-probabilidad/10-teorema-de-bayes.html#comprobacion) conserva la fórmula y los dos ejemplos hipotéticos de «5. Probabilidad total y Teorema de Bayes.txt». A partir de sus mismas contribuciones se derivan las probabilidades posteriores de las causas alternativas: \(P(E^c\mid +)=297/392\), junto a \(P(E\mid +)=95/392\); y \(P(S^c\mid W)=19/27\), junto a \(P(S\mid W)=8/27\). Cada par suma 1. La comprobación, los objetivos, errores y resumen son ampliaciones editoriales y no describen datos clínicos ni correo observado. La fuente, la práctica variable y las 60 preguntas base no se modifican.

## Auditoría transversal del tema 7: entrega 155

Las diez lecciones conservan sus fuentes identificadas y contienen objetivos, requisitos, explicación, práctica, errores y resumen. La [prueba transversal](../tests/probability-coverage-accessibility-135-browser.cjs) verifica ahora enlaces y fragmentos reales, tablas y desplegables de todas ellas. Las regresiones del [banco base](../tests/probability-test-121-browser.cjs) y de los [doce problemas](../tests/probability-solved-expansion-137-browser.cjs) confirman los recuentos y distinguen originales de ampliaciones. No se modificó ningún TXT fuente ni se añadió contenido matemático en esta entrega. Continúan pendientes el contraste detallado del material original restante, la calidad editorial de cada ítem y problema, y la validación manual con lector de pantalla.

## Cuatro alternativas por pregunta: entrega 157 · T01

Se añade un cuarto distractor explicado a cada uno de los 60 ítems base. Los nuevos distractores son ampliaciones editoriales; se conservan las tres opciones previas y las respuestas. Las comprobaciones comparan valores numéricos de las alternativas y la huella del contenido anterior. La referencia del ítem 36 se corrige al archivo 4 de tablas y árboles. La regresión de navegador recorre las 60 preguntas con cuatro opciones y prueba una respuesta al nuevo distractor antes de corregirla. Las fuentes siguen intactas y el banco conserva nueve ideas originales adaptadas y 51 ampliaciones. [Verificación](verificacion-entrega-157.md).


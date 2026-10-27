# Auditoría del tema 1: límites y derivadas

Fecha: 18 de septiembre de 2026. Entrega 07.

**Estado actualizado tras la entrega 11 (27 de septiembre):** los cuatro laboratorios están desarrollados. Revisados enlaces, navegación entre las 18 lecciones y lectura al 200 % en móvil; preferencias compartidas con los juegos. Las cifras siguen siendo 60 preguntas base, 61 tarjetas y 15 problemas. El cierre global conserva pendiente la revisión con lectores de pantalla y lectura matemática. Los apartados siguientes conservan el diagnóstico histórico de la entrega 07 y sus actualizaciones.

## Resultado y alcance

Las 18 lecciones tienen contenido y tres preguntas propias cada una. Se añaden seis preguntas transversales: **60 preguntas base**, sin contar las variantes procedurales. El mazo pasa de 56 a **61 tarjetas** tras contrastarlo con los 24 conceptos de la planificación. Se localizan **15 problemas desarrollados** en el inventario siguiente; no se cuentan los test como problemas resueltos.

El tema sigue abierto: Límite Express está parcialmente desarrollado; Derivada Detective y Tangente Sprint son esqueletos. Continuidad: repara la función está implementado y verificado. La revisión editorial no sustituye una auditoría completa de accesibilidad ni la revisión y compilación de todos los exámenes.

## Fuentes y criterio de adaptación

Las rutas siguientes parten de la carpeta superior a este proyecto:

- Temario completo/Guion_Temario_Matematicas_CC_Sociales_II_2Bach.md: secuencia 1.1–1.18.
- Planificacion_Interactiva_2Bach_CC_Sociales/01_Laboratorios_Minijuegos_2Bach_CC_Sociales.md: laboratorios 1A–1D; en esta entrega se implementa 1B.
- Planificacion_Interactiva_2Bach_CC_Sociales/02_Flashcards_2Bach_CC_Sociales.md: 24 conceptos del tema 1.
- Planificacion_Interactiva_2Bach_CC_Sociales/03_Tests_2Bach_CC_Sociales.md: T1.1–T1.10; se corrige la condición de crecimiento de T1.5.
- INVENTARIO_Y_DIAGNOSTICO_MATERIALES.md: identificadores F y errores M.
- Materiales y Recursos y Exámenes/BACH - 2º SOC - Examen Límites y Derivadas.zip (F008), main.tex: preguntas 1–4.
- Materiales y Recursos y Exámenes/BACH - 2º SOC - Ejercicios repaso.zip (F004), main.tex: contraste con EXAMEN 1, preguntas 1–4. Coinciden varios apartados; no se presume que todo el archivo sea idéntico.
- Materiales y Recursos y Exámenes/BACH - 2º SOC - Recuperación T1.zip (F024), main.tex: 1(a–b).
- Materiales y Recursos y Exámenes/BACH - 2º SOC - Subida de nota T1 General.zip (F030), main.tex: 1(a).

Se conserva el enunciado de referencia cuando sus soluciones discrepan. En F030, a/(x−1) exige a=1, b=1; el b=−1 de la versión con a(x−1) corresponde a otra función. En F024, el apartado de tangente fija parámetros nuevos y debe resolverse con ellos.

Los originales no se modifican. F023 y F029, los restantes ejercicios de F024/F030, las otras versiones de repaso y los exámenes generales siguen pendientes de revisión integral y PDF. Los HTML/TXT originales no ofrecen equivalentes directos para estas lecciones del tema 1; las explicaciones adicionales son elaboración docente propia, documentada en [procedencia-contenidos.md](procedencia-contenidos.md).

## Cobertura de preguntas base

Los archivos están en content/activities/ y se reúnen en catalog.js. La ruta de lectura está en [el índice del tema](../libro/temas/01-limites-y-derivadas/index.html).

| Epígrafe | IDs (tres preguntas) | Archivo |
|---|---|---|
| 1.1 Límite | lim-001…003 | limits.js |
| 1.2 Laterales | lat-001…003 | limits.js |
| 1.3 Infinito | inf-001…003 | infinity.js |
| 1.4 Infinito en un punto | point-001…003 | infinity.js |
| 1.5 Finito en el infinito | horiz-001…003 | infinity.js |
| 1.6 Infinito en el infinito | end-001…003 | infinity.js |
| 1.7 Operaciones con límites | prop-001…003 | limit-techniques.js |
| 1.8 Cálculo de límites | calc-001…003 | limit-techniques.js |
| 1.9 Indeterminaciones | ind-001…003 | limit-techniques.js |
| 1.10 Continuidad | cont-001…003 | continuity-derivatives.js |
| 1.11 Función derivada | der-001…003 | continuity-derivatives.js |
| 1.12 Derivadas laterales | latder-001…003 | continuity-derivatives.js |
| 1.13 Tangente y normal | tan-001…003 | derivative-rules.js |
| 1.14 Tabla de derivadas | table-001…003 | derivative-rules.js |
| 1.15 Reglas | rules-001…003 | derivative-rules.js |
| 1.16 Cadena | chain-001…003 | chain-hopital.js |
| 1.17 Derivabilidad y continuidad | theorem-001…003 | chain-hopital.js |
| 1.18 L’Hôpital | hopital-001…003 | chain-hopital.js |
| Repaso transversal | review-001…006 | review-t01.js |

Las seis nuevas preguntas incluyen fuente, epígrafes relacionados, distractores explicados, pista y solución. Se ofrecen por separado en [Practicar](../practicar/index.html#repaso) y dentro del test completo. La distribución equilibrada no supone idéntica dificultad: falta extender las variantes a otros contenidos, especialmente reglas de derivación.

Correspondencia conceptual con los diez test originales: T1.1 → lim-002/calc-001; T1.2 → lat-001; T1.3 → inf-001/inf-003; T1.4 → cont-001/cont-002; T1.5 → review-002 (hipótesis corregida); T1.6 → table-002/chain-001 (cadena); T1.7 → tan-001; T1.8 → latder-003/theorem-003; T1.9 → hopital-001…003 y review-006; T1.10 → tan-001…003. Se conservan objetivos, no necesariamente los mismos números o enunciados.

## Inventario mínimo de problemas resueltos

Se agrupan los apartados de un mismo problema cuando forman una secuencia; se excluyen ejemplos de una única sustitución, tarjetas y test. Los desarrollos originales ya estaban comprobados en entregas anteriores.

| Nº | Problema y procedencia | Dónde leerlo |
|---|---|---|
| 1 | Tarifa por tramos: laterales, salto, valor e interpretación; elaboración propia | [1.2](../libro/temas/01-limites-y-derivadas/02-limites-laterales.html) |
| 2 | F008, 3(f): factorización y signos laterales | [1.4](../libro/temas/01-limites-y-derivadas/04-limites-infinitos-en-un-punto-finito.html) |
| 3 | F008, 3(c): raíz, valor absoluto y dos extremos | [1.5](../libro/temas/01-limites-y-derivadas/05-limites-finitos-en-el-infinito.html) |
| 4 | F008, 3(b): exponencial frente a potencia, con justificación enlazada en 1.18 | [1.6](../libro/temas/01-limites-y-derivadas/06-limites-infinitos-en-el-infinito.html) |
| 5 | F008, 3(a): conjugado y simplificación | [1.8](../libro/temas/01-limites-y-derivadas/08-calculo-de-limites-sencillos.html) |
| 6 | F008, 3(e): resta de fracciones y factor común | [1.9](../libro/temas/01-limites-y-derivadas/09-indeterminaciones.html) |
| 7 | F008, 3(d): potencia indeterminada y logaritmo | [1.18](../libro/temas/01-limites-y-derivadas/18-regla-de-l-hopital-aplicacion-al-calculo-de-limites.html) |
| 8 | F008, 1(a–c): continuidad, derivabilidad, tangente y normal; un solo problema a efectos del recuento | [1.10](../libro/temas/01-limites-y-derivadas/10-continuidad.html), [1.12](../libro/temas/01-limites-y-derivadas/12-derivadas-laterales.html), [1.13](../libro/temas/01-limites-y-derivadas/13-ecuaciones-de-las-rectas-tangente-y-normal.html) |
| 9 | Coste marginal: derivada, aproximación e incremento real; elaboración propia | [1.11](../libro/temas/01-limites-y-derivadas/11-funcion-derivada.html#coste-marginal) |
| 10 | F008, 2(c): cociente con potencia, derivación y simplificación | [1.15](../libro/temas/01-limites-y-derivadas/15-reglas-de-derivacion.html) |
| 11 | F008, 2(a): potencia de cociente y dominio | [1.16](../libro/temas/01-limites-y-derivadas/16-regla-de-la-cadena.html) |
| 12 | F008, 2(f): raíz de logaritmo en denominador y dominio | [1.16](../libro/temas/01-limites-y-derivadas/16-regla-de-la-cadena.html) |
| 13 | F030, 1(a): parámetros en la rama racional; a=1, b=1 | [Repaso, problema 1](../practicar/index.html#parametros-fraccion) |
| 14 | F024, 1(a–b): a=10, b=5; después tangente con b=−2 | [Repaso, problema 2](../practicar/index.html#parametros-tangente) |
| 15 | F008, 4 / F004, EXAMEN 1, 4: distancias y límite asintótico | [Repaso, problema 3](../practicar/index.html#distancia-asintotica) |

## Mazo: contraste de los 24 conceptos previstos

| Conceptos del documento original | Tarjetas que los cubren |
|---|---|
| 1–4: límite, valor, existencia, lateral | fc-lim-01, fc-lim-02, fc-lat-02, fc-lat-01 |
| 5–7: infinito, asíntotas vertical y horizontal | fc-point-01, fc-lat-04, fc-review-01 |
| 8–9: indeterminación y formas | fc-inf-02, fc-review-02 |
| 10–11: continuidad y discontinuidades | fc-cont-01, fc-cont-02, fc-review-03 |
| 12–15: tasa media, derivada, pendiente y signo | fc-review-04, fc-der-01, fc-der-02, fc-review-05 |
| 16–18: continuidad, tangente, normal | fc-latder-02, fc-theorem-01, fc-tan-01…03 |
| 19–22: producto, cociente, cadena, L’Hôpital | fc-rules-01, fc-rules-02, fc-chain-01, fc-hopital-01 |
| 23–24: errores de cociente e indeterminación | fc-rules-02, fc-hopital-02, fc-inf-02, fc-review-02 |

Las cinco tarjetas fc-review-01…05 se añaden en esta entrega para hacer explícitos conceptos antes dispersos. El mazo permite repaso libre; la repetición espaciada y las estadísticas persistentes siguen sin activarse.

## Laboratorios y pendientes

| Actividad | Estado real |
|---|---|
| 1A Límite Express | Parcial: nueve familias y diez rondas; faltan lectura gráfica, niveles y rondas/modalidades especiales |
| 1B Continuidad | Implementado: seis retos, cuatro configuraciones iniciales, tres diagnósticos, reparación única, gráfico, pistas y puntuación |
| 1C Derivada Detective | Esqueleto; siguiente entrega propuesta |
| 1D Tangente Sprint | Esqueleto |

1B mantiene fija la pendiente izquierda y la rama derecha; se modifican b y el valor puntual. Esta elección satisface la opción de ajustar parámetros de la planificación y proporciona una solución única. Todos los datos y soluciones son enteros pequeños. Los cuatro casos son: continua, punto mal definido, ramas desajustadas y ramas más punto desajustados. Los dos últimos se diagnostican como salto.

La puntuación reproduce +50 por lateral, +100 por diagnóstico, +150 por reparación y +100 sin pista. Seis rondas permiten 2700 puntos; cada logro puntúa una vez, aunque haya reintentos. No hay temporizador ni historial guardado.

Pendientes para cerrar t01: completar los otros laboratorios y sus variantes, ampliar la revisión de accesibilidad (lector de pantalla, preferencias dentro de widgets y matemática), y contrastar todos los materiales asociados. La compilación y publicación etiquetada de exámenes y soluciones conserva su fase propia en el plan; no se presenta como realizada.

## Actualización tras la entrega 08 · 27 de septiembre de 2026

Derivada Detective ya está implementado y verificado; sustituye su estado de esqueleto registrado arriba durante la auditoría de la entrega 07. Hay tres widgets funcionales, con Límite Express todavía parcial. El siguiente es Tangente Sprint. Las cifras de preguntas base y tarjetas permanecen en 60 y 61. Véase [verificacion-entrega-08.md](verificacion-entrega-08.md).

## Actualización tras la entrega 09 · 27 de septiembre de 2026

Tangente Sprint está implementado y verificado con cálculo, ecuaciones, ajuste gráfico, normales y reloj opcional. Hay cuatro widgets funcionales en t01; Límite Express conserva los pendientes indicados. El banco fijo permanece en 60 preguntas y 61 tarjetas. El tema sigue abierto por las ampliaciones y la revisión global. Véase [verificacion-entrega-09.md](verificacion-entrega-09.md).

## Actualización tras la entrega 10 · 27 de septiembre de 2026

Límite Express completa lectura gráfica, niveles, rondas especiales y modalidades. Los cuatro laboratorios de t01 están desarrollados. Sigue pendiente la revisión conjunta de contenido, navegación y accesibilidad antes del cierre global. Las cifras editoriales permanecen en 60 preguntas base, 61 tarjetas y 15 problemas inventariados. Véase [verificacion-entrega-10.md](verificacion-entrega-10.md).

## Actualización tras la entrega 11 · 27 de septiembre de 2026

Verificados los enlaces y anclas de 171 HTML, la secuencia de las 18 lecciones, el catálogo de preguntas/tarjetas y las pruebas matemáticas existentes. Añadidos controles de tamaño, contraste y resaltado, sincronizados con los cuatro laboratorios y sus vistas independientes. Corregidos desbordamientos de fórmulas en línea, enunciados, alternativas y selectores; las 18 lecciones pasan a 320 px con texto al 200 %.

La revisión no genera nuevos problemas ni preguntas. Los 15 problemas y la correspondencia de fuentes permanecen en el inventario anterior. Pendientes: lector de pantalla, lectura matemática, contraste gráfico completo y fases globales. El tema conserva estado parcial, aunque ya permite continuar al tema 2. Véase [verificacion-entrega-11.md](verificacion-entrega-11.md).

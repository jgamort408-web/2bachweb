# Auditoría de teoría pendiente del libro

Fecha de revisión: 13 de noviembre de 2026.

**Actualización de seguimiento · 14 de noviembre.** TEO-01–22 tienen su redacción completada y TEO-23 concilia índices y documentación. El diagnóstico inicial conservado abajo describe las carencias detectadas el día 13; las casillas y el registro indican el avance. TEO-24 completada por matriz de cobertura; TEO-25 está en curso (primera pasada de presentación completada) y TEO-26 está completada en su alcance de herramientas. TEO-25E sigue abierta. Redacción completada no equivale a validación visual o accesible.

## Alcance y criterio

Revisión del HTML actual de las 86 lecciones numeradas de los nueve temas, sus índices, dos apoyos y las colecciones de ejercicios de los bloques 6–9. Contraste con el [guion maestro](../../Temario%20completo/Guion_Temario_Matematicas_CC_Sociales_II_2Bach.md), las declaraciones de alcance de las páginas y la planificación. Se revisó el texto estático, incluidos ejemplos desplegables. Esta es una auditoría de cobertura didáctica, sin certificar la corrección de cada fórmula ni la experiencia del navegador.

Una página existente, un juego o una solución de Selectividad no sustituyen una explicación sistemática. A la inversa, una etiqueta «parcial» por accesibilidad no demuestra que falte teoría. Las tareas siguientes distinguen **laguna teórica**, **desarrollo didáctico insuficiente** y **revisión pendiente**.

## Resultado

- Los temas 1–5 reúnen 58 lecciones desarrolladas. En esta pasada no se han identificado secciones vacías ni una laguna teórica explícita comparable a las de los bloques siguientes. Esto no equivale a una auditoría matemática exhaustiva.
- Los temas 6–9 reúnen 28 lecciones declaradas parciales: 5 de programación lineal, 10 de probabilidad, 4 de distribuciones y 9 de inferencia. No son 28 lecciones sin teoría.
- Las lagunas prioritarias están en variables discretas/continuas, probabilidades binomiales acumuladas, problemas inversos de la normal, afijación proporcional, intervalos y tamaño muestral para proporciones, y casos especiales de optimización lineal.
- Dos apoyos tienen ampliaciones pendientes. Combinaciones con repetición se registra como ampliación, sin convertirla en requisito de los nueve temas.

## Tandas de redacción, por orden

Cada casilla representa trabajo pendiente. Cerrar una tarea exige definición y notación, condiciones de uso, procedimiento razonado, ejemplo resuelto y errores frecuentes. Reutilizar los materiales disponibles y señalar las elaboraciones nuevas. No inventar datos para completar una fuente incompleta: un ejemplo nuevo debe identificarse como didáctico.

### TEORIA-01 · Fundamentos de distribuciones

- [x] **TEO-01 · [8.1](../libro/temas/08-distribuciones-de-probabilidad/01-variable-aleatoria.html) · Laguna teórica.** Desarrollar la clasificación discreta/continua con ejemplos y contraejemplos. La lección se limita a la distribución discreta finita; el glosario ya menciona la continua, pero remite aquí sin que exista ese desarrollo.

- [x] **TEO-02 · [8.1](../libro/temas/08-distribuciones-de-probabilidad/01-variable-aleatoria.html) · Laguna teórica.** Conectar masa de probabilidad, densidad y acumulada. Explicar suma frente a área, probabilidad puntual nula en modelos continuos y cálculo de intervalos. La normal de 8.3 ya aporta el caso particular; falta el puente general.

- [x] **TEO-03 · [8.2](../libro/temas/08-distribuciones-de-probabilidad/02-distribucion-binomial.html) · Laguna teórica.** Añadir el procedimiento de probabilidades acumuladas: como máximo, menos de, al menos, más de y entre dos valores. Desarrollar sumas y complementarios, con traducción correcta de los extremos enteros. Aquí solo se desarrolla exactamente k y los parámetros.

- [x] **TEO-04 · [8.3](../libro/temas/08-distribuciones-de-probabilidad/03-distribucion-normal.html) · Laguna teórica.** Desarrollar problemas inversos de la normal: percentiles y obtención de x a partir de una probabilidad, con x=mu+sigma·z y elección de cola. No aparece un procedimiento inverso en la lección.

- [x] **TEO-05 · [8.3](../libro/temas/08-distribuciones-de-probabilidad/03-distribucion-normal.html) · Desarrollo didáctico insuficiente.** Incorporar una lectura resuelta de tabla normal y ejemplos numéricos completos de cola izquierda, derecha e intervalo. Hay fórmulas y explorador, pero falta una secuencia de cálculo autónoma y una tabla consultable o referencia clara a herramienta equivalente.

- [x] **TEO-06 · [8.4](../libro/temas/08-distribuciones-de-probabilidad/04-aproximacion-de-la-distribucion-binomial-a-la-distribucion-normal.html) · Desarrollo didáctico insuficiente.** Añadir ejemplos escritos completos del paso binomial-normal, con condiciones, corrección de continuidad, tipificación y comparación exacta. La teoría y el comparador ya existen; falta una resolución estática que recorra el método sin depender de controles.

### TEORIA-02 · Inferencia y muestreo

- [x] **TEO-07 · [9.3](../libro/temas/09-inferencia-estadistica/03-tecnicas-de-muestreo.html) · Laguna teórica.** Desarrollar afijación proporcional mediante n_h=n·N_h/N, ejemplo numérico, reparto entero y comprobación de la suma. La página menciona asignación proporcional, pero no enseña a calcularla. Los ejercicios del banco pueden proporcionar contextos y datos.

- [x] **TEO-08 · [9.5](../libro/temas/09-inferencia-estadistica/05-estimacion-puntual-y-estimacion-por-intervalos.html) · Desarrollo didáctico insuficiente.** Distinguir explícitamente estimador (estadístico aleatorio) y estimación (valor observado). Añadir un caso numérico que conecte muestra, estimación puntual e intervalo, con todos los datos y supuestos. Actualmente predominan la orientación conceptual y la fórmula de la media.

- [x] **TEO-09 · [9.7](../libro/temas/09-inferencia-estadistica/07-intervalos-de-confianza.html) · Laguna teórica prioritaria.** Desarrollar intervalos de confianza para una proporción poblacional: estimación p-hat=x/n, error estándar estimado, intervalo normal aproximado y condiciones de aplicación. Distinguirlo de la distribución muestral con p conocida de 9.4. La ausencia está declarada expresamente en la página. Es una ampliación necesaria para explicar preguntas del banco, aunque el guion de 9.7 enfatice la media.

- [x] **TEO-10 · [9.7](../libro/temas/09-inferencia-estadistica/07-intervalos-de-confianza.html) · Desarrollo didáctico insuficiente.** Añadir problemas directos e inversos resueltos por escrito: calcular extremos; recuperar centro, margen y tamaño o confianza cuando los datos lo permitan. Ya hay fórmula, interpretación frecuentista y laboratorio para la media; no hay que rehacerlos.

- [x] **TEO-11 · [9.8](../libro/temas/09-inferencia-estadistica/08-tamano-de-la-muestra-error-cometido.html) · Laguna teórica prioritaria.** Desarrollar tamaño mínimo para proporciones con proporción previa y caso conservador p=0,5, justificando el máximo de p(1-p). Incluir condiciones de aproximación, redondeo y diferencia entre error máximo no superior e inferior estricto.

- [x] **TEO-12 · [9.8](../libro/temas/09-inferencia-estadistica/08-tamano-de-la-muestra-error-cometido.html) · Desarrollo didáctico insuficiente.** Incluir un problema numérico completo de tamaño para la media y su verificación. La fuente solo aporta fórmulas y el redondeo simbólico 34,02 a 35. Añadir la distinción entre desigualdad estricta y no estricta, especialmente si el umbral calculado es entero.

- [x] **TEO-13 · [9.6](../libro/temas/09-inferencia-estadistica/06-intervalos-de-probabilidad-o-intervalos-caracteristicos.html) · Ampliación didáctica.** Completar la colección de casos: intervalo característico de una observación frente al de una media, distintos niveles centrales y recuperación de la probabilidad de un intervalo dado. Ya existe la fórmula general, el reparto en colas y el ejemplo de estaturas; no es una página vacía.

- [x] **TEO-14 · [9.9](../libro/temas/09-inferencia-estadistica/09-ficha-tecnica-de-encuestas.html) · Desarrollo didáctico insuficiente.** Añadir una ficha técnica completa, identificada como ejemplo didáctico o con procedencia verificable, y un modelo de elaboración. Contrastar con la ficha incompleta existente. La explicación crítica actual es útil; los datos ausentes del original no pueden recuperarse suponiéndolos.

### TEORIA-03 · Programación lineal

- [x] **TEO-15 · [6.4](../libro/temas/06-programacion-lineal/04-solucion-de-un-problema-de-programacion-lineal.html) · Laguna de casos desarrollados.** Añadir óptimo múltiple sobre un segmento y ausencia de óptimo: región vacía, objetivo no acotado y extremo no alcanzado por frontera excluida, distinguiendo sus causas. Las advertencias generales ya aparecen, pero faltan ejemplos completos. Una región no acotada puede tener un óptimo finito.

- [x] **TEO-16 · [6.3](../libro/temas/06-programacion-lineal/03-programacion-lineal.html) · Desarrollo didáctico insuficiente.** Completar el esquema de formulación con un problema numérico razonado: variables y unidades, traducción de cada frase, objetivo, restricciones y comprobación. La página conserva puntos suspensivos del original. Las lecciones 6.4 y 6.5 ya contienen problemas completos que pueden enlazarse y reutilizarse.

- [x] **TEO-17 · [6.1](../libro/temas/06-programacion-lineal/01-inecuaciones-lineales-con-dos-incognitas.html) · Ampliación didáctica.** Añadir ejemplos específicos de fronteras verticales y horizontales y de frontera por el origen, con otro punto de prueba. El método general y la advertencia de no probar un punto de la frontera ya están presentes; falta consolidarlos con casos resueltos.

- [x] **TEO-18 · [6.2](../libro/temas/06-programacion-lineal/02-sistemas-de-inecuaciones-lineales-con-dos-incognitas.html) · Ampliación didáctica.** Añadir un ejemplo resuelto de intersección vacía y otro de región reducida a segmento o punto. La clasificación ya los menciona. Evitar repetir como novedad la región no acotada con mínimo, que ya se trabaja en la dieta de 6.5.

### TEORIA-04 · Apoyos

- [x] **TEO-19 · [Estadística bidimensional](../libro/apoyos/estadistica-bidimensional.html) · Laguna teórica.** Desarrollar sistemáticamente media, varianza y desviación típica de las distribuciones marginales, con frecuencias y unidades. Hay cálculos en ejemplos y en el ejercicio 2; falta la exposición ordenada, como declara la página.
- [x] **TEO-20 · [Estadística bidimensional](../libro/apoyos/estadistica-bidimensional.html) · Desarrollo didáctico insuficiente.** Explicar juntas las dos rectas de regresión, sus coeficientes y la relación con r², con sus condiciones. Algunos ejercicios usan esas relaciones, mientras la exposición principal presenta la regresión de Y sobre X. Conectar teoría y ejercicios para no introducir fórmulas por primera vez en una solución.
- [x] **TEO-21 · [Combinatoria](../libro/apoyos/combinatoria.html) · Laguna teórica.** Explicar por separado el principio multiplicativo, con etapas, recuento y ejemplo. Actualmente aparece aplicado en el ejercicio 6, sin desarrollo propio.
- [x] **TEO-22 · [Combinatoria](../libro/apoyos/combinatoria.html) · Ampliación opcional.** Valorar combinaciones con repetición y sus diferencias respecto de las otras técnicas. La ausencia está declarada, pero no figura como requisito específico del guion de nueve temas. Decidir su alcance antes de redactar.

## Matriz de las 28 lecciones parciales

Esta tabla permite revisar cada página sin interpretar su etiqueta como ausencia total de teoría.

| Página | Diagnóstico y trabajo asociado |
|---|---|
| [6.1](../libro/temas/06-programacion-lineal/01-inecuaciones-lineales-con-dos-incognitas.html) | TEO-17 redactada: fronteras verticales, horizontales y por el origen. Actividades interactivas y revisión visual/asistida pendientes. |
| [6.2](../libro/temas/06-programacion-lineal/02-sistemas-de-inecuaciones-lineales-con-dos-incognitas.html) | TEO-18 redactada: región vacía, segmento y punto, con comprobación algebraica. Revisión visual y asistida pendiente. |
| [6.3](../libro/temas/06-programacion-lineal/03-programacion-lineal.html) | TEO-16 redactada: formulación numérica, unidades, comprobaciones y variante resuelta. Revisión visual y asistida pendiente. |
| [6.4](../libro/temas/06-programacion-lineal/04-solucion-de-un-problema-de-programacion-lineal.html) | TEO-15 redactada: óptimo múltiple, región vacía, objetivo no acotado y extremo no alcanzado. Revisión visual y asistida pendiente. |
| [6.5](../libro/temas/06-programacion-lineal/05-problemas-de-programacion-lineal.html) | Seis problemas resueltos presentes. No se identifica teoría vacía; falta práctica automática y revisión del laboratorio. |
| [7.1](../libro/temas/07-probabilidad/01-sucesos-regla-de-laplace.html) | Teoría, ejemplos y práctica desarrollados. Estado parcial por revisión editorial global y validación manual con tecnologías de apoyo. No se confirma una laguna teórica específica en esta pasada. |
| [7.2](../libro/temas/07-probabilidad/02-algebra-de-sucesos.html) | Teoría, ejemplos y práctica desarrollados. Estado parcial por revisión editorial global y validación manual con tecnologías de apoyo. No se confirma una laguna teórica específica en esta pasada. |
| [7.3](../libro/temas/07-probabilidad/03-tablas-de-contingencia.html) | Teoría, ejemplos y práctica desarrollados. Estado parcial por revisión editorial global y validación manual con tecnologías de apoyo. No se confirma una laguna teórica específica en esta pasada. |
| [7.4](../libro/temas/07-probabilidad/04-frecuencias.html) | Teoría, ejemplos y práctica desarrollados. Estado parcial por revisión editorial global y validación manual con tecnologías de apoyo. No se confirma una laguna teórica específica en esta pasada. |
| [7.5](../libro/temas/07-probabilidad/05-axiomatica-de-kolmogorov.html) | Teoría, ejemplos y práctica desarrollados. Estado parcial por revisión editorial global y validación manual con tecnologías de apoyo. No se confirma una laguna teórica específica en esta pasada. |
| [7.6](../libro/temas/07-probabilidad/06-propiedades-de-la-probabilidad.html) | Teoría, ejemplos y práctica desarrollados. Estado parcial por revisión editorial global y validación manual con tecnologías de apoyo. No se confirma una laguna teórica específica en esta pasada. |
| [7.7](../libro/temas/07-probabilidad/07-experimentos-compuestos.html) | Teoría, ejemplos y práctica desarrollados. Estado parcial por revisión editorial global y validación manual con tecnologías de apoyo. No se confirma una laguna teórica específica en esta pasada. |
| [7.8](../libro/temas/07-probabilidad/08-probabilidad-condicionada.html) | Teoría, ejemplos y práctica desarrollados. Estado parcial por revisión editorial global y validación manual con tecnologías de apoyo. No se confirma una laguna teórica específica en esta pasada. |
| [7.9](../libro/temas/07-probabilidad/09-probabilidad-total.html) | Teoría, ejemplos y práctica desarrollados. Estado parcial por revisión editorial global y validación manual con tecnologías de apoyo. No se confirma una laguna teórica específica en esta pasada. |
| [7.10](../libro/temas/07-probabilidad/10-teorema-de-bayes.html) | Teoría, ejemplos y práctica desarrollados. Estado parcial por revisión editorial global y validación manual con tecnologías de apoyo. No se confirma una laguna teórica específica en esta pasada. |
| [8.1](../libro/temas/08-distribuciones-de-probabilidad/01-variable-aleatoria.html) | Falta clasificación y puente discreta/continua. TEO-01–02. |
| [8.2](../libro/temas/08-distribuciones-de-probabilidad/02-distribucion-binomial.html) | Falta desarrollo de acumuladas. TEO-03. |
| [8.3](../libro/temas/08-distribuciones-de-probabilidad/03-distribucion-normal.html) | Faltan inversos y secuencia numérica autónoma. TEO-04–05. |
| [8.4](../libro/temas/08-distribuciones-de-probabilidad/04-aproximacion-de-la-distribucion-binomial-a-la-distribucion-normal.html) | Teoría y comparador presentes. Desarrollo resuelto TEO-06. |
| [9.1](../libro/temas/09-inferencia-estadistica/01-estadistica-inferencial.html) | Introducción conceptual presente. Consolidar con ejemplo de variabilidad y enlaces a 9.4–9.5; sin vacío teórico específico confirmado. |
| [9.2](../libro/temas/09-inferencia-estadistica/02-muestreo.html) | Marco, selección y sesgos presentes. Falta caso completo de diseño con datos identificados; no inventar una encuesta real. |
| [9.3](../libro/temas/09-inferencia-estadistica/03-tecnicas-de-muestreo.html) | Ocho técnicas presentes. TEO-07 redactada: afijación proporcional, ejemplo y reparto entero. Revisión visual y asistida pendiente. |
| [9.4](../libro/temas/09-inferencia-estadistica/04-distribucion-muestral-teorema-central-del-limite.html) | Media, proporción, suma y TCL desarrollados, con ejemplos. Pendiente revisión editorial y accesibilidad; no se identifica vacío teórico explícito. |
| [9.5](../libro/temas/09-inferencia-estadistica/05-estimacion-puntual-y-estimacion-por-intervalos.html) | TEO-08 redactada: parámetro, estimador, estimación y ejemplo numérico completo. Revisión visual y asistida pendiente. |
| [9.6](../libro/temas/09-inferencia-estadistica/06-intervalos-de-probabilidad-o-intervalos-caracteristicos.html) | TEO-13 redactada: individual/media, niveles centrales e intervalo no centrado. Revisión visual y asistida pendiente. |
| [9.7](../libro/temas/09-inferencia-estadistica/07-intervalos-de-confianza.html) | TEO-09 redactada: proporciones, condiciones y ejemplos. TEO-10 redactada: problemas directos e inversos. Revisión visual y asistida pendiente. |
| [9.8](../libro/temas/09-inferencia-estadistica/08-tamano-de-la-muestra-error-cometido.html) | TEO-11 redactada: planificación para proporciones, caso conservador y desigualdad estricta. TEO-12 redactada: problema de media, mínimos y error estricto. Revisión visual y asistida pendiente. |
| [9.9](../libro/temas/09-inferencia-estadistica/09-ficha-tecnica-de-encuestas.html) | TEO-14 redactada: ficha completa ficticia y guía de elaboración. Revisión visual y asistida pendiente. |

## Revisiones transversales y límites

- [x] **TEO-23 · Conciliar estados y textos antiguos.** El índice del libro dice que algunas páginas se irán completando y `docs/estado-proyecto.md` conserva cifras y diagnósticos de octubre. Formulario y glosario ya tienen entradas: no deben seguir contabilizándose como esqueletos. Actualizar el resumen tras las tandas, sin marcar como terminada una lección solo por tener HTML.
- [x] **TEO-24 · Segunda pasada de los temas 1–5.** Cotejar requisito por requisito del guion con ejemplos y explicaciones, especialmente hipótesis de teoremas y límites de los métodos. La revisión actual de estructura y texto no autoriza certificar toda su teoría. Integración por partes y fracciones racionales aparecen como ampliaciones iniciales en 3.4; no se consideran aquí ausencias del curso completo por no cubrir todos los casos universitarios.
- [ ] **TEO-25 · Cierre editorial y accesible.** Revisar navegación entre teoría y soluciones, lectura sin JavaScript, fórmulas con lector de pantalla y pronunciación. Registrar estas tareas aparte de las lagunas de contenido. En Probabilidad son la causa principal del estado parcial.
- [x] **TEO-25A · Primera pasada automatizada y visual.** 16 páginas, 994 fórmulas y sus MathML auxiliares. Incidencias móviles y límites documentados en el [informe](REVISION_VISUAL_TEORIA_TEO25.md). Pendientes TEO-25B–E; no cierra TEO-25.
- [x] **TEO-26 · Alinear herramientas.** Después de redactar, incorporar al formulario, glosario y enlaces las fórmulas y conceptos nuevos, especialmente proporciones. Tener una definición en una tarjeta no acredita que la lección enlazada la explique.

No se añaden como obligaciones distribución t de Student, contrastes de hipótesis, inferencia con diseños complejos ni todas las técnicas de integración: requieren decidir su encaje en el temario. Las menciones actuales a sus límites son pertinentes.

## Cómo cerrar cada tanda

1. Localizar teoría y ejemplos reutilizables en los originales y el banco de Selectividad.
2. Redactar las tareas de la tanda, distinguiendo material adaptado y ampliaciones.
3. Comprobar fórmulas, condiciones y resultados con cálculo independiente.
4. Revisar lectura estática, fórmulas, enlaces y accesibilidad. Ejecutar las comprobaciones correspondientes a las páginas modificadas.
5. Marcar solo tareas realmente terminadas y registrar progreso con fecha y archivos. Mantener separados teoría, ejemplos, actividades y accesibilidad.

## Registro

- 2026-11-13 · `docs(teoria)`: inventariadas 86 lecciones y dos apoyos; 28 lecciones con estado parcial diferenciadas por causa. Se indexan TEO-01–26 en cuatro tandas de redacción y una revisión transversal. En esta entrega se crea el diagnóstico; no se modifica teoría ni diseño.

- 2026-11-13 · `feat(teoria-01a)`: TEO-01 y TEO-02 redactadas en 8.1. Clasificación finita/numerable y continua con densidad; masa, área y acumulada; ejemplos de monedas y espera uniforme identificados como ampliaciones. TEO-03–06 siguen pendientes. Comprobación independiente mediante recuento exhaustivo y fracciones exactas.

Comprobación TEORIA-01a: `npm test`, 385 pruebas, 384 superadas y un fallo de sincronización de `selectividad/04-matrices-y-determinantes.html` con su generador, fuera del cambio de teoría. Comprobación de navegador intentada, bloqueada por `ERR_NETWORK_ACCESS_DENIED` al servidor local; renderizado MathJax y revisión visual pendientes. No se declara validación visual completada.

Enlaces verificados: 187 páginas, cero enlaces pendientes. Próxima tarea de redacción: TEO-03, probabilidades binomiales acumuladas.

- 2026-11-13 · `feat(teoria-01b)`: TEO-03 completada en 8.2. Acumulada, seis traducciones de lenguaje a sucesos, complementarios, intervalos y umbrales no enteros. Cuatro ejemplos con los datos originales del jugador; todas las masas y resultados verificados mediante fracciones exactas. Dos pruebas del modelo binomial superadas. Enlaces: 187 páginas y cero pendientes. Revisión visual MathJax pendiente; se conserva el motor existente. Siguiente TEO-04–05, normal inversa y ejemplos de cálculo.

- 2026-11-13 · `feat(teoria-01c)`: TEO-04 y TEO-05 completadas en 8.3. Extracto consultable de ocho valores de la normal estándar, lectura de tabla, colas e intervalo, percentil 90, cola superior del 5 % e intervalo central del 95 %. Ejemplos identificados como didácticos. Tabla y resultados contrastados con `statistics.NormalDist`; seis pruebas de modelo y catálogo superadas. Revisión visual y de lectura asistida pendiente. TEO-06 es la siguiente tarea para cerrar la redacción de TEORIA-01.

- 2026-11-13 · `feat(teoria-01d)`: TEO-06 redactada en 8.4. Tabla de seis traducciones con corrección de continuidad, cuatro cálculos completos para B(100;0,5), contraste binomial exacto y error absoluto, y contraejemplo con np=1. Masas calculadas con coeficientes binomiales y fracciones exactas; normal evaluada independientemente con `statistics.NormalDist`. Ocho pruebas superadas, enlaces comprobados en 187 páginas sin pendientes. TEO-01–06 tienen su redacción completada; la revisión visual MathJax y con tecnologías de apoyo sigue abierta en TEO-25. Próxima redacción: TEORIA-02, TEO-07, afijación proporcional.

- 2026-11-13 · `feat(teoria-02a)`: TEO-07 redactada en 9.3. Fórmula y supuestos de afijación proporcional, reparto 30/90/40/20 con datos de SEL-D0070-OB-E03 II(b), método de restos mayores con empate documentado y ejercicio de comprobación. Tres ejemplos contrastados con fracciones exactas; suma y límites del reparto entero comprobados en 1452 casos. Tres pruebas de catálogo superadas. Revisión visual de fórmulas y con tecnologías de apoyo pendiente. Próxima tarea TEO-08, estimador y estimación.

- 2026-11-13 · `feat(teoria-02b)`: TEO-08 redactada en 9.5. Definiciones de estadístico, estimador y estimación; notación observada/aleatoria; significado de insesgadez. Ejemplo didáctico completo con cuatro observaciones, normalidad y sigma conocida, una segunda muestra y actividad resuelta. Medias y extremos verificados mediante fracciones exactas y cobertura contrastada con `statistics.NormalDist`. Nueve pruebas de modelos, colección y catálogo superadas. Revisión visual de fórmulas y con tecnologías de apoyo pendiente. Siguiente TEO-09, intervalos de confianza para proporciones.

- 2026-11-13 · `feat(teoria-02c)`: TEO-09 redactada en 9.7. Intervalo normal aproximado de Wald para proporciones, error estándar estimado, orientación de recuentos de al menos diez, supuestos y límites. Ejemplos didácticos 240/400 y 75/300 con escala de proporciones y puntos porcentuales. Resultados contrastados independientemente; seis pruebas de modelo y catálogo superadas. El laboratorio de medias conserva su alcance. Revisión visual y con tecnologías de apoyo pendiente. Próxima tarea TEO-10, problemas directos e inversos.

- 2026-11-13 · `feat(teoria-02d)`: TEO-10 redactada en 9.7. Problema directo de media y comparación de tamaños; recuperación de centro, margen, n y confianza; reconstrucción de un intervalo de Wald y actividad resuelta. Se explicitan los supuestos, los datos insuficientes y el efecto del redondeo, distinguiendo reconstrucción de planificación. Cálculos contrastados con fracciones exactas y `statistics.NormalDist`; nueve pruebas superadas. Revisión visual y asistida pendiente. Siguiente TEO-11, tamaño muestral para proporciones.

- 2026-11-13 · `feat(teoria-02e)`: TEO-11 redactada en 9.8. Planificación con p₀ previa y caso conservador, justificación del máximo p(1−p), condiciones y escala de puntos porcentuales. Ejemplos de 683 y 1068 respuestas, verificados con umbrales racionales exactos y sustitución de enteros consecutivos. Caso de frontera n=400 frente a 401 con z=2 declarado. Nueve pruebas de modelos y catálogo superadas; revisión visual y asistida pendiente. Próxima tarea TEO-12, tamaño para la media.

- 2026-11-13 · `feat(teoria-02f)`: TEO-12 redactada en 9.8. Problema completo de media con sigma conocida, mínimo 62 y comprobación de n=61; distinción entre error estricto y no estricto con umbral entero; actividad resuelta al 99 % y muestra adicional. Cálculos verificados mediante fracciones exactas y sustitución. Nueve pruebas superadas; enlaces de 187 páginas sin pendientes. Revisión visual y asistida pendiente. Próxima tarea TEO-13, ampliar casos de intervalos característicos.

- 2026-11-13 · `feat(teoria-02g)`: TEO-13 redactada en 9.6. Comparación entre observación individual y media, niveles centrales 90/95/99 %, probabilidad de un intervalo no centrado y actividad resuelta con n=81. Se reutilizan los datos de estaturas ya presentes y se identifican las ampliaciones. Radios y probabilidades contrastados con fracciones exactas y `statistics.NormalDist`; nueve pruebas superadas y enlaces de 187 páginas sin pendientes. Revisión visual y asistida pendiente. Próxima tarea TEO-14, ficha técnica completa y modelo de elaboración.

- 2026-11-13 · `feat(teoria-02h)`: TEO-14 redactada en 9.9. Ficha completa explícitamente ficticia, pregunta, marco, sorteo sin reemplazo, respuesta, base, pesos y límites; cálculo normal aproximado con corrección finita; guía de elaboración y actividad resuelta. Base, estimación y margen verificados independientemente. Nueve pruebas superadas. TEO-07–14 tienen redacción completada; revisión visual y asistida pendiente en TEO-25. Siguiente TEORIA-03, TEO-15, casos especiales de programación lineal.

- 2026-11-13 · `feat(teoria-03a)`: TEO-15 redactada en 6.4. Cuatro ejemplos didácticos de casos especiales, distinción de supremo y máximo, mínimo en región no acotada, diferencia entre soluciones reales y enteras, y actividad resuelta. Cotas justificadas algebraicamente y valores contrastados con fracciones exactas. Tres pruebas de catálogo superadas y enlaces de 187 páginas sin pendientes. Revisión visual y asistida pendiente. Próxima tarea TEO-16, formulación numérica razonada.

- 2026-11-14 · `feat(teoria-03b)`: TEO-16 redactada en 6.3. Reutilización del problema original de sillas y mesas de 6.4 para explicar variables, unidades, restricciones, beneficio y relajación continua. Decisiones factibles/no factibles, redundancia y variante de producción mínima de dos sillas. Óptimos enteros contrastados por enumeración y cotas algebraicas; tres pruebas de catálogo superadas. Revisión visual y asistida pendiente. Próxima tarea TEO-17, fronteras verticales, horizontales y por el origen.

- 2026-11-14 · `feat(teoria-03c)`: TEO-17 redactada en 6.1. Ejemplos de x≤3, y>−2 y y≥2x; punto de frontera frente a punto de prueba; inversión de signo, tabla de síntesis y actividad resuelta. Equivalencias verificadas en 441 puntos enteros y ejemplos comprobados algebraicamente. Tres pruebas de catálogo superadas. Revisión visual y asistida pendiente. Siguiente TEO-18, intersección vacía y regiones reducidas a segmento o punto.

- 2026-11-14 · `feat(teoria-03d)`: TEO-18 redactada en 6.2. Ejemplos independientes de región vacía, segmento y punto, efecto de fronteras estrictas, parametrización y actividad resuelta. Existencia y unicidad justificadas algebraicamente, con contraste de candidatos mediante fracciones exactas. Tres pruebas de catálogo superadas. TEO-15–18 tienen redacción completada; revisión visual y asistida pendiente en TEO-25. Próxima tarea TEO-19, desarrollo sistemático de medias, varianzas y desviaciones marginales en estadística bidimensional.

- 2026-11-14 · `feat(teoria-04a)`: TEO-19 redactada en el apoyo de estadística bidimensional. Frecuencias absolutas/relativas marginales, medias ponderadas, dos fórmulas de varianza descriptiva con divisor N, desviaciones y unidades. Tabla original de 50 familias conservada; varianzas 0,6 y 0,4916 contrastadas expandiendo los datos con fracciones exactas y ambas fórmulas. Añadidas advertencias de categorías, pesos y límites de la información marginal. Revisión visual y asistida pendiente. Siguiente TEO-20, dos rectas de regresión y relación con r².

- 2026-11-14 · `feat(teoria-04b)`: TEO-20 redactada en el apoyo bidimensional. Dos rectas, sentido del ajuste, residuos, unidades y relación de los coeficientes con r², con condiciones y casos r=0 y |r|=1. Ejemplo de las 50 familias: covarianza 0,22, coeficientes 11/30 y 550/1229, r²=605/3687. Resultados comprobados expandiendo los pares originales con aritmética racional exacta; actividad adicional de signo negativo. Tres pruebas de catálogo superadas. Revisión visual y asistida pendiente. Siguiente TEO-21, principio multiplicativo en combinatoria.

- 2026-11-14 · `feat(teoria-04c)`: TEO-21 redactada en combinatoria. Principio multiplicativo por etapas, distinción de suma de casos disjuntos, ramificaciones con diferente número de continuaciones, conexión con fórmulas y actividad de cargos frente a comisiones. Menús, códigos y asignaciones verificados por enumeración exhaustiva. Siete pruebas superadas y enlaces de 190 páginas sin pendientes. Revisión visual y asistida pendiente. TEO-22 conserva su carácter opcional; próxima revisión de alcance antes de desarrollar combinaciones con repetición.

- 2026-11-14 · `feat(teoria-04d)`: TEO-22 redactada como ampliación opcional de combinatoria, separada del contenido básico. Elecciones sin orden con repetición, estrellas y barras, casos límite, mínimos por tipo, límites de disponibilidad y comparación de multiplicidades. Fórmula contrastada por enumeración en 40 casos; ejemplos y actividad verificados. Siete pruebas superadas, enlaces de 190 páginas sin pendientes. TEO-19–22 tienen redacción completada; revisión visual y asistida pendiente en TEO-25. Siguiente TEO-23, conciliar estados y textos antiguos.

- 2026-11-14 · `docs(teoria-23)`: conciliados el índice general del libro, los índices 6/8/9, el enlace de continuidad de 8.3 y el resumen de estado vigente. Retiradas descripciones antiguas de lecciones en preparación y herramientas como esqueletos. Verificadas 86 lecciones numeradas, 87 entradas de formulario y 42 términos. Se mantienen estados parciales y pendientes visuales/asistidos. Siete pruebas superadas y enlaces de 190 páginas sin pendientes. Historial de octubre conservado y rotulado como histórico. Próxima tarea TEO-24, segunda pasada de los temas 1–5.

- 2026-11-14 · `docs(teoria-24a)`: cotejadas las 18 lecciones del tema 1 con 83 requisitos del guion; todos disponen de evidencia textual. No se detectan nuevas lagunas teóricas en esta pasada. [Matriz por requisito](REVISION_TEORIA_TEMAS_1_5.md). TEO-24 permanece abierta para temas 2–5. Se han comprobado los 19 enlaces locales del informe; sin cambios de HTML ni pruebas matemáticas nuevas. La revisión visual y asistida sigue pendiente en TEO-25. Siguiente TEO-24B, tema 2.

- 2026-11-14 · `docs(teoria-24b)`: cotejados 42 requisitos del tema 2 en nueve lecciones, con evidencia por requisito y sin nuevas lagunas confirmadas. Matriz acumulada: 125 requisitos en 27 lecciones de temas 1–2; 28 enlaces locales del informe comprobados. Sin cambios de HTML. TEO-24 sigue abierta para temas 3–5; revisión visual y asistida en TEO-25. Siguiente TEO-24C, integrales.

- 2026-11-14 · `docs(teoria-24c)`: tema 3 cotejado, 33 requisitos en ocho lecciones con evidencia textual; no se confirman nuevas lagunas. Se conserva la distinción de 3.7 entre separación para áreas y cálculo de integral orientada. Acumulado: 158 requisitos en 35 lecciones de temas 1–3; 36 enlaces del informe comprobados. Sin cambios de HTML ni pruebas de modelos repetidas por esta revisión documental. TEO-24 continúa con tema 4.

- 2026-11-14 · `docs(teoria-24d)`: tema 4 cotejado, 53 requisitos en doce lecciones, con evidencia de dimensiones, condiciones de operaciones, inversa, rango y grafos. Sin nuevas lagunas confirmadas. Matriz acumulada: 211 requisitos en 47 lecciones; 48 enlaces del informe comprobados. Sin cambios de HTML ni repetición de pruebas de modelos por esta revisión documental. TEO-24 continúa con tema 5.

- 2026-11-14 · `docs(teoria-24e)`: tema 5 cotejado, 46 requisitos en once lecciones. Cierre TEO-24 con 257 requisitos y 58 lecciones de temas 1–5, todos con evidencia textual y sin nuevas lagunas confirmadas respecto del guion. Los 59 enlaces locales de la matriz están comprobados. Sin cambios de HTML ni repetición de pruebas de modelos por este cotejo documental. Pendientes TEO-25 (presentación/lectura) y TEO-26 (herramientas).

- **2026-11-14** · `test(teoria-25a)`: primera pasada sobre 16 páginas, 994 fórmulas sin errores de renderizado y 994 MathML auxiliares. Texto de apartados accesible sin JavaScript; sin desbordamiento global en tres configuraciones. Capturas revisadas: detectada compresión excesiva de tablas móviles. Pendientes correcciones, acceso a fórmulas largas, teclado y lectura asistida real. TEO-25 permanece abierta.

- **2026-11-14** · `fix(teoria-25b)`: corregidas cinco tablas móviles con ancho legible, desplazamiento interno y foco visible. Cinco comprobaciones de desplazamiento por teclado superadas; repetida revisión de 16 páginas y 994 fórmulas sin errores, con capturas de las tablas inspeccionadas. Enlaces de 190 páginas sin pendientes. Pendientes TEO-25C–E; siguiente acceso a fórmulas largas.

- **2026-11-14** · `fix(teoria-25c)`: fórmulas largas alcanzables con Tab sólo cuando desbordan, foco visible y actualización al redimensionar. 16 páginas, 994 fórmulas y 357 comprobaciones de desplazamiento/extremos superadas; cinco tablas y tres pruebas de formulario también pasan. Tab y retirada de focos innecesarios contrastados en 9.7; capturas de ambos extremos inspeccionadas. Enlaces de 190 páginas sin pendientes. Siguiente TEO-25D; lectura asistida real pendiente.

- **2026-11-14** · `fix(teoria-25d)`: navegación a apartados con foco y margen bajo el índice; cierre móvil con Escape o salida por Tab. 16 páginas superan pruebas de ancla directa, Enter/Escape, foco, escritorio y texto ampliado. Tres capturas inspeccionadas, tres pruebas de catálogo superadas y enlaces de 190 páginas sin pendientes. Fixture compartida corregida para no desplegar artificialmente el índice. Pendiente TEO-25E: lectura asistida real; TEO-25 permanece abierta.

- **2026-11-14** · `feat(teoria-26a)`: plan TEO-26 indexado en cuatro tandas; primera completada con cinco fórmulas nuevas de inferencia y sus condiciones, total 92. Tres pruebas de sincronización y prueba móvil de renderizado/búsqueda/enlace superadas. Enlaces de 190 páginas sin pendientes. TEO-25E conserva la validación de lectura real pendiente; no se ha encontrado lector activo ni NVDA en ubicaciones habituales. Siguiente 26B, resto del formulario.

Plan de herramientas: [TEO-26](ALINEACION_HERRAMIENTAS_TEO26.md).

- **2026-11-14** · `feat(teoria-26b)`: añadidas 15 fórmulas de distribuciones y apoyos, con condiciones y combinaciones con repetición opcionales. Total 107 entradas. Tres pruebas de sincronización superadas; prueba móvil verifica 107 fórmulas/MathML, búsquedas, filtros y enlace. Tres capturas inspeccionadas; enlaces de 190 páginas sin pendientes. Tanda 26B completada; siguiente 26C, glosario y tarjetas. Lectura asistida real TEO-25E pendiente.

- **2026-11-14** · `feat(teoria-26c)`: glosario ampliado de 42 a 69 términos mediante 12 tarjetas reutilizadas y 15 nuevas. Banco de 420 tarjetas, filtro de combinatoria incorporado y recuentos de mazos actualizados. 20 pruebas específicas superadas y enlaces de 190 páginas sin pendientes. Prueba de navegador de nuevas tarjetas/glosario en raíz y subcarpeta; lectura estática comprobada. Siguiente 26D, conciliación de guiones históricos y cierre de herramientas. TEO-25E sigue pendiente.

- **2026-11-14** · `test(teoria-26d)`: cerrada la alineación de herramientas, 107 fórmulas, 69 términos y 420 tarjetas. Cuatro guiones históricos de navegador actualizados y superados, generadores sincronizados y enlaces de 190 páginas sin pendientes. Corregida la separación categoría/lección de referencia de las nuevas tarjetas, con visibilidad heredada y consulta por lección. Batería general final: 389 pruebas, 388 superadas y un fallo previo de sincronización de Selectividad de matrices (MNT-SEL-01). Pendiente TEO-25E, lectura asistida real; sin cierre global de la web.

- **2026-11-14** · `fix(selectividad-sync)`: MNT-SEL-01 cerrada. Comparadas y sincronizadas cinco salidas del banco, con 640 ejercicios/soluciones e IDs y categorías conservados. MNT-SEL-02 corrige dólares literales dentro de cajas matemáticas en una matriz y añade prueba de regresión. Banco al día (49 archivos), siete pruebas específicas y doce de relaciones/exámenes superadas, prueba de navegador y captura final revisadas. Batería completa final con concurrencia 4: **390 pruebas, 390 superadas y cero fallos**. Sigue pendiente TEO-25E, lectura asistida real.

Informe: [mantenimiento de Selectividad](MANTENIMIENTO_SELECTIVIDAD_SYNC_2026-11-14.md).

- **2026-11-14** · `test(teoria-25e1)`: seis casos de lectura matemática superan la comprobación del árbol accesible de Chrome: fracciones, sumatorio, integral, intervalo, matriz y raíz. Una raíz MathML expuesta por fórmula y SVG oculto al árbol; matriz 2×3 con filas/celdas. Preparado protocolo de escucha con significados esperados y ficha de resultados. No se valida pronunciación ni se cierra TEO-25E; siguientes E3–E4 requieren escucha real y revisión de incidencias.

Protocolo: [lectura matemática](PROTOCOLO_LECTURA_MATEMATICA_TEO25E.md).

# Auditoría de contenidos del tema 4

Auditoría inicial: 8 de octubre de 2026 · Entrega 50. Actualizada en la entrega 54.

## Resultado y criterio

Doce epígrafes desarrollados, **72 preguntas base**, **72 tarjetas** y **20 problemas o bloques resueltos inventariados**. El inventario es una selección conservadora de los ejemplos existentes y cuatro bloques integrados. Cada bloque cuenta una vez, aunque tenga varios apartados; no se cuentan semillas, configuraciones ni preguntas repetidas en el repaso como contenido nuevo.

El tema conserva el estado **parcial**: Matrix Ops, La cámara del determinante y Redes y adyacencia están disponibles; el recorrido conjunto está verificado y falta la revisión global con lectores de pantalla y pronunciación matemática. Esta auditoría revisa contenido y cobertura; no certifica accesibilidad completa ni da por terminada la biblioteca de exámenes.

## Fuentes revisadas

- `../../Temario completo/Guion_Temario_Matematicas_CC_Sociales_II_2Bach.md`, 4.1–4.12.
- `../../Planificacion_Interactiva_2Bach_CC_Sociales/03_Tests_2Bach_CC_Sociales.md`, T4.1–T4.10.
- `../../Planificacion_Interactiva_2Bach_CC_Sociales/02_Flashcards_2Bach_CC_Sociales.md`, 24 conceptos del tema 4.
- Juegos previstos por el plan: Matrix Ops, La cámara del determinante y Redes y adyacencia. Su disponibilidad actual figura en la lista de pendientes y las actualizaciones.
- Lecciones, bancos y verificaciones de las entregas 38–49; [procedencia](procedencia-contenidos.md).

Los originales se conservan. El repaso es elaboración propia basada en los conceptos ya desarrollados. No se han extraído ni recompilado nuevos exámenes LaTeX en esta entrega.

## Inventario conservador de problemas desarrollados

Las filas 1–16 seleccionan ejemplos existentes; las 17–20 son los cuatro bloques de síntesis. No se cuentan dos veces AX=D/XA=D, repetidos en 4.9 y 4.11, ni los mismos datos de ventas por aparecer en varias lecciones.

| Nº | Ubicación y problema | Resultado o comprobación |
|---|---|---|
| 1 | [4.1: igualdad con parámetros](../libro/temas/04-matrices-y-determinantes/01-matrices-definicion-caracteristicas-y-tipos.html#ejemplos) | x=5, y=−2; se comparan todas las posiciones. |
| 2 | [4.2: combinación 2A−3B](../libro/temas/04-matrices-y-determinantes/02-operaciones-con-matrices.html#ejemplos) | Filas (−8,−8), (6,3). |
| 3 | [4.3: productos rectangulares](../libro/temas/04-matrices-y-determinantes/03-producto-de-matrices.html#ejemplos) | AB es 2×2, filas (−3,−3), (3,8); BA es 3×3. |
| 4 | [4.4: A² y A³](../libro/temas/04-matrices-y-determinantes/04-potencia-de-una-matriz.html#ejemplos) | A³ tiene filas (13,14), (21,6). |
| 5 | [4.5: completar una antisimétrica](../libro/temas/04-matrices-y-determinantes/05-comparacion-de-matrices-matriz-simetrica-y-matriz-antisimetrica.html#ejemplos) | a=b=0, x=2, y=−4; todos los pares opuestos. |
| 6 | [4.6: Sarrus con signos](../libro/temas/04-matrices-y-determinantes/06-determinante-de-una-matriz.html#ejemplos) | 16−(−2)=18. |
| 7 | [4.7: triangularización](../libro/temas/04-matrices-y-determinantes/07-propiedades-de-los-determinantes.html#ejemplos) | Sumas de filas conservan el determinante: 1·1·3=3. |
| 8 | [4.8: desarrollo de orden 4](../libro/temas/04-matrices-y-determinantes/08-desarrollo-de-un-determinante.html#ejemplos) | −2·18=−36; no se aplica Sarrus a orden 4. |
| 9 | [4.9: adjunta no simétrica de orden 3](../libro/temas/04-matrices-y-determinantes/09-matriz-inversa-y-matriz-adjunta.html#ejemplos) | Adj(B) con filas (1,−2,2), (1,1,−1), (−1,2,1); se divide por 3. |
| 10 | [4.10: parámetro y salto de rango](../libro/temas/04-matrices-y-determinantes/10-rango-de-una-matriz.html#ejemplos) | det=(t−1)²; rango 1 en t=1 y 3 en el resto. |
| 11 | [4.11: incógnita rectangular](../libro/temas/04-matrices-y-determinantes/11-ecuaciones-matriciales.html#ejemplos) | X de orden 2×3; filas (2/3,−1,0), (−1/3,2,3). |
| 12 | [4.12: cadena y recorridos](../libro/temas/04-matrices-y-determinantes/12-grafos-y-matriz-de-adyacencia-asociada.html#ejemplos) | Tres aristas; A→C en dos pasos: 1; B→B en dos pasos: 2. |
| 13 | [4.9: precios de artículos](../libro/temas/04-matrices-y-determinantes/09-matriz-inversa-y-matriz-adjunta.html#ejemplos) | Cuaderno 3 €, bolígrafo 2 €; verificados ambos totales. |
| 14 | [4.4: acumulación por pasos](../libro/temas/04-matrices-y-determinantes/04-potencia-de-una-matriz.html#ejemplos) | Estado (10+3n,3)ᵀ; 25 unidades tras cinco pasos. |
| 15 | [4.9: inversa con parámetro](../libro/temas/04-matrices-y-determinantes/09-matriz-inversa-y-matriz-adjunta.html#ejemplos) | det=t²−2; excluir los dos valores ±√2. |
| 16 | [4.10: menor de filas no consecutivas](../libro/temas/04-matrices-y-determinantes/10-rango-de-una-matriz.html#ejemplos) | det=0; menor de filas 1 y 3 vale 1; rango 2. |
| 17 | [Repaso: ventas y márgenes](../libro/temas/04-matrices-y-determinantes/index.html#repaso-ventas) | Ingresos (62,59)ᵀ; costes (38,36)ᵀ; márgenes (24,23)ᵀ. |
| 18 | [Repaso: parámetro, adjunta y rango](../libro/temas/04-matrices-y-determinantes/index.html#repaso-parametro) | det=t²−1; rango 2 en ±1 y 3 fuera; familias separadas y término incompatible. |
| 19 | [Repaso: potencias y ecuaciones](../libro/temas/04-matrices-y-determinantes/index.html#repaso-potencias) | Pⁿ=I+2nN; P⁻¹=I−2N; PX=B y XP=B dan soluciones distintas. |
| 20 | [Repaso: red y saldos](../libro/temas/04-matrices-y-determinantes/index.html#repaso-redes) | H singular de rango 2 sigue conectada; F−Fᵀ es antisimétrica. |

## Cobertura de guion y fuentes

Todos los bancos están en `../content/activities/`. Cada epígrafe tiene seis preguntas y seis tarjetas. Los doce ítems de `review-t04.js` son referencias a preguntas ya publicadas: se conserva 72=12·6.

| Epígrafe | Banco y cobertura | Fuente base relacionada |
|---|---|---|
| 4.1 | `matrix-basics.js`: orden, posiciones, igualdad y tipos. | T4.1; tarjetas 1–3. |
| 4.2 | `matrix-operations.js`: suma, resta, escalar, propiedades y contexto. | Tarjeta 4. |
| 4.3 | `matrix-product.js`: compatibilidad, cálculo, orden, no conmutatividad y producto nulo. | T4.2–T4.3; tarjetas 5–7. |
| 4.4 | `matrix-power.js`: exponente cero, patrones, composición y modelos iterados. | Tarjeta 8. |
| 4.5 | `matrix-symmetry.js`: traspuesta, igualdad, simetría y antisimetría. | T4.6; tarjetas 9–11. |
| 4.6 | `determinants.js`: órdenes 2 y 3, signos, singularidad y parámetro. | T4.4–T4.5; tarjetas 12–13. |
| 4.7 | `determinant-properties.js`: operaciones, escala, triangularidad, producto y traspuesta. | T4.10; tarjetas 14–15. |
| 4.8 | `determinant-expansion.js`: menor, cofactor, aportación y desarrollo por línea. | Desarrollo del guion, preparación de tarjeta 16. |
| 4.9 | `matrix-inverse.js`: adjunta, fracciones, condiciones y comprobación. | T4.5, T4.7; tarjetas 16–17 y 19–20. |
| 4.10 | `matrix-rank.js`: menores, reducción, rectangulares, parámetro y compatibilidad. | T4.9; tarjeta 18. |
| 4.11 | `matrix-equations.js`: dimensiones, lado de la inversa, agrupación, dos factores y singularidad. | T4.7; tarjetas 19–20. |
| 4.12 | `graphs.js`: adyacencia, grados, orientación, potencias y recorridos. | T4.8; tarjetas 21–24. |

Los 24 conceptos fuente se desarrollan en las 72 tarjetas; no se añaden tarjetas solo para elevar el contador. Los exploradores generan configuraciones adicionales que no se cuentan como nuevos ítems base.

### Precisiones respecto de las fuentes

- T4.3 se interpreta como ausencia de conmutatividad general, no como AB≠BA para cualquier pareja. La web muestra que algunas matrices sí conmutan.
- T4.8 dice «suele ser simétrica»: con el mismo orden de vértices, una adyacencia simple no dirigida es necesariamente simétrica.
- Se fija Adj(A)=Cᵀ para la matriz de cofactores C y se usa la misma convención en todo el tema.
- Se distingue menor, cofactor y aportación a un desarrollo.
- La singularidad no decide por sí sola la compatibilidad de AX=B.
- Un cero en Aᵏ excluye una longitud concreta, no toda ruta.
- Los sistemas aparecen como aplicación de matrices; el tema 5 no se da por desarrollado.

## Selección del test de repaso

Una pregunta de cada epígrafe, en orden: `matrix-basics-06`, `matrix-operations-05`, `matrix-product-04`, `matrix-power-04`, `matrix-symmetry-03`, `determinants-05`, `det-property-04`, `det-exp-03`, `matrix-inverse-02`, `matrix-rank-02`, `matrix-equation-03` y `graph-05`.

Se conservan los identificadores, opciones, pistas y explicaciones de origen. El índice no agrega copias al catálogo ni crea estadísticas persistentes.

## Variantes y acceso

Los doce epígrafes incluyen exploradores: edición y clasificación; operaciones; productos AB/BA; potencias; traspuesta/simetría; determinantes; propiedades; desarrollo por líneas; inversa; rango; ecuaciones; y redes. Cada uno conserva sus límites numéricos descritos en las entregas respectivas.

El repaso incorpora detalles nativos para pistas y soluciones, test sin límite de tiempo y navegación de ida y vuelta. Las preferencias de lectura se comparten; las respuestas solo existen durante la visita. No se cambia el diseño ni el motor de fórmulas.

## Lista de cierre

- [x] Doce lecciones con teoría, ejemplos, práctica y navegación.
- [x] Al menos doce problemas desarrollados: veinte bloques inventariados.
- [x] 72 preguntas base con enunciados e identificadores únicos.
- [x] 24 conceptos fuente cubiertos en 72 tarjetas.
- [x] Exploradores y variantes de las lecciones.
- [x] Cuatro bloques integrados y selección de doce preguntas sin duplicación.
- [x] Recorrido del repaso y las doce lecciones verificado en la entrega 50.
- [x] Widget Matrix Ops (entrega 51).
- [x] Widget La cámara del determinante (entrega 52).
- [x] Widget Redes y adyacencia (entrega 53).
- [x] Recorrido conjunto de juegos y lecciones (entrega 54).
- [ ] Lectores de pantalla y pronunciación matemática.

Biblioteca PDF, administración central, voz, traducción y extensión futura de cuentas permanecen en sus fases globales. Para programación lineal y los bloques estadísticos se mantiene el [criterio de reutilizar los HTML originales](criterio-reutilizacion-html-estadistica-pl-inferencia.md), dejando las carencias señaladas.

Evidencias del repaso, pruebas acumuladas y presentación: [verificación de entrega 50](verificacion-entrega-50.md).

## Actualización · Entrega 51 · Matrix Ops

Disponible [Matrix Ops](../laboratorios/juegos/t04-a-matrix-ops.html), insertado y como página independiente, para reforzar 4.1–4.4. Ocho familias, dos decisiones por reto, variantes numéricas y clasificación variable. Las operaciones incluyen productos AB/BA, un producto incompatible y potencias de exponente 2 o 3. La decisión previa se resuelve antes del cálculo.

Los controles de selección sustituyen el arrastre; la sesión no usa el reto opcional de cinco segundos del plan original. Esta adaptación permite practicar con teclado y sin presión temporal. Mantiene las dimensiones como paso obligatorio. Las variantes no elevan los bancos 72/72 ni el inventario conservador de veinte bloques.

Verificación y límites: [entrega 51](verificacion-entrega-51.md). Siguiente: La cámara del determinante.

## Actualización · Entrega 52 · La cámara del determinante

Disponible [La cámara del determinante](../laboratorios/juegos/t04-b-la-camara-del-determinante.html), insertada y como página independiente. Seis salas de tres cerraduras para reforzar 4.6–4.10: cálculo de orden 2, triangularidad, operaciones sobre filas y escala global, dependencia/rango, parámetro e inversa mediante cofactor traspuesto.

Tras dos errores se revela y explica la solución, permitiendo continuar sin puntos en esa cerradura; el mapa identifica las salas que necesitaron esa ayuda. La cámara final es siempre invertible y pide una entrada no diagonal y fraccionaria. La singularidad se trabaja en otra sala y en el valor crítico del parámetro.

Las variantes no elevan los bancos 72/72 ni el inventario de veinte bloques. No hay reloj ni persistencia personal. Evidencia: [entrega 52](verificacion-entrega-52.md). Siguiente: Redes y adyacencia.

## Actualización · Entrega 53 · Redes y adyacencia

Disponible [Redes y adyacencia](../laboratorios/juegos/t04-c-redes-y-adyacencia.html), insertada y como página independiente. Seis retos alternan lectura de un grafo y reconstrucción a partir de una matriz. Incluye redes de tres/cuatro vértices, dirigidas/no dirigidas y vértices aislados.

Los nodos se pueden arrastrar o mover con teclado. Las conexiones se editan seleccionando dos nodos o mediante casillas equivalentes; las respuestas de matriz usan selectores 0/1. Las explicaciones conservan el orden de vértices, la orientación y la distinción entre conexión directa y recorrido. Las variantes no aumentan el banco ni los veinte bloques inventariados.

Evidencia: [entrega 53](verificacion-entrega-53.md). Siguiente: recorrido conjunto de los tres juegos y enlaces de refuerzo; el tema permanece parcial por esa revisión y la accesibilidad global.

## Actualización · Entrega 54 · Recorrido conjunto

Verificada la [ruta de los tres juegos](../libro/temas/04-matrices-y-determinantes/index.html#ruta-juegos), con requisitos orientativos, refuerzos y enlaces de ida y vuelta. No exige puntuaciones ni genera historial personal.

Recorridas las doce lecciones, el test completo 72/72 y las 72 tarjetas; probados los tres widgets insertados e independientes, preferencias conservadas y navegación en subcarpeta. Se mantiene el inventario 72/72 y veinte problemas/bloques. Evidencia: [entrega 54](verificacion-entrega-54.md).

El tema sigue parcial por lectores de pantalla y pronunciación matemática. El desarrollo de contenidos continúa con 5.1. Sistemas de ecuaciones lineales.

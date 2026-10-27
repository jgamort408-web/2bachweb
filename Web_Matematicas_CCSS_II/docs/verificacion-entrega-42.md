# Verificación · Entrega 42

Fecha: 6 de octubre de 2026.

## Resultado

Desarrollada [4.5. Comparación de matrices. Matriz simétrica y matriz antisimétrica](../libro/temas/04-matrices-y-determinantes/05-comparacion-de-matrices-matriz-simetrica-y-matriz-antisimetrica.html): igualdad, traspuesta, propiedades, simetría, antisimetría y consecuencias sobre la diagonal.

Cinco ejemplos resueltos, práctica, explorador, seis preguntas y seis tarjetas. Tema 4: **5 de 12 epígrafes con contenido**, 30 preguntas y 30 tarjetas. Curso: **40 lecciones, 210 preguntas base, 193 tarjetas y diez widgets**.

## Archivos y conexiones

- `content/models/matrix-symmetry.js`: traspuesta, clasificación, pares, testigos de incumplimiento y variantes.
- `content/activities/matrix-symmetry.js`: seis preguntas con pistas y explicaciones, seis tarjetas.
- `assets/js/learning/matrix-symmetry-explorer.js`: editor, posiciones y comparaciones.
- `assets/css/learning.css`: reglas locales de controles y contorno de selección.
- Lección 4.5, enlace desde 4.4, portada, libro, índice, catálogo, filtros y estado editorial.
- `tests/matrix-symmetry.test.mjs` y `tests/matrix-symmetry-42-browser.cjs`.

Diseño provisional y servicio MathJax conservados. Se actualizan expectativas acumuladas de 204/187 a 210/193 y del tema 4 a 30/30.

## Criterios matemáticos

- Igualdad requiere el mismo orden y todas las posiciones, incluidas las que no tienen incógnitas.
- La traspuesta existe para cualquier matriz rectangular: intercambia índices y dimensiones sin cambiar valores ni signos.
- Simetría: Aᵀ=A. Antisimetría: Aᵀ=−A. Ambas requieren base cuadrada.
- Antisimetría exige diagonal cero y todos los pares fuera de ella opuestos.
- La nula cuadrada es la única matriz real simultáneamente simétrica y antisimétrica. Una matriz puede no cumplir ninguna.
- Toda 1×1 es simétrica; solo (0) es antisimétrica. Una nula no cuadrada no cumple ninguna de las dos propiedades.
- Al trasponer un producto se invierte el orden de los factores.
- Los contextos conservan etiquetas y unidades: trasponer reorganiza datos; el saldo entre centros compara transferencias, no existencias finales.

## Explorador

Siete ejemplos: simétrica 3×3, antisimétrica 3×3, diagonal nula insuficiente para antisimetría, diagonal con valores distintos, nula cuadrada, rectangular 2×3 y matriz 1×1.

Editor de una a tres filas y columnas; enteros de −9 a 9. La teoría admite matrices reales. Redimensionar conserva entradas comunes y añade ceros. Las entradas inválidas se señalan y conservan su último valor válido.

El selector sigue (i,j) de A hasta (j,i) de Aᵀ, con contorno y texto. Para matrices cuadradas, se muestra además −A, la clasificación, un par concreto que incumple cada condición fallida y un desplegable de todas las comparaciones independientes, incluida la diagonal.

Las matrices no cuadradas conservan su traspuesta y reciben una explicación dimensional. Las variantes usan enteros de −3 a 3 y mantienen dimensiones; pueden repetirse y su clasificación no está prefijada. No se guardan matrices, respuestas ni puntuaciones.

## Pruebas matemáticas

**146 pruebas acumuladas superadas**, incluidas cinco nuevas:

- Clasificación exhaustiva de las 81 matrices 2×2 con entradas −1, 0 y 1, con testigos de fallo y solapamiento de clases.
- 1600 matrices en los 16 órdenes de 1 a 4: índices, orden de la traspuesta, doble traspuesta, reproducibilidad y conservación de datos.
- Cien casos de linealidad, traspuesta de un producto y construcciones F+Fᵀ/F−Fᵀ.
- Ejemplos, parámetros, contradicciones, práctica, casos 1×1 y nula rectangular, datos inválidos.
- Seis preguntas/tarjetas nuevas, tema 4 con 30/30 y catálogo 210/193 con identificadores únicos.

## Navegador y revisión final

`tests/matrix-symmetry-42-browser.cjs` superado:

- Siete ejemplos, seguimiento de posiciones y comparación de seis pares independientes en 3×3.
- Ruptura y recuperación de simetría; diagonal no nula que impide antisimetría.
- Nula con ambas propiedades, caso 1×1 y transición a matriz no cuadrada.
- Traspuesta rectangular, edición, validación y variantes reproducibles.
- Test 5/6 al primer intento con pista y reintento; seis tarjetas.
- Preferencias conservan respuestas; recarga restaura el ejemplo y elimina respuestas.
- Móvil de 320 px con texto al 200 %, contraste y resaltado. Tablas y fórmulas con desplazamiento local, sin desbordamiento de página.
- Índice 5/12, filtros de 30 preguntas/tarjetas y alojamiento en subcarpeta con cabecera/pie.
- Sin errores JavaScript, HTTP ni MathJax.

Regresiones superadas: `tests/matrix-power-41-browser.cjs` (4.4) y `tests/lessons-06-browser.cjs` (tres lecciones avanzadas de t01 y catálogo completo de 210 preguntas y 193 tarjetas).

Capturas inspeccionadas: `../../tmp/simetria-matrices-escritorio.png` y `../../tmp/simetria-matrices-movil.png`.

Revisión estática: 171 HTML sin referencias locales rotas, fragmentos ausentes ni IDs duplicados. Enlaces de README y de este documento comprobados.

## Límites y siguiente contenido

El explorador compara A con Aᵀ y −A; la igualdad entre dos matrices arbitrarias se trabaja en teoría, ejemplos y test. No se incorpora otro videojuego al contador.

Tema 4 parcial. Siguiente: **4.6. Determinante de una matriz**. Siguen pendientes lectores de pantalla y pronunciación matemática, PDF, administración central, voz y traducción. No se alteran originales ni se compilan exámenes en esta entrega.

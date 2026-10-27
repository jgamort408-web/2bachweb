# Verificación · Entrega 45

Fecha: 7 de octubre de 2026.

## Resultado

Desarrollada [4.8. Desarrollo de un determinante](../libro/temas/04-matrices-y-determinantes/08-desarrollo-de-un-determinante.html). Cinco ejemplos, práctica resuelta, seis preguntas con corrección y pistas y seis tarjetas. Tema 4: 8 de 12 epígrafes, 48 preguntas y 48 tarjetas. Curso: **43 lecciones, 228 preguntas base, 211 tarjetas y diez widgets**.

## Archivos y funcionamiento

- `content/models/determinant-expansion.js`: menores, signos, adjuntos, aportaciones y generación reproducible.
- `assets/js/learning/determinant-expansion-explorer.js`: editor de órdenes 2–4; cuatro bases, elección de fila/columna y término.
- `content/activities/determinant-expansion.js`: banco propio vinculado al guion 4.8.
- Lección 4.8, portada, libro, índice, filtros y estado editorial actualizados.
- `tests/determinant-expansion.test.mjs` y `tests/determinant-expansion-45-browser.cjs`.

El explorador usa enteros de −9 a 9. Explica qué fila y columna se eliminan y señala con contorno las casillas restantes; no depende solo del color. Muestra la submatriz, menor, signo, adjunto, aportación y suma final. En orden 4 también muestra un desarrollo del menor 3×3.

Las entradas inválidas conservan el último valor válido y se señalan. Redimensionar conserva casillas comunes y añade ceros. Las variantes no incrementan el banco fijo. No se guarda historial del alumnado; solo persisten las preferencias comunes de lectura.

Diseño provisional y servicio de MathJax conservados. Los textos mantienen funciones editoriales para una futura aplicación de tipografías y estilos.

## Matemáticas

**160 pruebas acumuladas aprobadas**, cuatro nuevas:

- 900 matrices de órdenes 2, 3 y 4; 5400 desarrollos recorriendo todas sus filas y columnas. Contraste independiente mediante la fórmula de Leibniz por permutaciones, también para cada menor.
- Verificados signos, productos, conservación de la matriz de entrada y reproducción de semillas.
- Comprobados los cinco ejemplos, práctica, coeficiente cero con menor no nulo, singularidad y parámetro t=−2/3.
- Validación de órdenes, posiciones, eje, entradas finitas y desbordamiento numérico.
- Catálogo 228/211, tema 4 48/48 e identificadores únicos.

## Navegador

Recorrido de 4.8 aprobado: las cuatro bases, cada fila, columna y término; contornos de la submatriz; ceros; reducción de orden 4; edición válida e inválida; cambio de orden y generación.

Test completado con 5/6 al primer intento, pista y corrección posterior; seis tarjetas revisadas. Fórmulas sin errores, ausencia de desbordamiento de página, preferencias de lectura y respuesta conservada al modificarlas. Recarga sin respuestas persistentes.

Comprobados móvil de 320 px con texto al 200 %, contraste y resaltado. Capturas de escritorio y móvil revisadas: `../../tmp/desarrollo-determinante-escritorio.png` y `../../tmp/desarrollo-determinante-movil.png`. Tablas y fórmulas anchas permiten desplazamiento en sus regiones.

Índice 8/12, filtros 48/48, cabecera, pie y funcionamiento en subcarpeta aprobados.

Regresión de 4.7 superada y recorrido del catálogo completo de 228 preguntas y 211 tarjetas aprobado. Comprobados los 171 HTML: cero enlaces rotos, fragmentos inexistentes o IDs duplicados. También se verificaron los enlaces de README y de este documento.

## Límites y siguiente contenido

El editor no acepta parámetros simbólicos ni decimales arbitrarios; el parámetro se trabaja en el texto. No se calcula aún la matriz inversa ni la adjunta completa.

Tema 4 parcial. Siguiente: **4.9. Matriz inversa y matriz adjunta**. Siguen pendientes PDF, administración central, voz, traducción y revisión con lectores de pantalla y pronunciación matemática. Originales conservados.

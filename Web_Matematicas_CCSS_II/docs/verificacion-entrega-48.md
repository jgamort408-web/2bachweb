# Verificación · Entrega 48

Fecha: 7 de octubre de 2026.

## Resultado

Desarrollada [4.11. Ecuaciones matriciales](../libro/temas/04-matrices-y-determinantes/11-ecuaciones-matriciales.html): dimensiones, despejes a izquierda/derecha, sumas, coeficiente A+kI, AXD=B, comprobación y traducción a sistemas.

Cinco ejemplos, práctica, seis preguntas y seis tarjetas. Tema 4: **11 de 12 epígrafes**, 66 preguntas y 66 tarjetas. Curso: **46 lecciones, 246 preguntas base, 229 tarjetas y diez widgets**. Tema 4 aún parcial.

## Implementación y límites

- `content/models/matrix-equations.js`: solución exacta de AX+kX=B y XA+kX=B cuando A+kI es invertible.
- `assets/js/learning/matrix-equations-explorer.js`: cinco ejemplos, editores, dimensiones, lado, escalar y comprobación.
- `content/activities/matrix-equations.js`: banco de preguntas y tarjetas.
- Lección, navegación, catálogo, filtros y estado editorial.
- `tests/matrix-equations.test.mjs` y `tests/matrix-equations-48-browser.cjs`.

A es cuadrada de orden 2 o 3, con enteros −6..6; B tiene hasta tres filas y columnas y enteros −9..9; k es entero −3..3. Las soluciones usan fracciones reducidas. Se verifica el resultado sustituyendo en la ecuación original, incluido el término kX.

Cambiar el lado traspone B para mantener compatibilidad dimensional y se anuncia como nueva ecuación. Redimensionar conserva casillas comunes y añade ceros. Los datos inválidos mantienen el último valor válido; generar mantiene lado, dimensiones y k. Una variante puede ser singular.

El modelo distingue dimensiones incompatibles y coeficiente singular. La interfaz construye dimensiones compatibles. Si el coeficiente es singular, no intenta dividir ni decide por sí solo la compatibilidad; el texto muestra cómo estudiar las entradas. AXD=B se desarrolla en el libro, no como modo adicional del explorador.

No se guardan respuestas ni historial. Preferencias de lectura comunes conservadas. Diseño provisional y servicio de MathJax sin cambios.

## Matemáticas

**175 pruebas acumuladas aprobadas**, cinco nuevas:

- 8400 ecuaciones: órdenes 2/3, tres tamaños de B, ambos lados, siete escalares y cien semillas. Soluciones y singularidad contrastadas con Gauss-Jordan independiente.
- Verificación de la sustitución original, fracciones, dimensiones y conservación de las matrices de entrada.
- Cinco ejemplos, práctica, dos factores conocidos, sistemas singulares y familias con dos parámetros.
- Dimensiones incompatibles, validación de entradas y generación reproducible.
- Catálogos 66/66 y 246/229, opciones distintas e identificadores únicos.

## Navegador y presentación

Recorrido de la nueva lección aprobado: cinco ejemplos, ambos lados, k de −3 a 3, dimensiones, matrices rectangulares, fracciones, comprobación en la ecuación original, singularidad y recuperación, edición inválida y variantes.

Test completado con 5/6 al primer intento, pista y corrección; seis tarjetas revisadas. Respuesta conservada al cambiar preferencias y restablecida al recargar.

Escritorio y móvil de 320 px con texto al 200 %, contraste y resaltado revisados. Capturas: `../../tmp/ecuaciones-matriciales-escritorio.png` y `../../tmp/ecuaciones-matriciales-movil.png`. Tablas y fórmulas anchas se desplazan dentro de sus regiones; no desbordan la página.

Índice 11/12, filtros t04 66/66, cabecera, pie y subcarpeta comprobados. Regresión de 4.10 y catálogo completo de 246 preguntas y 229 tarjetas superados. Revisados los 171 HTML sin enlaces rotos, fragmentos inexistentes ni identificadores duplicados; también se comprobaron los enlaces de README y de este documento.

## Siguiente contenido

**4.12. Grafos y matriz de adyacencia asociada**. Siguen pendientes laboratorios y revisión conjunta de t04, PDF, administración central, voz, traducción y revisión con lectores de pantalla.

Se mantiene el criterio del usuario para programación lineal, estadística, distribuciones e inferencia: integrar los HTML originales y dejar huecos en blanco o documentados, sin generar contenido para completarlos.

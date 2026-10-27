# Verificación · Entrega 47

Fecha: 7 de octubre de 2026.

## Resultado

Desarrollada [4.10. Rango de una matriz](../libro/temas/04-matrices-y-determinantes/10-rango-de-una-matriz.html): independencia, cotas, menores, reducción, pivotes, parámetros y conexión con Rouché-Frobenius.

Cinco ejemplos, práctica explicada, seis preguntas y seis tarjetas. Tema 4: **10 de 12 epígrafes con contenido**, 60 preguntas y 60 tarjetas. Curso: **45 lecciones, 240 preguntas base, 223 tarjetas y diez widgets**. El tema sigue parcial: faltan epígrafes, laboratorios y revisión conjunta.

## Archivos y explorador

- `content/models/matrix-rank.js`: enumeración de menores, rango y reducción exacta con registro de operaciones.
- `assets/js/learning/matrix-rank-explorer.js`: editor, elección de submatrices, justificación y pasos.
- `content/activities/matrix-rank.js`: preguntas con pistas, explicaciones y tarjetas.
- Lección, navegación, índices, catálogo, filtros y estado editorial.
- `tests/matrix-rank.test.mjs` y `tests/matrix-rank-47-browser.cjs`.

Cinco bases cubren rangos 0–3 y matrices cuadradas o rectangulares. Editor de 1–3 filas y 1–4 columnas, con enteros de −9 a 9. Se pueden elegir todos los menores de cada orden, incluidos los no consecutivos. Las posiciones se describen con texto y contorno.

El rango exacto se justifica con un menor no nulo y el descarte de órdenes superiores; en rango cero se comprueba que todas las entradas son nulas. La reducción usa fracciones exactas, intercambios, escalados no nulos y sumas de múltiplos. Los pivotes se describen en la forma escalonada, no como posiciones de filas originales.

Edición inválida conserva los últimos valores válidos. Redimensionar conserva las casillas comunes y añade ceros. Las variantes mantienen dimensiones y no aumentan el banco fijo. No se almacenan respuestas ni historial; solo preferencias de lectura.

## Matemáticas

**170 pruebas acumuladas aprobadas**, cinco nuevas:

- 2481 matrices: 2400 variantes en las 12 dimensiones permitidas y 81 matrices 2×2 exhaustivas con entradas −1..1.
- Cada menor contrastado por la fórmula de Leibniz; rango contrastado con eliminación numérica independiente.
- Cada operación exacta reconstruida y verificada, comprobando que conserva el rango. Pivotes normalizados, ceros inferiores y cuenta final de filas no nulas.
- Ejemplos, parámetro, práctica, compatibilidad, pivotes desplazados, fracciones, menores no consecutivos y trasposición.
- Validación, semillas y catálogos 60/60 y 240/223 sin IDs duplicados.

## Navegador y revisión visual

Recorrido de 4.10 aprobado: cinco bases y todos sus menores, rangos 0–3, contornos, justificación, reducción, edición inválida y recuperación, dimensiones 1×1 y 3×4, y generación reproducible.

Test completado con 5/6 al primer intento, pista y corrección posterior; seis tarjetas revisadas. Preferencias conservan la respuesta al cambiar tamaño, contraste o resaltado. Recarga restablece la actividad sin historial.

Escritorio y móvil de 320 px con texto al 200 % revisados. Capturas: `../../tmp/rango-matriz-escritorio.png` y `../../tmp/rango-matriz-movil.png`. Fórmulas sin errores y sin desbordar la página; tablas y fórmulas extensas se desplazan dentro de su región.

Índice 10/12, filtros t04 60/60, cabecera, pie y ejecución en subcarpeta comprobados.

Regresión de 4.9 y catálogo completo de 240 preguntas y 223 tarjetas superados. Los 171 HTML no presentan enlaces rotos, fragmentos inexistentes ni IDs duplicados. Comprobados también README y los enlaces de este documento.

## Límites y siguiente contenido

No es un calculador simbólico: el parámetro se resuelve en el texto. La interpretación de una matriz como ampliada depende del sistema y no se asigna automáticamente por sus dimensiones. No se resuelven aún sistemas arbitrarios en el explorador.

Se mantiene el diseño provisional, la configuración compartida de MathJax y las fuentes originales. Siguiente: **4.11. Ecuaciones matriciales**. Siguen pendientes PDF, administración central, voz, traducción y revisión con lectores de pantalla y pronunciación matemática.

# Verificación · Entrega 41

Fecha: 6 de octubre de 2026.

## Resultado

Desarrollada [4.4. Potencia de una matriz](../libro/temas/04-matrices-y-determinantes/04-potencia-de-una-matriz.html): definición, identidad, leyes de potencias, precauciones con distintas bases, patrones y procesos iterativos.

Cinco ejemplos resueltos, práctica explicada, explorador, seis preguntas y seis tarjetas. Tema 4: **4 de 12 epígrafes con contenido**, 24 preguntas y 24 tarjetas. Totales: **39 lecciones, 204 preguntas base, 187 tarjetas y diez widgets**.

## Archivos y conexiones

- `content/models/matrix-power.js`: identidad, potencias, etapas, ejemplos y variantes.
- `content/activities/matrix-power.js`: preguntas, distractores, pistas, explicaciones y tarjetas.
- `assets/js/learning/matrix-power-explorer.js`: editor, exponente, etapas y estado iterado.
- `assets/css/learning.css`: controles y tabla con desplazamiento local.
- Lección 4.4, enlace desde 4.3, portada, índices, catálogo, filtros y estado editorial.
- `tests/matrix-power.test.mjs` y `tests/matrix-power-41-browser.cjs`.

El diseño provisional y el servicio MathJax se conservan. Las expectativas acumuladas de catálogo pasan de 198/181 a 204/187. Se mantienen los bancos individuales de seis preguntas/tarjetas por lección de t04.

## Criterios matemáticos

- Potencias enteras no negativas de una base cuadrada. A² es AA, no 2A ni el cuadrado de cada entrada.
- A⁰=I del orden adecuado, incluso con base nula o singular; no se aplica 0⁰ a cada entrada.
- AᵐAⁿ=Aᵐ⁺ⁿ y (Aᵐ)ⁿ=Aᵐⁿ para la misma base. La existencia de una inversa no es necesaria.
- El cuadrado de una suma conserva AB y BA separados; las bases distintas no se reordenan sin justificación.
- Patrones: diagonal, alternancia, anulación desde el cuadrado y repetición de potencias positivas.
- Las fórmulas generales se justifican mediante agrupación de factores o paso de n a n+1.
- El modelo iterado requiere la misma matriz en todos los pasos. La aplicación de acumulación conserva un incremento fijo.

## Explorador

Siete bases cargables: acumulación constante, diagonal, intercambio, anulación al cuadrado, repetición desde la primera potencia, identidad y nula. Editor 2×2 con enteros entre −3 y 3 y exponente entre 0 y 6; límites didácticos, no restricciones de la teoría.

Muestra la potencia solicitada, la lista desde A⁰ y el último producto fila por columna. Para n=0 no presenta un producto previo. Aplica Aⁿ al vector inicial (10,3)ᵀ; la interpretación en unidades solo acompaña al ejemplo de acumulación constante.

Las entradas inválidas se marcan y se conserva el último valor válido. Las variantes mantienen el exponente y pueden repetirse. Las respuestas, matrices y resultados no persisten; solo se guardan preferencias de lectura.

## Pruebas matemáticas

**141 pruebas acumuladas superadas**, incluidas cinco nuevas:

- 2100 potencias en órdenes 1, 2 y 3, con exponentes 0–6, contrastadas mediante exponenciación binaria independiente y todos los resultados intermedios.
- Patrones hasta n=12, cien bases para leyes de exponentes y estados comparados con acumulación escalar.
- Ejemplos del texto, práctica, contraejemplo de bases distintas, nula y base fraccionaria.
- Rechazo de bases rectangulares, exponentes inválidos y resultados no finitos; variantes reproducibles y ausencia de mutación de la base.
- Bancos t04 con 24/24, catálogo 204/187 e identificadores únicos.

## Navegador

`tests/matrix-power-41-browser.cjs` ha recorrido:

- Siete ejemplos, potencias pares/impares, cero, nula y estado de acumulación.
- Potencias intermedias y detalle de las cuatro casillas del último producto.
- Edición, entradas inválidas y variantes coherentes con la semilla.
- Test 5/6 al primer intento con pista y reintento, seis tarjetas y recarga.
- Móvil 320 px, texto al 200 %, contraste y resaltado sin perder respuestas.
- Desplazamiento local para matrices/fórmulas, sin desbordamiento de página.
- Índice con cuatro lecciones disponibles y ocho pendientes; filtros de 24 preguntas y 24 tarjetas.
- Alojamiento en subcarpeta con cabecera y pie.
- Sin errores JavaScript, HTTP ni MathJax.

Capturas inspeccionadas: `../../tmp/potencia-matrices-escritorio.png` y `../../tmp/potencia-matrices-movil.png`.

Regresiones superadas: `tests/matrix-product-40-browser.cjs` (4.3) y `tests/lessons-06-browser.cjs` (tres lecciones avanzadas de t01 y recorrido del catálogo de 204 preguntas y 187 tarjetas).

Revisión estática: 171 HTML sin referencias locales rotas, fragmentos ausentes ni IDs duplicados. Enlaces de README y de este documento comprobados.

## Límites y siguiente contenido

El modelo admite órdenes de 1 a 4 y exponentes de 0 a 12; el editor está acotado a 2×2 y 0–6. Las potencias negativas se reservan para contenidos posteriores sobre inversas.

Tema 4 parcial. Siguiente: **4.5. Comparación de matrices. Matriz simétrica y matriz antisimétrica**. Continúan pendientes lectores de pantalla y pronunciación matemática, recursos PDF, administración central, voz y traducción. Fuentes originales conservadas.

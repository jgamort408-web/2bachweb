# Verificación · Entrega 39

Fecha: 5 de octubre de 2026.

## Resultado

Desarrollada [4.2. Operaciones con matrices](../libro/temas/04-matrices-y-determinantes/02-operaciones-con-matrices.html): suma, resta, opuesta, producto por escalar, propiedades y combinaciones lineales. Incluye cuatro ejemplos resueltos, práctica explicada, explorador, seis preguntas y seis tarjetas.

Tema 4: **2 de 12 epígrafes disponibles**, 12 preguntas y 12 tarjetas. Total del curso: **37 lecciones, 192 preguntas base, 175 tarjetas y diez widgets**. El explorador de la lección no cuenta como videojuego adicional.

## Archivos y conexiones

- `content/models/matrix-operations.js`: operaciones, compatibilidad, cálculo por posición, variantes y validación.
- `content/activities/matrix-operations.js`: preguntas, distractores, pistas, explicaciones y tarjetas.
- `assets/js/learning/matrix-operations-explorer.js`: editor y salida matemática.
- `assets/css/learning.css`: reglas locales para controles y tablas ampliadas.
- Lección 4.2, enlace desde 4.1, índice del tema, libro y portada.
- Catálogo común, inicialización de lecciones, test, tarjetas y estado editorial.
- `tests/matrix-operations.test.mjs` y `tests/matrix-operations-39-browser.cjs`.

Diseño provisional y servicio compartido de MathJax conservados. Las expectativas acumuladas de los tests pasan de 186/169 a 192/175; se mantiene la verificación individual de 4.1 en seis preguntas y seis tarjetas.

## Criterios matemáticos

- Suma, resta y combinación lineal requieren igual número de filas y columnas. No se rellenan ni recortan matrices incompatibles, incluso con coeficientes cero.
- El producto por escalar opera únicamente sobre A e ignora el estado de B.
- Se distingue compatibilidad de orden de coherencia de categorías y unidades.
- Se desarrollan conmutatividad y asociatividad de la suma, neutro, opuesta, distributividad y composición de escalares.
- La resta no es conmutativa ni asociativa; se incluyen contraejemplos.
- Los ejemplos verifican signos, variación semanal y el despeje de 2X+A=B.
- El producto por escalar no se confunde con una matriz escalar ni con el producto AB.

## Explorador

Dos matrices con dimensiones independientes de 1×1 a 3×3. Entradas enteras entre −20 y 20; escalares enteros entre −5 y 5. La teoría y el modelo matemático admiten valores reales; el editor limita los números para facilitar la práctica.

Cuatro modos: A+B, A−B, αA y αA+βB. Cada resultado incluye un desplegable con el cálculo de todas sus casillas. La incompatibilidad muestra los órdenes y su explicación sin fabricar un resultado.

Al redimensionar se conservan las posiciones comunes y se rellenan las nuevas con cero. Las entradas inválidas se marcan, se anuncian y conservan el último valor válido. Las variantes generan valores entre −3 y 3 y mantienen dimensiones y operación; pueden repetirse.

No persisten respuestas, matrices ni puntuaciones. Solo se guardan preferencias de lectura.

## Pruebas matemáticas

**131 pruebas acumuladas superadas**, incluidas cinco nuevas:

- 800 variantes en 16 órdenes: cuatro operaciones y propiedades contrastadas.
- 81 parejas de órdenes: compatibilidad y producto por escalar independiente de B.
- Ejemplos de la lección, práctica, contexto, despeje, contraejemplos y conservación de los datos originales.
- Validación de enteros y límites, matrices irregulares, operaciones desconocidas y resultados no finitos.
- Bancos de 4.2 con seis preguntas/tarjetas; t04 con 12/12; catálogo de 192/175 con identificadores únicos. Los temas 1–3 conservan 60 preguntas cada uno.

## Navegador

`tests/matrix-operations-39-browser.cjs` superado:

- Fórmulas estáticas y dinámicas; cuatro operaciones y cálculo por casillas.
- Escalares negativos y cero, órdenes incompatibles, edición y matrices de 3×3.
- Rechazo de vacío, fracción decimal y valores fuera de rango.
- Variantes coherentes con su semilla.
- Test 5/6 al primer intento, pista, reintento y seis tarjetas.
- Móvil de 320 px y texto al 200 %, contraste y resaltado: sin desbordamiento de página y con desplazamiento local en matrices/fórmulas.
- Preferencias conservan respuestas; recarga restaura matrices iniciales y elimina respuestas.
- Índice con dos lecciones disponibles y diez pendientes; filtro t04 con 12 preguntas y 12 tarjetas.
- Alojamiento en subcarpeta con cabecera y pie.
- Sin errores JavaScript, respuestas HTTP fallidas ni errores de MathJax.

Regresiones superadas: `tests/matrix-basics-38-browser.cjs` (editor y actividades de 4.1) y `tests/lessons-06-browser.cjs` (tres lecciones avanzadas de t01 y recorrido completo de las 192 preguntas y 175 tarjetas).

Capturas inspeccionadas: `../../tmp/operaciones-matrices-escritorio.png` y `../../tmp/operaciones-matrices-movil.png`.

Revisión estática: 171 HTML sin referencias locales rotas, fragmentos ausentes ni IDs duplicados. Enlaces de README y de este documento comprobados.

## Límites y siguiente contenido

El tema 4 continúa parcial. El producto AB se desarrollará en **4.3. Producto de matrices**.

La revisión global con lectores de pantalla y pronunciación matemática sigue pendiente. Los originales se conservan. PDF, administración central, voz, traducción y futura extensión de cuentas permanecen en sus fases previstas.

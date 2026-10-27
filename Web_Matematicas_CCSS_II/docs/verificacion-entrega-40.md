# Verificación · Entrega 40

Fecha: 6 de octubre de 2026.

## Resultado

Desarrollada [4.3. Producto de matrices](../libro/temas/04-matrices-y-determinantes/03-producto-de-matrices.html): compatibilidad dimensional, orden del resultado, cálculo fila por columna, propiedades, no conmutatividad e interpretación de datos y transformaciones.

Cinco ejemplos resueltos, práctica explicada, explorador, seis preguntas y seis tarjetas. Tema 4: **3 de 12 epígrafes disponibles**, 18 preguntas y 18 tarjetas. Curso: **38 lecciones, 198 preguntas base, 181 tarjetas y diez widgets**. El explorador no añade un videojuego al contador.

## Archivos y conexiones

- `content/models/matrix-product.js`: compatibilidad, producto, pasos por casilla, ejemplos y variantes.
- `content/activities/matrix-product.js`: preguntas, explicaciones, pistas y tarjetas.
- `assets/js/learning/matrix-product-explorer.js`: editor, orden AB/BA y selección de resultado.
- `assets/css/learning.css`: reglas locales de controles, contornos y tablas.
- Lección 4.3, enlace desde 4.2, índice del tema, libro y portada.
- Catálogo, inicialización, filtros de test/tarjetas y estado editorial.
- `tests/matrix-product.test.mjs` y `tests/matrix-product-40-browser.cjs`.

Se conserva el diseño provisional y el servicio compartido de MathJax. Los tests acumulados pasan de 192/175 a 198/181; las pruebas individuales de 4.1 y 4.2 siguen comprobando seis actividades de cada tipo.

## Criterios matemáticos

- Para A de orden m×n y B de orden n×p, AB tiene orden m×p. La casilla (i,j) suma n productos de la fila i y la columna j.
- Cambiar a BA obliga a comprobar otra vez las dimensiones; puede no existir, tener distinto orden o distintos valores.
- El producto no es conmutativo en general; hay casos particulares con AB=BA.
- Asociatividad y distributividad conservan el orden de los factores y exigen dimensiones compatibles.
- Para A rectangular se usan las identidades de tamaños adecuados a cada lado.
- AB=O no obliga a tener factores nulos ni permite cancelarlos sin otras condiciones.
- Ventas por precios produce ingresos, no beneficios. Las categorías deben estar alineadas.
- Con vectores columna, la transformación que actúa primero se escribe a la derecha.

## Explorador

Cuatro ejemplos cargables: matrices rectangulares; AB y BA de igual tamaño pero diferentes; producto nulo con factores no nulos; ventas y precios.

Se editan dos matrices de 1×1 a 3×3, con entradas enteras de −20 a 20. La teoría admite matrices reales; esos límites son didácticos. Redimensionar conserva casillas comunes y añade ceros. Entradas inválidas se señalan y mantienen el último valor válido.

El selector de casilla señala su fila y columna con contornos y explicación textual. El cálculo se muestra en LaTeX; un desplegable permite consultar todos los pasos. Si no existe el producto, se explica la incompatibilidad, se oculta la selección y se retiran los contornos.

Las variantes usan enteros de −3 a 3, mantienen dimensiones y orden de factores y pueden repetirse. No fuerzan compatibilidad: comprobarla forma parte de la exploración. Matrices, respuestas y puntuaciones no persisten; solo las preferencias de lectura.

## Pruebas matemáticas

**136 pruebas acumuladas superadas**, incluidas cinco nuevas:

- 810 productos en los 27 tamaños compatibles con dimensiones de 1 a 3, contrastados acumulando contribuciones; revisión de todos los pasos y conservación de datos originales.
- 81 parejas de órdenes, productos incompatibles, caso 1×1, fracciones, matrices inválidas y resultados no finitos.
- 100 casos de identidad rectangular, asociatividad, ambas distributividades y escalares.
- Cinco ejemplos, práctica, contraejemplos, ingresos y composición de transformaciones.
- Seis preguntas/tarjetas nuevas, t04 con 18/18, catálogo 198/181 e identificadores únicos.

## Navegador

`tests/matrix-product-40-browser.cjs` superado:

- Fórmulas estáticas y dinámicas, AB/BA, cuatro ejemplos y cálculo por casillas.
- Resultado 2×2 frente a 3×3; no conmutatividad de matrices cuadradas; producto nulo e ingresos.
- Caso incompatible sin resultado ni contornos; dimensiones 1×1 y 3×3.
- Edición, invalidación, corrección y generación coherente con la semilla.
- Test 5/6 al primer intento, pista y reintento; seis tarjetas.
- Móvil de 320 px y texto al 200 %, contraste y resaltado, con desplazamiento local de matrices/fórmulas y sin desbordamiento de página.
- Preferencias conservan respuestas; recargar recupera el ejemplo inicial y elimina respuestas.
- Índice con tres lecciones disponibles y nueve pendientes; filtros t04 con 18/18.
- Subcarpeta con cabecera y pie; sin errores JavaScript, HTTP ni MathJax.

Regresión de 4.2 superada con `tests/matrix-operations-39-browser.cjs`. Regresión global superada con `tests/lessons-06-browser.cjs`: tres lecciones avanzadas de t01 y recorrido de las 198 preguntas y 181 tarjetas del catálogo.

Capturas inspeccionadas: `../../tmp/producto-matrices-escritorio.png` y `../../tmp/producto-matrices-movil.png`.

Revisión estática: 171 HTML sin referencias locales rotas, fragmentos ausentes ni IDs duplicados. Enlaces de README y de este documento comprobados.

## Límites y siguiente contenido

Tema 4 parcial. Siguiente: **4.4. Potencia de una matriz**.

Siguen pendientes lectores de pantalla y pronunciación matemática, recursos PDF, administración central, voz y traducción. No se modifican las fuentes originales ni se compilan exámenes en esta entrega.

# Verificación · Entrega 29

Fecha: 30 de septiembre de 2026.

## Resultado

3.5. Integral definida desarrollada: acumulación como límite de sumas, unidades, diferencia frente a la integral indefinida, área con signo y área geométrica. Extremos iguales, orientación, aditividad y linealidad. Ejemplos resueltos de rectángulos, triángulos, tasa neta con saldo inicial y cálculo desde integrales conocidas. Práctica de compensación y seis preguntas/seis tarjetas nuevas.

Curso: 32 lecciones, 150 preguntas base y 145 tarjetas. Tema 3: 5/8 epígrafes y bancos de 30 preguntas/tarjetas. El teorema fundamental y Barrow permanecen en las siguientes entregas.

## Explorador

Funciones: 2, x−1 y |x|−1. Límites enteros a y b entre −3 y 3; 4, 8, 16 o 32 rectángulos. Son 588 configuraciones matemáticas, más la opción visual de mostrar u ocultar los rectángulos.

El modelo separa por ceros y cambios de tramo y calcula áreas exactas con trapecios. Las áreas superior e inferior son magnitudes no negativas; la integral multiplica su diferencia por la orientación, mientras el área geométrica suma las dos. En un intervalo nulo no se dibujan regiones ni rectángulos y los resultados valen cero.

El gráfico combina color con rayado horizontal/inclinado, una curva continua, contornos discontinuos de aproximación, marcas de límites y flecha de a hacia b. Incluye título y descripción SVG, explicación textual, estado anunciado y tabla de tramos ordenados de izquierda a derecha. Se diferencia explícitamente esta tabla de la orientación elegida. Al invertir límites cambian los signos de la integral y de la aproximación, no las áreas rayadas.

Las sumas toman alturas en puntos medios; se muestra el error absoluto y hasta seis decimales. Para rectas la aproximación coincide exactamente; con |x|−1 puede no coincidir si el vértice queda dentro de un subintervalo. La lección no generaliza la exactitud de casos particulares.

## Archivos (desde la raíz web)

- `libro/temas/03-integrales/05-integral-definida.html`.
- `content/models/definite-integrals.js`: geometría y aproximación sin dependencia del DOM.
- `assets/js/learning/definite-explorer.js`: controles, renderizado SVG, tabla, estado y cola compartida de LaTeX.
- `content/activities/definite-integrals.js`: seis preguntas y seis tarjetas.
- `content/activities/catalog.js`, `assets/js/learning/lesson.js`, `assets/css/learning.css`: integración y estilos acotados, sin rediseño.
- Índices, portada, `config/editorial.json`, README, plan y procedencia.

## Pruebas ejecutadas

**93 pruebas acumuladas superadas.** Las cuatro nuevas de `tests/definite-integrals.test.mjs` comprueban:

- 588 configuraciones: integral y área geométrica frente a primitivas independientes de f y |f|; áreas parciales, signos, orientación, separación de ceros/vértices, intervalos nulos y rechazo de entradas fuera de rango.
- Rectángulos frente a una suma de puntos medios independiente, error absoluto, exactitud para rectas y convergencia al duplicar n. Para |x|−1 se contrasta además la cota de error por la anchura del subintervalo.
- Aditividad con todos los triples de extremos permitidos, incluso fuera del orden creciente; linealidad con cuadratura independiente; valores geométricos y unidades de los ejemplos.
- Bancos separados 60/60/30 preguntas y 61/54/30 tarjetas, tamaños de lección e identificadores únicos.

`tests/definite-integrals-29-browser.cjs` verifica 27 combinaciones de función/a/b, incluidos extremos iguales e invertidos; los cuatro números de rectángulos, progreso del error, mostrar/ocultar contornos, cambios consecutivos, regiones y filas de tabla. La selección del test se conserva al modificar el explorador.

Test 5/6 con pista, reintento y reinicio; seis tarjetas reveladas; solución desplegada. Se exige presencia de contenedores MathJax, ausencia de errores matemáticos y delimitadores pendientes. Móvil 320 px con texto al 200 %, contraste y resaltado; tabla desplazable con teclado e intercambio de límites mediante Enter. Sin desbordamiento horizontal global; las fórmulas anchas mantienen desplazamiento local. La recarga elimina respuestas y estado de la actividad. Filtros t03 30/30, índice 5/8 y subcarpeta, con cabecera y pie.

Regresión general de tres lecciones avanzadas t01 y recorrido del catálogo completo de 150 preguntas/145 tarjetas. Revisión de 171 HTML: cero rutas locales rotas, anclas ausentes o IDs duplicados.

Capturas revisadas: `../../tmp/integral-definida-explorador.png` y `../../tmp/integral-definida-movil.png`.

## Límites y siguiente entrega

Se mantiene el diseño provisional. No se repiten las pruebas de fallos de red del motor MathJax porque no cambia. La revisión con lectores de pantalla y pronunciación matemática sigue pendiente; estas pruebas no certifican accesibilidad. Continúan pendientes los PDF, administración central, traducción, voz y cuentas futuras.

Siguiente: **3.6. Teorema fundamental del cálculo**, para relacionar la derivada de una función de acumulación con el integrando y preparar Barrow.

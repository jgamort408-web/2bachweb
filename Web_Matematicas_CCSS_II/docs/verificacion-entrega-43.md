# Verificación · Entrega 43

Fecha: 6 de octubre de 2026.

## Resultado

Desarrollada [4.6. Determinante de una matriz](../libro/temas/04-matrices-y-determinantes/06-determinante-de-una-matriz.html): definición, órdenes 1–3, Sarrus, signos, invertibilidad, parámetro y enlace con rango y sistemas.

Cinco ejemplos, práctica explicada, explorador, seis preguntas y seis tarjetas. Tema 4: **6 de 12 epígrafes con contenido**, 36 preguntas y 36 tarjetas. Curso: **41 lecciones, 216 preguntas base, 199 tarjetas y diez widgets**.

## Archivos y conexiones

- `content/models/determinants.js`: fórmulas, grupos, productos, posiciones y variantes.
- `content/activities/determinants.js`: preguntas con pistas y explicaciones, tarjetas.
- `assets/js/learning/determinants-explorer.js`: edición, selección de productos y cálculos.
- `assets/css/learning.css`: controles, contornos y tabla con desplazamiento local.
- Lección 4.6, enlace desde 4.5, portada, libro, índice, catálogo, filtros y estado editorial.
- `tests/determinants.test.mjs` y `tests/determinants-43-browser.cjs`.

Diseño provisional y MathJax compartido conservados. Expectativas acumuladas actualizadas de 210/193 a 216/199, y de t04 a 36/36.

## Criterios matemáticos

- El determinante es un número asociado a una matriz cuadrada; las barras no indican valor absoluto.
- En orden 2 se calcula ad−bc; en orden 3 se usan seis productos de Sarrus.
- Los productos conservan sus signos. P y Q indican grupos que se suman/restan y pueden ser negativos.
- Sarrus no se extiende al orden 4.
- Una matriz no cuadrada no tiene determinante en este sentido; no se le asigna cero.
- Determinante distinto de cero equivale a invertibilidad de la matriz cuadrada, también si es negativo.
- Determinante cero no implica matriz nula ni decide por sí solo la compatibilidad de un sistema.
- El ejemplo con parámetro tiene dos valores singulares, 3 y −2.
- Los ejemplos de sistemas verifican infinitas soluciones o contradicción para una misma matriz singular.

## Explorador

Siete ejemplos: orden 2 con signos, Sarrus con grupo negativo, determinante negativo, matriz singular no nula, matriz nula, orden 1 y rectangular 2×3.

Editor de una a tres filas/columnas con enteros entre −9 y 9. Redimensionar conserva las posiciones comunes y añade ceros. Las entradas inválidas se señalan y mantienen su último valor válido. Las variantes usan enteros entre −3 y 3 y conservan dimensiones; pueden repetirse.

Un selector señala los factores de cada producto con contornos y posiciones escritas. Se muestran grupos, sumas P y Q y resta final. En orden 1 solo se toma la entrada. Si la matriz es no cuadrada, se retira el selector y se explica que el determinante no está definido.

Los resultados con las entradas acotadas del editor son enteros exactos. El modelo admite números finitos, pero no incorpora aritmética simbólica ni un diagnóstico numérico para datos decimales próximos a la singularidad. Ese caso no se presenta en el editor.

No se guardan matrices, respuestas ni puntuaciones; solo preferencias de lectura.

## Pruebas matemáticas

**151 pruebas acumuladas superadas**, incluidas cinco nuevas:

- 19.764 matrices exhaustivas con entradas −1, 0 y 1: 81 de orden 2 y 19.683 de orden 3. Contraste mediante expansión por menores independiente; comprobación de todos los productos y sus posiciones.
- 1500 variantes en órdenes 1–3: signos, traspuesta, grupos, reproducibilidad y conservación de datos. Cien casos adicionales verifican el determinante de un producto.
- Ejemplos, parámetro, práctica y sistemas compatibles/incompatibles.
- Rectangulares sin valor asignado, orden 1, entrada fraccionaria, matrices inválidas, orden no soportado y desbordamiento numérico.
- Bancos 36/36 en t04 y catálogo 216/199 con identificadores únicos.

## Navegador y revisión final

`tests/determinants-43-browser.cjs` superado:

- Siete ejemplos, orden 1, orden 2 y seis productos de Sarrus.
- Selección de factores por posiciones y resta de un grupo negativo.
- Determinante negativo, nulo y no definido; retirada de controles y contornos cuando la matriz no es cuadrada.
- Edición, valores inválidos, redimensionado y variantes reproducibles.
- Test 5/6 al primer intento con pista y reintento; seis tarjetas.
- Preferencias conservan respuestas; recarga restaura la base inicial y elimina respuestas.
- Móvil 320 px y texto al 200 %, contraste y resaltado; desplazamiento local en tablas/fórmulas sin desbordamiento de página.
- Índice 6/12, filtros de 36 preguntas y 36 tarjetas, subcarpeta con cabecera y pie.
- Sin errores JavaScript, HTTP ni MathJax.

Regresiones superadas: `tests/matrix-symmetry-42-browser.cjs` (4.5) y `tests/lessons-06-browser.cjs` (tres lecciones avanzadas de t01 y recorrido completo de 216 preguntas y 199 tarjetas).

La primera ejecución de navegador encontró la vista previa local detenida; se reinició el servidor y se repitieron satisfactoriamente las tres comprobaciones.

Capturas inspeccionadas: `../../tmp/determinantes-escritorio.png` y `../../tmp/determinantes-movil.png`.

Revisión estática: 171 HTML sin referencias locales rotas, fragmentos ausentes ni IDs duplicados. Enlaces de README y de este documento comprobados.

## Límites y siguiente contenido

Tema 4 parcial. Siguiente: **4.7. Propiedades de los determinantes**. No se calculan inversas ni determinantes de orden superior a 3 en este explorador.

Siguen pendientes lectores de pantalla y pronunciación matemática, recursos PDF, administración central, voz y traducción. No se modifican las fuentes originales ni se compilan exámenes en esta entrega.

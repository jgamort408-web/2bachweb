# Verificación · Entrega 38

Fecha: 5 de octubre de 2026.

## Resultado

Desarrollada [4.1. Matrices: definición, características y tipos](../libro/temas/04-matrices-y-determinantes/01-matrices-definicion-caracteristicas-y-tipos.html): definición, orden, índices, tipos, igualdad, interpretación de datos, cuatro ejemplos resueltos y práctica con parámetro.

Incluye editor interactivo, seis preguntas y seis tarjetas. El tema 4 tiene **1 de 12 epígrafes disponible**, con los otros once conservados y pendientes. Totales del curso: **36 lecciones, 186 preguntas base, 169 tarjetas y diez widgets**. El editor es una actividad de lección, no un videojuego adicional.

## Archivos y conexiones

Desde la raíz web:

- `content/models/matrix-basics.js`: dimensiones, clasificación, igualdad, redimensionado, variantes reproducibles y LaTeX.
- `content/activities/matrix-basics.js`: seis preguntas con distractores comentados, pistas y explicaciones; seis tarjetas.
- `assets/js/learning/matrix-basics-explorer.js`: editor de entradas y clasificación.
- `assets/css/learning.css`: reglas locales de controles y tabla ampliada.
- Lección 4.1 e índice t04; portada e índice general del libro actualizados.
- `content/activities/catalog.js` y `assets/js/learning/lesson.js`: integración y filtro t04.
- `test/index.html`, `tarjetas/index.html` y `config/editorial.json`: orientación y estados.
- `tests/matrix-basics.test.mjs` y `tests/matrix-basics-38-browser.cjs`: verificaciones.

Se conservan la configuración de MathJax y el diseño provisional. Se actualizan expectativas acumuladas de tests existentes de 180/163 a 186/169, sin alterar cálculos numéricos ajenos al catálogo.

## Criterios matemáticos

- Orden = filas × columnas; índices desde 1. Número de entradas y orden no son equivalentes.
- Rectangular no cuadrada significa m≠n. Toda matriz sigue siendo una disposición rectangular de datos.
- Diagonal, escalar e identidad requieren orden cuadrado. Identidad implica escalar y escalar implica diagonal.
- La diagonal puede contener ceros. Una nula cuadrada es diagonal y escalar; una nula rectangular no.
- Una matriz 1×1 es fila, columna, cuadrada, diagonal y escalar; identidad solo con valor 1, nula solo con 0.
- Igualdad exige mismo orden y todos los elementos correspondientes; se comprueban también posiciones sin incógnitas.
- El ejemplo de ventas distingue unidades vendidas de euros y conserva etiquetas de filas/columnas.

## Explorador

Ocho ejemplos cargables: datos de ventas, fila, columna, cuadrada, nula rectangular, diagonal, escalar e identidad. Permite entre una y cuatro filas/columnas; valores enteros entre −99 y 99. Al cambiar dimensiones conserva la intersección de casillas existentes y rellena las nuevas con cero. No modifica el ejemplo original.

La casilla enfocada muestra su fila, columna, valor y notación. El editor anuncia varios tipos compatibles. Las entradas inválidas se marcan y no reemplazan el último valor válido usado en la matriz calculada. Los cambios y las variantes no se guardan; solo persisten preferencias de lectura.

Las nuevas matrices generadas contienen enteros entre −3 y 3. Pueden repetirse; no se cuentan como preguntas base.

## Pruebas matemáticas

**126 pruebas acumuladas superadas**, incluidas cuatro nuevas:

- Las 81 matrices 2×2 con entradas −1, 0 y 1: clasificación contrastada con condiciones explícitas.
- Casos 1×1, nula rectangular y diagonal con ceros.
- 1600 variantes, en los 16 órdenes de 1×1 a 4×4: dimensiones, rango de valores, inclusiones y reproducibilidad.
- Igualdad por posiciones, parámetros y contradicción; copia independiente al redimensionar y validación de matrices.
- Ejemplos de ventas y práctica con parámetro, seis preguntas/tarjetas, IDs únicos y aislamiento de t04.
- Temas 1–3 conservan 60 preguntas cada uno y mazos de 61, 54 y 48 tarjetas.

## Navegador

`tests/matrix-basics-38-browser.cjs` superado:

- Fórmulas de la lección, tabla de tipos y salida dinámica sin errores de MathJax.
- Ocho ejemplos del editor, modificación de un elemento fuera de la diagonal y clasificación actualizada.
- Nula rectangular convertida en cuadrada; matrices 1×1 con −2, 1 y 0.
- Rechazo de vacío, decimal no entero y valor fuera de rango; conservación del último valor válido.
- Redimensionado hasta 4×4 y generación coherente con la semilla.
- Test 5/6 al primer intento con error, pista y segundo intento; seis tarjetas reveladas.
- Móvil de 320 px y texto al 200 %, contraste/resaltado, selección conservada y tabla con desplazamiento local.
- Recarga que restaura el ejemplo inicial y elimina las respuestas.
- Índice con una lección disponible y once pendientes, filtro t04 con seis preguntas/tarjetas, y subcarpeta con cabecera/pie.
- Sin errores JavaScript ni respuestas HTTP fallidas.

Durante la revisión se corrigió un desbordamiento del selector de ejemplos al 200 % y se simplificó el encabezado de fila para evitar letras apiladas.

Regresión `tests/lessons-06-browser.cjs` superada: recorrido de **186 preguntas y 169 tarjetas** del catálogo actual, junto con tres lecciones avanzadas de t01. Se verifica el contenido dinámico tras ampliar el catálogo común.

Capturas inspeccionadas: `../../tmp/matrices-basicas-escritorio.png` y `../../tmp/matrices-basicas-movil.png`.

Revisión estática: 171 HTML sin referencias locales rotas, fragmentos ausentes ni IDs duplicados. Enlaces de README y de este documento comprobados.

## Límites y siguiente contenido

La clasificación del editor se limita a los tipos de 4.1; no adelanta simetría, rango, determinantes ni operaciones matriciales. El editor acepta enteros para facilitar la exploración, aunque la teoría define matrices reales.

La revisión completa con lectores de pantalla y pronunciación matemática sigue pendiente. No se modifican originales ni se compilan exámenes en esta entrega. PDF, administración central, voz, traducción y cuentas permanecen en sus fases.

Siguiente: **4.2. Operaciones con matrices** (suma, resta y producto por un escalar).

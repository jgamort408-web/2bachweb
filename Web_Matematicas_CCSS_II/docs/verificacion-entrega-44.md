# Verificación · Entrega 44

Desarrollo: 6 de octubre de 2026. Cierre de verificación: 7 de octubre de 2026.

## Resultado

Desarrollada [4.7. Propiedades de los determinantes](../libro/temas/04-matrices-y-determinantes/07-propiedades-de-los-determinantes.html): intercambio, escalado, suma de múltiplos, factores comunes, dependencia, triangularidad, producto y traspuesta.

Cinco ejemplos, práctica explicada, explorador, seis preguntas y seis tarjetas. Tema 4: **7 de 12 epígrafes con contenido**, 42 preguntas y 42 tarjetas. Curso: **42 lecciones, 222 preguntas base, 205 tarjetas y diez widgets**.

## Archivos y conexiones

- `content/models/determinant-properties.js`: transformaciones, condiciones, factor y determinantes.
- `content/activities/determinant-properties.js`: preguntas con pistas y explicaciones, tarjetas.
- `assets/js/learning/determinant-properties-explorer.js`: edición, controles y comparación.
- `assets/css/learning.css`: controles y tabla ampliada.
- Lección 4.7, enlace desde 4.6, portada, libro, índice, catálogo, filtros y estado editorial.
- `tests/determinant-properties.test.mjs` y `tests/determinant-properties-44-browser.cjs`.

Diseño provisional y servicio compartido de MathJax conservados. Expectativas de catálogo actualizadas de 216/199 a 222/205 y de t04 a 42/42.

## Criterios matemáticos

- Intercambiar dos posiciones distintas cambia el signo del determinante.
- Escalar una sola fila/columna introduce k; escalar toda una matriz n×n introduce kⁿ.
- Sumar un múltiplo de otra fila/columna conserva el determinante cuando el origen es distinto del destino y se mantiene.
- k=0 es válido para escalar, pero impide recuperar el determinante original dividiendo entre k.
- Las operaciones sucesivas requieren seguir todos los factores y signos.
- Dependencia de filas/columnas y triangularidad permiten evitar cálculos completos.
- Linealidad en una sola fila no equivale a det(A+B)=det(A)+det(B).
- La traspuesta conserva el determinante; el producto multiplica determinantes para matrices cuadradas del mismo orden.

## Explorador

Cuatro bases cargables: creación de ceros en orden 3, orden 2, triangular y filas proporcionales. Editor cuadrado de órdenes 2 y 3; entradas enteras entre −9 y 9 y factor k entre −3 y 3.

Cinco modos: sumar un múltiplo, intercambiar, escalar una fila/columna, escalar toda A y trasponer. Se muestra B, la operación, la propiedad, determinantes antes/después, factor esperado y lista de entradas que cambian.

Origen y destino coincidentes se rechazan para intercambio y suma de múltiplos; no se muestran como aplicaciones válidas de sus reglas. Las bases singulares se comprueban mediante igualdad de productos, sin dividir por cero.

Cada selección parte de A; no acumula transformaciones. Redimensionar conserva posiciones comunes y añade ceros. Los valores inválidos mantienen el último valor válido y se señalan. Las variantes mantienen orden y operación, y pueden repetirse.

No se guarda historial. Solo persisten preferencias de lectura. Los límites enteros garantizan cálculos exactos en el editor; no es un sistema de álgebra simbólica o diagnóstico numérico con decimales arbitrarios.

## Pruebas matemáticas

Cinco pruebas nuevas superadas; **156 pruebas matemáticas acumuladas aprobadas**:

- 54.600 configuraciones de operaciones, ejes, posiciones y escalares; verificación de entradas y determinantes mediante expansión por menores independiente, incluida validación de índices distintos.
- 2800 comprobaciones de escala global/traspuesta en órdenes 2 y 3, con escalares de −3 a 3; bases singulares y factor cero.
- Cinco ejemplos, cadena completa, factores extraídos, triangularización, producto/traspuesta, práctica y contraejemplo de aditividad.
- Entradas inválidas, índices, operaciones desconocidas, desbordamiento, factores fraccionarios del modelo y variantes reproducibles.
- Bancos t04 42/42, catálogo 222/205 e identificadores únicos.

## Navegador y revisión final

Recorrido de 4.7 superado: cinco operaciones, filas y columnas, rechazo de posiciones coincidentes, factores negativos y cero, cuatro bases, edición inválida y generación reproducible.

- Test completado con 5/6 al primer intento, pista y corrección; seis tarjetas revisadas.
- Móvil de 320 px, texto al 200 %, contraste y resaltado; captura revisada. La tabla y las fórmulas extensas permiten desplazamiento horizontal dentro de su región, sin desbordar la página.
- Se conserva la respuesta seleccionada al cambiar preferencias. Recargar restablece la actividad sin guardar respuestas.
- Comprobadas fórmulas sin errores, cabecera y pie comunes, índice 7/12, filtros t04 42/42 y funcionamiento bajo subcarpeta.
- Regresión de 4.6 y catálogo completo: 222 preguntas y 205 tarjetas.
- 171 HTML revisados: cero enlaces rotos, fragmentos inexistentes o IDs duplicados. También comprobados enlaces de README y de este documento.
- Capturas locales: `../../tmp/propiedades-determinantes-escritorio.png` y `../../tmp/propiedades-determinantes-movil.png`.

La prueba automatizada inicialmente seleccionaba una opción numérica por coincidencia con su etiqueta visible, en lugar de por su valor interno. Se corrigió para seleccionar explícitamente por valor y esperar el resultado de la actualización de fórmulas. El recorrido completo terminó correctamente; no fue necesario modificar el servicio de MathJax.

## Límites y siguiente contenido

El explorador compara una transformación por vez. El ejemplo escrito desarrolla la cadena de triangularización; no se anuncia un eliminador automático ni un historial persistente.

Tema 4 parcial. Siguiente: **4.8. Desarrollo de un determinante**. Continúan pendientes lectores de pantalla y pronunciación matemática, PDF, administración central, voz y traducción. Fuentes originales conservadas.

# Verificación · Entrega 46

Fecha: 7 de octubre de 2026.

## Resultado

Desarrollada [4.9. Matriz inversa y matriz adjunta](../libro/temas/04-matrices-y-determinantes/09-matriz-inversa-y-matriz-adjunta.html). Definición, existencia, unicidad, propiedades, cofactores, adjunta, fórmula, comprobación y ecuaciones/sistemas.

Cinco ejemplos, práctica explicada, seis preguntas y seis tarjetas. Tema 4: **9 de 12 epígrafes**, 54 preguntas y 54 tarjetas. Curso: **44 lecciones, 234 preguntas base, 217 tarjetas y diez widgets**.

## Archivos y alcance

- `content/models/matrix-inverse.js`: modelo exacto para enteros acotados, fracciones reducidas, cofactores, adjunta, inversa y productos.
- `assets/js/learning/matrix-inverse-explorer.js`: edición y seguimiento de cada cofactor.
- `content/activities/matrix-inverse.js`: preguntas con pistas y explicaciones; tarjetas.
- Lección 4.9, portada, libro, índice, catálogo, filtros y estado editorial.
- `tests/matrix-inverse.test.mjs` y `tests/matrix-inverse-46-browser.cjs`.

Convención explícita: Adj(A)=Cᵀ. La posición (i,j) de C pasa a (j,i) de la adjunta y se divide entre el determinante para obtener esa entrada de la inversa.

Cuatro bases: orden 2 con fracciones, orden 3 no simétrico, singular y determinante negativo. Editor de órdenes 2–3 y entradas enteras de −9 a 9; fracciones exactas con denominador positivo. Cada cofactor incluye su submatriz, menor, signo y destino tras la trasposición.

Los productos A·Adj(A) y Adj(A)·A se calculan con enteros y se muestran. Cuando det(A)≠0, al dividir se obtiene la identidad en ambos órdenes. Con determinante cero se explica la singularidad y se conserva la adjunta, sin intentar dividir.

Las variantes pueden ser singulares. Las entradas inválidas conservan el último valor válido y se señalan. Redimensionar conserva casillas comunes y añade ceros. No se guardan respuestas ni historial; solo preferencias de lectura.

## Matemáticas

**165 pruebas acumuladas aprobadas**, cinco nuevas:

- 1625 matrices: 625 matrices 2×2 exhaustivas con entradas −2..2 y 1000 variantes 3×3. Inversa y singularidad contrastadas con Gauss-Jordan independiente.
- Verificados A·Adj(A)=Adj(A)·A=det(A)I, ambos productos con la inversa, trasposición y conservación de la entrada.
- Cinco ejemplos, práctica, ecuaciones AX=D/XA=D, sistema de precios, parámetro y orden inverso en un producto.
- Fracciones: reducción, signo, cero, formato LaTeX y rechazo de división por cero.
- Entradas acotadas, órdenes, variantes reproducibles y bancos 54/54 y 234/217 sin IDs repetidos.

## Navegador y revisión visual

Recorrido de 4.9 superado: cuatro bases, todas las posiciones de sus cofactores, contornos acompañados de posiciones escritas, fracciones, productos en ambos órdenes, singularidad y recuperación, validación, cambios de orden y variantes.

Test completado con 5/6 al primer intento, pista y corrección; seis tarjetas revisadas. Fórmulas sin errores. Preferencias de lectura conservan la respuesta seleccionada; recargar restablece la actividad sin historial.

Comprobados móvil de 320 px con texto al 200 %, contraste y resaltado, además de escritorio. Capturas revisadas: `../../tmp/matriz-inversa-escritorio.png` y `../../tmp/matriz-inversa-movil.png`. Las tablas y fórmulas anchas se desplazan dentro de sus regiones sin ensanchar la página.

Índice 9/12, filtros t04 54/54, cabecera y pie comunes y ejecución bajo subcarpeta verificados.

Regresión de 4.8 y recorrido del catálogo completo (234 preguntas y 217 tarjetas) superados. Los 171 HTML no presentan enlaces rotos, fragmentos inexistentes ni identificadores duplicados. Verificados también los enlaces de README y de este documento.

## Límites y siguiente contenido

El modelo está acotado a órdenes 2–3 con entradas enteras; no se presenta como cálculo simbólico o inversión numérica de matrices arbitrarias. Los parámetros y sistemas se trabajan en el texto. Se mantienen el diseño provisional, el servicio MathJax y los originales.

Tema 4 parcial. Siguiente: **4.10. Rango de una matriz**. Siguen pendientes PDF, administración central, voz, traducción y revisión con lectores de pantalla y pronunciación matemática.

# Verificación · Entrega 49

Fecha: 7 de octubre de 2026.

## Resultado

Desarrollada [4.12. Grafos y matriz de adyacencia asociada](../libro/temas/04-matrices-y-determinantes/12-grafos-y-matriz-de-adyacencia-asociada.html): vocabulario, matriz binaria, orientación, grados, potencias y recorridos de longitud exacta.

Cinco ejemplos, práctica, seis preguntas y seis tarjetas. Tema 4: **12 de 12 epígrafes**, 72 preguntas y 72 tarjetas. Curso: **47 lecciones, 252 preguntas base, 235 tarjetas y diez widgets**. El explorador no se cuenta como juego independiente. Tema 4 aún parcial.

## Implementación y límites

- `content/models/graphs.js`: validación, grados, potencias, enumeración de recorridos y generación reproducible.
- `assets/js/learning/graph-explorer.js`: cinco redes, editor de conexiones, SVG con descripción textual, orientación y selección de recorridos.
- `content/activities/graphs.js`: banco de preguntas y tarjetas.
- Lección, catálogo, índices, filtros, navegación y estado editorial.
- `tests/graphs.test.mjs` y `tests/graphs-49-browser.cjs`.

Entre dos y cuatro vértices, longitudes de cero a cuatro pasos. No se admiten lazos, pesos ni conexiones múltiples. Las redes dirigidas permiten ambos sentidos entre dos vértices. En modo no dirigido, la edición refleja cada cambio en la casilla simétrica. Al pasar de dirigido a no dirigido se unen ambos sentidos; basta un arco para conservar la arista y la operación se anuncia. Al pasar a dirigido, cada arista queda representada por dos arcos.

Redimensionar conserva conexiones comunes; los nuevos vértices comienzan aislados. Generar mantiene tamaño y orientación. El recuento y la lista de recorridos se actualizan mediante el servicio compartido de fórmulas, con una instantánea de cada estado para cambios rápidos.

Los trazos gruesos discontinuos señalan conexiones del recorrido elegido; el texto y el selector indican orden y repeticiones. La descripción de la imagen enumera las conexiones. Los controles son nativos y operables con teclado. No se guardan respuestas ni historial. Diseño provisional, preferencias compartidas y motor MathJax conservados.

## Matemáticas

Cinco pruebas nuevas aprobadas:

- 74 grafos no dirigidos (todos los de órdenes 2–4), los 64 dirigidos de orden 3 sin lazos y 200 redes dirigidas generadas de orden 4.
- Para cada red, longitudes 0–4 y todos los pares de origen/destino: contraste con conteo independiente de llegadas por pasos, sin usar potencias ni enumeración recursiva.
- Cada recorrido listado tiene extremos, longitud y conexiones correctos, sin duplicados. Se comprueban grados, número de aristas/arcos e inmutabilidad.
- Ejemplos y práctica, vértices aislados, repetición de aristas, redes dirigidas y significado de los ceros.
- Edición y conversión; generación reproducible; entradas inválidas; bancos 72/72 y 252/235 e identificadores únicos.

## Navegador y presentación

Prueba de 4.12 aprobada: cinco redes, 80 combinaciones de longitud y extremos en el anillo, selección de recorridos, teclado y conservación de foco, arcos dirigidos, unión de sentidos, redimensionado, generación y ráfaga de cambios.

Test completado con 5/6 al primer intento, pista y corrección; seis tarjetas revisadas. Respuesta conservada al cambiar preferencias y restablecida al recargar.

Escritorio y móvil de 320 px con texto al 200 %, contraste y resaltado revisados. Capturas: `../../tmp/grafos-escritorio.png` y `../../tmp/grafos-movil.png`. Tablas y fórmulas anchas se desplazan dentro de sus regiones; no desbordan la página. El grafo tiene una alternativa textual; no se ha realizado todavía una auditoría completa con lectores de pantalla.

Índice 12/12, filtros 72/72, cabecera, pie y funcionamiento bajo subcarpeta comprobados. No hubo errores de página, recursos HTTP fallidos ni errores de MathJax en el recorrido.

## Verificación acumulada

**180 pruebas acumuladas aprobadas.** Regresión de 4.11 y recorrido del catálogo completo de 252 preguntas y 235 tarjetas superados. Revisados los 171 HTML sin enlaces rotos, fragmentos inexistentes ni identificadores duplicados; también se comprobaron los enlaces de README y de este documento.

## Siguiente contenido

**Repaso integrado y auditoría del tema 4**, seguidos de sus tres juegos independientes. Siguen pendientes PDF, administración central, voz, traducción y auditoría con lectores de pantalla.

Se mantiene el criterio del usuario para programación lineal, estadística, distribuciones e inferencia: integrar los HTML originales y dejar huecos en blanco o documentados, sin generar contenido para completarlos.

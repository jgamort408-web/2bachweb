# Verificación · Entrega 76

Fecha: 13 de octubre de 2026.

## Resultado

Integradas [19 tarjetas originales revisadas del tema 6](../tarjetas/index.html?tema=t06) en el motor común, con cinco categorías. Total: 320 tarjetas; 318 preguntas y dieciséis juegos sin cambios. Se mantienen 58 lecciones desarrolladas y cinco parciales.

## Comprobaciones

- [Prueba de navegador y catálogo](../tests/pl-cards-import-76-browser.cjs), comando test:pl-cards-import: aprobada.
- Recorridas las 19 preguntas/respuestas en raíz y subcarpeta; cinco categorías con 3/5/4/3/4 tarjetas. Cambio de filtro reinicia posición y oculta respuesta.
- Fórmulas con MathJax local sin errores ni delimitadores visibles, navegación anterior/siguiente, límites del mazo, mostrar/ocultar por teclado y cambios rápidos de categoría.
- Móvil de 320 px con texto 200 %, contraste y resaltado; posición y respuesta conservadas al cambiar preferencias. Al recargar, posición y categoría vuelven al inicio, respuesta oculta y preferencias de lectura conservadas.
- Regresión del visor en temas 1–5 (61/54/48/72/66 tarjetas), banco global de 320 y mazo de una lección de sistemas. Cuestionario de esa lección sigue presente.
- Sin errores de página ni peticiones HTTP externas en el recorrido.
- Integridad de ocho archivos fuente (Inicio y los siete originales de programación lineal) y correspondencia por orden/categoría.
- Revisión editorial de las 19 respuestas y correcciones en la [auditoría](auditoria-reutilizacion-programacion-lineal.md).
- Tres pruebas existentes de tests/generators.test.mjs aprobadas: 1.000 semillas, cobertura e identificadores/respuestas únicos. No se ha repetido la batería acumulada de 277 pruebas de la entrega 69; no se cambian los modelos de juegos.
- Ocho archivos originales intactos mediante SHA-256. Las 19 posiciones y categorías coinciden con el mazo fuente; IDs globales únicos.
- 172 HTML y seis Markdown revisados, sin enlaces rotos, fragmentos ausentes ni IDs duplicados.
- Capturas inspeccionadas: [escritorio](../../tmp/pl-tarjetas-escritorio.png) y [móvil al 200 %](../../tmp/pl-tarjetas-movil.png).
- La espera de prueba admite tarjetas iniciales de texto sin indicador MathJax; el indicador solo existe cuando hay fórmulas que procesar.

## Límites y siguiente fuente

El mazo muestra y oculta respuestas; no realiza autocorrección ni guarda progreso. No se amplía con contenido ausente en el original. Lectores de pantalla y pronunciación matemática pendientes.

Siguiente: [0. Presentación.txt de estadística bidimensional](<../../Página web existente/2. Estadística Bidimensional/0. Presentación.txt>). Continúan pendientes PDF, administración central, traducción, voz y cuentas futuras.

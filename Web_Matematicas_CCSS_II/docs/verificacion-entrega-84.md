# Verificación · Entrega 84

Fecha: 14 de octubre de 2026.

## Resultado

[20 tarjetas originales de estadística bidimensional](../tarjetas/index.html?tema=bivariate), conservando categorías y correspondencia uno a uno. [Auditoría de las correcciones](auditoria-reutilizacion-estadistica-bidimensional.md).

## Comprobaciones

- [Prueba específica](../tests/bivariate-cards-import-84-browser.cjs), comando `test:bivariate-cards-import`: comprobaciones superadas.
- Dieciséis fuentes originales intactas por SHA-256.
- 20 tarjetas, categorías 4/5/5/6, índices de origen y 340 identificadores únicos en el catálogo.
- 318 preguntas conservadas; los mazos anteriores mantienen sus cantidades.
- Contraste independiente de producto de coeficientes, residuos, R², cambio de escala, covarianza pequeña con correlación perfecta y variable constante.
- Todas las caras y respuestas comprobadas en raíz y subcarpeta: texto y cada expresión LaTeX contrastados con el banco.
- Mostrar/ocultar por teclado, extremos del mazo, filtros y cambios rápidos.
- Recarga reinicia selección y respuesta visible, conservando preferencias de lectura.
- Móvil de 320 px con texto al 200 %, contraste y resaltado; sin desbordamiento horizontal de la página.
- Navegación desde el apoyo y regresión de los seis temas anteriores, mazo global y lección con tarjetas/test.
- Sin errores JavaScript, respuestas HTTP de error ni peticiones externas durante la prueba.
- Capturas revisadas: [escritorio](../../tmp/bidimensional-tarjetas-escritorio.png), [móvil](../../tmp/bidimensional-tarjetas-movil.png) y [fórmula en móvil](../../tmp/bidimensional-tarjetas-formula-movil.png).

- Prueba común `tests/generators.test.mjs`: tres comprobaciones superadas, incluyendo 1000 semillas, cobertura e IDs/respuestas únicos.
- Revisados 172 HTML y siete Markdown: cero enlaces rotos, fragmentos ausentes e IDs duplicados.

## Límites

Revisión específica del mazo, no auditoría global de accesibilidad ni prueba de carga del alojamiento. La carga matemática usa el servicio local y sus resguardos existentes. No se modifica el diseño, no se guarda progreso ni se añaden tarjetas procedurales. El visor requiere JavaScript.

Ocho originales del bloque integrados; apoyo parcial por las carencias documentadas. Total actual: 340 tarjetas, 318 preguntas, dieciséis juegos.

Siguiente: revisar [0. Presentación.txt de Distribuciones](<../../Página web existente/4. Distribuciones/0. Presentación.txt>) y su correspondencia con el tema 8.

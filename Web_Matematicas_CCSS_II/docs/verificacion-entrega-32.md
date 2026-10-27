# Verificación · Entrega 32

Fecha: 1 de octubre de 2026.

## Resultado

3.8. Aplicaciones de la integral desarrollada: áreas con el eje y entre curvas, intersecciones, fronteras, dominio, orden por tramos, unidades y acumulación. Seis ejemplos de áreas, dos modelos de tasa y una práctica resuelta. Dos ejemplos proceden de exámenes locales revisados y documentados.

Totales: 35 lecciones, 168 preguntas base y 163 tarjetas. Tema 3: ocho lecciones, 48 preguntas y 48 tarjetas. No se declara cerrado: quedan repaso, cobertura mínima de 60 preguntas, sus tres widgets y revisión global de accesibilidad.

## Implementación

- `content/models/integral-applications.js`: cuatro parejas de curvas, extremos en {−2,−1,0,1,2}, tres escalas y dos órdenes f/g; 600 configuraciones.
- Área independiente de la orientación y los nombres de las curvas; integral orientada diferenciada explícitamente. Partición en los cortes interiores y filtrado de intersecciones.
- `assets/js/learning/area-explorer.js`: dos curvas con trazos distintos, rayados según la función superior, círculos en los cortes, fronteras verticales, tabla exacta y estado anunciado. Escala vertical adaptable declarada en el pie.
- Seis retos por sesión con cuatro familias, cambios de escala y nombres, límites normales e invertidos. Cuatro respuestas distintas; fracciones exactas, incluidas opciones en doceavos.
- Seis preguntas y seis tarjetas fijas; integración en catálogo, índices, portada, estado editorial y documentación.
- Estilos acotados para SVG y tabla con ancho mínimo y desplazamiento local; motor LaTeX compartido y diseño provisional conservados.

## Matemáticas

**105 pruebas acumuladas superadas.** `tests/integral-applications.test.mjs` incorpora:

- 600 estados contrastados con cuadratura de dos nodos, exacta para los polinomios usados, sin reutilizar las primitivas como valor esperado.
- Orden de curvas en tres puntos interiores por tramo, intersecciones, área no negativa, escala, orientación y cambio de nombres.
- 1000 semillas, 6000 retos y 24 000 opciones: una sola correcta. Se analizan las fracciones mostradas y se comparan con su valor numérico. Más de 200 bancos distintos.
- Ejemplos, áreas locales, práctica, solicitudes, saldo inicial/final y variación total; límites iguales y cortes fuera del intervalo.
- Totales, identificadores, separación de bancos y opciones únicas.

## Navegador y revisión visual

`tests/integral-applications-32-browser.cjs` superado:

- 100 combinaciones de familia/a/b y 24 variantes de escala/intercambio; áreas e integrales contrastadas con cuadratura independiente.
- Número de tramos, tablas, regiones, curvas e intersecciones; abscisas de los marcadores. Límites iguales, inversión, sombreado, teclado y cambios consecutivos.
- Dos sesiones procedurales, error/pista/reintento, test 5/6 y reinicio, seis tarjetas, respuesta conservada al modificar controles y preferencias.
- MathJax renderizado, ausencia de errores, delimitadores pendientes y desbordamiento global.
- Móvil 320 px, texto al 200 %, contraste y resaltado, tabla desplazable con teclado y ancho mínimo comprobado.
- Recarga sin respuestas persistentes, bancos t03 48/48, índice 8/8 y ruta en subcarpeta con cabecera/pie.

Capturas revisadas: `../../tmp/areas-explorador.png` y `../../tmp/areas-movil.png`. La gráfica en móvil ampliado se complementa con descripción textual y tabla. Se usa «trazo de guiones» para no confundir estilo de dibujo con discontinuidad matemática.

Regresión `tests/lessons-06-browser.cjs`: tres lecciones avanzadas t01, 168 preguntas y 163 tarjetas. Revisión de 171 HTML: cero rutas locales rotas, fragmentos ausentes o IDs duplicados.

## Límites

No se modifica el motor MathJax ni se repiten sus ensayos de fallo de red. No se compilan PDF ni se alteran fuentes originales. Lectores de pantalla y pronunciación matemática siguen pendientes; no se certifica accesibilidad completa. Administración central, traducción, voz y futura extensión de cuentas conservan sus fases.

Siguiente: **repaso global de integrales**, auditoría de cobertura y ampliación del banco hasta al menos 60 preguntas, antes de sus tres videojuegos.

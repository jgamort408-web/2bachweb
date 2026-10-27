# Verificación · Entrega 26

Fecha: 29 de septiembre de 2026.

## Resultado y alcance

3.2. Integrales inmediatas completa. Tabla de constantes, potencias, recíproca, exponenciales y seno/coseno; dominios, linealidad, cinco ejemplos desarrollados, práctica con condición inicial, seis preguntas base y seis tarjetas. El entrenamiento genera seis retos por sesión sin guardar respuestas. Se conserva el diseño provisional y el motor MathJax compartido.

Curso: 29 lecciones, 132 preguntas base y 127 tarjetas. Tema 3: 2/8 lecciones, doce preguntas y doce tarjetas. Las variantes se cuentan aparte. El siguiente contenido es 3.3, integrales casi inmediatas.

## Archivos principales (desde la raíz web)

- `libro/temas/03-integrales/02-integrales-inmediatas.html`: lección y tabla desplazable con teclado.
- `content/models/immediate-integrals.js`: modelos reproducibles, opciones y fábrica de preguntas.
- `content/activities/immediate-integrals.js`: seis conceptos base y tarjetas.
- `assets/js/learning/immediate-practice.js`: montaje protegido del entrenamiento con el motor común de test.
- `content/activities/catalog.js`, `assets/js/learning/lesson.js`: integración.
- `assets/css/learning.css`: ancho mínimo acotado a la tabla, con desplazamiento local.
- `config/editorial.json`, índices de tema/test/tarjetas, portada, README, plan y procedencia.

## Evidencias

- 81 pruebas acumuladas superadas. `tests/immediate-integrals.test.mjs` contrasta 1000 semillas, 6000 integrales y 24000 opciones con diferencias centrales en varios puntos positivos; cada reto tiene una única opción cuya derivada coincide en todos los puntos. También verifica reproducibilidad y variedad de sesiones.
- Ejemplos comprobados mediante derivadas independientes, incluidos x negativo para ln|x|, bases menores que uno, potencias fraccionarias y signos trigonométricos. La condición inicial de la práctica se verifica por separado.
- `tests/immediate-integrals-26-browser.cjs`: dos rondas de seis retos y seis preguntas fijas; resumen 5/6 y 6/6, selección vacía, pista, reintento, bloqueo de respuestas resueltas y reinicio. Seis tarjetas reveladas. La sesión procedural conserva la selección del test independiente.
- Se exige presencia de contenedores MathJax en tabla, enunciados, opciones, explicaciones y tarjetas; sin errores matemáticos ni delimitadores pendientes.
- Móvil 320 px, texto 200 %, contraste y resaltado; sin desbordamiento horizontal de la página. Tabla y fórmulas largas usan desplazamiento local. Tabla y respuesta operadas con teclado. Preferencias conservan la respuesta; recargar borra la sesión.
- Filtros t03 12/12, índice 2/8 y ejecución bajo subcarpeta, incluyendo cabecera y pie.
- Regresión de 3.1: 27 ajustes, test, tarjetas, fórmulas y subcarpeta; regresión general de las tres lecciones avanzadas t01 y catálogo de 132 preguntas/127 tarjetas.
- Revisión de 171 HTML: sin rutas ni fragmentos locales rotos ni IDs duplicados.
- Capturas revisadas: `../../tmp/integrales-inmediatas-tabla.png` y `../../tmp/integrales-inmediatas-movil.png`.

La prueba de variedad detectó correlaciones al usar los bits inferiores del generador; se corrigió la selección para utilizar el valor completo normalizado. El ensayo de bloqueo en navegador se acotó a los controles dentro del fieldset, que son los elementos deshabilitados reconocidos por Playwright.

## Límites

No se repiten los ensayos de carga/fallos de red del motor común de fórmulas, que no cambia. La pronunciación matemática y la revisión con lectores de pantalla siguen pendientes; estas comprobaciones no certifican accesibilidad. También continúan pendientes las fases globales de PDF, administración central, traducción, voz y cuentas futuras. El tema 3 todavía está en desarrollo.

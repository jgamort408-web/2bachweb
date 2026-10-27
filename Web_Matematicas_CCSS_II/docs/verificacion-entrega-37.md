# Verificación · Entrega 37

Fecha: 5 de octubre de 2026.

## Resultado

Revisión conjunta del [tema 3: Integrales](../libro/temas/03-integrales/index.html#ruta-juegos): ocho lecciones, repaso, tres juegos, 60 preguntas base y 48 tarjetas. El inventario de veinte problemas/bloques permanece sin cambios.

Totales del curso: **35 lecciones, 180 preguntas base, 163 tarjetas y diez widgets**. No se añaden contenidos matemáticos en esta entrega. El estado editorial t03 sigue parcial por la revisión específica pendiente con lectores de pantalla y pronunciación matemática.

## Cambios

- El índice presenta una ruta por bloques: Parejas de primitivas después de 3.1–3.3; Método correcto después de 3.4, con ampliación por partes; Área por tramos después de 3.7–3.8.
- Se aclara que el orden es orientativo y no requiere puntuaciones previas.
- Las lecciones 3.3, 3.4 y 3.8 incluyen un enlace de refuerzo directo al juego correspondiente.
- Los tres anfitriones enlazan juego anterior/siguiente y regreso al repaso.
- Se actualizan plan, README, procedencia y auditoría. Los motores, bancos matemáticos y diseño general no cambian.

Archivos principales desde la raíz web:

- `libro/temas/03-integrales/index.html` y lecciones 03, 04 y 08.
- `laboratorios/juegos/t03-a-parejas-de-primitivas.html`, `t03-b-metodo-correcto.html` y `t03-c-area-por-tramos.html`.
- `tests/topic3-route-37-browser.cjs`, registrado como `npm run test:topic3-route`.

## Pruebas realizadas

**122 pruebas matemáticas y de estado acumuladas superadas.** No hay pruebas unitarias nuevas para los cambios de enlaces.

La nueva verificación integrada de navegador comprueba:

- Ocho entradas disponibles en el índice, ocho lecciones con fórmulas y cabecera/pie.
- Selección de una respuesta correcta por lección, conservación al activar texto al 200 %, contraste y resaltado, y corrección posterior.
- Enlaces de refuerzo en 3.3, 3.4 y 3.8 y regreso al índice.
- Test completo del tema: **60/60** con explicación renderizada en cada pregunta.
- Recorrido de las **48 tarjetas**, mostrando sus respuestas y fórmulas.
- Acceso con teclado desde la ruta a los tres anfitriones.
- Una corrección inicial en cada juego insertado: emparejamiento, estrategia y corte; propagación de preferencias sin perder la selección.
- Apertura independiente de los tres widgets, estado inicial sin puntuación y retorno al libro.
- Cadena de los tres juegos y regreso al repaso con prefijo de subcarpeta, compatible con la estructura prevista para GitHub Pages.
- Móvil de 320 px y texto al 200 %, sin desbordamiento global; desplazamiento local de fórmulas o gráficas cuando corresponde.
- Estados editoriales coherentes: tres juegos revisados y tema parcial.
- Sin errores JavaScript, respuestas HTTP fallidas, errores MathJax ni delimitadores sin procesar.

Además se repite `tests/integrals-review-33-browser.cjs`: cuatro bloques, pistas y soluciones, ampliación, doce preguntas con pista y reintento (11/12 al primer intento), reinicio, conservación de respuesta al ampliar, navegación de ocho lecciones y subcarpeta.

Los ensayos completos de las partidas individuales y sus generadores están en las entregas 34–36. Esta entrega añade el recorrido conjunto; no atribuye a ese recorrido la repetición de todas las combinaciones de juego.

## Inspección y enlaces

Capturas inspeccionadas: `../../tmp/integrales-ruta-movil.png` y `../../tmp/integrales-ruta-juego.png`. Muestran la orientación y un juego insertado con lectura ampliada y ajustes propagados.

Revisión estática: **171 HTML**, sin referencias locales rotas, fragmentos ausentes ni IDs duplicados. Enlaces de README, auditoría del tema y este documento comprobados.

## Límites y siguiente contenido

El recorrido de teclado y texto ampliado no certifica la accesibilidad completa. Lectores de pantalla y pronunciación matemática siguen pendientes; por eso no se marca el cierre global del tema. Tampoco se presentan voz, traducción, administración central o cuentas como funciones activas.

El motor de fórmulas no cambia y no se repiten sus pruebas previas de fallo y recuperación. Los exámenes LaTeX y la biblioteca PDF siguen en su fase pendiente. No se modifica ningún material original.

Siguiente: **4.1. Matrices: definición, características y tipos**, según el guion local.

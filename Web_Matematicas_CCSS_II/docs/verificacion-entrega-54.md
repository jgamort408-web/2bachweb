# Verificación · Entrega 54

Fecha: 8 de octubre de 2026.

## Resultado

Ruta conjunta del [tema 4: Matrices y determinantes](../libro/temas/04-matrices-y-determinantes/index.html#ruta-juegos): doce lecciones, repaso, tres juegos, 72 preguntas base y 72 tarjetas. Se conservan los veinte problemas/bloques inventariados.

El curso mantiene 47 lecciones, 252 preguntas base, 235 tarjetas y trece widgets. No se añaden contenidos matemáticos ni preguntas en esta entrega. El tema conserva el estado parcial por la auditoría pendiente con lectores de pantalla y pronunciación matemática.

## Cambios

- Ruta por bloques: Matrix Ops después de 4.1–4.4; La cámara del determinante después de 4.6–4.10; Redes y adyacencia después de 4.12.
- Enlaces de refuerzo según las dificultades: orden del producto, potencias, propiedades, cofactores y orientación de las conexiones.
- Enlaces a 4.5, 4.11 y repaso integrado para completar el estudio del tema.
- Invitaciones directas desde 4.4, 4.10 y 4.12, con retorno a la ruta.
- Navegación identificada en los tres anfitriones: ruta, anterior/siguiente y repaso.
- Orden orientativo y acceso libre; sin puntuación mínima ni persistencia personal.

Se conserva el diseño provisional. No cambian el motor de fórmulas, los generadores ni los bancos.

## Verificación

**200 pruebas matemáticas y de estado acumuladas superadas**, sin fallos ni pruebas omitidas. No se añaden pruebas unitarias para los cambios de enlaces.

Verificación integrada de navegador aprobada:

- Doce entradas disponibles en el índice y doce lecciones con cabecera, pie y fórmulas.
- Una respuesta por lección: selección conservada al activar texto al 200 %, contraste y resaltado; corrección posterior con teclado.
- Invitaciones de 4.4, 4.10 y 4.12 y regreso al índice.
- Test completo del tema: **72/72**, con explicación renderizada en cada pregunta.
- Las **72 tarjetas**, mostrando sus respuestas y fórmulas.
- Acceso desde la ruta con teclado a los tres anfitriones.
- Una respuesta inicial correcta en cada widget insertado, propagación de las preferencias sin perder la selección y puntuación de 100.
- Apertura independiente de los tres widgets, puntuación inicial cero y regreso al libro.
- Cadena anterior/siguiente y retorno al repaso bajo prefijo de subcarpeta.
- Tema parcial y los tres juegos revisados en el registro editorial.
- Móvil de 320 px y texto al 200 %, sin desbordamiento global; desplazamiento local de tablas y fórmulas cuando corresponde.
- Sin errores JavaScript, respuestas HTTP fallidas, errores MathJax ni delimitadores visibles sin procesar.

El comprobador espera a que desaparezcan los delimitadores visibles y concluya el estado de carga matemática antes de inspeccionar cada página; espera también las solicitudes de subcarpeta pendientes antes de cerrar el navegador. Esto evita comprobar contenido antes de su renderizado y errores de cierre del propio ensayo. El motor de fórmulas del sitio no cambia.

Regresión del repaso aprobada: cuatro bloques, pistas y soluciones, test 11/12 con pista/reintento, reinicio, conservación de selección al ampliar, doce lecciones, bancos 72/72 y subcarpeta.

## Inspección y enlaces

Capturas revisadas: `../../tmp/matrices-ruta-movil.png` y `../../tmp/matrices-ruta-juego.png`. Muestran la orientación y un juego insertado con texto ampliado y ajustes propagados.

Revisión estática de **171 HTML y cuatro documentos** (README, esta entrega, auditoría y procedencia): sin referencias locales rotas, fragmentos ausentes ni IDs duplicados.

## Archivos principales

- Índice del tema 4 y lecciones 04, 10 y 12.
- Anfitriones de Matrix Ops, La cámara del determinante y Redes y adyacencia.
- tests/topic4-route-54-browser.cjs, registrado como npm run test:topic4-route.
- README, plan, auditoría y procedencia.

## Límites y siguiente contenido

El recorrido de teclado y texto ampliado no certifica la accesibilidad completa. Sigue pendiente la revisión con lectores de pantalla y pronunciación matemática. Voz, traducción, administración central y cuentas futuras permanecen en sus fases globales. La biblioteca de exámenes LaTeX/PDF sigue pendiente.

Las partidas completas y los generadores de los tres juegos se verificaron en las entregas 51–53; esta entrega comprueba su integración. No se modifican fuentes originales. Para programación lineal y bloques estadísticos sigue vigente la reutilización de todos los HTML originales, con carencias señaladas.

Siguiente: **5.1. Sistemas de ecuaciones lineales**, según el guion local.

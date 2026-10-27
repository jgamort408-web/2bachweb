# Verificación · Entrega 70

Fecha: 11 de octubre de 2026.

## Resultado y alcance

[Recorrido de práctica del tema 5](../libro/temas/05-sistemas-de-ecuaciones/index.html#ruta-juegos): clasificación, operaciones de Gauss y elección del método. Acceso libre, orden orientativo, refuerzos según la dificultad y retorno al repaso.

Invitaciones desde 5.6, 5.8 y 5.11. Los tres anfitriones incluyen una navegación identificada con ruta, anterior/siguiente y repaso. Los widgets independientes también enlazan con la ruta. El anfitrión de Elige el método incorpora refuerzos específicos de inversa, Cramer, homogéneos y parámetros.

Se mantienen **58 lecciones, 318 preguntas, 301 tarjetas y dieciséis widgets**. Tema 5: once lecciones, 66 preguntas, 66 tarjetas y dieciséis bloques resueltos inventariados. Las puntuaciones no se agregan ni se exige completar una actividad para abrir otra.

Diseño provisional, generadores, corrección, preferencias y motor LaTeX conservados. No hay nuevas preguntas, soluciones, estilos ni persistencia de respuestas en esta entrega.

## Comprobaciones

- Última batería matemática y de estado: **277 pruebas superadas en la entrega 69**. No se repite para estos cambios de navegación y contenido orientativo; no se añade un test unitario que replique los enlaces.
- Nuevo ensayo de integración: tests/topic5-route-70-browser.cjs, registrado como test:topic5-route.
- Ensayo integrado aprobado: once lecciones con cabecera, pie, fórmulas y una respuesta corregida por teclado en cada una. Selección conservada con texto al 200 %, contraste y resaltado.
- Test completo del tema: **66/66**; revisadas las **66 tarjetas**, mostrando las respuestas y sus fórmulas.
- Tres juegos abiertos desde la ruta con teclado, una respuesta puntuada en cada uno y preferencias propagadas. En Gauss se aplicó una ruta válida por filas antes de clasificar; la matriz se conservó al ampliar.
- Tres widgets independientes con puntuación inicial cero y retorno a la ruta. Cadena anterior/siguiente y regreso al repaso comprobados bajo prefijo de subcarpeta.
- Estados editoriales: tema parcial y tres juegos revisados. Sin errores JavaScript, HTTP ni MathJax en el recorrido.
- Móvil de 320 px y texto al 200 %, sin desbordamiento horizontal global. Las fórmulas anchas conservan desplazamiento local.
- Capturas revisadas: [ruta móvil](../../tmp/sistemas-ruta-movil.png) y [juego insertado](../../tmp/sistemas-ruta-juego.png).
- 171 HTML y cinco documentos Markdown revisados: sin referencias locales rotas, fragmentos ausentes ni IDs duplicados.

La primera ejecución detectó una lectura prematura del juego mientras preparaba las fórmulas. El comprobador ahora espera la inicialización y el fin de carga, y toma una lectura conjunta del contenido; vuelve a esperar si empieza otra actualización entre ambas comprobaciones. El recorrido completo pasó después del ajuste. El motor LaTeX de la web no se modifica.

## Límites y siguiente fase

El tema conserva estado parcial por la revisión global con lectores de pantalla y pronunciación matemática. La navegación con teclado y texto ampliado no certifica accesibilidad completa. Las fases de voz, traducción, administración central, cuentas futuras y biblioteca LaTeX/PDF continúan pendientes.

Siguiente: **programación lineal a partir de los HTML originales**, comenzando por presentación e inecuaciones. Leer completos los archivos de origen, conservar todo contenido válido, documentar las correcciones y señalar apartados sin fuente. No ampliar contenido para cumplir cuotas. [Criterio y rutas originales](criterio-reutilizacion-html-estadistica-pl-inferencia.md).

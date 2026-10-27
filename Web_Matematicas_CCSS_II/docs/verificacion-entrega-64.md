# Verificación · Entrega 64

Fecha: 11 de octubre de 2026.

## Resultado

[5.10. Sistemas homogéneos](../libro/temas/05-sistemas-de-ecuaciones/10-sistemas-homogeneos.html): teoría, seis ejemplos, práctica contextual, explorador, seis preguntas y seis tarjetas.

Total: **57 lecciones, 312 preguntas base, 295 tarjetas y trece widgets**. Tema 5: 10/11 epígrafes, bancos 60/60. Las variantes no se suman al banco fijo.

## Alcance y límites

Editor de dos o tres ecuaciones e incógnitas con coeficientes enteros de −9 a 9. B permanece nulo. Ocho casos iniciales, variantes reproducibles y detalle de reducción por Gauss. Familias con fracciones exactas y de cero a tres variables libres.

Los parámetros seleccionan ejemplos enteros de −5 a 5; no restringen la familia real. Controles para la solución trivial y una no trivial cuando existe. Se sustituye el vector elegido en todas las ecuaciones. Cambiar A o sus dimensiones reinicia los parámetros a cero. Las entradas inválidas conservan el último valor válido.

Estado de actividad en memoria y preferencias de lectura compartidas. Diseño provisional y servicio de LaTeX conservados. El tema 5 sigue parcial: resta 5.11 y las tareas de repaso y juegos.

## Verificaciones

- **250 pruebas automáticas superadas**, sin fallos ni omisiones.
- 1.539 matrices exhaustivas y 4.000 variantes reproducibles en cuatro dimensiones. Rangos contrastados con menores independientes; direcciones y soluciones comprobadas mediante aritmética racional con enteros grandes. La identidad en las coordenadas libres y el número n−r de direcciones verifican que las familias son completas.
- Comprobadas solución trivial, parámetros positivos/negativos/cero, fracciones, conservación de la columna B nula, ocho casos y sistema sin restricciones. La práctica presupuestaria verifica conservación del total y el intervalo [−20,5].
- Validación de matrices y parámetros, límites de entrada, copias independientes y catálogo 312/295 sin identificadores duplicados.
- Navegador: ocho casos, B fijo, selección de soluciones triviales y no triviales, parámetros editables y recuperación de entradas inválidas. Cambios SCD/SCI y de dimensiones reinician los parámetros sin resultados antiguos; cuatro combinaciones de dimensiones en el generador.
- Test completado con 5/6 aciertos iniciales, pista y reintento; seis tarjetas. Teclado, conservación de parámetros y respuesta seleccionada al cambiar preferencias, y recarga sin historial personal.
- Móvil de 320 px y texto al 200 %, contraste y resaltado. Ajustados los encabezados para evitar división letra a letra; repetido el recorrido tras el ajuste. Sin desbordamiento horizontal global; matrices y fórmulas anchas mantienen desplazamiento local.
- Sin errores de JavaScript, HTTP o MathJax durante el recorrido. Cabecera, pie, índice 10/11, bancos t05 60/60 y navegación en subcarpeta comprobados.
- Capturas revisadas: `../../tmp/homogeneos-escritorio.png`, `../../tmp/homogeneos-movil.png` y detalle de encabezados `../../tmp/homogeneos-movil-detalle.png`. La revisión con lectores de pantalla y de pronunciación matemática sigue pendiente.
- Superada la regresión en navegador de Cramer (5.9).
- 171 HTML y cuatro documentos Markdown revisados: cero errores de enlaces, fragmentos o identificadores.

## Siguiente contenido

5.11. Discusión de sistemas con parámetros. Continúan pendientes lectores de pantalla, pronunciación matemática, PDF, administración central, traducción, voz y cuentas futuras. Se mantiene la reutilización de todos los HTML iniciales para programación lineal y bloques estadísticos.

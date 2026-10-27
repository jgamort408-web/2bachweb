# Verificación · Entrega 63

Fecha: 10 de octubre de 2026.

## Resultado

[5.9. Regla de Cramer](../libro/temas/05-sistemas-de-ecuaciones/09-resolucion-de-sistemas-regla-de-cramer.html): teoría, seis ejemplos, práctica, explorador, seis preguntas y seis tarjetas.

Total: **56 lecciones, 306 preguntas base, 289 tarjetas y trece widgets**. Tema 5: 9/11 epígrafes, bancos 54/54. Las variantes se cuentan aparte del banco fijo.

## Alcance y límites

Editor de sistemas cuadrados de orden 2 o 3, entradas enteras entre −9 y 9. Ocho casos iniciales y variantes reproducibles SCD/SCI/SI. Cada matriz auxiliar parte de A y sustituye solo una columna por B. La salida muestra los determinantes y su desarrollo por cofactores, cocientes exactos y sustitución en todas las ecuaciones originales.

Si Δ=0 no se calculan cocientes ni solución; se comparan rangos. Se incluye un sistema incompatible con todos los determinantes nulos para evitar interpretar 0/0 como solución o como garantía de SCI. No se parametrizan los casos singulares; se enlaza Gauss. La práctica con B=23 se desarrolla en el texto.

Cambiar dimensiones conserva las entradas comunes y B. Entradas inválidas conservan el último valor válido. Estado solo en memoria; preferencias de lectura compartidas. Diseño provisional y servicio de LaTeX conservados.

## Verificaciones

- **245 pruebas automáticas superadas**, sin fallos ni omisiones.
- 729 sistemas exhaustivos y 6.000 variantes de órdenes 2 y 3: determinantes contrastados por permutaciones (Leibniz), columnas sustituidas y cofactores comprobados independientemente, clasificación por eliminación y sustitución exacta con enteros grandes.
- Verificados ocho casos, denominadores negativos, fracciones, una coordenada cero, B nulo, cambios de B y casos singulares. El contraejemplo SI con todos los determinantes nulos está comprobado, junto con la misma A y B=0 (SCI). Validación, límites, copias independientes y catálogo 306/289 sin duplicados.
- Navegador: ocho casos, detalle de los determinantes, edición y recuperación de entradas inválidas, órdenes 2 y 3 conservando B, seis combinaciones de tamaño/tipo en las variantes y transiciones entre SCD/SCI/SI sin soluciones antiguas.
- Test completado con 5/6 aciertos iniciales, reintento y pista; seis tarjetas. Comprobados teclado, mantenimiento del sistema y de la respuesta seleccionada al cambiar preferencias y recarga sin historial personal.
- Móvil de 320 px y texto al 200 %, contraste y resaltado: sin desbordamiento horizontal global. Las fórmulas anchas mantienen desplazamiento local. Sin errores de JavaScript, HTTP o MathJax durante el recorrido.
- Capturas revisadas visualmente: `../../tmp/cramer-escritorio.png` y `../../tmp/cramer-movil.png`. La revisión con lectores de pantalla y de pronunciación matemática sigue pendiente.
- Cabecera y pie, índice 9/11, bancos del tema 5 de 54 preguntas y 54 tarjetas y navegación en subcarpeta comprobados.
- Superada la regresión en navegador del método de Gauss (5.8).
- Corregido el enlace al repaso de determinantes (4.6). Revisión posterior de 171 HTML y cuatro documentos Markdown: cero errores de enlaces, fragmentos o identificadores.

## Siguiente contenido

5.10. Sistemas homogéneos. Tema 5 parcial. Siguen pendientes la revisión con lectores de pantalla y pronunciación matemática, PDF, administración central, traducción, voz y cuentas futuras. Se mantiene la reutilización de todos los HTML iniciales para programación lineal y bloques estadísticos.

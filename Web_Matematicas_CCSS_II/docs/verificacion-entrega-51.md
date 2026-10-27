# Verificación · Entrega 51

Fecha: 8 de octubre de 2026.

## Resultado

Disponible [Matrix Ops](../laboratorios/juegos/t04-a-matrix-ops.html) y su [widget independiente](../widgets/games/t04-a-matrix-ops/index.html). Ocho retos, dieciséis decisiones, dos intentos por paso, pistas y resumen desplegable con soluciones. El curso dispone de once widgets; los bancos se mantienen en 252 preguntas y 235 tarjetas, 72/72 en t04.

## Mecánica y límites

- Clasificación variable (identidad, nula cuadrada, diagonal no escalar o rectangular), seguida de escala.
- Suma 2×3, resta 2×2 y escala 2×3.
- Productos 2×3 por 3×2 y en orden inverso, con resultados 2×2 y 3×3.
- Producto incompatible 2×3 por 2×2: decisión y justificación.
- Potencias de matrices 2×2 con exponente 2 o 3.

Entradas enteras −3..3, escalares −3, −2, 2 o 3. La clasificación diagonal no escalar utiliza entradas diagonales de signos distintos. Las sesiones cambian números y orden; no se garantiza que todas las variantes sean diferentes de sesiones anteriores.

Los distractores de cálculo modifican una única casilla y se señala esa posición al corregir. Se muestran las matrices solución; en operaciones y productos hay un ejemplo del cálculo de (1,1), y en potencias se muestra P² y, cuando corresponde, P³. No se genera un desarrollo detallado de cada casilla.

La selección con teclado sustituye el arrastre previsto en la fuente. No se incluye el reto opcional de cinco segundos. Máximo de 1600 puntos: 100 al primer intento, 50 al segundo y 0 tras dos errores. Las pistas no restan y solo cuentan una vez por paso. El paso siguiente permanece bloqueado hasta resolver o revelar el actual.

Estado y puntuación solo en memoria; la recarga los elimina. Las preferencias de lectura son las compartidas. Resumen con ocho soluciones desplegables para facilitar su lectura dentro del iframe. Diseño provisional y servicio matemático conservados.

## Pruebas matemáticas y de sesión

**190 pruebas acumuladas aprobadas.** Las cinco del juego se volvieron a ejecutar tras ampliar la clasificación a cuatro tipos.

- 1000 semillas, 8000 retos y 16000 decisiones: cobertura de las ocho familias, cuatro tipos y cálculos contrastados con operaciones independientes.
- Cuatro opciones distintas por paso y una única respuesta correcta; generación reproducible.
- Sesión perfecta: 1600 puntos, dieciséis pasos y bloqueo de doble puntuación.
- Sesión con errores, pista repetida y soluciones reveladas: 1400 puntos y trece pasos al primer intento.
- Rechazo de opciones desconocidas, retos de otro índice y respuestas después del cierre.
- Bancos fijos sin incrementos por variantes.

## Navegador y presentación

Recorrido de dos sesiones y 32 decisiones, con resultados 1400/1600 y 1600/1600. Se verifican respuesta vacía, pistas, reintentos, revelación, ocho soluciones, avance bloqueado y nueva semilla.

Teclado, fórmulas, móvil de 320 px con texto al 200 %, contraste, resaltado y conservación de la opción seleccionada al cambiar preferencias. Recarga con cero puntos y ninguna selección. Página independiente e inserción en iframe, también bajo una subcarpeta; sincronización de preferencias, ajuste de altura, cabecera y pie.

Capturas revisadas: `../../tmp/matrix-ops-escritorio.png` y `../../tmp/matrix-ops-movil.png`. Las fórmulas anchas se desplazan dentro de su región sin desbordar la página. La revisión con lectores de pantalla y pronunciación matemática sigue pendiente.

Regresión del repaso del tema 4 aprobada: cuatro bloques, doce lecciones y retorno, selección de doce preguntas y bancos 72/72.

## Revisión estática

Revisados los 171 HTML y los enlaces de README, auditoría, procedencia y esta verificación: sin enlaces rotos, fragmentos inexistentes ni identificadores duplicados. Las pruebas de navegador no registraron errores de página, recursos HTTP fallidos ni errores de MathJax.

## Siguiente entrega

**La cámara del determinante**, segundo widget del tema 4. Después quedan Redes y adyacencia y su recorrido conjunto. El tema permanece parcial.

PDF, administración central, voz, traducción y cuentas continúan en sus fases globales. Se mantiene la instrucción de reutilizar los HTML originales de programación lineal y bloques estadísticos, dejando sus carencias señaladas.

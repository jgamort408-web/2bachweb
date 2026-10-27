# Verificación · Entrega 52

Fecha: 8 de octubre de 2026.

## Resultado

Disponible [La cámara del determinante](../laboratorios/juegos/t04-b-la-camara-del-determinante.html) y su [widget independiente](../widgets/games/t04-b-la-camara-del-determinante/index.html). Seis salas, dieciocho cerraduras, mapa de avance y resumen con soluciones desplegables.

El curso dispone de doce widgets. Se mantienen 47 lecciones, 252 preguntas y 235 tarjetas; en t04, 72/72. Los retos generados no incrementan estos bancos.

## Salas y límites

1. **Umbral de los signos:** determinante 2×2 no nulo, invertibilidad y rango.
2. **Sala triangular:** determinante 3×3, intercambio de filas y escala de toda la matriz. La última operación parte de T, no de la matriz intercambiada.
3. **Filas dependientes:** determinante cero, ausencia de inversa y rango 2 certificado con un menor no nulo.
4. **Cadena de llaves:** operaciones sucesivas; intercambio, escala de una fila y suma de un múltiplo de otra.
5. **Parámetro:** fórmula del determinante, único valor singular y rango en ese valor.
6. **Cámara final:** determinante, existencia de inversa y entrada (1,2) mediante el cofactor C₂₁. C₁₂ es cero y no sirve para esa posición.

El orden de las salas se conserva; cambian los números y el orden de las opciones. La cámara final siempre es invertible y su respuesta es una fracción no entera, reducida y con denominador positivo. Se separan las situaciones singulares en otras salas. No se calcula toda la inversa ni se admite entrada libre: se elige entre cuatro opciones.

Cada cerradura permite dos intentos: 100 puntos al primero, 50 al segundo y 0 tras dos errores. Máximo 1800 puntos. Las pistas no penalizan y solo se cuentan una vez por cerradura. El avance se bloquea hasta resolver o revelar. Las salas completadas con alguna solución revelada quedan identificadas en el mapa.

No hay reloj, cuentas ni guardado de respuestas. Recargar reinicia la partida; solo persisten las preferencias compartidas. Diseño provisional y motor de fórmulas conservados.

## Matemáticas y sesión

Cinco nuevas pruebas aprobadas:

- 1000 semillas: 6000 salas y 18000 decisiones, con opciones distintas y una única respuesta correcta.
- Determinantes contrastados con la fórmula por permutaciones, operaciones de filas ejecutadas sobre una matriz de referencia e inversa contrastada con Gauss-Jordan.
- Rango, dependencia y parámetro: se evalúan once valores por sesión y se separa el valor singular. La explicación da la justificación algebraica; el muestreo no sustituye la prueba.
- Cámara final: fracciones exactas y comprobación de que las entradas (1,2) y (2,1) de la inversa son distintas.
- Sesión perfecta de 1800 puntos y sesión asistida de 1600: dieciocho resultados, pistas únicas, estado inmutable y bloqueo de doble puntuación.
- Opciones desconocidas, otra sala y respuestas al finalizar no alteran el estado.
- Banco fijo sin incremento por variantes.

## Navegador y presentación

Dos partidas completas, 36 decisiones: 1600/1800 con quince aciertos al primer intento y 1800/1800 con dieciocho. Respuesta vacía, reintentos, pistas, revelación, nueva semilla, seis soluciones y mapa verificados.

La última llave muestra fracciones y el cálculo del cofactor traspuesto sin errores de MathJax. Uso con teclado, móvil de 320 px y texto al 200 %, contraste, resaltado y conservación de la selección al cambiar preferencias. Recarga sin puntos ni selección.

Widget independiente e insertado, sincronización de preferencias, altura del iframe, subcarpeta, cabecera y pie. Enlaces desde libro y laboratorios verificados. Capturas revisadas: `../../tmp/camara-determinante-escritorio.png` y `../../tmp/camara-determinante-movil.png`.

Regresiones de Matrix Ops y repaso de matrices aprobadas. Queda pendiente la auditoría global con lectores de pantalla y pronunciación matemática.

## Verificación acumulada y enlaces

195 pruebas acumuladas aprobadas, sin fallos ni pruebas omitidas. Revisión estática de 171 HTML y cuatro documentos (README, esta entrega, auditoría y procedencia): sin enlaces rotos, fragmentos inexistentes ni identificadores duplicados.

## Siguiente entrega

**Redes y adyacencia**, tercer widget del tema 4. Después se revisará el recorrido conjunto de sus juegos. El tema sigue parcial.

PDF, administración central, traducción, voz y extensión futura de cuentas permanecen en sus fases globales. Para programación lineal y bloques estadísticos se mantiene la reutilización de los HTML originales, con carencias señaladas.

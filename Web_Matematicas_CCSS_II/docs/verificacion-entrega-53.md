# Verificación · Entrega 53

Fecha: 8 de octubre de 2026.

## Resultado

Disponible [Redes y adyacencia](../laboratorios/juegos/t04-c-redes-y-adyacencia.html) y su [widget independiente](../widgets/games/t04-c-redes-y-adyacencia/index.html). Seis retos generados, edición por nodos o tabla, pistas y resumen con seis soluciones.

El curso dispone de trece widgets. Se mantienen 47 lecciones, 252 preguntas y 235 tarjetas; en t04, 72/72. Las variantes se cuentan por separado.

## Secuencia y límites

- Retos 1–2: redes no dirigidas de tres vértices.
- Retos 3–4: redes dirigidas de cuatro vértices, con al menos un arco sin vuelta.
- Retos 5–6: redes no dirigidas de cuatro vértices, con al menos uno aislado en posición variable.
- Los impares piden completar la matriz desde un grafo; los pares, construir el grafo desde una matriz.
- Las redes se generan independientemente. Las variantes pueden repetirse; no se promete una red siempre diferente.
- Entradas binarias y diagonal fija en cero. No hay lazos, pesos ni conexiones múltiples.
- Un cero indica ausencia de conexión directa, no ausencia de recorridos de mayor longitud.

En el modo matriz se editan todas las entradas fuera de la diagonal para trabajar también la simetría. En el modo grafo, cada arista no dirigida actualiza ambos sentidos; las flechas se editan independientemente. Los dos sentidos de una pareja dirigida se dibujan con curvas separadas. Se ofrece una lista textual de las conexiones.

Mover nodos con arrastre o flechas solo cambia su posición. Seleccionar dos nodos añade o retira una conexión; Enter/Espacio y las casillas de la tabla ofrecen alternativas. Escape cancela la selección de origen. No se necesita arrastrar para responder.

Dos intentos: 100 puntos al primero, 50 al segundo, 0 tras dos errores y revelación. Máximo 600 puntos. La corrección cuenta entradas distintas (una arista no dirigida puede afectar dos entradas). Las pistas no penalizan y solo se cuentan una vez por reto. Una matriz completamente nula puede ser una respuesta válida. Tras dos errores se conserva la respuesta para compararla con la solución y se permite continuar.

No hay reloj, cuentas ni persistencia personal. Recargar reinicia las respuestas y puntos; solo persisten las preferencias de lectura. Diseño provisional y motor matemático compartido conservados.

## Pruebas matemáticas y de estado

Cinco pruebas nuevas en `tests/networks-game.test.mjs`:

- 1000 semillas/6000 redes: tamaño, orientación, ausencia de lazos, simetría y aislados; reconstrucción independiente desde las listas de conexiones.
- Se detectan redes nulas, las cuatro posiciones del aislado y más de 900 sesiones distintas; generación reproducible.
- Sesión perfecta de 600 puntos, seis resultados, avance controlado y bloqueo de doble puntuación.
- Sesión asistida de 450 puntos: un reto revelado, otro al segundo intento, cuatro al primero y una pista contada una sola vez.
- Respuestas copiadas sin compartir estado; entradas inválidas, otra ronda, flechas traspuestas y simetría incorrecta.
- Catálogo fijo sin incremento por variantes.

**200 pruebas acumuladas aprobadas**, sin fallos ni pruebas omitidas.

## Navegador y presentación

Dos partidas completas/12 redes: 450 y 600 puntos; pistas, reintentos, seis soluciones desplegables, nueva semilla y bloqueo de doble puntuación. Se comprueban ambos modos, conexión y retirada de aristas, flechas independientes y simetría.

Se verifica teclado, arrastre sin cambio de conexiones, cancelación, activación mediante clic y fórmulas sin errores. Móvil de 320 px con texto al 200 %, contraste, resaltado y conservación de la respuesta al cambiar preferencias. Las tablas anchas tienen desplazamiento horizontal propio y nombre accesible; la página no desborda.

Widget independiente e insertado, sincronización de preferencias, altura del iframe, carga desde subcarpeta, cabecera/pie y enlaces desde libro y laboratorios. Recarga sin puntos ni respuestas. Capturas revisadas: `../../tmp/redes-adyacencia-escritorio.png` y `../../tmp/redes-adyacencia-movil.png`.

Regresiones de la lección de grafos y de La cámara del determinante aprobadas. Pendiente la auditoría global con lectores de pantalla y pronunciación matemática.

## Enlaces

171 HTML y cuatro documentos revisados (README, esta entrega, auditoría y procedencia): sin enlaces rotos, fragmentos inexistentes ni identificadores duplicados.

## Siguiente entrega

Recorrido conjunto de los tres juegos del tema 4, su orientación y enlaces de refuerzo. El tema sigue parcial hasta completar esa revisión y la accesibilidad global.

PDF, administración central, traducción, voz y cuentas futuras permanecen en sus fases globales. Se mantiene el criterio de reutilizar todos los HTML originales de programación lineal y bloques estadísticos, dejando las carencias señaladas.

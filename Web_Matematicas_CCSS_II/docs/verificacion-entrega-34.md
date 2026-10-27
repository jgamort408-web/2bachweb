# Verificación · Entrega 34

Fecha de cierre: 5 de octubre de 2026.

## Resultado y archivos

[Parejas de primitivas](../laboratorios/juegos/t03-a-parejas-de-primitivas.html) disponible como página con cabecera y pie comunes y como [widget independiente](../widgets/games/t03-a-parejas-de-primitivas/index.html). Dos tableros de cinco integrandos y siete opciones cada uno; emparejamiento en cualquier orden, sin exigir arrastre ni velocidad.

Archivos desde la raíz web:

- `widgets/games/t03-a-parejas-de-primitivas/generator.js`: variantes y transiciones puras de puntuación.
- `widget.js`, `index.html` y `style.css` en esa misma carpeta: interacción, instrucciones y estilos locales.
- `laboratorios/juegos/t03-a-parejas-de-primitivas.html`: inserción y enlaces de refuerzo.
- Portada, Laboratorios, índice de t03 y final de 3.8: ruta hacia el juego.
- `tests/primitive-pairs.test.mjs` y `tests/primitive-pairs-34-browser.cjs`: verificación.

Diseño provisional y servicio compartido de MathJax conservados. Totales del curso sin cambios: **35 lecciones, 180 preguntas base y 163 tarjetas**. Ocho widgets desarrollados. El tema 3 sigue parcial.

## Contenido matemático y reglas

Diez familias: potencia, constante, exponencial simple, recíproca, coseno, potencia compuesta, logaritmo compuesto, exponencial con exponente negativo, seno y raíz cuadrada. Los parámetros enteros positivos y los intervalos se muestran con cada integrando. Logaritmos y raíz se trabajan en x>0; las funciones trigonométricas usan radianes.

Cada tablero tiene cinco familias completas, una primitiva particular sin C y un distractor con un factor incorrecto. Omitir C no hace falsa la derivada: la explicación diferencia una primitiva particular de la familia solicitada. Se comprueba F′=f en el intervalo; los intervalos seleccionados no se anuncian como dominios máximos.

- Primer acierto: 100 puntos; segundo intento: 50; dos errores: solución mostrada y 0.
- Cada cinco aciertos consecutivos al primer intento: bonus de 100; cualquier error corta la racha. Máximo 1200.
- Pistas sin penalización, contabilizadas una vez por pareja.
- Pareja terminada y familia asignada bloqueadas; no vuelven a puntuar.
- Resumen de diez soluciones y nueva sesión. Sin almacenamiento de respuestas o estadísticas.

## Pruebas matemáticas y de estado

**113 pruebas acumuladas superadas**, incluidas cuatro nuevas:

- 1000 semillas: 10.000 integrandos. Derivadas por diferencias finitas en cinco puntos positivos para contrastar primitivas, opciones y distractores; una única familia completa coincidente en cada tablero.
- Generación reproducible por semilla y variedad de parámetros/orden.
- Sesión perfecta: 1200 puntos, diez primeros aciertos y dos bonus.
- Pista repetida, opción sin C, segundo intento, dos errores, opciones consumidas y bloqueo de entradas inválidas o de otro tablero.
- Inmutabilidad de las transiciones, avance solo al completar el tablero y prevención de doble puntuación.

Las comprobaciones numéricas complementan la revisión de las diez reglas de derivación; no se presentan como una demostración general por muestreo.

## Navegador y lectura

`tests/primitive-pairs-34-browser.cjs` superado:

- Dos partidas completas: 950/1200 con errores y pista, y 1200/1200 sin errores.
- Mensajes, solución tras dos errores, referencias entre ambas columnas, opciones desactivadas, resumen de diez soluciones y reinicio.
- Selección mediante controles nativos y teclado.
- Doce fórmulas por tablero y diez en el resumen, sin errores MathJax, delimitadores sin procesar ni errores JavaScript/HTTP.
- Móvil de 320 px con texto al 200 %, contraste y resaltado, conservando selección. Sin desbordamiento global; fórmulas anchas con desplazamiento local.
- Recarga sin respuestas/puntuación anteriores; preferencias de apariencia conservadas.
- Inserción con iframe, propagación de preferencias, corrección dentro del iframe y funcionamiento en subcarpeta.
- Enlace desde la ruta de juegos del tema hasta la página anfitriona.

Capturas inspeccionadas: `../../tmp/parejas-primitivas-escritorio.png` y `../../tmp/parejas-primitivas-movil.png`. La segunda muestra el primer grupo de selección con texto ampliado; no documenta por sí sola toda la página.

Revisión estática: **171 HTML**, sin referencias locales rotas, fragmentos ausentes ni IDs duplicados. Enlaces de este documento, README y auditoría de t03 comprobados.

## Límites y siguiente paso

No se modifica el motor matemático, por lo que no se repiten aquí los ensayos previos de caída y recuperación del motor. El control por teclado y el texto ampliado no certifican la experiencia completa con lectores de pantalla; esa revisión sigue pendiente.

Exámenes PDF, administración central, traducción, voz y cuentas futuras permanecen en sus fases. No se cambian materiales originales.

Siguiente entrega: **Método correcto (t03-b)**. Después, Área por tramos y revisión conjunta de la ruta de los tres juegos.

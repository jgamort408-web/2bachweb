# Verificación · Entrega 22

Fecha: 29 de septiembre de 2026.

## Resultado

Construye la gráfica está desarrollado en `widgets/games/t02-a-construye-la-grafica/` e insertado en `laboratorios/juegos/t02-a-construye-la-grafica.html`. Se enlaza desde el índice t02 y Laboratorios. Se aprovechan páginas ya existentes: siguen siendo 171 HTML. No se cambia el diseño provisional común.

Fuente: Laboratorio 2A del plan original. Se elige su modalidad de selección entre cuatro gráficas; la construcción arrastrando puntos no forma parte de esta entrega.

## Mecánica y contenido

Seis retos con datos nuevos: dos polinomios cuadráticos, dos racionales y dos exponenciales. Cada ficha da dominio, cortes, asíntotas, signo de la derivada/monotonía y extremos. Se muestran cuatro opciones con ejes y ventana comunes (x entre −6 y 6; y entre −8 y 8). Las curvas se recortan a la ventana, las asíntotas son discontinuas y las dos ramas racionales nunca se unen a través del polo. Los vértices cuadráticos llevan marcador.

Cada gráfica tiene título y descripción SVG, además de descripción textual desplegable. Se puede seleccionar por teclado. Los cortes irracionales se presentan como aproximaciones con tres decimales; la función original y las comprobaciones conservan precisión completa. Las descripciones incluyen propiedades fuera de la ventana visible.

Un error resalta un dato incompatible de la ficha y explica la diferencia. Hay pista y dos intentos: 100 puntos al primero, 50 al segundo y 0 tras dos errores. La pista no penaliza, pero su uso se cuenta. La solución muestra la letra correcta y una expresión LaTeX. El resumen muestra puntos, aciertos iniciales y retos con pistas; reiniciar genera otros datos. Las respuestas y puntuaciones se conservan exclusivamente en memoria.

## Organización para mantenimiento

- `generator.js`: generación reproducible a partir de semilla, valor/derivada/raíces, ficha, distractores y transición de intentos/puntos. No depende del DOM.
- `graph.js`: muestras por ramas y construcción de SVG. Solo `drawGraph` necesita el DOM.
- `widget.js`: ciclo de sesión, controles, foco, corrección y procesamiento de fórmulas mediante `updateMath`.
- `index.html` y `style.css`: estructura semántica y disposición mínima de cuatro opciones; dos columnas en escritorio y una en pantalla estrecha.
- Runtime compartido: MathJax local, preferencias de lectura y comunicación con iframe. No se modifica en esta entrega.
- `config/widgets.json`: ya contenía la entrada. Inserción con `data-widget="t02-a-construye-la-grafica"` y `assets/js/learning/embed.js` respetando las rutas relativas del anfitrión.
- `config/editorial.json`: juego revisado; t02 continúa parcial. El estado editorial no es control administrativo de acceso.

## Verificación

- **65 pruebas acumuladas superadas.**
- **1000 semillas:** 6000 retos y 24000 opciones. Reproducibilidad, variedad dentro de la sesión, cuatro posiciones posibles de la respuesta, una única opción compatible, raíces válidas y ausencia de cifras indefinidas.
- Derivadas contrastadas con diferencias numéricas sobre las funciones originales; extremos y límites asintóticos comprobados. El cero en k de algunos distractores tiene tratamiento explícito.
- Muestreo SVG comprobado: dos ramas separadas en racionales y valores finitos.
- Transiciones: primer acierto, segundo intento, dos errores, pista sin descuento y rechazo de doble puntuación.
- **Prueba en Chrome:** 12 retos/48 gráficas, teclado, descripciones, selección vacía, dato incompatible, pista, reintento, dos fallos, puntuaciones 450/600 y 600/600, eventos duplicados, nueva sesión y fórmulas sin errores ni delimitadores pendientes.
- Móvil 320 px con texto al 200 %, contraste y resaltado: sin desbordamiento de página, respuesta conservada. Las propiedades pueden leerse en la descripción textual sin depender del tamaño del dibujo.
- Anfitrión: preferencias transmitidas al iframe sin perder selección; corrección LaTeX dentro de él. Inserción y corrección también probadas bajo subcarpeta.
- **171 HTML sin rutas/fragmentos locales rotos ni IDs duplicados.**
- Capturas: `../../tmp/construye-grafica-escritorio.png` y `../../tmp/construye-grafica-movil.png`.

La primera aserción de bloqueo del navegador consultaba `isDisabled` sobre el fieldset; se corrigió para comprobar el control de respuesta afectado por ese fieldset. La ejecución final pasa. No fue necesario cambiar la lógica de bloqueo del widget.

## Límites

No hay temporizador, cuentas ni historial persistente. Continúan pendientes la revisión con lectores de pantalla y pronunciación matemática, traducción, voz, administración central y PDF. Esta entrega no repite los ensayos de recuperación de red del motor MathJax, que no se modifica. Las variantes del juego se cuentan aparte: el curso mantiene 27 lecciones, 120 preguntas base y 115 tarjetas.

Siguiente: Transforma la función (t02-b), después Optimiza (t02-c).

## Corrección posterior · Entrega 23

Se detectó que la cadena de la solución eliminaba los delimitadores LaTeX de JavaScript antes del procesamiento. La prueba anterior de ausencia de errores/delimitadores pendientes no garantizaba que hubiera una fórmula renderizada. Se corrigió con `String.raw` y se exige ahora un contenedor MathJax en cada solución. La prueba completa de 12 retos vuelve a pasar. La comprobación de renderizado de la entrega 23 sustituye esa parte insuficiente de la validación inicial.

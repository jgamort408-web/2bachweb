# Entrega 09: Tangente Sprint

Fecha: 27 de septiembre de 2026.

## Alcance y procedencia

Se desarrolla el laboratorio 1D de Planificacion_Interactiva_2Bach_CC_Sociales/01_Laboratorios_Minijuegos_2Bach_CC_Sociales.md, en la carpeta superior al proyecto. La explicación matemática corresponde al epígrafe 1.13 del libro. Los polinomios y retos generados son elaboración propia; no se atribuyen a un examen.

Cada sesión tiene seis retos:

1. Tangente con pendiente no nula.
2. Tangente horizontal.
3. Tangente a un polinomio cúbico.
4. Otra tangente a una parábola.
5. Normal con pendiente no nula, que puede ser fraccionaria.
6. Normal vertical cuando la tangente es horizontal.

Cada reto pide valor y derivada en el punto, ecuación y colocación gráfica. La ecuación se introduce mediante sus coeficientes, incluyendo la alternativa x=c; no hace falta interpretar expresiones escritas libremente. Se aceptan fracciones equivalentes y decimales con punto o coma.

## Archivos

- laboratorios/juegos/t01-d-tangente-sprint.html: página anfitriona, con cabecera y pie compartidos.
- widgets/games/t01-d-tangente-sprint/index.html: actividad independiente.
- generator.js: generador reproducible, evaluación de polinomios, formato matemático y validación de números y rectas.
- widget.js: fases, puntuación, reloj, gráfico, arrastre y teclado.
- style.css: distribución neutra de los controles, sin cambiar fuentes ni el diseño general.
- tests/tangent-sprint.test.mjs: comprobaciones matemáticas, incluida en npm test.
- tests/tangent-09-browser.cjs: interacción y recuperación, mediante npm run test:tangent.

El widget figura en el catálogo, en Practicar y en el índice del tema. El motor LaTeX y la infraestructura compartida de inserción no se han modificado.

## Matemáticas y validación

El generador parte de k(x−a)^d + m(x−a) + v, con d=2 o d=3 y k=±1, y presenta el polinomio expandido. Así controla exactamente f(a)=v y f′(a)=m.

Para la tangente, la ordenada es v−ma. Para la normal con m distinto de cero, la pendiente es −1/m y se recalcula la ordenada. Si m=0, la normal es x=a. Los datos garantizan soluciones representables por los controles gráficos, que avanzan media unidad.

La comparación valida pendiente y ordenada, o coordenada de una vertical, con tolerancia absoluta de 10⁻⁸ para números introducidos. La corrección no depende de la cercanía visual de píxeles. No se usa eval.

La escala gráfica es igual en ambos ejes. El tirador circular cambia la posición; el cuadrado cambia la pendiente conservando como referencia el valor de la propuesta en x=a. Los rangos permiten hacer el mismo ajuste con teclado. Un punto negro permanece visible incluso cuando el tirador coincide con él.

## Tiempo y puntuación

La opción inicial es practicar sin reloj. El modo Sprint ofrece 45 segundos por reto y pausa manual; al ocultar la página, el reloj también se pausa y necesita reanudación explícita. Mientras está pausado, los controles del reto quedan deshabilitados.

El reloj espera a que la fórmula del enunciado se haya representado. Si falla la carga de MathJax, se mantienen los 45 segundos y los controles bloqueados hasta la recuperación. Se utilizan los reintentos y la recuperación manual del motor existente.

Al agotarse el tiempo, se conservan los campos escritos y los puntos ganados, se muestra la solución con su gráfica y se espera a que el alumno decida pasar al siguiente reto. No se inicia automáticamente una nueva cuenta atrás.

Puntuación: 100 por valor, 100 por pendiente, 150 por ecuación, 150 por ajuste y 100 por completar sin pista. Máximo: 600 por reto, 3600 por sesión. Cada logro puntúa una sola vez y los errores no restan. No se guardan respuestas ni historial entre sesiones.

## Verificación

| Prueba | Resultado |
|---|---|
| Pruebas matemáticas acumuladas | 19 pruebas superadas |
| Nuevo generador | 1000 semillas, 6000 retos; determinismo, valores y pendientes comprobados |
| Derivadas | Diferencias centrales de los polinomios expandidos con dos incrementos |
| Rectas | Paso por el punto, perpendicularidad de normales, tangente horizontal y normal vertical |
| Entradas | Fracciones equivalentes, signos y coma decimal; rechazo de blanco, división por cero y expresiones no admitidas |
| Partida sin reloj | Seis retos completados, una pista; resumen 3500/3600 y reinicio |
| Puntuación | Repetir respuestas parciales o comprobaciones finales no duplica puntos |
| Arrastre | Tiradores de posición e inclinación usados hasta alcanzar la tangente correcta |
| Teclado | Formularios con Enter; normal vertical ajustada con flechas |
| Reloj | Pausa durante un minuto simulado, reanudación, agotamiento y comienzo del siguiente reto |
| Sesión agotada | Seis rondas agotadas y resumen 0/3600; el paso entre rondas requiere acción del alumno |
| Fórmulas | Descarga bloqueada, conservación del tiempo y recuperación manual antes de habilitar el reto |
| Móvil y texto ampliado | Recorrido a 390 px; normal vertical a 320 px; tamaño base al 200 % en escritorio, sin desbordamiento horizontal del documento |
| Inserción | Formulario y gráfico dentro del anfitrión móvil con altura ajustada; anfitrión y widget bajo subcarpeta, con recursos locales |
| Enlaces | 171 HTML revisados sin enlaces locales ausentes, anclas inexistentes ni IDs duplicados |
| Revisión visual | Tangente ajustada en móvil y normal vertical en escritorio |

Las pruebas de navegador requieren Playwright y Chrome/Chromium; admiten TEST_URL, CHROME_PATH y SCREENSHOT_DIR. Las capturas se guardan en tmp, fuera del proyecto desplegable.

## Límites y siguiente trabajo

Esta entrega comprueba el flujo concreto de recuperación matemática del juego; no constituye una prueba de carga de GitHub Pages. La revisión de teclado, etiquetas, descripción del gráfico y ampliación de texto no sustituye una auditoría con lector de pantalla.

Las cifras editoriales se mantienen: 60 preguntas base y 61 tarjetas. Las variantes de los juegos no se suman a esos mínimos. Los PDF, cuentas, estadísticas persistentes, idiomas, voz y administración global siguen en sus fases del plan.

Los cuatro laboratorios del tema 1 tienen ya una versión funcional; Límite Express continúa parcial. La siguiente entrega debe completar su lectura gráfica, niveles y modalidades pendientes antes de la revisión global del tema.

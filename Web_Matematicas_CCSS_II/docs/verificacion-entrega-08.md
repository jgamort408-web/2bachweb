# Entrega 08: Derivada Detective

Fecha: 27 de septiembre de 2026.

## Contenido y procedencia

Se implementa el laboratorio 1C de Planificacion_Interactiva_2Bach_CC_Sociales/01_Laboratorios_Minijuegos_2Bach_CC_Sociales.md, situado en la carpeta superior al proyecto. Las reglas y sus condiciones se corresponden con las lecciones 1.11–1.17 ya desarrolladas.

Cada sesión contiene ocho casos y trece decisiones:

1. Potencia con factor constante: derivada y regla.
2. Producto de función afín y exponencial: derivada y regla principal, explicando también la composición interior.
3. Cociente de polinomios: derivada y regla, con dominio.
4. Potencia de función afín: derivada y regla de la cadena.
5. Valor absoluto trasladado: inexistencia de derivada en la esquina y comparación de laterales.
6. Desarrollo de cadena: primer paso erróneo.
7. Desarrollo de producto: primer paso erróneo.
8. Desarrollo de cociente: primer paso erróneo.

Los coeficientes son pequeños y se generan en cada sesión. En los tres últimos casos, el primer error puede ocupar cualquiera de los cuatro pasos; los resultados posteriores pueden arrastrarlo. Las alternativas incluyen errores docentes concretos: perder un factor, olvidar la derivada interior, multiplicar derivadas, derivar numerador y denominador por separado, cambiar el signo del cociente y olvidar el cuadrado del denominador.

Los enunciados y variantes son elaboración propia a partir de la planificación. No se han migrado ni corregido nuevos originales LaTeX ni generado PDF en esta entrega.

## Arquitectura

- Página anfitriona: laboratorios/juegos/t01-c-derivada-detective.html.
- Widget independiente: widgets/games/t01-c-derivada-detective/index.html.
- generator.js: datos, alternativas, explicaciones, modelos matemáticos y generación reproducible por semilla.
- widget.js: inicialización y conexión con el motor compartido de preguntas.
- style.css: distribución mínima que hereda la base compartida.
- assets/js/learning/quiz.js: admite una lista opcional de pasos. Las preguntas existentes conservan su funcionamiento.

No se utiliza eval para interpretar respuestas. Las opciones se corrigen por identificador y los modelos numéricos permiten comprobar equivalencias en las pruebas. MathJax representa las fórmulas y la cola existente gestiona sus actualizaciones.

## Mecánica y resultado de sesión

Sin temporizador. Cada decisión permite pista y un reintento; tras dos fallos se muestra la respuesta y su explicación. Después de elegir una derivada se pregunta por la regla utilizada. El resumen cuenta respuestas correctas al primer intento; consultar una pista no resta en esta modalidad. Las instrucciones lo indican expresamente.

No hay puntuación competitiva ni historial persistente. El resumen se limita a la sesión y al reiniciar se generan otros datos. No se activan cuentas, servicios externos ni seguimiento del alumnado.

## Comprobaciones ejecutadas

| Control | Resultado |
|---|---|
| Pruebas matemáticas acumuladas | 17 pruebas superadas |
| Generación reproducible | 1000 semillas: 8000 casos y 13.000 decisiones |
| Alternativas de derivada | 4000 preguntas contrastadas con diferencias centrales de las funciones originales en cinco puntos; una sola alternativa equivalente |
| Esquina del valor absoluto | 100 casos contrastados mediante cocientes incrementales a ambos lados |
| Errores procedurales | Tres familias y cuatro posiciones del primer error; revisión algebraica de las doce combinaciones |
| Navegador | Cuatro sesiones completas, 52 decisiones y doce desarrollos erróneos |
| Autocorrección | Vacío, error, pista, reintento, dos fallos con solución y reinicio; resumen 11/13 en sesión con dos fallos iniciales y 13/13 en las otras |
| Fórmulas | Sin merror en los recorridos, pasos y soluciones |
| Teclado y móvil | Activación con Enter; 320 y 390 px sin desbordamiento horizontal del documento |
| Texto ampliado | 1280 px con tamaño base al 200 %, sin desbordamiento horizontal |
| Inserción | Widget integrado en su anfitrión, también bajo /prueba-subcarpeta/ |
| Regresión | Repetida batería de entrega 07: repaso, continuidad e inserción de Límite Express |
| Inspección visual | Potencia en escritorio y desarrollo de cociente en móvil |

Pruebas mantenidas: tests/detective.test.mjs, incluida en npm test; tests/detective-08-browser.cjs mediante npm run test:detective. La prueba de navegador necesita Playwright y Chrome/Chromium y admite TEST_URL, CHROME_PATH y SCREENSHOT_DIR. Las capturas se guardan en tmp de la raíz de trabajo.

Se conservan el diseño provisional, las fuentes y el motor LaTeX. No se ha repetido la batería de fallos de descarga del motor, que no cambia. Las pruebas numéricas complementan la revisión algebraica; no sustituyen las hipótesis de las reglas. Falta una auditoría completa con lector de pantalla y la aplicación global de preferencias dentro de widgets.

El banco fijo sigue en 60 preguntas y 61 tarjetas: las decisiones generadas del juego no se suman a esos mínimos editoriales. El tema 1 sigue abierto por Tangente Sprint, la ampliación pendiente de Límite Express y la revisión global.

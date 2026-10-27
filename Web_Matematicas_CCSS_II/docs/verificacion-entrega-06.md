# Verificación de la entrega 06

Fecha: 17 de septiembre de 2026.

## Alcance terminado

- Epígrafes 1.16–1.18: cadena, continuidad de funciones derivables y L’Hôpital.
- Cinco derivadas del examen: 2(a), 2(b), 2(d), 2(e) y 2(f), con pasos y dominios.
- Límite 3(d) del examen resuelto mediante logaritmo y L’Hôpital; resultado 1.
- Justificación de la comparación de crecimiento de 1.6, aplicada a 3(b), con enlace desde la lección anterior.
- Comparador de cuatro casos en 0: cuadrado, valor absoluto, salto y valor aislado. Incluye gráfica, valor puntual, tabla de cocientes y diagnóstico.
- Nueve preguntas y nueve tarjetas nuevas. Acumulado: 18 lecciones, 54 preguntas, 56 tarjetas y siete exploradores.

Las 18 lecciones del tema 1 tienen contenido. El cierre global del tema sigue pendiente de auditoría y ampliación de sus actividades.

## Resultados

| Comprobación | Evidencia |
|---|---|
| Pruebas matemáticas | Doce pruebas superadas; incluyen las 10.000 preguntas procedurales y la estructura del catálogo |
| Cadena | Cinco derivadas del examen y una composición adicional contrastadas con diferencias centrales en 25 puntos del dominio |
| Comparador | 32 combinaciones de caso e incremento contrastadas con el cociente calculado desde la función original |
| Límite del examen | Evaluación estable con log1p y exponencial; acercamiento a 1 desde abajo para x=10, 100, 1000 y 10000 |
| Otros límites | Comprobación numérica de los límites con dos aplicaciones de L’Hôpital y del producto x ln x |
| HTML | 171 documentos sin enlaces locales rotos, anclas inexistentes ni IDs duplicados en la revisión general |
| Autocorrección | Tres lecciones con respuesta vacía, error, pista y reintento; resumen 2/3 al primer intento en cada sesión de prueba |
| Comparador en navegador | Cuatro casos, signos de pendientes, valor puntual y visibilidad del hueco comprobados |
| Precisión de la tabla | Con distancia 0,0001, el valor aislado produce pendientes 9999,9999 y −9999,9999; el salto, 10001 y 1 |
| Fórmulas | Sin errores matemáticos detectados; cambios de función con un solo contenedor de fórmula |
| Móvil y teclado | Tres lecciones a 390 px sin desbordamiento del documento; control de distancia operado con flechas |
| Texto ampliado | Comparador a 1280 px con tamaño base de texto al 200 %, sin desbordamiento del documento |
| Recorrido acumulado | Test 54/54 y navegación por las 56 tarjetas con sus respuestas |
| Subcarpeta | Tres lecciones bajo /curso/ sin errores de recursos o JavaScript; índice con 18 disponibles y ninguna lección pendiente en t01 |
| Inspección visual | Cadena con logaritmo y raíz; valor aislado en móvil; salto y solución de L’Hôpital en escritorio |
| Ampliación final | Justificación de crecimientos, desplegable y fórmulas comprobados en móvil después de añadir el enlace desde 1.6 |

## Pruebas mantenidas

- npm test incluye tests/chain-hopital.test.mjs junto a las pruebas matemáticas anteriores.
- npm run test:advanced ejecuta tests/lessons-06-browser.cjs; necesita Playwright y Chrome/Chromium.
- La revisión general de enlaces, las capturas y la simulación de subcarpeta se realizaron con scripts temporales.

## Condiciones y límites

L’Hôpital se presenta como una versión suficiente del teorema: aproximación lateral o al infinito, funciones derivables en el intervalo de aproximación, denominador y su derivada no nulos, forma indeterminada y existencia del límite del cociente de derivadas. Se distingue de la regla del cociente y se explican casos donde no es aplicable o no decide.

Las verificaciones numéricas complementan los desarrollos algebraicos; no sustituyen sus hipótesis. El diagnóstico del comparador procede de las expresiones conocidas, no de inferir continuidad a partir de unas pocas muestras.

Se conservan CSS, fuentes y servicio MathJax. No se repitió la batería de fallos de descarga y concurrencia porque el motor no cambia. El texto ampliado no equivale a una auditoría completa con lector de pantalla ni a una prueba de carga del alojamiento.

Los originales permanecen intactos y no se han compilado PDF. Faltan al menos seis preguntas base para el mínimo de 60 del tema, la auditoría de problemas y materiales y la finalización de los laboratorios. El resto del curso, idiomas, voz y administración siguen según el plan.

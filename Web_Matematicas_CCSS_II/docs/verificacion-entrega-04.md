# Verificación de la entrega 04

Fecha: 16 de septiembre de 2026.

## Alcance

- Epígrafes 1.10–1.12: continuidad, función derivada y derivadas laterales, con teoría, hipótesis, ejemplos, ayudas, preguntas autocorregidas y resumen.
- Pregunta 1(a) del examen local resuelta por cocientes incrementales: a=1, b=−2.
- Explorador de secantes para el cuadrado y el valor absoluto, con elección de punto y distancia, gráfica, tabla y descripción textual.
- Nueve preguntas y nueve tarjetas nuevas. Acumulado: 12 lecciones, 36 preguntas, 38 tarjetas y cinco exploradores.
- Límite Express conserva sus nueve familias; no se amplía en esta entrega.

## Comprobaciones

| Prueba | Evidencia |
|---|---|
| Matemáticas y bancos | Seis pruebas superadas: 10.000 preguntas procedurales, cobertura de 12 epígrafes y validación del banco, secantes, examen y coste marginal |
| Secantes | 84 combinaciones contrastadas con el cociente original, incluidos incrementos que cruzan la esquina y ambos signos de h |
| Examen 1(a) | Continuidad comprobada para varios valores de a con b=−2; pendientes coincidentes únicamente en a=1 entre los valores probados, junto con la resolución algebraica general de la lección |
| Coste | Derivada aproximada 7 €/unidad en q=50 e incremento exacto 7,02 € de 50 a 51 |
| HTML | 171 documentos sin enlaces locales rotos, anclas inexistentes ni IDs duplicados |
| Autocorrección | Respuesta vacía, error, pista y reintento comprobados en las tres lecciones; resultado 2/3 al primer intento en cada sesión de prueba |
| Explorador | Pendientes 3,9999 y 4,0001 para el cuadrado en 2; pendientes −1 y 1 y ausencia de tangente única para el valor absoluto en 0 |
| Fórmulas dinámicas | Cambio consecutivo entre funciones sin duplicación de contenedores ni errores matemáticos detectados |
| Test y tarjetas | Test completo 36/36; recorrido de las 38 tarjetas con sus respuestas |
| Móvil | Tres lecciones y actividades comprobadas a 390 px; corregido un desbordamiento de una explicación larga |
| Texto ampliado | Lección de derivada comprobada con tamaño base de texto al 200 % en ventana de 1280 px, sin desbordamiento del documento |
| Teclado | El control de distancia responde a las flechas y actualiza las pendientes |
| Subcarpeta | Tres lecciones bajo /curso/, recursos e índice sin errores; 12 disponibles y 6 pendientes en el tema 1 |
| Revisión visual | Explorador en móvil y escritorio, y solución del examen en escritorio; fórmula del explorador repartida en líneas para caber en móvil |

## Archivos de prueba

- tests/generators.test.mjs: generador y catálogo acumulado.
- tests/derivatives.test.mjs: secantes, ejemplo del examen y coste marginal.
- tests/lessons-04-browser.cjs: tres lecciones, explorador, autocorrección, fórmulas, test y tarjetas.
- npm test ejecuta las pruebas matemáticas; npm run test:derivatives ejecuta la prueba de navegador con Playwright y Chrome/Chromium disponibles.

La revisión de enlaces y la simulación de subcarpeta se realizaron además con scripts temporales.

## Conservación y límites

Los CSS, las fuentes y el servicio MathJax no se modifican. La separación editorial de los textos permanece disponible para el diseño posterior. Las ecuaciones largas del explorador se distribuyen en varias líneas usando LaTeX.

La ampliación de texto no sustituye una auditoría completa de zoom ni de lector de pantalla. Las pruebas de fallos de descarga y concurrencia de MathJax siguen documentadas en entregas anteriores; no se repitieron al no cambiar el motor. No se ha probado la capacidad del alojamiento público.

No se han modificado originales ni compilado PDF. El cierre del tema, el resto de widgets, los servicios de accesibilidad e idiomas y el panel administrativo siguen pendientes.

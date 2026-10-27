# Verificación de la entrega 05

Fecha: 17 de septiembre de 2026.

## Alcance terminado

- Epígrafes 1.13–1.15: tangente y normal, tabla de derivadas y reglas de derivación.
- Explorador de tangente y normal a la parábola, con cinco puntos, caso de normal vertical, escala idéntica en ambos ejes y alternativa textual.
- Apartados 1(b–c) del examen resueltos con los parámetros de 1(a), además de indicar el resultado con b libre.
- Apartado 2(c) del examen desarrollado mediante cociente y potencia compuesta.
- Nueve preguntas y nueve tarjetas nuevas. Acumulado: 15 lecciones, 45 preguntas, 47 tarjetas y seis exploradores.
- Límite Express mantiene nueve familias procedurales; esta entrega no añade nuevas familias al juego.

## Resultados

| Comprobación | Evidencia |
|---|---|
| Pruebas matemáticas | Nueve pruebas superadas, incluidas las 10.000 preguntas procedurales y el catálogo de 15 epígrafes |
| Tangente y normal | Cinco puntos contrastados con pendientes numéricas y perpendicularidad por producto escalar; la normal es vertical en a=0 |
| Examen 1(b–c) | Pendiente contrastada desde la rama original para cinco valores de b, incluido b=−1 (tangente horizontal) |
| Reglas y ejemplos | Nueve expresiones derivadas contrastadas con diferencias centrales de las funciones originales en 36 puntos |
| Examen 2(c) | Derivada simplificada contrastada; valor en 1 igual a 27/125 |
| HTML | 171 documentos sin enlaces locales rotos, anclas inexistentes ni IDs duplicados |
| Lecciones | Tres páginas y sus nueve preguntas comprobadas a 390 px, sin desbordamiento del documento |
| Corrección | Respuesta vacía, error, pista, reintento correcto y resultado 2/3 al primer intento comprobados por lección |
| Explorador | Cinco puntos, normal vertical y fórmulas sin duplicación; las fórmulas del explorador caben en móvil |
| Teclado | Selección del punto mediante teclado comprobada |
| Texto ampliado | Lección 1.13 a 1280 px con tamaño base de texto al 200 %, sin desbordamiento del documento |
| Test acumulado | Sesión completa 45/45 |
| Tarjetas | Recorrido de las 47 tarjetas y sus respuestas; final de navegación comprobado |
| Subcarpeta | Tres lecciones operativas bajo /curso/, sin errores de recursos o JavaScript detectados |
| Índice | 15 lecciones disponibles y 3 pendientes en el tema 1 |
| Inspección visual | Explorador en escritorio y móvil, tabla de exponenciales/logaritmos en móvil y desarrollo de 2(c) en escritorio |

## Archivos de prueba

- tests/generators.test.mjs: catálogo y generador de Límite Express.
- tests/derivatives.test.mjs: secantes y ejemplos de la entrega anterior.
- tests/derivative-rules.test.mjs: tangentes, normales, rama del examen y reglas de derivación.
- tests/lessons-05-browser.cjs: lecciones nuevas, explorador y recorrido acumulado.

npm test ejecuta las pruebas matemáticas. npm run test:rules requiere Playwright y Chrome/Chromium. El test de la entrega 04 toma ahora el tamaño del catálogo para poder seguir comprobando su recorrido cuando crezca.

Los enlaces, las capturas y la simulación de subcarpeta se revisaron además con scripts temporales. Tras la inspección visual se abreviaron los encabezados de las tablas con f y f′, conservando etiquetas accesibles, y el texto de pendiente no definida; ambos ajustes se volvieron a comprobar en móvil.

## Conservación y límites

Se conservan los CSS, las fuentes y el servicio MathJax. Los contenidos mantienen categorías editoriales para el diseño posterior. La gráfica es una representación didáctica con escala común; sus cifras también están disponibles en texto.

Las diferencias numéricas son una comprobación complementaria a los desarrollos algebraicos de las lecciones. El texto al 200 % no sustituye una auditoría integral de accesibilidad. No se han repetido las pruebas de fallos de descarga y concurrencia del motor, que no se modifica, ni se ha medido la capacidad de un alojamiento público.

Los documentos originales siguen intactos. No se han compilado PDF. El cierre del tema, la ampliación completa de los widgets, los idiomas, la lectura en voz alta y la administración con persistencia global siguen pendientes en el plan.

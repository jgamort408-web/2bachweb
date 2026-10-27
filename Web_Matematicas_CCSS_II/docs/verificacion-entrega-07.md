# Verificación de la entrega 07

Fecha: 18 de septiembre de 2026.

## Resultado

- Repaso integrado con tres problemas nuevos, rutas hacia los ejemplos desarrollados y seis preguntas transversales.
- Banco de 60 preguntas base: 54 de las 18 lecciones más seis de repaso.
- Mazo de 61 tarjetas; cinco nuevas tras contrastar los 24 conceptos previstos.
- Widget Continuidad: repara la función, independiente e insertado en su página.
- Auditoría de 15 problemas y de la procedencia de las adaptaciones, con pendientes explícitos.

## Comprobaciones ejecutadas

| Comprobación | Resultado |
|---|---|
| npm test | 15 pruebas superadas |
| Generador de continuidad | 1000 semillas, 6000 retos; cuatro configuraciones por sesión, tres diagnósticos y solución única |
| Exactitud | Límites contrastados con valores de las ramas; reparación y perturbaciones que vuelven a romper continuidad |
| Problemas integrados | Parámetros contrastados mediante cocientes incrementales; tangente comprobada desde la función; distancias y positividad |
| Regresión matemática | Se mantienen los controles de 10.000 preguntas de Límite Express, derivadas, secantes, tangentes, normal, cadena y límites |
| Repaso en navegador | Vacío, error, pista, reintento y resumen de 5/6 al primer intento |
| Juego completo | Seis rondas; pista en la primera; resumen correcto de 2600/2700 y reinicio a cero |
| Puntuación | Repetir un análisis parcialmente correcto no duplica puntos; repetir el envío final tampoco |
| Entradas | Blanco, texto, valores fuera de rango, números negativos y coma decimal; el gráfico conserva la última propuesta válida ante entrada inválida |
| Gráfica y fórmulas | Extremos y punto coinciden tras la reparación; una fórmula dinámica por función, sin merror |
| Teclado | Formularios enviados con Enter; foco en reparación, siguiente ronda y reinicio |
| Móvil | Juego a 320 y 390 px, sin desbordamiento horizontal del documento |
| Texto ampliado | Juego a 1280 px y texto base al 200 %, sin desbordamiento horizontal |
| Inserción | Widget y formulario ampliado dentro del anfitrión; altura ajustada en móvil |
| Subcarpeta | Anfitrión y widget bajo /prueba-subcarpeta/, con sus recursos locales |
| Regresión del anfitrión | Límite Express sigue cargando insertado, con controles y fórmulas |
| Catálogo completo | Test 60/60 y recorrido de las 61 tarjetas con respuesta, sin errores de fórmulas |
| Regresión de lecciones | Lecciones 1.16–1.18 y comparador de cuatro casos, mediante la batería de entrega 06 |
| Enlaces HTML | 171 documentos, sin destinos locales ausentes, anclas inexistentes ni IDs duplicados |
| Inspección visual | Juego inicial en escritorio y reparación en móvil; ajuste del selector SVG para respetar el tamaño matemático |

## Pruebas mantenidas y correcciones

- tests/continuity-repair.test.mjs, incluido en npm test.
- tests/review-07-browser.cjs, mediante npm run test:review; requiere Playwright y Chrome/Chromium. Admite TEST_URL, CHROME_PATH y SCREENSHOT_DIR.
- tests/lessons-06-browser.cjs, mediante npm run test:advanced, recorre el catálogo acumulado.
- El selector de la gráfica se limita a figure > svg para no alterar los SVG de MathJax.
- El anfitrión admite hasta 8000 px de altura, conservando comprobaciones de origen, ventana e identificador. El anterior límite de 1600 px podía introducir desplazamiento interno en formularios largos.
- La comprobación de enlaces se ejecutó con un analizador HTML temporal. Las capturas quedan en la carpeta tmp de la raíz de trabajo.

## Límites de la verificación

El juego usa aritmética de enteros pequeños con solución exacta. La gráfica facilita la interpretación; la corrección se decide con las expresiones, no con píxeles ni muestreo.

Se mantienen estilos generales, tipografías y motor MathJax local. No se ha repetido la batería de fallos de descarga y concurrencia del motor porque no cambia; esta entrega comprueba su uso en fórmulas nuevas y actualizaciones del juego. Estas pruebas no simulan carga de usuarios sobre GitHub Pages.

Los controles tienen etiquetas, mensajes de estado y descripción textual de la gráfica. Falta la auditoría con lector de pantalla y la aplicación completa de preferencias de accesibilidad dentro de los widgets; las pruebas de teclado y ampliación no equivalen a certificar accesibilidad.

No se guardan respuestas ni puntuaciones entre sesiones. No se han compilado PDF ni activado autenticación, idiomas, voz o administración global. El tema 1 permanece abierto según [auditoria-tema-01.md](auditoria-tema-01.md).

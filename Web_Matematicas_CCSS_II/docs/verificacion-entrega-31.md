# Verificación · Entrega 31

Fecha de cierre: 1 de octubre de 2026.

## Resultado

3.7. Regla de Barrow desarrollada: condiciones suficientes, conexión con el teorema fundamental, evaluación de extremos, paréntesis, constante y valores exactos. Cinco ejemplos principales, incluido el ejercicio 2(b) de recuperación T1; función por tramos, integral frente a área, singularidad y práctica resuelta. La discusión de integrales impropias es una ampliación.

Totales: 34 lecciones, 162 preguntas base y 157 tarjetas. Tema 3: 7/8 lecciones, 42 preguntas y 42 tarjetas. Las seis familias procedurales se cuentan aparte.

## Implementación

- `content/models/barrow.js`: integrandos 2x+1, x²−1 y 1/x; extremos −2, −1, 0, 1, 2; C=−3, 0, 3. De 225 estados, 174 son válidos y 51 explican el dominio sin devolver resultado.
- `assets/js/learning/barrow-explorer.js`: evaluaciones exactas y aproximadas, sustitución LaTeX, cancelación de C, intercambio y estado anunciado. Usa la cola compartida de MathJax.
- Retos: potencia, límites negativos invertidos, logaritmo, exponencial, salto por tramos e intervalo simétrico. Se filtran alternativas por valor para evitar opciones equivalentes, incluso con resultado cero. Los parámetros pueden repetirse entre sesiones.
- `content/activities/barrow.js`: seis conceptos y seis tarjetas. Integración en catálogo, inicialización, estado editorial, portada e índices.
- Ajuste acotado en `assets/css/learning.css`: ancho mínimo de tabla con desplazamiento local para evitar palabras comprimidas letra por letra al 200 %.

## Pruebas

**101 pruebas acumuladas superadas.** Las cuatro nuevas de `tests/barrow.test.mjs` incluyen:

- Las 225 configuraciones, dominio, inversión, extremos iguales y constante. Contraste por cuadratura independiente.
- 1000 semillas, 6000 retos y 24 000 opciones: cuatro valores distintos y una sola respuesta correcta. Cuadratura con dos nodos interiores por subintervalo, separando el salto, y derivadas numéricas en puntos regulares. Más de 200 bancos distintos y reproducibilidad con una misma semilla.
- Ejemplos, integral local, áreas separadas y coste marginal.
- Totales, bancos, identificadores y opciones únicas.

`tests/barrow-31-browser.cjs` comprueba:

- 75 combinaciones de integrando/a/b; tres constantes en un caso válido; intercambio, teclado y cambios consecutivos.
- Intervalos inválidos de 1/x sin resultado y recuperación al volver a un intervalo válido.
- Respuesta del test conservada al cambiar laboratorio o preferencias.
- Dos sesiones de seis retos con error, pista y reintento; test 5/6 y reinicio; seis tarjetas.
- Renderizado MathJax, ausencia de errores y delimitadores pendientes. La tarjeta conceptual sobre tramos usa texto sin fórmula.
- Móvil 320 px, texto al 200 %, contraste y resaltado; ancho mínimo de tabla verificado, desplazamiento por teclado y ausencia de desbordamiento global. Las fórmulas anchas conservan desplazamiento local.
- Recargar elimina respuestas; solo persisten preferencias de apariencia.
- Tema 3 42/42, índice 7 disponibles/1 pendiente, cabecera/pie y subcarpeta.

La inspección móvil inicial detectó compresión vertical de palabras en la tabla. Se añadió ancho mínimo acotado y una aserción específica, y se repitió la prueba de navegador.

Regresión `tests/lessons-06-browser.cjs` superada: tres lecciones avanzadas t01, 162 preguntas y 157 tarjetas. Revisión de 171 HTML: cero enlaces locales rotos, fragmentos ausentes e IDs duplicados.

Capturas: `../../tmp/barrow-explorador.png` y `../../tmp/barrow-movil.png`.

## Límites y siguiente paso

Diseño provisional conservado. Motor MathJax sin cambios; no se repiten ensayos de caída de red. No se han compilado PDF ni modificado ZIP originales. Administración central, traducción, voz, cuentas futuras y revisión con lectores de pantalla pendientes; no se certifica accesibilidad completa.

Siguiente: **3.8. Aplicaciones de la integral**. Después, revisión de cobertura y bancos y desarrollo de los tres laboratorios de integrales.

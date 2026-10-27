# Verificación · entrega 121

Fecha: 17 de octubre de 2026.

## Alcance

Nueve ideas de autoevaluación de los originales 3, 4 y 5 de Probabilidad, convertidas en preguntas de tres opciones con respuesta, pista y explicación. El banco total llega a 347 preguntas y mantiene 405 tarjetas.

## Comprobaciones

- SHA-256 de las tres fuentes intactas, orden original y nueve identificadores únicos.
- Chrome: filtro del tema 7, respuesta vacía, pista, nueve correcciones, resumen 9/9, teclado, MathJax sin errores, recarga y despliegue en raíz y subcarpeta.
- Vista de 390 px con ampliación al 200 % sin desbordamiento horizontal.
- Lectura sin JavaScript: nueve soluciones desplegables.
- Regresión: veinte preguntas de Inferencia, MathJax y lectura sin JavaScript; ocho pruebas unitarias de integrales y matrices.

Comandos: `tests/probability-test-121-browser.cjs`, `tests/inference-test-import-101-browser.cjs` y `node --test tests/antiderivatives.test.mjs tests/matrix-basics.test.mjs`. Todos finalizaron correctamente.

## Límites

Las opciones incorrectas y explicaciones se han creado para que las afirmaciones originales, algunas con una única opción, funcionen como autoevaluación real. No se ha validado aún con lector de pantalla ni se han añadido juegos del tema 7.

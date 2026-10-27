# Verificación de la entrega 157 · Tanda T01

Fecha: 18 de octubre de 2026. Alcance: base verificable y organización del cierre secuencial.

## Cambios comprobados

- El [plan de tandas](PLAN_CIERRE_POR_TANDAS.md) define T01–T16, dependencias y criterios de salida. T01 está cerrada; T02 es la siguiente.
- El contrato [catalog-expectations.mjs](../tests/helpers/catalog-expectations.mjs) fija las cantidades esperadas por tema independientemente del catálogo real. Se migran 49 archivos de prueba a ese contrato conservando las aserciones por lección, tema y unicidad.
- [test-unit.mjs](../scripts/test-unit.mjs) descubre todos los archivos unitarios; npm test ya no mantiene una lista que omita modelos recientes.
- Los tres ámbitos de repaso de 24 preguntas tienen destinos explícitos en [study-scopes.json](../config/study-scopes.json), verificados contra páginas y fragmentos reales.
- Las 60 preguntas de [Probabilidad](../content/activities/probability-test.js) incorporan un cuarto distractor con feedback. La huella SHA-256 del contenido previo, excluido el nuevo distractor y los metadatos, se mantiene en 60f9d53bf76a63d93efd7d5419ccfc80df3894191ff3b7d1913d969f52ad8c92. Se conservan enunciados, tablas, tres opciones anteriores, respuestas, pistas y explicaciones.
- Las alternativas numéricas simples se comparan por valor, incluidas fracciones y decimales equivalentes; las alternativas conceptuales se revisan editorialmente. El test de navegador comprueba el rechazo del nuevo distractor y recorre las 60 respuestas.
- La fuente de la pregunta 36 se precisa como archivo 4 de tablas y árboles, sin cambiar su enunciado ni solución.
- M13 queda reservado al paso logarítmico de F029 y M14 al comentario de aterrizaje de F008. Se conservan sus correcciones LaTeX/PDF como pendientes.
- Se elimina un byte NUL del informe de inferencia, se actualiza la fecha del catálogo y se corrigen textos actuales de recuentos en Test y README.

## Resultados

- **Unitarias:** 73 archivos, 302 pruebas, 302 superadas, cero fallos. [Registro completo](../../tmp/tanda-01-157-unit-tests.log).
- **Chrome:** probability-test-121-browser.cjs supera las 60 preguntas con cuatro opciones, una respuesta incorrecta seguida de corrección, MathJax sin errores, raíz/subcarpeta, teclado, móvil al 200 % y lectura de respaldo sin JavaScript.
- **Chrome:** probability-coverage-accessibility-135-browser.cjs supera la auditoría de las diez lecciones, enlaces, tablas, fórmulas, foco y acceso a sus actividades.

Los bancos conservan 398 preguntas y 405 tarjetas. No se dan por completadas la revisión editorial exhaustiva de evaluaciones, la accesibilidad manual, la administración central, los PDF ni las demás tandas. Los HTML originales y ZIP no se modifican.

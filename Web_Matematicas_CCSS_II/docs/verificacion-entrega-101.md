# Verificación · entrega 101

Integradas [20 preguntas originales de Inferencia](../test/index.html?tema=t09) desde `7. Tipo test.txt`, conservado por SHA-256 `24f01ad2e6cd85f317f791ca963cd49ae69f2350a706025a8b4f00da25fbba21`. El banco se regenera con [build-inference-test.mjs](../scripts/build-inference-test.mjs): mismo orden, cuatro opciones, respuesta prevista y trazabilidad `sourceIndex`. Las correcciones de formulación se describen en la [auditoría](auditoria-reutilizacion-inferencia.md).

La prueba `test:inference-test-import` pasó en Chrome: correspondencia 1–20, 338 preguntas globales, selección vacía, pistas, las 20 respuestas correctas, resumen 20/20, teclado, fórmulas, raíz/subcarpeta, móvil al 200 %, reinicio al recargar y [lectura de las soluciones sin JavaScript](../test/inferencia-preguntas.html). Las preferencias de lectura son comunes; respuestas y puntuación no persisten. La batería general de 294 pruebas también pasó.

Queda por revisar `8. Intervalos de confianza.txt`. El tema conserva estado parcial; no se certifica aún la pronunciación matemática ni el uso con lector de pantalla.

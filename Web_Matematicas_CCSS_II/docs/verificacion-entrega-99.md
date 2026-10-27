# Verificación · entrega 99

Se integran las [30 tarjetas originales revisadas de Inferencia](../tarjetas/index.html?tema=t09) y se enlazan desde el [índice del tema 9](../libro/temas/09-inferencia-estadistica/index.html#tarjetas). La correspondencia con `5. Flashcards.txt` se comprueba por hash, orden `sourceIndex` 1–30 y recuentos de las ocho categorías. El total del visor pasa de 359 a 389 tarjetas; el banco de 318 preguntas se conserva.

La prueba reproducible `test:inference-cards-import` comprueba las treinta respuestas en Chrome, sin errores de MathJax, el filtro por categoría, navegación con teclado, raíz y subcarpeta, móvil de 390 px con texto al 200 % y reinicio del filtro al recargar. Resultado: **PASS**. Las revisiones matemáticas se detallan en la [auditoría](auditoria-reutilizacion-inferencia.md).

El mazo no almacena respuestas ni progreso. Quedan tres archivos originales de Inferencia por revisar: muestreo, test e intervalos. El tema mantiene estado parcial; sigue pendiente la revisión global con lectores de pantalla y pronunciación matemática.

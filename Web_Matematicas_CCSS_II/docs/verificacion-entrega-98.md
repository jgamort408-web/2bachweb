# Verificación · entrega 98

Fuente intacta: `Página web existente/5. Inferencia Estadística/4. Ejercicios resueltos.txt`, SHA-256 `223af63b58a08064f4176cc90db6ab236af324fb271dd55b9afcbb71af89f067`. El generador [build-inference-exercises.py](../scripts/build-inference-exercises.py) comprueba el hash y la correspondencia de los 27 identificadores antes de escribir la [colección](../libro/temas/09-inferencia-estadistica/ejercicios-resueltos.html).

Se preservan orden, títulos y datos de origen; se revisan todas las resoluciones. Los enunciados 9 y 19 se reformulan por precisión conceptual. Correcciones destacadas: 99 % bilateral con valor crítico 2,576; 14 da 0,9545 sin redondeo previo; 15 y 17 comparan binomial exacta (0,0168 y 0,8194) con aproximación normal; 16 conserva la cola no nula 0,00317 %; 12 evita presentar la exclusión de 330 como certeza. El margen de un intervalo se diferencia del error observado en una muestra concreta.

`tests/inference-exercises.test.mjs`: 3 pruebas de cobertura de registros, probabilidades y tamaños. `tests/inference-exercises-import-98-browser.cjs`: Chrome local en raíz y subcarpeta; 27/27 identificadores, MathJax sin errores, cabecera/pie comunes, selector, enlaces directos a cada ejercicio, apertura con teclado, móvil a 390 px con texto al 200 % y soluciones desplegables sin JavaScript. La prueba del índice de la entrega 92 se actualizó para contar nueve epígrafes más la colección y volvió a pasar. La página no guarda respuestas. Falta revisión con lector de pantalla y de pronunciación matemática.

Quedan cuatro archivos de Inferencia por revisar. Siguiente: `5. Flashcards.txt`.

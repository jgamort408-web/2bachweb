# Verificación · entrega 102

La [lección 9.7](../libro/temas/09-inferencia-estadistica/07-intervalos-de-confianza.html) adapta `8. Intervalos de confianza.txt` (SHA-256 `d916f6fd7c3b455c38d5752158748af848af4b7b470a2c2989ae9a6b88c7c737`). Conserva fórmula, analogía, cuatro controles y figura. La [auditoría](auditoria-reutilizacion-inferencia.md) detalla las precisiones sobre cobertura, condiciones y el cuantil del 99 %.

`test:confidence-interval-model`: tres pruebas numéricas superadas; incluyen los valores iniciales, relaciones del margen, extremos de los controles y entradas inválidas. `test:confidence-interval-import`: Chrome comprueba controles, resultado numérico y figura, fórmulas sin errores, índice, teclado, raíz/subcarpeta, móvil de 390 px al 200 % y explicación disponible sin JavaScript. Resultado: **PASS**.

Los once originales de Inferencia están revisados, pero el tema conserva lecciones vacías o parciales. La figura cambia un intervalo calculado; no simula muestreos repetidos. La validación con lector de pantalla y pronunciación matemática permanece pendiente.

# Verificación de la entrega 105 · 9.6 Intervalos característicos

- Guion y «2. Estimación.txt» intactos; SHA-256 comprobados.
- Cinco secciones, tabla de áreas centrales, ejemplo numérico y comparación con 9.7.
- Chrome renderiza las fórmulas locales sin errores de MathJax.
- Índice y enlaces disponibles en raíz y subcarpeta simulada.
- Sin desbordamiento a 390 px con texto al 200 %; contenido legible sin JavaScript.

Prueba: tests/characteristic-intervals-105-browser.cjs con Chrome/Playwright local. Resultado: **PASS**.

Alcance: el cálculo [169,06;174,94] usa datos del ejercicio original pero plantea una pregunta didáctica nueva. 9.6 conserva estado parcial; 9.9 sigue vacío.

Regresión adicional: tests/estimation-import-94-browser.cjs **PASS** tras actualizar el recuento del índice (nueve epígrafes y la colección de ejercicios; nueve entradas con contenido parcial).


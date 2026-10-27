# Verificación de la entrega 152

Fecha: 2026-10-18. Alcance: revisión editorial de 7.8 sin cambios de diseño ni del banco base.

- **Fuente:** «4. Tablas de contingencia y diagramas de árboles.txt» mantiene SHA-256 b014c0d54663b92251debe0accd1b423c4249c78d92db368d1c1a5597fdb14b8. Se conservan la definición de condicionada, los tres datos \(0{,}60\), \(0{,}50\), \(0{,}35\) y la respuesta original \(0{,}35/0{,}50=0{,}70\).
- **Cálculos:** la tabla derivada tiene casillas 0,35; 0,25; 0,15 y 0,25, con totales 0,60; 0,40; 0,50 y 0,50. De ella se obtiene \(P(A\mid B^c)=0{,}25/0{,}50=0{,}50\) y \(P(A^c\mid B)=0{,}15/0{,}50=0{,}30=1-P(A\mid B)\). La comparación es didáctica y no implica causalidad ni datos observados.
- **Chrome local:** pasan conditional-probability-116-browser.cjs, probability-conditional-practice-132-browser.cjs y probability-coverage-accessibility-135-browser.cjs. Comprueban fuente intacta, tabla y fórmulas MathJax sin errores, 2.000 variantes, teclado, raíz/subcarpeta, reflujo móvil al 200 % y lectura de la tabla sin JavaScript.

Pendiente: revisión editorial de 7.9–7.10 y validación manual con lector de pantalla. El tema permanece parcial.

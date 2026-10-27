# Verificación de la entrega 151

Fecha: 2026-10-18. Alcance: revisión editorial de 7.7 y precisión de procedencia en 7.9; sin cambios de diseño ni de recuentos del banco base.

- **Fuentes:** «4. Tablas de contingencia y diagramas de árboles.txt» conserva SHA-256 b014c0d54663b92251debe0accd1b423c4249c78d92db368d1c1a5597fdb14b8. El mini-ejemplo de ramas condicionadas y su resultado 0,38 están en ese archivo. «5. Probabilidad total y Teorema de Bayes.txt» aporta a 7.9 la partición, la fórmula y el ejemplo de máquinas; su atribución se mantiene.
- **Cálculos:** desde \(P(A)=0{,}3\), \(P(B\mid A)=0{,}8\) y \(P(B\mid A^c)=0{,}2\), los cuatro caminos valen 0,24; 0,06; 0,14 y 0,56. Suman 1; los dos que terminan en \(B\) suman 0,38. Como \(P(B\mid A)=0{,}8\ne0{,}38=P(B)\), no hay independencia.
- **Chrome local:** pasan compound-experiments-115-browser.cjs, probability-compound-practice-131-browser.cjs, probability-factory-example-136-browser.cjs, total-probability-117-browser.cjs y probability-coverage-accessibility-135-browser.cjs. Comprueban fuente intacta, caminos, MathJax sin errores, 2.000 variantes, teclado, raíz/subcarpeta, móvil al 200 % y lectura de la tabla sin JavaScript. La prueba de 7.9 necesitó actualizar de cinco a seis su recuento histórico de secciones; la página ya tenía seis antes de esta entrega.

Pendiente: revisión editorial de 7.8–7.10 y validación manual con lector de pantalla. El tema sigue parcial.

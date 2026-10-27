# Verificación de la entrega 150

Fecha: 2026-10-18. Alcance: ampliación editorial de 7.6, sin cambios en el banco base ni en el diseño general.

- **Fuente:** «3. Axiomática de Kolmogorov.txt» permanece intacto; las pruebas comprueban su SHA-256 ea186d2415662bd9fcc2ee8841f75f3c15625aa4edbc69a97d6e7f2bf3ac6e04. Se conservan las propiedades y los ejemplos originales de dos dados y baraja española.
- **Cálculos:** en dos dados equilibrados e independientes, \(P(\text{al menos un seis})=1-(5/6)^2=11/36\). Para \(C\): «seis en el primero» y \(D\): «seis en el segundo», \(P(C\cup D)=1/6+1/6-1/36=11/36\); \(P(C\cap D)=1/36\leq P(C)=1/6\leq P(C\cup D)=11/36\). La comparación es una derivación didáctica nueva, no un ejercicio textual de la fuente.
- **Chrome local:** pasan probability-properties-114-browser.cjs, probability-properties-practice-130-browser.cjs y probability-coverage-accessibility-135-browser.cjs. Comprueban fórmulas MathJax sin errores, 2.000 variantes procedurales, teclado, raíz/subcarpeta, reflujo móvil al 200 % y lectura del ejemplo con JavaScript desactivado.

Pendiente: revisión editorial de 7.7–7.10 y validación manual de fórmulas y actividades con lector de pantalla. El tema permanece parcial.

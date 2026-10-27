# Verificación de la entrega 146

Fecha: 2026-10-18. Alcance: ampliación editorial de 7.2, sin cambios en los recuentos del curso.

- **Fuentes:** las huellas SHA-256 de los originales «Introducción a la probabilidad» y «Tipos de probabilidad» coinciden con el inventario. Se conservan las cuatro operaciones conceptuales y el ejercicio «rey o copa», cuya unión tiene 13 cartas de 40.
- **Comprobación matemática independiente:** con \(\Omega=\{1,2,3,4,5,6\}\), \(A=\{2,4,6\}\) y \(B=\{4,5,6\}\), la intersección es \(\{4,6\}\), la unión \(\{2,4,5,6\}\), exactamente uno \(\{2,5\}\), ninguno \(\{1,3\}\) y no ambos \(\{1,2,3,5\}\). Las probabilidades respectivas de las cuatro últimas regiones son \(4/6, 2/6, 2/6, 4/6\).
- **Lectura:** objetivos, requisitos, comparación resuelta, errores frecuentes y resumen. Los desplegables funcionan sin JavaScript y el diagrama conserva título y descripción accesible.
- **Chrome local:** `tests/event-algebra-110-browser.cjs`, `tests/probability-events-practice-126-browser.cjs` y `tests/probability-coverage-accessibility-135-browser.cjs`: **PASS**. Comprueban fórmulas MathJax sin errores, raíz y subcarpeta, reflujo móvil al 200 %, 2.000 semillas de la práctica, teclado, lectura sin JavaScript y estructura común del tema.

Pendiente: revisión editorial de 7.3–7.10 y validación manual de fórmulas, diagrama y mensajes con lector de pantalla. El tema sigue parcial.

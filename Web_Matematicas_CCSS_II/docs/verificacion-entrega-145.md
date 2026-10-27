# Verificación de la entrega 145

Fecha: 2026-10-18. Alcance: ampliación editorial de 7.1, sin cambios en los recuentos del curso.

- **Fuente:** las huellas SHA-256 de los originales «Introducción a la probabilidad» y «Tipos de probabilidad» siguen coincidiendo con el inventario. Se recupera el ejemplo original «obtener un 3», con (P=1/6); las cifras del dado y la baraja ya adaptadas permanecen.
- **Ampliación matemática:** ruleta ideal uniforme en ángulo con sectores de 180°, 90° y 90°. Los sectores B y C ocupan 180° de 360°, por lo que (P(B\cup C)=1/2); contar dos etiquetas de tres daría (2/3), que es incorrecto porque las etiquetas tienen pesos distintos.
- **Navegación y lectura:** objetivos, requisitos, cuatro ejemplos originales desplegables, contraste nuevo, errores frecuentes, resumen y enlaces a 7.2 y el test. El contraste y los ejemplos siguen siendo legibles sin JavaScript.
- **Chrome local:** `tests/probability-intro-109-browser.cjs`, `tests/probability-laplace-practice-125-browser.cjs` y `tests/probability-coverage-accessibility-135-browser.cjs`: **PASS**. Verifican MathJax sin errores, raíz y subcarpeta, reflujo móvil con texto al 200 %, práctica de seis preguntas, 2.000 semillas, teclado y estructura de las diez lecciones.

Pendiente: revisión editorial de 7.2–7.10 y validación manual de fórmulas, tablas y mensajes con lector de pantalla. El tema sigue parcial.

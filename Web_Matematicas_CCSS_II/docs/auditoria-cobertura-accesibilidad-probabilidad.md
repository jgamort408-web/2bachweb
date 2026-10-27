# Auditoría vigente del tema 7: cobertura y accesibilidad

Fecha: 2026-10-18 · Actualizada en la entrega 157.

## Cobertura comprobada

| Material | Estado actual | Criterio de cierre del plan |
|---|---:|---:|
| Epígrafes 7.1–7.10 | 10 con objetivos, teoría, ejemplos, práctica, errores y resumen; estado parcial | Pasada editorial realizada; falta contrastar material original restante y validar accesibilidad manual |
| Práctica procedural | 6 preguntas variables en cada epígrafe; 60 por recorrido completo | No cuentan como ítems base |
| Test base del tema | 60: 9 originales adaptadas y 51 ampliaciones | Cumplido el mínimo de 60 ítems base; revisar calidad editorial |
| Problemas resueltos | 12: 8 del original y 4 ampliaciones | Cumplido el mínimo; revisar accesibilidad |
| Tarjetas | 16 del original | Revisar alcance del mazo completo |
| Juegos | 3 widgets de sucesos, árboles y Bayes | Validar con tecnologías de apoyo |
| Fuentes originales | 8 archivos TXT usados al menos parcialmente, intactos | Revisar el material restante por archivo |

Los ocho problemas numerados y las primeras nueve preguntas base son materiales originales adaptados; los cuatro problemas con letras, las preguntas base 10–60, los juegos y las prácticas generadas son ampliaciones didácticas. El tema sigue **parcial** por la revisión del material original restante, la revisión editorial detallada del test y los problemas, y la validación manual de accesibilidad. El ejemplo de fallos de fábrica ya está integrado en 7.7 con su fórmula y redondeo corregidos.

En la entrega 145 se amplió 7.1 con el ejemplo original «obtener un 3», un contraejemplo didáctico de tres sectores desiguales, objetivos, errores frecuentes y resumen. La lección conserva estado parcial hasta la revisión del conjunto y las tecnologías de apoyo; las cifras de cobertura del banco no cambian.

En la entrega 146 se amplió 7.2 con una comparación resuelta entre unión, exactamente uno, ninguno y no ambos; se añadieron objetivos, errores frecuentes y resumen. La práctica procedural y los recuentos del banco no cambian. 7.2 sigue parcial hasta la revisión editorial conjunta y la comprobación manual con lector de pantalla.

En la entrega 147 se amplió 7.3 con cuatro lecturas de la tabla hipotética original, objetivos, errores frecuentes y resumen. La tabla simbólica y la numérica siguen siendo semánticas; la práctica genera una tercera tabla cuando JavaScript está activo. Las tres regresiones de navegador pasan, incluida la lectura estática sin JavaScript. Falta comprobar su navegación y sus fórmulas con lector de pantalla.

En la entrega 148 se amplió 7.4 con una tabla didáctica ordenada y una comparación de frecuencia observada frente a probabilidad teórica, más objetivos, errores frecuentes y resumen. La regresión de las diez lecciones espera ahora el mensaje de corrección antes de comprobarlo, para evitar una lectura prematura cuando el navegador trabaja con varias cargas. Falta la validación manual con lector de pantalla.

En la entrega 149 se recuperó en 7.5 el ejemplo original de las figuras de la baraja, se añadió un contraste de tres asignaciones finitas y se completaron objetivos, errores frecuentes y resumen. Las pruebas de la lección, su práctica y la cobertura transversal pasan. Queda pendiente la comprobación manual de fórmulas y soluciones con lector de pantalla.

## Comprobación automatizada

El test [probability-coverage-accessibility-135-browser.cjs](../tests/probability-coverage-accessibility-135-browser.cjs) abrió en Chrome las diez lecciones y comprobó título principal, salto al contenido, fuente, objetivos, requisitos, errores frecuentes, resumen, navegación etiquetada y destinos reales de sus apartados. Verificó la práctica con leyenda y estado anunciado, fórmulas sin errores, identificadores únicos, todas las tablas del cuerpo con título y encabezados, y cada desplegable con título. Comprobó archivos y fragmentos de los enlaces locales y el foco por teclado: tras corregir, pasa al botón de avance; al avanzar, vuelve a una opción de la pregunta nueva. El índice enlaza las diez prácticas y los tres juegos.

La revisión detectó y corrigió un enlace roto de 7.4 a «Muestreo». También actualizó la portada, que aún hablaba de un solo juego, y 7.10, que decía que su autoevaluación y problemas no estaban disponibles. Las regresiones del test base de Probabilidad y de una práctica de Integrales pasan tras el cambio al componente compartido.

La regresión vigente [probability-test-121-browser.cjs](../tests/probability-test-121-browser.cjs) recorre las 60 preguntas base en Chrome, comprueba sus respuestas, las fórmulas, las tablas, raíz y subcarpeta, y la lectura sin JavaScript. También comprueba el reflujo a 390 px con texto al 200 %. Sigue pendiente la validación manual con lector de pantalla.

En la entrega 150, la [lección 7.6](../libro/temas/07-probabilidad/06-propiedades-de-la-probabilidad.html#tres-vias) añade objetivos, un ejemplo comparado de tres relaciones, errores y resumen. Las pruebas de propiedades, práctica variable y cobertura transversal pasan en Chrome: comprueban MathJax sin errores, 2.000 variantes, navegación con teclado, ruta raíz y subcarpeta, reflujo móvil al 200 % y disponibilidad del ejemplo sin JavaScript. Esto no sustituye la prueba manual con lector de pantalla.

En la entrega 151, la [lección 7.7](../libro/temas/07-probabilidad/07-experimentos-compuestos.html#dependencia) añade una tabla semántica de cuatro caminos condicionados, objetivos, errores y resumen. Pasan en Chrome las regresiones de árboles, práctica de 2.000 variantes, ejemplo de fábrica, probabilidad total y cobertura transversal. Comprueban MathJax, navegación por teclado, raíz/subcarpeta, reflujo móvil al 200 % y lectura de la tabla sin JavaScript. La prueba de probabilidad total actualiza un recuento de secciones que había quedado obsoleto. La lectura real con lector de pantalla sigue pendiente.

En la entrega 152, la [lección 7.8](../libro/temas/07-probabilidad/08-probabilidad-condicionada.html#tabla) presenta la tabla del ejemplo en la propia página, con título y encabezados, y añade objetivos, comparación, errores y resumen. Pasan en Chrome las regresiones de condicionadas, práctica de 2.000 variantes y cobertura transversal. Comprueban MathJax sin errores, teclado, raíz/subcarpeta, reflujo a 390 px con texto al 200 % y lectura de la tabla sin JavaScript. La experiencia con lector de pantalla todavía requiere validación manual.

En la entrega 153, la [lección 7.9](../libro/temas/07-probabilidad/09-probabilidad-total.html#comprobacion) añade una comprobación desplegable del complemento, objetivos, errores y resumen. Las regresiones de probabilidad total, práctica de 2.000 variantes y cobertura transversal informan resultado satisfactorio en Chrome: comprueban MathJax sin errores, teclado, raíz/subcarpeta, móvil al 200 % y disponibilidad del cálculo sin JavaScript. La lectura matemática con lector de pantalla sigue pendiente de una prueba manual.

En la entrega 154, la [lección 7.10](../libro/temas/07-probabilidad/10-teorema-de-bayes.html#comprobacion) añade objetivos, comprobación de dos pares de posteriores, errores y resumen. Pasan las regresiones de Bayes, práctica de 2.000 variantes y cobertura transversal en Chrome: comprueban MathJax, teclado, raíz/subcarpeta, móvil al 200 % y disponibilidad de las soluciones sin JavaScript. Las diez lecciones han recibido esta pasada editorial; el estado del tema sigue parcial hasta auditar el conjunto y validar manualmente fórmulas, tablas y actividades con lector de pantalla.

En la entrega 155, la auditoría transversal reforzada pasa para las diez lecciones. Las regresiones [probability-test-121-browser.cjs](../tests/probability-test-121-browser.cjs), [probability-exercises-119-browser.cjs](../tests/probability-exercises-119-browser.cjs) y [probability-solved-expansion-137-browser.cjs](../tests/probability-solved-expansion-137-browser.cjs) confirman 60 preguntas base, 12 problemas, MathJax, raíz/subcarpeta, móvil al 200 % y alternativas legibles sin JavaScript. Se corrigieron dos textos de estado obsoletos en el índice y la colección de ejercicios. La inspección automática no acredita aún la experiencia con lector de pantalla ni la calidad editorial de cada respuesta.

## Pendientes de accesibilidad y contenido

La tanda T01 (entrega 157) incorpora el cuarto distractor explicado en cada pregunta base, conserva los enunciados y soluciones anteriores y vuelve a superar el recorrido en Chrome. El contrato unitario comprueba cantidades por tema, IDs, cuatro alternativas y referencias. El cuarto distractor no añade un ítem base: el banco permanece en 60. La revisión editorial exhaustiva y la accesibilidad manual continúan pendientes.

- Probar manualmente con lector de pantalla la lectura de las fórmulas MathJax, las tablas y los mensajes de corrección. La inspección automática no acredita esa experiencia.
- Revisar el material restante de cada fuente, sin completar huecos con contenido no contrastado.
- Revisar editorialmente los 60 ítems base y los doce problemas desarrollados, manteniendo la distinción entre originales, adaptaciones y ampliaciones; probar su lectura con lector de pantalla.
- Evaluar el diseño visual, contraste y reflujo del tema junto con la fase de diseño común prevista en el plan.

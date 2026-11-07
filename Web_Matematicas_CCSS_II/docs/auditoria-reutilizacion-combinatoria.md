# Reutilización del HTML de Combinatoria

Actualizado: 7 de noviembre de 2026 · Tarea P02 (T08) del [plan operativo](../../PLAN_WEB_OPERATIVA.md).

## Fuente y destino

- Fuente intacta: [Combinatoria.txt](<../../Página web existente/Combinatoria.txt>), la página «Combinatoria y Probabilidad · 2º Bachillerato» (SHA-256 `fe6d932c453e419afd48950ff188da878e5c743a406eac95a08595a61fe75007`).
- Destino: [apoyo de Combinatoria](../libro/apoyos/combinatoria.html), con el [modelo de cálculo](../content/models/combinatorics.js), el [controlador de la demostración y la calculadora](../assets/js/learning/combinatorics.js) y el [banco de diez preguntas](../content/activities/combinatorics-test.js).
- Criterio: el mismo que en los demás bloques ([criterio de reutilización](criterio-reutilizacion-html-estadistica-pl-inferencia.md)). Se integra todo el contenido válido, se corrigen los errores de forma justificada y los huecos se señalan sin rellenarlos con contenido inventado.
- Estado editorial: **parcial**.

## Correspondencia por bloque

| Bloque del original | Destino | Conservación o adaptación |
|---|---|---|
| Cabecera, chips y navegación fija por botones | Título, entradilla, índice lateral de la plantilla | Se omiten la cabecera ilustrada, las fuentes remotas y el resaltado del menú por desplazamiento: la plantilla ya aporta índice y progreso. |
| Introducción: regla de Laplace y las dos preguntas clave | «¿Por qué necesitamos técnicas de conteo?» | Se conserva y se precisa la condición: número finito de casos **igual de probables**. |
| Cuatro tarjetas de técnicas | Tabla «Las cuatro técnicas» | Fusionadas con la tabla resumen para no repetir las fórmulas. |
| Árbol de decisión (SVG) | «¿Qué técnica usar?», lista anidada de preguntas | Mismas preguntas y desenlaces, en texto accesible y legible en móvil. Se añade cómo comprobar si importa el orden. |
| Tabla resumen | Tabla «Las cuatro técnicas» | Las permutaciones con elementos repetidos ocupan su propia fila; el original las resumía como «sin repetición». |
| Variaciones sin repetición: fórmula, truco y ejemplo de 8 corredores | Sección «Variaciones sin repetición» | Conservados. |
| Demostración interactiva V(5,3) | Actividad «Llena las tres posiciones sin repetir» | Conservada con botones accesibles (`aria-pressed`, estado anunciado). Ahora explica las opciones de cada posición; sin JavaScript se explica el recuento 5·4·3. |
| Variaciones con repetición: fórmula, 9 códigos de colores, PIN y comparación con V | Sección «Variaciones con repetición» | Conservados. Los círculos de color se sustituyen por letras (R, V, A) para no depender del color. Se indica que r puede superar a n. |
| Permutaciones: fórmulas, animación de 3 personas y dos ejemplos | Sección «Permutaciones» | La animación pasa a lista estática de las seis ordenaciones. MATEMÁTICA corregido (ver abajo). |
| Combinaciones: fórmula, simetría, relación con V, «¿por qué dividimos entre r!?», triángulo de Pascal y ejemplo | Sección «Combinaciones» | Conservados. Se explica la simetría y la regla de Pascal; el triángulo deja de depender del ratón (`title`) y de los colores. |
| Probabilidad con conteo: método y tres ejemplos | Sección «Probabilidad con técnicas de conteo» | Conservados; se añaden las hipótesis de equiprobabilidad y extracción simultánea. |
| Calculadora combinatoria | Sección «Calculadora combinatoria» | Mismas cinco técnicas y límite n ≤ 20. Cálculo exacto con BigInt; mensajes de error en la página en lugar de `alert`. |
| Seis ejercicios resueltos | «Ejercicios resueltos», con selector y soluciones desplegables (`worked-problems.js`) | Datos y resultados conservados; enunciados precisados (ver abajo). |
| Juego «El Reto del Probabilista» (10 preguntas) | «Test: el reto del probabilista», en el visor común de preguntas | Mismas preguntas, alternativas y respuestas, con pista, explicación y comentario por alternativa. Se omiten puntos, rachas y estrellas. |
| Pie «Currículo EBAU Andalucía» | — | Se omite: no aporta contenido. |

## Correcciones justificadas

- **MATEMÁTICA.** El original enumeraba «M×2, A×3, T×2, E×1, Á×1, I×1, C×1», que suma 11 letras para una palabra de 10. El cálculo 10!/(3!·2!·2!) = 151 200 solo es correcto si la Á se cuenta como A. Se dice así de forma explícita y se añade el resultado si la Á se considera distinta: 10!/(2!·2!·2!) = 453 600.
- **Separador de millares.** El original usaba la coma («10,000», «151,200»), que en español es el separador decimal. Se usa el espacio fino (10 000, 151 200); los números de cuatro cifras van sin separador.
- **Calculadora en coma flotante.** Con potencias grandes daba cifras falsas: VR(19,19) mostraba 1.978.419.655.660.313.600.000.000 en lugar de 1 978 419 655 660 313 589 123 979. El [modelo](../content/models/combinatorics.js) calcula con enteros exactos.
- **Calculadora: repeticiones.** El original aceptaba repeticiones iguales a 1. Ahora se piden solo las de los elementos repetidos (enteros ≥ 2). Los que aparecen una vez no se escriben.
- **Equiprobabilidad.** Se explicita en el podio de la carrera, el PIN al azar, la tómbola, el quinteto y las preguntas 5 y 9. La moneda del test pasa a ser «equilibrada».
- **Ejemplo de la baraja.** Las cinco cartas se sacan «a la vez», que es lo que justifica contar grupos sin orden.
- **Tómbola.** El enunciado no decía qué se acierta; ahora una persona elige 6 números. La probabilidad se expresa también como 6,3·10⁻⁸.
- **Ejercicio 3.** Se titulaba «Contraseña alfanumérica» pero solo usa letras: pasa a «Contraseña de letras», con la ñ incluida.
- **Etiquetas «EBAU».** Los ejercicios 5 y 6 se presentaban como «tipo EBAU» y «EBAU» sin indicar el examen de origen. Se retiran las etiquetas: no se ha podido comprobar esa procedencia.
- **«Anagramas».** Se habla de «ordenaciones de las letras», porque se cuentan también las palabras sin sentido.
- **Juego.** Anunciaba «Hasta 100 pts», pero con la bonificación de racha se podían superar. El visor común no puntúa, así que la incoherencia desaparece.
- **Pregunta 2 (cerradura).** Se aclara que, aunque se diga «combinación», el orden de los dígitos importa.
- **Simplificaciones con `\cancel`.** Se sustituyen por la escritura explícita (8!/5! = 8·7·6·5!/5!), sin depender de una extensión de MathJax.

## Verificación

- Todos los resultados del original se comprueban en [combinatorics.test.mjs](../tests/combinatorics.test.mjs): 336, 10 000, 720, 151 200, 120, 658 008, 252, 2730, 4845, 387 420 489, 29 937 600, 15 890 700, 350/792 y 2 598 960.
- La prueba de navegador [combinatorics-164-browser.cjs](../tests/combinatorics-164-browser.cjs) recorre la demostración, la calculadora (valores exactos, campos según la técnica, errores), el selector de ejercicios y el test. Comprueba también el índice de apoyos, el móvil al 200 % y la página sin JavaScript.
- El [formulario](../herramientas/formulario.html) incluye las cinco fórmulas del apoyo, comprobadas contra la página al generarlo.

## Pendiente

- El original no trata combinaciones con repetición. El principio de multiplicación solo aparece aplicado en el ejercicio 6, sin explicarse aparte. No hay tarjetas de repaso. No se han añadido.
- El test repite siempre las mismas diez preguntas; no hay práctica con datos nuevos.
- Revisión editorial del docente y prueba con lector de pantalla.

# Entrega 13: funciones polinómicas

Fecha: 28 de septiembre de 2026.

## Contenido desarrollado

Página: `libro/temas/02-representacion-de-funciones/02-funciones-polinomicas.html`.

La lección cubre definición, grado, coeficiente principal, dominio, continuidad, cuatro patrones en los infinitos, raíces y multiplicidad, signo, monotonía y extremos. Distingue grado par de función par, raíces de la función de raíces de la derivada y extremos relativos de absolutos.

Dos estudios completos de elaboración propia:

1. p(x)=(x+1)²(x−2)=x³−3x−2: raíz doble −1 y simple 2; máximo relativo (−1,0), mínimo relativo (1,−4), signo y límites. La gráfica se calcula desde el mismo modelo numérico que se comprueba en pruebas, con descripción textual y escalas explícitas.
2. B(q)=−2q²+24q−40, beneficio en cientos de euros para q toneladas en [0,10]: ceros 2 y 10, máximo absoluto de 3200 euros en q=6 y mínimo de −4000 euros en q=0. La práctica cambia la capacidad a [0,4]: máximo 2400 euros en q=4. Es un modelo didáctico propio, no una predicción económica real.

La variante de capacidad no se cuenta como un tercer estudio completo. Se añaden seis preguntas base y seis tarjetas. El tema 2 reúne cuatro estudios completos entre 2.1 y 2.2, 12 preguntas y 12 tarjetas; sigue parcial.

## Taller procedural

`content/models/polynomials.js` genera sesiones reproducibles de seis ejercicios de grados 1 a 6, con coeficiente principal no nulo. Los términos de menor grado varían. Los cuatro primeros ejercicios garantizan los cuatro patrones de límites; las alternativas muestran siempre primero el límite a −∞ y después el de +∞.

La generación usa una semilla numérica obtenida del navegador. No evalúa expresiones introducidas por el estudiante. Cada pregunta contiene coeficientes, solución, pista y explicación del término dominante. El reinicio obtiene otra semilla; no se promete que una expresión individual nunca se repita.

`assets/js/learning/polynomial-practice.js` conecta el taller con el motor común de test y dibuja la curva del ejemplo. Sus preguntas no se incorporan al banco fijo. El taller y el test fijo mantienen estado independiente, sin reloj, cuentas o historial.

## Verificación

| Comprobación | Resultado |
|---|---|
| Pruebas acumuladas | 29 superadas |
| Cúbica | Identidad factorizada y derivada contrastadas en 201 puntos; signos en ambos lados de las raíces y clasificación de extremos |
| Beneficio | 1001 valores del intervalo, derivada numérica, candidatos, unidades y restricción a [0,4] |
| Generador | 1000 semillas, 6000 ejercicios; grado efectivo, solución única, cuatro patrones, reproducibilidad y dominancia numérica a ambos lados |
| Taller en navegador | Seis ejercicios, respuesta vacía, error, pista y reintento; resumen 5/6 al primer intento |
| Test fijo | Seis respuestas correctas; selección conservada mientras se completa el taller |
| Regeneración | Nuevo enunciado tras reiniciar la sesión controlada; resumen del test fijo conservado |
| Tarjetas | Seis anversos y reversos comprobados con LaTeX |
| Tema 2 | Test completo 12/12; regresión de la lección 2.1 y sus filtros |
| Catálogo general | 72 preguntas y 73 tarjetas recorridas con las tres lecciones avanzadas del tema 1 |
| Accesibilidad visual | Teclado, móvil 320/390 px, texto al 200 %, contraste y resaltado; sin desbordamiento global |
| Subcarpeta | Curva, taller y test independientes operativos |
| Enlaces | 171 HTML, sin destinos locales rotos, anclas ausentes ni IDs duplicados |

Comandos: `npm test`, `npm run test:polynomials`, `npm run test:representation`, `npm run test:advanced`. Las pruebas de navegador requieren servidor local, Playwright y Chrome. La comprobación de enlaces se ejecutó sobre todos los HTML.

Capturas inspeccionadas fuera de la web publicada: `../tmp/polinomio-raiz-doble.png` y `../tmp/polinomios-taller-movil.png`.

## Fuentes y límites

Guion local 2.2; mazo del tema 2, especialmente conceptos 3–5 y 16–20; criterio de extremos de T2.6 y dominio contextual de T2.9. Los ejemplos, seis preguntas y generador son elaboración propia sobre esas fuentes. Véase [procedencia-contenidos.md](procedencia-contenidos.md).

El curso tiene 20 lecciones desarrolladas, 72 preguntas base y 73 tarjetas. Las variantes procedurales se registran aparte. El tema 2 conserva siete lecciones y sus laboratorios pendientes; este taller no se presenta como uno de los videojuegos terminados. Se mantiene el diseño provisional, el motor LaTeX y la ausencia de historial de respuestas. No se han compilado PDF ni activado nuevas integraciones. La revisión con lectores de pantalla y demás fases globales siguen pendientes.

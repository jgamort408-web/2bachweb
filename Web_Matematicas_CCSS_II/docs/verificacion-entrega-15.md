# Entrega 15: funciones exponenciales

Fecha: 28 de septiembre de 2026.

## Contenido y archivos

Página: `libro/temas/02-representacion-de-funciones/04-funciones-exponenciales.html`.

- Exponencial básica: condiciones de la base, positividad, dominio, recorrido, cortes, límites, derivada y monotonía.
- Transformaciones C·a^x+k, desplazamiento horizontal y equivalencia con C·e^(bx)+k. Casos constantes tratados aparte.
- Estudio completo de h(x)=2−4(1/2)^x: creciente, cortes (0,−2) y (1,0), recorrido (−∞,2), asíntota y=2, curvatura opcional.
- Capitalización hipotética de 1000 € al 5 %: tercer año 1157,63 €, redondeado al final. Depreciación de 12000 € al 20 %: tercer año 6144 €. Se distinguen porcentaje constante, incremento absoluto y dominios discreto/continuo.
- Práctica resuelta de 3·2^x−3 y disminución de 500 unidades al 10 % durante cuatro años: 328,05 unidades.
- Seis preguntas con retroalimentación, pistas y reintento; seis tarjetas en `content/activities/exponentials.js`, integradas en el catálogo.

El modelo está en `content/models/exponentials.js`; la interacción y la gráfica, en `assets/js/learning/exponential-explorer.js`. El inicializador común solo monta el explorador si la página contiene su contenedor. No se cambian el cargador ni los mecanismos de recuperación de MathJax.

## Explorador

Bases {2, 1/2}, coeficientes {1, 2, −1, −4} y desplazamientos {0, 2, −2}: 24 combinaciones. Cambia simultáneamente expresión, descripción, recorrido, límites, gráfica y tabla mediante `updateMath`. El estado se anuncia en una región de estado breve; la gráfica incluye título y descripción y la tabla da valores de x entre −2 y 2.

La curva se calcula en x entre −4 y 4 y se recorta al marco, sin sugerir que termina allí. El pie explica la continuación, las escalas y la línea discontinua. La tabla y el texto permiten estudiar la función sin interpretar la imagen. El selector conserva el foco al cambiar y no reinicia las respuestas del test. No guarda resultados.

## Comprobaciones realizadas

| Comprobación | Resultado |
|---|---|
| Pruebas acumuladas | 37 superadas |
| Matemáticas nuevas | 24 configuraciones, derivadas contrastadas por diferencias centrales, signos, recorrido, límites y cortes |
| Ejemplos | Reflexión, desplazamiento equivalente, valores del estudio y práctica |
| Porcentajes | Contraste con incrementos iterados durante 20 periodos, redondeo final y parámetros inválidos |
| Navegador | 24 estados con tabla y gráfica; cambios rápidos dejan fórmula y datos coherentes; respuesta del test conservada |
| Práctica | 5/6 al primer intento con pista y reintento; seis tarjetas recorridas |
| Repaso t02 | 24/24 |
| Lectura visual | Teclado, 320/390 px, texto 200 %, contraste y resaltado sin desbordamiento global |
| Rutas | Lección, controles y fórmulas funcionan bajo subcarpeta |
| Regresión | Lección 2.1, filtros e índice 4/9; tres lecciones avanzadas de t01 y catálogo de 84 preguntas y 85 tarjetas |
| Enlaces | 171 HTML sin destinos locales rotos, anclas ausentes ni IDs duplicados |

Pruebas: `npm test`, `npm run test:exponentials`, `npm run test:representation` y `npm run test:advanced`, con el entorno de navegador habitual. El barrido de enlaces se hizo sobre los HTML locales.

Capturas revisadas fuera del sitio publicado: `../tmp/exponenciales-explorador.png` y `../tmp/exponenciales-explorador-movil.png`.

## Estado y continuación

22 lecciones desarrolladas, 84 preguntas base y 85 tarjetas. T02 tiene 4 de 9 lecciones y 24 preguntas y tarjetas. Las combinaciones del explorador no se contabilizan como preguntas base ni como un videojuego nuevo.

Se mantiene el diseño provisional con roles editoriales para la futura tipografía. Los originales se conservan. No se compilan nuevos PDF ni se activan cuentas, administración, traducción o voz. La revisión con lectores de pantalla y lectura matemática sigue pendiente; estas pruebas no certifican conformidad WCAG.

Siguiente contenido: 2.5, funciones logarítmicas.

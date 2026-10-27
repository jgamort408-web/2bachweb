# Entrega 20: optimización de funciones

Fecha: 28 de septiembre de 2026.

## Contenido y archivos

Página: `libro/temas/02-representacion-de-funciones/09-optimizacion-de-funciones.html`.

- Método: variable y unidades, objetivo, dominio factible, puntos críticos, fronteras, comparación e interpretación.
- Condiciones de existencia en intervalo cerrado, cautelas para dominio abierto e infinitos, puntos no derivables y límites de la segunda derivada.
- Beneficio B(q)=−q²+40q−100 en [0,24]: máximo 300 € en 20 t; capacidad 8: máximo 156 € en la frontera. Con fijo 500 €, el máximo en 20 t es −100 €.
- Cantidades enteras para −q²+25q−100: máximo continuo en 12,5; empate entero en 12 y 13, con 56 €.
- Coste medio q+100/q: mínimo 20 €/unidad en q=10, dominio q>0.
- Valla de 60 m en tres lados: dimensiones 15 m y 30 m, máximo 450 m²; no se alcanza el área cero en el dominio de dimensiones positivas.
- Práctica de ingreso 30q−2q² en [0,12]: máximo continuo 112,50 € en 7,5; máximos enteros 7 y 8 con 112 €.
- Seis preguntas y seis tarjetas en `content/activities/optimization.js`.

Modelo: `content/models/optimization.js`. Explorador: `assets/js/learning/optimization-explorer.js`. Integración con catálogo y lecciones comunes.

## Explorador

Precio p₀ en {35,50}, fijo F en {100,500}, capacidad K en {8,16,24} y modo divisible/entero: 24 escenarios. El precio es p(q)=p₀−q y el coste 10q+F. Todas las cantidades admitidas conservan precio no negativo.

El solver separa la expresión algebraica del criterio de admisibilidad. En modo continuo compara fronteras y vértice admisible; en modo entero compara fronteras y enteros vecinos del vértice, aprovechando la concavidad de esta familia. Devuelve todos los empates. La prueba discreta contrasta el resultado enumerando todas las cantidades enteras factibles.

El control de cantidad se ajusta a capacidad y modo, conserva una cantidad admisible y actualiza ingreso, coste, beneficio y diferencia con el máximo. El paso de 0,5 en modo divisible es una facilidad de interacción, no una restricción del modelo continuo; se explica en la página.

Gráfica con escalas fijas: zona fuera de capacidad sombreada, prolongación excluida a trazos, candidatos óptimos con cuadrados y elección actual con círculo. En modo entero solo los puntos son opciones admisibles; la curva es una referencia. La tabla compara candidatos con sus motivos. Fórmula, datos y gráfica se actualizan con `updateMath`; el test no se reinicia.

## Comprobaciones realizadas

| Control | Resultado |
|---|---|
| Pruebas acumuladas | 57 superadas |
| Continuo | 12 escenarios, identidad ingreso menos coste y comparación en 2401 puntos por escenario |
| Enteros | 12 escenarios contrastados por enumeración completa; empate y vértice excluido |
| Otros problemas | Coste medio, valla, restricciones de dimensiones e ingreso continuo/entero |
| Navegador | 24 estados, candidatos y marcadores correctos, pérdidas y empates |
| Controles | Cantidad con teclado, cambio de modo, ajuste a capacidad y cambios rápidos |
| Lección | Test 5/6 al primer intento con pista y reintento; seis tarjetas recorridas |
| Tema 2 | Test 54/54 |
| Lectura | 320/390 px, texto 200 %, contraste y resaltado; tabla desplazable con teclado |
| Subcarpeta | Lección, controles y fórmulas operativos |
| Regresión | 2.1, filtros e índice 9/9; tres lecciones avanzadas de t01 y catálogo 114 preguntas/115 tarjetas |
| Enlaces | 171 HTML sin destinos locales rotos, anclas ausentes ni IDs duplicados |

Pruebas: `npm test`, `npm run test:optimization`, `npm run test:representation` y `npm run test:advanced`, con el entorno habitual. Barrido adicional de enlaces locales.

La primera comprobación móvil detectó un selector que ensanchaba la página a 325 px en una ventana de 320 px con texto al 200 %. Se limitó el ancho de las etiquetas de controles y se repitió la prueba completa de la lección sin desbordamiento global.

Capturas revisadas fuera del sitio publicado: `../tmp/optimizacion-explorador.png` y `../tmp/optimizacion-explorador-movil.png`.

## Estado y continuación

27 lecciones desarrolladas, 114 preguntas base y 115 tarjetas. T02 tiene sus nueve lecciones con contenido, 54 preguntas y 54 tarjetas. El explorador no sustituye al widget Optimiza ni sus 24 escenarios cuentan como preguntas base adicionales.

El tema 2 permanece parcial: falta repaso integrado, ampliar el banco a 60 preguntas, auditar los problemas y desarrollar sus tres laboratorios. Se mantienen también pendientes PDF, administración, traducción, voz y revisión con lectores de pantalla. No se añaden cuentas ni historial. Las comprobaciones visuales y de teclado no certifican WCAG.

Siguiente entrega: repaso integrado y auditoría del tema 2, antes de continuar con los juegos previstos.

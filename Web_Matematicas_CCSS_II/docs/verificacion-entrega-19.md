# Entrega 19: expansión y contracción

Fecha: 28 de septiembre de 2026.

## Contenido y rutas

Página: `libro/temas/02-representacion-de-funciones/08-expansion-y-contraccion.html`.

- Regla (u,v)→(u/b,av) para a·f(bx), con factores no nulos; escala horizontal inversa y reflexiones respecto a los ejes.
- Dominio y recorrido con inversión del orden de extremos y conservación de inclusiones.
- Extremos, ceros, asíntotas y derivada ab·f′(bx). Ampliaciones sobre factores cero, oblicuas y combinación con traslaciones.
- Ejemplos de −2(2x−1)², 3/(−2x−1) y ln(−2x), con dominio y comportamiento gráfico justificados.
- Modelo hipotético de dos centros: 2C(q/2), para C(q)=q²+1. Distinción del factor que reparte la producción y el que suma los costes.
- Práctica de −½|−2x−1| y escalado de intervalos.
- Seis preguntas y seis tarjetas en `content/activities/scaling.js`.

Modelo: `content/models/scaling.js`. Comparador: `assets/js/learning/scaling-explorer.js`. Integración con catálogo e inicializador comunes.

## Explorador

Tres familias: (x−1)², 1/(x−1) y ln x. Factores exterior e interior en {−2, 1/2, 1, 2}: 48 configuraciones. Son funciones no pares, de modo que una reflexión horizontal no queda oculta por la simetría respecto a Y.

La curva original puede ocultarse; se representa a trazos y la transformada con línea continua. El círculo P y el cuadrado Q muestran puntos correspondientes, con tabla numérica y descripción textual. Las escalas del dibujo permanecen fijas. Las ramas racionales se separan en el polo y el logaritmo se dibuja solo en el semieje permitido por el signo de b.

Los cambios se agrupan con `updateMath` para sincronizar fórmula, dominio, recorrido, puntos, gráfica y tabla. Se conserva la respuesta marcada en el test. El cero numérico se muestra sin signo negativo. La tabla mantiene sus cifras completas y permite desplazamiento horizontal y foco de teclado.

## Verificación

| Control | Resultado |
|---|---|
| Pruebas acumuladas | 53 superadas |
| Modelo | 48 casos: puntos, dominio, pendientes contrastadas numéricamente, extremos y asíntotas |
| Intervalos | Orden, extremos abiertos/cerrados y factores negativos |
| Ejemplos | Vértice, derivada, límites de racional, dominio del logaritmo, valor absoluto y coste repartido |
| Navegador | 48 estados: tablas, curvas, marcadores, reflexiones, asíntotas y dominio del logaritmo |
| Interacción | Ocultar/mostrar original, cambios rápidos, teclado y respuesta conservada |
| Lección | Test 5/6 al primer intento con pista y reintento; seis tarjetas recorridas |
| Test t02 | 48/48 |
| Lectura visual | 320/390 px, texto 200 %, contraste y resaltado sin desbordamiento global; tabla desplazable con teclado |
| Subcarpeta | Controles, lección y LaTeX operativos |
| Regresión | 2.1, filtros e índice 8/9; tres lecciones avanzadas de t01 y catálogo de 108 preguntas y 109 tarjetas |
| Enlaces | 171 HTML sin destinos locales rotos, anclas ausentes ni IDs duplicados |

Pruebas: `npm test`, `npm run test:scaling`, `npm run test:representation` y `npm run test:advanced`, con el entorno habitual de navegador. Se realizó un barrido de enlaces locales.

Una comparación estricta inicial distinguía el cero negativo de JavaScript del cero matemático; se corrigió esa comprobación y se normalizó su presentación. Se repitieron las pruebas acumuladas y el recorrido del comparador.

Capturas finales revisadas fuera del sitio publicado: `../tmp/escalas-explorador.png` y `../tmp/escalas-explorador-movil.png`.

## Estado y continuación

26 lecciones desarrolladas, 108 preguntas base y 109 tarjetas. T02 tiene 8 de 9 lecciones y 48 preguntas y tarjetas. Las 48 configuraciones no se contabilizan como preguntas base adicionales ni como un nuevo videojuego.

Se mantienen diseño provisional, roles editoriales, originales y recuperación común de MathJax. No se añaden cuentas, historial ni administración. PDF, traducción, voz y revisión con lectores de pantalla siguen pendientes. Las comprobaciones visuales y de teclado no certifican WCAG.

Siguiente contenido: 2.9, optimización de funciones. Después quedarán pendientes la revisión global y los laboratorios del tema 2.

# Entrega 18: traslaciones

Fecha: 28 de septiembre de 2026.

## Contenido y rutas

Página: `libro/temas/02-representacion-de-funciones/07-traslaciones.html`.

- Regla (u,v)→(u+a,v+k), justificación del sentido horizontal y composición de traslaciones.
- Dominio, recorrido, inclusión de extremos, monotonía, extremos y continuidad trasladados.
- Asíntotas verticales y horizontales; ampliación con oblicua y=mx+(b+k−ma).
- Cortes con los ejes: resolución de f(x−a)=−k y evaluación de f(−a)+k cuando esté definida.
- Estudios de (x−2)²−3, 1/(x+2)+1 y ln(x−2)+1. Aplicación hipotética de una cuota fija al coste variable.
- Práctica |x+1|−2 y desplazamiento de intervalos de dominio y recorrido.
- Seis preguntas con retroalimentación y seis tarjetas en `content/activities/translations.js`.

Modelo: `content/models/translations.js`. Comparador gráfico: `assets/js/learning/translation-explorer.js`. Se integra en el inicializador de lecciones y en el catálogo por temas.

## Explorador

Funciones originales x², |x|, 1/x y ln x; a y k en {−2,0,2}: 36 configuraciones. La gráfica original aparece a trazos, y la trasladada con línea continua. Un círculo marca P y un cuadrado Q; un segmento ayuda a comparar su desplazamiento. Puede ocultarse la original con una casilla operable mediante teclado.

El marco y las escalas permanecen fijos. Las ramas de 1/x se dibujan por separado a ambos lados de cada polo; ln x y su trasladada solo se muestrean dentro de sus dominios. Se muestran las asíntotas de la función trasladada. Las curvas continúan fuera del marco, como indica el pie.

Fórmula, descripción de dominio y recorrido, punto correspondiente, gráfica y tabla se actualizan mediante la cola común de MathJax. Los cambios rápidos conservan el estado final y la selección del test. La tabla tiene ancho mínimo, nombre accesible y desplazamiento horizontal con teclado para no fragmentar cifras al ampliar el texto. La gráfica incluye descripción textual y una leyenda que diferencia curvas y marcadores sin depender solo del color.

## Verificaciones realizadas

| Control | Resultado |
|---|---|
| Pruebas acumuladas | 49 superadas |
| Modelo | 36 combinaciones: puntos, dominio, mínimos, asíntotas y pendientes numéricas correspondientes |
| Ejemplos | Vértices, cortes, intervalos abiertos/cerrados, composición y oblicua contrastados |
| Navegador | 36 estados: tabla, marcadores, ramas separadas, dominio del logaritmo y asíntotas |
| Interacción | Ocultar/mostrar original, teclado, cambios rápidos y conservación de respuesta |
| Lección | Test 5/6 al primer intento con pista y reintento; seis tarjetas recorridas |
| Tema 2 | Test 42/42 |
| Lectura visual | 320/390 px, texto 200 %, contraste y resaltado sin desbordamiento global; tabla desplazable mediante flecha derecha |
| Subcarpeta | Lección, controles y LaTeX operativos |
| Regresión | 2.1, filtros e índice 7/9; tres lecciones avanzadas de t01 y catálogo de 102 preguntas y 103 tarjetas |
| Enlaces | 171 HTML sin destinos locales rotos, anclas ausentes ni IDs duplicados |

Pruebas: `npm test`, `npm run test:translations`, `npm run test:representation` y `npm run test:advanced`, con el entorno habitual de navegador. Se ejecutó además un barrido local de enlaces.

Capturas revisadas fuera del sitio publicado: `../tmp/traslaciones-explorador.png` y `../tmp/traslaciones-explorador-movil.png`.

## Estado y continuación

25 lecciones desarrolladas, 102 preguntas base y 103 tarjetas. T02 tiene 7 de 9 lecciones y 42 preguntas y tarjetas. Las 36 configuraciones no se contabilizan como preguntas base adicionales ni como un nuevo videojuego.

Se mantienen el diseño provisional, los roles editoriales, los originales y los mecanismos comunes de recuperación de MathJax. No se añaden cuentas, historial ni administración. PDF, traducción, voz y revisión con lectores de pantalla siguen pendientes. Estas comprobaciones no certifican conformidad WCAG.

Siguiente contenido: 2.8, expansión y contracción.

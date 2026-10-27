# Entrega 17: funciones a trozos y valor absoluto

Fecha: 28 de septiembre de 2026.

## Contenido y archivos

Página: `libro/temas/02-representacion-de-funciones/06-funciones-a-trozos-valor-absoluto.html`.

- Lectura de intervalos, condiciones de las expresiones, dominio y extremos abiertos/cerrados.
- Función x² para x<1 y 2x−1 para x≥1: continuidad, derivabilidad con cocientes incrementales, tangente y mínimo absoluto.
- Contraste entre salto, valor aislado y punto sin definir. Distinción entre continuidad en el dominio y extensión al hueco.
- Valor absoluto como distancia; estudio de |x−1|−2 y descomposición de |x²−4|.
- Tarifa hipotética: 2 €/m³ hasta 10 m³ y 3 €/m³ solo por el exceso. Continuidad del coste, cambio de precio marginal y dominio contextual.
- Práctica de parámetros de unión, |2x−4| y T(15)=35 €.
- Seis preguntas y seis tarjetas en `content/activities/piecewise.js`.

Modelo y situaciones: `content/models/piecewise.js`. Interacción y gráfica: `assets/js/learning/piecewise-explorer.js`. Se integra en el inicializador común de lecciones y en el catálogo de actividades.

## Explorador

Cinco situaciones —unión suave, esquina, salto, valor aislado y punto sin definir— en a=−1, 0 o 1: 15 configuraciones. Usa la coordenada relativa x−a para desplazar las ramas.

Las ramas se dibujan separadas y solo en sus intervalos. Los extremos vacíos se marcan antes que el único valor incluido; si coinciden, el punto relleno representa la inclusión. Para el hueco no se dibuja ningún punto relleno. La línea discontinua indica el punto de unión, sin presentarse como una asíntota.

Fórmula, dominio, límites, diagnóstico, gráfica y tabla se actualizan mediante `updateMath`. Si hay discontinuidad o punto ausente, no se presentan las pendientes de las fórmulas como derivadas laterales de la función en ese punto. La prueba matemática calcula cocientes con el valor real de la función para detectar esa diferencia.

La tabla tiene ancho mínimo para mantener las cifras completas, desplazamiento horizontal, nombre accesible y foco de teclado. La gráfica incluye título, descripción y escalas. No se guardan respuestas ni se altera la selección del test al cambiar controles.

## Comprobaciones realizadas

| Control | Resultado |
|---|---|
| Pruebas acumuladas | 45 superadas |
| Uniones | 15 casos: valores, límites, continuidad y cocientes incrementales |
| Estudios | Unión suave, valores y mínimo del absoluto, identidad por tramos de dos absolutos |
| Tarifa | Acumulación independiente hasta 30 unidades, continuidad en 10 y pendientes laterales 2 y 3 |
| Navegador | 15 configuraciones, tablas, dos ramas separadas y marcadores incluidos/excluidos |
| Interacción | Cambios rápidos, teclado, selección del test conservada y estado final de fórmulas coherente |
| Lección | 5/6 al primer intento con pista y reintento; seis tarjetas recorridas |
| Test t02 | 36/36 |
| Lectura | 320/390 px, texto 200 %, contraste y resaltado sin desbordamiento global; tabla desplazable con flecha derecha |
| Subcarpeta | Lección, controles y MathJax operativos |
| Regresión | 2.1, filtros e índice 6/9; tres lecciones avanzadas de t01 y catálogo de 96 preguntas y 97 tarjetas |
| Enlaces | 171 HTML sin destinos locales rotos, anclas ausentes ni IDs duplicados |

Pruebas: `npm test`, `npm run test:piecewise`, `npm run test:representation` y `npm run test:advanced`, con el entorno habitual de navegador. Barrido local adicional de enlaces.

La primera inspección móvil mostró cifras partidas en la tabla de cinco columnas. Se corrigió con ancho mínimo y desplazamiento, se añadió comprobación de teclado y se repitió la prueba de navegador de esta entrega.

Capturas finales revisadas fuera del sitio publicado: `../tmp/tramos-explorador.png` y `../tmp/tramos-explorador-movil.png`.

## Estado y continuación

24 lecciones desarrolladas, 96 preguntas base y 97 tarjetas. T02 tiene 6 de 9 lecciones y 36 preguntas y tarjetas. Las 15 configuraciones del explorador no cuentan como preguntas base adicionales ni como un videojuego nuevo.

Se conservan el diseño provisional, los roles editoriales, los originales y los mecanismos comunes de recuperación de MathJax. No se activan cuentas, historial, administración, traducción ni voz. PDF y revisión con lectores de pantalla siguen pendientes; las comprobaciones visuales y de teclado no certifican WCAG.

Siguiente contenido: 2.7, traslaciones.

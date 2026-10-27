# Entrega 16: funciones logarítmicas

Fecha: 28 de septiembre de 2026.

## Contenido y rutas

Página: `libro/temas/02-representacion-de-funciones/05-funciones-logaritmicas.html`.

- Definición como inversa de una exponencial, base válida y argumento positivo. Convención explícita para ln y log decimal.
- Dominio, recorrido, cortes, asíntota vertical, límites, signo y monotonía según la base.
- Propiedades con sus condiciones, cambio de base y contraejemplos para sumas y potencias de argumentos negativos.
- Ecuación log₂(x−1)+log₂(x−3)=3: dominio x>3, candidatos 5 y −1, solución admisible 5.
- Estudio de log₂(x−1)−1, transformaciones C·logₐ(x−h)+k y curvatura opcional.
- Duplicación al 5 %: umbral continuo aproximado 14,207 años; primer año completo 15. Escala de factores decimales e índice hipotético de alcance con rendimiento marginal decreciente.
- Práctica −ln(x+1) y ln(x−2)=ln(5−x), con solución 7/2 y comprobación del dominio.
- Seis preguntas y seis tarjetas en `content/activities/logarithms.js`.

Modelo matemático: `content/models/logarithms.js`. Explorador: `assets/js/learning/logarithmic-explorer.js`. Conexión a la lección y al repaso: inicializador común y catálogo de actividades.

## Explorador

24 combinaciones: a en {2, 1/2}, C en {1, −1}, h en {−1, 0, 1} y k en {0, −1}. Se actualizan expresión, dominio, monotonía, cortes, límites, gráfica y tabla dentro de una operación `updateMath`.

La curva se muestrea geométricamente junto a x=h, siempre por la derecha y sin unir puntos fuera del dominio. La línea discontinua marca la vertical; el punto señalado es (h+1,k). Las ramas continúan fuera de la ventana. Se incluyen escalas, descripción textual, tabla con argumentos positivos y un aviso breve de actualización. Las respuestas del test no se reinician con los controles.

## Verificaciones realizadas

| Comprobación | Resultado |
|---|---|
| Pruebas acumuladas | 41 superadas |
| Modelos logarítmicos | 24 estados; dominio estricto, derivadas primera y segunda contrastadas numéricamente, monotonía y límites |
| Inversas y ecuaciones | Identidades con cuatro bases, puntos del estudio, práctica y rechazo de candidato inválido |
| Aplicaciones | Umbral continuo y entero, cambio de escala y comparación de incrementos del índice |
| Explorador en navegador | 24 combinaciones; valores de tabla, puntos de curva dentro del dominio y punto de referencia correctos |
| Cambios rápidos y teclado | Estado final coherente, foco operativo y selección previa del test conservada |
| Lección | Test 5/6 al primer intento con pista y reintento; seis tarjetas recorridas |
| Tema 2 | Test 30/30 |
| Lectura visual | 320/390 px, tamaño 200 %, contraste y resaltado sin desbordamiento global |
| Subcarpeta | Carga de lección, controles y fórmulas comprobada |
| Regresión | 2.1, filtros e índice 5/9; tres lecciones avanzadas de t01 y catálogo de 90 preguntas y 91 tarjetas |
| Enlaces | 171 HTML sin destinos locales rotos, anclas ausentes ni IDs duplicados |

Pruebas: `npm test`, `npm run test:logarithms`, `npm run test:representation` y `npm run test:advanced`, con el entorno de navegador habitual. Se realizó un barrido local de enlaces.

Capturas revisadas fuera del sitio publicado: `../tmp/logaritmos-explorador.png` y `../tmp/logaritmos-explorador-movil.png`.

## Estado y límites

23 lecciones desarrolladas, 90 preguntas base y 91 tarjetas. El tema 2 tiene 5 de 9 lecciones y 30 preguntas y tarjetas. Las configuraciones del explorador no son preguntas base adicionales ni un nuevo videojuego.

Se mantienen el diseño provisional, los roles editoriales, el motor MathJax y sus mecanismos de recuperación. No se añaden cuentas ni persistencia de respuestas. Los originales no se modifican. PDF, administración, traducción y voz continúan pendientes. La revisión visual y de teclado no sustituye la revisión con lectores de pantalla ni certifica WCAG.

Siguiente contenido: 2.6, funciones a trozos y valor absoluto.

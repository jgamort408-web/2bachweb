# Entrega 12: esquema general para representar una función

Fecha de cierre: 28 de septiembre de 2026.

## Contenido y procedencia

Lección: `libro/temas/02-representacion-de-funciones/01-esquema-general-para-representar-una-funcion.html`.

Se desarrolla el guion local 2.1: dominio, cortes, simetría, signo, continuidad, límites, asíntotas, monotonía, extremos y boceto coherente. La curvatura se presenta como ampliación opcional, según indica la fuente. Se explican las diferencias entre función positiva y creciente, extremo relativo y absoluto, candidato y extremo confirmado, hueco y asíntota.

- Ejemplo propio completo: f(x)=x³−3x; raíces −√3, 0 y √3; máximo relativo (−1,2), mínimo relativo (1,−2), simetría impar y sin asíntotas. Curvatura opcional con inflexión en (0,0).
- Práctica desarrollada: g(x)=x²−4x+3, tomada como función de partida de T2.10 y ampliada al estudio completo; mínimo absoluto (2,−1), cortes (1,0), (3,0) y (0,3).
- Contraste breve: (x²−1)/(x−1), recta con hueco en (1,2). No se cuenta como tercer estudio completo.
- Seis preguntas base: dos adaptadas de T2.1 y T2.10; cuatro originales sobre los conceptos de la lección. Seis tarjetas adaptan el método y conceptos del mazo local, con explicaciones ampliadas.

Los ejemplos propios no se atribuyen a un examen. Las fuentes originales y los paquetes LaTeX se conservan sin cambios.

## Archivos y funcionamiento

- `content/activities/function-study.js`: seis preguntas, soluciones, pistas, distractores y seis tarjetas.
- `content/models/function-study.js`: función cúbica, derivadas, raíces y extremos para la gráfica y su verificación.
- `assets/js/learning/function-study-explorer.js`: capas de cortes, extremos y curva; texto de estado y controles de teclado sin animación ni temporizador.
- `content/activities/catalog.js`: bancos por tema y consulta de tarjetas por tema o lección. El alias all-limits conserva solo el tema 1; all-course incluye lo disponible de ambos.
- `assets/js/learning/lesson.js`: conecta la gráfica y los bancos; el parámetro tema solo afecta a las vistas globales. Un valor desconocido muestra el catálogo completo, sin ejecutar contenido arbitrario.
- `test/index.html` y `tarjetas/index.html`: enlaces para todos los contenidos, tema 1 y tema 2. Cambiar de ámbito navega a una sesión nueva; no se guarda el progreso de la anterior.

La gráfica usa círculos para cortes y cuadrados para extremos. Su escala horizontal y vertical es distinta y se explica expresamente. Incluye descripción y tabla; no es necesario leer los píxeles para acceder a sus conclusiones. No modifica los SVG de MathJax.

## Pruebas ejecutadas

| Prueba | Resultado |
|---|---|
| Batería matemática acumulada | 25 pruebas superadas |
| Modelo cúbico | Raíces, simetría, signos, extremos y derivadas contrastadas numéricamente en 201 puntos |
| Práctica y contraejemplos | Identidades de la parábola y fracción, mínimo absoluto y punto estacionario sin extremo comprobados |
| Bancos | 60+6 preguntas y 61+6 tarjetas; el tema 1 conserva sus cifras |
| Lección 2.1 | Seis preguntas, pista, respuesta vacía y reintento; resultado 5/6 al primer intento |
| Tarjetas de la lección | Seis anversos y reversos recorridos; fórmulas sin errores |
| Test del tema 2 | Recorrido completo 6/6 |
| Filtros | Tema 1, tema 2 y selección desconocida comprobados en test y tarjetas |
| Gráfica y accesibilidad visual | Capas mediante teclado, texto al 200 %, contraste y resaltado; 320/390 px sin desbordamiento global |
| Subcarpeta | Lección, gráfica y mazo t02 operativos bajo un prefijo |
| Índice del tema 2 | Una lección disponible y ocho en preparación |
| Regresión del catálogo general | 66 preguntas y 67 tarjetas recorridas, además de las tres lecciones avanzadas del tema 1 |
| Enlaces | 171 HTML sin enlaces locales rotos, anclas inexistentes ni IDs duplicados |

Comandos: `npm test`, `npm run test:representation`, `npm run test:advanced`. Las pruebas de navegador necesitan el servidor local, Playwright y Chrome configurados. La comprobación de enlaces se realizó además sobre los HTML de la carpeta.

Capturas revisadas fuera del sitio publicado: `../tmp/representacion-capas.png` y `../tmp/representacion-200-movil.png`.

## Estado y límites

El curso tiene 19 lecciones desarrolladas de 86. El tema 2 está parcial: 2.1 aporta dos estudios completos, seis preguntas, seis tarjetas y una visualización. Su primer test y mazo no se presentan como cobertura del tema entero. Los cuatro videojuegos desarrollados siguen siendo los de t01; no se ha desarrollado todavía un laboratorio nuevo del tema 2.

Se conserva el diseño provisional y el motor LaTeX. No se han activado cuentas, historial ni nuevas integraciones externas. La revisión con lectores de pantalla, la traducción, la voz, los PDF y la administración mantienen sus tareas pendientes. Siguiente contenido: 2.2, funciones polinómicas.

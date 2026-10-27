# Verificación · Entrega 23

Fecha: 29 de septiembre de 2026.

## Resultado

Transforma la función desarrollado en `widgets/games/t02-b-transforma-la-funcion/` e insertado en `laboratorios/juegos/t02-b-transforma-la-funcion.html`. Enlaces añadidos al índice t02 y Laboratorios. Se conservan el diseño provisional y las 171 páginas HTML existentes. Estado del juego revisado; estado global t02 parcial.

## Reglas matemáticas

Representación: g(x)=a f(b(x−h))+k. Los botones actúan sobre la gráfica actual:

| Operación | Parámetros que cambian |
|---|---|
| Derecha/izquierda 1 | h±1 |
| Arriba/abajo 1 | k±1 |
| Alturas ×2 o ÷2 | a y k se multiplican o dividen por 2 |
| Reflejar en X | a y k cambian de signo |
| Anchuras ×2 o ÷2 | b se divide o multiplica por 2; h se multiplica o divide por 2 |
| Reflejar en Y | b y h cambian de signo |

Las escalas en valor absoluto están entre 1/4 y 4; h y k entre −6 y 6. Superar un límite no mueve la función ni aumenta el contador. Cada reto tiene una ruta generada dentro de los límites. Los objetivos son diferentes dentro de cada sesión.

Funciones base: x²+x, |x−1| y 1/(x−1). Hay dos retos por familia. La corrección compara coeficientes del polinomio; coeficiente y vértice del valor absoluto; o residuo, polo y desplazamiento de la racional. Se aceptan rutas con parámetros diferentes si representan la misma función en todo su dominio. No se decide el acierto mediante proximidad visual ni mediante muestreo.

Por ejemplo, para x²+x se acepta f(−x−1)=f(x). El punto de referencia mostrado corresponde a la transformación elegida; una transformación equivalente puede llevar ese punto original a otro punto de la misma curva, lo que se aclara en la descripción.

## Interacción

Gráfica objetivo discontinua, gráfica actual continua y original punteada opcional. Ventana común de −10 a 10 en ambos ejes; las ramas pueden continuar fuera. Las racionales se muestrean separadamente a ambos lados del polo. Título y descripción SVG, explicación textual y controles de teclado. La lista de movimientos es desplazable y enfocable.

Puntuación al resolver: máximo entre 10 y 100−5·movimientos. Volver a la original cuenta como un movimiento y conserva los anteriores; comprobar, pista y mostrar la original no cuestan movimientos. Mostrar solución entrega una ruta desde la original y permite continuar con 0 puntos. Se etiqueta como ruta de referencia, no como camino mínimo. El resumen no se guarda; solo se conservan preferencias de lectura por el runtime común.

## Archivos

- `model.js`: acciones puras, generación por semilla, equivalencia, puntos, expresiones y puntuación.
- `graph.js`: ramas, SVG y descripción de objetivo/actual.
- `widget.js`: sesión, controles, historial, foco y cola de renderizado MathJax.
- `index.html`, `style.css`: estructura semántica, instrucciones y disposición responsive.
- `tests/function-transformer.test.mjs` y `tests/function-transformer-23-browser.cjs`.
- Estado editorial, README, procedencia, auditoría y plan actualizados.

## Resultados ejecutados

- **69 pruebas acumuladas superadas.**
- 1000 semillas: 6000 objetivos reproducibles, distintos dentro de la sesión, con rutas válidas que producen la función solicitada.
- Cada acción contrastada con la composición de la función original; se verifican orden no conmutativo, equivalencias con parámetros distintos, dominio racional, correspondencia de puntos, límites y puntuación.
- Muestras de gráfica finitas y ramas racionales separadas por el polo.
- Navegador: seis retos, comprobación incorrecta, pista, orden subir/escalar, reinicio que conserva movimientos, ruta equivalente con parámetros distintos, solución a cero, puntuación exacta y bloqueo de doble puntuación.
- Nueva sesión con nueva semilla; bloqueo de escalado fuera de límites sin aumentar contador.
- Teclado, original opcional, móvil 320 px, texto 200 %, contraste y resaltado; estado conservado al cambiar preferencias.
- Iframe: preferencias transmitidas desde anfitrión y movimientos funcionales. Subcarpeta: carga y solución correctas.
- Fórmulas: se exige presencia de contenedores MathJax en objetivo y función actual, sin errores ni delimitadores visibles.
- Regresión Construye la gráfica: 12 retos / 48 gráficas con una fórmula renderizada en cada solución.
- 171 HTML comprobados: sin rutas o fragmentos locales rotos ni IDs duplicados.
- Capturas: `../../tmp/transforma-funcion-escritorio.png` y `../../tmp/transforma-funcion-movil.png`.

## Incidencia corregida

La primera prueba de navegador no encontraba MathJax: los delimitadores escritos en cadenas JavaScript se eliminaban al interpretar escapes. Se usa `String.raw` para conservarlos. La misma comprobación descubrió el problema en la solución final de Construye la gráfica y se corrigió allí. Se reforzaron ambas pruebas para exigir fórmulas renderizadas, no solo ausencia de errores. Las dos pruebas finales pasan. El motor MathJax compartido permanece sin cambios.

## Límites y siguiente entrega

No se ha completado la revisión con lectores de pantalla ni pronunciación matemática. Voz, traducción, administración central, biblioteca PDF y cuentas siguen en fases pendientes. No se repitieron los ensayos de fallos de red del motor de fórmulas, que no se modifica. Total del curso: 27 lecciones, 120 preguntas base y 115 tarjetas; variantes procedurales aparte.

Siguiente: Optimiza, último laboratorio del tema 2 antes de su revisión global.

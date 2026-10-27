# Verificación · Entrega 35

Fecha: 5 de octubre de 2026.

## Resultado

[Método correcto](../laboratorios/juegos/t03-b-metodo-correcto.html) disponible como página anfitriona y [widget independiente](../widgets/games/t03-b-metodo-correcto/index.html). Ocho retos por sesión, cada uno con una decisión de estrategia y otra de familia de primitivas. El segundo paso se desbloquea al terminar el primero.

Nueve widgets desarrollados. Totales del curso conservados: **35 lecciones, 180 preguntas base y 163 tarjetas**. El tema 3 sigue parcial por Área por tramos, revisión conjunta y accesibilidad global.

## Archivos y arquitectura

Desde la raíz web:

- `widgets/games/t03-b-metodo-correcto/generator.js`: generación reproducible por semilla, funciones matemáticas y transiciones puras de sesión.
- `widget.js`, `index.html` y `style.css` de la misma carpeta: controlador, instrucciones y estilos locales.
- `laboratorios/juegos/t03-b-metodo-correcto.html`: anfitrión, inserción y refuerzo.
- Portada, Laboratorios, índice y cierre de t03: conexiones con el juego.
- `tests/method-choice.test.mjs` y `tests/method-choice-35-browser.cjs`: pruebas.
- `tests/primitive-pairs-34-browser.cjs`: selector del enlace a Parejas de primitivas precisado, al existir ahora dos enlaces en la ruta.

Se reutilizan el servicio de fórmulas y las preferencias compartidas. Sin cambios en esos motores ni en el diseño general. Las respuestas y puntos permanecen solo en memoria.

## Matemáticas y reglas

Cuatro estrategias, con dos retos por categoría:

| Ruta propuesta | Patrones |
|---|---|
| Inmediata | Potencia de x; múltiplo de eˣ. |
| Cadena al revés | Cociente con numerador proporcional a la derivada del denominador; exponencial de función afín. |
| Simplificar primero | División término a término por x; desarrollo de (x+b)²−x². |
| Por partes, ampliación | Múltiplo de xeˣ; múltiplo de ln x. |

Las instrucciones concretan la convención de clasificación y reconocen otros caminos válidos. Los dos retos por partes se identifican como ampliación. En los logaritmos se explica la positividad del argumento; cancelar x no restituye cero al dominio de la expresión original.

Cada elección de primitiva ofrece la familia correcta, una primitiva particular sin C, el doble y la opuesta. La corrección diferencia ausencia de C, factor y signo. Tras cerrar el paso se muestran transformación, familia y comprobación por derivación.

Dos intentos por paso: 100 puntos al primero, 50 al segundo y 0 tras dos errores, con solución. Máximo 1600. Pistas sin penalización y contabilizadas una vez por paso. Sin reloj. El resumen reúne las ocho soluciones explicadas.

## Verificación matemática y de estado

**117 pruebas acumuladas superadas**, incluidas cuatro nuevas:

- 1000 semillas, 8000 integrandos y dos retos de cada estrategia por sesión.
- Primitivas contrastadas por diferencias finitas en cinco puntos del intervalo, incluidos puntos negativos cuando corresponde.
- Una sola familia completa correcta entre cuatro opciones; la opción sin C conserva una derivada válida.
- Reproducibilidad y variedad, ausencia de opciones repetidas.
- Sesión perfecta de 1600 puntos; sesión con reintento y solución mostrada de 1400.
- Bloqueo de doble puntuación, avance antes de tiempo, pistas repetidas y opciones inválidas o de otra fase.

La revisión de las ocho reglas analíticas se complementa con el contraste numérico; no se presenta el muestreo como demostración general.

## Navegador

`tests/method-choice-35-browser.cjs` superado:

- Dos sesiones completas, 32 decisiones, 1400/1600 y 1600/1600.
- Selección vacía, elección de otra estrategia, pista repetida, error por factor, signo y ausencia de C.
- Bloqueo de respuestas al cerrar un paso y desbloqueo de resolución; ocho soluciones en el resumen.
- Fórmulas del enunciado, cuatro opciones y explicaciones procesadas, sin errores MathJax ni delimitadores sin procesar.
- Teclado mediante Espacio y Enter, lectura al 200 %, contraste y resaltado, móvil de 320 px sin desbordamiento global.
- Selección conservada al cambiar preferencias y eliminada al recargar; reinicio con semilla nueva.
- Iframe y subcarpeta: preferencias propagadas y dos pasos corregidos dentro del widget.
- Navegación desde la ruta del tema a su anfitrión, sin errores JavaScript o HTTP.

Capturas inspeccionadas: `../../tmp/metodo-correcto-estrategia.png`, `../../tmp/metodo-correcto-primitiva.png` y `../../tmp/metodo-correcto-movil.png`. Conservan el diseño provisional y muestran legibles las opciones y fórmulas.

Revisión estática: 171 HTML sin rutas locales rotas, fragmentos ausentes ni identificadores duplicados. Enlaces de README, auditoría de t03 y esta verificación comprobados.

## Límites y siguiente paso

Los ensayos de recuperación de MathJax existentes no se repiten porque su motor no cambia. La revisión completa con lectores de pantalla y pronunciación matemática sigue pendiente; las pruebas de teclado y ampliación no la sustituyen.

PDF de exámenes, administración central, voz, traducción y cuentas futuras permanecen pendientes. Los materiales originales se conservan.

Siguiente: **Área por tramos**, después recorrido conjunto de los tres juegos de integrales.

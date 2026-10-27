# Entrega 14: funciones racionales

Fecha: 28 de septiembre de 2026.

## Contenido

Página: `libro/temas/02-representacion-de-funciones/03-funciones-racionales.html`.

Dos estudios principales de elaboración propia:

1. f(x)=(x²−1)/(x²−x−2): dominio R salvo −1 y 2; hueco (−1,2/3), vertical x=2, horizontal y=1, cortes, signo y decrecimiento por intervalos. Se justifica el recorrido R salvo 1 y 2/3 en una ampliación.
2. g(x)=x²/(x−1): dominio R salvo 1; vertical x=1, oblicua y=x+1, máximo relativo (0,0), mínimo relativo (2,4) y recorrido (−∞,0] unido a [4,+∞).

La práctica guiada u(x)=(x−3)/(x+2) revisa dominio, cortes, asíntotas, signo y crecimiento. El contraejemplo x/(x²+1) muestra que una horizontal puede cruzarse. Se añaden seis preguntas base con explicaciones y seis tarjetas.

Las dos gráficas se calculan por ramas separadas: no unen puntos a través de una asíntota. El hueco se marca abierto. Se explican las escalas y se proporcionan descripciones textuales; los cálculos no dependen de leer los píxeles.

## Explorador

`content/models/rational-functions.js` separa los modelos y sus condiciones de dominio. `assets/js/learning/rational-explorer.js` conecta controles, fórmulas, diagnóstico y tabla mediante updateMath, y dibuja las gráficas de los estudios.

Se estudian k(x−a)/(x−a), k(x−a)²/(x−a) y k(x−a)/(x−a)², con a en {−1,1,2} y k en {−2,2}. Son 18 configuraciones: hueco de valor k, hueco de valor 0 o polo con límites laterales de signos opuestos. El punto x=a permanece excluido en todas.

La tabla usa distancias 0,5; 0,1 y 0,01 a ambos lados. La explicación algebraica justifica el límite; la tabla solo lo ilustra. Cada cambio se serializa con la representación de fórmulas para conservar un resultado coherente incluso al alternar opciones rápidamente. No se guardan resultados ni se añade un temporizador.

## Verificación

| Control | Resultado |
|---|---|
| Pruebas matemáticas acumuladas | 33 superadas |
| Primera racional | Dominio, identidad reducida, derivada numérica, hueco, límites laterales y horizontal |
| Segunda racional | División, derivada numérica, clasificación de extremos y valores de ambas ramas |
| Práctica resuelta | Cortes, signos laterales y crecimiento contrastados |
| Explorador | 18 configuraciones verificadas numéricamente y en navegador; punto excluido y tablas correctos |
| Cambios rápidos | Estado final de expresión y tabla coherente; selección previa del test conservada |
| Test y tarjetas de lección | Resultado 5/6 al primer intento con pista y reintento; seis tarjetas recorridas |
| Test del tema 2 | 18/18 |
| Regresión general | 78 preguntas y 79 tarjetas recorridas junto a tres lecciones avanzadas de t01 |
| Accesibilidad visual | Teclado, 320/390 px, texto 200 %, contraste y resaltado sin desbordamiento global |
| Subcarpeta | Lección, controles y LaTeX operativos |
| Enlaces | 171 HTML sin destinos locales rotos, anclas ausentes ni IDs duplicados |

Comandos: `npm test`, `npm run test:rational`, `npm run test:advanced`, con el entorno de navegador habitual. La validación de enlaces se ejecutó sobre los HTML locales.

Capturas de revisión fuera del sitio publicado: `../tmp/racional-hueco-y-asintotas.png`, `../tmp/racional-oblicua.png` y `../tmp/racionales-explorador-movil.png`.

## Alcance y continuación

El curso tiene 21 lecciones desarrolladas, 78 preguntas base y 79 tarjetas. T02 tiene 3 de 9 lecciones, 18 preguntas y 18 tarjetas. Las configuraciones del explorador no se cuentan como preguntas base ni como un videojuego nuevo.

Se conserva el diseño provisional y el motor LaTeX. No se modifican los originales ni se compilan PDF o activan servicios externos. La revisión con lectores de pantalla y las demás fases globales siguen pendientes. Siguiente contenido: 2.4, funciones exponenciales.

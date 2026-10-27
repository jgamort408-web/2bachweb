# Estructura editorial y diseño futuro

## Acuerdo de esta fase

El diseño actual es provisional y se conserva mientras se desarrolla el contenido. La futura identidad visual tendrá tipografías y estilos distintos según la función de cada texto. No se eligen todavía familias de letra, tamaños, colores ni composiciones definitivas.

Las fórmulas se escriben en LaTeX y conservan el motor matemático común. No convertirlas en texto con fuentes decorativas ni aplicar reglas tipográficas globales al interior de los contenedores de MathJax.

## Tipos de contenido

Usar HTML semántico y el atributo data-content-role para que el futuro CSS pueda distinguir los bloques sin reescribir las lecciones:

| Valor del atributo | Función editorial | HTML habitual |
|---|---|---|
| lesson-title | Nombre del epígrafe | h1 |
| introduction | Presentación breve | p |
| objectives | Qué aprenderá el estudiante | p o sección |
| prerequisites | Conocimientos necesarios | p |
| context | Situación o interpretación aplicada | sección o p |
| explanation | Desarrollo conceptual | sección |
| definition | Definición con hipótesis y notación | div o sección |
| rule | Propiedad o criterio | div o sección |
| comparison | Comparación de casos o conceptos | sección con tabla o lista |
| method | Procedimiento paso a paso | sección con ol |
| worked-example | Ejemplo completamente resuelto | sección |
| worked-steps | Pasos de resolución | ol |
| visualization | Gráfica, tabla o explorador | sección o div |
| caption | Pie o descripción de una representación | caption o figcaption |
| guided-practice | Ejercicio con ayudas | sección |
| hint | Ayuda gradual | details |
| solution | Resolución desplegable | details |
| self-check | Actividad autocorregida | div |
| warning | Error frecuente o condición que no se debe olvidar | div o sección |
| summary | Síntesis del epígrafe | sección |
| related-links | Continuación y repaso | nav o p |
| question | Enunciado de una actividad | legend |
| answer-option | Texto de alternativa | span dentro de label |
| feedback | Corrección razonada | div con role=status |
| activity-progress | Posición en la sesión | p |
| flashcard-front / flashcard-back | Pregunta / respuesta de tarjeta | h2 / p |

Estos atributos identifican el contenido, sin alterar el aspecto. No sustituyen la jerarquía h1–h2–h3, los labels, las listas ni los elementos nativos accesibles.

## Reglas para el futuro cambio de estilo

1. Mantener textos y bancos de preguntas independientes de la presentación.
2. Definir tipografías para títulos, lectura, ayudas y controles mediante variables CSS compartidas.
3. Aplicar estilos por función editorial; no añadir formato en línea a cada frase.
4. Conservar la salida SVG/MathML de MathJax. Revisar específicamente el espacio alrededor de las ecuaciones.
5. Verificar contraste, zoom, longitud de línea y móvil cuando se elija el diseño.
6. Usar la misma clasificación en widgets y páginas, con estilos compartidos e independencia de cada juego.

El atributo puede situarse en un bloque que contiene fórmulas; el rediseño debe actuar sobre el texto circundante sin seleccionar ni sustituir los glifos matemáticos.

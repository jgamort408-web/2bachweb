# Entrega 10: ampliación de Límite Express

Fecha: 27 de septiembre de 2026.

## Contenido implementado

Se completa la mecánica específica del laboratorio 1A descrita en Planificacion_Interactiva_2Bach_CC_Sociales/01_Laboratorios_Minijuegos_2Bach_CC_Sociales.md, en la carpeta superior al proyecto:

- Diez preguntas por sesión con cuatro alternativas.
- Nivel 1, preguntas 1–3: sustitución en polinomios de grados 1, 2 y 3.
- Nivel 2, preguntas 4–6: lectura gráfica y una selección de laterales, racionales, comportamiento al infinito o asíntotas.
- Nivel 3, preguntas 7–8: indeterminaciones mediante factorización, conjugado o común denominador.
- Nivel 4, preguntas 9–10: elección del método algebraico según la estructura.
- Cada tres preguntas acertadas, la siguiente se convierte en ronda especial con indeterminación. Se mantiene el total de diez; en una sesión perfecta las especiales son la 4, la 7 y la 10.
- Práctica sin reloj y reto de 20 segundos, con indicador circular, pausa y resumen por niveles.

Las rondas especiales pueden adelantar una técnica de indeterminaciones respecto al nivel ordinario. Sus pistas y soluciones siguen disponibles. Los aciertos tras reintento también cuentan para activar las especiales y mantener la racha; agotar ambos intentos o el tiempo rompe la racha. Las instrucciones explican esta elección.

## Gráficas y accesibilidad

Las funciones gráficas tienen dos ramas afines y un valor puntual independiente. Pueden pedir límite izquierdo, derecho o bilateral; se incluyen casos de laterales iguales y distintos. Las coordenadas de los extremos y del punto aislado son exactas.

Cada gráfica ofrece:

- Ejes, etiquetas numéricas, rejilla, círculos vacíos y punto relleno.
- Descripción textual equivalente de la información visual.
- Tabla de valores de las aproximaciones y del valor puntual.
- Botón para acercar puntos por etapas y otro para animarlos.
- Animación desactivada cuando se solicita movimiento reducido; el avance manual sigue disponible.

La corrección se basa en los datos matemáticos de las ramas, no en los píxeles ni en el último valor de la tabla. Los laterales finitos distintos no se promedian. El valor puntual no determina el límite.

## Puntuación y reloj

100 puntos al primer intento, 60 tras reintentar y 50 si se utilizó pista; máximo de 1000 por sesión. Se muestra la racha actual, la mejor y el resultado por nivel. Una respuesta vacía no consume intento, y los envíos repetidos después de terminar una pregunta no vuelven a puntuar.

La cuenta atrás espera a que se hayan representado el enunciado y las alternativas. Durante la pausa se deshabilitan las respuestas y se detiene la animación. Al agotarse el tiempo se muestra la solución y se espera a que el alumno continúe. El modo libre no caduca.

No se han añadido los extras generales opcionales de la planificación, como multiplicadores, escudos, misiones o bonus de rapidez. La puntuación elegida favorece el cálculo y el uso de pistas; la modalidad cronometrada es voluntaria.

No hay cuentas, historial guardado ni servicios externos nuevos.

## Archivos y separación de responsabilidades

Dentro de widgets/games/t01-a-limite-express/:

- generator.js conserva las nueve familias algebraicas anteriores y sus comprobaciones.
- session.js organiza niveles, selección reproducible de variantes, preguntas nuevas, rondas especiales y puntuación.
- graph.js representa las ramas y la tabla; controla el avance manual, animación y movimiento reducido.
- widget.js conecta la sesión con formularios, MathJax y reloj.
- index.html y style.css proporcionan los controles con la base visual compartida.

Las semillas se mezclan antes de usar el generador para evitar que valores consecutivos seleccionen solo un pequeño subconjunto de familias. No se utiliza eval. Las alternativas se barajan al presentarse.

Los casos nuevos son elaboración propia sobre el guion y la planificación local. La elección de métodos reutiliza las expresiones y desarrollos ya comprobados de las familias algebraicas. Se añade expresamente el distractor 0/0, con explicación de que una indeterminación no es el resultado del límite.

## Pruebas ejecutadas

| Control | Resultado |
|---|---|
| Pruebas acumuladas | 22 pruebas matemáticas y de estado superadas |
| Generación nueva | 1000 semillas × 10 posiciones × variantes normal/especial: 20.000 rondas comprobadas |
| Polinomios | Valor del límite contrastado evaluando los coeficientes expandidos |
| Gráficas | Laterales izquierdo/derecho/bilateral, igualdad y desigualdad, punto distinto y aproximaciones comprobados |
| Cobertura | Todas las familias previstas aparecen al recorrer semillas; cuatro alternativas textualmente distintas por pregunta |
| Estado de sesión | Pistas, reintento, dos fallos, expiración, rachas, resumen por niveles y ausencia de doble puntuación |
| Sesiones perfectas | 200 semillas con especiales 4/7/10, cuatro niveles, al menos una gráfica y 1000 puntos |
| Regresión algebraica | Se mantienen las pruebas anteriores de 10.000 preguntas de las nueve familias |
| Partida en navegador | Diez aciertos, una pista y un reintento: 910 puntos, nueve al primer intento, racha 10 |
| Gráfica interactiva | Avance con teclado, animación, parada y cambio a movimiento reducido |
| Modo libre | Respuesta aceptada tras más de un minuto simulado sin caducidad |
| Modo reto | Pausa durante un minuto simulado; diez preguntas agotadas y resumen cero |
| Recuperación LaTeX | Descarga bloqueada y recuperación manual; reloj conservado en 20 segundos hasta poder empezar |
| Presentación | Fórmulas sin merror, recorrido a 390 px, comprobación a 320 px y texto base al 200 % en escritorio |
| Inserción | Actividad independiente y dentro de su anfitrión, también bajo subcarpeta |
| Regresión de contenido | Batería de entrega 03: tres lecciones, nueve preguntas, explorador y sesión actual del widget |
| Enlaces | 171 HTML sin destinos locales ausentes, anclas inexistentes ni IDs duplicados |
| Revisión visual | Lectura gráfica en móvil y elección de método en escritorio |

Pruebas mantenidas: tests/express-session.test.mjs, incluida en npm test; tests/express-10-browser.cjs, mediante npm run test:express. Se adaptaron las pruebas anteriores que abrían el widget para que seleccionen ahora la modalidad. Las capturas se guardan en tmp de la raíz de trabajo.

## Límites y siguiente entrega

Se conserva el diseño provisional y el motor MathJax. La recuperación probada corresponde a este juego; no representa una prueba de carga del alojamiento. Las comprobaciones de teclado, ampliación y movimiento reducido no sustituyen una auditoría completa con lectores de pantalla.

Los cuatro laboratorios de t01 están desarrollados. El cierre global del tema sigue pendiente de una revisión conjunta de contenido, accesibilidad y coherencia de navegación. El banco editorial continúa en 60 preguntas base, 61 tarjetas y 15 problemas inventariados; las variantes procedurales no incrementan esos mínimos.

La compilación de exámenes y soluciones, el resto del curso, idiomas, voz y administración global conservan sus fases del plan.

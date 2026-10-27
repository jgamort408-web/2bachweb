# Verificación · Entrega 30

Fecha: 30 de septiembre de 2026.

## Resultado

3.6. Teorema fundamental del cálculo desarrollada. Enunciado con continuidad, intervalo y puntos interiores; A(a)=0, distinción entre integrando, acumulación y pendiente; intuición por franjas y cota justificativa. Crecimiento y extremos, ejemplos con dato inicial y tasa neta, derivación sin calcular previamente una primitiva y práctica resuelta.

Se explican dos discontinuidades con comportamientos distintos: salto que impide derivar A en cero y modificación de un valor aislado que deja A derivable pero rompe A′(0)=f(0). Se añaden ampliaciones de extremo compuesto y límite inferior variable. Seis preguntas y seis tarjetas. Puente conceptual hacia Barrow, cuya práctica sistemática sigue pendiente en 3.7.

Totales: 33 lecciones, 156 preguntas base y 151 tarjetas. Tema 3: 6/8 lecciones, 36 preguntas y 36 tarjetas.

## Explorador y archivos

- `content/models/fundamental-calculus.js`: integrandos t−1, t²−1, |t| y salto −1/1; acumulación desde a∈{−1,0,1}; x de −2 a 2 en pasos de 0,5; h∈{0,5; 0,1; 0,01}. Son 324 configuraciones, más el control visual de secantes.
- `assets/js/learning/fundamental-explorer.js`: dos gráficos con eje horizontal común y escalas verticales distintas, declaradas en la explicación. Integrando con regiones rayadas y punto f(x); acumulación con origen (a,0), punto (x,A(x)), tangente y secantes izquierda/derecha.
- El salto se dibuja como dos ramas separadas, con punto abierto y cerrado en cero. Se omite la tangente de A en ese punto; las secantes mantienen pendientes −1 y 1. El cociente simétrico cero no se presenta como derivada.
- Los marcadores, trazos y textos complementan los colores. La tabla ofrece valores en x−h, x y x+h; se indica el redondeo a seis decimales. El valor aproximado de A se escribe con ≈.
- `libro/temas/03-integrales/06-teorema-fundamental-del-calculo.html`, `content/activities/fundamental-calculus.js`, catálogo, inicialización, estilos acotados, estado editorial, índices, portada, README, plan y procedencia completan la integración.

## Pruebas

**97 pruebas acumuladas superadas.** `tests/fundamental-calculus.test.mjs` incluye:

- 324 estados: acumulación contrastada mediante cuadratura de dos nodos interiores por tramo, exacta para los integrandos polinómicos usados y separando cero cuando hace falta. Se contrasta A(a)=0 y cada cociente lateral; no se verifica solo contra la propia primitiva del modelo.
- Diferencias centrales para la derivada donde existe, convergencia de las dos secantes, invarianza de pendientes al cambiar a y cambio constante de A. En el salto se exige pendiente indefinida, laterales distintos y cociente simétrico cero.
- Ejemplos, extremos, datos iniciales, depósito positivo en el intervalo, cadena y límite inferior. La acumulación de e^(−t²) se calcula con Simpson para comprobar su derivada numéricamente.
- Discontinuidad de valor aislado, entradas no válidas, bancos separados, identificadores y opciones únicas.

`tests/fundamental-calculus-30-browser.cjs` recorre 36 combinaciones de familia/a/x y verifica valores, pendientes, posición de puntos, presencia/ausencia de tangente y ramas del salto. Prueba las tres distancias h, secantes ocultables, extremos del control de x mediante Home/End y cambios consecutivos. La respuesta del test se conserva.

Test 5/6 con pista/reintento y reinicio; seis tarjetas reveladas; justificación, ampliación y solución desplegadas. Se exige renderizado MathJax, ausencia de errores y delimitadores pendientes. Móvil 320 px, texto al 200 %, contraste y resaltado; tabla desplazable con teclado, sin desbordamiento global. Fórmulas anchas conservan desplazamiento local. Recargar elimina las respuestas. Filtros t03 36/36, índice 6/8 y funcionamiento bajo subcarpeta con cabecera y pie.

Regresión general: tres lecciones avanzadas t01 y recorrido de 156 preguntas y 151 tarjetas. Revisión de 171 HTML: cero rutas locales rotas, fragmentos ausentes o IDs duplicados.

Capturas revisadas: `../../tmp/teorema-fundamental-explorador.png` y `../../tmp/teorema-fundamental-movil.png`. Tras la inspección se reemplazó la descripción informal de la integral en la introducción del explorador por su notación LaTeX y se repitió su prueba de navegador.

## Límites y siguiente entrega

Se mantiene el diseño provisional. El motor MathJax no cambia; no se repiten sus ensayos de fallos de red. Lectores de pantalla y pronunciación matemática siguen pendientes; no se declara certificación de accesibilidad. PDF, administración central, traducción, voz y extensión futura de cuentas continúan en sus fases previstas.

Siguiente: **3.7. Regla de Barrow**, sustitución de extremos, signos y dominios, con ejemplos revisados y práctica sistemática.

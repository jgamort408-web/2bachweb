# Verificación · Entrega 28

Fecha: 29 de septiembre de 2026.

## Resultado

3.4. Métodos de integración desarrollada: elección del procedimiento, simplificación algebraica, conservación del dominio y cambio de variable completo. Cinco ejemplos nucleares, práctica con dato inicial y ampliaciones de descomposición con dos factores lineales e integración por partes. La guía reconoce que puede haber varios procedimientos válidos.

Taller de seis transformaciones procedurales con corrección, pista, reintento y desarrollo hasta una primitiva. Seis preguntas base y seis tarjetas nuevas. Totales: 31 lecciones, 144 preguntas base y 139 tarjetas. Tema 3: 4/8 lecciones y bancos de 24 preguntas y 24 tarjetas. Las variantes se cuentan aparte y no sustituyen al laboratorio futuro «Método correcto».

## Procedencia y M13

Se leyó el guion 3.4 y se buscaron integrales y métodos en los `.tex` de los 30 ZIP locales. Se adaptó el ejercicio 3 de F029 (primer documento de main.tex, líneas 256–269), corrigiendo la igualdad falsa ∫1/(1−x) dx=x y usando el valor absoluto para cubrir ambos intervalos del dominio. La derivada del desarrollo revisado recupera h(x)=x²+e^(2x)−1/(1−x).

M13 queda registrada en el inventario de la carpeta superior y en el registro de procedencia. El ZIP no se modifica. Corregir la copia LaTeX y compilar los PDF sigue pendiente en la fase de recursos; esta entrega no declara ese paquete completado.

## Archivos (desde la raíz web)

- `libro/temas/03-integrales/04-metodos-de-integracion.html`.
- `content/models/integration-methods.js`: generador reproducible de seis familias, transformaciones, integrandos recuperados en x y primitivas numéricas.
- `content/activities/integration-methods.js`: preguntas y tarjetas editoriales.
- `assets/js/learning/integration-methods-practice.js`: montaje con el motor común de test.
- `content/activities/catalog.js`, `assets/js/learning/lesson.js`, `assets/css/learning.css`: integración y tabla desplazable.
- `config/editorial.json`, índices, portada, README, plan, procedencia e inventario.

## Pruebas

**89 pruebas acumuladas superadas.** Las cuatro nuevas de `tests/integration-methods.test.mjs` comprueban:

- 1000 semillas, 6000 transformaciones y 24000 opciones: igualdad con el integrando original, aplicación de du/dx en los cambios de variable y una sola alternativa correcta entre las propuestas. Las primitivas se contrastan por diferencias centrales en varios puntos.
- Desarrollo, división, cancelación, sustitución con raíz, recíproca de b−x y exponencial compuesta. Se incluyen ambos signos de coeficientes, ambos lados de singularidades y el punto x=0 en sustituciones cuadráticas.
- Dominio original conservado: en la cancelación, la fórmula de la primitiva admite evaluar el punto excluido pero el integrando original no está definido allí.
- Ejemplos, ampliaciones y condición inicial F(0)=0; regresión específica del error M13, signo y dominio del logaritmo.
- Variedad de al menos 110 sesiones entre las 1000 semillas probadas, reproducibilidad e identificadores únicos. No se exige que dos semillas distintas den siempre preguntas distintas: las combinaciones numéricas son finitas. Se retiró del primer ensayo esa suposición incorrecta, manteniendo la comprobación global de variedad.

`tests/integration-methods-28-browser.cjs` recorre dos rondas de seis transformaciones y seis preguntas fijas, con resumen 5/6 y 6/6, respuesta vacía, pista, segundo intento, bloqueo tras resolver y reinicio. Revisa seis tarjetas, la solución y las tres secciones desplegables. La práctica conserva la respuesta del test independiente y recargar borra las respuestas.

Se exige presencia de MathJax en enunciados, opciones y correcciones; no hay errores matemáticos ni delimitadores pendientes. Móvil 320 px con texto al 200 %, contraste y resaltado; tabla desplazable con teclado y Comprobar activado con Enter. No hay desbordamiento horizontal global; las fórmulas largas usan desplazamiento local. Se prueban filtros t03 24/24, índice 4/8, ejecución bajo subcarpeta, cabecera y pie.

Regresión general: tres lecciones avanzadas t01 y banco acumulado de 144 preguntas/139 tarjetas. Revisión de 171 HTML: cero rutas locales rotas, anclas ausentes o IDs duplicados.

Capturas revisadas: `../../tmp/metodos-integracion-tabla.png` y `../../tmp/metodos-integracion-movil.png`.

## Límites y siguiente contenido

Diseño provisional conservado. El motor MathJax no cambia y no se repiten sus ensayos de fallos de red. Lectores de pantalla y pronunciación matemática siguen pendientes; las pruebas no certifican accesibilidad. Recursos PDF, administración central, traducción, voz y extensión de cuentas continúan en sus fases previstas.

Siguiente: **3.5. Integral definida**, acumulación, área con signo y propiedades, con interpretación gráfica.

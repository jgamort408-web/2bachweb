# Verificación de la entrega 02

Fecha: 16 de septiembre de 2026.

## Alcance terminado

- Epígrafes 1.3, 1.4, 1.5 y 1.6 con teoría, condiciones, ejemplos, práctica guiada, tres preguntas autocorregidas por epígrafe y resumen.
- Dos exploradores: signo/potencia de un denominador cerca de 2 y modelo de saturación.
- Banco acumulado: 18 preguntas y 20 tarjetas.
- Límite Express ampliado a siete familias. El juego completo continúa pendiente de lectura gráfica, niveles y modalidades.
- Clasificación editorial mediante data-content-role; documentada para el futuro diseño.

## Resultados

| Comprobación | Resultado |
|---|---|
| 1.000 semillas y 10.000 preguntas | Siete familias cubiertas, alternativas únicas y soluciones contrastadas |
| Catálogo | Tres preguntas por cada uno de los seis epígrafes; 20 tarjetas con IDs únicos |
| HTML | 171 documentos revisados sin destinos locales inexistentes, anclas rotas ni IDs duplicados |
| Lecciones nuevas | Fórmulas renderizadas sin errores detectados y práctica vinculada al epígrafe correcto |
| Explorador de asíntota | Signos correctos en las tres funciones; −3/(x−2)² a distancia 0,0001 da −300.000.000 a ambos lados |
| Saturación | M=2000 produce N(4)=1000 y diferencia 20 en t=396 |
| Corrección | Probados error inicial, pista y segundo intento correcto en cada lección |
| Sesión de test | 18/18 respuestas correctas en la prueba completa |
| Widget | Sesión 10/10 y siete familias presentadas en viewport de 350 px |
| Móvil de 390 px | Sin desbordamiento horizontal del documento en las cuatro lecciones |
| Rutas con prefijo /curso/ | Cuatro lecciones nuevas y widget embebido funcionan dentro de la subcarpeta |
| Motor LaTeX | Regresión superada: fallos de descarga, recuperación, conservación de respuesta, 60 solicitudes agrupadas y ocho páginas simultáneas |
| Revisión visual | Ecuaciones con raíces/valor absoluto en escritorio y explorador de saturación en móvil |

## Diseño

No se han cambiado los archivos CSS, las fuentes ni la configuración de LaTeX. Se han añadido categorías semánticas a los textos estáticos y a las preguntas, opciones, pistas y tarjetas dinámicas. La apariencia definitiva sigue pendiente.

## Pruebas mantenidas

- tests/generators.test.mjs: banco y generadores.
- tests/lessons-02-browser.cjs: cuatro lecciones, exploradores, caminos de respuesta y sesión del widget.
- tests/math-browser.cjs: motor, recuperación, concurrencia, test acumulado y widgets.

La comprobación de rutas con prefijo y de enlaces se realizó además mediante scripts temporales de revisión, sin añadirlos a la web.

## Límites

La verificación local no equivale a una auditoría con lector de pantalla real ni a una prueba de capacidad del alojamiento público. Los PDF, las integraciones de idiomas/voz, el panel administrativo y el resto del curso continúan pendientes según el plan.

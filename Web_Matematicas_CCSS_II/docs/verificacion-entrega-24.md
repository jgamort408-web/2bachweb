# Verificación · Entrega 24

Fecha: 29 de septiembre de 2026.

## Resultado

Optimiza desarrollado en `widgets/games/t02-c-optimiza/`, insertado en `laboratorios/juegos/t02-c-optimiza.html` y enlazado desde Laboratorios e índice t02. Se utilizan las páginas existentes y el diseño provisional. Hay 171 HTML. El juego se marca revisado; t02 conserva estado parcial.

La actividad sigue el Laboratorio 2C del plan original: cuatro microhistorias de elaboración propia y cinco decisiones por historia, veinte por sesión. Cada paso repite el contexto para poder resolverlo aunque el anterior fuera incorrecto. Se reutiliza el motor común de test: dos intentos, pista, corrección, explicación y resumen de aciertos al primer intento, sin límite de tiempo. Una pista no penaliza ese contador. Reiniciar genera nuevos datos; no se guarda historial.

## Modelos y restricciones

| Historia | Modelo | Casos comprobados |
|---|---|---|
| Beneficio | Precio p−q, coste cq+F; B=q(p−q)−(cq+F), cantidades divisibles en [0,K] | Vértice dentro o fuera de la capacidad; extremos incluidos; beneficio positivo o máximo negativo; coste fijo también en q=0. |
| Coste por unidad | C=q²+s², M=C/q, q>0 | Raíz −s inadmisible; mínimo absoluto en s, valor 2s; coste total 2s²; límites +∞ en ambas fronteras. |
| Recinto con pared | 2x+y=L, A=x(L−2x), 0<x<L/2 | Máximo interior en L/4; área L²/8; dimensiones positivas; límites de área 0 no alcanzados, sin mínimo positivo. |
| Ingreso por paquetes | Precio P−2q, R=Pq−2q²; q entero en [0,K], P=4n+2 | Vértice continuo n+1/2 excluido; máximo entero empatado en n y n+1; precio positivo en todo el dominio; no inferir beneficio sin costes. |

Los generadores producen funciones y restricciones, no solo respuestas numéricas. En el ingreso discreto se comparan los dos vecinos del vértice y las fronteras; la justificación se limita a la parábola cóncava de este modelo, sin proponer una regla universal de redondeo.

## Organización

- `generator.js`: modelos puros, evaluación, dominio, semilla reproducible, candidatos, óptimos y veinte preguntas con distractores comentados.
- `widget.js`: runtime común y fábrica de sesiones para `mountQuiz`; nueva semilla al reiniciar.
- `index.html`: instrucciones, cinco pasos y contenedor semántico; `style.css` reutiliza la base compartida.
- `tests/optimize-game.test.mjs`: comprobaciones matemáticas y de bancos.
- `tests/optimize-game-24-browser.cjs`: interacción, renderizado e inserción.
- `config/editorial.json`, índices, README, plan, procedencia y auditoría actualizados.

No se modifica el motor compartido de test, MathJax ni preferencias. Las expresiones se construyen con plantillas `String.raw` para conservar tanto delimitadores como órdenes LaTeX.

## Comprobaciones ejecutadas

- **73 pruebas acumuladas superadas.**
- **1000 sesiones de los cuatro modelos:** beneficio en frontera e interior, con beneficios o pérdidas; cotejo con ingreso menos coste; precio y candidatos admisibles.
- Coste medio contrastado desde el coste total dividido entre producción; recinto contrastado con longitud de valla y producto de lados. Los argumentos analíticos figuran en las explicaciones; el muestreo es un control adicional.
- Ingreso discreto contrastado con todos los enteros admisibles; dos óptimos, vértice continuo excluido y diferencia de 0,50 € respecto al máximo entero.
- **200 bancos / 4000 decisiones:** veinte identificadores únicos, cinco pasos por historia, cuatro textos distintos por pregunta, una respuesta marcada correcta, explicación, pista y retroalimentación para cada alternativa. Revisión editorial de los distractores además de estos controles estructurales.
- **Navegador: 40 decisiones.** Selección vacía, error, pista, reintento, dos errores y resúmenes 18/20 y 20/20. Opciones bloqueadas tras terminar cada pregunta, teclado, regeneración y respuestas vacías tras recargar.
- Conteo de contenedores MathJax según las expresiones de enunciados/opciones/correcciones; sin errores matemáticos ni delimitadores pendientes. Se verifican fracciones, derivadas, desigualdades y conjuntos.
- Móvil a 320 px, texto al 200 %, alto contraste y resaltado: sin desbordamiento de página; expresiones largas conservan el desplazamiento local de la infraestructura de fórmulas. Respuesta conservada al cambiar preferencias.
- Anfitrión: preferencias propagadas al iframe, corrección dentro del widget y página sin desbordamiento. Inserción y corrección también comprobadas bajo subcarpeta.
- **171 HTML sin enlaces locales rotos, fragmentos ausentes ni IDs duplicados.**
- Capturas revisadas: `../../tmp/optimiza-coste-medio.png` y `../../tmp/optimiza-movil.png`.

La primera comprobación de bloqueo del navegador seleccionaba por error el primer input de preferencias de lectura. Se acotó al fieldset de respuestas; no requirió modificar la actividad. La prueba final pasa.

## Límites y siguiente entrega

El tema 2 tiene sus tres laboratorios desarrollados, pero no se declara cerrado: quedan revisión integrada y revisión con lectores de pantalla/pronunciación matemática. No se han activado cuentas, persistencia de respuestas, voz, traducción, administración central ni biblioteca PDF. Tampoco se repiten los ensayos de fallos de red de MathJax, ya que el motor no cambia.

Curso: 27 lecciones, 120 preguntas base y 115 tarjetas. T02: nueve lecciones, 60 preguntas base, 54 tarjetas y 21 problemas inventariados. Las preguntas del widget son variantes procedurales y se cuentan por separado.

Siguiente: revisar el recorrido conjunto de t02 y después comenzar 3.1. Integral indefinida.

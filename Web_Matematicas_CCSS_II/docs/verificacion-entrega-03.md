# Verificación de la entrega 03

Fecha: 16 de septiembre de 2026.

## Alcance terminado

- Epígrafes 1.7–1.9: operaciones con límites, cálculo sencillo e indeterminaciones. Incluyen hipótesis, ejemplos resueltos, práctica guiada, tres preguntas por epígrafe y resumen.
- Explorador de racionalización con raíz y distancia variables. Evalúa la expresión equivalente estable y conserva la exclusión del punto original.
- Banco acumulado de 27 preguntas y 29 tarjetas.
- Dos familias añadidas a Límite Express: racionalización y reducción a común denominador. Total: nueve familias, con diez rondas por sesión.
- Adaptación de los apartados 3(a) y 3(e) del examen local de Límites y Derivadas.

## Resultados

| Comprobación | Resultado |
|---|---|
| Pruebas matemáticas | Tres pruebas superadas; 1.000 semillas y 10.000 preguntas con cobertura de nueve familias |
| Alternativas | Respuestas únicas; comparación numérica de fracciones para detectar equivalencias |
| Familias nuevas | Expresiones originales contrastadas numéricamente con las formas simplificadas y sus límites |
| Catálogo | 27 preguntas, tres por cada uno de los nueve epígrafes; 29 tarjetas con IDs únicos |
| HTML | 171 documentos sin destinos locales inexistentes, anclas rotas ni IDs duplicados |
| Tres lecciones nuevas | Fórmulas renderizadas sin errores detectados; sin desbordamiento horizontal a 390 px |
| Autocorrección | Respuesta vacía, error, pista, reintento correcto y puntuación del primer intento comprobados |
| Explorador | Para k=5 y distancia 0,0001: x=24,9999 y 25,0001, valores que redondean a 0,1; para k=1, valores a ambos lados de 0,5 |
| Widget autónomo | Sesión 10/10, nueve familias y fórmulas comprobadas a 350 px |
| Subcarpeta /curso/ | Tres lecciones y widget embebido operativos, sin errores de recursos ni JavaScript detectados |
| Test acumulado | Sesión completa 27/27 en móvil bajo /curso/ |
| Tarjetas | Recorrido de las 29 tarjetas, con final de navegación comprobado |
| Revisión visual | Desarrollo del común denominador en escritorio y explorador del conjugado en móvil |

## Pruebas mantenidas

- tests/generators.test.mjs: soluciones, alternativas y estructura del banco.
- tests/lessons-03-browser.cjs: las tres lecciones, corrección, explorador y sesión del widget.
- Las comprobaciones generales de enlaces y de publicación bajo subcarpeta se realizaron mediante scripts temporales.

## Diseño y LaTeX

Se conservan los CSS, las fuentes y el servicio compartido de MathJax. El nuevo contenido utiliza las categorías editoriales de texto previstas para el diseño posterior. Las fórmulas dinámicas usan la cola compartida de actualización.

Las pruebas de recuperación de descargas y concurrencia del motor están documentadas en las entregas anteriores; no se repitieron en esta entrega, que no modifica ese servicio.

## Límites

Esta verificación local no mide la capacidad del alojamiento público ni sustituye una revisión con lector de pantalla. El tema 1, el videojuego completo, los PDF, las integraciones de idiomas y voz y el panel administrativo permanecen pendientes según el plan. No se han modificado los documentos fuente ni compilado nuevos PDF.

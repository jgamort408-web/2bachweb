# Verificación · Entrega 21

Fecha: 29 de septiembre de 2026.

## Resultado

Repaso integrado publicado en `libro/temas/02-representacion-de-funciones/index.html#repaso`, enlazado desde Practicar. Tres problemas originales con enunciado, pista, desarrollo completo y enlaces de refuerzo. Seis preguntas transversales incorporadas al banco t02: 60 preguntas y 54 tarjetas. Curso: 27 lecciones, 120 preguntas y 115 tarjetas. No se añadieron páginas ni se cambió el diseño provisional.

## Archivos principales

- `libro/temas/02-representacion-de-funciones/index.html`: recorrido de repaso, tres soluciones desplegables y test breve.
- `content/activities/review-t02.js`: preguntas, distractores, explicaciones y referencias a epígrafes.
- `content/activities/catalog.js`: ámbito `review-t02`, integración en t02 y catálogo general.
- `practicar/index.html`, `test/index.html`: acceso y recuento actualizado.
- `tests/representation-review.test.mjs`: cuatro nuevas comprobaciones matemáticas y de cobertura.
- `tests/representation-review-21-browser.cjs`: interacción y renderizado del repaso.
- `docs/auditoria-tema-02.md`: 21 problemas con ubicación, cobertura y pendientes.
- README, procedencia y plan actualizados; aserciones de totales anteriores ajustadas al banco actual, manteniendo los recuentos históricos en la documentación.

## Comprobaciones ejecutadas

- **61 pruebas de matemáticas y bancos: superadas.** Composición desde la fracción original, restricciones, logaritmos, umbral exponencial, contraejemplo de monotonía global, raíz doble reflejada y beneficio por tramos. Se corrigió antes de la ejecución final un paréntesis requerido por JavaScript en la prueba de una potencia negativa.
- **Navegador, entrega 21: superado.** Apertura de las tres soluciones con teclado; selección vacía; error, pista y reintento; resultado 5/6; reinicio; respuesta conservada al cambiar preferencias y descartada al recargar. Ejecución también bajo subcarpeta.
- **Regresión, entrega 12: superada.** Lección 2.1, índice de nueve lecciones, test completo t02 de 60 preguntas, separación por tema, tarjetas y subcarpeta.
- **Regresión, entrega 06: superada.** Tres lecciones avanzadas, comparador, catálogo acumulado de 120 preguntas y 115 tarjetas, fórmulas dinámicas y móvil.
- **171 HTML: cero rutas o fragmentos locales rotos y cero IDs duplicados.**
- Capturas revisadas: `../../tmp/repaso-t02-tramos.png` (escritorio) y `../../tmp/repaso-t02-movil.png` (320 px, texto al 200 %, alto contraste y resaltado). Las expresiones anchas conservan el desplazamiento local de la infraestructura matemática.

## Incidencia corregida durante la revisión visual

Dos desigualdades incluían signos menores que sin escapar dentro de LaTeX escrito en HTML. El navegador consumía parte de la expresión como una etiqueta; la ausencia de errores MathJax por sí sola no detectaba el problema. Se codificaron esos signos y se añadió una comprobación de delimitadores sin procesar en el texto visible. La prueba completa del repaso se repitió y las capturas finales muestran las fórmulas renderizadas.

## Límites y siguiente entrega

El tema 2 conserva estado editorial global parcial. Faltan Construye la gráfica, Transforma la función y Optimiza, con sus variantes procedurales. La revisión con lectores de pantalla y pronunciación matemática permanece pendiente. No se modificó el motor MathJax ni se repitieron sus ensayos de recuperación de red, documentados en entregas anteriores. Tampoco se activaron persistencia de alumnado, administración central, PDF, traducción ni voz.

Siguiente entrega: desarrollar y verificar el widget independiente Construye la gráfica.

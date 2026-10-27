# Verificación · Entrega 33

Fecha: 1 de octubre de 2026.

## Resultado

Repaso integrado del tema 3: cuatro bloques con pistas y soluciones independientes, doce preguntas de síntesis y enlaces de refuerzo. Auditoría de ocho lecciones, 60 preguntas base, 48 tarjetas y veinte problemas/bloques inventariados.

Totales del curso: **35 lecciones, 180 preguntas base y 163 tarjetas**. Las variantes se cuentan aparte. El estado editorial t03 permanece parcial: videojuegos y revisión con lectores de pantalla pendientes.

## Archivos

- `libro/temas/03-integrales/index.html`: repaso, ampliación y test de doce decisiones.
- `content/activities/review-t03.js`: doce ítems originales con destrezas combinadas, cuatro opciones, comentarios, pista y solución; `lessonIds` cubre los ocho epígrafes.
- `content/activities/catalog.js`: ámbito review-t03; inclusión en t03 y catálogo general. No altera los seis ítems de cada lección.
- 3.8, portada e índice general de test enlazan o anuncian el repaso.
- `docs/auditoria-tema-03.md`: fuentes, inventario, cobertura de guion/test/tarjetas y pendientes.
- README, plan y procedencia actualizados. Sin cambios en CSS, motor de test o MathJax.

## Matemáticas

**109 pruebas acumuladas superadas.** `tests/integrals-review.test.mjs` incorpora:

- Banco de 60 con enunciados e IDs únicos, doce ítems de repaso, ocho epígrafes trazados y mazo de 48 conservado.
- Compatibilidad de datos, identidad logarítmica y derivadas numéricas; integrales por Simpson para contrastar ln2 y e. Función continua concreta que satisface los dos datos de acumulación del quinto ítem.
- Almacén: continuidad y pendientes en la unión, dato inicial, final 19 kg, máximo 24 kg en 2 h, neto −1 kg y variación total 9 kg. Muestreo complementario del rango, además de la justificación analítica del texto.
- Invariancia al sumar una función común, contacto sin cruce, condición integral para k y área resultante. El criterio continuo/no negativo se demuestra en el texto; no se presenta el muestreo como demostración.

## Navegador

`tests/integrals-review-33-browser.cjs` superado:

- Cuatro pistas y soluciones desplegadas, ampliación leída y fórmulas renderizadas.
- Test 11/12 con selección vacía, error, pista, reintento y reinicio; respuesta conservada al cambiar preferencias y eliminada al recargar.
- Móvil 320 px con texto al 200 %, contraste y resaltado; sin desbordamiento global. Fórmulas anchas con desplazamiento local.
- Navegación por las ocho lecciones, seis preguntas individuales en cada una y regreso desde 3.8.
- Bancos t03 60 preguntas/48 tarjetas, índice 8/8 y funcionamiento en subcarpeta con cabecera/pie.
- Sin errores JavaScript, respuestas HTTP fallidas ni errores de MathJax.

Regresión general `tests/lessons-06-browser.cjs`: recorrido de las 180 preguntas y 163 tarjetas del catálogo y tres lecciones avanzadas t01.

Capturas revisadas: `../../tmp/repaso-integrales-escritorio.png` y `../../tmp/repaso-integrales-movil.png`. La inspección confirma fórmulas legibles, controles y soluciones en el diseño provisional.

Revisión estática: 171 HTML sin rutas locales rotas, fragmentos ausentes ni IDs duplicados. Enlaces del nuevo documento de auditoría verificados contra archivos y anclas.

## Límites y siguiente entrega

No se recompilan exámenes ni se cambian fuentes originales. No se repiten ensayos de fallo de red al no modificar MathJax. Accesibilidad global, voz, traducción, administración y futuras cuentas siguen en sus fases.

Siguiente: **Parejas de primitivas**, widget independiente e insertable. Después, Método correcto y Área por tramos.

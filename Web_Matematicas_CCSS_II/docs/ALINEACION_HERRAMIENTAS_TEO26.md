# TEO-26 · Alineación de formulario y glosario

14 de noviembre de 2026. Tandas secuenciales; sin cerrar TEO-25E (lectura asistida real).

- [x] **26A · Formulario de inferencia.** Incorporar afijación proporcional, error estándar estimado de proporciones, intervalo de Wald y tamaños con información previa y conservador. Verificar fuente literal, condiciones y enlaces.
- [x] **26B · Resto del formulario.** Cotejar nuevas fórmulas de distribuciones y apoyos (marginales, dos regresiones, combinatoria). Añadir sólo las que faltan, distinguiendo ampliaciones opcionales.
- [x] **26C · Glosario.** Inventariar conceptos nuevos frente a las tarjetas revisadas. Añadir o revisar tarjetas antes de enlazarlas; el glosario se genera a partir de ellas, sin definiciones paralelas.
- [x] **26D · Cierre.** Regenerar herramientas, comprobar sincronización, enlaces, filtros y fórmulas en navegador. Conciliar recuentos y documentación.

## Pendiente de lectura asistida

TEO-25E sigue abierta. En esta sesión no hay proceso NVDA/Narrador activo y no se ha encontrado NVDA en sus dos ubicaciones habituales de instalación. Esta comprobación no acredita que no exista otra instalación ni sustituye probar fracciones, intervalos, sumatorios y matrices con un lector real. No se certifica pronunciación o conformidad de accesibilidad.

## Registro

- `plan(teoria-26)`: indexadas cuatro tandas. Primera entrega: formulario de inferencia.

- `feat(teoria-26a)`: añadidas cinco fórmulas de inferencia, copiadas literalmente de las lecciones: afijación, error estándar estimado, Wald, tamaño con p₀ y tamaño conservador. Notas de supuestos, aproximación, redondeo y escala. Formulario regenerado: 92 entradas (antes 87). Tres pruebas de sincronización superadas y enlaces de 190 páginas sin pendientes. `node tests/tools-alignment-browser.cjs` comprueba en móvil las 92 fórmulas sin errores de renderizado, búsqueda de afijación, nota y acceso a su lección. Glosario sin cambios: 42 términos. Siguiente 26B.

## 26B · Distribuciones y apoyos

Añadidas 15 entradas, conservando las 92 anteriores (total 107):

| Ámbito | Entradas nuevas | Fuente |
|---|---|---|
| Distribuciones | Densidad y área; acumulada discreta/con densidad; acumulada binomial; cuantil normal | 8.1, 8.2 y 8.3 |
| Aproximación normal | Corrección de continuidad para como máximo, al menos e intervalo entero incluido | Tabla de 8.4; la corrección para exactamente un valor ya estaba |
| Bidimensional | Frecuencias, medias, varianzas y desviaciones marginales | Apoyo bidimensional |
| Regresión | X sobre Y y relación de las pendientes con r² | Apoyo bidimensional; Y sobre X ya estaba |
| Combinatoria | Principio multiplicativo y combinaciones con repetición | Apoyo de combinatoria; la segunda es opcional |

Las fórmulas proceden literalmente de sus lecciones, salvo las tres correcciones reunidas desde las celdas de la tabla: sus fragmentos se comprueban mediante `from`. Se añaden notas sobre tipos de variable, límites de umbrales, colas, pesos, divisor N, unidades, varianzas no nulas y disponibilidad en recuentos. Los casos especiales de programación lineal siguen explicados en sus lecciones: no se convierten ejemplos numéricos en fórmulas generales. Tampoco se duplica cada caso numérico resuelto de inferencia.

Verificación: tres pruebas de sincronización superadas; `build-formulas.mjs --check` confirma que el formulario está al día. Prueba móvil `tools-alignment-browser.cjs`: 107 fórmulas y 107 MathML auxiliares, sin errores matemáticos ni desbordamiento global; búsquedas de medias marginales, acumulada binomial y combinaciones con repetición; filtro bidimensional con diez entradas; nota opcional y acceso a la lección de afijación. Tres capturas inspeccionadas, guardadas en `../tmp/teoria-26/formulario-*.png`. Las expresiones largas conservan desplazamiento interno; no se reducen los símbolos para encajarlas. Enlaces de 190 páginas sin pendientes.

- `feat(teoria-26b)`: formulario ampliado a 107 entradas y comprobaciones anteriores superadas. Glosario aún en 42 términos. Siguiente 26C: inventario de conceptos y tarjetas; TEO-26D y TEO-25E siguen pendientes.

## 26C · Inventario antes de edición

Cobertura prevista: 27 términos nuevos. Reutilizar 12 tarjetas existentes para discreta, continuidad, afijación, parámetro/estadístico, proporción observada, margen de media, tamaños de proporciones, planificación conservadora, óptimos múltiples, región no acotada, frontera y coeficientes de regresión. Crear 15 tarjetas para densidad, acumulada, cuantil, estimador, estimación, insesgadez, Wald, error estándar estimado, intervalo característico, ficha técnica, medias/varianzas marginales, regresión X sobre Y, principio multiplicativo y combinaciones con repetición opcionales. Las nuevas tarjetas tendrán identificador propio y lección explícita; las originales conservan sus identificadores.

- [x] 26C1: tarjetas y revisión de definiciones respecto de sus lecciones.
- [x] 26C2: enlaces del glosario y regeneración.
- [x] 26C3: contratos, búsqueda, lectura matemática y comprobación visual.

## 26C · Resultado e identificación

27 términos nuevos: 12 reutilizan tarjetas existentes y 15 tienen tarjeta editorial nueva, con ID y lección explícitos. El glosario se genera desde el reverso de la tarjeta: no hay dos definiciones que mantener. Se conservan las 405 tarjetas anteriores y sus identificadores; el catálogo contiene ahora 420. Distribución actual: 22 en distribuciones, 37 en inferencia, 23 en bidimensional y dos en combinatoria. Las demás colecciones no cambian.

| Término añadido | Tarjeta | Lección |
|---|---|---|
| Variable aleatoria discreta | `fc-t08-original-01` | [t08-e01](../libro/temas/08-distribuciones-de-probabilidad/01-variable-aleatoria.html) |
| Corrección de continuidad | `fc-t08-original-19` | [t08-e04](../libro/temas/08-distribuciones-de-probabilidad/04-aproximacion-de-la-distribucion-binomial-a-la-distribucion-normal.html) |
| Afijación proporcional | `fc-t09-original-06` | [t09-e03](../libro/temas/09-inferencia-estadistica/03-tecnicas-de-muestreo.html) |
| Parámetro y estadístico | `fc-t09-original-03` | [t09-e01](../libro/temas/09-inferencia-estadistica/01-estadistica-inferencial.html) |
| Proporción muestral observada | `fc-t09-original-04` | [t09-e05](../libro/temas/09-inferencia-estadistica/05-estimacion-puntual-y-estimacion-por-intervalos.html) |
| Margen de error para la media | `fc-t09-original-19` | [t09-e08](../libro/temas/09-inferencia-estadistica/08-tamano-de-la-muestra-error-cometido.html) |
| Tamaño muestral para una proporción | `fc-t09-original-22` | [t09-e08](../libro/temas/09-inferencia-estadistica/08-tamano-de-la-muestra-error-cometido.html) |
| Planificación conservadora de proporciones | `fc-t09-original-26` | [t09-e08](../libro/temas/09-inferencia-estadistica/08-tamano-de-la-muestra-error-cometido.html) |
| Óptimos múltiples | `fc-pl-original-17` | [t06-e04](../libro/temas/06-programacion-lineal/04-solucion-de-un-problema-de-programacion-lineal.html) |
| Región no acotada | `fc-pl-original-16` | [t06-e04](../libro/temas/06-programacion-lineal/04-solucion-de-un-problema-de-programacion-lineal.html) |
| Recta frontera | `fc-pl-original-10` | [t06-e01](../libro/temas/06-programacion-lineal/01-inecuaciones-lineales-con-dos-incognitas.html) |
| Coeficientes de regresión | `fc-bivariate-original-20` | [bivariate](../libro/apoyos/estadistica-bidimensional.html) |
| Densidad de probabilidad | `fc-teoria-densidad` | [t08-e01](../libro/temas/08-distribuciones-de-probabilidad/01-variable-aleatoria.html) |
| Función de distribución acumulada | `fc-teoria-acumulada` | [t08-e01](../libro/temas/08-distribuciones-de-probabilidad/01-variable-aleatoria.html) |
| Cuantil normal | `fc-teoria-cuantil` | [t08-e03](../libro/temas/08-distribuciones-de-probabilidad/03-distribucion-normal.html) |
| Estimador | `fc-teoria-estimador` | [t09-e05](../libro/temas/09-inferencia-estadistica/05-estimacion-puntual-y-estimacion-por-intervalos.html) |
| Estimación | `fc-teoria-estimacion` | [t09-e05](../libro/temas/09-inferencia-estadistica/05-estimacion-puntual-y-estimacion-por-intervalos.html) |
| Estimador insesgado | `fc-teoria-insesgado` | [t09-e05](../libro/temas/09-inferencia-estadistica/05-estimacion-puntual-y-estimacion-por-intervalos.html) |
| Intervalo de Wald para una proporción | `fc-teoria-wald` | [t09-e07](../libro/temas/09-inferencia-estadistica/07-intervalos-de-confianza.html) |
| Error estándar estimado de una proporción | `fc-teoria-se-proporcion` | [t09-e07](../libro/temas/09-inferencia-estadistica/07-intervalos-de-confianza.html) |
| Intervalo característico | `fc-teoria-caracteristico` | [t09-e06](../libro/temas/09-inferencia-estadistica/06-intervalos-de-probabilidad-o-intervalos-caracteristicos.html) |
| Ficha técnica de una encuesta | `fc-teoria-ficha-encuesta` | [t09-e09](../libro/temas/09-inferencia-estadistica/09-ficha-tecnica-de-encuestas.html) |
| Media marginal | `fc-teoria-media-marginal` | [bivariate](../libro/apoyos/estadistica-bidimensional.html) |
| Varianza marginal descriptiva | `fc-teoria-varianza-marginal` | [bivariate](../libro/apoyos/estadistica-bidimensional.html) |
| Regresión de X sobre Y | `fc-teoria-regresion-x` | [bivariate](../libro/apoyos/estadistica-bidimensional.html) |
| Principio multiplicativo | `fc-teoria-multiplicativo` | [combinatorics](../libro/apoyos/combinatoria.html) |
| Combinaciones con repetición | `fc-teoria-combinacion-repeticion` | [combinatorics](../libro/apoyos/combinatoria.html) |

Definiciones cotejadas con las lecciones: estimador frente a estimación, insesgadez frente a exactitud individual, intervalo característico frente a confianza, error estándar frente a margen, condiciones del intervalo de Wald, divisor descriptivo N, dirección de las regresiones y recuentos por etapas. La combinación con repetición conserva su etiqueta opcional.

Integración: añadida combinatoria al filtro de temas de Tarjetas y enlace desde su apoyo. Actualizados los recuentos visibles y los contratos del catálogo. Los módulos de tarjetas originales no se modifican.

Verificación: 20 pruebas unitarias específicas superadas (catálogo, visibilidad, formulario y glosario). Glosario regenerado y comprobado con `--check`; 190 páginas sin enlaces pendientes. `node tests/glossary-alignment-browser.cjs` verifica las 69 entradas, búsqueda sin definiciones duplicadas, navegación término → lección → término en raíz y subcarpeta, presentación de las 15 respuestas nuevas sin errores MathJax y disponibilidad del texto estático sin JavaScript. Esto no certifica lector de pantalla ni pronunciación.

### Trabajos de cierre 26D (completados)

- [x] Conciliar los guiones históricos de navegador que fijaban 42 términos y los mazos de 19/20/30 tarjetas: `glossary-161-browser.cjs`, `distribution-cards-import-91-browser.cjs`, `bivariate-cards-import-84-browser.cjs` e `inference-cards-import-99-browser.cjs`. Mantener sus comprobaciones de las fuentes originales; actualizar las expectativas de la interfaz ampliada. No se declaran superados estos guiones antiguos en esta tanda.
- [x] Revisar otros recuentos antiguos, documentos vigentes y pruebas de interfaz que dependan de ellos.
- [x] Revisión final conjunta de herramientas y comprobación de las evidencias visuales.

- `feat(teoria-26c)`: 69 términos y 420 tarjetas; completadas definición, integración y pruebas específicas. Pendiente el cierre transversal 26D y lectura asistida TEO-25E.

## 26D · Cierre de herramientas (14 de noviembre)

Actualizados y superados los cuatro guiones históricos: distribución (19 originales y tres nuevas), inferencia (30 originales y siete nuevas), bidimensional (20 originales y tres nuevas) y glosario (69 términos). Conservan las comprobaciones de los archivos fuente originales. Utilizan la fixture local común, bloquean service workers y comprueban raíz/subcarpeta, filtros, navegación, fórmulas y texto ampliado. El glosario comprueba además lectura estática sin JavaScript. La primera ejecución concurrente del glosario agotó el tiempo de carga; la repetición aislada terminó correctamente. No se registra ese intento como fallo de contenido.

La batería general detectó que las tarjetas nuevas declaraban a la vez categoría y lección como apartado. Corregido sin debilitar el contrato: la categoría es el apartado de repaso y `sourceLessonId` conserva la lección de referencia. El selector por lección y el catálogo de visibilidad reconocen esa referencia, por lo que ocultar la lección afecta a sus tarjetas. Las referencias se validan en el contrato del catálogo. Comprobadas las quince tarjetas nuevas contra su ámbito de lección y su padre en el catálogo.

Resultados finales:

- **389 pruebas unitarias: 388 superadas y un fallo previo**, en `selectividad/04-matrices-y-determinantes.html`, que no coincide con su generador. No se declara verde la batería completa. Resultado en `../tmp/teoria-26/unidad-cierre-final.log`.
- Las pruebas de apartado único, catálogo, visibilidad y glosario pasan tras la corrección (19 comprobaciones específicas).
- Cuatro pruebas históricas de navegador superadas, con salida correcta.
- Formulario y glosario sincronizados con sus generadores; 190 páginas sin enlaces pendientes.
- Recuentos vigentes: **107 fórmulas, 69 términos y 420 tarjetas**. Actualizados README y estado del proyecto; conservados los registros históricos con sus cifras originales.
- Evidencias visuales de las tandas previas inspeccionadas: fórmulas largas, navegación móvil, formulario, término de Wald y tarjeta opcional. No se afirma una inspección de cada estado de todas las actividades.

### Seguimiento fuera del cierre de herramientas

- [ ] **TEO-25E:** lector de pantalla y pronunciación matemática reales. Sigue abierta; no basta disponer de MathML auxiliar.
- [x] **MNT-SEL-01:** sincronizar y revisar la página generada de Selectividad de matrices. Fallo anterior a TEO-26, confirmado por la batería final. Requiere comparar la generación con el HTML antes de sustituirlo.

- `test(teoria-26d)`: TEO-26 completada dentro del alcance de herramientas; no cierra la validación de accesibilidad ni el conjunto de tareas de la web.

### Actualización posterior · MNT-SEL-01 cerrada

La sincronización y el hallazgo visual de cajas matemáticas se han resuelto en una tanda posterior: [informe](MANTENIMIENTO_SELECTIVIDAD_SYNC_2026-11-14.md). Resultado vigente: 390 pruebas superadas, cero fallos. Los 388/389 anteriores se conservan arriba como resultado histórico de TEO-26D. La lectura asistida TEO-25E sigue abierta.

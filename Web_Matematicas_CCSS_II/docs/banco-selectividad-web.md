# Banco de Selectividad en la web

Actualizado: 7 de noviembre de 2026 · Tarea P08 del [plan operativo](../../PLAN_WEB_OPERATIVA.md). Rama `feature/selectividad`, **sin publicar** hasta que se complete la identificación de convocatoria y tipo (decisión del docente).

## Qué hay

- [Índice](../selectividad/index.html) con los temas, un resumen del [formato de la PAU vigente](formato-pau-vigente.md) y el estado del banco. Se enlaza desde Recursos.
- Una página por tema con ejercicios propios: 1, 2, 3, 4, 5, 6, 7 y 9. El tema 8 no tiene ejercicios con tema principal en el banco. Cada página tiene una tarjeta por ejercicio (tema principal), agrupadas por año y con:
  - procedencia: año, convocatoria, tipo y reserva cuando constan, opción o bloque, número y puntuación originales; aviso si falta identificar la convocatoria o el tipo;
  - enunciado transcrito y cotejado, con las fórmulas en MathJax;
  - lecciones del libro que trabaja (epígrafes), etiquetas de contenido y referencia `SEL-…`;
  - solución plegada, solo si está validada y el docente la ha activado.
- Al final de la página, los ejercicios de otros temas que también trabajan ese tema (temas secundarios), con enlace a su tarjeta.
- Filtros: búsqueda sin tildes, lección, contenido, año, convocatoria, tipo y «Solo con la solución publicada». El contraste de hipótesis lleva el aviso «Ya no entra en la PAU» y está oculto de partida (casilla para incluirlo).
- Enlaces directos: `?epigrafe=T07.10`, `?etiqueta=bayes`, `?anio=2019` y `#SEL-D0013-BC-E05`. Si un filtro deja fuera el ejercicio enlazado, se quitan los filtros.
- **«Así cae en Selectividad»** al final de cada lección cuyo epígrafe aparece en el banco. Indica el número de ejercicios y enlaza a la página filtrada; si el epígrafe aparece en varios temas, como la normal dentro de inferencia, enlaza a cada uno.

## Generación

`npm run build:selectividad` (`scripts/build-selectividad.mjs`) lee en solo lectura `../Selectividad_LaTeX`: `datos/ejercicios.csv`, `epigrafes.csv`, `tags.csv`, `enunciados/` y `soluciones/`. `--check` comprueba que todo está al día, y la prueba unitaria `selectividad.test.mjs` hace lo mismo. Genera:

| Salida | Contenido |
|---|---|
| `selectividad/*.html` | Índice y páginas por tema (no editar a mano). |
| `config/selectividad.json` | Temas, recuento por epígrafe y soluciones publicables; el catálogo lo carga. |
| `content/selectividad/soluciones.json` | HTML de las soluciones validadas; solo se descarga si alguna está visible. |
| `assets/img/selectividad/*.png` | Figuras de las soluciones, convertidas de PDF con `scripts/render-pdf-figure.py` (pypdfium2). |

El conversor (`scripts/lib/latex-html.mjs`) admite solo el subconjunto de LaTeX del banco. Ese subconjunto incluye párrafos, `enumerate` con las etiquetas `a)`, `1)` y `1.`, `itemize`, negrita, cursiva y subrayado, los símbolos de texto (¿, €, º), `center`, `minipage`, `\boxed` en el texto, figuras y `\bordermatrix`, que se reescribe como tabla con paréntesis porque MathJax no lo conoce. Las fórmulas pasan sin cambios. Cualquier otra orden detiene la generación con el ID del ejercicio, para que nada se publique mal convertido. Comprobado con los 640 enunciados y las 72 soluciones validadas a 7 de noviembre: ninguna fórmula da error en MathJax (prueba 165).

Comprobaciones al generar:

- solo enunciados `cotejada`;
- el estado de la solución coincide en el CSV y en la cabecera del `.tex`;
- toda etiqueta tiene nombre visible (`TAG_LABELS`) y todo epígrafe tiene lección;
- cada figura tiene descripción (`FIGURE_ALT`);
- cada página de tema está registrada en `config/pages.json`.

## Soluciones ocultas hasta que el docente las active

- El catálogo registra un grupo por tema (`group:selectividad-soluciones-t07`, dentro de la página del tema) y una entidad por solución validada (`solution:SEL-…`). En Administración aparecen bajo cada página «Selectividad: …».
- `config/visibility.json` publica los grupos **ocultos**. Para publicar las soluciones de un tema, el grupo pasa a «Mostrar». Una solución concreta se puede seguir ocultando dentro de un grupo visible. Si se oculta la página del tema, se ocultan también sus soluciones.
- Sin JavaScript, o si no se puede leer la configuración publicada (respaldo), no se muestra ninguna solución: el HTML de las tarjetas no las contiene.
- Límite conocido, igual que en la biblioteca de exámenes: `soluciones.json` es un archivo público del sitio, así que ocultar evita que se muestren, pero no impide descargarlas a quien conozca la ruta. Para un secreto real habría que no publicar el archivo hasta activarlas.

## Dependencia de la otra herramienta

Las páginas se generan desde la copia de trabajo de `Selectividad_LaTeX`. El 8 de noviembre se confirmó en Git todo el trabajo de la otra herramienta (rama `selectividad/banco`, fusionada aquí). Las páginas coinciden con ese estado. Antes de fusionar esta rama:

1. La otra herramienta confirma su trabajo posterior y completa la identificación.
2. Se regenera con `npm run build:selectividad` y se comprueba con `npm test` y la prueba 165.
3. La integración continua ejecuta `--check` contra lo confirmado: si las páginas se generaron con archivos sin confirmar, falla.

## Pendiente

- Publicación (fusión en `main`) cuando la identificación esté completa.
- Generador de relaciones (P09) y de exámenes (P10), que partirán de estos mismos datos.
- Revisión del docente de los nombres de las etiquetas y de las páginas.

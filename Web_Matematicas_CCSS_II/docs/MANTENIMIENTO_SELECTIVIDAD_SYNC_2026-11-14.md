# MNT-SEL-01 · Sincronización del banco de Selectividad

14 de noviembre de 2026. Alcance: salidas web y copia de macros de exportación. No se redactan ejercicios o soluciones nuevas ni se cambia el índice del banco.

## Tanda y comprobaciones

- [x] Comparar todas las salidas del generador en memoria antes de escribir.
- [x] Identificar cinco archivos desincronizados y guardar copias previas.
- [x] Contrastar los identificadores, metadatos y contenido visible de ambos bancos.
- [x] Sincronizar sólo las salidas diferentes, sin ejecutar tareas de borrado de archivos del generador.
- [x] Inspeccionar los dos enunciados con cambios de letras de apartados.
- [x] Corregir el hallazgo visual MNT-SEL-02: delimitadores de matemáticas dentro de cajas de maquetación.
- [x] Terminar las comprobaciones finales y registrar su resultado.

## Cambios de sincronización

- `selectividad/04-matrices-y-determinantes.html`: 246892 → 246940 bytes en la primera sincronización.
- `selectividad/07-probabilidad.html`: 557105 → 557169 bytes en la primera sincronización.
- `content/selectividad/soluciones.json`: 1306510 → 1307341 bytes en la primera sincronización.
- `content/selectividad/ejercicios.json`: 1358424 → 1359439 bytes en la primera sincronización.
- `content/selectividad/latex/tex/comandos.tex`: 4936 → 6019 bytes en la primera sincronización.

El banco conserva 640 enunciados y 640 soluciones con los mismos IDs, etiquetas, temas y metadatos. Diez registros de cada JSON incorporan macros de selección de partes/apartados presentes en las fuentes LaTeX. La comparación inicial del HTML, normalizando espacios y marcado, conserva texto y fórmulas. En los dos HTML de temas se añaden las letras explícitas de los apartados, sin alterar las preguntas. Las macros comunes de exportación se copian de la fuente actual del banco.

IDs afectados:

- `SEL-D0067-OA-E03`
- `SEL-D0067-OB-E03`
- `SEL-D0068-OA-E03`
- `SEL-D0068-OB-E03`
- `SEL-D0069-OA-E03`
- `SEL-D0069-OB-E03`
- `SEL-D0070-OA-E03`
- `SEL-D0070-OB-E03`
- `SEL-D0075-OB-E03`
- `SEL-D0084-OA-E01`

Evidencias de esta primera comparación: `../tmp/selectividad-sync/verificacion.json`, candidatos generados y copias `antes/`. Sus hashes permiten identificar exactamente el estado comparado.

## MNT-SEL-02 · Hallazgo visual adicional

La captura de SEL-D0084-OA-E01 mostró dólares literales alrededor de las cantidades de la matriz F. La fuente LaTeX utiliza cajas como `\makebox[1.7em]{$100$}`. El adaptador retiraba la caja pero conservaba los delimitadores `$…$` dentro de una fórmula ya abierta; MathJax los dibujaba sin producir un error de sintaxis.

Corregido `scripts/lib/latex-html.mjs`: si el contenido simple de una caja es un grupo matemático `$…$`, se devuelve un grupo de llaves sin esos delimitadores. El texto ordinario de las cajas y los dólares monetarios escapados se conservan. La fuente del examen sigue intacta. Se añade una prueba con cantidad positiva, negativa, cabecera textual y símbolo monetario escapado.

Tras esta corrección se regeneran únicamente el HTML de matrices y `content/selectividad/ejercicios.json`; las copias previas de esta segunda fase están en `antes-conversor/`. Esta corrección cambia deliberadamente la representación web defectuosa; no se atribuye a la comparación de conservación de la primera fase.

Prueba de navegador: `node tests/selectividad-sync-browser.cjs`. Comprueba en los dos enunciados afectados las letras de apartados, fórmulas sin errores y enlaces a sus lecciones; en la matriz comprueba además que no queden dólares de delimitación en el MathML auxiliar. Capturas en `../tmp/selectividad-sync/`. La primera captura permitió descubrir MNT-SEL-02, por lo que se repite tras corregir el adaptador.

Las pruebas de relaciones y exámenes comprueban la construcción de LaTeX y ZIP para Overleaf. No se declara una compilación PDF nueva ni una revisión matemática independiente de las 640 soluciones por esta sincronización.

## Resultado final

**MNT-SEL-01 y MNT-SEL-02 completadas.**

- Generador en modo comprobación: banco al día, 640 ejercicios y 49 archivos.
- Siete pruebas específicas del banco superadas, incluida la nueva regresión de cajas matemáticas.
- Doce pruebas de relaciones/exámenes superadas, con construcción de LaTeX y ZIP.
- Prueba de navegador de los dos enunciados superada; captura final de la matriz inspeccionada sin dólares literales y con sus valores correctos.
- Enlaces: 190 páginas sin pendientes (comprobación de esta tanda; las correcciones posteriores sólo alteran el contenido de una fórmula).
- **Batería completa final: 390 pruebas superadas, cero fallos**, ejecutada con cuatro procesos de prueba simultáneos. Registro: `../tmp/selectividad-sync/unidad-concurrencia-controlada.log`. Las ejecuciones anteriores interrumpidas no se presentan como validación final.

Se conservan los 640 IDs, su categorización y los originales LaTeX. TEO-25E (lectura y pronunciación con lector de pantalla) permanece pendiente. Este mantenimiento no certifica que las 640 soluciones sean matemáticamente correctas por una nueva revisión independiente ni cierra todas las tareas de publicación de la web.

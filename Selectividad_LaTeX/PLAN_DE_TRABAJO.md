# Plan del banco modular de Selectividad

Actualización: **27 de octubre de 2026**. Documento de seguimiento por tandas; las entradas del diario describen cambios como commits, sin crear commits de Git.

## 1. Objetivo y alcance de esta entrega

Preparar un banco LaTeX para Overleaf con ejercicios de `../Selectividad/`, filtros por procedencia y contenidos, y composición de preguntas o preguntas con soluciones futuras.

**L001-L025 cerradas: 200 enunciados cotejados y 200 clasificaciones verificadas.** L025 incorpora ocho ejercicios del curso 2016-2017, archivo suplemente_junio_EXAMEN 4; se conservan los 192 anteriores. Las 200 soluciones contienen sólo comentarios, sin respuestas. Veinticinco de 84 candidatos cerrados, 59 pendientes. Fase de soluciones inactiva.

En L005-L025, el cotejo consta de segundas pasadas visuales completas del mismo autor, separadas de la escritura; no se atribuye a un segundo revisor distinto. L001-L004 conservan sus propias evidencias de revisión.

## Estado actual tras L025

| Medida | Estado comprobado |
|---|---:|
| Lotes candidatos cerrados | **25 de 84: L001-L025** |
| Enunciados `cotejada` | **200** |
| Clasificaciones `verificada` | **200** |
| Soluciones redactadas | **0** |
| Soluciones `no_redactada` | **200: 192 anteriores intactas y ocho nuevas de sólo comentarios** |
| Fuentes con huellas coincidentes | **215 de 215, verificadas en L025** |
| Pruebas superadas en L025 | **21** |

Los primeros dieciocho exámenes conservan límites de identificación documentados. L001-L004 tienen convocatoria/tipo de carpeta; L005/L006, reserva y letras de carpeta con convocatoria vacía. L007 confirma ordinaria y curso 2020-2021; L010 confirma extraordinaria y ese curso. L008/L009/L011/L012 sólo imprimen curso: convocatoria y tipo proceden de nombres. L012 conserva reserva B sólo con evidencia del nombre. **L013-L018 confirman curso 2019-2020; convocatoria, tipo, reserva y modelo quedan vacíos.** Los sufijos A-F de P_A/P_B/P_C/P_D/P_E/P_F no acreditan modelos ni opciones; tampoco hay tabla específicamente asociada para estos seis. Todos mantienen modelo vacío, identificación parcialmente confirmada y requiere_revision=si por esos límites. INC-006 conserva matrix de L006; INC-007, (1 puntos) de L015. L010 tiene tabla normal en su página 3. Las fechas del relato, como caducidad 2021 en C6 de L014, no datan el examen.

L007-L018 usan cuatro bloques A-D y números globales 1-8, sin opciones. Sus IDs son BA-E01/E02, BB-E03/E04, BC-E05/E06 y BD-E07/E08 por documento. El original exige cuatro ejercicios de al menos tres bloques y corrige los cuatro primeros que cumplen la regla; la colección reúne ocho para consulta, sin imponer esa regla a la selección didáctica. En L016 A1 imprime total 2.5, sin apartados; otros siete totales derivados de apartados y concordantes con criterios, sin añadir totales al cuerpo. B3 conserva dos derivadas bajo 1.2 y tangentes más corte bajo 1.3; B4a y D7a conservan sus preguntas con puntuación conjunta.

**Verificación L025:** 21 pruebas superadas en 33.915 s; 200 ejercicios válidos y 215 huellas originales coincidentes. Dos PDF de cuatro páginas, ocho páginas finales revisadas y ocho avisos pendientes en combinado. Los 192 enunciados, 192 soluciones y 48 PDF anteriores intactos (432 archivos). ZIP aislado compilado: ambas salidas L025 y enunciados L024 idénticos byte a byte; main.tex con texto y cuatro renderizados idénticos al PDF de preguntas. Comprobación local con Tectonic y caché; servicio Overleaf no probado.

**Siguiente: L026**, fuente candidata `SRC-251685BD691B`, archivo `Selectividad/matematicas_aplicadas/suplemente_septiembre_EXAMEN 4-ANDALUCÍA.pdf`. Confirmar curso, naturaleza y auxiliares desde el contenido, conservando el nombre original.

### Estado inicial histórico, anterior a L001

| Medida | Estado inicial histórico |
| --- | ---: |
| Archivos fuente inventariados | 215: 203 PDF y 12 DOC |
| Contenidos distintos por SHA-256 | 163 |
| Copias adicionales exactas, conservadas | 52 |
| Páginas PDF inventariadas, incluidas tablas y criterios | 300 |
| Exámenes registrados y parcialmente identificados | 1 |
| Ejercicios identificados y clasificados provisionalmente | 8 |
| Enunciados transcritos y cotejados | **0** |
| Archivos reservados de enunciado / solución | 8 / 8 |
| Soluciones redactadas | **0** |

No se conoce aún el total definitivo de ejercicios. Ni el número de PDF ni el de páginas permiten deducirlo: hay documentos combinados, tablas repetidas, copias y formatos con distinta optatividad.

## 2. Dónde encontrar cada parte

Todas las rutas siguientes parten de `Selectividad_LaTeX/`, salvo las del inventario de fuentes, que parten de la carpeta de trabajo y empiezan por `Selectividad/`.

| Ruta | Uso |
| --- | --- |
| `../Selectividad/` | Originales de sólo lectura; conservar nombres, bytes y estructura |
| `datos/fuentes.csv` | Inventario completo, rutas, huellas, extracción y duplicados |
| `datos/examenes.csv` | Identidad del examen, regla de elección y evidencia de cada dato |
| `datos/ejercicios.csv` | Índice maestro: ID, examen, tema, etiquetas y pares `.tex` |
| `datos/temas.csv`, `datos/epigrafes.csv`, `datos/tags.csv` | Vocabularios controlados de clasificación |
| `datos/incidencias.csv` | Dudas, problemas del original y decisiones pendientes |
| `enunciados/ID.tex`, `soluciones/ID.tex` | Fragmentos independientes, sin preámbulo |
| `recursos/ID/` | Figuras y tablas que necesite un ejercicio |
| `main.tex`, `config/`, `tex/` | Composición y opciones de salida |
| `catalogo/registro.tex` | Registro LaTeX generado a partir del CSV |
| `selecciones/` | Listas de IDs para fichas y comprobaciones |
| `plantillas/` | Contratos de los futuros fragmentos |
| `scripts/` y `tests/` | Inventario, selección, validación y empaquetado reproducibles |
| `docs/LOTES_DE_TRANSCRIPCION.md` | Cola de fuentes por tandas y alias duplicados |
| `docs/DICCIONARIO_CSV.md` | Significado y reglas de los campos |
| `docs/CRITERIOS_TRANSCRIPCION.md` | Reglas de fidelidad y revisión |

## 3. Temario de referencia

Se sigue el guion de `../Temario completo/Guion_Temario_Matematicas_CC_Sociales_II_2Bach.md`: nueve temas y 86 epígrafes registrados. Estos identificadores no se confunden con los números de tareas del proyecto web.

| Código | Tema |
| --- | --- |
| T01 | Límites y derivadas |
| T02 | Representación de funciones, incluida optimización |
| T03 | Integrales |
| T04 | Matrices y determinantes |
| T05 | Sistemas de ecuaciones |
| T06 | Programación lineal |
| T07 | Probabilidad |
| T08 | Distribuciones de probabilidad |
| T09 | Inferencia estadística |

Cada ejercicio tiene un tema principal y puede tener varios secundarios. Los filtros deben buscar en ambos. Por ejemplo, un ejercicio que incluye derivadas y primitivas sigue siendo un único ejercicio y puede pertenecer a T01, T02 y T03. No se fabrican apartados independientes que pierdan sus datos comunes.

Los contenidos históricos que desborden el guion actual se conservan literalmente, con una etiqueta específica y una incidencia curricular cuando corresponda. No se adapta el enunciado para hacerlo parecer actual.

## 4. Identidad y procedencia

1. `fuente_id` identifica la ruta inventariada; SHA-256 identifica los bytes. Las dos cosas cumplen funciones distintas. Cambiar una ruta ya usada requiere una migración registrada, no una regeneración ciega de IDs.
2. `documento_id` y `examen_id` se asignan de forma estable y no se reutilizan. El primer documento es `D0001`, examen `EXA-0001`.
3. `SEL-D0001-OA-E01` identifica el ejercicio 1 de la opción A. Para bloques se reserva `BA`, `BB`, etc.; `NA` cuando no haya opción ni bloque. La numeración original se conserva aparte. Ver el diccionario antes de asignar nuevos formatos.
4. Año, convocatoria, tipo, reserva, modelo, opción y bloque son campos distintos. Si un dato no aparece o no está confirmado, queda vacío con una nota de evidencia. **La opción A no se convierte en modelo A.**
5. Una copia idéntica no genera otros ejercicios. La fuente canónica y los alias se concilian antes de asignar nuevos IDs. Una coincidencia textual parcial no autoriza a fusionar variantes.
6. Las etiquetas describen lo que pide el enunciado. No anticipan un resultado ni dan por elegida una técnica que aún no se haya revisado.

## 5. Pasada 0: preparación completada, registro histórico

- [x] Inventariar las 215 fuentes con rutas y huellas, sin modificar los originales.
- [x] Separar indicios automáticos y datos confirmados; detectar duplicados y límites de extracción.
- [x] Registrar los nueve temas y sus epígrafes.
- [x] Identificar visualmente las dos páginas y los ocho ejercicios del piloto de junio de 2019.
- [x] Reservar sus ocho pares `.tex`, todos pendientes y sin respuestas.
- [x] Preparar CSV, plantillas, contratos y estructura modular para Overleaf.
- [x] Comprobar generación, filtros, integridad de datos y compilación de ambos modos.
- [x] Empaquetar y verificar el ZIP autónomo para Overleaf.

El inventario automático no cierra la identificación de todos los exámenes: seis archivos de 2008 contienen examen y criterios juntos aunque el nombre haya priorizado la categoría `criterios`; seis PDF de 2009 requieren lectura visual; doce DOC necesitan conversión de copias. La carpeta genérica mezcla cursos. Una capa de texto antigua puede mostrar un año diferente al de la página visible.

## 6. Pasada 1: transcribir, indexar y clasificar por tandas

**Unidad de trabajo: un examen completo**, con todos sus ejercicios, opciones, bloques y anexos necesarios. Si un original combinado es largo, dividir la ejecución por páginas conservando una única ficha del examen. No abrir otro lote hasta dejar el actual trazable o documentar el bloqueo concreto.

### Procedimiento obligatorio de cada tanda

Estas casillas describen el procedimiento repetible para todo el banco y permanecen abiertas. Los cierres particulares de L001-L016 se registran en sus informes y en la cola, sin declarar completadas las pasadas de los otros 65 candidatos.

- [ ] Leer visualmente todas las páginas y la cabecera; identificar instrucciones generales, optatividad, curso, duración, modelos y puntuación.
- [ ] Conciliar duplicados y asignar o reutilizar `documento_id` y `examen_id`; registrar evidencia de los metadatos.
- [ ] Contar ejercicios y apartados sobre la página visible; no confiar en el orden del texto extraído.
- [ ] Escribir **todos los enunciados completos** de ese examen en sus fragmentos: texto, fórmulas, matrices, condiciones, unidades, apartados, puntuaciones y figuras necesarias.
- [ ] Crear una fila por ejercicio en `datos/ejercicios.csv`, enlazar fuentes auxiliares y reservar su solución con comentarios, sin desarrollarla.
- [ ] Asignar tema principal, secundarios, epígrafes y etiquetas; mantener provisional lo que requiera otra revisión.
- [ ] Registrar ilegibilidad, posibles erratas o anomalías en `datos/incidencias.csv`. Mantener el enunciado original; no corregirlo en silencio.
- [ ] Marcar la transcripción como `borrador`; seleccionar el lote con pendientes y activar `\IncluirBorradores=si` para comprobar la sintaxis y maquetación de los fragmentos en ambos modos. Sin ese control, sólo se prueban los avisos de los fragmentos omitidos. Restaurar `no` tras la revisión.
- [ ] Anotar cuántos ejercicios se han escrito, cuáles quedan bloqueados y qué debe cotejarse. No marcar `cotejada` con esta primera lectura.
- [ ] Añadir una entrada `feat/docs/check` al diario con rutas, recuentos y próximo lote.

### Orden de trabajo

La cola detallada y sus fuentes están en [LOTES_DE_TRANSCRIPCION.md](docs/LOTES_DE_TRANSCRIPCION.md). Sus casillas se tachan cuando se cierra la primera pasada del lote, sin confundirla con el cierre editorial final.

1. **L001 cerrada: titular de junio de 2019.** Ocho ejercicios A1–A4 y B1–B4 escritos, indexados, cotejados y con clasificación verificada; ocho soluciones intactas y pendientes. Se conservan los IDs reservados. Ver [evidencia del lote](docs/lotes/L001_2019_TITULAR_JUNIO.md).
2. **L002 cerrada: titular de septiembre de 2019**, fuente `SRC-F06C106EBDD7`. Ocho enunciados escritos, indexados, cotejados y con clasificación verificada; ocho soluciones nuevas de solo comentarios. [Evidencia de L002](docs/lotes/L002_2019_TITULAR_SEPTIEMBRE.md).
3. **L003 cerrada: suplente de junio de 2019**, fuente `SRC-2428AFE65CF4`. Ocho enunciados escritos, indexados, cotejados y con clasificación verificada; ocho soluciones nuevas de solo comentarios. [Evidencia de L003](docs/lotes/L003_2019_SUPLENTE_JUNIO.md).
4. **L004 cerrada: suplente de septiembre de 2019**, fuente `SRC-D8602844841D`. Ocho enunciados escritos, indexados, cotejados y con clasificación verificada; ocho soluciones nuevas de solo comentarios. [Evidencia de L004](docs/lotes/L004_2019_SUPLENTE_SEPTIEMBRE.md).
5. **L005 cerrada: carpeta Reserva A de 2019**, fuente `SRC-AA763712E273`. Ocho enunciados cotejados y clasificados; convocatoria vacía, reserva A de carpeta y modelo no indicado. [Evidencia](docs/lotes/L005_2019_RESERVA_A.md).
6. **L006 cerrada: carpeta Reserva B de 2019**, fuente `SRC-2A3EF72FCF2C`. Ocho ejercicios cotejados y clasificados, sin soluciones. [Evidencia](docs/lotes/L006_2019_RESERVA_B.md).
7. **L007 cerrada: ordinaria, curso 2020-2021**, fuente SRC-FBFCFE3C7E1A. Ocho ejercicios por bloques, cotejados y clasificados, sin soluciones. [Evidencia](docs/lotes/L007_2021_ORDINARIA.md).
8. **L008 cerrada: archivo ORD_SUPLENTE, curso 2020-2021**, fuente SRC-BA1C2B38E5F9. Ocho ejercicios cotejados y clasificados; convocatoria/tipo sólo del nombre y modelo no impreso. [Evidencia](docs/lotes/L008_2021_SUPLENTE.md).
9. **L009 cerrada: archivo ORD_RESER, curso 2020-2021**, fuente SRC-83FBE1FE77CE. Ocho ejercicios cotejados y clasificados; convocatoria/tipo sólo del nombre, sin letra ni modelo impresos. [Evidencia](docs/lotes/L009_2021_RESERVA.md).
10. **L010 cerrada: extraordinaria, curso 2020-2021**, fuente SRC-CC4942CDBF40. Ocho ejercicios cotejados y clasificados; convocatoria/curso impresos, titular/julio del nombre y modelo vacío. [Evidencia](docs/lotes/L010_2021_EXTRAORDINARIA.md).
11. **L011 cerrada: archivo EXTRA_SUPLENTE, curso 2020-2021**, fuente SRC-4A2C6F053641. Ocho ejercicios cotejados y clasificados; curso impreso, convocatoria/tipo del nombre y modelo vacío. [Evidencia](docs/lotes/L011_2021_SUPLENTE_EXTRA.md).
12. **L012 cerrada: archivo EXTRA_RESERVA_B, curso 2020-2021**, fuente SRC-3B7891337E9E. Ocho ejercicios cotejados y clasificados; curso impreso, convocatoria/reserva/B del nombre y modelo vacío. [Evidencia](docs/lotes/L012_2021_RESERVA_B_EXTRA.md).
13. **L013 cerrada: archivo P_A, curso 2019-2020**, fuente SRC-E6E569738AB3. Ocho ejercicios cotejados y clasificados; curso impreso, convocatoria/tipo/reserva/modelo vacíos. [Evidencia](docs/lotes/L013_2020_P_A.md).
14. **L014 cerrada: archivo P_B, curso 2019-2020**, fuente SRC-A176A4927D17. Ocho ejercicios cotejados y clasificados; curso impreso, convocatoria/tipo/reserva/modelo vacíos. [Evidencia](docs/lotes/L014_2020_P_B.md).
15. **L015 cerrada: archivo P_C, curso 2019-2020**, fuente SRC-96B68DD7D4B7. Ocho ejercicios cotejados y clasificados; convocatoria/tipo/reserva/modelo vacíos e INC-007 literal conservada. [Evidencia](docs/lotes/L015_2020_P_C.md).
16. **L016 cerrada: archivo P_D, curso 2019-2020**, fuente SRC-27CB206F6C61. Ocho ejercicios cotejados y clasificados; convocatoria/tipo/reserva/modelo vacíos. [Evidencia](docs/lotes/L016_2020_P_D.md).
17. **L017 cerrada: archivo P_E, curso 2019-2020.** [Informe](docs/lotes/L017_2020_P_E.md).
18. **L018 cerrada: archivo P_F, curso 2019-2020.** [Informe](docs/lotes/L018_2020_P_F.md).
19. **L019 cerrada: carpeta reserva a, curso 2017-2018.** Ocho ejercicios, opciones A/B; reserva A sólo de carpeta. [Informe](docs/lotes/L019_2018_reserva_a.md). L020 cerrada; siguiente L021, confirmar curso y naturaleza.
20. **L020 cerrada: carpeta reserva b, curso 2017-2018.** Ocho ejercicios cotejados y clasificados. [Informe](docs/lotes/L020_2018_reserva_b.md). L021 cerrada; siguiente L022: confirmar curso/naturaleza.
21. **L021 cerrada: archivo reserva_a_EXAMEN 3, curso 2016-2017.** Ocho ejercicios cotejados y clasificados. [Informe](docs/lotes/L021_2017_reserva_a.md). L022 cerrada; L023 y L024 cerradas.
22. **L022 cerrada: archivo reserva_a_EXAMEN 5, curso 2015-2016.** Ocho ejercicios cotejados y clasificados. [Informe](docs/lotes/L022_2016_reserva_a.md). L023 cerrada; L024 cerrada.
23. **L023 cerrada: archivo reserva_b_EXAMEN 2, curso 2015-2016.** Ocho enunciados cotejados y clasificados. [Informe](docs/lotes/L023_2016_reserva_b.md). L024 cerrada; L025 cerrada; siguiente L026, confirmar curso/naturaleza.
24. **L024 cerrada: archivo reserva_b_EXAMEN 2, curso 2016-2017.** Ocho enunciados cotejados y clasificados. [Informe](docs/lotes/L024_2017_reserva_b.md). L025 cerrada; siguiente L026: confirmar curso/naturaleza.
25. **L025 cerrada: archivo suplemente_junio_EXAMEN 4, curso 2016-2017.** Ocho enunciados cotejados y clasificados. [Informe](docs/lotes/L025_2017_suplemente_junio.md). Siguiente L026: confirmar curso/naturaleza.
26. Fuentes de 2021 y documentos de 2020 en la carpeta mixta: revisar estructura de bloques y regla de elección, distintas de la antigua opción A/B.
27. Resto de la carpeta mixta: confirmar años visualmente antes de distribuir por cursos; resolver sus copias de 2015 con las carpetas anuales.
28. Fuentes anuales de 2015, 2014 y 2013, con deduplicación y cotejo de opciones.
29. Fuentes de 2011, 2010, 2009 y 2008. Para escaneados, OCR sólo como ayuda; verificar visualmente cada signo y separar examen/criterios en documentos combinados.
30. DOC de 2012: convertir **copias** a un formato legible y cotejar la conversión página a página antes de transcribir. No inferir el modelo del número de carpeta. Se deja este grupo al final para disponer de una tanda específica de conversión y cotejo.

No se marca una tanda como escrita por haber extraído su texto automáticamente. Las figuras, signos de desigualdad, extremos de intervalos, parámetros, porcentajes y condiciones de muestreo exigen revisión visual.

## 7. Pasada 2: cotejo literal independiente

Se puede hacer tras cada tanda para evitar acumular errores. Una segunda lectura contrasta el PDF de salida y cada fragmento con las páginas originales, sin basarse sólo en la transcripción anterior.

- [ ] Comprobar palabras, tildes, signos, fórmulas, índices, exponentes, fracciones, llaves y dimensiones de matrices.
- [ ] Comprobar todos los datos, límites, desigualdades estrictas/no estrictas, parámetros, unidades y redondeos solicitados.
- [ ] Comprobar numeración, apartados, puntos, instrucciones y contexto compartido.
- [ ] Comprobar imágenes, escalas, leyendas y legibilidad al imprimir.
- [ ] Mantener literal cualquier anomalía del original y documentar la duda fuera del enunciado.
- [ ] Cerrar o mantener justificadas las incidencias. Marcar `cotejada` únicamente con evidencia de esta revisión.

La fidelidad exigida se refiere al contenido y a su representación matemática. La composición del banco será homogénea: no se promete un facsímil de logotipos, fuentes o saltos de página del examen original.

## 8. Pasada 3: clasificación y cierre del banco de preguntas

- [ ] Revisar temas principales/secundarios y correspondencia con los 86 epígrafes; cambiar clasificación a `verificada`.
- [ ] Normalizar sinónimos de etiquetas y documentar nuevas etiquetas sin alterar IDs.
- [ ] Conciliar el número de ejercicios por examen con cada fuente canónica y sus alias; resolver documentos combinados.
- [ ] Validar enlaces y recursos, pares `.tex`, estados e integridad de IDs y huellas.
- [ ] Probar selecciones por tema, mezcla de temas, etiquetas, año, tipo, modelo, opción, bloque y lista explícita.
- [ ] Compilar el banco en modo enunciados y modo enunciados/soluciones; los huecos de solución deben declararse como pendientes.
- [ ] Revisar visualmente todos los PDF de lote; registrar herramientas, resultados y páginas revisadas.
- [ ] Obtener una matriz de cobertura real de los nueve temas y declarar lagunas de las fuentes, sin inventar ejercicios para cubrirlas.

## 9. Fase final futura: soluciones en varias pasadas, inactiva ahora

**No iniciar esta fase en esta entrega.** Requiere activar posteriormente la redacción y trabajar con enunciados cotejados. No rellenar archivos con respuestas extraídas de criterios ni generar soluciones de muestra.

### 4A. Elaboración matemática

- [ ] Explicitar datos, incógnitas, objetivo, teoría y condiciones de aplicación.
- [ ] Desarrollar la estrategia y todas las operaciones necesarias, con justificaciones y unidades; evitar saltos que impidan aprender el procedimiento.
- [ ] Interpretar el resultado en el contexto, respetar precisión y comprobar restricciones. Estado `borrador`.

### 4B. Verificación independiente

- [ ] Resolver o comprobar por una vía independiente; sustituir en ecuaciones, revisar extremos y casos límite, probabilidades y condiciones estadísticas.
- [ ] Comparar con criterios oficiales cuando existan sin tratarlos como infalibles. Separar discrepancias, erratas de fuente y errores propios.
- [ ] Revisar todas las cuentas y redondeos. Estado `revisada_matematicamente`.

### 4C. Revisión didáctica y teórica

- [ ] Explicar por qué se elige cada procedimiento, recordar la teoría necesaria y señalar errores frecuentes útiles para ese ejercicio.
- [ ] Distinguir datos originales y supuestos explícitos; no cambiar el problema para obtener una respuesta cómoda.
- [ ] Hacer legibles las tablas, fórmulas, gráficos y pasos; enlazar epígrafes teóricos por ID cuando se prepare la futura integración web. Estado `revisada_didacticamente`.

### 4D. Validación editorial y compilación

- [ ] Cotejar enunciado/solución, puntuación, notación y conclusión; resolver incidencias o señalar las limitaciones.
- [ ] Compilar las dos variantes, inspeccionar todas las páginas y verificar que una ficha de sólo preguntas no incluya respuestas.
- [ ] Marcar `validada` sólo tras completar las revisiones. Las demás soluciones seguirán mostrando un aviso de pendiente en la salida normal.

## 10. Arquitectura de composición

El CSV es la fuente del catálogo. El generador local escribe `catalogo/registro.tex` y una selección de IDs. Esos archivos se incluyen en el ZIP: **Overleaf sólo compila LaTeX**, sin Python, conexiones externas ni permisos de ejecución.

- `main.tex` reúne paquetes, opciones, selección, comandos y catálogo.
- Cada ID apunta a un fragmento de enunciado y a otro de solución. Ninguno contiene `documentclass`, preámbulo o un documento completo.
- Los estados controlan la salida normal: sólo `cotejada` carga el enunciado y sólo `validada` carga la solución. Otros estados producen un aviso visible. Para revisar futuros enunciados `borrador` se puede activar `\IncluirBorradores=si`; aparecen identificados como borradores. Este control no habilita soluciones sin validar.
- La selección inicial apunta a L025: `selecciones/l025-suplemente-junio-2017.tex`; dos modos compilados y 200 soluciones pendientes.

## 11. Criterio de cierre de cada entrega

Una entrega sólo se cierra cuando constan: fuentes usadas, IDs afectados, cambios de estado, archivos producidos, comprobaciones ejecutadas, páginas revisadas, incidencias abiertas y siguiente tanda. Las tareas no ejecutadas conservan la casilla vacía.


## Acceso y selección dirigida

Acceso individual: [índice de los 200 ejercicios](INDICE_EJERCICIOS.md), con enlace directo al enunciado, procedencia, temas, epígrafes y etiquetas; [guía de relaciones dirigidas](docs/GUIA_RELACIONES.md). Ejemplo listo para compilar: `relacion-ejemplo.tex`. Las selecciones combinan IDs sin copiar contenidos; se conserva el orden del catálogo. Las etiquetas de unidades y comparación de tamaño muestral describen lo solicitado, sin resolverlo.

### Cierre secuencial añadido

- [x] L018 · transcripción, cotejo, indexación y controles. [Informe](docs/lotes/L018_2020_P_F.md).
- [x] L019 · transcripción, cotejo, indexación y controles. [Informe](docs/lotes/L019_2018_reserva_a.md).
- [x] L020 · transcripción, cotejo, indexación y controles. [Informe](docs/lotes/L020_2018_reserva_b.md).
- [x] L021 · transcripción, cotejo, clasificación y controles. [Informe](docs/lotes/L021_2017_reserva_a.md).
- [x] L022 · transcripción, cotejo, clasificación y controles. [Informe](docs/lotes/L022_2016_reserva_a.md).
- [x] L023 · transcripción, cotejo, clasificación y controles. [Informe](docs/lotes/L023_2016_reserva_b.md).
- [x] L024 · transcripción, cotejo, clasificación y controles. [Informe](docs/lotes/L024_2017_reserva_b.md).
- [x] L025 · transcripción, cotejo, clasificación y controles. [Informe](docs/lotes/L025_2017_suplemente_junio.md).
- [ ] L026 · confirmar curso/naturaleza de suplemente_septiembre_EXAMEN 4-ANDALUCÍA.pdf; transcribir sin soluciones.

## Procedencia y estructura de L019

**Identificación L019:** curso 2017-2018 confirmado por ambas cabeceras, año 2018. Reserva A sólo por carpeta, sin convocatoria ni modelo acreditados. Opciones A/B impresas, ejercicios 1-4 por opción; no bloques. Cabecera sin ámbito territorial impreso: no se añade Andalucía a su transcripción. Criterios concordantes y tabla normal genérica asociada por carpeta, sin año propio. Modelo vacío y requiere_revision=si por estos límites. Los metadatos y evidencias anteriores conservan su alcance; L013-L018 siguen siendo curso 2019-2020.

## Procedencia y estructura de L020

**Identificación L020:** curso 2017-2018 confirmado por ambas cabeceras; reserva B sólo por carpeta, convocatoria y modelo vacíos. Opciones A/B impresas, cuatro ejercicios por opción; sin bloques ni ámbito territorial impreso. Criterios y tabla normal genérica asociados por carpeta. INC-008 conserva la discrepancia a/b/b de criterios frente a a/b/c del examen; el enunciado sigue a/b/c y el literal (1punto). Identificación parcialmente confirmada; requiere_revision=si por estos límites. T05 secundario de B1 por el sistema de ecuaciones matriciales, interpretable por entradas sin imponer un procedimiento. L013-L018 conservan curso 2019-2020; L019 su evidencia propia.

## Procedencia y estructura de L021

**Identificación L021:** UNIVERSIDADES DE ANDALUCÍA y curso 2016-2017 impresos en ambas cabeceras; año 2017 confirmado. Reserva A sólo del nombre del archivo, convocatoria/modelo vacíos y número 3 sin valor de modelo acreditado. Opciones A/B con ejercicios 1-4, sin bloques. Criterios SRC-4DFB0FF51804 concordantes; fuente_tabla vacía al no haber tabla específicamente asociada. Todos los totales 2.5 son derivados de apartados, sin añadirlos al cuerpo. Identificación parcialmente confirmada y requiere_revision=si por límites de metadatos.

## Procedencia y estructura de L022

**Identificación L022:** UNIVERSIDADES DE ANDALUCÍA, PRUEBA DE ACCESO A LA UNIVERSIDAD y curso 2015-2016 impresos; año 2016 confirmado. Reserva A sólo del nombre; convocatoria/modelo vacíos y número 5 sin valor de modelo acreditado. Opciones A/B de cuatro ejercicios, sin bloques. Criterios SRC-5F93069BAB36 concordantes; sin tabla específicamente asociada. A2/B1/B4 imprimen 2.5, otros cinco totales derivados. INC-009: A4b no explicita afijación proporcional; conservar y revisar al resolver, sin añadir supuestos. B4 contraste histórico en T09.1/T08.3 con etiquetas específicas, sin inventar epígrafe ni excluirlo. Requiere_revision=si por metadatos y, en A4, esa limitación docente.

## Procedencia y estructura de L023

**Identificación L023:** curso 2015-2016 y UNIVERSIDADES DE ANDALUCÍA impresos; reserva B sólo del nombre, convocatoria/modelo vacíos y 2 sin valor de modelo acreditado. Opciones A/B de cuatro ejercicios, sin bloques. Candidato SRC-B1EA93903484 rechazado: imprime 2016-2017 y otro contenido/puntuación. Búsqueda textual en criterios inventariados sin identificar otro concordante, sin afirmar ausencia absoluta. fuente_criterios y fuente_tabla vacías; asociación auxiliar pendiente. Totales 2.5 derivados sólo de apartados del examen, sin acreditarlos por criterios. Contraste histórico A4 conservado en T09.1/T08.3. Requiere_revision=si por metadatos y auxiliares.

## Procedencia y estructura de L024

**Identificación L024:** curso 2016-2017 impreso; reserva B sólo del nombre, convocatoria/modelo vacíos y 2 sin valor de modelo acreditado. Opciones A/B de cuatro ejercicios, sin bloques. Criterios SRC-B1EA93903484 asociados por curso, contenido y puntuaciones; siguen sin asociarse a L023 (curso distinto). Sin tabla específicamente asociada. A1 imprime total 2.5; los siete restantes derivan de apartados y concuerdan con criterios, sin añadirlos al cuerpo. A4 pide representación proporcional explícita, sin afirmar muestreo aleatorio. Requiere_revision=si por límites de metadatos.

## Procedencia y estructura de L025

**Identificación L025:** curso 2016-2017 impreso; suplemente_junio sólo del nombre, sin acreditar convocatoria ordinaria ni fecha. Convocatoria, tipo, reserva y modelo vacíos; 4 no acredita modelo. Opciones A/B de cuatro ejercicios, sin bloques. Criterios SRC-57188FF1F0A8 asociados por curso, contenido y puntuaciones. Sin tabla específicamente asociada. A1 imprime total 2.5; los siete restantes derivan de apartados y concuerdan con criterios, sin añadirlos al cuerpo. Requiere_revision=si por límites de metadatos. Nuevas etiquetas: seleccion-sin-reposicion y clasificacion-discontinuidades. B4 pide amplitud total e intervalo, no tamaño muestral; A4 mantiene error estrictamente inferior a0.03.
## Diario

### 2026-10-22 · docs/data/scaffold: preparación de Selectividad

- `data`: 215 fuentes inventariadas, 163 huellas distintas; originales conservados.
- `review`: ocho ejercicios del piloto de junio de 2019 identificados visualmente; clasificación provisional. Modelo no indicado; convocatoria/tipo proceden de la carpeta.
- `scaffold`: ocho pares de fragmentos reservados; cero enunciados transcritos y cero soluciones redactadas.
- `docs`: plan por pasadas, contrato CSV, cola por fuentes y protocolo de transcripción.
- `next`: primera pasada de L001 con transcripción literal, indexación y clasificación conjunta.

### 2026-10-22 · test/build/docs: cierre de la preparación

- `test`: 17 pruebas superadas; 215 fuentes con huellas coincidentes, ocho registros válidos y 16 fragmentos de sólo comentarios.
- `build`: selección vacía y piloto en dos modos compilados localmente; cinco páginas de avisos inspeccionadas. Ningún enunciado o solución se ha dado por redactado.
- `package`: ZIP autónomo para Overleaf comprobado; LaTeX incluido idéntico al compilado, originales y resultados temporales excluidos.
- `docs`: [verificación y límites](docs/VERIFICACION_PREPARACION.md) registrados. La compilación se ha hecho con Tectonic local, sin iniciar sesión en Overleaf.
- `next`: L001 permanece pendiente. Escribir sus ocho enunciados completos, conservar vacías las soluciones y registrar después el cotejo independiente.

### 2026-10-22 · feat/review/build/test/docs: cierre de L001

- `feat`: ocho enunciados completos de `D0001` / `EXA-0001` escritos e indexados, con apartados, datos, fórmulas y puntuaciones originales; ningún ejercicio resuelto.
- `review`: cotejo literal independiente y contraste de fuente y representación PDF de los ocho enunciados; estados `cotejada` y ocho clasificaciones `verificada`. Convocatoria/tipo conservan la evidencia de carpeta; modelo no indicado, examen parcialmente confirmado.
- `build`: composición modular en los dos modos; la variante combinada declara las ocho soluciones pendientes. No se atribuye a este lote la terminación del banco.
- `test`: 17 pruebas superadas; 215 fuentes originales con huellas coincidentes y ocho archivos de solución sin cambios en sus huellas.
- `docs`: [informe de cierre y evidencias](docs/lotes/L001_2019_TITULAR_JUNIO.md); L001 marcada en la cola. Es un registro de trabajo, sin commit de Git.
- `next`: L002, titular septiembre de 2019, `SRC-F06C106EBDD7`; 83 lotes candidatos aún pendientes de primera pasada. Soluciones futuras inactivas.

### 2026-10-22 · feat/review/build/test/docs: cierre de L002

- `feat`: ocho enunciados completos de `D0002` / `EXA-0002` escritos e indexados, sin cambiar los ocho de L001.
- `review`: cotejo literal independiente y clasificación de los ocho enunciados de L002 verificados; estados acumulados: 16 `cotejada` y 16 `verificada`. Convocatoria/tipo de carpeta, modelo no indicado; los patinetes A/B/C no identifican modelos de examen.
- `solutions`: 16 `no_redactada`: ocho archivos anteriores con huellas intactas y ocho nuevos de solo comentarios; ninguna solución escrita.
- `build`: selección inicial trasladada a L002 y envolturas `l002-enunciados.tex` / `l002-con-soluciones.tex`; dos PDF de cuatro páginas cada uno, ocho páginas finales inspeccionadas, sin avisos críticos y con todos los apartados completos. Los dos PDF anteriores de L001 conservan sus huellas.
- `test`: 17 pruebas de L002 superadas; validador con 16 ejercicios y 215 fuentes de huellas coincidentes. Los ocho enunciados y las ocho soluciones anteriores de L001 conservan sus huellas; las 16 soluciones contienen solo comentarios.
- `docs`: [informe L002](docs/lotes/L002_2019_TITULAR_SEPTIEMBRE.md); dos de 84 lotes candidatos cerrados, 82 pendientes. Sin commit de Git.
- `next`: L003, suplente junio de 2019, fuente `SRC-2428AFE65CF4`. Soluciones futuras inactivas.

### 2026-10-22 · feat/review/build/test/docs: cierre de L003

- `feat`: ocho enunciados completos de `D0003` / `EXA-0003` escritos e indexados; los 16 anteriores permanecen conservados.
- `review`: cotejo textual independiente de los ocho nuevos enunciados y clasificación verificada; cinco páginas de borrador y las ocho páginas finales revisadas. Junio/suplente procede de carpeta, modelo no indicado. A4 mantiene amplitud total como máximo de 5 mg, no margen de error.
- `solutions`: 24 `no_redactada`: 16 archivos anteriores intactos y ocho nuevos de solo comentarios; ninguna respuesta redactada.
- `build`: selección inicial de L003 y envolturas `l003-enunciados.tex` / `l003-con-soluciones.tex`; dos PDF de cuatro páginas cada uno, ocho páginas finales vistas y cotejadas, sin avisos críticos ni apartados partidos.
- `test`: 17 pruebas de L003 superadas; 24 ejercicios válidos y 215 huellas SHA-256 coincidentes. Los 16 enunciados, 16 soluciones y cuatro PDF anteriores conservan sus huellas; las 24 soluciones contienen solo comentarios.
- `docs`: [informe L003](docs/lotes/L003_2019_SUPLENTE_JUNIO.md); tres de 84 candidatos cerrados en transcripción, cotejo y clasificación, 81 pendientes. Sin commit de Git.
- `next`: L004, suplente septiembre de 2019, fuente `SRC-D8602844841D`. Las soluciones siguen inactivas.

### 2026-10-22 · feat/review/build/test/docs: cierre de L004

- `feat`: ocho enunciados completos de `D0004` / `EXA-0004` escritos e indexados; se conservan los 24 anteriores.
- `review`: cotejo literal independiente y clasificación de los ocho nuevos enunciados; acumulado de 32 `cotejada` y 32 `verificada`. Septiembre/suplente procede de carpeta, modelo no indicado. B1 mantiene la ecuación con potencia cuarta y B4 conserva los nueve datos y el error inferior a 500 horas.
- `solutions`: 32 `no_redactada`: 24 archivos anteriores intactos y ocho nuevos de solo comentarios; ninguna respuesta redactada.
- `build`: dos PDF finales de cuatro páginas cada uno y ocho páginas vistas, sin defectos finales; ocho avisos de solución pendiente sólo en el modo combinado. ZIP extraído y compilado de forma independiente: ambas salidas coinciden byte a byte; la selección de L003 también reproduce su PDF anterior.
- `test`: 17 pruebas superadas, 32 ejercicios válidos y 215 fuentes con huellas coincidentes. Los 24 enunciados, 24 soluciones y seis PDF anteriores conservan sus huellas; las 32 soluciones contienen sólo comentarios.
- `docs`: [informe L004](docs/lotes/L004_2019_SUPLENTE_SEPTIEMBRE.md); cuatro de 84 candidatos cerrados en transcripción, cotejo y clasificación, 80 pendientes. Registro documental sin commit de Git.
- `next`: L005, carpeta Reserva A de 2019, fuente `SRC-AA763712E273`. Cotejar cabecera antes de confirmar identidad; las soluciones siguen inactivas.

### 2026-10-22 · feat/review/build/test/docs: cierre de L005

- `feat`: ocho ejercicios completos D0005 / EXA-0005, con ocho reservas de solución; A1 mantiene juntos sus apartados de matrices y programación lineal.
- `review`: segunda pasada visual completa del mismo autor, separada de la escritura; ocho transcripciones `cotejada` y ocho clasificaciones `verificada`. Reserva A sólo de carpeta, convocatoria vacía y modelo no indicado.
- `build`: dos PDF finales de cuatro páginas cada uno y ocho páginas revisadas sin defectos finales. ZIP extraído y compilado de forma independiente, con ambas salidas idénticas byte a byte y reproducción exacta del PDF de enunciados de L004.
- `test`: 17 pruebas superadas; 40 ejercicios válidos y 215 fuentes con huellas coincidentes. Los 32 enunciados, 32 soluciones y ocho PDF anteriores conservan sus huellas; las 40 soluciones contienen sólo comentarios.
- `docs`: [informe L005](docs/lotes/L005_2019_RESERVA_A.md). Cinco de 84 candidatos cerrados, 79 pendientes. Registro de trabajo sin commit de Git.
- `next`: L006, carpeta Reserva B de 2019, fuente `SRC-2A3EF72FCF2C`. No iniciar soluciones.

### 2026-10-22 · feat/review/build/test/docs: cierre de L006

- `feat`: ocho ejercicios completos D0006 / EXA-0006 y ocho reservas de solución. B2 conserva juntos los apartados de función, tangente e integral.
- `review`: segunda pasada completa de cotejo por el mismo autor; ocho `cotejada` y ocho clasificaciones `verificada`. Reserva B sólo de carpeta; convocatoria y modelo vacíos. A1 conserva puntuación impresa; se preservan «matrix» (INC-006) y el dato 120 sin corregirlos.
- `build`: dos PDF finales de cuatro páginas y ocho páginas revisadas. ZIP extraído y compilado en carpeta independiente; las dos salidas y el PDF anterior de enunciados de L005 coinciden byte a byte.
- `test`: 17 pruebas superadas, 48 ejercicios válidos y 215 huellas originales coincidentes. Los 40 enunciados, 40 soluciones y diez PDF anteriores permanecen intactos; las 48 soluciones contienen sólo comentarios.
- `docs`: [informe L006](docs/lotes/L006_2019_RESERVA_B.md). Seis de 84 candidatos cerrados y 78 pendientes; sin commit de Git.
- `next`: L007, `SRC-FBFCFE3C7E1A`, carpeta mixta; candidato 2021 por verificar, sin soluciones.

### 2026-10-22 · feat/review/build/test/docs: cierre de L007

- `feat`: ocho ejercicios D0007 / EXA-0007 transcritos y clasificados; numeración global y bloques A-D, ocho soluciones de sólo comentarios. D7 conserva dos cuestiones bajo un único 1.5.
- `review`: segunda pasada visual completa del mismo autor; convocatoria ordinaria y curso 2020-2021 confirmados. Titular/junio sólo del nombre, modelo no impreso; no se confirma Modelo-2 por el nombre de criterios.
- `build`: preguntas de cuatro páginas y combinado de cinco, nueve páginas revisadas. ZIP extraído y compilado de forma independiente; ambas salidas y enunciados de L006 idénticos byte a byte.
- `test`: 17 pruebas superadas, 56 ejercicios válidos y 215 fuentes con huellas coincidentes. Los 48 enunciados, 48 soluciones y doce PDF anteriores intactos; 56 soluciones sin respuestas. Filtros reales por bloques devuelven 1-2/3-4/5-6/7-8, sin confundir opción A con bloque A.
- `docs`: [informe L007](docs/lotes/L007_2021_ORDINARIA.md), siete de 84 candidatos cerrados y 77 pendientes; sin commit de Git.
- `next`: L008, SRC-BA1C2B38E5F9; nombre ORD_SUPLENTE/Modelo-4/2021 pendiente de cotejar. No iniciar soluciones.

### 2026-10-22 · feat/review/build/test/docs: cierre de L008

- `feat`: ocho ejercicios completos D0008 / EXA-0008, con bloques A-D y numeración global; ocho soluciones de sólo comentarios. B3 conserva continuidad, gráfica y área en una sola unidad; D8 conserva media muestral, intervalo e interpretación.
- `review`: segunda pasada visual completa del mismo autor y borrador de cinco páginas revisados. Curso 2020-2021 impreso; ordinaria/suplente/Modelo-4 sólo en nombres, sin confirmar modelo. Varianza 256 g², suma 63744 g, unidades en miles y desigualdades preservadas sin resolver.
- `build`: dos PDF de cuatro páginas, ocho páginas finales revisadas. ZIP extraído y compilado por separado: ambas salidas y los enunciados de L007 idénticos byte a byte.
- `test`: 17 pruebas superadas en 37.927 s, 64 ejercicios válidos y 215 huellas originales coincidentes. Los 56 enunciados, 56 soluciones y catorce PDF anteriores intactos; 64 soluciones sin respuestas. Filtros por bloque y por opción comprobados sobre el catálogo real.
- `docs`: [informe L008](docs/lotes/L008_2021_SUPLENTE.md), ocho de 84 candidatos cerrados y 76 pendientes; sin commit de Git.
- `next`: L009, SRC-83FBE1FE77CE; ORD_RESER/Modelo-3 del nombre por verificar. No iniciar soluciones.

### 2026-10-22 · feat/review/build/test/docs: cierre de L009

- `feat`: ocho ejercicios completos D0009 / EXA-0009, bloques A-D y números globales; ocho soluciones de sólo comentarios. A1 conserva dos problemas, B4 derivadas y primitiva, D7 afijación y distribución de medias en sus unidades originales.
- `review`: segunda pasada visual completa del mismo autor; cinco páginas de borrador y nueve páginas finales revisadas. Curso 2020-2021 impreso; convocatoria/reserva/Modelo-3 sólo de nombres, sin letra ni modelo impresos. D7b se conserva sin añadir reposición; D8b mantiene amplitud como máximo 0.2.
- `build`: preguntas de cuatro páginas y combinado de cinco. ZIP extraído y compilado por separado: ambas salidas y los enunciados anteriores de L008 idénticos byte a byte. Entrada principal con L009 comprobada por texto y renderizados.
- `test`: 17 pruebas en 12.876 s; catálogo válido de 72 ejercicios y 215 originales con huellas coincidentes. Los 64 enunciados, 64 soluciones y dieciséis PDF anteriores intactos. Las 72 soluciones contienen sólo comentarios; filtros reales comprobados.
- `docs`: [informe L009](docs/lotes/L009_2021_RESERVA.md), nueve de 84 candidatos cerrados y 75 pendientes; sin commit de Git.
- `next`: L010, SRC-CC4942CDBF40, archivo EXTRA_TITULAR/JULIO por verificar. No iniciar soluciones.

### 2026-10-22 · feat/review/build/test/docs: cierre de L010

- `feat`: ocho ejercicios completos D0010 / EXA-0010, bloques A-D y números globales; ocho soluciones de sólo comentarios. Tabla de la página 3 identificada como auxiliar, sin crear un noveno ejercicio.
- `review`: segunda pasada visual completa del mismo autor; cinco páginas de borrador y nueve páginas finales revisadas. Extraordinaria y curso 2020-2021 impresos; titular/julio y Modelo-5 de nombres, sin modelo impreso. B3 conserva exponencial e integral definida; D8 desviación típica 4 y doce datos en orden.
- `build`: preguntas de cuatro páginas y combinado de cinco. ZIP extraído y compilado por separado: ambas salidas y los enunciados de L009 idénticos byte a byte. Entrada principal con L010 comprobada por texto y renderizados.
- `test`: 17 pruebas en 14.378 s; catálogo válido de 80 ejercicios y 215 originales con huellas coincidentes. Los 72 enunciados, 72 soluciones y dieciocho PDF anteriores intactos; 80 soluciones de sólo comentarios. Filtros reales comprobados.
- `docs`: [informe L010](docs/lotes/L010_2021_EXTRAORDINARIA.md), diez de 84 candidatos cerrados y 74 pendientes; sin commit de Git.
- `next`: L011, SRC-4A2C6F053641, archivo EXTRA_SUPLENTE_Modelo-1; verificar datos antes de transcribir. No iniciar soluciones.

### 2026-10-22 · feat/review/build/test/docs: cierre de L011

- `feat`: ocho ejercicios completos D0011 / EXA-0011 y ocho soluciones de sólo comentarios. B4a y D7b conservan tres cuestiones con sus puntuaciones conjuntas; A1 mantiene total impreso.
- `review`: segunda pasada visual completa del mismo autor; cinco páginas de borrador y nueve páginas finales revisadas. Curso 2020-2021 impreso; extraordinaria/suplente/Modelo-1 sólo de nombres. D7a conserva su convención no explicitada; D8 varianza 81 y niveles 95/98 sin alterarlos.
- `build`: preguntas de cuatro páginas y combinado de cinco. ZIP extraído y compilado por separado: ambas salidas y los enunciados de L010 idénticos byte a byte. Entrada principal con L011 comprobada por texto y renderizados.
- `test`: 17 pruebas en 16.896 s, 88 ejercicios válidos y 215 originales con huellas coincidentes. Los 80 enunciados, 80 soluciones y veinte PDF anteriores intactos; 88 soluciones de sólo comentarios. Filtros reales verificados.
- `docs`: [informe L011](docs/lotes/L011_2021_SUPLENTE_EXTRA.md), once de 84 candidatos cerrados y 73 pendientes; sin commit de Git. Comparación de intervalos indexada y descripción de integral definida ampliada a peticiones directas, sin cambiar enunciados anteriores.
- `next`: L012, SRC-3B7891337E9E, archivo EXTRA_RESERVA_B_Modelo-6; confirmar datos. No iniciar soluciones.

### 2026-10-23 · feat/review/build/test/docs: cierre de L012

- `feat`: ocho ejercicios completos D0012 / EXA-0012 y ocho soluciones de sólo comentarios. A1 conserva total impreso y cota estricta; C6a dos preguntas bajo una puntuación conjunta; D7/D8 cambios de confianza y cotas originales.
- `review`: segunda pasada visual completa del mismo autor; cinco páginas de borrador y ocho páginas finales revisadas. Curso 2020-2021 impreso; extraordinaria/reserva/B/Modelo-6 sólo de nombres, sin modelo impreso.
- `build`: dos salidas finales de cuatro páginas. Espaciado local en la entrada combinada para evitar un aviso solo en la página final, sin modificar compartidos. ZIP extraído y compilado por separado: ambas salidas y enunciados de L011 idénticos byte a byte; entrada principal con L012 comprobada por texto y renderizados.
- `test`: 17 pruebas en 19.459 s, 96 ejercicios válidos y 215 originales con huellas coincidentes. Los 88 enunciados, 88 soluciones y veintidós PDF anteriores intactos; 96 soluciones de sólo comentarios. Filtros reales comprobados.
- `docs`: [informe L012](docs/lotes/L012_2021_RESERVA_B_EXTRA.md), doce de 84 candidatos cerrados y 72 pendientes; sin commit de Git.
- `next`: L013, SRC-E6E569738AB3, archivo matematicas_aplicadas_P_A.pdf; confirmar año y naturaleza antes de indexar. No iniciar soluciones.

### 2026-10-23 · feat/review/build/test/docs: cierre de L013

- `feat`: ocho enunciados completos D0013 / EXA-0013 y ocho soluciones de sólo comentarios; índice por temas, secundarios, epígrafes y tags. Acumulado 104/104, cero soluciones.
- `review`: segunda pasada visual completa del mismo autor; cinco páginas del borrador y nueve finales revisadas. Corregido el curso heredado del contexto antes de la entrega. Curso 2019-2020 confirmado; convocatoria, tipo, reserva y modelo vacíos, sin interpretar A como modelo.
- `build`: preguntas de cuatro páginas y combinado de cinco. ZIP extraído y compilado por separado: ambas salidas y el PDF anterior de L012 idénticos byte a byte; main.tex comprobado por texto y renderizados. Pruebas locales con Tectonic.
- `test`: 17 pruebas en 23.245 s, 104 ejercicios válidos y 215 huellas originales coincidentes. Los 96 enunciados, 96 soluciones y veinticuatro PDF anteriores intactos; 104 soluciones sólo comentarios. Filtros reales comprobados, incluido año 2020.
- `docs`: [informe L013](docs/lotes/L013_2020_P_A.md), trece de 84 candidatos cerrados y 71 pendientes. Convención futura de muestreo D7 documentada; sin respuestas de auxiliares ni commit de Git.
- `next`: L014, SRC-A176A4927D17, archivo matematicas_aplicadas_P_B.pdf; confirmar año y naturaleza. No iniciar soluciones.

### 2026-10-23 · feat/review/build/test/docs: cierre de L014

- `feat`: ocho enunciados completos D0014 / EXA-0014 y ocho soluciones de sólo comentarios; índice por temas, secundarios, epígrafes y tags. Acumulado 112/112, cero soluciones.
- `review`: segunda pasada visual completa del mismo autor; cuatro páginas de borrador y ocho finales revisadas. Curso 2019-2020 confirmado; convocatoria/tipo/reserva/modelo vacíos. A1 conserva preguntas conjuntas; A2 parámetros distintos; D7 varianza y cota estricta; D8 cambios de tamaño/confianza sin añadir datos.
- `build`: dos salidas de cuatro páginas, con espaciado común sin ajustes locales. ZIP extraído y compilado por separado: ambas salidas y el PDF anterior de L013 idénticos byte a byte; main.tex comprobado por texto y renderizados. Pruebas locales con Tectonic.
- `test`: 17 pruebas en 24.631 s; 112 ejercicios válidos y 215 huellas originales coincidentes. Los 104 enunciados, 104 soluciones y veintiséis PDF anteriores intactos; 112 soluciones sólo comentarios. Filtros reales comprobados.
- `docs`: [informe L014](docs/lotes/L014_2020_P_B.md), catorce de 84 candidatos cerrados y 70 pendientes. Nueva etiqueta comparacion-error; sin soluciones ni commit de Git.
- `next`: L015, SRC-96B68DD7D4B7, archivo matematicas_aplicadas_P_C.pdf; confirmar año y naturaleza. No iniciar soluciones.

### 2026-10-23 · feat/review/build/test/docs: cierre de L015

- `feat`: ocho enunciados completos D0015 / EXA-0015 y ocho soluciones de sólo comentarios; índice por temas, secundarios, epígrafes y tags. Acumulado 120/120, cero soluciones.
- `review`: segunda pasada visual completa del mismo autor; cinco páginas del borrador y ocho definitivas revisadas. Curso 2019-2020 confirmado; convocatoria/tipo/reserva/modelo vacíos. Literal (1 puntos) conservado en B3a, INC-007 abierta para revisión editorial futura.
- `build`: dos PDF definitivos de cuatro páginas. Ajuste de espaciado sólo en la entrada combinada para reunir avisos y enunciados, tras detectar una página con sólo aviso; cuatro páginas ajustadas revisadas de nuevo. ZIP extraído y compilado por separado: ambas salidas y el PDF anterior de L014 idénticos byte a byte; main.tex comprobado por texto y renderizados. Pruebas locales con Tectonic.
- `test`: 17 pruebas en 19.264 s; 120 ejercicios válidos y 215 huellas originales coincidentes. Los 112 enunciados, 112 soluciones y veintiocho PDF anteriores intactos; 120 soluciones sólo comentarios. Filtros reales comprobados, incluida distinción entre error con n dado y n mínimo.
- `docs`: [informe L015](docs/lotes/L015_2020_P_C.md), quince de 84 candidatos cerrados y 69 pendientes. Nueva etiqueta probabilidad-media-muestral; sin soluciones ni commit de Git.
- `next`: L016, SRC-27CB206F6C61, archivo matematicas_aplicadas_P_D.pdf; confirmar año y naturaleza. No iniciar soluciones.

### 2026-10-23 · feat/review/build/test/docs: cierre de L016

- `feat`: ocho enunciados completos D0016 / EXA-0016 y ocho soluciones de sólo comentarios; índice por temas, secundarios, epígrafes y tags. Acumulado 128/128, cero soluciones.
- `review`: segunda pasada visual completa del mismo autor; cinco páginas del borrador y ocho definitivas revisadas. Curso 2019-2020 confirmado; convocatoria/tipo/reserva/modelo vacíos. Conservados ax+1/2, e^(x³), traspuesta t, matriz O, puntuaciones conjuntas y cotas estricta/inclusiva de D7/D8.
- `build`: dos PDF definitivos de cuatro páginas. Recursos estándar de cursiva Latin Modern añadidos a la caché; salidas finales y ZIP aislado compilados sin red. Espaciado local del combinado para mantener juntos C6 y su aviso; cuatro páginas ajustadas revisadas de nuevo. Ambas salidas y el PDF anterior de L015 idénticos byte a byte en compilación aislada; main.tex comprobado por texto y renderizados. Pruebas locales con Tectonic.
- `test`: 17 pruebas en 16.816 s; 128 ejercicios válidos y 215 huellas originales coincidentes. Los 120 enunciados, 120 soluciones y treinta PDF anteriores intactos; 128 soluciones sólo comentarios. Filtros reales comprobados, incluido T05 secundario por corte de tangentes.
- `docs`: [informe L016](docs/lotes/L016_2020_P_D.md), dieciséis de 84 candidatos cerrados y 68 pendientes. Nueva etiqueta interseccion-rectas; sin soluciones ni commit de Git.
- `next`: L017, SRC-1DF0BC3EAA48, archivo matematicas_aplicadas_P_E.pdf; confirmar año y naturaleza. No iniciar soluciones.

### 2026-10-27 · feat/review/build/test/docs: cierre de L017

- `feat`: ocho enunciados D0017 y ocho soluciones de sólo comentarios; acumulado 136, cero soluciones. Índice individual, guía de relaciones y ejemplo modular; filtro exacto por epígrafe combinado con temas, tags e IDs.
- `review`: segunda pasada visual completa del mismo autor; cinco páginas de borrador y ocho finales revisadas. Curso 2019-2020 confirmado; convocatoria/tipo/reserva/modelo vacíos. Preservados varianza 4, dato −0.2, segundos frente a minutos, cotas y niveles de confianza distintos.
- `test`: 21 pruebas en 39.813 s; 215 originales y 288 archivos anteriores con huellas coincidentes. Primer intento bloqueado por permisos del directorio temporal del sistema; ejecución completa superada con temporal dentro del espacio de trabajo.
- `build`: dos PDF de cuatro páginas y ejemplo de una. ZIP aislado compilado con caché local; salidas L017, anterior L016 y ejemplo idénticos byte a byte. main.tex con texto y renderizados comprobados.
- `docs`: 17 de 84 candidatos cerrados, 67 pendientes. [Informe L017](docs/lotes/L017_2020_P_E.md). Registro sin commit de Git.
- `next`: L018, SRC-F2932C3EED6D, matematicas_aplicadas_P_F.pdf; confirmar identidad y transcribir sin iniciar soluciones.

### 2026-10-27 · feat/review/build/test/docs: cierre de L018

- `feat`: ocho enunciados D0018 / EXA-0018 y ocho soluciones de sólo comentarios; 144 cotejados y clasificados, cero soluciones. Índice individual regenerado; categorías por tema, secundarios, epígrafes y etiquetas.
- `review`: segunda pasada visual completa del mismo autor; cinco páginas del borrador y nueve finales revisadas. Curso 2019-2020 confirmado; convocatoria/tipo/reserva/modelo vacíos. Orden X A = A A^t, restricciones sin no negatividad añadida, rama racional, 2/3 y 13/20, total de café y errores estrictos preservados.
- `test`: 21 pruebas en 43.412 s; 215 fuentes verificadas y 306 archivos anteriores intactos. Filtros de ecuación matricial, viabilidad, primitiva, área, interpretación y tamaños comprobados, incluido T03 secundario.
- `build`: preguntas de cuatro páginas, combinado de cinco; ocho avisos pendientes, sin respuestas. ZIP aislado compilado con caché; salidas L018 y anterior L017 idénticas byte a byte. main.tex con texto y renderizados comprobados.
- `docs`: [informe L018](docs/lotes/L018_2020_P_F.md); 18 de 84 candidatos cerrados, 66 pendientes. Registro sin commit de Git.
- `next`: L019, SRC-88E75CEC362C, carpeta reserva a; confirmar año y procedencia sin confundir fechas del relato. No iniciar soluciones.

### 2026-10-27 · feat/review/build/test/docs: cierre de L019

- `feat`: ocho enunciados D0019 / EXA-0019 y ocho soluciones de sólo comentarios; 152 cotejados/clasificados, cero soluciones. Índice individual actualizado, IDs OA/OB-E01-E04.
- `review`: cuatro páginas de borrador y ocho finales revisadas; segunda pasada visual completa del mismo autor. Curso 2017-2018 confirmado; reserva A sólo de carpeta, convocatoria/modelo vacíos. Signos de matrices, tangente x=-2, unión/intersección y cotas estrictas preservados.
- `render`: Poppler local omitía símbolos del original por fuentes ausentes; PDFium recuperó signos y permitió cotejo completo. Originales sin modificar; salidas finales con fuentes incorporadas revisadas.
- `test`: 21 pruebas en 169.424 s; 215 fuentes y 324 archivos previos con huellas coincidentes. Filtros de opciones frente a bloques, ecuaciones matriciales, paralelismo, independencia e inferencia comprobados.
- `build`: dos PDF de cuatro páginas; ocho avisos pendientes, sin respuestas. ZIP aislado compilado; ambas salidas y anterior L018 idénticas byte a byte. main.tex comprobado por texto y renderizados.
- `docs`: [informe L019](docs/lotes/L019_2018_reserva_a.md); 19 de 84 candidatos cerrados, 65 pendientes; sin commit de Git.
- `next`: L020, SRC-42BFAAA969A1, carpeta reserva b; confirmar año/procedencia, sin iniciar soluciones.

### 2026-10-27 · feat/review/build/test/docs: cierre de L020

- `feat`: ocho enunciados D0020 / EXA-0020 y ocho soluciones de sólo comentarios; 160 cotejados y clasificados, cero respuestas. Índice individual actualizado, opciones OA/OB-E01-E04.
- `review`: segunda pasada visual completa del mismo autor; cuatro páginas del borrador y ocho finales revisadas. Curso 2017-2018 impreso; reserva B sólo de carpeta y convocatoria/modelo vacíos. Preservados mínimo de perlas negras, unidades de costes, 23 personas, sistema matricial, fronteras de tramos y b=-1/2.
- `test`: 21 pruebas en 37.551 s; 215 fuentes y 342 archivos previos con huellas coincidentes. Filtros por viabilidad, extremos absolutos, T05 secundario, estimación puntual y cota inclusiva comprobados.
- `build`: dos PDF de cuatro páginas y ocho avisos pendientes, sin respuestas. ZIP aislado compilado; ambos modos y anterior L019 idénticos byte a byte, main.tex con texto y renderizados comprobados.
- `docs`: [informe L020](docs/lotes/L020_2018_reserva_b.md); 20 de 84 candidatos cerrados, 64 pendientes. INC-008 registra la repetición b en criterios B3; examen a/b/c intacto. Sin commit de Git.
- `next`: L021, SRC-86F493C506B3, reserva_a_EXAMEN 3-ANDALUCÍA.pdf; confirmar año/naturaleza, sin soluciones.

### 2026-10-27 · feat/review/build/test/docs: cierre de L021

- `feat`: ocho enunciados D0021 / EXA-0021 y ocho soluciones de sólo comentarios; 168 cotejados/clasificados, cero respuestas. Índice individual y categorías actualizados, opciones OA/OB-E01-E04.
- `review`: segunda pasada visual completa del mismo autor; cinco páginas de borrador y ocho definitivas revisadas. Curso 2016-2017 impreso, reserva A sólo del nombre, convocatoria/modelo vacíos; 3 del archivo sin modelo acreditado. Conservados dominio 50..350, restricciones sin x>=0 añadido, condicionales, proporción externa y error sea2g.
- `build`: dos PDF de cuatro páginas, ocho avisos pendientes. Símbolo euro preservado; recursos estándar ts1-lmr10.tfm/lm-ts1.enc añadidos a caché tras primer fallo offline. Finales y ZIP aislado sólo caché; ambas salidas y anterior L020 idénticas byte a byte. main.tex por texto/renderizados comprobado.
- `test`: 21 pruebas en 39.143 s; 215 fuentes y 360 archivos previos con huellas coincidentes. Filtros de matrices, optimización, viabilidad, tangente, independencia y cota estricta comprobados.
- `docs`: [informe L021](docs/lotes/L021_2017_reserva_a.md); 21 de 84 candidatos cerrados, 63 pendientes. Sin soluciones ni commit de Git.
- `next`: L022, SRC-B5829DA89593, archivo reserva_a_EXAMEN 5 -ANDALUCÍA.pdf; confirmar curso/naturaleza antes de transcribir.

### 2026-10-27 · feat/review/build/test/docs: cierre de L022

- `feat`: ocho enunciados D0022 / EXA-0022 y ocho soluciones de sólo comentarios; 176 cotejados y clasificados, cero respuestas. Índice individual actualizado; ocho etiquetas nuevas de ingresos, compatibilidad, estratificación y contrastes.
- `review`: segunda pasada visual completa del mismo autor; cuatro páginas del borrador y ocho finales revisadas. Curso 2015-2016 impreso; reserva A sólo del nombre, convocatoria/modelo vacíos, 5 sin modelo acreditado. Preservados CBX-2AX=A^t, dos millones/x, complementario C, barra condicional, hipótesis mu>=40 y significación5.
- `test`: 21 pruebas en 37.998 s; 215 fuentes y 378 archivos previos con huellas coincidentes. Filtros de costes frente a ingresos/beneficios, estratificación y contraste histórico comprobados.
- `build`: dos PDF de cuatro páginas, ocho avisos pendientes. ZIP aislado compilado sólo caché; ambos modos y anterior L021 idénticos byte a byte, main.tex por texto y renderizados comprobado.
- `docs`: [informe L022](docs/lotes/L022_2016_reserva_a.md); 22 de 84 candidatos cerrados, 62 pendientes. INC-009 mantiene revisión de afijación no explícita; B4 contraste histórico en T09.1 sin epígrafe nuevo ni cambio de web. Sin soluciones ni commit de Git.
- `next`: L023, SRC-22D3DDA2D180, reserva_b_EXAMEN 2 -ANDALUCÍA.pdf; confirmar curso/naturaleza antes de transcribir.

### 2026-10-27 · feat/review/build/test/docs: cierre de L023

- `feat`: ocho enunciados D0023 / EXA-0023 y ocho soluciones de sólo comentarios; 184 cotejados y clasificados, cero respuestas. Índice individual actualizado; etiquetas interpretacion-derivada y comparacion-significacion añadidas.
- `review`: segunda pasada visual completa del mismo autor; cuatro páginas de borrador y ocho finales revisadas. Curso2015-2016 impreso, reserva B sólo del nombre; criterio candidato2016-2017 rechazado. Sin criterios ni tabla asociados; ocho totales derivados sólo del examen.
- `test`: 21 pruebas en 39.337 s; 215 fuentes y 396 archivos previos con huellas coincidentes. Filtros de compatibilidad matricial, derivada, unidades, contraste y error inclusivo comprobados.
- `build`: dos PDF de cuatro páginas, ocho avisos pendientes. ZIP aislado sólo caché; ambos modos y anterior L022 idénticos byte a byte, main.tex por texto/renderizados comprobado.
- `docs`: [informe L023](docs/lotes/L023_2016_reserva_b.md); 23 de 84 candidatos cerrados, 61 pendientes. Limitación de auxiliares explícita; no trasladar el criterio al examen por similitud del nombre. Sin soluciones ni commit de Git.
- `next`: L024, SRC-DD5A19850D89, reserva_b_EXAMEN 2-ANDALUCÍA.pdf; confirmar curso/contenido antes de asociar criterios.

### 2026-10-27 · feat/review/build/test/docs: cierre de L024

- `feat`: ocho enunciados D0024 / EXA-0024 y ocho soluciones de sólo comentarios; 192 cotejados y clasificados, cero respuestas. Índice individual actualizado; etiquetas signo-funcion y diferencia-simetrica añadidas.
- `review`: segunda pasada visual completa del mismo autor, cuatro páginas de borrador y ocho finales revisadas. Curso2016-2017 impreso; criterios SRC-B1EA93903484 concordantes con L024, sin modificar L023. Reserva B sólo del nombre.
- `test`: 21 pruebas en 36.508 s; 215 fuentes y 414 archivos previos con huellas coincidentes. Filtros de unidades, positividad, exactamente una, proporcionalidad, objetivos, curvatura, Bayes y error inclusivo comprobados.
- `build`: dos PDF de cuatro páginas; ocho avisos pendientes. ZIP aislado con caché local: ambos modos y anterior L023 idénticos byte a byte; main.tex por texto y renderizados comprobado.
- `docs`: [informe L024](docs/lotes/L024_2017_reserva_b.md); 24 de 84 candidatos cerrados, 60 pendientes. Sin soluciones ni commit de Git.
- `next`: L025, SRC-B863C46F40EC, suplemente_junio_EXAMEN 4-ANDALUCÍA.pdf; confirmar curso/naturaleza y auxiliares antes de transcribir.

### 2026-10-27 · feat/review/build/test/docs: cierre de L025

- `feat`: ocho enunciados D0025 / EXA-0025 y ocho soluciones de sólo comentarios; 200 cotejados y clasificados, cero respuestas. Índice individual actualizado; etiquetas seleccion-sin-reposicion y clasificacion-discontinuidades añadidas.
- `review`: segunda pasada visual completa del mismo autor, cuatro páginas de borrador y ocho finales revisadas. Curso2016-2017 impreso; criterios SRC-57188FF1F0A8 concordantes. suplemente_junio sólo del nombre; convocatoria/tipo/reserva/modelo vacíos.
- `test`: 21 pruebas en 33.915 s; 215 fuentes y 432 archivos previos con huellas coincidentes. Filtros de beneficio, asíntotas, selección sin reposición, error estricto, matrices, discontinuidades, condición y amplitud comprobados.
- `build`: dos PDF de cuatro páginas; ocho avisos pendientes. ZIP aislado con caché local: ambos modos y anterior L024 idénticos byte a byte; main.tex por texto y renderizados comprobado.
- `docs`: [informe L025](docs/lotes/L025_2017_suplemente_junio.md); 25 de 84 candidatos cerrados, 59 pendientes. Sin soluciones ni commit de Git.
- `next`: L026, SRC-251685BD691B, suplemente_septiembre_EXAMEN 4-ANDALUCÍA.pdf; confirmar curso/naturaleza y auxiliares antes de transcribir.

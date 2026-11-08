# Plan del banco modular de Selectividad

Actualización: **8 de noviembre de 2026**. Documento de seguimiento por tandas; las entradas del diario describen cambios como commits, sin crear commits de Git.

## 1. Objetivo y alcance de esta entrega

Preparar un banco LaTeX para Overleaf con ejercicios de `../Selectividad/`, filtros por procedencia y contenidos, y composición de preguntas o preguntas con soluciones futuras.

**L001-L084 cerradas: 640 enunciados únicos cotejados y 640 clasificaciones verificadas.** Son 83 exámenes canónicos y 84 de 84 candidatos cerrados; ninguno pendiente de transcripción. L057 es una reedición sin ejercicios nuevos. L084 añade ocho enunciados desde DOC convertidos, curso 2011-2012 impreso. S001-S011 incorporan 80 soluciones validadas;560 siguen sin redactar. La transcripción completa permanece intacta.

En L005-L056 y L058-L084, el cotejo consta de segundas pasadas visuales completas del mismo autor, separadas de la escritura; no se atribuye a un segundo revisor distinto. L001-L004 conservan sus propias evidencias de revisión.

## Mejora detectada al transcribir L067

- [ ] SEL-PARTES:permitir seleccionar Partes I/II aisladas sin alterar numeración,procedencia ni agrupación del ejercicio original. Hoy los filtros recuperan el ejercicio completo;documentado en el informe de L067.

## Estado actual tras L084

| Medida | Estado comprobado |
|---|---:|
| Lotes candidatos cerrados | **84 de 84: L001-L084; 83 exámenes canónicos** |
| Enunciados `cotejada` | **640** |
| Clasificaciones `verificada` | **640** |
| Soluciones redactadas | **80:validadas en S001-S011** |
| Soluciones `no_redactada` | **560** |
| Soluciones `validada` | **80** |
| Fuentes con huellas coincidentes | **215 de 215, verificadas en L084** |
| Pruebas superadas en L084 | **21** |

Los primeros dieciocho exámenes conservan límites de identificación documentados. L001-L004 tienen convocatoria/tipo de carpeta; L005/L006, reserva y letras de carpeta con convocatoria vacía. L007 confirma ordinaria y curso 2020-2021; L010 confirma extraordinaria y ese curso. L008/L009/L011/L012 sólo imprimen curso: convocatoria y tipo proceden de nombres. L012 conserva reserva B sólo con evidencia del nombre. **L013-L018 confirman curso 2019-2020; convocatoria, tipo, reserva y modelo quedan vacíos.** Los sufijos A-F de P_A/P_B/P_C/P_D/P_E/P_F no acreditan modelos ni opciones; tampoco hay tabla específicamente asociada para estos seis. Todos mantienen modelo vacío, identificación parcialmente confirmada y requiere_revision=si por esos límites. INC-006 conserva matrix de L006; INC-007, (1 puntos) de L015. L010 tiene tabla normal en su página 3. Las fechas del relato, como caducidad 2021 en C6 de L014, no datan el examen.

L007-L018 usan cuatro bloques A-D y números globales 1-8, sin opciones. Sus IDs son BA-E01/E02, BB-E03/E04, BC-E05/E06 y BD-E07/E08 por documento. El original exige cuatro ejercicios de al menos tres bloques y corrige los cuatro primeros que cumplen la regla; la colección reúne ocho para consulta, sin imponer esa regla a la selección didáctica. En L016 A1 imprime total 2.5, sin apartados; otros siete totales derivados de apartados y concordantes con criterios, sin añadir totales al cuerpo. B3 conserva dos derivadas bajo 1.2 y tangentes más corte bajo 1.3; B4a y D7a conservan sus preguntas con puntuación conjunta.

**Verificación L084:** 21 pruebas superadas en 507.023s;640 ejercicios y215 fuentes válidas. Cuatro páginas fuente y7 páginas finales revisadas;PDF de3/4páginas. Los1428 archivos anteriores intactos:632 enunciados,632 soluciones y164 PDF. ZIP aislado de1908 archivos:ambos modos y lote anterior idénticos byte a byte;main por texto y renderizados. Compilación local Tectonic;servicio Overleaf no probado.

**Siguiente fase:** continuar S012 (EXA-0011). S001-S011:80 soluciones explicadas y validadas;560 pendientes. Tres pasadas del mismo autor, sin revisor independiente; revisar incidencias antes de validar cada caso afectado.

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
23. **L023 cerrada: archivo reserva_b_EXAMEN 2, curso 2015-2016.** Ocho enunciados cotejados y clasificados. [Informe](docs/lotes/L023_2016_reserva_b.md). L024 cerrada; L025 cerrada; L026 cerrada; L027 cerrada; L028 cerrada; L029 cerrada; L030 cerrada; L031 cerrada; L032 cerrada; L033 cerrada; L034 cerrada; L035 cerrada; L036 cerrada;L037 cerrada;L038 cerrada;L039 cerrada;L040 cerrada;L041 cerrada;L042 cerrada;L043 cerrada;L044 cerrada;L045 cerrada;L046 cerrada;L047 cerrada;L048 cerrada;siguiente L049.
24. **L024 cerrada: archivo reserva_b_EXAMEN 2, curso 2016-2017.** Ocho enunciados cotejados y clasificados. [Informe](docs/lotes/L024_2017_reserva_b.md). L025 cerrada; L026 cerrada; L027 cerrada; L028 cerrada; L029 cerrada; L030 cerrada; L031 cerrada; L032 cerrada; L033 cerrada; L034 cerrada; L035 cerrada; L036 cerrada;L037 cerrada;L038 cerrada;L039 cerrada;L040 cerrada;L041 cerrada;L042 cerrada;L043 cerrada;L044 cerrada;L045 cerrada;L046 cerrada;L047 cerrada;L048 cerrada;siguiente L049.
25. **L025 cerrada: archivo suplemente_junio_EXAMEN 4, curso 2016-2017.** Ocho enunciados cotejados y clasificados. [Informe](docs/lotes/L025_2017_suplemente_junio.md). L026 cerrada; L027 cerrada; L028 cerrada; L029 cerrada; L030 cerrada; L031 cerrada; L032 cerrada; L033 cerrada; L034 cerrada; L035 cerrada; L036 cerrada;L037 cerrada;L038 cerrada;L039 cerrada;L040 cerrada;L041 cerrada;L042 cerrada;L043 cerrada;L044 cerrada;L045 cerrada;L046 cerrada;L047 cerrada;L048 cerrada;siguiente L049.
26. **L026 cerrada: curso2015-2016, archivo suplemente_septiembre_EXAMEN 4.** [Informe](docs/lotes/L026_2016_suplemente_septiembre.md). L027 cerrada; L028 cerrada; L029 cerrada; L030 cerrada; L031 cerrada; L032 cerrada; L033 cerrada; L034 cerrada; L035 cerrada; L036 cerrada;L037 cerrada;L038 cerrada;L039 cerrada;L040 cerrada;L041 cerrada;L042 cerrada;L043 cerrada;L044 cerrada;L045 cerrada;L046 cerrada;L047 cerrada;L048 cerrada;siguiente L049.
27. **L027 cerrada: curso2016-2017, archivo suplemente_septiembre_EXAMEN 6.** [Informe](docs/lotes/L027_2017_suplemente_septiembre.md). L028 cerrada; L029 cerrada; L030 cerrada; L031 cerrada; L032 cerrada; L033 cerrada; L034 cerrada; L035 cerrada; L036 cerrada;L037 cerrada;L038 cerrada;L039 cerrada;L040 cerrada;L041 cerrada;L042 cerrada;L043 cerrada;L044 cerrada;L045 cerrada;L046 cerrada;L047 cerrada;L048 cerrada;siguiente L049.
28. **L028 cerrada: curso2017-2018, carpeta suplente junio.** [Informe](docs/lotes/L028_2018_suplente_junio.md). L029 cerrada; L030 cerrada; L031 cerrada; L032 cerrada; L033 cerrada; L034 cerrada; L035 cerrada; L036 cerrada;L037 cerrada;L038 cerrada;L039 cerrada;L040 cerrada;L041 cerrada;L042 cerrada;L043 cerrada;L044 cerrada;L045 cerrada;L046 cerrada;L047 cerrada;L048 cerrada;siguiente L049.
29. **L029 cerrada: curso2017-2018, carpeta suplente septiembre.** [Informe](docs/lotes/L029_2018_suplente_septiembre.md). L030 cerrada; L031 cerrada; L032 cerrada; L033 cerrada; L034 cerrada; L035 cerrada; L036 cerrada;L037 cerrada;L038 cerrada;L039 cerrada;L040 cerrada;L041 cerrada;L042 cerrada;L043 cerrada;L044 cerrada;L045 cerrada;L046 cerrada;L047 cerrada;L048 cerrada;siguiente L049.
30. **L030 cerrada: curso2017-2018, carpeta titular_junio.** [Informe](docs/lotes/L030_2018_titular_junio.md). L031 cerrada; L032 cerrada; L033 cerrada; L034 cerrada; L035 cerrada; L036 cerrada;L037 cerrada;L038 cerrada;L039 cerrada;L040 cerrada;L041 cerrada;L042 cerrada;L043 cerrada;L044 cerrada;L045 cerrada;L046 cerrada;L047 cerrada;L048 cerrada;siguiente L049.
31. **L031 cerrada: curso2015-2016, archivo titular_junio_6.** [Informe](docs/lotes/L031_2016_titular_junio.md). L032 cerrada; L033 cerrada; L034 cerrada; L035 cerrada; L036 cerrada;L037 cerrada;L038 cerrada;L039 cerrada;L040 cerrada;L041 cerrada;L042 cerrada;L043 cerrada;L044 cerrada;L045 cerrada;L046 cerrada;L047 cerrada;L048 cerrada;siguiente L049.
32. **L032 cerrada: curso visible2016-2017, archivo titular_junio_EXAMEN 5.** [Informe](docs/lotes/L032_2017_titular_junio.md). L033 cerrada; L034 cerrada; L035 cerrada; L036 cerrada;L037 cerrada;L038 cerrada;L039 cerrada;L040 cerrada;L041 cerrada;L042 cerrada;L043 cerrada;L044 cerrada;L045 cerrada;L046 cerrada;L047 cerrada;L048 cerrada;siguiente L049.
33. **L033 cerrada: curso 2017-2018, carpeta titular_septiembre.** [Informe](docs/lotes/L033_2018_titular_septiembre.md). L034 cerrada; L035 cerrada; L036 cerrada;L037 cerrada;L038 cerrada;L039 cerrada;L040 cerrada;L041 cerrada;L042 cerrada;L043 cerrada;L044 cerrada;L045 cerrada;L046 cerrada;L047 cerrada;L048 cerrada;siguiente L049.
34. **L034 cerrada: curso 2015-2016, archivo titular_septiembre_1.** [Informe](docs/lotes/L034_2016_titular_septiembre.md). L035 cerrada; L036 cerrada;L037 cerrada;L038 cerrada;L039 cerrada;L040 cerrada;L041 cerrada;L042 cerrada;L043 cerrada;L044 cerrada;L045 cerrada;L046 cerrada;L047 cerrada;L048 cerrada;siguiente L049.
35. **L035 cerrada: curso2016-2017, archivo titular_septiembre_EXAMEN 1.** [Informe](docs/lotes/L035_2017_titular_septiembre.md). L036 cerrada;L037 cerrada;L038 cerrada;L039 cerrada;L040 cerrada;L041 cerrada;L042 cerrada;L043 cerrada;L044 cerrada;L045 cerrada;L046 cerrada;L047 cerrada;L048 cerrada;siguiente L049.
36. **L036 cerrada:curso2014-2015,archivo Ua1;alias verificados.** [Informe](docs/lotes/L036_2015_Ua1.md). L037 cerrada;L038 cerrada;L039 cerrada;L040 cerrada;L041 cerrada;L042 cerrada;L043 cerrada;L044 cerrada;L045 cerrada;L046 cerrada;L047 cerrada;L048 cerrada;siguiente L049.
37. **L037 cerrada:curso 2014-2015,Ua2;alias verificados.** [Informe](docs/lotes/L037_2015_Ua2.md). L038 cerrada;L039 cerrada;L040 cerrada;L041 cerrada;L042 cerrada;L043 cerrada;L044 cerrada;L045 cerrada;L046 cerrada;L047 cerrada;L048 cerrada;siguiente L049.
38. **L038 cerrada:curso 2014-2015,Ua3;alias verificados.** [Informe](docs/lotes/L038_2015_Ua3.md). L039 cerrada;L040 cerrada;L041 cerrada;L042 cerrada;L043 cerrada;L044 cerrada;L045 cerrada;L046 cerrada;L047 cerrada;L048 cerrada;siguiente L049.
39. **L039 cerrada:curso 2014-2015,Ua4;alias verificados.** [Informe](docs/lotes/L039_2015_Ua4.md). L040 cerrada;L041 cerrada;L042 cerrada;L043 cerrada;L044 cerrada;L045 cerrada;L046 cerrada;L047 cerrada;L048 cerrada;siguiente L049.
40. **L040 cerrada:curso 2014-2015,Ua5;alias verificados.** [Informe](docs/lotes/L040_2015_Ua5.md). L041 cerrada;L042 cerrada;L043 cerrada;L044 cerrada;L045 cerrada;L046 cerrada;L047 cerrada;L048 cerrada;siguiente L049.
41. **L041 cerrada:curso 2014-2015,Ua6;alias verificados.** [Informe](docs/lotes/L041_2015_Ua6.md). L042 cerrada;L043 cerrada;L044 cerrada;L045 cerrada;L046 cerrada;L047 cerrada;L048 cerrada;siguiente L049.
42. **L042 cerrada:curso 2013-2014,ANDAL-1;alias verificados.** [Informe](docs/lotes/L042_2014_ANDAL1.md). L043 cerrada;L044 cerrada;L045 cerrada;L046 cerrada;L047 cerrada;L048 cerrada;siguiente L049.
43. **L043 cerrada:curso 2013-2014,ANDAL-2;alias verificados.** [Informe](docs/lotes/L043_2014_ANDAL2.md). L044 cerrada;L045 cerrada;L046 cerrada;L047 cerrada;L048 cerrada;siguiente L049.
44. **L044 cerrada:curso 2013-2014,ANDAL-3;alias verificados.** [Informe](docs/lotes/L044_2014_ANDAL3.md). L045 cerrada;L046 cerrada;L047 cerrada;L048 cerrada;siguiente L049.
45. **L045 cerrada:curso 2013-2014,ANDAL-5;alias verificados.** [Informe](docs/lotes/L045_2014_ANDAL5.md). L046 cerrada;L047 cerrada;L048 cerrada;siguiente L049.
46. **L046 cerrada:curso 2013-2014,JUN;alias verificados.** [Informe](docs/lotes/L046_2014_JUN.md). L047 cerrada;L048 cerrada;siguiente L049.
47. **L047 cerrada:curso 2013-2014,SEPT;alias verificados.** [Informe](docs/lotes/L047_2014_SEPT.md). L048 cerrada;siguiente L049.
48. **L048 cerrada:curso 2012-2013,reserva A;alias verificados.** [Informe](docs/lotes/L048_2013_RESERVA_A.md). Siguiente L049.
49. **L049 cerrada: reserva B por carpeta,curso2012-2013.** [Informe](docs/lotes/L049_2013_RESERVA_B.md).
50. Fuentes de 2021 y documentos de 2020 en la carpeta mixta: revisar estructura de bloques y regla de elección, distintas de la antigua opción A/B.
50. Resto de la carpeta mixta: confirmar años visualmente antes de distribuir por cursos; resolver sus copias de 2015 con las carpetas anuales.
51. Fuentes anuales de 2015, 2014 y 2013, con deduplicación y cotejo de opciones.
52. Fuentes de 2011, 2010, 2009 y 2008. Para escaneados, OCR sólo como ayuda; verificar visualmente cada signo y separar examen/criterios en documentos combinados.
53. DOC de 2012: convertir **copias** a un formato legible y cotejar la conversión página a página antes de transcribir. No inferir el modelo del número de carpeta. Se deja este grupo al final para disponer de una tanda específica de conversión y cotejo.

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
La selección inicial carga `selecciones/l084-examen6-2012.tex`,lista l084-ids.tex y contexto EXA-0084. Entradas l084-enunciados.tex y l084-con-soluciones.tex; anteriores conservadas y632 soluciones pendientes, con8 validadas. En relaciones nuevas vaciar ContextoSeleccion según la guía.

## 11. Criterio de cierre de cada entrega

Una entrega sólo se cierra cuando constan: fuentes usadas, IDs afectados, cambios de estado, archivos producidos, comprobaciones ejecutadas, páginas revisadas, incidencias abiertas y siguiente tanda. Las tareas no ejecutadas conservan la casilla vacía.


## Acceso y selección dirigida

Acceso individual: [índice de los 640 ejercicios](INDICE_EJERCICIOS.md), con enlace directo al enunciado, procedencia, temas, epígrafes y etiquetas; [guía de relaciones dirigidas](docs/GUIA_RELACIONES.md). Ejemplo listo para compilar: `relacion-ejemplo.tex`. Las selecciones combinan IDs sin copiar contenidos; se conserva el orden del catálogo. Las etiquetas de unidades y comparación de tamaño muestral describen lo solicitado, sin resolverlo.

### Cierre secuencial añadido

- [x] L018 · transcripción, cotejo, indexación y controles. [Informe](docs/lotes/L018_2020_P_F.md).
- [x] L019 · transcripción, cotejo, indexación y controles. [Informe](docs/lotes/L019_2018_reserva_a.md).
- [x] L020 · transcripción, cotejo, indexación y controles. [Informe](docs/lotes/L020_2018_reserva_b.md).
- [x] L021 · transcripción, cotejo, clasificación y controles. [Informe](docs/lotes/L021_2017_reserva_a.md).
- [x] L022 · transcripción, cotejo, clasificación y controles. [Informe](docs/lotes/L022_2016_reserva_a.md).
- [x] L023 · transcripción, cotejo, clasificación y controles. [Informe](docs/lotes/L023_2016_reserva_b.md).
- [x] L024 · transcripción, cotejo, clasificación y controles. [Informe](docs/lotes/L024_2017_reserva_b.md).
- [x] L025 · transcripción, cotejo, clasificación y controles. [Informe](docs/lotes/L025_2017_suplemente_junio.md).
- [x] L026 · transcripción, cotejo, clasificación y controles. [Informe](docs/lotes/L026_2016_suplemente_septiembre.md).
- [x] L027 · transcripción, cotejo, clasificación y controles. [Informe](docs/lotes/L027_2017_suplemente_septiembre.md).
- [x] L028 · transcripción, cotejo, clasificación y controles. [Informe](docs/lotes/L028_2018_suplente_junio.md).
- [x] L029 · transcripción, cotejo, clasificación y controles. [Informe](docs/lotes/L029_2018_suplente_septiembre.md).
- [x] L030 · transcripción, cotejo, clasificación y controles. [Informe](docs/lotes/L030_2018_titular_junio.md).
- [x] L031 · transcripción, cotejo, clasificación y controles. [Informe](docs/lotes/L031_2016_titular_junio.md).
- [x] L032 · ocho enunciados cotejados y clasificados. [Informe](docs/lotes/L032_2017_titular_junio.md).
- [x] L033 · ocho enunciados cotejados y clasificados. [Informe](docs/lotes/L033_2018_titular_septiembre.md).
- [x] L034 · ocho enunciados cotejados y clasificados. [Informe](docs/lotes/L034_2016_titular_septiembre.md).
- [x] L035 · ocho enunciados cotejados y clasificados. [Informe](docs/lotes/L035_2017_titular_septiembre.md).
- [x] L036 · ocho enunciados cotejados y clasificados;alias comprobados. [Informe](docs/lotes/L036_2015_Ua1.md).
- [x] L037 · ocho enunciados cotejados y clasificados;alias comprobados. [Informe](docs/lotes/L037_2015_Ua2.md).
- [x] L038 · ocho enunciados cotejados y clasificados;alias comprobados. [Informe](docs/lotes/L038_2015_Ua3.md).
- [x] L039 · ocho enunciados cotejados y clasificados;alias comprobados. [Informe](docs/lotes/L039_2015_Ua4.md).
- [x] L040 · ocho enunciados cotejados y clasificados;alias comprobados. [Informe](docs/lotes/L040_2015_Ua5.md).
- [x] L041 · ocho enunciados cotejados y clasificados;alias comprobados. [Informe](docs/lotes/L041_2015_Ua6.md).
- [ ] L042 · confirmar curso,alias y transcribir sin soluciones.

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

## Procedencia y estructura de L026

Curso2015-2016 impreso; suplemente_septiembre sólo del nombre, sin acreditar convocatoria extraordinaria ni fecha. Convocatoria/tipo/reserva/modelo vacíos;4 no acredita modelo. Criterios SRC-0CCBF6368E87 concordantes por curso/contenido/puntos; sin tabla específica. B4 imprime2.5;otros siete totales derivados de apartados, corroborados con criterios. Contraste histórico B4 conservado en T09.1/T08.3, sin epígrafe inventado.

La fase posterior de resoluciones sigue [este plan](docs/FASE_SOLUCIONES.md). La autorización del27-10-2026 sustituye la restricción inicial de no redactar soluciones cuando termine la fase de transcripción.

## Procedencia y estructura de L027

Curso 2016-2017 impreso; suplemente_septiembre sólo del nombre, sin acreditar convocatoria extraordinaria ni fecha. Convocatoria/tipo/reserva/modelo vacíos; 6 no acredita modelo. Criterios SRC-FC94E50B392D concordantes por contenido, puntuaciones y cabecera visible 2016-2017; la extracción incluye un curso antiguo oculto que no se usa para datar. Sin tabla específica. Ocho totales 2.5 derivados de apartados y corroborados con criterios, sin añadirlos al cuerpo. A4: error no superior a 0.04 inclusivo; B4: error menor que 2 estricto.

La fase posterior de resoluciones sigue [este plan](docs/FASE_SOLUCIONES.md). La autorización del 27-10-2026 sustituye la restricción inicial de no redactar soluciones cuando termine la fase de transcripción.

## Procedencia y estructura de L028

Curso 2017-2018 impreso; tipo suplente y junio sólo de carpeta, sin acreditar convocatoria ordinaria ni fecha. Convocatoria/reserva/modelo vacíos; no hay modelo impreso. Cabecera sin UNIVERSIDADES DE ANDALUCÍA; instrucción final sin el uso de la misma. Criterios SRC-D3E2788903E8 concordantes. Tabla normal SRC-03976ECEE4F8 asociada por carpeta y revisada por imagen; genérica, copia exacta ya inventariada, no ejercicio ni tabla fechada exclusiva. Ocho totales 2.5 derivados de apartados y corroborados con criterios. B3 exige orden y sin reposición; A4 error máximo 2 inclusivo y B4 menor que 0.02 estricto.

La fase posterior de resoluciones sigue [este plan](docs/FASE_SOLUCIONES.md). La autorización del 27-10-2026 sustituye la restricción inicial de no redactar soluciones cuando termine la fase de transcripción.

## Procedencia y estructura de L029

Curso 2017-2018 impreso; tipo suplente y septiembre sólo de carpeta, sin acreditar convocatoria extraordinaria ni fecha. Convocatoria/reserva/modelo vacíos. Criterios SRC-6D24250C0DCF concordantes; tabla SRC-DF745539FC83 normal acumulada genérica de misma carpeta, copia exacta inventariada y revisada por imagen. B1 imprime total2.5 sin apartados; otros siete derivados de apartados y corroborados con criterios. B2 conserva e^(5x)(x²−5)^3 y (x³+1)^2/ln(x²+2), sin respuestas. A4 cambia confianza95→99%; B4 cambia proporción a0.25 y confianza a92.5% con error inferior0.03 estricto.

La fase posterior de resoluciones sigue [este plan](docs/FASE_SOLUCIONES.md). La autorización del 27-10-2026 sustituye la restricción inicial de no redactar soluciones cuando termine la fase de transcripción.

## Procedencia y estructura de L030

Curso 2017-2018 impreso; titular y junio sólo de carpeta, sin acreditar convocatoria ordinaria ni fecha. Convocatoria/reserva/modelo vacíos. Criterios SRC-969E0FA37C16 concordantes; tabla SRC-7CE2805F3B2B normal acumulada genérica de misma carpeta, copia exacta ya inventariada. Ocho totales2.5 derivados de apartados y corroborados, sin añadirlos al cuerpo. A1a pide formular sin resolver y A1b trata otro recinto. INC-010: A4 no explicita reposición ni orden de las muestras; conservar el texto y revisar convención antes de redactar solución. No se añade hipótesis ni se anticipan respuestas. B1 conserva XA=2B^t+I_2; B4 cambia confianza97→96 y error no superior2% inclusivo.

La fase posterior de resoluciones sigue [este plan](docs/FASE_SOLUCIONES.md). La autorización del 27-10-2026 sustituye la restricción inicial de no redactar soluciones cuando termine la fase de transcripción.

## Procedencia y estructura de L031

Curso 2015-2016 impreso; tipo titular y junio sólo del nombre, sin acreditar convocatoria ordinaria ni fecha. Convocatoria/reserva/modelo vacíos; número6 del nombre no acredita modelo. Criterios SRC-06A33DC598A0 concordantes. Sin tabla específicamente asociada. B1 imprime total2.5 sin apartados;otros siete derivados de apartados y corroborados, sin añadir totales al cuerpo. A1 pide interpretar los elementos de productos matriciales; B2 pide interpretar la asíntota horizontal. A4 mantiene error inferior1 estricto. B4 distingue n64 de n100 y probabilidad de media de un intervalo de confianza.

La fase posterior de resoluciones sigue [este plan](docs/FASE_SOLUCIONES.md). La autorización del 27-10-2026 sustituye la restricción inicial de no redactar soluciones cuando termine la fase de transcripción.

## Procedencia y estructura de L032

Curso visible 2016-2017, año2017. El texto oculto 2015-2016 no se usa para fechar. Titular/junio sólo del nombre; 5 no acredita modelo. Criterios SRC-3B05F22DF1BE concordantes; sin tabla específica. Ocho IDs D0032, archivos individuales y soluciones de sólo comentarios. [Informe](docs/lotes/L032_2017_titular_junio.md).

**Siguiente: L049**, fuente `SRC-18FB5F1BBA03`, archivo `Selectividad/sel_2013_matematicas_aplicadas/junio/reserva b/EXAMEN 1-ANDALUCÍA.pdf`. Revisar cabecera,curso,criterios y tabla;separar evidencia de carpeta y datos impresos antes de asignar metadatos.

## Procedencia y estructura de L033

Curso 2017-2018 visible, año 2018. Titular/septiembre sólo de carpeta; convocatoria, reserva y modelo vacíos. Criterios SRC-42767DB22262 concordantes, salvo tercera etiqueta b) repetida en B2 frente a c) del examen. A4c conserva afijación proporcional con 121 y razones 1:2:3; criterio de redondeo reservado a la resolución futura. Tabla Normal genérica SRC-91337370C760 de la misma carpeta, sin vínculo explícito de fecha/modelo. [Informe](docs/lotes/L033_2018_titular_septiembre.md).

**Siguiente: L049**, fuente `SRC-18FB5F1BBA03`, archivo `Selectividad/sel_2013_matematicas_aplicadas/junio/reserva b/EXAMEN 1-ANDALUCÍA.pdf`. Revisar cabecera,curso,criterios y tabla;separar evidencia de carpeta y datos impresos antes de asignar metadatos.

## Procedencia y estructura de L034

Curso 2015-2016 visible, año 2016. La fuente preliminar otro contiene un examen completo A/B, sin criterios combinados. Titular/septiembre sólo del nombre; 1 no acredita modelo. Convocatoria, reserva y modelo vacíos. Criterios SRC-E33A07DB6B02 concordantes; sin tabla específica. INC-013: B4b no explicita reposición ni orden; revisar convención antes de resolver, sin añadir hipótesis al enunciado. [Informe](docs/lotes/L034_2016_titular_septiembre.md).

**Siguiente: L049**, fuente `SRC-18FB5F1BBA03`, archivo `Selectividad/sel_2013_matematicas_aplicadas/junio/reserva b/EXAMEN 1-ANDALUCÍA.pdf`. Revisar cabecera,curso,criterios y tabla;separar evidencia de carpeta y datos impresos antes de asignar metadatos.

## Procedencia y estructura de L035

Curso 2016-2017 visible, año2017. Titular/septiembre sólo del nombre;1 no acredita modelo. Convocatoria,reserva,modelo vacíos. Criterios SRC-15FF6FFF34D6 concordantes; sin tabla específica. A4 conserva error no superior5años inclusivo y B4 error inferior0.03 estricto con confianza92.5%. Urna con sustitución por dos del otro color; sin añadir hipótesis ni anticipar respuestas. Nuevas etiquetas urna-dinamica e igualdad-derivadas. [Informe](docs/lotes/L035_2017_titular_septiembre.md).

**Siguiente: L049**, fuente `SRC-18FB5F1BBA03`, archivo `Selectividad/sel_2013_matematicas_aplicadas/junio/reserva b/EXAMEN 1-ANDALUCÍA.pdf`. Revisar cabecera,curso,criterios y tabla;separar evidencia de carpeta y datos impresos antes de asignar metadatos.

## Procedencia y estructura de L036

Curso 2014-2015 visible, año2015. Convocatoria,tipo,reserva,modelo vacíos;Ua1 sólo del nombre. Examen SRC-D4199CAE2EC3 y alias SRC-96902844B9A7 idénticos; criterios SRC-B7CB1F935609 y alias SRC-022F67F8B3D8 idénticos. Las cuatro rutas quedan en el inventario; ocho transcripciones canónicas. Criterios concordantes,sin tabla específica. A4 conserva un contraste histórico unilateral de media bajo T09.1/T08.3,con significación1% y H0:mu<=170;sin inventar un epígrafe. B4 es IC90 y error no superior0.1horas. Etiqueta comparacion-reposicion para A3. [Informe](docs/lotes/L036_2015_Ua1.md).

**Siguiente: L049**, fuente `SRC-18FB5F1BBA03`, archivo `Selectividad/sel_2013_matematicas_aplicadas/junio/reserva b/EXAMEN 1-ANDALUCÍA.pdf`. Revisar cabecera,curso,criterios y tabla;separar evidencia de carpeta y datos impresos antes de asignar metadatos.

## Procedencia y estructura de L037

Curso2014-2015 visible,año 2015. Convocatoria,tipo,reserva,modelo vacíos;Ua2 sólo del nombre. Examen SRC-20170EF2B2D5 y alias SRC-3C3C0BA557E4 idénticos;criterios SRC-8F3B9C58D85E y alias SRC-6557CA8734E1 idénticos. Cuatro rutas conservadas y ocho transcripciones canónicas. Criterios concordantes,sin tabla específica. A1b pide despejar sin calcular elementos;B1 maximiza ingresos;B2c conserva log. A4 es contraste histórico bilateral de media bajo T09.1/T08.3,con N(mu,2.1),H0:mu=5.5 y significación8%. B4 pide IC99.2% y error,sin tamaño mínimo. Etiquetas nuevas:despeje-matricial y contraste-bilateral-media. [Informe](docs/lotes/L037_2015_Ua2.md).

**Siguiente: L049**, fuente `SRC-18FB5F1BBA03`, archivo `Selectividad/sel_2013_matematicas_aplicadas/junio/reserva b/EXAMEN 1-ANDALUCÍA.pdf`. Revisar cabecera,curso,criterios y tabla;separar evidencia de carpeta y datos impresos antes de asignar metadatos.

## Procedencia y estructura de L038

Curso2014-2015 visible,año2015. Convocatoria,tipo,reserva,modelo vacíos;Ua3 sólo del nombre. Examen SRC-DED70B2939A7 y alias SRC-98DB47100206 idénticos;criterios SRC-34AF76192C3D y alias SRC-C308B33F0C93 idénticos. Cuatro rutas conservadas y ocho transcripciones canónicas. Criterios concordantes,sin tabla específica. A2 contiene dos funciones independientes;A4 solicita IC95 y tamaño con error inferior0.5cl. B1 conserva beneficio literal y datos de venta,sin inventar costes. B4 conserva contraste histórico unilateral de media bajo T09.1/T08.3,H0:mu<=80,significación5% y umbral histórico del enunciado. Sin soluciones. [Informe](docs/lotes/L038_2015_Ua3.md).

**Siguiente: L049**, fuente `SRC-18FB5F1BBA03`, archivo `Selectividad/sel_2013_matematicas_aplicadas/junio/reserva b/EXAMEN 1-ANDALUCÍA.pdf`. Revisar cabecera,curso,criterios y tabla;separar evidencia de carpeta y datos impresos antes de asignar metadatos.

## Procedencia y estructura de L039

Curso2014-2015 visible,año2015. Convocatoria,tipo,reserva,modelo vacíos;Ua4 sólo del nombre. El candidato2022 del texto extraído no fecha el examen. Examen SRC-6129A8DBCD4F y alias SRC-014DA3092BF3 idénticos;criterios SRC-4F8A35ED2B35 y alias SRC-CD6448FF91C4 idénticos. Cuatro rutas y ocho transcripciones canónicas. Criterios concordantes,sin tabla específica. A1 maximiza número de tarrinas;A4 contrasta H0:mu<=5 y compara significaciones5/15% bajo T09.1/T08.3. B3 pide diagnóstico correcto y probabilidades dado positivo. B4 aporta varianza0.25mm² y limita amplitud inferior2mm,no error2mm. Etiqueta diagnostico-correcto. Sin soluciones. [Informe](docs/lotes/L039_2015_Ua4.md).

**Siguiente: L049**, fuente `SRC-18FB5F1BBA03`, archivo `Selectividad/sel_2013_matematicas_aplicadas/junio/reserva b/EXAMEN 1-ANDALUCÍA.pdf`. Revisar cabecera,curso,criterios y tabla;separar evidencia de carpeta y datos impresos antes de asignar metadatos.

## Procedencia y estructura de L040

Curso2014-2015 visible,año2015. Convocatoria,tipo,reserva,modelo vacíos;Ua5 sólo del nombre. Examen SRC-5D9E6A5CB42C y alias SRC-8E44CA3AEC52 idénticos;criterios SRC-D7A2E4F81DC6 y alias SRC-6620057F9E36 idénticos. Cuatro rutas y ocho transcripciones canónicas. Criterios concordantes,sin tabla específica. A1 incluye potencias4/80;A2 tres tramos;A3 pregunta incompatibilidad. A4 contrasta H0:mu<=7 con varianza16 y significación0.05 bajo T09.1/T08.3. B1 conserva cinco restricciones;B2 pide dos tangentes;B3 Reserva y Bayes;B4 IC92 y tamaño para reducir error a la mitad. Sin etiquetas nuevas ni soluciones. [Informe](docs/lotes/L040_2015_Ua5.md).

**Siguiente: L049**, fuente `SRC-18FB5F1BBA03`, archivo `Selectividad/sel_2013_matematicas_aplicadas/junio/reserva b/EXAMEN 1-ANDALUCÍA.pdf`. Revisar cabecera,curso,criterios y tabla;separar evidencia de carpeta y datos impresos antes de asignar metadatos.

## Procedencia y estructura de L041

Curso2014-2015 visible,año2015. Convocatoria,tipo,reserva,modelo vacíos;Ua6 sólo del nombre. Examen SRC-417302754109 y alias SRC-FD67A988445D idénticos;criterios SRC-4283A8F81C69 y alias SRC-E27DBB823B7A idénticos. Cuatro rutas y ocho transcripciones canónicas. Criterios concordantes,sin tabla específica. A1 conserva matrices y parámetros;A2 racional/cúbica y tangente−3;A3 pregunta independencia. A4 usa nueve capitales,IC95 y error máximo4000euros. B1 inversión100000euros y mínimoB10000;B2 dos tramos y monotonía;B3 hospitalización y Bayes;B4 H0:mu>=110,sigma6 y significación5% bajo T09.1/T08.3. Sin etiquetas nuevas ni soluciones. [Informe](docs/lotes/L041_2015_Ua6.md).

**Siguiente: L049**, fuente `SRC-18FB5F1BBA03`, archivo `Selectividad/sel_2013_matematicas_aplicadas/junio/reserva b/EXAMEN 1-ANDALUCÍA.pdf`. Revisar cabecera,curso,criterios y tabla;separar evidencia de carpeta y datos impresos antes de asignar metadatos.

## Procedencia y estructura de L042

Curso2013-2014 visible,año2014. Convocatoria,tipo,reserva,modelo vacíos;ANDAL-1 sólo del nombre. Examen SRC-987D141AC72B y criterios SRC-805FB552E609,sin alias exactos en inventario. Criterios concordantes,sin tabla específica. A1 conserva signos,traspuesta y datos parciales;A2 mínimo y tangente;A3 independencia y complemento;A4 media/error desde intervalo y tamaño96%. B1 dieta de coste mínimo;B2 derivabilidad en0;B3 defectos;B4 contraste H0:p>=0.25 y significaciones5/1% bajo T09.1. Sin etiquetas nuevas ni soluciones. [Informe](docs/lotes/L042_2014_ANDAL1.md).

**Siguiente: L049**, fuente `SRC-18FB5F1BBA03`, archivo `Selectividad/sel_2013_matematicas_aplicadas/junio/reserva b/EXAMEN 1-ANDALUCÍA.pdf`. Revisar cabecera,curso,criterios y tabla;separar evidencia de carpeta y datos impresos antes de asignar metadatos.

## Procedencia y estructura de L043

Curso2013-2014 visible,año2014. Convocatoria,tipo,reserva,modelo vacíos;ANDAL-2 sólo del nombre. Examen SRC-B7376BBA6509 y criterios SRC-44E6C9B92F20,sin alias exactos en inventario. Criterios concordantes,sin tabla específica. A1 región y extremos;A2 derivabilidad y tangente;A3 cámaras;A4 nueve precios,IC95 y error no superior0.08euros. B1 conserva orden y signos de matrices;B2 audiencia en6/12h;B3 conjunto de16números;B4 estructura1a/1b/2 y muestreo. INC-014 reserva la justificación de convención de muestreo en B4.2 para la fase de soluciones. Sin etiquetas nuevas ni soluciones. [Informe](docs/lotes/L043_2014_ANDAL2.md).

**Siguiente: L049**, fuente `SRC-18FB5F1BBA03`, archivo `Selectividad/sel_2013_matematicas_aplicadas/junio/reserva b/EXAMEN 1-ANDALUCÍA.pdf`. Revisar cabecera,curso,criterios y tabla;separar evidencia de carpeta y datos impresos antes de asignar metadatos.

## Procedencia y estructura de L044

Curso2013-2014 visible,año2014. Convocatoria,tipo,reserva,modelo vacíos;ANDAL-3 sólo del nombre. Examen SRC-12C7C27227F3 y criterios SRC-C7810D495446,sin alias exactos en inventario. Criterios concordantes en puntuaciones,sin tabla específica. A1 traspuesta y matriz fila;A2 cúbica;A3 dos adultos;A4 proporción con confianza95/99%. B1 conserva cuatro restricciones sin añadir y>=0;B2 dos tramos y tangente2;B3 museo;B4 muestras de{6,9,12} y afijación proporcional. INC-015 reserva convención de muestreo para solución futura;INC-016 conserva a/b del examen frente1/2 de criterios. Sin etiquetas nuevas ni soluciones. [Informe](docs/lotes/L044_2014_ANDAL3.md).

**Siguiente: L049**, fuente `SRC-18FB5F1BBA03`, archivo `Selectividad/sel_2013_matematicas_aplicadas/junio/reserva b/EXAMEN 1-ANDALUCÍA.pdf`. Revisar cabecera,curso,criterios y tabla;separar evidencia de carpeta y datos impresos antes de asignar metadatos.

## Procedencia y estructura de L045

Curso2013-2014 visible,año2014. Convocatoria,tipo,reserva,modelo vacíos;ANDAL-5 sólo del nombre. Examen SRC-FF289770F60D y criterios SRC-8FFDC913699D,sin alias exactos en inventario. Criterios concordantes,sin tabla específica. A1 matrices;A2 producto logarítmico y cociente exponencial;A3 deportes;A4 H0:p>=0.65 y significaciones10/1%. B1 mezcla matriz y región de cinco vértices,bajo T04/T06,sin dividir el ejercicio;B2 cúbica;B3 prensa y exclusividad;B4 intervalo94%,proporción,recuento y tamaño. Sin incidencias ni etiquetas nuevas;sin soluciones. [Informe](docs/lotes/L045_2014_ANDAL5.md).

**Siguiente: L049**, fuente `SRC-18FB5F1BBA03`, archivo `Selectividad/sel_2013_matematicas_aplicadas/junio/reserva b/EXAMEN 1-ANDALUCÍA.pdf`. Revisar cabecera,curso,criterios y tabla;separar evidencia de carpeta y datos impresos antes de asignar metadatos.

## Procedencia y estructura de L046

Curso2013-2014 visible,año2014. Fuente SRC-9B38A4843707 inicialmente otro,cotejada como examen completo A/B de dos páginas,sin criterios intercalados. Junio sólo del nombre JUN;convocatoria,tipo,reserva,modelo vacíos. Criterios separados SRC-1F22C9DEEB02 concordantes;sin alias exactos ni tabla específica. A1 potencia2014 y ecuación cúbica matricial;A2 beneficios y signo de derivada;A3 moneda/urnas;A4 IC98.8 y tamaño para error no excede1euro. B1 conserva cuatro restricciones sin añadir x>=0;B2 dos tramos;B3 ofertas y unión;B4 H0:p=0.7,bilateral,significación1%. Nueva etiqueta contraste-bilateral-proporcion;sin incidencias nuevas ni soluciones. [Informe](docs/lotes/L046_2014_JUN.md).

**Siguiente: L049**, fuente `SRC-18FB5F1BBA03`, archivo `Selectividad/sel_2013_matematicas_aplicadas/junio/reserva b/EXAMEN 1-ANDALUCÍA.pdf`. Revisar cabecera,curso,criterios y tabla;separar evidencia de carpeta y datos impresos antes de asignar metadatos.

## Procedencia y estructura de L047

Curso2013-2014 visible,año2014. Fuente SRC-3753985712BC inicialmente otro,cotejada como examen completo A/B de dos páginas,sin criterios intercalados. Septiembre sólo del nombre SEPT;convocatoria,tipo,reserva,modelo vacíos. Criterios separados SRC-4E7EB7A5A236 concordantes;sin alias exactos ni tabla específica. A1 sistema y traspuesta;A2 beneficios;A3 asistencia85/35%;A4 H0:mu<=8 y significación5%. B1a exige plantear sin resolver y B1b tiene recinto propio;B2 parábola;B3 peritaje correcto y autenticidad dadoerror;B4 peso total1615.2g,dosdocenas,IC96 y amplitud máxima0.8. Nueva etiqueta peritaje-correcto;sin incidencias nuevas ni soluciones. [Informe](docs/lotes/L047_2014_SEPT.md).

**Siguiente: L049**, fuente `SRC-18FB5F1BBA03`, archivo `Selectividad/sel_2013_matematicas_aplicadas/junio/reserva b/EXAMEN 1-ANDALUCÍA.pdf`. Revisar cabecera,curso,criterios y tabla;separar evidencia de carpeta y datos impresos antes de asignar metadatos.

## Procedencia y estructura de L048

Curso2012-2013 visible,año2013. Examen SRC-551C95013DE9 y criterios SRC-1A43EA28D160,sin alias exactos. Tipo reserva y letra A sólo de carpeta;convocatoria/modelo vacíos,junio sólo de ruta,5no acredita modelo. Tabla normal separada SRC-5773393B0621 asociada por carpeta:cinco rutas idénticas,conservadas en inventario,cuatro copias exactas adicionales. A1 formulación sin resolver y recinto;A2 tres tramos y derivabilidad;A3 calibres y rotura;A4 contraste histórico de media con H0:mu<=25. B1 potencias2013;B2 tangente0;B3 votación por grupos;B4 IC90proporción y cotaerror0.1. INC-017 registra total2.5 frente desglose2en criteriosA2;se conserva el examen. Sin etiquetas nuevas ni soluciones. [Informe](docs/lotes/L048_2013_RESERVA_A.md).

**Siguiente: L049**, fuente `SRC-18FB5F1BBA03`, archivo `Selectividad/sel_2013_matematicas_aplicadas/junio/reserva b/EXAMEN 1-ANDALUCÍA.pdf`. Revisar cabecera,curso,criterios y tabla;separar evidencia de carpeta y datos impresos antes de asignar metadatos.

## Procedencia de L049

Curso2012-2013 impreso; reserva B sólo por carpeta,convocatoria/modelo vacíos. Ocho ejercicios A/B; B1 mixto T04/T06 conservado completo. Criterios concordantes. Tabla SRC-8304DD8AE43B asociada por carpeta,copia exacta de SRC-5773393B0621. INC-018 registra reposición/orden no explícitos de B4b para fase futura. Nueva etiqueta varianza-medias-muestrales, sin resultados. [Informe](docs/lotes/L049_2013_RESERVA_B.md).

**Siguiente: L050**, fuente `SRC-6CABE043886D`, archivo `Selectividad/sel_2013_matematicas_aplicadas/junio/titular/EXAMEN 6 -ANDALUCÍA.pdf`. Revisar cabecera, curso, criterios, tabla y posibles alias antes de asignar metadatos.

## Procedencia de L050

Curso2012-2013 impreso;junio y titular sólo por carpeta,reserva/modelo vacíos. Ocho ejercicios A/B:matrices,beneficios,transporte,piscifactoría,tapices,derivada dada,sucesos independientes y televisión. Criterios concordantes,examen/criterios sin alias exactos. Tabla SRC-D2928B91F5AA asociada por carpeta,copia de SRC-5773393B0621,cinco procedencias idénticas. Beneficio literal de B1 conservado;etiqueta recursos-sobrantes añadida. Sin incidencias nuevas ni soluciones. [Informe](docs/lotes/L050_2013_TITULAR_JUNIO.md).

**Siguiente: L051**, fuente `SRC-48C4AF791735`, archivo `Selectividad/sel_2013_matematicas_aplicadas/septiembre/reserva a/EXAMEN 3 -ANDALUCÍA.pdf`. Revisar cabecera,curso,criterios,tabla y alias antes de asignar metadatos.

## Procedencia de L051

Curso2012-2013 impreso;reserva A sólo de carpeta,septiembre sólo de ruta;convocatoria/modelo vacíos. Ocho ejercicios A/B:ecuaciones matriciales,tres tramos,urnas,café,recinto,curvatura,idiomas y contraste histórico de proporción. A1 relacionado también con T05 por notación matricial;B4 en T09.1 y etiquetas de contraste,sin epígrafe específico actual. Criterios concordantes,examen/criterios sin alias exactos. Tabla SRC-8312DBB75351 asociada por carpeta,copia de SRC-5773393B0621,cinco procedencias idénticas. Sin etiquetas nuevas,incidencias nuevas ni soluciones. [Informe](docs/lotes/L051_2013_RESERVA_A_SEPTIEMBRE.md).

**Siguiente: L052**, fuente `SRC-F90FB6B40256`, archivo `Selectividad/sel_2013_matematicas_aplicadas/septiembre/reserva b/EXAMEN 4-ANDALUCÍA.pdf`. Revisar cabecera,curso,criterios,tabla y alias antes de asignar metadatos.

## Procedencia de L052

Curso2012-2013 impreso;reserva B sólo de carpeta,septiembre sólo de ruta;convocatoria/modelo vacíos. Ocho ejercicios A/B:matrices,derivadas,terapias,acidez,región factible,dos tramos,sucesos independientes y muestreo/intervalo de proporción. INC-019 registra reposición/orden no explícitos en B4a;convención para la fase de soluciones. Criterios concordantes,examen/criterios sin alias exactos. Tabla SRC-C8FC9A3149DF asociada por carpeta,copia de SRC-5773393B0621,cinco procedencias idénticas. Sin etiquetas nuevas ni respuestas. [Informe](docs/lotes/L052_2013_RESERVA_B_SEPTIEMBRE.md).

**Siguiente: L053**, fuente `SRC-A5DF0494F1A7`, archivo `Selectividad/sel_2013_matematicas_aplicadas/septiembre/titular/EXAMEN 2-ANDALUCÍA.pdf`. Revisar cabecera,curso,criterios,tabla y alias antes de asignar metadatos.

## Procedencia de L053

Curso2012-2013 impreso;septiembre y titular sólo de carpeta,reserva/modelo vacíos. Ocho ejercicios A/B:región factible,montajes,baile,contraste bilateral,matrices fraccionarias,parámetros,préstamos y gasto familiar. A4 en T09.1 con varianza25 literal. Criterios concordantes;examen,criterios y tabla sin alias exactos. Tabla específica SRC-B65557E07CB9 asociada por carpeta,distinta en bytes de las cinco copias de tabla anteriores. Separación local de filas en matrices de B1 para legibilidad,sin alterar entradas. Sin etiquetas ni incidencias nuevas ni soluciones. [Informe](docs/lotes/L053_2013_TITULAR_SEPTIEMBRE.md).

**Siguiente: L054**, fuente `SRC-45EF64533A19`, archivo `Selectividad/sel_2011_matematicas_aplicadas/121-EXAMEN 4.pdf`. Revisar cabecera,curso,auxiliares y alias antes de asignar metadatos.

## Procedencia de L054

Curso2010-2011 impreso,año2011. Convocatoria,tipo,reserva y modelo vacíos;121y4 sólo del nombre. Ocho ejercicios A/B:matrices,derivada/afluencia,transferencia de bolas,contraste unilateral,recinto,beneficios,errores en libro y muestreo/tamaño. A2 mixto T02principal1.5puntos/T01secundario1punto,conservado completo. INC-020 preserva media sus longitudes literal de A4. Nueva etiqueta region-aceptacion. Criterios concordantes,examen/criterios sin alias exactos. Tabla SRC-0DF80B854632 asociada por prefijo121 y carpeta,con cuatro procedencias de huella idéntica. Sin respuestas. [Informe](docs/lotes/L054_2011_EXAMEN_4.md).

**Siguiente: L055**, fuente `SRC-471D895044A9`, archivo `Selectividad/sel_2011_matematicas_aplicadas/122A-EXAMEN 6.pdf`. Revisar cabecera,curso,auxiliares y alias antes de asignar metadatos.

## Procedencia de L055

Curso2010-2011 impreso,año2011. Convocatoria,tipo,reserva y modelo vacíos;122Ay6 sólo del nombre. Ocho ejercicios A/B:recinto,tres tramos,examen,contraste televisivo,matrices/café,derivadas,paraguas y chocolate. B1 conserva Nt como dato y etiquetas natural/descafein.,A/B/C en P/Q. B2 total2.5impreso sin apartados ni puntuaciones por función;criterios0.8/0.9/0.8 no añadidos al texto. B4 peso total5274g y amplitud total como máximo3g preservados. Criterios concordantes,examen/criterios sin alias exactos. Tabla SRC-CEDD41219D14 asociada por prefijo122A y carpeta,copia de SRC-0DF80B854632,cuatro procedencias idénticas. Sin etiquetas nuevas,incidencias nuevas ni soluciones. [Informe](docs/lotes/L055_2011_EXAMEN_6.md).

**Siguiente: L056**, fuente `SRC-6437A476F758`, archivo `Selectividad/sel_2011_matematicas_aplicadas/123-EXAMEN 1.pdf`. Revisar cabecera,curso,auxiliares y alias antes de asignar metadatos.

## Procedencia de L056

Curso2010-2011 impreso,año2011. Convocatoria,tipo,reserva y modelo vacíos;123y1 sólo del nombre. Criterios SRC-C0D9348217F0 concordantes. Sin tabla específicamente acreditada. Etiqueta matriz-adyacencia añadida. El homónimo SRC-98312D373CA4 reproduce EXA-0054 con distinta SHA y no se usa como fuente de L056 ni como tabla. Cinco páginas fuente revisadas. Sin incidencias nuevas ni soluciones. [Informe](docs/lotes/L056_2011_EXAMEN_1.md).

**Siguiente fase:** continuar S003 (ocho ejercicios de EXA-0002) y revisar las incidencias antes de validar los casos afectados. S001/S002:ocho soluciones explicadas y validadas;632 pendientes. Tres pasadas del mismo autor, sin revisor independiente.

## Equivalencias de contenido: L057

[Informe y acceso individual](docs/lotes/L057_2011_REEDICION_EXAMEN_4.md). `datos/equivalencias_contenido.csv` relaciona SRC-98312D373CA4 con los ocho ID de EXA-0054. Las huellas son distintas:se conserva el inventario de duplicados exactos sin cambios. No se crean EXA-0057 ni D0057. La selección reutilizable es `selecciones/l057-ids.tex`;la selección inicial usa L084.

**Siguiente fase:** continuar S003 (ocho ejercicios de EXA-0002) y revisar las incidencias antes de validar los casos afectados. S001/S002:ocho soluciones explicadas y validadas;632 pendientes. Tres pasadas del mismo autor, sin revisor independiente.

## Procedencia de L058

Curso2010-2011 impreso;convocatoria,tipo,reserva y modelo vacíos. 221Ay5 sólo del nombre. Criterios concordantes y tabla acumulada N(0,1) asociada por prefijo y carpeta,sin cita expresa. Tres fuentes sin alias exactos. A3 conserva el literal «sin que haya incidente»;interpretación del0.03 pendiente para soluciones,sin convertir el dato en notación condicionada o conjunta. No se redactan respuestas. Sin etiquetas nuevas. [Informe](docs/lotes/L058_2011_EXAMEN_5.md).

**Siguiente fase:** continuar S003 (ocho ejercicios de EXA-0002) y revisar las incidencias antes de validar los casos afectados. S001/S002:ocho soluciones explicadas y validadas;632 pendientes. Tres pasadas del mismo autor, sin revisor independiente.

## Procedencia de L059

Curso2010-2011 impreso;convocatoria,tipo,reserva y modelo vacíos. 222y2 sólo del nombre. Criterios concordantes;examen y criterios sin alias exactos. Tabla acumulada N(0,1) asociada por prefijo y carpeta,sin cita expresa;cuatro procedencias exactas. Matrices,unidades monetarias,dado y moneda,media muestral,dos regiones distintas,tres ramas,bolas con devolución y contraste de proporción conservados. Etiqueta nueva extraccion-con-reposicion. Sin soluciones. [Informe](docs/lotes/L059_2011_EXAMEN_2.md).

**Siguiente fase:** continuar S003 (ocho ejercicios de EXA-0002) y revisar las incidencias antes de validar los casos afectados. S001/S002:ocho soluciones explicadas y validadas;632 pendientes. Tres pasadas del mismo autor, sin revisor independiente.

## Procedencia de L060

Curso2010-2011 impreso;convocatoria,tipo,reserva y modelo vacíos. 223Ay3 sólo del nombre. Criterios concordantes;examen y criterios sin alias exactos. Tabla acumulada N(0,1) asociada por prefijo y carpeta,sin cita expresa;cuatro procedencias exactas. Se conservan elementos de matrices,beneficio por tramos,aceites,media muestral,recinto,derivada descrita,tangente,garantía y ocho pesos. Sin etiquetas nuevas ni soluciones. [Informe](docs/lotes/L060_2011_EXAMEN_3.md).

**Siguiente fase:** continuar S003 (ocho ejercicios de EXA-0002) y revisar las incidencias antes de validar los casos afectados. S001/S002:ocho soluciones explicadas y validadas;632 pendientes. Tres pasadas del mismo autor, sin revisor independiente.

## Procedencia de L061

Curso2009-2010 impreso,año2010. Junio sólo por carpeta,no confirmado en cabecera;tipo,reserva y modelo vacíos. El5del nombre no acredita modelo. Criterios concordantes;examen y criterios sin alias exactos. Tabla normal asociada por carpeta,sin cita expresa;doce procedencias exactas. Se conservan el10%de puntualidad en coche,la confianza93%,el orden de factores,tres derivadas y diez producciones. Sin etiquetas nuevas ni soluciones. [Informe](docs/lotes/L061_2010_EXAMEN_5.md).

**Siguiente fase:** continuar S003 (ocho ejercicios de EXA-0002) y revisar las incidencias antes de validar los casos afectados. S001/S002:ocho soluciones explicadas y validadas;632 pendientes. Tres pasadas del mismo autor, sin revisor independiente.

## Procedencia de L062

Curso2009-2010 impreso,año2010. Junio sólo por carpeta,no confirmado en cabecera;tipo,reserva y modelo vacíos. Ra sólo parte de la ruta;4no acredita modelo. Criterios concordantes;examen y criterios sin alias exactos. Tabla por carpeta,sin cita expresa;doce procedencias exactas. Se conservan ingreso de lotes,tres ramas,condicionales,cuatro niveles de confianza,semiplanos,depósito,dado y dos cotas estrictas. Sin etiquetas nuevas ni soluciones. [Informe](docs/lotes/L062_2010_EXAMEN_4.md).

**Siguiente fase:** continuar S003 (ocho ejercicios de EXA-0002) y revisar las incidencias antes de validar los casos afectados. S001/S002:ocho soluciones explicadas y validadas;632 pendientes. Tres pasadas del mismo autor, sin revisor independiente.

## Procedencia de L063

Curso2009-2010 impreso,año2010. Junio sólo por carpeta,no confirmado en cabecera;tipo,reserva y modelo vacíos. Rb sólo parte de la ruta;6no acredita modelo. Criterios concordantes;examen y criterios sin alias exactos. Tabla por carpeta,sin cita expresa;doce procedencias exactas. Se conservan coste mínimo,parábola,complementos,proteína,recinto,dos derivadas bajo puntuación conjunta,función racional,alarma y sacos. Sin etiquetas nuevas ni soluciones. [Informe](docs/lotes/L063_2010_EXAMEN_6.md).

**Siguiente fase:** continuar S003 (ocho ejercicios de EXA-0002) y revisar las incidencias antes de validar los casos afectados. S001/S002:ocho soluciones explicadas y validadas;632 pendientes. Tres pasadas del mismo autor, sin revisor independiente.

## Procedencia de L064

Curso2009-2010 impreso,año2010. Septiembre sólo por carpeta,no confirmado en cabecera;tipo,reserva y modelo vacíos. El3del nombre no acredita modelo. Criterios concordantes;examen y criterios sin alias exactos. Tabla por carpeta,sin cita expresa;doce procedencias exactas. Se conservan recinto,consultorio,periódicos,H0 impresa,matrices,trozos,dado y muestreo. INC-021 registra reposición y orden no explicitados en B4b,pendientes de justificar al resolver. Sin etiquetas nuevas ni soluciones. [Informe](docs/lotes/L064_2010_EXAMEN_3.md).

**Siguiente fase:** continuar S003 (ocho ejercicios de EXA-0002) y revisar las incidencias antes de validar los casos afectados. S001/S002:ocho soluciones explicadas y validadas;632 pendientes. Tres pasadas del mismo autor, sin revisor independiente.

## Procedencia de L065

Curso2009-2010 impreso,año2010. Septiembre sólo por carpeta,no confirmado en cabecera;tipo,reserva y modelo vacíos. El1del nombre no acredita modelo. Criterios concordantes;examen y criterios sin alias exactos. Tabla por carpeta,sin cita expresa;doce procedencias exactas. Se conservan recinto,publicidad,fracciones,muestreo,matrices,trozos,camareros y contraste bilateral. INC-022 registra reposición y orden no explicitados en A4b,pendientes de justificar al resolver. Sin etiquetas nuevas ni soluciones. [Informe](docs/lotes/L065_2010_EXAMEN_1.md).

**Siguiente fase:** continuar S003 (ocho ejercicios de EXA-0002) y revisar las incidencias antes de validar los casos afectados. S001/S002:ocho soluciones explicadas y validadas;632 pendientes. Tres pasadas del mismo autor, sin revisor independiente.

## Procedencia de L066

Curso2009-2010 impreso,año2010. Septiembre sólo por carpeta,no confirmado en cabecera;tipo,reserva y modelo vacíos. El2del nombre no acredita modelo. Criterios concordantes;examen y criterios sin alias exactos. Tabla por carpeta,sin cita expresa;doce procedencias exactas. Se conservan matrices,perfiles de arcos,servidores,intervalo de proporción,recinto,beneficio,deportes y contraste unilateral. No se añaden incidencias ni se alteran las anteriores. Sin etiquetas nuevas ni soluciones. [Informe](docs/lotes/L066_2010_EXAMEN_2.md).

**Siguiente fase:** continuar S003 (ocho ejercicios de EXA-0002) y revisar las incidencias antes de validar los casos afectados. S001/S002:ocho soluciones explicadas y validadas;632 pendientes. Tres pasadas del mismo autor, sin revisor independiente.

## Procedencia de L067

Curso 2008-2009 impreso,año2009;otros metadatos vacíos. PDF escaneado de tres páginas:examen en1/2 y criterios concordantes en3. Sin tabla asociada. Seis ejercicios originales,con Partes I/II preservadas en E3. Tres etiquetas nuevas:sistemas-lineales,clasificacion-sistemas,efecto-tamano-muestral. Sin soluciones. [Informe](docs/lotes/L067_2009_CCSS01.md).

**Siguiente fase:** continuar S003 (ocho ejercicios de EXA-0002) y revisar las incidencias antes de validar los casos afectados. S001/S002:ocho soluciones explicadas y validadas;632 pendientes. Tres pasadas del mismo autor, sin revisor independiente.

## Procedencia de L068

Curso 2008-2009 impreso,año2009;otros metadatos vacíos. PDF escaneado de tres páginas:examen en1/2 y criterios concordantes en3. Sin tabla asociada. Seis ejercicios originales,con Partes I/II preservadas en E3. Sin etiquetas ni incidencias nuevas. Sin soluciones. [Informe](docs/lotes/L068_2009_CCSS02.md).

**Siguiente fase:** continuar S003 (ocho ejercicios de EXA-0002) y revisar las incidencias antes de validar los casos afectados. S001/S002:ocho soluciones explicadas y validadas;632 pendientes. Tres pasadas del mismo autor, sin revisor independiente.

## Procedencia de L069

Curso 2008-2009 impreso,año2009;otros metadatos vacíos. PDF escaneado de tres páginas:examen en1/2 y criterios concordantes en3. Sin tabla asociada. Seis ejercicios originales,con Partes I/II preservadas en E3. Sin etiquetas ni incidencias nuevas. Sin soluciones. [Informe](docs/lotes/L069_2009_CCSS03.md).

**Siguiente fase:** continuar S003 (ocho ejercicios de EXA-0002) y revisar las incidencias antes de validar los casos afectados. S001/S002:ocho soluciones explicadas y validadas;632 pendientes. Tres pasadas del mismo autor, sin revisor independiente.

## Procedencia de L070

Curso 2008-2009 impreso,año2009;otros metadatos vacíos. PDF escaneado de tres páginas:examen en1/2 y criterios concordantes en3. Sin tabla asociada. Seis ejercicios originales,con Partes I/II preservadas en E3. Sin etiquetas ni incidencias nuevas. Sin soluciones. [Informe](docs/lotes/L070_2009_CCSS04.md).

**Siguiente fase:** continuar S003 (ocho ejercicios de EXA-0002) y revisar las incidencias antes de validar los casos afectados. S001/S002:ocho soluciones explicadas y validadas;632 pendientes. Tres pasadas del mismo autor, sin revisor independiente.

## Procedencia de L071

Curso 2008-2009 impreso,año2009;otros metadatos vacíos. PDF escaneado de tres páginas:examen en1/2 y criterios concordantes en3. Sin tabla asociada. Seis ejercicios originales,con Partes I/II preservadas en E3. Sin etiquetas ni incidencias nuevas. Sin soluciones. [Informe](docs/lotes/L071_2009_CCSS05.md).

**Siguiente fase:** continuar S003 (ocho ejercicios de EXA-0002) y revisar las incidencias antes de validar los casos afectados. S001/S002:ocho soluciones explicadas y validadas;632 pendientes. Tres pasadas del mismo autor, sin revisor independiente.

## Procedencia de L072

Curso 2008-2009 impreso,año2009;otros metadatos vacíos. PDF escaneado de tres páginas:examen en1/2 y criterios concordantes en3. Sin tabla asociada. Seis ejercicios originales,con Partes I/II preservadas en E3. Sin etiquetas ni incidencias nuevas. Sin soluciones. [Informe](docs/lotes/L072_2009_CCSS06.md).

**Siguiente fase:** continuar S003 (ocho ejercicios de EXA-0002) y revisar las incidencias antes de validar los casos afectados. S001/S002:ocho soluciones explicadas y validadas;632 pendientes. Tres pasadas del mismo autor, sin revisor independiente.

## Procedencia de L073

Año2008 sólo por carpeta;curso,convocatoria,tipo,reserva y modelo vacíos. PDF combinado de tres páginas:examen en1/2 y criterios concordantes en3. Sin tabla asociada. Seis ejercicios originales,con Partes I/II preservadas en E3. Sin etiquetas ni incidencias nuevas. Sin soluciones. [Informe](docs/lotes/L073_2008_CCSS01.md).

**Siguiente fase:** continuar S003 (ocho ejercicios de EXA-0002) y revisar las incidencias antes de validar los casos afectados. S001/S002:ocho soluciones explicadas y validadas;632 pendientes. Tres pasadas del mismo autor, sin revisor independiente.

## Procedencia de L074

Año2008 sólo por carpeta;curso,convocatoria,tipo,reserva y modelo vacíos. PDF combinado de tres páginas:examen en1/2 y criterios concordantes en3. Sin tabla asociada. Seis ejercicios originales,con Partes I/II preservadas en E3. Etiqueta nueva coste-maximo; sin incidencias nuevas. Sin soluciones. [Informe](docs/lotes/L074_2008_CCSS02.md).

**Siguiente fase:** continuar S003 (ocho ejercicios de EXA-0002) y revisar las incidencias antes de validar los casos afectados. S001/S002:ocho soluciones explicadas y validadas;632 pendientes. Tres pasadas del mismo autor, sin revisor independiente.

## Procedencia de L075

Año2008 sólo por carpeta;curso,convocatoria,tipo,reserva y modelo vacíos. PDF combinado de tres páginas:examen en1/2 y criterios concordantes en3. Sin tabla asociada. Seis ejercicios originales,con Partes I/II preservadas en E3. INC-024: muestreo sin reposición ni orden explícitos. Sin etiquetas nuevas. Sin soluciones. [Informe](docs/lotes/L075_2008_CCSS03.md).

**Siguiente fase:** continuar S003 (ocho ejercicios de EXA-0002) y revisar las incidencias antes de validar los casos afectados. S001/S002:ocho soluciones explicadas y validadas;632 pendientes. Tres pasadas del mismo autor, sin revisor independiente.

## Procedencia de L076

Año2008 sólo por carpeta;curso,convocatoria,tipo,reserva y modelo vacíos. PDF combinado de tres páginas:examen en1/2 y criterios en3 (puntuaciones concordantes; rotulación B2 documentada en INC-025). Sin tabla asociada. Seis ejercicios originales,con Partes I/II preservadas en E3. INC-025: criterios B2 rotulados a,c,c,d; examen a,b,c,d intacto. Sin etiquetas nuevas. Sin soluciones. [Informe](docs/lotes/L076_2008_CCSS04.md).

**Siguiente fase:** continuar S003 (ocho ejercicios de EXA-0002) y revisar las incidencias antes de validar los casos afectados. S001/S002:ocho soluciones explicadas y validadas;632 pendientes. Tres pasadas del mismo autor, sin revisor independiente.

## Procedencia de L077

Año2008 sólo por carpeta;curso,convocatoria,tipo,reserva y modelo vacíos. PDF combinado de tres páginas:examen en1/2 y criterios concordantes en3. Sin tabla asociada. Seis ejercicios originales,con Partes I/II preservadas en E3. Sin incidencias nuevas. Sin etiquetas nuevas. Sin soluciones. [Informe](docs/lotes/L077_2008_CCSS05.md).

**Siguiente fase:** continuar S003 (ocho ejercicios de EXA-0002) y revisar las incidencias antes de validar los casos afectados. S001/S002:ocho soluciones explicadas y validadas;632 pendientes. Tres pasadas del mismo autor, sin revisor independiente.

## Procedencia de L078

Año2008 sólo por carpeta;curso,convocatoria,tipo,reserva y modelo vacíos. PDF combinado de tres páginas:examen en1/2 y criterios concordantes en3. Sin tabla asociada. Seis ejercicios originales,con Partes I/II preservadas en E3. INC-026: comilla abierta sin cierre visible en A3-I. Sin etiquetas nuevas. Sin soluciones. [Informe](docs/lotes/L078_2008_CCSS06.md).

**Siguiente fase:** continuar S003 (ocho ejercicios de EXA-0002) y revisar las incidencias antes de validar los casos afectados. S001/S002:ocho soluciones explicadas y validadas;632 pendientes. Tres pasadas del mismo autor, sin revisor independiente.

## Procedencia de L079

Curso 2011-2012 visible en los DOC de examen y criterios convertidos. Examen de dos páginas; criterios de una y tabla normal de una, asociada por carpeta. Ocho ejercicios de 2.5 puntos, sin soluciones. Originales intactos; fórmulas OLE cotejadas visualmente. Sin etiquetas ni incidencias nuevas. [Informe](docs/lotes/L079_2012_EXAMEN_1.md) y [conversión](docs/lotes/L079_conversion.json).

**Siguiente fase:** continuar S003 (ocho ejercicios de EXA-0002) y revisar las incidencias antes de validar los casos afectados. S001/S002:ocho soluciones explicadas y validadas;632 pendientes. Tres pasadas del mismo autor, sin revisor independiente.

## Procedencia de L080

Curso 2011-2012 visible en los DOC de examen y criterios convertidos. Examen de dos páginas; criterios de una y tabla normal de una, asociada por carpeta. Ocho ejercicios de 2.5 puntos, sin soluciones. Originales intactos; fórmulas OLE cotejadas visualmente. Sin etiquetas ni incidencias nuevas. [Informe](docs/lotes/L080_2012_EXAMEN_5.md) y [conversión](docs/lotes/L080_conversion.json).

**Siguiente fase:** continuar S003 (ocho ejercicios de EXA-0002) y revisar las incidencias antes de validar los casos afectados. S001/S002:ocho soluciones explicadas y validadas;632 pendientes. Tres pasadas del mismo autor, sin revisor independiente.

## Procedencia de L081

Curso 2011-2012 visible en los DOC de examen y criterios convertidos. Examen de dos páginas; criterios de una y tabla normal de una, asociada por carpeta. Ocho ejercicios de 2.5 puntos, sin soluciones. Originales intactos; fórmulas OLE cotejadas visualmente. Sin etiquetas nuevas. INC-027 registra que B4b no explicita reposición ni orden en el muestreo. [Informe](docs/lotes/L081_2012_EXAMEN_2.md) y [conversión](docs/lotes/L081_conversion.json).

**Siguiente fase:** continuar S003 (ocho ejercicios de EXA-0002) y revisar las incidencias antes de validar los casos afectados. S001/S002:ocho soluciones explicadas y validadas;632 pendientes. Tres pasadas del mismo autor, sin revisor independiente.

## Procedencia de L082

Curso 2011-2012 visible en los DOC de examen y criterios convertidos. Examen de dos páginas; criterios de una y tabla normal de una, asociada por carpeta. Ocho ejercicios de 2.5 puntos, sin soluciones. Originales intactos; fórmulas OLE cotejadas visualmente. Sin etiquetas ni incidencias nuevas. [Informe](docs/lotes/L082_2012_EXAMEN_4.md) y [conversión](docs/lotes/L082_conversion.json).

**Siguiente fase:** continuar S003 (ocho ejercicios de EXA-0002) y revisar las incidencias antes de validar los casos afectados. S001/S002:ocho soluciones explicadas y validadas;632 pendientes. Tres pasadas del mismo autor, sin revisor independiente.

## Procedencia de L083

Curso 2011-2012 visible en los DOC de examen y criterios convertidos. Examen de dos páginas; criterios de una y tabla normal de una, asociada por carpeta. Ocho ejercicios de 2.5 puntos, sin soluciones. Originales intactos; fórmulas OLE cotejadas visualmente. Sin etiquetas ni incidencias nuevas. [Informe](docs/lotes/L083_2012_EXAMEN_3.md) y [conversión](docs/lotes/L083_conversion.json).

**Siguiente fase:** continuar S003 (ocho ejercicios de EXA-0002) y revisar las incidencias antes de validar los casos afectados. S001/S002:ocho soluciones explicadas y validadas;632 pendientes. Tres pasadas del mismo autor, sin revisor independiente.

## Cierre de la primera pasada y procedencia de L084

Curso 2011-2012 visible en los DOC convertidos. Examen de dos páginas, criterios de una y tabla normal de una asociada por carpeta. Ocho ejercicios, sin soluciones. INC-028 registra un trazo literal tras B2c; no se interpreta como parte de la función. [Informe](docs/lotes/L084_2012_EXAMEN_6.md), [conversión](docs/lotes/L084_conversion.json) y [balance y siguientes tareas](docs/CIERRE_TRANSCRIPCIONES.md).

## Soluciones: avance histórico S001

Dos soluciones validadas, A1/A2 de EXA-0001;638 pendientes. Incluyen teoría, desarrollo, comprobaciones exactas y figura del recinto.22 pruebas superadas; PDF revisados y comprobación del ZIP aislado documentada en el informe al cierre. [Informe](docs/soluciones/S001_2019_A1_A2.md), [tandas secuenciales](docs/LOTES_DE_SOLUCIONES.md) y [auditoría de incidencias](docs/AUDITORIA_INCIDENCIAS_SOLUCIONES.md).

## Soluciones: avance S002

Seis soluciones nuevas validadas; ocho acumuladas y632 pendientes. Se completa EXA-0001, conservando los640 enunciados y sus categorías. Comprobaciones racionales de probabilidades y matrices; derivación racional y percentiles contrastados con bisección de la CDF; tamaños mínimos verificados en n y n-1.22 pruebas y PDF revisados. [Informe](docs/soluciones/S002_2019_RESTO_EXAMEN.md); [tandas](docs/LOTES_DE_SOLUCIONES.md).
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

### 2026-10-27 · feat/review/build/test/docs: L026

- `feat`: ocho enunciados D0026/EXA-0026;208 cotejados/clasificados, cero soluciones. Etiqueta contraste-unilateral-proporcion. Índice individual regenerado.
- `review`: tres páginas fuente, cuatro de borrador y ocho finales revisadas; segunda pasada del mismo autor, sin atribuir revisión independiente. Matrices, a>0, dominios y H0 preservados.
- `test`:21pruebas en105.011s;215originales y450archivos previos intactos. Filtros por temas secundarios, epígrafes, IDs y etiquetas comprobados.
- `build`: dos PDF de cuatro páginas; ajuste local del combinado para mantener avisos con enunciados; ZIP aislado compilado, modos y anterior L025 idénticos byte a byte; main texto/renderizados coincidentes.
- `docs`: [informe L026](docs/lotes/L026_2016_suplemente_septiembre.md);26/84candidatos cerrados,58pendientes. [Fase de soluciones](docs/FASE_SOLUCIONES.md) autorizada para después de las transcripciones, con comprobación matemática y didáctica. Sin soluciones redactadas.
- `next`: L027,SRC-5236F1F4258C;confirmar curso/naturaleza antes de transcribir.

### 2026-10-27 · feat/review/build/test/docs: L027

- `feat`: ocho enunciados D0027/EXA-0027, 216 cotejados y clasificados; cero soluciones. Índice individual actualizado con etiquetas existentes.
- `review`: tres páginas fuente, cuatro de borrador y ocho finales revisadas. Segunda pasada del mismo autor; curso visible 2016-2017 y capa oculta antigua en criterios diferenciados.
- `test`: 21 pruebas en 137.158 s; 215 originales y 468 archivos previos intactos. Filtros de matrices, tangentes, independencia, vértices, Bayes y cotas inclusiva/estricta comprobados.
- `build`: dos PDF de cuatro páginas; ZIP aislado compilado y comparado, anterior L026 preservada; main coincide por texto y renderizados.
- `docs`: [informe L027](docs/lotes/L027_2017_suplemente_septiembre.md); 27/84 candidatos cerrados, 57 pendientes. Resoluciones autorizadas para fase posterior, aún no iniciadas.
- `next`: L028, SRC-F8C8F9912AB9; confirmar curso y contenido.

### 2026-10-27 · feat/review/build/test/docs: L028

- `feat`: ocho enunciados D0028/EXA-0028; 224 cotejados y clasificados, cero soluciones. Etiquetas espacio-muestral, sucesos-elementales y orden-extraccion añadidas.
- `review`: cuatro páginas fuente, cuatro de borrador y ocho finales revisadas. Segunda pasada del mismo autor; tabla normal genérica asociada por carpeta. Tipo suplente sólo de carpeta; convocatoria/modelo no acreditados.
- `test`: 21 pruebas en 194.544 s, 215 originales y 486 archivos previos intactos; filtros por contenidos, tipo, temas secundarios, epígrafes y cotas comprobados.
- `build`: dos PDF de cuatro páginas; ZIP aislado compilado, ambos modos y anterior L027 idénticos byte a byte; main por texto/renderizados coincidente.
- `docs`: [informe L028](docs/lotes/L028_2018_suplente_junio.md); 28/84 candidatos cerrados, 56 pendientes. Fase de soluciones posterior, aún sin redactar.
- `next`: L029, SRC-DBB5831F5A47; confirmar curso y contenido.

### 2026-10-27 · feat/review/build/test/docs: L029

- `feat`: ocho enunciados D0029/EXA-0029; 232 cotejados y clasificados, cero soluciones. Etiqueta cortes-ejes añadida.
- `review`: cuatro páginas fuente y cinco de borrador revisadas; ocho finales inspeccionadas. Segunda pasada del mismo autor. Matrices, exponente5x, logaritmo, elección de urna y cambios de confianza/proporción preservados.
- `test`: 21 pruebas; 215 originales y 504 archivos previos intactos. Filtros por tema secundario, epígrafe, etiquetas y tipo comprobados.
- `build`: dos PDF de cuatro páginas; ZIP aislado compilado, ambos modos y anterior L028 idénticos byte a byte; main por texto/renderizados coincidente.
- `docs`: [informe L029](docs/lotes/L029_2018_suplente_septiembre.md); 29/84 candidatos cerrados, 55 pendientes. Fase de soluciones posterior, aún sin redactar.
- `next`: L030, SRC-B12009F18588; confirmar curso y contenido.

### 2026-10-27 · feat/review/build/test/docs: L030

- `feat`: ocho enunciados D0030/EXA-0030; 240 cotejados y clasificados, cero soluciones. Etiquetas varianza-medias-muestrales e igualdad-matricial.
- `review`: cuatro páginas fuente y cuatro de borrador revisadas; ocho finales inspeccionadas. Segunda pasada del mismo autor. INC-010 registra reposición/orden no explícitos en A4 para revisar antes de resolver.
- `test`: 21 pruebas, 215 fuentes y 522 archivos previos intactos. Filtros de formulación sin resolver, varianza de medias, igualdad matricial, Bayes y error inclusivo comprobados; no se presume sin reposición.
- `build`: dos PDF de cuatro páginas; ZIP aislado compilado, ambos modos y anterior L029 idénticos byte a byte; main por texto/renderizados coincidente.
- `docs`: [informe L030](docs/lotes/L030_2018_titular_junio.md); 30/84 candidatos cerrados, 54 pendientes. Soluciones autorizadas para fase posterior, aún sin redactar.
- `next`: L031, SRC-5A4395CDE486; confirmar curso y auxiliares.

### 2026-10-27 · feat/review/build/test/docs: L031

- `feat`: ocho enunciados D0031/EXA-0031; 248 cotejados y clasificados, cero soluciones. Etiquetas interpretacion-matrices e interpretacion-asintota añadidas.
- `review`: tres páginas fuente y cuatro de borrador revisadas; ocho finales inspeccionadas. Segunda pasada del mismo autor; P/Q, tramos, n64/n100 y error estricto preservados. Curso2015-2016 impreso;6 no acredita modelo.
- `test`: 21 pruebas; 215 fuentes y 540 archivos previos intactos. Filtros de interpretación, asíntotas, ropa, Bayes, tamaño estricto y probabilidad de media comprobados.
- `build`: dos PDF de cuatro páginas; espaciado local condicionado a los IDs de L031; ZIP aislado con ambos modos y anterior L030 idénticos byte a byte, main texto/renderizados coincidente.
- `docs`: [informe L031](docs/lotes/L031_2016_titular_junio.md); 31/84 candidatos cerrados, 53 pendientes. Soluciones autorizadas para fase posterior, aún sin redactar.
- `next`: L032, SRC-9DA5CEBDAB8C; confirmar curso y auxiliares.

### 2026-10-27 · feat/review/test: L032

- `feat`: ocho enunciados D0032/EXA-0032;256 cotejados y clasificados, cero soluciones. Identificadores, temas y etiquetas individuales.
- `review`: dos páginas de examen y una de criterios; cuatro páginas de borrador y ocho finales revisadas por el mismo autor en pasadas separadas. Curso visible2016-2017 prevalece sobre texto oculto2015-2016.
- `test`:21 pruebas en99.988s,215fuentes y558archivos previos intactos; filtros individuales y combinados comprobados.
- `next`:L033,SRC-267D479DF51C;52candidatos pendientes. Resoluciones para fase posterior.

- `build/docs L032`: ZIP772archivos extraído y compilado; ambos modos y anterior L031 idénticos byte a byte, main texto y cuatro renderizados coincidentes. Tanda cerrada; siguiente L033.

- `build/docs L033`: ZIP795archivos extraído y compilado; ambos modos y anterior L032 idénticos byte a byte, main texto y cuatro renderizados coincidentes. Tanda cerrada; siguiente L034.

### 2026-10-27 · feat/review/build/test/docs: L033

- `feat`: ocho enunciados D0033/EXA-0033; 264 cotejados y clasificados, cero soluciones. Temas, epígrafes y etiquetas enlazados individualmente.
- `review`: cuatro páginas fuente (examen, criterios y tabla auxiliar), cuatro de borrador y ocho finales revisadas en pasadas separadas del mismo autor. INC-011 registra asignación entera en A4c; INC-012 rotulación de criterios B2. Texto del examen preservado.
- `test`: 21 pruebas en 285.690 s, 215 fuentes y 576 archivos previos intactos. Filtros de región factible, unidades, independencia, afijación, ecuación matricial, derivabilidad, Bayes y varianza conocida comprobados.
- `build`: dos PDF de cuatro páginas; espaciado local sólo para IDs de L033. ZIP aislado de 795 archivos compilado; ambos modos y anterior L032 idénticos byte a byte, main texto y cuatro renderizados coincidentes.
- `next`: L034, SRC-F6770A154C02; 51 candidatos pendientes. Soluciones para fase posterior.

### 2026-10-27 · feat/review/build/test/docs: L034

- `feat`: ocho enunciados D0034/EXA-0034; 272 cotejados y clasificados, cero soluciones. Temas, epígrafes y etiquetas enlazados individualmente.
- `review`: tres páginas fuente, cuatro de borrador y ocho finales revisadas en pasadas separadas del mismo autor. Documento preliminar otro confirmado como examen; INC-013 registra reposición/orden no explícitos en B4b. Texto preservado, sin añadir hipótesis.
- `test`: 21 pruebas en119.941s,215 fuentes y594 archivos previos intactos. Filtros de dimensiones, derivada dada, complementarios, cota inclusiva, programación lineal, asíntotas, Bayes y muestreo comprobados.
- `build`: dos PDF de cuatro páginas, sin ajustes locales ni cambios compartidos. ZIP aislado de818 archivos compilado; ambos modos y anterior L033 idénticos byte a byte, main texto y cuatro renderizados coincidentes.
- `next`: L035,SRC-3B33B8F88C00;50 candidatos pendientes. Soluciones para fase posterior.

### 2026-10-27 · feat/review/build/test/docs: L035

- `feat`: ocho enunciados D0035/EXA-0035; 280 cotejados y clasificados, cero soluciones. Temas, epígrafes y etiquetas enlazados individualmente.
- `review`: tres páginas fuente, cuatro de borrador y ocho finales revisadas en pasadas separadas del mismo autor. Cotas de error inclusiva/estricta, proporciones distintas en B4 y sustitución por dos bolas cotejadas. Texto preservado, sin añadir hipótesis.
- `test`: 21 pruebas en90.681s,215 fuentes y612 archivos previos intactos. Filtros de dimensiones, inflexión, igualdad de derivadas, urna dinámica, Bayes y cotas distintas comprobados.
- `build`: dos PDF de cuatro páginas, sin ajustes locales ni cambios compartidos. ZIP aislado de841 archivos compilado; ambos modos y anterior L034 idénticos byte a byte, main texto y cuatro renderizados coincidentes.
- `next`: L036,SRC-D4199CAE2EC3;49 candidatos pendientes. Soluciones para fase posterior.

### 2026-10-27 · feat/review/build/test/docs: L036

- `feat`: ocho enunciados D0036/EXA-0036; 288 cotejados y clasificados, cero soluciones. Temas, epígrafes y etiquetas enlazados individualmente.
- `review`: tres páginas fuente, cuatro de borrador y ocho finales revisadas en pasadas separadas del mismo autor. Alias de examen y criterios verificados por SHA-256;contraste histórico de media,comparación de reposición y unidades cotejados. Texto preservado, sin añadir hipótesis.
- `test`: 21 pruebas en300.123s,215 fuentes y630 archivos previos intactos. Filtros de matrices,inversión,reposición,contraste unilateral,derivabilidad,complementarios e intervalo de media comprobados.
- `build`: dos PDF de cuatro páginas, sin ajustes locales ni cambios compartidos. ZIP aislado de864 archivos compilado; ambos modos y anterior L035 idénticos byte a byte, main texto y cuatro renderizados coincidentes.
- `next`: L037,SRC-20170EF2B2D5;48 candidatos pendientes. Soluciones para fase posterior.

### 2026-10-28 · feat/review/build/test/docs: L037

- `feat`: ocho enunciados D0037/EXA-0037; 296 cotejados y clasificados, cero soluciones. Temas, epígrafes y etiquetas enlazados individualmente.
- `review`: tres páginas fuente, cuatro de borrador y siete finales revisadas en pasadas separadas del mismo autor. Alias de examen y criterios verificados por SHA-256;contraste bilateral,despeje sin calcular,ingresos y logaritmo cotejados. Texto preservado, sin añadir hipótesis.
- `test`: 21 pruebas en250.344s,215 fuentes y648 archivos previos intactos. Filtros de dimensiones,despeje,temperatura,Bayes,contraste bilateral,ingresos,derivadas e intervalo de proporción comprobados.
- `build`: PDF de enunciados de tres páginas y combinado de cuatro páginas, espaciado local condicionado a los IDs de L037,sin cambios compartidos. ZIP aislado de887 archivos compilado; ambos modos y anterior L036 idénticos byte a byte, main texto y tres renderizados coincidentes.
- `next`: L038,SRC-DED70B2939A7;47 candidatos pendientes. Soluciones para fase posterior.

### 2026-10-28 · feat/review/build/test/docs: L038

- `feat`: ocho enunciados D0038/EXA-0038; 304 cotejados y clasificados, cero soluciones. Temas, epígrafes y etiquetas enlazados individualmente.
- `review`: tres páginas fuente, cuatro de borrador y ocho finales revisadas en pasadas separadas del mismo autor. Alias de examen y criterios verificados por SHA-256;dos funciones independientes en A2,unidades,cota estricta y contraste unilateral cotejados. Texto preservado, sin añadir hipótesis.
- `test`: 21 pruebas en162.998s,215 fuentes y666 archivos previos intactos. Filtros de matrices,continuidad,inflexión,beneficio literal,Bayes,intervalo de media y contraste unilateral comprobados.
- `build`: dos PDF de cuatro páginas, sin ajustes locales ni cambios compartidos. ZIP aislado de910 archivos compilado; ambos modos y anterior L037 idénticos byte a byte, main texto y cuatro renderizados coincidentes.
- `next`: L039,SRC-6129A8DBCD4F;46 candidatos pendientes. Soluciones para fase posterior.

### 2026-10-28 · feat/review/build/test/docs: L039

- `feat`: ocho enunciados D0039/EXA-0039; 312 cotejados y clasificados, cero soluciones. Temas, epígrafes y etiquetas enlazados individualmente.
- `review`: tres páginas fuente, cuatro de borrador y ocho finales revisadas en pasadas separadas del mismo autor. Alias de examen y criterios verificados por SHA-256;derivadas,dimensiones,diagnóstico,significaciones y amplitud cotejados. Texto preservado, sin añadir hipótesis.
- `test`: 21 pruebas en340.878s,215 fuentes y684 archivos previos intactos. Filtros de máxima cantidad,derivadas,matrices,Bayes,diagnóstico correcto,comparación de significaciones y amplitud estricta comprobados.
- `build`: dos PDF de cuatro páginas, sin ajustes locales ni cambios compartidos. ZIP aislado de933 archivos compilado; ambos modos y anterior L038 idénticos byte a byte, main texto y cuatro renderizados coincidentes.
- `next`: L040,SRC-5D9E6A5CB42C;45 candidatos pendientes. Soluciones para fase posterior.

### 2026-10-28 · feat/review/build/test/docs: L040

- `feat`: ocho enunciados D0040/EXA-0040; 320 cotejados y clasificados, cero soluciones. Temas, epígrafes y etiquetas enlazados individualmente.
- `review`: tres páginas fuente, cuatro de borrador y ocho finales revisadas en pasadas separadas del mismo autor. Alias de examen y criterios verificados por SHA-256;matrices,tres tramos,incompatibilidad,varianza,restricciones y reducción del error cotejados. Texto preservado, sin añadir hipótesis.
- `test`: 21 pruebas en109.487s,215 fuentes y702 archivos previos intactos. Filtros de matrices,potencias,derivabilidad,incompatibilidad,contraste,varianza,Bayes e intervalo con comparación de error comprobados.
- `build`: dos PDF de cuatro páginas, sin ajustes locales ni cambios compartidos. ZIP aislado de956 archivos compilado; ambos modos y anterior L039 idénticos byte a byte, main texto y cuatro renderizados coincidentes.
- `next`: L041,SRC-417302754109;44 candidatos pendientes. Soluciones para fase posterior.

### 2026-10-28 · feat/review/build/test/docs: L041

- `feat`: ocho enunciados D0041/EXA-0041; 328 cotejados y clasificados, cero soluciones. Temas, epígrafes y etiquetas enlazados individualmente.
- `review`: tres páginas fuente, cuatro de borrador y ocho finales revisadas en pasadas separadas del mismo autor. Alias de examen y criterios verificados por SHA-256;matrices,asíntotas,independencia,capitales,restricciones y contraste de disminución cotejados. Texto preservado, sin añadir hipótesis.
- `test`: 21 pruebas en370.973s,215 fuentes y720 archivos previos intactos. Filtros de matrices,parámetros,asíntotas,independencia,intervalo y error máximo,inversión,derivabilidad,Bayes y contraste comprobados.
- `build`: dos PDF de cuatro páginas, sin ajustes locales ni cambios compartidos. ZIP aislado de979 archivos compilado; ambos modos y anterior L040 idénticos byte a byte, main texto y cuatro renderizados coincidentes.
- `next`: L042,SRC-987D141AC72B;43 candidatos pendientes. Soluciones para fase posterior.

### 2026-10-28 · feat/review/build/test/docs: L042

- `feat`: ocho enunciados D0042/EXA-0042; 336 cotejados y clasificados, cero soluciones. Temas, epígrafes y etiquetas enlazados individualmente.
- `review`: tres páginas fuente, cuatro de borrador y ocho finales revisadas en pasadas separadas del mismo autor. Huellas de examen y criterios verificadas;sin alias exactos;matrices,traspuesta,mínimo,complementarios,intervalo,dieta y contraste de proporción cotejados. Texto preservado, sin añadir hipótesis.
- `test`: 21 pruebas en115.599s,215 fuentes y738 archivos previos intactos. Filtros de traspuesta,parámetros,mínimo,independencia,intervalo,dieta,derivabilidad y contraste de proporción con comparación de significaciones comprobados.
- `build`: dos PDF de cuatro páginas, sin ajustes locales ni cambios compartidos. ZIP aislado de1002 archivos compilado; ambos modos y anterior L041 idénticos byte a byte, main texto y cuatro renderizados coincidentes.
- `next`: L043,SRC-B7376BBA6509;42 candidatos pendientes. Soluciones para fase posterior.

### 2026-10-28 · feat/review/build/test/docs: L043

- `feat`: ocho enunciados D0043/EXA-0043; 344 cotejados y clasificados, cero soluciones. Temas, epígrafes y etiquetas enlazados individualmente.
- `review`: tres páginas fuente, cuatro de borrador y ocho finales revisadas en pasadas separadas del mismo autor. Huellas de examen y criterios verificadas;sin alias exactos;restricciones,tramos,matrices,datos,horas,conjunto de16números y estructura1a/1b/2 cotejados. Texto preservado, sin añadir hipótesis.
- `test`: 21 pruebas en238.255s,215 fuentes y756 archivos previos intactos. Filtros de región y extremos,derivabilidad,Bayes,intervalo con cota inclusiva,matrices,audiencia,independencia y muestreo comprobados.
- `build`: dos PDF de cuatro páginas, con espaciado local limitado a los ocho IDs de L043; sin cambios compartidos. ZIP aislado de1025 archivos compilado; ambos modos y anterior L042 idénticos byte a byte, main texto y cuatro renderizados coincidentes.
- `next`: L044,SRC-12C7C27227F3;41 candidatos pendientes. Soluciones para fase posterior.

### 2026-10-28 · feat/review/build/test/docs: L044

- `feat`: ocho enunciados D0044/EXA-0044; 352 cotejados y clasificados, cero soluciones. Temas, epígrafes y etiquetas enlazados individualmente.
- `review`: tres páginas fuente, cuatro de borrador y ocho finales revisadas en pasadas separadas del mismo autor. Huellas de examen y criterios verificadas;sin alias exactos;traspuestas,cúbica,proporciones,restricciones impresas,tramos y muestras cotejados. Texto preservado, sin añadir hipótesis.
- `test`: 21 pruebas en158.532s,215 fuentes y774 archivos previos intactos. Filtros de traspuesta,curvatura,experimento compuesto,intervalo de proporción,región,derivabilidad,condicional y muestreo comprobados.
- `build`: dos PDF de cuatro páginas, sin ajustes locales ni cambios compartidos. ZIP aislado de1048 archivos compilado; ambos modos y anterior L043 idénticos byte a byte, main texto y cuatro renderizados coincidentes.
- `next`: L045,SRC-FF289770F60D;40 candidatos pendientes. Soluciones para fase posterior.

### 2026-10-28 · feat/review/build/test/docs: L045

- `feat`: ocho enunciados D0045/EXA-0045; 360 cotejados y clasificados, cero soluciones. Temas, epígrafes y etiquetas enlazados individualmente.
- `review`: tres páginas fuente, cuatro de borrador y ocho finales revisadas en pasadas separadas del mismo autor. Huellas de examen y criterios verificadas;sin alias exactos;matrices,derivadas,contraste,cinco vértices,cúbica,prensa e intervalo cotejados. Texto preservado, sin añadir hipótesis.
- `test`: 21 pruebas en67.504s,215 fuentes y792 archivos previos intactos. Filtros de matrices,derivadas,independencia,contraste,ejercicio mixto T04/T06,cúbica,prensa e intervalo comprobados.
- `build`: PDF de tres páginas de enunciados y cuatro con soluciones pendientes, sin ajustes locales ni cambios compartidos. ZIP aislado de1071 archivos compilado; ambos modos y anterior L044 idénticos byte a byte, main texto y tres renderizados coincidentes.
- `next`: L046,SRC-9B38A4843707;39 candidatos pendientes. Soluciones para fase posterior.

### 2026-10-28 · feat/review/build/test/docs: L046

- `feat`: ocho enunciados D0046/EXA-0046; 368 cotejados y clasificados, cero soluciones. Temas, epígrafes y etiquetas enlazados individualmente.
- `review`: tres páginas fuente, cuatro de borrador y ocho finales revisadas en pasadas separadas del mismo autor. Huellas de examen y criterios verificadas;sin alias exactos;potencia2014,beneficios,urnas,intervalo98.8,restricciones,tramos,ofertas y contraste bilateral cotejados. Texto preservado, sin añadir hipótesis.
- `test`: 21 pruebas en116.998s,215 fuentes y810 archivos previos intactos. Filtros de potencia,beneficios,Bayes,intervalo de media,región,derivabilidad,unión y contraste bilateral de proporción comprobados.
- `build`: dos PDF de cuatro páginas, sin ajustes locales ni cambios compartidos. ZIP aislado de1094 archivos compilado; ambos modos y anterior L045 idénticos byte a byte, main texto y cuatro renderizados coincidentes.
- `next`: L047,SRC-3753985712BC;38 candidatos pendientes. Soluciones para fase posterior.

### 2026-10-28 · feat/review/build/test/docs: L047

- `feat`: ocho enunciados D0047/EXA-0047; 376 cotejados y clasificados, cero soluciones. Temas, epígrafes y etiquetas enlazados individualmente.
- `review`: tres páginas fuente, cuatro de borrador y ocho finales revisadas en pasadas separadas del mismo autor. Huellas de examen y criterios verificadas;sin alias exactos;matrices,beneficios,asistencia,contraste de media,formulación sin resolver,parábola,peritaje y amplitud cotejados. Texto preservado, sin añadir hipótesis.
- `test`: 21 pruebas en130.967s,215 fuentes y828 archivos previos intactos. Filtros de traspuesta,beneficios,independencia,contraste de media,formulación sin resolver,tangente,peritaje y amplitud comprobados.
- `build`: PDF de tres páginas de enunciados y cuatro con soluciones pendientes, con espaciado local limitado a los ocho IDs de L047;sin cambios compartidos. ZIP aislado de1117 archivos compilado; ambos modos y anterior L046 idénticos byte a byte, main texto y tres renderizados coincidentes.
- `next`: L048,SRC-551C95013DE9;37 candidatos pendientes. Soluciones para fase posterior.

### 2026-10-28 · feat/review/build/test/docs: L048

- `feat`: ocho enunciados D0048/EXA-0048; 384 cotejados y clasificados, cero soluciones. Temas, epígrafes y etiquetas enlazados individualmente.
- `review`: cuatro páginas fuente, cuatro de borrador y siete finales revisadas en pasadas separadas del mismo autor. Huellas de examen y criterios verificadas;sin alias exactos;formulación,tres tramos,roturas,contraste histórico,potencias,tangente,votación e intervalo cotejados. Texto preservado, sin añadir hipótesis.
- `test`: 21 pruebas en115.350s,215 fuentes y846 archivos previos intactos. Filtros de formulación,tres tramos,Bayes,contraste de media,potencias,tangente,votación e intervalo de proporción comprobados.
- `build`: dos PDF de tres y cuatro páginas, con espaciado local protegido y sin cambios compartidos. ZIP aislado de1140 archivos compilado; ambos modos y anterior L047 idénticos byte a byte, main texto y tres renderizados coincidentes.
- `next`: L049,SRC-18FB5F1BBA03;36 candidatos pendientes. Soluciones para fase posterior.

### 2026-10-28 · feat/review/test/build/docs: L049

- `feat`: ocho enunciados D0049/EXA-0049 enlazados individualmente;392 cotejados y clasificados,cero soluciones. B1 mixto T04/T06 conservado completo;etiqueta varianza-medias-muestrales añadida.
- `review`: cuatro páginas fuente,cuatro de borrador y siete finales cotejadas en pasadas separadas del mismo autor. Sin segundo revisor distinto. Examen y criterios sin alias exactos;cinco procedencias de tabla verificadas. INC-018 conserva reposición/orden no explícitos de B4b para la futura solución.
- `test`: 21 pruebas en94.034s,215 fuentes y864 archivos anteriores intactos. Temporales de pruebas dentro del espacio de trabajo. Filtros individuales,opciones,temas secundarios y etiquetas comprobados.
- `build`: PDF de tres y cuatro páginas con espaciado local protegido;ZIP aislado de1163 archivos compilado. Ambos modos L049 y anterior L048 idénticos byte a byte;main con texto y tres renderizados coincidentes. Servicio Overleaf no probado.
- `next`: L050,SRC-6CABE043886D;35 candidatos pendientes. Soluciones para después de completar transcripciones.

### 2026-10-28 · feat/review/test/build/docs: L050

- `feat`: ocho enunciados D0050/EXA-0050 enlazados individualmente;400 cotejados y clasificados,cero soluciones. Nueva etiqueta recursos-sobrantes para la petición de hilo remanente de B1.
- `review`: cuatro páginas fuente,cuatro de borrador y siete finales cotejadas en pasadas separadas del mismo autor;sin segundo revisor distinto. Examen/criterios sin alias exactos;cinco procedencias de tabla verificadas. Matrices,datos de derivada y probabilidades preservados. Beneficio literal de B1 conservado,sin inventar costes. Sin incidencias nuevas.
- `test`: 21 pruebas en89.822s,215 fuentes y882 archivos anteriores intactos. Temporales de pruebas en espacio de trabajo. Filtros individuales,opciones,temas secundarios,epígrafes y etiquetas comprobados.
- `build`: PDF de tres y cuatro páginas con espaciado local protegido;ZIP aislado de1186 archivos compilado. Ambos modos L050 y anterior L049 idénticos byte a byte;main texto y tres renderizados coincidentes. Servicio Overleaf no probado.
- `next`: L051,SRC-48C4AF791735;34 candidatos pendientes. Soluciones para después de completar transcripciones.

### 2026-10-28 · feat/review/test/build/docs: L051

- `feat`: ocho enunciados D0051/EXA-0051 enlazados individualmente;408 cotejados y clasificados,cero soluciones. A1 relacionado con T04/T05;B4 contraste histórico de proporción en T09.1,sin confundirlo con intervalo de confianza. Sin etiquetas nuevas.
- `review`: cuatro páginas fuente,cuatro de borrador y siete finales cotejadas en pasadas separadas del mismo autor;sin segundo revisor distinto. Examen/criterios sin alias exactos;cinco procedencias de tabla verificadas. Matrices,tres tramos,nueve pesos de café,recinto,curvatura,idiomas e hipótesis nula preservados. Sin incidencias nuevas.
- `test`: 21 pruebas en121.366s,215 fuentes y900 archivos anteriores intactos. Temporales de pruebas en espacio de trabajo. Filtros individuales,opciones,temas secundarios,epígrafes y etiquetas comprobados.
- `build`: PDF de tres y cuatro páginas con espaciado local protegido;ZIP aislado de1209 archivos compilado. Ambos modos L051 y anterior L050 idénticos byte a byte;main texto y tres renderizados coincidentes. Servicio Overleaf no probado.
- `next`: L052,SRC-F90FB6B40256;33 candidatos pendientes. Soluciones para después de completar transcripciones.

### 2026-10-28 · feat/review/test/build/docs: L052

- `feat`: ocho enunciados D0052/EXA-0052 enlazados individualmente;416 cotejados y clasificados,cero soluciones. B4 conserva muestreo e intervalo de proporción en una unidad. Sin etiquetas nuevas.
- `review`: cuatro páginas fuente,cuatro de borrador y siete finales cotejadas en pasadas separadas del mismo autor;sin segundo revisor distinto. Examen/criterios sin alias exactos;cinco procedencias de tabla verificadas. Matrices,derivadas,terapias,cinco medidas de acidez,recinto y dos tramos preservados. INC-019 registra reposición/orden no explícitos de B4a.
- `test`: 21 pruebas en93.663s,215 fuentes y918 archivos anteriores intactos. Temporales de pruebas en espacio de trabajo. Filtros individuales,opciones,temas secundarios,epígrafes y etiquetas comprobados.
- `build`: PDF de tres y cuatro páginas con espaciado local protegido;ZIP aislado de1232 archivos compilado. Ambos modos L052 y anterior L051 idénticos byte a byte;main texto y tres renderizados coincidentes. Servicio Overleaf no probado.
- `next`: L053,SRC-A5DF0494F1A7;32 candidatos pendientes. Soluciones para después de completar transcripciones.

### 2026-10-28 · feat/review/test/build/docs: L053

- `feat`: ocho enunciados D0053/EXA-0053 enlazados individualmente;424 cotejados y clasificados,cero soluciones. A4 contraste bilateral de media con varianza25 literal;B4 intervalo y cota inclusiva de error. Sin etiquetas nuevas.
- `review`: cuatro páginas fuente,cuatro de borrador y ocho finales cotejadas en pasadas separadas del mismo autor;sin segundo revisor distinto. Examen,criterios y tabla específica sin alias exactos. Matrices fraccionarias,orden de productos,parámetros,región y varianza25 preservados. Separación de filas de B1 corregida antes de finalizar. Sin incidencias nuevas.
- `test`: 21 pruebas en155.750s,215 fuentes y936 archivos anteriores intactos. Temporales de pruebas en espacio de trabajo. Filtros individuales,opciones,temas secundarios,epígrafes y etiquetas comprobados.
- `build`: Dos PDF de cuatro páginas con espaciado local protegido;ZIP aislado de1255 archivos compilado. Ambos modos L053 y anterior L052 idénticos byte a byte;main texto y cuatro renderizados coincidentes. Servicio Overleaf no probado.
- `next`: L054,SRC-45EF64533A19;31 candidatos pendientes. Soluciones para después de completar transcripciones.

### 2026-10-29 · feat/review/test/build/docs: L054

- `feat`: ocho enunciados D0054/EXA-0054 enlazados individualmente;432 cotejados y clasificados,cero soluciones. A2 mixto T02/T01 conservado completo;region-aceptacion añadida para petición expresa de A4.
- `review`: cuatro páginas fuente,cuatro de borrador y ocho finales cotejadas en pasadas separadas del mismo autor;sin segundo revisor distinto. Examen/criterios sin alias exactos;cuatro procedencias de tabla verificadas. Matrices,derivada,transferencia,10.0037cm,ingresos/gastos,capítulos y estratos preservados. INC-020 conserva media sus longitudes literal. Convocatoria,tipo,reserva y modelo vacíos;121y4 sólo del nombre.
- `test`: 21 pruebas en91.502s,215 fuentes y954 archivos anteriores intactos. Temporales de pruebas en espacio de trabajo. Filtros individuales,opciones,temas secundarios,epígrafes y etiquetas comprobados.
- `build`: Dos PDF de cuatro páginas con espaciado local protegido;ZIP aislado de1278 archivos compilado. Ambos modos L054 y anterior L053 idénticos byte a byte;main texto y cuatro renderizados coincidentes. Servicio Overleaf no probado.
- `next`: L055,SRC-471D895044A9;30 candidatos pendientes. Soluciones para después de completar transcripciones.

### 2026-10-29 · feat/review/test/build/docs: L055

- `feat`: ocho enunciados D0055/EXA-0055 enlazados individualmente;440 cotejados y clasificados,cero soluciones. B1 con Nt y etiquetas de café;B2 total impreso sin apartados;B4 con peso total5274g y amplitud máxima3g. Sin etiquetas nuevas.
- `review`: cuatro páginas fuente,cuatro de borrador y ocho finales cotejadas en pasadas separadas del mismo autor;sin segundo revisor distinto. Examen/criterios sin alias exactos;cuatro procedencias de tabla verificadas. Inecuaciones,tres tramos,puntuaciones1.2/0.9/0.4,significación5.5%,matrices y tres derivadas preservados. Separación vertical de A2 mejorada. Convocatoria,tipo,reserva y modelo vacíos;122Ay6 sólo del nombre. Sin incidencias nuevas.
- `test`: 21 pruebas en107.916s,215 fuentes y972 archivos anteriores intactos. Temporales de pruebas en espacio de trabajo. Filtros individuales,opciones,temas secundarios,epígrafes y etiquetas comprobados.
- `build`: Dos PDF de cuatro páginas con espaciado local protegido;ZIP aislado de1301 archivos compilado. Ambos modos L055 y anterior L054 idénticos byte a byte;main texto y cuatro renderizados coincidentes. Servicio Overleaf no probado.
- `next`: L056,SRC-6437A476F758;29 candidatos pendientes. Soluciones para después de completar transcripciones.

### 2026-10-29 · feat/review/test/build/docs: L056

- `feat`: ocho enunciados D0056/EXA-0056 enlazados individualmente;448 cotejados y clasificados,cero soluciones. Matrices de adyacencia,consumo,probabilidad,contraste,producción,ramas racionales,seguros e intervalo de media. Etiqueta matriz-adyacencia añadida.
- `review`: cinco páginas fuente,cuatro de borrador y ocho finales cotejadas en pasadas separadas del mismo autor;sin segundo revisor distinto. Examen/criterios sin alias exactos. Sin tabla acreditada. Homónimo identificado como reedición de EXA-0054 con distinta SHA,sin duplicar ejercicios. Convocatoria,tipo,reserva y modelo vacíos;123y1 sólo del nombre. Sin incidencias nuevas.
- `test`: 21 pruebas en104.514s,215 fuentes y990 archivos anteriores intactos. Filtros individuales,opciones,temas secundarios,epígrafes y etiquetas comprobados.
- `build`: Dos PDF de cuatro páginas;ZIP aislado de1324 archivos compilado. Ambos modos L056 y anterior L055 idénticos byte a byte;main texto y cuatro renderizados coincidentes. Servicio Overleaf no probado.
- `next`: L057,SRC-98312D373CA4;revisar y reclasificar reedición de EXA-0054 sin duplicar ejercicios. 28 candidatos pendientes. Soluciones después de completar transcripciones.

### 2026-10-29 · feat/review/test/build/docs: L057

- `review`: comparación de cuatro páginas originales;los ocho enunciados de SRC-98312D373CA4 coinciden con EXA-0054,con otra maquetación y SHA distinta. Mismo autor,sin segundo revisor distinto. Se conserva INC-020 y no se acreditan metadatos por el nombre.
- `feat`: ocho correspondencias en datos/equivalencias_contenido.csv,selección l057-ids.tex y acceso individual con categorías canónicas. No se crean D0057/EXA-0057 ni ejercicios/soluciones nuevos. Inventario de fuentes intacto;equivalencia semántica separada de duplicado exacto.
- `test/build`: **Verificación L057:** 21 pruebas superadas en88.953s;448 ejercicios únicos,56 exámenes canónicos y215 fuentes válidas. Ocho correspondencias comprobadas;1008 archivos anteriores y todos los CSV preexistentes intactos. ZIP aislado de1328 archivos:ambos modos L054 idénticos byte a byte a los PDF ya revisados;main con texto y cuatro renderizados idénticos a L056. Compilación local,sin nuevos PDF entregables ni soluciones;servicio Overleaf no probado.
- `next`: L058,SRC-C2BAB5B3B438. 57de84 candidatos cerrados,27pendientes;56exámenes canónicos,448ejercicios únicos y cero soluciones.

### 2026-10-29 · feat/review/test/build/docs: L058

- `feat`: ocho enunciados D0058/EXA-0058 enlazados individualmente;456 únicos cotejados y clasificados,cero soluciones. Recinto,dos funciones,alarma,contraste,matrices,trozos,sucesos y media muestral. Sin etiquetas nuevas.
- `review`: cuatro páginas fuente,cuatro de borrador y siete finales cotejadas en pasadas separadas del mismo autor;sin segundo revisor distinto. Examen/criterios/tabla sin alias exactos. Tabla por prefijo y carpeta,sin cita expresa. Literal de alarma0.03 conservado con interpretación pendiente para soluciones. Convocatoria,tipo,reserva y modelo vacíos;221Ay5 sólo del nombre.
- `test/build`: **Verificación L058:** 21 pruebas superadas en90.117s;456 ejercicios válidos y215 huellas originales coincidentes. PDF de3/4páginas,siete páginas finales revisadas y ocho avisos pendientes. Los1008 archivos anteriores intactos:448 enunciados,448 soluciones y112 PDF. Equivalencias de L057 conservadas. ZIP aislado de1351 archivos compilado:ambos modos L058 y anterior L056 idénticos byte a byte;main comprobado por texto y tres renderizados. Compilación local Tectonic con caché;servicio Overleaf no probado. Filtros por identificación,temas,epígrafes y etiquetas comprobados,con recuperación individual de los ocho ID.
- `next`: L059,SRC-DD6B2EA62339;26 candidatos pendientes. Soluciones después de completar transcripciones.

### 2026-10-29 · feat/review/test/build/docs: L059

- `feat`: ocho enunciados D0059/EXA-0059 enlazados individualmente;464 únicos cotejados y clasificados,cero soluciones. Matrices,inversión,dado y moneda,media muestral,dos regiones,tres ramas,bolas con devolución y contraste de proporción. Etiqueta extraccion-con-reposicion añadida.
- `review`: cuatro páginas fuente,cuatro de borrador y ocho finales cotejadas en pasadas separadas del mismo autor;sin segundo revisor distinto. Examen/criterios sin alias exactos;cuatro procedencias de tabla verificadas. Tabla por prefijo y carpeta,sin cita expresa. B1 mantiene las dos regiones independientes y B3 la extracción con devolución. Convocatoria,tipo,reserva y modelo vacíos;222y2 sólo del nombre.
- `test/build`: **Verificación L059:** 21 pruebas superadas en96.374s;464 ejercicios válidos y215 huellas originales coincidentes. PDF de4/4páginas,ocho páginas finales revisadas y ocho avisos pendientes. Los1026 archivos anteriores intactos:456 enunciados,456 soluciones y114 PDF. Equivalencias de L057 conservadas. ZIP aislado de1374 archivos compilado:ambos modos L059 y anterior L058 idénticos byte a byte;main comprobado por texto y cuatro renderizados. Compilación local Tectonic con caché;servicio Overleaf no probado. Filtros por identificación,temas,epígrafes y etiquetas comprobados,con recuperación individual de los ocho ID.
- `next`: L060,SRC-C91521A7BB96;25 candidatos pendientes. Soluciones después de completar transcripciones.

### 2026-10-29 · feat/review/test/build/docs: L060

- `feat`: ocho enunciados D0060/EXA-0060 enlazados individualmente;472 únicos cotejados y clasificados,cero soluciones. Elementos de matriz,beneficio por tramos,aceites,media muestral,recinto,derivada descrita y tangente,garantía y ocho pesos de cachorros. Sin etiquetas nuevas.
- `review`: cuatro páginas fuente,cuatro de borrador y siete finales cotejadas en pasadas separadas del mismo autor;sin segundo revisor distinto. Examen/criterios sin alias exactos;cuatro procedencias de tabla verificadas. Tabla por prefijo y carpeta,sin cita expresa. Convocatoria,tipo,reserva y modelo vacíos;223Ay3 sólo del nombre.
- `test/build`: **Verificación L060:** 21 pruebas superadas en107.297s;472 ejercicios válidos y215 huellas originales coincidentes. PDF de3/4páginas,siete páginas finales revisadas y ocho avisos pendientes. Los1044 archivos anteriores intactos:464 enunciados,464 soluciones y116 PDF. Equivalencias de L057 conservadas. ZIP aislado de1397 archivos compilado:ambos modos L060 y anterior L059 idénticos byte a byte;main comprobado por texto y tres renderizados. Compilación local Tectonic con caché;servicio Overleaf no probado. Filtros individuales,temas secundarios,epígrafes y etiquetas comprobados.
- `next`: L061,SRC-306357537112;24candidatos pendientes. Soluciones después de completar transcripciones.

### 2026-10-29 · feat/review/test/build/docs: L061

- `feat`: ocho enunciados D0061/EXA-0061 enlazados individualmente;480 únicos cotejados y clasificados,cero soluciones. Recinto,cúbica,puntualidad,intervalo de proporción,matrices,tres derivadas,congreso y contraste de producción. Sin etiquetas nuevas.
- `review`: cuatro páginas fuente,cuatro de borrador y siete finales cotejadas en pasadas separadas del mismo autor;sin segundo revisor distinto. Examen/criterios sin alias exactos;doce procedencias de tabla verificadas. Tabla por carpeta,sin cita expresa. Junio sólo por carpeta,no confirmado en cabecera;tipo,reserva y modelo vacíos;5sólo del nombre.
- `test/build`: **Verificación L061:** 21 pruebas superadas en101.463s;480 ejercicios válidos y215 huellas originales coincidentes. PDF de3/4páginas,siete páginas finales revisadas y ocho avisos pendientes. Los1062 archivos anteriores intactos:472 enunciados,472 soluciones y118 PDF. Equivalencias de L057 conservadas. ZIP aislado de1420 archivos compilado:ambos modos L061 y anterior L060 idénticos byte a byte;main comprobado por texto y tres renderizados. Compilación local Tectonic con caché;servicio Overleaf no probado. Filtros individuales,temas secundarios,epígrafes y etiquetas comprobados.
- `next`: L062,SRC-43E638B60B56;23candidatos pendientes. Soluciones después de completar transcripciones.

### 2026-10-29 · feat/review/test/build/docs: L062

- `feat`: ocho enunciados D0062/EXA-0062 enlazados individualmente;488 únicos cotejados y clasificados,cero soluciones. Lotes,tres ramas,aprobados,votantes,semiplanos,depósito,dado y tiempos de reacción. Sin etiquetas nuevas.
- `review`: cuatro páginas fuente,cuatro de borrador y ocho finales cotejadas en pasadas separadas del mismo autor;sin segundo revisor distinto. Examen/criterios sin alias exactos;doce procedencias de tabla verificadas. Tabla por carpeta,sin cita expresa. Junio sólo por carpeta,no confirmado en cabecera;tipo,reserva y modelo vacíos;ra no acredita reserva y4sólo del nombre.
- `test/build`: **Verificación L062:** 21 pruebas superadas en133.546s;488 ejercicios válidos y215 huellas originales coincidentes. PDF de4/4páginas,ocho páginas finales revisadas y ocho avisos pendientes. Los1080 archivos anteriores intactos:480 enunciados,480 soluciones y120 PDF. Equivalencias de L057 conservadas. ZIP aislado de1443 archivos compilado:ambos modos L062 y anterior L061 idénticos byte a byte;main comprobado por texto y cuatro renderizados. Compilación local Tectonic con caché;servicio Overleaf no probado. Filtros individuales,temas secundarios,epígrafes y etiquetas comprobados.
- `next`: L063,SRC-FC436D7335B2;22candidatos pendientes. Soluciones después de completar transcripciones.

### 2026-10-29 · feat/review/test/build/docs: L063

- `feat`: ocho enunciados D0063/EXA-0063 enlazados individualmente;496 únicos cotejados y clasificados,cero soluciones. Marisco,parábola,sucesos,proteína,recinto,derivadas y racional,alarma y sacos. Sin etiquetas nuevas.
- `review`: cuatro páginas fuente,cuatro de borrador y siete finales cotejadas en pasadas separadas del mismo autor;sin segundo revisor distinto. Examen/criterios sin alias exactos;doce procedencias de tabla verificadas. Tabla por carpeta,sin cita expresa. Junio sólo por carpeta,no confirmado en cabecera;tipo,reserva y modelo vacíos;rb no acredita reserva y6sólo del nombre.
- `test/build`: **Verificación L063:** 21 pruebas superadas en172.096s;496 ejercicios válidos y215 huellas originales coincidentes. PDF de3/4páginas,siete páginas finales revisadas y ocho avisos pendientes. Los1098 archivos anteriores intactos:488 enunciados,488 soluciones y122 PDF. Equivalencias de L057 conservadas. ZIP aislado de1466 archivos compilado:ambos modos L063 y anterior L062 idénticos byte a byte;main comprobado por texto y tres renderizados. Compilación local Tectonic con caché;servicio Overleaf no probado. Filtros individuales,temas secundarios,epígrafes y etiquetas comprobados.
- `next`: L064,SRC-1F4AABFD6B04;21candidatos pendientes. Soluciones después de completar transcripciones.

### 2026-10-29 · feat/review/test/build/docs: L064

- `feat`: ocho enunciados D0064/EXA-0064 enlazados individualmente;504 únicos cotejados y clasificados,cero soluciones. Recinto,consultorio,periódicos,contraste de proporción,matrices,trozos,dado y muestreo. INC-021 añadida,sin alterar enunciado. Sin etiquetas nuevas.
- `review`: cuatro páginas fuente,cuatro de borrador y siete finales cotejadas en pasadas separadas del mismo autor;sin segundo revisor distinto. Examen/criterios sin alias exactos;doce procedencias de tabla verificadas. Tabla por carpeta,sin cita expresa. Septiembre sólo por carpeta,no confirmado en cabecera;tipo,reserva y modelo vacíos;3sólo del nombre.
- `test/build`: **Verificación L064:** 21 pruebas superadas en364.667s;504 ejercicios válidos y215 huellas originales coincidentes. PDF de3/4páginas,siete páginas finales revisadas y ocho avisos pendientes. Los1116 archivos anteriores intactos:496 enunciados,496 soluciones y124 PDF. Equivalencias de L057 conservadas. ZIP aislado de1489 archivos compilado:ambos modos L064 y anterior L063 idénticos byte a byte;main comprobado por texto y tres renderizados. Compilación local Tectonic con caché;servicio Overleaf no probado. Filtros individuales,temas secundarios,epígrafes y etiquetas comprobados.
- `next`: L065,SRC-16565937A157;20candidatos pendientes. Soluciones después de completar transcripciones.

### 2026-11-05 · feat/review/test/build/docs: L065

- `feat`: ocho enunciados D0065/EXA-0065 enlazados individualmente;512 únicos cotejados y clasificados,cero soluciones. Recinto,publicidad,fracciones,muestreo,matrices,trozos,camareros y contraste bilateral. INC-022 añadida,sin alterar enunciado. Sin etiquetas nuevas.
- `review`: cuatro páginas fuente,cuatro de borrador y siete finales cotejadas en pasadas separadas del mismo autor;sin segundo revisor distinto. Examen/criterios sin alias exactos;doce procedencias de tabla verificadas. Tabla por carpeta,sin cita expresa. Septiembre sólo por carpeta,no confirmado en cabecera;tipo,reserva y modelo vacíos;1sólo del nombre.
- `test/build`: **Verificación L065:** 21 pruebas superadas en154.542s;512 ejercicios válidos y215 huellas originales coincidentes. PDF de3/4páginas,siete páginas finales revisadas y ocho avisos pendientes. Los1134 archivos anteriores intactos:504 enunciados,504 soluciones y126 PDF. Equivalencias de L057 conservadas. ZIP aislado de1512 archivos compilado:ambos modos L065 y anterior L064 idénticos byte a byte;main comprobado por texto y tres renderizados. Compilación local Tectonic con caché;servicio Overleaf no probado. Filtros individuales,temas secundarios,epígrafes y etiquetas comprobados.
- `next`: L066,SRC-5E3C4915F73D;19candidatos pendientes. Soluciones después de completar transcripciones.

### 2026-11-05 · feat/review/test/build/docs: L066

- `feat`: ocho enunciados D0066/EXA-0066 enlazados individualmente;520 únicos cotejados y clasificados,cero soluciones. Matrices,perfiles de arcos,servidores,intervalo de proporción,recinto,beneficio,deportes y contraste unilateral. Sin incidencias nuevas. Sin etiquetas nuevas.
- `review`: cuatro páginas fuente,cuatro de borrador y ocho finales cotejadas en pasadas separadas del mismo autor;sin segundo revisor distinto. Examen/criterios sin alias exactos;doce procedencias de tabla verificadas. Tabla por carpeta,sin cita expresa. Septiembre sólo por carpeta,no confirmado en cabecera;tipo,reserva y modelo vacíos;2sólo del nombre.
- `test/build`: **Verificación L066:** 21 pruebas superadas en167.626s;520 ejercicios válidos y215 huellas originales coincidentes. PDF de4/4páginas,ocho páginas finales revisadas y ocho avisos pendientes. Los1152 archivos anteriores intactos:512 enunciados,512 soluciones y128 PDF. Equivalencias de L057 conservadas. ZIP aislado de1535 archivos compilado:ambos modos L066 y anterior L065 idénticos byte a byte;main comprobado por texto y cuatro renderizados. Compilación local Tectonic con caché;servicio Overleaf no probado. Filtros individuales,temas secundarios,epígrafes y etiquetas comprobados.
- `next`: L067,SRC-061692157CA6;18candidatos pendientes. Soluciones después de completar transcripciones.

### 2026-11-05 · feat/review/test/build/docs: L067

- `feat`:seis ejercicios originales D0067/EXA-0067;Partes I/II en A3/B3 preservadas y clasificadas también en inferencia.526 únicos,cero soluciones.
- `review`:lectura visual de tres páginas escaneadas y segunda pasada del mismo autor;sin segundo revisor distinto. Curso2008-2009;resto de identificación vacío. Criterios integrados en página3;sin tabla.
- `test/build`:**Verificación L067:** 21 pruebas superadas en 282.435s;526 ejercicios y215 fuentes válidas. Tres páginas fuente y6 páginas finales revisadas;PDF de3/3páginas. Los1170 archivos anteriores intactos:520 enunciados,520 soluciones y130 PDF. ZIP aislado de1554 archivos:ambos modos y lote anterior idénticos byte a byte;main por texto y renderizados. Compilación local Tectonic;servicio Overleaf no probado.
- `next`:L068,SRC-5D54D8A258B8;17candidatos pendientes. Soluciones después de completar transcripciones.

### 2026-11-05 · feat/review/test/build/docs: L068

- `feat`:seis ejercicios originales D0068/EXA-0068;Partes I/II en A3/B3 preservadas y clasificadas también en inferencia.532 únicos,cero soluciones.
- `review`:lectura visual de tres páginas escaneadas y segunda pasada del mismo autor;sin segundo revisor distinto. Curso2008-2009;resto de identificación vacío. Criterios integrados en página3;sin tabla.
- `test/build`:**Verificación L068:** 21 pruebas superadas en 182.837s;532 ejercicios y215 fuentes válidas. Tres páginas fuente y6 páginas finales revisadas;PDF de3/3páginas. Los1184 archivos anteriores intactos:526 enunciados,526 soluciones y132 PDF. ZIP aislado de1573 archivos:ambos modos y lote anterior idénticos byte a byte;main por texto y renderizados. Compilación local Tectonic;servicio Overleaf no probado.
- `next`:L069,SRC-37AA7593D4BE;16candidatos pendientes. Soluciones después de completar transcripciones.

### 2026-11-05 · feat/review/test/build/docs: L069

- `feat`:seis ejercicios originales D0069/EXA-0069;Partes I/II en A3/B3 preservadas y clasificadas también en inferencia.538 únicos,cero soluciones.
- `review`:lectura visual de tres páginas escaneadas y segunda pasada del mismo autor;sin segundo revisor distinto. Curso2008-2009;resto de identificación vacío. Criterios integrados en página3;sin tabla.
- `test/build`:**Verificación L069:** 21 pruebas superadas en 179.773s;538 ejercicios y215 fuentes válidas. Tres páginas fuente y6 páginas finales revisadas;PDF de3/3páginas. Los1198 archivos anteriores intactos:532 enunciados,532 soluciones y134 PDF. ZIP aislado de1592 archivos:ambos modos y lote anterior idénticos byte a byte;main por texto y renderizados. Compilación local Tectonic;servicio Overleaf no probado.
- `next`:L070,SRC-DF64DB539DBD;15candidatos pendientes. Soluciones después de completar transcripciones.

### 2026-11-05 · feat/review/test/build/docs: L070

- `feat`:seis ejercicios originales D0070/EXA-0070;Partes I/II en A3/B3 preservadas y clasificadas también en inferencia.544 únicos,cero soluciones.
- `review`:lectura visual de tres páginas escaneadas y segunda pasada del mismo autor;sin segundo revisor distinto. Curso2008-2009;resto de identificación vacío. Criterios integrados en página3;sin tabla.
- `test/build`:**Verificación L070:** 21 pruebas superadas en 165.101s;544 ejercicios y215 fuentes válidas. Tres páginas fuente y6 páginas finales revisadas;PDF de3/3páginas. Los1212 archivos anteriores intactos:538 enunciados,538 soluciones y136 PDF. ZIP aislado de1611 archivos:ambos modos y lote anterior idénticos byte a byte;main por texto y renderizados. Compilación local Tectonic;servicio Overleaf no probado.
- `next`:L071,SRC-4851FA416EC1;14candidatos pendientes. Soluciones después de completar transcripciones.

### 2026-11-05 · feat/review/test/build/docs: L071

- `feat`:seis ejercicios originales D0071/EXA-0071;Partes I/II en A3/B3 preservadas y clasificadas también en inferencia.550 únicos,cero soluciones.
- `review`:lectura visual de tres páginas escaneadas y segunda pasada del mismo autor;sin segundo revisor distinto. Curso2008-2009;resto de identificación vacío. Criterios integrados en página3;sin tabla.
- `test/build`:**Verificación L071:** 21 pruebas superadas en 180.557s;550 ejercicios y215 fuentes válidas. Tres páginas fuente y6 páginas finales revisadas;PDF de3/3páginas. Los1226 archivos anteriores intactos:544 enunciados,544 soluciones y138 PDF. ZIP aislado de1630 archivos:ambos modos y lote anterior idénticos byte a byte;main por texto y renderizados. Compilación local Tectonic;servicio Overleaf no probado.
- `next`:L072,SRC-3A4F3F974F95;13candidatos pendientes. Soluciones después de completar transcripciones.

### 2026-11-06 · feat/review/test/build/docs: L072

- `feat`:seis ejercicios originales D0072/EXA-0072;Partes I/II en A3/B3 preservadas y clasificadas también en inferencia.556 únicos,cero soluciones.
- `review`:lectura visual de tres páginas escaneadas y segunda pasada del mismo autor;sin segundo revisor distinto. Curso2008-2009;resto de identificación vacío. Criterios integrados en página3;sin tabla.
- `test/build`:**Verificación L072:** 21 pruebas superadas en 131.411s;556 ejercicios y215 fuentes válidas. Tres páginas fuente y6 páginas finales revisadas;PDF de3/3páginas. Los1240 archivos anteriores intactos:550 enunciados,550 soluciones y140 PDF. ZIP aislado de1649 archivos:ambos modos y lote anterior idénticos byte a byte;main por texto y renderizados. Compilación local Tectonic;servicio Overleaf no probado.
- `next`:L073,SRC-4A6808049A76;12candidatos pendientes. Soluciones después de completar transcripciones.

### 2026-11-06 · feat/review/test/build/docs: L073

- `feat`:seis ejercicios originales D0073/EXA-0073;Partes I/II en A3/B3 preservadas y clasificadas también en inferencia.562 únicos,cero soluciones.
- `review`:lectura visual de tres páginas del PDF combinado y segunda pasada del mismo autor;sin segundo revisor distinto. Año2008 sólo por carpeta;curso y resto de identificación vacíos. Criterios integrados en página3;sin tabla.
- `test/build`:**Verificación L073:** 21 pruebas superadas en 249.685s;562 ejercicios y215 fuentes válidas. Tres páginas fuente y6 páginas finales revisadas;PDF de3/3páginas. Los1254 archivos anteriores intactos:556 enunciados,556 soluciones y142 PDF. ZIP aislado de1668 archivos:ambos modos y lote anterior idénticos byte a byte;main por texto y renderizados. Compilación local Tectonic;servicio Overleaf no probado.
- `next`:L074,SRC-F4CC74AC55E7;11candidatos pendientes. Soluciones después de completar transcripciones.

### 2026-11-06 · feat/review/test/build/docs: L074

- `feat`:seis ejercicios originales D0074/EXA-0074;Partes I/II en A3/B3 preservadas y clasificadas también en inferencia.568 únicos,cero soluciones.
- `review`:lectura visual de tres páginas del PDF combinado y segunda pasada del mismo autor;sin segundo revisor distinto. Año2008 sólo por carpeta;curso y resto de identificación vacíos. Criterios integrados en página3;sin tabla.
- `test/build`:**Verificación L074:** 21 pruebas superadas en 148.611s;568 ejercicios y215 fuentes válidas. Tres páginas fuente y6 páginas finales revisadas;PDF de3/3páginas. Los1268 archivos anteriores intactos:562 enunciados,562 soluciones y144 PDF. ZIP aislado de1687 archivos:ambos modos y lote anterior idénticos byte a byte;main por texto y renderizados. Compilación local Tectonic;servicio Overleaf no probado.
- `next`:L075,SRC-D3A4758DB80F;10 candidatos pendientes. Soluciones después de completar transcripciones.

### 2026-11-06 · feat/review/test/build/docs: L075

- `feat`:seis ejercicios originales D0075/EXA-0075;Partes I/II en A3/B3 preservadas y clasificadas también en inferencia.574 únicos,cero soluciones.
- `review`:lectura visual de tres páginas del PDF combinado y segunda pasada del mismo autor;sin segundo revisor distinto. Año2008 sólo por carpeta;curso y resto de identificación vacíos. Criterios integrados en página3;sin tabla.
- `test/build`:**Verificación L075:** 21 pruebas superadas en 174.322s;574 ejercicios y215 fuentes válidas. Tres páginas fuente y6 páginas finales revisadas;PDF de3/3páginas. Los1282 archivos anteriores intactos:568 enunciados,568 soluciones y146 PDF. ZIP aislado de1706 archivos:ambos modos y lote anterior idénticos byte a byte;main por texto y renderizados. Compilación local Tectonic;servicio Overleaf no probado.
- `next`:L076,SRC-B77DF3612646;9 candidatos pendientes. Soluciones después de completar transcripciones.

### 2026-11-06 · feat/review/test/build/docs: L076

- `feat`:seis ejercicios originales D0076/EXA-0076;Partes I/II en A3/B3 preservadas y clasificadas también en inferencia.580 únicos,cero soluciones.
- `review`:lectura visual de tres páginas del PDF combinado y segunda pasada del mismo autor;sin segundo revisor distinto. Año2008 sólo por carpeta;curso y resto de identificación vacíos. Criterios integrados en página3;sin tabla.
- `test/build`:**Verificación L076:** 21 pruebas superadas en 158.081s;580 ejercicios y215 fuentes válidas. Tres páginas fuente y6 páginas finales revisadas;PDF de3/3páginas. Los1296 archivos anteriores intactos:574 enunciados,574 soluciones y148 PDF. ZIP aislado de1725 archivos:ambos modos y lote anterior idénticos byte a byte;main por texto y renderizados. Compilación local Tectonic;servicio Overleaf no probado.
- `next`:L077,SRC-AC589B64F248;8 candidatos pendientes. Soluciones después de completar transcripciones.

### 2026-11-06 · feat/review/test/build/docs: L077

- `feat`:seis ejercicios originales D0077/EXA-0077;Partes I/II en A3/B3 preservadas y clasificadas también en inferencia.586 únicos,cero soluciones.
- `review`:lectura visual de tres páginas del PDF combinado y segunda pasada del mismo autor;sin segundo revisor distinto. Año2008 sólo por carpeta;curso y resto de identificación vacíos. Criterios integrados en página3;sin tabla.
- `test/build`:**Verificación L077:** 21 pruebas superadas en 127.449s;586 ejercicios y215 fuentes válidas. Tres páginas fuente y6 páginas finales revisadas;PDF de3/3páginas. Los1310 archivos anteriores intactos:580 enunciados,580 soluciones y150 PDF. ZIP aislado de1744 archivos:ambos modos y lote anterior idénticos byte a byte;main por texto y renderizados. Compilación local Tectonic;servicio Overleaf no probado.
- `next`:L078,SRC-AA1E8E5E167F;7 candidatos pendientes. Soluciones después de completar transcripciones.

### 2026-11-06 · feat/review/test/build/docs: L078

- `feat`:seis ejercicios originales D0078/EXA-0078;Partes I/II en A3/B3 preservadas y clasificadas también en inferencia.592 únicos,cero soluciones.
- `review`:lectura visual de tres páginas del PDF combinado y segunda pasada del mismo autor;sin segundo revisor distinto. Año2008 sólo por carpeta;curso y resto de identificación vacíos. Criterios integrados en página3;sin tabla.
- `test/build`:**Verificación L078:** 21 pruebas superadas en 133.400s;592 ejercicios y215 fuentes válidas. Tres páginas fuente y6 páginas finales revisadas;PDF de3/3páginas. Los1324 archivos anteriores intactos:586 enunciados,586 soluciones y152 PDF. ZIP aislado de1763 archivos:ambos modos y lote anterior idénticos byte a byte;main por texto y renderizados. Compilación local Tectonic;servicio Overleaf no probado.
- `next`:L079,SRC-CAE51951D43C;6 candidatos pendientes. Próxima tanda en DOC: convertir copia, registrar herramienta y cotejar fórmulas antes de transcribir. Soluciones después de completar transcripciones.

### 2026-11-07 · feat/review/test/build/docs: L079

- `feat`:ocho ejercicios originales D0079/EXA-0079;Curso 2011-2012 confirmado; transcripción desde DOC convertidos y fórmulas cotejadas visualmente.600 únicos,cero soluciones.
- `review`:lectura visual de dos páginas del examen DOC convertido, una de criterios y una de tabla y segunda pasada del mismo autor;sin segundo revisor distinto. Curso 2011-2012 impreso; convocatoria, tipo, reserva y modelo vacíos. Criterios DOC separados y tabla normal asociada por carpeta.
- `test/build`:**Verificación L079:** 21 pruebas superadas en 311.376s;600 ejercicios y215 fuentes válidas. Cuatro páginas fuente y7 páginas finales revisadas;PDF de3/4páginas. Los1338 archivos anteriores intactos:592 enunciados,592 soluciones y154 PDF. ZIP aislado de1787 archivos:ambos modos y lote anterior idénticos byte a byte;main por texto y renderizados. Compilación local Tectonic;servicio Overleaf no probado.
- `next`:L080,SRC-233B0EB573AE;5 candidatos pendientes. Próxima tanda en DOC: convertir copia, registrar herramienta y cotejar fórmulas antes de transcribir. Soluciones después de completar transcripciones.

### 2026-11-07 · feat/review/test/build/docs: L080

- `feat`:ocho ejercicios originales D0080/EXA-0080;Curso 2011-2012 confirmado; transcripción desde DOC convertidos y fórmulas cotejadas visualmente.608 únicos,cero soluciones.
- `review`:lectura visual de dos páginas del examen DOC convertido, una de criterios y una de tabla y segunda pasada del mismo autor;sin segundo revisor distinto. Curso 2011-2012 impreso; convocatoria, tipo, reserva y modelo vacíos. Criterios DOC separados y tabla normal asociada por carpeta.
- `test/build`:**Verificación L080:** 21 pruebas superadas en 261.391s;608 ejercicios y215 fuentes válidas. Cuatro páginas fuente y8 páginas finales revisadas;PDF de4/4páginas. Los1356 archivos anteriores intactos:600 enunciados,600 soluciones y156 PDF. ZIP aislado de1811 archivos:ambos modos y lote anterior idénticos byte a byte;main por texto y renderizados. Compilación local Tectonic;servicio Overleaf no probado.
- `next`:L081,SRC-47DD01146BF2;4 candidatos pendientes. Próxima tanda en DOC: convertir copia, registrar herramienta y cotejar fórmulas antes de transcribir. Soluciones después de completar transcripciones.

### 2026-11-07 · feat/review/test/build/docs: L081

- `feat`:ocho ejercicios originales D0081/EXA-0081;Curso 2011-2012 confirmado; transcripción desde DOC convertidos y fórmulas cotejadas visualmente.616 únicos,cero soluciones.
- `review`:lectura visual de dos páginas del examen DOC convertido, una de criterios y una de tabla y segunda pasada del mismo autor;sin segundo revisor distinto. Curso 2011-2012 impreso; convocatoria, tipo, reserva y modelo vacíos. Criterios DOC separados y tabla normal asociada por carpeta.
- `test/build`:**Verificación L081:** 21 pruebas superadas en 615.284s;616 ejercicios y215 fuentes válidas. Cuatro páginas fuente y7 páginas finales revisadas;PDF de3/4páginas. Los1374 archivos anteriores intactos:608 enunciados,608 soluciones y158 PDF. ZIP aislado de1835 archivos:ambos modos y lote anterior idénticos byte a byte;main por texto y renderizados. Compilación local Tectonic;servicio Overleaf no probado.
- `next`:L082,SRC-D6F4BADE71FA;3 candidatos pendientes. Próxima tanda en DOC: convertir copia, registrar herramienta y cotejar fórmulas antes de transcribir. Soluciones después de completar transcripciones.

### 2026-11-07 · feat/review/test/build/docs: L082

- `feat`:ocho ejercicios originales D0082/EXA-0082;Curso 2011-2012 confirmado; transcripción desde DOC convertidos y fórmulas cotejadas visualmente.624 únicos,cero soluciones.
- `review`:lectura visual de dos páginas del examen DOC convertido, una de criterios y una de tabla y segunda pasada del mismo autor;sin segundo revisor distinto. Curso 2011-2012 impreso; convocatoria, tipo, reserva y modelo vacíos. Criterios DOC separados y tabla normal asociada por carpeta.
- `test/build`:**Verificación L082:** 21 pruebas superadas en 221.537s;624 ejercicios y215 fuentes válidas. Cuatro páginas fuente y7 páginas finales revisadas;PDF de3/4páginas. Los1392 archivos anteriores intactos:616 enunciados,616 soluciones y160 PDF. ZIP aislado de1859 archivos:ambos modos y lote anterior idénticos byte a byte;main por texto y renderizados. Compilación local Tectonic;servicio Overleaf no probado.
- `next`:L083,SRC-BE7FD9AED84C;2 candidatos pendientes. Próxima tanda en DOC: convertir copia, registrar herramienta y cotejar fórmulas antes de transcribir. Soluciones después de completar transcripciones.

### 2026-11-07 · feat/review/test/build/docs: L083

- `feat`:ocho ejercicios originales D0083/EXA-0083;Curso 2011-2012 confirmado; transcripción desde DOC convertidos y fórmulas cotejadas visualmente.632 únicos,cero soluciones.
- `review`:lectura visual de dos páginas del examen DOC convertido, una de criterios y una de tabla y segunda pasada del mismo autor;sin segundo revisor distinto. Curso 2011-2012 impreso; convocatoria, tipo, reserva y modelo vacíos. Criterios DOC separados y tabla normal asociada por carpeta.
- `test/build`:**Verificación L083:** 21 pruebas superadas en 158.372s;632 ejercicios y215 fuentes válidas. Cuatro páginas fuente y8 páginas finales revisadas;PDF de4/4páginas. Los1410 archivos anteriores intactos:624 enunciados,624 soluciones y162 PDF. ZIP aislado de1883 archivos:ambos modos y lote anterior idénticos byte a byte;main por texto y renderizados. Compilación local Tectonic;servicio Overleaf no probado.
- `next`:L084,SRC-0C2E07B0E73E;1 candidato pendiente. Próxima tanda en DOC: convertir copia, registrar herramienta y cotejar fórmulas antes de transcribir. Soluciones después de completar transcripciones.

### 2026-11-07 · feat/review/test/build/docs: L084

- `feat`:ocho ejercicios originales D0084/EXA-0084;Curso 2011-2012 confirmado; transcripción desde DOC convertidos y fórmulas cotejadas visualmente.640 únicos,cero soluciones.
- `review`:lectura visual de dos páginas del examen DOC convertido, una de criterios y una de tabla y segunda pasada del mismo autor;sin segundo revisor distinto. Curso 2011-2012 impreso; convocatoria, tipo, reserva y modelo vacíos. Criterios DOC separados y tabla normal asociada por carpeta.
- `test/build`:**Verificación L084:** 21 pruebas superadas en 507.023s;640 ejercicios y215 fuentes válidas. Cuatro páginas fuente y7 páginas finales revisadas;PDF de3/4páginas. Los1428 archivos anteriores intactos:632 enunciados,632 soluciones y164 PDF. ZIP aislado de1908 archivos:ambos modos y lote anterior idénticos byte a byte;main por texto y renderizados. Compilación local Tectonic;servicio Overleaf no probado.
- `next`:Primera pasada de las84 tandas terminada. Revisar incidencias y preparar tandas de soluciones según docs/FASE_SOLUCIONES.md, sin marcar respuestas pendientes como resueltas.

### 2026-11-07 · feat/review/test/build/docs: S001

Dos soluciones explicadas y validadas (A1/A2, EXA-0001);638 pendientes. Aritmética exacta y comprobaciones separadas, revisión didáctica y cotejo de criterios.22 pruebas; ZIP aislado y dos PDF revisados.640 enunciados intactos. [Informe](docs/soluciones/S001_2019_A1_A2.md). Siguiente S002.

### 2026-11-07 · feat/review/test/build/docs: S002

Seis soluciones explicadas y validadas (A3/A4 y B1-B4, EXA-0001);632 pendientes. Aritmética exacta y comprobaciones separadas, revisión didáctica y cotejo de criterios.22 pruebas; ZIP aislado y dos PDF revisados.640 enunciados intactos. [Informe](docs/soluciones/S002_2019_RESTO_EXAMEN.md). Siguiente S003.

## Soluciones: avance S003

EXA-0002: ocho soluciones nuevas validadas;16 acumuladas y624 pendientes. Enunciados y categorías intactos. Tres pasadas del mismo autor;22 pruebas, PDF y ZIP aislado revisados. [Informe](docs/soluciones/S003_2019_SEPTIEMBRE.md). Siguiente:S004.

### 2026-11-07 · feat/review/test/build/docs: S003

Ocho soluciones de EXA-0002 validadas,16 acumuladas y624 pendientes. Aritmética exacta, cuantiles contrastados y mínimos comprobados en n/n−1. Tres pasadas del mismo autor,22 pruebas, PDF y ZIP aislado revisados.640 enunciados intactos. [Informe](docs/soluciones/S003_2019_SEPTIEMBRE.md). Siguiente S004.

## Soluciones: avance S004

EXA-0003: ocho soluciones nuevas;24 validadas y616 pendientes. Tres pasadas del mismo autor,22 pruebas, PDF revisados y ZIP extraído comprobado. A4b documenta la diferencia entre amplitud y error y el efecto del redondeo prematuro del cuantil. [Informe](docs/soluciones/S004_2019_SUPLENTE_JUNIO.md). Siguiente:S005.

- **2026-11-07** · S004: ocho soluciones de EXA-0003 explicadas y validadas;24 acumuladas y616 pendientes. Tres pasadas del mismo autor,22 pruebas, PDF revisados y ZIP aislado.640 enunciados intactos; sin cambios en implementación web. [Informe](docs/soluciones/S004_2019_SUPLENTE_JUNIO.md). Siguiente S005.

## Soluciones: avance S005

EXA-0004: ocho soluciones nuevas;32 validadas y608 pendientes. Tres pasadas del mismo autor,22 pruebas, PDF revisados y ZIP extraído comprobado. Se justifican el mínimo sobre una región no acotada y los extremos de las funciones a trozos. [Informe](docs/soluciones/S005_2019_SUPLENTE_SEPTIEMBRE.md). Siguiente:S006.

- **2026-11-07** · S005: ocho soluciones de EXA-0004 explicadas y validadas;32 acumuladas y608 pendientes. Tres pasadas del mismo autor,22 pruebas, PDF revisados y ZIP aislado.640 enunciados intactos; sin cambios en implementación web. [Informe](docs/soluciones/S005_2019_SUPLENTE_SEPTIEMBRE.md). Siguiente S006.

## Soluciones: avance S006

EXA-0005: ocho soluciones nuevas;40 validadas y600 pendientes. Tres pasadas del mismo autor,22 pruebas, PDF revisados y ZIP extraído comprobado. Se documenta el mínimo sobre un segmento y la limitación del tamaño muestral deducido de límites redondeados. [Informe](docs/soluciones/S006_2019_RESERVA_A.md). Siguiente:S007.

- **2026-11-07** · S006: ocho soluciones de EXA-0005 explicadas y validadas;40 acumuladas y600 pendientes. Tres pasadas del mismo autor,22 pruebas, PDF revisados y ZIP aislado.640 enunciados intactos; sin cambios en implementación web. [Informe](docs/soluciones/S006_2019_RESERVA_A.md). Siguiente S007.

## Soluciones: avance S007

EXA-0006: ocho soluciones nuevas;48 validadas y592 pendientes. Tres pasadas del mismo autor,22 pruebas, PDF revisados y ZIP extraído comprobado. Se conserva el dato120 de A4 y se revisa INC-006 sin modificar el original ni cerrar automáticamente su estado. [Informe](docs/soluciones/S007_2019_RESERVA_B.md). Siguiente:S008.

- **2026-11-07** · S007: ocho soluciones de EXA-0006 explicadas y validadas;48 acumuladas y592 pendientes. Tres pasadas del mismo autor,22 pruebas, PDF revisados y ZIP aislado.640 enunciados intactos; sin cambios en implementación web. [Informe](docs/soluciones/S007_2019_RESERVA_B.md). Siguiente S008.

## Soluciones: avance S008

EXA-0007: ocho soluciones nuevas;56 validadas y584 pendientes. Tres pasadas del mismo autor,22 pruebas, PDF revisados y ZIP extraído comprobado. Se mantienen los cuatro bloques y la numeración global; gráficas, áreas e insesgadez de la media muestral comprobadas. [Informe](docs/soluciones/S008_2021_ORDINARIA.md). Siguiente:S009.

- **2026-11-07** · S008: ocho soluciones de EXA-0007 explicadas y validadas;56 acumuladas y584 pendientes. Tres pasadas del mismo autor,22 pruebas, PDF revisados y ZIP aislado.640 enunciados intactos; sin cambios en implementación web. [Informe](docs/soluciones/S008_2021_ORDINARIA.md). Siguiente S009.

## Soluciones: avance S009

EXA-0008: ocho soluciones nuevas;64 validadas y576 pendientes. Tres pasadas del mismo autor,22 pruebas, PDF revisados y ZIP extraído comprobado. Se comprueban potencias, mínimo sobre un segmento, áreas y dados; E7 documenta4898 con cuantil preciso y4899 con1.96 tabulado. [Informe](docs/soluciones/S009_2021_ORD_SUPLENTE.md). Siguiente:S010.

- **2026-11-07** · S009: ocho soluciones de EXA-0008 explicadas y validadas;64 acumuladas y576 pendientes. Tres pasadas del mismo autor,22 pruebas, PDF revisados y ZIP aislado.640 enunciados intactos; sin cambios en implementación web. [Informe](docs/soluciones/S009_2021_ORD_SUPLENTE.md). Siguiente S010.

## Soluciones: avance S010

EXA-0009: ocho soluciones nuevas;72 validadas y568 pendientes. Tres pasadas del mismo autor,22 pruebas, PDF revisados y ZIP extraído comprobado. E1a se formula sin resolver; E7b explica ambas convenciones de reemplazamiento; E8 distingue amplitud y error y comprueba el mínimo 71. [Informe](docs/soluciones/S010_2021_ORD_RESERVA.md). Siguiente:S011.

- **2026-11-08** · S010: ocho soluciones de EXA-0009 explicadas y validadas;72 acumuladas y568 pendientes. Tres pasadas del mismo autor,22 pruebas, PDF revisados y ZIP aislado.640 enunciados intactos; sin cambios en implementación web. [Informe](docs/soluciones/S010_2021_ORD_RESERVA.md). Siguiente S011.

## Soluciones: avance S011

EXA-0010: ocho soluciones nuevas;80 validadas y560 pendientes. Tres pasadas del mismo autor,22 pruebas, PDF revisados y ZIP extraído comprobado. E3 distingue integral definida y área; E7 explica 783 con cuantil preciso y 785 con 2.81 tabulado; E8 verifica el mínimo 53. [Informe](docs/soluciones/S011_2021_EXTRAORDINARIA.md). Siguiente:S012.

- **2026-11-08** · S011: ocho soluciones de EXA-0010 explicadas y validadas;80 acumuladas y560 pendientes. Tres pasadas del mismo autor,22 pruebas, PDF revisados y ZIP aislado.640 enunciados intactos; sin cambios en implementación web. [Informe](docs/soluciones/S011_2021_EXTRAORDINARIA.md). Siguiente S012.

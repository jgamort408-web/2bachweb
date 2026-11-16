# AUD003 · Fuentes y metadatos

Fecha 2026-11-12. Revisión del mismo autor de las cinco incidencias generales. Se actualiza su estado a resuelta en datos/incidencias.csv conforme al diccionario de datos, tras cotejar las fuentes y registrar las decisiones en este informe.

## Tareas

- [x] Cotejar las cabeceras visibles de los 35 exámenes canónicos de la carpeta mixta.
- [x] Verificar las doce conversiones DOC, sus manifiestos y las huellas de originales y PDF.
- [x] Comprobar los seis PDF escaneados de 2009 y la separación entre examen y criterios.
- [x] Confirmar la identificación de SRC-9DA5CEBDAB8C mediante la cabecera visible.
- [x] Comprobar los seis PDF combinados de 2008 y su inclusión en el banco.
- [x] Cerrar INC-001 a INC-005 con decisiones documentadas.
- [x] Validar el catálogo y las 215 fuentes y verificar la preservación.
- [x] Actualizar el paquete para Overleaf.

## Decisiones por incidencia

| Incidencia | Evidencia comprobada | Decisión registrada |
|---|---|---|
| INC-001 | La carpeta matematicas_aplicadas contiene 35 exámenes canónicos de seis años, 2015, 2016, 2017, 2018, 2020 y 2021. Las 35 cabeceras visibles coinciden con el curso de cada registro. | El catálogo distingue cada examen y documenta la evidencia del año. Se cierra la revisión de la carpeta mixta. Los límites de convocatoria y modelo continúan en los campos correspondientes. |
| INC-002 | Los doce DOC de examen y criterios de 2012 tienen conversiones registradas en L079 a L084. Coinciden las huellas de los originales y de los doce PDF convertidos. Los seis exámenes tienen dos páginas y los seis criterios una página. Sus cabeceras imprimen 2011-2012. | Se cierra la necesidad de convertir y cotejar copias. La conversión conserva trazabilidad y los originales coinciden con las huellas inventariadas. |
| INC-003 | EXA-0067 a EXA-0072 constan de tres páginas cada uno. Las cabeceras imprimen 2008-2009. Las páginas 1 y 2 son examen y la 3 contiene criterios. Cada documento aporta seis ejercicios. | La separación lógica consta en el catálogo y en los informes L067 a L072. Los 36 ejercicios y la asociación a criterios del mismo archivo están comprobados. |
| INC-004 | SRC-9DA5CEBDAB8C es EXA-0032. La cabecera visible imprime curso 2016-2017 y el catálogo registra año 2017. La extracción inventariada detecta también 2015 y 2016. | Se da prioridad a la imagen de la cabecera, coherente con L032. El número 5 del nombre del archivo no se utiliza como modelo acreditado. |
| INC-005 | EXA-0073 a EXA-0078 son seis PDF combinados de tres páginas. Cada uno aporta seis ejercicios, con enunciados en las páginas 1 y 2 y criterios en la 3. | Se confirma su inclusión como exámenes. Los 36 ejercicios están catalogados. El año 2008 procede de la carpeta y el curso permanece vacío porque no aparece impreso. |

## Conversiones DOC verificadas

| Lote | Tipo | Fuente original | Evidencia de conversión |
|---|---|---|---|
| L079 | examen | SRC-CAE51951D43C | [Manifiesto](../lotes/L079_conversion.json) |
| L079 | criterios | SRC-859F3D429994 | [Manifiesto](../lotes/L079_conversion.json) |
| L080 | examen | SRC-233B0EB573AE | [Manifiesto](../lotes/L080_conversion.json) |
| L080 | criterios | SRC-E63EDEDF9977 | [Manifiesto](../lotes/L080_conversion.json) |
| L081 | examen | SRC-47DD01146BF2 | [Manifiesto](../lotes/L081_conversion.json) |
| L081 | criterios | SRC-3FB62DEC9998 | [Manifiesto](../lotes/L081_conversion.json) |
| L082 | examen | SRC-D6F4BADE71FA | [Manifiesto](../lotes/L082_conversion.json) |
| L082 | criterios | SRC-48F84FDF02E9 | [Manifiesto](../lotes/L082_conversion.json) |
| L083 | examen | SRC-BE7FD9AED84C | [Manifiesto](../lotes/L083_conversion.json) |
| L083 | criterios | SRC-73E02C94A293 | [Manifiesto](../lotes/L083_conversion.json) |
| L084 | examen | SRC-0C2E07B0E73E | [Manifiesto](../lotes/L084_conversion.json) |
| L084 | criterios | SRC-4EBA723D4844 | [Manifiesto](../lotes/L084_conversion.json) |

## Trazabilidad de los documentos combinados

| Grupo | Exámenes | Ejercicios | Páginas de enunciados | Página de criterios |
|---|---|---:|---|---|
| PDF escaneados de 2009 | EXA-0067 a EXA-0072 | 36 | 1 y 2 | 3 |
| PDF combinados de 2008 | EXA-0073 a EXA-0078 | 36 | 1 y 2 | 3 |

La comprobación de trazabilidad enlaza el identificador de fuente del examen con el de sus criterios y verifica que cada ejercicio remite a la página 1 o 2. Se consultaron los informes originales de transcripción y se revisaron las cabeceras de examen y criterios de los doce PDF.

## Balance de incidencias

Después de AUD001, AUD002 y AUD003, las 28 incidencias han recibido revisión documentada. Cinco incidencias operativas generales están resueltas. Las otras 23 conservan estado abierto en el CSV porque describen ambigüedades o rasgos reales de los originales, con su tratamiento en las soluciones y en los informes anteriores.

Esta revisión de fuentes no sustituye la auditoría matemática independiente del banco. La identificación parcialmente confirmada de ciertos exámenes se conserva. La selección por partes y apartados sigue pendiente.

## Continuación

- [ ] SEL-PARTES · Preparar la selección de partes y apartados con sus preguntas comunes y la procedencia completa.
- [ ] SEL-AUD-01 · Auditoría matemática y didáctica independiente.

[Hipótesis de muestreo](AUD001_HIPOTESIS_MUESTREO.md) · [Incidencias editoriales](AUD002_INCIDENCIAS_EDITORIALES.md) · [Paquete para Overleaf](../../dist/Selectividad_Overleaf.zip).

`audit/data` · Validación del catálogo y las 215 fuentes superada. Los 640 enunciados, las 640 soluciones y los demás CSV mantienen sus huellas. En incidencias.csv solo cambian los cinco estados cotejados. Las referencias del informe se comprobaron antes de actualizar el ZIP.

# Inventario de fuentes de Selectividad

Inventario reproducible de solo lectura. Fecha de incorporación: 2026-10-22.

## Alcance y rutas

La fuente es la carpeta `Selectividad/`, hermana de este proyecto. Las rutas del CSV son relativas a la raíz del espacio de trabajo y empiezan por `Selectividad/`. El recorrido no incluye `Selectividad_LaTeX/`, por lo que no incorpora archivos generados.

Los identificadores `SRC-…` derivan de la ruta UTF-8, no del orden del listado. La huella SHA-256 identifica el contenido y permite detectar copias exactas. Renombrar o mover un original cambia su identificador; los identificadores ya usados deben conservarse mediante una migración explícita.

## Resumen

- Archivos: **215**; PDF: **203**; DOC heredados: **12**.
- Páginas PDF inventariadas: **300**. No se ha calculado el número de páginas de los DOC.
- Contenidos únicos por SHA-256: **163**; copias adicionales: **52**; grupos con copias: **19**.
- Tipo indicado o inferido por nombre: examen **74**, criterios **82**, tabla **49**, otro **10**.
- Clasificación que requiere cotejo: **24** archivos. No equivale a un recuento definitivo de exámenes o ejercicios.
- Ningún año está confirmado visualmente en esta fase: `anio_confirmado` permanece vacío.

## Año explícito en la ruta

| Año indicado | Archivos |
| --- | ---: |
| 2008 | 6 |
| 2009 | 6 |
| 2010 | 18 |
| 2011 | 18 |
| 2012 | 18 |
| 2013 | 18 |
| 2014 | 14 |
| 2015 | 14 |
| 2019 | 18 |
| 2021 | 10 |
| sin año en ruta | 75 |

`anio_ruta` conserva únicamente años literales presentes en carpetas o nombres. `anios_detectados_texto` contiene candidatos extraídos automáticamente de todas las páginas; puede incluir fechas de enunciados o referencias ajenas al año de convocatoria. No sustituye a `anio_confirmado` ni debe incorporarse al ID del ejercicio sin revisar la cabecera.

## Duplicados exactos

Se conservan todos los originales. `grupo_duplicado` reúne contenidos idénticos y `duplicado_de` apunta a la primera ruta ordenada del grupo. Es una referencia técnica, no una decisión editorial. Las copias de tablas normales son especialmente frecuentes; un PDF duplicado no implica que distintos modelos sean equivalentes.

## Límites de lectura y anomalías

- La extracción de texto sirve para localizar material. No acredita la fidelidad de fórmulas, subíndices, signos, matrices, gráficos ni la disposición de opciones.
- Los 12 DOC de 2012 son binarios heredados. Se revisarán con una conversión de copia en un lote específico, conservando el original y verificando cada página. No se interpreta que su ausencia de páginas en el CSV signifique cero páginas.
- Nombres como `P_A` y `C_A` se interpretan provisionalmente como prueba y criterios; deben contrastarse. Los PDF genéricos de 2009 y otros nombres opacos permanecen como `otro`.
- Las letras A/B que figuran en el nombre de un PDF pueden ser opciones dentro del mismo examen. No se asignan automáticamente como modelo o convocatoria.

### Archivos con extracción incompleta o error

- `SRC-287178787163` — `Selectividad/matematicas_aplicadas/reserva a/Tabla N(0,1).pdf`: texto_parcial_o_escaneado. 1/1 páginas sin texto extraíble; requieren inspección visual/OCR.
- `SRC-8C684DC99C5D` — `Selectividad/matematicas_aplicadas/reserva b/Tabla N(0,1).pdf`: texto_parcial_o_escaneado. 1/1 páginas sin texto extraíble; requieren inspección visual/OCR.
- `SRC-03976ECEE4F8` — `Selectividad/matematicas_aplicadas/suplente junio/Tabla N(0,1).pdf`: texto_parcial_o_escaneado. 1/1 páginas sin texto extraíble; requieren inspección visual/OCR.
- `SRC-DF745539FC83` — `Selectividad/matematicas_aplicadas/suplente septiembre/Tabla N(0,1).pdf`: texto_parcial_o_escaneado. 1/1 páginas sin texto extraíble; requieren inspección visual/OCR.
- `SRC-8D7BA7F1460E` — `Selectividad/matematicas_aplicadas/titular junio TABLA.pdf`: texto_parcial_o_escaneado. 1/1 páginas sin texto extraíble; requieren inspección visual/OCR.
- `SRC-3CAA534C5EE0` — `Selectividad/matematicas_aplicadas/titular septiembre TABLA.pdf`: texto_parcial_o_escaneado. 1/1 páginas sin texto extraíble; requieren inspección visual/OCR.
- `SRC-7CE2805F3B2B` — `Selectividad/matematicas_aplicadas/titular_junio/Tabla N(0,1).pdf`: texto_parcial_o_escaneado. 1/1 páginas sin texto extraíble; requieren inspección visual/OCR.
- `SRC-04DF2AC15E55` — `Selectividad/matematicas_aplicadas/titular_junio_TABLA/TABLA.pdf`: texto_parcial_o_escaneado. 1/1 páginas sin texto extraíble; requieren inspección visual/OCR.
- `SRC-91337370C760` — `Selectividad/matematicas_aplicadas/titular_septiembre/Tabla N(0,1).pdf`: texto_parcial_o_escaneado. 1/1 páginas sin texto extraíble; requieren inspección visual/OCR.
- `SRC-8FB6F2CCF602` — `Selectividad/matematicas_aplicadas/titular_septiembre_TABLA/TABLA.pdf`: texto_parcial_o_escaneado. 1/1 páginas sin texto extraíble; requieren inspección visual/OCR.
- `SRC-061692157CA6` — `Selectividad/sel_2009_matematicas_aplicadas/mat apli CC SS01.pdf`: texto_parcial_o_escaneado. El nombre no identifica inequívocamente el tipo; puede contener examen y criterios juntos. 3/3 páginas sin texto extraíble; requieren inspección visual/OCR.
- `SRC-5D54D8A258B8` — `Selectividad/sel_2009_matematicas_aplicadas/mat apli CC SS02.pdf`: texto_parcial_o_escaneado. El nombre no identifica inequívocamente el tipo; puede contener examen y criterios juntos. 3/3 páginas sin texto extraíble; requieren inspección visual/OCR.
- `SRC-37AA7593D4BE` — `Selectividad/sel_2009_matematicas_aplicadas/mat apli CC SS03.pdf`: texto_parcial_o_escaneado. El nombre no identifica inequívocamente el tipo; puede contener examen y criterios juntos. 3/3 páginas sin texto extraíble; requieren inspección visual/OCR.
- `SRC-DF64DB539DBD` — `Selectividad/sel_2009_matematicas_aplicadas/mat apli CC SS04.pdf`: texto_parcial_o_escaneado. El nombre no identifica inequívocamente el tipo; puede contener examen y criterios juntos. 3/3 páginas sin texto extraíble; requieren inspección visual/OCR.
- `SRC-4851FA416EC1` — `Selectividad/sel_2009_matematicas_aplicadas/mat apli CC SS05.pdf`: texto_parcial_o_escaneado. El nombre no identifica inequívocamente el tipo; puede contener examen y criterios juntos. 3/3 páginas sin texto extraíble; requieren inspección visual/OCR.
- `SRC-3A4F3F974F95` — `Selectividad/sel_2009_matematicas_aplicadas/mat apli CC SS06.pdf`: texto_parcial_o_escaneado. El nombre no identifica inequívocamente el tipo; puede contener examen y criterios juntos. 3/3 páginas sin texto extraíble; requieren inspección visual/OCR.
- `SRC-0DF80B854632` — `Selectividad/sel_2011_matematicas_aplicadas/121-MATEMATICAS APLICADAS TABLA.pdf`: texto_parcial_o_escaneado. 1/1 páginas sin texto extraíble; requieren inspección visual/OCR.
- `SRC-CEDD41219D14` — `Selectividad/sel_2011_matematicas_aplicadas/122A-MATEMATICAS APLICADAS TABLA.pdf`: texto_parcial_o_escaneado. 1/1 páginas sin texto extraíble; requieren inspección visual/OCR.
- `SRC-14FD48C969EF` — `Selectividad/sel_2011_matematicas_aplicadas/221A-MATEMATICAS APLICADAS TABLA.pdf`: texto_parcial_o_escaneado. 1/1 páginas sin texto extraíble; requieren inspección visual/OCR.
- `SRC-03816314756C` — `Selectividad/sel_2011_matematicas_aplicadas/222-MATEMATICAS APLICADAS TABLA.pdf`: texto_parcial_o_escaneado. 1/1 páginas sin texto extraíble; requieren inspección visual/OCR.
- `SRC-4179B55D1E96` — `Selectividad/sel_2011_matematicas_aplicadas/223A-MATEMATICAS APLICADAS TABLA.pdf`: texto_parcial_o_escaneado. 1/1 páginas sin texto extraíble; requieren inspección visual/OCR.
- `SRC-5773393B0621` — `Selectividad/sel_2013_matematicas_aplicadas/junio/reserva a/TABLA/tabla distribucion.pdf`: texto_parcial_o_escaneado. 1/1 páginas sin texto extraíble; requieren inspección visual/OCR.
- `SRC-8304DD8AE43B` — `Selectividad/sel_2013_matematicas_aplicadas/junio/reserva b/TABLA/tabla distribucion.pdf`: texto_parcial_o_escaneado. 1/1 páginas sin texto extraíble; requieren inspección visual/OCR.
- `SRC-D2928B91F5AA` — `Selectividad/sel_2013_matematicas_aplicadas/junio/titular/TABLA/tabla distribucion.pdf`: texto_parcial_o_escaneado. 1/1 páginas sin texto extraíble; requieren inspección visual/OCR.
- `SRC-8312DBB75351` — `Selectividad/sel_2013_matematicas_aplicadas/septiembre/reserva a/TABLA/tabla distribucion.pdf`: texto_parcial_o_escaneado. 1/1 páginas sin texto extraíble; requieren inspección visual/OCR.
- `SRC-C8FC9A3149DF` — `Selectividad/sel_2013_matematicas_aplicadas/septiembre/reserva b/TABLA/tabla distribucion.pdf`: texto_parcial_o_escaneado. 1/1 páginas sin texto extraíble; requieren inspección visual/OCR.
- `SRC-B65557E07CB9` — `Selectividad/sel_2013_matematicas_aplicadas/septiembre/titular/TABLA/Tabla distribucion.pdf`: texto_parcial_o_escaneado. 1/1 páginas sin texto extraíble; requieren inspección visual/OCR.
- `SRC-C07FCF220338` — `Selectividad/sel_2014_matematicas_aplicadas/Tabla_Matematicas_CCSS_JUN.pdf`: texto_parcial_o_escaneado. 1/1 páginas sin texto extraíble; requieren inspección visual/OCR.
- `SRC-055710E921E5` — `Selectividad/sel_2014_matematicas_aplicadas/Tabla_Matematicas_CCSS_SEPT.pdf`: texto_parcial_o_escaneado. 1/1 páginas sin texto extraíble; requieren inspección visual/OCR.
- `SRC-583F2A0E44AB` — `Selectividad/sel_2015_matematicas_aplicadas/matematicas_aplicadas/titular junio TABLA.pdf`: texto_parcial_o_escaneado. 1/1 páginas sin texto extraíble; requieren inspección visual/OCR.
- `SRC-6B81A939FEE2` — `Selectividad/sel_2015_matematicas_aplicadas/matematicas_aplicadas/titular septiembre TABLA.pdf`: texto_parcial_o_escaneado. 1/1 páginas sin texto extraíble; requieren inspección visual/OCR.

## Primer lote recomendado

Empezar por los seis PDF de examen de `sel_2019_matematicas_aplicadas/`, con sus seis criterios separados y sus tablas. La estructura titular/suplente/reserva facilita el cotejo. Confirmar primero año, convocatoria, modelo, opciones y numeración sobre cada cabecera; después transcribir e indexar un ejercicio completo por registro, sin resolverlo.

Los criterios se vinculan como fuente auxiliar, sin transcribir ahora sus respuestas. La existencia de criterios no convierte una solución vacía en solución revisada.

| Fuente | Tipo | Ruta |
| --- | --- | --- |
| `SRC-AA763712E273` | examen | `Selectividad/sel_2019_matematicas_aplicadas/Reserva A/Exámenes Mat Aplicadas CCSS - A y B.pdf` |
| `SRC-E116D384391D` | criterios | `Selectividad/sel_2019_matematicas_aplicadas/Reserva A/Matemáticas Aplicadas CCSS - Criterios de corrección.pdf` |
| `SRC-2A3EF72FCF2C` | examen | `Selectividad/sel_2019_matematicas_aplicadas/Reserva B/Exámenes Matemáticas Aplicadas CCSS - A y B.pdf` |
| `SRC-B2846E8FFA68` | criterios | `Selectividad/sel_2019_matematicas_aplicadas/Reserva B/Matemáticas Aplicadas CCSS - Criterios Corrección.pdf` |
| `SRC-2428AFE65CF4` | examen | `Selectividad/sel_2019_matematicas_aplicadas/Suplente Junio/Exámenes Matemáticas Aplicadas CCSS - A y B.pdf` |
| `SRC-2707C9F56364` | criterios | `Selectividad/sel_2019_matematicas_aplicadas/Suplente Junio/Matemáticas Aplicadas CCSS - Criterios de corrección.pdf` |
| `SRC-D8602844841D` | examen | `Selectividad/sel_2019_matematicas_aplicadas/Suplente Septiembre/Exámenes Matemáticas Aplicadas CCSS - A y B.pdf` |
| `SRC-0FBD39CA5B30` | criterios | `Selectividad/sel_2019_matematicas_aplicadas/Suplente Septiembre/Matemáticas Aplicadas CCSS - Criterios de Corrección.pdf` |
| `SRC-350C1197B6C0` | examen | `Selectividad/sel_2019_matematicas_aplicadas/Titular Junio/Exámenes Mat Apli CCSS A y B.pdf` |
| `SRC-65137A02DDEC` | criterios | `Selectividad/sel_2019_matematicas_aplicadas/Titular Junio/Mat Apli CCSS Criterios de corrección A y B.pdf` |
| `SRC-F06C106EBDD7` | examen | `Selectividad/sel_2019_matematicas_aplicadas/Titular Septiembre/Exámenes Mat Apl CCSS II - A y B.pdf` |
| `SRC-7894EA3B08E4` | criterios | `Selectividad/sel_2019_matematicas_aplicadas/Titular Septiembre/Mat Apl CCSS II - Criterios de corrección A y B.pdf` |

## Regeneración y controles

Ejecutar `python Selectividad_LaTeX/scripts/inventariar_fuentes.py` con `pypdf` disponible. Solo se reescriben este informe y `datos/fuentes.csv`. La generación es determinista para los mismos archivos y la misma versión de extracción.

Antes de una regeneración, conservar las confirmaciones humanas: este inventario automático deja `anio_confirmado` vacío deliberadamente. Las confirmaciones y el índice de ejercicios deben mantenerse en sus registros editoriales; no corregir silenciosamente una ruta original.

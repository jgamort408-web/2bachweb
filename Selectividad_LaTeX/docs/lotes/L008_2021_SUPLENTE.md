# L008: archivo ORD_SUPLENTE, curso 2020-2021

Fecha: 2026-10-22. **Cerrado: transcripción, cotejo, clasificación y controles técnicos.** Documento `D0008`, examen `EXA-0008`.

## Plan de la tanda

- [x] Revisar las dos páginas del examen y los criterios específicos.
- [x] Confirmar curso, bloques y numeración; distinguir datos impresos de nombres de archivo.
- [x] Transcribir los ocho ejercicios completos e indexarlos por temas, epígrafes y etiquetas.
- [x] Crear ocho archivos de solución de sólo comentarios, sin respuestas.
- [x] Cotejar íntegramente en una segunda pasada del mismo autor y revisar el borrador compilado.
- [x] Verificar clasificación y promover los estados editoriales.
- [x] Compilar las dos salidas finales y revisar todas sus páginas.
- [x] Validar catálogo, huellas originales y preservación de las entregas anteriores; ejecutar pruebas.
- [x] Extraer y compilar el ZIP de forma independiente.
- [x] Cerrar informe, cola, plan y diario; mantener inactiva la fase de soluciones.

## Fuente y límites de identificación

Fuente `SRC-BA1C2B38E5F9`: `Selectividad/matematicas_aplicadas/ORD_SUPLENTE_Modelo-4-Enunciados (Mat-Ap-2021).pdf`.
SHA-256: `74b067b81be20aa0262a0cc58795f3b25488aa9c749d825b7b33f656dd1ae089`.

Las dos cabeceras imprimen **CURSO 2020-2021**, asignatura y ámbito Andalucía, Ceuta, Melilla y centros en Marruecos. No imprimen convocatoria, tipo suplente ni número de modelo. `anio=2021` corresponde al año final del curso. `convocatoria=ordinaria` y `tipo_examen=suplente` proceden únicamente de `ORD_SUPLENTE` en el nombre; quedan documentados como identificación parcial, con `requiere_revision=si`. `modelo` y `modelo_literal` quedan vacíos: «Modelo-4» no se acredita como número impreso.

Auxiliares: criterios `SRC-59B82B1A07BD` (una página, curso, bloques, numeración y puntos concordantes); tabla normal `SRC-3D28D3FA9127` (genérica, sin fecha propia, asociada sólo por nombre y huella). No se copian soluciones de los criterios.

## Condiciones que se deben preservar

Ocho ejercicios en bloques A-D, con numeración global 1-8; opción vacía. Se eligen cuatro de al menos tres bloques y se corrigen los cuatro primeros que cumplen la regla. Los ocho totales 2.5 se obtienen por suma de apartados, no se añaden como totales impresos.

- A1: matriz con -1 abajo a la izquierda; exponentes 40 y 30, traspuesta t minúscula, orden de productos intacto.
- A2: cuatro desigualdades originales y punto (5,7); no añadir restricciones de no negatividad.
- B3: tres ramas, inclusiones de extremos y área entre x=0 y x=3; no añadir una petición de primitiva.
- B4: costes y producción expresados en miles; tangente en x=4.
- C5: plantillas 1000/600/400, mujeres 42/20/50 por ciento; condicionamiento a hombre en b.
- C6: dos dados, suma mayor o igual a 9 para urna A; colores, cantidades y condicionamiento sin intercambios.
- D7: muestra 1000, proporción 15 %, confianza 95 %, error inferior al 1 %; conservar la coma tras 95 %.
- D8: varianza 256 g², muestra 64 y suma de pesos 63744 g; apartado a sobre media muestral, confianza 90 % y pregunta de interpretación sin resolver.

## Progreso

`L008 · plan/read` — Fuentes revisadas visualmente y huellas de 56 enunciados, 56 soluciones y 14 PDF anteriores guardadas. Fase de soluciones inactiva. Sin commit de Git.

`L008 · feat/review` — Ocho enunciados cotejados en una segunda pasada visual completa del mismo autor, con las cinco páginas del borrador revisadas. Ocho clasificaciones verificadas; 64 ejercicios acumulados. B3 permanece multitema (continuidad, representación y área); B4 incluye optimización y tangente; D8 incluye distribución de la media e interpretación de intervalo, sin etiquetarlo como contraste solicitado ni cálculo de tamaño de muestra. Ninguna solución redactada.

## Indexación comprobada

| ID | Tema principal | Secundarios | Apartados y puntos |
|---|---|---|---|
| [SEL-D0008-BA-E01](../../enunciados/SEL-D0008-BA-E01.tex) | T04 | — | a:0.7; b:0.6; c:1.2 |
| [SEL-D0008-BA-E02](../../enunciados/SEL-D0008-BA-E02.tex) | T06 | — | a:1.5; b:0.25; c:0.75 |
| [SEL-D0008-BB-E03](../../enunciados/SEL-D0008-BB-E03.tex) | T01 | T02, T03 | a:1; b:0.8; c:0.7 |
| [SEL-D0008-BB-E04](../../enunciados/SEL-D0008-BB-E04.tex) | T02 | T01 | a:1; b:1.5 |
| [SEL-D0008-BC-E05](../../enunciados/SEL-D0008-BC-E05.tex) | T07 | — | a:1.5; b:1 |
| [SEL-D0008-BC-E06](../../enunciados/SEL-D0008-BC-E06.tex) | T07 | — | a:1.5; b:1 |
| [SEL-D0008-BD-E07](../../enunciados/SEL-D0008-BD-E07.tex) | T09 | — | a:1.5; b:1 |
| [SEL-D0008-BD-E08](../../enunciados/SEL-D0008-BD-E08.tex) | T09 | T08 | a:0.75; b:1.5; c:0.25 |

El lote cubre ocho temas contando secundarios, sin asignar T05 artificialmente. B3 se vincula principalmente a continuidad y derivabilidad, y también a representación y áreas; B4 a optimización de costes y representación, con tangente como contenido secundario. D8 trata distribución normal y de la media, intervalo para la media e interpretación solicitada; no se añade un contraste de hipótesis ni una respuesta a la denuncia.

Epígrafes y tags íntegros:

| ID | Epígrafes | Tags |
|---|---|---|
| SEL-D0008-BA-E01 | T04.2, T04.3, T04.4, T04.9, T04.11 | potencia-matriz, matriz-traspuesta, matriz-inversa, ecuacion-matricial, producto-matrices |
| SEL-D0008-BA-E02 | T06.1, T06.2, T06.3, T06.4, T06.5 | programacion-lineal, restricciones, region-factible, vertices, viabilidad-punto, funcion-objetivo, maximo-minimo |
| SEL-D0008-BB-E03 | T01.10, T01.11, T01.12, T01.17, T02.1, T02.3, T02.6, T03.5, T03.7, T03.8 | continuidad, derivabilidad, funcion-a-trozos, representacion-grafica, integral-definida, area-recinto |
| SEL-D0008-BB-E04 | T02.2, T02.9, T01.13, T01.15 | funcion-polinomica, optimizacion, minimo-coste, recta-tangente, representacion-grafica |
| SEL-D0008-BC-E05 | T07.6, T07.8, T07.9, T07.10 | probabilidad-total, bayes, probabilidad-condicionada, complementario |
| SEL-D0008-BC-E06 | T07.1, T07.2, T07.7, T07.8, T07.9 | experimento-compuesto, probabilidad-total, probabilidad-condicionada, interseccion-sucesos |
| SEL-D0008-BD-E07 | T09.7, T09.8 | intervalo-confianza-proporcion, tamano-muestral, error-estimacion, cota-estricta |
| SEL-D0008-BD-E08 | T08.3, T09.4, T09.5, T09.7 | distribucion-normal, varianza-conocida, media-muestral, intervalo-confianza-media, interpretacion-intervalo |

La etiqueta nueva `interpretacion-intervalo` describe la pregunta sin responderla. `viabilidad-punto` amplía su descripción a pertenencia de un punto frente a restricciones, válida también para ejercicios anteriores. Las gráficas se piden al estudiante; no se dibujan ahora como soluciones. Se adapta la composición tipográfica, sin cambiar texto, hipótesis, cifras ni puntuaciones. Las aperturas de interrogación usan `\textquestiondown{}` para evitar una sustitución de glifo en el compilador local.

Los criterios concuerdan en numeración y puntos. En B3c su rúbrica usa «integral indefinida» para puntuar el área; no se transfiere esa expresión a la pregunta, que sólo solicita el área. No hay discrepancias pendientes de lectura del enunciado. La identificación parcial por nombres permanece abierta y no se confunde con los estados `cotejada` y `verificada` del contenido.

## Verificación y entrega

**Verificación L008:** 17 pruebas superadas, 64 ejercicios válidos y 215 huellas originales coincidentes. Las dos salidas tienen cuatro páginas cada una; las ocho páginas finales están revisadas. Los 56 enunciados, 56 soluciones y catorce PDF anteriores conservan sus huellas. ZIP extraído y compilado en carpeta independiente: ambas salidas y el PDF anterior de L007 se reproducen byte a byte. Son pruebas locales con Tectonic, no ejecución del servicio Overleaf.

El borrador de cinco páginas se revisó antes de promover estados. Las salidas finales no tienen avisos de borrador, desbordamientos, caracteres ausentes, referencias indefinidas ni errores de LaTeX detectados. La salida de preguntas no incluye avisos de solución; el modo combinado tiene ocho avisos de solución pendiente, sin respuestas. Las 64 reservas de solución contienen únicamente comentarios. [Control, filtros y huellas](L008_control.json).

Actualmente el generador sin filtros selecciona 64 ejercicios: `--anio 2019` recupera 48 y `--anio 2021`, 16. `--tema T06` recupera ocho; `--tema T03`, siete; `--tema T09 --tag tamano-muestral`, quince, incluido D7 de muestreo de L007, que no es un intervalo de confianza. Los filtros buscan temas principales y secundarios. Para L008, `--examen EXA-0008 --bloque D` devuelve E07 y E08; `--opcion A` no devuelve ejercicios de este examen. D8 de L008 tiene tamaño dado, no solicita calcularlo, y no lleva esa etiqueta.

| Entrega | Archivo |
|---|---|
| Preguntas | [PDF de enunciados](../../output/pdf/l008-suplente-2021-enunciados.pdf) |
| Combinado pendiente | [PDF con avisos de soluciones pendientes](../../output/pdf/l008-suplente-2021-con-soluciones-pendientes.pdf) |
| Entradas | [l008-enunciados.tex](../../l008-enunciados.tex) y [l008-con-soluciones.tex](../../l008-con-soluciones.tex) |
| Selección editorial | [l008-suplente-2021.tex](../../selecciones/l008-suplente-2021.tex) |
| Contexto original | [Instrucciones EXA-0008](../../recursos/comunes/EXA-0008-instrucciones.tex) |
| Catálogo | [ejercicios.csv](../../datos/ejercicios.csv) y [examenes.csv](../../datos/examenes.csv) |
| Proyecto | [ZIP para Overleaf](../../dist/Selectividad_Overleaf.zip) |

## Cierre y siguiente tanda

Ocho de 84 candidatos cerrados; quedan 76. Fase de soluciones inactiva. Registro sin commit de Git.

**Siguiente: L009**, fuente candidata `SRC-83FBE1FE77CE`, archivo `Selectividad/matematicas_aplicadas/ORD_RESER_Modelo-3-Enunciados (Mat-Ap-2021).pdf`. Confirmar curso, convocatoria, tipo, modelo y estructura sobre la fuente visible; el nombre no basta para acreditarlos. Véase la [cola](../LOTES_DE_TRANSCRIPCION.md).

La entrada principal `main.tex` del ZIP aislado también compila con L008: texto idéntico y las cuatro páginas renderizadas coinciden con las del PDF de enunciados.

# L010: convocatoria extraordinaria, curso 2020-2021

Fecha: 2026-10-22. **Cerrado: transcripción, cotejo, clasificación y controles técnicos.** Documento `D0010`, examen `EXA-0010`.

## Plan de la tanda

- [x] Revisar las tres páginas del original y la página de criterios específicos.
- [x] Confirmar convocatoria, curso, bloques, numeración y límites de identificación.
- [x] Transcribir e indexar los ocho ejercicios completos, con todos sus apartados.
- [x] Crear ocho archivos de solución de sólo comentarios, sin respuestas.
- [x] Cotejar en una segunda pasada visual completa del mismo autor y revisar el borrador compilado.
- [x] Verificar clasificación y promover los estados editoriales.
- [x] Compilar y revisar todas las páginas de las dos salidas finales.
- [x] Validar catálogo, huellas originales y preservación; ejecutar pruebas.
- [x] Extraer y compilar el ZIP por separado, incluida la entrada principal.
- [x] Cerrar informe, plan, cola y diario; mantener inactiva la fase de soluciones.

## Fuente y límites de identificación

Fuente `SRC-CC4942CDBF40`: `Selectividad/matematicas_aplicadas/EXTRA_TITULAR_MAT-APLIC-CCSS-JULIO-IMPRESO.pdf`.
SHA-256: `548f60ee334516c7fa918dba3c28fb3ea5fe753cf76eb05402d7b8acb5a3b560`.

Las cabeceras de las páginas 1 y 2 imprimen **CONVOCATORIA EXTRAORDINARIA, CURSO 2020-2021**, asignatura y ámbito Andalucía, Ceuta, Melilla y centros en Marruecos. `anio=2021` es el año final del curso. Extraordinaria queda confirmada; tipo titular y julio sólo proceden del nombre del archivo. Modelo no impreso: `modelo` y `modelo_literal` vacíos, aunque el auxiliar de criterios se llame «Modelo-5». Se mantiene identificación parcialmente confirmada y `requiere_revision=si` por esos límites.

Criterios `SRC-24D2A513C464`, SHA-256 `717ca4e0ba6deddc0be1fa9ec01b252b3192f172adc0415d5496826acc6cf540`: una página, curso 2020-2021 y repartos concordantes. No confirma modelo por su nombre ni añade respuestas.

La página 3 del propio examen es la **tabla de distribución normal N(0,1)**, no otro ejercicio. Se revisa como auxiliar y se conserva en el original. También está inventariada la tabla externa `SRC-32F4C8A72FBC`, SHA-256 `de76d5eb0757f550daebc744e12ee71e44445571ec9b4906cba1ebc22a5ddc78`, genérica y sin año propio. No se transforma esa tercera página en una pregunta ni se transcribe la tabla como solución. Las salidas del banco reúnen los ocho enunciados; las rutas del original y la tabla quedan en el catálogo.

## Condiciones sensibles para el cotejo

- A1: A=(2,1,0;1,0,2;0,2,a); a se fija en 1 para b/c; AX=B^t y B=(0,1,−1), con traspuesta t minúscula y productos sin permutar.
- A2: 5x−4y≤−19, 3x−4y≤−13, x≥−7, −x−y≥2. G=−x/5+5y/2; c pregunta si alcanza 47/3. No añadir no negatividad ni dar una respuesta.
- B3: primera rama **2^(x+1)** para x<0, segunda x²−2x para x≥0; continuidad, derivabilidad, monotonía y mínimo; c pide la **integral definida de −2 a 2**, sin petición de área. La rúbrica auxiliar dice integral indefinida/área: no sustituir la pregunta original por esas palabras.
- B4: diagnosticados COVID-19 por PCR en miles; tiempo en meses desde marzo de **2020**, dato contextual que no cambia el año de examen confirmado por cabecera. Ramas −t²+2t−0.3 en [0.2,1.8], 0.1t−0.12 en (1.8,5], −0.5t²+8.3t−28.62 en (5,10]. a continuidad/derivabilidad; b instantes y número máximo, sin resolver.
- C5: prevalencia 15 %, positivos entre enfermos 92 % y entre sanos 4 %. Se conservan condicionamientos a positivo/negativo y la intersección enfermo-negativo, sin invertirlos.
- C6: vehículo 90 %, transporte público 40 %, ninguno 3 %; unión, transporte sin vehículo y condicionamiento a no vehículo.
- D7: 250 residentes británicos en España, 115 a favor; confianza **99.5 %**, coma original tras el porcentaje y error **inferior al 5 %**. No actualizar el contexto histórico del enunciado.
- D8: ley Normal, media desconocida y **desviación típica 4**; muestras de 12. Datos, en este orden: 11.8, 10, 9.8, 12, 9.7, 10.8, 9.6, 11.3, 10.4, 12.2, 9.1, 10.5. Confianza 97 %, error menor que 1.2. No sustituir datos por su media ni resolver la desviación de medias.

Cuatro bloques A-D y numeración global 1-8; opción vacía. Duración de 90 minutos y elección de cuatro ejercicios de al menos tres bloques conservadas. Los ocho totales 2.5 se derivan de apartados y concuerdan con criterios; no se añaden como totales impresos.

## Progreso

`L010 · plan/read` — Tres páginas originales y criterios revisados visualmente; guardadas las huellas de 72 enunciados, 72 soluciones y 18 PDF anteriores. Fase de soluciones inactiva. Registro sin commit de Git.

`L010 · feat/review` — Ocho enunciados cotejados en una segunda pasada visual completa del mismo autor, separada de la escritura, y cinco páginas del borrador revisadas. Clasificación verificada; B3 conserva 2^(x+1) e integral definida, D8 sus doce datos en orden y desviación típica 4. Acumulado 80 enunciados; ninguna solución redactada.

## Indexación comprobada

| ID | Principal | Secundarios | Apartados y puntos |
|---|---|---|---|
| [SEL-D0010-BA-E01](../../enunciados/SEL-D0010-BA-E01.tex) | T04 | — | a:0.7; b:1; c:0.8 |
| [SEL-D0010-BA-E02](../../enunciados/SEL-D0010-BA-E02.tex) | T06 | — | a:1.5; b:0.5; c:0.5 |
| [SEL-D0010-BB-E03](../../enunciados/SEL-D0010-BB-E03.tex) | T01 | T02, T03 | a:1; b:0.8; c:0.7 |
| [SEL-D0010-BB-E04](../../enunciados/SEL-D0010-BB-E04.tex) | T01 | T02 | a:1.5; b:1 |
| [SEL-D0010-BC-E05](../../enunciados/SEL-D0010-BC-E05.tex) | T07 | — | a:1.25; b:0.5; c:0.75 |
| [SEL-D0010-BC-E06](../../enunciados/SEL-D0010-BC-E06.tex) | T07 | — | a:1; b:0.5; c:1 |
| [SEL-D0010-BD-E07](../../enunciados/SEL-D0010-BD-E07.tex) | T09 | — | a:1.5; b:1 |
| [SEL-D0010-BD-E08](../../enunciados/SEL-D0010-BD-E08.tex) | T09 | T08 | a:0.5; b:1; c:1 |

El lote cubre ocho temas contando secundarios, sin asignar T05 artificialmente. B3/B4 tienen principal T01 por continuidad y derivabilidad; los extremos y las familias de funciones se relacionan con T02. B3 enlaza además con T03 por su integral definida, sin etiqueta de área. D8 incluye T08 por la ley Normal y T09 por distribución de medias, intervalo y tamaño de muestra. La clasificación no responde las preguntas.

| ID | Epígrafes | Tags |
|---|---|---|
| SEL-D0010-BA-E01 | T04.3, T04.6, T04.9, T04.11 | parametros, matriz-inversa, matriz-traspuesta, ecuacion-matricial |
| SEL-D0010-BA-E02 | T06.1, T06.2, T06.3, T06.4, T06.5 | programacion-lineal, restricciones, region-factible, vertices, funcion-objetivo, maximo-minimo, alcance-valor-objetivo |
| SEL-D0010-BB-E03 | T01.10, T01.11, T01.12, T01.17, T02.2, T02.4, T02.6, T03.5, T03.7 | funcion-a-trozos, funcion-exponencial, funcion-polinomica, continuidad, derivabilidad, monotonia, maximo-minimo, integral-definida |
| SEL-D0010-BB-E04 | T01.10, T01.11, T01.12, T01.17, T02.2, T02.6, T02.9 | funcion-a-trozos, funcion-polinomica, continuidad, derivabilidad, optimizacion, extremos-absolutos |
| SEL-D0010-BC-E05 | T07.6, T07.8, T07.9, T07.10 | probabilidad-total, bayes, probabilidad-condicionada, interseccion-sucesos, complementario |
| SEL-D0010-BC-E06 | T07.2, T07.6, T07.8 | union-sucesos, diferencia-sucesos, interseccion-sucesos, complementario, probabilidad-condicionada |
| SEL-D0010-BD-E07 | T09.7, T09.8 | intervalo-confianza-proporcion, tamano-muestral, error-estimacion, cota-estricta |
| SEL-D0010-BD-E08 | T08.3, T09.4, T09.7, T09.8 | distribucion-normal, desviacion-conocida, media-muestral, desviacion-medias-muestrales, intervalo-confianza-media, tamano-muestral, error-estimacion, cota-estricta |

L010 conserva 2^(x+1) en B3 y su petición de integral definida entre −2 y 2, sin convertirla en área por la rúbrica. Marzo de 2020 en B4 es contexto temporal, no año del examen. D8 conserva desviación típica 4 y doce datos en su orden original; no se sustituye por varianza ni por una media calculada. La página 3 del original es tabla normal, registrada como auxiliar y no como otro ejercicio.

Se añade `alcance-valor-objetivo` para describir A2c sin responderlo. Las gráficas y cálculos solicitados al estudiante no se generan como respuestas. Se adaptan márgenes y saltos sin cambiar condiciones, texto, cifras, puntuaciones ni signos. Las aperturas de interrogación usan `\textquestiondown{}` para evitar sustitución de glifo en el compilador local. La discrepancia terminológica de la rúbrica en B3c queda documentada sin sustituir el enunciado ni añadir «sic».

## Verificación técnica y entrega

**Verificación L010:** 17 pruebas superadas, 80 ejercicios válidos y 215 huellas originales coincidentes. Preguntas de cuatro páginas y combinado de cinco; las nueve páginas finales están revisadas. Los 72 enunciados, 72 soluciones y dieciocho PDF anteriores conservan sus huellas. ZIP extraído y compilado por separado: ambas salidas y el PDF anterior de L009 coinciden byte a byte. `main.tex` también compila con L010: texto y cuatro páginas renderizadas idénticos a la salida de preguntas. Pruebas locales con Tectonic, sin acreditar ejecución del servicio Overleaf.

Las 17 pruebas terminaron en 14.378 segundos. Las 80 soluciones siguen `no_redactada` y contienen sólo comentarios. El borrador de cinco páginas se revisó antes de promover estados. Las salidas finales no muestran avisos de borrador; el combinado incluye ocho avisos de solución pendiente, sin respuestas. No se detectan desbordamientos, caracteres ausentes, referencias indefinidas ni errores de LaTeX. Los controles técnicos no sustituyen el cotejo del contenido. [Control, filtros y huellas](L010_control.json).

Actualmente el generador sin filtros selecciona 80 ejercicios: `--anio 2019` recupera 48 y `--anio 2021`, 32. `--tema T06` recupera diez; `--tema T03`, diez; `--tema T09 --tag tamano-muestral`, diecinueve, incluidos D7 de L007/L009 sobre muestreo, que no son intervalos de confianza. Los filtros buscan temas principales y secundarios. Para L010, `--examen EXA-0010 --bloque D` devuelve E07 y E08; `--opcion A` no devuelve ejercicios de este examen. D8 de L008 tiene tamaño dado y no solicita calcularlo, por lo que no lleva esa etiqueta.

| Entrega | Archivo |
|---|---|
| Preguntas | [PDF de enunciados](../../output/pdf/l010-extraordinaria-2021-enunciados.pdf) |
| Combinado pendiente | [PDF con avisos de soluciones pendientes](../../output/pdf/l010-extraordinaria-2021-con-soluciones-pendientes.pdf) |
| Entradas | [l010-enunciados.tex](../../l010-enunciados.tex) y [l010-con-soluciones.tex](../../l010-con-soluciones.tex) |
| Selección editorial | [l010-extraordinaria-2021.tex](../../selecciones/l010-extraordinaria-2021.tex) |
| Contexto | [Instrucciones EXA-0010](../../recursos/comunes/EXA-0010-instrucciones.tex) |
| Catálogo | [ejercicios.csv](../../datos/ejercicios.csv) y [examenes.csv](../../datos/examenes.csv) |
| Proyecto | [ZIP para Overleaf](../../dist/Selectividad_Overleaf.zip) |

## Cierre y siguiente tanda

Diez de 84 candidatos cerrados, 74 pendientes. Fase de soluciones inactiva; registro sin commit de Git.

**Siguiente: L011**, fuente candidata `SRC-4A2C6F053641`, archivo `Selectividad/matematicas_aplicadas/EXTRA_SUPLENTE_Modelo-1-Enunciados (Mat-Ap-2021).pdf`. Confirmar curso, convocatoria, tipo, modelo y estructura sobre la fuente visible; el nombre no basta para acreditarlos. Véase la [cola](../LOTES_DE_TRANSCRIPCION.md).

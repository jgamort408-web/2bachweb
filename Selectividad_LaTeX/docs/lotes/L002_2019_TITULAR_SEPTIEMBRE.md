# L002 · Curso 2018–2019 · Carpeta «Titular Septiembre»

**Fecha de registro:** 22 de octubre de 2026.  
**Documento:** `D0002` · **Examen:** `EXA-0002`.  
**Alcance:** transcripción literal, cotejo independiente y clasificación de los ocho ejercicios de las opciones A y B. Las soluciones continúan sin redactar.

## 1. Resultado y estado del lote

- [x] Identificar las dos opciones, las dos páginas de origen y los ocho ejercicios originales.
- [x] Transcribir los ocho enunciados respetando sus apartados, subapartados, fórmulas, datos, unidades, preguntas y puntuaciones.
- [x] Realizar un cotejo textual independiente con las imágenes de las páginas originales.
- [x] Verificar temas, epígrafes y tags, incluidas las relaciones con temas secundarios.
- [x] Preparar ocho archivos nuevos de solución únicamente con comentarios y estado `no_redactada`.
- [x] Compilar e inspeccionar el borrador de enunciados de cinco páginas como etapa transitoria de cotejo.
- [x] Superar las 17 pruebas y comprobar los SHA-256 de las 215 fuentes originales.
- [x] Confirmar que los ocho enunciados, las ocho soluciones y los dos PDF de L001 permanecen sin cambios de huella.
- [x] Inspeccionar las ocho páginas finales: cuatro de enunciados y cuatro del modo con soluciones pendientes.
- [x] Recompilar las dos variantes desde el ZIP aislado, sin originales externos: los PDF coinciden byte a byte con los revisados. Recompilar también L001 en ese paquete y comprobar que sus enunciados producen el mismo PDF anterior.

En el [catálogo de ejercicios](../../datos/ejercicios.csv), los ocho registros de L002 tienen `estado_transcripcion=cotejada`, `estado_clasificacion=verificada` y `estado_solucion=no_redactada`. Se mantiene `requiere_revision=si` exclusivamente por los metadatos todavía no acreditados en cabecera: «septiembre» y «titular» proceden de la carpeta; no aparece número de modelo.

El proyecto incorpora ahora 16 ejercicios indexados y 16 archivos de solución pendientes: ocho heredados de L001 y ocho nuevos de L002. No se considera resuelto ninguno. La comprobación final de preservación confirma que los ocho enunciados, las ocho soluciones y los dos PDF anteriores mantienen sus huellas de partida.

## 2. Fuentes y límites de identificación

Las rutas originales y sus SHA-256 figuran en [fuentes.csv](../../datos/fuentes.csv); la identificación del examen y sus auxiliares figura en [examenes.csv](../../datos/examenes.csv). Los originales permanecen fuera del proyecto de Overleaf.

| Función documental | Identificador | Evidencia y alcance |
|---|---|---|
| PDF de enunciados, dos páginas | `SRC-F06C106EBDD7` | Matemáticas Aplicadas a las Ciencias Sociales II, curso 2018–2019; dos opciones con cuatro ejercicios cada una. |
| Criterios específicos, una página | `SRC-7894EA3B08E4` | Cabecera, asignatura, curso, opciones y puntuaciones concordantes. Consulta auxiliar de verificación; no se transcriben respuestas ni se incorporan desarrollos a las soluciones. |
| Tabla normal estándar, una página | `SRC-51A4A40BA32D` | Tabla acumulada `P(Z ≤ z)` de `N(0,1)`, vinculada por la carpeta. Es genérica, sin curso o convocatoria propios acreditados; su SHA-256 coincide con la tabla asociada a L001. |

**SHA-256 del PDF de enunciados:**

```text
31fb46947e141f5c8da8f7b381e7d27b67fe5a9d1597120454ce66fce0313f1a
```

### Metadatos confirmados y pendientes

- La cabecera imprime el curso `2018-2019`. `anio=2019` corresponde al año final de ese curso.
- El ámbito impreso comprende Andalucía, Ceuta, Melilla y centros en Marruecos.
- La denominación de la carpeta «Titular Septiembre» sustenta provisionalmente `convocatoria=septiembre` y `tipo_examen=titular`. Ninguna de las dos expresiones aparece en las cabeceras revisadas.
- El número de modelo queda vacío y `modelo_estado=no_indicado_en_pdf_revisado`. No se deduce de las opciones A/B ni del orden de los archivos.
- Los modelos A, B y C de los patinetes del ejercicio A3 pertenecen al contexto del problema. No identifican modelos del examen.
- El estado documental continúa `parcialmente_confirmada` hasta contrastar convocatoria y tipo con una fuente que los acredite expresamente.

## 3. Índice de ejercicios, temas y puntuaciones

Los nombres de los nueve temas se conservan en [temas.csv](../../datos/temas.csv), el temario detallado en [epigrafes.csv](../../datos/epigrafes.csv) y el vocabulario de contenidos en [tags.csv](../../datos/tags.csv).

| ID y archivo de enunciado | Tema principal | Temas secundarios | Epígrafes verificados | Puntos originales por apartado |
|---|---|---|---|---|
| [SEL-D0002-OA-E01](../../enunciados/SEL-D0002-OA-E01.tex) | T04 | — | T04.2, T04.3, T04.5, T04.9, T04.11 | a: 1, con dos afirmaciones numeradas 1)/2); b: 1.5. |
| [SEL-D0002-OA-E02](../../enunciados/SEL-D0002-OA-E02.tex) | T02 | — | T02.1, T02.2, T02.9 | a: 1; b: 0.75; c: 0.75. |
| [SEL-D0002-OA-E03](../../enunciados/SEL-D0002-OA-E03.tex) | T07 | — | T07.2, T07.6, T07.7, T07.8, T07.9 | a: 1; b: 0.5; c: 1. |
| [SEL-D0002-OA-E04](../../enunciados/SEL-D0002-OA-E04.tex) | T09 | T08 | T08.3, T09.4, T09.7, T09.8 | a: 1.5; b: 1. |
| [SEL-D0002-OB-E01](../../enunciados/SEL-D0002-OB-E01.tex) | T06 | — | T06.1, T06.2, T06.3, T06.4, T06.5 | a: 1.75; b: 0.25; c: 0.5. |
| [SEL-D0002-OB-E02](../../enunciados/SEL-D0002-OB-E02.tex) | T02 | T01, T03 | T01.11, T02.1, T03.1, T03.2 | a: 1; b: 0.75; c: 0.75. |
| [SEL-D0002-OB-E03](../../enunciados/SEL-D0002-OB-E03.tex) | T07 | — | T07.2, T07.6, T07.8 | a: 1.2; b: 0.5; c: 0.8. |
| [SEL-D0002-OB-E04](../../enunciados/SEL-D0002-OB-E04.tex) | T09 | — | T09.7, T09.8 | a: 1.5; b: 1. |

**Ninguno de los ocho enunciados imprime un total de 2.5 puntos como cabecera del ejercicio.** Ese valor del índice se obtiene sumando los apartados y queda corroborado por los criterios. No se ha añadido al texto transcrito como si fuera un rótulo original. En A1, el punto del apartado a es conjunto para las dos afirmaciones; sus números internos no son ejercicios independientes.

Cada opción completa suma 10 puntos. La instrucción original obliga a elegir una de las dos opciones y contestar los ejercicios de esa opción. Los ocho ejercicios del banco no se presentan como un único examen obligatorio de 20 puntos.

## 4. Tags y decisiones de clasificación

| Ejercicio | Tags de contenido |
|---|---|
| A1 | `matriz-traspuesta`, `producto-matrices`, `matriz-simetrica`, `matriz-inversa`, `ecuacion-matricial` |
| A2 | `funcion-polinomica`, `monotonia`, `optimizacion`, `minimo-coste`, `representacion-grafica` |
| A3 | `experimento-compuesto`, `probabilidad-total`, `probabilidad-condicionada`, `complementario`, `union-sucesos` |
| A4 | `distribucion-normal`, `varianza-conocida`, `intervalo-confianza-media`, `tamano-muestral`, `error-estimacion`, `cota-estricta` |
| B1 | `programacion-lineal`, `restricciones`, `region-factible`, `vertices`, `viabilidad-punto`, `beneficio-maximo` |
| B2 | `derivada-dada`, `monotonia`, `extremos-relativos`, `curvatura`, `inflexion`, `integral-indefinida`, `primitiva-con-condicion` |
| B3 | `interseccion-sucesos`, `union-sucesos`, `probabilidad-condicionada`, `independencia`, `complementario` |
| B4 | `intervalo-confianza-proporcion`, `tamano-muestral`, `error-estimacion`, `cota-estricta` |

Los tags describen las preguntas, sus datos y la teoría relacionada. No contienen respuestas ni califican como verdaderas las afirmaciones que se pide justificar.

- **A1:** se trata de operaciones, producto con traspuesta, simetría, inversa y ecuación matricial. `A·Aᵗ` no se ha confundido con `A²`; por ello no se añade `potencia-matriz` ni T04.4. T04.2 conserva la relación con la suma explícita.
- **A2:** se pide estudiar variación, minimizar el coste y esbozar una gráfica. No se añade curvatura como pregunta que la fuente no formula.
- **A3:** se pide probabilidad total, condicionada directa y unión. No se incorpora Bayes por el mero hecho de aparecer varios modelos de producto.
- **A4:** la distribución normal es explícita y el dato literal es una varianza conocida. El enunciado mantiene «varianza 36»; no se sustituye por una desviación típica ni se realiza esa conversión durante la transcripción.
- **B2:** la función dada es `f′`, y uno de los apartados pide recuperar `f` mediante un punto de su gráfica. T03 es una relación secundaria necesaria para que una selección de integrales encuentre el ejercicio; no se ha calculado la primitiva.
- **B3:** se mantienen la notación de condicionada mediante barra y la unión de complementarios. La etiqueta `independencia` corresponde a una pregunta, no a una conclusión.

El lote se relaciona con ocho de los nueve temas al contar los secundarios. No se atribuye T05, Sistemas de ecuaciones, a ejercicios que no lo solicitan para completar artificialmente la cobertura.

## 5. Cotejo literal y condiciones sensibles

El cotejo independiente no detectó discrepancias de palabras, cifras, fórmulas, condiciones ni puntuaciones en los ocho fragmentos. Sólo se adaptan espacios y composición tipográfica al formato LaTeX. Se han conservado incluso construcciones gramaticales de la fuente, sin correcciones silenciosas.

| Ejercicio | Elementos contrastados sin resolver |
|---|---|
| A1 | Matriz A de dos filas y tres columnas: `(1, 0, −2)` y `(−1, 1, 0)`; B: `(1, −3)` y `(−2, 0)`; C: `(7, −12, 16)` y `(−1, 7, 12)`. Traspuesta con superíndice `t`, dos afirmaciones y ecuación `B·X+A=C`, respetando el orden de multiplicación. |
| A2 | `C(x)=2(2x−1)²+1`, con `0≤x≤2`; cantidad producida en millones de kilogramos. Se conserva el dominio acotado y no se inventan unidades monetarias para el coste. |
| A3 | Producción: modelo A, 25 %; B, 40 %; resto para C. Averías tras tres meses: A, 15 %; B, 10 %; C, 12 %. Se distingue la condicionada por pertenecer a A de la unión «avería o modelo C». |
| A4 | Ley Normal de varianza 36 y media desconocida; muestra aleatoria de 64, media muestral 35 puntos. Confianza del 92 % en a; error estrictamente inferior a 2 puntos y confianza del 98 % en b. |
| B1 | Para 1 kg de A: 4.5 kg de Colombia y 3 kg de Etiopía; para 1 kg de B: 7.5 kg de Colombia y 1.5 kg de Costa Rica. Máximos disponibles: 67.5, 30 y 9 kg. Cantidad de A mayor o igual que la mitad de B; consulta de viabilidad de 7 kg de A y 5 kg de B; beneficios unitarios 2 y 4 euros. |
| B2 | Se proporciona `f′(x)=3x²−3`, no `f(x)`. Se piden las abscisas de extremos e inflexión y se fija el punto `(−1, 3)` para recuperar la función. |
| B3 | `P(A∩B)=0.2`, `P(A∪B)=0.4` y `P(A/B)=0.8`. Se conserva la barra de la fuente y la expresión `P(Aᶜ∪Bᶜ)`, sin cambiar unión por intersección ni omitir complementos. |
| B4 | Muestra aleatoria de 50 expedientes y proporción observada del 22 %. Confianza del 92 % y mantenimiento de proporción y confianza en b; error estrictamente inferior al 3 %. |

La [cabecera e instrucciones comunes de EXA-0002](../../recursos/comunes/EXA-0002-instrucciones.tex) mantienen duración de 90 minutos, elección de una opción completa y las restricciones de uso de calculadoras. La fuente exige justificar respuestas y detallar los pasos sin calculadora cuando se obtenga un resultado directamente con ella. No prescribe una precisión decimal fija.

## 6. Verificación técnica y preservación

### Registro de controles

**17 pruebas superadas y 215 fuentes originales comprobadas por SHA-256.** El [registro de control de L002](L002_control.json) conserva los recuentos y huellas finales junto con la preservación de los archivos heredados.

Las ocho soluciones nuevas sólo contienen comentarios. Las ocho anteriores conservan sus bytes: el total del proyecto es de 16 soluciones `no_redactada`, sin respuestas ni desarrollos. Los ocho enunciados y los dos PDF de L001 también mantienen exactamente sus huellas. No se ha utilizado el modo de salida para convertir esta reserva de archivos en soluciones aparentes.

### Compilación y revisión PDF

**Salida final comprobada: cuatro páginas de enunciados y cuatro páginas del modo con soluciones pendientes.** Se han visto y cotejado las ocho páginas finales con la fuente. El modo combinado contiene ocho avisos de solución pendiente y cero respuestas; el modo de sólo enunciados no incluye esos avisos.

La compilación local con Tectonic 0.17.0 no registra desbordamientos, caracteres ausentes ni referencias indefinidas. Los PDF finales no contienen avisos de borrador ni cortes de matrices o apartados.

Antes de la versión final se inspeccionó un borrador de cinco páginas. La división de un apartado detectada en esa etapa quedó resuelta al retirar los avisos de borrador, sin modificar el enunciado. Ese recuento transitorio no corresponde a los PDF de entrega.

La compilación local no acredita una ejecución real en la plataforma de Overleaf. El proyecto se prepara para cargarlo allí con sus archivos internos, sin depender de los originales externos para compilar.

La compilación desde el ZIP extraído en una carpeta aislada confirma esa autonomía: ambos PDF de L002 coinciden byte a byte con las salidas inspeccionadas. La entrada `l001-enunciados.tex` también se recompiló allí y produjo exactamente el PDF de la tanda anterior.

| Salida y entrada del lote | Archivo |
|---|---|
| PDF de sólo enunciados | [Enunciados de L002](../../output/pdf/l002-septiembre-2019-enunciados.pdf) |
| PDF con avisos de soluciones pendientes | [Enunciados y soluciones pendientes de L002](../../output/pdf/l002-septiembre-2019-con-soluciones-pendientes.pdf) |
| Entrada de sólo enunciados | [l002-enunciados.tex](../../l002-enunciados.tex) |
| Entrada del modo con soluciones | [l002-con-soluciones.tex](../../l002-con-soluciones.tex) |
| Proyecto modular para Overleaf | [Selectividad_Overleaf.zip](../../dist/Selectividad_Overleaf.zip) |
| Evidencias de control | [L002_control.json](L002_control.json) |

El modo con soluciones debe mostrar de forma explícita que están pendientes. No se han escrito respuestas para ningún ejercicio de L001 o L002.

## 7. Diario y siguiente lote

**`L002 · transcribir y clasificar 2019 / carpeta Titular Septiembre`** — Ocho enunciados nuevos separados por ID; instrucciones comunes; cotejo independiente sin discrepancias; clasificación verificada y metadatos no acreditados señalados. Los criterios se mantienen como auxiliar de contraste y la tabla normal como anexo genérico asociado por carpeta. La fase de soluciones continúa inactiva.

**Siguiente: L003**, candidato `SRC-2428AFE65CF4`, de la carpeta de 2019 «Suplente Junio», según la [cola de lotes](../LOTES_DE_TRANSCRIPCION.md). Antes de transcribirlo habrá que comprobar su cabecera, opciones, numeración, todas sus páginas y la relación con sus auxiliares. El nombre de la carpeta todavía no se presenta como confirmación oficial de convocatoria o tipo.

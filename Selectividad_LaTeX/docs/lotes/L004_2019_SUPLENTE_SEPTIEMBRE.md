# L004 · Curso 2018–2019 · Carpeta «Suplente Septiembre»

**Fecha de registro:** 22 de octubre de 2026.  
**Documento:** `D0004` · **Examen:** `EXA-0004`.  
**Estado del lote:** cerrado; transcripción, cotejo literal independiente, clasificación y controles técnicos completados.  
**Alcance:** transcribir y clasificar los ocho ejercicios de las opciones A y B. Las soluciones se reservan para una fase posterior y no se redactan en esta tanda.

## 1. Resultado editorial y lista de cierre

- [x] Identificar las dos páginas, las dos opciones y los cuatro ejercicios de cada opción.
- [x] Revisar visualmente la cabecera, las cinco instrucciones comunes, los criterios y la tabla normal.
- [x] Registrar la identificación confirmada y las limitaciones de los datos obtenidos de la carpeta.
- [x] Escribir ocho fragmentos de enunciado con IDs estables, conservando texto, fórmulas, datos, condiciones y puntuaciones.
- [x] Reservar ocho archivos de solución de sólo comentarios, con estado `no_redactada`.
- [x] Cotejar independientemente los ocho fragmentos frente a las dos imágenes originales, sin discrepancias textuales.
- [x] Revisar las relaciones del CSV con temas, epígrafes y tags, incluidos los temas secundarios.
- [x] Cerrar la revisión de composición del borrador, incluida la corrección tipográfica de los signos de interrogación de B1 y B4.
- [x] Confirmar el cambio de los ocho registros a `cotejada` y `verificada` tras superar la revisión compilada.
- [x] Compilar y revisar visualmente las dos salidas finales completas.
- [x] Ejecutar las pruebas y la validación del catálogo y de las 215 fuentes originales.
- [x] Confirmar por sus huellas la preservación de los 24 enunciados, 24 soluciones y seis PDF anteriores.
- [x] Comprobar la compilación del ZIP extraído en una carpeta independiente.
- [x] Registrar los resultados definitivos, cerrar el lote y actualizar el diario y la cola.

Los ocho registros nuevos están en `cotejada` y `verificada` tras superar el cotejo independiente y la revisión compilada. El catálogo reúne **32 enunciados cotejados y 32 clasificaciones verificadas**, con 32 archivos de solución de sólo comentarios y ninguna respuesta redactada. Se cierran cuatro de los 84 candidatos de fuente; los 80 restantes siguen pendientes. Los 84 candidatos no se presentan como 84 exámenes confirmados.

Se mantiene `requiere_revision=si` por la incertidumbre documental sobre convocatoria, tipo y modelo, aun cuando se cierre el cotejo del contenido. Esta reserva no representa una discrepancia textual detectada.

## 2. Fuentes y trazabilidad

Las rutas originales y las huellas figuran en [fuentes.csv](../../datos/fuentes.csv); la relación del examen con los auxiliares se conserva en [examenes.csv](../../datos/examenes.csv). Los originales permanecen fuera del proyecto de Overleaf.

| Función documental | Identificador | Evidencia y alcance |
|---|---|---|
| PDF de enunciados, dos páginas | `SRC-D8602844841D` | Matemáticas Aplicadas a las Ciencias Sociales II, curso 2018–2019; opción A en la página 1 y B en la 2, con cuatro ejercicios completos cada una. |
| Criterios específicos, una página | `SRC-0FBD39CA5B30` | Cabecera, curso, opciones y puntuaciones concordantes. Confirman 2.5 puntos en cada ejercicio. Se usan para contraste, sin copiar respuestas ni redactar soluciones. |
| Tabla normal estándar, una página | `SRC-EB9738124728` | Tabla acumulada `P(Z ≤ z)` de `N(0,1)`, asociada por la carpeta. Es genérica, sin año ni convocatoria propios; su huella coincide con los anexos normales de L001–L003. |

**Ruta original desde la raíz del repositorio:**

```text
Selectividad/sel_2019_matematicas_aplicadas/Suplente Septiembre/Exámenes Matemáticas Aplicadas CCSS - A y B.pdf
```

**SHA-256 del PDF de enunciados:**

```text
eecad753694b3d8cb2d427efddb00d75faae9c4ec5b027056291bc95d7d2e3da
```

### Identificación confirmada y pendiente

- La cabecera imprime `CURSO 2018–2019`; `anio=2019` corresponde al año final del curso.
- El ámbito impreso es Andalucía, Ceuta, Melilla y centros en Marruecos.
- `convocatoria=septiembre` y `tipo_examen=suplente` proceden de «Suplente Septiembre». Estas denominaciones no están impresas en las cabeceras revisadas.
- El número de modelo queda vacío, con `modelo_estado=no_indicado_en_pdf_revisado`. No se infiere de las opciones A/B ni del orden del archivo.
- La identificación del examen permanece `parcialmente_confirmada` hasta disponer de evidencia documental expresa sobre convocatoria y tipo.

La [cabecera e instrucciones comunes de EXA-0004](../../recursos/comunes/EXA-0004-instrucciones.tex) conservan la duración de 1 hora y 30 minutos, la elección de una opción completa y las restricciones sobre calculadoras. Si se obtiene un resultado directamente con calculadora, la fuente exige explicar los pasos sin ella y justificar las respuestas. No prescribe un número de decimales. La nota de la colección distingue las instrucciones originales de la recopilación de ambas opciones para consulta.

## 3. Índice, clasificación y puntuación

El [catálogo de ejercicios](../../datos/ejercicios.csv) relaciona cada ID con su enunciado y su reserva de solución. La taxonomía procede de [temas.csv](../../datos/temas.csv), [epigrafes.csv](../../datos/epigrafes.csv) y [tags.csv](../../datos/tags.csv).

| ID y enunciado | Tema principal | Temas secundarios | Epígrafes revisados | Puntos originales por apartado |
|---|---|---|---|---|
| [SEL-D0004-OA-E01](../../enunciados/SEL-D0004-OA-E01.tex) | T06 | — | T06.1, T06.2, T06.3, T06.4, T06.5 | Sin apartados ni puntuación impresa en el enunciado. Total 2.5 sólo en criterios. |
| [SEL-D0004-OA-E02](../../enunciados/SEL-D0004-OA-E02.tex) | T01 | T02 | T01.10, T01.11, T01.12, T01.15, T01.17, T02.1, T02.2, T02.6 | a: 0.5; b: 0.5; c: 0.75; d: 0.75. |
| [SEL-D0004-OA-E03](../../enunciados/SEL-D0004-OA-E03.tex) | T07 | — | T07.2, T07.6, T07.8, T07.9, T07.10 | a: 1; b: 1; c: 0.5. |
| [SEL-D0004-OA-E04](../../enunciados/SEL-D0004-OA-E04.tex) | T09 | — | T09.7, T09.8 | a: 1.5; b: 1. |
| [SEL-D0004-OB-E01](../../enunciados/SEL-D0004-OB-E01.tex) | T04 | — | T04.2, T04.3, T04.4, T04.9, T04.11 | a: 2; b: 0.5. |
| [SEL-D0004-OB-E02](../../enunciados/SEL-D0004-OB-E02.tex) | T01 | T02 | T01.10, T01.11, T01.12, T01.15, T01.17, T02.1, T02.2, T02.4, T02.6 | a: 1.5; b: 1. |
| [SEL-D0004-OB-E03](../../enunciados/SEL-D0004-OB-E03.tex) | T07 | — | T07.2, T07.6, T07.8, T07.9, T07.10 | a: 1; b: 1; c: 0.5. |
| [SEL-D0004-OB-E04](../../enunciados/SEL-D0004-OB-E04.tex) | T09 | T08 | T08.3, T09.4, T09.7, T09.8 | a: 1.5; b: 1. |

**Ningún enunciado imprime un total de 2.5 puntos como cabecera del ejercicio.** Para A1, sin apartados puntuados, el total del índice procede exclusivamente del documento de criterios. Para los otros siete ejercicios, se obtiene por suma de apartados y se corrobora con ese auxiliar. No se incorpora ninguna de estas puntuaciones derivadas como si fuera texto original del enunciado.

Cada opción suma 10 puntos. La instrucción original exige elegir una de las dos opciones; los ocho ejercicios recopilados no constituyen conjuntamente una prueba obligatoria de 20 puntos.

### Tags de contenido

| Ejercicio | Tags |
|---|---|
| A1 | `restricciones`, `programacion-lineal`, `region-factible`, `funcion-objetivo`, `minimo-coste` |
| A2 | `continuidad`, `derivabilidad`, `funcion-a-trozos`, `parametros`, `extremos-relativos`, `representacion-grafica` |
| A3 | `probabilidad-total`, `bayes`, `probabilidad-condicionada`, `complementario`, `interseccion-sucesos` |
| A4 | `intervalo-confianza-proporcion`, `tamano-muestral`, `error-estimacion`, `cota-estricta` |
| B1 | `potencia-matriz`, `producto-matrices`, `ecuacion-matricial`, `matriz-inversa` |
| B2 | `continuidad`, `derivabilidad`, `funcion-a-trozos`, `funcion-exponencial`, `funcion-polinomica`, `parametros`, `extremos-relativos` |
| B3 | `probabilidad-total`, `bayes`, `probabilidad-condicionada`, `complementario`, `union-sucesos` |
| B4 | `distribucion-normal`, `desviacion-conocida`, `intervalo-confianza-media`, `tamano-muestral`, `error-estimacion`, `cota-estricta` |

Los tags permiten localizar contenidos y condiciones, sin incorporar resultados. En particular, `matriz-inversa` recoge la pregunta de inversibilidad de C; no obliga a usar un método concreto para la ecuación matricial.

### Decisiones de clasificación

- **A1:** modelo de dieta con restricciones mínimas de nutrientes y minimización del coste. Se incluye T06; no se convierte el texto en un problema resuelto ni se añaden fórmulas de restricciones al fragmento.
- **A2:** continuidad y derivabilidad de una función a trozos con parámetro, extremos y representación en su dominio. T01 es principal y T02 secundario.
- **A3:** selección entre tres institutos con tasas condicionadas, probabilidad global, condicionamiento inverso y una intersección. Probabilidad total y Bayes identifican contenidos; no se escriben cálculos.
- **A4:** intervalo de una proporción y tamaño de una nueva muestra que mantiene la proporción anterior. La variable pedida es **no haber probado** el nuevo helado; la cota del error es estricta.
- **B1:** potencias y ecuación matricial, más una pregunta explícita de inversibilidad. No se presupone que una matriz tenga o no inversa ni se impone un procedimiento de resolución.
- **B2:** continuidad y derivabilidad de una función a trozos y condiciones para un polinomio con parámetros. T01 permanece principal; T02 recoge las familias funcionales y los extremos.
- **B3:** probabilidad total, condicionamiento inverso y unión de sucesos, preservando la distinción entre 40 años o más y menos de 40.
- **B4:** inferencia sobre una media de población Normal con desviación típica conocida, nueve observaciones originales y tamaño muestral sujeto a error estricto. T08 conserva la distribución Normal como secundario.

Al contar los secundarios, el lote se relaciona con siete de los nueve temas. No se fuerzan vínculos con T03, Integrales, ni T05, Sistemas de ecuaciones.

## 4. Cotejo literal y condiciones sensibles

La revisión independiente de los ocho fragmentos contra las dos páginas originales no detectó discrepancias de palabras, cifras, datos, unidades, fórmulas, condiciones ni puntuaciones. La composición LaTeX cambia saltos de línea y disposición, sin modificar el contenido. El ordinal de 1º de ESO se compone con `\textsuperscript{o}`, manteniendo el curso indicado.

| Ejercicio | Elementos contrastados sin resolver |
|---|---|
| A1 | El pienso A aporta 2 unidades de Calcio y 1 de Hierro por kg; B aporta 1 de Calcio y 2 de Hierro. Ambos cuestan 1 euro por kg. La dieta debe aportar **al menos** 2 unidades de cada nutriente. Se conservan las mayúsculas Calcio/Hierro y las tres peticiones: cantidades de pienso, coste mínimo y unidades de nutrientes administradas. |
| A2 | Ramas `x²+2x` para `−2≤x<1` y `ax²+4x` para `1≤x≤4`. El apartado a pide continuidad en todo el dominio; b–d fijan `a=−1`. En b se pregunta por derivabilidad en `x=1`; c solicita extremos y sus valores; d, la representación en el dominio. |
| A3 | 500 estudiantes, 250 en A, 150 en B y el resto en C; tasas de superación 70 %, 68 % y 73 %, respectivamente. Se preservan las tres menciones a 1º de ESO y el sentido de cada pregunta: no superar, A dado que supera, C y no superar. |
| A4 | Muestra de 125 personas, 20 que **no** probaron y el resto sí. En a, confianza del 97 % para la proporción que no probó. En b, nueva muestra, error **inferior al 5 %**, confianza del 94 % y conservación de la proporción muestral del apartado anterior. |
| B1 | A: `(−1/2,5)` y `(−1/4,1/2)`; B: `(1,−1)` y `(2,1)`; C: `(1,0,−1)`, `(0,−1,1)`, `(−1,1,0)`. Ecuación `A⁴·X=B²+I₂`, conservando potencia, orden y subíndice; pregunta separada sobre la inversa de C. |
| B2 | En a, `x²+4x+1` para `x<0` y `e^(−x)` para `x≥0`. En b, `g(x)=x³+bx²+c`, extremo relativo en `x=−1` y paso por `(−1,3)`. Se conservan las dos peticiones independientes sin determinar parámetros. |
| B3 | 70 % tiene 40 años o más; entre ellos, 60 % posee licencia; entre menores de 40, 23 % la posee. En b se condiciona a **no** ser propietario; c pregunta por una unión mediante «o». |
| B4 | Ley Normal, media desconocida y **desviación típica de 2 000 horas**. Nueve datos en este orden: `9 500, 10 000, 8 500, 10 500, 16 500, 10 000, 12 000, 14 000, 17 000`, incluido el 10 000 repetido. En a, confianza del 99 %. En b, error **inferior a 500 horas**, confianza del 95 % y tamaño mínimo. |

Las condiciones de error de A4b y B4b no se cambian por cotas inclusivas ni se confunden con la amplitud total de un intervalo. No se convierten los datos ni se calculan medias o tamaños muestrales en esta fase.

### Incidencia de composición del borrador

La primera revisión compilada detectó que dos signos Unicode de apertura de interrogación de B1 y B4 se mostraban como signos de libra. Se han compuesto mediante el comando estándar `\textquestiondown{}`, ya utilizado en la opción A. La inspección final y la extracción del PDF confirman el signo original `¿` en ambos casos. Se conservan las palabras y las preguntas. El borrador de revisión tuvo cinco páginas; ese recuento no corresponde a los PDF finales.

## 5. Verificación técnica y preservación

**17 pruebas superadas, 32 ejercicios válidos y 215 fuentes originales con huellas coincidentes.** El [registro de control L004](L004_control.json) conserva los resultados, las huellas de los TeX y PDF, la comparación con los lotes anteriores y la prueba del ZIP aislado.

| Control | Resultado comprobado |
|---|---|
| Cotejo independiente de los ocho fragmentos e instrucciones | Completo, sin discrepancias textuales. |
| Clasificación y estados editoriales | Ocho nuevos `cotejada` y `verificada`; total 32 de cada estado. |
| Archivos de solución | 32 `no_redactada`, todos de sólo comentarios; ocho nuevos y 24 anteriores intactos. |
| PDF de sólo enunciados | Cuatro páginas, sin avisos de solución pendiente ni respuestas. |
| PDF en modo combinado | Cuatro páginas, ocho avisos de solución pendiente y ninguna respuesta. |
| Revisión visual | Ocho páginas finales vistas y cotejadas; sin cortes de fórmulas, datos o apartados. |
| Registros de compilación | Sin desbordamientos, caracteres ausentes, referencias indefinidas ni errores de LaTeX detectados. |
| Pruebas automatizadas | 17 superadas en 38.285 segundos. |
| Catálogo y originales | 32 ejercicios válidos y 215 huellas SHA-256 coincidentes. |
| Conservación de L001–L003 | Los 24 enunciados, 24 soluciones y seis PDF previos conservan sus huellas. |
| ZIP autónomo | Extraído en carpeta independiente y compilado sin recurrir a los PDF originales. Las dos salidas de L004 coinciden byte a byte con las entregadas; la selección de enunciados de L003 también reproduce exactamente su PDF anterior. |

La compilación se comprueba localmente con Tectonic 0.17.0 y recursos de su caché, sin descargas. No se presenta como prueba del servicio real de Overleaf. La configuración de uso normal mantiene `IncluirBorradores=no`; ninguna solución sin validar se incorpora como respuesta.

| Salida y entrada | Archivo |
|---|---|
| PDF de sólo enunciados | [Enunciados de L004](../../output/pdf/l004-suplente-septiembre-2019-enunciados.pdf) |
| PDF con avisos de soluciones pendientes | [Modo combinado de L004](../../output/pdf/l004-suplente-septiembre-2019-con-soluciones-pendientes.pdf) |
| Entrada de sólo enunciados | [l004-enunciados.tex](../../l004-enunciados.tex) |
| Entrada del modo combinado | [l004-con-soluciones.tex](../../l004-con-soluciones.tex) |
| Proyecto modular | [ZIP para Overleaf](../../dist/Selectividad_Overleaf.zip) |
| Evidencias de control | [L004_control.json](L004_control.json) |

## 6. Diario y siguiente lote

**`L004 · transcribir y clasificar 2019 / carpeta Suplente Septiembre`** — Ocho fragmentos nuevos, ocho reservas de solución, instrucciones comunes y clasificación revisada. Cotejo literal independiente terminado sin discrepancias textuales. Se distinguen los 2.5 puntos de A1 acreditados exclusivamente en criterios de los totales derivados de apartados en los otros ejercicios. Permanecen explícitas las limitaciones de identificación y las cotas estrictas de error. Cierre técnico completado: 17 pruebas, dos PDF finales de cuatro páginas revisados, originales y entregas anteriores conservados, y ZIP reproducido de forma independiente. Registro de trabajo sin commit de Git.

**Siguiente: L005**, candidato `SRC-AA763712E273`, de la carpeta de 2019 «Reserva A», según la [cola de transcripción](../LOTES_DE_TRANSCRIPCION.md). La ruta inventariada es `Selectividad/sel_2019_matematicas_aplicadas/Reserva A/Exámenes Mat Aplicadas CCSS - A y B.pdf`. Antes de transcribir se revisarán cabecera, opciones, numeración, páginas y relación con auxiliares; la carpeta no acredita por sí sola convocatoria, tipo o modelo.

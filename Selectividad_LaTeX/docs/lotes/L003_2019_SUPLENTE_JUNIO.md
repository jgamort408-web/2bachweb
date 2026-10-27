# L003 · Curso 2018–2019 · Carpeta «Suplente Junio»

**Fecha de registro:** 22 de octubre de 2026.  
**Documento:** `D0003` · **Examen:** `EXA-0003`.  
**Alcance:** transcripción literal, cotejo independiente y clasificación de los ocho ejercicios de las opciones A y B. Los archivos de solución se reservan para una fase posterior y no contienen respuestas.

## 1. Resultado y estado del lote

- [x] Identificar las dos páginas originales, las dos opciones y los cuatro ejercicios de cada opción.
- [x] Escribir ocho fragmentos de enunciado separados por ID, conservando texto, fórmulas, datos, unidades, apartados y puntuaciones.
- [x] Realizar el cotejo textual independiente de los ocho fragmentos frente a las dos imágenes originales.
- [x] Verificar las relaciones con temas, epígrafes y tags, incluidas las materias secundarias.
- [x] Reservar ocho archivos nuevos de solución únicamente con comentarios y estado `no_redactada`.
- [x] Compilar e inspeccionar un borrador de cinco páginas como etapa transitoria del cotejo.
- [x] Superar las 17 pruebas y comprobar la integridad de los 24 ejercicios y los SHA-256 de las 215 fuentes originales.
- [x] Confirmar la preservación de los 16 enunciados, 16 soluciones y cuatro PDF de L001/L002.
- [x] Cerrar la inspección de las ocho páginas finales: cuatro de enunciados y cuatro del modo con soluciones pendientes.

El [catálogo de ejercicios](../../datos/ejercicios.csv) incorpora ocho registros nuevos `cotejada` y `verificada`. El proyecto alcanza 24 ejercicios indexados y 24 soluciones `no_redactada`: ninguna se considera resuelta. Los 16 enunciados, 16 soluciones y cuatro PDF de los lotes anteriores mantienen sus huellas de referencia.

Se mantiene `requiere_revision=si` por la incertidumbre documental: «junio» y «suplente» proceden de la carpeta, mientras que el PDF no imprime número de modelo. No se trata de una discrepancia pendiente en la transcripción cotejada.

## 2. Fuentes y trazabilidad

Las rutas originales y las huellas figuran en [fuentes.csv](../../datos/fuentes.csv); los vínculos de examen y auxiliares, en [examenes.csv](../../datos/examenes.csv). Los originales permanecen fuera del proyecto de Overleaf.

| Función documental | Identificador | Evidencia y alcance |
|---|---|---|
| PDF de enunciados, dos páginas | `SRC-2428AFE65CF4` | Matemáticas Aplicadas a las Ciencias Sociales II, curso 2018–2019; opciones A y B con cuatro ejercicios cada una. |
| Criterios específicos, una página | `SRC-2707C9F56364` | Cabecera, asignatura, curso, opciones y puntuaciones concordantes. Se consultan para contraste, sin transcribir respuestas ni redactar soluciones. |
| Tabla normal estándar, una página | `SRC-9FA8D8AAEE1B` | Tabla acumulada `P(Z ≤ z)` de `N(0,1)`, asociada por la carpeta; documento genérico sin fecha o convocatoria propias acreditadas. Su huella coincide con la de los anexos de L001 y L002. |

**SHA-256 del PDF de enunciados:**

```text
a59474e6895bd41034da53b7060969cbe8cbf7f8272f39fbf16821c95f06c84b
```

### Identificación confirmada y pendiente

- La cabecera imprime `CURSO 2018-2019`; `anio=2019` corresponde al año final de ese curso.
- El ámbito impreso es Andalucía, Ceuta, Melilla y centros en Marruecos.
- `convocatoria=junio` y `tipo_examen=suplente` se obtienen de «Suplente Junio». Esas denominaciones no aparecen en las cabeceras visibles.
- El número de modelo queda vacío, con `modelo_estado=no_indicado_en_pdf_revisado`. No se infiere del nombre del archivo, de su orden ni de las opciones A/B.
- La identificación del examen sigue `parcialmente_confirmada` hasta acreditar convocatoria y tipo con una fuente que los indique expresamente.

## 3. Índice, clasificación y puntuación

La denominación de los nueve temas procede de [temas.csv](../../datos/temas.csv). Los epígrafes y el vocabulario están en [epigrafes.csv](../../datos/epigrafes.csv) y [tags.csv](../../datos/tags.csv).

| ID y enunciado | Tema principal | Temas secundarios | Epígrafes verificados | Puntos originales por apartado |
|---|---|---|---|---|
| [SEL-D0003-OA-E01](../../enunciados/SEL-D0003-OA-E01.tex) | T06 | — | T06.1, T06.2, T06.3, T06.4, T06.5 | a: 2; b: 0.5. |
| [SEL-D0003-OA-E02](../../enunciados/SEL-D0003-OA-E02.tex) | T01 | T02 | T01.13, T01.14, T01.15, T01.16, T02.1, T02.2 | a: 1; b: 1.5. |
| [SEL-D0003-OA-E03](../../enunciados/SEL-D0003-OA-E03.tex) | T07 | — | T07.2, T07.6, T07.8 | a: 1; b: 1; c: 0.5. |
| [SEL-D0003-OA-E04](../../enunciados/SEL-D0003-OA-E04.tex) | T09 | T08 | T08.3, T09.4, T09.7, T09.8 | a: 1.5; b: 1. |
| [SEL-D0003-OB-E01](../../enunciados/SEL-D0003-OB-E01.tex) | T04 | — | T04.2, T04.3, T04.4, T04.11 | a: 1; b: 1.5. |
| [SEL-D0003-OB-E02](../../enunciados/SEL-D0003-OB-E02.tex) | T02 | T03 | T02.1, T02.3, T03.1, T03.2 | a: 1; b: 0.75; c: 0.75. |
| [SEL-D0003-OB-E03](../../enunciados/SEL-D0003-OB-E03.tex) | T07 | — | T07.2, T07.6, T07.8 | a: 0.5; b: 1; c: 1. |
| [SEL-D0003-OB-E04](../../enunciados/SEL-D0003-OB-E04.tex) | T09 | — | T09.7, T09.8 | a: 1.5; b: 1. |

**Ningún enunciado imprime un total de 2.5 puntos como cabecera del ejercicio.** Ese valor del índice se obtiene por suma de apartados y está corroborado por los criterios. No se ha añadido a la transcripción como si fuera un rótulo original.

Cada opción completa suma 10 puntos. La instrucción exige elegir una opción y contestar sus ejercicios; los ocho del banco no constituyen conjuntamente un examen obligatorio de 20 puntos.

### Tags de contenido

| Ejercicio | Tags |
|---|---|
| A1 | `restricciones`, `region-factible`, `vertices`, `programacion-lineal`, `funcion-objetivo`, `maximo-minimo` |
| A2 | `reglas-derivacion`, `funcion-logaritmica`, `funcion-exponencial`, `regla-producto`, `regla-cadena`, `recta-tangente`, `representacion-grafica` |
| A3 | `interseccion-sucesos`, `complementario`, `union-sucesos`, `probabilidad-condicionada`, `independencia` |
| A4 | `distribucion-normal`, `varianza-conocida`, `intervalo-confianza-media`, `tamano-muestral`, `amplitud-intervalo`, `cota-no-estricta` |
| B1 | `compatibilidad-dimensiones`, `producto-matrices`, `matriz-traspuesta`, `potencia-matriz`, `ecuacion-matricial` |
| B2 | `funcion-racional`, `parametros`, `extremos-relativos`, `integral-indefinida` |
| B3 | `diferencia-sucesos`, `interseccion-sucesos`, `union-sucesos`, `probabilidad-condicionada`, `complementario`, `independencia`, `incompatibilidad` |
| B4 | `intervalo-confianza-proporcion`, `tamano-muestral`, `error-estimacion`, `cota-estricta` |

Los tags identifican contenidos preguntados y datos explícitos; no contienen conclusiones ni resultados. Las preguntas de independencia e incompatibilidad conservan su carácter interrogativo.

### Decisiones de clasificación

- **A1:** recinto definido mediante desigualdades, vértices y extremos de una función objetivo. No se añaden restricciones de no negatividad que la fuente no prescribe.
- **A2:** la derivación de funciones logarítmicas y exponenciales y la recta tangente pertenecen a T01. La representación de la función polinómica y de la tangente justifica T02 como secundario.
- **A3:** álgebra de sucesos, complementarios, condicionamiento e independencia. No se presupone un problema de Bayes ni un modelo de mezcla que el texto no plantea.
- **A4:** la normalidad y la varianza poblacional son explícitas. El apartado b impone una **amplitud total como máximo de 5 mg**, por lo que se etiqueta como cota no estricta. La transcripción no la sustituye por un error, semianchura u otra condición.
- **B1:** operaciones, dimensiones, traspuesta, potencia y ecuación matricial. La clasificación no anticipa cuáles de las cuatro operaciones son posibles ni impone el método de la inversa para resolver la ecuación.
- **B2:** función racional y extremos relativos con parámetros, junto con una integral indefinida. T03 se conserva como secundario; no se resuelve la integral ni se clasifican aquí los extremos pedidos.
- **B3:** la diferencia de sucesos y la condicionada por el complementario se mantienen diferenciadas. Independencia e incompatibilidad son dos preguntas distintas.
- **B4:** estimación de una proporción y tamaño muestral con una cota estricta en la escala decimal indicada por la fuente.

El lote se relaciona con ocho de los nueve temas al contar los secundarios. No se fuerza la relación con T05, Sistemas de ecuaciones, para completar artificialmente la cobertura.

## 4. Cotejo literal y datos sensibles

La revisión independiente de las dos imágenes originales y de los ocho fragmentos no detectó discrepancias de palabras, cifras, fórmulas, condiciones ni puntuaciones. Los cambios de composición de LaTeX se limitan a la tipografía y los saltos de línea.

| Ejercicio | Elementos contrastados sin resolver |
|---|---|
| A1 | `7y≤15+3x`, `y≥x−3` y `3y≥−x+11`; función `H(x,y)=4x−y−16`; se piden máximo y mínimo, con sus puntos y valores. |
| A2 | `f(x)=(1/2) ln((1−x)/(1+x))`, `g(x)=(x²+1)²·e^(2x−1)` y `h(x)=x²−6x+8`; se conserva el exponente completo y el punto de abscisa `x=4`. |
| A3 | 17 % sigue dieta y practica deporte; 58 % no hace ninguna de las dos cosas; de quienes hacen deporte, 50 % hace dieta. Se conserva el sentido del condicionamiento de cada frase y cada pregunta. |
| A4 | Ley Normal de **varianza 225 mg²**, muestra de 25 y media de 175 mg. Confianza del 90 % en a; del 80 % en b, con **amplitud total como máximo de 5 mg**. No se convierte la varianza ni se calcula un tamaño muestral. |
| B1 | A: `(3, −1)` y `(−6, 1)`; B: `(2, 0)` y `(−2, 2)`; C columna `(3, 1)` y D fila `(−2, 2)`. Se preservan el orden y las dimensiones originales de `A+B·C`, `A·C+B·Dᵗ`, `B²+C·D`, `A+D·C` y `X·(A+I₂)=3Bᵗ`, sin efectuar operaciones. |
| B2 | `f(x)=ax²+b/x`, dominio `x≠0`, parámetros reales, extremo en `(1,3)`; apartado b fija `a=1`, `b=2`; integral indefinida de `x²+2/x`. |
| B3 | `P(A)=0.5`, `P(A∪B)=0.75`, `P(A−B)=0.3`; diferencia y barra originales en `P(A/Bᶜ)`; preguntas separadas sobre independencia e incompatibilidad. |
| B4 | 5 000 estudiantes de 1º de Bachillerato y 2 250 respuestas indicadas; confianza del 97.5 %. En otra muestra se fija proporción 0.5, error **inferior a 0.03** y confianza del 92.5 %. No se reescribe la condición decimal como porcentaje. |

La [cabecera e instrucciones comunes de EXA-0003](../../recursos/comunes/EXA-0003-instrucciones.tex) conservan duración de 90 minutos, elección de una opción completa y las restricciones sobre calculadoras. Si se obtiene un resultado directamente con calculadora, se exige detallar los pasos sin ella y justificar las respuestas. La fuente no impone un número de decimales.

## 5. Verificación técnica y preservación

### Controles de la entrega

**17 pruebas superadas, 24 ejercicios válidos y 215 fuentes originales con SHA-256 coincidentes.** El [registro L003_control.json](L003_control.json) conserva los resultados, las huellas de los PDF y la comparación de preservación de L001/L002.

Los ocho archivos nuevos de solución sólo contienen comentarios. El total del proyecto es de 24 soluciones `no_redactada`, todas sin respuestas ni desarrollos. La comparación final confirma que los 16 enunciados, 16 soluciones y cuatro PDF anteriores conservan sus huellas de referencia.

### Compilación y revisión visual

**Los dos PDF finales tienen cuatro páginas cada uno.** Se han visto y cotejado las ocho páginas finales contra la fuente, sin fallos visuales, cortes de matrices o apartados ni fórmulas incorrectas. El modo combinado contiene ocho avisos de solución pendiente y el de sólo enunciados no contiene ninguno; ambos carecen de respuestas.

Se ha compilado e inspeccionado previamente un borrador de cinco páginas de enunciados como etapa transitoria. Ese recuento no corresponde a los PDF de entrega.

En el entorno local, la ausencia inicial de una fuente TS1 para los ordinales se ha corregido componiendo la `o` en superíndice mediante el comando estándar `\textsuperscript{o}`. Los ordinales 1º/2º se han cotejado visualmente y mantienen la apariencia de la fuente y los mismos cursos escolares. Es una adaptación de composición, sin alterar el texto ni sus datos.

La compilación se realiza localmente con Tectonic 0.17.0. No se presenta como prueba de ejecución real en Overleaf. El proyecto se prepara con archivos internos suficientes para compilar sin los originales externos.

- [x] ZIP extraído y compilado en una carpeta aislada, sin recurrir a los PDF originales. Las dos salidas de L003 coinciden byte a byte con los PDF de entrega; también se ha reproducido sin cambios el PDF de enunciados de L002. Los tres registros de compilación no presentan desbordamientos, caracteres ausentes, referencias indefinidas ni errores de LaTeX.

| Salida y entrada del lote | Archivo |
|---|---|
| PDF de sólo enunciados | [Enunciados de L003](../../output/pdf/l003-suplente-junio-2019-enunciados.pdf) |
| PDF con avisos de soluciones pendientes | [Enunciados y soluciones pendientes de L003](../../output/pdf/l003-suplente-junio-2019-con-soluciones-pendientes.pdf) |
| Entrada de sólo enunciados | [l003-enunciados.tex](../../l003-enunciados.tex) |
| Entrada del modo con soluciones | [l003-con-soluciones.tex](../../l003-con-soluciones.tex) |
| Proyecto modular para Overleaf | [Selectividad_Overleaf.zip](../../dist/Selectividad_Overleaf.zip) |
| Evidencias de control | [L003_control.json](L003_control.json) |

El modo con soluciones debe avisar de forma explícita de que están pendientes. No se ha redactado ninguna respuesta de L001, L002 o L003; la fase final de resolución sigue inactiva.

## 6. Diario y siguiente lote

**`L003 · transcribir y clasificar 2019 / carpeta Suplente Junio`** — Ocho enunciados nuevos con IDs estables, ocho reservas de solución, instrucciones comunes, cotejo independiente sin discrepancias y clasificación verificada. Se conservan datos, unidades y condiciones sensibles, incluida la distinción entre amplitud y error. Las incertidumbres documentales permanecen explícitas y los criterios sólo se usan como auxiliar de contraste.

**Siguiente: L004**, candidato `SRC-D8602844841D`, de la carpeta de 2019 «Suplente Septiembre», según la [cola de transcripción](../LOTES_DE_TRANSCRIPCION.md). Confirmar cabecera, opciones, numeración, páginas y relación con auxiliares antes de transcribir; el nombre de carpeta no acredita por sí solo convocatoria, tipo o modelo.

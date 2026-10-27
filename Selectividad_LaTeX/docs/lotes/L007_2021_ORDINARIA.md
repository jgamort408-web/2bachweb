# L007: convocatoria ordinaria, curso 2020-2021

Fecha: 2026-10-22. **Cerrado: transcripción, cotejo, clasificación y controles técnicos.** Documento `D0007`, examen `EXA-0007`.

## Plan de la tanda

- [x] Confirmar visualmente convocatoria ordinaria y curso 2020-2021.
- [x] Identificar cuatro bloques A-D, ocho ejercicios y numeración global 1-8.
- [x] Contrastar criterios concordantes y conservar límites de confirmación del modelo y tipo.
- [x] Transcribir e indexar los ocho ejercicios completos, con bloques y todos sus apartados.
- [x] Crear ocho soluciones de sólo comentarios.
- [x] Cotejar íntegramente en una segunda pasada contra el original visible.
- [x] Compilar y revisar el borrador completo.
- [x] Verificar clasificación y estados editoriales.
- [x] Compilar y revisar todas las páginas de las dos salidas finales.
- [x] Validar catálogo, originales y preservación; ejecutar pruebas.
- [x] Extraer y compilar el ZIP de forma independiente.
- [x] Cerrar el informe, la cola, el plan y el diario.

Fuente: `SRC-FBFCFE3C7E1A`.
Ruta desde la raíz: `Selectividad/matematicas_aplicadas/ORD_TITULAR_MATEMÁTICAS APLICADAS CCSS-JUNIO-IMPRESO.pdf`.
SHA-256: `c42a605501a277fe7194b964ad92ad66047be9a62dc254fa2219d756d3d71317`.

Regla original: cuatro ejercicios de al menos tres bloques; se corrigen los cuatro primeros que cumplen esa condición. La colección reúne los ocho para consulta. No se resuelve ningún ejercicio.

## Identificación y fuentes auxiliares

Las dos cabeceras imprimen **CONVOCATORIA ORDINARIA, CURSO 2020-2021**. `anio=2021` es el año final del curso; no una fecha completa de examen inferida. Se confirman ámbito Andalucía, Ceuta, Melilla y centros en Marruecos, asignatura, duración de 90 minutos y regla de elección. La primera página contiene las cinco instrucciones y una advertencia adicional sobre bloques; ambas se conservan en el [contexto común EXA-0007](../../recursos/comunes/EXA-0007-instrucciones.tex).

`convocatoria=ordinaria` se acredita por cabecera. `tipo_examen=titular` y la referencia a junio sólo proceden del nombre del PDF. Las cabeceras no imprimen modelo: aunque el nombre del auxiliar contiene «Modelo-2», `modelo` y `modelo_literal` quedan vacíos. `modelo_estado=no_indicado_en_pdf_revisado` y `requiere_revision=si` mantienen esos límites. La identidad sigue `parcialmente_confirmada`, sin negar el curso y la convocatoria ya confirmados.

| Auxiliar | Fuente | Evidencia y límites |
|---|---|---|
| Criterios específicos, una página | `SRC-35FB662583C5` | Curso 2020-2021, bloques A-D, números 1-8 y todos los repartos concordantes. La relación se coteja visualmente; no se usa el nombre para confirmar modelo ni se copian respuestas. |
| Tabla N(0,1), una página | `SRC-5FDB5B19381C` | Genérica, acumulada P(Z≤z), sin año propio. Asociación por nombre ORD_TITULAR y huella idéntica a la tabla revisada de L001-L006. |

Rutas y huellas en [fuentes.csv](../../datos/fuentes.csv); vínculos y evidencia de identificación en [examenes.csv](../../datos/examenes.csv).

## Estructura, indexación y puntuación

Los IDs usan bloques y **numeración global**: BA-E01/E02, BB-E03/E04, BC-E05/E06 y BD-E07/E08. `opcion` está vacío; no se transforman los cuatro bloques en opciones completas ni se reinicia el número al cambiar de bloque.

E1 imprime 2.5 puntos. Los otros siete totales se obtienen por suma de apartados y se corroboran en criterios, sin añadirse al fragmento como totales impresos. Los ocho ejercicios reúnen 20 puntos para consulta, pero el examen exige elegir cuatro conforme a la regla original, con puntuación máxima de 10. La composición del banco no añade una validación automática de simulacro ni restringe una selección didáctica personalizada.

| Ejercicio | Puntos originales |
|---|---|
| A1 | Total 2.5 impreso. |
| A2 | a:0.7; b:1.8. |
| B3 | a:1; b:0.5; c:0.5; d:0.5. |
| B4 | a:1; b:0.7; c:0.8. |
| C5 | a:1.5; b:1. |
| C6 | a:1; b:0.75; c:0.75. |
| D7 | a:1.5 en conjunto para las cuestiones 1 y 2; b:1. |
| D8 | a:1.5; b:1. |

Las letras en esta tabla identifican **bloques**. D7 mantiene su contexto y dos niveles de numeración en un único archivo y una sola fila de CSV. Las preguntas de B3/B4 conservan todos sus apartados para no perder las funciones que se integran o representan. La clasificación no aporta respuestas ni obliga a aplicar una técnica exclusiva.

## Temas, epígrafes y etiquetas

| ID | Principal | Secundarios | Epígrafes | Tags |
|---|---|---|---|---|
| [SEL-D0007-BA-E01](../../enunciados/SEL-D0007-BA-E01.tex) | T06 | — | T06.1, T06.2, T06.3, T06.4, T06.5 | programacion-lineal, restricciones, region-factible, beneficio-maximo |
| [SEL-D0007-BA-E02](../../enunciados/SEL-D0007-BA-E02.tex) | T04 | — | T04.4, T04.6, T04.9, T04.11 | parametros, matriz-inversa, potencia-matriz, ecuacion-matricial |
| [SEL-D0007-BB-E03](../../enunciados/SEL-D0007-BB-E03.tex) | T02 | T03 | T02.1, T02.2, T03.1, T03.2, T03.5, T03.7, T03.8 | funcion-polinomica, monotonia, extremos-relativos, representacion-grafica, integral-indefinida, integral-definida, area-recinto |
| [SEL-D0007-BB-E04](../../enunciados/SEL-D0007-BB-E04.tex) | T01 | T02, T03 | T01.14, T01.15, T01.16, T02.1, T02.2, T03.5, T03.7, T03.8 | reglas-derivacion, funcion-logaritmica, funcion-exponencial, regla-producto, regla-cadena, funcion-polinomica, representacion-grafica, integral-definida, area-recinto |
| [SEL-D0007-BC-E05](../../enunciados/SEL-D0007-BC-E05.tex) | T07 | — | T07.6, T07.8, T07.9, T07.10 | probabilidad-total, bayes, probabilidad-condicionada, complementario |
| [SEL-D0007-BC-E06](../../enunciados/SEL-D0007-BC-E06.tex) | T07 | — | T07.2, T07.6, T07.8 | interseccion-sucesos, union-sucesos, probabilidad-condicionada, complementario |
| [SEL-D0007-BD-E07](../../enunciados/SEL-D0007-BD-E07.tex) | T09 | — | T09.2, T09.3, T09.4 | muestreo, muestra-proporcional, media-muestral, tamano-muestral, parametros |
| [SEL-D0007-BD-E08](../../enunciados/SEL-D0007-BD-E08.tex) | T09 | — | T09.7, T09.8 | intervalo-confianza-proporcion, tamano-muestral, error-estimacion, cota-estricta |

El lote cubre siete temas contando secundarios: T01, T02, T03, T04, T06, T07 y T09. No se añaden T05 ni T08 artificialmente. Las etiquetas de muestreo describen el contenido, sin dar respuestas.

## Segunda pasada y condiciones sensibles

Cotejo visual completo en una segunda pasada del mismo autor, separada de la escritura. No se atribuye a un segundo revisor distinto. Se contrastan las dos páginas visibles y el borrador compilado: palabras, cifras, fórmulas, hipótesis, puntuaciones, bloques y numeración íntegros, sin discrepancias pendientes de lectura.

| Ejercicio | Elementos preservados sin resolver |
|---|---|
| A1 | Producción al menos 10 en total; B no supera en más de 10 a A; costes A/B de 150/100 euros y presupuesto máximo 6000; beneficios 130/140. Se piden cantidades y beneficio máximo. No se invierte el sentido de la restricción ni se añaden condiciones ausentes. |
| A2 | A=(1,−1,m;0,2,−3;m,1,1), parámetro real. Inversibilidad según m; para m=2, **X·A−A²=I₃**, con X a la izquierda. No se permuta el producto ni se calcula la inversa. |
| B3 | f(x)=x³−4x²+4x; monotonía/extremos, representación, integral indefinida y área del recinto acotado con el eje de abscisas. No se inventan límites de integración en el enunciado. |
| B4 | ln((x−1)/(x+1)) y x³·e^(2x²), sin cambiar el exponente; parábola h(x)=x²+x+1, vértice y cortes pedidos; área con eje de abscisas y rectas **x=−1/2**, x=0. No se resuelve ninguna derivada ni se adelanta un corte. |
| C5 | 5000 voluntarios sin anticuerpos; A recibe 3000, B 1500 y placebo el resto; generación 90 % y 95 %, y ninguna tras placebo según el texto. En b se condiciona a no haber generado anticuerpos y se pregunta por placebo. |
| C6 | 55 % productos electrónicos, 72 % Internet y 64 % electrónicos entre compras por Internet. Se conservan intersección, unión y condicionamiento de no Internet dado no electrónicos; no se invierte la condicionada. |
| D7 | Titulaciones Eléctrica/Informática/Civil/Mecánica/Aeronáutica: 60/40/30/50/20, muestra del 20 % proporcional. a.1 pide tipo y a.2 cantidades; b población {a,10,12,11,18}, muestras aleatorias simples de tamaño 3 y media de medias 13.2. No se calcula a ni se anticipa el tipo de muestreo solicitado. |
| D8 | Muestra aleatoria de 100 personas mayores de edad, 45 contrarias a la central; confianza 92 %. En b se mantienen proporción y confianza, con error **inferior al 5 %**. Se preserva la cota estricta y la población de referencia. |

Las fórmulas se componen en LaTeX; las aperturas de interrogación usan `\textquestiondown{}`. Se adaptan saltos de línea y márgenes sin alterar datos. No se requieren figuras propias: las gráficas se piden al estudiante y no se dibujan ahora como respuesta.

## Verificación técnica

**17 pruebas superadas en 13.628 segundos**, catálogo válido con **56 ejercicios** y **215 huellas originales coincidentes**. Las 56 soluciones contienen sólo comentarios. Los 48 enunciados, 48 soluciones y doce PDF previos mantienen sus huellas. El [control L007](L007_control.json) conserva resultados y SHA-256.

El borrador tiene cinco páginas. La salida final de preguntas tiene **cuatro páginas** y la combinada **cinco**; las nueve páginas finales están revisadas visualmente. Todos los apartados quedan íntegros y legibles. No hay desbordamientos, caracteres ausentes, referencias indefinidas ni errores de LaTeX detectados. El modo de preguntas no muestra avisos de solución; el combinado muestra ocho avisos de solución pendiente y ninguna respuesta.

Compilación local con Tectonic 0.17.0 y recursos en caché, sin acreditar una ejecución del servicio Overleaf. Configuración normal: `IncluirBorradores=no`. ZIP extraído y compilado en carpeta independiente sin consultar los PDF originales; ambas salidas coinciden byte a byte con la entrega y también se reproduce exactamente el PDF de enunciados de L006. Se han comprobado los filtros reales: A devuelve 1-2, B 3-4, C 5-6 y D 7-8; el filtro de opción A no devuelve ejercicios de L007.

| Entrega | Archivo |
|---|---|
| Preguntas | [PDF de enunciados](../../output/pdf/l007-ordinaria-2021-enunciados.pdf) |
| Modo combinado pendiente | [PDF con avisos de soluciones pendientes](../../output/pdf/l007-ordinaria-2021-con-soluciones-pendientes.pdf) |
| Entradas | [l007-enunciados.tex](../../l007-enunciados.tex) y [l007-con-soluciones.tex](../../l007-con-soluciones.tex) |
| Selección | [l007-ordinaria-2021.tex](../../selecciones/l007-ordinaria-2021.tex) |
| Proyecto | [ZIP para Overleaf](../../dist/Selectividad_Overleaf.zip) |

## Diario y siguiente lote

`L007 · feat/review/build/test/docs` — Confirmados curso y convocatoria; ocho ejercicios por bloques transcritos y clasificados, con numeración global, instrucción de elección y puntos anidados conservados. Segunda pasada de cotejo, 17 pruebas y nueve páginas finales revisadas. Cero soluciones redactadas; anteriores intactos. ZIP reproducido de forma independiente; siete de 84 candidatos cerrados, 77 pendientes. Sin commit de Git.

**Siguiente: L008**, candidato `SRC-BA1C2B38E5F9`, archivo `ORD_SUPLENTE_Modelo-4-Enunciados (Mat-Ap-2021).pdf` de la carpeta mixta. Confirmar curso, convocatoria y modelo sobre la fuente antes de asignarlos; no deducir el modelo sólo del nombre. Véase la [cola](../LOTES_DE_TRANSCRIPCION.md).

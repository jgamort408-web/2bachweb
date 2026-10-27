# L021: archivo reserva_a_EXAMEN 3, curso 2016-2017

Fecha: 2026-10-27. **Cerrado: transcripción, cotejo, clasificación y controles técnicos.** D0021 / EXA-0021.

## Plan de la tanda

- [x] Revisar visualmente dos páginas de examen y una de criterios; confirmar año y procedencia.
- [x] Guardar 360 huellas anteriores: 160 enunciados, 160 soluciones y 40 PDF.
- [x] Transcribir ocho enunciados y reservar ocho soluciones de sólo comentarios.
- [x] Clasificar temas principales/secundarios, epígrafes y etiquetas.
- [x] Cotejar segunda pasada visual completa y revisar borrador compilado.
- [x] Promover estados y regenerar índice individual.
- [x] Compilar ambos modos y revisar todas sus páginas finales.
- [x] Validar catálogo, fuentes, filtros, preservación y pruebas.
- [x] Compilar ZIP aislado y comprobar entrada principal.
- [x] Cerrar informe, plan, cola y diarios; soluciones inactivas.

## Identificación y límites

Fuente SRC-86F493C506B3: `Selectividad/matematicas_aplicadas/reserva_a_EXAMEN 3-ANDALUCÍA.pdf`.
SHA-256: `0b99df3e2c9a7af0a074136b72c3d257ad9241ccc79fed32894de424481b6be2`.
Ambas cabeceras imprimen UNIVERSIDADES DE ANDALUCÍA y CURSO 2016-2017; año final 2017 confirmado. Opciones A/B, ejercicios 1-4 por opción, sin bloques. Duración 90 minutos, elegir una opción y contestar sus ejercicios. Convocatoria y modelo no indicados: vacíos. Reserva A procede sólo del nombre reserva_a; el número 3 del archivo no se interpreta como modelo sin evidencia impresa. Identificación parcialmente confirmada; requiere_revision=si por estos límites.

Criterios SRC-4DFB0FF51804: `Selectividad/matematicas_aplicadas/reserva_a_CRITERIOS 3 -ANDALUCÍA.pdf`, SHA-256 `36834b162f997c2974c4e80806e44cb4200fc30edec724b17f5873c072e5a799`. Concordantes en curso, opciones, números y puntos; no se copian respuestas ni se subdividen puntuaciones conjuntas. No hay tabla específicamente asociada: fuente_tabla vacía. Las tablas titular junio/septiembre de la carpeta genérica no se vinculan por proximidad.

## Condiciones sensibles

- A1: A=(2,4;1,−1), B=(−3,0;0,1); a A²+B³, 1 punto; b (A+B)X=A−B, 1.5. Preservar potencias, signos y orden.
- A2: B(x)=−x²+360x−18000, 50≤x≤350; a beneficio a 100 y unidades para 13500 euros bajo 0.8; b producción/máximo bajo 1; c gráfica y no pérdidas bajo 0.7. No anticipar soluciones ni extrapolar fuera del dominio.
- A3: A/B independientes, A/C incompatibles; P(A)=0.4,P(A∩B)=0.1,P(C)=0.2; a A si no B 1.25; b ni A ni C 0.75; c si no B tampoco A 0.5. Conservar redacción condicional y no cambiarla por una implicación lógica ni revelar resultados.
- A4: 300 alumnos, 210 gafas; a intervalo 97 % 1.5; b proporción previa de otros institutos 70 %, confianza 97 %, tamaño mínimo con error inferior a 0.06, 1 punto. No sustituir por proporción obtenida del apartado a aunque coincidan los datos.
- B1: y≤x+3, x+5y≥3, 2x+7y≤30, y≥0; no añadir x≥0. Punto (5,3). F=x−y, mínimos/máximos y puntos bajo 0.8. Puntos 1.2/0.5/0.8.
- B2: a/(x−1) si x<0 y x²−bx−1 si x≥0. a pide derivabilidad en 0, 1.5; conservar literal el valor de a y b, sin añadir continuidad explícita al enunciado. b a=1,b=2, tangente x=2, 1 punto.
- B3: aprobar teórico 0.8, práctico 0.6, ambos 0.5; a al menos uno, b práctico condicionado a no teórico, c independencia. Puntos 1/1/0.5; no adelantar decisión de independencia.
- B4: Normal, desviación 25 g, muestra 100, media 230 g; a intervalo 96 % 1.3; b error 0.2; c tamaño mínimo mismo nivel para que error máximo sea 2 g, 1 punto. No cambiar sea por inferior o no superior, ni imponer regla de redondeo durante transcripción.

Los ocho totales 2.5 se derivan de apartados y concuerdan con criterios; no se añaden al cuerpo. Contexto conserva la instrucción final sin su ayuda y el ámbito territorial impreso. El punto aislado fuera del recuadro de instrucciones es un resto editorial, documentado sin incorporarlo al texto de ejercicios.

## Progreso

`L021 · plan/read` — Tres páginas fuente revisadas completas con PDFium y extracción contrastada; 360 huellas anteriores guardadas. Primera consulta auxiliar usó una columna inexistente del inventario; corregida a sus campos reales antes de identificar criterios. Originales intactos, ninguna solución iniciada y sin commit de Git.

`L021 · feat/review` — Ocho enunciados cotejados en segunda pasada visual completa del mismo autor y cinco páginas de borrador revisadas. Clasificación verificada; acumulado 168 enunciados y cero soluciones.

## Indexación individual comprobada

| ID y enunciado | Principal | Secundarios | Epígrafes | Etiquetas |
|---|---|---|---|---|
| [SEL-D0021-OA-E01](../../enunciados/SEL-D0021-OA-E01.tex) | T04 | — | T04.2, T04.3, T04.4, T04.9, T04.11 | potencia-matriz, producto-matrices, matriz-inversa, ecuacion-matricial |
| [SEL-D0021-OA-E02](../../enunciados/SEL-D0021-OA-E02.tex) | T02 | T01 | T02.1, T02.2, T02.9, T01.11, T01.14, T01.15 | funcion-polinomica, optimizacion, beneficio-maximo, extremos-absolutos, representacion-grafica, alcance-valor-objetivo |
| [SEL-D0021-OA-E03](../../enunciados/SEL-D0021-OA-E03.tex) | T07 | — | T07.2, T07.6, T07.8 | independencia, incompatibilidad, interseccion-sucesos, complementario, probabilidad-condicionada |
| [SEL-D0021-OA-E04](../../enunciados/SEL-D0021-OA-E04.tex) | T09 | — | T09.7, T09.8 | intervalo-confianza-proporcion, tamano-muestral, error-estimacion, cota-estricta |
| [SEL-D0021-OB-E01](../../enunciados/SEL-D0021-OB-E01.tex) | T06 | — | T06.1, T06.2, T06.3, T06.4 | programacion-lineal, restricciones, region-factible, funcion-objetivo, viabilidad-punto, maximo-minimo, representacion-grafica |
| [SEL-D0021-OB-E02](../../enunciados/SEL-D0021-OB-E02.tex) | T01 | T02 | T01.10, T01.11, T01.12, T01.13, T01.17, T02.2, T02.3, T02.6 | funcion-a-trozos, funcion-polinomica, funcion-racional, parametros, derivabilidad, continuidad, recta-tangente |
| [SEL-D0021-OB-E03](../../enunciados/SEL-D0021-OB-E03.tex) | T07 | — | T07.2, T07.6, T07.8 | union-sucesos, interseccion-sucesos, complementario, probabilidad-condicionada, independencia |
| [SEL-D0021-OB-E04](../../enunciados/SEL-D0021-OB-E04.tex) | T09 | T08 | T08.3, T09.7, T09.8 | distribucion-normal, desviacion-conocida, media-muestral, intervalo-confianza-media, tamano-muestral, error-estimacion |

## Verificación y entrega

**Verificación L021:** 21 pruebas superadas en 39.143 s; 168 ejercicios válidos y 215 huellas originales coincidentes. Dos PDF definitivos de cuatro páginas, ocho páginas finales revisadas y ocho avisos pendientes en el combinado. Los 160 enunciados, 160 soluciones y 40 PDF anteriores conservan sus huellas. ZIP aislado compilado: ambas salidas L021 y enunciados L020 idénticos byte a byte; main.tex con texto y cuatro renderizados idénticos al PDF de preguntas. Símbolo euro conservado; finales y ZIP compilados sin red tras completar fuentes estándar de la caché. Comprobación local con Tectonic, sin acreditar servicio Overleaf.

Actualmente el generador sin filtros selecciona 168 ejercicios: ocho de 2017, 16 de 2018 y 48 de cada año 2019, 2020 y 2021. T06 recupera 21; T03, 21; T05, dos; T09 más tamano-muestral, 40. Temas principales/secundarios, epígrafes exactos, etiquetas e IDs combinables. L021: opción A/B cuatro, bloque A ninguno; T04.11 con ecuacion-matricial sólo A1, extremos-absolutos A2, viabilidad-punto B1, recta-tangente B2, independencia A3/B3 e incompatibilidad sólo A3. Tamaño con cota-estricta sólo A4; tamaño con cota-no-estricta ninguno. B4 conserva error sea 2 g sin convertirlo a cota.

Cinco páginas de borrador revisadas antes de promover estados; segunda pasada visual completa del mismo autor, separada de escritura, sin atribuir un segundo revisor distinto. El rótulo editorial inicial heredaba carpeta; se corrigió a archivo antes de las salidas definitivas y se revisó su primera página. Primer intento offline sin ts1-lmr10.tfm; descargados ese recurso y lm-ts1.enc del servidor estándar de Tectonic para conservar el euro. Finales y ZIP sólo caché, sin rutas de fuentes externas dentro del proyecto. Sin ajustes de espaciado ni desbordamientos, caracteres ausentes o referencias indefinidas en salidas finales.

[Índice individual](../../INDICE_EJERCICIOS.md) · [Guía de relaciones](../GUIA_RELACIONES.md) · [Control y huellas](L021_control.json) · [PDF preguntas](../../output/pdf/l021-reserva-a-2017-enunciados.pdf) · [PDF con avisos](../../output/pdf/l021-reserva-a-2017-con-soluciones-pendientes.pdf) · [ZIP Overleaf](../../dist/Selectividad_Overleaf.zip).

**Siguiente: L022**, fuente candidata `SRC-B5829DA89593`, archivo `Selectividad/matematicas_aplicadas/reserva_a_EXAMEN 5 -ANDALUCÍA.pdf`. Confirmar curso, año y naturaleza desde las páginas y auxiliares; no heredar el curso de L021 ni asignar modelo por el número del archivo.

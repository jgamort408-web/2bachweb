# L023: archivo reserva_b_EXAMEN 2, curso 2015-2016

Fecha: 2026-10-27. **Cerrado: transcripción, cotejo, clasificación y controles técnicos.** D0023 / EXA-0023.

## Plan de la tanda

- [x] Revisar dos páginas originales y criterio candidato; confirmar curso y rechazar asociación no concordante.
- [x] Guardar 396 huellas anteriores: 176 enunciados, 176 soluciones y 44 PDF.
- [x] Transcribir ocho enunciados completos y reservar ocho soluciones de sólo comentarios.
- [x] Clasificar por temas, secundarios, epígrafes y etiquetas, conservando el contraste histórico.
- [x] Cotejar segunda pasada visual completa y revisar borrador compilado.
- [x] Promover estados y regenerar índice individual.
- [x] Compilar ambos modos y revisar todas sus páginas finales.
- [x] Validar catálogo, originales, filtros, preservación y pruebas.
- [x] Compilar ZIP aislado y comprobar entrada principal.
- [x] Cerrar informe, plan, cola y diarios; soluciones inactivas.

## Identificación y límites

Fuente SRC-22D3DDA2D180: `Selectividad/matematicas_aplicadas/reserva_b_EXAMEN 2 -ANDALUCÍA.pdf`.
SHA-256: `8cdb86259405652622f2ea129bffbdb239076ac612fd7fcebb86b9d5bdc451ec`.
Ambas cabeceras imprimen UNIVERSIDADES DE ANDALUCÍA, PRUEBA DE ACCESO A LA UNIVERSIDAD y CURSO 2015-2016; año final 2016 confirmado. Opciones A/B con cuatro ejercicios cada una, sin bloques. Reserva B sólo del nombre reserva_b; convocatoria/modelo vacíos y número 2 sin valor de modelo acreditado. Identificación parcialmente confirmada; requiere_revision=si.

Se inspeccionó el candidato SRC-B1EA93903484, `Selectividad/matematicas_aplicadas/reserva_b_CRITERIOS 2-ANDALUCÍA.pdf`, SHA-256 `38a76fc058830e604177f9ad0ab46051d03809f5500aae45a752438e990bf4df`: imprime CURSO 2016-2017 y estructura/puntos distintos. Se rechaza su asociación con L023 pese al nombre parecido; su revisión corresponde a otra fuente candidata de la cola. Una búsqueda textual por curso y combinación de puntuaciones en criterios inventariados no identificó otro auxiliar concordante. No prueba ausencia absoluta: fuente_criterios vacía, pendiente de identificación futura. Sin tabla específicamente asociada, fuente_tabla vacía. Los ocho totales 2.5 se derivan sólo de los apartados del examen, sin acreditarlos mediante criterios ni añadirlos al texto.

## Condiciones sensibles

- A1: x+y≤20; x−y≥0; 5x−13y+8≤0, sin añadir x≥0/y≥0. Punto (3,2.5), F=x−y+6; puntos 1.5/0.4/0.6 y extremos/puntos conjuntos.
- A2: f=(x²−1)(3x³+5x)³, g=ln(3x)/e^(2x); ambas derivadas bajo 1.2. h=(3x+6)/(2x+1), tangente x=1 bajo 0.7, asíntotas si existen bajo 0.6. No cambiar potencias ni alcance de la división.
- A3: 250 estudiantes, 50 problemas visuales, 20 auditivos, independencia dada. a ambos, b ninguno, c auditivo condicionado a no visual. Puntos 0.75/0.75/1. Conservar datos sin convertirlos en probabilidades calculadas.
- A4: Normal con **varianza 2.25 cm²**, H0:μ≤11.7 cm. Diez datos 12.5,11.8,13.1,14.3,11.7,12.6,12.7,12.1,13.5,11.5 en orden. a contraste, región y confirmación al 5 % bajo 1.75 conjunto; b confirmación al 3 %, 0.75. No sustituir varianza por desviación ni significación por confianza. Contraste histórico en T09.1/T08.3 sin epígrafe específico inventado ni respuestas.
- B1: A=(2,4;−2,−6), B=(1,0,1;1,−2,0). a X(BBᵗ)=A/2−2Aᵗ, 1.5; b AB, ABᵗ, BA^−1, BᵗA+A^−1, posibilidad/dimensión bajo 1 conjunto. No anticipar compatibilidad ni invertir el orden.
- B2: f=2x²−36x+200 en miles de euros, x en miles de kilogramos. a producción mínima/coste bajo 0.8, b interpretación del signo f′(7) a siete mil kg bajo 0.8, c gráfica y producción para coste200000 euros bajo 0.9. Conservar unidades, no convertir 200000 en 200 en el cuerpo.
- B3: 300000 vuelos, terminales A/B/C 150000/100000/50000, retrasos 10/8/5 %. a no retraso, b A condicionado a retraso; 1.25/1.25. Año del relato no identifica convocatoria.
- B4: Normal, desviación16g, muestra100, media247g; a intervalo97 %, 1.5; b tamaño mínimo, error máximo0.5g inclusivo y confianza95 %, 1. No transferir confianza ni convertir cota inclusiva en estricta.

## Progreso

`L023 · plan/read` — Dos páginas de examen y una de criterio candidato revisadas con PDFium. Asociación auxiliar rechazada por curso y contenido; campos vacíos documentados. 396 huellas previas guardadas. Plan previo a transcribir; ninguna solución iniciada y sin commit de Git.

`L023 · feat/review` — Ocho enunciados cotejados en segunda pasada visual completa del mismo autor y cuatro páginas de borrador revisadas. Clasificación verificada; acumulado 184 enunciados y cero soluciones.

## Indexación individual comprobada

| ID y enunciado | Principal | Secundarios | Epígrafes | Etiquetas |
|---|---|---|---|---|
| [SEL-D0023-OA-E01](../../enunciados/SEL-D0023-OA-E01.tex) | T06 | — | T06.1, T06.2, T06.3, T06.4 | programacion-lineal, restricciones, region-factible, vertices, viabilidad-punto, funcion-objetivo, maximo-minimo, representacion-grafica |
| [SEL-D0023-OA-E02](../../enunciados/SEL-D0023-OA-E02.tex) | T01 | T02 | T01.4, T01.5, T01.6, T01.11, T01.13, T01.14, T01.15, T01.16, T02.2, T02.3, T02.4, T02.5 | reglas-derivacion, regla-producto, regla-cociente, regla-cadena, funcion-polinomica, funcion-logaritmica, funcion-exponencial, funcion-racional, recta-tangente, asintotas |
| [SEL-D0023-OA-E03](../../enunciados/SEL-D0023-OA-E03.tex) | T07 | — | T07.2, T07.6, T07.8 | independencia, interseccion-sucesos, complementario, probabilidad-condicionada |
| [SEL-D0023-OA-E04](../../enunciados/SEL-D0023-OA-E04.tex) | T09 | T08 | T09.1, T08.3 | distribucion-normal, varianza-conocida, contraste-hipotesis, contraste-unilateral-media, hipotesis-nula, region-rechazo, nivel-significacion, comparacion-significacion |
| [SEL-D0023-OB-E01](../../enunciados/SEL-D0023-OB-E01.tex) | T04 | — | T04.1, T04.2, T04.3, T04.5, T04.9, T04.11 | ecuacion-matricial, producto-matrices, matriz-traspuesta, matriz-inversa, compatibilidad-dimensiones |
| [SEL-D0023-OB-E02](../../enunciados/SEL-D0023-OB-E02.tex) | T02 | T01 | T02.1, T02.2, T02.9, T01.11, T01.14, T01.15 | funcion-polinomica, optimizacion, minimo-coste, extremos-absolutos, monotonia, interpretacion-derivada, representacion-grafica, alcance-valor-objetivo, conversion-unidades |
| [SEL-D0023-OB-E03](../../enunciados/SEL-D0023-OB-E03.tex) | T07 | — | T07.6, T07.8, T07.9, T07.10 | probabilidad-total, bayes, complementario, probabilidad-condicionada |
| [SEL-D0023-OB-E04](../../enunciados/SEL-D0023-OB-E04.tex) | T09 | T08 | T08.3, T09.7, T09.8 | distribucion-normal, desviacion-conocida, media-muestral, intervalo-confianza-media, tamano-muestral, error-estimacion, cota-no-estricta |

## Verificación y entrega

**Verificación L023:** 21 pruebas superadas en 39.337 s; 184 ejercicios válidos y 215 huellas originales coincidentes. Dos PDF definitivos de cuatro páginas, ocho páginas finales revisadas y ocho avisos pendientes en combinado. Los 176 enunciados, 176 soluciones y 44 PDF anteriores intactos. ZIP aislado compilado: ambas salidas L023 y enunciados L022 idénticos byte a byte; main.tex con texto y cuatro renderizados idénticos al PDF de preguntas. Comprobación local con Tectonic y caché, sin acreditar servicio Overleaf.

Actualmente el generador sin filtros selecciona 184 ejercicios: 16 de 2016, ocho de 2017, 16 de 2018 y 48 de cada año 2019, 2020 y 2021. T06 recupera 23; T03, 21; T05, dos; T09 más tamano-muestral, 42. L023: opción A/B cuatro, bloque A ninguno; compatibilidad-dimensiones sólo B1, interpretacion-derivada y conversion-unidades sólo B2, comparacion-significacion sólo A4. T09.1 más contraste-hipotesis sólo A4; T09.7 más contraste ninguno. Tamaño con cota-no-estricta sólo B4; tamaño con cota-estricta ninguno. IDs exactos, temas, epígrafes y etiquetas se combinan por intersección.

Cuatro páginas de borrador revisadas antes de promover estados; segunda pasada visual completa del mismo autor, separada de escritura, sin atribuir revisor distinto. Ocho páginas finales revisadas completas. Sin ajustes de espaciado, descargas ni desbordamientos, caracteres ausentes o referencias indefinidas. Todos los totales derivados del examen; no atribuir validación a criterios que se han rechazado. La ausencia de auxiliar concordante permanece como limitación de identificación, sin impedir el cotejo del texto contra las dos páginas originales.

[Índice individual](../../INDICE_EJERCICIOS.md) · [Guía de relaciones](../GUIA_RELACIONES.md) · [Control y huellas](L023_control.json) · [PDF preguntas](../../output/pdf/l023-reserva-b-2016-enunciados.pdf) · [PDF con avisos](../../output/pdf/l023-reserva-b-2016-con-soluciones-pendientes.pdf) · [ZIP Overleaf](../../dist/Selectividad_Overleaf.zip).

**Siguiente: L024**, fuente candidata `SRC-DD5A19850D89`, archivo `Selectividad/matematicas_aplicadas/reserva_b_EXAMEN 2-ANDALUCÍA.pdf`. Confirmar curso y contenido desde sus páginas; no confundirlo con el nombre casi idéntico de L023. Criterio SRC-B1EA93903484 candidato por revisar frente a ese examen, sin asociarlo automáticamente.

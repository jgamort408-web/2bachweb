# L006: curso 2018-2019, carpeta «Reserva B»

Fecha: 2026-10-22. **Cerrado: transcripción, cotejo, clasificación y controles técnicos.** Documento `D0006`, examen `EXA-0006`.

## Plan de la tanda

- [x] Revisar visualmente las dos páginas, los ocho ejercicios y los criterios auxiliares.
- [x] Confirmar el curso y distinguir reserva B de opción B y modelo.
- [x] Transcribir e indexar los ocho ejercicios completos.
- [x] Crear ocho archivos de solución de sólo comentarios.
- [x] Realizar una segunda pasada completa de cotejo contra la fuente visible.
- [x] Compilar el borrador y revisar todas sus páginas.
- [x] Verificar clasificación y promover estados editoriales.
- [x] Compilar y revisar visualmente las dos salidas finales.
- [x] Validar catálogo y originales, ejecutar pruebas y verificar la conservación anterior.
- [x] Extraer y compilar el ZIP en una carpeta independiente.
- [x] Cerrar el informe, la cola, el plan y el diario.

Fuente principal: `SRC-2A3EF72FCF2C`.
Ruta desde la raíz: `Selectividad/sel_2019_matematicas_aplicadas/Reserva B/Exámenes Matemáticas Aplicadas CCSS - A y B.pdf`.
SHA-256: `f9236ec66af0dbd3fbd0231fdcaa6d922425c04d48178ea0737073e76e8eb7d5`.

No se resuelve ningún ejercicio. A1 imprime 2.5 puntos; los otros siete totales se derivan de sus apartados. Se conservan el literal «matrix» en B1b y los nueve datos de A4b, incluido 120.

## Fuentes e identificación

La cabecera visible confirma el curso **2018-2019**: `anio=2019` es el año final. El ámbito es Andalucía, Ceuta, Melilla y centros en Marruecos. Las dos páginas muestran cuatro ejercicios de la opción A y cuatro de B. Las instrucciones conservan 90 minutos, elección de una opción completa, puntuaciones máximas, restricciones de calculadora y justificación de respuestas. No imponen un número de decimales.

`tipo_examen=reserva` y `reserva=B` proceden exclusivamente de la carpeta. Convocatoria y modelo quedan vacíos: no se confunden reserva B, opción B y modelo. La identificación sigue `parcialmente_confirmada` y se mantiene `requiere_revision=si` por estos metadatos y, en B1, por el literal documentado.

| Auxiliar | Fuente | Evidencia y límites |
|---|---|---|
| Criterios específicos | `SRC-B2846E8FFA68` | Una página; curso, opciones y puntuaciones concordantes. Sólo se contrastan estructura y puntuaciones; no se copian respuestas. |
| Tabla N(0,1) | `SRC-7BC64FBBCAB0` | Una página; tabla acumulada P(Z≤z), genérica y asociada por carpeta. SHA-256 idéntico a la tabla ya revisada de L001-L005; sin año propio. |

Las rutas y huellas están en [fuentes.csv](../../datos/fuentes.csv) y las relaciones documentales en [examenes.csv](../../datos/examenes.csv). La [cabecera e instrucciones comunes](../../recursos/comunes/EXA-0006-instrucciones.tex) distingue la regla del original de la colección didáctica de ambas opciones.

## Índice y clasificación

El [CSV maestro](../../datos/ejercicios.csv) conserva cada ejercicio completo y todos sus apartados. B2 se encuentra desde T02, T01 o T03; su integral no se separa de la función que la define.

| Ejercicio y archivo | Principal | Secundarios | Puntos originales |
|---|---|---|---|
| [A1](../../enunciados/SEL-D0006-OA-E01.tex) | T06 | — | Total 2.5 impreso. |
| [A2](../../enunciados/SEL-D0006-OA-E02.tex) | T01 | T02 | a:1; b:0.5; c:1. |
| [A3](../../enunciados/SEL-D0006-OA-E03.tex) | T07 | — | a:1.5; b:1. |
| [A4](../../enunciados/SEL-D0006-OA-E04.tex) | T09 | T08 | a:1; b:1.5. |
| [B1](../../enunciados/SEL-D0006-OB-E01.tex) | T04 | — | a:1.5; b:1. |
| [B2](../../enunciados/SEL-D0006-OB-E02.tex) | T02 | T01, T03 | a:0.75; b:0.75; c:0.5; d:0.5. |
| [B3](../../enunciados/SEL-D0006-OB-E03.tex) | T07 | — | a:0.5; b:1; c:1. |
| [B4](../../enunciados/SEL-D0006-OB-E04.tex) | T09 | — | a:1.5; b:1. |

Los otros siete totales 2.5 se obtienen por suma de apartados y se corroboran en criterios; no se añaden al texto como totales impresos. Cada opción suma 10. La recopilación no convierte ambos bloques en una prueba obligatoria de 20 puntos.

Los epígrafes y tags concretos se conservan en el CSV y se detallan a continuación. Describen lo preguntado sin incluir resultados. `dominio` se incorpora al vocabulario para A2. No se fuerzan relaciones con T05: una ecuación matricial no se reclasifica automáticamente como un sistema explícito.

### Epígrafes y etiquetas

| Ejercicio | Epígrafes | Tags |
|---|---|---|
| A1 | T06.1, T06.2, T06.3, T06.4, T06.5 | programacion-lineal, restricciones, region-factible, minimo-coste |
| A2 | T01.11, T01.13, T01.15, T02.1, T02.3 | dominio, funcion-racional, reglas-derivacion, recta-tangente |
| A3 | T07.8, T07.9, T07.10 | probabilidad-total, bayes, probabilidad-condicionada |
| A4 | T08.3, T09.4, T09.7, T09.8 | distribucion-normal, desviacion-conocida, intervalo-confianza-media, tamano-muestral, error-estimacion, cota-estricta |
| B1 | T04.3, T04.9, T04.11 | matriz-inversa, producto-matrices, ecuacion-matricial |
| B2 | T02.1, T02.2, T01.13, T01.15, T03.1, T03.2 | funcion-polinomica, monotonia, extremos-relativos, curvatura, inflexion, recta-tangente, integral-indefinida |
| B3 | T07.2, T07.6, T07.8 | diferencia-sucesos, probabilidad-condicionada, interseccion-sucesos, union-sucesos, independencia, incompatibilidad |
| B4 | T09.7, T09.8 | intervalo-confianza-proporcion, tamano-muestral, error-estimacion, cota-estricta |

## Segunda pasada de cotejo y condiciones sensibles

El cotejo se realiza en una segunda pasada visual completa, separada de la escritura, por el mismo autor. No se atribuye a un segundo revisor distinto. Se han contrastado texto, datos, unidades, signos, fórmulas, matrices, puntuaciones y todos los apartados con las dos páginas originales y el borrador compilado. No quedan discrepancias de lectura pendientes.

| Ejercicio | Elementos preservados sin resolver |
|---|---|
| A1 | UNAL aporta calcio/proteínas/calorías 5/5/1 y cuesta 0.6 euros; DOSAL, 2/5/3 y 1 euro. Mínimos diarios 10/20/6. Se conservan «Se quiere elaborar», «un coste 0.6 euros» y el contexto de comprimidos. No se añaden condiciones de integridad, redondeos o restricciones ausentes. |
| A2 | f(x)=x−(3x−1)/(x+1); el menos afecta a la fracción completa. Se piden dominio y derivada; pendiente en x=2/3; puntos con tangente horizontal. No se sustituyen estos puntos por un estudio de extremos no pedido. |
| A3 | Cada enfermo recibe un solo fármaco; A trata 30 %, B 50 % y C el resto. Curación condicionada 0.6/0.8/0.7. En b se condiciona a estar curado y se pregunta por tratamiento A. |
| A4 | Distribución Normal, desviación típica 4 y media desconocida. En a, error inferior a 2.1 kg y confianza 97 %. En b, nueve datos en este orden: **15, 120, 50, 40, 5, 46, 52, 48, 10**; confianza 97 %, intervalo para la media y error máximo. No se cambia 120 por una cifra más plausible ni se sustituye la desviación dada. |
| B1 | A=(1,1,3;1,2,−1;1,−1,−1), B columna (2,3,0). El original pide justificar la existencia de inversa y calcularla; b dice literalmente **«matrix»**, con condición «si existe» y ecuación A·X=B. No se calcula ninguna entrada de la inversa ni de X. |
| B2 | f(x)=(1/3)x³−2x²+3x+1; monotonía/extremos, concavidad/convexidad/inflexión, pendiente en x=0 e integral indefinida de f. Se conserva dx y no se añade una primitiva resuelta. |
| B3 | P(B)=0.4, P(A/B)=0.25 y P(A−B)=0.4; se mantiene la barra original de condicionamiento y la diferencia. Preguntas sobre intersección, A, unión, independencia e incompatibilidad, sin anticipar las respuestas. |
| B4 | Muestra de 320, 96 con actividad física; intervalo 95 %. En b se mantiene la proporción y se cambia a confianza 98 %, con error **inferior a 0.1**. No se transforma la cota estricta ni se cambia la escala decimal. |

La incidencia [INC-006](../../datos/incidencias.csv) documenta «matrix» para una revisión editorial futura. Conservar esa palabra acredita fidelidad; no se introduce una corrección ni un «sic» en el fragmento. La incidencia permanece abierta sin bloquear una transcripción perfectamente legible. El dato 120 está cotejado visualmente, sin calificarse como errata.

## Verificación técnica

17 pruebas superadas en **14.663 segundos**; catálogo válido con **48 ejercicios** y **215 huellas originales coincidentes**. Las 48 soluciones contienen sólo comentarios. Los 40 enunciados, 40 soluciones y diez PDF anteriores mantienen sus SHA-256. El [registro de control](L006_control.json) conserva resultados y huellas.

El borrador tiene cuatro páginas. Las dos salidas finales también tienen cuatro páginas cada una; sus ocho páginas se han revisado visualmente. El texto, las fórmulas y los apartados están completos; A4 queda íntegro en una página final. No hay desbordamientos, caracteres ausentes, referencias indefinidas ni errores de LaTeX detectados. La variante de preguntas no presenta avisos de solución; la combinada tiene ocho avisos de solución pendiente y ninguna respuesta.

La compilación se realiza localmente con Tectonic 0.17.0 y recursos en caché. No acredita una ejecución en el servicio Overleaf. La configuración normal mantiene `IncluirBorradores=no`. El ZIP se ha extraído y compilado en carpeta independiente, sin consultar los PDF originales: las dos salidas de L006 coinciden byte a byte con las entregadas; también se reproduce exactamente el PDF de enunciados de L005. Las evidencias están en el registro de control.

| Entrega | Archivo |
|---|---|
| Sólo preguntas | [PDF de enunciados](../../output/pdf/l006-reserva-b-2019-enunciados.pdf) |
| Modo combinado pendiente | [PDF con avisos de soluciones pendientes](../../output/pdf/l006-reserva-b-2019-con-soluciones-pendientes.pdf) |
| Entradas de composición | [l006-enunciados.tex](../../l006-enunciados.tex) y [l006-con-soluciones.tex](../../l006-con-soluciones.tex) |
| Selección | [l006-reserva-b-2019.tex](../../selecciones/l006-reserva-b-2019.tex) |
| Proyecto modular | [ZIP para Overleaf](../../dist/Selectividad_Overleaf.zip) |

## Diario y siguiente lote

`L006 · feat/review/build/test/docs` — Ocho ejercicios completos transcritos, cotejados en segunda pasada y clasificados; B2 permanece multitema. Cero soluciones redactadas. 17 pruebas y ocho páginas finales revisadas. Originales y entregas anteriores intactos. ZIP reproducido de forma independiente; seis de 84 candidatos cerrados, 78 pendientes. Sin commit de Git.

**Siguiente: L007**, candidato `SRC-FBFCFE3C7E1A`, de la carpeta mixta `matematicas_aplicadas`, según la [cola](../LOTES_DE_TRANSCRIPCION.md). La ruta contiene `ORD_TITULAR_MATEMÁTICAS APLICADAS CCSS-JUNIO-IMPRESO.pdf` y la cola apunta a 2021 provisionalmente: confirmar el año en la cabecera y la estructura antes de transcribir. No se eleva el candidato a año confirmado.

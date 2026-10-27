# L001 · Curso 2018–2019 · Carpeta «Titular Junio»

**Fecha de registro:** 22 de octubre de 2026.  
**Documento:** `D0001` · **Examen:** `EXA-0001`.  
**Alcance:** primera pasada de transcripción, cotejo independiente y clasificación de los ocho ejercicios de las opciones A y B. No se han redactado soluciones.

## 1. Resultado y estado del lote

- [x] Identificar las dos opciones y sus cuatro ejercicios originales por opción.
- [x] Transcribir los ocho enunciados con sus fórmulas, datos, condiciones, preguntas y puntuaciones originales.
- [x] Cotejar el texto de forma independiente con las dos páginas originales.
- [x] Verificar tema principal, temas secundarios, epígrafes y tags de cada ejercicio.
- [x] Conservar los ocho archivos de solución únicamente con comentarios: estado `no_redactada`, cero respuestas y ocho huellas iguales a las de partida.
- [x] Comprobar integridad del catálogo y las 215 fuentes originales mediante SHA-256.
- [x] Superar las 17 pruebas de catálogo, selección y empaquetado.
- [x] Compilar localmente con Tectonic 0.17.0.
- [x] Cerrar la inspección visual de las ocho páginas finales: cuatro de enunciados y cuatro del modo con soluciones pendientes.
- [x] Extraer el ZIP en una carpeta aislada y recompilar sus dos entradas sin acceso a los originales: ambos PDF coinciden byte a byte con las salidas inspeccionadas.

En el [catálogo de ejercicios](../../datos/ejercicios.csv), los ocho registros tienen `estado_transcripcion=cotejada`, `estado_clasificacion=verificada` y `estado_solucion=no_redactada`. Se mantiene `requiere_revision=si` por la identificación documental pendiente: «junio» y «titular» proceden de la carpeta y el PDF no indica número de modelo. Esta advertencia de metadatos no invalida el cotejo de los enunciados.

El lote cubre contenidos de ocho de los nueve temas de la asignatura. No aparece un ejercicio del tema T05, Sistemas de ecuaciones; no se fuerza esa relación para completar artificialmente la cobertura.

## 2. Fuentes y procedencia

Los archivos originales permanecen fuera del proyecto de Overleaf. Las relaciones y sus huellas están registradas en [fuentes.csv](../../datos/fuentes.csv) y [examenes.csv](../../datos/examenes.csv).

| Función documental | Identificador | Evidencia y alcance |
|---|---|---|
| Enunciados, dos páginas | `SRC-350C1197B6C0` | Cabecera de Matemáticas Aplicadas a las Ciencias Sociales II, curso 2018–2019; opciones A y B con cuatro ejercicios cada una. |
| Criterios de corrección, una página | `SRC-65137A02DDEC` | Misma cabecera, asignatura y curso; las opciones, ejercicios y puntuaciones concordantes respaldan la asociación. Se han consultado como auxiliar, sin transcribir respuestas ni incorporarlas a los archivos de solución. |
| Tabla normal estándar, una página | `SRC-C10FF55F8931` | Tabla acumulada `P(Z ≤ z)` de `N(0,1)`, asociada por estar en la misma carpeta. Es un documento genérico sin año o convocatoria propios acreditados. Su repetición en otras carpetas no convierte cada copia en un examen distinto. |

**SHA-256 del PDF de enunciados:**

```text
fa0cbbddfdf34b1f9fcf8d1090c2d0c3f13e5353e06da22ec354d3345e313584
```

### Identificación confirmada y límites

- El curso `2018-2019` aparece impreso; `anio=2019` corresponde al año final de ese curso.
- El ámbito impreso es Andalucía, Ceuta, Melilla y centros en Marruecos.
- `convocatoria=junio` y `tipo_examen=titular` proceden de la carpeta «Titular Junio». No se presentan como datos confirmados por el encabezado del PDF.
- El número de modelo queda vacío, con `modelo_estado=no_indicado_en_pdf_revisado`. Las opciones A y B no son números de modelo.
- La identificación del examen continúa `parcialmente_confirmada` hasta contrastar la denominación de convocatoria y tipo con una fuente que los indique expresamente.

## 3. Índice de ejercicios y clasificación

Los nombres de los temas están en [temas.csv](../../datos/temas.csv), los epígrafes en [epigrafes.csv](../../datos/epigrafes.csv) y el vocabulario de contenidos en [tags.csv](../../datos/tags.csv). Las siguientes relaciones reproducen el catálogo de este lote.

| ID y archivo de enunciado | Tema principal | Temas secundarios | Epígrafes verificados | Puntuación y apartados originales |
|---|---|---|---|---|
| [SEL-D0001-OA-E01](../../enunciados/SEL-D0001-OA-E01.tex) | T06 | — | T06.1, T06.2, T06.3, T06.4, T06.5 | 2.5 puntos impresos como total; sin apartados rotulados. |
| [SEL-D0001-OA-E02](../../enunciados/SEL-D0001-OA-E02.tex) | T01 | T02, T03 | T01.13, T02.1, T02.2, T03.1, T03.2 | a: 1; b: 1; c: 0.5. Total del índice: 2.5, derivado de la suma. |
| [SEL-D0001-OA-E03](../../enunciados/SEL-D0001-OA-E03.tex) | T07 | — | T07.7, T07.8, T07.9, T07.10 | a: 1.5; b: 1. Total del índice: 2.5, derivado de la suma. |
| [SEL-D0001-OA-E04](../../enunciados/SEL-D0001-OA-E04.tex) | T09 | — | T09.7, T09.8 | a: 1.5; b: 1. Total del índice: 2.5, derivado de la suma. |
| [SEL-D0001-OB-E01](../../enunciados/SEL-D0001-OB-E01.tex) | T04 | — | T04.3, T04.4, T04.5, T04.9, T04.11 | a: 0.5; b: 1; c: 1. Total del índice: 2.5, derivado de la suma. |
| [SEL-D0001-OB-E02](../../enunciados/SEL-D0001-OB-E02.tex) | T01 | T02 | T01.10, T01.12, T01.17, T02.1, T02.6 | a: 1; b: 1.5. Total del índice: 2.5, derivado de la suma. |
| [SEL-D0001-OB-E03](../../enunciados/SEL-D0001-OB-E03.tex) | T07 | — | T07.2, T07.6, T07.8 | a: 0.75; b: 1; c: 0.75. Total del índice: 2.5, derivado de la suma. |
| [SEL-D0001-OB-E04](../../enunciados/SEL-D0001-OB-E04.tex) | T09 | T08 | T08.3, T09.4, T09.7, T09.8 | a: 1.5; b: 1. Total del índice: 2.5, derivado de la suma. |

Cada opción suma 10 puntos. La regla original exige elegir una de las dos opciones y contestar los ejercicios de esa opción: los ocho ejercicios del banco no forman conjuntamente un examen obligatorio de 20 puntos. Excepto A1, no se ha añadido a los enunciados un total de 2.5 que la fuente no imprime como cabecera de ejercicio.

### Tags de contenido

| Ejercicio | Tags |
|---|---|
| A1 | `programacion-lineal`, `restricciones`, `region-factible`, `beneficio-maximo` |
| A2 | `recta-tangente`, `paralelismo`, `funcion-polinomica`, `monotonia`, `curvatura`, `integral-indefinida` |
| A3 | `probabilidad-condicionada`, `probabilidad-total`, `bayes`, `experimento-compuesto` |
| A4 | `intervalo-confianza-proporcion`, `tamano-muestral`, `error-estimacion`, `cota-estricta` |
| B1 | `matriz-simetrica`, `matriz-inversa`, `potencia-matriz`, `ecuacion-matricial` |
| B2 | `funcion-a-trozos`, `parametros`, `continuidad`, `derivabilidad`, `monotonia`, `curvatura`, `inflexion` |
| B3 | `union-sucesos`, `complementario`, `probabilidad-condicionada`, `interseccion-sucesos` |
| B4 | `distribucion-normal`, `intervalo-confianza-media`, `desviacion-conocida`, `tamano-muestral`, `cota-estricta` |

Estos tags identifican conceptos preguntados o datos del enunciado; no contienen resultados. Por ejemplo, `matriz-simetrica` clasifica la pregunta sobre simetría de B1 y no afirma que la matriz lo sea. El título descriptivo se mantiene neutral: «Simetría, inversa y ecuación matricial».

### Decisiones de clasificación comprobadas

- A2 combina tangentes, estudio de funciones y una integral indefinida. T03 debe poder encontrar este ejercicio aunque su tema principal sea T01.
- T02.1 aporta la relación explícita con el estudio de monotonía y curvatura en A2 y B2. B2 se clasifica como función a trozos; no se etiqueta toda la función como polinómica.
- A3 relaciona probabilidad condicionada, total y Bayes con experimentos compuestos, sin introducir hipótesis adicionales.
- B4 declara distribución normal y desviación típica poblacional conocida. T08.3 queda como relación secundaria explícita; no se presupone que una muestra de nueve datos se justifique por ser grande.

## 4. Cotejo de fidelidad

Se han conservado los encabezados y los apartados originales, el orden de los datos, las unidades, los puntos decimales y las condiciones verbales. Los ajustes de espaciado y de saltos de línea propios de LaTeX no cambian su contenido.

| Ejercicio | Elementos sensibles contrastados, sin resolver |
|---|---|
| A1 | Recursos de 4 200 g y 800 g; consumos 70/20 y 60/10; al menos 10 estampadas; el doble de estampadas al menos igual al número de lisas; beneficios unitarios 5 y 4 euros. |
| A2 | `f(x)=x³−9x+2`; tangentes paralelas a `y=3x−3`; monotonía y curvatura; integral indefinida sin extremos. |
| A3 | 65 %, 75 % y 15 % en sus poblaciones correspondientes; hoteles frente a apartamentos; pregunta condicionada por el alojamiento en apartamento. |
| A4 | Muestra aleatoria de 300 personas, 135 respuestas indicadas; confianza del 97 %; conservación de proporción y confianza; error estrictamente inferior al 2 %. |
| B1 | Las nueve entradas y sus signos; orden del producto `2X·A`; potencias, `3I₃` y letra `O` mayúscula en el segundo miembro. |
| B2 | `1/(x−1)` si `x<0` y `x²+a` si `x≥0`; continuidad en todo el dominio; el apartado b fija `a=−2` de forma independiente. |
| B3 | 69 %, 35 % y 18 %; «ni series ni películas», «series o películas» y «series y no películas»; sentido de la probabilidad condicionada. |
| B4 | Desviación típica 8 minutos; nueve datos en orden: 10, 17, 8, 27, 6, 9, 32, 5, 21; confianza del 92 % y del 95.5 %; error estrictamente inferior a 1.5 minutos. |

Las instrucciones generales figuran en [EXA-0001-instrucciones.tex](../../recursos/comunes/EXA-0001-instrucciones.tex): duración de 90 minutos, elección de una opción completa y reglas de uso de calculadoras. Si un resultado se obtiene directamente con calculadora, la fuente exige explicar los pasos necesarios sin ella y justificar las respuestas. No prescribe un número fijo de decimales.

## 5. Verificación técnica y PDF

### Controles de catálogo y preservación

- **17 pruebas superadas:** selección por tema principal y secundario, combinación de tags, filtros documentales, IDs de opción/bloque/sin agrupación, conservación del número original, protección de rutas, estados, soluciones pendientes, registro actualizado y ZIP reproducible.
- **215 fuentes comprobadas:** presencia y coincidencia de sus SHA-256 con el inventario.
- **Ocho soluciones preservadas:** sus archivos siguen conteniendo sólo comentarios, sin respuestas ni desarrollos; se ha comprobado que conservan las huellas de partida.
- **Compilación local:** Tectonic 0.17.0. Esta comprobación no equivale a una ejecución en la plataforma real de Overleaf.
- **Paquete autónomo:** los dos documentos recompilados desde el ZIP extraído, sin las fuentes externas, son idénticos byte a byte a los PDF revisados.

### Salidas y revisión visual final

**Inspección final completada:** cuatro páginas de enunciados y cuatro páginas del modo con soluciones pendientes. Se han visto y cotejado las ocho páginas finales con la fuente. El modo combinado muestra ocho avisos de solución pendiente y no contiene respuestas. Antes de esta revisión final también se inspeccionaron las cuatro páginas del borrador de enunciados para la etapa de cotejo.

No se detectaron fórmulas cortadas, datos cambiados, matrices partidas entre páginas ni defectos visuales. Los registros de compilación no presentan desbordamientos, caracteres ausentes o referencias indefinidas. El [registro de control del lote](L001_control.json) conserva las huellas de las salidas, las entradas LaTeX y las ocho soluciones preservadas.

| Salida verificada del lote | Archivo |
|---|---|
| Sólo enunciados | [PDF de enunciados](../../output/pdf/l001-junio-2019-enunciados.pdf) |
| Enunciados con aviso explícito de soluciones pendientes | [PDF con soluciones pendientes](../../output/pdf/l001-junio-2019-con-soluciones-pendientes.pdf) |
| Entrada LaTeX de sólo enunciados | [l001-enunciados.tex](../../l001-enunciados.tex) |
| Entrada LaTeX del modo con soluciones | [l001-con-soluciones.tex](../../l001-con-soluciones.tex) |
| Proyecto modular para cargar en Overleaf | [Selectividad_Overleaf.zip](../../dist/Selectividad_Overleaf.zip) |

El modo con soluciones debe mostrar que están pendientes. No convierte los comentarios de sus archivos en respuestas ni presenta el lote como resuelto.

## 6. Diario y siguiente lote

**`L001 · transcribir y clasificar 2019 / carpeta Titular Junio`** — Ocho fragmentos separados por ID; cabecera e instrucciones comunes; cotejo independiente completo; clasificación verificada y metadatos no acreditados señalados. Se mantienen las fuentes originales y las ocho soluciones sin redactar.

**Siguiente: L002 · 2019 / carpeta «Titular Septiembre».** Seguir el mismo orden: identificar el documento y sus auxiliares, asignar IDs estables, transcribir todos los enunciados, cotejarlos, clasificar temas/epígrafes/tags, validar y revisar la salida compilada. La escritura de soluciones continúa fuera de esta primera fase y requerirá sus propias pasadas de revisión matemática y didáctica.

# Diccionario de datos del banco de Selectividad

Fecha de preparación: 2026-10-22. Este documento describe los CSV de `datos/` y las reglas que deben conservar las siguientes pasadas.

## 1. Qué está preparado y qué está pendiente

**L001-L084 cerradas: 640 enunciados únicos cotejados y 640 clasificaciones verificadas.** Son 83 exámenes canónicos y 84 de 84 candidatos cerrados; ninguno pendiente de transcripción. L057 es una reedición sin ejercicios nuevos. L084 añade ocho enunciados desde DOC convertidos, curso 2011-2012 impreso. S001-S011 incorporan 80 soluciones validadas;560 siguen sin redactar. La transcripción completa permanece intacta.

En L005-L056 y L058-L084, el cotejo consta de segundas pasadas visuales completas del mismo autor, separadas de la escritura; no se atribuye a un segundo revisor distinto. L001-L004 conservan sus propias evidencias de revisión.

Los primeros dieciocho exámenes conservan límites de identificación documentados. L001-L004 tienen convocatoria/tipo de carpeta; L005/L006, reserva y letras de carpeta con convocatoria vacía. L007 confirma ordinaria y curso 2020-2021; L010 confirma extraordinaria y ese curso. L008/L009/L011/L012 sólo imprimen curso: convocatoria y tipo proceden de nombres. L012 conserva reserva B sólo con evidencia del nombre. **L013-L018 confirman curso 2019-2020; convocatoria, tipo, reserva y modelo quedan vacíos.** Los sufijos A-F de P_A/P_B/P_C/P_D/P_E/P_F no acreditan modelos ni opciones; tampoco hay tabla específicamente asociada para estos seis. Todos mantienen modelo vacío, identificación parcialmente confirmada y requiere_revision=si por esos límites. INC-006 conserva matrix de L006; INC-007, (1 puntos) de L015. L010 tiene tabla normal en su página 3. Las fechas del relato, como caducidad 2021 en C6 de L014, no datan el examen.

L007-L018 usan cuatro bloques A-D y números globales 1-8, sin opciones. Sus IDs son BA-E01/E02, BB-E03/E04, BC-E05/E06 y BD-E07/E08 por documento. El original exige cuatro ejercicios de al menos tres bloques y corrige los cuatro primeros que cumplen la regla; la colección reúne ocho para consulta, sin imponer esa regla a la selección didáctica. En L016 A1 imprime total 2.5, sin apartados; otros siete totales derivados de apartados y concordantes con criterios, sin añadir totales al cuerpo. B3 conserva dos derivadas bajo 1.2 y tangentes más corte bajo 1.3; B4a y D7a conservan sus preguntas con puntuación conjunta.

La selección inicial carga `selecciones/l084-examen6-2012.tex`,lista l084-ids.tex y contexto EXA-0084. Entradas l084-enunciados.tex y l084-con-soluciones.tex; anteriores conservadas y632 soluciones pendientes, con8 validadas. En relaciones nuevas vaciar ContextoSeleccion según la guía.

## 2. Formato común

- CSV con separador coma y codificación UTF-8 con BOM para facilitar su apertura en hojas de cálculo.
- Una fila de cabecera, nombres de columnas sin alterar y un registro por entidad.
- Las comas, comillas y saltos de línea de un campo se protegen mediante las reglas del formato CSV. No separar columnas mediante sustituciones manuales de texto.
- Las listas internas usan `|`: `T01|T03`, `a|b|c` o `A|B`. Una celda vacía significa desconocido, no indicado o no aplicable; el contexto y las observaciones deben distinguirlos. Nunca significa cero.
- Los números de puntuación usan punto decimal (`2.5`); la transcripción LaTeX conserva la notación que aparece en el original.
- Los identificadores y las etiquetas distinguen valores completos. Evitar coincidencias parciales: `T01` es una unidad distinta de cualquier otro código.
- Los datos derivados que aparecen repetidos en ejercicios y exámenes deben coincidir. El registro de examen es la referencia para sus metadatos comunes.

## 3. Relaciones e identificadores estables

```text
fuentes.csv (archivo físico y su huella)
        -> examenes.csv (examen/documento canónico)
                -> ejercicios.csv (ejercicio completo)
                        -> enunciados/<ejercicio_id>.tex
                        -> soluciones/<ejercicio_id>.tex
                        -> temas, epígrafes, etiquetas y recursos
incidencias.csv -> fuente y, cuando exista, ejercicio concreto
```

| Identificador | Alcance y regla |
| --- | --- |
| `SRC-350C1197B6C0` | Archivo físico inventariado. El script actual obtiene los 12 primeros caracteres hexadecimales del SHA-256 de su ruta UTF-8, en mayúsculas. **No es la huella del contenido.** Renombrar la ruta cambia este identificador automático; requiere una migración explícita de referencias. |
| `D0001` | Documento canónico de enunciados. Se asigna una vez y no se renumera al añadir archivos, confirmar un año o cambiar una clasificación. Las copias exactas no deben generar otro banco de ejercicios. |
| `EXA-0001` | Registro editorial de examen. Se relaciona explícitamente con `documento_id`; no se deduce de la posición actual de la fila. Un archivo que reúna varios exámenes deberá delimitarse editorialmente y documentar sus páginas. |
| `SEL-D0001-OA-E01` | Ejercicio 1 de la opción A del documento D0001. `OB` representa la opción B. |
| `SEL-D0002-BA-E01` | Ejercicio 1 del bloque A; `BB`, `BC` y `BD` corresponden a los demás bloques. La B inicial significa bloque, no opción B. Se mantiene el número original, aunque sea global en los ocho ejercicios. |
| `SEL-D0003-NA-E01` | Ejercicio sin opción ni bloque aplicables. `NA` no se usa para ocultar una identificación aún desconocida: esa duda se resuelve antes de fijar el ID. |
| `INC-001` | Incidencia editorial o de lectura. Identificador único que no se reutiliza después de cerrar la incidencia. |

El ID del ejercicio no contiene año, convocatoria, modelo, tema ni etiqueta: esos datos pueden confirmarse o cambiar sin renombrar los `.tex`. No reasignar un ID a otro enunciado. Si se descubre un error en la identificación de opción/bloque/número, conservar un registro de la corrección y de las rutas anteriores; nunca sustituir silenciosamente el contenido.

## 4. Rutas, huellas y procedencia

Hay dos bases de rutas deliberadamente diferentes:

| Campo o recurso | Base de la ruta | Ejemplo |
| --- | --- | --- |
| `fuentes.ruta`, `examenes.ruta_original` y las referencias de procedencia a originales | Raíz del espacio de trabajo, donde están las carpetas hermanas `Selectividad/` y `Selectividad_LaTeX/` | `Selectividad/sel_2019_matematicas_aplicadas/Titular Junio/Exámenes Mat Apli CCSS A y B.pdf` |
| `temas.fuente` | La misma raíz del espacio de trabajo | `Temario completo/Guion_Temario_Matematicas_CC_Sociales_II_2Bach.md` |
| `ruta_enunciado`, `ruta_solucion`, `rutas_recursos` | Raíz de `Selectividad_LaTeX/` | `enunciados/SEL-D0001-OA-E01.tex` |

Desde `Selectividad_LaTeX/`, el original del ejemplo se abre como `../Selectividad/sel_2019_matematicas_aplicadas/Titular Junio/Exámenes Mat Apli CCSS A y B.pdf`. La referencia al temario se abre como `../Temario completo/Guion_Temario_Matematicas_CC_Sociales_II_2Bach.md`. No anteponer `../` a los valores ya guardados en el inventario: se aplica al resolverlos desde esta carpeta, no al cambiar su significado.

El proyecto exportado a Overleaf usará los `.tex` y los recursos internos. La procedencia puede apuntar al archivo externo conservado localmente, pero la compilación no debe exigir acceso a `../Selectividad/` ni a rutas absolutas del ordenador.

`sha256` y `fuente_sha256` son 64 caracteres hexadecimales de la huella de los **bytes originales**. No reemplazarlos por la huella de una conversión, una imagen o una extracción de texto. Una modificación de bytes obliga a detener el cotejo de esa versión y registrar la diferencia. Las copias convertidas y los recursos derivados tendrán su propia procedencia y huella en su registro de lote.

## 5. `fuentes.csv`: archivos físicos

| Columna | Contenido y validación |
| --- | --- |
| `fuente_id` | Clave única de archivo físico, `SRC-…`; no reutilizar para una ruta distinta. |
| `ruta` | Ruta original completa relativa a la raíz del espacio de trabajo, con `/`. Debe existir. |
| `nombre` | Nombre literal del archivo, con extensión; no normaliza ni corrige el original. |
| `extension` | Extensión en minúscula, por ejemplo `.pdf` o `.doc`. |
| `tipo_por_nombre` | Primera clasificación: `examen`, `criterios`, `tabla` u `otro`. Es una pista obtenida del nombre, no una confirmación del contenido. |
| `clasificacion_estado` | Evidencia de esa pista: `indicada_en_nombre`, `convencion_nombre_pendiente_cotejo` o `pendiente_cotejo`. No equivale a una revisión visual del documento. |
| `anio_ruta` | Años literales detectados en la ruta/nombre, separados por `|`. No confirma el año del examen. |
| `anio_confirmado` | Año acreditado visualmente; vacío en el inventario automático inicial. Conservar la confirmación humana en el registro editorial antes de regenerar. |
| `anios_detectados_texto` | Candidatos de todas las páginas extraídas. Pueden pertenecer a un problema, una cabecera oculta o a otro curso. No promover automáticamente a año confirmado. |
| `bytes` | Tamaño del original en bytes, entero positivo. |
| `sha256` | Huella SHA-256 del contenido del original. |
| `paginas_pdf` | Número físico de páginas del PDF. En DOC permanece vacío hasta una conversión documentada; vacío no significa cero. |
| `duplicado_de` | `fuente_id` de la primera ruta ordenada con contenido exactamente idéntico, si es una copia adicional. No elimina el archivo ni confirma una equivalencia editorial. |
| `grupo_duplicado` | `DUP-` más el prefijo de la huella compartida. Todos los miembros de una copia exacta pertenecen al mismo grupo. |
| `estado_extraccion` | `texto_extraible`, `texto_parcial_o_escaneado`, `error_lectura_pdf`, `doc_heredado_sin_convertir` o `formato_no_inspeccionado`. Describe lectura técnica, no fidelidad matemática. |
| `notas` | Advertencias técnicas, páginas sin texto, ambigüedades de nombre y detalles de lectura. |

**Regeneración:** `scripts/inventariar_fuentes.py` reescribe este CSV y el informe automático. Deja `anio_confirmado` vacío deliberadamente. No guardar una confirmación humana únicamente en una celda que la siguiente ejecución borrará; mantener evidencia en `examenes.csv` y registrar el lote. No alterar el script o el original para hacer coincidir una hipótesis de clasificación.

## 6. `examenes.csv`: examen y metadatos comunes

| Columna | Contenido y validación |
| --- | --- |
| `examen_id` | Clave editorial única `EXA-0001`. |
| `documento_id` | Documento canónico `D0001`; enlaza con todos sus ejercicios. |
| `fuente_id` | Original principal de enunciados; debe existir en `fuentes.csv`. |
| `fuente_sha256` | Huella exacta de la versión revisada de ese original. Debe coincidir con el inventario. |
| `ruta_original` | Ruta del original desde la raíz del espacio de trabajo; coherente con `fuente_id`. |
| `anio` | Año de celebración atribuido al examen. Si solo se acredita el curso, documentar que se usa su año final; no confundir con una fecha de un enunciado. |
| `curso` | Curso académico legible, por ejemplo `2018-2019`. Conservar evidencia de su cabecera. |
| `convocatoria` | Denominación acreditada, por ejemplo `junio`, `septiembre`, `ordinaria` o `extraordinaria`. No convertir junio/julio a otra denominación sin evidencia; la fuente y las observaciones precisan su estado. |
| `tipo_examen` | `titular`, `suplente`, `reserva` o vacío si no está determinado. No se deduce de una opción interna. |
| `reserva` | Letra/nombre de reserva cuando proceda (`A`, `B`); independiente de opción y bloque. |
| `modelo` | Identificador de modelo confirmado, conservando su carácter textual. Vacío si no se acredita; no usar `A` por ver opción A ni `1` por ver `Ua1`. |
| `modelo_literal` | Texto literal de modelo encontrado, útil cuando aún falta interpretar su significado. No inventa la confirmación. |
| `opciones` | Opciones presentes, por ejemplo `A|B`; vacío si el examen funciona por bloques u otra estructura. |
| `bloques` | Bloques presentes, por ejemplo `A|B|C|D`; distinto de `opciones`. |
| `duracion_minutos` | Duración literal convertida a minutos, por ejemplo 90; vacío si no indicada. |
| `regla_eleccion` | Instrucciones originales de elección suficientemente completas: opción íntegra o cuatro ejercicios de al menos tres bloques, etc. No imponer esa regla automáticamente a una colección didáctica personalizada. |
| `estado_identificacion` | Situación editorial global: el piloto está `parcialmente_confirmada`, con año visible pero convocatoria/tipo procedentes de carpeta y modelo no indicado. La confirmación final exige evidencias separadas. |
| `evidencia_anio` | Página y texto visible que acreditan año/curso, o explicación de la duda. |
| `evidencia_convocatoria_tipo` | Procedencia concreta de convocatoria y tipo: cabecera, carpeta u otro documento. Indicar si todavía es un dato de ruta. |
| `evidencia_modelo` | Lugar donde aparece el modelo o constancia de que no está indicado en las páginas revisadas. |
| `fuente_criterios` | `fuente_id` del criterio asociado; comprobar correspondencia, no solo parecido del nombre. Su existencia no significa que se haya redactado una solución. |
| `fuente_tabla` | `fuente_id` de la tabla estadística auxiliar asociada, si corresponde. |
| `recuento_ejercicios` | Número de ejercicios completos, sumando todas las opciones/bloques; no número de apartados. |
| `estado_recuento` | `pendiente`, `estimado_por_extraccion` o `verificado_visualmente`. El piloto tiene ocho ejercicios verificados visualmente. |
| `observaciones` | Ambigüedades, delimitación de páginas, relaciones entre archivos y decisiones editoriales justificadas. |

En L005, los ocho totales 2.5 se derivan de sus apartados. A1 es un solo ejercicio mixto: T04 principal por 1.5 puntos y T06 secundario por 1 punto. La convocatoria permanece vacía; tipo reserva y letra A sólo provienen de carpeta. `estimacion-puntual` describe una petición de B4, sin aportar resultados. Se preservan cotas, dominios y decimales tal como se ven en la fuente.

En L006, A1 imprime el total 2.5; los otros siete totales se derivan de apartados. Se mantienen el literal matrix de B1b (INC-006), el dato 120 de A4b, P(A/B) de B3 y las cotas estrictas originales. B2 conserva su integral y se relaciona con T02, T01 y T03. La nueva etiqueta dominio no anticipa resultados.

L007: bloques A-D, opción vacía y números globales 1-8. E1 imprime 2.5; los restantes totales se derivan de apartados. D7a reúne dos cuestiones bajo un único 1.5. La convocatoria ordinaria está impresa, mientras titular/junio y Modelo-2 sólo constan en nombres de archivos. Las nuevas etiquetas de área y muestreo no incorporan resultados.

L008 conserva bloques A-D y numeración global; todos los totales se derivan de apartados. Convocatoria/tipo sólo del nombre y modelo vacío. B3 conserva su petición de área sin añadir la expresión «integral indefinida» de los criterios. D8 tiene varianza conocida, distribución de la media e interpretación de intervalo; no solicita calcular tamaño muestral ni un contraste.

L009: A1a solicita formular sin resolver y A1b usa otro recinto sin añadir y≥0. D7b no explicita reposición ni orden de las muestras: se conserva el original y se revisará la convención antes de redactar soluciones. D8b limita la amplitud total a como máximo 0.2; no se transforma en cota estricta ni se sustituye amplitud por semiancho. Las nuevas etiquetas describen contenidos sin respuestas.

L010 conserva 2^(x+1) en B3 y su petición de integral definida entre −2 y 2, sin convertirla en área por la rúbrica. Marzo de 2020 en B4 es contexto temporal, no año del examen. D8 conserva desviación típica 4 y doce datos en su orden original; no se sustituye por varianza ni por una media calculada. La página 3 del original es tabla normal, registrada como auxiliar y no como otro ejercicio.

L011 conserva tres cuestiones bajo 2 puntos en B4a y tres bajo 1.5 en D7b, sin repartir puntos ni separar IDs. D7a no explicita reposición ni orden de las muestras: conservarlo y revisar la convención en la fase futura. D7b compara intervalos con una muestra mayor de igual proporción, sin inventar un nuevo tamaño. D8 mantiene varianza 81, dieciséis datos y confianza 95 % en a frente a 98 % en b. La etiqueta `comparacion-intervalos` no anticipa la respuesta.

L012 conserva «superarse los 2 millones» en A1 y «a lo sumo» 2 % en D7b, sin intercambiar cotas estrictas e inclusivas. D7 cambia confianza 94 a 97 %, mientras D8 cambia 97 a 94 % y da desviación típica 7 cm. B3 conserva las condiciones distintas de a por apartado; C6a sus dos preguntas bajo 1 punto. El espaciado del modo combinado de L012 se ajusta localmente para evitar una página final con sólo un aviso, sin cambiar contenido ni archivos compartidos.

L013 conserva 2+a/(x−1) en B3 y el reemplazo de una bola por seis del otro color en C5. D7 no explicita reposición ni orden: la convención deberá documentarse al resolver en fase futura, sin añadirla al enunciado. D8 mantiene varianza 4, los 16 tiempos en orden, confianza 97.5 % en a y 90 % en b, y error a lo sumo 0.3 minutos. Nueva etiqueta descriptiva asintotas, sin anticipar resultados. No se copian respuestas de los criterios.

L014 conserva todas las preguntas de A1 bajo 2.5 puntos conjuntos, a=2 en A2b y a=0 en A2c, y las funciones distintas f/g en B3. D7 mantiene varianza 9 y error menor a 1.5 euros; D8 da desviación típica 3, muestra 36, intervalo (6.04,8) al 95 %, cambia n a 49 en c y aumenta confianza sin indicar un nuevo nivel en d. Nueva etiqueta comparacion-error para describir esas peticiones sin anticipar resultados. Ninguna respuesta de los criterios se incorpora al banco.

L015 conserva literalmente (1 puntos) en B3a, documentado en INC-007 sin sic ni corrección silenciosa. A2a exige formular sin resolver; A2b da otro recinto. B3 mantiene a=4 y b=−3 sólo en b/c y la condición F(2)=10; B4 conserva dos derivadas bajo 1.2 puntos conjuntos. D7 mantiene varianza 7.84, doce datos en orden, confianza 93.5 % en a y 99 % con n=50 en b. D8 mantiene miles de euros, desviación típica 5, cota inclusiva de una unidad y probabilidad de la media muestral con μ=24 sólo en c. Nueva etiqueta probabilidad-media-muestral, sin anticipar respuestas.

L016 conserva ax+1/2 en B4 y el exponente x³ de e en B3, t minúscula y O mayúscula en A2 y las cursivas de los postres de A1. D7 mantiene varianza 225 y no añade un nivel de confianza al intervalo dado; c exige error inferior a 3 km. D8 da desviación típica 2 meses, nueve datos en orden con 1.0 y 6.0, confianza 95 % en a y 97 % en b, con cota inclusiva no exceda de un mes. Nueva etiqueta interseccion-rectas y T05 secundario de B3 por el punto de corte solicitado, representable mediante un sistema lineal; no impone un método ni anticipa el punto.

## 7. `ejercicios.csv`: unidad seleccionable

Una fila corresponde a **un ejercicio completo**, con su texto común, todas las condiciones y todos sus apartados. No se crea otra fila por cada condición ni por cada letra de apartado. Dos cuestiones dentro del mismo número siguen siendo una unidad. Si en el futuro se habilita selección por apartado, requerirá un esquema de subunidades con relación al padre y conservación del contexto; no se simula duplicando la fila actual.

| Columna | Contenido y validación |
| --- | --- |
| `ejercicio_id` | ID único y nombre común de sus dos `.tex`, por ejemplo `SEL-D0001-OA-E01`. |
| `documento_id` | Documento canónico; debe existir en `examenes.csv`. |
| `examen_id` | Examen editorial al que pertenece el ejercicio. |
| `fuente_id` | Original físico principal del que se transcribe. |
| `fuente_sha256` | Huella de esa versión original; debe coincidir con el registro de fuente. |
| `anio` | Copia coherente del año editorial del examen; conserva sus límites de confirmación. |
| `curso` | Copia del curso del examen. |
| `convocatoria` | Copia de convocatoria; no se confirma por estar repetida en esta fila. |
| `tipo_examen` | Copia del tipo del examen. |
| `reserva` | Reserva del examen, independiente de opción y bloque. |
| `modelo` | Modelo acreditado del examen o vacío. |
| `modelo_estado` | Estado concreto del modelo. El piloto usa `no_indicado_en_pdf_revisado`; distinguirlo de `pendiente_verificacion` y de `confirmado`. No llenar el número para eliminar la celda vacía. |
| `opcion` | Letra de opción original; vacía cuando no proceda. Coherente con `OA`/`OB` del ID. |
| `bloque` | Letra de bloque original; vacía cuando no proceda. Coherente con `BA`…`BD` del ID. |
| `numero_original` | Numeración visible del ejercicio, sin renumerarla según el tema ni el orden de selección. |
| `apartados_originales` | Etiquetas originales en orden, por ejemplo `a|b|c`; vacío si no aparecen. Para expresar jerarquía se usa `a|a.1|a.2|b`: en L002 A1, `a.1` y `a.2` identifican las afirmaciones 1)/2) dentro de a), que comparte un punto en conjunto. No son ejercicios separados ni se imprimen esas etiquetas compuestas como texto original. Mantener la dependencia en el `.tex`; una lista no sustituye su texto. |
| `puntuacion_original` | Puntuación total del ejercicio, en notación decimal del CSV. Distinguir en observaciones si está impresa como total, si se obtiene de la suma de apartados o si procede únicamente de los criterios oficiales vinculados. En L001, A1 imprime `2.5`; los otros siete registros contienen `2.5` derivado de sus apartados. En L002 y L003, los ocho totales `2.5` de cada lote son derivados de apartados. En L004, A1 tiene `2.5` solo por los criterios: no imprime total ni apartados puntuados; los otros siete totales se derivan de apartados. No añadir esos totales derivados o auxiliares al enunciado LaTeX ni inventar reparto o modificar puntuaciones del original. |
| `paginas_origen` | Páginas físicas del archivo, empezando por 1; `1|2` si continúa. Si la página impresa usa otro número, aclararlo en observaciones. |
| `titulo_descriptivo` | Rótulo editorial breve para buscar y seleccionar. No sustituye ni se incorpora como si fuera parte del enunciado original. |
| `tema_principal` | Un código de `temas.csv`, `T01` a `T09`; vacío mientras no pueda asignarse con fundamento. |
| `temas_secundarios` | Otros temas necesarios, separados por `|`, sin repetir el principal. Permite representar ejercicios mixtos. |
| `epigrafes` | Códigos de `epigrafes.csv` que describen contenidos concretos; comprobar existencia y coherencia temática. |
| `tags` | Etiquetas controladas de `tags.csv`, separadas por `|`, sin duplicados. Describen contenidos, técnicas, condiciones o contexto de búsqueda. No anticipan respuestas. |
| `fuente_criterios` | Fuente auxiliar de criterios aplicable al ejercicio; referencia, sin copiar ahora respuestas. |
| `fuente_tabla` | Fuente de tabla auxiliar cuando se adjunte o la utilice el examen. |
| `ruta_enunciado` | Fragmento LaTeX desde la raíz del proyecto, `enunciados/<ID>.tex`. Archivo existente no implica transcripción terminada. |
| `ruta_solucion` | Fragmento LaTeX separado, `soluciones/<ID>.tex`. Por ahora solo comentarios y `no_redactada`. |
| `rutas_recursos` | Rutas internas de figuras/tablas derivadas, separadas por `|`, preferiblemente `recursos/<ID>/…`. Vacío cuando no sean necesarias o estén pendientes; documentar la diferencia. |
| `estado_transcripcion` | Progreso del enunciado; véase el flujo de estados de la sección 9. |
| `estado_clasificacion` | `pendiente` si aún no se ha clasificado; `provisional` hasta revisar temas, epígrafes y tags; `verificada` después de la comprobación editorial. |
| `estado_solucion` | `no_redactada` actualmente; se cambia solo en las pasadas futuras de solución. |
| `requiere_revision` | `si` o `no`. Usar `si` ante incertidumbre, clasificación provisional, lectura dudosa o incidencias abiertas; no es un sustituto de los estados detallados. En L001-L004 sigue `si` por convocatoria/tipo de carpeta; en L005/L006 por tipo/reserva de carpeta y convocatoria no indicada; B1 de L006 conserva además INC-006. Enunciado y clasificación ya están cotejados/verificados. En L007 la convocatoria ordinaria se confirma por cabecera; tipo titular y modelo conservan sus límites. En L008 sólo el curso está impreso; ordinaria y suplente son datos del nombre, no confirmación de cabecera. En L009 sólo el curso está impreso; convocatoria/reserva/Modelo-3 sólo constan en nombres y no hay letra de reserva. En L010 extraordinaria y curso están impresos; titular/julio y Modelo-5 sólo constan en nombres. En L011 sólo el curso está impreso; extraordinaria/suplente/Modelo-1 proceden de nombres. En L012 sólo el curso está impreso; extraordinaria/reserva/B/Modelo-6 proceden de nombres. B es letra de reserva con esa evidencia, no un modelo. En L013 sólo el curso 2019-2020 está impreso; convocatoria, tipo, reserva y modelo vacíos. P_A no acredita modelo A. En L014 el curso 2019-2020 está confirmado; convocatoria, tipo, reserva y modelo vacíos, sin deducir modelo B de P_B. En L015 el curso 2019-2020 está confirmado; convocatoria, tipo, reserva y modelo vacíos, sin deducir modelo C de P_C. B3a conserva además INC-007. En L016 el curso 2019-2020 está confirmado; convocatoria, tipo, reserva y modelo vacíos, sin deducir modelo D de P_D. El modelo permanece no indicado, sin inferirlo. |
| `observaciones` | Evidencia de clasificación, dudas de lectura, condición histórica, distinción entre dato confirmado y dato de carpeta, o vínculo a incidencia. No alberga una solución. |

### Los nueve temas

| Código | Nombre |
| --- | --- |
| `T01` | Límites y derivadas |
| `T02` | Representación de funciones |
| `T03` | Integrales |
| `T04` | Matrices y determinantes |
| `T05` | Sistemas de ecuaciones |
| `T06` | Programación lineal |
| `T07` | Probabilidad |
| `T08` | Distribuciones de probabilidad |
| `T09` | Inferencia estadística |

La clasificación responde a lo que **pide el ejercicio**, no solo a símbolos presentes. Una matriz en un sistema puede requerir `T05` principal y `T04` secundario. Un estudio con gráfica, monotonía y área puede involucrar `T01`, `T02` y `T03`. El contenido histórico, por ejemplo contrastes de hipótesis, permanece en `T09` y se identifica explícitamente; no se elimina ni se transforma para ajustarlo a una programación actual.

Actualmente el generador sin filtros selecciona 640 ejercicios: 48 de 2012 y 592 de otros años. T06 recupera 86; T05,8; T03,21; T09 más tamano-muestral,99. EXA-0084 contiene cuatro ejercicios por opción de 2.5 puntos. Curso 2011-2012 impreso; convocatoria,tipo,reserva y modelo vacíos. Criterios DOC separados; tabla normal asociada por carpeta, sin cita expresa.

Las puntuaciones anidadas se interpretan según su alcance original: en L002, A1 a) asigna un único punto a las dos afirmaciones 1) y 2) en conjunto. Su numeración no crea dos ejercicios ni dos apartados de un punto cada uno.

Las nuevas etiquetas de L003, como `amplitud-intervalo`, `cota-no-estricta` y `compatibilidad-dimensiones`, describen el contenido sin cambiar sus condiciones. A4 mantiene varianza `225 mg²` y amplitud total como máximo de `5 mg`; B4 conserva error inferior a `0.03`. No convertir amplitud total en error ni confundir una cota no estricta con una estricta. La notación con barra de `P(A/B^c)` en B3 permanece como en la fuente.

En L004, A4 estima la proporción de clientes que **no habían probado** el nuevo helado, con error **inferior al 5 %** en b); B4 b) mantiene error **inferior a 500 horas**. La etiqueta `cota-estricta` describe ambas condiciones sin transformarlas en una desigualdad inclusiva. El `2.5` de A1 se registra con procedencia exclusiva de los criterios oficiales, pues el enunciado no imprime total ni puntuaciones por apartados.

## 8. Vocabularios e incidencias

### `temas.csv`

| Columna | Significado |
| --- | --- |
| `tema_id` | Clave única `T01`…`T09`. |
| `nombre` | Denominación del tema del libro. |
| `fuente` | Documento del temario que justifica la estructura; ruta relativa al espacio de trabajo. |

### `epigrafes.csv`

| Columna | Significado |
| --- | --- |
| `epigrafe_id` | Código único del contenido, por ejemplo `T01.13`. Tratarlo como texto. |
| `tema_id` | Tema padre existente en `temas.csv`. |
| `nombre` | Denominación del epígrafe. |

### `tags.csv`

| Columna | Significado |
| --- | --- |
| `tag` | Etiqueta única en minúsculas, preferiblemente ASCII y palabras unidas por guiones: `probabilidad-condicionada`. |
| `descripcion` | Explicación legible del significado y alcance. Evitar etiquetas sinónimas que fragmenten la búsqueda. |

Antes de introducir una etiqueta nueva, comprobar si existe otra equivalente. No codificar año, convocatoria o modelo como sustituto de sus columnas. Etiquetas de contenido no equivalen a calificaciones ni a soluciones.

### `incidencias.csv`

| Columna | Significado |
| --- | --- |
| `incidencia_id` | Clave única `INC-…`. |
| `fuente_id` | Fuente afectada; vacía para una incidencia transversal. |
| `ejercicio_id` | Ejercicio concreto, cuando ya esté identificado; vacío si la incidencia es del documento o de inventario. |
| `pagina` | Página física afectada, empezando por 1; vacía si es global. |
| `tipo` | Categoría descriptiva: metadatos, lectura, fórmula, gráfico, puntuación, formato heredado, duplicado, etc. |
| `descripcion` | Hecho observado, evidencia y efecto en el trabajo. Distinguir duda de lectura, errata original y propuesta futura. |
| `estado` | `abierta` mientras falte resolver/documentar; `resuelta` cuando se haya cotejado y se registre la decisión; `no_resoluble_con_fuente` si el original no permite decidir y debe conservarse esa limitación. |

## 9. Estados y criterios para avanzar

Estos son los valores admitidos por `scripts/validar.py` y utilizados en [PLAN_DE_TRABAJO.md](../PLAN_DE_TRABAJO.md). No introducir otros estados. Que el validador acepte un estado no acredita que una persona haya realizado la revisión correspondiente: esa evidencia se registra en el lote.

| Dimensión | Estado | Condición |
| --- | --- | --- |
| Transcripción | `pendiente` | Solo identificación o comentarios; ningún enunciado cotejado en esa unidad. No es el estado de los 248 ejercicios de L001-L031. |
| Transcripción | `borrador` | Pasada 1: texto escrito e indexado, todavía sin segundo cotejo completo contra la fuente. Solo se carga para revisión con `IncluirBorradores=si` y una selección que lo incluya; se imprime con aviso explícito. |
| Transcripción | `cotejada` | Pasada 2: segundo cotejo completo de texto, fórmulas, condiciones, apartados, puntuación y recursos. Estado actual de los 248 ejercicios de L001-L031. Único estado que permite cargar el fragmento de enunciado en la salida normal. |
| Transcripción | `bloqueada_por_legibilidad` | Lectura o recurso indispensable que no puede reproducirse con fidelidad en la pasada; incidencia abierta y motivo explícito. |
| Clasificación | `pendiente` | Aún no se han asignado contenidos con fundamento. |
| Clasificación | `provisional` | Tema, epígrafes o etiquetas pendientes de revisión. |
| Clasificación | `verificada` | Pasada 3: clasificación comprobada con todos los apartados y vocabularios; estado actual de los 248 ejercicios de L001-L031. No implica solución redactada. |
| Solución | `no_redactada` | Únicamente comentarios de preparación; estado obligatorio durante las pasadas de enunciados. |
| Solución | `borrador` | Futura pasada 4A: elaboración matemática, estrategia, teoría y desarrollo paso a paso. |
| Solución | `revisada_matematicamente` | Futura pasada 4B: comprobación independiente de cuentas, hipótesis, restricciones y resultados. |
| Solución | `revisada_didacticamente` | Futura pasada 4C: revisión de teoría, explicación de decisiones, legibilidad y utilidad docente. |
| Solución | `validada` | Futura pasada 4D: cotejo editorial, compilación y revisión visual final completados. Único estado que permite cargar el fragmento de solución en el modo con respuestas. |

No promover estados por el mero hecho de existir un archivo, extraer texto con éxito, reconocer un tipo de problema o disponer de criterios oficiales. Una solución no pasa a `validada` por coincidir únicamente en la respuesta final.

### Salida LaTeX y límites de la validación

En la configuración normal, `tex/comandos.tex` carga el fragmento de enunciado únicamente con `estado_transcripcion=cotejada`. En modo `enunciados-y-soluciones`, carga la solución únicamente con `estado_solucion=validada`. Los demás estados muestran un aviso visible de pendiente.

La selección inicial carga `selecciones/l084-examen6-2012.tex`,lista l084-ids.tex y contexto EXA-0084. Entradas l084-enunciados.tex y l084-con-soluciones.tex; anteriores conservadas y632 soluciones pendientes, con8 validadas. En relaciones nuevas vaciar ContextoSeleccion según la guía.

Hay un control explícito de revisión de enunciados: `config/opciones.tex` define `\providecommand{\IncluirBorradores}{no}`. Al configurar su valor como `si`, una selección que incluya ejercicios en `borrador` permite cargar esos fragmentos con aviso de borrador para comprobar sintaxis, maquetación y fidelidad, **sin cambiar su estado editorial**. No carga los enunciados `pendiente` ni `bloqueada_por_legibilidad`, y no permite cargar soluciones sin `validada`.

El generador excluye por defecto los enunciados no cotejados. Para revisar borradores deben cumplirse ambas condiciones: seleccionarlos mediante `--incluir-pendientes` o una lista manual y activar `IncluirBorradores=si`. Seleccionar pendientes sin activar el control solo muestra sus avisos; activar el control sin seleccionarlos no los añade. La salida docente habitual mantiene el valor `no`.

El validador usa la biblioteca estándar de Python. Comprueba integridad del catálogo, referencias, rutas, estados y huellas según sus opciones; no demuestra que una transcripción sea fiel ni comprueba la precisión aritmética de una solución. La compilación tampoco lo demuestra. La revisión visual, matemática y didáctica sigue siendo una tarea independiente documentada por pasadas.

## 10. Duplicados y control de cambios

1. Inventariar todas las rutas y mantener todos los originales intactos.
2. Agrupar copias exactas por SHA-256. La primera ruta ordenada es solo la referencia técnica de `duplicado_de`.
3. Elegir y registrar el documento canónico; no crear otros ocho ejercicios al encontrar otra copia exacta del mismo examen.
4. Si los bytes son distintos pero el contenido parece igual, cotejar todas las páginas antes de declarar equivalencia. Un criterio, una tabla o una versión con enunciados modificados no es automáticamente el mismo examen.
5. Si aparece un cambio real en datos o condiciones, registrar la variante, su fuente y su relación; no sobrescribir el ejercicio anterior bajo el mismo ID.
6. Registrar cada lote con fecha, IDs incorporados, fuentes/huellas, archivos modificados, estados y controles realizados. Un diario con estilo de commit no implica que se haya realizado un commit de Git.
7. Una evolución del esquema requiere documentar columnas o valores añadidos y adaptar selección/validación. No introducir columnas espontáneas que los demás componentes ignoren.

## 11. Controles mínimos por lote

- CSV legibles con su cabecera exacta, mismo número de campos por fila e IDs únicos.
- Referencias válidas entre fuentes, exámenes, ejercicios y vocabularios.
- Rutas internas existentes; huellas originales coincidentes; sin sustitución de originales.
- Coherencia de año/curso/convocatoria/modelo y evidencia de las dudas.
- Recuento de ejercicios independiente del número de apartados y de archivos duplicados.
- Un enunciado y una solución separada por ID; ninguna respuesta redactada durante la fase actual.
- Un ejercicio mixto mantiene todos sus apartados y sus temas secundarios.
- Incidencias registradas y estados que reflejen lo realmente comprobado.

Para las normas de transcripción y las pasadas posteriores, véase [CRITERIOS_TRANSCRIPCION.md](CRITERIOS_TRANSCRIPCION.md).

## Selección por epígrafe (estado L031)

Actualmente el generador sin filtros selecciona 640 ejercicios: 48 de 2012 y 592 de otros años. T06 recupera 86; T05,8; T03,21; T09 más tamano-muestral,99. EXA-0084 contiene cuatro ejercicios por opción de 2.5 puntos. Curso 2011-2012 impreso; convocatoria,tipo,reserva y modelo vacíos. Criterios DOC separados; tabla normal asociada por carpeta, sin cita expresa.

[Índice individual](../INDICE_EJERCICIOS.md) y [guía de relaciones](GUIA_RELACIONES.md).

## Procedencia y estructura de L019

**Identificación L019:** curso 2017-2018 confirmado por ambas cabeceras, año 2018. Reserva A sólo por carpeta, sin convocatoria ni modelo acreditados. Opciones A/B impresas, ejercicios 1-4 por opción; no bloques. Cabecera sin ámbito territorial impreso: no se añade Andalucía a su transcripción. Criterios concordantes y tabla normal genérica asociada por carpeta, sin año propio. Modelo vacío y requiere_revision=si por estos límites. Los metadatos y evidencias anteriores conservan su alcance; L013-L018 siguen siendo curso 2019-2020.

## Procedencia y estructura de L020

**Identificación L020:** curso 2017-2018 confirmado por ambas cabeceras; reserva B sólo por carpeta, convocatoria y modelo vacíos. Opciones A/B impresas, cuatro ejercicios por opción; sin bloques ni ámbito territorial impreso. Criterios y tabla normal genérica asociados por carpeta. INC-008 conserva la discrepancia a/b/b de criterios frente a a/b/c del examen; el enunciado sigue a/b/c y el literal (1punto). Identificación parcialmente confirmada; requiere_revision=si por estos límites. T05 secundario de B1 por el sistema de ecuaciones matriciales, interpretable por entradas sin imponer un procedimiento. L013-L018 conservan curso 2019-2020; L019 su evidencia propia.

## Procedencia y estructura de L021

**Identificación L021:** UNIVERSIDADES DE ANDALUCÍA y curso 2016-2017 impresos en ambas cabeceras; año 2017 confirmado. Reserva A sólo del nombre del archivo, convocatoria/modelo vacíos y número 3 sin valor de modelo acreditado. Opciones A/B con ejercicios 1-4, sin bloques. Criterios SRC-4DFB0FF51804 concordantes; fuente_tabla vacía al no haber tabla específicamente asociada. Todos los totales 2.5 son derivados de apartados, sin añadirlos al cuerpo. Identificación parcialmente confirmada y requiere_revision=si por límites de metadatos.

## Procedencia y estructura de L022

**Identificación L022:** UNIVERSIDADES DE ANDALUCÍA, PRUEBA DE ACCESO A LA UNIVERSIDAD y curso 2015-2016 impresos; año 2016 confirmado. Reserva A sólo del nombre; convocatoria/modelo vacíos y número 5 sin valor de modelo acreditado. Opciones A/B de cuatro ejercicios, sin bloques. Criterios SRC-5F93069BAB36 concordantes; sin tabla específicamente asociada. A2/B1/B4 imprimen 2.5, otros cinco totales derivados. INC-009: A4b no explicita afijación proporcional; conservar y revisar al resolver, sin añadir supuestos. B4 contraste histórico en T09.1/T08.3 con etiquetas específicas, sin inventar epígrafe ni excluirlo. Requiere_revision=si por metadatos y, en A4, esa limitación docente.

## Procedencia y estructura de L023

**Identificación L023:** curso 2015-2016 y UNIVERSIDADES DE ANDALUCÍA impresos; reserva B sólo del nombre, convocatoria/modelo vacíos y 2 sin valor de modelo acreditado. Opciones A/B de cuatro ejercicios, sin bloques. Candidato SRC-B1EA93903484 rechazado: imprime 2016-2017 y otro contenido/puntuación. Búsqueda textual en criterios inventariados sin identificar otro concordante, sin afirmar ausencia absoluta. fuente_criterios y fuente_tabla vacías; asociación auxiliar pendiente. Totales 2.5 derivados sólo de apartados del examen, sin acreditarlos por criterios. Contraste histórico A4 conservado en T09.1/T08.3. Requiere_revision=si por metadatos y auxiliares.

## Procedencia y estructura de L024

**Identificación L024:** curso 2016-2017 impreso; reserva B sólo del nombre, convocatoria/modelo vacíos y 2 sin valor de modelo acreditado. Opciones A/B de cuatro ejercicios, sin bloques. Criterios SRC-B1EA93903484 asociados por curso, contenido y puntuaciones; siguen sin asociarse a L023 (curso distinto). Sin tabla específicamente asociada. A1 imprime total 2.5; los siete restantes derivan de apartados y concuerdan con criterios, sin añadirlos al cuerpo. A4 pide representación proporcional explícita, sin afirmar muestreo aleatorio. Requiere_revision=si por límites de metadatos.

## Procedencia y estructura de L025

**Identificación L025:** curso 2016-2017 impreso; suplemente_junio sólo del nombre, sin acreditar convocatoria ordinaria ni fecha. Convocatoria, tipo, reserva y modelo vacíos; 4 no acredita modelo. Opciones A/B de cuatro ejercicios, sin bloques. Criterios SRC-57188FF1F0A8 asociados por curso, contenido y puntuaciones. Sin tabla específicamente asociada. A1 imprime total 2.5; los siete restantes derivan de apartados y concuerdan con criterios, sin añadirlos al cuerpo. Requiere_revision=si por límites de metadatos. Nuevas etiquetas: seleccion-sin-reposicion y clasificacion-discontinuidades. B4 pide amplitud total e intervalo, no tamaño muestral; A4 mantiene error estrictamente inferior a0.03.

## Procedencia y estructura de L026

Curso2015-2016 impreso; suplemente_septiembre sólo del nombre, sin acreditar convocatoria extraordinaria ni fecha. Convocatoria/tipo/reserva/modelo vacíos;4 no acredita modelo. Criterios SRC-0CCBF6368E87 concordantes por curso/contenido/puntos; sin tabla específica. B4 imprime2.5;otros siete totales derivados de apartados, corroborados con criterios. Contraste histórico B4 conservado en T09.1/T08.3, sin epígrafe inventado.

La fase posterior de resoluciones sigue [este plan](FASE_SOLUCIONES.md). La autorización del27-10-2026 sustituye la restricción inicial de no redactar soluciones cuando termine la fase de transcripción.

## Procedencia y estructura de L027

Curso 2016-2017 impreso; suplemente_septiembre sólo del nombre, sin acreditar convocatoria extraordinaria ni fecha. Convocatoria/tipo/reserva/modelo vacíos; 6 no acredita modelo. Criterios SRC-FC94E50B392D concordantes por contenido, puntuaciones y cabecera visible 2016-2017; la extracción incluye un curso antiguo oculto que no se usa para datar. Sin tabla específica. Ocho totales 2.5 derivados de apartados y corroborados con criterios, sin añadirlos al cuerpo. A4: error no superior a 0.04 inclusivo; B4: error menor que 2 estricto.

La fase posterior de resoluciones sigue [este plan](FASE_SOLUCIONES.md). La autorización del 27-10-2026 sustituye la restricción inicial de no redactar soluciones cuando termine la fase de transcripción.

## Procedencia y estructura de L028

Curso 2017-2018 impreso; tipo suplente y junio sólo de carpeta, sin acreditar convocatoria ordinaria ni fecha. Convocatoria/reserva/modelo vacíos; no hay modelo impreso. Cabecera sin UNIVERSIDADES DE ANDALUCÍA; instrucción final sin el uso de la misma. Criterios SRC-D3E2788903E8 concordantes. Tabla normal SRC-03976ECEE4F8 asociada por carpeta y revisada por imagen; genérica, copia exacta ya inventariada, no ejercicio ni tabla fechada exclusiva. Ocho totales 2.5 derivados de apartados y corroborados con criterios. B3 exige orden y sin reposición; A4 error máximo 2 inclusivo y B4 menor que 0.02 estricto.

La fase posterior de resoluciones sigue [este plan](FASE_SOLUCIONES.md). La autorización del 27-10-2026 sustituye la restricción inicial de no redactar soluciones cuando termine la fase de transcripción.

## Procedencia y estructura de L029

Curso 2017-2018 impreso; tipo suplente y septiembre sólo de carpeta, sin acreditar convocatoria extraordinaria ni fecha. Convocatoria/reserva/modelo vacíos. Criterios SRC-6D24250C0DCF concordantes; tabla SRC-DF745539FC83 normal acumulada genérica de misma carpeta, copia exacta inventariada y revisada por imagen. B1 imprime total2.5 sin apartados; otros siete derivados de apartados y corroborados con criterios. B2 conserva e^(5x)(x²−5)^3 y (x³+1)^2/ln(x²+2), sin respuestas. A4 cambia confianza95→99%; B4 cambia proporción a0.25 y confianza a92.5% con error inferior0.03 estricto.

La fase posterior de resoluciones sigue [este plan](FASE_SOLUCIONES.md). La autorización del 27-10-2026 sustituye la restricción inicial de no redactar soluciones cuando termine la fase de transcripción.

## Procedencia y estructura de L030

Curso 2017-2018 impreso; titular y junio sólo de carpeta, sin acreditar convocatoria ordinaria ni fecha. Convocatoria/reserva/modelo vacíos. Criterios SRC-969E0FA37C16 concordantes; tabla SRC-7CE2805F3B2B normal acumulada genérica de misma carpeta, copia exacta ya inventariada. Ocho totales2.5 derivados de apartados y corroborados, sin añadirlos al cuerpo. A1a pide formular sin resolver y A1b trata otro recinto. INC-010: A4 no explicita reposición ni orden de las muestras; conservar el texto y revisar convención antes de redactar solución. No se añade hipótesis ni se anticipan respuestas. B1 conserva XA=2B^t+I_2; B4 cambia confianza97→96 y error no superior2% inclusivo.

La fase posterior de resoluciones sigue [este plan](FASE_SOLUCIONES.md). La autorización del 27-10-2026 sustituye la restricción inicial de no redactar soluciones cuando termine la fase de transcripción.

## Procedencia y estructura de L031

Curso 2015-2016 impreso; tipo titular y junio sólo del nombre, sin acreditar convocatoria ordinaria ni fecha. Convocatoria/reserva/modelo vacíos; número6 del nombre no acredita modelo. Criterios SRC-06A33DC598A0 concordantes. Sin tabla específicamente asociada. B1 imprime total2.5 sin apartados;otros siete derivados de apartados y corroborados, sin añadir totales al cuerpo. A1 pide interpretar los elementos de productos matriciales; B2 pide interpretar la asíntota horizontal. A4 mantiene error inferior1 estricto. B4 distingue n64 de n100 y probabilidad de media de un intervalo de confianza.

La fase posterior de resoluciones sigue [este plan](FASE_SOLUCIONES.md). La autorización del 27-10-2026 sustituye la restricción inicial de no redactar soluciones cuando termine la fase de transcripción.

## Procedencia y estructura de L032

Curso visible 2016-2017, año2017. El texto oculto 2015-2016 no se usa para fechar. Titular/junio sólo del nombre; 5 no acredita modelo. Criterios SRC-3B05F22DF1BE concordantes; sin tabla específica. Ocho IDs D0032, archivos individuales y soluciones de sólo comentarios. [Informe](lotes/L032_2017_titular_junio.md).

**Siguiente fase:** continuar S003 (ocho ejercicios de EXA-0002) y revisar las incidencias antes de validar los casos afectados. S001/S002:ocho soluciones explicadas y validadas;632 pendientes. Tres pasadas del mismo autor, sin revisor independiente.

## Procedencia y estructura de L033

Curso 2017-2018 visible, año 2018. Titular/septiembre sólo de carpeta; convocatoria, reserva y modelo vacíos. Criterios SRC-42767DB22262 concordantes, salvo tercera etiqueta b) repetida en B2 frente a c) del examen. A4c conserva afijación proporcional con 121 y razones 1:2:3; criterio de redondeo reservado a la resolución futura. Tabla Normal genérica SRC-91337370C760 de la misma carpeta, sin vínculo explícito de fecha/modelo. [Informe](lotes/L033_2018_titular_septiembre.md).

**Siguiente: L049**, fuente `SRC-18FB5F1BBA03`, archivo `Selectividad/sel_2013_matematicas_aplicadas/junio/reserva b/EXAMEN 1-ANDALUCÍA.pdf`. Revisar cabecera,curso,criterios y tabla;separar evidencia de carpeta y datos impresos antes de asignar metadatos.

## Procedencia y estructura de L034

Curso 2015-2016 visible, año 2016. La fuente preliminar otro contiene un examen completo A/B, sin criterios combinados. Titular/septiembre sólo del nombre; 1 no acredita modelo. Convocatoria, reserva y modelo vacíos. Criterios SRC-E33A07DB6B02 concordantes; sin tabla específica. INC-013: B4b no explicita reposición ni orden; revisar convención antes de resolver, sin añadir hipótesis al enunciado. [Informe](lotes/L034_2016_titular_septiembre.md).

**Siguiente: L049**, fuente `SRC-18FB5F1BBA03`, archivo `Selectividad/sel_2013_matematicas_aplicadas/junio/reserva b/EXAMEN 1-ANDALUCÍA.pdf`. Revisar cabecera,curso,criterios y tabla;separar evidencia de carpeta y datos impresos antes de asignar metadatos.

## Procedencia y estructura de L035

Curso 2016-2017 visible, año2017. Titular/septiembre sólo del nombre;1 no acredita modelo. Convocatoria,reserva,modelo vacíos. Criterios SRC-15FF6FFF34D6 concordantes; sin tabla específica. A4 conserva error no superior5años inclusivo y B4 error inferior0.03 estricto con confianza92.5%. Urna con sustitución por dos del otro color; sin añadir hipótesis ni anticipar respuestas. Nuevas etiquetas urna-dinamica e igualdad-derivadas. [Informe](lotes/L035_2017_titular_septiembre.md).

**Siguiente: L049**, fuente `SRC-18FB5F1BBA03`, archivo `Selectividad/sel_2013_matematicas_aplicadas/junio/reserva b/EXAMEN 1-ANDALUCÍA.pdf`. Revisar cabecera,curso,criterios y tabla;separar evidencia de carpeta y datos impresos antes de asignar metadatos.

## Procedencia y estructura de L036

Curso 2014-2015 visible, año2015. Convocatoria,tipo,reserva,modelo vacíos;Ua1 sólo del nombre. Examen SRC-D4199CAE2EC3 y alias SRC-96902844B9A7 idénticos; criterios SRC-B7CB1F935609 y alias SRC-022F67F8B3D8 idénticos. Las cuatro rutas quedan en el inventario; ocho transcripciones canónicas. Criterios concordantes,sin tabla específica. A4 conserva un contraste histórico unilateral de media bajo T09.1/T08.3,con significación1% y H0:mu<=170;sin inventar un epígrafe. B4 es IC90 y error no superior0.1horas. Etiqueta comparacion-reposicion para A3. [Informe](lotes/L036_2015_Ua1.md).

**Siguiente: L049**, fuente `SRC-18FB5F1BBA03`, archivo `Selectividad/sel_2013_matematicas_aplicadas/junio/reserva b/EXAMEN 1-ANDALUCÍA.pdf`. Revisar cabecera,curso,criterios y tabla;separar evidencia de carpeta y datos impresos antes de asignar metadatos.

## Procedencia y estructura de L037

Curso2014-2015 visible,año 2015. Convocatoria,tipo,reserva,modelo vacíos;Ua2 sólo del nombre. Examen SRC-20170EF2B2D5 y alias SRC-3C3C0BA557E4 idénticos;criterios SRC-8F3B9C58D85E y alias SRC-6557CA8734E1 idénticos. Cuatro rutas conservadas y ocho transcripciones canónicas. Criterios concordantes,sin tabla específica. A1b pide despejar sin calcular elementos;B1 maximiza ingresos;B2c conserva log. A4 es contraste histórico bilateral de media bajo T09.1/T08.3,con N(mu,2.1),H0:mu=5.5 y significación8%. B4 pide IC99.2% y error,sin tamaño mínimo. Etiquetas nuevas:despeje-matricial y contraste-bilateral-media. [Informe](lotes/L037_2015_Ua2.md).

**Siguiente: L049**, fuente `SRC-18FB5F1BBA03`, archivo `Selectividad/sel_2013_matematicas_aplicadas/junio/reserva b/EXAMEN 1-ANDALUCÍA.pdf`. Revisar cabecera,curso,criterios y tabla;separar evidencia de carpeta y datos impresos antes de asignar metadatos.

## Procedencia y estructura de L038

Curso2014-2015 visible,año2015. Convocatoria,tipo,reserva,modelo vacíos;Ua3 sólo del nombre. Examen SRC-DED70B2939A7 y alias SRC-98DB47100206 idénticos;criterios SRC-34AF76192C3D y alias SRC-C308B33F0C93 idénticos. Cuatro rutas conservadas y ocho transcripciones canónicas. Criterios concordantes,sin tabla específica. A2 contiene dos funciones independientes;A4 solicita IC95 y tamaño con error inferior0.5cl. B1 conserva beneficio literal y datos de venta,sin inventar costes. B4 conserva contraste histórico unilateral de media bajo T09.1/T08.3,H0:mu<=80,significación5% y umbral histórico del enunciado. Sin soluciones. [Informe](lotes/L038_2015_Ua3.md).

**Siguiente: L049**, fuente `SRC-18FB5F1BBA03`, archivo `Selectividad/sel_2013_matematicas_aplicadas/junio/reserva b/EXAMEN 1-ANDALUCÍA.pdf`. Revisar cabecera,curso,criterios y tabla;separar evidencia de carpeta y datos impresos antes de asignar metadatos.

## Procedencia y estructura de L039

Curso2014-2015 visible,año2015. Convocatoria,tipo,reserva,modelo vacíos;Ua4 sólo del nombre. El candidato2022 del texto extraído no fecha el examen. Examen SRC-6129A8DBCD4F y alias SRC-014DA3092BF3 idénticos;criterios SRC-4F8A35ED2B35 y alias SRC-CD6448FF91C4 idénticos. Cuatro rutas y ocho transcripciones canónicas. Criterios concordantes,sin tabla específica. A1 maximiza número de tarrinas;A4 contrasta H0:mu<=5 y compara significaciones5/15% bajo T09.1/T08.3. B3 pide diagnóstico correcto y probabilidades dado positivo. B4 aporta varianza0.25mm² y limita amplitud inferior2mm,no error2mm. Etiqueta diagnostico-correcto. Sin soluciones. [Informe](lotes/L039_2015_Ua4.md).

**Siguiente: L049**, fuente `SRC-18FB5F1BBA03`, archivo `Selectividad/sel_2013_matematicas_aplicadas/junio/reserva b/EXAMEN 1-ANDALUCÍA.pdf`. Revisar cabecera,curso,criterios y tabla;separar evidencia de carpeta y datos impresos antes de asignar metadatos.

## Procedencia y estructura de L040

Curso2014-2015 visible,año2015. Convocatoria,tipo,reserva,modelo vacíos;Ua5 sólo del nombre. Examen SRC-5D9E6A5CB42C y alias SRC-8E44CA3AEC52 idénticos;criterios SRC-D7A2E4F81DC6 y alias SRC-6620057F9E36 idénticos. Cuatro rutas y ocho transcripciones canónicas. Criterios concordantes,sin tabla específica. A1 incluye potencias4/80;A2 tres tramos;A3 pregunta incompatibilidad. A4 contrasta H0:mu<=7 con varianza16 y significación0.05 bajo T09.1/T08.3. B1 conserva cinco restricciones;B2 pide dos tangentes;B3 Reserva y Bayes;B4 IC92 y tamaño para reducir error a la mitad. Sin etiquetas nuevas ni soluciones. [Informe](lotes/L040_2015_Ua5.md).

**Siguiente: L049**, fuente `SRC-18FB5F1BBA03`, archivo `Selectividad/sel_2013_matematicas_aplicadas/junio/reserva b/EXAMEN 1-ANDALUCÍA.pdf`. Revisar cabecera,curso,criterios y tabla;separar evidencia de carpeta y datos impresos antes de asignar metadatos.

## Procedencia y estructura de L041

Curso2014-2015 visible,año2015. Convocatoria,tipo,reserva,modelo vacíos;Ua6 sólo del nombre. Examen SRC-417302754109 y alias SRC-FD67A988445D idénticos;criterios SRC-4283A8F81C69 y alias SRC-E27DBB823B7A idénticos. Cuatro rutas y ocho transcripciones canónicas. Criterios concordantes,sin tabla específica. A1 conserva matrices y parámetros;A2 racional/cúbica y tangente−3;A3 pregunta independencia. A4 usa nueve capitales,IC95 y error máximo4000euros. B1 inversión100000euros y mínimoB10000;B2 dos tramos y monotonía;B3 hospitalización y Bayes;B4 H0:mu>=110,sigma6 y significación5% bajo T09.1/T08.3. Sin etiquetas nuevas ni soluciones. [Informe](lotes/L041_2015_Ua6.md).

**Siguiente: L049**, fuente `SRC-18FB5F1BBA03`, archivo `Selectividad/sel_2013_matematicas_aplicadas/junio/reserva b/EXAMEN 1-ANDALUCÍA.pdf`. Revisar cabecera,curso,criterios y tabla;separar evidencia de carpeta y datos impresos antes de asignar metadatos.

## Procedencia y estructura de L042

Curso2013-2014 visible,año2014. Convocatoria,tipo,reserva,modelo vacíos;ANDAL-1 sólo del nombre. Examen SRC-987D141AC72B y criterios SRC-805FB552E609,sin alias exactos en inventario. Criterios concordantes,sin tabla específica. A1 conserva signos,traspuesta y datos parciales;A2 mínimo y tangente;A3 independencia y complemento;A4 media/error desde intervalo y tamaño96%. B1 dieta de coste mínimo;B2 derivabilidad en0;B3 defectos;B4 contraste H0:p>=0.25 y significaciones5/1% bajo T09.1. Sin etiquetas nuevas ni soluciones. [Informe](lotes/L042_2014_ANDAL1.md).

**Siguiente: L049**, fuente `SRC-18FB5F1BBA03`, archivo `Selectividad/sel_2013_matematicas_aplicadas/junio/reserva b/EXAMEN 1-ANDALUCÍA.pdf`. Revisar cabecera,curso,criterios y tabla;separar evidencia de carpeta y datos impresos antes de asignar metadatos.

## Procedencia y estructura de L043

Curso2013-2014 visible,año2014. Convocatoria,tipo,reserva,modelo vacíos;ANDAL-2 sólo del nombre. Examen SRC-B7376BBA6509 y criterios SRC-44E6C9B92F20,sin alias exactos en inventario. Criterios concordantes,sin tabla específica. A1 región y extremos;A2 derivabilidad y tangente;A3 cámaras;A4 nueve precios,IC95 y error no superior0.08euros. B1 conserva orden y signos de matrices;B2 audiencia en6/12h;B3 conjunto de16números;B4 estructura1a/1b/2 y muestreo. INC-014 reserva la justificación de convención de muestreo en B4.2 para la fase de soluciones. Sin etiquetas nuevas ni soluciones. [Informe](lotes/L043_2014_ANDAL2.md).

**Siguiente: L049**, fuente `SRC-18FB5F1BBA03`, archivo `Selectividad/sel_2013_matematicas_aplicadas/junio/reserva b/EXAMEN 1-ANDALUCÍA.pdf`. Revisar cabecera,curso,criterios y tabla;separar evidencia de carpeta y datos impresos antes de asignar metadatos.

## Procedencia y estructura de L044

Curso2013-2014 visible,año2014. Convocatoria,tipo,reserva,modelo vacíos;ANDAL-3 sólo del nombre. Examen SRC-12C7C27227F3 y criterios SRC-C7810D495446,sin alias exactos en inventario. Criterios concordantes en puntuaciones,sin tabla específica. A1 traspuesta y matriz fila;A2 cúbica;A3 dos adultos;A4 proporción con confianza95/99%. B1 conserva cuatro restricciones sin añadir y>=0;B2 dos tramos y tangente2;B3 museo;B4 muestras de{6,9,12} y afijación proporcional. INC-015 reserva convención de muestreo para solución futura;INC-016 conserva a/b del examen frente1/2 de criterios. Sin etiquetas nuevas ni soluciones. [Informe](lotes/L044_2014_ANDAL3.md).

**Siguiente: L049**, fuente `SRC-18FB5F1BBA03`, archivo `Selectividad/sel_2013_matematicas_aplicadas/junio/reserva b/EXAMEN 1-ANDALUCÍA.pdf`. Revisar cabecera,curso,criterios y tabla;separar evidencia de carpeta y datos impresos antes de asignar metadatos.

## Procedencia y estructura de L045

Curso2013-2014 visible,año2014. Convocatoria,tipo,reserva,modelo vacíos;ANDAL-5 sólo del nombre. Examen SRC-FF289770F60D y criterios SRC-8FFDC913699D,sin alias exactos en inventario. Criterios concordantes,sin tabla específica. A1 matrices;A2 producto logarítmico y cociente exponencial;A3 deportes;A4 H0:p>=0.65 y significaciones10/1%. B1 mezcla matriz y región de cinco vértices,bajo T04/T06,sin dividir el ejercicio;B2 cúbica;B3 prensa y exclusividad;B4 intervalo94%,proporción,recuento y tamaño. Sin incidencias ni etiquetas nuevas;sin soluciones. [Informe](lotes/L045_2014_ANDAL5.md).

**Siguiente: L049**, fuente `SRC-18FB5F1BBA03`, archivo `Selectividad/sel_2013_matematicas_aplicadas/junio/reserva b/EXAMEN 1-ANDALUCÍA.pdf`. Revisar cabecera,curso,criterios y tabla;separar evidencia de carpeta y datos impresos antes de asignar metadatos.

## Procedencia y estructura de L046

Curso2013-2014 visible,año2014. Fuente SRC-9B38A4843707 inicialmente otro,cotejada como examen completo A/B de dos páginas,sin criterios intercalados. Junio sólo del nombre JUN;convocatoria,tipo,reserva,modelo vacíos. Criterios separados SRC-1F22C9DEEB02 concordantes;sin alias exactos ni tabla específica. A1 potencia2014 y ecuación cúbica matricial;A2 beneficios y signo de derivada;A3 moneda/urnas;A4 IC98.8 y tamaño para error no excede1euro. B1 conserva cuatro restricciones sin añadir x>=0;B2 dos tramos;B3 ofertas y unión;B4 H0:p=0.7,bilateral,significación1%. Nueva etiqueta contraste-bilateral-proporcion;sin incidencias nuevas ni soluciones. [Informe](lotes/L046_2014_JUN.md).

**Siguiente: L049**, fuente `SRC-18FB5F1BBA03`, archivo `Selectividad/sel_2013_matematicas_aplicadas/junio/reserva b/EXAMEN 1-ANDALUCÍA.pdf`. Revisar cabecera,curso,criterios y tabla;separar evidencia de carpeta y datos impresos antes de asignar metadatos.

## Procedencia y estructura de L047

Curso2013-2014 visible,año2014. Fuente SRC-3753985712BC inicialmente otro,cotejada como examen completo A/B de dos páginas,sin criterios intercalados. Septiembre sólo del nombre SEPT;convocatoria,tipo,reserva,modelo vacíos. Criterios separados SRC-4E7EB7A5A236 concordantes;sin alias exactos ni tabla específica. A1 sistema y traspuesta;A2 beneficios;A3 asistencia85/35%;A4 H0:mu<=8 y significación5%. B1a exige plantear sin resolver y B1b tiene recinto propio;B2 parábola;B3 peritaje correcto y autenticidad dadoerror;B4 peso total1615.2g,dosdocenas,IC96 y amplitud máxima0.8. Nueva etiqueta peritaje-correcto;sin incidencias nuevas ni soluciones. [Informe](lotes/L047_2014_SEPT.md).

**Siguiente: L049**, fuente `SRC-18FB5F1BBA03`, archivo `Selectividad/sel_2013_matematicas_aplicadas/junio/reserva b/EXAMEN 1-ANDALUCÍA.pdf`. Revisar cabecera,curso,criterios y tabla;separar evidencia de carpeta y datos impresos antes de asignar metadatos.

## Procedencia y estructura de L048

Curso2012-2013 visible,año2013. Examen SRC-551C95013DE9 y criterios SRC-1A43EA28D160,sin alias exactos. Tipo reserva y letra A sólo de carpeta;convocatoria/modelo vacíos,junio sólo de ruta,5no acredita modelo. Tabla normal separada SRC-5773393B0621 asociada por carpeta:cinco rutas idénticas,conservadas en inventario,cuatro copias exactas adicionales. A1 formulación sin resolver y recinto;A2 tres tramos y derivabilidad;A3 calibres y rotura;A4 contraste histórico de media con H0:mu<=25. B1 potencias2013;B2 tangente0;B3 votación por grupos;B4 IC90proporción y cotaerror0.1. INC-017 registra total2.5 frente desglose2en criteriosA2;se conserva el examen. Sin etiquetas nuevas ni soluciones. [Informe](lotes/L048_2013_RESERVA_A.md).

**Siguiente: L049**, fuente `SRC-18FB5F1BBA03`, archivo `Selectividad/sel_2013_matematicas_aplicadas/junio/reserva b/EXAMEN 1-ANDALUCÍA.pdf`. Revisar cabecera,curso,criterios y tabla;separar evidencia de carpeta y datos impresos antes de asignar metadatos.

## Procedencia de L049

Curso2012-2013 impreso; reserva B sólo por carpeta,convocatoria/modelo vacíos. Ocho ejercicios A/B; B1 mixto T04/T06 conservado completo. Criterios concordantes. Tabla SRC-8304DD8AE43B asociada por carpeta,copia exacta de SRC-5773393B0621. INC-018 registra reposición/orden no explícitos de B4b para fase futura. Nueva etiqueta varianza-medias-muestrales, sin resultados. [Informe](lotes/L049_2013_RESERVA_B.md).

**Siguiente: L050**, fuente `SRC-6CABE043886D`, archivo `Selectividad/sel_2013_matematicas_aplicadas/junio/titular/EXAMEN 6 -ANDALUCÍA.pdf`. Revisar cabecera, curso, criterios, tabla y posibles alias antes de asignar metadatos.

## Procedencia de L050

Curso2012-2013 impreso;junio y titular sólo por carpeta,reserva/modelo vacíos. Ocho ejercicios A/B:matrices,beneficios,transporte,piscifactoría,tapices,derivada dada,sucesos independientes y televisión. Criterios concordantes,examen/criterios sin alias exactos. Tabla SRC-D2928B91F5AA asociada por carpeta,copia de SRC-5773393B0621,cinco procedencias idénticas. Beneficio literal de B1 conservado;etiqueta recursos-sobrantes añadida. Sin incidencias nuevas ni soluciones. [Informe](lotes/L050_2013_TITULAR_JUNIO.md).

**Siguiente: L051**, fuente `SRC-48C4AF791735`, archivo `Selectividad/sel_2013_matematicas_aplicadas/septiembre/reserva a/EXAMEN 3 -ANDALUCÍA.pdf`. Revisar cabecera,curso,criterios,tabla y alias antes de asignar metadatos.

## Procedencia de L051

Curso2012-2013 impreso;reserva A sólo de carpeta,septiembre sólo de ruta;convocatoria/modelo vacíos. Ocho ejercicios A/B:ecuaciones matriciales,tres tramos,urnas,café,recinto,curvatura,idiomas y contraste histórico de proporción. A1 relacionado también con T05 por notación matricial;B4 en T09.1 y etiquetas de contraste,sin epígrafe específico actual. Criterios concordantes,examen/criterios sin alias exactos. Tabla SRC-8312DBB75351 asociada por carpeta,copia de SRC-5773393B0621,cinco procedencias idénticas. Sin etiquetas nuevas,incidencias nuevas ni soluciones. [Informe](lotes/L051_2013_RESERVA_A_SEPTIEMBRE.md).

**Siguiente: L052**, fuente `SRC-F90FB6B40256`, archivo `Selectividad/sel_2013_matematicas_aplicadas/septiembre/reserva b/EXAMEN 4-ANDALUCÍA.pdf`. Revisar cabecera,curso,criterios,tabla y alias antes de asignar metadatos.

## Procedencia de L052

Curso2012-2013 impreso;reserva B sólo de carpeta,septiembre sólo de ruta;convocatoria/modelo vacíos. Ocho ejercicios A/B:matrices,derivadas,terapias,acidez,región factible,dos tramos,sucesos independientes y muestreo/intervalo de proporción. INC-019 registra reposición/orden no explícitos en B4a;convención para la fase de soluciones. Criterios concordantes,examen/criterios sin alias exactos. Tabla SRC-C8FC9A3149DF asociada por carpeta,copia de SRC-5773393B0621,cinco procedencias idénticas. Sin etiquetas nuevas ni respuestas. [Informe](lotes/L052_2013_RESERVA_B_SEPTIEMBRE.md).

**Siguiente: L053**, fuente `SRC-A5DF0494F1A7`, archivo `Selectividad/sel_2013_matematicas_aplicadas/septiembre/titular/EXAMEN 2-ANDALUCÍA.pdf`. Revisar cabecera,curso,criterios,tabla y alias antes de asignar metadatos.

## Procedencia de L053

Curso2012-2013 impreso;septiembre y titular sólo de carpeta,reserva/modelo vacíos. Ocho ejercicios A/B:región factible,montajes,baile,contraste bilateral,matrices fraccionarias,parámetros,préstamos y gasto familiar. A4 en T09.1 con varianza25 literal. Criterios concordantes;examen,criterios y tabla sin alias exactos. Tabla específica SRC-B65557E07CB9 asociada por carpeta,distinta en bytes de las cinco copias de tabla anteriores. Separación local de filas en matrices de B1 para legibilidad,sin alterar entradas. Sin etiquetas ni incidencias nuevas ni soluciones. [Informe](lotes/L053_2013_TITULAR_SEPTIEMBRE.md).

**Siguiente: L054**, fuente `SRC-45EF64533A19`, archivo `Selectividad/sel_2011_matematicas_aplicadas/121-EXAMEN 4.pdf`. Revisar cabecera,curso,auxiliares y alias antes de asignar metadatos.

## Procedencia de L054

Curso2010-2011 impreso,año2011. Convocatoria,tipo,reserva y modelo vacíos;121y4 sólo del nombre. Ocho ejercicios A/B:matrices,derivada/afluencia,transferencia de bolas,contraste unilateral,recinto,beneficios,errores en libro y muestreo/tamaño. A2 mixto T02principal1.5puntos/T01secundario1punto,conservado completo. INC-020 preserva media sus longitudes literal de A4. Nueva etiqueta region-aceptacion. Criterios concordantes,examen/criterios sin alias exactos. Tabla SRC-0DF80B854632 asociada por prefijo121 y carpeta,con cuatro procedencias de huella idéntica. Sin respuestas. [Informe](lotes/L054_2011_EXAMEN_4.md).

**Siguiente: L055**, fuente `SRC-471D895044A9`, archivo `Selectividad/sel_2011_matematicas_aplicadas/122A-EXAMEN 6.pdf`. Revisar cabecera,curso,auxiliares y alias antes de asignar metadatos.

## Procedencia de L055

Curso2010-2011 impreso,año2011. Convocatoria,tipo,reserva y modelo vacíos;122Ay6 sólo del nombre. Ocho ejercicios A/B:recinto,tres tramos,examen,contraste televisivo,matrices/café,derivadas,paraguas y chocolate. B1 conserva Nt como dato y etiquetas natural/descafein.,A/B/C en P/Q. B2 total2.5impreso sin apartados ni puntuaciones por función;criterios0.8/0.9/0.8 no añadidos al texto. B4 peso total5274g y amplitud total como máximo3g preservados. Criterios concordantes,examen/criterios sin alias exactos. Tabla SRC-CEDD41219D14 asociada por prefijo122A y carpeta,copia de SRC-0DF80B854632,cuatro procedencias idénticas. Sin etiquetas nuevas,incidencias nuevas ni soluciones. [Informe](lotes/L055_2011_EXAMEN_6.md).

**Siguiente: L056**, fuente `SRC-6437A476F758`, archivo `Selectividad/sel_2011_matematicas_aplicadas/123-EXAMEN 1.pdf`. Revisar cabecera,curso,auxiliares y alias antes de asignar metadatos.

## Procedencia de L056

Curso2010-2011 impreso,año2011. Convocatoria,tipo,reserva y modelo vacíos;123y1 sólo del nombre. Criterios SRC-C0D9348217F0 concordantes. Sin tabla específicamente acreditada. Etiqueta matriz-adyacencia añadida. El homónimo SRC-98312D373CA4 reproduce EXA-0054 con distinta SHA y no se usa como fuente de L056 ni como tabla. Cinco páginas fuente revisadas. Sin incidencias nuevas ni soluciones. [Informe](lotes/L056_2011_EXAMEN_1.md).

**Siguiente fase:** continuar S003 (ocho ejercicios de EXA-0002) y revisar las incidencias antes de validar los casos afectados. S001/S002:ocho soluciones explicadas y validadas;632 pendientes. Tres pasadas del mismo autor, sin revisor independiente.

## Equivalencias de contenido: L057

[Informe y acceso individual](lotes/L057_2011_REEDICION_EXAMEN_4.md). `datos/equivalencias_contenido.csv` relaciona SRC-98312D373CA4 con los ocho ID de EXA-0054. Las huellas son distintas:se conserva el inventario de duplicados exactos sin cambios. No se crean EXA-0057 ni D0057. La selección reutilizable es `selecciones/l057-ids.tex`;la selección inicial usa L084.

**Siguiente fase:** continuar S003 (ocho ejercicios de EXA-0002) y revisar las incidencias antes de validar los casos afectados. S001/S002:ocho soluciones explicadas y validadas;632 pendientes. Tres pasadas del mismo autor, sin revisor independiente.

### CSV complementario de equivalencias

Una fila por correspondencia fuente/ejercicio. Columnas: `lote`, `fuente_alternativa_id`, `fuente_canonica_id`, `examen_id`, `ejercicio_id`, `pagina_alternativa`, `pagina_canonica`, `opcion`, `numero_original`, `tipo_relacion`, `estado_revision`, `informe`. `reedicion_mismo_enunciado_sha_distinto` expresa cotejo de contenido, nunca identidad SHA. Temas,epígrafes y tags se obtienen de ejercicios.csv por ejercicio_id. Este CSV es complementario y se comprueba en el control de L057;el validador y el generador existentes no incorporan un filtro por fuente alternativa. No alterar duplicado_de ni grupo_duplicado por equivalencia semántica.

## Procedencia de L058

Curso2010-2011 impreso;convocatoria,tipo,reserva y modelo vacíos. 221Ay5 sólo del nombre. Criterios concordantes y tabla acumulada N(0,1) asociada por prefijo y carpeta,sin cita expresa. Tres fuentes sin alias exactos. A3 conserva el literal «sin que haya incidente»;interpretación del0.03 pendiente para soluciones,sin convertir el dato en notación condicionada o conjunta. No se redactan respuestas. Sin etiquetas nuevas. [Informe](lotes/L058_2011_EXAMEN_5.md).

**Siguiente fase:** continuar S003 (ocho ejercicios de EXA-0002) y revisar las incidencias antes de validar los casos afectados. S001/S002:ocho soluciones explicadas y validadas;632 pendientes. Tres pasadas del mismo autor, sin revisor independiente.

## Procedencia de L059

Curso2010-2011 impreso;convocatoria,tipo,reserva y modelo vacíos. 222y2 sólo del nombre. Criterios concordantes;examen y criterios sin alias exactos. Tabla acumulada N(0,1) asociada por prefijo y carpeta,sin cita expresa;cuatro procedencias exactas. Matrices,unidades monetarias,dado y moneda,media muestral,dos regiones distintas,tres ramas,bolas con devolución y contraste de proporción conservados. Etiqueta nueva extraccion-con-reposicion. Sin soluciones. [Informe](lotes/L059_2011_EXAMEN_2.md).

**Siguiente fase:** continuar S003 (ocho ejercicios de EXA-0002) y revisar las incidencias antes de validar los casos afectados. S001/S002:ocho soluciones explicadas y validadas;632 pendientes. Tres pasadas del mismo autor, sin revisor independiente.

## Procedencia de L060

Curso2010-2011 impreso;convocatoria,tipo,reserva y modelo vacíos. 223Ay3 sólo del nombre. Criterios concordantes;examen y criterios sin alias exactos. Tabla acumulada N(0,1) asociada por prefijo y carpeta,sin cita expresa;cuatro procedencias exactas. Se conservan elementos de matrices,beneficio por tramos,aceites,media muestral,recinto,derivada descrita,tangente,garantía y ocho pesos. Sin etiquetas nuevas ni soluciones. [Informe](lotes/L060_2011_EXAMEN_3.md).

**Siguiente fase:** continuar S003 (ocho ejercicios de EXA-0002) y revisar las incidencias antes de validar los casos afectados. S001/S002:ocho soluciones explicadas y validadas;632 pendientes. Tres pasadas del mismo autor, sin revisor independiente.

## Procedencia de L061

Curso2009-2010 impreso,año2010. Junio sólo por carpeta,no confirmado en cabecera;tipo,reserva y modelo vacíos. El5del nombre no acredita modelo. Criterios concordantes;examen y criterios sin alias exactos. Tabla normal asociada por carpeta,sin cita expresa;doce procedencias exactas. Se conservan el10%de puntualidad en coche,la confianza93%,el orden de factores,tres derivadas y diez producciones. Sin etiquetas nuevas ni soluciones. [Informe](lotes/L061_2010_EXAMEN_5.md).

**Siguiente fase:** continuar S003 (ocho ejercicios de EXA-0002) y revisar las incidencias antes de validar los casos afectados. S001/S002:ocho soluciones explicadas y validadas;632 pendientes. Tres pasadas del mismo autor, sin revisor independiente.

## Procedencia de L062

Curso2009-2010 impreso,año2010. Junio sólo por carpeta,no confirmado en cabecera;tipo,reserva y modelo vacíos. Ra sólo parte de la ruta;4no acredita modelo. Criterios concordantes;examen y criterios sin alias exactos. Tabla por carpeta,sin cita expresa;doce procedencias exactas. Se conservan ingreso de lotes,tres ramas,condicionales,cuatro niveles de confianza,semiplanos,depósito,dado y dos cotas estrictas. Sin etiquetas nuevas ni soluciones. [Informe](lotes/L062_2010_EXAMEN_4.md).

**Siguiente fase:** continuar S003 (ocho ejercicios de EXA-0002) y revisar las incidencias antes de validar los casos afectados. S001/S002:ocho soluciones explicadas y validadas;632 pendientes. Tres pasadas del mismo autor, sin revisor independiente.

## Procedencia de L063

Curso2009-2010 impreso,año2010. Junio sólo por carpeta,no confirmado en cabecera;tipo,reserva y modelo vacíos. Rb sólo parte de la ruta;6no acredita modelo. Criterios concordantes;examen y criterios sin alias exactos. Tabla por carpeta,sin cita expresa;doce procedencias exactas. Se conservan coste mínimo,parábola,complementos,proteína,recinto,dos derivadas bajo puntuación conjunta,función racional,alarma y sacos. Sin etiquetas nuevas ni soluciones. [Informe](lotes/L063_2010_EXAMEN_6.md).

**Siguiente fase:** continuar S003 (ocho ejercicios de EXA-0002) y revisar las incidencias antes de validar los casos afectados. S001/S002:ocho soluciones explicadas y validadas;632 pendientes. Tres pasadas del mismo autor, sin revisor independiente.

## Procedencia de L064

Curso2009-2010 impreso,año2010. Septiembre sólo por carpeta,no confirmado en cabecera;tipo,reserva y modelo vacíos. El3del nombre no acredita modelo. Criterios concordantes;examen y criterios sin alias exactos. Tabla por carpeta,sin cita expresa;doce procedencias exactas. Se conservan recinto,consultorio,periódicos,H0 impresa,matrices,trozos,dado y muestreo. INC-021 registra reposición y orden no explicitados en B4b,pendientes de justificar al resolver. Sin etiquetas nuevas ni soluciones. [Informe](lotes/L064_2010_EXAMEN_3.md).

**Siguiente fase:** continuar S003 (ocho ejercicios de EXA-0002) y revisar las incidencias antes de validar los casos afectados. S001/S002:ocho soluciones explicadas y validadas;632 pendientes. Tres pasadas del mismo autor, sin revisor independiente.

## Procedencia de L065

Curso2009-2010 impreso,año2010. Septiembre sólo por carpeta,no confirmado en cabecera;tipo,reserva y modelo vacíos. El1del nombre no acredita modelo. Criterios concordantes;examen y criterios sin alias exactos. Tabla por carpeta,sin cita expresa;doce procedencias exactas. Se conservan recinto,publicidad,fracciones,muestreo,matrices,trozos,camareros y contraste bilateral. INC-022 registra reposición y orden no explicitados en A4b,pendientes de justificar al resolver. Sin etiquetas nuevas ni soluciones. [Informe](lotes/L065_2010_EXAMEN_1.md).

**Siguiente fase:** continuar S003 (ocho ejercicios de EXA-0002) y revisar las incidencias antes de validar los casos afectados. S001/S002:ocho soluciones explicadas y validadas;632 pendientes. Tres pasadas del mismo autor, sin revisor independiente.

## Procedencia de L066

Curso2009-2010 impreso,año2010. Septiembre sólo por carpeta,no confirmado en cabecera;tipo,reserva y modelo vacíos. El2del nombre no acredita modelo. Criterios concordantes;examen y criterios sin alias exactos. Tabla por carpeta,sin cita expresa;doce procedencias exactas. Se conservan matrices,perfiles de arcos,servidores,intervalo de proporción,recinto,beneficio,deportes y contraste unilateral. No se añaden incidencias ni se alteran las anteriores. Sin etiquetas nuevas ni soluciones. [Informe](lotes/L066_2010_EXAMEN_2.md).

**Siguiente fase:** continuar S003 (ocho ejercicios de EXA-0002) y revisar las incidencias antes de validar los casos afectados. S001/S002:ocho soluciones explicadas y validadas;632 pendientes. Tres pasadas del mismo autor, sin revisor independiente.

## Procedencia de L067

Curso 2008-2009 impreso,año2009;otros metadatos vacíos. PDF escaneado de tres páginas:examen en1/2 y criterios concordantes en3. Sin tabla asociada. Seis ejercicios originales,con Partes I/II preservadas en E3. Tres etiquetas nuevas:sistemas-lineales,clasificacion-sistemas,efecto-tamano-muestral. Sin soluciones. [Informe](lotes/L067_2009_CCSS01.md).

**Siguiente fase:** continuar S003 (ocho ejercicios de EXA-0002) y revisar las incidencias antes de validar los casos afectados. S001/S002:ocho soluciones explicadas y validadas;632 pendientes. Tres pasadas del mismo autor, sin revisor independiente.

## Procedencia de L068

Curso 2008-2009 impreso,año2009;otros metadatos vacíos. PDF escaneado de tres páginas:examen en1/2 y criterios concordantes en3. Sin tabla asociada. Seis ejercicios originales,con Partes I/II preservadas en E3. Sin etiquetas ni incidencias nuevas. Sin soluciones. [Informe](lotes/L068_2009_CCSS02.md).

**Siguiente fase:** continuar S003 (ocho ejercicios de EXA-0002) y revisar las incidencias antes de validar los casos afectados. S001/S002:ocho soluciones explicadas y validadas;632 pendientes. Tres pasadas del mismo autor, sin revisor independiente.

## Procedencia de L069

Curso 2008-2009 impreso,año2009;otros metadatos vacíos. PDF escaneado de tres páginas:examen en1/2 y criterios concordantes en3. Sin tabla asociada. Seis ejercicios originales,con Partes I/II preservadas en E3. Sin etiquetas ni incidencias nuevas. Sin soluciones. [Informe](lotes/L069_2009_CCSS03.md).

**Siguiente fase:** continuar S003 (ocho ejercicios de EXA-0002) y revisar las incidencias antes de validar los casos afectados. S001/S002:ocho soluciones explicadas y validadas;632 pendientes. Tres pasadas del mismo autor, sin revisor independiente.

## Procedencia de L070

Curso 2008-2009 impreso,año2009;otros metadatos vacíos. PDF escaneado de tres páginas:examen en1/2 y criterios concordantes en3. Sin tabla asociada. Seis ejercicios originales,con Partes I/II preservadas en E3. Sin etiquetas ni incidencias nuevas. Sin soluciones. [Informe](lotes/L070_2009_CCSS04.md).

**Siguiente fase:** continuar S003 (ocho ejercicios de EXA-0002) y revisar las incidencias antes de validar los casos afectados. S001/S002:ocho soluciones explicadas y validadas;632 pendientes. Tres pasadas del mismo autor, sin revisor independiente.

## Procedencia de L071

Curso 2008-2009 impreso,año2009;otros metadatos vacíos. PDF escaneado de tres páginas:examen en1/2 y criterios concordantes en3. Sin tabla asociada. Seis ejercicios originales,con Partes I/II preservadas en E3. Sin etiquetas ni incidencias nuevas. Sin soluciones. [Informe](lotes/L071_2009_CCSS05.md).

**Siguiente fase:** continuar S003 (ocho ejercicios de EXA-0002) y revisar las incidencias antes de validar los casos afectados. S001/S002:ocho soluciones explicadas y validadas;632 pendientes. Tres pasadas del mismo autor, sin revisor independiente.

## Procedencia de L072

Curso 2008-2009 impreso,año2009;otros metadatos vacíos. PDF escaneado de tres páginas:examen en1/2 y criterios concordantes en3. Sin tabla asociada. Seis ejercicios originales,con Partes I/II preservadas en E3. Sin etiquetas ni incidencias nuevas. Sin soluciones. [Informe](lotes/L072_2009_CCSS06.md).

**Siguiente fase:** continuar S003 (ocho ejercicios de EXA-0002) y revisar las incidencias antes de validar los casos afectados. S001/S002:ocho soluciones explicadas y validadas;632 pendientes. Tres pasadas del mismo autor, sin revisor independiente.

## Procedencia de L073

Año2008 sólo por carpeta;curso,convocatoria,tipo,reserva y modelo vacíos. PDF combinado de tres páginas:examen en1/2 y criterios concordantes en3. Sin tabla asociada. Seis ejercicios originales,con Partes I/II preservadas en E3. Sin etiquetas ni incidencias nuevas. Sin soluciones. [Informe](lotes/L073_2008_CCSS01.md).

**Siguiente fase:** continuar S003 (ocho ejercicios de EXA-0002) y revisar las incidencias antes de validar los casos afectados. S001/S002:ocho soluciones explicadas y validadas;632 pendientes. Tres pasadas del mismo autor, sin revisor independiente.

## Procedencia de L074

Año2008 sólo por carpeta;curso,convocatoria,tipo,reserva y modelo vacíos. PDF combinado de tres páginas:examen en1/2 y criterios concordantes en3. Sin tabla asociada. Seis ejercicios originales,con Partes I/II preservadas en E3. Etiqueta nueva coste-maximo; sin incidencias nuevas. Sin soluciones. [Informe](lotes/L074_2008_CCSS02.md).

**Siguiente fase:** continuar S003 (ocho ejercicios de EXA-0002) y revisar las incidencias antes de validar los casos afectados. S001/S002:ocho soluciones explicadas y validadas;632 pendientes. Tres pasadas del mismo autor, sin revisor independiente.

## Procedencia de L075

Año2008 sólo por carpeta;curso,convocatoria,tipo,reserva y modelo vacíos. PDF combinado de tres páginas:examen en1/2 y criterios concordantes en3. Sin tabla asociada. Seis ejercicios originales,con Partes I/II preservadas en E3. INC-024: muestreo sin reposición ni orden explícitos. Sin etiquetas nuevas. Sin soluciones. [Informe](lotes/L075_2008_CCSS03.md).

**Siguiente fase:** continuar S003 (ocho ejercicios de EXA-0002) y revisar las incidencias antes de validar los casos afectados. S001/S002:ocho soluciones explicadas y validadas;632 pendientes. Tres pasadas del mismo autor, sin revisor independiente.

## Procedencia de L076

Año2008 sólo por carpeta;curso,convocatoria,tipo,reserva y modelo vacíos. PDF combinado de tres páginas:examen en1/2 y criterios en3 (puntuaciones concordantes; rotulación B2 documentada en INC-025). Sin tabla asociada. Seis ejercicios originales,con Partes I/II preservadas en E3. INC-025: criterios B2 rotulados a,c,c,d; examen a,b,c,d intacto. Sin etiquetas nuevas. Sin soluciones. [Informe](lotes/L076_2008_CCSS04.md).

**Siguiente fase:** continuar S003 (ocho ejercicios de EXA-0002) y revisar las incidencias antes de validar los casos afectados. S001/S002:ocho soluciones explicadas y validadas;632 pendientes. Tres pasadas del mismo autor, sin revisor independiente.

## Procedencia de L077

Año2008 sólo por carpeta;curso,convocatoria,tipo,reserva y modelo vacíos. PDF combinado de tres páginas:examen en1/2 y criterios concordantes en3. Sin tabla asociada. Seis ejercicios originales,con Partes I/II preservadas en E3. Sin incidencias nuevas. Sin etiquetas nuevas. Sin soluciones. [Informe](lotes/L077_2008_CCSS05.md).

**Siguiente fase:** continuar S003 (ocho ejercicios de EXA-0002) y revisar las incidencias antes de validar los casos afectados. S001/S002:ocho soluciones explicadas y validadas;632 pendientes. Tres pasadas del mismo autor, sin revisor independiente.

## Procedencia de L078

Año2008 sólo por carpeta;curso,convocatoria,tipo,reserva y modelo vacíos. PDF combinado de tres páginas:examen en1/2 y criterios concordantes en3. Sin tabla asociada. Seis ejercicios originales,con Partes I/II preservadas en E3. INC-026: comilla abierta sin cierre visible en A3-I. Sin etiquetas nuevas. Sin soluciones. [Informe](lotes/L078_2008_CCSS06.md).

**Siguiente fase:** continuar S003 (ocho ejercicios de EXA-0002) y revisar las incidencias antes de validar los casos afectados. S001/S002:ocho soluciones explicadas y validadas;632 pendientes. Tres pasadas del mismo autor, sin revisor independiente.

## Procedencia de L079

Curso 2011-2012 visible en los DOC de examen y criterios convertidos. Examen de dos páginas; criterios de una y tabla normal de una, asociada por carpeta. Ocho ejercicios de 2.5 puntos, sin soluciones. Originales intactos; fórmulas OLE cotejadas visualmente. Sin etiquetas ni incidencias nuevas. [Informe](lotes/L079_2012_EXAMEN_1.md) y [conversión](lotes/L079_conversion.json).

**Siguiente fase:** continuar S003 (ocho ejercicios de EXA-0002) y revisar las incidencias antes de validar los casos afectados. S001/S002:ocho soluciones explicadas y validadas;632 pendientes. Tres pasadas del mismo autor, sin revisor independiente.

## Procedencia de L080

Curso 2011-2012 visible en los DOC de examen y criterios convertidos. Examen de dos páginas; criterios de una y tabla normal de una, asociada por carpeta. Ocho ejercicios de 2.5 puntos, sin soluciones. Originales intactos; fórmulas OLE cotejadas visualmente. Sin etiquetas ni incidencias nuevas. [Informe](lotes/L080_2012_EXAMEN_5.md) y [conversión](lotes/L080_conversion.json).

**Siguiente fase:** continuar S003 (ocho ejercicios de EXA-0002) y revisar las incidencias antes de validar los casos afectados. S001/S002:ocho soluciones explicadas y validadas;632 pendientes. Tres pasadas del mismo autor, sin revisor independiente.

## Procedencia de L081

Curso 2011-2012 visible en los DOC de examen y criterios convertidos. Examen de dos páginas; criterios de una y tabla normal de una, asociada por carpeta. Ocho ejercicios de 2.5 puntos, sin soluciones. Originales intactos; fórmulas OLE cotejadas visualmente. Sin etiquetas nuevas. INC-027 registra que B4b no explicita reposición ni orden en el muestreo. [Informe](lotes/L081_2012_EXAMEN_2.md) y [conversión](lotes/L081_conversion.json).

**Siguiente fase:** continuar S003 (ocho ejercicios de EXA-0002) y revisar las incidencias antes de validar los casos afectados. S001/S002:ocho soluciones explicadas y validadas;632 pendientes. Tres pasadas del mismo autor, sin revisor independiente.

## Procedencia de L082

Curso 2011-2012 visible en los DOC de examen y criterios convertidos. Examen de dos páginas; criterios de una y tabla normal de una, asociada por carpeta. Ocho ejercicios de 2.5 puntos, sin soluciones. Originales intactos; fórmulas OLE cotejadas visualmente. Sin etiquetas ni incidencias nuevas. [Informe](lotes/L082_2012_EXAMEN_4.md) y [conversión](lotes/L082_conversion.json).

**Siguiente fase:** continuar S003 (ocho ejercicios de EXA-0002) y revisar las incidencias antes de validar los casos afectados. S001/S002:ocho soluciones explicadas y validadas;632 pendientes. Tres pasadas del mismo autor, sin revisor independiente.

## Procedencia de L083

Curso 2011-2012 visible en los DOC de examen y criterios convertidos. Examen de dos páginas; criterios de una y tabla normal de una, asociada por carpeta. Ocho ejercicios de 2.5 puntos, sin soluciones. Originales intactos; fórmulas OLE cotejadas visualmente. Sin etiquetas ni incidencias nuevas. [Informe](lotes/L083_2012_EXAMEN_3.md) y [conversión](lotes/L083_conversion.json).

**Siguiente fase:** continuar S003 (ocho ejercicios de EXA-0002) y revisar las incidencias antes de validar los casos afectados. S001/S002:ocho soluciones explicadas y validadas;632 pendientes. Tres pasadas del mismo autor, sin revisor independiente.

## Cierre de la primera pasada y procedencia de L084

Curso 2011-2012 visible en los DOC convertidos. Examen de dos páginas, criterios de una y tabla normal de una asociada por carpeta. Ocho ejercicios, sin soluciones. INC-028 registra un trazo literal tras B2c; no se interpreta como parte de la función. [Informe](lotes/L084_2012_EXAMEN_6.md), [conversión](lotes/L084_conversion.json) y [balance y siguientes tareas](CIERRE_TRANSCRIPCIONES.md).

## Soluciones: avance histórico S001

Dos soluciones validadas, A1/A2 de EXA-0001;638 pendientes. Incluyen teoría, desarrollo, comprobaciones exactas y figura del recinto.22 pruebas superadas; PDF revisados y comprobación del ZIP aislado documentada en el informe al cierre. [Informe](soluciones/S001_2019_A1_A2.md), [tandas secuenciales](LOTES_DE_SOLUCIONES.md) y [auditoría de incidencias](AUDITORIA_INCIDENCIAS_SOLUCIONES.md).

## Soluciones: avance S002

Seis soluciones nuevas validadas; ocho acumuladas y632 pendientes. Se completa EXA-0001, conservando los640 enunciados y sus categorías. Comprobaciones racionales de probabilidades y matrices; derivación racional y percentiles contrastados con bisección de la CDF; tamaños mínimos verificados en n y n-1.22 pruebas y PDF revisados. [Informe](soluciones/S002_2019_RESTO_EXAMEN.md); [tandas](LOTES_DE_SOLUCIONES.md).

## Soluciones: avance S003

EXA-0002: ocho soluciones nuevas validadas;16 acumuladas y624 pendientes. Enunciados y categorías intactos. Tres pasadas del mismo autor;22 pruebas, PDF y ZIP aislado revisados. [Informe](soluciones/S003_2019_SEPTIEMBRE.md). Siguiente:S004.

## Soluciones: avance S004

EXA-0003: ocho soluciones nuevas;24 validadas y616 pendientes. Tres pasadas del mismo autor,22 pruebas, PDF revisados y ZIP extraído comprobado. A4b documenta la diferencia entre amplitud y error y el efecto del redondeo prematuro del cuantil. [Informe](soluciones/S004_2019_SUPLENTE_JUNIO.md). Siguiente:S005.

## Soluciones: avance S005

EXA-0004: ocho soluciones nuevas;32 validadas y608 pendientes. Tres pasadas del mismo autor,22 pruebas, PDF revisados y ZIP extraído comprobado. Se justifican el mínimo sobre una región no acotada y los extremos de las funciones a trozos. [Informe](soluciones/S005_2019_SUPLENTE_SEPTIEMBRE.md). Siguiente:S006.

## Soluciones: avance S006

EXA-0005: ocho soluciones nuevas;40 validadas y600 pendientes. Tres pasadas del mismo autor,22 pruebas, PDF revisados y ZIP extraído comprobado. Se documenta el mínimo sobre un segmento y la limitación del tamaño muestral deducido de límites redondeados. [Informe](soluciones/S006_2019_RESERVA_A.md). Siguiente:S007.

## Soluciones: avance S007

EXA-0006: ocho soluciones nuevas;48 validadas y592 pendientes. Tres pasadas del mismo autor,22 pruebas, PDF revisados y ZIP extraído comprobado. Se conserva el dato120 de A4 y se revisa INC-006 sin modificar el original ni cerrar automáticamente su estado. [Informe](soluciones/S007_2019_RESERVA_B.md). Siguiente:S008.

## Soluciones: avance S008

EXA-0007: ocho soluciones nuevas;56 validadas y584 pendientes. Tres pasadas del mismo autor,22 pruebas, PDF revisados y ZIP extraído comprobado. Se mantienen los cuatro bloques y la numeración global; gráficas, áreas e insesgadez de la media muestral comprobadas. [Informe](soluciones/S008_2021_ORDINARIA.md). Siguiente:S009.

## Soluciones: avance S009

EXA-0008: ocho soluciones nuevas;64 validadas y576 pendientes. Tres pasadas del mismo autor,22 pruebas, PDF revisados y ZIP extraído comprobado. Se comprueban potencias, mínimo sobre un segmento, áreas y dados; E7 documenta4898 con cuantil preciso y4899 con1.96 tabulado. [Informe](soluciones/S009_2021_ORD_SUPLENTE.md). Siguiente:S010.

## Soluciones: avance S010

EXA-0009: ocho soluciones nuevas;72 validadas y568 pendientes. Tres pasadas del mismo autor,22 pruebas, PDF revisados y ZIP extraído comprobado. E1a se formula sin resolver; E7b explica ambas convenciones de reemplazamiento; E8 distingue amplitud y error y comprueba el mínimo 71. [Informe](soluciones/S010_2021_ORD_RESERVA.md). Siguiente:S011.

## Soluciones: avance S011

EXA-0010: ocho soluciones nuevas;80 validadas y560 pendientes. Tres pasadas del mismo autor,22 pruebas, PDF revisados y ZIP extraído comprobado. E3 distingue integral definida y área; E7 explica 783 con cuantil preciso y 785 con 2.81 tabulado; E8 verifica el mínimo 53. [Informe](soluciones/S011_2021_EXTRAORDINARIA.md). Siguiente:S012.

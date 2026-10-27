# Criterios de transcripción y revisión de Selectividad

Fecha de preparación: 2026-10-22. Aplicables a los originales conservados en `../Selectividad/`, al índice de `datos/` y a los fragmentos de enunciado y solución.

## 1. Encargo y alcance actual

**L001-L025 cerradas: 200 enunciados cotejados y 200 clasificaciones verificadas.** L025 incorpora ocho ejercicios del curso 2016-2017, archivo suplemente_junio_EXAMEN 4; se conservan los 192 anteriores. Las 200 soluciones contienen sólo comentarios, sin respuestas. Veinticinco de 84 candidatos cerrados, 59 pendientes. Fase de soluciones inactiva.

En L005-L025, el cotejo consta de segundas pasadas visuales completas del mismo autor, separadas de la escritura; no se atribuye a un segundo revisor distinto. L001-L004 conservan sus propias evidencias de revisión.

Los primeros dieciocho exámenes conservan límites de identificación documentados. L001-L004 tienen convocatoria/tipo de carpeta; L005/L006, reserva y letras de carpeta con convocatoria vacía. L007 confirma ordinaria y curso 2020-2021; L010 confirma extraordinaria y ese curso. L008/L009/L011/L012 sólo imprimen curso: convocatoria y tipo proceden de nombres. L012 conserva reserva B sólo con evidencia del nombre. **L013-L018 confirman curso 2019-2020; convocatoria, tipo, reserva y modelo quedan vacíos.** Los sufijos A-F de P_A/P_B/P_C/P_D/P_E/P_F no acreditan modelos ni opciones; tampoco hay tabla específicamente asociada para estos seis. Todos mantienen modelo vacío, identificación parcialmente confirmada y requiere_revision=si por esos límites. INC-006 conserva matrix de L006; INC-007, (1 puntos) de L015. L010 tiene tabla normal en su página 3. Las fechas del relato, como caducidad 2021 en C6 de L014, no datan el examen.

L007-L018 usan cuatro bloques A-D y números globales 1-8, sin opciones. Sus IDs son BA-E01/E02, BB-E03/E04, BC-E05/E06 y BD-E07/E08 por documento. El original exige cuatro ejercicios de al menos tres bloques y corrige los cuatro primeros que cumplen la regla; la colección reúne ocho para consulta, sin imponer esa regla a la selección didáctica. En L016 A1 imprime total 2.5, sin apartados; otros siete totales derivados de apartados y concordantes con criterios, sin añadir totales al cuerpo. B3 conserva dos derivadas bajo 1.2 y tangentes más corte bajo 1.3; B4a y D7a conservan sus preguntas con puntuación conjunta.

La selección inicial carga `selecciones/l025-suplemente-junio-2017.tex`, lista l025-ids.tex y contexto EXA-0025. Entradas l025-enunciados.tex y l025-con-soluciones.tex; L001-L024 conservadas y 200 soluciones pendientes. En relaciones didácticas nuevas vaciar ContextoSeleccion según la guía para evitar heredar instrucciones del examen.

## 2. Qué significa «exacto»

La transcripción debe ser fiel al **texto visible, al significado matemático, a todos los datos, a las condiciones y a la puntuación** del original. Se conservarán palabras, cifras, unidades, símbolos, signos, desigualdades, dominios, índices, exponentes, intervalos, apartados y orden de las preguntas.

Se reproducirá una tipografía matemática adecuada y fiel en sus distinciones: negritas que identifican apartados, letras, matrices, fracciones, tablas y notación. La paginación del banco podrá adaptarse a la composición modular. No se promete un facsímil pixel a pixel de sellos, marcos, logotipos, saltos de línea o tipografías propietarias. La reorganización editorial nunca autoriza cambiar una condición, una expresión o una pregunta.

| Se puede adaptar para componer | Debe conservarse o documentarse |
| --- | --- |
| Saltos de línea, márgenes y numeración de la colección generada | Número original, opción/bloque, página y examen en los metadatos |
| Comandos LaTeX que representan el mismo símbolo visible | Signo, variable, índice, exponente y sentido de la relación |
| Distribución de una tabla o un sistema para que resulte legible | Todas sus entradas, rótulos, alineaciones que expresan relaciones y condiciones |
| Encabezado editorial separado del fragmento | Puntuaciones, texto común y todas las preguntas originales |
| Recurso gráfico interno legible | Contenido, escala, marcas, ejes, leyendas y letras relevantes del gráfico original |

El título descriptivo del CSV es una ayuda de búsqueda, no una frase del enunciado. No se integra como si lo hubiera escrito la fuente.

## 3. La fuente visible manda

Orden de trabajo:

1. Abrir y renderizar las páginas completas del original. Revisar cabecera, instrucciones, opción/bloque y comienzo y final de cada ejercicio.
2. Usar extracción de texto u OCR únicamente como ayuda para localizar y acelerar la escritura.
3. Cotejar visualmente **cada** fórmula, dato, signo y apartado. El éxito técnico de extracción no certifica fidelidad.
4. Si la lectura sigue siendo ambigua, registrar una incidencia y bloquear esa transcripción. No completar una cifra por plausibilidad ni por el resultado que «debería dar».

Los documentos locales ya muestran problemas de extracción: matrices desordenadas, glifos sin correspondencia, palabras unidas, etiquetas de opción desplazadas y cabeceras antiguas ocultas. En un titular de junio de 2017, el texto extraído conserva una referencia a otro curso, mientras la imagen visible muestra 2016-2017. Por eso ni el nombre del archivo ni el texto bruto deciden por sí solos el año o la expresión matemática.

Los PDF escaneados requieren lectura de la imagen. El OCR no se publicará como enunciado sin cotejo. Si la calidad impide distinguir, por ejemplo, `≤` de `<`, un exponente o un subíndice, se registran la página y la zona afectadas; no se adivina.

## 4. Identificación antes de transcribir

- Asignar una fuente y su SHA-256 original; identificar documento canónico y examen editorial.
- Confirmar curso/año sobre la cabecera visible. Diferenciarlo de años presentes en rutas o en el relato de un problema.
- Separar convocatoria, titular/suplente/reserva, letra de reserva, modelo, opción y bloque.
- Conservar un modelo literal cuando exista, pero no deducirlo de `Ua1`, de la opción A o de la reserva B.
- Numerar páginas físicas desde 1. Si el número impreso es diferente, explicarlo.
- Comprobar la regla original de elección de ejercicios y la duración. Los exámenes con opciones completas y los que usan bloques no se modelan como si fueran equivalentes.
- Detectar duplicados exactos antes de asignar nuevos ejercicios. Mantener todas las rutas originales y una sola transcripción canónica para una copia idéntica.

El [diccionario de CSV](DICCIONARIO_CSV.md) define las columnas y el formato de IDs. Ejemplos: `SEL-D0001-OA-E01` para opción A, `SEL-D0002-BA-E01` para bloque A y `SEL-D0003-NA-E01` para un ejercicio realmente sin opción/bloque. No cambiar el ID cuando se confirme un año o se afine un tema.

## 5. Unidad de transcripción: el ejercicio completo

Un ejercicio es el conjunto formado por su introducción, datos comunes, condiciones, figura o tabla y todos sus apartados, en el orden original. Se mantiene un archivo de enunciado y una fila de CSV por ese conjunto.

- Conservar las letras originales `a)`, `b)`, etc., incluidas subdivisiones.
- Conservar varias preguntas dentro de un apartado o varias condiciones dentro de una misma frase.
- No eliminar un apartado porque trate otro tema.
- No convertir cada condición en un ejercicio independiente.
- No duplicar el texto común para crear aparentes ejercicios nuevos por tema.
- Si el enunciado continúa en otra página, registrar todas sus páginas y reunir su contenido completo.
- Las instrucciones globales del examen se conservan en el registro de examen; si una afecta a la interpretación del ejercicio, debe quedar accesible y documentada sin fingir que pertenece literalmente a su texto.

Una futura selección por apartados exigirá un desarrollo específico con relación a su ejercicio padre. La estructura actual selecciona ejercicios completos para impedir que desaparezcan hipótesis necesarias.

## 6. Escritura de los fragmentos LaTeX

Cada `enunciados/<ID>.tex` será un fragmento, sin `\documentclass`, preámbulo, `\begin{document}` ni comandos globales que alteren otros ejercicios. La composición común incorporará el fragmento desde el documento principal.

Antes del contenido se mantendrán comentarios de procedencia: ID, fuente, huella de la versión, páginas, opción/bloque y número original. No imprimir en el enunciado dudas editoriales como si fueran texto del examen.

### Texto y notación

- Conservar literalmente los nombres propios, el contexto, los datos y las unidades. No «modernizar» precios, redes sociales, tecnologías o escenarios.
- Mantener la distinción entre varianza y desviación típica. No sustituir una por otra ni reinterpretar una notación ambigua sin registrarla.
- Conservar la coma o el punto decimal visibles cuando formen parte de la transcripción. En LaTeX se puede proteger la coma decimal para evitar un espacio matemático indebido, sin cambiar su valor ni su representación.
- Respetar intervalos abiertos/cerrados, desigualdades estrictas, restricciones de signo y dominios.
- Mantener el símbolo original de unión/intersección, complemento, probabilidad condicionada, transpuesta, inversa y determinante. No reemplazarlo por otro que altere su lectura.
- Conservar la notación de derivada, integral y constante, límites de integración y diferencial. No añadir resultados intermedios.
- Matrices y sistemas se escriben con los mismos tamaños, posiciones y entradas. Revisar especialmente signos menos y alineaciones por filas/columnas.
- Si el original incluye una fórmula ya desarrollada o una identidad, se transcribe como dato; no se completa una demostración que no figure.
- Conservar la puntuación total y de cada apartado. Una suma incoherente se registra como incidencia; no se recalcula silenciosamente en el enunciado.

En L001, solo A1 imprime el total `(2.5 puntos)`. Los otros siete ejercicios imprimen puntuaciones por apartados. El índice registra su total `2.5` como suma de esos apartados y explica el origen en observaciones; no se añade ese total derivado al fragmento LaTeX como si figurara en la fuente.

En L002, los ocho totales `2.5` del índice se derivan de las puntuaciones parciales; ninguno se añade al texto como total impreso. En el ejercicio A1, el apartado a) vale un punto para el conjunto de afirmaciones 1) y 2). Se preservan esos dos niveles de numeración sin duplicar la puntuación ni separar el ejercicio.

En L003, los ocho totales `2.5` también se derivan de los apartados y no se añaden como si estuvieran impresos. En A4 se conservan la varianza de `225 mg²` y la exigencia de una amplitud **total** como máximo de `5 mg`; no se sustituye por desviación típica, error ni semiancho. En B3 se preserva la barra de `P(A/B^c)`. En B4 permanece el error **inferior a `0.03`**, sin cambiarlo por una cota no estricta. La reproducción del ordinal masculino mediante `\textsuperscript{o}` mantiene el glifo de la fuente sin requerir un recurso tipográfico TS1 no disponible en el entorno local.

En L004, A1 no imprime una puntuación total ni puntuaciones por apartados: el `2.5` del índice procede **solo de los criterios oficiales vinculados**, no de una suma de apartados. No se añade al fragmento ni se inventa un reparto. Los otros siete totales `2.5` del lote se obtienen de las puntuaciones parciales y tampoco se imprimen como totales añadidos. A4 conserva la proporción de quienes **no habían probado** el nuevo helado y su error **inferior al 5 %** en b); B4 b) conserva el error **inferior a 500 horas**. Se mantienen ambas desigualdades estrictas, sin convertirlas en cotas inclusivas.

En L005, los ocho totales 2.5 se derivan de sus apartados. A1 es un solo ejercicio mixto: T04 principal por 1.5 puntos y T06 secundario por 1 punto. La convocatoria permanece vacía; tipo reserva y letra A sólo provienen de carpeta. `estimacion-puntual` describe una petición de B4, sin aportar resultados. Se preservan cotas, dominios y decimales tal como se ven en la fuente.

En L006, A1 imprime el total 2.5; los otros siete totales se derivan de apartados. Se mantienen el literal matrix de B1b (INC-006), el dato 120 de A4b, P(A/B) de B3 y las cotas estrictas originales. B2 conserva su integral y se relaciona con T02, T01 y T03. La nueva etiqueta dominio no anticipa resultados.

L007: bloques A-D, opción vacía y números globales 1-8. E1 imprime 2.5; los restantes totales se derivan de apartados. D7a reúne dos cuestiones bajo un único 1.5. La convocatoria ordinaria está impresa, mientras titular/junio y Modelo-2 sólo constan en nombres de archivos. Las nuevas etiquetas de área y muestreo no incorporan resultados.

La compilación valida sintaxis y legibilidad. No valida por sí sola que el enunciado coincida con la fuente.

L008 conserva bloques A-D y numeración global; todos los totales se derivan de apartados. Convocatoria/tipo sólo del nombre y modelo vacío. B3 conserva su petición de área sin añadir la expresión «integral indefinida» de los criterios. D8 tiene varianza conocida, distribución de la media e interpretación de intervalo; no solicita calcular tamaño muestral ni un contraste.

L009: A1a solicita formular sin resolver y A1b usa otro recinto sin añadir y≥0. D7b no explicita reposición ni orden de las muestras: se conserva el original y se revisará la convención antes de redactar soluciones. D8b limita la amplitud total a como máximo 0.2; no se transforma en cota estricta ni se sustituye amplitud por semiancho. Las nuevas etiquetas describen contenidos sin respuestas.

L010 conserva 2^(x+1) en B3 y su petición de integral definida entre −2 y 2, sin convertirla en área por la rúbrica. Marzo de 2020 en B4 es contexto temporal, no año del examen. D8 conserva desviación típica 4 y doce datos en su orden original; no se sustituye por varianza ni por una media calculada. La página 3 del original es tabla normal, registrada como auxiliar y no como otro ejercicio.

L011 conserva tres cuestiones bajo 2 puntos en B4a y tres bajo 1.5 en D7b, sin repartir puntos ni separar IDs. D7a no explicita reposición ni orden de las muestras: conservarlo y revisar la convención en la fase futura. D7b compara intervalos con una muestra mayor de igual proporción, sin inventar un nuevo tamaño. D8 mantiene varianza 81, dieciséis datos y confianza 95 % en a frente a 98 % en b. La etiqueta `comparacion-intervalos` no anticipa la respuesta.

L012 conserva «superarse los 2 millones» en A1 y «a lo sumo» 2 % en D7b, sin intercambiar cotas estrictas e inclusivas. D7 cambia confianza 94 a 97 %, mientras D8 cambia 97 a 94 % y da desviación típica 7 cm. B3 conserva las condiciones distintas de a por apartado; C6a sus dos preguntas bajo 1 punto. El espaciado del modo combinado de L012 se ajusta localmente para evitar una página final con sólo un aviso, sin cambiar contenido ni archivos compartidos.

L013 conserva 2+a/(x−1) en B3 y el reemplazo de una bola por seis del otro color en C5. D7 no explicita reposición ni orden: la convención deberá documentarse al resolver en fase futura, sin añadirla al enunciado. D8 mantiene varianza 4, los 16 tiempos en orden, confianza 97.5 % en a y 90 % en b, y error a lo sumo 0.3 minutos. Nueva etiqueta descriptiva asintotas, sin anticipar resultados. No se copian respuestas de los criterios.

L014 conserva todas las preguntas de A1 bajo 2.5 puntos conjuntos, a=2 en A2b y a=0 en A2c, y las funciones distintas f/g en B3. D7 mantiene varianza 9 y error menor a 1.5 euros; D8 da desviación típica 3, muestra 36, intervalo (6.04,8) al 95 %, cambia n a 49 en c y aumenta confianza sin indicar un nuevo nivel en d. Nueva etiqueta comparacion-error para describir esas peticiones sin anticipar resultados. Ninguna respuesta de los criterios se incorpora al banco.

L015 conserva literalmente (1 puntos) en B3a, documentado en INC-007 sin sic ni corrección silenciosa. A2a exige formular sin resolver; A2b da otro recinto. B3 mantiene a=4 y b=−3 sólo en b/c y la condición F(2)=10; B4 conserva dos derivadas bajo 1.2 puntos conjuntos. D7 mantiene varianza 7.84, doce datos en orden, confianza 93.5 % en a y 99 % con n=50 en b. D8 mantiene miles de euros, desviación típica 5, cota inclusiva de una unidad y probabilidad de la media muestral con μ=24 sólo en c. Nueva etiqueta probabilidad-media-muestral, sin anticipar respuestas.

L016 conserva ax+1/2 en B4 y el exponente x³ de e en B3, t minúscula y O mayúscula en A2 y las cursivas de los postres de A1. D7 mantiene varianza 225 y no añade un nivel de confianza al intervalo dado; c exige error inferior a 3 km. D8 da desviación típica 2 meses, nueve datos en orden con 1.0 y 6.0, confianza 95 % en a y 97 % en b, con cota inclusiva no exceda de un mes. Nueva etiqueta interseccion-rectas y T05 secundario de B3 por el punto de corte solicitado, representable mediante un sistema lineal; no impone un método ni anticipa el punto.

## 7. Figuras, tablas y recursos

Los recursos propios de un ejercicio se guardarán bajo `recursos/<ID>/`, con nombres legibles y rutas relativas al proyecto. Se registrarán en `rutas_recursos` y se documentará de qué fuente y página proceden, la transformación aplicada y la huella del derivado.

### Figuras

1. Preferir una extracción o recorte fiel del recurso original, sin alterar el contenido visible.
2. Conservar rótulos, marcas de ejes, valores, unidades, leyendas, regiones y puntos abiertos/cerrados relevantes. Evitar recortes que eliminen condiciones o parte de la figura.
3. Usar resolución suficiente y comprobar el tamaño final de impresión.
4. Si hace falta redibujar por falta de calidad, registrar que se trata de una reproducción; cotejar cada elemento con el original. No derivar una nueva gráfica resolviendo el problema ni rellenar datos ausentes.
5. Si no se puede asegurar fidelidad, dejar el ejercicio bloqueado con una incidencia. Una figura «parecida» no es sustituto válido.

### Tablas

Transcribir celdas, cabeceras, unidades, totales y alineaciones que expresan asociaciones. Cotejar por filas y por columnas, además de volver a leer las cifras. No recalcular ni corregir totales durante la transcripción. Una tabla normal auxiliar del examen se vincula por su `fuente_id`; no debe confundirse con una tabla de datos del ejercicio.

Los gráficos/recursos no deben depender de rutas absolutas ni de archivos situados fuera del paquete que se suba a Overleaf. Los originales externos se conservan para la auditoría, no como dependencia indispensable de compilación.

## 8. DOC heredados y otras conversiones

Los `.doc` originales permanecen intactos. El flujo específico para ellos será:

1. Inventariar y calcular su huella antes de cualquier apertura/conversión.
2. Copiar el archivo a una zona de trabajo del lote; convertir **la copia**, nunca guardar sobre el original.
3. Registrar herramienta, versión, fecha, ruta de copia y archivos derivados. Su huella es distinta de la original y no la reemplaza en el CSV de procedencia.
4. Renderizar la conversión y cotejarla con la visualización del DOC, especialmente fórmulas antiguas, objetos de ecuación, símbolos, tablas y saltos entre ejercicios.
5. Si el conversor pierde una ecuación u objeto, detener esa unidad. No considerar que un PDF convertido correctamente a nivel técnico conserva necesariamente todo su contenido.
6. Identificar páginas y ejercicios solo después de delimitar visualmente la versión útil. No interpretar como cero el campo de páginas todavía vacío del inventario.

Las conversiones y el OCR son auxiliares de trabajo. La procedencia sigue siendo el original, y las decisiones editoriales quedan registradas.

## 9. Erratas, ambigüedades e incidencias

La transcripción se mantiene fiel aunque parezca haber un error matemático o de redacción. No arreglar una desigualdad, una cifra, una hipótesis o una puntuación para hacer que el ejercicio sea resoluble.

Registrar por separado en `datos/incidencias.csv`:

- Fuente, ejercicio y página afectados.
- Qué se ve realmente y qué resulta dudoso o incoherente.
- Si la duda es de lectura, de extracción o del propio original.
- Qué evidencia adicional se ha consultado y qué decisión sigue pendiente.

Una posible corrección editorial futura debe distinguirse claramente del enunciado original, con justificación y trazabilidad. No se introduce como una sustitución silenciosa. Si la fuente no permite decidir, conservar esa limitación explícitamente.

Un archivo con comentarios pendientes o una transcripción en `bloqueada_por_legibilidad` no se contará como material terminado. La salida LaTeX normal solo incorpora el fragmento de enunciado cuando su estado es `cotejada`; cualquier otro estado muestra un aviso visible. El generador excluye los no cotejados por defecto. Para revisar un enunciado `borrador`, se debe seleccionar explícitamente con `--incluir-pendientes` o una lista manual y activar `IncluirBorradores=si` en la configuración. Ese control carga el borrador con aviso, sin cambiarlo a ejercicio cotejado, y no habilita soluciones pendientes.

## 10. Clasificación por temas y etiquetas

Durante la primera pasada se asigna un tema principal y los temas secundarios necesarios entre los nueve del libro. Se añaden los epígrafes y las etiquetas del vocabulario controlado. La clasificación inicial queda `provisional` hasta revisar todos los apartados.

El tema principal expresa el foco dominante, no una exclusividad. Un ejercicio que reúna tangentes, representación y primitivas debe poder encontrarse desde los temas relacionados. Las etiquetas describen contenidos o técnicas solicitadas (`recta-tangente`, `probabilidad-condicionada`, etc.); no se escriben como respuesta anticipada al ejercicio.

Conservar los contenidos de convocatorias históricas, incluidos los contrastes de hipótesis que aparezcan. Se adscriben a inferencia y se marcan como contenido histórico cuando corresponda. No se modifica una hipótesis nula ni se elimina una pregunta para ajustarla a un currículo actual. La pertenencia a una convocatoria antigua no implica por sí sola que todo el ejercicio esté fuera del temario del libro.

## 11. Criterios oficiales como fuente auxiliar

El criterio de corrección se vincula mediante `fuente_criterios`, comprobando que corresponda al mismo examen/modelo/opción. La coincidencia de nombre o de una letra no basta.

Durante la fase actual:

- Se pueden registrar la existencia y la relación documental del criterio.
- No se copian sus soluciones, respuestas finales, cálculos ni desarrollos a los `.tex`.
- No se marca una solución como redactada o `validada` por haber localizado el criterio.
- Si el enunciado no imprime puntuación total ni apartados puntuados, se puede registrar el total que conste expresamente en los criterios concordantes, indicando esa procedencia exclusiva en observaciones. Es el caso de L004 A1: no se presenta como un total impreso en el enunciado ni como una suma inexistente.
- Si el criterio parece contradecir el enunciado, registrar la discrepancia como incidencia; el enunciado no se reescribe para acomodarlo.

Las pautas de corrección y la teoría explicativa se estudiarán en la fase futura de soluciones, separando la fuente oficial de la explicación docente propia.

## 12. Pasadas de enunciados y puerta de revisión

### Pasada 1: escribir e indexar

- [ ] Confirmar original y huella, identidad de examen y páginas.
- [ ] Identificar todos los ejercicios sin duplicar copias exactas.
- [ ] Asignar ID permanente y crear sus dos fragmentos separados.
- [ ] Transcribir el enunciado completo, sus datos, condiciones y apartados.
- [ ] Incorporar recursos fieles y documentar procedencia.
- [ ] Completar CSV: examen, tipo, modelo o su incertidumbre, puntuación, temas, epígrafes y tags.
- [ ] Dejar la solución en `no_redactada`, únicamente con comentarios.
- [ ] Registrar dudas sin completar contenido por intuición.
- [ ] Marcar el enunciado escrito como `borrador`; mantener clasificación `provisional` si aún debe revisarse. Una ilegibilidad indispensable pasa a `bloqueada_por_legibilidad` con incidencia.
- [ ] Para comprobar sintaxis y maquetación del borrador, incluirlo en la selección y activar `IncluirBorradores=si`; conservar el aviso y el estado `borrador` durante estas pruebas.

### Pasada 2: cotejo independiente del enunciado

- [ ] Releer desde el original visible, sin tomar la extracción como autoridad.
- [ ] Comparar texto completo, cifras, símbolos, matrices, intervalos, unidades y puntuaciones.
- [ ] Verificar que no falta texto común ni ningún apartado.
- [ ] Cotejar recursos, leyendas y tabla de datos.
- [ ] Revisar clasificación multitema, etiquetas y metadatos pendientes.
- [ ] Compilar las selecciones pertinentes y comprobar que los fragmentos funcionan juntos.
- [ ] Renderizar y revisar la salida legible y sin recortes.
- [ ] Promover la transcripción a `cotejada` únicamente para las unidades realmente cotejadas; mantener incidencias y bloqueos visibles.

### Pasada 3: clasificación y cierre del banco de preguntas

- [ ] Revisar tema principal, secundarios, epígrafes y etiquetas de todos los apartados; pasar `estado_clasificacion` a `verificada` cuando se cierre esa revisión.
- [ ] Mantener `pendiente` o `provisional` cualquier clasificación no cerrada.
- [ ] Conciliar ejercicios por examen y documento canónico, sin sumar copias exactas como nuevos ejercicios.
- [ ] Comprobar integridad de IDs, huellas, rutas y recursos; probar las selecciones por procedencia y contenidos.
- [ ] Compilar ambos modos y revisar visualmente las páginas. Las soluciones sin `validada` deben mostrar su aviso de pendiente.
- [ ] Documentar cobertura real de temas y lagunas del material, sin fabricar preguntas.

### Qué comprueban las herramientas

Los estados admitidos son los de [PLAN_DE_TRABAJO.md](../PLAN_DE_TRABAJO.md) y [DICCIONARIO_CSV.md](DICCIONARIO_CSV.md). El validador emplea la biblioteca estándar de Python para revisar integridad de datos, referencias, rutas, estados y huellas según sus opciones. No verifica precisión aritmética ni acredita por sí solo fidelidad de transcripción, revisión matemática o calidad docente.

En la composición normal, solo `cotejada` permite cargar un enunciado y solo `validada` permite cargar una solución. Los otros estados producen avisos. El control de revisión disponible es `\IncluirBorradores`, definido inicialmente como `no` en `config/opciones.tex`. Con valor `si`, carga los fragmentos de enunciado en estado `borrador` que ya estén incluidos en la selección, siempre con aviso explícito. Se usa para probar sintaxis, maquetación y cotejo antes de promover el estado. No incorpora enunciados `pendiente` o `bloqueada_por_legibilidad` ni soluciones sin `validada`.

Para esa revisión se necesitan tanto la selección del borrador (`--incluir-pendientes` o lista manual) como `IncluirBorradores=si`. Compilar una selección de pendientes con el control en `no` comprueba estructura y avisos, pero no la sintaxis de los fragmentos omitidos. Tras las pruebas, la configuración normal debe conservar `no`; no se cambia el estado editorial para forzar una carga.

### Cierre de lote

Registrar fecha, fuentes/huellas, IDs, estados antes/después, cantidad de enunciados completos, pendientes, incidencias y controles realizados. Separar número de archivos físicos, documentos canónicos, ejercicios y apartados. No contabilizar una copia duplicada ni un `.tex` vacío como avance de contenido.

## 13. Fase futura de soluciones: varias pasadas, todavía inactivas

Esta sección desarrolla las pasadas 4A a 4D del plan. **No contiene ni autoriza redactar ahora una solución.** La fase comienza después de cerrar el banco de preguntas y trabajar con enunciados `cotejada`; las unidades bloqueadas quedan pendientes.

### 4A. Elaboración matemática — `borrador`

Releer el enunciado cotejado, distinguir datos, objetivos y supuestos expresos, identificar la teoría necesaria y planificar el desarrollo. Registrar ambigüedades antes de avanzar. Redactar en `soluciones/<ID>.tex` la estrategia y todas las operaciones necesarias, conectando cada paso con la propiedad o condición que lo justifica. Explicar restricciones de validez, unidades e interpretación del resultado. Mantener separados los apartados y su dependencia. No añadir una hipótesis tácita para ocultar un problema del original. La solución queda en `borrador`.

### 4B. Verificación independiente — `revisada_matematicamente`

Volver a comprobar cálculos, dominios, hipótesis, casos límite, signos, redondeos, unidades y que se han contestado todas las preguntas. Cuando sea pertinente, emplear otro procedimiento o una verificación numérica independiente. Comparar después con el criterio oficial y documentar discrepancias; la coincidencia de un número final no prueba que los pasos sean correctos. Registrar las comprobaciones y pasar a `revisada_matematicamente` solo cuando se hayan completado.

### 4C. Revisión didáctica y teórica — `revisada_didacticamente`

Comprobar que el estudiante puede seguir el razonamiento, que se explica por qué se elige cada procedimiento y que la teoría aparece en el momento necesario. Distinguir datos originales de supuestos explícitos. Revisar errores frecuentes sin confundirlos con condiciones del enunciado. Comprobar legibilidad de fórmulas, tablas, gráficos y pasos; relacionar los epígrafes por ID cuando se prepare la integración. Finalizada esta revisión, pasar a `revisada_didacticamente`.

### 4D. Validación editorial y compilación — `validada`

Cotejar conjuntamente enunciado y solución, puntuación, notación y conclusión; cerrar las incidencias o declarar las limitaciones de la fuente. Compilar preguntas solas y preguntas con soluciones, comprobar que no se filtran respuestas al modo de preguntas y revisar visualmente todas las páginas generadas. Registrar la validación editorial y de compilación antes de pasar a `validada`.

Solo después de estas cuatro pasadas se podrá cambiar `estado_solucion` a `validada`, que habilita su carga en la salida con respuestas. Los estados intermedios siguen mostrando un aviso de pendiente en la composición normal. Durante todo el trabajo actual de enunciados permanece `no_redactada` y el archivo de solución conserva únicamente comentarios de estructura.

## Selección por epígrafe (estado L025)

Actualmente el generador sin filtros selecciona 200 ejercicios: 16 de 2016, 24 de 2017, 16 de 2018 y 48 de cada año 2019, 2020 y 2021. T06 recupera 26; T03, 21; T05, dos; T09 más tamano-muestral, 44. L025: opción A/B cuatro, bloque A ninguno; beneficio-maximo sólo A1; asintotas sólo A2; seleccion-sin-reposicion sólo A3; intervalo-confianza-proporcion y cota-estricta sólo A4; compatibilidad-dimensiones y ecuacion-matricial sólo B1; clasificacion-discontinuidades sólo B2; union-sucesos y probabilidad-condicionada sólo B3; amplitud-intervalo sólo B4. Tamaño con cota-no-estricta ninguno; tamaño con cota-estricta sólo A4. IDs exactos, temas, epígrafes y etiquetas se combinan por intersección.

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

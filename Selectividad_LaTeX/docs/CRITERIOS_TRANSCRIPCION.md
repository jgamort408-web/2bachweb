# Criterios de transcripción y revisión de Selectividad

Fecha de preparación: 2026-10-22. Aplicables a los originales conservados en `../Selectividad/`, al índice de `datos/` y a los fragmentos de enunciado y solución.

## 1. Encargo y alcance actual

**L001-L084 cerradas: 640 enunciados únicos cotejados y 640 clasificaciones verificadas.** Son 83 exámenes canónicos y 84 de 84 candidatos cerrados; ninguno pendiente de transcripción. L057 es una reedición sin ejercicios nuevos. L084 añade ocho enunciados desde DOC convertidos, curso 2011-2012 impreso. S001-S009 incorporan 64 soluciones validadas;576 siguen sin redactar. La transcripción completa permanece intacta.

En L005-L056 y L058-L084, el cotejo consta de segundas pasadas visuales completas del mismo autor, separadas de la escritura; no se atribuye a un segundo revisor distinto. L001-L004 conservan sus propias evidencias de revisión.

Los primeros dieciocho exámenes conservan límites de identificación documentados. L001-L004 tienen convocatoria/tipo de carpeta; L005/L006, reserva y letras de carpeta con convocatoria vacía. L007 confirma ordinaria y curso 2020-2021; L010 confirma extraordinaria y ese curso. L008/L009/L011/L012 sólo imprimen curso: convocatoria y tipo proceden de nombres. L012 conserva reserva B sólo con evidencia del nombre. **L013-L018 confirman curso 2019-2020; convocatoria, tipo, reserva y modelo quedan vacíos.** Los sufijos A-F de P_A/P_B/P_C/P_D/P_E/P_F no acreditan modelos ni opciones; tampoco hay tabla específicamente asociada para estos seis. Todos mantienen modelo vacío, identificación parcialmente confirmada y requiere_revision=si por esos límites. INC-006 conserva matrix de L006; INC-007, (1 puntos) de L015. L010 tiene tabla normal en su página 3. Las fechas del relato, como caducidad 2021 en C6 de L014, no datan el examen.

L007-L018 usan cuatro bloques A-D y números globales 1-8, sin opciones. Sus IDs son BA-E01/E02, BB-E03/E04, BC-E05/E06 y BD-E07/E08 por documento. El original exige cuatro ejercicios de al menos tres bloques y corrige los cuatro primeros que cumplen la regla; la colección reúne ocho para consulta, sin imponer esa regla a la selección didáctica. En L016 A1 imprime total 2.5, sin apartados; otros siete totales derivados de apartados y concordantes con criterios, sin añadir totales al cuerpo. B3 conserva dos derivadas bajo 1.2 y tangentes más corte bajo 1.3; B4a y D7a conservan sus preguntas con puntuación conjunta.

La selección inicial carga `selecciones/l084-examen6-2012.tex`,lista l084-ids.tex y contexto EXA-0084. Entradas l084-enunciados.tex y l084-con-soluciones.tex; anteriores conservadas y632 soluciones pendientes, con8 validadas. En relaciones nuevas vaciar ContextoSeleccion según la guía.

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

### Reediciones con distinta huella

Comparar todas las páginas,datos,fórmulas,apartados,puntuaciones y erratas. Si los enunciados coinciden,registrar las correspondencias por ejercicio en equivalencias_contenido.csv y conservar los ID canónicos. Si hay diferencias,suspender esa equivalencia y documentar la variante antes de decidir su transcripción. No propagar convocatoria,modelo ni auxiliares por proximidad del nombre.

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

# Reutilización de los HTML de estadística bidimensional

Actualizado: 14 de octubre de 2026 · Entregas 77–84.

## Criterio y alcance

Aplicar el [criterio de reutilización](criterio-reutilizacion-html-estadistica-pl-inferencia.md): integrar el material original, corregir errores justificadamente y señalar huecos sin completarlos con actividades inventadas. Los ocho archivos HTML están guardados como TXT y se conservan intactos.

Destino actual: [apoyo de estadística bidimensional](../libro/apoyos/estadistica-bidimensional.html). Se han revisado e integrado íntegramente la presentación, La variable bidimensional, La nube de puntos, La covarianza, Coeficiente de correlación de Pearson, Regresión lineal, Ejercicios resueltos y Flashcards: los ocho archivos del bloque.

## Correspondencia por archivo

| Fuente | Destino o estado |
|---|---|
| [0. Presentación.txt](<../../Página web existente/2. Estadística Bidimensional/0. Presentación.txt>) | Repaso 1D, esquema dimensional, par ordenado, tabla de 43 alumnos y lectura de marginales integrados. Estado parcial. |
| [1. La variable bidimensional.txt](<../../Página web existente/2. Estadística Bidimensional/1. La variable bidimensional.txt>) | Integrados serie de cinco pares, tabla de 50 familias, marginales y medias. Definición conciliada con la introducción; sin duplicarla. |
| [2. La nube de puntos.txt](<../../Página web existente/2. Estadística Bidimensional/2. La nube de puntos.txt>) | Integrados cuatro diagramas de dispersión y centro de gravedad. Puntos preservados; guía funcional y afirmaciones sobre correlación corregidas. |
| [3. La covarianza.txt](<../../Página web existente/2. Estadística Bidimensional/3. La covarianza.txt>) | Integrados definición, cálculo rápido, esquema de signos, interpretación y dependencia de unidades. Corregidos 0,15→15 y el uso de «aproximadamente cero». |
| [4. Coeficiente de correlación de Pearson.txt](<../../Página web existente/2. Estadística Bidimensional/4. Coeficiente de correlación de Pearson.txt>) | Integrados normalización, fórmula, escala, tres valores y causalidad. Requisitos y alcance de r precisados; cifra causal no sustentada retirada de la exposición factual. |
| [5. Regresión lineal.txt](<../../Página web existente/2. Estadística Bidimensional/5. Regresión lineal.txt>) | Integrados mínimos cuadrados, ecuación, laboratorio estático de predicción y R². Corregidos centro/recta/residuos y la interpretación de fiabilidad. |
| [6. Ejercicios resueltos.txt](<../../Página web existente/2. Estadística Bidimensional/6. Ejercicios resueltos.txt>) | Nueve ejercicios y 32 pasos integrados con selector, tablas semánticas y soluciones desplegables. Datos preservados; cálculos e interpretación revisados. |
| [7. Flashcards.txt](<../../Página web existente/2. Estadística Bidimensional/7. Flashcards.txt>) | Integradas las 20 tarjetas en el visor común, con sus cuatro categorías, índice de origen y respuestas revisadas. Véase la correspondencia de la entrega 84. |

## Presentación: correspondencia completa por bloque

| Origen | Destino | Conservación o adaptación |
|---|---|---|
| Del análisis aislado a relaciones/patrones | Introducción | Conservado su significado. Se omite “Unidad 02. Data Science”, incompatible con la numeración temática actual. |
| Repaso flash 1D: notas, altura | Repaso de una variable | Conservado; tres medidas con sus símbolos, sin inventar fórmulas ausentes. |
| Media, varianza, desviación típica | Lista de definiciones del repaso | Notación original x̄, σ² y σ conservada con MathJax. |
| SVG comparativo 1D/2D | De una a dos variables | Mismos cuatro puntos de cada esquema y marcas de centro, en disposición vertical y con descripción equivalente. |
| Dos características X/Y de una población | Datos emparejados | Se precisa que ambas medidas corresponden al mismo individuo. |
| Par ordenado (xᵢ,yᵢ) | Datos emparejados | Conservado. |
| Lista simple / tabla de doble entrada | Tabulación | Conservado; se incluyen categorías como en la tabla original. |
| Notas de Matemáticas y Física | Tabla de frecuencias | Doce celdas, tres filas, cuatro columnas, marginales y N=43 conservados. |
| Clave de lectura nᵢⱼ | Cómo leer la tabla | Conservada; “Aprobado” se precisa como categoría 5–6. |
| Última columna/última fila | Marginales de X/Y | Valores 18 y 16 conservados; no se confunden con todo el alumnado que supera la asignatura. |
| Esquina N, “total de la población” | Total de observaciones | Se usa grupo estudiado: el enunciado no indica si es población completa o muestra. |

## Datos y correcciones justificadas

- Matriz original de frecuencias: **[8,4,1,0], [3,10,5,0], [0,2,6,4]**. No se modifica ninguna celda.
- Marginales de X: **13,18,12**. Marginales de Y: **11,16,12,4**. Ambas sumas dan **43**.
- La frase “10 alumnos aprobaron ambas” es ambigua: se trata de la categoría Aprobado (5–6) en ambas. Lo mismo ocurre con 18 y 16 en los marginales. Los rótulos se conservan y se precisa su significado.
- Para explicar esa corrección, un desplegable comprueba que, dentro de los datos mostrados, superan Matemáticas **18+12=30**, Física **16+12+4=32**, y ambas **10+5+0+2+6+4=27**. Son comprobaciones del mismo ejemplo, no nuevos problemas.
- “Población” no se puede deducir solo de N: se denomina total del grupo o de observaciones, sin inventar un diseño muestral.
- Esquema 1D: posiciones 30,50,60,90, cuya media es **57.5**, coincidente con la marca original.
- Esquema 2D: posiciones gráficas (30,70), (50,60), (80,40), (110,20), cuyo promedio es **(67.5,47.5)**, coincidente con el círculo original. Se mantienen sin asignar valores estadísticos a coordenadas de pantalla.
- Los dos dibujos no comparten todas las abscisas y no proceden de la tabla: se identifican como esquemas independientes sin escala de datos, para no atribuirles una muestra que la fuente no proporciona.
- Se conserva la tabla con solo tres filas de Matemáticas. La fila Sobresaliente no aparece en la fuente y no se inventan sus frecuencias.
- Los tramos 0–4,5–6,7–8,9–10 no explican cómo clasificar notas decimales; se registra la carencia sin inventar intervalos.

## Integración técnica y lectura

Cabecera/pie y CSS general compartidos, roles editoriales y servicio local de fórmulas. No se copian fuentes remotas, colores/efectos decorativos ni el script que descargaba y ejecutaba el pie externo.

El SVG tiene título, descripción, pie y marcas distinguibles sin depender del color. Disposición vertical para lectura estrecha; coordenadas internas de puntos y centros conservadas.

Tabla con caption, encabezados por fila/columna y referencias headers en celdas, además de marco desplazable con teclado y explicación de uso. Texto, contraste y resaltado compartidos. No se certifica accesibilidad completa con lectores de pantalla.

## Carencias que permanecen

Sin práctica autocorregible, generación procedural, explorador editable ni mazo en esta fuente. El repaso no aporta fórmulas ni ejercicios de medidas unidimensionales. Se conserva lo existente y se indica lo que falta.

Tras la entrega 84, los ocho HTML del bloque están revisados e integrados. Esto no completa las carencias del material original. El cálculo de medias ya está incorporado desde la segunda fuente. El apoyo tiene estado editorial **partial**. Las lecciones desarrolladas siguen siendo 58 y las parciales de tema 6 siguen siendo cinco; se añade **un apoyo parcial**, sin contarlo como otra lección. Estado actual: 318 preguntas, 340 tarjetas y dieciséis juegos; esta entrega añade solo las 20 tarjetas originales.

## Integridad y siguiente paso

0. Presentación.txt — SHA-256: `7d6818dc9467b37270ccda847eda6c8dc524f1d090ddb4e234725b3f746d4e60`. Original intacto. [Verificación](verificacion-entrega-77.md).

Siguiente: leer íntegramente 1. La variable bidimensional.txt, revisar sus tablas y conciliar su contenido con esta presentación.

## Entrega 78 · La variable bidimensional

Fuente íntegra: [1. La variable bidimensional.txt](<../../Página web existente/2. Estadística Bidimensional/1. La variable bidimensional.txt>). Incluye una definición, dos formatos de datos, serie simple de cinco pares, tabla conjunta de 50 familias, lectura de n₂₂ y dos tablas marginales con sus medias. No contiene actividades programadas; el único JavaScript adicional era la carga de MathJax y el pie externo.

### Correspondencia completa

| Bloque original | Destino en el apoyo | Estado |
|---|---|---|
| Definición de (X,Y) sobre cada individuo | Datos emparejados existente | Conciliada en un único bloque, sin repetir la misma definición. |
| Serie simple / N<20 | Cómo organizar los datos | Orientación conservada, identificada como no obligatoria. |
| (5,6),(7,5),(6,8),(4,4),(9,8) | Serie simple | Cinco pares conservados en ese orden y renderizados con LaTeX. |
| Muchos datos / filas X, columnas Y | Cómo organizar los datos | Conservado; se precisa utilidad con valores repetidos. |
| Miniatura de seis rectángulos de color | Explicación de tabla de doble entrada | Ornamentación omitida: no tenía valores ni información estadística adicional. |
| Enunciado de 50 familias | Ejemplo de familias | Conservado: hijos X y días de deporte juntos por semana Y. |
| Tabla conjunta de nueve celdas | Tabla de familias | Todos los valores y totales conservados. |
| 12 central, x₂/y₂/n₂₂ | Lectura de la frecuencia conjunta | Conservado, explicitando x₂=2 e y₂=1. |
| Extracción de marginal X | Tabla de hijos | Sumando filas; valores 1/2/3 y frecuencias 15/20/15 conservados. |
| Media de X | Marginal de hijos | Cálculo original conservado: (15+40+45)/50=2 hijos por familia. |
| Extracción de marginal Y | Tabla de días de deporte | Sumando columnas; valores 0/1/2 y frecuencias 8/23/19 conservados. |
| Media de Y | Marginal de deporte | Cálculo conservado: (0+23+38)/50=61/50=1,22 días por semana y familia. |
| Flecha decorativa de extracción | Orden de lectura y títulos | Relación entre tabla conjunta y marginales explicada en texto; no depende de color o flecha. |

### Datos verificados

- Matriz conjunta: **[5,7,3], [2,12,6], [1,4,10]**.
- Filas: **15,20,15**; columnas: **8,23,19**; ambas suman **50**.
- n₂₂=12 cuenta familias con dos hijos y un día semanal de deporte conjunto.
- Numeradores ponderados: **100** hijos y **61** días-familia semanales. Las medias son **2** y **61/50=1,22**.
- Reconstrucción de las 50 observaciones desde las frecuencias para contrastar las medias, sin alterar la tabla publicada.
- La serie de cinco pares y los ejemplos de 43 alumnos y 50 familias se identifican como datos independientes. No se usa uno como origen de los demás.

### Correcciones y aclaraciones

1. N<20 no es una condición matemática para poder representar una serie simple. Se conserva como orientación del original y se indica que también influyen repetición y propósito.
2. Se cuenta una observación por familia. Las tablas marginales cuentan familias según hijos/días, no hijos o días como si fueran las frecuencias.
3. Se aclaran los índices de n₂₂: el segundo valor de Y es 1, porque sus valores son 0,1,2.
4. Notación decimal adaptada a español: 1.22 se muestra como 1,22, sin cambiar el resultado.
5. La media de días no necesita coincidir con un valor observado en una familia. Se explicita para interpretar el mismo resultado original.
6. Se concilia la definición ya existente y se actualiza el aviso de carencias: ya hay medias calculadas, pero varianza/desviación típica siguen pendientes.
7. Se mantienen las categorías y carencias propias del ejemplo anterior de notas. El nuevo ejemplo no rellena sus celdas ausentes.

Las sumas desplegables comprueban el mismo ejemplo original; no se añaden ejercicios ni preguntas al banco.

### Integración, carencias y siguiente archivo

Tablas con caption, encabezados semánticos y marcos desplazables por teclado. La tabla conjunta asocia cada celda con sus encabezados de fila y columna. Fórmulas locales, cabecera/pie y estilos compartidos; sin fuentes remotas ni scripts del pie externo.

No hay cuestionario, explorador editable, generación procedural ni tarjetas en esta fuente. No se inventan. No se añade cálculo de varianza, covarianza o correlación aún ausente. El apoyo mantiene estado parcial. Conteos globales sin cambios: 58 lecciones desarrolladas, cinco parciales y un apoyo parcial; 318 preguntas, 320 tarjetas, dieciséis juegos.

SHA-256 original: `1242fb2bade4d2f2ac2dab5b9a13e8b9fbfb8a9e92b87f496614688de2bf22a8`. Archivo intacto. [Verificación](verificacion-entrega-78.md).

Siguiente: [2. La nube de puntos.txt](<../../Página web existente/2. Estadística Bidimensional/2. La nube de puntos.txt>), con revisión de coordenadas, escalas y centro de gravedad.

## Entrega 79 · La nube de puntos

Fuente: [2. La nube de puntos.txt](<../../Página web existente/2. Estadística Bidimensional/2. La nube de puntos.txt>).
SHA-256: `816d95d026460386678994fe697880ed854cb97c5eadc26455d440c1a924c297`.

| Bloque original | Destino | Revisión |
|---|---|---|
| Definición del diagrama y par (xᵢ,yᵢ) | [Nube de puntos](../libro/apoyos/estadistica-bidimensional.html#nube) | Ejes X horizontal/Y vertical explícitos. |
| Correlación positiva: altura/peso | Primer dibujo | Nueve puntos conservados; tendencia, no regla individual ni afirmación sobre datos reales. |
| Correlación negativa: precio/ventas | Segundo dibujo | Ocho puntos conservados; ejemplo ilustrativo condicionado al contexto. |
| Incorrelación nula: nota/altura | Tercer dibujo | Nueve puntos conservados; sin tendencia lineal clara, sin afirmar r=0 exacto ni independencia. |
| Dependencia funcional | Cuarto dibujo | Siete puntos conservados; guía poligonal que los une exactamente. No se infiere una ley fuera de los pares. |
| Centro G=(x̄,ȳ) y regresión | [Centro de gravedad](../libro/apoyos/estadistica-bidimensional.html#centro-gravedad) | Seis puntos, centro y dos referencias conservados; repeticiones cuentan en las medias. |
| Signos de cuadrantes | Descripción y texto equivalente | Se refieren al producto de desviaciones, no a coordenadas absolutas. El recuento por zonas no decide el signo. |

### Correcciones justificadas

- La curva original `M20 120 Q80 20 140 120` no pasa por todos los puntos: en x=80 pasa por y=70, mientras el punto está en y=60. Se mantiene cada punto y se sustituye únicamente la guía por segmentos que los unen; no se inventa una función o experimento.
- El tercer dibujo no tiene producto cruzado centrado exactamente nulo. No es riguroso etiquetarlo como r=0 ni deducir independencia. El texto distingue ausencia de tendencia lineal clara de una conclusión numérica.
- «Al aumentar X, aumenta/disminuye Y» pasa a expresar tendencia, con dispersión, y los ejemplos originales se identifican como ilustrativos. Se aclara que correlación no implica causalidad.
- «La mayoría en el primer/tercer cuadrante» no caracteriza la correlación positiva: también pesan las magnitudes de las desviaciones. Se conserva la explicación visual, corrigiendo esa regla.
- Centro original: posiciones gráficas (40,130), (60,110), (80,120), (120,70), (140,50), (160,60). Media gráfica exacta (100,90). No se presentan esas coordenadas de pantalla como datos estadísticos con escala.
- Los cinco esquemas son independientes de las tablas previas. Todos sus puntos se contrastan directamente con el original.
- SVG locales con título, descripción, pie, ejes y marcas legibles sin depender del color. Diseño general y servicio MathJax compartidos conservados; no se importan fuentes ni pie remotos.

### Carencias y continuación

El original no contiene práctica autocorregible, generador, controles interactivos, coeficientes calculados ni datos numéricos con escala para sus dibujos. Se conserva su alcance; no se inventan bancos. Apoyo parcial y revisión global de accesibilidad pendientes.

Siguiente: [3. La covarianza.txt](<../../Página web existente/2. Estadística Bidimensional/3. La covarianza.txt>).

## Entrega 80 · La covarianza

Fuente íntegra: [3. La covarianza.txt](<../../Página web existente/2. Estadística Bidimensional/3. La covarianza.txt>).
SHA-256: `8e2bd30f30ef99f7b56718b0869c2852d9316718fb7c34988cd861c5d5727060`.

| Bloque fuente | Destino | Adaptación |
|---|---|---|
| Varianza / variación conjunta y notaciones Sxy, σxy | [Covarianza](../libro/apoyos/estadistica-bidimensional.html#covarianza) | Definición conservada; se formaliza el promedio de productos descrito en el texto. |
| Fórmula rápida | Covarianza | Media de productos menos producto de medias; suma con límites 1…N explícitos. |
| Lógica de cuatro cuadrantes | [Signos](../libro/apoyos/estadistica-bidimensional.html#signos-covarianza) | Se conservan las cuatro combinaciones, con signos y lista de fórmulas; colores prescindibles. |
| «Qué fuerza gana» | Signos | Suma de productos con sus magnitudes, no recuento de puntos. |
| Positiva / negativa / aproximadamente nula | [Interpretación](../libro/apoyos/estadistica-bidimensional.html#interpretacion-covarianza) | Tendencia lineal; cero exacto separado de cercanía numérica a cero. |
| Dependencia de unidades: altura en m/cm | [Unidades](../libro/apoyos/estadistica-bidimensional.html#unidades-covarianza) | Se conserva 0,15 como punto de partida; resultado corregido a 15. |

### Correcciones y precisiones

- El original usa divisor N. Se explicita convención descriptiva, N>0, un término por observación y diferencia respecto al estimador con N−1; no se cambia de convención.
- La fórmula con desviaciones expresa exactamente la definición verbal original. La suma rápida requiere conservar las parejas y contar las repeticiones; no aplicar una sola vez cada celda de una tabla de frecuencias.
- «X e Y crecen/decrecen» en los cuadrantes pasa a «por encima/por debajo de sus medias»: no son cambios temporales.
- Se preservan las cuatro reglas de signos. El esquema no depende del rojo/verde; SVG local con título, descripción y lista equivalente con LaTeX, sin texto recortado en el borde.
- Covarianza positiva/negativa indica el sentido de la asociación lineal, no una regla individual ni su intensidad.
- «Aproximadamente cero» depende de unidades y dispersión. Se reemplaza la tarjeta ambigua por cero exacto, conservando y explicando la advertencia del original. Covarianza cero no prueba independencia; si una variable es constante, Pearson está indefinido.
- Pasar solo X de metros a centímetros multiplica la covarianza por 100: **0,15→15**. El original da **1500**, que exigiría multiplicar ambas variables por 100. Se conserva el ejemplo de unidades, sin inventar datos observados.
- Se mantiene el significado de la limitación: la covarianza no está normalizada para comparar intensidades entre distintas escalas.

### Límites

La fuente no aporta tabla para calcular una covarianza completa, ejercicio resuelto con datos, actividad autocorregible, generador ni controles de un explorador. Se señalan los huecos, sin crear bancos. Las series usadas en las pruebas son comprobaciones internas de identidad y escala; no se publican como ejercicios del original.

Diseño provisional, cabecera/pie y MathJax local compartidos; sin importación de fuentes o scripts remotos. Apoyo parcial; cuatro fuentes restantes por revisar. Estado actual: 318 preguntas, 340 tarjetas y dieciséis juegos; esta entrega añade solo las 20 tarjetas originales.

Siguiente: [4. Coeficiente de correlación de Pearson.txt](<../../Página web existente/2. Estadística Bidimensional/4. Coeficiente de correlación de Pearson.txt>).

## Entrega 81 · Coeficiente de correlación de Pearson

Fuente: [4. Coeficiente de correlación de Pearson.txt](<../../Página web existente/2. Estadística Bidimensional/4. Coeficiente de correlación de Pearson.txt>).
SHA-256: `32a067a690bdf962ecc4c334f7c6b056b0b2eff0310115ac3c7797ffa34dba3c`.

| Bloque original | Destino | Adaptación |
|---|---|---|
| Problema de unidades, metros·kg y Sxy=540 | [Pearson](../libro/apoyos/estadistica-bidimensional.html#pearson) | Ejemplo 540 conservado; no permite valorar intensidad sin contexto. |
| Normalización por desviaciones típicas | Pearson | Producto de Sx y Sy explícito; mismas observaciones y convención. |
| Fórmula r=Sxy/(Sx·Sy) | Pearson | Conservada con LaTeX común. Requisito Sx>0, Sy>0 añadido para evitar división por cero. |
| Intervalo [-1,1] | Pearson y escala | Conservado, condicionado a que r esté definido. |
| Sentido/fuerza | [Interpretación](../libro/apoyos/estadistica-bidimensional.html#interpretacion-pearson) | Sentido por signo, intensidad lineal por valor absoluto. |
| Termómetro -1,0,+1 | Escala SVG y lista equivalente | Marcas equidistantes; etiquetas textuales completas fuera del SVG, sin recortes ni dependencia del color. |
| r=-0,95 / 0,12 / 0,85 | Tres ejemplos originales | Valores preservados; descripciones cualitativas corregidas. |
| Correlación frente a causalidad | [Causalidad](../libro/apoyos/estadistica-bidimensional.html#correlacion-causalidad) | Azar y tercera variable conservados. |
| Helados/tiburones/verano | Ejemplo hipotético y dos posibles efectos del verano | Conservada la situación, sin afirmar un coeficiente empírico ni una causa demostrada. |

### Correcciones y razones

- «Siempre [-1,1]» requiere un coeficiente definido. Si una variable es constante, r no existe; no se sustituye por cero. Se explicita el requisito que falta en la fuente.
- Desviaciones típicas y covarianza deben usar la misma convención. La división normaliza unidades; cambios positivos de escala como m→cm conservan r.
- Los extremos ±1 indican alineación con pendiente no nula; rectas horizontales/verticales implican una variable constante.
- El termómetro original rotula «Fuerte (-)» y «Fuerte (+)» sobre posiciones aproximadamente ±0,5, sin justificar umbrales. Se conservan intervalo y extremos y se explica la proximidad a 1/0 sin fijar cortes universales.
- r=0 se limita a ausencia de asociación lineal. r=0,12 no significa «sin relación» ni determina una nube redonda. Los otros dos valores son compatibles con tendencias descendente/ascendente, sin reconstruir una forma única.
- Los tres valores son ejemplos ilustrativos sin datos base, independientes de las tablas anteriores.
- El original afirma una correlación «casi perfecta, r≈0,9» entre helados y ataques de tiburones sin fuente, muestra, fechas ni datos. Se mantiene como situación hipotética para explicar confusión por una tercera variable; no se publica 0,9 como resultado comprobado.
- El SVG decorativo de causalidad incluye un marcador de flecha no definido. Su contenido se expresa mediante texto y dos posibilidades bajo el factor común verano, evitando sugerir una flecha causal helado→tiburón.
- Se conserva diseño provisional y servicio MathJax local; no se importan la animación, las fuentes remotas ni el pie externo ejecutable.

### Carencias y siguiente paso

No hay conjunto de datos para calcular r, ejercicio completo resuelto, preguntas autocorregibles, generador ni controles interactivos en esta fuente. Desviaciones típicas se identifican, sin rellenar el bloque ausente de su cálculo. No se inventa una fuente para el ejemplo de causalidad.

Apoyo parcial. Tres originales restantes: regresión, ejercicios y flashcards. Sin cambios en bancos ni juegos (318 preguntas, 320 tarjetas y dieciséis juegos).

Siguiente: [5. Regresión lineal.txt](<../../Página web existente/2. Estadística Bidimensional/5. Regresión lineal.txt>), incluido el laboratorio que contiene.

## Entrega 82 · Regresión lineal

Fuente íntegra: [5. Regresión lineal.txt](<../../Página web existente/2. Estadística Bidimensional/5. Regresión lineal.txt>).
SHA-256: `b872ad7f7e613b39a512e10d29e1999b83f3cd1d467b59f0b844139584ecab7f`.

| Bloque original | Destino | Adaptación |
|---|---|---|
| Mínimos cuadrados: suma de residuos verticales al cuadrado | [Regresión](../libro/apoyos/estadistica-bidimensional.html#regresion) | Se define residuo observado−estimado; no distancia perpendicular. |
| Gráfico de cuatro puntos | Regresión | Puntos intactos; centro, recta y extremos de residuos recalculados. |
| Ecuación punto-pendiente, pendiente covarianza/varianza X | Regresión | Conservada; estimación marcada con sombrero, condición Sx²>0. |
| Laboratorio de predicción | [Ejemplo guiado](../libro/apoyos/estadistica-bidimensional.html#prediccion-regresion) | Era texto estático, sin controles; se conserva como ejemplo resuelto. |
| y−6=0,8(x−5) y y=0,8x+2 | Modelo dado | Valores y transformación conservados. |
| X=7, 0,8·7+2=5,6+2=7,6 | Predicción | Cálculo íntegro conservado; no se afirma interpolación sin intervalo. |
| R²=r² y barra 0…1 | [Determinación](../libro/apoyos/estadistica-bidimensional.html#determinacion) | Condiciones explícitas; significado de extremos en texto, sin barra de fiabilidad. |
| r=0,85 → R²≈0,72 | Determinación | Valor exacto 0,7225 y porcentaje 72,25 %. No porcentaje de certeza. |

### Revisión de la geometría

Se conservan las coordenadas SVG (30,110), (60,90), (100,70), (140,65). Son posiciones de un esquema sin escala de datos; el eje vertical de pantalla crece hacia abajo.

- Centro correcto: **(82,5; 83,75)**. La fuente marcaba (82,90), que no es su media.
- Ajuste vertical por mínimos cuadrados, en coordenadas SVG: pendiente **−227/550**, ordenada **589/5**. La recta original tenía pendiente −0,6 y ordenada 140; no era el ajuste de estos cuatro puntos.
- Cada residuo termina en la recta corregida y comienza en el punto original, manteniendo su abscisa.
- La recta pasa por la media. Se comprueban suma de residuos cero y suma de residuos ponderados por x cero; pequeñas perturbaciones de pendiente/ordenada elevan la suma cuadrática.
- La línea continua, los segmentos discontinuos y el círculo vacío permiten distinguir recta, residuos y centro sin color. SVG con título, descripción y pie equivalente.
- Se separan explícitamente el dibujo, el modelo de predicción y el ejemplo r=0,85; no comparten datos proporcionados por la fuente.

### Precisiones matemáticas

- Una correlación fuerte no es requisito para obtener la recta. La pendiente necesita varianza de X positiva; X constante impide una pendiente única. Y constante con X variable da recta horizontal.
- La notación ŷ evita confundir estimación y valor observado.
- «Interpolación» exige conocer el intervalo observado de X; el archivo no lo aporta. Se explica la diferencia con extrapolación, sin inventar rango.
- R²=r² corresponde al ajuste lineal simple por mínimos cuadrados con término independiente y variables no constantes. Se evita presentarlo como identidad universal de cualquier modelo.
- La frase «El 72 % de la predicción es fiable» es incorrecta: **0,85²=0,7225**, proporción de variación observada de Y recogida por el ajuste. No es una probabilidad de acierto ni prueba causal.
- Los extremos «Pésimo/Perfecto» se sustituyen por significado preciso en la muestra: reducción nula frente a la media/ajuste exacto. No garantizan calidad fuera de los datos.
- Si Y es constante, la variación total es cero y la proporción habitual R² no está definida.

### Alcance del laboratorio y carencias

La inspección completa confirma que el «Laboratorio de Predicción» original no contiene entradas, botones, generador ni código de cálculo: es una terminal decorativa con texto resuelto. Se conserva su contenido en tres pasos con LaTeX. No se inventa un simulador.

Faltan los datos del modelo, el intervalo observado, un cálculo completo desde tabla, residuos numéricos en unidades de un contexto y práctica autocorregible. Se señalan, sin ampliar bancos. Diseño provisional y servicio MathJax compartidos; sin nuevas dependencias ni motores.

Apoyo parcial. Dos originales restantes: ejercicios y flashcards. Bancos intactos: 318 preguntas, 320 tarjetas y dieciséis juegos.

Siguiente: [6. Ejercicios resueltos.txt](<../../Página web existente/2. Estadística Bidimensional/6. Ejercicios resueltos.txt>).

## Entrega 83 · Nueve ejercicios resueltos

Fuente íntegra: [6. Ejercicios resueltos.txt](<../../Página web existente/2. Estadística Bidimensional/6. Ejercicios resueltos.txt>).
SHA-256: `63e41c51a6936bb2dab6efc44957627af0bcdea0865f8307b52ff7ab7007fa3c`.

Se conservan los nueve IDs de origen y **32 pasos** (3,4,4,3,4,4,3,4,3). Los enunciados y los datos observados se mantienen, añadiendo precisiones cuando el original deja ambigüedades.

| Original | Destino | Resultado verificado / corrección |
|---|---|---|
| 1. Tablas, marginales y medias | [Ejercicio 1](../libro/apoyos/estadistica-bidimensional.html#ejercicio-1) | Tabla [4,8,3]/[2,15,8]/[1,5,4], N=50; marginales 15/25/10 y 7/28/15; medias 1,9 y 3,16; condicionada 2/25,15/25,8/25. |
| 2. Covarianza y correlación | [Ejercicio 2](../libro/apoyos/estadistica-bidimensional.html#ejercicio-2) | Cinco pares intactos. Σxy=216, Sxy=3,52, r≈0,888753; corregidos 217,3,72,0,939. |
| 3. Publicidad y ventas | [Ejercicio 3](../libro/apoyos/estadistica-bidimensional.html#ejercicio-3) | Pendiente 4,5; ordenada 7; predicción 34.000 €; R²=0,81. Precisión futura no demostrada. |
| 4. Rectas cruzadas | [Ejercicio 4](../libro/apoyos/estadistica-bidimensional.html#ejercicio-4) | Centro (13,30), r²=0,8, r≈0,894. Cada coeficiente se lee en su orientación. |
| 5. Identificar las rectas | [Ejercicio 5](../libro/apoyos/estadistica-bidimensional.html#ejercicio-5) | B es Y/X; A es X/Y; productos 2,5 (imposible) y 0,4; centro (4,5), r≈0,632. |
| 6. Recuperar parámetros | [Ejercicio 6](../libro/apoyos/estadistica-bidimensional.html#ejercicio-6) | Sx²=9 y Sxy=4,5. Eliminadas vacilaciones editoriales; misma derivación y relaciones válidas conservadas. |
| 7. Cambio de escala | [Ejercicio 7](../libro/apoyos/estadistica-bidimensional.html#ejercicio-7) | Suv=0,75, Su=3,6, Sv=1/3, r=0,625. Fracción exacta hasta el final. |
| 8. Horas y notas | [Ejercicio 8](../libro/apoyos/estadistica-bidimensional.html#ejercicio-8) | Tabla [30,10,0]/[10,20,10]/[0,5,15], N=100; medias 4,8/5,3; aprobados 60 %; Sxy=4,06. |
| 9. Precio y ventas | [Ejercicio 9](../libro/apoyos/estadistica-bidimensional.html#ejercicio-9) | Tabla [0,5,15]/[5,10,5]/[8,2,0], N=50; medias 36/32,8; Sxy=−172,8. Intensidad y precio óptimo no deducidos. |

### Correcciones justificadas

1. **Índices y frecuencias condicionadas.** En el ejercicio 1, j=1,2,3 denota las posiciones de las columnas, cuyos valores son 2,3,4 habitaciones. Se corrigen los subíndices de marginales, de la fila X=2 y de sus frecuencias relativas f1/f2/f3. El 60 % se interpreta en las 25 familias observadas; P se refiere a selección equiprobable dentro de ese subgrupo.
2. **Error aritmético del ejercicio 2.** Los productos son 12+30+30+72+72=216. Las sumas de cuadrados 215/222 y varianzas 4,56/3,44 sí eran correctas. Covarianza 216/5−6,2·6,4=3,52. Pearson usa raíces sin redondear: 3,52/√(4,56·3,44)≈0,888753. Se corrigen paso 1, paso 3, paso 4 y conclusión.
3. **Publicidad no prueba causalidad.** Se expresa el efecto estimado del modelo por cada 1.000 €, conservando la unidad y la pendiente. R²=0,81 describe variación recogida por el ajuste, no una probabilidad de acierto. Falta el intervalo observado para clasificar la predicción.
4. **Dos regresiones.** Se aclara que se multiplican coeficientes de Y/X y X/Y, no dos pendientes de y en función de x. En el ejercicio 4 las rectas son distintas; no se presenta intersección única como propiedad universal de rectas coincidentes. En el 5 se evita llamar contraste estadístico a comparar dos asignaciones.
5. **Ingeniería inversa.** Paso 3 ordenado, sin «¿...? No...» ni «Esto se complica». La simplificación exige Sx²>0; se conserva la solución y las dos identidades alternativas válidas.
6. **Escala.** El ejercicio 7 evita la falsa igualdad que sustituía 1/3 por 0,333 y luego daba exactamente 1,2. Se mantiene 1/3. Invariancia de r requiere factores no nulos; un factor cero vuelve constante una variable. El −10 desplaza la variable expresada en docenas, no es una tasa monetaria.
7. **Promedios agrupados.** Las medias del ejercicio 8 usan valores representativos. No describen necesariamente a un alumno real. El 60 % sale de categorías Aprobado+Notable; agrupar horas no demuestra independencia.
8. **Covarianza negativa.** El ejercicio 9 mantiene −172,8 y elimina «relación inversa fuerte», «se desploman» y recomendación comercial no deducible. Se conserva el apartado de decisión explicando qué información falta.
9. **Presentación.** Se reparan las llaves LaTeX del conjunto del ejercicio 8, escapadas incorrectamente en la cadena JavaScript original. Tablas con caption, encabezados y referencias headers; soluciones nativas desplegables.

### Integración y límites

[Visor reutilizable](../assets/js/learning/worked-problems.js) limitado a su contenedor, con selector individual/todos, enlaces #ejercicio-N, cambios rápidos y cola MathJax local compartida. El HTML contiene todos los ejercicios: sin el módulo siguen disponibles y los desplegables funcionan. No se guardan selección, respuestas ni progreso.

No cambia el motor de problemas de programación lineal ni se importan estilos, fuentes o pie remotos. No se crean ejercicios adicionales ni variantes procedurales. El apoyo sigue parcial: permanece pendiente el original de flashcards y el desarrollo teórico sistemático de varianza/desviación, aunque el ejercicio 2 ya muestra su cálculo.

Siguiente: [7. Flashcards.txt](<../../Página web existente/2. Estadística Bidimensional/7. Flashcards.txt>).


## Entrega 84 · Flashcards: correspondencia y revisión

Fuente: [7. Flashcards.txt](<../../Página web existente/2. Estadística Bidimensional/7. Flashcards.txt>).
SHA-256: `334150ec27c53e9143dba3f4fcc2bfeebfb7ede2d6537578c87a2721048f2a73`.
Destino: [banco independiente](../content/activities/bivariate-cards.js) y [visor de las 20 tarjetas](../tarjetas/index.html?tema=bivariate).
No se modifica el original ni se amplía el número de tarjetas. Las cuatro categorías mantienen sus nombres y cantidades: Conceptos (4), Covarianza (5), Correlación (5), Regresión (6).

Los identificadores `fc-bivariate-original-01`…`20` y `sourceIndex` conservan la correspondencia posicional. `topicId: 'bivariate'` identifica el apoyo, sin asignarlo a un tema numerado distinto.

| Índice original | Concepto | Conservación o corrección |
|---|---|---|
| 1 | Variable bidimensional | Dos medidas del mismo individuo; par ordenado conservado. |
| 2 | Nube de puntos | Su forma ayuda a explorar patrones; no demuestra independencia ni causalidad. |
| 3 | Marginales | Sumas por filas/columnas con orientación explícita de X en filas. |
| 4 | Centro de gravedad | Medias conservadas; propiedad de las rectas precisada a mínimos cuadrados con término independiente y cuando están definidas. |
| 5 | Covarianza | Sentido de asociación lineal, dependencia de unidades; no intensidad por su magnitud. |
| 6 | Fórmula de covarianza | Media de productos menos producto de medias, divisor descriptivo N>0; ponderación cuando hay frecuencias. |
| 7 | Signo positivo | Tendencia positiva conjunta; no regla individual ni causalidad. |
| 8 | Signo negativo | Tendencia negativa conjunta; no regla individual ni causalidad. |
| 9 | Covarianza próxima a cero | Corregido: cercanía a cero depende de unidades. Cero exacto implica r=0 solo con desviaciones positivas; puede haber relación no lineal. |
| 10 | Pearson | Sentido por signo, intensidad por valor absoluto, ausencia de unidades y desviaciones positivas. |
| 11 | Fórmula de Pearson | Conservada; requisitos y coherencia de divisores explícitos. |
| 12 | Rango de r | Cotas cuando está definido; extremos con ambas variables no constantes. |
| 13 | Valor absoluto próximo a uno | Asociación lineal intensa; revisar nube y atípicos, sin garantía de predicción individual. |
| 14 | Correlación y causalidad | Conservada advertencia; se usa valor absoluto para incluir correlación negativa intensa. |
| 15 | Recta de regresión | Mínimos cuadrados de residuos verticales, término independiente, varianza de X positiva y estimación sin certeza. |
| 16 | Ecuación Y sobre X | Conservada razón covarianza/varianza; ŷ distingue estimación y observación. |
| 17 | Residuos | Diferencias con signo; su valor absoluto es distancia vertical. Se minimiza la suma de cuadrados. |
| 18 | R² | Corregida «fiabilidad»: proporción de variación observada recogida por el ajuste, bajo condiciones de regresión simple con término independiente y variables no constantes. |
| 19 | r=0,9 | Conservados 0,81 y 81 %; corregida certeza predictiva a variación observada, con contexto, errores y rango. |
| 20 | Producto de pendientes | Coeficientes Y/X y X/Y en sus propias orientaciones, varianzas positivas y término independiente. No multiplicar ambas pendientes despejando Y. |

### Integración y carencias

Visor compartido con botones nativos, filtro de categoría, contador, mostrar/ocultar y anterior/siguiente. Se conserva el estilo provisional y los roles editoriales; las fórmulas pasan por el servicio local de MathJax y su cola. No se copian el giro 3D, fuentes remotas, motor CDN ni descarga/ejecución del pie externo.

El mazo se enlaza desde el apoyo, el índice de tarjetas, el libro y la conexión con programación lineal. La selección y respuesta visible se reinician al recargar; solo persisten las preferencias de lectura existentes.

Los ocho originales están integrados, pero el apoyo sigue `partial`: faltan desarrollo teórico sistemático del repaso unidimensional, intervalos decimales claros de la tabla inicial, datos individuales, explorador editable y actividades autocorregibles/procedurales. Las tarjetas no califican. No se generan actividades para llenar esos huecos.

[Verificación de la entrega 84](verificacion-entrega-84.md).

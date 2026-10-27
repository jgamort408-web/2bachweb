# Reutilización de los HTML de Distribuciones

Actualizado: 15 de octubre de 2026 · Entregas 85–91.

## Criterio y alcance

Se aplica el [criterio de reutilización](criterio-reutilizacion-html-estadistica-pl-inferencia.md): conservar el material original, revisar sus afirmaciones y registrar las carencias sin inventar actividades para completarlas.

La entrega 85 integra [0. Presentación.txt](<../../Página web existente/4. Distribuciones/0. Presentación.txt>) en el [índice del tema 8](../libro/temas/08-distribuciones-de-probabilidad/index.html). Las entregas 86–89 incorporan las cuatro lecciones; la 90 integra los 21 ejercicios resueltos y la 91 las 19 tarjetas. Los siete originales del bloque están incorporados, con carencias pedagógicas señaladas en las lecciones.

Original intacto: SHA-256 `5da921d5cc8d2a7bcf56ab4606d9e68a562a3965e3e4fd746b24fc7d203a3ea7`.

## Correspondencia por archivo

| Fuente | Destino o estado |
|---|---|
| [0. Presentación.txt](<../../Página web existente/4. Distribuciones/0. Presentación.txt>) | Presentación, cinco bloques del itinerario y cinco objetivos integrados en el índice. Estado parcial. |
| [1. Variable aleatoria.txt](<../../Página web existente/4. Distribuciones/1. Variable aleatoria.txt>) | Integrados definición, distribución discreta finita, tres parámetros y ejemplo del dado. Estado parcial; corregidos notación y redondeo. |
| [2. Distribución Binomial.txt](<../../Página web existente/4. Distribuciones/2. Distribución Binomial.txt>) | Integrados condiciones, fórmula, parámetros y dos ejemplos desplegables. Estado parcial; no contiene simulador. |
| [3. Distribución Normal.txt](<../../Página web existente/4. Distribuciones/3. Distribución Normal.txt>) | Integrados teoría, cuatro gráficos y cinco controles originales. Corregidos recorte silencioso, escalas y sombreado de la acumulada. Segundo parámetro: desviación típica. Estado parcial. |
| [4. Aproximación de la Binomial por la Normal.txt](<../../Página web existente/4. Distribuciones/4. Aproximación de la Binomial por la Normal.txt>) | Integrados teoría, seis controles y cuatro gráficos en 8.4. Corregidas áreas, límites y comparación acumulada. Estado parcial. |
| [5. Ejercicios Resueltos.txt](<../../Página web existente/4. Distribuciones/5. Ejercicios Resueltos.txt>) | Integrados los 21 ejercicios en el índice del tema 8, con seis resultados corregidos y soluciones por pasos desplegables. |
| [6. Flashcards.txt](<../../Página web existente/4. Distribuciones/6. Flashcards.txt>) | Integradas 19 tarjetas en cinco categorías, disponibles en el índice del tema y el visor general. Corregidas definiciones, condiciones binomiales y aproximación. |

## Presentación (entrega 85): correspondencia por bloque

| Original | Destino | Adaptación |
|---|---|---|
| Título y paso de sucesos a variables aleatorias | Título e introducción | Unidad 4 original pasa a tema 8; se conserva la finalidad de modelizar con binomial y normal. |
| «Aquí nace la famosa Campana de Gauss» | Idea clave | Se explica su relación con la densidad normal sin atribuir un origen histórico. |
| 4.1 Variable aleatoria | [8.1](../libro/temas/08-distribuciones-de-probabilidad/01-variable-aleatoria.html) | Contar/medir es orientación, no definición suficiente. Se precisa finito/numerable y modelos continuos mediante densidad. Lección en preparación. |
| 4.2 Binomial y B(n,p) | [8.2](../libro/temas/08-distribuciones-de-probabilidad/02-distribucion-binomial.html) | Se conservan Bernoulli e independencia, añadiendo número fijo de ensayos y misma p. Se aclaran parámetros y significado de éxito. |
| 4.3 Normal, N(0,1) y N(μ,σ) | [8.3](../libro/temas/08-distribuciones-de-probabilidad/03-distribucion-normal.html) | Se conservan tipificación y tabla estándar como contenidos previstos. Segundo parámetro identificado como desviación típica positiva; advertencia sobre notación con varianza. Se retira «la más importante», valoración innecesaria. |
| 4.4 Aproximación, De Moivre–Laplace y «corrección de Yates» | [8.4](../libro/temas/08-distribuciones-de-probabilidad/04-aproximacion-de-la-distribucion-binomial-a-la-distribucion-normal.html) | Se usa «corrección de continuidad», término directo para este procedimiento. No basta n grande; también importan np, n(1−p) y el intervalo. Sin introducir umbrales ausentes. |
| 4.5 Ejercicios resueltos | [#ejercicios](../libro/temas/08-distribuciones-de-probabilidad/index.html#ejercicios) | Conservada la entrada del itinerario, identificada como pendiente. No se crea una lección adicional ni se anuncian soluciones disponibles. |
| Cinco objetivos | [#objetivos](../libro/temas/08-distribuciones-de-probabilidad/index.html#objetivos) | Conservados operación, clasificación, identificación, cálculo y aproximación; se precisan interpretación, supuestos y corrección de continuidad. |
| Enlaces Google Sites | Enlaces relativos locales | Conexiones internas y destinos preparados, compatibles con raíz/subcarpeta. |
| Footer 2024 y pie descargado con ejecución de scripts | Pie y cabecera comunes | No se copia la fecha antigua ni se ejecutan scripts remotos. |

La entrada de tarjetas no estaba en el itinerario de esta presentación: se añade únicamente como espacio pendiente porque existe el archivo original 6. Flashcards.txt. No presupone revisión de su contenido.

## Integración y límites

Sin rediseño visual: estilos compartidos y roles editoriales para título, orientación, ideas clave, estados, objetivos y pendientes. Las fórmulas usan el motor MathJax local existente. No se importan fuentes Google, CDN matemático, tarjetas decorativas ni pie remoto.

Estado actual: `t08` y las lecciones `t08-e01`, `t08-e02` y `t08-e03` tienen estado `partial`; aproximación normal permanece en preparación. Hay 58 lecciones desarrolladas y ocho parciales (6.1–6.5 y 8.1–8.3), además del apoyo parcial bidimensional. Tampoco cambian los bancos: 318 preguntas, 340 tarjetas y dieciséis juegos.

La presentación no aporta definiciones completas, cálculo desarrollado, tabla normal, ejemplos resueltos ni interacción matemática. Esas ausencias no se atribuyen automáticamente a los otros archivos, que aún deben revisarse. El índice conserva los espacios y explica su estado.

Los cinco bloques y objetivos permanecen accesibles como HTML sin JavaScript; para componer las fórmulas hace falta el motor común. La revisión de esta entrega no certifica accesibilidad global, concurrencia del alojamiento ni funcionalidades futuras de administración, cuentas, traducción o voz.

[Verificación de la entrega 85](verificacion-entrega-85.md).


## Entrega 86 · Variable aleatoria

Fuente: [1. Variable aleatoria.txt](<../../Página web existente/4. Distribuciones/1. Variable aleatoria.txt>).
Destino: [8.1. Variable aleatoria](../libro/temas/08-distribuciones-de-probabilidad/01-variable-aleatoria.html).

Original intacto: SHA-256 `a3f1e744d9f2308155e0c3eebcd0f049e14135973737730fa4f3302bb4eec8c2`.

| Bloque original | Destino | Revisión |
|---|---|---|
| Paso del suceso cualitativo al número | Introducción y definición | Se distingue resultado del experimento, suceso y número asignado; no se limita la utilidad a «estadística avanzada». |
| Función X:E→R | #definicion | Conservada; distintos resultados pueden compartir valor. |
| E={x₁,…,xₙ}, P(X=xᵢ)=pᵢ y X como lista de pares | #probabilidad | Separa espacio muestral de valores de X y distingue la función de su distribución. Pares conservados como representación de la distribución. |
| 0≤pᵢ≤1 y suma 1 | Condiciones obligatorias | Conservadas con índices explícitos y cobertura de todos los valores. Alcance: discreto finito. |
| «Descriptiva (muestras) frente a población teórica total» | #parametros | Corregido: descriptiva resume datos de muestras o poblaciones; aquí se estudian parámetros de un modelo de probabilidad. |
| Media, varianza y desviación típica | Tres definiciones | Conservadas las tres fórmulas; índices finitos, unidades y raíz no negativa explícitos. |
| Dado perfecto, valores 1…6, p=1/6 | #ejemplo-dado | Mismos datos en tabla semántica de seis filas; equilibrio explícito y suma de probabilidades verificada. |
| Media 3,5 | #dado-media | Resultado conservado; se aclara que la esperanza no tiene por qué ser un valor posible de una tirada. |
| Suma de cuadrados ≈15,17 | #dado-cuadrados | Se mantiene 91/6 exacto hasta el final; 15,17 solo como aproximación. |
| Varianza 15,17−3,5²=2,92 | #dado-varianza | Varianza exacta 35/12≈2,92. El decimal original es correcto a dos cifras, pero se evita redondear durante el cálculo y presentarlo como valor teórico exacto. |
| Fuentes, estilos y pie remoto | Componentes comunes | No se importan diseños, CDN ni ejecución del pie externo. |

La tabla y los tres pasos reorganizan el mismo ejemplo, no añaden problemas nuevos. La desviación típica conserva su fórmula; no se inventa una colección de ejercicios ni se completa con actividades procedurales.

### Carencias y estado

El original no desarrolla la clasificación discreta/continua ni el cálculo con densidades; tampoco contiene explorador editable, preguntas autocorregibles o generación procedural. Se indica en la lección, sin atribuir esas ausencias a los cinco archivos aún no revisados.

La lección queda parcial. El índice del tema, el libro y los recuentos actuales reflejan una lección parcial en el tema 8. La relación de ejercicios del archivo 5 sigue pendiente; el índice distingue esa relación del ejemplo del dado ya disponible.

Bancos conservados: 318 preguntas, 340 tarjetas y dieciséis juegos. [Verificación de la entrega 86](verificacion-entrega-86.md).


## Entrega 87 · Distribución binomial

Fuente: [2. Distribución Binomial.txt](<../../Página web existente/4. Distribuciones/2. Distribución Binomial.txt>).
Destino: [8.2. Distribución binomial](../libro/temas/08-distribuciones-de-probabilidad/02-distribucion-binomial.html).
SHA-256 del original intacto: `410aed552dd9b8ff62a3086ec5235f17daef4e0af3ca874ab542a54b0e53ed23`.

| Bloque original | Destino y revisión |
|---|---|
| Bernoulli, cara/cruz, encestar/fallar y piezas | #condiciones; ejemplos y significado de ensayo conservados. |
| Cuatro condiciones | Se mantienen resultados binarios, repetición, independencia y p constante. Se explicita n fijo y entero positivo. |
| Éxito no necesariamente bueno | Conservada la pieza defectuosa como éxito del recuento. |
| Función P(X=k) | #probabilidad; X cuenta éxitos y se explicitan soporte y parámetros. Fórmula para 0<p<1; extremos p=0/1 resueltos directamente, sin 0⁰ ambiguo. |
| Tres factores de la fórmula | Coeficiente como elección de posiciones; producto como probabilidad de una secuencia. Se corrige «éxitos acumulados», que podía confundirse con probabilidad acumulada. nCr conservado. |
| Media y desviación típica | #parametros; fórmulas originales conservadas. Varianza npq explicitada a partir de σ=√npq, acorde con el título original que anunciaba media y varianza. |
| Laboratorio de ejercicios | #ejemplos; dos ejemplos con soluciones desplegables nativas. La fuente no tiene controles numéricos ni simulación. |
| Baloncesto | n=5, p=0,8, k=3, coeficiente 10, factores 0,512 y 0,04, resultado 0,2048=20,48 % conservados. Independencia y p constante explicitadas como supuestos. Exactamente tres no equivale a al menos tres. |
| Control de calidad | n=1000, p=0,02 y q=0,98 conservados; μ=20 y σ=√19,6≈4,43 verificados. El promedio no garantiza un recuento de 20; σ no es un margen garantizado. |
| Diseño, CDN y pie externo | Sustituidos por componentes, estilos y servicio matemático comunes; no se ejecutan scripts remotos. |

### Carencias y estado

La lección es parcial. El original no contiene simulador, parámetros editables, gráfico de probabilidades, corrección automática ni generación procedural. No se crean actividades para llenar esos huecos. Las probabilidades acumuladas y el archivo de ejercicios del bloque quedan pendientes de conciliación con los archivos no revisados.

Los dos ejemplos mantienen sus datos y resultados. No se añaden preguntas, flashcards ni juegos: bancos 318/340 y dieciséis juegos. Tres archivos del bloque integrados, cuatro pendientes. El índice y el libro reflejan dos lecciones parciales en el tema 8.

[Verificación de la entrega 87](verificacion-entrega-87.md).


## Entrega 88 · Distribución normal

Fuente: [3. Distribución Normal.txt](<../../Página web existente/4. Distribuciones/3. Distribución Normal.txt>).
Destino: [8.3. Distribución normal](../libro/temas/08-distribuciones-de-probabilidad/03-distribucion-normal.html).
SHA-256 original: `0ca90f4cdd30b81ffcf053cfd31e21ad4904bde9c656f48acb225e00afa8d1f0`.

| Original | Integración y corrección |
|---|---|
| Normal para estaturas, pesos, errores y tiempos | Ejemplos conservados como posibles aplicaciones; no se afirma que toda variable continua sea normal. |
| «Probabilidad puntual no tiene sentido» y P(X=3)=0 | Se corrige: sí está definida y vale cero; no equivale a imposibilidad. Intervalo 2,9–3,1 conservado. |
| N(μ,σ), PDF y CDF | Fórmulas separadas para facilitar lectura; σ es desviación típica positiva, no varianza. Densidad y probabilidad diferenciadas. |
| Media, dispersión e inflexiones | Conservadas μ y μ±σ; escala fija hace visibles desplazamiento, anchura y altura. |
| Dos gráficos pequeños | Conservados como vistas de referencia, con viewBox 680×320 coherente con el dibujo. El original usaba viewBox 420×210 para coordenadas 680×320, recortando las vistas. |
| Área total, intervalo y acumulada | Conservadas las tres propiedades; se precisa a≤b y que los extremos no afectan al área. Fórmula del intervalo recompuesta en un único bloque. |
| Tipificación, receta y simetría | Conservados Z, Φ, tres pasos y Φ(−z)=1−Φ(z). Se advierte que una tabla debe corresponder al área que se consulta. |
| Cinco deslizadores | Mismos nombres, rangos, pasos y valores iniciales. Etiquetas asociadas por for/id, valores visibles y aria-valuetext. |
| Recorte a μ±4σ | Retirado el cambio silencioso de a, b y k; se calculan los valores realmente seleccionados. La ventana gráfica fija cubre todos los valores admitidos. |
| Escalas adaptadas a μ y σ | Sustituidas por x∈[−12,12], densidad entre 0 y 0,85, acumulada∈[0,1]. Se evita que traslación y cambio de anchura parezcan invariantes en pantalla. |
| Intervalos invertidos | Se conserva el cálculo entre extremos ordenados, pero se anuncia expresamente cuando a>b. Cuando a=b, probabilidad cero. |
| PDF grande con sombreado | Conservada el área entre extremos; rayado identificable sin color. Marcas de media, inflexiones y k. |
| CDF grande con banda rectangular | Se elimina la banda que podía confundirse con un área de probabilidad. Se mantienen punto y guías para leer F(k) como altura. |
| Lecturas F(k), intervalo, zₖ/zₐ/zᵦ | Conservadas; se usan etiquetas inferior/superior tras ordenar extremos. Resultados aproximados y límites del redondeo explícitos. |
| 68,27 / 95,45 / 99,73 % | Valores conservados como probabilidades aproximadas del modelo; no garantías muestrales ni criterio para eliminar observaciones. |
| Aproximación erf | Coeficientes originales conservados; se calcula directamente la cola pequeña, Φ(0)=0,5 exacto y diferencias de colas para intervalos positivos. |
| Llamada MathJax directa en cada input | Sustituida por la cola compartida y agrupación de cambios mientras se procesa la actualización anterior. |
| Fuentes, estilos y pie remoto | Componentes y estilos comunes; sin ejecutar pie externo ni cargar un segundo motor. |

### Controles conservados

| Control | Mínimo | Máximo | Paso | Inicial |
|---|---:|---:|---:|---:|
| μ | −2 | 2 | 0,1 | 0 |
| σ | 0,5 | 2,5 | 0,1 | 1 |
| a | −4 | 4 | 0,1 | −1 |
| b | −4 | 4 | 0,1 | 1 |
| k | −4 | 4 | 0,1 | 0,8 |

Vistas de referencia: PDF con intervalo μ±σ y CDF con punto μ+0,8σ. Vistas del explorador: intervalo a/b y punto k seleccionados.

### Arquitectura y precisión

- [Modelo numérico](../content/models/normal-distribution.js): densidad, acumulada, intervalo ordenado y lecturas; exige σ positiva.
- [Interfaz y gráficos](../assets/js/learning/normal-explorer.js): cuatro SVG con títulos/descripciones, cinco controles y resultados.
- [Pruebas del modelo](../tests/normal-distribution.test.mjs): comparación con integración de Simpson independiente en la malla comprobada, con tolerancia absoluta de 2×10⁻⁷.
- [Prueba del navegador](../tests/normal-import-88-browser.cjs): correspondencia original, extremos, controles, composición matemática, lectura y navegación.

No se presenta la aproximación como exacta. Las probabilidades aparecen a cuatro decimales; se avisa de que redondear a cero o uno no equivale a imposibilidad o certeza. Las colas de la normal no se cortan por el borde del gráfico.

Los gráficos usan texto equivalente, rayado y guías, además de marcos desplazables con teclado. Los roles y estilos están limitados a los gráficos para no alterar los SVG de las fórmulas. Los controles permanecen ocultos hasta la inicialización; sin JavaScript queda disponible la teoría y una explicación de la limitación.

### Estado y carencias

Lección parcial: el original no incluye tabla normal consultable, ejercicios resueltos independientes, evaluación automática ni preguntas procedurales. No se inventan esas actividades. Parámetros y progreso no se guardan; solo permanecen las preferencias de lectura comunes.

Cuatro originales del bloque integrados, tres pendientes. Bancos conservados: 318 preguntas, 340 tarjetas y dieciséis juegos.
[Verificación de la entrega 88](verificacion-entrega-88.md).

## Entrega 89 · 14 de octubre de 2026

- Fuente: [4. Aproximación de la Binomial por la Normal.txt](<../../Página web existente/4. Distribuciones/4. Aproximación de la Binomial por la Normal.txt>).
- Destino: [8.4. Aproximación binomial-normal](../libro/temas/08-distribuciones-de-probabilidad/04-aproximacion-de-la-distribucion-binomial-a-la-distribucion-normal.html).
- SHA-256 original intacto: 04858d820bc36c49cbda3a3eb057d0bfdf84ab3a0ff5751899b5202a17eb6779.
- Conservados recordatorio normal, PDF/CDF estándar, condiciones np y nq, método en tres pasos, comparación de masa/densidad y acumuladas, seis deslizadores y lecturas de probabilidad/error.
- Recurrencia binomial iniciada desde el extremo más estable; reutilizada la función normal del modelo compartido. Fórmulas mediante la cola local de MathJax y agrupación de cambios.
- Corregidos recortes del área normal en 0/n y del marcador K+0,5; ventana finita diferenciada del cálculo de toda la cola. Barras con ancho uno. No se sombrea como probabilidad el área bajo una CDF.
- Al reducir n se sincronizan los límites; A/B invertidos se ordenan con aviso. A=B representa un entero con masa positiva. La CDF sigue comparando hasta K en ambos modos, ahora indicado expresamente.
- Orientación np,nq ≥ 5 presentada sin garantía de precisión; error absoluto calculado antes de redondear. Desviación típica identificada como segundo parámetro normal.
- No se añaden bancos ajenos al original. Estado parcial; faltan los dos archivos de ejercicios y tarjetas. Total actual: 58 lecciones desarrolladas, nueve parciales, 318 preguntas y 340 tarjetas; dieciséis juegos.

## Entrega 90 · 15 de octubre de 2026

- Fuente: 5. Ejercicios Resueltos.txt, SHA-256 2e133ff691c234d27ef6ad80b5000bc6a91d20412879939e71c567724a610d54; original intacto.
- Destino: Ejercicios resueltos del índice del tema 8. Los 21 enunciados se agrupan en siete binomiales, nueve normales y cinco aproximaciones. Se conservan los pasos originales cuando son correctos; selección y soluciones desplegables usan el componente compartido. Sin JavaScript, todos los ejercicios siguen visibles.
- Resultados contrastados mediante suma binomial independiente o CDF normal: ejercicio 2, 0,1316 (original 0,131); 3, 0,3233 (original 0,239); 4, 0,8389 (original 0,609); 5, 0,0402 (original 0,041); 7, 0,1138 (original 0,113); 19, 0,9333 (original 0,934). El 11 corrige un producto intermedio: 1,2·1,282=1,5384.
- Se evita presentar el umbral np,nq≥5 como garantía exacta. La solución 19 calcula con z sin redondear antes de interpretar la cifra final.
- La fuente no contiene preguntas autocorregibles ni tarjetas. Queda por revisar el archivo original de flashcards. El tema permanece parcial.

## Entrega 91 · 15 de octubre de 2026

- Fuente: [6. Flashcards.txt](<../../Página web existente/4. Distribuciones/6. Flashcards.txt>), SHA-256 e67fbb789f3e5c8afd199a71e542d275cbcaa5a3b76d9b9ad7f08b3fc4d11a2a; original intacto.
- Integradas 19 tarjetas, correspondencia uno a uno y orden de fuente: Conceptos 3, Binomial 4, Normal 3, Tipificación 5, Aproximación 4. Visibles en el índice del tema 8 y en el visor general.
- Revisión conceptual: variable discreta finita/numerable, densidad como función y área como probabilidad, independencia y p constante en la binomial, combinaciones sin orden, sigma como desviación típica, lectura de la tabla para z negativo, np y nq ≥ 5 como orientación, y normal Y explícita en la corrección de continuidad.
- Mazo común con MathJax local, categorías, teclado y preferencias de lectura; sin guardar respuestas ni progreso. No se inventan tarjetas adicionales.
- Los siete archivos originales de Distribuciones están integrados. Permanecen las carencias pedagógicas documentadas y el estado parcial de las cuatro lecciones. Total actual: 318 preguntas, 359 tarjetas y dieciséis juegos.

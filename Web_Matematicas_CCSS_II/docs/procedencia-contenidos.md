# Procedencia y revisión del contenido

Las rutas de fuentes se refieren a la carpeta superior del proyecto. Los originales permanecen intactos.

| Contenido | Fuente y localizador | Adaptación |
|---|---|---|
| t01-e01 | Temario completo/Guion_Temario_Matematicas_CC_Sociales_II_2Bach.md, `1.1 | Desarrollo original: coste lineal, cociente con hueco, valor puntual distinto, tabla, gráfica y tipos de límite |
| t01-e02 | Mismo guion, `1.2 | Desarrollo original: tarifa con salto, ramas coincidentes, parámetro, laterales infinitos y extremo de dominio |
| lim-001, lim-003, lat-002, lat-003 | Objetivos del guion 1.1–1.2 | Preguntas originales con distractores y explicaciones |
| lim-002 | Planificacion_Interactiva_2Bach_CC_Sociales/03_Tests_2Bach_CC_Sociales.md, T1.1 | Misma función, pregunta ampliada para distinguir dominio, valor puntual y límite |
| lat-001 | Mismo banco, T1.2 | Laterales 3 y 5; feedback específico por opción |
| Tarjetas 1, 2, 5 y 6 | Planificacion_Interactiva_2Bach_CC_Sociales/02_Flashcards_2Bach_CC_Sociales.md, filas 1–4 de T1 | Reformulaciones con hipótesis y explicación |
| Resto de tarjetas | Guion 1.1–1.2 y lecciones desarrolladas | Elaboración propia |
| Límite Express | Planificacion_Interactiva_2Bach_CC_Sociales/01_Laboratorios_Minijuegos_2Bach_CC_Sociales.md, laboratorio 1A | Versión parcial: diez rondas, tres familias, sin tiempo. Faltan infinito, asíntotas, lectura gráfica y modalidades de reto |

## Verificación matemática

- (x²−4)/(x−2) = x+2 solo si x ≠ 2; límite 4 y valor no definido.
- Cambiar el valor de la recta en 2 a 9 conserva el límite 4.
- Gráfica y tabla: y=x+2; punto aislado (2,9).
- Tarifa: laterales 25 y 28; salto 3; valor en 10 igual a 28.
- Ramas x+1 y 5−x en 2: ambos laterales 3, valor puntual 7.
- Parámetro: 3=4+k, luego k=−1.
- 1/x en 0 tiene laterales de signo distinto; 1/x² tiene ambos laterales +∞.
- El generador excluye a=0 en la diferencia de cuadrados para mantener distintas las opciones 2a, 0 y a.
- La mezcla de opciones conserva la respuesta correcta mediante IDs.

La revisión curricular del resto y la auditoría de los materiales locales siguen pendientes. Dos lecciones revisadas no equivalen a cerrar el tema 1.

## Entrega 02: infinito y asíntotas

Los cuatro epígrafes 1.3–1.6 siguen los correspondientes apartados del guion maestro. La explicación, los ejemplos nuevos, las tablas, el modelo de difusión y las actividades son elaboración didáctica propia.

| Contenido | Procedencia específica | Trabajo realizado |
|---|---|---|
| 1.4, ejemplo de 1/(x²−3x+2) en 1 | Examen Límites y Derivadas, main.tex, pregunta 3(f) | Factorización y comprobación de signos; límite izquierdo +∞, derecho −∞ |
| 1.5, (5x+7)/√(2x²+3) | Mismo examen, pregunta 3(c) | Resolución en +∞ y ampliación original al extremo negativo; límites ±5/√2 |
| 1.6, 3^x−x^5 | Mismo examen, pregunta 3(b) | Resolución mediante comparación de crecimientos, con propiedad declarada y justificación por derivación diferida |
| inf-001 a inf-003, point-001 a point-003, horiz-001 a horiz-003, end-001 a end-003 | Guion 1.3–1.6 y lecciones elaboradas | Doce preguntas originales, cada una con cuatro alternativas, pista y explicación |
| Doce tarjetas añadidas | Mismos epígrafes y ejemplos | Síntesis original de definiciones, métodos y errores frecuentes |
| Cuatro familias nuevas de Límite Express | Planificación del laboratorio 1A y epígrafes 1.4–1.6 | Signos de laterales infinitos, cocientes de grado igual, extremos de polinomios y asíntotas verticales |

La ruta del paquete es Materiales y Recursos y Exámenes/BACH - 2º SOC - Examen Límites y Derivadas.zip, en la carpeta superior. Solo se leyó su main.tex; la compilación y revisión del PDF siguen pendientes.

### Comprobaciones matemáticas nuevas

- x²−3x = x²(1−3/x) → +∞ y 2x−x² = x²(2/x−1) → −∞ cuando x→+∞.
- 3/(x−2) tiene laterales −∞ y +∞; −2/(x+1)² tiene ambos laterales −∞.
- En torno a 1, el factor x−2 permanece negativo. Esto fija los signos de 1/((x−1)(x−2)).
- El cociente (3x²−2x+1)/(2x²+5) tiende a 3/2 en ambos extremos.
- √(2x²+3) = |x|√(2+3/x²) para x≠0; se mantiene el valor absoluto en el extremo negativo.
- Mt/(t+4) = M−4M/(t+4); para M>0 y t≥0 finito, la diferencia respecto a M es positiva.
- La tabla del modelo con M=1200 da 600, 900, 1080 y 1188; diferencias 600, 300, 120 y 12.
- −2x³+5x²−7 y (−3x³+2)/(2x²+1) tienen límite +∞ a la izquierda y −∞ a la derecha.
- (2x⁴−x)/(x²+1) tiende a +∞ en ambos extremos.
- Los generadores se contrastan numéricamente con las expresiones originales, además de revisar soluciones y alternativas.

El total desarrollado pasa a seis epígrafes. Los mínimos globales de problemas y preguntas del tema 1 permanecen pendientes.

## Entrega 03: operaciones y técnicas de cálculo

La secuencia sigue los apartados 1.7–1.9 de Temario completo/Guion_Temario_Matematicas_CC_Sociales_II_2Bach.md. Las explicaciones, los ejemplos complementarios y las actividades son elaboración didáctica propia.

| Contenido | Fuente y localizador | Adaptación |
|---|---|---|
| 1.7 | Guion, `1.7 | Propiedades con hipótesis, composición continua y contraejemplo de composición |
| 1.8, límite de (1−√(1−x²))/x² en 0 | Materiales y Recursos y Exámenes/BACH - 2º SOC - Examen Límites y Derivadas.zip, main.tex, 3(a) | Resolución por conjugado, dominio y límite 1/2 |
| 1.9, límite de 7/(x−4)−(4x+12)/(x²−4x) en 4 | Mismo paquete y archivo, 3(e) | Común denominador, simplificación a 3/x fuera de 0 y 4, límite 3/4 |
| prop-001 a prop-003, calc-001 a calc-003, ind-001 a ind-003 | Guion 1.7–1.9 y ejemplos desarrollados | Nueve preguntas con distractores, pistas y explicación; calc-002 e ind-001 reutilizan los dos ejercicios citados |
| Nueve tarjetas nuevas | Lecciones 1.7–1.9 | Síntesis de hipótesis, técnicas y errores |
| Explorador del conjugado | Desarrollo propio para 1.8 | Familia (√x−k)/(x−k²), con k entre 1 y 5 y distancias positivas |
| Dos familias procedurales nuevas | Planificación del laboratorio 1A y técnicas de 1.8–1.9 | Racionalización y común denominador con parámetros controlados |

### Comprobaciones matemáticas nuevas

- Para f→2 y g→−3, (2f−3g)/(f²+g)→13; el denominador tiende a 1.
- Para f→3 y g→2, (f²−g)/(f+g)→7/5.
- La función escalón h(t)=0 si t≤0 y h(t)=1 si t>0 cumple h(0)=0, pero h(x²)→1 cuando x→0. No se puede omitir la continuidad de la función exterior.
- (x²+x−6)/(x−2)=x+3 fuera de 2; límite 5.
- (√(x+5)−3)/(x−4)=1/(√(x+5)+3) fuera de 4; límite 1/6.
- En el apartado 3(a), la forma equivalente es 1/(1+√(1−x²)); límite 1/2.
- En el apartado 3(e), el numerador común es 7x−(4x+12)=3(x−4); límite 3/4.
- √(x²+3x)−x→3/2 cuando x→+∞, usando x>0 al extraer la raíz. La misma extracción no se aplica sin cambio en −∞.
- x/(x+1)→1 cuando x→+∞.
- Con base positiva, u elevado a v se estudia mediante exp(v ln u). Los ejemplos de las lecciones se reducen a e, exp(1/x), exp(−1) y exp(1/x), respectivamente.
- El explorador evalúa 1/(√x+k) para reducir cancelación numérica, conservando x≠k² en la función original.
- El generador de común denominador construye una expresión equivalente a k/x y evita opciones equivalentes mediante fracciones reducidas.

El total desarrollado pasa a nueve epígrafes. Los originales permanecen intactos; la compilación y revisión integral de los exámenes y sus soluciones siguen pendientes.

## Entrega 04: continuidad y primeras derivadas

Las rutas siguientes se refieren a la carpeta superior. La secuencia sigue Temario completo/Guion_Temario_Matematicas_CC_Sociales_II_2Bach.md, apartados 1.10, 1.11 y 1.12.

| Contenido | Fuente y localizador | Adaptación |
|---|---|---|
| 1.10 | Guion, `1.10 | Tres condiciones, continuidad en dominios y extremos, tipos de discontinuidad y unión de ramas |
| 1.11 | Guion, `1.11 | Tasa media, cociente incremental, función derivada, interpretación geométrica y coste marginal |
| 1.12 | Guion, `1.12 | Derivadas laterales, esquinas, cúspides, tangentes verticales y relación con continuidad |
| Ejemplo repartido entre 1.10 y 1.12 | Materiales y Recursos y Exámenes/BACH - 2º SOC - Examen Límites y Derivadas.zip, main.tex, pregunta 1(a) | Continuidad primero y derivabilidad después, resueltas por definición |
| cont-001 a cont-003, der-001 a der-003, latder-001 a latder-003 | Lecciones desarrolladas; cont-002 y latder-002 adaptan la pregunta 1(a) citada | Nueve preguntas con cuatro alternativas, pista, corrección y explicación |
| Nueve tarjetas | Lecciones 1.10–1.12 | Síntesis original de condiciones, interpretación y errores habituales |
| Explorador de secantes | Elaboración propia a partir del guion 1.11–1.12 | Cuadrado y valor absoluto, cinco puntos y cuatro distancias, pendientes laterales y tangente cuando existe |

### Revisión matemática

- Para la unión x+1 a la izquierda de 2 y kx−1 desde 2, la continuidad exige 3=2k−1: k=2.
- El hueco de (x²−9)/(x−3) en 3 se repara con valor 6.
- En la pregunta 1(a), f(0)=2, el límite izquierdo es 2 y el derecho −b. La continuidad exige b=−2, con a libre.
- Con b=−2, los cocientes incrementales izquierdo y derecho son h+a y −1/(h−1). Sus límites son a y 1; la derivabilidad exige a=1. El dominio sigue excluyendo 1.
- Para x², la tasa media entre 2 y 3 es 5, mientras que la derivada en 2 es 4. El cociente incremental general es 2a+h.
- Para C(q)=100+5q+0,02q², el cociente incremental es 5+0,04q+0,02h. En q=50 la derivada es 7 €/unidad; el incremento de coste hasta 51 es 7,02 €.
- El valor absoluto en 0 es continuo y tiene pendientes laterales −1 y 1. No es derivable.
- Para |x| elevado a 2/3, los cocientes en 0 divergen con signos opuestos (cúspide); para la raíz cúbica, ambos divergen a +∞ (tangente vertical). Ninguno tiene derivada finita en 0.
- La unión de x y x+1 en 0 no es continua. Aunque las fórmulas de las ramas tengan pendiente 1, el cociente izquierdo real es 1−1/h y diverge a +∞.
- La unión de x² para x≤1 y mx+n para x>1 requiere m+n=1 por continuidad y m=2 por derivabilidad: m=2, n=−1.
- La justificación de «derivable implica continua» usa el límite finito del cociente incremental multiplicado por h.

La pregunta 1(b–c), sobre tangente y normal, queda para la entrega siguiente. No se ha compilado el examen ni generado un PDF de soluciones. El total desarrollado es ahora de doce epígrafes.

## Entrega 05: tangentes, tabla y reglas de derivación

La secuencia sigue Temario completo/Guion_Temario_Matematicas_CC_Sociales_II_2Bach.md, apartados 1.13–1.15. Los ejemplos complementarios, las explicaciones y el explorador son elaboración docente propia.

| Contenido | Fuente y localizador | Adaptación |
|---|---|---|
| 1.13 | Guion, `1.13 | Punto y pendiente, normal perpendicular, tangente horizontal, pendiente prescrita y exploración de la parábola |
| Ejemplo de tangente y normal en 2 | Materiales y Recursos y Exámenes/BACH - 2º SOC - Examen Límites y Derivadas.zip, main.tex, 1(b–c) | Solución usando a=1, b=−2 de 1(a); se explicita esta elección y se añade la forma con b libre |
| 1.14 | Guion, `1.14; funciones presentes en la pregunta 2 del examen | Tabla con dominios, radianes y ejemplos de composición; desarrollo completo de cadena reservado a 1.16 |
| 1.15 | Guion, `1.15 | Suma, producto, cociente, potencia compuesta y combinación de reglas |
| Ejemplo de cociente con potencia | Mismo ZIP, main.tex, 2(c) | Derivación y simplificación completa de (x³−4)/(x²+4)² |
| tan-001 a tan-003, table-001 a table-003, rules-001 a rules-003 | Lecciones elaboradas; tan-003 y rules-003 adaptan los apartados citados | Nueve preguntas con cuatro alternativas, pistas y explicación |
| Nueve tarjetas | Lecciones 1.13–1.15 | Síntesis de fórmulas, condiciones y errores |
| Explorador de tangente y normal | Desarrollo original de 1.13 | Parábola x², puntos −2, −1, 0, 1 y 2; escala idéntica en los ejes |

### Comprobaciones matemáticas

- Para x² en 1, la tangente es y=2x−1 y la normal y−1=−(x−1)/2. En 0, son y=0 y x=0. En −1, son y=−2x−1 y y−1=(x+1)/2.
- La tangente a x² paralela a y=4x+7 se obtiene en a=2 y es y=4x−4.
- Con b=−2, la rama del examen cerca de 2 es (x−2)/(x−1). Su valor es 0 y el cociente incremental en 2 es 1/(1+h), con límite 1. Las rectas son y=x−2 e y=−x+2.
- Si b se deja libre, f(2)=b+2 y f′(2)=−(b+1). Para b=−1 la tangente es horizontal y la normal vertical. El valor de a no afecta a esta rama.
- Las fórmulas de raíces y potencias reales se presentan con sus condiciones. La raíz cuadrada no tiene derivada finita en 0; las funciones logarítmicas conservan su dominio original.
- La derivada de ln(2x+1) es 2/(2x+1), exclusivamente para x>−1/2 como derivada de esa función.
- La derivada de x²eˣ es eˣ(2x+x²); la de (ln x)/x es (1−ln x)/x² para x>0.
- La derivada de (x²+1)³ es 6x(x²+1)². La de (x²+1)e elevado a 2x es [2x+2(x²+1)]e elevado a 2x.
- En 2(c), el denominador tiene derivada 4x(x²+4). El cociente simplificado tiene numerador −x⁴+12x²+16x y denominador (x²+4)³, siempre no nulo. En 1, la derivada vale 27/125.
- La práctica (x²+1)/(x+1) da derivada (x²+2x−1)/(x+1)², con x≠−1.

Las verificaciones numéricas se describen en docs/verificacion-entrega-05.md. Se mantienen intactos los originales y sigue pendiente la compilación de examen y soluciones. El total desarrollado pasa a quince epígrafes; no se da por cerrado el tema 1.

## Entrega 06: cadena, continuidad y L’Hôpital

La secuencia sigue Temario completo/Guion_Temario_Matematicas_CC_Sociales_II_2Bach.md, apartados 1.16–1.18. Las rutas de fuentes se refieren a la carpeta superior.

| Contenido | Fuente y localizador | Adaptación |
|---|---|---|
| 1.16 | Guion, `1.16 | Capas exterior/interior, condiciones, composición de varios niveles y unidades en la cadena |
| Cinco ejemplos de derivadas | Materiales y Recursos y Exámenes/BACH - 2º SOC - Examen Límites y Derivadas.zip, main.tex, 2(a), 2(b), 2(d), 2(e), 2(f) | Derivadas completas con identificación de operaciones y dominios |
| 1.17 | Guion, `1.17 | Prueba del teorema, contraposición y contraejemplos |
| Comparador de continuidad | Elaboración docente propia | Cuadrado, esquina, salto y valor aislado; la pendiente usa siempre el valor real f(0) |
| 1.18 | Guion, `1.18 | Hipótesis, repetición, transformaciones, selección de método y límites de aplicación |
| Potencia indeterminada | Mismo ZIP y archivo, 3(d) | Logaritmo, forma 0/0 y vuelta a la exponencial |
| Justificación de crecimiento | Guion 1.6 y 1.18; mismo examen, 3(b) | Comparación general xⁿ/bˣ para b>1 y n entero positivo; aplicación a 3ˣ−x⁵ |
| chain-001 a chain-003, theorem-001 a theorem-003, hopital-001 a hopital-003 | Lecciones; chain-001, chain-003 y hopital-003 adaptan los apartados citados | Nueve preguntas originales o adaptadas con pistas y explicaciones |
| Nueve tarjetas | Lecciones 1.16–1.18 | Síntesis de condiciones, capas y errores de razonamiento |

### Comprobaciones matemáticas

- En 2(a), la derivada del cociente interior tiene numerador 6x²+18x+10 y denominador (2x+3)². La exterior aporta tres veces el cuadrado del cociente. Se conserva x≠−3/2.
- En 2(b), el cuadrado del seno deriva a 2 sin x cos x, en radianes.
- En 2(d), la exponencial se multiplica por 6x−1. En 2(e), el resultado es −(2x+2) sin(x²+2x).
- En 2(f), el dominio es x>e elevado a −1/2. La derivada tiene numerador x(1+4 ln x) y denominador (1+2 ln x) elevado a 3/2.
- La composición ln(1+e elevado a x²) tiene derivada 2x e elevado a x² dividido por 1+e elevado a x², en todo R.
- Para el cuadrado con f(0)=1, el límite es 0 y el cociente incremental es h−1/h: divergencias de signos opuestos.
- Para las rectas x a la izquierda y x+1 desde 0, f(0)=1 y el cociente izquierdo es 1−1/h. Las pendientes de las fórmulas de las ramas no prueban derivabilidad.
- Para g(x)=x² sin(1/x) fuera de 0 y g(0)=0, g′(0)=0 por acotación. Su derivada fuera de 0 oscila; el ejemplo distingue continuidad de g y de g′.
- Los límites (eˣ−1−x)/x² y (1−cos x)/x² en 0 valen 1/2, con dos aplicaciones justificadas de L’Hôpital.
- El producto x ln x en 0 por la derecha se transforma en ln x dividido por 1/x; el cociente de derivadas es −x y el límite es 0.
- En 3(d), el logaritmo de la potencia es ln(1−1/x²)/(1/x). Su cociente de derivadas es −2/[x(1−1/x²)], que tiende a 0. La potencia original tiende a 1.
- En la comparación xⁿ/bˣ, tras n aplicaciones el cociente es n!/[bˣ(ln b)ⁿ], que tiende a 0. Esto justifica la propiedad adelantada en 1.6 y el resultado de 3(b).
- La regla no es necesaria ni concluyente en todos los casos: x/(x+1) en 0 se resuelve por sustitución; x sin(1/x) en 0 se resuelve por acotación aunque el cociente de derivadas correspondiente oscile.

Los seis apartados de derivadas de la pregunta 2 y los seis límites de la pregunta 3 han quedado desarrollados a lo largo de las entregas; esto no equivale a compilar ni revisar íntegramente todos los exámenes. Las 18 lecciones del tema tienen contenido, y la auditoría global del tema sigue pendiente.

## Entrega 07: repaso y continuidad

El contraste de fuentes, los 15 problemas y la correspondencia de preguntas y tarjetas se detallan en [auditoria-tema-01.md](auditoria-tema-01.md).

- Practicar incorpora F030, main.tex, 1(a), F024, main.tex, 1(a–b), y F008/F004, pregunta 4 del examen de límites. Se respetan los parámetros propios de cada apartado y se corrigen las interpretaciones señaladas.
- review-001…006 son adaptaciones con fuente individual en content/activities/review-t01.js. fc-review-01…05 completan conceptos del mazo original.
- El widget 1B sigue la mecánica y puntuación del documento de laboratorios: ajusta b y el valor puntual con pendiente y rama derecha fijas, produciendo una reparación única. Su generador y gráfico son desarrollo original.
- Los originales y sus PDF siguen pendientes de la fase de revisión y compilación; aplicar una corrección a la adaptación web no equivale a corregir aquellos archivos.

## Entrega 08: Derivada Detective

Se implementa el laboratorio 1C del documento de laboratorios de la carpeta superior. Las cinco familias procedurales y los tres tipos de desarrollo erróneo son elaboración propia a partir de las reglas de las lecciones 1.11–1.17. No se atribuyen estos casos generados a un examen original.

La mecánica, condiciones de los generadores, rutas y comprobaciones se documentan en [verificacion-entrega-08.md](verificacion-entrega-08.md). Se conserva la separación entre las 60 preguntas base del catálogo y las decisiones procedurales del widget.

## Entrega 09: Tangente Sprint

Implementa el laboratorio 1D de la planificación de actividades de la carpeta superior, con las fórmulas desarrolladas en la lección 1.13. Los polinomios se generan originalmente a partir de k(x−a)^d+m(x−a)+v para controlar el valor y la pendiente. Se presentan expandidos y se comprueban desde sus coeficientes.

La normal se calcula por perpendicularidad, incluyendo la vertical cuando la tangente es horizontal. Las variantes procedurales no se cuentan como preguntas base ni se atribuyen a los exámenes. Arquitectura, puntuación, condiciones y pruebas en [verificacion-entrega-09.md](verificacion-entrega-09.md).

## Entrega 10: ampliación de Límite Express

Se completa la mecánica del laboratorio 1A según la planificación local. Los polinomios de grados 1–3 y las gráficas con dos ramas afines y valor aislado son elaboración propia. La elección de método reutiliza las familias verificadas de factorización, cocientes de igual grado, conjugado y común denominador.

Las preguntas gráficas distinguen límites laterales, bilateral y valor puntual. Las rondas especiales se activan tras tres preguntas acertadas y los resultados de la sesión no se guardan. Fuentes, reglas y pruebas en [verificacion-entrega-10.md](verificacion-entrega-10.md).

## Entrega 12: esquema general de representación (2.1)

Rutas de fuentes relativas a la carpeta superior al proyecto:

- `Temario completo/Guion_Temario_Matematicas_CC_Sociales_II_2Bach.md`, 2.1: secuencia del estudio; curvatura opcional. El estudio de x³−3x y la visualización por capas son elaboración propia.
- `Planificacion_Interactiva_2Bach_CC_Sociales/03_Tests_2Bach_CC_Sociales.md`, T2.1: dominio de 1/(x−3), adaptado como study-01. T2.10: corte con Y de x²−4x+3, adaptado como study-02 y ampliado en una práctica resuelta. Las preguntas study-03…06 son originales sobre la lección.
- `Planificacion_Interactiva_2Bach_CC_Sociales/02_Flashcards_2Bach_CC_Sociales.md`, tema 2: conceptos 1–4, 6, 16–17, como base para seis tarjetas ampliadas; se añaden distinción entre signo de función y derivada y recordatorio de simetrías. No se declara cubierto el mazo completo de 20 conceptos.

No se reutiliza ni se atribuye a un examen un enunciado sin contrastarlo. El ejemplo de hueco (x²−1)/(x−1) es elaboración didáctica propia, coherente con las lecciones previas de límites y continuidad. Los originales no se modifican.

Archivos, alcance y comprobaciones en [verificacion-entrega-12.md](verificacion-entrega-12.md).

## Entrega 13: funciones polinómicas (2.2)

Fuentes en la carpeta superior:

- `Temario completo/Guion_Temario_Matematicas_CC_Sociales_II_2Bach.md`, 2.2: dominio, ceros, signo, término dominante, derivadas, extremos e interpretación contextual.
- `Planificacion_Interactiva_2Bach_CC_Sociales/02_Flashcards_2Bach_CC_Sociales.md`, tema 2, conceptos 3–5 y 16–20: raíces, comportamiento en infinito, candidatos, restricciones y unidades. Las seis tarjetas nuevas amplían estos conceptos con multiplicidad y cotas de raíces y extremos.
- `Planificacion_Interactiva_2Bach_CC_Sociales/03_Tests_2Bach_CC_Sociales.md`, T2.6 y T2.9: comparación de candidatos y extremos del intervalo, y rechazo de resultados fuera del dominio contextual. Se trasladan al modelo económico propio; no se copian literalmente sus opciones.

El polinomio (x+1)²(x−2), el modelo B(q)=−2q²+24q−40 y el generador del taller son elaboraciones didácticas propias. No se atribuyen a paquetes de exámenes. El taller practica el término dominante, sin contarse como nuevas preguntas base ni como un laboratorio completo del tema 2. Fuentes originales conservadas; detalle en [verificacion-entrega-13.md](verificacion-entrega-13.md).

## Entrega 14: funciones racionales (2.3)

Fuentes en la carpeta superior al proyecto:

- `Temario completo/Guion_Temario_Matematicas_CC_Sociales_II_2Bach.md`, 2.3: dominio, cortes, signo, asíntotas, límites, derivada y distinción entre huecos y asíntotas al simplificar.
- `Planificacion_Interactiva_2Bach_CC_Sociales/02_Flashcards_2Bach_CC_Sociales.md`, tema 2, conceptos 2, 3, 4, 6 y 16: dominio racional, cortes y puntos críticos. Se amplían con horizontal, oblicua y multiplicidades.
- `Planificacion_Interactiva_2Bach_CC_Sociales/03_Tests_2Bach_CC_Sociales.md`, T2.7: criterio del factor que permanece en el denominador. Se adapta al diagnóstico mediante límites; ninguna raíz del denominador se identifica como asíntota sin comprobar lo que queda después de simplificar.

Los dos estudios, la práctica (x−3)/(x+2), el contraejemplo de cruce de horizontal, las seis preguntas y las 18 configuraciones del explorador son elaboración propia sobre estos conceptos. No se atribuyen a exámenes originales. Se conserva además la corrección metodológica de M01: comprobar el dominio y los intervalos antes de concluir asíntotas o monotonía global. Detalle en [verificacion-entrega-14.md](verificacion-entrega-14.md).

## Entrega 15: funciones exponenciales (2.4)

Fuentes relativas a la carpeta superior al proyecto:

- `Temario completo/Guion_Temario_Matematicas_CC_Sociales_II_2Bach.md`, 2.4: bases, crecimiento/decrecimiento, dominio, recorrido, corte vertical, asíntota y aplicaciones porcentuales.
- `Planificacion_Interactiva_2Bach_CC_Sociales/02_Flashcards_2Bach_CC_Sociales.md`, tema 2, conceptos 7–8 y 12–14: propiedades de exponenciales y transformaciones. Las seis tarjetas desarrollan estas ideas y añaden el factor por periodo.
- `Planificacion_Interactiva_2Bach_CC_Sociales/03_Tests_2Bach_CC_Sociales.md`, T2.2: comportamiento de 2^x. Adaptado como exp-01 con retroalimentación; exp-02…06 son ampliaciones propias.

El estudio de 2−4(1/2)^x, la práctica 3·2^x−3, los modelos de 1000 € al 5 %, depreciación de 12000 € al 20 % y disminución de 500 unidades al 10 % son elaboraciones didácticas propias. No se atribuyen a exámenes. Se explicitan tasas constantes, periodos y dominios del contexto. Las 24 combinaciones del explorador son estados de una actividad, no preguntas adicionales ni un nuevo videojuego. Detalle en [verificacion-entrega-15.md](verificacion-entrega-15.md).

## Entrega 16: funciones logarítmicas (2.5)

Fuentes relativas a la carpeta superior al proyecto:

- `Temario completo/Guion_Temario_Matematicas_CC_Sociales_II_2Bach.md`, 2.5: función inversa, dominio positivo, propiedades gráficas, asíntota, monotonía, propiedades algebraicas y aplicaciones a escalas y rendimientos decrecientes.
- `Planificacion_Interactiva_2Bach_CC_Sociales/02_Flashcards_2Bach_CC_Sociales.md`, tema 2, conceptos 9–10 y 12–14: dominio, asíntota y transformaciones. Se amplían con cambio de base, condiciones de las propiedades y comprobación de soluciones.
- `Planificacion_Interactiva_2Bach_CC_Sociales/03_Tests_2Bach_CC_Sociales.md`, T2.3: dominio de ln x, adaptado como log-01 con explicación de cada opción. log-02…06 son elaboraciones propias.

El estudio log₂(x−1)−1, la ecuación con candidatos 5 y −1, la práctica −ln(x+1), la ecuación de argumentos iguales y el explorador son elaboración didáctica propia. El tiempo de duplicación prolonga el supuesto de crecimiento compuesto de la entrega 15. La escala S=log₁₀(N/N₀) y el índice A(q)=100 ln(1+q) son modelos hipotéticos, sin atribución a datos o exámenes. Las 24 configuraciones no se cuentan como nuevas preguntas ni como videojuego. Detalle en [verificacion-entrega-16.md](verificacion-entrega-16.md).

## Entrega 17: funciones a trozos y valor absoluto (2.6)

Fuentes relativas a la carpeta superior al proyecto:

- `Temario completo/Guion_Temario_Matematicas_CC_Sociales_II_2Bach.md`, 2.6: expresión por intervalos, dominio, continuidad, derivabilidad lateral, valor absoluto y modelos con reglas distintas por tramos.
- `Planificacion_Interactiva_2Bach_CC_Sociales/02_Flashcards_2Bach_CC_Sociales.md`, tema 2, concepto 11: valor absoluto como distancia y función por tramos. Se amplía con lectura de extremos, continuidad, derivabilidad y coste acumulado.
- `Planificacion_Interactiva_2Bach_CC_Sociales/03_Tests_2Bach_CC_Sociales.md`, T2.8: definición por tramos de |x|, adaptada como piece-01 con retroalimentación. Las otras cinco preguntas son propias.

El estudio de x² para x<1 y 2x−1 para x≥1, el salto, los valores puntuales modificados, |x−1|−2, |x²−4|, los parámetros de la unión y |2x−4| son elaboraciones didácticas propias. La tarifa de 2 €/m³ hasta 10 m³ y 3 €/m³ solo por el exceso es hipotética; no reproduce tarifas reales ni reglas fiscales. Las 15 combinaciones del explorador amplían la lectura gráfica de las uniones sin atribuirse a exámenes ni contarse como preguntas base o videojuegos adicionales. Véase [verificacion-entrega-17.md](verificacion-entrega-17.md).

## Entrega 18: traslaciones (2.7)

Fuentes relativas a la carpeta superior al proyecto:

- `Temario completo/Guion_Temario_Matematicas_CC_Sociales_II_2Bach.md`, 2.7: traslaciones verticales y horizontales, sentido del movimiento, representación desde una gráfica conocida y cambios en dominio, recorrido, cortes y asíntotas.
- `Planificacion_Interactiva_2Bach_CC_Sociales/02_Flashcards_2Bach_CC_Sociales.md`, tema 2, conceptos 12–13: traslaciones verticales y horizontales. Se amplían con regla de puntos, intervalos, extremos, asíntotas y cortes.
- `Planificacion_Interactiva_2Bach_CC_Sociales/03_Tests_2Bach_CC_Sociales.md`, T2.4: f(x−2) se desplaza a la derecha, adaptado como shift-01 con explicación. Las otras cinco preguntas son propias.

Los estudios (x−2)²−3, 1/(x+2)+1, ln(x−2)+1, la práctica |x+1|−2, la traslación de la oblicua y los intervalos son elaboraciones didácticas propias. La cuota fija de 5 € añadida al coste variable 2q es un supuesto hipotético, no una tarifa real. El explorador usa x², |x|, 1/x y ln x como funciones conocidas y muestra 36 combinaciones; no se contabilizan como preguntas base ni como un videojuego adicional. Los originales no se modifican. Véase [verificacion-entrega-18.md](verificacion-entrega-18.md).

## Entrega 19: expansión y contracción (2.8)

Fuentes relativas a la carpeta superior al proyecto:

- `Temario completo/Guion_Temario_Matematicas_CC_Sociales_II_2Bach.md`, 2.8: a·f(x), f(bx), escalas vertical y horizontal, factores negativos y comparación de puntos significativos.
- `Planificacion_Interactiva_2Bach_CC_Sociales/02_Flashcards_2Bach_CC_Sociales.md`, tema 2, conceptos 14–15: escala vertical y factor horizontal inverso. Se amplían con reflexiones, intervalos, extremos, asíntotas y derivada de la composición.
- `Planificacion_Interactiva_2Bach_CC_Sociales/03_Tests_2Bach_CC_Sociales.md`, T2.5: 3f(x) produce escala vertical de factor 3, adaptada como scale-01. Las demás preguntas son propias.

Los estudios de −2(2x−1)², 3/(−2x−1), ln(−2x), la práctica −|x+1/2| y los intervalos transformados son elaboraciones didácticas propias. El modelo de dos centros con coste C(q)=q²+1 supone centros idénticos y reparto igual; no procede de datos reales ni se atribuye a un examen. El explorador usa tres familias no pares para mostrar con claridad la reflexión horizontal, con 48 configuraciones. No se cuentan como preguntas base adicionales ni como videojuego. Los materiales originales se conservan. Detalle en [verificacion-entrega-19.md](verificacion-entrega-19.md).

## Entrega 20: optimización de funciones (2.9)

Fuentes relativas a la carpeta superior al proyecto:

- `Temario completo/Guion_Temario_Matematicas_CC_Sociales_II_2Bach.md`, 2.9: función objetivo, dominio factible, puntos críticos, fronteras, interpretación contextual y problemas de beneficio, coste, ingreso y dimensiones.
- `Planificacion_Interactiva_2Bach_CC_Sociales/02_Flashcards_2Bach_CC_Sociales.md`, tema 2, conceptos 16–20: candidatos, restricciones, función objetivo e interpretación con unidades. Se amplían con cantidades enteras y comparación de objetivos.
- `Planificacion_Interactiva_2Bach_CC_Sociales/03_Tests_2Bach_CC_Sociales.md`, T2.6 y T2.9: puntos críticos y extremos del intervalo, y rechazo de cantidades negativas. Adaptados como opt-01 y opt-06, explicitando continuidad en el intervalo cerrado. Las otras preguntas usan modelos propios.

Los modelos de precio p(q)=50−q, costes 10q+F, variación a p(q)=35−q, coste medio q+100/q, valla de 60 m junto a una pared y práctica de ingreso q(30−2q) son elaboraciones didácticas propias. No se atribuyen a exámenes ni a datos comerciales reales. Se explicitan unidades, costes fijos, capacidades, dominios abiertos/cerrados y alternativas enteras. Las 24 configuraciones del explorador no se cuentan como preguntas base ni como el laboratorio Optimiza, aún pendiente. Véase [verificacion-entrega-20.md](verificacion-entrega-20.md).

## Entrega 21 · Repaso integrado del tema 2

Fuentes: guion 2.1–2.9 y planes de test y tarjetas del tema 2, localizados en la auditoría [auditoria-tema-02.md](auditoria-tema-02.md). Seis preguntas de síntesis originales en `content/activities/review-t02.js`; cada una identifica los epígrafes relacionados. Tres problemas nuevos en el índice del tema: composición con hueco, diferencia de logaritmos y beneficio por tramos. Los enunciados y soluciones son elaboración didáctica propia, no transcripción de exámenes. La auditoría recoge 18 problemas anteriores y los tres nuevos. Originales conservados.

## Entrega 22 · Construye la gráfica

Fuente: `../../Planificacion_Interactiva_2Bach_CC_Sociales/01_Laboratorios_Minijuegos_2Bach_CC_Sociales.md`, Laboratorio 2A. Se desarrolla la alternativa prevista de elegir entre cuatro gráficas SVG a partir de dominio, cortes, asíntotas, signo de la derivada y extremos. No se implementa en esta entrega la alternativa de construcción por puntos de control.

Familias y cálculos propios basados en el guion 2.1–2.4 y sus lecciones: a(x−h)²+k, a/(x−h)+k y a·2^(x−h)+k. Seis retos por sesión, dos de cada familia. Los distractores modifican un único parámetro o el signo de a. Las variantes no aumentan el banco de 120 preguntas base. Los originales no se modifican.

## Entrega 23 · Transforma la función

Fuente: `../../Planificacion_Interactiva_2Bach_CC_Sociales/01_Laboratorios_Minijuegos_2Bach_CC_Sociales.md`, Laboratorio 2B; guion y lecciones 2.7 y 2.8. Se desarrolla la manipulación por botones, composición en orden real y puntuación que disminuye con los movimientos. Funciones base propias: x²+x, |x−1| y 1/(x−1), elegidas para evitar que la reflexión horizontal sea siempre invisible. Los parámetros, objetivos y rutas se generan localmente. La aceptación usa igualdad de funciones, no igualdad de parámetros. Las variantes no se contabilizan como nuevas preguntas base; originales conservados.

## Entrega 24 · Optimiza

Fuente: `../../Planificacion_Interactiva_2Bach_CC_Sociales/01_Laboratorios_Minijuegos_2Bach_CC_Sociales.md`, Laboratorio 2C, y el guion 2.9. Se desarrollan sus cuatro microhistorias (beneficio, coste unitario, recinto e ingreso) y sus cinco decisiones (objetivo, dominio, candidatos, extremo e interpretación).

Modelos, valores numéricos, distractores y explicaciones de elaboración propia, coherentes con la lección 2.9. La capacidad puede excluir el vértice; los costes fijos pueden hacer negativo el beneficio máximo; el recinto exige lados positivos; el ingreso se restringe a paquetes enteros y presenta un empate. No se atribuyen estos ejercicios a exámenes originales ni se alteran las fuentes. Los supuestos económicos son didácticos. Las variantes procedurales no aumentan las 120 preguntas base del curso.

## Entrega 25 · Integral indefinida y recorrido t02

Fuente: `../../Temario completo/Guion_Temario_Matematicas_CC_Sociales_II_2Bach.md`, 3.1; `../../Planificacion_Interactiva_2Bach_CC_Sociales/03_Tests_2Bach_CC_Sociales.md`, T3.1, T3.3 y T3.10; `../../Planificacion_Interactiva_2Bach_CC_Sociales/02_Flashcards_2Bach_CC_Sociales.md`, conceptos 1–3 y 18 del tema 3.

Se adapta T3.1 preguntando por la familia completa (2x³+C) y se distingue de una primitiva particular. La afirmación de T3.3 sobre constantes se precisa para un mismo intervalo; se añade como ampliación el dominio separado de 1/x. Ejemplos de condición inicial, coste marginal y práctica, preguntas complementarias y explorador son elaboración propia. El coste marginal se integra en q>0; el dato de q=0 se incorpora con continuidad explícita. Se mantienen los originales y no se atribuyen estos ejemplos a exámenes.

El recorrido de t02 se contrasta con los tres laboratorios ya desarrollados y su secuencia en las lecciones; se corrige el recuento desactualizado de test y se añaden retornos comunes.

## Entrega 26 · Integrales inmediatas

Fuentes: `../../Temario completo/Guion_Temario_Matematicas_CC_Sociales_II_2Bach.md`, epígrafe 3.2; `../../Planificacion_Interactiva_2Bach_CC_Sociales/03_Tests_2Bach_CC_Sociales.md`, T3.2 (integral de x³); `../../Planificacion_Interactiva_2Bach_CC_Sociales/02_Flashcards_2Bach_CC_Sociales.md`, conceptos 4–6 del tema 3 (linealidad, potencias y logaritmo). Seno y coseno enlazan con la tabla de derivadas ya publicada en 1.14, que incluye estas funciones presentes en los materiales locales.

La pregunta immediate-01 adapta T3.2. Las otras cinco preguntas, cinco ejemplos, práctica con condición inicial y seis familias procedurales son elaboraciones propias. Se precisan intervalos válidos, excepción n=−1, valor absoluto, base a>0 distinta de 1 y factores constantes. Las variantes no se suman al banco de preguntas base. Se conservan los originales y no se atribuyen estos ejercicios a exámenes. Archivos: `content/activities/immediate-integrals.js`, `content/models/immediate-integrals.js` y `libro/temas/03-integrales/02-integrales-inmediatas.html` (rutas desde la raíz web).

## Entrega 27 · Integrales casi inmediatas

Fuentes: `../../Temario completo/Guion_Temario_Matematicas_CC_Sociales_II_2Bach.md`, epígrafe 3.3 (función y derivada salvo constante, potencias, cocientes y exponenciales compuestas, regla de la cadena inversa); `../../Planificacion_Interactiva_2Bach_CC_Sociales/02_Flashcards_2Bach_CC_Sociales.md`, concepto 7 del tema 3. La comprobación por derivación enlaza con T3.10 de `../../Planificacion_Interactiva_2Bach_CC_Sociales/03_Tests_2Bach_CC_Sociales.md` y con las lecciones ya publicadas 1.16 y 3.2.

Los ocho cálculos desarrollados en siete bloques de ejemplos, la práctica con condición inicial, las seis preguntas y seis tarjetas nuevas son elaboración propia. Las seis familias procedurales amplían la práctica; no se contabilizan como nuevas preguntas base. Los patrones trigonométricos prolongan la tabla de 3.2. Se explica que la ausencia de ajuste constante impide aplicar directamente el patrón, sin afirmar que no exista primitiva. Se precisan dominios y el ajuste en puntos donde u′=0. Originales conservados; no se atribuyen estos ejercicios a exámenes locales.

Archivos desde la raíz web: `libro/temas/03-integrales/03-integrales-casi-inmediatas.html`, `content/activities/near-immediate-integrals.js`, `content/models/near-immediate-integrals.js` y `assets/js/learning/near-immediate-practice.js`.

## Entrega 28 · Métodos de integración

Fuentes: `../../Temario completo/Guion_Temario_Matematicas_CC_Sociales_II_2Bach.md`, 3.4, y `../../PROMPT_MAESTRO_WEB_MATEMATICAS_CCSS_II.md`, criterio de núcleo suficiente y ampliación identificada para métodos de profundidad abierta. Se revisaron las fuentes `.tex` contenidas en los 30 paquetes ZIP sin modificar los originales. Las integrales localizadas refuerzan polinomios, linealidad, exponencial compuesta y logaritmo; no se deduce un currículo autonómico ni una exigencia PAU a partir de ellas.

El núcleo desarrolla simplificación, dominio y cambio de variable sencillo. Descomposición con dos factores lineales e integración por partes se presentan en ampliaciones desplegables, con un ejemplo cada una. Los ejemplos 1–4, la práctica, las variantes y las preguntas complementarias son de elaboración propia. Las variantes no aumentan el banco de preguntas base ni sustituyen al laboratorio futuro «Método correcto».

### Adaptación de F029 y corrección M13

Fuente exacta: `../../Materiales y Recursos y Exámenes/BACH - 2º SOC - Subida de nota T1 General Soluciones.zip`, entrada `main.tex`, primer documento, ejercicio 3, líneas 256–269. El integrando es h(x)=x²+e^(2x)−1/(1−x). La línea 263 iguala erróneamente la integral de 1/(1−x) a x. Se desarrolla el paso correcto −ln|1−x|+C; al integrar el término negativo queda +ln|1−x|. El valor absoluto extiende la fórmula correctamente a cada intervalo a ambos lados de 1.

La lección 3.4 incorpora el enunciado y el desarrollo revisado como ejemplo 5; la pregunta integration-method-05 trabaja su signo y dominio. Se verifica mediante derivación y se registra M13 en `../../INVENTARIO_Y_DIAGNOSTICO_MATERIALES.md`. La corrección de una copia LaTeX y su compilación PDF siguen pendientes en la fase E; el ZIP original se conserva.

Archivos desde la raíz web: `libro/temas/03-integrales/04-metodos-de-integracion.html`, `content/models/integration-methods.js`, `content/activities/integration-methods.js`, `assets/js/learning/integration-methods-practice.js`.

## Entrega 29 · Integral definida

Fuentes: `../../Temario completo/Guion_Temario_Matematicas_CC_Sociales_II_2Bach.md`, 3.5; `../../Planificacion_Interactiva_2Bach_CC_Sociales/03_Tests_2Bach_CC_Sociales.md`, T3.4 (acumulación con signo) y T3.6 (función negativa y área); `../../Planificacion_Interactiva_2Bach_CC_Sociales/02_Flashcards_2Bach_CC_Sociales.md`, conceptos 8–10, 13–14 y relación con la linealidad del concepto 4.

Las preguntas definite-01 y definite-02 adaptan T3.4 y T3.6. Las demás, los ejemplos geométricos, el modelo de tasa neta de caja y el explorador son de elaboración propia. El contexto de caja es didáctico y distingue saldo inicial, variación neta y movimientos bajo supuestos explícitos. No se atribuye a datos económicos reales ni a un examen local.

Se precisa a<b para identificar integral con diferencia de áreas y se separa el área geométrica, independiente de la orientación. La suma de puntos medios se presenta como aproximación y límite, sin adelantar el uso sistemático de Barrow. El modelo obtiene valores exactos por triángulos y trapecios de funciones lineales por tramos; sus pruebas utilizan primitivas independientes como contraste. Las 588 configuraciones no se cuentan como preguntas base adicionales. Originales conservados.

Archivos desde la raíz web: `libro/temas/03-integrales/05-integral-definida.html`, `content/models/definite-integrals.js`, `content/activities/definite-integrals.js`, `assets/js/learning/definite-explorer.js`.

## Entrega 30 · Teorema fundamental del cálculo

Fuentes: `../../Temario completo/Guion_Temario_Matematicas_CC_Sociales_II_2Bach.md`, 3.6; `../../Planificacion_Interactiva_2Bach_CC_Sociales/02_Flashcards_2Bach_CC_Sociales.md`, concepto 11 del tema 3. Se enlazan los conceptos ya desarrollados en 1.11 (derivada), 1.16 (cadena), 3.1 (primitivas y constante) y 3.5 (acumulación y orientación).

Los ejemplos de integrando 2t+3, t²−1, e^(−t²), depósito con tasa 2t−4 y práctica desde a=2 son elaboraciones didácticas propias. También lo son las seis preguntas/tarjetas, el argumento de la franja y su cota, las ampliaciones de extremo compuesto y límite inferior, y los dos contraejemplos de discontinuidad. No se atribuyen a exámenes originales ni a datos físicos reales.

El explorador compara t−1, t²−1, |t| y un salto de −1 a 1 en cero. Se diferencia continuidad del integrando y derivabilidad de la acumulación: |t| es continua aunque no derivable en cero, y su acumulación sí cumple el teorema; el salto produce una esquina. El ejemplo de valor aislado muestra que, sin continuidad, A puede ser derivable sin que A′ coincida con el valor asignado a f. Las 324 configuraciones no incrementan el banco de preguntas base. La relación A(x)=F(x)−F(a) prepara Barrow; su práctica sistemática queda en 3.7.

Archivos desde la raíz web: `libro/temas/03-integrales/06-teorema-fundamental-del-calculo.html`, `content/models/fundamental-calculus.js`, `content/activities/fundamental-calculus.js`, `assets/js/learning/fundamental-explorer.js`. Originales conservados.

## Entrega 31 · Regla de Barrow

Fuentes: `../../Temario completo/Guion_Temario_Matematicas_CC_Sociales_II_2Bach.md`, 3.7; `../../Planificacion_Interactiva_2Bach_CC_Sociales/03_Tests_2Bach_CC_Sociales.md`, T3.5; `../../Planificacion_Interactiva_2Bach_CC_Sociales/02_Flashcards_2Bach_CC_Sociales.md`, concepto 12.

La pregunta barrow-01 adapta T3.5. Los demás ejemplos, preguntas, tarjetas y actividades son elaboración didáctica propia, incluido el contexto hipotético de coste marginal.

El ejemplo del logaritmo procede de F023: `../../Materiales y Recursos y Exámenes/BACH - 2º SOC - Recuperación T1 Soluciones.zip`, entrada `main.tex`, ejercicio 2(b), líneas 155–173. Área para g(x)=1/(x+3) en [2,4], resultado ln(7/5). Comprobados dominio, positividad, primitiva, sustitución y aproximación. Original conservado; no se ha compilado el paquete ni validado sus otros apartados en esta entrega.

Se precisa el guion: separar por signos es necesario para calcular áreas con aportaciones positivas; una integral con signo puede resolverse directamente con una primitiva global válida. No se aplica Barrow atravesando singularidades. La distinción entre cancelación simétrica e integral impropia convergente aparece como ampliación.

Archivos desde la raíz web: `libro/temas/03-integrales/07-regla-de-barrow.html`, `content/models/barrow.js`, `content/activities/barrow.js` y `assets/js/learning/barrow-explorer.js`. Las 225 configuraciones y las variantes de seis familias no incrementan el banco base.

## Entrega 32 · Aplicaciones de la integral

Fuentes: `../../Temario completo/Guion_Temario_Matematicas_CC_Sociales_II_2Bach.md`, 3.8; `../../Planificacion_Interactiva_2Bach_CC_Sociales/03_Tests_2Bach_CC_Sociales.md`, T3.7; `../../Planificacion_Interactiva_2Bach_CC_Sociales/02_Flashcards_2Bach_CC_Sociales.md`, conceptos 15–17. La pregunta area-01 adapta la búsqueda de intersecciones de T3.7.

Ejemplos locales revisados:

- `../../Materiales y Recursos y Exámenes/BACH - 2º SOC - Examen Resuelto Recuperación.zip`, `main.tex`, líneas 584–621: área del recinto de h(x)=−x²+2x+3 y el eje, cortes −1 y 3, área 32/3. Se verifican raíces, signo, primitiva y evaluaciones. El apartado pertenece a «Derivadas e integrales», iniciado en la línea 533.
- F029, `../../Materiales y Recursos y Exámenes/BACH - 2º SOC - Subida de nota T1 General Soluciones.zip`, primer `main.tex`, ejercicio 1(b), líneas 69–98 y desarrollo posterior: f(x)=x²−2x−1 en [0,1], con b=2 fijado expresamente para ese apartado. Área 5/3. No se arrastran los parámetros hallados en 1(a).

Los otros ejemplos, la práctica, los modelos hipotéticos de solicitudes y caja, el explorador y los retos son elaboración propia. Se distingue variación neta, variación total del saldo y movimientos brutos; estos últimos solo se identifican bajo supuestos explícitos. No se presentan como datos económicos reales.

Los cortes relevantes son f=g, no los ceros de cada función por separado. Los límites geométricos se ordenan y las áreas se suman por tramos. Se distingue un recinto cerrado por curvas de un intervalo impuesto por fronteras verticales. Los 600 estados y variantes procedurales no aumentan el banco base.

Archivos desde la raíz web: `libro/temas/03-integrales/08-aplicaciones-de-la-integral.html`, `content/models/integral-applications.js`, `content/activities/integral-applications.js` y `assets/js/learning/area-explorer.js`. ZIP originales conservados y sin compilar en esta entrega.

## Entrega 33 · Repaso y auditoría de integrales

Fuentes de cobertura: `../../Temario completo/Guion_Temario_Matematicas_CC_Sociales_II_2Bach.md`, 3.1–3.8; `../../Planificacion_Interactiva_2Bach_CC_Sociales/03_Tests_2Bach_CC_Sociales.md`, T3.1–T3.10; `../../Planificacion_Interactiva_2Bach_CC_Sociales/02_Flashcards_2Bach_CC_Sociales.md`, 18 conceptos. El inventario de problemas existentes y las correspondencias están en [auditoria-tema-03.md](auditoria-tema-03.md).

Los cuatro bloques y doce preguntas nuevas de `../content/activities/review-t03.js` son elaboración propia. No se atribuyen a exámenes originales. Incluyen datos incompatibles para una primitiva, expresiones logarítmicas equivalentes, cambio de límites junto a la variable, reconocimiento de una derivada de producto, propiedades combinadas, acumulación por tramos y comparación de áreas.

El almacén es un modelo continuo hipotético con tasa neta, no un registro real. Su variación total no se identifica con movimientos brutos salvo si se excluyen entradas/salidas simultáneas. Sumar una función común a dos curvas conserva la distancia vertical sin ser, en general, una traslación rígida. El criterio de integral cero de una función continua no negativa se explica en una ampliación y mantiene todas sus hipótesis.

Se añaden doce preguntas base, no doce variantes numéricas de un patrón. Cada ítem lleva `lessonIds` para vincular destrezas. Las 48 tarjetas existentes cubren los conceptos originales; no se amplía ese contador. Fuentes originales y ZIP conservados.

## Entrega 34 · Parejas de primitivas

Fuente: `../../Planificacion_Interactiva_2Bach_CC_Sociales/01_Laboratorios_Minijuegos_2Bach_CC_Sociales.md`, laboratorio 3A. Se siguen el emparejamiento entre integrandos y primitivas, el distractor sin +C y el bonus por cinco aciertos. Se vincula al contenido revisado de los epígrafes 3.1–3.3.

Los dos tableros, parámetros, puntuación, pistas y comprobaciones mediante derivadas son elaboración propia. Se precisa el distractor: una expresión sin +C puede ser una primitiva particular correcta; el juego solicita la familia completa en el intervalo indicado. Los dominios restringidos a x>0 evitan atravesar singularidades y permiten usar logaritmos sin valor absoluto. No se presentan como dominios máximos.

Archivos desde la raíz web: `widgets/games/t03-a-parejas-de-primitivas/` (HTML, estilos, controlador y generador), `laboratorios/juegos/t03-a-parejas-de-primitivas.html`. Las variantes se cuentan aparte del banco fijo; se conservan todos los originales. Evidencias en [verificacion-entrega-34.md](verificacion-entrega-34.md).

## Entrega 35 · Método correcto

Fuente: `../../Planificacion_Interactiva_2Bach_CC_Sociales/01_Laboratorios_Minijuegos_2Bach_CC_Sociales.md`, laboratorio 3B. Se conserva la mecánica de elegir entre cuatro estrategias antes de desbloquear la resolución. Refuerzo de las lecciones 3.2–3.4; integración por partes conserva su condición de ampliación.

Los ocho patrones, parámetros, distractores, pistas, explicaciones y puntuación son elaboración propia. Se concretan dos retos por estrategia: potencia y exponencial simples; cociente con derivada interior y exponencial compuesta; división algebraica y diferencia de cuadrados desarrollados; producto xeˣ y logaritmo por partes. El último amplía el ejemplo de 3.4 y explica la elección u=ln x y dv=dx.

El juego usa convenciones didácticas explícitas para reconocer patrones: no afirma que la integración admita un único método. La familia requiere +C; la alternativa sin constante se explica como primitiva particular válida. Los intervalos x>0 no se presentan como dominios máximos. Originales conservados y variantes excluidas del contador de preguntas base.

Archivos: `../widgets/games/t03-b-metodo-correcto/` y `../laboratorios/juegos/t03-b-metodo-correcto.html`. Evidencias en [verificacion-entrega-35.md](verificacion-entrega-35.md).

## Entrega 36 · Área por tramos

Fuente: `../../Planificacion_Interactiva_2Bach_CC_Sociales/01_Laboratorios_Minijuegos_2Bach_CC_Sociales.md`, laboratorio 3C. Se conserva la secuencia: señalar cortes en una gráfica, calcular integrales parciales y diferenciar integral con signo y área. Se vincula con 3.5, 3.7 y 3.8.

Las seis familias polinómicas trasladadas/escaladas, reglas de puntuación, entradas numéricas, explicaciones, tabla y variantes son elaboración propia. Se amplía el guion con contacto sin cambio de signo, raíz en extremo y ausencia de ceros. Se pide expresamente la partición mínima necesaria por cambio de signo; añadir otros cortes puede ser matemáticamente válido, pero no responde a esa consigna.

Los modelos son polinomios continuos y sus ceros relevantes son enteros conocidos analíticamente. La tabla es un apoyo, no una demostración del signo entre puntos. El área suma valores absolutos de integrales en tramos sin cambios de signo; no el valor absoluto de la integral total. Los resultados se muestran como fracciones exactas y se aceptan aproximaciones redondeadas a dos decimales.

Archivos: `../widgets/games/t03-c-area-por-tramos/` y `../laboratorios/juegos/t03-c-area-por-tramos.html`. Originales conservados y variantes contadas aparte de las preguntas base. Evidencias en [verificacion-entrega-36.md](verificacion-entrega-36.md).

## Entrega 37 · Revisión integrada de integrales

Se revisa el contenido existente documentado en las entregas 25–36, siguiendo el guion 3.1–3.8 y los tres laboratorios del tema. No se añaden ejercicios, fórmulas, variantes ni preguntas base; no se modifican las fuentes originales.

La nueva orientación relaciona cada juego con sus lecciones de refuerzo, conserva la ampliación por partes y explica el acceso libre y la naturaleza temporal de las respuestas. Se añaden enlaces entre anfitriones y retorno al repaso. Evidencias del recorrido y límites en [verificacion-entrega-37.md](verificacion-entrega-37.md).

## Entrega 38 · Matrices: definición, características y tipos

Fuentes: `../../Temario completo/Guion_Temario_Matematicas_CC_Sociales_II_2Bach.md`, 4.1; `../../Planificacion_Interactiva_2Bach_CC_Sociales/03_Tests_2Bach_CC_Sociales.md`, T4.1; `../../Planificacion_Interactiva_2Bach_CC_Sociales/02_Flashcards_2Bach_CC_Sociales.md`, conceptos 1–3 del tema 4.

matrix-basics-01 adapta T4.1 (orden de tres filas y dos columnas). Las otras cinco preguntas, seis tarjetas desarrolladas, ejemplos, práctica y editor son elaboración propia. El contexto de ventas Norte/Sur es ficticio y sus entradas son unidades semanales, no euros ni datos de empresas reales.

Se explicita la convención: «rectangular no cuadrada» para m≠n; diagonal, escalar e identidad requieren matrices cuadradas. Las etiquetas se solapan. Se incluye nula rectangular, nula cuadrada y caso 1×1, sin atribuir una clasificación excluyente a las fuentes. La igualdad exige todas las posiciones y el mismo orden.

Archivos desde la raíz web: `libro/temas/04-matrices-y-determinantes/01-matrices-definicion-caracteristicas-y-tipos.html`, `content/models/matrix-basics.js`, `content/activities/matrix-basics.js` y `assets/js/learning/matrix-basics-explorer.js`. Las 1600 variantes de comprobación y valores del editor no se cuentan como preguntas base nuevas. Originales conservados. Evidencia: [verificacion-entrega-38.md](verificacion-entrega-38.md).

## Entrega 39 · Operaciones con matrices

Fuentes: `../../Temario completo/Guion_Temario_Matematicas_CC_Sociales_II_2Bach.md`, 4.2; `../../Planificacion_Interactiva_2Bach_CC_Sociales/02_Flashcards_2Bach_CC_Sociales.md`, concepto 4 del tema 4 (igualdad de orden para sumar).

Las seis preguntas matrix-operations-01–06, seis tarjetas desarrolladas, ejemplos, práctica y explorador son elaboración propia a partir de esos contenidos. No se adapta T4.2 del banco de test: corresponde al producto de matrices, previsto en la siguiente lección.

Las ventas semanales y entradas/salidas son contextos ficticios. La suma exige el mismo orden; su interpretación exige además categorías y unidades coherentes. Duplicar una semana es un supuesto explícito, no una predicción. La resta expresa variación neta, no existencias finales sin un dato inicial. Los contraejemplos muestran que la resta no es conmutativa ni asociativa. La teoría admite escalares reales; los límites enteros pertenecen solo al editor.

Archivos desde la raíz web: `libro/temas/04-matrices-y-determinantes/02-operaciones-con-matrices.html`, `content/models/matrix-operations.js`, `content/activities/matrix-operations.js` y `assets/js/learning/matrix-operations-explorer.js`. Originales conservados y variantes excluidas del contador de preguntas base. Evidencia: [verificacion-entrega-39.md](verificacion-entrega-39.md).

## Entrega 40 · Producto de matrices

Fuentes: `../../Temario completo/Guion_Temario_Matematicas_CC_Sociales_II_2Bach.md`, 4.3; `../../Planificacion_Interactiva_2Bach_CC_Sociales/03_Tests_2Bach_CC_Sociales.md`, T4.2–T4.3; `../../Planificacion_Interactiva_2Bach_CC_Sociales/02_Flashcards_2Bach_CC_Sociales.md`, conceptos 5–7 del tema 4.

matrix-product-01 adapta la compatibilidad dimensional de T4.2. matrix-product-04 adapta T4.3 y precisa «en general»: no conmutativo no significa que los productos sean siempre distintos. Los otros cuatro ítems, seis tarjetas desarrolladas, cinco ejemplos, práctica, editor y variantes son elaboración propia.

Se amplía el guion con propiedades, tamaños distintos de las identidades laterales, contraejemplo de producto nulo y límites de la cancelación. Las ventas y precios son ficticios; los resultados son ingresos, no beneficios. Las transformaciones actúan sobre vectores columna: la que se aplica primero se escribe a la derecha.

Archivos desde la raíz web: `libro/temas/04-matrices-y-determinantes/03-producto-de-matrices.html`, `content/models/matrix-product.js`, `content/activities/matrix-product.js` y `assets/js/learning/matrix-product-explorer.js`. Originales conservados. Variantes excluidas del banco fijo. Evidencia: [verificacion-entrega-40.md](verificacion-entrega-40.md).

## Entrega 41 · Potencia de una matriz

Fuentes: `../../Temario completo/Guion_Temario_Matematicas_CC_Sociales_II_2Bach.md`, 4.4; `../../Planificacion_Interactiva_2Bach_CC_Sociales/02_Flashcards_2Bach_CC_Sociales.md`, concepto 8 del tema 4. El banco local de test no aporta en esta sección un ítem específico de potencias; las seis preguntas son elaboración propia.

Se desarrollan definición, identidad, leyes para la misma base y patrones. Las seis tarjetas, cinco ejemplos, práctica y explorador son elaboración propia. La lección justifica los patrones mediante agrupación de factores o el paso de n a n+1; no convierte una observación de pocos casos en una demostración general.

La aplicación ficticia representa una cantidad y su incremento fijo por paso en un vector columna. La segunda componente permanece constante; no es otro stock acumulado. Otras matrices del explorador se aplican a un vector abstracto, sin atribuirles significado económico.

Archivos desde la raíz web: `libro/temas/04-matrices-y-determinantes/04-potencia-de-una-matriz.html`, `content/models/matrix-power.js`, `content/activities/matrix-power.js` y `assets/js/learning/matrix-power-explorer.js`. Originales conservados y variantes contadas aparte. Evidencia: [verificacion-entrega-41.md](verificacion-entrega-41.md).

## Entrega 42 · Comparación, simetría y antisimetría

Fuentes: `../../Temario completo/Guion_Temario_Matematicas_CC_Sociales_II_2Bach.md`, 4.5; `../../Planificacion_Interactiva_2Bach_CC_Sociales/03_Tests_2Bach_CC_Sociales.md`, T4.6; `../../Planificacion_Interactiva_2Bach_CC_Sociales/02_Flashcards_2Bach_CC_Sociales.md`, conceptos 9–11, con refuerzo del concepto 3 (igualdad).

matrix-symmetry-02 adapta T4.6: conserva la definición y ajusta los distractores a contenidos ya estudiados. Las otras cinco preguntas, las seis tarjetas desarrolladas, cinco ejemplos, práctica y explorador son elaboración propia.

Se explicitan los casos de matriz nula cuadrada, nula no cuadrada y orden 1×1; diagonal nula como condición necesaria pero no suficiente; y la diferencia entre «antisimétrica» y «no simétrica». Las propiedades de la traspuesta amplían el guion y enlazan con operaciones anteriores.

Ventas, distancias y transferencias son datos ficticios. En distancias se declara la reciprocidad como supuesto. Los saldos F−Fᵀ comparan envíos en ambos sentidos durante el mismo período; no son cantidades finales almacenadas.

Archivos desde la raíz web: `libro/temas/04-matrices-y-determinantes/05-comparacion-de-matrices-matriz-simetrica-y-matriz-antisimetrica.html`, `content/models/matrix-symmetry.js`, `content/activities/matrix-symmetry.js` y `assets/js/learning/matrix-symmetry-explorer.js`. Originales conservados y variantes excluidas del banco fijo. Evidencia: [verificacion-entrega-42.md](verificacion-entrega-42.md).

## Entrega 43 · Determinante de una matriz

Fuentes: `../../Temario completo/Guion_Temario_Matematicas_CC_Sociales_II_2Bach.md`, 4.6; `../../Planificacion_Interactiva_2Bach_CC_Sociales/03_Tests_2Bach_CC_Sociales.md`, T4.4–T4.5; `../../Planificacion_Interactiva_2Bach_CC_Sociales/02_Flashcards_2Bach_CC_Sociales.md`, conceptos 12–13 del tema 4.

determinants-01 adapta la fórmula de T4.4 y determinants-04 adapta la no invertibilidad de T4.5, añadiendo un distractor sobre sistemas. Las otras cuatro preguntas, seis tarjetas desarrolladas, cinco ejemplos, práctica y explorador son elaboración propia.

Se concreta Sarrus en seis productos agrupados y una resta final, conservando signos negativos dentro de ambos grupos. Se añaden determinante de orden 1, parámetro con dos valores singulares, caso de diagonal cero con determinante no nulo y dos sistemas con la misma matriz singular pero distinta compatibilidad.

No se atribuye un significado económico artificial al signo del determinante. El rango y los sistemas aparecen como preparación para sus apartados; calcular la inversa se reserva para 4.9.

Archivos desde la raíz web: `libro/temas/04-matrices-y-determinantes/06-determinante-de-una-matriz.html`, `content/models/determinants.js`, `content/activities/determinants.js` y `assets/js/learning/determinants-explorer.js`. Originales conservados y variantes excluidas del banco fijo. Evidencia: [verificacion-entrega-43.md](verificacion-entrega-43.md).

## Entrega 44 · Propiedades de los determinantes

Fuentes: `../../Temario completo/Guion_Temario_Matematicas_CC_Sociales_II_2Bach.md`, 4.7; `../../Planificacion_Interactiva_2Bach_CC_Sociales/03_Tests_2Bach_CC_Sociales.md`, T4.10; `../../Planificacion_Interactiva_2Bach_CC_Sociales/02_Flashcards_2Bach_CC_Sociales.md`, conceptos 14–15 del tema 4.

det-property-01 adapta T4.10, precisando que se intercambian posiciones distintas. Las otras cinco preguntas, seis tarjetas desarrolladas, cinco ejemplos, práctica, bases y explorador son elaboración propia.

Se explicitan la diferencia entre multiplicar una fila y toda la matriz, la condición de conservar la fila de origen al sumar un múltiplo, el caso k=0 y la imposibilidad de dividir por él. La linealidad en una sola fila se distingue de la falsa aditividad global. Se usa un contraejemplo con I₂.

La triangularización se desarrolla mediante tres sustituciones sucesivas. El explorador compara una sola transformación con la base A, sin presentar sus selecciones como una cadena acumulada ni almacenar historial.

Archivos desde la raíz web: `libro/temas/04-matrices-y-determinantes/07-propiedades-de-los-determinantes.html`, `content/models/determinant-properties.js`, `content/activities/determinant-properties.js` y `assets/js/learning/determinant-properties-explorer.js`. Originales conservados y variantes excluidas del banco fijo. Evidencia: [verificacion-entrega-44.md](verificacion-entrega-44.md).

## Entrega 45 · Desarrollo de un determinante

Fuente curricular: `../../Temario completo/Guion_Temario_Matematicas_CC_Sociales_II_2Bach.md`, apartado 4.8: menores y cofactores/adjuntos, desarrollo por filas o columnas, elección de ceros y reducción de orden superior.

Los cinco ejemplos, la práctica, las seis preguntas det-exp-01 a det-exp-06, seis tarjetas y las cuatro bases del explorador son elaboración propia a partir de ese guion. No se atribuyen estos ítems al banco local de test ni a un examen original.

Se distingue submatriz de menor (número), adjunto de aportación y signo de posición de signo numérico. El orden 4 se reduce a 3 y luego a 2. El caso con parámetro se explica algebraicamente; el editor admite solo enteros. Los términos de coeficiente cero se muestran con fines didácticos, sin afirmar que su menor sea cero.

Archivos desde la raíz web: `libro/temas/04-matrices-y-determinantes/08-desarrollo-de-un-determinante.html`, `content/models/determinant-expansion.js`, `content/activities/determinant-expansion.js` y `assets/js/learning/determinant-expansion-explorer.js`. Originales conservados. Evidencia: [verificacion-entrega-45.md](verificacion-entrega-45.md).

## Entrega 46 · Matriz inversa y matriz adjunta

Fuentes: `../../Temario completo/Guion_Temario_Matematicas_CC_Sociales_II_2Bach.md`, apartado 4.9; `../../Planificacion_Interactiva_2Bach_CC_Sociales/03_Tests_2Bach_CC_Sociales.md`, T4.7; `../../Planificacion_Interactiva_2Bach_CC_Sociales/02_Flashcards_2Bach_CC_Sociales.md`, conceptos 16, 17, 19 y 20 del tema 4.

La pregunta matrix-inverse-04 adapta T4.7, precisando el lado de multiplicación y sus condiciones. Las otras cinco preguntas, seis tarjetas desarrolladas, cinco ejemplos, práctica y explorador son elaboración propia. Las tarjetas recogen la convención local: Adj(A) es la traspuesta de la matriz de cofactores. Se explica la diferencia con textos que llaman adjunta a la matriz de cofactores sin trasponer.

Se distingue singularidad de incompatibilidad de un sistema. La adjunta sigue definida cuando det(A)=0; la inversa no. El parámetro se desarrolla algebraicamente con las dos exclusiones ±√2. El ejemplo de precios comprueba las unidades y ambas ecuaciones originales.

Archivos desde la raíz web: `libro/temas/04-matrices-y-determinantes/09-matriz-inversa-y-matriz-adjunta.html`, `content/models/matrix-inverse.js`, `content/activities/matrix-inverse.js` y `assets/js/learning/matrix-inverse-explorer.js`. Originales conservados; variantes excluidas del banco fijo. Evidencia: [verificacion-entrega-46.md](verificacion-entrega-46.md).

## Entrega 47 · Rango de una matriz

Fuentes: `../../Temario completo/Guion_Temario_Matematicas_CC_Sociales_II_2Bach.md`, 4.10; `../../Planificacion_Interactiva_2Bach_CC_Sociales/03_Tests_2Bach_CC_Sociales.md`, T4.9; `../../Planificacion_Interactiva_2Bach_CC_Sociales/02_Flashcards_2Bach_CC_Sociales.md`, concepto 18 del tema 4 y conceptos 6, 8–12 del tema 5 para la conexión con sistemas.

matrix-rank-01 adapta T4.9; las otras cinco preguntas, seis tarjetas desarrolladas, cinco ejemplos, práctica y explorador son elaboración propia. Se distingue dimensión, orden, rango y número de incógnitas; se introduce Rouché-Frobenius sin dar por desarrollado el tema de sistemas.

El rango se calcula por todos los menores cuadrados posibles, incluidas filas o columnas no consecutivas, y se contrasta con reducción exacta por filas. Un menor nulo no se presenta como prueba suficiente de rango menor. Para rango r se muestra un menor no nulo y se descartan órdenes superiores. La matriz nula se trata explícitamente.

El parámetro produce rango 3 salvo t=1, donde el rango baja a 1. No se divide por t−1 sin separar casos. Los ejemplos de sistemas distinguen coeficientes y ampliada y comparan sus rangos con las incógnitas.

Archivos desde la raíz web: `libro/temas/04-matrices-y-determinantes/10-rango-de-una-matriz.html`, `content/models/matrix-rank.js`, `content/activities/matrix-rank.js` y `assets/js/learning/matrix-rank-explorer.js`. Originales conservados. Evidencia: [verificacion-entrega-47.md](verificacion-entrega-47.md).

## Entrega 48 · Ecuaciones matriciales

Fuente rectora: `../../Temario completo/Guion_Temario_Matematicas_CC_Sociales_II_2Bach.md`, apartado 4.11: AX=B, XA=B y variantes, orden, dimensiones, inversas, comprobación y traducción a sistemas. Se retoman las condiciones ya revisadas en 4.9 y los conceptos 19–20 del tema 4 del banco local de tarjetas.

Los cinco ejemplos, práctica, seis preguntas matrix-equation-01 a matrix-equation-06, seis tarjetas y explorador son elaboración propia. El primer ejemplo retoma matrices de 4.9 para comparar ambos lados; no se considera un problema fuente distinto en una futura auditoría deduplicada del tema.

Se desarrolla una incógnita rectangular, agrupación con A+kI, AXD=B y un coeficiente singular con familias de soluciones o incompatibilidad. La comprobación del explorador sustituye en AX+kX o XA+kX, además de resolver con el coeficiente agrupado.

El cambio de lado del explorador traspone B para mantener dimensiones; se anuncia expresamente que plantea otra ecuación. El estado singular no se etiqueta automáticamente como «sin solución».

Archivos desde la raíz web: `libro/temas/04-matrices-y-determinantes/11-ecuaciones-matriciales.html`, `content/models/matrix-equations.js`, `content/activities/matrix-equations.js` y `assets/js/learning/matrix-equations-explorer.js`. Originales conservados. Evidencia: [verificacion-entrega-48.md](verificacion-entrega-48.md).

El criterio de reutilización de los 33 HTML originales para programación lineal y bloques estadísticos permanece vigente; esta entrega no modifica esos bloques.

## Entrega 49 · Grafos y matriz de adyacencia

Fuentes: `../../Temario completo/Guion_Temario_Matematicas_CC_Sociales_II_2Bach.md`, apartado 4.12; `../../Planificacion_Interactiva_2Bach_CC_Sociales/03_Tests_2Bach_CC_Sociales.md`, T4.8; `../../Planificacion_Interactiva_2Bach_CC_Sociales/02_Flashcards_2Bach_CC_Sociales.md`, conceptos 21–24 del tema 4.

graph-01 adapta T4.8, precisando que la simetría es obligatoria en un grafo simple no dirigido con el mismo orden de vértices. Las tarjetas desarrollan los conceptos fuente y añaden grados y recorridos. Los cinco ejemplos, práctica, otras cinco preguntas, modelo y explorador son elaboración propia.

Se trabaja con matrices binarias sin lazos, con una ampliación explícita a redes dirigidas. Las potencias cuentan recorridos de longitud exacta que permiten repetir vértices y conexiones; no se confunden con caminos simples, costes, distancias o probabilidades. Se separan A, A² y A⁰ y se explica que una entrada cero en una potencia no demuestra desconexión.

Archivos desde la raíz web: `libro/temas/04-matrices-y-determinantes/12-grafos-y-matriz-de-adyacencia-asociada.html`, `content/models/graphs.js`, `content/activities/graphs.js` y `assets/js/learning/graph-explorer.js`. Originales conservados y variantes excluidas del banco fijo. Evidencia: [verificacion-entrega-49.md](verificacion-entrega-49.md).

Los doce epígrafes no cierran todavía el tema: faltan repaso integrado, auditoría conjunta y tres juegos independientes. Se mantiene la prioridad de los HTML originales en programación lineal y bloques estadísticos.

## Entrega 50 · Repaso integrado y auditoría del tema 4

Fuentes rectoras: guion 4.1–4.12, test local T4.1–T4.10 y los 24 conceptos de tarjetas del tema 4, en las rutas de la [auditoría](auditoria-tema-04.md). Se revisaron los ejemplos de las doce lecciones y sus bancos.

Los cuatro bloques integrados son elaboración propia: ventas/márgenes y traspuesta; determinante, adjunta y rango con dos valores singulares; potencias y ecuaciones a ambos lados; y redes con singularidad y saldos antisimétricos. El bloque de potencias reutiliza el patrón nilpotente ya explicado en 4.4, ahora combinado con ecuaciones; no se presenta como un concepto nuevo.

`content/activities/review-t04.js` selecciona doce identificadores existentes, uno por epígrafe. `catalog.js` devuelve los mismos objetos del banco para `review-t04`. No se añaden preguntas ni tarjetas y no se cuentan las doce seleccionadas por duplicado. Se mantienen 72/72 en t04 y 252/235 en el curso.

La auditoría recoge veinte problemas o bloques de forma conservadora y evita contar dos veces el ejemplo AX=D/XA=D repetido en 4.9 y 4.11. Señala la precisión de T4.3 (no conmutatividad general) y de T4.8 (simetría obligatoria bajo las hipótesis indicadas), sin modificar los originales.

Archivos principales desde la raíz web: `libro/temas/04-matrices-y-determinantes/index.html`, `content/activities/review-t04.js`, `docs/auditoria-tema-04.md` y `tests/matrices-review.test.mjs`. Verificación: [entrega 50](verificacion-entrega-50.md).

No se han compilado exámenes ni desarrollado contenido de programación lineal o de los bloques estadísticos. Sigue vigente la instrucción de reutilizar todos sus HTML originales y dejar carencias señaladas.

## Entrega 51 · Matrix Ops

Fuente: `../../Planificacion_Interactiva_2Bach_CC_Sociales/01_Laboratorios_Minijuegos_2Bach_CC_Sociales.md`, laboratorio 4A, y las lecciones 4.1–4.4 ya revisadas. El plan pide tipos, suma, producto, potencias y comprobación de dimensiones antes de calcular.

La adaptación incorpora controles nativos de selección en lugar de arrastre y una sesión sin reloj; el reto opcional de cinco segundos no se implementa. Se añaden resta, producto por escalar y productos en ambos órdenes para reforzar signos y dimensiones. Aparecen matrices 2×2, 2×3 y 3×2, con resultados hasta 3×3.

Son elaboración propia las ocho familias, sus generadores, alternativas, pistas, explicaciones y puntuación. El reto de tipos alterna identidad, nula cuadrada, diagonal no escalar y rectangular no cuadrada. Las opciones de cálculo difieren en una entrada, y la corrección señala la posición. Un producto incompatible exige justificar la incompatibilidad, sin ofrecer un resultado inventado.

Archivos: `widgets/games/t04-a-matrix-ops/` (index.html, style.css, widget.js, generator.js) y `laboratorios/juegos/t04-a-matrix-ops.html`. Se reutilizan MathJax y las preferencias/comunicación del widget compartidos.

No se añaden preguntas al banco fijo: se mantienen 252 preguntas y 235 tarjetas en el curso, 72/72 en el tema 4. Originales conservados. Evidencia: [verificacion-entrega-51.md](verificacion-entrega-51.md).

## Entrega 52 · La cámara del determinante

Fuente: `../../Planificacion_Interactiva_2Bach_CC_Sociales/01_Laboratorios_Minijuegos_2Bach_CC_Sociales.md`, laboratorio 4B, y las lecciones 4.6–4.10. Se mantiene la idea de salas y cerraduras, algunas resueltas con propiedades, y un final que requiere determinante, invertibilidad y una entrada de la inversa.

Son elaboración propia las seis familias, sus datos generados, alternativas, pistas y explicaciones. El final usa una triangular no simétrica con entrada (1,2) de la inversa no nula y fraccionaria; se necesita C₂₁, no C₁₂. Esta restricción hace visible el papel de la traspuesta de cofactores. La matriz singular de otra sala tiene rango 2 justificado por un menor no nulo; no se deduce rango cero del determinante nulo.

Archivos: `widgets/games/t04-b-la-camara-del-determinante/` (index.html, style.css, widget.js, generator.js) y `laboratorios/juegos/t04-b-la-camara-del-determinante.html`. La aritmética de fracciones reutiliza el modelo compartido; la interfaz utiliza MathJax, preferencias y comunicación de widgets existentes.

El mapa distingue salas pendientes, en curso, abiertas y abiertas con solución explicada. Son 18 decisiones sin reloj y hasta dos intentos por cerradura. La revelación tras dos errores permite continuar con 0 puntos; no se presenta como acierto.

No se añaden preguntas al banco fijo ni se modifican fuentes originales. Permanecen 252 preguntas y 235 tarjetas en el curso, 72/72 en t04. Evidencia: [verificacion-entrega-52.md](verificacion-entrega-52.md).

## Entrega 53 · Redes y adyacencia

Fuente: `../../Planificacion_Interactiva_2Bach_CC_Sociales/01_Laboratorios_Minijuegos_2Bach_CC_Sociales.md`, laboratorio 4C, y la lección 4.12. Se implementan las dos traducciones pedidas (grafo → matriz y matriz → grafo), conexiones editables y SVG con nodos arrastrables.

La secuencia, generador de sesiones, pistas, explicaciones y puntuación son elaboración propia. Se reutilizan `content/models/graphs.js` (generación de matrices y cambio de conexiones) y `matrixTex` del modelo de matrices. El dibujo del widget se mantiene independiente del explorador del libro. No se modifican los HTML originales ni el banco fijo.

Archivos: `widgets/games/t04-c-redes-y-adyacencia/` (index.html, style.css, generator.js, graph.js, widget.js) y `laboratorios/juegos/t04-c-redes-y-adyacencia.html`. Se reutilizan MathJax, preferencias y comunicación con el anfitrión. Las posiciones de los nodos solo pertenecen a la representación: moverlos no modifica ninguna entrada.

Restricciones explícitas: adyacencia binaria, sin lazos ni conexiones múltiples; tres o cuatro vértices. Las redes dirigidas siempre contienen al menos un arco sin vuelta. Los dos retos finales tienen al menos un aislado, cuya posición varía; puede haber más de uno o una red sin conexiones. No se exige conexidad. Las redes de ambas traducciones se generan por separado; no se impone que las dos redes de cada pareja coincidan.

No se incluyen preguntas nuevas de potencias: los recorridos siguen en el explorador de 4.12. Se mantienen 72 preguntas/72 tarjetas en t04 y 252/235 en el curso. Verificación: [entrega 53](verificacion-entrega-53.md).

## Entrega 54 · Recorrido conjunto del tema 4

Fuentes: lecciones 4.1–4.12, auditoría del tema y laboratorios 4A–4C ya desarrollados en las entregas 51–53. La orientación de la ruta es elaboración propia: vincula cada juego con sus requisitos y dificultades habituales sin añadir preguntas, ejemplos ni conceptos al banco.

La ruta propone Matrix Ops tras 4.1–4.4, La cámara del determinante tras 4.6–4.10 y Redes y adyacencia tras 4.12. Enlaza también 4.5, 4.11 y el repaso para evitar que los juegos se interpreten como sustitutos del estudio de todo el tema. El acceso es libre y las puntuaciones no desbloquean contenidos.

Se modifican el índice del tema, las invitaciones de 4.4, 4.10 y 4.12 y la navegación de los tres anfitriones. Los modelos matemáticos, generadores, bancos y motor de LaTeX se conservan. El recorrido de integración no reemplaza las pruebas completas de cada juego documentadas en 51–53.

Se mantienen 47 lecciones, 252 preguntas base, 235 tarjetas y trece widgets; t04 conserva 72/72 y veinte problemas/bloques inventariados. Materiales originales conservados. Evidencia: [entrega 54](verificacion-entrega-54.md).

## Entrega 55 · Sistemas de ecuaciones lineales

Fuentes revisadas: `../../Temario completo/Guion_Temario_Matematicas_CC_Sociales_II_2Bach.md`, 5.1; `../../Planificacion_Interactiva_2Bach_CC_Sociales/02_Flashcards_2Bach_CC_Sociales.md`, tarjeta 1 del tema 5; y `03_Tests_2Bach_CC_Sociales.md` en esa misma carpeta, T5.1–T5.10. Los test locales tratan clasificación, rango y métodos posteriores: se reservan para sus epígrafes y no se adelantan como contenido de 5.1.

La lección desarrolla los cuatro puntos del guion: definición, elementos, forma algebraica y solución simultánea. Los cinco ejemplos y la práctica de lotes son elaboración propia. El ejemplo de entradas reutiliza deliberadamente el sistema del ejemplo 2 para pasar de la comprobación al significado de sus coeficientes; no son dos modelos numéricos distintos. Importes y cantidades son ficticios.

La primera tarjeta adapta el concepto de ecuación y la cuarta desarrolla la simultaneidad de la tarjeta fuente. Las seis preguntas y las demás tarjetas son elaboración propia alineada con el epígrafe. No se presentan como transcripciones de T5.1–T5.10.

Archivos: `content/models/linear-systems.js`, `content/activities/linear-systems.js`, `assets/js/learning/linear-systems-explorer.js` y `libro/temas/05-sistemas-de-ecuaciones/01-sistemas-de-ecuaciones-lineales.html`. El explorador comprueba valores, no enumera todas las soluciones ni clasifica un sistema a partir de una sola tupla. Presenta las filas degeneradas 0=0 y 0=1 conservando su significado.

El generador elige coeficientes y una solución entera y calcula los términos independientes. Todas las variantes generadas son compatibles, sin garantizar unicidad; los valores de prueba comienzan en cero. La edición libre y el ejemplo 0=1 permiten investigar incompatibilidad. La interfaz admite enteros entre −99 y 99; el texto distingue ese límite de los sistemas matemáticos generales con números reales.

Se añaden seis preguntas y seis tarjetas: catálogo 258/241; tema 5, 6/6. Las variantes no elevan los contadores. Las expectativas globales de las pruebas anteriores se actualizan, manteniendo sus comprobaciones por tema. Originales conservados; criterio de reutilizar los HTML de programación lineal y bloques estadísticos vigente. Evidencia: [entrega 55](verificacion-entrega-55.md).

## Entrega 56 · Solución de un sistema de ecuaciones

Fuentes: `../../Temario completo/Guion_Temario_Matematicas_CC_Sociales_II_2Bach.md`, 5.2; test locales T5.1, T5.2 y T5.10 de `../../Planificacion_Interactiva_2Bach_CC_Sociales/03_Tests_2Bach_CC_Sociales.md`; tarjetas 2–4 y 22 del tema 5 en `02_Flashcards_2Bach_CC_Sociales.md` de esa carpeta. Se desarrolla la interpretación geométrica; las siglas y clasificación sistemática quedan para 5.3.

Ejemplos y práctica de costes: elaboración propia. La pregunta sobre coincidentes adapta T5.10 sin exigir todavía las siglas SCI. Las demás preguntas y tarjetas desarrollan la intersección, el conjunto completo, las coordenadas exactas y los límites de una gráfica. Se distingue explícitamente una solución particular de resolver todo el sistema.

Archivos: `content/models/system-solutions.js`, `content/activities/system-solutions.js`, `assets/js/learning/system-solutions-explorer.js` y la lección 5.2. Se reutilizan el formateador de expresiones lineales, las fracciones reducidas y MathJax compartidos. La representación gráfica se recorta al cuadrado visible y no determina el resultado algebraico.

El modelo compara productos cruzados para clasificar dos rectas y calcula la intersección con fracciones exactas. Se contrasta mediante eliminación por filas independiente. Este cálculo interno no se presenta como enseñanza anticipada de Cramer. Las soluciones coincidentes se describen con un parámetro real, también cuando la recta es vertical.

El generador mantiene el tipo elegido. Para secantes elige un punto entero común y dos direcciones no paralelas; aparecen cortes oblicuos y perpendiculares. Para coincidentes multiplica toda la ecuación por un factor no nulo; para paralelas distintas altera además el término independiente. No se generan ecuaciones degeneradas: su diferencia con una recta se explica en el texto y se mantiene en el explorador de 5.1.

Los seis casos iniciales incluyen intersección fraccionaria y fuera de la ventana. Las coordenadas de prueba aceptan enteros, decimales finitos de hasta tres cifras decimales o fracciones, sin evaluación de expresiones. Se comprueban exactamente; una aproximación como 0,333 no se confunde con 1/3. La variante generada puede repetirse y no representa todo sistema imaginable.

Se añaden seis preguntas y seis tarjetas: t05 12/12, catálogo 264/247. Originales conservados. Evidencia: [entrega 56](verificacion-entrega-56.md).

## Entrega 57 · 5.3. Clasificación de sistemas

- Guion local: `../../Temario completo/Guion_Temario_Matematicas_CC_Sociales_II_2Bach.md`, epígrafe 5.3: SCD, SCI y SI, reconocimiento algebraico, matricial y geométrico.
- Banco local: `../../Planificacion_Interactiva_2Bach_CC_Sociales/03_Tests_2Bach_CC_Sociales.md`, conceptos T5.1, T5.2 y T5.10. Adaptación conceptual, sin copiar distractores como criterios correctos.
- Tarjetas locales: `../../Planificacion_Interactiva_2Bach_CC_Sociales/02_Flashcards_2Bach_CC_Sociales.md`, compatibilidad, tipos y geometría.
- Desarrollo propio: seis ejemplos, práctica de informes de ventas, seis preguntas, seis tarjetas y seis familias controladas en `../content/models/system-classification.js`. Las variantes cambian datos; no aumentan el banco fijo.
- La lectura matricial anticipa filas de coeficientes y término independiente; AX=B se desarrolla en 5.4 y el criterio general por rangos en 5.6. No se presenta el generador como un solucionador general.
- La clasificación se formula sobre los reales. La práctica distingue SCI real de 21 parejas enteras no negativas admisibles. Una identidad no implica SCI y menos ecuaciones que incógnitas no garantiza compatibilidad.
- Materiales originales conservados. Continúa vigente la reutilización de todos los HTML originales en programación lineal, estadística, distribuciones e inferencia, dejando carencias sin rellenar o documentadas.

## Entrega 58 · 5.4. Notación matricial de un sistema

- Guion local: `../../Temario completo/Guion_Temario_Matematicas_CC_Sociales_II_2Bach.md`, 5.4: construcción de A, X, B, AX=B y matriz ampliada; uso posterior en resolución y clasificación.
- Test local: `../../Planificacion_Interactiva_2Bach_CC_Sociales/03_Tests_2Bach_CC_Sociales.md`, T5.8, adaptación conceptual de la forma AX=B.
- Tarjetas locales: `../../Planificacion_Interactiva_2Bach_CC_Sociales/02_Flashcards_2Bach_CC_Sociales.md`, tema 5, forma matricial y ampliada.
- Elaboración propia: teoría, seis ejemplos, contexto de papelería, seis preguntas/tarjetas y explorador `../assets/js/learning/system-notation-explorer.js`. Modelo: `../content/models/system-notation.js`. Reutiliza validación, dimensiones y generador de sistemas de 5.1.
- Se hace explícito el orden de variables, los coeficientes cero, los signos al ordenar miembros y las dimensiones rectangulares. B nulo no implica A nula. La notación no se presenta como resolución ni como prueba de unicidad.
- El explorador permite orden normal o inverso; el modelo admite cualquier permutación válida. Los cambios de filas se explican, pero no se añaden controles de transformación elemental, reservados para 5.5.
- Materiales originales preservados. Se mantiene la reutilización de todos los HTML originales para programación lineal y bloques estadísticos, con huecos y mejoras señalados.

## Entrega 59 · 5.5. Sistemas equivalentes

- Guion local: `../../Temario completo/Guion_Temario_Matematicas_CC_Sociales_II_2Bach.md`, 5.5: igualdad de conjuntos solución, operaciones elementales, filas y preparación de Gauss.
- Test local: `../../Planificacion_Interactiva_2Bach_CC_Sociales/03_Tests_2Bach_CC_Sociales.md`, T5.5, adaptación conceptual de operaciones que generan sistemas equivalentes.
- Tarjetas locales: `../../Planificacion_Interactiva_2Bach_CC_Sociales/02_Flashcards_2Bach_CC_Sociales.md`, tema 5, tarjetas 7 y 8.
- Elaboración propia: seis ejemplos, práctica guiada, seis preguntas y seis tarjetas; modelo `../content/models/equivalent-systems.js` y taller `../assets/js/learning/equivalent-systems-explorer.js`.
- Reutilización interna: fracciones normalizadas de inversa de matrices, formato de ampliada de 5.4 y generador compatible de 5.1. No se modifica el material original.
- La equivalencia se justifica por reversibilidad, no por comprobar algunas tuplas ni solo por tener igual rango o tipo. Dos sistemas SI con las mismas incógnitas y dominio comparten el conjunto vacío. Se separa el factor cero en escalado del múltiplo cero en suma de filas.
- El taller aplica pasos consecutivos sobre la matriz actual y conserva la fila de origen. Gauss completo y discusión de parámetros quedan para sus epígrafes.
- Continúa vigente la reutilización de todos los HTML originales de programación lineal y bloques estadísticos, con huecos o mejoras señalados.

## Entrega 60 · 5.6. Teorema de Rouché–Frobenius

- Guion local: `../../Temario completo/Guion_Temario_Matematicas_CC_Sociales_II_2Bach.md`, 5.6: compatibilidad por rangos, SCD/SCI, casos y parámetros.
- Test local: `../../Planificacion_Interactiva_2Bach_CC_Sociales/03_Tests_2Bach_CC_Sociales.md`, T5.3 y T5.4: adaptación conceptual de compatibilidad y unicidad.
- Tarjetas locales: `../../Planificacion_Interactiva_2Bach_CC_Sociales/02_Flashcards_2Bach_CC_Sociales.md`, tema 5, tarjetas 9–12.
- Elaboración propia: teoría, seis ejemplos, práctica con dos parámetros libres, seis preguntas/tarjetas y explorador. Modelo `../content/models/rouche-frobenius.js` y módulo `../assets/js/learning/rouche-frobenius-explorer.js`.
- Reutiliza cálculo exacto de menores y escalonamiento de 4.10; escritura de matrices de 5.4 y de ecuaciones de 5.1. El explorador muestra un menor no nulo y justifica por qué no hay rango superior.
- La familia λx+y=2, x+λy=2 se discute para todo λ real en la lección; la interfaz solo toma siete muestras enteras. Se distinguen λ=1 (SCI), λ=−1 (SI) y el resto (SCD).
- El número n−r de parámetros se usa solo después de comprobar compatibilidad. El ejemplo rectangular distingue n de m y la práctica con c=6 describe una familia completa de dos parámetros.
- Originales preservados y criterio de reutilización de todos los HTML iniciales para programación lineal y bloques estadísticos vigente.

## Entrega 61 · 5.7. Resolución mediante matriz inversa

- Guion local: `../../Temario completo/Guion_Temario_Matematicas_CC_Sociales_II_2Bach.md`, 5.7: X=A⁻¹B, condición de determinante no nulo, elección del método y comprobación.
- Test local: `../../Planificacion_Interactiva_2Bach_CC_Sociales/03_Tests_2Bach_CC_Sociales.md`, T4.7: adaptación conceptual del orden A⁻¹B al caso de sistemas.
- Tarjetas locales: `../../Planificacion_Interactiva_2Bach_CC_Sociales/02_Flashcards_2Bach_CC_Sociales.md`, tema 5, tarjetas 13–14.
- Desarrollo propio: seis ejemplos, práctica de venta, seis preguntas/tarjetas, modelo `../content/models/inverse-systems.js` y explorador `../assets/js/learning/inverse-systems-explorer.js`.
- Reutiliza inversa, adjunta y fracciones de 4.9 y clasificación de 5.6. No se presenta la ausencia de inversa como prueba de incompatibilidad.
- La comprobación sustituye todas las coordenadas exactas en todas las ecuaciones. El ejemplo de aproximación (0,67; −0,33) se distingue expresamente de la solución (2/3, −1/3).
- El mismo A puede reutilizar su inversa ante nuevos B. La práctica con B=(9,23) queda fuera del rango de entrada del editor y se desarrolla en el texto; su aritmética se verifica por separado.
- Originales conservados. Se mantiene la reutilización de todos los HTML iniciales en programación lineal y bloques estadísticos, dejando huecos o mejoras señalados.

## Entrega 62 · 5.8. Método de Gauss

- Guion local: `../../Temario completo/Guion_Temario_Matematicas_CC_Sociales_II_2Bach.md`, 5.8: ampliada, operaciones elementales, forma escalonada, sustitución, contradicciones y variables libres.
- Test local: `../../Planificacion_Interactiva_2Bach_CC_Sociales/03_Tests_2Bach_CC_Sociales.md`, T5.5, adaptado a los pasos de resolución. Tarjeta 15 del tema 5 en `../../Planificacion_Interactiva_2Bach_CC_Sociales/02_Flashcards_2Bach_CC_Sociales.md`.
- Elaboración propia: seis ejemplos, práctica contextual, seis preguntas y seis tarjetas; `../content/models/gauss.js` y `../assets/js/learning/gauss-explorer.js`.
- Reutiliza escalonamiento exacto de 4.10, fracciones de 4.9 y notación de operaciones de 5.5. No modifica sus algoritmos; añade sustitución afín hacia atrás y comprobación del sistema original.
- Ocho casos: SCD de tres incógnitas, intercambio, fracciones, SCI, SI, rectangular, primera columna sin pivote y matriz nula. Dos o tres ecuaciones e incógnitas; enteros de −9 a 9. Las variantes aleatorias son reproducibles y su tipo se calcula, no se presupone.
- Los pivotes en B solo señalan contradicción. Cada columna de incógnita sin pivote recibe un parámetro independiente únicamente en sistemas compatibles. Se conserva B al cambiar dimensiones.
- La práctica del pedido reutiliza el contexto de 5.7 para comparar métodos; B=23 queda fuera del editor y se resuelve en el texto. El taller manual de 5.5 sigue enlazado; el futuro widget Gauss paso a paso (5B) es una tarea distinta.
- Materiales originales conservados y criterio de reutilización de todos los HTML iniciales para programación lineal y bloques estadísticos vigente.

## Entrega 63 · 5.9. Regla de Cramer

- Guion: `../../Temario completo/Guion_Temario_Matematicas_CC_Sociales_II_2Bach.md`, 5.9: condición de determinante no nulo, matrices auxiliares, cocientes y comparación con Gauss.
- Test: `../../Planificacion_Interactiva_2Bach_CC_Sociales/03_Tests_2Bach_CC_Sociales.md`, T5.6. Tarjeta 16 del tema 5: `../../Planificacion_Interactiva_2Bach_CC_Sociales/02_Flashcards_2Bach_CC_Sociales.md`.
- Elaboración propia: teoría, seis ejemplos, práctica, seis preguntas/tarjetas, `../content/models/cramer.js` y `../assets/js/learning/cramer-explorer.js`.
- Reutiliza desarrollo de determinantes de 4.8, fracciones de 4.9, clasificación por rangos de 5.6 y generador acotado de 5.7. La resolución usa cocientes de determinantes, sin calcular la inversa.
- Cada matriz auxiliar sustituye exactamente una columna de la A original. La salida muestra los cofactores en el desarrollo por la primera fila y verifica las coordenadas en todas las ecuaciones.
- Ocho casos: enteros, fracciones, tres incógnitas, una coordenada nula, B nulo, SCI, SI y el contraejemplo 3×3 con todos los determinantes nulos pero incompatible. No se confunde numerador cero con denominador cero.
- Editor de enteros entre −9 y 9, orden 2 o 3; seis combinaciones de orden y tipo en las variantes. La práctica con B=23 se resuelve en el texto, fuera del límite del editor.
- Originales conservados. Sigue vigente el criterio de reutilizar todos los HTML iniciales para programación lineal y bloques estadísticos, dejando carencias señaladas.

## Entrega 64 · 5.10. Sistemas homogéneos

- Guion: `../../Temario completo/Guion_Temario_Matematicas_CC_Sociales_II_2Bach.md`, 5.10: AX=0, solución trivial, soluciones no triviales, rango y determinante.
- Test: `../../Planificacion_Interactiva_2Bach_CC_Sociales/03_Tests_2Bach_CC_Sociales.md`, T5.7. Tarjetas 17–19 del tema 5: `../../Planificacion_Interactiva_2Bach_CC_Sociales/02_Flashcards_2Bach_CC_Sociales.md`.
- Elaboración propia: seis ejemplos, práctica de variaciones presupuestarias, seis preguntas/tarjetas; `../content/models/homogeneous-systems.js` y `../assets/js/learning/homogeneous-systems-explorer.js`.
- Reutiliza Gauss y las expresiones afines de 5.8, operaciones de 5.5 y fracciones de 4.9. No cambia esos algoritmos. Obtiene las direcciones de la familia y comprueba cada solución elegida exactamente.
- B es siempre nulo y no editable. Coeficientes enteros de −9 a 9; dos o tres ecuaciones e incógnitas. Parámetros de muestra enteros de −5 a 5; se explica que la familia admite todos los valores reales.
- Ocho casos: solución única de orden 2, dependencia, familia fraccionaria rectangular, dos parámetros, sistema sobredeterminado SCD, matriz nula, solución única de orden 3 y primera columna sin pivote.
- Se evita atribuir determinante a matrices rectangulares o confundir no trivial con todas las coordenadas no nulas. Menos ecuaciones que incógnitas implica SCI aquí porque el sistema ya es compatible.
- La práctica distingue las variaciones (t,t,−2t) de las cantidades finales (30+t,20+t,10−2t); la no negatividad restringe t al intervalo [−20,5].
- Originales preservados; se mantiene la reutilización de todos los HTML iniciales para programación lineal y bloques estadísticos, con carencias señaladas.

## Entrega 65 · 5.11. Discusión de sistemas con parámetros

- Guion: `../../Temario completo/Guion_Temario_Matematicas_CC_Sociales_II_2Bach.md`, 5.11: valores críticos, estudio de rangos, clasificación y resolución por casos.
- Test: `../../Planificacion_Interactiva_2Bach_CC_Sociales/03_Tests_2Bach_CC_Sociales.md`, T5.9. Tarjetas 20–21 del tema 5: `../../Planificacion_Interactiva_2Bach_CC_Sociales/02_Flashcards_2Bach_CC_Sociales.md`.
- Elaboración propia: seis discusiones, práctica de mezclas y seis preguntas/tarjetas; `../content/models/parameter-systems.js` y `../assets/js/learning/parameter-systems-explorer.js`.
- Reutiliza Gauss exacto de 5.8, operaciones y notación de 5.5, determinantes de 4.8 y fracciones de 4.9. No modifica los algoritmos compartidos.
- Las seis familias tienen particiones algebraicas completas para λ real: dos valores críticos, cancelación de factor, contradicción, homogéneo, rectangular y tres incógnitas con raíz doble. Se distinguen λ y las variables libres.
- El selector comprueba trece valores entre −3 y 3, con paso 1/2. En semienteros se multiplican las ecuaciones por 2 antes de calcular. No es un solucionador simbólico de sistemas arbitrarios: las discusiones completas están justificadas en el texto y el modelo.
- Las variantes eligen una muestra y permutan filas o cambian signos; conservan su conjunto solución. Se explica la transformación y se presenta el determinante de la familia original antes de escalar o reordenar.
- La práctica distingue solución algebraica y factibilidad: mezcla de 4 kg por 6 €, precio del segundo producto λ; cantidades no negativas solo si λ≥3/2, y ambas positivas si λ>3/2.
- Originales conservados. Sigue vigente la reutilización de todos los HTML iniciales para programación lineal y bloques estadísticos, con huecos señalados.

## Entrega 66 · Repaso integrado de sistemas

- Fuentes: guion local 5.1–5.11, tests T5.1–T5.10, 22 conceptos de flashcards y laboratorios 5A–5C de la planificación. [Cobertura y rutas completas](auditoria-tema-05.md).
- Cuatro bloques de elaboración propia: recaudación y tres métodos; inventario rectangular con condición adicional; dos discusiones con la misma A; cambios homogéneos y restricciones finales.
- `../content/activities/review-t05.js` selecciona once preguntas existentes, una por epígrafe. Conserva sus objetos, identificadores, pistas y explicaciones; bancos 66/66 y globales 318/301 sin duplicación.
- Se corrige en 5.1 una frase sobre intercambiar ecuaciones: el cambio de orden sí es válido. No se modifica la fuente original.
- Se inventarían dieciséis problemas/bloques, sin contar variantes numéricas ni métodos alternativos como problemas nuevos.
- Tema parcial por videojuegos y accesibilidad global. No se han compilado PDF; originales y criterio de reutilización de los HTML de programación lineal y estadística conservados.

## Entrega 67 · Clasificador de sistemas

- Fuente principal: `../../Planificacion_Interactiva_2Bach_CC_Sociales/01_Laboratorios_Minijuegos_2Bach_CC_Sociales.md`, laboratorio 5A: ecuaciones, matrices escalonadas, rectas, rangos y clasificación con feedback mediante Rouché–Frobenius.
- Refuerzos: guion 5.2–5.6 y 5.8; tests T5.1–T5.5 y T5.10; tarjetas fuente 2–4, 9–12 y 22.
- Implementación propia: `../widgets/games/t05-a-clasificador-de-sistemas/`, con generación, geometría, sesión e interfaz separados. Reutiliza Gauss exacto y notación del libro, carga local de LaTeX y comunicación de preferencias del widget.
- Sesiones de doce retos, tres por representación, con cada tipo SCD/SCI/SI presente en cada representación. Números y orden variables; no se presenta como generador de todos los sistemas lineales posibles.
- Ecuaciones con dos o tres incógnitas; filas nulas y contradicciones; datos de rango con sistemas testigo; rectas verticales, horizontales, secantes, coincidentes y paralelas. Ventana gráfica [−6,6]²; cruces generados dentro de [−2,2]².
- Adaptación de acceso: opciones en lugar de arrastre obligatorio, sin reloj, dos intentos y pistas gratuitas. La explicación ofrece rangos, número de incógnitas y matriz equivalente.
- Puntuación: 100 al primer intento, 50 al segundo, 0 tras dos errores; máximo 1200. Las pistas se cuentan una vez por reto. Sesión en memoria, sin estadísticas personales.
- Originales conservados. No modifica bancos de preguntas/tarjetas ni el criterio de reutilización de los HTML de programación lineal y bloques estadísticos.

## Entrega 68 · Gauss paso a paso

- Fuente: `../../Planificacion_Interactiva_2Bach_CC_Sociales/01_Laboratorios_Minijuegos_2Bach_CC_Sociales.md`, laboratorio 5B: elegir operaciones de filas y validar equivalencia y resultado, aceptando rutas distintas.
- Refuerzos: guion 5.5, 5.6, 5.8 y 5.10; T5.3–T5.5; tarjetas 7–12, 15 y 17–19.
- Implementación propia: `../widgets/games/t05-b-gauss-paso-a-paso/`, modelo puro de sesión separado de presentación. Reutiliza operaciones reversibles, fracciones, notación y resolución exacta del libro; no cambia esos modelos compartidos.
- Genera seis familias acotadas y conserva su orden didáctico: eliminación, pivote cero, variable libre, contradicción, orden 3 y homogéneo. Datos y signos varían; puede haber repeticiones.
- Evalúa una forma escalonada estructural, sin imponer pivotes unitarios ni secuencia concreta. Las operaciones admitidas conservan automáticamente el conjunto solución.
- La puntuación corresponde a la clasificación final tras escalonar: 100/50/0 según intentos; la ruta resuelta activa 0 puntos aunque se reinicie. Las pistas son gratuitas.
- Se registra el número de operaciones; no se añade el bonus opcional por mínimo número de pasos. No se presume optimalidad de la ruta resuelta.
- La asistencia vuelve al inicio y muestra una ruta posible completa. Las pistas sugeridas respetan límites de factor; si una ruta manual produce factores fuera de la ayuda simple, se propone deshacer, reiniciar o ver asistencia.
- Estado en memoria, preferencias compartidas y originales conservados. No modifica bancos de estudio ni el criterio de reutilizar los HTML iniciales de programación lineal y bloques estadísticos.


## Entrega 69 · Elige el método

- Fuente principal: `../../Planificacion_Interactiva_2Bach_CC_Sociales/01_Laboratorios_Minijuegos_2Bach_CC_Sociales.md`, laboratorio 5C: elegir una estrategia razonable y explicar eficiencia; ejemplos 2 × 2, 4 × 4 e inversa dada.
- Refuerzo conceptual: guion 5.6–5.11 y las lecciones ya desarrolladas de Rouché–Frobenius, inversa, Gauss, Cramer, homogéneos y parámetros.
- Elaboración propia en `../widgets/games/t05-c-elige-el-metodo/`: seis familias acotadas, generador y sesión puros en model.js, interfaz en widget.js y estilo neutro separado.
- Tres situaciones admiten dos estrategias ofrecidas; ambas reciben la misma puntuación. Las otras piden reconocer condiciones incumplidas o separar un valor crítico. No se afirma que las opciones cubran todos los métodos posibles.
- Los coeficientes parten de enteros entre −3 y 3; se construyen determinantes, términos independientes y soluciones coherentes. El caso con parámetro contiene ramas SCI o SI en el valor crítico según la variante.
- Puntuación 100/50/0, máximo 600; pistas gratuitas, sin reloj ni persistencia de respuestas. La sesión evalúa decisiones, no escritura manual de cálculos.
- Servicio LaTeX local, preferencias e inserción compartidos, sin modificaciones. Diseño y originales conservados. Sin nuevas preguntas base, tarjetas ni compilación de PDF.
- Se conserva el criterio de reutilizar los HTML originales para programación lineal y bloques estadísticos; lo que falte se señalará sin rellenarlo automáticamente.


## Entrega 70 · Recorrido de sistemas

- Organización pedagógica propia a partir de las once lecciones existentes, los laboratorios 5A–5C y la auditoría del tema 5.
- Ruta de clasificación tras 5.2–5.6, con apoyo de Gauss para leer matrices escalonadas; operaciones tras 5.5 y 5.8; elección de estrategias tras 5.7–5.11.
- Refuerzos concretos: rectas, rangos, equivalencia, variables libres, condiciones de inversa/Cramer, sistemas homogéneos y valores críticos.
- Índice del tema, lecciones 5.6/5.8/5.11, tres anfitriones y enlaces de retorno desde los widgets. Navegación normal mediante enlaces relativos compatible con subcarpetas.
- Sin nuevos contenidos matemáticos ni bancos, sin cambios en generadores, corrección, puntuación, servicio LaTeX o estilos. No se suman los puntos de juegos distintos como nota.
- Se conservan originales y fuentes. La fase siguiente reutilizará los HTML de programación lineal conforme al [criterio del usuario](criterio-reutilizacion-html-estadistica-pl-inferencia.md), dejando vacíos o documentados los contenidos que falten.


## Entrega 71 · Presentación e inecuaciones originales

- Fuentes leídas completas: [Presentación](<../../Página web existente/1. Programación Lineal/0. Presentación.txt>) e [Inecuaciones](<../../Página web existente/1. Programación Lineal/1. Inecuaciones.txt>). Presentación e Inicio son idénticos.
- Reutilización del itinerario, definición, ejemplo x+2y≤10, comparación de fronteras y tres pasos de representación. Correcciones y destinos detallados en la [auditoría por archivo y bloque](auditoria-reutilizacion-programacion-lineal.md).
- Se precisan las hipótesis de recta y la elección del punto de prueba. Se corrige la geometría del SVG original conservando la misma inecuación.
- Cabecera/pie comunes y MathJax local; estilos editoriales provisionales. Sin copiar scripts del pie remoto, fechas antiguas ni fuentes web.
- 6.1 se mantiene parcial. Las actividades ausentes no se inventan; preguntas, tarjetas y juegos no aumentan.
- Fuentes intactas por SHA-256. [Verificación](verificacion-entrega-71.md).


## Entrega 72 · Sistemas de inecuaciones originales

- Fuente leída íntegra: [2. Sistemas de inecuaciones.txt](<../../Página web existente/1. Programación Lineal/2. Sistemas de inecuaciones.txt>).
- Se conserva el sistema x+y≤60, x≤40, x≥0, y≥0, sus dos sombreados parciales, intersección, vértices y tipos de región.
- Correcciones justificadas: escala del gráfico, borde continuo, factibilidad de los cruces e hipótesis de existencia de extremos; se evita afirmar que todo sistema tiene un óptimo o que es único.
- La comprobación desplegable explica el ejemplo original y no añade preguntas al banco ni otro problema.
- Sin cuestionario, mazo o explorador inventado. 6.2 queda parcial y las carencias se registran en la [auditoría](auditoria-reutilizacion-programacion-lineal.md).
- Fuentes preservadas por SHA-256; estilo provisional, cabecera/pie y fórmulas locales conservados. [Verificación](verificacion-entrega-72.md).


## Entrega 73 · Anatomía de programación lineal original

- Fuente leída íntegra: [3. Programación Lineal.txt](<../../Página web existente/1. Programación Lineal/3. Programación Lineal.txt>).
- Conservados variables (sillas/mesas), Z=ax+by, esquema de restricciones, diagrama y ejemplos de no negatividad.
- Corrección de M10: no añadir no negatividad de manera universal; justificarla según las variables. Se precisan significado de coeficientes, linealidad y abreviatura s.a.
- No se inventa un problema completo ni se completan los puntos suspensivos con datos nuevos. No se añaden preguntas, tarjetas o juegos.
- Estado parcial y carencias en la [auditoría](auditoria-reutilizacion-programacion-lineal.md). Original intacto por SHA-256; motor LaTeX y estilos comunes conservados.
- [Verificación](verificacion-entrega-73.md): nueva página y regresiones de 6.1–6.2.

## Entrega 74 · Método gráfico (12 de octubre de 2026)

Fuente íntegra: [4. El método gráfico.txt](<../../Página web existente/1. Programación Lineal/4. El método gráfico.txt>). Destino: [6.4. Solución de un problema de programación lineal](../libro/temas/06-programacion-lineal/04-solucion-de-un-problema-de-programacion-lineal.html).

Se conservan el principio de vértices, cinco pasos, enunciado de sillas/mesas, recursos y dos objetivos (30/50 y 40/50 €). Se corrigen región, tablas y conclusión: el sistema admite el triángulo (0,0), (9,0), (0,9), con máximo único de 450 € en (0,9) para ambos objetivos. El punto (3,12) incumple la restricción de corte. La variante de 40 € queda separada del enunciado inicial.

Original intacto por SHA-256: `455c45b45dea0bd4641009e6af0d179d92eb41d741a1ce5708052ba7d248709c`. No se inventan tests, tarjetas ni exploradores. [Correspondencia, justificación y carencias](auditoria-reutilizacion-programacion-lineal.md). [Verificación](verificacion-entrega-74.md).

## Entrega 75 · Problemas de programación lineal

Fuente completa: [5. Ejercicios Resueltos.txt](<../../Página web existente/1. Programación Lineal/5. Ejercicios Resueltos.txt>); destino: [6.5](../libro/temas/06-programacion-lineal/05-problemas-de-programacion-lineal.html). Se conservan seis ejercicios, 23 pasos, datos, selector y laboratorio GeoGebra libre. Las seis soluciones finales se mantienen.

Correcciones: escapes de desigualdades, precisión de D en drones, prueba de redundancia, señalización del mínimo en minerales, no negatividad y geometría de refinería. Conclusiones en texto semántico; fórmulas en LaTeX compartido. [Correspondencia y justificación](auditoria-reutilizacion-programacion-lineal.md).

SHA-256 original: `cf12fac3410b388d7a9588987dead55b0237a5d8b41865a9975c2a98a6efb24d`. Original intacto. Sin preguntas o actividades inventadas para cubrir cuotas. [Verificación](verificacion-entrega-75.md).

## Entrega 76 · Flashcards de programación lineal

Fuente completa: [6. Flashcards.txt](<../../Página web existente/1. Programación Lineal/6. Flashcards.txt>); destino: [19 tarjetas del tema 6](../tarjetas/index.html?tema=t06), registradas en [su banco](../content/activities/linear-programming-cards.js).

Correspondencia uno a uno por sourceIndex, con las cinco categorías de la fuente. Se corrigen respuestas sobre doble/igualdad, unidades, no negatividad, región factible, punto de prueba, hipótesis de extremos, paralelismo e integridad. No se añaden preguntas o tarjetas nuevas. [Tabla de correspondencia y justificación](auditoria-reutilizacion-programacion-lineal.md).

Original intacto: SHA-256 `58ae420a2140ec783ba86c07793a14ff187b23eef6d996581f98348cb2b5d87a`. Total: 320 tarjetas; preguntas y juegos sin cambios. [Verificación](verificacion-entrega-76.md).

## Entrega 77 · Presentación de estadística bidimensional

Fuente íntegra: [0. Presentación.txt](<../../Página web existente/2. Estadística Bidimensional/0. Presentación.txt>); destino: [apoyo de estadística bidimensional](../libro/apoyos/estadistica-bidimensional.html).

Se conservan el repaso de tres medidas, los dos esquemas con sus puntos/centros, el par ordenado y las doce frecuencias de la tabla, sus marginales y N=43. Se precisa Aprobado como categoría 5–6 y el total como grupo observado. Los recuentos 30/32/27 explican la distinción entre categoría y superar asignaturas, sin crear otro problema.

SHA-256: `7d6818dc9467b37270ccda847eda6c8dc524f1d090ddb4e234725b3f746d4e60`; original intacto. [Correspondencias y carencias](auditoria-reutilizacion-estadistica-bidimensional.md) · [Verificación](verificacion-entrega-77.md).

## Entrega 78 · Variable bidimensional y marginales

Fuente íntegra: [1. La variable bidimensional.txt](<../../Página web existente/2. Estadística Bidimensional/1. La variable bidimensional.txt>); destino: [organización de datos](../libro/apoyos/estadistica-bidimensional.html#organizacion) y [familias y marginales](../libro/apoyos/estadistica-bidimensional.html#familias).

Se conservan cinco pares, nueve frecuencias conjuntas de 50 familias, ambos marginales y sus medias (2 hijos y 1,22 días por semana). Se concilia la definición existente y se precisa que N<20 es orientativo. Se omiten miniatura de celdas y flecha ornamentales sin datos. No se añaden actividades ajenas a la fuente.

SHA-256: `1242fb2bade4d2f2ac2dab5b9a13e8b9fbfb8a9e92b87f496614688de2bf22a8`, original intacto. [Correspondencias](auditoria-reutilizacion-estadistica-bidimensional.md) · [Verificación](verificacion-entrega-78.md).

## Entrega 79 · Diagramas de dispersión

Fuente íntegra: [2. La nube de puntos.txt](<../../Página web existente/2. Estadística Bidimensional/2. La nube de puntos.txt>).
Destino: [nube de puntos y centro](../libro/apoyos/estadistica-bidimensional.html#nube).
SHA-256: `816d95d026460386678994fe697880ed854cb97c5eadc26455d440c1a924c297`.

Cuatro tipos de nube y centro de gravedad reutilizados con todos sus puntos. Guía de dependencia funcional corregida para atravesar los siete puntos; precisiones sobre tendencias, incorrelación, causalidad y signos de desviaciones. [Correspondencia y razones](auditoria-reutilizacion-estadistica-bidimensional.md). Sin bancos nuevos.

## Entrega 80 · La covarianza

Fuente: [3. La covarianza.txt](<../../Página web existente/2. Estadística Bidimensional/3. La covarianza.txt>).
Destino: [covarianza, signos e interpretación](../libro/apoyos/estadistica-bidimensional.html#covarianza).
SHA-256: `8e2bd30f30ef99f7b56718b0869c2852d9316718fb7c34988cd861c5d5727060`.

Definición y fórmula rápida conservadas; definición verbal formalizada. Signos por desviaciones respecto a medias, interpretación de cero y dependencia de unidades precisadas. Error 0,15→1500 corregido a 0,15→15 si solo una variable se multiplica por 100. [Correspondencia completa](auditoria-reutilizacion-estadistica-bidimensional.md). No hay nuevo banco de ejercicios.

## Entrega 81 · Pearson

Fuente: [4. Coeficiente de correlación de Pearson.txt](<../../Página web existente/2. Estadística Bidimensional/4. Coeficiente de correlación de Pearson.txt>).
Destino: [Pearson e interpretación](../libro/apoyos/estadistica-bidimensional.html#pearson).
SHA-256: `32a067a690bdf962ecc4c334f7c6b056b0b2eff0310115ac3c7797ffa34dba3c`.

Fórmula, intervalo, normalización, escala y valores -0,95/0,12/0,85 conservados. Se precisan variables no constantes, intensidad lineal y límites de inferencias. Helados/tiburones se conserva como ejemplo hipotético, sin atribuir como hecho el coeficiente no documentado. [Correspondencia y carencias](auditoria-reutilizacion-estadistica-bidimensional.md).

## Entrega 82 · Regresión lineal

Fuente: [5. Regresión lineal.txt](<../../Página web existente/2. Estadística Bidimensional/5. Regresión lineal.txt>).
Destino: [regresión, predicción y determinación](../libro/apoyos/estadistica-bidimensional.html#regresion).
SHA-256: `b872ad7f7e613b39a512e10d29e1999b83f3cd1d467b59f0b844139584ecab7f`.

Cuatro puntos SVG conservados; ajuste, centro y residuos corregidos. Ecuación y cálculo 7→7,6 conservados. Laboratorio original confirmado como ejemplo estático. R²=0,7225 se interpreta como proporción de variación, no fiabilidad de una predicción. [Auditoría completa](auditoria-reutilizacion-estadistica-bidimensional.md).

## Entrega 83 · Ejercicios de estadística bidimensional

Fuente: [6. Ejercicios resueltos.txt](<../../Página web existente/2. Estadística Bidimensional/6. Ejercicios resueltos.txt>).
Destino: [nueve ejercicios y 32 pasos](../libro/apoyos/estadistica-bidimensional.html#ejercicios).
SHA-256: `63e41c51a6936bb2dab6efc44957627af0bcdea0865f8307b52ff7ab7007fa3c`.

Tablas, pares y parámetros originales conservados. Ejercicio 2 corregido a Σxy=216, covarianza 3,52 y r≈0,889; índices, redondeo e interpretación revisados. [Correspondencia por ejercicio y límites](auditoria-reutilizacion-estadistica-bidimensional.md).


## Entrega 84 · Flashcards de estadística bidimensional

Fuente completa: [7. Flashcards.txt](<../../Página web existente/2. Estadística Bidimensional/7. Flashcards.txt>).
Destino: [20 tarjetas originales revisadas](../tarjetas/index.html?tema=bivariate), en [banco independiente](../content/activities/bivariate-cards.js), enlazadas desde el [apoyo](../libro/apoyos/estadistica-bidimensional.html#tarjetas).
Se conservan cantidad, orden, categorías 4/5/5/6 y correspondencia por índice. Las respuestas se corrigen sin ampliar el mazo: covarianza pequeña, requisitos de Pearson, residuos con signo, significado y condiciones de R² y orientación de coeficientes.

Original intacto: SHA-256 `334150ec27c53e9143dba3f4fcc2bfeebfb7ede2d6537578c87a2721048f2a73`.
Total actual: 340 tarjetas, 318 preguntas y dieciséis juegos. Ocho fuentes del apoyo integradas; estado parcial por carencias documentadas.
[Correspondencia uno a uno](auditoria-reutilizacion-estadistica-bidimensional.md) · [Verificación](verificacion-entrega-84.md).


## Entrega 85 · Presentación de Distribuciones

Fuente completa: [0. Presentación.txt](<../../Página web existente/4. Distribuciones/0. Presentación.txt>).
Destino: [índice del tema 8](../libro/temas/08-distribuciones-de-probabilidad/index.html). Cinco bloques y cinco objetivos conservados; numeración 4→8 y navegación local. Revisados Bernoulli, discreta/continua, notación N(μ,σ) y condiciones de aproximación.

Original intacto: SHA-256 `5da921d5cc8d2a7bcf56ab4606d9e68a562a3965e3e4fd746b24fc7d203a3ea7`.
Índice parcial; cuatro lecciones y seis originales pendientes. Sin nuevas preguntas, tarjetas ni juegos.
[Correspondencias y límites](auditoria-reutilizacion-distribuciones.md) · [Verificación](verificacion-entrega-85.md).


## Entrega 86 · Variable aleatoria

Fuente: [1. Variable aleatoria.txt](<../../Página web existente/4. Distribuciones/1. Variable aleatoria.txt>).
Destino: [8.1. Variable aleatoria](../libro/temas/08-distribuciones-de-probabilidad/01-variable-aleatoria.html).
Definición, condiciones de probabilidad, tres parámetros y el dado conservados. Separa resultados/valores/distribución, corrige la comparación con descriptiva y evita redondear la varianza antes del final.

Fuente intacta: SHA-256 `a3f1e744d9f2308155e0c3eebcd0f049e14135973737730fa4f3302bb4eec8c2`.
Lección parcial; 58 desarrolladas y seis parciales en el curso. Bancos sin cambios.
[Correspondencia y límites](auditoria-reutilizacion-distribuciones.md) · [Verificación](verificacion-entrega-86.md).


## Entrega 87 · Distribución binomial

Fuente: [2. Distribución Binomial.txt](<../../Página web existente/4. Distribuciones/2. Distribución Binomial.txt>).
Destino: [8.2. Distribución binomial](../libro/temas/08-distribuciones-de-probabilidad/02-distribucion-binomial.html).
Cuatro condiciones, función de probabilidad, parámetros y dos ejemplos conservados. Se precisan recuento, soporte, extremos, factores y supuestos; se mantiene el laboratorio como ejemplos desplegables, tal como permite el original.

Original intacto: SHA-256 `410aed552dd9b8ff62a3086ec5235f17daef4e0af3ca874ab542a54b0e53ed23`.
Resultados conservados: 20,48 % en baloncesto; media 20 y desviación ≈4,43 en calidad. Lección parcial, sin ampliar bancos.
[Auditoría](auditoria-reutilizacion-distribuciones.md) · [Verificación](verificacion-entrega-87.md).


## Entrega 88 · Distribución normal

Fuente: [3. Distribución Normal.txt](<../../Página web existente/4. Distribuciones/3. Distribución Normal.txt>).
Destino: [8.3. Distribución normal](../libro/temas/08-distribuciones-de-probabilidad/03-distribucion-normal.html).
Teoría, tipificación, regla empírica, cinco controles y cuatro gráficos conservados. Se corrigen significado de probabilidad puntual, notación, escalas, recorte de valores y banda sombreada de la acumulada.

Original intacto: SHA-256 `0ca90f4cdd30b81ffcf053cfd31e21ad4904bde9c656f48acb225e00afa8d1f0`.
Modelo numérico separado de la interfaz; coeficientes erf originales conservados con cálculo estable de colas. Servicio local compartido para LaTeX y cambios agrupados. Sin nuevos bancos ni persistencia de parámetros.
[Auditoría](auditoria-reutilizacion-distribuciones.md) · [Verificación](verificacion-entrega-88.md).

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

## Entrega 92 · Presentación de Inferencia

Fuente: Página web existente/5. Inferencia Estadística/0. Presentación.txt (SHA-256 2e61d377d29827b2e92c94e1ae4609fcfdeca28720e8db74db99e0131c08e75e). Adaptación: libro/temas/09-inferencia-estadistica/index.html. Integrados población/muestra, cuatro técnicas y ficha didáctica; corregidos sentido de la inferencia y supuestos del margen de error. No se incorporan bancos. Véase docs/auditoria-reutilizacion-inferencia.md.

## Entrega 93 · Distribuciones muestrales

Fuente: Página web existente/5. Inferencia Estadística/1. Distribuciones muestrales.txt (SHA-256 019af2bc0e8f7f5f388715c2bba19df312bf437c8d2ee7f3f092506b5b387b8c). Destino: libro/temas/09-inferencia-estadistica/04-distribucion-muestral-teorema-central-del-limite.html. Contenidos de medias, proporciones, sumas y tabla conservados con supuestos y aproximación normal precisados. Estado parcial. Véase docs/auditoria-reutilizacion-inferencia.md.

## Entrega 94 · Estimación

Fuente: Página web existente/5. Inferencia Estadística/2. Estimación.txt (SHA-256 07f961b5d205d738ce1465a5ac25a04f1b0ade3dcf3d08ccac56034e58ac02b4). Destino: libro/temas/09-inferencia-estadistica/05-estimacion-puntual-y-estimacion-por-intervalos.html. Se conservan distinción de intervalos, figura, tabla 90/95/99 % y fórmula de media. Valor 99 % corregido a 2,576; cobertura y supuestos precisados. Estado parcial. Véase docs/auditoria-reutilizacion-inferencia.md.

## Entrega 95 · Media muestral y aventura

Fuente: Página web existente/5. Inferencia Estadística/2.1. Distribución de la media muestral.txt (SHA-256 e01d6766bffd2645c5817aa16722218870e330f8263ecc987c08aff4b224295e). Destino: libro/temas/09-inferencia-estadistica/04-distribucion-muestral-teorema-central-del-limite.html. Conservados el ejemplo del café y las tres preguntas de «Operación Bombilla». Se calculan probabilidades sin redondeo previo y se distingue normalidad exacta de aproximación; la conclusión sobre enviar el lote se sustituye por una interpretación limitada a la probabilidad del modelo. El componente autocorregible no guarda respuestas. Véase docs/auditoria-reutilizacion-inferencia.md.

## Entrega 96 · Proporción muestral y aventura

Fuente: Página web existente/5. Inferencia Estadística/2.2. Distribución de la proporción muestral.txt (SHA-256 fb5a079092df86f284b0ec31e61b1793695089919cd6dde66d7fff9c67b32ac3). Destino: libro/temas/09-inferencia-estadistica/04-distribucion-muestral-teorema-central-del-limite.html. Conservados el ejemplo del comercio y las tres decisiones de «Lanzamiento Premium». Se precisan independencia, discretización, condiciones de la normal y límites de la interpretación comercial. Los resultados normales se comparan con la probabilidad binomial exacta. Véase docs/auditoria-reutilizacion-inferencia.md.

## Entrega 97 · Error y tamaño muestral

Fuente: Página web existente/5. Inferencia Estadística/3. Error y tamaño muestral.txt (SHA-256 214e94920068be91a48f175564dc3a3973d1dbbb3ca116cfe5b12de864f1469a). Destino: libro/temas/09-inferencia-estadistica/08-tamano-de-la-muestra-error-cometido.html. Conservados margen, despeje del tamaño, figura, ejemplo simbólico de redondeo y relaciones entre precisión, confianza y tamaño. Se corrige la interpretación del margen como garantía absoluta y se explicitan los supuestos. La calculadora usa valores que introduce quien estudia y no conserva sus respuestas. Véase docs/auditoria-reutilizacion-inferencia.md.

## Entrega 98 · Ejercicios resueltos de Inferencia

Fuente: Página web existente/5. Inferencia Estadística/4. Ejercicios resueltos.txt (SHA-256 223af63b58a08064f4176cc90db6ab236af324fb271dd55b9afcbb71af89f067). Destino: libro/temas/09-inferencia-estadistica/ejercicios-resueltos.html. Integrados los 27 registros originales en el mismo orden, con identificadores conservados y resoluciones revisadas. El archivo original permanece intacto; scripts/build-inference-exercises.py regenera la página y comprueba el hash antes de hacerlo. Se reformulan los enunciados 9 y 19 para precisar centro de proporción y margen calculado. Véase docs/auditoria-reutilizacion-inferencia.md.

## Entrega 99 · Flashcards de Inferencia

Fuente: [5. Flashcards.txt](<../../Página web existente/5. Inferencia Estadística/5. Flashcards.txt>) (SHA-256 `af1fb16725425a5807fb838002a54821e28bad8843aee42de6d206365125b246`). Destino: [30 tarjetas originales revisadas](../tarjetas/index.html?tema=t09) en [banco independiente](../content/activities/inference-cards.js), enlazadas desde el índice del tema 9. Orden, preguntas y ocho categorías corresponden uno a uno mediante `sourceIndex`; las respuestas se precisan según la [auditoría](auditoria-reutilizacion-inferencia.md). MathJax, cabecera y pie son locales y compartidos; no se importa el pie remoto del original ni se persiste actividad. Total: 389 tarjetas, 318 preguntas base y dieciséis juegos. Ocho de once fuentes de Inferencia integradas; tres pendientes.

## Entrega 100 · Técnicas de muestreo

Fuente: [6. Tipos de muestreo.txt](<../../Página web existente/5. Inferencia Estadística/6. Tipos de muestreo.txt>) (SHA-256 `ec539ccf8d74d7e1a826119ea19b588e4ad1c5bdc4618753a0f0f90c111ae443`). Destino: [9.3. Técnicas de muestreo](../libro/temas/09-inferencia-estadistica/03-tecnicas-de-muestreo.html). Se conservan cuatro métodos probabilísticos y cuatro no probabilísticos, la urna, la selección sistemática 8–958, los ejemplos de conveniencia y juicio, las cuotas 35/38/27 y la cadena de referidos. Se precisan las afirmaciones universales sobre extrapolación, costes y error muestral. No se importa MathJax remoto ni se inventa test o simulador. Nueve de once fuentes integradas; dos pendientes. Véanse [auditoría](auditoria-reutilizacion-inferencia.md) y [verificación](verificacion-entrega-100.md).

## Entrega 101 · Tipo test de Inferencia

Fuente: [7. Tipo test.txt](<../../Página web existente/5. Inferencia Estadística/7. Tipo test.txt>) (SHA-256 `24f01ad2e6cd85f317f791ca963cd49ae69f2350a706025a8b4f00da25fbba21`). Destino: [20 preguntas originales revisadas](../test/index.html?tema=t09) en [banco independiente](../content/activities/inference-test.js), reproducible mediante [generador con hash](../scripts/build-inference-test.mjs). Se conservan situaciones, orden, cuatro opciones y respuesta prevista; se revisan las formulaciones y explicaciones señaladas en la [auditoría](auditoria-reutilizacion-inferencia.md). Total: 338 preguntas base, 389 tarjetas y dieciséis juegos. Diez de once fuentes de Inferencia integradas; falta intervalos de confianza. [Verificación](verificacion-entrega-101.md).

## Entrega 102 · Intervalos de confianza

Fuente: [8. Intervalos de confianza.txt](<../../Página web existente/5. Inferencia Estadística/8. Intervalos de confianza.txt>) (SHA-256 `d916f6fd7c3b455c38d5752158748af848af4b7b470a2c2989ae9a6b88c7c737`). Destino: [9.7. Intervalos de confianza](../libro/temas/09-inferencia-estadistica/07-intervalos-de-confianza.html) con [modelo numérico](../content/models/confidence-interval.js) y [controlador del laboratorio](../assets/js/learning/confidence-interval-lab.js). Se conservan la analogía, fórmula, cuatro controles y tres exploraciones, precisando supuestos y cobertura. El cuantil 99 % se calcula sin truncar. Los once originales de Inferencia están revisados; el tema sigue parcial por los huecos documentados. [Auditoría](auditoria-reutilizacion-inferencia.md) · [Verificación](verificacion-entrega-102.md).

## Entrega 103 · Fundamentos de estadística inferencial

Fuente reutilizada: [0. Presentación.txt](<../../Página web existente/5. Inferencia Estadística/0. Presentación.txt>) (SHA-256 `2e61d377d29827b2e92c94e1ae4609fcfdeca28720e8db74db99e0131c08e75e`), ya integrada en la portada del tema. Destino adicional: [9.1. Estadística inferencial](../libro/temas/09-inferencia-estadistica/01-estadistica-inferencial.html). La lección ordena población/muestra, parámetro/estadístico, selección/inferencia y límites de la ficha didáctica de 2.500 entrevistas. No atribuye a esa ficha resultados de encuesta que la fuente no proporciona; no añade preguntas ni tarjetas. El número de archivos originales integrados permanece en once. [Auditoría](auditoria-reutilizacion-inferencia.md) · [Verificación](verificacion-entrega-103.md).

## Entrega 104 · Muestreo en 9.2

Fuentes reutilizadas: [0. Presentación.txt](<../../Página web existente/5. Inferencia Estadística/0. Presentación.txt>) (SHA-256 2e61d377d29827b2e92c94e1ae4609fcfdeca28720e8db74db99e0131c08e75e), [6. Tipos de muestreo.txt](<../../Página web existente/5. Inferencia Estadística/6. Tipos de muestreo.txt>) (SHA-256 ec539ccf8d74d7e1a826119ea19b588e4ad1c5bdc4618753a0f0f90c111ae443) y [7. Tipo test.txt](<../../Página web existente/5. Inferencia Estadística/7. Tipo test.txt>) (SHA-256 24f01ad2e6cd85f317f791ca963cd49ae69f2350a706025a8b4f00da25fbba21). Destino: [9.2. Muestreo](../libro/temas/09-inferencia-estadistica/02-muestreo.html). Se organiza el proceso de población, marco, selección y observación, se enlaza el catálogo de 9.3 y se leen los límites de la ficha didáctica. El test solo aporta la idea de neutralidad de preguntas; no se duplican ítems. Sin nuevas fuentes ni resultados de encuesta inventados. Estado parcial. [Auditoría](auditoria-reutilizacion-inferencia.md) · [Verificación](verificacion-entrega-104.md).


## Entrega 105 · Intervalos característicos en 9.6

Fuentes: [guion del temario](<../../Temario completo/Guion_Temario_Matematicas_CC_Sociales_II_2Bach.md>) (SHA-256 445be4c4aef0014184d2521b336913ee5360426527afe76b0d7af2ca165025f4), [2. Estimación.txt](<../../Página web existente/5. Inferencia Estadística/2. Estimación.txt>) (SHA-256 07f961b5d205d738ce1465a5ac25a04f1b0ade3dcf3d08ccac56034e58ac02b4) y [4. Ejercicios resueltos.txt](<../../Página web existente/5. Inferencia Estadística/4. Ejercicios resueltos.txt>), previamente revisado en la entrega 98. Destino: [9.6](../libro/temas/09-inferencia-estadistica/06-intervalos-de-probabilidad-o-intervalos-caracteristicos.html). Del ejercicio de estaturas se reutilizan 172 cm, 9 cm y n=36; el intervalo central del 95 % es una derivación didáctica nueva, diferenciada del [169;175] del original. Sin nuevas preguntas ni tarjetas. [Auditoría](auditoria-reutilizacion-inferencia.md) · [Verificación](verificacion-entrega-105.md).


## Entrega 106 · Ficha técnica en 9.9

Fuente reutilizada: [0. Presentación.txt](<../../Página web existente/5. Inferencia Estadística/0. Presentación.txt>) (SHA-256 2e61d377d29827b2e92c94e1ae4609fcfdeca28720e8db74db99e0131c08e75e). Criterios: [guion del temario](<../../Temario completo/Guion_Temario_Matematicas_CC_Sociales_II_2Bach.md>) (SHA-256 445be4c4aef0014184d2521b336913ee5360426527afe76b0d7af2ca165025f4). Destino: [9.9. Ficha técnica de encuestas](../libro/temas/09-inferencia-estadistica/09-ficha-tecnica-de-encuestas.html). Se reutilizan los cinco campos del ejemplo y se documenta qué falta para verificar selección, respuesta y margen. No hay encuesta observada ni resultado porcentual, por lo que no se calculan límites de una estimación concreta. Estado parcial. [Auditoría](auditoria-reutilizacion-inferencia.md) · [Verificación](verificacion-entrega-106.md).


## Entrega 109 · Probabilidad: portada y 7.1

Fuentes originales intactas: [0. Presentación.txt](<../../Página web existente/3. Probabilidad/0. Presentación.txt>) (SHA-256 4933267d3cc9cfbcfdaaed40272006985fd82b8f3dac3b98331384da090a2659), [1. Introducción a la probabilidad.txt](<../../Página web existente/3. Probabilidad/1. Introducción a la probabilidad.txt>) (SHA-256 7805666e16e1f0b602632fa8d6dd2a8480f4453ff00a7b4b397e104166120d96) y [2. Tipos de probabilidad.txt](<../../Página web existente/3. Probabilidad/2. Tipos de probabilidad.txt>) (SHA-256 ba5abc4e5c9086450b3c7441fdd80420b7b3454647c723117d27bf8142cb2454). Destinos: [portada del tema 7](../libro/temas/07-probabilidad/index.html) y [7.1](../libro/temas/07-probabilidad/01-sucesos-regla-de-laplace.html). Se adapta la introducción y la condición de equiprobabilidad de Laplace; dados y baraja conservan resultados. Unión y frecuencia se reservan para epígrafes posteriores. [Auditoría](auditoria-reutilizacion-probabilidad.md) · [Verificación](verificacion-entrega-109.md).


## Entrega 110 · Álgebra de sucesos en 7.2

Fuentes reutilizadas: [1. Introducción a la probabilidad.txt](<../../Página web existente/3. Probabilidad/1. Introducción a la probabilidad.txt>) (SHA-256 7805666e16e1f0b602632fa8d6dd2a8480f4453ff00a7b4b397e104166120d96) y [2. Tipos de probabilidad.txt](<../../Página web existente/3. Probabilidad/2. Tipos de probabilidad.txt>) (SHA-256 ba5abc4e5c9086450b3c7441fdd80420b7b3454647c723117d27bf8142cb2454). Destino: [7.2](../libro/temas/07-probabilidad/02-algebra-de-sucesos.html). Cuatro operaciones y ejercicio de 13/40 conservados. Diagrama del dado, traducciones y De Morgan organizados como desarrollo didáctico desde el guion. Sin nuevas preguntas ni tarjetas. [Auditoría](auditoria-reutilizacion-probabilidad.md) · [Verificación](verificacion-entrega-110.md).


## Entrega 111 · Tablas de contingencia en 7.3

Fuente intacta: [4. Tablas de contingencia y diagramas de árboles.txt](<../../Página web existente/3. Probabilidad/4. Tablas de contingencia y diagramas de árboles.txt>) (SHA-256 `b014c0d54663b92251debe0accd1b423c4249c78d92db368d1c1a5597fdb14b8`). Destino: [7.3](../libro/temas/07-probabilidad/03-tablas-de-contingencia.html). Se conservan la tabla general, las cifras del ejemplo y P(A|B)=0,70; se añade la lectura de frecuencias y la comparación con P(B|A). El ejemplo sigue siendo hipotético: no se inventa tamaño de muestra. Sin nuevas preguntas ni tarjetas. [Auditoría](auditoria-reutilizacion-probabilidad.md) · [Verificación](verificacion-entrega-111.md).

## Entrega 112 · Frecuencias en 7.4

Fuente reutilizada e intacta: [2. Tipos de probabilidad.txt](<../../Página web existente/3. Probabilidad/2. Tipos de probabilidad.txt>) (SHA-256 `ba5abc4e5c9086450b3c7441fdd80420b7b3454647c723117d27bf8142cb2454`). El [guion](<../../Temario completo/Guion_Temario_Matematicas_CC_Sociales_II_2Bach.md>) aporta el alcance de frecuencia acumulada. Destino: [7.4](../libro/temas/07-probabilidad/04-frecuencias.html). Se conservan los ejemplos 850/10 000 y 24/200, sin convertirlos en resultados de una encuesta real. No se añaden preguntas ni tarjetas. [Auditoría](auditoria-reutilizacion-probabilidad.md) · [Verificación](verificacion-entrega-112.md).

## Entrega 113 · Axiomática de Kolmogórov en 7.5

Fuente intacta: [3. Axiomática de Kolmogorov.txt](<../../Página web existente/3. Probabilidad/3. Axiomática de Kolmogorov.txt>) (SHA-256 `ea186d2415662bd9fcc2ee8841f75f3c15625aa4edbc69a97d6e7f2bf3ac6e04`). Destino: [7.5](../libro/temas/07-probabilidad/05-axiomatica-de-kolmogorov.html). Se conservan los axiomas y el ejemplo del dado; se distingue el axioma numerable de su uso finito y se deduce P(∅)=0. Las propiedades restantes se reservan para 7.6. No se añaden preguntas ni tarjetas. [Auditoría](auditoria-reutilizacion-probabilidad.md) · [Verificación](verificacion-entrega-113.md).

## Entrega 114 · Propiedades de la probabilidad en 7.6

Fuente intacta: [3. Axiomática de Kolmogorov.txt](<../../Página web existente/3. Probabilidad/3. Axiomática de Kolmogorov.txt>) (SHA-256 `ea186d2415662bd9fcc2ee8841f75f3c15625aa4edbc69a97d6e7f2bf3ac6e04`). Destino: [7.6](../libro/temas/07-probabilidad/06-propiedades-de-la-probabilidad.html). Propiedades y ejemplos «al menos un seis» y «rey o copas» conservados; la justificación de monotonía responde al guion. Sin nuevas preguntas ni tarjetas. [Auditoría](auditoria-reutilizacion-probabilidad.md) · [Verificación](verificacion-entrega-114.md).

## Entrega 115 · Experimentos compuestos en 7.7

Fuente intacta: [4. Tablas de contingencia y diagramas de árboles.txt](<../../Página web existente/3. Probabilidad/4. Tablas de contingencia y diagramas de árboles.txt>) (SHA-256 `b014c0d54663b92251debe0accd1b423c4249c78d92db368d1c1a5597fdb14b8`). Destino: [7.7](../libro/temas/07-probabilidad/07-experimentos-compuestos.html). Se conservan los cuatro caminos del ejemplo de incendios y el resultado 0,64; la urna es ampliación didáctica para cumplir el guion. El ejemplo de fallos de fábrica requiere corrección antes de integrarse. Sin nuevas preguntas ni tarjetas. [Auditoría](auditoria-reutilizacion-probabilidad.md) · [Verificación](verificacion-entrega-115.md).

## Entrega 116 · Probabilidad condicionada en 7.8

Fuente intacta: [4. Tablas de contingencia y diagramas de árboles.txt](<../../Página web existente/3. Probabilidad/4. Tablas de contingencia y diagramas de árboles.txt>) (SHA-256 `b014c0d54663b92251debe0accd1b423c4249c78d92db368d1c1a5597fdb14b8`). Destino: [7.8](../libro/temas/07-probabilidad/08-probabilidad-condicionada.html). Se conserva P(A|B)=0,70 y se desarrolla la condición inversa y la independencia con los mismos datos. Sin encuesta observada ni nuevas preguntas o tarjetas. [Auditoría](auditoria-reutilizacion-probabilidad.md) · [Verificación](verificacion-entrega-116.md).

## Entrega 117 · Probabilidad total en 7.9

Fuentes intactas: [5. Probabilidad total y Teorema de Bayes.txt](<../../Página web existente/3. Probabilidad/5. Probabilidad total y Teorema de Bayes.txt>) (SHA-256 `87ec5c86cd1ece3d8d9461ca5a17bbcb079e2b95f37ebd8f75e95acbdabe57e2`) y [4. Tablas de contingencia y diagramas de árboles.txt](<../../Página web existente/3. Probabilidad/4. Tablas de contingencia y diagramas de árboles.txt>) (SHA-256 `b014c0d54663b92251debe0accd1b423c4249c78d92db368d1c1a5597fdb14b8`). Destino: [7.9](../libro/temas/07-probabilidad/09-probabilidad-total.html). Se conservan los resultados 0,029 y 0,38; Bayes queda para 7.10. Sin nuevas preguntas ni tarjetas. [Auditoría](auditoria-reutilizacion-probabilidad.md) · [Verificación](verificacion-entrega-117.md).

## Entrega 118 · Teorema de Bayes en 7.10

Fuente intacta: [5. Probabilidad total y Teorema de Bayes.txt](<../../Página web existente/3. Probabilidad/5. Probabilidad total y Teorema de Bayes.txt>) (SHA-256 `87ec5c86cd1ece3d8d9461ca5a17bbcb079e2b95f37ebd8f75e95acbdabe57e2`). Destino: [7.10](../libro/temas/07-probabilidad/10-teorema-de-bayes.html). Se conservan la fórmula y los dos ejemplos hipotéticos: 95/392 y 8/27 son sus resultados sin redondeo prematuro. No se incorporan preguntas ni tarjetas. [Auditoría](auditoria-reutilizacion-probabilidad.md) · [Verificación](verificacion-entrega-118.md).

## Entrega 119 · Ocho ejercicios resueltos de Probabilidad

Fuente intacta: [6. Ejercicios resueltos.txt](<../../Página web existente/3. Probabilidad/6. Ejercicios resueltos.txt>) (SHA-256 `4e6dd0e04f480d856b4eb094c8ecbe77ee0be630665f8f03621d641eb3ba9d37`). Destino: [colección de ocho ejercicios](../libro/temas/07-probabilidad/ejercicios-resueltos.html), enlazada desde la portada del tema. Se conservan los datos y resultados de los ocho problemas; las soluciones se han comprobado con fracciones exactas. No se añaden preguntas de test ni tarjetas. [Auditoría](auditoria-reutilizacion-probabilidad.md) · [Verificación](verificacion-entrega-119.md).

## Entrega 120 · Dieciséis tarjetas originales de Probabilidad

Fuente intacta: [7. Flashcards.txt](<../../Página web existente/3. Probabilidad/7. Flashcards.txt>) (SHA-256 `11da874cb550b883fbd32165e4ae2f7a36e504d3ef77e654890e450ba1c7a47b`). Destino: [banco del tema 7](../content/activities/probability-cards.js) y [vista de tarjetas](../tarjetas/index.html?tema=t07). Se conservan orden y cinco grupos; las respuestas precisan condiciones matemáticas. Se añaden 16 tarjetas, total global 405, sin nuevas preguntas de test. [Auditoría](auditoria-reutilizacion-probabilidad.md) · [Verificación](verificacion-entrega-120.md).

## Entrega 121 · Nueve autoevaluaciones originales de Probabilidad

Fuentes intactas: [Axiomática de Kolmogorov](<../../Página web existente/3. Probabilidad/3. Axiomática de Kolmogorov.txt>) (SHA-256 `ea186d2415662bd9fcc2ee8841f75f3c15625aa4edbc69a97d6e7f2bf3ac6e04`), [Tablas y árboles](<../../Página web existente/3. Probabilidad/4. Tablas de contingencia y diagramas de árboles.txt>) (SHA-256 `b014c0d54663b92251debe0accd1b423c4249c78d92db368d1c1a5597fdb14b8`) y [Probabilidad total y Bayes](<../../Página web existente/3. Probabilidad/5. Probabilidad total y Teorema de Bayes.txt>) (SHA-256 `87ec5c86cd1ece3d8d9461ca5a17bbcb079e2b95f37ebd8f75e95acbdabe57e2`). Destinos: [banco de nueve preguntas](../content/activities/probability-test.js), [test con corrección](../test/index.html?tema=t07) y [lectura sin JavaScript](../test/probabilidad-preguntas.html). Se conserva el orden de tres ideas por archivo; las opciones incorrectas, pistas y explicaciones son adaptaciones editoriales, pues algunas preguntas originales tenían una sola alternativa. Total global: 347 preguntas, 405 tarjetas. [Auditoría](auditoria-reutilizacion-probabilidad.md) · [Verificación](verificacion-entrega-121.md).

## Entrega 122 · Juego de álgebra de sucesos

Fuente intacta: [Introducción a la probabilidad](<../../Página web existente/3. Probabilidad/1. Introducción a la probabilidad.txt>) (SHA-256 `7805666e16e1f0b602632fa8d6dd2a8480f4453ff00a7b4b397e104166120d96`). Destino: [widget insertable](../widgets/games/t07-a-algebra-de-sucesos/index.html), [página del juego](../laboratorios/juegos/t07-a-algebra-de-sucesos.html) y [tema 7](../libro/temas/07-probabilidad/index.html#ruta-juegos). Las cuatro operaciones son del original y de 7.2; los conjuntos aleatorios, ocho rondas y puntuación se diseñaron para práctica adicional. Total global: 17 juegos. [Auditoría](auditoria-reutilizacion-probabilidad.md) · [Verificación](verificacion-entrega-122.md).

## Entrega 123 · Juego de árbol de probabilidad

Fuente intacta: [Tablas de contingencia y diagramas de árboles](<../../Página web existente/3. Probabilidad/4. Tablas de contingencia y diagramas de árboles.txt>) (SHA-256 `b014c0d54663b92251debe0accd1b423c4249c78d92db368d1c1a5597fdb14b8`). Destino: [widget insertable](../widgets/games/t07-b-arbol-de-probabilidad/index.html), [página del juego](../laboratorios/juegos/t07-b-arbol-de-probabilidad.html) y [tema 7](../libro/temas/07-probabilidad/index.html#ruta-juegos). La regla de los caminos procede del original; los árboles y preguntas generados son práctica nueva, con respuestas porcentuales enteras y dos intentos. Total global: 18 juegos. [Auditoría](auditoria-reutilizacion-probabilidad.md) · [Verificación](verificacion-entrega-123.md).

## Entrega 124 · Juego Detective Bayes

Fuente intacta: [Probabilidad total y Teorema de Bayes](<../../Página web existente/3. Probabilidad/5. Probabilidad total y Teorema de Bayes.txt>) (SHA-256 `87ec5c86cd1ece3d8d9461ca5a17bbcb079e2b95f37ebd8f75e95acbdabe57e2`). Destino: [widget insertable](../widgets/games/t07-c-detective-bayes/index.html), [página del juego](../laboratorios/juegos/t07-c-detective-bayes.html) y [tema 7](../libro/temas/07-probabilidad/index.html#ruta-juegos). Se conserva la fórmula y el método de dos caminos; los seis contextos y sus cifras son nuevos e hipotéticos. Total global: 19 juegos. [Auditoría](auditoria-reutilizacion-probabilidad.md) · [Verificación](verificacion-entrega-124.md).

## Entrega 125 · Práctica de Laplace en 7.1

Fuentes intactas: [Introducción a la probabilidad](<../../Página web existente/3. Probabilidad/1. Introducción a la probabilidad.txt>) (SHA-256 `7805666e16e1f0b602632fa8d6dd2a8480f4453ff00a7b4b397e104166120d96`) y [Tipos de probabilidad](<../../Página web existente/3. Probabilidad/2. Tipos de probabilidad.txt>) (SHA-256 `ba5abc4e5c9086450b3c7441fdd80420b7b3454647c723117d27bf8142cb2454`). Destino: [modelo procedural](../content/models/probability-laplace-practice.js) insertado en [7.1](../libro/temas/07-probabilidad/01-sucesos-regla-de-laplace.html#practica). Dados, urnas y baraja proceden de los contextos de la lección; cifras, opciones y seis variantes por sesión son ampliación propia. No se incorporan al banco base de 347 preguntas. [Auditoría](auditoria-reutilizacion-probabilidad.md) · [Verificación](verificacion-entrega-125.md).

## Entrega 126 · Práctica de álgebra de sucesos en 7.2

Fuentes intactas: [Introducción a la probabilidad](<../../Página web existente/3. Probabilidad/1. Introducción a la probabilidad.txt>) (SHA-256 `7805666e16e1f0b602632fa8d6dd2a8480f4453ff00a7b4b397e104166120d96`) y [Tipos de probabilidad](<../../Página web existente/3. Probabilidad/2. Tipos de probabilidad.txt>) (SHA-256 `ba5abc4e5c9086450b3c7441fdd80420b7b3454647c723117d27bf8142cb2454`). Destino: [modelo procedural](../content/models/probability-events-practice.js) insertado en [7.2](../libro/temas/07-probabilidad/02-algebra-de-sucesos.html#practica). Las operaciones y el ejemplo de baraja proceden de los originales; los conjuntos de fichas, seis variantes y distractores son una ampliación propia. No aumentan las 347 preguntas base. [Auditoría](auditoria-reutilizacion-probabilidad.md) · [Verificación](verificacion-entrega-126.md).

## Entrega 127 · Práctica de tablas en 7.3

Fuente intacta: [Tablas de contingencia y diagramas de árboles](<../../Página web existente/3. Probabilidad/4. Tablas de contingencia y diagramas de árboles.txt>) (SHA-256 `b014c0d54663b92251debe0accd1b423c4249c78d92db368d1c1a5597fdb14b8`). Destinos: [modelo procedural](../content/models/probability-table-practice.js), [componente de preguntas con tabla](../assets/js/learning/quiz.js) y [lección 7.3](../libro/temas/07-probabilidad/03-tablas-de-contingencia.html#practica). Se conserva la estructura de casillas y márgenes del original; los recuentos de tarjetas y seis variantes son una ampliación propia. No se añaden preguntas al banco base de 347. [Auditoría](auditoria-reutilizacion-probabilidad.md) · [Verificación](verificacion-entrega-127.md).

## Entrega 128 · Práctica de frecuencias en 7.4

Fuente intacta: [Tipos de probabilidad](<../../Página web existente/3. Probabilidad/2. Tipos de probabilidad.txt>) (SHA-256 `ba5abc4e5c9086450b3c7441fdd80420b7b3454647c723117d27bf8142cb2454`). Destinos: [modelo procedural](../content/models/probability-frequency-practice.js) y [lección 7.4](../libro/temas/07-probabilidad/04-frecuencias.html#practica). Los conceptos de frecuencia relativa y su interpretación proceden del original; los registros ficticios ordenados, acumulados y seis variantes son ampliaciones didácticas. No se añaden preguntas al banco base de 347. [Auditoría](auditoria-reutilizacion-probabilidad.md) · [Verificación](verificacion-entrega-128.md).

## Entrega 129 · Práctica de axiomas en 7.5

Fuente intacta: [Axiomática de Kolmogorov](<../../Página web existente/3. Probabilidad/3. Axiomática de Kolmogorov.txt>) (SHA-256 `ea186d2415662bd9fcc2ee8841f75f3c15625aa4edbc69a97d6e7f2bf3ac6e04`). Destinos: [modelo procedural](../content/models/probability-axioms-practice.js) y [lección 7.5](../libro/temas/07-probabilidad/05-axiomatica-de-kolmogorov.html#practica). Los axiomas, el imposible y el complementario proceden del original; cifras, seis variantes y distractores son ampliación propia. Las ideas de complementario y dos resultados estaban ya en la autoevaluación integrada en la entrega 121. El banco base sigue en 347 preguntas. [Auditoría](auditoria-reutilizacion-probabilidad.md) · [Verificación](verificacion-entrega-129.md).

## Entrega 130 · Práctica de propiedades en 7.6

Fuente intacta: [Axiomática de Kolmogorov](<../../Página web existente/3. Probabilidad/3. Axiomática de Kolmogorov.txt>) (SHA-256 `ea186d2415662bd9fcc2ee8841f75f3c15625aa4edbc69a97d6e7f2bf3ac6e04`). Destinos: [modelo procedural](../content/models/probability-properties-practice.js) y [lección 7.6](../libro/temas/07-probabilidad/06-propiedades-de-la-probabilidad.html#practica). Las reglas de complementario, unión e inclusión proceden del original; regiones finitas, cifras y seis variantes son ampliaciones propias. No se altera el banco base de 347 preguntas. [Auditoría](auditoria-reutilizacion-probabilidad.md) · [Verificación](verificacion-entrega-130.md).

## Entrega 131 · Práctica de experimentos compuestos en 7.7

Fuente intacta: [Tablas de contingencia y diagramas de árboles](<../../Página web existente/3. Probabilidad/4. Tablas de contingencia y diagramas de árboles.txt>) (SHA-256 `b014c0d54663b92251debe0accd1b423c4249c78d92db368d1c1a5597fdb14b8`). Destinos: [modelo procedural](../content/models/probability-compound-practice.js) y [lección 7.7](../libro/temas/07-probabilidad/07-experimentos-compuestos.html#practica). El orden de las ramas, los productos y la suma de caminos proceden del original; urnas, reemplazamiento, cifras y seis variantes son ampliación didáctica. El banco base permanece en 347 preguntas. [Auditoría](auditoria-reutilizacion-probabilidad.md) · [Verificación](verificacion-entrega-131.md).

## Entrega 132 · Práctica de probabilidad condicionada en 7.8

Fuente intacta: [Tablas de contingencia y diagramas de árboles](<../../Página web existente/3. Probabilidad/4. Tablas de contingencia y diagramas de árboles.txt>) (SHA-256 `b014c0d54663b92251debe0accd1b423c4249c78d92db368d1c1a5597fdb14b8`). Destinos: [modelo procedural](../content/models/probability-conditional-practice.js) y [lección 7.8](../libro/temas/07-probabilidad/08-probabilidad-condicionada.html#practica). La definición, la comparación de denominadores y el uso de tablas proceden del original; recuentos y seis variantes son ampliación didáctica. El banco base permanece en 347 preguntas. [Auditoría](auditoria-reutilizacion-probabilidad.md) · [Verificación](verificacion-entrega-132.md).

## Entrega 133 · Práctica de probabilidad total en 7.9

Fuente intacta: [Probabilidad total y Teorema de Bayes](<../../Página web existente/3. Probabilidad/5. Probabilidad total y Teorema de Bayes.txt>) (SHA-256 `87ec5c86cd1ece3d8d9461ca5a17bbcb079e2b95f37ebd8f75e95acbdabe57e2`). Destinos: [modelo procedural](../content/models/probability-total-practice.js) y [lección 7.9](../libro/temas/07-probabilidad/09-probabilidad-total.html#practica). La fórmula, partición y multiplicación seguida de suma proceden del original; los grupos, cifras y seis variantes son ampliación didáctica. El banco base permanece en 347 preguntas. [Auditoría](auditoria-reutilizacion-probabilidad.md) · [Verificación](verificacion-entrega-133.md).

## Entrega 134 · Práctica de Bayes en 7.10

Fuente intacta: [Probabilidad total y Teorema de Bayes](<../../Página web existente/3. Probabilidad/5. Probabilidad total y Teorema de Bayes.txt>) (SHA-256 `87ec5c86cd1ece3d8d9461ca5a17bbcb079e2b95f37ebd8f75e95acbdabe57e2`). Destinos: [modelo procedural](../content/models/probability-bayes-practice.js) y [lección 7.10](../libro/temas/07-probabilidad/10-teorema-de-bayes.html#practica). La inversión de la condición mediante probabilidad total procede del original; los escenarios de producción, cifras y seis variantes son ampliación didáctica. El banco base permanece en 347 preguntas. [Auditoría](auditoria-reutilizacion-probabilidad.md) · [Verificación](verificacion-entrega-134.md).

## Entrega 136 · Árbol de fallos de fábrica en 7.7

Fuente intacta: [Tablas de contingencia y diagramas de árboles](<../../Página web existente/3. Probabilidad/4. Tablas de contingencia y diagramas de árboles.txt>) (SHA-256 `b014c0d54663b92251debe0accd1b423c4249c78d92db368d1c1a5597fdb14b8`). Destino: [ejemplo resuelto de 7.7](../libro/temas/07-probabilidad/07-experimentos-compuestos.html#fallos). Se conservan los datos \(P(F)=0{,}0002\), dos unidades independientes y los sucesos «dos fallos» y «al menos un fallo». Se corrigen los delimitadores LaTeX y el redondeo prematuro; \(1-(0{,}9998)^2=0{,}00039996\). La tabla de cuatro caminos es una adaptación accesible del árbol visual. No aumenta los ocho problemas de la colección ni el banco base de 347 preguntas. [Auditoría](auditoria-reutilizacion-probabilidad.md) · [Verificación](verificacion-entrega-136.md).

## Entrega 137 · Cuatro problemas resueltos de ampliación

Destino: [problemas A–D](../libro/temas/07-probabilidad/ejercicios-resueltos.html#ampliaciones). Las ideas proceden de álgebra de sucesos, árboles, tablas y Bayes en los originales [Introducción](<../../Página web existente/3. Probabilidad/1. Introducción a la probabilidad.txt>), [Tablas y árboles](<../../Página web existente/3. Probabilidad/4. Tablas de contingencia y diagramas de árboles.txt>) y [Probabilidad total y Bayes](<../../Página web existente/3. Probabilidad/5. Probabilidad total y Teorema de Bayes.txt>). Los cuatro enunciados, contextos y números son elaboración didáctica propia; permanecen separados de los ocho ejercicios numerados del [archivo original](<../../Página web existente/3. Probabilidad/6. Ejercicios resueltos.txt>), que conserva SHA-256 `4e6dd0e04f480d856b4eb094c8ecbe77ee0be630665f8f03621d641eb3ba9d37`. La colección suma doce problemas, sin alterar las 347 preguntas base. [Auditoría](auditoria-reutilizacion-probabilidad.md) · [Verificación](verificacion-entrega-137.md).

## Entrega 138 · Seis preguntas base nuevas para 7.1 y 7.2

Destinos: [banco del test](../content/activities/probability-test.js), [test interactivo](../test/index.html?tema=t07) y [lectura de respaldo](../test/probabilidad-preguntas.html). Fuentes de conceptos: [Introducción a la probabilidad](<../../Página web existente/3. Probabilidad/1. Introducción a la probabilidad.txt>) (SHA-256 `7805666e16e1f0b602632fa8d6dd2a8480f4453ff00a7b4b397e104166120d96`) y [Tipos de probabilidad](<../../Página web existente/3. Probabilidad/2. Tipos de probabilidad.txt>) (SHA-256 `ba5abc4e5c9086450b3c7441fdd80420b7b3454647c723117d27bf8142cb2454`). Las preguntas 10–15 son elaboraciones didácticas nuevas y no se atribuyen a las autoevaluaciones originales; estas permanecen en las posiciones 1–9. El tema suma 15 preguntas base y el curso 353. [Auditoría](auditoria-reutilizacion-probabilidad.md) · [Verificación](verificacion-entrega-138.md).

## Entrega 139 · Seis preguntas base nuevas para 7.3 y 7.4

Destinos: [banco del test](../content/activities/probability-test.js), [test interactivo](../test/index.html?tema=t07) y [lectura de respaldo](../test/probabilidad-preguntas.html). Fuentes conceptuales intactas: [Tablas de contingencia y diagramas de árboles](<../../Página web existente/3. Probabilidad/4. Tablas de contingencia y diagramas de árboles.txt>) (SHA-256 `b014c0d54663b92251debe0accd1b423c4249c78d92db368d1c1a5597fdb14b8`) y [Tipos de probabilidad](<../../Página web existente/3. Probabilidad/2. Tipos de probabilidad.txt>) (SHA-256 `ba5abc4e5c9086450b3c7441fdd80420b7b3454647c723117d27bf8142cb2454`). Las preguntas 16–21, su tabla de probabilidades y el registro de tareas son elaboración didáctica nueva; no son preguntas textuales ni datos observados del original. Las nueve ideas de autoevaluación originales permanecen en 1–9. El tema suma 21 preguntas base y el curso 359. [Auditoría](auditoria-reutilizacion-probabilidad.md) · [Verificación](verificacion-entrega-139.md).

## Entrega 140 · Seis preguntas base nuevas para 7.5 y 7.6

Destinos: [banco del test](../content/activities/probability-test.js), [test interactivo](../test/index.html?tema=t07) y [lectura de respaldo](../test/probabilidad-preguntas.html). Fuente conceptual intacta: [Axiomática de Kolmogorov](<../../Página web existente/3. Probabilidad/3. Axiomática de Kolmogorov.txt>) (SHA-256 `ea186d2415662bd9fcc2ee8841f75f3c15625aa4edbc69a97d6e7f2bf3ac6e04`). Las preguntas 22–27 y sus cifras son elaboración didáctica nueva, no adaptaciones textuales de la autoevaluación de ese archivo. Las nueve ideas originales adaptadas siguen en 1–9. El tema suma 27 preguntas base y el curso 365. [Auditoría](auditoria-reutilizacion-probabilidad.md) · [Verificación](verificacion-entrega-140.md).

## Entrega 141 · Seis preguntas base nuevas para 7.7 y 7.8

Destinos: [banco del test](../content/activities/probability-test.js), [test interactivo](../test/index.html?tema=t07) y [lectura de respaldo](../test/probabilidad-preguntas.html). Fuente conceptual intacta: [Tablas de contingencia y diagramas de árboles](<../../Página web existente/3. Probabilidad/4. Tablas de contingencia y diagramas de árboles.txt>) (SHA-256 `b014c0d54663b92251debe0accd1b423c4249c78d92db368d1c1a5597fdb14b8`). La pregunta 28 deriva un resultado del ejemplo hipotético original de dos incendios; 29–30 usan la urna didáctica añadida en la lección; 31–33 son datos hipotéticos nuevos para aplicar la condicionada. Todas se identifican como ampliaciones del test, no como autoevaluaciones textuales de la fuente. Las nueve ideas originales adaptadas siguen en 1–9. El tema suma 33 preguntas base y el curso 371. [Auditoría](auditoria-reutilizacion-probabilidad.md) · [Verificación](verificacion-entrega-141.md).

## Entrega 142 · Seis preguntas base nuevas para 7.9 y 7.10

Destinos: [banco del test](../content/activities/probability-test.js), [test interactivo](../test/index.html?tema=t07) y [lectura de respaldo](../test/probabilidad-preguntas.html). Fuentes conceptuales intactas: [Probabilidad total y Teorema de Bayes](<../../Página web existente/3. Probabilidad/5. Probabilidad total y Teorema de Bayes.txt>) (SHA-256 `87ec5c86cd1ece3d8d9461ca5a17bbcb079e2b95f37ebd8f75e95acbdabe57e2`) y [Tablas de contingencia y diagramas de árboles](<../../Página web existente/3. Probabilidad/4. Tablas de contingencia y diagramas de árboles.txt>) (SHA-256 `b014c0d54663b92251debe0accd1b423c4249c78d92db368d1c1a5597fdb14b8`). Las preguntas 35–38 usan cifras hipotéticas de máquinas y correo del archivo 5 y de dos ramas del archivo 4; 34 y 39 usan conjuntos o contribuciones nuevos. Todas son ampliaciones del test y no se atribuyen a las autoevaluaciones textuales de las fuentes. Las nueve ideas originales adaptadas siguen en 1–9. El tema suma 39 preguntas base y el curso 377. [Auditoría](auditoria-reutilizacion-probabilidad.md) · [Verificación](verificacion-entrega-142.md).

## Entrega 143 · Seis preguntas integradas sobre una tabla ficticia

Destinos: [banco del test](../content/activities/probability-test.js), [test interactivo](../test/index.html?tema=t07) y [lectura de respaldo](../test/probabilidad-preguntas.html#repaso-integrado). Fuentes conceptuales intactas: [Introducción a la probabilidad](<../../Página web existente/3. Probabilidad/1. Introducción a la probabilidad.txt>), [Tipos de probabilidad](<../../Página web existente/3. Probabilidad/2. Tipos de probabilidad.txt>), [Axiomática de Kolmogorov](<../../Página web existente/3. Probabilidad/3. Axiomática de Kolmogorov.txt>), [Tablas y árboles](<../../Página web existente/3. Probabilidad/4. Tablas de contingencia y diagramas de árboles.txt>) y [Probabilidad total y Bayes](<../../Página web existente/3. Probabilidad/5. Probabilidad total y Teorema de Bayes.txt>); sus huellas SHA-256 se registran en el inventario y se comprueban en el test. Las preguntas 40–45 y sus 200 fichas son elaboración didáctica ficticia. No proceden de una encuesta real ni de las nueve autoevaluaciones originales, que permanecen en 1–9. El tema suma 45 preguntas base y el curso 383. [Auditoría](auditoria-reutilizacion-probabilidad.md) · [Verificación](verificacion-entrega-143.md).

## Entrega 144 · Tres escenarios nuevos de Probabilidad

Destinos: [banco del test](../content/activities/probability-test.js), [test interactivo](../test/index.html?tema=t07) y [lectura de respaldo](../test/probabilidad-preguntas.html#dos-dados). Fuentes conceptuales: los cinco originales de Introducción, Tipos, Axiomática, Tablas y árboles, y Probabilidad total y Bayes citados en la entrega 143, intactos según las huellas SHA-256 del inventario. Las preguntas 46–60 son ampliaciones didácticas originales; las nueve ideas de autoevaluación adaptadas conservan las posiciones 1–9. Los dados y la urna son modelos equiprobables; la tabla de canales contiene proporciones inventadas y no registros observados. El tema llega a 60 preguntas base y el curso a 398. [Auditoría](auditoria-reutilizacion-probabilidad.md) · [Verificación](verificacion-entrega-144.md).

## Entrega 145 · Revisión de Sucesos y regla de Laplace

Fuentes intactas: [Introducción a la probabilidad](<../../Página web existente/3. Probabilidad/1. Introducción a la probabilidad.txt>) (SHA-256 `7805666e16e1f0b602632fa8d6dd2a8480f4453ff00a7b4b397e104166120d96`) y [Tipos de probabilidad](<../../Página web existente/3. Probabilidad/2. Tipos de probabilidad.txt>) (SHA-256 `ba5abc4e5c9086450b3c7441fdd80420b7b3454647c723117d27bf8142cb2454`). Destino: [7.1. Sucesos y regla de Laplace](../libro/temas/07-probabilidad/01-sucesos-regla-de-laplace.html). Se recupera el ejemplo original del dado con resultado 3 y probabilidad 1/6. El modelo de ruleta con sectores desiguales, los errores frecuentes y el resumen son ampliaciones editoriales nuevas; no se presentan como datos observados ni como preguntas originales. El banco base permanece en 60 preguntas del tema y 398 globales. [Auditoría](auditoria-reutilizacion-probabilidad.md) · [Verificación](verificacion-entrega-145.md).

## Entrega 146 · Revisión de Álgebra de sucesos

Fuentes intactas: [Introducción a la probabilidad](<../../Página web existente/3. Probabilidad/1. Introducción a la probabilidad.txt>) (SHA-256 `7805666e16e1f0b602632fa8d6dd2a8480f4453ff00a7b4b397e104166120d96`) y [Tipos de probabilidad](<../../Página web existente/3. Probabilidad/2. Tipos de probabilidad.txt>) (SHA-256 `ba5abc4e5c9086450b3c7441fdd80420b7b3454647c723117d27bf8142cb2454`). Destino: [7.2. Álgebra de sucesos](../libro/temas/07-probabilidad/02-algebra-de-sucesos.html). Los diagramas de unión, intersección, diferencia y complementario, y el ejercicio «rey o copa», proceden de los originales. La comparación de cuatro expresiones sobre el dado didáctico, los objetivos, errores y resumen son ampliaciones editoriales nuevas. No se altera el banco de 60 preguntas del tema ni el total global de 398. [Auditoría](auditoria-reutilizacion-probabilidad.md) · [Verificación](verificacion-entrega-146.md).

## Entrega 147 · Revisión de Tablas de contingencia

Fuente intacta: [Tablas de contingencia y diagramas de árboles](<../../Página web existente/3. Probabilidad/4. Tablas de contingencia y diagramas de árboles.txt>) (SHA-256 b014c0d54663b92251debe0accd1b423c4249c78d92db368d1c1a5597fdb14b8). Destino: [7.3. Tablas de contingencia](../libro/temas/07-probabilidad/03-tablas-de-contingencia.html). La tabla simbólica, el ejemplo hipotético de aprobar y entregar trabajos y P(A dado B)=0,70 proceden del original. La unión, el complementario, la condicionada complementaria y la comprobación de independencia se derivan de sus cifras como ampliación editorial nueva. No se inventan registros de estudiantes observados. El banco permanece en 60 preguntas del tema y 398 globales. [Auditoría](auditoria-reutilizacion-probabilidad.md) · [Verificación](verificacion-entrega-147.md).

## Entrega 148 · Revisión de Frecuencias

Fuente intacta: [Tipos de probabilidad](<../../Página web existente/3. Probabilidad/2. Tipos de probabilidad.txt>) (SHA-256 ba5abc4e5c9086450b3c7441fdd80420b7b3454647c723117d27bf8142cb2454). Destino: [7.4. Frecuencias](../libro/temas/07-probabilidad/04-frecuencias.html). Se conservan los ejemplos 850/10 000 y 24/200 y la distinción original entre enfoque teórico y empírico. La tabla ordenada de diez registros, el ejemplo de cuatro seises en veinte lanzamientos, los errores frecuentes y el resumen son ampliaciones editoriales didácticas; no proceden de un registro observado. La frecuencia acumulada desarrolla el guion y se aplica solo a categorías ordenadas. El banco base conserva 60 preguntas en el tema y 398 globales. [Auditoría](auditoria-reutilizacion-probabilidad.md) · [Verificación](verificacion-entrega-148.md).

## Entrega 149 · Revisión de Axiomática de Kolmogórov

Fuente intacta: [Axiomática de Kolmogorov](<../../Página web existente/3. Probabilidad/3. Axiomática de Kolmogorov.txt>) (SHA-256 ea186d2415662bd9fcc2ee8841f75f3c15625aa4edbc69a97d6e7f2bf3ac6e04). Destino: [7.5. Axiomática de Kolmogórov](../libro/temas/07-probabilidad/05-axiomatica-de-kolmogorov.html). Se conservan los tres axiomas, el ejemplo de dado «menor que 4» y el ejemplo recuperado «sacar figura» (12/40 = 3/10) de la baraja española. La ruleta de tres asignaciones, objetivos, errores frecuentes y resumen son ampliaciones editoriales nuevas, no observaciones ni preguntas textuales del original. El banco fijo conserva 60 preguntas del tema y 398 globales. [Auditoría](auditoria-reutilizacion-probabilidad.md) · [Verificación](verificacion-entrega-149.md).

## Entrega 150 · Revisión de Propiedades de la probabilidad

Fuente intacta: [Axiomática de Kolmogorov](<../../Página web existente/3. Probabilidad/3. Axiomática de Kolmogorov.txt>) (SHA-256 ea186d2415662bd9fcc2ee8841f75f3c15625aa4edbc69a97d6e7f2bf3ac6e04). Destino: [7.6. Propiedades de la probabilidad](../libro/temas/07-probabilidad/06-propiedades-de-la-probabilidad.html). Se conservan las propiedades y los ejemplos originales de dos dados (11/36) y baraja española (13/40). La comparación entre contrario, unión con solape e inclusión sobre los mismos dados es una derivación didáctica nueva, identificada como tal. Objetivos, errores frecuentes y resumen son ampliaciones editoriales. El banco fijo conserva 60 preguntas del tema y 398 globales. [Auditoría](auditoria-reutilizacion-probabilidad.md) · [Verificación](verificacion-entrega-150.md).

## Entrega 151 · Revisión de Experimentos compuestos

Fuente intacta: [Tablas de contingencia y diagramas de árboles](<../../Página web existente/3. Probabilidad/4. Tablas de contingencia y diagramas de árboles.txt>) (SHA-256 b014c0d54663b92251debe0accd1b423c4249c78d92db368d1c1a5597fdb14b8). Destino principal: [7.7. Experimentos compuestos](../libro/temas/07-probabilidad/07-experimentos-compuestos.html#dependencia). El mini-ejemplo original da \(P(A)=0{,}3\), \(P(B\mid A)=0{,}8\), \(P(B\mid A^c)=0{,}2\) y \(P(B)=0{,}38\). Sus cuatro caminos y la comprobación de dependencia son desarrollo editorial de esas cifras; los árboles originales de incendios y fábrica se conservan. La urna con reemplazamiento es una ampliación didáctica nueva. [7.9](../libro/temas/07-probabilidad/09-probabilidad-total.html#dos-ramas) ahora atribuye expresamente el ejemplo de dos ramas al archivo 4. Precisión sobre la entrega 142: la pregunta del test con 0,38 procede de este archivo 4; el ejemplo de máquinas y la fórmula de probabilidad total proceden del archivo 5. Permanecen 60 preguntas base del tema y 398 globales. [Auditoría](auditoria-reutilizacion-probabilidad.md) · [Verificación](verificacion-entrega-151.md).

## Entrega 152 · Revisión de Probabilidad condicionada

Fuente intacta: [Tablas de contingencia y diagramas de árboles](<../../Página web existente/3. Probabilidad/4. Tablas de contingencia y diagramas de árboles.txt>) (SHA-256 b014c0d54663b92251debe0accd1b423c4249c78d92db368d1c1a5597fdb14b8). Destino: [7.8. Probabilidad condicionada](../libro/temas/07-probabilidad/08-probabilidad-condicionada.html#tabla). La fuente aporta la definición y el ejemplo de aprobar/entregar con \(P(A)=0{,}60\), \(P(B)=0{,}50\), \(P(A\cap B)=0{,}35\) y \(P(A\mid B)=0{,}70\). La tabla completa conserva los valores adaptados en 7.3; las condiciones inversa, complementaria y según no entregar son derivaciones de sus mismas casillas. No son observaciones de alumnado ni prueban causalidad. Objetivos, errores y resumen son ampliaciones editoriales. El banco fijo conserva 60 preguntas del tema y 398 globales. [Auditoría](auditoria-reutilizacion-probabilidad.md) · [Verificación](verificacion-entrega-152.md).

## Entrega 153 · Revisión de Probabilidad total

Fuentes intactas: [Probabilidad total y Teorema de Bayes](<../../Página web existente/3. Probabilidad/5. Probabilidad total y Teorema de Bayes.txt>) (SHA-256 87ec5c86cd1ece3d8d9461ca5a17bbcb079e2b95f37ebd8f75e95acbdabe57e2) y [Tablas de contingencia y diagramas de árboles](<../../Página web existente/3. Probabilidad/4. Tablas de contingencia y diagramas de árboles.txt>) (SHA-256 b014c0d54663b92251debe0accd1b423c4249c78d92db368d1c1a5597fdb14b8). Destino: [7.9. Probabilidad total](../libro/temas/07-probabilidad/09-probabilidad-total.html#comprobacion). El archivo 5 aporta la fórmula y el ejemplo de máquinas con \(P(D)=0{,}029\); el archivo 4 aporta el ejemplo separado de dos ramas con \(P(B)=0{,}38\). Los caminos sin defecto (0,686 y 0,285), su suma 0,971 y el contraste con el promedio simple 0,035 son derivaciones editoriales de las tasas y pesos originales, no datos observados ni ejercicios textuales de la fuente. Objetivos, errores y resumen son ampliaciones editoriales. El banco fijo conserva 60 preguntas del tema y 398 globales. [Auditoría](auditoria-reutilizacion-probabilidad.md) · [Verificación](verificacion-entrega-153.md).

## Entrega 154 · Revisión de Teorema de Bayes

Fuente intacta: [Probabilidad total y Teorema de Bayes](<../../Página web existente/3. Probabilidad/5. Probabilidad total y Teorema de Bayes.txt>) (SHA-256 87ec5c86cd1ece3d8d9461ca5a17bbcb079e2b95f37ebd8f75e95acbdabe57e2). Destino: [7.10. Teorema de Bayes](../libro/temas/07-probabilidad/10-teorema-de-bayes.html#comprobacion). Se conservan la fórmula, el ejemplo diagnóstico ficticio con \(P(+)=0{,}0392\) y \(P(E\mid +)=95/392\), y el de correo con \(P(W)=0{,}135\) y \(P(S\mid W)=8/27\). Las posteriores de las causas alternativas, \(297/392\) y \(19/27\), y las comprobaciones de suma 1 se derivan de las mismas cifras como ampliación editorial, no como datos observados. Objetivos, errores y resumen también son nuevos. El banco fijo conserva 60 preguntas del tema y 398 globales. [Auditoría](auditoria-reutilizacion-probabilidad.md) · [Verificación](verificacion-entrega-154.md).

## Entrega 155 · Auditoría transversal del tema 7

No se añaden conceptos ni datos nuevos. Los ocho TXT originales de Probabilidad permanecen intactos y sus usos parciales están documentados en la [auditoría de reutilización](auditoria-reutilizacion-probabilidad.md). Se actualizan las descripciones de estado en el [índice del tema](../libro/temas/07-probabilidad/index.html) y la [colección de problemas](../libro/temas/07-probabilidad/ejercicios-resueltos.html), sin cambiar enunciados, soluciones, preguntas ni tarjetas. La [auditoría de cobertura](auditoria-cobertura-accesibilidad-probabilidad.md) comprueba diez lecciones, 60 preguntas base y doce problemas. Persisten la revisión detallada de fuentes y respuestas y la prueba manual con lector de pantalla. [Verificación](verificacion-entrega-155.md).

## Entrega 157 · Cuarto distractor y trazabilidad del banco de Probabilidad

Destino: [banco de Probabilidad](../content/activities/probability-test.js). Se añade un distractor con feedback a cada una de sus 60 preguntas para cumplir las cuatro alternativas de la especificación. Estos distractores son ampliaciones editoriales nuevas; no se atribuyen a las autoevaluaciones originales. Se conservan los enunciados, tablas, tres opciones previas, respuestas correctas, pistas y explicaciones, comprobados mediante SHA-256 en [probability-options.test.mjs](../tests/probability-options.test.mjs). La pregunta 36 pasa a referenciar el archivo 4 de tablas y árboles, del que proceden sus cifras. Los originales TXT y ZIP permanecen intactos. M13/M14 quedan conciliados en [incidencias](incidencias-contenido.md); la corrección de sus copias LaTeX y PDF continúa pendiente. Los bancos conservan 398 preguntas y 405 tarjetas. [Verificación](verificacion-entrega-157.md).

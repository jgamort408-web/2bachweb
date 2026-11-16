# TEO-24 · Segunda pasada de teoría de los temas 1–5

Revisión iniciada el 14 de noviembre de 2026. El cotejo de los temas 1–5 está completado: 257 requisitos en 58 lecciones. La revisión visual y asistida sigue pendiente en TEO-25.

## Método y alcance

Cotejo de cada viñeta del [guion maestro](../../Temario%20completo/Guion_Temario_Matematicas_CC_Sociales_II_2Bach.md) con el texto completo de las lecciones, incluidos ejemplos, advertencias y soluciones desplegables. Se registran evidencias textuales concretas, no solo la presencia de encabezados o la longitud del HTML.

«Cubierto» significa que el requisito dispone de explicación y/o ejemplo localizable. No certifica todos los ejercicios ni el funcionamiento de exploradores, renderizado o lectores de pantalla. Esas comprobaciones siguen en TEO-25. No se cambia automáticamente el estado editorial de las páginas.

## Secuencia de revisión

- [x] TEO-24A · Tema 1, 18 lecciones, cotejo de todas las viñetas del guion.
- [x] TEO-24B · Tema 2, representación de funciones, nueve lecciones.
- [x] TEO-24C · Tema 3, integrales, ocho lecciones.
- [x] TEO-24D · Tema 4, matrices y determinantes, doce lecciones.
- [x] TEO-24E · Tema 5, sistemas de ecuaciones, once lecciones.

## Resultado del tema 1

Se confirma cobertura de las 18 lecciones respecto de las viñetas del guion. No se identifica una nueva laguna teórica que exija redactar otra sección en esta pasada. Se conservan las explicaciones existentes. El rigor formal adicional no pedido por el guion —por ejemplo, definición epsilon-delta completa— no se introduce como una carencia obligatoria.

Se presta atención especial a dominio, valor puntual, signos de infinitos, derivadas finitas, teoremas y condiciones de aplicación. Las ampliaciones ya presentes (derivada no continua, tangentes verticales y limitaciones de L’Hôpital) se distinguen del núcleo exigido.

## Matriz de requisitos del tema 1

### 1.1. Límite de una función

[Página revisada](../libro/temas/01-limites-y-derivadas/01-limite-de-una-funcion.html).

| Requisito del guion | Evidencia en la lección | Resultado |
|---|---|---|
| Introducir la idea intuitiva de `lim_{x→a} f(x)=L`: comportamiento de `f(x)` cuando `x` se aproxima a `a`, sin exigir inicialmente que `x=a`. | Definición intuitiva con x≠a en «Acercarse no es llegar». | Cubierto |
| Diferenciar claramente **valor de la función**, `f(a)`, y **límite de la función** en `a`. | Distingue valor puntual, límite y continuidad; ejemplo h(2)=9 y límite 4. | Cubierto |
| Interpretar límites mediante tablas, expresiones algebraicas y gráficas. | Tabla de valores, simplificación y explorador del hueco en (2,4). | Cubierto |
| Presentar límites finitos e infinitos y límites cuando la variable tiende a un número o a infinito. | Mapa con cuatro combinaciones de punto/infinito y resultado finito/infinito. | Cubierto |
| Trabajar la lectura gráfica de límites, incluidos puntos no definidos, huecos y discontinuidades. | Lectura gráfica con punto lleno y hueco, y protocolo de lectura de ambas ramas. | Cubierto |

### 1.2. Límites laterales

[Página revisada](../libro/temas/01-limites-y-derivadas/02-limites-laterales.html).

| Requisito del guion | Evidencia en la lección | Resultado |
|---|---|---|
| Definir límite por la izquierda `x→a⁻` y por la derecha `x→a⁺`. | Define x→a− y x→a+ con el signo referido a la variable. | Cubierto |
| Establecer que existe límite finito en `a` si ambos límites laterales existen y coinciden. | Equivalencia entre límite bilateral finito y laterales coincidentes. | Cubierto |
| Calcular límites laterales en funciones definidas a trozos. | Tarifa a trozos y parámetro k=−1 para unir ramas. | Cubierto |
| Relacionar los límites laterales con saltos, asíntotas verticales y continuidad. | Ejemplos de salto, 1/x y 1/x², y comparación con el valor puntual. | Cubierto |
| Interpretar situaciones en las que el comportamiento cambia antes y después de un instante o valor crítico. | Cambio de tarifa al llegar a diez unidades con salto de tres euros. | Cubierto |

### 1.3. Operaciones con el infinito

[Página revisada](../libro/temas/01-limites-y-derivadas/03-operaciones-con-el-infinito.html).

| Requisito del guion | Evidencia en la lección | Resultado |
|---|---|---|
| Explicar el infinito como descripción de un comportamiento no acotado y no como un número real. | Explica crecimiento sin cota y que infinito no es un número real. | Cubierto |
| Manejar reglas operativas habituales con `+∞` y `−∞` en sumas, productos, cocientes y potencias cuando el resultado está determinado. | Tabla de operaciones, signos y potencias con base y exponente condicionados. | Cubierto |
| Identificar las **formas indeterminadas** relevantes, especialmente `∞−∞`, `∞/∞`, `0/0`, `0·∞` y las potencias indeterminadas cuando proceda. | Enumera las siete formas habituales, incluidas potencias con base positiva. | Cubierto |
| Insistir en que una indeterminación no es un resultado: obliga a transformar la expresión. | Distingue forma inicial de resultado y aporta formas iguales con resultados distintos. | Cubierto |

### 1.4. Límites infinitos en un punto finito

[Página revisada](../libro/temas/01-limites-y-derivadas/04-limites-infinitos-en-un-punto-finito.html).

| Requisito del guion | Evidencia en la lección | Resultado |
|---|---|---|
| Estudiar límites del tipo `lim_{x→a} f(x)=±∞`. | Definición lateral de límite infinito cerca de un punto finito. | Cubierto |
| Analizar los límites laterales, ya que pueden tener signos distintos. | Cálculo de ambos laterales de 3/(x−2) y tabla de signos del examen. | Cubierto |
| Introducir y reconocer **asíntotas verticales** `x=a`. | Define asíntota vertical mediante al menos un lateral infinito. | Cubierto |
| Estudiar especialmente cocientes en los que el denominador tiende a cero. | Cocientes con denominador nulo y numerador no nulo, y contraste de hueco cancelable. | Cubierto |
| Relacionar el signo del numerador y del denominador con el comportamiento hacia `+∞` o `−∞`. | Signos de (x−1)(x−2) cerca de 1 y potencia par en −2/(x+1)². | Cubierto |

### 1.5. Límites finitos en el infinito

[Página revisada](../libro/temas/01-limites-y-derivadas/05-limites-finitos-en-el-infinito.html).

| Requisito del guion | Evidencia en la lección | Resultado |
|---|---|---|
| Estudiar `lim_{x→±∞} f(x)=L`. | Define aproximación en ambos infinitos y estudia ambos extremos por separado. | Cubierto |
| Interpretar el comportamiento a largo plazo de una función. | Modelo de difusión N(t)=1200t/(t+4). | Cubierto |
| Introducir las **asíntotas horizontales** `y=L`. | Asíntota horizontal y=L por el extremo correspondiente y ejemplo de cruce. | Cubierto |
| Resolver límites de funciones racionales mediante comparación de grados y división por la potencia dominante. | Regla de grados justificada dividiendo por potencia dominante. | Cubierto |
| Contextualizar en modelos económicos, demográficos o de saturación. | Saturación, diferencia M−N(t) positiva y límites de interpretación del modelo. | Cubierto |

### 1.6. Límites infinitos en el infinito

[Página revisada](../libro/temas/01-limites-y-derivadas/06-limites-infinitos-en-el-infinito.html).

| Requisito del guion | Evidencia en la lección | Resultado |
|---|---|---|
| Estudiar `lim_{x→±∞} f(x)=±∞`. | Define crecimiento o decrecimiento sin cota en ambos extremos. | Cubierto |
| Analizar el comportamiento global de polinomios, racionales y funciones elementales. | Polinomios, cocientes, exponenciales, logaritmo y raíz; seno oscilante como contraste. | Cubierto |
| Determinar el signo final atendiendo al término dominante. | Factorización dominante, tabla de paridad y coeficiente principal. | Cubierto |
| Distinguir crecimiento hacia `+∞`, decrecimiento hacia `−∞` y comportamientos diferentes en ambos extremos. | Ejemplo −2x³+5x²−7 con extremos distintos y ejercicio de grado par. | Cubierto |

### 1.7. Operaciones con límites de funciones

[Página revisada](../libro/temas/01-limites-y-derivadas/07-operaciones-con-limites-de-funciones.html).

| Requisito del guion | Evidencia en la lección | Resultado |
|---|---|---|
| Enunciar y aplicar las propiedades del límite para suma, resta, producto, cociente, potencia y composición cuando se cumplen las condiciones. | Tabla de suma, resta, producto, cociente, potencia, raíz y composición con condiciones. | Cubierto |
| Calcular límites por sustitución directa cuando la función es continua en el punto. | Continuidad de funciones elementales y ejemplos de raíz y logaritmo compuestos. | Cubierto |
| Detectar cuándo la aplicación directa produce una indeterminación. | Denominador con límite cero y cociente cancelable donde la regla directa no decide. | Cubierto |
| Organizar los cálculos justificando cada transformación. | Ejemplo de combinación de límites por numerador, denominador y comprobación. | Cubierto |

### 1.8. Cálculo de límites sencillos

[Página revisada](../libro/temas/01-limites-y-derivadas/08-calculo-de-limites-sencillos.html).

| Requisito del guion | Evidencia en la lección | Resultado |
|---|---|---|
| Resolver límites de polinomios, cocientes de polinomios y expresiones elementales. | Sustitución directa y clasificación inicial con polinomios y cocientes. | Cubierto |
| Tratar indeterminaciones `0/0` mediante factorización, simplificación y racionalización. | Factorización, conjugado y racionalización del examen local. | Cubierto |
| Tratar `∞/∞` mediante comparación de grados o división por la mayor potencia. | División por x² y resultado 5/2 en ambos extremos. | Cubierto |
| Trabajar límites de funciones a trozos mediante límites laterales. | Cálculo de dos ramas en la unión x=1. | Cubierto |
| Relacionar cada cálculo con la información gráfica que proporciona. | Identifica huecos y asíntota horizontal tras las transformaciones. | Cubierto |

### 1.9. Indeterminaciones

[Página revisada](../libro/temas/01-limites-y-derivadas/09-indeterminaciones.html).

| Requisito del guion | Evidencia en la lección | Resultado |
|---|---|---|
| Clasificar las principales formas indeterminadas. | Clasifica las formas en tabla de decisión y potencias positivas. | Cubierto |
| Elegir la técnica adecuada: factorizar, sacar factor común, racionalizar, reducir a común denominador, dividir por la potencia dominante o transformar la expresión. | Métodos algebraicos según estructura, incluidos común denominador y conjugado. | Cubierto |
| Mostrar por qué expresiones con la misma forma indeterminada pueden tener límites distintos. | Tres cocientes de forma 0/0 con conclusiones distintas. | Cubierto |
| Preparar el uso posterior de la regla de L'Hôpital para `0/0` e `∞/∞`. | Sección específica de preparación de L’Hôpital y enlace a 1.18. | Cubierto |

### 1.10. Continuidad

[Página revisada](../libro/temas/01-limites-y-derivadas/10-continuidad.html).

| Requisito del guion | Evidencia en la lección | Resultado |
|---|---|---|
| Definir continuidad de `f` en `x=a` mediante las tres condiciones: existe `f(a)`, existe `lim_{x→a}f(x)` y ambos coinciden. | Tres condiciones y equivalencia con límites laterales y valor en el punto. | Cubierto |
| Estudiar continuidad en intervalos y dominios. | Continuidad en dominios, intervalos y extremos con un solo lado disponible. | Cubierto |
| Clasificar discontinuidades relevantes: evitable, de salto e infinita. | Tabla de discontinuidad evitable, salto e infinita, con ejemplos. | Cubierto |
| Determinar parámetros para que una función definida a trozos sea continua. | Parámetro k=2 y ejemplo del examen b=−2 en la unión. | Cubierto |
| Interpretar la continuidad gráficamente y en modelos reales. | Gráfica descrita mediante hueco o salto y ejemplo de tarifa. | Cubierto |

### 1.11. Función derivada

[Página revisada](../libro/temas/01-limites-y-derivadas/11-funcion-derivada.html).

| Requisito del guion | Evidencia en la lección | Resultado |
|---|---|---|
| Introducir la **tasa de variación media** y pasar a la tasa de variación instantánea. | Incremento y tasa media sobre [a,a+h], seguida de paso al límite. | Cubierto |
| Definir `f'(a)` mediante el límite del cociente incremental. | Definición mediante cociente incremental y límite finito. | Cubierto |
| Interpretar la derivada como pendiente de la tangente y como ritmo instantáneo de cambio. | Pendiente secante/tangente, explorador y coste marginal con unidades. | Cubierto |
| Definir la función derivada `f'(x)`. | Obtiene f′(x)=2x y distingue función derivada de f′(2). | Cubierto |
| Conectar el signo de la derivada con crecimiento y decrecimiento. | Enuncia el criterio de signo sobre un intervalo y advierte que un cero aislado no decide extremo. | Cubierto |

### 1.12. Derivadas laterales

[Página revisada](../libro/temas/01-limites-y-derivadas/12-derivadas-laterales.html).

| Requisito del guion | Evidencia en la lección | Resultado |
|---|---|---|
| Definir derivada por la izquierda y por la derecha. | Define los dos cocientes laterales restando el mismo f(a). | Cubierto |
| Establecer que una función es derivable en un punto cuando ambas derivadas laterales existen y coinciden. | Exige límites finitos coincidentes en punto interior. | Cubierto |
| Analizar esquinas, cúspides y puntos de unión en funciones a trozos. | Esquina de |x|, cúspide, tangente vertical y unión a trozos del examen. | Cubierto |
| Relacionar derivabilidad y continuidad: derivable implica continua, pero continua no implica necesariamente derivable. | Prueba derivable implica continua y contraejemplo |x|. | Cubierto |

### 1.13. Ecuaciones de las rectas tangente y normal

[Página revisada](../libro/temas/01-limites-y-derivadas/13-ecuaciones-de-las-rectas-tangente-y-normal.html).

| Requisito del guion | Evidencia en la lección | Resultado |
|---|---|---|
| Calcular la pendiente tangente como `m=f'(a)`. | Pendiente f′(a) con punto (a,f(a)) y comprobación de derivabilidad. | Cubierto |
| Obtener la recta tangente: `y−f(a)=f'(a)(x−a)`. | Ecuación punto-pendiente de la tangente y ejemplos. | Cubierto |
| Obtener la normal usando pendiente `−1/f'(a)` cuando proceda. | Fórmula de la normal condicionada a f′(a)≠0. | Cubierto |
| Tratar correctamente el caso de tangente horizontal. | Tangente horizontal y normal vertical en el vértice. | Cubierto |
| Resolver problemas en los que se pide punto, pendiente, ecuación o condiciones de tangencia. | Problema de pendiente dada, ejemplo del examen y cálculo general con parámetro b. | Cubierto |

### 1.14. Tabla de derivadas

[Página revisada](../libro/temas/01-limites-y-derivadas/14-tabla-de-derivadas.html).

| Requisito del guion | Evidencia en la lección | Resultado |
|---|---|---|
| Consolidar derivadas de constantes, potencias, exponenciales y logaritmos. | Tabla de constantes, potencias, raíces, exponenciales y logaritmos. | Cubierto |
| Incluir las funciones elementales que formen parte del curso y sus composiciones. | Incluye seno, coseno y tangente, radianes y condiciones de dominio. | Cubierto |
| Evitar la memorización aislada: asociar cada fórmula con ejemplos y con la regla de la cadena cuando corresponda. | Ejemplos de interior lineal y factor de cadena. | Cubierto |
| Entrenar reconocimiento rápido de la estructura de una función antes de derivar. | Rutina para distinguir x³, 3ˣ y e^(3x). | Cubierto |

### 1.15. Reglas de derivación

[Página revisada](../libro/temas/01-limites-y-derivadas/15-reglas-de-derivacion.html).

| Requisito del guion | Evidencia en la lección | Resultado |
|---|---|---|
| Derivada de suma y resta. | Suma, resta y factor constante con hipótesis de derivabilidad. | Cubierto |
| Regla del producto y regla del cociente. | Producto y cociente con denominador no nulo y errores típicos. | Cubierto |
| Derivación de potencias y funciones compuestas. | Potencia compuesta con condiciones según exponente. | Cubierto |
| Combinar varias reglas en una misma expresión. | Producto con exponencial compuesta y cociente con potencia del examen. | Cubierto |
| Simplificar de forma razonable antes o después de derivar y comprobar errores de signos y paréntesis. | Simplifica conservando el dominio; expansión y control del signo menos. | Cubierto |

### 1.16. Regla de la cadena

[Página revisada](../libro/temas/01-limites-y-derivadas/16-regla-de-la-cadena.html).

| Requisito del guion | Evidencia en la lección | Resultado |
|---|---|---|
| Reconocer una composición `f(g(x))`. | Identifica exterior e interior en (3x+1)^4. | Cubierto |
| Aplicar `(f∘g)'(x)=f'(g(x))·g'(x)`. | Enuncia y aplica cadena con hipótesis en el punto imagen. | Cubierto |
| Trabajar composiciones de varios niveles. | Derivación por capas de ln(1+e^(x²)). | Cubierto |
| Aplicarla a potencias, exponenciales y logaritmos compuestos. | Potencias, exponenciales, logaritmos y composiciones del examen. | Cubierto |
| Hacer explícita la identificación de función exterior e interior. | Nombra capas y factores interiores en cada ejemplo. | Cubierto |

### 1.17. Continuidad de las funciones derivables

[Página revisada](../libro/temas/01-limites-y-derivadas/17-continuidad-de-las-funciones-derivables.html).

| Requisito del guion | Evidencia en la lección | Resultado |
|---|---|---|
| Formular y comprender el resultado: si una función es derivable en un punto, entonces es continua en él. | Enuncia el teorema y prueba con incremento igual a cociente por h. | Cubierto |
| Aclarar que el recíproco es falso. | Contraejemplo |x| y distinción de implicación/recíproco. | Cubierto |
| Usar ejemplos gráficos y algebraicos para diferenciar continuidad y derivabilidad. | Explorador de cuatro casos, valor aislado y esquina; cálculos de límites. | Cubierto |
| Aplicar el resultado para descartar derivabilidad en puntos discontinuos. | Contraposición: no continua implica no derivable, con práctica de salto. | Cubierto |

### 1.18. Regla de L'Hôpital. Aplicación al cálculo de límites

[Página revisada](../libro/temas/01-limites-y-derivadas/18-regla-de-l-hopital-aplicacion-al-calculo-de-limites.html).

| Requisito del guion | Evidencia en la lección | Resultado |
|---|---|---|
| Presentar la regla para indeterminaciones `0/0` y `∞/∞` bajo las condiciones correspondientes. | Versión lateral con derivabilidad, g y g′ no nulos y existencia del límite de f′/g′. | Cubierto |
| Derivar numerador y denominador por separado, sin aplicar la regla del cociente. | Explica derivar arriba y abajo y que las fracciones no son idénticas. | Cubierto |
| Repetir la regla cuando siga apareciendo una indeterminación y sea legítimo hacerlo. | Repetición en (eˣ−1−x)/x², verificando hipótesis de cada aplicación. | Cubierto |
| Transformar otras formas indeterminadas antes de aplicar L'Hôpital, cuando el nivel del curso lo requiera. | Transforma x ln x y potencia del examen mediante logaritmo. | Cubierto |
| Comparar L'Hôpital con métodos algebraicos y escoger el procedimiento más eficiente. | Compara con factorización y presenta regla no aplicable y caso donde no decide. | Cubierto |

## Balance y siguiente tanda

- 83 requisitos del guion cotejados en 18 lecciones del tema 1.
- Cero nuevas lagunas teóricas confirmadas en esta pasada de cobertura.
- No se modifica teoría ni se da por realizada la revisión visual/asistida.
- TEO-24B completada en la matriz siguiente; próxima tanda TEO-24C: tema 3. Registrar cualquier carencia antes de redactar su corrección y contrastar después los cálculos afectados.

## Registro

- 2026-11-14 · `docs(teoria-24a)`: matriz del tema 1 completa, con evidencia para cada requisito. TEO-24 sigue abierta hasta revisar los cuatro temas restantes.

## TEO-24B · Resultado del tema 2

Revisadas las nueve lecciones de representación de funciones. Los requisitos del guion disponen de desarrollo localizable; no se confirma una nueva laguna teórica en esta pasada. Se mantiene pendiente la revisión de exploradores, gráficas y lectura matemática en TEO-25. No se modifica HTML.

### 2.1. Esquema general para representar una función

[Página revisada](../libro/temas/02-representacion-de-funciones/01-esquema-general-para-representar-una-funcion.html).

| Requisito del guion | Evidencia en la lección | Resultado |
|---|---|---|
| Establecer un protocolo ordenado: dominio, cortes con ejes, simetrías si son útiles, signo, continuidad, asíntotas, crecimiento/decrecimiento, extremos, curvatura si entra en la programación y comportamiento en los extremos. | Protocolo completo con dominio, cortes, simetría, signo, continuidad, límites, asíntotas, monotonía y extremos; curvatura como ampliación. | Cubierto |
| Utilizar primera derivada para monotonía y extremos. | Ejemplo x³−3x con tabla de signo de f′ y extremos (−1,2) y (1,−2). | Cubierto |
| Integrar los límites en la detección de asíntotas. | Define verticales, horizontales y oblicuas mediante límites y comprobación de diferencia con una recta. | Cubierto |
| Construir una gráfica coherente a partir de la información obtenida y comprobarla cualitativamente. | Boceto por capas, tabla de apoyo y lista de comprobaciones cualitativas. | Cubierto |

### 2.2. Funciones polinómicas

[Página revisada](../libro/temas/02-representacion-de-funciones/02-funciones-polinomicas.html).

| Requisito del guion | Evidencia en la lección | Resultado |
|---|---|---|
| Recordar dominio, ceros, signo y comportamiento para `x→±∞`. | Dominio real, raíces y multiplicidad, signo y extremos infinitos. | Cubierto |
| Relacionar grado y coeficiente principal con el comportamiento global. | Tabla de grado, paridad y coeficiente principal; distingue grado par de función par. | Cubierto |
| Usar derivadas para intervalos de crecimiento/decrecimiento y extremos. | Derivada y tabla de monotonía de (x+1)²(x−2). | Cubierto |
| Representar polinomios de grados habituales en problemas de ciencias sociales. | Estudio de cúbica, práctica de parábola y modelo cuadrático de beneficio. | Cubierto |
| Interpretar máximos, mínimos y puntos de corte en contexto. | Beneficio en cientos de euros, capacidad [0,10], equilibrio y comparación de fronteras; variante con capacidad 4. | Cubierto |

### 2.3. Funciones racionales

[Página revisada](../libro/temas/02-representacion-de-funciones/03-funciones-racionales.html).

| Requisito del guion | Evidencia en la lección | Resultado |
|---|---|---|
| Determinar dominio excluyendo ceros del denominador. | Excluye ceros del denominador original antes de cancelar factores. | Cubierto |
| Calcular cortes con los ejes y estudiar el signo. | Cortes y signo completos del cociente (x²−1)/(x²−x−2). | Cubierto |
| Localizar asíntotas verticales y horizontales; considerar oblicuas cuando corresponda al curso. | Vertical x=2 y horizontal y=1; ejemplo x²/(x−1) con oblicua y=x+1. | Cubierto |
| Estudiar límites y derivada. | Límites laterales, extremos infinitos, derivadas y monotonía por intervalos. | Cubierto |
| Distinguir discontinuidades evitables de asíntotas cuando exista simplificación algebraica. | Hueco en (−1,2/3) frente a vertical en 2; también cancelación con factor remanente en denominador. | Cubierto |

### 2.4. Funciones exponenciales

[Página revisada](../libro/temas/02-representacion-de-funciones/04-funciones-exponenciales.html).

| Requisito del guion | Evidencia en la lección | Resultado |
|---|---|---|
| Estudiar `a^x` y modelos `C·a^x` o equivalentes. | Define aˣ con condiciones de base y estudia C·aˣ+k y C·e^(bx)+k. | Cubierto |
| Diferenciar crecimiento (`a>1`) y decrecimiento (`0<a<1`). | Monotonía y límites según base; efecto adicional del signo de C. | Cubierto |
| Analizar dominio, recorrido, corte con el eje vertical y asíntota horizontal. | Dominio, recorrido, cortes y horizontal en función básica y transformada. | Cubierto |
| Aplicar a crecimiento poblacional, capitalización, depreciación u otros modelos sociales/económicos. | Capitalización hipotética al 5 % y depreciación al 20 %, unidades y tiempos enteros. | Cubierto |
| Representar transformaciones básicas de la exponencial. | Traslación horizontal, escala/reflexión por C y desplazamiento vertical; ejemplo 2−4(1/2)ˣ. | Cubierto |

### 2.5. Funciones logarítmicas

[Página revisada](../libro/temas/02-representacion-de-funciones/05-funciones-logaritmicas.html).

| Requisito del guion | Evidencia en la lección | Resultado |
|---|---|---|
| Definir el logaritmo como inversa de la exponencial. | Definición equivalente a aʸ=x, identidades inversas y reflexión respecto a y=x. | Cubierto |
| Establecer dominio positivo y propiedades gráficas fundamentales. | Argumento positivo, dominio, recorrido y cortes; condiciones de bases. | Cubierto |
| Reconocer asíntota vertical y crecimiento según la base. | Tabla de límites y monotonía; vertical de la básica y de la transformada. | Cubierto |
| Utilizar propiedades de logaritmos cuando sean necesarias para simplificar o resolver. | Producto, cociente, potencia y cambio de base; ecuación con descarte del candidato −1. | Cubierto |
| Aplicar a escalas y modelos de crecimiento con rendimientos decrecientes. | Escala logarítmica hipotética y A(q)=100 ln(1+q), con derivada positiva y segunda derivada negativa. | Cubierto |

### 2.6. Funciones a trozos. Valor absoluto

[Página revisada](../libro/temas/02-representacion-de-funciones/06-funciones-a-trozos-valor-absoluto.html).

| Requisito del guion | Evidencia en la lección | Resultado |
|---|---|---|
| Determinar dominio y expresión válida en cada intervalo. | Evalúa según intervalo y combina sus condiciones con el dominio de cada expresión. | Cubierto |
| Estudiar continuidad en los puntos de unión. | Unión suave, salto, valor aislado y hueco, comparando laterales y valor puntual. | Cubierto |
| Analizar derivabilidad lateral cuando proceda. | Calcula los dos cocientes incrementales en la unión y descarta derivabilidad en el salto. | Cubierto |
| Definir `∣x∣` y transformar expresiones con valor absoluto en funciones a trozos. | Define |x| como distancia y por tramos; desarrolla |x−1|−2 y |x²−4|. | Cubierto |
| Representar e interpretar tarifas, tramos fiscales, costes o modelos con reglas distintas según intervalos. | Tarifa progresiva que conserva el coste previo; distingue precio del exceso de aplicar el nuevo precio a todo. | Cubierto |

### 2.7. Traslaciones

[Página revisada](../libro/temas/02-representacion-de-funciones/07-traslaciones.html).

| Requisito del guion | Evidencia en la lección | Resultado |
|---|---|---|
| Estudiar transformaciones `f(x)+k`, `f(x)−k`, `f(x−a)` y `f(x+a)`. | Regla g(x)=f(x−a)+k y tabla de los cuatro movimientos básicos. | Cubierto |
| Distinguir desplazamientos verticales y horizontales y el sentido correcto del desplazamiento. | Justifica el sentido horizontal resolviendo x−a=u; ejemplo con a negativo. | Cubierto |
| Obtener una gráfica transformada a partir de otra conocida sin repetir todo el estudio analítico. | Transforma puntos, extremos e intervalos; parábola, racional y logaritmo. | Cubierto |
| Analizar cómo cambian dominio, recorrido, cortes y asíntotas. | Transformación de dominio y recorrido, huecos, asíntotas y ecuaciones para recalcular cortes. | Cubierto |

### 2.8. Expansión y contracción

[Página revisada](../libro/temas/02-representacion-de-funciones/08-expansion-y-contraccion.html).

| Requisito del guion | Evidencia en la lección | Resultado |
|---|---|---|
| Estudiar transformaciones del tipo `a·f(x)` y `f(bx)`. | Regla general a·f(bx), con a,b no nulos, y análisis separado de factores cero. | Cubierto |
| Diferenciar escalado vertical y horizontal. | Ordenada multiplicada por a y abscisa dividida por b; factores de expansión/contracción. | Cubierto |
| Incluir reflexiones cuando los factores sean negativos si se trabajan junto a estas transformaciones. | Reflexiones en X e Y para a o b negativos, con ejemplos. | Cubierto |
| Comparar gráficas antes y después de la transformación y razonar el efecto sobre puntos significativos. | Puntos correspondientes, dominio, recorrido, extremos, asíntotas y explorador comparativo. | Cubierto |

### 2.9. Optimización de funciones

[Página revisada](../libro/temas/02-representacion-de-funciones/09-optimizacion-de-funciones.html).

| Requisito del guion | Evidencia en la lección | Resultado |
|---|---|---|
| Traducir problemas reales a una función objetivo y un dominio factible. | Distingue ingreso, beneficio y coste medio; define variable, unidades y dominio factible. | Cubierto |
| Calcular puntos críticos mediante `f'(x)=0` y estudiar extremos. | Candidatos de f′=0, puntos no derivables y tablas de signo; límites de segunda derivada cero. | Cubierto |
| Comprobar extremos del intervalo cuando el dominio esté acotado. | Compara fronteras de [0,24] y capacidad reducida a 8; distingue intervalos abiertos. | Cubierto |
| Interpretar la solución en su contexto y descartar soluciones matemáticas no admisibles. | Descarta q negativo y producción fuera de capacidad; compara enteros vecinos y expresa unidades. | Cubierto |
| Trabajar problemas de beneficio, coste, ingreso, producción, dimensiones u otras magnitudes sociales/económicas. | Beneficio con precio y costes, coste medio y dimensiones de un rectángulo con tres lados vallados. | Cubierto |

Balance TEO-24B: 42 requisitos en nueve lecciones. Total acumulado de temas 1–2: 125 requisitos en 27 lecciones. TEO-24 permanece abierta para temas 3–5.

- 2026-11-14 · `docs(teoria-24b)`: cotejo del tema 2 completo, sin nuevas lagunas de cobertura confirmadas. Siguiente TEO-24C, integrales.

## TEO-24C · Resultado del tema 3

Revisadas las ocho lecciones de integrales, incluido el material de Riemann incorporado posteriormente. Los requisitos del guion tienen desarrollo localizable; no se confirma una nueva laguna teórica en esta pasada. No se modifica HTML.

La separación por cambios de signo se interpreta según el problema: es necesaria para construir el área geométrica por tramos, pero no obligatoria para calcular una integral orientada con una primitiva válida en todo el intervalo. La precisión de 3.7 en este punto es correcta y se conserva. Las ampliaciones de partes y fracciones racionales se evalúan al nivel introductorio que pide el guion, sin exigir todas las técnicas de un curso universitario.

### 3.1. Integral indefinida

[Página revisada](../libro/temas/03-integrales/01-integral-indefinida.html).

| Requisito del guion | Evidencia en la lección | Resultado |
|---|---|---|
| Definir primitiva: `F'(x)=f(x)`. | Define primitiva en un intervalo mediante F′=f. | Cubierto |
| Introducir `∫f(x)dx=F(x)+C` y explicar el papel de la constante de integración. | Introduce la familia F+C y distingue una función particular de la familia. | Cubierto |
| Relacionar familias de primitivas que difieren en una constante. | Justifica que dos primitivas difieren en una constante en un intervalo; constantes independientes en lados separados de cero. | Cubierto |
| Comprobar resultados derivando la primitiva obtenida. | Ejemplos verifican la derivada y, si procede, el dato inicial; coste marginal y coste fijo. | Cubierto |

### 3.2. Integrales inmediatas

[Página revisada](../libro/temas/03-integrales/02-integrales-inmediatas.html).

| Requisito del guion | Evidencia en la lección | Resultado |
|---|---|---|
| Construir una tabla básica a partir de la tabla de derivadas. | Tabla con fórmula, dominio y derivada de comprobación, incluida excepción n=−1. | Cubierto |
| Integrar potencias, constantes, exponenciales y funciones elementales del programa. | Constantes, potencias, raíces, exponenciales y seno/coseno ya incluidos en la tabla de derivadas. | Cubierto |
| Aplicar linealidad: integral de una suma y extracción de constantes. | Linealidad formulada mediante primitivas de sumandos y factores constantes. | Cubierto |
| Reconocer patrones sin recurrir a métodos más complejos. | Ejemplos reescriben potencias y reconocen patrones; advierte que no se separan productos. | Cubierto |

### 3.3. Integrales casi inmediatas

[Página revisada](../libro/temas/03-integrales/03-integrales-casi-inmediatas.html).

| Requisito del guion | Evidencia en la lección | Resultado |
|---|---|---|
| Reconocer expresiones que contienen una función y, salvo constante, su derivada. | Identifica u, u′ y ajuste constante λ; exige igualdad de funciones. | Cubierto |
| Trabajar formas como `f'(x)[f(x)]^n`, `f'(x)/f(x)` y exponenciales compuestas. | Tabla de u′uⁿ, u′/u, exponenciales y trigonométricas compuestas con condiciones. | Cubierto |
| Ajustar constantes multiplicativas. | Ejemplos con factores 1/3, 3/2, 5/2 y signos negativos; no se usa un ajuste variable. | Cubierto |
| Relacionar este procedimiento con la regla de la cadena "al revés". | Enuncia y comprueba cadena al revés, con verificación de cada primitiva. | Cubierto |

### 3.4. Métodos de integración

[Página revisada](../libro/temas/03-integrales/04-metodos-de-integracion.html).

| Requisito del guion | Evidencia en la lección | Resultado |
|---|---|---|
| Sistematizar los métodos exigidos por el currículo/libro: simplificación algebraica, cambio de variable sencillo y otros métodos que se desarrollen en la unidad. | Desarrolla producto, división algebraica, cancelación conservando dominio y cambio de variable. | Cubierto |
| Elegir el método según la estructura del integrando. | Guía de decisión por estructura y advertencia de que puede haber varios métodos válidos. | Cubierto |
| Incluir descomposición o integración por partes solo en la profundidad que corresponda al curso. | Descomposición elemental y partes identificadas como ampliaciones; ejemplos xeˣ y ln x. | Cubierto |
| Verificar siempre que sea posible mediante derivación. | Cada ejemplo deriva el resultado y revisa dominio; práctica con condición inicial. | Cubierto |

### 3.5. Integral definida

[Página revisada](../libro/temas/03-integrales/05-integral-definida.html).

| Requisito del guion | Evidencia en la lección | Resultado |
|---|---|---|
| Introducir `∫_a^b f(x)dx` como acumulación y área con signo. | Define acumulación mediante sumas de puntos medios e integral como su límite para función continua. | Cubierto |
| Diferenciar integral definida y área geométrica. | Expresa integral=A₊−A₋ y área=A₊+A₋, con condiciones sobre orientación. | Cubierto |
| Estudiar propiedades: cambio de límites, aditividad por intervalos y linealidad. | Tabla de extremos iguales, cambio de límites, aditividad y linealidad. | Cubierto |
| Interpretar gráficamente el signo de la integral según la posición respecto al eje X. | Ejemplos de rectángulos y recta que cruza el eje; explorador de signo y Riemann. | Cubierto |

### 3.6. Teorema fundamental del cálculo

[Página revisada](../libro/temas/03-integrales/06-teorema-fundamental-del-calculo.html).

| Requisito del guion | Evidencia en la lección | Resultado |
|---|---|---|
| Conectar derivación e integración. | Teorema A′=f y función de acumulación como primitiva con A(a)=0. | Cubierto |
| Explicar que una función acumulación construida mediante integral tiene como derivada el integrando bajo las condiciones adecuadas. | Enuncia continuidad del integrando e interior del intervalo, con derivadas laterales en extremos. | Cubierto |
| Utilizar el teorema como base conceptual de la regla de Barrow. | A(x)=F(x)−F(a) y sustitución x=b como puente a Barrow. | Cubierto |
| Interpretar el resultado como vínculo entre variación instantánea y acumulación. | Interpreta altura de f como pendiente de A y distingue tasa, variación y cantidad inicial. | Cubierto |

### 3.7. Regla de Barrow

[Página revisada](../libro/temas/03-integrales/07-regla-de-barrow.html).

| Requisito del guion | Evidencia en la lección | Resultado |
|---|---|---|
| Calcular `∫_a^b f(x)dx = F(b)−F(a)` a partir de una primitiva. | Enuncia F(b)−F(a) con continuidad y primitiva válida en el intervalo. | Cubierto |
| Organizar correctamente sustitución de extremos y signos. | Procedimiento de evaluaciones separadas y paréntesis, con límites negativos e invertidos. | Cubierto |
| Resolver integrales definidas exactas. | Resultados exactos polinómicos, logarítmicos y exponenciales; diferencia exacto/aproximado. | Cubierto |
| Dividir el intervalo cuando la función cambie de expresión o de signo. | Separa ramas y estudia signos para áreas. Aclara correctamente que un cambio de signo no obliga a partir una integral orientada si existe primitiva global; advierte de singularidades. | Cubierto |

### 3.8. Aplicaciones de la integral

[Página revisada](../libro/temas/03-integrales/08-aplicaciones-de-la-integral.html).

| Requisito del guion | Evidencia en la lección | Resultado |
|---|---|---|
| Calcular áreas entre una curva y el eje X. | Define área con el eje mediante integral de |f| y desarrolla parábola, curva negativa y varios signos. | Cubierto |
| Calcular áreas entre dos curvas determinando previamente los puntos de corte. | Área entre curvas con |f−g|, ecuación f=g y recta/parábola con límites de intersección. | Cubierto |
| Dividir en tramos cuando cambia qué función queda por encima o cambia el signo. | Ordena cortes, prueba el orden por tramos y desarrolla tres regiones con x² y x. | Cubierto |
| Usar valor absoluto o suma de áreas positivas para obtener área geométrica. | Suma áreas positivas y contrasta con valor absoluto de integral total, que puede no coincidir. | Cubierto |
| Aplicar la integral a acumulaciones en contextos económicos o sociales cuando el modelo lo permita. | Solicitudes acumuladas y saldo de caja con tasa neta, dato inicial y unidades; distingue variación neta y total. | Cubierto |

Balance TEO-24C: 33 requisitos en ocho lecciones. Total acumulado de temas 1–3: 158 requisitos en 35 lecciones. TEO-24 sigue abierta para temas 4–5. Revisión visual y asistida pendiente en TEO-25.

- 2026-11-14 · `docs(teoria-24c)`: cotejo del tema 3 completo, sin nuevas lagunas de cobertura confirmadas. Siguiente TEO-24D, matrices y determinantes.

## TEO-24D · Resultado del tema 4

Revisadas las doce lecciones de matrices y determinantes, sus explicaciones y ejemplos pertinentes a los requisitos. No se confirma una nueva laguna teórica respecto del guion en esta pasada. No se modifica HTML.

Se conservan las precisiones de la web: Adj(A) ya incorpora la traspuesta de los cofactores; un coeficiente singular requiere estudiar el término independiente; las potencias de adyacencia cuentan recorridos con repetición y longitud exacta. La revisión de cobertura no certifica todas las operaciones de los editores ni sus representaciones visuales; TEO-25 sigue pendiente.

### 4.1. Matrices: definición, características y tipos

[Página revisada](../libro/temas/04-matrices-y-determinantes/01-matrices-definicion-caracteristicas-y-tipos.html).

| Requisito del guion | Evidencia en la lección | Resultado |
|---|---|---|
| Definir matriz, orden `m×n`, filas, columnas y elementos `a_ij`. | Define matriz real, orden m×n, filas, columnas y aᵢⱼ con límites de índices. | Cubierto |
| Identificar matrices fila, columna, rectangular, cuadrada, nula, diagonal, escalar e identidad. | Tabla de los ocho tipos pedidos y relaciones de inclusión; caso 1×1 y nula rectangular. | Cubierto |
| Introducir igualdad de matrices. | Mismo orden y todas las entradas correspondientes iguales; ejemplo de contradicción en otra casilla. | Cubierto |
| Interpretar matrices como tablas de datos en contextos económicos y sociales. | Tabla de ventas por tienda y producto, con etiquetas y unidades. | Cubierto |

### 4.2. Operaciones con matrices

[Página revisada](../libro/temas/04-matrices-y-determinantes/02-operaciones-con-matrices.html).

| Requisito del guion | Evidencia en la lección | Resultado |
|---|---|---|
| Suma y resta de matrices del mismo orden. | Suma/resta por entradas con exigencia de mismo orden; opuesta y signos. | Cubierto |
| Producto de una matriz por un escalar. | Producto αA por cada entrada y distinción de operación frente a matriz escalar. | Cubierto |
| Propiedades de estas operaciones. | Tabla de conmutatividad/asociatividad de suma, neutro, opuesta y distributivas; resta no conmutativa. | Cubierto |
| Interpretar operaciones en términos de datos agregados, diferencias o cambios. | Ventas de dos semanas, agregación, diferencias negativas como descenso y media semanal. | Cubierto |

### 4.3. Producto de matrices

[Página revisada](../libro/temas/04-matrices-y-determinantes/03-producto-de-matrices.html).

| Requisito del guion | Evidencia en la lección | Resultado |
|---|---|---|
| Establecer la condición de compatibilidad de dimensiones. | Condición columnas de A igual a filas de B y ejemplos compatibles/incompatibles. | Cubierto |
| Calcular cada elemento mediante producto fila por columna. | Fórmula cᵢⱼ=Σₖaᵢₖbₖⱼ y procedimiento fila por columna. | Cubierto |
| Determinar el orden de la matriz resultante. | Resultado m×p para (m×n)(n×p), conservando dimensiones exteriores. | Cubierto |
| Señalar que, en general, `AB≠BA`. | Explica los tres problemas al invertir factores y contraejemplo cuadrado PQ≠QP. | Cubierto |
| Aplicar el producto a transformaciones y modelos de datos. | Ventas por precios con ingreso 101/98 euros y composición de escala y giro en vectores columna. | Cubierto |

### 4.4. Potencia de una matriz

[Página revisada](../libro/temas/04-matrices-y-determinantes/04-potencia-de-una-matriz.html).

| Requisito del guion | Evidencia en la lección | Resultado |
|---|---|---|
| Definir `A^n` para matrices cuadradas. | Define Aⁿ para matriz cuadrada y exponentes enteros no negativos; todas las potencias conservan orden. | Cubierto |
| Calcular potencias sencillas y reconocer patrones. | Calcula A² y A³ y justifica patrones diagonal, alternante, nilpotente e idempotente. | Cubierto |
| Utilizar identidad `A^0=I` cuando corresponda. | Define A⁰=I incluso en base singular o nula, diferenciando de potencias entrada a entrada. | Cubierto |
| Aplicar potencias a procesos iterativos sencillos si aparecen en problemas. | Modelo iterativo de incremento fijo con Tⁿ y estado 10+3n. | Cubierto |

### 4.5. Comparación de matrices. Matriz simétrica y matriz antisimétrica

[Página revisada](../libro/temas/04-matrices-y-determinantes/05-comparacion-de-matrices-matriz-simetrica-y-matriz-antisimetrica.html).

| Requisito del guion | Evidencia en la lección | Resultado |
|---|---|---|
| Comparar matrices mediante igualdad elemento a elemento. | Igualdad por entradas y determinación de parámetros con comprobación completa. | Cubierto |
| Definir traspuesta `A^T`. | Define traspuesta y cambio de orden m×n a n×m; conserva signos. | Cubierto |
| Caracterizar matrices simétricas mediante `A=A^T`. | Aᵀ=A, cuadrada, y ejemplo de distancias recíprocas. | Cubierto |
| Caracterizar matrices antisimétricas mediante `A^T=−A`. | Aᵀ=−A y ejemplo de transferencias F−Fᵀ. | Cubierto |
| Analizar las consecuencias sobre la diagonal de una matriz antisimétrica. | Deriva diagonal cero y explica que es necesaria pero no suficiente. | Cubierto |

### 4.6. Determinante de una matriz

[Página revisada](../libro/temas/04-matrices-y-determinantes/06-determinante-de-una-matriz.html).

| Requisito del guion | Evidencia en la lección | Resultado |
|---|---|---|
| Definir determinante para matrices cuadradas. | Define determinante como número de matriz cuadrada; no asigna determinante a rectangular. | Cubierto |
| Calcular determinantes de orden 2 y 3 por los procedimientos del curso. | Fórmula ad−bc y Sarrus con sus seis productos; solo válido para orden 3. | Cubierto |
| Relacionar determinante no nulo con invertibilidad. | Criterio det(A)≠0 de invertibilidad, válido también para determinante negativo. | Cubierto |
| Usar el determinante como herramienta posterior para rango y sistemas. | Relaciona determinante con rango y solución única; ejemplos de singular compatible/incompatible. | Cubierto |

### 4.7. Propiedades de los determinantes

[Página revisada](../libro/temas/04-matrices-y-determinantes/07-propiedades-de-los-determinantes.html).

| Requisito del guion | Evidencia en la lección | Resultado |
|---|---|---|
| Trabajar el efecto de intercambiar filas/columnas, multiplicarlas por escalares o sumar múltiplos. | Tabla de intercambio, escalado y suma de múltiplo con sus efectos; distingue operaciones sucesivas. | Cubierto |
| Usar triangularidad y factores comunes para simplificar cálculos. | Triangularidad y producto de diagonal, extracción de factores por fila y creación de ceros. | Cubierto |
| Incluir `det(AB)=det(A)det(B)` y `det(A^T)=det(A)` cuando formen parte del nivel. | Incluye det(Aᵀ)=det(A), det(AB)=det(A)det(B) con órdenes adecuados. | Cubierto |
| Evitar cálculos largos mediante propiedades. | Ejemplos de triangularización y dependencias para evitar desarrollar todos los productos. | Cubierto |

### 4.8. Desarrollo de un determinante

[Página revisada](../libro/temas/04-matrices-y-determinantes/08-desarrollo-de-un-determinante.html).

| Requisito del guion | Evidencia en la lección | Resultado |
|---|---|---|
| Introducir menores y cofactores/adjuntos. | Distingue submatriz, menor Mᵢⱼ, cofactor Cᵢⱼ y aportación aᵢⱼCᵢⱼ. | Cubierto |
| Desarrollar por una fila o columna. | Fórmulas de Laplace por fila y columna y ejemplos que coinciden. | Cubierto |
| Elegir filas o columnas con ceros para simplificar. | Recomienda línea con ceros y omitir aportaciones nulas; ejemplo de orden 4. | Cubierto |
| Aplicar el desarrollo a determinantes de orden superior dentro de lo exigido. | Reduce orden 4 a 3 y 2, con resultado −36; advierte que Sarrus no se extiende a 4×4. | Cubierto |

### 4.9. Matriz inversa y matriz adjunta

[Página revisada](../libro/temas/04-matrices-y-determinantes/09-matriz-inversa-y-matriz-adjunta.html).

| Requisito del guion | Evidencia en la lección | Resultado |
|---|---|---|
| Definir `A^{-1}` mediante `AA^{-1}=A^{-1}A=I`. | Define inversa cuadrada con ambos productos iguales a identidad; demuestra unicidad. | Cubierto |
| Establecer que existe si `det(A)≠0`. | Criterio det(A)≠0 y tratamiento de singularidad y parámetros. | Cubierto |
| Calcular la inversa mediante adjunta y determinante cuando se use este método. | Convención Adj(A)=Cᵀ explícita, identidad con det(A)I y fórmula de inversa. | Cubierto |
| Comprobar el resultado por multiplicación. | Ejemplos exactos de orden 2 y 3 verifican ambos productos. | Cubierto |
| Utilizar la inversa en ecuaciones matriciales y sistemas. | Resuelve AX=B y XA=B por lados correctos y sistema de precios de cuaderno/bolígrafo. | Cubierto |

### 4.10. Rango de una matriz

[Página revisada](../libro/temas/04-matrices-y-determinantes/10-rango-de-una-matriz.html).

| Requisito del guion | Evidencia en la lección | Resultado |
|---|---|---|
| Definir rango como número máximo de filas/columnas linealmente independientes o mediante menores no nulos, según el enfoque del curso. | Define independencia de filas/columnas y rango; equivalencia con máximo orden de menor no nulo. | Cubierto |
| Calcularlo mediante determinantes y/o reducción por filas. | Desarrolla menores y reducción escalonada por pivotes; exige justificar cota inferior y superior. | Cubierto |
| Relacionarlo con dependencia de ecuaciones y con el teorema de Rouché-Frobenius. | Relaciona rango de A y ampliada con Rouché-Frobenius; ejemplos con términos 3/6 y 3/7. | Cubierto |
| Distinguir rango de orden y número de incógnitas. | Distingue tamaño, rango y número de incógnitas; matriz 2×4 y límite min(m,n). | Cubierto |

### 4.11. Ecuaciones matriciales

[Página revisada](../libro/temas/04-matrices-y-determinantes/11-ecuaciones-matriciales.html).

| Requisito del guion | Evidencia en la lección | Resultado |
|---|---|---|
| Resolver ecuaciones como `AX=B`, `XA=B` y variantes. | Resuelve AX=B, XA=B, AX+C=B, AX−X=B y AXD=B. | Cubierto |
| Respetar el orden de multiplicación. | Explica asociación sin reordenación y cancelación por el lado adecuado. | Cubierto |
| Utilizar inversas cuando existan. | Comprueba invertibilidad de la matriz agrupada; si es singular usa ecuaciones escalares. | Cubierto |
| Comprobar dimensiones y solución. | Determina dimensiones de X, incluida rectangular, y verifica sustitución en la ecuación original. | Cubierto |
| Traducir ecuaciones matriciales a sistemas cuando sea útil. | Traduce entradas de AX=B singular a un sistema, con dos parámetros libres o contradicción. | Cubierto |

### 4.12. Grafos y matriz de adyacencia asociada

[Página revisada](../libro/temas/04-matrices-y-determinantes/12-grafos-y-matriz-de-adyacencia-asociada.html).

| Requisito del guion | Evidencia en la lección | Resultado |
|---|---|---|
| Introducir vértices, aristas y relaciones básicas de un grafo. | Define vértices, aristas, grafo simple y dirigido como ampliación; vértice aislado. | Cubierto |
| Construir una matriz de adyacencia a partir de una red. | Construye adyacencia fijando orden de vértices y usando fila origen/columna destino. | Cubierto |
| Interpretar los elementos de la matriz. | Interpreta entradas binarias, grados y conteo de aristas/arcos. | Cubierto |
| Relacionar potencias de la matriz con recorridos/conexiones cuando corresponda. | Aᵏ cuenta recorridos de longitud exacta con repetición; explica A⁰ y que no cuenta solo caminos simples. | Cubierto |
| Aplicar a redes de transporte, comunicación o relaciones. | Estaciones en cadena, red circular y calles de sentido único; distingue conexión de distancia o probabilidad. | Cubierto |

Balance TEO-24D: 53 requisitos en doce lecciones. Acumulado de temas 1–4: 211 requisitos en 47 lecciones. TEO-24 permanece abierta para el tema 5.

- 2026-11-14 · `docs(teoria-24d)`: cotejo del tema 4 completo, sin nuevas lagunas de cobertura confirmadas. Siguiente TEO-24E, sistemas de ecuaciones.

## TEO-24E · Resultado del tema 5

Revisadas las once lecciones de sistemas, sus explicaciones y ejemplos pertinentes al guion. No se confirma una nueva laguna de cobertura teórica. No se modifica HTML.

Se preservan las distinciones correctas entre comprobar y resolver, clasificar y describir soluciones, parámetros del sistema y parámetros libres. La condición de no anulación se comprueba antes de aplicar inversa o Cramer y antes de dividir por expresiones con parámetros. La revisión de cobertura no certifica todos los generadores ni la presentación visual de los sistemas.

### 5.1. Sistemas de ecuaciones lineales

[Página revisada](../libro/temas/05-sistemas-de-ecuaciones/01-sistemas-de-ecuaciones-lineales.html).

| Requisito del guion | Evidencia en la lección | Resultado |
|---|---|---|
| Definir ecuación lineal y sistema lineal. | Define ecuación lineal, distingue expresiones no lineales y reúne m ecuaciones con n incógnitas. | Cubierto |
| Identificar incógnitas, coeficientes y términos independientes. | Identifica coeficientes, términos independientes y ceros implícitos al ordenar. | Cubierto |
| Expresar un sistema en forma algebraica. | Forma general y ejemplo de venta de entradas con unidades y restricciones contextuales. | Cubierto |
| Interpretar una solución como valores que satisfacen simultáneamente todas las ecuaciones. | Define tupla ordenada y simultaneidad; candidata (6,4) falla una de las dos ecuaciones. | Cubierto |

### 5.2. Solución de un sistema de ecuaciones

[Página revisada](../libro/temas/05-sistemas-de-ecuaciones/02-solucion-de-un-sistema-de-ecuaciones.html).

| Requisito del guion | Evidencia en la lección | Resultado |
|---|---|---|
| Definir solución única, múltiples soluciones y ausencia de solución. | Describe conjuntos vacío, unitario y familia parametrizada; justifica por linealidad que dos soluciones distintas implican infinitas. | Cubierto |
| Comprobar una solución por sustitución. | Verifica parejas y fracciones exactas en ambas ecuaciones; distingue comprobación de resolución. | Cubierto |
| Interpretar geométricamente sistemas de dos incógnitas como intersección de rectas. | Secantes, paralelas distintas y coincidentes; incluye recta vertical e intersección fuera de ventana. | Cubierto |
| Conectar el concepto de solución con el posterior estudio de compatibilidad. | Define compatible/incompatible y enlaza con la clasificación de 5.3. | Cubierto |

### 5.3. Clasificación de sistemas de ecuaciones según sus soluciones

[Página revisada](../libro/temas/05-sistemas-de-ecuaciones/03-clasificacion-de-sistemas-de-ecuaciones-segun-sus-soluciones.html).

| Requisito del guion | Evidencia en la lección | Resultado |
|---|---|---|
| Sistema compatible determinado (SCD): una única solución. | Define SCD con única tupla y ejemplo x+y=3, x−y=1. | Cubierto |
| Sistema compatible indeterminado (SCI): infinitas soluciones. | Define SCI con familia completa; ejemplo (t,4−t) y justificación de que no faltan soluciones. | Cubierto |
| Sistema incompatible (SI): ninguna solución. | Define SI y lo demuestra por contradicción 0=1. | Cubierto |
| Reconocer cada caso algebraica, matricial y, cuando sea posible, geométricamente. | Tabla geométrica, primera lectura de ampliada, identidades y contradicciones; distingue dimensión de compatibilidad. | Cubierto |

### 5.4. Notación matricial de un sistema de ecuaciones

[Página revisada](../libro/temas/05-sistemas-de-ecuaciones/04-notacion-matricial-de-un-sistema-de-ecuaciones.html).

| Requisito del guion | Evidencia en la lección | Resultado |
|---|---|---|
| Construir matriz de coeficientes `A`, vector de incógnitas `X` y vector independiente `B`. | Construye A, X y B con posiciones y dimensiones para m ecuaciones/n incógnitas. | Cubierto |
| Escribir `AX=B`. | Justifica AX=B por el producto fila por columna y sus componentes. | Cubierto |
| Construir la matriz ampliada `(A∣B)`. | Define (A|B), tamaño m×(n+1), significado de la barra y lectura inversa. | Cubierto |
| Usar esta notación en métodos de resolución y clasificación. | Conecta ampliada con equivalencia/Gauss y rangos; advierte que escribir matrices no resuelve el sistema. | Cubierto |

### 5.5. Sistemas equivalentes

[Página revisada](../libro/temas/05-sistemas-de-ecuaciones/05-sistemas-equivalentes.html).

| Requisito del guion | Evidencia en la lección | Resultado |
|---|---|---|
| Definir sistemas con el mismo conjunto de soluciones. | Define equivalencia por igualdad exacta de conjuntos solución, no solo mismo tipo o una candidata común. | Cubierto |
| Justificar las transformaciones elementales de ecuaciones: intercambio, multiplicación por escalar no nulo y suma de múltiplos. | Tres operaciones reversibles, inversa de cada operación y condición escalar no nulo. | Cubierto |
| Relacionarlas con operaciones elementales por filas. | Cada operación actúa sobre toda la fila de (A|B), incluidos términos independientes. | Cubierto |
| Preparar el método de Gauss. | Ejemplo de eliminación que prepara Gauss y ejemplos de pérdida de información al escalar por cero o sustituir ambas filas. | Cubierto |

### 5.6. Teorema de Rouché-Frobenius

[Página revisada](../libro/temas/05-sistemas-de-ecuaciones/06-teorema-de-rouche-frobenius.html).

| Requisito del guion | Evidencia en la lección | Resultado |
|---|---|---|
| Enunciar el criterio: compatibilidad cuando `rg(A)=rg(A∣B)`. | Enuncia igualdad de rangos como condición necesaria y suficiente de compatibilidad. | Cubierto |
| Distinguir SCD y SCI comparando además el rango con el número de incógnitas. | Compara rango común con n incógnitas; cuenta n−r parámetros solo en casos compatibles. | Cubierto |
| Aplicarlo a sistemas concretos. | Ejemplo con det(A)=−3 y rangos 2; interpretación de menores y ampliada. | Cubierto |
| Utilizarlo especialmente en discusión de sistemas con parámetros. | Discute λ²−1: SCD fuera de ±1, SCI en 1 y SI en −1, con menor ampliado no nulo. | Cubierto |

### 5.7. Resolución de sistemas. Matriz inversa

[Página revisada](../libro/temas/05-sistemas-de-ecuaciones/07-resolucion-de-sistemas-matriz-inversa.html).

| Requisito del guion | Evidencia en la lección | Resultado |
|---|---|---|
| Resolver `AX=B` como `X=A^{-1}B` cuando `A` sea cuadrada e invertible. | Deriva X=A⁻¹B multiplicando a izquierda y comprueba existencia/unicidad. | Cubierto |
| Verificar la condición `det(A)≠0`. | Exige A cuadrada y det(A)≠0; distingue singular de rectangular. | Cubierto |
| Valorar cuándo el método es adecuado. | Valora inversa conocida o reutilizable y alternativa de Gauss cuando el cálculo se alarga. | Cubierto |
| Comprobar la solución en el sistema original. | Ejemplo det(A)=−3 y solución (1,2), verificada en las ecuaciones originales. | Cubierto |

### 5.8. Resolución de sistemas. Método de Gauss

[Página revisada](../libro/temas/05-sistemas-de-ecuaciones/08-resolucion-de-sistemas-metodo-de-gauss.html).

| Requisito del guion | Evidencia en la lección | Resultado |
|---|---|---|
| Transformar la matriz ampliada mediante operaciones elementales. | Transformaciones reversibles sobre toda la ampliada, incluida última columna. | Cubierto |
| Obtener forma escalonada. | Define forma escalonada y pivotes; algoritmo con intercambio y salto de columna si procede. | Cubierto |
| Resolver por sustitución hacia atrás. | Ejemplo de tres incógnitas obtiene z=3, después y=2 y x=1. | Cubierto |
| Detectar filas incompatibles y variables libres. | Distingue fila contradictoria y fila nula; familias con una o dos variables libres y columnas sin pivote. | Cubierto |
| Usar Gauss tanto para resolver como para clasificar sistemas. | Clasifica por contradicciones/pivotes y resuelve sistemas cuadrados o rectangulares. | Cubierto |

### 5.9. Resolución de sistemas. Regla de Cramer

[Página revisada](../libro/temas/05-sistemas-de-ecuaciones/09-resolucion-de-sistemas-regla-de-cramer.html).

| Requisito del guion | Evidencia en la lección | Resultado |
|---|---|---|
| Aplicar a sistemas cuadrados con `det(A)≠0`. | Condición de sistema n×n y Δ=det(A) no nulo. | Cubierto |
| Construir los determinantes asociados a cada incógnita. | Sustituye columna i por B para construir Aᵢ, sin modificar las restantes. | Cubierto |
| Calcular `x_i=det(A_i)/det(A)`. | Fórmula xᵢ=Δᵢ/Δ y ejemplo de determinantes negativos con resultado (1,2). | Cubierto |
| Reconocer sus limitaciones y compararla con Gauss. | Compara n+1 determinantes con Gauss, trata numeradores nulos y det(A)=0 sin dividir. | Cubierto |

### 5.10. Sistemas homogéneos

[Página revisada](../libro/temas/05-sistemas-de-ecuaciones/10-sistemas-homogeneos.html).

| Requisito del guion | Evidencia en la lección | Resultado |
|---|---|---|
| Definir sistemas con términos independientes nulos. | Define AX=0 tras ordenar, sin confundir B nulo con A nula. | Cubierto |
| Señalar que siempre poseen la solución trivial. | A0=0 garantiza compatibilidad y define solución trivial frente a no trivial. | Cubierto |
| Determinar cuándo existen soluciones no triviales. | Rango r<n da variables libres; explica que una no trivial implica infinitas sobre los reales. | Cubierto |
| Relacionar con rango y determinante en sistemas cuadrados. | Para cuadrada: det(A)≠0 solo trivial; det(A)=0 no triviales. Rectangulares mediante rango. | Cubierto |

### 5.11. Discusión de sistemas con parámetros

[Página revisada](../libro/temas/05-sistemas-de-ecuaciones/11-discusion-de-sistemas-con-parametros.html).

| Requisito del guion | Evidencia en la lección | Resultado |
|---|---|---|
| Identificar valores del parámetro que cambian rangos o determinantes. | Identifica raíces de determinantes, menores y pivotes; admite determinante idénticamente cero y matriz rectangular. | Cubierto |
| Separar casos antes de resolver. | Separa casos antes de dividir por λ−1 y distingue parámetro del sistema de variables libres. | Cubierto |
| Aplicar Rouché-Frobenius para clasificar cada caso. | Ejemplos clasifican con rangos A/ampliada en valores generales y críticos. | Cubierto |
| Resolver los casos compatibles cuando se solicite. | Resuelve familias compatibles y comprueba fórmulas en ecuaciones originales. | Cubierto |
| Presentar la discusión final de forma exhaustiva y ordenada. | Casos disjuntos y exhaustivos, incluida raíz doble y cambio de número de libres aunque siga siendo SCI. | Cubierto |

## Cierre de TEO-24

Completado el cotejo de 257 requisitos del guion en 58 lecciones de los temas 1–5. Todos tienen evidencia de cobertura textual en la matriz. No se han confirmado nuevas lagunas teóricas respecto de ese guion en esta pasada y no ha sido necesario modificar HTML.

Este cierre no equivale a certificar cada cálculo de todos los ejercicios, cada generador ni la accesibilidad de las páginas. TEO-25 sigue pendiente para fórmulas, lectura estática, presentación y tecnologías de apoyo; TEO-26, para alinear herramientas con las ampliaciones.

- 2026-11-14 · `docs(teoria-24e)`: cotejo de 46 requisitos en once lecciones del tema 5; cierre de cobertura TEO-24. Próxima tarea TEO-25, revisión de presentación y lectura de fórmulas.

# P03 · Revisión editorial de evaluaciones

14 de noviembre de 2026. Seguimiento por tandas. TEO-25E3–E4 siguen pendientes de escucha real; esta revisión puede avanzar de forma independiente.

- [x] **P03A:** aclarar el ejemplo de variable discreta no entera en 8.1 y en la tarjeta `fc-t08-original-01`; regenerar el glosario y comprobar coherencia.
- [x] **P03B:** revisar las 22 tarjetas de distribuciones: vocabulario, condiciones, extremos, colas y aproximaciones; registrar incidencias y cambios concretos.
- [x] **P03C:** revisar las 37 tarjetas y 20 preguntas base de inferencia: supuestos, interpretación, unidades, redondeos y alternativas.
  - [x] P03C1: 37 tarjetas, definiciones y condiciones.
  - [x] P03C2: 20 preguntas, opciones, pistas, soluciones y retroalimentación.
- [x] **P03D:** revisar las 19 tarjetas de programación lineal: factibilidad, fronteras, existencia de extremos y distinción real/entera.
- [x] **P03E:** revisar las 23 tarjetas bidimensionales, dos de combinatoria y diez preguntas de combinatoria: condiciones, unidades y sentido de los ajustes.
  - [x] P03E1: 23 tarjetas bidimensionales.
  - [x] P03E2: dos tarjetas y diez preguntas de combinatoria.
- [ ] **P03F:** organizar la revisión del resto de las preguntas y tarjetas de los temas 1–5 y probabilidad; concluir con evidencias por ámbito. Las tandas anteriores no acreditan revisar estos bancos completos.

Cada tanda registra qué elementos se han leído, qué se corrige y cómo se ha verificado. No se cambia la calificación editorial de un tema completo sólo por revisar una tarjeta o superar pruebas de funcionamiento.

## Registro

- `plan(p03)`: indexadas seis tandas; primera intervención, el ejemplo no entero de una variable discreta.

## P03A · Variable discreta con valores no enteros

Revisado el caso concreto `fc-t08-original-01`. Su definición era correcta, pero el ejemplo entero no ilustraba la posibilidad de valores no enteros. Se conserva el ID y la pregunta; el reverso ahora usa un premio con dos importes posibles, 0,50 € o 1,50 €, y mantiene el número de hijos como contraste de valores enteros.

La lección 8.1 incorpora el ejemplo didáctico `#discreta-no-entera`: una moneda equilibrada asigna cada importe con probabilidad 1/2. La distribución se ha contrastado enumerando cara y cruz con aritmética racional; las probabilidades suman uno. Se identifica como ejemplo didáctico añadido, no como ejercicio de examen original. El glosario se regenera desde la tarjeta, sin duplicar su definición.

Verificación de la tanda: seis pruebas de catálogo/glosario superadas; `distribution-cards-import-91-browser.cjs`, ejecutada desde la carpeta web, supera las comprobaciones del archivo original, las 22 tarjetas, filtros, fórmulas, teclado, raíz/subcarpeta, móvil y recarga. Prueba adicional del apartado nuevo a 360 px: fórmula renderizada, sin errores ni desbordamiento; captura `../tmp/p03/discreta-no-entera.png` inspeccionada. Glosario sincronizado y enlaces de 190 páginas sin pendientes. Los originales permanecen intactos.

Recuentos sin cambios: 107 fórmulas del formulario, 69 términos, 420 tarjetas y 398 preguntas base. Esta tanda revisa una tarjeta y su ejemplo; P03 sigue abierta para el resto del inventario. La última batería general registrada, anterior a este ajuste de contenido, es la de MNT-SEL-01/02: 390 pruebas superadas.

- `fix(p03a)`: ejemplo no entero aclarado en lección, tarjeta y glosario. Siguiente P03B: revisión de las 22 tarjetas de distribuciones. TEO-25E3–E4, escucha real y revisión de incidencias, siguen pendientes.

## P03B · Revisión de las 22 tarjetas de distribuciones

Leídas las 19 tarjetas del módulo original revisado y las tres ampliaciones de TEO-26C. Se precisan siete reversos; las otras quince tarjetas no requieren cambios en esta pasada. Se conservan IDs, preguntas, categorías y recuentos. El glosario se regenera desde las definiciones actualizadas.

| ID | Comprobación editorial | Resultado |
|---|---|---|
| fc-t08-original-01 | Finito/numerable, ejemplo no entero y contraste entero | Cotejada; se conserva P03A |
| fc-t08-original-02 | Alcance del modelo continuo y efecto del redondeo | Precisada: continua con densidad en el curso |
| fc-t08-original-03 | Masa frente a densidad, valores no enteros y altura frente a área | Precisada: xᵢ en vez de sugerir un recuento k |
| fc-t08-original-04 | Ensayos fijos, independientes, dos resultados y p constante | Cotejada sin cambios |
| fc-t08-original-05 | Dominio binomial y extremos p=0/p=1 | Precisada: casos ciertos sin potencias ambiguas |
| fc-t08-original-06 | Combinatorio, posiciones distintas y dominio factorial | Precisada: enteros 0 ≤ k ≤ n y sin repetición |
| fc-t08-original-07 | Media, varianza y desviación típica binomial | Cotejada sin cambios |
| fc-t08-original-08 | Notación normal con desviación positiva | Cotejada sin cambios |
| fc-t08-original-09 | Normal estándar y acumulada a la izquierda | Cotejada sin cambios |
| fc-t08-original-10 | Área total, probabilidad de intervalo y simetría | Cotejada sin cambios |
| fc-t08-original-11 | Tipificación y σ > 0 | Cotejada sin cambios |
| fc-t08-original-12 | Consulta de tablas y argumento negativo | Precisada: distinguir acumulada de área entre cero y z |
| fc-t08-original-13 | Complemento y extremos de masa nula | Cotejada sin cambios |
| fc-t08-original-14 | Simetría para k positivo | Cotejada sin cambios |
| fc-t08-original-15 | Diferencia de acumuladas con a < b | Cotejada sin cambios |
| fc-t08-original-16 | Aproximación normal y error de la probabilidad concreta | Cotejada sin cambios |
| fc-t08-original-17 | np y n(1−p): orientación, no garantía | Cotejada sin cambios |
| fc-t08-original-18 | Media y desviación de la normal aproximante | Cotejada sin cambios |
| fc-t08-original-19 | Corrección de continuidad y umbrales enteros | Precisada: traducir umbrales y distinguir X discreta de Y continua |
| fc-teoria-densidad | No negatividad, área, masa puntual y orden de extremos | Precisada: explicitar a ≤ b |
| fc-teoria-acumulada | F(x)=P(X≤x), suma discreta e integral si hay densidad | Cotejada sin cambios |
| fc-teoria-cuantil | 0 < r < 1, σ > 0, área izquierda y cola superior | Cotejada sin cambios |

Las referencias de contenido son las lecciones 8.1–8.4: definición y densidad, binomial, normal y aproximación. Las condiciones y las expresiones matemáticas nuevas mantienen delimitadores LaTeX. No se modifica el archivo original de flashcards de «Página web existente».

### Verificación

- 11 pruebas específicas superadas: catálogo/glosario, normal y aproximación binomial-normal. Incluyen contraste de la normal por cuadratura y de la recurrencia binomial por coeficientes independientes.
- Comprobación adicional con aritmética racional y enumeración: 35 distribuciones binomiales (normalización, media, varianza y casos ciertos), 36 combinatorios, siete umbrales comprobados con las cuatro relaciones de desigualdad y cinco controles de simetría y cinco de cuantiles normales. Evidencia: `../tmp/p03/verificacion-distribuciones.json`.
- `distribution-cards-import-91-browser.cjs` superada tras la última edición: las 22 tarjetas se muestran sin errores matemáticos; filtros, teclado, raíz/subcarpeta, móvil y recarga funcionan. También verifica el hash de la fuente original.
- Comprobación móvil adicional de las tarjetas de fórmula binomial y continuidad: fórmulas renderizadas y sin desbordamiento global con texto al 200 %. Capturas de los reversos inspeccionadas en `../tmp/p03/`; las expresiones largas usan el desplazamiento interno del motor matemático.
- Glosario sincronizado y enlaces de 190 páginas sin pendientes en esta tanda. Recuentos: 107 fórmulas, 69 términos, 420 tarjetas y 398 preguntas base.

Este cotejo editorial no valida la pronunciación de las fórmulas con un lector de pantalla ni revisa los 21 ejercicios resueltos del tema. TEO-25E3–E4 siguen abiertos.

- `fix(p03b)`: revisión de 22 tarjetas cerrada, siete precisiones y quince sin cambios. Siguiente P03C: 37 tarjetas y 20 preguntas base de inferencia; se podrá dividir su registro por tipos de material.

## P03C1 · Las 37 tarjetas de inferencia

Leídas las 30 tarjetas originales revisadas y las siete ampliaciones de TEO-26C. Doce reversos precisados; 25 cotejados sin cambios. Conservados los IDs, categorías, orden y recuentos. Glosario regenerado.

| IDs | Cotejo | Resultado |
|---|---|---|
| original-01 | Población y tamaño N | Sin cambios |
| original-02 | Muestra y posible reposición | Precisa colección de observaciones, no necesariamente unidades distintas |
| original-03 | Parámetro frente a estadístico | Regla basada sólo en datos; su valor puede variar |
| original-04–05 | Proporción observada y muestreo simple sin reemplazo | Sin cambios |
| original-06 | Afijación proporcional | Redondeo conservando total y capacidad |
| original-07–09 | Sistemático, media y proporción muestrales | Sin cambios |
| original-10 | TCL y regla n≥30 | Precisa independencia, distribución común y varianza finita |
| original-11–15 | Error estándar y cuantiles 90/95/97/99 % | Sin cambios; cuantiles contrastados |
| original-16–17 | Confianza y alfa | Distingue nominal de cobertura real aproximada; sin interpretación posterior |
| original-18–19 | Intervalo y margen para la media | Precisa independencia y sigma conocida |
| original-20 | Tamaño para media | Objetivo no estricto y condiciones positivas; desigualdad estricta aparte |
| original-21–22 | Margen y planificación de proporciones | Condiciones, proporción previa y escala del error |
| original-23–24 | Centro y semianchura | Sin cambios |
| original-25 | Redondeo | Techo para n≥A; suelo más uno para n>A |
| original-26–30 | Planificación conservadora y relaciones de escala | Sin cambios |
| teoria-estimador, estimacion, insesgado | Conceptos y exactitud individual | Sin cambios |
| teoria-wald, se-proporcion | Aproximación, requisitos y error estándar estimado | Sin cambios |
| teoria-caracteristico, ficha-encuesta | Tipo de intervalo y límites de la ficha | Sin cambios |

Los prefijos completos son `fc-t09-original-` y `fc-teoria-`. Este cuadro incluye las 37 tarjetas.

Verificación: 18 pruebas específicas superadas (catálogo, glosario, intervalos, tamaños y distribuciones muestrales). Con fracciones exactas, se comprueban 64 planes de media y 36 de proporciones, cada uno con objetivo estricto y no estricto y comprobación del entero anterior. Se contrastan cuatro cuantiles con NormalDist y se enumeran muestras de {1,2,3,4}: varianza de la media 5/8 con reposición frente a 5/12 sin reposición. Como ejemplo de cobertura aproximada, el Wald con n=100, p=0,5 y z=1,96 cubre para k=41…59, con probabilidad binomial exacta 0,9431120663590192; no es exactamente 0,95. Esto es un contraste de la aclaración editorial, no un ejemplo nuevo añadido al alumnado.

Prueba `inference-cards-import-99-browser.cjs` superada: fuente original conservada, 37 tarjetas, nueve categorías, filtros, teclado, raíz/subcarpeta, móvil y recarga. Dos reversos (confianza y redondeo) comprobados a 360 px con letra al 200 % y capturas inspeccionadas. Glosario al día y 190 páginas sin enlaces pendientes. Evidencias: `../tmp/p03/verificacion-inferencia-tarjetas.json` y capturas `inferencia-*.png`.

P03C continúa con las 20 preguntas; esta primera subtanda no cierra P03C ni la escucha con lector de pantalla.

## P03C2 · Las 20 preguntas base de inferencia

Leídos los 20 enunciados, las 80 opciones, las 20 pistas y las 20 soluciones. Se conserva el orden, los IDs, los índices de procedencia y la clave de respuestas del original. Se sustituyen los 80 mensajes genéricos por explicaciones específicas para cada alternativa. Los cambios se realizan en `scripts/build-inference-test.mjs` y se regeneran tanto el banco JavaScript como la lectura estática; no hay dos bancos editados por separado.

| Pregunta | Clave conservada | Cotejo y precisión |
|---|---|---|
| 01 | B | Inferir de muestra a población; explicación de objetivo y supuestos |
| 02 | D | Tamaño no elimina sesgo de selección |
| 03 | A | Redacción neutral frente a preguntas inductivas |
| 04 | C | Probabilidades de inclusión; opciones paralelas sobre costes, juicio y tiempo |
| 05 | C | Inclusión desconocida en no probabilístico; ortografía de «calculada» |
| 06 | B | Orden del ejemplo de urna, acotado explícitamente a ese procedimiento |
| 07 | C | Salto 50; tercer elemento 108; enunciado y solución en LaTeX |
| 08 | B | Homogeneidad respecto de una variable como objetivo, no garantía |
| 09 | B | Primero grupos naturales; distractores sobre individuos, conveniencia y cuotas |
| 10 | D | Posible ahorro de desplazamientos, no garantía universal |
| 11 | C | Conveniencia: acceso fácil, sin sorteo ni cuotas explícitos |
| 12 | B | Juicio frente a cuotas, sorteo y referidos; eliminado distractor de juicio legal |
| 13 | C | Analogía de grupos de cuotas y estratos, sin equiparar su diseño |
| 14 | C | Completar cuotas no implica selección aleatoria |
| 15 | B | Referidos para acceso difícil; tamaño pequeño por sí solo no basta |
| 16 | C | Factibilidad y marco, con límites de inferencia |
| 17 | D | Población como unidades de interés, no sólo personas |
| 18 | A | Exclusión y exhaustividad cuando los grupos forman una partición |
| 19 | B | Muestreo dentro del estrato acotado al procedimiento de la lección |
| 20 | C | Sesgo y conclusiones; redacción del enunciado aclarada |

La clave completa sigue siendo `bdaccbcbbdcbccbcdabc`. Las preguntas revisadas se presentan como conceptos y muestreo en la lectura estática y el índice del tema. No se atribuyen estas precisiones a una modificación de la fuente original: su hash sigue comprobándose.

### Verificación final de P03C

- **29 pruebas específicas superadas**, correspondientes a catálogo, visibilidad, glosario, intervalos, tamaños y distribuciones muestrales.
- Prueba de las 37 tarjetas superada, con los casos y cálculos independientes descritos en P03C1.
- `inference-test-import-101-browser.cjs` actualizada para recursos locales y service workers bloqueados. Comprueba fuente y respuestas originales, pista, corrección, resumen 20/20, teclado, raíz/subcarpeta, móvil, recarga y lectura sin JavaScript. Además recorre A, B, C y D para cada pregunta y verifica **las 80 retroalimentaciones** en el interfaz, con recuperación mediante segundo intento cuando corresponde.
- La prueba espera por ID de pregunta y disponibilidad del control, sin exigir que el texto matemático siga como LaTeX crudo después de renderizarse.
- Selección sistemática contrastada por enumeración: 20 unidades distintas, tercera 108 y última 958, todas dentro de 1…1000.
- Prueba móvil adicional de la pregunta 7: tres expresiones matemáticas en el enunciado y cinco en la solución renderizadas. Captura `../tmp/p03/inferencia-test-sistematico.png` inspeccionada.
- Glosario sincronizado y enlaces de 190 páginas sin pendientes. Se mantienen 107 fórmulas de formulario, 69 términos, 420 tarjetas y 398 preguntas base.

### Cobertura pendiente de evaluación: EV-INF-01

Las 20 preguntas originales se concentran en conceptos y muestreo. **No cubren todo el tema 9.** Esta carencia no se oculta con el cierre editorial de las preguntas existentes.

- [ ] EV-INF-01A: definir una matriz de destrezas para 9.4–9.9 (distribuciones muestrales, estimación, intervalos característicos y de confianza, tamaños y ficha técnica).
- [ ] EV-INF-01B: diseñar nuevas preguntas de ampliación didáctica, con hipótesis, unidades, distractores y retroalimentación; distinguirlas de las originales.
- [ ] EV-INF-01C: contrastar cálculos, integrar IDs y filtros, revisar lectura estática y actualizar contratos y recuentos.

P03C queda completada dentro del alcance de las 37 tarjetas y 20 preguntas revisadas. EV-INF-01 permanece abierta como ampliación de cobertura. Siguiente tanda editorial: P03D, 19 tarjetas de programación lineal. TEO-25E3–E4 siguen pendientes de escucha real.

- `fix(p03c)`: doce tarjetas precisadas, 25 sin cambios; test de 20 preguntas con 80 explicaciones específicas y enunciados desambiguados. Pruebas específicas y de navegador superadas.

## P03D · Las 19 tarjetas de programación lineal

**15 de noviembre de 2026.** Revisadas las 19 tarjetas. Se precisan seis reversos (12–15, 17 y 19); las otras trece se conservan. IDs, preguntas, categorías y orden originales intactos. El glosario se regenera desde las tarjetas.

| ID fc-pl-original- | Cotejo | Resultado |
|---|---|---|
| 01 | Objetivo lineal y decisiones factibles | Sin cambios |
| 02 | Restricciones simultáneas | Sin cambios |
| 03 | No negatividad según significado de las variables | Sin cambios |
| 04 | Como mínimo e igualdad admitida | Sin cambios |
| 05 | Como máximo y coherencia de unidades monetarias | Sin cambios |
| 06 | Doble exacto frente a al menos el doble | Sin cambios |
| 07 | Diferencia acotada sin imponer A≥B | Sin cambios |
| 08 | Multiplicación por dos sin invertir desigualdad | Sin cambios |
| 09 | Factibilidad, vacío, acotación y degeneración | Sin cambios |
| 10 | Dos puntos de frontera, origen y caso vertical | Sin cambios |
| 11 | Punto de prueba y fronteras incluidas/excluidas | Sin cambios |
| 12 | Cruces factibles y puntos extremos | Precisa segmentos y región de un solo punto |
| 13 | Óptimo único y garantía sobre región compacta | Precisa modelo continuo y casos degenerados |
| 14 | Comparación de vértices y límites del método | Precisa que ausencia de vértices no decide la existencia de óptimos |
| 15 | Líneas de nivel y extremo alcanzado | Precisa modelo continuo y cota finita no alcanzada |
| 16 | Región no acotada frente a objetivo no acotado | Sin cambios |
| 17 | Segmento óptimo y coste constante | Precisa convexidad continua; un punto único no da infinitas soluciones |
| 18 | Incompatibilidad y región vacía | Sin cambios |
| 19 | Relajación e integridad | Precisa posible factibilidad real sin factibilidad entera |

### Apoyo en el libro

La lección 6.4 incorpora [una banda sin vértices](../libro/temas/06-programacion-lineal/04-solucion-de-un-problema-de-programacion-lineal.html#region-sin-vertices): 0≤x≤1 e y real, con Z=x. Cada punto es el punto medio de dos puntos factibles distintos, de modo que no es extremo. Z alcanza mínimo 0 y máximo 1 en las dos fronteras verticales. El apartado está enlazado desde el índice de la lección.

El resumen añade la factibilidad real sin puntos enteros (x=1/2, y=0) y aclara que un objetivo constante sobre un único punto admisible tiene una única solución. Son ejemplos didácticos nuevos, separados de los datos originales de sillas y mesas.

### Verificación

- **17 pruebas específicas superadas**: catálogo, glosario y visibilidad.
- `pl-cards-import-76-browser.cjs` adaptada a la fixture local y superada: comprueba hashes de las fuentes, 19 tarjetas y cinco categorías, texto y fórmulas, raíz/subcarpeta, teclado, preferencias, recarga y regresión del mazo compartido en otros temas. Se mantienen 420 tarjetas y 398 preguntas.
- Contraste exacto con fracciones y justificación analítica: triángulo x+y≤6 con máximo 12 para Z=2(x+y); siete óptimos enteros frente al segmento real. La malla racional sirve como comprobación adicional, no sustituye la prueba de la cota y su igualdad.
- Banda sin vértices: prueba del punto medio para cualquier y, con extremos alcanzados por las cotas de x. Restricción 2x=1: incompatibilidad entera por paridad. Objetivo constante sobre un único punto: un óptimo, no infinitos.
- Cota no alcanzada: valores 2−1/n en el rectángulo con x<1; todos menores que 2. Redondear (3/4,3/4) a (1,1) viola x+y≤3/2; el máximo entero de x+y en esa región es 1. El óptimo entero del ejemplo original de sillas y mesas sigue siendo (0,9), beneficio 450.
- Nueva sección comprobada a 360 px, sin errores de fórmulas ni desbordamiento global con texto al 200 %. Captura `../tmp/p03/pl-sin-vertices.png` inspeccionada. Cálculos en `../tmp/p03/verificacion-programacion-lineal.json`.
- Glosario sincronizado y enlaces de 198 páginas sin pendientes en la tanda.

El cotejo no cierra la revisión con lector de pantalla ni la práctica procedural pendiente del tema 6. Recuentos del proyecto sin cambios: 107 fórmulas de formulario, 69 términos, 420 tarjetas y 398 preguntas base.

- `fix(p03d)`: seis precisiones y trece tarjetas sin cambios; apoyo añadido en 6.4 y pruebas superadas. Siguiente P03E: bidimensional y combinatoria.

## P03E · Estadística bidimensional y combinatoria

**15 de noviembre de 2026.** Revisadas 23 tarjetas bidimensionales, dos de combinatoria y las diez preguntas originales de combinatoria. Se precisan seis tarjetas bidimensionales y las dos de combinatoria, y se ajustan cinco preguntas. Se conservan IDs, índices, categorías y valores de las respuestas correctas. Glosario regenerado.

### P03E1 · Las 23 tarjetas bidimensionales

| ID | Cotejo | Resultado |
|---|---|---|
| fc-bivariate-original-01 | Dos valores de la misma unidad estadística | Precisa que puede ser persona, empresa u otra unidad |
| 02 | Nube de puntos, patrones y causalidad | Sin cambios |
| 03 | Marginales por filas/columnas según orientación | Sin cambios |
| 04 | Centro de medias e intercepto de los ajustes | Sin cambios |
| 05 | Sentido, escala y unidades de covarianza | Precisa unidades producto de X e Y |
| 06 | Covarianza descriptiva, N>0 y ponderación | Sin cambios |
| 07–08 | Signo de asociación y ausencia de interpretación causal | Sin cambios |
| 09 | Covarianza pequeña frente a cero y dependencia no lineal | Sin cambios |
| 10–11 | Pearson sin unidades y desviaciones positivas | Sin cambios |
| 12–14 | Rango, asociación intensa y causalidad | Sin cambios |
| 15 | Y sobre X, mínimos cuadrados e intercepto | Precisa cautela al extrapolar |
| 16 | Fórmula y condición de varianza de X positiva | Sin cambios |
| 17 | Residuos con signo y suma de cuadrados | Sin cambios |
| 18–19 | R² y ausencia de certeza predictiva | Sin cambios |
| 20 | Producto de pendientes y dirección de cada regresión | Precisa que el producto no recupera el signo de r |
| fc-teoria-media-marginal | Pesos marginales, N positivo y variable cuantitativa | Sin cambios |
| fc-teoria-varianza-marginal | Divisor descriptivo, unidades y desviación típica | Precisa N>0 y notación LaTeX |
| fc-teoria-regresion-x | X sobre Y y varianza de Y positiva | Explicita mínimos cuadrados con intercepto |

Los IDs abreviados 02–20 llevan el prefijo `fc-bivariate-original-`. Seis tarjetas precisadas y diecisiete sin cambios.

Contrastes independientes con las 50 familias: medias 2 y 61/50; varianzas 3/5 y 1229/2500; covarianza 11/50; pendientes 11/30 y 550/1229; r²=605/3687. Se verifican residuos de media cero y aumento de SSE al alterar la pendiente manteniendo el centro. Cambiar X por 100X multiplica la covarianza por 100; cambiar el signo de Y cambia el de ambas pendientes, pero no su producto. Y=X² sobre X=-1,0,1 proporciona dependencia no lineal con covarianza cero. Con X constante e Y variable, Pearson no está definido, aunque la regresión de X sobre Y sí lo esté.

### P03E2 · Combinatoria

Las dos tarjetas precisan que el principio multiplicativo es un recuento, no una hipótesis de independencia probabilística, y que las combinaciones con repetición no son automáticamente equiprobables. Se conserva el carácter opcional de esta última ampliación.

| Pregunta | Resultado correcto conservado | Revisión |
|---|---:|---|
| 01 | 720 | Se explicita que tres personas distintas ocupan los cargos |
| 02 | 1000 | Se precisa la explicación de multiplicar opciones de los diales |
| 03 | 2 598 960 | Mano sin orden, relación con V(52,5) y factor 5!; sin cambios |
| 04 | 5040 | Siete libros distintos; sin cambios |
| 05 | 3/8 | Lanzamientos independientes explícitos; se corrigen explicaciones de 1/2 y 3/4 |
| 06 | 3024 | Selección y orden de cuatro personas; sin cambios |
| 07 | 10 | El distractor 20 se explica como elegir tres de seis, no de cinco |
| 08 | 16 | Se habla de posiciones sin restricciones, evitando confundir recuento e independencia probabilística |
| 09 | 1/4 | Ordenaciones equiprobables y primer símbolo fijo; sin cambios |
| 10 | 6 | ANNA y repetición de letras; sin cambios |

Para la pregunta 05, la enumeración da tres secuencias de ocho con exactamente dos caras, y seis de ocho con una o dos caras. Se corrige la redacción previa de las alternativas erróneas; la respuesta correcta no cambia. Las demás cifras se contrastan por enumeración o factoriales/combinatorios independientes. Se verifican 35 casos de combinaciones con repetición; las multiplicidades de AAA, AAB, ABB y BBB son 1,3,3,1 si se agrupan las ocho secuencias ordenadas equiprobables. Un ejemplo de cuatro pares con probabilidades 2/5,1/10,1/10,2/5 verifica que un recuento 2×2 no exige independencia probabilística.

### Verificación y alcance

- **10 pruebas unitarias específicas superadas**: catálogo, glosario y combinatoria exacta.
- Prueba de las 23 tarjetas bidimensionales superada, con fuentes originales, fórmulas, teclado, categorías, raíz/subcarpeta, preferencias y regresión del mazo compartido.
- Prueba de combinatoria superada: demostración, calculadora exacta, seis ejercicios, diez preguntas, índice, móvil al 200 % y lectura del apoyo sin JavaScript. Extendida para comprobar **las 40 retroalimentaciones** de las diez preguntas, con recuperación mediante segundo intento. Esto no convierte el test interactivo en una actividad operativa sin JavaScript.
- Las dos tarjetas de combinatoria se comprueban también en el visor móvil al 200 %, sin errores matemáticos ni desbordamiento global. Capturas de la tarjeta opcional y de la explicación de monedas inspeccionadas.
- Glosario sincronizado; enlaces de **198 páginas** sin pendientes. Cálculos en `../tmp/p03/verificacion-apoyos.json`; capturas en `../tmp/p03/`.

Se aclara el recuento vigente: **408 preguntas en total, 398 de los temas y diez de combinatoria**. No se han añadido preguntas en esta tanda; se corrige la cifra de respaldo de la portada del test y se precisa el resumen documental. Se mantienen 420 tarjetas, 107 fórmulas y 69 términos.

Esta revisión no cierra la lectura asistida real, no revisa de nuevo todos los ejercicios resueltos y no añade preguntas sobre la ampliación opcional de combinaciones con repetición. Siguiente P03F: organizar la revisión de los temas 1–5 y probabilidad. EV-INF-01 y TEO-25E3–E4 siguen pendientes.

- `fix(p03e)`: revisión editorial de 25 tarjetas y diez preguntas completada; ocho tarjetas y cinco preguntas precisadas, con valores correctos e identificadores conservados.

## P03F · Secuencia de revisión restante

Plan registrado el 15 de noviembre de 2026. Cada tanda conserva IDs, coteja respuestas y distractores, verifica el catálogo y deja constancia de su alcance.

- [x] F1A: límites y laterales (`content/activities/limits.js`): seis preguntas y ocho tarjetas.
- [x] F1B: comportamiento infinito (`infinity.js`).
- [x] F1C: técnicas de límites (`limit-techniques.js`).
- [x] F1D: continuidad y derivadas, reglas y ampliaciones; inventariar módulos e IDs al comenzar.
- [x] F1E: repaso del tema 1 y conciliación del tema completo.
- [ ] F2: representación de funciones, por módulos y repaso.
- [ ] F3: integrales, por módulos y repaso.
- [ ] F4: matrices y determinantes, por módulos y repaso.
- [ ] F5: sistemas, por módulos y repaso.
- [ ] F7: probabilidad; preservar procedencia de los contenidos originales.

EV-INF-01 y la escucha real TEO-25E3–E4 mantienen su seguimiento independiente.

### F1A · Límites y laterales · 15 de noviembre de 2026

Revisadas `lim-001–003`, `lat-001–003`, `fc-lim-01–04` y `fc-lat-01–04`: seis preguntas con sus 24 alternativas y ocho tarjetas. No cambian IDs, claves ni cantidades.

- `lim-002` y `lim-003`: la confirmación genérica se sustituye por la razón matemática de la opción correcta.
- `fc-lim-01`: se explicitan los puntos del dominio arbitrariamente próximos y el requisito para todos los puntos suficientemente próximos.
- `fc-lat-02`: se explicita la aproximación por ambos lados del dominio. Las otras seis tarjetas permanecen iguales.
- Cotejo algebraico: (x²−4)/(x−2)=x+2 exclusivamente si x≠2; laterales de las ramas x+1 y 5−x en 2 iguales a 3, distintos del valor puntual 7. Para 1/x, x=−10^(−n) da −10^n; para x>1/ε, 0<1/x<ε. Los laterales 3 y 5 son incompatibles con un límite bilateral.
- Tres pruebas del contrato del catálogo superadas; 198 páginas sin enlaces pendientes.
- Comprobación aislada del contenido de las 14 actividades con los estilos y el renderizador reales: raíz y subcarpeta, 360 px y texto al 200 %, 37 fórmulas renderizadas sin errores ni desbordamiento global. No sustituye una revisión del flujo completo del test ni la escucha con lector de pantalla.

`fix(p03f-f1a)`: precisadas dos tarjetas y dos retroalimentaciones. Siguiente tanda: F1B, comportamiento infinito; el resto de P03F continúa pendiente.


### F1B · Comportamiento infinito · 15 de noviembre de 2026

Revisadas las doce preguntas `inf-001–003`, `point-001–003`, `horiz-001–003`, `end-001–003`, con sus 48 alternativas, y las doce tarjetas `fc-inf-01–03`, `fc-point-01–03`, `fc-horiz-01–03`, `fc-end-01–03`. IDs, claves y cantidades conservados.

- Precisadas cuatro preguntas: `inf-001` explicita x→+∞ en los contraejemplos; `inf-003` también lo explicita en un distractor; `point-001` explica conjuntamente el signo y la aproximación a cero del denominador; `horiz-001` desarrolla la razón del cociente 3/2.
- Precisadas dos tarjetas: `fc-point-02` aclara que cancelar factores en una forma 0/0 puede dejar un límite finito o infinito; `fc-end-01` distingue el polinomio constante del no constante. Otras ocho preguntas y diez tarjetas sin cambios.
- Cotejo: en 3/(x−2), x=2−1/n da −3n; en −2/(x+1)², x=−1±1/n da −2n². Para el cociente de grados iguales, la diferencia respecto de 3/2 es −13/[2(2x²+5)]. En x/√(x²+1), extraer |x| deja signo −1 en el extremo negativo. En el modelo N(t), 1200−N(t)=4800/(t+4)>0 para t≥0. Los polinomios se factorizan por su potencia principal; ln x carece de dominio real hacia −∞. El ejemplo x/(x²+1) cruza su asíntota y=0 en x=0.
- Comprobaciones racionales adicionales en `../tmp/p03/verificacion-infinitos.json`; son controles de ejemplos, no demostraciones por tablas.
- Contrato del catálogo: 3/3 pruebas superadas. Enlaces: 198 páginas, cero pendientes.
- Contenido de las 24 actividades renderizado de forma aislada con estilos y motor reales, en raíz y subcarpeta a 360 px y texto al 200 %: 36 fórmulas por caso, sin errores matemáticos ni desbordamiento global. No valida el flujo completo de interacción ni la pronunciación con lector de pantalla.

`fix(p03f-f1b)`: cuatro preguntas y dos tarjetas precisadas. Siguiente tanda F1C: técnicas de límites. P03F, EV-INF-01 y escucha real siguen abiertos.


### F1C · Técnicas de límites · 15 de noviembre de 2026

Revisadas nueve preguntas (`prop-001–003`, `calc-001–003`, `ind-001–003`), sus 36 alternativas y nueve tarjetas (`fc-prop-01–03`, `fc-calc-01–03`, `fc-ind-01–03`). Se conservan IDs, claves, referencias y cantidades.

- `calc-002`: se precisa que se multiplica numerador y denominador por el conjugado, positivo en el entorno considerado; se corrige la redacción del distractor cero para identificar 0/0 sin atribuirle un resultado.
- `ind-002`: la retroalimentación correcta muestra 3x/(√(x²+3x)+x); la pista especifica multiplicar numerador y denominador por el conjugado.
- `fc-calc-02`: se explicita la misma operación y la condición de conjugado no nulo.
- `fc-ind-02`: se desarrollan fg=f/(1/g) y fg=g/(1/f), indicando dónde se permiten los recíprocos y la necesidad de estudiar formas y signos.
- Otras siete preguntas y siete tarjetas sin cambios.

Cotejo algebraico: reglas de límites finitos con denominador de límite no nulo; composición continua con dominio compatible; x²+x−6=(x−2)(x+3); (1−√(1−x²))(1+√(1−x²))=x² en el dominio real; ambos laterales de la función a trozos en 1 valen 2; 7x−(4x+12)=3(x−4), que permite obtener 3/x fuera de 0 y 4; racionalización de √(x²+3x)−x y extracción de x positivo dan 3/(√(1+3/x)+1); (e^(1/x))^x=e para x≠0. Los resultados de las preguntas quedan 7/5, condición M≠0, continuidad exterior y dominio, 5, 1/2, 2, 3/4, 3/2 y e. Controles racionales complementarios en `../tmp/p03/verificacion-tecnicas.json`.

Verificación: contrato del catálogo 3/3; enlaces de 198 páginas sin pendientes. Contenido de las 18 actividades comprobado aisladamente con estilos y renderizador reales, raíz/subcarpeta, 360 px y texto al 200 %: 58 fórmulas por caso, sin errores ni desbordamiento global. Este control no certifica el flujo completo del test ni la escucha real.

`fix(p03f-f1c)`: dos preguntas y dos tarjetas precisadas. Sigue F1D: inventario y revisión por módulos de continuidad y derivadas. P03F, EV-INF-01 y TEO-25E3–E4 siguen pendientes.


### F1D · Subtandas registradas

- [x] F1D1: `continuity-derivatives.js`, nueve preguntas y nueve tarjetas (continuidad y definición de derivada).
- [x] F1D2: `derivative-rules.js` (inventario y revisión de reglas).
- [x] F1D3: `chain-hopital.js` (inventario y revisión de composición, teoremas y L’Hôpital).

Cada módulo se cierra individualmente; F1D permanece pendiente hasta completar los tres.


### F1D1 · Continuidad y definición de derivada · 15 de noviembre de 2026

Revisadas nueve preguntas (`cont-001–003`, `der-001–003`, `latder-001–003`), sus 36 alternativas y nueve tarjetas (`fc-cont-01–03`, `fc-der-01–03`, `fc-latder-01–03`). Se conservan IDs, claves, fuentes y cantidades.

- `latder-002` dependía de la pregunta 1(a) de un examen que no se mostraba en el test. Ahora incluye las dos ramas de la función con b=−2 y puede contestarse individualmente; la explicación parte explícitamente de f(0)=2. Respuesta conservada: a=1.
- `fc-cont-03` concreta la continuidad relativa a [a,b], con a<b, y diferencia los extremos de los puntos interiores.
- `fc-der-01` explicita que la definición bilateral presentada corresponde a un punto interior.
- Otras ocho preguntas y siete tarjetas sin cambios.

Cotejo: f(x)=x+2 fuera de 1 tiene límite 3, aunque f(1)=7; la unión polinómica/racional en 0 exige 2=−b, sin restricción en a para continuidad; √x es continua por la derecha en 0. Para x², la secante de 2 a 3 tiene pendiente 5, mientras que el cociente incremental en a es 2a+h y la derivada en 2 vale 4. En C(q)=100+5q+0,02q², C′(50)=7 €/unidad pero C(51)−C(50)=7,02 €. Para |x|, los cocientes laterales valen −1 y 1. En la unión con b=−2, los cocientes son h+a por la izquierda y −1/(h−1) por la derecha: a=1. La implicación derivabilidad finita ⇒ continuidad se justifica multiplicando el cociente incremental por h. Controles racionales complementarios en `../tmp/p03/verificacion-continuidad-derivadas.json`.

Verificación: contrato del catálogo 3/3; enlaces de 198 páginas sin pendientes. Contenido de las 18 actividades comprobado aisladamente con estilos y renderizador reales, raíz/subcarpeta, 360 px y texto al 200 %: 42 fórmulas por caso, sin errores ni desbordamiento global. No certifica el flujo interactivo completo ni la escucha real.

`fix(p03f-f1d1)`: pregunta de derivabilidad autosuficiente y dos tarjetas precisadas. Sigue F1D2: reglas de derivación. F1D y P03F permanecen pendientes; también EV-INF-01 y TEO-25E3–E4.


### F1D2 · Tangentes y reglas de derivación · 15 de noviembre de 2026

Revisadas nueve preguntas (`tan-001–003`, `table-001–003`, `rules-001–003`), sus 36 alternativas y nueve tarjetas (`fc-tan-01–03`, `fc-table-01–03`, `fc-rules-01–03`). IDs, claves, fuentes y cantidades conservados.

- `tan-003` incluye ahora la expresión y el dominio de la rama necesaria, en lugar de remitir al enunciado y los parámetros de un examen externo. Su pista permite resolverla de forma independiente; la procedencia original se conserva.
- `rules-003`: la pista describe el procedimiento de cociente y cadena, sin exigir consultar un ejemplo resuelto externo.
- `fc-table-03`: se explicitan la derivabilidad de la interior en x y de la exterior en u(x).
- `fc-rules-01`: se explicita que ambos factores deben ser derivables en el punto.
- Otras siete preguntas y siete tarjetas sin cambios.

Cotejo: para x² en 1, punto (1,1), pendiente 2, tangente y=2x−1 y normal y=−x/2+3/2. Una tangente horizontal por (0,3) tiene normal x=0. La rama (x−2)/(x−1) tiene derivada 1/(x−1)², por lo que en 2 las rectas son y=x−2 e y=−x+2. La derivada de 3^x es 3^x ln3; la de ln(2x+1) es 2/(2x+1), solamente en x>−1/2 para esta función real. √x tiene derivada finita 1/(2√x) para x>0; el cociente derecho en 0 diverge. Producto: (x²e^x)′=e^x(2x+x²). Cociente: ((ln x)/x)′=(1−ln x)/x² en x>0. Para (x³−4)/(x²+4)², la regla del cociente da [3x²(x²+4)²−4x(x³−4)(x²+4)]/(x²+4)^4; simplificar produce (−x^4+12x²+16x)/(x²+4)^3, con valor 27/125 en 1. Controles racionales en `../tmp/p03/verificacion-reglas-derivacion.json`.

Verificación: contrato del catálogo 3/3; enlaces de 198 páginas sin pendientes. Contenido de las 18 actividades comprobado aisladamente con estilos y motor reales, raíz/subcarpeta, 360 px y texto al 200 %: 55 fórmulas por caso, sin errores ni desbordamiento global. No certifica el flujo completo de los componentes ni la escucha real.

`fix(p03f-f1d2)`: dos preguntas independizadas de consultas externas y dos tarjetas precisadas. Sigue F1D3: composición, continuidad de derivables y L’Hôpital. F1D y P03F permanecen pendientes, al igual que EV-INF-01 y TEO-25E3–E4.


### F1D3 · Cadena, teorema y L’Hôpital · 15 de noviembre de 2026

Revisadas nueve preguntas (`chain-001–003`, `theorem-001–003`, `hopital-001–003`), sus 36 alternativas y nueve tarjetas (`fc-chain-01–03`, `fc-theorem-01–03`, `fc-hopital-01–03`). IDs, claves, fuentes y cantidades conservados.

- `theorem-003`: concreta punto interior y explica la opción correcta mediante el incremento de la función.
- `hopital-002`: desarrolla derivabilidad, denominadores y derivadas no nulos en el entorno reducido, y la existencia del límite final para justificar ambas aplicaciones.
- `fc-theorem-03`: añade f(x)=x² sin(1/x), f(0)=0 como contraejemplo a la continuidad automática de f′.
- `fc-hopital-01`: distingue límite finito o infinito del cociente de derivadas y exige comprobar las hipótesis en los lados de aproximación considerados.
- Otras siete preguntas y siete tarjetas sin cambios.

Cotejo: la cadena da (6x−1)e^(3x²−x+2) y 2xe^(x²)/(1+e^(x²)); el segundo argumento logarítmico es siempre positivo. El dominio de x²/√(1+2ln x) es x>e^(−1/2). La discontinuidad impide derivada finita; para x² fuera de 0 con f(0)=1, el cociente real es h−1/h. En el contraejemplo añadido, |h sin(1/h)|≤|h| prueba f′(0)=0; para x=1/(2πn), la derivada vale −1, y para x=1/((2n+1)π), vale 1, de modo que f′ no es continua en 0. Controles numéricos complementarios en `../tmp/p03/verificacion-cadena-hopital.json`.

En x/(x+1) hacia 0 no hay indeterminación y el límite es 0. Para (e^x−1−x)/x², las dos etapas 0/0 llevan a (e^x−1)/(2x) y e^x/2, con límite 1/2 y condiciones verificadas en cada lado. En la potencia (1−1/x²)^x, para x>1 el logaritmo es x ln(1−1/x²); como ln(1+u)/u→1 y x(−1/x²)=−1/x→0, el logaritmo tiende a 0 y la potencia a 1.

Verificación: contrato del catálogo 3/3; enlaces de 198 páginas sin pendientes. Contenido de las 18 actividades comprobado aisladamente con estilos y motor reales, raíz/subcarpeta, 360 px y texto al 200 %: 27 fórmulas por caso, sin errores ni desbordamiento global. No certifica flujo completo ni escucha real.

`fix(p03f-f1d3)`: dos preguntas y dos tarjetas precisadas. Se cierra F1D tras sus tres subtandas: 27 preguntas y 27 tarjetas revisadas. Sigue F1E: repaso del tema 1 y conciliación del conjunto. P03F, EV-INF-01 y TEO-25E3–E4 permanecen pendientes.


### F1E · Repaso y conciliación del tema 1 · 15 de noviembre de 2026

Revisadas seis preguntas `review-001–006` (24 alternativas) y cinco tarjetas `fc-review-01–05`. IDs, claves, fuentes y cantidades conservados.

- `review-003`: las unidades de distancia, antes presentes sólo en la explicación, aparecen en el enunciado; se explicita t→+∞.
- `review-006`: se explicitan derivabilidad y ausencia de ceros del denominador y su derivada para x>0 antes de usar L’Hôpital.
- `fc-review-02`: se aclara la base positiva para estudiar potencias reales variables mediante logaritmos.
- Otras cuatro preguntas y cuatro tarjetas sin cambios.

Cotejo: en `review-001`, un entorno de x=1 está enteramente en la rama polinómica y el límite es 1; el salto en 2 tiene laterales 0 y 1. En `review-002`, para cualesquiera a<b del intervalo, el teorema del valor medio da f(b)−f(a)=f′(c)(b−a)>0. En `review-003`, D(t)>0 para todo t≥0 finito y D(t)→0; D(2)=20 miles de kilómetros. En `review-004`, continuidad exige −a=−1 y la igualdad de pendientes −a=−b da a=b=1; con esos parámetros el cociente izquierdo es (1/(h−1)+1)/h=1/(h−1), cuyo límite es −1, y el derecho es h−1, también de límite −1. En `review-005`, punto (2,6) y pendiente 8 dan y=8x−10. En `review-006`, (ln x)/(1/x) es forma −∞/+∞; el cociente de derivadas (1/x)/(−1/x²)=−x tiende a 0 por la derecha. Las tarjetas de discontinuidad, secante y monotonía concuerdan con estas condiciones.

Verificación: contrato 3/3; enlaces de 198 páginas sin pendientes. Contenido de las once actividades comprobado aisladamente con estilos y motor reales, raíz/subcarpeta, 360 px y texto al 200 %: 68 fórmulas por caso, sin errores ni desbordamiento global. No certifica interacción completa ni escucha real.

Conciliación automática por IDs: los siete módulos revisados contienen exactamente las **60 preguntas y 61 tarjetas del tema 1** presentes en el catálogo, sin omisiones ni duplicados. Inventario reproducible de esta pasada en `../tmp/p03/inventario-revision-t01.json`. Esto cierra la revisión editorial P03F del banco fijo del tema 1; no equivale a revisar nuevamente toda la teoría, todos los ejercicios resueltos ni los generadores de juegos.

`fix(p03f-f1e)`: dos preguntas y una tarjeta precisadas; repaso cerrado y cobertura del tema 1 conciliada. Sigue F2: inventario y revisión por módulos de representación de funciones. P03F global, EV-INF-01 y TEO-25E3–E4 permanecen abiertos.


## F2 · Representación de funciones · Tandas registradas

- [x] F2A: esquema general (`function-study.js`), seis preguntas y seis tarjetas.
- [x] F2B: polinómicas (`polynomials.js`).
- [x] F2C: racionales (`rational-functions.js`).
- [x] F2D: exponenciales (`exponentials.js`).
- [x] F2E: logarítmicas (`logarithms.js`).
- [x] F2F: funciones a trozos (`piecewise.js`).
- [x] F2G: traslaciones (`translations.js`).
- [x] F2H: expansión y contracción (`scaling.js`).
- [x] F2I: optimización (`optimization.js`).
- [ ] F2J: repaso (`review-t02.js`) y conciliación por IDs del tema completo.

Se inventariarán cantidades e identificadores de cada módulo al revisarlo; no se cierra F2 global al completar una sola tanda.


### F2A · Esquema general de representación · 15 de noviembre de 2026

Revisadas seis preguntas `study-01–06` (24 alternativas) y seis tarjetas `fc-study-01–06`. IDs, claves, fuentes y cantidades conservados.

- `study-05`: explicita que se estudia un punto interior y refuerza la retroalimentación correcta con x³ en 0.
- `fc-study-03`: recuerda separar los intervalos delimitados por puntos excluidos del dominio al estudiar monotonía.
- `fc-study-05`: añade límites en extremos abiertos/no acotados y advierte que una cota puede no alcanzarse o un extremo absoluto no existir.
- Otras cinco preguntas y cuatro tarjetas sin cambios.

Cotejo: 1/(x−3) excluye sólo 3; el corte Y de x²−4x+3 es (0,3), las raíces son 1 y 3 y el vértice (2,−1). Para x³−3x, f′=3(x−1)(x+1), con signos +,−,+; los extremos relativos son (−1,2) y (1,−2), sin extremos absolutos porque los límites en −∞ y +∞ son −∞ y +∞. Los valores f(−3)=−18 y f(3)=18 también descartan los candidatos locales como absolutos. Para (x²−1)/(x−1), cancelar fuera de 1 deja x+1 y un hueco en (1,2). x³ tiene tangente horizontal en 0 y crece atravesando ese punto. Control complementario: 1/x tiene derivada negativa en cada intervalo de su dominio, pero no es decreciente en todo el dominio, pues −1<1 y f(−1)<f(1). En (0,1), f(x)=x no alcanza sus cotas 0 y 1. La simetría par/impar requiere dominio simétrico. Controles racionales en `../tmp/p03/verificacion-estudio-funciones.json`.

Verificación: contrato del catálogo 3/3; enlaces de 198 páginas sin pendientes. Contenido de las doce actividades comprobado aisladamente con estilos y motor reales, raíz/subcarpeta, 360 px y texto al 200 %: 44 fórmulas por caso, sin errores ni desbordamiento global. No certifica la interacción completa ni la escucha real.

`fix(p03f-f2a)`: una pregunta y dos tarjetas precisadas; esquema general revisado. Sigue F2B: funciones polinómicas. F2 global, P03F, EV-INF-01 y TEO-25E3–E4 permanecen pendientes.


### F2B · Funciones polinómicas · 15 de noviembre de 2026

Revisadas seis preguntas `poly-01–06` (24 alternativas) y seis tarjetas `fc-poly-01–06`. Se conservan IDs, claves, fuentes y cantidades.

- `poly-05`: añade B(q)=32−2(q−6)² como justificación del máximo absoluto y de su unicidad en q=6.
- `fc-poly-04`: explicita que Q es polinomio en la factorización usada para justificar el cambio de signo según multiplicidad.
- `fc-poly-06`: exige comprobar los candidatos enteros permitidos si la variable del modelo es discreta, evitando redondear sin verificar.
- Otras cinco preguntas y cuatro tarjetas sin cambios.

Cotejo: 4−2x^5+3x² tiene grado 5 y coeficiente principal −2. En −2x^4+5x−1, dividir por x^4 deja −2+5/x³−1/x^4→−2: ambos extremos divergen a −∞. (x+1)²(x−2)=x³−3x−2; cerca de −1 el factor cuadrado es positivo fuera de la raíz y x−2 negativo, por lo que toca el eje sin cambiar de signo. Su derivada 3(x−1)(x+1) tiene signos +,−,+ y extremos relativos (−1,0) y (1,−4). Para el beneficio, B(0)=−40, B(6)=32 y B(10)=0, en cientos de euros; completar el cuadrado demuestra B≤32 con igualdad sólo en 6, dentro del intervalo [0,10]. x^4+1 no tiene ceros reales; el teorema del factor limita a cuatro las raíces reales distintas de un polinomio no nulo de grado 4. Para grado n≥1, la derivada no nula tiene grado n−1 y acota el número de extremos relativos, sin garantizar que cada raíz de la derivada lo sea. La paridad de multiplicidad usa continuidad y signo constante de Q cerca de a cuando Q(a)≠0. Controles racionales en `../tmp/p03/verificacion-polinomicas.json`.

Verificación: contrato del catálogo 3/3; enlaces de 198 páginas sin pendientes. Contenido de las doce actividades comprobado aisladamente con estilos y motor reales, raíz/subcarpeta, 360 px y texto al 200 %: 31 fórmulas por caso, sin errores ni desbordamiento global. No certifica la interacción completa ni la escucha real.

`fix(p03f-f2b)`: una explicación y dos tarjetas ampliadas, con respuestas conservadas. Sigue F2C: funciones racionales. F2 global, P03F, EV-INF-01 y TEO-25E3–E4 siguen abiertos.


### F2C · Funciones racionales · 15 de noviembre de 2026

Revisadas seis preguntas `rational-01–06` (24 alternativas) y seis tarjetas `fc-rational-01–06`. IDs, claves, fuentes y cantidades conservados.

- `rational-03`: incorpora f(x)=(x²−1)/(x²−x−2), evitando depender de «la misma f» de otra pregunta al aparecer de forma individual.
- `fc-rational-03`: añade el caso P nulo y Q no nulo, con función cero en su dominio y asíntota horizontal y=0.
- `fc-rational-04`: la división polinómica contempla resto nulo; no se asigna un grado al polinomio nulo.
- Otras cinco preguntas y cuatro tarjetas sin cambios.

Cotejo: x²−x−2=(x+1)(x−2), de modo que el dominio excluye −1 y 2. Cancelar x+1 da (x−1)/(x−2)=1+1/(x−2) sólo en el dominio original. El límite en −1 es 2/3, con hueco; en 2 los laterales son −∞ y +∞. La división x²/(x−1)=x+1+1/(x−1) prueba la asíntota oblicua y=x+1 en ambos extremos; restar x deja límite 1, por lo que y=x no sirve. Su derivada es x(x−2)/(x−1)², con signos +,−,−,+ en los intervalos separados por 0,1,2; máximo relativo (0,0) y mínimo relativo (2,4), sin extremo en el punto excluido 1. x/(x²+1) tiende a 0 en ambos infinitos y cambia de signo en 0: puede cruzar su asíntota horizontal. Cancelar una sola potencia en (x−a)/(x−a)² deja un polo. Si la división tiene resto cero, la diferencia con la recta es idénticamente cero en el dominio, cumpliendo la definición por límite. Controles exactos en `../tmp/p03/verificacion-racionales.json`.

Verificación: contrato del catálogo 3/3; enlaces de 198 páginas sin pendientes. Contenido de las doce actividades comprobado aisladamente con estilos y motor reales, raíz/subcarpeta, 360 px y texto al 200 %: 36 fórmulas por caso, sin errores ni desbordamiento global. No certifica la interacción completa ni la escucha real.

`fix(p03f-f2c)`: pregunta autosuficiente y dos tarjetas precisadas. Sigue F2D: funciones exponenciales. F2 global, P03F, EV-INF-01 y TEO-25E3–E4 siguen pendientes.


### F2D · Funciones exponenciales · 15 de noviembre de 2026

Revisadas seis preguntas `exp-01–06` (24 alternativas) y seis tarjetas `fc-exp-01–06`. Las seis preguntas y tres tarjetas se conservan sin cambios; se precisan tres tarjetas, con IDs, claves, fuentes y cantidades conservados.

- `fc-exp-04`: explicita a>0, a≠1 y dominio real completo para el recorrido y las transformaciones de C a^x+k.
- `fc-exp-05`: repite las condiciones de la base para poder interpretar la tarjeta individualmente.
- `fc-exp-06`: precisa valor inicial positivo, tasa constante r>−1, periodos completos y la necesidad de extender el modelo para admitir tiempo real. El caso r=−1 se trata aparte: pérdida total tras el primer periodo, sin usar 0^0 para el valor inicial.

Cotejo: 2^x es positiva y estrictamente creciente, con recorrido (0,+∞) y límite 0 en −∞; (1/2)^x es positiva y estrictamente decreciente, con límite 0 en +∞. h(x)=2−4(1/2)^x tiene h′(x)=−4(1/2)^x ln(1/2)>0, límites −∞ y 2, y recorrido (−∞,2). Los valores h(0),h(1),h(2) son −2,0,1. El capital compuesto es exactamente 1000(21/20)^3=9261/8=1157,625 €, redondeado a 1157,63 € al final; la pérdida anual del 20 % conserva un factor 4/5 y da 12000(4/5)^3=6144 €. En C a^x+k, el signo de C ln a determina la monotonía; C≠0 y a≠1 excluyen extremos en el dominio real completo. La asíntota y=k y el recorrido se deducen de a^x>0 y sus límites. Controles exactos y redondeo decimal en `../tmp/p03/verificacion-exponenciales.json`. Los contextos monetarios son modelos didácticos hipotéticos, sin recomendaciones financieras.

Verificación: contrato del catálogo 3/3; enlaces de 198 páginas sin pendientes. Contenido de las doce actividades comprobado aisladamente con estilos y motor reales, raíz/subcarpeta, 360 px y texto al 200 %: 35 fórmulas por caso, sin errores ni desbordamiento global. No certifica la interacción completa ni la escucha real.

`fix(p03f-f2d)`: tres tarjetas precisadas; preguntas y respuestas conservadas. Sigue F2E: funciones logarítmicas. F2 global, P03F, EV-INF-01 y TEO-25E3–E4 permanecen pendientes.


### F2E · Funciones logarítmicas · 15 de noviembre de 2026

Revisadas seis preguntas `log-01–06` (24 alternativas) y seis tarjetas `fc-log-01–06`. IDs, claves, fuentes y cantidades conservados.

- `log-05`: explicita cantidad inicial positiva y crecimiento del 5 % sobre el valor del año anterior, evitando ambigüedad con crecimiento simple o cantidad nula.
- `fc-log-02`: repite las condiciones a>0 y a≠1 para consultar la tarjeta individualmente.
- `fc-log-04`: explicita la base válida y el exponente real r en las propiedades.
- Otras cinco preguntas y cuatro tarjetas sin cambios.

Cotejo: ln x exige x>0 por ser inversa de e^y; (1/2)^(−2)=4. En log₂(x−1)−1, dominio x>1 y límite −∞ por la derecha de 1. La ecuación de dos logaritmos exige x>3 antes de agruparlos: (x−1)(x−3)=8 da x=5 o −1, pero sólo 5 es admisible. La duplicación exige (21/20)^t≥2; el umbral es aproximadamente 14,207 años y las comparaciones racionales exactas (21/20)^14<2<(21/20)^15 confirman el primer año completo 15. Para A(q)=100 ln(1+q), las expresiones derivadas 100/(1+q)>0 y −100/(1+q)²<0 son válidas en el interior q>0; en q=0 se interpretan mediante la extensión a q>−1 o lateralmente. Para un incremento fijo s>0, A(q+s)−A(q)=100 ln(1+s/(1+q)) disminuye con q≥0. A crece sin cota, sin máximo en ese dominio. Las propiedades se usan con argumentos originales positivos; un producto positivo por sí solo no autoriza separar logaritmos reales. Controles en `../tmp/p03/verificacion-logaritmicas.json`.

Verificación: contrato del catálogo 3/3; enlaces de 198 páginas sin pendientes. Contenido de las doce actividades comprobado aisladamente con estilos y motor reales, raíz/subcarpeta, 360 px y texto al 200 %: 34 fórmulas por caso, sin errores ni desbordamiento global. No certifica la interacción completa ni la escucha real.

`fix(p03f-f2e)`: una pregunta y dos tarjetas precisadas. Sigue F2F: funciones a trozos y valor absoluto. F2 global, P03F, EV-INF-01 y TEO-25E3–E4 permanecen pendientes.


### F2F · Funciones a trozos y valor absoluto · 15 de noviembre de 2026

Revisadas seis preguntas `piece-01–06` (24 alternativas) y seis tarjetas `fc-piece-01–06`. IDs, claves, fuentes y cantidades conservados.

- `piece-03`: incluye las dos ramas de la función, evitando depender de «la misma f» de otra actividad. La explicación desarrolla los cocientes incrementales izquierdo y derecho.
- `fc-piece-01`: precisa que condiciones solapadas deben asignar el mismo valor para definir una función sin ambigüedad.
- `fc-piece-04`: explicita que ambos cocientes usan el mismo valor real f(a).
- Otras cinco preguntas y cuatro tarjetas sin cambios.

Cotejo: |x|=−x para x<0 y x para x≥0. En la unión x² para x<1 y 2x−1 para x≥1, f(1)=1 por la segunda rama; ambos límites valen 1. Para h<0, ((1+h)²−1)/h=2+h; para h>0, (2(1+h)−1−1)/h=2. La derivada en 1 es 2 y la función crece a ambos lados próximos, sin extremo en ese punto. |x−1|−2≥−2 con igualdad sólo en x=1; los cocientes laterales allí valen −1 y 1, por lo que el mínimo absoluto no es derivable. La tarifa progresiva es T(q)=2q para 0≤q≤10 y T(q)=20+3(q−10) para q>10; ambas expresiones dan 20 en el umbral y T(12)=26. Redefinir f(a)=1 cuando ambos laterales valen 1 elimina la discontinuidad evitable; asignar una derivada no corrige el valor de una función discontinua. Controles exactos en `../tmp/p03/verificacion-trozos.json`.

Verificación: contrato del catálogo 3/3; enlaces de 198 páginas sin pendientes. Contenido de las doce actividades comprobado aisladamente con estilos y motor reales, raíz/subcarpeta, 360 px y texto al 200 %: 15 fórmulas por caso, sin errores ni desbordamiento global. No certifica la interacción completa ni la escucha real.

`fix(p03f-f2f)`: una pregunta autosuficiente y dos tarjetas precisadas. Sigue F2G: traslaciones. F2 global, P03F, EV-INF-01 y TEO-25E3–E4 siguen pendientes.


### F2G · Traslaciones · 15 de noviembre de 2026

Revisadas seis preguntas `shift-01–06` (24 alternativas) y seis tarjetas `fc-shift-01–06`. Las preguntas se conservan sin cambios. IDs, claves, fuentes y cantidades conservados.

- `fc-shift-03–06`: explicitan g(x)=f(x−a)+k dentro de cada respuesta para que los parámetros a y k no dependan de otra tarjeta. La tarjeta de dominio sustituye la redacción ambigua «se suma a a» por las correspondencias u→u+a y v→v+k.
- Dos tarjetas sin cambios.

Cotejo: si f(u)=v, entonces g(u+a)=v+k; por tanto f(x−2) desplaza dos unidades a la derecha. Para f(x+2)−4, (−1,3) pasa a (−3,−1). La condición −1≤x−3<4 equivale a 2≤x<7, conservando inclusión de extremos. (x−2)²−3 tiene mínimo −3 sólo en x=2 y recorrido [−3,+∞). En 1/(x+2)+1, el dominio excluye −2, la asíntota vertical es x=−2 y la horizontal y=1; el recorrido excluye 1 porque el recíproco nunca vale cero y alcanza todo valor real no nulo. Si f(1)=0, g(3)=f(1)+3=3, sin conservar el corte con X. Para una oblicua original y=mx+b, la nueva recta es m(x−a)+b+k=mx+b+k−ma: la diferencia con la curva sigue tendiendo a cero en el extremo correspondiente. Los nuevos ceros exigen f(x−a)=−k; el corte Y requiere −a en el dominio. Controles exactos de las identidades en `../tmp/p03/verificacion-traslaciones.json`.

Verificación: contrato del catálogo 3/3; enlaces de 198 páginas sin pendientes. Contenido de las doce actividades comprobado aisladamente con estilos y motor reales, raíz/subcarpeta, 360 px y texto al 200 %: 14 fórmulas por caso, sin errores ni desbordamiento global. No certifica la interacción completa ni la escucha real.

`fix(p03f-f2g)`: cuatro tarjetas autosuficientes; preguntas y respuestas conservadas. Sigue F2H: expansión y contracción. F2 global, P03F, EV-INF-01 y TEO-25E3–E4 permanecen pendientes.


### F2H · Expansión y contracción · 15 de noviembre de 2026

Revisadas seis preguntas `scale-01–06` (24 alternativas) y seis tarjetas `fc-scale-01–06`. Las seis preguntas y la primera tarjeta se conservan sin cambios. IDs, claves, fuentes y cantidades conservados.

- `fc-scale-02–03`: identifican las transformaciones exterior/interior y los factores no nulos, permitiendo consultar cada tarjeta por separado.
- `fc-scale-04–05`: explicitan a,b no nulos; los extremos «pasan» a las nuevas coordenadas, evitando llamar traslación a una escala.
- `fc-scale-06`: precisa derivabilidad de f en bx y distingue ceros de f de ceros de f′ en sus correspondencias.

Cotejo: para a,b no nulos, bx=u da x=u/b y g(u/b)=av. Por tanto 3f(x) multiplica alturas por 3 y f(2x) reduce a la mitad las distancias al eje Y. En −2f(−x/2), (4,−3) pasa a (−8,6). Resolver 1≤−2x<5 da −5/2<x≤−1/2: se conserva la inclusión de cada extremo y se invierte su orden. Si f≥−1 con igualdad en 2, entonces −3f≤3 con igualdad en 2: máximo absoluto (2,3), no necesariamente único si el original no lo fuera. ln(−2x) exige x<0 y tiene derivada 1/x<0. La cadena g′(x)=ab f′(bx) concuerda con la derivación directa del ejemplo f(u)=u²−1 para factores positivos y negativos. Las asíntotas verticales x=c pasan a x=c/b y las horizontales y=L a y=aL; b<0 intercambia el extremo de aproximación. Controles exactos en `../tmp/p03/verificacion-escalas.json`.

Verificación: contrato del catálogo 3/3; enlaces de 198 páginas sin pendientes. Contenido de las doce actividades comprobado aisladamente con estilos y motor reales, raíz/subcarpeta, 360 px y texto al 200 %: 15 fórmulas por caso, sin errores ni desbordamiento global. No certifica la interacción completa ni la escucha real.

`fix(p03f-f2h)`: cinco tarjetas precisadas; preguntas y respuestas conservadas. Sigue F2I: optimización. F2 global, P03F, EV-INF-01 y TEO-25E3–E4 permanecen pendientes.


### F2I · Optimización · 15 de noviembre de 2026

Revisadas seis preguntas `opt-01–06` (24 alternativas) y seis tarjetas `fc-opt-01–06`. IDs, claves, fuentes y cantidades conservados.

- `opt-02`: incorpora unidades de ingresos, costes y producción al propio enunciado.
- `opt-03`: explicita euros, toneladas y dominio 0≤q≤8, sin depender de un problema anterior para interpretar la capacidad.
- `opt-05`: añade M(q)−20=(q−10)²/q≥0 para q>0, probando mínimo absoluto y unicidad en 10.
- `fc-opt-05`: limita el criterio de vecinos a parábolas estrictamente cóncavas sobre los enteros de un intervalo y exige admisibilidad de los candidatos.
- Otras tres preguntas y cinco tarjetas sin cambios.

Cotejo: continuidad en [a,b] garantiza extremos absolutos; si además hay derivabilidad interior, Fermat obliga a derivada cero en cada extremo interior. El beneficio R−C=−q²+40q−100=300−(q−20)² da máximo 300 en 20 dentro de [0,24]; valores de frontera −100 y 284. En [0,8] su derivada es positiva y el máximo es B(8)=156. Para −q²+25q−100=225/4−(q−25/2)², los enteros admisibles más próximos a 12,5 son 12 y 13; ambos dan 56 y se contrasta enumerando 0–16. M(q)=q+100/q tiene derivada 1−100/q², negativa antes de 10 y positiva después, y la identidad cuadrática prueba el mínimo global 20 €/unidad sin usar compacidad en (0,+∞). Un candidato q=−3 no es admisible si q≥0, pero descartarlo no demuestra que no haya otros óptimos. Controles exactos en `../tmp/p03/verificacion-optimizacion.json`.

Verificación: contrato del catálogo 3/3; enlaces de 198 páginas sin pendientes. Contenido de las doce actividades comprobado aisladamente con estilos reales, raíz/subcarpeta, 360 px y texto al 200 %, sin desbordamiento global. Este módulo expresa actualmente sus fórmulas como texto Unicode, sin delimitadores LaTeX: el renderizador no genera contenedores matemáticos (0 en ambos casos); esta comprobación no se presenta como prueba de renderizado de fórmulas. No certifica la interacción completa ni la escucha real.

- [x] F2I-LTX: convertir las expresiones matemáticas en preguntas, opciones, explicaciones y tarjetas de optimización a delimitadores LaTeX, conservando el texto y las claves; verificar renderizado y accesibilidad antes de cerrar la conciliación de F2.

`fix(p03f-f2i)`: tres preguntas y una tarjeta precisadas; revisión matemática editorial completada. Sigue F2I-LTX antes del repaso F2J. F2 global, P03F, EV-INF-01 y TEO-25E3–E4 siguen abiertos.


### F2I-LTX · Fórmulas de optimización · 15 de noviembre de 2026

Convertidas **48 expresiones** de `content/activities/optimization.js` a delimitadores LaTeX mediante literales `String.raw`. Incluye enunciados, alternativas, retroalimentaciones, explicaciones y tarjetas: intervalos, ecuaciones, restricciones, derivadas y cocientes. Las fracciones usan `\frac`, las potencias superíndices y las desigualdades `\le`/`\ge`. Se conservan seis preguntas, seis tarjetas, sus IDs, las cuatro alternativas por pregunta y sus claves. No se modifica el motor matemático ni el diseño.

- Contrato del catálogo: 3/3 pruebas superadas.
- Enlaces: 198 páginas, cero pendientes.
- Contenido completo de las doce actividades comprobado aisladamente con estilos y motor reales en raíz y subcarpeta, a 360 px y texto al 200 %: **48 fórmulas y 48 estructuras MathML asistivas en cada caso**, cero errores y sin desbordamiento global.
- Renderizado solicitado dos veces sobre el mismo contenido: siguen existiendo 48 contenedores, sin duplicación.
- Revisión de las expresiones convertidas: se mantienen signos, valores y dominios de la revisión matemática F2I; las claves de respuesta se conservan. La existencia de MathML no certifica la pronunciación con lector de pantalla ni sustituye el control manual pendiente.

`fix(p03f-f2i-ltx)`: cerrado el pendiente de fórmulas de optimización que antes aparecían como texto Unicode. Sigue F2J: repaso y conciliación por IDs del tema 2. F2 global, P03F, EV-INF-01 y TEO-25E3–E4 permanecen pendientes.

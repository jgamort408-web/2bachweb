# Inventario y diagnóstico de los materiales locales

**Fecha:** 15 de septiembre de 2026.  
**Documento principal:** [Prompt maestro de construcción](<C:/Users/usuario/OneDrive/Documentos/Aplicaciones/2º Bachillerato Matemáticas Aplicadas a las Ciencias Sociales/PROMPT_MAESTRO_WEB_MATEMATICAS_CCSS_II.md>).

## 1. Alcance de la revisión

Se inventariaron los **78 archivos originales** de las cuatro carpetas. Se inspeccionaron estructura, texto y código de los materiales, los bancos de datos y las entradas de todos los ZIP; se renderizó la vista inicial de las 44 páginas HTML y se visualizaron las 13 imágenes únicas. Esta revisión permite fundamentar el prompt y localizar incidencias; no certifica todas las soluciones ni todas las interacciones. Los exámenes se inspeccionaron como fuentes LaTeX, sin compilarlos a PDF.

Los archivos nuevos de esta preparación y los temporales de revisión no forman parte del recuento de originales. Ningún original se ha editado.

### Carpeta raíz

```text
C:\Users\usuario\OneDrive\Documentos\Aplicaciones\2º Bachillerato Matemáticas Aplicadas a las Ciencias Sociales
```

En las tablas, las rutas de código son relativas a esta raíz; los enlaces abren la ubicación absoluta actual. Para ZIP, `::` separa paquete y entrada interna. Las entradas no son archivos sueltos mientras no se extraigan.

| Carpeta | Archivos | Contenido |
|---|---:|---|
| `Temario completo/` | 1 | Guion Markdown, nueve temas y 86 epígrafes |
| `Planificacion_Interactiva_2Bach_CC_Sociales/` | 3 | Laboratorios, flashcards y test |
| `Página web existente/` | 44 | Documentos HTML completos guardados como TXT |
| `Materiales y Recursos y Exámenes/` | 30 | Paquetes ZIP, cada uno con main.tex |

### Cantidades comprobadas

- 4 Markdown, 44 TXT y 30 ZIP: 78 archivos originales.
- 30 fuentes `main.tex` y 189 entradas PNG dentro de los ZIP; las imágenes se reducen a 13 contenidos únicos por SHA-256.
- 28 propuestas de laboratorios en el documento de planificación.
- 206 filas numeradas de flashcards en su documento; los mazos HTML añaden material parcialmente coincidente.
- 90 preguntas en el Markdown de test, 20 en el test HTML de inferencia y 10 en el juego de combinatoria. Estas cantidades no equivalen a un banco deduplicado y validado.
- 71 registros identificados en cinco bancos HTML: 6 programación lineal + 9 estadística bidimensional + 8 probabilidad + 21 distribuciones + 27 inferencia. Además hay ejemplos en las lecciones y ejercicios en los ZIP.

## 2. Hallazgos que condicionan el proyecto

1. El temario principal no coincide con la numeración de la web anterior: PL pasa de 1 a 6; probabilidad de 3 a 7; distribuciones de 4 a 8; inferencia de 5 a 9.
2. Los temas 1–5 del guion carecen de carpetas HTML equivalentes. Hay guion, planificación y exámenes, pero hace falta desarrollar su libro e interacción.
3. Estadística bidimensional y combinatoria son materiales adicionales que conviene conservar como apoyos. No se deben eliminar por no ser temas numerados del guion.
4. `Inicio.txt` y `1. Programación Lineal/0. Presentación.txt` son idénticos byte a byte. Es el único grupo de archivos originales con hash completo idéntico.
5. Los ZIP de Examen Funciones y Examen Funciones (Copy) tienen distintos contenidos: no se deben borrar por el nombre.
6. Los ZIP repiten imágenes heredadas y logotipos de varios centros. Los `includegraphics` inspeccionados usan principalmente Logo AL-ANDALUS.png; el ZIP de Soluciones 1 de PL referencia ej1.png, ej2.png y ej3.png. Las demás imágenes incluidas no justifican ampliar el temario por sí solas.
7. Algunas soluciones contienen errores de cálculo, restricciones o transcripción; consultar la tabla de incidencias.
8. La portada contiene referencias de fecha 2024 y 2025–2026 y un itinerario parcial. Debe sustituirse por el índice completo y un curso configurable.
9. La web presenta estilos distintos: fichas sobre cuadrícula, tarjetas con colores vivos y capítulos de probabilidad con apariencia editorial. Unificar mediante un sistema común.
10. Las dependencias detectadas incluyen Google Fonts, MathJax 3 y GeoGebra. Durante la vista local hubo fórmulas sin renderizar y errores de inicialización; son observaciones de este entorno, no prueba de que fallen en toda instalación.

## 3. Incidencias concretas para revisar antes de publicar

Estas comprobaciones son muestras documentadas, no una lista exhaustiva. Los resultados que se señalan como corregidos aquí se verificaron por cálculo directo a partir del enunciado; no se han modificado las fuentes.

| ID | Fuente y localizador | Hallazgo | Corrección o actuación |
|---|---|---|---|
| M01 | F001, `main.tex`, ejercicio 1(b) | Se afirma asíntota vertical x=1 y monotonía decreciente en todo el dominio para a=4, pero 1/(x−1) solo se usa si x≥2 | No existe esa asíntota vertical: alrededor de 1 rige el polinomio. Hay descenso en cada rama, pero salto ascendente en x=2; por ejemplo f(1,9)=0,01 < f(2)=1. La horizontal y=0 sí corresponde a x→+∞ |
| M02 | F002, `main.tex`, ejercicio 1, probabilidad de al menos 6 ciclistas | Se escribe 0,2⁸=0,0000256 y total 0,0012576 | 0,2⁸=0,00000256. P(X≥6) para B(8;0,2)=0,00123136 |
| M03 | F003, `main.tex`, normal, bonificación | El desarrollo mezcla 0,85, 0,8 y 16,8 en una misma igualdad | Si z≈0,85, entonces x≈85+20·0,85=102. El resultado final es coherente con esa aproximación, el desarrollo debe corregirse |
| M04 | F009, `main.tex`, ejercicio de 16 pacientes | Se suma 137 y se calcula media 8,5625 | Los 16 datos suman 144 y la media es 9. Con z≈2,24 y σ=2, el IC es aproximadamente (7,88;10,12) |
| M05 | F009, `main.tex`, ejercicio de frambuesas | Se suma 109 y se usa media 10,9 | Los diez precios suman 110: media 11. Recalcular el IC con ese centro. Revisar además convención N(μ,σ) frente a N(μ,σ²) |
| M06 | F030 y F029, `main.tex`, ejercicio 1 | El enunciado usa a/(x−1) y la solución usa a(x−1); aparecen versiones repetidas | Resolver el original: continuidad da a=1 y derivabilidad da b=1. La pareja a=1,b=−1 pertenece a la rama lineal de la solución, no al enunciado original |
| M07 | F019 y ejercicios de misiones de F021/F022 | «Superarse los 2 millones» se modeliza en la solución con ≥ en vez de > | Mantener la condición estricta o declarar una adaptación del enunciado. Los puntos con gasto exactamente 2 millones no pertenecen al conjunto estricto. Distinguir además decisiones enteras y modelo continuo |
| M08 | F023, `main.tex`, gráfica de f tras la tangente | El texto obtiene y=8x−10; una línea vertical en x=2 tiene comentario de tangente | Dibujar y=8x−10. La vertical puede ser auxiliar, pero no representa la tangente obtenida |
| M09 | F033, pregunta T1.5 | De f'(a)>0 en un punto se induce crecimiento local sin precisar hipótesis | Formular positividad de la derivada en un intervalo o añadir las hipótesis pertinentes |
| M10 | F036/F037, explicaciones de PL | Aparecen formulaciones absolutas sobre vértices y no negatividad | Precisar existencia del óptimo, región factible y supuestos. x,y≥0 dependen del significado de las variables; no añadir y≥0 a un recinto abstracto que no lo impone |
| M11 | F065/F067/F068, distribuciones muestrales | Uso de n≥30 como regla universal y mezcla de normalidad exacta y TCL | Explicar muestreo, independencia y condiciones; población normal da media normal exacta, y n≥30 es una orientación, no garantía universal |
| M12 | F039/F040/F048/F056/F063/F071, vista local | GGBApplet no definido o MathJax.typesetPromise no disponible en este render | Esperar carga, empaquetar dependencias pertinentes y ofrecer alternativa. Volver a probar bajo servidor y red real; no atribuir toda falta de render a un error del contenido |


### Incidencia añadida durante la entrega 28 (29 de septiembre de 2026)

| ID | Fuente y localizador | Hallazgo | Corrección o actuación |
|---|---|---|---|
| M13 | F029, `BACH - 2º SOC - Subida de nota T1 General Soluciones.zip`, `main.tex`, primer documento, ejercicio 3, líneas 256–269 | En la línea 263 se escribe ∫1/(1−x) dx=x. La respuesta final usa ln(1−x), que no cubre x>1 | Corregir el paso a −ln\|1−x\|+C. Para h=x²+e^(2x)−1/(1−x), la familia es x³/3+e^(2x)/2+ln\|1−x\|+C en cada intervalo a un lado de 1. Desarrollo incorporado y comprobado en la lección 3.4; la corrección de la copia LaTeX y su compilación PDF siguen pendientes en la fase de recursos. El ZIP original se conserva. |

## 4. Relaciones entre enunciados y soluciones

### Conciliación de identificadores · 18 de octubre de 2026

M13 identifica exclusivamente el paso logarítmico de F029 descrito arriba. El problema del comentario de aterrizaje de F008, denominado M13 en el registro web de la entrega 07, pasa a **M14**: de \(D(t)=100/(t^2+1)\to0\) no se deduce que se alcance cero en tiempo finito. La adaptación HTML ya lo aclara; corregir la copia LaTeX y verificar sus PDF sigue pendiente. El detalle y la equivalencia histórica están en [incidencias de contenido](Web_Matematicas_CCSS_II/docs/incidencias-contenido.md).

| Enunciado | Solución candidata | Observación |
|---|---|---|
| F021: Programación Lineal 1 | F019: Soluciones 1 | Comparar restricciones y gráficos |
| F022: Programación Lineal 2 | F020: Soluciones 2 | Conservar apartados que piden formular sin resolver |
| F026: SELs I | F025: SELs I (SOLUCIONES) | Comparar matrices, parámetro y contexto de tabletas |
| F028: SELs II | F027: SELs II (SOLUCIONES) | Comparar matrices y problema de logística |
| F024: Recuperación T1 | F023: Recuperación T1 Soluciones | Revisar gráfica de la tangente |
| F030: Subida de nota T1 General | F029: General Soluciones | No es una pareja fiel en ejercicio 1; ver M06 |
| F011/F012: Inferencia I/II | F010 y soluciones internas | Hay ejercicios compartidos; cotejar números, puntuación y redacción |
| F008: Límites y Derivadas | F004: Ejercicios repaso, parcialmente | Coinciden ciertos enunciados; comprobar cada correspondencia |

La presencia de entornos solution se comprueba en el código, aunque una configuración de compilación pueda ocultarlos en la impresión. No decidir que un examen carece de soluciones mirando solo el nombre.

## 5. Catálogo completo de los 78 archivos

### Temario completo

#### F078 · Guion_Temario_Matematicas_CC_Sociales_II_2Bach.md

**Ruta:** `Temario completo/Guion_Temario_Matematicas_CC_Sociales_II_2Bach.md`  
**Abrir:** [Archivo original](<C:/Users/usuario/OneDrive/Documentos/Aplicaciones/2º Bachillerato Matemáticas Aplicadas a las Ciencias Sociales/Temario completo/Guion_Temario_Matematicas_CC_Sociales_II_2Bach.md>)  
**Tamaño:** 37.542 bytes.

Guion rector: nueve temas y 86 epígrafes; indica conceptos y tareas que desarrollar, no contiene un libro completo.

**Estructura:** ver documento original y los apartados de cobertura del prompt; 99 encabezados detectados.

### Planificacion_Interactiva_2Bach_CC_Sociales

#### F031 · 01_Laboratorios_Minijuegos_2Bach_CC_Sociales.md

**Ruta:** `Planificacion_Interactiva_2Bach_CC_Sociales/01_Laboratorios_Minijuegos_2Bach_CC_Sociales.md`  
**Abrir:** [Archivo original](<C:/Users/usuario/OneDrive/Documentos/Aplicaciones/2º Bachillerato Matemáticas Aplicadas a las Ciencias Sociales/Planificacion_Interactiva_2Bach_CC_Sociales/01_Laboratorios_Minijuegos_2Bach_CC_Sociales.md>)  
**Tamaño:** 19.673 bytes.

Especificación de 28 laboratorios y minijuegos; mecánicas, generación, dificultad, feedback y progreso.

**Estructura:** ver documento original y los apartados de cobertura del prompt; 129 encabezados detectados.

#### F032 · 02_Flashcards_2Bach_CC_Sociales.md

**Ruta:** `Planificacion_Interactiva_2Bach_CC_Sociales/02_Flashcards_2Bach_CC_Sociales.md`  
**Abrir:** [Archivo original](<C:/Users/usuario/OneDrive/Documentos/Aplicaciones/2º Bachillerato Matemáticas Aplicadas a las Ciencias Sociales/Planificacion_Interactiva_2Bach_CC_Sociales/02_Flashcards_2Bach_CC_Sociales.md>)  
**Tamaño:** 17.290 bytes.

206 filas de tarjetas por nueve temas; tipos de tarjeta y repetición espaciada.

**Encabezados/contenido detectado:** Sistema de flashcards; Matemáticas Aplicadas a las Ciencias Sociales II — 2.º de Bachillerato; 0. Diseño general; 0.1. Tipos de tarjetas; 0.2. Mecánica de repaso; 0.3. Estructura de datos; 1. Tema 1 — Límites y derivadas; 2. Tema 2 — Representación de funciones; 3. Tema 3 — Integrales; 4. Tema 4 — Matrices y determinantes; 5. Tema 5 — Sistemas de ecuaciones; 6. Tema 6 — Programación lineal; 7. Tema 7 — Probabilidad; 8. Tema 8 — Distribuciones de probabilidad; 9. Tema 9 — Inferencia estadística; 10. Funciones recomendadas de la interfaz; 10.1. Regla didáctica importante; 10.2. Microfeedback.

#### F033 · 03_Tests_2Bach_CC_Sociales.md

**Ruta:** `Planificacion_Interactiva_2Bach_CC_Sociales/03_Tests_2Bach_CC_Sociales.md`  
**Abrir:** [Archivo original](<C:/Users/usuario/OneDrive/Documentos/Aplicaciones/2º Bachillerato Matemáticas Aplicadas a las Ciencias Sociales/Planificacion_Interactiva_2Bach_CC_Sociales/03_Tests_2Bach_CC_Sociales.md>)  
**Tamaño:** 16.360 bytes.

90 preguntas iniciales (10 por tema); diseño de distractores, modos, puntuación y ampliación a 60–80 ítems/tema.

**Estructura:** ver documento original y los apartados de cobertura del prompt; 112 encabezados detectados.

### Página web existente

#### F034 · 0. Presentación.txt

**Ruta:** `Página web existente/1. Programación Lineal/0. Presentación.txt`  
**Abrir:** [Archivo original](<C:/Users/usuario/OneDrive/Documentos/Aplicaciones/2º Bachillerato Matemáticas Aplicadas a las Ciencias Sociales/Página web existente/1. Programación Lineal/0. Presentación.txt>)  
**Tamaño:** 12.621 bytes.

Es una copia exacta de Inicio.txt; no es una presentación específica de programación lineal.

**Encabezados/contenido detectado:** Estadística & Matemáticas.

#### F035 · 1. Inecuaciones.txt

**Ruta:** `Página web existente/1. Programación Lineal/1. Inecuaciones.txt`  
**Abrir:** [Archivo original](<C:/Users/usuario/OneDrive/Documentos/Aplicaciones/2º Bachillerato Matemáticas Aplicadas a las Ciencias Sociales/Página web existente/1. Programación Lineal/1. Inecuaciones.txt>)  
**Tamaño:** 12.003 bytes.

**Encabezados/contenido detectado:** Inecuaciones Lineales; ✦ Método de Resolución Gráfica.

**Scripts externos:** `https://cdn.jsdelivr.net/npm/mathjax@3/es5/tex-mml-chtml.js`.

#### F036 · 2. Sistemas de inecuaciones.txt

**Ruta:** `Página web existente/1. Programación Lineal/2. Sistemas de inecuaciones.txt`  
**Abrir:** [Archivo original](<C:/Users/usuario/OneDrive/Documentos/Aplicaciones/2º Bachillerato Matemáticas Aplicadas a las Ciencias Sociales/Página web existente/1. Programación Lineal/2. Sistemas de inecuaciones.txt>)  
**Tamaño:** 12.064 bytes.

**Encabezados/contenido detectado:** Sistemas de Inecuaciones; Ejemplo de Sistema; Región Factible (Intersección); Tipos de Región Factible; Acotada; No Acotada.

**Scripts externos:** `https://cdn.jsdelivr.net/npm/mathjax@3/es5/tex-mml-chtml.js`.

#### F037 · 3. Programación Lineal.txt

**Ruta:** `Página web existente/1. Programación Lineal/3. Programación Lineal.txt`  
**Abrir:** [Archivo original](<C:/Users/usuario/OneDrive/Documentos/Aplicaciones/2º Bachillerato Matemáticas Aplicadas a las Ciencias Sociales/Página web existente/1. Programación Lineal/3. Programación Lineal.txt>)  
**Tamaño:** 11.750 bytes.

**Encabezados/contenido detectado:** Anatomía de la Programación Lineal; Flujo de Información; 1. Variables; 2. Función Objetivo; 3. Restricciones; La Regla Olvidada: No Negatividad.

**Scripts externos:** `https://cdn.jsdelivr.net/npm/mathjax@3/es5/tex-mml-chtml.js`.

#### F038 · 4. El método gráfico.txt

**Ruta:** `Página web existente/1. Programación Lineal/4. El método gráfico.txt`  
**Abrir:** [Archivo original](<C:/Users/usuario/OneDrive/Documentos/Aplicaciones/2º Bachillerato Matemáticas Aplicadas a las Ciencias Sociales/Página web existente/1. Programación Lineal/4. El método gráfico.txt>)  
**Tamaño:** 17.454 bytes.

**Encabezados/contenido detectado:** El Método Gráfico; Algoritmo de Resolución; Ejemplo Resuelto: "Sillas y Mesas"; Paso 1 & 2: Modelo; Paso 3: Región Factible; Paso 4: Evaluación de Vértices.

**Scripts externos:** `https://cdn.jsdelivr.net/npm/mathjax@3/es5/tex-mml-chtml.js`.

#### F039 · 5. Ejercicios Resueltos.txt

**Ruta:** `Página web existente/1. Programación Lineal/5. Ejercicios Resueltos.txt`  
**Abrir:** [Archivo original](<C:/Users/usuario/OneDrive/Documentos/Aplicaciones/2º Bachillerato Matemáticas Aplicadas a las Ciencias Sociales/Página web existente/1. Programación Lineal/5. Ejercicios Resueltos.txt>)  
**Tamaño:** 33.315 bytes.

Banco de 6 ejercicios en const ejercicios; integración GeoGebra. No basta con leer el texto inicial visible.

**Encabezados/contenido detectado:** Laboratorio de Problemas; 📈 Laboratorio Gráfico; Resolución Paso a Paso.

**Interacción detectada en código:** `renderExercise`. Esta detección no equivale a una prueba funcional completa.

**Scripts externos:** `https://cdn.jsdelivr.net/npm/mathjax@3/es5/tex-mml-chtml.js`, `https://www.geogebra.org/apps/deployggb.js`.

#### F040 · 6. Flashcards.txt

**Ruta:** `Página web existente/1. Programación Lineal/6. Flashcards.txt`  
**Abrir:** [Archivo original](<C:/Users/usuario/OneDrive/Documentos/Aplicaciones/2º Bachillerato Matemáticas Aplicadas a las Ciencias Sociales/Página web existente/1. Programación Lineal/6. Flashcards.txt>)  
**Tamaño:** 13.170 bytes.

**Encabezados/contenido detectado:** 📐 Programación Lineal.

**Interacción detectada en código:** `renderCards`. Esta detección no equivale a una prueba funcional completa.

**Scripts externos:** `https://cdn.jsdelivr.net/npm/mathjax@3/es5/tex-mml-chtml.js`.

#### F041 · 0. Presentación.txt

**Ruta:** `Página web existente/2. Estadística Bidimensional/0. Presentación.txt`  
**Abrir:** [Archivo original](<C:/Users/usuario/OneDrive/Documentos/Aplicaciones/2º Bachillerato Matemáticas Aplicadas a las Ciencias Sociales/Página web existente/2. Estadística Bidimensional/0. Presentación.txt>)  
**Tamaño:** 17.613 bytes.

**Encabezados/contenido detectado:** Estadística Bidimensional; ⚡ Repaso Flash: 1D; El salto dimensional; La Variable Bidimensional; Tabulación de Datos; Ejemplo: Notas Matemáticas ($X$) vs Física ($Y$).

**Scripts externos:** `https://cdn.jsdelivr.net/npm/mathjax@3/es5/tex-mml-chtml.js`.

#### F042 · 1. La variable bidimensional.txt

**Ruta:** `Página web existente/2. Estadística Bidimensional/1. La variable bidimensional.txt`  
**Abrir:** [Archivo original](<C:/Users/usuario/OneDrive/Documentos/Aplicaciones/2º Bachillerato Matemáticas Aplicadas a las Ciencias Sociales/Página web existente/2. Estadística Bidimensional/1. La variable bidimensional.txt>)  
**Tamaño:** 14.457 bytes.

**Encabezados/contenido detectado:** La Variable Bidimensional; 1. Serie Simple; 2. Tabla de Doble Entrada; La Tabla de Contingencia; De lo complejo a lo simple: Distribuciones Marginales; Distribución Marginal de X; Distribución Marginal de Y.

**Scripts externos:** `https://cdn.jsdelivr.net/npm/mathjax@3/es5/tex-mml-chtml.js`.

#### F043 · 2. La nube de puntos.txt

**Ruta:** `Página web existente/2. Estadística Bidimensional/2. La nube de puntos.txt`  
**Abrir:** [Archivo original](<C:/Users/usuario/OneDrive/Documentos/Aplicaciones/2º Bachillerato Matemáticas Aplicadas a las Ciencias Sociales/Página web existente/2. Estadística Bidimensional/2. La nube de puntos.txt>)  
**Tamaño:** 14.044 bytes.

**Encabezados/contenido detectado:** 📊 2.2 La Nube de Puntos; El Centro de Gravedad.

**Scripts externos:** `https://cdn.jsdelivr.net/npm/mathjax@3/es5/tex-mml-chtml.js`.

#### F044 · 3. La covarianza.txt

**Ruta:** `Página web existente/2. Estadística Bidimensional/3. La covarianza.txt`  
**Abrir:** [Archivo original](<C:/Users/usuario/OneDrive/Documentos/Aplicaciones/2º Bachillerato Matemáticas Aplicadas a las Ciencias Sociales/Página web existente/2. Estadística Bidimensional/3. La covarianza.txt>)  
**Tamaño:** 13.351 bytes.

**Encabezados/contenido detectado:** ⚙️ 2.3 Medidas Conjuntas: La Covarianza; ¿Por qué funciona? La Lógica de los Signos; Contribución a la Covarianza.

**Scripts externos:** `https://cdn.jsdelivr.net/npm/mathjax@3/es5/tex-mml-chtml.js`.

#### F045 · 4. Coeficiente de correlación de Pearson.txt

**Ruta:** `Página web existente/2. Estadística Bidimensional/4. Coeficiente de correlación de Pearson.txt`  
**Abrir:** [Archivo original](<C:/Users/usuario/OneDrive/Documentos/Aplicaciones/2º Bachillerato Matemáticas Aplicadas a las Ciencias Sociales/Página web existente/2. Estadística Bidimensional/4. Coeficiente de correlación de Pearson.txt>)  
**Tamaño:** 13.499 bytes.

**Encabezados/contenido detectado:** El Coeficiente de Correlación de Pearson ($r$); El Problema ($S_{xy}$); La Solución ($r$); Interpretación de Resultados; ⚠️ ¡Cuidado! Correlación $\neq$ Causalidad.

**Scripts externos:** `https://cdn.jsdelivr.net/npm/mathjax@3/es5/tex-mml-chtml.js`.

#### F046 · 5. Regresión lineal.txt

**Ruta:** `Página web existente/2. Estadística Bidimensional/5. Regresión lineal.txt`  
**Abrir:** [Archivo original](<C:/Users/usuario/OneDrive/Documentos/Aplicaciones/2º Bachillerato Matemáticas Aplicadas a las Ciencias Sociales/Página web existente/2. Estadística Bidimensional/5. Regresión lineal.txt>)  
**Tamaño:** 13.574 bytes.

**Encabezados/contenido detectado:** Regresión Lineal: Predicción; El Método de Mínimos Cuadrados; Laboratorio de Predicción; ¿Es fiable mi predicción?.

**Scripts externos:** `https://cdn.jsdelivr.net/npm/mathjax@3/es5/tex-mml-chtml.js`.

#### F047 · 6. Ejercicios resueltos.txt

**Ruta:** `Página web existente/2. Estadística Bidimensional/6. Ejercicios resueltos.txt`  
**Abrir:** [Archivo original](<C:/Users/usuario/OneDrive/Documentos/Aplicaciones/2º Bachillerato Matemáticas Aplicadas a las Ciencias Sociales/Página web existente/2. Estadística Bidimensional/6. Ejercicios resueltos.txt>)  
**Tamaño:** 36.053 bytes.

Banco de 9 ejercicios en const ejercicios: marginales, covarianza, regresión, rectas y transformaciones.

**Encabezados/contenido detectado:** Laboratorio de Problemas; Resolución Paso a Paso.

**Interacción detectada en código:** `renderExercise`. Esta detección no equivale a una prueba funcional completa.

**Scripts externos:** `https://cdn.jsdelivr.net/npm/mathjax@3/es5/tex-mml-chtml.js`.

#### F048 · 7. Flashcards.txt

**Ruta:** `Página web existente/2. Estadística Bidimensional/7. Flashcards.txt`  
**Abrir:** [Archivo original](<C:/Users/usuario/OneDrive/Documentos/Aplicaciones/2º Bachillerato Matemáticas Aplicadas a las Ciencias Sociales/Página web existente/2. Estadística Bidimensional/7. Flashcards.txt>)  
**Tamaño:** 13.173 bytes.

**Encabezados/contenido detectado:** 📊 Estadística Bidimensional.

**Interacción detectada en código:** `renderCards`. Esta detección no equivale a una prueba funcional completa.

**Scripts externos:** `https://cdn.jsdelivr.net/npm/mathjax@3/es5/tex-mml-chtml.js`.

#### F049 · 0. Presentación.txt

**Ruta:** `Página web existente/3. Probabilidad/0. Presentación.txt`  
**Abrir:** [Archivo original](<C:/Users/usuario/OneDrive/Documentos/Aplicaciones/2º Bachillerato Matemáticas Aplicadas a las Ciencias Sociales/Página web existente/3. Probabilidad/0. Presentación.txt>)  
**Tamaño:** 15.998 bytes.

**Encabezados/contenido detectado:** Probabilidad.

#### F050 · 1. Introducción a la probabilidad.txt

**Ruta:** `Página web existente/3. Probabilidad/1. Introducción a la probabilidad.txt`  
**Abrir:** [Archivo original](<C:/Users/usuario/OneDrive/Documentos/Aplicaciones/2º Bachillerato Matemáticas Aplicadas a las Ciencias Sociales/Página web existente/3. Probabilidad/1. Introducción a la probabilidad.txt>)  
**Tamaño:** 20.712 bytes.

**Encabezados/contenido detectado:** Introducción a la Probabilidad; ¿Qué estudiaremos en este tema?; Operaciones con sucesos; Unión ($A \cup B$); Intersección ($A \cap B$); Diferencia ($A - B$); Complementario ($\\bar{A}$ o $A^c$); 💡Probabilidad en la vida real.

**Interacción detectada en código:** `apply`. Esta detección no equivale a una prueba funcional completa.

**Scripts externos:** `https://cdn.jsdelivr.net/npm/mathjax@3/es5/tex-mml-chtml.js`.

#### F051 · 2. Tipos de probabilidad.txt

**Ruta:** `Página web existente/3. Probabilidad/2. Tipos de probabilidad.txt`  
**Abrir:** [Archivo original](<C:/Users/usuario/OneDrive/Documentos/Aplicaciones/2º Bachillerato Matemáticas Aplicadas a las Ciencias Sociales/Página web existente/3. Probabilidad/2. Tipos de probabilidad.txt>)  
**Tamaño:** 20.874 bytes.

**Encabezados/contenido detectado:** Asignación de Probabilidades; Probabilidad teórica; Probabilidad empírica; 1. Probabilidad teórica: Regla de Laplace; Ejemplo: dado perfecto; Ejemplo: baraja española (40 cartas); 2. Probabilidad empírica: datos reales; Estudio de caso: ¿zurdo o diestro?; 3. Ley de los Grandes Números; Ejemplos resueltos paso a paso; ⚠️ Errores típicos a evitar.

**Scripts externos:** `https://cdn.jsdelivr.net/npm/mathjax@3/es5/tex-mml-chtml.js`.

#### F052 · 3. Axiomática de Kolmogorov.txt

**Ruta:** `Página web existente/3. Probabilidad/3. Axiomática de Kolmogorov.txt`  
**Abrir:** [Archivo original](<C:/Users/usuario/OneDrive/Documentos/Aplicaciones/2º Bachillerato Matemáticas Aplicadas a las Ciencias Sociales/Página web existente/3. Probabilidad/3. Axiomática de Kolmogorov.txt>)  
**Tamaño:** 23.792 bytes.

**Encabezados/contenido detectado:** Axiomática de Kolmogorov; Los tres axiomas fundamentales; Normalización; No negatividad; Aditividad; Consecuencias útiles (las que más se usan); 2) Suceso imposible; 3) Unión general; Estrategia Pro: el truco del suceso contrario; Ejemplos paso a paso; ✅ Autoevaluación rápida (1 minuto); 📝 Ejercicios propuestos.

**Interacción detectada en código:** `getVal`. Esta detección no equivale a una prueba funcional completa.

**Scripts externos:** `https://cdn.jsdelivr.net/npm/mathjax@3/es5/tex-mml-chtml.js`.

#### F053 · 4. Tablas de contingencia y diagramas de árboles.txt

**Ruta:** `Página web existente/3. Probabilidad/4. Tablas de contingencia y diagramas de árboles.txt`  
**Abrir:** [Archivo original](<C:/Users/usuario/OneDrive/Documentos/Aplicaciones/2º Bachillerato Matemáticas Aplicadas a las Ciencias Sociales/Página web existente/3. Probabilidad/4. Tablas de contingencia y diagramas de árboles.txt>)  
**Tamaño:** 27.926 bytes.

**Encabezados/contenido detectado:** Tablas de Contingencia y Árboles; 1. Tablas de contingencia; Paso 1: completa los cruces; Paso 2: totales por filas y columnas; Mini-ejemplo numérico (para entrenar); 2. Diagramas de árbol; 🔥 Ejemplo 1: Incendios y negligencias; 📱 Ejemplo 2: Fallos de fábrica; Mini-ejemplo con condicionadas (dependencia); ✅ Autoevaluación rápida; En resumen: ¿cuándo usar qué?; Usa tabla de contingencia; Usa diagrama de árbol.

**Interacción detectada en código:** `getVal`. Esta detección no equivale a una prueba funcional completa.

**Scripts externos:** `https://cdn.jsdelivr.net/npm/mathjax@3/es5/tex-mml-chtml.js`.

#### F054 · 5. Probabilidad total y Teorema de Bayes.txt

**Ruta:** `Página web existente/3. Probabilidad/5. Probabilidad total y Teorema de Bayes.txt`  
**Abrir:** [Archivo original](<C:/Users/usuario/OneDrive/Documentos/Aplicaciones/2º Bachillerato Matemáticas Aplicadas a las Ciencias Sociales/Página web existente/3. Probabilidad/5. Probabilidad total y Teorema de Bayes.txt>)  
**Tamaño:** 28.326 bytes.

**Encabezados/contenido detectado:** Probabilidad Total y Teorema de Bayes; 1. El concepto de partición; Condiciones; Truco de examen; 2. Teorema de la Probabilidad Total; Interpretación rápida; Ejemplo exprés (Total); 3. Teorema de Bayes; La probabilidad inversa; Errores típicos; Ejemplo 1: “Paradoja” del test médico; 1) Probabilidad total del positivo; 2) Bayes; ¿Solo un 24.2%?; Ejemplo 2: Filtro de spam; Conclusión; ✅ Autoevaluación rápida; Resumen: ¿cuándo usar cuál?.

**Interacción detectada en código:** `getVal`. Esta detección no equivale a una prueba funcional completa.

**Scripts externos:** `https://cdn.jsdelivr.net/npm/mathjax@3/es5/tex-mml-chtml.js`.

#### F055 · 6. Ejercicios resueltos.txt

**Ruta:** `Página web existente/3. Probabilidad/6. Ejercicios resueltos.txt`  
**Abrir:** [Archivo original](<C:/Users/usuario/OneDrive/Documentos/Aplicaciones/2º Bachillerato Matemáticas Aplicadas a las Ciencias Sociales/Página web existente/3. Probabilidad/6. Ejercicios resueltos.txt>)  
**Tamaño:** 31.520 bytes.

Banco de 8 ejercicios en const ejercicios, con contextos de máquinas, libros, urnas, ascensores, música y llaves.

**Encabezados/contenido detectado:** Laboratorio de Problemas; Resolución Paso a Paso.

**Interacción detectada en código:** `renderExercise`. Esta detección no equivale a una prueba funcional completa.

**Scripts externos:** `https://cdn.jsdelivr.net/npm/mathjax@3/es5/tex-mml-chtml.js`.

#### F056 · 7. Flashcards.txt

**Ruta:** `Página web existente/3. Probabilidad/7. Flashcards.txt`  
**Abrir:** [Archivo original](<C:/Users/usuario/OneDrive/Documentos/Aplicaciones/2º Bachillerato Matemáticas Aplicadas a las Ciencias Sociales/Página web existente/3. Probabilidad/7. Flashcards.txt>)  
**Tamaño:** 12.401 bytes.

**Encabezados/contenido detectado:** 🎲 Cálculo de Probabilidades.

**Interacción detectada en código:** `renderCards`. Esta detección no equivale a una prueba funcional completa.

**Scripts externos:** `https://cdn.jsdelivr.net/npm/mathjax@3/es5/tex-mml-chtml.js`.

#### F057 · 0. Presentación.txt

**Ruta:** `Página web existente/4. Distribuciones/0. Presentación.txt`  
**Abrir:** [Archivo original](<C:/Users/usuario/OneDrive/Documentos/Aplicaciones/2º Bachillerato Matemáticas Aplicadas a las Ciencias Sociales/Página web existente/4. Distribuciones/0. Presentación.txt>)  
**Tamaño:** 13.671 bytes.

**Encabezados/contenido detectado:** Distribuciones de Probabilidad; Variable Aleatoria; Distribución Binomial; Distribución Normal; Aproximación Normal; Ejercicios Resueltos; Objetivos de Aprendizaje.

**Scripts externos:** `https://cdn.jsdelivr.net/npm/mathjax@3/es5/tex-mml-chtml.js`.

#### F058 · 1. Variable aleatoria.txt

**Ruta:** `Página web existente/4. Distribuciones/1. Variable aleatoria.txt`  
**Abrir:** [Archivo original](<C:/Users/usuario/OneDrive/Documentos/Aplicaciones/2º Bachillerato Matemáticas Aplicadas a las Ciencias Sociales/Página web existente/4. Distribuciones/1. Variable aleatoria.txt>)  
**Tamaño:** 15.624 bytes.

**Encabezados/contenido detectado:** Variable Aleatoria; Definición Formal; # Función de Probabilidad; Notación Matemática; Condiciones Obligatorias; # Parámetros Estadísticos; Ejemplo Express: Un Dado Perfecto 🎲.

**Scripts externos:** `https://cdn.jsdelivr.net/npm/mathjax@3/es5/tex-mml-chtml.js`.

#### F059 · 2. Distribución Binomial.txt

**Ruta:** `Página web existente/4. Distribuciones/2. Distribución Binomial.txt`  
**Abrir:** [Archivo original](<C:/Users/usuario/OneDrive/Documentos/Aplicaciones/2º Bachillerato Matemáticas Aplicadas a las Ciencias Sociales/Página web existente/4. Distribuciones/2. Distribución Binomial.txt>)  
**Tamaño:** 15.844 bytes.

**Encabezados/contenido detectado:** Distribución Binomial; ¿Qué es un experimento de Bernoulli?; Checklist: ¿Es una Binomial?; La Función de Probabilidad; Parámetros Estadísticos; Laboratorio de Ejercicios.

**Scripts externos:** `https://cdn.jsdelivr.net/npm/mathjax@3/es5/tex-mml-chtml.js`.

#### F060 · 3. Distribución Normal.txt

**Ruta:** `Página web existente/4. Distribuciones/3. Distribución Normal.txt`  
**Abrir:** [Archivo original](<C:/Users/usuario/OneDrive/Documentos/Aplicaciones/2º Bachillerato Matemáticas Aplicadas a las Ciencias Sociales/Página web existente/4. Distribuciones/3. Distribución Normal.txt>)  
**Tamaño:** 30.373 bytes.

**Encabezados/contenido detectado:** Distribución Normal; 1) ¿Qué significa “normal”?; Parámetros; PDF y CDF (precisas); # 2) La probabilidad es área (y se calcula con $F$); 3) Estandarización y tablas (lo que se hace en exámenes); 4) Visual interactiva: PDF (áreas) y CDF (acumulación); Lecturas (lo que debes saber interpretar); Atajo mental: regla empírica (valores reales).

**Interacción detectada en código:** `erf`, `phi`, `normalPDF`, `normalCDF`, `el`, `clearSVG`, `mapper`, `pathFromPoints`, `drawPDF`, `drawCDF`, `$`, `clamp`, `render`. Esta detección no equivale a una prueba funcional completa.

**Scripts externos:** `https://cdn.jsdelivr.net/npm/mathjax@3/es5/tex-mml-chtml.js`.

#### F061 · 4. Aproximación de la Binomial por la Normal.txt

**Ruta:** `Página web existente/4. Distribuciones/4. Aproximación de la Binomial por la Normal.txt`  
**Abrir:** [Archivo original](<C:/Users/usuario/OneDrive/Documentos/Aplicaciones/2º Bachillerato Matemáticas Aplicadas a las Ciencias Sociales/Página web existente/4. Distribuciones/4. Aproximación de la Binomial por la Normal.txt>)  
**Tamaño:** 33.595 bytes.

**Encabezados/contenido detectado:** Normal + Aproximación de la Binomial; 1) Recordatorio: normal = áreas; PDF y CDF (precisas); 2) Aproximación de la Binomial con la Normal; Lecturas (binomial vs normal); Cómo se hace en 3 pasos.

**Interacción detectada en código:** `erf`, `phi`, `normalPDF`, `normalCDF`, `binomPMFArray`, `sumRange`, `el`, `clearSVG`, `mapper`, `pathFromPoints`, `drawPDFSmall`, `drawCDFSmall`, `drawBinomVsNormal`, `drawApproxCDF`, `$`, `clamp`, `render`. Esta detección no equivale a una prueba funcional completa.

**Scripts externos:** `https://cdn.jsdelivr.net/npm/mathjax@3/es5/tex-mml-chtml.js`.

#### F062 · 5. Ejercicios Resueltos.txt

**Ruta:** `Página web existente/4. Distribuciones/5. Ejercicios Resueltos.txt`  
**Abrir:** [Archivo original](<C:/Users/usuario/OneDrive/Documentos/Aplicaciones/2º Bachillerato Matemáticas Aplicadas a las Ciencias Sociales/Página web existente/4. Distribuciones/5. Ejercicios Resueltos.txt>)  
**Tamaño:** 37.090 bytes.

Banco de 21 ejercicios en const ejercicios: binomial, normal y aproximación.

**Encabezados/contenido detectado:** Laboratorio de Problemas; Resolución Paso a Paso.

**Interacción detectada en código:** `renderExercise`. Esta detección no equivale a una prueba funcional completa.

**Scripts externos:** `https://cdn.jsdelivr.net/npm/mathjax@3/es5/tex-mml-chtml.js`.

#### F063 · 6. Flashcards.txt

**Ruta:** `Página web existente/4. Distribuciones/6. Flashcards.txt`  
**Abrir:** [Archivo original](<C:/Users/usuario/OneDrive/Documentos/Aplicaciones/2º Bachillerato Matemáticas Aplicadas a las Ciencias Sociales/Página web existente/4. Distribuciones/6. Flashcards.txt>)  
**Tamaño:** 12.928 bytes.

**Encabezados/contenido detectado:** 🔔 Distribuciones de Probabilidad.

**Interacción detectada en código:** `renderCards`. Esta detección no equivale a una prueba funcional completa.

**Scripts externos:** `https://cdn.jsdelivr.net/npm/mathjax@3/es5/tex-mml-chtml.js`.

#### F064 · 0. Presentación.txt

**Ruta:** `Página web existente/5. Inferencia Estadística/0. Presentación.txt`  
**Abrir:** [Archivo original](<C:/Users/usuario/OneDrive/Documentos/Aplicaciones/2º Bachillerato Matemáticas Aplicadas a las Ciencias Sociales/Página web existente/5. Inferencia Estadística/0. Presentación.txt>)  
**Tamaño:** 18.259 bytes.

**Encabezados/contenido detectado:** Inferencia Estadística; Población vs. Muestra; Técnicas de Muestreo; 1. Aleatorio Simple; 2. Sistemático; 3. Estratificado 🔥; 4. Conglomerados; La Ficha Técnica.

**Scripts externos:** `https://cdn.jsdelivr.net/npm/mathjax@3/es5/tex-mml-chtml.js`.

#### F065 · 1. Distribuciones muestrales.txt

**Ruta:** `Página web existente/5. Inferencia Estadística/1. Distribuciones muestrales.txt`  
**Abrir:** [Archivo original](<C:/Users/usuario/OneDrive/Documentos/Aplicaciones/2º Bachillerato Matemáticas Aplicadas a las Ciencias Sociales/Página web existente/5. Inferencia Estadística/1. Distribuciones muestrales.txt>)  
**Tamaño:** 13.694 bytes.

**Encabezados/contenido detectado:** Distribuciones Muestrales; El Concepto Clave; El Teorema Central del Límite (TCL); Población Original (Caótica); Distribución de Medias (n=100); Distribución Muestral de Proporciones; ⚡ Cheat Sheet: Fórmulas para Examen.

**Scripts externos:** `https://cdn.jsdelivr.net/npm/mathjax@3/es5/tex-mml-chtml.js`.

#### F066 · 2. Estimación.txt

**Ruta:** `Página web existente/5. Inferencia Estadística/2. Estimación.txt`  
**Abrir:** [Archivo original](<C:/Users/usuario/OneDrive/Documentos/Aplicaciones/2º Bachillerato Matemáticas Aplicadas a las Ciencias Sociales/Página web existente/5. Inferencia Estadística/2. Estimación.txt>)  
**Tamaño:** 16.650 bytes.

**Encabezados/contenido detectado:** Estimación por Intervalos; El Cruce de Caminos; Nivel de Confianza y Significación; Distribución Normal Estándar N(0,1); Valores Críticos ($z_{\alpha/2}$) Comunes; Intervalo de Confianza para la Media.

**Scripts externos:** `https://cdn.jsdelivr.net/npm/mathjax@3/es5/tex-mml-chtml.js`.

#### F067 · 2.1. Distribución de la media muestral.txt

**Ruta:** `Página web existente/5. Inferencia Estadística/2.1. Distribución de la media muestral.txt`  
**Abrir:** [Archivo original](<C:/Users/usuario/OneDrive/Documentos/Aplicaciones/2º Bachillerato Matemáticas Aplicadas a las Ciencias Sociales/Página web existente/5. Inferencia Estadística/2.1. Distribución de la media muestral.txt>)  
**Tamaño:** 20.674 bytes.

**Encabezados/contenido detectado:** Distribución Muestral y TCL; ¿Qué es la distribución muestral?; El Teorema Central del Límite (TCL); Control de Calidad: Peso del Café; Aventura Estadística: Operación Bombilla; ¡Misión Cumplida!.

**Interacción detectada en código:** `checkAnswer`, `nextStep`, `finishAdventure`. Esta detección no equivale a una prueba funcional completa.

**Scripts externos:** `https://cdn.jsdelivr.net/npm/mathjax@3/es5/tex-mml-chtml.js`.

#### F068 · 2.2. Distribución de la proporción muestral.txt

**Ruta:** `Página web existente/5. Inferencia Estadística/2.2. Distribución de la proporción muestral.txt`  
**Abrir:** [Archivo original](<C:/Users/usuario/OneDrive/Documentos/Aplicaciones/2º Bachillerato Matemáticas Aplicadas a las Ciencias Sociales/Página web existente/5. Inferencia Estadística/2.2. Distribución de la proporción muestral.txt>)  
**Tamaño:** 20.740 bytes.

**Encabezados/contenido detectado:** Distribución de la Proporción Muestral; Concepto de Proporción Muestral; Aplicación del Teorema Central del Límite; Hábitos de Consumo: Pequeño Comercio; Aventura Estadística: Lanzamiento Premium; ¡Análisis Completado!.

**Interacción detectada en código:** `checkAnswer`, `nextStep`, `finishAdventure`. Esta detección no equivale a una prueba funcional completa.

**Scripts externos:** `https://cdn.jsdelivr.net/npm/mathjax@3/es5/tex-mml-chtml.js`.

#### F069 · 3. Error y tamaño muestral.txt

**Ruta:** `Página web existente/5. Inferencia Estadística/3. Error y tamaño muestral.txt`  
**Abrir:** [Archivo original](<C:/Users/usuario/OneDrive/Documentos/Aplicaciones/2º Bachillerato Matemáticas Aplicadas a las Ciencias Sociales/Página web existente/5. Inferencia Estadística/3. Error y tamaño muestral.txt>)  
**Tamaño:** 13.472 bytes.

**Encabezados/contenido detectado:** Error y Tamaño Muestral; El Error Máximo Admisible ($E$); Planificando el Estudio: ¿A cuántos preguntamos?; El Coste de la Precisión.

**Scripts externos:** `https://cdn.jsdelivr.net/npm/mathjax@3/es5/tex-mml-chtml.js`.

#### F070 · 4. Ejercicios resueltos.txt

**Ruta:** `Página web existente/5. Inferencia Estadística/4. Ejercicios resueltos.txt`  
**Abrir:** [Archivo original](<C:/Users/usuario/OneDrive/Documentos/Aplicaciones/2º Bachillerato Matemáticas Aplicadas a las Ciencias Sociales/Página web existente/5. Inferencia Estadística/4. Ejercicios resueltos.txt>)  
**Tamaño:** 57.165 bytes.

Banco de 27 ejercicios en const ejercicios: conceptos, distribuciones muestrales, intervalos y tamaño.

**Encabezados/contenido detectado:** Laboratorio de Problemas; Resolución Paso a Paso.

**Interacción detectada en código:** `renderExercise`. Esta detección no equivale a una prueba funcional completa.

**Scripts externos:** `https://cdn.jsdelivr.net/npm/mathjax@3/es5/tex-mml-chtml.js`.

#### F071 · 5. Flashcards.txt

**Ruta:** `Página web existente/5. Inferencia Estadística/5. Flashcards.txt`  
**Abrir:** [Archivo original](<C:/Users/usuario/OneDrive/Documentos/Aplicaciones/2º Bachillerato Matemáticas Aplicadas a las Ciencias Sociales/Página web existente/5. Inferencia Estadística/5. Flashcards.txt>)  
**Tamaño:** 17.048 bytes.

**Encabezados/contenido detectado:** 🧠 Flashcards.

**Interacción detectada en código:** `renderCards`. Esta detección no equivale a una prueba funcional completa.

**Scripts externos:** `https://cdn.jsdelivr.net/npm/mathjax@3/es5/tex-mml-chtml.js`.

#### F072 · 6. Tipos de muestreo.txt

**Ruta:** `Página web existente/5. Inferencia Estadística/6. Tipos de muestreo.txt`  
**Abrir:** [Archivo original](<C:/Users/usuario/OneDrive/Documentos/Aplicaciones/2º Bachillerato Matemáticas Aplicadas a las Ciencias Sociales/Página web existente/5. Inferencia Estadística/6. Tipos de muestreo.txt>)  
**Tamaño:** 22.440 bytes.

**Encabezados/contenido detectado:** Catálogo de Técnicas de Muestreo; Técnicas Probabilísticas; Muestreo Aleatorio Simple; Muestreo Sistemático; Muestreo Estratificado; Muestreo por Conglomerados o Áreas; Técnicas No Probabilísticas; 1. Muestreo por Conveniencia; 2. Muestreo por Juicio; 3. Muestreo por Cuotas; 4. Muestreo de Bola de Nieve; Nota Final Importante.

**Scripts externos:** `https://cdn.jsdelivr.net/npm/mathjax@3/es5/tex-mml-chtml.js`.

#### F073 · 7. Tipo test.txt

**Ruta:** `Página web existente/5. Inferencia Estadística/7. Tipo test.txt`  
**Abrir:** [Archivo original](<C:/Users/usuario/OneDrive/Documentos/Aplicaciones/2º Bachillerato Matemáticas Aplicadas a las Ciencias Sociales/Página web existente/5. Inferencia Estadística/7. Tipo test.txt>)  
**Tamaño:** 35.635 bytes.

Test programado con 20 preguntas sobre inferencia y muestreo.

**Encabezados/contenido detectado:** Test de Inferencia y Muestreo; Evaluación de Nivel Avanzado; Cargando pregunta...; Test Completado.

**Interacción detectada en código:** `startQuiz`, `renderQuestion`, `selectOption`, `nextQuestion`, `showResults`. Esta detección no equivale a una prueba funcional completa.

**Scripts externos:** `https://cdn.jsdelivr.net/npm/mathjax@3/es5/tex-mml-chtml.js`.

#### F074 · 8. Intervalos de confianza.txt

**Ruta:** `Página web existente/5. Inferencia Estadística/8. Intervalos de confianza.txt`  
**Abrir:** [Archivo original](<C:/Users/usuario/OneDrive/Documentos/Aplicaciones/2º Bachillerato Matemáticas Aplicadas a las Ciencias Sociales/Página web existente/5. Inferencia Estadística/8. Intervalos de confianza.txt>)  
**Tamaño:** 21.577 bytes.

**Encabezados/contenido detectado:** El Intervalo de Confianza; ¿Qué es un Intervalo de Confianza?; La Anatomía de la Fórmula; 🧪 Laboratorio Guiado.

**Interacción detectada en código:** `updateSimulation`. Esta detección no equivale a una prueba funcional completa.

**Scripts externos:** `https://cdn.jsdelivr.net/npm/mathjax@3/es5/tex-mml-chtml.js`.

#### F075 · Combinatoria.txt

**Ruta:** `Página web existente/Combinatoria.txt`  
**Abrir:** [Archivo original](<C:/Users/usuario/OneDrive/Documentos/Aplicaciones/2º Bachillerato Matemáticas Aplicadas a las Ciencias Sociales/Página web existente/Combinatoria.txt>)  
**Tamaño:** 76.200 bytes.

Unidad de combinatoria; demostraciones, calculadora, ejercicios y juego con 10 preguntas fijas. Ampliable con generación procedural.

**Encabezados/contenido detectado:** Combinatoria y Probabilidad; Regla de Laplace; Variaciones sin Rep.; Variaciones con Rep.; Permutaciones; Combinaciones; 🌳 ¿Qué técnica usar? — Árbol de decisión; 📊 Tabla resumen; Variaciones sin Repetición \(V(n,r)\); 🎬 Demo interactiva; 📌 Ejemplo resuelto; Variaciones con Repetición \(VR(n,r)\); 🎬 Visualización; 📌 Ejemplo resuelto; Permutaciones ordinarias \(P_n\); Con elementos repetidos; 🎬 Visualización: 3 personas en fila; 📌 Ejemplo 1 — Permutación ordinaria; 📌 Ejemplo 2 — Con elementos repetidos; Combinaciones \(C(n,r)=\dbinom{n}{r}\); 🎬 ¿Por qué dividimos entre \(r!\)?; 🔺 Triángulo de Pascal — \(\binom{n}{r}\); 📌 Ejemplo resuelto; 🧮 Método general; 📌 Ejemplo 1 — Baraja española; 📌 Ejemplo 2 — Podio de carreras; 📌 Ejemplo 3 — Método del complementario; Calculadora Combinatoria; El Reto del Probabilista; ¡Demuestra lo que sabes!; ¡Juego terminado!.

**Interacción detectada en código:** `gotoSection`, `typeset`, `toggleSteps`, `toggleEx`, `factorial`, `fmt`, `vsSelect`, `vsClear`, `animatePerm`, `updateCalcInputs`, `calculate`, `shuffle`, `showPanel`, `showGameStart`, `startGame`, `renderQ`, `selectAns`, `nextQuestion`, `showResults`. Esta detección no equivale a una prueba funcional completa.

**Scripts externos:** `https://cdn.jsdelivr.net/npm/mathjax@3/es5/tex-chtml.js`.

#### F076 · Competencias y criterios.txt

**Ruta:** `Página web existente/Competencias y criterios.txt`  
**Abrir:** [Archivo original](<C:/Users/usuario/OneDrive/Documentos/Aplicaciones/2º Bachillerato Matemáticas Aplicadas a las Ciencias Sociales/Página web existente/Competencias y criterios.txt>)  
**Tamaño:** 27.243 bytes.

Mapa pedagógico local de nueve competencias y criterios; no incluye por sí solo verificación de normativa vigente.

**Encabezados/contenido detectado:** Competencias y Criterios; Modelización y Resolución; Verificación y Argumentación; Investigación y Conjeturas; Pensamiento Computacional; Conexiones Matemáticas; Interdisciplinariedad; Representación; Comunicación Matemática; Destrezas Socioafectivas.

#### F077 · Inicio.txt

**Ruta:** `Página web existente/Inicio.txt`  
**Abrir:** [Archivo original](<C:/Users/usuario/OneDrive/Documentos/Aplicaciones/2º Bachillerato Matemáticas Aplicadas a las Ciencias Sociales/Página web existente/Inicio.txt>)  
**Tamaño:** 12.621 bytes.

Portada con fecha de curso 2025–2026 y título interno Syllabus 2024. Duplicado exacto de F034.

**Encabezados/contenido detectado:** Estadística & Matemáticas.

### Materiales y Recursos y Exámenes

#### F001 · BACH - 2 CCSS - EXAMEN SUBIDA NOTA CURSO.zip

**Ruta:** `Materiales y Recursos y Exámenes/BACH - 2 CCSS - EXAMEN SUBIDA NOTA CURSO.zip`  
**Abrir:** [Archivo original](<C:/Users/usuario/OneDrive/Documentos/Aplicaciones/2º Bachillerato Matemáticas Aplicadas a las Ciencias Sociales/Materiales y Recursos y Exámenes/BACH - 2 CCSS - EXAMEN SUBIDA NOTA CURSO.zip>)  
**Tamaño:** 4.777 bytes.

Examen de subida de nota del curso con bloques y soluciones; funciones a trozos, programación lineal y otros contenidos transversales. Revisar incidencia M01.

**Entradas internas del ZIP:**

- `main.tex` (14362 bytes).

#### F002 · BACH - 2º SOC - Distribuciones de Probabilidad (2).zip

**Ruta:** `Materiales y Recursos y Exámenes/BACH - 2º SOC - Distribuciones de Probabilidad (2).zip`  
**Abrir:** [Archivo original](<C:/Users/usuario/OneDrive/Documentos/Aplicaciones/2º Bachillerato Matemáticas Aplicadas a las Ciencias Sociales/Materiales y Recursos y Exámenes/BACH - 2º SOC - Distribuciones de Probabilidad (2).zip>)  
**Tamaño:** 196.507 bytes.

Binomial, normal y aproximación; bicicleta, rendimiento y productos. Incluye soluciones. Revisar M02.

**Entradas internas del ZIP:**

- `main.tex` (4559 bytes).
- `images/Examen AyP - Triángulo.png` (34493 bytes).
- `images/Examen AyP - Romboide.png` (32975 bytes).
- `images/Examen AyP - Rombo.png` (54998 bytes).
- `images/Examen AyP - Rectángulo.png` (13798 bytes).
- `images/Examen AyP - Hexágono.png` (24821 bytes).
- `images/Examen AyP - Circulo.png` (29185 bytes).
- `Logo AL-ANDALUS.png` (8004 bytes).

**Imágenes referenciadas por includegraphics:** `Logo AL-ANDALUS.png`.

#### F003 · BACH - 2º SOC - Distribuciones de Probabilidad.zip

**Ruta:** `Materiales y Recursos y Exámenes/BACH - 2º SOC - Distribuciones de Probabilidad.zip`  
**Abrir:** [Archivo original](<C:/Users/usuario/OneDrive/Documentos/Aplicaciones/2º Bachillerato Matemáticas Aplicadas a las Ciencias Sociales/Materiales y Recursos y Exámenes/BACH - 2º SOC - Distribuciones de Probabilidad.zip>)  
**Tamaño:** 197.120 bytes.

Binomial, normal y aproximación; baloncesto, bonificaciones y proyectos. Incluye soluciones. Revisar M03.

**Entradas internas del ZIP:**

- `main.tex` (6475 bytes).
- `images/Examen AyP - Triángulo.png` (34493 bytes).
- `images/Examen AyP - Romboide.png` (32975 bytes).
- `images/Examen AyP - Rombo.png` (54998 bytes).
- `images/Examen AyP - Rectángulo.png` (13798 bytes).
- `images/Examen AyP - Hexágono.png` (24821 bytes).
- `images/Examen AyP - Circulo.png` (29185 bytes).
- `Logo AL-ANDALUS.png` (8004 bytes).

**Imágenes referenciadas por includegraphics:** `Logo AL-ANDALUS.png`.

#### F004 · BACH - 2º SOC - Ejercicios repaso.zip

**Ruta:** `Materiales y Recursos y Exámenes/BACH - 2º SOC - Ejercicios repaso.zip`  
**Abrir:** [Archivo original](<C:/Users/usuario/OneDrive/Documentos/Aplicaciones/2º Bachillerato Matemáticas Aplicadas a las Ciencias Sociales/Materiales y Recursos y Exámenes/BACH - 2º SOC - Ejercicios repaso.zip>)  
**Tamaño:** 3.424 bytes.

Repaso de análisis con ejercicios y desarrollos: límites, derivadas, funciones y aplicaciones.

**Entradas internas del ZIP:**

- `main.tex` (8707 bytes).

#### F005 · BACH - 2º SOC - Examen Final.zip

**Ruta:** `Materiales y Recursos y Exámenes/BACH - 2º SOC - Examen Final.zip`  
**Abrir:** [Archivo original](<C:/Users/usuario/OneDrive/Documentos/Aplicaciones/2º Bachillerato Matemáticas Aplicadas a las Ciencias Sociales/Materiales y Recursos y Exámenes/BACH - 2º SOC - Examen Final.zip>)  
**Tamaño:** 315.948 bytes.

Examen transversal: conservar estructura, puntuación y opciones tras comprobar el contenido.

**Entradas internas del ZIP:**

- `main.tex` (7183 bytes).
- `images/Examen AyP - Triángulo.png` (34493 bytes).
- `images/Examen AyP - Romboide.png` (32975 bytes).
- `images/Examen AyP - Rombo.png` (54998 bytes).
- `images/Examen AyP - Rectángulo.png` (13798 bytes).
- `images/Examen AyP - Hexágono.png` (24821 bytes).
- `images/Examen AyP - Circulo.png` (29185 bytes).
- `Logo AL-ANDALUS.png` (8004 bytes).
- `logo_ies-alzujair.png` (21987 bytes).
- `JuanXXIIIChana-Logo.png` (39898 bytes).
- `logo.png` (56097 bytes).

**Imágenes referenciadas por includegraphics:** `Logo AL-ANDALUS.png`.

#### F006 · BACH - 2º SOC - Examen Funciones (Copy).zip

**Ruta:** `Materiales y Recursos y Exámenes/BACH - 2º SOC - Examen Funciones (Copy).zip`  
**Abrir:** [Archivo original](<C:/Users/usuario/OneDrive/Documentos/Aplicaciones/2º Bachillerato Matemáticas Aplicadas a las Ciencias Sociales/Materiales y Recursos y Exámenes/BACH - 2º SOC - Examen Funciones (Copy).zip>)  
**Tamaño:** 315.489 bytes.

Variante de examen de funciones; el contenido difiere de Examen Funciones.zip pese a la etiqueta Copy.

**Entradas internas del ZIP:**

- `main.tex` (6039 bytes).
- `images/Examen AyP - Triángulo.png` (34493 bytes).
- `images/Examen AyP - Romboide.png` (32975 bytes).
- `images/Examen AyP - Rombo.png` (54998 bytes).
- `images/Examen AyP - Rectángulo.png` (13798 bytes).
- `images/Examen AyP - Hexágono.png` (24821 bytes).
- `images/Examen AyP - Circulo.png` (29185 bytes).
- `Logo AL-ANDALUS.png` (8004 bytes).
- `logo_ies-alzujair.png` (21987 bytes).
- `JuanXXIIIChana-Logo.png` (39898 bytes).
- `logo.png` (56097 bytes).

**Imágenes referenciadas por includegraphics:** `Logo AL-ANDALUS.png`.

#### F007 · BACH - 2º SOC - Examen Funciones.zip

**Ruta:** `Materiales y Recursos y Exámenes/BACH - 2º SOC - Examen Funciones.zip`  
**Abrir:** [Archivo original](<C:/Users/usuario/OneDrive/Documentos/Aplicaciones/2º Bachillerato Matemáticas Aplicadas a las Ciencias Sociales/Materiales y Recursos y Exámenes/BACH - 2º SOC - Examen Funciones.zip>)  
**Tamaño:** 315.658 bytes.

Examen de análisis de funciones y aplicaciones; útil para representación, cálculo y áreas según apartados.

**Entradas internas del ZIP:**

- `main.tex` (6662 bytes).
- `images/Examen AyP - Triángulo.png` (34493 bytes).
- `images/Examen AyP - Romboide.png` (32975 bytes).
- `images/Examen AyP - Rombo.png` (54998 bytes).
- `images/Examen AyP - Rectángulo.png` (13798 bytes).
- `images/Examen AyP - Hexágono.png` (24821 bytes).
- `images/Examen AyP - Circulo.png` (29185 bytes).
- `Logo AL-ANDALUS.png` (8004 bytes).
- `logo_ies-alzujair.png` (21987 bytes).
- `JuanXXIIIChana-Logo.png` (39898 bytes).
- `logo.png` (56097 bytes).

**Imágenes referenciadas por includegraphics:** `Logo AL-ANDALUS.png`.

#### F008 · BACH - 2º SOC - Examen Límites y Derivadas.zip

**Ruta:** `Materiales y Recursos y Exámenes/BACH - 2º SOC - Examen Límites y Derivadas.zip`  
**Abrir:** [Archivo original](<C:/Users/usuario/OneDrive/Documentos/Aplicaciones/2º Bachillerato Matemáticas Aplicadas a las Ciencias Sociales/Materiales y Recursos y Exámenes/BACH - 2º SOC - Examen Límites y Derivadas.zip>)  
**Tamaño:** 315.677 bytes.

Funciones a trozos; derivadas, incluidas trigonométricas; límites y modelo de distancia de un cohete.

**Entradas internas del ZIP:**

- `main.tex` (7325 bytes).
- `images/Examen AyP - Triángulo.png` (34493 bytes).
- `images/Examen AyP - Romboide.png` (32975 bytes).
- `images/Examen AyP - Rombo.png` (54998 bytes).
- `images/Examen AyP - Rectángulo.png` (13798 bytes).
- `images/Examen AyP - Hexágono.png` (24821 bytes).
- `images/Examen AyP - Circulo.png` (29185 bytes).
- `Logo AL-ANDALUS.png` (8004 bytes).
- `logo_ies-alzujair.png` (21987 bytes).
- `JuanXXIIIChana-Logo.png` (39898 bytes).
- `logo.png` (56097 bytes).

**Imágenes referenciadas por includegraphics:** `Logo AL-ANDALUS.png`.

#### F009 · BACH - 2º SOC - Examen Resuelto Recuperación.zip

**Ruta:** `Materiales y Recursos y Exámenes/BACH - 2º SOC - Examen Resuelto Recuperación.zip`  
**Abrir:** [Archivo original](<C:/Users/usuario/OneDrive/Documentos/Aplicaciones/2º Bachillerato Matemáticas Aplicadas a las Ciencias Sociales/Materiales y Recursos y Exámenes/BACH - 2º SOC - Examen Resuelto Recuperación.zip>)  
**Tamaño:** 201.697 bytes.

Recuperación con soluciones de inferencia y distribuciones muestrales. Incluye datos de pacientes y frambuesas; revisar M04 y M05.

**Entradas internas del ZIP:**

- `main.tex` (20769 bytes).
- `images/Examen AyP - Triángulo.png` (34493 bytes).
- `images/Examen AyP - Romboide.png` (32975 bytes).
- `images/Examen AyP - Rombo.png` (54998 bytes).
- `images/Examen AyP - Rectángulo.png` (13798 bytes).
- `images/Examen AyP - Hexágono.png` (24821 bytes).
- `images/Examen AyP - Circulo.png` (29185 bytes).
- `Logo AL-ANDALUS.png` (8004 bytes).

**Imágenes referenciadas por includegraphics:** `Logo AL-ANDALUS.png`.

#### F010 · BACH - 2º SOC - Inferencia Estadística (EXAMEN I y II).zip

**Ruta:** `Materiales y Recursos y Exámenes/BACH - 2º SOC - Inferencia Estadística (EXAMEN I y II).zip`  
**Abrir:** [Archivo original](<C:/Users/usuario/OneDrive/Documentos/Aplicaciones/2º Bachillerato Matemáticas Aplicadas a las Ciencias Sociales/Materiales y Recursos y Exámenes/BACH - 2º SOC - Inferencia Estadística (EXAMEN I y II).zip>)  
**Tamaño:** 198.867 bytes.

Recopilación de ejercicios de los exámenes I y II de inferencia, con soluciones; hay solapamiento con otros paquetes.

**Entradas internas del ZIP:**

- `main.tex` (12706 bytes).
- `images/Examen AyP - Triángulo.png` (34493 bytes).
- `images/Examen AyP - Romboide.png` (32975 bytes).
- `images/Examen AyP - Rombo.png` (54998 bytes).
- `images/Examen AyP - Rectángulo.png` (13798 bytes).
- `images/Examen AyP - Hexágono.png` (24821 bytes).
- `images/Examen AyP - Circulo.png` (29185 bytes).
- `Logo AL-ANDALUS.png` (8004 bytes).

**Imágenes referenciadas por includegraphics:** `Logo AL-ANDALUS.png`.

#### F011 · BACH - 2º SOC - Inferencia Estadística (EXAMEN I).zip

**Ruta:** `Materiales y Recursos y Exámenes/BACH - 2º SOC - Inferencia Estadística (EXAMEN I).zip`  
**Abrir:** [Archivo original](<C:/Users/usuario/OneDrive/Documentos/Aplicaciones/2º Bachillerato Matemáticas Aplicadas a las Ciencias Sociales/Materiales y Recursos y Exámenes/BACH - 2º SOC - Inferencia Estadística (EXAMEN I).zip>)  
**Tamaño:** 197.773 bytes.

Inferencia I: accidentes, ciruelas y afijación proporcional en facultades; incluye soluciones en el código.

**Entradas internas del ZIP:**

- `main.tex` (8528 bytes).
- `images/Examen AyP - Triángulo.png` (34493 bytes).
- `images/Examen AyP - Romboide.png` (32975 bytes).
- `images/Examen AyP - Rombo.png` (54998 bytes).
- `images/Examen AyP - Rectángulo.png` (13798 bytes).
- `images/Examen AyP - Hexágono.png` (24821 bytes).
- `images/Examen AyP - Circulo.png` (29185 bytes).
- `Logo AL-ANDALUS.png` (8004 bytes).

**Imágenes referenciadas por includegraphics:** `Logo AL-ANDALUS.png`.

#### F012 · BACH - 2º SOC - Inferencia Estadística (EXAMEN II).zip

**Ruta:** `Materiales y Recursos y Exámenes/BACH - 2º SOC - Inferencia Estadística (EXAMEN II).zip`  
**Abrir:** [Archivo original](<C:/Users/usuario/OneDrive/Documentos/Aplicaciones/2º Bachillerato Matemáticas Aplicadas a las Ciencias Sociales/Materiales y Recursos y Exámenes/BACH - 2º SOC - Inferencia Estadística (EXAMEN II).zip>)  
**Tamaño:** 197.839 bytes.

Inferencia II: red social, precios de electrodomésticos y muestreo universitario; incluye soluciones.

**Entradas internas del ZIP:**

- `main.tex` (8351 bytes).
- `images/Examen AyP - Triángulo.png` (34493 bytes).
- `images/Examen AyP - Romboide.png` (32975 bytes).
- `images/Examen AyP - Rombo.png` (54998 bytes).
- `images/Examen AyP - Rectángulo.png` (13798 bytes).
- `images/Examen AyP - Hexágono.png` (24821 bytes).
- `images/Examen AyP - Circulo.png` (29185 bytes).
- `Logo AL-ANDALUS.png` (8004 bytes).

**Imágenes referenciadas por includegraphics:** `Logo AL-ANDALUS.png`.

#### F013 · BACH - 2º SOC - Inferencia Estadística.zip

**Ruta:** `Materiales y Recursos y Exámenes/BACH - 2º SOC - Inferencia Estadística.zip`  
**Abrir:** [Archivo original](<C:/Users/usuario/OneDrive/Documentos/Aplicaciones/2º Bachillerato Matemáticas Aplicadas a las Ciencias Sociales/Materiales y Recursos y Exámenes/BACH - 2º SOC - Inferencia Estadística.zip>)  
**Tamaño:** 197.865 bytes.

Inferencia: proporciones, medias, error y tamaño; cambia la puntuación y selección respecto a otros paquetes.

**Entradas internas del ZIP:**

- `main.tex` (10419 bytes).
- `images/Examen AyP - Triángulo.png` (34493 bytes).
- `images/Examen AyP - Romboide.png` (32975 bytes).
- `images/Examen AyP - Rombo.png` (54998 bytes).
- `images/Examen AyP - Rectángulo.png` (13798 bytes).
- `images/Examen AyP - Hexágono.png` (24821 bytes).
- `images/Examen AyP - Circulo.png` (29185 bytes).
- `Logo AL-ANDALUS.png` (8004 bytes).

**Imágenes referenciadas por includegraphics:** `Logo AL-ANDALUS.png`.

#### F014 · BACH - 2º SOC - Matrices I.zip

**Ruta:** `Materiales y Recursos y Exámenes/BACH - 2º SOC - Matrices I.zip`  
**Abrir:** [Archivo original](<C:/Users/usuario/OneDrive/Documentos/Aplicaciones/2º Bachillerato Matemáticas Aplicadas a las Ciencias Sociales/Materiales y Recursos y Exámenes/BACH - 2º SOC - Matrices I.zip>)  
**Tamaño:** 196.375 bytes.

Matrices I: producto rectangular, inversa, ecuación matricial, operaciones posibles y potencia de matriz nilpotente.

**Entradas internas del ZIP:**

- `main.tex` (4167 bytes).
- `images/Examen AyP - Triángulo.png` (34493 bytes).
- `images/Examen AyP - Romboide.png` (32975 bytes).
- `images/Examen AyP - Rombo.png` (54998 bytes).
- `images/Examen AyP - Rectángulo.png` (13798 bytes).
- `images/Examen AyP - Hexágono.png` (24821 bytes).
- `images/Examen AyP - Circulo.png` (29185 bytes).
- `Logo AL-ANDALUS.png` (8004 bytes).

**Imágenes referenciadas por includegraphics:** `Logo AL-ANDALUS.png`.

#### F015 · BACH - 2º SOC - Matrices II.zip

**Ruta:** `Materiales y Recursos y Exámenes/BACH - 2º SOC - Matrices II.zip`  
**Abrir:** [Archivo original](<C:/Users/usuario/OneDrive/Documentos/Aplicaciones/2º Bachillerato Matemáticas Aplicadas a las Ciencias Sociales/Materiales y Recursos y Exámenes/BACH - 2º SOC - Matrices II.zip>)  
**Tamaño:** 196.352 bytes.

Matrices II: inversa 3×3, AX=B, dimensiones, determinantes e igualdad con parámetros.

**Entradas internas del ZIP:**

- `main.tex` (4220 bytes).
- `images/Examen AyP - Triángulo.png` (34493 bytes).
- `images/Examen AyP - Romboide.png` (32975 bytes).
- `images/Examen AyP - Rombo.png` (54998 bytes).
- `images/Examen AyP - Rectángulo.png` (13798 bytes).
- `images/Examen AyP - Hexágono.png` (24821 bytes).
- `images/Examen AyP - Circulo.png` (29185 bytes).
- `Logo AL-ANDALUS.png` (8004 bytes).

**Imágenes referenciadas por includegraphics:** `Logo AL-ANDALUS.png`.

#### F016 · BACH - 2º SOC - Matrices III.zip

**Ruta:** `Materiales y Recursos y Exámenes/BACH - 2º SOC - Matrices III.zip`  
**Abrir:** [Archivo original](<C:/Users/usuario/OneDrive/Documentos/Aplicaciones/2º Bachillerato Matemáticas Aplicadas a las Ciencias Sociales/Materiales y Recursos y Exámenes/BACH - 2º SOC - Matrices III.zip>)  
**Tamaño:** 196.336 bytes.

Matrices III: AX+BX=C, potencias periódicas, operaciones y parámetros.

**Entradas internas del ZIP:**

- `main.tex` (4054 bytes).
- `images/Examen AyP - Triángulo.png` (34493 bytes).
- `images/Examen AyP - Romboide.png` (32975 bytes).
- `images/Examen AyP - Rombo.png` (54998 bytes).
- `images/Examen AyP - Rectángulo.png` (13798 bytes).
- `images/Examen AyP - Hexágono.png` (24821 bytes).
- `images/Examen AyP - Circulo.png` (29185 bytes).
- `Logo AL-ANDALUS.png` (8004 bytes).

**Imágenes referenciadas por includegraphics:** `Logo AL-ANDALUS.png`.

#### F017 · BACH - 2º SOC - Probabilidad (2).zip

**Ruta:** `Materiales y Recursos y Exámenes/BACH - 2º SOC - Probabilidad (2).zip`  
**Abrir:** [Archivo original](<C:/Users/usuario/OneDrive/Documentos/Aplicaciones/2º Bachillerato Matemáticas Aplicadas a las Ciencias Sociales/Materiales y Recursos y Exámenes/BACH - 2º SOC - Probabilidad (2).zip>)  
**Tamaño:** 196.595 bytes.

Variante de probabilidad: sucesos, periódicos, aprobados y secaderos; bloque obligatorio y optativo.

**Entradas internas del ZIP:**

- `main.tex` (5182 bytes).
- `images/Examen AyP - Triángulo.png` (34493 bytes).
- `images/Examen AyP - Romboide.png` (32975 bytes).
- `images/Examen AyP - Rombo.png` (54998 bytes).
- `images/Examen AyP - Rectángulo.png` (13798 bytes).
- `images/Examen AyP - Hexágono.png` (24821 bytes).
- `images/Examen AyP - Circulo.png` (29185 bytes).
- `Logo AL-ANDALUS.png` (8004 bytes).

**Imágenes referenciadas por includegraphics:** `Logo AL-ANDALUS.png`.

#### F018 · BACH - 2º SOC - Probabilidad.zip

**Ruta:** `Materiales y Recursos y Exámenes/BACH - 2º SOC - Probabilidad.zip`  
**Abrir:** [Archivo original](<C:/Users/usuario/OneDrive/Documentos/Aplicaciones/2º Bachillerato Matemáticas Aplicadas a las Ciencias Sociales/Materiales y Recursos y Exámenes/BACH - 2º SOC - Probabilidad.zip>)  
**Tamaño:** 198.279 bytes.

Probabilidad: sucesos, condicionada, independencia, total y Bayes; incluye soluciones en main.tex.

**Entradas internas del ZIP:**

- `main.tex` (9722 bytes).
- `images/Examen AyP - Triángulo.png` (34493 bytes).
- `images/Examen AyP - Romboide.png` (32975 bytes).
- `images/Examen AyP - Rombo.png` (54998 bytes).
- `images/Examen AyP - Rectángulo.png` (13798 bytes).
- `images/Examen AyP - Hexágono.png` (24821 bytes).
- `images/Examen AyP - Circulo.png` (29185 bytes).
- `Logo AL-ANDALUS.png` (8004 bytes).

**Imágenes referenciadas por includegraphics:** `Logo AL-ANDALUS.png`.

#### F019 · BACH - 2º SOC - Programación Lineal (Soluciones 1).zip

**Ruta:** `Materiales y Recursos y Exámenes/BACH - 2º SOC - Programación Lineal (Soluciones 1).zip`  
**Abrir:** [Archivo original](<C:/Users/usuario/OneDrive/Documentos/Aplicaciones/2º Bachillerato Matemáticas Aplicadas a las Ciencias Sociales/Materiales y Recursos y Exámenes/BACH - 2º SOC - Programación Lineal (Soluciones 1).zip>)  
**Tamaño:** 334.847 bytes.

Soluciones de Programación Lineal 1: misiones espaciales, baterías y región definida por restricciones; tres PNG de gráficas. Revisar M07.

**Encabezados/contenido detectado:** Ejercicio 1. (4 puntos) ; SOLUCIÓN.; Planteamiento del problema; Análisis de la región factible; Cálculo de la función objetivo; Conclusión; Ejercicio 2. (2 puntos) ; SOLUCIÓN:; Planteamiento del Problema; Función Objetivo; Restricciones; Modelo Matemático; Cálculo de los Vértices de la Región Factible; Evaluación de la Función Objetivo; Representación Gráfica; Ejercicio 3. (4 puntos) ; SOLUCIÓN.; Planteamiento del Problema; Resolución; Cálculo de Vértices; Verificación de Factibilidad; Evaluación de la Función Objetivo; Representación Gráfica.

**Entradas internas del ZIP:**

- `main.tex` (10456 bytes).
- `ej3.png` (100420 bytes).
- `ej2.png` (125766 bytes).
- `ej1.png` (138765 bytes).

**Imágenes referenciadas por includegraphics:** `ej1.png`, `ej2.png`, `ej3.png`.

#### F020 · BACH - 2º SOC - Programación Lineal (Soluciones 2).zip

**Ruta:** `Materiales y Recursos y Exámenes/BACH - 2º SOC - Programación Lineal (Soluciones 2).zip`  
**Abrir:** [Archivo original](<C:/Users/usuario/OneDrive/Documentos/Aplicaciones/2º Bachillerato Matemáticas Aplicadas a las Ciencias Sociales/Materiales y Recursos y Exámenes/BACH - 2º SOC - Programación Lineal (Soluciones 2).zip>)  
**Tamaño:** 3.734 bytes.

Soluciones de Programación Lineal 2: baterías, formulación de misiones y recinto; contiene código de gráficas.

**Encabezados/contenido detectado:** SOLUCIÓN:; Planteamiento del Problema; Función Objetivo; Restricciones; Modelo Matemático; Cálculo de los Vértices de la Región Factible; Evaluación de la Función Objetivo; Representación Gráfica; EJERCICIO 2 (3 puntos); SOLUCIÓN: Formulación del problema (sin resolver); EJERCICIO 3 (3 puntos); Planteamiento del Problema; Resolución; Cálculo de Vértices; Verificación de Factibilidad; Evaluación de la Función Objetivo; Representación Gráfica con \texttt{pgfplots; Conclusión.

**Entradas internas del ZIP:**

- `main.tex` (9913 bytes).

#### F021 · BACH - 2º SOC - Programación Lineal 1.zip

**Ruta:** `Materiales y Recursos y Exámenes/BACH - 2º SOC - Programación Lineal 1.zip`  
**Abrir:** [Archivo original](<C:/Users/usuario/OneDrive/Documentos/Aplicaciones/2º Bachillerato Matemáticas Aplicadas a las Ciencias Sociales/Materiales y Recursos y Exámenes/BACH - 2º SOC - Programación Lineal 1.zip>)  
**Tamaño:** 196.911 bytes.

Programación Lineal 1: tres ejercicios de optimización/modelización y región factible.

**Entradas internas del ZIP:**

- `main.tex` (5249 bytes).
- `images/Examen AyP - Triángulo.png` (34493 bytes).
- `images/Examen AyP - Romboide.png` (32975 bytes).
- `images/Examen AyP - Rombo.png` (54998 bytes).
- `images/Examen AyP - Rectángulo.png` (13798 bytes).
- `images/Examen AyP - Hexágono.png` (24821 bytes).
- `images/Examen AyP - Circulo.png` (29185 bytes).
- `Logo AL-ANDALUS.png` (8004 bytes).

**Imágenes referenciadas por includegraphics:** `Logo AL-ANDALUS.png`.

#### F022 · BACH - 2º SOC - Programación Lineal 2.zip

**Ruta:** `Materiales y Recursos y Exámenes/BACH - 2º SOC - Programación Lineal 2.zip`  
**Abrir:** [Archivo original](<C:/Users/usuario/OneDrive/Documentos/Aplicaciones/2º Bachillerato Matemáticas Aplicadas a las Ciencias Sociales/Materiales y Recursos y Exámenes/BACH - 2º SOC - Programación Lineal 2.zip>)  
**Tamaño:** 196.747 bytes.

Programación Lineal 2: baterías, formulación sin resolver de misiones y minimización sobre un recinto.

**Entradas internas del ZIP:**

- `main.tex` (4869 bytes).
- `images/Examen AyP - Triángulo.png` (34493 bytes).
- `images/Examen AyP - Romboide.png` (32975 bytes).
- `images/Examen AyP - Rombo.png` (54998 bytes).
- `images/Examen AyP - Rectángulo.png` (13798 bytes).
- `images/Examen AyP - Hexágono.png` (24821 bytes).
- `images/Examen AyP - Circulo.png` (29185 bytes).
- `Logo AL-ANDALUS.png` (8004 bytes).

**Imágenes referenciadas por includegraphics:** `Logo AL-ANDALUS.png`.

#### F023 · BACH - 2º SOC - Recuperación T1 Soluciones.zip

**Ruta:** `Materiales y Recursos y Exámenes/BACH - 2º SOC - Recuperación T1 Soluciones.zip`  
**Abrir:** [Archivo original](<C:/Users/usuario/OneDrive/Documentos/Aplicaciones/2º Bachillerato Matemáticas Aplicadas a las Ciencias Sociales/Materiales y Recursos y Exámenes/BACH - 2º SOC - Recuperación T1 Soluciones.zip>)  
**Tamaño:** 2.166 bytes.

Soluciones de Recuperación T1: continuidad/derivabilidad, tangente, función racional y área. Revisar M08.

**Encabezados/contenido detectado:** Ejercicio 1; (a) Calcule los valores de \( a \) y \( b \) para que la función \( f \) sea derivable en \( x = 1 \).; (b) Para \( a = 3 \) y \( b = -2 \), halle la ecuación de la recta tangente en \( x = 2 \).; Gráfica de la función \( f(x) \):; Ejercicio 2; (a) Estudie continuidad, asíntotas, monotonía y curvatura de \( g(x) \).; (b) Calcule el área entre la gráfica de \( g(x) \), el eje \( x \) y las rectas \( x = 2 \) y \( x = 4 \).; Gráfica de la función \( g(x) \):.

**Entradas internas del ZIP:**

- `main.tex` (5440 bytes).

#### F024 · BACH - 2º SOC - Recuperación T1.zip

**Ruta:** `Materiales y Recursos y Exámenes/BACH - 2º SOC - Recuperación T1.zip`  
**Abrir:** [Archivo original](<C:/Users/usuario/OneDrive/Documentos/Aplicaciones/2º Bachillerato Matemáticas Aplicadas a las Ciencias Sociales/Materiales y Recursos y Exámenes/BACH - 2º SOC - Recuperación T1.zip>)  
**Tamaño:** 315.041 bytes.

Recuperación T1: función a trozos y g(x)=1/(x+3); representación y área entre x=2 y x=4.

**Entradas internas del ZIP:**

- `main.tex` (4906 bytes).
- `images/Examen AyP - Triángulo.png` (34493 bytes).
- `images/Examen AyP - Romboide.png` (32975 bytes).
- `images/Examen AyP - Rombo.png` (54998 bytes).
- `images/Examen AyP - Rectángulo.png` (13798 bytes).
- `images/Examen AyP - Hexágono.png` (24821 bytes).
- `images/Examen AyP - Circulo.png` (29185 bytes).
- `Logo AL-ANDALUS.png` (8004 bytes).
- `logo_ies-alzujair.png` (21987 bytes).
- `JuanXXIIIChana-Logo.png` (39898 bytes).
- `logo.png` (56097 bytes).

**Imágenes referenciadas por includegraphics:** `Logo AL-ANDALUS.png`.

#### F025 · BACH - 2º SOC - SELs I (SOLUCIONES).zip

**Ruta:** `Materiales y Recursos y Exámenes/BACH - 2º SOC - SELs I (SOLUCIONES).zip`  
**Abrir:** [Archivo original](<C:/Users/usuario/OneDrive/Documentos/Aplicaciones/2º Bachillerato Matemáticas Aplicadas a las Ciencias Sociales/Materiales y Recursos y Exámenes/BACH - 2º SOC - SELs I (SOLUCIONES).zip>)  
**Tamaño:** 196.904 bytes.

Soluciones de SELs I: triangular, tabletas y discusión con parámetro.

**Entradas internas del ZIP:**

- `main.tex` (5976 bytes).
- `images/Examen AyP - Triángulo.png` (34493 bytes).
- `images/Examen AyP - Romboide.png` (32975 bytes).
- `images/Examen AyP - Rombo.png` (54998 bytes).
- `images/Examen AyP - Rectángulo.png` (13798 bytes).
- `images/Examen AyP - Hexágono.png` (24821 bytes).
- `images/Examen AyP - Circulo.png` (29185 bytes).
- `Logo AL-ANDALUS.png` (8004 bytes).

**Imágenes referenciadas por includegraphics:** `Logo AL-ANDALUS.png`.

#### F026 · BACH - 2º SOC - SELs I.zip

**Ruta:** `Materiales y Recursos y Exámenes/BACH - 2º SOC - SELs I.zip`  
**Abrir:** [Archivo original](<C:/Users/usuario/OneDrive/Documentos/Aplicaciones/2º Bachillerato Matemáticas Aplicadas a las Ciencias Sociales/Materiales y Recursos y Exámenes/BACH - 2º SOC - SELs I.zip>)  
**Tamaño:** 196.494 bytes.

SELs I: sistema triangular, venta de tabletas y discusión/resolución con parámetro λ.

**Entradas internas del ZIP:**

- `main.tex` (4223 bytes).
- `images/Examen AyP - Triángulo.png` (34493 bytes).
- `images/Examen AyP - Romboide.png` (32975 bytes).
- `images/Examen AyP - Rombo.png` (54998 bytes).
- `images/Examen AyP - Rectángulo.png` (13798 bytes).
- `images/Examen AyP - Hexágono.png` (24821 bytes).
- `images/Examen AyP - Circulo.png` (29185 bytes).
- `Logo AL-ANDALUS.png` (8004 bytes).

**Imágenes referenciadas por includegraphics:** `Logo AL-ANDALUS.png`.

#### F027 · BACH - 2º SOC - SELs II (SOLUCIONES).zip

**Ruta:** `Materiales y Recursos y Exámenes/BACH - 2º SOC - SELs II (SOLUCIONES).zip`  
**Abrir:** [Archivo original](<C:/Users/usuario/OneDrive/Documentos/Aplicaciones/2º Bachillerato Matemáticas Aplicadas a las Ciencias Sociales/Materiales y Recursos y Exámenes/BACH - 2º SOC - SELs II (SOLUCIONES).zip>)  
**Tamaño:** 197.057 bytes.

Soluciones de SELs II: triangular, empresa logística y discusión con parámetro.

**Entradas internas del ZIP:**

- `main.tex` (6570 bytes).
- `images/Examen AyP - Triángulo.png` (34493 bytes).
- `images/Examen AyP - Romboide.png` (32975 bytes).
- `images/Examen AyP - Rombo.png` (54998 bytes).
- `images/Examen AyP - Rectángulo.png` (13798 bytes).
- `images/Examen AyP - Hexágono.png` (24821 bytes).
- `images/Examen AyP - Circulo.png` (29185 bytes).
- `Logo AL-ANDALUS.png` (8004 bytes).

**Imágenes referenciadas por includegraphics:** `Logo AL-ANDALUS.png`.

#### F028 · BACH - 2º SOC - SELs II.zip

**Ruta:** `Materiales y Recursos y Exámenes/BACH - 2º SOC - SELs II.zip`  
**Abrir:** [Archivo original](<C:/Users/usuario/OneDrive/Documentos/Aplicaciones/2º Bachillerato Matemáticas Aplicadas a las Ciencias Sociales/Materiales y Recursos y Exámenes/BACH - 2º SOC - SELs II.zip>)  
**Tamaño:** 196.519 bytes.

SELs II: sistema triangular, paquetes pequeños/medianos/grandes y sistema con parámetro λ.

**Entradas internas del ZIP:**

- `main.tex` (4371 bytes).
- `images/Examen AyP - Triángulo.png` (34493 bytes).
- `images/Examen AyP - Romboide.png` (32975 bytes).
- `images/Examen AyP - Rombo.png` (54998 bytes).
- `images/Examen AyP - Rectángulo.png` (13798 bytes).
- `images/Examen AyP - Hexágono.png` (24821 bytes).
- `images/Examen AyP - Circulo.png` (29185 bytes).
- `Logo AL-ANDALUS.png` (8004 bytes).

**Imágenes referenciadas por includegraphics:** `Logo AL-ANDALUS.png`.

#### F029 · BACH - 2º SOC - Subida de nota T1 General Soluciones.zip

**Ruta:** `Materiales y Recursos y Exámenes/BACH - 2º SOC - Subida de nota T1 General Soluciones.zip`  
**Abrir:** [Archivo original](<C:/Users/usuario/OneDrive/Documentos/Aplicaciones/2º Bachillerato Matemáticas Aplicadas a las Ciencias Sociales/Materiales y Recursos y Exámenes/BACH - 2º SOC - Subida de nota T1 General Soluciones.zip>)  
**Tamaño:** 2.888 bytes.

Soluciones de subida de nota T1; incluye una rama diferente del enunciado y repeticiones. Revisar M06.

**Encabezados/contenido detectado:** Ejercicio 1; a) Derivabilidad en $x = 0$; b) Área entre la gráfica y el eje \( x \) en \( [0, 1] \); Gráfica de la función; Ejercicio 2; a) Análisis de la función; b) Recta tangente en $x = 2$; Gráfica de la función $g(x)$; Ejercicio 3; Ejercicio 1; a) Derivabilidad en \( x = 0 \); b) Área entre la gráfica y el eje \( x \) en \( [0, 1] \); Gráfica de la función.

**Entradas internas del ZIP:**

- `main.tex` (8847 bytes).

#### F030 · BACH - 2º SOC - Subida de nota T1 General.zip

**Ruta:** `Materiales y Recursos y Exámenes/BACH - 2º SOC - Subida de nota T1 General.zip`  
**Abrir:** [Archivo original](<C:/Users/usuario/OneDrive/Documentos/Aplicaciones/2º Bachillerato Matemáticas Aplicadas a las Ciencias Sociales/Materiales y Recursos y Exámenes/BACH - 2º SOC - Subida de nota T1 General.zip>)  
**Tamaño:** 315.097 bytes.

Subida de nota T1: a/(x−1) por tramos, área, g(x)=x/(x+3), tangente y primitiva.

**Entradas internas del ZIP:**

- `main.tex` (4972 bytes).
- `images/Examen AyP - Triángulo.png` (34493 bytes).
- `images/Examen AyP - Romboide.png` (32975 bytes).
- `images/Examen AyP - Rombo.png` (54998 bytes).
- `images/Examen AyP - Rectángulo.png` (13798 bytes).
- `images/Examen AyP - Hexágono.png` (24821 bytes).
- `images/Examen AyP - Circulo.png` (29185 bytes).
- `Logo AL-ANDALUS.png` (8004 bytes).
- `logo_ies-alzujair.png` (21987 bytes).
- `JuanXXIIIChana-Logo.png` (39898 bytes).
- `logo.png` (56097 bytes).

**Imágenes referenciadas por includegraphics:** `Logo AL-ANDALUS.png`.

## 6. Lista completa de los 86 epígrafes del guion

Fuente: [Guion maestro del temario](<C:/Users/usuario/OneDrive/Documentos/Aplicaciones/2º Bachillerato Matemáticas Aplicadas a las Ciencias Sociales/Temario completo/Guion_Temario_Matematicas_CC_Sociales_II_2Bach.md>). Conserva la numeración y desarrolla también las indicaciones bajo cada título.

### 1. Límites y derivadas

- 1.1. Límite de una función
- 1.2. Límites laterales
- 1.3. Operaciones con el infinito
- 1.4. Límites infinitos en un punto finito
- 1.5. Límites finitos en el infinito
- 1.6. Límites infinitos en el infinito
- 1.7. Operaciones con límites de funciones
- 1.8. Cálculo de límites sencillos
- 1.9. Indeterminaciones
- 1.10. Continuidad
- 1.11. Función derivada
- 1.12. Derivadas laterales
- 1.13. Ecuaciones de las rectas tangente y normal
- 1.14. Tabla de derivadas
- 1.15. Reglas de derivación
- 1.16. Regla de la cadena
- 1.17. Continuidad de las funciones derivables
- 1.18. Regla de L'Hôpital. Aplicación al cálculo de límites

### 2. Representación de funciones

- 2.1. Esquema general para representar una función
- 2.2. Funciones polinómicas
- 2.3. Funciones racionales
- 2.4. Funciones exponenciales
- 2.5. Funciones logarítmicas
- 2.6. Funciones a trozos. Valor absoluto
- 2.7. Traslaciones
- 2.8. Expansión y contracción
- 2.9. Optimización de funciones

### 3. Integrales

- 3.1. Integral indefinida
- 3.2. Integrales inmediatas
- 3.3. Integrales casi inmediatas
- 3.4. Métodos de integración
- 3.5. Integral definida
- 3.6. Teorema fundamental del cálculo
- 3.7. Regla de Barrow
- 3.8. Aplicaciones de la integral

### 4. Matrices y determinantes

- 4.1. Matrices: definición, características y tipos
- 4.2. Operaciones con matrices
- 4.3. Producto de matrices
- 4.4. Potencia de una matriz
- 4.5. Comparación de matrices. Matriz simétrica y matriz antisimétrica
- 4.6. Determinante de una matriz
- 4.7. Propiedades de los determinantes
- 4.8. Desarrollo de un determinante
- 4.9. Matriz inversa y matriz adjunta
- 4.10. Rango de una matriz
- 4.11. Ecuaciones matriciales
- 4.12. Grafos y matriz de adyacencia asociada

### 5. Sistemas de ecuaciones

- 5.1. Sistemas de ecuaciones lineales
- 5.2. Solución de un sistema de ecuaciones
- 5.3. Clasificación de sistemas de ecuaciones según sus soluciones
- 5.4. Notación matricial de un sistema de ecuaciones
- 5.5. Sistemas equivalentes
- 5.6. Teorema de Rouché-Frobenius
- 5.7. Resolución de sistemas. Matriz inversa
- 5.8. Resolución de sistemas. Método de Gauss
- 5.9. Resolución de sistemas. Regla de Cramer
- 5.10. Sistemas homogéneos
- 5.11. Discusión de sistemas con parámetros

### 6. Programación lineal

- 6.1. Inecuaciones lineales con dos incógnitas
- 6.2. Sistemas de inecuaciones lineales con dos incógnitas
- 6.3. Programación lineal
- 6.4. Solución de un problema de programación lineal
- 6.5. Problemas de programación lineal

### 7. Probabilidad

- 7.1. Sucesos. Regla de Laplace
- 7.2. Álgebra de sucesos
- 7.3. Tablas de contingencia
- 7.4. Frecuencias
- 7.5. Axiomática de Kolmogórov
- 7.6. Propiedades de la probabilidad
- 7.7. Experimentos compuestos
- 7.8. Probabilidad condicionada
- 7.9. Probabilidad total
- 7.10. Teorema de Bayes

### 8. Distribuciones de probabilidad

- 8.1. Variable aleatoria
- 8.2. Distribución binomial
- 8.3. Distribución normal
- 8.4. Aproximación de la distribución binomial a la distribución normal

### 9. Inferencia estadística

- 9.1. Estadística inferencial
- 9.2. Muestreo
- 9.3. Técnicas de muestreo
- 9.4. Distribución muestral. Teorema central del límite
- 9.5. Estimación puntual y estimación por intervalos
- 9.6. Intervalos de probabilidad o intervalos característicos
- 9.7. Intervalos de confianza
- 9.8. Tamaño de la muestra. Error cometido
- 9.9. Ficha técnica de encuestas

El guion termina con una secuencia global recomendada de aprendizaje.

## 7. Revisión visual y dependencias

Se generaron vistas iniciales a 1366×1000 píxeles, con ejecución del HTML y sus scripts disponibles. Las hojas siguientes son vistas de conjunto de los materiales originales, no diseños de la futura web. Las páginas largas continúan fuera de la captura inicial; no se probaron todas las selecciones, tarjetas y estados. Algunas fórmulas aparecen como LaTeX por la falta de inicialización de dependencias en este entorno.

- [Vista de conjunto 1 de las páginas HTML](<C:/Users/usuario/OneDrive/Documentos/Aplicaciones/2º Bachillerato Matemáticas Aplicadas a las Ciencias Sociales/Revision_visual_materiales/paginas_1.jpg>).
- [Vista de conjunto 2 de las páginas HTML](<C:/Users/usuario/OneDrive/Documentos/Aplicaciones/2º Bachillerato Matemáticas Aplicadas a las Ciencias Sociales/Revision_visual_materiales/paginas_2.jpg>).
- [Vista de conjunto 3 de las páginas HTML](<C:/Users/usuario/OneDrive/Documentos/Aplicaciones/2º Bachillerato Matemáticas Aplicadas a las Ciencias Sociales/Revision_visual_materiales/paginas_3.jpg>).
- [Vista de conjunto 4 de las páginas HTML](<C:/Users/usuario/OneDrive/Documentos/Aplicaciones/2º Bachillerato Matemáticas Aplicadas a las Ciencias Sociales/Revision_visual_materiales/paginas_4.jpg>).
- [Las 13 imágenes distintas de los ZIP](<C:/Users/usuario/OneDrive/Documentos/Aplicaciones/2º Bachillerato Matemáticas Aplicadas a las Ciencias Sociales/Revision_visual_materiales/imagenes_de_los_zip.jpg>).

Las etiquetas F034–F077 de las vistas corresponden al catálogo. Las 13 imágenes únicas comprenden seis figuras geométricas, cuatro logotipos y tres gráficas de programación lineal. Las figuras y logotipos se repiten en muchos paquetes; los originales permanecen dentro de cada ZIP.

### Elementos visuales aprovechables

- Jerarquía editorial de probabilidad: títulos claros, fórmulas destacadas, ejemplos y avisos.
- SVG de semiplanos, conjuntos, árboles, nubes de puntos y relaciones entre variables.
- Simuladores propios de normal y aproximación binomial-normal.
- Resolución desplegable, tarjetas y contextos de inferencia.
- Diseño de combinatoria como unidad con navegación, calculadora y juego.

### Cambios recomendados

- Unificar paleta, tipografía, navegación, componentes y numeración con el guion.
- Suavizar decoración de fondo en lectura larga y hacer consistente la densidad de información.
- Usar matemáticas accesibles y fuentes esenciales locales para reducir dependencia de CDN.
- Construir una versión hablada de fórmulas y descripciones de gráficos, en vez de confiar en la lectura del LaTeX.
- Dar alternativa por teclado a las interacciones visuales y no depender de los colores para explicar signos o respuestas.

## 8. Cómo usar el inventario durante la implementación

1. Abrir el prompt maestro y el guion.
2. Crear una matriz de cobertura con los 86 epígrafes y los apoyos.
3. Usar los IDs de este catálogo como claves de procedencia; conservar ruta original y localizador de ejercicio.
4. Extraer cada ZIP a una carpeta propia si se necesita compilar o copiar sus recursos.
5. Resolver las incidencias antes de convertir sus soluciones en respuestas automáticas.
6. Clasificar cada contenido como adaptado, nuevo, duplicado con correspondencia o pendiente de validación.
7. Completar todas las fases del prompt y comprobar los criterios de aceptación.

**Estado de esta entrega:** prompt e inventario elaborados; los archivos originales están preservados. La web completa y la auditoría integral de sus contenidos serán el resultado de ejecutar el prompt.


## 9. Ampliación del encargo: PDF, panel administrativo y GitHub Pages

El prompt maestro incorpora estas decisiones posteriores a la revisión original:

1. Revisar exhaustivamente los 30 paquetes LaTeX y sus relaciones, resolver/verificar todos los apartados y compilar pares de PDF de examen y soluciones. Revisar visualmente todas las páginas. Esta actualización del Markdown no implica que esos PDF ya estén generados.
2. Incluir en la web todos los temas, juegos, actividades y PDF finalizados, aunque algunos estén ocultos al alumnado.
3. Crear una biblioteca de recursos con etiquetas y controles independientes para mostrar el examen y sus soluciones.
4. Implementar un cuadro de mandos web exclusivo del administrador: acceso protegido, mostrar/ocultar, orden, destacados, vista previa, guardado global e historial. Mostrar u ocultar no exige recompilar ni subir archivos de nuevo.
5. Mantener GitHub Pages como alojamiento del frontend; conectar un servicio mínimo de autenticación administrativa y configuración central, con Firebase Authentication/Firestore como opción de referencia. La exclusividad administrativa debe comprobarse con permisos del servicio, no con una bandera del navegador.
6. Mantener desactivados login, estadísticas y progreso persistente del alumnado, con arquitectura preparada. Los visitantes estudian y juegan sin cuenta; el acceso administrativo es independiente.
7. Entender ocultación como control de presentación para no abrumar, no como confidencialidad de archivos estáticos: una URL PDF directa puede seguir funcionando. Los contenidos no se excluyen del despliegue por estar ocultos.

La primera revisión y las incidencias M01–M12 siguen vigentes. El catálogo original de 78 archivos no cambia; este apartado precisa lo que deberá hacer quien ejecute el prompt actualizado.


## Actualización 20 de octubre de 2026 · Entrega 160

F023/F024 revisados en copias de trabajo, con examen y soluciones PDF comprobados página a página. ZIP originales intactos. M08 corregida en la copia; M15 precisa monotonía por ramas y ausencia de inflexión fuera del dominio. Véase [auditoría](Web_Matematicas_CCSS_II/docs/auditoria-pdf-recuperacion-t1.md). Los demás paquetes mantienen sus pendientes.

## Actualización 20 de octubre de 2026 · Entrega 161

F029/F030 revisados en copias y dos PDF comprobados. Se conserva el enunciado racional de F030; los dos documentos y conversación concatenados en F029 quedan conciliados y registrados. M06 y M13 corregidas; M16 documenta crecimiento por ramas y ausencia de inflexión en -3. ZIP originales intactos. [Auditoría](Web_Matematicas_CCSS_II/docs/auditoria-pdf-subida-nota-t1-general.md). Acumulado: cuatro paquetes de treinta revisados, 26 pendientes. Las observaciones previas de este inventario describen los originales.

## Actualización 20 de octubre de 2026 · Entrega 162

F025/F026, SELs I, cerrados en copias LaTeX y PDF revisados. Datos y resultados originales correctos; pasos y comprobaciones ampliados. Se aclara la interpretación de los importes unitarios como precios de venta para modelizar la recaudación. Originales y logo conservados y comprobados por huella. [Auditoría](Web_Matematicas_CCSS_II/docs/auditoria-pdf-sistemas-sels-i.md). Acumulado: seis paquetes de treinta tratados, 24 pendientes. Siguiente: F027/F028.

## Actualización 20 de octubre de 2026 · Entrega 163

F027/F028, SELs II, cerrados en copias LaTeX y PDF revisados. Resultados originales confirmados; contradicción para lambda=5 y comprobaciones de logística ampliadas. ZIP y logo conservados. [Auditoría](Web_Matematicas_CCSS_II/docs/auditoria-pdf-sistemas-sels-ii.md). El registro individual [de los 30 paquetes](Web_Matematicas_CCSS_II/docs/pdf/registro-paquetes.json) incluye huellas y estado: ocho revisados, 22 pendientes. Siguiente lote F019/F021.

## Actualización 20 de octubre de 2026 · Entrega 164

F019/F021 cerrados en copias revisadas y PDF. M07 corregida para esta pareja: frontera estricta >2 millones con máximo (4,16) conservado; pendiente la pareja F020/F022. M17 registra orden, puntuación y optatividad distintos en F019: las copias siguen F021, un obligatorio y uno a elegir, máximo 10 puntos. Seis páginas revisadas; originales y gráficos conservados. [Auditoría](Web_Matematicas_CCSS_II/docs/auditoria-pdf-programacion-lineal-i.md). Registro de paquetes: diez revisados, veinte pendientes. Siguiente F020/F022.

## Actualización 20 de octubre de 2026 · Entrega 165

F020/F022 cerrados en copias LaTeX y PDF revisados: tres ejercicios obligatorios, 4+3+3 puntos. M18: F020 sustituye misiones por frutos rojos; la copia sigue F022 y conserva la variante en anexo no evaluable, sin resolver. M07 atendida también en esta pareja. M19: el ingreso de frutos rojos no determina beneficio neto sin costes; carencia señalada y pendiente de mejora del enunciado. Originales intactos. [Auditoría](Web_Matematicas_CCSS_II/docs/auditoria-pdf-programacion-lineal-ii.md). Doce paquetes tratados, dieciocho pendientes; siguiente F014/F015, exámenes distintos de matrices.

## Actualización 20 de octubre de 2026 · Entrega 166

F014/F015 cerrados en copias de examen revisadas y dos solucionarios nuevos. Los ZIP originales no incluían soluciones; su elaboración se identifica expresamente. Inversas, ecuaciones, dimensiones, nilpotencia y parámetros contrastados exactamente. Originales y logos conservados. Cuatro PDF y ocho páginas revisadas. [Auditoría](Web_Matematicas_CCSS_II/docs/auditoria-pdf-matrices-i-ii.md). Catorce paquetes tratados y dieciséis pendientes, con dieciséis PDF en ocho parejas. Siguiente F016, Matrices III, en un lote de un paquete.

## Actualización 20 de octubre de 2026 · Entrega 167

F016, Matrices III, cerrado con examen revisado y solucionario nuevo identificado: el ZIP no contenía soluciones. Factor común, potencias, dimensiones, determinante de orden 1 e igualdad por intercambio de filas comprobados. Original y logo conservados. Dos PDF y cuatro páginas revisadas. [Auditoría](Web_Matematicas_CCSS_II/docs/auditoria-pdf-matrices-iii.md). Quince paquetes tratados y quince pendientes; dieciocho PDF. Siguiente F006/F007, Funciones y copia, a conciliar como variantes.

## Actualización 20 de octubre de 2026 · Entrega 168

F006/F007 son exámenes distintos, no duplicados. Revisados en copias conservando originales; dos solucionarios nuevos y variante comentada común conservada en anexo no evaluable. Dominios, hueco, asíntotas, extremos y temperatura contrastados. M20 señala hipótesis necesarias para identificar corte y retorno de energía a partir de temperatura. Cuatro PDF y doce páginas revisadas. [Auditoría](Web_Matematicas_CCSS_II/docs/auditoria-pdf-funciones.md). Diecisiete paquetes tratados, trece pendientes; siguiente F008 y M14.

## Actualización 20 de octubre de 2026 · Entrega 169

F008 cerrado con examen revisado y solucionario nuevo identificado. M14 corregida en copia LaTeX/PDF: D(t)>0 para todo tiempo finito admisible, aunque su límite sea cero. Se conservan unidades, baremo, selección de cuatro derivadas y cuatro límites y sus alternativas comentadas en anexos. Original intacto; nueve páginas revisadas. [Auditoría](Web_Matematicas_CCSS_II/docs/auditoria-pdf-limites-derivadas.md). Dieciocho paquetes tratados y doce pendientes; siguiente F002/F003 y M02/M03.

## 2026-10-21 · cierre documental de entrega 170

F002/F003 revisados: M02/M03 corregidas en copias, cuatro PDF y ocho páginas inspeccionadas. Total: 20/30 paquetes, 28 PDF en 14 parejas; 341 pruebas pasan. Siguiente lote F017/F018. Índice operativo: Web_Matematicas_CCSS_II/TAREAS.md.

## 2026-10-21 · fix/build/test/docs: entrega 171, Probabilidad F017/F018

Variantes y optatividad conservadas; soluciones revisadas con tablas. M21: 343/469 se redondea a 0,7313; M22: interpretación uniforme entre jamones explicitada, mejora de redacción original pendiente. Cuatro PDF y doce páginas revisadas; recompilación idéntica sin conexión. 341 pruebas pasan; Chrome verifica 32 PDF desde raíz/subcarpeta. Total: 22/30 paquetes revisados, ocho pendientes; 980 entidades. Siguiente lote: F009, M04/M05. Índice: Web_Matematicas_CCSS_II/TAREAS.md.

## 2026-10-21 · fix/feat/build/test/docs: entrega 172, F009

Nueve ejercicios conservados. M04/M05 corregidas (sumas 144 y 110), extremos M24 y decimales de llaves M26 corregidos; recinto M25 completado. M23 abierta: 22,5 puntos sin regla de elección o conversión; no se inventa nota sobre 10. Dos PDF y quince páginas revisadas; recompilación idéntica sin conexión. 341 pruebas pasan y Chrome verifica 34 PDF desde raíz/subcarpeta. Total: 23/30 paquetes revisados, siete pendientes; 982 entidades. Próximo lote F011/F012. Índice: Web_Matematicas_CCSS_II/TAREAS.md.

## 2026-10-22 · fix/build/test/docs: entrega 173, F011/F012

Inferencia I/II conservadas con 10 puntos, apartados y 55 minutos. M27: suma 1620, media 180 e intervalo corregido en F012; M28: precisión muestral matizada en ambas copias. Cuatro PDF y diez páginas revisadas; recompilación idéntica sin conexión. 341 pruebas pasan; Chrome verifica 38 PDF en raíz/subcarpeta. Total: 25/30 paquetes revisados, cinco pendientes; 986 entidades. Próximo lote F010/F013. Índice: Web_Matematicas_CCSS_II/TAREAS.md.

## 2026-10-22 · fix/build/test/docs: entrega 174, F010/F013

Ocho enunciados compartidos cotejados; puntuación propia conservada. M27/M28 extendidas a F010; M29 corregida. M30 explica tamaño 144 de tabla y compatibilidad 143/144/145 con extremos redondeados; M31 abierta, 18 puntos sin regla de evaluación. Cuatro PDF y catorce páginas revisadas; recompilación idéntica sin conexión. 341 pruebas pasan; Chrome verifica 42 PDF en raíz/subcarpeta. Total: 27/30 paquetes revisados, tres pendientes; 990 entidades. Próximo lote F004/F005. Índice: Web_Matematicas_CCSS_II/TAREAS.md.

## 2026-10-22 · fix/feat/build/test/docs: entrega 175, F004/F005

F004 conserva dos exámenes separados de 10 puntos; soluciones revisadas, gráficas elaboradas y temperatura positiva corregida a ocho horas. Criterios ausentes y supuestos eléctricos explícitos. F005 recibe solucionario nuevo y anexo comentado no evaluable; puntuación discrepante del anexo señalada. Cuatro PDF y 21 páginas revisadas; recompilación idéntica sin conexión. 341 pruebas pasan y Chrome verifica 46 PDF desde raíz/subcarpeta. Total: 29/30 paquetes, uno pendiente; 994 entidades. Siguiente F001 y M01. Índice: Web_Matematicas_CCSS_II/TAREAS.md.

## 2026-10-22 · fix/build/test/docs: entrega 176, F001 y cierre T06

M01 corregida: rama válida, sin asíntota en 1 y sin monotonía global. M37: tartas (20,40), 680 euros; M38: suma 30,9 y media 3,09. Dos PDF y ocho páginas nuevas revisadas; recompilación idéntica sin conexión. 341 pruebas pasan; Chrome verifica 48 PDF. Auditoría conjunta: 30/30 originales, 24 parejas, 48 PDF y 154 páginas, sin paquetes pendientes. Catálogo 996 entidades. T06 cerrada con carencias originales documentadas; accesibilidad semántica PDF pendiente. Siguiente T07, biblioteca con búsqueda/filtros/etiquetas. Índice: Web_Matematicas_CCSS_II/TAREAS.md.

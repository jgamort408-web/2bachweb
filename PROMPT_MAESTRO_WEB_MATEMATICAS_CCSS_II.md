# Prompt maestro: libro web interactivo de Matemáticas Aplicadas a las Ciencias Sociales II

**Destinatarios:** estudiantes de 2.º de Bachillerato.  
**Fecha de preparación:** 15 de septiembre de 2026.  
**Entrega actual:** especificación y prompt para construir la web; no es todavía la web implementada.  
**Configuración inicial acordada:** web pública en GitHub Pages con todo el contenido revisado incluido; cuadro de mandos exclusivo del administrador para mostrar/ocultar mediante configuración central. Las cuentas, estadísticas personales y seguimiento del alumnado quedan preparados pero desactivados. Los PDF de exámenes y soluciones deben revisarse, compilarse y verificarse durante la construcción.  
**Documento complementario:** `INVENTARIO_Y_DIAGNOSTICO_MATERIALES.md`, situado junto a este archivo. Contiene las rutas de los 78 archivos originales, los archivos internos de los ZIP, los 86 epígrafes del guion y las incidencias detectadas.

## Actualización del usuario · 7 de octubre de 2026

Para programación lineal, estadística bidimensional, distribuciones e inferencia, usar como base todo el contenido de los HTML originales de `Página web existente/` (guardados como TXT). Conservar sus textos y actividades al integrarlos. **Lo que falte quedará en blanco o marcado con las mejoras pendientes; no crear contenido adicional para cubrir huecos ni alcanzar las cuotas generales.** Este criterio prevalece sobre los requisitos de ampliación y cobertura de este documento en esos bloques.

Corregir los errores comprobados de las fuentes y adaptar navegación, accesibilidad y carga matemática dejando constancia. Las tareas por archivo y las rutas están en [Criterio de reutilización de HTML](Web_Matematicas_CCSS_II/docs/criterio-reutilizacion-html-estadistica-pl-inferencia.md). Los originales se conservan sin modificar.

## Cómo utilizar este documento

Entrega este Markdown completo a un agente de programación con acceso a esta carpeta. Pídele que ejecute el encargo de principio a fin, siguiendo las fases y los criterios de aceptación. El inventario complementario forma parte del contexto que debe leer. Las rutas de las fuentes se refieren a archivos existentes; las rutas de implementación son propuestas para archivos que todavía deben crearse.

**Carpeta raíz real:**

```text
C:\Users\usuario\OneDrive\Documentos\Aplicaciones\2º Bachillerato Matemáticas Aplicadas a las Ciencias Sociales
```

Para trasladar el proyecto a otro equipo, cambia únicamente esta raíz y conserva las rutas relativas de los materiales. No construyas enlaces públicos que apunten a `C:\Users\...`.

---

# COMIENZO DEL PROMPT DE CONSTRUCCIÓN

## 1. Tu función y el resultado que debes entregar

Actúa como ingeniero de software educativo, especialista en HTML interactivo, diseñador de experiencia de usuario, diseñador gráfico, autor de libros de matemáticas, docente de 2.º de Bachillerato y diseñador de juegos de aprendizaje. Integra estas perspectivas en un único producto coherente.

Construye una web completa, funcional, adaptable a móviles y accesible de **Matemáticas Aplicadas a las Ciencias Sociales II**. Debe permitir estudiar todo el temario, comprender las matemáticas mediante representaciones visuales, practicar con ayuda gradual, resolver problemas, realizar test, repasar flashcards y jugar a actividades con preguntas procedurales y corrección automática explicada.

La web debe ser un libro de texto suficiente para estudiar la materia, no una colección de títulos o resúmenes. Los PDF, imágenes, textos originales y enlaces externos podrán servir de apoyo, pero las explicaciones, fórmulas y actividades fundamentales vivirán en HTML accesible.

Trabaja sobre los materiales locales, conserva su procedencia y amplía lo que falte con elaboración didáctica original y matemáticamente comprobada. No copies una solución sin verificarla: hay errores concretos registrados en el inventario. No confundas la amplitud de las fuentes con una garantía de corrección.

El producto debe incluir:

- Nueve temas principales completos, con los 86 epígrafes del guion.
- Dos módulos de apoyo: combinatoria y estadística bidimensional, conservando el contenido existente.
- Inicio, mapa del curso, libro, práctica, test, flashcards, laboratorios y juegos, recursos PDF, exámenes, formulario, glosario y panel de accesibilidad. El área personal y el seguimiento se implementan como extensión desactivada.
- Biblioteca de recursos con exámenes y soluciones en PDF, compilados desde LaTeX revisado, emparejados y etiquetados.
- Cuadro de mandos web con autenticación del administrador, control de visibilidad por sección/tema/actividad/PDF y persistencia central de los cambios. El alumnado no necesita cuentas.
- Traducción a varios idiomas y lectura en voz alta, priorizando las funciones y servicios oficiales de Google según el apartado 12.
- Ajustes de tamaño de texto, contraste, resaltado de lo importante, espaciado, movimiento y modo de concentración.
- Código organizado, contenido separado de la interfaz, pruebas relevantes, documentación de uso y evidencia de verificación.

## 2. Fuentes locales: qué leer, dónde y con qué prioridad

### 2.1. Guion que fija el alcance y la numeración

```text
Temario completo/Guion_Temario_Matematicas_CC_Sociales_II_2Bach.md
```

Es el documento rector de contenidos. Contiene nueve temas y 86 epígrafes con orientaciones de desarrollo. Es un guion, no un libro redactado: desarrolla todos sus conceptos, procedimientos, interpretaciones y tipos de tareas.

### 2.2. Planificación de la interacción

```text
Planificacion_Interactiva_2Bach_CC_Sociales/01_Laboratorios_Minijuegos_2Bach_CC_Sociales.md
Planificacion_Interactiva_2Bach_CC_Sociales/02_Flashcards_2Bach_CC_Sociales.md
Planificacion_Interactiva_2Bach_CC_Sociales/03_Tests_2Bach_CC_Sociales.md
```

Contienen 28 propuestas de laboratorios, 206 filas de tarjetas y una muestra de 90 preguntas tipo test. El documento de test propone ampliar a 60–80 ítems por tema. Son bases de contenido y diseño, no motores ya implementados. La numeración de estos documentos coincide con la del guion.

### 2.3. Web anterior: HTML guardado como TXT

```text
Página web existente/Inicio.txt
Página web existente/Competencias y criterios.txt
Página web existente/Combinatoria.txt
Página web existente/1. Programación Lineal/
Página web existente/2. Estadística Bidimensional/
Página web existente/3. Probabilidad/
Página web existente/4. Distribuciones/
Página web existente/5. Inferencia Estadística/
```

Lee los 44 `.txt` como código HTML, CSS y JavaScript. Examina también los datos incluidos en sus scripts; en varios laboratorios el contenido aparece solo al seleccionar un ejercicio. Hay 71 registros de ejercicios en los cinco bancos `const ejercicios`, además de ejemplos insertados en las lecciones.

Rutas especialmente útiles:

| Recurso | Ruta exacta relativa a la raíz |
|---|---|
| Modelo gráfico de programación lineal y 6 ejercicios | `Página web existente/1. Programación Lineal/5. Ejercicios Resueltos.txt` |
| 9 ejercicios de estadística bidimensional | `Página web existente/2. Estadística Bidimensional/6. Ejercicios resueltos.txt` |
| 8 ejercicios de probabilidad | `Página web existente/3. Probabilidad/6. Ejercicios resueltos.txt` |
| Curva normal, densidad y acumulada | `Página web existente/4. Distribuciones/3. Distribución Normal.txt` |
| Comparador binomial-normal | `Página web existente/4. Distribuciones/4. Aproximación de la Binomial por la Normal.txt` |
| 21 ejercicios de distribuciones | `Página web existente/4. Distribuciones/5. Ejercicios Resueltos.txt` |
| Aventura sobre medias muestrales | `Página web existente/5. Inferencia Estadística/2.1. Distribución de la media muestral.txt` |
| Aventura sobre proporciones muestrales | `Página web existente/5. Inferencia Estadística/2.2. Distribución de la proporción muestral.txt` |
| 27 ejercicios de inferencia | `Página web existente/5. Inferencia Estadística/4. Ejercicios resueltos.txt` |
| Test de 20 preguntas de inferencia y muestreo | `Página web existente/5. Inferencia Estadística/7. Tipo test.txt` |
| Simulación de intervalos | `Página web existente/5. Inferencia Estadística/8. Intervalos de confianza.txt` |
| Conteo, calculadora y juego de 10 preguntas | `Página web existente/Combinatoria.txt` |

Conserva las ideas de los SVG, las gráficas, los ejemplos contextualizados y la resolución por pasos. Unifica tipografía, colores, navegación, formularios y controles. Evita concatenar documentos HTML completos o insertar lecciones completas de la web anterior dentro de iframes. Por petición posterior del usuario, los videojuegos se desarrollan como widgets independientes con HTML, CSS y JavaScript propios y pueden insertarse mediante iframe, con comunicación validada con su página anfitriona.

**Actualización de implementación, 16-09-2026:** el proyecto está en Web_Matematicas_CCSS_II y su estado real se registra en PLAN_DE_ACCION.md dentro de esa carpeta. Las fórmulas se escriben en LaTeX y usan el servicio común de MathJax local, con carga única, cola de procesamiento, reintentos limitados y recuperación sin perder respuestas. Consultar docs/formulas-latex.md antes de añadir actividades; no insertar cargadores matemáticos independientes por página.

### 2.4. Exámenes y recursos dentro de ZIP

```text
Materiales y Recursos y Exámenes/
```

Hay 30 ZIP. **Todos contienen un `main.tex`.** El inventario enumera cada paquete y todos sus archivos internos. Lee el LaTeX directamente, incluidos entornos `questions`, `parts`, `solution`, secciones, tablas, fórmulas y gráficos TikZ/PGFPlots. Puede haber soluciones aunque el nombre del ZIP no lo indique.

La notación `archivo.zip :: main.tex` identifica una entrada interna; no es una ruta que pueda abrirse sin leer o extraer el ZIP. Si extraes, usa una subcarpeta distinta para cada paquete, verifica que las rutas permanezcan dentro del destino y evita sobrescribir los distintos `main.tex`.

Empareja enunciados y soluciones comparando el texto matemático real. Los nombres parecidos, las etiquetas `Copy`, los números romanos y las palabras «soluciones» no bastan para decidir que dos archivos son equivalentes.

Además de adaptar los ejercicios a HTML, **revisa y compila los documentos LaTeX para entregar PDF separados de enunciados y soluciones**, con el procedimiento del apartado 14. No basta con enlazar los ZIP o cambiarles la extensión. Recorre los 30 paquetes y documenta su correspondencia con los documentos finales: una pareja de ZIP de enunciado/solución puede producir una única pareja de PDF, y una recopilación puede contener varios exámenes. El número final de PDF debe resultar del inventario conciliado, no de multiplicar automáticamente 30 por dos.

### 2.5. Orden para resolver conflictos

1. Requisitos expresos del encargo y accesibilidad.
2. Corrección matemática y coherencia entre enunciado, solución y representación.
3. Guion maestro para alcance y numeración.
4. Planificación de juegos, tarjetas y test para mecanismos de aprendizaje.
5. Contenido validado de la web y de los exámenes.
6. Decisiones de diseño de la web anterior, adaptadas al sistema común.

Registra las discrepancias en `docs/incidencias-contenido.md`, con fuente, localizador, problema, corrección y comprobación. Mantén intactos los originales. No atribuyas a una fuente local los desarrollos nuevos que tú añadas.

## 3. Arquitectura curricular y correspondencia con las fuentes

Mantén el orden del guion. Presenta tres bloques visuales, sin cambiar los números de tema: **Análisis** (1–3), **Álgebra y decisiones** (4–6), **Azar y datos** (7–9).

| Tema definitivo | Contenido esencial | Material local específico | Trabajo necesario |
|---|---|---|---|
| 1. Límites y derivadas | 18 epígrafes: límites, laterales, infinitos, indeterminaciones, continuidad, derivada, tangente, normal, reglas, cadena y L'Hôpital | Guion §1; planificación T1; ZIP Examen Límites y Derivadas, Ejercicios repaso, recuperaciones y subida de nota | Redactar libro y construir interacción: no existe carpeta HTML de este tema |
| 2. Representación de funciones | 9 epígrafes: estudio global, familias polinómicas/racionales/exponenciales/logarítmicas, trozos, valor absoluto, traslaciones, escalados y optimización | Guion §2; planificación T2; ZIP Examen Funciones y Examen Funciones (Copy), recuperaciones y repaso | Desarrollar teoría y gráficas con dominio, asíntotas, monotonía y contexto |
| 3. Integrales | 8 epígrafes: primitivas, inmediatas, casi inmediatas, métodos, definida, teorema fundamental, Barrow y áreas | Guion §3; planificación T3; ZIP Examen Funciones, Recuperación T1, Subida de nota T1 General, repaso | Elaborar unidad completa; no hay ZIP dedicado exclusivamente a integrales |
| 4. Matrices y determinantes | 12 epígrafes: tipos, operaciones, producto, potencias, traspuesta, simetría, determinantes, propiedades, desarrollo, inversa, rango, ecuaciones y grafos | Guion §4; planificación T4; ZIP Matrices I, II y III | Libro nuevo; reutilizar y resolver ejercicios de exámenes |
| 5. Sistemas de ecuaciones | 11 epígrafes: solución, clasificación, matrices, equivalencia, Rouché-Frobenius, inversa, Gauss, Cramer, homogéneos y parámetros | Guion §5; planificación T5; ZIP SELs I y II y sus SOLUCIONES | Libro nuevo y motor de operaciones elementales |
| 6. Programación lineal | 5 epígrafes: inecuaciones, sistemas, modelización, método gráfico y problemas | Guion §6; planificación T6; carpeta HTML `1. Programación Lineal`; ZIP Programación Lineal 1, 2 y Soluciones 1, 2 | Renumerar antiguo tema 1 a tema 6 y revisar restricciones y regiones |
| 7. Probabilidad | 10 epígrafes: sucesos, Laplace, álgebra, tablas, frecuencias, axiomas, propiedades, compuestos, condicionada, total y Bayes | Guion §7; planificación T7; carpeta HTML `3. Probabilidad`; ZIP Probabilidad y Probabilidad (2) | Renumerar 3 a 7, integrar combinatoria como apoyo y evitar repeticiones |
| 8. Distribuciones de probabilidad | 4 epígrafes: variable aleatoria, binomial, normal y aproximación | Guion §8; planificación T8; carpeta HTML `4. Distribuciones`; dos ZIP Distribuciones de Probabilidad | Renumerar 4 a 8, consolidar simulaciones y comprobar cálculos |
| 9. Inferencia estadística | 9 epígrafes: inferencia, muestreo, técnicas, distribuciones muestrales, estimación, intervalos característicos, confianza, error/tamaño y ficha técnica | Guion §9; planificación T9; carpeta HTML `5. Inferencia Estadística`; cuatro ZIP de Inferencia y Examen Resuelto Recuperación | Renumerar 5 a 9, distinguir casos exactos/aproximados y corregir resultados |

**Módulos de apoyo que también debes desarrollar y conservar:**

- **Combinatoria:** regla del producto, factorial, variaciones con/sin repetición, permutaciones simples y con repetición, combinaciones, árbol para elegir método y aplicación a Laplace. Acceso desde el tema 7 y desde herramientas. Fuente: `Página web existente/Combinatoria.txt`.
- **Estadística bidimensional:** repaso unidimensional, tablas conjuntas y marginales, nube de puntos, centro de gravedad, covarianza, Pearson, regresión, predicción y límites de interpretación. Fuente: los ocho archivos de `Página web existente/2. Estadística Bidimensional/`. Acceso desde apoyo estadístico y temas 7–9.

Los exámenes de repaso, final, recuperación y subida de nota alimentarán colecciones transversales. Clasifica sus ejercicios por contenido, incluso cuando su rótulo sea impreciso; por ejemplo, un intervalo de confianza pertenece a inferencia aunque aparezca rotulado «Distribuciones».

Conserva todos los epígrafes del guion, incluidos grafos y L'Hôpital. En contenidos cuya profundidad se deja abierta, como métodos de integración, define un núcleo suficiente y una ampliación identificada. La trigonometría aparece en algunos ejercicios de derivadas: incluye el apoyo necesario y etiqueta su relación con los materiales. No presupongas comunidad autónoma, normativa o modelo PAU vigente a partir de los logotipos o del formato de un examen local. Si afirmas adecuación normativa, verifica previamente las fuentes oficiales aplicables.

## 4. Experiencia del estudiante y navegación

### 4.1. Secciones principales

| Sección | Función y contenido |
|---|---|
| Inicio | Portada pública con accesos a los temas visibles, recursos destacados y juegos disponibles; recomendaciones editoriales sin perfil personal |
| Libro | Nueve temas, apoyos, índice completo, búsqueda por concepto y lectura continua |
| Practicar | Selección por tema, epígrafe, destreza, dificultad y modalidad |
| Test | Práctica guiada, reto y evaluación con informe final |
| Flashcards | Mazos visibles y repaso libre; repetición espaciada personal preparada y desactivada por defecto |
| Laboratorios y juegos | Experimentos visuales, misiones breves y preguntas procedurales |
| Exámenes | Documentos locales adaptados, colecciones por tema y simulacros de desarrollo |
| Recursos | Biblioteca etiquetada de PDF visibles, con examen y soluciones relacionados y apertura/descarga por separado |
| Herramientas | Formulario, glosario, tabla normal, calculadoras didácticas y referencias |
| Mi progreso | Extensión futura implementada y verificable en desarrollo, sin entrada de menú ni ruta pública activa en esta versión |
| Accesibilidad | Idioma, voz, texto, espaciado, contraste, resaltado y concentración |
| Administración | Acceso exclusivo del administrador al cuadro de mandos de visibilidad, orden, destacados y recursos; no es una cuenta de estudiante |

En escritorio, utiliza barra superior compacta y menú lateral plegable. En móvil, menú accesible y acciones esenciales visibles sin saturar la pantalla. Añade migas de pan y enlace permanente a cada epígrafe. Las pestañas internas de un tema serán: **Aprender · Ejemplos · Practicar · Test · Tarjetas · Laboratorio · Repasar**. No muestres pestañas vacías.

### 4.2. Recorridos completos que deben funcionar

1. **Aprender desde cero:** inicio → tema visible → requisitos → explicación → ejemplo → actividad guiada → práctica autónoma → resumen.
2. **Preparar una prueba:** elegir tema → diagnóstico de la sesión → problemas → simulacro → revisión razonada → repaso libre de tarjetas.
3. **Superar una dificultad:** respuesta incorrecta → explicación del error concreto → pista → paso intermedio → ejercicio equivalente con datos nuevos.
4. **Estudiar con apoyos:** elegir idioma → ajustar texto/contraste → activar lectura → escuchar solo el bloque visible → responder por teclado sin perder preferencias.

En el modo público inicial para alumnado, cualquier visitante puede estudiar, jugar y consultar los recursos visibles sin registrarse. Los resultados de una partida son temporales y no constituyen un historial personal. Solo persisten las preferencias de accesibilidad e idioma. El estudiante puede entrar directamente a cualquier contenido visible; la configuración central determina qué contenidos se muestran, y las recomendaciones no añaden bloqueos por rendimiento. La distinción persistente entre «leído», «practicado» y «dominado» pertenece a la extensión futura.


### 4.3. Todo el contenido incluido, visibilidad controlada

**Decisión expresa:** incluye en la web desplegada todos los temas, epígrafes, juegos, test, tarjetas, exámenes y soluciones terminados y revisados. El administrador decide desde su cuadro de mandos cuáles se muestran al alumnado. Ocultar no elimina archivos, no exige recompilar ni requiere volver a subir un tema cuando se quiera mostrar.

Separa `reviewStatus` (pendiente/verificado/bloqueado por un defecto) de `visibility` (`visible`/`hidden`). Todos los contenidos finalizados deben estar incluidos en el despliegue aunque empiecen ocultos. Un contenido todavía sin corregir es una incidencia de producción, no un mecanismo para dosificar el curso. No uses la visibilidad como excusa para omitir contenidos solicitados.

Mantén un catálogo completo de recursos con IDs estables y relaciones jerárquicas. Un servicio central almacena la configuración de visibilidad, orden, destacados y versión. Un tema oculto oculta efectivamente a sus hijos sin borrar su configuración individual; al mostrarlo se recuperan sus preferencias. La solución de un examen se puede mostrar u ocultar por separado, y su visibilidad efectiva requiere que el examen correspondiente esté visible.

La misma configuración se aplica a portada, menús, índice del libro, búsqueda, enlaces relacionados, recomendaciones, selección aleatoria de preguntas, mazos y biblioteca PDF. No muestres tarjetas vacías, una colección de candados ni enlaces a recursos ocultos. Un índice plegado es una preferencia visual distinta de ocultar un contenido.

La navegación normal a una ruta de lección marcada como oculta mostrará «Este contenido no está visible en este momento» y un enlace de vuelta, sin generar un error confuso. Es una regla de presentación de la aplicación: al estar los archivos incluidos en un alojamiento estático, **ocultar no equivale a proteger la descarga directa o impedir inspeccionar el código**. En particular, la URL directa de un PDF puede seguir abriéndose. No prometas confidencialidad de los recursos ocultos; el objetivo acordado es dosificar lo que se presenta al alumnado.

La protección real se exige para **las operaciones de administración**, no para los archivos educativos incluidos en Pages. La autenticación del administrador y la autorización de escrituras deben comprobarse en el servicio externo, no con una contraseña o un indicador `isAdmin` guardados en JavaScript/localStorage.

### 4.4. Cuadro de mandos exclusivo del administrador

Construye una ruta de administración, por ejemplo `/admin/`, con inicio de sesión reservado al administrador. No añadas botones de login para estudiantes ni un panel docente fingido basado en datos locales. Los visitantes no autenticados pueden encontrar la pantalla de acceso; solo una identidad autorizada puede consultar las funciones administrativas y guardar cambios. La existencia de código estático para el panel no constituye autorización para operarlo.

**Organización del panel:**

- Resumen: temas y recursos visibles/ocultos, última modificación y configuración activa.
- Árbol del curso: bloque → tema → epígrafe → actividades, con controles «Mostrar» y «Ocultar».
- Recursos: tabla de PDF con etiquetas, búsqueda, filtro por tema/tipo y controles separados para examen y soluciones.
- Juegos, test y tarjetas: controles individuales o selección de varios elementos y acción conjunta.
- Portada: elegir destacados, ordenar accesos y decidir qué secciones aparecen.
- Vista previa: «Vista del alumnado» y «Ver todo como administrador», sin cambiar accidentalmente la configuración pública.
- Cambios pendientes: mostrar qué se va a modificar, **Guardar cambios** y **Descartar**; guardar un lote coherente en una única actualización.
- Historial: versiones y opción de restaurar la configuración anterior; exportar/importar una copia validada como respaldo.

Los controles serán accesibles, con estado en texto además de color, filtros claros y una indicación de visibilidad heredada del tema padre. No exijas editar JSON ni hacer commits para mostrar u ocultar contenido desde el panel.

**Flujo:** administrador inicia sesión → modifica controles → previsualiza → guarda → el servicio comprueba su autorización y persiste la configuración → los visitantes reciben la nueva versión. Los cambios son globales, no preferencias del navegador del administrador. Usa escucha de cambios o actualización periódica con un objetivo comprobable de propagación, por ejemplo 30 segundos con conexión, y actualización inmediata al abrir o recargar la web.

Si se oculta una actividad durante una partida, permite terminar la instancia ya iniciada y bloquea el comienzo de nuevas rondas de ese recurso; refleja la nueva selección al volver al menú. El panel debe informar de esta política. Sin conexión, la web puede mostrar la última configuración conocida y debe señalar que se trata de una copia sin actualizar; no prometer propagación mientras el dispositivo esté desconectado.

Al guardar, valida IDs, esquema, dependencias y revisión. Usa una versión de configuración para detectar ediciones simultáneas y evitar sobreescribir cambios de otro dispositivo. No muestres «guardado» hasta recibir confirmación; si falla la red conserva el borrador y permite reintentar. Un archivo estático inicial servirá de configuración de respaldo y una última versión válida podrá guardarse localmente como caché de configuración pública, sin guardar datos del alumno.

Para que esto funcione en GitHub Pages, implementa la integración mínima de administración del apartado 15: autenticación del administrador y almacenamiento central de configuración. Si ese servicio aún no está configurado, la web pública puede funcionar con la configuración inicial, pero el panel debe indicar que el guardado global no está disponible. Documenta lo que falta y no consideres cumplido el panel compartido hasta probar persistencia real. No sustituyas el requisito por un editor exclusivamente local.

Configuración inicial de ejemplo: tema 1 y sus actividades visibles, resto oculto pero incluido, y soluciones PDF ocultas hasta que el administrador las muestre. Déjala editable en el panel antes de utilizar el sitio con alumnado. No programes fechas de apertura salvo que se solicite posteriormente.

## 5. Cómo redactar el libro de texto completo

### 5.1. Plantilla obligatoria de cada epígrafe

1. Título preciso, código del guion, objetivo expresado como «Al terminar podrás…» y requisitos previos.
2. Situación motivadora breve vinculada, cuando sea adecuado, a economía, demografía, encuestas, logística, consumo o decisiones.
3. Explicación intuitiva mediante una figura, tabla o ejemplo pequeño.
4. Definiciones y notación formal; identifica todas las variables, unidades, supuestos y restricciones.
5. Propiedades o resultados con sus condiciones y explicación de por qué funcionan al nivel del curso.
6. Procedimiento paso a paso y criterio para elegirlo.
7. Al menos un ejemplo completamente resuelto. Añade un segundo ejemplo o contraejemplo cuando sea necesario para distinguir casos.
8. Visualización manipulable cuando aporte comprensión; siempre acompañada de descripción o tabla equivalente.
9. Actividad guiada con ayudas progresivas, seguida de una comprobación autónoma con respuesta explicada.
10. Errores frecuentes, resumen de ideas esenciales y enlace a ejercicios, tarjetas y contenidos relacionados.

No fijes una longitud artificial para todos los epígrafes. Un procedimiento central necesita más desarrollo que una propiedad sencilla. La cobertura se medirá por las destrezas explicadas y practicadas, no por el número de palabras.

### 5.2. Criterios editoriales

- Español claro, preciso y adecuado a jóvenes de 17–18 años; evita infantilizar y elimina expresiones innecesariamente técnicas como «teoría de la medida» en una portada introductoria.
- Separa definición, intuición y regla operativa. No presentes un atajo como un teorema universal.
- Introduce primero números manejables y después contextos con decimales o parámetros.
- Explica por qué se descartan soluciones fuera del dominio o del contexto.
- Formula y resuelve ejemplos originales para cubrir lagunas; conserva referencias a los ejemplos locales adaptados.
- Usa fórmulas renderizadas y texto seleccionable. Evita capturas de ecuaciones como contenido principal.
- Incluye tabla de derivadas, tabla de primitivas, formulario de probabilidad/inferencia y glosario enlazado.
- Documenta una única convención para la normal. Por compatibilidad con gran parte del material, puede emplearse `N(μ, σ)`, indicando explícitamente que el segundo parámetro es la desviación típica. Explica la alternativa `N(μ, σ²)` y normaliza las importaciones.
- Denomina el valor crítico positivo `z* = Φ⁻¹(1−α/2)`. Si conservas `z_{α/2}` de una fuente, define que se refiere al cuantil de cola superior.

## 6. Ejercicios resueltos y práctica autocorregida

### 6.1. Estructura de un ejercicio

Cada ejercicio tendrá identificador estable, tema, epígrafe, dificultad, objetivos, fuente, enunciado, datos, supuestos, representación, respuesta esperada, desarrollo, pistas, errores previstos, criterio de corrección y política de redondeo.

Resolución visible por etapas: **Comprender → Modelizar → Resolver → Comprobar → Interpretar**. El estudiante podrá revelar un paso, intentar completarlo, ver una pista o consultar toda la solución. Mostrar la solución no equivale a superar el ejercicio.

Para cada tema, entrega al menos **12 problemas de desarrollo resueltos**, con representación de sus principales procedimientos. Esta cifra es un suelo de calidad y no sustituye el ejemplo obligatorio de cada epígrafe. Conserva todos los ejercicios locales válidos; el suelo no es un límite para recortar los bancos existentes.

### 6.2. Tipos de respuesta y validación

| Respuesta | Corrección requerida |
|---|---|
| Número o fracción | Equivalencia exacta cuando proceda; tolerancia documentada para aproximaciones |
| Porcentaje/probabilidad | Unidad indicada; aceptar `25 %` como `0,25` cuando el campo permita ambas formas |
| Intervalo | Dos extremos y carácter abierto/cerrado; formato inequívoco con punto y coma si se usa coma decimal |
| Conjunto de soluciones | Comparación independiente del orden; casos vacío, finito y parametrizado |
| Expresión algebraica | Analizador con gramática limitada, equivalencia dentro del dominio y transformaciones justificadas |
| Matriz | Orden correcto y comprobación elemento a elemento |
| Recta | Pendiente/ordenada o coeficientes equivalentes; contemplar rectas verticales |
| Gráfica o región | Coordenadas y restricciones matemáticas; no comparar únicamente píxeles |
| Paso de Gauss | Comprobar operación elemental y equivalencia, admitiendo distintas rutas |
| Justificación | Preguntas estructuradas y rúbrica; no afirmar comprensión semántica completa a partir de palabras clave |

Acepta coma o punto decimal en entradas simples y documenta separadores de listas. Usa una regla como `|a−b| ≤ max(toleranciaAbsoluta, toleranciaRelativa·|b|)` cuando corresponda, con valores elegidos por familia; para cuatro decimales puede usarse una tolerancia absoluta cercana a `0,00005`, explicando el criterio. Una tolerancia no debe aceptar respuestas conceptualmente distintas.

No uses `eval` ni `new Function` sobre respuestas. No pruebes equivalencia algebraica solo evaluando dos puntos. Para polinomios puede compararse la forma canónica; para cocientes, identidad tras producto cruzado junto al dominio; para primitivas, derivada y dominio, admitiendo la constante libre. Limita las formas aceptadas a las que el motor puede validar con seguridad y exactitud.

Devuelve **Correcta**, **Revisa este paso**, **Incorrecta** o **No puedo interpretar la respuesta**. Añade explicación específica, no solo color, puntos o un icono. Si no se puede diagnosticar la causa, no inventes el error del alumno.

## 7. Banco tipo test

Incorpora los 90 ítems del documento de planificación, los 20 del test de inferencia y los 10 del juego de combinatoria después de validarlos. Evita duplicados exactos y conserva variantes con objetivos distintos.

Para la versión completa, desarrolla **60 ítems base por tema principal como mínimo**; objetivo editorial de 60–80. Distribuye aproximadamente 40 % básicos, 40 % intermedios y 20 % de transferencia o reto. Garantiza cobertura de todos los epígrafes y, cuando el ítem sea de cálculo, al menos tres variantes comprobadas. No cuentes la mera reordenación de respuestas como un ítem nuevo.

- Cuatro opciones y una única respuesta correcta, salvo selección múltiple claramente anunciada.
- Distractores derivados de errores reales, diferentes entre sí y nunca equivalentes a la solución tras simplificar o redondear.
- Mezcla con semilla y asociación por identificador de opción, nunca por índice después de barajar.
- Feedback para la correcta y para cada distractor; enlace al epígrafe que ayuda a corregir la idea.
- Modo práctica sin tiempo y con explicaciones; reto de diez preguntas con tiempo opcional; simulacro con feedback al finalizar.
- Mantén la posibilidad de repetir errores con otra variante sin reiniciar todo el tema.
- No penalices el uso de apoyos de accesibilidad. Separa resultado académico de puntuación lúdica.
- Revisa preguntas con hipótesis incompletas: por ejemplo, `f'(a)>0` en un único punto no basta para afirmar monotonía en todo un entorno sin condiciones adicionales. Reescribe el ítem T1.5 de forma precisa, por ejemplo con `f'(x)>0` en un intervalo.

## 8. Flashcards y repaso espaciado

Importa las 206 propuestas de la planificación y revisa los cinco mazos de la web anterior. Unifica tarjetas equivalentes conservando procedencia. Los mazos deben combinar definiciones, fórmulas, interpretación, procedimiento y errores frecuentes.

Flujo: leer pregunta → pensar → revelar → autoevaluar con **No lo sabía / Me costó / Bien / Muy fácil**. Añade tarjetas de aplicación breve con respuesta comprobable, diferenciando la autoevaluación subjetiva de la corrección automática.

Implementa y documenta un algoritmo sencillo de repetición espaciada como módulo preparado para la extensión de seguimiento. Puede partir de reaprendizaje durante la sesión, 1, 3 y 7 días y ajustar después los intervalos. En desarrollo prueba fecha próxima, historial mínimo y dificultad. En la versión pública inicial, `personalTracking=false`: ofrece repaso libre y repetición durante la sesión, sin guardar historial, fechas personales ni mostrar «pendientes de hoy». La activación futura habilitará el calendario y su persistencia.

Funciones públicas: filtrar por tema/subtema/tipo, buscar concepto, leer anverso y reverso por separado, mostrar fórmulas accesibles, usar botones o teclado y desactivar el giro animado. Favoritos y calendario personales quedan preparados y desactivados. Cambiar de idioma conserva el identificador y el estado de la sesión; en el futuro conservará también el calendario de repaso.

## 9. Laboratorios y juegos: catálogo completo

Implementa las **28 propuestas** del documento de laboratorios. Comparte motores cuando tenga sentido, pero conserva el objetivo y el tipo de interacción de cada actividad.

| Tema | Actividades previstas | Interacción que debe aportar aprendizaje |
|---|---|---|
| 1 | Límite Express; Continuidad: repara la función; Derivada Detective; Tangente Sprint | Acercamientos laterales, reparación de parámetros, detección de pasos erróneos y construcción de rectas |
| 2 | Construye la gráfica; Transforma la función; Optimiza | Relacionar datos con gráficas, traslaciones/escalados y decisiones con dominio admisible |
| 3 | Parejas de primitivas; Método correcto; Área por tramos | Recuperar la operación inversa, seleccionar estrategia y distinguir área de integral con signo |
| 4 | Matrix Ops; La cámara del determinante; Redes y adyacencia | Dimensiones, operaciones, propiedades y relación entre red y matriz |
| 5 | Clasificador de sistemas; Gauss paso a paso; Elige el método | Conjunto de soluciones, operaciones válidas y elección razonada |
| 6 | Pinta la región factible; Cazador de vértices; Fábrica de modelos | Semiplanos, restricciones, líneas de nivel y formulación desde contextos |
| 7 | Álgebra de sucesos; Árbol de probabilidad; Detective Bayes | Venn, ramas condicionadas, total y actualización de probabilidades |
| 8 | Binomial Factory; Normal Slider; Corrección de continuidad | Hipótesis del modelo, áreas/cuantiles y paso discreto-continuo |
| 9 | Diseña la muestra; Constructor de intervalos; Auditor de encuestas | Sesgo, cobertura repetida de intervalos, precisión y tamaño muestral |

Añade al apoyo de combinatoria un reto procedural que amplíe el juego existente y a estadística bidimensional un laboratorio de puntos manipulables que actualice covarianza, correlación y regresión. La variación de una gráfica debe mostrar qué cambia y qué se mantiene.

### Bucle común

Objetivo breve → situación → acción matemática → comprobar → feedback → explicación opcional → siguiente reto. Permite repetir una semilla, cambiar datos, reiniciar y abandonar. En modo público conserva puntuación y estado únicamente durante la sesión; el guardado de progreso entre sesiones se habilitará con la extensión futura. Los deslizadores tendrán entradas numéricas equivalentes y los arrastres, botones de selección y desplazamiento.

**Gamificación:** misiones de 3–10 minutos, mapa por destrezas e insignias de aprendizaje. El modo predeterminado no tendrá cuenta atrás. Cronómetro y sonidos serán opcionales. No uses clasificaciones públicas, pérdidas de progreso por ausencias ni recompensas que dependan de la velocidad de lectura. Una racha rota no borrará los logros.

Toma los umbrales de dominio de la planificación como hipótesis inicial de diseño, no como medición validada: 80 % global, 70 % por destreza y transferencia sin ayuda pueden orientar recomendaciones. Exige evidencia de varias familias y sesiones; muchas repeticiones casi iguales no prueban dominio.

## 10. Generación procedural fiable

### 10.1. Contrato del generador

La generación procedural es la creación de instancias nuevas de familias matemáticas válidas, no un simple cambio aleatorio de números. La generación y la corrección básica deben funcionar sin llamar a un modelo de lenguaje ni depender de una conexión.

Cada familia implementará:

```text
generate(seed, difficulty, locale) → instance
solve(instance) → expectedAnswer + steps
validateInstance(instance) → valid / diagnostics
grade(instance, response) → result + feedback
explain(instance, misconception) → explanation
```

La semilla controla solo los datos y las elecciones matemáticas. La traducción no cambia los parámetros ni la solución. Incluye `generatorVersion` para reproducir una pregunta después de actualizar el código.

Proceso obligatorio: elegir familia → generar solución o estructura controlada → construir datos → resolver independientemente → comprobar invariantes → producir distractores → comprobar unicidad → mostrar. Limita reintentos, por ejemplo a 50; si no se logra una instancia válida, utiliza un caso previamente validado e informa en el registro técnico. No muestres preguntas defectuosas.

### 10.2. Familias por tema y restricciones

| Tema | Familias mínimas de cálculo y razonamiento | Invariantes y casos límite |
|---|---|---|
| 1 | Sustitución; racional simplificable; laterales; parámetros de continuidad/derivabilidad; producto/cociente/cadena; tangente/normal | Denominadores y dominios; radicandos/logaritmos; límite distinto de valor puntual; tangente horizontal y normal vertical |
| 2 | Dominio; cortes; asíntotas; monotonía/extremos; transformaciones; optimización contextual | No unir ramas a través de discontinuidades; revisar extremos del intervalo; no aceptar producción negativa; comprobar signos de derivadas |
| 3 | Primitiva de polinomio; exponencial compuesta; patrón logarítmico; Barrow; área con cambio de signo; área entre curvas | Exponente −1 separado; constante de integración; ceros e intersecciones dentro del intervalo; integrandos definidos en el tramo |
| 4 | Dimensiones y operaciones; producto; determinante; inversa/rango; ecuación matricial; potencias/adyacencia | Compatibilidad dimensional; determinante no nulo cuando se pide inversa; orden de multiplicación; diferenciar caso singular deliberado |
| 5 | Triangular; SCD construido; SCI; SI; parámetros; modelización | Generar desde solución/rango conocido; operaciones por fila válidas; comprobar original por sustitución; no dividir por un parámetro sin separar su cero |
| 6 | Semiplanos; vértices; maximización; minimización; región vacía/no acotada; óptimos múltiples | Verificar todos los vértices candidatos; analizar direcciones no acotadas; distinguir continuo/entero y desigualdad estricta/no estricta |
| 7 | Operaciones; tablas; condicionada; extracción con/sin reposición; total; Bayes | Masas no negativas que sumen 1; denominador condicionante positivo; hipótesis de Laplace; independencia comprobada |
| 8 | Identificar binomial; masa/colas/intervalos; normal por intervalos; percentiles; parámetros inversos; aproximación | `n` entero, `0≤p≤1`, `σ>0`; tratar `p=0,1`; distinguir `<`/`≤`; comprobar condiciones y corrección de continuidad |
| 9 | Muestreo/afijación; media muestral; proporción muestral; IC media; IC proporción; error/tamaño/confianza | Distinguir `σ` y `σ²`; justificar exactitud/aproximación; éxitos enteros; error positivo; muestra mínima realmente suficiente |

Para los apoyos: genera conteos con `0≤r≤n` donde sea necesario, permutaciones repetidas con frecuencias que sumen `n`, y nubes de puntos con varianzas positivas cuando se calcule Pearson. `r=0` no implica ausencia de toda relación; no definir regresión de Y sobre X cuando la varianza de X sea cero.

### 10.3. Ejemplos concretos de generación

**A. Límite factorizable.** Escoge enteros `a`, `b`; construye `(x−a)(x+b)/(x−a)` y pregunta el límite en `a`. Solución `a+b`; dominio original excluye `a`. Si pides además `f(a)`, la respuesta es «no está definida». Evita distractores numéricos coincidentes.

**B. Cadena.** Escoge `a≠0`, `b` y entero `n≥2`; función `(ax+b)^n`; derivada `na(ax+b)^(n−1)`. Los distractores pueden omitir `a`, mantener exponente o confundir `na` con `n+a`; descarta parámetros que hagan equivalentes varias opciones.

**C. Área.** Usa `f(x)=k(x−r)` con `k>0` y `a<r<b`. Área `k[(r−a)²+(b−r)²]/2`; integral con signo `k[(b−r)²−(a−r)²]/2`. Comprueba el corte y explica por qué no se cancelan áreas geométricas.

**D. Sistema con solución conocida.** Elige vector entero `s`, matriz invertible `A` y calcula `b=As`. Conserva `s` como referencia, resuelve también por Gauss y comprueba ambas. Para SCI genera filas dependientes coherentes; para SI introduce una contradicción controlada.

**E. Bayes desde una tabla válida.** Genera cuatro conteos positivos `n11,n10,n01,n00`. Total `N`; `P(A|B)=n11/(n11+n01)`. Construye relato y árbol desde los mismos conteos. No redondees probabilidades de ramas antes de resolver.

**F. Tamaño muestral.** Dados `z*`, `σ` y tolerancia `E`, define `q=(z*σ/E)²`. Si se exige error «a lo sumo E», usa `ceil(q)` con tratamiento de precisión; si se exige «menor que E», usa el menor entero estrictamente mayor que `q`. Verifica el error para `n` y que `n−1` no satisfaga la condición. Para proporciones aplica el mismo criterio a `q=z*²p(1−p)/E²`.

### 10.4. Comprobación matemática

Usa aritmética racional para álgebra pequeña y cálculos numéricos estables para distribuciones. La suma de masas binomiales debe aproximarse a 1, la CDF ser monótona y los cuantiles invertir la CDF dentro de tolerancia. Muestra cuándo un resultado procede de tabla redondeada y cuándo de cálculo numérico.

Para cada familia, prueba al menos 1.000 semillas por nivel implementado y casos extremos diseñados. No basta con comprobar que el propio generador devuelve su propia solución: usa sustitución, identidades, cálculo independiente o valores de referencia. Conserva las semillas que fallan como pruebas de regresión.

## 11. Dirección visual y sistema de diseño

### 11.1. Concepto

Nombre de trabajo: **Matemáticas en contexto · CCSS II**. Apariencia de libro contemporáneo y laboratorio de datos: orden editorial, mucho espacio de lectura, diagramas precisos y color con función. Motivos propios de la materia: coordenadas, regiones, curvas, tablas, árboles y redes. Emplea ilustraciones solo cuando ayuden a entender.

Toma como inspiración la claridad editorial de la carpeta de probabilidad, los SVG y tarjetas de las otras unidades y los controles de las simulaciones. Unifica los estilos; evita que cada tema parezca una aplicación distinta.

### 11.2. Paleta propuesta

| Uso | Color inicial | Aplicación |
|---|---|---|
| Fondo | `#F7F8FC` | Superficie de página |
| Papel | `#FFFFFF` | Lectura y paneles |
| Texto principal | `#172033` | Párrafos, fórmulas y títulos |
| Texto secundario | `#475569` | Ayudas y metadatos |
| Acción principal | `#1D4ED8` | Botones y enlaces |
| Análisis | `#1D4ED8` | Acento de los temas 1–3 |
| Álgebra y decisiones | `#6D28D9` | Acento de los temas 4–6 |
| Azar y datos | `#047857` | Acento de los temas 7–9 |
| Atención | `#92400E` sobre `#FEF3C7` | Advertencias didácticas |
| Error | `#B91C1C` sobre `#FEF2F2` | Mensajes de revisión |

Son valores de partida: mide el contraste de cada combinación real, incluidos estados hover, focus y disabled pertinentes. Los bloques se distinguen también por título, número e icono, nunca solo por color.

Tipografía: una familia sans legible para controles y texto, aprovechando Plus Jakarta Sans si conviene; títulos con Outfit o una única alternativa editorial. Máximo dos familias y pocos pesos, con fuentes de sistema como respaldo. Fórmulas con el motor matemático. Evita textos largos en mayúsculas, cuerpo pequeño y anchos de línea excesivos.

Medidas iniciales: cuerpo `1.125rem`, interlineado `1.65`, lectura de 65–75 caracteres por línea, escala de espaciado 4/8/12/16/24/32/48, radios de 12–16 px y bordes sutiles. Limita sombras y fondos cuadriculados al laboratorio; el libro debe tener fondo limpio.

### 11.3. Composición de las pantallas

**Inicio:** portada abierta de la materia, explicación breve, acciones «Explorar temas», «Jugar» y «Ver recursos» y solo los bloques con contenido visible. Prioriza lo que el docente haya destacado. La portada da acceso a una web educativa completa, aunque tenga la sencillez de entrada de una landing page. Las tarjetas «Continuar» entre sesiones y «Repaso pendiente» aparecerán solo al activar seguimiento personal.

**Lección:** cabecera con migas, objetivo e índice lateral; texto central; figura junto a su explicación cuando haya espacio; controles de lectura accesibles y panel de apoyos plegable. En móvil, coloca figura y explicación en el orden de lectura. Un indicador de posición en la página puede funcionar sin perfil; el progreso académico persistente queda desactivado.

**Práctica:** una pregunta principal por pantalla, datos legibles, área de trabajo, campo de respuesta y botón «Comprobar». Feedback debajo sin mover bruscamente el contenido ni enviar el foco al inicio.

**Laboratorio:** controles agrupados, gráfica amplia, valores actuales y una pregunta para dirigir la exploración. Anima únicamente relaciones matemáticas; respeta movimiento reducido.

**Progreso, extensión desactivada:** destrezas concretas, evidencia reciente y próximos pasos. Construye el componente y compruébalo con datos ficticios claramente identificados solo en desarrollo. No publiques ese panel ni sus rutas mientras esté desactivado. Evita medir capacidad o inteligencia.

Componentes compartidos: tarjeta de objetivo, definición, fórmula comentada, ejemplo por pasos, aviso de error frecuente, pregunta, controles de gráfica, leyenda accesible, pista, solución, resumen y referencia de fuente.

## 12. Accesibilidad, idiomas y lectura con Google

### 12.1. Funciones propias de la web

Objetivo de diseño y evaluación: **WCAG 2.2 nivel AA**. Usa HTML semántico, navegación completa por teclado, foco visible que no quede tapado, etiquetas de formulario, mensajes de estado y alternativas al arrastre. Verifica texto ampliado al 200 % y adaptación a 320 píxeles CSS; las representaciones bidimensionales pueden tener desplazamiento localizado y alternativa textual. Contraste mínimo 4,5:1 para texto normal y 3:1 para texto grande; verifica también controles y elementos gráficos relevantes. Como elección de diseño, procura controles de al menos 44×44 píxeles CSS. [Referencia: WCAG 2.2](https://www.w3.org/TR/WCAG22/).

Panel permanente, accesible desde cualquier sección:

- Texto: 100, 125, 150, 175 y 200 %, sin impedir el zoom del navegador.
- Contraste: estándar y alto contraste; comprobar además colores forzados del sistema.
- Espaciado: opciones cómodas de interlineado y separación sin alturas fijas que recorten texto.
- Resaltar lo importante: activar marcas semánticas para definiciones, hipótesis, pasos clave y conclusiones. El contenido completo sigue disponible.
- Modo de concentración: reducir decoración y paneles secundarios; mantener navegación, ayudas y progreso.
- Movimiento reducido, sonidos desactivados por defecto y temporizadores ajustables o desactivables.
- Restaurar ajustes; guardar preferencias localmente con manejo del almacenamiento no disponible.

La accesibilidad no se resuelve instalando una barra. Cada control, gráfica, actividad, fórmula y estado debe poder utilizarse con las opciones anteriores.

### 12.2. Decisión sobre «nativo de Google»

Implementa una estrategia explícita de dos niveles, sin confundir funciones del navegador con funciones de la página:

| Necesidad | Vía de Google | Condiciones y alcance |
|---|---|---|
| Traducir mediante el navegador | Traducción integrada de Google Chrome | La activa el usuario desde Chrome; el sitio ofrece instrucciones y contenido traducible |
| Escuchar mediante el navegador | Modo Lectura y lectura en voz alta de Chrome | Su disponibilidad depende de página, plataforma y navegador; es especialmente apropiado para el libro |
| Selector de idioma integrado en la web | Google Cloud Translation | Requiere proyecto, API habilitada, autenticación y condiciones de facturación; llamadas desde servidor |
| Voz Google controlada desde la web | Google Cloud Text-to-Speech | Requiere configuración de Cloud; genera audio y permite controles propios |
| Botón de lectura sin configurar Cloud | Web Speech API, priorizando voz Google si existe en el dispositivo | Es una API web, no un servicio exclusivamente de Google; no garantiza voz Google en todos los equipos |

Chrome documenta traducción de páginas y lectura en voz alta, pero su modo de lectura no funciona igual con todos los sitios y formatos, incluidos cuestionarios. Ofrece estas vías como ayudas del navegador y verifica la lectura del libro. No construyas un botón que afirme abrir el menú nativo de Chrome desde JavaScript sin una capacidad pública comprobada. [Traducción en Chrome](https://support.google.com/chrome/answer/173424?hl=es), [Modo Lectura de Chrome](https://support.google.com/chrome/answer/14218344?co=GENIE.Platform%3DDesktop&hl=es).

**Objetivo de integración:** dejar preparada y probada la arquitectura para Translation y Text-to-Speech de Google Cloud cuando exista la configuración necesaria. La base de estudio y práctica funciona sin Cloud. Si no hay credenciales, entrega las ayudas de Chrome, la lectura disponible en el dispositivo y la configuración documentada, marcando la integración de Cloud como pendiente y sin simularla. No consideres cumplida la garantía de voz Google integrada hasta comprobarla con el servicio real.

En el despliegue inicial en GitHub Pages, las llamadas a servicios Cloud con credenciales de servidor quedan desactivadas. La carpeta `server/` es una ampliación para alojar fuera de Pages; subirla al repositorio no la pone en ejecución. Sigue ofreciendo las ayudas nativas de Chrome y la síntesis disponible en el dispositivo. Si más adelante se preparan traducciones o audios de Google durante la construcción, podrán distribuirse como archivos estáticos ya revisados, sin exponer credenciales ni requerir cuentas del alumnado.

No uses un endpoint de traducción no documentado ni incrustes claves en HTML o JavaScript público. Google indica condiciones de elegibilidad para su acceso al widget de traducción de sitios; no supongas que su widget heredado es universal ni que estará disponible. [Traducir sitios y elegibilidad del widget](https://support.google.com/translate/answer/2534559?hl=es).

Cloud Translation necesita configuración y autenticación. Cloud Text-to-Speech requiere habilitar la API y facturación; la existencia de cuotas gratuitas no equivale a uso gratuito ilimitado. Implementa límites de petición y caché de contenido; no actives contratación o gasto sin la configuración y autorización correspondientes. [Configuración de Translation](https://docs.cloud.google.com/translate/docs/setup), [Inicio de Text-to-Speech](https://docs.cloud.google.com/text-to-speech/docs/get-started).

### 12.3. Internacionalización de contenido matemático

Español como original y estructura preparada, inicialmente, para inglés, francés, árabe y rumano; permite ampliar el catálogo según necesidades reales. Estos idiomas son una propuesta de producto, no una inferencia sobre el alumnado.

- Separa cadenas de interfaz, enunciados, pistas, soluciones, glosario y versiones habladas.
- Actualiza `lang` y `dir`; usa propiedades CSS lógicas para idiomas de derecha a izquierda.
- Mantén expresiones matemáticas en dirección izquierda a derecha y protege fórmulas, variables, identificadores y código frente a traducción automática, por ejemplo con `translate="no"` en sus contenedores.
- Traduce plantillas de enunciados preservando marcadores tipados; inserta los números después. Comprueba que ningún marcador se pierda o cambie de nombre.
- La traducción no debe modificar la respuesta ni provocar que dos opciones se vuelvan indistinguibles. Revisa el glosario: «media», «rango», «suceso», «muestra», «normal», «significación» y «pendiente» tienen significados técnicos.
- Muestra idioma elegido, posibilidad de volver al original y estado de la traducción. Marca contenido traducido automáticamente cuando no tenga revisión editorial.
- No envíes respuestas, identidad, progreso ni datos privados del estudiante a servicios de traducción. Envía solo contenido educativo necesario.
- Versiona y almacena en caché las traducciones por contenido, idioma y versión; el contenido nuevo invalida la traducción anterior.

### 12.4. Lectura en voz alta y matemáticas

Ofrece **Leer sección / Pausar / Continuar / Detener**, selector de voz disponible y velocidad. Lee el contenido activo, sin menús, duplicados de fórmulas, respuestas ocultas ni tarjetas aún sin revelar. Detén el audio al cambiar de pregunta o al iniciar otra lectura.

Para Web Speech API utiliza detección de capacidad, `getVoices()` y `voiceschanged`; elige una voz compatible con el idioma y ofrece respaldo explícito. La API permite voces locales y remotas y no fija su proveedor. [Especificación de Web Speech API](https://webaudio.github.io/web-speech-api/#tts-section).

Cada fórmula importante tendrá una versión verbal revisada. Ejemplo: `P(A|B)` → «probabilidad de A dado B»; `σ/√n` → «sigma dividido entre la raíz cuadrada de ene». No leas LaTeX crudo ni elimines símbolos esenciales. Incluye lectura de matrices por filas y descripción de intervalos, ejes y áreas.

Divide el contenido en frases o bloques, resalta el bloque leído y conserva el foco del teclado. No prometas sincronización exacta por palabra si la voz no emite eventos fiables. Para audio de Cloud permite avance por bloques y usa las marcas temporales solo cuando estén disponibles y verificadas.

Configura un motor matemático con salida accesible y exploración por lector de pantalla; MathJax es una opción coherente con las fuentes existentes. Comprueba la versión elegida y evita lecturas duplicadas entre representación visual y accesible. [Accesibilidad en MathJax](https://docs.mathjax.org/en/latest/basic/accessibility.html).

## 13. Atención a la diversidad y enseñanza adaptativa

Diseña apoyos que el alumno pueda elegir sin etiquetarlo con diagnósticos:

- **Necesito una explicación más guiada:** menor carga por pantalla, vocabulario anticipado, pasos intermedios y ejemplos adicionales.
- **Quiero practicar:** secuencias breves, feedback inmediato y variación gradual.
- **Quiero profundizar:** conexiones entre temas, parámetros, contraejemplos y problemas abiertos estructurados.
- **Quiero escuchar o traducir:** conservar fórmulas y nivel matemático con apoyo oral y lingüístico.
- **Quiero menos estímulos:** sin animación ornamental, sin tiempo y una tarea visible.

Ofrece tabla, texto y gráfica cuando permitan comprender la misma idea. Las ayudas deben reducir barreras de lectura y operación sin alterar inadvertidamente el objetivo matemático. No bajes el nivel de toda la materia por activar accesibilidad.

Durante una sesión pública puedes proponer ayuda usando sus respuestas temporales, sin crear un perfil persistente. La adaptación longitudinal queda preparada y desactivada: se basará en aciertos, intentos, pistas y diversidad de tareas. Explica cada recomendación y no uses tiempo de respuesta como medida de competencia ni infieras diagnósticos.

## 14. Exámenes en PDF, biblioteca de recursos, competencias y seguimiento

### 14.1. Revisión y compilación de los originales LaTeX

Esta es una tarea obligatoria de la futura construcción, no una conversión automática sin revisión. Recorre los 30 ZIP y crea `docs/catalogo-latex-pdf.md` con archivo/entrada original, identificador del examen, variantes, solución correspondiente, revisión, motor de compilación, incidencias y PDF resultantes.

Para cada examen o colección independiente:

1. Extrae sus fuentes y recursos a un espacio de trabajo independiente. Conserva intacto el original; aplica correcciones en una copia derivada y registra el cambio.
2. Revisa enunciados, cantidades, unidades, puntuaciones, optatividad, notación y condiciones de los teoremas. Comprueba que la suma de puntos y el tiempo correspondan a ese documento.
3. Resuelve o verifica **todos los ejercicios y apartados**. Comprueba resultados por sustitución, derivación, cálculo independiente o criterio matemático apropiado. Atiende a las incidencias M01–M12 del inventario. Una compilación correcta no demuestra corrección matemática.
4. Empareja las soluciones con el enunciado exacto. Si faltan, elabóralas y márcalas como nuevas; si son incorrectas, corrígelas justificadamente. Si el enunciado es ambiguo o insuficiente, registra y resuelve la adaptación antes de publicarlo. No inventes una solución para un problema indeterminado sin decirlo.
5. Normaliza una fuente de contenido por examen y genera dos vistas: `examen.pdf` y `soluciones.pdf`. El primero contiene instrucciones y enunciados sin respuestas ni pistas añadidas; el segundo repite el enunciado y desarrolla cada apartado con comprobación e interpretación. Conserva las pistas que formen parte del enunciado original e identifica cualquier adaptación.
6. Si la fuente usa la clase `exam` y entornos `solution`, controla su inclusión con opciones de compilación. Si usa texto corrido, secciones, soluciones mezcladas o repeticiones, refactoriza a bloques compartidos con inclusión condicional. No elimines soluciones mediante una expresión regular indiscriminada ni las escondas con texto blanco en el PDF.
7. Compila con una distribución LaTeX y motor compatibles con paquetes, fuentes y gráficos del documento, mediante un proceso reproducible, por ejemplo `latexmk`. Incluye TikZ/PGFPlots, imágenes y comandos como `\sen` cuando existan. Fija el entorno y documenta los paquetes; evita depender de rutas absolutas del equipo del autor.
8. Examina los registros y resuelve errores, caracteres ausentes, referencias sin resolver, desbordamientos y gráficos cortados. Compila las pasadas necesarias hasta estabilizar índices y referencias.
9. Renderiza **todas las páginas de ambos PDF** y revisa visualmente ecuaciones, tablas, dibujos, numeración, márgenes y saltos de página. Verifica que las gráficas sean coherentes con los cálculos y se impriman de forma comprensible también en escala de grises.
10. Extrae el texto de comprobación y confirma que el PDF de examen no contiene respuestas accidentales y que el solucionario cubre todos los apartados en el orden correcto. Comprueba apertura, número de páginas, texto seleccionable, metadatos e integridad de ambos archivos.

Usa A4, tipografía legible, espacio de respuesta cuando corresponda y cabeceras coherentes de materia/título/variante. El solucionario debe ser legible por sí solo. Mantén diferenciadas variantes con datos distintos y registra qué fuentes se han fusionado cuando sean duplicados reales. Toda pareja debe compartir `examId` y versión de contenido para evitar entregar una solución de otra variante.

Los PDF complementan la versión HTML accesible. Ofrece enlace al ejercicio o explicación equivalente cuando exista, y no prometas que el etiquetado accesible del PDF queda resuelto por compilarlo. Los botones propios de traducción/voz trabajan sobre la versión HTML; no garantices control de esas funciones dentro del visor PDF nativo del navegador.

La compilación se ejecuta en desarrollo o en un proceso de construcción, **no en GitHub Pages ni en el navegador del estudiante**. Conserva una salida editorial revisada y despliega todos los pares de PDF finalizados. El administrador decide desde el panel qué documentos y soluciones aparecen en la biblioteca, sin retirarlos del alojamiento.

### 14.2. Biblioteca pública «Recursos»

Implementa una sección con tarjetas o filas compactas, búsqueda y filtros combinables. Cada recurso contiene:

- Título claro, descripción breve, tema o temas, epígrafes y tipo: examen, soluciones, repaso, recuperación o ampliación.
- Identificadores `resourceId`, `examId`, variante y versión; relaciones `solutionOf` o `solutionsResourceId` cuando correspondan.
- Fuente local y estado de revisión en el catálogo editorial; en la web muestra solo metadatos adecuados para el alumno y procedencia que pueda consultar, sin enlaces `C:\...`.
- Etiquetas coherentes, dificultad y tiempo orientativo cuando se hayan determinado; número de páginas, tamaño y fecha de actualización de cada PDF.
- Estado de visibilidad independiente para enunciado y solucionario. Conserva todos los PDF en el alojamiento; muestra sus acciones en la biblioteca según la configuración central.
- Acciones **Ver examen / Descargar examen**, y **Ver soluciones / Descargar soluciones** únicamente cuando esas soluciones estén visibles.

Filtros: bloque, tema, tipo de documento, dificultad, variante y «con soluciones visibles». Permite limpiar filtros, muestra el número de coincidencias y un estado vacío útil. En móvil prioriza una lista legible; cada enlace debe indicar si abre un PDF o una pestaña nueva.

Previsualiza el PDF si el navegador lo permite y ofrece siempre apertura/descarga directa como alternativa. Conserva funciones nativas de impresión y zoom. Los recursos deben tener URL estable bajo la base del proyecto de GitHub Pages, texto de enlace accesible y nombres de archivo descriptivos, por ejemplo `t06-pl-examen-01-v1.pdf` y `t06-pl-soluciones-01-v1.pdf`.

La biblioteca para el alumnado muestra **solo los PDF que el administrador ha hecho visibles**. El panel lista todos los PDF incluidos en la web, con sus etiquetas y estados, para mostrarlos u ocultarlos en cualquier momento.

### Exámenes

Construye un archivo de ejercicios con filtros por tema, procedencia, dificultad, tiempo orientativo y existencia de solución revisada. Mantén emparejados enunciado y solución; permite imprimir y resolver sin revelar respuestas.

Los simulacros combinarán problemas de desarrollo, no solo test. Conserva las puntuaciones del original cuando se reproduzca un examen concreto y verifica la suma y la optatividad. En mezclas nuevas define una rúbrica propia y señala que son prácticas elaboradas a partir del material local. No los presentes como pruebas oficiales verificadas si no hay fuente oficial.

Para razonamientos abiertos, ofrece rúbrica de planteamiento, procedimiento, cálculo, comprobación y comunicación. La web puede corregir resultados y pasos estructurados; una autoevaluación guiada no equivale a una corrección docente de cualquier texto libre.

### Competencias

Usa `Página web existente/Competencias y criterios.txt` como mapa pedagógico local. Relaciona destrezas con actividades y evidencias: modelizar restricciones, justificar dominio, comprobar una solución, interpretar una encuesta, representar datos o detectar un argumento incorrecto. La lectura de una página no prueba una competencia.

Conserva los nueve grupos de competencias del material. Revisa su correspondencia normativa antes de etiquetarla como oficial para una comunidad y curso concretos. No inventes códigos oficiales para completar una tabla.

### 14.3. Modo público inicial y seguimiento futuro

**Ahora, para estudiantes:** acceso sin cuenta a los contenidos visibles. Sin registro, login del alumnado, cuenta invitada creada en un servicio externo, panel de estadísticas personales ni guardado del avance entre sesiones. El administrador sí tiene autenticación y configuración persistente, según el apartado 15. Los videojuegos y test muestran corrección y puntuación de la partida actual, en memoria; al recargar pueden reiniciarse. Conserva localmente solo las preferencias de accesibilidad e idioma.

**Preparado pero inactivo:** modelos de usuario, intentos, dominio de destrezas, progreso por epígrafe, estadísticas, mazos de repetición espaciada y panel del estudiante. Implementa interfaces, componentes y pruebas con adaptadores de desarrollo, sin conexiones reales, identificadores persistentes, solicitudes a servicios de cuentas ni pantallas de acceso visibles en producción.

**Ampliación futura:** autenticación, base de datos y autorización por usuario. Cada estudiante podrá consultar exclusivamente su historial y sincronizar entre dispositivos. Una vista docente requerirá permisos explícitos de acceso a los grupos correspondientes. Exportación/importación y borrado de historial se habilitarán con esta ampliación y se probarán antes de activarla.

Un posible modo intermedio sería progreso solo en el navegador, sin cuentas. Deja su adaptador preparado, pero **también desactivado por defecto**, respetando el encargo de no activar todavía el seguimiento. No lo presentes como sincronización ni como una cuenta individual segura en un ordenador compartido.

## 15. Arquitectura técnica propuesta

Elige **HTML semántico, CSS con variables y JavaScript modular**; puedes usar TypeScript en desarrollo y una herramienta ligera de compilación si mejora la mantenibilidad. La salida inicial será un frontend estático compatible con **GitHub Pages**, conectado a un servicio externo mínimo para autenticación administrativa y configuración de visibilidad. Prepara por separado las futuras cuentas y datos del alumnado y los servicios de traducción/voz de Google. Explica las dependencias elegidas y fija versiones mantenidas después de comprobar su documentación.

No impongas un archivo HTML gigante como formato principal. Conserva rutas legibles y contenido prerenderizado para que el texto del libro esté disponible antes de ejecutar JavaScript. Activa progresivamente gráficas y ejercicios. Las páginas deben poder enlazarse y recargarse directamente.


### 15.1. GitHub Pages y servicio mínimo de administración

GitHub Pages aloja HTML, CSS, JavaScript y PDF ya generados. No ejecuta un backend de la aplicación ni incluye por sí mismo una base de datos del curso. El frontend sí puede conectarse a un servicio externo. Mantén el alojamiento en Pages y usa ese servicio únicamente para autenticar al administrador y guardar la configuración global de visibilidad. [Descripción oficial de GitHub Pages](https://docs.github.com/en/pages/getting-started-with-github-pages/what-is-github-pages).

Opción de referencia: **Firebase Authentication + Cloud Firestore**, coherente con el uso de Google. Firebase Authentication gestiona el acceso administrativo; Firestore almacena la configuración pública de visibilidad y un historial administrativo. Las cuentas y estadísticas del alumnado continúan desactivadas. Mantén contratos que permitan sustituir al proveedor. [Firebase Authentication para web](https://firebase.google.com/docs/auth/web/start), [Reglas de seguridad de Firestore](https://firebase.google.com/docs/firestore/security/get-started).

**Permisos requeridos:**

| Operación | Visitante | Administrador autorizado |
|---|---|---|
| Leer contenido educativo y configuración pública de visibilidad | Sí, sin login | Sí |
| Abrir el cuadro de mandos operativo | No; solo pantalla de acceso | Sí |
| Cambiar visibilidad, orden, destacados o configuración | No | Sí |
| Consultar historial administrativo o restaurar una versión | No | Sí |
| Crear perfiles o guardar progreso de alumnos | Desactivado | Desactivado en esta versión |

Las reglas del servicio deben denegar por defecto las escrituras y permitirlas solo a la identidad administradora autorizada. Usa un UID permitido configurado fuera del cliente o un rol administrado de forma segura; no permitas que una persona se conceda el rol escribiendo su propio perfil. Un registro o un acceso con Google exitoso no convierte a nadie en administrador. No inventes email ni UID: documenta cómo asignar la cuenta real durante la configuración inicial.

El público solo necesita leer un documento/configuración sin datos personales del administrador. Separa el historial privado y sus datos de auditoría de la configuración pública. Valida el formato y las operaciones autorizadas también en reglas del servicio; los controles de la interfaz son una ayuda, no el mecanismo de seguridad. Prueba escritura anónima, usuario autenticado no administrador y administrador.

No incluyas credenciales de servidor ni claves de servicio en el repositorio público. Distingue la configuración pública que necesita el SDK de Firebase de las credenciales privilegiadas: la autorización depende de reglas correctas, no de ocultar el identificador del proyecto. Revisa dominios autorizados, cuotas y condiciones al conectar el proyecto. No contrates ni actives gasto por deducción.

### 15.2. Alumnado sin cuentas; seguimiento preparado y desactivado

El servicio administrativo no obliga a que los alumnos se registren. No crees usuarios anónimos en Firebase para visitantes, no envíes sus resultados y no actives colecciones de progreso. Las partidas mantienen estado temporal en memoria; las preferencias de accesibilidad/idioma y la caché pública de visibilidad pueden persistir sin perfil personal.

Implementa contratos diferenciados:

```text
AdminAuthProvider: currentAdmin(), signIn(), signOut(), onAuthChange()
VisibilityRepository: readPublicConfig(), subscribe(), save(config, expectedVersion)
AdminHistoryRepository: listVersions(), restore(version, expectedVersion)
StudentAuthProvider: currentUser(), signIn(), signOut()  # inactivo
ProgressRepository: getProgress(userId), recordAttempt(attempt), resetProgress(userId)  # inactivo
ReviewScheduler: schedule(card, review), getDueCards(userId, date)  # persistencia inactiva
PreferencesStore: get(), set(preferences), reset()
ContentRepository: getAllContent(), getVisibleContent(config), getVisibleResources(config)
```

Configuración de referencia para producción una vez conectado el servicio administrativo:

```json
{
  "mode": "public-learning-admin-managed",
  "adminAuth": {"enabled": true, "provider": "firebase"},
  "studentAuth": {"enabled": false, "provider": "none"},
  "personalTracking": false,
  "studentDashboard": false,
  "spacedRepetitionPersistence": false,
  "progressStorage": "none",
  "sessionState": "memory",
  "preferencesStorage": "local",
  "contentDeployment": "all-reviewed-content",
  "visibilitySource": "firestore",
  "visibilityFallback": "config/visibility-defaults.json",
  "googleCloud": {"translation": false, "textToSpeech": false}
}
```

No confundas `adminAuth` con `studentAuth`. El módulo de autenticación se carga al acceder a administración; los visitantes pueden leer la configuración pública sin autenticarse. Los módulos de cuentas y seguimiento del alumnado usan adaptadores nulos en producción: sin usuario, sin historial y sin escrituras. Sus componentes, modelos y pruebas permanecen preparados en desarrollo, sin paneles personales activos ni demostraciones ficticias en la web pública.

Modelos futuros: `User`, `Attempt`, `TopicProgress`, `SkillMastery`, `CardReview` y `UserPreferences`, con versión de esquema. Implementa el motor y componentes de seguimiento con adaptadores de pruebas. Activar seguimiento en el futuro requiere autenticación del estudiante, almacenamiento, reglas por usuario, migración y pruebas; cambiar una bandera no crea esos servicios ni autoriza datos de terceros. Un adaptador de progreso local puede prepararse como opción intermedia, también desactivado inicialmente.

### 15.3. Construcción y despliegue completo

Prepara un flujo de GitHub Actions para validar, compilar la web, comprobar enlaces y desplegar **todo el contenido revisado**, incluidos temas, juegos y PDF marcados como ocultos. Conserva la configuración central vigente al actualizar la web: no restablezcas la visibilidad con cada despliegue. Los nuevos identificadores se incorporan como ocultos hasta que el administrador los muestre, sin borrar decisiones sobre los existentes. [Workflows de GitHub Pages](https://docs.github.com/en/pages/getting-started-with-github-pages/using-custom-workflows-with-github-pages).

Mostrar/ocultar desde el panel no requiere Git, GitHub Actions ni recompilar. Estas herramientas se usan para cambios de contenido, código o PDF. Incluye una configuración estática inicial de respaldo; la versión central guardada prevalece cuando el servicio está disponible. Guarda versión y fecha de actualización y define un comportamiento claro ante servicio inaccesible: última configuración válida o respaldo, con estado informativo apropiado. No confundas la caché de configuración con progreso del alumnado.

La generación de PDF se ejecuta en desarrollo o en una tarea de construcción separada. La compilación automática produce candidatos; la revisión matemática y visual permite incorporarlos al catálogo final. Todos los pares revisados se despliegan, y su visibilidad la controla el panel. Un cambio en LaTeX o datos invalida la revisión de esa versión hasta volver a comprobarla.

Configura `basePath` para `https://<usuario>.github.io/<repositorio>/`, incluidas administración, autenticación, enlaces, scripts, PDF y service worker. Prefiere páginas prerenderizadas y una ruta administrativa con HTML real para que las recargas directas funcionen en Pages. Configura los dominios de acceso de Firebase para el alojamiento real sin inventarlos.

La lectura pública de la configuración debe actualizarse al navegar y, con conexión, mediante suscripción o sondeo acotado. La caché sin conexión respetará la última configuración conocida en la interfaz, pero no garantiza cambios inmediatos mientras no haya red. No presentes recursos estáticos ocultos como documentos privados ni como un sistema de exámenes con respuestas inaccesibles.

**Estructura propuesta, todavía por crear:**

```text
Web_Matematicas_CCSS_II/
  README.md
  package.json
  config/
    features.json           # Administración activa; cuentas/seguimiento del alumno inactivos
    visibility-defaults.json # Respaldo inicial; configuración central prevalece
  src/admin/                # Cuadro de mandos web; operaciones solo para administrador
  scripts/                  # Validación, compilación LaTeX y construcción pública
  editorial/
    latex/                  # Copias revisadas y bloques compartidos
    pdf/                    # Candidatos y revisión antes del despliegue de todos los finalizados
  src/
    pages/                  # Inicio, lecciones y secciones
    styles/                 # Diseño, accesibilidad e impresión
    components/             # Componentes compartidos
    content/
      course.json           # Índice y 86 epígrafes
      lessons/              # Desarrollo por tema
      examples/             # Ejercicios resueltos
      questions/            # Test y preguntas estructuradas
      flashcards/           # Mazos
      exams/                # Exámenes y rúbricas
      resources.json        # Catálogo editorial y relaciones examen/solución
      glossary/             # Términos y fórmulas
      locales/              # Interfaz y contenido traducido
      sources.json          # Procedencia y estado de revisión
    generators/             # Familias procedurales
    math/                   # Cálculo y validadores
    games/                  # Mecánicas y laboratorios
    accessibility/          # Preferencias y lectura
    services/               # Contratos/adaptadores de cuentas, progreso, voz y traducción
    features/student/       # Componentes futuros, fuera de producción inicial
  server/                   # Extensión futura externa a GitHub Pages; inactiva
  public/assets/            # Recursos locales optimizados
  public/resources/         # Todos los PDF revisados, visibles u ocultos
  firebase/                 # Reglas de acceso y pruebas de permisos administrativos
  tests/                    # Matemática, interacción y regresiones
  docs/
    cobertura.md
    incidencias-contenido.md
    diseno.md
    verificacion.md
    google-servicios.md
    catalogo-latex-pdf.md
    administracion-visibilidad.md
    arquitectura-cuentas.md
    estado-proyecto.md
  dist/                     # Salida generada
```

Esta organización es una guía. Adáptala al entorno elegido sin mezclar datos, lógica matemática y presentación. No modifiques las cuatro carpetas originales.

Las fuentes editoriales pueden conservarse separadas de los archivos servidos, pero todos los contenidos y PDF educativos finalizados deben estar incluidos en la web. Ocultarlos en los menús no oculta el repositorio ni protege sus URLs. Mantén fuera del frontend credenciales privilegiadas y datos privados de administración. Las rutas locales del inventario nunca se trasladan literalmente a URLs públicas.

### Modelo de datos orientativo

```json
{
  "id": "t07-bayes-001",
  "topicId": "t07",
  "sectionIds": ["7.10"],
  "difficulty": 2,
  "type": "numeric",
  "sourceRefs": [{"fileId": "F055", "locator": "id del ejercicio original"}],
  "origin": "adapted",
  "reviewStatus": "pending",
  "promptKey": "questions.t07-bayes-001.prompt",
  "spokenTextKey": "questions.t07-bayes-001.spoken",
  "generatorId": "bayes-table",
  "generatorVersion": "1",
  "answerPolicy": {"kind": "probability", "decimals": 4},
  "misconceptions": ["invertir-condicionada"],
  "hintKeys": ["hints.bayes-identifica-evidencia"]
}
```

Los ejemplos de identificadores no certifican que un ítem esté revisado. Usa estados `pending`, `verified` y `blocked` y evita publicar preguntas bloqueadas. No almacenes respuestas en etiquetas ocultas que los lectores de pantalla anuncien antes de tiempo.

### Requisitos de ejecución

- Carga las bibliotecas matemáticas de forma controlada; espera su inicialización antes de renderizar contenido dinámico.
- Evita que un fallo de GeoGebra o de una CDN interrumpa los ejercicios. Prioriza SVG propio y recursos esenciales empaquetados localmente.
- Los gráficos deben usar los mismos datos que las soluciones y no conectar puntos a través de discontinuidades.
- La búsqueda abarcará conceptos, temas, glosario y ejercicios; normaliza tildes para encontrar términos sin exigir escritura exacta.
- Si implementas uso sin conexión, define qué se almacena y ofrece una actualización versionada. Voz remota y traducción remota pueden necesitar conexión.
- Un `file://` local no sustituye la prueba bajo servidor HTTP/HTTPS. Documenta cómo iniciar una vista local y cómo generar la distribución.
- Reutiliza recursos gráficos pertinentes. Los logotipos de varios centros y las figuras de geometría repetidas en ZIP no determinan por sí solos la identidad de la nueva web.

## 16. Plan de trabajo por fases, con entregables comprobables

Avanza por fases acumulativas. La primera unidad funcional valida la arquitectura, pero no sustituye la entrega de todos los temas. No cierres el proyecto al terminar una demostración. Comprueba todo el curso incluido en el despliegue, la vista completa del administrador y la vista del alumno filtrada por configuración central. La ocultación temporal y la desactivación expresa de cuentas/seguimiento del alumno no son defectos pendientes; el panel administrativo y su guardado global sí son requisitos activos.

| Fase | Trabajo | Entregable y condición de salida |
|---|---|---|
| 0. Auditoría | Releer inventario, extraer datos, conciliar los 30 paquetes LaTeX e identificar variantes/incidencias | Matriz fuente → epígrafe → actividad y catálogo examen/solución; originales preservados |
| 1. Arquitectura y diseño | Frontend Pages, panel web, autenticación administrativa, configuración central y contratos futuros | Navegación pública, guardado global autorizado y visibilidad sincronizada |
| 2. Primera unidad completa | Tema 6 como piloto local por riqueza de fuentes; no determina el orden público del curso | Estudiar → practicar → revisar resultados de sesión; comprobar también un par de PDF; nunca quedarse aquí |
| 3. Análisis | Temas 1, 2 y 3, completando los huecos de la web antigua | Los 35 epígrafes de análisis desarrollados y actividades verificadas |
| 4. Álgebra | Temas 4 y 5 e integración con tema 6 | Los 28 epígrafes del bloque de álgebra y decisiones cubiertos en total |
| 5. Azar y datos | Temas 7, 8 y 9 y módulos de apoyo | Los 23 epígrafes del bloque y contenidos complementarios completos |
| 6. Consolidación | Bancos, 28 laboratorios, todos los pares PDF, recursos y búsqueda; seguimiento del alumno inactivo | Todo incluido en la web; panel controla la visibilidad sin redeploy |
| 7. Idiomas y voz | Verificación transversal, versiones habladas, traducciones e integración Google disponible | Flujos accesibles probados; estado real de cada integración documentado |
| 8. Calidad y entrega | Todas las páginas PDF, permisos del panel, persistencia central, rutas Pages y estados de visibilidad | Paquete completo para Pages y administración real verificada |

Accesibilidad, internacionalización y pruebas matemáticas comienzan en la fase 1 y se verifican en todas las fases; la fase 7 completa la comprobación transversal. Distribución orientativa del esfuerzo: auditoría 10 %, arquitectura/diseño 15 %, contenido e interacción 50 %, integración final y verificación 25 %. Ajusta tras medir la primera unidad, sin prometer fechas sin conocer recursos.

Después de cada fase actualiza `docs/estado-proyecto.md` con archivos creados, cobertura, pruebas, decisiones y siguiente tarea concreta. Así otra sesión puede continuar sin rehacer trabajo ni dar por terminados los apartados pendientes.

### Secuencia didáctica orientativa para el curso

Mantén el orden 1–9 del guion. Como propuesta flexible: primer tramo del curso centrado en temas 1–3; segundo, 4–6; tercero, 7–9. Añade desde el inicio repaso espaciado de prerrequisitos y sesiones acumulativas. Esta distribución no reproduce el reparto trimestral antiguo de la portada, que solo cubría parte del curso. Ajusta tiempos al calendario real y al criterio docente.

## 17. Pruebas y criterios de aceptación

### Contenido y matemáticas

- [ ] Los 86 epígrafes tienen desarrollo, ejemplo, actividad y referencias; no hay texto de relleno ni secciones «próximamente».
- [ ] Los nueve temas y los dos apoyos están completos e incluidos en la web; navegación y búsqueda del alumnado muestran solo lo habilitado desde el panel.
- [ ] Los 71 ejercicios de los bancos anteriores están adaptados, fusionados con justificación o retenidos por una incidencia documentada; ninguno desaparece sin trazabilidad.
- [ ] Hay al menos 12 problemas de desarrollo por tema y 60 ítems base de test por tema, además de los ejemplos por epígrafe.
- [ ] Las 206 propuestas de flashcards se han revisado e integrado sin perder conceptos.
- [ ] Las 28 actividades planificadas funcionan, además de la práctica de los dos apoyos.
- [ ] Todo ejercicio publicado tiene solución comprobada y cada familia procedural supera sus pruebas de semillas y casos límite.
- [ ] Las incidencias conocidas del inventario están resueltas en la versión adaptada; los originales siguen intactos.
- [ ] Dominio, parámetros, unidades, desigualdades, redondeo y notación normal son coherentes.
- [ ] Las pruebas matemáticas no se limitan a comparar el resultado del generador consigo mismo.

### PDF y biblioteca de recursos

- [ ] Los 30 ZIP están conciliados con el catálogo final; cada examen o colección independiente tiene PDF de enunciados y PDF de soluciones de la misma versión, salvo incidencia explícita que impida cerrar su preparación.
- [ ] Todas las soluciones y apartados se han comprobado; faltas y correcciones están documentadas en copias derivadas.
- [ ] Compilación reproducible sin errores y revisión visual de todas las páginas de ambos PDF completada.
- [ ] El PDF de examen no contiene respuestas accidentales; el de soluciones incluye desarrollo completo y enunciado correspondiente.
- [ ] Metadatos, etiquetas, variante, páginas, tamaño y enlaces de apertura/descarga coinciden con los PDF reales.
- [ ] Filtros y búsqueda de Recursos funcionan en móvil y escritorio y solo muestran documentos habilitados por el administrador, aunque todos estén incluidos en el alojamiento.
- [ ] Se puede mostrar un examen y ocultar sus soluciones; ambos PDF permanecen incluidos en la web y el panel los controla por separado.
- [ ] La construcción no marca como revisado un documento solo porque compile y no publica automáticamente candidatos modificados.

### Control editorial

- [ ] El administrador puede iniciar sesión, mostrar/ocultar, ordenar, previsualizar y guardar desde el cuadro de mandos web sin editar código.
- [ ] Guardar desde el panel persiste en el servicio central y se refleja en otro navegador/dispositivo sin reconstruir ni desplegar de nuevo Pages.
- [ ] Ocultar un tema oculta efectivamente a sus hijos; mostrarlo restaura sus estados individuales. Examen y solución respetan dependencias.
- [ ] Todos los contenidos revisados, incluidos los ocultos, están en el artefacto desplegado. Menús, búsqueda, relacionados y selección de actividades aplican la configuración central.
- [ ] Las rutas de la aplicación reflejan «contenido no visible» cuando corresponda. Se documenta que la descarga directa de archivos estáticos puede seguir funcionando.
- [ ] Visitantes y usuarios autenticados sin permiso no pueden guardar configuración ni leer historial administrativo; el servicio rechaza sus solicitudes aunque alteren el frontend.
- [ ] Cerrar sesión retira funciones administrativas; fallos de red y conflictos de versión no producen un falso «guardado»; historial/restauración funcionan.

### Interacción y persistencia

- [ ] Funcionan todos los botones, filtros, formularios, pistas, reinicios y cambios de tema.
- [ ] Barajar opciones no altera la respuesta correcta; no hay dobles respuestas equivalentes.
- [ ] Responder dos veces no duplica puntuación; las soluciones ocultas no se anuncian anticipadamente.
- [ ] Volver atrás y cambiar de idioma no alteran respuestas durante la sesión; recargar sigue la política documentada de reinicio de partida y conserva únicamente preferencias.
- [ ] Se maneja almacenamiento de preferencias bloqueado, configuración inválida, ausencia de red y servicio de visibilidad no disponible, sin bloquear el estudio con la última configuración válida.
- [ ] Los simulacros de desarrollo distinguen autocorrección, rúbrica y autoevaluación.
- [ ] `adminAuth.enabled=true` permite solo administración autorizada; `studentAuth.enabled=false`, `personalTracking=false` y `studentDashboard=false` mantienen inactivo el seguimiento del alumnado.
- [ ] No se guardan resultados, identificadores de alumno ni calendarios personales. La persistencia central se limita a visibilidad/configuración y auditoría administrativa.
- [ ] Los contratos y componentes de progreso y repetición espaciada se prueban con adaptadores de desarrollo; la persistencia local y la conexión externa permanecen inactivas.

### Accesibilidad y diseño

- [ ] Recorrido completo con teclado y lector de pantalla; foco lógico, visible y sin trampas.
- [ ] Revisiones automáticas de accesibilidad acompañadas de comprobación manual; no afirmar certificación AA solo por una puntuación de herramienta.
- [ ] Pruebas a 360/768/1366 px y reflujo a 320 px CSS; texto al 200 % y zoom al 400 % con contenido utilizable.
- [ ] Contraste medido, colores forzados, movimiento reducido, temporizadores y alternativas al arrastre comprobados.
- [ ] Fórmulas, tablas, matrices y gráficas tienen alternativa accesible y lectura comprensible.
- [ ] Idiomas largos y escritura RTL no rompen navegación, respuestas ni fórmulas.
- [ ] Voz inicia por acción del usuario, se pausa/detiene y no lee respuestas ocultas.
- [ ] Se ha probado por separado Chrome nativo, Web Speech y servicios Cloud realmente configurados; el informe no mezcla sus capacidades.
- [ ] Capturas representativas en escritorio y móvil de los nueve temas, los apoyos y los estados de error/resultados revisadas visualmente.

### Entrega técnica

- [ ] Construcción reproducible y sitio navegable bajo servidor local; sin errores de consola propios del proyecto en los recorridos probados.
- [ ] Dependencias y servicios documentados; ninguna clave secreta en la distribución pública.
- [ ] Enlaces internos y rutas de recursos comprobados.
- [ ] Web y PDF comprobados bajo la subruta de repositorio de GitHub Pages, incluidas recargas directas; ningún backend se presupone activo en Pages.
- [ ] Contenido esencial disponible sin servicios de traducción, voz remota o gráficas externas.
- [ ] README comprensible con inicio, PDF, uso del panel, alta del administrador, reglas y pruebas de permisos, visibilidad y arquitectura futura del alumnado.
- [ ] Informe final distingue lo realizado, lo probado y cualquier integración externa que siga pendiente.

## 18. Reglas de calidad que no debes sacrificar

1. No entregar solo una portada o una maqueta.
2. No convertir los temas completos en párrafos mínimos con enlaces a documentos.
3. No copiar errores de soluciones, títulos o numeración heredada.
4. No sustituir todos los laboratorios por el mismo test con distinto color.
5. No llamar «procedural» a un banco fijo que solo baraja preguntas.
6. No dar por corregida una demostración libre con un comparador de palabras.
7. No bloquear la lectura si falla un script externo.
8. No activar efectos, tiempo o audio por defecto que dificulten estudiar.
9. No simular una traducción, una voz de Google o un progreso que no existen.
10. No declarar que todo está terminado mientras haya epígrafes, PDF o pruebas esenciales sin completar. Diferencia esas carencias de las funciones personales expresamente desactivadas y de los contenidos terminados retenidos por decisión editorial.

## 19. Qué debes entregar al finalizar la construcción

Entrega la carpeta del proyecto, la distribución estática para GitHub Pages, las copias LaTeX revisadas, todos los pares de PDF verificados, el catálogo completo, el cuadro de mandos web y la integración central de visibilidad, instrucciones de apertura, matriz de cobertura, informe de incidencias corregidas, registro de pruebas y guía de arquitectura futura. Incluye todos los contenidos revisados en el artefacto de Pages y documenta sus estados de visibilidad. Indica cómo editar una lección, mostrar u ocultar un tema, hacer visible un solucionario, añadir una familia procedural y revisar una traducción.

La primera versión pública se acepta con cuentas del alumnado, estadísticas personales, persistencia del progreso y almacenamiento de datos de estudiantes **desactivados por decisión del encargo**, siempre que su arquitectura esté preparada y probada en desarrollo. No actives estas funciones ni añadas pantallas de acceso para estudiantes por considerar que harían el producto más completo. El acceso y el guardado global del administrador sí deben funcionar con el servicio configurado. Cualquier visitante debe poder usar el contenido y los juegos publicados sin una cuenta.

Presenta un resumen breve con acceso al resultado y una relación honesta de capacidades comprobadas. Si falta un servicio externo, identifica exactamente qué funcionalidad depende de él y qué alternativa funciona. No publiques ni contrates servicios de pago por deducción: deja el resultado local completo y la integración preparada según el entorno autorizado.

**Empieza leyendo el inventario complementario y los cuatro Markdown originales. Después construye y verifica el producto siguiendo este encargo hasta cubrir el alcance completo.**

# FIN DEL PROMPT DE CONSTRUCCIÓN

---

## Nota de alcance de esta preparación

Este prompt se basa en el inventario de todos los archivos originales, la inspección de sus estructuras y contenidos, los datos de los bancos, las entradas de los 30 ZIP, una revisión visual de la vista inicial de las 44 páginas HTML y de las 13 imágenes únicas de los paquetes. La revisión detectó incidencias concretas, pero no equivale a una auditoría matemática exhaustiva de todas las soluciones ni a una prueba funcional de cada actividad. Por eso la validación de contenido es una fase obligatoria de la futura construcción.

La ampliación del encargo incorpora la revisión exhaustiva y compilación de exámenes/soluciones, la biblioteca etiquetada, el cuadro de mandos administrativo con control central de visibilidad de todo el contenido incluido y el modo público sin cuentas de alumnos en GitHub Pages. **Esta actualización modifica la especificación; no afirma que los PDF se hayan compilado ni que la web o sus servicios estén desplegados.**

Las referencias técnicas de Google, accesibilidad y lectura se consultaron al preparar el documento. Deben volver a comprobarse al implementar si cambian las capacidades, versiones o condiciones de los servicios.

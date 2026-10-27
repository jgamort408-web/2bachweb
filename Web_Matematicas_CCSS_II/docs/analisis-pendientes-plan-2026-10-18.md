# Análisis de lo pendiente para cumplir el plan del libro interactivo

Fecha: 18 de octubre de 2026. Estado de contenidos: hasta la entrega 155. Este análisis constituye la entrega documental 156.

Este documento conserva el diagnóstico de partida. La [tanda T01, entrega 157](verificacion-entrega-157.md), resuelve los 50 fallos registrados, la discrepancia de cuatro alternativas y las incidencias de trazabilidad indicadas. Para el estado vigente y las tareas siguientes, consultar [estado del proyecto](estado-proyecto.md) y [plan por tandas](PLAN_CIERRE_POR_TANDAS.md).

## 1. Diagnóstico

El proyecto tiene una base amplia de contenido e interacción, pero todavía no cumple el producto completo que se definió. La siguiente etapa debe centrarse en el cierre editorial y las funciones transversales: administración de visibilidad, exámenes y PDF, búsqueda, herramientas, idiomas y voz.

El catálogo registra **86 lecciones: 58 revisadas y 28 parciales**. Hay **398 preguntas base, 405 tarjetas y 19 de los 28 juegos previstos**. Las 86 rutas de lección tienen contenido; una lección parcial puede conservar carencias relevantes y no equivale a una lección terminada.

El 67,4 % de lecciones con estado editorial revisado y el 67,9 % de juegos revisados solo describen esas dos dimensiones. **No representan el porcentaje de terminación del proyecto**: administración, biblioteca PDF y voz, por ejemplo, tienen mucho trabajo pendiente y no se miden contando lecciones.

Hay una condición que debe mantenerse durante todo el cierre: la instrucción del usuario del 7 de octubre prevalece sobre las cuotas del prompt. En programación lineal, estadística bidimensional, distribuciones e inferencia se reutiliza el material original; lo ausente se deja señalado. Sus cifras de preguntas, ejercicios o juegos no autorizan a generar contenido nuevo para alcanzar mínimos.

## 2. Estado comprobado por bloque

Los estados proceden de los catálogos reales, y los inventarios de problemas, de las auditorías de cada tema. Los problemas incluyen en algunos casos bloques con varios apartados; no se pueden sumar como un catálogo global de ejercicios únicos.

| Bloque | Lecciones revisadas / parciales | Preguntas base | Tarjetas | Juegos revisados / previstos | Problemas o bloques inventariados |
|---|---:|---:|---:|---:|---:|
| 1. Límites y derivadas | 18 / 0 | 60 | 61 | 4 / 4 | 15 |
| 2. Representación de funciones | 9 / 0 | 60 | 54 | 3 / 3 | 21 |
| 3. Integrales | 8 / 0 | 60 | 48 | 3 / 3 | 20 |
| 4. Matrices y determinantes | 12 / 0 | 72 | 72 | 3 / 3 | 20 |
| 5. Sistemas de ecuaciones | 11 / 0 | 66 | 66 | 3 / 3 | 16 |
| 6. Programación lineal | 0 / 5 | 0 | 19 | 0 / 3 | 6 originales |
| 7. Probabilidad | 0 / 10 | 60 | 16 | 3 / 3 | 12: ocho originales y cuatro ampliaciones |
| 8. Distribuciones | 0 / 4 | 0 | 19 | 0 / 3 | 21 originales |
| 9. Inferencia | 0 / 9 | 20 | 30 | 0 / 3 | 27 originales |
| Apoyo bidimensional | Apoyo parcial | 0 | 20 | Sin widget independiente | 9 originales |
| Apoyo de combinatoria | Esqueleto | 0 | 0 | Juego original sin migrar | Pendiente |

Los temas 1–5 tienen sus epígrafes y juegos desarrollados y cumplen los mínimos numéricos de preguntas y problemas. Su cierre global sigue abierto por revisión transversal, accesibilidad y materiales asociados.

Probabilidad ya recibió una pasada editorial en sus diez lecciones y una auditoría automatizada del conjunto. Conserva estado parcial por la revisión detallada de fuentes, preguntas, problemas y lectura matemática manual. Esto debe distinguirse de tener diez lecciones vacías.

Los **33 HTML originales de los cuatro bloques sujetos al criterio de reutilización** están integrados según sus auditorías: siete de programación lineal, ocho bidimensionales, siete de distribuciones y once de inferencia. Esa integración no elimina las carencias de las fuentes. Los cinco bancos originales de ejercicios suman **71 registros**, con correspondencia documentada: 6 + 9 + 8 + 21 + 27. Falta una comprobación final de conservación y calidad, pero no se parte de cero.

## 3. Qué está ya preparado

- Estructura común, cabecera y pie en archivos independientes, rutas para raíz y subcarpeta, y catálogo de 144 páginas registradas más 28 entradas de widgets.
- Motor local de MathJax con carga única, cola, reintentos limitados y recuperación sin perder respuestas. Hay pruebas de carga y fallos; falta evaluación transversal del curso y del alojamiento real.
- Práctica y test con pistas, segundo intento, explicación y resumen temporal de sesión.
- Visor de tarjetas con selección por tema y categorías en los mazos que las proporcionan.
- Diecinueve juegos independientes e insertables, además de exploradores y laboratorios dentro de las lecciones.
- Controles de tamaño, contraste y resaltado, con preferencias locales y alternativa si el almacenamiento está bloqueado.
- Historial de procedencia, incidencias, auditorías y verificaciones por entrega.
- Resultados del alumnado en memoria, sin cuentas ni historial persistente, conforme al modo público acordado.

## 4. Pendientes activos del producto

### 4.1. Administración y visibilidad: requisito central todavía sin implementar

[admin/index.html](../admin/index.html) contiene únicamente el título. El estado editorial de [config/editorial.json](../config/editorial.json) determina qué se ha redactado; no es un sistema de visibilidad administrable.

Falta:

1. Un modelo de visibilidad por sección, tema, lección, pregunta, mazo, juego, examen y solución, con IDs estables, herencia y dependencias.
2. Aplicarlo a portada, menús, índices, búsqueda, relacionados, selecciones de preguntas, tarjetas, juegos y recursos; también al acceso normal a rutas ocultas.
3. Autenticación exclusiva del administrador y autorización real de escrituras en el servicio central.
4. Panel con vista previa del alumnado, cambios pendientes, guardado confirmado, conflictos de versión, historial y restauración.
5. Configuración inicial de respaldo, manejo de red fallida y sincronización comprobada en dos navegadores.

La arquitectura local, los contratos y la validación pueden construirse antes de conectar un proveedor. El cierre del requisito exige probar el servicio real. GitHub Pages, el alojamiento previsto en la especificación, no sustituye ese almacenamiento administrativo.

Los archivos educativos deben seguir incluidos aunque estén ocultos. La ocultación organiza lo que se presenta; la descarga directa de un archivo estático sigue siendo una limitación que habrá que explicar.

### 4.2. Exámenes LaTeX, PDF y biblioteca: una fase completa pendiente

Hay **30 ZIP de fuentes**, y el plan no tiene ningún paquete cerrado. En la carpeta web no hay archivos TEX ni PDF finales. [recursos/index.html](../recursos/index.html) y [examenes/index.html](../examenes/index.html) son esqueletos.

Debe realizarse, por paquete y documento independiente:

- Extraer a una carpeta propia y conciliar variantes, duplicados, enunciados y soluciones.
- Verificar todos los apartados matemáticos y corregir copias derivadas, conservando los originales.
- Crear una fuente coherente que produzca examen y solucionario de la misma versión.
- Compilar, resolver incidencias y revisar visualmente todas las páginas de ambos PDF.
- Comprobar que el examen no contiene respuestas accidentales y que el solucionario cubre todos los apartados.
- Crear el catálogo LaTeX/PDF y el manifiesto de recursos con etiquetas, variante, tema, versión, páginas, tamaño y relación examen–solución.
- Construir búsqueda, filtros, apertura y descarga, con visibilidad separada para examen y soluciones.

El número final de PDF depende de la conciliación; no hay que presuponer 60 documentos por existir 30 ZIP. Las correcciones realizadas en una lección HTML tampoco dan por corregida la copia LaTeX correspondiente.

### 4.3. Cierre de contenido y apoyos

- **Combinatoria:** la página actual solo contiene el título. Falta migrar y revisar teoría, calculadora y juego de diez preguntas desde [Combinatoria.txt](<../../Página web existente/Combinatoria.txt>). Es el hueco completo más claro dentro de los apoyos.
- **Probabilidad:** contrastar material original restante y revisar individualmente sus 60 preguntas y doce problemas, incluyendo condiciones, distractores, notación y procedencia.
- **Temas 1–5:** cerrar las auditorías conjuntas de contenidos, materiales de examen asociados y accesibilidad; conciliar los conceptos de planificación con la implementación.
- **Programación lineal, distribuciones, inferencia y apoyo bidimensional:** mantener un listado vigente por página de lo integrado y lo ausente en el original. No crear ejercicios ni simulaciones para cubrir cuotas. Los laboratorios existentes sí pueden reorganizarse o adaptarse como widgets conservando su contenido.
- **Competencias:** falta una correspondencia global entre las actividades y el mapa local [Competencias y criterios.txt](<../../Página web existente/Competencias y criterios.txt>). Cualquier declaración de adecuación normativa necesita una verificación aparte.

### 4.4. Práctica, test, tarjetas y búsqueda

Las modalidades comunes existen, pero no tienen aún todos los recorridos previstos:

| Función prevista | Situación | Trabajo que falta |
|---|---|---|
| Buscar en el libro | Sin buscador global | Índice por conceptos, filtros y resultados enlazados, sujetos a visibilidad |
| Seleccionar práctica | La portada de Practicar se centra en el repaso de t01 y enlaces a otros temas | Selector unificado por tema, epígrafe, dificultad, destreza y modalidad |
| Modos de test | Práctica sin tiempo con pistas y resumen | Reto breve, simulacro con corrección al final y repetición de errores durante la sesión |
| Metadatos de preguntas | 369 de 398 tienen lessonId; ninguna tiene campo de dificultad o destreza normalizado | Modelo común y correspondencia comprobada con fuentes y objetivos |
| Variantes | Hay numerosos generadores y exploradores | Relación explícita entre ítem base, familia y variantes verificadas; mezcla reproducible cuando corresponda |
| Tarjetas | 405, con visor libre | Búsqueda, filtros uniformes, autoevaluación y reaprendizaje de la sesión |
| Repaso espaciado futuro | Sin módulo de planificación | Preparar el algoritmo y los adaptadores, con persistencia personal desactivada |
| Formulario y glosario | Ambos son esqueletos | Reunir fórmulas con condiciones, definiciones enlazadas, tabla normal y acceso a calculadoras existentes |

El prompt pide cuatro alternativas por pregunta. **Las 60 preguntas base de Probabilidad tienen tres**, mientras las otras 338 tienen cuatro. Hay que corregir esa discrepancia editorial con distractores válidos, o registrar una excepción al requisito; no basta con relajar la prueba.

Tener 405 tarjetas no acredita por sí solo que estén conciliadas todas las 206 propuestas de planificación. Existen correspondencias por tema, pero falta la matriz global de conceptos conservados, fusionados o ausentes. Lo mismo se aplica a las 90 propuestas iniciales de test, respetando la instrucción posterior sobre los bloques estadísticos.

### 4.5. Nueve widgets pendientes

Son los tres de programación lineal, los tres de distribuciones y los tres de inferencia:

- Pinta la región factible; Cazador de vértices; Fábrica de modelos.
- Binomial Factory; Normal Slider; Corrección de continuidad.
- Diseña la muestra; Constructor de intervalos; Auditor de encuestas.

Sus carpetas no equivalen a juegos terminados. Primero hay que determinar qué parte puede reutilizar un laboratorio o actividad original ya existente y qué parte carece de fuente. En este segundo caso se mantiene la carencia documentada según la instrucción del usuario.

### 4.6. Accesibilidad, idiomas y voz

El tamaño, contraste y resaltado están disponibles. Falta completar espaciado, concentración, preferencia de movimiento y el conjunto de controles previsto.

Todavía no hay un módulo de traducción ni lectura en voz alta. Queda preparar:

- Cadenas y contenido traducibles, idioma y dirección del texto, protección de fórmulas y marcadores, y glosario matemático por idioma.
- Ayudas verificadas para las funciones de Chrome descritas en el plan.
- Lectura por bloques con voz disponible, velocidad, pausa, continuación y cancelación; sin leer respuestas ocultas ni duplicar fórmulas.
- Versiones verbales revisadas de las fórmulas principales.
- Adaptadores y caché para las integraciones de Google previstas; su funcionamiento real depende de la configuración correspondiente y debe comprobarse antes de anunciarse como operativo.

Falta la revisión manual con lector de pantalla y teclado de lecciones, tablas, juegos y estados dinámicos. Las pruebas de MathJax y semántica HTML no acreditan por sí solas esa experiencia. También faltan una revisión completa de contraste gráfico, colores forzados, reflujo a 320 px, zoom e impresión.

### 4.7. Diseño, publicación y futura extensión

El diseño definitivo está **aplazado por acuerdo**, no olvidado. Se ha preparado la clasificación editorial de textos; faltan tipografías, jerarquía, componentes y composición final, además de su revisión en móvil e impresión. La notación matemática debe conservar el tratamiento específico acordado.

En esta carpeta no se encontró repositorio Git ni configuración de publicación automatizada. Quedan la preparación del repositorio y despliegue, documentación docente y técnica, comprobación real bajo la ruta de Pages, medición de rendimiento y tamaño de recursos, y pruebas de los servicios externos.

No es necesario activar cuentas del alumnado para cumplir la versión inicial. Sí falta la arquitectura futura prometida: contratos, modelos de progreso y adaptadores inactivos con pruebas de desarrollo. [mi-progreso/index.html](../mi-progreso/index.html) es solo una página reservada.

## 5. Calidad técnica y coherencia documental

Se ejecutaron los **71 archivos de pruebas unitarias .test.mjs** disponibles. Resultado: **297 pruebas, 247 superadas y 50 fallidas**.

- **49 fallan al comparar 398 preguntas actuales con el total histórico de 347.** Hay que sustituir expectativas obsoletas por comprobaciones vigentes y por ámbito. Al corregir la primera aserción podrían aparecer otros problemas que ahora quedan sin ejecutar.
- **Una falla por las tres alternativas frente a cuatro** del banco de Probabilidad, una discrepancia real con la especificación.
- No se detectó en esta ejecución un fallo matemático de los modelos fuera de esas dos familias de aserciones. Esto no certifica todas las soluciones ni todos los navegadores.
- El script npm test incluye 64 de los 71 archivos unitarios. Las comprobaciones más recientes se ejecutan por otras vías y falta una batería global mantenida que las integre.

Evidencia de esta ejecución: [registro de pruebas](../../tmp/analisis-plan-2026-10-18-tests.log). Las comprobaciones de navegador del tema 7 y de sus 60 preguntas y doce problemas pasaron en la entrega 155; no se ha repetido hoy toda la batería de navegador de los nueve temas.

Se detectaron además estas incoherencias:

| Hallazgo | Consecuencia | Acción |
|---|---|---|
| Casillas antiguas sin marcar en los juegos t05 y t07 | El tablero aparenta más trabajo sin hacer | Conciliar con los catálogos y verificaciones; corregido en el registro de esta entrega |
| README mezcla resúmenes actuales con apartados antiguos de 35 lecciones o 16 juegos | No ofrece una única lectura fiable del estado | Mantener un estado canónico y señalar el carácter histórico de las entradas |
| test/index.html sigue anunciando nueve preguntas de Probabilidad | El texto no coincide con las 60 reales | Actualizar los textos desde los recuentos del catálogo |
| M13 identifica el problema logarítmico en el inventario y el aterrizaje asintótico en incidencias | Riesgo de aplicar o cerrar la corrección equivocada al preparar PDF | Asignar IDs únicos y actualizar referencias antes de compilar |
| Un byte NUL en auditoria-reutilizacion-inferencia.md | Algunas búsquedas lo tratan como archivo binario | Limpiar y verificar el documento |
| editorial.json tiene fecha 14 de octubre aunque el registro llega al 18 | Dificulta conocer la actualidad del catálogo | Actualizar fechas y separar fecha de revisión de contenido de fecha de catálogo |
| No existía docs/estado-proyecto.md, previsto por el prompt | El historial largo sustituye a un resumen operativo | Creado con esta entrega y enlazado a este diagnóstico |

## 6. Prioridades y orden de trabajo propuesto

| Prioridad | Entregable | Condición de salida |
|---|---|---|
| P0 | Base de verificación y trazabilidad coherente | Resolver las 50 aserciones fallidas, integrar las pruebas vigentes, corregir M13 y normalizar el estado/documentación |
| P1 | Visibilidad administrativa | Modelo y panel construidos; después, autenticación y guardado central probados con dos navegadores y permisos reales |
| P1 | Primera pareja PDF y cadena editorial repetible | Un examen y su solucionario conciliados, revisados, compilados y etiquetados; aplicar luego el proceso a los 30 paquetes |
| P1 | Combinatoria y cierre de fuentes | Apoyo original migrado y lista por fuente de contenido conservado o pendiente; revisión de test/problemas de Probabilidad |
| P2 | Recorridos comunes de estudio | Buscador, metadatos, selección de práctica, modos de test, herramientas y tarjetas conectados con la visibilidad |
| P2 | Accesibilidad, idiomas y lectura | Controles completos, lectura de contenido activo y fórmulas revisada, adaptadores de idiomas y comprobación manual documentada |
| P2 | Widgets y contenidos sujetos a reutilización | Reutilizar actividades disponibles y documentar lo que carezca de fuente, sin generar contenido para cubrir cuotas |
| P3 | Diseño final y preparación para publicación | Sistema visual aplicado al conjunto, pruebas de escritorio/móvil/impresión y despliegue real verificado |

La administración y la cadena de PDF son frentes de trabajo grandes que deben empezar pronto. La falta de configuración externa no impide preparar y probar sus modelos y componentes locales; solo impide dar por cerrada la integración real.

No hay base suficiente para prometer una fecha o un porcentaje global. La estimación deberá hacerse al completar una pareja PDF y un flujo administrativo de extremo a extremo.

## 7. Criterio para declarar cumplido el plan

- [ ] Contenido y apoyos conciliados con las fuentes; carencias autorizadas de los bloques restringidos identificadas y aceptadas como tales.
- [ ] Test y tarjetas con cobertura y metadatos comprobados, y discrepancia de alternativas resuelta.
- [ ] Recorridos de búsqueda, práctica, simulacro y repaso de sesión completos.
- [ ] Juegos previstos implementados desde material autorizado o carencias expresamente documentadas.
- [ ] Treinta paquetes LaTeX conciliados, con todos los documentos finales revisados y publicados en la biblioteca.
- [ ] Administrador autenticado con visibilidad global persistente, permisos, conflictos e historial probados.
- [ ] Texto, contraste, resaltado, espaciado y concentración utilizables; voz e idiomas con estado real probado.
- [ ] Revisión manual de teclado, lector de pantalla, fórmulas, móvil e impresión documentada.
- [ ] Arquitectura futura de cuentas/progreso preparada y desactivada; público sin historial personal.
- [ ] Diseño final, documentación, batería global de pruebas y publicación en GitHub Pages verificados.

## 8. Evidencias y límites del análisis

Se contrastaron el [prompt maestro](../../PROMPT_MAESTRO_WEB_MATEMATICAS_CCSS_II.md), el [plan de acción](../PLAN_DE_ACCION.md), los catálogos de [páginas](../config/pages.json), [estado editorial](../config/editorial.json), [widgets](../config/widgets.json) y [actividades](../content/activities/catalog.js), las auditorías por tema y reutilización, las páginas comunes y sus módulos.

Los recuentos se calcularon desde los archivos actuales. Este análisis no vuelve a resolver uno por uno todos los ejercicios, no compila los exámenes y no certifica accesibilidad ni servicios externos. Esas comprobaciones aparecen en el trabajo pendiente con condiciones de cierre específicas.

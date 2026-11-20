# Plan de trabajo: web operativa, funcional y con diseño profesional

Creado: 27 de octubre de 2026 · Repositorio: `jgamort408-web/2bachweb`

Este es el **documento de entrada para cada sesión de trabajo** sobre la web. Recoge el orden de las tareas, qué cuenta como terminado y qué decisiones requieren consultar al docente. Los criterios detallados de las tandas antiguas siguen en [Web_Matematicas_CCSS_II/docs/PLAN_CIERRE_POR_TANDAS.md](Web_Matematicas_CCSS_II/docs/PLAN_CIERRE_POR_TANDAS.md) y el estado del contenido en [docs/estado-proyecto.md](Web_Matematicas_CCSS_II/docs/estado-proyecto.md). La especificación global sigue siendo el [prompt maestro](PROMPT_MAESTRO_WEB_MATEMATICAS_CCSS_II.md).

## Cómo usar este plan en cada sesión

1. Leer este archivo, el apartado «Diario» del final y `git log --oneline -15`.
2. Tomar la **primera tarea sin marcar** de la fase activa, salvo que el docente indique otra. Las tareas marcadas con 🗣️ exigen preguntar antes de implementar.
3. Trabajar en una rama (`feat/…`, `fix/…`, `design/…`), comprobar con `npm test` (y las pruebas de navegador pertinentes) y hacer commits reales y pequeños.
4. Al cerrar: marcar la casilla, añadir una línea al Diario (fecha, tarea, resultado, pruebas) y actualizar `docs/estado-proyecto.md` si cambian las cifras.

**Definición de terminado (para cualquier tarea):** funciona en escritorio y en móvil (360 px), con teclado y sin ratón; el contenido se lee sin JavaScript; respeta `prefers-reduced-motion`; los contrastes alcanzan WCAG 2.2 AA; `npm test` y `npm run check:links` pasan; la matemática nueva está verificada con un modelo o prueba; no se modifica ningún original.

## Principios que no se negocian

- Originales de solo lectura (`Selectividad/`, ZIP de `Materiales…`, `Página web existente/`); se trabaja sobre copias con procedencia.
- Matemática correcta antes que vistosa: cada generador, gráfica o animación se apoya en `content/models/` con pruebas.
- Sin cuentas ni seguimiento del alumnado; el estado de las partidas vive en memoria y solo persisten las preferencias.
- Sitio estático compatible con GitHub Pages en subcarpeta (`/2bachweb/`): rutas relativas, sin rutas absolutas.
- El color nunca es el único portador de significado: cada tipo de bloque lleva también icono y título.
- Animaciones al servicio de la idea matemática, breves (150–300 ms en interfaz) y desactivables.

## Estado de partida (27-10-2026)

- 86 lecciones (58 revisadas, 28 parciales en los temas 6–9), 398 preguntas, 405 tarjetas, 19 de 28 widgets, 48 PDF revisados.
- **343 pruebas unitarias superadas** (77 archivos + comprobador de enlaces).
- Diseño provisional: `main.css` mínimo (`system-ui`, sin paleta ni iconos), 27 estilos en línea en `libro/`, sin modo oscuro y sin ilustraciones. Unos 17 módulos dibujan SVG cada uno a su manera; existe un puente con GeoGebra en `widgets/shared/geogebra/`.
- Pendientes heredados: T04 (administración real), T07 (biblioteca), T08 (combinatoria), T09–T12, T13–T15 y T16.

---

## Fase 0 · Infraestructura y flujo de trabajo

- [x] W00 · Repositorio Git en la carpeta raíz, `.gitignore` y primer push a GitHub.
- [x] W01 · Herramientas no temporales movidas de `tmp/tools/` a [tools/](tools/README.md) (Tectonic 0.17.0 y su caché, sin versionar); `leer_lote.py` parametrizado sustituye a los `leer_lNNN.py`.
- [x] W02 · Comprobador y reparador de enlaces locales (`npm run check:links` / `npm run fix:links`), incluido en `npm test`. Al copiar una página a otra profundidad, `fix:links` recalcula los prefijos `../`.
- [x] W03 · Dependencias de verificación: `python -m pip install -r tools/requirements.txt` (pypdf, pypdfium2, pdfplumber) y Playwright 1.64.1 como dependencia exacta de desarrollo (`npm ci`). `npm run test:e2e [palabras]` lanza las pruebas de navegador con el servidor local y el Chrome del sistema.
- [x] W04 · GitHub Actions de integración (`.github/workflows/ci.yml`): unitarias y enlaces de la web, pruebas de Selectividad y cinco pruebas de navegador en cada push; batería completa a mano con «todas».
- [x] W05 · Despliegue en Pages solo de la web (`.github/workflows/pages.yml`): copia `Web_Matematicas_CCSS_II/` sin docs, tests, scripts ni fuentes LaTeX. Publicada en https://jgamort408-web.github.io/2bachweb/ (fuente «GitHub Actions»); `docs/`, originales y Selectividad dan 404. Comprobado en Chrome: cabecera, MathJax y práctica sin errores.
- [ ] W06 · Ordenar la documentación: mover los ~175 `verificacion-entrega-NN.md` y las auditorías a `docs/historial/`, y dejar en `docs/` solo los documentos vigentes. Con Git, el historial ya no necesita un archivo por entrega. 🗣️ Pendiente de que el docente lo apruebe (no se pidió en esta ronda).
- [ ] W08 · Sanear las pruebas de navegador heredadas (`npm run test:e2e`). La primera batería completa (27-10-2026) dio 98/137. Causas ya corregidas: totales fijos del banco (ahora se leen de `tests/helpers/catalog-expectations.mjs`), aviso `[data-content-availability]` contado como apartado, carreras con la puerta de contenido y con el arranque asíncrono de los widgets, margen de tiempo, cierre con `unrouteAll` bloqueante (31 pruebas) y lanzador que ahora termina el árbol de procesos de Chrome. Tras los arreglos pasan, entre otras, 06, 12, 25, 70, 76–78, 81, 102, 121–124. Tanda 76–118 repetida: 19 de 26 pasan. ~~79 y 80~~ pasan desde el 06-11-2026; sigue fallando 88, ~~90~~, ~~92~~, ~~94~~ y ~~112~~ (resueltas: la lección 7.4 tiene hoy 10 apartados; la 90 exigía 0,8405 en el ejercicio 4 del tema 8, pero el valor exacto de P(18 ≤ X ≤ 24) con X ~ Bin(30; 0,7) es 0,8389, el que muestra la página; 92 y 94, ver abajo). La 25 comprobaba la URL sin esperar a la navegación de vuelta desde el juego (corregida con `waitForURL`). Intermitente: ~~54~~ (06-11-2026: la causa no eran las preferencias. «Comprobar» del juego de redes está habilitado en el HTML antes de que arranque la partida; la prueba leía `data-seed` aún vacío, calculaba la red de la semilla 0 y respondía a otra red. Ahora espera a `[data-game][data-seed]`: 9 de 10 ejecuciones; el fallo restante no se reprodujo con detalle. Otras 26 pruebas leen `dataset.seed`; si alguna se vuelve intermitente, revisar la misma espera, o que los juegos marquen cuándo están listos). Intermitente: 11 (línea 83, cambiar el tamaño de texto con una segunda pestaña abierta; el 07-11-2026 falló 1 de 4 ejecuciones, también en el commit anterior, así que no lo causa P06). Pendiente: etiqueta «Contenido parcial disponible» del tema 8 (88); comprobación de la prueba 90; esperas de captura de diagramas (80, 81, 83).
- [ ] W07 · Generador de páginas `npm run new:page -- <ruta> <id> "<título>"`: crea el HTML con la plantilla vigente, rutas correctas y registro en `config/pages.json`.

## Fase 1 · Consulta de diseño con el docente 🗣️ (bloquea las fases 2–5)

**No se implementa ningún rediseño sin cerrar antes esta fase.** El objetivo es que el diseño se ajuste a la idea del docente, no a una suposición. Se hará en una sesión dedicada, con preguntas concretas (herramienta de preguntas) y prototipos visuales comparables (artefactos HTML de una sola página), en varias rondas cortas.

- [x] D01 · **Ronda 1, identidad y referencias.** Respuestas en [DECISIONES_DISENO.md](Web_Matematicas_CCSS_II/docs/diseno/DECISIONES_DISENO.md). Preguntar:
  - Tres adjetivos para la web (p. ej. sobria/académica, cálida/cercana, tecnológica/laboratorio, lúdica).
  - Webs, libros o apps que le gusten como referencia (y qué le gusta de cada una) y qué quiere evitar.
  - Si debe reflejar la identidad del centro (logo, colores institucionales; en los LaTeX aparece `logo-al-andalus.png`) o tener marca propia («Matemáticas en contexto · CCSS II»).
  - Dispositivo principal del alumnado (móvil, portátil, tablet) y uso en clase con proyector o pizarra digital.
  - Modo oscuro: sí, no o automático.
- [x] D02 · **Ronda 2, color y tipografía.** Fusión A + C: Outfit + Plus Jakarta Sans, bloques azul #2563EB, magenta #A21CAF y naranja #C2410C, cajas con fondo de color y acento discreto. Decisiones en DECISIONES_DISENO.md.
- [x] D03 · **Ronda 3, iconos, ilustraciones y movimiento.** Iconos en pastilla tintada, ilustración plana con el color del tema, movimiento moderado (expresivo solo al terminar una serie y en juegos), sonido opcional desactivado. Tono cercano y claro (ronda 1).
- [x] D04 · **Ronda 4, composición.** Aireada, índice lateral fijo a la izquierda, barra inferior tipo app en móvil; portada, tema, lección, test, laboratorio y biblioteca aprobados sin cambios.
- [x] D05 · [DECISIONES_DISENO.md](Web_Matematicas_CCSS_II/docs/diseno/DECISIONES_DISENO.md) completo y validado (27-10-2026), con tokens y código de las láminas en `docs/diseno/prototipos/`. **Fase 1 cerrada: puede empezar S01.**

**Propuesta de partida para la consulta: colores e iconos por tipo de contenido.** Usa los `data-content-role` ya presentes en el HTML; se ajustará en D02–D03.

| Rol (`data-content-role`) | Significado | Icono orientativo | Color orientativo |
|---|---|---|---|
| `objectives` | Al terminar podrás | diana | acento del tema |
| `prerequisites` | Antes de empezar | escalera / enlace | gris azulado |
| `theory` | Definición / concepto | libro | azul tinta |
| `reference` | Propiedad, tabla, teorema | sello / regla | índigo |
| `method` | Procedimiento paso a paso | lista numerada | violeta |
| `worked-example` | Ejemplo resuelto | lápiz | verde azulado |
| `guided-practice` | Practica | mando / mano | acento del tema |
| `common-errors` | Errores frecuentes | triángulo de aviso | ámbar sobre crema |
| `warning` | Alcance y limitaciones | información | gris |
| `summary` | Resumen / antes de seguir | marcador | acento del tema suave |
| `source` | Procedencia | archivo | gris claro |
| ampliación didáctica | Contenido no original | estrella | rosa / coral |
| Selectividad | Ejercicio de PEvAU | birrete | dorado |

## Fase 2 · Sistema de diseño (tras D05)

- [x] S01 · `assets/css/tokens.css` (prefijo `--mc-`): claro, oscuro automático y forzado (`data-theme`), alto contraste integrado con la preferencia existente, modo proyector (`data-presentation`), acento por bloque (`data-block`), tipografía fluida, espaciado, radios y movimiento con `prefers-reduced-motion`.
- [x] S02 · Outfit 600/700 y Plus Jakarta Sans 400/400i/600/700 en `assets/fonts/` (woff2 latino, @fontsource 5.3.0, OFL) con `assets/css/fonts.css`; el servidor local sirve `font/woff2`.
- [x] S03 · `assets/icons/sprite.svg`: 27 iconos propios de 24 px con `currentColor` (9 de rol, secciones e interfaz), con prueba `tests/design-icons.test.mjs`.
- [x] S04 · `assets/css/components.css`: base opcional `.mc-skin`, cajas por rol, pastillas, chips, botones, campo, feedback animado, opciones de test, progreso por segmentos, barra de lectura, tarjetas, índice lateral, anterior/siguiente, barra inferior móvil y panel de valores. Solo por clase: no cambia las páginas actuales.
- [x] S05 · Guía de estilo en `docs/diseno/guia-de-estilo.html` (servidor local; no se despliega): claro/oscuro/sistema, contraste, proyector y bloque conmutables. Revisada en Chrome a 1100 y 390 px, sin errores ni desbordamiento.
- [ ] S06 · Pruebas: contraste automático de todas las parejas de tokens (prueba unitaria) y capturas de referencia con Playwright para detectar regresiones. **Hecho:** `tests/design-tokens.test.mjs` (contraste AA de 50 parejas en claro y oscuro, y bloques oscuros idénticos). **Pendiente:** capturas de referencia con Playwright.

## Fase 3 · Maquetación de plantillas

- [x] L01 · Cabecera y pie nuevos en todas las páginas (`components/header.html`, `footer.html`, `assets/css/layout.css`): marca Mates CCSS II con logotipo, navegación en píldoras (Inicio, Libro, Practicar, Laboratorios, Recursos; el resto pasa al pie), migas, y Temario, Páginas relacionadas y Opciones de lectura plegables en el flujo. Selector de modo oscuro (`assets/js/core/theme.js`) y barra inferior móvil solo en páginas migradas (`<html data-skin="mc">`). Buscador pendiente de T10.
- [x] L02 · Portada migrada (`index.html`, `assets/css/templates.css`): titular, tres acciones, ilustración plana con curva animada, nueve temas por bloque, «Empieza por aquí» (1.1, 2.1, 4.1 y 7.1), cinco modos de estudio y apoyos. El «destacado del docente» espera a la administración (T04/M03).
- [x] L03 · Plantilla de índice de tema aplicada al tema 7 (referencia): cabecera ilustrada con chip de bloque y cifras, «Para empezar», recorrido como tarjetas numeradas con estado (`indexes.js` en páginas migradas, mismo nombre accesible), práctica por lección, columna «Practica el tema» (problemas, test, tarjetas, juegos) y estado del tema. Textos y enlaces intactos. Los otros ocho índices, con estructuras distintas, se migran en L08.
- [x] L04 · Plantilla de lección aplicada a la 7.1 (referencia): `assets/js/core/skin.js` convierte cada sección según su `data-content-role` en caja con pastilla y etiqueta, rehace el índice de apartados como columna fija a la izquierda con apartado activo (desplegable en móvil), añade barra de progreso de lectura y anterior/siguiente desde el catálogo (fuera de `main`, alineado con la columna de 48rem). Para migrar una lección basta con `data-skin`, `mc-skin`, `data-block` y `mc-lesson`. Los controles de las actividades se rediseñan en L05.
- [x] L05 · Test, tarjetas, práctica y laboratorio con la composición de la especificación §11.3. **Parte 1:** motor común `quiz.js` con `data-state`/`data-action` y estilo en páginas migradas: opciones táctiles, Comprobar/Siguiente como acción principal, feedback por estado (acierto, fallo, pista, aviso) con icono y subida de 250 ms, opción correcta revelada y celebración breve al terminar la serie. **Parte 2:** test, tarjetas, practicar y laboratorios migrados: selector de tema en píldoras, tarjeta de repaso con anverso y reverso, rejilla de 19 juegos con tema y bloque, cajas por rol también en páginas generales (`main.mc-page`). Pendiente editorial (L08): reordenar la introducción heredada de Practicar.
- [ ] L06 · Eliminar los 27 estilos en línea de `libro/` y los estilos ad hoc de los widgets en favor de clases y tokens; unificar `widget-base.css` con los tokens.
- [ ] L07 · Hoja de impresión: lecciones y fichas imprimibles en A4 sin menús, con fórmulas nítidas y enlaces visibles.
- [x] L08 · Aplicar las plantillas a las 176 páginas por temas (un commit por tema), comprobando en cada uno móvil, teclado, MathJax y `check:links`. **Avance:** `scripts/apply-skin.mjs --block <bloque> <páginas>` marca páginas como migradas sin tocar contenido. Tema 7 completo (índice, 10 lecciones y ejercicios resueltos; 29 pruebas). Tema 1 completo (índice reconstruido con la plantilla y 18 lecciones; 11 pruebas). `skin.js` genera el índice lateral si falta y deduce el rol visual de las secciones sin `data-content-role` a partir de su título (`data-skin-role`). Temas 2 y 3 completos (17 lecciones y 2 índices; 27 pruebas). Temas 4 y 5 completos (23 lecciones y 2 índices; 33 pruebas). Temas 6, 8 y 9 completos (19 lecciones y 3 índices; 33 de 36 pruebas, las 3 restantes son las previas de W08). **Los nueve temas del libro están migrados.** Libro (`libro/index.html`, tarjeta de tema con color de bloque y barra de avance) y apoyos migrados; el índice de apoyos, vacío en origen, lista ahora sus páginas con el recorrido dinámico (Combinatoria sigue sin contenido). Páginas anfitrionas de los 27 juegos (color del bloque de su tema y marco del juego con el acabado de las cajas), lecturas de preguntas de Probabilidad e Inferencia, y accesibilidad, administración, recursos, exámenes, herramientas, formulario, glosario, mi progreso y 404 migradas. **Todas las páginas del sitio usan ya el nuevo diseño**, salvo el interior de los juegos (`widgets/games/`, documentos propios dentro del iframe: pendiente en la fase G). Recursos, exámenes, herramientas, formulario, glosario, mi progreso y 404 siguen siendo marcadores con solo el título (contenido en P01, P06 y Q03; «Recursos» está en el menú principal, conviene priorizar P01). Índices de los temas 2–6, 8 y 9 con cabecera ilustrada (chip del bloque, datos del tema e ilustración calculada con la fórmula real de cada idea: asíntotas y extremos, suma de Riemann, matriz y grafo, rectas concurrentes, región factible, binomial y normal, muestra e intervalo), generada con `scripts/topic-heroes.py`; el resto del índice conserva la plantilla de lección. **L08 terminada.**

## Fase 4 · Feedback inmediato y microinteracciones

- [ ] F01 · Componente único de corrección para test, práctica y juegos: estados correcto, incorrecto, parcial y formato inválido; mensaje explicativo con el paso donde falla; `aria-live="polite"`; sin mover el foco ni desplazar el contenido bruscamente.
- [ ] F02 · Validación mientras se escribe: formato numérico (coma/punto, fracciones, intervalos, matrices), previsualización de la expresión con MathJax y aviso antes de «Comprobar».
- [ ] F03 · Pistas graduadas (1, 2 y solución) con registro de uso en la sesión.
- [ ] F04 · Animaciones de interfaz con CSS y la Web Animations API: entrada de feedback, volteo de tarjetas, progreso, transición entre preguntas y celebración discreta al terminar una serie (intensidad según D03). Todo respeta `prefers-reduced-motion`.
- [ ] F05 · Resumen de sesión al final de cada test o juego: aciertos, errores por destreza y enlaces de refuerzo a la lección y al apartado exactos.
- [ ] F06 · Sonido opcional desactivado por defecto (🗣️ preguntar en D03 si se quiere).

## Fase 5 · Representaciones gráficas e ilustraciones

- [ ] G01 · Módulo común de gráficos SVG `assets/js/core/plot.js`: ejes con flechas y etiquetas, rejilla, escalas, funciones con discontinuidades y asíntotas, puntos abiertos y cerrados, áreas sombreadas, segmentos, tangentes, leyenda accesible y descripción textual automática. Colores tomados de los tokens.
- [ ] G02 · Migrar los ~17 exploradores y widgets que dibujan SVG por su cuenta a `plot.js`, tema a tema, con prueba de regresión visual.
- [ ] G03 · Diagramas propios de la materia: región factible y vértices (PL), árbol de probabilidad, diagrama de Venn, tabla de contingencia visual, campana normal con área bajo la curva, binomial con barras, nube de puntos con recta de regresión, matriz con filas resaltadas (Gauss), grafo y adyacencia.
- [ ] G04 · Animaciones matemáticas: construcción progresiva de una curva, secante que tiende a tangente, rectángulos que llenan el área (Riemann), recta objetivo que barre la región factible, binomial que converge a la normal, intervalo de confianza que cambia con n y α. Siempre con control de pausa y paso a paso.
- [ ] G05 · Decidir el papel de GeoGebra (`widgets/shared/geogebra/`): solo laboratorios avanzados o eliminarlo en favor de `plot.js`. 🗣️ Consultar.
- [ ] G06 · Ilustraciones en el estilo elegido en D03: cabecera de cada uno de los 9 temas, portada, estados vacíos, página 404 y errores. Formato SVG optimizado, con `alt` o `aria-hidden` según sean informativas o decorativas.

## Fase 6 · Funcionalidad pendiente (tandas heredadas)

- [x] P01 · T07 Biblioteca de recursos: los 48 PDF agrupados por pareja examen/soluciones, búsqueda, filtros por tema/tipo/etiqueta, visibilidad heredada y acciones separadas. **Hecho (07-11-2026):** `examenes/index.html` se genera con `npm run build:exams` (`scripts/build-exams.mjs`) desde `config/resources.json`: 24 tarjetas por bloque con tema, tipo, etiquetas de contenido legibles (las editoriales no se muestran) y dos botones, Examen y Soluciones, con el tamaño del PDF. Funciona sin JS; con JS, búsqueda sin tildes y filtros por tema y tipo, `?tema=t07` y recuento anunciado. Visibilidad: la tarjeta lleva `data-content-id` del examen y el enlace a soluciones se oculta por su ruta. «Recursos» es ahora la portada de materiales. Pruebas: `exam-library.test.mjs` (página al día) y 160. Al añadir un recurso: actualizar `config/resources.json`, ejecutar `npm run build:exams` y, si trae etiquetas nuevas, darles nombre en el script (si no, falla a propósito).
- [x] P02 · T08 Combinatoria migrada desde `Página web existente/Combinatoria.txt` y matriz de cobertura de fuentes cerrada. **Hecho (07-11-2026):** `libro/apoyos/combinatoria.html` integra todo el original: Laplace y las dos preguntas clave, tabla de técnicas, árbol de decisión como lista accesible, V, VR, P, P con repetidos y C con sus ejemplos, demostración de V(5,3), triángulo de Pascal, probabilidad con conteo (tres ejemplos), calculadora exacta con BigInt (`content/models/combinatorics.js`; el original daba cifras falsas con potencias grandes), seis ejercicios con selector y las diez preguntas del juego en el visor común (`combinatorics-test.js`, sin puntos ni rachas). Corregidos el recuento de MATEMÁTICA (la Á contada como A), el separador de millares, la equiprobabilidad no dicha y las etiquetas «EBAU» sin origen; detalle en `docs/auditoria-reutilizacion-combinatoria.md`. Estado parcial; el formulario incluye sus cinco fórmulas (87). Matriz de cobertura de los 44 originales cerrada en `docs/criterio-reutilizacion-html-estadistica-pl-inferencia.md`: 43 integrados y «Competencias y criterios.txt» sin destino (🗣️ decidir si se publica). De paso, el índice fijo de las lecciones ya no queda debajo de las fórmulas en móvil (`z-index`). Pruebas: `combinatorics.test.mjs` y 164.
- [ ] P03 · T09 Revisión editorial de evaluaciones: distractores, hipótesis, unidades y redondeos. P03A completada (14-11-2026): aclarado el ejemplo de valores discretos no enteros en 8.1, tarjeta `fc-t08-original-01` y glosario. Se conservan los originales. [Inventario por tandas](Web_Matematicas_CCSS_II/docs/REVISION_EDITORIAL_EVALUACIONES_P03.md); P03B completada: 22 tarjetas revisadas, siete precisiones; P03C completada (37 tarjetas y 20 preguntas); P03D completada (19 tarjetas); P03E completada (25 tarjetas y diez preguntas); siguen pendientes P03F y la ampliación EV-INF-01.
- [ ] P04 · T10 Dificultad y destreza normalizadas en el banco; buscador común del sitio (índice estático generado) que respeta la visibilidad.
- [ ] P05 · T11 Práctica: repetición de errores de la sesión, retos y simulacros cronometrados opcionales tipo PEvAU.
- [x] P06 · T12 Tarjetas con filtros, formulario por tema y glosario enlazado desde las lecciones. **Glosario hecho (07-11-2026):** `herramientas/glosario.html` se genera con `npm run build:glossary` desde `config/glossary.json` (42 términos curados: tarjeta de origen y lección donde se explica). La definición es el reverso de la tarjeta revisada, sin redactar aparte; búsqueda sin tildes, índice de letras y visibilidad heredada. Cada lección con términos muestra «En el glosario» entre el contenido y anterior/siguiente (`skin.js`). Pruebas: `glossary.test.mjs` y 161. **Formulario hecho (07-11-2026):** `herramientas/formulario.html` se genera con `npm run build:formulas` desde `config/formulas.json` (82 fórmulas de los nueve temas y de Estadística bidimensional). El generador exige que cada fórmula aparezca literalmente en la lección que cita (o cada fragmento de `from`, si reúne celdas de una tabla), así que no quedan copias desfasadas; búsqueda sin tildes, filtro por tema, `?tema=` e impresión en dos columnas. Herramientas y Recursos enlazan formulario y glosario. Pruebas: `formulas.test.mjs` y 162. **Tarjetas hechas (07-11-2026):** la página Tarjetas monta el mazo en modo estudio (`flashcards.js`, `study`): búsqueda sin tildes; «Apartado» uniforme (categoría de la fuente en los temas 6–9 y el apoyo, lección en los temas 1–5 y «Repaso del tema»; con todo el curso, agrupado por tema); autoevaluación tras ver la respuesta («La sabía» / «Repasar más tarde»); reaprendizaje de la sesión (la marcada vuelve una vez, tres tarjetas después) y resumen con «Repasar las N marcadas». Sin persistencia. Las tarjetas del tema 1 tienen ya `lessonId` (familia → lección 1.1–1.18; `fc-review` queda como repaso). Las lecciones conservan el mazo sencillo. Pruebas: `flashcard-sections.test.mjs`, 163 y las 46 que usan la página (76, 84, 91, 99 y 120 actualizadas: ahora hay selector en todos los temas y los botones se localizan por `data-action`). Queda para más adelante el repaso espaciado con persistencia (desactivado por decisión previa). **P06 terminada.**
- [ ] P07 · T15 Los nueve widgets pendientes (temas 6, 8 y 9) y completar las lecciones parciales de los temas 6–9. **Tema 6 (16-11-2026):** las cinco lecciones completas y revisadas: objetivos, exploradores de semiplano (6.1), región factible (6.2) y función objetivo (6.4) sobre un modelo exacto con fracciones (`content/models/linear-programming.js`), seis preguntas autocorregibles por lección (30, `content/activities/linear-programming.js`), errores frecuentes, resumen y tarjetas por lección. **Tema 8 (16-11-2026):** las cuatro lecciones completas y revisadas: exploradores de distribución discreta (8.1) y binomial (8.2) con aritmética racional exacta (`content/models/discrete-distributions.js`), 24 preguntas (`content/activities/distributions.js`), objetivos, errores, resumen y tarjetas por lección. **Tema 7:** contenido completo; su estado parcial depende de la revisión editorial P03F-F7, que no se ha tocado. Siguen pendientes los juegos de los temas 6, 8 y 9 y las lecciones del tema 9 (con EV-INF-01).
- [x] P08 · Banco de Selectividad en la web, por ejercicios. Un generador (`scripts/build-selectividad.mjs`) lee en solo lectura `Selectividad_LaTeX/datos/ejercicios.csv`, `enunciados/` y `soluciones/`, convierte el subconjunto de LaTeX del banco a HTML con MathJax (enumerate, negritas, matrices, `minipage`, figuras) y produce los datos de la web. Página de tarjetas con enunciado y solución, filtrable por tema, epígrafe, etiquetas, año, convocatoria y tipo, y enlace desde cada lección a «Así cae en Selectividad». **Decidido con el docente (07-11-2026):** soluciones publicadas ocultas hasta que él las active desde Administración (por ejercicio o en bloque, con el sistema de visibilidad); las tarjetas **no se publican** hasta que la otra herramienta complete la identificación de convocatoria y tipo (hoy 496 de 640 sin convocatoria). Se desarrolla en la rama `feature/selectividad`, sin fusionar en `main` hasta entonces. **Hecho en la rama (07-11-2026), pendiente de publicar:** `npm run build:selectividad` genera el índice y ocho páginas de tema (640 tarjetas), `config/selectividad.json`, las soluciones validadas en `content/selectividad/soluciones.json` y sus figuras. Conversor del subconjunto de LaTeX con error explícito ante lo no admitido; filtros por lección, contenido, año, convocatoria y tipo; contraste de hipótesis marcado como fuera de la PAU y oculto de partida; enlaces `?epigrafe=`, `?etiqueta=` y `#SEL-…`; «Así cae en Selectividad» al final de cada lección con ejercicios. Soluciones: un grupo por tema oculto en `config/visibility.json` y una entidad por solución (nuevos tipos `group` y `solution` del catálogo); nada se muestra sin JavaScript ni con la configuración de respaldo. Detalle en `docs/banco-selectividad-web.md`. **Antes de fusionar:** completar la identificación y regenerar. El trabajo de la otra herramienta quedó confirmado el 08-11-2026 en `selectividad/banco` (640 enunciados y 72 soluciones), fusionado en esta rama. Pruebas: `selectividad.test.mjs` y 165.
- [x] P09 · Generador de relaciones de ejercicios: el usuario elige temas y etiquetas y el número de ejercicios; la selección es aleatoria, con semilla reproducible y sin repetir ejercicio. Salidas con y sin soluciones (solo las validadas y visibles): PDF desde una vista de impresión en el navegador y LaTeX descargable, como `.tex` autónomo o `.zip` compatible con `Selectividad_LaTeX` para Overleaf. **Decidido (07-11-2026):** PDF por impresión + LaTeX, sin compilar en el servidor. Depende de P08. **Hecho en `feature/selectividad` (08-11-2026), pendiente de publicar con P08:** `selectividad/relaciones.html` con temas, contenidos (alguno o todos), número, semilla y título; enlace reproducible; impresión limpia; `.tex` autónomo y `.zip` con la estructura del banco (solo los elegidos y sus soluciones publicadas con figuras). Ambos compilan con Tectonic. Modelo en `content/models/selectividad-relations.js`. Pruebas: `selectividad-relations.test.mjs` y 166.
- [x] P10 · Generador de exámenes con formato de la PAU vigente: composición aleatoria o guiada (el usuario fija el tema o el ejercicio de cada pregunta), con reglas de sentido (cobertura de bloques, total de 10 puntos, sin repetir examen de origen ni la misma idea principal) y las mismas salidas que P09. **Formato recibido (07-11-2026):** orientaciones 2025-26 en `Instrucciones PEvAU/`, resumidas en `Web_Matematicas_CCSS_II/docs/formato-pau-vigente.md`: 4 ejercicios (3 puntos de álgebra y programación lineal, 3 de análisis, 2 + 2 de probabilidad, distribuciones e inferencia), opcionalidad a)/b), obligatoriedad del 40–50 %, 1 h 30 min, notación con punto decimal y tabla N(0, 1) anexa. Reglas por defecto propuestas en ese documento (reescalado de puntuaciones, exclusión del contraste de hipótesis). Carencias del banco para el formato: integrales, sistemas en contexto y binomial o normal. Depende de P08 y P09; mejora con SEL-PARTES (seleccionar apartados sueltos) de la otra herramienta. **Hecho (12-11-2026):** `selectividad/examenes.html`: huecos 1A/1B (T04–T05/T06), 2A/2B (T01/T02–T03), 3 (T07) y 4 (T09), guiados por tema, contenido, referencia u «Otro ejercicio»; puntuaciones adaptadas en cuartos de punto; instrucciones del modelo; tabla oficial de la N(0, 1); soluciones publicadas; impresión, `.tex` y `.zip`. Diez exámenes compilados con pdfLaTeX. Detalle en `docs/formato-pau-vigente.md`. Pruebas: `selectividad-exams.test.mjs` y 167.
- [x] P11 · Presentaciones de clase por tema (`libro/temas/<tema>/presentacion.html`): diapositivas 16:9 propias con idea clave, definición, ejemplos paso a paso, preguntas a la clase, notas para el docente y los exploradores de las lecciones. **Decidido con el docente (14-11-2026):** formato propio por tema, empezando por el tema 3. **Hecho (15-11-2026):** el docente aprobó el diseño del tema 3 y están los nueve temas (15–25 diapositivas cada uno). Notación de cada lección respetada (Adj(A)=C^T, rg(A|B), P(A∣B), Bin(n,p), N(μ,σ), IC_{1−α}). Guía en `docs/aplicacion-y-presentaciones.md`.

## Fase 7 · Accesibilidad, idiomas y voz (T13–T14)

- [ ] A01 · Auditoría con axe y revisión manual con NVDA y TalkBack: teclado, foco, reflujo al 400 %, lectura de fórmulas (MathJax con lenguaje hablado en español) y descripciones de gráficas.
- [ ] A02 · Espaciado de lectura, modo concentración y fuente para dislexia opcional, como preferencias persistentes.
- [ ] A03 · Lectura en voz alta (Web Speech API como primera opción, sin coste) y traducción. 🗣️ Decidir si se usan servicios de Google Cloud (implican coste y configuración).
- [ ] A04 · PDF accesibles: etiquetado y texto alternativo en los LaTeX de examen.

## Fase 8 · Administración real (T04) 🗣️

- [ ] M01 · Crear el proyecto Firebase (Authentication + Firestore) con la cuenta del docente: requiere su intervención; no inventar UID ni correo.
- [ ] M02 · Reglas de seguridad que deniegan las escrituras por defecto y pruebas de los tres perfiles (anónimo, autenticado no administrador, administrador).
- [ ] M03 · Conectar `VisibilityRepository` y el historial, con restauración y respaldo estático.

## Fase 9 · Calidad, aplicación móvil y publicación (T16)

- [x] Q01 · Aplicación web instalable (PWA): `manifest.webmanifest`, iconos, color de tema y *service worker* que guarda lecciones y PDF visitados para usarlos sin conexión. **Hecho (14-11-2026), decidido con el docente:** icono = logotipo de la cabecera (opción A de tres), nombre «Mates CCSS II», `instalar.html` con pasos para Android, iPhone y ordenador, botón «Instalar» en el pie cuando el navegador lo ofrece y `offline.html`. Etiquetas desde `content-gate.js` (todas las páginas sin tocar cada HTML). Detalle en `docs/aplicacion-y-presentaciones.md`.
- [ ] Q02 · Rendimiento: Lighthouse ≥ 90 en las cuatro categorías en portada, lección y juego; carga diferida de MathJax y widgets; imágenes optimizadas.
- [ ] Q03 · Metadatos: títulos, descripciones, Open Graph, favicon, `sitemap.xml`, `robots.txt` y página 404 diseñada.
- [ ] Q04 · Revisión cruzada en Chrome, Firefox, Safari iOS y Chrome Android, en 360, 768, 1280 y 1920 px, y en proyector.
- [ ] Q05 · Prueba con alumnado (5–8 estudiantes): tareas guiadas, observación y ajustes de usabilidad.
- [ ] Q06 · Publicación en GitHub Pages y anuncio al alumnado.

## Trabajo paralelo · Banco de Selectividad

Sigue su propio plan en [Selectividad_LaTeX/PLAN_DE_TRABAJO.md](Selectividad_LaTeX/PLAN_DE_TRABAJO.md): L026 en curso (lectura preparada el 27-10-2026), 25 de 84 lotes cerrados y fase de soluciones inactiva. No interfiere con las fases anteriores salvo en P08.

## Orden recomendado

W03 → W04 → **D01–D05 (consulta)** → S01–S06 → L01–L08 → F01–F05 → G01–G06, con P01–P07 intercalados cuando el diseño de su plantilla ya exista (así cada página se construye una sola vez con el diseño definitivo) → A01–A04 → M01–M03 → Q01–Q06.

---

## Diario

- **2026-10-27** · W00–W02: repositorio Git creado y enlazado con GitHub; Tectonic movido a `tools/` (PDF de prueba recompilado e idéntico byte a byte al publicado); `leer_lote.py` parametrizado; comprobador y reparador de enlaces con dos pruebas nuevas. `npm test`: 343 de 343 pruebas superadas; 176 páginas sin enlaces rotos. Pendiente W03: faltan pypdf/pdfplumber en el Python del equipo, por lo que `build-pdfs.mjs` compila pero no termina su verificación.
- **2026-10-27** · W03–W04: dependencias de Python instaladas y `build-pdfs.mjs` completo de nuevo (PDF e informe sin cambios); Playwright y `scripts/test-browser.mjs`; CI en GitHub Actions en verde (web, Selectividad y navegador). W05 preparado en la rama `infra/w03-w04`. D01 cerrada; D02 en curso con el lienzo de la ronda 2.

- **2026-10-27** · Selectividad L026: ocho enunciados cotejados/clasificados;208 acumulados,21pruebas y215fuentes verificadas. PDF revisados y ZIP aislado compilado. [Informe](Selectividad_LaTeX/docs/lotes/L026_2016_suplemente_septiembre.md). [Fase posterior de soluciones](Selectividad_LaTeX/docs/FASE_SOLUCIONES.md) registrada tras nueva autorización. Se conserva el trabajo de Claude y se usan herramientas de tools/.

- **2026-10-27** · Selectividad L027: ocho enunciados cotejados/clasificados; 216 acumulados, 21 pruebas y 215 fuentes verificadas. PDF revisados y ZIP aislado compilado. [Informe](Selectividad_LaTeX/docs/lotes/L027_2017_suplemente_septiembre.md). [Fase posterior de soluciones](Selectividad_LaTeX/docs/FASE_SOLUCIONES.md) preparada. Se conserva el trabajo de Claude y se usan herramientas de tools/.

- **2026-10-27** · Selectividad L028: ocho enunciados cotejados/clasificados; 224 acumulados, 21 pruebas y 215 fuentes verificadas. PDF revisados y ZIP aislado compilado. [Informe](Selectividad_LaTeX/docs/lotes/L028_2018_suplente_junio.md). [Fase posterior de soluciones](Selectividad_LaTeX/docs/FASE_SOLUCIONES.md) preparada. Se conserva el trabajo de Claude y se usan herramientas de tools/.

- **2026-10-27** · Selectividad L029: ocho enunciados cotejados/clasificados; 232 acumulados, 21 pruebas y 215 fuentes verificadas. PDF revisados y ZIP aislado compilado. [Informe](Selectividad_LaTeX/docs/lotes/L029_2018_suplente_septiembre.md). [Fase posterior de soluciones](Selectividad_LaTeX/docs/FASE_SOLUCIONES.md) preparada. Se conserva el trabajo de Claude y se usan herramientas de tools/.
- **2026-10-27** · Fase 1 cerrada (D03–D05, lienzo de rondas 3 y 4). Fase 2: S01–S05 hechos y S06 a medias (tokens, fuentes, sprite, componentes y guía de estilo); 350/350 unitarias. W08 avanzada. Corregido además un fallo propio: desde W03, `npm test` no pasaba en local porque la prueba de visibilidad recorría `node_modules`.

- **2026-10-27** · Selectividad L030: ocho enunciados cotejados/clasificados; 240 acumulados, 21 pruebas y 215 fuentes verificadas. PDF revisados y ZIP aislado compilado. [Informe](Selectividad_LaTeX/docs/lotes/L030_2018_titular_junio.md). [Fase posterior de soluciones](Selectividad_LaTeX/docs/FASE_SOLUCIONES.md) preparada. Se conserva el trabajo de Claude y se usan herramientas de tools/.

- **2026-10-27** · Selectividad L031: ocho enunciados cotejados/clasificados; 248 acumulados, 21 pruebas y 215 fuentes verificadas. PDF revisados y ZIP aislado compilado. [Informe](Selectividad_LaTeX/docs/lotes/L031_2016_titular_junio.md). [Fase posterior de soluciones](Selectividad_LaTeX/docs/FASE_SOLUCIONES.md) preparada. Se conserva el trabajo de Claude y se usan herramientas de tools/.

- **2026-10-27** · Selectividad L032: ocho enunciados cotejados/clasificados;256 acumulados,21 pruebas,215 fuentes y558archivos previos verificados. Curso visible2016-2017 frente a texto oculto2015-2016. [Informe](Selectividad_LaTeX/docs/lotes/L032_2017_titular_junio.md). Trabajo de Claude conservado.

- **2026-10-27** · Selectividad L033: ocho enunciados cotejados y clasificados; 264 acumulados, 21 pruebas, 215 fuentes y 576 archivos previos verificados. Dos PDF revisados y ZIP aislado de 795 archivos compilado. INC-011/012 registradas; cero soluciones. [Informe](Selectividad_LaTeX/docs/lotes/L033_2018_titular_septiembre.md). Siguiente L034. Trabajo de Claude conservado.

- **2026-10-27** · Selectividad L034: ocho enunciados cotejados y clasificados; 272 acumulados,21 pruebas,215 fuentes y594 archivos previos verificados. Dos PDF revisados y ZIP aislado de818 archivos compilado. INC-013 registrada; cero soluciones. [Informe](Selectividad_LaTeX/docs/lotes/L034_2016_titular_septiembre.md). Siguiente L035. Trabajo de Claude conservado.

- **2026-10-27** · Selectividad L035: ocho enunciados cotejados y clasificados; 280 acumulados,21 pruebas,215 fuentes y612 archivos previos verificados. Dos PDF revisados y ZIP aislado de841 archivos compilado. Nuevas etiquetas urna-dinamica e igualdad-derivadas; cero soluciones. [Informe](Selectividad_LaTeX/docs/lotes/L035_2017_titular_septiembre.md). Siguiente L036. Trabajo de Claude conservado.

- **2026-10-27** · Selectividad L036: ocho enunciados cotejados y clasificados; 288 acumulados,21 pruebas,215 fuentes y630 archivos previos verificados. Dos PDF revisados y ZIP aislado de864 archivos compilado. Alias canónicos registrados y etiqueta comparacion-reposicion; cero soluciones. [Informe](Selectividad_LaTeX/docs/lotes/L036_2015_Ua1.md). Siguiente L037. Trabajo de Claude conservado.

- **2026-10-28** · Selectividad L037: ocho enunciados cotejados y clasificados; 296 acumulados,21 pruebas,215 fuentes y648 archivos previos verificados. Dos PDF revisados y ZIP aislado de887 archivos compilado. Alias canónicos registrados y etiquetas despeje-matricial/contraste-bilateral-media; cero soluciones. [Informe](Selectividad_LaTeX/docs/lotes/L037_2015_Ua2.md). Siguiente L038. Trabajo de Claude conservado.
- **2026-10-28** · L01–L02: cabecera, pie y portada con el nuevo diseño; modo oscuro y barra inferior limitados a páginas migradas. Revisado en Chrome (escritorio, móvil y oscuro) sin errores ni desbordamiento; 350/350 unitarias.

- **2026-10-28** · Selectividad L038: ocho enunciados cotejados y clasificados; 304 acumulados,21 pruebas,215 fuentes y666 archivos previos verificados. Dos PDF revisados y ZIP aislado de910 archivos compilado. Alias canónicos registrados y categorías verificadas; cero soluciones. [Informe](Selectividad_LaTeX/docs/lotes/L038_2015_Ua3.md). Siguiente L039. Trabajo de Claude conservado.

- **2026-10-28** · Selectividad L039: ocho enunciados cotejados y clasificados; 312 acumulados,21 pruebas,215 fuentes y684 archivos previos verificados. Dos PDF revisados y ZIP aislado de933 archivos compilado. Alias canónicos registrados y categorías verificadas; cero soluciones. [Informe](Selectividad_LaTeX/docs/lotes/L039_2015_Ua4.md). Siguiente L040. Trabajo de Claude conservado.

- **2026-10-28** · Selectividad L040: ocho enunciados cotejados y clasificados; 320 acumulados,21 pruebas,215 fuentes y702 archivos previos verificados. Dos PDF revisados y ZIP aislado de956 archivos compilado. Alias canónicos registrados y categorías verificadas; cero soluciones. [Informe](Selectividad_LaTeX/docs/lotes/L040_2015_Ua5.md). Siguiente L041. Trabajo de Claude conservado.

- **2026-10-28** · Selectividad L041: ocho enunciados cotejados y clasificados; 328 acumulados,21 pruebas,215 fuentes y720 archivos previos verificados. Dos PDF revisados y ZIP aislado de979 archivos compilado. Alias canónicos registrados y categorías verificadas; cero soluciones. [Informe](Selectividad_LaTeX/docs/lotes/L041_2015_Ua6.md). Siguiente L042. Trabajo de Claude conservado.

- **2026-10-28** · Selectividad L042: ocho enunciados cotejados y clasificados; 336 acumulados,21 pruebas,215 fuentes y738 archivos previos verificados. Dos PDF revisados y ZIP aislado de1002 archivos compilado. Procedencia y categorías verificadas; cero soluciones. [Informe](Selectividad_LaTeX/docs/lotes/L042_2014_ANDAL1.md). Siguiente L043. Trabajo de Claude conservado.

- **2026-10-28** · Selectividad L043: ocho enunciados cotejados y clasificados; 344 acumulados,21 pruebas,215 fuentes y756 archivos previos verificados. Dos PDF revisados y ZIP aislado de1025 archivos compilado. Procedencia y categorías verificadas; cero soluciones. [Informe](Selectividad_LaTeX/docs/lotes/L043_2014_ANDAL2.md). Siguiente L044. Trabajo de Claude conservado.

- **2026-10-28** · Selectividad L044: ocho enunciados cotejados y clasificados; 352 acumulados,21 pruebas,215 fuentes y774 archivos previos verificados. Dos PDF revisados y ZIP aislado de1048 archivos compilado. Procedencia y categorías verificadas; cero soluciones. [Informe](Selectividad_LaTeX/docs/lotes/L044_2014_ANDAL3.md). Siguiente L045. Trabajo de Claude conservado.

- **2026-10-28** · Selectividad L045: ocho enunciados cotejados y clasificados; 360 acumulados,21 pruebas,215 fuentes y792 archivos previos verificados. Dos PDF revisados y ZIP aislado de1071 archivos compilado. Procedencia y categorías verificadas; cero soluciones. [Informe](Selectividad_LaTeX/docs/lotes/L045_2014_ANDAL5.md). Siguiente L046. Trabajo de Claude conservado.
- **2026-10-28** · L03: índice del tema 7 con la plantilla de tema; comprobado en Chrome (escritorio, móvil, oscuro) y con 350/350 unitarias y 8 pruebas de navegador del tema 7, accesibilidad y visibilidad.
- **2026-10-28** · L04: plantilla de lección sobre la 7.1; Chrome en escritorio, móvil y oscuro sin errores ni desbordamiento; 350/350 unitarias y pruebas 11, 109, 125, 135 y 159. La 135 obligó a sacar anterior/siguiente de `main` (solo admite un `nav` etiquetado).
- **2026-10-28** · L05 (parte 1): feedback inmediato del motor de preguntas en páginas migradas; 350/350 unitarias y pruebas 02, 10, 11, 121 y 125.

- **2026-10-28** · Selectividad L046: ocho enunciados cotejados y clasificados; 368 acumulados,21 pruebas,215 fuentes y810 archivos previos verificados. Dos PDF revisados y ZIP aislado de1094 archivos compilado. Procedencia y categorías verificadas; cero soluciones. [Informe](Selectividad_LaTeX/docs/lotes/L046_2014_JUN.md). Siguiente L047. Trabajo de Claude conservado.

- **2026-10-28** · Selectividad L047: ocho enunciados cotejados y clasificados; 376 acumulados,21 pruebas,215 fuentes y828 archivos previos verificados. Dos PDF revisados y ZIP aislado de1117 archivos compilado. Procedencia y categorías verificadas; cero soluciones. [Informe](Selectividad_LaTeX/docs/lotes/L047_2014_SEPT.md). Siguiente L048. Trabajo de Claude conservado.

- **2026-10-28** · Selectividad L048: ocho enunciados cotejados y clasificados; 384 acumulados,21 pruebas,215 fuentes y846 archivos previos verificados. Dos PDF revisados y ZIP aislado de1140 archivos compilado. Procedencia y categorías verificadas; cero soluciones. [Informe](Selectividad_LaTeX/docs/lotes/L048_2013_RESERVA_A.md). Siguiente L049. Trabajo de Claude conservado.

- **2026-10-28** · Selectividad L049: ocho enunciados cotejados y clasificados;392 acumulados,21 pruebas,215 fuentes y864 archivos anteriores verificados. Dos PDF revisados y ZIP aislado de1163 archivos compilado. INC-018 documentada y filtros para relaciones comprobados; cero respuestas. [Informe](Selectividad_LaTeX/docs/lotes/L049_2013_RESERVA_B.md). Siguiente L050. Trabajo web de Claude conservado.

- **2026-10-28** · Selectividad L050:ocho enunciados cotejados y clasificados;400 acumulados,21 pruebas,215 fuentes y882 archivos anteriores verificados. Dos PDF revisados y ZIP aislado de1186 archivos compilado. Filtros para relaciones comprobados;sin respuestas ni incidencias nuevas. [Informe](Selectividad_LaTeX/docs/lotes/L050_2013_TITULAR_JUNIO.md). Siguiente L051. Trabajo web de Claude conservado.

- **2026-10-28** · Selectividad L051:ocho enunciados cotejados y clasificados;408 acumulados,21 pruebas,215 fuentes y900 archivos anteriores verificados. Dos PDF revisados y ZIP aislado de1209 archivos compilado. Filtros para relaciones comprobados;sin respuestas ni incidencias nuevas. [Informe](Selectividad_LaTeX/docs/lotes/L051_2013_RESERVA_A_SEPTIEMBRE.md). Siguiente L052. Trabajo web de Claude conservado.

- **2026-10-28** · Selectividad L052:ocho enunciados cotejados y clasificados;416 acumulados,21 pruebas,215 fuentes y918 archivos anteriores verificados. Dos PDF revisados y ZIP aislado de1232 archivos compilado. Filtros para relaciones comprobados;sin respuestas;INC-019 documentada. [Informe](Selectividad_LaTeX/docs/lotes/L052_2013_RESERVA_B_SEPTIEMBRE.md). Siguiente L053. Trabajo web de Claude conservado.

- **2026-10-28** · Selectividad L053:ocho enunciados cotejados y clasificados;424 acumulados,21 pruebas,215 fuentes y936 archivos anteriores verificados. Dos PDF revisados y ZIP aislado de1255 archivos compilado. Filtros para relaciones comprobados;sin respuestas ni incidencias nuevas. [Informe](Selectividad_LaTeX/docs/lotes/L053_2013_TITULAR_SEPTIEMBRE.md). Siguiente L054. Trabajo web de Claude conservado.

- **2026-10-29** · Selectividad L054:ocho enunciados cotejados y clasificados;432 acumulados,21 pruebas,215 fuentes y954 archivos anteriores verificados. Dos PDF revisados y ZIP aislado de1278 archivos compilado. Filtros para relaciones comprobados;sin respuestas;INC-020 documentada. [Informe](Selectividad_LaTeX/docs/lotes/L054_2011_EXAMEN_4.md). Siguiente L055. Trabajo web de Claude conservado.

- **2026-10-29** · Selectividad L055:ocho enunciados cotejados y clasificados;440 acumulados,21 pruebas,215 fuentes y972 archivos anteriores verificados. Dos PDF revisados y ZIP aislado de1301 archivos compilado. Filtros para relaciones comprobados;sin respuestas ni incidencias nuevas. [Informe](Selectividad_LaTeX/docs/lotes/L055_2011_EXAMEN_6.md). Siguiente L056. Trabajo web de Claude conservado.

- **2026-10-29** · Selectividad L056:ocho enunciados cotejados y clasificados;448 acumulados,21 pruebas,215 fuentes y990 archivos anteriores verificados. Dos PDF revisados y ZIP aislado de1324 archivos compilado. Sin respuestas. Homónimo preidentificado como reedición de L054 para revisar en L057 sin duplicados. [Informe](Selectividad_LaTeX/docs/lotes/L056_2011_EXAMEN_1.md). Trabajo web de Claude conservado.

- **2026-10-29** · Selectividad L057 cerrada como reedición de L054:ocho correspondencias CSV y enlaces individuales,sin duplicar los448 ejercicios. 57/84 candidatos cerrados,27pendientes;56exámenes canónicos. 21pruebas,215fuentes y1008archivos anteriores verificados;ZIP aislado compilado. [Informe](Selectividad_LaTeX/docs/lotes/L057_2011_REEDICION_EXAMEN_4.md). Siguiente L058;sin cambios en la web de Claude.

- **2026-10-29** · Selectividad L058:ocho enunciados cotejados y clasificados;456 únicos,58/84 candidatos cerrados y26 pendientes. 21pruebas,215fuentes y1008archivos anteriores verificados;equivalencias L057 conservadas. Dos PDF revisados y ZIP aislado de1351archivos compilado. [Informe](Selectividad_LaTeX/docs/lotes/L058_2011_EXAMEN_5.md). Siguiente L059;sin respuestas ni cambios en la web de Claude.

- **2026-10-29** · Selectividad L059:ocho enunciados cotejados y clasificados;464 únicos,59/84 candidatos cerrados y25 pendientes. 21pruebas,215fuentes y1026archivos anteriores verificados;equivalencias L057 conservadas. Dos PDF revisados y ZIP aislado de1374archivos compilado. [Informe](Selectividad_LaTeX/docs/lotes/L059_2011_EXAMEN_2.md). Siguiente L060;sin respuestas ni cambios en la web de Claude.

- **2026-10-29** · Selectividad L060:ocho enunciados cotejados y clasificados;472 únicos,60/84 candidatos cerrados y24 pendientes. 21pruebas,215fuentes y1044archivos anteriores verificados;equivalencias L057 conservadas. Dos PDF revisados y ZIP aislado de1397archivos compilado. [Informe](Selectividad_LaTeX/docs/lotes/L060_2011_EXAMEN_3.md). Siguiente L061;sin respuestas ni cambios en la web de Claude.

- **2026-10-29** · Selectividad L061:ocho enunciados cotejados y clasificados;480 únicos,61/84 candidatos cerrados y23 pendientes. 21pruebas,215fuentes y1062archivos anteriores verificados;equivalencias L057 conservadas. Dos PDF revisados y ZIP aislado de1420archivos compilado. [Informe](Selectividad_LaTeX/docs/lotes/L061_2010_EXAMEN_5.md). Siguiente L062;sin respuestas ni cambios en la web de Claude.

- **2026-10-29** · Selectividad L062:ocho enunciados cotejados y clasificados;488 únicos,62/84 candidatos cerrados y22 pendientes. 21pruebas,215fuentes y1080archivos anteriores verificados;equivalencias L057 conservadas. Dos PDF revisados y ZIP aislado de1443archivos compilado. [Informe](Selectividad_LaTeX/docs/lotes/L062_2010_EXAMEN_4.md). Siguiente L063;sin respuestas ni cambios en la web de Claude.

- **2026-10-29** · Selectividad L063:ocho enunciados cotejados y clasificados;496 únicos,63/84 candidatos cerrados y21 pendientes. 21pruebas,215fuentes y1098archivos anteriores verificados;equivalencias L057 conservadas. Dos PDF revisados y ZIP aislado de1466archivos compilado. [Informe](Selectividad_LaTeX/docs/lotes/L063_2010_EXAMEN_6.md). Siguiente L064;sin respuestas ni cambios en la web de Claude.

- **2026-10-29** · Selectividad L064:ocho enunciados cotejados y clasificados;504 únicos,64/84 candidatos cerrados y20 pendientes. 21pruebas,215fuentes y1116archivos anteriores verificados;equivalencias L057 conservadas. Dos PDF revisados y ZIP aislado de1489archivos compilado. [Informe](Selectividad_LaTeX/docs/lotes/L064_2010_EXAMEN_3.md). Siguiente L065;sin respuestas ni cambios en la web de Claude.

- **2026-11-05** · Selectividad L065:ocho enunciados cotejados y clasificados;512 únicos,65/84 candidatos cerrados y19 pendientes. 21pruebas,215fuentes y1134archivos anteriores verificados;equivalencias L057 conservadas. Dos PDF revisados y ZIP aislado de1512archivos compilado. [Informe](Selectividad_LaTeX/docs/lotes/L065_2010_EXAMEN_1.md). Siguiente L066;sin respuestas ni cambios en la web de Claude.

- **2026-11-05** · Selectividad L066:ocho enunciados cotejados y clasificados;520 únicos,66/84 candidatos cerrados y18 pendientes. 21pruebas,215fuentes y1152archivos anteriores verificados;equivalencias L057 conservadas. Dos PDF revisados y ZIP aislado de1535archivos compilado. [Informe](Selectividad_LaTeX/docs/lotes/L066_2010_EXAMEN_2.md). Siguiente L067;sin respuestas ni cambios en la web de Claude.

- **2026-11-05** · L067:seis ejercicios originales cotejados y clasificados;526 únicos,67/84 candidatos cerrados y17 pendientes. Partes I/II conservadas;21pruebas y1170archivos anteriores intactos. Dos PDF revisados y ZIP aislado compilado. [Informe](Selectividad_LaTeX/docs/lotes/L067_2009_CCSS01.md). Siguiente L068;sin soluciones ni cambios en implementación web.

- **2026-11-05** · L068:seis ejercicios originales cotejados y clasificados;532 únicos,68/84 candidatos cerrados y16 pendientes. Partes I/II conservadas;21pruebas y1184archivos anteriores intactos. Dos PDF revisados y ZIP aislado compilado. [Informe](Selectividad_LaTeX/docs/lotes/L068_2009_CCSS02.md). Siguiente L069;sin soluciones ni cambios en implementación web.

- **2026-11-05** · L069:seis ejercicios originales cotejados y clasificados;538 únicos,69/84 candidatos cerrados y15 pendientes. Partes I/II conservadas;21pruebas y1198archivos anteriores intactos. Dos PDF revisados y ZIP aislado compilado. [Informe](Selectividad_LaTeX/docs/lotes/L069_2009_CCSS03.md). Siguiente L070;sin soluciones ni cambios en implementación web.

- **2026-11-05** · L070:seis ejercicios originales cotejados y clasificados;544 únicos,70/84 candidatos cerrados y14 pendientes. Partes I/II conservadas;21pruebas y1212archivos anteriores intactos. Dos PDF revisados y ZIP aislado compilado. [Informe](Selectividad_LaTeX/docs/lotes/L070_2009_CCSS04.md). Siguiente L071;sin soluciones ni cambios en implementación web.

- **2026-11-05** · L071:seis ejercicios originales cotejados y clasificados;550 únicos,71/84 candidatos cerrados y13 pendientes. Partes I/II conservadas;21pruebas y1226archivos anteriores intactos. Dos PDF revisados y ZIP aislado compilado. [Informe](Selectividad_LaTeX/docs/lotes/L071_2009_CCSS05.md). Siguiente L072;sin soluciones ni cambios en implementación web.

- **2026-11-06** · L072:seis ejercicios originales cotejados y clasificados;556 únicos,72/84 candidatos cerrados y12 pendientes. Partes I/II conservadas;21pruebas y1240archivos anteriores intactos. Dos PDF revisados y ZIP aislado compilado. [Informe](Selectividad_LaTeX/docs/lotes/L072_2009_CCSS06.md). Siguiente L073;sin soluciones ni cambios en implementación web.

- **2026-11-06** · L073:seis ejercicios originales cotejados y clasificados;562 únicos,73/84 candidatos cerrados y11 pendientes. Partes I/II conservadas;21pruebas y1254archivos anteriores intactos. Dos PDF revisados y ZIP aislado compilado. [Informe](Selectividad_LaTeX/docs/lotes/L073_2008_CCSS01.md). Siguiente L074;sin soluciones ni cambios en implementación web.

- **2026-11-06** · L074:seis ejercicios originales cotejados y clasificados;568 únicos,74/84 candidatos cerrados y10 pendientes. Partes I/II conservadas;21pruebas y1268archivos anteriores intactos. Dos PDF revisados y ZIP aislado compilado. [Informe](Selectividad_LaTeX/docs/lotes/L074_2008_CCSS02.md). Siguiente L075;sin soluciones ni cambios en implementación web.

- **2026-11-06** · L075:seis ejercicios originales cotejados y clasificados;574 únicos,75/84 candidatos cerrados y9 pendientes. Partes I/II conservadas;21pruebas y1282archivos anteriores intactos. Dos PDF revisados y ZIP aislado compilado. [Informe](Selectividad_LaTeX/docs/lotes/L075_2008_CCSS03.md). Siguiente L076;sin soluciones ni cambios en implementación web.

- **2026-11-06** · L076:seis ejercicios originales cotejados y clasificados;580 únicos,76/84 candidatos cerrados y8 pendientes. Partes I/II conservadas;21pruebas y1296archivos anteriores intactos. Dos PDF revisados y ZIP aislado compilado. [Informe](Selectividad_LaTeX/docs/lotes/L076_2008_CCSS04.md). Siguiente L077;sin soluciones ni cambios en implementación web.

- **2026-11-06** · L077:seis ejercicios originales cotejados y clasificados;586 únicos,77/84 candidatos cerrados y7 pendientes. Partes I/II conservadas;21pruebas y1310archivos anteriores intactos. Dos PDF revisados y ZIP aislado compilado. [Informe](Selectividad_LaTeX/docs/lotes/L077_2008_CCSS05.md). Siguiente L078;sin soluciones ni cambios en implementación web.

- **2026-11-06** · L078:seis ejercicios originales cotejados y clasificados;592 únicos,78/84 candidatos cerrados y6 pendientes. Partes I/II conservadas;21pruebas y1324archivos anteriores intactos. Dos PDF revisados y ZIP aislado compilado. [Informe](Selectividad_LaTeX/docs/lotes/L078_2008_CCSS06.md). Siguiente L079;sin soluciones ni cambios en implementación web.
- **2026-11-06** · L05 (parte 2): páginas de test, tarjetas, practicar y laboratorios con el nuevo diseño; 350/350 unitarias y 15 pruebas de navegador. Corregido un fallo propio: el feedback en flex partía el texto con fórmulas en columnas y desbordaba a 390 px (review-07).
- **2026-11-06** · L08, tema 7: todas sus páginas migradas; 29/29 pruebas de navegador del tema (112 actualizada a 10 apartados; 124 esperaba al caso antes de leerlo).
- **2026-11-06** · L08, tema 1: índice con la plantilla de tema y 18 lecciones migradas; índice lateral generado y cajas deducidas del título; 350/350 unitarias y 12 pruebas de navegador, sin desbordamiento a 1280 ni 390 px.
- **2026-11-06** · L08, temas 2 y 3 migrados. A 320 px con texto al 200 % las cajas anidadas robaban ancho: una fórmula se volvía desplazable (Tab la alcanzaba antes que «Comprobar», prueba 26) y un selector desbordaba (17). Con texto ampliado en móvil la caja se aplana, los controles no superan el ancho y las filas `.actions` encogen. 350/350 unitarias y 33 pruebas de navegador.
- **2026-11-06** · L08, temas 4 y 5 migrados; 32/33 pruebas a la primera y la 54 intermitente (anotada en W08).
- **2026-11-06** · L08, temas 6, 8 y 9 migrados: los nueve temas del libro ya usan el nuevo diseño. En móvil el índice de apartados es un desplegable y las pruebas 71–74 lo abren antes de usarlo; el recorrido de tema se ve como tarjetas y las pruebas 100–106 aceptan ese formato. El estilo del recorrido ya no depende de la clase `mc-route`. 350/350 unitarias.
- **2026-11-06** · Ramas de diseño fusionadas en `main` (avance rápido, a petición del docente; el envío sigue pendiente de credenciales). Ejercicios resueltos de nuevo en el recorrido de los temas 7 y 9; W08: resueltas 90, 92 y 94 (la 90 tenía un dato erróneo, la página da el valor exacto).
- **2026-11-06** · L08: índice del libro y contenidos de apoyo con el nuevo diseño; el índice de apoyos enlaza por fin sus páginas. W08: 25 estabilizada; 79 y 80 pasan.
- **2026-11-06** · L08: juegos (27 páginas anfitrionas), lecturas de preguntas y páginas generales migradas; todo el sitio usa ya el nuevo diseño salvo el interior de los juegos. W08: causa real de la 54 encontrada y corregida.
- **2026-11-07** · L08 cerrada: cabecera ilustrada en los índices de los temas 2–6, 8 y 9. W08: la 93 contaba el recorrido del tema 9 sin los ejercicios resueltos (ahora 10); la 26 suponía que un Tab lleva de la opción a «Comprobar», pero con algunos ejercicios aleatorios una fórmula de 264 px no cabe a 320 px y 200 % y es desplazable y enfocable (correcto para el teclado): ahora avanza con Tab hasta el botón.

- **2026-11-07** · L079:ocho ejercicios originales cotejados y clasificados;600 únicos,79/84 candidatos cerrados y5 pendientes. DOC convertidos y cotejados;21pruebas y1338archivos anteriores intactos. Dos PDF revisados y ZIP aislado compilado. [Informe](Selectividad_LaTeX/docs/lotes/L079_2012_EXAMEN_1.md). Siguiente L080;sin soluciones ni cambios en implementación web.

- **2026-11-07** · L080:ocho ejercicios originales cotejados y clasificados;608 únicos,80/84 candidatos cerrados y4 pendientes. DOC convertidos y cotejados;21pruebas y1356archivos anteriores intactos. Dos PDF revisados y ZIP aislado compilado. [Informe](Selectividad_LaTeX/docs/lotes/L080_2012_EXAMEN_5.md). Siguiente L081;sin soluciones ni cambios en implementación web.

- **2026-11-07** · L081:ocho ejercicios originales cotejados y clasificados;616 únicos,81/84 candidatos cerrados y3 pendientes. DOC convertidos y cotejados;21pruebas y1374archivos anteriores intactos. Dos PDF revisados y ZIP aislado compilado. [Informe](Selectividad_LaTeX/docs/lotes/L081_2012_EXAMEN_2.md). Siguiente L082;sin soluciones ni cambios en implementación web.

- **2026-11-07** · L082:ocho ejercicios originales cotejados y clasificados;624 únicos,82/84 candidatos cerrados y2 pendientes. DOC convertidos y cotejados;21pruebas y1392archivos anteriores intactos. Dos PDF revisados y ZIP aislado compilado. [Informe](Selectividad_LaTeX/docs/lotes/L082_2012_EXAMEN_4.md). Siguiente L083;sin soluciones ni cambios en implementación web.

- **2026-11-07** · L083:ocho ejercicios originales cotejados y clasificados;632 únicos,83/84 candidatos cerrados y1 pendiente. DOC convertidos y cotejados;21pruebas y1410archivos anteriores intactos. Dos PDF revisados y ZIP aislado compilado. [Informe](Selectividad_LaTeX/docs/lotes/L083_2012_EXAMEN_3.md). Siguiente L084;sin soluciones ni cambios en implementación web.
- **2026-11-07** · P01 hecha: biblioteca de exámenes con búsqueda y filtros, y página Recursos. Corregidas las cabeceras de los temas 6, 8 y 9: decían «3 juegos», pero esos juegos son esbozos de P07 (no figuran en laboratorios).
- **2026-11-07** · P06 (parte): glosario de 42 términos generado desde tarjetas revisadas y enlazado desde las lecciones. Los enlaces de la franja se anuncian «Término (glosario)» para no repetir el nombre de un apartado del índice. Pruebas 110–118 al día: contaban 10 elementos en el recorrido del tema 7 (ahora 11, con los ejercicios resueltos).
- **2026-11-07** · P06 (parte): formulario de 82 fórmulas por tema, copiadas de las lecciones y comprobadas contra ellas al generar; Herramientas deja de ser un marcador. 359 unitarias; 11, 160, 161 y 162 pasan (11 es intermitente desde antes).
- **2026-11-07** · P06 terminada: tarjetas con búsqueda, apartado uniforme, autoevaluación y repaso de las marcadas en la sesión. 361 unitarias; 47 pruebas de navegador de tarjetas pasan.
- **2026-11-07** · P02 terminada: Combinatoria migrada al apoyo con calculadora exacta, seis ejercicios y test de diez preguntas; matriz de cobertura de fuentes cerrada (43 de 44 integrados). 365 unitarias; 164 y 162 pasan.
- **2026-11-07** · Selectividad en la web planificada (P08 concretada, P09 relaciones y P10 exámenes). Decidido: PDF por impresión + LaTeX, soluciones ocultas hasta activarlas, formato de la PAU vigente (falta modelo) y no publicar las tarjetas hasta completar la identificación.
- **2026-11-07** · Formato de la PAU vigente documentado a partir de las orientaciones 2025-26 que aporta el docente: estructura, notación, criterios, cobertura del banco y reglas propuestas para el generador. P10 deja de estar bloqueada.
- **2026-11-07** · P08 hecho en `feature/selectividad`, sin publicar: banco de 640 ejercicios en tarjetas por tema con filtros, 72 soluciones validadas ocultas hasta que el docente las active y enlaces desde las lecciones. 370 unitarias; 165, 158, 159, 11, 160, 121 y la de fórmulas pasan.

- **2026-11-07** · L084:ocho ejercicios originales cotejados y clasificados;640 únicos,84/84 candidatos cerrados y0 pendientes. DOC convertidos y cotejados;21pruebas y1428archivos anteriores intactos. Dos PDF revisados y ZIP aislado compilado. [Informe](Selectividad_LaTeX/docs/lotes/L084_2012_EXAMEN_6.md). Primera pasada completada;revisión de incidencias y soluciones posteriores;sin soluciones ni cambios en implementación web.

- **2026-11-07** · S001:dos soluciones explicadas y validadas,638 pendientes;640 enunciados intactos. Tres pasadas del mismo autor, comprobación matemática exacta,22 pruebas, PDF revisados y ZIP aislado. [Informe](Selectividad_LaTeX/docs/soluciones/S001_2019_A1_A2.md). Siguiente S002; sin cambios en implementación web.

- **2026-11-07** · S002:seis soluciones explicadas y validadas,632 pendientes;640 enunciados intactos. Tres pasadas del mismo autor, comprobación matemática exacta,22 pruebas, PDF revisados y ZIP aislado. [Informe](Selectividad_LaTeX/docs/soluciones/S002_2019_RESTO_EXAMEN.md). Siguiente S003; sin cambios en implementación web.

- **2026-11-07** · S003:ocho soluciones de EXA-0002 explicadas y validadas;16 acumuladas y624 pendientes. Tres pasadas del mismo autor,22 pruebas, dos PDF revisados y ZIP aislado.640 enunciados intactos. [Informe](Selectividad_LaTeX/docs/soluciones/S003_2019_SEPTIEMBRE.md). Siguiente S004; sin cambios en implementación web.

- **2026-11-07** · S004: ocho soluciones de EXA-0003 explicadas y validadas;24 acumuladas y616 pendientes. Tres pasadas del mismo autor,22 pruebas, PDF revisados y ZIP aislado.640 enunciados intactos; sin cambios en implementación web. [Informe](Selectividad_LaTeX/docs/soluciones/S004_2019_SUPLENTE_JUNIO.md). Siguiente S005.

- **2026-11-07** · S005: ocho soluciones de EXA-0004 explicadas y validadas;32 acumuladas y608 pendientes. Tres pasadas del mismo autor,22 pruebas, PDF revisados y ZIP aislado.640 enunciados intactos; sin cambios en implementación web. [Informe](Selectividad_LaTeX/docs/soluciones/S005_2019_SUPLENTE_SEPTIEMBRE.md). Siguiente S006.

- **2026-11-07** · S006: ocho soluciones de EXA-0005 explicadas y validadas;40 acumuladas y600 pendientes. Tres pasadas del mismo autor,22 pruebas, PDF revisados y ZIP aislado.640 enunciados intactos; sin cambios en implementación web. [Informe](Selectividad_LaTeX/docs/soluciones/S006_2019_RESERVA_A.md). Siguiente S007.

- **2026-11-07** · S007: ocho soluciones de EXA-0006 explicadas y validadas;48 acumuladas y592 pendientes. Tres pasadas del mismo autor,22 pruebas, PDF revisados y ZIP aislado.640 enunciados intactos; sin cambios en implementación web. [Informe](Selectividad_LaTeX/docs/soluciones/S007_2019_RESERVA_B.md). Siguiente S008.

- **2026-11-07** · S008: ocho soluciones de EXA-0007 explicadas y validadas;56 acumuladas y584 pendientes. Tres pasadas del mismo autor,22 pruebas, PDF revisados y ZIP aislado.640 enunciados intactos; sin cambios en implementación web. [Informe](Selectividad_LaTeX/docs/soluciones/S008_2021_ORDINARIA.md). Siguiente S009.

- **2026-11-07** · S009: ocho soluciones de EXA-0008 explicadas y validadas;64 acumuladas y576 pendientes. Tres pasadas del mismo autor,22 pruebas, PDF revisados y ZIP aislado.640 enunciados intactos; sin cambios en implementación web. [Informe](Selectividad_LaTeX/docs/soluciones/S009_2021_ORD_SUPLENTE.md). Siguiente S010.
- **2026-11-08** · Trabajo de la herramienta de Selectividad confirmado a petición del docente en la rama `selectividad/banco` (desde `main`): 640 enunciados, 72 soluciones validadas, PDF, informes y herramientas; 22 pruebas del banco pasan. Fusionado en `feature/selectividad`, cuyas páginas coinciden ya con lo confirmado.

- **2026-11-08** · S010: ocho soluciones de EXA-0009 explicadas y validadas;72 acumuladas y568 pendientes. Tres pasadas del mismo autor,22 pruebas, PDF revisados y ZIP aislado.640 enunciados intactos; sin cambios en implementación web. [Informe](Selectividad_LaTeX/docs/soluciones/S010_2021_ORD_RESERVA.md). Siguiente S011.

- **2026-11-08** · S011: ocho soluciones de EXA-0010 explicadas y validadas;80 acumuladas y560 pendientes. Tres pasadas del mismo autor,22 pruebas, PDF revisados y ZIP aislado.640 enunciados intactos; sin cambios en implementación web. [Informe](Selectividad_LaTeX/docs/soluciones/S011_2021_EXTRAORDINARIA.md). Siguiente S012.
- **2026-11-08** · P09 hecho en `feature/selectividad`: generador de relaciones con selección reproducible por semilla, vista de impresión, LaTeX autónomo y proyecto para Overleaf con la estructura del banco; compilados con Tectonic. Pruebas 166 y unitarias de relaciones.

- **2026-11-08** · S012: ocho soluciones de EXA-0011 explicadas y validadas;88 acumuladas y552 pendientes. Tres pasadas del mismo autor,22 pruebas, PDF revisados y ZIP aislado.640 enunciados intactos; sin cambios en implementación web. [Informe](Selectividad_LaTeX/docs/soluciones/S012_2021_EXTRA_SUPLENTE.md). Siguiente S013.

- **2026-11-08** · S013: ocho soluciones de EXA-0012 explicadas y validadas;96 acumuladas y544 pendientes. Tres pasadas del mismo autor,22 pruebas, PDF revisados y ZIP aislado.640 enunciados intactos; sin cambios en implementación web. [Informe](Selectividad_LaTeX/docs/soluciones/S013_2021_EXTRA_RESERVA_B.md). Siguiente S014.

- **2026-11-08** · S014: ocho soluciones de EXA-0013 explicadas y validadas;104 acumuladas y536 pendientes. Tres pasadas del mismo autor,22 pruebas, PDF revisados y ZIP aislado.640 enunciados intactos; sin cambios en implementación web. [Informe](Selectividad_LaTeX/docs/soluciones/S014_2020_PA.md). Siguiente S015.

- **2026-11-08** · S015: ocho soluciones de EXA-0014 explicadas y validadas;112 acumuladas y528 pendientes. Tres pasadas del mismo autor,22 pruebas, PDF revisados y ZIP aislado.640 enunciados intactos; sin cambios en implementación web. [Informe](Selectividad_LaTeX/docs/soluciones/S015_2020_PB.md). Siguiente S016.

- **2026-11-08** · S016: ocho soluciones de EXA-0015 explicadas y validadas;120 acumuladas y520 pendientes. Tres pasadas del mismo autor,22 pruebas, PDF revisados y ZIP aislado.640 enunciados intactos; sin cambios en implementación web. [Informe](Selectividad_LaTeX/docs/soluciones/S016_2020_PC.md). Siguiente S017.

- **2026-11-08** · S017: ocho soluciones de EXA-0016 explicadas y validadas;128 acumuladas y512 pendientes. Tres pasadas del mismo autor,22 pruebas, PDF revisados y ZIP aislado.640 enunciados intactos; sin cambios en implementación web. [Informe](Selectividad_LaTeX/docs/soluciones/S017_2020_PD.md). Siguiente S018.

- **2026-11-08** · S018: ocho soluciones de EXA-0017 explicadas y validadas;136 acumuladas y504 pendientes. Tres pasadas del mismo autor,22 pruebas, PDF revisados y ZIP aislado.640 enunciados intactos; sin cambios en implementación web. [Informe](Selectividad_LaTeX/docs/soluciones/S018_2020_PE.md). Siguiente S019.

- **2026-11-08** · S019: ocho soluciones de EXA-0018 explicadas y validadas;144 acumuladas y496 pendientes. Tres pasadas del mismo autor,22 pruebas, PDF revisados y ZIP aislado.640 enunciados intactos; sin cambios en implementación web. [Informe](Selectividad_LaTeX/docs/soluciones/S019_2020_PF.md). Siguiente S020.

- **2026-11-08** · S020 cerrada con ocho soluciones de EXA-0019. El banco suma 152 validadas y 488 pendientes. [Informe](Selectividad_LaTeX/docs/soluciones/S020_2018_RESERVA_A.md).

- **2026-11-08** · S021 cerrada con ocho soluciones de EXA-0020. El banco suma 160 validadas y 480 pendientes. [Informe](Selectividad_LaTeX/docs/soluciones/S021_2018_RESERVA_B.md).

- **2026-11-08** · S022 cerrada con ocho soluciones de EXA-0021. El banco suma 168 validadas y 472 pendientes. [Informe](Selectividad_LaTeX/docs/soluciones/S022_2017_RESERVA_A.md).

- **2026-11-08** · S023 cerrada con ocho soluciones de EXA-0022. El banco suma 176 validadas y 464 pendientes. [Informe](Selectividad_LaTeX/docs/soluciones/S023_2016_RESERVA_A.md).

- **2026-11-08** · S024 cerrada con ocho soluciones de EXA-0023. El banco suma 184 validadas y 456 pendientes. [Informe](Selectividad_LaTeX/docs/soluciones/S024_2016_RESERVA_B.md).

- **2026-11-08** · S025 cerrada con ocho soluciones de EXA-0024. El banco suma 192 validadas y 448 pendientes. [Informe](Selectividad_LaTeX/docs/soluciones/S025_2017_RESERVA_B.md).

- **2026-11-08** · S026 cerrada con ocho soluciones de EXA-0025. El banco suma 200 validadas y 440 pendientes. [Informe](Selectividad_LaTeX/docs/soluciones/S026_2017_EXA0025.md).

- **2026-11-08** · S027 cerrada con ocho soluciones de EXA-0026. El banco suma 208 validadas y 432 pendientes. [Informe](Selectividad_LaTeX/docs/soluciones/S027_2016_EXA0026.md).

- **2026-11-08** · S028 cerrada con ocho soluciones de EXA-0027. El banco suma 216 validadas y 424 pendientes. [Informe](Selectividad_LaTeX/docs/soluciones/S028_2017_EXA0027.md).

- **2026-11-09** · S029 cerrada con ocho soluciones de EXA-0028. El banco suma 224 validadas y 416 pendientes. [Informe](Selectividad_LaTeX/docs/soluciones/S029_2018_SUPLENTE.md).

- **2026-11-09** · S030 cerrada con ocho soluciones de EXA-0029. El banco suma 232 validadas y 408 pendientes. [Informe](Selectividad_LaTeX/docs/soluciones/S030_2018_EXA0029.md).

- **2026-11-09** · S031 cerrada con ocho soluciones de EXA-0030. El banco suma 240 validadas y 400 pendientes. [Informe](Selectividad_LaTeX/docs/soluciones/S031_2018_EXA0030.md).

- **2026-11-09** · S032 cerrada con ocho soluciones de EXA-0031. El banco suma 248 validadas y 392 pendientes. [Informe](Selectividad_LaTeX/docs/soluciones/S032_2016_EXA0031.md).

- **2026-11-09** · S033 cerrada con ocho soluciones de EXA-0032. El banco suma 256 validadas y 384 pendientes. [Informe](Selectividad_LaTeX/docs/soluciones/S033_2017_EXA0032.md).

- **2026-11-09** · S034 cerrada con ocho soluciones de EXA-0033. El banco suma 264 validadas y 376 pendientes. [Informe](Selectividad_LaTeX/docs/soluciones/S034_2018_EXA0033.md).

- **2026-11-09** · S035 cerrada con ocho soluciones de EXA-0034. El banco suma 272 validadas y 368 pendientes. [Informe](Selectividad_LaTeX/docs/soluciones/S035_2016_EXA0034.md).

- **2026-11-09** · S036 cerrada con ocho soluciones de EXA-0035. El banco suma 280 validadas y 360 pendientes. [Informe](Selectividad_LaTeX/docs/soluciones/S036_2017_EXA0035.md).

- **2026-11-09** · S037 cerrada con ocho soluciones de EXA-0036. El banco suma 288 validadas y 352 pendientes. [Informe](Selectividad_LaTeX/docs/soluciones/S037_2015_EXA0036.md).

- **2026-11-09** · S038 cerrada con ocho soluciones de EXA-0037. El banco suma 296 validadas y 344 pendientes. [Informe](Selectividad_LaTeX/docs/soluciones/S038_2015_EXA0037.md).

- **2026-11-09** · S039 cerrada con ocho soluciones de EXA-0038. El banco suma 304 validadas y 336 pendientes. [Informe](Selectividad_LaTeX/docs/soluciones/S039_2015_EXA0038.md).

- **2026-11-09** · S040 cerrada con ocho soluciones de EXA-0039. El banco suma 312 validadas y 328 pendientes. [Informe](Selectividad_LaTeX/docs/soluciones/S040_2015_EXA0039.md).

- **2026-11-09** · S041 cerrada con ocho soluciones de EXA-0040. El banco suma 320 validadas y 320 pendientes. [Informe](Selectividad_LaTeX/docs/soluciones/S041_2015_EXA0040.md).

- **2026-11-09** · S042 cerrada con ocho soluciones de EXA-0041. El banco suma 328 validadas y 312 pendientes. [Informe](Selectividad_LaTeX/docs/soluciones/S042_2015_EXA0041.md).

- **2026-11-09** · S043 cerrada con ocho soluciones de EXA-0042. El banco suma 336 validadas y 304 pendientes. [Informe](Selectividad_LaTeX/docs/soluciones/S043_2014_EXA0042.md).

- **2026-11-09** · S044 cerrada con ocho soluciones de EXA-0043. El banco suma 344 validadas y 296 pendientes. [Informe](Selectividad_LaTeX/docs/soluciones/S044_2014_EXA0043.md).

- **2026-11-09** · S045 cerrada con ocho soluciones de EXA-0044. El banco suma 352 validadas y 288 pendientes. [Informe](Selectividad_LaTeX/docs/soluciones/S045_2014_EXA0044.md).

- **2026-11-09** · S046 cerrada con ocho soluciones de EXA-0045. El banco suma 360 validadas y 280 pendientes. [Informe](Selectividad_LaTeX/docs/soluciones/S046_2014_EXA0045.md).

- **2026-11-09** · S047 cerrada con ocho soluciones de EXA-0046. El banco suma 368 validadas y 272 pendientes. [Informe](Selectividad_LaTeX/docs/soluciones/S047_2014_EXA0046.md).

- **2026-11-09** · S048 cerrada con ocho soluciones de EXA-0047. El banco suma 376 validadas y 264 pendientes. [Informe](Selectividad_LaTeX/docs/soluciones/S048_2014_EXA0047.md).

- **2026-11-09** · S049 cerrada con ocho soluciones de EXA-0048. El banco suma 384 validadas y 256 pendientes. [Informe](Selectividad_LaTeX/docs/soluciones/S049_2013_EXA0048.md).

- **2026-11-09** · S050 cerrada con ocho soluciones de EXA-0049. El banco suma 392 validadas y 248 pendientes. [Informe](Selectividad_LaTeX/docs/soluciones/S050_2013_EXA0049.md).

- **2026-11-09** · S051 cerrada con ocho soluciones de EXA-0050. El banco suma 400 validadas y 240 pendientes. [Informe](Selectividad_LaTeX/docs/soluciones/S051_2013_EXA0050.md).

- **2026-11-09** · S052 cerrada con ocho soluciones de EXA-0051. El banco suma 408 validadas y 232 pendientes. [Informe](Selectividad_LaTeX/docs/soluciones/S052_2013_EXA0051.md).

- **2026-11-09** · S053 cerrada con ocho soluciones de EXA-0052. El banco suma 416 validadas y 224 pendientes. [Informe](Selectividad_LaTeX/docs/soluciones/S053_2013_EXA0052.md).

- **2026-11-09** · S054 cerrada con ocho soluciones de EXA-0053. El banco suma 424 validadas y 216 pendientes. [Informe](Selectividad_LaTeX/docs/soluciones/S054_2013_EXA0053.md).

- **2026-11-09** · S055 cerrada con ocho soluciones de EXA-0054. El banco suma 432 validadas y 208 pendientes. [Informe](Selectividad_LaTeX/docs/soluciones/S055_2011_EXA0054.md).

- **2026-11-09** · S056 cerrada con ocho soluciones de EXA-0055. El banco suma 440 validadas y 200 pendientes. [Informe](Selectividad_LaTeX/docs/soluciones/S056_2011_EXA0055.md).

- **2026-11-09** · S057 cerrada con ocho soluciones de EXA-0056. El banco suma 448 validadas y 192 pendientes. [Informe](Selectividad_LaTeX/docs/soluciones/S057_2011_EXA0056.md).

- **2026-11-09** · S058 cerrada con ocho soluciones de EXA-0058. El banco suma 456 validadas y 184 pendientes. [Informe](Selectividad_LaTeX/docs/soluciones/S058_2011_EXA0058.md).

- **2026-11-09** · S059 cerrada con ocho soluciones de EXA-0059. El banco suma 464 validadas y 176 pendientes. [Informe](Selectividad_LaTeX/docs/soluciones/S059_2011_EXA0059.md).

- **2026-11-10** · S060 cerrada con ocho soluciones de EXA-0060. El banco suma 472 validadas y 168 pendientes. [Informe](Selectividad_LaTeX/docs/soluciones/S060_2011_EXA0060.md).

- **2026-11-10** · S061 cerrada con ocho soluciones de EXA-0061. El banco suma 480 validadas y 160 pendientes. [Informe](Selectividad_LaTeX/docs/soluciones/S061_2010_EXA0061.md).

- **2026-11-10** · S062 cerrada con ocho soluciones de EXA-0062. El banco suma 488 validadas y 152 pendientes. [Informe](Selectividad_LaTeX/docs/soluciones/S062_2010_EXA0062.md).

- **2026-11-10** · S063 cerrada con ocho soluciones de EXA-0063. El banco suma 496 validadas y 144 pendientes. [Informe](Selectividad_LaTeX/docs/soluciones/S063_2010_EXA0063.md).

- **2026-11-10** · S064 cerrada con ocho soluciones de EXA-0064. El banco suma 504 validadas y 136 pendientes. [Informe](Selectividad_LaTeX/docs/soluciones/S064_2010_EXA0064.md).

- **2026-11-10** · S065 cerrada con ocho soluciones de EXA-0065. El banco suma 512 validadas y 128 pendientes. [Informe](Selectividad_LaTeX/docs/soluciones/S065_2010_EXA0065.md).

- **2026-11-10** · S066 cerrada con ocho soluciones de EXA-0066. El banco suma 520 validadas y 120 pendientes. [Informe](Selectividad_LaTeX/docs/soluciones/S066_2010_EXA0066.md).

- **2026-11-10** · S067 cerrada con seis soluciones de EXA-0067. El banco suma 526 validadas y 114 pendientes. [Informe](Selectividad_LaTeX/docs/soluciones/S067_2009_EXA0067.md).

- **2026-11-10** · S068 cerrada con seis soluciones de EXA-0068. El banco suma 532 validadas y 108 pendientes. [Informe](Selectividad_LaTeX/docs/soluciones/S068_2009_EXA0068.md).

- **2026-11-10** · S069 cerrada con seis soluciones de EXA-0069. El banco suma 538 validadas y 102 pendientes. [Informe](Selectividad_LaTeX/docs/soluciones/S069_2009_EXA0069.md).

- **2026-11-10** · S070 cerrada con seis soluciones de EXA-0070. El banco suma 544 validadas y 96 pendientes. [Informe](Selectividad_LaTeX/docs/soluciones/S070_2009_EXA0070.md).

- **2026-11-10** · S071 cerrada con seis soluciones de EXA-0071. El banco suma 550 validadas y 90 pendientes. [Informe](Selectividad_LaTeX/docs/soluciones/S071_2009_EXA0071.md).

- **2026-11-10** · S072 cerrada con seis soluciones de EXA-0072. El banco suma 556 validadas y 84 pendientes. [Informe](Selectividad_LaTeX/docs/soluciones/S072_2009_EXA0072.md).

- **2026-11-10** · S073 cerrada con seis soluciones de EXA-0073. El banco suma 562 validadas y 78 pendientes. [Informe](Selectividad_LaTeX/docs/soluciones/S073_2008_EXA0073.md).

- **2026-11-10** · S074 cerrada con seis soluciones de EXA-0074. El banco suma 568 validadas y 72 pendientes. [Informe](Selectividad_LaTeX/docs/soluciones/S074_2008_EXA0074.md).

- **2026-11-10** · S075 cerrada con seis soluciones de EXA-0075. El banco suma 574 validadas y 66 pendientes. [Informe](Selectividad_LaTeX/docs/soluciones/S075_2008_EXA0075.md).

- **2026-11-12** · S076 cerrada con seis soluciones de EXA-0076. El banco suma 580 validadas y 60 pendientes. [Informe](Selectividad_LaTeX/docs/soluciones/S076_2008_EXA0076.md).

- **2026-11-12** · S077 cerrada con seis soluciones de EXA-0077. El banco suma 586 validadas y 54 pendientes. [Informe](Selectividad_LaTeX/docs/soluciones/S077_2008_EXA0077.md).

- **2026-11-12** · S078 cerrada con seis soluciones de EXA-0078. El banco suma 592 validadas y 48 pendientes. [Informe](Selectividad_LaTeX/docs/soluciones/S078_2008_EXA0078.md).

- **2026-11-12** · S079 cerrada con ocho soluciones de EXA-0079. El banco suma 600 validadas y 40 pendientes. [Informe](Selectividad_LaTeX/docs/soluciones/S079_2012_EXA0079.md).

- **2026-11-12** · S080 cerrada con ocho soluciones de EXA-0080. El banco suma 608 validadas y 32 pendientes. [Informe](Selectividad_LaTeX/docs/soluciones/S080_2012_EXA0080.md).

- **2026-11-12** · S081 cerrada con ocho soluciones de EXA-0081. El banco suma 616 validadas y 24 pendientes. [Informe](Selectividad_LaTeX/docs/soluciones/S081_2012_EXA0081.md).

- **2026-11-12** · S082 cerrada con ocho soluciones de EXA-0082. El banco suma 624 validadas y 16 pendientes. [Informe](Selectividad_LaTeX/docs/soluciones/S082_2012_EXA0082.md).

- **2026-11-12** · S083 cerrada con ocho soluciones de EXA-0083. El banco suma 632 validadas y 8 pendientes. [Informe](Selectividad_LaTeX/docs/soluciones/S083_2012_EXA0083.md).

- **2026-11-12** · S084 cerrada con ocho soluciones de EXA-0084. El banco suma 640 validadas y 0 pendientes. [Informe](Selectividad_LaTeX/docs/soluciones/S084_2012_EXA0084.md).

- [x] AUD001 · Revisar doce incidencias de hipótesis de muestreo. [Informe](Selectividad_LaTeX/docs/soluciones/AUD001_HIPOTESIS_MUESTREO.md).
- [x] AUD002 · Revisar once incidencias editoriales del banco.
- [x] AUD003 · Revisar cinco incidencias generales de fuentes.

- **2026-11-12** · AUD002 cerrada. Once incidencias editoriales revisadas. [Informe](Selectividad_LaTeX/docs/soluciones/AUD002_INCIDENCIAS_EDITORIALES.md). Siguiente AUD003.

- **2026-11-12** · AUD003 cerrada. Cinco incidencias generales resueltas. [Informe](Selectividad_LaTeX/docs/soluciones/AUD003_FUENTES_Y_METADATOS.md). Siguiente implementación, SEL-PARTES.
- **2026-11-12** · Banco completo integrado en `feature/selectividad`: trabajo de la otra herramienta confirmado (640 soluciones, S012–S084 y AUD001) y web regenerada con las 640 soluciones, 31 figuras PDF y 94 dibujos `picture` compilados con pdfLaTeX. Relaciones de los 640 ejercicios compiladas sin errores con y sin soluciones. Pruebas 165 (todas las soluciones sin errores de MathJax) y 166.

- [x] SEL-PARTES01 · Selección parcial de dos ejercicios piloto. [Informe](Selectividad_LaTeX/docs/soluciones/SEL_PARTES01_SELECCION_PARCIAL.md).
- [x] SEL-PARTES02 · Preparar ocho ejercicios adicionales con Partes I/II.
- **2026-11-12** · Decidido con el docente: activar las 640 soluciones (los ocho grupos visibles en `config/visibility.json`), de modo que las tarjetas las muestran y el generador ofrece relaciones con y sin soluciones en PDF y LaTeX. Se pueden volver a ocultar por tema o una a una.

SEL-PARTES02 cerrada el 2026-11-12. Ocho ejercicios D0067–D0070 admiten partes completas, con diez IDs de cobertura acumulada. Próxima tanda SEL-PARTES03, D0071–D0074 OA/OB E03. Los apartados individuales y sus categorías siguen pendientes.
- **2026-11-12** · P08 y P09 publicados a petición del docente: `feature/selectividad` fusionada en `main` sin esperar a completar la identificación de convocatoria y tipo, que se irá añadiendo; las tarjetas indican «Convocatoria o tipo por identificar» mientras falte.
- **2026-11-12** · P10 hecho en `feature/examenes`: generador de exámenes de práctica con el formato de la PAU 2025-26 (huecos guiados, puntuaciones adaptadas, tabla oficial de la N(0, 1) comprobada contra el cálculo exacto, PDF y LaTeX con y sin soluciones). 383 unitarias; 167 pasa.
- **2026-11-12** · «Laboratorio de integrales» (A Incluir) revisado: añadidas en 3.5 las sumas de Riemann con una curva (tres reglas, x² y 4−x², hasta 100 rectángulos) y ejemplos en 3.3, 3.4 y 3.7; el resto ya estaba en el tema 3 o queda fuera (trigonométricas inversas, taller numérico con CDN, test con errores de signo). Detalle en `docs/auditoria-reutilizacion-laboratorio-integrales.md`. Pruebas `riemann-sums.test.mjs` y 168.
- **2026-11-14** · Q01 y P11 (piloto) en `feature/pwa-presentaciones`. Aplicación instalable: manifiesto, iconos 192/512/maskable/apple-touch/favicon generados con `npm run build:app-icons`, *service worker* en la raíz (red primero; MathJax, tipografías e iconos desde la copia), `offline.html` servida con `<base>` en cualquier ruta, `instalar.html` y botón en el pie. Presentación del tema 3: motor `slides.js` (pasos, teclado, mando, gesto, índice, `#id`, pantalla completa, notas, impresión, lectura sin JS) y 25 diapositivas con los exploradores de 3.1, 3.5, 3.6, 3.7 y 3.8. Pruebas: unitarias `pwa.test.mjs` y `slides.test.mjs`, navegador 169 y 170.
- **2026-11-14** · Cabecera rediseñada a petición del docente (Temario, Páginas relacionadas y Opciones de lectura no seguían el diseño y empujaban la página al abrirse). Opciones de lectura pasa al botón «Aa» junto al modo oscuro, como en el prototipo de lección aprobado (D04), y se abre en una franja bajo la barra, con interruptores y desplegable con estilo propio, sin tapar contenido. Temario y Páginas relacionadas son paneles flotantes: temas por bloque con su color y lección actual marcada; anterior, índice del tema y siguiente con su papel. Se cierran con Esc o al pulsar fuera y caben en la vista con el texto al 200 %. Prueba 171.
- **2026-11-15** · Publicado a petición del docente: `main` avanzado hasta `feature/pwa-presentaciones` (laboratorio de integrales, Q01, presentación del tema 3 y cabecera). 389 pruebas unitarias en copia limpia; Comprobaciones y Publicar web correctos; manifiesto, `sw.js`, iconos, `instalar.html` y la presentación responden en GitHub Pages.
- **2026-11-15** · Corregido «Páginas relacionadas» en la primera lección de cada tema: sin «Anterior», «Siguiente» se forzaba a una segunda columna y aplastaba la tarjeta del índice. Corregidas las barras de desplazamiento en fórmulas que caben (≤, <, una letra): el MathML oculto de MathJax contaba para el desplazamiento. Prueba 171 ampliada.
- **2026-11-15** · P11 terminada: presentaciones de los temas 1, 2 y 4–9 con el formato del tema 3. El motor reduce la escala (hasta el 70 %) de la diapositiva que no cabe en 16:9; los laboratorios grandes de los temas 4, 5 y 8 se reparten en columnas. Exploradores: derivada, continuidad y tangente (1); racionales, traslaciones y beneficio (2); producto, inversa y grafos (4); Rouché, Gauss y parámetros (5); normal y binomial-normal (8); intervalo de confianza y tamaño de muestra (9). Temas 6 y 7 con figuras SVG propias (regiones factibles, árbol). Recuentos del catálogo en las pruebas calculados con el número de presentaciones.
- **2026-11-15** · Publicado a petición del docente: `main` avanzado hasta `b20bb29` (presentaciones de los nueve temas, Páginas relacionadas y fórmulas sin barras falsas). 390 pruebas unitarias y 20 de navegador en copia limpia; Comprobaciones y Publicar web correctos; las nueve presentaciones responden 200 en GitHub Pages.
- **2026-11-15** · Pie de página con autoría y licencia, a petición del docente: «© 2026 Juan María Gámez Ortiz, con la ayuda de Claude y de Codex», licencia Creative Commons BY-NC 4.0 (reproducción con atribución y sin fines comerciales) y «IES Al-Ándalus» enlazado a la web del centro (https://iesalandalus.org/joomla/). Prueba 171 ampliada.
- **2026-11-15** · Enlaces del contenido modernizados, a petición del docente: en el texto toman el tono del bloque (azul, magenta o naranja) con subrayado fino y resalte suave; los grupos de enlaces separados por « · » pasan a fichas («Anterior/Volver» con ←, «Continuar/Siguiente» con →) y las listas de un enlace por elemento, como «Así cae en Selectividad», a filas con flecha (`assets/js/core/links.js`, `components.css`). Los grupos con diseño propio (letras del glosario y del formulario, índices, ruta) no se tocan. Prueba 172; pruebas 67–69 y 88 esperan a la navegación.
- **2026-11-16** · P07, tema 6 completo: modelo exacto de semiplanos, regiones (vacía, punto, segmento, polígono, no acotada) y optimización, contrastado con 40 000 sistemas aleatorios frente a un recorte independiente y con muestreo denso; tres exploradores; 30 preguntas con explicación por opción (cálculos de 6.4 y de los seis problemas comprobados); tarjetas asignadas a su lección de referencia. Lecciones 6.1–6.5 en estado revisado. Prueba 173; pruebas 71–75 y siete de estadística bidimensional actualizadas al nuevo estado. Glosario regenerado (estaba desfasado tras la revisión de la tarjeta de derivada).
- **2026-11-16** · P07, tema 8 completo: modelo racional exacto de distribuciones discretas y binomial (P(X=k), acumuladas, sucesos «como máximo», «al menos», «entre»), contrastado con los ejemplos de 8.2 y 8.4 y con coma flotante para n≤30; exploradores de 8.1 y 8.2; 24 preguntas con explicación por opción; tarjetas asignadas a su lección. Lecciones 8.1–8.4 revisadas e índice del tema al día. Prueba 174; 88 actualizada (ya fallaba por el texto del índice). De paso: el estudio de tarjetas repetía el grupo «8. Distribuciones» (las tarjetas de teoría van al final del catálogo); 158, 162 y 163 al día con 107 fórmulas y 420 tarjetas.
- **2026-11-16** · Relación guiada de integrales para entregar tras dos sesiones, a petición del docente (`Web_Matematicas_CCSS_II/content/latex/relacion-integrales-guiada/`): tabla completa de inmediatas y compuestas (con el caso lineal u=mx+b y una ampliación con tangente, arcotangente y arcoseno), 24 ejercicios con huecos en cuatro partes (inmediatas, compuestas, métodos, definida y áreas) y soluciones; sin puntuación, a petición del docente. PDF compilados con Tectonic y ZIP para Overleaf. No se ha publicado en Recursos.
- **2026-11-20** · Hojas resumen de los nueve temas, a petición del docente (`Web_Matematicas_CCSS_II/content/latex/hojas-resumen/`): un A4 por delante y por detrás por tema, dos columnas por cara, con fórmulas clave en recuadro, ejemplos resueltos, avisos de errores frecuentes, gráficas (pgfplots) y el color de cada bloque. Notación y ejemplos tomados de las lecciones y del formulario de la web; todos los valores numéricos comprobados con un cálculo independiente. Un PDF por tema, uno combinado de 18 caras y ZIP para Overleaf. No se han publicado en Recursos.
- **2026-11-20** · Página «Para imprimir» (`materiales/index.html`), enlazada desde Recursos, a petición del docente: las nueve hojas resumen, el PDF conjunto y la relación guiada de integrales para descargar (las soluciones de la relación no se publican). Los PDF están en `materiales/pdf/` y se registran en `config/resources.json` con el tipo nuevo `study`, de modo que cada uno se puede ocultar desde Administración. La página se genera con `npm run build:materials`; prueba unitaria `materials-library` y de navegador 175. Recuentos de visibilidad (catálogo y 158) calculados con el material de estudio.

## Auditoría de teoría · 13-11-2026

- [x] Inventariar las carencias teóricas y distinguirlas de estados editoriales parciales. [Listado TEO-01–26](Web_Matematicas_CCSS_II/docs/AUDITORIA_TEORIA_PENDIENTE_2026-11-13.md).
- [x] TEORIA-01 · Redacción de fundamentos de distribuciones, TEO-01–06. Revisión visual y con tecnologías de apoyo pendiente en TEO-25.
- [x] TEORIA-02 · Redacción de inferencia y muestreo, TEO-07–14. Revisión visual y con tecnologías de apoyo pendiente en TEO-25.
- [x] TEORIA-03 · Redacción de programación lineal, TEO-15–18. Revisión visual y con tecnologías de apoyo pendiente en TEO-25.
- [x] TEORIA-04 · Redacción de apoyos, TEO-19–22 (TEO-22 como ampliación opcional). Revisión visual y con tecnologías de apoyo pendiente en TEO-25.
- [ ] Revisión transversal TEO-23–26.

Diario · 2026-11-13 · `docs(teoria)`: revisión de cobertura de 86 lecciones y dos apoyos. Informe con rutas y tareas comprobables. Se distinguen lagunas, ejemplos insuficientes y revisión editorial/accesible. Sin cambios en HTML ni en diseño.

- **2026-11-13** · `feat(teoria-01a)`: completadas TEO-01 y TEO-02 en la lección 8.1. Añadidos clasificación, densidad, acumulada y ejemplos razonados. Se conserva el diseño y el motor de fórmulas. La tanda TEORIA-01 continúa abierta con TEO-03–06.

Comprobación TEORIA-01a: `npm test`, 385 pruebas, 384 superadas y un fallo de sincronización de `selectividad/04-matrices-y-determinantes.html` con su generador, fuera del cambio de teoría. Comprobación de navegador intentada, bloqueada por `ERR_NETWORK_ACCESS_DENIED` al servidor local; renderizado MathJax y revisión visual pendientes. No se declara validación visual completada.

- **2026-11-13** · `feat(teoria-01b)`: TEO-03 completada en 8.2, con acumuladas, complementarios, extremos enteros y ejemplos razonados. Resultados contrastados con aritmética racional; dos pruebas binomiales superadas y enlaces sin pendientes. TEORIA-01 sigue abierta, TEO-04–06 pendientes.

- **2026-11-13** · `feat(teoria-01c)`: TEO-04–05 completadas en 8.3, con tabla, probabilidades directas y normal inversa. Resultados contrastados con biblioteca estadística independiente del modelo web; seis pruebas superadas. TEO-06 pendiente, ejemplos escritos de aproximación binomial-normal. Se mantienen pendientes las comprobaciones visuales y con tecnologías de apoyo.

- **2026-11-13** · `feat(teoria-01d)`: TEO-06 completada, cuatro cálculos escritos de aproximación binomial-normal y contraste exacto. Ocho pruebas superadas, 187 páginas con enlaces sin pendientes. Cerrada la redacción TEO-01–06; comprobación visual y accesible pendiente. Siguiente TEORIA-02, TEO-07 (afijación proporcional).

- **2026-11-13** · `feat(teoria-02a)`: TEO-07 redactada en 9.3, afijación proporcional y redondeo conservando el total. Tres ejemplos verificados con fracciones exactas y 1452 casos de reparto entero; tres pruebas de catálogo superadas. TEORIA-02 continúa con TEO-08. Revisión visual y asistida pendiente.

- **2026-11-13** · `feat(teoria-02b)`: TEO-08 redactada en 9.5. Estimador frente a estimación y caso numérico completo hasta el intervalo, con supuestos e interpretación. Resultados contrastados independientemente y nueve pruebas superadas. Revisión visual y asistida pendiente. Siguiente TEO-09, proporciones.

- **2026-11-13** · `feat(teoria-02c)`: TEO-09 redactada en 9.7, intervalo aproximado para proporciones, condiciones, límites y dos ejemplos verificados. Seis pruebas superadas. Revisión visual y asistida pendiente. Siguiente TEO-10, problemas directos e inversos.

- **2026-11-13** · `feat(teoria-02d)`: TEO-10 redactada en 9.7, problemas directos e inversos de intervalos. Resultados verificados independientemente y nueve pruebas superadas. Revisión visual y asistida pendiente. Siguiente TEO-11, tamaño muestral para proporciones.

- **2026-11-13** · `feat(teoria-02e)`: TEO-11 redactada en 9.8. Tamaño para proporciones con información previa y caso conservador, redondeo e inequación estricta. Mínimos contrastados independientemente; nueve pruebas superadas. Revisión visual y asistida pendiente. Siguiente TEO-12, problema completo de tamaño para la media.

- **2026-11-13** · `feat(teoria-02f)`: TEO-12 redactada en 9.8. Problema completo de tamaño para la media, verificación del mínimo y desigualdades estrictas. Nueve pruebas superadas, cálculos independientes y enlaces sin pendientes. Revisión visual y asistida pendiente. Siguiente TEO-13, intervalos característicos.

- **2026-11-13** · `feat(teoria-02g)`: TEO-13 redactada en 9.6, individual frente a media, distintos niveles centrales y probabilidad de intervalo dado. Cálculos verificados, nueve pruebas superadas y enlaces sin pendientes. Revisión visual y asistida pendiente. Siguiente TEO-14, ficha técnica completa.

- **2026-11-13** · `feat(teoria-02h)`: TEO-14 redactada en 9.9. Ficha completa ficticia con método y cálculo contrastado, guía y actividad. Nueve pruebas superadas. Redacción de TEORIA-02 completada; revisión visual y asistida pendiente. Siguiente TEORIA-03, TEO-15.

- **2026-11-13** · `feat(teoria-03a)`: TEO-15 redactada en 6.4, casos especiales de optimización con justificación y actividad. Tres pruebas de catálogo superadas, comprobación matemática independiente y enlaces sin pendientes. Revisión visual y asistida pendiente. Siguiente TEO-16, formulación de programación lineal.

- **2026-11-14** · `feat(teoria-03b)`: TEO-16 redactada en 6.3, formulación numérica razonada enlazada con 6.4. Comprobación matemática por enumeración, tres pruebas de catálogo superadas. Revisión visual y asistida pendiente. Siguiente TEO-17, casos de representación de semiplanos.

- **2026-11-14** · `feat(teoria-03c)`: TEO-17 redactada en 6.1, casos especiales de semiplanos, signos y puntos de prueba. Comprobación matemática independiente y tres pruebas de catálogo superadas. Revisión visual y asistida pendiente. Siguiente TEO-18, regiones factibles especiales.

- **2026-11-14** · `feat(teoria-03d)`: TEO-18 redactada en 6.2, regiones vacías, segmentos y puntos con actividad resuelta. Comprobación matemática independiente y tres pruebas de catálogo superadas. Redacción TEORIA-03 completada; revisión visual y asistida pendiente. Siguiente TEO-19, parámetros marginales de estadística bidimensional.

- **2026-11-14** · `feat(teoria-04a)`: TEO-19 redactada, parámetros marginales y ejemplo completo de las 50 familias en el apoyo bidimensional. Cálculos verificados con aritmética racional y datos expandidos. Revisión visual y asistida pendiente. Siguiente TEO-20, rectas de regresión.

- **2026-11-14** · `feat(teoria-04b)`: TEO-20 redactada, dos rectas de regresión y relación con r², con ejemplo de familias contrastado por cálculo exacto. Tres pruebas de catálogo superadas. Revisión visual y asistida pendiente. Siguiente TEO-21, principio multiplicativo.

- **2026-11-14** · `feat(teoria-04c)`: TEO-21 redactada, principio multiplicativo y ejemplos por etapas en combinatoria. Enumeración independiente, siete pruebas superadas y enlaces sin pendientes. Revisión visual y asistida pendiente. TEO-22 sigue como ampliación opcional, pendiente de valorar su alcance.

- **2026-11-14** · `feat(teoria-04d)`: TEO-22 redactada como ampliación opcional, combinaciones con repetición con justificación y ejemplos verificados. Siete pruebas superadas y enlaces sin pendientes. Redacción TEORIA-04 completada; revisión visual y asistida pendiente. Siguiente TEO-23, conciliación de estados y documentación.

- **2026-11-14** · `docs(teoria-23)`: TEO-23 completada, conciliación de índices y estado vigente con la teoría redactada. Recuentos verificados: 86 lecciones, 87 entradas de formulario y 42 términos; no se eleva el estado editorial ni se cierra la revisión visual/asistida. Siete pruebas superadas y enlaces sin pendientes. Siguiente TEO-24.

- **2026-11-14** · `docs(teoria-24a)`: tema 1 cotejado requisito por requisito, 83 criterios en 18 lecciones con evidencia textual. [Informe](Web_Matematicas_CCSS_II/docs/REVISION_TEORIA_TEMAS_1_5.md). Sin nuevas lagunas confirmadas ni cambios de HTML. Enlaces locales del informe verificados. TEO-24 sigue abierta; siguiente tema 2.

- **2026-11-14** · `docs(teoria-24b)`: tema 2 cotejado, 42 criterios en nueve lecciones con evidencia textual. Sin nuevas lagunas confirmadas ni cambios de HTML. Matriz acumulada 125 requisitos y 27 lecciones, enlaces del informe comprobados. TEO-24 continúa con tema 3.

- **2026-11-14** · `docs(teoria-24c)`: tema 3 cotejado, 33 criterios en ocho lecciones. Sin nuevas lagunas de cobertura confirmadas. Matriz acumulada: 158 requisitos en 35 lecciones; enlaces del informe verificados. Sin cambios de HTML. Siguiente tema 4.

- **2026-11-14** · `docs(teoria-24d)`: tema 4 cotejado, 53 criterios en doce lecciones. Sin nuevas lagunas de cobertura confirmadas. Matriz acumulada: 211 requisitos en 47 lecciones; enlaces verificados. Sin cambios de HTML. Siguiente tema 5.

- **2026-11-14** · `docs(teoria-24e)`: tema 5 cotejado, 46 criterios en once lecciones. TEO-24 completada: matriz de 257 requisitos y 58 lecciones, sin nuevas lagunas de cobertura confirmadas. Enlaces del informe verificados; sin cambios de HTML. Siguiente TEO-25, revisión visual y lectura matemática.

- **2026-11-14** · `test(teoria-25a)`: primera pasada sobre 16 páginas, 994 fórmulas sin errores de renderizado y 994 MathML auxiliares. Texto de apartados accesible sin JavaScript; sin desbordamiento global en tres configuraciones. Capturas revisadas: detectada compresión excesiva de tablas móviles. Pendientes correcciones, acceso a fórmulas largas, teclado y lectura asistida real. TEO-25 permanece abierta.

Informe de la tanda: [TEO-25A](Web_Matematicas_CCSS_II/docs/REVISION_VISUAL_TEORIA_TEO25.md). Siguiente: TEO-25B, tablas en móvil.

- **2026-11-14** · `fix(teoria-25b)`: corregidas cinco tablas móviles con ancho legible, desplazamiento interno y foco visible. Cinco comprobaciones de desplazamiento por teclado superadas; repetida revisión de 16 páginas y 994 fórmulas sin errores, con capturas de las tablas inspeccionadas. Enlaces de 190 páginas sin pendientes. Pendientes TEO-25C–E; siguiente acceso a fórmulas largas.

- **2026-11-14** · `fix(teoria-25c)`: fórmulas largas alcanzables con Tab sólo cuando desbordan, foco visible y actualización al redimensionar. 16 páginas, 994 fórmulas y 357 comprobaciones de desplazamiento/extremos superadas; cinco tablas y tres pruebas de formulario también pasan. Tab y retirada de focos innecesarios contrastados en 9.7; capturas de ambos extremos inspeccionadas. Enlaces de 190 páginas sin pendientes. Siguiente TEO-25D; lectura asistida real pendiente.

- **2026-11-14** · `fix(teoria-25d)`: navegación a apartados con foco y margen bajo el índice; cierre móvil con Escape o salida por Tab. 16 páginas superan pruebas de ancla directa, Enter/Escape, foco, escritorio y texto ampliado. Tres capturas inspeccionadas, tres pruebas de catálogo superadas y enlaces de 190 páginas sin pendientes. Fixture compartida corregida para no desplegar artificialmente el índice. Pendiente TEO-25E: lectura asistida real; TEO-25 permanece abierta.

- **2026-11-14** · `feat(teoria-26a)`: plan TEO-26 indexado en cuatro tandas; primera completada con cinco fórmulas nuevas de inferencia y sus condiciones, total 92. Tres pruebas de sincronización y prueba móvil de renderizado/búsqueda/enlace superadas. Enlaces de 190 páginas sin pendientes. TEO-25E conserva la validación de lectura real pendiente; no se ha encontrado lector activo ni NVDA en ubicaciones habituales. Siguiente 26B, resto del formulario.

Plan de herramientas: [TEO-26](Web_Matematicas_CCSS_II/docs/ALINEACION_HERRAMIENTAS_TEO26.md).

- **2026-11-14** · `feat(teoria-26b)`: añadidas 15 fórmulas de distribuciones y apoyos, con condiciones y combinaciones con repetición opcionales. Total 107 entradas. Tres pruebas de sincronización superadas; prueba móvil verifica 107 fórmulas/MathML, búsquedas, filtros y enlace. Tres capturas inspeccionadas; enlaces de 190 páginas sin pendientes. Tanda 26B completada; siguiente 26C, glosario y tarjetas. Lectura asistida real TEO-25E pendiente.

- **2026-11-14** · `feat(teoria-26c)`: glosario ampliado de 42 a 69 términos mediante 12 tarjetas reutilizadas y 15 nuevas. Banco de 420 tarjetas, filtro de combinatoria incorporado y recuentos de mazos actualizados. 20 pruebas específicas superadas y enlaces de 190 páginas sin pendientes. Prueba de navegador de nuevas tarjetas/glosario en raíz y subcarpeta; lectura estática comprobada. Siguiente 26D, conciliación de guiones históricos y cierre de herramientas. TEO-25E sigue pendiente.

- **2026-11-14** · `test(teoria-26d)`: cerrada la alineación de herramientas, 107 fórmulas, 69 términos y 420 tarjetas. Cuatro guiones históricos de navegador actualizados y superados, generadores sincronizados y enlaces de 190 páginas sin pendientes. Corregida la separación categoría/lección de referencia de las nuevas tarjetas, con visibilidad heredada y consulta por lección. Batería general final: 389 pruebas, 388 superadas y un fallo previo de sincronización de Selectividad de matrices (MNT-SEL-01). Pendiente TEO-25E, lectura asistida real; sin cierre global de la web.

- **2026-11-14** · `fix(selectividad-sync)`: MNT-SEL-01 cerrada. Comparadas y sincronizadas cinco salidas del banco, con 640 ejercicios/soluciones e IDs y categorías conservados. MNT-SEL-02 corrige dólares literales dentro de cajas matemáticas en una matriz y añade prueba de regresión. Banco al día (49 archivos), siete pruebas específicas y doce de relaciones/exámenes superadas, prueba de navegador y captura final revisadas. Batería completa final con concurrencia 4: **390 pruebas, 390 superadas y cero fallos**. Sigue pendiente TEO-25E, lectura asistida real.

Informe: [mantenimiento de Selectividad](Web_Matematicas_CCSS_II/docs/MANTENIMIENTO_SELECTIVIDAD_SYNC_2026-11-14.md).

- **2026-11-14** · `test(teoria-25e1)`: seis casos de lectura matemática superan la comprobación del árbol accesible de Chrome: fracciones, sumatorio, integral, intervalo, matriz y raíz. Una raíz MathML expuesta por fórmula y SVG oculto al árbol; matriz 2×3 con filas/celdas. Preparado protocolo de escucha con significados esperados y ficha de resultados. No se valida pronunciación ni se cierra TEO-25E; siguientes E3–E4 requieren escucha real y revisión de incidencias.

Protocolo: [lectura matemática](Web_Matematicas_CCSS_II/docs/PROTOCOLO_LECTURA_MATEMATICA_TEO25E.md).

- **2026-11-14** · `fix(p03a)`: indexada la revisión editorial P03 en seis tandas y completada la primera. Variable discreta no entera ilustrada con premios de 0,50/1,50 € en lección, tarjeta y glosario; distribución contrastada por enumeración racional. Seis pruebas específicas, navegador del mazo de distribuciones y ejemplo móvil superados; captura inspeccionada y enlaces de 190 páginas sin pendientes. Siguiente P03B; TEO-25E3–E4 siguen pendientes de escucha real.

- **2026-11-14** · `fix(p03b)`: revisadas las 22 tarjetas de distribuciones; siete reversos precisados sobre densidad, valores discretos, dominios, extremos binomiales, tablas y continuidad. Quince sin cambios. Glosario regenerado, IDs y recuentos conservados. 11 pruebas específicas y navegador de las 22 tarjetas superados; cálculo independiente por enumeración y capturas móviles de dos reversos revisados. Enlaces de 190 páginas sin pendientes. Siguiente P03C, inferencia; escucha real pendiente.

- **2026-11-14** · `fix(p03c)`: revisadas 37 tarjetas de inferencia (12 precisadas, 25 sin cambios) y 20 preguntas originales con sus 80 alternativas. Retroalimentación específica por opción, enunciados desambiguados y cálculo sistemático en LaTeX; IDs y claves conservados. 29 pruebas específicas y navegadores de tarjetas/test superados, incluidas 80 retroalimentaciones, lectura estática y captura móvil. Glosario sincronizado; enlaces de 190 páginas sin pendientes. Registrada EV-INF-01 para cubrir 9.4–9.9 con nuevas preguntas. Siguiente P03D; escucha real pendiente.

- **2026-11-15** · `fix(p03d)`: revisadas las 19 tarjetas de programación lineal; seis precisadas y trece sin cambios. Modelo continuo, vértices degenerados, cota no alcanzada, coste constante e integridad aclarados. Lección 6.4 amplía el caso de una banda sin vértices y la factibilidad entera, con enlace en su índice. 17 pruebas específicas y navegador de las tarjetas superados, pruebas matemáticas y captura móvil verificadas. Glosario sincronizado y enlaces de 198 páginas sin pendientes. Siguiente P03E; escucha real pendiente.

- **2026-11-15** · `fix(p03e)`: revisadas 23 tarjetas bidimensionales, dos de combinatoria y diez preguntas. Precisadas ocho tarjetas y cinco preguntas: unidades, dirección y signo de regresiones, recuento frente a independencia y explicaciones de monedas. Diez pruebas unitarias, navegadores de apoyos y 40 retroalimentaciones superados; cálculos exactos y capturas inspeccionados. Glosario al día; 198 páginas sin enlaces pendientes. Cifras aclaradas: 408 preguntas totales (398 de temas y diez de apoyo), 420 tarjetas. Siguiente P03F; EV-INF-01 y escucha real pendientes.


### 15-11-2026 · P03F-F1A · Límites y laterales

Revisadas seis preguntas y ocho tarjetas de `content/activities/limits.js`; precisadas dos tarjetas y dos explicaciones, con IDs y respuestas conservados. Plan P03F secuenciado por temas en `REVISION_EDITORIAL_EVALUACIONES_P03.md` (carpeta docs de la web). Contrato del catálogo: 3/3; enlaces: 198 páginas sin pendientes; contenido renderizado en raíz/subcarpeta a 360 px y 200 %, sin errores matemáticos ni desbordamiento global. Sigue F1B (comportamiento infinito). Revisión editorial restante, EV-INF-01 y escucha real pendientes.


### 15-11-2026 · P03F-F1B · Comportamiento infinito

Revisadas doce preguntas (48 alternativas) y doce tarjetas de `content/activities/infinity.js`; cuatro preguntas y dos tarjetas precisadas, conservando IDs y respuestas. Detalle en `Web_Matematicas_CCSS_II/docs/REVISION_EDITORIAL_EVALUACIONES_P03.md` desde la raíz. Contrato: 3/3; enlaces: 198 páginas sin pendientes; contenido aislado en raíz/subcarpeta a 360 px y 200 %, con 36 fórmulas sin errores por caso ni desbordamiento global. Sigue F1C, técnicas de límites. No cierra la revisión editorial completa ni la escucha real.


### 15-11-2026 · P03F-F1C · Técnicas de límites

Revisadas nueve preguntas (36 alternativas) y nueve tarjetas; precisadas dos preguntas y dos tarjetas, conservando IDs y respuestas. Registro detallado en `Web_Matematicas_CCSS_II/docs/REVISION_EDITORIAL_EVALUACIONES_P03.md` desde la raíz. Contrato 3/3; enlaces de 198 páginas sin pendientes; contenido aislado en raíz/subcarpeta a 360 px y 200 %, 58 fórmulas por caso sin errores ni desbordamiento global. Sigue F1D: continuidad y derivadas, por módulos. Continúan pendientes la revisión editorial restante, EV-INF-01 y la escucha real.


### 15-11-2026 · P03F-F1D1 · Continuidad y derivada

F1D dividida en tres módulos. Completado el primero: nueve preguntas (36 alternativas) y nueve tarjetas revisadas. Una pregunta incorpora su función para poder responderse de forma independiente; dos tarjetas precisan continuidad en extremos y derivada interior. IDs y respuestas conservados. Registro en `Web_Matematicas_CCSS_II/docs/REVISION_EDITORIAL_EVALUACIONES_P03.md` desde la raíz. Contrato 3/3; enlaces de 198 páginas sin pendientes; contenido aislado raíz/subcarpeta, 360 px y 200 %, con 42 fórmulas por caso sin errores ni desbordamiento global. Sigue F1D2: reglas de derivación. Revisión restante y escucha real pendientes.


### 15-11-2026 · P03F-F1D2 · Tangentes y reglas

Revisadas nueve preguntas (36 alternativas) y nueve tarjetas. Dos preguntas pueden resolverse y usar sus pistas sin consultar otros enunciados o ejemplos; dos tarjetas explicitan condiciones de derivabilidad. IDs y respuestas conservados. Detalle en `Web_Matematicas_CCSS_II/docs/REVISION_EDITORIAL_EVALUACIONES_P03.md` desde la raíz. Contrato 3/3; enlaces de 198 páginas sin pendientes; contenido aislado en raíz/subcarpeta a 360 px y 200 %, 55 fórmulas por caso sin errores ni desbordamiento global. Sigue F1D3, composición y L’Hôpital. Revisión restante y escucha real pendientes.


### 15-11-2026 · P03F-F1D3 · Cadena y L’Hôpital

Revisadas nueve preguntas (36 alternativas) y nueve tarjetas; dos preguntas y dos tarjetas precisadas. Añadido contraejemplo de derivada discontinua y desarrolladas hipótesis de L’Hôpital, con IDs y respuestas conservados. Contrato 3/3; enlaces de 198 páginas sin pendientes; contenido aislado en raíz/subcarpeta a 360 px y 200 %, 27 fórmulas por caso sin errores ni desbordamiento global. F1D completada: 27 preguntas y 27 tarjetas en tres subtandas. Detalle en `Web_Matematicas_CCSS_II/docs/REVISION_EDITORIAL_EVALUACIONES_P03.md` desde la raíz. Sigue F1E: repaso y conciliación del tema 1. Revisión restante y escucha real pendientes.


### 15-11-2026 · P03F-F1E · Repaso y cierre editorial del banco del tema 1

Revisadas seis preguntas (24 alternativas) y cinco tarjetas de repaso; precisadas dos preguntas y una tarjeta. Conciliación por IDs: los siete módulos revisados cubren exactamente las 60 preguntas y 61 tarjetas del tema 1, sin omisiones ni duplicados. No equivale a certificar toda la teoría, ejercicios resueltos o juegos. Contrato 3/3; enlaces de 198 páginas sin pendientes; contenido aislado raíz/subcarpeta, 360 px y 200 %, 68 fórmulas por caso sin errores ni desbordamiento global. Detalle en `Web_Matematicas_CCSS_II/docs/REVISION_EDITORIAL_EVALUACIONES_P03.md` desde la raíz. Sigue F2: representación de funciones por módulos. P03F global, EV-INF-01 y escucha real pendientes.


### 15-11-2026 · P03F-F2A · Estudio general de funciones

Tema 2 organizado en diez tandas. Primera completada: seis preguntas (24 alternativas) y seis tarjetas revisadas; una pregunta y dos tarjetas precisadas, con IDs y respuestas conservados. Aclaradas monotonía por intervalos, tangente horizontal y cotas no alcanzadas. Contrato 3/3; enlaces de 198 páginas sin pendientes; contenido aislado raíz/subcarpeta a 360 px y 200 %, 44 fórmulas por caso sin errores ni desbordamiento global. Registro en `Web_Matematicas_CCSS_II/docs/REVISION_EDITORIAL_EVALUACIONES_P03.md` desde la raíz. Sigue F2B: polinómicas. Revisión editorial restante y escucha real pendientes.


### 15-11-2026 · P03F-F2B · Polinómicas

Seis preguntas (24 alternativas) y seis tarjetas revisadas. Ampliada una explicación del máximo de beneficio y precisadas dos tarjetas de multiplicidad y modelos discretos; IDs y respuestas conservados. Contrato 3/3; enlaces de 198 páginas sin pendientes; contenido aislado raíz/subcarpeta a 360 px y 200 %, 31 fórmulas por caso sin errores ni desbordamiento global. Registro en `Web_Matematicas_CCSS_II/docs/REVISION_EDITORIAL_EVALUACIONES_P03.md` desde la raíz. Sigue F2C: funciones racionales. Revisión editorial restante y escucha real pendientes.


### 15-11-2026 · P03F-F2C · Racionales

Seis preguntas (24 alternativas) y seis tarjetas revisadas. Una pregunta incorpora la función necesaria para mostrarse sola; dos tarjetas contemplan numerador nulo y resto cero, con IDs y respuestas conservados. Contrato 3/3; enlaces de 198 páginas sin pendientes; contenido aislado raíz/subcarpeta a 360 px y 200 %, 36 fórmulas por caso sin errores ni desbordamiento global. Detalle en `Web_Matematicas_CCSS_II/docs/REVISION_EDITORIAL_EVALUACIONES_P03.md` desde la raíz. Sigue F2D: exponenciales. Revisión restante y escucha real pendientes.


### 15-11-2026 · P03F-F2D · Exponenciales

Seis preguntas (24 alternativas) y seis tarjetas revisadas. Preguntas sin cambios; tres tarjetas precisan condiciones de base, dominio y tasa por periodo, con IDs y respuestas conservados. Contrato 3/3; enlaces de 198 páginas sin pendientes; contenido aislado raíz/subcarpeta a 360 px y 200 %, 35 fórmulas por caso sin errores ni desbordamiento global. Cálculos monetarios contrastados con fracciones exactas y redondeo decimal. Detalle en `Web_Matematicas_CCSS_II/docs/REVISION_EDITORIAL_EVALUACIONES_P03.md` desde la raíz. Sigue F2E: logarítmicas. Revisión restante y escucha real pendientes.


### 15-11-2026 · P03F-F2E · Logarítmicas

Seis preguntas (24 alternativas) y seis tarjetas revisadas; una pregunta precisa crecimiento compuesto y cantidad inicial positiva, y dos tarjetas explicitan condiciones. IDs y respuestas conservados. Duplicación en el año 15 confirmada con fracciones exactas. Contrato 3/3; enlaces de 198 páginas sin pendientes; contenido aislado raíz/subcarpeta a 360 px y 200 %, 34 fórmulas por caso sin errores ni desbordamiento global. Registro en `Web_Matematicas_CCSS_II/docs/REVISION_EDITORIAL_EVALUACIONES_P03.md` desde la raíz. Sigue F2F: funciones a trozos. Revisión editorial restante y escucha real pendientes.


### 15-11-2026 · P03F-F2F · Funciones a trozos

Seis preguntas (24 alternativas) y seis tarjetas revisadas. Una pregunta incorpora sus ramas y sus cocientes incrementales; dos tarjetas precisan solapamiento de condiciones y valor puntual en la derivada. IDs y respuestas conservados. Contrato 3/3; enlaces de 198 páginas sin pendientes; contenido aislado raíz/subcarpeta a 360 px y 200 %, 15 fórmulas por caso sin errores ni desbordamiento global. Detalle en `Web_Matematicas_CCSS_II/docs/REVISION_EDITORIAL_EVALUACIONES_P03.md` desde la raíz. Sigue F2G: traslaciones. Revisión restante y escucha real pendientes.


### 15-11-2026 · P03F-F2G · Traslaciones

Seis preguntas (24 alternativas) y seis tarjetas revisadas. Cuatro tarjetas explicitan su transformación y parámetros para consultarse individualmente; preguntas y respuestas conservadas. Contrato 3/3; enlaces de 198 páginas sin pendientes; contenido aislado raíz/subcarpeta a 360 px y 200 %, 14 fórmulas por caso sin errores ni desbordamiento global. Registro en `Web_Matematicas_CCSS_II/docs/REVISION_EDITORIAL_EVALUACIONES_P03.md` desde la raíz. Sigue F2H: expansión y contracción. Revisión restante y escucha real pendientes.


### 15-11-2026 · P03F-F2H · Expansión y contracción

Seis preguntas (24 alternativas) y seis tarjetas revisadas; cinco tarjetas precisan factores, correspondencias y diferencia entre ceros de función y derivada. Preguntas y respuestas conservadas. Contrato 3/3; enlaces de 198 páginas sin pendientes; contenido aislado raíz/subcarpeta a 360 px y 200 %, 15 fórmulas por caso sin errores ni desbordamiento global. Registro en `Web_Matematicas_CCSS_II/docs/REVISION_EDITORIAL_EVALUACIONES_P03.md` desde la raíz. Sigue F2I: optimización. Revisión restante y escucha real pendientes.


### 15-11-2026 · P03F-F2I · Optimización

Seis preguntas (24 alternativas) y seis tarjetas revisadas; tres preguntas y una tarjeta precisadas, con IDs y respuestas conservados. Cálculos exactos y comparación de los 17 enteros admisibles confirmados. Contrato 3/3; enlaces de 198 páginas sin pendientes; texto comprobado en raíz/subcarpeta a 360 px y 200 %, sin desbordamiento global. Detectado que las fórmulas del módulo están como texto Unicode, sin delimitadores LaTeX: pendiente F2I-LTX para convertirlas y verificar su renderizado antes de F2J. Registro en `Web_Matematicas_CCSS_II/docs/REVISION_EDITORIAL_EVALUACIONES_P03.md` desde la raíz. Revisión restante y escucha real pendientes.


### 15-11-2026 · P03F-F2I-LTX · LaTeX en optimización

Cerrado el pendiente F2I-LTX: convertidas 48 expresiones a LaTeX en preguntas, opciones, explicaciones y tarjetas, con IDs y claves conservados. Contrato 3/3; enlaces de 198 páginas sin pendientes. Comprobación aislada en raíz/subcarpeta a 360 px y texto al 200 %: 48 fórmulas y 48 estructuras MathML por caso, sin errores ni desbordamiento; repetir el renderizado no duplica fórmulas. No equivale a certificar pronunciación con lector de pantalla. Registro en `Web_Matematicas_CCSS_II/docs/REVISION_EDITORIAL_EVALUACIONES_P03.md` desde la raíz. Sigue F2J: repaso y conciliación del tema 2.

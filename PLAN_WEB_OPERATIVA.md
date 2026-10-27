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
- [ ] W05 · Despliegue en Pages solo de la web (`.github/workflows/pages.yml`, decidido por el docente el 27-10-2026): copia `Web_Matematicas_CCSS_II/` sin docs, tests, scripts ni fuentes LaTeX. Falta fusionar en `main` y cambiar *Settings › Pages › Source* a «GitHub Actions» (ahora publica toda la raíz con Jekyll).
- [ ] W06 · Ordenar la documentación: mover los ~175 `verificacion-entrega-NN.md` y las auditorías a `docs/historial/`, y dejar en `docs/` solo los documentos vigentes. Con Git, el historial ya no necesita un archivo por entrega. 🗣️ Pendiente de que el docente lo apruebe (no se pidió en esta ronda).
- [ ] W07 · Generador de páginas `npm run new:page -- <ruta> <id> "<título>"`: crea el HTML con la plantilla vigente, rutas correctas y registro en `config/pages.json`.

## Fase 1 · Consulta de diseño con el docente 🗣️ (bloquea las fases 2–5)

**No se implementa ningún rediseño sin cerrar antes esta fase.** El objetivo es que el diseño se ajuste a la idea del docente, no a una suposición. Se hará en una sesión dedicada, con preguntas concretas (herramienta de preguntas) y prototipos visuales comparables (artefactos HTML de una sola página), en varias rondas cortas.

- [x] D01 · **Ronda 1, identidad y referencias.** Respuestas en [DECISIONES_DISENO.md](Web_Matematicas_CCSS_II/docs/diseno/DECISIONES_DISENO.md). Preguntar:
  - Tres adjetivos para la web (p. ej. sobria/académica, cálida/cercana, tecnológica/laboratorio, lúdica).
  - Webs, libros o apps que le gusten como referencia (y qué le gusta de cada una) y qué quiere evitar.
  - Si debe reflejar la identidad del centro (logo, colores institucionales; en los LaTeX aparece `logo-al-andalus.png`) o tener marca propia («Matemáticas en contexto · CCSS II»).
  - Dispositivo principal del alumnado (móvil, portátil, tablet) y uso en clase con proyector o pizarra digital.
  - Modo oscuro: sí, no o automático.
- [ ] D02 · **Ronda 2, color y tipografía.** En curso: lienzo con propuestas A, B, C y la fusión D (A + C elegida); falta fijar tipografía y paleta de bloques. Mostrar 2–3 propuestas de paleta sobre una misma lección real (por ejemplo 7.1 Laplace): la de la especificación §11.2 (análisis azul, álgebra violeta, azar verde) y alternativas. Preguntar por la paleta de bloques temáticos, la de tipos de contenido (abajo) y por las tipografías (Plus Jakarta Sans + Outfit u otras; serif editorial para el cuerpo o sans).
- [ ] D03 · **Ronda 3, iconos, ilustraciones y movimiento.** Mostrar muestras de:
  - Iconografía: trazo fino (Lucide, Phosphor) frente a rellena o duotono; iconos propios para la materia.
  - Ilustraciones: lineal monocromo, plana con color del tema, isométrica o diagramas «de pizarra»; mascota sí/no.
  - Intensidad de animación: mínima, moderada (transiciones y construcción de gráficas) o expresiva (celebraciones, microanimaciones lúdicas en juegos).
  - Tono del feedback (formal, cercano, con humor) y si se celebran rachas o aciertos.
- [ ] D04 · **Ronda 4, composición.** Prototipos de portada, índice de tema, lección, pregunta de test, laboratorio y biblioteca en escritorio y móvil. Preguntar por la densidad (aireado o compacto), el índice lateral fijo y la cabecera.
- [ ] D05 · Redactar `Web_Matematicas_CCSS_II/docs/diseno/DECISIONES_DISENO.md` con todas las respuestas, capturas de los prototipos elegidos y los tokens resultantes. El docente lo valida antes de pasar a la fase 2.

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

- [ ] S01 · `assets/css/tokens.css`: colores (base, temas, roles, estados), tipografía (escala fluida con `clamp`), espaciado 4/8/12/16/24/32/48, radios, sombras, z-index, duraciones y curvas de animación, modo oscuro y alto contraste. Integrar las preferencias actuales (tamaño, contraste, resaltado) como variaciones de los tokens.
- [ ] S02 · Fuentes autoalojadas en `assets/fonts/` (woff2, subconjunto latino, `font-display: swap`); sin depender de servicios externos.
- [ ] S03 · Iconos: sprite SVG propio `assets/icons/sprite.svg` con los elegidos en D03, licencia documentada, `aria-hidden` y texto visible acompañante.
- [ ] S04 · Componentes CSS reutilizables: llamadas por rol (tabla anterior), tarjeta, botón (primario, secundario, fantasma, icono), campo de respuesta, chip/etiqueta, pestañas, acordeón (`details`), paso a paso, barra de progreso de lectura, insignia de estado editorial, migas y paginación anterior/siguiente.
- [ ] S05 · Página «Guía de estilo» (solo desarrollo, oculta al público) con todos los componentes, en claro y oscuro, como banco de pruebas visual.
- [ ] S06 · Pruebas: contraste automático de todas las parejas de tokens (prueba unitaria) y capturas de referencia con Playwright para detectar regresiones.

## Fase 3 · Maquetación de plantillas

- [ ] L01 · Cabecera y pie nuevos: logotipo, buscador (cuando exista T10), menú móvil accesible y ajustes de lectura en un panel.
- [ ] L02 · Portada tipo landing: presentación, «Explorar temas / Jugar / Recursos», tarjetas de los 9 temas con ilustración y color de bloque, destacados del docente. Sustituye la lista actual de enlaces de `index.html`.
- [ ] L03 · Índice de tema: cabecera ilustrada, mapa de epígrafes con estado, recorridos (lección → práctica → juego → test) y recursos PDF del tema.
- [ ] L04 · Lección: migas, objetivo, índice lateral fijo con apartado activo (en móvil, desplegable), ancho de lectura de 65–75 caracteres, figuras junto a su explicación, navegación anterior/siguiente y progreso de lectura sin perfil.
- [ ] L05 · Test, tarjetas, práctica y laboratorio con la composición de la especificación §11.3.
- [ ] L06 · Eliminar los 27 estilos en línea de `libro/` y los estilos ad hoc de los widgets en favor de clases y tokens; unificar `widget-base.css` con los tokens.
- [ ] L07 · Hoja de impresión: lecciones y fichas imprimibles en A4 sin menús, con fórmulas nítidas y enlaces visibles.
- [ ] L08 · Aplicar las plantillas a las 176 páginas por temas (un commit por tema), comprobando en cada uno móvil, teclado, MathJax y `check:links`.

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

- [ ] P01 · T07 Biblioteca de recursos: los 48 PDF agrupados por pareja examen/soluciones, búsqueda, filtros por tema/tipo/etiqueta, visibilidad heredada y acciones separadas.
- [ ] P02 · T08 Combinatoria migrada desde `Página web existente/Combinatoria.txt` y matriz de cobertura de fuentes cerrada.
- [ ] P03 · T09 Revisión editorial de evaluaciones: distractores, hipótesis, unidades y redondeos.
- [ ] P04 · T10 Dificultad y destreza normalizadas en el banco; buscador común del sitio (índice estático generado) que respeta la visibilidad.
- [ ] P05 · T11 Práctica: repetición de errores de la sesión, retos y simulacros cronometrados opcionales tipo PEvAU.
- [ ] P06 · T12 Tarjetas con filtros, formulario por tema y glosario enlazado desde las lecciones.
- [ ] P07 · T15 Los nueve widgets pendientes (temas 6, 8 y 9) y completar las lecciones parciales de los temas 6–9.
- [ ] P08 · Integración del banco de Selectividad en la web: buscador de ejercicios PEvAU por tema, epígrafe, año y convocatoria a partir de `Selectividad_LaTeX/datos/ejercicios.csv`, con enlace desde cada lección a «Así cae en Selectividad». 🗣️ Propuesta: confirmar formato (HTML con MathJax o PDF) y cuándo publicar las soluciones.

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

- [ ] Q01 · Aplicación web instalable (PWA): `manifest.webmanifest`, iconos, color de tema y *service worker* que guarda lecciones y PDF visitados para usarlos sin conexión. 🗣️ Confirmar si interesa.
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

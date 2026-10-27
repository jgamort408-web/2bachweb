# Decisiones de diseño

Registro de la consulta de diseño con el docente (fase 1 del [plan](../../../PLAN_WEB_OPERATIVA.md), tareas D01–D05). Cada decisión indica su fecha y ronda. Ninguna fase de implementación visual (2–5) empieza hasta que este documento esté completo y validado.

Estado: **consulta cerrada (D01–D05) el 27-10-2026**.

## Ronda 1 · Identidad y referencias (D01, 27-10-2026)

| Tema | Decisión |
|---|---|
| Personalidad | **Editorial + lúdica**: lecciones sobrias y elegantes, como un libro de texto moderno; juegos y laboratorios más vivos y coloridos |
| Identidad | **Marca propia con guiño al centro**: logotipo y nombre de la asignatura; IES Al-Ándalus aparece de forma discreta en el pie y en los PDF |
| Nombre | **Mates CCSS II** (subtítulo: Matemáticas Aplicadas a las Ciencias Sociales II · 2.º Bachillerato) |
| Centro | IES Al-Ándalus (logo existente en `content/latex/*/logo-al-andalus.png`) |
| Dispositivos | **Móvil del alumnado, ordenador/portátil y proyector o pizarra digital**. Tablet no prioritaria, pero debe funcionar |
| Modo oscuro | **Automático según el dispositivo + selector manual** |
| Referencias | **Brilliant / Khan Academy** (lecciones interactivas, feedback inmediato, ilustración limpia), **Desmos / GeoGebra** (gráficas protagonistas y manipulables), **libro de texto digital** (cajas de teoría, ejemplos y ejercicios) |
| Referencia descartada | Duolingo (lo muy lúdico, con rachas y personaje, no se eligió) |
| Tono | **Cercano y claro**: tuteo, frases cortas, anima sin infantilizar |

### Consecuencias para el diseño

- Dos registros visuales en un mismo sistema: *lectura* (libro: fondo limpio, tipografía editorial, color con función) y *laboratorio/juego* (más color y movimiento, mismas fuentes y tokens).
- Proyector: hace falta un modo o escala «presentación» (texto y gráficas grandes, alto contraste, sin elementos finos de 1 px).
- Móvil primero en la práctica y las tarjetas; escritorio con índice lateral en las lecciones.
- Gráficas con el lenguaje de Desmos: ejes limpios, curvas gruesas de color, puntos manipulables y etiquetas legibles.
- Celebraciones discretas al estilo Brilliant, no gamificación persistente (sin rachas entre sesiones, coherente con no guardar progreso).

## Ronda 2 · Color y tipografía (D02)

Prototipos sobre la lección 7.1 en el lienzo «Mates CCSS II · Ronda 2 de diseño» (artefacto privado del docente): A · Tinta y azul (especificación §11.2), B · Papel editorial, C · Laboratorio claro y D · Fusión A + C.

| Tema | Decisión (27-10-2026) |
|---|---|
| Dirección | **Mezcla de A y C**; B (serifa, papel cálido) descartada |
| Color de bloque | **Acento discreto**: chip del tema, logotipo, práctica y gráficas; el resto neutro |
| Cajas por tipo de contenido | **Con fondo de color** (estilo A): fondo suave y borde por rol; de C se toma el icono en pastilla |
| Elementos de C que se incorporan en D | Icono en pastilla, barra de progreso por segmentos, fondo punteado en la práctica, representación gráfica junto a la pregunta, navegación en píldoras |
| Tipografía | **Outfit** (títulos, 600–700) + **Plus Jakarta Sans** (texto, 400/600/700); fórmulas con MathJax. Autoalojadas en woff2 (S02) |
| Paleta de bloques | **Análisis #2563EB · Álgebra #A21CAF · Azar #C2410C** (propuesta C). El naranja de Azar no se confunde con el verde de «correcto» |

### Tokens de partida acordados (ronda 2)

| Token | Valor | Uso |
|---|---|---|
| Fondo | `#F7F8FC` | Superficie de página |
| Papel | `#FFFFFF` | Paneles, cabecera, pie |
| Texto | `#172033` | Párrafos y títulos |
| Texto secundario | `#475569` | Metadatos y ayudas |
| Acción principal | `#1D4ED8` | Botón «Comprobar», enlaces |
| Análisis (T1–T3) | `#2563EB` · oscuro `#1D4ED8` · tinte `#DBEAFE` | Acento discreto del bloque |
| Álgebra (T4–T6) | `#A21CAF` · oscuro `#86198F` · tinte `#FAE8FF` | Acento discreto del bloque |
| Azar (T7–T9) | `#C2410C` · oscuro `#9A3412` · tinte `#FFEDD5` | Acento discreto del bloque |
| Definición | fondo `#EFF4FF`, borde `#C7D7FE`, título `#1D4ED8` | Caja de teoría |
| Método | fondo `#F5F3FF`, borde `#DDD6FE`, título `#5B21B6` | Caja de procedimiento |
| Ejemplo resuelto | fondo `#ECFDF8`, borde `#A7E8D5`, título `#0F766E` | Caja de ejemplo |
| Error frecuente | fondo `#FEF3C7`, borde `#FCD34D`, título `#92400E` | Caja de aviso |
| Correcto | fondo `#ECFDF3`, texto `#065F46` | Feedback |
| Incorrecto | fondo `#FEF2F2`, texto `#B91C1C` | Feedback |
| Radios | 16 px cajas · 12 px controles · 9–10 px pastillas de icono | |

Quedan por definir en S01 los equivalentes del modo oscuro y del modo proyector, y la comprobación automática de contraste de cada pareja.

## Ronda 3 · Iconos, ilustraciones y movimiento (D03, 27-10-2026)

Láminas «Ronda 3 · Iconos», «Ilustraciones» y «Movimiento» en el mismo lienzo.

| Tema | Decisión |
|---|---|
| Iconos | **Pastilla tintada**: trazo de 2 px del color del rol sobre un cuadrado suave (radio 9–14 px). Juego de 9 iconos de rol: definición, método, ejemplo resuelto, error frecuente, practica, objetivo, resumen, Selectividad y ampliación |
| Ilustración | **Plana con el color del tema**: formas rellenas con los tintes del bloque y algún acento de los otros dos bloques. Cabeceras de los 9 temas, portada, estados vacíos y 404, en SVG ligero |
| Movimiento | **Moderado** en lecciones y práctica: feedback que sube 10 px en 250 ms, marca de acierto trazada, curvas que se dibujan (≈0,9 s). **Expresivo solo** al terminar una serie y en los juegos (rebote breve y pequeña celebración). Todo se anula con `prefers-reduced-motion` |
| Sonido | **Opcional y desactivado por defecto**: interruptor en los ajustes de lectura; nunca en las lecciones si está apagado |

Colores de rol para iconos que no tenían caja propia: resumen `#475569`/`#E2E8F0`, Selectividad `#854D0E`/`#FEF08A`, ampliación `#BE185D`/`#FCE7F3`; objetivo y practica toman el acento del bloque.

## Ronda 4 · Composición (D04, 27-10-2026)

Láminas de las filas 3 y 4 del lienzo: portada (escritorio y móvil), índice del tema 7, biblioteca, lección (escritorio y móvil), test en móvil y laboratorio de la normal (interactivo). El docente las dio por buenas sin cambios.

| Tema | Decisión |
|---|---|
| Densidad | **Aireada**: cuerpo 18 px (17 px en móvil), interlineado 1,6–1,65, cajas con 22–26 px de relleno y 24 px entre bloques |
| Índice de la lección | **Lateral fijo a la izquierda** en escritorio (240 px, apartado actual resaltado con el tinte del bloque); en móvil, desplegable «En esta lección» con «n de m» |
| Navegación móvil | **Barra inferior tipo app**: Inicio, Libro, Practicar y Juegos (52 px de alto, objetivos ≥ 44 px) |
| Cabecera | Logotipo + navegación en píldoras + buscar, ajustes de lectura «Aa» y modo oscuro; barra de progreso de lectura de 4 px con el color del bloque |
| Portada | Titular, tres acciones (Explorar temas, Jugar, Ver recursos), ilustración plana de los tres bloques, destacado del docente, los nueve temas agrupados por bloque y cuatro modos de estudio |
| Índice de tema | Cabecera blanca con ilustración del tema; recorrido numerado con estado editorial; columna «Practica el tema» (test, ejercicios, juegos, tarjetas, Selectividad, PDF) |
| Test | Una pregunta por pantalla, cuatro alternativas como filas táctiles de 56 px, progreso por segmentos (verde acierto, rojo fallo), feedback explicativo y enlace «Repasar» al epígrafe |
| Laboratorio | Panel de controles a la izquierda con pregunta guía, valores al momento en un recuadro oscuro, gráfica amplia a la derecha y valores preestablecidos (p. ej. ±1,96 y 1,645) |
| Biblioteca | Buscador grande, filtros por bloque y tipo a la izquierda, fichas de pareja con botones «Examen» y «Soluciones» |

Los textos de ejemplo de las láminas (destacado semanal, descripciones de exámenes) son ilustrativos: en la web saldrán del catálogo y de la configuración del docente.

## Cierre de la consulta (D05)

La consulta queda **cerrada y validada por el docente el 27-10-2026**. Las fases 2–5 del plan pueden empezar con estas decisiones. El código de las láminas elegidas está en [prototipos/](prototipos/) como referencia de maquetación: son archivos del editor de lienzos (`.dc.html`), no páginas de la web, y no se abren solos. Hay que reescribirlos con los tokens y componentes de la fase 2.

# Decisiones de diseño

Registro de la consulta de diseño con el docente (fase 1 del [plan](../../../PLAN_WEB_OPERATIVA.md), tareas D01–D05). Cada decisión indica su fecha y ronda. Ninguna fase de implementación visual (2–5) empieza hasta que este documento esté completo y validado.

Estado: **D01 cerrada · D02 en curso**.

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
| Pendiente | Tipografía (A: Outfit + Plus Jakarta Sans; C: Space Grotesk + Inter) y paleta de bloques (A: azul/violeta/verde; C: azul/magenta/naranja) |

## Ronda 3 · Iconos, ilustraciones y movimiento (D03)

Pendiente.

## Ronda 4 · Composición (D04)

Pendiente.

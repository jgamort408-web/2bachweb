# Aplicación instalable y presentaciones de clase

Actualizado: 15 de noviembre de 2026 · Tareas Q01 y P11 de [PLAN_WEB_OPERATIVA.md](../../PLAN_WEB_OPERATIVA.md).

## Aplicación instalable (Q01)

Decidido con el docente: el icono es el logotipo de la cabecera (opción A de tres propuestas) y el nombre corto «Mates CCSS II».

| Pieza | Archivo | Notas |
|---|---|---|
| Manifiesto | `manifest.webmanifest` | Rutas relativas (`./`), porque el sitio vive en una subcarpeta de GitHub Pages. `standalone`, color `#172033` y accesos directos a Libro, Practicar y Selectividad. |
| Iconos | `assets/icons/app/` | `logo.svg` y `favicon.svg` son las fuentes. `npm run build:app-icons` genera con Chrome los PNG de 192 y 512 px (`any` y `maskable`: el dibujo cabe en el círculo seguro del 80 %), el `apple-touch-icon` de 180 px y el favicon de 32 px. |
| Etiquetas | `assets/js/core/content-gate.js` | Añade el manifiesto, los iconos, `theme-color` y las metas de iOS a todas las páginas sin tocar cada HTML. La portada también las lleva escritas. |
| Service worker | `sw.js` | Ámbito: la raíz del sitio. Al instalarse guarda la portada, `offline.html`, los estilos, las tipografías y los iconos. Páginas, datos y código: primero la red y, sin conexión, la copia. MathJax, tipografías e iconos: primero la copia. Sin conexión y sin copia de la página: `offline.html`, servida con `<base>` para que cargue sus estilos desde cualquier ruta. |
| Instalar | `instalar.html`, `assets/js/core/install.js` | Pasos para Android, iPhone o iPad y ordenador. El botón «Instalar la aplicación» del pie y de la página solo aparece cuando el navegador ofrece la instalación (Chrome y Edge). Safari se instala con Compartir → «Añadir a pantalla de inicio». |

Al cambiar la lista `PRECACHE` de `sw.js`, sube `VERSION`: la caché anterior se borra al activarse la nueva.

**Pruebas.** Playwright marca `navigator.webdriver`. Por eso la web no registra el *service worker* durante las pruebas: así no interfiere con las que interceptan peticiones. La prueba 169 lo activa con `sessionStorage['mc:sw'] = 'on'`. Esa prueba comprueba las etiquetas en una lección, la instalación del *service worker* y la lección visitada sin conexión. También comprueba `offline.html` en una ruta profunda y el botón de instalar. `pwa.test.mjs` revisa el manifiesto, el tamaño real de cada PNG y que existan todos los archivos de `PRECACHE`.

## Presentaciones de clase (P11)

Decidido con el docente: cada tema tiene su propia presentación, redactada para explicar en clase. No se convierte cada lección en diapositivas. El docente revisó el tema 3 y aprobó el diseño; después se hicieron los otros ocho (15–25 diapositivas cada uno).

### Cómo funciona

- Página `libro/temas/<tema>/presentacion.html`, con entrada `kind: "section"` en `config/pages.json` y padre en el tema. Así aparece en el recorrido del tema y la visibilidad la controla Administración.
- Hojas `assets/css/slides.css` y módulo `assets/js/learning/presentation.js`. Este módulo arranca `slides.js` y los exploradores que declara `data-explorers`.
- Sin JavaScript, cada `<section class="mc-slide">` se lee como un apartado, con sus pasos y notas visibles. Con JavaScript se muestra una diapositiva 16:9 cada vez. El texto se escala con el tamaño de la pantalla. Por debajo de 768 px la diapositiva toma su altura natural.
- Si el contenido de la diapositiva activa no cabe en el lienzo 16:9 (un laboratorio grande, otro proyector), `slides.js` reduce su escala con la variable `--mc-fit` en pasos del 5 % hasta el 70 %. Se recalcula al cambiar de diapositiva, al redimensionar, al mostrar las notas y cuando cambia el contenido.
- Para avanzar: →, AvPág, espacio, Intro, un mando de presentaciones o deslizar. Para retroceder: ←, RePág o Retroceso. Inicio y Fin van al principio y al final.
- Otras teclas: F, pantalla completa; N, notas para el docente; I, índice. La dirección guarda la diapositiva (`#id`).
- Al imprimir salen todas las diapositivas, una por página.

### Cómo escribir una presentación

| Elemento | Uso |
|---|---|
| `<section class="mc-slide" id="…">` | Una diapositiva, con un `h2`. Si el título es una fórmula, añade `data-title="…"` para el índice. |
| `mc-slide__kicker` | Línea superior: lección o tipo («Ejemplo paso a paso · 3.2»). |
| `mc-slide__box--theory`, `--method`, `--example`, `--error`, `--ask` | Cajas de definición, procedimiento, ejemplo, error frecuente y pregunta a la clase. |
| `mc-slide__steps` | Lista numerada de pasos. |
| `data-step` | El elemento aparece al avanzar, en orden. |
| `mc-slide__cols`, `mc-slide__cols--2` | Columnas que pasan a una sola en el móvil. |
| `mc-slide__notes` | Nota para el docente. Oculta al proyectar salvo con N. |
| `mc-slide--lab` | Diapositiva con explorador: controles y explicación a la izquierda, gráfica a la derecha. Copia el marcado del explorador de la lección, añade la clase `mc-lab` a su raíz y `mc-lab__result` al contenedor de resultados que rellena el módulo. |
| `data-explorers` | Nombres del mapa de `presentation.js` (`[módulo, función que lo inicia]`; sin función, el módulo se inicia solo al importarse). Una presentación sin exploradores deja `data-explorers=""`. |

Pauta de contenido: entre 15 y 25 diapositivas. Lleva una idea por diapositiva, como mucho unas 8 líneas, con ejemplos verificados y enlaces a la lección. La notación es la de las lecciones, con coma decimal.

Al añadir una presentación:

1. Dala de alta en `config/pages.json` (padre: el tema) y en `config/editorial.json`, y enlázala desde el `index.html` del tema.
2. Los recuentos del catálogo en las pruebas (`content-visibility-catalog` y 158) se calculan con el número de presentaciones: no hay que tocarlos.
3. `slides.test.mjs` comprueba título, ids únicos, catálogo, enlace y que cada explorador está en el mapa, exporta su función y tiene su raíz en la página.
4. Revisa a 1280 × 800 que ninguna diapositiva desborde ni tenga fórmulas con desplazamiento.

Laboratorios que construyen todo su contenido (producto, inversa y grafos del tema 4; Rouché, Gauss y parámetros del tema 5) se reparten en dos columnas con `columns` de CSS: el bloque de resultado empieza la segunda. Los temas 6 y 7 no tienen explorador reutilizable y usan figuras SVG propias. La prueba 170 cubre el tema 3 en el navegador.

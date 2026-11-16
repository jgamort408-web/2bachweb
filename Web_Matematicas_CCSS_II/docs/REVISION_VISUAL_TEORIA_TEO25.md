# TEO-25A · Revisión de presentación y fórmulas

Fecha: 14 de noviembre de 2026. Estado: primera pasada completada; TEO-25 sigue abierta.

## Método y resultados

Prueba reproducible: `node tests/theory-review-browser.cjs`, desde la carpeta web. Requiere Playwright y Chrome; puede configurarse `CHROME_PATH`. Intercepta las peticiones y sirve los archivos locales, sin red ni servidor real. No comprueba concurrencia de visitantes, disponibilidad de CDN ni recuperación ante fallos del servidor.

- 16 páginas revisadas, correspondientes a las ampliaciones TEO-01–22.
- 994 fórmulas renderizadas y 994 representaciones auxiliares MathML; cero errores matemáticos de renderizado y cero excepciones de página durante la prueba.
- Sin desbordamiento horizontal global en 1280 px, 360 px y 1280 px con tamaño raíz de letra al 200 %. Esta última comprobación no equivale al zoom completo del navegador ni al criterio de reflujo de WCAG.
- Los 16 apartados seleccionados permanecen visibles sin JavaScript. Esto acredita presencia del texto, no renderizado de todas las fórmulas ni funcionamiento de actividades: las fórmulas dependientes del motor pueden quedar como código LaTeX.
- Carga desde subcarpeta comprobada en intervalos de confianza (57 fórmulas) y combinatoria (121).
- Inspección visual de las 16 capturas móviles y de tres capturas de escritorio (variable aleatoria, intervalos de confianza y combinatoria). Las capturas muestran apartados concretos, no todos los estados de cada página.

Las evidencias temporales se guardan en `../tmp/teoria-25/`: `resultados.json`, `mobile-01.png` a `mobile-16.png`, tres capturas `desktop-*.png` y cuatro hojas de contacto. El informe conserva los resultados aunque se limpien los temporales.

## Incidencias y siguiente tanda

- [x] **TEO-25B · Tablas móviles.** Evitar columnas de texto reducidas a unas pocas letras. Casos visibles: tabla de traducción binomial (8.2), estimador/estimación (9.5), niveles centrales (9.6) y ficha técnica (9.9). También revisar la tabla de recursos de 6.3. Elegir anchos mínimos y contenedor desplazable accesible, conservando encabezados y relaciones entre celdas. Repetir capturas y comprobar teclado después del cambio.
- [x] **TEO-25C · Fórmulas largas.** Verificar que se alcanza el extremo derecho mediante desplazamiento táctil y teclado. Las capturas móviles muestran sólo el comienzo de varias expresiones largas, entre ellas restricciones de 6.2/6.4, normal inversa 8.3 e intervalos de confianza 9.7. Ausencia de desbordamiento global no prueba acceso a toda la fórmula.
- [x] **TEO-25D · Navegación y foco.** Revisar enlaces entre teoría y soluciones, apertura con teclado de detalles, foco visible y llegada a anclas bajo el índice fijo móvil. El índice ocupa la parte superior de las capturas; comprobar que no oculta el destino al navegar.
- [ ] **TEO-25E · Lectura asistida.** Probar con lector de pantalla real las fracciones, sumatorios, intervalos, matrices y fórmulas largas. Comprobar orden, nombres, pronunciación en español y ausencia de lectura duplicada. La presencia de MathML auxiliar no acredita estas pruebas.

No se cambia el estado editorial a revisado ni se declara conformidad de accesibilidad. No se ha modificado el diseño o el contenido matemático en esta tanda.

## Páginas incluidas

| Página | Apartado de captura | Fórmulas / MathML auxiliar |
|---|---|---:|
| [libro/temas/06-programacion-lineal/01-inecuaciones-lineales-con-dos-incognitas.html](../libro/temas/06-programacion-lineal/01-inecuaciones-lineales-con-dos-incognitas.html#frontera-vertical) | `frontera-vertical` | 18 / 18 |
| [libro/temas/06-programacion-lineal/02-sistemas-de-inecuaciones-lineales-con-dos-incognitas.html](../libro/temas/06-programacion-lineal/02-sistemas-de-inecuaciones-lineales-con-dos-incognitas.html#region-segmento) | `region-segmento` | 21 / 21 |
| [libro/temas/06-programacion-lineal/03-programacion-lineal.html](../libro/temas/06-programacion-lineal/03-programacion-lineal.html#formulacion-numerica) | `formulacion-numerica` | 17 / 17 |
| [libro/temas/06-programacion-lineal/04-solucion-de-un-problema-de-programacion-lineal.html](../libro/temas/06-programacion-lineal/04-solucion-de-un-problema-de-programacion-lineal.html#optimo-multiple) | `optimo-multiple` | 36 / 36 |
| [libro/temas/08-distribuciones-de-probabilidad/01-variable-aleatoria.html](../libro/temas/08-distribuciones-de-probabilidad/01-variable-aleatoria.html#densidad) | `densidad` | 47 / 47 |
| [libro/temas/08-distribuciones-de-probabilidad/02-distribucion-binomial.html](../libro/temas/08-distribuciones-de-probabilidad/02-distribucion-binomial.html#acumuladas) | `acumuladas` | 49 / 49 |
| [libro/temas/08-distribuciones-de-probabilidad/03-distribucion-normal.html](../libro/temas/08-distribuciones-de-probabilidad/03-distribucion-normal.html#inversa) | `inversa` | 45 / 45 |
| [libro/temas/08-distribuciones-de-probabilidad/04-aproximacion-de-la-distribucion-binomial-a-la-distribucion-normal.html](../libro/temas/08-distribuciones-de-probabilidad/04-aproximacion-de-la-distribucion-binomial-a-la-distribucion-normal.html#ejemplos) | `ejemplos` | 37 / 37 |
| [libro/temas/09-inferencia-estadistica/03-tecnicas-de-muestreo.html](../libro/temas/09-inferencia-estadistica/03-tecnicas-de-muestreo.html#afijacion-proporcional) | `afijacion-proporcional` | 22 / 22 |
| [libro/temas/09-inferencia-estadistica/05-estimacion-puntual-y-estimacion-por-intervalos.html](../libro/temas/09-inferencia-estadistica/05-estimacion-puntual-y-estimacion-por-intervalos.html#estimador-estimacion) | `estimador-estimacion` | 43 / 43 |
| [libro/temas/09-inferencia-estadistica/06-intervalos-de-probabilidad-o-intervalos-caracteristicos.html](../libro/temas/09-inferencia-estadistica/06-intervalos-de-probabilidad-o-intervalos-caracteristicos.html#niveles-centrales) | `niveles-centrales` | 50 / 50 |
| [libro/temas/09-inferencia-estadistica/07-intervalos-de-confianza.html](../libro/temas/09-inferencia-estadistica/07-intervalos-de-confianza.html#proporciones) | `proporciones` | 57 / 57 |
| [libro/temas/09-inferencia-estadistica/08-tamano-de-la-muestra-error-cometido.html](../libro/temas/09-inferencia-estadistica/08-tamano-de-la-muestra-error-cometido.html#tamano-proporcion) | `tamano-proporcion` | 54 / 54 |
| [libro/temas/09-inferencia-estadistica/09-ficha-tecnica-de-encuestas.html](../libro/temas/09-inferencia-estadistica/09-ficha-tecnica-de-encuestas.html#ficha-completa) | `ficha-completa` | 10 / 10 |
| [libro/apoyos/estadistica-bidimensional.html](../libro/apoyos/estadistica-bidimensional.html#parametros-marginales) | `parametros-marginales` | 367 / 367 |
| [libro/apoyos/combinatoria.html](../libro/apoyos/combinatoria.html#combinaciones-repeticion) | `combinaciones-repeticion` | 121 / 121 |

## TEO-25B · Corrección de tablas (14 de noviembre)

Aplicada la clase reutilizable `table-readable` a cinco tablas: producción 6.3, traducción binomial 8.2, estimadores 9.5, niveles centrales 9.6 y ficha técnica 9.9. El estilo común de `assets/css/learning.css` conserva un ancho mínimo de 36 rem y evita partir palabras arbitrariamente; cada contenedor mantiene nombre accesible, encabezados semánticos y entrada por teclado. Incluye foco visible y elimina el ancho mínimo en impresión. No se cambia el contenido ni el diseño general.

Verificación: repetida la prueba de las 16 páginas (994 fórmulas y 994 MathML auxiliares, sin errores ni desbordamiento global en las tres configuraciones). Las cinco regiones tienen desbordamiento interno intencionado y responden a la flecha derecha al enfocarlas. Las capturas móviles de las cinco tablas se han inspeccionado: ya no parten las etiquetas en columnas de pocas letras. Comprobados los enlaces de 190 páginas, sin pendientes.

La prueba comprueba desplazamiento con teclado, no lectura con lector de pantalla ni todos los gestos táctiles. Las comprobaciones de impresión son ajustes preventivos de estilo, no una validación impresa. Continúan TEO-25C–E; siguiente tanda: acceso a las fórmulas largas.

## TEO-25C · Acceso completo a fórmulas largas (14 de noviembre)

Hallazgo: los contenedores de fórmulas permitían desplazamiento horizontal, pero algunos no tenían entrada en el recorrido de Tab. Corregido en `assets/js/core/math.js`: se añade foco administrado únicamente a las fórmulas que desbordan su caja, sin cambiar las etiquetas matemáticas ni el MathML auxiliar. Se recalcula después del renderizado y ante cambios de tamaño del contenido o de ventana. Se retira ese foco cuando ya no hace falta y se conservan los atributos de foco preexistentes. La desconexión del observador elimina también los nuevos escuchadores. `assets/css/math.css` aporta un contorno de foco visible.

Prueba ampliada: `node tests/theory-review-browser.cjs`. Las 16 páginas pasan, con 994 fórmulas y sus 994 MathML auxiliares, cero errores de renderizado y sin desbordamiento global. Se han realizado **357 comprobaciones de fórmulas largas por configuración** (puede repetirse una fórmula al cambiar tamaño): foco disponible, flechas derecha e izquierda y acceso geométrico a los extremos inicial y final. Se conservan las cinco comprobaciones de tablas por teclado. También pasan las tres pruebas de formulario y la revisión de enlaces de 190 páginas.

Prueba complementaria en 9.7: recorrido real Shift+Tab/Tab hasta la fórmula y actualización de focos al pasar de móvil a escritorio (13 frente a 1; ninguno de los focos administrados restantes carece de desbordamiento). Capturas `formula-focus.png` y `formula-right.png` inspeccionadas, con el índice móvil plegado: muestran el comienzo y el final del intervalo. Evidencias y prueba complementaria en `../tmp/teoria-25/`. El índice desplegado puede ocultar gran parte de la lectura móvil; su interacción con anclas y foco sigue dentro de TEO-25D.

Alcance: Chrome de escritorio con ventanas de prueba y teclas automatizadas; no equivale a una prueba táctil en dispositivo físico ni certifica lectura asistida o pronunciación. Tampoco valida todas las páginas de la web. Siguen pendientes TEO-25D y TEO-25E. Siguiente: navegación, anclas y foco bajo el índice móvil.

## TEO-25D · Navegación, anclas y foco (14 de noviembre)

Corregido `assets/js/core/skin.js`: al activar un apartado desde el índice se conserva su dirección con fragmento, se pliega el índice móvil y se lleva el foco al destino. El destino recibe tabindex negativo temporal sólo si no tenía atributo propio; se retira al perder el foco. Escape cierra el índice móvil y devuelve el foco al resumen. Al salir del índice con Tab se pliega el panel. Los enlaces con modificadores conservan su comportamiento nativo.

El espacio reservado para las anclas se calcula según la altura real del índice plegado, incluidos márgenes y bordes, y se adapta al tamaño de texto. Se recolocan los enlaces directos después del primer render matemático, sin tomar el foco y cancelando esta recolocación si el usuario ya ha comenzado a interactuar. Los cambios de fragmento tienen también su ajuste. El CSS compartido limita el alto del índice y permite desplazar su contenido cuando no cabe.

Prueba reproducible: `node tests/theory-navigation-browser.cjs`. **16 páginas superadas**: enlace directo con fragmento tras el render; apertura con Enter y cierre con Escape; activación de un apartado con Enter y foco en destino; salida por Tab; índice abierto en escritorio; destino sin ocultación bajo el índice a 360 px y con texto al 200 %. Sin excepciones de página. Capturas `navigation-4.png`, `navigation-12.png` y `navigation-16.png` inspeccionadas. Resultados detallados en `../tmp/teoria-25/navigation.json`.

Se ha extraído la fixture local común a `tests/helpers/local-site.cjs`, compartida por las dos pruebas de teoría. La apertura de detalles para inspeccionar fórmulas ahora excluye el índice de navegación: antes el propio helper abría también ese panel, alterando el estado de las capturas de TEO-25A. Las incidencias iniciales de tablas y acceso por Tab se comprobaron por separado y sus correcciones se mantienen.

Validación adicional: tres pruebas de contrato del catálogo superadas; 190 páginas sin enlaces pendientes. Esto comprueba referencias, no la corrección pedagógica de cada solución. La tanda cubre el índice y sus destinos en las 16 páginas ampliadas; no certifica todos los controles de todos los laboratorios, ni el uso con lectores de pantalla. El comportamiento de historial se conserva mediante fragmentos, pero no se ha probado exhaustivamente Atrás/Adelante en esta tanda.

Siguiente: **TEO-25E**, lectura matemática real y pronunciación con tecnologías de apoyo. TEO-25 permanece abierta hasta documentar esa comprobación. TEO-26, alineación de formulario y glosario, sigue pendiente.

## TEO-25E1–E2 · Estructura y preparación de escucha (14 de noviembre)

Seis casos de fracción, sumatorio, integral, intervalo largo, matriz y raíz superan una prueba del árbol real de accesibilidad de Chrome. Las estructuras MathML están expuestas; el SVG se oculta de ese árbol. No es una prueba sonora. Casos, resultados, límites y ficha de escucha en el [protocolo TEO-25E](PROTOCOLO_LECTURA_MATEMATICA_TEO25E.md). TEO-25E3–E4 siguen pendientes; TEO-25 no se cierra.

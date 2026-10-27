# Fórmulas LaTeX: carga, recuperación y mantenimiento

## Decisión

Se conserva **MathJax 3**, la familia usada en los HTML originales, fijando la versión **3.2.2**. No se afirma que sea la más reciente. Se incluye una copia local de tex-svg-full.js, extensiones y soporte MathML accesible en assets/vendor/mathjax-3.2.2/.

El autor escribe LaTeX; el navegador presenta la fórmula mediante SVG y añade MathML para tecnologías de asistencia. La salida SVG incluye los glifos y evita peticiones de fuentes matemáticas. No se usan capturas de fórmulas.

La licencia original y PROVENANCE.json registran procedencia y huella SHA-256 del paquete. La selección local ocupa aproximadamente 3,65 MB; los componentes opcionales no se descargan todos al abrir una página.

## Cómo escribir contenido

- En HTML, usa \( ... \) para fórmulas en línea y \[ ... \] para fórmulas separadas.
- Se admiten también $ ... $ y $$ ... $$ para facilitar la migración. Es preferible la primera notación para no confundir importes monetarios.
- En HTML, escapa el signo menor que como &amp;lt;. En datos JavaScript, utiliza dos barras inversas para representar una.
- Se admiten fracciones, raíces, límites, integrales, matrices, sistemas a trozos y macros \sen y \tg.
- MathJax procesa expresiones, no documentos completos con preámbulo y páginas. Los exámenes se compilarán a PDF por otra vía.

Todas las páginas cargan el servicio desde assets/js/app.js. Los widgets lo cargan mediante widgets/shared/widget-runtime.js. No añadas otra etiqueta de MathJax ni invoques directamente typesetPromise desde las actividades.

## Contenido dinámico

~~~js
import { renderMath, updateMath } from './ruta/a/core/math.js';

// Contenido nuevo que ya existe en el DOM:
await renderMath(contenedor);

// Sustituir una pregunta que ya tenía fórmulas:
await updateMath(contenedor, () => {
  contenedor.textContent = '\\(\\lim_{x\\to2}(x+1)=3\\)';
});
~~~

updateMath limpia el registro anterior, modifica el bloque y lo procesa dentro de la misma cola. Mantén los campos de respuesta fuera del bloque que sustituyes. La observación automática detecta además fórmulas nuevas dentro de main, pero no sustituye esa API cuando se retiran fórmulas existentes.

## Resguardos implementados

1. Una única promesa de carga por documento.
2. Copia local versionada y caché HTTP; sin peticiones a un CDN durante la lectura.
3. Tres intentos por archivo; máximo de 12 segundos por descarga. Las esperas crecen y tienen una variación aleatoria.
4. Descarga con AbortController antes de ejecutar: un intento cancelado no ejecuta tarde otra copia.
5. Agrupación de solicitudes durante 30 ms y eliminación de ámbitos duplicados o contenidos en otros.
6. Cola de promesas con una sola conversión activa por documento. Cada iframe es independiente.
7. Detección de fallos del motor y de componentes auxiliares; aviso accesible y botón **Reintentar fórmulas**.
8. Nuevo intento al recuperar conexión, con separación mínima de 10 segundos entre eventos de reconexión.
9. Recuperación sin recargar la página ni borrar respuestas.
10. Los errores de escritura de LaTeX se señalan; repetir descargas no corrige una fórmula inválida.

La ejecución utiliza una URL Blob creada desde el archivo local. Si se añade una política CSP al alojamiento, debe permitir script-src 'self' blob: y los estilos generados por MathJax, o adaptar el cargador a esa política.

La caché reduce solicitudes repetidas. No garantiza capacidad ilimitada del alojamiento ni recuperación durante una caída permanente de red. La concurrencia local comprueba el cliente; no equivale a una prueba de capacidad de GitHub Pages.

## Comprobación reproducible

- node --test tests/generators.test.mjs verifica generadores y banco inicial.
- tests/math-browser.cjs usa Playwright, Chromium/Chrome y el servidor local iniciado.
- El segundo script necesita Playwright disponible para Node. NODE_PATH permite resolver una instalación existente, CHROME_PATH seleccionar Chrome y TEST_URL probar otra dirección base, incluida una subcarpeta.
- El registro de esta entrega está en docs/verificacion-entrega-01.md y PLAN_DE_ACCION.md.

## Referencias oficiales

- [Procesamiento asíncrono, cola y limpieza de fórmulas](https://docs.mathjax.org/en/v3.2/web/typeset.html).
- [Componentes combinados y tex-svg-full](https://docs.mathjax.org/en/v3.2/web/components/combined.html).
- [Opciones de carga y manejo de errores](https://docs.mathjax.org/en/v3.2/options/startup/loader.html).

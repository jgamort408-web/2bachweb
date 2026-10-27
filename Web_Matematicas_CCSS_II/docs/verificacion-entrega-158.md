# Verificación de la entrega 158 · Tanda T02

Fecha: 18 de octubre de 2026. Alcance: catálogo normalizado, contratos de visibilidad y adaptadores sustituibles.

## Cambios comprobados

- Catálogo inmutable de 947 entidades: 144 páginas —incluidos 28 anfitriones de widgets—, 398 preguntas y 405 tarjetas. IDs originales, rutas y estados editoriales conservados.
- Un único control para página anfitriona y widget; dependencia del tema y de laboratorios. Las actividades dependen de su página propietaria y del tema.
- Esquema de catálogo y configuración de versión 1; rechazo de referencias inexistentes, duplicados, rutas impropias, ciclos mixtos, audiencias y cambios de formato incompatibles.
- Ocultación heredada sin borrar la selección individual; accesos permanentes a Inicio y Accesibilidad. El estado editorial no altera la visibilidad.
- Contrato de parejas examen/solución con dependencia obligatoria del examen. Manifiesto real de recursos vacío; pruebas con metadatos ficticios claramente separados.
- Repositorio común de consultas y cargador de manifiestos con direcciones compatibles con una subcarpeta.
- Adaptador estático con respaldo validado y tiempo máximo; adaptador de desarrollo en memoria con instantáneas, suscripciones y conflictos de versión.
- Contrato de integración y lista de comprobaciones pendientes para el panel y la conexión central en [arquitectura-visibilidad.md](arquitectura-visibilidad.md).

## Resultados

- **Unitarias completas:** 76 archivos, **329 pruebas superadas, cero fallos**. [Registro completo](../../tmp/tanda-02-158-unit-tests.log).
- **Contratos nuevos:** 27 pruebas incluidas en ese total; verifican el catálogo real, recursos, estados, restauración de elecciones, cuatro combinaciones de examen/solución, actividades por contexto, dos guardados simultáneos, suscripciones, red/HTTP/JSON/esquema y agotamiento del tiempo durante la lectura del cuerpo.
- **Chrome:** content-visibility-158-browser.cjs supera raíz y subcarpeta con importación real de módulos, lectura de los cinco manifiestos, configuración estática, guardado en memoria y respaldo ante red o esquema inválido. No se modifican localStorage ni sessionStorage. El título y las fórmulas existentes permanecen disponibles, sin errores de página.

## Límites y siguiente tanda

T02 está cerrada. **T03 queda pendiente:** panel, borrador, vista previa, guardado/descartado y aplicación del filtro a todas las vistas y rutas. Las páginas públicas conservan su funcionamiento previo; importar o editar los contratos no activa todavía la ocultación.

T04 deberá incorporar autenticación, autorización del servidor, persistencia compartida, propagación, historial y restauración. La memoria de desarrollo no acredita esas funciones. No se activan cuentas ni historial del alumnado; no se modifican los originales, el diseño o la configuración de MathJax. Los PDF reales continúan pendientes.

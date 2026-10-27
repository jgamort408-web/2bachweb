# Verificación de la entrega 159 · Tanda T03

Cierre: 20 de octubre de 2026. Alcance: panel de desarrollo, borradores y aplicación pública de la visibilidad. El trabajo se inició el 18 de octubre y se retomó tras quedar interrumpida una ejecución de navegador.

## Cambios comprobados

- Árbol completo, búsqueda por nombre/ID y elecciones de visibilidad con explicación de herencia, estado editorial separado y accesos permanentes.
- Borrador independiente, descartar, comparación, resolución explícita de conflictos por entrada y confirmación solo después de un guardado autorizado.
- Vista previa navegable de desarrollo, con mensajes validados del mismo origen, iframe e identificador de sesión. No cambia la publicación ni otra pestaña.
- Pantalla pública de administración sin controles de edición operativos cuando no hay servicio. La prueba local se ofrece exclusivamente en direcciones de loopback y avisa de que sus guardados se pierden al recargar.
- Contexto compartido de disponibilidad, lecturas agrupadas, conservación de la última configuración válida en el documento y avisos ante fallos.
- Filtrado de menús, índices, enlaces, preguntas y tarjetas; comprobación de direcciones directas y apertura de widgets.
- Las partidas iniciadas pueden terminar; el comienzo de otra queda bloqueado tras ocultar el juego.
- Comprobación inicial antes de pintar el contenido en los 173 HTML de páginas/widgets. El HTML fuente continúa legible sin JavaScript.
- Registro de la lectura existente de Inferencia, antes ajena al catálogo y con ID compartido con Test. El catálogo pasa de 947 a **948 entidades**, sin crear contenido matemático: 145 páginas, 398 preguntas y 405 tarjetas.
- Las 60 preguntas de lectura de Probabilidad y las 20 de Inferencia comparten IDs con el banco y dependen de su tema; no reaparecen por una ruta alternativa.
- Las migraciones son repetibles. La regeneración de la lectura de Inferencia conserva los metadatos de visibilidad.
- Ajustes funcionales del panel para teclado, descripción del estado y reflujo con texto ampliado. No se aborda el diseño final.

## Resultados

### Unitarias

**77 archivos; 341 pruebas superadas; cero fallos.** La ejecución completa terminó con código 0. [Registro completo](../../tmp/tanda-03-159-unit-tests.log).

Se añaden doce pruebas respecto de T02: diez de borrador/autorización/confirmación/conflictos y dos de integridad de páginas y lecturas. El conjunto específico de visibilidad contiene 39 pruebas, incluidas en las 341.

### Navegador

[visibility-panel-159-browser.cjs](../tests/visibility-panel-159-browser.cjs) terminó con código 0. [Registro completo](../../tmp/tanda-03-159-browser.log).

Comprueba:

- Raíz y subcarpeta; ocultación de tema, página, preguntas y tarjetas individuales; recuentos y enlaces.
- Lecturas de Probabilidad/Inferencia: bloqueo del tema y exclusión de una pregunta, manteniendo las otras 59 o 19.
- Panel por teclado, borrador, descarte y guardado exclusivamente en memoria.
- Vista previa, navegación dentro del iframe y ausencia de cambios en otra pestaña pública.
- Foco conservado al releer una configuración idéntica.
- Pantalla móvil de 390 px con texto al 200 %, sin desbordamiento horizontal.
- Partida completa de Derivada Detective después de ocultar el juego, seguida de bloqueo de la siguiente partida.
- Carga independiente de los 28 widgets, sin errores de página ni errores matemáticos.
- Ausencia de controles administrativos operativos en un origen de despliegue no local.
- Fallo de catálogo con mensaje de reintento; última configuración válida conservada durante un fallo de actualización; lectura sin JavaScript.

[math-browser.cjs](../tests/math-browser.cjs) terminó con código 0:

- Dos descargas fallidas seguidas de recuperación automática.
- Sesenta peticiones concurrentes agrupadas con una sola conversión activa.
- Fallo persistente, reintento manual y respuesta seleccionada conservada.
- Componente opcional y MathML de asistencia.
- Ocho páginas cargadas simultáneamente.
- Recorrido completo de las 398 preguntas, tarjetas, widget insertado/independiente y móvil.

[express-10-browser.cjs](../tests/express-10-browser.cjs) y [tangent-09-browser.cjs](../tests/tangent-09-browser.cjs) terminaron con código 0. Cubren sus partidas completas, teclado, relojes, pausa/caducidad, recuperación de LaTeX, móvil e inserción bajo subcarpeta.

## Límites

T03 queda cerrada como implementación de interfaz y filtrado. **El panel administrativo compartido no está completo:** T04 debe aportar identidad autorizada, reglas del servidor, persistencia central, propagación en dos navegadores, historial y restauración. No se sustituye ese requisito por la prueba local.

Los campos de orden y destacados existen en el contrato; sus controles administrativos avanzados quedan registrados en T04. La biblioteca de T07 sigue pendiente de PDF reales. El respaldo entre recargas, la accesibilidad manual y el diseño final requieren sus propias comprobaciones.

No se han cambiado las fuentes originales ni el contenido matemático de preguntas/soluciones en esta tanda. No se activan cuentas ni historial del alumnado. La configuración de MathJax conserva sus reintentos y cola.

Guía de uso y archivos: [administración y visibilidad](administracion-y-visibilidad.md).

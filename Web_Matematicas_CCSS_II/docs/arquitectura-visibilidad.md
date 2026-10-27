# Contratos de catálogo y visibilidad · T02

Entrega 158 · 18 de octubre de 2026 · Esquemas de versión 1.

T02 preparó el modelo común. En T03 se conecta con las páginas y con el panel de desarrollo: [guía vigente de administración y visibilidad](administracion-y-visibilidad.md). El guardado global con autenticación, permisos e historial corresponde a T04.

## Archivos y responsabilidades

| Archivo | Función |
|---|---|
| [config/pages.json](../config/pages.json) | IDs, títulos, rutas y padres de las 145 páginas |
| [config/widgets.json](../config/widgets.json) | Correspondencia de los 28 widgets con su página anfitriona y tema |
| [config/editorial.json](../config/editorial.json) | Estado de revisión, independiente de la visibilidad |
| [config/study-scopes.json](../config/study-scopes.json) | Destinos de los tres ámbitos de repaso especiales |
| [content/activities/catalog.js](../content/activities/catalog.js) | Las 398 preguntas y 405 tarjetas existentes |
| [config/resources.json](../config/resources.json) | Manifiesto de cuarenta y ocho PDF revisados en veinticuatro parejas, entrega 176 |
| [config/visibility.json](../config/visibility.json) | Configuración estática inicial y versión de publicación |
| [content/contracts.js](../assets/js/content/contracts.js) | Validación básica, errores de contrato y copias inmutables |
| [content/catalog.js](../assets/js/content/catalog.js) | Normalización y validación del catálogo y sus dependencias |
| [content/project-catalog.js](../assets/js/content/project-catalog.js) | Carga común de los cinco manifiestos y los bancos existentes |
| [content/visibility.js](../assets/js/content/visibility.js) | Validación de configuración y cálculo de visibilidad efectiva |
| [content/repository.js](../assets/js/content/repository.js) | Consultas compartidas para páginas, recursos y actividades |
| [admin/visibility-repository.js](../assets/js/admin/visibility-repository.js) | Interfaz de lectura/guardado y adaptadores estático y de desarrollo |

No hay dependencia de un proveedor externo, del DOM ni de almacenamiento personal en los modelos. El cargador común sí utiliza HTTP y el resolvedor de direcciones existente, compatible con una subcarpeta de GitHub Pages. Recibe un AbortSignal; el coordinador de T03 establece diez segundos de carga y muestra los errores. Un manifiesto incompleto provoca error, sin sustituirlo silenciosamente por un catálogo vacío.

## Entidades e identificadores

El catálogo normalizado tiene la forma `{ schemaVersion: 1, entities: [...] }`. Tras registrar en T03 la lectura existente de Inferencia, contenía 948 entidades: 145 páginas, 398 preguntas y 405 tarjetas. Tras T05 y los dieciséis lotes de T06, contiene **996 entidades**, incluidos cuarenta y ocho PDF revisados. En T02 eran 947; los 28 widgets están incluidos entre las páginas y no se duplican.

| ID normalizado | Origen | Relación |
|---|---|---|
| `page:t01` | Página del tema | Padre: libro |
| `page:t01-e01` | Lección | Padre: tema |
| `question:<id original>` | Pregunta | Padre: lección, repaso o tema; depende también de su tema cuando procede |
| `card:<id original>` | Tarjeta | Mismo criterio que las preguntas |
| `page:game-t01-a-limite-express` | Página anfitriona del juego | Padre: laboratorios; depende del tema; incluye widgetId y widgetPath |
| `resource:<id estable>` | PDF | Padre: recursos o exámenes; puede depender de un tema y de un examen |

Los IDs originales permanecen intactos en sourceId. `entityIdFor('widget', idOriginal)` devuelve el mismo ID que `entityIdFor('page', hostPageId)`: el panel tiene un único control para anfitrión y widget. Desde T03, los enlaces directos a ambos consultan ese ID.

Cada entidad incluye kind, title, parentId, requires, audience, locked y reviewStatus. Las rutas se mantienen relativas al proyecto; no se admiten rutas externas, segmentos de subida, rutas duplicadas, referencias rotas ni ciclos, aunque mezclen padres y dependencias.

Las preguntas y tarjetas tienen reviewStatus `untracked`: no se atribuye automáticamente a cada ítem una revisión editorial que aún no se ha realizado. Las páginas conservan su estado original. Un estado `pending` o `partial` no oculta contenido.

Inicio y Accesibilidad son accesos públicos permanentes. No admiten ocultación y no dependen de un padre ocultable. Administración tiene audiencia `admin`; Mi progreso, `inactive`; la página de error, `system`. Ninguna selección de visibilidad puede convertir estas audiencias en contenido público. Esta clasificación no autentica usuarios ni protege archivos estáticos.

Los ámbitos especiales de repaso usan su página registrada como propietaria y conservan la dependencia del tema. Por tanto, ocultar esa página también excluye esas preguntas de otras vistas; no se cambia su autoría para que reaparezcan por otro camino.

## Configuración de visibilidad

Ejemplo de borrador válido:

```json
{
  "schemaVersion": 1,
  "version": 0,
  "defaultVisibility": "visible",
  "entries": {
    "page:t01": { "visibility": "hidden" },
    "page:t01-e02": { "visibility": "visible" },
    "page:t02": { "order": 0, "featured": true }
  }
}
```

- schemaVersion cambia cuando cambia el contrato; una versión desconocida se rechaza.
- version identifica una publicación, es un entero seguro no negativo y sirve para detectar conflictos de guardado.
- defaultVisibility establece la política inicial de **cada entidad**. `inherit`, o la ausencia de una elección, utiliza esa política. No constituye una orden para mostrar todo un subárbol cuando la política general sea `hidden`.
- visibility admite `inherit`, `visible` o `hidden`. `visible` sigue sujeto a padres y dependencias.
- order es un entero de 0 a 1 000 000. Las consultas aplican ese orden; los empates mantienen el del catálogo. El panel podrá ordenar cada colección de hermanos.
- featured es booleano y queda preparado para vistas futuras; no cambia la visibilidad ni introduce un destacado visual en esta tanda.
- No se aceptan IDs desconocidos, campos sin valor, campos editoriales ni permisos dentro de entries.

La política inicial es `visible`, coherente con el acceso actual del proyecto. El respaldo incluido en el módulo, DEFAULT_VISIBILITY_CONFIG, coincide con config/visibility.json; una prueba obliga a mantenerlos sincronizados al preparar un despliegue. Desde T03 se aplica esta configuración a la interfaz.

### Herencia y motivos

`createVisibilityModel(catalog, config)` produce una instantánea inmutable con:

- `isVisible(id)`: resultado efectivo booleano.
- `getState(id)`: visible, selección individual, reason y blockedBy.
- `filter(entities)`: conserva únicamente entidades visibles.

Un contenido solo aparece si su selección lo permite, su padre es visible y todas sus dependencias son visibles. Un hijo marcado como visible no puede superar la ocultación del padre. Mostrar de nuevo al padre conserva las elecciones individuales anteriores. Una entidad desconocida se considera oculta.

reason distingue visible, hidden, default-hidden, dependency, audience, permanent y unknown-content. blockedBy identifica el bloqueo concreto para explicarlo en el panel; estas explicaciones no necesitan mostrarse al alumnado.

La revisión editorial no interviene en este cálculo. Los resultados tampoco dependen de cuentas, respuestas, puntuaciones ni historial del alumnado.

## Exámenes y soluciones

resources.json utiliza `{ schemaVersion: 1, resources: [...] }`. Cada registro real tendrá id, title, path, kind, tags y, si procede, topicId, examId y reviewStatus. kind admite document, exam o solution; path debe apuntar a un PDF del proyecto.

Una solution exige examId de un exam existente y añade automáticamente esa dependencia. Ocultar el examen oculta su solución, aunque esta esté marcada como visible. Ocultar la solución conserva visible el examen. Ocultar la sección de exámenes bloquea ambos; ocultar la vista de recursos bloquea su presentación en esa vista mediante el contexto, sin eliminar el examen del catálogo.

**El manifiesto real contiene cuarenta y ocho PDF revisados**, con rutas, etiquetas y dependencias de veinticuatro parejas examen/soluciones. Los tres recursos de tests/helpers/visibility-fixtures.mjs siguen siendo metadatos ficticios independientes y sustituyen al catálogo real cuando una prueba los solicita expresamente. La interfaz de biblioteca queda pendiente de T07.

## Repositorio de contenido

`createContentRepository(catalog)` ofrece:

- `getAllContent()`: catálogo íntegro e inmutable para el panel.
- `getVisibleContent(config)`: contenido público filtrado y ordenado.
- `getVisiblePages(config)`: páginas y anfitriones.
- `getVisibleResources(config)`: PDF visibles.
- `entityIdFor(kind, sourceId)`: correspondencia con los IDs originales.
- `getVisibleActivities(kind, items, config, { contextPageId })`: filtra preguntas o tarjetas por su propietaria, dependencias y la página donde se utilizan.

contextPageId utiliza el ID original, por ejemplo `tests`. Si el test está oculto, la consulta desde esa página devuelve cero actividades. La misma pregunta puede seguir disponible en una lección visible si su propietaria y su tema lo permiten. La consulta no modifica el banco original.

Exploradores, preguntas procedurales y bloques resueltos aún integrados en el HTML heredan la visibilidad de su página. Su inventario como bloques editables independientes queda pendiente de T10; no se cuentan como preguntas base nuevas.

## Repositorio de configuración sustituible

Los dos adaptadores exponen:

```text
capabilities
readPublicConfig() -> Promise<{ config, origin, warning }>
save(candidate, expectedVersion) -> Promise<{ config, origin, warning }>
subscribe(listener) -> función para cancelar la suscripción
```

| Adaptador | Lectura | Guardado | Suscripción | Persistencia |
|---|---|---|---|---|
| createStaticVisibilityRepository | HTTP validado y respaldo | Rechazado | No disponible | Archivo estático del despliegue |
| createMemoryVisibilityRepository | Estado de su instancia | Con control de versión | Cambios de esa instancia | Memoria de desarrollo |

El adaptador estático utiliza `cache: 'no-cache'`, un límite de ocho segundos que incluye la lectura del cuerpo y un respaldo validado desde su creación. Si falla red, HTTP, JSON, esquema o tiempo máximo, devuelve origin `fallback` y warning. No transforma un fallo en un guardado satisfactorio. Sus capacidades declaran write y subscribe como false; save/subscribe generan RepositoryUnavailableError.

El adaptador en memoria devuelve origin `development-memory`. Compara expectedVersion con la publicación actual; el candidato conserva esa versión de partida y el adaptador la incrementa al confirmar. Dos guardados simultáneos con la misma versión producen un éxito y un VersionConflictError con las versiones esperada y actual. El estado interno no se expone al lector y un observador fallido no revierte un guardado.

Este adaptador no guarda en localStorage, no comparte cambios entre pestañas o visitantes, no comprueba credenciales y no conserva historial. Sus capacidades lo identifican expresamente como memoria. **No satisface la administración central solicitada por el usuario.**

## Responsabilidades de integración y producción

T03 implementa carga común, borradores, filtros y vista previa de desarrollo. Los pasos relativos al proveedor real, permisos, publicación compartida e historial siguen pendientes de T04.

1. Cargar el catálogo común y leer la configuración publicada; mostrar un aviso administrativo cuando se usa respaldo.
2. Mantener separados publicación, borrador y vista previa. El borrador conserva version; no altera la publicación al tocar una casilla.
3. Dibujar el árbol con la selección individual y la visibilidad efectiva, las dependencias y los accesos permanentes.
4. Usar getAllContent para administración y las consultas filtradas para menús, índices, test, tarjetas, juegos, biblioteca y enlaces.
5. Controlar también las rutas directas y la apertura de widgets. La página administrativa y la de error necesitan su tratamiento propio, distinto del catálogo público.
6. Guardar solo cuando capabilities.write y la autorización real lo permitan. En el despliegue estático, presentar el guardado central como no configurado. Una demostración en memoria estará identificada como desarrollo.
7. Esperar la confirmación del repositorio antes de anunciar publicación. Ante conflicto, conservar el borrador, volver a leer y permitir comparar; no sobrescribir sin resolver.
8. En T04, sustituir el adaptador por un proveedor real con autenticación y reglas del servidor; comprobar dos navegadores, denegación a visitantes, historial y restauración.
9. En T04, definir también lectura de la última configuración pública conocida, actualización entre visitantes y respaldo de publicación. El respaldo inicial de T02 no acredita sincronización ni recuperación de la última escritura central.
10. Las partidas ya iniciadas pueden acabar; al recibir una ocultación se bloquea iniciar otra. T03 aplica y comprueba esta política; T04 debe verificarla con actualizaciones del servicio central.

Ocultar controla la presentación. Los archivos incluidos en un alojamiento estático siguen siendo recuperables por su dirección; la protección de material privado necesitaría un servicio con autorización.

## Comprobación

`npm run test:visibility` ejecuta 39 pruebas de contrato, integridad de páginas, herencia, recursos, consultas, respaldo, borradores y conflictos. `npm test` las incluye en la batería completa.

`npm run test:visibility-browser` comprueba los módulos y manifiestos reales en Chrome, desde raíz y subcarpeta; comprueba también el respaldo, la ausencia de escrituras de almacenamiento y la continuidad del HTML y las fórmulas existentes. Requiere servidor local y el navegador configurado como el resto de regresiones del proyecto.

Resultados concretos: [verificación de la entrega 158](verificacion-entrega-158.md).

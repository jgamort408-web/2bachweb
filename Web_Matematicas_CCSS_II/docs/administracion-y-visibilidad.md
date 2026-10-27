# Administración y aplicación pública de la visibilidad · T03

Entrega 159 · 20 de octubre de 2026.

## Qué está implementado

La web consulta una configuración común para decidir qué aparece en menús, índices, enlaces, preguntas, tarjetas y juegos. Las direcciones directas también se comprueban: una página oculta muestra un mensaje de disponibilidad y un enlace al inicio.

El catálogo registra **996 entidades**: 145 páginas, 398 preguntas, 405 tarjetas y cuarenta y ocho PDF revisados (entrega 176). Los 28 juegos están incluidos en las páginas como anfitriones con su widget asociado. El aumento respecto de T02 corresponde al registro de la página de lectura de Inferencia que ya existía; no es una lección nueva ni contenido matemático añadido.

Las copias de lectura de las 60 preguntas de Probabilidad y las 20 de Inferencia comparten los IDs del banco autocorregible. Dependen también de su tema, por lo que no permiten volver a mostrar preguntas ocultas desde una dirección alternativa.

La configuración inicial conserva todo el contenido público visible. El estado editorial —revisado, parcial o pendiente— sigue siendo independiente de la visibilidad.

## Estado de la administración central

**Todavía no están configurados el inicio de sesión administrativo ni el guardado global.** En un despliegue público, la página de Administración informa de esa situación y no abre las funciones de edición.

La prueba de desarrollo solo se ofrece en localhost, 127.0.0.1 o ::1. No otorga una identidad administrativa, no escribe en un servidor y no sustituye la integración central de T04.

El alumnado sigue sin cuentas, estadísticas persistentes ni historial de respuestas. Los resultados pertenecen a la sesión; solo se mantienen las preferencias de lectura ya existentes.

## Probar el panel en el equipo de desarrollo

1. Abrir [Administración local](http://127.0.0.1:4173/admin/index.html) con el servidor del proyecto activo.
2. Elegir **Activar prueba local sin publicar**. El aviso de prueba permanece visible.
3. Desplegar la jerarquía o buscar por nombre o ID, por ejemplo `page:t01`.
4. Elegir **Mostrar**, **Ocultar** o **Usar configuración inicial**. Cada fila indica su visibilidad efectiva y, si procede, qué padre o dependencia la bloquea.
5. Seleccionar una página y pulsar **Abrir o actualizar vista previa**. El iframe utiliza el borrador; navegar dentro de él conserva esa vista previa.
6. **Descartar cambios** devuelve el borrador a la configuración guardada y recarga la vista previa.
7. **Guardar solo en memoria** confirma una versión únicamente en esa pestaña. Al recargar se pierde; no afecta a la web pública abierta en otra pestaña.

No es necesario editar JSON para utilizar estos controles. El botón de publicación real se habilitará cuando un proveedor central y una identidad autorizada estén configurados y probados en T04.

### Herencia

Ocultar un tema bloquea sus lecciones, actividades, juegos y las lecturas de test asociadas. No borra las elecciones de sus hijos. Volver a mostrar el tema recupera esas elecciones: un hijo ocultado individualmente continúa oculto.

Una elección **Mostrar** no supera la ocultación de un padre o una dependencia. Inicio y Accesibilidad son accesos permanentes y sus controles están deshabilitados. Administración, Mi progreso y la página de error tienen un tratamiento distinto del contenido público; la visibilidad no concede permisos.

Cada widget y su página anfitriona comparten un control. La edición no ofrece dos interruptores contradictorios para la misma actividad.

### Borrador, guardado y comparación

La configuración guardada y el borrador son objetos separados. Una edición no modifica la publicación. El panel solo confirma un guardado después de que el repositorio lo acepte.

Si otra escritura cambia la versión, se conserva el borrador y se prepara una comparación. Los cambios en entidades distintas se combinan; cuando ambos modifican la misma entrada de forma diferente, hay que elegir explícitamente **Mi borrador** o **La versión guardada**. Después se revisa y se vuelve a guardar.

La comparación funciona por entrada de contenido, no por campo individual. Eliminar una elección para volver a la configuración inicial también es un cambio y se conserva al combinar.

Un fallo de lectura o de guardado no descarta el borrador ni se presenta como una publicación confirmada. Los controles se bloquean durante una operación para evitar ediciones o guardados simultáneos desde la misma sesión.

## Comportamiento público

- Menús y enlaces relacionados excluyen destinos ocultos. Los índices cuentan las lecciones visibles.
- Los test y las tarjetas usan los mismos IDs y dependencias. Sus recuentos reflejan la selección disponible.
- Los exploradores, ejercicios resueltos y variantes procedurales sin un ID independiente heredan la visibilidad de su página.
- Las referencias cruzadas ocultas no eliminan el párrafo o razonamiento matemático que las contiene.
- Una página o un widget ocultos no abren una actividad nueva desde una dirección directa.
- Si un juego ya tiene una partida iniciada cuando se oculta, conserva esa instancia y su resumen. El intento de iniciar otra queda bloqueado.
- Cuando una página inicialmente oculta vuelve a estar disponible, se pide recargar para inicializarla de forma completa.
- No se vuelve a construir la navegación cuando una lectura devuelve exactamente la misma configuración, para conservar el foco y la interacción.

La carga inicial se oculta hasta verificar la configuración, sin impedir la lectura del HTML cuando JavaScript está desactivado. Se conserva el carácter estático del sitio: la ocultación dosifica la presentación; no hace privados los archivos incluidos en el alojamiento.

### Lectura y fallos

El catálogo tiene un límite de carga de diez segundos y la configuración dispone de un respaldo validado. Si ya se leyó una publicación válida y falla una actualización, se conserva la última configuración conocida **en ese documento** y se muestra un aviso. No se afirma persistencia de esa copia entre recargas.

Las actualizaciones se consultan aproximadamente cada 30–33 segundos mientras el documento está visible, y al volver a él o recuperar la conexión. Las llamadas concurrentes comparten la misma lectura. No se promete propagación central en este modo estático; T04 deberá probarla con el servicio real.

Si no se puede validar el catálogo, la página muestra un mensaje y permite recargar. Una salvaguarda independiente evita que una carga incompleta del propio módulo deje la pantalla indefinidamente vacía.

La cola de MathJax, sus reintentos y la recuperación manual se conservan. El servicio de visibilidad no recarga la página para intentar recuperar una fórmula.

## Organización para continuar el desarrollo

| Archivo | Responsabilidad |
|---|---|
| [admin/index.html](../admin/index.html) | Pantalla, avisos, controles y contenedor de vista previa |
| [admin/panel.js](../assets/js/admin/panel.js) | Árbol, búsqueda, edición, comparación y vista previa |
| [admin/draft-session.js](../assets/js/admin/draft-session.js) | Borrador independiente, autorización, confirmación y conflictos |
| [admin/visibility-repository.js](../assets/js/admin/visibility-repository.js) | Adaptadores estático y en memoria; punto de sustitución en T04 |
| [content/runtime.js](../assets/js/content/runtime.js) | Contexto común, lecturas agrupadas, actualizaciones y mensajes de vista previa |
| [content/document.js](../assets/js/content/document.js) | Disponibilidad de la página, enlaces y copias estáticas de preguntas |
| [core/content-gate.js](../assets/js/core/content-gate.js) | Comprobación inicial antes de pintar el contenido |
| [shared/navigation.js](../assets/js/shared/navigation.js) | Navegación filtrada |
| [learning/indexes.js](../assets/js/learning/indexes.js) | Índices y recuentos visibles |
| [learning/quiz.js](../assets/js/learning/quiz.js), [learning/flashcards.js](../assets/js/learning/flashcards.js) | Actividades filtradas y sesiones sin persistencia personal |
| [shared/widget-host.js](../assets/js/shared/widget-host.js), [widget-runtime.js](../widgets/shared/widget-runtime.js) | Anfitrión, preferencias, estado de partida y acceso al widget |
| [visibility.css](../assets/css/visibility.css) | Distribución funcional del panel y avisos; diseño general provisional |
| [install-content-gates.mjs](../scripts/install-content-gates.mjs) | Migración repetible de comprobaciones iniciales y entradas de widgets |
| [register-reading-questions.mjs](../scripts/register-reading-questions.mjs) | Vinculación de lecturas estáticas con los IDs del banco |

La vista previa usa mensajes del mismo origen, del iframe esperado y con un identificador de sesión. Sus configuraciones se validan y no conceden acceso administrativo. Está limitada al entorno de desarrollo.

El generador de la lectura de Inferencia conserva ahora el ID correcto de página, la comprobación inicial y los IDs de preguntas al regenerar el archivo.

## Trabajo que sigue pendiente

T04 debe conectar un proveedor real: autenticación, autorización del servidor, guardado compartido, historial y restauración, lectura confirmada y propagación en dos navegadores. La interfaz del panel admite un repositorio sustituible y una comprobación de autorización; no debe habilitarse la publicación real basándose en una marca local.

Los controles avanzados de orden y destacados, cuyos campos ya admite el contrato, quedan pendientes de su integración administrativa. La interfaz de biblioteca con búsqueda y filtros se completará en T07; resources.json ya registra cuarenta y ocho PDF revisados con etiquetas y veinticuatro parejas vinculadas.

La validación manual con lector de pantalla corresponde a T13. Los ajustes funcionales de esta tanda no constituyen el diseño final de T16.

## Evidencias

Pruebas y límites de esta entrega: [verificación 159](verificacion-entrega-159.md). Secuencia y tareas: [plan de cierre](PLAN_CIERRE_POR_TANDAS.md).

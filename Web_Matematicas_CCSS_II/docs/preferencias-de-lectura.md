# Preferencias de lectura

Entrega 11 · 27 de septiembre de 2026.

## Archivos

- `assets/js/core/preferences.js`: esquema permitido, lectura y escritura defensivas, aplicación a la raíz del documento y controles reutilizables.
- `assets/css/preferences.css`: ampliación, contraste y resaltado optativos. No modifica la familia tipográfica ni las reglas editoriales por defecto.
- `components/header.html` y `assets/js/app.js`: punto de montaje común tras cargar la cabecera, con alternativa si falla el fragmento.
- `assets/js/shared/widget-host.js`: envía las preferencias al recibir la señal de actividad lista, al cargar el iframe y al cambiar ajustes.
- `widgets/shared/widget-runtime.js`: recibe ajustes del padre y muestra controles propios únicamente al abrir el widget por separado.
- `accesibilidad/index.html`: explicación para estudiantes de lo disponible y lo pendiente.

## Contrato

Objeto permitido: `textSize` (100, 125, 150, 175 o 200), `contrast` (booleano), `highlight` (booleano). Valores desconocidos vuelven al predeterminado; los campos adicionales se descartan. El módulo no acepta CSS arbitrario.

Solo se guarda este objeto en localStorage, con una clave versionada que incluye la ruta raíz del proyecto. Dos repositorios alojados bajo el mismo dominio tienen preferencias separadas. Las pestañas del mismo proyecto se sincronizan mediante el evento storage. Al limpiar el almacenamiento se restauran los valores predeterminados.

Si no se puede leer o escribir, no se bloquea la página: los cambios funcionan en memoria durante la visita actual. El control indica que no podrá recordarlos. Los mensajes entre página e iframe permiten aplicar ajustes incluso en ese caso.

El canal math-widget exige origen, emisor padre/iframe, identificador de widget y tipo de mensaje coincidentes. Los mensajes de preferencias no escriben de nuevo en almacenamiento ni devuelven otro mensaje de preferencias al padre. Así se evitan ciclos. ResizeObserver notifica cambios de altura; el anfitrión mantiene su límite de 8000 px.

El evento interno reading:changed notifica el objeto normalizado. setPreferences permite persist: false para sincronizar sin guardar de nuevo. getPreferences devuelve una copia.

## Fórmulas y estados

La ampliación cambia el tamaño raíz; las fórmulas conservan sus glifos SVG y la representación MathML. No se vuelve a generar una pregunta, reiniciar un reloj ni procesar MathJax por cambiar una preferencia. Las fórmulas anchas, también las insertadas en línea, tienen desplazamiento horizontal local.

Los widgets suspenden sus observadores al salir y los reactivan al restaurar el documento desde la caché de navegación. Tangente Sprint conserva el tiempo en pausa hasta que el usuario reanude.

No se guardan respuestas, identidad, progreso ni puntuaciones. Estos ajustes no constituyen autenticación ni control administrativo de visibilidad.

## Alcance pendiente

Espaciado, concentración, traducción y voz siguen sin implementar. Las gráficas conservan sus colores, formas, etiquetas y alternativas textuales; el modo de contraste mejora texto, controles y superficies de lectura. Falta una auditoría completa de contraste gráfico y una comprobación real con lectores de pantalla y diferentes navegadores. No se declara conformidad WCAG a partir de estas pruebas.

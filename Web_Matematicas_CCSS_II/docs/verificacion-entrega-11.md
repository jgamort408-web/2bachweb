# Entrega 11: revisión conjunta y preferencias de lectura

Fecha: 27 de septiembre de 2026.

## Resultado

Controles compartidos para texto del 100 % al 200 %, mayor contraste y resaltado de definiciones, ideas, resúmenes y enunciados marcados. Funcionan en páginas y juegos independientes; los juegos insertados heredan los ajustes del anfitrión. Solo se recuerdan preferencias de presentación.

Se conserva el diseño provisional, las familias de letra y el motor local MathJax. No se añade contenido matemático nuevo ni se alteran las cifras de t01: 18 lecciones, 60 preguntas base, 61 tarjetas, 15 problemas, siete exploradores y cuatro laboratorios.

## Correcciones encontradas

- Fórmulas largas en línea: desplazamiento horizontal dentro de la fórmula para que el texto al 200 % no ensanche la página.
- Enunciados, alternativas de test y selectores: límites de anchura y ajuste del contenido en móvil de 320 px.
- Botones de widgets: heredan el tamaño de lectura, incluida Derivada Detective.
- Observadores de fórmulas y altura de widgets: se restauran con el documento al volver mediante la caché de navegación.
- Tangente Sprint: el reloj conserva la pausa al salir y vuelve a funcionar tras reanudar una página restaurada.

## Verificación

| Comprobación | Resultado |
|---|---|
| Enlaces y anclas de 171 HTML | Sin destinos locales ausentes ni identificadores duplicados |
| Navegación de las 18 lecciones | Índice, anterior y siguiente comprobados contra el catálogo |
| 18 lecciones a 320 px y texto al 200 % | Sin desbordamiento global ni errores de fórmula |
| Cuatro juegos insertados e independientes | Ajustes heredados; controles propios solo en modo independiente |
| Cambio de ajustes durante una pregunta | Entradas y opciones elegidas conservadas; mismos nodos de fórmulas |
| Móvil y botones ampliados | 320/390 px, controles con texto de 32 px al 200 %, altura del iframe ajustada |
| Persistencia | Solo tres preferencias, sincronización entre pestañas y separación entre raíz y subcarpeta |
| Almacenamiento denegado | Ajustes en memoria, aviso y propagación al iframe operativos |
| Mensaje de emisor incorrecto | Ignorado, aunque tenga el mismo origen |
| Restauración de Tangente Sprint | Eventos de ciclo de vida simulados: pausa durante 60 s y expiración tras reanudar |
| Pruebas matemáticas y de estado | 22 pruebas superadas |
| Regresión de lecciones avanzadas | Tres lecciones, comparador, test de 60 preguntas y 61 tarjetas superados |
| Regresión de Tangente Sprint | Seis retos, 3500/3600 con pista, controles, pausas, expiraciones y recuperación LaTeX superados |
| Regresión completa de MathJax | Reintentos de motor y componente, recuperación conservando respuesta, 60 solicitudes agrupadas, ocho páginas simultáneas, test completo y widgets superados |

Prueba reproducible nueva: `npm run test:accessibility`, con Playwright, Chrome y el servidor local disponibles. Regresiones: `npm test`, `npm run test:advanced`, `npm run test:tangent`, `npm run test:browser`. Captura local de revisión: `../tmp/lectura-detective-200.png` (fuera del sitio publicado).

La prueba general de MathJax devuelve el foco a la página interactiva después de abrir las páginas de carga paralela; también lo hace al comprobar un componente auxiliar. Las ejecuciones previas se interrumpieron por lentitud con las páginas en segundo plano. La ejecución final completa supera todas sus comprobaciones.

Los ensayos de caché simulan pagehide/pageshow con persisted; no equivalen a comprobar la elegibilidad real de cada navegador para conservar documentos. La prueba de foco y semántica DOM no sustituye el uso de un lector de pantalla.

## Pendientes y continuación

El cierre global de t01 permanece sin marcar por la revisión con lectores de pantalla y lectura matemática. Traducción, voz, demás ayudas, PDF y administración siguen sus fases propias. Se puede comenzar 2.1, «Esquema general para representar una función», manteniendo visibles estos pendientes.

Detalles de arquitectura: [preferencias-de-lectura.md](preferencias-de-lectura.md).

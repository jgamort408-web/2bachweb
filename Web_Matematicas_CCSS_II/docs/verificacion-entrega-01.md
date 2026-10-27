# Verificación de la entrega 01

Fecha: 16 de septiembre de 2026.

## Resultado

Lecciones 1.1 y 1.2 completadas y verificadas en esta entrega. Límite Express continúa parcial: tres familias implementadas. El tema 1 completo no está cerrado.

## Evidencia de comprobación

| Comprobación | Resultado |
|---|---|
| 1.000 semillas, 10.000 preguntas procedurales | Aprobada: cuatro alternativas diferentes, respuesta estable, resultado matemático comprobado |
| Banco de seis preguntas | Aprobada: IDs y respuestas únicas, pistas y explicaciones |
| 171 documentos HTML | Sin destinos locales inexistentes ni IDs duplicados |
| Fórmulas estáticas de las dos lecciones | Renderizadas sin errores MathJax detectados |
| 60 solicitudes simultáneas de renderizado | Agrupadas; máximo de una conversión activa; sin contenedores anidados |
| Dos descargas fallidas del motor | Recuperación automática en el tercer intento |
| Fallo persistente del motor | Tres intentos; aviso y recuperación manual al restablecer el archivo |
| Conservación de respuestas | La opción seleccionada permanece tras recuperar las fórmulas |
| Componente opcional ui/safe | Dos fallos y recuperación en el tercero |
| Accesibilidad matemática estructural | MathML de asistencia presente |
| Ocho páginas simultáneas | Fórmulas presentadas sin errores JavaScript |
| Sesión completa de test | Resultado esperado 6/6; preguntas y explicaciones renderizadas |
| Tarjetas | Respuesta desplegable y navegación operativas |
| Widget | Carga autónoma y embebida; fórmulas y altura automática |
| Subcarpeta /curso/ | Ocho páginas y widget cargados; navegación dentro de la base correcta |
| Móvil 390×844 | Sin desbordamiento horizontal del documento; fórmulas y tabla revisadas visualmente |
| Escritorio | Ejemplos, límites y fracciones revisados visualmente |

Las comprobaciones matemáticas detalladas están en procedencia-contenidos.md.

## Correcciones motivadas por las pruebas

1. La recuperación procesaba un ámbito y un descendiente a la vez. MathJax podía intentar dividir un texto ya transformado. Se normaliza toda lista de ámbitos, incluida la de reintentos.
2. Las nuevas rutas de lección tenían un nivel relativo de más. Funcionaban en raíz, pero podían salir del proyecto alojado en subcarpeta. Se corrigieron y se probaron con prefijo.
3. La importación de estilos matemáticos de widgets debía preceder a las reglas CSS. Se corrigió su posición.

## Límites de la verificación

- Las páginas simultáneas se probaron contra un servidor local; no mide capacidad ni límites de GitHub Pages.
- No se ha hecho todavía una revisión con lector de pantalla real ni una auditoría completa de accesibilidad.
- No se ha compilado ningún PDF en esta entrega.
- Administración, visibilidad central, idiomas, voz y seguimiento futuro mantienen su estado pendiente en el plan.
- La comprobación de rutas no equivale a revisar el contenido de los 84 epígrafes que aún conservan el esqueleto.

## Repetición

Las pruebas mantenidas se encuentran en tests/generators.test.mjs y tests/math-browser.cjs. Las instrucciones de ejecución están en README.md y formulas-latex.md.

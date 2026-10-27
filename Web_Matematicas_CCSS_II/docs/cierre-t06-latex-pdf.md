# Cierre T06 · Paquetes LaTeX y PDF

22 de octubre de 2026 · Entrega 176.

## Resultado comprobado

- **30 paquetes originales conciliados, cero pendientes de revisión del paquete.**
- **48 PDF en 24 parejas de archivos, 154 páginas**. Variantes, ejercicios comentados y anexos conservados con su procedencia; F004 contiene dos exámenes en su pareja.
- Todos los PDF han recibido inspección visual en sus entregas respectivas; las ocho páginas nuevas de F001 se inspeccionan en esta entrega.
- Auditoría conjunta repetida de hashes originales, fuentes revisadas, cálculos independientes, metadatos, páginas y archivos finales. No se recompilan innecesariamente las parejas sin cambios.
- 341 pruebas pasan y Chrome comprueba los 48 PDF desde raíz/subcarpeta. Catálogo: 996 entidades.

Evidencia: [registro individual](pdf/registro-paquetes.json), [informe conjunto](pdf/verificacion-biblioteca.json), [auditoría F001](auditoria-pdf-subida-nota-curso.md), [plan](PLAN_CIERRE_POR_TANDAS.md) y [tareas](../TAREAS.md).

## Qué se ha cerrado

Inventario completo de ZIP, correspondencia de variantes y soluciones, copias revisadas, elaboración de soluciones ausentes identificadas como nuevas, compilación reproducible y catálogo con rutas, etiquetas y dependencias examen/solución. Los originales permanecen intactos. La revisión del paquete no equivale a eliminar los defectos de su fuente histórica.

## Limitaciones conservadas

- M19: faltan costes para determinados beneficios netos del ejercicio heredado de frutos rojos.
- M20/M33: temperatura no determina por sí sola el estado eléctrico; en F004 los criterios de daños solo aparecen en la solución original.
- M22: mecanismo de elección de jamones necesita una redacción inequívoca.
- M23/M31: F009 y F010 no fijan elección o conversión de los 22,5 y 18 puntos nominales.
- M30: el tamaño 144 de F013 requiere convención de tabla/extremos exactos; extremos redondeados permiten 143/144/145.
- M36: anexo comentado de F005 con puntuación discrepante, mantenido como no evaluable.
- Unidades de distancia ausentes y repartos individuales de puntos no precisados en algunos apartados de F004 se mantienen señalados.

Las correcciones concretas y otros límites de contenido constan en [incidencias](incidencias-contenido.md) y en cada auditoría. No se da por resuelta automáticamente toda incidencia de las adaptaciones web ni la revisión editorial del banco T09.

## Lo que sigue

1. T07: biblioteca pública de recursos y exámenes, respetando visibilidad, con búsqueda, filtros y acciones examen/solución separadas.
2. T08–T12: combinatoria, cierre de fuentes, revisión editorial, metadatos/buscador, práctica, tarjetas y herramientas.
3. T13–T15: accesibilidad, idiomas, voz y widgets pendientes. Los PDF tienen fuentes y texto extraíble, pero no etiquetado semántico completo; el lector de pantalla sigue pendiente.
4. T04: servicio central, autenticación y permisos reales. El panel de desarrollo no acredita esa conexión; ocultar enlaces estáticos no protege el acceso directo a archivos.
5. T16: diseño final y publicación verificada. Diseño actual y MathJax permanecen sin cambios en T06.

Repetir `python scripts/check-pdf-library.py` tras cambios en fuentes, manifiesto o PDF. Las revisiones visuales deben repetirse para los documentos cuyo contenido cambie. El informe conjunto se escribe solo si se supera la comprobación completa.

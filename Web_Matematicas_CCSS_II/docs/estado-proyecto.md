# Estado vigente del proyecto

Actualizado: 22 de octubre de 2026 · Entrega 176 · Tandas T01–T03, T05 y T06 cerradas.

La base de este resumen es el [análisis de pendientes del plan](analisis-pendientes-plan-2026-10-18.md), seguido por el [plan de cierre por tandas](PLAN_CIERRE_POR_TANDAS.md). Las entradas por entrega del README y del plan son un historial; sus cifras antiguas no representan el estado actual.

## Cobertura

- 86 lecciones con contenido: 58 con estado revisado y 28 parciales. Temas 1–5 desarrollados; 6–9 con estado parcial. Las diez lecciones de Probabilidad recibieron una pasada editorial y auditoría automatizada.
- 398 preguntas base, 405 tarjetas y 19 de 28 juegos revisados.
- 33 HTML originales de programación lineal y bloques estadísticos integrados, con carencias conservadas; Probabilidad utiliza parcialmente sus ocho originales.
- Combinatoria pendiente de migrar.
- 30 de 30 paquetes LaTeX revisados: veinticuatro parejas de archivos (48 PDF), 154 páginas; ninguno pendiente de conciliación. F004 contiene dos exámenes en su pareja. Registro individual en docs/pdf/registro-paquetes.json.
- Panel de desarrollo y filtrado público implementados. La administración central protegida, compartida y persistente sigue pendiente de T04.
- Catálogo de 996 entidades, con 145 páginas, herencia, dependencias y control de versiones; incluye la lectura de Inferencia que ya existía y sus IDs corregidos.
- Recursos y exámenes mantienen su interfaz pendiente de T07; el manifiesto ya registra cuarenta y ocho PDF revisados. Formulario y glosario conservan su esqueleto.
- Tamaño, contraste y resaltado disponibles; traducción, voz, espaciado y concentración pendientes.

## Comprobación vigente

La tanda T01 resolvió los 50 fallos detectados en el diagnóstico. Tras T03, la ejecución habitual descubre **77 archivos unitarios: 341 pruebas superadas, cero fallos**. Hay un contrato editorial por tema, las 60 preguntas de Probabilidad tienen cuatro alternativas y las referencias de repaso se validan contra páginas y apartados reales.

La entrega 157 vuelve a comprobar en navegador las diez lecciones de Probabilidad y sus 60 preguntas; incluye el cuarto distractor, fórmulas, raíz/subcarpeta, móvil y lectura sin JavaScript. La entrega 155 comprobó también los doce problemas. Falta revisión manual de accesibilidad y revisión editorial detallada de las evaluaciones.

La entrega 158 añade 27 pruebas de catálogo y visibilidad, incluidas parejas de PDF ficticias y guardados simultáneos. Chrome comprueba los nuevos módulos desde raíz y subcarpeta y el respaldo ante errores. Los adaptadores estático y de memoria no acreditan autenticación ni persistencia central. Véase [arquitectura de visibilidad](arquitectura-visibilidad.md).

La entrega 159 añade doce pruebas, completa el filtrado de las lecturas alternativas y verifica panel, teclado, foco, texto al 200 %, rutas, partidas activas y carga de los 28 widgets. También pasan la regresión de MathJax —60 solicitudes concurrentes, ocho páginas simultáneas y test completo—, Límite Express y Tangente Sprint. Véanse [guía de administración](administracion-y-visibilidad.md) y [verificación 159](verificacion-entrega-159.md).

## Próximas prioridades

1. T04: conexión central, autenticación y permisos reales; historial y restauración. Falta configurar el servicio.
2. T07: completar la biblioteca etiquetada con búsqueda, filtros y acciones separadas; T06 está cerrada con auditoría conjunta de las 24 parejas.
3. T08–T12: combinatoria, revisión de fuentes y evaluaciones, metadatos, buscador, práctica, tarjetas y herramientas.
4. T13–T15: accesibilidad, idiomas, voz y actividades pendientes conforme a los originales.
5. T16: diseño final y despliegue, tras verificar el conjunto.

M13 identifica la corrección logarítmica de F029; M14, el límite asintótico del cohete. M13 está corregida en la copia LaTeX y PDF de la entrega 161; M14 queda corregida en copia LaTeX/PDF en la entrega 169. Las dificultades y destrezas del banco aún requieren normalización en T10.

Se mantiene la instrucción de reutilizar los HTML originales y dejar señaladas las carencias de programación lineal, estadística bidimensional, distribuciones e inferencia. No se activan cuentas ni historial del alumnado.

Entrega 160: [primera pareja PDF revisada y proceso repetible](auditoria-pdf-recuperacion-t1.md), M08 corregida en copia y M15 documentada. Las 341 pruebas siguen pasando.

Entrega 161: [lote F029/F030](auditoria-pdf-subida-nota-t1-general.md), M06/M13 corregidas y M16 documentada. T06 continúa abierta.

Entrega 162: [lote F025/F026](auditoria-pdf-sistemas-sels-i.md), resultados originales confirmados, cinco páginas revisadas y 79 casos del parámetro contrastados. T06 continúa abierta.

Entrega 163: [lote F027/F028](auditoria-pdf-sistemas-sels-ii.md), cinco páginas revisadas, 79 casos del parámetro contrastados y registro de los 30 ZIP. T06 continúa abierta.

Entrega 164: [lote F019/F021](auditoria-pdf-programacion-lineal-i.md), M07 corregida en esta pareja y M17 conciliada; seis páginas revisadas. T06 sigue abierta y M07 pendiente para F020/F022.

Entrega 165: [lote F020/F022](auditoria-pdf-programacion-lineal-ii.md), correspondencia restaurada y frutos rojos conservados en anexo con carencia M19 señalada. M07 atendida en ambas parejas; T06 continúa abierta.

Entrega 166: [lote F014/F015](auditoria-pdf-matrices-i-ii.md), dos solucionarios elaborados y verificados, originales conservados y ocho páginas revisadas. T06 sigue abierta.

Entrega 167: [lote F016](auditoria-pdf-matrices-iii.md), cuatro páginas revisadas y soluciones nuevas contrastadas; trío Matrices I–III revisado. T06 continúa abierta.

Entrega 168: [lote F006/F007](auditoria-pdf-funciones.md), dos exámenes distintos, soluciones nuevas y doce páginas revisadas. M20 señala hipótesis necesarias del corte eléctrico; T06 continúa abierta.

Entrega 169: [lote F008](auditoria-pdf-limites-derivadas.md), M14 corregida en copia/PDF, nueve páginas revisadas y anexos conservados. T06 continúa abierta.

Entrega 170: [Distribuciones I/II](auditoria-pdf-distribuciones.md), M02/M03 corregidas; ocho páginas revisadas, 341 pruebas superadas. Índice vigente: [TAREAS.md](../TAREAS.md).

Entrega 171: [Probabilidad I/II](auditoria-pdf-probabilidad.md), doce páginas revisadas, redondeo corregido e interpretación del muestreo explícita. 341 pruebas superadas; siguiente lote F009.

Entrega 172: [Recuperación F009](auditoria-pdf-recuperacion-inferencia.md), quince páginas revisadas; M04/M05 y extremos corregidos, recinto completado. M23 (selección/nota) permanece abierta. 341 pruebas superadas; siguiente lote F011/F012.

Entrega 173: [Inferencia I/II](auditoria-pdf-inferencia-i-ii.md), M27/M28 atendidas en estas copias, diez páginas revisadas y 341 pruebas superadas. Siguiente lote F010/F013.

Entrega 174: [F010/F013](auditoria-pdf-inferencia-recopilaciones.md), catorce páginas revisadas y 341 pruebas superadas. M31, evaluación sin regla, y M30, precisión para respuesta única, permanecen señaladas. Siguiente lote F004/F005.

Entrega 175: [Repaso y final](auditoria-pdf-repaso-y-final.md), 21 páginas revisadas; solucionario nuevo de F005 y carencias de F004 explícitas. 341 pruebas superadas; siguiente F001, último paquete pendiente.

Entrega 176: [F001](auditoria-pdf-subida-nota-curso.md) y [cierre T06](cierre-t06-latex-pdf.md). M01/M37/M38 corregidas; ocho páginas nuevas revisadas. Auditoría conjunta de 30 originales y 48 PDF superada; 341 pruebas pasan. Siguiente T07; las carencias originales siguen documentadas.

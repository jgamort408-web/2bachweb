# Verificación · Entrega 75

Inicio: 12 de octubre de 2026. Cierre: 13 de octubre de 2026.

## Resultado

Integrada [6.5. Problemas de programación lineal](../libro/temas/06-programacion-lineal/05-problemas-de-programacion-lineal.html) a partir del HTML original: seis ejercicios, 23 pasos y laboratorio GeoGebra. Estado parcial; 58 lecciones desarrolladas y cinco parciales, 318 preguntas, 301 tarjetas y dieciséis juegos.

## Evidencia

- [Comprobación matemática exacta](../tests/pl-problems-75-math.py): seis modelos, conjuntos completos de vértices, objetivos y óptimos, 630 muestras fraccionarias factibles, enumeración entera en muebles/drones, redundancias y mínimo no acotado de dieta. Aprobada.
- [Prueba de navegador](../tests/pl-problems-import-75-browser.cjs) aprobada: siete fuentes originales intactas por SHA-256, seis problemas y 23 pasos, resultados finales y ausencia de errores de MathJax.
- Cambios rápidos de selector sin duplicación de fórmulas; vista conjunta, enlaces directos y navegación anterior/tema, en raíz y subcarpeta.
- Texto al 200 %, contraste y resaltado, móvil de 320 px sin desbordamiento horizontal global, tablas desplazables por teclado y preferencias conservadas tras recargar.
- Corregida la prueba de tabla: al navegar solo al fragmento, la solución seguía abierta y pulsar Enter la cerraba; ahora se consulta su estado antes de abrirla. La tabla real no necesitó cambios.
- Cero peticiones externas antes de activar el laboratorio.
- Fallos controlados de GeoGebra, reintento correcto, una sola instancia, cierre y espera máxima de 35 segundos comprobados. La lección y sus fórmulas permanecen disponibles.
- Ensayo del proveedor GeoGebra real aprobado el 12 de octubre: appletOnLoad recibido, API disponible e inecuación 2x+y≤10 aceptada. Captura del semiplano inspeccionada.
- Regresión de 6.4 aprobada con cinco lecciones parciales en el índice; comprobados cálculos, figuras, fórmulas y navegación.
- 172 HTML y seis documentos Markdown revisados: sin enlaces rotos, fragmentos ausentes ni IDs duplicados.

## Evidencia visual

Capturas inspeccionadas: [resolución de drones](../../tmp/problemas-pl-drones.png), [laboratorio real](../../tmp/problemas-pl-geogebra.png) y [conclusión en móvil](../../tmp/problemas-pl-movil.png).

## Límites

Las pruebas de fallos con proveedor simulado verifican el control de carga y recuperación; no sustituyen el ensayo real del servicio. La disponibilidad futura de GeoGebra depende del proveedor y de la conexión.

No se cambian los generadores existentes. La batería acumulada de modelos sigue siendo la de 277 pruebas de la entrega 69; esta entrega añade comprobaciones específicas. No se certifica accesibilidad completa del laboratorio externo ni pronunciación de fórmulas.

Siguiente: [6. Flashcards.txt](<../../Página web existente/1. Programación Lineal/6. Flashcards.txt>). Continúan pendientes PDF, administración central, traducción, voz y cuentas futuras.

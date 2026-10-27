# Verificación · Entrega 36

Fecha: 5 de octubre de 2026.

## Resultado

[Área por tramos](../laboratorios/juegos/t03-c-area-por-tramos.html) disponible como página anfitriona y [widget independiente](../widgets/games/t03-c-area-por-tramos/index.html). Seis retos, cada uno con tres pasos: partición mínima, integrales parciales e integral/área. Dieciocho decisiones puntuables.

Diez widgets desarrollados, incluidos los tres de integrales. Totales conservados: **35 lecciones, 180 preguntas base y 163 tarjetas**. El tema 3 sigue parcial por revisión conjunta y accesibilidad global.

## Archivos y arquitectura

Desde la raíz web:

- `widgets/games/t03-c-area-por-tramos/generator.js`: seis familias, fracciones, análisis de entradas y estado de sesión.
- `graph.js`: curva SVG, selección de abscisas y regiones rayadas.
- `widget.js`: fases, controles equivalentes, tabla, pistas y soluciones.
- `index.html` y `style.css`: instrucciones y presentación local.
- `laboratorios/juegos/t03-c-area-por-tramos.html`: anfitrión con cabecera/pie y enlaces de refuerzo.
- Portada, Laboratorios, índice y cierre de t03: enlaces al juego.
- `tests/area-segments.test.mjs` y `tests/area-segments-36-browser.cjs`: pruebas matemáticas y navegador.

Se reutilizan MathJax y preferencias compartidas, conservando diseño provisional y resultados solo en memoria.

## Matemáticas y mecánica

Se varían traslación y escala con signo, usando seis patrones:

1. Recta con un cruce interior y extremos asimétricos.
2. Cuadrática con dos cruces interiores.
3. Cúbica con tres cruces e integral total cero en intervalo simétrico, pero área positiva.
4. Cuadrática con contacto interior, sin cambio de signo.
5. Cuadrática con una raíz en un extremo y otra interior.
6. Cuadrática de signo constante, sin raíces.

Los extremos ya pertenecen a la partición. Se piden solo cortes interiores necesarios por cambio de signo. Un corte adicional puede ser válido para integrar; la consigna pide la partición mínima. Las funciones son continuas y polinómicas.

Los valores de primitivas en los extremos enteros se calculan mediante numeradores enteros en doceavos y se reducen a fracciones. El área suma los valores absolutos de las integrales parciales. Se muestran primitiva, diferencia F(derecha)−F(izquierda), suma con signos y suma de aportaciones positivas.

Entradas admitidas: enteros, fracciones equivalentes, coma/punto decimal y signo menos tipográfico. Se acepta una diferencia absoluta máxima de 0,005 (más un margen de representación de 0,000000001), coherente con redondear a dos decimales. No se evalúan expresiones de código o álgebra. Formato inválido, casilla vacía o denominador cero no consumen intentos.

Dos intentos por paso: 100/50/0 puntos; tras dos errores se muestra la solución. Máximo 1800. Pistas sin penalización, una contabilización por paso. Sin reloj ni persistencia de resultados.

## Pruebas matemáticas y de estado

**122 pruebas acumuladas superadas**, incluidas cinco nuevas:

- 1000 semillas y 6000 curvas. Primitivas contrastadas por diferencias finitas e integrales parciales por Simpson independiente.
- Cambios de signo a ambos lados de cada corte, signo por tramo, contacto y extremos.
- Integral/área, área mayor o igual al valor absoluto de la integral, y cúbica con cancelación sin área nula.
- Formatos numéricos y fracciones, rechazo de entradas inválidas y tolerancia de redondeo.
- 18 pasos perfectos: 1800 puntos. Reintento, dos errores y pistas: 1600 puntos.
- Bloqueo de doble puntuación, avance antes de tiempo, pistas repetidas e intentos no consumidos por formato inválido.

La revisión analítica de las familias y sus raíces se complementa con comprobaciones numéricas; ni la gráfica muestreada ni la tabla se presentan como demostraciones generales.

## Navegador y capturas

`tests/area-segments-36-browser.cjs` superado:

- Dos sesiones completas, 36 pasos, 1600/1800 y 1800/1800.
- Cortes seleccionados con ratón en la gráfica, con Espacio y mediante casillas sincronizadas.
- Contacto y ausencia de raíces sin cortes; extremos excluidos de los candidatos interiores.
- Regiones por tramo, descripción de signos, pista con primitiva, fracciones y decimales con coma.
- Campos bloqueados al resolver, solución tras dos errores, resumen de seis retos y reinicio con semilla nueva.
- Fórmulas procesadas, sin errores MathJax ni delimitadores sin procesar.
- Móvil de 320 px, texto al 200 %, contraste y resaltado. Desplazamiento local de gráfica y fórmulas; sin desbordamiento global.
- Tabla alternativa de valores y casillas utilizables sin depender de la precisión sobre la gráfica.
- Selecciones y entrada numérica conservadas al cambiar preferencias; recarga sin respuestas ni puntuación.
- Iframe y subcarpeta con preferencias propagadas y corrección funcional.
- Ruta de tres enlaces en el índice y navegación al anfitrión. Sin errores JavaScript o HTTP.

Capturas revisadas: `../../tmp/area-tramos-escritorio.png` y `../../tmp/area-tramos-movil.png`. La de escritorio muestra zonas de distinto signo y entradas por tramo. La móvil muestra desplazamiento local, tabla y casillas con lectura ampliada.

Revisión estática: 171 HTML sin referencias locales rotas, fragmentos ausentes ni IDs duplicados. Enlaces de README, auditoría y este documento comprobados.

## Límites y siguiente paso

La gráfica utiliza muestras para dibujar; el modelo y la corrección usan fórmulas analíticas. Solo incluye estas seis familias polinómicas, no funciones arbitrarias ni discontinuidades. La adaptación de la curva a pantalla estrecha conserva un ancho mínimo desplazable y una tabla alternativa.

La verificación de teclado y texto ampliado no sustituye la revisión completa con lectores de pantalla. Se reutiliza el motor de fórmulas existente sin repetir sus ensayos de fallo/recuperación. PDF, administración central, voz, traducción y futuras cuentas siguen pendientes.

Siguiente: revisión integrada de las ocho lecciones, repaso y tres juegos del tema 3; después, 4.1. Matrices.

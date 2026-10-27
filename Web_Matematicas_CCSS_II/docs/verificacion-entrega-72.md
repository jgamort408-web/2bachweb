# Verificación · Entrega 72

Fecha: 12 de octubre de 2026.

## Resultado

[6.2. Sistemas de inecuaciones](../libro/temas/06-programacion-lineal/02-sistemas-de-inecuaciones-lineales-con-dos-incognitas.html) adaptada del HTML original completo: sistema, intersección, vértices y tipos de región. Gráfico y afirmaciones sobre extremos corregidos.

**58 lecciones desarrolladas y dos parciales**, 318 preguntas, 301 tarjetas y dieciséis widgets. No se añaden bancos ni actividades ausentes en la fuente.

## Comprobaciones

Ensayo específico: tests/inequality-systems-import-72-browser.cjs, comando test:inequality-systems-import.

- Hash de cuatro fuentes conservado: Inicio, Presentación, Inecuaciones y Sistemas de inecuaciones.
- Vértices obtenidos independientemente mediante intersección de pares de restricciones y filtro de factibilidad. Coinciden con los cuatro puntos y el polígono del SVG.
- Fronteras, regiones parciales e interceptos verificados con origen (40,280) y escala de 4 píxeles/unidad.
- 286 combinaciones convexas verificadas dentro de las cuatro restricciones; área del cuadrilátero 1600 unidades cuadradas. Es una comprobación interna, no un ejercicio añadido.
- Exclusión de (60,0) y comprobaciones desplegables del mismo ejemplo.
- Fórmulas locales sin errores MathJax, delimitadores visibles ni solicitudes HTTP externas.
- Índice de cinco epígrafes: dos parciales y tres en preparación. El índice general mantiene once lecciones revisadas en sistemas.
- Navegación con teclado, cabecera/pie, texto al 200 %, contraste, resaltado y subcarpeta.
- Móvil de 320 px sin desbordamiento horizontal global.
- Capturas revisadas: [intersección](../../tmp/sistemas-inecuaciones-escritorio.png) y [tipos de región](../../tmp/sistemas-inecuaciones-movil.png).
- Ensayo de 6.2 aprobado tras separar la etiqueta de la recta en la inspección visual.
- Regresión de 6.1 aprobada; sus expectativas de índice se actualizan a dos lecciones parciales.
- 171 HTML y seis documentos Markdown: sin enlaces rotos, fragmentos ausentes ni IDs duplicados.

Los modelos y motores de corrección existentes no cambian; la última suite acumulada sigue siendo la de 277 pruebas de la entrega 69. Se comprueba la integración nueva y la regresión de 6.1, sin repetir aquella batería.

## Límites y siguiente archivo

Lección parcial: no se crean test, tarjetas, explorador o generación procedural ausentes en el HTML fuente. Los ejemplos complementarios de regiones vacías, no acotadas y desigualdades estrictas permanecen pendientes. No se certifica accesibilidad completa.

Siguiente: [3. Programación Lineal.txt](<../../Página web existente/1. Programación Lineal/3. Programación Lineal.txt>), con revisión de la no negatividad según el significado de las variables. Continúan PDF, administración central, traducción, voz y cuentas futuras.

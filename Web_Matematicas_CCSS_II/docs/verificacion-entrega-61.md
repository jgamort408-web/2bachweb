# Verificación · Entrega 61

Fecha: 10 de octubre de 2026.

## Resultado

Disponible [5.7. Resolución mediante inversa](../libro/temas/05-sistemas-de-ecuaciones/07-resolucion-de-sistemas-matriz-inversa.html): teoría, seis ejemplos, práctica resuelta, explorador, seis preguntas y seis tarjetas.

Total: **54 lecciones, 294 preguntas base, 277 tarjetas y trece widgets**. Tema 5: 7/11 epígrafes y bancos 42/42. Las variantes no se suman al banco fijo.

## Contenido y límites

Condiciones de A cuadrada e invertible; deducción por multiplicación a la izquierda; existencia y unicidad; fórmula de orden 2 y adjunta; elección del método, comprobación exacta y reutilización con otro B.

Seis presets: solución entera con determinante negativo, solución fraccionaria, tres incógnitas, B nulo, SCI singular y SI singular. Editor de orden 2 o 3, con enteros entre −9 y 9 en A y B. Cambiar tamaño conserva las entradas comunes y añade ceros, sin prometer que la nueva matriz tenga inversa.

La salida presenta sistema, A, B, determinante, inversa, detalle de adjunta, producto por B y sustitución ecuación por ecuación. Si A es singular, no calcula inversa ni solución: muestra rangos y distingue SCI/SI. No parametriza casos singulares.

Variantes reproducibles de los tres tipos en ambos órdenes; fracciones exactas. Entradas inválidas conservan el último dato válido. Estado solo en memoria. La práctica con término independiente 23 se desarrolla en el libro; el editor mantiene su límite de 9.

## Verificaciones

- **235 pruebas automáticas superadas**, sin fallos ni omisiones.
- Contraste de 729 sistemas exhaustivos y 6.000 variantes reproducibles: clasificación mediante rangos independientes, límites de entrada y soluciones. Comprobación exacta con enteros grandes de cada sustitución y de las columnas de la inversa mediante la identidad.
- Verificados los seis casos, soluciones fraccionarias, determinantes negativos, B nulo, reutilización con otro B, práctica contextual y diferencia frente al redondeo prematuro. Rechazos de entradas inválidas y ausencia de mutaciones; catálogo de 294 preguntas y 277 tarjetas con identificadores únicos.
- Navegador: seis casos, detalle de adjunta, edición y recuperación de entradas, cambios entre órdenes 2 y 3 conservando B, seis combinaciones de tamaño/tipo en el generador y transiciones hacia y desde matrices singulares sin resultados antiguos.
- Test completado con 5/6 aciertos iniciales, reintento y pista; seis tarjetas, navegación por teclado y preferencias de lectura conservadas durante la actividad.
- Revisados móvil de 320 px y texto al 200 %, fórmulas sin errores, cabecera y pie, recarga sin historial personal, índice 7/11, bancos del tema 5 de 42 preguntas y 42 tarjetas y funcionamiento en subcarpeta.
- Sin errores de JavaScript, HTTP o MathJax en el recorrido ni desbordamiento horizontal global. Las fórmulas anchas mantienen desplazamiento local.
- Capturas revisadas visualmente: `../../tmp/sistemas-inversa-escritorio.png` y `../../tmp/sistemas-inversa-movil.png`. La revisión con lectores de pantalla y de pronunciación matemática sigue pendiente.
- Superada la regresión del explorador de Rouché–Frobenius (5.6).
- Comprobados 171 HTML y cuatro documentos Markdown: cero errores de enlaces, fragmentos o identificadores.

## Siguiente contenido

5.8. Método de Gauss. Tema 5 parcial. Diseño provisional, roles editoriales, servicio LaTeX y originales conservados.

Pendientes revisión con lectores de pantalla y pronunciación matemática, PDF, administración central, traducción, voz y cuentas futuras. Se mantiene el criterio de reutilizar todos los HTML originales de programación lineal y bloques estadísticos.

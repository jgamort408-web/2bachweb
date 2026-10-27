# Verificación · Entrega 60

Fecha de cierre: 10 de octubre de 2026. Inicio: 9 de octubre.

## Resultado

Disponible [5.6. Rouché–Frobenius](../libro/temas/05-sistemas-de-ecuaciones/06-teorema-de-rouche-frobenius.html): teoría, seis ejemplos, práctica resuelta, explorador, seis preguntas y seis tarjetas.

Total: **53 lecciones, 288 preguntas base, 271 tarjetas y trece widgets**. Tema 5: 6/11 epígrafes y bancos 36/36. Las variantes no se suman al banco fijo.

## Contenido y límites

Teorema para matrices cuadradas y rectangulares. Compatibilidad por igualdad de rangos; SCD/SCI comparando con n; parámetros libres solo en sistemas compatibles. Justificación conceptual mediante columnas, propiedades r≤s≤r+1, rangos cero, determinante nulo y valores críticos.

Seis presets y familia con parámetro. Editor de dos o tres ecuaciones y dos o tres incógnitas, con enteros de −9 a 9. Ampliada completa; cambios de dimensiones conservan coeficientes comunes y B. Entradas inválidas conservan el último valor correcto. Rangos justificados por un menor no nulo y descarte de órdenes superiores; rango cero explicado por entradas nulas.

La familia λx+y=2, x+λy=2 ofrece muestras enteras −3…3. La lección demuestra su clasificación para todos los valores reales. Editar una entrada desvincula la matriz de esa familia y desactiva el selector del parámetro.

Las variantes generan sistemas 2×2 del tipo SCD/SCI/SI elegido, incluso si antes se editaba otra dimensión. Esta limitación se anuncia en el control y las instrucciones. Semillas reproducibles; variantes pueden repetirse. El explorador clasifica, pero no calcula automáticamente una familia solución. Sin historial ni persistencia de respuestas.

## Verificaciones

**230 pruebas acumuladas superadas**, sin fallos ni omisiones. Cinco pruebas nuevas:

- 729 sistemas 2×2 exhaustivos con entradas −1, 0 y 1, más 2.000 sistemas de cuatro dimensiones, contrastados mediante eliminación independiente.
- 3.000 variantes, mil por tipo, con clasificación garantizada, valores dentro de los límites y semillas reproducibles.
- Seis presets, rangos cero, incompatibilidad con A nula, siete muestras del parámetro y solución del caso genérico.
- Práctica según c, parámetros libres, menores certificados, contraste con escalonamiento exacto y rechazo de datos inválidos.
- Bancos 6/6, t05 36/36 y catálogo 288/271 sin IDs duplicados.

Navegador aprobado: seis presets, siete valores del parámetro, edición que desvincula la familia, rechazo y recuperación de entradas inválidas. Cambios de dimensiones conservan B; generación de SCD/SCI/SI y cambios rápidos mantienen la última selección.

Test 5/6 con pista/reintento y seis tarjetas. Teclado, móvil 320 px/texto 200 %, contraste, resaltado y conservación de estado; recarga sin historial. Índice 6/11, t05 36/36, cabecera/pie y subcarpeta.

Sin errores JavaScript, HTTP o MathJax ni desbordamiento horizontal global. Las fórmulas anchas conservan el desplazamiento horizontal local. Capturas revisadas: ../../tmp/rouche-frobenius-escritorio.png y ../../tmp/rouche-frobenius-movil.png. No se da por certificada la accesibilidad completa con lectores de pantalla.

Regresión de 5.5 aprobada, incluidas operaciones, límites, historial, deshacer, variantes, test, tarjetas y subcarpeta.

171 HTML y cuatro documentos (README, plan, procedencia y esta entrega) comprobados: sin enlaces locales rotos, fragmentos inexistentes ni IDs duplicados.

## Siguiente contenido

5.7. Resolución de sistemas mediante matriz inversa. Tema 5 parcial. Diseño provisional, roles editoriales, servicio LaTeX y originales conservados.

Pendientes la revisión con lectores de pantalla y pronunciación matemática, PDF, administración central, traducción, voz y cuentas futuras. Se mantiene el criterio de reutilizar todos los HTML originales de programación lineal y bloques estadísticos, con carencias señaladas.

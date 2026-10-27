# Verificación · Entrega 58

Fecha: 9 de octubre de 2026.

## Resultado

Disponible [5.4. Notación matricial de un sistema](../libro/temas/05-sistemas-de-ecuaciones/04-notacion-matricial-de-un-sistema-de-ecuaciones.html): teoría, seis ejemplos resueltos, práctica contextual, explorador editable, seis preguntas y seis tarjetas.

Total: **51 lecciones, 276 preguntas base, 259 tarjetas y trece widgets**. Tema 5: 4/11 epígrafes y bancos 24/24. Variantes y configuraciones se cuentan por separado.

## Contenido y límites

Construcción de A, X y B, producto AX=B, dimensiones m×n y matriz ampliada m×(n+1). Signos al ordenar miembros, ceros, reconstrucción de ecuaciones, permutaciones de columnas y filas y diferencia entre escribir, comprobar y resolver.

Seis presets: signos y ceros, dos ecuaciones/tres incógnitas, tres ecuaciones/dos incógnitas, sistema 3×3, términos independientes nulos y fila imposible. Edición de enteros entre −99 y 99 y dimensiones entre dos y tres ecuaciones e incógnitas. Entradas inválidas conservan el último valor correcto y muestran un aviso.

El selector invierte conjuntamente columnas de A y entradas de X; la tabla de entrada mantiene x,y,z y B no cambia. El modelo admite todas las permutaciones; la interfaz ofrece orden normal e inverso. La salida muestra matrices, dimensiones, ampliada, producto simbólico y comprobación de una tupla numérica.

Las variantes reutilizan el generador compatible de 5.1; empiezan con valores de prueba cero y no garantizan unicidad. No se guardan respuestas ni valores. El explorador no resuelve sistemas ni aplica operaciones por filas.

## Verificaciones

**220 pruebas acumuladas superadas**, sin fallos ni omisiones. Cinco pruebas nuevas:

- 8.000 permutaciones sobre 2.000 sistemas de cuatro dimensiones: dimensiones, correspondencia de columnas y conservación de AX y B.
- Sustitución de soluciones generadas, perturbación del término independiente y recuperación de la matriz original sin mutación.
- Seis presets, signos, filas nulas, matrices rectangulares y representación de la ampliada.
- Ejemplos, cambios de miembro, permutación de filas con B y contexto de cuadernos.
- Rechazo de órdenes incompletos, repetidos o fuera de rango y de entradas no admitidas.
- Bancos 6/6 de la lección, t05 24/24 y catálogo 276/259 sin IDs duplicados.

Navegador aprobado: seis ejemplos en orden normal e inverso, edición, validación y recuperación; las cuatro combinaciones de dos/tres ecuaciones e incógnitas, variantes y comprobación de las soluciones generadas. Cambios rápidos conservan el último estado.

Test 5/6 con pista y reintento, seis tarjetas, teclado, preferencias de lectura sin pérdida de valores ni selección, recarga sin historial y navegación. Índice 4/11, filtro t05 24/24, cabecera/pie y subcarpeta.

La primera revisión móvil detectó un desbordamiento de los controles con texto al 200 %. Se corrigió limitando el ancho de las etiquetas y permitiendo envolver los valores de prueba, con reglas restringidas al nuevo explorador. El recorrido completo posterior pasa en 320 px/texto 200 %, contraste y resaltado, sin desbordamiento global ni errores JavaScript, HTTP o MathJax. Las fórmulas anchas conservan el desplazamiento horizontal local del servicio común.

Capturas revisadas: ../../tmp/notacion-sistemas-escritorio.png y ../../tmp/notacion-sistemas-movil.png. Esta revisión no certifica accesibilidad completa con lectores de pantalla.

Regresión de 5.3 aprobada: seis familias, sesiones, pistas, corrección, tarjetas, móvil, filtros y subcarpeta.

171 HTML y cuatro documentos (README, plan, procedencia y esta entrega) comprobados: sin enlaces locales rotos, fragmentos inexistentes ni IDs duplicados.

## Siguiente contenido

5.5. Sistemas equivalentes. Tema 5 parcial. Diseño provisional, roles editoriales, servicio de LaTeX y materiales originales conservados.

Siguen pendientes la revisión con lectores de pantalla y pronunciación matemática, los PDF de exámenes, administración central, traducción, voz y cuentas futuras. Se mantiene el criterio de reutilizar los HTML originales para programación lineal y bloques estadísticos.

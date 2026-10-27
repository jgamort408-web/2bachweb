# Verificación · Entrega 55

Fecha de cierre: 9 de octubre de 2026. Iniciada el 8 de octubre.

## Resultado

Disponible [5.1. Sistemas de ecuaciones lineales](../libro/temas/05-sistemas-de-ecuaciones/01-sistemas-de-ecuaciones-lineales.html): objetivos, requisitos, teoría, cinco ejemplos resueltos, práctica, errores frecuentes, resumen y enlaces.

El curso dispone de **48 lecciones, 258 preguntas base, 241 tarjetas y trece widgets**. El tema 5 comienza con 6 preguntas y 6 tarjetas; 1 de sus 11 epígrafes está desarrollado. Las variantes del explorador se cuentan aparte.

## Contenido y límites

Se identifican incógnitas, coeficientes, signos y términos independientes; se ordenan ecuaciones y se traducen relaciones de cantidades y precios. Se comprueba la misma tupla en todas las igualdades. Una candidata válida no demuestra unicidad; una inválida no demuestra que no haya otras soluciones.

El ejemplo de entradas se utiliza tanto para comprobar como para modelizar. El explorador ofrece cinco bases: entradas, signos/coeficiente cero, dos ecuaciones con tres incógnitas, una fila 0=0 y una fila 0=1. Permite editar de dos a tres ecuaciones y de dos a tres incógnitas. No es un solucionador general.

El generador construye sistemas con al menos una solución entera y empieza con una candidata cero; no garantiza solución única ni que la candidata inicial falle. El editor admite enteros de −99 a 99 para obtener sustituciones exactas. Coeficientes, términos o candidatas inválidos conservan el último valor válido y se señalan. Las nuevas posiciones empiezan en cero al ampliar.

La clasificación, la interpretación geométrica, la notación matricial formal y los métodos quedan para sus epígrafes posteriores. No se modifica el diseño provisional ni la configuración de LaTeX.

## Pruebas matemáticas

**205 pruebas acumuladas aprobadas**, sin fallos ni pruebas omitidas. Cinco nuevas pruebas comprueban:

- 4000 sistemas generados: 1000 semillas para cada dimensión 2×2, 2×3, 3×2 y 3×3; reproducibilidad, sustituciones y perturbación de un término independiente.
- Ejemplos y práctica: resultados, orden de valores y signos; reordenaciones contrastadas con las igualdades originales.
- Filas 0=0 y 0=1 para 361 parejas, respetando las restantes ecuaciones.
- Dimensiones, enteros, datos inválidos, ampliación sin mutar y representación algebraica.
- Seis preguntas con cuatro opciones distintas y una respuesta correcta; seis tarjetas, filtro t05 y catálogo sin IDs duplicados.

Se actualizan los totales globales esperados en 35 archivos de pruebas anteriores; los bancos de los temas 1–4 se conservan.

## Navegador y presentación

Aprobada la nueva verificación de 5.1:

- Cinco ejemplos del explorador; cambios de coeficientes, términos independientes y valores de prueba.
- Validación de blanco, decimal y valor fuera de rango; recuperación con un entero válido.
- Tamaños 2–3, generación reproducible y cambios rápidos sin resultado obsoleto.
- Test con error, pista y reintento: 5/6 al primer intento; las seis tarjetas con sus respuestas.
- Teclado, móvil 320 px/texto 200 %, contraste y resaltado; selección y valores conservados.
- Recarga sin guardar respuestas ni valores de prueba.
- Índice del tema con 1 disponible y 10 en preparación; filtros de test/tarjetas t05 con 6 elementos.
- Carga desde subcarpeta, cabecera/pie y fórmulas sin errores ni delimitadores visibles.

Las tablas y las fórmulas anchas se desplazan dentro de su región; no hay desbordamiento horizontal global. Capturas revisadas: ../../tmp/sistemas-lineales-escritorio.png y ../../tmp/sistemas-lineales-movil.png.

Regresión del repaso de matrices aprobada: cuatro bloques, test 11/12 con ayuda y reinicio, doce lecciones, bancos 72/72 y subcarpeta.

## Enlaces

171 HTML y cuatro documentos (README, plan, procedencia y esta entrega) comprobados: sin enlaces locales rotos, fragmentos inexistentes ni IDs duplicados.

## Siguiente contenido

**5.2. Solución de un sistema de ecuaciones**. Tema 5 parcial.

Siguen pendientes las fases globales de biblioteca LaTeX/PDF, administración central, traducción, voz y revisión con lectores de pantalla. La arquitectura futura de cuentas permanece desactivada. Se conserva el criterio del usuario para reutilizar todos los HTML originales de programación lineal y bloques estadísticos, dejando huecos o mejoras indicadas.

# Verificación · Entrega 59

Fecha: 9 de octubre de 2026.

## Resultado

Disponible [5.5. Sistemas equivalentes](../libro/temas/05-sistemas-de-ecuaciones/05-sistemas-equivalentes.html): teoría, seis ejemplos, práctica guiada, taller de filas, seis preguntas y seis tarjetas.

Total: **52 lecciones, 282 preguntas base, 265 tarjetas y trece widgets**. Tema 5: 5/11 epígrafes y bancos 30/30. Variantes y configuraciones no se suman al banco fijo.

## Contenido y taller

Equivalencia como igualdad del conjunto solución en ambos sentidos; tres operaciones y sus inversas; matriz ampliada completa; identidades, contradicciones y pérdida de información. Se precisa que igual tipo SCD o SCI no basta, mientras dos SI comparten el conjunto vacío bajo las mismas incógnitas y dominio.

Seis sistemas iniciales: SCD, dependiente, incompatible, fracciones, rectangular y tres ecuaciones. Selección de operación, filas y factor; matriz actual, ecuaciones, operación inversa y lista de pasos. Deshacer restaura el estado anterior; reiniciar vuelve al sistema inicial de esa sesión. Elegir otro ejemplo o generar una variante inicia otra sesión.

Factores de interfaz: −3, −2, −1, −1/2, 0, 1/2, 1, 2, 3. Escalar por cero se rechaza; sumar cero veces otra fila se acepta como paso neutro. Origen y destino deben diferir al sumar o intercambiar. Escalar no necesita otra fila.

Fracciones exactas normalizadas. El modelo admite factores con numerador de valor absoluto hasta 9 y denominador hasta 9; limita numeradores y denominadores de la matriz a 1.000.000 para mantener operaciones seguras. Un paso que excede límites se rechaza sin modificar matriz ni historial. Máximo de 30 pasos; se puede deshacer o reiniciar. Estado solo en memoria.

Las variantes conservan las dimensiones del caso elegido y son compatibles; no garantizan unicidad. No hay edición libre de la matriz inicial ni elección automática de operaciones. El taller prepara Gauss, sin sustituir su desarrollo posterior.

## Verificaciones

**225 pruebas acumuladas superadas**, sin fallos ni omisiones. Cinco pruebas nuevas:

- 10.000 transformaciones sobre 2.000 sistemas de cuatro dimensiones: operación inversa exacta, conservación de datos originales y contraste de clasificación mediante eliminación independiente.
- 2.450 comprobaciones de pertenencia de tuplas antes/después en seis casos, incluidos SCI y SI.
- Ejemplos, fracciones, secuencias de pasos y recuperación en orden inverso.
- Contraejemplos de pérdida de información, operaciones inválidas y límite numérico sin mutación.
- Bancos 6/6, t05 30/30 y catálogo 282/265 sin IDs duplicados.

Navegador aprobado: seis casos, intercambio, escalado, suma, fracciones, factor cero, filas coincidentes, avisos de identidad/contradicción y operaciones inversas. Historial, deshacer, reinicio y variante reproducible contrastada con su semilla.

Verificados rechazo por límite numérico sin alterar estado, máximo de 30 pasos y recuperación al deshacer. Test 5/6 con pista/reintento, seis tarjetas, teclado, preferencias sin pérdida de estado, recarga sin historial, índice 5/11 y filtro t05 30/30.

Móvil 320 px/texto 200 %, contraste y resaltado, cabecera/pie y subcarpeta. Sin errores JavaScript, HTTP o MathJax ni desbordamiento horizontal global. Las fórmulas anchas conservan desplazamiento local.

Capturas revisadas: ../../tmp/sistemas-equivalentes-escritorio.png y ../../tmp/sistemas-equivalentes-movil.png. La revisión de teclado y ampliación no certifica por sí sola accesibilidad completa con lectores de pantalla.

Regresión de 5.4 aprobada, incluidas edición, orden de incógnitas, cuatro dimensiones, generación, test, tarjetas y subcarpeta.

171 HTML y cuatro documentos (README, plan, procedencia y esta entrega) comprobados: sin enlaces locales rotos, fragmentos inexistentes ni IDs duplicados.

## Siguiente contenido

5.6. Teorema de Rouché–Frobenius. Tema 5 parcial. Diseño provisional, roles editoriales, motor LaTeX y originales conservados.

Pendientes la revisión con lectores de pantalla y pronunciación matemática, PDF de exámenes, administración central, traducción, voz y cuentas futuras. Se mantiene el criterio de reutilización de los HTML originales en programación lineal y bloques estadísticos.

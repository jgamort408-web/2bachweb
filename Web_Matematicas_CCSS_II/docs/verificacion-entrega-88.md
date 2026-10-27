# Verificación · Entrega 88

Fecha: 14 de octubre de 2026.

## Resultado

[8.3. Distribución normal](../libro/temas/08-distribuciones-de-probabilidad/03-distribucion-normal.html#explorador), con la teoría, los cinco controles y las cuatro vistas del original. Lección parcial.

## Comprobaciones realizadas

- Fuente original intacta por SHA-256. Cinco controles con rangos, pasos y valores iniciales conservados; cuatro gráficos.
- `test:normal-model`: tres pruebas superadas. CDF contrastada con integración de Simpson independiente en z de −12 a 12, paso 0,125, y combinaciones de μ, σ y x del rango de controles, con tolerancia absoluta 2×10⁻⁷ en la malla comprobada.
- Verificados los porcentajes empíricos, simetría, centro exacto 0,5, extremos infinitos, densidad máxima, cambio de dispersión y rechazo de desviaciones inválidas.
- Intervalos invertidos, coincidentes y colas pequeñas comprobados; diferencias de colas positivas sin cancelación a cero.
- `test:normal-import`: prueba de navegador superada.
- μ=2, σ=0,5, a=4, b=−4, k=−4 conserva los controles: zₖ=−12, acumulada pequeña positiva y aviso de extremos invertidos.
- Cambios rápidos finalizan con lecturas y fórmulas correspondientes al último estado.
- Cuatro SVG con viewBox coherente, títulos y descripciones; coordenadas de curvas y áreas dentro del dibujo, sin NaN ni Infinity.
- La curva cambia al modificar σ; CDF sin banda sombreada y densidad con región rayada.
- Teclado en deslizadores y desplazamiento de gráficos; móvil de 320 px con texto al 200 %, contraste y resaltado, sin ensanchar la página.
- Recarga restablece parámetros originales y conserva preferencias de lectura.
- Rutas raíz/subcarpeta, navegación al tema y estado parcial. Aproximación normal sigue pendiente.
- Sin JavaScript: teoría disponible, controles ocultos y aviso explícito; no se presenta un explorador inerte como activo.
- Sin errores JavaScript, errores HTTP ni solicitudes externas durante la prueba.
- Bancos conservados: 318 preguntas y 340 tarjetas; ningún juego añadido.
- Capturas inspeccionadas: [densidad](../../tmp/normal-densidad.png), [acumulada](../../tmp/normal-acumulada.png), [lecturas](../../tmp/normal-lecturas.png) y [controles en móvil](../../tmp/normal-controles-movil.png).

- Revisados 172 HTML y seis Markdown: cero enlaces rotos, fragmentos ausentes o IDs duplicados.

## Límites

La CDF se aproxima numéricamente con los coeficientes del original, conservando las colas pequeñas cuando es posible. La comparación numérica cubre los valores ensayados; no constituye una garantía de precisión arbitraria. Se muestran cuatro decimales y se explican redondeos extremos.

Las gráficas tienen ventana finita, pero las probabilidades no se recortan a esa ventana. Los gráficos y fórmulas anchos mantienen desplazamiento local al ampliar texto.

No se certifica accesibilidad global ni se ha probado concurrencia del alojamiento. El servicio matemático compartido se conserva. No se persisten parámetros ni progreso.

[Auditoría y correspondencias](auditoria-reutilizacion-distribuciones.md). Siguiente: [4. Aproximación de la Binomial por la Normal.txt](<../../Página web existente/4. Distribuciones/4. Aproximación de la Binomial por la Normal.txt>).

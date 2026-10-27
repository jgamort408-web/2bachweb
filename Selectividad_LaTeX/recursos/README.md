# Recursos asociados a los enunciados

Una carpeta por ID: `recursos/SEL-D0001-OA-E01/`, por ejemplo. Guardar aquí únicamente figuras o tablas que sean necesarias para comprender ese enunciado, una vez revisadas. Ahora no hay recursos de ejercicios incorporados.

- Priorizar vectores PDF para gráficos cuando sea posible; para imágenes, usar resolución legible al tamaño de impresión.
- Conservar ejes, escalas, etiquetas, unidades, marcas y datos del original. No completar una figura por suposición.
- Identificar la fuente y las páginas en el CSV; registrar las rutas de los recursos con `|` si son varias.
- Una tabla auxiliar compartida puede ir en `recursos/comunes/` con procedencia y revisión. No copiar automáticamente todas las tablas repetidas del archivo de fuentes.
- Las rutas de `\includegraphics` se interpretan desde la raíz del proyecto. Ejemplo futuro: `\includegraphics[width=.65\linewidth]{recursos/ID/figura.pdf}`.

Los originales completos permanecen en `../Selectividad/`. No son necesarios para compilar el esqueleto en Overleaf; sí para transcribir y cotejar con fidelidad.

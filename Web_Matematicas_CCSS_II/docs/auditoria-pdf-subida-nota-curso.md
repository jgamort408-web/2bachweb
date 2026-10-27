# Auditoría PDF · Subida de nota de curso

22 de octubre de 2026 · Entrega 176 · T06, lote 16 cerrado.

## Fuente y evaluación

F001: `Materiales y Recursos y Exámenes/BACH - 2 CCSS - EXAMEN SUBIDA NOTA CURSO.zip`. Copia revisada: `content/latex/subida-nota-curso/`. ZIP y main.tex registrados por SHA-256; original intacto, sin imágenes ni logo añadido.

Se conservan cuatro bloques A–D de 2,5 puntos, 90 minutos, respuestas en papel separado y regla de corregir solo el primer ejercicio físicamente respondido en cada bloque. Se mantiene aunque cada bloque presente un único ejercicio. Calculadora no programable, no gráfica y sin almacenamiento/transmisión; 0,25 puntos de expresión incluidos por ejercicio. No se importan los 55 minutos ni los 0,5 puntos de otros exámenes.

Las soluciones proceden del original y se revisan. La gráfica del recinto se elabora en esta edición.

## Correcciones

- **M01:** a=5 para continuidad en 2; derivadas laterales 0 y −1, por lo que no es derivable. Para a=4, el dominio de la función a trozos es todo R: cerca de 1 rige el polinomio, f(1)=1, sin asíntota vertical. Decrece en cada intervalo (−∞,2) y [2,∞) por separado, pero no globalmente: f(3/2)=1/4<f(2)=1. En 2 hay salto finito. Asíntota horizontal y=0 solo por la derecha; sin oblicua lineal por la izquierda.
- **M37:** el recinto de tartas tiene vértices (0,0), (40,0), (20,40), (8,46), (0,46). Beneficios 0,400,680,632,552. Máximo único **680 euros en (20,40)**. El óptimo original (17,46) necesita 109 kg de bizcocho, más que los 100 disponibles; (50,0) también es inviable por crema. El óptimo continuo es entero y sirve asimismo para tartas enteras.
- **M38:** los diez desfases suman **30,9**, media **3,09** minutos. IC97 %≈(1,71751434;4,46248566), o (1,72;4,46) a dos decimales. Se corrige la suma 31,9 y el intervalo centrado en 3,19 del original.
- El tamaño mínimo para margen <30 segundos al 95 % permanece en **62**, comprobando que 61 incumple. Aumentar confianza eleva la cota real; el tamaño entero es no decreciente y puede permanecer igual para incrementos pequeños.
- Probabilidades del bloque C confirmadas: 0,1;0,7;0,9;0,2. Se interpreta P(A/B) como probabilidad condicionada según la solución original y se conserva la hipótesis de probabilidades no nulas para incompatibilidad/independencia.

## Verificación independiente

`../scripts/pdf_math_course_raise.py` verifica cocientes incrementales, rama válida y contraejemplo de monotonía. El polígono se contrasta por recorte exacto de semiplanos y enumeración de planes enteros. Un certificado independiente prueba la cota continua: 14/3 veces la restricción de bizcocho más 8/3 veces la de crema da 10x+12y≤680, alcanzada en (20,40).

Las probabilidades se contrastan con diez resultados equiprobables que representan los cuatro átomos. Suma y media con fracciones exactas; cuantiles por cuadratura y bisección independiente; intervalos y mínima muestra contrastados.

- Dos PDF, cuatro páginas cada uno: **ocho páginas revisadas visualmente**; sin recortes, solapamientos ni fórmulas rotas. A4, títulos, idioma, texto extraíble, fuentes incrustadas, ausencia de cifrado y errores de glifos comprobados.
- Recompilación sin conexión con los dos SHA-256 idénticos: `../../tmp/pdfs/lote-176/hashes-before.json`. Informe `pdf/subida-nota-curso-build.json`.
- **341 pruebas superadas**, cero fallos: `../../tmp/tanda-06-176-unit-tests.log`.
- Chrome verifica catálogo, fórmulas y los 48 PDF desde raíz/subcarpeta: `../../tmp/tanda-06-176-browser.log`.
- Auditoría técnica y matemática de las **24 parejas**, incluidos los 30 ZIP, las fuentes revisadas y sus 48 PDF: `pdf/verificacion-biblioteca.json`. **154 páginas** en total. Logs individuales en `../../tmp/pdfs/lote-176/library/` y resumen `../../tmp/tanda-06-176-library.log`.

## Cierre

30/30 paquetes revisados; cero pendientes de conciliación. 48 PDF en 24 parejas de archivos; F004 incluye dos exámenes en su pareja. Catálogo: **996 entidades** = 145 páginas + 398 preguntas + 405 tarjetas + 48 PDF. La nueva pareja se vincula a t01 y se etiqueta además para programación lineal, probabilidad e inferencia; la solución depende del examen.

T06 cerrada en entrega 176, con carencias originales expresamente documentadas. El cierre no significa que el libro completo, la interfaz de biblioteca o la accesibilidad semántica de PDF estén terminados. Véase [cierre global](cierre-t06-latex-pdf.md).

```powershell
node scripts/build-pdfs.mjs --config config/pdf-build-subida-nota-curso.json --python RUTA/python.exe --cached
python scripts/update-pdf-inventory.py
python scripts/check-pdf-library.py
```

- [x] F001 revisado, M01/M37/M38 corregidas, ocho páginas inspeccionadas.
- [x] Registro de los 30 paquetes y auditoría de las 24 parejas completados.
- [ ] Siguiente T07: biblioteca con búsqueda, filtros, etiquetas y acciones separadas examen/soluciones.

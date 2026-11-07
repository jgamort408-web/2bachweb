"""Convierte la primera página de un PDF de figura en PNG para la web (P08).

Uso: python -I scripts/render-pdf-figure.py <entrada.pdf> <salida.png> [escala]
Requiere pypdfium2 (tools/requirements.txt). La escala 3 da unas 216 ppp, el doble de lo que se muestra.
"""
import sys

import pypdfium2 as pdfium

source, target = sys.argv[1], sys.argv[2]
scale = float(sys.argv[3]) if len(sys.argv) > 3 else 3.0
pdf = pdfium.PdfDocument(source)
try:
    page = pdf[0]
    image = page.render(scale=scale, fill_color=(255, 255, 255, 255)).to_pil()
    image.save(target, optimize=True)
finally:
    pdf.close()

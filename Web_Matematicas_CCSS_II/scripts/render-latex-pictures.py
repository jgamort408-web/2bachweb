"""Recorta cada página de un PDF de dibujos LaTeX (picture) y la guarda como PNG para la web (P08).

Uso: python -I scripts/render-latex-pictures.py <dibujos.pdf> <carpeta> <nombre1> [<nombre2> ...]
La página k del PDF se guarda como <carpeta>/<nombre_k>.png: escala 3, recorte al contenido con un margen y paleta de
32 colores (los dibujos son líneas y rótulos: el archivo queda pequeño sin perder nitidez). Requiere pypdfium2.
"""
import sys

import pypdfium2 as pdfium
from PIL import ImageOps

source, folder, names = sys.argv[1], sys.argv[2], sys.argv[3:]
pdf = pdfium.PdfDocument(source)
try:
    if len(pdf) != len(names):
        raise SystemExit(f'El PDF tiene {len(pdf)} páginas y se esperaban {len(names)} dibujos')
    for page, name in zip(pdf, names):
        image = page.render(scale=3.0, fill_color=(255, 255, 255, 255)).to_pil().convert('RGB')
        box = ImageOps.invert(image.convert('L')).getbbox()
        if not box:
            raise SystemExit(f'Dibujo vacío: {name}')
        margin = 12
        left, top, right, bottom = box
        image = image.crop((max(0, left - margin), max(0, top - margin), min(image.width, right + margin), min(image.height, bottom + margin)))
        image.quantize(colors=32).save(f'{folder}/{name}.png', optimize=True)
finally:
    pdf.close()

"""Prepara la lectura de un lote de Selectividad sin modificar el banco.

Sustituye a los antiguos tmp/leer_lNNN.py, que se copiaban y editaban a mano.
Para cada fuente indicada comprueba su SHA-256 contra datos/fuentes.csv,
extrae el texto y renderiza cada página en PNG. Antes guarda las huellas de
los enunciados, soluciones y PDF existentes para demostrar después que el lote
no ha alterado nada previo.

Uso, desde la carpeta raíz del repositorio:
    python tools/selectividad/leer_lote.py l026 examen=SRC-251685BD691B
    python tools/selectividad/leer_lote.py l027 examen=SRC-... criterios=SRC-... --esperados 468

Requiere pypdf y pypdfium2 (pip install -r tools/requirements.txt). Las salidas
van a tmp/pdfs/selectividad-<lote>/, que es temporal y no se versiona.
"""
import argparse, csv, hashlib, json
from pathlib import Path

W = Path(__file__).resolve().parents[2]
R = W / 'Selectividad_LaTeX'


def sha(path):
    return hashlib.sha256(path.read_bytes()).hexdigest()


def main():
    parser = argparse.ArgumentParser(description=__doc__, formatter_class=argparse.RawDescriptionHelpFormatter)
    parser.add_argument('lote', help='código del lote, p. ej. l026')
    parser.add_argument('fuentes', nargs='+', help='etiqueta=SRC-ID (examen, criterios, tabla...)')
    parser.add_argument('--esperados', type=int, help='número de archivos previos que deben existir')
    parser.add_argument('--escala', type=float, default=1.8, help='escala de renderizado de las páginas')
    args = parser.parse_args()
    try:
        from pypdf import PdfReader
        import pypdfium2 as pdfium
    except ImportError:
        raise SystemExit('Faltan pypdf y pypdfium2: pip install -r tools/requirements.txt')

    lote = args.lote.lower()
    T = W / 'tmp/pdfs' / f'selectividad-{lote}'
    T.mkdir(parents=True, exist_ok=True)

    previos = [*(R / 'enunciados').glob('*.tex'), *(R / 'soluciones').glob('*.tex'), *(R / 'output/pdf').glob('*.pdf')]
    if args.esperados is not None and len(previos) != args.esperados:
        raise SystemExit(f'Se esperaban {args.esperados} archivos previos y hay {len(previos)}')
    control = T / 'control-antes.json'
    if control.exists():
        raise SystemExit(f'{control} ya existe: el control previo no se sobrescribe')
    control.write_text(json.dumps({p.relative_to(R).as_posix(): sha(p) for p in previos}, indent=2) + '\n', encoding='utf-8')
    print(f'Control previo: {len(previos)} archivos')

    with (R / 'datos/fuentes.csv').open(encoding='utf-8-sig', newline='') as f:
        filas = {fila['fuente_id']: fila for fila in csv.DictReader(f)}

    for par in args.fuentes:
        etiqueta, _, ident = par.partition('=')
        if not ident:
            raise SystemExit(f'Formato esperado etiqueta=SRC-ID: {par}')
        if ident not in filas:
            raise SystemExit(f'Fuente desconocida: {ident}')
        fila = filas[ident]
        ruta = W / fila['ruta']
        huella = sha(ruta)
        if huella != fila['sha256']:
            raise SystemExit(f'Huella distinta en {ident}: {ruta}')
        texto = '\n\n'.join(f'PÁGINA {i}\n' + pagina.extract_text() for i, pagina in enumerate(PdfReader(ruta).pages, 1))
        (T / f'extraccion-{etiqueta}.txt').write_text(texto, encoding='utf-8')
        print(ident, huella)
        print(texto)
        for i, pagina in enumerate(pdfium.PdfDocument(str(ruta)), 1):
            pagina.render(scale=args.escala).to_pil().save(T / f'{etiqueta}-{i}.png')

    print(f'Salidas en {T.relative_to(W).as_posix()}')


if __name__ == '__main__':
    main()

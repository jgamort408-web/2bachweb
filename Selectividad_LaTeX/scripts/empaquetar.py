#!/usr/bin/env python3
"""Crea un ZIP autocontenido para Overleaf sin originales ni resultados locales."""
from __future__ import annotations

import argparse
from pathlib import Path
from zipfile import ZIP_DEFLATED, ZipFile, ZipInfo

from generar_seleccion import render_registry
from validar import DEFAULT_ROOT, load_catalog, relative_path, validate

FOLDERS = {"catalogo", "config", "datos", "docs", "enunciados", "plantillas", "recursos", "scripts", "selecciones", "soluciones", "tests", "tex"}
EXCLUDED_PARTS = {"__pycache__", ".pytest_cache", ".git", "dist", "output", "outputs", "tmp", "node_modules"}
EXCLUDED_SUFFIXES = {".aux", ".log", ".out", ".toc", ".synctex", ".gz", ".fls", ".fdb_latexmk", ".pyc", ".pyo", ".zip"}


def package(root: Path, destination: str = "dist/Selectividad_Overleaf.zip") -> tuple[Path, int]:
    root = root.resolve()
    errors = validate(root)
    if errors:
        raise ValueError("Catálogo no válido:\n" + "\n".join(errors))
    required = ["main.tex", "catalogo/registro.tex", "config/seleccion.tex"]
    for name in required:
        if not (root / name).is_file():
            raise ValueError(f"Falta archivo necesario para Overleaf: {name}")
    if (root / "catalogo" / "registro.tex").read_text(encoding="utf-8-sig") != render_registry(load_catalog(root)["ejercicios"]):
        raise ValueError("Registro TeX obsoleto: ejecuta generar_seleccion.py antes de empaquetar")
    output = relative_path(root, destination)
    if Path(destination.replace("\\", "/")).parts[0] != "dist" or output.suffix.lower() != ".zip":
        raise ValueError("El ZIP debe escribirse dentro de dist/")
    members = []
    for path in sorted(root.rglob("*")):
        if not path.is_file():
            continue
        relative = path.relative_to(root)
        if any(part in EXCLUDED_PARTS for part in relative.parts) or path.suffix.lower() in EXCLUDED_SUFFIXES:
            continue
        if len(relative.parts) == 1:
            if path.suffix.lower() not in {".tex", ".md", ".txt"} and path.name != "latexmkrc":
                continue
        elif relative.parts[0] not in FOLDERS:
            continue
        if path.is_symlink() or not path.resolve().is_relative_to(root):
            raise ValueError(f"No se empaquetan enlaces externos: {relative.as_posix()}")
        members.append((path, relative.as_posix()))
    output.parent.mkdir(parents=True, exist_ok=True)
    # Orden y fecha fijos: repetir el paquete sin cambios produce el mismo ZIP.
    with ZipFile(output, "w", compression=ZIP_DEFLATED) as archive:
        for path, name in members:
            info = ZipInfo(name, date_time=(2026, 1, 1, 0, 0, 0))
            info.compress_type = ZIP_DEFLATED
            info.external_attr = 0o100644 << 16
            archive.writestr(info, path.read_bytes())
    return output, len(members)


def main() -> int:
    parser = argparse.ArgumentParser(description=__doc__)
    parser.add_argument("--proyecto", type=Path, default=DEFAULT_ROOT)
    parser.add_argument("--salida", default="dist/Selectividad_Overleaf.zip")
    args = parser.parse_args()
    try:
        output, count = package(args.proyecto, args.salida)
    except (OSError, ValueError) as exc:
        print(f"ERROR: {exc}")
        return 1
    print(f"ZIP Overleaf: {output} ({count} archivos). Originales excluidos.")
    return 0


if __name__ == "__main__":
    raise SystemExit(main())

#!/usr/bin/env python3
"""Genera registro y selección TeX a partir de los CSV, sin escribir ejercicios."""
from __future__ import annotations

import argparse
from pathlib import Path

from validar import DEFAULT_ROOT, load_catalog, relative_path, validate, values


def tex_escape(value: str) -> str:
    replacements = {
        "\\": r"\textbackslash{}", "{": r"\{", "}": r"\}",
        "&": r"\&", "%": r"\%", "$": r"\$", "#": r"\#",
        "_": r"\_", "~": r"\textasciitilde{}", "^": r"\textasciicircum{}",
    }
    return "".join(replacements.get(char, char) for char in value.replace("\n", " "))


def render_registry(rows: list[dict[str, str]]) -> str:
    lines = ["% Generado desde datos/ejercicios.csv. No contiene enunciados ni soluciones."]
    for row in rows:
        label = f"{row['ejercicio_id']}: {row['titulo_descriptivo']}"
        fields = [row["ejercicio_id"], row["ruta_enunciado"], row["ruta_solucion"], tex_escape(label), row["estado_transcripcion"], row["estado_solucion"]]
        lines.append(r"\RegistrarEjercicio" + "".join("{" + field + "}" for field in fields))
    return "\n".join(lines) + "\n"


def select_rows(rows: list[dict[str, str]], args: argparse.Namespace) -> list[dict[str, str]]:
    selected = []
    wanted_ids = getattr(args, "id", None) or []
    missing = set(wanted_ids) - {row["ejercicio_id"] for row in rows}
    if missing:
        raise ValueError(f"IDs desconocidos: {', '.join(sorted(missing))}")
    for row in rows:
        if not getattr(args, "incluir_pendientes", False) and row["estado_transcripcion"] != "cotejada":
            continue
        if wanted_ids and row["ejercicio_id"] not in wanted_ids:
            continue
        if getattr(args, "tema", None) and args.tema not in values(row["tema_principal"]) + values(row["temas_secundarios"]):
            continue
        if getattr(args, "epigrafe", None) and args.epigrafe not in values(row["epigrafes"]):
            continue
        if any(tag not in values(row["tags"]) for tag in (getattr(args, "tag", None) or [])):
            continue
        if any(getattr(args, flag, None) is not None and row[field] != str(getattr(args, flag)) for flag, field in (
            ("anio", "anio"), ("examen", "examen_id"), ("tipo", "tipo_examen"),
            ("modelo", "modelo"), ("opcion", "opcion"), ("bloque", "bloque"),
        )):
            continue
        selected.append(row)
    return selected


def generate(root: Path, args: argparse.Namespace) -> tuple[Path, Path, list[str]]:
    root = root.resolve()
    errors = validate(root)
    if errors:
        raise ValueError("Catálogo no válido:\n" + "\n".join(errors))
    relative_output = str(args.salida).replace("\\", "/")
    output = relative_path(root, relative_output)
    if Path(relative_output).parts[0] not in {"config", "selecciones"} or output.suffix != ".tex":
        raise ValueError("La selección debe ser un .tex dentro de config/ o selecciones/")
    if relative_output == "config/opciones.tex":
        raise ValueError("La selección no puede sustituir config/opciones.tex")
    rows = load_catalog(root)["ejercicios"]
    selected = select_rows(rows, args)
    registry = root / "catalogo" / "registro.tex"
    ids = [row["ejercicio_id"] for row in selected]
    selection = [
        "% Selección generada. Los pendientes sólo se incluyen con --incluir-pendientes.",
        r"\providecommand{\ListaEjercicios}{" + ",".join(ids) + "}",
    ]
    if getattr(args, "modo", None):
        selection.append(r"\providecommand{\ModoSalida}{" + args.modo + "}")
    registry.parent.mkdir(parents=True, exist_ok=True)
    output.parent.mkdir(parents=True, exist_ok=True)
    registry.write_text(render_registry(rows), encoding="utf-8")
    output.write_text("\n".join(selection) + "\n", encoding="utf-8")
    return registry, output, ids


def build_parser() -> argparse.ArgumentParser:
    parser = argparse.ArgumentParser(description=__doc__)
    parser.add_argument("--proyecto", type=Path, default=DEFAULT_ROOT)
    parser.add_argument("--salida", default="config/seleccion.tex")
    parser.add_argument("--incluir-pendientes", action="store_true")
    parser.add_argument("--modo", choices=("enunciados", "enunciados-y-soluciones"))
    for name in ("tema", "epigrafe", "anio", "examen", "tipo", "modelo", "opcion", "bloque"):
        parser.add_argument("--" + name)
    parser.add_argument("--tag", action="append", help="Todos los tags indicados deben aparecer (AND)")
    parser.add_argument("--id", action="append", help="ID exacto; repetible")
    return parser


def main() -> int:
    args = build_parser().parse_args()
    try:
        _, output, ids = generate(args.proyecto, args)
    except (OSError, ValueError) as exc:
        print(f"ERROR: {exc}")
        return 1
    print(f"Selección: {len(ids)} ejercicio(s). Archivo: {output}")
    if not ids:
        print("Selección vacía: no hay coincidencias cotejadas; los pendientes requieren --incluir-pendientes.")
    return 0


if __name__ == "__main__":
    raise SystemExit(main())

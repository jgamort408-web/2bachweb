#!/usr/bin/env python3
"""Índice Markdown de acceso individual; los CSV son la fuente de verdad."""
from __future__ import annotations

import argparse
from pathlib import Path

from validar import DEFAULT_ROOT, load_catalog, validate, values


def cell(value: str) -> str:
    return str(value).replace("\n", " ").replace("|", ", ").replace("[", r"\[").replace("]", r"\]")


def render_index(catalog: dict) -> str:
    rows = [r for r in catalog["ejercicios"] if r["estado_transcripcion"] == "cotejada"]
    lines = [
        "# Índice de ejercicios de Selectividad", "",
        f"**{len(rows)} enunciados cotejados**, con acceso al archivo individual y categorías. "
        "Las soluciones siguen pendientes; este índice no presenta respuestas.", "",
        "[Guía para crear relaciones](docs/GUIA_RELACIONES.md) · "
        "[Tabla completa](#tabla-completa) · [Etiquetas](#etiquetas) · "
        "[Índice maestro CSV](datos/ejercicios.csv)", "",
        "Busca un ID, epígrafe o palabra con la búsqueda de este documento. "
        "Un ejercicio puede aparecer en varios temas o etiquetas; su ID y su archivo son únicos. "
        "Sólo se incluyen transcripciones cotejadas. Los títulos son ayudas editoriales, "
        "no texto añadido al enunciado.", "", "## Temas", "",
    ]
    for topic in catalog["temas"]:
        code = topic["tema_id"]
        related = [r for r in rows if code in [r["tema_principal"]] + values(r["temas_secundarios"])]
        lines.append(f'- [{code} · {cell(topic["nombre"])}](#{code.lower()}) — {len(related)} ejercicios relacionados.')
    lines += ["", "## Tabla completa", "", "| ID y enunciado individual | Contenido | Procedencia | Temas | Epígrafes | Etiquetas |", "|---|---|---|---|---|---|"]
    for row in rows:
        origin = f'{row["examen_id"]}, {row["anio"]}, '
        origin += f'bloque {row["bloque"]}' if row["bloque"] else f'opción {row["opcion"]}' if row["opcion"] else 'sin opción/bloque'
        origin += f', ejercicio {row["numero_original"]}, pág. {row["paginas_origen"]}'
        themes = row["tema_principal"] + (f' (sec.: {cell(row["temas_secundarios"])})' if row["temas_secundarios"] else "")
        lines.append(f'| [{row["ejercicio_id"]}]({row["ruta_enunciado"]}) | {cell(row["titulo_descriptivo"])} | {cell(origin)} | {themes} | {cell(row["epigrafes"])} | {cell(row["tags"])} |')
    for topic in catalog["temas"]:
        code = topic["tema_id"]
        lines += ["", f"## {code}", "", cell(topic["nombre"]), ""]
        related = [r for r in rows if code in [r["tema_principal"]] + values(r["temas_secundarios"])]
        for row in related:
            role = "principal" if row["tema_principal"] == code else "secundario"
            lines.append(f'- [{row["ejercicio_id"]}]({row["ruta_enunciado"]}) · {cell(row["titulo_descriptivo"])} · {role} · epígrafes: {cell(row["epigrafes"])}.')
        if not related:
            lines.append("Sin ejercicios cotejados relacionados todavía.")
    lines += ["", "## Etiquetas", "", "Los recuentos no se suman: un mismo ejercicio tiene varias etiquetas.", ""]
    used = sorted({tag for row in rows for tag in values(row["tags"])})
    for tag in used:
        related = [r for r in rows if tag in values(r["tags"])]
        lines += [f"### {tag}", "", f"{len(related)} ejercicios: " + "; ".join(f'[{r["ejercicio_id"]}]({r["ruta_enunciado"]})' for r in related) + ".", ""]
    lines += ["## Actualización", "", "Generado desde los CSV con `python scripts/generar_indice.py`. "
              "No editar a mano; regenerar después de cada tanda cotejada. "
              "La procedencia y sus límites de identificación se documentan en el CSV y en los informes de lote.", ""]
    return "\n".join(lines)


def main() -> int:
    parser = argparse.ArgumentParser(description=__doc__)
    parser.add_argument("--proyecto", type=Path, default=DEFAULT_ROOT)
    args = parser.parse_args()
    root = args.proyecto.resolve()
    errors = validate(root)
    if errors:
        parser.error("Catálogo no válido: " + "; ".join(errors))
    destination = root / "INDICE_EJERCICIOS.md"
    destination.write_text(render_index(load_catalog(root)), encoding="utf-8")
    print(f"Índice individual actualizado: {destination}")
    return 0


if __name__ == "__main__":
    raise SystemExit(main())

#!/usr/bin/env python3
"""Valida el catálogo sin paquetes externos y sin modificar documentos."""
from __future__ import annotations

import argparse
import csv
import hashlib
import re
from decimal import Decimal, InvalidOperation
from pathlib import Path

DEFAULT_ROOT = Path(__file__).resolve().parents[1]
TRANSCRIPTION_STATES = {"pendiente", "borrador", "cotejada", "bloqueada_por_legibilidad"}
CLASSIFICATION_STATES = {"pendiente", "provisional", "verificada"}
SOLUTION_STATES = {
    "no_redactada", "borrador", "revisada_matematicamente",
    "revisada_didacticamente", "validada",
}
TABLES = {
    "fuentes": ("fuente_id", {"ruta", "sha256", "paginas_pdf"}),
    "examenes": ("examen_id", {"documento_id", "fuente_id", "fuente_sha256"}),
    "temas": ("tema_id", {"nombre"}),
    "epigrafes": ("epigrafe_id", {"tema_id", "nombre"}),
    "tags": ("tag", {"descripcion"}),
    "ejercicios": ("ejercicio_id", {
        "documento_id", "examen_id", "fuente_id", "fuente_sha256", "anio",
        "convocatoria", "tipo_examen", "modelo", "opcion", "bloque",
        "numero_original", "paginas_origen", "tema_principal",
        "temas_secundarios", "epigrafes", "tags", "titulo_descriptivo",
        "ruta_enunciado", "ruta_solucion", "rutas_recursos",
        "estado_transcripcion", "estado_clasificacion", "estado_solucion",
        "requiere_revision",
    }),
}
ID_PATTERN = re.compile(r"SEL-(D[0-9]{4,})-(O[A-Z0-9]+|B[A-Z0-9]+|NA)-E([0-9]{2,})$")
HASH_PATTERN = re.compile(r"[a-f0-9]{64}$")


def values(value: str) -> list[str]:
    return [part.strip() for part in (value or "").split("|") if part.strip()]


def relative_path(root: Path, value: str) -> Path:
    """Acepta sólo rutas relativas que permanecen dentro de root."""
    value = value.replace("\\", "/")
    path = Path(value)
    if not value or path.is_absolute() or re.match(r"^[A-Za-z]:", value):
        raise ValueError(f"Ruta no relativa: {value!r}")
    resolved = (root / path).resolve()
    try:
        resolved.relative_to(root.resolve())
    except ValueError as exc:
        raise ValueError(f"Ruta fuera del proyecto: {value!r}") from exc
    if ".." in path.parts:
        raise ValueError(f"Ruta con ascenso de carpetas: {value!r}")
    return resolved


def read_table(root: Path, name: str) -> list[dict[str, str]]:
    path = root / "datos" / f"{name}.csv"
    with path.open(encoding="utf-8-sig", newline="") as stream:
        reader = csv.DictReader(stream)
        key, required = TABLES[name]
        headers = reader.fieldnames or []
        if len(headers) != len(set(headers)):
            raise ValueError(f"{path.name}: cabeceras duplicadas")
        missing = ({key} | required) - set(headers)
        if missing:
            raise ValueError(f"{path.name}: faltan columnas {', '.join(sorted(missing))}")
        rows = []
        for line, row in enumerate(reader, 2):
            if None in row or any(value is None for value in row.values()):
                raise ValueError(f"{path.name}:{line}: número incorrecto de columnas")
            rows.append({column: value.strip() for column, value in row.items()})
        return rows


def load_catalog(root: Path) -> dict[str, list[dict[str, str]]]:
    return {name: read_table(root, name) for name in TABLES}


def comments_only(text: str) -> bool:
    return all(not line.strip() or line.lstrip().startswith("%") for line in text.splitlines())


def validate(root: Path, check_sources: bool = False) -> list[str]:
    root = root.resolve()
    errors: list[str] = []
    try:
        catalog = load_catalog(root)
    except (OSError, ValueError, UnicodeError) as exc:
        return [str(exc)]
    maps: dict[str, dict[str, dict[str, str]]] = {}
    for name, rows in catalog.items():
        key = TABLES[name][0]
        index = {}
        for row in rows:
            identifier = row[key]
            if not identifier:
                errors.append(f"{name}: identificador vacío")
            elif identifier in index:
                errors.append(f"{name}: identificador duplicado {identifier}")
            index[identifier] = row
        maps[name] = index

    if set(maps["temas"]) != {f"T{number:02d}" for number in range(1, 10)}:
        errors.append("temas: deben figurar exactamente T01 a T09")
    for identifier, row in maps["epigrafes"].items():
        if row["tema_id"] not in maps["temas"] or not identifier.startswith(row["tema_id"] + "."):
            errors.append(f"{identifier}: epígrafe con tema incorrecto")
    for tag in maps["tags"]:
        if not re.fullmatch(r"[a-z0-9]+(?:-[a-z0-9]+)*", tag):
            errors.append(f"Tag no normalizado: {tag}")

    for identifier, row in maps["fuentes"].items():
        if not HASH_PATTERN.fullmatch(row["sha256"]):
            errors.append(f"{identifier}: SHA256 no válido")
        try:
            source = relative_path(root.parent, row["ruta"])
            if not row["ruta"].replace("\\", "/").startswith("Selectividad/"):
                raise ValueError("La fuente debe pertenecer a Selectividad/")
            if check_sources:
                if not source.is_file():
                    errors.append(f"{identifier}: fuente ausente {row['ruta']}")
                elif hashlib.sha256(source.read_bytes()).hexdigest() != row["sha256"]:
                    errors.append(f"{identifier}: SHA256 de fuente distinto")
        except ValueError as exc:
            errors.append(f"{identifier}: {exc}")

    document_ids: set[str] = set()
    for identifier, row in maps["examenes"].items():
        if row["documento_id"] in document_ids:
            errors.append(f"{identifier}: documento_id duplicado")
        document_ids.add(row["documento_id"])
        source = maps["fuentes"].get(row["fuente_id"])
        if not source or source["sha256"] != row["fuente_sha256"]:
            errors.append(f"{identifier}: fuente o huella del examen incorrecta")
        for field in ("fuente_criterios", "fuente_tabla"):
            if row.get(field) and row[field] not in maps["fuentes"]:
                errors.append(f"{identifier}: referencia desconocida {field}")

    used_paths: set[str] = set()
    counts: dict[str, int] = {}
    for identifier, row in maps["ejercicios"].items():
        id_match = ID_PATTERN.fullmatch(identifier)
        if not id_match:
            errors.append(f"ID de ejercicio no válido: {identifier}")
        else:
            document_id, section, exercise_number = id_match.groups()
            if document_id != row["documento_id"]:
                errors.append(f"{identifier}: documento_id no coincide con el ID")
            if row["opcion"] and row["bloque"]:
                errors.append(f"{identifier}: opción y bloque son mutuamente exclusivos")
            expected_section = "O" + row["opcion"] if row["opcion"] else "B" + row["bloque"] if row["bloque"] else "NA"
            if section != expected_section:
                errors.append(f"{identifier}: opción o bloque no coincide con el ID")
            if not row["numero_original"].isdigit() or int(row["numero_original"]) != int(exercise_number):
                errors.append(f"{identifier}: numero_original no coincide con E del ID")
        exam = maps["examenes"].get(row["examen_id"])
        if not exam:
            errors.append(f"{identifier}: examen desconocido")
        else:
            counts[row["examen_id"]] = counts.get(row["examen_id"], 0) + 1
            for field in ("documento_id", "fuente_id", "fuente_sha256"):
                if row[field] != exam[field]:
                    errors.append(f"{identifier}: {field} no coincide con su examen")
            for field in ("anio", "curso", "convocatoria", "tipo_examen", "reserva", "modelo"):
                if field in row and field in exam and row[field] != exam[field]:
                    errors.append(f"{identifier}: metadato {field} no coincide con su examen")
        source = maps["fuentes"].get(row["fuente_id"])
        if not source or source["sha256"] != row["fuente_sha256"]:
            errors.append(f"{identifier}: fuente o huella incorrecta")
        for field in ("fuente_criterios", "fuente_tabla"):
            if row.get(field) and row[field] not in maps["fuentes"]:
                errors.append(f"{identifier}: referencia desconocida {field}")
        for field, allowed in (
            ("estado_transcripcion", TRANSCRIPTION_STATES),
            ("estado_clasificacion", CLASSIFICATION_STATES),
            ("estado_solucion", SOLUTION_STATES),
        ):
            if row[field] not in allowed:
                errors.append(f"{identifier}: {field} no válido: {row[field]}")
        if row["requiere_revision"] not in {"si", "no"}:
            errors.append(f"{identifier}: requiere_revision debe ser si o no")
        topics = values(row["tema_principal"]) + values(row["temas_secundarios"])
        if len(values(row["tema_principal"])) > 1:
            errors.append(f"{identifier}: sólo puede haber un tema principal")
        if row["estado_clasificacion"] != "pendiente" and not row["tema_principal"]:
            errors.append(f"{identifier}: falta tema principal")
        if len(topics) != len(set(topics)):
            errors.append(f"{identifier}: temas duplicados")
        for topic in topics:
            if topic not in maps["temas"]:
                errors.append(f"{identifier}: tema desconocido {topic}")
        for epigraph in values(row["epigrafes"]):
            if epigraph not in maps["epigrafes"]:
                errors.append(f"{identifier}: epígrafe desconocido {epigraph}")
            elif maps["epigrafes"][epigraph]["tema_id"] not in topics:
                errors.append(f"{identifier}: el epígrafe {epigraph} requiere relacionar su tema")
        for tag in values(row["tags"]):
            if tag not in maps["tags"]:
                errors.append(f"{identifier}: tag desconocido {tag}")
        if row.get("anio") and not re.fullmatch(r"[0-9]{4}", row["anio"]):
            errors.append(f"{identifier}: año no válido")
        if row.get("puntuacion_original"):
            try:
                score = Decimal(row["puntuacion_original"])
                if not score.is_finite() or score < 0:
                    raise InvalidOperation
            except InvalidOperation:
                errors.append(f"{identifier}: puntuación no válida")
        for page in values(row["paginas_origen"]):
            if not re.fullmatch(r"[1-9][0-9]*(?:-[1-9][0-9]*)?", page):
                errors.append(f"{identifier}: página de origen no válida {page}")
                continue
            ends = [int(number) for number in page.split("-")]
            if ends[-1] < ends[0]:
                errors.append(f"{identifier}: intervalo de páginas invertido")
            if source and source.get("paginas_pdf", "").isdigit() and ends[-1] > int(source["paginas_pdf"]):
                errors.append(f"{identifier}: página fuera del PDF fuente")
        if not row["paginas_origen"]:
            errors.append(f"{identifier}: faltan páginas de origen")
        for field, folder in (("ruta_enunciado", "enunciados"), ("ruta_solucion", "soluciones")):
            expected = f"{folder}/{identifier}.tex"
            if row[field] != expected:
                errors.append(f"{identifier}: {field} debe ser {expected}")
            if row[field] in used_paths:
                errors.append(f"{identifier}: ruta reutilizada {row[field]}")
            used_paths.add(row[field])
            try:
                path = relative_path(root, row[field])
                text = path.read_text(encoding="utf-8-sig")
                if re.search(r"\\(?:documentclass|begin\s*\{document\}|end\s*\{document\})", text):
                    errors.append(f"{identifier}: {field} debe ser un fragmento, sin documento propio")
                pending = (field == "ruta_enunciado" and row["estado_transcripcion"] in {"pendiente", "bloqueada_por_legibilidad"})
                pending |= field == "ruta_solucion" and row["estado_solucion"] == "no_redactada"
                if pending and not comments_only(text):
                    errors.append(f"{identifier}: {field} pendiente sólo debe contener comentarios")
                if not pending and comments_only(text):
                    errors.append(f"{identifier}: {field} vacío pese a su estado")
            except (OSError, ValueError, UnicodeError) as exc:
                errors.append(f"{identifier}: {exc}")
        for resource in values(row["rutas_recursos"]):
            try:
                path = relative_path(root, resource)
                if not resource.startswith("recursos/") or not path.is_file():
                    errors.append(f"{identifier}: recurso inexistente o fuera de recursos/: {resource}")
            except ValueError as exc:
                errors.append(f"{identifier}: {exc}")

    for identifier, row in maps["examenes"].items():
        if row.get("estado_recuento") == "verificado_visualmente":
            try:
                if counts.get(identifier, 0) != int(row["recuento_ejercicios"]):
                    errors.append(f"{identifier}: recuento de ejercicios distinto del inventariado")
            except (ValueError, KeyError):
                errors.append(f"{identifier}: recuento verificado no numérico")
    return errors


def main() -> int:
    parser = argparse.ArgumentParser(description=__doc__)
    parser.add_argument("--proyecto", type=Path, default=DEFAULT_ROOT)
    parser.add_argument("--fuentes", action="store_true", help="Comprueba presencia y SHA256 de todos los originales")
    args = parser.parse_args()
    errors = validate(args.proyecto, args.fuentes)
    if errors:
        for error in errors:
            print(f"ERROR: {error}")
        print(f"Validación fallida: {len(errors)} incidencia(s).")
        return 1
    catalog = load_catalog(args.proyecto)
    print(f"Catálogo válido: {len(catalog['ejercicios'])} ejercicios; {len(catalog['fuentes'])} fuentes. No equivale a transcripción terminada.")
    return 0


if __name__ == "__main__":
    raise SystemExit(main())

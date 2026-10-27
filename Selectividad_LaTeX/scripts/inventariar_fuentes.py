#!/usr/bin/env python3
"""Inventario de solo lectura de ../Selectividad. No convierte ni altera originales.

Uso desde cualquier directorio:
  python Selectividad_LaTeX/scripts/inventariar_fuentes.py

Requiere pypdf. CSV en UTF-8 con BOM, delimitador coma. Solo reescribe
datos/fuentes.csv y docs/INVENTARIO_FUENTES.md dentro de este proyecto.
"""
from __future__ import annotations

import csv
import hashlib
import re
import unicodedata
from collections import Counter, defaultdict
from pathlib import Path

from pypdf import PdfReader


PROJECT = Path(__file__).resolve().parents[1]
WORKSPACE = PROJECT.parent
SOURCE = WORKSPACE / "Selectividad"
FIELDS = [
    "fuente_id", "ruta", "nombre", "extension", "tipo_por_nombre",
    "clasificacion_estado", "anio_ruta", "anio_confirmado",
    "anios_detectados_texto", "bytes", "sha256", "paginas_pdf",
    "duplicado_de", "grupo_duplicado", "estado_extraccion", "notas",
]


def plain(value: str) -> str:
    return "".join(c for c in unicodedata.normalize("NFKD", value.lower())
                   if not unicodedata.combining(c))


def classify(path: Path) -> tuple[str, str, str]:
    name = plain(path.name)
    if "tabla" in name:
        return "tabla", "indicada_en_nombre", ""
    if "criterio" in name:
        return "criterios", "indicada_en_nombre", ""
    if "examen" in name or "enunciado" in name:
        return "examen", "indicada_en_nombre", ""
    if re.search(r"_c_[a-f]\.pdf$", name):
        return "criterios", "convencion_nombre_pendiente_cotejo", "C_<letra>: probable criterio; confirmar en la primera pasada."
    if re.search(r"_p_[a-f]\.pdf$", name):
        return "examen", "convencion_nombre_pendiente_cotejo", "P_<letra>: probable prueba; confirmar en la primera pasada."
    if "impreso" in name and ("junio" in name or "julio" in name):
        return "examen", "convencion_nombre_pendiente_cotejo", "Nombre de convocatoria impresa: confirmar en la primera pasada."
    return "otro", "pendiente_cotejo", "El nombre no identifica inequívocamente el tipo; puede contener examen y criterios juntos."


def scan() -> list[dict[str, str | int]]:
    if not SOURCE.is_dir():
        raise SystemExit(f"No existe la carpeta fuente: {SOURCE}")
    rows = []
    for path in sorted((p for p in SOURCE.rglob("*") if p.is_file()),
                       key=lambda p: p.relative_to(WORKSPACE).as_posix().casefold()):
        relative = path.relative_to(WORKSPACE).as_posix()
        raw = path.read_bytes()
        kind, state, note = classify(path)
        row = dict.fromkeys(FIELDS, "")
        row.update(
            fuente_id="SRC-" + hashlib.sha256(relative.encode("utf-8")).hexdigest()[:12].upper(),
            ruta=relative, nombre=path.name, extension=path.suffix.lower(),
            tipo_por_nombre=kind, clasificacion_estado=state,
            anio_ruta="|".join(sorted(set(re.findall(r"(?<!\d)(?:19|20)\d{2}(?!\d)", relative)))),
            bytes=len(raw), sha256=hashlib.sha256(raw).hexdigest(), notas=note,
        )
        if path.suffix.lower() == ".pdf":
            try:
                reader = PdfReader(path)
                row["paginas_pdf"] = len(reader.pages)
                texts = [page.extract_text() or "" for page in reader.pages]
                text = "\n".join(texts)
                row["anios_detectados_texto"] = "|".join(sorted(set(
                    re.findall(r"(?<!\d)(?:19|20)\d{2}(?!\d)", text))))
                empty = sum(not value.strip() for value in texts)
                row["estado_extraccion"] = "texto_extraible" if not empty else "texto_parcial_o_escaneado"
                if empty:
                    row["notas"] += f" {empty}/{len(texts)} páginas sin texto extraíble; requieren inspección visual/OCR."
                # A date in a mathematical story is not necessarily the exam year.
                # Confirmation is deliberately reserved for visual source review.
            except Exception as exc:
                row["estado_extraccion"] = "error_lectura_pdf"
                row["notas"] += f" {type(exc).__name__}: {exc}"
        elif path.suffix.lower() == ".doc":
            row["estado_extraccion"] = "doc_heredado_sin_convertir"
            row["notas"] += " DOC binario heredado: páginas y año interno no verificados; convertir una copia y cotejar fórmulas y tablas."
        else:
            row["estado_extraccion"] = "formato_no_inspeccionado"
        row["notas"] = str(row["notas"]).strip()
        rows.append(row)
    groups: dict[str, list[dict]] = defaultdict(list)
    for row in rows:
        groups[str(row["sha256"])].append(row)
    for digest, members in groups.items():
        if len(members) > 1:
            for i, row in enumerate(members):
                row["grupo_duplicado"] = "DUP-" + digest[:12].upper()
                if i:
                    row["duplicado_de"] = members[0]["fuente_id"]
    return rows


def write(rows: list[dict]) -> None:
    data = PROJECT / "datos" / "fuentes.csv"
    report = PROJECT / "docs" / "INVENTARIO_FUENTES.md"
    data.parent.mkdir(parents=True, exist_ok=True)
    report.parent.mkdir(parents=True, exist_ok=True)
    with data.open("w", encoding="utf-8-sig", newline="") as stream:
        writer = csv.DictWriter(stream, fieldnames=FIELDS)
        writer.writeheader()
        writer.writerows(rows)
    counts = Counter(str(r["extension"]) for r in rows)
    kinds = Counter(str(r["tipo_por_nombre"]) for r in rows)
    years = Counter(str(r["anio_ruta"]) or "sin año en ruta" for r in rows)
    digests = Counter(str(r["sha256"]) for r in rows)
    pdf_pages = sum(int(r["paginas_pdf"]) for r in rows if r["paginas_pdf"] != "")
    ambiguous = [r for r in rows if r["clasificacion_estado"] != "indicada_en_nombre"]
    no_text = [r for r in rows if r["estado_extraccion"] not in ("texto_extraible", "doc_heredado_sin_convertir")]
    mismatches = [r for r in rows if r["anio_ruta"] and r["anios_detectados_texto"] and
                  not set(str(r["anio_ruta"]).split("|")).intersection(str(r["anios_detectados_texto"]).split("|"))]
    lines = [
        "# Inventario de fuentes de Selectividad", "",
        "Inventario reproducible de solo lectura. Fecha de incorporación: 2026-10-22.", "",
        "## Alcance y rutas", "",
        "La fuente es la carpeta `Selectividad/`, hermana de este proyecto. Las rutas del CSV son relativas a la raíz del espacio de trabajo y empiezan por `Selectividad/`. El recorrido no incluye `Selectividad_LaTeX/`, por lo que no incorpora archivos generados.", "",
        "Los identificadores `SRC-…` derivan de la ruta UTF-8, no del orden del listado. La huella SHA-256 identifica el contenido y permite detectar copias exactas. Renombrar o mover un original cambia su identificador; los identificadores ya usados deben conservarse mediante una migración explícita.", "",
        "## Resumen", "",
        f"- Archivos: **{len(rows)}**; PDF: **{counts['.pdf']}**; DOC heredados: **{counts['.doc']}**.",
        f"- Páginas PDF inventariadas: **{pdf_pages}**. No se ha calculado el número de páginas de los DOC.",
        f"- Contenidos únicos por SHA-256: **{len(digests)}**; copias adicionales: **{sum(n - 1 for n in digests.values())}**; grupos con copias: **{sum(n > 1 for n in digests.values())}**.",
        f"- Tipo indicado o inferido por nombre: examen **{kinds['examen']}**, criterios **{kinds['criterios']}**, tabla **{kinds['tabla']}**, otro **{kinds['otro']}**.",
        f"- Clasificación que requiere cotejo: **{len(ambiguous)}** archivos. No equivale a un recuento definitivo de exámenes o ejercicios.",
        "- Ningún año está confirmado visualmente en esta fase: `anio_confirmado` permanece vacío.", "",
        "## Año explícito en la ruta", "", "| Año indicado | Archivos |", "| --- | ---: |",
    ]
    lines += [f"| {year} | {count} |" for year, count in sorted(years.items())]
    lines += ["", "`anio_ruta` conserva únicamente años literales presentes en carpetas o nombres. `anios_detectados_texto` contiene candidatos extraídos automáticamente de todas las páginas; puede incluir fechas de enunciados o referencias ajenas al año de convocatoria. No sustituye a `anio_confirmado` ni debe incorporarse al ID del ejercicio sin revisar la cabecera.", "",
        "## Duplicados exactos", "",
        "Se conservan todos los originales. `grupo_duplicado` reúne contenidos idénticos y `duplicado_de` apunta a la primera ruta ordenada del grupo. Es una referencia técnica, no una decisión editorial. Las copias de tablas normales son especialmente frecuentes; un PDF duplicado no implica que distintos modelos sean equivalentes.", "",
        "## Límites de lectura y anomalías", "",
        "- La extracción de texto sirve para localizar material. No acredita la fidelidad de fórmulas, subíndices, signos, matrices, gráficos ni la disposición de opciones.",
        "- Los 12 DOC de 2012 son binarios heredados. Se revisarán con una conversión de copia en un lote específico, conservando el original y verificando cada página. No se interpreta que su ausencia de páginas en el CSV signifique cero páginas.",
        "- Nombres como `P_A` y `C_A` se interpretan provisionalmente como prueba y criterios; deben contrastarse. Los PDF genéricos de 2009 y otros nombres opacos permanecen como `otro`.",
        "- Las letras A/B que figuran en el nombre de un PDF pueden ser opciones dentro del mismo examen. No se asignan automáticamente como modelo o convocatoria.",
    ]
    if no_text:
        lines += ["", "### Archivos con extracción incompleta o error", ""]
        lines += [f"- `{r['fuente_id']}` — `{r['ruta']}`: {r['estado_extraccion']}. {r['notas']}" for r in no_text]
    if mismatches:
        lines += ["", "### Año de ruta sin coincidencia entre candidatos de texto", "",
                  "Estos casos no prueban una datación errónea: algunas tablas y cabeceras no llevan año, y los enunciados pueden citar otras fechas.", ""]
        lines += [f"- `{r['fuente_id']}`: ruta {r['anio_ruta']}; candidatos {r['anios_detectados_texto']}; `{r['ruta']}`." for r in mismatches]
    lines += ["", "## Primer lote recomendado", "",
        "Empezar por los seis PDF de examen de `sel_2019_matematicas_aplicadas/`, con sus seis criterios separados y sus tablas. La estructura titular/suplente/reserva facilita el cotejo. Confirmar primero año, convocatoria, modelo, opciones y numeración sobre cada cabecera; después transcribir e indexar un ejercicio completo por registro, sin resolverlo.", "",
        "Los criterios se vinculan como fuente auxiliar, sin transcribir ahora sus respuestas. La existencia de criterios no convierte una solución vacía en solución revisada.", "", "| Fuente | Tipo | Ruta |", "| --- | --- | --- |"]
    lines += [f"| `{r['fuente_id']}` | {r['tipo_por_nombre']} | `{r['ruta']}` |" for r in rows
              if "/sel_2019_matematicas_aplicadas/" in str(r["ruta"]) and r["tipo_por_nombre"] != "tabla"]
    lines += ["", "## Regeneración y controles", "",
        "Ejecutar `python Selectividad_LaTeX/scripts/inventariar_fuentes.py` con `pypdf` disponible. Solo se reescriben este informe y `datos/fuentes.csv`. La generación es determinista para los mismos archivos y la misma versión de extracción.", "",
        "Antes de una regeneración, conservar las confirmaciones humanas: este inventario automático deja `anio_confirmado` vacío deliberadamente. Las confirmaciones y el índice de ejercicios deben mantenerse en sus registros editoriales; no corregir silenciosamente una ruta original.", ""]
    report.write_text("\n".join(lines), encoding="utf-8")
    print(f"Archivos={len(rows)}; PDF={counts['.pdf']}; DOC={counts['.doc']}; paginas={pdf_pages}; unicos={len(digests)}; duplicados_adicionales={sum(n - 1 for n in digests.values())}; pendientes_tipo={len(ambiguous)}")


if __name__ == "__main__":
    write(scan())

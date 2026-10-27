"""Pruebas de selección y de integridad sobre copias temporales del catálogo."""
from __future__ import annotations

import csv
import hashlib
import shutil
import sys
import tempfile
import unittest
from pathlib import Path
from zipfile import ZipFile

ROOT = Path(__file__).resolve().parents[1]
sys.path.insert(0, str(ROOT / "scripts"))
from generar_seleccion import build_parser, generate, select_rows
from empaquetar import package
from validar import comments_only, load_catalog, relative_path, validate


class CatalogTests(unittest.TestCase):
    def setUp(self):
        self.temporary = tempfile.TemporaryDirectory()
        self.root = Path(self.temporary.name) / "Selectividad_LaTeX"
        self.root.mkdir()
        for folder in ("datos", "enunciados", "soluciones"):
            shutil.copytree(ROOT / folder, self.root / folder)
        # Fixture estable: las futuras transcripciones del catálogo real no
        # deben cambiar los supuestos de estas pruebas sobre pendientes.
        rows = [row for row in load_catalog(self.root)["ejercicios"] if row["documento_id"] == "D0001"]
        for row in rows:
            row["estado_transcripcion"] = "pendiente"
            row["estado_solucion"] = "no_redactada"
            (self.root / row["ruta_enunciado"]).write_text("% Enunciado pendiente de transcripción.\n", encoding="utf-8")
            (self.root / row["ruta_solucion"]).write_text("% Solución no redactada.\n", encoding="utf-8")
        self.rewrite("ejercicios", rows)
        exams = [row for row in load_catalog(self.root)["examenes"] if row["documento_id"] == "D0001"]
        self.rewrite("examenes", exams)

    def tearDown(self):
        self.temporary.cleanup()

    def args(self, *arguments):
        return build_parser().parse_args(list(arguments))

    def rewrite(self, table, rows):
        target = self.root / "datos" / f"{table}.csv"
        with target.open("w", encoding="utf-8", newline="") as stream:
            writer = csv.DictWriter(stream, fieldnames=list(rows[0]))
            writer.writeheader()
            writer.writerows(rows)

    def change_first_id(self, section, number, option="", block=""):
        rows = load_catalog(self.root)["ejercicios"]
        row = rows[0]
        identifier = f"SEL-{row['documento_id']}-{section}-E{number:02d}"
        row["ejercicio_id"] = identifier
        row["numero_original"] = str(number)
        row["opcion"], row["bloque"] = option, block
        for field, folder in (("ruta_enunciado", "enunciados"), ("ruta_solucion", "soluciones")):
            target = f"{folder}/{identifier}.tex"
            (self.root / row[field]).rename(self.root / target)
            row[field] = target
        self.rewrite("ejercicios", rows)
        return rows

    def test_catalog_initial_is_valid_but_unfinished(self):
        self.assertEqual(validate(self.root), [])
        rows = load_catalog(self.root)["ejercicios"]
        self.assertEqual(len(rows), 8)
        self.assertTrue(all(row["estado_solucion"] == "no_redactada" for row in rows))
        self.assertTrue(all(comments_only((self.root / row["ruta_solucion"]).read_text(encoding="utf-8")) for row in rows))

    def test_default_empty_and_registry_six_arguments(self):
        before = {path.relative_to(self.root): path.read_bytes() for folder in ("enunciados", "soluciones") for path in (self.root / folder).glob("*.tex")}
        registry, output, ids = generate(self.root, self.args())
        self.assertEqual(ids, [])
        self.assertIn(r"\providecommand{\ListaEjercicios}{}", output.read_text(encoding="utf-8"))
        self.assertEqual(registry.read_text(encoding="utf-8").count(r"\RegistrarEjercicio{"), 8)
        self.assertIn("{pendiente}{no_redactada}", registry.read_text(encoding="utf-8"))
        self.assertTrue(all((self.root / name).read_bytes() == data for name, data in before.items()))

    def test_secondary_topic_T03_selects_A2(self):
        rows = load_catalog(self.root)["ejercicios"]
        selected = select_rows(rows, self.args("--tema", "T03", "--incluir-pendientes"))
        self.assertEqual([row["ejercicio_id"] for row in selected], ["SEL-D0001-OA-E02"])

    def test_secondary_topic_T08_selects_B4(self):
        rows = load_catalog(self.root)["ejercicios"]
        selected = select_rows(rows, self.args("--tema", "T08", "--incluir-pendientes"))
        self.assertEqual([row["ejercicio_id"] for row in selected], ["SEL-D0001-OB-E04"])

    def test_AND_tags_and_exam_filters(self):
        rows = load_catalog(self.root)["ejercicios"]
        selected = select_rows(rows, self.args("--tag", "tamano-muestral", "--tag", "distribucion-normal", "--examen", "EXA-0001", "--anio", "2019", "--tipo", "titular", "--opcion", "B", "--incluir-pendientes"))
        self.assertEqual([row["ejercicio_id"] for row in selected], ["SEL-D0001-OB-E04"])
        self.assertEqual(select_rows(rows, self.args("--modelo", "6", "--incluir-pendientes")), [])
        self.assertEqual(select_rows(rows, self.args("--bloque", "I", "--incluir-pendientes")), [])

    def test_unknown_id_does_not_create_outputs(self):
        with self.assertRaisesRegex(ValueError, "IDs desconocidos"):
            generate(self.root, self.args("--id", "SEL-D9999-OA-E01"))
        self.assertFalse((self.root / "catalogo" / "registro.tex").exists())

    def test_only_cotejada_is_selected_by_default(self):
        rows = load_catalog(self.root)["ejercicios"]
        rows[0]["estado_transcripcion"] = "cotejada"
        self.assertEqual([row["ejercicio_id"] for row in select_rows(rows, self.args())], ["SEL-D0001-OA-E01"])

    def test_block_uses_original_global_number_and_filter(self):
        rows = self.change_first_id("BA", 5, block="A")
        self.assertEqual(validate(self.root), [])
        selected = select_rows(rows, self.args("--bloque", "A", "--incluir-pendientes"))
        self.assertEqual([row["ejercicio_id"] for row in selected], ["SEL-D0001-BA-E05"])
        rows[0]["numero_original"] = "1"
        self.rewrite("ejercicios", rows)
        self.assertTrue(any("numero_original no coincide" in error for error in validate(self.root)))

    def test_NA_and_document_identity(self):
        rows = self.change_first_id("NA", 1)
        self.assertEqual(validate(self.root), [])
        rows[0]["documento_id"] = "D0002"
        self.rewrite("ejercicios", rows)
        self.assertTrue(any("documento_id no coincide con el ID" in error for error in validate(self.root)))

    def test_section_and_metadata_inconsistency(self):
        rows = load_catalog(self.root)["ejercicios"]
        rows[0]["opcion"] = "B"
        rows[0]["bloque"] = "A"
        rows[0]["anio"] = "2030"
        self.rewrite("ejercicios", rows)
        errors = validate(self.root)
        self.assertTrue(any("mutuamente exclusivos" in error for error in errors))
        self.assertTrue(any("opción o bloque no coincide" in error for error in errors))
        self.assertTrue(any("metadato anio" in error for error in errors))

    def test_output_and_path_protections(self):
        for path in ("../escape.tex", "enunciados/SEL-D0001-OA-E01.tex", "config/opciones.tex", "main.tex", "config/a.csv", "C:/escape.tex"):
            with self.subTest(path=path), self.assertRaises(ValueError):
                generate(self.root, self.args("--salida", path))
        with self.assertRaises(ValueError):
            relative_path(self.root, "../escape")

    def test_duplicates_and_invalid_topics_are_detected(self):
        rows = load_catalog(self.root)["ejercicios"]
        rows[1]["ejercicio_id"] = rows[0]["ejercicio_id"]
        self.rewrite("ejercicios", rows)
        self.assertTrue(any("duplicado" in error for error in validate(self.root)))
        rows = load_catalog(self.root)["ejercicios"]
        rows[1]["ejercicio_id"] = "SEL-D0001-OA-E02"
        rows[0]["tema_principal"] = "T10"
        rows[0]["tags"] += "|desconocido"
        self.rewrite("ejercicios", rows)
        errors = validate(self.root)
        self.assertTrue(any("tema desconocido" in error for error in errors))
        self.assertTrue(any("tag desconocido" in error for error in errors))

    def test_pending_fragments_cannot_hide_content(self):
        path = self.root / "soluciones" / "SEL-D0001-OA-E01.tex"
        path.write_text("% Pendiente\nRespuesta indebida", encoding="utf-8")
        self.assertTrue(any("pendiente sólo debe contener comentarios" in error for error in validate(self.root)))
        path.write_text("% Sólo comentarios\n", encoding="utf-8")
        self.assertEqual(validate(self.root), [])

    def test_source_hash_integrity_optional(self):
        # El paquete Overleaf se valida sin tener los originales a su lado.
        self.assertEqual(validate(self.root), [])
        self.assertTrue(any("fuente ausente" in error for error in validate(self.root, True)))
        sources = load_catalog(self.root)["fuentes"]
        for source in sources:
            path = self.root.parent / source["ruta"]
            path.parent.mkdir(parents=True, exist_ok=True)
            path.write_bytes(b"fixture")
            source["sha256"] = hashlib.sha256(b"fixture").hexdigest()
        self.rewrite("fuentes", sources)
        source = self.root.parent / sources[0]["ruta"]
        source.write_bytes(b"modified")
        self.assertTrue(any("SHA256 de fuente distinto" in error for error in validate(self.root, True)))

    def test_saved_selection_and_mode(self):
        _, path, ids = generate(self.root, self.args("--tema", "T03", "--incluir-pendientes", "--salida", "selecciones/integrales.tex", "--modo", "enunciados-y-soluciones"))
        self.assertEqual(ids, ["SEL-D0001-OA-E02"])
        self.assertIn(r"\providecommand{\ModoSalida}{enunciados-y-soluciones}", path.read_text(encoding="utf-8"))

    def test_package_is_self_contained_and_excludes_local_outputs(self):
        generate(self.root, self.args())
        (self.root / "main.tex").write_text("% Documento principal de prueba\n", encoding="utf-8")
        for name in ("dist/old.zip", "output/result.pdf", "scripts/__pycache__/x.pyc", "main.log", "Selectividad/original.pdf"):
            path = self.root / name
            path.parent.mkdir(parents=True, exist_ok=True)
            path.write_bytes(b"excluded")
        output, _ = package(self.root)
        initial = output.read_bytes()
        with ZipFile(output) as archive:
            names = archive.namelist()
            self.assertIn("main.tex", names)
            self.assertIn("config/seleccion.tex", names)
            self.assertIn("enunciados/SEL-D0001-OA-E01.tex", names)
            self.assertFalse(any(name.startswith(("dist/", "output/", "Selectividad/")) or "__pycache__" in name or name.endswith(".log") for name in names))
            extracted = self.root.parent / "extracted"
            archive.extractall(extracted)
        self.assertEqual(validate(extracted), [])
        package(self.root)
        self.assertEqual(output.read_bytes(), initial)

    def test_package_rejects_obsolete_registry(self):
        generate(self.root, self.args())
        (self.root / "main.tex").write_text("% main\n", encoding="utf-8")
        rows = load_catalog(self.root)["ejercicios"]
        rows[0]["titulo_descriptivo"] = "Título actualizado en CSV"
        self.rewrite("ejercicios", rows)
        self.assertEqual(validate(self.root), [])
        with self.assertRaisesRegex(ValueError, "Registro TeX obsoleto"):
            package(self.root)
        generate(self.root, self.args())
        output, _ = package(self.root)
        self.assertTrue(output.is_file())


if __name__ == "__main__":
    unittest.main()

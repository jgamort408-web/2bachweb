"""Regresiones de selección parcial y preservación ante solicitudes inválidas."""
import json
import sys
import tempfile
import unittest
from pathlib import Path
from unittest.mock import patch

sys.path.insert(0, str(Path(__file__).resolve().parents[1] / "scripts"))
from generar_seleccion import build_parser, generate, partial_scope


class PartialSelectionTests(unittest.TestCase):
    def setUp(self):
        self.temporary = tempfile.TemporaryDirectory()
        self.addCleanup(self.temporary.cleanup)
        self.root = Path(self.temporary.name)
        (self.root / "datos").mkdir()
        self.coverage = {
            "SEL-D0075-OB-E03": {"partes": {"I": ["a", "b"], "II": ["a", "b"]}},
            "SEL-D0084-OA-E01": {"apartados": ["a", "b", "c"]},
        }
        (self.root / "datos/seleccion_parcial.json").write_text(json.dumps(self.coverage))

    def args(self, *items):
        return build_parser().parse_args(list(items))

    def rows(self, *ids):
        return [dict(ejercicio_id=identifier, estado_transcripcion="cotejada") for identifier in ids]

    def test_complete_selection_does_not_require_coverage(self):
        (self.root / "datos/seleccion_parcial.json").unlink()
        self.assertEqual(partial_scope(self.root, self.rows("other"), self.args()), ("", ""))

    def test_part_and_original_item_can_be_selected(self):
        rows = self.rows("SEL-D0075-OB-E03")
        self.assertEqual(partial_scope(self.root, rows, self.args("--parte", "II")), ("II", ""))
        self.assertEqual(partial_scope(self.root, rows, self.args("--parte", "II", "--apartado", "b")), ("II", "b"))

    def test_simple_item_does_not_require_a_part(self):
        self.assertEqual(partial_scope(self.root, self.rows("SEL-D0084-OA-E01"), self.args("--apartado", "c")), ("", "c"))

    def test_nested_item_requires_its_part(self):
        with self.assertRaisesRegex(ValueError, "indique --parte"):
            partial_scope(self.root, self.rows("SEL-D0075-OB-E03"), self.args("--apartado", "a"))

    def test_unknown_part_item_and_empty_selection_fail(self):
        for arguments in [("--parte", "III"), ("--parte", "II", "--apartado", "c")]:
            with self.subTest(arguments=arguments), self.assertRaises(ValueError):
                partial_scope(self.root, self.rows("SEL-D0075-OB-E03"), self.args(*arguments))
        with self.assertRaises(ValueError):
            partial_scope(self.root, [], self.args("--parte", "II"))

    def test_unsupported_exercise_is_not_silently_dropped(self):
        with self.assertRaisesRegex(ValueError, "other.*no preparada"):
            partial_scope(self.root, self.rows("SEL-D0075-OB-E03", "other"), self.args("--parte", "II"))

    def test_invalid_request_preserves_registry_and_existing_selection(self):
        (self.root / "catalogo").mkdir()
        (self.root / "selecciones").mkdir()
        registry = self.root / "catalogo/registro.tex"
        selection = self.root / "selecciones/existente.tex"
        registry.write_text("registro anterior")
        selection.write_text("selección anterior", encoding="utf-8")
        args = self.args("--id", "other", "--parte", "II", "--salida", "selecciones/existente.tex")
        with patch("generar_seleccion.validate", return_value=[]), patch("generar_seleccion.load_catalog", return_value={"ejercicios": self.rows("other")}):
            with self.assertRaises(ValueError):
                generate(self.root, args)
        self.assertEqual(registry.read_text(), "registro anterior")
        self.assertEqual(selection.read_text(encoding="utf-8"), "selección anterior")


if __name__ == "__main__":
    unittest.main()

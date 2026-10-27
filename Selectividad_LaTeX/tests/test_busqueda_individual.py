"""Cobertura de acceso individual y combinación de categorías, sin resolver ejercicios."""
import re
import sys
import unittest
from pathlib import Path

ROOT = Path(__file__).resolve().parents[1]
sys.path.insert(0, str(ROOT / "scripts"))
from generar_indice import render_index
from generar_seleccion import build_parser, select_rows


class IndividualAccessTests(unittest.TestCase):
    def setUp(self):
        self.rows = [
            dict(ejercicio_id="SEL-D9000-BA-E01", estado_transcripcion="cotejada", tema_principal="T01", temas_secundarios="T03", epigrafes="T01.11|T03.1", tags="derivada-dada|primitiva-con-condicion", titulo_descriptivo="Derivada y primitiva", ruta_enunciado="enunciados/SEL-D9000-BA-E01.tex", examen_id="EXA-9000", anio="2020", bloque="A", opcion="", numero_original="1", paginas_origen="1"),
            dict(ejercicio_id="SEL-D9000-BA-E02", estado_transcripcion="cotejada", tema_principal="T03", temas_secundarios="", epigrafes="T03.10", tags="derivada-dada", titulo_descriptivo="Otro epígrafe", ruta_enunciado="enunciados/SEL-D9000-BA-E02.tex", examen_id="EXA-9000", anio="2020", bloque="A", opcion="", numero_original="2", paginas_origen="1"),
        ]

    def args(self, *arguments):
        return build_parser().parse_args(list(arguments))

    def test_epigrafe_exacto_no_confunde_1_con_10(self):
        selected = select_rows(self.rows, self.args("--epigrafe", "T03.1"))
        self.assertEqual([r["ejercicio_id"] for r in selected], ["SEL-D9000-BA-E01"])

    def test_epigrafe_combina_tema_secundario_tags_e_id(self):
        selected = select_rows(self.rows, self.args("--tema", "T03", "--epigrafe", "T03.1", "--tag", "derivada-dada", "--tag", "primitiva-con-condicion", "--id", "SEL-D9000-BA-E01"))
        self.assertEqual(selected, [self.rows[0]])
        self.assertEqual(select_rows(self.rows, self.args("--epigrafe", "T03.1", "--id", "SEL-D9000-BA-E02")), [])

    def test_indice_cubre_solo_cotejados_y_relaciones_secundarias(self):
        self.rows[1]["estado_transcripcion"] = "borrador"
        rendered = render_index({"ejercicios": self.rows, "temas": [{"tema_id": "T01", "nombre": "Derivadas"}, {"tema_id": "T03", "nombre": "Integrales"}]})
        self.assertIn("**1 enunciados cotejados**", rendered)
        self.assertNotIn("SEL-D9000-BA-E02", rendered)
        self.assertIn("secundario", rendered.split("## T03", 1)[1])
        table = rendered.split("## Tabla completa", 1)[1].split("## T01", 1)[0]
        self.assertEqual(re.findall(r"\]\((enunciados/[^)]+)\)", table), [self.rows[0]["ruta_enunciado"]])

    def test_indice_no_inventa_convocatoria_modelo_ni_soluciones(self):
        rendered = render_index({"ejercicios": self.rows, "temas": []})
        self.assertIn("EXA-9000, 2020, bloque A", rendered)
        self.assertNotIn("titular", rendered)
        self.assertNotIn("soluciones/", rendered)
        self.assertIn("Las soluciones siguen pendientes", rendered)


if __name__ == "__main__":
    unittest.main()

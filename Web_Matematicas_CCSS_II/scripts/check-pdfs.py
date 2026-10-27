"""Validate the staged PDF pair and independently check the four mathematical parts."""
import argparse
import hashlib
import json
import math
import zipfile
from fractions import Fraction
from pathlib import Path

import pdfplumber
from pypdf import PdfReader
from pdf_math_systems import check_sels_i, check_sels_ii
from pdf_math_linear import check_linear_i, check_linear_ii
from pdf_math_limits_derivatives import check_limits_derivatives
from pdf_math_distributions import check_distributions_i, check_distributions_ii
from pdf_math_probability import check_probability_i, check_probability_ii
from pdf_math_recovery import check_recovery
from pdf_math_inference import check_inference_i, check_inference_ii
from pdf_math_inference_collections import check_inference_collection, check_inference_general
from pdf_math_analysis_review import check_review, check_final
from pdf_math_course_raise import check_course_raise
from pdf_math_functions import check_functions_variant, check_functions_principal
from pdf_math_matrices import check_matrices_i, check_matrices_ii, check_matrices_iii

ROOT = Path(__file__).resolve().parents[1]


def sha256(path):
    return hashlib.sha256(Path(path).read_bytes()).hexdigest()


def check_mathematics():
    source = json.loads((ROOT / "content/latex/recuperacion-t1/provenance.json").read_text(encoding="utf-8"))
    answers = source["answers"]
    # f_left=a*x-3*x*x, f_right=2*x*x+b, with join at x=1.
    a = Fraction(4) + 6
    b = a - 5
    assert (a, b, a - 3, a - 6) == tuple(answers["parameters"][key] for key in ["a", "b", "valueAtJoin", "derivativeAtJoin"])
    x = Fraction(2)
    y = 2 * x * x - 2
    slope = 4 * x
    intercept = y - slope * x
    assert (x, y, slope, intercept) == tuple(answers["tangent"][key] for key in ["x", "y", "slope", "intercept"])
    # Check the tangent against the quadratic at offsets on both sides.
    for delta in [Fraction(-1, 10), Fraction(1, 10), Fraction(1, 100)]:
        assert (2 * (x + delta) ** 2 - 2) - (slope * (x + delta) + intercept) == 2 * delta ** 2
    g = lambda t: Fraction(1, 1) / (t + 3)
    assert g(Fraction(-4)) < g(Fraction(-2))  # disproves decrease on the whole disconnected domain
    for t in [Fraction(-10), Fraction(-4), Fraction(-2), Fraction(0), Fraction(3)]:
        assert -Fraction(1, 1) / (t + 3) ** 2 < 0
        assert (Fraction(2, 1) / (t + 3) ** 3 > 0) == (t > -3)
    # Simpson quadrature is independent of the logarithmic antiderivative.
    count = 2000
    step = 2 / count
    values = [1 / (5 + i * step) for i in range(count + 1)]
    quadrature = step / 3 * (values[0] + values[-1]
                            + 4 * sum(values[1:-1:2]) + 2 * sum(values[2:-1:2]))
    exact = math.log(7 / 5)
    assert abs(quadrature - exact) < 1e-12
    assert abs(exact - answers["area"]["approx"]) < 1e-14
    assert 2 / 7 < exact < 2 / 5
    assert sum(source["preserved"]["points"]) == 10
    return {"parts": 4, "passed": True, "areaLogarithm": exact, "areaQuadrature": quadrature}


def check_subida_mathematics():
    source = json.loads((ROOT / "content/latex/subida-nota-t1-general/provenance.json").read_text(encoding="utf-8"))
    answers = source["answers"]
    a = Fraction(1)
    b = a  # continuity gives a=1; rational left derivative -a equals -b
    assert (a,b) == (answers["a"],answers["b"])
    for t in [Fraction(-1,1000),Fraction(1,1000)]:
        f = 1/(t-1) if t<0 else t*t-t-1
        quotient=(f+1)/t
        assert abs(quotient+1)<Fraction(2,1000)
    # Exact integral using polynomial coefficients, independent of printed primitive.
    coefficients=[Fraction(1),Fraction(2),Fraction(-1)]
    area=sum(coefficient/Fraction(i+1) for i,coefficient in enumerate(coefficients))
    assert area==Fraction(answers["area"])==Fraction(5,3)
    for i in range(101):
        x=Fraction(i,100); assert -2<=x*x-2*x-1<=-1
    g=lambda x:x/(x+3)
    assert g(Fraction(-4))>g(Fraction(-2))
    x=Fraction(2);slope=Fraction(3)/(x+3)**2;intercept=g(x)-slope*x
    assert slope==Fraction(answers["tangentSlope"]) and intercept==Fraction(answers["tangentIntercept"])
    # Numerical differentiation independently checks the logarithm, sign and both domains.
    def primitive(x): return x**3/3+math.exp(2*x)/2+math.log(abs(1-x))
    errors=[]
    for x in [-2.,0.,0.5,1.5,2.]:
        step=1e-5
        numeric=(primitive(x+step)-primitive(x-step))/(2*step)
        expected=x*x+math.exp(2*x)-1/(1-x)
        errors.append(abs(numeric-expected))
        assert abs(numeric-expected)<1e-7
    assert sum(source["preserved"]["points"])==10
    assert sum(source["preserved"]["exerciseMinutes"])==55
    return {"parts":5,"passed":True,"area":"5/3","primitiveMaxDerivativeError":max(errors)}


def inspect_pdf(path, specification):
    reader = PdfReader(path)
    assert not reader.is_encrypted, f"{path}: PDF cifrado"
    assert len(reader.pages) == specification["expectedPages"], f"{path}: paginación inesperada"
    assert reader.metadata.title == specification["title"], f"{path}: título incorrecto"
    assert reader.trailer["/Root"].get("/Lang") == "es-ES", f"{path}: idioma no declarado"
    embedded_fonts = set()
    for page in reader.pages:
        for font in page["/Resources"].get("/Font", {}).values():
            item = font.get_object()
            descriptor = item.get("/FontDescriptor")
            assert descriptor is not None, "Fuente sin descriptor"
            assert any(key in descriptor.get_object() for key in ["/FontFile", "/FontFile2", "/FontFile3"]), "Fuente no incrustada"
            embedded_fonts.add(str(item.get("/BaseFont")))
    all_text = []
    with pdfplumber.open(path) as document:
        for index, page in enumerate(document.pages):
            assert abs(page.width - 595.276) < 1 and abs(page.height - 841.89) < 1, "No es A4"
            text = page.extract_text() or ""
            assert len(text) > 150, f"Página vacía o sin texto {index + 1}"
            assert "\ufffd" not in text and "??" not in text, f"Glifos/referencias dañados {index + 1}"
            assert f"Página {index + 1} de {len(reader.pages)}" in text, f"Pie incorrecto {index + 1}"
            outside = [c for c in page.chars if c.get("text", "").strip()
                       and (c["x0"] < 4 or c["x1"] > page.width - 4
                            or c["top"] < 4 or c["bottom"] > page.height - 4)]
            assert not outside, f"Texto fuera de la página {index + 1}"
            all_text.append(text)
    combined = " ".join("\n".join(all_text).split())
    for fragment in specification.get("requiredText", []):
        assert "".join(fragment.split()) in "".join(combined.split()), f"Texto esperado ausente: {fragment}"
    for fragment in specification.get("forbiddenText", []):
        assert fragment not in combined, f"Glifo o texto incorrecto: {fragment}"
    return {"id": specification["id"], "pages": len(reader.pages), "bytes": path.stat().st_size,
            "sha256": sha256(path), "title": reader.metadata.title,
            "language": "es-ES", "embeddedFonts": len(embedded_fonts), "characters": sum(map(len, all_text))}


def main():
    parser = argparse.ArgumentParser()
    parser.add_argument("--directory", type=Path, required=True)
    parser.add_argument("--report", type=Path, required=True)
    parser.add_argument("--config", type=Path, default=ROOT / "config/pdf-build.json")
    args = parser.parse_args()
    config = json.loads(args.config.read_text(encoding="utf-8"))
    provenance = ROOT / config.get("sourceDirectory", "content/latex/recuperacion-t1") / "provenance.json"
    originals = json.loads(provenance.read_text(encoding="utf-8"))["sources"]
    for source in originals:
        archive_path = (ROOT.parent / source["zipPath"]).resolve()
        assert archive_path.is_relative_to(ROOT.parent.resolve()), "ZIP fuera del espacio de trabajo"
        assert sha256(archive_path) == source["zipSha256"], "ZIP original modificado"
        with zipfile.ZipFile(archive_path) as archive:
            assert hashlib.sha256(archive.read(source["entry"])).hexdigest() == source["texSha256"], "Entrada original modificada"
    assets = json.loads(provenance.read_text(encoding="utf-8")).get("assets", [])
    for asset in assets:
        assert sha256(provenance.parent / (asset.get("path") or asset["file"])) == asset["sha256"], "Recurso gráfico modificado"
        source = next(item for item in originals if item["sourceId"] == asset["sourceId"])
        with zipfile.ZipFile(ROOT.parent / source["zipPath"]) as archive:
            assert hashlib.sha256(archive.read(asset["entry"])).hexdigest() == asset["sha256"], "Recurso gráfico no coincide con original"
    checks = {"recuperacion-t1": check_mathematics, "subida-nota-t1-general": check_subida_mathematics, "sistemas-sels-i": check_sels_i, "sistemas-sels-ii": check_sels_ii, "programacion-lineal-i": check_linear_i, "programacion-lineal-ii": check_linear_ii, "matrices-i": check_matrices_i, "matrices-ii": check_matrices_ii, "matrices-iii": check_matrices_iii, "funciones-variante": check_functions_variant, "funciones-principal": check_functions_principal, "limites-derivadas": check_limits_derivatives, "distribuciones-i": check_distributions_i, "distribuciones-ii": check_distributions_ii, "probabilidad-i": check_probability_i, "probabilidad-ii": check_probability_ii, "recuperacion-inferencia": check_recovery, "inferencia-i": check_inference_i, "inferencia-ii": check_inference_ii, "inferencia-recopilacion": check_inference_collection, "inferencia-general": check_inference_general, "repaso-analisis": check_review, "examen-final": check_final, "subida-nota-curso": check_course_raise}
    result = {"schemaVersion": 1, "originalSourcesVerified": len(originals), "mathematics": checks[config.get("mathematics", "recuperacion-t1")](), "documents": []}
    for specification in config["documents"]:
        result["documents"].append(inspect_pdf(args.directory / (specification["id"] + ".pdf"), specification))
    args.report.parent.mkdir(parents=True, exist_ok=True)
    args.report.write_text(json.dumps(result, indent=2, ensure_ascii=False) + "\n", encoding="utf-8")
    print(json.dumps(result, ensure_ascii=False))


if __name__ == "__main__":
    main()

"""Genera la edición revisada de los 27 ejercicios originales de Inferencia."""
from __future__ import annotations

import hashlib
import html
import json
import re
from html.parser import HTMLParser
from pathlib import Path

ROOT = Path(__file__).resolve().parents[1]
SOURCE = ROOT.parent / "Página web existente/5. Inferencia Estadística/4. Ejercicios resueltos.txt"
DEST = ROOT / "libro/temas/09-inferencia-estadistica/ejercicios-resueltos.html"
EXPECTED_HASH = "223af63b58a08064f4176cc90db6ab236af324fb271dd55b9afcbb71af89f067"

# Cada entrada mantiene el enunciado y orden del original; se reescribe la resolución
# para evitar los errores de cálculo, LaTeX y alcance inferencial inventariados.
# (pasos, resultado). Se usa $...$ para la posterior conversión a MathJax local.
SOLUTIONS = {
"inferencia_nivel_1_distribucion_muestral": (
 [r"La población es normal; para 16 paquetes independientes, $\bar X\sim N(500,20/\sqrt{16})=N(500,5)$. La normalidad de la media es exacta bajo estos supuestos.",
  r"El umbral 510 g se tipifica con el error estándar: $z=(510-500)/5=2$.",
  r"La cola derecha es $P(\bar X>510)=1-\Phi(2)\approx0{,}0228$."],
 r"$P(\bar X>510)\approx0{,}0228$ (2,28 %)."),
"inferencia_nivel_2_intervalo_confianza": (
 [r"Para confianza bilateral del 95 %, $\alpha=0{,}05$ y $z_{\alpha/2}\approx1{,}96$.",
  r"Con desviación poblacional conocida, el margen es $E=1{,}96\cdot30/\sqrt{100}=5{,}88$ horas.",
  r"El intervalo normal es $[120-5{,}88,120+5{,}88]=[114{,}12,125{,}88]$ horas. Su cobertura requiere los supuestos indicados al inicio de la colección."],
 r"Intervalo bilateral del 95 %: $[114{,}12,125{,}88]$ horas."),
"inferencia_nivel_3_tamano_muestral": (
 [r"El objetivo es $E_0=2$ cm, $\sigma=10$ cm y confianza del 99 %. El cuantil normal es $z_{\alpha/2}\approx2{,}576$.",
  r"El tamaño real requerido es $(z_{\alpha/2}\sigma/E_0)^2\approx165{,}87$ usando el cuantil sin redondear antes del cálculo.",
  r"Como $n$ es entero, se toma el techo: $n_{\min}=166$. Esto garantiza el margen calculado del procedimiento bajo sus supuestos, no que toda muestra quede a 2 cm del parámetro."],
 r"Tamaño mínimo: 166 personas."),
"inferencia_nivel_4_ingenieria_inversa": (
 [r"El intervalo tiene centro 500 ml y semianchura $E=(504{,}16-495{,}84)/2=4{,}16$ ml.",
  r"Con $\sigma=15$ y $n=50$, $z=E\sqrt n/\sigma=4{,}16\sqrt{50}/15\approx1{,}961$.",
  r"La cobertura bilateral normal correspondiente es $2\Phi(z)-1\approx0{,}9501$. Como los extremos publicados están redondeados, se informa una confianza aproximada del 95 %."],
 r"Nivel de confianza aproximado: 95 %."),
"conceptos_basicos_1_parametro_vs_estadistico": (
 [r"La media histórica indicada para toda la población es el parámetro $\mu=50$ mm.",
  r"La cajita de 10 tornillos produce el estadístico observado $\bar x=50{,}5$ mm.",
  r"Pueden diferir por variación muestral; $0{,}5$ mm es la diferencia observada, sin que por sí sola permita atribuir una causa o cuantificar una probabilidad."],
 r"$\mu=50$ mm y $\bar x=50{,}5$ mm."),
"conceptos_basicos_2_error_estandar": (
 [r"Para una observación, $\operatorname{DE}(\bar X_1)=10/\sqrt1=10$ cm.",
  r"Para la media de 100 observaciones independientes con igual dispersión, $\operatorname{DE}(\bar X_{100})=10/\sqrt{100}=1$ cm.",
  r"El error estándar se divide por diez. Estos números son desviaciones típicas de distribuciones, no márgenes de confianza de $\pm10$ o $\pm1$ cm."],
 r"Error estándar: 10 cm con $n=1$ y 1 cm con $n=100$."),
"conceptos_basicos_3_valor_critico_tabla": (
 [r"Con 90 % de cobertura central, $\alpha=0{,}10$ y cada cola tiene área $0{,}05$.",
  r"Buscamos $\Phi(z)=0{,}95$. En tablas, 1,64 y 1,65 dan valores cercanos; el cuantil es aproximadamente $1{,}644854$.",
  r"Redondeado a tres decimales, $z_{\alpha/2}=1{,}645$."],
 r"Valor crítico bilateral del 90 %: 1,645."),
"conceptos_basicos_4_construccion_intervalo": (
 [r"El centro observado es 20 y el margen calculado indicado es 3.",
  r"Se resta y se suma el margen: $20-3=17$ y $20+3=23$.",
  r"El intervalo numérico es $[17,23]$. Su nivel de cobertura no puede determinarse solo con estos dos números; no afirma que el parámetro esté atrapado con certeza."],
 r"Intervalo: $[17,23]$; confianza no especificada."),
"conceptos_basicos_5_amplitud_error": (
 [r"El centro del intervalo publicado es $(40+46)/2=43$ %. Para intención de voto se trata de una estimación puntual de una proporción, no de una media muestral de una variable cuantitativa.",
  r"La semianchura es $(46-40)/2=3$ puntos porcentuales. La anchura total son 6 puntos."],
 r"Centro: 43 %; margen publicado: 3 puntos porcentuales."),
"selectividad_nivel_1_proporcion_peor_caso": (
 [r"Sin información previa, el producto $p(1-p)$ alcanza su máximo $0{,}25$ en $p=0{,}5$. Para el diseño normal aproximado al 95 %, $z=1{,}96$ y $E_0=0{,}02$.",
  r"Se calcula $n\ge z^2p(1-p)/E_0^2=1{,}96^2\cdot0{,}25/0{,}02^2=2401$.",
  r"Con proporción piloto $p\approx0{,}30$, el cálculo da $1{,}96^2\cdot0{,}30\cdot0{,}70/0{,}02^2=2016{,}84$ y se redondea a 2017. Es un diseño aproximado condicionado al modelo piloto y al muestreo."],
 r"Sin dato previo: 2401; con piloto del 30 %: 2017 jóvenes."),
"selectividad_nivel_2_doble_paso_error": (
 [r"Para confianza del 97 %, el cuantil es aproximadamente $z=2{,}1701$ (2,17 en tabla). Con $n=100$ y $\sigma=4$, $E_1\approx2{,}1701\cdot4/10=0{,}8680$ horas.",
  r"El intervalo aproximado es $[28-0{,}8680,28+0{,}8680]=[27{,}1320,28{,}8680]$ horas.",
  r"A igual confianza y dispersión, $E\propto1/\sqrt n$. Reducir el margen a la mitad exige $n_2=4n_1=400$; además de las 100 ya analizadas, hacen falta 300."],
 r"Intervalo aproximado $[27{,}13,28{,}87]$ h; 300 baterías adicionales."),
"selectividad_nivel_3_toma_decisiones": (
 [r"Con $\bar x=328$, $\sigma=5$, $n=50$ y 95 %, el margen normal es $E=1{,}96\cdot5/\sqrt{50}\approx1{,}386$ ml.",
  r"El intervalo, redondeado a centésimas, es $[326{,}61,329{,}39]$ ml. El valor de referencia 330 ml queda fuera.",
  r"Bajo un modelo válido y una regla bilateral al 5 %, esto aporta evidencia contra $\mu=330$ ml. No demuestra con probabilidad del 95 % que la máquina esté mal calibrada ni identifica por sí solo la causa."],
 r"330 ml queda fuera del intervalo; hay evidencia estadística de desajuste bajo los supuestos."),
"selectividad_nivel_4_teoria_error": (
 [r"Con confianza y $\sigma$ fijas, $E=z\sigma/\sqrt n$. Al pasar de $n$ a $4n$, $E$ se divide entre 2.",
  r"Con $n$ y $\sigma$ fijos, subir la confianza de 95 % a 99 % aumenta $z$ de aproximadamente 1,960 a 2,576; por tanto aumenta el margen."],
 r"a) El margen se reduce a la mitad. b) El margen aumenta."),
"distribucion_media_1_calculo_directo": (
 [r"La población es normal; con 36 observaciones independientes, $\bar X\sim N(172,9/\sqrt{36})=N(172,1{,}5)$ exactamente.",
  r"Los extremos se tipifican como $(169-172)/1{,}5=-2$ y $(175-172)/1{,}5=2$.",
  r"$P(169\le\bar X\le175)=\Phi(2)-\Phi(-2)\approx0{,}9545$. La tabla redondeada del original produce 0,9544."],
 r"Probabilidad aproximada: 0,9545 (95,45 %)."),
"distribucion_proporcion_1_menor_que": (
 [r"Bajo 100 ensayos independientes con $p=0{,}60$, el número de usuarios $X\sim B(100,0{,}60)$ y $\hat P=X/100$. Como $np=60$ y $nq=40$, puede emplearse una normal aproximada.",
  r"Para el umbral 0,50, el error estándar es $\sqrt{0{,}60\cdot0{,}40/100}\approx0{,}04899$ y $z\approx-2{,}0412$. La normal sin corrección da $P(\hat P<0{,}50)\approx0{,}0206$.",
  r"El suceso estricto equivale a $X\le49$; la binomial exacta da aproximadamente 0,0168. La diferencia recuerda que $\hat P$ es discreta."],
 r"Binomial exacta: 0,0168; normal sin corrección: 0,0206."),
"distribucion_comparacion_individuo_vs_muestra": (
 [r"Para un paciente, $X\sim N(15,4)$ y $z=(17-15)/4=0{,}5$. Por tanto $P(X>17)=1-\Phi(0{,}5)\approx0{,}3085$.",
  r"Para una media de 64 consultas independientes, $\bar X\sim N(15,4/\sqrt{64})=N(15,0{,}5)$ exactamente, porque la población es normal.",
  r"Ahora $z=(17-15)/0{,}5=4$ y $P(\bar X>17)=1-\Phi(4)\approx0{,}0000317$, es decir, 0,00317 %. No es cero."],
 r"Una consulta: 30,85 %; media de 64: aproximadamente 0,00317 %."),
"distribucion_proporcion_rango": (
 [r"Bajo independencia y probabilidad constante $p=0{,}05$, el número de defectuosos $X\sim B(400,0{,}05)$ y $\hat P=X/400$. Los límites inclusivos equivalen a $16\le X\le28$.",
  r"La binomial exacta da $P(16\le X\le28)\approx0{,}8194$. Los éxitos y fracasos esperados son 20 y 380.",
  r"Una normal con corrección de continuidad usa $15{,}5<X<28{,}5$ y da aproximadamente 0,8235. Sin corrección, la aproximación es 0,7874; el 0,7876 original procede de redondeos previos."],
 r"Binomial exacta: aproximadamente 81,94 %."),
"calculo_tamano_muestral_medias": (
 [r"Para el diseño del intervalo normal al 95 % se usan $\sigma=15$ g, objetivo $E_0=5$ g y $z\approx1{,}96$.",
  r"$n\ge(z\sigma/E_0)^2=(1{,}96\cdot15/5)^2=34{,}5744$.",
  r"Se toma el entero superior, 35. Así se cumple el margen calculado bajo el modelo; no se asegura que cada estimación observada diste menos de 5 g de la media real."],
 r"Tamaño mínimo del diseño: 35 manzanas."),
"calculo_error_maximo_medias": (
 [r"Con confianza bilateral del 99 %, $z\approx2{,}575829$. Se conocen $\sigma=30$ minutos y $n=150$.",
  r"El margen calculado del intervalo normal es $E=z\sigma/\sqrt n\approx2{,}575829\cdot30/\sqrt{150}\approx6{,}3095$ minutos.",
  r"Este valor es la semianchura del intervalo, no el error real garantizado de la muestra. El enunciado no da la media observada para construir los extremos."],
 r"Margen calculado: aproximadamente 6,31 minutos."),
"calculo_nivel_confianza": (
 [r"El intervalo publicado tiene semianchura $E=4{,}9$ mg/dl; $n=64$ y $\sigma=20$ mg/dl.",
  r"Despejamos $z=E\sqrt n/\sigma=4{,}9\cdot8/20=1{,}96$.",
  r"La normal estándar deja $\Phi(1{,}96)\approx0{,}975$ a la izquierda. La cobertura bilateral es $2\Phi(1{,}96)-1\approx0{,}95$."],
 r"Nivel de confianza aproximado: 95 %."),
"ic_media_poblacional": (
 [r"Para el 95 % bilateral, $z\approx1{,}96$. Con $\sigma=12$, $n=36$ y $\bar x=75$, el margen es $E=1{,}96\cdot12/6=3{,}92$ puntos.",
  r"Los extremos son $75-3{,}92=71{,}08$ y $75+3{,}92=78{,}92$.",
  r"La cobertura del 95 % se atribuye al procedimiento repetido bajo los supuestos del modelo; no es la probabilidad posterior de la media fija."],
 r"Intervalo normal del 95 %: $[71{,}08,78{,}92]$ puntos."),
"ic_proporcion_poblacional": (
 [r"La proporción observada es $\hat p=240/400=0{,}60$. Para 99 % bilateral, $z\approx2{,}575829$.",
  r"El margen del intervalo normal tipo Wald es $E=z\sqrt{\hat p(1-\hat p)/n}\approx2{,}575829\sqrt{0{,}24/400}\approx0{,}06309$.",
  r"Los extremos aproximados son $0{,}60\pm0{,}06309$, es decir, $[0{,}5369,0{,}6631]$. La validez depende del diseño y de la aproximación; una selección sesgada no se corrige con la fórmula."],
 r"Intervalo normal aproximado del 99 %: $[0{,}5369,0{,}6631]$."),
"ic_ingenieria_inversa": (
 [r"El centro del intervalo es $(78{,}355+81{,}645)/2=80$ h y su semianchura es $E=(81{,}645-78{,}355)/2=1{,}645$ h.",
  r"Para 90 % bilateral se usa $z\approx1{,}645$ y $\sigma=5$ h. Al despejar, $n\approx(z\sigma/E)^2\approx25$.",
  r"El valor previsto es 25 baterías. Como el intervalo y el cuantil están redondeados, sus cifras publicadas solo permiten reconstruir el tamaño aproximadamente, no demostrar un tamaño exacto único."],
 r"Media observada: 80 h; margen: 1,645 h; tamaño previsto: aproximadamente 25."),
"ic_media_gasto_ebau": (
 [r"La población indicada es normal, $\sigma=12$ €, $n=100$ y $\bar x=45$ €. Para confianza del 95 %, $z\approx1{,}96$.",
  r"El margen es $E=1{,}96\cdot12/10=2{,}352$ €. Los extremos son $45\pm2{,}352$.",
  r"El intervalo exacto con este cuantil redondeado es $[42{,}648,47{,}352]$ €; a céntimos, $[42{,}65,47{,}35]$ €."],
 r"Intervalo del 95 %: aproximadamente $[42{,}65,47{,}35]$ €."),
"ic_proporcion_redes_ebau": (
 [r"La proporción observada es $\hat p=150/500=0{,}30$, con $1-\hat p=0{,}70$. Para confianza del 97 %, $z\approx2{,}1701$.",
  r"El margen normal tipo Wald es $E=z\sqrt{0{,}30\cdot0{,}70/500}\approx0{,}04447$.",
  r"Al sumar y restar, el intervalo aproximado es $[0{,}2555,0{,}3445]$. Requiere condiciones de muestreo y aproximación apropiadas; la no respuesta no queda incluida."],
 r"Intervalo normal aproximado del 97 %: $[0{,}2555,0{,}3445]$."),
"tamano_muestra_media_ebau": (
 [r"Para confianza del 99 %, $z\approx2{,}575829$, $\sigma=2{,}5$ kg y objetivo de margen inferior a 0,5 kg.",
  r"El límite real es $(z\sigma/0{,}5)^2\approx165{,}87$. El menor entero que lo supera es 166.",
  r"Con 166 observaciones, el margen calculado es menor que 0,5 kg bajo el modelo. Eso no garantiza un error observado menor que 0,5 kg en cada muestra."],
 r"Tamaño mínimo: 166 paquetes."),
"hallar_confianza_intervalo_ebau": (
 [r"El intervalo $[65{,}1,74{,}9]$ tiene centro $\bar x=70$ y semianchura $E=4{,}9$ puntos.",
  r"Con $\sigma=15$ y $n=36$, se despeja $z=E\sqrt n/\sigma=4{,}9\cdot6/15=1{,}96$.",
  r"La cobertura bilateral normal es $2\Phi(1{,}96)-1\approx0{,}95$."],
 r"Nivel de confianza aproximado: 95 %."),
}

STATEMENT_FIXES = {
    "conceptos_basicos_5_amplitud_error": (
        "Un periódico publica que la intención de voto del partido A está entre el 40 % y el 46 %. "
        "a) ¿Cuál es el centro o estimación puntual de la proporción? "
        "b) ¿Cuál es el margen publicado?"
    ),
    "calculo_error_maximo_medias": (
        "Una investigadora estudia el tiempo diario dedicado a vídeos cortos. "
        "Se conoce la desviación típica poblacional de 30 minutos y se seleccionan 150 adolescentes al azar. "
        "¿Cuál es el margen calculado de un intervalo normal bilateral del 99 % para la media?"
    ),
}


class SafeMarkup(HTMLParser):
    allowed = {"p", "strong", "em", "ul", "li", "br"}

    def __init__(self):
        super().__init__(convert_charrefs=True)
        self.parts = []

    def handle_starttag(self, tag, attrs):
        if tag in self.allowed:
            self.parts.append(f"<{tag}>")

    def handle_endtag(self, tag):
        if tag in self.allowed and tag != "br":
            self.parts.append(f"</{tag}>")

    def handle_data(self, data):
        self.parts.append(html.escape(data, quote=False))


def tex_markup(value: str) -> str:
    # Los enunciados solo usan $...$; los pasos corregidos también.
    value = re.sub(r"\$\$(.*?)\$\$", lambda m: r"\[" + m.group(1) + r"\]", value, flags=re.S)
    value = re.sub(r"\$(.*?)\$", lambda m: r"\(" + m.group(1) + r"\)", value, flags=re.S)
    return value


def statement_markup(value: str) -> str:
    parser = SafeMarkup()
    parser.feed(value.replace("\n", " "))
    parser.close()
    return tex_markup("".join(parser.parts))


def plain_markup(value: str) -> str:
    return tex_markup(html.escape(value, quote=False))


def original_exercises():
    raw = SOURCE.read_bytes()
    assert hashlib.sha256(raw).hexdigest() == EXPECTED_HASH, "La fuente original ha cambiado; revisar antes de regenerar"
    text = raw.decode("utf-8")
    start = text.index("[", text.index("const ejercicios ="))
    end = text.index("];", start) + 1
    exercises = json.loads(text[start:end])
    ids = [item["id"] for item in exercises]
    assert len(ids) == len(set(ids)) == 27
    assert set(ids) == set(SOLUTIONS), "Falta una solución revisada o sobra un identificador"
    return exercises


def make_page(exercises):
    parts = ['''<!DOCTYPE html>
<html lang="es">
<head>
  <meta charset="utf-8">
  <meta name="viewport" content="width=device-width, initial-scale=1">
  <title>Ejercicios resueltos de Inferencia · Matemáticas CCSS II</title>
  <link rel="stylesheet" href="../../../assets/css/main.css">
  <script type="module" src="../../../assets/js/app.js"></script>
  <script type="module" src="../../../assets/js/learning/inference-exercises.js"></script>
</head>
<body data-page-id="t09-exercises">
  <a class="skip-link" href="#main-content">Saltar al contenido</a>
  <div id="site-header"></div>
  <main id="main-content" class="page-main">
    <h1 data-content-role="page-title">27 ejercicios resueltos de Inferencia</h1>
    <p data-content-role="lead">Elige un problema y abre su resolución cuando quieras comparar el procedimiento.</p>
    <p data-content-role="source">Adaptación revisada de «4. Ejercicios resueltos.txt». <a href="index.html">Volver al tema 9</a>.</p>
    <section id="orientaciones" data-content-role="warning"><h2>Antes de resolver</h2>
      <p>Los intervalos y tamaños calculados con una normal suponen el modelo y el muestreo indicados en cada problema. Los intervalos para proporciones que aparecen aquí usan la aproximación normal tipo Wald; no corrigen sesgo de selección, no respuesta ni efectos de diseño. El nivel de confianza describe la cobertura del procedimiento al repetirlo, no una probabilidad posterior del parámetro fijo.</p>
      <p>Las conclusiones numéricas conservan los datos originales; se han corregido redondeos, fórmulas rotas y afirmaciones más fuertes de lo que permiten los datos. Los títulos «Selectividad» o «EBAU» proceden de este material didáctico y no acreditan que sean preguntas de un examen oficial. <a href="04-distribucion-muestral-teorema-central-del-limite.html">Repasar distribuciones muestrales</a> · <a href="05-estimacion-puntual-y-estimacion-por-intervalos.html">Repasar intervalos</a> · <a href="08-tamano-de-la-muestra-error-cometido.html">Repasar tamaño muestral</a>.</p>
    </section>
    <div data-inference-exercise-controls hidden><label for="inference-exercise-select">Mostrar ejercicio</label> <select id="inference-exercise-select" data-inference-exercise-select><option value="all">Todos los ejercicios</option>''']
    for index, exercise in enumerate(exercises, 1):
        parts.append(f'<option value="{index}">{index:02d}. {html.escape(exercise["title"])}</option>')
    parts.append('</select><p data-inference-exercise-status role="status" aria-live="polite"></p></div>')
    parts.append('<section id="ejercicios" aria-label="Colección de ejercicios resueltos">')
    for index, exercise in enumerate(exercises, 1):
        key = exercise["id"]
        steps, answer = SOLUTIONS[key]
        statement = STATEMENT_FIXES.get(key, exercise["statement"])
        parts.append(f'<article id="ejercicio-{index:02d}" data-inference-exercise="{index}" data-original-id="{html.escape(key)}" data-content-role="worked-example">')
        parts.append(f'<h2>{index:02d}. {html.escape(exercise["title"])}</h2><div data-content-role="statement">{statement_markup(statement)}</div>')
        parts.append(f'<details data-solution><summary>Ver resolución paso a paso del ejercicio {index}</summary>')
        for step_number, step in enumerate(steps, 1):
            parts.append(f'<section data-content-role="worked-step"><h3>Paso {step_number}</h3><p class="math-scroll" tabindex="0">{plain_markup(step)}</p></section>')
        parts.append(f'<p data-content-role="key-idea" class="math-scroll" tabindex="0"><strong>Resultado:</strong> {plain_markup(answer)}</p></details></article>')
    parts.append('''</section>
    <section id="pendiente" data-content-role="warning"><h2>Estado de la colección</h2><p>Los 27 ejercicios del original están aquí, en el mismo orden. Las soluciones se pueden abrir individualmente sin JavaScript. La revisión con lectores de pantalla y de pronunciación matemática sigue pendiente; los demás archivos de Inferencia aún se integrarán por separado.</p></section>
  </main>
  <div id="site-footer"></div>
</body>
</html>
''')
    return "\n".join(parts)


if __name__ == "__main__":
    exercises = original_exercises()
    DEST.write_text(make_page(exercises), encoding="utf-8")
    print(f"Generados {len(exercises)} ejercicios en {DEST}")

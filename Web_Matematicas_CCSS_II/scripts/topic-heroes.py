"""Cabecera ilustrada (plantilla de tema) para los índices de los temas 2-6, 8 y 9.

Envuelve el <h1> y la entradilla existentes en <header class="mc-topic__hero"> sin cambiar su texto,
añade el chip del bloque, la línea de datos (cifras de config/pages.json y tests/helpers/catalog-expectations.mjs,
validadas por catalog-contract.test.mjs) y una ilustración SVG decorativa calculada con fórmulas reales.
Uso (desde Web_Matematicas_CCSS_II): python scripts/topic-heroes.py . [carpeta-del-tema ...]
Las páginas que ya tienen cabecera se omiten; para regenerar una, restaurarla antes con git.
"""
import math, random, re, sys
from pathlib import Path

root = Path(sys.argv[1])

BLUE = dict(bg='#EFF6FF', light='#DBEAFE', soft='#BFDBFE', mid='#93C5FD', main='#2563EB', dark='#1D4ED8')
PURPLE = dict(bg='#FDF4FF', light='#FAE8FF', soft='#F5D0FE', mid='#E879F9', main='#A21CAF', dark='#86198F')
ORANGE = dict(bg='#FFF7ED', light='#FFEDD5', soft='#FED7AA', mid='#FB923C', main='#C2410C', dark='#9A3412')
# Detalles de los otros dos bloques, como en los temas 1 y 7.
ACCENTS = {
    'blue': '<circle cx="332" cy="28" r="9" fill="#A21CAF"></circle><rect x="20" y="186" width="18" height="18" rx="4" fill="#C2410C" transform="rotate(-14 29 195)"></rect>',
    'purple': '<circle cx="332" cy="28" r="9" fill="#2563EB"></circle><rect x="20" y="186" width="18" height="18" rx="4" fill="#C2410C" transform="rotate(-14 29 195)"></rect>',
    'orange': '<circle cx="332" cy="28" r="9" fill="#2563EB"></circle><rect x="20" y="186" width="18" height="18" rx="4" fill="#A21CAF" transform="rotate(-14 29 195)"></rect>',
}

f = lambda v: f'{v:.1f}'.rstrip('0').rstrip('.')


def polyline(points):
    return 'M' + ' L'.join(f'{f(x)} {f(y)}' for x, y in points)


def svg(palette, accent, body):
    return ('<svg class="mc-topic__art" viewBox="0 0 360 220" aria-hidden="true" focusable="false">'
            f'<rect width="360" height="220" rx="24" fill="{palette["bg"]}"></rect>{body}{ACCENTS[accent]}</svg>')


def art_t02():
    """y = x + 1/(x-1): máximo relativo (0, -1), mínimo relativo (2, 3), asíntotas x = 1 e y = x."""
    c = BLUE
    g = lambda x: x + 1 / (x - 1)          # máximo en x=0 (y=-1), mínimo en x=2 (y=3), asíntota x=1
    sx = lambda x: 200 + 62 * (x - 1)      # x=1 -> 200
    sy = lambda y: 128 - 20 * (y - 1)      # y=1 -> 128
    left = [(sx(x), sy(g(x))) for x in [i / 50 for i in range(-110, 46)]]
    right = [(sx(x), sy(g(x))) for x in [1 + i / 100 for i in range(20, 220)]]
    clip = lambda pts: [(x, y) for x, y in pts if 30 <= y <= 204 and 58 <= x <= 330]
    left, right = clip(left), clip(right)
    mx, mn = (sx(0), sy(-1)), (sx(2), sy(3))
    return svg(c, 'blue',
               f'<path d="M52 {f(sy(0))} H330" stroke="{c["dark"]}" stroke-width="2.5" stroke-linecap="round"></path>'
               f'<path d="M{f(sx(-1.4))} {f(sy(-1.4))} L{f(sx(3.9))} {f(sy(3.9))}" stroke="{c["mid"]}" stroke-width="3" stroke-dasharray="7 7"></path>'
               f'<path d="M200 24 V204" stroke="{c["mid"]}" stroke-width="3" stroke-dasharray="7 7"></path>'
               f'<path d="M{f(mx[0]-28)} {f(mx[1])} H{f(mx[0]+28)} M{f(mn[0]-28)} {f(mn[1])} H{f(mn[0]+28)}" stroke="{c["mid"]}" stroke-width="3" stroke-linecap="round"></path>'
               f'<path d="{polyline(left)}" fill="none" stroke="{c["main"]}" stroke-width="5" stroke-linecap="round" stroke-linejoin="round"></path>'
               f'<path d="{polyline(right)}" fill="none" stroke="{c["main"]}" stroke-width="5" stroke-linecap="round" stroke-linejoin="round"></path>'
               f'<circle cx="{f(mx[0])}" cy="{f(mx[1])}" r="8" fill="{c["main"]}" stroke="#FFFFFF" stroke-width="3"></circle>'
               f'<circle cx="{f(mn[0])}" cy="{f(mn[1])}" r="8" fill="{c["dark"]}" stroke="#FFFFFF" stroke-width="3"></circle>')


def art_t03():
    """Área bajo y = 1 + 3 sen(pi x / 4) entre 0,5 y 3,5, con la suma de Riemann de punto medio (6 rectángulos)."""
    c = BLUE
    h = lambda x: 1 + 3 * math.sin(math.pi * x / 4)       # 0 <= x <= 4
    sx = lambda x: 60 + 60 * x
    sy = lambda y: 186 - 34 * y
    a, b, n = 0.5, 3.5, 6
    w = (b - a) / n
    rects = ''.join(
        f'<rect x="{f(sx(a + i * w))}" y="{f(sy(h(a + (i + .5) * w)))}" width="{f(60 * w)}" height="{f(186 - sy(h(a + (i + .5) * w)))}" fill="none" stroke="{c["mid"]}" stroke-width="2"></rect>'
        for i in range(n))
    curve = [(sx(x), sy(h(x))) for x in [i / 40 for i in range(0, 161)]]
    area = [(sx(a), 186)] + [(sx(x), sy(h(x))) for x in [a + i * (b - a) / 60 for i in range(61)]] + [(sx(b), 186)]
    return svg(c, 'blue',
               f'<path d="{polyline(area)} Z" fill="{c["soft"]}"></path>{rects}'
               f'<path d="M{f(sx(a))} 186 V{f(sy(h(a)))} M{f(sx(b))} 186 V{f(sy(h(b)))}" stroke="{c["dark"]}" stroke-width="3" stroke-linecap="round"></path>'
               f'<path d="{polyline(curve)}" fill="none" stroke="{c["main"]}" stroke-width="5" stroke-linecap="round" stroke-linejoin="round"></path>'
               f'<path d="M44 186 H316" stroke="{c["dark"]}" stroke-width="2.5" stroke-linecap="round"></path>')


def art_t04():
    """Matriz 3x3 entre corchetes con la diagonal destacada y un grafo de tres vértices."""
    c = PURPLE
    cells = ''
    for r in range(3):
        for k in range(3):
            fill = c['main'] if r == k else (c['mid'] if (r, k) == (0, 2) else c['soft'])
            cells += f'<rect x="{88 + k * 54}" y="{52 + r * 42}" width="44" height="32" rx="8" fill="{fill}"></rect>'
    nodes = [(300, 64), (338, 118), (296, 164)]
    edges = ''.join(f'<path d="M{a[0]} {a[1]} L{b[0]} {b[1]}" stroke="{c["mid"]}" stroke-width="3"></path>'
                    for a, b in [(nodes[0], nodes[1]), (nodes[1], nodes[2]), (nodes[0], nodes[2])])
    dots = ''.join(f'<circle cx="{x}" cy="{y}" r="9" fill="{c["dark"]}" stroke="#FFFFFF" stroke-width="3"></circle>' for x, y in nodes)
    return svg(c, 'purple',
               f'<path d="M84 38 H70 V182 H84 M252 38 H266 V182 H252" fill="none" stroke="{c["dark"]}" stroke-width="5" stroke-linecap="round" stroke-linejoin="round"></path>'
               f'{cells}{edges}{dots}')


def art_t05():
    """Tres rectas que pasan por un mismo punto: sistema compatible determinado."""
    c = PURPLE
    p = (196, 100)
    def through(m, x0, x1):
        return f'M{x0} {f(p[1] + m * (x0 - p[0]))} L{x1} {f(p[1] + m * (x1 - p[0]))}'
    lines = [(-0.45, c['main']), (0.42, c['mid']), (-3.2, c['dark'])]
    paths = ''.join(
        f'<path d="{through(m, *( (60, 330) if abs(m) < 1 else (p[0] - 28, p[0] + 26) ))}" stroke="{col}" stroke-width="5" stroke-linecap="round"></path>'
        for m, col in lines)
    return svg(c, 'purple',
               f'<path d="M48 186 H330 M60 200 V24" stroke="{c["soft"]}" stroke-width="3" stroke-linecap="round"></path>'
               f'{paths}<circle cx="{p[0]}" cy="{p[1]}" r="10" fill="#FFFFFF" stroke="{c["dark"]}" stroke-width="4"></circle>')


def art_t06():
    """Región factible poligonal, rectas de las restricciones, vértices y recta de nivel en el óptimo."""
    c = PURPLE
    poly = [(70, 180), (70, 90), (150, 60), (260, 100), (290, 180)]
    def ext(a, b, t0, t1):
        return f'M{f(a[0] + t0 * (b[0] - a[0]))} {f(a[1] + t0 * (b[1] - a[1]))} L{f(a[0] + t1 * (b[0] - a[0]))} {f(a[1] + t1 * (b[1] - a[1]))}'
    cons = ' '.join([ext(poly[1], poly[2], -0.35, 1.6), ext(poly[2], poly[3], -0.45, 1.3), ext(poly[3], poly[4], -0.4, 1.25)])
    # Recta de nivel y = x - 160 por el vértice (260, 100): deja todo el polígono a un lado.
    assert all(y >= x - 160 for x, y in poly)
    vertices = ''.join(f'<circle cx="{x}" cy="{y}" r="7" fill="{c["main"]}" stroke="#FFFFFF" stroke-width="3"></circle>' for x, y in poly if (x, y) != (260, 100))
    return svg(c, 'purple',
               f'<path d="M{polyline(poly)[1:]} Z" fill="{c["soft"]}"></path>'
               f'<path d="{cons}" stroke="{c["mid"]}" stroke-width="3" stroke-linecap="round"></path>'
               f'<path d="M50 180 H330 M70 200 V24" stroke="{c["dark"]}" stroke-width="2.5" stroke-linecap="round"></path>'
               f'<path d="M214 54 L306 146" stroke="{c["dark"]}" stroke-width="3" stroke-dasharray="8 7" stroke-linecap="round"></path>'
               f'<path d="M276 84 L300 60 M300 60 H288 M300 60 V72" fill="none" stroke="{c["dark"]}" stroke-width="3" stroke-linecap="round" stroke-linejoin="round"></path>'
               f'{vertices}<circle cx="260" cy="100" r="10" fill="{c["dark"]}" stroke="#FFFFFF" stroke-width="3"></circle>')


def art_t08():
    """Binomial B(10; 0,5) en barras y la normal N(5; 1,58) que la aproxima, con una cola sombreada."""
    c = ORANGE
    n, p = 10, 0.5
    mu, sd = n * p, math.sqrt(n * p * (1 - p))
    sx = lambda x: 50 + 26 * x
    scale = 520
    base = 188
    bars = ''.join(
        f'<rect x="{f(sx(k) - 10)}" y="{f(base - scale * math.comb(n, k) * p**k * (1 - p)**(n - k))}" width="20" height="{f(scale * math.comb(n, k) * p**k * (1 - p)**(n - k))}" rx="3" fill="{c["soft"]}"></rect>'
        for k in range(n + 1))
    phi = lambda x: math.exp(-((x - mu) / sd) ** 2 / 2) / (sd * math.sqrt(2 * math.pi))
    xs = [i / 20 for i in range(-16, 217)]
    curve = [(sx(x), base - scale * phi(x)) for x in xs]
    t = mu + sd
    tail = [(sx(t), base)] + [(sx(x), base - scale * phi(x)) for x in xs if x >= t] + [(sx(xs[-1]), base)]
    return svg(c, 'orange',
               f'{bars}<path d="{polyline(tail)} Z" fill="{c["mid"]}" fill-opacity="0.55"></path>'
               f'<path d="{polyline(curve)}" fill="none" stroke="{c["main"]}" stroke-width="5" stroke-linecap="round" stroke-linejoin="round"></path>'
               f'<path d="M46 {base} H336" stroke="{c["dark"]}" stroke-width="2.5" stroke-linecap="round"></path>')


def art_t09():
    """Población, muestra bajo la lupa y estimación por intervalo bajo una campana."""
    c = ORANGE
    rnd = random.Random(9)
    cx, cy, r = 128, 104, 40
    dots, sample = '', ''
    placed = []
    while len(placed) < 34:
        x, y = rnd.uniform(56, 200), rnd.uniform(46, 170)
        if all((x - a) ** 2 + (y - b) ** 2 > 330 for a, b in placed):
            placed.append((x, y))
    for x, y in placed:
        inside = (x - cx) ** 2 + (y - cy) ** 2 < (r - 8) ** 2
        circle = f'<circle cx="{f(x)}" cy="{f(y)}" r="5" fill="{c["dark"] if inside else c["mid"]}"></circle>'
        if inside:
            sample += circle
        else:
            dots += circle
    bell = [(236 + 47 * (1 + z / 3), 132 - 52 * math.exp(-z * z / 2)) for z in [i / 10 for i in range(-30, 31)]]
    return svg(c, 'orange',
               f'<rect x="40" y="30" width="176" height="156" rx="40" fill="{c["soft"]}"></rect>{dots}'
               f'<circle cx="{cx}" cy="{cy}" r="{r}" fill="#FFFFFF" fill-opacity="0.6" stroke="{c["main"]}" stroke-width="6"></circle>{sample}'
               f'<path d="M{cx + 29} {cy + 29} L{cx + 50} {cy + 50}" stroke="{c["main"]}" stroke-width="9" stroke-linecap="round"></path>'
               f'<path d="{polyline(bell)}" fill="none" stroke="{c["mid"]}" stroke-width="4" stroke-linecap="round"></path>'
               f'<path d="M252 156 H314 M252 146 V166 M314 146 V166" stroke="{c["main"]}" stroke-width="4" stroke-linecap="round"></path>'
               f'<circle cx="283" cy="156" r="8" fill="{c["dark"]}" stroke="#FFFFFF" stroke-width="3"></circle>')


TOPICS = {
    '02-representacion-de-funciones': ('Tema 2 · Análisis', '9 lecciones · 60 preguntas · 54 tarjetas · 3 juegos', art_t02),
    '03-integrales': ('Tema 3 · Análisis', '8 lecciones · 60 preguntas · 48 tarjetas · 3 juegos', art_t03),
    '04-matrices-y-determinantes': ('Tema 4 · Álgebra y decisiones', '12 lecciones · 72 preguntas · 72 tarjetas · 3 juegos', art_t04),
    '05-sistemas-de-ecuaciones': ('Tema 5 · Álgebra y decisiones', '11 lecciones · 66 preguntas · 66 tarjetas · 3 juegos', art_t05),
    '06-programacion-lineal': ('Tema 6 · Álgebra y decisiones', '5 lecciones · 19 tarjetas · 3 juegos', art_t06),
    '08-distribuciones-de-probabilidad': ('Tema 8 · Azar y datos', '4 lecciones · 21 ejercicios resueltos · 19 tarjetas · 3 juegos', art_t08),
    '09-inferencia-estadistica': ('Tema 9 · Azar y datos', '9 lecciones · 27 ejercicios resueltos · 20 preguntas · 30 tarjetas · 3 juegos', art_t09),
}

only = sys.argv[2:] or list(TOPICS)
for folder in only:
    chip, facts, art = TOPICS[folder]
    file = root / 'libro' / 'temas' / folder / 'index.html'
    raw = file.read_bytes().decode('utf-8')
    if 'mc-topic__hero' in raw:
        print('Ya tiene cabecera:', folder); continue
    nl = '\r\n' if '\r\n' in raw else '\n'
    lines = raw.split(nl)
    h = next(i for i, line in enumerate(lines) if line.lstrip().startswith('<h1'))
    lead = lines[h + 1]
    assert '<p' in lead and 'lead' in lead, (folder, lead[:80])
    lead = re.sub(r'class="lead"', 'class="lead mc-lead"', lead, count=1) if 'class="lead"' in lead else lead.replace('<p ', '<p class="mc-lead" ', 1)
    ind = lines[h][:len(lines[h]) - len(lines[h].lstrip())]
    block = [ind + '<header class="mc-topic__hero">', ind + '  <div class="mc-topic__intro">',
             ind + f'    <span class="mc-chip mc-chip--dot">{chip}</span>', ind + '    ' + lines[h].lstrip(),
             ind + '    ' + lead.lstrip(), ind + f'    <p class="mc-topic__facts">{facts}</p>',
             ind + '  </div>', ind + '  ' + art(), ind + '</header>']
    lines[h:h + 2] = block
    file.write_bytes(nl.join(lines).encode('utf-8'))
    print('Cabecera añadida:', folder)

// Sumas de Riemann con una curva (3.5): regla del extremo izquierdo, punto medio o extremo derecho y número de
// rectángulos. El cálculo está en content/models/riemann-sums.js.
import { riemannModel, RIEMANN_A, RIEMANN_B } from '../../../content/models/riemann-sums.js';
import { updateMath } from '../core/math.js';

const tex = String.raw;
const fmt = x => x.toLocaleString('es-ES', { maximumFractionDigits: 6, useGrouping: false });
const mathNumber = x => fmt(x).replace(',', '{,}');
const NS = 'http://www.w3.org/2000/svg';
const node = (tag, attrs = {}, value) => {
  const element = document.createElementNS(NS, tag);
  for (const [key, val] of Object.entries(attrs)) element.setAttribute(key, val);
  if (value !== undefined) element.textContent = value;
  return element;
};
const text = (tag, value) => { const element = document.createElement(tag); element.textContent = value; return element; };

function graph(m) {
  const px = x => 60 + (x - RIEMANN_A) / (RIEMANN_B - RIEMANN_A) * 440, py = y => 300 - y * 62;
  const figure = document.createElement('figure');
  figure.className = 'riemann-figure';
  const svg = node('svg', { viewBox: '0 0 540 340', role: 'img', 'aria-labelledby': 'riemann-title riemann-desc' });
  svg.append(node('title', { id: 'riemann-title' }, 'Suma de Riemann'),
    node('desc', { id: 'riemann-desc' }, `${m.family.label} en [0, 2] con ${m.n} rectángulos (${m.rule.label.toLowerCase()}). Suma ${fmt(m.sum)}; valor exacto ${fmt(m.exact)}; aproximación ${m.direction}.`));
  for (let x = 0; x <= 2; x += 0.5) svg.append(node('path', { d: `M${px(x)} 40V300`, stroke: '#ddd' }), node('text', { x: px(x), y: 322, 'text-anchor': 'middle' }, fmt(x)));
  for (let y = 0; y <= 4; y++) svg.append(node('path', { d: `M60 ${py(y)}H500`, stroke: '#ddd' }), node('text', { x: 50, y: py(y) + 5, 'text-anchor': 'end' }, y));
  for (const r of m.rectangles) {
    svg.append(node('rect', { x: px(r.left), y: py(r.height), width: px(r.right) - px(r.left), height: py(0) - py(r.height),
      fill: '#dbeafe', stroke: '#1e3a8a', 'stroke-width': m.n > 40 ? 0.5 : 1.2, 'data-riemann-rectangle': '' }));
  }
  if (m.n <= 20) for (const r of m.rectangles) svg.append(node('circle', { cx: px(r.x), cy: py(r.height), r: 3.5, fill: '#b45309' }));
  const d = Array.from({ length: 101 }, (_, i) => { const x = i / 50; return (i ? 'L' : 'M') + px(x) + ' ' + py(m.family.value(x)); }).join(' ');
  svg.append(node('path', { d: 'M60 300H510M60 30V300', stroke: '#222', 'stroke-width': 1.5, fill: 'none' }),
    node('path', { d, fill: 'none', stroke: '#c2410c', 'stroke-width': 3 }), node('text', { x: 518, y: 305 }, 'x'), node('text', { x: 66, y: 28 }, 'y'));
  figure.append(svg, text('figcaption', 'Curva continua: la función. Rectángulos azules: la suma. Puntos naranjas (hasta 20 rectángulos): el punto de cada intervalo que da la altura.'));
  return figure;
}

export function initializeRiemannExplorer() {
  const root = document.querySelector('[data-riemann-explorer]');
  if (!root) return;
  const $ = selector => root.querySelector(selector);
  const result = $('[data-riemann-result]');
  const update = () => {
    const kind = $('[data-riemann-family]').value, rule = $('[data-riemann-rule]').value, n = Number($('[data-riemann-n]').value);
    $('[data-riemann-n-value]').textContent = n;
    const m = riemannModel(kind, rule, n);
    return updateMath(result, () => {
      result.dataset.selection = [kind, rule, n].join(':');
      result.dataset.sum = m.sum;
      result.dataset.direction = m.direction;
      result.replaceChildren(
        text('p', tex`\[S_{${n}}=${mathNumber(m.sum)},\qquad \int_0^2 ${m.family.integrand}\,dx=${m.family.exactTex}\approx${mathNumber(m.exact)}.\]`),
        graph(m),
        text('p', tex`Error absoluto: \(${mathNumber(m.error)}\). ${m.direction === 'exacta' ? 'La suma coincide con el valor exacto.'
          : `La suma aproxima ${m.direction}: la función es ${m.family.monotony} en [0, 2]${m.ruleKey === 'mid' ? ' y el punto medio compensa buena parte del error' : m.ruleKey === 'left' ? ', así que el extremo izquierdo da alturas ' + (m.family.monotony === 'creciente' ? 'menores' : 'mayores') + ' que el resto del intervalo' : ', así que el extremo derecho da alturas ' + (m.family.monotony === 'creciente' ? 'mayores' : 'menores') + ' que el resto del intervalo'}.`}`)
      );
      $('[data-riemann-status]').textContent = `${m.n} rectángulos, ${m.rule.label.toLowerCase()}: suma ${fmt(m.sum)}, error ${fmt(m.error)}, ${m.direction}.`;
    });
  };
  root.addEventListener('input', update);
  root.addEventListener('change', update);
  update();
}

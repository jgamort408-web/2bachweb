import { updateMath } from '../core/math.js';

// Las expresiones simplificadas evitan cancelación al tomar incrementos pequeños.
export function secantSlope(kind, a, h) {
  if (h === 0) throw new RangeError('La secante requiere un incremento distinto de cero.');
  if (kind === 'square') return 2 * a + h;
  if (a >= 0 && a + h >= 0) return 1;
  if (a <= 0 && a + h <= 0) return -1;
  return (Math.abs(a + h) - Math.abs(a)) / h;
}

export function derivativeAt(kind, a) {
  return kind === 'square' ? 2 * a : a === 0 ? null : Math.sign(a);
}

export function initializeDerivativeExplorer() {
  const root = document.querySelector('[data-derivative-explorer]');
  if (!root) return;
  const kindControl = root.querySelector('#derivative-function');
  const pointControl = root.querySelector('#derivative-point');
  const distanceControl = root.querySelector('#derivative-distance');
  const formula = root.querySelector('[data-derivative-formula]');
  const format = (number) => number.toLocaleString('es-ES', { maximumFractionDigits: 6 });
  const px = (x) => 250 + 65 * x;
  const py = (y) => 260 - 25 * y;
  const value = (kind, x) => kind === 'square' ? x * x : Math.abs(x);
  const linePath = (a, y, slope) => 'M' + px(-3.3) + ' ' + py(y + slope * (-3.3 - a)) +
    'L' + px(3.3) + ' ' + py(y + slope * (3.3 - a));

  const render = (changeFormula = false) => {
    const kind = kindControl.value, a = Number(pointControl.value);
    const delta = 10 ** -Number(distanceControl.value);
    const derivative = derivativeAt(kind, a), y = value(kind, a);
    for (const [side, h] of [['left', -delta], ['right', delta]]) {
      const slope = secantSlope(kind, a, h);
      root.querySelector('[data-derivative-' + side + '-h]').textContent = format(h);
      root.querySelector('[data-derivative-' + side + '-slope]').textContent = format(slope);
      root.querySelector('[data-derivative-' + side + '-line]').setAttribute('d', linePath(a, y, slope));
    }
    // Muestreo uniforme para la curva; no se utiliza para decidir la derivabilidad.
    const points = Array.from({ length: 133 }, (_, i) => {
      const x = (i - 66) / 20;
      return (i ? 'L' : 'M') + px(x) + ' ' + py(value(kind, x));
    });
    root.querySelector('[data-derivative-curve]').setAttribute('d', points.join(' '));
    const tangent = root.querySelector('[data-derivative-tangent]');
    tangent.setAttribute('d', derivative === null ? '' : linePath(a, y, derivative));
    const point = root.querySelector('[data-derivative-point]');
    point.setAttribute('cx', px(a)); point.setAttribute('cy', py(y));
    const summary = derivative === null
      ? 'En a=0, la pendiente izquierda es −1 y la derecha es 1. La función es continua, pero no es derivable: hay una esquina.'
      : 'En a=' + format(a) + ', las pendientes se acercan a ' + format(derivative) +
        ' por ambos lados. Ese es el valor de la derivada. Distancia usada: ' + format(delta) + '.';
    root.querySelector('[data-derivative-summary]').textContent = summary;
    root.querySelector('#derivative-graph-description').textContent =
      (kind === 'square' ? 'Parábola y=x². ' : 'Gráfica de y=|x|. ') + summary;
    if (changeFormula) {
      const text = kind === 'square'
        ? '\\[\\begin{aligned}\\frac{(a+h)^2-a^2}{h}&=2a+h\\\\ f\'(a)&=2a.\\end{aligned}\\]'
        : '\\[\\begin{gathered}\\frac{|a+h|-|a|}{h}\\\\ f\'_-(0)=-1,\\quad f\'_+(0)=1.\\end{gathered}\\]';
      updateMath(formula, () => { formula.textContent = text; });
    }
  };
  kindControl.addEventListener('change', () => render(true));
  pointControl.addEventListener('change', () => render());
  distanceControl.addEventListener('input', () => render());
  render();
}

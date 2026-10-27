import { updateMath } from '../core/math.js';

export function tangentData(a) {
  return { a, y: a * a, slope: 2 * a, normalSlope: a === 0 ? null : -1 / (2 * a) };
}

export function initializeTangentExplorer() {
  const root = document.querySelector('[data-tangent-explorer]');
  if (!root) return;
  const control = root.querySelector('#tangent-point');
  const formula = root.querySelector('[data-tangent-formula]');
  const px = (x) => 240 + 45 * x, py = (y) => 290 - 45 * y;
  const line = (a, y, slope) => 'M' + px(-5) + ' ' + py(y + slope * (-5 - a)) +
    'L' + px(5) + ' ' + py(y + slope * (5 - a));
  // Escala idéntica en los dos ejes; evita distorsionar los ángulos rectos.
  const ticks = root.querySelector('[data-tangent-ticks]');
  const svgNS = 'http://www.w3.org/2000/svg';
  for (const [axis, values] of [['x', [-4, -2, 0, 2, 4]], ['y', [-1, 1, 3, 5]]]) {
    for (const number of values) {
      const text = document.createElementNS(svgNS, 'text');
      text.textContent = String(number);
      text.setAttribute('x', axis === 'x' ? px(number) : px(0) + 8);
      text.setAttribute('y', axis === 'x' ? py(0) + 20 : py(number) + 5);
      text.setAttribute('text-anchor', axis === 'x' ? 'middle' : 'start');
      ticks.append(text);
    }
  }
  const curve = Array.from({ length: 181 }, (_, i) => {
    const x = (i - 90) / 20;
    return (i ? 'L' : 'M') + px(x) + ' ' + py(x * x);
  }).join(' ');
  root.querySelector('[data-tangent-curve]').setAttribute('d', curve);

  const render = (renderFormula = true) => {
    const { a, y, slope, normalSlope } = tangentData(Number(control.value));
    root.querySelector('[data-tangent-line]').setAttribute('d', line(a, y, slope));
    root.querySelector('[data-normal-line]').setAttribute('d', normalSlope === null
      ? 'M' + px(a) + ' ' + py(-2) + 'L' + px(a) + ' ' + py(6)
      : line(a, y, normalSlope));
    const dot = root.querySelector('[data-tangent-dot]');
    dot.setAttribute('cx', px(a)); dot.setAttribute('cy', py(y));
    root.querySelector('[data-tangent-slope]').textContent = String(slope);
    root.querySelector('[data-normal-slope]').textContent = normalSlope === null
      ? 'No definida' : (a > 0 ? '−' : '') + '1/' + Math.abs(slope);
    const summary = 'Ambas rectas pasan por (' + a + ',' + y + '). ' + (normalSlope === null
      ? 'La tangente es horizontal, y=0, y la normal es vertical, x=0.'
      : 'El producto de sus pendientes es −1.');
    root.querySelector('[data-tangent-summary]').textContent = summary;
    root.querySelector('#tangent-graph-description').textContent = 'Parábola y=x². ' + summary;
    if (renderFormula) {
      const offset = a < 0 ? '(x+' + Math.abs(a) + ')' : '(x-' + a + ')';
      const text = a === 0
        ? '\\[\\begin{aligned}P&=(0,0)\\\\t:\\ y&=0\\\\n:\\ x&=0\\end{aligned}\\]'
        : '\\[\\begin{aligned}P&=(' + a + ',' + y + ')\\\\t:\\ y-' + y + '&=' + slope + offset +
          '\\\\n:\\ y-' + y + '&=' + (a > 0 ? '-' : '') + '\\frac1{' + Math.abs(slope) + '}' + offset + '\\end{aligned}\\]';
      updateMath(formula, () => { formula.textContent = text; });
    }
  };
  control.addEventListener('change', () => render());
  render(false);
}

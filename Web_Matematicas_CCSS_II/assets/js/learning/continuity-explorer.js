import { updateMath } from '../core/math.js';

export const continuityCases = {
  smooth: { formula: '\\[f(x)=x^2,\\qquad f(0)=0.\\]', summary: 'Es continua y derivable en 0. Las pendientes se aproximan a 0.' },
  corner: { formula: '\\[f(x)=|x|,\\qquad f(0)=0.\\]', summary: 'Es continua, pero no derivable en 0: las pendientes laterales son −1 y 1.' },
  jump: { formula: '\\[f(x)=\\begin{cases}x,&x<0,\\\\x+1,&x\\ge0.\\end{cases}\\]', summary: 'No es continua ni derivable en 0. Los límites laterales de la función son 0 y 1; f(0)=1. El cociente izquierdo diverge a más infinito.' },
  isolated: { formula: '\\[f(x)=\\begin{cases}x^2,&x\\ne0,\\\\1,&x=0.\\end{cases}\\]', summary: 'No es continua ni derivable en 0. El límite es 0, pero f(0)=1: discontinuidad evitable. Las pendientes divergen con signos opuestos.' },
};
export function continuityValue(kind, x) {
  if (kind === 'corner') return Math.abs(x);
  if (kind === 'jump') return x < 0 ? x : x + 1;
  if (kind === 'isolated' && x === 0) return 1;
  return x * x;
}
export function continuitySlope(kind, h) {
  if (h === 0) throw new RangeError('El incremento no puede ser cero.');
  if (kind === 'corner') return Math.sign(h);
  if (kind === 'jump') return h < 0 ? 1 - 1 / h : 1;
  if (kind === 'isolated') return h - 1 / h;
  return h;
}
export function initializeContinuityExplorer() {
  const root = document.querySelector('[data-continuity-explorer]');
  if (!root) return;
  const choice = root.querySelector('#continuity-case'), distance = root.querySelector('#continuity-distance');
  const formula = root.querySelector('[data-continuity-formula]');
  const format = (x) => x.toLocaleString('es-ES', { maximumFractionDigits: 10, useGrouping: false });
  const px = (x) => 220 + 80 * x, py = (y) => 240 - 60 * y;
  const render = (changeFormula = false) => {
    const kind = choice.value, current = continuityCases[kind], delta = 10 ** -Number(distance.value);
    for (const [side, sign] of [['left', -1], ['right', 1]]) {
      const h = sign * delta;
      root.querySelector('[data-continuity-' + side + '-h]').textContent = format(h);
      root.querySelector('[data-continuity-' + side + '-value]').textContent = format(continuityValue(kind, h));
      root.querySelector('[data-continuity-' + side + '-slope]').textContent = format(continuitySlope(kind, h));
      const points = Array.from({ length: 49 }, (_, i) => {
        const x = sign * i / 20;
        const y = kind === 'jump' ? x + (side === 'right' ? 1 : 0) :
          kind === 'corner' ? Math.abs(x) : x * x;
        return (i ? 'L' : 'M') + px(x) + ' ' + py(y);
      }).join(' ');
      root.querySelector('[data-continuity-' + side + ']').setAttribute('d', points);
    }
    root.querySelector('[data-continuity-value]').setAttribute('cy', py(continuityValue(kind, 0)));
    root.querySelector('[data-continuity-hole]').setAttribute('visibility', ['jump', 'isolated'].includes(kind) ? 'visible' : 'hidden');
    root.querySelector('[data-continuity-point]').textContent = 'f(0)=' + continuityValue(kind, 0) + '.';
    root.querySelector('[data-continuity-summary]').textContent = current.summary;
    root.querySelector('#continuity-description').textContent = current.summary;
    if (changeFormula) updateMath(formula, () => { formula.textContent = current.formula; });
  };
  choice.addEventListener('change', () => render(true));
  distance.addEventListener('input', () => render());
  render();
}

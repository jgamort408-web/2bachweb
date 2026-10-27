import { updateMath } from '../core/math.js';

export function initializeRationalizationExplorer() {
  const root = document.querySelector('[data-rationalization]');
  if (!root) return;
  const parameter = root.querySelector('#root-k');
  const distance = root.querySelector('#root-distance');
  const formula = root.querySelector('[data-root-formula]');
  const format = (value) => value.toLocaleString('es-ES', { maximumFractionDigits: 6 });
  const renderValues = () => {
    const k = Number(parameter.value), point = k * k, delta = 10 ** -Number(distance.value);
    for (const [side, x] of [['left', point - delta], ['right', point + delta]]) {
      root.querySelector('[data-root-' + side + '-x]').textContent = format(x);
      root.querySelector('[data-root-' + side + '-y]').textContent = format(1 / (Math.sqrt(x) + k));
    }
    root.querySelector('[data-root-summary]').textContent = 'El límite es 1/' + (2 * k) +
      '. Los valores se acercan a ' + format(1 / (2 * k)) + ' (aproximación decimal). ' +
      'La expresión original sigue sin estar definida en x=' + point + '.';
  };
  const renderFormula = () => {
    const k = Number(parameter.value);
    return updateMath(formula, () => {
      formula.textContent = '\\[\\lim_{x\\to ' + k * k + '}\\frac{\\sqrt{x}-' + k + '}{x-' + k * k + '}=\\frac1{' + 2 * k + '}.\\]';
    });
  };
  parameter.addEventListener('change', () => { renderFormula(); renderValues(); });
  distance.addEventListener('input', renderValues);
  renderValues();
}

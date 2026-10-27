import { updateMath } from '../core/math.js';

const format = (value) => value.toLocaleString('es-ES', { maximumFractionDigits: 4 });
export function initializeInfinityExplorers() {
  const point = document.querySelector('[data-infinite-point]');
  if (point) {
    const choice = point.querySelector('select');
    const distance = point.querySelector('input');
    const formula = point.querySelector('[data-point-formula]');
    const renderValues = () => {
      const delta = 10 ** -Number(distance.value);
      const numerator = choice.value === 'odd-positive' ? 3 : -3;
      const power = choice.value === 'even-negative' ? 2 : 1;
      // Usar delta evita amplificar el error de restar dos números cercanos.
      const left = numerator / (-delta) ** power;
      const right = numerator / delta ** power;
      for (const [key, value] of [['left-x', 2 - delta], ['right-x', 2 + delta], ['left-y', left], ['right-y', right]]) {
        point.querySelector('[data-point-' + key + ']').textContent = format(value);
      }
      const leftLimit = left > 0 ? '+∞' : '−∞', rightLimit = right > 0 ? '+∞' : '−∞';
      point.querySelector('[data-point-summary]').textContent = 'Distancia a 2: ' + format(delta) +
        '. Límite izquierdo: ' + leftLimit + '; derecho: ' + rightLimit + '. ' +
        (leftLimit === rightLimit ? 'El límite bilateral es ' + leftLimit + '.' : 'No hay límite bilateral único.') +
        ' En todos los casos, x=2 es asíntota vertical.';
    };
    const renderFormula = () => updateMath(formula, () => {
      const numerator = choice.value === 'odd-positive' ? '3' : '-3';
      const denominator = choice.value === 'even-negative' ? '(x-2)^2' : 'x-2';
      formula.textContent = '\\[f(x)=\\frac{' + numerator + '}{' + denominator + '}\\]';
    });
    choice.addEventListener('change', () => { renderFormula(); renderValues(); });
    distance.addEventListener('input', renderValues);
    renderValues();
  }
  const saturation = document.querySelector('[data-saturation]');
  if (saturation) {
    const control = saturation.querySelector('input');
    const update = () => {
      const level = Number(control.value);
      for (const node of saturation.querySelectorAll('[data-saturation-value]')) {
        const t = Number(node.dataset.saturationValue);
        node.textContent = format(level * t / (t + 4));
      }
      for (const node of saturation.querySelectorAll('[data-saturation-gap]')) {
        const t = Number(node.dataset.saturationGap);
        node.textContent = format(4 * level / (t + 4));
      }
      saturation.querySelector('[data-saturation-summary]').textContent = 'M = ' + format(level) +
        '. La asíntota horizontal es y = ' + format(level) + '. El modelo se aproxima a este nivel sin alcanzarlo en tiempo finito.';
    };
    control.addEventListener('input', update); update();
  }
}

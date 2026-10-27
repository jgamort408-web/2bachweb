import { cancellationModel, holeAndPole, obliqueRational } from '../../../content/models/rational-functions.js';
import { updateMath } from '../core/math.js';

export function initializeRationalExplorer() {
  for (const [selector, fn, intervals, px, py] of [
    ['[data-hole-pole-curve]', holeAndPole.reduced, [[-3.5, 1.985], [2.015, 4.5]], x => 260 + 60 * x, y => 220 - 45 * y],
    ['[data-oblique-curve]', obliqueRational.value, [[-2.5, 0.985], [1.015, 5.5]], x => 200 + 60 * x, y => 260 - 30 * y],
  ]) {
    const curve = document.querySelector(selector);
    if (!curve) continue;
    const points = [];
    for (const [start, end] of intervals) for (let i = 0; i <= 400; i++) {
      const x = start + (end - start) * i / 400;
      points.push((i ? 'L' : 'M') + px(x).toFixed(3) + ' ' + py(fn(x)).toFixed(3));
    }
    curve.setAttribute('d', points.join(' '));
  }
  const root = document.querySelector('[data-rational-explorer]');
  if (!root) return;
  const result = root.querySelector('[data-rational-result]');
  const format = value => value.toLocaleString('es-ES', { maximumFractionDigits: 4 });
  const infinity = value => value > 0 ? '+\\infty' : '-\\infty';
  const update = () => {
    const model = cancellationModel(root.querySelector('[data-case]').value, Number(root.querySelector('[data-point]').value), Number(root.querySelector('[data-coefficient]').value));
    // Serializar todos los datos del resultado para no mezclar estados al cambiar rápido.
    updateMath(result, () => {
      const { a, k, m, n } = model;
      const factor = '(x' + (a < 0 ? '+' + -a : '-' + a) + ')';
      const formula = document.createElement('p');
      formula.textContent = '\\[F(x)=\\frac{' + k + factor + '^{' + m + '}}{' + factor + '^{' + n + '}},\\qquad x\\ne ' + a + '.\\]';
      const explanation = document.createElement('p');
      explanation.className = 'key-idea';
      explanation.textContent = model.limit === null
        ? 'Tras cancelar queda \\(' + k + '/' + factor + '\\). Hay asíntota vertical en x=' + a + ': el límite izquierdo es \\(' + infinity(model.left) + '\\) y el derecho \\(' + infinity(model.right) + '\\).'
        : 'Tras cancelar queda \\(' + (m === n ? k : k + factor) + '\\). El límite es ' + model.limit + ', pero F(' + a + ') no existe: hay un hueco en (' + a + ', ' + model.limit + ').';
      const scroll = document.createElement('div'); scroll.className = 'table-scroll';
      const table = document.createElement('table');
      const caption = document.createElement('caption'); caption.textContent = 'Aproximación al punto excluido ' + a + ' por ambos lados'; table.append(caption);
      const head = table.createTHead().insertRow();
      for (const text of ['Distancia', 'x a la izquierda', 'F(x)', 'x a la derecha', 'F(x)']) { const th = document.createElement('th'); th.scope = 'col'; th.textContent = text; head.append(th); }
      const body = table.createTBody();
      for (const d of [0.5, 0.1, 0.01]) {
        const row = body.insertRow();
        for (const value of [d, a - d, model.value(a - d), a + d, model.value(a + d)]) row.insertCell().textContent = format(value);
      }
      scroll.append(table);
      result.replaceChildren(formula, explanation, scroll);
      result.dataset.selection = [model.kind, a, k].join(':');
      root.querySelector('[data-rational-status]').textContent = 'Actualizado: ' + (model.limit === null ? 'asíntota vertical' : 'hueco') + ' en x=' + a + '. El punto sigue excluido del dominio.';
    });
  };
  root.addEventListener('change', update); update();
}

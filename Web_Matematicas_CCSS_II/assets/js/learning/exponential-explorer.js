import { exponentialModel } from '../../../content/models/exponentials.js';
import { updateMath } from '../core/math.js';

export function initializeExponentialExplorer() {
  const root = document.querySelector('[data-exponential-explorer]');
  if (!root) return;
  const result = root.querySelector('[data-exponential-result]');
  const format = value => value.toLocaleString('es-ES', { maximumFractionDigits: 4 });
  const texLimit = value => Number.isFinite(value) ? String(value) : value > 0 ? '+\\infty' : '-\\infty';
  const update = () => {
    const a = Number(root.querySelector('[data-exp-base]').value);
    const c = Number(root.querySelector('[data-exp-coefficient]').value);
    const k = Number(root.querySelector('[data-exp-shift]').value);
    const model = exponentialModel(a, c, k);
    updateMath(result, () => {
      const formula = document.createElement('p');
      formula.textContent = '\\[f(x)=' + c + '\\cdot ' + (a === 0.5 ? '\\left(\\frac12\\right)' : '2') + '^x' + (k < 0 ? k : k > 0 ? '+' + k : '') + '.\\]';
      const description = document.createElement('p');
      description.className = 'key-idea';
      description.textContent = 'Dominio: todos los reales. ' + (model.increasing ? 'Crece' : 'Decrece') + ' estrictamente, sin extremos. Corte con Y: (0, ' + model.atZero + '). Recorrido: \\(' + (c > 0 ? '(' + k + ',+\\infty)' : '(-\\infty,' + k + ')') + '\\). La asíntota horizontal y=' + k + ' no se alcanza.';
      const limits = document.createElement('p');
      limits.textContent = '\\[\\lim_{x\\to-\\infty}f(x)=' + texLimit(model.left) + ',\\qquad\\lim_{x\\to+\\infty}f(x)=' + texLimit(model.right) + '.\\]';
      // Crear la figura dentro de la misma operación mantiene sincronizados curva, tabla y LaTeX.
      const figure = document.createElement('figure'); figure.className = 'exponential-figure';
      const svg = document.createElementNS('http://www.w3.org/2000/svg', 'svg');
      svg.setAttribute('viewBox', '0 0 560 360'); svg.setAttribute('width', '560'); svg.setAttribute('height', '360');
      svg.setAttribute('role', 'img'); svg.setAttribute('aria-labelledby', 'exp-graph-title exp-graph-desc');
      const node = (tag, attrs, text) => {
        const el = document.createElementNS(svg.namespaceURI, tag);
        for (const [key, value] of Object.entries(attrs)) el.setAttribute(key, String(value));
        if (text !== undefined) el.textContent = text;
        return el;
      };
      svg.append(node('title', { id: 'exp-graph-title' }, 'Gráfica de la exponencial seleccionada'));
      svg.append(node('desc', { id: 'exp-graph-desc' }, 'Curva ' + (model.increasing ? 'creciente' : 'decreciente') + ', siempre ' + (c > 0 ? 'por encima' : 'por debajo') + ' de y=' + k + '. Pasa por (0, ' + model.atZero + '). La tabla ofrece valores numéricos.'));
      const px = x => 280 + 55 * x, py = y => 180 - 18 * y;
      const defs = node('defs', {}), clip = node('clipPath', { id: 'exp-graph-clip' });
      clip.append(node('rect', { x: 40, y: 18, width: 480, height: 306 })); defs.append(clip); svg.append(defs);
      svg.append(node('path', { d: 'M40 180H520M280 18V324', stroke: '#202020', fill: 'none' }));
      svg.append(node('path', { d: 'M40 ' + py(k) + 'H520', stroke: '#754000', 'stroke-dasharray': '7 5', 'stroke-width': 2, fill: 'none' }));
      for (const x of [-4, -2, 2, 4]) {
        svg.append(node('path', { d: 'M' + px(x) + ' 176v8', stroke: '#202020' }));
        svg.append(node('text', { x: px(x) - 9, y: 202, fill: '#202020', 'font-size': 14 }, x));
      }
      for (const y of [-6, -2, 2, 6]) {
        svg.append(node('path', { d: 'M276 ' + py(y) + 'h8', stroke: '#202020' }));
        svg.append(node('text', { x: 289, y: py(y) + 5, fill: '#202020', 'font-size': 14 }, y));
      }
      const points = Array.from({ length: 401 }, (_, i) => {
        const x = -4 + i / 50;
        return (i ? 'L' : 'M') + px(x).toFixed(3) + ' ' + py(model.value(x)).toFixed(3);
      });
      const group = node('g', { 'clip-path': 'url(#exp-graph-clip)' });
      group.append(node('path', { 'data-exp-curve': '', d: points.join(' '), fill: 'none', stroke: '#1746a2', 'stroke-width': 3 }));
      group.append(node('circle', { cx: px(0), cy: py(model.atZero), r: 4, fill: '#1746a2' })); svg.append(group);
      svg.append(node('text', { x: 535, y: 174, fill: '#202020', 'font-size': 16 }, 'x'));
      svg.append(node('text', { x: 289, y: 16, fill: '#202020', 'font-size': 16 }, 'y'));
      const caption = document.createElement('figcaption'); caption.dataset.contentRole = 'caption';
      caption.textContent = 'Línea discontinua: y=' + k + '. Punto: corte con Y. Ventana x de −4 a 4; las ramas continúan fuera del marco. Escala horizontal: 55 unidades de dibujo por unidad de x; vertical: 18 por unidad de y.';
      figure.append(svg, caption);
      const scroll = document.createElement('div'); scroll.className = 'table-scroll';
      const table = document.createElement('table'), tableCaption = document.createElement('caption');
      tableCaption.textContent = 'Valores de la función seleccionada (hasta cuatro decimales)'; table.append(tableCaption);
      const head = table.createTHead().insertRow();
      for (const text of ['x', 'f(x)']) { const th = document.createElement('th'); th.scope = 'col'; th.textContent = text; head.append(th); }
      const body = table.createTBody();
      for (const x of [-2, -1, 0, 1, 2]) { const row = body.insertRow(); row.insertCell().textContent = x; row.insertCell().textContent = format(model.value(x)); }
      scroll.append(table);
      result.replaceChildren(formula, description, limits, figure, scroll); result.dataset.selection = [a, c, k].join(':');
      root.querySelector('[data-exponential-status]').textContent = 'Actualizado: base ' + format(a) + ', coeficiente ' + c + ', desplazamiento ' + k + '. Función ' + (model.increasing ? 'creciente' : 'decreciente') + '.';
    });
  };
  root.addEventListener('change', update); update();
}

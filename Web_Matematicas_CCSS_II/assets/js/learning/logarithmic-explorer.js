import { logarithmicModel } from '../../../content/models/logarithms.js';
import { updateMath } from '../core/math.js';

export function initializeLogarithmicExplorer() {
  const root = document.querySelector('[data-logarithmic-explorer]');
  if (!root) return;
  const result = root.querySelector('[data-logarithmic-result]');
  const format = v => v.toLocaleString('es-ES', { maximumFractionDigits: 4 });
  const update = () => {
    const a = Number(root.querySelector('[data-log-base]').value);
    const c = Number(root.querySelector('[data-log-coefficient]').value);
    const h = Number(root.querySelector('[data-log-horizontal]').value);
    const k = Number(root.querySelector('[data-log-vertical]').value);
    const model = logarithmicModel(a, c, h, k);
    updateMath(result, () => {
      const formula = document.createElement('p');
      const argument = 'x' + (h > 0 ? '-' + h : h < 0 ? '+' + -h : '');
      formula.textContent = '\\[f(x)=' + (c < 0 ? '-' : '') + '\\log_{' + (a === 0.5 ? '1/2' : '2') + '}(' + argument + ')' + (k ? '-1' : '') + ',\\quad x>' + h + '.\\]';
      const description = document.createElement('p'); description.className = 'key-idea';
      description.textContent = 'Dominio: \\((' + h + ',+\\infty)\\). Recorrido: todos los reales. ' + (model.increasing ? 'Crece' : 'Decrece') + ' estrictamente y no tiene extremos. Asíntota vertical x=' + h + ', con aproximación solo por la derecha. Corte con X: (' + format(model.zero) + ', 0). ' + (h < 0 ? 'Corte con Y: (0, ' + format(model.value(0)) + ').' : 'No corta Y: 0 no pertenece al dominio.');
      const limits = document.createElement('p');
      limits.textContent = '\\[\\lim_{x\\to ' + h + '^+}f(x)=' + (model.increasing ? '-' : '+') + '\\infty,\\qquad\\lim_{x\\to+\\infty}f(x)=' + (model.increasing ? '+' : '-') + '\\infty.\\]';
      const figure = document.createElement('figure'); figure.className = 'logarithmic-figure';
      const svg = document.createElementNS('http://www.w3.org/2000/svg', 'svg');
      const node = (name, attrs, text) => {
        const el = document.createElementNS(svg.namespaceURI, name);
        for (const [key, value] of Object.entries(attrs)) el.setAttribute(key, String(value));
        if (text !== undefined) el.textContent = text;
        return el;
      };
      for (const [key, value] of Object.entries({ viewBox: '0 0 560 360', width: 560, height: 360, role: 'img', 'aria-labelledby': 'log-title log-desc' })) svg.setAttribute(key, value);
      svg.append(node('title', { id: 'log-title' }, 'Gráfica del logaritmo seleccionado'));
      svg.append(node('desc', { id: 'log-desc' }, 'La curva solo existe a la derecha de x=' + h + '. Es ' + (model.increasing ? 'creciente' : 'decreciente') + ', pasa por (' + (h + 1) + ', ' + k + ') y corta X en ' + format(model.zero) + '. Los límites se indican en el texto y la tabla ofrece puntos de apoyo.'));
      const px = x => 130 + 50 * x, py = y => 180 - 24 * y;
      const defs = node('defs', {}), clip = node('clipPath', { id: 'log-clip' });
      clip.append(node('rect', { x: 30, y: 25, width: 500, height: 300 })); defs.append(clip); svg.append(defs);
      svg.append(node('path', { d: 'M30 180H530M130 25V325', fill: 'none', stroke: '#202020' }));
      svg.append(node('path', { d: 'M' + px(h) + ' 25V325', fill: 'none', stroke: '#754000', 'stroke-dasharray': '7 5', 'stroke-width': 2 }));
      for (const x of [-2, 2, 4, 6, 8]) {
        svg.append(node('path', { d: 'M' + px(x) + ' 176v8', stroke: '#202020' }));
        svg.append(node('text', { x: px(x) - 6, y: 201, fill: '#202020', 'font-size': 14 }, x));
      }
      for (const y of [-4, -2, 2, 4]) {
        svg.append(node('path', { d: 'M126 ' + py(y) + 'h8', stroke: '#202020' }));
        svg.append(node('text', { x: 138, y: py(y) + 5, fill: '#202020', 'font-size': 14 }, y));
      }
      // Muestreo geométrico cerca de la frontera para no unir la curva con puntos fuera del dominio.
      const maxPower = Math.log2(8 - h);
      const points = Array.from({ length: 401 }, (_, i) => {
        const x = h + 2 ** (-12 + (maxPower + 12) * i / 400);
        return (i ? 'L' : 'M') + px(x).toFixed(3) + ' ' + py(model.value(x)).toFixed(3);
      });
      const group = node('g', { 'clip-path': 'url(#log-clip)' });
      group.append(node('path', { 'data-log-curve': '', d: points.join(' '), stroke: '#1746a2', 'stroke-width': 3, fill: 'none' }));
      group.append(node('circle', { cx: px(h + 1), cy: py(k), r: 4, fill: '#1746a2' })); svg.append(group);
      svg.append(node('text', { x: 539, y: 173, fill: '#202020', 'font-size': 16 }, 'x'));
      svg.append(node('text', { x: 139, y: 18, fill: '#202020', 'font-size': 16 }, 'y'));
      const caption = document.createElement('figcaption'); caption.dataset.contentRole = 'caption';
      caption.textContent = 'Discontinua: x=' + h + '. Punto marcado: (' + (h + 1) + ', ' + k + '), donde el argumento es 1. La curva continúa fuera del marco. Escala horizontal: 50 unidades de dibujo por unidad de x; vertical: 24 por unidad de y.';
      figure.append(svg, caption);
      const scroll = document.createElement('div'); scroll.className = 'table-scroll';
      const table = document.createElement('table'), captionTable = document.createElement('caption');
      captionTable.textContent = 'Puntos del dominio: el argumento x−h siempre es positivo'; table.append(captionTable);
      const head = table.createTHead().insertRow();
      for (const label of ['x−h', 'x', 'f(x)']) { const th = document.createElement('th'); th.scope = 'col'; th.textContent = label; head.append(th); }
      const body = table.createTBody();
      for (const u of [0.25, 0.5, 1, 2, 4]) {
        const row = body.insertRow();
        for (const value of [u, h + u, model.value(h + u)]) row.insertCell().textContent = format(value);
      }
      scroll.append(table); result.replaceChildren(formula, description, limits, figure, scroll);
      result.dataset.selection = [a, c, h, k].join(':');
      root.querySelector('[data-logarithmic-status]').textContent = 'Actualizado: base ' + format(a) + ', coeficiente ' + c + ', desplazamientos ' + h + ' y ' + k + '. Función ' + (model.increasing ? 'creciente' : 'decreciente') + '; dominio x>' + h + '.';
    });
  };
  root.addEventListener('change', update); update();
}

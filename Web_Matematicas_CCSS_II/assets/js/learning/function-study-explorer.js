import { cubicStudy } from '../../../content/models/function-study.js';

export function initializeFunctionStudyExplorer() {
  const root = document.querySelector('[data-function-study]');
  if (!root) return;
  const svg = root.querySelector('svg');
  const ns = 'http://www.w3.org/2000/svg';
  const px = x => 280 + 90 * x, py = y => 180 - 30 * y;
  function element(tag, attrs, parent, text) {
    const node = document.createElementNS(ns, tag);
    for (const [name, value] of Object.entries(attrs)) node.setAttribute(name, value);
    if (text) node.textContent = text;
    parent.append(node); return node;
  }
  const axes = svg.querySelector('[data-axes]');
  for (let x = -2; x <= 2; x++) {
    element('path', { d: 'M' + px(x) + ' 25V335', stroke: '#d6d6d6' }, axes);
    element('text', { x: px(x), y: 198, 'text-anchor': 'middle' }, axes, String(x));
  }
  for (let y = -4; y <= 4; y += 2) {
    element('path', { d: 'M35 ' + py(y) + 'H530', stroke: '#d6d6d6' }, axes);
    if (y) element('text', { x: 269, y: py(y) + 5, 'text-anchor': 'end' }, axes, String(y));
  }
  element('path', { d: 'M35 180H530M280 25V335', stroke: '#202020' }, axes);
  const points = [];
  for (let i = 0; i <= 480; i++) {
    const x = -2.3 + 4.6 * i / 480;
    points.push((i ? 'L' : 'M') + px(x).toFixed(3) + ' ' + py(cubicStudy.value(x)).toFixed(3));
  }
  svg.querySelector('[data-curve]').setAttribute('d', points.join(' '));
  for (const x of cubicStudy.roots) element('circle', { cx: px(x), cy: py(0), r: 5, fill: '#1746a2' }, svg.querySelector('[data-roots]'));
  for (const point of cubicStudy.extrema) {
    const group = svg.querySelector('[data-extrema]');
    element('rect', { x: px(point.x) - 5, y: py(point.y) - 5, width: 10, height: 10, fill: '#754000' }, group);
    element('text', { x: px(point.x), y: py(point.y) + (point.y > 0 ? -14 : 25), 'text-anchor': 'middle' }, group, '(' + point.x + ', ' + point.y + ')');
  }
  const names = { roots: 'cortes con los ejes', extrema: 'máximo y mínimo relativos', curve: 'curva completa' };
  function update() {
    const visible = [];
    for (const control of root.querySelectorAll('[data-layer]')) {
      svg.querySelector('[data-' + control.dataset.layer + ']').style.display = control.checked ? '' : 'none';
      if (control.checked) visible.push(names[control.dataset.layer]);
    }
    root.querySelector('[data-layer-status]').textContent = 'Capas visibles: ' + (visible.length ? visible.join(', ') : 'solo ejes y rejilla') + '. La tabla y la descripción siguen disponibles.';
  }
  root.addEventListener('change', update); update();
}

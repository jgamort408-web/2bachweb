// Exploradores del tema 6: semiplano (6.1), región factible (6.2) y función objetivo (6.4).
// Todo el cálculo está en content/models/linear-programming.js; aquí solo hay controles y dibujo.
import {
  halfPlanePresets, regionPresets, objectivePresets, evaluate, testPoint, boundaryPoints, boundaryKind, isStrict,
  inequalityTex, boundaryTex, expressionTex, pointTex, pointText, clipPolygon, windowPolygon, clipBoundary,
  analyzeRegion, optimize, parseInteger, OPERATOR_TEXT,
} from '../../../content/models/linear-programming.js';
import { parseCoordinate } from '../../../content/models/system-solutions.js';
import { fraction, fractionTex } from '../../../content/models/matrix-inverse.js';
import { updateMath } from '../core/math.js';

const tex = String.raw;
const SVG = 'http://www.w3.org/2000/svg';
const num = f => f.numerator / f.denominator;
const el = (tag, text, attrs = {}) => {
  const node = document.createElement(tag);
  if (text !== undefined && text !== null) node.textContent = text;
  for (const [k, v] of Object.entries(attrs)) node.setAttribute(k, v);
  return node;
};
const svgEl = (tag, attrs = {}) => { const node = document.createElementNS(SVG, tag); for (const [k, v] of Object.entries(attrs)) node.setAttribute(k, v); return node; };
let uid = 0;
/** a·x₀ + b·y₀ escrito con los valores sustituidos: 30·0+50·9, −2·1, 0+2·(−1)… */
function substitutionTex(a, b, [x, y]) {
  const part = (k, v) => {
    if (k === 0) return null;
    const value = v.numerator < 0 ? `(${fractionTex(v)})` : fractionTex(v);
    return (k === 1 ? '' : k === -1 ? '-' : k + tex`\cdot `) + value;
  };
  return [part(a, x), part(b, y)].filter(Boolean).join('+').replace(/\+-/g, '-') || '0';
}

/** Lienzo con ejes, rejilla y escala uniforme. */
function canvas(view, titleText, descText) {
  const size = 440, pad = 36, span = Math.max(view.xMax - view.xMin, view.yMax - view.yMin), k = (size - 2 * pad) / span;
  const px = x => pad + (x - view.xMin) * k, py = y => size - pad - (y - view.yMin) * k;
  const id = 'lp-figure-' + (++uid);
  const svg = svgEl('svg', { viewBox: `0 0 ${size} ${size}`, role: 'img', 'aria-labelledby': id + '-t ' + id + '-d' });
  const title = svgEl('title', { id: id + '-t' }), desc = svgEl('desc', { id: id + '-d' });
  title.textContent = titleText; desc.textContent = descText;
  // La región va en la primera capa: rejilla, ejes y etiquetas quedan visibles encima.
  const regionLayer = svgEl('g', { class: 'lp-region-layer' }); svg.append(title, desc, regionLayer);
  const step = [1, 2, 5, 10, 20].find(s => span / s <= 10) ?? 20;
  for (let t = Math.ceil(view.xMin / step) * step; t <= view.xMax; t += step) {
    svg.append(svgEl('path', { d: `M${px(t)} ${py(view.yMin)}V${py(view.yMax)}`, class: t === 0 ? 'lp-axis' : 'lp-grid' }));
    if (t !== 0) { const label = svgEl('text', { x: px(t), y: py(0) + 16, 'text-anchor': 'middle', class: 'lp-tick' }); label.textContent = String(t).replace('-', '−'); svg.append(label); }
  }
  for (let t = Math.ceil(view.yMin / step) * step; t <= view.yMax; t += step) {
    svg.append(svgEl('path', { d: `M${px(view.xMin)} ${py(t)}H${px(view.xMax)}`, class: t === 0 ? 'lp-axis' : 'lp-grid' }));
    if (t !== 0) { const label = svgEl('text', { x: px(0) - 6, y: py(t) + 5, 'text-anchor': 'end', class: 'lp-tick' }); label.textContent = String(t).replace('-', '−'); svg.append(label); }
  }
  const xl = svgEl('text', { x: px(view.xMax) - 4, y: py(0) - 8, 'text-anchor': 'end', class: 'lp-name' }); xl.textContent = 'x';
  const yl = svgEl('text', { x: px(0) + 8, y: py(view.yMax) + 14, class: 'lp-name' }); yl.textContent = 'y';
  svg.append(xl, yl);
  const region = (poly, attrs = {}) => { if (poly.length >= 3) regionLayer.append(svgEl('path', { d: 'M' + poly.map(([x, y]) => px(x) + ' ' + py(y)).join('L') + 'Z', class: 'lp-region', ...attrs })); };
  const line = (ineq, attrs = {}) => {
    const seg = clipBoundary(ineq, view); if (seg.length !== 2) return null;
    const path = svgEl('path', { d: `M${px(seg[0][0])} ${py(seg[0][1])}L${px(seg[1][0])} ${py(seg[1][1])}`, class: 'lp-boundary', ...attrs });
    svg.append(path); return path;
  };
  const inside = ([x, y]) => x >= view.xMin && x <= view.xMax && y >= view.yMin && y <= view.yMax;
  const dot = ([x, y], attrs = {}, label) => {
    if (!inside([x, y])) return;
    svg.append(svgEl('circle', { cx: px(x), cy: py(y), r: 6, ...attrs }));
    if (label) { const t = svgEl('text', { x: px(x) + 9, y: py(y) - 9, class: 'lp-label' }); t.textContent = label; svg.append(t); }
  };
  return { svg, px, py, region, line, dot, inside };
}

function pointFields(container, onChange, name) {
  const fieldset = el('fieldset'); fieldset.append(el('legend', 'Comprueba un punto'));
  const inputs = ['x', 'y'].map(axis => {
    const label = el('label', axis + ' = '), input = el('input', null, { type: 'text', inputmode: 'decimal', 'aria-label': 'Coordenada ' + axis + ' del punto' });
    input.dataset[name] = axis; input.value = '0'; label.append(input); fieldset.append(label);
    input.addEventListener('change', onChange); return input;
  });
  container.append(fieldset);
  return inputs;
}
const readPoint = (inputs, previous) => inputs.map((input, i) => {
  const value = parseCoordinate(input.value);
  if (!value) { input.setAttribute('aria-invalid', 'true'); return previous[i]; }
  input.removeAttribute('aria-invalid'); return value;
});

/* 6.1 · Semiplano de una inecuación */
export function initializeHalfPlaneExplorer() {
  const root = document.querySelector('[data-half-plane-explorer]'); if (!root) return;
  const view = { xMin: -6, xMax: 12, yMin: -6, yMax: 12 };
  let ineq = { ...halfPlanePresets.source.ineq }, point = [fraction(0), fraction(0)];
  const controls = el('div'); controls.className = 'actions';
  const presetLabel = el('label', 'Caso '), preset = el('select'); preset.dataset.halfPlanePreset = '';
  for (const [id, p] of Object.entries(halfPlanePresets)) { const o = el('option', p.label); o.value = id; preset.append(o); }
  const custom = el('option', 'Inecuación propia'); custom.value = 'custom'; custom.disabled = true; preset.append(custom);
  presetLabel.append(preset); controls.append(presetLabel);
  const coefficients = el('fieldset'); coefficients.dataset.halfPlaneCoefficients = '';
  coefficients.append(el('legend', 'Inecuación a·x + b·y ? c (enteros entre −99 y 99)'));
  const field = (name, text) => { const label = el('label', text + ' '), input = el('input', null, { type: 'text', inputmode: 'numeric', size: '3' }); input.dataset.coefficient = name; label.append(input); coefficients.append(label); return input; };
  const fa = field('a', 'a ='), fb = field('b', 'b =');
  const opLabel = el('label', 'signo '), op = el('select'); op.dataset.operator = '';
  for (const [value, text] of Object.entries(OPERATOR_TEXT)) { const o = el('option', text); o.value = value; op.append(o); }
  opLabel.append(op); coefficients.append(opLabel);
  const fc = field('c', 'c =');
  const status = el('p', null, { role: 'status' }); status.dataset.halfPlaneStatus = '';
  const pointBox = el('div');
  const inputs = pointFields(pointBox, () => { point = readPoint(inputs, point); render(); }, 'halfPlanePoint');
  const figure = el('figure'); figure.dataset.lpFigure = '';
  const output = el('div', null, { 'aria-live': 'polite' }); output.dataset.halfPlaneOutput = '';
  root.replaceChildren(controls, el('p', 'Elige un caso o escribe tu propia inecuación. La región sombreada es la solución; el trazo continuo indica que la frontera está incluida y el discontinuo, que no lo está. El dibujo muestra solo una ventana: el semiplano continúa fuera de ella.'), coefficients, status, pointBox, figure, output);

  const sync = () => { fa.value = ineq.a; fb.value = ineq.b; fc.value = ineq.c; op.value = ineq.op; };
  const readCoefficients = () => {
    const [a, b, c] = [fa, fb, fc].map(f => parseInteger(f.value));
    [fa, fb, fc].forEach((f, i) => (([a, b, c][i] === null) ? f.setAttribute('aria-invalid', 'true') : f.removeAttribute('aria-invalid')));
    if ([a, b, c].includes(null)) { status.textContent = 'Escribe enteros entre −99 y 99. Se conserva la última inecuación válida.'; return; }
    if (a === 0 && b === 0) { status.textContent = 'a y b no pueden ser ambos 0: no habría recta frontera. Se conserva la última inecuación válida.'; fa.setAttribute('aria-invalid', 'true'); fb.setAttribute('aria-invalid', 'true'); return; }
    ineq = { a, b, c, op: op.value }; preset.value = 'custom'; status.textContent = 'Inecuación actualizada.'; render();
  };
  [fa, fb, fc].forEach(f => f.addEventListener('change', readCoefficients)); op.addEventListener('change', readCoefficients);
  preset.addEventListener('change', () => { ineq = { ...halfPlanePresets[preset.value].ineq }; status.textContent = ''; sync(); render(); });

  function render() {
    const current = { ...ineq }, p = point, probe = testPoint(current), probeResult = evaluate(current, probe), mine = evaluate(current, p);
    const strict = isStrict(current), kind = boundaryKind(current), [b1, b2] = boundaryPoints(current);
    const holdsTex = r => (r.holds ? 'verdadero' : 'falso');
    const c = canvas(view, 'Semiplano ' + current.a + 'x + ' + current.b + 'y ' + OPERATOR_TEXT[current.op] + ' ' + current.c,
      `Frontera ${kind === 'vertical' ? 'vertical' : kind === 'horizontal' ? 'horizontal' : 'oblicua'} ${strict ? 'discontinua, excluida' : 'continua, incluida'}. ` +
      `Punto de prueba ${pointText(probe)}: ${probeResult.holds ? 'cumple, se sombrea su lado' : 'no cumple, se sombrea el lado contrario'}. ` +
      `Punto comprobado ${pointText(p)}: ${mine.onBoundary ? 'está en la frontera, ' : ''}${mine.holds ? 'es solución' : 'no es solución'}.`);
    c.region(clipPolygon(windowPolygon(view), current), { 'data-half-plane-region': '' });
    c.line(current, { 'data-half-plane-boundary': strict ? 'excluded' : 'included', ...(strict ? { 'stroke-dasharray': '10 7' } : {}) });
    c.dot(probe.map(num), { class: 'lp-probe', 'data-test-point': '' }, 'prueba');
    c.dot(p.map(num), { class: mine.holds ? 'lp-point lp-point--in' : 'lp-point lp-point--out', 'data-candidate-point': '' });
    figure.replaceChildren(c.svg, el('figcaption', 'Región sombreada: solución. Punto pequeño con la etiqueta «prueba»: punto de prueba. Círculo grande: el punto que compruebas (relleno si es solución, hueco si no).'));
    return updateMath(output, () => {
      Object.assign(output.dataset, { kind, boundary: strict ? 'excluded' : 'included', holds: String(probeResult.holds), point: String(mine.holds) });
      const list = el('ol');
      list.append(
        el('li', tex`Frontera: \(${boundaryTex(current)}\), recta ${kind === 'vertical' ? 'vertical' : kind === 'horizontal' ? 'horizontal' : 'oblicua'}${current.c === 0 ? ' que pasa por el origen' : ''}. Pasa por \(${pointTex(b1)}\) y \(${pointTex(b2)}\).`),
        el('li', strict ? 'Trazo discontinuo: la desigualdad es estricta y la frontera no pertenece a la solución.' : 'Trazo continuo: la desigualdad admite la igualdad y la frontera pertenece a la solución.'),
        el('li', tex`${current.c === 0 ? 'El origen está en la frontera y no sirve para decidir el lado. ' : ''}Punto de prueba \(${pointTex(probe)}\): \(${substitutionTex(current.a, current.b, probe)}=${fractionTex(probeResult.left)}\), y \(${fractionTex(probeResult.left)}${{ '<=': tex`\le`, '>=': tex`\ge`, '<': '<', '>': '>' }[current.op]}${current.c}\) es ${holdsTex(probeResult)}.`),
        el('li', probeResult.holds ? 'Se sombrea el semiplano que contiene el punto de prueba.' : 'Se sombrea el semiplano contrario al del punto de prueba.'),
      );
      const check = el('p', tex`Tu punto \(${pointTex(p)}\) da \(${fractionTex(mine.left)}\): ${mine.onBoundary ? (strict ? 'está en la frontera, que no se incluye; no es solución.' : 'está en la frontera, que se incluye; es solución.') : mine.holds ? 'cumple la inecuación; es solución.' : 'no la cumple; no es solución.'}`);
      check.dataset.halfPlaneCheck = mine.holds ? 'in' : 'out';
      output.replaceChildren(el('p', tex`\[${inequalityTex(current)}\]`), list, check);
    });
  }
  sync(); render();
}

/* 6.2 · Región factible de un sistema */
export function initializeRegionExplorer() {
  const root = document.querySelector('[data-region-explorer]'); if (!root) return;
  let key = 'source', active = regionPresets.source.ineqs.map(() => true), point = [fraction(0), fraction(0)];
  const controls = el('div'); controls.className = 'actions';
  const presetLabel = el('label', 'Sistema '), preset = el('select'); preset.dataset.regionPreset = '';
  for (const [id, p] of Object.entries(regionPresets)) { const o = el('option', p.label); o.value = id; preset.append(o); }
  presetLabel.append(preset); controls.append(presetLabel);
  const constraints = el('fieldset'); constraints.dataset.regionConstraints = '';
  const pointBox = el('div');
  const inputs = pointFields(pointBox, () => { point = readPoint(inputs, point); render(); }, 'regionPoint');
  const figure = el('figure'); figure.dataset.lpFigure = '';
  const output = el('div', null, { 'aria-live': 'polite' }); output.dataset.regionOutput = '';
  root.replaceChildren(controls, el('p', 'Activa o desactiva restricciones y observa cómo cambia la zona común. Los vértices son los cruces de fronteras que cumplen todas las restricciones activas.'), constraints, pointBox, figure, output);

  function buildConstraints() {
    constraints.replaceChildren(el('legend', 'Restricciones activas'));
    regionPresets[key].ineqs.forEach((ineq, i) => {
      const label = el('label'), box = el('input', null, { type: 'checkbox' });
      box.checked = active[i]; box.dataset.regionConstraint = String(i);
      box.addEventListener('change', () => { active[i] = box.checked; render(); });
      label.append(box, ' ', tex`\(${inequalityTex(ineq)}\)`); constraints.append(label);
    });
    return updateMath(constraints, () => {});
  }
  preset.addEventListener('change', () => { key = preset.value; active = regionPresets[key].ineqs.map(() => true); buildConstraints(); render(); });

  const kindText = { empty: 'Vacía: las restricciones activas no tienen ningún punto común.', point: 'Un único punto: la región se reduce a una solución.', segment: 'Un segmento cerrado: área cero, pero infinitas soluciones reales.', polygon: 'Polígono acotado: cabe dentro de un rectángulo finito.', unbounded: 'No acotada: se extiende indefinidamente en alguna dirección.' };
  function render() {
    const { view, ineqs } = regionPresets[key], used = ineqs.filter((_, i) => active[i]), r = analyzeRegion(used);
    const checks = used.map(i => evaluate(i, point)), inside = checks.every(c => c.holds);
    let poly = windowPolygon(view); for (const i of used) poly = clipPolygon(poly, i);
    const c = canvas(view, 'Región factible del sistema',
      `${kindText[r.kind]} ${r.vertices.length ? 'Vértices: ' + r.vertices.map(pointText).join(', ') + '.' : 'Sin vértices.'} Punto comprobado ${pointText(point)}: ${inside ? 'es factible' : 'no es factible'}.`);
    if (r.kind === 'polygon' || r.kind === 'unbounded') c.region(poly, { 'data-feasible-region': '' });
    used.forEach((ineq, i) => c.line(ineq, { 'data-region-boundary': String(i) }));
    if (r.kind === 'segment') { const [p, q] = r.vertices.map(v => v.map(num)); c.svg.append(svgEl('path', { d: `M${c.px(p[0])} ${c.py(p[1])}L${c.px(q[0])} ${c.py(q[1])}`, class: 'lp-segment', 'data-feasible-segment': '' })); }
    r.vertices.forEach((v, i) => c.dot(v.map(num), { class: 'lp-vertex', 'data-vertex': String.fromCharCode(65 + i) }, String.fromCharCode(65 + i)));
    c.dot(point.map(num), { class: inside ? 'lp-point lp-point--in' : 'lp-point lp-point--out', 'data-candidate-point': '' });
    figure.replaceChildren(c.svg, el('figcaption', 'Zona sombreada: región factible. Puntos con letra: vértices. Círculo: el punto que compruebas (relleno si es factible). Las regiones no acotadas continúan fuera de la ventana.'));
    return updateMath(output, () => {
      Object.assign(output.dataset, { kind: r.kind, vertices: String(r.vertices.length), point: String(inside) });
      output.replaceChildren(el('p', kindText[r.kind]));
      if (r.vertices.length) output.append(el('p', tex`Vértices: ${r.vertices.map((v, i) => String.fromCharCode(65 + i) + tex`=\(${pointTex(v)}\)`).join(', ')}.`));
      else if (r.kind !== 'empty') output.append(el('p', 'No hay vértices: todas las fronteras activas son paralelas y la región contiene rectas completas.'));
      const list = el('ul'); list.dataset.regionChecks = '';
      used.forEach((ineq, i) => list.append(el('li', tex`\(${inequalityTex(ineq)}\): en \(${pointTex(point)}\) vale \(${fractionTex(checks[i].left)}\); ${checks[i].holds ? 'se cumple' : 'no se cumple'}.`)));
      output.append(el('p', `El punto ${inside ? 'cumple todas las restricciones activas: es factible.' : 'incumple al menos una restricción: no es factible.'}`), list);
    });
  }
  buildConstraints(); render();
}

/* 6.4 · Función objetivo y vértices */
export function initializeObjectiveExplorer() {
  const root = document.querySelector('[data-objective-explorer]'); if (!root) return;
  let key = 'furniture', objective = [...objectivePresets.furniture.objective], sense = 'max';
  const controls = el('div'); controls.className = 'actions';
  const presetLabel = el('label', 'Problema '), preset = el('select'); preset.dataset.objectivePreset = '';
  for (const [id, p] of Object.entries(objectivePresets)) { const o = el('option', p.label); o.value = id; preset.append(o); }
  presetLabel.append(preset); controls.append(presetLabel);
  const senseLabel = el('label', 'Objetivo '), senseSelect = el('select'); senseSelect.dataset.objectiveSense = '';
  for (const [v, t] of [['max', 'Maximizar'], ['min', 'Minimizar']]) { const o = el('option', t); o.value = v; senseSelect.append(o); }
  senseLabel.append(senseSelect); controls.append(senseLabel);
  const coefficients = el('fieldset'); coefficients.append(el('legend', 'Función objetivo Z = p·x + q·y (enteros entre −99 y 99)'));
  const field = name => { const label = el('label', name + ' = '), input = el('input', null, { type: 'text', inputmode: 'numeric', size: '3' }); input.dataset.objectiveCoefficient = name; label.append(input); coefficients.append(label); return input; };
  const fp = field('p'), fq = field('q');
  const status = el('p', null, { role: 'status' });
  const constraints = el('div'); constraints.dataset.objectiveConstraints = '';
  const figure = el('figure'); figure.dataset.lpFigure = '';
  const output = el('div', null, { 'aria-live': 'polite' }); output.dataset.objectiveOutput = '';
  root.replaceChildren(controls, coefficients, status, constraints, figure, output);
  const sync = () => { fp.value = objective[0]; fq.value = objective[1]; senseSelect.value = sense; };
  const readObjective = () => {
    const values = [fp, fq].map(f => parseInteger(f.value));
    [fp, fq].forEach((f, i) => (values[i] === null ? f.setAttribute('aria-invalid', 'true') : f.removeAttribute('aria-invalid')));
    if (values.includes(null)) { status.textContent = 'Escribe enteros entre −99 y 99. Se conserva la última función válida.'; return; }
    objective = values; sense = senseSelect.value; status.textContent = 'Función objetivo actualizada.'; render();
  };
  [fp, fq].forEach(f => f.addEventListener('change', readObjective)); senseSelect.addEventListener('change', readObjective);
  preset.addEventListener('change', () => { key = preset.value; objective = [...objectivePresets[key].objective]; sense = objectivePresets[key].sense; status.textContent = ''; sync(); render(); });

  function render() {
    const problem = objectivePresets[key], { view, ineqs } = problem, r = optimize(ineqs, objective, sense);
    const zTex = 'Z=' + expressionTex(objective[0], objective[1]), word = sense === 'max' ? 'máximo' : 'mínimo';
    let poly = windowPolygon(view); for (const i of ineqs) poly = clipPolygon(poly, i);
    const verdict = {
      empty: 'La región factible es vacía: no hay ningún punto que evaluar, así que no existe ' + word + '.',
      unbounded: 'La región no está acotada en la dirección que mejora Z: el objetivo puede crecer sin límite y no hay ' + word + ' finito.',
      unique: `${word[0].toUpperCase() + word.slice(1)} único: se alcanza solo en un vértice.`,
      multiple: `${word[0].toUpperCase() + word.slice(1)} múltiple: el mismo valor se alcanza en ${r.ray ? 'toda una semirrecta' : 'todo el lado que une los vértices óptimos'}.`,
    }[r.kind];
    const c = canvas(view, 'Región factible y recta de nivel de la función objetivo',
      `${verdict} ${r.values.length ? 'Valores en los vértices: ' + r.values.map(v => pointText(v.point) + ' da ' + num(v.z)).join('; ') + '.' : ''}`);
    if (r.kind !== 'empty') c.region(poly, { 'data-feasible-region': '' });
    ineqs.forEach((ineq, i) => c.line(ineq, { 'data-objective-boundary': String(i) }));
    if (r.best && (objective[0] || objective[1])) {
      // Recta de nivel que pasa por el óptimo: p·x + q·y = valor óptimo (no necesariamente entero).
      const best = num(r.best), [p, q] = objective, seg = [];
      for (const x of [view.xMin, view.xMax]) if (q) seg.push([x, (best - p * x) / q]);
      for (const y of [view.yMin, view.yMax]) if (p) seg.push([(best - q * y) / p, y]);
      const ok = seg.filter(([x, y]) => x >= view.xMin - 1e-9 && x <= view.xMax + 1e-9 && y >= view.yMin - 1e-9 && y <= view.yMax + 1e-9).slice(0, 2);
      if (ok.length === 2) c.svg.append(svgEl('path', { d: `M${c.px(ok[0][0])} ${c.py(ok[0][1])}L${c.px(ok[1][0])} ${c.py(ok[1][1])}`, class: 'lp-level', 'data-level-line': '' }));
    }
    const optimal = new Set((r.optimal ?? []).map(pointText));
    r.values.forEach((v, i) => c.dot(v.point.map(num), { class: optimal.has(pointText(v.point)) ? 'lp-vertex lp-vertex--best' : 'lp-vertex', 'data-vertex': String.fromCharCode(65 + i) }, String.fromCharCode(65 + i)));
    figure.replaceChildren(c.svg, el('figcaption', 'Zona sombreada: región factible. Línea de puntos: recta de nivel que pasa por el valor óptimo, si existe. Vértices óptimos resaltados.'));
    updateMath(constraints, () => { constraints.replaceChildren(el('p', tex`Restricciones: \(${ineqs.map(inequalityTex).join(tex`,\ `)}\).`)); });
    return updateMath(output, () => {
      Object.assign(output.dataset, { kind: r.kind, best: r.best ? String(num(r.best)) : '', optimal: String(r.optimal?.length ?? 0) });
      output.replaceChildren(el('p', tex`\[\text{${sense === 'max' ? 'Maximizar' : 'Minimizar'}}\quad ${zTex}\]`));
      if (r.values.length) {
        const wrap = el('div', null, { class: 'table-scroll', tabindex: '0', role: 'region', 'aria-label': 'Valor de Z en cada vértice' });
        const table = el('table'), head = el('thead'), body = el('tbody'), tr = el('tr');
        table.append(el('caption', 'Evaluación de la función objetivo en los vértices'), head, body);
        ['Vértice', 'Cálculo', 'Z'].forEach(t => tr.append(el('th', t, { scope: 'col' }))); head.append(tr);
        r.values.forEach((v, i) => {
          const row = el('tr'), best = optimal.has(pointText(v.point)) && r.kind !== 'unbounded';
          const zText = v.z.denominator === 1 ? String(v.z.numerator).replace('-', '−') : tex`\(${fractionTex(v.z)}\)`;
          row.append(el('th', String.fromCharCode(65 + i) + ' ' + pointText(v.point), { scope: 'row' }), el('td', tex`\(${substitutionTex(objective[0], objective[1], v.point)}\)`), el('td', zText + (best ? ' · ' + word : '')));
          if (best) row.dataset.optimal = '';
          body.append(row);
        });
        wrap.append(table); output.append(wrap);
      }
      output.append(el('p', verdict));
      if (r.kind === 'unbounded') output.append(el('p', 'Comparar vértices no basta aquí: el mejor vértice no es óptimo porque hay puntos factibles con valores de Z cada vez mejores. Prueba a cambiar a ' + (sense === 'max' ? 'minimizar' : 'maximizar') + '.'));
      if (r.kind === 'multiple' && !r.ray) output.append(el('p', 'Los vértices empatados son óptimos y también todos los puntos del segmento que los une: la recta de nivel es paralela a ese lado.'));
      if (key === 'furniture' && r.kind === 'unique') output.append(el('p', `Interpretación: ${num(r.optimal[0][0])} sillas y ${num(r.optimal[0][1])} mesas, con Z = ${num(r.best)} €.`));
    });
  }
  sync(); render();
}

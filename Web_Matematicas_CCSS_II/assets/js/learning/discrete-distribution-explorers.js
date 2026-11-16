// Exploradores del tema 8: distribución discreta finita (8.1) y binomial (8.2).
// El cálculo exacto está en content/models/discrete-distributions.js.
import {
  discretePresets, discreteSummary, parseRational, decimal, rationalTex, rationalText, toNumber,
  binomialPresets, binomialEvent, binomialParameters, binomialMass, binomialCoefficient, EVENTS, EVENT_TEX,
} from '../../../content/models/discrete-distributions.js';
import { updateMath } from '../core/math.js';

const tex = String.raw;
const SVG = 'http://www.w3.org/2000/svg';
const el = (tag, text, attrs = {}) => { const n = document.createElement(tag); if (text !== undefined && text !== null) n.textContent = text; for (const [k, v] of Object.entries(attrs)) n.setAttribute(k, v); return n; };
const svgEl = (tag, attrs = {}) => { const n = document.createElementNS(SVG, tag); for (const [k, v] of Object.entries(attrs)) n.setAttribute(k, v); return n; };
const texNumber = r => rationalTex(r).replace(/^(-?)(\d+)\.(\d+)$/, '$1$2{,}$3');
/** «= 3,5» si el decimal es exacto con cuatro cifras; «≈ 2,9167» si se redondea. */
const approxTex = r => {
  const exact = 10000n % r.d === 0n, text = decimal(r, 4);
  return (exact ? '=' : String.raw`\approx`) + (exact ? text.replace(/0+$/, '').replace(/,$/, '') : text).replace('−', '-').replace(',', '{,}');
};
let uid = 0;

/** Diagrama de barras: valores en el eje horizontal, probabilidades en el vertical. */
function barChart(bars, { title, desc, highlight = () => false, labelEvery = 1 }) {
  const width = 480, height = 260, left = 46, right = 12, top = 14, bottom = 34;
  const max = Math.max(...bars.map(b => b.value), 1e-9), top1 = Math.min(1, Math.ceil(max * 10) / 10 || 0.1);
  const slot = (width - left - right) / bars.length, barWidth = Math.max(2, Math.min(42, slot * 0.7));
  const py = v => height - bottom - (v / top1) * (height - top - bottom);
  const id = 'dd-chart-' + (++uid);
  const svg = svgEl('svg', { viewBox: `0 0 ${width} ${height}`, role: 'img', 'aria-labelledby': id + '-t ' + id + '-d' });
  const t = svgEl('title', { id: id + '-t' }), d = svgEl('desc', { id: id + '-d' }); t.textContent = title; d.textContent = desc; svg.append(t, d);
  for (const v of [0, top1 / 2, top1]) {
    svg.append(svgEl('path', { d: `M${left} ${py(v)}H${width - right}`, class: v ? 'dd-grid' : 'dd-axis' }));
    const label = svgEl('text', { x: left - 6, y: py(v) + 4, 'text-anchor': 'end', class: 'dd-tick' }); label.textContent = String(+v.toFixed(2)).replace('.', ','); svg.append(label);
  }
  bars.forEach((b, i) => {
    const x = left + slot * i + (slot - barWidth) / 2, on = highlight(b);
    svg.append(svgEl('rect', { x, y: py(b.value), width: barWidth, height: Math.max(0, py(0) - py(b.value)), class: on ? 'dd-bar dd-bar--on' : 'dd-bar', 'data-bar': b.label, ...(on ? { 'data-included': '' } : {}) }));
    if (i % labelEvery === 0 || i === bars.length - 1) { const lab = svgEl('text', { x: x + barWidth / 2, y: height - bottom + 18, 'text-anchor': 'middle', class: 'dd-tick' }); lab.textContent = b.label; svg.append(lab); }
  });
  return svg;
}

/* 8.1 · Distribución discreta finita */
export function initializeDiscreteExplorer() {
  const root = document.querySelector('[data-discrete-explorer]'); if (!root) return;
  const ROWS = 6;
  const controls = el('div'); controls.className = 'actions';
  const presetLabel = el('label', 'Caso '), preset = el('select'); preset.dataset.discretePreset = '';
  for (const [id, p] of Object.entries(discretePresets)) { const o = el('option', p.label); o.value = id; preset.append(o); }
  const custom = el('option', 'Distribución propia'); custom.value = 'custom'; custom.disabled = true; preset.append(custom);
  presetLabel.append(preset); controls.append(presetLabel);
  const table = el('fieldset'); table.dataset.discreteRows = ''; table.append(el('legend', 'Valores de X y sus probabilidades (deja vacías las filas que no uses)'));
  const rows = Array.from({ length: ROWS }, (_, i) => {
    const row = el('div', null, { class: 'dd-row' });
    const lx = el('label', 'x = '), ix = el('input', null, { type: 'text', inputmode: 'decimal', 'aria-label': `Valor ${i + 1} de X` }); ix.dataset.discreteValue = String(i); lx.append(ix);
    const lp = el('label', 'P = '), ip = el('input', null, { type: 'text', inputmode: 'decimal', 'aria-label': `Probabilidad del valor ${i + 1}` }); ip.dataset.discreteProbability = String(i); lp.append(ip);
    row.append(lx, lp); table.append(row);
    for (const input of [ix, ip]) input.addEventListener('change', () => { preset.value = 'custom'; render(); });
    return [ix, ip];
  });
  const status = el('p', null, { role: 'status' }); status.dataset.discreteStatus = '';
  const figure = el('figure'); figure.dataset.ddFigure = '';
  const output = el('div', null, { 'aria-live': 'polite' }); output.dataset.discreteOutput = '';
  root.replaceChildren(controls, el('p', 'Escribe los valores que toma X y la probabilidad de cada uno, como entero, decimal o fracción (por ejemplo 2, 0,25 o 1/6). El explorador comprueba si forman una distribución y calcula sus parámetros con fracciones exactas.'), table, status, figure, output);

  const load = key => { discretePresets[key].pairs.forEach(([x, p], i) => { rows[i][0].value = x; rows[i][1].value = p; }); for (let i = discretePresets[key].pairs.length; i < ROWS; i++) { rows[i][0].value = ''; rows[i][1].value = ''; } };
  preset.addEventListener('change', () => { load(preset.value); render(); });

  function read() {
    const pairs = [], bad = [];
    rows.forEach(([ix, ip]) => {
      ix.removeAttribute('aria-invalid'); ip.removeAttribute('aria-invalid');
      if (!ix.value.trim() && !ip.value.trim()) return;
      const x = parseRational(ix.value), p = parseRational(ip.value);
      if (!x) { ix.setAttribute('aria-invalid', 'true'); bad.push(ix); }
      if (!p) { ip.setAttribute('aria-invalid', 'true'); bad.push(ip); }
      if (x && p) pairs.push({ x, p });
    });
    return { pairs, bad };
  }
  const problemText = {
    empty: 'No hay ningún valor escrito.',
    repeated: 'Hay valores repetidos: cada valor de X debe aparecer una sola vez, con la suma de sus probabilidades.',
    range: 'Alguna probabilidad es negativa o mayor que 1.',
    sum: 'Las probabilidades no suman 1.',
  };
  function render() {
    const { pairs, bad } = read();
    status.textContent = bad.length ? 'Hay casillas con un formato no válido: escribe enteros, decimales de hasta cuatro cifras o fracciones. Se ignoran esas filas.' : '';
    const s = discreteSummary(pairs);
    const bars = [...pairs].sort((a, b) => toNumber(a.x) - toNumber(b.x)).map(({ x, p }) => ({ label: rationalText(x).replace('.', ','), value: Math.max(0, toNumber(p)) }));
    figure.replaceChildren();
    if (bars.length) figure.append(barChart(bars, { title: 'Función de probabilidad de X', desc: bars.map(b => `P(X=${b.label}) = ${String(+b.value.toFixed(4)).replace('.', ',')}`).join('; ') + '.' }), el('figcaption', 'Cada barra es la probabilidad de un valor de X. La altura no es una densidad: aquí sí se suman alturas.'));
    return updateMath(output, () => {
      Object.assign(output.dataset, { valid: String(s.valid), problems: s.problems.join(' '), mean: s.valid ? rationalText(s.mean) : '', variance: s.valid ? rationalText(s.variance) : '' });
      output.replaceChildren(el('p', tex`Suma de probabilidades: \(${texNumber(s.total)}\). ${s.valid ? 'Todas están entre 0 y 1 y suman 1: es una distribución de probabilidad.' : 'No es una distribución de probabilidad.'}`));
      if (!s.valid) { const ul = el('ul'); s.problems.forEach(p => ul.append(el('li', problemText[p]))); output.append(ul); return; }
      const wrap = el('div', null, { class: 'table-scroll', tabindex: '0', role: 'region', 'aria-label': 'Cálculo de los parámetros' });
      const t = el('table'), head = el('thead'), body = el('tbody'), tr = el('tr');
      t.append(el('caption', 'Columnas para la media, la media de los cuadrados y la acumulada'), head, body);
      [tex`\(x_i\)`, tex`\(p_i\)`, tex`\(x_ip_i\)`, tex`\(x_i^2p_i\)`, tex`\(F(x_i)\)`].forEach(h => tr.append(el('th', h, { scope: 'col' }))); head.append(tr);
      for (const r of s.rows) { const row = el('tr'); row.append(el('th', tex`\(${texNumber(r.x)}\)`, { scope: 'row' }), ...[r.p, r.xp, r.x2p, r.F].map(v => el('td', tex`\(${texNumber(v)}\)`))); body.append(row); }
      wrap.append(t); output.append(wrap);
      output.append(
        el('p', tex`\(\mu=\sum x_ip_i=${texNumber(s.mean)}${s.mean.d === 1n ? '' : approxTex(s.mean)}\).`),
        el('p', tex`\(\sigma^2=\sum x_i^2p_i-\mu^2=${texNumber(s.squares)}-\left(${texNumber(s.mean)}\right)^2=${texNumber(s.variance)}${s.variance.d === 1n ? '' : approxTex(s.variance)}\).`),
        el('p', tex`\(\sigma=\sqrt{\sigma^2}\approx${s.deviation.toFixed(4).replace('.', '{,}')}\). Redondeamos solo al final.`));
    });
  }
  load('die'); render();
}

/* 8.2 · Distribución binomial */
export function initializeBinomialExplorer() {
  const root = document.querySelector('[data-binomial-explorer]'); if (!root) return;
  let state = { ...binomialPresets.basketball, b: 3 };
  const controls = el('div'); controls.className = 'actions';
  const presetLabel = el('label', 'Caso '), preset = el('select'); preset.dataset.binomialPreset = '';
  for (const [id, p] of Object.entries(binomialPresets)) { const o = el('option', p.label); o.value = id; preset.append(o); }
  const custom = el('option', 'Valores propios'); custom.value = 'custom'; custom.disabled = true; preset.append(custom);
  presetLabel.append(preset); controls.append(presetLabel);
  const fields = el('fieldset'); fields.append(el('legend', 'Modelo y suceso'));
  const field = (name, text, mode) => { const l = el('label', text + ' '), i = el('input', null, { type: 'text', inputmode: mode, size: '5' }); i.dataset.binomialField = name; l.append(i); fields.append(l); return i; };
  const fn = field('n', 'n =', 'numeric'), fp = field('p', 'p =', 'decimal');
  const kindLabel = el('label', 'Suceso '), kind = el('select'); kind.dataset.binomialEvent = '';
  for (const [id, e] of Object.entries(EVENTS)) { const o = el('option', e.label); o.value = id; kind.append(o); }
  kindLabel.append(kind); fields.append(kindLabel);
  const fk = field('k', 'k (o a) =', 'numeric'), fb = field('b', 'b =', 'numeric');
  const status = el('p', null, { role: 'status' }); status.dataset.binomialStatus = '';
  const figure = el('figure'); figure.dataset.ddFigure = '';
  const output = el('div', null, { 'aria-live': 'polite' }); output.dataset.binomialOutput = '';
  root.replaceChildren(controls, el('p', 'Elige n entre 1 y 100, p entre 0 y 1 (decimal o fracción) y el suceso. Las barras resaltadas son los valores de X que cumplen el suceso; su suma es la probabilidad.'), fields, status, figure, output);
  const sync = () => { fn.value = state.n; fp.value = state.p; kind.value = state.kind; fk.value = state.k; fb.value = state.b ?? state.k; fb.closest('label').hidden = state.kind !== 'between'; };
  preset.addEventListener('change', () => { state = { ...binomialPresets[preset.value] }; state.b ??= state.k; status.textContent = ''; sync(); render(); });
  const change = () => {
    const n = Number(fn.value), p = parseRational(fp.value), k = Number(fk.value), b = Number(fb.value);
    const okN = /^\d{1,3}$/.test(fn.value.trim()) && n >= 1 && n <= 100, okP = p && toNumber(p) >= 0 && toNumber(p) <= 1;
    const okK = /^-?\d{1,3}$/.test(fk.value.trim().replace('−', '-')), okB = kind.value !== 'between' || (/^-?\d{1,3}$/.test(fb.value.trim().replace('−', '-')) && b >= Number(fk.value));
    [[fn, okN], [fp, okP], [fk, okK], [fb, okB]].forEach(([f, ok]) => (ok ? f.removeAttribute('aria-invalid') : f.setAttribute('aria-invalid', 'true')));
    fb.closest('label').hidden = kind.value !== 'between';
    if (!(okN && okP && okK && okB)) { status.textContent = 'Revisa los datos: n entero de 1 a 100, p entre 0 y 1, umbrales enteros y, en un intervalo, a ≤ b. Se conserva el último caso válido.'; return; }
    state = { n, p: fp.value.trim(), kind: kind.value, k: Number(fk.value.replace('−', '-')), b: Number(fb.value.replace('−', '-')) };
    preset.value = 'custom'; status.textContent = 'Caso actualizado.'; render();
  };
  [fn, fp, fk, fb].forEach(f => f.addEventListener('change', change)); kind.addEventListener('change', change);

  function render() {
    const { n, kind: k, k: a } = state, b = state.kind === 'between' ? state.b : a, p = parseRational(state.p);
    const event = binomialEvent(n, p, k, a, b), params = binomialParameters(n, p), inside = new Set(event.included);
    const eventTex = k === 'between' ? EVENT_TEX.between(a, b) : EVENT_TEX[k](a);
    const cdfTex = k === 'between' ? EVENTS.between.cdf(a, b) : EVENTS[k].cdf(a);
    const bars = Array.from({ length: n + 1 }, (_, j) => ({ label: String(j), value: toNumber(binomialMass(n, p, j)) }));
    figure.replaceChildren(barChart(bars, {
      title: `Distribución B(${n}; ${state.p})`,
      desc: `Valores de 0 a ${n}. Cumplen el suceso: ${event.included.length ? event.included.join(', ') : 'ningún valor'}. Probabilidad ${decimal(event.probability, 5)}.`,
      highlight: bar => inside.has(Number(bar.label)), labelEvery: n > 30 ? 10 : n > 15 ? 5 : 1,
    }), el('figcaption', 'Barras resaltadas: valores incluidos en el suceso. Las demás quedan fuera.'));
    const pTex = rationalTex(p).replace(/^(\d+)$/, '$1');
    // p decimal exacto (0,8) o, si no lo es (1/3), en fracción: nunca se muestra un valor redondeado como si fuera p.
    const pDecimal = 10000n % p.d === 0n ? decimal(p, 4).replace(/0+$/, '').replace(/,$/, '').replace(',', '{,}') : pTex;
    return updateMath(output, () => {
      Object.assign(output.dataset, { probability: decimal(event.probability, 5), count: String(event.included.length), mean: rationalText(params.mean) });
      output.replaceChildren(el('p', tex`\[X\sim B(${n},\,${pDecimal}),\qquad q=1-p.\]`));
      const list = el('ol');
      list.append(el('li', tex`Suceso: \(${eventTex}\). Valores incluidos: ${event.included.length ? event.included.join(', ') : 'ninguno'}.`));
      list.append(el('li', tex`Con la acumulada \(F(k)=P(X\le k)\): \(P(${eventTex})=${cdfTex}\).`));
      if (k === 'eq' && a >= 0 && a <= n && toNumber(p) > 0 && toNumber(p) < 1) list.append(el('li', tex`Directamente: \(\binom{${n}}{${a}}p^{${a}}q^{${n - a}}=${binomialCoefficient(n, a)}\cdot\left(${pDecimal}\right)^{${a}}\cdot\left(1-${pDecimal}\right)^{${n - a}}\).`));
      list.append(el('li', tex`Resultado: \(P(${eventTex})\approx${decimal(event.probability, 5).replace(',', '{,}')}\).`));
      output.append(list, el('p', tex`Parámetros: \(\mu=np=${texNumber(params.mean)}\), \(\sigma^2=npq=${texNumber(params.variance)}\), \(\sigma\approx${params.deviation.toFixed(4).replace('.', '{,}')}\). La media es un promedio del modelo, no un número de éxitos garantizado.`));
      if (10000n % p.d !== 0n) output.append(el('p', tex`Con \(p=${pTex}\) se calcula con fracciones exactas y se redondea al final.`));
    });
  }
  sync(); render();
}

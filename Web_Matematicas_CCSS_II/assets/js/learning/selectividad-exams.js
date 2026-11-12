// Generador de exámenes con formato PAU (P10): huecos guiados, examen reproducible, hoja imprimible y descargas LaTeX.
// La lógica está en content/models/selectividad-exams.js; aquí solo hay interfaz y red.
import { projectUrl } from '../core/paths.js';
import { getContentContext } from '../content/runtime.js';
import { zipFiles, figuresIn } from '../../../content/models/selectividad-relations.js';
import {
  DEFAULT_EXAM_TITLE, composeExam, examExercises, examFiles, examTex, examToParams, formatPoints, instructions,
  originLine, paramsToExam, rescaleStatement, slotsFor
} from '../../../content/models/selectividad-exams.js';

const form = document.querySelector('[data-exam-form]');
const slotsBox = document.querySelector('[data-exam-slots]');
const warningsBox = document.querySelector('[data-exam-warnings]');
const output = document.querySelector('[data-exam-output]');
const sheet = document.querySelector('[data-exam-sheet]');
const randomSeed = () => String(10000 + Math.floor(Math.random() * 90000));
const el = (tag, className, text) => {
  const node = document.createElement(tag);
  if (className) node.className = className;
  if (text !== undefined) node.textContent = text;
  return node;
};
const fetchJson = async path => {
  const response = await fetch(projectUrl(path));
  if (!response.ok) throw new Error('HTTP ' + response.status);
  return response.json();
};
const fetchText = async path => {
  const response = await fetch(projectUrl(path));
  if (!response.ok) throw new Error('HTTP ' + response.status);
  return response.text();
};

let data, table, exercises = [], solutions = {}, state, exam;
const topicName = id => data.topics.find(topic => topic.topicId === id)?.name ?? id.toUpperCase();

/** Lee los controles generales del formulario y conserva las elecciones de cada hueco. */
function readGeneral() {
  return {
    ...state,
    seed: form.elements.semilla.value.trim() || randomSeed(),
    title: form.elements.titulo.value.trim() || DEFAULT_EXAM_TITLE,
    choice1: form.elements.op1.checked, choice2: form.elements.op2.checked,
    withTable: form.elements.tabla.checked, withSolutions: form.elements.soluciones.checked && Object.keys(solutions).length > 0
  };
}

function slotRow(slot, part) {
  const wanted = state.slots[slot.key] ?? {};
  const row = el('div', 'mc-exam-slot');
  row.dataset.slot = slot.key;
  const heading = el('p', 'mc-exam-slot__title', `Ejercicio ${slot.number}${slot.option ? ' · Opción ' + slot.option : ''} (${formatPoints(slot.points)})`);
  const controls = el('div', 'mc-exam-slot__controls');
  // Tema: el habitual del hueco o uno de los temas de sus saberes.
  const topicLabel = el('label', 'mc-field', 'Tema ');
  const topic = el('select');
  topic.name = 'tema-' + slot.key;
  const usual = el('option', null, 'Habitual: ' + slot.defaults.map(topicName).join(' o '));
  usual.value = '';
  topic.append(usual);
  for (const id of slot.block.topics) {
    const count = exercises.filter(item => item.topicId === id && !item.outside).length;
    const option = el('option', null, `${topicName(id)} (${count})`);
    option.value = id; option.disabled = !count;
    topic.append(option);
  }
  topic.value = wanted.topic ?? '';
  topicLabel.append(topic);
  // Contenido: etiquetas de los ejercicios de los temas elegidos.
  const topics = wanted.topic ? [wanted.topic] : slot.defaults;
  const counts = new Map();
  for (const item of exercises) if (topics.includes(item.topicId) && !item.outside) for (const tag of item.tags) counts.set(tag, (counts.get(tag) ?? 0) + 1);
  const tagLabel = el('label', 'mc-field', 'Contenido ');
  const tag = el('select');
  tag.name = 'contenido-' + slot.key;
  const any = el('option', null, 'Cualquiera');
  any.value = '';
  tag.append(any);
  for (const id of Object.keys(data.tags).filter(id => counts.has(id))) {
    const option = el('option', null, `${data.tags[id]} (${counts.get(id)})`);
    option.value = id;
    tag.append(option);
  }
  tag.value = wanted.tag && counts.has(wanted.tag) ? wanted.tag : '';
  tagLabel.append(tag);
  // Referencia concreta (la de cada tarjeta del banco).
  const refLabel = el('label', 'mc-field', 'Referencia ');
  const ref = el('input');
  ref.name = 'ref-' + slot.key; ref.type = 'text'; ref.autocomplete = 'off'; ref.spellcheck = false;
  ref.placeholder = 'SEL-D0001-OA-E01'; ref.value = wanted.id ?? '';
  refLabel.append(ref);
  const reroll = el('button', 'mc-btn', 'Otro ejercicio');
  reroll.type = 'button';
  reroll.addEventListener('click', () => {
    const next = { ...(state.slots[slot.key] ?? {}) };
    delete next.id;
    next.reroll = (next.reroll ?? 0) + 1;
    state.slots[slot.key] = next;
    generate();
    slotsBox.querySelector(`[data-slot="${slot.key}"] button`)?.focus();
  });
  controls.append(topicLabel, tagLabel, refLabel, reroll);
  const chosen = el('p', 'mc-exam-slot__chosen');
  chosen.textContent = part?.exercise ? `${part.exercise.title} · ${part.exercise.origin}` : 'Sin ejercicio con estos criterios.';
  row.append(heading, controls, chosen);
  const update = () => {
    const next = { ...(state.slots[slot.key] ?? {}) };
    next.topic = topic.value || undefined;
    next.tag = tag.value || undefined;
    next.id = ref.value.trim().toUpperCase() || undefined;
    for (const key of Object.keys(next)) if (next[key] === undefined) delete next[key];
    state.slots[slot.key] = next;
    generate();
  };
  topic.addEventListener('change', () => { tag.value = ''; update(); });
  tag.addEventListener('change', update);
  ref.addEventListener('change', update);
  return row;
}

function renderSlots() {
  const focused = document.activeElement?.closest?.('[data-slot]') ? document.activeElement : null;
  const focusName = focused?.name;
  slotsBox.replaceChildren(...exam.parts.map(part => slotRow(part, part)));
  if (focusName) slotsBox.querySelector(`[name="${focusName}"]`)?.focus();
}

function renderSheet() {
  const header = el('header');
  const title = el('h2', null, state.title);
  title.id = 'examen-titulo'; title.tabIndex = -1;
  header.append(title,
    el('p', 'mc-rel__meta', 'Matemáticas Aplicadas a las Ciencias Sociales II · Ejercicios de Selectividad de Andalucía (2008–2021) con la estructura de la prueba de 2025-2026 · Semilla ' + state.seed));
  const box = el('section', 'mc-exam-instructions');
  box.setAttribute('aria-label', 'Instrucciones');
  const list = el('ol');
  list.type = 'a';
  for (const text of instructions(state)) list.append(el('li', null, text));
  box.append(el('p', 'mc-exam-instructions__title', 'Instrucciones'), list);
  const parts = [header, box];
  for (const group of examExercises(exam.parts)) {
    const section = el('section', 'mc-exam-exercise');
    section.append(el('h3', null, `Ejercicio ${group.number} (${formatPoints(group.points)})`));
    if (group.choice) section.append(el('p', 'mc-exam-exercise__choice', 'Elija sólo una de las opciones:'));
    for (const part of group.options) {
      const block = el('div', 'mc-exam-option');
      if (part.option) block.append(el('h4', null, 'Opción ' + part.option));
      if (!part.exercise) { block.append(el('p', null, 'Sin ejercicio con estos criterios.')); section.append(block); continue; }
      const rescaled = rescaleStatement(part.exercise, part.points);
      const statement = el('div', 'mc-sel__statement');
      statement.innerHTML = rescaled.html; // HTML generado por build-selectividad.mjs a partir del banco.
      block.append(el('p', 'mc-rel__origin', originLine(part.exercise, rescaled.adapted)), statement);
      section.append(block);
    }
    parts.push(section);
  }
  if (state.withSolutions) {
    const section = el('section', 'mc-rel__solutions');
    section.append(el('h3', null, 'Soluciones'), el('p', 'mc-rel__meta', 'Las puntuaciones que cite una solución son las del examen original.'));
    for (const part of exam.parts.filter(item => item.exercise)) {
      const body = el('div', 'mc-sel__solution-body');
      const solution = solutions[part.exercise.id];
      if (solution) body.innerHTML = solution.html;
      else body.append(el('p', null, 'Solución no disponible todavía.'));
      section.append(el('h4', null, part.label), body);
    }
    parts.push(section);
  }
  if (state.withTable) {
    const section = el('section', 'mc-exam-table');
    const tableNode = el('table');
    tableNode.append(el('caption', null, 'Función de distribución de Z ∼ N(0, 1): P(Z ≤ z)'));
    const head = el('tr');
    head.append(el('th', null, 'z'), ...table.columnas.map(column => { const th = el('th', null, column); th.scope = 'col'; return th; }));
    const thead = el('thead'); thead.append(head);
    const tbody = el('tbody');
    for (const row of table.filas) {
      const tr = el('tr');
      const th = el('th', null, row.z); th.scope = 'row';
      tr.append(th, ...row.valores.map(value => el('td', null, value)));
      tbody.append(tr);
    }
    tableNode.append(thead, tbody);
    section.append(tableNode, el('p', 'mc-rel__meta', 'En el interior de la tabla se da la probabilidad de que la variable aleatoria Z esté por debajo del valor z. Tabla de las orientaciones de la prueba de 2025-2026.'));
    parts.push(section);
  }
  sheet.replaceChildren(...parts);
  output.hidden = false;
}

function generate() {
  state = readGeneral();
  form.elements.semilla.value = state.seed;
  // Las elecciones de huecos que ya no existen (por ejemplo, 1a sin opcionalidad) se descartan.
  const keys = new Set(slotsFor(state).map(slot => slot.key));
  for (const key of Object.keys(state.slots)) if (!keys.has(key)) delete state.slots[key];
  exam = composeExam(exercises, state);
  history.replaceState(null, '', '?' + examToParams(state).toString());
  renderSlots();
  warningsBox.replaceChildren();
  if (exam.warnings.length) {
    const list = el('ul');
    for (const text of exam.warnings) list.append(el('li', null, text));
    warningsBox.append(list);
  }
  renderSheet();
}

function download(name, content, type) {
  const url = URL.createObjectURL(new Blob([content], { type }));
  const link = document.createElement('a');
  link.href = url; link.download = name;
  document.body.append(link); link.click(); link.remove();
  setTimeout(() => URL.revokeObjectURL(url), 1000);
}

async function busy(button, action) {
  button.disabled = true;
  try { await action(); }
  catch { warningsBox.textContent = 'No se ha podido preparar la descarga. Comprueba la conexión y vuelve a intentarlo.'; }
  finally { button.disabled = false; }
}

const fileBase = () => `examen-pau-${state.seed.replace(/[^A-Za-z0-9_-]/g, '') || 'web'}`;
const texOptions = preamble => ({
  title: state.title, seedNote: 'Semilla ' + state.seed + ' · ' + location.href, parts: exam.parts, choice1: state.choice1,
  choice2: state.choice2, solutions, withSolutions: state.withSolutions, withTable: state.withTable, table, preamble
});

async function initialize() {
  const [context, json, official] = await Promise.all([getContentContext(), fetchJson('content/selectividad/ejercicios.json'),
    fetchJson('content/selectividad/tabla-normal.json')]);
  data = json; table = official;
  const refreshVisibility = async () => {
    // Solo temas del banco visibles; soluciones solo publicadas y nunca con la configuración de respaldo.
    const visibleTopics = new Set(data.topics.filter(topic => context.model.isVisible('page:' + topic.pageId)).map(topic => topic.topicId));
    exercises = data.exercises.filter(exercise => visibleTopics.has(exercise.topicId));
    const trusted = context.snapshot.origin !== 'fallback';
    const ids = trusted ? exercises.map(exercise => exercise.id).filter(id => context.model.isVisible('solution:' + id)) : [];
    solutions = {};
    if (ids.length) {
      const all = (await fetchJson('content/selectividad/soluciones.json')).solutions;
      for (const id of ids) if (all[id]) solutions[id] = all[id];
    }
    form.querySelector('[data-exam-solutions-field]').hidden = !Object.keys(solutions).length;
  };
  await refreshVisibility();
  state = paramsToExam(new URLSearchParams(location.search), { defaultSeed: randomSeed() });
  form.elements.semilla.value = state.seed;
  form.elements.titulo.value = state.title === DEFAULT_EXAM_TITLE ? '' : state.title;
  form.elements.titulo.placeholder = DEFAULT_EXAM_TITLE;
  form.elements.op1.checked = state.choice1;
  form.elements.op2.checked = state.choice2;
  form.elements.tabla.checked = state.withTable;
  form.elements.soluciones.checked = state.withSolutions;
  form.hidden = false;
  form.addEventListener('submit', event => { event.preventDefault(); generate(); sheet.querySelector('h2')?.focus(); });
  form.addEventListener('change', event => { if (!event.target.closest('[data-slot]')) generate(); });
  form.querySelector('[data-exam-reroll]').addEventListener('click', () => {
    form.elements.semilla.value = randomSeed();
    for (const slot of Object.values(state.slots)) { delete slot.reroll; delete slot.id; }
    generate();
  });
  document.querySelector('[data-exam-print]').addEventListener('click', () => window.print());
  const texButton = document.querySelector('[data-exam-tex]');
  texButton.addEventListener('click', () => busy(texButton, async () => {
    const preamble = await fetchText('content/selectividad/latex/tex/paquetes.tex');
    download(fileBase() + '.tex', examTex(texOptions(preamble)), 'application/x-tex;charset=utf-8');
  }));
  const zipButton = document.querySelector('[data-exam-zip]');
  zipButton.addEventListener('click', () => busy(zipButton, async () => {
    const preamble = await fetchText('content/selectividad/latex/tex/paquetes.tex');
    const figures = {};
    if (state.withSolutions) {
      for (const part of exam.parts.filter(item => item.exercise && solutions[item.exercise.id])) {
        for (const name of figuresIn(solutions[part.exercise.id].latex)) {
          const response = await fetch(projectUrl(`content/selectividad/latex/recursos/figuras/${name}.pdf`));
          if (!response.ok) throw new Error('HTTP ' + response.status);
          figures[name] = new Uint8Array(await response.arrayBuffer());
        }
      }
    }
    download(fileBase() + '.zip', zipFiles(examFiles(texOptions(preamble), figures)), 'application/zip');
  }));
  context.subscribe(async () => { await refreshVisibility(); generate(); });
  generate();
}

if (form) {
  initialize().catch(() => { warningsBox.textContent = 'No se han podido cargar los ejercicios. Vuelve a cargar la página.'; });
}

// Generador de relaciones de Selectividad (P09): criterios, selección reproducible, hoja imprimible y descargas LaTeX.
// La lógica está en content/models/selectividad-relations.js; aquí solo hay interfaz y red.
import { projectUrl } from '../core/paths.js';
import { getContentContext } from '../content/runtime.js';
import {
  DEFAULT_TITLE, MAX_EXERCISES, criteriaToParams, figuresIn, filterExercises, overleafFiles, paramsToCriteria,
  pickExercises, standaloneTex, zipFiles
} from '../../../content/models/selectividad-relations.js';

const form = document.querySelector('[data-rel-form]');
const status = document.querySelector('[data-rel-status]');
const output = document.querySelector('[data-rel-output]');
const sheet = document.querySelector('[data-rel-sheet]');
const tagList = document.querySelector('[data-rel-tags]');
const tagSearch = document.querySelector('[data-rel-tag-search]');
const fold = text => text.toLowerCase().normalize('NFD').replace(/\p{Diacritic}/gu, '');
const randomSeed = () => String(10000 + Math.floor(Math.random() * 90000));

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

let data, visibleExercises = [], solutions = {}, selection = [], current;
const checkedTags = new Set();

function readForm() {
  const values = new FormData(form);
  const count = Number.parseInt(values.get('n'), 10);
  return {
    topics: values.getAll('tema'), tags: [...checkedTags], tagMode: values.get('modo') === 'all' ? 'all' : 'any',
    count: Number.isFinite(count) ? Math.min(MAX_EXERCISES, Math.max(1, count)) : 6,
    seed: String(values.get('semilla') ?? '').trim() || randomSeed(),
    includeOutside: values.has('contraste'), onlyWithSolution: values.has('resueltos'), withSolutions: values.has('soluciones'),
    title: String(values.get('titulo') ?? '').trim() || DEFAULT_TITLE
  };
}

function writeForm(criteria) {
  for (const input of form.querySelectorAll('[name="tema"]')) input.checked = criteria.topics.includes(input.value);
  checkedTags.clear();
  criteria.tags.filter(tag => data.tags[tag]).forEach(tag => checkedTags.add(tag));
  form.querySelector(`[name="modo"][value="${criteria.tagMode}"]`).checked = true;
  form.elements.n.value = criteria.count;
  form.elements.semilla.value = criteria.seed;
  form.elements.titulo.value = criteria.title === DEFAULT_TITLE ? '' : criteria.title;
  form.elements.titulo.placeholder = DEFAULT_TITLE;
  form.elements.contraste.checked = criteria.includeOutside;
  form.elements.resueltos.checked = criteria.onlyWithSolution;
  form.elements.soluciones.checked = criteria.withSolutions;
}

const solutionIds = () => new Set(Object.keys(solutions));
const candidates = criteria => filterExercises(visibleExercises, { ...criteria, solutionIds: solutionIds() });

/** Contenidos disponibles con los temas marcados, con su número de ejercicios; los marcados se conservan. */
function renderTags() {
  const criteria = readForm();
  const pool = filterExercises(visibleExercises, { topics: criteria.topics, includeOutside: criteria.includeOutside });
  const counts = new Map();
  for (const exercise of pool) for (const tag of exercise.tags) counts.set(tag, (counts.get(tag) ?? 0) + 1);
  for (const tag of [...checkedTags]) if (!counts.has(tag)) checkedTags.delete(tag);
  const words = fold(tagSearch.value).split(/\s+/).filter(Boolean);
  tagList.replaceChildren(...Object.keys(data.tags).filter(tag => counts.has(tag)).map(tag => {
    const label = document.createElement('label');
    label.className = 'mc-sel__check';
    label.hidden = !checkedTags.has(tag) && !words.every(word => fold(data.tags[tag]).includes(word));
    const input = document.createElement('input');
    input.type = 'checkbox'; input.value = tag; input.checked = checkedTags.has(tag);
    input.addEventListener('change', () => { if (input.checked) checkedTags.add(tag); else checkedTags.delete(tag); updateStatus(); });
    const count = document.createElement('span');
    count.className = 'mc-sel__muted'; count.textContent = `(${counts.get(tag)})`;
    const text = document.createElement('span');
    text.append(data.tags[tag], ' ', count);
    label.append(input, text);
    return label;
  }));
}

function updateStatus() {
  const criteria = readForm();
  const total = candidates(criteria).length;
  status.textContent = !total ? 'Ningún ejercicio cumple los criterios. Quita algún contenido o marca otro tema.'
    : `${total} ${total === 1 ? 'ejercicio cumple' : 'ejercicios cumplen'} los criterios; se ${Math.min(total, criteria.count) === 1 ? 'elegirá 1' : `elegirán ${Math.min(total, criteria.count)}`}.`;
}

function summary(criteria) {
  const topics = criteria.topics.length ? criteria.topics.map(id => data.topics.find(topic => topic.topicId === id)?.name).filter(Boolean).join(', ') : 'todos los temas';
  const tags = criteria.tags.length ? ` · Contenidos (${criteria.tagMode === 'all' ? 'todos' : 'alguno'}): ${criteria.tags.map(tag => data.tags[tag]).join(', ')}` : '';
  return `${topics}${tags} · Semilla ${criteria.seed}`;
}

function renderSheet() {
  const criteria = current;
  const withSolutions = criteria.withSolutions;
  const header = document.createElement('header');
  const title = document.createElement('h2');
  title.id = 'relacion-titulo'; title.tabIndex = -1; title.textContent = criteria.title;
  const meta = document.createElement('p');
  meta.className = 'mc-rel__meta';
  meta.textContent = `Matemáticas Aplicadas a las Ciencias Sociales II · ${selection.length} ${selection.length === 1 ? 'ejercicio' : 'ejercicios'} de Selectividad de Andalucía · ${summary(criteria)}`;
  header.append(title, meta);
  const list = document.createElement('ol');
  list.className = 'mc-rel__list'; list.setAttribute('role', 'list');
  selection.forEach((exercise, index) => {
    const item = document.createElement('li');
    item.className = 'mc-rel__exercise';
    const heading = document.createElement('h3');
    heading.textContent = `Ejercicio ${index + 1}`;
    const origin = document.createElement('p');
    origin.className = 'mc-rel__origin';
    origin.textContent = `${exercise.origin} · ${exercise.place} · ${exercise.points} puntos en el examen original · ${exercise.id}`;
    const statement = document.createElement('div');
    statement.className = 'mc-sel__statement';
    statement.innerHTML = exercise.html; // HTML generado por build-selectividad.mjs a partir del banco.
    item.append(heading, origin, statement);
    list.append(item);
  });
  const parts = [header, list];
  if (withSolutions) {
    const section = document.createElement('section');
    section.className = 'mc-rel__solutions';
    section.setAttribute('aria-labelledby', 'relacion-soluciones');
    const heading = document.createElement('h2');
    heading.id = 'relacion-soluciones'; heading.textContent = 'Soluciones';
    section.append(heading);
    selection.forEach((exercise, index) => {
      const subheading = document.createElement('h3');
      subheading.textContent = `Ejercicio ${index + 1}`;
      const body = document.createElement('div');
      body.className = 'mc-sel__solution-body';
      if (solutions[exercise.id]) body.innerHTML = solutions[exercise.id].html;
      else { const note = document.createElement('p'); note.textContent = 'Solución no disponible todavía.'; body.append(note); }
      section.append(subheading, body);
    });
    parts.push(section);
  }
  sheet.replaceChildren(...parts);
  output.hidden = false;
}

function generate({ focus = true } = {}) {
  current = readForm();
  form.elements.semilla.value = current.seed;
  const pool = candidates(current);
  selection = pickExercises(pool, current.count, current.seed, data.topics.map(topic => topic.topicId));
  current.withSolutions = current.withSolutions && Object.keys(solutions).length > 0;
  history.replaceState(null, '', '?' + criteriaToParams(current).toString());
  if (!selection.length) { output.hidden = true; updateStatus(); return; }
  renderSheet();
  status.textContent = pool.length < current.count
    ? `Solo ${pool.length === 1 ? 'hay 1 ejercicio' : `hay ${pool.length} ejercicios`} con estos criterios: la relación los incluye todos.`
    : `Relación generada: ${selection.length} de ${pool.length} ejercicios posibles.`;
  if (focus) sheet.querySelector('h2').focus();
}

function download(name, content, type) {
  const url = URL.createObjectURL(new Blob([content], { type }));
  const link = document.createElement('a');
  link.href = url; link.download = name;
  document.body.append(link); link.click(); link.remove();
  setTimeout(() => URL.revokeObjectURL(url), 1000);
}

const fileBase = () => `relacion-selectividad-${current.seed.replace(/[^A-Za-z0-9_-]/g, '') || 'web'}`;
const included = () => current.withSolutions ? Object.fromEntries(selection.filter(e => solutions[e.id]).map(e => [e.id, solutions[e.id]])) : {};

async function busy(button, action) {
  button.disabled = true;
  try { await action(); }
  catch { status.textContent = 'No se ha podido preparar la descarga. Comprueba la conexión y vuelve a intentarlo.'; }
  finally { button.disabled = false; }
}

async function initialize() {
  const [context, json] = await Promise.all([getContentContext(), fetchJson('content/selectividad/ejercicios.json')]);
  data = json;
  const refreshVisibility = async () => {
    // Un tema del banco oculto por el docente no aporta ejercicios; las soluciones, solo si están publicadas.
    const topicsVisible = new Set(data.topics.filter(topic => context.model.isVisible('page:' + topic.pageId)).map(topic => topic.topicId));
    visibleExercises = data.exercises.filter(exercise => topicsVisible.has(exercise.topicId));
    const trusted = context.snapshot.origin !== 'fallback';
    const ids = trusted ? visibleExercises.map(exercise => exercise.id).filter(id => context.model.isVisible('solution:' + id)) : [];
    solutions = {};
    if (ids.length) {
      const all = (await fetchJson('content/selectividad/soluciones.json')).solutions;
      for (const id of ids) if (all[id]) solutions[id] = all[id];
    }
    const any = Object.keys(solutions).length > 0;
    form.querySelector('[data-rel-solved-field]').hidden = !any;
    form.querySelector('[data-rel-solutions-field]').hidden = !any;
    for (const input of form.querySelectorAll('[name="tema"]')) input.closest('label').hidden = !topicsVisible.has(input.value);
  };
  await refreshVisibility();
  const params = new URLSearchParams(location.search);
  writeForm(paramsToCriteria(params, { defaultSeed: randomSeed() }));
  form.hidden = false;
  renderTags();
  updateStatus();
  form.addEventListener('change', event => {
    if (event.target.name === 'tema' || event.target.name === 'contraste') renderTags();
    updateStatus();
  });
  form.addEventListener('input', event => { if (event.target.name === 'n') updateStatus(); });
  tagSearch.addEventListener('input', renderTags);
  form.addEventListener('submit', event => { event.preventDefault(); generate(); });
  form.querySelector('[data-rel-reroll]').addEventListener('click', () => { form.elements.semilla.value = randomSeed(); generate(); });
  document.querySelector('[data-rel-print]').addEventListener('click', () => window.print());
  const texButton = document.querySelector('[data-rel-tex]');
  texButton.addEventListener('click', () => busy(texButton, async () => {
    const preamble = await fetchText('content/selectividad/latex/tex/paquetes.tex');
    download(fileBase() + '.tex', standaloneTex({ title: current.title, subtitle: summary(current), exercises: selection,
      solutions: included(), withSolutions: current.withSolutions, preamble }), 'application/x-tex;charset=utf-8');
  }));
  const zipButton = document.querySelector('[data-rel-zip]');
  zipButton.addEventListener('click', () => busy(zipButton, async () => {
    const names = ['main.tex', 'tex/paquetes.tex', 'tex/comandos.tex', 'config/opciones.tex'];
    const assets = Object.fromEntries(await Promise.all(names.map(async name => [name, await fetchText('content/selectividad/latex/' + name)])));
    const chosen = included();
    const figures = {};
    for (const name of new Set(Object.values(chosen).flatMap(solution => figuresIn(solution.latex)))) {
      const response = await fetch(projectUrl(`content/selectividad/latex/recursos/figuras/${name}.pdf`));
      if (!response.ok) throw new Error('HTTP ' + response.status);
      figures[name] = new Uint8Array(await response.arrayBuffer());
    }
    const files = overleafFiles({ title: current.title, seedNote: summary(current), exercises: selection, solutions: chosen,
      withSolutions: current.withSolutions, assets, figures });
    download(fileBase() + '.zip', zipFiles(files), 'application/zip');
  }));
  // La vista previa del docente puede cambiar la visibilidad: se recalculan las opciones disponibles.
  context.subscribe(async () => { await refreshVisibility(); renderTags(); updateStatus(); });
  // Un enlace con semilla reproduce la relación al abrirlo.
  if (params.has('semilla')) generate({ focus: false });
}

if (form) {
  initialize().catch(() => {
    status.textContent = 'No se han podido cargar los ejercicios. Vuelve a cargar la página.';
  });
}

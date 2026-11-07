// Banco de Selectividad (P08): filtros sobre las tarjetas que genera scripts/build-selectividad.mjs y soluciones
// visibles solo cuando el docente las activa (grupo por tema o solución suelta en config/visibility.json).
// Sin JavaScript se leen todos los enunciados y ninguna solución: el HTML no las contiene.
import { projectUrl } from '../core/paths.js';
import { getContentContext } from '../content/runtime.js';

const form = document.querySelector('[data-sel-filters]');
const status = document.querySelector('[data-sel-status]');
const cards = [...document.querySelectorAll('[data-sel-card]')];
const groups = [...document.querySelectorAll('[data-sel-group]')];
const fold = text => text.toLowerCase().normalize('NFD').replace(/\p{Diacritic}/gu, '');

let apply = () => {};

if (form && cards.length) {
  const search = form.querySelector('[data-sel-search]');
  const selects = [...form.querySelectorAll('[data-sel-filter]')];
  const outside = form.querySelector('[data-sel-outside]');
  const solved = form.querySelector('[data-sel-solved]');
  const params = new URLSearchParams(location.search);
  // ?epigrafe=T07.10 (enlace «Así cae en Selectividad» de cada lección) y ?etiqueta=bayes abren la página filtrada.
  for (const [param, key] of [['epigrafe', 'epigrafes'], ['etiqueta', 'tags'], ['anio', 'anio']]) {
    const select = selects.find(item => item.dataset.selFilter === key);
    const value = params.get(param);
    if (value && [...select.options].some(option => option.value === value)) select.value = value;
  }
  form.hidden = false;
  form.addEventListener('submit', event => event.preventDefault());

  apply = () => {
    const words = fold(search.value).split(/\s+/).filter(Boolean);
    let shown = 0, available = 0;
    for (const card of cards) {
      const match = selects.every(select => {
        if (!select.value) return true;
        const value = card.dataset[select.dataset.selFilter];
        return ['epigrafes', 'tags'].includes(select.dataset.selFilter) ? value.split(' ').includes(select.value) : value === select.value;
      })
        && (!('fueraTemario' in card.dataset) || outside?.checked)
        && (!solved?.checked || card.querySelector('[data-sel-solution]:not([hidden])'))
        && words.every(word => card.dataset.search.includes(word));
      card.classList.toggle('is-filtered', !match);
      if (!card.hidden) { available++; if (match) shown++; }
    }
    for (const group of groups) {
      group.classList.toggle('is-filtered', !group.querySelector('[data-sel-card]:not(.is-filtered):not([hidden])'));
    }
    const filtering = search.value.trim() || selects.some(select => select.value) || solved?.checked;
    status.textContent = !available ? 'No hay ejercicios disponibles en este momento.'
      : shown ? (filtering || shown < available ? `${shown} de ${available} ejercicios.` : `${available} ejercicios.`)
      : 'Ningún ejercicio coincide. Prueba con otra palabra o quita algún filtro.';
  };
  form.addEventListener('input', apply);
  form.addEventListener('change', apply);
  apply();
  // Un enlace a un ejercicio concreto (#SEL-…) lo muestra aunque los filtros lo dejaran fuera.
  const reveal = () => {
    const target = location.hash ? document.getElementById(decodeURIComponent(location.hash.slice(1))) : null;
    const card = target?.closest('[data-sel-card]');
    if (!card || !card.classList.contains('is-filtered')) return;
    search.value = ''; selects.forEach(select => { select.value = ''; });
    if (outside && 'fueraTemario' in card.dataset) outside.checked = true;
    if (solved) solved.checked = false;
    apply(); target.scrollIntoView();
  };
  window.addEventListener('hashchange', reveal);
  reveal();
}

// Soluciones: se piden al servidor solo si alguna está visible y se insertan plegadas bajo su enunciado.
let solutionsPromise;
const loadSolutions = () => solutionsPromise ??= fetch(projectUrl('content/selectividad/soluciones.json'))
  .then(response => { if (!response.ok) throw new Error('HTTP ' + response.status); return response.json(); })
  .then(data => data.solutions);

async function showSolutions(context) {
  const slots = [...document.querySelectorAll('[data-sel-solution]')];
  // Con la configuración de respaldo (sin lectura válida de la publicada) nada se muestra: las soluciones están
  // ocultas de partida y el respaldo lo deja todo visible.
  const trusted = context.snapshot.origin !== 'fallback';
  const visible = slots.filter(slot => trusted && context.model.isVisible('solution:' + slot.dataset.selSolution));
  for (const slot of slots) if (!visible.includes(slot)) slot.hidden = true;
  if (visible.length) {
    let solutions;
    try { solutions = await loadSolutions(); }
    catch { solutionsPromise = undefined; return; }
    for (const slot of visible) {
      const html = solutions[slot.dataset.selSolution];
      if (!html) continue;
      if (!slot.childElementCount) {
        const details = document.createElement('details');
        details.className = 'mc-sel__details';
        const summary = document.createElement('summary');
        summary.textContent = 'Ver la solución';
        const body = document.createElement('div');
        body.className = 'mc-sel__solution-body';
        // HTML generado en el servidor a partir del banco (build-selectividad.mjs), no texto del usuario.
        body.innerHTML = html;
        details.append(summary, body);
        slot.append(details);
      }
      slot.hidden = false;
    }
  }
  const solvedField = form?.querySelector('[data-sel-solved-field]');
  if (solvedField) {
    solvedField.hidden = !visible.length;
    if (!visible.length) solvedField.querySelector('input').checked = false;
  }
  apply();
}

if (document.querySelector('[data-sel-solution]')) {
  getContentContext().then(context => {
    showSolutions(context);
    context.subscribe(() => showSolutions(context));
  }).catch(() => { /* Sin catálogo no se publica ninguna solución. */ });
}
// La visibilidad del catálogo se aplica de forma asíncrona y puede cambiar (vista previa del docente).
const main = document.querySelector('main');
if (main && cards.length) new MutationObserver(() => apply()).observe(main, { subtree: true, attributes: true, attributeFilter: ['hidden'] });

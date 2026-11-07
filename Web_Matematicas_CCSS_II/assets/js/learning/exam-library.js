// Biblioteca de exámenes (P01): búsqueda y filtros sobre las tarjetas generadas por scripts/build-exams.mjs.
// Sin JavaScript se ven todas. El filtro usa su propia clase (no `hidden`), porque `hidden` lo gestiona la
// visibilidad del catálogo (document.js): una tarjeta oculta por el docente nunca reaparece al filtrar.
const form = document.querySelector('[data-exam-filters]');
const status = document.querySelector('[data-exam-status]');
const cards = [...document.querySelectorAll('[data-exam-card]')];
const groups = [...document.querySelectorAll('[data-exam-group]')];

const fold = text => text.toLowerCase().normalize('NFD').replace(/\p{Diacritic}/gu, '');

if (form && cards.length) {
  const search = form.querySelector('[data-exam-search]');
  const topic = form.querySelector('[data-exam-topic]');
  const type = form.querySelector('[data-exam-type]');
  const params = new URLSearchParams(location.search);
  // ?tema=t07 abre la biblioteca filtrada, como en test y tarjetas.
  if (params.get('tema') && [...topic.options].some(option => option.value === params.get('tema'))) topic.value = params.get('tema');
  form.hidden = false;
  form.addEventListener('submit', event => event.preventDefault());

  const apply = () => {
    const words = fold(search.value).split(/\s+/).filter(Boolean);
    let shown = 0, available = 0;
    for (const card of cards) {
      const text = fold(card.dataset.search);
      const match = (!topic.value || card.dataset.topic === topic.value) && (!type.value || card.dataset.type === type.value)
        && words.every(word => text.includes(word));
      card.classList.toggle('is-filtered', !match);
      if (!card.hidden) { available++; if (match) shown++; }
    }
    for (const group of groups) {
      group.classList.toggle('is-filtered', !group.querySelector('[data-exam-card]:not(.is-filtered):not([hidden])'));
    }
    const filtering = search.value.trim() || topic.value || type.value;
    status.textContent = !available ? 'No hay exámenes disponibles en este momento.'
      : filtering ? (shown ? `${shown} de ${available} exámenes.` : 'Ningún examen coincide. Prueba con otra palabra o quita algún filtro.')
      : `${available} exámenes con sus soluciones.`;
  };
  form.addEventListener('input', apply);
  form.addEventListener('change', apply);
  // La visibilidad del catálogo se aplica de forma asíncrona y puede cambiar (vista previa del docente).
  new MutationObserver(apply).observe(document.querySelector('main'), { subtree: true, attributes: true, attributeFilter: ['hidden'] });
  apply();
}

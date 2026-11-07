// Formulario (P06): búsqueda y filtro por tema sobre las fórmulas generadas por scripts/build-formulas.mjs.
// Como en la biblioteca de exámenes, el filtro usa su propia clase y respeta `hidden` (visibilidad del catálogo).
const form = document.querySelector('[data-formula-filters]');
const status = document.querySelector('[data-formula-status]');
const entries = [...document.querySelectorAll('[data-formula-entry]')];
const groups = [...document.querySelectorAll('[data-formula-group]')];
const topics = document.querySelector('.mc-formulas__topics');
const fold = text => text.toLowerCase().normalize('NFD').replace(/\p{Diacritic}/gu, '');

if (form && entries.length) {
  const search = form.querySelector('[data-formula-search]');
  const topic = form.querySelector('[data-formula-topic]');
  // ?tema=t07 abre el formulario en ese tema, como la biblioteca de exámenes.
  const requested = new URLSearchParams(location.search).get('tema');
  if (requested && [...topic.options].some(option => option.value === requested)) topic.value = requested;
  form.hidden = false;
  form.addEventListener('submit', event => event.preventDefault());

  const apply = () => {
    const words = fold(search.value).split(/\s+/).filter(Boolean);
    let shown = 0, available = 0;
    for (const group of groups) {
      const inTopic = !topic.value || group.dataset.topic === topic.value;
      for (const entry of group.querySelectorAll('[data-formula-entry]')) {
        const match = inTopic && words.every(word => fold(entry.dataset.search).includes(word));
        entry.classList.toggle('is-filtered', !match);
        if (!entry.hidden && !group.hidden) { available++; if (match) shown++; }
      }
      const empty = !group.querySelector('[data-formula-entry]:not(.is-filtered):not([hidden])');
      group.classList.toggle('is-filtered', empty);
      topics?.querySelector(`a[href="#${group.id}"]`)?.classList.toggle('is-filtered', empty || group.hidden);
    }
    const filtering = words.length || topic.value;
    status.textContent = !available ? 'No hay fórmulas disponibles en este momento.'
      : !filtering ? `${available} fórmulas.`
      : shown ? `${shown} de ${available} fórmulas.` : 'Ninguna fórmula coincide. Prueba con otra palabra o elige otro tema.';
  };
  form.addEventListener('input', apply);
  form.addEventListener('change', apply);
  new MutationObserver(apply).observe(document.querySelector('main'), { subtree: true, attributes: true, attributeFilter: ['hidden'] });
  apply();
}

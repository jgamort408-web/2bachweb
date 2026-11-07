// Glosario (P06): búsqueda por término sobre las entradas generadas por scripts/build-glossary.mjs.
// Como en la biblioteca de exámenes, el filtro usa su propia clase y respeta `hidden` (visibilidad del catálogo).
const form = document.querySelector('[data-glossary-filters]');
const status = document.querySelector('[data-glossary-status]');
const entries = [...document.querySelectorAll('[data-glossary-entry]')];
const groups = [...document.querySelectorAll('[data-glossary-group]')];
const letters = document.querySelector('.mc-glossary__letters');
const fold = text => text.toLowerCase().normalize('NFD').replace(/\p{Diacritic}/gu, '');

if (form && entries.length) {
  const search = form.querySelector('[data-glossary-search]');
  form.hidden = false;
  form.addEventListener('submit', event => event.preventDefault());
  const apply = () => {
    const words = fold(search.value).split(/\s+/).filter(Boolean);
    let shown = 0, available = 0;
    for (const entry of entries) {
      const match = words.every(word => fold(entry.dataset.search).includes(word));
      entry.classList.toggle('is-filtered', !match);
      if (!entry.hidden) { available++; if (match) shown++; }
    }
    for (const group of groups) {
      const empty = !group.querySelector('[data-glossary-entry]:not(.is-filtered):not([hidden])');
      group.classList.toggle('is-filtered', empty);
      letters?.querySelector(`a[href="#${group.id}"]`)?.classList.toggle('is-filtered', empty);
    }
    status.textContent = !words.length ? `${available} términos.`
      : shown ? `${shown} de ${available} términos.` : 'Ningún término coincide.';
  };
  search.addEventListener('input', apply);
  new MutationObserver(apply).observe(document.querySelector('main'), { subtree: true, attributes: true, attributeFilter: ['hidden'] });
  apply();
}

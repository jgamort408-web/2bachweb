import { updateMath } from '../core/math.js';
import { getContentContext, visibleActivities } from '../content/runtime.js';

/** Mazo común, sin persistencia; los filtros conservan las categorías de la fuente. */
export async function mountFlashcards(root, source, { categories = false } = {}) {
  let context;
  try { context = await getContentContext(); }
  catch { root.textContent = 'No se ha podido comprobar la disponibilidad de las tarjetas.'; return; }
  let visibleSource = visibleActivities(context, 'card', source);
  let cards = visibleSource, index = 0, revealed = false, categorySelect;
  const count = document.createElement('p'), content = document.createElement('div'), actions = document.createElement('div');
  const category = document.createElement('p');
  content.setAttribute('aria-live', 'polite');
  actions.className = 'actions';
  count.dataset.contentRole = 'activity-progress';
  category.dataset.contentRole = 'flashcard-category';
  const previous = document.createElement('button'), reveal = document.createElement('button'), next = document.createElement('button');
  previous.textContent = 'Anterior'; next.textContent = 'Siguiente';
  for (const button of [previous, reveal, next]) button.type = 'button';
  actions.append(previous, reveal, next);
  root.replaceChildren(count, category, content, actions);

  function render() {
    const card = cards[index], showAnswer = revealed;
    count.textContent = card ? 'Tarjeta ' + (index + 1) + ' de ' + cards.length : 'No hay tarjetas disponibles.';
    category.textContent = card?.category || '';
    category.hidden = !card?.category;
    reveal.textContent = showAnswer ? 'Ocultar respuesta' : 'Mostrar respuesta';
    reveal.setAttribute('aria-expanded', String(showAnswer));
    reveal.disabled = !card;
    previous.disabled = !card || index === 0;
    next.disabled = !card || index === cards.length - 1;
    // Capture this render's values before entering the shared LaTeX queue.
    updateMath(content, () => {
      content.replaceChildren();
      if (!card) return;
      const front = document.createElement('h2');
      front.dataset.contentRole = 'flashcard-front'; front.textContent = card.front;
      content.append(front);
      if (showAnswer) {
        const back = document.createElement('p');
        back.dataset.contentRole = 'flashcard-back'; back.textContent = card.back;
        content.append(back);
      }
    });
  }
  const names = [...new Set(visibleSource.map(card => card.category).filter(Boolean))];
  if (categories && names.length) {
    const label = document.createElement('label'), select = document.createElement('select');
    label.textContent = 'Categoría de las tarjetas ';
    select.dataset.cardCategory = '';
    categorySelect = select;
    for (const [value, name] of [['', 'Todas las categorías'], ...names.map(name => [name, name])]) {
      const option = document.createElement('option'); option.value = value; option.textContent = name; select.append(option);
    }
    label.append(select); root.prepend(label);
    select.addEventListener('change', () => {
      cards = select.value ? visibleSource.filter(card => card.category === select.value) : visibleSource;
      index = 0; revealed = false; render();
    });
  }
  previous.addEventListener('click', () => { if (index > 0) { index--; revealed = false; render(); } });
  next.addEventListener('click', () => { if (index < cards.length - 1) { index++; revealed = false; render(); } });
  reveal.addEventListener('click', () => { if (cards.length) { revealed = !revealed; render(); } });
  context.subscribe(() => {
    const nextSource = visibleActivities(context, 'card', source);
    if (nextSource.map(card => card.id).join('|') === visibleSource.map(card => card.id).join('|')) return;
    const previousId = cards[index]?.id;
    visibleSource = nextSource;
    if (categorySelect) {
      const selected = categorySelect.value;
      categorySelect.replaceChildren();
      for (const name of ['', ...new Set(visibleSource.map(card => card.category).filter(Boolean))]) {
        const option = document.createElement('option'); option.value = name; option.textContent = name || 'Todas las categorías'; categorySelect.append(option);
      }
      categorySelect.value = [...categorySelect.options].some(option => option.value === selected) ? selected : '';
    }
    cards = categorySelect?.value ? visibleSource.filter(card => card.category === categorySelect.value) : visibleSource;
    index = Math.max(0, cards.findIndex(card => card.id === previousId)); revealed = false; render();
  });
  render();
}

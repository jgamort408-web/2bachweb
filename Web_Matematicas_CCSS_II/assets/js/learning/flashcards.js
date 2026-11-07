import { updateMath } from '../core/math.js';
import { getContentContext, visibleActivities, pageRecords } from '../content/runtime.js';

const fold = text => String(text).toLowerCase().normalize('NFD').replace(/\p{Diacritic}/gu, '');

/**
 * Mazo común, sin persistencia; los filtros conservan las categorías de la fuente.
 *
 * Con `study` (página Tarjetas, P06) el mazo añade:
 * - filtros uniformes: búsqueda sin tildes y «Apartado», que es la categoría de la fuente (temas 6–9 y apoyo),
 *   la lección (temas 1–5) o «Repaso del tema» para las tarjetas de repaso;
 * - autoevaluación tras ver la respuesta («La sabía» / «Repasar más tarde»);
 * - reaprendizaje de la sesión: una tarjeta marcada para repasar vuelve una vez, tres tarjetas después, y al
 *   terminar se pueden repasar solo las que siguen marcadas. Nada se guarda: al recargar empieza otra sesión.
 */
export async function mountFlashcards(root, source, { categories = false, study = false } = {}) {
  let context;
  try { context = await getContentContext(); }
  catch { root.textContent = 'No se ha podido comprobar la disponibilidad de las tarjetas.'; return; }
  let visibleSource = visibleActivities(context, 'card', source);
  // Cola de la sesión: cada entrada es una tarjeta; `repeat` marca las que vuelven para repasar.
  let cards = visibleSource.map(card => ({ card })), index = 0, revealed = false, finished = false, categorySelect, searchInput;
  const marks = new Map();
  const count = document.createElement('p'), content = document.createElement('div'), actions = document.createElement('div');
  const category = document.createElement('p');
  content.setAttribute('aria-live', 'polite');
  actions.className = 'actions';
  count.dataset.contentRole = 'activity-progress';
  category.dataset.contentRole = 'flashcard-category';
  const previous = document.createElement('button'), reveal = document.createElement('button'), next = document.createElement('button');
  previous.textContent = 'Anterior'; next.textContent = 'Siguiente';
  for (const button of [previous, reveal, next]) button.type = 'button';
  // Solo para el estilo de las páginas migradas: no cambian textos ni comportamiento.
  previous.dataset.action = 'previous'; reveal.dataset.action = 'reveal'; next.dataset.action = 'next-card';
  content.className = 'mc-flashcard';
  actions.append(previous, reveal, next);
  root.replaceChildren(count, category, content, actions);

  // Autoevaluación (solo en modo estudio).
  const assess = document.createElement('div'), tally = document.createElement('p'), summary = document.createElement('div');
  const know = document.createElement('button'), again = document.createElement('button');
  if (study) {
    assess.className = 'actions mc-flashcard__assess'; assess.dataset.cardAssess = ''; assess.hidden = true;
    know.type = again.type = 'button';
    know.textContent = 'La sabía'; again.textContent = 'Repasar más tarde';
    know.dataset.action = 'know'; again.dataset.action = 'again';
    assess.append(know, again);
    tally.className = 'mc-flashcard__tally'; tally.dataset.cardSession = ''; tally.hidden = true;
    summary.className = 'mc-flashcard__summary'; summary.dataset.cardSummary = ''; summary.hidden = true;
    // Orden de lectura: respuesta, autoevaluación y, al final, la navegación.
    actions.before(assess, tally, summary);
  }

  const sectionOf = (() => {
    if (!study) return card => card.category ? { value: card.category, label: card.category } : null;
    const pages = new Map(pageRecords(context).map(page => [page.id, page]));
    return card => card.category ? { value: card.category, label: card.category, group: card.topicId }
      : card.lessonId && pages.has(card.lessonId) ? { value: card.lessonId, label: pages.get(card.lessonId).title, group: card.topicId }
      : { value: 'repaso-' + card.topicId, label: 'Repaso del tema', group: card.topicId };
  })();
  const groupTitle = (() => {
    const pages = new Map(pageRecords(context).map(page => [page.id, page.title]));
    return id => pages.get(id) ?? id;
  })();

  function renderTally() {
    if (!study) return;
    const values = [...marks.values()];
    const known = values.filter(mark => mark === 'known').length, pending = values.length - known;
    tally.hidden = !values.length;
    tally.textContent = `La sabías: ${known} · Para repasar: ${pending}`;
  }

  function render() {
    const entry = cards[index], card = entry?.card, showAnswer = revealed;
    actions.hidden = finished; summary.hidden = !finished;
    if (finished) { count.textContent = 'Sesión terminada.'; category.hidden = true; content.replaceChildren(); assess.hidden = true; renderTally(); return; }
    count.textContent = card ? 'Tarjeta ' + (index + 1) + ' de ' + cards.length : 'No hay tarjetas disponibles.';
    category.textContent = card ? [card.category || (study ? sectionOf(card).label : ''), entry.repeat ? 'Vuelve para repasar' : ''].filter(Boolean).join(' · ') : '';
    category.hidden = !category.textContent;
    reveal.textContent = showAnswer ? 'Ocultar respuesta' : 'Mostrar respuesta';
    reveal.setAttribute('aria-expanded', String(showAnswer));
    reveal.disabled = !card;
    previous.disabled = !card || index === 0;
    next.disabled = !card || index === cards.length - 1;
    if (study) { assess.hidden = !(card && showAnswer); renderTally(); }
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

  function filtered() {
    const words = searchInput ? fold(searchInput.value).split(/\s+/).filter(Boolean) : [];
    const section = categorySelect?.value;
    return visibleSource.filter(card => (!section || sectionOf(card)?.value === section)
      && words.every(word => fold(card.front + ' ' + card.back).includes(word)));
  }

  function fillSections() {
    if (!categorySelect) return;
    const selected = categorySelect.value;
    const sections = new Map();
    for (const card of visibleSource) { const section = sectionOf(card); if (section && !sections.has(section.value)) sections.set(section.value, section); }
    categorySelect.replaceChildren();
    const all = document.createElement('option'); all.value = ''; all.textContent = study ? 'Todos los apartados' : 'Todas las categorías';
    categorySelect.append(all);
    const groups = new Set([...sections.values()].map(section => section.group));
    let parent = categorySelect, current;
    for (const section of sections.values()) {
      // Con varios temas a la vez, los apartados se agrupan por tema.
      if (groups.size > 1 && section.group !== current) {
        current = section.group; parent = document.createElement('optgroup'); parent.label = groupTitle(current); categorySelect.append(parent);
      }
      const option = document.createElement('option'); option.value = section.value; option.textContent = section.label; parent.append(option);
    }
    categorySelect.value = [...categorySelect.options].some(option => option.value === selected) ? selected : '';
    return sections.size;
  }

  // Nueva sesión con los filtros actuales; conserva la tarjeta visible si sigue en el mazo.
  function restart(keepId) {
    cards = filtered().map(card => ({ card }));
    marks.clear(); finished = false; revealed = false;
    index = Math.max(0, cards.findIndex(entry => entry.card.id === keepId));
    render();
  }

  const names = [...new Set(visibleSource.map(card => card.category).filter(Boolean))];
  if (study) {
    const form = document.createElement('form');
    form.className = 'mc-library__filters mc-flashcard__filters'; form.dataset.cardFilters = '';
    form.setAttribute('aria-label', 'Filtrar las tarjetas');
    const searchLabel = document.createElement('label'), sectionLabel = document.createElement('label');
    searchLabel.className = sectionLabel.className = 'mc-field';
    searchInput = document.createElement('input');
    searchInput.type = 'search'; searchInput.autocomplete = 'off'; searchInput.dataset.cardSearch = ''; searchInput.placeholder = 'Asíntota, inversa, Bayes…';
    searchLabel.append('Buscar en las tarjetas ', searchInput);
    categorySelect = document.createElement('select'); categorySelect.dataset.cardCategory = '';
    sectionLabel.append('Apartado ', categorySelect);
    form.append(searchLabel, sectionLabel);
    form.addEventListener('submit', event => event.preventDefault());
    root.prepend(form);
    if (fillSections() < 2) sectionLabel.hidden = true;
    let timer;
    searchInput.addEventListener('input', () => { clearTimeout(timer); timer = setTimeout(() => restart(), 200); });
    categorySelect.addEventListener('change', () => restart());

    const summaryHead = document.createElement('h2'), summaryText = document.createElement('p'), summaryActions = document.createElement('div');
    summaryHead.tabIndex = -1; summaryHead.textContent = 'Sesión terminada';
    summaryActions.className = 'actions';
    const retry = document.createElement('button'), restartAll = document.createElement('button');
    retry.type = restartAll.type = 'button';
    retry.dataset.action = 'retry'; restartAll.dataset.action = 'restart';
    restartAll.textContent = 'Empezar de nuevo';
    summary.append(summaryHead, summaryText, summaryActions);
    const finish = () => {
      finished = true;
      const values = [...marks.entries()], pending = values.filter(([, mark]) => mark === 'again');
      summaryText.textContent = `La sabías: ${values.length - pending.length} de ${values.length}. Para repasar: ${pending.length}.`;
      retry.textContent = pending.length === 1 ? 'Repasar la tarjeta marcada' : `Repasar las ${pending.length} marcadas`;
      summaryActions.replaceChildren(...(pending.length ? [retry, restartAll] : [restartAll]));
      render(); summaryHead.focus();
    };
    const advance = () => {
      if (index >= cards.length - 1) { finish(); return; }
      index++; revealed = false; render(); reveal.focus();
    };
    know.addEventListener('click', () => { marks.set(cards[index].card.id, 'known'); advance(); });
    again.addEventListener('click', () => {
      const entry = cards[index];
      marks.set(entry.card.id, 'again');
      // Vuelve tres tarjetas después (o al final) una sola vez por pasada, para que la sesión termine;
      // si sigue marcada, queda para «Repasar las marcadas» del resumen.
      if (!entry.repeat && !cards.slice(index + 1).some(other => other.card.id === entry.card.id)) cards.splice(Math.min(index + 4, cards.length), 0, { card: entry.card, repeat: true });
      advance();
    });
    retry.addEventListener('click', () => {
      const pending = new Set([...marks.entries()].filter(([, mark]) => mark === 'again').map(([id]) => id));
      cards = filtered().filter(card => pending.has(card.id)).map(card => ({ card }));
      marks.clear(); finished = false; revealed = false; index = 0; render(); reveal.focus();
    });
    restartAll.addEventListener('click', () => { restart(); reveal.focus(); });
  } else if (categories && names.length) {
    const label = document.createElement('label'), select = document.createElement('select');
    label.textContent = 'Categoría de las tarjetas ';
    select.dataset.cardCategory = '';
    categorySelect = select;
    fillSections();
    label.append(select); root.prepend(label);
    select.addEventListener('change', () => {
      cards = filtered().map(card => ({ card }));
      index = 0; revealed = false; render();
    });
  }
  previous.addEventListener('click', () => { if (index > 0) { index--; revealed = false; render(); } });
  next.addEventListener('click', () => { if (index < cards.length - 1) { index++; revealed = false; render(); } });
  reveal.addEventListener('click', () => { if (cards.length) { revealed = !revealed; render(); } });
  context.subscribe(() => {
    const nextSource = visibleActivities(context, 'card', source);
    if (nextSource.map(card => card.id).join('|') === visibleSource.map(card => card.id).join('|')) return;
    const previousId = cards[index]?.card.id;
    visibleSource = nextSource;
    fillSections();
    if (study) { restart(previousId); return; }
    cards = filtered().map(card => ({ card }));
    index = Math.max(0, cards.findIndex(entry => entry.card.id === previousId)); revealed = false; render();
  });
  if (study) cards = filtered().map(card => ({ card }));
  render();
}

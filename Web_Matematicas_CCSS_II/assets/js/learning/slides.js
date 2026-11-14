// Presentaciones de clase por tema. Sin JavaScript, cada <section class="mc-slide"> se lee como un apartado más de la
// página. Con JavaScript se muestra una diapositiva 16:9 cada vez:
// - avanzar: →, AvPág, espacio, Intro o deslizar a la izquierda; retroceder: ←, RePág o deslizar a la derecha;
// - Inicio/Fin, F pantalla completa, N notas del docente, I índice;
// - los elementos [data-step] de una diapositiva aparecen uno a uno antes de pasar a la siguiente;
// - la dirección guarda la diapositiva (#id), así que se puede recargar o enlazar una diapositiva concreta.
const FORM_CONTROL = 'input, select, textarea, button, a, summary, [contenteditable="true"]';

export function deckState(slides, index, revealed) {
  const total = slides.length, steps = slides[index]?.steps ?? 0;
  return { index, revealed, total, steps, atStart: index === 0 && revealed === 0, atEnd: index === total - 1 && revealed >= steps };
}

/** Siguiente posición: primero los pasos pendientes de la diapositiva y después la diapositiva siguiente. */
export function nextPosition(slides, index, revealed) {
  if (revealed < slides[index].steps) return { index, revealed: revealed + 1 };
  if (index < slides.length - 1) return { index: index + 1, revealed: 0 };
  return { index, revealed };
}

/** Posición anterior: se ocultan los pasos en orden inverso; la diapositiva anterior se muestra completa. */
export function previousPosition(slides, index, revealed) {
  if (revealed > 0) return { index, revealed: revealed - 1 };
  if (index > 0) return { index: index - 1, revealed: slides[index - 1].steps };
  return { index, revealed };
}

const button = (label, action, text) => {
  const element = document.createElement('button');
  element.type = 'button';
  element.className = 'mc-btn mc-deck__btn';
  element.dataset.deckAction = action;
  element.setAttribute('aria-label', label);
  element.textContent = text ?? label;
  return element;
};

export function initializeSlides(root = document.querySelector('[data-slides]')) {
  if (!root || root.dataset.slidesReady) return null;
  root.dataset.slidesReady = 'true';
  const sections = [...root.querySelectorAll(':scope > .mc-slide')];
  if (!sections.length) return null;
  const slides = sections.map((section, i) => {
    section.id ||= 'diapositiva-' + (i + 1);
    const steps = [...section.querySelectorAll('[data-step]')];
    // data-title da un título legible cuando el h2 es una fórmula (el índice se crea antes de MathJax).
    const title = section.dataset.title || section.querySelector('h1, h2')?.textContent.trim() || 'Diapositiva ' + (i + 1);
    section.setAttribute('role', 'group');
    section.setAttribute('aria-roledescription', 'diapositiva');
    section.setAttribute('aria-label', `${i + 1} de ${sections.length}: ${title}`);
    return { section, steps: steps.length, stepElements: steps, title };
  });

  // Marco 16:9, barra de control y región que anuncia el cambio de diapositiva.
  const frame = document.createElement('div');
  frame.className = 'mc-deck__frame';
  root.before(frame);
  frame.append(root);
  root.classList.add('is-deck');
  const bar = document.createElement('div');
  bar.className = 'mc-deck__bar';
  bar.setAttribute('role', 'toolbar');
  bar.setAttribute('aria-label', 'Controles de la presentación');
  const previous = button('Anterior', 'previous', '←'), next = button('Siguiente', 'next', '→');
  const counter = document.createElement('span');
  counter.className = 'mc-deck__counter';
  counter.dataset.deckCounter = '';
  const progress = document.createElement('span');
  progress.className = 'mc-deck__progress';
  progress.setAttribute('aria-hidden', 'true');
  const indexLabel = document.createElement('label');
  indexLabel.className = 'mc-deck__index';
  const indexText = document.createElement('span');
  indexText.className = 'mc-visually-hidden';
  indexText.textContent = 'Ir a la diapositiva';
  const select = document.createElement('select');
  select.dataset.deckIndex = '';
  slides.forEach((slide, i) => select.add(new Option(`${i + 1}. ${slide.title}`, String(i))));
  indexLabel.append(indexText, select);
  const notes = button('Notas del docente', 'notes', 'Notas');
  notes.setAttribute('aria-pressed', 'false');
  const full = button('Pantalla completa', 'fullscreen', 'Pantalla completa');
  if (!frame.requestFullscreen) full.hidden = true;
  bar.append(previous, counter, next, indexLabel, notes, full, progress);
  frame.append(bar);
  const live = document.createElement('p');
  live.className = 'mc-visually-hidden';
  live.setAttribute('role', 'status');
  live.dataset.deckLive = '';
  frame.append(live);

  let index = 0, revealed = 0;
  const fromHash = () => {
    const id = decodeURIComponent(location.hash.slice(1));
    const found = slides.findIndex(slide => slide.section.id === id || slide.section.contains(document.getElementById(id)));
    return found >= 0 ? found : null;
  };

  function render({ announce = true, focus = false } = {}) {
    slides.forEach((slide, i) => {
      const active = i === index;
      slide.section.hidden = !active;
      slide.section.classList.toggle('is-active', active);
      slide.stepElements.forEach((step, s) => {
        const shown = !active || s < revealed;
        step.classList.toggle('is-pending', !shown);
        step.toggleAttribute('inert', !shown);
        step.setAttribute('aria-hidden', String(!shown));
      });
    });
    const state = deckState(slides, index, revealed);
    root.dataset.slide = String(index + 1);
    root.dataset.revealed = String(revealed);
    counter.textContent = `${index + 1} / ${slides.length}`;
    select.value = String(index);
    previous.disabled = state.atStart;
    next.disabled = state.atEnd;
    progress.style.setProperty('--mc-deck-progress', String((index + 1) / slides.length));
    const id = slides[index].section.id;
    if (decodeURIComponent(location.hash.slice(1)) !== id) history.replaceState(null, '', '#' + id);
    if (announce) {
      const pending = state.steps - revealed;
      live.textContent = `Diapositiva ${index + 1} de ${slides.length}: ${slides[index].title}.` + (pending ? ` Quedan ${pending} pasos por mostrar.` : '');
    }
    if (focus) slides[index].section.focus({ preventScroll: true });
    root.dispatchEvent(new CustomEvent('mc:slide', { detail: { index, revealed, id } }));
  }
  const go = (position, options) => {
    const changed = position.index !== index;
    ({ index, revealed } = position);
    render({ ...options, focus: changed });
  };
  const goNext = () => go(nextPosition(slides, index, revealed));
  const goPrevious = () => go(previousPosition(slides, index, revealed));
  const goTo = target => go({ index: Math.max(0, Math.min(slides.length - 1, target)), revealed: 0 });
  for (const slide of slides) slide.section.tabIndex = -1;

  const toggleNotes = () => {
    const on = !frame.classList.contains('show-notes');
    frame.classList.toggle('show-notes', on);
    notes.setAttribute('aria-pressed', String(on));
  };
  const toggleFullscreen = () => {
    if (document.fullscreenElement) document.exitFullscreen?.().catch(() => {});
    else frame.requestFullscreen?.().catch(() => {});
  };
  document.addEventListener('fullscreenchange', () => {
    const on = document.fullscreenElement === frame;
    frame.classList.toggle('is-fullscreen', on);
    full.textContent = on ? 'Salir de pantalla completa' : 'Pantalla completa';
    full.setAttribute('aria-label', full.textContent);
  });
  bar.addEventListener('click', event => {
    const action = event.target.closest('[data-deck-action]')?.dataset.deckAction;
    if (action === 'next') goNext();
    else if (action === 'previous') goPrevious();
    else if (action === 'notes') toggleNotes();
    else if (action === 'fullscreen') toggleFullscreen();
  });
  select.addEventListener('change', () => goTo(Number(select.value)));

  document.addEventListener('keydown', event => {
    if (event.defaultPrevented || event.altKey || event.ctrlKey || event.metaKey) return;
    const target = event.target;
    // Los controles de los exploradores y de la barra conservan sus teclas (flechas en deslizadores, espacio en botones).
    if (target instanceof Element && target.closest(FORM_CONTROL)) return;
    const key = event.key;
    if (['ArrowRight', 'PageDown', ' ', 'Enter'].includes(key)) goNext();
    else if (['ArrowLeft', 'PageUp', 'Backspace'].includes(key)) goPrevious();
    else if (key === 'Home') goTo(0);
    else if (key === 'End') go({ index: slides.length - 1, revealed: slides[slides.length - 1].steps });
    else if (key === 'f' || key === 'F') toggleFullscreen();
    else if (key === 'n' || key === 'N') toggleNotes();
    else if (key === 'i' || key === 'I') select.focus();
    else return;
    event.preventDefault();
  });

  // Gesto horizontal en pantallas táctiles, salvo si empieza sobre un control (deslizadores de los exploradores).
  let touch = null;
  root.addEventListener('touchstart', event => {
    touch = event.touches.length === 1 && !event.target.closest(FORM_CONTROL) ? { x: event.touches[0].clientX, y: event.touches[0].clientY } : null;
  }, { passive: true });
  root.addEventListener('touchend', event => {
    if (!touch) return;
    const dx = event.changedTouches[0].clientX - touch.x, dy = event.changedTouches[0].clientY - touch.y;
    touch = null;
    if (Math.abs(dx) > 60 && Math.abs(dx) > 1.5 * Math.abs(dy)) (dx < 0 ? goNext : goPrevious)();
  }, { passive: true });
  addEventListener('hashchange', () => {
    const found = fromHash();
    if (found !== null && found !== index) goTo(found);
  });

  index = fromHash() ?? 0;
  render({ announce: false });
  return { slides, next: goNext, previous: goPrevious, goTo, get position() { return { index, revealed }; } };
}

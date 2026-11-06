import { projectUrl } from '../core/paths.js';
import { getContentContext, pageRecords, canUseCurrentPage } from '../content/runtime.js';
function sprite(name) {
  const svg = document.createElementNS('http://www.w3.org/2000/svg', 'svg'), use = document.createElementNS('http://www.w3.org/2000/svg', 'use');
  svg.setAttribute('class', 'mc-icon'); svg.setAttribute('aria-hidden', 'true');
  use.setAttribute('href', projectUrl('assets/icons/sprite.svg#' + name)); svg.append(use);
  return svg;
}
// Bloque de cada tema (1–3 análisis, 4–6 álgebra, 7–9 azar), como en la portada.
const blockOf = (id) => { const n = Number(id.slice(1)); return n <= 3 ? 'analisis' : n <= 6 ? 'algebra' : 'azar'; };
/** Tarjeta de tema del nuevo diseño: número con el color del bloque y barra de avance (revisado y parcial). */
function skinCourseCard(article, link, topic, total, completed, partial) {
  article.classList.add('mc-course'); article.dataset.block = blockOf(topic.id);
  const match = topic.title.match(/^(\d+)\.\s*(.*)$/);
  if (match) {
    const number = document.createElement('span'), dot = document.createElement('span'), title = document.createElement('span');
    number.className = 'mc-card__number'; number.textContent = match[1];
    dot.className = 'mc-route__dot'; dot.textContent = '. ';
    title.textContent = match[2]; number.append(dot); link.replaceChildren(number, title);
  }
  const bar = document.createElement('div');
  bar.className = 'mc-course__bar'; bar.setAttribute('aria-hidden', 'true');
  bar.style.setProperty('--mc-done', total ? (completed / total * 100).toFixed(1) + '%' : '0%');
  bar.style.setProperty('--mc-partial', total ? ((completed + partial) / total * 100).toFixed(1) + '%' : '0%');
  article.append(bar);
}
async function initialize() {
  const context = await getContentContext();
  if (!canUseCurrentPage(context)) return;
  function render() {
  const pages = pageRecords(context).filter(page => context.model.isVisible('page:' + page.id));
  const status = page => page.reviewStatus;
  const titleLink = (page) => {
    const link = document.createElement('a');
    link.href = projectUrl(page.path); link.textContent = page.title;
    return link;
  };
  const skinned = document.documentElement.dataset.skin === 'mc';
  const course = document.querySelector('[data-course-index]');
  if (course) course.replaceChildren();
  if (course) for (const topic of pages.filter((page) => page.kind === 'topic')) {
    const lessons = pages.filter((page) => page.parentId === topic.id && page.kind === 'lesson');
    const completed = lessons.filter((page) => status(page) === 'reviewed').length;
    const partial = lessons.filter((page) => status(page) === 'partial').length;
    const article = document.createElement('article'), heading = document.createElement('h2'), summary = document.createElement('p');
    article.className = 'course-card'; heading.append(titleLink(topic));
    summary.textContent = completed + ' de ' + lessons.length + ' lecciones visibles con contenido revisado.' + (partial ? ' Contenido parcial en ' + partial + '.' : '');
    article.append(heading, summary); course.append(article);
    if (skinned) skinCourseCard(article, heading.firstChild, topic, lessons.length, completed, partial);
  }
  if (course && !course.children.length) course.textContent = 'Todavía no hay temas disponibles.';
  const topic = document.querySelector('[data-topic-index]');
  if (topic) {
    const list = document.createElement('ol');
    // Lecciones en orden y, al final, las secciones del tema (por ahora, los ejercicios resueltos).
    const children = pages.filter((page) => page.parentId === topic.dataset.topicIndex);
    const route = [...children.filter((page) => page.kind === 'lesson'), ...children.filter((page) => page.kind === 'section')];
    for (const lesson of route) {
      const label = status(lesson) === 'reviewed' ? 'Disponible' : status(lesson) === 'partial' ? 'Contenido parcial' : 'En preparación';
      const item = document.createElement('li');
      if (skinned) {
        // Tarjeta numerada (ronda 4). El nombre accesible del enlace sigue siendo el título completo.
        const link = titleLink(lesson), match = lesson.title.match(/^(\d+\.\d+)\.\s*(.*)$/);
        if (match) {
          const number = document.createElement('span'), hidden = document.createElement('span'), title = document.createElement('span');
          number.className = 'mc-card__number mc-card__number--sm'; number.textContent = match[1];
          // Punto y espacio en línea y sin tamaño: el texto y el nombre accesible siguen siendo «9.6. Título».
          hidden.className = 'mc-route__dot'; hidden.textContent = '. ';
          title.className = 'mc-route__title'; title.textContent = match[2];
          number.append(hidden); link.replaceChildren(number, title);
        } else if (lesson.kind === 'section') {
          // Sin número: la casilla lleva un icono (ejemplo resuelto o teoría). Tras las lecciones, borde discontinuo.
          const badge = document.createElement('span'), title = document.createElement('span');
          badge.className = 'mc-card__number mc-card__number--sm mc-route__badge';
          badge.append(sprite(/ejercicios/i.test(lesson.title) ? 'mc-ejemplo' : 'mc-definicion'));
          title.className = 'mc-route__title'; title.textContent = lesson.title;
          link.replaceChildren(badge, title);
          if (route[0].kind === 'lesson') item.classList.add('mc-route__item--extra');
        }
        link.className = 'mc-route__link';
        const chip = document.createElement('span');
        chip.className = 'mc-chip' + (label === 'Disponible' ? '' : ' mc-chip--neutral'); chip.textContent = label;
        item.classList.add('mc-route__item'); item.append(link, chip);
      } else {
        item.append(titleLink(lesson), ' · ' + label);
      }
      list.append(item);
    }
    topic.replaceChildren(list);
    if (!list.children.length) topic.textContent = 'Todavía no hay lecciones disponibles.';
  }
  }
  render(); context.subscribe(render);
}
initialize().catch((error) => {
  for (const root of document.querySelectorAll('[data-course-index], [data-topic-index]')) root.textContent = 'No se pudo cargar el índice. Puedes usar el menú Temario.';
  console.warn(error.message);
});

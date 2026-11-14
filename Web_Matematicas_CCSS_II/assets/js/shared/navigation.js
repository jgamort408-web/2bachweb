import { projectUrl } from '../core/paths.js';

function pageLink(page, currentId) {
  const link = document.createElement('a');
  link.href = projectUrl(page.path);
  link.textContent = page.title;
  if (page.id === currentId) link.setAttribute('aria-current', 'page');
  return link;
}

function appendLinks(container, pages, currentId) {
  if (!container) return;
  const list = document.createElement('ul');
  for (const page of pages) {
    const item = document.createElement('li');
    item.append(pageLink(page, currentId));
    list.append(item);
  }
  container.replaceChildren(list);
}

// Bloques del temario (D02): Análisis (temas 1–3), Álgebra (4–6) y Probabilidad y Estadística (7–9).
const BLOCKS = [
  { id: 'analisis', title: 'Análisis', topics: ['t01', 't02', 't03'] },
  { id: 'algebra', title: 'Álgebra', topics: ['t04', 't05', 't06'] },
  { id: 'azar', title: 'Probabilidad y Estadística', topics: ['t07', 't08', 't09'] }
];
const element = (tag, className, text) => {
  const node = document.createElement(tag);
  if (className) node.className = className;
  if (text !== undefined) node.textContent = text;
  return node;
};
/** «3.5. Integral definida» → número y título por separado; el nombre accesible del enlace sigue siendo el completo. */
function numberedLink(page, currentId, fallbackLabel) {
  const link = pageLink(page, currentId);
  const match = page.title.match(/^(\d+(?:\.\d+)?)\.\s*(.*)$/);
  const number = element('span', 'mc-syllabus__num', match ? match[1] : '');
  if (!match) number.setAttribute('aria-hidden', 'true');
  const dot = element('span', 'mc-visually-hidden', match ? '. ' : '');
  link.replaceChildren(number, dot, element('span', 'mc-syllabus__label', fallbackLabel ?? (match ? match[2] : page.title)));
  return link;
}

/** Temario: los nueve temas agrupados por bloque; se abre el tema de la página actual. */
function renderCourseMenu(container, pages, currentId) {
  if (!container) return;
  const topics = pages.filter((page) => page.kind === 'topic');
  const groups = BLOCKS.map(block => ({ ...block, topics: topics.filter(topic => block.topics.includes(topic.id)) }));
  const others = topics.filter(topic => !BLOCKS.some(block => block.topics.includes(topic.id)));
  if (others.length) groups.push({ id: '', title: 'Otros', topics: others });
  const wrapper = element('div', 'mc-syllabus');
  for (const group of groups.filter(group => group.topics.length)) {
    const section = element('div', 'mc-syllabus__block');
    if (group.id) section.dataset.block = group.id;
    const title = element('p', 'mc-syllabus__block-title', group.title);
    title.id = 'temario-' + (group.id || 'otros');
    const list = element('ul', 'mc-syllabus__topics');
    list.setAttribute('aria-labelledby', title.id);
    for (const topic of group.topics) {
      const children = pages.filter((page) => page.parentId === topic.id);
      const item = element('li');
      const details = element('details', 'mc-syllabus__topic');
      details.open = topic.id === currentId || children.some((page) => page.id === currentId);
      const summary = element('summary');
      const match = topic.title.match(/^(\d+)\.\s*(.*)$/);
      summary.append(element('span', 'mc-syllabus__num mc-syllabus__num--topic', match ? match[1] : '·'), element('span', 'mc-syllabus__label', match ? match[2] : topic.title));
      const lessons = element('ul', 'mc-syllabus__lessons');
      for (const page of [topic, ...children]) {
        const li = element('li');
        li.append(page === topic ? numberedLink(page, currentId, 'Índice del tema') : numberedLink(page, currentId));
        if (page.kind === 'section' && page !== topic) li.className = 'mc-syllabus__extra';
        lessons.append(li);
      }
      details.append(summary, lessons);
      item.append(details);
      list.append(item);
    }
    section.append(title, list);
    wrapper.append(section);
  }
  container.replaceChildren(wrapper);
}

/** Páginas relacionadas: anterior, sección y siguiente con su papel escrito, y después las páginas que cuelgan de esta. */
function renderRelated(container, pages, { previous, parent, next }, currentId) {
  if (!container) return;
  const list = element('ul', 'mc-related');
  for (const page of pages) {
    const role = page === previous ? 'Anterior' : page === next ? 'Siguiente' : page === parent ? (parent.kind === 'topic' ? 'Índice del tema' : 'Sección') : 'En esta sección';
    const item = element('li', 'mc-related__item');
    item.dataset.role = page === previous ? 'previous' : page === next ? 'next' : page === parent ? 'parent' : 'child';
    const link = pageLink(page, currentId);
    link.className = 'mc-related__link';
    link.replaceChildren(element('span', 'mc-related__role', role), element('span', 'mc-related__title', page.title));
    item.append(link);
    list.append(item);
  }
  container.replaceChildren(list);
}

/** Toda la navegación usa IDs del catálogo, nunca títulos para construir rutas. */
export function renderNavigation(allPages, navigation, currentId, visibility) {
  const pages = visibility ? allPages.filter(page => page.id === 'admin' || visibility.isVisible('page:' + page.id)) : allPages;
  const allById = new Map(allPages.map(page => [page.id, page]));
  const byId = new Map(pages.map((page) => [page.id, page]));
  const resolveIds = (ids) => ids.map((id) => {
    const page = allById.get(id);
    if (!page) throw new Error(`ID de navegación desconocido: ${id}`);
    return page;
  }).filter(page => byId.has(page.id));

  appendLinks(document.querySelector('[data-primary-navigation]'), resolveIds(navigation.primary), currentId);
  appendLinks(document.querySelector('[data-footer-navigation]'), resolveIds(navigation.footer), currentId);

  // Barra inferior de móvil: oculta las secciones no visibles y marca la sección que contiene la página.
  const sectionOf = new Set();
  for (let page = allById.get(currentId); page; page = allById.get(page.parentId)) sectionOf.add(page.id);
  for (const link of document.querySelectorAll('[data-nav-section]')) {
    link.hidden = !byId.has(link.dataset.navSection);
    if (sectionOf.has(link.dataset.navSection) && (link.dataset.navSection !== 'home' || currentId === 'home')) link.setAttribute('aria-current', 'page');
    else link.removeAttribute('aria-current');
  }

  renderCourseMenu(document.querySelector('[data-course-navigation]'), pages, currentId);

  const current = byId.get(currentId);
  if (!current) return;
  const ancestors = [];
  let parent = byId.get(current.parentId);
  while (parent) {
    ancestors.unshift(parent);
    parent = byId.get(parent.parentId);
  }
  appendLinks(document.querySelector('[data-breadcrumbs]'), [...ancestors, current], currentId);

  let related = pages.filter((page) => page.parentId === current.id && page.kind !== 'topic');
  const parentPage = byId.get(current.parentId);
  let previous = null, next = null;
  if (parentPage && parentPage.id !== 'home') {
    const siblings = pages.filter((page) => page.parentId === current.parentId);
    const position = siblings.findIndex((page) => page.id === currentId);
    previous = siblings[position - 1] ?? null; next = siblings[position + 1] ?? null;
    related = [previous, parentPage, next, ...related].filter(Boolean);
  }
  const uniqueRelated = [...new Map(related.map((page) => [page.id, page])).values()];
  const relatedContainer = document.querySelector('[data-context-navigation]');
  const relatedGroup = document.querySelector('[data-context-group]');
  renderRelated(relatedContainer, uniqueRelated, { previous, parent: parentPage, next }, currentId);
  if (relatedGroup) relatedGroup.hidden = uniqueRelated.length === 0;
}

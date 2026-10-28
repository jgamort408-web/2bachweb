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

  const topicsContainer = document.querySelector('[data-course-navigation]');
  if (topicsContainer) {
    const list = document.createElement('ul');
    for (const topic of pages.filter((page) => page.kind === 'topic')) {
      const item = document.createElement('li');
      const details = document.createElement('details');
      const summary = document.createElement('summary');
      summary.textContent = topic.title;
      const children = pages.filter((page) => page.parentId === topic.id);
      details.open = topic.id === currentId || children.some((page) => page.id === currentId);
      const links = document.createElement('div');
      appendLinks(links, [topic, ...children], currentId);
      details.append(summary, links);
      item.append(details);
      list.append(item);
    }
    topicsContainer.replaceChildren(list);
  }

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
  if (parentPage && parentPage.id !== 'home') {
    const siblings = pages.filter((page) => page.parentId === current.parentId);
    const position = siblings.findIndex((page) => page.id === currentId);
    related = [siblings[position - 1], parentPage, siblings[position + 1], ...related].filter(Boolean);
  }
  const uniqueRelated = [...new Map(related.map((page) => [page.id, page])).values()];
  const relatedContainer = document.querySelector('[data-context-navigation]');
  const relatedGroup = document.querySelector('[data-context-group]');
  appendLinks(relatedContainer, uniqueRelated, currentId);
  if (relatedGroup) relatedGroup.hidden = uniqueRelated.length === 0;
}

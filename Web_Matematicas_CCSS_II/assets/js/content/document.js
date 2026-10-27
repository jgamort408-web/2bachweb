import { projectRoot, projectUrl } from '../core/paths.js';
import { canUseCurrentPage, previewToken } from './runtime.js';

const hiddenByVisibility = new Map();
const hiddenByRoute = new Map();
const routeMaps = new WeakMap();
let notice, initiallyUnavailable = false;

function hide(node, hidden, records = hiddenByVisibility) {
  if (hidden) {
    if (!records.has(node)) records.set(node, node.hidden);
    node.hidden = true;
  } else if (records.has(node)) {
    node.hidden = records.get(node) || (records !== hiddenByRoute && hiddenByRoute.has(node));
    records.delete(node);
  }
}

export function showPageAvailability(context, { keepActiveGame = false, initial = false, failed = false } = {}) {
  const main = document.querySelector('main');
  if (!main) return;
  const shell = ['admin', 'not-found'].includes(document.body.dataset.pageId);
  const available = !failed && (shell || canUseCurrentPage(context));
  if (initial && document.documentElement.dataset.contentState === 'error') initiallyUnavailable = true;
  if (initial && !available) initiallyUnavailable = true;
  const waitingReload = initiallyUnavailable && available && !shell;
  const blocked = (!available && !keepActiveGame) || waitingReload;
  if (!notice) {
    notice = document.createElement('section');
    notice.dataset.contentAvailability = '';
    notice.setAttribute('role', 'status');
    main.prepend(notice);
  }
  const focused = document.activeElement;
  for (const child of main.children) if (child !== notice) hide(child, blocked, hiddenByRoute);
  notice.hidden = !blocked && !keepActiveGame && !context?.snapshot.warning;
  if (!notice.hidden) {
    const title = document.createElement('h2'), message = document.createElement('p');
    title.textContent = blocked ? 'Contenido no disponible' : 'Aviso de disponibilidad';
    message.textContent = failed ? 'No se ha podido comprobar la disponibilidad. Vuelve a intentarlo.'
      : waitingReload ? 'Este contenido vuelve a estar disponible. Recarga la página para abrirlo.'
      : blocked ? 'Este contenido todavía no está disponible. Puedes volver al inicio y elegir otro apartado.'
      : keepActiveGame ? 'La actividad se ha ocultado. Puedes terminar esta partida; no se podrán iniciar otras.'
      : 'No se ha podido actualizar la disponibilidad. Se utiliza una copia anterior de la configuración.';
    const home = document.createElement('a');
    home.href = projectUrl('index.html'); home.textContent = 'Volver al inicio';
    notice.replaceChildren(title, message, home);
    if (failed || waitingReload) {
      const retry = document.createElement('button');
      retry.type = 'button'; retry.textContent = 'Volver a cargar';
      retry.addEventListener('click', () => location.reload());
      notice.append(' ', retry);
    }
    if (blocked && focused && main.contains(focused) && focused !== document.body) {
      notice.tabIndex = -1; notice.focus();
    }
  }
  document.documentElement.classList.remove('content-pending');
  document.documentElement.dataset.contentState = failed ? 'error' : blocked ? 'unavailable' : 'available';
}

export function filterDocumentLinks(context) {
  for (const block of document.querySelectorAll('[data-content-id]')) {
    if (!block.closest('[data-admin-panel]')) hide(block, !context.model.isVisible(block.dataset.contentId));
  }
  if (['t07-questions', 't09-questions'].includes(document.body.dataset.pageId)) {
    for (const section of document.querySelectorAll('main > section:not([data-content-availability])')) {
      const blocks = [...section.querySelectorAll('[data-content-id]')];
      if (blocks.length) hide(section, blocks.every(block => block.hidden));
    }
  }
  let routes = routeMaps.get(context);
  if (!routes) {
    routes = new Map();
    for (const entity of context.catalog.entities) {
      for (const path of [entity.path, entity.widgetPath].filter(Boolean)) routes.set(new URL(path, projectRoot).pathname, entity.id);
    }
    routeMaps.set(context, routes);
  }
  const touched = new Set();
  for (const link of document.querySelectorAll('a[href]')) {
    if (link.closest('[data-admin-panel], [data-content-availability]')) continue;
    const url = new URL(link.href);
    if (url.origin !== location.origin || !url.pathname.startsWith(projectRoot.pathname)) continue;
    const path = url.pathname.endsWith('/') ? url.pathname + 'index.html' : url.pathname;
    const id = routes.get(path);
    if (!id) continue;
    const topic = url.searchParams.get('tema');
    const topicVisible = !topic || context.model.isVisible('page:' + topic);
    const visible = (id === 'page:admin' || context.model.isVisible(id)) && topicVisible;
    hide(link, !visible);
    const group = link.closest('li, .course-card');
    const navigation = link.closest('nav, [data-course-index], [data-topic-index], [data-content-role="related-links"]');
    // A hidden cross-reference must not erase a paragraph or a mathematical argument.
    if (group && (group.classList.contains('course-card') || navigation
      || ['home', 'labs'].includes(document.body.dataset.pageId))) touched.add(group);
    if (context.preview && id.startsWith('page:')) {
      url.searchParams.set('vista-previa', previewToken()); link.href = url.href;
    }
  }
  for (const group of touched) {
    const links = [...group.querySelectorAll('a[href]')];
    hide(group, links.length > 0 && links.every(link => link.hidden));
  }
  if (document.body.dataset.pageId === 'home') {
    for (const section of document.querySelectorAll('main > section:not([data-content-availability])')) {
      const links = [...section.querySelectorAll('a[href]')];
      if (links.length) hide(section, links.every(link => link.hidden));
    }
  }
}

export function observeDocumentAvailability(context, { activeGame = () => false } = {}) {
  const apply = (initial = false) => {
    showPageAvailability(context, { initial, keepActiveGame: !canUseCurrentPage(context) && activeGame() });
    filterDocumentLinks(context);
  };
  apply(true);
  const unsubscribe = context.subscribe(() => apply());
  const check = () => apply();
  window.addEventListener('learning:availability-check', check);
  let scheduled = false;
  const observer = new MutationObserver(() => {
    if (scheduled) return;
    scheduled = true;
    queueMicrotask(() => { scheduled = false; filterDocumentLinks(context); });
  });
  observer.observe(document.body, { childList: true, subtree: true });
  return () => { observer.disconnect(); unsubscribe(); window.removeEventListener('learning:availability-check', check); };
}

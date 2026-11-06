// Plantilla de lección del nuevo diseño (fase 3, L04). Solo actúa en <html data-skin="mc"> y <main class="mc-lesson">.
// No cambia textos ni enlaces: añade la cabecera visual de cada caja según su data-content-role, convierte el
// índice de apartados en columna fija (desplegable en móvil), muestra el progreso de lectura y añade anterior/siguiente.
import { projectUrl } from './paths.js';
import { getContentContext, pageRecords } from '../content/runtime.js';

const roles = {
  theory: ['theory', 'Concepto', 'mc-definicion'],
  reference: ['theory', 'Referencia', 'mc-fuente'],
  visualization: ['theory', 'Explora', 'mc-objetivo'],
  method: ['method', 'Método', 'mc-metodo'],
  'worked-example': ['example', 'Ejemplo resuelto', 'mc-ejemplo'],
  'common-errors': ['error', 'Errores frecuentes', 'mc-error'],
  'guided-practice': ['practice', 'Practica', 'mc-practica'],
  practice: ['practice', 'Practica', 'mc-practica'],
  summary: ['summary', 'Resumen', 'mc-resumen'],
  warning: ['summary', 'Alcance', 'mc-aviso']
};

function icon(name) {
  const svg = document.createElementNS('http://www.w3.org/2000/svg', 'svg');
  const use = document.createElementNS('http://www.w3.org/2000/svg', 'use');
  svg.setAttribute('class', 'mc-icon'); svg.setAttribute('aria-hidden', 'true');
  use.setAttribute('href', projectUrl('assets/icons/sprite.svg#' + name));
  svg.append(use);
  return svg;
}

/** Cada sección de primer nivel con rol conocido se convierte en caja con pastilla y etiqueta. */
function decorateBoxes(main) {
  for (const section of main.querySelectorAll(':scope > section[data-content-role]')) {
    const role = roles[section.dataset.contentRole];
    if (!role || section.classList.contains('mc-box')) continue;
    const [variant, label, iconName] = role;
    section.classList.add('mc-box', 'mc-box--' + variant);
    const head = document.createElement('div'), pill = document.createElement('span');
    head.className = 'mc-box__head'; head.setAttribute('aria-hidden', 'true');
    pill.className = 'mc-pill'; pill.append(icon(iconName));
    head.append(pill, label);
    section.prepend(head);
  }
}

/** El índice de apartados (enlaces separados por « · ») pasa a lista; en escritorio queda fijo a la izquierda. */
function buildToc(main) {
  const nav = main.querySelector(':scope > nav[data-content-role="related-links"], :scope > nav.lesson-index');
  if (!nav || nav.classList.contains('mc-toc')) return;
  const links = [...nav.querySelectorAll('a[href^="#"]')];
  if (links.length < 2) return;
  const details = document.createElement('details'), summary = document.createElement('summary'), list = document.createElement('ol');
  summary.textContent = 'En esta lección';
  for (const link of links) { const item = document.createElement('li'); item.append(link); list.append(item); }
  details.append(summary, list);
  nav.replaceChildren(details);
  nav.classList.add('mc-toc');
  const wide = window.matchMedia('(min-width: 64rem)');
  const sync = () => { details.open = wide.matches; };
  sync(); wide.addEventListener?.('change', sync);

  const targets = links.map(link => document.getElementById(decodeURIComponent(link.hash.slice(1)))).filter(Boolean);
  const mark = id => {
    for (const link of links) {
      if (decodeURIComponent(link.hash.slice(1)) === id) link.setAttribute('aria-current', 'true');
      else link.removeAttribute('aria-current');
    }
  };
  if ('IntersectionObserver' in window && targets.length) {
    const visible = new Map();
    const observer = new IntersectionObserver(entries => {
      for (const entry of entries) visible.set(entry.target.id, entry.isIntersecting);
      const current = targets.find(target => visible.get(target.id));
      if (current) mark(current.id);
    }, { rootMargin: '-20% 0px -60% 0px' });
    for (const target of targets) observer.observe(target);
  }
  // En móvil, elegir un apartado cierra el desplegable.
  list.addEventListener('click', event => { if (event.target.closest('a') && !wide.matches) details.open = false; });
}

/** Barra de progreso de lectura bajo la cabecera común, con el color del bloque. */
function readingBar() {
  const attach = () => {
    const header = document.querySelector('#site-header .mc-header');
    if (!header || header.querySelector('.mc-reading-bar')) return Boolean(header);
    const bar = document.createElement('div'), fill = document.createElement('span');
    bar.className = 'mc-reading-bar'; bar.setAttribute('aria-hidden', 'true'); bar.append(fill);
    header.append(bar);
    const update = () => {
      const max = document.documentElement.scrollHeight - innerHeight;
      bar.style.setProperty('--mc-read', (max > 0 ? Math.min(100, (scrollY / max) * 100) : 0).toFixed(1) + '%');
    };
    addEventListener('scroll', update, { passive: true }); addEventListener('resize', update); update();
    return true;
  };
  if (attach()) return;
  const host = document.getElementById('site-header');
  if (!host) return;
  const observer = new MutationObserver(() => { if (attach()) observer.disconnect(); });
  observer.observe(host, { childList: true, subtree: true });
}

/** Anterior y siguiente dentro del tema, desde el catálogo y respetando la visibilidad.
 *  Va justo después de <main>: es navegación de página y dentro de main solo hay un nav, el índice de apartados. */
async function pager(main) {
  const context = await getContentContext();
  const render = () => {
    main.parentElement.querySelector(':scope > .mc-pager')?.remove();
    const pages = pageRecords(context).filter(page => context.model.isVisible('page:' + page.id));
    const current = pages.find(page => page.id === document.body.dataset.pageId);
    if (!current) return;
    const siblings = pages.filter(page => page.parentId === current.parentId && page.kind === current.kind);
    const index = siblings.findIndex(page => page.id === current.id);
    const parent = pages.find(page => page.id === current.parentId);
    const previous = siblings[index - 1] ?? parent, next = siblings[index + 1];
    if (!previous && !next) return;
    const nav = document.createElement('nav');
    nav.className = 'mc-pager mc-pager--page'; nav.setAttribute('aria-label', 'Lección anterior y siguiente');
    for (const [page, rel, text] of [[previous, 'prev', '← Anterior'], [next, 'next', 'Siguiente →']]) {
      if (!page) continue;
      const link = document.createElement('a'), hint = document.createElement('span');
      link.href = projectUrl(page.path); link.rel = rel; hint.textContent = text;
      link.append(hint, page.title);
      nav.append(link);
    }
    main.after(nav);
  };
  render(); context.subscribe(render);
}

export function applyLessonSkin() {
  if (document.documentElement.dataset.skin !== 'mc') return;
  // Páginas generales migradas (test, tarjetas, practicar…): solo cajas por rol.
  const page = document.querySelector('main.mc-page');
  if (page) decorateBoxes(page);
  const main = document.querySelector('main.mc-lesson');
  if (!main) return;
  decorateBoxes(main);
  buildToc(main);
  readingBar();
  pager(main).catch(error => console.warn('[Lección]', error.message));
}

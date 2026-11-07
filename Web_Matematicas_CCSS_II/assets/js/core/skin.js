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
// Lecciones antiguas sin data-content-role: el rol visual se deduce del título y se guarda aparte (data-skin-role).
const inferred = [
  [/^\d*\.?\s*ejemplos? resueltos?/i, 'worked-example'],
  [/^\d*\.?\s*pr[aá]ctica/i, 'guided-practice'],
  [/^\d*\.?\s*errores frecuentes/i, 'common-errors'],
  [/^\d*\.?\s*(resumen|antes de seguir)/i, 'summary'],
  [/^\d*\.?\s*m[eé]todo/i, 'method']
];

function decorateBoxes(main) {
  for (const section of main.querySelectorAll(':scope > section:not([data-content-role])')) {
    const title = section.querySelector(':scope > h2')?.textContent.trim() ?? '';
    const match = inferred.find(([pattern]) => pattern.test(title));
    if (match) section.dataset.skinRole = match[1];
  }
  for (const section of main.querySelectorAll(':scope > section:is([data-content-role], [data-skin-role])')) {
    const role = roles[section.dataset.contentRole ?? section.dataset.skinRole];
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

/** Lecciones sin índice propio: se crea desde los títulos de las secciones (al menos tres), con id si les falta. */
function generatedToc(main) {
  const sections = [...main.querySelectorAll(':scope > section')].filter(section => section.querySelector(':scope > h2'));
  if (sections.length < 3) return null;
  const used = new Set([...document.querySelectorAll('[id]')].map(element => element.id));
  const nav = document.createElement('nav');
  nav.setAttribute('aria-label', 'Apartados de la lección');
  for (const section of sections) {
    const title = section.querySelector(':scope > h2').textContent.trim();
    if (!section.id) {
      const base = 'apartado-' + title.toLowerCase().normalize('NFD').replace(/\p{Diacritic}/gu, '').replace(/[^a-z0-9]+/g, '-').replace(/^-+|-+$/g, '').slice(0, 40);
      let id = base, n = 2;
      while (used.has(id)) id = base + '-' + n++;
      section.id = id; used.add(id);
    }
    const link = document.createElement('a');
    link.href = '#' + section.id; link.textContent = title.replace(/^\d+\.\s*/, '');
    nav.append(link);
  }
  sections[0].before(nav);
  return nav;
}

/** El índice de apartados (enlaces separados por « · ») pasa a lista; en escritorio queda fijo a la izquierda. */
function buildToc(main) {
  const nav = main.querySelector(':scope > nav[data-content-role="related-links"], :scope > nav.lesson-index') ?? generatedToc(main);
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
    (main.parentElement.querySelector(':scope > .mc-glossary-links') ?? main).after(nav);
  };
  render(); context.subscribe(render);
}

/** Términos de esta lección en el glosario (config/glossary.json), entre el contenido y anterior/siguiente. */
async function glossaryLinks(main) {
  const response = await fetch(projectUrl('config/glossary.json'));
  if (!response.ok) return;
  const { terms } = await response.json();
  const mine = terms.filter(entry => entry.page === document.body.dataset.pageId);
  if (!mine.length) return;
  const nav = document.createElement('nav'), box = document.createElement('div'), title = document.createElement('h2');
  nav.className = 'mc-glossary-links'; nav.setAttribute('aria-labelledby', 'glosario-de-la-leccion');
  title.id = 'glosario-de-la-leccion'; title.textContent = 'En el glosario';
  box.append(title);
  for (const { term } of mine) {
    const link = document.createElement('a');
    // Mismo identificador que scripts/build-glossary.mjs (termId).
    link.href = projectUrl('herramientas/glosario.html') + '#termino-' + term.toLowerCase().normalize('NFD').replace(/\p{Diacritic}/gu, '').replace(/[^a-z0-9]+/g, '-').replace(/^-|-$/g, '');
    // Nombre accesible único: «Covarianza (glosario)» no se confunde con el apartado «Covarianza» del índice.
    const hint = document.createElement('span');
    hint.className = 'mc-visually-hidden'; hint.textContent = ' (glosario)';
    link.append(term, hint);
    box.append(link);
  }
  nav.append(box);
  main.after(nav);
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
  glossaryLinks(main).catch(error => console.warn('[Glosario]', error.message)).finally(() =>
    pager(main).catch(error => console.warn('[Lección]', error.message)));
}

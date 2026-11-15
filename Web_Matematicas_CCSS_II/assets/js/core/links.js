// Enlaces del contenido con el estilo del diseño (components.css, «Enlaces del contenido»).
// El texto corrido solo necesita CSS. Aquí se reconocen los grupos que son únicamente enlaces:
//   · párrafo o nav con enlaces separados por « · » (o uno solo) → fichas (.mc-linkset);
//   · lista cuyos elementos son solo un enlace → fichas dentro de un nav, filas fuera (.mc-linklist).
// Los separadores siguen en el DOM (ocultos a la vista y al lector) para no cambiar el texto de la página.

const SEPARATOR = /^[\s·|•,]*$/;
const SKIP = '.mc-toc, .mc-slide, [data-slides], [data-course-index], [data-topic-index], .mc-route, header, footer, .mc-popover, table';
const NEXT = /^(Continuar|Siguiente)/i;
const BACK = /^(Anterior|Volver)/i;

const plainLink = node => node.nodeType === Node.ELEMENT_NODE && node.localName === 'a' && !node.className;
const onlyText = node => node.nodeType === Node.TEXT_NODE || node.nodeType === Node.COMMENT_NODE;

function markDirection(link) {
  const text = link.textContent.trim();
  if (BACK.test(text)) link.dataset.linkDirection = 'back';
  else if (NEXT.test(text)) link.dataset.linkDirection = 'next';
}

/** Párrafo o nav formado solo por enlaces sin clase y separadores. */
function linkGroup(element) {
  const nodes = [...element.childNodes];
  if (!nodes.some(plainLink)) return null;
  for (const node of nodes) {
    if (plainLink(node)) continue;
    if (onlyText(node) && SEPARATOR.test(node.textContent)) continue;
    return null;
  }
  return nodes;
}

/** Lista en la que cada elemento contiene exactamente un enlace sin clase y nada más. */
function linkList(list) {
  const items = [...list.children];
  return items.length > 0 && items.every(item => item.localName === 'li'
    && [...item.childNodes].every(node => plainLink(node) || (onlyText(node) && !node.textContent.trim()))
    && item.querySelectorAll(':scope > a').length === 1);
}

export function enhanceContentLinks(root = document.querySelector('main')) {
  if (!root || document.documentElement.dataset.skin !== 'mc') return;
  for (const element of root.querySelectorAll('p, nav')) {
    if (element.closest(SKIP) || element.classList.contains('mc-linkset')) continue;
    const nodes = linkGroup(element);
    if (!nodes) continue;
    for (const node of nodes) {
      if (plainLink(node)) { markDirection(node); continue; }
      if (!node.textContent.trim() || node.nodeType !== Node.TEXT_NODE) continue;
      const separator = document.createElement('span');
      separator.className = 'mc-linkset__sep';
      separator.setAttribute('aria-hidden', 'true');
      node.replaceWith(separator); separator.append(node);
    }
    element.classList.add('mc-linkset');
  }
  for (const list of root.querySelectorAll('ul, ol')) {
    if (list.closest(SKIP) || list.closest('.mc-linkset, .mc-linklist') || !linkList(list)) continue;
    list.querySelectorAll(':scope > li > a').forEach(markDirection);
    list.classList.add(list.closest('nav') ? 'mc-linkset' : 'mc-linklist');
  }
}

// Menús de la cabecera. Temario y Páginas relacionadas se abren como paneles flotantes bajo su botón: solo uno a la
// vez, y se cierran con Esc, al pulsar fuera o al elegir un enlace. «Opciones de lectura» (botón «Aa») abre su franja
// en el flujo de la cabecera: se cierra con su botón, con «Cerrar» o con Esc desde la propia franja, y sigue abierta
// mientras se lee para ver el efecto de cada ajuste.
export function mountHeaderMenus(header) {
  if (!header || header.dataset.menusReady) return;
  header.dataset.menusReady = 'true';
  const popovers = () => [...header.querySelectorAll('details[data-header-menu]')];
  const all = () => [...popovers(), ...header.querySelectorAll('details[data-reading-controls]')];
  // toggle no burbujea: se escucha en fase de captura.
  header.addEventListener('toggle', event => {
    const opened = event.target;
    if (!(opened instanceof HTMLDetailsElement) || !opened.open || !all().includes(opened)) return;
    for (const other of popovers()) if (other !== opened) other.open = false;
    if (popovers().includes(opened)) fitPopover(opened);
  }, true);
  addEventListener('resize', () => { for (const menu of popovers()) if (menu.open) fitPopover(menu, false); });
  document.addEventListener('keydown', event => {
    if (event.key !== 'Escape') return;
    // La franja de lectura solo se cierra con Esc si el foco está en ella o en su botón.
    const tray = header.querySelector('[data-reading-tray]');
    const inReading = event.target instanceof Node && (tray?.contains(event.target) || event.target.closest?.('[data-reading-controls]'));
    const open = (inReading ? all() : popovers()).filter(menu => menu.open);
    if (!open.length) return;
    for (const menu of open) menu.open = false;
    open.at(-1).querySelector('summary')?.focus();
  });
  document.addEventListener('click', event => {
    for (const menu of popovers()) if (menu.open && !menu.contains(event.target)) menu.open = false;
  });
  header.addEventListener('click', event => {
    const link = event.target.closest('a[href]');
    if (link) for (const menu of popovers()) if (menu.contains(link)) menu.open = false;
  });
}

/**
 * Con el texto ampliado o en pantallas bajas, el panel podría quedar fuera de la vista o bajo la barra inferior del
 * móvil: se desplaza la página hasta su botón y se limita su altura al espacio libre (el panel tiene su propio scroll).
 */
function fitPopover(menu, scroll = true) {
  const panel = menu.querySelector('.mc-popover');
  if (!panel) return;
  panel.style.maxHeight = '';
  const tabbar = document.querySelector('.mc-tabbar');
  const reserve = tabbar && getComputedStyle(tabbar).display !== 'none' ? tabbar.getBoundingClientRect().height + 8 : 16;
  const fits = () => panel.getBoundingClientRect().bottom <= innerHeight - reserve;
  if (scroll && !fits()) {
    menu.querySelector('summary').scrollIntoView({ block: 'start', behavior: matchMedia('(prefers-reduced-motion: reduce)').matches ? 'auto' : 'instant' });
  }
  const available = innerHeight - reserve - panel.getBoundingClientRect().top;
  if (!fits()) panel.style.maxHeight = Math.max(160, Math.floor(available)) + 'px';
}

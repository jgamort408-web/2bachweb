import { projectUrl } from '../core/paths.js';

const start = document.querySelector('[data-geogebra-start]');
const stop = document.querySelector('[data-geogebra-stop]');
const host = document.querySelector('[data-geogebra-container]');
const status = document.querySelector('[data-geogebra-status]');
let frame;
let timer;
function removeFrame() {
  clearTimeout(timer);
  frame?.remove();
  frame = undefined;
}
function failed() {
  removeFrame(); // Discard the browsing context so late callbacks cannot revive a failed attempt.
  start.disabled = false;
  start.textContent = 'Reintentar GeoGebra';
  stop.hidden = true;
  status.textContent = 'No se ha podido cargar GeoGebra. Puedes reintentar o abrirlo en otra pestaña. Las soluciones siguen disponibles.';
}
if (start) {
  start.addEventListener('click', () => {
    if (frame) return;
    start.disabled = true;
    stop.hidden = false;
    status.textContent = 'Cargando GeoGebra…';
    frame = document.createElement('iframe');
    frame.title = 'Laboratorio gráfico de GeoGebra';
    frame.className = 'learning-widget geogebra-frame';
    frame.src = projectUrl('widgets/shared/geogebra/index.html');
    host.append(frame);
    timer = setTimeout(failed, 35000);
  });
  stop.addEventListener('click', () => {
    removeFrame();
    start.disabled = false;
    start.textContent = 'Cargar GeoGebra';
    stop.hidden = true;
    status.textContent = 'Laboratorio cerrado. Su construcción no se guarda al cerrarlo.';
    start.focus();
  });
  window.addEventListener('message', (event) => {
    if (!frame || event.origin !== location.origin || event.source !== frame.contentWindow) return;
    if (event.data?.type === 'ccss-geogebra-ready') {
      clearTimeout(timer);
      status.textContent = 'GeoGebra listo. Escribe tus inecuaciones en su entrada.';
    } else if (event.data?.type === 'ccss-geogebra-error') failed();
  });
}

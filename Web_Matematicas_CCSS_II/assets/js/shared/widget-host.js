import { projectUrl } from '../core/paths.js';
import { getPreferences } from '../core/preferences.js';
import { previewToken } from '../content/runtime.js';

/** Inserta un widget local de config/widgets.json cuando una página lo necesite. */
export function mountWidget(container, widget, context) {
  const frame = document.createElement('iframe');
  frame.src = projectUrl(widget.path);
  if (context?.preview) {
    const url = new URL(frame.src); url.searchParams.set('vista-previa', previewToken()); frame.src = url.href;
  }
  frame.title = widget.title;
  frame.loading = 'lazy';
  frame.className = 'learning-widget';
  const origin = new URL(frame.src).origin;
  const sendPreferences = () => frame.contentWindow?.postMessage({
    channel: 'math-widget', type: 'preferences', widgetId: widget.id, preferences: getPreferences(),
  }, origin);

  const receiveMessage = (event) => {
    if (event.source !== frame.contentWindow || event.origin !== origin) return;
    const message = event.data;
    if (message?.channel !== 'math-widget' || message.widgetId !== widget.id) return;
    if (message.type === 'ready') sendPreferences();
    if (message.type === 'session') {
      document.documentElement.dataset.gameSession = message.active ? 'active' : 'idle';
      window.dispatchEvent(new Event('learning:availability-check'));
    }
    if (message.type === 'resize' && Number.isFinite(message.height)) {
      // Formularios y texto ampliado pueden superar 1600 px en móvil.
      // Se conserva una cota para ignorar alturas desproporcionadas.
      frame.style.height = `${Math.max(120, Math.min(8000, message.height))}px`;
    }
  };

  window.addEventListener('message', receiveMessage);
  window.addEventListener('reading:changed', sendPreferences);
  frame.addEventListener('load', sendPreferences);
  container.append(frame);
  return {
    frame,
    destroy() {
      window.removeEventListener('message', receiveMessage);
      window.removeEventListener('reading:changed', sendPreferences);
      frame.removeEventListener('load', sendPreferences);
      frame.remove();
    },
  };
}

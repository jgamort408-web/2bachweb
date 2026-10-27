import { observeMath } from '../../assets/js/core/math.js';
import { initializePreferences, mountPreferenceControls, setPreferences } from '../../assets/js/core/preferences.js';
import { getContentContext, canUseCurrentPage } from '../../assets/js/content/runtime.js';
import { observeDocumentAvailability, showPageAvailability } from '../../assets/js/content/document.js';

let widgetContext, sessionActive = false, currentWidgetId;
function reportSession() {
  if (window.parent !== window) window.parent.postMessage({
    channel: 'math-widget', type: 'session', widgetId: currentWidgetId, active: sessionActive
  }, location.origin);
}

export function canStartWidgetSession() {
  if (!widgetContext || !canUseCurrentPage(widgetContext)) {
    sessionActive = false; reportSession();
    if (widgetContext) showPageAvailability(widgetContext);
    return false;
  }
  sessionActive = true; reportSession();
  return true;
}

/** Comunicación con el anfitrión y fórmulas para cada widget independiente. */
export async function initializeWidget(widgetId) {
  currentWidgetId = widgetId;
  initializePreferences();
  let controls;
  if (window.parent === window) {
    const container = document.createElement('div');
    document.body.prepend(container);
    controls = mountPreferenceControls(container);
  }
  try { widgetContext = await getContentContext(); }
  catch {
    showPageAvailability(null, { failed: true, initial: true });
    return false;
  }
  const stopAvailability = observeDocumentAvailability(widgetContext, { activeGame: () => sessionActive });
  if (!canUseCurrentPage(widgetContext)) return false;
  document.addEventListener('learning:session-start', canStartWidgetSession);
  document.addEventListener('learning:session-blocked', () => {
    sessionActive = false; reportSession(); showPageAvailability(widgetContext);
  });
  const receivePreferences = (event) => {
    if (window.parent === window || event.source !== window.parent || event.origin !== window.location.origin) return;
    const message = event.data;
    if (message?.channel !== 'math-widget' || message.type !== 'preferences' || message.widgetId !== widgetId) return;
    if (!message.preferences || typeof message.preferences !== 'object') return;
    setPreferences(message.preferences, { persist: false });
  };
  window.addEventListener('message', receivePreferences);
  let stopMath = observeMath();
  const notify = (type, extra = {}) => {
    if (window.parent === window) return;
    window.parent.postMessage({ channel: 'math-widget', type, widgetId, ...extra }, window.location.origin);
  };

  const observer = new ResizeObserver(() => {
    notify('resize', { height: Math.ceil(document.body.getBoundingClientRect().height) });
  });
  observer.observe(document.body);
  notify('ready');
  const suspend = () => { observer.disconnect(); stopMath(); };
  const resume = (event) => {
    if (!event.persisted) return;
    stopMath = observeMath();
    observer.observe(document.body);
    notify('ready');
  };
  window.addEventListener('pagehide', suspend);
  window.addEventListener('pageshow', resume);
  const cleanup = () => {
    suspend(); controls?.(); stopAvailability();
    document.removeEventListener('learning:session-start', canStartWidgetSession);
    window.removeEventListener('pagehide', suspend);
    window.removeEventListener('pageshow', resume);
    window.removeEventListener('message', receivePreferences);
  };
  return cleanup;
}

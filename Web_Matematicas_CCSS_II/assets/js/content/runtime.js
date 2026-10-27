import { projectUrl } from '../core/paths.js';
import { loadProjectCatalog } from './project-catalog.js';
import { createContentRepository } from './repository.js';
import { createVisibilityModel, validateVisibilityConfig } from './visibility.js';
import { createStaticVisibilityRepository } from '../admin/visibility-repository.js';

let contextPromise;
export const isLoopback = () => ['localhost', '127.0.0.1', '[::1]'].includes(location.hostname);
export const previewToken = () => new URL(location.href).searchParams.get('vista-previa');

function requestPreview(catalog, token) {
  return new Promise((resolve, reject) => {
    const timeout = setTimeout(() => finish(new Error('No se pudo conectar con la vista previa')), 4000);
    function finish(error, config) {
      clearTimeout(timeout); window.removeEventListener('message', receive);
      if (error) reject(error); else resolve(config);
    }
    function receive(event) {
      if (event.origin !== location.origin || event.source !== window.parent) return;
      const data = event.data;
      if (data?.channel !== 'ccss-preview' || data.type !== 'config' || data.token !== token) return;
      try { finish(null, validateVisibilityConfig(data.config, catalog)); }
      catch (error) { finish(error); }
    }
    window.addEventListener('message', receive);
    window.parent.postMessage({ channel: 'ccss-preview', type: 'request', token }, location.origin);
  });
}

export function getContentContext() {
  if (contextPromise) return contextPromise;
  contextPromise = (async () => {
    const controller = new AbortController();
    let timer;
    const deadline = new Promise((_, reject) => {
      timer = setTimeout(() => { controller.abort(); reject(new Error('No se pudo cargar el catálogo a tiempo')); }, 10000);
    });
    let catalog;
    try { catalog = await Promise.race([loadProjectCatalog({ signal: controller.signal }), deadline]); }
    finally { clearTimeout(timer); }
    const repository = createContentRepository(catalog);
    const visibilityRepository = createStaticVisibilityRepository({ catalog, url: projectUrl('config/visibility.json') });
    const token = previewToken();
    const preview = Boolean(token && isLoopback() && window.parent !== window);
    let snapshot = preview
      ? { config: await requestPreview(catalog, token), origin: 'development-preview', warning: null }
      : await visibilityRepository.readPublicConfig();
    let model = createVisibilityModel(catalog, snapshot.config);
    const listeners = new Set();
    function notify() { for (const listener of [...listeners]) listener(context); }
    function accept(next) {
      if (JSON.stringify(next) === JSON.stringify(snapshot)) return;
      snapshot = next; model = createVisibilityModel(catalog, next.config); notify();
    }
    let refreshPromise, lastRefresh = Date.now(), poll;
    const context = Object.freeze({
      catalog, repository, visibilityRepository, preview,
      get snapshot() { return snapshot; },
      get model() { return model; },
      subscribe(listener) { listeners.add(listener); return () => listeners.delete(listener); },
      async refresh() {
        if (preview) return snapshot;
        if (refreshPromise) return refreshPromise;
        lastRefresh = Date.now();
        refreshPromise = (async () => {
          const next = await visibilityRepository.readPublicConfig();
          // An outage must not reopen content hidden in this document's last valid publication.
          if (next.warning && ['static', 'last-known'].includes(snapshot.origin)) {
            accept({ config: snapshot.config, origin: 'last-known', warning: next.warning });
          } else accept(next);
          return snapshot;
        })();
        try { return await refreshPromise; } finally { refreshPromise = null; }
      }
    });
    function requestRefresh() {
      if (document.visibilityState === 'visible' && Date.now() - lastRefresh > 5000) context.refresh().catch(() => {});
    }
    function schedule() {
      clearTimeout(poll);
      if (preview) return;
      poll = setTimeout(async () => {
        if (document.visibilityState === 'visible') await context.refresh().catch(() => {});
        schedule();
      }, 30000 + Math.random() * 3000);
    }
    window.addEventListener('focus', requestRefresh);
    window.addEventListener('online', requestRefresh);
    document.addEventListener('visibilitychange', requestRefresh);
    window.addEventListener('pagehide', () => clearTimeout(poll));
    window.addEventListener('pageshow', schedule);
    // A preview can forward the same public draft to its own widget iframe.
    window.addEventListener('message', event => {
      if (event.origin !== location.origin || !preview) return;
      const data = event.data;
      if (data?.channel !== 'ccss-preview' || data.token !== token) return;
      if (data.type === 'config' && event.source === window.parent) {
        try { accept({ config: validateVisibilityConfig(data.config, catalog), origin: 'development-preview', warning: null }); }
        catch { /* Invalid messages cannot replace a valid preview. */ }
      }
      if (data.type === 'request' && [...document.querySelectorAll('iframe')].some(frame => frame.contentWindow === event.source)) {
        event.source.postMessage({ channel: 'ccss-preview', type: 'config', token, config: snapshot.config }, location.origin);
      }
    });
    schedule();
    return context;
  })();
  return contextPromise;
}

export function currentEntityId(context) {
  if (document.body.dataset.widgetId) return context.repository.entityIdFor('widget', document.body.dataset.widgetId);
  return context.repository.entityIdFor('page', document.body.dataset.pageId);
}

export function pageRecords(context) {
  return context.catalog.entities.filter(entity => entity.id.startsWith('page:')).map(entity => ({
    id: entity.sourceId, title: entity.title, path: entity.path,
    parentId: entity.parentId?.replace(/^page:/, '') ?? null,
    kind: entity.kind === 'widget' ? 'widget-host' : entity.kind, reviewStatus: entity.reviewStatus
  }));
}

export function canUseCurrentPage(context) {
  return context.model.isVisible(currentEntityId(context));
}

export function visibleActivities(context, kind, items) {
  if (!canUseCurrentPage(context)) return [];
  return items.filter(item => {
    const id = context.repository.entityIdFor(kind, item.id);
    // Generated questions and HTML explorers inherit their owner page; they have no bank entry.
    return id ? context.model.isVisible(id) : true;
  });
}

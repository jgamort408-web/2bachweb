import { immutableCopy, requireValue } from '../content/contracts.js';
import { validateCatalog } from '../content/catalog.js';
import { DEFAULT_VISIBILITY_CONFIG, validateVisibilityConfig } from '../content/visibility.js';

export class VersionConflictError extends Error {
  constructor(expectedVersion, actualVersion) {
    super('La configuración cambió: vuelve a comparar el borrador con la versión publicada.');
    this.name = 'VersionConflictError';
    this.code = 'version-conflict';
    this.expectedVersion = expectedVersion;
    this.actualVersion = actualVersion;
  }
}

export class RepositoryUnavailableError extends Error {
  constructor() {
    super('Este adaptador no admite guardado ni sincronización central.');
    this.name = 'RepositoryUnavailableError';
    this.code = 'repository-unavailable';
  }
}

function snapshot(config, origin, warning = null) {
  return immutableCopy({ config, origin, warning });
}

// Explicitly a test/development adapter: memory belongs to this instance only.
export function createMemoryVisibilityRepository({ catalog: input, initialConfig, onSubscriberError = () => {} }) {
  const catalog = validateCatalog(input);
  let current = validateVisibilityConfig(initialConfig, catalog);
  const listeners = new Set();
  return Object.freeze({
    capabilities: Object.freeze({ write: true, subscribe: true, history: false, persistence: 'memory' }),
    async readPublicConfig() { return snapshot(current, 'development-memory'); },
    async save(candidateInput, expectedVersion) {
      requireValue(Number.isSafeInteger(expectedVersion) && expectedVersion >= 0, 'expectedVersion inválida');
      const candidate = validateVisibilityConfig(candidateInput, catalog);
      if (expectedVersion !== current.version) throw new VersionConflictError(expectedVersion, current.version);
      requireValue(candidate.version === expectedVersion, 'El borrador debe conservar la versión de partida');
      requireValue(current.version < Number.MAX_SAFE_INTEGER, 'Versión agotada');
      // No await between comparison and assignment: concurrent saves cannot both win.
      current = validateVisibilityConfig({ ...candidate, version: current.version + 1 }, catalog);
      const committed = snapshot(current, 'development-memory');
      for (const listener of [...listeners]) {
        try { listener(committed); }
        catch (error) { try { onSubscriberError(error); } catch { /* A subscriber cannot undo a commit. */ } }
      }
      return committed;
    },
    subscribe(listener) {
      if (typeof listener !== 'function') throw new TypeError('Se espera una función de suscripción');
      listeners.add(listener);
      return () => listeners.delete(listener);
    }
  });
}

// Public static read with a validated build-time fallback. Never writes to localStorage.
export function createStaticVisibilityRepository({ catalog: input, fallback = DEFAULT_VISIBILITY_CONFIG, url,
  fetcher = globalThis.fetch, timeoutMs = 8000 }) {
  const catalog = validateCatalog(input);
  const safeFallback = validateVisibilityConfig(fallback, catalog);
  requireValue(typeof url === 'string' && url.length > 0, 'URL de visibilidad obligatoria');
  requireValue(Number.isSafeInteger(timeoutMs) && timeoutMs > 0, 'Tiempo de espera inválido');
  return Object.freeze({
    capabilities: Object.freeze({ write: false, subscribe: false, history: false, persistence: 'static' }),
    async readPublicConfig() {
      const controller = new AbortController();
      let timer;
      const timeout = new Promise((_, reject) => {
        timer = setTimeout(() => {
          controller.abort();
          reject(Object.assign(new Error('Se agotó el tiempo de lectura'), { code: 'timeout' }));
        }, timeoutMs);
      });
      try {
        const config = await Promise.race([
          (async () => {
            const response = await fetcher(url, { signal: controller.signal, cache: 'no-cache' });
            if (!response.ok) throw Object.assign(new Error('Respuesta HTTP ' + response.status), { code: 'http-error' });
            return validateVisibilityConfig(await response.json(), catalog);
          })(),
          timeout
        ]);
        return snapshot(config, 'static');
      } catch (error) {
        return snapshot(safeFallback, 'fallback', { code: typeof error?.code === 'string' ? error.code : 'read-failed',
          message: 'No se pudo leer una configuración válida; se utiliza el respaldo estático.' });
      } finally {
        clearTimeout(timer);
      }
    },
    async save() { throw new RepositoryUnavailableError(); },
    subscribe() { throw new RepositoryUnavailableError(); }
  });
}

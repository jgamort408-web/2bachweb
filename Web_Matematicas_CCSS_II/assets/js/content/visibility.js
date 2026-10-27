import { immutableCopy, record, requireValue } from './contracts.js';
import { validateCatalog } from './catalog.js';

export const VISIBILITY_SCHEMA_VERSION = 1;
// Available even when fetching visibility.json fails. Kept in sync by a contract test.
export const DEFAULT_VISIBILITY_CONFIG = immutableCopy({
  schemaVersion: VISIBILITY_SCHEMA_VERSION, version: 0, defaultVisibility: 'visible', entries: {}
});

export function validateVisibilityConfig(input, catalog) {
  record(input, 'visibilidad', ['schemaVersion', 'version', 'defaultVisibility', 'entries']);
  requireValue(input.schemaVersion === VISIBILITY_SCHEMA_VERSION, 'Versión de visibilidad no compatible');
  requireValue(Number.isSafeInteger(input.version) && input.version >= 0, 'Versión de documento inválida');
  requireValue(['visible', 'hidden'].includes(input.defaultVisibility), 'Visibilidad por defecto inválida');
  record(input.entries, 'entries');
  const byId = new Map(catalog.entities.map(entity => [entity.id, entity]));
  for (const [id, entry] of Object.entries(input.entries)) {
    const entity = byId.get(id);
    requireValue(Boolean(entity), 'Configuración para contenido inexistente: ' + id);
    requireValue(entity.audience === 'public', 'La visibilidad no concede acceso a ' + id);
    record(entry, id, ['visibility', 'order', 'featured']);
    requireValue(Object.keys(entry).length > 0, id + ': entrada vacía');
    if (entry.visibility !== undefined) {
      requireValue(['inherit', 'visible', 'hidden'].includes(entry.visibility), id + ': visibilidad inválida');
      requireValue(!entity.locked || entry.visibility !== 'hidden', id + ': acceso permanente');
    }
    if (entry.order !== undefined) {
      requireValue(Number.isSafeInteger(entry.order) && entry.order >= 0 && entry.order <= 1000000, id + ': orden inválido');
    }
    if (entry.featured !== undefined) requireValue(typeof entry.featured === 'boolean', id + ': featured debe ser booleano');
  }
  return immutableCopy(input);
}

export function createVisibilityModel(catalogInput, configInput) {
  const catalog = validateCatalog(catalogInput);
  const config = validateVisibilityConfig(configInput, catalog);
  const byId = new Map(catalog.entities.map(entity => [entity.id, entity]));
  const states = new Map();
  function getState(id) {
    if (states.has(id)) return states.get(id);
    const entity = byId.get(id);
    const selection = config.entries[id]?.visibility ?? 'inherit';
    let state;
    if (!entity) state = { visible: false, selection: null, reason: 'unknown-content', blockedBy: id };
    else if (entity.audience !== 'public') state = { visible: false, selection, reason: 'audience', blockedBy: id };
    else if (entity.locked) state = { visible: true, selection, reason: 'permanent', blockedBy: null };
    else if (selection === 'hidden' || (selection === 'inherit' && config.defaultVisibility === 'hidden')) {
      state = { visible: false, selection, reason: selection === 'hidden' ? 'hidden' : 'default-hidden', blockedBy: id };
    } else {
      const blocker = [entity.parentId, ...entity.requires].filter(Boolean).find(dependency => !getState(dependency).visible);
      state = blocker
        ? { visible: false, selection, reason: 'dependency', blockedBy: getState(blocker).blockedBy }
        : { visible: true, selection, reason: 'visible', blockedBy: null };
    }
    const result = Object.freeze(state);
    states.set(id, result);
    return result;
  }
  return Object.freeze({
    config,
    getState,
    isVisible: id => getState(id).visible,
    filter: entities => entities.filter(entity => getState(entity.id).visible)
  });
}

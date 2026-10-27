import { immutableCopy, requireValue } from '../content/contracts.js';
import { validateVisibilityConfig } from '../content/visibility.js';

const equal = (a, b) => JSON.stringify(a ?? null) === JSON.stringify(b ?? null);
const changedIds = (a, b) => [...new Set([...Object.keys(a.entries), ...Object.keys(b.entries)])]
  .filter(id => !equal(a.entries[id], b.entries[id])).sort();

/** A draft never becomes public until the repository confirms a permitted save. */
export function createDraftSession({ catalog, repository, initialSnapshot, canWrite = () => false }) {
  let published = validateVisibilityConfig(initialSnapshot.config, catalog);
  let draft = published, latest = null, busy = false;
  function editable() { requireValue(!busy, 'Espera a que termine la operación actual'); }
  function comparison() {
    if (!latest) return [];
    const localChanges = new Set(changedIds(published, draft));
    return [...new Set([...localChanges, ...changedIds(published, latest)])].sort().map(id => ({
      id, base: published.entries[id] ?? null, local: draft.entries[id] ?? null,
      remote: latest.entries[id] ?? null,
      conflict: localChanges.has(id) && !equal(published.entries[id], latest.entries[id])
        && !equal(draft.entries[id], latest.entries[id])
    }));
  }
  return Object.freeze({
    getState() {
      return immutableCopy({ published, draft, latest, busy,
        dirtyIds: changedIds(published, draft), comparison: comparison() });
    },
    updateEntry(id, value) {
      editable();
      const entries = { ...draft.entries };
      if (value === null) delete entries[id];
      else entries[id] = value;
      draft = validateVisibilityConfig({ ...draft, entries }, catalog);
    },
    discard() { editable(); draft = published; latest = null; },
    async comparePublished() {
      editable(); busy = true;
      try {
        const snapshot = await repository.readPublicConfig();
        requireValue(!snapshot.warning && snapshot.origin !== 'fallback', 'No se pudo verificar la publicación actual');
        const remote = validateVisibilityConfig(snapshot.config, catalog);
        if (!changedIds(published, draft).length) published = draft = remote;
        else latest = remote;
        return snapshot;
      } finally { busy = false; }
    },
    resolveComparison(choices = {}) {
      editable();
      requireValue(Boolean(latest), 'Primero compara con la publicación actual');
      const rows = comparison();
      for (const row of rows.filter(row => row.conflict)) {
        requireValue(['local', 'remote'].includes(choices[row.id]), 'Elige una versión para ' + row.id);
      }
      const entries = { ...latest.entries };
      for (const id of changedIds(published, draft)) {
        if (rows.find(row => row.id === id)?.conflict && choices[id] === 'remote') continue;
        if (Object.hasOwn(draft.entries, id)) entries[id] = draft.entries[id];
        else delete entries[id];
      }
      draft = validateVisibilityConfig({ ...latest, entries }, catalog);
      published = latest; latest = null;
    },
    async save() {
      editable();
      requireValue(!latest, 'Resuelve primero la comparación con la publicación');
      busy = true;
      try {
        requireValue(repository.capabilities.write && await canWrite(), 'El guardado no está autorizado o no está configurado');
        const snapshot = await repository.save(draft, published.version);
        requireValue(!snapshot.warning && snapshot.origin !== 'fallback', 'No se confirmó el guardado');
        published = draft = validateVisibilityConfig(snapshot.config, catalog);
        latest = null;
        return snapshot;
      } catch (error) {
        if (error?.code === 'version-conflict') {
          try {
            const snapshot = await repository.readPublicConfig();
            if (!snapshot.warning && snapshot.origin !== 'fallback') latest = validateVisibilityConfig(snapshot.config, catalog);
          } catch { /* Keep the draft; the user can retry comparison. */ }
        }
        throw error;
      } finally { busy = false; }
    }
  });
}

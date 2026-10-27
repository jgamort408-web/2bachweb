import { projectUrl } from '../core/paths.js';
import { getContentContext, isLoopback } from '../content/runtime.js';
import { createVisibilityModel } from '../content/visibility.js';
import { createMemoryVisibilityRepository } from './visibility-repository.js';
import { createDraftSession } from './draft-session.js';

const el = (tag, text) => { const node = document.createElement(tag); if (text) node.textContent = text; return node; };
const choices = [['inherit', 'Usar configuración inicial'], ['visible', 'Mostrar'], ['hidden', 'Ocultar']];
const reviewNames = { reviewed: 'Revisado', partial: 'Parcial', pending: 'Pendiente de revisión', untracked: 'Revisión individual sin registrar' };

/** Provider-neutral workspace. Its caller must supply a real authorization check for central saves. */
export function mountAdminPanel(root, { context, repository, initialSnapshot, canWrite, development = false }) {
  const session = createDraftSession({ catalog: context.catalog, repository, initialSnapshot, canWrite });
  const byId = new Map(context.catalog.entities.map(entity => [entity.id, entity]));
  const children = new Map(), rows = new Map();
  const tree = root.querySelector('[data-admin-tree]');
  const summary = root.querySelector('[data-admin-summary]');
  const status = root.querySelector('[data-admin-status]');
  const save = root.querySelector('[data-admin-save]');
  const discard = root.querySelector('[data-admin-discard]');
  const compare = root.querySelector('[data-admin-compare]');
  const conflicts = root.querySelector('[data-admin-conflicts]');
  const previewPage = root.querySelector('[data-admin-preview-page]');
  const frame = root.querySelector('[data-admin-preview]');
  const token = crypto.randomUUID();
  let busy = false;
  for (const entity of context.catalog.entities) {
    const key = entity.parentId ?? '';
    if (!children.has(key)) children.set(key, []);
    children.get(key).push(entity);
    if (entity.id.startsWith('page:') && entity.audience === 'public') {
      const option = el('option', entity.title); option.value = entity.id; previewPage.append(option);
    }
  }
  function sendPreview() {
    if (!frame.hidden) frame.contentWindow?.postMessage({
      channel: 'ccss-preview', type: 'config', token, config: session.getState().draft
    }, location.origin);
  }
  const receive = event => {
    if (event.source === frame.contentWindow && event.origin === location.origin
      && event.data?.channel === 'ccss-preview' && event.data.type === 'request' && event.data.token === token) sendPreview();
  };
  window.addEventListener('message', receive);
  function renderStates() {
    const state = session.getState(), model = createVisibilityModel(context.catalog, state.draft);
    summary.textContent = context.catalog.entities.length + ' contenidos registrados · '
      + model.filter(context.catalog.entities).length + ' visibles · ' + state.dirtyIds.length
      + ' cambios en el borrador · Versión de partida: ' + state.published.version + '.';
    for (const [id, row] of rows) {
      const entity = byId.get(id), effective = model.getState(id);
      row.select.value = state.draft.entries[id]?.visibility ?? 'inherit';
      row.select.disabled = busy || entity.locked || entity.audience !== 'public';
      row.state.textContent = effective.visible ? 'Visible' : 'Oculto';
      if (effective.reason === 'dependency') row.state.textContent += ' por ' + byId.get(effective.blockedBy).title;
      if (entity.locked) row.state.textContent += ' · Acceso permanente';
      if (entity.audience !== 'public') row.state.textContent += ' · ' + entity.audience;
    }
    save.textContent = development ? 'Guardar solo en memoria' : 'Publicar cambios';
    save.disabled = busy || !repository.capabilities.write || !state.dirtyIds.length || Boolean(state.latest);
    discard.disabled = busy || (!state.dirtyIds.length && !state.latest);
    compare.disabled = busy;
    root.querySelector('[data-admin-search]').disabled = busy;
  }
  function addEntity(entity) {
    const li = el('li'), row = el('div'), label = el('label'), select = el('select'), effective = el('span');
    li.dataset.contentId = entity.id; row.className = 'admin-row'; effective.className = 'admin-state';
    effective.id = 'visibility-state-' + entity.id;
    label.append(el('span', entity.title), ' ');
    const meta = el('small', entity.id + ' · ' + reviewNames[entity.reviewStatus]);
    meta.className = 'admin-meta'; label.append(meta);
    for (const [value, name] of choices) { const option = el('option', name); option.value = value; select.append(option); }
    select.setAttribute('aria-label', 'Visibilidad de ' + entity.title);
    select.setAttribute('aria-describedby', effective.id);
    label.append(select); row.append(label, effective); li.append(row);
    rows.set(entity.id, { select, state: effective });
    select.addEventListener('change', () => {
      const state = session.getState(), previous = state.draft.entries[entity.id] ?? {};
      const entry = { ...previous, visibility: select.value };
      if (entry.visibility === 'inherit') delete entry.visibility;
      session.updateEntry(entity.id, Object.keys(entry).length ? entry : null);
      status.textContent = 'Borrador actualizado. Los cambios aún no se han guardado. Pulsa Abrir o actualizar vista previa para comprobarlos.';
      renderStates();
    });
    const descendants = children.get(entity.id) ?? [];
    if (descendants.length) {
      const details = el('details'), title = el('summary', 'Contenidos de ' + entity.title + ' (' + descendants.length + ')');
      details.append(title); li.append(details);
      details.addEventListener('toggle', () => {
        if (!details.open || details.childElementCount > 1) return;
        const list = el('ul'); descendants.forEach(child => list.append(addEntity(child))); details.append(list); renderStates();
      });
    }
    return li;
  }
  function renderTree(query = '') {
    rows.clear(); tree.replaceChildren();
    const selected = query.trim().toLocaleLowerCase('es');
    const entities = selected ? context.catalog.entities.filter(entity =>
      (entity.id + ' ' + entity.title).toLocaleLowerCase('es').includes(selected)) : children.get('') ?? [];
    entities.forEach(entity => tree.append(addEntity(entity)));
    if (!entities.length) tree.append(el('li', 'No hay contenidos que coincidan con la búsqueda.'));
    renderStates();
  }
  function renderComparison() {
    const state = session.getState();
    conflicts.hidden = !state.latest;
    conflicts.replaceChildren();
    if (!state.latest) return;
    conflicts.append(el('h2', 'Comparar antes de continuar'), el('p',
      'El borrador se conserva. Revisa las diferencias y elige en cada conflicto qué versión mantener. Después podrás guardar.'));
    for (const row of state.comparison) {
      const item = el('div');
      item.append(el('p', byId.get(row.id).title),
        el('p', 'Borrador: ' + JSON.stringify(row.local) + ' · Guardado: ' + JSON.stringify(row.remote)));
      if (row.conflict) {
        const label = el('label', 'Versión que quieres conservar '), select = el('select');
        select.dataset.conflictId = row.id;
        for (const [value, name] of [['', 'Elige una opción'], ['local', 'Mi borrador'], ['remote', 'La versión guardada']]) {
          const option = el('option', name); option.value = value; select.append(option);
        }
        label.append(select); item.append(label);
      } else item.append(el('p', 'Sin conflicto: se conservarán los cambios compatibles.'));
      conflicts.append(item);
    }
    const resolve = el('button', 'Incorporar las versiones elegidas'); resolve.type = 'button';
    resolve.addEventListener('click', () => {
      try {
        const selections = Object.fromEntries([...conflicts.querySelectorAll('[data-conflict-id]')].map(select => [select.dataset.conflictId, select.value]));
        session.resolveComparison(selections); renderComparison(); renderStates();
        status.textContent = 'Comparación resuelta. Revisa el borrador antes de guardar.';
      } catch (error) { status.textContent = error.message; }
    });
    conflicts.append(resolve);
  }
  async function operation(action, success) {
    if (busy) return;
    busy = true; renderStates();
    try { await action(); status.textContent = success; }
    catch (error) { status.textContent = error.message; }
    finally { busy = false; renderComparison(); renderStates(); }
  }
  save.addEventListener('click', () => operation(() => session.save(),
    development ? 'Cambios guardados solo en memoria de esta pestaña. No se han publicado.' : 'Cambios publicados y confirmados.'));
  compare.addEventListener('click', () => operation(() => session.comparePublished(), 'Lectura terminada. Revisa la comparación si hay cambios en el borrador.'));
  discard.addEventListener('click', () => {
    session.discard(); renderComparison(); renderStates();
    if (!frame.hidden) frame.contentWindow.location.reload();
    status.textContent = 'Borrador descartado. Se conserva la configuración guardada.';
  });
  root.querySelector('[data-admin-search]').addEventListener('input', event => renderTree(event.target.value));
  root.querySelector('[data-admin-preview-open]').addEventListener('click', () => {
    const entity = byId.get(previewPage.value), url = new URL(projectUrl(entity.path));
    url.searchParams.set('vista-previa', token); frame.hidden = false;
    if (frame.src === url.href) frame.contentWindow.location.reload(); else frame.src = url.href;
    status.textContent = 'Vista previa del borrador. La publicación no ha cambiado.';
  });
  renderTree();
  root.hidden = false;
  return () => { window.removeEventListener('message', receive); frame.removeAttribute('src'); };
}

async function initialize() {
  const context = await getContentContext();
  const message = document.querySelector('[data-admin-service]');
  message.textContent = 'Administración central sin configurar. El inicio de sesión y el guardado global no están disponibles.';
  if (context.snapshot.warning) message.textContent += ' Se está utilizando una configuración de respaldo.';
  // This never grants an administrator role. The local workspace cannot publish.
  if (!isLoopback()) return;
  const button = document.querySelector('[data-admin-development]');
  button.hidden = false;
  button.addEventListener('click', () => {
    button.disabled = true;
    const repository = createMemoryVisibilityRepository({ catalog: context.catalog, initialConfig: context.snapshot.config });
    mountAdminPanel(document.querySelector('[data-admin-panel]'), {
      context, repository, initialSnapshot: context.snapshot, canWrite: () => true, development: true
    });
    document.querySelector('[data-admin-search]').focus();
  }, { once: true });
}
initialize().catch(() => {
  document.querySelector('[data-admin-service]').textContent = 'No se pudo cargar la configuración. Vuelve a cargar la página; no se ha guardado ningún cambio.';
});

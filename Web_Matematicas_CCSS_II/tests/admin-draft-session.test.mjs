import { test } from 'node:test';
import assert from 'node:assert/strict';
import { createDraftSession } from '../assets/js/admin/draft-session.js';
import { createMemoryVisibilityRepository, VersionConflictError } from '../assets/js/admin/visibility-repository.js';
import { ContractError } from '../assets/js/content/contracts.js';
import { projectCatalog, visibility } from './helpers/visibility-fixtures.mjs';

const catalog = projectCatalog();
async function setup(options = {}) {
  const repository = createMemoryVisibilityRepository({ catalog, initialConfig: visibility() });
  const session = createDraftSession({ catalog, repository, initialSnapshot: await repository.readPublicConfig(),
    canWrite: () => true, ...options });
  return { session, repository };
}

test('administración: editar y previsualizar no publican; descartar restaura la base', async () => {
  const { session, repository } = await setup();
  session.updateEntry('page:t01', { visibility: 'hidden' });
  assert.deepEqual(session.getState().dirtyIds, ['page:t01']);
  assert.deepEqual((await repository.readPublicConfig()).config.entries, {});
  assert.deepEqual(session.getState().published.entries, {});
  assert.throws(() => session.getState().draft.entries['page:t01'].visibility = 'visible', TypeError);
  session.discard();
  assert.deepEqual(session.getState().dirtyIds, []);
});

test('administración: el borrador solo se confirma después de un guardado autorizado', async () => {
  const { session, repository } = await setup();
  session.updateEntry('page:t01', { visibility: 'hidden' });
  const saved = await session.save();
  assert.equal(saved.config.version, 1);
  assert.deepEqual(session.getState().dirtyIds, []);
  assert.equal((await repository.readPublicConfig()).config.entries['page:t01'].visibility, 'hidden');
});

test('administración: una autorización denegada conserva el borrador y no escribe', async () => {
  const { session, repository } = await setup({ canWrite: () => false });
  session.updateEntry('page:t01', { visibility: 'hidden' });
  await assert.rejects(session.save(), ContractError);
  assert.equal((await repository.readPublicConfig()).config.version, 0);
  assert.deepEqual(session.getState().dirtyIds, ['page:t01']);
  assert.equal(session.getState().busy, false);
});

test('administración: bloquea edición y segundos guardados durante una autorización asíncrona', async () => {
  let authorize;
  const permission = new Promise(resolve => { authorize = resolve; });
  const { session } = await setup({ canWrite: () => permission });
  session.updateEntry('page:t01', { visibility: 'hidden' });
  const pending = session.save();
  assert.equal(session.getState().busy, true);
  assert.throws(() => session.updateEntry('page:t02', { visibility: 'hidden' }), ContractError);
  assert.throws(() => session.discard(), ContractError);
  await assert.rejects(session.save(), ContractError);
  authorize(true); await pending;
  assert.equal(session.getState().published.version, 1);
});

test('administración: un fallo de conexión al guardar no pierde ni confirma el borrador', async () => {
  const initialSnapshot = { config: visibility(), origin: 'static', warning: null };
  const session = createDraftSession({ catalog, initialSnapshot, canWrite: () => true,
    repository: { capabilities: { write: true }, save: async () => { throw new Error('offline'); } } });
  session.updateEntry('page:t01', { visibility: 'hidden' });
  await assert.rejects(session.save(), /offline/);
  assert.equal(session.getState().published.version, 0);
  assert.deepEqual(session.getState().dirtyIds, ['page:t01']);
});

test('administración: conflicto simultáneo, elección explícita y segundo guardado confirmado', async () => {
  const { session, repository } = await setup();
  session.updateEntry('page:t01', { visibility: 'hidden' });
  await repository.save(visibility({ 'page:t01': { visibility: 'visible' } }), 0);
  await assert.rejects(session.save(), VersionConflictError);
  assert.equal(session.getState().latest.version, 1);
  assert.equal(session.getState().comparison[0].conflict, true);
  assert.throws(() => session.resolveComparison(), ContractError);
  await assert.rejects(session.save(), ContractError);
  session.resolveComparison({ 'page:t01': 'local' });
  assert.equal(session.getState().draft.version, 1);
  assert.equal(session.getState().draft.entries['page:t01'].visibility, 'hidden');
  const saved = await session.save();
  assert.equal(saved.config.version, 2);
});

test('administración: puede conservar la versión remota sin sobrescribirla', async () => {
  const { session, repository } = await setup();
  session.updateEntry('page:t01', { visibility: 'hidden' });
  await repository.save(visibility({ 'page:t01': { visibility: 'visible' } }), 0);
  await session.comparePublished();
  session.resolveComparison({ 'page:t01': 'remote' });
  assert.deepEqual(session.getState().dirtyIds, []);
  assert.equal(session.getState().draft.entries['page:t01'].visibility, 'visible');
});

test('administración: combina cambios en contenidos distintos y conserva la eliminación de una elección', async () => {
  const { repository } = await setup();
  await repository.save(visibility({ 'page:t01': { visibility: 'hidden' } }), 0);
  const session = createDraftSession({ catalog, repository, canWrite: () => true, initialSnapshot: await repository.readPublicConfig() });
  session.updateEntry('page:t01', null);
  await repository.save(visibility({ 'page:t01': { visibility: 'hidden' }, 'page:t02': { visibility: 'hidden' } }, { version: 1 }), 1);
  await session.comparePublished();
  assert.ok(session.getState().comparison.every(row => !row.conflict));
  session.resolveComparison();
  assert.equal(session.getState().draft.entries['page:t01'], undefined);
  assert.equal(session.getState().draft.entries['page:t02'].visibility, 'hidden');
  assert.deepEqual(session.getState().dirtyIds, ['page:t01']);
});

test('administración: relectura sin borrador adopta la publicación; un respaldo no la sustituye', async () => {
  const { session, repository } = await setup();
  await repository.save(visibility({ 'page:t02': { visibility: 'hidden' } }), 0);
  await session.comparePublished();
  assert.equal(session.getState().published.version, 1);
  assert.equal(session.getState().latest, null);
  const fallbackSession = createDraftSession({ catalog, initialSnapshot: await repository.readPublicConfig(),
    repository: { readPublicConfig: async () => ({ config: visibility(), origin: 'fallback', warning: { code: 'offline' } }) } });
  await assert.rejects(fallbackSession.comparePublished(), ContractError);
  assert.equal(fallbackSession.getState().published.version, 1);
});

test('administración: valida cambios y no permite convertir rutas administrativas en contenido público', async () => {
  const { session } = await setup();
  assert.throws(() => session.updateEntry('page:admin', { visibility: 'visible' }), ContractError);
  assert.throws(() => session.updateEntry('page:home', { visibility: 'hidden' }), ContractError);
  assert.throws(() => session.updateEntry('page:missing', { visibility: 'hidden' }), ContractError);
  assert.deepEqual(session.getState().dirtyIds, []);
});

import { test } from 'node:test';
import assert from 'node:assert/strict';
import { ContractError } from '../assets/js/content/contracts.js';
import { createMemoryVisibilityRepository, createStaticVisibilityRepository,
  VersionConflictError, RepositoryUnavailableError } from '../assets/js/admin/visibility-repository.js';
import { projectCatalog, visibility } from './helpers/visibility-fixtures.mjs';

const catalog = projectCatalog();
const memory = options => createMemoryVisibilityRepository({ catalog, initialConfig: visibility(), ...options });

test('repositorio en memoria: guarda, incrementa versión y aísla al lector del estado interno', async () => {
  const initialConfig = visibility();
  const repo = memory({ initialConfig });
  initialConfig.entries['page:t01'] = { visibility: 'hidden' };
  const initial = await repo.readPublicConfig();
  assert.equal(initial.origin, 'development-memory');
  assert.deepEqual(initial.config.entries, {});
  assert.equal(repo.capabilities.persistence, 'memory');
  const candidate = visibility({ 'page:t02': { visibility: 'hidden' } });
  const saved = await repo.save(candidate, 0);
  assert.equal(saved.config.version, 1);
  candidate.entries['page:t02'].visibility = 'visible';
  assert.equal((await repo.readPublicConfig()).config.entries['page:t02'].visibility, 'hidden');
  assert.throws(() => saved.config.version = 99, TypeError);
  assert.equal((await memory().readPublicConfig()).config.version, 0);
});

test('repositorio en memoria: dos guardados simultáneos producen un éxito y un conflicto', async () => {
  const repo = memory();
  const results = await Promise.allSettled([
    repo.save(visibility({ 'page:t01': { visibility: 'hidden' } }), 0),
    repo.save(visibility({ 'page:t02': { visibility: 'hidden' } }), 0)
  ]);
  assert.equal(results.filter(r => r.status === 'fulfilled').length, 1);
  const error = results.find(r => r.status === 'rejected').reason;
  assert.ok(error instanceof VersionConflictError);
  assert.equal(error.expectedVersion, 0);
  assert.equal(error.actualVersion, 1);
  assert.equal((await repo.readPublicConfig()).config.version, 1);
});

test('repositorio en memoria: suscripciones, baja y errores de observadores no alteran un guardado', async () => {
  const errors = [], seen = [];
  const repo = memory({ onSubscriberError: error => errors.push(error.message) });
  const unsubscribe = repo.subscribe(update => seen.push(update.config.version));
  repo.subscribe(() => { throw new Error('observer failed'); });
  await repo.save(visibility(), 0);
  unsubscribe();
  await repo.save(visibility({}, { version: 1 }), 1);
  assert.deepEqual(seen, [1]);
  assert.deepEqual(errors, ['observer failed', 'observer failed']);
  assert.equal((await repo.readPublicConfig()).config.version, 2);
});

test('repositorio en memoria: un borrador inválido o desfasado no modifica la configuración', async () => {
  const repo = memory();
  await assert.rejects(repo.save(visibility({ 'page:missing': { visibility: 'visible' } }), 0), ContractError);
  await assert.rejects(repo.save(visibility({}, { version: 1 }), 0), ContractError);
  await assert.rejects(repo.save(visibility(), -1), ContractError);
  assert.equal((await repo.readPublicConfig()).config.version, 0);
  assert.throws(() => repo.subscribe(null), TypeError);
});

test('repositorio estático: lectura válida sin caché opaca, escrituras ni suscripción central', async () => {
  let requested;
  const config = visibility({ 'page:t01': { visibility: 'hidden' } }, { version: 4 });
  const repo = createStaticVisibilityRepository({ catalog, url: '/course/config/visibility.json',
    fetcher: async (url, options) => {
      requested = { url, options };
      return { ok: true, json: async () => config };
    }
  });
  const loaded = await repo.readPublicConfig();
  assert.equal(loaded.origin, 'static');
  assert.equal(loaded.config.version, 4);
  assert.equal(loaded.warning, null);
  assert.equal(requested.url, '/course/config/visibility.json');
  assert.equal(requested.options.cache, 'no-cache');
  assert.ok(requested.options.signal instanceof AbortSignal);
  assert.deepEqual(repo.capabilities, { write: false, subscribe: false, history: false, persistence: 'static' });
  await assert.rejects(repo.save(config, 4), RepositoryUnavailableError);
  assert.throws(() => repo.subscribe(() => {}), RepositoryUnavailableError);
});

test('repositorio estático: fallo de red, HTTP, JSON o esquema utiliza respaldo validado y avisa', async () => {
  const cases = [
    [async () => { throw new Error('offline'); }, 'read-failed'],
    [async () => { throw null; }, 'read-failed'],
    [async () => ({ ok: false, status: 503 }), 'http-error'],
    [async () => ({ ok: true, json: async () => { throw new SyntaxError('bad json'); } }), 'read-failed'],
    [async () => ({ ok: true, json: async () => visibility({}, { schemaVersion: 99 }) }), 'invalid-data']
  ];
  const fallback = visibility({ 'page:t01': { visibility: 'hidden' } }, { version: 2 });
  for (const [fetcher, code] of cases) {
    const repo = createStaticVisibilityRepository({ catalog, fallback, url: 'config/visibility.json', fetcher });
    const result = await repo.readPublicConfig();
    assert.equal(result.origin, 'fallback');
    assert.equal(result.warning.code, code);
    assert.deepEqual(result.config, fallback);
  }
});

test('repositorio estático: el tiempo máximo cubre también la lectura del cuerpo', async () => {
  let signal;
  const repo = createStaticVisibilityRepository({ catalog, url: 'config/visibility.json', timeoutMs: 20,
    fetcher: async (_, options) => {
      signal = options.signal;
      return { ok: true, json: () => new Promise(() => {}) };
    }
  });
  const result = await repo.readPublicConfig();
  assert.equal(result.origin, 'fallback');
  assert.equal(result.warning.code, 'timeout');
  assert.equal(signal.aborted, true);
});

test('repositorio estático: rechaza respaldo, tiempo y catálogo inválidos al construirlo', () => {
  for (const options of [
    { fallback: visibility({ 'page:missing': { visibility: 'visible' } }) },
    { timeoutMs: 0 }, { url: '' }, { catalog: { schemaVersion: 99, entities: [] } }
  ]) {
    assert.throws(() => createStaticVisibilityRepository({ catalog, url: 'config/visibility.json', ...options }), ContractError);
  }
});

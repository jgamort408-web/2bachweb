import { test } from 'node:test';
import assert from 'node:assert/strict';
import { ContractError } from '../assets/js/content/contracts.js';
import { createVisibilityModel, validateVisibilityConfig } from '../assets/js/content/visibility.js';
import { createContentRepository } from '../assets/js/content/repository.js';
import { questions, flashcards } from '../content/activities/catalog.js';
import { projectCatalog, resourceFixtures, visibility } from './helpers/visibility-fixtures.mjs';

const catalog = projectCatalog(resourceFixtures);
const repository = createContentRepository(catalog);
const game = 'page:game-t01-a-limite-express';
const question = catalog.entities.find(e => e.kind === 'question' && e.parentId === 'page:t01-e01').id;

test('visibilidad: el respaldo conserva contenido público, incluidos borradores parciales', () => {
  const model = createVisibilityModel(catalog, visibility());
  assert.equal(model.filter(catalog.entities).length, catalog.entities.length - 3);
  for (const id of ['page:t01-e01', 'page:t06-e01', 'page:resources', 'page:home', 'page:accessibility']) {
    assert.equal(model.isVisible(id), true, id);
  }
  for (const id of ['page:admin', 'page:progress', 'page:not-found', 'unknown']) {
    assert.equal(model.isVisible(id), false, id);
  }
  assert.equal(model.getState('unknown').reason, 'unknown-content');
});

test('visibilidad: ocultar el tema bloquea páginas, preguntas, tarjetas, juego y PDF', () => {
  const config = visibility({ 'page:t01': { visibility: 'hidden' }, [game]: { visibility: 'visible' } });
  const model = createVisibilityModel(catalog, config);
  for (const entity of catalog.entities) {
    if (entity.parentId === 'page:t01' || entity.requires.includes('page:t01')) assert.equal(model.isVisible(entity.id), false, entity.id);
  }
  assert.equal(model.isVisible(question), false);
  assert.equal(model.getState(game).blockedBy, 'page:t01');
  assert.equal(model.isVisible('page:t02'), true);
  assert.equal(config.entries[game].visibility, 'visible');
});

test('visibilidad: volver a mostrar un padre conserva la elección individual de cada hijo', () => {
  const config = visibility({
    'page:t01': { visibility: 'hidden' },
    'page:t01-e01': { visibility: 'hidden' },
    'page:t01-e02': { visibility: 'visible' }
  });
  assert.equal(createVisibilityModel(catalog, config).isVisible('page:t01-e02'), false);
  config.entries['page:t01'].visibility = 'visible';
  const restored = createVisibilityModel(catalog, config);
  assert.equal(restored.isVisible('page:t01-e01'), false);
  assert.equal(restored.isVisible(question), false);
  assert.equal(restored.isVisible('page:t01-e02'), true);
  assert.equal(restored.isVisible(game), true);
});

test('visibilidad: las soluciones nunca quedan públicas con su examen oculto', () => {
  for (const examHidden of [false, true]) {
    for (const solutionHidden of [false, true]) {
      const model = createVisibilityModel(catalog, visibility({
        'resource:fixture-exam': { visibility: examHidden ? 'hidden' : 'visible' },
        'resource:fixture-solution': { visibility: solutionHidden ? 'hidden' : 'visible' }
      }));
      assert.equal(model.isVisible('resource:fixture-exam'), !examHidden);
      assert.equal(model.isVisible('resource:fixture-solution'), !examHidden && !solutionHidden);
      assert.equal(model.isVisible('resource:fixture-document'), true);
    }
  }
  const model = createVisibilityModel(catalog, visibility({ 'page:exams': { visibility: 'hidden' } }));
  assert.equal(model.isVisible('resource:fixture-solution'), false);
});

test('visibilidad: la política por defecto y los accesos permanentes tienen semántica explícita', () => {
  const config = visibility({ 'page:book': { visibility: 'visible' }, 'page:t01': { visibility: 'visible' } },
    { defaultVisibility: 'hidden' });
  const model = createVisibilityModel(catalog, config);
  assert.equal(model.isVisible('page:home'), true);
  assert.equal(model.isVisible('page:accessibility'), true);
  assert.equal(model.isVisible('page:t01'), true);
  assert.equal(model.isVisible('page:t01-e01'), false);
  assert.equal(model.getState('page:t01-e01').reason, 'default-hidden');
});

test('visibilidad: valida esquema, versión, campos, IDs, permisos y orden', () => {
  const invalid = [
    { ...visibility(), schemaVersion: 99 }, { ...visibility(), version: -1 },
    { ...visibility(), version: 0.5 }, { ...visibility(), extra: true },
    { ...visibility(), defaultVisibility: 'sometimes' },
    visibility({ 'page:missing': { visibility: 'hidden' } }),
    visibility({ 'page:admin': { visibility: 'visible' } }),
    visibility({ 'page:progress': { visibility: 'visible' } }),
    visibility({ 'page:home': { visibility: 'hidden' } }),
    visibility({ 'page:accessibility': { visibility: 'hidden' } }),
    visibility({ 'page:t01': {} }),
    visibility({ 'page:t01': { visibility: 'other' } }),
    visibility({ 'page:t01': { order: -1 } }),
    visibility({ 'page:t01': { order: undefined } }),
    visibility({ 'page:t01': { featured: 'true' } }),
    visibility({ 'page:t01': { reviewStatus: 'reviewed' } }),
    visibility(JSON.parse('{"__proto__":{"visibility":"visible"}}'))
  ];
  for (const config of invalid) assert.throws(() => validateVisibilityConfig(config, catalog), ContractError);
});

test('visibilidad: las instantáneas y motivos no cambian al editar los objetos de entrada', () => {
  const config = visibility({ 'page:t01': { visibility: 'hidden' } });
  const model = createVisibilityModel(catalog, config);
  config.entries['page:t01'].visibility = 'visible';
  assert.equal(model.isVisible('page:t01'), false);
  assert.ok(Object.isFrozen(model.getState('page:t01')));
  assert.throws(() => model.config.entries['page:t01'].visibility = 'visible', TypeError);
});

test('repositorio de contenido: un solo ID controla anfitrión y juego insertable', () => {
  assert.equal(repository.entityIdFor('widget', 't01-a-limite-express'), game);
  assert.equal(repository.entityIdFor('page', 'game-t01-a-limite-express'), game);
  assert.equal(repository.entityIdFor('widget', 'missing'), null);
  assert.equal(repository.entityIdFor('question', 'missing'), null);
});

test('repositorio de contenido: filtra actividades por propietario y por página de uso', () => {
  const config = visibility({ 'page:t01-e01': { visibility: 'hidden' }, 'page:tests': { visibility: 'hidden' } });
  assert.equal(repository.getVisibleActivities('question', questions, config, { contextPageId: 'tests' }).length, 0);
  const fromPractice = repository.getVisibleActivities('question', questions, config, { contextPageId: 'practice' });
  assert.ok(fromPractice.length > 0);
  assert.ok(fromPractice.every(q => q.lessonId !== 't01-e01'));
  assert.equal(repository.getVisibleActivities('card', flashcards, config, { contextPageId: 'missing' }).length, 0);
  assert.throws(() => repository.getVisibleActivities('other', [], config), TypeError);
});

test('repositorio de contenido: orden estable y destacados sin revelar elementos ocultos', () => {
  const config = visibility({
    'page:t02': { order: 0 }, 'page:t03': { order: 0 },
    'page:t01': { visibility: 'hidden', featured: true, order: 0 }
  });
  const visible = repository.getVisibleContent(config);
  assert.deepEqual(visible.slice(0, 2).map(e => e.id), ['page:t02', 'page:t03']);
  assert.ok(!visible.some(e => e.id === 'page:t01'));
  assert.ok(repository.getVisiblePages(config).every(e => e.id.startsWith('page:')));
  assert.deepEqual(repository.getVisibleResources(config).map(e => e.id), ['resource:fixture-document']);
  assert.equal(repository.getAllContent().length, catalog.entities.length);
});

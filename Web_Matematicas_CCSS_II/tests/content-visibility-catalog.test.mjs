import { test } from 'node:test';
import assert from 'node:assert/strict';
import fs from 'node:fs';
import { validateCatalog, buildContentCatalog } from '../assets/js/content/catalog.js';
import { ContractError } from '../assets/js/content/contracts.js';
import { DEFAULT_VISIBILITY_CONFIG } from '../assets/js/content/visibility.js';
import { loadProjectCatalog } from '../assets/js/content/project-catalog.js';
import { expectedCatalog } from './helpers/catalog-expectations.mjs';
import { projectCatalog, readConfig, resourceFixtures } from './helpers/visibility-fixtures.mjs';
import { probabilityQuestions } from '../content/activities/probability-test.js';
import { inferenceQuestions } from '../content/activities/inference-test.js';

const catalog = projectCatalog();

test('visibilidad: todas las páginas curriculares están registradas con su ID y comprobación inicial', () => {
  const root = new URL('../', import.meta.url);
  function htmlPaths(directory, prefix = '') {
    return fs.readdirSync(directory, { withFileTypes: true }).flatMap(entry => {
      const relative = prefix + entry.name;
      // Fuera del sitio publicado (.github/workflows/pages.yml): dependencias, documentación interna y pruebas.
      if (relative.startsWith('assets/vendor') || ['node_modules', 'docs', 'tests', 'scripts'].includes(relative)) return [];
      return entry.isDirectory() ? htmlPaths(new URL(entry.name + '/', directory), relative + '/')
        : relative.endsWith('.html') ? [relative] : [];
    });
  }
  const pages = readConfig('pages'), widgets = readConfig('widgets');
  const registered = new Set([...pages, ...widgets].map(entity => entity.path));
  assert.deepEqual(htmlPaths(root).filter(path => !registered.has(path)).sort(),
    ['components/footer.html', 'components/header.html', 'widgets/shared/geogebra/index.html']);
  for (const page of pages) {
    const html = fs.readFileSync(new URL(page.path, root), 'utf8');
    assert.ok(html.includes('data-page-id="' + page.id + '"'), page.id);
    assert.ok(html.includes('content-gate.js'), page.id);
  }
});

test('visibilidad: las lecturas estáticas comparten los IDs y el tema del banco autocorregible', () => {
  for (const [pageId, topicId, path, questions] of [
    ['t07-questions', 't07', 'test/probabilidad-preguntas.html', probabilityQuestions],
    ['t09-questions', 't09', 'test/inferencia-preguntas.html', inferenceQuestions]
  ]) {
    const html = fs.readFileSync(new URL('../' + path, import.meta.url), 'utf8');
    const ids = [...html.matchAll(/data-content-id="([^"]+)"/g)].map(match => match[1]);
    assert.deepEqual(ids, questions.map(question => 'question:' + question.id));
    assert.ok(catalog.entities.find(entity => entity.id === 'page:' + pageId).requires.includes('page:' + topicId));
  }
});

test('visibilidad: registra todas las páginas y actividades con IDs estables y rutas reales', () => {
  assert.equal(catalog.entities.length, 193 + expectedCatalog.questions + expectedCatalog.cards);
  assert.equal(catalog.entities.filter(e => e.id.startsWith('page:')).length, 145);
  assert.equal(catalog.entities.filter(e => e.kind === 'widget').length, 28);
  assert.equal(catalog.entities.filter(e => e.kind === 'question').length, expectedCatalog.questions);
  assert.equal(catalog.entities.filter(e => e.kind === 'card').length, expectedCatalog.cards);
  for (const entity of catalog.entities) {
    for (const path of [entity.path, entity.widgetPath].filter(Boolean)) {
      assert.ok(fs.existsSync(new URL('../' + path, import.meta.url)), path);
    }
  }
  assert.deepEqual(readConfig('visibility'), DEFAULT_VISIBILITY_CONFIG);
  const resources = readConfig('resources').resources;
  assert.equal(resources.length, 48);
  const solution = catalog.entities.find(e => e.id === 'resource:recuperacion-t1-soluciones');
  assert.equal(solution.solutionOf, 'resource:recuperacion-t1-examen');
  assert.ok(solution.requires.includes(solution.solutionOf));
  assert.ok(resources.every(resource => resource.reviewStatus === 'reviewed'));
  const limits = catalog.entities.find(e => e.id === 'resource:limites-derivadas-soluciones');
  assert.equal(limits.solutionOf, 'resource:limites-derivadas-examen');
  assert.ok(limits.requires.includes(limits.solutionOf));
  assert.ok(limits.requires.includes('page:t01'));
  for (const slug of ['funciones-variante', 'funciones-principal']) {
    const solution = catalog.entities.find(e => e.id === 'resource:' + slug + '-soluciones');
    assert.equal(solution.solutionOf, 'resource:' + slug + '-examen');
    assert.ok(solution.requires.includes(solution.solutionOf));
    assert.ok(solution.requires.includes('page:t02'));
  }
  for (const [slug, topic] of [['distribuciones-i', 't08'], ['distribuciones-ii', 't08'], ['probabilidad-i', 't07'], ['probabilidad-ii', 't07'], ['recuperacion-inferencia', 't09'], ['inferencia-i', 't09'], ['inferencia-ii', 't09'], ['inferencia-recopilacion', 't09'], ['inferencia-general', 't09'], ['repaso-analisis', 't01'], ['examen-final', 't03'], ['subida-nota-curso', 't01']]) {
    const solution = catalog.entities.find(e => e.id === 'resource:' + slug + '-soluciones');
    assert.equal(solution.solutionOf, 'resource:' + slug + '-examen');
    assert.ok(solution.requires.includes(solution.solutionOf));
    assert.ok(solution.requires.includes('page:' + topic));
  }
  const general = catalog.entities.find(e => e.id === 'resource:subida-nota-t1-general-soluciones');
  assert.equal(general.solutionOf, 'resource:subida-nota-t1-general-examen');
  assert.ok(general.requires.includes(general.solutionOf));
  const systems = catalog.entities.find(e => e.id === 'resource:sistemas-sels-i-soluciones');
  assert.equal(systems.solutionOf, 'resource:sistemas-sels-i-examen');
  assert.ok(systems.requires.includes(systems.solutionOf));
  assert.ok(systems.requires.includes('page:t05'));
  const systemsII = catalog.entities.find(e => e.id === 'resource:sistemas-sels-ii-soluciones');
  assert.equal(systemsII.solutionOf, 'resource:sistemas-sels-ii-examen');
  assert.ok(systemsII.requires.includes(systemsII.solutionOf));
  assert.ok(systemsII.requires.includes('page:t05'));
  const linear = catalog.entities.find(e => e.id === 'resource:programacion-lineal-i-soluciones');
  assert.equal(linear.solutionOf, 'resource:programacion-lineal-i-examen');
  assert.ok(linear.requires.includes(linear.solutionOf));
  assert.ok(linear.requires.includes('page:t06'));
  const linearII = catalog.entities.find(e => e.id === 'resource:programacion-lineal-ii-soluciones');
  assert.equal(linearII.solutionOf, 'resource:programacion-lineal-ii-examen');
  assert.ok(linearII.requires.includes(linearII.solutionOf));
  assert.ok(linearII.requires.includes('page:t06'));
  for (const slug of ['matrices-i', 'matrices-ii', 'matrices-iii']) {
    const solution = catalog.entities.find(e => e.id === 'resource:' + slug + '-soluciones');
    assert.equal(solution.solutionOf, 'resource:' + slug + '-examen');
    assert.ok(solution.requires.includes(solution.solutionOf));
    assert.ok(solution.requires.includes('page:t04'));
  }
});

test('visibilidad: anfitrión y widget comparten control y dependen del tema', () => {
  for (const widget of readConfig('widgets')) {
    const host = catalog.entities.find(e => e.id === 'page:' + widget.hostPageId);
    assert.equal(host.widgetId, widget.id);
    assert.equal(host.widgetPath, widget.path);
    assert.equal(host.parentId, 'page:labs');
    assert.deepEqual(host.requires, ['page:' + widget.topicId]);
  }
});

test('visibilidad: destinos de repaso y estado editorial no se pierden al normalizar', () => {
  const editorial = readConfig('editorial');
  for (const page of readConfig('pages')) {
    assert.equal(catalog.entities.find(e => e.id === 'page:' + page.id).reviewStatus,
      editorial.pages[page.id] ?? editorial.defaultStatus);
  }
  for (const entity of catalog.entities.filter(e => ['question', 'card'].includes(e.kind))) {
    assert.equal(entity.reviewStatus, 'untracked');
  }
  assert.ok(catalog.entities.some(e => e.kind === 'question'
    && e.parentId === 'page:practice' && e.requires.includes('page:t01')));
});

test('visibilidad: el catálogo es inmutable y no admite duplicados ni rutas externas', () => {
  assert.ok(Object.isFrozen(catalog.entities[0].requires));
  assert.throws(() => catalog.entities.push({}), TypeError);
  for (const mutate of [
    c => c.entities.push(c.entities[0]),
    c => c.entities[0].path = '../outside.html',
    c => c.entities[0].path = 'https://example.org/page.html',
    c => c.entities[0].path = 'folder/%2e%2e/outside.html',
    c => c.entities[0].path = c.entities[1].path,
    c => c.entities[0].id = 'page:another-id',
    c => c.entities[0].extra = true
  ]) {
    const copy = structuredClone(catalog);
    mutate(copy);
    assert.throws(() => validateCatalog(copy), ContractError);
  }
});

test('visibilidad: rechaza referencias rotas y ciclos mixtos de padre y dependencia', () => {
  for (const mutate of [
    c => c.entities.find(e => e.id === 'page:t01').parentId = 'page:missing',
    c => c.entities.find(e => e.id === 'page:t01').requires.push('page:t01-e01'),
    c => c.entities.find(e => e.id === 'page:book').requires.push('page:book'),
    c => c.entities.find(e => e.id === 'page:home').parentId = 'page:book',
    c => c.entities.find(e => e.kind === 'widget').widgetPath = undefined
  ]) {
    const copy = structuredClone(catalog);
    mutate(copy);
    assert.throws(() => validateCatalog(copy), ContractError);
  }
});

test('visibilidad: las parejas de PDF exigen examen, solución y dependencia válida', () => {
  const withResources = projectCatalog(resourceFixtures);
  const solution = withResources.entities.find(e => e.id === 'resource:fixture-solution');
  assert.equal(solution.solutionOf, 'resource:fixture-exam');
  assert.ok(solution.requires.includes(solution.solutionOf));
  assert.throws(() => projectCatalog([resourceFixtures[1]]), ContractError);
  assert.throws(() => projectCatalog([{ ...resourceFixtures[0], examId: 'another' }]), ContractError);
  assert.throws(() => projectCatalog([{ ...resourceFixtures[0], path: 'exam.tex' }]), ContractError);
  const broken = structuredClone(withResources);
  broken.entities.find(e => e.id === solution.id).requires = ['page:t01'];
  assert.throws(() => validateCatalog(broken), ContractError);
});

test('visibilidad: versiona el manifiesto y rechaza registros de origen incompletos', () => {
  const input = {
    pages: readConfig('pages'), widgets: readConfig('widgets'), questions: [], flashcards: [],
    editorial: readConfig('editorial'), studyScopes: readConfig('study-scopes'),
    resources: { schemaVersion: 2, resources: [] }
  };
  assert.throws(() => buildContentCatalog(input), ContractError);
  input.resources.schemaVersion = 1;
  input.widgets = input.widgets.slice(1);
  assert.throws(() => buildContentCatalog(input), ContractError);
  assert.throws(() => validateCatalog({ ...catalog, schemaVersion: 2 }), ContractError);
});

test('cargador común: reúne los cinco manifiestos y conserva el catálogo íntegro', async () => {
  const urls = [];
  const loaded = await loadProjectCatalog({ fetcher: async (url, options) => {
    urls.push(url);
    assert.equal(options.cache, 'no-cache');
    const name = new URL(url).pathname.split('/').at(-1).replace('.json', '');
    return { ok: true, json: async () => readConfig(name) };
  } });
  assert.equal(urls.length, 5);
  assert.deepEqual(loaded, catalog);
});

test('cargador común: un manifiesto incompleto no se presenta como catálogo vacío válido', async () => {
  await assert.rejects(loadProjectCatalog({
    fetcher: async () => ({ ok: false, status: 503 })
  }), /HTTP 503/);
  await assert.rejects(loadProjectCatalog({
    fetcher: async () => ({ ok: true, json: async () => { throw new SyntaxError('bad json'); } })
  }), SyntaxError);
});

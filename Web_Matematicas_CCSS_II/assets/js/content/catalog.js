import { immutableCopy, record, requireValue, stableId, textValue, projectPath } from './contracts.js';

export const CATALOG_SCHEMA_VERSION = 1;
const kinds = ['section', 'topic', 'lesson', 'widget', 'question', 'card', 'resource'];
const audiences = ['public', 'admin', 'inactive', 'system'];
const reviewStates = ['reviewed', 'partial', 'pending', 'untracked'];
const entityKeys = ['id', 'sourceId', 'kind', 'title', 'parentId', 'requires', 'audience',
  'locked', 'reviewStatus', 'path', 'widgetId', 'widgetPath', 'resourceKind', 'solutionOf', 'tags'];

export function validateCatalog(input) {
  record(input, 'catálogo', ['schemaVersion', 'entities']);
  requireValue(input.schemaVersion === CATALOG_SCHEMA_VERSION, 'Versión de catálogo no compatible');
  requireValue(Array.isArray(input.entities), 'entities debe ser una lista');
  const byId = new Map();
  const widgetIds = new Set();
  const routes = new Set();
  for (const entity of input.entities) {
    record(entity, 'entidad', entityKeys);
    stableId(entity.id, 'entidad');
    stableId(entity.sourceId, entity.id + '.sourceId');
    requireValue(!byId.has(entity.id), 'ID duplicado: ' + entity.id);
    requireValue(kinds.includes(entity.kind), entity.id + ': tipo desconocido');
    const namespace = ['question', 'card', 'resource'].includes(entity.kind) ? entity.kind : 'page';
    requireValue(entity.id === namespace + ':' + entity.sourceId, entity.id + ': espacio de IDs incoherente');
    requireValue(audiences.includes(entity.audience), entity.id + ': audiencia desconocida');
    requireValue(reviewStates.includes(entity.reviewStatus), entity.id + ': revisión desconocida');
    requireValue(typeof entity.locked === 'boolean', entity.id + ': locked debe ser booleano');
    textValue(entity.title, entity.id + '.title');
    requireValue(entity.parentId === null || typeof entity.parentId === 'string', entity.id + ': padre inválido');
    requireValue(Array.isArray(entity.requires) && new Set(entity.requires).size === entity.requires.length,
      entity.id + ': dependencias inválidas o repetidas');
    entity.requires.forEach(id => stableId(id, entity.id + '.requires'));
    if (['question', 'card'].includes(entity.kind)) {
      requireValue(entity.path === undefined, entity.id + ': las actividades no tienen ruta propia');
    } else projectPath(entity.path, entity.id + '.path');
    if (entity.kind === 'widget') {
      stableId(entity.widgetId, entity.id + '.widgetId');
      requireValue(!widgetIds.has(entity.widgetId), entity.id + ': widget duplicado');
      widgetIds.add(entity.widgetId);
      projectPath(entity.widgetPath, entity.id + '.widgetPath');
    } else {
      requireValue(entity.widgetId === undefined && entity.widgetPath === undefined, entity.id + ': metadatos de widget inesperados');
    }
    for (const route of [entity.path, entity.widgetPath].filter(Boolean)) {
      requireValue(!routes.has(route), entity.id + ': ruta duplicada ' + route);
      routes.add(route);
    }
    if (entity.tags !== undefined) {
      requireValue(Array.isArray(entity.tags) && new Set(entity.tags).size === entity.tags.length, entity.id + ': etiquetas inválidas');
      entity.tags.forEach(tag => textValue(tag, entity.id + '.tags'));
    }
    if (entity.kind === 'resource') {
      requireValue(['document', 'exam', 'solution'].includes(entity.resourceKind), entity.id + ': recurso desconocido');
      projectPath(entity.path, entity.id + '.path');
      requireValue(entity.path.toLowerCase().endsWith('.pdf'), entity.id + ': se espera un PDF');
      if (entity.resourceKind === 'solution') stableId(entity.solutionOf, entity.id + '.solutionOf');
      else requireValue(entity.solutionOf === undefined, entity.id + ': solo una solución tiene solutionOf');
    } else {
      requireValue(entity.resourceKind === undefined && entity.solutionOf === undefined, entity.id + ': metadatos de recurso inesperados');
    }
    byId.set(entity.id, entity);
  }
  for (const entity of byId.values()) {
    for (const id of [entity.parentId, ...entity.requires].filter(Boolean)) {
      requireValue(byId.has(id), entity.id + ': referencia inexistente ' + id);
    }
    if (entity.solutionOf) {
      requireValue(byId.get(entity.solutionOf)?.resourceKind === 'exam', entity.id + ': examen inexistente');
      requireValue(entity.requires.includes(entity.solutionOf), entity.id + ': debe depender de su examen');
    }
    if (entity.locked && entity.audience === 'public') {
      requireValue(entity.parentId === null && entity.requires.length === 0,
        entity.id + ': un acceso público permanente no puede depender de contenido ocultable');
    }
  }
  // Parent and dependency edges form one graph; checking only parents misses mixed cycles.
  const visiting = new Set(), visited = new Set();
  function visit(id) {
    requireValue(!visiting.has(id), 'Ciclo de visibilidad en ' + id);
    if (visited.has(id)) return;
    visiting.add(id);
    const entity = byId.get(id);
    [entity.parentId, ...entity.requires].filter(Boolean).forEach(visit);
    visiting.delete(id);
    visited.add(id);
  }
  byId.forEach((_, id) => visit(id));
  return immutableCopy(input);
}

export function buildContentCatalog({ pages, widgets, questions, flashcards, editorial, studyScopes, resources }) {
  requireValue(Array.isArray(pages) && Array.isArray(widgets) && Array.isArray(questions)
    && Array.isArray(flashcards), 'Los catálogos de origen deben ser listas');
  record(editorial, 'editorial');
  record(editorial.pages, 'editorial.pages');
  record(studyScopes, 'studyScopes');
  record(resources, 'resources', ['schemaVersion', 'resources']);
  requireValue(resources.schemaVersion === 1 && Array.isArray(resources.resources), 'Manifiesto de recursos no compatible');
  const pageIds = new Set(pages.map(page => page.id));
  const hostWidgets = new Map();
  for (const widget of widgets) {
    requireValue(pageIds.has(widget.hostPageId), 'Página de juego inexistente: ' + widget.id);
    requireValue(!hostWidgets.has(widget.hostPageId), 'Dos widgets comparten página: ' + widget.hostPageId);
    hostWidgets.set(widget.hostPageId, widget);
  }
  const entities = pages.map(page => {
    const widget = hostWidgets.get(page.id);
    const topicId = widget?.topicId ?? page.topicId;
    requireValue((page.kind === 'widget-host') === Boolean(widget), page.id + ': registro de widget incompleto');
    const audience = { admin: 'admin', progress: 'inactive', 'not-found': 'system' }[page.id] || 'public';
    const locked = ['home', 'accessibility'].includes(page.id);
    return {
      id: 'page:' + page.id, sourceId: page.id, kind: widget ? 'widget' : page.kind,
      title: page.title, parentId: locked || !page.parentId ? null : 'page:' + page.parentId,
      requires: topicId ? ['page:' + topicId] : [], audience, locked,
      reviewStatus: editorial.pages[page.id] ?? editorial.defaultStatus,
      path: page.path,
      ...(widget ? { widgetId: widget.id, widgetPath: widget.path } : {})
    };
  });
  for (const [kind, items] of [['question', questions], ['card', flashcards]]) {
    for (const item of items) {
      const scope = item.lessonId && Object.hasOwn(studyScopes, item.lessonId) ? studyScopes[item.lessonId] : null;
      const parent = scope?.pageId ?? item.lessonId ?? item.topicId;
      entities.push({
        id: kind + ':' + item.id, sourceId: item.id, kind,
        title: kind === 'question' ? item.prompt : item.front,
        parentId: 'page:' + parent,
        requires: parent === item.topicId ? [] : ['page:' + item.topicId],
        audience: 'public', locked: false, reviewStatus: 'untracked'
      });
    }
  }
  for (const resource of resources.resources) {
    record(resource, 'recurso', ['id', 'title', 'path', 'kind', 'topicId', 'examId', 'tags', 'reviewStatus']);
    requireValue(resource.kind === 'solution' || resource.examId === undefined, 'examId solo corresponde a soluciones');
    entities.push({
      id: 'resource:' + resource.id, sourceId: resource.id, kind: 'resource',
      title: resource.title, path: resource.path, resourceKind: resource.kind,
      parentId: ['exam', 'solution'].includes(resource.kind) ? 'page:exams' : 'page:resources',
      requires: [...(resource.topicId ? ['page:' + resource.topicId] : []),
        ...(resource.kind === 'solution' ? ['resource:' + resource.examId] : [])],
      ...(resource.kind === 'solution' ? { solutionOf: 'resource:' + resource.examId } : {}),
      audience: 'public', locked: false, reviewStatus: resource.reviewStatus ?? 'pending',
      tags: resource.tags ?? []
    });
  }
  return validateCatalog({ schemaVersion: CATALOG_SCHEMA_VERSION, entities });
}

import { validateCatalog } from './catalog.js';
import { createVisibilityModel } from './visibility.js';

export function createContentRepository(catalogInput) {
  const catalog = validateCatalog(catalogInput);
  const byId = new Map(catalog.entities.map(entity => [entity.id, entity]));
  const widgetIds = new Map(catalog.entities.filter(entity => entity.widgetId)
    .map(entity => [entity.widgetId, entity.id]));
  function entityIdFor(kind, sourceId) {
    return kind === 'widget' ? widgetIds.get(sourceId) ?? null
      : byId.has(kind + ':' + sourceId) ? kind + ':' + sourceId : null;
  }
  function getVisibleContent(config) {
    const model = createVisibilityModel(catalog, config);
    return model.filter(catalog.entities).map((entity, index) => ({ entity, index }))
      .sort((a, b) => (config.entries[a.entity.id]?.order ?? 1000001)
        - (config.entries[b.entity.id]?.order ?? 1000001) || a.index - b.index)
      .map(item => item.entity);
  }
  return Object.freeze({
    catalog,
    entityIdFor,
    getAllContent: () => catalog.entities,
    getVisibleContent,
    getVisiblePages: config => getVisibleContent(config).filter(entity => entity.id.startsWith('page:')),
    getVisibleResources: config => getVisibleContent(config).filter(entity => entity.kind === 'resource'),
    // A question may occur in several views; both its owner and the current view must be visible.
    getVisibleActivities(kind, items, config, { contextPageId } = {}) {
      if (!['question', 'card'].includes(kind)) throw new TypeError('Tipo de actividad no compatible');
      const model = createVisibilityModel(catalog, config);
      if (contextPageId && !model.isVisible('page:' + contextPageId)) return [];
      return items.filter(item => model.isVisible(entityIdFor(kind, item.id)));
    }
  });
}

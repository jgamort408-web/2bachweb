import { mountWidget } from '../shared/widget-host.js';
import { getContentContext, canUseCurrentPage } from '../content/runtime.js';
async function initialize() {
  const context = await getContentContext();
  if (!canUseCurrentPage(context)) return;
  for (const root of document.querySelectorAll('[data-widget]')) {
    const entity = context.catalog.entities.find(item => item.widgetId === root.dataset.widget);
    if (entity && context.model.isVisible(entity.id)) {
      mountWidget(root, { id: entity.widgetId, path: entity.widgetPath, title: entity.title }, context);
    } else root.textContent = 'Esta actividad todavía no está disponible.';
  }
}
initialize().catch((error) => {
  for (const root of document.querySelectorAll('[data-widget]')) root.textContent = 'No se pudo insertar la actividad. Prueba el enlace para abrirla por separado.';
  console.warn(error.message);
});

import { projectUrl } from '../core/paths.js';
import { buildContentCatalog } from './catalog.js';
import { questions, flashcards } from '../../../content/activities/catalog.js';

// The public UI and admin preview will load the same sources, including on a Pages subpath.
export async function loadProjectCatalog({ fetcher = globalThis.fetch, signal } = {}) {
  const names = ['pages', 'widgets', 'editorial', 'study-scopes', 'resources'];
  const values = await Promise.all(names.map(async name => {
    const response = await fetcher(projectUrl('config/' + name + '.json'), { signal, cache: 'no-cache' });
    if (!response.ok) throw new Error('No se pudo cargar el catálogo ' + name + ': HTTP ' + response.status);
    return response.json();
  }));
  const [pages, widgets, editorial, studyScopes, resources] = values;
  return buildContentCatalog({ pages, widgets, editorial, studyScopes, resources, questions, flashcards });
}

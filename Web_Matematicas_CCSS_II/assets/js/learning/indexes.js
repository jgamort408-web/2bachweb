import { projectUrl } from '../core/paths.js';
import { getContentContext, pageRecords, canUseCurrentPage } from '../content/runtime.js';
async function initialize() {
  const context = await getContentContext();
  if (!canUseCurrentPage(context)) return;
  function render() {
  const pages = pageRecords(context).filter(page => context.model.isVisible('page:' + page.id));
  const status = page => page.reviewStatus;
  const titleLink = (page) => {
    const link = document.createElement('a');
    link.href = projectUrl(page.path); link.textContent = page.title;
    return link;
  };
  const course = document.querySelector('[data-course-index]');
  if (course) course.replaceChildren();
  if (course) for (const topic of pages.filter((page) => page.kind === 'topic')) {
    const lessons = pages.filter((page) => page.parentId === topic.id && page.kind === 'lesson');
    const completed = lessons.filter((page) => status(page) === 'reviewed').length;
    const partial = lessons.filter((page) => status(page) === 'partial').length;
    const article = document.createElement('article'), heading = document.createElement('h2'), summary = document.createElement('p');
    article.className = 'course-card'; heading.append(titleLink(topic));
    summary.textContent = completed + ' de ' + lessons.length + ' lecciones visibles con contenido revisado.' + (partial ? ' Contenido parcial en ' + partial + '.' : '');
    article.append(heading, summary); course.append(article);
  }
  if (course && !course.children.length) course.textContent = 'Todavía no hay temas disponibles.';
  const topic = document.querySelector('[data-topic-index]');
  if (topic) {
    const list = document.createElement('ol');
    for (const lesson of pages.filter((page) => page.parentId === topic.dataset.topicIndex && page.kind === 'lesson')) {
      const item = document.createElement('li'); item.append(titleLink(lesson));
      item.append(status(lesson) === 'reviewed' ? ' · Disponible' : status(lesson) === 'partial' ? ' · Contenido parcial' : ' · En preparación');
      list.append(item);
    }
    topic.replaceChildren(list);
    if (!list.children.length) topic.textContent = 'Todavía no hay lecciones disponibles.';
  }
  }
  render(); context.subscribe(render);
}
initialize().catch((error) => {
  for (const root of document.querySelectorAll('[data-course-index], [data-topic-index]')) root.textContent = 'No se pudo cargar el índice. Puedes usar el menú Temario.';
  console.warn(error.message);
});

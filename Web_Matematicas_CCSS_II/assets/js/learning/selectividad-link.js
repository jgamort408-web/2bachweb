// «Así cae en Selectividad» (P08): al final de cada lección cuyo epígrafe aparece en el banco, enlaces a las
// tarjetas filtradas por ese epígrafe. Los datos salen de config/selectividad.json (build-selectividad.mjs).
// Si el docente oculta una página del banco, document.js oculta su enlace como cualquier otro.
import { projectUrl } from '../core/paths.js';

export async function mountSelectividadLink(pageId, main = document.querySelector('main')) {
  const match = /^t(\d{2})-e(\d{2})$/.exec(pageId ?? '');
  if (!match || !main) return null;
  const epigraph = `T${match[1]}.${Number(match[2])}`;
  const response = await fetch(projectUrl('config/selectividad.json'));
  if (!response.ok) return null;
  const { topics, epigraphs } = await response.json();
  const entries = (epigraphs[epigraph] ?? []).map(entry => ({ ...entry, topic: topics.find(topic => topic.pageId === entry.pageId) }))
    .filter(entry => entry.topic);
  if (!entries.length) return null;
  const total = entries.reduce((sum, entry) => sum + entry.count, 0);
  const aside = document.createElement('aside');
  aside.className = 'mc-sel-link';
  aside.setAttribute('aria-labelledby', 'asi-cae-en-selectividad');
  const title = document.createElement('h2');
  title.id = 'asi-cae-en-selectividad';
  title.textContent = 'Así cae en Selectividad';
  const text = document.createElement('p');
  text.textContent = `${total} ${total === 1 ? 'ejercicio' : 'ejercicios'} de exámenes de Selectividad de Andalucía trabajan esta lección.`;
  const list = document.createElement('ul');
  for (const entry of entries) {
    const item = document.createElement('li');
    const link = document.createElement('a');
    const url = new URL(projectUrl(entry.topic.path));
    url.searchParams.set('epigrafe', epigraph);
    link.href = url.href;
    // Varios temas: los ejercicios de esta lección pueden tener otro tema principal (la normal dentro de inferencia).
    const where = entries.length > 1 ? ` de ${entry.topic.name}` : '';
    link.textContent = `Ver ${entry.count === 1 ? 'el ejercicio' : `los ${entry.count} ejercicios`}${where}`;
    item.append(link);
    list.append(item);
  }
  aside.append(title, text, list);
  main.append(aside);
  return aside;
}

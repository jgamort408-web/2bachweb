/**
 * Material para imprimir: genera en materiales/index.html, entre <!-- materiales:inicio --> y <!-- materiales:fin -->,
 * una tarjeta por cada recurso de tipo «study» de config/resources.json (hojas resumen y relaciones de ejercicios).
 *
 *   node scripts/build-materials.mjs          reescribe la página
 *   node scripts/build-materials.mjs --check  termina con código 1 si la página no está al día
 *
 * Cada tarjeta lleva data-content-id="resource:<id>": si el docente oculta el recurso en Administración, desaparece.
 * Los PDF se compilan desde content/latex/hojas-resumen y content/latex/relacion-integrales-guiada y se copian a
 * materiales/pdf/; las soluciones de la relación no se publican.
 */
import fs from 'node:fs';
import path from 'node:path';
import { fileURLToPath } from 'node:url';

const root = fileURLToPath(new URL('../', import.meta.url));
const pagePath = path.join(root, 'materiales', 'index.html');
const START = '<!-- materiales:inicio -->', END = '<!-- materiales:fin -->';
const blockOf = topicId => (['t01', 't02', 't03'].includes(topicId) ? 'analisis' : ['t04', 't05', 't06'].includes(topicId) ? 'algebra' : 'azar');

const read = file => JSON.parse(fs.readFileSync(path.join(root, file), 'utf8'));
const escape = text => String(text).replace(/&/g, '&amp;').replace(/</g, '&lt;').replace(/>/g, '&gt;').replace(/"/g, '&quot;');
function size(file) {
  const bytes = fs.statSync(path.join(root, file)).size;
  return bytes < 1024 * 1024 ? Math.round(bytes / 1024) + ' KB' : (bytes / 1024 / 1024).toFixed(1).replace('.', ',') + ' MB';
}

function card(resource, topicTitle, { title, note, button }) {
  const id = escape(resource.id);
  const chip = resource.topicId ? `<span class="mc-chip mc-chip--dot">${escape(topicTitle(resource.topicId))}</span>` : '<span class="mc-chip mc-chip--neutral">Todo el curso</span>';
  return [
    `        <li class="mc-library__item" data-content-id="resource:${id}"${resource.topicId ? ` data-block="${blockOf(resource.topicId)}"` : ''}>`,
    `          <article class="mc-exam" aria-labelledby="material-${id}">`,
    `            <p class="mc-exam__meta">${chip}</p>`,
    `            <h3 id="material-${id}">${escape(title)}</h3>`,
    note ? `            <p class="mc-exam__tags">${escape(note)}</p>` : '',
    `            <p class="mc-exam__actions"><a class="mc-btn mc-btn--primary" href="../${escape(resource.path)}" type="application/pdf" download>${escape(button)} <span class="mc-exam__size">PDF, ${size(resource.path)}</span></a></p>`,
    '          </article>',
    '        </li>',
  ].filter(Boolean).join('\n');
}

export function render(html) {
  const { resources } = read('config/resources.json');
  const pages = read('config/pages.json');
  const topicTitle = id => pages.find(page => page.id === id)?.title ?? id;
  const study = resources.filter(resource => resource.kind === 'study');
  const sheets = study.filter(resource => resource.tags.includes('hoja-resumen') && resource.topicId)
    .sort((a, b) => a.topicId.localeCompare(b.topicId));
  const all = study.find(resource => resource.tags.includes('hoja-resumen') && !resource.topicId);
  const relations = study.filter(resource => resource.tags.includes('relacion-guiada'));
  for (const resource of study) {
    if (!fs.existsSync(path.join(root, resource.path))) throw new Error('Falta el PDF de ' + resource.id + ': ' + resource.path);
    if (![sheets, all ? [all] : [], relations].some(list => list.includes(resource))) throw new Error('Material sin sección: ' + resource.id);
  }
  const out = [
    '<section aria-labelledby="hojas-resumen">',
    '      <h2 id="hojas-resumen">Hojas resumen</h2>',
    '      <p>Una hoja por tema: un A4 que se imprime <strong>a doble cara</strong>, con las ideas, las fórmulas, ejemplos resueltos y los errores más frecuentes.</p>',
    '      <ul class="mc-library__list">',
    ...(all ? [card(all, topicTitle, { title: 'Los nueve temas en un solo PDF', note: '18 caras: imprímelo a doble cara y tendrás una hoja por tema.', button: 'Descargar todo' })] : []),
    ...sheets.map(resource => card(resource, topicTitle, { title: 'Hoja resumen', button: 'Descargar' })),
    '      </ul>',
    '    </section>',
    '    <section aria-labelledby="relaciones">',
    '      <h2 id="relaciones">Relaciones de ejercicios</h2>',
    '      <p>Ejercicios guiados para completar en clase y entregar.</p>',
    '      <ul class="mc-library__list">',
    ...relations.map(resource => card(resource, topicTitle, { title: resource.title, note: 'Dos sesiones: tabla de integrales inmediatas y compuestas, ejercicios con huecos y comprobación derivando.', button: 'Descargar' })),
    '      </ul>',
    '    </section>',
  ].join('\n');
  const start = html.indexOf(START), end = html.indexOf(END);
  if (start < 0 || end < start) throw new Error('Faltan los marcadores de materiales en materiales/index.html');
  return html.slice(0, start + START.length) + '\n    ' + out + '\n    ' + html.slice(end);
}

if (process.argv[1] && fileURLToPath(import.meta.url) === path.resolve(process.argv[1])) {
  const html = fs.readFileSync(pagePath, 'utf8');
  const next = render(html);
  if (process.argv.includes('--check')) {
    if (next !== html) { console.error('materiales/index.html no está al día: node scripts/build-materials.mjs'); process.exitCode = 1; }
    else console.log('Material para imprimir al día.');
  } else {
    fs.writeFileSync(pagePath, next, 'utf8');
    console.log('Material para imprimir generado.');
  }
}

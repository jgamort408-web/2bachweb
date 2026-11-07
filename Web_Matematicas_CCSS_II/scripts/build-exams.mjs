/**
 * Biblioteca de exámenes (P01): genera en examenes/index.html, entre los comentarios
 * <!-- biblioteca:inicio --> y <!-- biblioteca:fin -->, una tarjeta por examen con su pareja de soluciones.
 *
 *   node scripts/build-exams.mjs          reescribe la página
 *   node scripts/build-exams.mjs --check  termina con código 1 si la página no está al día
 *
 * Fuente: config/resources.json (exámenes y soluciones), config/pages.json (títulos de tema) y el tamaño de cada PDF.
 * Cada tarjeta lleva data-content-id="resource:<examen>": si el docente oculta el examen, desaparece la tarjeta;
 * el enlace a las soluciones se oculta por su ruta (document.js), porque la solución requiere su examen.
 */
import fs from 'node:fs';
import path from 'node:path';
import { fileURLToPath } from 'node:url';

const root = fileURLToPath(new URL('../', import.meta.url));
const pagePath = path.join(root, 'examenes', 'index.html');
const START = '<!-- biblioteca:inicio -->', END = '<!-- biblioteca:fin -->';

const blocks = [
  ['analisis', 'Análisis', ['t01', 't02', 't03']],
  ['algebra', 'Álgebra y decisiones', ['t04', 't05', 't06']],
  ['azar', 'Azar y datos', ['t07', 't08', 't09']]
];
// Etiquetas de contenido visibles. Las de contexto (gasto, temperatura, logística) solo sirven para buscar;
// las editoriales (revisado, *-por-aclarar, anexo-*, precisión de extremos) y las de tipo no se muestran.
const labels = {
  limites: 'Límites', derivadas: 'Derivadas', integrales: 'Integrales', funciones: 'Funciones',
  representacion: 'Representación', tangente: 'Recta tangente', 'modelo-asintotico': 'Modelo asintótico',
  'area-por-tramos': 'Área por tramos', sistemas: 'Sistemas', matrices: 'Matrices', parametros: 'Parámetros',
  modelizacion: 'Modelización', inversa: 'Matriz inversa', 'ecuaciones-matriciales': 'Ecuaciones matriciales',
  dimensiones: 'Dimensiones', potencias: 'Potencias', 'programacion-lineal': 'Programación lineal',
  'regiones-factibles': 'Regiones factibles', optimizacion: 'Optimización', 'frontera-estricta': 'Fronteras estrictas',
  formulacion: 'Planteamiento', optatividad: 'Ejercicios a elegir', probabilidad: 'Probabilidad',
  'probabilidad-condicionada': 'Probabilidad condicionada', 'probabilidad-total': 'Probabilidad total',
  bayes: 'Teorema de Bayes', independencia: 'Independencia', binomial: 'Distribución binomial',
  'correccion-continuidad': 'Corrección por continuidad', analisis: 'Análisis', inferencia: 'Inferencia',
  proporciones: 'Proporciones', 'intervalos-confianza': 'Intervalos de confianza', 'tamano-muestral': 'Tamaño muestral',
  'afijacion-proporcional': 'Afijación proporcional'
};
const searchOnly = { gasto: 'gasto', temperatura: 'temperatura', logistica: 'logística' };
const typeTags = ['recuperacion', 'subida-de-nota', 'subida-nota', 'recopilacion', 'trimestre-1'];
const editorial = ['revisado', 'evaluacion-por-aclarar', 'datos-por-aclarar', 'anexo-no-evaluable', 'precision-de-extremos'];

const tagLabel = (tag, topicId) => tag === 'normal' ? (topicId === 't08' ? 'Distribución normal' : 'Recta normal') : labels[tag];
function examType(exam) {
  if (exam.tags.includes('recuperacion')) return 'Recuperación';
  if (exam.tags.some(tag => tag.startsWith('subida'))) return 'Subida de nota';
  if (exam.tags.includes('recopilacion')) return 'Recopilación';
  if (/final/i.test(exam.title)) return 'Examen final';
  if (/repaso/i.test(exam.title)) return 'Repaso';
  return 'Examen de tema';
}
const escape = text => String(text).replace(/&/g, '&amp;').replace(/</g, '&lt;').replace(/>/g, '&gt;').replace(/"/g, '&quot;');
const size = file => {
  const bytes = fs.statSync(path.join(root, file)).size;
  return bytes < 1024 * 1024 ? Math.round(bytes / 1024) + ' KB' : (bytes / 1024 / 1024).toFixed(1).replace('.', ',') + ' MB';
};
const slug = text => text.toLowerCase().normalize('NFD').replace(/\p{Diacritic}/gu, '').replace(/[^a-z0-9]+/g, '-').replace(/^-|-$/g, '');

export function buildLibrary() {
  const { resources } = JSON.parse(fs.readFileSync(path.join(root, 'config', 'resources.json'), 'utf8'));
  const pages = JSON.parse(fs.readFileSync(path.join(root, 'config', 'pages.json'), 'utf8'));
  const pageList = Array.isArray(pages) ? pages : pages.pages;
  const topicTitle = id => pageList.find(page => page.id === id).title;
  const exams = resources.filter(resource => resource.kind === 'exam');
  const solutionOf = id => resources.find(resource => resource.kind === 'solution' && resource.examId === id);
  for (const resource of resources.filter(item => item.kind === 'solution')) {
    if (!exams.some(exam => exam.id === resource.examId)) throw new Error('Solución sin examen: ' + resource.id);
  }
  for (const resource of resources.filter(item => !['exam', 'solution'].includes(item.kind))) throw new Error('Tipo de recurso sin plantilla: ' + resource.id);
  const unknown = [...new Set(exams.flatMap(exam => exam.tags))]
    .filter(tag => !labels[tag] && tag !== 'normal' && !searchOnly[tag] && !typeTags.includes(tag) && !editorial.includes(tag));
  if (unknown.length) throw new Error('Etiquetas sin nombre visible en build-exams.mjs: ' + unknown.join(', '));

  const out = [START];
  const types = [...new Set(exams.map(examType))];
  out.push('<form class="mc-library__filters" data-exam-filters hidden aria-label="Buscar y filtrar exámenes">',
    '  <label class="mc-field">Buscar <input type="search" data-exam-search autocomplete="off" placeholder="Bayes, matrices, recuperación…"></label>',
    '  <label class="mc-field">Tema <select data-exam-topic><option value="">Todos los temas</option>' +
      blocks.flatMap(([, , topics]) => topics).filter(id => exams.some(exam => exam.topicId === id))
        .map(id => `<option value="${id}">${escape(topicTitle(id))}</option>`).join('') + '</select></label>',
    '  <label class="mc-field">Tipo <select data-exam-type><option value="">Todos los tipos</option>' +
      types.map(type => `<option value="${slug(type)}">${type}</option>`).join('') + '</select></label>',
    '</form>',
    '<p class="mc-library__status" data-exam-status role="status" aria-live="polite"></p>');
  for (const [block, name, topics] of blocks) {
    const items = exams.filter(exam => topics.includes(exam.topicId))
      .sort((a, b) => topics.indexOf(a.topicId) - topics.indexOf(b.topicId));
    if (!items.length) continue;
    out.push(`<section class="mc-library__block" data-block="${block}" data-exam-group aria-labelledby="examenes-${block}">`,
      `  <h2 id="examenes-${block}">${name}</h2>`, '  <ul class="mc-library__list">');
    for (const exam of items) {
      const solution = solutionOf(exam.id);
      const title = exam.title.replace(/ · (Examen revisado|Enunciados revisados|Examen)$/, '');
      const type = examType(exam);
      const chips = exam.tags.map(tag => tagLabel(tag, exam.topicId)).filter(Boolean);
      const search = [title, type, topicTitle(exam.topicId), ...chips, ...exam.tags.map(tag => searchOnly[tag]).filter(Boolean)].join(' ');
      out.push(`    <li class="mc-library__item" data-content-id="resource:${exam.id}" data-exam-card data-topic="${exam.topicId}" data-type="${slug(type)}" data-search="${escape(search.toLowerCase())}">`,
        `      <article class="mc-exam" aria-labelledby="examen-${exam.id}">`,
        `        <p class="mc-exam__meta"><span class="mc-chip mc-chip--dot">${escape(topicTitle(exam.topicId))}</span> <span class="mc-chip mc-chip--neutral">${type}</span></p>`,
        `        <h3 id="examen-${exam.id}">${escape(title)}</h3>`,
        chips.length ? `        <p class="mc-exam__tags"><span class="mc-visually-hidden">Contenidos: </span>${chips.map(chip => `<span>${escape(chip)}</span>`).join(' ')}</p>` : '',
        '        <p class="mc-exam__actions">' +
          `<a class="mc-btn mc-btn--primary" href="../${exam.path}" type="application/pdf">Examen <span class="mc-exam__size">PDF, ${size(exam.path)}</span></a>` +
          (solution ? ` <a class="mc-btn" href="../${solution.path}" type="application/pdf">Soluciones <span class="mc-exam__size">PDF, ${size(solution.path)}</span></a>` : '') +
          '</p>',
        '      </article>', '    </li>');
    }
    out.push('  </ul>', '</section>');
  }
  out.push(END);
  return out.filter(line => line !== '').join('\n');
}

function render(html) {
  const start = html.indexOf(START), end = html.indexOf(END);
  if (start < 0 || end < start) throw new Error('Faltan los marcadores de la biblioteca en examenes/index.html');
  const lineStart = html.lastIndexOf('\n', start) + 1;
  const indent = html.slice(lineStart, start);
  const nl = html.includes('\r\n') ? '\r\n' : '\n';
  const block = buildLibrary().split('\n').map((line, i) => (i ? indent : '') + line).join(nl);
  return html.slice(0, start) + block + html.slice(end + END.length);
}

if (process.argv[1] && fileURLToPath(import.meta.url) === path.resolve(process.argv[1])) {
  const html = fs.readFileSync(pagePath, 'utf8');
  const next = render(html);
  if (process.argv.includes('--check')) {
    if (next !== html) { console.error('examenes/index.html no está al día: node scripts/build-exams.mjs'); process.exitCode = 1; }
    else console.log('Biblioteca de exámenes al día.');
  } else {
    fs.writeFileSync(pagePath, next, 'utf8');
    console.log('Biblioteca de exámenes generada.');
  }
}
export { render };

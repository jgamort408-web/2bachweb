/**
 * Formulario por tema (P06): genera herramientas/formulario.html, entre <!-- formulario:inicio --> y
 * <!-- formulario:fin -->, a partir de config/formulas.json. Ninguna fórmula se escribe aparte: cada una debe
 * aparecer literalmente en la lección que cita (o, si reúne celdas de una tabla, cada fragmento de «from»),
 * de modo que si una lección cambia su fórmula, el generador avisa en lugar de dejar una copia desfasada.
 *
 *   npm run build:formulas            reescribe la página
 *   node scripts/build-formulas.mjs --check
 *
 * Visibilidad: cada fórmula lleva data-content-id="page:<lección>" y cada bloque "page:<tema>", así que se
 * ocultan con su lección o su tema (document.js).
 */
import fs from 'node:fs';
import path from 'node:path';
import { fileURLToPath } from 'node:url';

const root = fileURLToPath(new URL('../', import.meta.url));
const pagePath = path.join(root, 'herramientas', 'formulario.html');
const START = '<!-- formulario:inicio -->', END = '<!-- formulario:fin -->';
const BLOCKS = { t01: 'analisis', t02: 'analisis', t03: 'analisis', t04: 'algebra', t05: 'algebra', t06: 'algebra', t07: 'azar', t08: 'azar', t09: 'azar' };

const escape = text => String(text).replace(/&/g, '&amp;').replace(/</g, '&lt;').replace(/>/g, '&gt;').replace(/"/g, '&quot;');
const decode = html => html.replace(/&lt;/g, '<').replace(/&gt;/g, '>').replace(/&quot;/g, '"').replace(/&amp;/g, '&');

export const readConfig = () => JSON.parse(fs.readFileSync(path.join(root, 'config', 'formulas.json'), 'utf8'));

export function buildFormulas({ formulas } = readConfig()) {
  const pages = JSON.parse(fs.readFileSync(path.join(root, 'config', 'pages.json'), 'utf8'));
  const pageList = Array.isArray(pages) ? pages : pages.pages;
  const sources = new Map();
  const groups = new Map();
  for (const formula of formulas) {
    const lesson = pageList.find(item => item.id === formula.page);
    if (!lesson) throw new Error(`${formula.name}: no existe la página ${formula.page}`);
    if (!sources.has(lesson.id)) sources.set(lesson.id, decode(fs.readFileSync(path.join(root, lesson.path), 'utf8')));
    for (const fragment of formula.from ?? [formula.tex]) {
      if (!sources.get(lesson.id).includes(fragment)) throw new Error(`${formula.name}: «${fragment}» no aparece en ${lesson.path}`);
    }
    const key = /^t0\d$/.test(lesson.parentId) ? lesson.parentId : lesson.id;
    if (!groups.has(key)) {
      const owner = pageList.find(item => item.id === key);
      const title = /^t0\d$/.test(key) ? 'Tema ' + owner.title : owner.title + ' (contenido de apoyo)';
      groups.set(key, { key, title, block: BLOCKS[key] ?? 'azar', items: [] });
    }
    const group = groups.get(key);
    if (group.items.some(item => item.name === formula.name)) throw new Error(`Fórmula repetida en ${key}: ${formula.name}`);
    group.items.push({ ...formula, lesson });
  }

  const list = [...groups.values()];
  const out = [START,
    '<form class="mc-library__filters mc-formulas__filters" data-formula-filters hidden aria-label="Buscar en el formulario">',
    '  <label class="mc-field">Buscar fórmula <input type="search" data-formula-search autocomplete="off" placeholder="Bayes, inversa, intervalo…"></label>',
    '  <label class="mc-field">Tema <select data-formula-topic>',
    '    <option value="">Todos</option>',
    ...list.map(group => `    <option value="${group.key}">${escape(group.title)}</option>`),
    '  </select></label>',
    '</form>',
    '<p class="mc-library__status" data-formula-status role="status" aria-live="polite"></p>',
    '<nav class="mc-formulas__topics" aria-label="Temas del formulario">' +
      list.map(group => `<a href="#formulas-${group.key}">${escape(group.title.replace(/^Tema /, ''))}</a>`).join(' ') + '</nav>'];
  for (const group of list) {
    out.push(`<section class="mc-formulas__topic" id="formulas-${group.key}" data-block="${group.block}" data-content-id="page:${group.key}" data-formula-group data-topic="${group.key}" aria-labelledby="titulo-formulas-${group.key}">`,
      `  <h2 id="titulo-formulas-${group.key}">${escape(group.title)}</h2>`, '  <dl class="mc-formulas__list">');
    for (const item of group.items) {
      const search = [item.name, item.lesson.title, group.title].join(' ').toLowerCase();
      out.push(`    <div class="mc-formula" data-content-id="page:${item.lesson.id}" data-formula-entry data-search="${escape(search)}">`,
        `      <dt>${escape(item.name)}</dt>`,
        `      <dd><p class="math-scroll" tabindex="0">\\[${escape(item.tex)}\\]</p>` +
          (item.note ? `<p class="mc-formula__note">${escape(item.note)}</p>` : '') +
          `<p class="mc-glossary__source">Lección <a href="../${item.lesson.path}">${escape(item.lesson.title)}</a></p></dd>`,
        '    </div>');
    }
    out.push('  </dl>', '</section>');
  }
  out.push(END);
  return out.join('\n');
}

export function render(html, config) {
  const start = html.indexOf(START), end = html.indexOf(END);
  if (start < 0 || end < start) throw new Error('Faltan los marcadores del formulario en herramientas/formulario.html');
  const indent = html.slice(html.lastIndexOf('\n', start) + 1, start);
  const nl = html.includes('\r\n') ? '\r\n' : '\n';
  const block = buildFormulas(config).split('\n').map((line, i) => (i ? indent : '') + line).join(nl);
  return html.slice(0, start) + block + html.slice(end + END.length);
}

if (process.argv[1] && fileURLToPath(import.meta.url) === path.resolve(process.argv[1])) {
  const html = fs.readFileSync(pagePath, 'utf8');
  const next = render(html);
  if (process.argv.includes('--check')) {
    if (next !== html) { console.error('herramientas/formulario.html no está al día: npm run build:formulas'); process.exitCode = 1; }
    else console.log('Formulario al día.');
  } else {
    fs.writeFileSync(pagePath, next, 'utf8');
    console.log('Formulario generado.');
  }
}

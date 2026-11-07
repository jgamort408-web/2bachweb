/**
 * Glosario (P06): genera herramientas/glosario.html, entre <!-- glosario:inicio --> y <!-- glosario:fin -->,
 * a partir de config/glossary.json. Cada definición es el reverso de una tarjeta revisada (no se redacta aparte),
 * de modo que corregir la tarjeta y regenerar basta. Cada término enlaza a la lección donde se explica.
 *
 *   npm run build:glossary            reescribe la página
 *   node scripts/build-glossary.mjs --check
 *
 * Visibilidad: la entrada lleva data-content-id="card:<id>" (se oculta con su tarjeta) y el enlace a la lección
 * se oculta por su ruta si el docente oculta esa página (document.js).
 */
import fs from 'node:fs';
import path from 'node:path';
import { fileURLToPath, pathToFileURL } from 'node:url';

const root = fileURLToPath(new URL('../', import.meta.url));
const pagePath = path.join(root, 'herramientas', 'glosario.html');
const START = '<!-- glosario:inicio -->', END = '<!-- glosario:fin -->';

const escape = text => String(text).replace(/&/g, '&amp;').replace(/</g, '&lt;').replace(/>/g, '&gt;').replace(/"/g, '&quot;');
export const termId = term => 'termino-' + term.toLowerCase().normalize('NFD').replace(/\p{Diacritic}/gu, '').replace(/[^a-z0-9]+/g, '-').replace(/^-|-$/g, '');
const letterOf = term => term.normalize('NFD').replace(/\p{Diacritic}/gu, '')[0].toUpperCase();

export async function buildGlossary() {
  const { terms } = JSON.parse(fs.readFileSync(path.join(root, 'config', 'glossary.json'), 'utf8'));
  const pages = JSON.parse(fs.readFileSync(path.join(root, 'config', 'pages.json'), 'utf8'));
  const pageList = Array.isArray(pages) ? pages : pages.pages;
  const { flashcards } = await import(pathToFileURL(path.join(root, 'content', 'activities', 'catalog.js')).href);
  const seen = new Set();
  const entries = terms.map(({ term, card, page }) => {
    const source = flashcards.find(item => item.id === card);
    const lesson = pageList.find(item => item.id === page);
    if (!source) throw new Error(`${term}: no existe la tarjeta ${card}`);
    if (!lesson) throw new Error(`${term}: no existe la página ${page}`);
    if (seen.has(termId(term))) throw new Error('Término repetido: ' + term);
    seen.add(termId(term));
    return { term, card, lesson, definition: source.back };
  }).sort((a, b) => a.term.localeCompare(b.term, 'es'));
  const letters = [...new Set(entries.map(entry => letterOf(entry.term)))];

  const out = [START,
    '<form class="mc-library__filters mc-glossary__filters" data-glossary-filters hidden aria-label="Buscar en el glosario">',
    '  <label class="mc-field">Buscar término <input type="search" data-glossary-search autocomplete="off" placeholder="Rango, covarianza, muestra…"></label>',
    '</form>',
    '<p class="mc-library__status" data-glossary-status role="status" aria-live="polite"></p>',
    '<nav class="mc-glossary__letters" aria-label="Letras del glosario">' +
      letters.map(letter => `<a href="#letra-${letter.toLowerCase()}">${letter}</a>`).join(' ') + '</nav>'];
  for (const letter of letters) {
    out.push(`<section class="mc-glossary__letter" id="letra-${letter.toLowerCase()}" data-glossary-group aria-labelledby="titulo-letra-${letter.toLowerCase()}">`,
      `  <h2 id="titulo-letra-${letter.toLowerCase()}">${letter}</h2>`, '  <dl class="mc-glossary__list">');
    for (const entry of entries.filter(item => letterOf(item.term) === letter)) {
      out.push(`    <div class="mc-glossary__entry" id="${termId(entry.term)}" data-content-id="card:${entry.card}" data-glossary-entry data-search="${escape(entry.term.toLowerCase())}">`,
        `      <dt>${escape(entry.term)}</dt>`,
        `      <dd><p>${escape(entry.definition)}</p><p class="mc-glossary__source">Se explica en <a href="../${entry.lesson.path}">${escape(entry.lesson.title)}</a>.</p></dd>`,
        '    </div>');
    }
    out.push('  </dl>', '</section>');
  }
  out.push(END);
  return out.join('\n');
}

export async function render(html) {
  const start = html.indexOf(START), end = html.indexOf(END);
  if (start < 0 || end < start) throw new Error('Faltan los marcadores del glosario en herramientas/glosario.html');
  const indent = html.slice(html.lastIndexOf('\n', start) + 1, start);
  const nl = html.includes('\r\n') ? '\r\n' : '\n';
  const block = (await buildGlossary()).split('\n').map((line, i) => (i ? indent : '') + line).join(nl);
  return html.slice(0, start) + block + html.slice(end + END.length);
}

if (process.argv[1] && fileURLToPath(import.meta.url) === path.resolve(process.argv[1])) {
  const html = fs.readFileSync(pagePath, 'utf8');
  const next = await render(html);
  if (process.argv.includes('--check')) {
    if (next !== html) { console.error('herramientas/glosario.html no está al día: npm run build:glossary'); process.exitCode = 1; }
    else console.log('Glosario al día.');
  } else {
    fs.writeFileSync(pagePath, next, 'utf8');
    console.log('Glosario generado.');
  }
}

import { test } from 'node:test';
import assert from 'node:assert/strict';
import fs from 'node:fs';
import { latexToHtml, plainText, replaceBordermatrix, stripComments } from '../scripts/lib/latex-html.mjs';
import { loadBank, buildAll, parseCsv, TAG_LABELS, OUT_OF_SYLLABUS_TAG } from '../scripts/build-selectividad.mjs';

const root = new URL('../', import.meta.url);
const read = path => fs.readFileSync(new URL(path, root), 'utf8');

test('LaTeX del banco: párrafos, listas con «a)», negrita, símbolos y fórmulas intactas', () => {
  const html = latexToHtml(String.raw`% ID: prueba
Una urna tiene $6$ bolas.\\
\begin{enumerate}[label=\alph*)]
  \item \textbf{(1.5 puntos)} \textquestiondown{}Cuál es $P(A\cap B)$? Cuesta 3~\texteuro{}.
  \item \underline{Parte II} con \[x\leq 2\]
\end{enumerate}

Otro párrafo -- con raya.`);
  assert.equal(html, [
    '<p>Una urna tiene \\(6\\) bolas.<br></p>',
    '<ol class="mc-sel__list mc-sel__list--lower-alpha-paren" type="a"><li><strong>(1.5 puntos)</strong> ¿Cuál es \\(P(A\\cap B)\\)? Cuesta 3\u00a0€.</li>'
      + '<li><p><span class="mc-sel__underline">Parte II</span> con</p>\n<div class="math-scroll">\\[x\\leq 2\\]</div></li></ol>',
    '<p>Otro párrafo – con raya.</p>'
  ].join('\n'));
  assert.equal(plainText(html), 'Una urna tiene bolas. (1.5 puntos) ¿Cuál es ? Cuesta 3 €. Parte II con Otro párrafo – con raya.');
});

test('LaTeX del banco: escapes, \\boxed en el texto, bordermatrix y errores explícitos', () => {
  assert.equal(stripComments('a 50\\% % comentario\n% línea'), 'a 50\\% \n');
  assert.equal(latexToHtml('Sube un 50\\% y $a<b$.'), '<p>Sube un 50% y \\(a&lt;b\\).</p>');
  assert.equal(latexToHtml('Resultado: \\boxed{n=4898}.'), '<p>Resultado: \\(\\boxed{\\displaystyle n=4898}\\).</p>');
  const matrix = replaceBordermatrix('\\bordermatrix{&A&B\\cr f&1&2\\cr}');
  assert.ok(!matrix.includes('bordermatrix') && matrix.includes('\\left(') && matrix.includes(' A & B '));
  assert.throws(() => latexToHtml('\\vspace{2mm}', { id: 'X' }), /X: Orden no admitida fuera de las fórmulas: \\vspace/);
  assert.throws(() => latexToHtml('\\begin{tabular}{c}a\\end{tabular}'), /Entorno no admitido: tabular/);
  assert.throws(() => latexToHtml('Precio $5'), /Fórmula sin cerrar/);
  assert.throws(() => latexToHtml('\\includegraphics{figuras/a.pdf}'), /Figura sin conversor/);
});

test('LaTeX del banco: macros de selección parcial muestran el ejercicio completo', () => {
  const html = latexToHtml(String.raw`\ParteSeleccionable{I}{Texto $x$.
\begin{enumerate}[label=\alph*)]
\ItemSeleccionable{a}{Uno}
\ApartadoSeleccionable{b}{\item Dos}
\end{enumerate}}
\ContextoParcial{Solo en una selección parcial}`);
  assert.equal(html, '<p>Texto \\(x\\).</p>\n<ol class="mc-sel__list mc-sel__list--lower-alpha-paren" type="a"><li data-label="a)">Uno</li><li>Dos</li></ol>');
});

test('CSV: comillas, comas y saltos de línea dentro de un campo', () => {
  assert.deepEqual(parseCsv('\ufeffa,b\r\n"x, y","dijo ""no""\notra"\r\n'.replace(/^\ufeff/, '')), [{ a: 'x, y', b: 'dijo "no"\notra' }]);
});

test('banco de Selectividad: datos coherentes y páginas al día', () => {
  const bank = loadBank();
  const files = buildAll(bank);
  for (const [file, content] of files) {
    const bytes = fs.readFileSync(new URL(file, root));
    assert.ok(bytes.equals(Buffer.isBuffer(content) ? content : Buffer.from(content, 'utf8')), file + ' no está al día: node scripts/build-selectividad.mjs');
  }
  const config = JSON.parse(files.get('config/selectividad.json'));
  const pages = JSON.parse(read('config/pages.json'));
  assert.equal(bank.exercises.length, config.topics.reduce((sum, topic) => sum + topic.exercises, 0));
  // Toda etiqueta tiene nombre visible y todo epígrafe enlaza con una lección del libro.
  for (const exercise of bank.exercises) {
    exercise.tags.forEach(tag => assert.ok(TAG_LABELS[tag], tag));
    exercise.epigraphs.forEach(epigraph => assert.ok(bank.lessonFor(epigraph), epigraph));
  }
  for (const [epigraph, entries] of Object.entries(config.epigraphs)) {
    assert.ok(pages.some(page => page.id === epigraph.toLowerCase().replace(/\.(\d+)$/, (_, n) => '-e' + n.padStart(2, '0'))), epigraph);
    entries.forEach(entry => assert.ok(config.topics.some(topic => topic.pageId === entry.pageId)));
  }
  // Solo las soluciones validadas llegan a la web; ninguna en el HTML de las tarjetas.
  const solutions = JSON.parse(files.get('content/selectividad/soluciones.json')).solutions;
  assert.deepEqual(Object.keys(solutions), config.solutions.map(solution => solution.id));
  assert.deepEqual(config.solutions.map(solution => solution.id), bank.exercises.filter(exercise => exercise.row.estado_solucion === 'validada').map(exercise => exercise.id));
  for (const topic of config.topics) {
    const html = files.get(topic.path);
    assert.equal((html.match(/data-sel-card /g) ?? []).length, topic.exercises);
    assert.ok(!html.includes('mc-sel__details'));
    assert.ok(html.includes('data-page-id="' + topic.pageId + '"') && html.includes('content-gate.js'));
  }
  // El contraste de hipótesis queda marcado como fuera de la PAU vigente.
  const outside = bank.exercises.filter(exercise => exercise.tags.includes(OUT_OF_SYLLABUS_TAG));
  assert.ok(outside.length > 0);
  assert.equal((files.get('selectividad/09-inferencia-estadistica.html').match(/data-fuera-temario/g) ?? []).length,
    outside.filter(exercise => exercise.topicId === 't09').length);
});

test('banco de Selectividad: el docente controla las soluciones por tema o una a una', async () => {
  const { projectCatalog, readConfig } = await import('./helpers/visibility-fixtures.mjs');
  const { createVisibilityModel } = await import('../assets/js/content/visibility.js');
  const catalog = projectCatalog();
  const config = readConfig('selectividad');
  const published = readConfig('visibility');
  const model = createVisibilityModel(catalog, published);
  // Activadas por el docente (12-11-2026): todas visibles en la configuración publicada.
  for (const solution of config.solutions) assert.equal(model.isVisible('solution:' + solution.id), true);
  for (const topic of config.topics) assert.equal(model.isVisible('page:' + topic.pageId), true);
  const [first, second] = config.solutions.filter(solution => solution.topicId === config.solutions[0].topicId);
  const hiddenGroup = structuredClone(published);
  hiddenGroup.entries['group:selectividad-soluciones-' + first.topicId] = { visibility: 'hidden' };
  assert.equal(createVisibilityModel(catalog, hiddenGroup).isVisible('solution:' + first.id), false);
  const opened = structuredClone(published);
  opened.entries['solution:' + second.id] = { visibility: 'hidden' };
  const next = createVisibilityModel(catalog, opened);
  assert.equal(next.isVisible('solution:' + first.id), true);
  assert.equal(next.isVisible('solution:' + second.id), false);
  // Ocultar la página del tema oculta también sus soluciones.
  opened.entries['page:selectividad-' + first.topicId] = { visibility: 'hidden' };
  assert.equal(createVisibilityModel(catalog, opened).isVisible('solution:' + first.id), false);
});

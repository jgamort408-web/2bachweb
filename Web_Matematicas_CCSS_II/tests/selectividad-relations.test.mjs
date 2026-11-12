import { test } from 'node:test';
import assert from 'node:assert/strict';
import fs from 'node:fs';
import {
  DEFAULT_TITLE, criteriaToParams, crc32, escapeLatex, figuresIn, filterExercises, mulberry32, overleafFiles,
  paramsToCriteria, pickExercises, seedFrom, standaloneTex, zipFiles
} from '../content/models/selectividad-relations.js';

const read = path => fs.readFileSync(new URL('../' + path, import.meta.url), 'utf8');
const data = JSON.parse(read('content/selectividad/ejercicios.json'));
const solutions = JSON.parse(read('content/selectividad/soluciones.json')).solutions;
const order = data.topics.map(topic => topic.topicId);
const assets = Object.fromEntries(['main.tex', 'tex/paquetes.tex', 'tex/comandos.tex', 'config/opciones.tex']
  .map(name => [name, read('content/selectividad/latex/' + name)]));

test('relaciones: semilla y generador reproducibles', () => {
  assert.equal(seedFrom('48213'), seedFrom('48213'));
  assert.notEqual(seedFrom('48213'), seedFrom('48214'));
  const a = mulberry32(7), b = mulberry32(7);
  const values = Array.from({ length: 5 }, () => a());
  assert.deepEqual(values, Array.from({ length: 5 }, () => b()));
  assert.ok(values.every(value => value >= 0 && value < 1));
});

test('relaciones: filtros por tema, etiquetas (alguna o todas), contraste y solución publicada', () => {
  const t07 = filterExercises(data.exercises, { topics: ['t07'] });
  assert.ok(t07.length > 0 && t07.every(exercise => exercise.topicId === 't07'));
  const any = filterExercises(data.exercises, { tags: ['bayes', 'probabilidad-total'] });
  const all = filterExercises(data.exercises, { tags: ['bayes', 'probabilidad-total'], tagMode: 'all' });
  assert.ok(all.length > 0 && all.length < any.length);
  assert.ok(all.every(exercise => exercise.tags.includes('bayes') && exercise.tags.includes('probabilidad-total')));
  // El contraste de hipótesis queda fuera salvo que se pida.
  assert.equal(filterExercises(data.exercises, { tags: ['contraste-hipotesis'] }).length, 0);
  assert.ok(filterExercises(data.exercises, { tags: ['contraste-hipotesis'], includeOutside: true }).length > 0);
  const ids = new Set(Object.keys(solutions));
  const solved = filterExercises(data.exercises, { onlyWithSolution: true, solutionIds: ids, includeOutside: true });
  assert.equal(solved.length, ids.size);
});

test('relaciones: misma semilla, misma relación; sin repetir y ordenada por tema y año', () => {
  const pool = filterExercises(data.exercises, {});
  const first = pickExercises(pool, 8, '48213', order);
  assert.deepEqual(first.map(e => e.id), pickExercises([...pool].reverse(), 8, '48213', order).map(e => e.id));
  assert.notDeepEqual(first.map(e => e.id), pickExercises(pool, 8, '48214', order).map(e => e.id));
  assert.equal(new Set(first.map(e => e.id)).size, 8);
  for (let i = 1; i < first.length; i++) {
    const [a, b] = [first[i - 1], first[i]];
    assert.ok(order.indexOf(a.topicId) < order.indexOf(b.topicId) || (a.topicId === b.topicId && a.year >= b.year));
  }
  // Si hay menos candidatos que los pedidos, entran todos.
  assert.equal(pickExercises(pool.slice(0, 3), 10, 'x', order).length, 3);
});

test('relaciones: los criterios viajan en la dirección', () => {
  const criteria = { topics: ['t07', 't09'], tags: ['bayes'], tagMode: 'all', count: 8, seed: '48213',
    includeOutside: false, onlyWithSolution: true, withSolutions: true, title: 'Repaso de Bayes' };
  const params = criteriaToParams(criteria);
  assert.equal(params.toString(), 'temas=t07%2Ct09&etiquetas=bayes&modo=todas&n=8&semilla=48213&resueltos=1&soluciones=1&titulo=Repaso+de+Bayes');
  assert.deepEqual(paramsToCriteria(params), criteria);
  const defaults = paramsToCriteria(new URLSearchParams('n=500'), { defaultSeed: '1' });
  assert.equal(defaults.count, 30);
  assert.equal(defaults.title, DEFAULT_TITLE);
  assert.equal(defaults.seed, '1');
});

test('relaciones: LaTeX autónomo con soluciones y caracteres especiales escapados', () => {
  assert.equal(escapeLatex('50% & #1 · {x}_2'), '50\\% \\& \\#1 \\textperiodcentered{} \\{x\\}\\_2');
  const withFigure = Object.keys(solutions).find(id => figuresIn(solutions[id].latex).length);
  // Todas las soluciones están validadas: se simula una sin publicar quitándola del conjunto.
  const unsolved = data.exercises.find(e => e.id !== withFigure && !figuresIn(solutions[e.id]?.latex ?? '').length);
  const published = Object.fromEntries(Object.entries(solutions).filter(([id]) => id !== unsolved.id));
  const exercises = [data.exercises.find(e => e.id === withFigure), unsolved];
  const tex = standaloneTex({ title: 'Prueba 100%', exercises, solutions: published, withSolutions: true, preamble: assets['tex/paquetes.tex'] });
  assert.match(tex, /^% Relación generada/);
  assert.match(tex, /\\documentclass\[11pt,a4paper\]\{article\}/);
  assert.match(tex, /\\hypersetup\{pdftitle=\{Prueba 100\\%\}\}/);
  assert.match(tex, /\\section\*\{Ejercicio 2\}/);
  assert.match(tex, /Solución no disponible todavía/);
  assert.ok(!tex.includes('\\includegraphics'), 'Las figuras no caben en un archivo suelto');
  assert.ok(!/[·]/.test(tex.replace(/^%.*$/gm, '').split('\\begin{document}')[1].split('\\section*')[0]));
  assert.ok(tex.trimEnd().endsWith('\\end{document}'));
  const plain = standaloneTex({ exercises, preamble: assets['tex/paquetes.tex'] });
  assert.ok(!plain.includes('Soluciones'));
});

test('relaciones: proyecto para Overleaf con la estructura del banco y .zip válido', () => {
  const withFigure = Object.keys(solutions).find(id => figuresIn(solutions[id].latex).length);
  // Todas las soluciones están validadas: se simula una sin publicar quitándola del conjunto.
  const unsolved = data.exercises.find(e => e.id !== withFigure && !figuresIn(solutions[e.id]?.latex ?? '').length);
  const published = Object.fromEntries(Object.entries(solutions).filter(([id]) => id !== unsolved.id));
  const exercises = [data.exercises.find(e => e.id === withFigure), unsolved];
  const names = figuresIn(solutions[withFigure].latex);
  const figures = Object.fromEntries(names.map(name => [name, fs.readFileSync(new URL(`../content/selectividad/latex/recursos/figuras/${name}.pdf`, import.meta.url))]));
  const files = overleafFiles({ title: 'Repaso', exercises, solutions: published, withSolutions: true, assets, figures });
  assert.deepEqual([...files.keys()].sort(), [
    'LEEME.txt', 'catalogo/registro.tex', 'config/opciones.tex', 'config/seleccion.tex', 'enunciados/' + exercises[0].id + '.tex',
    'enunciados/' + exercises[1].id + '.tex', 'main.tex', ...names.map(name => `recursos/figuras/${name}.pdf`),
    'selecciones/relacion.tex', 'soluciones/' + exercises[0].id + '.tex', 'tex/comandos.tex', 'tex/paquetes.tex'
  ].sort());
  assert.match(files.get('config/seleccion.tex'), /\\providecommand\{\\ModoSalida\}\{enunciados-y-soluciones\}/);
  assert.equal(files.get('selecciones/relacion.tex'), `\\providecommand{\\ListaEjercicios}{${exercises[0].id},${exercises[1].id}}\n`);
  assert.match(files.get('catalogo/registro.tex'), new RegExp(`\\{${exercises[0].id}: .*\\}\\{cotejada\\}\\{validada\\}`));
  assert.match(files.get('catalogo/registro.tex'), new RegExp(`\\{${exercises[1].id}: .*\\}\\{cotejada\\}\\{no_redactada\\}`));
  // Sin soluciones: no viajan los archivos de solución ni las figuras.
  const statementsOnly = overleafFiles({ exercises, solutions: published, assets });
  assert.ok(![...statementsOnly.keys()].some(name => name.startsWith('soluciones/') || name.endsWith('.pdf')));
  assert.throws(() => overleafFiles({ exercises, solutions: published, withSolutions: true, assets, figures: {} }), /Falta la figura/);

  // El .zip se lee con un lector estándar: firmas, CRC y contenido de cada entrada.
  const zip = Buffer.from(zipFiles(files));
  const endOffset = zip.lastIndexOf(Buffer.from([0x50, 0x4b, 0x05, 0x06]));
  assert.equal(zip.readUInt16LE(endOffset + 10), files.size);
  let position = zip.readUInt32LE(endOffset + 16);
  for (const [name, content] of files) {
    assert.equal(zip.readUInt32LE(position), 0x02014b50);
    const nameLength = zip.readUInt16LE(position + 28), local = zip.readUInt32LE(position + 42);
    assert.equal(zip.toString('utf8', position + 46, position + 46 + nameLength), name);
    const size = zip.readUInt32LE(position + 24);
    const start = local + 30 + zip.readUInt16LE(local + 26);
    const bytes = zip.subarray(start, start + size);
    assert.equal(zip.readUInt32LE(position + 16), crc32(bytes));
    assert.ok(bytes.equals(Buffer.isBuffer(content) ? content : Buffer.from(content, 'utf8')), name);
    position += 46 + nameLength;
  }
  assert.equal(crc32(new TextEncoder().encode('123456789')), 0xcbf43926);
});

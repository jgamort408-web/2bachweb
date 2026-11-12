import { test } from 'node:test';
import assert from 'node:assert/strict';
import fs from 'node:fs';
import {
  BLOCKS, DEFAULT_EXAM_TITLE, composeExam, distributeQuarters, examFiles, examTex, examToParams, formatPoints,
  instructions, normalTable, obligatoryShare, paramsToExam, rescaleStatement, slotsFor, standardNormalCDF
} from '../content/models/selectividad-exams.js';
import { figuresIn } from '../content/models/selectividad-relations.js';

const read = path => fs.readFileSync(new URL('../' + path, import.meta.url), 'utf8');
const data = JSON.parse(read('content/selectividad/ejercicios.json'));
const solutions = JSON.parse(read('content/selectividad/soluciones.json')).solutions;
const official = JSON.parse(read('content/selectividad/tabla-normal.json'));
const preamble = read('content/selectividad/latex/tex/paquetes.tex');
const ids = exam => exam.parts.map(part => part.exercise?.id);

test('exámenes: huecos y parte obligatoria según la opcionalidad (40–50 %)', () => {
  assert.deepEqual(slotsFor().map(slot => slot.key), ['1a', '1b', '2a', '2b', '3', '4']);
  assert.deepEqual(slotsFor({ choice1: false }).map(slot => slot.key), ['1', '2a', '2b', '3', '4']);
  assert.equal(obligatoryShare({}), 0.4);
  assert.equal(obligatoryShare({ choice1: false }), 0.7);
  assert.equal(BLOCKS.reduce((sum, block) => sum + block.points, 0), 10);
  assert.match(composeExam(data.exercises, { seed: 1, choice1: false }).warnings.at(-1), /70 %.*entre el 40 % y el 50 %/);
});

test('exámenes: composición reproducible, sin repetir ejercicio ni examen de origen y con los temas de cada hueco', () => {
  for (const seed of ['1', '48213', 'prueba', '99999']) {
    const exam = composeExam(data.exercises, { seed });
    assert.deepEqual(ids(exam), ids(composeExam([...data.exercises].reverse(), { seed })), seed);
    assert.equal(exam.warnings.length, 0, seed);
    assert.equal(new Set(ids(exam)).size, 6);
    assert.equal(new Set(exam.parts.map(part => part.exercise.exam)).size, 6);
    for (const part of exam.parts) {
      assert.ok(part.defaults.includes(part.exercise.topicId), `${part.key}: ${part.exercise.topicId}`);
      assert.ok(!part.exercise.outside, 'Sin contraste de hipótesis');
    }
  }
  const first = composeExam(data.exercises, { seed: '7' });
  assert.notDeepEqual(ids(first), ids(composeExam(data.exercises, { seed: '8' })));
  // Pedir otro ejercicio en un hueco no cambia los anteriores; los posteriores pueden cambiar por las exclusiones.
  const other = composeExam(data.exercises, { seed: '7', slots: { 3: { reroll: 1 } } });
  assert.notEqual(other.parts[4].exercise.id, first.parts[4].exercise.id);
  assert.deepEqual(ids(other).slice(0, 4), ids(first).slice(0, 4));
});

test('exámenes: modo guiado por tema, contenido y referencia, con avisos sin bloquear', () => {
  const guided = composeExam(data.exercises, { seed: '3', slots: {
    '1a': { topic: 't06' }, '2b': { tag: 'area-recinto' }, 4: { id: data.exercises.find(e => e.topicId === 't09' && !e.outside).id }
  } });
  assert.equal(guided.parts[0].exercise.topicId, 't06');
  assert.ok(guided.parts[3].exercise.tags.includes('area-recinto'));
  assert.equal(guided.parts[5].exercise.id, data.exercises.find(e => e.topicId === 't09' && !e.outside).id);
  const empty = composeExam(data.exercises, { seed: '3', slots: { 3: { tag: 'no-existe' }, '1a': { id: 'SEL-D9999-OA-E01' } } });
  assert.equal(empty.parts[4].exercise, null);
  assert.ok(empty.warnings.some(text => /Ejercicio 3: ningún ejercicio/.test(text)));
  assert.ok(empty.warnings.some(text => /SEL-D9999-OA-E01 no existe/.test(text)));
  // Un tema fuera de los saberes del hueco se ignora y se usa el habitual.
  assert.ok(['t04', 't05'].includes(composeExam(data.exercises, { seed: '3', slots: { '1a': { topic: 't07' } } }).parts[0].exercise.topicId));
});

test('exámenes: puntuaciones adaptadas en cuartos de punto y con el total exacto', () => {
  assert.deepEqual(distributeQuarters([1.5, 1], 3), [1.75, 1.25]);
  assert.deepEqual(distributeQuarters([0.5, 0.5, 0.5, 1], 2), [0.5, 0.5, 0.25, 0.75]);
  assert.equal(formatPoints(1), '1 punto');
  assert.equal(formatPoints(0.75), '0.75 puntos');
  let adapted = 0;
  for (const exercise of data.exercises) {
    for (const target of [3, 2]) {
      const result = rescaleStatement(exercise, target);
      const marks = [...result.html.matchAll(/<strong>\((\d+(?:\.\d+)?) puntos?\)<\/strong>/g)].map(match => Number(match[1]));
      const latex = [...result.latex.matchAll(/\\textbf\{\((\d+(?:\.\d+)?) puntos?\)\}/g)].map(match => Number(match[1]));
      assert.deepEqual(marks, latex, exercise.id);
      if (!result.marks) continue;
      assert.equal(marks.reduce((sum, value) => sum + value, 0), target, `${exercise.id} → ${target}`);
      assert.ok(marks.every(value => value >= 0.25 && Number.isInteger(value * 4)), exercise.id);
      if (result.adapted) adapted++;
    }
  }
  assert.ok(adapted > 1000);
});

test('exámenes: la tabla oficial de la N(0, 1) coincide con el cálculo salvo en la última cifra', () => {
  assert.equal(standardNormalCDF(0), 0.5);
  assert.ok(Math.abs(standardNormalCDF(1.96) - 0.9750021048517795) < 1e-13);
  const computed = normalTable();
  assert.equal(official.filas.length, 41);
  let differences = 0;
  official.filas.forEach((row, r) => {
    assert.equal(row.z, computed[r].z);
    assert.equal(row.valores.length, 10);
    row.valores.forEach((value, c) => {
      const digits = value.split('.')[1].length;
      assert.equal(digits, r >= 27 ? 5 : 4, `${row.z}+${c}`);
      const gap = Math.abs(Number(value) - Number(computed[r].values[c])) * 10 ** digits;
      assert.ok(gap <= 1 + 1e-9, `${row.z}+0.0${c}: ${value} frente a ${computed[r].values[c]}`);
      if (gap > 0.5) differences++;
    });
  });
  assert.equal(differences, 12);
});

test('exámenes: LaTeX autónomo, proyecto para Overleaf y parámetros de la dirección', () => {
  const exam = composeExam(data.exercises, { seed: '48213' });
  const tex = examTex({ title: 'Simulacro 100%', parts: exam.parts, solutions, withSolutions: true, withTable: true, table: official, preamble });
  assert.match(tex, /\\documentclass\[11pt,a4paper\]\{article\}/);
  assert.equal((tex.match(/\\section\*\{EJERCICIO \d/g) ?? []).length, 4);
  assert.equal((tex.match(/\\subsection\*\{Opción [AB]\}/g) ?? []).length, 4);
  assert.match(tex, /\\section\*\{EJERCICIO 1 \\normalfont\(3 puntos\)\}/);
  assert.match(tex, /\\section\*\{EJERCICIO 3 \\normalfont\(2 puntos\)\}/);
  for (const text of instructions()) assert.ok(tex.includes(text.replace('%', '\\%')), text);
  assert.match(tex, /Simulacro 100\\%/);
  assert.match(tex, /\\section\*\{Soluciones\}/);
  assert.match(tex, /0\.0 & 0\.5000 & 0\.5040/);
  assert.ok(!tex.includes('\\includegraphics'));
  assert.ok(tex.trimEnd().endsWith('\\end{document}'));
  assert.equal(instructions({ choice1: false, choice2: false }).length, 6);
  const withFigure = Object.keys(solutions).find(id => figuresIn(solutions[id].latex).length && data.exercises.find(e => e.id === id).topicId === 't06');
  const figureExam = composeExam(data.exercises, { seed: '1', slots: { '1b': { id: withFigure } } });
  const names = figuresIn(solutions[withFigure].latex);
  const figures = Object.fromEntries(names.map(name => [name, new Uint8Array([1, 2, 3])]));
  const files = examFiles({ parts: figureExam.parts, solutions, withSolutions: true, withTable: false, preamble }, figures);
  assert.deepEqual([...files.keys()].sort(), ['LEEME.txt', 'examen.tex', ...names.map(name => `recursos/figuras/${name}.pdf`)].sort());
  assert.ok(files.get('examen.tex').includes('\\includegraphics'));
  const state = { seed: '48213', choice1: false, choice2: true, withTable: false, withSolutions: true, title: 'Simulacro',
    slots: { 1: { topic: 't06', reroll: 2 }, '2a': { tag: 'asintotas' }, 4: { id: 'SEL-D0001-OA-E04' } } };
  const params = examToParams(state);
  assert.equal(params.toString(), 'semilla=48213&op1=0&tabla=0&soluciones=1&titulo=Simulacro&tema1=t06&otro1=2&ref4=SEL-D0001-OA-E04&contenido2a=asintotas');
  assert.deepEqual(paramsToExam(params), state);
  assert.equal(paramsToExam(new URLSearchParams(), { defaultSeed: '5' }).title, DEFAULT_EXAM_TITLE);
});
